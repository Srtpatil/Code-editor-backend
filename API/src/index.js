const express = require("express");
require("./db/mongoose.js");
const Sandbox = require("./Sandbox");
const random = require("./utils/utils");
const fileRouter = require("./db/routers/File");
const embeddedRouter = require('./db/routers/Embedded')
const app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use(express.json());
app.use(fileRouter);
app.use(embeddedRouter);

app.set('view engine', 'hbs');

app.post("/compile", (req, res) => {
  const vm_name = "virtual_machine";
  const data = req.body;
  const folder = random(10);
  const path = __dirname + "/code/";
  console.log("dta", data);
  const sandbox = new Sandbox(folder, path, vm_name, data);
  sandbox.prepare(res);
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is up on port ", port);
});
