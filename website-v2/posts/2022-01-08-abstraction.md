---
layout: post
title: "Abstraction and Problem Solving"
date: 2022-01-08
description: "When and why traversing layers of abstraction is useful. "
image: assets/images/2022/01/blossoms-4836548_1920.jpg
author: anthony
categories: [problem-solving, productivity]
---

Here's a contention that you may or may not agree with:

> The ability to solve problems is synonymous with the ability to create and apply abstractions. 

Is this statement true? Assuming we care about solving problems, the answer to this question has important implications for what we should spend our time on. 

One way to approach this question is to look at how abstraction is applied in the real world. To begin with, rarely is a problem solved that is truly unique. Instead, most problems are simply derived from existing problems, combined and arranged in a new way.

Let's look at programming, as an example. When it comes to writing an effective program, there are two kinds of abstraction at play. One kind is *functional abstraction*, in which blocks of code are wrapped in modules or functions that hide their implementation details from high-level usage. The other variety is *conceptual abstraction*, which is the way the programmer generalizes from a specific problem to a more general problem that has already been solved, then implements the abstraction with slight modifications to fit the particular situation. 

Now consider the design of a computer. This seemingly complex operation is in fact a collection of simpler subproblems: at the most basic level, you might need a module for memory, a module for arithmetic, and a module for reading and writing data. These basic components can then be composed at higher levels of abstraction to form rudimentary programs, which culminate in the advanced software that run on computers today. 

Examining the design of a computer from this sort of first-principles, top-down approach is an act of functional abstraction: starting from the highest level, you identify at each stage what the desired inputs and outputs of the machine are, then determine the subfunctions that will produce the outputs given the inputs. 

The difference between various technological solutions (software, hardware, etc.) is simply the maximum and minimum level of functional abstraction at which you can take higher or lower level interfaces as a given. 

At this point, functional abstraction has left us with a long list of simple subproblems, and the way these small modules can be connected. Once it comes to actually implementing these modules, however, functional abstraction is not useful -- this is where conceptual abstraction comes in. Implementing the solution to the problem involves taking these small modules and implementing them one by one, drawing on knowledge of existing solutions. Applying existing solutions to new problems requires a conceptual understanding of the solutions themselves. By the end of this process -- decomposition via functional abstraction and recomposition via conceptual abstraction -- we end up with a finished solution to our problem. 

But why is it useful to draw this distinction between functional and conceptual abstraction? Are top-down and bottom-up design approaches not sufficient to characterize this approach to problem-solving? I think the answer is no -- top-down and bottom-up describe the observed behavior of efficient problem solvers (the "what"), but not the underlying skills that enable this problem solving (the "how" and "why"). Also, recognizing both approaches as instances of abstraction acknowledges how both rely on the same fundamental skill: generalizing information without reducing its usefulness. 

Understanding the "how" and "why" (that is, the underlying concepts) of problem solving in a field like computer engineering or software allows us to generalize this approach to other areas of life (this is yet another example of conceptual abstraction!).

At first glance, literature is diametrically opposed to computer science: where computer science is formulaic and measurable, literature feels more artistic and subjective. In fact, though, both fields are exercises in creating and applying abstractions. Authors use functional abstraction when they combine smaller character traits and symbols into broader themes, and conceptual abstraction when they reutilize thematic and plot devices from prior works in their own compositions. Perhaps more importantly, conceptual abstraction is the very reason why readers often resonate so deeply with literature. At some level abstracted away from the concrete details of the story, we find ourselves reapplying the themes of great literature in the context of our own lives. 

Given the importance of abstraction across so many disciplines, strengthening our ability to reason with abstractions seems like it should be an important priority. How does our education system deal with this? As you might guess, not well. Most academic material is focused on the details of specific systems (cells, economies, societies, etc.). Rarely, if ever, does material cross subject lines, when in fact many of the mental models useful in, say, biology, might actually be applied quite usefully to economics. 

In other words, learning is generally over-categorized in a formulaic way. This is great for churning out workers who can follow a prearranged formula, but not good for solving new kinds of problems or sharing knowledge across industries. Rather than categorizing by subject, we should categorize knowledge by mental model, with the flexibility to reapply different mental models over the same knowledge.

Much of this mental-model work is done by our brains automatically. Moreover, some disciplines -- especially among subfields of engineering -- encourage this type of thinking automatically, at least for problems within the industry. However, recognizing the importance of abstraction allows us to specifically develop this skill and further enhance human potential. 

In other words, my working answer to the central question of this essay -- whether abstraction is the key skill underlying problem-solving -- is yes. Being able to reason with different levels of abstraction is indeed crucial for solving any significant problem, and this skill merits further recognition and practice. 
