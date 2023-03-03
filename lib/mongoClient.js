const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(url);

// Database Name
const dbName = 'gana';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server in port', process.env.PORT);
  const db = client.db(dbName);
  const collection = db.collection('contracts');

  // the following code examples can be pasted here...

  return collection, 'Connected to MongoDB in ganaDB';
}

const connectionDB = main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

module.exports = connectionDB;