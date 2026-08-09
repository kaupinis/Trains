// eo_alerts.js

/*
function getWXalertsByStop(stop_id)
{
  var u = getWXurl(stop_id);
  var p = null;
  if(u != null) p = getWXalerts(u);
  else p = new Promise(function (resolve, reject) {
      reject();
  });
  return(p);
}
*/

function getWXurl(stopid)
{
  var n = null;
  var stopname = getStopNameFromID(stopid);
  if(stopid == "AMSNYP") n = "ny";
  else if((stopid.indexOf("TR") == 0) || (stopid.indexOf("MDC") == 0) || (stopid.indexOf("BL") == 0) || (stopname.indexOf("-FL") != -1)) n = "fl";
  else if((stopname.indexOf("-CA") != -1) || (stopid.indexOf("CS") == 0) || (stopid.indexOf("CML") == 0)  || (stopid.indexOf("SF") == 0) || (stopid.indexOf("B_") == 0) || (stopid.indexOf("LAM") == 0) || (stopid.indexOf("CAL") == 0) || (stopid.indexOf("SMART") == 0)) n = "ca";
  else if(stopname.indexOf("-LA") != -1) n = "la";
  else if(stopname.indexOf("-WI") != -1) n = "wi";
  else if(stopname.indexOf("-AZ") != -1) n = "az";
  else if(stopname.indexOf("-NM") != -1) n = "nm";
  else if(stopname.indexOf("-TX") != -1) n = "tx";
  else if(stopname.indexOf("-KS") != -1) n = "ks";
  else if(stopname.indexOf("-OH") != -1) n = "oh";
  else if(stopname.indexOf("-WA") != -1) n = "wa";
  else if(stopname.indexOf("-OR") != -1) n = "or";
  else if(stopname.indexOf("-OK") != -1) n = "ok";
  else if(stopname.indexOf("-MI") != -1) n = "mi";
  else if(stopname.indexOf("-IN") != -1) n = "in";
  else if(stopname.indexOf("-PA") != -1) n = "pa";
  else if(stopname.indexOf("-GA") != -1) n = "ga";
  else if(stopname.indexOf("-NC") != -1) n = "nc";
  else if(stopname.indexOf("-SC") != -1) n = "sc";
  else if(stopname.indexOf("-WV") != -1) n = "wv";
  else if(stopname.indexOf("-NY") != -1) n = "ny";
  else if(stopname.indexOf("-NJ") != -1) n = "nj";
  else if(stopname.indexOf("-ME") != -1) n = "me";
  else if(stopname.indexOf("-NH") != -1) n = "nh";
  else if(stopname.indexOf("-VT") != -1) n = "vt";
  else if(stopname.indexOf("-CO") != -1) n = "co";
  else if(stopname.indexOf("-VA") != -1) n = "va";
  else if(stopname.indexOf("-UT") != -1) n = "ut";
  else if(stopname.indexOf("-WV") != -1) n = "wv";
  else if(stopname.indexOf("-MA") != -1) n = "ma";
  else if(stopname.indexOf("-MD") != -1) n = "md";
  else if(stopname.indexOf("-MO") != -1) n = "mo";
  else if(stopname.indexOf("-IL") != -1) n = "il";
  else if(stopid.indexOf("T_") == 0)     n = "ma";
  else if(stopid.indexOf("TB_") == 0)    n = "ma";
  else if(stopid.indexOf("SEP_") == 0)   n = "pa";
  else if(stopid.indexOf("PATCO") == 0)  n = "nj";
  else if(stopid.indexOf("PS_") == 0)    n = "wa";
  else if(stopid.indexOf("DT_") != -1)   n = "tx";
  else if(stopid.indexOf("TEX_") != -1)  n = "tx";
  else if(stopid.indexOf("WMA") == 0)    n = "md";
  else if(stopid.indexOf("VRE") == 0)    n = "va";
  else if(stopid.indexOf("RTD") == 0)    n = "co";
  else if(stopid.indexOf("SSL") == 0)    n = "il";
  else if(stopid.indexOf("NYT") == 0)    n = "ny";
  else if(stopid.indexOf("SUN_") == 0)   n = "fl";
  else if(stopid.indexOf("MARC_") == 0)  n = "md";
  else if(stopid.indexOf("B_") == 0)     n = "ca";
  else if(stopid.indexOf("ME_") == 0)    n = "il";
  else if(stopid.indexOf("VTA_") == 0)   n = "ca";
  else if(stopid.indexOf("MTA") == 0)    n = "ny";
  else if(stopid.indexOf("MV_") == 0)    n = "ma";
  else if(stopid.indexOf("MSL") == 0)    n = "mo";
  else if(stopid.indexOf("UTA") == 0)    n = "ut";
  else if(stopid.indexOf("NM") == 0)     n = "nm";
  else if(stopid.indexOf("TM") == 0)     n = "wa";
  else if(stopid == "AMSWAS") n = "md";
  else if(stopid.indexOf("MDM") == 0)    n = "md";
  else
  {
//    console.log("61 check wx alerts for stopid = " + stopid);
    var routes = getRoutesS(stopid);
    if(routes.indexOf("CTA") == 0) n = "il";
    else if(routes.indexOf("ME_") != -1) n = "il";
    else if((routes.indexOf("MN") != -1) || (routes.indexOf("LIRR") != -1) || (routes.indexOf("NY") != -1)) n = "ny";
  }
  if(n != null)
  {
    n =  "https://alerts.weather.gov/cap/" + n + ".php?x=0"; 
  }
  return(n);  
}



