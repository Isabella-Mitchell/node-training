## Node.js MVC Folder Structure

Following the MVC pattern, this is a sample folder structure for developing backend applications using the MERN Stack.

#### What is the _MERN_ Stack?

_MERN_ stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- **MongoDB** - document database
- **Express.js** - Node.js web framework
- **React.js** - a client-side JavaScript framework
- **Node.js** - the premier JavaScript web server

```bash
├── ...
└── src
    ├── config
    │   └── ...\.js
    ├── controllers
    │   └── user-controller.js
    │   └── X-controller.js
    ├── db
    │   └── ...\.js
    ├── middleware
    │   └── X-middleware.js
    ├── models
    │   ├── index.js
    │   └── user-model.js
    │   └── X-model.js
    ├── routes
    │   └── user-routes.js
    │   └── X-routes.js
    ├── index.js
    └── server.js
```

### Folders Used

#### `controllers`

Where we store the controllers used in the routes. These are responsible for return a response for each endpoint, usually they connect to the DB and fetch the data from it.

#### `routes`

Where we store the routes used in the endpoints of the app.

#### `models`

Where we store the mongoose models of the app.

### Other Folder

#### `config`

Where we can store all the configuration files needed in the app.

#### `middleware`

Where we can store the middleware used in the app.

#### `db`

Where we can store the files related to the database.

#### `server.js`

The file that holds the express.js `app` exported for use in the `index.js` file and for easier testing.

#### `index.js`

The file that starts up the express.js `app`.

## Connecting With mongoose

The first thing we need to do is to connect to a MongoDB database using the mongoose `connect` method.

```js
// src/db/connect.js
mongoose.connect("mongodb://localhost:27017/workshop-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

If you get any deprecation warnings in the terminal you should copy the properties mongo recommends adding to the connect method.

```bash
node:57382) DeprecationWarning: current URL string parser is deprecated,
and will be removed in a future version. To use the new parser,
pass option { useNewUrlParser: true } to MongoClient.connect.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:57382) DeprecationWarning: current Server Discovery and
Monitoring engine is deprecated, and will be removed in a future version.
To use the new Server Discover and Monitoring engine,
pass option { useUnifiedTopology: true } to the MongoClient constructor.
```

One way of starting the connection to the database is to first connect to it and then start the express server in the `index.js` file.

```js
// src/index.js
import app from "./server";
import config from "./config/config";
import connect from "./db/connect";

connect().then(() => {
  config.logger.info(`DB connected`);

  app.listen(config.app.PORT, () => {
    config.logger.info(`Server running at http://localhost:${config.app.PORT}`);
  });
});
```


## mongoose Schemas

Defining a MongoDB schema for a collection is very easy with mongoose.

To define a schema we can use the `mongoose.Schema` constructor:

```js
const UserSchema = new mongoose.Schema({ ...properties });
```

Mongoose schemas can be of several primitive types that are available in Javascript and some that are from MongoDB:

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map

```js
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});
```

We can specify the type of a property by using the `type` property or the shorthand version:

```js
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
```

Other schema options include the following:

- `required`: if the property must have a value when creating a document or not
- `lowercase`: boolean, whether to always call `.toLowerCase()` on the value
- `uppercase`: boolean, whether to always call `.toUpperCase()` on the value
- `trim`: boolean, whether to always call `.trim()` on the value
- `enum`: Array, creates a validator that checks if the value is in the given array.
- `minLength`: Number, creates a validator that checks if the value length is not less than the given number
- `maxLength`: Number, creates a validator that checks if the value length is not greater than the given number

### Schema Validation

Besides adding just an option to a property in the schema we can also add a error message:

```js
const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "The password is too short"],
  },
});
```

### Custom Validator

We can also add a custom validator to the schema. The validator will be called with the value of the field when it is created and it should return `true` if it passes or `false` if it doesn't. Then, the custom message we provide will be thrown if it doesn't pass the validation.

```js
import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
});
```

### Creating a Model

Once we have defined the schema we can now create a model with it.

```js
const UserModel = new mongoose.model("user", UserSchema);
```

This creates a collection that has as a name the pluralized version of the first argument we pass to the `mongoose.model` constructor.

### Complete Example of a User Schema

```js
// src/models/user-model.js
import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: Number,
    developer: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "The password is too short"],
    },
    activities: [
      // Array have a default value of [] (empty array)
      {
        type: String,
        enum: ["Programming", "Studying", "Ping Pong"],
      },
    ],
  },
  { timestamps: true },
);

