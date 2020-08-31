class Sandbox
{
    constructor(folderPath, data, vm_name)
    {
        this.folderPath = folderPath;
        this.data = data;
        this.vm_name = vm_name;
    }

    prepare() 
    {

    }

    execute(success)
    {
        const fs = require('fs');
        let timer = 0;
        let dockerCommand = "docker run -v " + this.folderPath + ":/code/ -it " + this.vm_name + " ./script.sh";
        console.log(dockerCommand);

        console.log("------------------------------")
        //Check For File named "completed" after every 1 second
        let id = setInterval(() => 
        {
            timer++;
            fs.readFile(this.folderPath + "/completed", "utf8", (err, data) => 
            {
                
                if(err && timer < 10)
                {
                    return;
                }
                else if(timer < 10)
                {
                    console.log("DONE")

                    fs.readFile(this.folderPath + "/errors", 'utf8', (err, errdata) => 
                    {
                        if(!errdata)
                        {
                            errdata = "";
                        }
                        success(data, errdata);

                    })
                }
            })

            //remove files
            console.log("Removing User Files");
            console.log("------------------------------")
            //exec("rm " + this.folderPath + this.filename);
            //exec("rm " + this.folderPath + "completed");
            //exec("rm " + this.folderPath + "errors");
            //exec("rm " + this.folderPath + "input.txt");
            //exec("rm -v !(" + this.folderPath + "script.sh)");
            clearInterval(id);
        }, 1000);
    }
};



module.exports = Sandbox;