function getNJAlerts(routesS)
{
//  report("getNJAlerts "+ routesS);
  var ra = routesS.split(",");
  var p1 = new Promise(function(resolve1, reject1){
  var p = null;
  var W = [];
  var u = null;
  var title = "";
  var n = 1;
  if(routesS.indexOf("VIA" != -1)) resolve1(W);
  if(isInArray("NJRHBLR", ra)) n = 2;
  else if(isInArray("NJRNLR", ra)) n = 2;
  else if(isInArray("NJRRVLN", ra)) n = 2;
  else if((routesS.indexOf(",Y") != -1) || (routesS.indexOf("Y") == 0)) n = 3;
  var prefix = "NJ";
  if(n == 1) u = EOS + "?f=49&u=" + UKEY + "&p=guest123&h=" + homeport;
  else if(n == 2) 
  {
      u = EOS + "?f=50&u=" + UKEY + "&p=guest123&h=" + homeport;
      prefix = "NJLR";
  }
  else if(n == 3) 
  {
      u = EOS + "?f=51&u=" + UKEY + "&p=guest123&h=" + homeport;
      prefix = "NJBUS";
  }
  
//  if(n != 0)
  {
//    if(bUseFetch) 
    p = getWXalertsF(u);
//    else p = getWXalertsX(u);
    if(p != null)
    {
      p.then(function(xd) {
        var e0 = xd.documentElement;
        var els = xd.getElementsByTagName("item");
        var k = els.length;
//        report("126 got " + k + " items");
        var i = 0;
        for(i = 0; i<k; i++)
        {
          title = "";
          var buse = true;
          var el = els[i];
          var title = el.getElementsByTagName("title")[0].textContent; 
          if(title.indexOf("BUS") == 0)
          {
            var busno = "Y" + title.substring(4, title.substring(4).indexOf(" ")); 
            if(isInArray(busno, ra))
            {
              buse = true;
            }
            else
            {
              buse = false;   
            }
          }
          var description = el.getElementsByTagName("description")[0].textContent;
          var link = el.getElementsByTagName("link")[0].textContent;
 //         var more = "<a href=\'"+ link + "\' target=\'g\'>[more]</a>";
          var a = {alert_id : "NJ" + i, header_text: title + " " + description,
             description: description, cause: "", severity: "", effect: "", link: link};
          var bx = true;
          var ii = 0;
          /*
          while(bx && (ii < W.length))
          {
            if(W[ii].header_text.indexOf(title) != -1) bx = false;
            ii += 1;
          }
          */
          if(bx && (ii < 20) && buse) W[W.length] = a;
        }
//        report("160 W.length = " + W.length); 
        NJ_ALERTS = W;
        resolve1(W);
      }).catch(function(error) {
        reject1("getNJAlerts " + error);
      });
    }
    else 
    {
        report("got no NJ items null");
        NJ_ALERTS = null;
        reject1("got no NJ items");
    } 
  }
//  else NJ_ALERTS = null;
  });
  return(p1);
}

function getRouteName(s)
{
  var r = serviceE.getRouteS(s);
  var x = "";
  if(r != null) x = r.common_name;
  if(r != null) x = r.route_name;
  return(x);
}

