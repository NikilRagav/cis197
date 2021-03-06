---
path: "/assignments/1"
date: "2019-01-29"
due: "2019-01-29"
title: "Homework 1: Finger Exercises"
---

Due **Tuesday, January 29th, 11:59:59pm**.

In this homework, you will familiarize yourself with JavaScript syntax by writing some useful functions: a few array helpers, mixins for a shopping cart, some higher-order functions, and a function for stringifying JavaScript objects.

Download the implementation stub [here](/~cis197/assignments/build/CIS197_HW1.zip).

### Before starting this assignment

Review [Lecture 1](/~cis197/lectures/lecture1). You may also find the resources on the [lecture page](/~cis197/lectures) helpful.

## Getting Started

This homework is written in NodeJS, which is a server-side implementation of JavaScript. It's like Ruby, Python, or other scripting languages: you write the code in plain-text files and then run them with the console command `node`.

The first thing you'll need to get started is NodeJS. Follow the instructions [here](/~cis197/notes/installing-nodejs) to download and install Node using NVM. Once finished, you can check that you've installed Node correctly by running `node --version` from your terminal. It should print a string like `v0.12.3`.

**You must use NVM to install NodeJS. Do not use the installer from the NodeJS site, or your favorite package manager, or any other method. These tend to cause problems after a while, especially the day before a homework is due.**

Once you've got Node on your computer, you'll need to install the dependencies for the homework. From your homework directory, run:
```bash
npm install
```

This should display a few lines of text about fetching packages, indicating that dependencies have been installed successfully. You should now be able to run the homework with:
```sh
node exercises.js
```

Although it won't do very much since you haven't completed it yet!

## Running ESLint

Using a linter in JavaScript is generally very useful, because it'll catch typos and syntax errors that our meager human minds can easily overlook. In CIS 197, passing our linter is also a significant chunk of your homework grade! Luckily, it's extremely easy to run ESLint on your code - we'll provide you with an `.eslintrc` file in each homework (which defines the style rules that your homework must follow) and a `Gulpfile.js` (which will check all of your modified files for errors). I highly recommend linting your code each time you make changes, before you run it - it'll stop you from wasting time over silly errors.

To install Gulp on your computer, simply run:
```bash
npm install -g gulp
```

Then to check your files, run:
```bash
gulp eslint
```

Any errors or warnings will be printed to the console, along with a line number.

## Completing the Homework
Obviously, this is the hard part! You'll find that the homework files themselves contain instructions on how to complete the different parts. If you need clarification, you can ask on Piazza.

Of course, you'll want a way to debug your `exercises.js` functions, since they're unlikely to be perfect the first time. The best way to do this is to create a new file, `testHW1.js`, and *require* `exercises.js` from that file. This is done with a simple `require` statement, as in the example below:

```javascript
var exercises = require('./exercises');

// Test the sum function
var sum = exercises.arrayMethods.sum;
console.log(sum([1, 2, 3, 4])); // Expect 10
```

Run this test file with `node testHW1.js`.

## Submitting the Homework

<!--The CIS 197 submission system, BRUCE, can be found at [https://cis197.usebruce.com](https://cis197.usebruce.com). Using the login information that was sent to you, you can log in and submit this homework. You have (essentially) unlimited submissions, so you can check each part for correctness before moving on to the next. Good luck!-->

We will be using Gradescope this semester (if all goes well with homework 1). To join the course sign up/log into gradescope.com. Refer to Piazza for the course code. Note, in order to submit the assignment, you MUST register with the course code on Piazza. The only file you need to submit is **exercises.js**. Any other files are extraneous (e.g. feedback.js, package.json, .estlintrc, etc.).

Note, you have infinite submissions. The autograded portion is scaled to 15.0 points (per our syllabus) and manual/autograded style will be added later. Note that the autograded tests and style are subject to adjustment based on the discretion of the TAs (i.e. if we see that you're just getting a bunch of points wrong because of some simple syntax errors, we will let you know about it and limit the amount of points we will cut). Manually graded style for HW1 will be 5/5. However, pay attention to your comments.
