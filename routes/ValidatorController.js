'use strict';

const { body } = require('express-validator');

class ValidatorController {
  validation() {
    return [
      body('nombre')
        .exists()
        .isString()
        .isLength({min: 1})
        .withMessage('Introduzca un nombre correcto'),
      body('apellido1')
        .isString()
        .withMessage('Introduzca un apellido correcto'),
      body('apellido2')
        .isString()
        .withMessage('Introduzca un apellido correcto'),
      body('tipo_documento')
        .exists()
        .custom((value) => {
          return value === 'cif' || value === 'nif' || value === 'nie';
        })
        .withMessage('Introduzca un tipo de documento correcto'),
      body('documento')
        .exists()
        .matches(/^([0-9]{8}[A-Z])|[XYZ][0-9]{7}[A-Z]$/)
        .withMessage('Introduzca un número de documento correcto'),
      body('codigo_postal')
        .exists()
        .matches(/(^([0-9]{5,5})|^)$/)
        .isLength({min:5})
        .withMessage('Introduzca un codigo postal correcto'),
      body('municipio_nombre')
        .isString()
        .withMessage('Introduzca una localidad correcta'),
      body('direccion')
        .isString()
        .withMessage('Introduzca una direccion correcta'),
      body('telefono')
        .exists()
        .isNumeric()
        .custom((value) => {
          return value.length === 9 && parseInt(value[0]) > 5;
        })
        .withMessage('Introduzca un telefono correcto'),
    ];
  }

  updateValidation() {
    return [
      body('nombre')
        .if(body('nombre').exists())
        .isAlpha()
        .withMessage('Introduzca un nombre correcto'),
      body('apellido1')
        .if(body('apellido1').exists())
        .isAlpha()
        .withMessage('Introduzca un apellido correcto'),
      body('apellido2')
        .if(body('apellido2').exists())
        .isAlpha()
        .withMessage('Introduzca un apellido correcto'),
      body('tipo_documento')
        .if(body('tipo_documento').exists())
        .custom((value) => {
          return value === 'cif' || value === 'nif' || value === 'nie';
        })
        .withMessage('Introduzca un tipo de documento correcto'),
      body('documento')
        .if(body('documento').exists())
        .matches(/^([0-9]{8}[A-Z])|[XYZ][0-9]{7}[A-Z]$/)
        .withMessage('Introduzca un tipo de documento correcto'),
      body('codigo_postal')
        .if(body('codigo_postal').exists())
        .matches(/(^([0-9]{5,5})|^)$/)
        .withMessage('Introduzca un codigo postal correcto'),
      body('municipio_nombre')
        .if(body('municipio_nombre').exists())
        .isString()
        .withMessage('Introduzca una localidad correcta'),
      body('direccion')
        .if(body('direccion').exists())  
        .isString()
        .withMessage('Introduzca una direccion correcta'),
      body('telefono')
        .if(body('telefono').exists())
        .isNumeric()
        .custom((value) => {
          return value.length === 9 && parseInt(value[0]) > 5;
        })
        .withMessage('Introduzca un telefono correcto'),
    ];
  }
}

module.exports = ValidatorController;
