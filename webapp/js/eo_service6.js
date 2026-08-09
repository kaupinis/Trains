// eo_service6.js
"use strict";


let EURL = "https://www.eightolives.com/";
let EOS = "https://www.eightolives.com/forms/eo_Trains.php";
let EOS1 = "https://www.eightolives.com/forms/eo_Trains1.php";
let EMS = "https://www.eightolives.com/forms/eo_map.php";
let EOX = "https://www.eightolives.com/forms/trains_feedback.php";
let EOT = EURL + "docs/Trains/data/";
let SURL = "https://api-v3.mbta.com/";

//let TOK = true;
//let SBL = null;

let ttime = 0;
//let eo_base = null;
let homeport = 0;

const WC0 = "Minor to moderate accessibility barriers exist for wheelchairs. Operator may need to relocate for safe boarding and exiting."; 
const WC1 = "Stop is wheelchair accessible.";
const WC2 = "Significant accessibility barriers exist at stop. Customers using wheeled mobility devices may need to board at street level.";

let HeaderVersion = "MBTA-Version: 2018-07-23";

function saveLocal(fname, data)
{
  if(navigator.cookieEnabled) localStorage.setItem(fname, data);
}

function getLocal(fname)
{
  let x = null;
  if(navigator.cookieEnabled) x = localStorage.getItem(fname);
  return(x);   
}

function removeLocal(fname)
{
  if(navigator.cookieEnabled) localStorage.removeItem(fname);   
}

function status4(response)
{
  if (response.status >= 200 && response.status < 300) {
    return(Promise.resolve(response))
  } else {
    return(Promise.reject(new Error(response.statusText)));
  }
}


function getMBTAData(cmd, options)
{
  let u = EOS1 + "?f=1&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&n=" + cmd + "&arg1=" + options;
  report("getMBTAData u = " + u);
  return(fetch(u));
   
}

function getXHRP4(u)
{
  let p = new Promise(function(resolve, reject) {
    fetch(u).then(function(response) {
      if(response.ok)
      {
        resolve(response.text());
      }
      else reject(response.status);
    } ).catch(function(error) {
      reject(error);
    } )});
  return(p);
}


function getXHRP(u)
{
  return(getXHRP4(u));
}


/*
function getXHRP3(u)
{
   let p = new Promise(function(resolve, reject) {
   nocache = "?nocache=" + Math.random() * 1000000;
   let request = new XMLHttpRequest();
   if("withCredentials" in request) 
   {
     //request.open("GET", u + nocache, true);
     request.open("GET", u, true);
   }
   else if (typeof XDomainRequest != "undefined") // IE
   {
    // XDomainRequest for IE.
     request = new XDomainRequest();
     request.open("GET", u);
   } 
   else 
   {
     // CORS not supported.
     report("CORS not supported by browser.");
     request = null;
   }
   if(request != null)
   {
     if(useAuth && (auth != null)) request.setRequestHeader("Authorization", auth);
//     request.onreadystatechange = function(){
     request.onload = function(){
       if(typeof request === 'undefined') report("getXHRP request is undefined");
       else if(request == null) report("getXHRP request is null");
       else if(request.readyState == 4)
       {
 //         report("getXHRP " + request.status + " " + request.statusText);
         if(request.status != "200")
         {
           let s  = request.status.toString();
           if(s.indexOf("404") != -1) b = true;
           b = true;
           report("getXHRP Unable to access  " + request.status + " " + request.statusText + " " + u);
           reject("getXHRP Unable to access  " + request.status + " " + request.statusText + " " + u);
           if(s.indexOf("500") != -1) request.abort();
         }
         else
         {
           resolve(request.responseText);
         }
       }   
       };
     request.onerror = function() {
//         request.abort();
         reject("getXHRP error " + this.status + " " + request.statusText);
     };
     request.ontimeout = function () 
      {
      report("The request for " + u + " timed out.");
      reject("The request for " + u + " timed out.");
      request = null;
      };
     request.timeout = Number(document.getElementById("serv_to")) * 1000;
     request.send("");
   }
   } );
   return(p);
}
*/

//Service3.prototype = new Service();

//Service3.prototype.constructor = Service3;


function Service3()
{
this.cname = "Service3";
let baseURL = eo_base;
this.fcp = null;
this.bsec = true;
this.baseURL = baseURL; 
}

Service3.prototype.findConnections = function(startid, destid, datetime, startmode, startindex, destmode, destindex)
{
  let ca = [];
  let cnx = new Connections(startid, destid, datetime, startmode, startindex, destmode, destindex );
  let p= cnx.findConnections();
  return(p);
}

Service3.prototype.getNearbyStops = function(lat, lon)
{
//  report("getNearbyStops");
  let p = new Promise(function(resolve, reject) {
    if((lat != 0) && (lon != 0))
    {
      if(typeof SKEY === 'undefined')
      {
        bOnLine = false;
        reject("SKEY is undefined.");
      }
      else
      {
        let p1 = getStopsByLocation3(lat, lon);
        p1.then(function(value) {
          resolve(value);  
        } ).catch(function(error) {
          reject(error);  
        } );
      }
    }
    else{
      report("lat = " + lat + " lon = " + lon); 
      reject("Location services are OFF");
    }
  } );
  return(p);
}


function getStopsByLocation3(lat, lon)
{
// dreport("getStopsByLocation3 " + lat + " " + lon);
 let p1 = new Promise(function(resolve, reject){
 let tn = Date.now();
 if(typeof SKEY !== 'undefined')
 {
  ttime = tn;
  let u = SURL + "stops?api_key=" + SKEY + "&filter[latitude]=" + lat + "&filter[longitude]=" + lon;
//  let u = "{filter[latitude]=" + lat + "{filter[longitude]=" + lon;
//  let p = getMBTAData("stops", u);
  let p = getXHRP4(u);
  p.then(function(data){
    if(data != null) 
    {
//      report("\n224 Got data:\n" + s);
      let t = JSON.parse(data);
//      report("Found stops nearby: " + data); 
      let s = getStops2From3(t, lat, lon);
//      report("\nMade data:\n" + s);
      t = JSON.parse(s);
      t.stop.sort(stopCompare);
      resolve(t.stop);
   //   }
  //    else report("No nearby stops found. " + lat + " " + lon);
    }
  } ).catch(function(error){
//    TOK = false;
//    report("Link to T failed for " + u + " " + error);
    reject("gsbL3 Link to T failed for " + u + " " + error);
  } );
 }
 else if(typeof SKEY === 'undefined')
 {
   resolve(new Array());   
 }
 else reject("getStopsByLocation3 error ");
} );
return(p1);
}

function getStops2From3(t, lat, lon)
{
   let s = null;
//   if(t.data.length > 0)
   {
     s = "{ \"stop\" : [";
     let k = t.data.length;
     let i = 0;
     while(i < k)
     {
        if(i != 0) s += ",";
        let d = t.data[i];
        let stop_id = d.id;
        let stop_name = d.attributes.name;
        let stop_lat = d.attributes.latitude;
        let stop_lon = d.attributes.longitude;
        let stop_description = d.attributes.description;
        let distance = getDistanceBetween(stop_lat, stop_lon, lat, lon);
        s += "{ \"stop_id\": \"" + stop_id + "\", \"stop_name\": \"" + stop_name + "\", \"stop_lat\": \"" + stop_lat + "\", \"stop_lon\": \"" + stop_lon + "\", \"distance\": \"" + distance + "\", \"stop_desc\": \"" + stop_description + "\" }";
        i += 1;
     }
     s += "]}";
   }
   return(s);
}

Service3.prototype.getShapeIdByRoute = function(route_id)
{
// report("getShapeByRoute " + route_id);
 let p1 = new Promise(function(resolve, reject){
 let tn = Date.now();
 if((tok && ((tn - ttime) > 1000)) && (typeof SKEY !== 'undefined'))
 {
  ttime = tn;
  let u = SURL + "shapes?api_key=" + SKEY + "&filter[route]=" + route_id + "&include=stop";
  let p = getXHRP4(u);
  p.then(function(data){
    if(data != null) 
    {
//      report("Found getShapeIdByRoute: " + data); 
      let t = JSON.parse(data);
      if(t.data.length > 0)
      {
//        report("shape_id = " + t.data[0].id);
        resolve(t);
      }
      else
      {
        reject("shape no data");
      }
    }
  } ).catch(function(error){
    reject("gsibr3 Link to T failed for " + u + " " + error);
  } );
 }
 else if(typeof SKEY === 'undefined')
 {
   resolve(new Array());   
 }
 else reject("getShapeIdByRoute3 error " + (tn - ttime));
} );
return(p1);
}

Service3.prototype.getRoutesByStop = function(stop_id)
{
 report("getRoutesByStop " + stop_id);
 let p1 = new Promise(function(resolve, reject){
 let tn = Date.now();
 if((tok && ((tn - ttime) > 10000)) && !(TKEY === undefined))
 {
  ttime = tn;
  let u = SURL + "routes?api_key=" + SKEY + "&filter[stop]=" + stop_id;
  let p = getXHRP4(u);
  p.then(function(data){
    if(data != null) 
    {
      if(bReport) report("getRoutesByStop " + stop_id + " found:" + data);
      let t = JSON.parse(data);
      resolve(t);
    }
  } ).catch(function(error){
    report("grbs Link to T failed for " + u + " " + error);
    reject("grbs Link to T failed for " + u + " " + error);
  } );
 }
 else reject("getRoutesByStop error " + (tn - ttime));
} );
return(p1);
}


Service3.prototype.getAlertHeadersByStop = function(stop_id)
{
 report("getAlertHeadersByStop " + stop_id);
 let p1 = new Promise(function(resolve, reject){
 if(isAmtrak1(stop_id))
 {
      
 }
 else if((typeof SKEY !== 'undefined'))
 {
   let u = SURL + "alerts?api_key=" + SKEY ; //+ "&filter[stop]=" + stop_id;
   let p = getXHRP4(u);
   p.then(function(data){
    if(data != null) 
    {
      let t = JSON.parse(data);
//      report("AlertHeadersByStop Found: " + data ); 
      let s = getAlertsByStop(t);
      if(s == null) reject("getAlertHeadersByStop data is null");
      else
      {
//        report("AlertHeadersByStop data: " + s ); 
        t = JSON.parse(s);
        resolve(t);
      }
    }
    else report("getAlertHeadersByStop data is null");
  } ).catch(function(error){
    dreport("gahs Link to T failed for " + u + " " + error);
    reject("gahs Link to T failed 2 for " + u + " " + error);
    } );
  }
  else
  {
    reject("getAlertHeadersByStop SKEY is undefined");   
  }
   
 } );
 return(p1);
}

