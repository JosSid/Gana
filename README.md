# Gana Backend

Esta Api esta desarrollada para el registro y administración de contratos en una base de datos.

Esta API trabaja en conexion a una base de datos de **mongoDB**.

[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

## Instrucciones para el despliegue :

Para clonar este repositorio ejecuta este comando en la consola de tu ordenador :

```
git clone https://github.com/JosSid/Gana
```

Ve a la carpeta donde hayas clonado el repositorio e instala las dependencias de la aplicacion:

```
npm install
```
Crea un fichero **.env** en el cual pegaremos el contenido del fichero **.env.example**.

**IMPORTANTE**

Asegurate de que en el fichero **.env** este bien la ruta de conexión a tu base de datos.

***
***

### **Antes de arrancar la aplicación inicializaremos la base de datos registrando un contrato tester**
Ejecuta el comando :
```
npm init
```

El script nos lanzará una pregunta a la que deberemos responder en la consola :
```
si
```

Esta acción dejara inicializada la base de datos.

Ten en cuenta que este procedimiento resetea la base de datos dejandola solo con el usuario inicial de test.



**Para arrancar la aplicación en modo producción** :

Ejecuta el comando :
```
npm start
```

**Para arrancar la aplicación en modo desarrollo** :

Ejecuta el comando
```
npm run dev
```

## Rutas

### Metodos GET 

### **Metodo GET para obtener un listado de contratos** :

```
http://localhost:3001/listcontracts
```

Ejemplo de respuesta:

```json
{
	"response": [
		{
			"_id": "6403b76822ffd7259837f193",
			"nombre": "Jose",
			"apellido1": "Garcia",
			"apellido2": "Garcia",
			"documento": "00000000A",
			"codigo_postal": "09003",
			"municipio_nombre": "Burgos",
			"direccion": "calle principal-1",
			"telefono": "623456789",
			"tipo_documento": "nif",
			"creation": "Sat, 04 Mar 2023 21:26:00 GMT",
			"update": "Sat, 04 Mar 2023 21:26:00 GMT"
		},
		{
			"_id": "6403b7b922ffd7259837f194",
			"nombre": "Juan",
			"apellido1": "Garcia",
			"apellido2": "Garcia",
			"documento": "00000000B",
			"codigo_postal": "39003",
			"municipio_nombre": "Santander",
			"direccion": "calle principal-1",
			"telefono": "623456875",
			"tipo_documento": "nif",
			"creation": "Sat, 04 Mar 2023 21:27:21 GMT",
			"update": "Sat, 04 Mar 2023 21:27:21 GMT"
		}
	]
}
```
***
***
### **Metodo GET para obtener un listado con los nombres de la localidad a partir del código postal** :

```
http://localhost:3001/getlocalidad/<código postal>
```
Ejemplo de respuesta:

```json
[
	{
		"codigo_postal": "46001",
		"municipio_id": "46250",
		"municipio_nombre": "Valencia"
	}
]
```
***
***

### Metodos POST

### **Metodo POST para registrar un contrato nuevo en la base de datos** :
```
http://localhost:3001/addcontract
```
Añadiremos un body en formato json en la peticion con los siguientes campos:

```json
{   
    "nombre": "Juan",
	"apellido1": "Garcia",
	"apellido2": "Garcia",
	"documento": "00000000B",
	"codigo_postal": "39003",
	"municipio_nombre": "Santander",
	"direccion": "calle principal-1",
	"telefono": "623456875",
	"tipo_documento": "nif",
}
        
```

Ejemplo de respuesta:

```json
{
	"nombre": "Juan",
	"apellido1": "Garcia",
	"apellido2": "Garcia",
	"documento": "00000000B",
	"codigo_postal": "39003",
	"municipio_nombre": "Santander",
	"direccion": "calle principal-1",
	"telefono": "623456875",
	"tipo_documento": "nif",
	"creation": "Sat, 04 Mar 2023 21:27:21 GMT",
	"update": "Sat, 04 Mar 2023 21:27:21 GMT",
	"_id": "6403b7b922ffd7259837f194"
}
```
***
***

### Metodos PUT

### **Metodo PUT para actualizar un contrato nuevo en la base de datos** :
```
http://localhost:3001/modifycontract/<_id>
```
Añadiremos un body en formato json en la peticion con los campos que deseemos actualizar.

Podremos actualizar cualquiera de los campos del siguiente ejemplo:

```json
{   
    "nombre": "Juan",
	"apellido1": "Garcia",
	"apellido2": "Garcia",
	"documento": "00000000B",
	"codigo_postal": "39003",
	"municipio_nombre": "Santander",
	"direccion": "calle principal-1",
	"telefono": "623456875",
	"tipo_documento": "nif",
}
        
```

Ejemplo de respuesta:

```json
{
	"nombre": "Juan",
	"apellido1": "Garcia",
	"apellido2": "Garcia",
	"documento": "00000000B",
	"codigo_postal": "39003",
	"municipio_nombre": "Santander",
	"direccion": "calle principal-1",
	"telefono": "623456875",
	"tipo_documento": "nif",
	"creation": "Sat, 04 Mar 2023 21:27:21 GMT",
	"update": "Sat, 04 Mar 2023 21:27:21 GMT",
	"_id": "6403b7b922ffd7259837f194"
}
```
***
***
### **Metodo PUT para marcar un contrato para despues borrarlo** :
```
http://localhost:3001/deletecontract/<_id>
```

Se añadira al contrato un nuevo campo con la clave **"deleted"** y el valor **"new Date().toUTCString()"**:


Ejemplo de respuesta:

```json
{
	"_id": "6403b76822ffd7259837f193",
	"nombre": "Jose",
	"apellido1": "Garcia",
	"apellido2": "Garcia",
	"documento": "00000000A",
	"codigo_postal": "09003",
	"municipio_nombre": "Burgos",
	"direccion": "calle principal-1",
	"telefono": "623456789",
	"tipo_documento": "nif",
	"creation": "Sat, 04 Mar 2023 21:26:00 GMT",
	"update": "Sat, 04 Mar 2023 21:26:00 GMT",
	"deleted": "Sat, 04 Mar 2023 22:41:52 GMT"
}
```
***
***

### **Metodo DELETE para eliminar un contrato de la base de datos** :

```
http://localhost:3001/deletecontract/<_id>
```

**Elimina definitivamente un contrato de la base de datos**.

Ejemplo de respuesta:

```json
{
	"lastErrorObject": {
		"n": 1
	},
	"value": {
		"_id": "6403b7b922ffd7259837f194",
		"nombre": "Juan",
		"apellido1": "Garcia",
		"apellido2": "Garcia",
		"documento": "00000000B",
		"codigo_postal": "39003",
		"municipio_nombre": "Santander",
		"direccion": "calle principal-1",
		"telefono": "623456875",
		"tipo_documento": "nif",
		"creation": "Sat, 04 Mar 2023 21:27:21 GMT",
		"update": "Sat, 04 Mar 2023 21:27:21 GMT",
		"deleted": "Sat, 04 Mar 2023 22:32:33 GMT"
	},
	"ok": 1
}
```