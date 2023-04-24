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
# Node's Event System

---

By the end of this section, you should be able to:

- Explain how to create an event emitter.
- Discuss how to consume event emitters.
- Describe key behaviors of event emitters.

<!--

The EventEmitter constructor in the events module is the functional backbone of many Node core API's. For instance, HTTP and TCP servers are an event emitter, a TCP socket is an event emitter, HTTP request and response objects are event emitters. In this section we'll explore how to create and consume EventEmitters.

-->

---
layout: two-cols
---

# Creating an Event Emitter
<p></p>

The events module exports an EventEmitter constructor:

```js
const {EventEmitter} = require('events')
```

and, now the `events` module is the constructor as well:

```js
const EventEmitter = require('events')
```

So to create a new event emitter:

```js
const myEmitter = new EventEmitter()
```

::right::
<div v-click>
A more typical pattern is to inherit from the EventEmitter.

```js
class MyEmitter extends EventEmitter {
  constructor (opts = {}) {
    super(opts)
    this.name = opts.name
  }
}
```
</div>

---

# Emitting Events

```js {all|1|2|3|all}
const { EventEmitter } = require('events')
const myEmitter = new EventEmitter()
myEmitter.emit('an-event', some, args)
```

<!--

The first argument passed to emit is the event namespace. In order to listen to an event this namespace has to be known. The subsequent arguments will be passed to the listener.


-->

---

# An example of using emit with inheriting from EventEmitter:

```js {all|7-10|8|9|all}
const { EventEmitter } = require('events')
class MyEmitter extends EventEmitter {
  constructor (opts = {}) {
    super(opts)
    this.name = opts.name
  },
  destroy (err) {
    if (err) { this.emit('error', err) }
    this.emit('close')
  }
}
```

<!--

The destroy method we created for the MyEmitter constructor class calls this.emit. It will also emit a close event. If an error object is passed to destroy it will emit an error event and pass the error object as an argument.

Next, we'll find out how to listen for emitted events.

-->

---

# Listening for Events

To add a listener, use the addListener method.

```js {all|4}
const { EventEmitter } = require('events')

const ee = new EventEmitter()
ee.on('close', () => { console.log('close event fired!') })
ee.emit('close')
```

<p v-click="2">It could also be written as:</p>
<div v-click="2">

```js
ee.addListener('close', () => {
  console.log(close event fired!')
})
```
</div>

<p v-click="3">Arguments passed to emit are received by the listener function.</p>

<div v-click="3">

```js
ee.on('add', (a, b) => { console.log(a + b) }) // logs 13
ee.emit('add', 7, 6)
```
</div>

---

# Order is important

This listener will not fire:

```js
ee.emit('close')
ee.on('close', () => { console.log('close event fired!') })
```

<div v-click>
Listeners are called in the order they are registered:

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()
ee.on('my-event', () => { console.log('1st') })
ee.on('my-event', () => { console.log('2nd') })
ee.emit('my-event')
```
</div>

<div v-click="2">
But the <code>prependListener</code> method can be used to inject listeners to the top position:

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()
ee.on('my-event', () => { console.log('2nd') })
ee.prependListener('my-event', () => { console.log('1st') })
ee.emit('my-event')
```
</div>

---

# Single or Multi-use

An event can be used more than once:

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()
ee.on('my-event', () => { console.log('my-event fired') })
ee.emit('my-event')
ee.emit('my-event')
ee.emit('my-event')
```

<div v-click>
The once method will immediately remove its listener after it has been called.

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()
ee.once('my-event', () => { console.log('my-event fired') })
ee.emit('my-event')
ee.emit('my-event')
ee.emit('my-event')
```
</div>

---

# Removing Listeners

The removeListener method can be used to remove a previously registered listener.

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()

const listener1 = () => { console.log('listener 1') }
const listener2 = () => { console.log('listener 2') }

ee.on('my-event', listener1)
ee.on('my-event', listener2)

setInterval(() => {
  ee.emit('my-event')
}, 200)

setTimeout(() => {
  ee.removeListener('my-event', listener1)
}, 500)

setTimeout(() => {
  ee.removeListener('my-event', listener2)
}, 1100)
```

<!--

The 'my-event' event is emitted every 200 milliseconds. After 500 milliseconds the listener1 function is removed. So listener1 is only called twice before it's removed. But at the 1100 milliseconds point, listener2 is removed. So listener2 is triggered five times.



-->

---

# Remove all listeners
The removeAllListeners method can be used to remove listeners without having a reference to the function.

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()

const listener1 = () => { console.log('listener 1') }
const listener2 = () => { console.log('listener 2') }

ee.on('my-event', listener1)
ee.on('my-event', listener2)
ee.on('another-event', () => { console.log('another event') })

setInterval(() => {
  ee.emit('my-event')
  ee.emit('another-event')
}, 200)

setTimeout(() => {
  ee.removeAllListeners('my-event')
}, 500)

setTimeout(() => {
  ee.removeAllListeners()
}, 1100)
```
<!--

The removeAllListeners method can be used to remove listeners without having a reference to their function. It can take either no arguments in which case every listener on an event emitter object will be removed, or it can take an event name in order to remove all listeners for a given event.

-->

---

# The Error Event

What will happen here?

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()

process.stdin.resume() // keep process alive

ee.emit('error', new Error('oh oh'))
```

<div v-click>
Emitting an 'error' event on an event emitter will cause the event emitter to throw an exception if a listener for the 'error' event has not been registered.
</div>

<div v-click="2">

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()

process.stdin.resume() // keep process alive

ee.on('error', (err) => {
  console.log('got error:', err.message )
})

ee.emit('error', new Error('oh oh'))
```
</div>

---

# Alternatives to EventEmitter

The EventEmitter class is an implementation of the observer pattern. A related pattern is publish/subscribe, where publishers send messages that are characterized into classes to subscribers without knowing the details of the subscribers themselves.

The publish/subscribe pattern is often useful in cases where horizontal scaling is required. AWS SQS/SNS services are well leveraged here by Node applications. Redis/RabbitMQ/ØMQ are other self-service alternatives.

The publisher is pushing to a pool, the subscriber is listening to the pool - the subscriber doesn't need to know anything about the individual publisher.

---

# Exercises

1. The labs folder contains a file `warmup1.js`. Register the `listener` function with the `ee` event emitter in such a way that the listener function is only called a single time. If implemented correctly, the program should print out passed!

2. The labs folder contains a file `warmup2.js`. Currently the process crashes. Without removing any of the existing code, and without using a try/catch block add some code which stops the process from crashing. When implemented correctly the process should output passed!






