// makeNJbusSkedFiles

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


var lastsvcid = "";
var adds = "";
var enddate = "20270313";

function lineproc3(row)
{
  if(row.NJSservice_id != lastsvcid)
  {
    if(lastsvcid == "") // first entry
    {
       if(row.exception_type == 1) adds = row.date;
//       else if(row.exception_type == 2)dels = row.date;  // this willnever happen
       lastsvcid = row.NJSservice_id;
    }
    else
    {
      writeStream.write("NJB_Cal.addService(\"" + lastsvcid + "\", \"0\", \"" + enddate + "\", \"" + adds + "\", \"\");\n");
      adds = row.date;  
      lastsvcid = row.NJSservice_id;
    }
  }
  else
  {
    adds += "," + row.date;   
  }
}

async function lineproc2(row)
{
  var routeid = row.route_id;
  var rln = row.route_long_name;
  var rsn = row.route_short_name;
  routea.push(routeid.toString());
  routea.push(rsn.toString());
//  routea.push(rln.toString());
  
}

function step2()
{
   writeStream.write("\nconst NJrouteIdMap = [\n");
   var csvreader2 = fs.createReadStream('data/routes.txt').pipe(csv())
    .on('data', (data) => lineproc2(data))
    .on('end', () => {
    console.log('CSV file successfully processed');
    var k = routea.length;
    var i = 0;
    for(i = 0; i < k; i += 2)
    {
      if(i != 0) writeStream.write("\",\n");
      writeStream.write("\"" + routea[i] + "\", \"" + routea[i+1]);  
    }
    writeStream.write("\"\n];\n\n");
    for(i = 0; i < k; i += 2)
    {
      let rid = "Y" + routea[i+1];
      writeStream.write("let " + rid + " = new TRoute(\"" + rid + "\", \"NJ Bus " +  routea[i+1] + "\");\n");
      writeStream.write(rid + ".cal = NJB_Cal;\n");
      writeStream.write(rid + ".routem = \"" + routea[i] + "\";\n");
      writeStream.write("addRouteToService(" + rid + ");\n\n");
    }
    });
}



// main

console.log("makeNJbusSkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_NJBus_cal.js');
writeStream.write("// eo_NJBus_cal.js " + d + "\n\n");
writeStream.write("let NJBUS = new Carrier('NJBUS');\n");
writeStream.write("Carriers.addCarrier(NJBUS);\n");
writeStream.write("NJBUS.stop_prefix = 'NZ';\n");
writeStream.write("NJBUS.route_prefix = 'Y';\n");
writeStream.write("NJBUS.trip_prefix = 'NJB';\n\n");
writeStream.write("let NJB_Cal = new TCalendar();\n");
writeStream.write("NJBUS.setCalendar(NJB_Cal);\n");
writeStream.write("NJB_Cal.lastUpdated = \"" + d + "\";\n\n");
//writeStream.write("Metra_Cal.gtfstz = \"CentralTime\";\n\n");

var csvreader = fs.createReadStream('data/calendar_dates.csv').pipe(csv())
    .on('data', (data) => lineproc3(data))
    .on('end', () => {
    console.log('CSV file successfully processed');
    writeStream.write("NJB_Cal.addService(\"" + lastsvcid + "\", \"0\", \"" + enddate + "\", \"" + adds + "\", \"\");\n");
//    writeStream.write("const SFMTARouteMapMap = [\n");

    writeStream.on('finish', () => {
    console.log('wrote all data to file');
    writeStream.end();
    bRun = false;
    });
  })
  .on('close', () => {
    console.log("reader closed");
    setTimeout(step2, 1000);
  });

  
