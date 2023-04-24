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

# Error handling

---

# Problem

<v-clicks>

JavaScript is a dynamically typed language. You can call a function with any types of arguments passed to it and the function will try to execute.

```js
const changeVal = (func, val) => func(val);
console.log(changeVal({}, 6));
// TypeError: func is not a function
```

```js
const addTen = num => num + 10;
const addTenToEach = arr => arr.map(addTen);
const arrayOfNumbersIThink = [0, 2, { number: 6 }, 8];
const result = addTenToEach(arrayOfNumbersIThink);

console.log(result);
// [ 10, 12, '[object Object]10', 18 ]

nextOperation(result);
// ... danger
```

</v-clicks>


<!--

Which would fail and break your application, as changeVal is expecting a function as its first argument, and instead an object has been passed. This example seems trivial, but can easily happen (perhaps by forgetting to pass all arguments into a function, or passing them in the wrong order).

Sometimes errors happen silently, causing problems down the line that are hard to trace.

Here our addTen function has unknowingly worked with two different data types: a Number and an Object. When asked to add a number to an object, the JavaScript interpreter coerces them both to strings and concatenates them together to produce '[object Object]10', which is not the intended outcome.

If arrayOfNumbersIThink was retrieved from an API call or user input, we wouldn't always be certain the values will be what we expect. How can we deal with these situations?

-->

---

# Kinds of Errors

<div v-click>

1. Operational

- These are runtime errors that are usually caused by some external factor (e.g. any kind of network error, failure to read a file, running out of memory, etc.)

</div>

<div v-click>

2. Developer

- These are bugs; they are unintended and/or unanticipated behaviour of the code, and they can only be fixed by changing the code (e.g. calling a function with the wrong number of arguments)

</div>

<!--

Operational Errors are errors that happen while a program is undertaking a task. For instance, network failure would be an operational error. Operational errors should ideally be recovered from by applying a strategy that is appropriate to the scenario. For instance, in the case of a network error, a strategy would likely be to retry the network operation.

Developer Error is where a developer has made a mistake. The main example of this is invalid input. In these cases the program should not attempt to continue running and should instead crash with a helpful description so that the developer can address their mistake.

How you should handle any given error depends on what kind of error it is. Operational errors are a normal part of the issues a program must deal with. They typically should not cause the program to terminate or behave unexpectedly. By contrast, programmer errors are by definition unanticipated, and may potentially leave the application with unpredictable state and behaviour. In this case it is usually best to terminate the program.

There is, however, no blanket rule for what to do; each error represents a specific problem in the context of an entire application and the appropriate response to it will be heavily context dependent.

-->

---

# Approaches

Good error handling is typically not something that can just be bolted onto an existing program as an afterthought. Well conceived error handling will affect the structure of the code. In JavaScript and Node.js, there are a number of approaches that we will explore.

---

# Some General Principles

<v-clicks>

- Be consistent, not ad-hoc
- Try to trip into a failure code path as early as possible
- Propagate errors to a part of the application that has sufficient context to know how to deal with them

</v-clicks>

<!--

Inconsistent approaches to error handling will complicate your code and make it much harder to reason about.

A code path is the path that data takes through your code. A success code path is the path data takes if everything goes right. A failure code path is the path data takes if something goes wrong.

For example, it may be tempting to return default values in the case of an error and allow the application to continue as normal.

This may be appropriate in some cases, but can often cover up the root cause of an error and make it difficult to track down, or result in unhelpful error messages.

Many times, we will write generic functions to perform common actions, like making a network request.

If the network request fails, the generic function cannot infer the appropriate response, because it doesn't know which part of the application it has been called from.

It should therefore try to propagate the error to its caller instead of trying to recover directly.

-->

---

# Illustrative Example

To illustrate the three approaches we will cover, we will use the same simple example in each, so that comparisons are easier. Imagine you intend to write a function `applyToInteger`, with the following signature:

