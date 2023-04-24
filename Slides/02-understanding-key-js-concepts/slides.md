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

# Understand key JavaScript concepts

---

# Aims

- Understand scope in JS (var, let, const)
- Functions
- Strings
- Arrays
- Describe the prototypical nature of all JavaScript-based inheritance
- Closure scope

---

# Variable scope and hoisting in JS (var, let, const)

Problems with var:

<v-clicks>

- Scope
- Hoisting
- Redeclarion

</v-clicks>

`let` vs `const`

<v-clicks>

- Rule of thumb to prefer const over let
- const can't be reassigned
- Note the difference for Objects and Arrays

</v-clicks>

<!-- 
Code example for scope:
```
    var greeter = "hey hi";
    var times = 4;

    if (times > 3) {
        var greeter = "say Hello instead"; 
    }
    
    console.log(greeter) // "say Hello instead"
```

Code example for hoisting:

```
    console.log (greeter);
    var greeter = "say hello"
```

interpreted as 

```
  var greeter;
  console.log(greeter); // greeter is undefined
  greeter = "say hello"
```

Reclaration:

```
    var greeter = "hey hi";
    var greeter = "say Hello instead";
```

-->

---

# Functions

<v-clicks>

- Multi-paradigm nature of JS
- Functions passed as arguments 
- Functions assigned as values in an object
- (Fat) Arrow Functions

</v-clicks>


<!--

- Function keyword
- Functions can be passed and used as arguments:


function speak(message) {
  console.log(message)
}

function say(func, msg) {
  func(msg)
}

say(speak, "Hello")


- Functions assigned to object properties


function speak(message) {
  console.log(message)
}

const newObj = {
  name: "Kevin",
  sayName: function() {
    speak(this.name)
  }
}

newObj.sayName()

- Arrow functions

```js
function speak(message) {
  console.log("Hello " + message)
  return message
}

const result = speak("Kevin")

(refactor, discuss return value, single and multiple line)
```

- Default values!!
-->



---

# Strings

<v-clicks>

- We can use different quotes to declare a string (single, double and backtick)
- Backtick defined strings can have interpolated values declared with `${}`.
- Strings are immutable but you can access characters 
- Helper methods can transform strings and pass values back.

</v-clicks>

---

---

# Arrays

<v-clicks>

- Define with `[]`. 
- Key methods (.join(), .map(), .filter(), .reduce(), .forEach())
- Destructuring

</v-clicks>


---

# Prototypical Inheritance

Inheritance with JS is achieved with a chain of prototypes. These approaches have evolved significantly over time.

The three common approaches to creating a prototypal chain:
- functional
- constructor functions
- class-syntax constructors

For the purposes of these examples, we will be using a Wolf and Dog taxonomy, where a Wolf is a prototype of a Dog.

--- 

# Prototypical Inheritance (Functional)

```js {all|1-3|1-7|1-11|all}
const wolf = {
  howl: function() { console.log(`${this.name} awoooooo`)}
}

const dog = Object.create(wolf, {
  woof: {value: function() {console.log(`${this.name} woof`)}}
})

const rufus = Object.create(dog, {
  name: {value: 'Rufus the dog'}
})

rufus.woof()
rufus.howl()
```

<!--

The wolf object is a plain JavaScript object, created with the object literal syntax (i.e. using curly braces). The prototype of plain JavaScript objects is Object.prototype.

The Object.create function can take two arguments. The first argument is the desired prototype of the object being created.

When the dog object is instantiated, the first argument passed to Object.create is the wolf object. So wolf is the prototype of dog. When rufus is instantiated, the first argument to Object.create is dog.

To describe the full prototype chain:

the prototype of rufus is dog

the prototype of dog is wolf

the prototype of wolf is Object.prototype.

The second argument of Object.create is an optional Properties Descriptor object.

A Properties Descriptor object contains keys that will become the key name on the object being created. The values of these keys are Property Descriptor objects.

The Property Descriptor is a JavaScript object that describes the characteristics of the properties on another object.

The Object.getOwnPropertyDescriptor can be used to get a property descriptor on any object.

