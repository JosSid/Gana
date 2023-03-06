const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const connection = require('../lib/mongoClient');
const fileData = require('../lib/readFile');
const ObjectID = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');
const ValidationController = require('./ValidatorController');

const init = async () => {
  const db = await connection(); // obtenemos la conexión

  console.log(`Connected to DB in ${db.databaseName}DB`);

  /* GET home page. */
  router.get('/listcontracts', async function (req, res, next) {
    try {
      const response = await (
        await db.collection('contracts').find({}).toArray()
      ).reverse();
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

  const validator = new ValidationController();
  router.post(
    '/addcontract',
    validator.validation(),
    async function (req, res, next) {
      const errors = validationResult(req);

      if (errors.errors.length > 0) {
        res.status(400).json(errors.errors[0]);
      } else {
        try {
          const collection = await db.collection('contracts');
          const newDocument = req.body;
          newDocument.creation = new Date().toUTCString();
          newDocument.update = new Date().toUTCString();
          const result = await collection.insertOne(newDocument);

          res.status(200).json(newDocument);
        } catch (error) {
          next(error);
        }
      }
    }
  );

  router.put(
    '/modifycontract/:id',
    validator.updateValidation(),
    async (req, res, next) => {
      const errors = validationResult(req);

      if (errors.errors.length > 0) {
        res.status(400).json(errors.errors[0]);
      } else {
        const body = req.body;

        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
          return next(createError(400, 'ID no válido'));
        }

        const objectId = new ObjectID(req.params.id);

        try {
          const collection = await db.collection('contracts');

          const update = await collection.findOne({ _id: objectId });

          const updateBody = {
            nombre: body.nombre ? `${body.nombre}` : `${update.nombre}`,
            apellido1: body.apellido1
              ? `${body.apellido1}`
              : `${update.apellido1}`,
            apellido2: body.apellido2
              ? `${body.apellido2}`
              : `${update.apellido2}`,
            tipo_documento: body.tipo_documento
              ? `${body.tipo_documento}`
              : `${update.tipo_documento}`,
            documento: body.documento
              ? `${body.documento}`
              : `${update.documento}`,
            codigo_postal: body.codigo_postal
              ? `${body.codigo_postal}`
              : `${update.codigo_postal}`,
            municipio_nombre: body.municipio_nombre
              ? `${body.municipio_nombre}`
              : `${update.municipio_nombre}`,
            direccion: body.direccion
              ? `${body.direccion}`
              : `${update.direccion}`,
            telefono: body.telefono ? `${body.telefono}` : `${update.telefono}`,
            creation: `${update.creation}`,
            update: new Date().toUTCString(),
          };

          const result = await collection.findOneAndReplace(
            { _id: objectId },
            updateBody
          );

          const data = {
            objectId,
            ...updateBody,
          };

          res.status(200).json(data);
        } catch (error) {
          next(error);
        }
      }
    }
  );

  router.put('/deletecontract/:id', async (req, res, next) => {
    const body = req.body;

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return next(createError(400, 'ID no válido'));
    }

    const objectId = new ObjectID(req.params.id);

    try {
      const collection = await db.collection('contracts');

      const update = await collection.findOne({ _id: objectId });

      const updateBody = {
        ...update,
        deleted: new Date().toUTCString(),
      };

      const result = await collection.findOneAndReplace(
        { _id: objectId },
        updateBody
      );

      res.status(200).json(updateBody);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/deletecontract/:id', async function (req, res, next) {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return next(createError(400, 'ID no válido'));
    }

    const objectId = new ObjectID(req.params.id);

    try {
      const collection = await db.collection('contracts');

      const deleteContract = await collection.findOneAndDelete({
        _id: objectId,
      });

      res.status(200).json(deleteContract);
    } catch (error) {
      next(error);
    }
  });
};

init();

module.exports = router;
