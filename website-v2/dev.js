import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { build, OUT_DIR, POSTS_DIR, PAGES_DIR, PUBLIC_DIR } from './lib/site.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5173;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

// Injected into every served HTML page: reconnects + reloads on rebuild.
const LIVE_RELOAD = `
<script>
  new EventSource('/__livereload').onmessage = () => location.reload();
</script>`;

const clients = new Set();

function rebuild() {
  try {
    const count = build();
    console.log(`Rebuilt ${count} posts`);
    for (const res of clients) res.write('data: reload\n\n');
  } catch (err) {
    console.error('Build failed:', err.message);
  }
}

rebuild();

const server = http.createServer((req, res) => {
  if (req.url === '/__livereload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(OUT_DIR, urlPath);
  if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Never let the browser cache during dev, so every reload reflects the
  // latest build (otherwise edited CSS/JS/images appear stale until restart).
  const noCache = { 'Cache-Control': 'no-store, must-revalidate' };

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/html', ...noCache });
    res.end('<h1>404</h1>' + LIVE_RELOAD);
    return;
  }

  const ext = path.extname(filePath);
  if (ext === '.html') {
    const html = fs.readFileSync(filePath, 'utf8').replace('</body>', LIVE_RELOAD + '\n</body>');
    res.writeHead(200, { 'Content-Type': 'text/html', ...noCache });
    res.end(html);
    return;
  }

  res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream', ...noCache });
  res.end(fs.readFileSync(filePath));
});

// Debounced watcher over content + generator source. The debounce also lets a
// brand-new file's contents finish flushing to disk before we rebuild — fs.watch
// often fires the create event before the write is complete.
let timer;
function onChange() {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 150);
}
for (const dir of [POSTS_DIR, PAGES_DIR, PUBLIC_DIR, 'lib']) {
  if (fs.existsSync(dir)) fs.watch(dir, { recursive: true }, onChange);
}

server.listen(PORT, () => console.log(`Dev server: http://localhost:${PORT}`));
