---
layout: post
title: "Understanding blockchain from a distributed computing perspective"
date: 2022-07-16
description: "A foray into the history of distributed computing and how it relates to blockchain technology."
image: assets/images/2022/07/network_earth.jpg
author: anthony
categories: [programming, technology]
tags: [blockchain, distributed-computing, cryptography]
---

Running programs on a single computer is great, but what if you want to run a program on multiple computers? For example, Amazon’s database is never going to fit on one computer’s hard drive, and nor will any one computer serve all Amazon user’s web requests — so you end up scaling to a system involving multiple computers. That’s when you’ll need distributed computing. The difficulty with distributed computing is that communication is hard — computers fail, networks fail, and some computers may even be malicious. 

Here’s an example: let’s say we run a website that sells office supplies. Alice wants to buy a stapler that costs $3 — but she only has $3 in her gift card balance. Let’s say our website is pretty popular, so we decide to serve its content from 2 separate servers. We decide to randomly split web traffic between the two servers.

Imagine Alice, while being served by Server A, requests to buy the stapler, paying via gift card. On its own copy of the database, Server A changes Alice’s gift card balance to $0 and begins shipping the stapler. Then, Server A sends a message to Server B telling it to make these same updates. But before the message reaches Server B, Alice has already made the same request to Server B, which has also shipped Alice a stapler. Using the same $3 gift card balance, Alice was able to buy two $3 staplers!

This is known as the double-spend problem, and it’s just one of a broader class of consensus problems. In the context of distributed computing, consensus refers to the process by which a group of machines agree upon a shared state (e.g., Alice’s gift card balance) and execute operations on that state (e.g., subtract $3 from Alice’s gift card balance). 

## History of Consensus