To describe the value of a property, the descriptor can either use value for a normal property value or get and set to create a property getter/setter. The other properties are associated meta-data for the property. The writable property determines whether the property can be reassigned, enumerable determines whether the property will be enumerated, in property iterator abstractions like Object.keys and configurable sets whether the property descriptor itself can be altered. All of these meta-data keys default to false.

In the case of dog and rufus the property descriptor only sets value, which adds a non-enumerable, non-writable, non-configurable property.

Property descriptors are not directly relevant to prototypal inheritance, but are part of the Object.create interface so understanding them is necessary. To learn more, read "Description" section at the MDN web docs Mozilla website.

When the dog prototype object is created, the property descriptor is an object with a woof key. The woof key references an object with the value property set to a function. This will result in the creation of an object with a woof method.

So when rufus.woof() is called, the rufus object does not have a woof property itself. The runtime will then check if the prototype object of rufus has a woof property. The prototype of rufus is dog and it does have a woof property. The dog.woof function contains a reference to this. Typically, the this keyword refers to the object on which the method was called. Since woof was called on rufus and rufus has the name property which is "Rufus the dog", the this.name property in the woof method has the value "Rufus the dog" so console.log is passed the string: "Rufus the dog: woof".

Similarly when rufus.howl is called the JavaScript runtime performs the following steps:

Check if rufus has a howl property; it does not

Check if the prototype of rufus (which is dog) has a howl property; it does not

Check if the prototype of dog (which is wolf) has a howl property; it does

Execute the howl function setting this to rufus, so this.name will be "Rufus the dog".

To complete the functional paradigm as it applies to prototypal inheritance, the creation of an instance of a dog can be genericized with a function:

const wolf = {
howl: function () { console.log(this.name + ': awoooooooo') }
}

const dog = Object.create(wolf, {
woof: { value: function() { console.log(this.name + ': woof') } }
})

function createDog (name) {
return Object.create(dog, {
name: {value: name + ' the dog'}
})
}

const rufus = createDog('Rufus')

rufus.woof() // prints "Rufus the dog: woof"
rufus.howl() // prints "Rufus the dog: awoooooooo"

The prototype of an object can be inspected with Object.getPrototypeOf:

console.log(Object.getPrototypeOf(rufus) = dog) //true
console.log(Object.getPrototypeOf(dog) = wolf) //true

-->

---

# Prototypical Inheritance (Constructor function)

```js {all|1-3|1-7|9-11|13|13-17|19|all}
function Wolf(name) {
  this.name = name;
}
  
Wolf.prototype.howl = function() {
  console.log(`${this.name} awooooooo`)
}
  
function Dog(name) {
  Wolf.call(this, `${name} the dog`)
}
  
Object.setPrototypeOf(Dog.prototype, Wolf.prototype)
  
Dog.prototype.woof = function() {
  console.log(`${this.name} woof`)
}
  
const rufus = new Dog('Rufus')
  
rufus.woof()
rufus.howl()
```

<!--

Creating an object with a specific prototype object can also be achieved by calling a function with the new keyword. In legacy code bases this is a very common pattern, so it's worth understanding.

All functions have a prototype property. The Constructor approach to creating a prototype chain is to define properties on a function's prototype object and then call that function with new.

The Wolf and Dog functions have capitalized first letters. Using PascaleCase for functions that are intended to be called with new is convention and recommended.

Note that a howl method was added to Wolf.prototype without ever instantiating an object and assigning it to Wolf.prototype. This is because it already existed, as every function always has a preexisting prototype object. However Dog.prototype was explicitly assigned, overwriting the previous Dog.prototype object.

To describe the full prototype chain:

the prototype of rufus is Dog.prototype

the prototype of Dog.prototype is Wolf.prototype

the prototype of Wolf.prototype is Object.prototype.

When new Dog('Rufus') is called a new object is created (rufus). That new object is also the this object within the Dog constructor function. The Dog constructor function passes this to Wolf.call.



-->

---

# Prototypal Inheritance (Class-Syntax Constructors)

```js
class Wolf {
  constructor(name) {
    this.name = name
  }
  howl() {
    console.log(`${this.name} awooooooo`)
  }
}

class Dog extends Wolf {
  constructor(name) {
    super(`${name} the dog`)
  }
  woof() {
    console.log(`${this.name} woof`)
  }
}

const rufus = new Dog('Rufus')

rufus.woof()
rufus.howl()
```

