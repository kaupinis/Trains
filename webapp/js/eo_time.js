 // eo_time.js
 
// globals defined in eo_TrainBase1.js 
// let NOWDATE = null;
// let NOW = 0;  // ms at Place 
// let NOWHRS = 0;
// let NOWMIN = 0;
// let TZD = 0; // Place to here timezone difference in hrs
// let TZDMS = 0;  // Place to here timezone difference in ms
// let TZPlatform = 0;  // Date.getTimezoneOffset ; timezone offset in minutes of here, current locale
// let bDaylightSavings = true;

/*
function initTime()
{
  let dt = new Date();
  TZPlatform = dt.getTimezoneOffset();
}

function getCurrentTime()
{
  let t = new Date();
  NOW = t.getTime() - TZDMS;
  let hrs = (t.getHours()-TZD).toString();
  let min = t.getMinutes().toString();
  NOWHRS = hrs;
  NOWMIN = min;
  setTimeMenuData(hrs, min);
}
*/

function getTzFactor(stopTZ, tripTZ)
{
  return(getTZDeltaHrsTZ(tripTZ) - getTZDeltaHrsTZ(stopTZ));
}

function getTZDeltaHrs(stop_id)
{
  var n = 0;
  var rt = getRecordForStop(stop_id)
  if(rt.length > 0)
  {
    var r = rt[6];
    n = getTZDeltaHrsTZ(r);
  }
  return(n);
}
    
function getTZDeltaHrsTZ(r) 
{
    var n = 0;
    if(bDaylightSavings)
    {
      if(r == "") n = 0;
      else if(r == "EasternTime") n = 0;
      else if(r == "CentralTime") n = 1;
      else if(r == "MountainTime") n = 2;
      else if(r == "PacificTime") n = 3;
      else if(r == "ArizonaTime") n = 3;
      else if(r == "AtlanticTime") n = -1;
      else if(r == "TorontoTime") n = 0;
      else if(r == "WinnipegTime") n = 1;
      else if(r == "VancouverTime") n = 3;
      else if(r == "EdmontonTime") n = 2;
      else if(r == "ReginaTime") n = 1;
      else if(r == "CETZ") n = -6;
      else if(r == "GMT") n = -5;
      else n = 0;
    }
    else
    {
      if(r == "") n = 0;
      else if(r == "EasternTime") n = 0;
      else if(r == "CentralTime") n = 1;
      else if(r == "MountainTime") n = 2;
      else if(r == "PacificTime") n = 3;
      else if(r == "ArizonaTime") n = 2;
      else if(r == "AtlanticTime") n = -1;
      else if(r == "TorontoTime") n = 0;
      else if(r == "WinmnipegTime") n = 1;
      else if(r == "VancouverTime") n = 3;
      else if(r == "EdmontonTime") n = 2;
      else if(r == "ReginaTime") n = 1;
      else if(r == "CETZ") n = -6;
      else if(r == "GMT") n = -5;
     else n = 0;  
    }
  return(n); 
}

function getTZBaseOffset()
{
  var n = 5;
  if(bDaylightSavings) n = 4;
  return(n);  
}

function getTimeZFactor(stop_id, route)
{
  var tzfactor = getTzFactor(getTZforStop(stop_id), route.cal.gtfstz);
  var tlfactor = (TZPlatform/60) - getTZDeltaHrsTZ(route.cal.gtfstz);
  var n = (tzfactor + tlfactor - getTZBaseOffset());
//  if(route.route_id.indexOf("ACE") ==0) report("120 tz=" + tzfactor + " tl=" + tlfactor + " tbo=" + getTZBaseOffset() +" n = " + n + " " +getTZforStop(stop_id) + " " + route.cal.gtfstz);
//  return(3600 * n);
  return(3600 * tzfactor);
}

