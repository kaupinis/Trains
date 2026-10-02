// makeMNRSkedFiles

const lineReader = require('line-reader');
const lineByLine = require('n-readlines');
const fs = require('fs');
const csv = require('csv-parser');
const { exec } = require('child_process');
const date = require('date-and-time');


var startdate = process.argv[2];
var enddate =   process.argv[3];
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
  var svcid = "DART_" + row.service_id;
  var sdate = startdate; //row.start_date;
  var edate = enddate; //row.end_date;
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
    
  if(adds.length > 0)
  {
  writeStream.write("MNR_Cal.addServiceDays(\""+ svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
  calendars.push(svcid);
  }
  
}

function lineproc10(row)
{
  let id = row.service_id;
  let date = row.date;
  let exc = row.exception_type;
  if((date >= startdate) && (date <= enddate))
  {
    let scal = MNR_Cal.getServiceCalendar(id);
    if(scal == null)
    {
//      writeStream.write("MNR_Cal.addServiceDays(\""+ svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
      if(exc == 1)
      {
        MNR_Cal.addServiceDays(id, "", startdate, enddate, date , "");
        writeStream.write("MNR_Cal.addServiceDays(\""+ id + "\", \"\", " + startdate + ", " + enddate + ", " + date + ", \"\");\n");
      }
      else
      {
        MNR_Cal.addServiceDays(id, "", startdate, enddate, "", date);  
        writeStream.write("MNR_Cal.addServiceDays(\""+ id + "\", \"\", " + startdate + ", " + enddate + ", \"\", " + date + ");\n");
     }
       
    }
    else
    {
      if(exc == 1)
      {
        if(scal.adds == "") scal.adds = date;
        else scal.adds += "," + date;
      }
      else
      {
        if(scals.dels == "") scals.dels = date;
        else scals.dels += "," + date;
      }
        
    }
        
  }
  
}


// main

console.log("makeMNRSkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_MNR_Cal.js');
writeStream.write("// eo_MNR_Cal.js " + d + "\n\n");
writeStream.write("// Calendar valid from " + startdate + " to " + enddate + ".\n\n");
writeStream.write("let MNR = new Carrier('MNR');\n");
writeStream.write("Carriers.addCarrier(MNR);\n");
writeStream.write("MNR.setStops(stops_NY);\n");
writeStream.write("MNR.stop_prefix = 'MNR_';\n");
writeStream.write("MNR.route_prefix = 'MN';\n");
writeStream.write("MNR.trip_prefix = 'MNR';\n\n");
writeStream.write("let MNR_Cal = new TCalendar();\n");
writeStream.write("MNR.setCalendar(MNR_Cal);\n");
writeStream.write("MNR_Cal.lastUpdated = \"" + d + "\";\n");
writeStream.write("MNR_Cal.expires = \"" + enddate + "\";\n\n");
let MNR_Cal = new TCalendar();

/*
try
{

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
  })
  .on('error', (e) => {
    console.log("reader error " + e);
  });
}
catch(e) */
{
    console.log("129 using calendar_dates only");
var csvreader = fs.createReadStream('data/calendar_dates.csv').pipe(csv())
    .on('data', (data) => lineproc10(data))
    .on('end', () => {
    console.log('CSV file successfully processed');

    writeStream.on('finish', () => {
    console.log('wrote all data to file');
    writeStream.end();
    bRun = false;
    });
  })
  .on('close', () => {
    console.log("reader closed");
  });
    
}
  
