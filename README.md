# poc-invoice-system

A POC backend using Hapi JS, MongoDB and Mongoose

## Project Setup

```
npm init -y

npm install @hapi/hapi mongoose dotenv -s

npm install -D typescript ts-node @types/node @types/hapi\_\_hapi @types/mongoose

npx tsc --init

npm install --save-dev @types/hapi__hapi

```

## Mongoose

[Documentation](https://mongoosejs.com/docs/guide.html)

Think of Schema, Model, and Document in terms of a Cookie Factory:
• Schema = The recipe (what ingredients a cookie needs).
• Model = The factory (produces cookies based on the recipe).
• Document = A single cookie (made from the factory).

Document vs. Lean Documents
By default, Mongoose queries return full Mongoose documents, which come with extra functionalities and overhead. If you only need plain objects, use .lean():

```
const invoices = await Invoice.find().lean(); // Returns plain JavaScript objects
```

### Schema

    •	Schema defines the structure of MongoDB documents.
    •	Supports validation, default values, references, methods, hooks.
    •	Instance methods modify a single document.
    •	Static methods modify the entire collection.
    •	Virtuals define computed fields.
    •	Middleware executes logic before/after operations.
    •	Indexes improve query performance.

Methods
Mongoose allows defining instance methods (on document level):

```
InvoiceSchema.methods.isOverdue = function (): boolean {
return this.dueDate < new Date() && this.status !== "paid";
};

const invoice = await Invoice.findOne();
console.log(invoice?.isOverdue()); // Returns true/false
```

Static Methods
Schema can define static methods (on model level):

```
InvoiceSchema.statics.findOverdue = function () {
    return this.find({ dueDate: { $lt: new Date() }, status: "unpaid" });
};

const overdueInvoices = await Invoice.findOverdue();
console.log(overdueInvoices);
```

Virtuals (Computed Fields)
Virtuals define fields that are not stored in MongoDB but computed dynamically:

```
InvoiceSchema.virtual("isLate").get(function () {
    return this.dueDate < new Date() && this.status !== "paid";
});

const invoice = await Invoice.findOne();
console.log(invoice?.isLate); // Computed but NOT stored in MongoDB
```

To include virtuals in toJSON():
InvoiceSchema.set("toJSON", { virtuals: true });

Middleware (Hooks)
Pre and Post middleware for handling side effects before/after operations.

Pre-save Hook (Before Saving)

```
InvoiceSchema.pre("save", function (next) {
    if (this.amount < 0) {
        throw new Error("Amount cannot be negative");
    }
    next();
});
```

Post-save Hook (After Saving)

```
InvoiceSchema.post("save", function (doc) {
    console.log(`Invoice ${doc._id} saved successfully`);
});
```

Run MongoDB

```bash
docker-compose up -d
```

## Testing Database Connection

### mongosh

```
<!-- connect to 27017, 27018, 27019 individually to see if each is working  -->
mongosh "mongodb://localhost:27017"
db.runCommand({ ping: 1 })
```

```
docker exec -it mongo1 mongosh --host localhost --port 27017 --eval "rs.status()"
```

To check the status of your MongoDB replica set, run this command inside your MongoDB container

```
docker exec -it poc-invoice-system-mongo1-1 mongosh --eval "rs.status()"
```

Test connection string

```
mongosh "mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/?replicaSet=rs0"
```

```
docker exec -it mongo1 mongosh --eval "rs.status()"
```

sudo nano /etc/hosts
127.0.0.1 mongo1
127.0.0.1 mongo2
127.0.0.1 mongo3
