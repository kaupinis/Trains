let Routes = [];

let stops_LAMetro = [];

class Carrier {
    id = null;
    calendar = null;
    routes = [];
    
    constructor(id) {
        this.id = id;
    }
    
    setCalendar(cal) {
        this.calendar = cal;
    }
    
    addRouteToService(r) {
        this.routes.push(r);
        addRouteToService(r);
    }
    
    addRoute(r) {
        this.routes.push(r);
        addRouteToService(r);
    }
    addStops(a) {
        
    }
    
    setStops(a) {
        
    }
   
}

class Carriers {
    static Carriers = [];
    static addCarrier(c) {
        Carriers.Carriers.push(c);
    }
}

// eo_LAM_cal.js 03:40 AM Sep 26 2026

// Calendar valid from 20260926 to 20261004.

let LAM = new Carrier('LAM');
Carriers.addCarrier(LAM);
LAM.stop_prefix = 'LAM';
LAM.route_prefix = 'LAM';
LAM.trip_prefix = 'LAM';
let LAM_Cal = new TCalendar();
LAM.setCalendar(LAM_Cal);
LAM_Cal.lastUpdated = "03:40 AM Sep 26 2026";
LAM_Cal.gtfstz = "PacificTime";

LAM_Cal.addServiceDays("RJUN26_804_2_Saturday_06", "6", 20261003, 20261003, "", "");
LAM_Cal.addServiceDays("RJUN26_804_1_Weekday_17", "12345", 20261001, 20261001, "", "");
LAM_Cal.addServiceDays("RJUN26_804_1_Weekday_41", "12345", 20260929, 20260930, "", "");
LAM_Cal.addServiceDays("RJUN26_804_1_Weekday_90", "12345", 20260928, 20261009, "", "20260929,20260930,20261001");
LAM_Cal.addServiceDays("RJUN26_804_3_Sunday_15", "0", 20260927, 20260927, "", "");
LAM_Cal.addServiceDays("RJUN26_804_2_Saturday_04", "6", 20260926, 20260926, "", "");
LAM_Cal.addServiceDays("RJUN26_803_3_Sunday_90", "0", 20261004, 20261004, "", "");
LAM_Cal.addServiceDays("RJUN26_803_2_Saturday_90", "6", 20261003, 20261003, "", "");
LAM_Cal.addServiceDays("RJUN26_803_1_Weekday_90", "12345", 20260928, 20261009, "", "");
LAM_Cal.addServiceDays("RJUN26_803_3_Sunday_08", "0", 20260927, 20260927, "", "");
LAM_Cal.addServiceDays("RJUN26_803_2_Saturday_11", "6", 20260926, 20260926, "", "");
LAM_Cal.addServiceDays("RJUN26_802_3_Sunday_90", "0", 20261004, 20261004, "", "");
LAM_Cal.addServiceDays("RJUN26_802_2_Saturday_90", "6", 20261003, 20261003, "", "");
LAM_Cal.addServiceDays("RJUN26_802_1_Weekday_90", "12345", 20260928, 20261009, "", "");
LAM_Cal.addServiceDays("RJUN26_802_3_Sunday_16", "0", 20260927, 20260927, "", "");
LAM_Cal.addServiceDays("RJUN26_802_2_Saturday_16", "6", 20260926, 20260926, "", "");
LAM_Cal.addServiceDays("RJUN26_801_3_Sunday_90", "0", 20261004, 20261004, "", "");
LAM_Cal.addServiceDays("RJUN26_801_2_Saturday_90", "6", 20261003, 20261003, "", "");
LAM_Cal.addServiceDays("RJUN26_801_1_Weekday_43", "12345", 20261002, 20261002, "", "");
LAM_Cal.addServiceDays("RJUN26_801_1_Weekday_42", "12345", 20261001, 20261001, "", "");
LAM_Cal.addServiceDays("RJUN26_801_1_Weekday_41", "12345", 20260930, 20260930, "", "");
LAM_Cal.addServiceDays("RJUN26_801_1_Weekday_40", "12345", 20260929, 20260929, "", "");
LAM_Cal.addServiceDays("RJUN26_801_1_Weekday_39", "12345", 20260928, 20260928, "", "");
LAM_Cal.addServiceDays("RJUN26_801_3_Sunday_12", "0", 20260927, 20260927, "", "");
LAM_Cal.addServiceDays("RJUN26_801_2_Saturday_08", "6", 20260926, 20260926, "", "");
LAM_Cal.addServiceDays("RJUN26_801_1_Weekday_90", "12345", 20260925, 20261009, "", "20260928,20260929,20260930,20261001,20261002");
LAM_Cal.addServiceDays("RJUN26_804_3_Sunday_91", "0", 20261004, 20261004, "", "");
// makeLAMetroTripsFile.js

