const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_CONNECTION_STRING;

// Database Name
const dbName = 'gana';

const client = new MongoClient(url, {
  useUnifiedTopology: true
});

module.exports = async () => {
  // Conectamos al servidor
  await client.connect();

  console.log('Connected successfully to server in port', process.env.PORT || '3001');

  

  return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
};