function getBARTalerts(stopid, routesS, tripid)
{
  var p1 = new Promise(function(resolve, reject){
      if(SUB[19] != null)
      {
//        report("3406 " + JSON.stringify(SUB[19], null, 4));
        var ctime = getPBTime(SUB[19].header.timestamp);
        if((getTTime() - ctime) > 900)
        {
          queueSUB(19);
        }
      }
      else queueSUB(19);
                       
      if(SUB[19] != null)                 
      {
        var W = [];
        var feed = SUB[19];
        var els = feed.entity;
        var k = els.length;
//        report("190 k = "+ k);
        var id = "";
        var rs = "B_";
        var title = "";
        var i = 0;
        for(i = 0; i < k; i++)
        {
           var el = els[i];
           id = el.id;
           if(el.alert != null)
           {
             var a = el.alert;
             var b = false;
             var sid = null;
             title = "";
             var ies = a.informed_entity;
             if(typeof ies !== 'undefined')
             {
             var k3 = ies.length;
             var i3 = 0;
//             report("209 ies.length = " + ies.length);
             while(i3 < k3)
             {
               if(ies[i3].stop_id != null)
               {
                 if(stopid != null)
                 {
                      b = true;
                       title = " " + getStopNameFromID(stopid);
                 }
               }
               if(ies[i3].route_id != null)
               {
                 var r = rs + ies[i3].route_id;
 //                report("145 " + r + " " + routesS);
                 if(routesS.indexOf(r) != -1) 
                 {
                     b = true;
                     title = " " + getRouteName(r);
                 }
               }
               if(ies[i3].agency_id == "BART")
               {
                 b = true;
               }
               if(ies[i3].trip != null)
               {
                 if(ies[i3].trip.trip_id != null)
                 {
                   if(ies[i3].trip.trip_id == tripid) 
                   {
                     b = true;
//                     report("  b is true");
                   }
//                     report("trip_id = " + ies[i3].trip.trip_id);
                 }
                 if(ies[i3].trip.route_id != null)
                 {
                   var r = rs + ies[i3].trip.route_id;
//                   report("got route " + r + " " + getRouteName(r));
                   if(routesS.indexOf(r) != -1) 
                   {
                     b = true;
                     title = " " + getRouteName(r);
//                     report("got route " + r + " " + getRouteName(r));
                   }
                 }
               }
               i3 += 1;
             }
                  
               
           } 
           
           if(b)
           {
             var t = "";
             var regex = /"/g;
             if(typeof a.description_text !== 'undefined')
             {
               var sd = a.description_text.translation[0].text;
               sd = sd.replace(regex, '_');
               regex = /'/g;
               sd = sd.replace(regex, '_');
               if((a.effect == 8) && (a.description_text.translation[0].text.indexOf("levator") != -1))
               {
                 t = "ELEVATOR";   
               }
             }
             var ax = {alert_id : id + i, header_text: title + " \n" + a.header_text.translation[0].text,
             description: sd, cause: a.cause, severity: "", effect: t};
             W.push(ax);
               
           }
           }
        }
         resolve(W);  
      }
      else reject();
      });
  return(p1);   
}

function getMSLalerts(stopid, routesS, tripid)
{
  var p1 = new Promise(function(resolve, reject){
      
      if(SUB[51] != null)
      {
//        report("3406 " + JSON.stringify(SUB[51], null, 4));
        var ctime = getPBTime(SUB[51].header.timestamp);
        if((getTTime() - ctime) > 900)
        {
          queueSUB(51);
        }
      }
      else queueSUB(51);
      
                       
      if((SUB[51] != null) && (SUB[51].entity != null))                
      {
        var W = [];
        var feed = SUB[51];
        var els = feed.entity;
        var k = els.length;
//        report("190 k = "+ k);
        var id = "";
        var rs = "MSLB";
        var title = "";
        var i = 0;
        for(i = 0; i < k; i++)
        {
           var el = els[i];
           id = el.id;
           if(el.alert != null)
           {
             var a = el.alert;
             var b = false;
             var sid = null;
             title = "";
             var ies = a.informed_entity;
             if(typeof ies !== 'undefined')
             {
             var k3 = ies.length;
             var i3 = 0;
//             report("209 ies.length = " + ies.length);
             while(i3 < k3)
             {
               if(ies[i3].stop_id != null)
               {
                 if(stopid != null)
                 {
                      b = true;
                       title = " " + getStopNameFromID(stopid);
                 }
               }
               if(ies[i3].route_id != null)
               {
                 var r = rs + ies[i3].route_id;
 //                report("145 " + r + " " + routesS);
                 if(routesS.indexOf(r) != -1) 
                 {
                     b = true;
                     title = " " + getRouteName(r);
                 }
               }
               
               if(ies[i3].trip != null)
               {
                 if(ies[i3].trip.trip_id != null)
                 {
                   if(ies[i3].trip.trip_id == tripid) 
                   {
                     b = true;
//                     report("  b is true");
                   }
//                     report("trip_id = " + ies[i3].trip.trip_id);
                 }
                 if(ies[i3].trip.route_id != null)
                 {
                   var r = rs + ies[i3].trip.route_id;
//                   report("got route " + r + " " + getRouteName(r));
                   if(routesS.indexOf(r) != -1) 
                   {
                     b = true;
                     title = " " + getRouteName(r);
//                     report("got route " + r + " " + getRouteName(r));
                   }
                 }
               }
               i3 += 1;
             }
                  
               
           } 
           
           if(b)
           {
             var t = "";
             var regex = /"/g;
             if(typeof a.description_text !== 'undefined')
             {
               var sd = a.description_text.translation[0].text;
               sd = sd.replace(regex, '_');
               regex = /'/g;
               sd = sd.replace(regex, '_');
               if((a.effect == 8) && (a.description_text.translation[0].text.indexOf("levator") != -1))
               {
                 t = "ELEVATOR";   
               }
             }
             var ax = {alert_id : id + i, header_text: title + " \n" + a.header_text.translation[0].text,
             description: sd, cause: a.cause, severity: "", effect: t};
             W.push(ax);
               
           }
           }
        }
         resolve(W);  
      }
      else reject();
      });
  return(p1);   
}



