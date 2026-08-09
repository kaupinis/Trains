//eo_eoservice.js

var UKEY = "guest";
var PKEY = "guest123";
const EOR = "https://www.eightolives.com/forms/eo_RT.php";
const EOS10 = "https://www.eightolives.com/forms/eo_Trains10.php";
const EOS11 = "https://www.eightolives.com/forms/eo_Trains11.php";

/*
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}
*/


const FETCHTIMEOUT = 8000;

function fetchResponse(u, timeout)
{
  var p = new Promise(function(resolve, reject) {
    const controller = new AbortController();
//    const id = setTimeout(() => controller.abort(), timeout);
    const id = setTimeout(controller.abort(), timeout);
    var p1 = fetch(u,{signal: controller.signal}).then(function(response) {
      if(response.ok)
      {
        if(response.status === 200)
        {  
          clearTimeout(id);
          resolve(response);
        }
        else report("26 fetchTO " + response.status + " " + response.statusText);
      }
      else 
      {
        clearTimeout(id);
        reject("35 fetchTO " + response.status);
      }
      }).catch(function(error) {
        reject(error);
      });
  });
  return(p);
}

function getFetchResponseJSON(u)
{
  var p = new Promise(function(resolve, reject) {
    fetch(u).then(function(response) {
      if(response.ok)
      {
        resolve(response.json());
      }
      else 
      {
        report("65 " + response.status);
        reject(response.status);
      }
    } ).catch(function(e) {
        report("69 " + e);
        reject(e);
    } )});
  return(p);
}

