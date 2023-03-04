const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const connection = require('../lib/mongoClient');
const fileData = require('../lib/readFile');

const init = async () => {
  const db = await connection(); // obtenemos la conexión

  console.log(`Connected to DB in ${db.databaseName}DB`);

  /* GET home page. */
  router.get('/listcontracts', async function (req, res, next) {
    try {
      const response = await db.collection('contracts').find({}).toArray();
      res.status(200).json({ response });
    } catch (error) {
      next(createError(500, 'Contracts are not available in this moment'));
    }
  });

  router.get('/getlocalidad/:cp', function (req, res, next) {
    const cp = req.params.cp;

    const localidades = fileData.filter((localidad) =>
      localidad.codigo_postal.includes(cp)
    );

    res.status(200).json(localidades);
  });

  router.post('/addcontract', async function (req, res, next) {
    try {

      const collection = await db.collection('contracts');
      let newDocument = req.body;
      newDocument.creation = new Date().toUTCString();
      newDocument.update = new Date().toUTCString();
      let result = await collection.insertOne(newDocument);

      console.log(result)

      res.status(200).json(newDocument);
    } catch (error) {
      next(error);
    }

  });
};

init();

module.exports = router;
