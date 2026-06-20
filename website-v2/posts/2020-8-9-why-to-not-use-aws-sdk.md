---
layout: post
title: "Why you shouldn't use the AWS SDK in your front-end"
date: 2020-8-9
description: "When you should avoid the AWS SDK for JavaScript, and when you should use it."
image: assets/images/2020/8/browserscenario.png
author: anthony
categories: [programming, tutorials]
tags: [javascript, AWS]
---

Disclaimer: this article (as the title suggests) is full of personal opinions and does not necessarily reflect hard facts. 

After several months of hair-pulling errors and hard-to-find bugs, I have finally free myself from using the AWS SDK (Amazon Web Services Software Development Kit) for JavaScript in the front-end of a project I'm working on. Why was I using it and why do I recommend you don't?

## Why I was using AWS SDK in the Front-end

In this project, I was using the AWS SDK primarily for authorization using Amazon Cognito. I was able to store an authorization token in the frontend, which automatically granted the client access to privileged AWS resources, such as a Lambda function used to fetch user information. The advantage of doing authorization is in the frontend is that the backend only has to handle the core logic of the program, without the hassle of validating the client's identity each time a request is made.

## Why you shouldn't use AWS SDK in the Front-end

However, this approach is not only insecure but also inefficient. Here's why I'd generally recommend against using AWS SDK in the frontend of your website:

1. **Separation of Logic:** with authentication and authorization spread across the frontend and backend (i.e., when using AWS SDK in the front-end), coding the frontend becomes more complicated. Personally, I prefer a system where the frontend code only displays information, and the logic is separated from the user interface elements. Once I removed the AWS SDK for JavaScript from the frontend by switching to a RESTful API, I was able to easily move the authorization logic of my project into the backend, by using cookies.
2. **Security:** speaking of cookies, they are a much better practice for security when compared to storing tokens directly on the client. In this context, I used a cookie to securely store JSON Web Tokens (JWT) containing my access and refresh tokens. Before this, I was using localStorage to persist the tokens on the client, because AWS SDK requires that JavaScript has access to authorization tokens. Storing tokens in localStorage is an insecure practice because anyone can access that information and therefore access resources as if they were a signed-in user. If you can `console.log(localStorage)` and see your access tokens, the site is probably not secure — it's probably vulnerable to attacks like [Cross-Site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting).

On another note, calling asynchronous functions (such as Lambda functions) in the front-end creates complicated problems with timing while rendering the user interface, where everything usually runs synchronously. It often requires excessively checking for undefined values and writing messy code with callbacks. 

*Side note: every AWS function now supports promises, as noted in [this AWS blog post](https://aws.amazon.com/blogs/developer/support-for-promises-in-the-sdk/). This should help anyone becoming frustrated (as I was) with way too many nested callbacks.*

## Conclusion

With a significant expense of blood, sweat, and tears, I have discovered that using the AWS SDK for JavaScript for authorization in the front-end is a recipe for countless hours of pain and suffering. Instead, I would recommend moving that logic to the backend, and considering the use of RESTful APIs for integrating the frontend and backend. I have yet to experiment with using it in the front-end for S3, DynamoDB or other AWS services, but I'd imagine those use cases would also bring up concerns surrounding separation of logic and security. What do you think of using AWS SDK in the front-end? I'd love to hear your thoughts in the comments below!