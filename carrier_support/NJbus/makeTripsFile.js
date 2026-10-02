// makeTripsFiles

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
  
async function routesproc(route)
{
    var route_id = route.route_id;
    let m = route.routem;
//    if(i == 0) console.log("128 " + route_id);
    {
      try{
          var cmd = 'grep NJR' + m + ',  data/trips.csv';
          await execShellCommand(cmd).then( (data) => lineproc3(data, route));
      }
      catch(e)
      {
        console.log("136 " + e);   
      }
    }
   
}


async function lineproc3(data, route)
{
  console.log("lineproc3 " + data);
//        writeStream2.write(route_id + ".stop_ids = [\n");
        var a = data.split("\n"); // all trips data for the route
        var b = true;
//        var stps = route.stop_ids;
        var i = 0;
  
        var i3 = 0;
        var k = a.length-1;
        for(i3 = 0; i3 < k; i3++) // for each trip
        {
           var d = a[i3].split(",");
           var tid = d[2];
           if(i3 == 0) console.log("152 tid = " + tid);
 //          var sid = d[1];
 //          var shape_id = null;
 //          if(d.length == 7)
 //          {
 //            shape_id = "AMS" + d[6];
 //          }
 //          var headsign = d[3];
 //          var shortname = d[4];
 //          var dir = d[5];

           var cmd5 = 'grep NJB' + tid + ', data/stop_times.csv';
           await execShellCommand(cmd5).then( (dat) => lineproc5(dat, d, route));
           
        }
}

var tripno = 1;