function getFetchResponseText(u)
{
  var p = new Promise(function(resolve, reject) {
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

function looseEval(obj)
{
  return Function('"use strict";return (' + obj + ')')();
}

function splitCSV2(s)
{
  var a = s.split(/\n/);
  var k = a.length;
  var i = 0;
  var d = [];
  var b = false;
  var t = "";
  while(i < k)
  {
    var line = a[i];
    var p1 = 0;
    var mode = 0;
    var j = 0;
    while((p1 < line.length) && (j < 20))
    {
      var n = line.indexOf("\"", p1);
      var nnn = line.indexOf("\"", n + 1);
      var nn = line.indexOf(",", p1);
      if((n == -1) || (n > nn)) // if no "
      {
        if(nn == -1) 
        {
            nn = line.length;
            d.push(line.substring(p1));
        }
        else d.push(line.substring(p1, nn));
//        report("    1. " + p1 + " " + n + " " + nnn + " " + nn);
        p1 = nn + 1;
      }
      else if((n < nn) && (nn != -1))
      {
        d.push(line.substring(n + 1, nnn));
//        report("    2. " + p1 + " " + n + " " + nnn + " " + nn);
        p1 = nnn + 2;
      }
      else
      {
//        report("    3. " + p1 + " " + n + " " + nnn + " " + nn);
        report("splitCSV2 abort: " + p1 + " " + n + " " + nn + " " + line);
        p1 = line.length;
      }
      j += 1;
    }
    i += 1;
  }
  return(d);
}

function splitCVS(s)
{
  var a = s.split(/,|\n/);
  var k = a.length;
  var i = 0;
  var d = [];
  var b = false;
  var t = "";
  while(i < k)
  {
    var n = a[i].indexOf("\"");
    if(n != -1)
    {
       var m = a[i].lastIndexOf("\"");
       if(n != m) // 2 quotes
       {
            b = false;
            d.push(a[i]);
       }
       else
       {
           if(!b)
           {
               b = true;
               t = a[i];
           }
           else
           {
               t = t + ", " + a[i];
               d.push(t);
               b = false;
           }
       }
    }
    else
    {
       if(!b) d.push(a[i]); 
       else t = t + ", " + a[i];
    }
    i += 1;
  }
  return(d);
}

function createForm()
{
  return( new FormData());
}

function sendForm(f)
{
  var p = new Promise(function(response, reject) {
    var request = new XMLHttpRequest();
    request.open("POST", EOX);
    request.onload = function(evt) {
        if(request.status == 200) response(request.responseText);
        else if(request.status == 404) reject("404 " + request.status.toString());
        else if(request.status == 500) 
        {
            request.abort();
            reject("500 " + request.status.toString());
        }
 //       else reject(request.status.toString());
    };
    request.onerror = function(evt) {
        reject(evt);
    };
    request.send(f);
  } );
  return(p);
}

function EoService()
{
var baseURL = eo_base;
this.cname = "EoService";
// report("EoService selected");
this.bsec = false;
this.fcp = null;
bsec = true;
this.baseURL = baseURL; 
}

EoService.prototype.getData = function(f, arg)
{
  var u = EOS + "?f=" + f + "&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + arg;
  return(getXHRP(u));
}

EoService.prototype.getMBTAGTFSDate = function()
{
  var u = EOS + "?f=21&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  return(getXHRP(u));
}

EoService.prototype.getLIRRGTFSDate = function()
{
  var u = EOS + "?f=47&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  return(getXHRP(u));
}

EoService.prototype.getFacilityInfo = function(stop, facility_type)
{
  var u = EOS + "?f=23&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop + "&facility_type=" + facility_type;
  return(getXHRP(u));
}

/*
EoService.prototype.getTileInfo = function(zoom, lat, lon)
{
  var u = EMS + "?f=0&u=" + UKEY + "&p=" + PKEY + "&z=" + zoom + "&lat=" + lat + "&lon=" + lon;
  return(getXHRP4(u));
}
*/

EoService.prototype.getFacilityInfoByStop = function(stop)
{
//  var u = EOS + "?f=24&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop;
  var u = EOS10 + "?f=0&fn=MBTA/facilities.txt&s=" + stop;
  return(getXHRP(u));
}

EoService.prototype.getPathwaysInfoByStop = function(stop)
{
//  var u = EOS + "?f=34&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop;
  var u = EOS10 + "?f=0&fn=MBTA/pathways.txt&s=" + stop;
  return(getXHRP(u));
}

EoService.prototype.getLevelsInfoByStop = function(stop)
{
//  var u = EOS + "?f=35&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop;
  var u = EOS10 + "?f=0&fn=MBTA/levels.txt&s=" + stop;
  return(getXHRP(u));
}

EoService.prototype.getGTFSData = function(fn, s)
{
  var u = EOS10 + "?f=0&fn=" + fn + "&s=" + s;
  return(getXHRP(u));
}

EoService.prototype.getStopsInfo = function(stop)
{
  var u = EOS + "?f=39&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop + "&svc=MBTA_GTFS";
  return(getXHRP4(u));
}

EoService.prototype.getStopsInfo2 = function(stop, dir)
{
  var u = EOS + "?f=54&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop + "&svc=" + dir;
  return(getXHRP4(u));
}

EoService.prototype.getInfo = function(gname, dirf)
{
  var u = EOS + "?f=55&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + gname + "&svc=" + dirf;
  return(getXHRP4(u));
}

EoService.prototype.getMBTAPredictionsByStop = function(stop_id)
{
  var sid = stop_id;
  if(sid.indexOf("T_") == 0) sid = stop_id.substring(2);
  else if(sid.indexOf("TB_") == 0) sid = stop_id.substring(3);
  var u = EOS11 + "?f=0&s=" + sid;
//  report("276 " + u);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAScheduleByStop = function(stop_id, fdate, min_time, max_trips)
{
  var sid = stop_id;
  if(sid.indexOf("T_") == 0) sid = stop_id.substring(2);
  else if(sid.indexOf("TB_") == 0) sid = stop_id.substring(3);
  var u = EOS11 + "?f=1&s=" + sid + "&fdate=" + fdate + "&mint=" + min_time + "&maxt=" + max_trips;;
//  report("276 " + u);
//  var r = getFetchResponseJSON(u);
//  report("317 " + r);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAScheduleByTrip = function(trip_id, fdate, datetime, max_trips)
{
//  report("328 " + trip_id);
  var tid = trip_id;
  if(tid.indexOf("T_") == 0) tid = trip_id.substring(2);
  else if(tid.indexOf("TB_") == 0) tid = trip_id.substring(3);
  var u = null;
  if(datetime != null)
  {
    u = EOS11 + "?f=2&s=" + tid + "&fdate=" + fdate + "&mint=" + min_time + "&maxt=" + max_trips;
  }
  else
  {
    u = EOS11 + "?f=3&s=" + tid + "&fdate=" + fdate  + "&maxt=" + max_trips;      
  }
//  report("276 " + u);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAPredictionsByTrip = function(trip_id)
{
  var tid = trip_id;
  if(tid.indexOf("T_") == 0) tid = trip_id.substring(2);
  else if(tid.indexOf("TB_") == 0) tid = trip_id.substring(3);
  var u = EOS11 + "?f=4&s=" + tid;
//  report("276 " + u);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAPredictionsByRoute = function(route_id)
{
  var rid = route_id;
  if(rid.indexOf("T_") == 0) rid = route_id.substring(2);
  else if(rid.indexOf("TB_") == 0) rid = route_id.substring(3);
  var u = EOS11 + "?f=7&s=" + rid;
//  report("276 " + u);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAScheduleByRoute = function(route_id, fdate, min_time, max_trips)
{
  var rid = route_id;
  if(rid.indexOf("T_") == 0) rid = route_id.substring(2);
  else if(rid.indexOf("TB_") == 0) rid = route_id.substring(3);
  var u = EOS11 + "?f=6&s=" + rid;
  if(min_time != null)
  {
    u = EOS11 + "?f=6&s=" + rid + "&fdate=" + fdate + "&mint=" + min_time + "&maxt=" + max_trips;
  }
  else
  {
    u = EOS11 + "?f=6&s=" + rid + "&fdate=" + fdate  + "&maxt=" + max_trips;      
  }
  report("371 " + u);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAStopsByLocation = function(lat, lon)
{
  var u = EOS11 + "?f=5&lat=" + lat + "&lon=" + lon;
//  report("276 " + u);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAPredictionByLocation = function(lat, lon)
{
  var u = EOS11 + "?f=8&lat=" + lat + "&lon=" + lon;
//  report("276 " + u);
//  getFetchResponseText(u).then( (t) => {
//    report("377 " + t);
//  });
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAVehiclesByRoute = function(route_id)
{
  var rid = route_id;
  if(rid.indexOf("T_") == 0) rid = route_id.substring(2);
  else if(rid.indexOf("TB_") == 0) rid = route_id.substring(3);
  var u = EOS11 + "?f=9&s=" + rid;
//  report("276 " + u);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getMBTAVehicles = function()
{
  var u = EOS11 + "?f=10";
//  report("276 " + u);
  return(getFetchResponseJSON(u));
}

EoService.prototype.getLAMPredictionsByStop = function(stop_id)
{
  var sid = "";
  if(stop_id.indexOf("LAMB" == 0)) sid = stop_id.substring(4);
  else sid = stop_id.substring(3);
  var u = EOS1 + "?f=32&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&n=" + sid;
  return(getXHRP4(u));
}

EoService.prototype.getLAMVehicleData = function()
{
//  var u = "https://www.eightolives.com/forms/eo_RT.php?f=33&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
//  return(getXHRP4(u));
  return(null);
}

EoService.prototype.getLAMBTripUpdateData = function(route, trip)
{
  var u = "https://www.eightolives.com/forms/eo_RT.php?f=224&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  if(route != "") u += "&route=" + route;
  else u += "&trip=" + trip;
  return(getXHRP4(u));
}

EoService.prototype.updateLAMBUSfile = function(arg1)
{
  var u = EOS1 + "?f=34&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&arg1=" + arg1;
  return(getXHRP4(u));
}

EoService.prototype.updateLAMRAILfile = function(arg1)
{
  var u = EOS1 + "?f=35&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&arg1=" + arg1;
  return(getXHRP4(u));
}

EoService.prototype.getNearbyStops = function()
{
  report("getNearbyStops");
  var p = new Promise(function(resolve, reject) {
    if((Xpos != 0) && (Ypos != 0)) 
    {
        var p1 = getStopsByLocation(Xpos, Ypos);
        p1.then(function(value) {
          resolve(value);  
        } ).catch(function(error) {
          reject(error);  
        } );
    }
    else{
      report("Xpos = " + Xpos + " Ypos = " + Ypos); 
      reject("Location services are OFF");
    }
  } );
  return(p);
}

EoService.prototype.getAlertHeadersByStop = function(stop_id)
{
 report("getAlertHeadersByStop " + stop_id);
 var p1 = new Promise(function(resolve, reject){
 var tn = Date.now();
 if((tok && ((tn - ttime) > 10000) ) && !(TKEY === undefined))
 {
//  var u = TURL + "alertheadersbystop?api_key=" + TKEY + "&stop=" + stop_id + "&format=json";
  var u = EOS + "?f=8&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop_id + "&format=json";
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      var t = JSON.parse(data);
      resolve(t);
    }
  } ).catch(function(error){
    report("gahbs Link to T failed for " + u + " " + error);
    reject("gahbs Link to T failed for " + u + " " + error);
    } );
  } 
  else if(TKEY === undefined)
  {
    var t = new Object();
    t.alert_headers = OAlerts2;
    resolve(t);   
  }
  else reject("getAlertHeadersByStop error" + (tn - ttime));
 } );
 return(p1);
}

EoService.prototype.getAlertHeadersByRoute = function(route_id)
{
 report("getAlertHeadersByRoute " + route_id);
 var p1 = new Promise(function(resolve, reject){
 var tn = Date.now();
 if((tok && ((tn - ttime) > 10000) ) && !(TKEY === undefined))
 {
//  var u = TURL + "alertheadersbyroute?api_key=" + TKEY + "&route=" + route_id + "&format=json";
  var u = EOS + "?f=9&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&route=" + route_id + "&format=json";
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      var t = JSON.parse(data);
      resolve(t);
    }
  } ).catch(function(error){
    report("gahbr Link to T failed for " + u + " " + error);
    reject("gahbr Link to T failed for " + u + " " + error);
    } );
  } 
  else reject("getAlertHeadersByRoute error" + (tn - ttime));
 } );
 return(p1);
}   

EoService.prototype.getPredictionByStop = function(stop_id)
{
// dreport("Eo getPredictionByStop " + stop_id);
 var p1 = new Promise(function(resolve, reject){
  var tam = null;
  if(isAmtrak1(stop_id) && document.getElementById("iam").checked)
  {
    if(serviceE != null)
    {
      var dnow = new Date();
      var p4 = serviceE.getScheduleByStop(stop_id, document.getElementById("max_time").value, document.getElementById("max_trips").value, dnow);
      p4.then(function(d) {
          tam = d;
          var tn = Date.now();
          if((tok && ((tn - ttime) > 10000) )) // && !(TKEY === undefined))
          {
//            var u = TURL + "predictionsbystop?api_key=" + TKEY + "&stop=" + stop_id + "&format=json";
            var u = EOS + "?f=6&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop_id + "&format=json";
            report("394 u = " + u);
            var p5 = getXHRP4(u);
            p5.then(function(data){
            if(data != null) 
            {
              var t = JSON.parse(data);
//      report("getPredictionByStop Found " + data );
              if(t.mode === undefined) ;
              else
              {
//                report("t.mode.length a = " + t.mode.length);
                var tcomb = t.mode.concat(tam.mode);
                t.mode = tcomb;
//                report("t.mode.length b = " + t.mode.length);
              }
              resolve(t);
            }
            else report("EogetPredictionByStop data is null");
            } ).catch(function(error){
//    TOK = false;
            dreport("eogpbs Link to T failed for " + u + " " + error);
            reject("eogpbs Link to T failed for " + u + " " + error);
            } );
          } 
          else if(TKEY === undefined)
          {
            resolve(tam);
          }
          else reject("EogetPredictionByStop error c " + (tn - ttime));

      }); 
    }
  
  }
else{
 var tn = Date.now();
 if((tok && ((tn - ttime) > 10000) ) && !(TKEY === undefined))
 {
  var u = EOS + "?f=6&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + stop_id + "&format=json";
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
//      report(":" + data + ":");
      var t = JSON.parse(data);
//      report("getPredictionByStop Found " + data ); 
      resolve(t);
    }
    else report("EogetPredictionByStop data is null");
  } ).catch(function(error){
//    TOK = false;
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  }
  else if(TKEY === undefined)
  {
    resolve(new Array());   
  }
  else reject("EogetPredictionByStop error " + (tn - ttime));
 } } );
 
 return(p1);
    
}

EoService.prototype.getScheduleByStop = function(stop_id, max_time, max_trips, datetime)
{
 var estop = stop_id.replace(" ", "%20");
 var mtime = Math.round(max_time);
 if(mtime < 5) mtime = 5;
 if(mtime > 1440) mtime = 1440;
 var mtrips = max_trips;
 if(mtrips < 5) mtrips = 5;
 if(mtrips > 100) mtrips = 100;
 report("getScheduleByStop " + estop);
 var p1 = new Promise(function(resolve, reject){
  var tam = null;
  if(isAmtrak1(stop_id) && document.getElementById("iam").checked)
  {
    if(serviceE != null)
    {
//      var dnow = new Date();
      var dnow = new Date(getTTime() * 1000);
      var p4 = serviceE.getScheduleByStop(stop_id, document.getElementById("max_time").value, document.getElementById("max_trips").value, dnow);
      p4.then(function(d) {
            tam = d;
            var tn = Date.now();
            if((tok && ((tn - ttime) > 10000) ) && !(TKEY === undefined))
            {
                ttime = tn;
                var u = "";
                if(datetime == null)
                {
//                    u = TURL + "schedulebystop?api_key=" + TKEY + "&stop=" + estop + "&max_time=" + mtime + "&max_trips=" + mtrips + "&format=json";
                    u = EOS + "?f=3&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + estop + "&max_time=" + mtime + "&max_trips=" + mtrips + "&format=json";
               }
                else
                {
//                u = TURL + "schedulebystop?api_key=" + TKEY + "&stop=" + estop + "&max_time=" + mtime + "&max_trips=" + mtrips + "&datetime=" + datetime + "&format=json";      
                u = EOS + "?f=3&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + estop + "&max_time=" + mtime + "&max_trips=" + mtrips + "&datetime=" + datetime + "&format=json";
                }
                var p = getXHRP(u);
                p.then(function(data){
                if(data != null) 
                {
                var t = JSON.parse(data);
                var tcomb = t.mode.concat(tam.mode);
 //               TFAIL = false;
                t.mode = tcomb;
//     report("Found " + t.stop_id + " " + t.mode.length + " " ); 
 //     report(t.stop_id);
                resolve(t);
                }       
                } ).catch(function(error){
                    TFAIL = true;
                    report("gsbs Link to T failed for " + u + " " + error);
                    if((tam != null) && (tam.length > 0))
                    {
                      resolve(tam);
                    }
                    else reject("gsbs Link to T failed for " + u + " " + error);
                } );
            }
            else if(TKEY === undefined)
            {
              resolve(tam);
            }
      } );
    }
  }
  else
  {
 var tn = Date.now();
 if((tok && ((tn - ttime) > 10000) ) && !(TKEY === undefined))
 {
  ttime = tn;
  var u = "";
  if(datetime == null)
  {
//    u = TURL + "schedulebystop?api_key=" + TKEY + "&stop=" + estop + "&max_time=" + mtime + "&max_trips=" + mtrips + "&format=json";
    u = EOS + "?f=3&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + estop + "&max_time=" + mtime + "&max_trips=" + mtrips + "&format=json";
  }
  else
  {
//    u = TURL + "schedulebystop?api_key=" + TKEY + "&stop=" + estop + "&max_time=" + mtime + "&max_trips=" + mtrips + "&datetime=" + datetime + "&format=json";      
    u = EOS + "?f=3&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + estop + "&max_time=" + mtime + "&max_trips=" + mtrips + "&datetime=" + datetime + "&format=json";
  }
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      TFAIL = false;
      var t = JSON.parse(data);
//     report("Found " + t.stop_id + " " + t.mode.length + " " ); 
 //     report(t.stop_id);
      resolve(t);
    }
  } ).catch(function(error){
    TFAIL = true;
    report("gsbs Link to T failed for " + u + " " + error);
    reject("gsbs Link to T failed for " + u + " " + error);
    } );
  }
  else if(TKEY === undefined)
  {
    resolve(null);   
  }
  else reject("getScheduleByStop error " + stop_id + " " + (tn - ttime));
  }
 } );

 return(p1);
}

EoService.prototype.getPredictionByTrip = function(trip_id)
{
 report("getPredictionByTrip " + trip_id);
 var p1 = new Promise(function(resolve, reject){
 var tn = Date.now();
 if((tok && ((tn - ttime) > 10000) ) && !(TKEY === undefined))
 {
//  var u = TURL + "predictionsbytrip?api_key=" + TKEY + "&trip=" + trip_id + "&format=json";
  var u = EOS + "?f=7&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&trip=" + trip_id + "&format=json";
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      var t = JSON.parse(data);
      resolve(t);
    }
  } ).catch(function(error){
    report("gpbt Link to T failed for " + u + " " + error);
    reject("gpbt Link to T failed for " + u + " " + error);
    } );
  } 
  else reject("getPredictionByTrip error" + (tn - ttime));
 } );
 return(p1);
    
}