function getAlertsByStop(t)
{
  let s = "";
  
  return(s);
}

function stopCompare(a, b)
{
let x = a.distance;
let y = b.distance;
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

let SBS = null;
let SBS_stop = null;

/*
Service3.prototype.getPredictionByStop2 = function(stop_id)
{
  let bReport = document.getElementById("rp").checked;
  let bok = window.location.href.indexOf("https") == 0;
  let dtime = getTTime();
//  if(bReport) 
      report("Servic3.getPredictionByStop2 " + stop_id);
  let p = null;
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }
  
  if(bOnLine)
  {
    if(SUB[16] != null)
    {
      let ctime = SUB[16].header.timestamp.low;
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(16);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(16);
      }
    }
    else queueSUB(16);
    if(SUB[17] != null)
    {
      let ctime = SUB[17].header.timestamp.low;
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(17);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(17);
      }
    }
    else queueSUB(17);
    p = new Promise (function(resolve, reject){
      if(SBS_stop != stop_id)
      {
        let p2 = service.getScheduleByStop(stop_id, document.getElementById("max_time").value, document.getElementById("max_trips").value, getTTime()).then(function(t) {
         SBS = t;
         SBS_stop = stop_id;
        }).catch(function(e) {
            report(e);
        });
      }
      else
      {
         if(SUB[16] != null)
         {
           let feed = null;
           feed = SUB[16];
//           console.log(JSON.stringify(feed));
           report(JSON.stringify(feed, null, 4));
           if(bReport) 
               report("got feed for " + stop_id + " " + feed.header.timestamp.low + " " + dtime);
           //t, feed, tripprefix, routeprefix, stopprefix
           report("got here 452");
           combine(SBS, feed, "", "", "");
           report("454");
//           let routes = getRoutesS(stop_id);
         }
         resolve(SBS);
      }
    });
  }
  return(p);
}
*/

function combineT(ts, t)
{
  report("476 ts = " + JSON.stringify(ts, null, 4));
  report("477 t = " +  JSON.stringify(t, null, 4)); 
}

Service3.prototype.getScheduleByStop = function(stop_id, max_time, max_trips, datetime)
{
 report("474 Service3 getScheduleByStop " + stop_id + " " + (new Date()).toLocaleTimeString());
 let stop_idold = getOldTstop(stop_id);   
 let bReport = document.getElementById("rp").checked;
 //if(!isCarrierLoaded("MBTA")) loadCarrier("MBTA");
 let estop = stop_idold.replace(" ", "%20");
// let stop_id = estop;
 let mtime = Math.round(max_time);
 if(mtime < 5) mtime = 5;
 if(mtime > 1440) mtime = 1440;
 let mtrips = max_trips;
 if(mtrips < 5) mtrips = 5;
 if(mtrips > 100) mtrips = 100;
 
 let tc = null;
 if(datetime == null) tc = new Date();
 else tc = new Date(datetime * 1000);
 let mm = (tc.getMonth() + 1).toString();
 if(mm.length == 1) mm = "0" + mm;
 let dd = tc.getDate().toString();
 if(dd.length == 1) dd = "0" + dd;
 let fdate = (tc.getFullYear()).toString() + "-" + mm + "-" + dd;
 let min_time = (tc.getHours()).toString();
 if(min_time.length == 1) min_time = "0" + min_time;
 mm = tc.getMinutes().toString();
 if(mm.length == 1) mm = "0" + mm;
 min_time = min_time + ":" + mm;

// report("503 Service3.getScheduleByStop " + stop_id + " " + tc.toLocaleDateString() + " " + tc.toLocaleTimeString());
 let p1 = null;
 if(!isCarrierLoaded("MBTA"))
 {
     p1 = loadCarrier("MBTA");
 }
 else p1 = new Promise(function(resolve, reject){
  let tam = null;

 let tn = Date.now();
 if(tok && ((tn - ttime) > 1000) )
 {
     let p5 = serviceT.getScheduleByStop(stop_id, document.getElementById("max_time").value, document.getElementById("max_trips").value, tc);
     p5.then(function(data){
       if(data != null) 
       {
           report("528 " + data);
         let ts = data;
         if((typeof SKEY !== 'undefined') && bOnLine)
         {
             /*
           let u = SURL + "schedules?api_key=" + SKEY + "&filter[stop]=" + stop_idold + "&filter[date]=" + fdate + "&filter[min_time]=" + min_time + "&page[limit]=" + 10 * max_trips + "&include=trip,route,stop,prediction";
           let p6 = fetch(u).then( function(data) 
           */
           serviceEO.getMBTAScheduleByStop(stop_id, fdate, min_time, max_trips).then( function(data) {
               let t = "";
               try {
                 t = JSON.parse(data);
               }
               catch(e){};
               if(t.data.length == 0) reject("getScheduleByStop data length is 0");
               let s = getSchedule2FromS(t, stop_idold);
               if(s != null)
               {
                 t = JSON.parse(s);
                 combineT(ts, t);
                 resolve(ts);
               }
            }).catch(function(e) {
              resolve(ts);   
            });
         }
         else resolve(ts);
       }
       else
       {
         resolve(new Array());
       }
       }).catch(function(error){
         resolve(new Array());   
       });
 }
 else reject("551 ");
 });  
return(p1);
}

function getSchedule2FromS(d3, stop_id)
{
  let s = "";
  let wchair = null;
  if(d3.data.length != 0)
  {
  s = "{\"stop_id\": \"" + stop_id + "\", \"stop_name\": \"" + getStopNameFromID(stop_id) + "\", ";
    let tj = getThisTypeInfo("stop", stop_id, d3);
    if(tj != null)
    {
      wchair = tj.attributes.wheelchair_boarding;
      s += "\"wchair\": \"" + wchair + "\", ";
    }
  s += "\"mode\": [{ \"route_type\": \"2\", \"mode_name\": \"Rail\",\"route\": [";
  let k = d3.data.length;
//  report("d3.data.length = " + k);
  let i = 0;
  let brf = true;
  let routes = [];
  let trip_ids = [];
  while(i < k)
  {
    if(brf) brf = false;
    else s +=",";
    let tr = d3.data[i];
    let route_id = tr.relationships.route.data.id;
    routes = addUniqueElement(routes, route_id);
    let tg = getThisTypeInfo("route", route_id, d3);
    let route_name = tg.attributes.long_name;
    s += "{ \"route_id\": \"" + route_id + "\", \"route_name\": \"" + route_name + "\", ";
    s += " \"direction\": [";

    let dir = -1;

    let trip_id = tr.relationships.trip.data.id;
    
    let ta = getOldTime(tr.attributes.arrival_time);
    let td = getOldTime(tr.attributes.departure_time);

    let tf = getThisTypeInfo("trip", trip_id, d3);
    let headsign = "";
    let trip_name = "";
    let wchair = "";
    let bikes = "";
    if(tf == null)
    {
      trip_id = tr.relationships.trip.data.id; 
      let tq = getSimilarTripInfo(route_id, dir, d3);
      if(tq != null)
      {
        headsign = tq.attributes.headsign + ("?");
        trip_name = tq.attributes.name + ("?");
        wchair = tq.attributes.wheelchair_accessible;
      }
    }
    else
    {
      headsign = tf.attributes.headsign;
      trip_name = tf.attributes.name;
      wchair = tf.attributes.wheelchair_accessible;
      bikes = tf.attributes.bikes_allowed;
      dir = tf.attributes.direction_id;
    }
    
    if(headsign.length > 0) headsign.replace("\'", "");
    
    let vehx = "";
    if(typeof tr.relationships.vehicle !== 'undefined') vehx = tr.relationships.vehicle.data.id;
    let vlabel = "";
    if((vehx != null) && (vehx != ""))
    {
      tf = getThisTypeInfo("vehicle", vehx, d3);
      vlabel = tf.attributes.label;
    }
    let dname = tg.attributes.direction_names[dir];
    s += "{\"direction_id\": \"" + dir + "\", \"direction_name\": \"" + dname + "\",  \"trip\": [ ";
    s += "{\"trip_id\": \"" + trip_id + "\", \"trip_name\": \"" + trip_name + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\", \"trip_name\": \"" + trip_name + "\", \"trip_headsign\" : \"" + headsign + "\", \"wchair\" : \"" + wchair + "\", \"bikes\" : \"" + bikes +  "\", \"route_name\": \"" + route_name + "\", \"veh_label\": \"" + vlabel + "\", \"veh_id\": \"" + vehx + "\"";
    if(tr.relationships.prediction.data != null)
    {
    let pjid = tr.relationships.prediction.data.id;
    if((pjid != null) && (pjid != ""))
    {
      let tj = getThisTypeInfo("prediction", pjid, d3);
      let pre_dt = "";
      if(tj != null)
      {
        pre_dt = getOldTime(tj.attributes.departure_time);
        if(pre_dt == "null") pre_dt = getOldTime(tj.attributes.arrival_time);
        let stat = tj.attributes.status;
        let track = tj.attributes.track;
        s += ", \"pre_dt\": \"" + pre_dt + "\", \"pred\":\"true\", \"track\":\""
    + track + "\", \"status\": \"" + stat + "\"";
      }
    }
    }
    s += "}";
    s += "]}"; // end of direction
    s += "]}"; // end of route
    i += 1;
  }
  s += "]}]}";
  
  if(DISPLAYTYPE == 0)
  {
  clearArray(DT0Alerts);
  i = 0;
  k = d3.included.length;
  let j = 0;
  while(i < k)
  {
    let t = d3.included[i];
    if(t.type == "alert")
    {
      let a = {alert_id : t.id, header_text: t.attributes.header,
      description: t.attributes.description, cause: t.attributes.cause, severity: t.attributes.severity, effect: t.attributes.effect};
      DT0Alerts[DT0Alerts.length] = a;
      j += 1;
    }
    
    i += 1;
  }
  if(AlertData != null)
  {
    k = AlertData.length;
    i = 0;
    let ps = getParentIdFromId(stop_id);
    while(i < k)
    {
      let t = AlertData[i];
      if(isIeStop(t, stop_id, ps, routes))
      {
        let a = {alert_id : t.id, header_text: t.attributes.header,
          description: t.attributes.description, cause: t.attributes.cause, severity: t.attributes.severity, effect: t.attributes.effect};
        if(!ainD(a, DT0Alerts)) DT0Alerts[DT0Alerts.length] = a;
      }
      i += 1;
    }
  }
  /*
  if(WxAlerts.length > 0)
  {
    DT0Alerts = WxAlerts.concat(DT0Alerts);
  }
  */
//  else 
  if(NOW - lastAlertsUpdate > 900000)
  {
    lastAlertsUpdate = NOW; 
    Weather.getWXalertsByStop(Place_id) 
  }
//  report("alerts found = " + j);
  } 

  }
  
  
  return(s);
}

function ainD(a, d)
{
  let aid = a.alert_id;
  let k = d.length;
  let i = 0;
  let b = false;
  while(!b && (i < k))
  {
    if(aid == d[i].alert_id) 
    {
        b = true;
    }
    i += 1;
  }
  return(b);
}

function isIeStop(a, stopid, ps, routes)
{
  let ies = a.attributes.informed_entity;
  
  let k = ies.length;
  let i = 0;
  let b = false;
  while(!b && (i < k))
  { 
    if(stopid == ies[i].stop) b = true;
    else if((ps != null) && (ps == ies[i].stop)) b = true;
//    else if((route != null) && (route == ies[i].route)) b = true;
    i += 1;   
  }
  if(!b)
  {
    kk = routes.length;
    ii = 0;
    i = 0;
    while(!b && (i < k))
    {
      while(!b && (ii < kk))
      {
        let route = routes[ii];
        if((route != null) && (route == ies[i].route)) b = true;
        ii += 1;
      }
      i += 1;   
    }
  }
//  report("  isIeStop + " + b + " " + stopid + " " + ps + " " + route);
  return(b);  
}

function isEndStop(stop_id)
{
  let b = false;
  let pid = getParentIdFromId(stop_id);
  const Ends = ["place-lech","place-river","place-hsmnl","place-bomnl","place-wondl","place-ogmnl", "place-forhl","place-alfcl","place-clmnl","place-asmnl","place-brntn","place-lake"];
  let k = Ends.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(pid == Ends[i])
    {
      b = true;
    }
    i += 1;
  }
  return(b);
}

