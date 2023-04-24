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

# Writing Unit Tests

---

By the end of this section, you should be able to:

- Understand the basic principles of assertions.
- Discover a selection of test runner frameworks.
- Configure a project to run tests in a standardized way.

<!--

Testing an application or service is a key skill for any developer. If an application or service hasn't been thoroughly tested it should not be considered production ready. In this final chapter, we'll discuss various approaches and techniques for testing different kinds of API designs.

-->

---
# Testing Pyramid/Trophy

<p></p>
<div>
<img src="https://testingjavascript.com/static/trophyWithLabels@2x-4d0c19a94d88ac607cc5cbeaa8f8708d.png"  v-click>
</div>

---

# Assertions

An assertion checks a value for a given condition and throws if that condition is not met.

The core assert module exports a function that will throw an AssertionError when the value passed to it is falsy.

---
layout: two-cols
---

# Assertion methods

- assert.ok(val) – the same as assert(val)
- assert.equal(val1, val2) – coercive equal, val1 == val2
- assert.notEqual(val1, val2) – coercive unequal, val1 != val2
- assert.strictEqual(val1, val2) – strict equal, val1 === val2
- assert.notStrictEqual(val1, val2) – strict unequal, val1 !== val2
- assert.deepEqual(obj1, obj2) – coercive equal for all values in an object
- assert.notDeepEqual(obj1, obj2) – coercive unequal for all values in an object
- assert.deepStrictEqual(obj1, obj2) – strict equal for all values in an object

::right::

- assert.notDeepStrictEqual(obj1, obj2) – strict unequal for all values in an object
- assert.throws(function) – assert that a function throws
- assert.doesNotThrow(function) – assert that a function doesn't throw
- assert.rejects(promise|async function) – assert promise or returned promise rejects
- assert.doesNotReject(promise|async function) – assert promise or returned promise resolves
- assert.ifError(err) – check that an error object is falsy
- assert.match(string, regex) – test a string against a regular expression
- assert.doesNotMatch(string, regex) – test that a string fails a regular expression
- assert.fail() – force an AssertionError to be thrown

<!--

An assertion checks a value for a given condition and throws if that condition is not met. Assertions are the fundamental building block of unit and integration testing. The core assert module exports a function that will throw an AssertionError when the value passed to it is falsy (meaning that the value can be coerced to false with !!val).

If the value passed to assert is truthy then it will not throw. This is the key behavior of any assertion, if the condition is met the assertion will throw an error. The error throw is an instance of AssertionError (to learn more see Class: assert.AssertionError).

The core assert module has the following assertion methods:

assert.ok(val) – the same as assert(val)
assert.equal(val1, val2) – coercive equal, val1 == val2
assert.notEqual(val1, val2) – coercive unequal, val1 != val2
assert.strictEqual(val1, val2) – strict equal, val1 === val2
assert.notStrictEqual(val1, val2) – strict unequal, val1 !== val2
assert.deepEqual(obj1, obj2) – coercive equal for all values in an object
assert.notDeepEqual(obj1, obj2) – coercive unequal for all values in an object
assert.deepStrictEqual(obj1, obj2) – strict equal for all values in an object
assert.notDeepStrictEqual(obj1, obj2) – strict unequal for all values in an object
assert.throws(function) – assert that a function throws
assert.doesNotThrow(function) – assert that a function doesn't throw
assert.rejects(promise|async function) – assert promise or returned promise rejects
assert.doesNotReject(promise|async function) – assert promise or returned promise resolves
assert.ifError(err) – check that an error object is falsy
assert.match(string, regex) – test a string against a regular expression
assert.doesNotMatch(string, regex) – test that a string fails a regular expression
assert.fail() – force an AssertionError to be thrown

Since the Node core assert module does not output anything for success cases there is no assert.pass method as it would be behaviorally the same as doing nothing.




-->

---

We can group the assertions into the following categories:

- Truthiness (assert and assert.ok)
- Equality (strict and loose) and Pattern Matching (match)
- Deep equality (strict and loose)
- Errors (ifError plus throws, rejects and their antitheses)
- Unreachability (fail)

<!--

We can group the assertions into the following categories:

Truthiness (assert and assert.ok)
Equality (strict and loose) and Pattern Matching (match)
Deep equality (strict and loose)
Errors (ifError plus throws, rejects and their antitheses)
Unreachability (fail)