EoService.prototype.getScheduleByTrip = function(trip_id, datetime)
{
 dreport("getScheduleByTrip " + trip_id);
 var p1 = new Promise(function(resolve, reject){
 var tn = Date.now();
 if((tok && ((tn - ttime) > 10000) ) && !(TKEY === undefined))
 {
  ttime = tn;
  var u = "";
  if(datetime == null)
  {
//    u = TURL + "schedulebytrip?api_key=" + TKEY + "&trip=" + trip_id + "&format=json";
    u = EOS + "?f=5&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&trip=" + trip_id + "&format=json";
  }
  else
  {
//    u = TURL + "schedulebytrip?api_key=" + TKEY + "&trip=" + trip_id + "&datetime=" + datetime + "&format=json";
    u = EOS + "?f=5&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&trip=" + trip_id + "&datetime=" + datetime +  "&format=json";
  }
  
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      var t = JSON.parse(data);
      TFAIL = false;
      dreport("Found " + t.trip_id + " " + t.stop.length + " " ); 
      resolve(t);
    }
  } ).catch(function(error){
    TFAIL = true;
    dreport("gsbt Link to T failed for " + u + " " + error);
    reject("gsbt Link to T failed for " + u + " " + error);
    } );
  } 
  else reject("getScheduleByTrip error" + (tn - ttime));
 } );
 return(p1);
    
}

