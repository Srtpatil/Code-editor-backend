const exec = require("child_process").exec;
const fs = require("fs");
const Languages = require("./Languages");

class Sandbox {
  constructor(folder, path, vm_name, data) {
    this.folder = folder;
    this.path = path;
    this.vm_name = vm_name;
    this.source_code = data.source_code;
    this.language_id = data.language_id;
    this.stdin = data.stdin;
    this.timeout = 15;
    this.compiler_name = Languages[this.language_id]["compiler"];
    this.outputFile = Languages[this.language_id]["output"];
    this.userPath = path + folder;
  }

  WriteFile(srcFile, fileContent) {
    return new Promise((resolve, reject) => {
      fs.writeFile(srcFile, fileContent, (err) => {
        if (err) {
          reject(err);
        }

        resolve(fileContent);
      });
    });
  }

  prepare(res) {
    const srcFile =
      this.userPath + "/" + Languages[this.language_id]["fileName"];
    const inputFile = this.userPath + "/input.txt";

    exec(
      "mkdir " +
        this.userPath +
        "&& cp " +
        this.path +
        "script.sh " +
        this.userPath,
      (err) => {
        if (err) {
          return console.log(err);
        }
        Promise.all([
          this.WriteFile(srcFile, this.source_code),
          this.WriteFile(inputFile, this.stdin),
        ]).then((values) => {
          // console.log("Promise Values -> ", values);

          exec("chmod +x " + this.userPath + "/script.sh", (err) => {
            if (err) {
              return console.log(err);
            }
            // console.log("script made executable");
            this.execute((data1, errData) => {
              res.send({
                output: data1,
                error: errData,
              });
            });
          });
        });
      }
    );
  }

  execute(success) {
    let timer = 0;
    let dockerCommand =
      "docker run -v " +
      this.userPath +
      ":/code/ --rm " +
      this.vm_name +
      " ./script.sh " +
      this.compiler_name +
      " " +
      Languages[this.language_id]["fileName"] +
      " " +
      this.outputFile;
    console.log(dockerCommand);
    exec(dockerCommand, (err) => {
      if (err) {
        return console.log(err);
      }
    });

    //Check For File named "completed" after every 1 second
    let flag = true;
    let id = setInterval(() => {
      timer++;

      fs.readFile(this.userPath + "/completed", "utf8", (err, data) => {

        if (err && timer < this.timeout) {
          return;
        } else if (timer < this.timeout && flag) {
          // console.log("DONE");

          fs.readFile(this.userPath + "/errors", "utf8", (err, errdata) => {
            if (errdata) {
              console.log("errror data -> ", errdata);
            }
            flag = false;
            if (!errdata) {
              errdata = "";
            }
            success(data, errdata);
          });
        }
      });

      if (!flag) {
        exec("rm -r " + this.userPath, (err) => {
          if (err) {
            console.log("error deleting ==> ", err);
          }
        });
        console.log("Clearing INterval");
        clearInterval(id);
      }
    }, 1000);
  }
}

module.exports = Sandbox;
