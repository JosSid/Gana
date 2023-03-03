//convertir CSV a Excel usando Node.js
var XLSX = require('xlsx');

const path = require('path');

const pathFileSecond = `\\public\\excel\\cp-municipios.xlsx`;

const pathFileFirst = __dirname.split('\\lib');

const root = path.join(`${pathFileFirst[0]}${pathFileSecond}`);

const ExcelAJSON = () => {
  const excel = XLSX.readFile(
    root
  );
  var nombreHoja = excel.SheetNames; // regresa un array
  let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

  //console.log(datos)

  const jDatos = [];
  for (let i = 0; i < datos.length; i++) {
    const dato = datos[i];
    const cp = dato.codigo_postal.toString().length;
    const id = dato.municipio_id.toString().length;

    let newCp = dato.codigo_postal.toString();
    let newId = dato.municipio_id.toString();

    if (id === 4) {
      newId = `0${dato.municipio_id}`;
    }

    if (cp === 4) {
      newCp = `0${dato.codigo_postal}`;
    }

    if (cp === 3) {
      newCp = `00${dato.codigo_postal}`;
    }

    if (cp === 2) {
      newCp = `000${dato.codigo_postal}`;
    }

    if (cp === 1) {
      newCp = `0000${dato.codigo_postal}`;
    }

    jDatos.push({
      ...dato,
      codigo_postal: newCp,
      municipio_id: newId,
    });
  }
  return jDatos;
};

module.exports = ExcelAJSON();
