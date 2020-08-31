const express = require("express");
const { exec } = require("child_process");
const Sandbox = require("./Sandbox");

const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

const srcDirectory = __dirname;
const vm_name = "virtual_machine";

app.post("/compile", (req, res) => {
  const data = req.body;
  console.log(data);

  fs.writeFile(srcDirectory + "/code/file.cpp", data.source_code, (err) => {});

  fs.writeFile(srcDirectory + "/code/input.txt", data.stdin, (err) => {});

  const workDir = srcDirectory + "/code/";

  const sandbox = new Sandbox(workDir, data, vm_name);
  sandbox.execute((data, errData) => {
    res.send({
      output: data,
      error: errData,
    });
  });

  //remove usercode

  // setTimeout(() =>
  // {
  //   exec("rm -r ./code/usercode", (err, stdout, stderr) =>
  //   {
  //       console.log("deleting");
  //   })
  // }, 3000)

  res.send("index.js");
});

app.listen(port, () => {
  console.log("Server is up on port ", port);
});
