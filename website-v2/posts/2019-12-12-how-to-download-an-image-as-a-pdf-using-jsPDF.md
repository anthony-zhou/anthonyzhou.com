---
layout: post
title: "How to Download an Image as a PDF using jsPDF"
date: 2019-12-12
description: Using Javascript to give users a "Save as PDF" option
image: assets/images/png-to-pdf.png
author: anthony
categories: [programming, tutorials]
tags: [javascript]
---

PDF documents are great because they preserve the format of a page. In other words, the content in a PDF document typically does not get distorted, pixelated, stretched, or compressed. Because of this, an image, once it's been converted to a PDF, will typically preserve its dimensions and clarity. Making sure an image always looks sharp and focused is almost always a concern of designers, developers, and even just regular old people. When making a site that deals with images, developers may increasingly consider implementing "Save as PDF" as an attractive option for exporting an image. That's why I decided to document some of the successes and struggles I encountered while working on this feature.

My goal was to add a "Save as PDF" option to an image processing web app. The dependency I chose to use was [jspdf](https://www.npmjs.com/package/jspdf), which is a free library that lets you use Javascript to generate PDFs of all kinds. Because the library is not designed specifically for converting images to PDF documents, the main struggle I faced was creating a PDF document with dimensions that matched those of the image, so I could avoid those distasteful white margins and unintentionally cropped images that would result from using a standard-sized page. Here's the way I set up jsPDF to make sure images could be smoothly downloaded as PDFs:

# Set up jsPDF
Follow the instructions from [npm](https://www.npmjs.com/package/jspdf). The easiest way to use jsPDF in a web-based project is to add a script tag linking to the cloud:
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.1/jspdf.debug.js" integrity="sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs" crossorigin="anonymous"></script>

# Convert the image to a data URI
For now, jsPDF can only add an image to a PDF if the image is in [data URI format](https://en.wikipedia.org/wiki/Data_URI_scheme). For the web app I was working on, the image I wanted to download already had a data URI as its source. In other words, it looked something like this:

      <img src="data:image/png;base64,iVBORw0KGgoAAA
      ANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
      //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU
      5ErkJggg==" alt="Red dot" />

(Example taken from [Wikipedia](https://en.wikipedia.org/wiki/Data_URI_scheme#HTML))

This example would show up as a red dot: <img src="data:image/png;base64,iVBORw0KGgoAAA
ANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU
5ErkJggg==" alt="Red dot" />

If your image is not already a data URI, it's relatively easy to convert it. First, put the image on a canvas. Next, call canvas.toDataURL() to get the data URI of the image. You can find a great implementation of this method [here](https://davidwalsh.name/convert-image-data-uri-javascript).

# Generate the PDF based on the data URI
The key to downloading an image as a PDF is to get the right image dimensions, to make sure the PDF page dimensions match those of the image.
In my case, the image dimensions were conveniently stored in order to facilitate image processing, but in a more general case you could get the image dimensions using `image.naturalHeight` and `image.naturalWidth`:

    // Download the given image URL as a PDF file.
    function savePDF(imageDataURL) {
      // Get the dimensions of the image.
      var image = new Image();

      image.onload = function() {
        let pageWidth = image.naturalWidth;
        let pageHeight = image.naturalHeight;

        // Create a new PDF with the same dimensions as the image.
        const pdf = new jsPDF({
          orientation: pageHeight > pageWidth ? "portrait": "landscape",
          unit: "px",
          format: [pageHeight, pageWidth]
        });

        // Add the image to the PDF with dimensions equal to the internal dimensions of the page.
        pdf.addImage(imageDataURL, 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

        // Save the PDF with the filename specified here:
        pdf.save("index.pdf");
      }

      image.src = imageDataURL;
    }
Note: naturalWidth and naturalHeight are only supported in modern browsers. [These are the browsers that support these properties.](https://caniuse.com/#feat=img-naturalwidth-naturalheight)

And that's how to use Javascript to give users the option to download an image as a PDF. To summarize:
1. Set up jsPDF.
2. Make sure the image you want to download is in data URI form.
3. Use jsPDF to add the image to a new PDF document.


#### A footnote: Data URL vs. Data URI
The form of image data dealt with in this tutorial can be called both a data URL and a data URI. This is because URLs (Uniform Resource Locators) are a subset of URIs (Uniform Resource Identifiers). As to whether HTML data URIs can be considered URLs,
