---
layout: post
title: "Improving Air Quality at the Community Level"
date: 2023-06-26
description: "Reflecting on our project to implement community-level air quality monitoring"
image: assets/images/2023/06/air_pollution.jpeg
author: anthony
categories: [climate, report]
tags: [air, pollution, sensors]
---

I spent last summer working to found a startup with the goal of improving air quality. By August 2022, we decided to shut down. But why? Perhaps the best reason is that our other opportunities were more exciting. However, even that answer begs the question of why this air quality project wasn’t as exciting in the first place. 

To make the story short, I would cite two reasons for failure. First, sensor networks would require a lot of public funds, and those funds could be used more effectively. Instead of pursuing local sensors, survey-based and remote-sensing based approaches would likely be sufficient. More importantly, we found that low-cost sensors are not quite precise enough yet. To build our sensor network, we would need to perform hardware research to design better devices. 

That said, we learned a lot. For people interested in climate tech, this account conveys insights and stories which might inspire future work. More generally, I believe there is much to gain from stories of failure, and that failures often contain the glimmers of future opportunity. 

## What we wanted to do

Air quality can vary by as much as 8x from one end of a block to another. These localized regions of high pollution stick around, so people living in these areas get harmed more and more as they get continually exposed to the pollutants. But then the entire city of San Francisco only has a few regulatory-grade air quality monitors, and the problem is much worse elsewhere. So city officials often don’t even know about these pollution hotspots. 

Why do pollutants even matter? The answer depends on the kind of pollutant. The most concerning pollutant seems to be PM2.5 – particulate matter smaller than 2.5 micrometers – because it tends to get lodged in your lungs and cause breathing problems. Other pollutants, like ozone and carbon monoxide, make it harder for people to breathe. Like middle school bullies, these pollutants adapt into new forms when they meet, which become dangerous in different ways. Just as an overgrown physical bully joins forces with a self-hating wannabe insult comic, nitrogen dioxide and volatile organic compounds combine to form ozone and particulate matter. Meanwhile, many of these pollutants – along with methane and carbon dioxide – are also greenhouse gasses, which means they help trap heat in the atmosphere and move us ever closer towards becoming a jungle planet. 

If we care about improving air quality, the first step is to diagnose the problem and figure out what’s causing it. To this end, we wanted to create a dense network of air quality sensors, such that we could collect block-level data on air pollution. With this data, city officials could locally target their air quality interventions and measure their effectiveness. 

## What we thought would happen

Our plan was to begin by understanding the problem from the people we thought we were helping. So we scheduled dozens of meetings with officials from groups like CARB (the California Air Resource Board) and BAAQMD (Bay Area Air Quality Management District) to discuss whether they needed higher-resolution data on air quality measurements. The straight answer was “no.” But this reflected a concern with feasibility more than a true denial. Several people argued that low-cost sensors would never be precise enough to produce actionable insights for policy. 

Despite this resistance, we pushed on. After all, government agencies are notoriously slow to adopt new technologies. But might we first find early adopters in industry? We identified a few other potential customers: utility, weather prediction, and insurance companies. In utilities, we found out that Pacific Gas and Electric employs a workforce of several hundred people walking on foot with sensors to detect potential gas leaks in their pipelines. And in fact, about two years prior, another aspiring air quality enthusiast had been in late-stage talks to start a pilot project with PG&E making just such a network of low-cost air quality sensors, focused on methane. 

The other area we sought to understand was climate intelligence, including weather forecasting and climate risk modeling. In many cases where we think weather apps are wrong — for example, they tell you it's raining when it's not really raining — the forecast is actually just not localized enough. Maybe it’s actually raining two miles away from you. Hyperlocal weather stations help bridge this gap by providing local data. Our air quality sensors could serve this purpose by providing temperature, humidity, and wind speed data to weather models. 

Despite the lack of interest from air quality management districts, we hoped to find eager markets in both utilities and climate intelligence.

## What actually happened

After identifying some potential customers, we started asking them about their problems. PG&E did indeed have this big problem with gas leaks. While we thought that the company would want to avoid gas leaks due to the loss of revenue, this loss is actually miniscule — gas companies freely burn extra natural gas at their drilling sites to lower the pressure in their pipes. Instead, their main concern is public health. In 2018, the San Bruno pipeline (owned by PG&E) exploded and killed 8 people. The explosion cost the company $1.5 billion in fines and about the same amount in insurance claims. For reference, the company’s annual budget is around $20 billion. With slim margins, an event like this marks a significant setback on company profits. 

Low-cost air quality sensors could be a great solution for PG&E. They would provide continuous monitoring at the site of residential gas leaks, which is better than what that hundred-strong workforce of walking sensors could achieve. The problem, they told us, was that existing hardware simply wasn’t good enough. Cheap sensors aren’t precise enough to detect gas leaks. 

In order to solve PG&E’s methane problems, we would need a much better device than any of the low-cost methane sensors currently available. So the business need is real, but the next step will require investments into better hardware. 

So utility companies didn’t seem like a good first customer. What about weather forecasting? The key question here was whether local sensor networks could improve forecasting. 

In the past few decades, weather forecasts have been improving by about a day each decade. In other words, if in 2000 we could predict 8 days in advance with 90% accuracy, by 2010 we could predict 9 days in advance with 90% accuracy. However, we are projected to lose a day of prediction with every 3 degrees in global warming — so our weather models need to improve if we are to preserve our predictive power. 

One of the main ways we could improve our weather forecasting is by incorporating deep learning into forecasting models. The Dark Sky founders did this a few years ago, and their results were good enough that they got acquired by Apple and incorporated into Apple weather forecasts. But deep learning thrives on good input data, so improving deep learning forecasts also requires that we improve the quality and quantity of underlying data that we collect — this is precisely the gap filled by local sensor networks. 

Local sensor networks are not new. Weather Underground (aka Wunderground) got its start by helping people set up a network of weather stations. In the end, however, they ended up only making money from their commercially available forecasts, which relied minimally upon local sensor networks. Just like PG&E, they saw these low-cost sensors as too unreliable to be useful. In fact, this is how most weather forecasting companies have made money historically — they take free national weather service forecasts and offer them with ads or a subscription plan, with their main value-add being a more user-friendly AI. 
  
The experience of Wunderground might prompt some to be skeptical about supplementing government weather stations with cheaper community-based stations. Indeed, community-based weather stations might never be a good enough data source, but more spatial coverage is likely needed. The European weather forecasting center (ECMWF) complains that it doesn’t have enough sensor coverage in Africa to predict when storms are coming from that direction. More importantly, the lack of weather stations in developing countries limits their forecast accuracy, making it harder for truck drivers to plan their routes and for farmers to plan their crop care practices. 

## What's next

At the end of the summer, we decided to stop working on the air quality sensor network, and return all funds to those who had pre-ordered our devices. It was a difficult decision. On one hand, we’d discovered some real problems, with real potential for social impact. On the other hand, we had no real customers, and no one wanted low-cost sensor data until we could prove its accuracy. In the end, we agreed unanimously that shutting down was the right thing to do. 

That said, poor air quality is still a problem. It’s killing millions of people a year. Even if official numbers seem healthy, local communities often suffer from persistent pollution hotspots. And there are clear next steps for our communities. When it comes to improving the air, the first step is diagnosing the problem – we need better sensors, better models, and better coverage. At the same time, we need to actually reduce emissions, primarily by reducing the burning of fossil fuels, but also by managing construction sites and the built environment. These actions bring us ever closer to a world where everyone – on every block – gets to breathe clean air. 