function getDirectedArray(n, b)
{
  let a = [];
  let k = b.length;
  let i = 0;
  while(i < k)
  {
    if(b[i].attributes.direction_id == n)
    {
      a[a.length] = b[i];   
    }
    i += 1;
  }
  return(a);
}

function getNewTstop(tstop)
{
  let r = tstop;
  if((tstop.indexOf("T_") == -1) && (tstop.indexOf("TB_") == -1))
  {
    if(!isNaN(tstop))
    {
      let gg = Number(tstop);
      if((gg >= 70001) && (gg <= 70999)) r = "T_" + tstop;
      else r = "TB_" + tstop;   
    }
    else
    {
      r = "T_" + tstop;   
    }
  }
  return(r)
}

function getOldTstop(tstop)
{
  let r = tstop;
  if(tstop.indexOf("T_") == 0) r = tstop.substring(2);
  else if(tstop.indexOf("TB_") == 0) r = tstop.substring(3);
  return(r);
}

function getRelativeTime(dtf)
{
  let s = null;
  if(dtf != null)
  {
    let d = new Date(dtf);
    s = Math.round(d.getTime() / 1000).toString();
  }
  return(s);  
}

function combinePT(tsked1, dj)
{
  let tsked = tsked1;
  let bNew = false;
//  report("835 : " + dj.data.length + " " + JSON.stringify(dj, null, 4));
  let aa = null;
  let k = dj.data.length;
  let i = 0;
  for(i=0; i<k; i++)
  {
    let d = dj.data[i];
    if(d.type == "prediction")
    {
    let trip_id = d.relationships.trip.data.id;
    let tpa = getRelativeTime(d.attributes.arrival_time);
    let tpd = getRelativeTime(d.attributes.departure_time);
    let dir = d.attributes.direction_id;
    let veh_id = "";
    if(d.relationships.vehicle.data != null) veh_id = d.relationships.vehicle.data.id;
    let bikes = "";
    let status = "";
    if(d.attributes.schedule_relationship == "CANCELLED") status = "Cancelled";
    let asstop = "";
    
    let ix = 0;
    let kx = dj.included.length;
    let bx = true;
    while(bx && (ix < kx))
    {
      let dd = dj.included[ix];
      if(dd.id == veh_id)
      {
        if(status == "") status = dd.attributes.current_status;
        if(dd.relationships.stop.data != null)
        {
          asstop = dd.relationships.stop.data.id;
        }
      }
      if(dd.id == trip_id)
      {
        bikes = dd.attributes.bikes_allowed;   
      }
      ix += 1;
    }
    
    let b = true;
    let i1 = 0;
    let k1 = tsked.mode.length;
    while(b && (i1 < k1))
    {
      let i2 = 0;
      let k2 = tsked.mode[i1].route.length;
      while(b && (i2 < k2))
      {
        let i3 = 0;
        let k3 = 2;
        while(b && (i3 < k3))
        {
          let a = tsked.mode[i1].route[i2].direction[i3];
//          if(typeof a === 'undefined') report("875 " + i + " " + i1 + " " + i2 + " " + i3);
          if((typeof a !== 'undefined')) // && (a.direction_id == dir))
          {
            let i4 = 0;
            let k4 = a.trip.length;
            while(b && (i4 < k4))
            {
              if(a.trip[i4].tid == trip_id)
              {
                b = false;
                aa = a.trip[i4];
                aa.pred_arr_dt = tpa;
                aa.pred_dep_dt = tpd;
                aa.pred = "true";
                if(bikes != "") aa.bikes = bikes;
                if(status != "") aa.vstat = status;
                if(asstop != "") aa.vstopid = "TB_" + asstop;
                
              }
              else i4 += 1;
            }
            /*
            if(b) // add trip
            {
              let o = new Object();
              o.trip_id = trip_id;
              o.trip_name = "Added";
              o.trip_headsign = "Route " + d.relationships.route.data.id;
              o.sch_arr_dt = tpa;
              o.sch_dep_dt = tpd;
              o.pred_arr_dt = tpa;
              o.pred_dep_dt = tpd;
              if(bikes != "") o.bikes = bikes;
              if(status != "") o.vstat = status;
              if(asstop != "") o.vstopid = asstop;
              o.trip_headsign = "Added";
              a.trip.push(o);
            }
            */
          }
          i3 += 1;
        }
        i2 += 1;
      }
      i1 += 1;
    }
  }
  }
}

Service3.prototype.getPredictionByStop = function(stop_id1)
{
//  let stop_idnew = getNewTstop(stop_id1);
//    report("920 getPredictionByStop " + stop_id1);
  let bsubway = isTsubwayStop(stop_id1);
  let stop_idold = getOldTstop(stop_id1);
//  let m = stop_id1.charAt(0);
//  report("892 m = " + m);
//  else if(

/*  
//  serviceEO.getMBTAScheduleByStop(stop_id1, fdate, min_time, max_trips).then(function (tsked) {
  serviceEO.getMBTAPredictionsByStop(stop_id1).then( function(d) {
      report("966 " + JSON.stringify(d, null, 4));
  }).catch( function(e) {
      report("968 error " +  e);
  });
  */
            
  let bReport = document.getElementById("rp").checked;
 let tc = new Date();
 let mm = (tc.getMonth() + 1).toString();
 if(mm.length == 1) mm = "0" + mm;
 let dd = tc.getDate().toString();
// report("dd = " + dd);
 if(dd.length == 1) dd = "0" + dd;
 let fdate = (tc.getFullYear()).toString() + "-" + mm + "-" + dd;
 let min_time = (tc.getHours()).toString();
 if(min_time.length == 1) min_time = "0" + min_time;
 mm = tc.getMinutes().toString();
 if(mm.length == 1) mm = "0" + mm;
 min_time = min_time + ":" + mm;
//  if(bReport) 
//  report("927 getPredictionByStop " + stop_idold + " " + stop_id1 + " " + (new Date()).toLocaleTimeString());
//  let u = EOS + "?f=6&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop_idold + "&format=json";
// report("929: u = " + u);
 let p1 = new Promise(function(resolve, reject){
     if((bsubway) || (stop_id1.indexOf("T_") == 0))
     {
//     report("942 ");
//       let v = SURL + "schedules?api_key=" + SKEY + "&filter[stop]=" + stop_idold + "&filter[date]=" + fdate + "&filter[min_time]=" + min_time + "&page[limit]=" + 10 * max_trips + "&include=trip,route,stop,prediction";
       serviceEO.getMBTAScheduleByStop(stop_id1, fdate, min_time, document.getElementById("max_trips").value).then(function (tsked) {
//           serviceEO.getMBTAPredictionsByStop(stop_id1).then( function(tdat) {
//           report("999 " + JSON.stringify(tsked, null, 4));
//           report("999 " + tske);
//           let tsked = JSON.parse(tske);
           let tsk = getSchedule2FromS(tsked, stop_idold);
           let tskz = JSON.parse(tsk);
//           report("1003 " + tsk);
           serviceEO.getMBTAPredictionsByStop(stop_id1).then( function(dj) {
               if(dj.data.length != 0)
               {
                 let s = JSON.parse(getPrediction2From3(dj, stop_id1));
 //              report("970 " + JSON.stringify(s, null, 4));
                 combinePT(tskz, dj);
//               report("878 data: " + JSON.stringify(tsked, null, 4));
//             resolve(tsked);
               }
               resolve(tskz);
               }); //.catch(function(e){
 //                   console.log("1011 " + e);
 //              });
            }).catch(function(e){
                    console.log("1014 " + e);
            });
               
    }
    else if(stop_id1.indexOf("TB_") == 0)
    {
//    report("982 " + stop_id1 + " " + u);
      let p8 =  serviceT.getScheduleByStop(stop_id1, document.getElementById("max_time").value,   document.getElementById("max_trips").value, new Date()).then(function(tsked) 
      {
  //    report("986 " + JSON.stringify(tsked, null, 4));
      loadCarrier("MBTA").then(function() {
 //       let p2 = fetch(u).then(function(response) {
        serviceEO.getMBTAPredictionsByStop(stop_id1).then(function(dj) { 
//             report("898 data: " + JSON.stringify(dj, null, 4));
             if(dj.data.length != 0)
             {
               let s = JSON.parse(getPrediction2From3(dj, stop_id1));
               resolve(s);
             }
             else 
             {
                 if(tsked != null) resolve(tsked);
                 else reject("943 No prediction data.");
             }
             }).catch(function(e){report("901 " + e); reject(e);})
      }).catch(function(e){report("902 " + e); reject(e);})
      }).catch(function(e) {report("1024 " + e); reject(e);});
    }
    else
    {
      u = SURL + "predictions?api_key=" + SKEY + "&filter[stop]=" + stop_idold + "&include=schedule,trip,route,vehicle,alerts,stop";
//      report("1038 " + u);
      let p2 = fetch(u).then(function(response) {
           response.json().then(function(dj) {
//             report("910 data: " + JSON.stringify(dj, null, 4));
//             report("877 tsked: " + JSON.stringify(tsked, null, 4));
             if(dj.data.length != 0)
             {
//                 report("1030");
//               let s = JSON.parse(getPrediction2From3(dj, stop_id1));
 //              report("970 " + JSON.stringify(s, null, 4));
               combinePT(tsked, dj);
//               report("1072 data: " + JSON.stringify(tsked, null, 4));
               resolve(tsked);
             }
             else
             {
                 if(tsked != null) resolve(tsked);
                  else
                  {
                 report("962 No prediction data.");
                 reject("962 No prediction data.");
                  }
             }
           }).catch(function(e){report("912 " + e); reject(e);})
         }).catch(function(e) {report("915 " + e); reject(e);});
    }
    });
 return(p1);
}           