var LAMA = new TRoute("LAMA", "Metro A (Blue) Line");
LAMA.common_name ="801 Metro A (Blue) Line";
LAMA.cal = LAM_Cal;
LAMA.routem = "801";
LAMA.stop_ids = ["LAM80101","LAM80153","LAM80154","LAM80102","LAM80105","LAM80106","LAM80107","LAM80108","LAM80109",
"LAM80110","LAM80111","LAM80112",
"LAM80113","LAM80114","LAM80115","LAM80116","LAM80117","LAM80118","LAM80119","LAM80120","LAM80121",
"LAM80122", "LAM81401", "LAM81402", "LAM81403", "LAM80409", "LAM80410",, "LAM80411", "LAM80412",
"LAM80413", "LAM80414", "LAM80415", "LAM80416", "LAM80417", "LAM80418", "LAM80419", "LAM80420", 
"LAM80421", "LAM80422", "LAM80423", "LAM80424", "LAM80425", "LAM80426", "LAM80427"];
addRouteToService(LAMA);


var LAMB = new TRoute("LAMB", "Metro B (Red) Line");
LAMB.common_name ="802 Metro B (Red) Line";
LAMB.cal = LAM_Cal;
LAMB.routem = "802";
LAMB.stop_ids = ["LAM80201","LAM80202","LAM80203","LAM80204","LAM80205","LAM80206","LAM80207","LAM80208","LAM80209","LAM80210","LAM80211",
"LAM80212","LAM80213","LAM80214"];
addRouteToService(LAMB);

var LAMC = new TRoute("LAMC", "Metro C (Green) Line");
LAMC.common_name ="803 Metro C (Green) Line";
LAMC.cal = LAM_Cal;
LAMC.routem = "803";
LAMC.stop_ids = ["LAM80301","LAM80302","LAM80303","LAM80304","LAM80305","LAM80306","LAM80307","LAM80308","LAM80309","LAM80310","LAM80311",
"LAM80312","LAM80313","LAM80314"];
addRouteToService(LAMC);

var LAMD = new TRoute("LAMD", "Metro D (Purple) Line");
LAMD.common_name ="805 Metro D (Purple) Line";
LAMD.cal = LAM_Cal;
LAMD.routem = "805";
LAMD.stop_ids = ["LAM80216","LAM80215","LAM80209","LAM80210","LAM80211","LAM80212","LAM80213","LAM80214"];
addRouteToService(LAMD);

var LAME = new TRoute("LAME", "Metro E (Expo) Line");
LAME.common_name ="804 Metro E (Expo) Line";
LAME.cal = LAM_Cal;
LAME.routem = "804";
LAME.stop_ids = ["LAM80139","LAM80138","LAM80137","LAM80136","LAM80135","LAM80134","LAM80133","LAM80132","LAM80131",
"LAM80130","LAM80129",
"LAM80128","LAM80127","LAM80126","LAM80125","LAM80124","LAM80123","LAM80121","LAM80122",
"LAM81401","LAM81402","LAM81403", "LAM80407","LAM80406","LAM80405","LAM80404","LAM80403", "LAM80402","LAM80401"];
addRouteToService(LAME);

var LAMK = new TRoute("LAMK", "Metro K (Crenshaw) Line");
LAMK.common_name ="807 Metro K (Chreshaw) Line";
LAMK.cal = LAM_Cal;
LAMK.routem = "807";
LAMK.stop_ids = ["LAM80703","LAM80704","LAM80705","LAM80706","LAM80707","LAM80708","LAM80709", "LAM80301","LAM80302","LAM80303","LAM80304","LAM80701"];
addRouteToService(LAMK);





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

function ServiceCalendar(service_id, days, start_date, end_date, adds, dels)
{
  this.service_id = service_id;
  this.days = days;
  this.start_date = start_date;
  this.end_date = end_date;
  this.adds = adds;
  this.dels = dels;  
}

function TCalendar()
{
  this.calservices = [];
  this.addServiceDays = function(service_id, days, start_date, end_date, adds, dels)
  {
    var calserv = new ServiceCalendar(service_id, days, start_date, end_date, adds, dels);
    this.calservices.push(calserv);
  }

}

