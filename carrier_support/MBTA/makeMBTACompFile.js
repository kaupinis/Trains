// makeMBTACompFile.js

//let MBTA_Cal = null;

/*
let Routes = [];

function MBTA.addRoute(r)
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

let CH0 = new TRoute("CH0", "CH0");
CH0.common_name = "CR-Haverhill";
CH0.routem = "CR-Haverhill";
CH0.cal = MBTA_Cal;
CH0.stop_ids = [
"WR-0329","WR-0325","WR-0264-02","WR-0228-02","WR-0205-02","NHRML-0152","NHRML-0127","NHRML-0078","NHRML-0073","NHRML-0055","WR-0163-S","WR-0120-S","WR-0099","WR-0085","WR-0075","WR-0067","WR-0062", "WR-0053-S", "WR-0045-S","BNT-0000"];
CH0.stop_names = ["Haverhill","Bradford","Lawrence","Andover","Ballardvale","Wilmington","Anderson/ Woburn","Winchester Center","Wedgemere","West Medford","North Wilmington","Reading","Wakefield","Greenwood","Melrose Highlands","Melrose Cedar Park","Wyoming Hill","Oak Grove", "Malden Center","North Station"];
MBTA.addRoute(CH0);

let CH1 = new TRoute("CH1", "CH1");
CH1.common_name = "CH1";
CH1.cal = MBTA_Cal;
CH1.stop_ids = [
"WR-0329","WR-0325","WR-0264-02","WR-0228-02","WR-0205-02","NHRML-0152","NHRML-0127","NHRML-0078","NHRML-0073","NHRML-0055","BNT-0000"];
CH1.stop_names = ["Haverhill","Bradford","Lawrence","Andover","Ballardvale","Wilmington","Anderson/ Woburn","Winchester Center","Wedgemere","West Medford","North Station"];
MBTA.addRoute(CH1);

let CH2 = new TRoute("CH2", "CH2");
CH2.common_name = "CH2";
CH2.cal = MBTA_Cal;
CH2.stop_ids = 
["Ballardvale-S", "North Wilmington-S", "Reading-S", "Wakefield-S", "Greenwood-S", "Melrose Highlands-S", "Melrose Cedar Park-S", "Wyoming Hill-S", "53270"];
CH2.stop_names =
["Ballardvale - Commuter Rail Shuttle","North Wilmington - Commuter Rail Shuttle",
"Reading - Commuter Rail Shuttle", "Wakefield - Commuter Rail Shuttle", "Greenwood - Commuter Rail Shuttle", "Melrose Highlands - Commuter Rail Shuttle","Melrose Cedar Park - Commuter Rail Shuttle", "Wyoming Hill - Commuter Rail Shuttle","Malden Center - West Busway"];
MBTA.addRoute(CH2);

            
let CN0 = new TRoute("CN0", "CN0");
CN0.common_name = "CR-Newburyport";
CN0.routem = "CR-Newburyport";
CN0.cal = MBTA_Cal;
CN0.stop_ids = [
"GB-0353-S","GB-0316-S","GB-0296","GB-0254","GB-0229","GB-0222","GB-0198",
"ER-0362","ER-0312-S","ER-0276-S","ER-0227-S","ER-0208",
"ER-0183","ER-0168-S","ER-0128","ER-0115","ER-0099","ER-0046","BNT-0000"];
CN0.stop_names = ["Rockport","Gloucester","West Gloucester","Manchester","Beverly Farms","Prides Crossing", "Montserrat", 
"Newburyport","Rowley","Ipswich","Hamilton/ Wenham","North Beverly",
"Beverly","Salem","Swampscott","Lynn","River Works / GE Employees Only","Chelsea","North Station"];
MBTA.addRoute(CN0);


let CL0 = new TRoute("CL0", "CL0");
CL0.common_name = "CR-Lowell";
CL0.routem = "CR-Lowell";
CL0.cal = MBTA_Cal;
CL0.stop_ids = [
"NHRML-0254","NHRML-0218","NHRML-0152","NHRML-0127","NHRML-0078","NHRML-0073","NHRML-0055","BNT-0000"];
CL0.stop_names = ["Lowell","North Billerica","Wilmington","Anderson/ Woburn","Winchester Center","Wedgemere","West Medford","North Station"];
MBTA.addRoute(CL0);


let CL1 = new TRoute("CL1", "CL1");
CL1.common_name = "CR-Lowell";
CL1.cal = MBTA_Cal;
CL1.stop_ids = ["Lowell","North Billerica","Wilmington","Anderson/ Woburn","Winchester Center","Wedgemere","West Medford","5271","113","114"];
CL1.stop_names = ["Lowell","North Billerica","Wilmington","Anderson/ Woburn","Winchester Center","Wedgemere","West Medford","Wellington Station Busway","Portland St @ Causeway St", "Causeway St @ North Station"];
MBTA.addRoute(CL1);

let CW0 = new TRoute("CW0", "CW0");
CW0.common_name = "CR-Worcester";
CW0.routem = "CR-Worcester";
CW0.cal = MBTA_Cal;
CW0.stop_ids = [
"WML-0442-CS","WML-0364","WML-0340","WML-0274","WML-0252","WML-0214","WML-0199","WML-0177","WML-0147","WML-0135","WML-0125","WML-0102-02","WML-0091-02","WML-0081-02","WML-0035","WML-0025","NEC-2276","NEC-2287"];
CW0.stop_names = ["Worcester","Grafton","Westborough","Southborough","Ashland","Framingham", "West Natick","Natick Center","Wellesley Square","Wellesley Hills","Wellesley Farms", "Auburndale","West Newton","Newtonville","Boston Landing","Yawkey","Back Bay","South Station"];
MBTA.addRoute(CW0);

let KP0 = new TRoute("KP0", "KP0");
KP0.common_name = "CR-Kingston";
KP0.routem = "CR-Kingston";
KP0.cal = MBTA_Cal;
KP0.stop_ids = [
"PB-0356-S","KB-0351-S","PB-0281","PB-0245-S","PB-0212-S","PB-0194-S","PB-0158-S","MM-0109-CS","MM-0079-S","MM-0023-S","NEC-2287"];
KP0.stop_names = ["Plymouth", "Kingston","Halifax","Hanson","Whitman","Abington","South Weymouth","Braintree", "Quincy Center", "JFK/UMASS","South Station"];
MBTA.addRoute(KP0);


let FT0 = new TRoute("FT0", "FT0");
FT0.common_name = "CR-Fitchburg";
FT0.routem = "CR-Fitchburg";
FT0.cal = MBTA_Cal;
FT0.stop_ids = [
"FR-3338-CS","FR-0494-CS","FR-0451","FR-0394","FR-0361","FR-0301","FR-0253","FR-0219","FR-0201","FR-0167","FR-0132","FR-0115","FR-0098","FR-0074","FR-0064","FR-0034","BNT-0000"];
FT0.stop_names = ["Wachusett","Fitchburg","North Leominster","Shirley","Ayer","Littleton/Rte 495","South Acton","West Concord","Concord","Lincoln","Kendal Green","Brandeis/ Roberts","Waltham","Waverley","Belmont","Porter Square","North Station"];
MBTA.addRoute(FT0);

let ND0 = new TRoute("ND0", "ND0");
ND0.common_name = "CR-Needham";
ND0.routem = "CR-Needham";
ND0.cal = MBTA_Cal;
ND0.stop_ids = [
"NB-0137-S","NB-0127-S","NB-0120-S","NB-0109-S","NB-0080-S","NB-0076-S","NB-0072-S","NB-0064-S","NEC-2237","NEC-2265","NEC-2276","NEC-2287"];
ND0.stop_names = ["Needham Heights","Needham Center","Needham Junction","Hersey","West Roxbury","Highland","Bellevue","Roslindale Village","Forest Hills","Ruggles","Back Bay","South Station" ];
MBTA.addRoute(ND0);

let FK0 = new TRoute("FK0", "FK0");
FK0.common_name = "CR-Franklin";
FK0.routem = "CR-Franklin";
FK0.cal = MBTA_Cal;
FK0.stop_ids = [
"FB-0303-S","FB-0275-S","FB-0230-S","FS-0049-S","FB-0191-S","FB-0177-S","FB-0166-S","FB-0148","FB-0143","FB-0125","FB-0118","FB-0109","DB-0095","NEC-2203","NEC-2265","NEC-2276","DB-2205","DB-2222","DB-2230","DB-2240","DB-2249","DB-2258","DB-2265","NEC-2287"];
FK0.stop_names = ["Forge Park / 495","Franklin","Norfolk","Foxboro","Walpole","Plimptonville","Windsor Gardens","Norwood Central","Norwood Depot","Islington","Dedham Corp Center", "Endicott","Readville","Hyde Park", "Ruggles","Back Bay","Fairmount","Blue Hill Avenue","Morton Street","Talbot Avenue","Four Corners / Geneva","Uphams Corner","Newmarket","South Station"];
MBTA.addRoute(FK0);

let FK1 = new TRoute("FK1", "FK1");
FK1.common_name = "FK1";
FK1.cal = MBTA_Cal;
FK1.stop_ids = [
"FB-0303-S","FB-0275-S","FB-0230-S","FB-0191-S","FB-0166-S","FB-0148","FB-0143","FB-0125","FB-0118","FB-0109","DB-0095","DB-2205","DB-2230","DB-2240","DB-2249","DB-2258","DB-2265","NEC-2287"];
FK1.stop_names = ["Forge Park / 495","Franklin","Norfolk","Walpole","Windsor Gardens","Norwood Central","Norwood Depot","Islington","Dedham Corp Center", "Endicott","Readville","Fairmount","Morton Street","Talbot Avenue","Four Corners / Geneva","Uphams Corner","Newmarket","South Station"];
MBTA.addRoute(FK1);

let FM0 = new TRoute("FM0", "FM0");
FM0.common_name = "CR-Fairmount";
FM0.routem = "CR-Fairmount";
FM0.cal = MBTA_Cal;
FM0.stop_ids = [
"FS-0049-S","FB-0118","DB-0095","DB-2205","DB-2222","DB-2230","DB-2240","DB-2249","DB-2258","DB-2265","NEC-2287"];
FM0.stop_names = ["Foxboro","Dedham Corp Center","Readville","Fairmount","Blue Hill Avenue","Morton Street","Talbot Avenue","Four Corners / Geneva","Uphams Corner","Newmarket","South Station"];
MBTA.addRoute(FM0);

let JUS = new TRoute("JUS", "Shuttle-BroadwayJFK");
JUS.common_name = "Shuttle-BroadwayJFK";
JUS.cal = MBTA_Cal;
JUS.stop_ids = ["151", "13", "121"];
MBTA.addRoute(JUS);

let CG0 = new TRoute("CG0", "CG0");
CG0.common_name = "CR-Greenbush";
CG0.routem = "CR-Greenbush";
CG0.cal = MBTA_Cal;
CG0.stop_ids = [
"GRB-0276-S","GRB-0233-S","GRB-0199-S","GRB-0183-S","GRB-0162-S","GRB-0146-S","GRB-0118-S","MM-0079-S","MM-0023-S","NEC-2287"];
CG0.stop_names = ["Greenbush","North Scituate","Cohasset","Nantasket Junction","West Hingham","East Weymouth","Weymouth Landing/ East Braintree","Quincy Center","JFK/UMASS","South Station" ];
MBTA.addRoute(CG0);

/*
let CG1 = new TRoute("CG1", "CG1");
CG1.common_name = "CR-Greenbush";
CG1.cal = MBTA_Cal;
CG1.stop_ids = ["Greenbush-S","North Scituate-S", "Cohasset-S", "Nantasket Junction-S", "West Hingham-S", "East Weymouth-S", "Weymouth Landing / East Braintree-S", "38671","121","South Station-S"];
MBTA.addRoute(CG1);
*/
/*
let ML0 = new TRoute("ML0", "ML0");
ML0.common_name = "CR-Middleborough";
ML0.routem = "CR-Middleborough";
ML0.cal = MBTA_Cal;
ML0.stop_ids = [
"MM-0356-S","MM-0277-S","MM-0219-S","MM-0200","MM-0186","MM-0150-S","MM-0109-CS","MM-0079-S","MM-0023-S","NEC-2287"];
ML0.stop_names = ["Middleborough/ Lakeville","Bridgewater","Campello","Brockton","Montello", "Holbrook/ Randolph","Braintree","Quincy Center","JFK/UMASS","South Station"];
MBTA.addRoute(ML0);
*/

