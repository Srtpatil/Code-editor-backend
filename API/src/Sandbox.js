const fs = require("fs");

const extension = {
  1: "main.cpp",
  2: "main.py",
};

class Sandbox {
  constructor(path, vm_name, data) {
    this.path = path;
    this.vm_name = vm_name;
    this.source_code = data.source_code;
    this.language_id = data.language_id;
    this.stdin = data.stdin;
  }

  prepare() {
    const exec = require("child_process").exec;
    const fs = require("fs");
    const srcFile = this.path + "/" + extension[this.language_id];
    const inputFile = this.path + "/input.txt";
    fs.writeFile(srcFile, this.source_code, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fs.writeFile(inputFile, this.stdin, (err) => {
      if (err) {
        console.log(err);
      }
    });

    exec("chmod +x " + this.path + "/script.sh", (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("Successful");
    });
    // exec("./code/script.sh", (err) => {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log("Successful");
    // });
  }
}

module.exports = Sandbox;