function getSEPTAalerts(stopid, routesS, tripid)
{
  var p1 = new Promise(function(resolve, reject){
      if(SUB[26] != null)
      {
//        report("3406 " + JSON.stringify(SUB[24], null, 4));
        var ctime = getPBTime(SUB[26].header.timestamp);
        if((getTTime() - ctime) > 900)
        {
          queueSUB(26);
        }
      }
      else queueSUB(26);
                       
      if(SUB[26] != null)                 
      {
        var W = [];
        var feed = SUB[26];
        var els = feed.entity;
        var k = els.length;
        var id = "";
        var rs = "SEP_";
        var title = "";
        var i = 0;
        for(i = 0; i < k; i++)
        {
           var el = els[i];
           id = el.id;
           if(el.alert != null)
           {
             var a = el.alert;
             var b = false;
             var sid = null;
             title = "";
             var ies = a.informed_entity;
             if(typeof ies !== 'undefined')
             {
             var k3 = ies.length;
             var i3 = 0;
 //            report("197 ies.length = " + ies.length);
             while(i3 < k3)
             {
               if(ies[i3].stop_id != null)
               {
                 if(stopid != null)
                 {
                      b = true;
                       title = " " + getStopNameFromID(stopid);
                 }
               }
               if(ies[i3].route_id != null)
               {
                 var r = rs + ies[i3].route_id;
 //                report("145 " + r + " " + routesS);
                 if(routesS.indexOf(r) != -1) 
                 {
                     b = true;
                     title = " " + getRouteName(r);
                 }
               }
               if(ies[i3].trip != null)
               {
                 if(ies[i3].trip.trip_id != null)
                 {
                   if(ies[i3].trip.trip_id == tripid) 
                   {
                     b = true;
//                     report("  b is true");
                   }
//                     report("trip_id = " + ies[i3].trip.trip_id);
                 }
                 if(ies[i3].trip.route_id != null)
                 {
                   var r = rs + ies[i3].trip.route_id;
//                   report("got route " + r + " " + getRouteName(r));
                   if(routesS.indexOf(r) != -1) 
                   {
                     b = true;
                     title = " " + getRouteName(r);
//                     report("got route " + r + " " + getRouteName(r));
                   }
                 }
               }
               i3 += 1;
             }
                  
               
           } 
           
           if(b)
           {
             var t = "";
             var regex = /"/g;
             if(typeof a.description_text !== 'undefined')
             {
               var sd = a.description_text.translation[0].text;
               sd = sd.replace(regex, '_');
               regex = /'/g;
               sd = sd.replace(regex, '_');
               if((a.effect == 8) && (a.description_text.translation[0].text.indexOf("levator") != -1))
               {
                 t = "ELEVATOR";   
               }
             }
             var ax = {alert_id : id + i, header_text: title + " \n" + a.header_text.translation[0].text,
             description: sd, cause: a.cause, severity: "", effect: t};
             W.push(ax);
               
           }
           }
         }
         resolve(W);  
        }
        else reject();
      });
  return(p1);   
}

/*
function getCTAAlerts(stopid, routesS, tripid)
{
  var p1 = new Promise(function(resolve, reject){
      getRealTimeData(209).then(function(g) {
        var W = [];
        var CTAAlerts = JSON.parse(g);
        var els = CTAAlerts.Alert;
        var k = els.length;
        var id = "Metra";
        var rs = "ME";
        var title = "";
        var i = 0;
        for(i = 0; i < k; i++)
        {
           var el = els[i];
           if(el.alert != null)
           {
             var a = el.alert;
           }
        }
      })});
  return(p1);   
}
*/

