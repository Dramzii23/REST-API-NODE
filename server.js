// API REST con Express

//INICIALIZAR MI EXPRESS BODY PARSER Y CORS
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//CONFIGURAR EXPRESS COMO APP
const app = express();
app.use(cors());
app.use(bodyParser.json());

const puerto = 3001;

//CREAR UN ENDPOINT
app.get("/api/hola", (req, res) => {
  res.send("Hola Mundo");
});

app.get("/api/nombre", (req, res) => {
  res.send("Roberto Aguirre");
});

app.get("/api/suma/:n1/:n2", (req, res) => {
  let numero1 = req.params.n1;
  let numero2 = req.params.n2;
  let suma = Number(numero1) + Number(numero2);
  res.send("La suma es: " + suma);
});

app.get("/api/resta/:n1/:n2", (req, res) => {
  let numero1 = req.params.n1;
  let numero2 = req.params.n2;
  let resta = Number(numero1) - Number(numero2);
  res.send("La suma es: " + resta);
});
app.post("/api/resta/:n1/:n2", (req, res) => {
  let numero1 = req.params.n1;
  let numero2 = req.params.n2;
  let resta = Number(numero1) - Number(numero2);
  res.send("La resta con post es: " + resta);
});

app.post("/api/nuevousuario", (req, res) => {
  let cuerpoRequest = req.body;

  let nombre = cuerpoRequest.nombre;
  let apellido = cuerpoRequest.apellido;
  let telefono = cuerpoRequest.telefono;
  let content = cuerpoRequest.content;

  let respuesta = `Nombre: ${nombre}, Apellido: ${apellido}, Telefono: ${telefono}, Body: ${content}`;

  res.send(respuesta);
});

app.post("/api/sumar", (req, res) => {
  let cuerpoRequest = req.body;
  let numero1 = cuerpoRequest.numero1;
  let numero2 = cuerpoRequest.numero2;
  let suma = Number(numero1) + Number(numero2);

  res.send("La suma es: " + suma);
});

app.put("/api/actualizarusuario", (req, res) => {
  let cuerpoRequest = req.body;
  let nombre = cuerpoRequest.nombre;

  res.send("Usuario actualizado" + nombre);
});
app.delete("/api/eliminarusuario", (req, res) => {
  let cuerpoRequest = req.body;
  let nombre = cuerpoRequest.nombre;

  res.send("Usuario eliminado" + nombre);
});

//// CRUD (Create, Read, Update, Delete)

let items = [];
let id = 1;

app.get("/api/traeritems", (req, res) => {
  res.json(items);
});

app.post("/api/agregaritem", (req, res) => {
  let cuerpoRequest = req.body;

  const newItem = {
    id: id++,
    descripcion: cuerpoRequest.descripcion,
    precio: cuerpoRequest.precio,
  };

  items.push(newItem);
  res.json(newItem);
});

// si la variable viene en el URL se usa: params
// put es para actualizar

app.put("/api/actualizaritem/:idenvio", (req, res) => {
  let idenvio = req.params.idenvio;
  let cuerpoRequest = req.body;
  let item = items.find((item) => item.id == idenvio);
  if (item) {
    item.descripcion = cuerpoRequest.descripcion;
    item.precio = cuerpoRequest.precio;
    res.json(item);
  } else {
    res.status(404).send("No se encontro el item" + idenvio);
  }
});

app.delete("/api/borraritem/:idenvio", (req, res) => {
  let idenvio = req.params.idenvio;
  items = items.filter((item) => item.id != idenvio);
  res.json({ mensaje: "Se borro el item" + idenvio });
});

app.listen(puerto, () => {
  console.log("Servidor escuchando en el puerto: " + puerto);
});
