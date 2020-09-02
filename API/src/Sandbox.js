const exec = require("child_process").exec;
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
    this.timeout = 15;
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
    const srcFile = this.path + "/" + extension[this.language_id];
    const inputFile = this.path + "/input.txt";

    Promise.all([
      this.WriteFile(srcFile, this.source_code),
      this.WriteFile(inputFile, this.stdin),
    ]).then((values) => {
      console.log("Promise Values -> ", values);

      exec("chmod +x " + this.path + "/script.sh", (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("script made executable");
        this.execute((data1, errData) => {
          res.send({
            output: data1,
            error: errData,
          });
        });
      });
    });
  }

  execute(success) {
    let timer = 0;
    let dockerCommand =
      "docker run -v " +
      this.path +
      ":/code/  --rm " +
      this.vm_name +
      " ./script.sh";
    console.log(dockerCommand);
    exec(dockerCommand, (err) => {
      if (err) {
        return console.log(err);
      }
    });
    console.log("------------------------------");
    //Check For File named "completed" after every 1 second
    let flag = true;
    let id = setInterval(() => {
      timer++;

      fs.readFile(this.path + "completed", "utf8", (err, data) => {
        if (err && timer < this.timeout) {
          return;
        } else if (timer < this.timeout && flag) {
          console.log("DONE");

          fs.readFile(this.path + "errors", "utf8", (err, errdata) => {
            console.log("errror data -> ", errdata);
            flag = false;
            if (!errdata) {
              errdata = "";
            }
            success(data, errdata);
          });
        }
      });

      //remove files
      // console.log("------------------------------")
      if (flag) {
        return;
      }

      if (!flag) {
        exec(
          "find " + this.path + " -type f -not -name 'script.sh' -delete",
          (err) => {
            console.log("error deleting ==> ", err);
          }
        );
        console.log("Clearing INterval");
        clearInterval(id);
      }
    }, 1000);
  }
}

module.exports = Sandbox;
