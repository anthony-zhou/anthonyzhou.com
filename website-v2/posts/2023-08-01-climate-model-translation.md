---
layout: post
title: "Climate model translation"
date: 2023-08-01
description: "Proof-of-concept work to translate and modernize a climate model."
image: /assets/projects/cli_screenshot.png
author: anthony
categories: [projects]
tags: [Python, Fortran, GPT-4, Language Server Protocol]
---

![Subset of the dependency graph for the NCAR CESM climate model.](/assets/projects/cli_screenshot.png)

Climate models have changed from coarse ocean-atmosphere models to complex Earth system models that include all Earth components, like ocean, atmosphere, cryosphere and land and detailed biogeochemical cycles.

Where carbon is getting stored? How will land use change affect the climate? These are some questions that climate models help us answer.

But the field is held back by technical debt. Most models are coded in Fortran or C for legacy reasons, and run on resource-intensive parallelized CPUs.

To address this issue, we can now translate climate models into fast and differentiable Python using large language models like GPT-4, together with traditional tools like static analysis and unit tests.

Together with Pierre Gentine and Linnia Hawkins of Columbia and LEAP STC, I built tools for performing translation from Fortran to Python, and presented the work to scientists and software engineers at NCAR (National Center for Atmospheric Research). Code is on [GitHub](https://github.com/anthony-zhou/climate_code_conversion/) and paper is on [ArXiv](https://arxiv.org/abs/2405.00018).

Eventually, this work aims for a future where climate models are differentiable and GPU/TPU-friendly, making them faster and more accurate.

<object type="image/svg+xml" data="/assets/projects/translation_cli.svg" class="w-full h-auto">
  Demo of iterative translation CLI
</object>

*Demo of the iterative translation module*