function getMetraAlerts(stopid, routesS, tripid)
{
//  report("586 "+ stopid + " " + tripid);
  var p1 = new Promise(function(resolve, reject){
      if(SUB[56] != null)
      {
//        report("3406 " + JSON.stringify(SUB[56], null, 4));
        var ctime = getPBTime(SUB[56].header.timestamp);
        if((getTTime() - ctime) > 900)
        {
          queueSUB(56);
        }
      }
      else queueSUB(56);
                       
      if(SUB[56] != null) 
      {
        var W = [];
        var feed = SUB[56];
        var els = feed.entity;
        var k = els.length;
        var id = "Metra";
        var rs = "ME";
        var title = "";
        var i = 0;
        for(i = 0; i < k; i++)
        {
           var el = els[i];
           if(el.alert != null)
           {
             var a = el.alert;
             var b = false;
             var sid = null;
             title = "";
             var ies = a.informed_entity;
             if(typeof ies !== 'undefined')
             {
             var k3 = ies.length;
             var i3 = 0;
//             report("ies.length = " + ies.length);
             while(i3 < k3)
             {
               if(ies[i3].stop_id != null)
               {
                 if(stopid != null)
                 {
                      b = true;
                       title = " " + getStopNameFromID(stopid);
                 }
               }
               if(ies[i3].route_id != null)
               {
                 var r = rs + ies[i3].route_id;
 //                report("145 " + r + " " + routesS);
                 if(routesS.indexOf(r) != -1) 
                 {
                     b = true;
                     title = " " + getRouteName(r);
                 }
               }
               if(ies[i3].trip != null)
               {
                 if(ies[i3].trip.trip_id != null)
                 {
                   if(ies[i3].trip.trip_id == tripid) 
                   {
                     b = true;
//                     report("  b is true");
                   }
//                     report("trip_id = " + ies[i3].trip.trip_id);
                 }
                 if(ies[i3].trip.route_id != null)
                 {
                   var r = rs + ies[i3].trip.route_id;
//                   report("got route " + r + " " + getRouteName(r));
                   if(routesS.indexOf(r) != -1) 
                   {
                     b = true;
                     title = " " + getRouteName(r);
//                     report("got route " + r + " " + getRouteName(r));
                   }
                 }
               }
               i3 += 1;
             }
                  
               
           } 
           
           if(b)
           {
             var t = "";
             var regex = /"/g;
             var sd = a.description_text.translation[0].text;
             sd = sd.replace(regex, '_');
             regex = /'/g;
             sd = sd.replace(regex, '_');
             if((a.effect == 8) && (a.description_text.translation[0].text.indexOf("levator") != -1))
             {
               t = "ELEVATOR";   
             }
             var ax = {alert_id : id + i, header_text: title + " \n" + a.header_text.translation[0].text,
             description: sd, cause: a.cause, severity: "", effect: t};
             W.push(ax);
               
           }
           }
         }
         resolve(W);  
        }
    });
  return(p1);   
}

function getMetrolinkAlerts(stopid, routesS, tripid)
{
//    report("558 getMetrolinkAlerts " + stopid + " " + routesS + " " + tripid);
   var p1 = new Promise(function(resolve, reject){
      if(SUB[42] != null)
      {
//        report("3406 " + JSON.stringify(SUB[24], null, 4));
        var ctime = getPBTime(SUB[42].header.timestamp);
        if((getTTime() - ctime) > 900)
        {
          queueSUB(42);
        }
      }
      else queueSUB(42);
                       
      if(SUB[42] != null)                 
      {
        var W = [];
        var feed = SUB[42];
        var els = feed.entity;
        var k = els.length;
        //report("577 " + JSON.stringify(els, null, 4));
        var k = els.length;
        var id = "Metrolink";
        var rs = "CML";
        var title = "Metrolink ";
        var i = 0;
        for(i = 0; i < k; i++)
        {
           var el = els[i];
           if(el.alert != null)
           {
             var a = el.alert;
             var b = false;
             var sid = null;
             title = "";
             var ies = a.informed_entity;
             if(typeof ies !== 'undefined')
             {
             var k3 = ies.length;
             var i3 = 0;
//             report("ies.length = " + ies.length);
             while(i3 < k3)
             {
               if(ies[i3].stop_id != null)
               {
                 if(stopid != null)
                 {
                      b = true;
                       title = " " + getStopNameFromID(stopid);
                 }
               }
               if(ies[i3].route_id != null)
               {
                 var r = rs + ies[i3].route_id;
 //                report("145 " + r + " " + routesS);
                 if(routesS.indexOf(r) != -1) 
                 {
                     b = true;
                     title = " " + getRouteName(r);
                 }
               }
               if(ies[i3].trip != null)
               {
                 if(ies[i3].trip.trip_id != null)
                 {
                   if(ies[i3].trip.trip_id == tripid) 
                   {
                     b = true;
//                     report("  b is true");
                   }
//                     report("trip_id = " + ies[i3].trip.trip_id);
                 }
                 if(ies[i3].trip.route_id != null)
                 {
                   var r = rs + ies[i3].trip.route_id;
//                   report("got route " + r + " " + getRouteName(r));
                   if(routesS.indexOf(r) != -1) 
                   {
                     b = true;
                     title = " " + getRouteName(r);
//                     report("got route " + r + " " + getRouteName(r));
                   }
                 }
               }
               i3 += 1;
             }
                  
               
           } 
           
   //        if(b)
           {
             var t = "";
             var regex = /"/g;
             var sd = "";
             if(a.description_text != null)
             {
               a.description_text.translation[0].text;
               sd = sd.replace(regex, '_');
               regex = /'/g;
               sd = sd.replace(regex, '_');
               if((a.effect == 8) && (a.description_text.translation[0].text.indexOf("levator") != -1))
               {
                 t = "ELEVATOR";   
               }
             }
             var ax = {alert_id : id + i, header_text: title + " \n" + a.header_text.translation[0].text,
             description: sd, cause: a.cause, severity: "", effect: t};
             W.push(ax);
               
           }
           }
         }
         resolve(W);  
      }});
  return(p1);   
}

