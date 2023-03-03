const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const connection = require('../lib/mongoClient');

const init = async () => {
  const db = await connection(); // obtenemos la conexión

  console.log(`Connected to DB in ${db.databaseName}DB`)

  /* GET home page. */
  router.get('/', async function (req, res, next) {
    try {
      const response = await db.collection('contracts').find({}).toArray();
      res.json({ response });
    } catch (error) {
      next(createError(500, "Contracts are not available in this moment"));
    }
  });
};

init();

module.exports = router;