```js
applyToInteger(func, integer);
```

That is, the function accepts two arguments, func, which is a Function, and integer which is a whole Number. It applies the func to integer and returns the result. We will use this example to explore how to deal with unexpected inputs.

---
layout: two-cols
---

# Approach 1: Error-First Callbacks

We've seen this as a widespread pattern in Node.js. A callback argument is passed which is operated whether or not an error has occurred.

::right::

```js
const applyToInteger = (func, integer, callback) => {
  if (typeof func !== "function") {
    callback(new TypeError("Invalid argument: First argument is not a function"));
  }
  else if (!Number.isInteger(integer)) {
    callback(new TypeError(`Invalid argument: Second argument ${integer} is not an integer`));
  }
  else {
    callback(null, func(integer));
  }
};

const applyAndPrintResult = (func, integer) => {
  applyToInteger(func, integer, (err, result) => {
    if (err) {
      console.log("Sorry, result could not be calculated:");
      console.log(err.message);
    } else {
      console.log("Result successfully calculated:");
      console.log(`Applying ${func.name} to ${integer} gives ${result}`);
    }
  });
};
```

<!--

This is the convention for handling errors when using callbacks for asynchronous control flow in Node. Try not to deviate from this pattern when writing async callback-based code.

Structurally similar to returning errors in that it requires checks in the calling code.
Maintain consistent interfaces; if a function requires a callback, do not also throw or return errors to the caller (these methods will be covered in approaches 2 and 3).

-->

---

# Approach 2 - Throwing and Catching Errors

## Throwing

During runtime, errors can be thrown in our application unexpectedly by computations acting on faulty computations produced earlier (like the first example above). We can also manually throw errors ourselves by using the throw keyword. This will immediately terminate the application, unless there is a catch block in the call stack.

<v-clicks>

- You can throw anything
- You could throw a string
- It is best to throw an instance of the Error class

```js
const applyToInteger = (func, integer) => {
  if (typeof func !== "function") {
    throw new TypeError("Invalid argument: First argument is not a function");
  }
  if (!Number.isInteger(integer)) {
    throw new TypeError(`Invalid argument: Second argument ${integer} is not an integer`);
  }

  return func(integer);
};
```

</v-clicks>


<!--

Typically, an input error is dealt with by using the throw keyword:

function doTask (amount) {
  if (typeof amount !== 'number') throw new Error('amount must be a number')
  return amount / 2
}

doTask("2")

If doTask is called with a non-number, for instance doTask('here is some invalid input') the program will crash.

When the program crashes, a stack trace is printed. This stack trace comes from the error object we created straight after using the throw keyword. The Error constructor is native to JavaScript, and takes a string as the Error message, while auto generating a stack trace when created.

While it's recommended to always throw object instantiated from Error (or instantiated from a constructor that inherits from Error), it is possible to throw any value:

function doTask (amount) {
  if (typeof amount !== 'number') throw new Error('amount must be a number')
  // THE FOLLOWING IS NOT RECOMMENDED:
  if (amount <= 0) throw 'amount must be greater than zero'
  return amount / 2
}

doTask(-1)

By passing -1 to doTask here, it will trigger a throw of a string, instead of an error.

In this case there is no stack trace because an Error object was not thrown. As noted in the output the --trace-uncaught flag can be used to track the exception however this is not ideal. It's highly recommended to only throw objects that derive from the native Error constructor, either directly or via inheritance.

-->

---

# Catching

Errors that have been thrown can be caught using a try...catch block. The catch block will catch all errors that arise in the try block, even if they are programmer errors. Ideally there would be sufficient logic in the catch block to differentiate these cases so that we are not at risk of recovering from a programmer error as though it is an operational error.

```js
const applyAndPrintResult = (func, integer) => {
  try {
    const result = applyToInteger(func, integer);

    console.log("Result successfully calculated:");
    console.log(`Applying ${func.name} to ${integer} gives ${result}`);
  } catch (e) {
    console.log("Sorry, result could not be calculated:");
    console.log(e.message);
  }
};
```

