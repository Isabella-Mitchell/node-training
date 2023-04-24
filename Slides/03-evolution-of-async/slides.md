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
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# Async Control Flow

---

By the end of this section, you should be able to:
- Understand native asynchronous primitives.
- Understand serial and parallel control flow with callbacks.
- Understand serial and parallel control flow with promises.
- Understand serial and parallel control flow with async/await.

<!--
Node.js is a server-side JavaScript platform, and JavaScript is an event-driven language. That means that code execution isn't necessarily sequential, tasks can be scheduled and then another operation can occur at a future point when the scheduled task completes. Take the setTimeout function as an example. A task is scheduled (wait for a specified amount of milliseconds), when the task completes (when the specified time has passed) the function passed to setTimeout is called. In the meantime, the next line of code after the setTimeout was already executed. All asynchronous Input/Output in Node.js works in the same way. In this section we're going to investigate various common control flow patterns in Node.js. Each lesson within this section will introduce a native asynchronous abstraction, and then discuss ways to implement asynchronous control flow for both serial and parallel execution.
-->

---

# Callbacks

A function that is called at some future point, once a task has been completed.

```js
const {readFile} = require('fs')

readfile(__filename, (err, contents) => {
  if(err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
})
```

<!--
A callback is a function that will be called at some future point, once a task has been completed. Until the fairly recent introduction of async/await, which will be discussed shortly, callback functions were the only way to manage asynchronous flow.

The fs module (file system operations) will be discussed at length in Section 13 - "Using the File System" but for purposes of illustration, let's take a look at an example readFile call:

const { readFile } = require('fs')
readFile(__filename, (err, contents) => {
if (err) {
console.error(err)
return
}
console.log(contents.toString())
})

If this is placed into a file and executed the program will read its own source code and print it out. To understand why it loads itself, it's important to know that _filename in Node.js holds the path of the file currently being executed. This is the first argument passed to readFile. The readFile function schedules a task, which is to read the given file. When the file has been read, the readFile function will call the function provided as the second argument.

The second argument to readFile is a function that has two parameters, err and contents. This function will be called when readFile has completed its task. If there was an error, then the first argument passed to the function will be an error object representing that error, otherwise it will be null. Always having an error as the first parameter is convention in Node, this type of error-first callback is known as an Errback.

If the readFile function is successful, the first argument (err) will be null and the second argument (contents) will be the contents of the file.

The time it takes to complete an operation will be different depending on the operation. For instance if three files of significantly different sizes were read, the callback for each readFile call would be called relative to the size of the file regardless of which order they began to be read.
-->

---

# Callbacks - Parallel Execution

A program with three variables, `smallFile`, `mediumFil` and `bigFile`.

```js
const { readFile } = require('fs')
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}
readFile(bigFile, print)
readFile(mediumFile, print)
readFile(smallFile, print)
```

<p v-click>Small file will be printed first, even though bigFile was called first.</p>
<p v-click="2">This is a way to achieve parallel execution in Node.</p>

<!--
Imagine a program with three variables, smallFile, mediumFile, bigFile each which holds a string pointing to the path of a file of a greater size than the last. If we want to log out the contents of each file based on when that file has been loaded, we can do something like the following.