There are third party libraries that provide alternative APIs and more assertions, and we'll look specifically at Jest. However this set of assertions (not the API itself but the actual assertion functionality provided) tends to be everything we need to write good tests. In fact, the more esoteric the assertion the less useful it is long term. This is because assertions provide a common language of expectations among developers. So inventing or using more complex assertion abstractions that combine basic level assertions reduces the communicability of test code among a team of developers.

Generally when we check a value, we also want to check its type. Let's imagine we're testing a function named add that takes two numbers and adds them together. We can check that add(2, 2) is 4 with.

-->

---
layout: two-cols
---

# Assert equal

<v-clicks>

```js 
const assert = require('assert')
const add = require('./get-add-from-somewhere.js')
assert.equal(add(2, 2), 4)
```

```js
const assert = require('assert')
const add = require('./get-add-from-somewhere.js')
const result = add(2, 2)
assert.equal(typeof result, 'number')
assert.equal(result, 4)
```

</v-clicks>

::right::

<v-clicks>

```js
const assert = require('assert')
const add = require('./get-add-from-somewhere.js')
assert.strict.equal(add(2, 2), 4)
```

</v-clicks>




<!--


This will pass both if add returns 4, but it will also pass if add returns '4' (as a string). It will even pass if add returns an object with the form { valueOf: () => 4 }. This is because assert.equal is coercive, meaning it will convert whatever the output of add is to the type of the expected value. In this scenario, it probably makes more sense if add only ever returns numbers. One way to address this is to add a type check like so:

const assert = require('assert')
const add = require('./get-add-from-somewhere.js')
const result = add(2, 2)
assert.equal(typeof result, 'number')
assert.equal(result, 4)

In this case if add doesn't return the number 4, the typeof check will throw an AssertionError.

The other way to handle this is to use assert.strictEqual:

const assert = require('assert')
const add = require('./get-add-from-somewhere.js')
assert.strictEqual(add(2, 2), 4)

Since assert.strictEqual checks both value and type, using the triple equals operator (===) if add does not return 4 as a number an AssertionError will be thrown.

The assert module also exposes a strict object where namespaces for non-strict methods are strict, so the above code could also be written as:

const assert = require('assert')
const add = require('./get-add-from-somewhere.js')
assert.strict.equal(add(2, 2), 4)

It's worth noting that assert.equal and other non-strict (i.e. coercive) assertion methods are deprecated, which means they may one day be removed from Node core. Therefore if using the Node core assert module, best practice would be always to use assert.strict rather than assert, or at least always use the strict methods (e.g. assert.strictEqual).

There are assertion libraries in the ecosystem which introduce alternative APIs but at a fundamental level, work in the same way. That is, an assertion error will be thrown if a defined condition is not met.

-->

---

# The fluid API (from expect library)

<v-clicks>

```js
const expect = require('expect')
const add = require('./get-add-from-somewhere.js')

expect(add(2, 2)).toStrictEqual(4)
```



</v-clicks>

<!--




Let's take a look at an equivalent example using the fluid API provided by the expect library.

const expect = require('expect')
const add = require('./get-add-from-somewhere.js')

expect(add(2, 2)).toStrictEqual(4)

