var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();
//Multer config
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
//----------
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// 'upload' es el middleware de multer configurado anteriormente
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  // 'upfile' es el nombre del campo en el formulario de carga
  const file = req.file;
  // Si no hay archivo, enviar un mensaje de error
  if (!file) {
    return res.status(400).send("No se ha cargado ningún archivo.");
  }
  // Si todo está bien, enviar la información del archivo como respuesta
  res.send({ name: file.originalname, type: file.mimetype, size: file.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
