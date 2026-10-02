// makeSFMTASkedFiles

const lineReader = require('line-reader');
const lineByLine = require('n-readlines');
const fs = require('fs');
const csv = require('csv-parser');
const { exec } = require('child_process');
const date = require('date-and-time');

var startdate = Number(process.argv[2]);
var enddate =   Number(process.argv[3]);
var calendars = [];

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


async function lineproc1(row)
{
  var svcid = row.service_id;
  var sdate = Number(row.start_date);
  var edate = Number(row.end_date);
  var days = "";
  if(row.sunday == 1) days += "0";
  if(row.monday == 1) days += "1";
  if(row.tuesday == 1) days += "2";
  if(row.wednesday == 1) days += "3";
  if(row.thursday == 1) days += "4";
  if(row.friday == 1) days += "5";
  if(row.saturday == 1) days += "6";
  var adds = "";
  var dels = "";
  if((sdate <= enddate) && (edate >= startdate))
  {
  var cmd = 'grep \"' + svcid + '\" data/calendar_dates.csv';
  await execShellCommand(cmd).then( (data) => {
        var a = data.split("\n");
        var k = a.length-1;
        var i = 0;
        while(i < k)
        {
          var b = a[i].split(",");
 //         console.log(svcid + " " + b[0] + " " + b[1] + " " + b[2] + " k= " + k + " i= " + i);
          if(b[0] == svcid)
          {
            if(b[2] == 1)
            {
              var x = Number(b[1]);
              if((x >= startdate) && (x <= enddate))
              {
                if(adds == "") adds = b[1];
                else adds += "," + b[1];
              }
            }
            else if(b[2] == 2)
            {
              if(dels == "") dels = b[1];
              else dels += "," + b[1];
            }
          }
          i += 1;
        }
     
  }).catch( function(e) {
//      console.log(e);
  });
    
  writeStream.write("LAM_Cal.addServiceDays(\""+ svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
  }
}


// main

console.log("makeLAMetroSkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_LAM_cal.js');
writeStream.write("// eo_LAM_cal.js " + d + "\n\n");
writeStream.write("// Calendar valid from " + startdate + " to " + enddate + ".\n\n");
writeStream.write("let LAM = new Carrier('LAM');\n");
writeStream.write("Carriers.addCarrier(LAM);\n");
writeStream.write("LAM.stop_prefix = 'LAM';\n");
writeStream.write("LAM.route_prefix = 'LAM';\n");
writeStream.write("LAM.trip_prefix = 'LAM';\n");
writeStream.write("let LAM_Cal = new TCalendar();\n");
writeStream.write("LAM.setCalendar(LAM_Cal);\n");
writeStream.write("LAM_Cal.lastUpdated = \"" + d + "\";\n");
writeStream.write("LAM_Cal.gtfstz = \"PacificTime\";\n\n");

var csvreader = fs.createReadStream('data/calendar.csv').pipe(csv())
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

  