With the expect assertion library, the value that we are asserting against is passed to the expect function, which returns an object with assertion methods that we can call to validate that value. In this case, we call toStrictEqual to apply a strict equality check. For a coercive equality check we could use expect(add(2, 2).toBe(4).

If an assertion fails, the expect library will throw a JestAssertionError, which contains extra information and prettier output than the core AssertionError instances.

The expect library is part of the Jest test runner framework, which we'll explore in more depth later in this section. For now, we'll continue to discuss Node's assert module, but it's useful to point out that the core concepts are the same across all commonly used assertion libraries.

-->

---

# Deep Equality

What would happen in this assertion?

```js {all|3-9|13-17|all}
const assert = require('assert')

const obj = { 
  id: 1, 
  name: { 
    first: 'Kevin', 
    second: 'Cunningham' 
  } 
}

assert.equal(obj, { 
  id: 1, 
  name: { 
    first: 'Kevin', 
    second: 'Cunningham' 
  } 
})
```




<!--

Deep equality methods, such as assert.deepEqual traverse object structures and then perform equality checks on any primitives in those objects. Let's consider the following object:

const obj = { id: 1, name: { first: 'Kevin', second: 'Cunningham' } }

To compare this object to another object, a simple equality check won't do because equality in JavaScript is by reference for objects:

const assert = require('assert')
const obj = {
  id: 1,
  name: { first: 'Kevin', second: 'Cunningham' }
}
// this assert will fail because they are different objects:
assert.equal(obj, {
  id: 1,
  name: { first: 'Kevin', second: 'Cunningham' }
})

To compare object structure we need a deep equality check:

const assert = require('assert')
const obj = {
  id: 1,
  name: { first: 'Kevin', second: 'Cunningham' }
}
assert.deepEqual(obj, {
  id: 1,
  name: { first: 'Kevin', second: 'Cunningham' }
})

The difference between assert.deepEqual and assert.deepStrictEqual (and assert.strict.deepEqual) is that the equality checks of primitive values (in this case the id property value and the name.first and name.second strings) are coercive, which means the following will also pass:

const assert = require('assert')
const obj = {
  id: 1,
  name: { first: 'Kevin', second: 'Cunningham' }
}
// id is a string but this will pass because it's not strict
assert.deepEqual(obj, {
  id: '1',
  name: { first: 'Kevin', second: 'Cunningham' }
})

It's recommended to use strict equality checking for most cases:

const assert = require('assert')
const obj = {
  id: 1,
  name: { first: 'Kevin', second: 'Cunningham' }
}
// this will fail because id is a string instead of a number
assert.strict.deepEqual(obj, {
  id: '1',
  name: { first: 'Kevin', second: 'Cunningham' }
})
-->

---

# Checking the errors happen

<v-clicks>

- asserts has throws, ifError and rejects

```js
const assert = require('assert')
const add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw Error('inputs must be numbers')
  }
  return a + b
}
```

```js
assert.throws(() => add('5', '5'), Error('inputs must be numbers'))
assert.doesNotThrow(() => add(5, 5))
```


</v-clicks>

<!--

The error handling assertions (throws, ifError, rejects) are useful for asserting that error situations occur for synchronous, callback-based and promise-based APIs.

Let's start with an error case from an API that is synchronous:

const assert = require('assert')
const add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw Error('inputs must be numbers')
  }
  return a + b
}

assert.throws(() => add('5', '5'), Error('inputs must be numbers'))
assert.doesNotThrow(() => add(5, 5))

Notice that the invocation of add is wrapped inside another function. This is because the assert.throws and assert.doesNotThrow methods have to be passed a function, which they can then wrap and call to see if a throw occurs or not. When executed the above code will pass, which is to say, no output will occur and the process will exit.

-->

---
layout: two-cols
---

# Errors in callback based APIs


For callback-based APIs, the assert.ifError will only pass if the value passed to it is either null or undefined. Typically the err param is passed to it, to ensure no errors occurred.

::right::

```js {all|3-9|11-13|15-17|all}
const assert = require('assert')

const pseudoReq = (url, cb) => {
  setTimeout(() => {
    if (url === 'http://error.com') cb(Error('network error'))
    else cb(null, Buffer.from('some data'))
  }, 300)
}

pseudoReq('http://example.com', (err, data) => {
  assert.ifError(err)
})

pseudoReq('http://error.com', (err, data) => {
  assert.deepStrictEqual(err, Error('network error'))
})
```

<!--

For callback-based APIs, the assert.ifError will only pass if the value passed to it is either null or undefined. Typically the err param is passed to it, to ensure no errors occurred:

const assert = require('assert')

const pseudoReq = (url, cb) => {
  setTimeout(() => {
    if (url === 'http://error.com') cb(Error('network error'))
    else cb(null, Buffer.from('some data'))
  }, 300)
}

pseudoReq('http://example.com', (err, data) => {
  assert.ifError(err)
})

pseudoReq('http://error.com', (err, data) => {
  assert.deepStrictEqual(err, Error('network error'))
})

We create a function called pseudoReq which is a very approximated emulation of a URL fetching API. The first time we call it with a string and a callback function we pass the err parameter to assert.ifError. Since err is null in this scenario, assert.ifError does not throw an AssertionError. The second time we call pseudoReq we trigger an error. To test an error case with a callback API we can check the err param against the expected error object using assert.deepStrictEqual.

-->

# Promise based errors

```js
const assert = require('assert')
const { promisify } = require('util')
const timeout = promisify(setTimeout)

const pseudoReq = async (url) => {
  await timeout(300)
  if (url === 'http://error.com') throw Error('network error')
  return Buffer.from('some data')
}

assert.doesNotReject(pseudoReq('http://example.com'))
assert.rejects(pseudoReq('http://error.com'), Error('network error'))
```

<!--

Finally for this section, let's consider asserting error or success states on a promise-based API.