const UserModel = new mongoose.model("user", UserSchema);

export default  UserModel;
```

Then, once we have created the `User` schema we can import it in the `index.js` file in the `models` folder. This is the entry point to our database that we will use throughout the app.

```js
const UserModel from "./user-model");

export default  {
  UserModel as User
};
```

## Creating Documents

Based on the previous schema we can now try to create a document.

```js
const { logger } from "../config/config");
const db from "../models");
const connect from "../db/connect");

(async () => {
  // first we need to connect to the mongodb database
  await connect();

  // delete all the documents to avoid duplicate email errors
  await db.User.deleteMany({});

  try {
    // create the document
    const user = await db.User.create({
      firstName: "alex",
      lastName: "mark",
      age: 20,
      email: "humitsak@wamgo.com",
      password: "266-1089-eula-stephens",
      activities: "Programming",
    });

    logger.debug(user);
  } catch (error) {
    // catch any errors that appear
    logger.error(error.errors);
  }
})();
```

If we look carefully we can also see that the `_id` field has been automatically created and that the `createdAt` and `updatedAt` fields have been added because we created the schema with the `{ timestamps: true }` option.

Our new user document:

```bash
{
  developer: true,
  activities: [ 'Programming' ],
  _id: 5fee135cac8cf687bf3b04fa,
  firstName: 'alex',
  lastName: 'mark',
  age: 20,
  email: 'humitsak@wamgo.com',
  password: '266-1089-eula-stephens',
  createdAt: 2020-11-31T18:07:24.337Z,
  updatedAt: 2020-11-31T18:07:24.337Z,
  __v: 0
}
```

If we try to create a document with missing or invalid fields we would get an error.

```js
try {
  // create the document
  const user = await db.User.create({
    firstName: "alex",
    // lastName: "mark",
    age: 20,
    email: "humitsak@wamgo.com",
    password: "266-1089-eula-stephens",
    activities: "Programming",
  });

  logger.debug(user);
} catch (error) {
  // catch any errors that appear
  logger.error(error.errors);
}
```

Error message:

```bash
{
  lastName: ValidatorError: Path `lastName` is required.
      at validate (/Users/mariandaniellucaci/_ignored_dropbox_folders/assembler/mongodb-intro-workshop/node_modules/mongoose/lib/schematype.js:1257:13)
      at /Users/mariandaniellucaci/_ignored_dropbox_folders/assembler/mongodb-intro-workshop/node_modules/mongoose/lib/schematype.js:1240:7
      at Array.forEach (<anonymous>)
      at SchemaString.SchemaType.doValidate (/Users/mariandaniellucaci/_ignored_dropbox_folders/assembler/mongodb-intro-workshop/node_modules/mongoose/lib/schematype.js:1185:14)
      at /Users/mariandaniellucaci/_ignored_dropbox_folders/assembler/mongodb-intro-workshop/node_modules/mongoose/lib/document.js:2501:18
      at processTicksAndRejections (node:internal/process/task_queues:75:11) {
    properties: {
      validator: [Function (anonymous)],
      message: 'Path `lastName` is required.',
      type: 'required',
      path: 'lastName',
      value: undefined
    },
    kind: 'required',
    path: 'lastName',
    value: undefined,
    reason: undefined,
    [Symbol(mongoose:validatorError)]: true
  }
}
```

Or a user with an invalid email:

```js
try {
  // create the document
  const user = await db.User.create({
    firstName: "alex",
    lastName: "mark",
    age: 20,
    email: 1,
    password: "266-1089-eula-stephens",
    activities: "Programming",
  });

  logger.debug(user);
} catch (error) {
  // catch any errors that appear
  logger.error(error.errors);
}
```

Error message:

```bash
{
  email: ValidatorError: 1 is not a valid email address
      at validate (/Users/mariandaniellucaci/_ignored_dropbox_folders/assembler/mongodb-intro-workshop/node_modules/mongoose/lib/schematype.js:1257:13)
      at /Users/mariandaniellucaci/_ignored_dropbox_folders/assembler/mongodb-intro-workshop/node_modules/mongoose/lib/schematype.js:1240:7
      at Array.forEach (<anonymous>)
      at SchemaString.SchemaType.doValidate (/Users/mariandaniellucaci/_ignored_dropbox_folders/assembler/mongodb-intro-workshop/node_modules/mongoose/lib/schematype.js:1185:14)
      at /Users/mariandaniellucaci/_ignored_dropbox_folders/assembler/mongodb-intro-workshop/node_modules/mongoose/lib/document.js:2501:18
      at processTicksAndRejections (node:internal/process/task_queues:75:11) {
    properties: {
      validator: [Function],
      message: '1 is not a valid email address',
      type: 'user defined',
      path: 'email',
      value: '1'
    },
    kind: 'user defined',
    path: 'email',
    value: '1',
    reason: undefined,
    [Symbol(mongoose:validatorError)]: true
  }
}
```

## Mongoose Schema Hooks

On very powerful feature of mongoose schemas is that it allows us to execute some logic before or after a particular action takes place in our documents.

```js
schema.pre("validate", function () {
  console.log("this gets printed first");
});
schema.post("validate", function () {
  console.log("this gets printed second");
});
schema.pre("save", function () {
  console.log("this gets printed third");
});
schema.post("save", function () {
  console.log("this gets printed fourth");
});
```

Other options include:

- `findOneAndUpdate`
- `updateOne`
- `find`
- `remove`
- ...

## Safer Way of Storing Passwords

One major security issue we have so far is that we are storing the passwords in plain text in our database.

```bash
{
  _id: 5fee135cac8cf687bf3b04fa,
  ...
  password: '266-1089-eula-stephens',
  ...
}
```

In order to solve this issue we can use the mongoose `.pre("save")` hook to modify the document before it is saved in the database.

This way we can encrypt the password using the `bcrypt` package so that it is safer.

```js
// src/models/user-model.js
UserSchema.pre("save", function userPreSaveHook(next) {
  if (!this.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(this.password, 12);

    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});
```

Now, if we create the document again we can see that the password is encrypted.

```bash
{
  _id: 5fee18fcaf6757c537bbc4fe,
  ...
  password: '$2b$12$OnNXMIQlIbTxZJy1Eh4xLuvwB7/9snZYXcHO3BA5x1Fu4ycamqLv6',
  ...
}
```

Then, when we want to compare the password for when the user wants to login, we can use another feature of mongoose schemas: schema methods.

```js
// src/models/user-model.js
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};
```

Schema methods will be available on the document we create because every mongoose document has additional helper methods we can use.

We can now use the `comparePassword()` method in the following way:

```js
const user = await db.User.create({
  firstName: "alex",
  lastName: "mark",
  age: 20,
  email: "humitsak@wamgo.com",
  password: "266-1089-eula-stephens",
  activities: "Programming",
});