function getMTAalerts(stopid, routesS, tripid)
{
//  report("270 getMTAalerts " + stopid + ": " + routesS + ": " + tripid);
  var p1 = new Promise(function(resolve, reject){
  var p = null;
  var W = [];
  var u = EOS + "?f=48&u=" + UKEY + "&p=guest123&h=" + homeport;
  var un = "";
  var np = 0;
  var n = 0;
  var id = "";
  var rs = "MN";
  if(routesS.indexOf("MN") != -1) 
  {
    n |= 1;
    np = 17;
    un = EOS1 + "?f=17&u=" + UKEY + "&p=guest123&h=" + homeport;
    id = "MNR";
    rs = "MN"
  }
  if(routesS.indexOf("LIRR") != -1) 
  {
    n |= 2;
    np = 18;
    un = EOS1 + "?f=18&u=" + UKEY + "&p=guest123&h=" + homeport;
    id = "LIRR";
    rs = "LIRR";
  }
  if(routesS.indexOf("NY") != -1) 
  {
    n |= 4;
    np = 19;
    un = EOS1 + "?f=19&u=" + UKEY + "&p=guest123&h=" + homeport;
    id = "NYC";
    rs = "NY";
  }
  
  if(true)
//  if(document.getElementById("bUseNewNY").checked && (un != ""))
  {
    var i = np - 5;
    if(SUB[i] == null) 
    {
      queueSUB(i); 
//      report("312 SUB[" + i + "] = null");
    }
    else
    {
       var dtime = getTTime();
       var ctime = SUB[i].header.timestamp;
       if(typeof SUB[i].header.timestamp.low !== 'undefined') ctime = SUB[i].header.timestamp.low;
//        report("319 " + dtime  + " " + ctime);
//       if((dtime - ctime) > 300)
//       {
//           report("320 queue because dtime - ctime = " + dtime - ctime);
//         queueSUB(i);
//       }
//       else  // form alerts
       {
         var feed = SUB[i];
         var els = feed.entity;
         var title = "";
         var k2 = els.length;
         var i2 = 0;
 //          report("329 form alerts " + k2 +" " + i);
         while(i2 < k2)
         {
           title = "";
           var b = false;
           if(rs == "LIRR") b = true;
           var el = els[i2];
           if(el.alert != null)
           {
             var a = el.alert;
             var sid = null;
             var ies = a.informed_entity;
             if(typeof ies !== 'undefined')
             {
             var k3 = ies.length;
             var i3 = 0;
//             report("ies.length = " + ies.length);
             while(i3 < k3)
             {
               if(ies[i3].stop_id != null)
               {
                 if((stopid != null) && (ies[i3].stop_id != ""))
                 {
//                   report("311 " + stopid + " " + getStopIdForNumber(ies[i3].stop_id, rs) + " " + ies[i3].stop_id);
                   if(stopid == getStopIdForNumber(ies[i3].stop_id, rs)) 
                   {
                       b = true;
                       title = " " + getStopNameFromID(stopid);
 //                      report("636 b is true");
                   }
                 }
               }
               if(ies[i3].route_id != null)
               {
                 var r = rs + ies[i3].route_id;
//                 report("145 " + r + " " + routesS);
                 if((routesS.indexOf(r) != -1) && (r!= "NY") && (r!= "MN"))
                 {
                     b = true;
                     title = " " + getRouteName(r);
//                     report("647 b true");
                 }
               }
               if(ies[i3].trip != null)
               {
                 if(ies[i3].trip.trip_id != null)
                 {
                   if(ies[i3].trip.trip_id == tripid) 
                   {
                     b = true;
//                     report("657  b is true");
                   }
//                     report("660 trip_id = " + ies[i3].trip.trip_id);
                 }
                 if(ies[i3].trip.route_id != null)
                 {
                   var r = rs + ies[i3].trip.route_id;
//                   report("got route " + r + " " + getRouteName(r));
                   if(routesS.indexOf(r) != -1) 
                   {
                     b = true;
                     title = " " + getRouteName(r);
//                     report("got route " + r + " " + getRouteName(r));
                   }
                 }
               }
               i3 += 1;
             }
                  
               
           } 
 //          report("677 b = " + b);
           if(b)
           {
             var t = "";
             var regex = /"/g;
             if(a.description_text != null)
             {
             var sd = a.description_text.translation[0].text;
             sd = sd.replace(regex, '_');
             regex = /'/g;
             sd = sd.replace(regex, '_');
             if((a.effect == 8) && (a.description_text.translation[0].text.indexOf("levator") != -1))
             {
               t = "ELEVATOR";   
             }
             }
             var ax = {alert_id : id + i2, header_text: title + " \n" + a.header_text.translation[0].text,
             description: sd, cause: a.cause, severity: "", effect: t};
             W.push(ax);
//             report("695 " + a.header_text.translation[0].text);
           //  }
  //           else report("363 a.description_text is null for i2 = " + i2);
               
           }
           }
           i2 += 1;
         }
         
       }
    }
  }
//  else
  {
      /*
    p = getRealTimeData(np);
    if(p != null)
    {
      p.then(function(xd) {
        
        MTA_ALERTS = W;
        resolve(W);
      }).catch(function(error) {
        reject("getMTAalerts " + error);
      });
    }
    else MTA_ALERTS = null;
  */
  MTA_ALERTS = W;
//  report("n = " + n + " W.length = " + W.length);
  /*
  if(n != 0)
  {
//    if(bUseFetch) p = getWXalertsF(u);
//    else 
        p = getWXalertsX(u);
    if(p != null)
    {
      p.then(function(xd) {
        report("  a. W.length = " + W.length );
        var e0 = xd.documentElement;
        var els = "";
        if((n & 1) != 0)
        {
          els = xd.getElementsByTagName("MetroNorth");
          getWAlerts(W, "MNR", els);
        }
        if((n & 2) != 0)
        {
           els = xd.getElementsByTagName("LIRR");
          getWAlerts(W, "LIRR", els);
        }
        if((n & 4) != 0)
        {
          els = xd.getElementsByTagName("subway");
          getWAlerts(W, "MTA", els);
        }
      
        MTA_ALERTS = W;
        report("  b. W.length = " + W.length );
        resolve(W);
      }).catch(function(error) {
        reject("getMTAalerts " + error);
      });
    }
    else MTA_ALERTS = W;
  }
  */
  }
  MTA_ALERTS = W;
  resolve(W);
//  report("MTA_ALERTS.length = " + MTA_ALERTS.length);
  });
  return(p1);
}