---
layout: two-cols
---

# Approach 3 - Returning Errors to the Caller

Rather than throwing the error, another approach you might consider is simply to return it to the caller. Our example looks very similar to the second approach, except that instead of a try/catch block, we have an if/else that checks the return value using the instanceof operator.

::right::

```js
const applyToInteger = (func, integer) => {
  if (typeof func !== "function") {
    return new TypeError("Invalid argument: First argument is not a function");
  }

  if (!Number.isInteger(integer)) {
    return new TypeError(`Invalid argument: Second argument ${integer} is not an integer`);
  }

  return func(integer);
};

const applyAndPrintResult = (func, integer) => {
  const result = applyToInteger(func, integer);

  if (result instanceof Error) {
    console.log("Sorry, result could not be calculated:");
    console.log(result.message);
  } else {
    console.log("Result successfully calculated:");
    console.log(`Applying ${func.name} to ${integer} gives ${result}`);
  }
};
```

---

# Native Error Constructors

As well as the native Error constructor:

```js
new Error('this is an error message');
```
there are six other native error constructors.

These are mostly for JS API's but you can leverage them if you want but we'll explore why that mightn't always be the best idea!

<v-clicks>

- EvalError
- SyntaxError
- RangeError
- ReferenceError
- TypeError
- URIError

</v-clicks>


<!--

While fairly drastic, throwing errors is a useful approach and is appropriate in many cases.

Throwing can be useful for making critical assertions about the state of your application, especially during startup (e.g. database connection has been established).

It's not possible to wrap an asynchronous function in a try/catch block, so throwing should only be used with synchronous code. Errors thrown from asynchronous functions will not be caught. 

Remember to use catch blocks to avoid inappropriate program termination. (e.g. a server should usually not crash in the course of dealing with a client request).

Without catch blocks codebases that throw errors extensively will be very fragile.

Do not simply log the error in a catch block. This can be worse than no error handling at all.

Note that catch will trap errors that are thrown at any point in the call stack generated by the try block.

As discussed in the previous section, Error is the native constructor for generating an error object. To create an error, call new Error and pass a string as a message:

new Error('this is an error message')

These error constructors exist mostly for native JavaScript API's and functionality. For instance, a ReferenceError will be automatically thrown by the JavaScript engine when attempting to refer to a non-existent reference.

Like any object, an error object can have its instance verified:

$ node -p "var err = new SyntaxError(); err instanceof SyntaxError"  
$ node -p "var err = new SyntaxError(); err instanceof Error"  
$ node -p "var err = new SyntaxError(); err instanceof EvalError" 

Notice that, given err is an object created with new SyntaxError(), it is both an instanceof SyntaxError and an instanceof Error, because SyntaxError - and all other native errors, inherit from Error.

Native errors objects also have a name property which contains the name of the error that created it.

$ node -e "var err = new TypeError(); console.log('err is:', err.name)" 
$ node -e "var err = new Error(); console.log('err is:', err.name)"

For the most part, there's only two of these error constructors that are likely to be thrown in library or application code, RangeError and TypeError. Let's update the code from the previous section to use these two error constructors:

function doTask (amount) {
if (typeof amount !== 'number') throw new TypeError('amount must be a number')
if (amount <= 0) throw new RangeError('amount must be greater than zero')
return amount / 2
}

The following is the output of calling doTask(-1).

This time the error message is prefixed with RangeError instead of Error.

The following is the result of calling doTask('here is some invalid input').

his time the error message is prefixed with TypeError instead of Error.

For more information about native errors see MDN web docs - "Error".


-->

---
layout: two-cols
---

# Custom Errors

<v-clicks>

- Native errors are limited and rudimentary.

- We can make our own by subclassing native error constructors or by using a code property.