Recall that async functions always return promises. So we converted our previously callback-based faux-request API to an async function. We can then use assert.reject and assert.doesNotReject to test the success case and the error case. One caveat with these assertions is that they also return promises, so in the case of an assertion error a promise will reject with an AssertionError rather than AssertionError being thrown as an exception.

Notice that in all three cases we didn't actually check output. In the next section, we'll use Jest, with their own assertion APIs to fully test the APIs we defined here.

-->


---

# Test Harnesses

- Pure library
- Framework Environment

<!--

While assertions on their own are a powerful tool, if one of the asserted values fails to meet a condition an AssertionError is thrown, which causes the process to crash. This means the results of any assertions after that point are unknown, but any additional assertion failures might be important information.

It would be great if we could group assertions together so that if one in a group fails, the failure is output to the terminal but the remaining groups of assertions still run.

This is what test harnesses do. Broadly speaking we can group test harnesses into two categories: pure libraries vs framework environments.

Pure Library
Pure library test harnesses provide a module, which is loaded into a file and then used to group tests together. As we will see, pure libraries can be executed directly with Node like any other code. This has the benefit of easier debuggability and a shallower learning curve. We're not going to look at one.

Framework Environment
A test framework environment may provide a module or modules, but it will also introduce implicit globals into the environment and requires another CLI tool to execute tests so that these implicit globals can be injected. For an example of a test framework environment we'll be looking at jest.

-->

---


# jest Framework

- Jest will look for any directory named `__tests__` and any files that end in `.test.js`.
- It will search these files for tests and run them concurrently.
- Jest only has experimental support for ESM - we'll see how to get it to work

---

# add.js

```js
'use strict'
const add = require('../add')

test('throw when inputs are not numbers', async () => {
  expect(() => add('5', '5')).toThrowError(
    Error('inputs must be numbers')
  )

  expect(() => add(5, '5')).toThrowError(
    Error('inputs must be numbers')
  )

  expect(() => add('5', 5)).toThrowError(
    Error('inputs must be numbers')
  )

  expect(() => add({}, null)).toThrowError(
    Error('inputs must be numbers')
  )
})

test('adds two numbers', async () => {
  expect(add(5, 5)).toStrictEqual(10)
  expect(add(-5, 5)).toStrictEqual(0)
})
```

<!--

# add.js

This will be our set of tests for the add.js file.

Notice that we have a test function but it is not loaded from any module. This function is made available implicitly by jest at execution time. The same applies to expect, which we discussed as a module in the previous section. However here it is injected as an implicitly available function, just like the test function. This means that we cannot run our tests directly with node.

We call the test function twice, so we have two groups of assertions: one for testing input validation and the other for testing expected output. The first argument passed to test is a string describing that group of assertions, the second argument is an async function. We use an async function because it returns a promise and the test function will use the promise returned from the async function to determine when the test has finished for that group of assertions. So when the returned promise resolves, the test is done. Since we don't do anything asynchronous, the promise essentially resolves at the end of the function, which is perfect for our purposes here.


We always have to use the jest executable to run tests:

$ ./node_modules/.bin/jest test/add.test.js 

We'll look soon at a better way to trigger our tests.

Code coverage represents which logic paths were executed by tests. Having tests execute as many code paths is important for confidence that the code has been tested. In a loosely-typed language like JavaScript it can also be a good indicator that tests have covered a variety of input types (or even object shapes). However, it's also important to balance this with the understanding that code coverage is not the same as case coverage, so 100% code coverage doesn't necessarily indicate perfectly complete testing either.

By default jest does not output code coverage but can be passed the --coverage flag to do so.

$ ./node_modules/.bin/jest --coverage test/add.test.js

-->

# req.js

```js
'use strict'
const req = require('../req')

test('handles network errors', (done) => {
  req('http://error.com', (err) => {
    expect(err).toStrictEqual(Error('network error'))
    done()
  })
})

test('responds with data', (done) => {
  req('http://example.com', (err, data) => {
    expect(err == null).toBe(true)
    expect(Buffer.isBuffer(data)).toBeTruthy()
    expect(data).toStrictEqual(Buffer.from('some data'))
    done()
  })
})
```

```bash
./node_modules/.bin/jest test/req.test.js 
```


<!--

Here we're testing our faux network error scenario and then in the second test group we're testing faux output. This time we don't use an async function. Since we're using callbacks, it's much easier to call a final callback to signify to the test function that we have finished testing. In tap this comes in the form of the end function which is supplied via the same assertions object passed to each function.