function filterText(t)
{
//  report(t);
  var s = t; 
  var x = "";
  var regex = /<br>/gi;
  s = s.replace(regex, "\n");
  regex = /<br\/>/gi;
  s = s.replace(regex, "\n");
  regex = /\"/gi;
  s = s.replace(regex, "");
  var k = s.length;
  var i = 0;
  var skip = false;
  var nskip = false;
  while(i < k)
  {
    if(s.charAt(i) == '<') {skip = true; nskip = true;} 
    else if(s.charAt(i) == '>') {skip = true; nskip = false;}
    
    if(!skip)
    {
      x += s.charAt(i);  
    }
    skip = nskip;
    i += 1;
  }
  return(x);
}



function getWAlerts(W, id, els)
{
  var k = els.length;
  var i = 0;
  for(i = 0; i < k; i++)
  {
    var lines = els[i].getElementsByTagName("line");
    var ii = 0;
    var kk = lines.length;
    for(ii = 0; ii < kk; ii++)
    {
      var name = lines[ii].getElementsByTagName("name")[0].textContent; 
      var status = lines[ii].getElementsByTagName("status")[0].textContent;
      var text =   lines[ii].getElementsByTagName("text")[0].textContent;
      text = filterText(text);
      var a = {alert_id : id + ii, header_text: name + " " + status,
             description: text, cause: "", severity: "", effect: ""};
      W[W.length] = a;
    }
  }
}


