---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# Debugging and Error handling in Node.js

---

# Morning 👋🏻

As you arrive, could you:

- Pull the changes from the repo
- Think of a takeaway (learning, question, wondering) from our last day to share.

---

- Learn how to start a process in inspect mode
- Connect to a process in inspect mode in order to debug it
- Understand what breakpoints are and how to set them

<!--

In order to debug an application, the Node.js process must be started in Inspect mode. Inspect puts the process into a debuggable state and exposes a remote protocol, which can be connected to via debugger such as Chrome Devtools. In addition to debugging capabilities, Inspect Mode also grants the ability to run other diagnostic checks on a Node.js process. In this section, we'll explore how to debug and profile a Node.js process.

-->

---

# Starting in Inspect Mode

<v-clicks>

Consider this code as `app.js`:
```js 
function test(n = 99) {
  if (n === 0) throw Error();
  test(n-1)
}

test()
```

## node --inspect app.js

## node --inspect-brk app.js
## chrome://inspect

</v-clicks>


<!--

Node.js supports the Chrome Devtools remote debugging protocol. In order to use this debugging protocol a client that supports the protocol is required. In this example Chrome browser will be used.

Inspect mode can be enabled with the --inspect flag:

node --inspect app.js

For most cases however, it is better to cause the process to start with an active breakpoint at the very beginning of the program using the --inspect-brk flag.

node --inspect-brk app.js

Otherwise the application will have fully initialised and be performing asynchronous tasks before any breakpoints can be set.

When using the --inspect or --inspect-brk flags Node will output some details to the terminal.

The remote debugging protocol uses WebSockets which is why a ws:// protocol address is printed. There is no need to pay attention to this URI, as the Chrome browser will detect that the debugger is listening automatically.

In order to begin debugging the process, the next step is to set a Chrome browser tab's address bar to chrome://inspect.

This will load a page.

Under the "Remote Target" heading the program being inspected should be visible with an "inspect" link underneath it. Clicking the "inspect" link will open an instance of Chrome Devtools that is connected to the Node process.

Note that execution is paused is at the first line of executable code, in this case line 5, which is the first function call.

From here all the usual Chrome Devtools functionality can be used to debug the process. For more information on using Chrome Devtools, see Google Developer's Documentation. 

There are a range of other tools that can be used to debug a Node.js process using Chrome Devtools remote debugging protocol. To learn more, read "Debugging Guide" by nodejs.org.

-->

--- 

# Breaking on Error in Devtools

<v-clicks>

- This is handled in the "Pause on exceptions" feature. 
- The pause button goes from grey to blue
- This can be a useful feature to work out the state of your application when the program errors

</v-clicks>

<!--

Once a Node.js process has been started in inspect mode and connected to from a debugging client, in this case Chrome Devtools, we can start to try out the debugger features. The app.js file will throw when n is equal to 0. The "Pause on exceptions" feature can be used to automatically set a breakpoint at the line where an error is thrown.

To activate this behaviour, start app.js in Inspect Break mode (--inspect-brk), connect Chrome Devtools, ensure that the "Sources" tab is selected and then click the pause button in the top right. The pause button should turn from gray to blue.

Ensure that the "Pause on caught exceptions" checkbox is unchecked and then press the play button. The process should then pause on line 2, where the error is thrown.

From here the Call Stack can be explored over in the right hand column and state can be analyzed by hovering over any local variables and looking in the Scope panel of the right hand column, located beneath the Call Stack panel.

Sometimes a program will throw in far less obvious ways. In these scenarios the "Pause on exceptions" feature can be a useful tool for locating the source of an exception.

-->

---

# Adding a Breakpoint in Devtools

- Once you've added the files to your tools, you can explore the code
- You can set breakpoints and update code
- You can move through the code in a number of ways from here

<!--

In order to add a breakpoint at any place in Devtools, click the line number in the column to the left of the source code.

Start app.js in Inspect Break mode (--inspect-brk) , connect Chrome Devtools, ensure that the "Sources" tab is selected and then click line 3 in app.js. The line number (3) will become backlit with a blue arrow.

Clicking the blue play button in the right column will cause program execution to resume, the f function will be called and the runtime will pause on line 3.

From here the value of n can be seen, highlighted in beige on line 1. The Call Stack can be explored over in the right hand column and state can be analyzed by hovering over local variables and looking in the Scope panel of the right hand column, located beneath the CallStack panel.

-->

---

# Adding a Breakpoint in Code

- Use the `debugger` key word to trigger a breakpoint
- You can now use the `--inspect` flag rather than the `--inspect-brk`

<!--

In some scenarios it can be easier to set a breakpoint directly in the code, instead of via the Devtools UI.

The debugger statement can be used to explicitly pause on the line that the statement appears when debugging.

Let's edit app.js to include a debugger statement on line 3:

function f (n = 99) {
  if (n === 0) throw Error()
  debugger
  f(n - 1)
}
f()

This time, start app.js in Inspect mode, that is with the --inspect flag instead of the -inspect-brk flag. Once Chrome Devtools is connected to the inspector, the "Sources" tab of Devtools will show that the application is paused on line 3.

Using the debugger statement is particularly useful when the line we wish to break at is buried somewhere in a dependency tree: in a function that exists in a required module of a required module of a required module and so on.

When not debugging, these debugger statements are ignored, however due to noise and potential performance impact it is not good practice to leave debugger statements in code.

-->

---

# Exercises

## Part 1


- Open a terminal or command prompt and navigate to the folder containing the calculator.js file.
- Run the command node --inspect-brk calculator.js. This will start the Node.js application with a debugger attached and paused on the first line.
- Open Google Chrome and navigate to chrome://inspect.
- Under "Remote Target", click on "inspect" for the calculator.js process.
- The Chrome DevTools will open. Press "Resume script execution" (F8) to continue until the debugger statement is hit.
- Inspect the variables, step through the code, and fix the issue by changing the subtraction operator to the addition operator.

## Part 2
1. Start `exercise2.js` with Node in Inspect Mode, but with the application immediately paused on the first line of execution code.

If this done correctly, then the program should be paused on line 1. Verify this in the Chrome Devtools.

2. Explore setting breakpoints and then querying your API using code and the UI.

3. Explore other scripts we have written and in inspect mode. 