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

# MongoDB & Mongoose


---

# What is NoSQL?

<v-clicks>

NoSQL databases (aka "not only SQL") store data differently than relational tables. NoSQL databases come in a variety of types based on their data model. The main types are document, key-value, wide-column, and graph. They provide flexible schemas and scale easily with large amounts of data and high user loads.

</v-clicks>

---

# Advantages of NoSQL Over RDBMS

<v-clicks>

Handles Big Data
Data Models - No predefined schema
Data Structure - NoSQL handles unstructured data
Cheaper to manage
Scaling: Scale out

</v-clicks>

---

# Scaling

<v-clicks>

Scaling is growing an infrastructure (compute, storage, networking) larger so that the applications riding on that infrastructure can serve more people at a time. 

When developers talk about the ability of an infrastructure design to scale, we mean that the design as conceived is able to grow larger over time without a wholesale replacement. 

The terms “scale up” and “scale out” refer to the way in which the infrastructure is grown.


</v-clicks>

---

# Scaling Up (SQL) vs Scaling Out (NoSQL)

Scaling up is taking what you’ve got, and replacing it with something more powerful. You will need to add more components, storage, CPU’s, and other resources that are very expensive and takes a lot of time.

Scaling out takes the infrastructure you’ve got, and replicates it to work in parallel. This has the effect of increasing infrastructure capacity roughly linearly. For, example, you can simply add additional nodes expanding your disk size. Scaling is definitely one of the advantages of NoSQL.

---

# MongoDB

Ranked as the world’s most popular NoSQL database

<v-clicks>

MongoDB is a document-based database built for modern application developers and for the cloud era.

It’s a document-oriented NoSQL database used for high volume data storage. Instead of using tables and rows as in the traditional relational databases, MongoDB makes use of collections and documents.


</v-clicks>

---

# Common terms used in MongoDB

_id, collections, documents, key-value pairs, cursors

---
layout: two-cols
---

# _id

This is a field required in every MongoDB document.

It represents a unique value in the MongoDB document and it’s the document's primary key.

It is built using the MongoDB ObjectId()

::right::

```js
ObjectId("507f191e810c19729de860ea")

{
    "_id": 3,
    "item": "xyz",
    "price": 5,
    "quantity": 10
}
```

---
layout: two-cols
---

# Collection

A grouping of MongoDB documents.

A collection is the equivalent of a table in MySQL.

::right::

```js
[
    {
        "_id": 1,
        "item": "abc",
        "price": 10,
        "quantity": 2
    },
    {
        "_id": 2,
        "item": "jkl",
        "price": 20,
        "quantity": 1
    },
    {
        "_id": 3,
        "item": "xyz",
        "price": 5,
        "quantity": 10
    }
]
```

---
layout: two-cols
---

# Document

A record in a MongoDB collection is basically called a document. The document, in turn, will consist of field name and values.

::right::

```js
{
    "_id": 2,
    "item": "jkl",
    "price": 20,
    "quantity": 1
}
```

---
layout: two-cols
---

# Cursor

A pointer to the result set of a query. Clients can iterate through a cursor to retrieve results.

Instead of returning all the docs in a collection, we can use cursors to paginate the results in chunks of 20 documents at a time.

::right::

```sh
> db.persons.find({}, { _id: 1 }).pretty()
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbf5") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbf6") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbf7") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbf8") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbf9") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbfa") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbfb") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbfc") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbbfd") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbc06") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbc07") }
{ "_id" : ObjectId("5ebffb771559bba7ae3dbc08") }
Type "it" for more
>
```

---
layout: two-cols
---

# Fields

A key-value pair in a document. A document has zero or more fields. Fields are analogous to columns in relational databases.

::right::

```js
{
    "_id": 2,
    "item": "jkl",
    "price": 20,
    "quantity": 1
}
```

---
layout: quote
---

As a programmer, you think in objects. MongoDB does too.

---
layout: two-cols
---

# MongoDB as a document database

MongoDB is a document database, which means it stores data in JSON-like documents. They believe this is the most natural way to think about data, and is much more expressive and powerful than the traditional row/column model.

::right::

```js
{
   "_id": "5cf0029caff5056591b0ce7d",
   "firstname": "Jane",
   "lastname": "Wu",
   "address": {
       "street": "1 Circle Rd",
       "city": "Los Angeles",
       "state": "CA",
       "zip": "90404"
   },
   "hobbies": ["surfing", "coding"]
}
```

---

# Getting Started

---

# The MongoDB Shell

Once you have installed MongoDB locally you can use the Mongo Shell to create databases and perform queries

---

# Compass

You can also use the Compass GUI tool to interact with the databases if you prefer a more visual tool

---

# Connecting to MongoDB

<v-clicks>

In order to connect to a MongoDB database we can use a connection string which uses the following format:

mongodb://127.0.0.1:27017/{db_name}

If we just want to connect to a localhost server we can use the following format which uses the default mongo port:

mongodb://127.0.0.1


</v-clicks>

---
layout: two-cols
---

# Basic MongoDB Commands

> help

First of all, if we open the mongodb shell we can use the help command to see all the operations we can perform.

::right::

```sh
> help
        db.help()                    help on db methods
        db.mycoll.help()             help on collection methods
...

        show dbs                     show database names
        show collections             show collections in current database
... 
       use <db_name>                set current database
        db.foo.find()                list objects in collection foo
        db.foo.find( { a : 1 } )     list objects in foo where a == 1
        it                           result of the last line evaluated; 
    use to further iterate
...

```

---
layout: two-cols
---

# > db.collection.help

With this command we can see the help of the commands we can perform on a single collection

::right::