EoService.prototype.getTripInfo = function(trip_id)
{
 dreport("Eo getTripInfo " + trip_id);
 var p1 = new Promise(function(resolve, reject){
  if(UKEY === undefined)
  {
     resolve(""); 
  }
  else
  {
  var h = homeport;
  var tid = trip_id;
  if(trip_id.indexOf("NY") == 0) h = "NYT";
  else if(trip_id.indexOf("MNR") == 0) 
  {
      h = "MNR";
      tid = "," + trip_id.substring(3) + ",";
  }
  else if(trip_id.indexOf("PP") == 0) 
  {
      h = "PP";
      tid = "," + trip_id.substring(2) + ",";
  }
  else if(trip_id.indexOf("NJT") == 0) 
  {
      h = "NJ";
//      tid = "," + trip_id.substring(2) + ",";
  }
  else if(trip_id.indexOf("CTA") == 0) 
  {
      h = "CTA";
      var sz = trip_id.substring(3,4);
      if(isNaN(sz))
      {
        tid = "R" + trip_id.substring(trip_id.length - 3);  
      } 
      else tid = trip_id.substring(3);
//      tid = "," + trip_id.substring(2) + ",";
  }
  else if(trip_id.indexOf("LI") == 0) 
  {
      h = "LI";
      var te = serviceE.getTripLIRR(trip_id);
      if(te != null)
      {
        tid = te.tid; 
        report(trip_id + " " + tid);
      }
  }
  else if(trip_id.indexOf("AMR") == 0) 
  {
      h = "AMR";
      tid = trip_id.substring(3);
  }
  report("h = " + h + " tid = " + tid);
  var u = EOS + "?f=12&u=" + UKEY + "&p=" + PKEY + "&h=" + h + "&trip=" + tid;
  var p = getXHRP4(u);
  p.then(function(data){
    if((data != null) && (data.length > 0))
    {
      report("getTripInfo Found " + data ); 
      resolve(data);
    }
    else 
    {
        report("EogetTripInfo data is null");
        reject("EogetTripInfo data is null");
    }
  } ).catch(function(error){
//    TOK = false;
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  }
  });
 
 return(p1);
}  

EoService.prototype.getShapeInfo = function(shape)
{
// dreport("Eo getShapeInfo " + shape);
 var i = shape.indexOf("\"");
 var s = shape;
 if(i == 0) s = shape.substring(1);
 i = s.indexOf("\"");
 if(i != -1) s = s.substring(0, i);
 var h = homeport;
 if(s.indexOf(".") != -1) h = "NYT";
 else if(s.indexOf("PHp_") == 0) 
 {
     h = "PH";
     s = s.substring(2);
 }     
 else if(s.indexOf("p_") == 0) h = "PP";
 else if(s.indexOf("CCp_") == 0) 
 {
     h = "CC";
     s = s.substring(2);
 }
 else if(s.indexOf("BRp_") == 0) 
 {
     h = "BR";
     s = s.substring(2);
 }     
 else if(s.indexOf("PBp_") == 0) 
 {
     h = "PB";
     s = s.substring(2);
 }     
 else if(s.indexOf("MVp_") == 0) 
 {
     h = "MV";
     s = s.substring(2);
 }     
 else if(s.indexOf("LRp_") == 0) 
 {
     h = "LR";
     s = s.substring(2);
 }     
 else if(s.indexOf("NJG") == 0) 
 {
     h = "NJG";
//     s = s.substring(2);
 }     
 else if(s.indexOf("NJH") == 0) 
 {
     h = "NJ";
//     s = s.substring(2);
 }     
 else if(s.indexOf("PV") == 0) 
 {
     h = "PV";
     s = s.substring(2);
 }     
 else if(s.indexOf("RIPT") == 0) 
 {
     h = "RI";
     s = s.substring(4);
 }     
 else if(s.indexOf("LI") == 0) 
 {
     h = "LI";
     s = s.substring(2);
 }     
 else if(s.indexOf("TR") == 0) 
 {
     h = "TR";
     s = s.substring(2);
 }     
 else if(s.indexOf("MD") == 0) 
 {
     h = "MD";
     s = s.substring(2);
 }     
 else if(s.indexOf("CATA") == 0) 
 {
     h = "CATA";
     s = s.substring(4);
 }     
 else if(s.indexOf("CML") == 0) 
 {
     h = "CML";
     s = s.substring(3);
 }     
 else if(s.indexOf("CMH") == 0) 
 {
     h = "CMH";
     s = s.substring(3);
 }     
 else if(s.indexOf("CAL") == 0) 
 {
     h = "CAL";
     s = s.substring(3);
 }     
 else if(s.indexOf("ME_") == 0) 
 {
     h = "ME";
 //    s = s.substring(3);
 }     
 else if(s.indexOf("SSL") == 0) 
 {
     h = "SSL";
     s = s.substring(3);
 }     
 else if(s.indexOf("CTA") == 0) 
 {
     h = "CTA";
     s = s.substring(3);
 }     
 else if(s.indexOf("B_") == 0) 
 {
     h = "BART";
     s = s.substring(2);
 }     
 else if(s.indexOf("SF_") == 0) 
 {
     h = "SF";
     s = s.substring(3);
 }     
 else if(s.indexOf("LAB") == 0) 
 {
     h = "LAB";
     s = s.substring(3);
 }     
 else if(s.indexOf("LAT") == 0) 
 {
     h = "LAT";
     s = s.substring(3);
 }     
 else if(s.indexOf("SEP_") == 0) 
 {
     h = "SEP";
     s = s.substring(4);
 }     
 else if(s.indexOf("PAT") == 0) 
 {
     h = "PATCO";
//     s = s.substring(4);
 }     
 else if(s.indexOf("SMART") == 0) 
 {
     h = "SMART";
     s = s.substring(5);
 }     
 else if(s.indexOf("BSCC") == 0) 
 {
     h = "BSCC";
     s = s.substring(4);
 }     
 else if(s.indexOf("SOUND") == 0) 
 {
     h = "SOUND";
     s = s.substring(5);
 }     
 else if(s.indexOf("PS") == 0) 
 {
     h = "PS";
     s = s.substring(2);
 }     
 else if(s.indexOf("AMS") == 0) 
 {
     h = "AMS";
 }     
 else if(s.indexOf("BL") == 0) 
 {
     h = "BL";
 }     
 else if(s.length > 15) 
 {
     h = "MW";
 }     
 else if(Number(s) < 100) 
 {
     h = "MNR";
     s += ",4";
 }
 report("Eo getShapeInfo " + s + " " + h);
 var p1 = new Promise(function(resolve, reject){
  var u = EOS + "?f=13&u=" + UKEY + "&p=" + PKEY + "&h=" + h + "&shape=" + s;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
//      report("getShapeInfo Found " + data.length + " " + data ); 
      resolve(data);
    }
    else report("EogetShapeInfo data is null");
  } ).catch(function(error){
//    TOK = false;
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}

EoService.prototype.getCalendar = function()
{
 report("Eo getCalendar ");
 var p1 = new Promise(function(resolve, reject){
  var u = EOS + "?f=15&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo getCalendar data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}  

EoService.prototype.getStreetData = function(lat, lon, filename)
{
 report("Eo getStreetData ");
 var p1 = new Promise(function(resolve, reject){
  var u = EOS + "?f=53&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&lat=" + lat + "&lon=" + lon + "&stop=" + filename;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve("{ \"data\": [" + data + "]}");
    }
    else report("Eo getStreetData data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}

EoService.prototype.getCalendarDates = function()
{
 report("Eo getCalendarDates ");
 var p1 = new Promise(function(resolve, reject){
  var u = EOS + "?f=16&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo getCalendarDates data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}

EoService.prototype.getFeedInfo = function()
{
 report("Eo getFeedInfo ");
 var p1 = new Promise(function(resolve, reject){
  var u = EOS + "?f=20&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo getFeedInfo data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}  

EoService.prototype.getScheduleByRouteSvc = function(routes, svc, max_time, max_trips, datetime)
{
 var mtime = Math.round(max_time);
 if(mtime < 5) mtime = 5;
 if(mtime > 1440) mtime = 1440;
 var mtrips = max_trips;
 if(mtrips < 5) mtrips = 5;
 if(mtrips > 100) mtrips = 100;
 report("eogetScheduleByRoutes " + routes + " " + datetime);
 var p1 = null;
 if((routes == null) || (routes == ""))
 {
   p1 = new Promise(function(resolve, reject){
      reject("No routes specified");
   } );
 }
 else
 {
 p1 = new Promise(function(resolve, reject){
 var tn = Date.now();
// if((tok && ((tn - ttime) > 10000) ) && !(TKEY === undefined))
 if(!(TKEY === undefined))
 {
  ttime = tn;
  var u = "";
  var u = EOS + "?f=14&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&routes=" + routes +"&datetime=" + datetime + "&max_time=" + mtime + "&max_trips=" + mtrips;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
//      report(":" + data + ":");
//      var t = JSON.parse(data);
      resolve(data); // was t
    }
  } ).catch(function(error){
    report("eogsbr Link failed for " + u + " " + error);
    reject("eogsbr Link failed for " + u + " " + error);
    } );
  }
  else reject("eogetScheduleByRoutes error no TKEY");
  
 } );
 }
 return(p1);
}

EoService.prototype.test14 = function()
{
 report("Make eotsked ");
 var p1 = new Promise(function(resolve, reject){
  var u = EOS + "?f=22&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo test14 data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
} 

EoService.prototype.test = function(n)
{
 report("Make sked " + n);
 var m = Number(n) + 11;
 var p1 = new Promise(function(resolve, reject){
  var u = EOS + "?f=" + m + "&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo test " + n + " data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}

function updateLAgtfs()
{
    clearReport();
    CloseMenu();
    serviceEO.updateLAMBUSfile("trips.txt").then( function(d) {
        serviceEO.updateLAMBUSfile("stop_times.txt").then(function(f) {
        report(d);
        }).catch(function(g){
            report(g);
        });
    }).catch(function(e) {
        report(e);
    });
}

EoService.prototype.getTripData = function(gtfsdir, trip_id)
{
//    report("EoService.getTripData");
 var EOS2 = "https://www.eightolives.com/forms/eo_Trains2.php";
 var p1 = new Promise(function(resolve, reject){
  var u = EOS2 + "?f=96&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&trip=" + trip_id + "&svc=" + gtfsdir;
//  report("927 u = " + u);
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo getTripData " + n + " data is null");
  } ).catch(function(error){
//    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}

EoService.prototype.getServicesForRoute = function(routeid, format)
{
 var EOS2 = "https://www.eightolives.com/forms/eo_Trains2.php";
 var p1 = new Promise(function(resolve, reject){
  var u = EOS2 + "?f=89&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&route=" + routeid + "&format=" + format;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo getServicesForRoute " + n + " data is null");
  } ).catch(function(error){
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}

EoService.prototype.getFileData = function(dcode, fname, grepi)
{
 var EOS2 = "https://www.eightolives.com/forms/eo_Trains2.php";
 var p1 = new Promise(function(resolve, reject){
  var u = EOS2 + "?f=97&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&route=" + fname + "&svc=" + dcode + "&format=" + grepi;
//  report("927 u = " + u);
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo getFileData " + n + " data is null");
  } ).catch(function(error){
//    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
    
}

EoService.prototype.getTripsData = function(routem, svc_id, mode)
{
//    report("EoService.getTripsData");
 var EOS2 = "https://www.eightolives.com/forms/eo_Trains2.php";
 var p1 = new Promise(function(resolve, reject){
  var u = EOS2 + "?f=91&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&route=" + routem + "&svc=" + svc_id + "&format=" + mode;
//  report("927 u = " + u);
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo getTripsData " + n + " data is null");
  } ).catch(function(error){
//    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}
     
EoService.prototype.getTimesData = function(trip_id, mode)
{
 var EOS2 = "https://www.eightolives.com/forms/eo_Trains2.php";
 var p1 = new Promise(function(resolve, reject){
  var u = EOS2 + "?f=92&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&trip=" + trip_id + "&format=" + mode;
//  report("1080 u = " + u);
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo getTimesData " + n + " data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}


EoService.prototype.test2 = function(n)
{
 report("Make sked2 " + n);
 var EOS2 = "https://www.eightolives.com/forms/eo_Trains2.php";
 var m = Number(n);
 var p1 = new Promise(function(resolve, reject){
  var u = EOS2 + "?f=" + m + "&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo test2 " + n + " data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}

EoService.prototype.test3 = function(n)
{
 report("Make sked3 " + n);
 var EOS2 = "https://www.eightolives.com/forms/eo_Trains3.php";
 if(n >= 100) EOS2 = "https://www.eightolives.com/forms/eo_Trains4.php";
 var m = Number(n);
 var p1 = new Promise(function(resolve, reject){
  var u = EOS2 + "?f=" + m + "&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
  var p = getXHRP(u);
  p.then(function(data){
    if(data != null) 
    {
      resolve(data);
    }
    else report("Eo test3 " + n + " data is null");
  } ).catch(function(error){
    dreport("Link to Eo failed for " + u + " " + error);
    reject("Link to Eo failed for " + u + " " + error);
    } );
  });
 
 return(p1);
}


function getRealTimeFeed(n)
{
  var u = "https://www.eightolives.com/forms/eo_Trains1.php?f=" + n;
  if(eo_base.indexOf("http:") != -1) u = "http://www.eightolives.com/forms/eo_Trains1.php?f=" + n;
  if(bAltssl) u = "https://kaupinis.fatcow.com/forms/eo_Trains1.php?f=" + n;
  var requestSettings = {
    method: 'GET',
    url: u,
    encoding: null
    };
  var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
  var request = require('request');

  request(requestSettings, function (error, response, body) {
   if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
      if (entity.vehicle) {
        console.log(entity.vehicle);
      }
    });
   }
  });
}

function Feed()
{
  this.type = "";
  this.timestamp = "";
  this.feed = null;
}

var MNRFeed = null;
var LIRRFeed = null;

function getFeed(type)
{
//  report("getFeed " + type);
  var p = null;
  var bok = window.location.href.indexOf("https") == 0;
  var CNOW = Math.round(NOW/1000);
  if(bok && (type.indexOf("MN") == 0))
  {
    p = new Promise(function(resolve, reject){
    if((MNRFeed == null) || (MNRFeed.timestamp < CNOW - 300))
    {
      var u = EOS + "?f=43&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
      var p1 = getXHRP(u).then(function(response) {
       var s = JSON.stringify(response);
       if(document.getElementById("rmf").checked)
       {
         clearReport();
         report(s);
       }
       try{
       var t = JSON.parse(s);
       MNRFeed = new Feed();
       MNRFeed.type = "MNR";
       MNRFeed.feed = JSON.parse(t);
       MNRFeed.timestamp = MNRFeed.feed.header.timestamp;
       }
       catch(e){report("caught " + e.toString() + " " + e.message);
       }
//       report("MNRFeed " + MNRFeed.timestamp);
       resolve(MNRFeed);
       } ).catch(function(error) {
         reject("getFeed MNRError: " + error);   
         });
    }
    else resolve(MNRFeed);
    });
  }
  else if(bok && (type.indexOf("LIRR") == 0))
  {
    p = new Promise(function(resolve, reject){
    if((LIRRFeed == null) || ((LIRRFeed.feed != null) && (LIRRFeed.feed.data.header.timestamp < CNOW - 300)))
    {
      var u = EOS + "?f=46&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
      var p1 = getXHRP(u).then(function(response) {
       var s = JSON.stringify(response);
       if(document.getElementById("rmf").checked)
       {
         clearReport();
         report(s);
       }
       try{
       var t = JSON.parse(s);
       LIRRFeed = new Feed();
       LIRRFeed.type = "LIRR";
       LIRRFeed.feed = JSON.parse(t);
       LIRRFeed.timestamp = LIRRFeed.feed.data.header.timestamp;
       }
       catch(e){report("caught " + e.toString() + " " + e.message);
       }
//       report("LIRRFeed " + LIRRFeed.timestamp);
       resolve(LIRRFeed);
       } ).catch(function(error) {
         reject("getFeed LIRRError: " + error);   
         });
    }
    else resolve(LIRRFeed);
    });
  }
  /*
  else if(bok && (type.indexOf("NYC") == 0))
  {
    var n = Number(type.substring(3));
    p = new Promise(function(resolve, reject){
    if((SUB[n] == null) || (SUB[n].timestamp < CNOW - 300))
    {
      var u = EOS1 + 
    }
    
  }
  */
  return(p);
}

function getRealTimeData(n)
{
  return( getRealTimeDataA(n, ""));  
}

function getRealTimeDataA(nn, s)
{
  var p = new Promise(function(resolve, reject) {
    n = Number(nn);
    if(((n > 1) && (n < 32)) || (n == 300) || (n == 293) || (n == 204) || (n == 205) || (n == 203) || ((n >= 304) && (n<706) && (n!= 312) && (n !=600)))
    {
//      report("1395 n = " + n);
    var xhr = new XMLHttpRequest();
    /*
    var url = "https://www.eightolives.com/forms/eo_Trains1.php?f=" + n;
    if(eo_base.indexOf("http:") != -1) url = "http://www.eightolives.com/forms/eo_Trains1.php?f=" + n;
    if(bAltssl) url = "https://kaupinis.fatcow.com/forms/eo_Trains1.php?f=" + n;
    if((n == 325) || (n == 312) || (n == 315) || ((n >= 331) && (n <= 335)) || (n == 227) || (n == 204) || (n == 205) || (n == 203)) url = "https://www.eightolives.com/forms/eo_RT.php?f=" + n + s;
        */
     
    var url = "https://www.eightolives.com/forms/eo_RT.php?f=" + n + s;
  /*  fetch(url).then(function(response) {
        response.arrayBuffer().then(function(a) {
            resolve(a);
        }).catch(function(e) {
        reject("1398 " + e);
        })
      }).catch(function(e) {
        reject("1398 " + e);
    });
    */
//    report("1411 " + url);
    xhr.open(
     "GET",
     url,
     true
    );
    xhr.responseType = "arraybuffer";
//    xhr.timeout = 10000;
    xhr.onload = function(evt) {
//      report("1420 data loaded");
      resolve(new Uint8Array(xhr.response));
//      resolve(xhr.response);
//    var msg = SomeMessage.decode(new Uint8Array(xhr.response));
//    alert(JSON.stringify(msg, null, 4)); // Correctly decoded
      };
    xhr.ontimeout = function(e){
          reject("1351 web timeout " + e);
          };
    xhr.onprogress = function(e){
//        report(e.type + " " + e.loaded + " bytes transferred");
        };
    xhr.onerror = function(e){
      reject("grtd " + e);
      };
    xhr.send(null);
//    report("request made");
    
    }
    else if((n >= 203) && (n <= 325))  // was 208
    {
//        report("1306 n = " + n);
      var url = "https://www.eightolives.com/forms/eo_RT.php?f=" + n + s; 
        
 /*     fetch(url).then(function(response) {
        response.text().then(function(a) {
            resolve(a);
        }).catch(function(e) {
        reject("1453 " + e);
        })
      }).catch(function(e) {
        reject("1456 " + e);
      });
    */
        
      var xhr = new XMLHttpRequest();
      xhr.responseType = "text";
      xhr.onload = function(evt) {
//        report("data loaded b");
//        resolve(new Uint8Array(xhr.response));
        resolve(xhr.response);
       };

      var url = "https://www.eightolives.com/forms/eo_RT.php?f=" + n + s; 
//      xhr.responseType = "arraybuffer";
//      report("1448 " + url);      
      xhr.open(
       "GET",
       url,
       true
          );
//      xhr.timeout = 5000;
      xhr.onprogress = function(e){
//        report(e.type + " " + e.loaded + " bytes transferred");
        };
      xhr.ontimeout = function(e){
          reject("1378 " + e);
          };
      xhr.onerror = function(e){
        reject(e);
        };
      xhr.send(null);
      
    }
    else if((n == 706) || (n == 707))
    {
      var u = "https://www.eightolives.com/forms/eo_RT.php?f=" + n + "&arg1=" + s;
      fetch(u).then(function(resp) {
          resp.text().then(function(dd) {
//              report("1465 " + dd);
              var d =JSON.parse(dd);
              resolve(d);
          }).catch(function(e) {
              report("1466 " + e + " u= " + u);
              reject(e);
          });
      }).catch(function(e) {
          reject(e);
      });
    }
    else if(n ==600)
    {
      var u = "https://www.eightolives.com/forms/eo_Trains_NJ.php?h=200" + s;
//      report("1488 " + u);
      fetch(u).then(function(resp) {
          resp.text().then(function(dd) {
//              report("1465 " + dd);
              var d =JSON.parse(dd);
              resolve(d);
          }).catch(function(e) {
              report("1494 " + e + " u= " + u);
              reject(e);
          });
      }).catch(function(e) {
          reject(e);
      });        
    }
    else reject("illegal n = " + n);
    });
  return(p);
}


function clearRealTimeCache(n)
{
  var u = "https://www.eightolives.com/forms/eo_Trains1.php?f=16&n=" + n;
  if(eo_base.indexOf("http:") != -1) u = "http://www.eightolives.com/forms/eo_Trains1.php?f=" + n;
  if(bAltssl) u = "https://kaupinis.fatcow.com/forms/eo_Trains1.php?f=16&n=" + n;
  var p = new Promise(function(resolve, reject) {
    var p1 = getXHRP(u);
    p1.then(function(data){
      if(data != null) 
      {
        resolve(data);
      }
      else report("clearRealTimeCache data is null");
      } ).catch(function(error){
        reject("clearRealTimeCache failed for " + u + " " + error);
      } ); 
  });
  return(p);
}


function getCTAFeed(n, arg1)
{
   var u = EOR + "?f=" + n + "&stop=" + arg1;
   var p = getXHRP(u);
   return(p);
}

// n = 208 or 209
function getCTAAlerts(n, stop, route)
{
   var u = EOR + "?f=" + n + "&stop=" + stop + "&route=" + route;
   var p = getXHRP(u);
   return(p);   
}

function getCTABusStopPred(stop)
{
   var u = EOR + "?f=210&stop=" + stop ;
   var p = getXHRP(u);
   return(p);   
}

function getCTABusVehPred(vid)
{
   var u = EOR + "?f=211&trip=" + vid;
   var p = getXHRP(u);
   return(p);   
}

function getCTABusVeh(vid)
{
   var u = EOR + "?f=212&trip=" + vid;
   var p = getXHRP(u);
   return(p);   
}

function getCTABusAlerts(stop, routes)
{
   var s = "";
   if(stop != null) s = "&stpid=" + stop;
   if(routes != null) s += "&rt=" + routes;
   var u = EOR + "?f=213" + s;
   var p = getXHRP(u);
   return(p);   
}

function getMNRFeed()
{
   var u = EOS + "?f=46&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport;
   var p = getXHRP(u).then(function(response) {
       var s = JSON.stringify(response);
       report(s);
   } ).catch(function(error) {
        report("MNR Feed Error: " + error);   
   });
}

function getRemoteTile()
{
  var url = "https://a.tile.openstreetmap.org/" + LLFilename;
  report("getRemoteTile " + url);
  fetch(url)
  .then(function(response) {
    return response.blob()
  })
  .then(function(blob) {
    saveBlobFS(LLFilename, blob);
  });  
}

function getLastModified(s)
{
  var u = "https://www.eightolives.com/forms/eo_TrainsUtilities.php?f=1000&svc=" + s;
  return(getXHRP4(u));
}

  