<!--

Modern JavaScript (EcmaScript 2015) has a class keyword. It's important that this isn't confused with the class keyword in other Classical OOP languages.

The class keyword is syntactic sugar that actually creates a function. Specifically it creates a function that should be called with new. It creates a Constructor Function, the very same Constructor Function discussed in the previous section.

This is why it's deliberately referred to here as "Class-syntax Constructors", because the EcmaScript 2015 (ES6) class syntax does not in fact facilitate the creation classes as they are traditionally understood in most other languages. It actually creates prototype chains to provide Prototypal Inheritance as opposed to Classical Inheritance.

The class syntax sugar does reduce boilerplate when creating a prototype chain.

This will setup the same prototype chain as in the Functional Prototypal Inheritance and the Function Constructors Prototypal Inheritance examples.

-->

---

# Closure Scope (1/3)

When a function is created, an invisible object is also created - this is the closure scope.

Parameters and variables created in the function are stored on this object.

```js
function outerFunction() {
  const foo = true;
  function print() {
    console.log(foo)
  }
  foo = false
  print()
}
outerFunction()
```

<!--

When a function is created, an invisible object is also created, this is known as the closure scope. Parameters and variables created in the function are stored on this invisible object.

When a function is inside another function, it can access both its own closure scope, and the parent closure scope of the outer function.

The outer variable is accessed when the inner function is invoked, this is why the second print call outputs false after foo is updated to false.



-->

---

# Closure (2/3)

If there is naming collision then the reference to nearest close scope takes precedence.

```js
function outerFn () {
  var foo = true
  function print(foo) { 
    console.log(foo) 
  }
  print(1) // prints 1
  foo = false
  print(2) // prints 2
}
outerFn()
```


In this case the foo parameter of print overrides the foo var in the outerFn function.

---
layout: two-cols
---

# Closure Scope (3/3)

Closure scope cannot be accessed outside of a function.

```js
function outerFn () {
  var foo = true
}
outerFn()
console.log(foo) // will throw a ReferenceError
```

::right::

Since the invisible closure scope object cannot be accessed outside of a function, if a function returns a function the returned function can provide controlled access to the parent closure scope.

```js
function init (type) {
  var id = 0
  return (name) => {
    id += 1
    return { id: id, type: type, name: name }
  }
}
```

<!--
const createUser = init('user')
const createBook = init('book')
const dave = createUser('Dave')
const annie = createUser('Annie')
const ncb = createBook('Node Cookbook')
console.log(dave) //prints {id: 1, type: 'user', name: 'Dave'}
console.log(annie) //prints {id: 2, type: 'user', name: 'Annie'}
console.log(ncb) //prints {id: 1, type: 'book', name: 'Node Cookbook'}

The init function sets a variable id in its scope, takes an argument called type, and then returns a function. The returned function has access to type and id because it has access to the parent closure scope. Note that the returned function in this case is a fat arrow function. Closure scope rules apply in exactly the same way to fat arrow functions.

The init function is called twice, and the resulting function is assigned to createUser and createBook. These two functions have access to two separate instances of the init functions closure scope. The dave and annie objects are instantiated by calling createUser.

The first call to createUser returns an object with an id of 1. The id variable is initialized as 0 and it is incremented by 1 before the object is created and returned. The second call to createUser returns an object with id of 2. This is because the first call of createUser already incremented id from 0 to 1, so on the next invocation of createUser the id is increased from 1 to 2. The only call to the createBook function however, returns an id of 1 (as opposed to 3), because createBook function is a different instance of the function returned from init and therefore accesses a separate instance of the init function's scope.

In the example all the state is returned from the returned function, but this pattern can be used for much more than that. For instance, the init function could provide validation on type, return different functions depending on what type is.
-->

---

# Exercises

There are a number of exercises for you to work on. These are all found in `Labs/Student/02-key-js-concepts`. There are corresponding solutions in `Labs/Solutions/02-key-js-concepts`.

Each of them have tests, so to check you've got it right run `node filename` in your terminal. 