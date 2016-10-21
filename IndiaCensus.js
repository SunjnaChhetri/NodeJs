    var fs = require('fs');
    var rl =require('readline');
    var arr=[];
    var head = true;
    var key;
    var array=[];
    var rlemitter = rl.createInterface(
    {
     input:fs.createReadStream("data.csv"),
     output:fs.createWriteStream("education.json")
    });

    rlemitter.on('line',function(line)
    {

     if(head)
     {
       key = line.split(",");
       head = false;
        for(var i=0;i<key.length;i++)
       {
         if(key[i].indexOf("Educational level")>-1&&key[i].indexOf("Persons")>-1)
         {
           array.push(i);
         }
       }
     }
     else {
        var data = line.split(",");
       if(data[5]=="All ages"&&data[4]=="Total")
       {
         for(var i=0;i<array.length;i++)
         {
           if(arr.length>i)
           {
             var k = Object.keys(arr[i]);
             arr[i][k[1]] += Number(data[array[i]]);
           }
           else {
             var obj = {};
             obj["educat"]= generate(key[array[i]]);
             obj["catPopulation"] = Number(data[array[i]]);
             arr.push(obj);
           }

         }
       }
      }

    });
    rlemitter.on("close", function(close){

     fs.appendFile("education.json",JSON.stringify(arr),function(err){
       if(err) throw err;
       console.log("File1 Written Successfully");
    });

    });
    function generate(str)
    {
     str = str.substring(str.indexOf("-")+1,str.lastIndexOf("-"));
     return str.trim();
    }
