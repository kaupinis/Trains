// makeLIRRSkedFiles

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
var enddate = "20260831";
const BASIC_ENDDATE = "20260831";
let edate = 0;

function lineproc3(row)
{
  if(row.service_id == "service_id") ;
  else if(row.service_id != lastsvcid)
  {
    if(lastsvcid == "") // first entry
    {
       if(row.exception_type == 1) adds = row.date;
//       else if(row.exception_type == 2)dels = row.date;  // this willnever happen
       lastsvcid = row.service_id;
    }
    else
    {
      writeStream.write("LI_Cal.addService(\"" + lastsvcid + "\", \"0\", \"" + enddate + "\", \"" + adds + "\", \"\");\n");
      adds = row.date;  
      lastsvcid = row.service_id;
    }
    enddate = BASIC_ENDDATE;
  }
  else
  {
    if(Number(row.date) > Number(enddate)) enddate = row.date;
    adds += "," + row.date;   
  }
  if(Number(row.date) > Number(edate)) edate = row.date;
 
}




// main

console.log("makeLIRRSkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_LIRR_cal.js');
writeStream.write("// eo_LI_cal.js " + d + "\n\n");
writeStream.write("let LIRR = new Carrier('LIRR');\n");
writeStream.write("Carriers.addCarrier(LIRR);\n");
writeStream.write("LIRR.stop_prefix = 'LI';\n");
writeStream.write("LIRR.route_prefix = 'LIRR';\n");
writeStream.write("LIRR.trip_prefix = 'LI';\n\n");
writeStream.write("let LI_Cal = new TCalendar();\n");
writeStream.write("LIRR.setCalendar(LI_Cal);\n\n");
writeStream.write("LIRR.setStops(stops_LI);\n\n");  // stops defined in eo_trains33.js
writeStream.write("LI_Cal.lastUpdated = \"" + d + "\";\n\n");
//writeStream.write("Metra_Cal.gtfstz = \"CentralTime\";\n\n");

var csvreader = fs.createReadStream('data/calendar_dates.csv').pipe(csv())
    .on('data', (data) => lineproc3(data))
    .on('end', () => {
    console.log('CSV file successfully processed');
    writeStream.write("LI_Cal.addService(\"" + lastsvcid + "\", \"0\", \"" + enddate + "\", \"" + adds + "\", \"\");\n");
//    writeStream.write("const SFMTARouteMapMap = [\n");
   writeStream.write("\nLI_Cal.expires = \"" + edate + "\";\n\n");  

    writeStream.on('finish', () => {
//   writeStream.write("\nLI_Cal.expires = \"" + edate + "\";\n\n");  
    console.log('wrote all data to file');
    writeStream.end();
    bRun = false;
    });
  })
  .on('close', () => {
    console.log("reader closed");
//    setTimeout(step2, 1000);
  });

  
