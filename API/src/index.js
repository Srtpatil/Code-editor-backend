const express = require("express");
const Sandbox = require("./Sandbox");

const app = express();

app.use(express.json());

app.post("/compile", (req, res) => {
  const vm_name = "virtual_machine";
  const data = req.body;
  const path = __dirname + "/code/";
  const sandbox = new Sandbox(path, vm_name, data);
  sandbox.prepare(res);
  
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is up on port ", port);
});