On line two smallFile, mediumFile, and bigFile are mocked (i.e. it's pretend) and they're actually all the same file. The actual file they point to doesn't matter, it only matters that we understand they represent different file sizes for the purposes of understanding.

If the files were genuinely different sizes, the above would print out the contents of smallFile first and bigFile last even though the readFile operation for bigFile was called first. This is one way to achieve parallel execution in Node.js.

What if we wanted to use serial execution, let's say we want bigFile to print first, then mediumFile even though they take longer to load than smallFile. Well now the callbacks have to be placed inside each other.
-->

---

# Callbacks - Serial Execution

```js
const { readFile } = require('fs')
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)
const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}
readFile(bigFile, (err, contents) => {
  print(err, contents)
  readFile(mediumFile, (err, contents) => {
    print(err, contents)
    readFile(smallFile, print)
  })
})
```

<p v-click>Serial execution is achieved by waiting for the callback before starting the next async operation.</p>

<!--
Serial execution with callbacks is achieved by waiting for the callback to call before starting the next asynchronous operation.

What if we want all of the contents of each file to be concatenated together and logged once all files are loaded?
-->

---
layout: two-cols
---

## What if we want all of the contents of each file to be concatenated?

::right::

```js {all|21|all}
const { readFile } = require('fs')
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)
const data = []
const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}

readFile(bigFile, (err, contents) => {
  if (err) print(err)
  else data.push(contents)
  readFile(mediumFile, (err, contents) => {
    if (err) print(err)
    else data.push(contents)
    readFile(smallFile, (err, contents) => {
      if (err) print(err)
      else data.push(contents)
      print(null, Buffer.concat(data))
    })
  })
})
```

<!--
On a side note, Buffers are covered later, the use of Buffer.concat here takes the three buffer objects in the data array and concatenates them together.

So far we've used three asynchronous operations, but how would an unknown amount of asynchronous operations be supported? Let's say we have a files array instead. Like the smallFile, mediumFile and bigFile variables, the files array is also conceptual purposes. The idea is that files array could be any length and the goal is to print all the file contents out in the order they appear in the array:
-->

---
layout: two-cols
---

# What about an unknown amount of async operations?


<p v-click="6">Using a self-recursive function with the two extra variables allows us to handle a list of any size.</p>

::right::

```js {all|13|14|25|15-23|all}
const { readFile } = require('fs')
const files = Array.from(Array(3)).fill(__filename)
const data = []

const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}

let count = files.length
let index = 0
const read = (file) => {
  readFile(file, (err, contents) => {
    index += 1
    if (err) print(err)
    else data.push(contents)
    if (index < count) read(files[index])
    else print(null, Buffer.concat(data))
  })
}

read(files[index])
```

<!--
In this case a self-recursive function, read, is created along with two variables, count and index. The count variable is the amount of files to read, the index variable is used to track which file is currently being read. Once a file has been read and added to the data array read is called again if index < count. Otherwise the data array is concatenated and printed out. To reiterate, it doesn't matter that these operations happen to be file reading operations. Control flow patterns apply universally to all asynchronous operations.

Callback-based serial execution can become quite complicated, quite quickly. Using a small library to manage the complexity is advised. One library that can be used for this is fastseries (see npmjs's website)
-->

---
layout: two-cols
---
# fastseries

<p>Callback-based serial execution can become quite complicated, quite quickly.</p>
<p>Using a small library to help with complexity is advised.</p>

::right::

```js {all|13-20|14|16|17|22|all}
const { readFile } = require('fs')
const series = require('fastseries')()
const files = Array.from(Array(3)).fill(__filename)

const print = (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(Buffer.concat(data).toString())
}

const readers = files.map((file) => {
  return (_, cb) => {
    readFile(file, (err, contents) => {
      if (err) cb(err)
      else cb(null, contents)
    })
  }
})

series(null, readers, null, print)
```

---
layout: two-cols
---

# Promises

<p>A promise represents an async operation that is either pending or settled.</p>
<p>If it's settled, it's either resolved or rejected.</p>

::right::
With a callback:

```js
function myAsyncOperation (cb) {
  doSomethingAsynchronous((err, value) => { 
    cb(err, value) 
  })
}

myAsyncOperation(functionThatHandlesTheResult)
```

With a Promise:

```js
function myAsyncOperation () {
  return new Promise((resolve, reject) => {
    doSomethingAsynchronous((err, value) => {
      if (err) reject(err)
      else resolve(value)
    })
  })
}
```

<!--
A promise is an object that represents an asynchronous operation. It's either pending or settled, and if it is settled it's either resolved or rejected. Being able to treat an asynchronous operation as an object is a useful abstraction. For instance, instead of passing a function that should be called when an asynchronous operation completes into another function (eg. a callback), a promise that represents the asynchronous operation can be returned from a function instead.

Instead of myAsyncOperation taking a callback, it returns a promise. The imaginary doSomethingAsynchronous function is callback based, so it has to be wrapped in a promise. To achieve this the Promise constructor is used, it's passed a function called the executor function which has two parameters: resolve and reject. In error cases the error object is passed to reject, in success cases the asynchronously resolved value is passed to resolve.
-->

---

# The `promisify` function

```js
const { promisify } = require('util')
const doSomething = promisify(doSomethingAsynchronous)

function myAsyncOperation () {
  return doSomething()
}

const promise = myAsyncOperation()
                  .then(value => console.log(value))
                  .catch(err => console.log(err))
```

<!--
In this case the first then handler returns a promise that resolves to the stringified version of contents. So when the second then is called on the result of the first then the handler of the second then is called with the stringified contents. Even though an intermediate promise is created by the first then we still only need the one catch handler as rejections are propagated.

If a promise is returned from a then handler, the then method will return that promise, this allows for an easy serial execution pattern:
-->

---
layout: two-cols
---

# A more concrete example


```js
const { promisify } = require('util')
const { readFile } = require('fs')

const readFileProm = promisify(readFile)

const promise = readFileProm(__filename)

promise.then((contents) => {
  console.log(contents.toString())
})

promise.catch((err) => {
  console.error(err)
})
```

::right::

<div v-click>

```js
const { readFile } = require('fs').promises

readFile(__filename)
  .then((contents) => {
    console.log(contents.toString())
  })
  .catch(console.error)
```
</div>


---

# Series operation

```js {all|10|14|16|all}
const { readFile } = require('fs').promises
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

const print = (contents) => {
  console.log(contents.toString())
}
readFile(bigFile)
  .then((contents) => {
    print(contents)
    return readFile(mediumFile)
  })
  .then((contents) => {
    print(contents)
    return readFile(smallFile)
  })
  .then(print)
  .catch(console.error)
```

<!--
Once bigFile has been read, the first then handler returns a promise for reading mediumFile. The second then handler receives the contents of mediumFile and returns a promise for reading smallFile. The third then handler is the prints the contents of the smallFile and returns itself. The catch handler will handle errors from any of the intermediate promises.
-->

---
layout:two-cols
---
# Unknown number of files

```js
const { readFile } = require('fs').promises
const files = Array.from(Array(3)).fill(__filename)
const data = []
const print = (contents) => {
  console.log(contents.toString())
}
let count = files.length
let index = 0
const read = (file) => {
  return readFile(file).then((contents) => {
    index += 1
    data.push(contents)
    if (index < count) return read(files[index])
    return data
  })
}

read(files[index])
  .then((data) => {
    print(Buffer.concat(data))
  })
  .catch(console.error)
``` 
---

# Promise.all()

```js
const { readFile } = require('fs').promises
const files = Array.from(Array(3)).fill(__filename)
const print = (data) => {
  console.log(Buffer.concat(data).toString())
}

const readers = files.map((file) => readFile(file))

Promise.all(readers)
  .then(print)
  .catch(console.error)
```

<p>Slight problem here is that if one of the Promises fails, it all fails.</p>

---

# Promise.allSettled()

```js {all|15-19|5-7|8-10|11-12|all}
const { readFile } = require('fs').promises
const files = [filename, 'not a file', filename]

const print = (results) => {
  results
    .filter(({status}) => status = 'rejected')
    .forEach(({reason}) => console.error(reason))
  const data = results
    .filter(({status}) => status = 'fulfilled')
    .map(({value}) => value)
  const contents = Buffer.concat(data)
  console.log(contents.toString())
}

const readers = files.map((file) => readFile(file))

Promise.allSettled(readers)
  .then(print)
  .catch(console.error)
```

---

# Promises in Parallel

Either use `allSettled` or give each their own then/catch handlers.

```js
const { readFile } = require('fs').promises
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

const print = (contents) => {
  console.log(contents.toString())
}

readFile(bigFile).then(print).catch(console.error)
readFile(mediumFile).then(print).catch(console.error)
readFile(smallFile).then(print).catch(console.error)
```

---

# Async/Await

- Stylistically similar to sync code.

```js
const { readFile } = require('fs').promises

async function run () {
  const contents = await readFile(__filename)
  console.log(contents.toString())
}

run().catch(console.error)
```

---

# Series in async/await

```js
const { readFile } = require('fs').promises

const print = (contents) => {
  console.log(contents.toString())
}
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

async function run () {
  print(await readFile(bigFile))
  print(await readFile(mediumFile))
  print(await readFile(smallFile))
}

run().catch(console.error)
```

---

# Concatenate

```js
const { readFile } = require('fs').promises
const print = (contents) => {
  console.log(contents.toString())
}
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

async function run () {
  const data = [
    await readFile(bigFile),
    await readFile(mediumFile),
    await readFile(smallFile)
  ]
  print(Buffer.concat(data))
}

run().catch(console.error)
```

---

# Unknown length?

```js
const { readFile } = require('fs').promises

const print = (contents) => {
  console.log(contents.toString())
}

const files = Array.from(Array(3)).fill(__filename)

async function run () {
  const data = []
  for (const file of files) {
    data.push(await readFile(file))
  }
  print(Buffer.concat(data))
}

run().catch(console.error)
```

<p>This is the right approach where the operations must be sequentially called.</p>

---

# Output order matters, Execution order doesn't

```js
const { readFile } = require('fs').promises
const files = Array.from(Array(3)).fill(__filename)
const print = (contents) => {
  console.log(contents.toString())
}

async function run () {
  const readers = files.map((file) => readFile(file))
  const data = await Promise.all(readers)
  print(Buffer.concat(data))
}

run().catch(console.error)
```

<p>Parallel execution with sequentially ordered output.</p>
Same problem with the Promise.all() as before

---

# Use allSettled()

```js
const { readFile } = require('fs').promises
const files = [filename, 'foo', filename]
const print = (contents) => {
  console.log(contents.toString())
}

async function run () {
  const readers = files.map((file) => readFile(file))
  const results = await Promise.allSettled(readers)

  results
    .filter(({status}) => status === 'rejected')
    .forEach(({reason}) => console.error(reason))

  const data = results
    .filter(({status}) => status === 'fulfilled')
    .map(({value}) => value)

  print(Buffer.concat(data))
}

run().catch(console.error)
```

---

# Exercises

The idea for this series of exercises is to implement the same functionality using the three different approaches to async programming.


# Exercise 1: Serial and Parallel Control Flow with Callbacks
## Objective: Understand serial and parallel control flow with callbacks.

Scenario: You have to fetch data from three different APIs and process it in either serial or parallel order.

Instructions:

- Write a function fetchData(api, callback) that simulates fetching data from an API using a callback.
- Create three API URLs as strings.
- Implement serial control flow by calling fetchData for the first API, then inside its callback, call fetchData for the second API, and so on.
- Implement parallel control flow by calling fetchData for all APIs simultaneously, and use a counter or another method to determine when all callbacks are completed.

# Exercise 2: Serial and Parallel Control Flow with Promises
## Objective: Understand serial and parallel control flow with promises.

Scenario: You have to fetch data from three different APIs and process it in either serial or parallel order.

Instructions:

- Write a function fetchData(api) that simulates fetching data from an API using a promise.
- Create three API URLs as strings.
- Implement serial control flow by chaining fetchData calls for each API using .then().
- Implement parallel control flow by using Promise.all() to fetch data from all APIs simultaneously.

# Exercise 3: Serial and Parallel Control Flow with Async/Await
## Objective: Understand serial and parallel control flow with async/await.

Scenario: You have to fetch data from three different APIs and process it in either serial or parallel order.

Instructions:

- Write a function fetchData(api) that simulates fetching data from an API using a promise.
- Create three API URLs as strings.
- Create an async function serialFlow() that fetches data in serial order by awaiting fetchData() calls for each API.
- Create an async function parallelFlow() that fetches data in parallel order by using Promise.all() with fetchData() calls for each API, and then awaits the result.
- Call both serialFlow() and parallelFlow() functions and observe the difference in execution order.