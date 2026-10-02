// makeNJrailSkedFiles

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
var startdate = "20260901";
var enddate = "20261230";

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
      writeStream.write("NJ_Cal.addService(\"" + lastsvcid + "\", \"" + startdate + "\", \"" + enddate + "\", \"" + adds + "\", \"\");\n");
      adds = row.date;  
      lastsvcid = row.NJSservice_id;
    }
  }
  else
  {
    adds += "," + row.date;   
  }
}




// main

console.log("makeNJrailSkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_NJrail_cal.js');
writeStream.write("// eo_NJrail_cal.js " + d + "\n\n");
writeStream.write("let NJ = new Carrier('NJ');\n");
writeStream.write("Carriers.addCarrier(NJ);\n");
writeStream.write("NJ.stop_prefix = 'NJ';\n");
writeStream.write("NJ.route_prefix = 'NJR';\n");
writeStream.write("NJ.trip_prefix = 'NJT';\n\n");
writeStream.write("let NJ_Cal = new TCalendar();\n");
writeStream.write("NJ.setCalendar(NJ_Cal);\n");
writeStream.write("NJ.setStops(stops_NJ);\n");  // stops defined in eo_trains33.js
writeStream.write("NJ_Cal.lastUpdated = \"" + d + "\";\n\n");
//writeStream.write("Metra_Cal.gtfstz = \"CentralTime\";\n\n");

var csvreader = fs.createReadStream('data/calendar_dates.csv').pipe(csv())
    .on('data', (data) => lineproc3(data))
    .on('end', () => {
    console.log('CSV file successfully processed');
    writeStream.write("NJ_Cal.addService(\"" + lastsvcid + "\", \"" + startdate + "\", \"" + enddate + "\", \"" + adds + "\", \"\");\n");
//    writeStream.write("const SFMTARouteMapMap = [\n");

    writeStream.on('finish', () => {
    console.log('wrote all data to file');
    writeStream.end();
    bRun = false;
    });
  })
  .on('close', () => {
    console.log("reader closed");
//    setTimeout(step2, 1000);
  });

  
