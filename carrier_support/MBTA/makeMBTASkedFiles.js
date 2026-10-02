// makeMBTASkedFiles

const lineReader = require('line-reader');
const lineByLine = require('n-readlines');
const fs = require('fs');
const csv = require('csv-parser');
const { exec } = require('child_process');
const date = require('date-and-time');

let enddate = 0;

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

async function lineproc(data)
{
  await lineproc1(data);   
}


async function lineproc1(row)
{
  var svcid = row.service_id;
  var sdate = row.start_date;
  var edate = row.end_date;
  if(Number(edate) > enddate) endate = Number(edate);
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
  var cmd = 'grep \"' + svcid + '\" data/calendar_dates.txt';
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
              if(Number(b[1]) > enddate) enddate = Number(b[1]);
              if(adds == "") adds = b[1];
              else adds += "," + b[1];
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
    
  
  
  writeStream.write("MBTA_Cal.addServiceDays(\"" + svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
  
}

async function lineproc2(row)
{
  var routeid = row.route_id;
  var rln = row.route_desc;
  var rsn = row.route_short_name;
  routea.push(routeid.toString());
  routea.push(rsn.toString());
  routea.push(rln.toString());
  
}


/*
function step3()
{
  var writeStream2 = fs.createWriteStream('eo_LAMB_routes.js');
  writeStream2.write("// eo_LAMB_routes.js " + d + "\n\n");
  var kr = routea 
}
*/

// main

console.log("makeMBTASkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_MBTA_cal.js');
writeStream.write("// eo_MBTA_cal.js " + d + "\n\n");
writeStream.write("let MBTA = new Carrier('MBTA');\n");
writeStream.write("Carriers.addCarrier(MBTA);\n");
writeStream.write("MBTA.stop_prefix = 'T_';\n");
writeStream.write("MBTA.route_prefix = '';\n");
writeStream.write("MBTA.trip_prefix = 'T_';\n\n");
writeStream.write("let MBTA_Cal = new TCalendar();\n");
writeStream.write("MBTA_Cal.lastUpdated = \"" + d + "\";\n\n");
writeStream.write("MBTA_Cal.gtsftz = \"EasternTime\";\n\n");
writeStream.write("MBTA.setCalendar(MBTA_Cal);\n\n");

var csvreader = fs.createReadStream('data/calendar.txt').pipe(csv())
    .on('data', (data) => lineproc(data))
    .on('end', () => {
    console.log('CSV file successfully processed');
//    writeStream.write("const SFMTARouteMapMap = [\n");
//    writeStream.write("MBTA_Cal.expires = \"" + enddate + "\";\n\n");
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
//    writeStream.write("MBTA_Cal.expires = \"" + enddate + "\";\n\n");

  
