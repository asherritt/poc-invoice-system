# MongoDB Interactions

## Database Connection

### Mongo Client

```
import { MongoClient } from 'mongodb';
const uri = "mongodb://localhost:27017/invoicesDB";
const client = new MongoClient(uri);
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } finally {
    await client.close();
  }
}
connectDB();
```

### Mongoose

```
import mongoose from 'mongoose';

const uri = "mongodb://localhost:27017/invoicesDB";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error", err));
```

## Creating a Collection

### Mongo Client

```
async function createCollection() {
  const db = client.db("invoicesDB");
  await db.createCollection("customers");
}
```

### Mongoose

```
import { Schema, model } from 'mongoose';

const CustomerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
});

const Customer = model('Customer', CustomerSchema);
```

## Inserting a Document

### Mongo Client

```
async function insertCustomer() {
  const db = client.db("invoicesDB");
  const customers = db.collection("customers");

  const result = await customers.insertOne({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
  });

  console.log("Inserted ID:", result.insertedId);
}
```

### Mongoose

```
async function createCustomer() {
  const customer = new Customer({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
  });

  await customer.save();
  console.log("Customer saved:", customer);
}
```

## Finding Documents

### Mongo Client

```
async function findCustomer() {
  const db = client.db("invoicesDB");
  const customers = db.collection("customers");

  const result = await customers.findOne({ firstName: "John" });
  console.log(result);
}
```

### Mongoose

async function getCustomer() {
const customer = await Customer.findOne({ firstName: "John" });
console.log(customer);
}

## Updating Documents

### Mongo Client

```
async function updateCustomer() {
  const db = client.db("invoicesDB");
  const customers = db.collection("customers");

  const result = await customers.updateOne(
    { firstName: "John" },
    { $set: { email: "john.doe@newdomain.com" } }
  );

  console.log("Modified count:", result.modifiedCount);
}
```

### Mongoose

```
async function updateCustomer() {
  const customer = await Customer.findOneAndUpdate(
    { firstName: "John" },
    { email: "john.doe@newdomain.com" },
    { new: true }
  );

  console.log("Updated customer:", customer);
}
```
