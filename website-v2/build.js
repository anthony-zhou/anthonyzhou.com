import { build, OUT_DIR } from './lib/site.js';

const count = build();
console.log(`Built ${count} posts → ${OUT_DIR}/`);
