const express = require("express");
const { exec } = require('child_process');
const mkdirp = require('mkdirp')
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post("/compile", (req, res) => {

  const data = req.body;
  console.log(data);

  mkdirp("./code/usercode").then((_) => 
  {
    fs.writeFile("./code/usercode/file.cpp", data.source_code, (err) => 
    {
    });
  })

  
  //remove usercode folder

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
