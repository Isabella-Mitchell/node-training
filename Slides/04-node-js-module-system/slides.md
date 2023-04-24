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

# Node.js Module System

---

By the end of this section, you should be able to:

- Generate a package.json
- Install a package from npm
- Understand the difference between production/development dependencies
- Understand semantic versioning
- Understand the differences between CommonJS and ESM
- Do *all* the importing 

<!--
The Node.js ecosystem of packages is very large. There are more than 1.2 million packages on the npm Registry. While many of these packages are frontend JavaScript libraries, whether a package is for Node or the frontend or both, the npm client and its associated manifest file format have been fundamental to enabling this growth. In this section we will explore how to create and manage packages with the npm client, the package manager which comes bundled with Node.js. We'll also look a
-->

---

# npm command

<v-clicks>

The npm executable is made available when you install Node. 

To check it's working, in your terminal run

```bash
npm -v
```

You can see all of the available commands with 

```bash
npm --help
```

and get help on a particular command with the help flag

```bash
npm install -h
```

</v-clicks>

<!-- 
When Node.js is installed, the node binary and the npm executable are both made available to the Operating System that Node.js has been installed into. The npm command is CLI tool that acts as a package manager for Node.js. By default it points to the npmjs.com registry, which is the default module registry.

The npm help command will print out a list of available commands.

A quick help output for a particular command can be viewed using the -h flag with that command: 

npm install -h
-->

---

# Initializing a Package/App/Service/Node.js Project


<v-clicks>

A package is a folder with a package.json file in it (and hopefully some code).

We create a new directory and run 
```bash
npm init
```

For the wizard that comes up, you can accept the default answers given in brackets by pressing enter.

This could be achieved without the wizard by running
```bash
npm init -y
```
</v-clicks>

<!--
A package is a folder with a package.json file in it (and then some code). A Node.js application or service is also a package, so this could equally be titled "Initializing an App" or "Initializing a Service" or generically, "Initializing a Node.js Project".

The npm init command can be used to quickly create a package.json in whatever directory it's called in.

For this example a new folder called my-package is used, every command in this section is executed with the my-package folder as the current working directory.

Running npm init will start a CLI wizard that will ask some questions.

For our purposes we can hit return for every one of the questions.

A shorter way to accept the default value for every question is to use the -y flag.

The default fields in a generated package.json are:

name – the name of the package

version – the current version number of the package

description – a package description, this is used for meta analysis in package registries

main – the entry-point file to load when the package is loaded

scripts – namespaced shell scripts, these will be discussed later in this section

keywords – array of keywords, improves discoverability of a published package

author – the package author

license – the package license.

The npm init command can be run again in a folder with an existing package.json and any answers supplied will update the package.json. This can be useful when the package has also been initialized as a git project and has had a remote repo added. When run in a git repository, the npm init -y command will read the repositories remote URI from git and add it to package.json.
-->

--- 

# Install dependencies

<v-clicks>

Now we have a package.json, we can install dependencies. 

Let's install a logger:
```bash
npm install pino
```

After the installation three things have happened:
- the package.json dependencies object has been updated
- there is now a package-lock.json file
- there is now a node_modules directory

```bash
node -e "require('pino')().info('testing')"
npm ls
```

</v-clicks>

<!--
Once a folder has a package.json file, dependencies can be installed.

Let's install a logger: 

npm install pino

Information about any ecosystem package can be found on npmjs.com, for instance for information about the logger we installed see Pino's Documentation.

Once the dependency is installed the package.json file will be updated to include the depenency.

The "dependencies" field contains an object, the keys of the object contain dependency namespaces, the values in the object contain the Semver range version number for that dependency. We will explore the Semver format later in this section.

Running npm install pino without specifying a version will install the latest version of the package, so the version number may vary when following these steps.

In addition, a node_modules folder will have been added into the my-package folder.

The node_modules folder contains the logger package, along with all the packages in its dependency tree.

The npm install command uses a maximally flat strategy where all packages in a dependency tree placed at the top level of the node_modules folder unless there are two different versions of the same package in the dependency tree, in which case the packages may be stored in a nested node_modules folder.

The npm ls command can be used to describe the dependency tree of a package:

Notice how the flatstr sub-dependency occurs twice in the output. The second occurrence has the word deduped next to it. The flatstr module is a dependency of both pino and its direct dependency **sonic-boom**, but both **pino** and **sonic-boom** rely on the same version of **flatstr. Which allows npm to simply place a single **flatstr** package in the **node_modules** folder.**

Now that we have the dependency we can use it:

node -e "require('pino')().info('testing')"

