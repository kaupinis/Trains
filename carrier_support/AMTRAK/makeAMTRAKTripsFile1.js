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
    var route_id = Routes[i].route_id;
    var route = Routes[i];
//    if(route.stop_ids.length > 0)
    {
      var cmd = 'grep ' + route_id + ',  data/trips.csv';
      try {
      await execShellCommand(cmd).then( (data) => lineproc3(data, route));
      }
      catch(e) {
      }
    }
//    else 
//    {
//        console.log("126 no stops for " + route_id);
//    }
  }
}


async function lineproc3(data, route)
{
  console.log("lineproc3 " + data);
//        writeStream2.write(route_id + ".stop_ids = [\n");
        var a = data.split("\n"); // all trips data for the route
//        var b = true;
        var stps = route.stop_ids;
//        var i = 0;
  
        var i3 = 0;
        var k = a.length-1;
        for(i3 = 0; i3 < k; i3++) // for each trip
        {
           var d = a[i3].split(",");
           var tid = d[2];
 //          var sid = d[1];
 //          var shape_id = null;
 //          if(d.length == 7)
 //          {
 //            shape_id = "AMS" + d[6];
 //          }
 //          var headsign = d[3];
 //          var shortname = d[4];
 //          var dir = d[5];

           var cmd5 = 'grep AMR' + tid + ', data/stop_times.csv';
           try{
           await execShellCommand(cmd5).then( (dat) => lineproc5(dat, stps, d, route));
           }
           catch(e){ console.log(e);}
           
        }
}

function getStopFromId(id)
{
  var sid = "AMS" + id;
  sid = sid.trim();
  var r = id;
  var k = stops_AM.length;
  var i = 0;
  var b = true;
//  console.log("173 " + sid + " " + stops_AM[i] + " " + k);
  while(b && (i <k))
  {
    if(sid == stops_AM[i])
    {
      r = stops_AM[i+1];
      b= false;
    }
    i += 12;
  }
  return(r);
}
           
async function lineproc5(dat, stps, d, route)           
{
           var tid = d[2];
           var sid = d[1];
           var shape_id = null;
//           var bSunsetLimited = (route.route_id == "AMR36930");
           var bRevTexasEagle = ((d[3] == 22) || (d[3] == 21));
           var bTexasEagle422 = (d[3] == 422);
           if(d[6].length > 0)
           {
             shape_id = "AMS" + d[5];
             shape_id = shape_id.trim();
             if(shape_id.length == 3) shape_id = null;
           }
           var headsign = getStopFromId(d[6]).trim();
           headsgn = headsign.replace("Ny Moy", "NY Moy");
           var shortname = d[3];
           var dir = d[4];
           
           if(bRevTexasEagle)
           {
             if(d[3] == 22)
             {
               dir = 1;
               shape_id = "AMS272";
             }
             else if(d[3] == 21)
             {
               dir = 0;
               shape_id = "AMS274";
             }
           }
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
           var cmp = "";
           var i5 = 0;
           var j5 = 0;
           var s5 = "";
           var limit = k5 - 1;
           for(i5 = 0; i5 < k5; i5++)
           {
             var sg = "";
             var dd = a5[i5].split(",");
             var arr = dd[1];
             arr = arr.substring(0, arr.lastIndexOf(":"));
             var dep = dd[2];
             dep = dep.substring(0, dep.lastIndexOf(":"));
             
             /*
             if((bSunsetLimited) && (dir == 0))
             {
               var ii = arr.indexOf(":");
               var arrh = Number(arr.substring(0, ii)) - 24;
               arr = arrh.toString() + arr.substring(ii);
               ii = dep.indexOf(":");
               var deph = Number(dep.substring(0, ii)) - 24;
               dep = deph.toString() + dep.substring(ii);              
             }
             */
             
             if(dep == arr) sg = " \"" + dep + "\"";
             else sg += " \"" + arr + "/" + dep + "\"";
             
             var deph = Number(dep.substring(0, dep.indexOf(":")));
             if((deph >= 27) && !bmultiday)
             {
                 bmultiday = true;
//                 console.log("873 deph = " + deph + " AMR" + tid + " " + route.route_id + " " + dep + " " + i5 + " " + a5[i5]);
             }
             var stpn = "AMS" + dd[3];
             if(i5 != 0) cmp += ", ";
/*             if(i5 == 0)
             {
               cmp = "{s: \"" + stpn + "\", d: \"" + dep + "\"}";  
             }
             else if(i5 == limit)
             {
               cmp += "{s: \"" + stpn + "\", a: \"" + arr + "\"}";  
             }
             else if(arr == dep)
             {
               cmp += "{s: \"" + stpn + "\", d: \"" + dep + "\"}";   
             }
             else */
             {
               cmp += "{s: \"" + stpn + "\", a: \"" + arr + "\", d: \"" + dep + "\"}";
             }
             var b7 = true;
             var zi = 0;
             while(b7 && zi < k7)
             {
               if(stps[zi].indexOf(stpn) != -1)
               {
                 b7 = false;
                 if(dir == 0) st[zi] = sg;
                 else st[k7 -1 - zi] = sg;
               }
               zi += 1;
             } 
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

           var bComp = (route.route_name.indexOf("Connect") != -1) || (route.route_name.indexOf("Commuter") != -1);
           bComp = true

           s = "var AMR_" + tid + " = new TTrip(\"AMR_" + tid + "\", \"" + route.route_name + " " + shortname + "\", " + dir + ", \"\");\n";
           s += "AMR_" + tid + ".headsign = \"" + headsign + "\";\n";
           s += "AMR_" + tid + ".tid = \"" + tid + "\";\n";
           s += "AMR_" + tid + ".short = \"" + shortname + "\";\n";
           s += "AMR_" + tid + ".service_id = \"" + sid + "\";\n";
           if(shape_id != null)
           {
             s += "AMR_" + tid + ".shape_id = \"" + shape_id + "\";\n";   
           }
           if(bmultiday && (route.route_name.indexOf("Connect") == -1)) 
           {
               s += "AMR_" + tid + ".multiday = true;\n";
//               console.log("920 AMR" + tid + " " + route.route_id);
           }
           if(bComp) 
           {
               s += "AMR_" + tid + ".comp = [" + cmp + "];\n";
               writeStream2.write(s);
           }
           else
           {
             s += "AMR_" + tid + ".times = [\n";
             writeStream2.write(s);
             writeStream2.write(s5);
             writeStream2.write("];\n");
           }
           writeStream2.write(route.route_id + ".addTrip(AMR_" + tid + ");\n\n");
        
}



// main

console.log("makeAMTRAKTripsFiles");
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
  
var writeStream2 = fs.createWriteStream('eo_AM3b.js');
writeStream2.write("// eo_AM3b.js " + d + "\n\n");


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
  