let PS0 = new TRoute("PS0", "PS0");
PS0.common_name = "CR-Providence";
PS0.routem = "CR-Providence";
PS0.cal = MBTA_Cal;
PS0.stop_ids = ["SB-0189-S","SB-0156-S","NEC-1659-03","NEC-1768-03","NEC-1851","NEC-1919",
  "NEC-1969","NEC-2040","NEC-2108","NEC-2139","NEC-2173","NEC-2203",
  "NEC-2265","NEC-2276","NEC-2287"];
MBTA.addRoute(PS0);

let SC = new TRoute("SC", "South Coast Line");
SC.common_name = "SC";
SC.routem = "CR-NewBedford";
SC.cal = MBTA_Cal;
SC.transfers = "T_NEC-2287";
MBTA.addRoute(SC);


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

           let cmd5 = 'grep ' + tid + ' data/stop_times.txt';
           await execShellCommand(cmd5).then( (dat) => lineproc5(dat, d, route));
           
        }
}

let ttnum = 1;
           
async function lineproc5(dat, d, route)           
{
           let tid = d[2].trim();
//           tid = tid.replace("-", "");
           let sid = d[1].trim();
           let headsign = d[3].trim();
           let shape_id = d[7].trim();
           let dir = Number(d[5].trim());
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
           let a5 = dat.split("\n");
           let k5 = a5.length-1;
           let i5 = 0;
           let j5 = 0;
           let s5 = "";
           for(i5 = 0; i5 < k5; i5++)
           {
             let sg = "";
             let dd = a5[i5].split(",");
             let arr = dd[1].trim();
             arr = arr.substring(0, arr.lastIndexOf(":"));
             let dep = dd[2].trim();
             dep = dep.substring(0, dep.lastIndexOf(":"));
             
             
             if(dep == arr) sg = " \"" + dep + "\"";
             else sg += " \"" + arr + "/" + dep + "\"";
             
//             st[i5] = "{ stop_id: \"T_" + dd[3] + "\", tsa: \"" + arr + "\", tsd: \"" + dep + "\"}";
             
             if(dep == arr)
             {
               st[i5] = "{ s: \"T_" + dd[3] + "\", d: \"" + dep + "\"}";
                 
             }
             else
             {
               st[i5] = "{ s: \"T_" + dd[3] + "\", a: \"" + arr + "\", d: \"" + dep + "\"}";
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
           let tripid = "T_" + route.route_id + ttnum;
           s = "let " + tripid + " = new TTrip(\"" + tripid + "\", \"" + shortname + "\", " + dir + ", \"\");\n";
           s += tripid + ".headsign = \"" + headsign + "\";\n";
           s += tripid + ".tid = \"" + tid + "\";\n";
           s += tripid + ".short = \"" + shortname + "\";\n";
           s += tripid + ".service_id = \"" + sid + "\";\n";
           s += tripid + ".wc = \"" + d[8] + "\";\n";
           s += tripid + ".bike = \"" + d[11] + "\";\n";
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

console.log("makeMBTACompFile");
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
  
let writeStream2 = fs.createWriteStream('eo_MBTA3.js');
writeStream2.write("// eo_MBTA3.js " + d + "\n\n");


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
  