/*
Service3.prototype.getPredictionByStop = function(stop_id1)
{
  let stop_id = getNewTstop(stop_id1);
  let stop_id2 = getOldTstop(stop_id1);
//  let m = stop_id1.charAt(0);
//  report("892 m = " + m);
//  else if(
  let bReport = document.getElementById("rp").checked;
//  if(bReport) 
  report("891 getPredictionByStop " + stop_id + " " + stop_id2);
  let u = EOS + "?f=6&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop_id2 + "&format=json";
//  report("926: u = " + u);
  let p1 = null;
  let bT = isCarrierLoaded("MBTA");
  if(!bT) p1 = loadCarrier("MBTA");
  else p1 = new Promise(function(resolve, reject){
        let p2 = fetch(u).then(function(response) {
           response.text().then(function(d) {
             let dj = JSON.parse(d); 
//             report("898 data: " + JSON.stringify(dj, null, 4));
             resolve(dj);
             }).catch(function(e){report("901 " + e); reject(e);})
        }).catch(function(e){report("902 " + e); reject(e);})
     }).catch(function(e) {
         let p2 = fetch(u).then(function(response) {
           response.text().then(function(d) {
             let dj = JSON.parse(d); 
             report("910 data: " + JSON.stringify(dj, null, 4));
             resolve(dj);
           }).catch(function(e){report("912 " + e); reject(e);})
//         })catch(function(e) {report("915 " + e); reject(e);});
         });
  });
 return(p1);
}
*/
// type 0 = arrival, 1 = departure
function getScheduleTime(trip_id, type, d3)
{
  let ti = d3.included;
  let k = ti.length;
  let i = 0;
  let b = true;
  let st = "";
  while(b && (i < k))
  {
    let ts = ti[i];
    if(ts.type == "schedule")
    {
      if(ts.relationships.trip.data.id == trip_id)
      {
        b = false;
        if(type == 0) st = ts.attributes.arrival_time;
        else st = ts.attributes.departure_time;
        if((st == null) || (st == "null"))
        {
          if(type == 1) st = ts.attributes.arrival_time;   
          else st = ts.attributes.departure_time;   
        }
      }
    }
    i += 1;
  }
  return(st);
}

function getThisTypeInfo(type, id, d3)
{
  let ti = d3.included;
  let tf = null;
  if(typeof ti !== 'undefined')
  {
  let k = ti.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    let ts = ti[i];
    if(ts.type == type)
    {
      if(ts.id == id)
      {
        b = false;
        tf = ts;
      }
    }
    i += 1;
  }
  }
  return(tf);
   
}

function getPrediction2From3(d3, stop_id)
{
 //   report(JSON.stringify(d3, null, 4));
  let stop_idold = getOldTstop(stop_id);
  let dt = new Date();
  let ddm = (dt.getMonth() + 1);
  ddm = ddm.toString();
  if(ddm.length == 1) ddm = "0" + ddm;
  let ddn = dt.getDate().toString();
  if(ddn.length == 1) ddn = "0" + ddn;
  let dte = dt.getFullYear().toString() + ddm + ddn;
  dte = Number(dte);

  let s = null;
  if(d3 != null)
  {
  s = "{\"stop_id\": \"" + stop_id + "\", \"stop_name\": \"" + getStopNameFromID(stop_id) + "\", ";
  let wchair = null;
  let track = null;
  let tj = getThisTypeInfo("stop", stop_idold, d3);
  if(tj != null)
  {
    wchair = tj.attributes.wheelchair_boarding;
    s += "\"wchair\": \"" + wchair + "\", ";
    track = tj.attributes.platform_code;
  }
  s += "\"mode\": [{ \"route_type\": \"2\", \"mode_name\": \"Rail\", ";
  let k = d3.data.length;
  s += " \"route\": [";
  let i = 0;
  let brf = true;
  let lasttrip = "";
  let tnow = Math.round(Date.now() / 1000);
  let routes = [];
  while(i < k)
  {
    let tr = d3.data[i];
    let trip_id = tr.relationships.trip.data.id;
    let btripOK = true;
    if((trip_id != lasttrip) && (tr.attributes.schedule_relationship != "SKIPPED"))
    {
    lasttrip = trip_id;
//    if(brf) brf = false;
//    else s +=",";
    let route_id = tr.relationships.route.data.id;
    routes = addUniqueElement(routes, route_id);
    let veh_id = null;
    if(typeof tr.relationships.vehicle !== 'undefined')
    {
      if(tr.relationships.vehicle.data != null) veh_id = tr.relationships.vehicle.data.id;
    }
    let tg = getThisTypeInfo("route", route_id, d3);
    let route_name = tg.attributes.long_name;
//    s += "{ \"route_id\": \"" + route_id + "\", \"route_name\": \"" + route_name + "\", \"direction\": [";
    let dir = tr.attributes.direction_id;
//    let track = tr.attributes.track;
    let stat = tr.attributes.status;
    let dname = tg.attributes.direction_names[dir];
//    s += "{\"direction_id\": \"" + dir + "\", \"direction_name\": \"" + dname + "\",  \"trip\": [ ";
//    let tstop = tr.relationships.stop.data.id;
//    tstop = getNewTstop(tstop);
    let tstop = stop_id;
    let tp = getOldTime(tr.attributes.arrival_time);
    if(tp == null) tp = getOldTime(tr.attributes.departure_time);
    let td = null;
    let tf = getThisTypeInfo("trip", trip_id, d3);
    let headsign = "";
    let trip_name = "";
    let wchair = "";
    let bikes = "";
    let svc = "";
    let sked_rel = tr.attributes.schedule_relationship;
    if(tf == null)
    {
      trip_id = tr.relationships.trip.data.id; 
      let tq = getSimilarTripInfo(route_id, dir, d3);
      if(tq != null)
      {
        headsign = tq.attributes.headsign + "(?)";
        trip_name = tq.attributes.name + "(?)";
        wchair = tq.attributes.wheelchair_accessible;
      }
    }
    else
    {
      if(tf.relationships.service.data != null) svc = tf.relationships.service.data.id;
      headsign = tf.attributes.headsign;
      bikes = tf.attributes.bikes_allowed;
      trip_name = tf.attributes.name;
      wchair = tf.attributes.wheelchair_accessible;
      ta = getOldTime(getScheduleTime(trip_id, 0, d3));
      td = getOldTime(getScheduleTime(trip_id, 1, d3));
    }
    if(tr.attributes.schedule_relationship == "UNSCHEDULED")
    {
        ta = getOldTime(tr.attributes.arrival_time);
        td = getOldTime(tr.attributes.departure_time);
        if(tr.attributes.arrival_time == "null")
        {
           tp = getOldTime(tr.attributes.departure_time); 
        }
        else tp = getOldTime(tr.attributes.arrival_time);
    }
    let tv = getThisTypeInfo("vehicle", veh_id, d3);
    let vstat = null;
    let vstopid = null;
    let vlabel = "";
    let ostat = null;
    if(tv != null)
    {
      vstat = tv.attributes.current_status;
      if(tv.relationships.stop.data != null) 
      vstopid = getNewTstop(tv.relationships.stop.data.id);
      vlabel = tv.attributes.label;
      ostat = tv.attributes.occupancy_status;
    }
//    report("ta = " + ta + ", td = " + td + ", tp = " + tp + ", tnow = " + tnow + " " + (ta == null));
//    let btripOK = true;
    let tty = "";
    if((svc != "") && (typeof MBTA_Cal !== 'undefined'))
    {
      if(!MBTA_Cal.isValidDate(svc, dte, 2)) {btripOK = false; tty = 2;}
      else if(MBTA_Cal.isValidDate(svc, dte, 1)) {btripOK = true; tty = 1;}
      else if(!MBTA_Cal.isValidDate(svc, dte, 0)) {btripOK = false; tty = 0;}
    }
    let bFilterDupe = document.getElementById("bFilterDupes").checked;
    if(btripOK || !bFilterDupe)
    {
    if( ((ta == null) && (td == null) && (tp == null)) || (ta >= tnow) || (td >= tnow) || (tp >= tnow))
    {
    if(brf) brf = false;
    else s +=",";
    s += "{ \"route_id\": \"" + route_id + "\", \"route_name\": \"" + route_name + "\", \"direction\": [";
    s += "{\"direction_id\": \"" + dir + "\", \"direction_name\": \"" + dname + "\",  \"trip\": [ ";
    
    s += "{\"trip_id\": \"" + trip_id + "\", \"trip_name\": \"" + trip_name + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\", \"pre_dt\": \"" + tp + "\", \"trip_name\": \"" + trip_name + "\", \"trip_headsign\" : \"" + headsign + "\", \"wchair\" : \"" + wchair + "\", \"bikes\" : \"" + bikes + "\",";
    if(track != null) s += "\"track\":\"" + track + "\","; 
    s += "\"status\": \"" + stat + "\", \"route_name\": \"" + route_name + "\", \"vehicle_id\": \"" + veh_id + "\", \"vstat\": \"" + vstat + "\", \"vstopid\": \"" + vstopid + "\", \"sked_rel\": \"" + sked_rel + "\", \"tstop\": \"" + tstop + "\", \"pred\":\"true\", \"veh_label\": \"" + vlabel + "\", \"ostat\": \"" + ostat + "\", \"service\": \"" + svc +"\"}";

    s += "]}"; // end of direction
    s += "]}"; // end of route
    }
    }

//    if(!btripOK) report("eo_service3 gpbs rejected trip " + tty + " " + trip_id);
    }
    i += 1;
  }
  s += "]}]}";
  
  if((DISPLAYTYPE == 0) && (typeof d3.included !== 'undefined'))
  {
  clearArray(DT0Alerts);
  i = 0;
  k = d3.included.length;
  let j = 0;
  while(i < k)
  {
    let t = d3.included[i];
    if(t.type == "alert")
    {
 //     report(t.id + " " + t.attributes.header);
      let a = {alert_id : t.id, header_text: t.attributes.header,
      description: t.attributes.description, cause: t.attributes.cause, severity: t.attributes.severity, effect: t.attributes.effect};
      DT0Alerts[DT0Alerts.length] = a;
      j += 1;
    } 
    
    i += 1;
  }
//  report("alerts found = " + j);
  if(AlertData != null)
  {
    k = AlertData.length;
    i = 0;
    let ps = getParentIdFromId(stop_id);
    while(i < k)
    {
      let t = AlertData[i];
      if(isIeStop(t, stop_id, ps, routes))
      {
        let a = {alert_id : t.id, header_text: t.attributes.header,
          description: t.attributes.description, cause: t.attributes.cause, severity: t.attributes.severity, effect: t.attributes.effect};
       if(!ainD(a, DT0Alerts)) DT0Alerts[DT0Alerts.length] = a;
      }
      i += 1;
    }
  }
  /*
  if(WxAlerts.length > 0)
  {
     DT0Alerts = WxAlerts.concat(DT0Alerts);
  }
  */
  } 
  
  }
  return(s);
}

