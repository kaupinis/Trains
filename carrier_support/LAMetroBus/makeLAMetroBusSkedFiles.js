// makeSFMTASkedFiles

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
//  console.log("   svcid = " + svcid + ":" + row.service_id + " " + JSON.stringify(row, null, 4));
  
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
    
  
  
  writeStream.write("LAMB_Cal.addServiceDays(\"" + svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
  
}

async function lineproc2(row)
{
  var routeida = row.route_id;
//  console.log("   routeid = " + routeida + ":" + row.route_id + " " + JSON.stringify(row, null, 4));
  let a = JSON.stringify(row, null, 4);
  let b = JSON.parse(a);
  console.log("86 " + Object.keys(b).length);
  console.log("87 "+ Object.keys(b)[0] + "" + Object.values(b)[0] +" " + b.route_short_name + " "+ b.route_desc);
  var rln = row.route_desc;
  var rsn = row.route_short_name;
  let routem =  Object.values(b)[0]
  if(typeof routem !== 'undefined')
  {
  routea.push(routem.toString());
  if(typeof rsn !== 'undefined') routea.push(rsn.toString());
  else routea.push("");
  if(typeof rln !== 'undefined') routea.push(rln.toString());
  else routea.push("");
  }
  
}

function titlecase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}



function step2()
{
   writeStream.write("\nconst LAMBRouteMap = [\n");
   var csvreader2 = fs.createReadStream('data/routes1.txt').pipe(csv())
    .on('data', (data) => lineproc2(data))
    .on('end', () => {
    console.log('CSV file 2 successfully processed');
    const regex = / La /ig;
    const regex2 = /-/ig;
    var k = routea.length;
    console.log("routea.length = " + k);
    var i = 0;
    for(i = 0; i < k; i += 3)
    {
      if(i != 0) writeStream.write("\",\n");
      var x = routea[i];
      if(x.indexOf("854-") == 0) routea[i+1] = "854";
      else if(x.indexOf("901-") == 0) routea[i+1] = "901";
      else if(x.indexOf("910-") == 0) routea[i+1] = "910";
      var desc3 = routea[i+2].replace(regex2, " - ");
      var desc = titlecase(desc3);
      var desc2 = desc.replace(regex, " LA ");
      writeStream.write("\"" + routea[i] + "\", \"" + routea[i+1] + "\", \"" + desc2);  
    }
    writeStream.write("\"\n];\n\n");
    });
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

console.log("makeLAMetroBusSkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_LAMB_cal.js');
writeStream.write("// eo_LAMB_cal.js " + d + "\n\n");
writeStream.write("var LAMB_Cal = new TCalendar();\n");
writeStream.write("LAMB_Cal.lastUpdated = \"" + d + "\";\n\n");
writeStream.write("LAMB_Cal.gtfstz = \"PacificTime\";\n\n");

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
    setTimeout(step2, 1000);
  });

  
