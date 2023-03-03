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

  router.get('/getlocalidad/:cp', async function (req, res, next) {
    const cp = req.params.cp;

    const localidades = [];

    for (let localidad of fileData) {
      if (localidad.codigo_postal.includes(cp)) {
        localidades.push(localidad);
      }
    }

    res.status(200).json(localidades);
  });
};

init();

module.exports = router;