const match = await user.comparePassword("266-1089-eula-stephens");

console.log(match); // true
```

## Mongoose Schema Exercises

The test suites for these exercises can be executed with the following script: `npm run test:01:schemas`.

Open the files indicated below and read the instructions and requirements of the tests to solve them.

- Once you are done the instructor will solve each step
- If you get stuck you can find the answers in the `01-mongoose-schema-exercises-solution` branch
- Try not to peek at the solutions and solve them with your pair programming partner
- To finish this part you have 20 minutes

### 1. Create the connection logic in the `/src/db/connect.js` file


### 2. Create the `Book` model in the `/src/models/book-model.js` file

- **Test suite:** "2. create the 'Book' model following the schema requirements"

## CRUD Methods With Mongoose

Mongoose provides several methods for querying, modifying and removing documents.

- `Model.find()`
- `Model.findById()`
- `Model.findOne()`
- `Model.findByIdAndDelete()`
- `Model.findByIdAndRemove()`
- `Model.findByIdAndUpdate()`
- `Model.findOneAndDelete()`
- `Model.findOneAndRemove()`
- `Model.findOneAndReplace()`
- `Model.findOneAndUpdate()`
- `Model.replaceOne()`
- `Model.updateMany()`
- `Model.updateOne()`
- `Model.deleteMany()`
- `Model.deleteOne()`

### Query Methods

To find documents with mongoose we can use one of the query methods:

- `Model.find()`
- `Model.findById()`
- `Model.findOne()`

They can be used with regular MongoDB filters similar to the ones we have seen before.

#### `Model.findOne()`

```js
import { logger } from "../config/config";
import db from "../models";
import connect from "../db/connect";
import { seedUsers } from "../db/seed";

async function queries() {
  // connect to the db first
  await connect();
  // insert some users
  await seedUsers();

  const user = await db.User.findOne({ firstName: "Margaret" });

  logger.debug(user);
}

