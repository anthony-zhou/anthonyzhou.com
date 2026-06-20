---
layout: post
title: "How to Scan a Barcode with Flutter"
date: 2019-11-26
description: How to set up a cross-platform app to scan barcodes.
image: assets/images/scan-barcode-with-flutter.jpeg
author: anthony
categories: [programming, tutorials]
tags: [flutter, dart]
---

Here's how to set up a simple barcode scanning function, starting from a basic flutter app. In this tutorial we'll be using the [barcode_scan Flutter package](https://pub.dev/packages/barcode_scan). The package site has its own tutorial, but the tutorial has some outdated information, so I thought I'd try and correct that here.

# Set up the configuration files
As listed on [barcode_scan's about page](https://pub.dev/packages/barcode_scan) on Dart Pub, start by making the following changes:

## For Android:

Add this line to your AndroidManifest.xml to request permission to use the user's camera:

        <uses-permission android:name="android.permission.CAMERA" />

Add this line (to allow the BarcodeScanner activity) to your AndroidManifest.xml. Do NOT modify the name.

        <activity android:name="com.apptreesoftware.barcodescan.BarcodeScannerActivity"/>

Install the Kotlin plugin for Android Studio or your default editor

Edit your project-level build.gradle file to look like this:

          buildscript {
              ext.kotlin_version = '1.2.31'
              ...
              dependencies {
                  ...
                  classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
              }
          }
          ...

Edit your app-level build.gradle file to look like this:

        apply plugin: 'kotlin-android'
        ...
        dependencies {
            implementation "org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
            ...
        }

In your pubspec.yaml file, add `barcode_scan: ^1.0.0` to the list of dependencies, as follows:

        dependencies:
          flutter:
            sdk: flutter
          # other dependencies...
          barcode_scan: ^1.0.0

    Note: for some reason many tutorials, including that of the publishers themselves, say to add `barcode_scan: ^0.0.3` to your pubspec.yaml file. This tends to cause problems because 0.0.3 is an unsupported version of this dependency.

Click "Packages get" in Android Studio or run flutter packages get in your project folder.

## For iOS:
To use on iOS, you must add the the camera usage description to your Info.plist

        <key>NSCameraUsageDescription</key>
        <string>Camera permission is required for barcode scanning.</string>


# Write the testing code
The package barcode_scan should now be successfully installed and configured in your flutter application. Now all that remains is to use the package in your app!

Outside of the formatting, the key to this example is the call to `BarcodeScanner.scan()`, which uses the imported package `barcode_scan`.

## Completed code in main.dart
```
import 'dart:async';
import 'package:barcode_scan/barcode_scan.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(new MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String barcode = "";

  @override
  initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
          appBar: AppBar(
            title: Text('Barcode Scanner'),
          ),
          body: Center(
            child: Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text("Press the button to scan an item:"),
                ),
                Container(
                  child: RaisedButton(onPressed: scan, child: Text("Scan")),
                  padding: const EdgeInsets.all(8.0),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(barcode),
                ),
              ],
            ),
          )),
    );
  }

  //scan a barcode, store result in this.barcode
  Future scan() async {
    try {
      //use barcode_scan to scan the barcode
      String barcode = await BarcodeScanner.scan();

      //if the barcode has been obtained, display it
      if (barcode.length > 0)
        setState(
            () => this.barcode = "The barcode you scanned was: " + barcode);
    } on PlatformException catch (e) {
      if (e.code == BarcodeScanner.CameraAccessDenied) {
        setState(() {
          this.barcode = 'Camera permission was not granted';
        });
      } else {
        setState(() => this.barcode = 'Unknown error: $e');
      }
    } on FormatException {
      //the user probably just pressed the back button, no need to print an error message
      setState(() => this.barcode = '');
    } catch (e) {
      setState(() => this.barcode = 'Unknown error: $e');
    }
  }
}
```
