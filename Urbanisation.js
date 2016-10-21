var fs=require('fs');
var readline=require('readline');
var i = 0;
var headers;
var arr=[];
var area;
var state =[];
var rlemitter=readline.createInterface(
    {
        input:fs.createReadStream("data.csv"),
        output:fs.createWriteStream("app.json")
    });

    rlemitter.on("line",function(line)
    {
        if(i == 0)
        {
            headers = line.split(",");
            for(var j=0;j<headers.length;j++)
            {
                if(headers[j]=='Area Name')
                {
                    headers[j]="Area_Name";
                    area = j;
                }
            }
            i=i+1;
        }
        else
        {
            var obj = {};
            currentline = line.split(",");
            if(check_s(state,currentline[area]))
            {
                state.push(currentline[area]);
                obj[headers[area]]=currentline[area];
                obj["Urban+Rural_Population"] = Number(currentline[area+3]);
                arr.push(obj);
            }
        }
    });

    rlemitter.on("close",function(close)
    {
        arr.pop();
        arr.sort(function(a,b)
    {

        return b["Urban+Rural_Population"] - a["Urban+Rural_Population"];
    });
    //console.log(arr);
    var jsonObj = JSON.stringify(arr);
        fs.appendFile('app.json',jsonObj,function(err)
         {
            if(err) throw err;
            console.log("done");
        });
        //console.log(jsonObj);

    });

    function check_s(array,item)
    {
        for(var i=0;i<array.length;i++)
        {
            if(array[i]==item)
            {
                return false;
            }
        }
        return true;
    }
