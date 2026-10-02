// makeMNRTripsFile.js


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

var MN1 = new TRoute("MN1", "MN1");
MN1.common_name = "Metro North Hudson Line";
MN1.cal = MNR_Cal;
MN1.stop_ids = ["MNR_51","MNR_49","MNR_46","MNR_44","MNR_43","MNR_42", "MNR_40", "MNR_39","MNR_37",
"MNR_33","MNR_31","MNR_30","MNR_29","MNR_27","MNR_25","MNR_24", "MNR_23","MNR_22", "MNR_20","MNR_19","MNR_18","MNR_17","MNR_16","MNR_14","MNR_11","MNR_10","MNR_9","MNR_184","MNR_622", 
"MNR_4","MNR_1"];
MN1.stop_names = ["Poughkeepsie-NY", "New Hamburg-NY", "Beacon-NY", "Breakneck Ridge-NY","Cold Spring-NY", "Garrison-NY", "Manitou-NY","Peekskill-NY", "Cortlandt-NY", "Croton-Harmon-NY", "Ossining-NY", "Scarborough-NY", "Philipse Manor-NY", "Tarrytown-NY", "Irvington-NY", "Ardsley-on-Hudson-NY", "Dobbs Ferry-NY", "Hastings-on-Hudson-NY", "Greystone-NY", "Glenwood-NY", "Yonkers-NY", "Ludlow-NY", "Riverdale-NY", "Spuyten Duyvil-NY", "Marble Hill-NY", "University Heights-NY", "Morris Heights-NY", "Highbridge Yard","Yankees-E 153rd Street-NY","Harlem-125th St.-NY", "New York-Grand-Central-NY"
];
addRouteToService(MN1);

var MN2 = new TRoute("MN2", "MN2");
MN2.common_name = "Metro North Harlem Line";
MN2.cal = MNR_Cal;
MN2.stop_ids = ["MNR_177","MNR_176","MNR_101","MNR_100","MNR_99","MNR_98","MNR_97","MNR_94","MNR_91", "MNR_90","MNR_89","MNR_88","MNR_86","MNR_85","MNR_84","MNR_83","MNR_81","MNR_80", "MNR_79", "MNR_78", "MNR_76","MNR_74","MNR_72","MNR_71","MNR_68","MNR_66","MNR_65","MNR_64","MNR_62","MNR_61", "MNR_59","MNR_58","MNR_57","MNR_56","MNR_55","MNR_54","MNR_4", "MNR_1" ];
MN2.stop_names = [ "Wassaic-NY", "Tenmile River-NY", "Dover Plains-NY", "Harlem Valley-Wingdale-NY", "Appalachian Trail", "Pawling-NY", "Patterson-NY", "Southeast-NY", "Brewster-NY", "Croton Falls-NY", "Purdys-NY", "Goldens Bridge-NY", "Katonah-NY", "Bedford Hills-NY", "Mount Kisco-NY", "Chappaqua-NY", "Pleasantville-NY", "Hawthorne-NY", "Mount Pleasant-NY", "Valhalla-NY", "North White Plains-NY", "White Plains-NY", "Hartsdale-NY", "Scarsdale-NY", "Crestwood-NY", "Tuckahoe-NY", "Bronxville-NY", "Fleetwood-NY", "Mt Vernon West-NY", "Wakefield-NY", "Woodlawn-NY", "Williams Bridge-NY", "Botanical Garden-NY", "Fordham-NY", "Tremont-NY", "Melrose-NY", "Harlem-125th St.-NY", "New York-Grand-Central-NY"
];
addRouteToService(MN2);