A primary reason for adding the installed dependency to the package.json file is to make the node_modules folder disposable.

Let's delete the node_modules folder.

If we run npm ls it won't print out the same tree any more because the dependency isn't installed, but it will warn that the dependency should be installed.

To install the dependencies in the package.json file, run npm install without specifying a dependency namespace:

npm install

Running npm ls now will show that the logger has been installed again:

The node_modules folder should not be checked into git, the package.json  and package-lock.json should be the source of truth.
-->

---

# Development dependencies

<v-clicks>


Not all dependencies are required for production, some are tools to support the development process. 

These types of dependencies are called development dependencies.

To save something in our package as a development dependency we use the `--save-dev` flag.

```
npm install --save-dev <package_name>
```

If we only want to install production dependencies, we can do this with the `--production` flag. This will ignore all of the devDependencies.

```
npm install --production
```

</v-clicks>


<!--

Running npm install without any flags will automatically save the dependency to the package.json file's "dependencies" field. Not all dependencies are required for production, some are tools to support the development process. These types of dependencies are called development dependencies.

An important characteristic of development dependencies is that only top level development dependencies are installed. The development dependencies of sub-dependencies will not be installed.

Dependencies and development dependencies can be viewed in the Dependency tab of any given package on npmjs.com, for pino that can be accessed at Pino's Dependencies Documentation.

When we run npm ls we only see the production dependencies in the tree, none of the development dependencies are installed, because the development dependencies of installed packages are never installed.

npm ls

Let's install a linter as a development dependency into my-package:

npm install --save-dev standard

Now let's take a look at the package.json file.

In addition to the "dependencies" field there is now a "devDependencies" field.

Running npm ls now reveals a much larger dependency tree.

When deploying a service or application for production use, we don't want to install any dependencies that aren't needed in production.

A --production flag can be used with npm install so that development dependencies are ignored.

Let's remove the node_modules folder:

node -e "fs.rmdirSync('node_modules', {recursive: true})"

Node is being used here to remove the node_modules folder because this command is platform independent, but we can use any approach to remove the folder as desired.

Now let's run npm install with the --production flag.

npm install --production


While pino and standard are both dependencies of my-package, only pino will be installed when --production is used because standard is specified as a development dependency in the package.json. This can be verified:

npm ls


-->

---
layout: two-cols
---

# Semantic versioning (semver)

<v-clicks>

Each of our dependencies have a semver range. Our package has a semver version.

```json
{
  "version": "0.0.1",
  "dependencies": {
    "pino": "^7.8.1"
  },
  "devDependencies": {
    "standard": "^16.0.4"
  }
}
```

The format is MAJOR.MINOR.PATCH.

</v-clicks>

::right::

<v-clicks>

We can install a package at particular semver using the `@` symbol:
```
npm install pino@7.8.1
```

We can use `x` to give a more generic semver. This will install major 7, minor 8 and the latest patch.
```
npm install pino@7.8.x
```

By default, package installations have a caret(^) before the semver. This translates to MAJOR.x.x.
```json
"standard": "^16.0.4"
```

</v-clicks>

<!--

Let's look at the dependencies in the package.json file:

"dependencies": {
"pino": "^6.2.1"
},
"devDependencies": {
"standard": "^14.3.3"
}

We've installed two dependencies, pino at a Semver range of ^6.2.1 and standard at a Semver range of ^14.3.3. Our package version number is the Semver version 1.0.0. There is a distinction between the Semver format and a Semver range.

Understanding the Semver format is crucial to managing dependencies. A Semver is fundamentally three numbers separated by dots. The reason a version number is updated is because a change was made to the package. The three numbers separated by dots represent different types of change.

Major
MAJOR is the left-most number. It means that the change breaks an API or a behavior.

Minor
MINOR is the middle number. It means that the package has been extended in some way, for instance a new method, but it's fully backwards compatible. Upgrading to a minor should not break the package.

Patch
PATCH is the right-most number. It means that there has been a bug fix.

This is the core of the Semver format, but there are extensions which won't be covered here, for more information on Semver see Semver's website.

A Semver range allows for a flexible versioning strategy. There are many ways to define a Semver range.

One way is to use the character "x" in any of the MAJOR.MINOR.PATCH positions, for example 1.2.x will match all PATCH numbers. 1.x.x will match all MINOR and PATCH numbers.

By default npm install prefixes the version number of a package with caret (^) when installing a new dependency and saving it to the package.json file.