```sh
> db.persons.help()
DBCollection help
        db.persons.find().help() - show DBCursor help
        db.persons.bulkWrite( operations, <optional params> ) - ...
        db.persons.count( query = {}, <optional params> ) - ...
        db.persons.countDocuments( query = {}, <optional params> ) - …
...
```

---

# mongoimport

Using the mongoimport tool we can import a json file to populate the database.

```sh
# use the src/mongodb/persons-data.json file from the workshop repository

$ mongoimport src/mongodb/persons-data.json -d contact -c persons --jsonArray

2020-12-30T14:43:43.287+0100    connected to: mongodb://localhost/
2020-12-30T14:43:43.708+0100    5000 document(s) imported successfully. 0 document(s) failed to import.

```

---

# > show dbs

With this command we can list all the current databases in our server

---

# > use contact

With the use command we can switch to a particular database

---

# > show collections

With this command we can get a listing of all the collections in a database

---
layout: two-cols
---

# > count()

Once you have imported all the data you can see if the database has been populated with the count() method

::right::

```sh
> db.persons.count()
5000
```

---

# > use demoDB

In MongoDB it’s much easier to create a new database. We can just specify the db name with the use command

---

# Creating a collection

To create a new collection we can simply use an insert (insertOne, insertMany) command on a collection name. In this case we create a new student in the students collection.


```sh
> db.students.insertOne({ name: "alex", age: 24 });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5fec89f286a8cec146bca06c")
}
>
```

---

# insertMany()

With the insertMany() command we can create several documents at the same time. 

Here we can also see the magic of NoSQL databases in that the documents don’t have to follow the same schema.

```sh
> db.students.insertMany([{ name: "maria", age: 32, grades: [9, 8.5, 6] }, { name: "john", age: 20, grades: [5, 6, 4] }]);
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5fec89f986a8cec146bca06d"),
                ObjectId("5fec89f986a8cec146bca06e")
        ]
}
```

---

# Other commands

<v-clicks>

.find({})
.count()
.sort({})
.limit({})

</v-clicks>

---

# MongoDB Query Operators

Using the MongoDB Query Operators we can easily find documents in collections.

$eq, $ne, $in, $nin, $and, $or, ...

---

# Import the data

For these steps you should import the data we provide so that you can perform the queries at the same time. 

mongoimport Code/mongo/movies.json -d moviesData -c movies --jsonArray

```sh
# Switch to the moviesData database
> use moviesData
switched to db moviesData

> db.movies.count()
97
```

---

# MongoDB Update Operators

Using the MongoDB Update Operators and the updateMany() or updateOne() methods we can easily find and modify documents.

$set, $inc, $min, $push, $pull, ...

---

# Removing Documents From MongoDB

In MongoDB it’s also very easy to remove documents using the deleteOne() or deleteMany() methods.

---

# mongoose

<v-clicks>

So far we have seen the benefits of using MongoDB as a database such as:

- not having to defined a database or collection

- not having to define a schema

- ease of use

</v-clicks>

---

# mongoose

<v-clicks>

However, in most modern apps we need some type of validation each time we enter data into the DB because we should follow the golden rule of: 
Never trust client side data.

Furthermore, we also need to define some minimum requirements for our collections to ensure that, for example, we don’t create a user without an email in the correct format.

Although in modern versions of MongoDB we can define a schema for our data, it is still much easier to do so using mongoose.

</v-clicks>

---
layout: two-cols
---

# Types of Schemas in MongoDB

Documents don’t have the same fields and field types

## User A

```js
{
 "name": "Bradley Ortiz",
 "email": "brad@manguihi.ph",
 "phone": "(751) 348-4041",
 "age": "24"
}
```

::right::

## User B

```js
{
 "firstName": "Ana",
 "lastName": "Marks",
 "phone-number": "(459) 559-7641",
 "age": 33
}
```

---
layout: two-cols
---

# Some type of schema

Documents share some fields and field types

## User A

```js
{
 "firstName": "Bradley",
 "lastName": "Ortiz",
 "email": "brad@manguihi.ph",
 "phone": "(751) 348-4041",
 "age": 24,
 "address": null
}
```

::right::

## User B

```js
{
 "firstName": "Ana",
 "lastName": "Marks",
 "email": "ana@somemail.in",
 "phone-number": "(459) 559-7641",
 "age": "33"
}
```

---
layout: two-cols
---

# Exact type of schema

Documents share the same fields and field types

## User A

```js
{
 "firstName": "Bradley",
 "lastName": "Ortiz",
 "email": "brad@manguihi.ph",
 "phone": "(751) 348-4041",
 "age": 24,
 "address": null
}
```

::right::

## User B

```js
{
 "firstName": "Ana",
 "lastName": "Marks",
 "email": "ana@somemail.in",
 "phone": "(459) 559-7641",
 "age": 33,
 "address": null
}
```

---

# mongoose

> With the mongoose ODM (Object Document Mapping) we can easily define schemas with validation, required fields, default values, and, of course relations between documents.

---

# Lab

---


# Using the MySQL library

- Connect
- Query
- Insert
- Update
- Delete

---

# Using an ORM

- Sequelize
- Models

--- 

# Connection Pooling

<v-clicks>

- Rather than just relying on caching to improve DB performance, we can use connection pools.

- Each new DB connection takes about 1.3MB in memory - so in a heavy production environment, memory resources can be quickly exceeded.

- Instead of opening and closing connections for every request, connection pooling uses a cache of database connections that can be reused.

- This allows for parallel task execution.

- The connection pool is by process, so if you're using multiple nodes this scales.

</v-clicks>

<div v-click="6">

```js 
const sequelize = new Sequelize(/* ... */, {
  // ...
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
```

</div>

---

# NoSQL Databases

- Relational vs Document store


---

# Mongoose

- Create a model
- Create controllers

---


# Exercise

1. Migrate your in memory store to use a DB backend.