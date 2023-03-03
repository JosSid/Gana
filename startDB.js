'use strict';

require('dotenv').config();

const readline = require('readline');

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
  const conexion = await client.connect();
  const continuar = await pregunta(
    'Estas seguro, seguro, seguro, de que quieres borrar toda la base de datos y cargar datos iniciales (si/NO): '
  );
  if (!continuar) {
    process.exit();
  }
  console.log('Connected successfully to server in port', process.env.PORT);
  const db = client.db(dbName);
  const collection = db.collection('contracts');

  const adsFile = require('./baseContracts.json');
  const contratos = adsFile.contratos

  await initContracts(contratos, collection)

  // the following code examples can be pasted here...

  return 'Connected to MongoDB in ganaDB';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

async function initContracts(data, collection) {
  const deleted = await collection.deleteMany();

  console.log(`Eliminados ${deleted.deletedCount} contratos.`);

  let newData = [...data];

  for (let index = 0; index < newData.length; index++) {
    newData[index].creation = new Date().toUTCString();
    newData[index].update = new Date().toUTCString();
  }

  const inserted = await collection.insertMany(newData);

  console.log(`Creados ${inserted.insertedCount} contratos.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    ifc.question(texto, (respuesta) => {
      ifc.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