/*
var startdate = Number(process.argv[2]);
var enddate =   Number(process.argv[3]);
var calendars = [];
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

  
  
  writeStream2.write("LAM_Cal.addServiceDays(\""+ svcid + "\", \"" + days + "\", " + sdate + ", " + edate + ", \"" + adds + "\", \"" + dels + "\");\n");
  
}

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

var cals = [];
var tripcount = 1;

async function routesproc()
{
  var routeslength = Routes.length;
  var i = 0;
  for(i = 0; i < routeslength; i++)
  {
    var route_id = "LAM" + Routes[i].routem;
    var route = Routes[i];
    var cals_length = cals.length;
    var j = 0;
    for(j = 0; j<cals_length; j ++)
    {
      var cmd = 'grep ' + route_id + ',' + cals[j] +  ' data/trips.csv';
      var sid = cals[j];
      try {
      await execShellCommand(cmd).then( (data) => lineproc3(data, route, sid));
      } catch(e){};
    }
  }
}


async function lineproc3(data, route, sid)
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

           var cmd5 = 'grep ' + tid + ' data/stop_times.txt';
           await execShellCommand(cmd5).then( (dat) => lineproc5(dat, stps, d, route, sid));
           
        }
}
           
async function lineproc5(dat, stps, d, route, sid)           
{
           var tid = d[2];
           var sid = d[1];
           var shape_id = d[6];
           shape_id = shape_id.toString().trim();
           var headsign = "";
 //          var shortname = d[4];
           var dir = d[4];
           
 
           var st = [];
           var k7 = stps.length;
           for(var i7 = 0; i7 < k7; i7++)
           {
             st[i7] = "\"-1\"";   
           }
           var bmultiday = false;
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
             
 //          var jj = tid.indexOf("+");
 //          var jjj = tid.lastIndexOf("+");
 //          var tid2 = tid.substring(jj+ 1, jjj);
 //          dir = Number(tid.substring(jjj + 1));
             var stpn = "LAM" + dd[3];
             var b7 = true;
             var zi = 0;
             while(b7 && zi < k7)
             {
//               if(stps[zi].indexOf(stpn) != -1)
               if(stps[zi] == stpn)
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
             if(i5 == 0) headsign = dd[5];
                    
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
           tid = tid.toString().replace(/\+/g,'_');
//           tid = shortname; // + "_" + tripcount;
           tripcount += 1;
           var tn = "LAM" + tid + "_" + tripcount;
           s = "var " + tn + " = new TTrip(\"" + tn + "\", \"" + route.common_name + "\", " + dir + ", \"\");\n";
           s += tn + ".headsign = \"" + headsign + "\";\n";
           s += tn + ".tid = \"" + tid + "\";\n";
//           s += tn + ".short = \"" + shortname + "\";\n";
           s += tn + ".service_id = \"" + sid + "\";\n";
           if(shape_id != null)
           {
             s += tn + ".shape_id = \"" + shape_id + "\";\n";   
           }
           s += tn + ".times = [\n";
           writeStream2.write(s);
           writeStream2.write(s5);
                
           writeStream2.write("];\n");
           writeStream2.write(route.route_id + ".addTrip(" + tn + ");\n\n");
        
}



// main

console.log("makeLAMetroTripsFile");
 var now = new Date();
 var d = date.format(now, 'hh:mm A MMM DD YYYY');
 
 //MNR_Cal = cal.MNR_Cal;
 
 var k = LAM_Cal.calservices.length;
 var i = 0;
 for(i=0; i<k; i++)
 {
   cals.push(LAM_Cal.calservices[i].service_id);
 }
 
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
  
var writeStream2 = fs.createWriteStream('eo_LAMetroTrips.js');
writeStream2.write("\n// eo_LAMetroTrips.js " + d + "\n\n");
//writeStream2.write("MNR_Cal.addServiceDays(\"MNR_MF\", \"12345\", 20221112, 20231120, \"\", \"\");\n");
//writeStream2.write("MNR_Cal.addServiceDays(\"MNR_SA\", \"6\", 20221112, 20231120, \"\", \"\");\n");
//writeStream2.write("MNR_Cal.addServiceDays(\"MNR_SU\", \"0\", 20221112, 20231120, \"\", \"\");\n\n");
//writeStream2.write("\nMN1.cal = MNR_Cal;\nMN2.cal = MNR_Cal;\nMN3.cal = MNR_Cal;\nMN4.cal = MNR_Cal;\nMN5.cal = MNR_Cal;\nMN5A.cal = MNR_Cal;\nMN6.cal = MNR_Cal;\n\n");

routesproc();

    writeStream2.on('finish', () => {
    console.log('wrote all data to file');
    writeStream2.end();
    bRun = false;
    });

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
  