// returns minutes
function getTZOffset(stop_id)
{
  var n = 300;
  var rt = getRecordForStop(stop_id)
  if(rt.length > 0)
  {
    var r = rt[6];
    if(bDaylightSavings)
    {
      if(r == "") n = 240;
      else if(r == "EasternTime") n = 240;
      else if(r == "CentralTime") n = 300;
      else if(r == "MountainTime") n = 360;
      else if(r == "PacificTime") n = 420;
      else if(r == "ArizonaTime") n = 420;
      else if(r == "AtlanticTime") n = 180;
      else if(r == "TorontoTime") n = 240;
      else if(r == "WinnipegTime") n = 300;
      else if(r == "VancouverTime") n = 420;
      else if(r == "EdmontonTime") n = 360;
      else if(r == "ReginaTime") n = 360;
      else if(r == "CETZ") n = -120;
      else if(r == "GMT") n = -60;
      else n = 240;
    }
    else
    {
      if(r == "") n = 300;
      else if(r == "EasternTime") n = 300;
      else if(r == "CentralTime") n = 360;
      else if(r == "MountainTime") n = 420;
      else if(r == "PacificTime") n = 480;
      else if(r == "ArizonaTime") n = 420;
      else if(r == "AtlanticTime") n = 240;
      else if(r == "TorontoTime") n = 300;
      else if(r == "WinnipegTime") n = 360;
      else if(r == "VancouverTime") n = 480;
      else if(r == "EdmontonTime") n = 420;
      else if(r == "ReginaTime") n = 360;
      else if(r == "CETZ") n = -60;
      else if(r == "GMT") n = 0;
      else n = 300;  
    }
  }
  return(n); 
}

function getTZPlace()
{
  var n = 300;
  if(bDaylightSavings)
  {
    if(TZPlace == "CentralTime") n = 300;
    else if(TZPlace == "MountainTime") n = 360;
    else if(TZPlace == "PacificTime") n = 420;
    else if(TZPlace == "ArizonaTime") n = 420;
    else if(TZPlace == "AtlanticTime") n = 180;
    else if(TZPlace == "TorontoTime") n = 240;
    else if(TZPlace == "WinnipegTime") n = 300;
    else if(TZPlace == "VancouverTime") n = 420;
    else if(TZPlace == "EdmontonTime") n = 360;
    else if(TZPlace == "ReginaTime") n = 360;
    else if(TZPlace == "CETZ") n = -120;
    else if(TZPlace == "GMT") n = -60;
    else n = 240;
  }
  else
  {
    if(TZPlace == "CentralTime") n = 360;
    else if(TZPlace == "MountainTime") n = 420;
    else if(TZPlace == "PacificTime") n = 480;
    else if(TZPlace == "ArizonaTime") n = 420;
    else if(TZPlace == "AtlanticTime") n = 240;
    else if(TZPlace == "TorontoTime") n = 300;
    else if(TZPlace == "WinnipegTime") n = 360;
    else if(TZPlace == "VancouverTime") n = 480;
    else if(TZPlace == "EdmontonTime") n = 420;
    else if(TZPlace == "ReginaTime") n = 360;
    else if(TZPlace == "CETZ") n = -60;
    else if(TZPlace == "GMT") n = 0;
    else n = 300;  
  }
  return(n);
}

function getTZString()
{
  var n = "Eastern Time";
  if(TZPlace == "CentralTime") n = "Central Time";
  else if(TZPlace == "MountainTime") n = "Mountain Time";
  else if(TZPlace == "PacificTime") n = "Pacific Time";
  else if(TZPlace == "ArizonaTime") 
  {
      if(bDaylightSavings) n = "Pacific Time";
      else n = "Mountain Time";
  }
  else if(TZPlace == "AtlanticTime") n = "Atlantic Time";
  else if(TZPlace == "TorontoTime") n = "Eastern Time";
  else if(TZPlace == "WinnipegTime") n = "Central Time";
  else if(TZPlace == "VancouverTime") n = "Pacific Time";
  else if(TZPlace == "EdmontonTime") n = "Mountain Time";
  else if(TZPlace == "ReginaTime") n = "Central Standard Time";
  else if(TZPlace == "CETZ") n = "Central European Time";
  else if(TZPlace == "GMT") 
  {
      if(bDaylightSavings) n = "British Summer Time";
      else n = "Greenwich Mean Time";
  }
  return(n);
}