The first attempts at designing consensus protocols for distributed systems began in the 1980s.  In 1989, Leslie Lamport introduced an algorithm called [Paxos](https://en.wikipedia.org/wiki/Paxos_(computer_science)), based on earlier work, which was one of the first rigorously proved fault-tolerant protocols. What does it mean to be fault tolerant? In this case, Lamport proved that Paxos is guaranteed to be *safe* (that is, all non-faulty nodes are guaranteed to agree on the same value [1]) as long as the number of nodes is greater than *2f+1*, where *f* represents the number of faulty nodes. In other words, as long as there are more functioning nodes than faulty ones, the functioning nodes will agree on the same value. 

Paxos was pretty cool, because it meant that system administrators could provably keep their distributed systems safe — with one caveat. In its original form, Paxos relies on the assumption that failures only occur via crash and omission. In other words, it doesn’t tolerate *Byzantine* faults. 

What is a Byzantine fault? The term comes from Lamport’s Byzantine General Problem, in which you imagine a group of generals, some of whom may be traitors, that has to reach a common decision — for example, whether to attack or retreat, and at what time. The Byzantine generals problem inspired the concept of a *Byzantine Fault*, in which some nodes on a network might be malicious. *Byzantine Fault Tolerance* (BFT) describes a system’s ability to work properly despite having malicious nodes. While it may sound like technical jargon, the term BFT is relevant because it’s the only type of network that works under all of the realistic risks we stated earlier — where computers fail, networks fail, and some computers may even be malicious. 

Perhaps the earliest significant protocol for Byzantine Fault Tolerant Consensus was [Practical Byzantine Fault Tolerance](https://pmg.csail.mit.edu/papers/osdi99.pdf) pBFT), published in 1999. Newer BFT protocols include Honey Badger BFT and Tendermint. 

Paxos was great for cloud data centers, because it helped them ensure consistency across nodes (in fact, Google, Amazon, Microsoft, etc. all use Paxos in production environments). pBFT was great for data center applications that required byzantine fault tolerance, as well as permissioned blockchains like Hyperledger Fabric. 

But none of these protocols on their own are sufficient for securing distributed systems outside of enterprise clouds — in other words, systems where anyone can spin up a node and join the network. 

Here’s why. 

## Getting from distributed computing to blockchain

Lamport and his contemporaries were largely focused on a concept called *permissioned consensus* — achieving consensus under the assumption that all participating network nodes have some permission to participate. The permissioned assumption allows nodes to achieve consensus via a simple majority vote, because they can assume that a fixed and known number of nodes are participating in the network — this property generally holds true on systems like enterprise clouds and Hyperledger [2]. 

But what if you don’t know how many nodes are on the network? What if anyone can join or leave the network at any time without permission (in a *permissionless* consensus model)? If so, you can no longer rely on a majority vote, because any bad actor could just flood the network with fake  nodes and vote for its own preferences (this is called a *Sybil Attack*). 

But there is a way to make sure you can’t add an arbitrary number of voters, if you could just make it hard to add nodes to the system. If only there was a way to make sure each new node had to put in real work to get a vote…

That, in essence, is what Bitcoin did — it solved the permissionless consensus problem in a BFT context (which is the only practical context for a crypto-type application). In Bitcoin’s consensus model, only nodes who submit valid proof-of-work get to make decisions. 

With Bitcoin, it doesn’t matter how many additional nodes you add. As long as their computing power is far smaller than that of the rest of the network, you’ll never be able to rig the network’s decision. 

Bitcoin’s security relies on one key insight: **cryptographic protocols allow you to achieve consensus without having control over the hardware**. This allows large groups of computers to cooperate on previously impossible tasks, without any one entity controlling all the hardware [3]. 

Seen this way, a permissioned consensus system is really just a consensus system that lacks a cryptographic permission protocol — because it assumes hardware-level control. 

## Moving on from Bitcoin

In fact, though, you can replace the “permission” in a permissioned consensus model with any cryptographic proof protocol — Bitcoin was just the start.

Ethereum 2.0 uses proof-of-stake as permission. Solana uses proof-of-stake [4]. Helium uses proof-of-coverage. The key here is that to prevent Sybil attacks, all of these proofs must be hard to fake. 

Are these systems Byzantine fault tolerant? Yes. In fact, it seems like **permissionless consensus protocols are Byzantine fault tolerant by default**, because they make no assumptions about the validity of other nodes in the network. However, the converse is not always true. BFT networks are not always permissionless, because they may derive part of their security from assuming permission has been granted. 

In theory, designing a new blockchain is as simple as combining a consensus protocol with a permission protocol. For example, Bitcoin relies on combining the longest chain rule for consensus (choose the longest chain of transaction hashes) with proof-of-work. Solana uses proof-of-history and proof-of-stake (in a more traditional BFT-style system) for consensus and proof-of-stake alone for permission. HoneyBadger BFT assumes permission is established and creates its own protocol for consensus. Each of these combinations comes with tradeoffs. A good way to think about these tradeoffs comes from the [Decentralized Thoughts Blog](https://decentralizedthoughts.github.io/2022-03-03-blockchain-resource-pools-and-a-cap-esque-impossibility-result/):

> **Theorem:** No blockchain protocol:
> 
> 1. operates in the unsized setting;
> 2. is adaptively live in the synchronous setting; and
> 3. satisfies probabilistic finality in the partially synchronous setting.

Here, *unsized* refers to the environment where the permissions are allocated — for example, Bitcoin is unsized, because anyone can add on PoW and participate, whereas proof-of-stake (PoS) blockchains are sized, because they derive stakes from a fixed pool of currency. As described in the blog, Bitcoin only satisfies (1) and (2), whereas PoS blockchains only satisfy (2) and (3). Note that “adaptive liveness” simply describes the system’s ability to adapt to shifts in the balance of the permissions pool, e.g. a 100x change in computing power for Bitcoin. Because this property is pretty essential, blockchains generally assume (2) and choose either (1) or (3).

While Helium’s proof-of-coverage might seem like an unsized pool, it is actually sized, because nodes providing proof-of-coverage are observable via the blockchain state and managed via Miner scores — the pool of coverage-certified miners is updated at every epoch. 

The cool thing about sized permission protocols is that they can use any existing BFT consensus protocol that assumes a permissioned model, substituting hardware-level permission for its own permission protocol. 

To sum up, the key questions to ask when designing a blockchain are: what is the permission protocol, and what is the consensus protocol? 

For the permission protocol, it’s important to know: 

1. Is this protocol sized (like proof-of-stake) or unsized (like proof-of-work)? 
    1. In general, sized protocols can confirm transactions with less assumptions about network timing, with the downside that they require some friction to join (e.g., waiting for an epoch to start). 
    2. Sized protocols can be easily combined with traditional BFT consensus models. 
2. Is the protocol hard to fake? 
    1. Being hard-to-fake is necessary to prevent Sybil attacks

For the consensus protocol, it’s important to know:

1. What is this protocol’s throughput?
2. What trade-offs does the network make to achieve this throughput? 

## What’s next

Since the 1980s, distributed systems researchers have published reams of papers on consensus protocols. But it wasn’t until Bitcoin’s 2009 debut that we saw a real-world application of a cryptographic permission protocol. 

Because of their 30-year head start, consensus protocols were relatively well-developed by 2009. Meanwhile, permission protocols like proof-of-work, proof-of-stake, and proof-of-coverage are still in their infancy (or maybe adolescence). 

But these new permission protocols have also enabled distributed systems of unprecedented scale, which are not always well served by existing consensus protocols. In the next few years, we’ll probably make lots of progress in both areas: developing new permission protocols and scaling consensus protocols to ensure high throughput across thousands or millions of machines.  

[1] “Safety” is a bit of a misnomer — it should probably be called “consistency,” because saying all non-faulty nodes will agree on the same value is the same as saying all non-faulty nodes are consistent with each other.

[2] The “permissioned” in permissioned blockchain refers to *data permissioning*, which allows operators to designate different levels of data access for the nodes on a network. For the rest of this article, I’m using “permissioned” to describe *consensus permissioning*, which tells you whether nodes need hardware-level permission to participate in network consensus.

[3] It’s not guaranteed that these permission protocols always allow you to achieve consensus, nor is it true that these protocols are necessarily cryptographic. Even Bitcoin, for example, is vulnerable to computing power Sybil attacks. I’m not sure if any permission protocol is provably resistant to this type of attack, but in practice most of them make the attacks very difficult to execute. It’s also fun to think about what alternative permission protocols exist other than cryptographic ones. For example, you might consider using a retinal scan or other biometrics. 

[4] Solana actually relies on a combination of proof-of-stake and proof-of-history. Proof-of-stake is more relevant to the permission protocol while proof-of-history is important for block ordering. 

*Thanks to Ryan Cao and Lance Tan for reading versions of this post.*