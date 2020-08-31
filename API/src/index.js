const express = require("express");
const { exec } = require("child_process");
const Sandbox = require("./Sandbox");

const fs = require("fs");
const app = express();

app.use(express.json());

app.post("/compile", (req, res) => {
  const vm_name = "virtual_machine";
  const data = req.body;
  const path = __dirname + "/code/";
  const sandbox = new Sandbox(path, vm_name, data);
  sandbox.prepare();
  sandbox.execute((data1, errData) => 
  {
    res.send({
      output : data1,
      error : errData
    })
  })
});

const port = 3000;
app.listen(port, () => {
  console.log(__dirname);
  console.log("Server is up on port ", port);
});
