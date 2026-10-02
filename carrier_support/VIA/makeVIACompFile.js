// makeVIATripsFile

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
  let svcid = row.service_id;
  let sdate = row.start_date;
  let edate = row.end_date;
  let days = "";
  if(row.sunday == 1) days += "0";
  if(row.monday == 1) days += "1";
  if(row.tuesday == 1) days += "2";
  if(row.wednesday == 1) days += "3";
  if(row.thursday == 1) days += "4";
  if(row.friday == 1) days += "5";
  if(row.saturday == 1) days += "6";
  let adds = "";
  let dels = "";
  */
  /*
  let cmd = 'grep \"' + svcid + '\" data/calendar_dates.csv';
  await execShellCommand(cmd).then( (data) => {
        let a = data.split("\n");
        let k = a.length-1;
        let i = 0;
        while(i < k)
        {
          let b = a[i].split(",");
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
  let route_id = row.AMRroute_id;
  let route_name = row.route_long_name;
  if(route_name.indexOf("Amtrak") == -1) route_name = "Amtrak " + route_name;
  if(route_name.indexOf("Thruway") != -1)
  {
    let aid = row.agency_id;
    let i = 0;
    let k = agency.length;
    let b = true;
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
  writeStream2.write("let " + route_id + " = new TRoute(\"" + route_id + "\", \"" +  route_name + "\");\n");
  writeStream2.write(route_id + ".cal = AM_Cal;\n");
//  writeStream2.write(route_id + ".stop_ids = \n");
  
  let cmd = 'grep ' + route_id + ',  data/trips.csv';
  await execShellCommand(cmd).then( (data) => lineproc3(data, route_id, route_name));
  
}
*/
  
async function routesproc()
{
  let routeslength = Routes.length;
  let i = 0;
  for(i = 0; i < routeslength; i++)
  {
    let route_id = Routes[i].route_id;
    let route = Routes[i];
//    if(route_id != "AMR51")
    if(typeof route.routem !== 'undefined')
    {
      let routem = route.routem;
    let cmd = 'grep ' + routem + ',  data/trips.txt';
    await execShellCommand(cmd).then( (data) => lineproc3(data, route)).catch(function(e) {
        console.log("373 " + e);
    });
    }
    else console.log("383 routem undefined for " + route.route_id);
  }
}


async function lineproc3(data, route)
{
  console.log("lineproc3 " + data);
//        writeStream2.write(route_id + ".stop_ids = [\n");
        let a = data.split("\n"); // all trips data for the route
        let b = true;
 //       let stps = route.stop_ids;
        let i = 0;
  
        let i3 = 0;
        let k = a.length-1;
        for(i3 = 0; i3 < k; i3++) // for each trip
        {
           let d = a[i3].split(",");
           let tid = d[2];
 //          let sid = d[1];
 //          let shape_id = null;
 //          if(d.length == 7)
 //          {
 //            shape_id = "AMS" + d[6];
 //          }
 //          let headsign = d[3];
 //          let shortname = d[4];
 //          let dir = d[5];

           let cmd5 = 'grep VIA' + tid + ' data/stop_times.csv';
           await execShellCommand(cmd5).then( (dat) => lineproc5(dat, d, route));
           
        }
}

let ttnum = 1;
           
async function lineproc5(dat, d, route)           
{
           let tid = d[2]; //.trim();
//           tid = tid.replace("-", "");
           let sid = d[1]; //.trim();
           let headsign = d[5]; //.trim();
           let shape_id = d[3]; //.trim();
           let dir = Number(d[6]); //.trim());
           if(dir == 0) dir = 1;
           else dir = 0;
           let jj = tid.indexOf("_") + 1;
           let shortname = d[4];
           
           let st = [];
           let k7 = 0
           let bmultiday = false;
           if(typeof route.multiday !== 'undefined')
           {
             if(route.multiday == true)  bmultiday = true;
           }
           console.log(dat);
           let a5 = dat.split("\n");
           let k5 = a5.length-1;
           let i5 = 0;
           let j5 = 0;
           let s5 = "";
           for(i5 = 0; i5 < k5; i5++)
           {
             let sg = "";
             let dd = a5[i5].split(",");
             let arr = dd[1]; //.trim();
             try{
             arr = arr.substring(0, arr.lastIndexOf(":"));
             }
             catch(e){}
             let dep = dd[2]; //.trim();
             try{
             dep = dep.substring(0, dep.lastIndexOf(":"));
             }
             catch(e){
             }
             
             if(dep == arr) sg = " \"" + dep + "\"";
             else sg += " \"" + arr + "/" + dep + "\"";
             
//             st[i5] = "{ stop_id: \"T_" + dd[3] + "\", tsa: \"" + arr + "\", tsd: \"" + dep + "\"}";
             if(i5 == k5-1)
             {
               st[i5] = "{ s: \"VIA" + dd[3] + "\", a: \"" + arr + "\"}";  
             }
             else if(dep == arr)
             {
               st[i5] = "{ s: \"VIA" + dd[3] + "\", d: \"" + dep + "\"}";
                 
             }
             else
             {
               st[i5] = "{ s: \"VIA" + dd[3] + "\", a: \"" + arr + "\", d: \"" + dep + "\"}";
             }
                    
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

           
//           s = "let ME" + tid + " = new TTrip(\"ME" + tid + "\", \"" + route.route_name + " " + shortname + "\", " + dir + ", \"\");\n";
//           let tripid = "VIA" + route.route_id + ttnum;
           let tripid = "VIA" + tid;
           s = "var " + tripid + " = new TTrip(\"" + tripid + "\", \"" + shortname + "\", " + dir + ", \"\");\n";
           s += tripid + ".headsign = \"" + headsign + "\";\n";
           s += tripid + ".tid = \"" + tid + "\";\n";
           s += tripid + ".short = \"" + shortname + "\";\n";
           s += tripid + ".service_id = \"" + sid + "\";\n";
//           s += tripid + ".wc = \"" + d[8] + "\";\n";
//           s += tripid + ".bike = \"" + d[11] + "\";\n";
           if(shape_id != null)
           {
             s += tripid + ".shape_id = \"" + shape_id + "\";\n";   
           }
           if(bmultiday && (route.route_name.indexOf("Connect") == -1)) 
           {
               s += tripid + ".multiday = true;\n";
               console.log("920 " + tripid + " " + route.route_id);
           }
           s += tripid + ".comp = [\n";
           writeStream2.write(s);
           writeStream2.write(s5);
                
           writeStream2.write("];\n");
           writeStream2.write(route.route_id + ".addTrip(" + tripid + ");\n\n");
           ttnum += 1;
}



// main

console.log("makeVIACompFile");
 let now = new Date();
 let d = date.format(now, 'hh:mm A MMM DD YYYY');
// let routea = [];
routesproc();
/*
let writeStream = fs.createWriteStream('eo_AM_cal.js');
writeStream.write("// eo_AM_cal.js " + d + "\n\n");
writeStream.write("let AM_Cal = new TCalendar();\n");
writeStream.write("AM_Cal.lastUpdated = \"" + d + "\";\n\n");

let csvreader = fs.createReadStream('data/calendar.txt').pipe(csv())
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
  
let writeStream2 = fs.createWriteStream('eo_VIA3.js');
writeStream2.write("// eo_VIA.js " + d + "\n\n");


/*
let csvreader = fs.createReadStream('data/routes.csv').pipe(csv())
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
  