We can see that in both cases the done function is called within the callback function supplied to the req function. If we don't call done when appropriate the test will fail with a timeout error, but if we tried to use an async function (without creating a promise that is in some way tied to the callback mechanism) the returned promise would resolve before the callbacks complete and so assertions would be attempting to run after that test group has finished.

As in the previous example, test and expect are explicit. 

The expect assertions here broadly match the assertions from the assert except that expect has no equivalent of ifError. So to achieve the same effect we use expect(err == null).toBe(true). Using a coercive equality check (==) will result in the conditional being true if err is null or undefined. While Buffer.isBuffer will only return true or false we use the toBeTruthy method to demonstrate how to achieve the same behavior as ok. 

We can see that in both cases the done function is called within the callback function supplied to the req function. If we don't call done when appropriate the test will fail with a timeout error, but if we tried to use an async function (without creating a promise that is in some way tied to the callback mechanism) the returned promise would resolve before the callbacks complete and so assertions would be attempting to run after that test group has finished.

Let's check out our tests with jest.

$ ./node_modules/.bin/jest test/req.test.js 

-->

# Testing a Promise based API req-prom.test.js

```js
'use strict'

global.setTimeout = require('timers').setTimeout
const req = require('../req-prom')

test('handles network errors', async () => {
  await expect(req('http://error.com'))
    .rejects
    .toStrictEqual(Error('network error'))
})

test('responds with data', async () => {
  const data = await req('http://example.com')
  expect(Buffer.isBuffer(data)).toBeTruthy()
  expect(data).toStrictEqual(Buffer.from('some data'))
})
```

```bash
./node_modules/.bin/jest PASS test/req.test.js
```

<!--
Our test cases here remain the same as the callback-based tests, because we're testing the same functionality but using promises instead. In the first test group, instead of checking an err object passed via a callback with strictDeepEqual we use the rejects assertion. 

We're using async functions again because we're dealing with promises, the rejects assertion returns a promise (the resolution of which is dependent on the promise passed to it), so we are sure to await that promise. This makes sure that the async function passed to test does not resolve (thus ending the test) before the promise passed to reject has rejected.

In the second test group we await the result of calling req and then apply the same expectations to the result as we do in the callback-based tests. 

Unfortunately, jest overrides the setTimeout function, which means when we use util.promisify in req-prom.js the promise returned promisified version (which we named timeout) never resolves, which causes all the tests to freeze. This is true for version 25.5.2 but may not be an issue for later versions if later versions are available.

Now that all tests are converted we can run jest without any file names and all the files in test folder will be executed with jest.

$ ./node_modules/.bin/jest PASS test/req.test.js

-->

---

# Configuring package.json

- Adding a test script

<!--

A final key piece when writing tests for a module, application or service is making absolutely certain that the test field of the package.json file for that project runs the correct command.

This is (observably and measurably) a very commonly made mistake, so bear this in mind.

Typically a fresh package.json file looks similar to the following:

{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

In the middle of the above JSON, we can see a "scripts" field. This contains a JSON object, which contains a "test" field. By default the "test" field is set up to generate an exit code of 1, to indicate failure. This is to indicate that not having tests, or not configuring the "test" to a command that will run tests is in fact a test failure.

Running the npm test command in the same folder as the package.json will execute the shell command in the "test" field.

If npm test was executed against this package.json the following output would occur:

$ npm test  

Any field in the "scripts" field of package.json is expected to be a shell command, and these shell commands have their PATH enhanced with the path to node_modules/.bin in the same project as the package.json file. This means to run our tests we don't have to reference ./node_modules/.bin/jest (or ./node_modules/.bin/tap) we can instead write jest (or tap) knowing that the execution environment will look in ./node_modules/.bin for that executable.

In the last section our tests were converted to jest so let's modify the "test" field of package.json like so:

{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest --coverage"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

Now, let's run npm test:

$ npm test 

Remember, we can pass additional flags the through with the `--` modifier.
-->

---

# Exercises

There are three separate APIs to test in the labs folder.

There is a sync, callback and promise based API.

Any additional dependencies, such as a test harness, may be additionally installed.

Ensure that when `npm test` is run the current working directory is fully tested.

For exercise2 and exercise3, the API mimics some kind of async storage mechanism, such as to a database. In some circumstances it is infeasible to check for a specific value (for instance an ID returned from a database). For those cases, we can check for the presence of an ID, or apply some validation. In our case we can at least check that the length of the ID is 4.