async function lineproc5(dat, d, route)           
{
           var tid = d[2].trim();
           tid = tid.replace(/\"/g, "");
           var sid = d[1].trim().replace(/\"/g, "");
           var headsign = d[3].trim().replace(/\"/g, "");
           /*
           let j = headsign.indexOf("LINE TO ");
           if(j != -1)
           {
             headsign = headsign.substring(j + 8);   
           }
           */
           var shape_id = d[6].trim().replace(/\"/g, "");
           var dir = d[4].trim().replace(/\"/g, "");
//           var jj = tid.indexOf("_") + 1;
//           var shortname = route.short;
           
           var bComp = true;
//           if((typeof route.stop_ids0 == 'undefined') || (route.stop_ids0.length == 0)) bComp =true;
//           if((typeof route.stop_ids1 == 'undefined') || (route.stop_ids1.length == 0)) bComp =true;
           
           if(!bComp)
           {
           var stps = route.stop_ids1;
           if(dir == 0) stps = route.stop_ids0;
           
           var st = [];
           var k7 = stps.length;
           for(var i7 = 0; i7 < k7; i7++)
           {
             st[i7] = "\"-1\"";   
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
             var stpn =  "NZ" + dd[3].trim().replace(/\"/g, "");
             var b7 = true;
             var zi = 0;
             while(b7 && zi < k7)
             {
               if(stps[zi] == stpn)
               {
                 b7 = false;
//                 if(dir == 0) 
                     st[zi] = sg;
//                 else st[k7 -1 - zi] = sg;
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

           var tripid = "MVRTA" + route.route_id + tripno;
           
           s = "var MVRTA" + tripno + " = new TTrip(\"MVRTA" + tripno + "\", \"" + route.route_name + " " + shortname + "\", " + dir + ", \"\");\n";
           s += "MVRTA" + tripno + ".headsign = \"" + headsign + "\";\n";
           s += "MVRTA" + tripno + ".tid = \"" + tid + "\";\n";
//           s += "PH_" + tripno + ".trip_idr = \"" + tid + "\";\n";
//           s += "PH_" + tripno + ".short = \"" + shortname + "\";\n";
           s += "MVRTA" + tripno + ".service_ids = [\"" + sid + "\"];\n";
           if(shape_id != null)
           {
             s += "MVRTA" + tripno + ".shape_id = \"MVRTA" + shape_id + "\";\n";   
           }
           s += "MVRTA" + tripno + ".times = [\n";
           writeStream2.write(s);
           writeStream2.write(s5);
                
           writeStream2.write("];\n");
           writeStream2.write(route.route_id + ".addTrip(MVRTA" + tripno + ");\n\n");
           tripno += 1;
           }
           
           else // bComp true
           {
           var st = [];
           var a5 = dat.split("\n");
           var k5 = a5.length-1;
           var i5 = 0;
           var j5 = 0;
           var s5 = "";
           for(i5 = 0; i5 < k5; i5++)
           {
             var sg = "";
             var dd = a5[i5].split(",");
             var arr = dd[1].trim();
             arr = arr.substring(0, arr.lastIndexOf(":"));
             var dep = dd[2].trim();
             dep = dep.substring(0, dep.lastIndexOf(":"));
             
             
             if(dep == arr) sg = " \"" + dep + "\"";
             else sg += " \"" + arr + "/" + dep + "\"";
             
//             st[i5] = "{ stop_id: \"T_" + dd[3] + "\", tsa: \"" + arr + "\", tsd: \"" + dep + "\"}";
             
             if(dep == arr)
             {
               st[i5] = "{ s: \"NZ" + dd[3] + "\", d: \"" + dep + "\"}";
                 
             }
             else
             {
               st[i5] = "{ s: \"NZ" + dd[3] + "\", a: \"" + arr + "\", d: \"" + dep + "\"}";
             }
                    
                    
//             var point =getStopPointerFromId("MSL" + dd[0]);
//             addRouteToRTS(route.route_id, point);
 
           }
           
           k7 = st.length;
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
           
 //         if((sid.indexOf("313") != -1) || (sid.indexOf("303") != -1))
          {
          var tripid = "NJB" + tid;
           s = "let " + tripid + " = new TTrip(\"" + tripid + "\", \" \", " + dir + ", \"\");\n";
           s += tripid + ".headsign = \"" + headsign + "\";\n";
           s += tripid + ".tid = \"" + tid + "\";\n";
 //          s += tripid + ".short = \"" + shortname + "\";\n";
           s += tripid + ".service_id = \"NJS" + sid + "\";\n";
 //          s += tripid + ".wc = \"" + d[8] + "\";\n";
 //          s += tripid + ".bike = \"" + d[11] + "\";\n";
           if(shape_id != null)
           {
             s += tripid + ".shape_id = \"NJG" + shape_id + "\";\n";   
           }
           s += tripid + ".comp = [\n";
           writeStream2.write(s);
           writeStream2.write(s5);
                
           writeStream2.write("];\n");
           writeStream2.write(route.route_id + ".addTrip(" + tripid + ");\n\n");
           tripno += 1;
          }
           }
}

 function getStopPointerFromId(sid)
{
  var r = -1;
  var k = stops_MeVa.length;
  var i = 0;
  var b = true;
  while(b && (i <k))
  {
    var d = stops_MeVa[i];
    if(sid == d)
    {
        r = i;
        b= false;
    }
   i += 12;
   }
  return(r);
}

function addRouteToRTS(rt, point)
{
  var d = "";
  var rts = stops_MeVa[point + 11];
  if(rts.length == 0) d = rt;
  else
  {
    var a = rts.split(",");
    var k = a.length;
    var i = 0;
    var b = true;
    while(b && (i < k))
    {
      if(rt == a[i])
      {
        b = false;   
      }
      i += 1;
    }
    if(b)
    {
      d = rts + "," + rt;
    }
  }
  if(d != "")
  {
    stops_MeVa[point + 11] = d;  
//    console.log("393 " + d);
  }
}

function getM(route_id)
{
  let a = NJrouteIdMap;
  let k = a.length;
  let i = 0;
  let b = true;
  let m = null;
  let r = route_id;
  if(r.indexOf("Y") == 0) r = route_id.substring(1);
  while(b && (i<k))
  {
    if(r ==  a[i+1])
    {
      b = false;
      m = a[i];
    }
    i += 2;
  }
  return(m);
}


async function proc()
{
  let k = Routes.length;
  let i = 0;
  for(i=0; i<k; i++)
  {
    let route = Routes[i];
    let route_id = route.route_id;
    route.routem = getM(route_id);
    let fn = 'sked/eo_NJbus_' + route_id + '.js'
    writeStream2 = fs.createWriteStream(fn);
    writeStream2.write("// " + fn + " " + d + "\n\n");
    await routesproc(route);
    writeStream2.on('finish', () => {
    });
  }
    
}
          


// main

console.log("makeTripsFile");
 var now = new Date();
 var d = date.format(now, 'hh:mm A MMM DD YYYY');
// var routea = [];
//routesproc();
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
  
var writeStream2 = null;
proc();


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
