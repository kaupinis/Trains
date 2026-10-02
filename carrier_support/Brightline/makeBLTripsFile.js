// makeBLTripsFile.js

/*
var Routes = [];

function addRouteToService(r)
{
  Routes.push(r);   
}

function TRoute(route_id, route_name)
{
  this.route_id = route_id;
  this.route_name = route_name;
  this.stop_ids = [];
  this.stop_names = [];
  this.trips = [];
}
*/

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

/*
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
  */
  /*
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
*/    
  
 /* 
  writeStream.write("AM_Cal.addServiceDays(\""+ svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
  
}
*/
/*
async function lineproc2(row)
{
  var route_id = row.AMRroute_id;
  var route_name = row.route_long_name;
  if(route_name.indexOf("Amtrak") == -1) route_name = "Amtrak " + route_name;
  if(route_name.indexOf("Thruway") != -1)
  {
    var aid = row.agency_id;
    var i = 0;
    var k = agency.length;
    var b = true;
    while(b && i < k)
    {
      if(aid == agency[i])
      {
        b = false;
        route_name = "Amtrak Connecting Service - " + agency[i + 1];
      }
      i += 2;
    }
  }
  writeStream2.write("var " + route_id + " = new TRoute(\"" + route_id + "\", \"" +  route_name + "\");\n");
  writeStream2.write(route_id + ".cal = AM_Cal;\n");
//  writeStream2.write(route_id + ".stop_ids = \n");
  
  var cmd = 'grep ' + route_id + ',  data/trips.csv';
  await execShellCommand(cmd).then( (data) => lineproc3(data, route_id, route_name));
  
}
*/
  
async function routesproc()
{
  var routeslength = Routes.length;
  var i = 0;
  for(i = 0; i < routeslength; i++)
  {
    var route = Routes[i];
    var m = route.m;
    var j = 0;
    for(j = 0; j < 1; j++)
    {
      var grepi = "BL";
      var cmd = 'grep ' + grepi + ' data/trips.txt';
      await execShellCommand(cmd).then( (data) => lineproc3(data, route));
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
           var tid = d[2].replace(/\"/g, "");
 //          var sid = d[1];
 //          var shape_id = null;
 //          if(d.length == 7)
 //          {
 //            shape_id = "AMS" + d[6];
 //          }
 //          var headsign = d[3];
 //          var shortname = d[4];
 //          var dir = d[5];

           var cmd5 = 'grep ' + tid + '\, data/stop_times.txt';
           try{
           await execShellCommand(cmd5).then( (dat) => lineproc5(dat, stps, d, route));
           }
           catch(e){ console.log(e)};
        }
}
         
var tripno = 1;

async function lineproc5(dat, stps, d, route)           
{
           var tid = d[2].trim();
           tid = tid.replace(/\"/g, "");
           var sid = "BLC_" + d[1].trim().replace(/\"/g, "");
           var headsign = d[4].trim().replace(/\"/g, "");
           var shape_id = d[7].trim().replace(/\"/g, "");
           var dir = 0;
           if(headsign == "EKW") {dir = 1; headsign = "Miami Central Brightline"}
           else if(headsign == "AVE") headsign = "Aventura Brightline";
           else if(headsign == "FBT") headsign = "Fort Lauderdale Brightline";
           else if(headsign == "WPT") headsign = "West Palm Beach Brightline";
           else if(headsign == "RRN") headsign = "Boca Raton Brightline";
           else if(headsign == "MCO") headsign = "Orlando Airport Brightline Concourse C";
           
           var jj = tid.indexOf("_") + 1;
           var shortname = d[3].trim();
           var wc =  d[5].trim().replace(/\"/g, "");
           var bikes = d[6].trim().replace(/\"/g, "");
           
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
             var arr = dd[1].trim().replace(/\"/g, "");
             arr = arr.substring(0, arr.lastIndexOf(":"));
             var dep = dd[2].trim().replace(/\"/g, "");
             dep = dep.substring(0, dep.lastIndexOf(":"));
             
             
             if(dep == arr) sg = " \"" + dep + "\"";
             else sg += " \"" + arr + "/" + dep + "\"";
             
             var deph = Number(dep.substring(0, dep.indexOf(":")));
             if((deph >= 27) && !bmultiday)
             {
                 bmultiday = true;
//                 console.log("873 deph = " + deph + " AMR" + tid + " " + route.route_id + " " + dep + " " + i5 + " " + a5[i5]);
             }
             var stpn = "BL_" + dd[3].trim().replace(/\"/g, "");
             var b7 = true;
             var zi = 0;
             while(b7 && zi < k7)
             {
               if(stps[zi] == stpn)
               {
                 b7 = false;
                 if(dir == 0) st[zi] = sg;
                 else st[k7 -1 - zi] = sg;
               }
               zi += 1;
             } 
//             headsign = getStopNameFromID(stpn);
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

           tripno = "BL" + tid;
           
           s = "var " + tripno + " = new TTrip(\"" + tripno + "\", \"" + route.route_name + " " + shortname + "\", " + dir + ", \"\");\n";
           s += tripno + ".headsign = \"" + headsign + "\";\n";
           s += tripno + ".tid = \"" + tid + "\";\n";
           s += tripno + ".trip_idr = \"" + tid + "\";\n";
           s += tripno + ".short = \"" + shortname + "\";\n";
           s += tripno + ".service_id = \"" + sid + "\";\n";
           if(shape_id != null)
           {
             s += tripno + ".shape_id = \"BL" + shape_id + "\";\n";   
           }
           if(bmultiday && (route.route_name.indexOf("Connect") == -1)) 
           {
               s += tripno + ".multiday = true;\n";
//               console.log("920 AMR" + tid + " " + route.route_id);
           }
           s += tripno + ".times = [\n";
           writeStream2.write(s);
           writeStream2.write(s5);
                
           writeStream2.write("];\n");
           writeStream2.write(route.route_id + ".addTrip(" + tripno + ");\n\n");
 //          tripno += 1;
}



// main

console.log("makeBLTripsFile");
 var now = new Date();
 var d = date.format(now, 'hh:mm A MMM DD YYYY');
// var routea = [];
routesproc();
/*
var writeStream = fs.createWriteStream('eo_AM_cal.js');
writeStream.write("// eo_AM_cal.js " + d + "\n\n");
writeStream.write("var AM_Cal = new TCalendar();\n");
writeStream.write("AM_Cal.lastUpdated = \"" + d + "\";\n\n");

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
  });
*/
  
var writeStream2 = fs.createWriteStream('eo_BL2.js');
writeStream2.write("// eo_BL2.js " + d + "\n\n");


/*
var csvreader = fs.createReadStream('data/routes.csv').pipe(csv())
    .on('data', (data) =>  lineproc2(data))
    .on('end', () => {
    console.log('CSV file successfully processed');
//    writeStream.write("const SFMTARouteMapMap = [\n");

    writeStream2.on('finish', () => {
    console.log('wrote all data to file');
    writeStream2.end();
    bRun = false;
    });
  })
  .on('close', () => {
    console.log("reader closed");
  });
*/  
  