```js {all|4-8|5|5-6|5-7|all}
function doTask (amount) {
  if (typeof amount !== 'number') throw new TypeError('amount must be a number')
  if (amount <= 0) throw new RangeError('amount must be greater than zero')
  if (amount % 2) {
    const err = Error('amount must be even')
    err.code = 'ERR_MUST_BE_EVEN'
    throw err
  }
  return amount / 2
}

doTask(3)
```

</v-clicks>

::right::

<v-clicks>

```js {all|1|2-4|5|11|all}
class OddError extends Error {
  constructor (varName = '') {
    super(varName + ' must be even')
  }
  get name () { return 'OddError' }
}

function doTask (amount) {
  if (typeof amount !== 'number') throw new TypeError('amount must be a number')
  if (amount <= 0) throw new RangeError('amount must be greater than zero')
  if (amount % 2) throw new OddError('amount')
  return amount / 2
}
```

</v-clicks>


<!--

The native errors are a limited and rudimentary set of errors that can never cater to all possible application errors. There are different ways to communicate various error cases but we will explore two: subclassing native error constructors and use a code property. These aren't mutually exclusive.

Let's add a new validation requirement for the doTask function's amount argument, such that it may only contain even numbers.

In our first iteration we'll create an error and add a code property:

function doTask (amount) {
  if (typeof amount !== 'number') throw new TypeError('amount must be a number')
  if (amount <= 0) throw new RangeError('amount must be greater than zero')
  if (amount % 2) {
    const err = Error('amount must be even')
    err.code = 'ERR_MUST_BE_EVEN'
    throw err
  }
  return amount / 2
}

doTask(3)

In the next section we'll see how to intercept and identify errors but when this error occurs it can be identified by the code value that was added and then handled accordingly. Node code API's use the approach of creating a native error (either Error or one of the six constructors that inherit from Error) adding a code property. For a list of possible error codes see "Node.js Error Codes".

We can also inherit from Error ourselves to create a custom error instance for a particular use case. Let's create an OddError constructor:

class OddError extends Error {
  constructor (varName = '') {
    super(varName + ' must be even')
  }
  get name () { return 'OddError' }
}

The OddError constructor extends Error and takes an argument called varName. In the constructor method we call super which calls the parent constructor (which is Error) with a string composed of varName concatenated with the string ' must be even'. When instantantiated like so, new OddError('amount') this will result in an error message if 'amount must be even'. Finally we add a name getter which returns 'OddError' so that when the error is displayed in the terminal its name corresponds to the name of our custom error constructor. Using a name getter is a simple way to make the name non-enumerable and since it's only accessed in error cases it's fine from a performance perspective to use a getter in this limited case.

Now we'll update doTask to use OddError:

function doTask (amount) {
  if (typeof amount !== 'number') throw new TypeError('amount must be a number')
  if (amount <= 0) throw new RangeError('amount must be greater than zero')
  if (amount % 2) throw new OddError('amount')
  return amount / 2
}

doTask(3)

The strategies of using a custom error constructor and adding a code property are not mutually exclusive, we can do both. Let's update OddError like so:

class OddError extends Error {
  constructor (varName = '') {
    super(varName + ' must be even')
    this.code = 'ERR_MUST_BE_EVEN'
  }
  get name () {
    return 'OddError [' + this.code + ']'
  }
}




-->


---

# Try/Catch

<v-clicks>

- When an error is thrown in synchronous code, it can be handled with a try/catch block.
- When branching based on error type, we should be careful when using the native error constructors.
- Use duck-typing and rely on the error code more than the error type.
- Try/catch blocks won't be triggered if there is a callback function. 
- To fix this anti-pattern, move the try/catch block into the callback body.

</v-clicks>

<!--

When an error is thrown in a normal synchronous function it can be handled with a try/catch block.

Using the same code from the previous section, we'll wrap the doTask(3) function call with a try/catch block.

try {
  const result = doTask(3)
  console.log('result', result)
} catch (err) {
  console.error('Error caught: ', err)
}