function getSimilarTripInfo(route_id, dir, d3)
{
  let ti = d3.included;
  let tf = null;
  let k = ti.length;
  let i = 0;
  let b = true;
//  report("getSimilarTripInfo " + route_id + " " + dir);
  while(b && (i < k))
  {
    let ts = ti[i];
    if(ts.type == "trip")
    {
      if((ts.relationships.route.data.id == route_id) && (ts.attributes.direction_id == dir))
      {
        b = false;
        tf = ts;
      }
    }
    i += 1;
  }
  return(tf);
}

Service3.prototype.getScheduleByTrip = function(trip_id, datetime)
{
 let tnow = Math.ceil((new Date()).getTime()/1000);
 let bReport = document.getElementById("rp").checked;
 //if(bReport)  report("1476 getScheduleByTrip " + tnow + " " + trip_id + " " + datetime);
 let max_trips = document.getElementById("max_trips").value;
 let mtime = Math.round(max_time);
 if(mtime < 5) mtime = 5;
 if(mtime > 1440) mtime = 1440;
 let mtrips = max_trips;
 if(mtrips < 5) mtrips = 5;
 if(mtrips > 100) mtrips = 100;
 
 let tc = null;
 if(datetime == null) tc = new Date(); //Date.now();
 else tc = new Date(datetime * 1000);
 let mm = (tc.getMonth() + 1).toString();
 if(mm.length == 1) mm = "0" + mm;
 let dd = tc.getDate().toString();
// report("dd = " + dd);
 if(dd.length == 1) dd = "0" + dd;
 let fdate = (tc.getFullYear()).toString() + "-" + mm + "-" + dd;
 let min_time = (tc.getHours()).toString();
 if(min_time.length == 1) min_time = "0" + min_time;
 mm = tc.getMinutes().toString();
 if(mm.length == 1) mm = "0" + mm;
 min_time = min_time + ":" + mm;
 
// report("Service3.getScheduleByTrip " + trip_id + " " + tc.toLocaleDateString() + " " + tc.toLocaleTimeString());
  let p1 = new Promise(function(resolve, reject){
  let tam = null;
  if((serviceE.isAssociateTrip(trip_id)) && document.getElementById("iam").checked)
  {
      report("1505 ");
      let p4 = serviceE.getScheduleByTrip(trip_id, tc);
      p4.then(function(d) {
          tam = d;
          let tn = Date.now();
          if((tok && ((tn - ttime) > 1000) ) && (typeof SKEY !== 'undefined') && bOnLine && !bUseBuiltIn)
          {
            let u = null;
            if(datetime != null) u = SURL + "schedules?api_key=" + SKEY + "&filter[trip]=" + trip_id + "&filter[date]=" + fdate + "&filter[min_time]=" + min_time + "&page[limit]=" + 10 * max_trips + "&include=route,trip,prediction";
            else u = SURL + "schedules?api_key=" + SKEY + "&filter[trip]=" + trip_id + "&filter[date]=" + fdate + "&page[limit]=" + 10 * max_trips + "&include=route,trip,prediction";
  //          if(bReport) report("1514 u = " + u);
            let p5 = getXHRP4(u);
            p5.then(function(data){
            if(data != null) 
            {
              let t = JSON.parse(data);
              if(bReport)report("\ngetScheduleByTrip Found: " + data );
              let s = getSchedule2FromT(t, trip_id);
              if(bReport)report("\ngetScheduleByTrip data: " + s ); 
              t = JSON.parse(s);
              if(t != null)
              {
              let tcomb = t.mode.concat(tam.mode);
              t.mode = tcomb;
              resolve(t);
              }
              else
              {
                resolve(tam);
              }
            }
            else report("getScheduleByTrip data is null");
            } ).catch(function(error){
            TFAIL = true;
            dreport("gsbt Link to T failed 1 for " + u + " " + error);
//            reject("Link to T failed 1 for " + u + " " + error);
            resolve(tam);
            } );
          } 
          else if((!bOnLine) || bUseBuiltIn)
          {
            let p5 = serviceT.getScheduleByTrip(trip_id, tc);
            if(bReport) report("getScheduleByTrip built-in");
            p5.then(function(data){
            if(data != null) 
            {
              let t = data;
              if(t != null)
              {
              let tcomb = t.mode.concat(tam.mode);
              t.mode = tcomb;
              resolve(t);
              }
              else
              {
                resolve(tam);
              }
            }
            else reject("getScheduleByTrip data is null");
            } ).catch(function(error){
            TFAIL = true;
            dreport("gsbt Link to T failed 1 for " + u + " " + error);
//            reject("Link to T failed 1 for " + u + " " + error);
            resolve(tam);
            } );
          }
          else if(typeof SKEY === 'undefined')
          {
            resolve(tam);
          }
          else reject("getScheduleByTrip error c " + (tn - ttime));
       }).catch(function(error) {
           reject(error);
       });
}
else{
 let tn = Date.now();
 //report("1510 " + tok + " " + ((tn - ttime) > 1000) + " " + bOnLine + " " + !bUseBuiltIn);
// if((tok && ((tn - ttime) > 1000) ) && (typeof SKEY !== 'undefined') && bOnLine && !bUseBuiltIn)
 if((tok && ((tn - ttime) > 1000) ) && bOnLine && !bUseBuiltIn)
 {
  let u = null;
  /*
  if(datetime != null) u = SURL + "schedules?api_key=" + SKEY + "&filter[trip]=" + trip_id + "&filter[date]=" + fdate + "&filter[min_time]=" + min_time + "&page[limit]=" + 10 * max_trips + "&include=route,trip,prediction";
  else u = SURL + "schedules?api_key=" + SKEY + "&filter[trip]=" + trip_id + "&filter[date]=" + fdate + "&page[limit]=" + 10 * max_trips + "&include=route,trip,prediction";
                       */
//  if(bReport) report("1588 u = " + u);
//  let p = getXHRP4(u);
//  p.then(function(data){
  serviceEO.getMBTAScheduleByTrip(trip_id, fdate, datetime, max_trips).then( function(data) {
  //  if(bReport) report("data = " + data);
    if(data == null) 
    {
       report("1525 getScheduleByTrip data is null");  
    }
    else
    {
      let t = data;
      if(bReport)report("1530 getScheduleByTrip Found: " + data ); 
      let s = getSchedule2FromT(t, trip_id);
      if(s == null) reject("1532 getScheduleByTrip data is null");
      else
      {
        if(bReport) report("1535 getScheduleByTrip data: " + s ); 
        if(s != "") t = JSON.parse(s);
        else t = null;
        resolve(t);
      }
    }
  } ).catch(function(error){
    report("1566 gsbt Link to T failed for " + u + " " + error);
    reject("1543 gsbt Link to T failed 2 for " + u + " " + error);
    });
  }
  else if((!bOnLine) || bUseBuiltIn)
  {
//    report("1640 " + trip_id);
    let p5 = serviceT.getScheduleByTrip(trip_id, tc);
    p5.then(function(data){
      if(data != null) 
      {
        let t = data;
        resolve(t);
      }
      else reject("getScheduleByTrip data is null");
      } ).catch(function(error){
          TFAIL = true;
          dreport("gsbt Link to T failed 1 for " + u + " " + error);
//            reject("Link to T failed 1 for " + u + " " + error);
//          resolve(tam);
          reject(error);
          } );
  }
  else reject("1569 getScheduleByTrip error " + (tn - ttime));
 } } );
 
 return(p1);
}

function getSchedule2FromT(d3, trip_id)
{
  let s = "";
  if(d3.data.length != 0)
  {
  let route_id = d3.data[0].relationships.route.data.id;
  let tg = getThisTypeInfo("route", route_id, d3);
  let route_name = tg.attributes.long_name;
  let tf = getThisTypeInfo("trip", trip_id, d3);
  let headsign = tf.attributes.headsign;
  let trip_name = tf.attributes.name;
  let wchair = tf.attributes.wheelchair_accessible;
  
  s = "{\"route_id\": \"" + route_id + "\", \"route_name\": \"" + route_name + "\", ";
  s += "\"trip_id\": \"" + trip_id +"\", \"trip_name\": \"" + trip_name + "\", " +
    "\"trip_headsign\": \"" + headsign + "\", ";
  let dir = tf.attributes.direction_id;
  let dname = tg.attributes.direction_names[dir];
  s += "\"direction_id\": \"" + dir + "\", \"direction_name\": \"" + dname + "\", \"stop\":[";
  
  let k = d3.data.length;
//  report("d3.data.length = " + k);
  let i = 0;
  let brf = true;
  while(i < k)
  {
    if(brf) brf = false;
    else s +=",";
    let tr = d3.data[i];
    let ta = getOldTime(tr.attributes.arrival_time);
    let td = getOldTime(tr.attributes.departure_time);
    let stop_id = getNewTstop(tr.relationships.stop.data.id);
    let pid = tr.relationships.prediction;
    let bPred = false;
    let taa = null;
    let tdd = null;
    if((typeof pid !== 'undefined') && (pid.data != null))
    {
      let pred_id = pid.data.id;
      let tt = getThisTypeInfo("prediction", pred_id, d3);
      taa = tt.attributes.arrival_time;
      tdd = tt.attributes.departure_time;
//      report("pred: taa = " + taa + ", tdd = " + tdd);
      if(taa != null) {taa = getOldTime(taa); bPred = true;}
      if(tdd != null) {tdd = getOldTime(tdd); bPred = true;}
      else if(taa != null)
      {
        tdd = taa;
        bPred = true;
      }
    }
    s += "{\"stop_sequence\": \"" + tr.attributes.stop_sequence + "\", \"stop_id\": \"" + stop_id + "\", \"stop_name\": \"" + getStopNameFromID(stop_id) + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\", \"pred_arr_dt\": \"" + taa + "\", \"pred_dep_dt\": \"" + tdd + "\" ";
    if(bPred)
    {
      s += ", \"pred\": \"true\"}";
    }
    else
    {
      s += "}"; 
    }
    i += 1;
  }
  s += "]}";

  if(DISPLAYTYPE == 1)
  {
  clearArray(DT1Alerts);
  i = 0;
  k = d3.included.length;
  while(i < k)
  {
    let t = d3.included[i];
    if(t.type == "alert")
    {
      let a = {alert_id : t.id, header_text: t.attributes.header,
      description: t.attributes.description, cause: t.attributes.cause, severity: t.attributes.severity, effect: t.attributes.effect};
      DT1Alerts[DT1Alerts.length] = a;
    }
    
    i += 1;
  }
  if(AlertData != null)
  {
    k = AlertData.length;
    i = 0;
    while(i < k)
    {
      let t = AlertData[i];
      if(isIeTrip(t, trip_id, route_id))
      {
        let a = {alert_id : t.id, header_text: t.attributes.header,
          description: t.attributes.description, cause: t.attributes.cause, severity: t.attributes.severity, effect: t.attributes.effect};
        if(!ainD(a, DT1Alerts)) DT1Alerts[DT1Alerts.length] = a;
      }
      i += 1;
    }
  }
  /*
  if(WxAlerts.length > 0)
  {
      DT1Alerts = WxAlerts.concat(DT1Alerts);
  }
  */
  } 

  }
  return(s);
}

