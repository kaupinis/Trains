//makeAMTRAKRoutes.js

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

async function getAgencies()
{
  var cmd = 'grep ,  data/agency.txt';
  await execShellCommand(cmd).then( (data) => lineproc3(data));
}

let agencies = [];

function getAgencyName(id)
{
  var b = true;
  var i = 0;
  var k = agencies.length;
  var r = "";
  while(b && (i < k))
  {
    if(id == agencies[i])
    {
      b = false;
      r = agencies[i+1];
    }
    i += 2;
  }
  return(r);
}

async function lineproc3(data)
{
  var a = data.split("\n"); // all trips data for the route
  writeStream.write("var agencies = [\n");
  var i3 = 0;
  var k3 = a.length-1;
  for(i3 = 0; i3 < k3; i3++) // for each agency
  {
    if(i3 != 0)
    {
      var d = a[i3].split(",");
      var agency_id = d[0];
      var agency_name = d[1];
      agencies.push(agency_id);
      agencies.push(agency_name);
      var s = "";
      if(i3 != 1) s += ",\n";
      s += "\"" + agency_id + "\", \"" + agency_name + "\"";
      writeStream.write(s);
    }  
  }
  writeStream.write("\n];\n\n");
}

function lineproc1(row)
{
  var route_id = row.AMRroute_id;
  var agency_id = row.agency_id;
  var route_name = row.route_long_name;
  if(route_name.indexOf("Amtrak Thruway Connecting Service") != -1)
  {
    route_name += " - " + getAgencyName(agency_id);    
  }
  if(agency_id == "1230") route_name += " - Shore Line East"; 
  if(agency_id == "1238") route_name += " - MARC";
  writeStream.write("var " + route_id + " = new TRoute(\"" + route_id + "\", \"" + route_name + "\");\n");
  writeStream.write(route_id + ".cal = AM_Cal;\n");
  writeStream.write("AMR.addRouteToService(" + route_id + ");\n\n");
}


// main

console.log("makeAMTRAKRoutesFile");
 var now = new Date();
 var d = date.format(now, 'hh:mm A MMM DD YYYY');

 var writeStream = fs.createWriteStream('eo_AMTRAK_Routes.js');
writeStream.write("// eo_AMTRAK_Routes.js " + d + "\n\n");
getAgencies();

var csvreader = fs.createReadStream('data/routes.csv').pipe(csv())
    .on('data', (data) => lineproc1(data))
    .on('end', () => {
    console.log('CSV file successfully processed');
//    writeStream.write("const SFMTARouteMapMap = [\n");

    writeStream.on('finish', () => {
    console.log('wrote all data to file');
    writeStream.end();
    bRun = false;
    });
  })
  .on('close', () => {
    console.log("reader closed");
  });

  