Our specified pino version in the package.json file is ^6.2.1. This is another way to specify a Semver range: by prefixing the version with a caret (^). Using a caret on version numbers is basically the same as using an x in the MINOR and PATCH positions, so ^6.2.1 is the same as 6.x.x. However there are exceptions when using 0, ^0.0.0 is not the the same as 0.x.x, see the "Caret Ranges ^1.2.3 ^0.2.5 ^0.0.4" section of npmjs Documentation. However for non-zero MAJOR numbers, ^MAJOR.MINOR.PATCH is interpreted as MAJOR.x.x.

The complete syntax for defining ranges is verbose, see the "semver: The semantic versioner for npm" section of npmjs Documentation.

-->

---

# Package scripts


<v-clicks>

The "scripts" field in package.json can be used to define aliases for shell commands that are relevant to a Node.js project.

We add scripts here to help with linting, development or building. 

Let's add a linting script to our project:

```json
"scripts": {
  "test": "echo "Error: no test specified" && exit 1",
  "lint": "standard"
},
```

To run this, we use `npm run`:
```bash
npm run lint
```

</v-clicks>

<!--

The "scripts" field in package.json can be used to define aliases for shell commands that are relevant to a Node.js project.

To demonstrate the concept, let's add a lint script. Currently the package.json "scripts" field looks like so:

"scripts": {
"test": "echo "Error: no test specified" && exit 1"
},

Let's update it to the following:

"scripts": {
"test": "echo "Error: no test specified" && exit 1",
"lint": "standard"
},

Recall that we have a development dependency installed called standard. This is a code linter, see "JavaScript Standard Style" article for more details.

Packages can assign a "bin" field in their package.json, which will associate a namespace with a Node program script within that package. In the case of standard, it associates a command named standard with a Node program script that performs linting. The associated commands of all installed packages are available within any defined package.json scripts.

Let's make sure all dependencies are installed before we try out the "lint" script by running.

npm install

Next, to execute the script use npm run:

npm run lint



There will be no output because there are no files to lint, let's add a file to my-package called index.js with the following contents:

'use strict';
console.log('my-package started');
process.stdin.resume();

Now let's execute npm run lint again:



We have some lint errors. The standard linter has a --fix flag that we can use to autocorrect the lint errors. We can use a double dash (--) to pass flags via npm run to the aliased command:

npm run lint -- --fix

npm run lint -- --fix and output

As a result the index.js was altered according to the lint rules, and saved.

There are two package scripts namespaces that have dedicated npm commands: npm test and npm start.

The package.json already has a "test" field, let's run npm test:

$ npm test  > my-package@1.0.0 test /training/ch-6/my-package > echo "Error: no test specified" && exit 1  Error: no test specified npm ERR! Test failed. See above for more details.

The "test" field in package scripts is as follows:

"test": "echo "Error: no test specified" && exit 1"

The output is as expected. Testing will be explored in full in Section 16 - "Writing Unit Tests".

Note that we did not have to use npm run test, the npm test command is an alias for npm run test. This aliasing only applies to test and start. Our npm run lint command cannot be executed using npm lint for example.

Let's add one more script, a "start" script, edit the package.json scripts field to match the following:

"scripts": {
"start": "node index.js",
"test": "echo "Error: no test specified" && exit 1",
"lint": "standard"
},

Now let's run npm start:

$ npm start  > my-package@1.0.0 start /training/ch-6/my-package > node index.js  my-package started

To exit the process, hit CTRL-C.

-->

---

# CommonJS vs ESM


<v-clicks>

When Node was created, JS didn't have a module system so they used require.js.

This approach is still used in lots of packages and documentation.

ESM is the approach that browsers use and Node has allowed for it since Node 10. More and more authors are moving to this approach.

Let's look at how we can export/import using CommonJS and then refactor to ESM.


</v-clicks>



<!--

JS didn't have a packaging system so Node internally adopted the requirejs library.

This is a synchronous library that calls the require tree to build up a picture of the package.

It relies on the module object that, in CommonJS, each file has. So, we update the module.exports property to export and use require to import.

Since Node 10, it's been possible to use an ESM approach. You may have seen this in React/Vue or other frontend frameworks.

This stops each file having a module object and is asynchronous. It is harder for application performance managers to benchmark. However, it is more versitile, we can get a lot of the missing functionality back and people are working on making it more testable.

We've

-->

---

# All the importing

---

# Exercises

1. Open `Labs/05-node-js-module-system/add.js` and create a function that takes two numbers and adds them together. Export that function.

2. In `index.js` import the function you've created and use it to console.log two numbers being added together.

3. Add a console.log to your `add.js` file which will add two numbers together loaded as a separate program. Check that this works by running `node add.js` in the directory.