function isIeTrip(a, tripid, route)
{
  let ies = a.attributes.informed_entity;
  
  let k = ies.length;
  let i = 0;
  let b = false;
  while(!b && (i < k))
  { 
    if(tripid == ies[i].trip) b = true;
    else if((route != null) && (route == ies[i].route)) b = true;
    i += 1;   
  }
  return(b);  
}


Service3.prototype.getPredictionByTrip = function(trip_id)
{
 report("1724 getPredictionByTrip3 " + trip_id);
 let tnow = Math.ceil((new Date()).getTime()/1000);
 let bReport = document.getElementById("rp").checked;
// if(bReport) 
//     report("1631 getPredictionByTrip " + trip_id + " " + tnow);
 let p1 = new Promise(function(resolve, reject){
 let tn = Date.now();
 if((tok && ((tn - ttime) > 1000) ) && (typeof SKEY !== 'undefined'))
 {
//  let u = SURL + "predictions?api_key=" + SKEY + "&filter[trip]=" + trip_id + "&include=schedule,route,trip,alerts,vehicle";
//  let p = getXHRP4(u);
//  p.then(function(data){
     report("1736 ");
  Service3.getMBTAPredictionsByTrip(trip_id).then( function(data) {
    if((data != null)) // && (data.length > 0))
    {
//      let t = JSON.parse(data);
      let t = data;
      if(bReport) report("u = " + u + "\ngetPredictionByTrip Found " + data ); 
      if(t.data.length > 0)
      {
        let s = getPrediction2FromT(t, trip_id);
        if(s == null) reject("getPredictionByTrip data is null");
        else
        {
          if(bReport) report("\ngetPredictionByTrip data: " + s ); 
          t = JSON.parse(s);
          resolve(t);
        }
      }
      else
      {
        report("gpbt response data empty");   
        reject("gpbt response data empty");   
      }
    }
    else reject("getPredictionByTrip data is null");
    } ).catch(function(error){
    report("gpbt Link to T failed for " + u + " " + error);
    reject("gpbt Link to T failed for " + u + " " + error);
    } );
  }
  else reject("getPredictionByTrip error" + (tn - ttime));
 }).catch(function(error){
    report("gpbt Link to T failed for " + u + " " + error);
    reject("gpbt Link to T failed for " + u + " " + error);
    } );
 return(p1);
    
}

function getPrediction2FromT(d3, trip_id)
{
  let s = "";
//  if(d3.data.length != 0)
  if(d3 != null)
  {
  let route_id = "";
  let headsign = "";
  let trip_name = "";
  let wchair = "";
  let dir = "";
  let dname = "";
  
  if(d3.data.length > 0) route_id = d3.data[0].relationships.route.data.id;
  let vid = null; 
  if(d3.data[0].relationships.vehicle.data != null)  vid = d3.data[0].relationships.vehicle.data.id;
  let vidlat = null;
  let vidlon = null;
  let vidstop = null;
  if((vid != null) && (vid != "null"))
  {
    let tv = getThisTypeInfo("vehicle", vid, d3); 
    if(tv != null)
    {
      vidlat = tv.attributes.latitude;
      vidlon = tv.attributes.longitude;
      vidstop = getNewTstop(tv.relationships.stop.data.id);
    }
  }
  let tg = getThisTypeInfo("route", route_id, d3);
  let route_name = tg.attributes.long_name;
  let tf = getThisTypeInfo("trip", trip_id, d3);
  if(tf != null)
  {
    headsign = tf.attributes.headsign;
    trip_name = tf.attributes.name;
    wchair = tf.attributes.wheelchair_accessible;
    dir = tf.attributes.direction_id;
    dname = tg.attributes.direction_names[dir];
  }
  
  let bIsABus = false;
  if(!isNaN(route_id))
  {
    bIsABus = true;   
  }
  
  s = "{\"route_id\": \"" + route_id + "\", \"route_name\": \"" + route_name + "\", ";
  s += "\"trip_id\": \"" + trip_id +"\", \"trip_name\": \"" + trip_name + "\", \"trip_headsign\": \"" + headsign + "\", ";
  if((vid != null) && (vid != "null"))
  {
    s += "\"vehicle_id\": \"" + vid + "\", \"vehicle_latitude\": \"" + vidlat + "\", \"vehicle_longitude\": \"" + vidlon + "\", \"vehicle_stop\": \"" + vidstop + "\", ";
  }
  s += "\"direction_id\": \"" + dir + "\", \"direction_name\": \"" + dname + "\", \"stop\":[";
  
  let k = d3.data.length;
//  report("d3.data.length = " + k);
  let i = 0;
  let brf = true;
  let last_stopid = "";
  while(i < k)
  {
    let tr = d3.data[i];
    let td = getOldTime(tr.attributes.departure_time);
    let tp = getOldTime(tr.attributes.arrival_time);
    if(tp == null) tp = td;
    let ta = tp;
    let stop_id = getNewTstop(tr.relationships.stop.data.id);
    if(stop_id != last_stopid)
    {
      last_stopid = stop_id;
      if(brf) brf = false;
      else s +=",";
//    report("-- stop_id = " + stop_id);
      let tq = null;
      if(typeof d3.included !== 'undefined') tq = getScheduleInfoForStop(stop_id, d3);
      if(tq != null)
      {
        ta = getOldTime(tq.attributes.arrival_time);
//    if(ta == null) ta = getOldTime(tq.attributes.departure_time);
        td = getOldTime(tq.attributes.departure_time);
      }
      let status = tr.attributes.status;
      s += "{\"stop_sequence\": \"" + tr.attributes.stop_sequence + "\", \"stop_id\": \"" + stop_id + "\", \"stop_name\": \"" + getStopNameFromID(stop_id) + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\", \"pre_dt\": \"" + tp  + "\", \"pred_arr_dt\": \"" + tp + "\", \"pred_dep_dt\": \"" + tp + "\", \"pred\":\"true\", \"status\": \"" + status + "\"}";
    }
    i += 1;
  }
  s += "]}";
  }
  
  if((DISPLAYTYPE == 1) && (typeof d3.included !== 'undefined'))
  {
  clearArray(DT1Alerts);
  i = 0;
  k = d3.included.length;
  while(i < k)
  {
    let t = d3.included[i];
    if(t.type == "alert")
    {
      let a = {alert_id : t.id, header_text: t.attributes.header,
      description: t.attributes.description, cause: t.attributes.cause, severity: t.attributes.severity, effect: t.attributes.effect};
      DT1Alerts[DT1Alerts.length] = a;
    }
    i += 1;
  }
  if(AlertData != null)
  {
    k = AlertData.length;
    i = 0;
    while(i < k)
    {
      let t = AlertData[i];
      if(isIeTrip(t, trip_id, route_id))
      {
        let a = {alert_id : t.id, header_text: t.attributes.header,
          description: t.attributes.description, cause: t.attributes.cause, severity: t.attributes.severity, effect: t.attributes.effect};
        if(!ainD(a, DT1Alerts)) DT1Alerts[DT1Alerts.length] = a;
      }
      i += 1;
    }
  }
  /*
  if(WxAlerts.length > 0)
  {
      DT1Alerts = WxAlerts.concat(DT1Alerts);
  }
  */
  } 

  return(s);
}

function getScheduleInfoForStop(stop_id, d3)
{
  let ti = d3.included;
  let tf = null;
  let k = ti.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    let ts = ti[i];
    if(ts.type == "schedule")
    {
      if(getNewTstop(ts.relationships.stop.data.id) == stop_id)
      {
        b = false;
        tf = ts;
      }
    }
    i += 1;
  }
  return(tf);
   
}

Service3.prototype.getScheduleByRoutesStop = function(route_id, max_time, max_trips, datetime, mystop_id)
{
  return(this.getScheduleByRoutes(route_id, max_time, max_trips, datetime));
}