queries();
```

The `findOne()` method returns a single document if it passes the filter or `null` if no results are found.

```bash
{
  speaks: [ 'catalan', 'spanish' ],
  _id: 5ff0385e93040fec99749cc9,
  firstName: 'Margaret',
  lastName: 'Watkins',
  email: 'edde@kodbi.eh',
  password: '$2b$12$N3MIKF8C/s7pfAW/X7MJpeHE/YR2Q6Rc6Rmj9CrM2sVt7NH1w2k9q',
  createdAt: 2021-01-02T09:09:50.419Z,
  updatedAt: 2021-01-02T09:09:50.419Z,
  __v: 0
}
```

#### `Model.findById()`

The `.findById()` method accepts as a filter a string with the `_id` of a document.

This method is the same as using `Model.findOne({ _id: "document_id" })`:

```js
const user_1 = await db.User.findOne({ _id: users[0]._id });
const user_2 = await db.User.findById(users[0]._id);
```

```js
const users = await db.User.find({});
const user_1 = await db.User.findById(users[0]._id);

logger.debug(users);
logger.debug(user_1);
```

```bash
[
  {
    speaks: [ 'english', 'spanish' ],
    _id: 5ff039a465846ffa4bce9483,
    firstName: 'Alta',
    lastName: 'Harris',
    email: 'cuk@boeli.gn',
    password: '$2b$12$Ll0T6Ue.QXz5ukEwpTdNOe4hTwsIK.fTv/QeLUuNb0bqnOhvAAL02',
    createdAt: 2021-01-02T09:15:16.989Z,
    updatedAt: 2021-01-02T09:15:16.989Z,
    __v: 0
  },
  ...
]

{
  speaks: [ 'english', 'spanish' ],
  _id: 5ff039a465846ffa4bce9483,
  firstName: 'Alta',
  lastName: 'Harris',
  email: 'cuk@boeli.gn',
  password: '$2b$12$Ll0T6Ue.QXz5ukEwpTdNOe4hTwsIK.fTv/QeLUuNb0bqnOhvAAL02',
  createdAt: 2021-01-02T09:15:16.989Z,
  updatedAt: 2021-01-02T09:15:16.989Z,
  __v: 0
}
```

#### Queries are Not Promises

Mongoose queries are not promises. They have a `.then()` function for co and `async`/`await` as a convenience. However, unlike promises, calling a query's `.then()` can execute the query multiple times.

In order to convert the queries to a Spec Compliant Promise we need to always execute the `.exec()` method in all query methods: `Model.find()`, `Model.findById()`, `Model.findOne()`

```js
const users = await db.User.find({}).exec();
```

#### Lean Documents

Mongoose queries return Mongoose documents which have several helper methods. This means that if we just need the JSON information of the document we should execute the `.lean()` method to convert the document to an object.

```js
const user = await db.User.findOne({ firstName: "Margaret" }).exec();

logger.debug(user); // the user info
logger.debug(user.comparePassword);
logger.debug(user.save);
```

```bash
{
  speaks: [ 'catalan', 'spanish' ],
  _id: 5ff03c698ad8311755d9ebe8,
  firstName: 'Margaret',
  lastName: 'Watkins',
  email: 'edde@kodbi.eh',
  password: '$2b$12$caJhrfqx2Ko9wUt5IGsrWeTgTZvRcqsXukylXxrSy2FxtAwnYKHBO',
  createdAt: 2021-01-02T09:27:05.971Z,
  updatedAt: 2021-01-02T09:27:05.971Z,
  __v: 0
}
[Function: comparePassword]
[Function (anonymous)]
```

If we execute the `.lean()` method before calling `.exec()` the methods will no longer be available because the document is now just JSON.

```js
const user = await db.User.findOne({ firstName: "Margaret" }).lean().exec();

logger.debug(user); // the user info
logger.debug(user.comparePassword);
logger.debug(user.save);
```

```bash
{
  speaks: [ 'catalan', 'spanish' ],
  _id: 5ff03c698ad8311755d9ebe8,
  firstName: 'Margaret',
  lastName: 'Watkins',
  email: 'edde@kodbi.eh',
  password: '$2b$12$caJhrfqx2Ko9wUt5IGsrWeTgTZvRcqsXukylXxrSy2FxtAwnYKHBO',
  createdAt: 2021-01-02T09:27:05.971Z,
  updatedAt: 2021-01-02T09:27:05.971Z,
  __v: 0
}
undefined
undefined
```

#### Projection

We can also use projection with mongoose queries.

```js
const user = await db.User.findOne({ firstName: "Margaret" })
  .select({
    firstName: 1,
    lastName: 1,
  })
  .lean()
  .exec();

