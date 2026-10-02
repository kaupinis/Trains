// makeVIASkedFiles

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


async function lineproc1(row)
{
  var svcid = row.service_id;
  var sdate = row.start_date;
  var edate = row.end_date;
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
    
  
  
  writeStream.write("VIA_Cal.addServiceDays(\"" + svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
  
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

console.log("makeVIASkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_VIA_cal.js');
writeStream.write("// eo_VIA_cal.js " + d + "\n\n");
writeStream.write("var VIA = new Carrier('VIA');\n");
writeStream.write("Carriers.addCarrier(VIA);\n");
writeStream.write("VIA.stop_prefix = 'VIA';\n");
writeStream.write("VIA.route_prefix = 'VIAR';\n");
writeStream.write("VIA.trip_prefix = 'VIA';\n\n");
writeStream.write("var VIA_Cal = new TCalendar();\n");
writeStream.write("VIA_Cal.lastUpdated = \"" + d + "\";\n\n");
writeStream.write("VIA_Cal.gtfstz = \"EasternTime\";\n\n");
writeStream.write("VIA.setCalendar(VIA_Cal);\n\n");

var csvreader = fs.createReadStream('data/calendar.txt').pipe(csv())
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
//    setTimeout(step2, 1000);
  });

  
