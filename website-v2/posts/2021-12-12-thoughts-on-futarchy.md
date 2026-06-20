---
layout: post
title: "Thoughts on Futarchy"
date: 2021-12-13
description: "A new system of governance"
image: assets/images/2021/12/market.jpg
author: anthony
categories: [politics, economics]
tags: [prediction, voting]
---

Democracy, the way we know it, has a lot of problems. Many Americans are now reporting record levels of discontent with the government, in a pattern echoed across other democratic countries globally. This is because, although we theoretically elect our representatives by popular support, policies often fail to represent the best interests of the population. 

Despite its shortcomings, we have learned to accept democracy as our main form of government, with the argument that the alternative -- autocracy -- is much worse. Indeed, autocracy easily devolves into corruption and instability, and an environment that is less than ideal for enhancing human welfare. But what if there's another alternative -- some way to modify democracy that maintains its strengths while improving on its weaknesses?

In fact, even the founders of American democracy (now the model for most democracies globally) recognized that pure democracy would not be effective. That's how we ended up with elected representatives -- the idea is that most people know little to nothing about the implications of this or that policy, so they should not be entrusted with those decisions. Instead, a small, educated elite (i.e. Congress) will make informed decisions on behalf of their constituents, in a way that benefits everyone. As a further enhancement, Congress will receive input from experts (often industry professionals, lobbyists, and academics), who provide important context for making policy in a given sector.

Clearly, though, this system doesn't really work as intended. Representatives, once elected, often start acting selfishly. Even if not, they tend to capitulate to powerful corporate lobbying arms, and make policy decisions that favor the powerful at the expense of their actual constituents.

Even if their solution was imperfect, the problem identified by the Founding Fathers is a real one: if not everyone is equally capable of making beneficial decisions, then who should be entitled to define policies? In other words, how can we make a compromise between the values of pure democracy and the differential ability of experts to make good decisions?

One potential answer to this problem is futarchy: a system of government in which elected officials define and manage certain measures of welfare, and market speculators decide which policies are implemented. Robin Hanson, in his 2000 paper introducing the idea, puts it succinctly: "vote on values, but bet on beliefs." In his [futarchy manifesto](https://mason.gmu.edu/~rhanson/futarchy.html), he defines one simple rule for this system of government: 

> When a betting market clearly estimates that a proposed policy would increase expected national welfare, that proposal becomes law. 

The idea behind prediction markets is that, when people are forced to put their own money behind their decisions, they tend to become more serious, and experts with a higher likelihood of predicting correctly should tend to invest more heavily in support of their decisions. Meanwhile, individuals with limited knowledge would either not participate or quickly lose the money that they put in. 

Prediction markets, though not without problems, are generally more accurate than opinion polls, and, because they have yet to be deployed for large-scale decision-making, there are probably quite a few undiscovered design optimizations that could address current shortcomings -- an area that merits further research but is certainly promising. 

However, one key uncertainty is how you measure success. Let's say that elected representatives decide to optimize for GDP growth. Even if we assume that GDP growth is unambiguously good, how do we determine what effect a specific policy decision (say, implementing a tax incentive for electric vehicles) has on the GDP of the country as a whole? The central problem of evaluating whether policies worked, with or without prediction markets, is that we never have a true counterfactual -- we never would have known, had the policy not been enacted, what would have happened to the country. Furthermore, it is difficult (if not impossible) to disentangle the effect of an individual policy from all the other policies made concurrently. 

Without a clear connection between policy decisions and welfare impact, prediction markets will have no basis for awarding either side's predictions -- even five or ten years after implementing an electric vehicle incentive, how will we know whether it truly improved GDP?

This seems to me like the central difficulty with futarchy -- the difficulty of measuring policy outcomes. One solution I could see would be to have these markets also define intermediate outcomes. For example, a tax incentive would likely boost sales of electric vehicles, sales of electric vehicles would likely lead to  decreased carbon emissions, decreased traditional car sales, and increased economic growth in adjacent industries like battery technology and electricity generation. Meanwhile, each of these downstream effects would have its own downstream effects, getting more and more granular until you can directly estimate the number of dollars a given change will contribute to GDP. 

If you had some mechanism (ideally market-based) to successfully identify the most important downstream effects of each decision, then design prediction markets around each of those interactions, you would end up with a system that could efficiently determine the effect of a decision on an aggregated value like GDP. 

Assuming these sorts of systems can be implemented, futarchy looks like a promising improvement to democracy, one in which we can not only give voice to our personal values but also benefit from the knowledge of experts in their chosen domains. 

But the implementation is precisely the hard part -- it's easy to see plenty of ways this system could go completely wrong, and there are many unresolved uncertainties. American-style democracy may be imperfect, but it has proven itself better than many proposed alternatives. As a result, the most logical first step is to design a small-scale test of the system, perhaps at the scale of a local government, as a way of seeing whether futarchy makes any sense whatsoever. 

## Further Reading

- [Robin Hanson's original manifesto](http://mason.gmu.edu/~rhanson/futarchy.html)
- [Wikipedia on Prediction Markets](https://en.wikipedia.org/wiki/Prediction_market)
- [Ethereum blog article introducing futarchy](https://blog.ethereum.org/2014/08/21/introduction-futarchy/)