logger.debug(user);
```

```bash
{
  _id: 5ff03d3749f2f81fc9e1e97f,
  firstName: 'Margaret',
  lastName: 'Watkins'
}
```

Another way of using project is with the shorthand version:

```js
const user = await db.User.findOne({ firstName: "Margaret" })
  .select("firstName lastName")
  .lean()
  .exec();
```

```bash
{
  _id: 5ff03d8475f9a422fd993d18,
  firstName: 'Margaret',
  lastName: 'Watkins'
}
```

Shorthand version of excluding elements:

```js
const user = await db.User.findOne({ firstName: "Margaret" })
  .select("-password -__v -speaks -createdAt -updatedAt")
  .lean()
  .exec();
```

```bash
{
  _id: 5ff03dcbbb7ede25f4eb437d,
  firstName: 'Margaret',
  lastName: 'Watkins',
  email: 'edde@kodbi.eh'
}
```

#### Sorting

We can sort results using the `.sort()` method.

```js
const user = await db.User.find({})
  .select("firstName")
  .sort({ firstName: 1 })
  .lean()
  .exec();
```

```bash
[
  { _id: 5ff03e22ff55232989a60be6, firstName: 'Alta' },
  { _id: 5ff03e22ff55232989a60be7, firstName: 'Darrell' },
  { _id: 5ff03e22ff55232989a60be3, firstName: 'Jordan' },
  { _id: 5ff03e22ff55232989a60be5, firstName: 'Mable' },
  { _id: 5ff03e22ff55232989a60be4, firstName: 'Margaret' },
  { _id: 5ff03e22ff55232989a60be8, firstName: 'Ryan' }
]
```

#### Pagination

In order to paginate results we can use the `.skip()` and `.limit()` methods

##### `.limit()`

```js
const user = await db.User.find({})
  .select("firstName")
  .sort({ firstName: 1 })
  .limit(2)
  .lean()
  .exec();
```

```bash
[
  { _id: 5ff03eae764c7e2f89acc440, firstName: 'Alta' },
  { _id: 5ff03eae764c7e2f89acc441, firstName: 'Darrell' }
]
```

##### `.skip()`

```js
const user = await db.User.find({})
  .select("firstName")
  .sort({ firstName: 1 })
  .skip(2)
  .limit(2)
  .lean()
  .exec();
```

```bash
[
  { _id: 5ff03ed67d03c831390b37dd, firstName: 'Jordan' },
  { _id: 5ff03ed67d03c831390b37df, firstName: 'Mable' }
]
```

### Updating Documents

Mongoose provides several methods to update documents.

- `Model.findByIdAndUpdate()`
- `Model.findOneAndReplace()`
- `Model.findOneAndUpdate()`
- `Model.replaceOne()`
- `Model.updateMany()`
- `Model.updateOne()`

#### `Model.findByIdAndUpdate()`

With this method we can find a document by its `_id` and update some fields.

```js
const users = await db.User.find({});
const user = await db.User.findByIdAndUpdate(users[0]._id, {
  $set: { firstName: "MODIFIED" },
});

logger.debug(users[0]);
logger.debug(user);
```

```bash
[
  {
    speaks: [ 'german', 'english' ],
    _id: 5ff041b56c91854f982cf3c5,
    firstName: 'Mable',
    lastName: 'Schneider',
    email: 'ba@wuf.ws',
    password: '$2b$12$LAp/TBEGIFiCezXdsX7lveDq6borLARKs3gBUvaPUor3n1hQe3NiW',
    createdAt: 2021-01-02T09:49:41.807Z,
    updatedAt: 2021-01-02T09:49:41.807Z,
    __v: 0
  }
  ...
]

