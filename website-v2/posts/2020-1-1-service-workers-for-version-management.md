---
layout: post
title: "Version Management with a JavaScript Service Worker"
date: 2020-1-1
description: "How to manage an app's version numbers with the Service Worker API"
image: assets/images/js-serviceworker.png
author: anthony
categories: [programming, tutorials]
tags: [javascript]
---
The JavaScript service worker API is a way to give online web apps offline functionality. By running in the background of the browser, service workers are able to cache important files and give users a smooth offline experience.

## What is a service worker?
A service worker is a script (i.e., a JavaScript file) that the browser runs in the background. It can be used for features such as offline apps and push notifications. In the case of an offline app, service workers can be used to determine whether a new version of the app is available as an update.

A tip for Chrome users: to see what service workers are currently running in your browser, open Developer Tools (F12), click "Application" on the top bar, and click "Service Workers" on the sidebar that comes up.

## How a service worker works
A service worker has three steps in its lifecycle:
1. Registration
2. Installation
3. Activation

Once these three steps are finished, the service worker stays in the browser indefinitely, even if the user refreshes the page, making it useful for storing information in the cache to be used offline. Read more on the service worker lifecycle [here](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle).

Here is a [guide from Google](https://developers.google.com/web/fundamentals/primers/service-workers) detailing the code you need to set up a service worker.

## Using service workers for version management
Each time a page is refreshed, the service worker file is checked for any changes. If even a byte has changed, a new service worker is loaded, ready to place the old one whenever the `skipWaiting` event is triggered. We can take advantage of this fact by changing the service worker file in each new version of the app.

Typically, the top of a service worker file will have something like the following variable declaration:
    const CACHE_NAME = 'my-site-static-v1';

Each time you create a new version of the app, just update the service worker script, changing 'v1' to whatever the new version is (e.g., 'v4.5.2') and a new service worker will be created automatically.

If you don't want to do this manually, you can replace the text in your service worker's JavaScript file automatically on build. The specific implementation of this differs depending on what system the app is using for build tasks.

Note: if you happen to be using `grunt` for build tasks, make sure to use `grunt-text-replace` to replace the version number ([installation instructions for grunt-text-replace](https://www.npmjs.com/package/grunt-text-replace)), as `grunt-text-replace` supports in-place overwriting, which means you can directly edit the source file for your service worker. All of the other text-replace modules I found for grunt only allow editing in the build files.

### Fetching the new service workers
Now that you have a new service worker for each new version of the app, the user should be prompted to fetch the new version. This involves triggering the `skipWaiting` event on a service worker and reloading the page. A working implementation of this feature can be found [here](https://deanhume.com/displaying-a-new-version-available-progressive-web-app/).

Service workers are not easy to deal with, but they can enable effective version management with offline web apps. This tutorial represents just one of the many ways version management can be implemented in an offline web app.