function getWXalerts(u)
{
//    console.log("573 " + u);
//    console.trace();
  var p1 = new Promise(function(resolve, reject) {
  var p = null;
  var W = [];
  if(u.indexOf("null") != -1) reject("957 wxalerts url has null");
//  if(bUseFetch) 
  p = getWXalertsF(u);
//  else p = getWXalertsX(u);
  if(p != null)
  {
    p.then(function(xd) {
        var e0 = xd.documentElement;
        var els = xd.getElementsByTagName("entry");
//        report("els.length = " + els.length);
        var k = els.length;
        var i = 0;
        for(i = 0; i < k; i++)
        {
          var sum = els[i].getElementsByTagName("summary");
          if((!document.getElementById("twa").checked) && (sum[0].textContent.indexOf("There are no active") != -1)) ;
          else
          {
            var link = els[i].getElementsByTagName("link");
            var areas = els[i].getElementsByTagName("cap:areaDesc");
//            report("cap:areaDesc " + areas[0].textContent);
//          report("link href = " + link[0].attributes[0].value);
 //         report("\n" + sum[0].textContent);
            var s = sum[0].textContent + ". ";
            if((typeof areas[0] !== 'undefined') && (typeof areas[0].textContent !== 'undefined'))
            {
              s += "Area affected is " + areas[0].textContent;
            }
            var a =  {alert_id : "WX " + i, header_text: s,
                   description: "", cause: "", severity: "", effect: "", link: link[0].attributes[0].value};
            W[W.length] = a;
          }
        }
 //       clearArray(WxAlerts);
        WxAlerts = W;
//        console.log("609 WxAlerts updated length = " + WxAlerts.length + " " + u);
//        report("W.length = " + W.length);
        resolve(W);
    }).catch(function(error) {
        clearArray(WxAlerts);
        reject("getWXalerts error " + error);
    });
  }
  else reject("getWXalerts error p is null");
  });
  return(p1);
}

function getWXalertsF(u)
{
//    report("getWXalertsF " + u);
  var p = new Promise(function(resolve, reject) {
      var p0 = fetch(u).then(function(response) {
//          if(response.status != 200) 
          if(!response.ok)
          {
              reject("error " + response.status + " " + response.statusText);
          }
          response.text().then(function(x){
 //         report("1168 x = " + x);
            if(x.indexOf("<HTML>") != -1) reject(x);
            else
            {
              try{
                  var responseDoc = (new DOMParser()).parseFromString(x, 'text/xml');
              }
              catch(e) {
                  report("1029 " + e + " " + u);
                  reject( e + " " + u);
              }
              resolve(responseDoc);
            }
            }).catch(function(error) {
              reject(error);
              });
       }).catch(function(e){
              reject(e);
          });
      });
  return(p);
}

/*
function  getWXalertsX(u)
{
   var p = new Promise(function(resolve, reject) {
   nocache = "?nocache=" + Math.random() * 1000000;
   var request = new XMLHttpRequest();
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
         if(request.status != "200")
         {
           var s  = request.status.toString();
           if(s.indexOf("404") != -1) b = true;
           b = true;
           report("getXHRP Unable to access  " + request.status + " " + request.statusText + " " + u);
           reject("getXHRP Unable to access  " + request.status + " " + request.statusText + " " + u);
           if(s.indexOf("500") != -1) request.abort();
         }
         else
         {
          var responseDoc = (new DOMParser()).parseFromString(request.responseText, 'text/xml');
          resolve(responseDoc);  
 //           resolve(request.responseText);
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

function getWXalertsFN(u)
{
  var p = new Promise(function(resolve, reject) {
      var p0 = fetch(u).then(function(response) {
          if(response.status != 200) 
          {
              reject("error " + response.status + " " + response.statusText);
          }
          response.arrayBuffer().then(function(x){
            resolve(new Uint8Array(response));
            }).catch(function(error) {
               reject(error);
               });
          
          }).catch(function (e){
              reject(e);
          });
      });
  return(p);
}

function getMTABusAlertsFromFeed(feed)
{
  var W = [];
  if(feed != null)
  {
    var da = feed.Siri.ServiceDelivery.SituationExchangeDelivery;
    if(typeof da !== 'undefined')
    {
    var sitela = da[0].Situations.PtSituationElement;
    var k = sitela.length;
    var i = 0;
    var id = "MTA_Bus_";
    for(i=0; i<k; i++)
    {
      var a = sitela[i];
      var title = a.Summary;
      var desc = a.Description;
      var ax = {
          alert_id : id + i, 
          header_text: title + "<br>" + desc,
          description: desc,
          cause: "", 
          severity: "",
          effect: ""
          };
      W.push(ax);
    }
    }
  }
  return(W);
}




