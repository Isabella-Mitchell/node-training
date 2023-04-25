---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
# persist drawings in exports and build
drawings:
  persist: false
---

# Node.js Training

Kevin Cunningham

Grab repo at https://github.com/doingandlearning/node-training-april-2023

---

# A bit about me

- Lived, taught and developed in Brighton for 20 years
- Recently relocated back to Northern Ireland
- Dad to two boys
- Love learning new things
- Passionate about JavaScript and the power it gives developers
- You can find me on Twitter (@dolearning) or on my website (https://kevincunningham.co.uk)

---

# A bit about the course

|     |     |
| --- | --- |
| Intro to Node| Binary data with Buffers |
| Node on the command line | Data processing with Streams |
| Core JS Concepts | Debugging |
| Packages and Dependencies | Testing with Node |
| Node module system | Express | 
| Async control flow | RESTful Services |
| Error handling | SQL/NoSQL with Node |

<!--
If you can, please turn on cameras, interrupt me, ask questions, disagree and chat.
-->

---

# Timings

| | |
| --- | --- |
| 9.30 - 11 | Session 1 |
| 11 - 11.15 | Coffee |
| 11.15 - 12.45 | Session 2 |
| 12.45 - 1.45 | Lunch |
| 1.45 - 3.15 | Session 3 |
| 3.15 - 3.30 | Coffee |
| 3.30 - 4.30 | Session 4 | 

---

# A bit about you

- What your role is
- JavaScript and other programming experience
- What you're hoping to get out of this course

---

# What is Node.js?

<p></p>

![The Event Loop](https://i.stack.imgur.com/Lbs9z.png)

Open source, free, cross-platform, JS on the server, event-driven, non-blocking, asynchronous, scalable
---

# The Node.js Philosophy

<v-clicks>

- Small core
- Small modules
- Small surface area
- Simplicity and pragmatism

</v-clicks>

<!-- 

Small core: Smallest possible set of functionalities, while leaving the rest to userland. Freedom to the community to experiment and iterate quickly. Convenient for maintainability and speed of evolution in the ecosystem

Small modules: Like the Unix philosophy, small is beautiful and make each program do one thing well. This helps with reusability, ease of underanding and use, simpler to test and maintain, small in size and perfect for the browser, DRY applied at a whole new level.

Small surface area: Expose a minimial set of functinalies to the outside world. Clearer to use API and less susceptible to confusion. Single entry point. Modules are used rather than extended so internals are locked down. 

Simplicity and pragmatism: KISS. Often we won't go for complex, perfect OOP code - but a collection of simple classes, functions and closures. This allows for speed and ease of maintainance. Pareto principle.

-->

---

# How Node.js works

<v-clicks>

- I/O is slow
- Blocking I/O
- Non-blocking I/O
- Event demultiplexing
- The reactor pattern
- Libuv, the I/O engine of Node.js

</v-clicks>

<!--

I/O is slow: Accessing RAM takes nanoseconds, accessing the disk takes milliseconds. Equally, accessing the disk is measured in GB/s, accessing the network is MB/s. Add to that the human interactions.

Blocking I/O: Traditionally, the function call will block the execution of the program until control has returned - the work has finished. That's a bit of an issue if a server is waiting for one connection to finish before it begins the next!

Non-blocking I/O: Modern operating systems have a non-blocking I/O - in this scenario, the system passes back a "not ready yet" token. We then move on and occasionally check back to see if the data is ready.

Event demultiplexing: Busy waiting is not ideal - but there is another mechanism called the synchronous event demultiplexer (or event notification interface). It comes from telecommunications - multiplexing combines multiple signals, they are transmitted and then split into individual signals. This way, rather than keeping track of individuals I/O calls, we keep track of the entire stream

Reactor pattern: In Node, this began (and often still is) a callback. A reactor does something when the data is ready.

Libuv: This is the native library developed and maintained by the Node core team that allows Node commands to be converted into system commands on each operating system.


-->

---
layout: two-cols
---
# The recipe for Node.js

<v-clicks>

- A set of bindings responsible for wrapping and exposing libuv
- V8, the JS engine developed by Google for Chrome. Acclaims for design, speed and memory managment.
- A core JS library that implements the high-level Node.js API

</v-clicks>

::right::

![Recipe](/assets/recipe.png)

<!--

The reactor pattern and libuv are the basic building blocks of Node.js, but we need three more components to build the full platform:
• A set of bindings responsible for wrapping and exposing libuv and other low-level functionalities to JavaScript.
• V8, the JavaScript engine originally developed by Google for the Chrome browser. This is one of the reasons why Node.js is so fast and efficient. V8 is acclaimed for its revolutionary design, its speed, and for its efficient memory management.
• A core JavaScript library that implements the high-level Node.js API.
This is the recipe for creating Node.js, and the following image represents its final architecture.

# JavaScript in Node.js
The JavaScript we use in Node.js is somewhat different from the JavaScript we use in the browser.

The most obvious difference is that in Node.js we don't have a DOM and we don't have a window or a document. On the other hand, Node.js has access to a set of services offered by the underlying operating system that are not available in the browser. In fact, the browser has to implement a set of safety measures to make sure that the underlying system is not compromised by a rogue web application. The browser provides a higher-level abstraction over the operating system resources, which makes it easier to control and contain the code that runs in it, which will also inevitably limit its capabilities. In turn, in Node.js we can virtually have access to all the services exposed by the operating system. 

# Run the latest JavaScript with confidence
# The module system
# Full access to operating system services
# Running native code

-->

---
# Open up a terminal

Execute both of these commands to make sure that you have Node install properly.

```bash {all}
node -v
npm -v
```

All being well, you'll get a version number back.

For this course, anything over Node 12 should be fine (though I'll be using Node 14) and I'll be using npm version 6.14.15.

---

# Node on the command line

By the end of this section, you should be able to:
- Explore all possible Node and V8 command line flags
- Use key utility mode command line flags
- Understand an essential selection of operational command line flags

<!-- The Node.js platform is almost entirely represented by the node binary executable. In order to execute a JavaScript program we use: node app.js, where app.js is the program we wish to run. However, before we start running programs, let’s explore some of the command line flags offered by the Node binary. -->

---

<v-clicks>

- All command flags:
  - node --help   
- V8 command flags:
  - node --v8-options
- Check syntax:
  - node --check app.js 
- Dyanmic eval and print the result:
  - node --print
- Dynamic eval and don't print the result:
  - node --eval
- Preload modules:
  - node --require
- Configure the stack trace:
  - node --stack-trace-limit

</v-clicks>



<!--
To see all Node command line flags for any version of Node, execute node --help and view the output.

Beyond the Node command line flags there are additional flags for modifying the JavaScript runtime engine: V8. To view these flags run node --v8-options.

Checking Syntax
It’s possible to parse a JavaScript application without running it in order to just check the syntax.

This can be useful on occasions where running code has a setup/teardown cost, for instance, needing to clear a database, but there’s still a need to check that the code parses. It can also be used in more advanced cases where code has been generated and a syntax check is required.

To check the syntax of a program (which will be called app.js), use --check or -c flag:

node --check app.js

node -c app.js

If the code parses successfully, there will be no output. If the code does not parse and there is a syntax error, the error will be printed to the terminal.

Dynamic Evaluation
Node can directly evaluate code from the shell. This is useful for quickly checking a code snippet or for creating very small cross-platform commands that use JavaScript and Node core API’s.

There are two flags that can evaluate code. The -p or --print flag evaluates an expression and prints the result, the -e or --eval flag evaluates without printing the result of the expression.

The following will print 2

node --print "1+1"

The following will not print anything because the expression is evaluated but not printed.

node --eval "1+1"

The following will print 2 because console.log is used to explicitly write the result of 1+1 to the terminal:

node -e "console.log(1+1)"

When used with print flag the same will print 2 and then print undefined because console.log returns undefined; so the result of the expression is undefined:

node -p "console.log(1+1)"

Usually a module would be required, like so: require('fs'), however all Node core modules can be accessed by their namespaces within the code evaluation context.

For example, the following would print all the files with a .js extension in the current working directory in which the command is run:

node -p "fs.readdirSync('.').filter((f) => /.js$/.test(f))"

Due to the fact that Node is cross-platform, this is a consistent command that can be used on Linux, MacOS or Windows. To achieve the same effect natively on each OS a different approach would be required for Windows vs Linux and Mac OS.

Preloading Modules
The command line flag -r or --require can be used to preload a module before anything else loads.

Given a file named preload.js with the following content:

console.log('preload.js: this is preloaded')

And a file called app.js containing the following:

console.log('app.js: this is the main file')

The following command would print preload.js: this is preloaded followed by app.js: this is the main file:

node -r ./preload.js app.js

Preloading modules is useful when using consuming modules that instrument or configure the process in some way. One example would be the dotenv module.

Stack Trace Limit
Stack traces are generated for any Error that occurs, so they're usually the first point of call when debugging a failure scenario. By default, a stack trace will contain the last ten stack frames (function call sites) at the point where the trace occurred. This is often fine, because the part of the stack you are interested in is often the last 3 or 4 call frames. However there are scenarios where seeing more call frames in a stack trace makes sense, like checking that the application flow through various functions is as expected.

The stack trace limit can be modified with the --stack-trace-limit flag. This flag is part of the JavaScript runtime engine, V8, and can be found in the output of the --v8-options flag.

Consider a program named app.js containing the following code:

function f (n = 99) {
if (n === 0) throw Error()
f(n - 1)
}
f()

When executed, the function f will be called 100 times. On the 100th time, an Error is thrown and stack for the error will be output to the console.

The stack trace output only shows the call to the f function, in order to see the very first call to f the stack trace limit must be set to 101. This can be achieved with the following:

node --stack-trace-limit=101 app.js 

Setting stack trace limit to a number higher than the amount of call frames in the stack guarantees that the entire stack will be output:

node --stack-trace-limit=99999 app.js

Generally, the stack trace limit should stay at the default in production scenarios due to the overhead involved with retaining long stacks. It can nevertheless be useful for development purposes.
-->

---

# Node.js REPL

- `.editor`
- Double tab
- Ctrl-l

---

# Editors

- Use what you want :) 
- I use vim when I'm not teaching and VSCode when I am

---

# First program 

```javascript {all|1|3-4|6-10|7|8|9|12-14|all}
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```


---

# Exercises (`Labs/01-introduction`)

1. In the labs folder, there is a file called `will-throw.js`. Run the file without any flags and then run with the appropriate flag to see the full call stack.

  > In the first case, there should only be ten stack frames in the error output. In the second, there should be significantly more.

2. There are two other files in the labs folder, `bad-syntax.js` and `correct-syntax.js`. Use the appropriate flag to check the syntax of each file.

  > There should be no output when checking `correct-syntax.js` and there should be a Syntax Error when checking the syntax of `bad-syntax.js`.

3. In the REPL, import the http library (`const http = require("http")`). Use the tab to explore some of the methods available. Also, check out the docs (https://nodejs.org/dist/latest-v16.x/docs/api/http.html)

4. Edit the server to send different responses, for example:
  - Play with the status code
  - Add some additional headers
  - Call the res.end() to send things



---
