---
layout: post
title: "How I Built a Semi-Automated Matching System for Big & Mini"
date: 2020-6-13
description: "A description of the new matching system we built for Big & Mini."
image: assets/images/2020/6/codeimage.jpg
author: anthony
categories: [programming]
tags: [programming, javascript, java, aws]
---

I co-founded Big & Mini in early April, as a nonprofit organization dedicated to combatting social isolation and creating virtual connections by matching older and younger people for video calls. Since then, the platform has taken off, featured in media outlets like [The Houston Chronicle](https://www.houstonchronicle.com/techburger/article/seniors-teens-coronavirus-social-distance-online-15228449.php?utm_campaign=tbgr) and we are continuously updating our technology to keep up.

As co-founder and CTO, I helped create a system where users can sign up and get matched to a Big or a Mini through our website, at [https://bigandmini.org](https://bigandmini.org). This is my report describing the latest major release of our technology.

**Big & Mini 2.0 is now live!** It’s similar to the previous system, but more automated. In this report, I will share the reasoning behind this change, as well as an explanation of how the new system works. Our major new features are:

- An automated training quiz
- Automated matching system

With the initial version of Big & Mini, our team was spending too much time manually verifying training completion and making matches. Automation fixes both of these issues. Here’s how the system works. When they sign up, new users are sent to a staging area. Then, after verifying their email address and completing the training quiz, they are added to the pool of new users ready for a match.

Once a week on Sunday, a system administrator will press a button to trigger automatic matching for the upcoming week.


## Training Quiz
The training quiz is pretty straightforward — answer all the questions correctly, and you have completed training. The multiple-choice questions on this quiz, based on our training documents, replace the short-answer Google Form we were using previously. Now, instead of asking a human reviewer to spend time reading through the same answers over and over again, the quiz answers are automatically graded by the computer.

## Automated Matching
This is where the magic happens — in our new automated matching system, we use an algorithm that can achieve even better results than a human matcher.

It turns out matching is not a trivial problem. To illustrate my point, consider this simple example:

| Times   | Bigs   | Minis            |
|---------|--------|------------------|
| Wednesday 10am | A, B, C | D, E, F, G, H, I |
| Wednesday 2pm  | J, K, L | D, E, F          |

A naive approach would be to match people up as we get to them (a greedy algorithm). But this would give us 3 matches for 10 am (A & D, B & E, C & F) and no matches for 2 pm, leaving out 6 of our 12 Bigs and Minis.

If you were asked to do the matching, how would you do it?

Well, if you look closely, you’ll notice there’s a way to make sure everyone gets matched:

| Times          | Bigs | Minis |
|----------------|------|-------|
| Wednesday 10am | A    | G     |
| Wednesday 10am | B    | H     |
| Wednesday 10am | C    | I     |
| Wednesday 2pm  | J    | D     |
| Wednesday 2pm  | K    | E     |
| Wednesday 2pm  | L    | F     |

Now all twelve of our Bigs & Minis will get to make a meaningful intergenerational connection right away!

So how do we go about solving this matching problem? Previously, we had a human administrator look through all the users who needed matches (much as you just did) and searched for the optimal solution by hand. As you might expect, this system did not work perfectly, and we ended up leaving out some of our Bigs & Minis. With Big & Mini 2.0, however, we have a new way of doing things: with an algorithm.

The algorithm, coded in Java, works as follows:

1. Construct a weighted graph with Bigs & Minis as nodes.
    a. The weights correspond to the number of connections a Big or a Mini has with another Big or Mini.
    b. Edges are stored in an adjacency list
2. At the same time, construct a list storing the number of edges each node has.
3. Sort the list of edge counts in increasing order.
4. For the node(s) with the least number of edges:
    a. Sort the list of nodes by weight and pick the one with the lowest weighted edge (the least number of possible matches with a given Big/Mini).
    b. Put this match onto a separate list as a pair and remove them from the main adjacency list.
5. Repeat step 4 until there are no remaining nodes.

Using this algorithm, we end up maximizing the number of matches, by matching the least available people first. Because of the flexibility of this approach, we could even change the weights of the edges to account for factors like common interests or geographic proximity.

Huge thanks to [Michael Zhao](https://michaelzhao.xyz/about) for writing this algorithm and Grace Liu for implementing it.

After the algorithm returns a list of matches, the matched Bigs & Minis are removed from the staging area and given their matches with an initial time and meeting link, which will automatically show up on their Big & Mini dashboard. When the matches have finished processing, the browser automatically downloads a CSV containing the automatic matches made this week, for the convenience of the system administrator.

By automating the boring administrative parts of the job, Big & Mini 2.0 frees up our team to focus on more important things, like interacting with our users and making sure our Bigs & Minis have the best experience they possibly can.


*This article was originally posted [on the Big & Mini website](https://bigandmini.org/whatsnewpage/ourposts/engineeringPost)*

