// makeSFMTASkedFiles


var agency = [
"186","Adirondack Trailways",
"99","Altamont Corridor Express",
"1207","Alvand Transportation",
"1206","AmericanStar",
"51","Amtrak",
"174","Amtrak Chartered Motorcoach",
"150","Apple Line",
"43","Arrow Trailways",
"155","Badger Bus",
"1220","BeeLine Express Bus",
"184","Bustang",
"6","C&J",
"123","Cantrail",
"1215","Central Oregon Breeze",
"1227","Coach USA",
"192","Dungeness Line",
"1217","El Dorado Transit",
"117","Executive Transportation",
"153","Express Arrow",
"188","Fullington Trailways",
"125","Gold Line",
"44","Grand Canyon Railway",
"124","Grape Line",
"190","Groome Transportation",
"23","Indian Trails",
"1231","Amtrak Thruway",
"133","Lamers Connect",
"108","Martz Trailways",
"185","New York Trailways",
"131","Northwestern Trailways",
"142","Pacific Crest Bus Lines",
"136","Peoria Charter",
"187","Pine Hill Trailways",
"147","RoadRunneR Shuttle",
"1202","Route 66 Express",
"137","Smart Way Connector",
"139","Southeast Area Transit (SEAT)",
"162","Stagecoach Express",
"178","The Lift",
"138","Van Galder Coach USA",
"1213","Vegas Airporter",
"1218","Vermont Translines"
];



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
  
  
  writeStream.write("AM_Cal.addServiceDays(\""+ svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
  
}


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


async function lineproc3(data, route_id, route_name)
{
  console.log("lineproc3 " + data);
//        writeStream2.write(route_id + ".stop_ids = [\n");
        var a = data.split("\n");
        var b = true;
        var stps = [];
        var k = a.length-1;
        var i = 0;
        while(b && i < k)
        {
          var d = a[i].split(",");
          if(d[5] == 0) // dir == 0
          {
            b = false;
            
            basetripid = d[2];
            var cmd2 = 'grep ' + basetripid + ' data/stop_times.txt';
            await execShellCommand(cmd2).then( (dat) => lineproc4(dat, route_id, route_name, stps, a));
          }            
          i += 1;
        }
}


async function lineproc4(dat, route_id, route_name, stps,a)            
{
              var a2 = dat.split("\n");
              var k2 = a2.length-1;
              var i2 = 0;
              while(i2 < k2)
              {
                var f = a2[i2].split(",");
                stps.push(f[3]);
                i2 += 1;
              }
              i2 = 0;
              var j = 0;
              var j2 = 0;
              var s = "";
              while(j < k2)
              {
                s += "\"AMS" + stps[j] + "\"";
                if(j < (k2 -1)) s += ","
                j2 += 1;
                if(j2 >= 10)
                {
                  s += "\n";
//                  writeStream2.write(s);
                  j2 = 0;
                }
                j += 1;
              }
              writeStream2.write(route_id + ".stop_ids = [\n");
//              if(j2 != 0) 
              writeStream2.write(s);
              writeStream2.write("];\n");
              writeStream2.write("addRouteToService(" + route_id + ");\n\n");
              
              var i3 = 0;
              var k = a.length-1;
              for(i3 = 0; i3 < k; i3++)
              {
                var d = a[i3].split(",");
                var tid = d[2];
                var sid = d[1];
                var shape_id = null;
                if(d.length == 7)
                {
                  shape_id = "AMS" + d[6];
                }
                var headsign = d[3];
                var shortname = d[4];
                var dir = d[5];

                var cmd5 = 'grep ' + tid + ' data/stop_times.txt';
                await execShellCommand(cmd5).then( (dat) => {
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
                    var arr = dd[1];
                    arr = arr.substring(0, arr.lastIndexOf(":"));
                    var dep = dd[2];
                    dep = dep.substring(0, dep.lastIndexOf(":"));
                    if(dep == arr) sg = " \"" + dep + "\"";
                    else sg += " \"" + arr + "/" + dep + "\"";
                    var stpn = dd[3];
                    var b7 = true;
                    var zi = 0;
                    while(b7 && zi < k7)
                    {
                      if(stpn.indexOf(stps[zi]) == 0)
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


                s = "AMR" + tid + " = new TTrip(\"AMR" + tid + "\", \"" + route_name + " " + shortname + "\", " + dir + ", \"\");\n";
                s += "AMR" + tid + ".headsign = \"" + headsign + "\";\n";
                s += "AMR" + tid + ".tid = \"" + tid + "\";\n";
                s += "AMR" + tid + ".service_id = \"" + sid + "\";\n";
                if(shape_id != null)
                {
                  s += "AMR" + tid + ".shape_id = \"" + shape_id + "\";\n";   
                }
                s += "AMR" + tid + ".times = [\n";
                writeStream2.write(s);
                writeStream2.write(s5);
                
                writeStream2.write("];\n");
                writeStream2.write(route_id + ".addTrip(AMR" + tid + ");\n\n");
                });
              }
}



// main

console.log("makeAMTRAKSkedFiles");
var now = new Date();
var d = date.format(now, 'hh:mm A MMM DD YYYY');
var routea = [];


var writeStream = fs.createWriteStream('eo_AM_cal.js');
writeStream.write("// eo_AM_cal.js " + d + "\n\n");
writeStream.write("var AMR = new Carrier('AMR');\n");
writeStream.write("Carriers.addCarrier(AMR);\n");
writeStream.write("AMR.stop_prefix = 'AMS';\n");
writeStream.write("AMR.route_prefix = 'AMR';\n");
writeStream.write("AMR.trip_prefix = 'AMR_';\n\n");
writeStream.write("var AM_Cal = new TCalendar();\n");
writeStream.write("AM_Cal.lastUpdated = \"" + d + "\";\n");
writeStream.write("AM_Cal.gtsftz = \"EasternTime\";\n\n");
writeStream.write("AMR.setCalendar(AM_Cal);\n\n");
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

/*  
var writeStream2 = fs.createWriteStream('eo_AM3.js');
writeStream2.write("// eo_AM3.js " + d + "\n\n");

var csvreader = fs.createReadStream('data/routes.csv').pipe(csv())
    .on('data', (data) => lineproc2(data))
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