var MN3 = new TRoute("MN3", "MN3");
MN3.common_name = "Metro North New Haven Line";
MN3.cal = MNR_Cal;
//MN3.stop_ids = ["MNR_151","MNR_149","MNR_190","MNR_145","MNR_143","MNR_140","MNR_188","MNR_138", "MNR_137","MNR_136","MNR_134","MNR_133","MNR_131","MNR_129","MNR_128","MNR_127","MNR_124", "MNR_121","MNR_120","MNR_118","MNR_116","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "MNR_108","MNR_106","MNR_105","MNR_56","MNR_4","MNR_1"];
MN3.stop_ids = ["MNR_151","MNR_149","MNR_190","MNR_145","MNR_143","MNR_140","MNR_188","MNR_138", "MNR_137","MNR_136","MNR_134","MNR_133","MNR_131","MNR_129","MNR_128","MNR_127","MNR_124", "MNR_121","MNR_120","MNR_118","MNR_116","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "MNR_108","MNR_106","MNR_105","MNR_56","MNR_622","MNR_4","MNR_1"];
MN3.stop_names = ["NewHaven_StateSt-CT","NewHaven-CT", "WestHaven-CT", "Milford-CT", "Stratford-CT", "Bridgeport-CT", "Fairfield Metro-CT", "Fairfield-CT", "Southport-CT","Green's Farms-CT","Westport-CT", "East Norwalk-CT", "SouthNorwalk-CT","Rowayton-CT","Darien-CT","Noroton Heights-CT", "Stamford-CT",
"Old Greenwich-CT", "Riverside-CT", "Cos Cob-CT", "Greenwich-CT", "Port Chester-NY",  "Rye-NY", "Harrison-NY", "Mamaroneck-NY", "Larchmont-NY", "NewRochelle-NY", "Pelham-NY", "Mt Vernon East-NY","Fordham-NY","Yankees-E153 St.","Harlem-125th St.-NY","New York-Grand-Central-NY"];
addRouteToService(MN3);

var MN4 = new TRoute("MN4", "MN4");
MN4.common_name = "Metro North New Caanan Line";
MN4.cal = MNR_Cal;
MN4.stop_ids = ["MNR_157","MNR_155","MNR_154","MNR_153",
"MNR_124", "MNR_121","MNR_120","MNR_118","MNR_116","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "MNR_108","MNR_106","MNR_105","MNR_56","MNR_4","MNR_1"];
MN4.stop_names = ["New Canaan-CT", "Talmadge Hill-CT", "Springdale-CT", "Glenbrook-CT", 
"Stamford-CT", "Old Greenwich-CT", "Riverside-CT", "Cos Cob-CT", "Greenwich-CT", "Port Chester-NY",  "Rye-NY", "Harrison-NY", "Mamaroneck-NY", "Larchmont-NY", "NewRochelle-NY", "Pelham-NY", "Mt Vernon East-NY","Fordham-NY","Harlem-125th St.-NY","New York-Grand-Central-NY"];
addRouteToService(MN4);

var MN5 = new TRoute("MN5", "MN5");
MN5.common_name = "Metro North Danbury Line";
MN5.cal = MNR_Cal;
MN5.stop_ids = ["MNR_165","MNR_164","MNR_163","MNR_162","MNR_161","MNR_160","MNR_158",
"MNR_131","MNR_129","MNR_128","MNR_127",
"MNR_124", "MNR_116","MNR_4","MNR_1"];
MN5.stop_names = ["Danbury-CT", "Bethel-CT", "Redding-CT", "Branchville-CT", "Cannondale-CT", "Wilton-CT", "Merritt 7-CT",
"SouthNorwalk-CT","Rowayton","Darien","Noroton Heights",
"Stamford-CT","Greenwich-CT","Harlem-125th St.-NY","New York-Grand-Central-NY"
];
addRouteToService(MN5);

var MN5A = new TRoute("MN5A", "MN5A");
MN5A.common_name = "Metro North Danbury Line";
MN5A.cal = MNR_Cal;
MN5A.stop_ids = ["MNR_165","MNR_164","MNR_163","MNR_162","MNR_161","MNR_160","MNR_158",
"MNR_131"];
MN5A.stop_names = ["Danbury-CT", "Bethel-CT", "Redding-CT", "Branchville-CT", "Cannondale-CT", "Wilton-CT", "Merritt 7-CT",
"SouthNorwalk-CT"
];
//addRouteToService(MN5A);

var MN6 = new TRoute("MN6", "MN6");
MN6.common_name = "Metro North Waterbury Line";
MN6.cal = MNR_Cal;
MN6.stop_ids = ["MNR_172","MNR_171","MNR_170","MNR_169","MNR_168","MNR_167",
"MNR_143", "MNR_140","MNR_131","MNR_124", "MNR_4","MNR_1"];
MN6.stop_names = ["Waterbury-CT", "Naugatuck-CT", "Beacon Falls-CT", "Seymour-CT", "Ansonia-CT", "Derby-Shelton-CT",
"Stratford-CT", "Bridgeport-CT", "SouthNorwalk-CT","Stamford-CT","Harlem-125th St.-NY", "New York-Grand-Central-NY"
];
addRouteToService(MN6);



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
    var route_id = Routes[i].route_id;
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
           var shape_id = d[7];
           var headsign = d[3];
           var shortname = d[4];
           var dir = d[5];
           
 
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
             
           var jj = tid.indexOf("+");
           var jjj = tid.lastIndexOf("+");
           var tid2 = tid.substring(jj+ 1, jjj);
           dir = Number(tid.substring(jjj + 1));
             var stpn = "MNR_" + dd[3];
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
           tid = shortname; // + "_" + tripcount;
           tripcount += 1;
           var tn = "MNR" + tid + "_" + tripcount;
//           s = "var " + tn + " = new TTrip(\"" + tn + "\", \"" + route.common_name + " " + shortname + "\", " + dir + ", \"\");\n";
           s = "var " + tn + " = new TTrip(\"" + tn + "\", \"" +  shortname + "\", " + dir + ", \"\");\n";
           s += tn + ".headsign = \"" + headsign + "\";\n";
           s += tn + ".tid = \"" + tid2 + "\";\n";
           s += tn + ".short = \"" + shortname + "\";\n";
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

console.log("makeMNRTripsFile");
 var now = new Date();
 var d = date.format(now, 'hh:mm A MMM DD YYYY');
 
 //MNR_Cal = cal.MNR_Cal;
 
 var k = MNR_Cal.calservices.length;
 var i = 0;
 for(i=0; i<k; i++)
 {
   cals.push(MNR_Cal.calservices[i].service_id);
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
  
var writeStream2 = fs.createWriteStream('eo_MNRtrips.js');
writeStream2.write("\n// eo_MNRtrips.js " + d + "\n\n");
//writeStream2.write("MNR_Cal.addServiceDays(\"MNR_MF\", \"12345\", 20221112, 20231120, \"\", \"\");\n");
//writeStream2.write("MNR_Cal.addServiceDays(\"MNR_SA\", \"6\", 20221112, 20231120, \"\", \"\");\n");
//writeStream2.write("MNR_Cal.addServiceDays(\"MNR_SU\", \"0\", 20221112, 20231120, \"\", \"\");\n\n");
writeStream2.write("\nMN1.cal = MNR_Cal;\nMN2.cal = MNR_Cal;\nMN3.cal = MNR_Cal;\nMN4.cal = MNR_Cal;\nMN5.cal = MNR_Cal;\nMN6.cal = MNR_Cal;\n\n");

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
  