{
  speaks: [ 'german', 'english' ],
  _id: 5ff041b56c91854f982cf3c5,
  firstName: 'Mable',
  lastName: 'Schneider',
  email: 'ba@wuf.ws',
  password: '$2b$12$LAp/TBEGIFiCezXdsX7lveDq6borLARKs3gBUvaPUor3n1hQe3NiW',
  createdAt: 2021-01-02T09:49:41.807Z,
  updatedAt: 2021-01-02T09:49:41.807Z,
  __v: 0
}
```

However, if we look at the `firstName` field it is still not modified. This happens because the document has been modified in the database but the method doesn't return the updated document. To fix this we need to provide the following command:

```js
{ new: true }
```

```js
const user = await db.User.findByIdAndUpdate(
  users[0]._id,
  {
    $set: { firstName: "MODIFIED" },
  },
  {
    new: true,
    projection: {
      firstName: 1,
    },
  },
);
```

Now the `firstName` field reflects the updated value.

```bash
{ _id: 5ff04268d4f3745709f8764c, firstName: 'MODIFIED' }
```

#### `Model.findOneAndUpdate()`

This method allows us to find a document and modify it. The difference between the `Model.findOneAndUpdate()` method and the `Model.updateOne()` one is that `findOneAndUpdate()` returns the modified document while `updateOne()` doesn't.

```js
const user = await db.User.findOneAndUpdate(
  { firstName: "Margaret" },
  {
    $set: { firstName: "Someone Else" },
  },
  {
    new: true,
    projection: {
      firstName: 1,
    },
  },
);
```

```bash
{ _id: 5ff043ec3393c86709c734e0, firstName: 'Someone Else' }
```

#### `Model.updateOne()`

```js
const user = await db.User.updateOne(
  { firstName: "Margaret" },
  {
    $set: { firstName: "Someone Else" },
  },
);
```

```bash
{ n: 1, nModified: 1, ok: 1 }
```

#### `Model.updateMany()`

```js
const user = await db.User.updateMany(
  {
    speaks: ["catalan", "spanish"],
  },
  [
    {
      $set: { isNative: true },
    },
  ],
);

const users = await db.User.find({ isNative: true }).select("isNative");
```

```bash
{ n: 1, nModified: 1, ok: 1 }
[ { _id: 5ff046c69a3c048516cce1c6, isNative: true } ]
```

#### `upsert: true`

The `upsert` option allows us to create a document if it doesn't exist.

When you specify the option `upsert: true`:

- If document(s) match the query criteria, the method performs an update.
- If no document matches the query criteria, the method inserts a single document.

However, when using Mongoose validation in schemas it is important to keep in mind that the validation rules won't be triggered when using upsert. To validate the values entered you will need to use the `document.validate()` method.

```js
const user = await db.User.findOneAndUpdate(
  {
    firstName: "  Antonio  ",
  },
  {
    $push: { speaks: "italian" },
  },
  {
    upsert: true,
    new: true,
  },
);

logger.debug(user);

try {
  await user.validate();
} catch (error) {
  logger.error(error.errors.lastName.message);
  logger.error(error.errors.email.message);
  logger.error(error.errors.password.message);
}
```

The document was created with just part of the required fields, therefore the `validate()` method will throw an error for each missing field.

```bash
{
  speaks: [ 'italian' ],
  _id: 5ff0a7462b5833e88f16becd,
  firstName: 'Antonio',
  __v: 0,
  createdAt: 2021-01-02T17:03:02.234Z,
  updatedAt: 2021-01-02T17:03:02.234Z
}
The last name is required
The email is required
The password is required
```

### Document Removal Methods

Mongoose also offers several methods to remove documents.

**You should use the `.findXAndDelete()` methods instead of the `.findXAndRemove()` methods because they are more performant**

Again, the `.findX` methods return the document found, if any.

- `Model.findByIdAndDelete()`
- `Model.findByIdAndRemove()`
- `Model.findOneAndDelete()`
- `Model.findOneAndRemove()`
- `Model.deleteMany()`
- `Model.deleteOne()`

#### `Model.findOneAndDelete()`

```js
const user = await db.User.findOneAndDelete({ firstName: "Ryan" });
```

```bash
{
  speaks: [ 'english', 'spanish' ],
  _id: 5ff0a9b82b296a7af888e1c4,
  firstName: 'Ryan',
  lastName: 'McGuire',
  email: 'beta@houboem.py',
  password: '$2b$12$4tOKRRzJGxMTYLULAqh1e.Mo7NtEEyWSzew2mEXoaiYyw6Q7xb9zS',
  createdAt: 2021-01-02T17:13:28.640Z,
  updatedAt: 2021-01-02T17:13:28.640Z,
  __v: 0
}
```

#### `Model.deleteOne()`

```js
const user = await db.User.deleteOne({ firstName: "Ryan" });
```

```bash
{ n: 1, ok: 1, deletedCount: 1 }
```