doTask(3)
doTask('here is some invalid input')
doTask(-1)

If we execute the code after each change, each error case will lead to a different outcome.

The first case causes an instance of our custom OddError constructor to be thrown, this is detected by checking whether the caught error (err) is an instance of OddError and then the message cannot be odd is logged. The second scenario leads to an instance of TypeError to be thrown which is determined by checking if err is an instance of TypeError in which case wrong type is output. In the third variation and instance of RangeError is thrown, the caught error is determined to be an instance of RangeError and then out of range is printed to the terminal.

However, checking the instance of an error is flawed, especially when checking against native constructors. Consider the following change to the code.

try {
  const result = doTask(4)
  result()
  console.log('result', result)
} catch (err) {
  if (err instanceof TypeError) {
    console.error('wrong type')
  } else if (err instanceof RangeError) {
    console.error('out of range')
  } else if (err.code === 'ERR_MUST_BE_EVEN') {
    console.error('cannot be odd')
  } else {
    console.error('Unknown error', err)
  }
}

Between calling doTask and the console.log the value returned from doTask(4) (which will be 2), which is assigned to result is called as a function (result()). The returned value is a number, not a function so this will result in an error object which, an instance of TypeError so the output will be wrong type. This can cause confusion, it's all too easy to assume that the TypeError came from doTask whereas it was actually generated locally.

$ node example.js wrong type $

To mitigate this, it's better to use duck-typing in JavaScript. This means looking for certain qualities to determine what an object is - e.g. if it looks like a duck, and quacks like a duck it's a duck. To apply duck-typing to error handling, we can follow what Node core APIs do and use a code property.

Let's write a small utility function for adding a code to an error object:

function codify (err, code) {
  err.code = code
  return err
}

Now we'll pass the TypeError and RangeError objects to codify with context specific error codes:

function doTask (amount) {
  if (typeof amount !== 'number') {
    throw codify(new TypeError('amount must be a number'), 'ERR_AMOUNT_MUST_BE_NUMBER')
  } 
)

if (amount <= 0) {
  throw codify(new RangeError('amount must be greater than zero'), 'ERR_AMOUNT_MUST_EXCEED_ZERO')
}

if (amount % 2) {
  throw new OddError('amount')
}

return amount/2
}

Finally we can update the catch block to check for the code property instead of using an instance check:

try {
  const result = doTask(4)
  result()
  console.log('result', result)
} catch (err) {
  if (err.code = 'ERR_AMOUNT_MUST_BE_NUMBER') {
    console.error('wrong type')
  } else if (err.code = 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
    console.error('out of range')
  } else if (err.code === 'ERR_MUST_BE_EVEN') {
    console.error('cannot be odd')
  } else {
    console.error('Unknown error', err)
  }
}

Now erroneously calling result as a function will cause the error checks to reach the final else branch in the catch block.

It's important to realize that try/catch cannot catch errors that are thrown in a callback function that is called at some later point. Consider the following.

// WARNING: NEVER DO THIS:
try {
  setTimeout(() => {
    const result = doTask(3)
    console.log('result', result)
  }, 100)
} catch (err) {
  if (err.code = 'ERR_AMOUNT_MUST_BE_NUMBER') {
    console.error('wrong type')
  } else if (err.code = 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
    console.error('out of range')
  } else if (err.code === 'ERR_MUST_BE_EVEN') {
    console.error('cannot be odd')
  } else {
    console.error('Unknown error', err)
  }
}

The doTask(3) call will throw an OddError error, but this will not be handled in the catch block because the function passed to setTimeout is called a hundred milliseconds later. By this time the try/catch block has already been executed, so this will result in the error not being handled:


When encountering such an antipattern, an easy fix is to move the try/catch into the body of the callback function:

setTimeout(() => {
  try {
    const result = doTask(3)
    console.log('result', result)
  } catch (err) {
    if (err.code = 'ERR_AMOUNT_MUST_BE_NUMBER') {
      console.error('wrong type')
    } else if (err.code = 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
      console.error('out of range')
    } else if (err.code === 'ERR_MUST_BE_EVEN') {
      console.error('cannot be odd')
    } else {
      console.error('Unknown error', err)
    }
  }
}, 100)

-->

---

# Rejections

<v-clicks>

- A throw in synchronous code is known as an exception. A rejection occurs when a promise rejects - this is equivalent to an async error.
- When working with Promises, we need to reject with our errors.
- We should have a `.catch()` for all of our Promises.
- Uncaught Promise Rejections will cause our programs to crash.

</v-clicks>

<!--

We explored asynchronous syntax and patterns focusing on callback patterns, Promise abstractions and async/await syntax. So far we have dealt with errors that occur in a synchronous code. Meaning, that a throw occurs in a normal synchronous function (one that isn't async/await, promise-based or callback-based). When a throw in a synchronous context is known as an exception. When a promise rejects, it's representing an asynchronous error. One way to think about exceptions and rejections is that exceptions are synchronous errors and rejections are asynchronous errors.

Let's imagine that doTask has some asynchronous work to do, so we can use a callback based API or we can use a promise-based API (even async/await is promise-based).

Let's convert doTask to return a promise that resolves to a value or rejects if there's an error:

function doTask (amount) {
  return new Promise((resolve, reject) => {
    if (typeof amount !== 'number') {
      reject(new TypeError('amount must be a number'))
      return
    }
    if (amount <= 0) {
      reject(new RangeError('amount must be greater than zero'))
      return
    }
    if (amount % 2) {
      reject(new OddError('amount'))
      return
    }
    resolve(amount/2)
  })
}

doTask(3)

The promise is created using the Promise constructor, see MDN web docs - "Constructor Syntax" for full details. The function passed to Promise is called the tether function, it takes two arguments, resolve and reject which are also functions. We call resolve when the operation is a success, or reject when it is a failure. In this conversion, we're passing an error into reject for each of our error cases so that the returned promise will reject when doTask is passed invalid input.

Calling doTask with an invalid input, as in the above, will result in an unhandled rejection.

The rejection is unhandled because promises must use the catch method to catch rejections and so far we haven't attached a catch handler. Let's modify the doTask call to the following:

doTask(3)
  .then((result) => {
    console.log('result', result)
  })
  .catch((err) => {
    if (err.code = 'ERR_AMOUNT_MUST_BE_NUMBER') {
      console.error('wrong type')
    } else if (err.code = 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
      console.error('out of range')
    } else if (err.code === 'ERR_MUST_BE_EVEN') {
      console.error('cannot be odd')
    } else {
      console.error('Unknown error', err)
  }
})

Now this is functionality equivalent to the synchronous non-promise based form of our code, the error are handled in the same way.

A then handler was also added alongside a catch handler, so when the doTask function is successful the result will be logged out. Here's what happens if we change doTask(3) in the above code to doTask(4):

$ node example.js result 2

It's very important to realize that when the throw appears inside a promise handler, that will not be an exception, that is it won't be an error that is synchronous. Instead it will be a rejection, the then or catch handler will return a new promise that rejects as a result of a throw within a handler.

Let's modify the then handler so that a throw occurs inside the handler function:

doTask(4)
  .then((result) => {
    throw Error('spanner in the works')
  })
  .catch((err) => {
    if (err instanceof TypeError) {
      console.error('wrong type')
    } else if (err instanceof RangeError) {
      console.error('out of range')
    } else if (err.code === 'ERR_MUST_BE_EVEN') {
      console.error('cannot be odd')
    } else {
      console.error('Unknown error', err)
    }
  })

Even though doTask(4) does not cause a promise rejection, the throw in the then handler does. So the catch handler on the promise returned from then will reach the final else branch and output unknown error. Bear in mind that functions can call functions, so any function in a call stack of functions that originates in a then handler could throw, which would result in a rejection instead of the normally anticipated exception.

-->

---

# Async Try/Catch

<v-clicks>

- A cleaner and more intuitive way to write our code is using try/catch in an async function.
- This is just "syntatic sugar" - under the hood it's the same Promise/then/catch structure.
- It reads easier, more like synchronous code and is generally easier to reason about.

</v-clicks>

<!--

The async/await syntax supports try/catch of rejections. In other words we can use try/catch on asynchronous promise-based APIs instead of using then and catch handler as in the next section, let's create a async function named run and reintroduce the same try/catch pattern that was used when calling the synchronous form of doTask:

async function run () {
  try {
    const result = await doTask(3)
    console.log('result', result)
  } catch (err) {
    if (err instanceof TypeError) {
      console.error('wrong type')
    } else if (err instanceof RangeError) {
      console.error('out of range')
    } else if (err.code === 'ERR_MUST_BE_EVEN') {
      console.error('cannot be odd')
    } else {
      console.error('Unknown error', err)
    }
  }
}

run()

The only difference, other than wrapping the try/catch in an async function, is that we await doTask(3) so that the async function can handle the promise automatically. Since 3 is an odd number, the promise returned from doTask will call reject with our custom OddError and the catch block will identify the code property and then output cannot be odd:

$ node example.js cannot be odd

Using an async function with a try/catch around an awaited promise is syntactic sugar. The catch block in the async run function is the equivalent of the catch method handler in the previous section. An async function always returns a promise that resolves to the returned value, unless a throw occurs in that async function, in which case the returned promise rejects. This means we can convert our doTask function from returning a promise where we explicitly call reject within a Promise tether function to simply throwing again.

Essentially we can convert doTask to its original synchronous form but prefix async to the function signature, like so:

async function doTask (amount) {
  if (typeof amount !== 'number') throw new TypeError('amount must be a number')
  if (amount <= 0) throw new RangeError('amount must be greater than zero')
  if (amount % 2) throw new OddError('amount')
  return amount/2
}

This is, again, the same functionality as the synchronous version but it allows for the possibility of doTask to perform other asynchronous tasks, for instance making a request to an HTTP server, writing a file or reading from a database. All of the errors we've been creating and handling are developer errors but in an asynchronous context we're more likely to encounter operational errors. For instance, imagine that an HTTP request fails for some reason - that's an asynchronous operational error and we can handle it in exactly the same way as the developer errors we're handling in this section. That is, we can await the asynchronous operation and then catch any operational errors as well.

By means of example let's imagine we have a function call asyncFetchResult that makes an HTTP request, sending the amount to another HTTP server for it to be processed. If the other server is successful the promise returned from asyncFetchResult resolves to the value provided by the HTTP service. If the fetch request is unsuccessful for any reason (either because of a network error, or an error in the service) then the promise will reject. We could use the asyncFetchResult function like so:

async function doTask (amount) {
  if (typeof amount !== 'number') throw new TypeError('amount must be a number')
  if (amount <= 0) throw new RangeError('amount must be greater than zero')
  if (amount % 2) throw new OddError('amount')
  const result = await asyncFetchResult(amount)
  return result
}

It's important to note that asyncFetchResult is an imaginary function for conceptual purposes only in order to explain the utility of this approach so the above code will not work. However conceptually speaking, in the case where the promise returned from asyncFetchResult rejects this will cause the promise returned from doTask to reject (because the promise returned from asyncFetchResult is awaited). That would trigger in turn the catch block in the run async function. So the catch block could then be extended to handle that operational error. This is error propagation in an async/await context. In the next and final section we will explore propagating errors in synchronous function, async/await and promise and callback-based scenarios.

-->

---

# Exercises

There are three different approaches to solving a problem. 

Once you've solved the problems the first time, the other two times will be a refactoring exercise.

Make sure you look at the solutions if you get stuck.
