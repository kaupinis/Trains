// makeSEPTATripsFile

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


async function routesproc()
{
  var routeslength = Routes.length;
  var i = 0;
  for(i = 0; i < routeslength; i++)
  {
    var route_id = Routes[i].route_id;
    var route = Routes[i];
//    if(route_id != "AMR51")
    {
    var cmd = 'grep ' + route_id.substring(4) + ',  data/trips.txt';
    await execShellCommand(cmd).then( (data) => lineproc3(data, route)).catch( (e)=> console.log("40 " + e));
    }
  }
}

async function lineproc3(data, route)
{
  console.log("lineproc3 " + data);
//        writeStream2.write(route_id + ".stop_ids = [\n");
        var a = data.split("\n"); // all trips data for the route
        var b = true;
        var stps = route.stop_ids;
        var i = 0;
  
        var i3 = 0;
        var k = a.length-1;
        for(i3 = 0; i3 < k; i3++) // for each trip
        {
           var d = a[i3].split(",");
           var tid = d[2];
           var cmd5 = 'grep ' + tid + ' data/stop_times.txt';
           await execShellCommand(cmd5).then( (dat) => lineproc5(dat, stps, d, route));
           
        }
}
           
async function lineproc5(dat, stps, d, route)           
{
           var tid = d[2].trim();
//           tid = tid.replace("-", "");
//           tid = tid.substring(0, tid.indexOf("_"));
           var tid2 = tid.slice(0,3) + "_" + tid.slice(3);
//           tid = tid2;
           var sid = d[1].trim();
           var headsign = d[3].trim();
           var shape_id = "SEP_" + d[7].trim();
           var dir = d[5].trim();
           var jj = tid.indexOf("_") + 1;
           var shortname = d[4].trim();
           
           var st = [];
           var k7 = stps.length;
           for(var i7 = 0; i7 < k7; i7++)
           {
             st[i7] = "\"-1\"";   
           }
           var bmultiday = false;
           if(typeof route.multiday !== 'undefined')
           {
             if(route.multiday == true)  bmultiday = true;
           }
           var a5 = dat.split("\n");
           var k5 = a5.length-1;
           var i5 = 0;
           var j5 = 0;
           var s5 = "";
           for(i5 = 0; i5 < k5; i5++)
           {
             var sg = "";
             var dd = a5[i5].split(",");
             var arr = dd[1].trim();
             arr = arr.substring(0, arr.lastIndexOf(":"));
             var dep = dd[2].trim();
             dep = dep.substring(0, dep.lastIndexOf(":"));
             
             
             if(dep == arr) sg = " \"" + dep + "\"";
             else sg += " \"" + arr + "/" + dep + "\"";
             
             var deph = Number(dep.substring(0, dep.indexOf(":")));
             if((deph >= 27) && !bmultiday)
             {
                 bmultiday = true;
//                 console.log("873 deph = " + deph + " AMR" + tid + " " + route.route_id + " " + dep + " " + i5 + " " + a5[i5]);
             }
             var stpn = "SEP_" + dd[3].trim();
             stpn = stpn.replace(/-/g, '');
             var b7 = true;
             var zi = 0;
             while(b7 && zi < k7)
             {
               if(stps[zi].indexOf(stpn) != -1)
               {
                 b7 = false;
                 if(dir == 0) st[zi] = sg;
                 else st[k7 -1 - zi] = sg;
               }
               zi += 1;
             } 
             if(b7)
             {
 //                     console.log("273 trip " + tid + " needs stop " + stpn + " : " + stps[0]); 
 //                     console.log("275 stpn = " + stpn + ", stps[0] = " + stps[0]);
             }
                    
           }
           
           for(i7 = 0; i7 < k7; i7++)
           {
             s5 += st[i7];
             if(i7 < k7-1) s5 += ",";
             j5 += 1;
             if(j5 >= 10)
             {
               s5 += "\n";   
               j5 = 0;
             }
           }

           
//           s = "var ME" + tid + " = new TTrip(\"ME" + tid + "\", \"" + route.route_name + " " + shortname + "\", " + dir + ", \"\");\n";
           s = "let SEPTA_" + tid + " = new TTrip(\"SEPTA_" + tid + "\", \"" + shortname + "\", " + dir + ", \"\");\n";
           s += "SEPTA_" + tid + ".headsign = \"" + headsign + "\";\n";
           s += "SEPTA_" + tid + ".tid = \"" + tid + "\";\n";
           s += "SEPTA_" + tid + ".short = \"" + shortname + "\";\n";
           s += "SEPTA_" + tid + ".service_ids = [\"" + sid + "\"];\n";
           if(shape_id != null)
           {
             s += "SEPTA_" + tid + ".shape_id = \"" + shape_id + "\";\n";   
           }
    /*       if(bmultiday && (route.route_name.indexOf("Connect") == -1)) 
           {
               s += "ME_" + tid + ".multiday = true;\n";
               console.log("920 AMR" + tid + " " + route.route_id);
           }
           */
           s += "SEPTA_" + tid + ".times = [\n";
           writeStream2.write(s);
           writeStream2.write(s5);
                
           writeStream2.write("];\n");
           writeStream2.write(route.route_id + ".addTrip(SEPTA_" + tid + ");\n\n");
        
}


// main

console.log("makeSEPTATripsFile");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var writeStream2 = fs.createWriteStream('eo_SEPTA2.js');
writeStream2.write("// eo_SEPTA2js " + d + "\n\n");
// var routea = [];
routesproc();

    writeStream2.on('finish', () => {
    console.log('wrote all data to file');
    writeStream2.end();
    bRun = false;
    })
  .on('close', () => {
    console.log("reader closed");
  });