Service3.prototype.getScheduleByRoutes = function(route_id, max_time, max_trips, datetime)
{
 let tc = null;
 let bReport = document.getElementById("rp").checked;
 if(datetime == null)
 {
   tc = new Date();
 }
 else tc = new Date(datetime * 1000);
 
 report("Service3.getScheduleByRoutes " + route_id + " " + tc.toLocaleDateString() + " " + tc.toLocaleTimeString() + " " + datetime);
 let p1 = null;
 if((route_id == null) || (route_id == ""))
 {
   p1 = new Promise(function(resolve, reject){ 
      reject("No route specified");
   } );
 }
 else if(!bOnLine)
 {
   p1 = serviceT.getScheduleByRoutes(route_id, document.getElementById("max_time").value, document.getElementById("max_trips").value, tc);
 }
 else
 {
   p1 = new Promise(function(resolve, reject){
   let tn = Date.now();
   if(tok && ((tn - ttime) > 1000) ) 
   {
     let mm = (tc.getMonth() + 1).toString();
     if(mm.length == 1) mm = "0" + mm;
     let dd = tc.getDate().toString();
     if(dd.length == 1) dd = "0" + dd;
     let fdate = (tc.getFullYear()).toString() + "-" + mm + "-" + dd;
     let min_time = (tc.getHours()).toString();
     if(min_time.length == 1) min_time = "0" + min_time;
     let min = tc.getMinutes().toString();
     if(mm.length == 1) min = "0" + min;
     min_time = min_time + ":" + min;
//     let u = SURL + "schedules?api_key=" + SKEY + "&filter[route]=" + route_id + "&filter[date]=" + fdate + "&filter[min_time]=" + min_time + "&page[limit]=" + 10 * max_trips + "&include=trip,route"; // + "&sort=/data/{index}/attributes/departure_time";
//     report("2020 u = " + u);
//     let p = getXHRP4(u);
//     p.then(function(data){
     serviceEO.getMBTAScheduleByRoute(route_id, fdate, min_time, max_trips).then(function(data){
       if(data != null) 
       {
        if(bReport) report("1959 getScheduleByRoute Found " + data ); 
        let t = JSON.parse(data);
//        report("2027\n" + JSON.stringify(t, null, 4));
        let s = getSchedule2FromR(t, route_id);
        if(bReport) report("1963 getScheduleByRoute made: " + s ); 
         t = JSON.parse(s);
         resolve(t);
       }
       else report("getScheduleByRoutes data is null");
       } ).catch(function(error){
         dreport("1969 gsbr Link to T failed  "  + " " + error);
         reject("1970 gsbr Link to T failed 2  "  + " " + error);
         } );
    }
   });
 }
return(p1);
}

Service3.prototype.getPredictionByRoute = function(route_id, max_time, max_trips, datetime)
{
 let tc = null;
 let bReport = document.getElementById("rp").checked;
 if(datetime == null)
 {
   tc = new Date();
 }
 else tc = new Date(datetime * 1000);
 
// report("1988 Service3.getPredictionByRoute " + route_id + " " + tc.toLocaleDateString() + " " + tc.toLocaleTimeString());
 let p1 = null;
 if((route_id == null) || (route_id == "") || !bOnLine)
 {
   p1 = new Promise(function(resolve, reject){ 
      reject("Not on line or No route specified");
   } );
 }
 else
 {
   p1 = new Promise(function(resolve, reject){
   let tn = Date.now();
   if(tok && ((tn - ttime) > 1000) ) //&& (typeof SKEY !== 'undefined'))
   {
//     let u = SURL + "predictions?api_key=" + SKEY + "&filter[route]=" + route_id +  "&page[limit]=" + 10 * max_trips + "&include=trip,route" + "&sort=stop_sequence";
//     report("u = " + u);
//     let p = getXHRP4(u);
     
     serviceEO.getMBTAPredictionsByRoute(route_id).then(function(data){
       if(data != null) 
       {
        if(bReport) report("getPredictionByRoute Found " + data ); 
//        let t = JSON.parse(data);
        let s = getPrediction2FromR(data, route_id);
        if(bReport) report("getPredictionByRoute made: " + s ); 
         t = JSON.parse(s);
         resolve(t);
       }
       else report("getPredictionByRoute data is null");
       } ).catch(function(error){
         dreport("gpbr Link to T failed for " + route_id + " " + error);
         reject("gpbr Link to T failed 2 for " + route_id + " " + error);
         } );
    }
   });
 }
return(p1);
}

function predictionsCompare(a,b)
{
let x = a.relationships.trip.data.id;
let y = b.relationships.trip.data.id;
if(x < y) return(-1);
if(x > y) return(1);
x = a.attributes.stop_sequence;
y = b.attributes.stop_sequence;
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function getPrediction2FromR(d3, route_id)
{
  let t = d3.data;
  t.sort(predictionsCompare);
  let s = "{ \"mode\": [";
  let tg = getThisTypeInfo("route", route_id, d3);
  let route_name = route_id;
  if(tg !=null)
  {
    route_name = tg.attributes.long_name;
    if(route_name == "") route_name = tg.attributes.short_name;
  }
  let k0 = t.length;
  let i0 = 0;
  let lstopid = "";
  let ldt = "";
  s += '{\"route_type\":\"2\",\"mode_name\":\"Rail\",\"route\": [';
  s += '{\"route_id\":\"' + route_id + '\",\"route_name\":\"' + route_name + '\",\"direction\": [ ';
  let bFirst = true;
  let bFirst3 = true;
  
  

  for(ii = 0; ii < 2; ii++)
  {
    if(!bFirst) 
    {
      if(!bFirst3) s += "]}]},";
      else s += "  ]},";
    }
    let dname = "";
    if(tg != null) dname = tg.attributes.direction_names[ii];
    s += '{\"direction_id\":\"' + ii + '\","direction_name":\"' + dname + '\","trip":[ ';
    bFirst3 = true;
    let bFirst2 = true;
    let ctrip = "";
    i0 = 0;
    while(i0 < k0)
    {
      let tx = t[i0];
      let trip_id = tx.relationships.trip.data.id;
      let tf = getThisTypeInfo("trip", trip_id, d3);
      let vd = tf.attributes.direction_id;
//    report("ii = " + ii + " vd = " + vd);
      if(ii == Number(vd))
      {
        let tf = getThisTypeInfo("trip", trip_id, d3);
        let headsign = "";
        let trip_name = "";
        let wchair = "";
        if(tf != null)
        {
          headsign = tf.attributes.headsign;
          trip_name = tf.attributes.name;
          wchair = tf.attributes.wheelchair_accessible;
        }
//        if(bFirst2) 
        if(ctrip != trip_id)
        {
          if(bFirst2) bFirst2 = false;
          else s += "]},";
          bFirst3 = true;
          s += '{\"trip_id\":\"' + trip_id + '\",\"trip_name\":\"' + trip_name + '\",\"trip_headsign\":\"' + headsign + '\",\"stop\":[';
        }
        let ss = tx.attributes.stop_sequence;
        let stop_id = getNewTstop(tx.relationships.stop.data.id);
        let stop_name = getStopNameFromID(stop_id);
        let ta = getOldTime(tx.attributes.arrival_time);
        let td = getOldTime(tx.attributes.departure_time);
        if(bFirst3) bFirst3 = false;
        else s += ", ";
        s += '{\"stop_sequence\":\"' + ss + '\",\"stop_id\":\"' + stop_id + '\",\"stop_name\":\"' + stop_name + '\",\"sch_arr_dt\":\"' + ta + '\",\"sch_dep_dt\":\"' + td + '\"}';
        ctrip = trip_id;
        lstopid = stop_id;
        ldt = ta;
      }
      i0 += 1;
    }
    if(!bFirst) s += "]}"; // end of stop, trip
    if(bFirst)
    {
      bFirst = false;
    }
//  report("stop_id = " + lstopid + ", larr_dt = " + ldt + " " + (new Date(ldt * 1000)).toLocaleDateString() + (new Date(ldt * 1000)).toLocaleTimeString());
  }
  if(t.length != 0)
  {
    s += "]} "; // end of trips
    s += "]}"; //end of direction
  }
  if(t.length == 0) s += "]}";
  s += " ]}"; // end of route 
  s += "]}"; // end of mode 
  return(s);
}

Service3.prototype.getPredictionByLocation = function(lat, lon)
{
 let tc = null;
 let bReport = document.getElementById("rp").checked;
 
// report("Service3.getPredictionByLocation " + lat + " " + lon);
 let p1 = null;
 if((lat == 0) || (lon == 0) || (lat > 42.805) || (lat < 41.5) || (lon < -72.00) || (lon > -70.24))
 {
   p1 = new Promise(function(resolve, reject){ 
//      reject("No location.");
      resolve(null);
   } );
 }
 else if(!bOnLine)
 {
   p1 = new Promise(function(resolve, reject){ 
//      reject("Not on line.");
      resolve(null);
   } );
 }
 else
 {
   p1 = new Promise(function(resolve, reject){
   let tn = Date.now();
//   report("got here " + tok + " " + (tn - ttime));
   if(tok && ((tn - ttime) > 1000) )
   {
//     let u = SURL + "predictions?api_key=" + SKEY + "&filter[latitude]=" + lat +  "&filter[longitude]=" + lon + "&include=trip,route,stop,vehicle";
//     let p = getXHRP4(u);
     let p = serviceEO.getMBTAPredictionByLocation(lat, lon);
     p.then(function(data){
       if(data != null) 
       {
 //       if(bReport) 
 //           report( "2169 \ngetPredictionByLocation Found " + JSON.stringify(data, null, 4) ); 
//        let t = JSON.parse(data.data);
         let t = data;
//        let s = getPrediction2FromR(t, route_id);
//        if(bReport) report("getPredictionByLocation made: " + s ); 
//         t = JSON.parse(s);
         resolve(t);
       }
       else report("2176 getPredictionByLocation data is null");
       } ).catch(function(error){
//         dreport("2178 gpbl Link to T failed for " + error);
//         reject("2179 gpbl Link to T failed 2 for " + error);
         } );
    }
   });
 }
return(p1);
}


function isIn(d, a)
{
  let b = false;
  let k = a.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(d == a[i])
    {
      b = true;   
    }
    i += 1;
  }
  return(b);
}
  
