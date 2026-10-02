// makeSFMTA2Routes.js


const lineReader = require('line-reader');
const lineByLine = require('n-readlines');
const fs = require('fs');
const csv = require('csv-parser');
const { exec } = require('child_process');
const date = require('date-and-time');


function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
//        console.warn("here2 " + error);
        reject(error);
      } else if (stdout) {
//        console.log("here3 " + stdout); 
      } else {
        console.log("here:" + stderr);
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

function titlecase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}




async function routesproc()
{
  var map = LAMBRouteMap;
  var k = map.length;
  var i = 0;
  for(i=0; i<k; i+=3)
  {
    var rname = "LAMB" + map[i+1];
    rname = rname.replace("/","_");
    var routem = map[i];
//    var desc = "SF Muni Bus " + map[i].substring(3) + " " + titlecase(map[i+2]);
//    var desc =  titlecase(map[i+2]);
    var desc = map[i+2];

     writeStream.write("\nvar " + rname + " = new TRoute(\"" + rname + "\", \"" + desc + "\");\n");
     writeStream.write(rname + ".cal = LAMB_Cal;\n");
     writeStream.write(rname + ".routem = \"" + routem + "\";\n");
     var cmd5 = 'grep -m 50 LAMB_' + routem + ", data/trips2.csv";
     try{
       await execShellCommand(cmd5).then( (dat) => lineproc1(dat, rname));
     }
     catch(e){ console.log(e)};
     
     
     
     writeStream.write("addRouteToService(" + rname + ");\n");
  }
}

async function lineproc1(dat, rname)
{
    var a1 = dat.split("\n");
    var k1 = a1.length-1;
    var i1 = 0;
    var tid = "";
    var bd0 = false;
    var bd1 = false;
    var zz = -1;
    var jj = 0;
    for(jj = 0; jj < 2; jj++)
    {
      var b1 = true;
      while(b1 && (i1 < k1))
      {
        var dd = a1[i1].split(",");
        if((dd[4] == 0) && (!bd0)) 
        {
          b1 = false;
          bd0 = true;
          tid = dd[2];
          zz = 0;
        }
        else if((dd[4] == 1) && (!bd1)) 
        {
          b1 = false;
          bd1 = true;
          tid = dd[2];
          zz = 1;
        }
//        else if((dd[5] == 1) || (dd[5] == 0)) ;
//        else console.log("143 dd[4] = " + dd[4]);
        i1 += 1;
      }
      if(!b1 && (tid != ""))
      {
        var cmd1 = 'grep ' + tid + ", data/stop_times.txt";
        try{
         await execShellCommand(cmd1).then( (dat2) => lineproc2(dat2, rname, zz));
        }
        catch(e){ console.log(e)};
      }
    }
}

async function lineproc2(dat2,rname, jj)
{
  var a2 = dat2.split("\n");
  var k2 = a2.length-1;
  var i2 = 0;
  var s = "";
    j = -1;
    for(i2 = 0; i2 < k2; i2++)
    {
      var dd = a2[i2].split(",");
      if(i2 != 0) s += ", ";
      j += 1;
      if(j > 9)
      {
        s += "\n";
        j = 0;
      }
      s += "\"LAMB" + dd[3] + "\"";
    }
    writeStream.write(rname + ".stop_ids" + jj + " = [\n" + s + "];\n");
}


// main

console.log("makeLAMetroBusRoutes");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var writeStream = fs.createWriteStream('eo_LAMetroBusRoutes.js');
writeStream.write("// eo_LAMetroBusRoutes.js " + d + "\n\n");

routesproc();






