const exec = require("child_process").exec;
const fs = require("fs");
const { error } = require("console");

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
      console.log("script made executable");
    });
    // exec("./code/script.sh", (err) => {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log("Successful");
    // });
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
    let id = setInterval(() =>
    {
        timer++;
       
        fs.readFile(this.path + "completed", "utf8", (err, data) =>
        {

            if(err && timer < 10)
            {
                return;
            }
            else if(timer < 10 && flag)
            {
                console.log("DONE")
                
                fs.readFile(this.path + "errors", 'utf8', (err, errdata) =>
                {
                    console.log("errror data -> ", errdata)
                    if(!errdata)
                    {
                        errdata = "";
                    }

                    flag = false;
                    success(data, errdata);

                })
            }
        })

        //remove files
        // console.log("------------------------------")

        if(!flag)
        {
            exec("find " + this.path + " -type f -not -name 'script.sh' -delete", (err) => 
            {
                console.log("error deleting ==> ", err);
            })
            console.log("Clearing INterval");
            clearInterval(id);
        }
    }, 1000);
  }
}

module.exports = Sandbox;