function getSchedule2FromR(d3, route_id)
{
  let t = d3.data;
  let s = "{ \"mode\": [";
  let tg = getThisTypeInfo("route", route_id, d3);
  let route_name = route_id;
  if(tg !=null)
  {
    route_name = tg.attributes.long_name;
    if(route_name == "") route_name = tg.attributes.short_name;
  }
  let k0 = t.length;
  let i0 = 0;
  let lstopid = "";
  let ldt = "";
  s += '{\"route_type\":\"2\",\"mode_name\":\"Rail\",\"route\": [';
  s += '{\"route_id\":\"' + route_id + '\",\"route_name\":\"' + route_name + '\",\"direction\": [ ';
  let bFirst = true;
  let bFirst3 = true;

  for(ii = 0; ii < 2; ii++)
  {
    if(!bFirst) 
    {
      if(!bFirst3) s += "]}]},";
      else s += "  ]},";
    }
    let dname = "";
    if(tg != null) dname = tg.attributes.direction_names[ii];
    s += '{\"direction_id\":\"' + ii + '\","direction_name":\"' + dname + '\","trip":[ ';
    bFirst3 = true;
    let bFirst2 = true;
    let ctrip = "";
    i0 = 0;
    while(i0 < k0)
    {
      let tx = t[i0];
      let trip_id = tx.relationships.trip.data.id;
      let tf = getThisTypeInfo("trip", trip_id, d3);
      let vd = tf.attributes.direction_id;
//    report("ii = " + ii + " vd = " + vd);
      if(ii == Number(vd))
      {
        let tf = getThisTypeInfo("trip", trip_id, d3);
        let headsign = "";
        let trip_name = "";
        let wchair = "";
        if(tf != null)
        {
          headsign = tf.attributes.headsign;
          trip_name = tf.attributes.name;
          wchair = tf.attributes.wheelchair_accessible;
        }
//        if(bFirst2) 
        if(ctrip != trip_id)
        {
          if(bFirst2) bFirst2 = false;
          else s += "]},";
          bFirst3 = true;
          s += '{\"trip_id\":\"' + trip_id + '\",\"trip_name\":\"' + trip_name + '\",\"trip_headsign\":\"' + headsign + '\",\"stop\":[';
        }
        let ss = tx.attributes.stop_sequence;
        let stop_id = getNewTstop(tx.relationships.stop.data.id);
        let stop_name = getStopNameFromID(stop_id);
        let ta = getOldTime(tx.attributes.arrival_time);
        let td = getOldTime(tx.attributes.departure_time);
        if(bFirst3) bFirst3 = false;
        else s += ", ";
        s += '{\"stop_sequence\":\"' + ss + '\",\"stop_id\":\"' + stop_id + '\",\"stop_name\":\"' + stop_name + '\",\"sch_arr_dt\":\"' + ta + '\",\"sch_dep_dt\":\"' + td + '\"}';
        ctrip = trip_id;
        lstopid = stop_id;
        ldt = ta;
      }
      i0 += 1;
    }
    if(!bFirst) s += "]}"; // end of stop, trip
    if(bFirst)
    {
      bFirst = false;
    }
//  report("stop_id = " + lstopid + ", larr_dt = " + ldt + " " + (new Date(ldt * 1000)).toLocaleDateString() + (new Date(ldt * 1000)).toLocaleTimeString());
  }
  if(t.length != 0)
  {
    s += "]} "; // end of trips
    s += "]}"; //end of direction
  }
  if(t.length == 0) s += "]}";
  s += " ]}"; // end of route 
  s += "]}"; // end of mode 
  return(s);
}


// nt format: 2017-12-01T14:56:00-05:00
function getOldTime(nt)
{
  let d = null;
  if(nt != null)
  {
    let dt = new Date();
    dt.setFullYear(nt.substring(0,4));
    let m = Number(nt.substring(5,7)) - 1;
    dt.setMonth(m);
    dt.setDate(nt.substring(8,10));
    dt.setHours(nt.substring(11,13));
    dt.setMinutes(nt.substring(14,16));
    dt.setSeconds(0);
    d = Math.floor(dt.getTime() / 1000);
  }
//  if(d < 0)  report("getOldTime negitive " + nt + " " + nt.substring(0,4) + " " + nt.substring(5,7) + " " + nt.substring(8,10) + " " + nt.substring(11,13) + " " + nt.substring(14,16) + " " + dt.toLocaleDateString() + " " + dt.toLocaleTimeString() + " " + d);
  return(d);  
}

Service3.prototype.getVehiclesByRoutes = function(route_id)
{
// report("getVehiclesByRoutes " + route_id);
 let bReport = document.getElementById("rp").checked;
 let p1 = null;
 if((route_id == null) || (route_id == ""))
 {
   p1 = new Promise(function(resolve, reject){
      reject("No routes specified");
   } );
 }
 else
 {
 p1 = new Promise(function(resolve, reject){
 let tn = Date.now();
 if((tok && ((tn - ttime) > 1000) ) && (typeof SKEY !== 'undefined'))
 {
//  let u = SURL + "vehicles?api_key=" + SKEY + "&filter[route]=" + route_id +  "&include=stop,trip,route"; 
  if(bReport) report("u = " + u);
 
//  let p = getXHRP4(u);
  let p = serviceEO.getMBTAVehiclesByRoute(route_is);
  p.then(function(data){
    if((data != null) && (data.length > 0))
    {
      let t = JSON.parse(data);
      if(bReport) report("\ngetVehiclesByRoutes Found " + data ); 
      let s = getVehicles2From3(t, route_id);
      if(s == null) reject("getVehiclesByRoutes data is null");
      else
      {
        if(bReport) report("\ngetVehiclesByRoutes data: " + s ); 
        t = JSON.parse(s);
        resolve(t);
      }
    }
    else reject("VehiclesByRoutes data is null");
    } ).catch(function(error){
    report("gvbr Link to T failed for " + u + " " + error);
    reject("gvbr Link to T failed for " + u + " " + error);
    } );
  }
  else reject("VehiclesByRoutes error" + (tn - ttime));
 })
 /*.catch(function(error){
    report("gvbr Link to T failed for " + route_id + " " + error);
    reject("gvbr Link to T failed for " + route_id + " " + error);
    } );
    */
 }
 return(p1);
}

function getVehicles2From3(d3, route_id)
{
  let t = d3.data;
  let tg = getThisTypeInfo("route", route_id, d3);
  let route_name = "";
  if(tg !=null)
  {
    route_name = tg.attributes.long_name;
  }
  let s = "{ \"mode\": [";
  let k0 = t.length;
//  report("\nt.length = " + t.length);
  let i0 = 0;
  s += '{\"route_type\":\"2\",\"mode_name\":\"Rail\",\"route\": [';
  s += '{\"route_id\":\"' + route_id + '\",\"route_name\":\"' + route_name + '\",\"direction\": [ ';
  let bFirst = true;
  let bFirst3 = true;
  let ii = 0;

  for(ii = 0; ii < 2; ii++)
  {
    if(ii != 0) 
    {
      s += "  ]},";
    }
    let dname = "";
    if(tg != null) dname = tg.attributes.direction_names[ii];
    s += '{\"direction_id\":\"' + ii + '\","direction_name":\"' + dname + '\","trip":[ ';  
    bFirst3 = true;
    let bFirst2 = true;
    let ctrip = "";
    i0 = 0;
    while(i0 < k0)
    {
      let tx = t[i0];
      let trip_id = tx.relationships.trip.data.id;
      let vd = Number(tx.attributes.direction_id);
      if(ii == vd)
      {
        let tf = getThisTypeInfo("trip", trip_id, d3);
        let headsign = "";
        let trip_name = "";
        let wchair = "";
        if(tf != null)
        {
          headsign = tf.attributes.headsign;
          trip_name = tf.attributes.name;
          wchair = tf.attributes.wheelchair_accessible;
        }
        if(ctrip != trip_id)
        {
          if(bFirst2) bFirst2 = false;
          else s += ",";
          bFirst3 = true;
          s += '{\"trip_id\":\"' + trip_id + '\",\"trip_name\":\"' + trip_name + '\",\"trip_headsign\":\"' + headsign + '\",\"vehicle\":';
        
          let vid = tx.id;
          let vlat = tx.attributes.latitude;
          let vlon = tx.attributes.longitude;
          let ostat = tx.attributes.occupancy_status;
          let vber = tx.attributes.bearing;
//          let vtim = getOldTime(tx.attributes.last_updated);
          let vtim = getOldTime(tx.attributes.updated_at);
          let vlab = tx.attributes.label;
          let vstat = tx.attributes.current_status;
          let vstop_id = null;
          if(tx.relationships.stop.data != null) 
          {
            vstop_id = getNewTstop(tx.relationships.stop.data.id);
          }
 //         if(vstop_id != null)
          {
          if(bFirst3) bFirst3 = false;
          else s += ", ";
          s += '{\"vehicle_id\":\"' + vid + '\",\"vehicle_lat\":\"' + vlat + '\",\"vehicle_lon\":\"' + vlon + '\",\"vehicle_bearing\":\"' + vber + '\",\"vehicle_timestamp\":\"' + vtim + "\", \"vehicle_label\":\"" + vlab + '\", \"status\":\"' + vstat + '\", \"stop_id\":\"' + vstop_id + '\", \"ostat\":\"' + ostat +  '\" }}';
          }
 //         else
 //         {
 //           s += "}";
 //         }
        }
        ctrip = trip_id;
      }
    i0 += 1;
    }
  }
  s += "]}";
  s += "]} "; // end direction
  s += "]}"; // end of route 
  s += "]}"; // end of mode 
  return(s);
  
}


//TODO
Service3.prototype.getVehicles = function()
{
// report("getVehiclesByRoutes " + route_id);
 let bReport = document.getElementById("rp").checked;
 let p1 = null;
 /*if((route_id == null) || (route_id == ""))
 {
   p1 = new Promise(function(resolve, reject){
      reject("No routes specified");
   } );
 }
 else */
 {
 p1 = new Promise(function(resolve, reject){
 let tn = Date.now();
 if(tok && ((tn - ttime) > 1000) ) 
 {

//  let p = getXHRP4(u);
  let p = serviceEO.getMBTAVehicles();
  p.then(function(data){
    if((data != null) && (data.length > 0))
    {
      let t = JSON.parse(data);
      if(bReport) report("\ngetVehicles Found " + data ); 
//      let s = getVehicles2From3(t, route_id);
//      if(s == null) reject("getVehiclesByRoutes data is null");
//      else
      {
//        if(bReport) report("\ngetVehiclesByRoutes data: " + s ); 
//        t = JSON.parse(s);
        resolve(t);
      }
    }
    else reject("Vehicles data is null");
    } ).catch(function(error){
    report("gv Link to T failed for " + u + " " + error);
    reject("gv Link to T failed for " + u + " " + error);
    } );
  }
  else reject("Vehicles error" + (tn - ttime));
 }).catch(function(error){
    report("gv Link to T failed for " + route_id + " " + error);
    reject("gv Link to T failed for " + route_id + " " + error);
    } );
 }
 return(p1);
}

Service3.prototype.getAlertData = function()
{
// report("2600 service3.getAlertData");
 let bReport = document.getElementById("rp").checked;
 let p1 = null;
 p1 = new Promise(function(resolve, reject){
   let tn = Date.now();
   if((tok && ((tn - ttime) > 1000) ) && (typeof SKEY !== 'undefined'))
   {
     let u = SURL + "alerts?api_key=" + SKEY + "&sort=-severity"; // + "&include=stop,trip,route"; 
//  report("u = " + u);
 
     let p = getXHRP4(u);
     p.then(function(data){
       if((data != null) && (data.length > 0))
       {
         let t = JSON.parse(data);
         if(bReport) 
             report("\ngetAlertData Found " + data ); 
         resolve(t.data);
       }
       else reject("alerts data is null");
       } ).catch(function(error){
         reject("getAlertData Link to T failed for " + u + " " + error);
       } );
   }
   else reject("getAlertData error" + (tn - ttime));
   });
 return(p1);
}
