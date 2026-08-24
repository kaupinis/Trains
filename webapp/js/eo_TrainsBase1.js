// eo_TrainsBase1.js  1/1/2024
"use strict";

let Debug = true;
let WebApp = true;
let bSWUpdateFound = false;
let menux = [];
let mclones = [];
let con = 1000;
let Xpos = 0;
let Ypos = 0;
let Zpos = 0;
let PosAccuracy = 0;
let Xposlast = 0;
let Yposlast = 0;
let Zposlast = 0;
let compacc = -2;
let Place = "";
let Place_id = "";
let WALK_LIMIT = .5;
let SPMAX = 60;
// let Stop = null;
let SelectedPlace = "";
let SelectedStop = null;
let SavedPositions = [];
let PredictionTime = "";
let CurrentTime = null;
let timestring = "";
let timemode = 0;
let service = null; 
let serviceE = null; // AssociateService
let serviceEO = null; // EoService
let service3 = null; // MBTA v3
let serviceT = null; //built-in Tsked
let ACT_TRIP_STATUS = "";
let ACT_TRIP_STOP = "";
let ACT_TRIP_TSTAMP = 0;
let bACTSTART = false;
let runningtime = 0;
let LLFilename = "";
let TripLength = 0;
let ShapeData = [];
let Xplace = 0;
let Xplaces = [];
let eo_base = null;
let reportfilename = "TrainsReport.txt";
let auth = null;
let useAuth = false;
let LatDiff = 1 / 690.172; // .1 mile
let LonDiff = .1 / (Math.cos(42.3/ 180 * Math.PI) * 69.172);
let GEO = true;
let Home = "";
let Home_id = "";
let HomeStop = null;
let Here = "";
let StorageEnabled = false;

let NOWDATE = null;
let NOW = 0;
let NOWHRS = 0;
let NOWMIN = 0;
let TZD = 0;
let TZDMS = 0;
let TZPlatform = "";
let bDaylightSavings = true;

let DISPLAYTYPE = 0;
let CurrentTripID = null;
let CurrentTripCDate = null;
let CurrentTripRouteID = null;
let CurrentHeadsign = null;
let CurrentTG = null;
let CurrentTString = null;
let capt = "";
let tok = true;
let locfirst = true;
let locfirst2 = true;
let bUseSked = false;
let bUseBuiltIn = false;
let bshowAlerts = false;
let bFindFrom = false;
let bFindTo = false;
let DETAILSINDEX = 0;
let triptoi = null;
let tripfromi = null;
let displaystop = null;
let displayid = null;
let displayj = null;
let displaysked = null;
let displaytripid = null;
let CurrentTrips = [];
let alarmtime = 0;
let ahr = 0;
let herestops = null;
let markerno = 0;
let map = null;
let osm_map = null;
let eo_map = null;
let mapProp = null;
let MAPCLASS = null
let bGMapLoaded = false;
let bMapInit = true;
let bEoMap = false;
let bOSM = false;
let bDeviceOrientation = false;
let bDeviceMotion = false;
let eomapcolor = "blue";
let eosubcolor = "green";
let bUseFile = false;
let CenterMarker = null;
let HereMarker = null;
let nstn = "";
let bForceSked = false;
let bFirstTime = true;
let BusNum = "0";
let BusDesc = "";
let lastBusNum = -1;
let busroute = null;
let triproute = null;
let conxroute = null;
let wayroute = null;
let startroute = null;
let skedbyroutes = null;
let markedtripid = null;
let cachecount = 0;
let MAXCACHECOUNT = 8;
let EODB = null;
let biodbOK = false;
let LFN = [];
let TKEY;
let wpad = null;
let bGeo = false;
let ofname = "";
let bGetRefresh = true;
let bGetRefresh2 = true;
let PSTATUS = "";
let abcolor = "lightgrey";
let pcolor = "red";
let qcolor = "red";
let capcolor = "black";
let bonce = true;
let bsw = true;
let bUT = false;
let DT0Alerts = null;
let DT0Stop = "";
let DT1Alerts = null;
let DT1Route = "";
let WxAlerts = null;
let MTA_ALERTS = null;
let NJ_ALERTS = null;
let wpid = null;
let vehs = [];
let lastvehs = [];
let infow = null;
let bDSS = false;
let bDS = true;
let bTiles = true;
let bpt1 = true;
let TFAIL = false;
let bHasCompass = false;
let asd = "";
let ascount = 0;
let Zo = 0;
let SelectedLanguage = 0;
let MOPTION = null;
let bhy = false;
let bIndexedDB = false;
let slist = [];
let bDMapInit = false;
let bDMapShowing = false;
let CurrentWaypoint= null;
let LastWaypoint = null;
let Waypoint1 = null;
let Waypoint2 = null;
let DestWaypoint = null;
let bMTQinProcess = false;
let bGTQinProcess = false;
let bMonitorMode = false;
let last_stop_id = "";
let lastAlertsUpdate = 0;
let last_wx_id = "";
let lastWXAlertsUpdate = 0;
let LastAlertDataTime = 0;
let ctnx = null;
let msvc = [];
let bCompassEnabled = false;
let bOnLine = false;
let bNetFail = false;
let bE = false;
let bUseFetch = true;
let bD1Refresh = false;
let bgotData = false;
let LegStartid = null;
let LegDestid = null;
let Greencount = 0;
let bGreenFilter = true;
let display5 = null;
let displaylat = 0;
let displaylon = 0;
let vcapt = null;
let ipod = false;
let stopwch = null;
let factxt = "";
let fromProjection = null;
let toProjection   = null;
let btryagain = true;
let synth = null;
let voices = [];
let ASND = [];
let BSND = [];
let DSND = [];
let AdjustedTrips = [];
let AdjustedNTrips = [];
let DUtime = 0;
let LASTDISPLAYTYPE = 0;
let bVoices = false;
let CurrentPhrase = null;
let sndtime = "";
let selectedVoice = -1;
let CurrentAlerts = [];
let CurrentTripZ = [];
let Leghs = null;
let CurrentTp = null;
let CurrentTrip = null;
let CurrentStop = null;
let bAnnounceNearby = false;
let bAnnounceConnections = false;
let bGreenLineStop = false;
let AlertData = null;
let TZPlace = "";
let TZPlace2 = "";
let CSND = [];
let notif = null;
let bFirstD0 = true;
let Ptript = 0;
let Ptripi = null;
let Ptroute = null;
let markers = [];
let VEH_STOP = null;
let VBR = null;
let tlastdep = 0;
let tlastskeddep = 0;
let bUpdateOnce = true;
let deferredPrompt = null;
let fstopfromi = null;
let fstoptoi = null;
let PlaceIds = [];
let PlacePointer = -1;
let bFastStart = false;
// let Carriers = [];
let bNotifySupported = false;
let bNotifyPermission = false;
let PBloaded = false;
let PBloading = false;
let Timeo = 0;
let bGFirst = true;
let bMonitorLabel = false;
let bSndBusy = false;
let VELO = 0;
let LASTNOW = 0;
let bUD = false;
let bDontBeep = false;
let bDontOK = false;
let PrintMode = 0;
let bAltssl = false;
let PrimaryStops = [];
let bBtnAdd1 = false;
let bUSW = true;
let bFirstVoice = true;
let bSpeechRecg = false;
// let bPspeech = false;
let SR = null;
let Bearing = 0;
let DistanceToId = 0;
let bGotCompassReading = false;
let D4stat = "";
let D4stat1 = "";
let UserMediaSupported = false;
let audioCtx = null;
let gainNode3 = null;
const BUSLOADMAX = 5;
let bMapShowing = false;
let Xz = 0;
let Yz = 0;
let lastTZPlace = 0;
let bWelcomeClosed = false;
let bWelcome3Closed = false;
let CTAHS = "";
let epicenter = "";
let bChrome = false;
let CurrentVehicleId = null;
//let PALETTE = 0;
//let PALETTES = [];
//let PALETTE_NAMES = [];
let chromex = false;
let SelectedVoiceIndex = -1;
let wcnote = "";
let siridest = null;

let userAgentData = null;
let bWorkers = false;
//let RIPTABusRoutes = [];
let bUseMTApb = false;
let bswonline = null;
let bpbfirstinit = false;
let btmfirstinit = false;
let pbworker = null;
let tmworker = null;
let connworker = null;
let eopb1 = null;
let eopw = null;
let SunTimes = null;
let CAVS = document.getElementById("Canvas0");
let SPGYDIV = document.getElementById("spydiv");
let FABMAX = document.getElementById("fabmax");
let Bubble = document.getElementById("bubble");
let Bubble1 = document.getElementById("bubble1");
let BTO = null;
let bBubbleTO = true;
const MAPCACHE = 'eo_Trains_mapcache_2024'; 
let LMD =[];
let TOK = true;
let SBL = null;


userAgentData = navigator.userAgentData;
if((typeof userAgentData !== 'undefined') && (userAgentData != null))
{
  let brands = userAgentData.brands;
  let k = brands.length;
  let i = 0;
  for(i=0; i<k; i++)
  {
    let o = brands[i];
    if(o.brand.indexOf("Chrom") != -1) chromex = true;
  }
}
else
{
  if((navigator.userAgent.indexOf("iPod") != -1) || (navigator.userAgent.indexOf("iPad") != -1) || (navigator.userAgent.indexOf("iPhone") != -1))
  {
    ipod = true;
  }
  if((typeof navigator.userAgent !== 'undefined') && (navigator.userAgent.indexOf("Chrome") != -1))
  {
    chromex = true;
  }
}

window.onload = function()
{
  init();
}

window.onbeforeunload = function(evt)
{
  localStorage.setItem("TrainsLanguage", SelectedLanguage);
  if((document.getElementById("eaudio").checked) && (SelectedVoiceIndex != -1))
  {
    localStorage.setItem("TrainsVoiceName", voices[SelectedVoiceIndex].name);
    localStorage.setItem("TrainsVoiceLang", voices[SelectedVoiceIndex].lang);
    confirm(voices[SelectedVoiceIndex].name + " : " + voices[SelectedVoiceIndex].lang);
  }
  bUseMTApb = document.getElementById("UseMTA").checked;
  if(bUseMTApb) localStorage.setItem("Trains_MTApb", "true");
  else localStorage.setItem("Trains_MTApb", "false");
  if((SavedPositions != null) && (SavedPositions.length > 0))
  {
    localStorage.setItem("Waypoints", JSON.stringify(SavedPositions));
  }
  if(pbworker != null) pbworker.terminate();
  pbworker = null;
  if(tmworker != null) tmworker.terminate();
  tmworker = null;
  clearReport();
  evt.preventDefault();
  evt.returnValue = "Are you sure you want to exit the program?";
}

window.addEventListener('beforeinstallprompt', function(e){
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  bBtnAdd1 = true;
});


function addToHome()
{
  bBtnAdd1 = false;
  if(deferredPrompt != null)
  {
    deferredPrompt.prompt();
    deferredPrompt.userChoice
     .then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        report('User accepted the A2HS prompt');
      } else {
        report('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  }
  else report("Add to Home Screen failed. deferredPrompt = null");
}

// code to prevent ios autozoom
const addMaximumScaleToMetaViewport = () => {
  const el = document.querySelector('meta[name=viewport]');

  if (el !== null) {
    let content = el.getAttribute('content');
    let re = /maximum\-scale=[0-9\.]+/g;

    if (re.test(content)) {
        content = content.replace(re, 'maximum-scale=1.0');
    } else {
        content = [content, 'maximum-scale=1.0'].join(', ')
    }

    el.setAttribute('content', content);
  }
};

const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

//Check if it is an iPad, iPhone or iPod
const checkIsIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (checkIsIOS()) {
  disableIosTextFieldZoom();
}

// end  code to prevent ios autozoom


let Menus = ["Welcome", "Welcome3","PlotPopup","PlotBusSel", "Nav", "TimeMenu",  "Preferences", "Ops", "Help", "Aboutx","SubStationPopup", "PlaceSelect", "Plan", "KMap",
"File", "FileSel", "OpenFile", "ConnectionsDetails", "TripPopup", "StopSearch", "OpenFile","Dev","Favs","TAdj", "Madj", "SkedPop", "Feedback","HerePopup", "OSMc","MapW","OptionPopup","LatLonM","FSTOP", "SELW","Notify","DepNot", "AlertWindow",
"Preferences2","InfoWindow","DMap","BusSel2","You","Dirs","Path","Plat"];

function CloseMenu()
{
let k = Menus.length;
let i = 2;
while(i < k)
{
  closeMenuById(Menus[i]);
  i += 1;
}
CloseAlertMenu();
}

function CloseKMapMenu()
{
  if(bEoMap) 
  {
    document.getElementById("EoMapMenu").style.visibility = "hidden";
  }
  CloseMenu();
}

function closeMenuById(id)
{
  let e = document.getElementById(id);
  if(e != null)
  {
    if(e.offsetTop < con) e.style.top = con + "px";
    e.style.visibility = "hidden";
  }
}

function menu(menuname)
{
let b= document.getElementById(menuname).style.visibility.toString();
CloseMenu();
let k = Menus.length;
let i = 1;
let bx = true;
while(bx && (i < k))
{
  if(Menus[i] == menuname) bx = false;
  else i += 1;
}
if(b == "visible") 
{
  document.getElementById(menuname).style.top = con + "px";
  document.getElementById(menuname).style.visibility = "hidden";
}
else 
{
  updateMenuLangById(menuname);
  document.getElementById(menuname).style.top = menux[i] + "px";
  document.getElementById(menuname).style.visibility = "visible";
}
    if(document.getElementById("KMap").style.visibility == "visible")
    {
      if(bEoMap) 
      {
      document.getElementById("EoMapMenu").style.display = "block";
      document.getElementById("EoMapMenu").style.visibility = "visible";
      }
    }
    else
    {
      if(bEoMap) document.getElementById("EoMapMenu").style.visibility = "hidden";
    }
}

function updateMenuLangById(id)
{
    /*
  let k = MenuIndices.length; // from eo_lang.js
  let i = 1;
  let bx = true;
  while(bx && (i < k))
  {
    if(MenuIndices[i] == id) bx = false;
    else i += 1;
  }
  if(!bx) updateMenuLang(i);
  */
//  else report("489 No menu lang for menu " + id);
}

function updateMenuLang(index)
{
  if((typeof MP[SelectedLanguage] !== 'undefined') && (index != 13))
  {
  let t = MP[SelectedLanguage][index];
  if(typeof t !== 'undefined')
  {
  let i = 0;
  let j = 0;
  let el = document.getElementById(Menus[index]);
  let links = el.getElementsByTagName("a");
  let k = links.length;
  if(index == 10)
  {
    i = k - 11;
    j = 1;
  }
  while(i < k)
  {
    if(t[j] != "") links[i].text = t[j];
    i += 1;
    j += 1;
  }
  let l = el.getElementsByTagName("button");
  k = k + l.length;
  let jj = 0;
  while(i < k)
  {
    if(t[j] != "") l[jj].innerHTML = t[j];
    i += 1;
    j += 1;
    jj += 1;
  }
  l = el.getElementsByTagName("label");
  k = k + l.length;
  jj = 0
  while(i < k)
  {
    if(typeof t[j] === 'undefined') l[jj].innerHTML = MP[0][jj];
    else l[jj].innerHTML = t[j];
    i += 1;
    j += 1;
    jj += 1;
  }
  
  
  }
  }
}

function reportText()
{
  let k = Menus.length;
  let i = 0;
  while(i < k)
  {
    let el = document.getElementById(Menus[i]);
    report("\nMP[0][" + i + "] = [    // " + Menus[i]);
    let ta = el.getElementsByTagName("a");
    let k2 = ta.length;
    let i2 = 0;
    for(i2 = 0; i2 < k2; i2++)
    {
      report("  \"" + ta[i2].text + "\",");
    }
    report("\n // button");
    ta = el.getElementsByTagName("button");
    k2 = ta.length;
    i2 = 0;
    while(i2 < k2)
    {
      report("  \"" + ta[i2].innerHTML + "\",");
      i2 += 1;
    }
    report("\n // label");
    ta = el.getElementsByTagName("label");
    k2 = ta.length;
    i2 = 0;
    while(i2 < k2)
    {
      report("  \"" + ta[i2].innerHTML + "\",");
      i2 += 1;
    }
//    report("  \"" + el.innerText + "\"");
    report("];");
    i += 1;
  }
  CloseMenu();
}



function ASND0(timetil, route_id, trip_name, dir, dest, conx, status, track)
{
  this.timetil = timetil; // minutes til event
  this.id = route_id;  // train / bus number
  this.tripname = trip_name;
  this.dir = dir;  // inbound, eastbound, 
  this.dest = dest; // to headsign
  this.conx = conx; // major connections
  this.status = status;  // Now boarding
  this.track = track;  // 7
  this.hh = "";
  this.mm = "";
  this.ah = "0";
  this.am = "0";
  this.bPM = false;
  this.bFreq = false;
  this.bPred = false;
}

function CSND0()
{
}

function AlertItem(id, effect, header, description)
{
  this.id = id;
  this.effect = effect;
  this.header = header;
  this.description = description;
}

function CloseAlertMenu()
{
  let d = document.getElementById("AlertWindow");
  if(d != null)
  {
    d.style.top = con + "px";
    d.style.visibility = "hidden";
  }
}

function showAlertWindow(x, y, s)
{
  let d2 = document.getElementById("alertwin");
  d2.style.maxWidth = "300px";
  d2.innerHTML = s;
  let d = document.getElementById("AlertWindow");
  d.style.top = y + "px";
  d.style.left = x + "px";
  d.style.zIndex = 2;
  d.style.visibility = "visible";
}

function showPlotPopup()
{
  closeHerePopup();
  closeOptionPopup();
  let d = document.getElementById("PlotPopup");
  if(d.style.visibility == "visible")
  {
    closePlotPopup();
  }
  else
  {
    d.style.top = menux[2] + "px";
    d.style.visibility = "visible";
  }
}

function showHerePopup()
{
  closePlotPopup();
  closeOptionPopup();
  let d = document.getElementById("HerePopup");
  if(d.style.visibility == "visible")
  {
    closeHerePopup();
  }
  else
  {
    d.style.top = menux[2] + "px";
    d.style.visibility = "visible";
  }
}

function showOptionPopup()
{
  closePlotPopup();
  closeHerePopup();
  let d = document.getElementById("OptionPopup");
  if(d.style.visibility == "visible")
  {
    closeOptionPopup();
  }
  else
  {
    d.style.top = menux[2] + "px";
    d.style.visibility = "visible";
  }
}

function showLatLonPopup()
{
  closePlotPopup();
  let d = document.getElementById("LatLonM");
  d.style.top = menux[2] + "px";
  d.style.visibility = "visible";
  document.getElementById("clat").value = Xpos;
  document.getElementById("clon").value = Ypos;
}

function showPlotBusSel()
{
  closePlotPopup();
  let d = document.getElementById("PlotBusSel");
  d.style.zIndex = 2;
  d.style.top = menux[3] + "px";
  d.style.visibility = "visible";
}

function closePlotPopup()
{
  let d = document.getElementById("PlotPopup");
  d.style.top = con + "px";
  d.style.visibility = "hidden";
}

function closeOptionPopup()
{
  let d = document.getElementById("OptionPopup");
  d.style.top = con + "px";
  d.style.visibility = "hidden";
}

function closeLatLon()
{
  let d = document.getElementById("LatLonM");
  d.style.top = con + "px";
  d.style.visibility = "hidden";
}

function clearLatLon()
{
  document.getElementById("clat").value = "";
  document.getElementById("clon").value = "";
}

function showOSMcPopup()
{
  closeHerePopup();
  closePlotPopup();
  let d = document.getElementById("OSMc");
  d.style.top = menux[2] + "px";
  d.style.visibility = "visible";
}

function closeOSMcPopup()
{
  let d = document.getElementById("OSMc");
  d.style.top = con + "px";
  d.style.visibility = "hidden";
}

function closeHerePopup()
{
  let d = document.getElementById("HerePopup");
  d.style.top = con + "px";
  d.style.visibility = "hidden";
}

function closePlotBusSel()
{
  let d = document.getElementById("PlotBusSel");
  d.style.top = con + "px";
  d.style.visibility = "hidden";
}

function initializeMenus()
{
menux[0] = document.getElementById(Menus[0]).offsetTop;
let k = Menus.length;
clearArray(mclones);
let i = 1;
while(i < k)
{
  let mm = document.getElementById(Menus[i]);
  if((typeof mm !== 'undefined') && (mm != null))
  {
    menux[menux.length] = mm.offsetTop;
    mm.style.top = con + "px";
    mm.style.visibility = "hidden";
  }
  else report("770: " + Menus[i]);
//  listEntries(i)
  i += 1;
}
}

function listEntries(index)
{
  report("let MP[0][" + index + "] = [");
  let el = document.getElementById(Menus[index]);
  let links = el.getElementsByTagName("a");
  let t = [];
  let k = links.length;
  let i = 0;
  while(i < k)
  {
    let a = links[i];
    report("   \"" + a.text + "\"," );
    i += 1;
  }
  report("];\n");

}

function openWelcome()
{
  updateMenuLangById("Welcome");
  let d = document.getElementById("Welcome");
  d.style.top = menux[0] + "px";
  d.style.visibility = "visible";
}

function showAd()
{
  let d = document.getElementById("Welcome");
  d.innerHTML = "<img height=\"250\" width=\"250\" src=\"images/ad2.jpg\">";
}

function Welcome2()
{
  let d = document.getElementById("Welcome");
//  d.innerHTML = '<br><span style="color:red">Note:</span><br><br>Check with non-MBTA carriers to verify holiday schedules.';
  d.innerHTML = '<br><span style="color:red">Note:</span><br><br>Snow cancellations and reduced service. Check with carriers to verify schedules.';
}

function checkConnection1() 
{
  checkConnection();
  bNetFail = false;
}

function checkConnection() 
{
//  report("navigator.onLine = " + navigator.onLine);
  let s = "";
  document.getElementById("oll").style.visibility = "visible";
  
  /*
  if(bSWUpdateFound) // && chromex)
  {
    s = "<a href='javascript:window.location.reload()' style='color:#ffcccb;'>Update</a>&nbsp;";
  }
  */
  
  if(bMonitorMode) 
  {
    bMonitorLabel = true; 
    s += "<span style='color:var(--Ccolor);'>Monitor&nbsp</span> ";
  }
  else bMonitorLabel = false;
  
  if(document.getElementById("fol").checked || bNetFail)
  {
    bOnLine = false;
    s += "<a href='javascript:checkConnection1()' style='color:var(--Ccolor);'>&nbsp;Offline</a>";
  }
  else 
  {
    if(typeof navigator.onLine !== 'undefined')
    {
      bOnLine = navigator.onLine;
      if(!bOnLine) s += "<a href='javascript:checkConnection1()' style='color:var(--Ccolor);'>&nbsp;Offline</a>";
    }
    else if(bswonline != null)
    {
      bOnLine = bswonline;
    }
    else
    {
      bOnLine = true;
    }
    
  }
  document.getElementById("oll").innerHTML= s;
}

function setScalable(b)
{
//  let d = document.getElementById("viewport");
  let d = document.querySelector("meta[name=viewport]");
  if(b) 
  {
    d.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=yes");
    document.getElementById("uscal").checked = true;
  }
  else 
  {
    d.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
    document.getElementById("uscal").checked = false;
  }
}

function checkScalable()
{
  let b = document.getElementById("uscal").checked;
  setScalable(b);
}

function init()
{
SNDSTATE = 0;
DT0Alerts = [];
DT1Alerts = [];
WxAlerts = [];
MTA_ALERTS = [];
NJ_ALERTS = [];
PlaceIds = [];
PlacePointer = -1;
PrimaryStops = [];
LMD = [];
compacc = -2;
TOK = true;
SBL = null;
GEO = true;
Home = "";
Home_id = "";
timemode = 0;
PredictionTime = "";
locfirst = true;
locfirst2 = true;
Place = "";
Place_id = "";
TZPlace = "";
TZPlatform = "";
DUtime = 0;
LASTDISPLAYTYPE = 0;
Stop = null;
lastBusNum = -1;
BusNum = 0;
BusDesc = "";
pcolor = "red";
eomapcolor = "blue";
eosubcolor = "green";
displaystop = null;
displayj = null;
displayid = null;
displaysked = null;
displaytripid = null;
vcapt = null;
cachecount = 20;
markerno = 0;
markers = [];
bshowAlerts = false;
bGMapLoaded = false;
bMapInit = true;
bUseFile = false;
bProc = false;
bE = false;
bForceSked = true;
bNetFail = false;
bFirstTime = true;
bUseBuiltIn = false;
bGreenLineStop = false;
bUpdateOnce = true;
nstn = "";    
bGetRefresh = true;
bGetRefresh2 = true;
bMapShowing = false;
btryagain = true;
PSTATUS = "";
TFAIL = false;
bonce = true;
bsw = true;
bUT = false;
bpt1 = true;
WebApp = true;
bUD = false;
vehs = [];
infow = null;
Xpos = 0;
Ypos = 0;
Xposlast = 0;
Yposlast = 0;
bUseFetch = true;
bD1Refresh = false;
LegStartid = null;
LegDestid = null;
bGeo = false;
Greencount = 0;
bGreenFilter = true;
display5 = null;
displaylat = 0;
displaylon = 0;
factxt = "";
bAnnounceNearby = false;
AlertData = null;
bFirstD0 = true;
VEH_STOP = null;
VBR = null;
tlastdep = 0;
tlastskeddep = 0;
//deferredPrompt = null;
SavedPositions = [];
bFastStart = false;
ACT_TRIP_STATUS = "";
ACT_TRIP_STOP = "";
ACT_TRIP_TSTAMP = 0;
bACTSTART = false;
TripLength = 0;
ShapeData = [];
// Carriers = [];
Timeo = 0;
bGFirst = true;
bSndBusy = false;
VELO = 0;
LASTNOW = 0;
bDontBeep = false;
bDontOK = false;
PrintMode = 0;
bFirstVoice = true;
bSpeechRecg = false;
bPspeech = false;
SR = null;
bVoices = false;
Bearing = 0;
DistanceToId = 0;
bGotCompassReading = false;
asd = "";
ascount = 0;
PALETTE = 0;
Zo = 0;
SelectedLanguage = 0;
lastTZPlace = 0;
MOPTION = null;
bhy = false;
bWelcomeClosed = false;
bWelcome3Closed = false;
setScalable(true);
//initPalettes();
initPalettes2();
setPalette();
document.getElementById("mqe").checked = false;
document.getElementById("buscarrierlist").selectedIndex = 0;
epicenter = "";
bDMapInit = false;
bDMapShowing = false;
bSWUpdateFound = false;
CurrentVehicleId = null;
bUseMTApb = false;
bswonline = null;
bpbfirstinit = false;
btmfirstinit = false;
pbworker = null;
tmworker = null;
connworker = null;
eopb1 = null;
eopw = null;
CurrentWaypoint= null;
LastWaypoint = null;
Waypoint1 = null;
Waypoint2 = null;
DestWaypoint = null;
bMTQinProcess = false;
bGTQinProcess = false;
bMonitorMode = false;
last_stop_id = "";
lastAlertsUpdate = 0;
last_wx_id = "";
lastWXAlertsUpdate = 0;
LastAlertDataTime = 0;
siridest = null;

if(ipod) 
{
  bDontBeep = true;
  document.getElementById("dba").checked = true;
}
else procBeep();

Xplaces = ["Here", "North Station", "South Station", "Home", "Select From List", "Selected","New York Penn Station Amtrak",  "New York-Grand-Central-NY", "Secaucus (Upper Level) -NJ", "New Haven-CT", "Jamaica-NY",  "Chicago-IL Union Station","San Francisco Embarcadero -1 BART","Los Angeles-CA Union Station", "Seattle King Street Station-WA", "Denver Union Station-CO", "Dallas-TX Union Station", "New Orleans-LA Union Passenger Terminal", "Washington-DC Union Station", "Philadelphia-PA 30th Street Station Amtrak", "Miami-FL Amtrak Station", "St. Louis-MO Gateway AMTRAK Station", "Paris_Est TER"];

document.getElementById("wdmi").value = WALK_LIMIT;
document.getElementById("XPOS").value = 0; 
document.getElementById("YPOS").value = 0;
document.getElementById("tripfrom").selectedIndex = 1;
document.getElementById("tripto").selectedIndex = 8;
document.getElementById("fstopfrom").selectedIndex = 1;
document.getElementById("fstopto").selectedIndex = 3;
document.getElementById("rp").checked = false;
document.getElementById("usn").checked = true;
document.getElementById("fol").checked = false;
document.getElementById("stiles").checked = true;
document.getElementById("sprec").checked = false;
sliderChange();
clearReport();
console.log("eightolives Trains version 3 copyright (c) 2026 William Kaupinis. All rights reserved.");
report("eightolives Trains version 3");
report("copyright (c) 2026 William Kaupinis. All rights reserved.\n");
initializeMenus();
//loadBusListList();

if('indexedDB' in window)
{
  try{
    EODB = initDB("eo_Trains", dbversion)
    EODB.then( () => {
      report("1119 eo_Trains db available");
      biodbOK = true;
    }).catch( (e) => {
      report("1123 eo_Trains db not available");
      biodbOK = false;
    });
  }
  catch(e) {
      report("1130 " + e);
  }
}

  
initLanguage();
//openWelcome();
let z = window.location.href;
let eo_symbol_base = z.substring(0,z.lastIndexOf("/"));
eo_base = eo_symbol_base.substring(0,eo_symbol_base.lastIndexOf("/")) + "/";
if(eo_base.indexOf("http://www.eightolives.com") != -1)
{
  EURL = "http://www.eightolives.com/";
  EOS = "http://www.eightolives.com/forms/eo_Trains.php";
  EOS1 = "http://www.eightolives.com/forms/eo_Trains1.php";
  EMS = "http://www.eightolives.com/forms/eo_map.php";
  EOX = "http://www.eightolives.com/forms/trains_feedback.php";
}

initCarriers();
updateSPS();

initTime();
setTimeNow();
document.getElementById("tm").innerHTML = "<br>" + timestring;

//document.getElementById("sb3img").src = sndimg.src;
//document.getElementById("sb4img").src = micimg.src;

if((typeof userAgentData !== 'undefined') && (userAgentData != null))
{
  let brands = userAgentData.brands;
  let k = brands.length;
  let i = 0;
  for(i=0; i<k; i++)
  {
    let o = brands[i];
    report(o.brand + ": version " + o.version);
    if(o.brand.indexOf("Chrom") != -1) chromex = true;
  }
}
else
{
  report("navigator.userAgent = " + navigator.userAgent);
  if((navigator.userAgent.indexOf("Firefox") != -1) && (navigator.userAgent.indexOf("SeaMonkey") == -1)) 
  {
//  bsw = false;
  }
  if(navigator.userAgent.indexOf("Chrome") != -1) bChrome = true;
}

let ilfn = z.indexOf("?");
if(ilfn != -1)
{
  let lf = z.substring(ilfn + 1);

  ilfn = lf.indexOf("audio=true");
  if(ilfn != -1)
  {
    bFastStart = true;
    setScalable(false);
  }
}

//if(typeof window.fetch !== 'undefined') bUseFetch = true;
//report("UseFetch = " + bUseFetch);
if(window.Worker)
{
  report("Workers supported.");
  bWorkers = true;
//  connworker = new Worker("js/conn.js");
}


if((bWorkers) && (z.indexOf("htt") == 0)) // if(bWorkers)
{
    bpbfirstinit = true;
    pbworker = new Worker("js/eo_pb.js");
//    tmworker = new Worker("js/eo_tm.js");
} 
if(!bpbfirstinit) 
{
  loadScript("js/eo_pb.js").then(function () {
      eopb1 = new eo_pb();
      }).catch(function(e) {
          report("1223: " + e);
      });
}

if((typeof eotm !== 'undefined') && (eotm == null))
{
report("initializing eotm");
eotm = new eo_tm();
abortControllertm = new AbortController();
signaltm = abortControllertm.signal;
}
//else report("1275 eotm undefined");
/*
bIndexedDB = !(!window.indexedDB);
if(bIndexedDB) 
{
  report("indexedDB supported");
  
  openDB("eoTrains", 1).then(function(db) {
     report("opened db");
     initPref(db);
  }).catch(function(e) {
     report(e);
  });
}
*/
//if(typeof navigator.bluetooth !== 'undefined') report("bluetooth supported");
checkConnection();
window.addEventListener('online', checkConnection);
window.addEventListener('offline',checkConnection);
synth = window.speechSynthesis;
if((typeof synth !== 'undefined') && (synth != null))
{
  report("platform supports speech synthesis (1175)");
  if(typeof synth.onvoiceschanged !== 'undefined')
  {
    
    synth.addEventListener("voiceschanged", function(evt){
      voices = synth.getVoices();
      if((voices != null) && (voices.length > 0))
      {
        report("found " + voices.length + " voices b"); // Chrome reloaded, Firefox first time
        populateVoices();
        setTimeout(noAudio, 20000);
      }
      else 
      {
        report("no voices found"); // Chrome first time
        getVoiceArray().then(function(v) {
          populateVoices();
          document.getElementById("sb3").style.visibility = "visible";
          setTimeout(noAudio, 20000);
          }).catch(function(e){
            report(e);
          });
      }
      }, true);
  }
  else 
  {
    report("try to get voices");
    voices = synth.getVoices();
    if(voices != null) report("found " + voices.length + " voices a"); //ios
  }
}
else noAudio();

initializeStopListCategories();

service = new Service3(); 
service3 = service;
serviceE = new AssociateService();
serviceE.routes = serviceE.routes.concat(AddedRoutes);
serviceEO = new EoService();
serviceT = new TService();

if(navigator.cookieEnabled) 
{
  report("cookies enabled");
}
else report("cookies are disabled");

document.getElementById("chgt").value = Math.round(Tchg /60);

z = window.location.href;
//bUSW = bUSW && document.getElementById("usw").checked;
if(bUSW && (z.indexOf("https") == 0) && ('serviceWorker' in navigator))
{
  checkSW();
}
else
{
  init1();
}

} // end init

function getVoiceArray()
{
  let p = new Promise(function(resolve, reject) {
    voices = speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
    }
    else speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices()
      resolve(voices)
    }
  });
  return(p);
}

function checkSW()
{
    bsw = false;
if (('serviceWorker' in navigator) && bsw)
{
  report("serviceWorker is supported");
  let px = navigator.serviceWorker.register('eo_sw_Trains5.js', {scope: './'});
  px.then(function(reg) {
    report('Registration succeeded. Scope is ' + reg.scope);
    reg.addEventListener('updatefound', function() {
       report("Updated service worker found.");
       bSWUpdateFound = true;
       });
    reg.addEventListener('activate', function() {
       report("Service Worker activated.");
       reg.active.postMessage("me");
       });
    reg.addEventListener('message', function(event) {
      if(event.data == "online") ;
      else if(event.data == "offline") ;
      });
    init1();
    }).catch(function(error) {
    report('Registration failed with ' + error);
    if((error.toString().indexOf("SecurityError: The operation is insecure.") != -1) && (navigator.userAgent.indexOf("Firefox") != -1))
    {
      report("Note: for Firefox make sure Preferences > Privacy and Security > History\n  has Firefox will Remember history is set and \n  Delete cookies and site data when Firefox is closed - unchecked."); 
    }
    init1();
  });
}
 else init1();
}

function init1()
{
if(bonce)
{
bonce = false;
//adjustCanvas(document.getElementById("video"));
if(bFastStart) getLocation();
// ctrl key displays accesskeys
window.addEventListener("keydown", function(evt){
  if(evt.keyCode == 17) showAccess(); 
  return(evt);
  }, true);
window.addEventListener("keyup", function(evt){
  if(evt.keyCode == 17) hideAccess(); 
  return(evt);
  }, true);
//initTT();
//setTimeout(initTT, 5000);
if(window.DeviceOrientationEvent)
{
//  report("platform supports DeviceOrientation");
  bDeviceOrientation = true;
}
if(window.DeviceMotionEvent)
{
//  report("platform supports DeviceMotion");
  bDeviceMotion = true;
}
if(navigator.geolocation) 
{
//  report("platform supports geolocation");
}
if(window.Notification)
{
  bNotifySupported = true;
//  report("platform supports notifications");
}
document.addEventListener("deviceready", onDeviceReady, false);
document.getElementById('files').addEventListener('change', openSelFile, false);
Xplace = 0;
Home = getLocal("Trains_home_default");
let bU = getLocal("Trains_MTApb");
if(bU == null) bUseMTApb = false;
else if(bU == "true") bUseMTApb = true;
else bUseMTApb = false;
document.getElementById("UseMTA").checked = bUseMTApb;
 
epicenter = getLocal("Trains_epicenter");
if(epicenter == null) 
{
    if(Ypos > 0) epicenter = "Z_8507380:2";
    else epicenter = "AMSBON";
}
if(Home != null)
{
  setPlaceId(Home);
}
if((Place == null) || (Place == ""))
{
  report("Home (default) is not set.");
  setPlaceId(epicenter);
}
else{
  Xplace = 0;
}
init2();
}
}

function locOK()
{
if(document.getElementById("lse").checked) 
{
  getLocation();
}

}

function locNo()
{
}

function init2()
{
//report("1365 init2");
//if(typeof initDMap !== 'undefined') initDMap();
viewTrainBoard();
let dt = new Date();
let TZ = dt.getTimezoneOffset() - 300; // TZ is in minutes
TZPlatform = dt.getTimezoneOffset();
report("Platform TimeZone Offset = " + TZPlatform + " minutes");
updateTimeTick();
window.setInterval(updateTimeTick, 60000);
SNDMODE = 0;
initAudio().then(function(v){
    if(v.length != 0) 
    {
      bVoices = true;
//      report("1379 platform supports speech synthesis");
//      populateVoices();
    }
    else 
    {
      report("platform supports speech synthesis but no voices");
//      populateVoices();
//      synth.onvoiceschanged = populateVoices;
      synth.addEventListener("voiceschanged", function(evt){
        voices = synth.getVoices();
        if(voices != null) 
        {
          report("found " + voices.length + "voices c");
          populateVoices();
        }
        else report("no voices found c");
        }, true);
    }

    }).catch(function(e){
//      report("platform does not support speech. " + e);
    });

let z = window.location.href;
let ilfn = z.indexOf("?");
if(ilfn != -1)
{
  let lf = z.substring(ilfn + 1);

  ilfn = lf.indexOf("audio=true");
  if((ilfn != -1) && (synth != null))
  {
    document.getElementById("eaudio").checked = true;
    bFastStart = true;
    setTimeout(snd(0), 10000);
  }  
}

if(document.getElementById("eaudio").checked)
{
  document.getElementById("sb3").style.visibility = "visible";
}
else if(document.getElementById("aop").checked || bVoices)
{
  document.getElementById("sb3").style.visibility = "visible";
  setTimeout(noAudio, 20000);
}
else document.getElementById("sb3").style.visibility = "hidden";

if(busroute != null) busroute.setMap(null);

checkAlerts(false);
if(navigator.cookieEnabled)
{ let nx = localStorage.getItem("NOTIFICATIONS.txt");
  if(bNotifySupported && (nx != null))
  {
    notif = JSON.parse(nx);
    updateNotifications();
    if(notif != null)
    {
      report("There are " + notif.length + " pending notifications.");
    }
  }
}
initLMD();
}

async function initLanguage()
{
let z = window.location.href;
let ilfn = z.indexOf("?");
if(ilfn != -1)
{
  let lf = z.substring(ilfn + 1);
  ilfn = lf.indexOf("lang=");
  if(ilfn != -1)
  {
    let g = lf.substring(5,7);
    let u = -1;
    if(g == "en") u = 0;
    else if(g == "es") u = 1;
    else if(g == "fr") u = 2;
    else if(g == "de") u = 3;
    else if(g == "it") u = 4;
    else if(g == "ja") u = 5;
    else if(g == "zh") u = 6;
    if(u != -1)
    {
      SelectedLanguage = u;
      document.getElementById("langsel").selectedIndex = SelectedLanguage;
    }
  }
  else if(navigator.cookieEnabled)
  {
    let nx = localStorage.getItem("TrainsLanguage");
    if(nx != null)
    {
      SelectedLanguage = nx;
      document.getElementById("langsel").selectedIndex = SelectedLanguage;
//    report("SelectedLanguage = " + nx);
    }
    nx = localStorage.getItem("Waypoints");
    if(nx != null)
    {
      SavedPositions = JSON.parse(nx);
    }
  else
  {
    SelectedLanguage = 0;
    document.getElementById("langsel").selectedIndex = SelectedLanguage;
    SavedPositions = [];
  }
  }
}
else
{
  if(navigator.cookieEnabled)
  {
    let nx = localStorage.getItem("TrainsLanguage");
    if(nx != null)
    {
      SelectedLanguage = nx;
      document.getElementById("langsel").selectedIndex = SelectedLanguage;
//    report("SelectedLanguage = " + nx);
    }
  }
  else
  {
    SelectedLanguage = 0;
    document.getElementById("langsel").selectedIndex = SelectedLanguage;
  }
}
eo_i18n.updateLanguage(SelectedLanguage).then(eo_i18n.updateLanguageContent()).catch((e) => {
  report("1575 " + e);
  });


}

function updateService()
{
//  service = getService(eo_base);
}

async function checkMapCache(s)
{
  let c = null;
  let cache = await caches.open(MAPCACHE);
  let r = await cache.keys();
  let b = true;
  let k = r.length;
  let i = 0;
  while(b && (i<k))
  {
    if(r[i].url.indexOf(s) != -1)
    {
      c = r[i]; // a response
      b = false;
    }
    else i += 1;   
  }
  if(!b)
  {
    c = await cache.match(a);   
  }
  return(c);
}

const EoZoomValues = [3,4,5, 6, 7, 8, 9, 10, 14,15,16, 17];
let EoZoom = 8;

function zoom(n)
{
/*
  if(bEoMap)
  {
    let z = map.zoomcode;
    if((n >= 1) && (z < 20))
    {
      z += 1;
      map.setZoomcode(z);
    }
    else if(z > 5)
    {
      z -= 1;
      map.setZoomcode(z);
    }
    report("map zoom = " + map.zoom + " zoomcode = " +  map.zoomcode);
    requestAnimationFrame(repaint);
  }
  */
  if(bEoMap)
  {
    let z = map.zoomcode;
    if(n >= 1)
    {
      if(EoZoom + 1 < EoZoomValues.length)
      {
        EoZoom += 1;
        map.setZoomcode(EoZoomValues[EoZoom]);
      }
    }
    else if(EoZoom - 1 >= 0)
    {
      EoZoom -= 1;
      map.setZoomcode(EoZoomValues[EoZoom]);
    }
    report("map zoomcode = " +  map.zoomcode);
    requestAnimationFrame(repaint);
  }
}

function mapColor()
{
  if(document.getElementById("uws").checked) 
  {
    eomapcolor = "white";
    eosubcolor = "yellow";
  }
  else 
  {
    eomapcolor = "blue";
    eosubcolor = "green";
  }
  repaint();
}

function mapBackground()
{
  if(document.getElementById("uwb").checked) 
  {
    document.getElementById("eomap").style.backgroundColor = "black";
    document.getElementById("uws").checked = true; 
    eomapcolor = "white";
  }
  else 
  {
    document.getElementById("eomap").style.backgroundColor = "white";
    document.getElementById("uws").checked = false; 
    eomapcolor = "blue";
  }
  repaint();
}
function xcape()
{
  if(map != null)
  {
    map.init();
    let pt = getPositionForName(Place);
    if(pt != null) map.panTo(new MAPCLASS.LatLng(pt.x, pt.y));
  }
}

function openMap()
{
  CloseMenu();
  /*
  if(document.getElementById("rgm").checked)
  {
    let e = document.createElement("script");
    e.setAttribute("type","text/javascript");
    if(eo_base.indexOf("https") != 1) e.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=" + GKEY + "&callback=initMap");
    else e.setAttribute("src", "http://maps.googleapis.com/maps/api/js?key=" + GKEY + "&callback=initMap");
    document.body.appendChild(e);  
  }
  */
  if(bOnLine) // openstreetmap
  {
//    report("1641 openMap bosmLoaded = " + bosmLoaded);
    if(!bosmLoaded)
    {
    bOSM = true;
    let head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
//    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://www.eightolives.com/docs/Trains/css/ol.css';
    link.media = 'all';
    head.appendChild(link);
    let e = document.createElement("script");
    e.setAttribute("type","text/javascript");
    e.src = "https://www.eightolives.com/docs/Trains/js/ol.js";
    e.onerror = er7(e);
    e.onload = osm();
    document.head.appendChild(e); 
    }
  }
  else 
  {
    bEoMap = true;
    initMap();
  }
  setTimeout(selectFromMap, 1000);
}

let bosmLoaded = false;

function osm()
{
  bosmLoaded = true;
//  report("1673 osm loaded");
}

function er7(e)
{
//  report("Failed to load ol.js " + e.toString());
}

function initMap8()
{
  bOSM = true;
  bEoMap = false;
  initMap7();
}

function initMap7()
{
  report("Loaded ol.js");
  bMapInit = true;
  initMap();
}

function selectFromMap1()
{
/*  if(map != null) 
  {
    menu("KMap");
    showMap(true);
  }
  else */
  if(document.getElementById("KMap").style.visibility == "visible") showMap(false);
  else selectFromMap();
}

function selectFromMap()
{
  // determine which map to use and load it if necessary
//  report("1699 " + bGMapLoaded + " " + bEoMap + " " + bOSM);
  if((!bGMapLoaded) || (!bOnLine && !bEoMap) || (bOnLine && bEoMap))
  {
    if( (!bOnLine && !bEoMap) || (bOnLine && bEoMap)) bMapInit = true;
//      report("1702 bMapInit = " + bMapInit);
    
//    if(document.getElementById("uem").checked || bMonitorMode ||   !bOnLine)
    if(document.getElementById("uem").checked && !bOnLine)
    {
//      report("1705 ");
      bEoMap = true; 
      bOSM = false;
      document.getElementById("GMap").style.display = "block";
      initMap();
      menu("KMap");
      showMap(true);
 //     return;
    }
    else if(!document.getElementById("uem").checked || document.getElementById("rom").checked ||   bOnLine) 
    {
//      report("1713");
      bEoMap = false; 
      bOSM = true;
      document.getElementById("GMap").style.display = "none";
      if(osm_map == null)
      {
//        initMap();
        openMap();
   //     return;
      }
      else 
      {
        map = osm_map;  
        MAPCLASS = map;

      }
    }  
    
//    if(bMapInit) initMap();
//    else openMap();
    
    
    if(map == null)
    {
//      report("1732");
      openMap();
      return;
    }
//    else

/*
    if(!bOnLine)
    {
//      report("1698");
      bEoMap = true;
      initMap();
      showMap(true);
    }
    */
    
  }
//      report("1749 " + bEoMap + " " + bOSM);
  menu("KMap");
  showMap(true);
//  report(";; " + getStopIdFromName(Place));
  selectFromMap3(getStopIdFromName(Place));
}

function selectFromMap3(id)
{
  if(!bMapInit)
  {
    let pt = getPositionForId(id);
    if(pt != null)
    {
      if(!bEoMap)
      {
        map.panTo(new MAPCLASS.LatLng(pt.x, pt.y));
        if((HereMarker != null) && (Xpos != 0) && (Ypos != 0))
        {
          HereMarker.setPosition(new MAPCLASS.LatLng(Xpos, Ypos));
        }
        if(CenterMarker != null)
        {
          CenterMarker.setPosition(new MAPCLASS.LatLng(pt.x, pt.y));
        }
      }
      else if(bOSM)
      {
        map.panTo(new MAPCLASS.LatLng(pt.x, pt.y));
      }
      else
      {
        map.panTo(new MAPCLASS.LatLng(pt.x, pt.y));
        CenterMarker.setPosition(new MAPCLASS.LatLng(pt.x, pt.y));
      }
      if(bOSM) map.repaint();
    }
    else
    {
      report("getPositionForId is null for " + id);
      return;
    }
  }
  if(busroute != null) busroute.setMap(null);
  document.getElementById("NSTN").innerHTML = " ";
  if(bEoMap) 
  {
    let pt = getPositionForId(id);
    if(pt != null)
    {
      let st = new map.DText(getStopNameFromID(id), pt, "10px", eomapcolor);
      st.setMap(map);
    }
    document.getElementById("EoMapMenu").style.display = "block";
    document.getElementById("EoMapMenu").style.visibility = "visible";
  }
  else if(bOSM)
  {
    let pt = getPositionForId(id);
    map.panTo(pt);
  }
  menu("KMap");
  showMap(true);
}

function initMap()
{
    bGMapLoaded = true;
    gmapInit1();
}

function gmapInit1()
{
  let x = Xpos;
  let y = Ypos;
  if(((x == 0) && (y == 0)) || (getDistanceToHere(42.365551, -71.061251) > 100))
  {
    x = 42.365551;
    y = -71.061251;
  }
  let pt = getPositionForId(Place_id);
  if(bMapInit) 
  {
    if(pt != null)
    {
    gmapInit(pt.x, pt.y);
    putMarkerAt(pt.x, pt.y);
    }
    bMapInit = false;
  }
}

function gmapInit(lat, lng)
{
/*  if((!bEoMap) && (!bOSM))
  {
  mapProp = {
  center:new google.maps.LatLng(lat, lng),
  zoom: 17,
  mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map=new google.maps.Map(document.getElementById("GMap"), mapProp);
  MAPCLASS = google.maps;
  putHere();
  putMarkerAt(lat, lng);
  infow = new google.maps.InfoWindow();

  let transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  google.maps.event.addListener(map, "click", function(e) {
       let ll = e.latLng;
       report("map click lat, lon = " + Math.round(10000 * ll.lat()) / 10000 + ", " + Math.round(10000 * ll.lng()) / 10000 + ",");
       nstn = getNearestStation(ll.lat(), ll.lng());
 //      report("Nearest station = " + nstn);
       let d = "";
       let dg = "";
       if(gnspt != null)
       {
         d =getDistanceBetween( ll.lat(), ll.lng(), gnspt.x, gnspt.y);
         d = (Math.round(d * 100)) / 100;
         dg = d  + " mi"
       }
       document.getElementById("NSTN").innerHTML = getStopNameFromID(nstn) + " " + dg;
       populateNBP(ll.lat(), ll.lng());
  } );
  }
  else */
//  report("1848 " + bEoMap + " " + bOSM);
  if(bEoMap)
  {
    if(map != null) map = null;
    eo_map = new EoMap(document.getElementById("GMap"));
    map = eo_map;
    MAPCLASS = map;
    document.getElementById("EoMapMenu").style.visibility = "visible";
    map.init();
//    report("EoMap");
    putHere();
    let po = getPositionForId(Place_id);
    putMarkerAt(po.x, po.y);
    map.paint(ctx);
  }
  else if(bOSM)
  { 
    if(osm_map == null) osm_map = new OSM("HMap");
    map = osm_map;
//    report("map.bOK = " + map.bOK);
    if(map.bOK)
    {
      MAPCLASS = map;
      map.init();
      putHere();
      let po = getPositionForId(Place_id);
      putMarkerAt(po.x, po.y);
    }
    else
    {
      report("1907 use EoMap");
      bOSM = false;
      bEoMap = true;
      bMapInit = true;
      initMap();
    }
  }
  showMap(true);
  
  if(document.getElementById("ecmps").checked && bDeviceOrientation && !bCompassEnabled)
  {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') 
    {
      DeviceOrientationEvent.requestPermission()
        .then(function(permissionState) {
          if (permissionState === 'granted') 
          {
            window.addEventListener('deviceorientation', handleOrientation,true);
            bCompassEnabled = true;
//            report("compass enabled ios a");
            showMap(true);
          }
        })
        .catch(function(error) {
            report(error);
        });
    }
    else
    {
      window.addEventListener("deviceorientation", handleOrientation, true);
      bCompassEnabled = true;
//      report("compass enabled");
    }
  }
}

function connectMarker()
{
  if(bEoMap || bOSM) map.connectWaypoints();
  closePlotPopup();
}

function addMarker()
{
  markerno += 1;
//  let img = 'images/markery.png';
  let img = 'images/wp.png';
  let mp = {lat: Xpos, lng: Ypos};
  let lat = Zpoint.lat;
  if(typeof Zpoint.lat === 'undefined') lat = Zpoint.x;
  let lon = Zpoint.lon;
  if(typeof Zpoint.lon === 'undefined') lon = Zpoint.y;
  let sc = '<div id="content">Marker ' + markerno +
            '<hr><div id="bodyContent">Lat: ' + lat + '<br>Lon: ' + lon + '<hr>Cut<br>Paste<hr>Delete<br>';
  sc += '</div></div>';
  let marker = new MAPCLASS.Marker({
  position:mp,
  map: map,
  title: 'Marker ' + markerno,
  icon: img
  });  
  marker.sc = sc;
  if((!bEoMap) && (!bOSM)) google.maps.event.addListener(marker,'click', function() 
  {
    infow.close();
    infow.setContent(this.sc);
    infow.open(map, this);
  });
  marker.setMap(map);          
//  report("Zpoint " + lat + " " + lon);
  marker.setPosition(new MAPCLASS.LatLng(lat, lon));
  markers[markers.length] = marker;
  saveAWaypoint(lat, lon, 0, 0);
  closePlotPopup();
  if(bEoMap) setTimeout(repaint, 1000); 
  if(bOSM) map.repaint(); 

}

function setMarkerHere(c)
{
  markerno += 1;
  let img = 'images/markery.png';
  if(c == 'b') img = 'images/markerb.png';
  else if(c == 'g') img = 'images/markerg.png';
  else if(c == 'w') img = 'images/wp.png';
  let mp = {lat: Xpos, lng: Ypos};
//  report("img = " + img);
  let sc = '<div id="content">Marker ' + markerno +
            '<hr><div id="bodyContent">Lat: ' + Xpos + '<br>Lon: ' + Ypos + '<hr>Cut<br>Paste<hr>Delete<br>';
  sc += '</div></div>';
  let marker = new MAPCLASS.Marker({
  position:mp,
  map: map,
  title: 'Marker ' + markerno,
  icon: img
  });  
  marker.sc = sc;
  if((!bEoMap) && (!bOSM)) google.maps.event.addListener(marker,'click', function() 
  {
    infow.close();
    infow.setContent(this.sc);
    infow.open(map, this);
  });
  marker.setMap(map);
  marker.setPosition(new MAPCLASS.LatLng(Xpos, Ypos));
  markers[markers.length] = marker;
  saveAWaypoint(Xpos, Ypos, Zpos, PosAccuracy);
  closeHerePopup();
  if(bEoMap) setTimeout(repaint, 1000); 
  if(bOSM) map.repaint(); 
}

function clearMarkers()
{
  let k = markers.length - 1;
  while(k >= 0)
  {
    markers[k].setMap(null);
    markers[k] = null;
    k -= 1;
  }
  clearArray(markers);
  if(bEoMap) setTimeout(repaint, 1000); 
  if(bOSM) map.repaint(); 
  closeHerePopup();
}

function putMarkerAt(la,lo)
{
  if(CenterMarker != null) {CenterMarker.setMap(null); CenterMarker = null;}
 let mp = {lat: la, lng: lo};
 // if((!bEoMap)) // && !bOSM)
  {
  CenterMarker = new MAPCLASS.Marker({
  position:mp,
  map: map,
  title: 'Center',
  icon:'images/markerr.png'
  });  
  CenterMarker.setMap(map);
  CenterMarker.setPosition(new MAPCLASS.LatLng(la, lo));
  }
 // else
  {
  }
}

function centerLatLon()
{  
  closeHerePopup();
  let x = document.getElementById("clat").value;
  let y = document.getElementById("clon").value;
  let ptx = new PointI(x, y);
  CenterMarker.setPosition(new MAPCLASS.LatLng(x, y));  
  map.panTo(ptx);
  closeLatLon();
}

function putHere()
{
  if((Xpos != 0) && (Ypos != 0))
  {
  let mp = {lat: Xpos, lng: Ypos};
  if(HereMarker != null) {HereMarker.setMap(null); HereMarker = null;}
  HereMarker = new MAPCLASS.Marker({
  position:mp,
  map: map,
  title: 'Here',
  icon: 'images/you1.png'
  });
  HereMarker.setMap(map);
  HereMarker.setPosition(new MAPCLASS.LatLng(Xpos, Ypos));
  }
}

function plotBus()
{
  let s = BusNum;
  if((BusNum == null) || (BusNum == 0) || (BusNum == "")) s = "1";
  s = prompt("Plot Bus Number:", s);
  if((s != null) && (s != "") && (!isNaN(s)))
  {
    BusNum = s;
    BusDesc = "";
    lastBusNum = "";
    DISPLAYTYPE = 4;
    plotRoute(BusNum);
  }
}

function plotBus2()
{
  report("plotBus2");
  let ss = document.getElementById("buslist2");
  let i = ss.children.length - 1;
  while( i >= 0)
  {
    ss.remove(i);
    i -= 1;
  }
  let k = routes_bus.length;
  i = 0;
  let z = 0;
  while(i < k)
  {
    let op = document.createElement("option");
    let t = routes_bus[i] + " : " + routes_bus[i + 2];
    t.replace('amp;', ''); // does not work
    op.text = t;
    ss.add(op);
    i += 5; 
  }
  showPlotBusSel();
}

function plotBusFromList()
{
  let i = document.getElementById("buslist2").selectedIndex;
  let bm = document.getElementById("mbtabus").checked;
  let inc = 5;
  if(!bm) inc = 4;
  BusNum = routes_bus[i*inc + 1];
  BusDesc = routes_bus[i*inc + 2];
  closePlotBusSel();
  lastBusNum = "";
  DISPLAYTYPE = 4;
  plotRoute(BusNum);
}


function plotRoute(route_id)
{
clearPlot();
markedtripid = null;
report("plotRoute " + route_id);
if(map != null) //&& (!isNaN(route_id)))
{
  if(busroute != null) busroute.setMap(null);
  let p = service.getShapeIdByRoute(route_id);
  p.then(function(t) {
    let shape_id =  t.data[0].id;
    let stops = t.data[0].relationships.stops.data;
    let eos = new EoService();
    let p2 = eos.getShapeInfo(shape_id);
    p2.then(function(t) {
        let pts = [];
        let s = t.replace(/\"/g, "");
        let a = s.split(",");
        let k = a.length;
        report("1184 got shape info " + k);
        let i = 1;
        let sx = shape_id;
        if(sx.indexOf("\"") == 0) sx = sx.substring(1);
        if(sx.indexOf("\"") != -1) sx = sx.substring(0, sx.length-1);
        while(i < k)
        {
          let bx = a[i-1].trim();
          if(sx === bx)
          {
            pts[pts.length] = new MAPCLASS.LatLng(a[i], a[i+1] );
          }
          i += 4;
        }
        busroute = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#FF9900', // was ffcc00
          strokeOpacity: 1.0,
          strokeWeight: 5
          });
        busroute.setMap(map);
        if(bOSM) map.repaint();
        }).catch(function(err) {
              report(err);
              } );
        if(bEoMap)
        {
          let kk = stops.length;
          let ii = 0;
          let ptx = null;
          while(ii < kk)
          {
            let pt = getPositionForId(stops[ii].id);
            if(ii == 0) ptx = new PointI(pt.x, pt.y);
            let st = new map.DText(getStopNameFromID(stops[ii].id), pt, "10px", "lightblue");
            st.setMap(map);
            ii += 1;
          }
          if(ptx != null) map.panTo(ptx); 
        }
  } ).catch(function(err) {
    report(err);
    } );
}
}

function plotaShape()
{
  CloseMenu();
  let s = prompt("Enter shape_id", "");
  if(s != null) plotShape(s);
}

function plotTrip()
{
  clearPlot();
  document.getElementById("trktp").checked = true;
  if(bpt1 && !bGMapLoaded)
  {
    bpt1 = false;
    selectFromMap();
    setTimeout(plotTrip, 10000);
  }
  else 
  {
    let tid = CurrentTripID;
    if(tid.indexOf("CTA") == 0)
    {
//      report(JSON.stringify(CurrentTrip, null, 4));
    }
    plotTrip2(CurrentTripID);
  }
}

function plotTrip2(tod)
{
  CloseMenu();
  report("2279 plotTrip2 " + tod +" " + CurrentTripRouteID);
  selectFromMap();
  if((map != null) && (tod != null) && (tod != ""))
  {
    let eos = new EoService();
    let p = null; 
    let bf = true;
    let tid = tod;
    if(tid.indexOf("NYC") == 0)
    {
      let j = tid.lastIndexOf("_");
      let i = tid.indexOf(".");
      let ttd = "NY" + tid.substring(j+1, i);
      i = tid.lastIndexOf(".");
      let d = tid.substring(i+1, i+2);
      let r = serviceE.getRouteS(ttd);
      if(d == r.iddir) ttd += "_0";
      else ttd += "_1";
      tid = ttd;
      ASTRIP = r.getTTrip(tid);
      report("ttd = " + ttd + " " + ASTRIP);
 //     let sid = "1.." + tid.substring(i+2);
 //     plotShape(sid);
      bf = false;
    }
    if(tid.indexOf("T_") == 0)
    {
      let rt = serviceT.getRoute(CurrentTripRouteID);
      let tr = rt.getTTrip(tid);
//      report("2308 " + CurrentTripRouteID +" " + tid + " " + tr.tid);
      tid = tr.tid;
    }
//    report("2302 " + CurrentTrip.trip_id + " " + CurrentTrip.shape_id + " " + ASTRIP.shape_id);
//    report("2303 " + JSON.stringify(CurrentTrip , null, 4));
    if(serviceE.isAssociateTrip(tid))
    {
//      report("2308 " + tid + " " + serviceE.isAssociateTrip(tid));
      let sid = null;
      if(ASTRIP != null) sid = ASTRIP.shape_id;
      if(((typeof sid === 'undefined') || (sid == null)) && (BSND.length != 0))
      {
        sid = BSND[BSND.length -1].shape_id;
      }
      if((typeof sid !== 'undefined') && (sid != null))
      {
        plotShape(sid);
        bf = false;
      }
    }
    if(bf)
    {
    p = eos.getTripInfo(tid);
    p.then(function(d) {
      let shape_id = "";
      let da = d.split(",");
      let bBadMatch = false;
      report("plotTrip2 tid = " + tid + " d = " + d);
      report("plotTrip2 route = " + CurrentTripRouteID);
      if((d == "") || (da.length < 3)) bBadMatch = true;
      else
      {
        if((da[2] != tid) && (da[2].indexOf(tid) != 1) && (da[3].indexOf(tid) != -1) && (da[4].indexOf(tid) != -1)) {bBadMatch = true; report("Bad trip match " + da[2] + " " + tid);}
        shape_id = da[7];
        if(tid.indexOf("PP") == 0) shape_id = da[8];
        else if(tid.indexOf("CTA") == 0) shape_id = "CTA" + da[5];
        else if(tid.indexOf("LI") == 0) 
        {
          let s1 = da[6].replace(/\"/g, "");
          shape_id = "LI" + s1;
        }
      }
      let bFixedPlot = false;
      if(bBadMatch)
      {
        if(CurrentTripRouteID == "Green-B") {shape_id = "813_0004"; bBadMatch = false;}
        else if(CurrentTripRouteID == "Green-C") {shape_id = "831_0008"; bBadMatch = false;}
        else if(CurrentTripRouteID == "Green-D") {shape_id = "852_0012"; bBadMatch = false;}
        else if(CurrentTripRouteID == "Green-E") {shape_id = "880_0012"; bBadMatch = false;}
      }
      report("2346 shape = " + shape_id);
      if((CurrentTripRouteID == "Green-B") || (CurrentTripRouteID == "G1")) plot6(greenBShape);
      else if((CurrentTripRouteID == "Green-C") || (CurrentTripRouteID == "G2")) plot6(greenCShape);
      else if((CurrentTripRouteID == "Green-D") || (CurrentTripRouteID == "G3")) plot6(greenDShape);
      else if((CurrentTripRouteID == "Green-E") || (CurrentTripRouteID == "G4") || (CurrentTripRouteID == "G0"))  plot6(greenEShape);
      else if((CurrentTripRouteID == "Blue") || (CurrentTripRouteID == "B0"))plot6(blueShape);
      else if((CurrentTripRouteID == "Orange") || (CurrentTripRouteID == "O0")) plot6(orangeShape);
      else if((CurrentTripRouteID == "Mattapan")  || (CurrentTripRouteID == "R3"))plot6(mattapanShape);
      else if((CurrentTripRouteID == "Red") || (CurrentTripRouteID == "R0") ||(CurrentTripRouteID == "R2"))
      {
//        plot6(redBraintreeShape.concat(redAshmontShape));
        plot6(redBraintreeShape);
        plot6(redAshmontShape);
      }
      else if((shape_id === undefined) || bBadMatch)
      {
        plotTripStops(tid);
        reportVS();
        if(bEoMap) document.getElementById("EoMapMenu").style.visibility = "visible";
        menu("KMap");
      }
      else
      {
        plotShape(shape_id);
      }
      } ).catch(function(e) {
        report("Error plotTrip " + e);
        plotTripStops(tid);
        reportVS();
        if(bEoMap) document.getElementById("EoMapMenu").style.visibility = "visible";
        menu("KMap");
      } );
      }
  }
}

function plotShape(shape_id)
{
  let eos = new EoService();
  let p2 = eos.getShapeInfo(shape_id);
  p2.then(function(t) {
    let pts = [];
    let s1 = t.replace(/\"/g, "");
    let s = s1.replace(/\n/g, ",");
    let a = s.split(",");
    let k = a.length;
    if(k > 1)
    {
    let i = 0;
    let i0 = 1; //offset to lat
    let sx = shape_id;
    let blatflag = false;
    let m = 5;
    if(sx.indexOf("LI") != -1) m = 4;
    if(sx.indexOf("RIPT") != -1) m = 4;
    if(sx.indexOf("LAT") != -1) m = 4;
    if(sx.indexOf("SF") == 0) blatflag = true;
    if(sx.indexOf("SMART") == 0) blatflag = true;
    k = m * Math.floor(k / m);
    if(sx.indexOf("PSS_") == 0) {m = 5; i0 = 2;}
    if(sx.indexOf("AMS") == 0) {m = 4;}
    if(sx.indexOf("SOUND") == 0) {m = 5; i0 = 2;}
    report("1209 got shape info " + sx + " " + k);
    if(sx.indexOf("\"") == 0) sx = sx.substring(1);
    if(sx.indexOf("\"") != -1) sx = sx.substring(0, sx.length-1);
    TripLength = 0;
    ShapeData = [];
    if((k == 0) && (CurrentTrip !== null))
    {
      plotTripStops(CurrentTrip.trip_id); 
    }
    else if(k > 1)
    {
 //     report("TripLength = " + a[k-1]);
      TripLength = a[k-1];
      ShapeData = a;
      if(TripLength <= 0) 
      {
        TripLength = 0;
        ShapeData = [];
      }
    }
    let INC = m;
    while(i < k)
    {
      let bx = a[i].trim();
      if(sx.indexOf(bx) != -1)
      {
         if(blatflag) pts[pts.length] = new MAPCLASS.LatLng(Number(a[i + i0 +1]), Number(a[i + i0]) );
         else pts[pts.length] = new MAPCLASS.LatLng(Number(a[i+i0]), Number(a[i+i0+1]) );
      }
      i += INC;
    }
    let triproute = new MAPCLASS.Polyline({
      path: pts,
      geodesic: true,
      strokeColor: '#FF9900', // was ffcc00
      strokeOpacity: 1.0,
      strokeWeight: 5
      });
    triproute.setMap(map);
    if(bEoMap)
    {
      checktime(plotTrip3);
    }
    if(bOSM) map.repaint();
    reportVS();
    if(bEoMap) document.getElementById("EoMapMenu").style.visibility = "visible";
    menu("KMap");
    }
    else plotTripStops(CurrentTrip.trip_id);
   }).catch(function(e) {
        report("Error2 plotTrip " + e);
        plotTripStops(CurrentTrip.trip_id);
      } );
}
 

function plot6(a)
{
  report("plot6");
  let pts = [];
  TripLength = 0;
  ShapeData = [];
  let k = a.length;
  let i = 0;
  while(i < k)
  {
    pts[pts.length] = new MAPCLASS.LatLng(a[i], a[i+1] );
    i += 2;
  }
  let triproute = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#FFCC00',
          strokeOpacity: 1.0,
          strokeWeight: 5
          });
  triproute.setMap(map);
  if(bEoMap)
  {
    checktime(plotTrip3);
  }
  reportVS();
//  if(bOSM) map.repaint();
  if(bEoMap) document.getElementById("EoMapMenu").style.visibility = "visible";
  menu("KMap");
}

function plotTrip3()
{
  report("plot3");
  let ptx = null;
  let p5 = null;
  let tid = CurrentTripID;
  if(tid.indexOf("CTA") == 0) tid = xtid;
  if(CurrentTripID.indexOf("NYC") == 0) p5 = serviceE.getPredictionByTrip(CurrentTripID, null);
  else p5 = service3.getScheduleByTrip(tid, null);
  p5.then(function(t){
  let kk = t.stop.length;
  let ii = 0;
  while(ii < kk)
  {
    let pt = getPositionForId(t.stop[ii].stop_id);
    if(ii == 0) ptx = new PointI(pt.x, pt.y);
    let st = new map.DText(t.stop[ii].stop_name, pt, "10px", "lightblue");
    st.setMap(map);
    ii += 1;
  }
  if(ptx != null) map.panTo(ptx); 
  if(bOSM) map.repaint();

  } ).catch(function(e) {
  report("Error plotTrip3 " + e);
  } );
}


function plotTripStops(tid)
{
  report("plotTripStops");
  let p = null; 
  let pts = [];
  TripLength = 0;
  ShapeData = [];
  if(serviceE.isAssociateTrip(tid))
  {
    p = serviceE.getScheduleByTrip(tid, null);
  }
  else
  {
    p = service3.getScheduleByTrip(tid, null);
  }  
  p.then(function(data){
    if(data != null) 
    {
      let ptx = null;
//      let t = data.stop;
      let t = getSortedTripStops(data);
//      t = data.stop.sort(tripComparey2)
      let k = t.length;
      report("plotTripStops k = " + k);
      let i = 0;
      while(i < k)
      {
        let sid = t[i].stop_id;
        let pt = getPositionForId(sid);
        if(pt != null)
        {
        if(bEoMap)
        {
          let st = new map.DText(t[i].stop_name, pt, "10px", "lightblue");
          if(i == 0) ptx = new PointI(pt.x, pt.y);
          st.setMap(map);
        }
//        report("  " + pt.x + " " + pt.y + " " + sid);
        pts[pts.length] = new MAPCLASS.LatLng(pt.x, pt.y );
        }
        else report("no position for stop " + sid);
        i += 1;
      }
      if(bEoMap) map.panTo(ptx);
      triproute = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#FFCC00',
          strokeOpacity: 1.0,
          strokeWeight: 5
          });
      triproute.setMap(map);
      if(bOSM) map.repaint();
    }
    } ).catch(function(error){
        let t = CurrentTrip.stop;
//        report(JSON.stringify(CurrentTrip, null, 4));
        if(typeof t !== 'undefined')
        {
       let k = t.length;
      report("plotTripStops k = " + k);
//      report(JSON.stringify(t, null, 4));
      let i = 0;
      while(i < k)
      {
        let sid = t[i].stop_id;
//        report("2335  " + sid);
        let pt = getPositionForId(sid);
        if(pt != null)
        {
        if(bEoMap)
        {
          let st = new map.DText(t[i].stop_name, pt, "10px", "lightblue");
          if(i == 0) ptx = new PointI(pt.x, pt.y);
          st.setMap(map);
        }
//        report("  " + pt.x + " " + pt.y + " " + sid);
        pts[pts.length] = new MAPCLASS.LatLng(pt.x, pt.y );
        }
        else report("no position for stop " + sid);
        i += 1;
      }
      if(bEoMap) map.panTo(ptx);
      triproute = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#FFCC00',
          strokeOpacity: 1.0,
          strokeWeight: 5
          });
      triproute.setMap(map);
      if(bOSM) map.repaint();
       
        }
        else report("plotTripStops error " + error);
    } );
}


function getSortedTripStops(tp)
{
  let ss = tp.stop;
//  report("typeof tp.stop[0].stop_sequence = " + typeof tp.stop[0].stop_sequence);
  if((typeof tp.stop[0].stop_sequence !== 'undefined') && (CurrentTripRouteID.indexOf("NJR") != 0) && (CurrentTripRouteID.indexOf("LIR") != 0) && (tp.route_id.indexOf("MW") != 0) && (CurrentTripRouteID.indexOf("PP") != 0)
  && (CurrentTripRouteID.indexOf("BRTA") != 0) 
//  && (CurrentTripRouteID.indexOf("AMR") != 0) 
  && (CurrentTripRouteID.indexOf("CC") != 0))
  {  // sort by sequence
//    report("  sort by seq");
    ss.sort(tripComparey2); 
  }
  else // sort by time
  {
//    report("  sort by time");
    ss.sort(tripComparey); 
  }
  return(ss);
}

function tripComparey(a,b)
{
let x = a.sch_dep_dt;
if(x == "") x = a.sch_arr_dt;
let y = b.sch_dep_dt;
if(y == "") y = b.sch_arr_dt;
//report("  " + x + " " + y);
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function tripComparey2(a,b)
{
let x = Number(a.stop_sequence);
let y = Number(b.stop_sequence);
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function getTripForVehicle(route_id, veh_id)
{
  let r = route_id.split(",");
  let s = "";
  let k = r.length;
  let i = 0;
  while(i < k)
  {
    let x = getRouteIdForS(r[i]);
    if(x != "") r[i] = x; 
    if(i != 0) s += ","
    s += r[i];
    i += 1;
  }
  let p7 = new Promise(function(resolve, reject) {
  if(isAmRoute(s))
  {
    reject("isAmRoute");
  }
  else {
    let p = service3.getVehiclesByRoutes(s);
    p.then(function(t){
      VBR = t;
      let t1 = t.mode;
      if(t1 === undefined) report("Vehicle status t1 undefined");
      else
      {
      let data = "";
      let b = true;
      let k1 = t1.length;
 //     report("Vehicle status t1.length = " + k1 + ", id = " + veh_id);
      let i1 = 0;
      while(b && (i1 < k1))
      {
        let t2 = t1[i1].route;
        let k2 = t2.length;
        let i2 = 0;
        while(b && (i2 < k2))
        {
          let t3 = t2[i2].direction;
          let k3 = t3.length;
          let i3 = 0;
          while(b && (i3 < k3))
          {
            let t4 = t3[i3].trip;
            let k4 = t4.length;
            let i4 = 0;
            while(b && (i4 < k4))
            {
              let t5 = t4[i4].vehicle;
 //             if(map != null)
              {
                let bGreenTrip = false;
                if(t2[i2].route_id.indexOf("Green") == 0)
                {
 //                 report("veh label = " + t5.vehicle_label);
                  let n = t5.vehicle_label.indexOf("-");
                  if(n == -1)
                  {
                    if(t5.vehicle_label.indexOf(veh_id) == 0)
                    {
                      b = false;
                      data = t4.trip_id;
                    }
                  }
                  else if(n > 0)
                  {
                    let sf = t5.vehicle_label.substring(0, n);
//                    report("veh_id = " + veh_id + ", sf = " + sf);
                    if(veh_id.indexOf(sf) != -1)
                    {
                      b = false;
//                      report("got new trip " + t4[i4].trip_id);
                      data = t4[i4].trip_id;
                    }
                  }
                }
           
              }
              i4 += 1;
            }
            i3 += 1;
          }
          i2 += 1;
        }
        i1 += 1;
      }
      }
      if(!b) resolve(data);
      else
      {
        report("no match");
        reject("no match");
      }
    } ).catch(function(error) {
        reject(error);
      });
  }
  } );
  return(p7);
}

function startMonitorMode()
{
  document.getElementById("trktp").checked = true;
  if(!bMonitorMode)
  {
    if(document.getElementById("eaudio").checked)
    {
      setSndState(21);
      setMonitorMode(true);
      CurrentPhrase = 0;
      announceTripX(0);
    }
    else
    {
      setMonitorMode(true);
      beep1();
    }
  }
  closeMenuById("TripPopup");
}

function stopMonitorMode()
{
  CloseMenu();
  setMonitorMode(false);
  setMonitorCnx(false);
  beep1();
}

function reportVS()
{
  CloseMenu();
  checktime(updateVehicles);
}

function updateVehicles1()
{
  closePlotPopup();
  checktime(updateVehicles);
}

function updateVehicles()
{
  updateVehiclesA(DT1Route);
}

function updateVehiclesA(rts)
{
  if(typeof rts !== 'undefined')
  {
  let pid = null;
  let r = rts.split(",");
  let s = "";
  let k = r.length;
  let i = 0;
  while(i < k)
  {
    let x = getRouteIdForS(r[i]);
    if(x != "") r[i] = x; 
    if(i != 0) s += ","
    s += r[i];
    i += 1;
  }
  let bLA = (bOnLine && ((s.indexOf("LAMB") == 0) || (s.indexOf("AMR") == 0)));
//  report("2573 " + bLA + " " + s + " " + s.indexOf("LAMB"));
  if(!bLA && (isAmRoute(s) || serviceE.isAssociateRoute(s))) 
  {
//    report("2817 vse called because isAssociate " + rts);
    vse("");
  }
  else {
  let p =  null;
  if(bLA) p = serviceE.getVehiclesByRoutes(s);
  else p = service3.getVehiclesByRoutes(s);
    p.then(function(t){
      VBR = t;
      let ostat = "";
      clearVehicles();
      let bdoone = true;
      let t1 = t.mode;
      if(t1 === undefined) report("Vehicle status t1 undefined");
      else
      {
      let bGotRedVeh = false;
      let k1 = t1.length;
//      report("Vehicle status t1.length = " + k1);
      let i1 = 0;
      while(i1 < k1)
      {
        let t2 = t1[i1].route;
        let k2 = t2.length;
        let i2 = 0;
        while(i2 < k2)
        {
          let t3 = t2[i2].direction;
          let k3 = t3.length;
          let i3 = 0;
          while(i3 < k3)
          {
            let t4 = t3[i3].trip;
            let k4 = t4.length;
            let i4 = 0;
        
            if(k4 == 0)
            {
 //             report("updateVehicles has no trips!");
 //             report("vse called because no trips");
 //             vse(t2[i2].route_id);
            }
        
            while(i4 < k4)
            {
              let t5 = t4[i4].vehicle;
              let lat = null;
              let lon = null;
              lat = t5.vehicle_lat;
              lon = t5.vehicle_lon;
              lat = lat.substring(0, lat.indexOf(".") + 5);
              lon = lon.substring(0, lon.indexOf(".") + 5);
              ostat = t5.ostat;
              if(typeof ostat === 'undefined') ostat = "";
              else if((ostat == null) || (ostat == "null")) ostat = "";
//              if((t4[i4].trip_id == CurrentTripID) || (t5.vehicle_label == CurrentTripID) || bGreenTrip)
              if((t4[i4].trip_id == CurrentTripID) || (t5.vehicle_label == MonitorTripID) || bGreenTrip)
              {
                if(bMonitorMode && bdoone)
                {
                  let stn = t4[i4].trip_name;
                  if(!isNaN(stn)) stn = fixIdNumber(stn);
                  if(document.getElementById("eaudio").checked)
                  {
                    let stat = "";
                    if(typeof t5.status !== 'undefined')
                    {
                      stat = t5.status + " " + getStopNameFromID(t5.stop_id);
                    }
                     let sw = t4[i4].trip_name + " " + t2[i2].route_id + " to " + t4[i4].trip_headsign + " " + stat;
//                    report("2645 " + sw);
                    announceMonitor(sw, lat, lon, t5.stop_id);
                    report("2645 " + sw);
                  }
 //                 else
                  {
                    clearReport();
                    let sff = (t4[i4].trip_name + " " + t2[i2].route_id + " to " + t4[i4].trip_headsign + " " + t5.status + " " + getStopNameFromID(t5.stop_id));
                    report(sff);
                    let s3 = getOccImg(CurrentTripRouteID, CurrentTripID, 1);
                    document.getElementById("NSTN").innerHTML = sff + " " + s3;
                  }
                  bdoone = false;
                }
              }

              if(map != null)
              {
                let ts = t5.vehicle_timestamp;
                let td = new Date(ts * 1000);
//                let ds = ts + "<br>" + td.toLocaleDateString() + " " + td.getHours() + ":" + td.getMinutes() + ":" + td.getSeconds();
                let ds = td.toLocaleDateString() + " " + td.getHours() + ":" + td.getMinutes() + ":" + td.getSeconds();
 //               lat = t5.vehicle_lat;
 //               lon = t5.vehicle_lon;
 //               lat = lat.substring(0, lat.indexOf(".") + 5);
 //               lon = lon.substring(0, lon.indexOf(".") + 5);
                let bisbus = !isNaN(t2[i2].route_id);
                let bGreenTrip = false;
                if(t2[i2].route_id.indexOf("Green") == 0)
                {
                  let n = t5.vehicle_label.indexOf("-");
                  if(n > 0)
                  {
                    let sf = t5.vehicle_label.substring(0, n);
                    if(CurrentTripID.indexOf(sf) != -1) bGreenTrip = true;
                  }
                }
//                let dx = getStopNameFromID(getNearestStation1(lat, lon, bisbus));
                let sc = '<div id="content"><a href=\"javascript:mark(\'' + t4[i4].trip_id + '\')\">Mark</a><hr>' +
            '<b id="firstHeading" class="firstHeading">to ' + t4[i4].trip_headsign + " " + '</b>'+
            '<div id="bodyContent">'+ t3[i3].direction_name + '<br>' + t2[i2].route_name + '<br>' + t4[i4].trip_name;
            
 //           sc += '<br>trip_id = ' + t4[i4].trip_id;
            
            sc += '<br>trip_id = <a href=\'javascript:showTripSked(\"' +t4[i4].trip_id + '\", \"' + t4[i4].trip_name + '\", \"' + t2[i2].route_id + '\", \"' + t4[i4].trip_headsign + '\")\'>' + t4[i4].trip_id + '</a>';
            
            sc += '<br>veh_label = <a href=\'javascript:showTripSked(\"' + t5.vehicle_label + '\", \"' + t4[i4].trip_name + '\", \"' + t2[i2].route_id + '\", \"' + t4[i4].trip_headsign + '\")\'>' + t5.vehicle_label + '</a><br>veh_id = ' + t5.vehicle_id + '<br>' + t5.status + '<br>' + getStopNameFromID(t5.stop_id) + '<br>' + ds + '<br>' + ostat + '</div>'+
            '</div>';
                let mp = {lat: lat, lng: lon};
                let x = null;
                if((markedtripid != null) && (markedtripid == t4[i4].trip_id))
                {
                   x = new MAPCLASS.Marker({
                    position:mp,
                    map: map,
                    title: 'Vehicle',
                    icon: 'images/vehp.png'
                    });                                
                }
                else if((t4[i4].trip_id == CurrentTripID) || (t5.vehicle_label == CurrentTripID) || bGreenTrip)
                {
                   x = new MAPCLASS.Marker({
                    position:mp,
                    map: map,
                    title: 'Vehicle',
                    icon: 'images/vehr.png'
                    });
                    VEH_STOP = t5.stop_id;
                    if(document.getElementById("trktp").checked)
                    {
                      if(bEoMap) map.panTo(mp);
                      else
                      {
                       map.panTo(new MAPCLASS.LatLng(lat, lon));
                      }
                    }
                    bGotRedVeh = true;
               }
                else
                {
                   x = new MAPCLASS.Marker({
                    position:mp,
                    map: map,
                    title: 'Vehicle',
                    icon: 'images/veh.png'
                    });
                }
                x.sc = sc;
                x.timestamp = t5.vehicle_timestamp;
                x.trip_id = t4[i4].trip_id;
                if((!bEoMap) && (!bOSM)) google.maps.event.addListener(x,'click', function() {
                    infow.close();
                    infow.setContent(this.sc);
                    infow.open(map, this);
                    });
                x.setMap(map);
                x.setPosition(new MAPCLASS.LatLng(lat, lon));
                vehs[vehs.length] = x;
           
              }
              let tf = Math.round(NOW / 1000) - t5.vehicle_timestamp;
 //             report("NOW = " + NOW + " " + t5.vehicle_timestamp + " " + tf);
              if((DISPLAYTYPE == 1) && (t4[i4].trip_id == CurrentTripID) && (tf < 150))
              {
                if(tf < 150)
                {
                  ACT_TRIP_STATUS = t5.status;
                  ACT_TRIP_STOP = t5.stop_id;
                  ACT_TRIP_TSTAMP = t5.vehicle_timestamp;
 //                 report("ACT_TRIP_STATUS = " + t5.status + ", ACT_TRIP_STOP = " + t5.stop_id + " " + getStopNameFromID(t5.stop_id));
                }
                else
                {
                  ACT_TRIP_STATUS = "";
                  ACT_TRIP_STOP = "";
                  ACT_TRIP_TSTAMP = 0;
                }
              }
              i4 += 1;
            }
            i3 += 1;
          }
          i2 += 1;
        }
        i1 += 1;
      }
      if(!bGotRedVeh)
      {
        vse1();
      }
      }
      if(bEoMap) setTimeout(repaint, 1000); 
      if(bOSM) map.repaint(); 
    } ).catch( vse) 
   }
  }
  }
  
  function vse(error){
//    report("Vehicle status estimate for " + error);
    clearVehicles();
    let tw = displaysked;
    if(tw != null)
    {
//      let tstop = getSortedTripStops(tw);
      let tstop = tw.stop.sort(tripComparey);
      let k = tstop.length;
      let i = 0;
      let b = true;
      let lasttg = 0;
      while(b && (i < k))
      {
        let tp = tstop[i];
        if((typeof tp.status !== 'undefined') && (tp.status != null))
        {
          let tf = Math.round(NOW / 1000) - tp.vehicle_timestamp;
          if(tf < 150)
          {
            b = false;
            ACT_TRIP_STATUS = tp.status;
            ACT_TRIP_STOP = tp.stop_id;
            ACT_TRIP_TSTAMP = tp.vehicle_timestamp;
 //                 report("ACT_TRIP_STATUS = " + t5.status + ", ACT_TRIP_STOP = " + t5.stop_id + " " + getStopNameFromID(t5.stop_id));
          }
          else
          {
            ACT_TRIP_STATUS = "";
            ACT_TRIP_STOP = "";
            ACT_TRIP_TSTAMP = 0;
          }
          
        }
        i += 1;
      }
    }
    if(MAPCLASS != null) vse1();
    }

  function vse1()
  {
    let bdoone = true;
    let t = displaysked;
    if(t != null)
    {
      let k = t.stop.length;
 //     report("vse stop.length = " + k);
      let i = 0;
      let b = true;
      let lasttg = 0;
      while(b && (i < k))
      {
        let tp = t.stop[i];
        let tarr = tp.sch_arr_dt;
        if(tarr == -1 && (typeof tp.pred_arr_dt !== 'undefined')) tarr = tp.pred_arr_dt;
        let tdep = tp.sch_dep_dt;
        if(tdep == -1 && (typeof tp.pred_dep_dt !== 'undefined')) tdep = tp.pred_dep_dt;
        let tmadj = isAdjusted(t.trip_id);
        if(tmadj != null)
        {
  //       report("vse1 tmadj = " + tmadj + " tdep = " + tdep);
         if(tdep > 0) tdep = Number(tdep) + Number(tmadj);
         else tdep = -Number(tdep) + Number(tmadj - 45);
        }
        
        if(!isNaN(tp.pre_dt))
        {
          tarr = tp.pre_dt;
          tdep = tarr;
        }
        let tg = null;
        if(tdep === undefined) tg = tarr;
        else tg = tdep;
      
        let tt = getTTime();
//        report("tt = " + tt + ", tg = " + tg);
        if(tt < tg)
        {
          let stp0 = null;
          let stp1 = null;
          b = false;
          if(i == 0)
          {
            stp0 = tp;
            stp1 = stp0;
          }
          else
          {
            stp0 = tp;
            stp1 = t.stop[i-1];
          }
//          report("vse1 " + tt + " " + lasttg + " " + tg);
          {
            let pc = (tt - lasttg) / (tg - lasttg);
            let SegLength = 0;
            if(ShapeData.length > 9) SegLength = ShapeData[9];
//            report("pc1 = " + pc);
            let bg = true;
        
            let ptto = getPositionForId(stp0.stop_id);
            let ptfrom = getPositionForId(stp1.stop_id); 
 
            if((TripLength > 0) && (ShapeData.length > 9) && (lasttg != 0))
            {
              let sindex = getIndexForPoint(ptfrom, .1);
              let dindex = getIndexForPoint(ptto, .1);
              let l1 = Number(ShapeData[sindex + 4]);
              let l2 = Number(ShapeData[dindex + 4]);
              let de = l1 + (l2 - l1) * pc;
 //             report("l1 = " + l1 + " l2 = " + l2 + " de = " + de);
              
              let i8 = 4;
              while(bg && (i8 < ShapeData.length))
              {
 //               report("  " + de + " " + ShapeData[i8]);
                if((de <= ShapeData[i8]) && (i8 > 8))
                {
                  bg = false;
                  ptfrom = new PointI(ShapeData[i8 - 8], ShapeData[i8 - 7]);
                  ptto = new PointI(ShapeData[i8 - 3], ShapeData[i8 - 2]);
                  pc = (de - ShapeData[i8 - 5]) / (ShapeData[i8] - ShapeData[i8 - 5]);
//                  report("pc2 = " + pc + " i8 = " + i8);
                }
                i8 += 5;
              }
              
            }
            /*
            if(bg)
            {
              pt1 = getPositionForId(stp0.stop_id);
              pt2 = getPositionForId(stp1.stop_id);
            }
            */
            let pt3 = new PointI((ptto.x * pc + ptfrom.x * (1-pc)), (ptto.y * pc + ptfrom.y * (1-pc)));
            //           report(pc + " " + pt1.x + " " + pt1.y + " " + pt2.x + " " + pt2.y);
            let lat = pt3.x.toString();
            let lon = pt3.y.toString();
            
            let blf = false;
            if((t.vehicle_latitude != null) && (t.vehicle_longitude != null))
            {
//              report("t.vehicle_latitude = " +  t.vehicle_latitude + ", t.vehicle_longitude = " + t.vehicle_longitude);
              lat = t.vehicle_latitude.toString();
              lon = t.vehicle_longitude.toString();
              blf = true;
            }
            
            lat = lat.substring(0, lat.indexOf(".") + 5);
            lon = lon.substring(0, lon.indexOf(".") + 5);
            let mp = {lat: lat, lng: lon};
            let x = null;
            let ths = t.stop[k-1].stop_name;
//            if((ths == null) || (ths === undefined)) ths = getHeadsignFromTripId(t.trip_id);
            if((ths == null) || (ths === undefined)) ths = t.trip_headsign;
            let sc = '<div id="content"><a href=\"javascript:mark(\'' + t.trip_id + '\')\">Mark</a><hr>' +
            '<b id="firstHeading" class="firstHeading">to ' + ths + " " + '</b>'+
             '<br>' + t.trip_id + '<br>' +" Next: " + stp0.stop_name;
            if(!blf)
            {
              sc += '<br>schedule estimate</div>';
            }
            else
            {
  //            report(JSON.stringify(t, null, 4));
              if(typeof t.vehicle_label !== 'undefined')
              {
                sc += '<br>veh_label = <a href=\'javascript:showTripSked(\"' + t.vehicle_label + '\", \"' + t.trip_name + '\", \"' + t.route_id + '\", \"' + t.trip_headsign + '\")\'>' + t.vehicle_label + '</a>';
              }
              let y = "";
              if(typeof t.vehicle_stop !== 'undefined') y = getStopNameFromID(t.vehicle_stop);
              let x = "";
              if(typeof t.vehicle_stat !== 'undefined') x = t.vehicle_stat;
              sc += '<br>veh_id = ' + t.vehicle_id + '<br>' + x + ' ' + y + '</div>';
            }

            if((t.trip_id == CurrentTripID) && bMonitorMode && bdoone)
            {
              let stn = t.trip_name;
              if(!isNaN(stn)) stn = fixIdNumber(stn);
              let status = " next scheduled stop ";
              let rt = t.route_id;
            //  if(rt.length < 5) 
              rt = "";
              let sw = "";
              if(document.getElementById("eaudio").checked)
              {
                if(!blf)
                {
                  sw = t.trip_name + " " + rt + " to " + ths + " " + status + " " + fixDest(stp0.stop_name);
                }
                else if(typeof t.vehicle_stat !== 'undefined')
                {
                  status = t.vehicle_stat + " " + getStopNameFromID(t.vehicle_stop);
                  sw = t.trip_name + " " + rt + " to " + ths + " " + status;
                }
                else
                {
                  sw = t.trip_name + " " + rt + " to " + ths;               
                }
//                  report("2642 sw = " + sw);
                  announceMonitor(sw, lat, lon, stp0.stop_id);
                  report("2642 sw = " + sw);
              }
 //                 else
              {
                clearReport();
                report(t.trip_name + " " + rt + " to " + ths + " " + status + " " + stp0.stop_name);
              }
              bdoone = false;
            }
             
             
            if((markedtripid != null) && (t.trip_id == markedtripid))
            {
              x = new MAPCLASS.Marker({
                position:mp,
                map: map,
                title: 'Vehicle',
                icon: 'images/vehp.png'
              });                
            }
            else if(t.trip_id == CurrentTripID)
            {
              x = new MAPCLASS.Marker({
                position:mp,
                map: map,
                title: 'Vehicle',
                icon: 'images/vehr.png'
              });
              VEH_STOP = stp0.stop_id;
              if(document.getElementById("trktp").checked)
              {
                if(bEoMap) map.panTo(mp);
                else
                {
                  map.panTo(new MAPCLASS.LatLng(lat, lon));
                }
              }
            }
           else
            {
              x = new MAPCLASS.Marker({
                position:mp,
                map: map,
                title: 'Vehicle',
                icon: 'images/veh.png'
                });
            }
            x.sc = sc;
            x.trip_id = t.trip_id;
            if((!bEoMap) && (!bOSM)) google.maps.event.addListener(x,'click', function() {
               infow.close();
               infow.setContent(this.sc);
               infow.open(map, this);
               });
            x.setMap(map);
            x.setPosition(new MAPCLASS.LatLng(lat, lon));
            vehs[vehs.length] = x;
           
          }
        }
        lasttg = tg;
        i += 1;
      }
    }
//    else report("vse no displaysked");
    if(bEoMap) setTimeout(repaint, 1000); //repaint();
    if(bOSM) map.repaint(); //setTimeout(map.repaint, 1000); //repaint();
  } // );

//}

function getIndexForPoint(pt, delta)
{
  let k = 5 * Math.floor(ShapeData.length / 5);
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    let d = getDistanceBetween(pt.x, pt.y, ShapeData[i + 1], ShapeData[i + 2]);
    if(d < delta)
    {
      b = false;
    }
    else i += 5;
  }
  return(i);
}

function mark(tid)
{
  markedtripid = tid;
  CloseAlertMenu();
  checktime(updateVehicles);
}

function plotStart()
{
  let pts = [];
  if((Xpos != 0) && (Ypos != 0) && (ctnx != null))
  {
    closePlotPopup();
    if(startroute != null) startroute.setMap(null);
    pts[pts.length] = new MAPCLASS.LatLng(Xpos, Ypos );
    let legs = ctnx.TripOptions[DETAILSINDEX].legs;
    let pt0 = getPositionForId(legs[0].startid);
    pts[pts.length] = new MAPCLASS.LatLng(pt0.x, pt0.y );
    startroute = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#FFCCFF',
          strokeOpacity: 1.0,
          strokeWeight: 5
        });
    startroute.setMap(map);
 
  }
  else closePlotPopup();
}

function plotConnections(m)
{
  Mm = m;
  clearPlot();
  if(bpt1 && !bGMapLoaded)
  {
    bpt1 = false;
    selectFromMap();
    setTimeout(plotConnections, 10000);
  }
  else plotConnections2();
}

function plotConnections2()
{
  let b= document.getElementById("KMap").style.visibility.toString();
  if(b == "visible") ;
  else selectFromMap();
  if(map != null)
  {
  let legs = null;
  let kk = 0;
  let ii = 0;
  let pts = [];
  if(ctnx!= null)
  {
  if((bEoMap) || (bOSM)) clearPlot();
  if(conxroute != null) conxroute.setMap(null);
  if(typeof ctnx.TripOptions[DETAILSINDEX] === 'undefined')
  {
//    report("ctnx.TripOptions[" + DETAILSINDEX + "] is undefined");
  }
  else
  {
    legs = ctnx.TripOptions[DETAILSINDEX].legs;
    kk = legs.length;
  }
  let bFail = false;
  if((map != null) && (kk > 0))
  {
    let pt0 = getPositionForId(legs[0].startid);
    map.panTo(new MAPCLASS.LatLng(pt0.x, pt0.y));
    while(ii < kk)
    {
      let pt1 = getPositionForId(legs[ii].startid);
      if((pt1 == null) && (legs[ii].startid.indexOf("place-") == 0)) pt1 = getPositionForParent(legs[ii].startid);
      let pt2 = getPositionForId(legs[ii].destid);
      if((pt2 == null) && (legs[ii].destid.indexOf("place-") == 0)) pt2 = getPositionForParent(legs[ii].destid);
      if(pt2 == null) report("getPositionForId null for " + legs[ii].destid);
      let d = getDistanceBetween(pt1.x, pt1.y, pt2.x, pt2.y);
      pts[pts.length] = new MAPCLASS.LatLng(pt1.x, pt1.y );
      pts[pts.length] = new MAPCLASS.LatLng(pt2.x, pt2.y );
      if(bEoMap)
      {
        if(ii == 0) 
        {
           let st = new map.DText(getStopNameFromID(legs[0].startid), pt1, "10px", "lightblue");
           st.setMap(map);
        }
        let st = new map.DText(getStopNameFromID(legs[ii].destid), pt2, "10px", "lightblue");
        st.setMap(map);
      }
      ii += 1;
    }
    conxroute = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#FFFF00',
          strokeOpacity: 1.0,
          strokeWeight: 5
        });
    conxroute.setMap(map);
    if(Mm == 0) 
    {
      if(bEoMap) document.getElementById("EoMapMenu").style.visibility = "visible";
      if(document.getElementById("KMap").style.visibility != "visible") menu("KMap");
    }
    if(bOSM) map.repaint();
  }
  }
  else closePlotPopup();
  }
}

function clearPlot()
{
  if(busroute != null) busroute.setMap(null);
  if(triproute != null) triproute.setMap(null);
  if(conxroute != null) conxroute.setMap(null);
  if(startroute != null) startroute.setMap(null);
  clearVehicles();
  closePlotPopup();
  if(map != null)
  {
    if(bEoMap)
    {
      map.clearAll();
      map.addBackground();
    }
    else if(bOSM)
    {
      map.clearAll();
    }
  }
}

function clearVehicles()
{
  clearArray(lastvehs);
  lastvehs = vehs.concat();
  if(vehs.length > 0)
  {
    let k = vehs.length;
    let i = k - 1;
    while(i >= 0)
    {
      vehs[i].setMap(null);
      i -= 1;
    }
    clearArray(vehs);
  }
  
}

function closeWelcome()
{
  closeMenuById("Welcome");
  bWelcomeClosed = true;
  if(navigator.cookieEnabled) localStorage.setItem("WelcomeOK", true);
  bWelcome3Closed = true;
  getLocation();
//  menu("Welcome3");
}

function closeWelcome3()
{
  closeMenuById("Welcome3");
  bWelcome3Closed = true;
  getLocation();
}

function getNearest()
{
  CloseMenu();
  estNearest();
}

function getCurrentPlaceId()
{
  return(Place_id);
}

function setPlaceId(stopid)
{
  if(PlacePointer != (PlaceIds.length - 1))
  {
    let n = PlaceIds.length - 1 - PlacePointer;
    PlaceIds.splice(PlacePointer +1, n);
  }
  Place_id = stopid;
  checkLoadable(stopid);
  Place = getStopNameFromID(stopid);
  TZPlace = TZPlace2;
  if(PlaceIds.length == 0) PlaceIds.push(stopid);
  else if(stopid != PlaceIds[length - 1]) PlaceIds.push(stopid);
  PlacePointer = PlaceIds.length - 1;
  SunTimes = getSunTimes();
}

function setHere(hereid)
{
  setPreferredId(hereid);
  Here = hereid;
}

function setPreferredId(hereid)
{
  let hp = getParentIdFromId(hereid);
  if((hp != null) && (hp != ""))
  {
    PrimaryStops[hp] = hereid;
//    report("set PrimaryStop for " + hp + " is " + hereid);
  }
}

function getPreferredId(hereid)
{
  let x = hereid;
  let np = getParentIdFromId(hereid);
  if((np != null) && (np != ""))
  {
    let ph = PrimaryStops[np];
//    report("PrimaryStop for " +np + " is " + ph);
    if(typeof ph !==  'undefined') x = ph;
  }
  return(x);
}

function stopsBack()
{
  if(PlacePointer > 0)
  {
    PlacePointer -= 1;
    setPlaceId(PlaceIds[PlacePointer]);
    CloseMenu();
    updateDisplay();
  }
  else CloseMenu();
}

function stopsForward()
{
  if(PlacePointer < (PlaceIds.length -1))
  {
    PlacePointer += 1;
    setPlaceId(PlaceIds[PlacePointer]);
    CloseMenu();
    updateDisplay();
  }
  else CloseMenu();
}

const nda = ["T_BNT-0000", "T_NEC-2287", "AMSNYP", "ME_CUS", "MDC9492", "AMSLAX", "AMSSFC","AMSSEA","AMSPDX", "AMSFTW","AMSNOL","AMSOMA","AMSKCY","AMSSLC","AMSSTL","AMSMSP","AMSFAR","AMSESM","VIA119","VIA226",
"VIA8","AMSMKE", "AMSMIA"];


function getEpicenter()
{
  let s = nda[0];
  let mind = getDistanceFromIdToHere(nda[0]);
  
  let k = nda.length;
  let i = 1;
  while((mind > 100) && (i < k))
  {
    let d = getDistanceFromIdToHere(nda[i]);
    if(d < mind)
    {
      mind = d;
      s = nda[i];
    }
    i += 1;
  }
  i = 0;
  k = stops_AM.length;
  while((mind > 100) && (i < k))
  {
    let d = getDistanceFromIdToHere(stops_AM[i]);
    if(d < mind)
    {
      mind = d;
      s = stops_AM[i];
    }
    i += 12;
  }
  localStorage.setItem("Trains_epicenter", s);
  return(s);
}
  
function estNearest()
{
  let s = getNearestStation(Xpos, Ypos);
//  report("estNearest " + s + " " + gnsd + " " + Place);
  if(gnsd < 1)
  {
    setHere(s);
    Xplace = 0;
  }
  else if((s != "") &&(gnsd < 100)) //if(gnsd < 10)
  {
    let x = Math.round(10 * gnsd) / 10;
    {
      setHere(s);
      Xplace = 5;
    }
  }
  else
  {
    s = getEpicenter();
  }   
  setPlaceId(s);
  qupdateDisplay();
  return(s);
}


function placeOptions()
{
if(DISPLAYTYPE == 0) 
{  
  TRIP_STARTTIME = null;
  if(stps.length > 1)
  {
    let k = stps.length;
    let i = 0;
    let s = "";
    for(i = 0; i<k; i++)
    {
      if((stps[i].indexOf("North Station-") != 0) && (stps[i].indexOf("South Station-") != 0) && (stps[i].indexOf("Back Bay-") != 0))
      s += "<a href=\"javascript:selSubStop(" + i + ")\">" + getDescriptionForStop(stps[i]) + "</a><br>";
    }
    document.getElementById("glist").innerHTML = s;
    let d = document.getElementById("groutes");
    let j = d.children.length - 1;
    while( j >= 0)
    {
      d.remove(j);
      j -= 1;
    } 
    s = getRoutesS(Place_id);
//    report("s = " + s);
    let bv = (s.indexOf(",Y") != -1) || (s.indexOf("PV") != -1) || (s.indexOf("RIPT") != -1) || (s.indexOf("CTAB") != -1);
    if(bv)
    {
      let a = s.split(",");
      k = a.length;
      if(k > BUSLOADMAX)
      {
        for(i=0; i<k; i++)
        {
          let op = document.createElement("option");  
          if(a[i].indexOf("Y") == 0) op.text = "NJ Bus " + a[i].substring(1);
          else if(a[i].indexOf("PV") == 0) op.text = "PVRTA Bus " + a[i].substring(3);
          else if(a[i].indexOf("RIPT") == 0) op.text = "RIPTA Bus " + a[i].substring(4);
          else if(a[i].indexOf("CTAB") == 0) op.text = "CTA Bus " + a[i].substring(4);
          else op.text = "";
          op.value = a[i];
          d.add(op);
        }
    
      }
      else
      {
      
      }
    }
    menu("SubStationPopup");
  }
  else
  {
  updateStopList();
  menu("PlaceSelect");
  }
}
else{
//  bUseSked = false;
  bForceSked = false;
  DISPLAYTYPE = 0;
  qupdateDisplay();
  }
}

function selectFromAll()
{
  CloseMenu();
  updateStopList();
  menu("PlaceSelect");
}

function loadRoute()
{
  let d = document.getElementById("groutes");
  let tr = serviceE.getRouteS(d.value);
  if((typeof tr.fetched === 'undefined') || ( tr.fetched == false))
  {
    let dt = new Date();
    let ddf = getCDateFromDate(dt);
    makeTripsForRoute(tr, ddf); 
    CloseMenu();
  }
}

function NotifyObject(t, d)
{
  this.t = t;
  this.d = d;
  this.pending = true;
}

function updateNotifications()
{
  let tn = Math.round(NOW / 1000);
  if(notif != null) 
  {
    let i = notif.length - 1;
    while(i >= 0)
    {
      if((typeof notif[i] !== 'undefined') && (notif[i].t <= tn) && !notif[i].pending)
      {
        if(i == 0) notif = [];
        else notif.splice(i,1);
      }
      else
      {
        i -= 1;
      }
    }
  }
}

function updateWPM()
{
  let d = "Depart " + Place ;
  if(document.getElementById("dn5").checked)
  {
    d += " 5 min warning";
  }
  else if(document.getElementById("dn30").checked)
  {
     d += " 30 min warning";
  }
  else if(document.getElementById("dn60").checked)
  {
    d += " 1 hour warning";
  }
  document.getElementById("wpm").innerHTML = d;
  return(d);
}

function showDepNotMenu()
{
  if(bNotifySupported)
  {
  let d = updateWPM(); 
  d += " to " + CurrentHeadsign + " at " + CurrentTString;
  document.getElementById("wpm").innerHTML = d;
  document.getElementById("wpl").innerHTML = CurrentTG;
  menu("DepNot");
  }
}

function addDepNot()
{
  let d = updateWPM();
  let tx = 300;
  if(document.getElementById("dn30").checked) tx = 1800;
  else if(document.getElementById("dn60").checked) tx = 3600;
  let t = CurrentTG - tx;
  let x = new NotifyObject(t, d);
  if(notif == null)
  {
    notif = [x];
  }
  else notif.push(x);
  notif.sort(notifCompare);
  localStorage.setItem("NOTIFICATIONS.txt",JSON.stringify(notif));
  CloseMenu();
  if(bNotifySupported)
  {
    Notification.requestPermission().then((r) => {
      report("3866 Notification request Permission = " + r);
    }).catch((e) => {
      report("3868 Notification request Permission error " + e);
    });
  }
}

function delSelNot()
{
  let x = document.getElementById("notifies").selectedIndex;
  if(confirm("Clear Pending Notification?"))
  {
    notif.splice(x,1);
    localStorage.removeItem(localStorage.key(x));
    localStorage.removeItem("NOTIFICATIONS.txt");
    localStorage.setItem("NOTIFICATIONS.txt",JSON.stringify(notif));
  }
  showNotifications();
}

function addTripNotifications()
{
  if((ctnx != null) && (ctnx.TripOptions != null))
  {
    let NTIME = 300;
    let legs = ctnx.TripOptions[DETAILSINDEX].legs;
    let a = [];
    kk = legs.length;
    let ii = 0;
    while (ii < kk)
    {
      let leg = legs[ii];
      let t1 = leg.starttime - NTIME;
      let d = "Depart " + getStopNameFromID(leg.startid) + " 5 min warning";
      let n1 = new NotifyObject(t1, d);
      a.push(n1);
      ii += 1;
       let t2 = leg.desttime - NTIME;
      if(ii != kk)
      {
        d = "Change at " + getStopNameFromID(leg.destid) + " 5 min warning";
      }
      else
      {
        d = "Arrive at " + getStopNameFromID(leg.destid) + " 5 min warning";      
      }
      n1 = new NotifyObject(t2, d);
      a.push(n1);
    }
    let s = "";
    kk = a.length;
    ii = 0;
    for(ii = 0; ii < kk; ii += 1)
    {
      s += getTimeString(a[ii].t) + " " + a[ii].d + "\n";
    }
    if(confirm(s))
    {
      ii = 0;
      for(ii = 0; ii < kk; ii += 1)
      {
        notif.push(a[ii]);
      }
    }
  notif.sort(notifCompare);
  localStorage.setItem("NOTIFICATIONS.txt",JSON.stringify(notif));
  CloseMenu();
  }
}

function clearAllNotifies()
{
  if(confirm("Clear All Pending Notifications?"))
  {
    localStorage.removeItem("NOTIFICATIONS.txt");
    clearArray(notif);
  }
  CloseMenu();
}

function showNotifications()
{
  if(notif != null)
  {
    let k = notif.length;
    let ss = document.getElementById("notifies");
    let j = ss.children.length - 1;
    while( j >= 0)
    {
      ss.remove(j);
      j -= 1;
    } 
    for(let i=0; i<k; i++)
    {
      let op = document.createElement("option");   
      op.text = getTimeString(notif[i].t) + " " + notif[i].d;
      op.value = i;
      ss.add(op);
    }
  }
  menu("Notify");
}

function initializeStopListCategories()
{
  let atx = document.getElementById("atx");
  let j = atx.children.length - 1;
  while( j >= 0)
  {
    atx.remove(j);
    j -= 1;
  } 
  let k = StopListData.length;
  j = 0;
  for(j=0; j<k; j+=3)
  {
    let op = document.createElement("option");   
    op.text = StopListData[j];
    atx.add(op);
  }
}

function updateStopList()
{
  let i = document.getElementById("atx").selectedIndex;
  let ss = document.getElementById("stopsel");
  let j = ss.children.length - 1;
  while( j >= 0)
  {
    ss.remove(j);
    j -= 1;
  } 
  let p = getStopListNames(i).then(function(t) {
        let k = t.length;
        j = 0;
        for(j=0; j<k; j++)
        {
            let op = document.createElement("option");   
            op.text = t[j];
            ss.add(op);
        }
        }).catch( function(e) {
            report("3875 updateStopList " + e);
        });
}

function selSubStop(n)
{
  CloseMenu();
  setPreferredId(stps[n]);
  setPlaceId(stps[n]);
  SelectedPlace = Place;
  pcolor = "red";
  document.getElementById("pll").style.color = pcolor;
  qupdateDisplay();
}

function selStop()
{
  let pname = "";
  let pid = "";
  let a = null;
  let j = document.getElementById("atx").selectedIndex;
  let i = document.getElementById("stopsel").selectedIndex;
  
  a = getStopList(j);

  if((a != null) && (i != -1))
  {
    pname = a[12 * i + 1];
    pid = a[12 * i];
  
  Xplace = 5;
  if(bFindFrom) 
  {
    setFindFrom(pname, pid);
    menu("Plan");
  }
  else if(bFindTo) 
  {
    setFindTo(pname, pid);
    menu("Plan");
  }
  else
  {
    CloseMenu();
    setPlaceId(pid);
//    report("selStop " + Place + " " + pid );
    SelectedPlace = Place;
    pcolor = "red";
    document.getElementById("pll").style.color = pcolor;
  }
  }
  else 
  {
//    report("3971 selStop i = " + i + " " + a);
    CloseMenu();
  }
  bFindFrom = false;
  bFindTo = false;
  bUseFile = false;
//  bUseSked = false;
  bForceSked = false;
  qupdateDisplay();
}

// when place select changes

function selPlace()
{
  bUseFile = false;
  let i = Xplace; 
  if((i == 0) && (document.getElementById("lse").checked))// here
  {
        let p = getHere();
        p.then(function(data){
        if(data.length > 0)
        {
          report("got here 346 " + Place + " " + data[0].stop_name);
          if(Place_id != data[0].stop_id)
          {
            let y = getPreferredId(data[0].stop_id);
            setPlaceId(y);
            
//            (Place_id);
          }
          qupdateDisplay();
          updatePlaces(data);
        }
        else 
        {
          report("got here 351 data.length == 0");
          setPlaceId(estNearest());
          updateDisplay();
       }
        } ).catch(function(error) {
          report("354" + error);
        } );
  }
  else if(i == 3)
  {
    let s = getLocal("Trains_home_default");
    report("Trains_home_default = " + s);
    if((s == null) || (s == ""))
    {
      report("Home is not set.");
      alert("Home is not set");
    }
    else
    {
      setPlaceId(s);
      pcolor = "red";
      document.getElementById("pll").style.color = pcolor;
      qupdateDisplay();
    }

  }
  else if(i == 4)
  {
    selectFromAll();
  }
  else if(i == 5)
  {
    if(SelectedPlace != "") 
    {
      setPlaceId(getStopIdFromName(SelectedPlace));
      qupdateDisplay();
    }
  }
  else
  {
    let xPlace = Xplaces[i]; 
    setPlaceId(getStopIdFromName(xPlace));
    bUseFile = false;
    vcapt = null;
    if(DISPLAYTYPE == 0) refresh();
    else
    {
      DISPLAYTYPE = 0;
      qupdateDisplay();
    }
  }
}


function selDay()
{
  let i = document.getElementById("day").selectedIndex;
  if(i == 0) setTimeNow();
  else if(i == 1) setTimeMenu();
}

function setTimeNow()
{
timemode = 0;
getCurrentTime();
setTime2();
}

function setTimeMenuData(hrs, min)
{
  if(min.length == 1) min = "0" + min;
  document.getElementById("thr").value = hrs;
  document.getElementById("tmn").value = min;
  document.getElementById("tday").selectedIndex = 0;
}

function clearAdjustedTrips()
{
  CloseMenu();
  clearArray(AdjustedTrips);
  updateDisplay();
}

function clearAdjustedNTrips()
{
  CloseMenu();
  clearArray(AdjustedNTrips);
  updateDisplay();
}

function setDepartureNow()
{
  CloseMenu();
  if(CurrentTrip != null)
  {
//  report("CurrentTrip.rowIndex = " + CurrentTrip.rowIndex + " " + CurrentTrip.pre_dt);
  let tdep = CurrentTrip.pre_dt;
  if(tdep == undefined) tdep = CurrentTrip.sch_dep_dt
  if(tdep == undefined) tdep = 0;
  let tmadj = 0;
  if(tdep < 0) 
  {
    tdep = - tdep;
  //  tmadj = tdep;
  }
  //else 
  tmadj = Math.round(NOW/1000) - tdep;
//  report("b. " + tmadj + " " + Math.round(NOW/1000) + " " + tdep);
//  report(JSON.stringify(CurrentTrip));
//  report("a. " + CurrentTrip.stop[CurrentTrip.rowIndex].sch_dep_dt + " " + CurrentTrip.pre_dt + " " + CurrentTrip.sch_arr_dt);
//  report("setDepartureNow " + Math.round(NOW/1000) + " " + tdep + " " + tmadj + " " +  CurrentTrip.trip_id);
  AdjustedTrips[AdjustedTrips.length] = [CurrentTrip.trip_id, tmadj]; 
  updateDisplay();
  }
}

function adjustDeparture()
{
  menu("Madj");
}

function adjustDeparture1()
{
//  if(DISPLAYTYPE == 0)
  {
  let tmadj = document.getElementById("deptime").value * 60;
  if(CurrentTrip != null)
  {
  if(tmadj == 0)
  {
    deleteAdjustedTrip(CurrentTrip.trip_id);
  }
  else
  {
    AdjustedTrips[AdjustedTrips.length] = [CurrentTrip.trip_id, tmadj];
  }
  }
  }
  CloseMenu();
  updateDisplay();
}

function adjustNDeparture(tnadj)
{
  if(CurrentTrip != null)
  {
    deleteAdjustedTrip(CurrentTrip.trip_id);
    AdjustedNTrips[AdjustedNTrips.length] = [CurrentTrip.trip_id, tnadj];
  }
}

function deleteAdjTrip()
{
  deleteAdjustedTrip(CurrentTrip.trip_id);
  CloseMenu();
  updateDisplay();  
}

function deleteAdjustedTrip(trip_id)
{
  let t = null;
  let i = AdjustedTrips.length -1;
  while(i >= 0)
  {
    if(trip_id == AdjustedTrips[i][0])
    {
      AdjustedTrips.splice(i, 1);
    }
    i -= 1;
  }
}

function deleteAdjustedNTrip(trip_id)
{
  let t = null;
  let i = AdjustedNTrips.length -1;
  while(i >= 0)
  {
    if(trip_id == AdjustedNTrips[i][0])
    {
      AdjustedNTrips.splice(i, 1);
    }
    i -= 1;
  }
} 

function isAdjusted(trip_id)
{
  let b = false;
  let t = null;
  let i = 0;
  let k = AdjustedTrips.length;
  while(!b && (i < k))
  {
    if(trip_id == AdjustedTrips[i][0])
    {
      b = true;
      t = AdjustedTrips[i][1];
    }
    i += 1;
  }
  return(t);
}

function isAdjustedN(trip_id)
{
  let b = false;
  let t = 0;
  let i = 0;
  let k = AdjustedNTrips.length;
  while(!b && (i < k))
  {
    if(trip_id == AdjustedNTrips[i][0])
    {
      b = true;
      t = AdjustedNTrips[i][1];
    }
    i += 1;
  }
  return(t);
}

function getHours()
{
  return(Math.floor(runningtime / 60).toString());
}

function getMinutes()
{
  let x = (runningtime % 60).toString();
  if(x.length == 1) x = "0" + x;
  return(x);
}

function setTimeMenu()
{
  CloseMenu();
  document.getElementById("thr").value = getHours();
  document.getElementById("tmn").value = getMinutes();
  report("setTimeMenu " + getHours() + " " + getMinutes());
  menu("TimeMenu");
}

function setTime()
{
  timemode = 1;
  setTime2();
}

function setTime2()
{
  let dday = document.getElementById("tday").value;
  let dn = document.getElementById("tday").selectedIndex;
  let hrs = Math.floor(Number(document.getElementById("thr").value) + TZD);
  if((hrs >= 0) && (hrs < 24))
  {
    let min = Math.floor(Number(document.getElementById("tmn").value));
    if((min >= 0) && (min < 60))
    {
      runningtime = 60 * hrs + min;
      min = min.toString();
      if(min.length == 1) min = "0" + min;
      let b = false;
      if(!document.getElementById("t24cb").checked)
      {  
        if(hrs > 11) b = true;
        if(hrs > 12) hrs -= 12;
        if(hrs.toString() == "0") hrs = "12";
      }
      else if(hrs.toString() == "0") hrs = "00"
      timestring = hrs + ":" + min;
      if(b) timestring += " <span style='font-size:12pt'>PM</span>";
    }
  }
  updateTimeDisplay();
  CloseMenu();
}

// returns seconds
function getTTime2()
{
  return(Math.floor(NOW / 1000));
}

// getTTime returns seconds
function getTTime()
{
  let dday = document.getElementById("tday").value;
  let dn = document.getElementById("tday").selectedIndex;
  let datetime = null;
  let hrs = Math.floor(Number(document.getElementById("thr").value));
  if((hrs >= 0) && (hrs < 24))
  {
    let min = Math.floor(Number(document.getElementById("tmn").value));
    if((min >= 0) && (min < 60))
    {
        let d = new Date(NOW);
        let day = d.getDay();
        datetime = d.getTime();
        if(dn > 0)
        {
            let e = dn -1  - day;
            if(e < 0) e += 7;
            let ft = e * 86400000;
            datetime += ft;
            let dd = new Date(datetime);
            d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate(), hrs, min, 0, 0);
            datetime = d.getTime();
        }
        else
        {
            d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hrs, min, 0, 0);
            datetime = d.getTime();
        }
        datetime = Math.floor(datetime /= 1000);
    }
  }
  return(datetime);
}

function refreshTime()
{
  if(!document.getElementById("lse").checked)
  {
    bGeo = false;
  
    if(wpid != null)
    {
      navigator.geolocation.clearWatch(wpid);
      wpid = null;
    }
  }
  bUT = false; // was true;
  let hrs = 0;
  let min = 0;
  let b = false;
  hrs = getHours(); // - TZD;
//  report("4339 hrs = " + hrs + " " + TZD);
  let xhrs = hrs;
  if(hrs >= 24) hrs -= 24;
  if(!document.getElementById("t24cb").checked)
  {
        if(hrs > 11) b = true;
        if(hrs > 12) hrs -= 12;
        if((xhrs == 0) || (xhrs == 24)) hrs = "12";
  }
  else if(hrs.toString() == "0") hrs = "00";
  min = getMinutes();
  timestring = hrs + ":" + min;
  if((xhrs == 0) || (xhrs == 24)) ;
  else if(b) timestring += " <span style='font-size:12pt'>PM</span>";
  CurrentTime = hrs.toString() + min.toString();
  if(!bonce) qupdateDisplay();
}

let NotText = "";

function initTime()
{
  let dt = new Date();
  TZPlatform = dt.getTimezoneOffset();
}

function getCurrentTime()
{
  let t = new Date();
  NOW = t.getTime(); // - TZDMS;
  let hrs = (t.getHours()-TZD).toString();
  let min = t.getMinutes().toString();
  NOWHRS = hrs;
  NOWMIN = min;
  setTimeMenuData(hrs, min);
}

function getNextLocalMidnight()
{
  let d = new Date(NOWDATE);
  d.setHours(0);
  d.setMinutes(0);
  let m = d.getTime() / 1000;
  m += 24 * 60* 60;
  return(m);
}

function updateTimeTick()
{
  bUT = false; // was true;
  let hrs = 0;
  let xhrs = 0;
  let min = 0;
  let b = false;
  let sndhr = 0;
  let sndmin = 0;
  timestring = "";
  let z = getTZPlace(); // minutes
  let bz = (TZPlatform == z);
//  report("4380 " + TZPlatform + " " + z);
  if(!bz)
  {
    TZDMS = (z - TZPlatform) * 60000;
    TZD = Math.round((z - TZPlatform) / 60); // hrs
    timestring += "<span style='color: var(--TZcolor);'>"
  }
  else
  {
    TZDMS = 0;
    TZD = 0;
  }
//  report("4344 TZD = " + TZD);
  SunTimes = getSunTimes();
  if(timemode == 0)
  {
    let t = new Date();
    NOWDATE = t;
    NOW = t.getTime(); // - TZDMS;
    hrs = t.getHours() - TZD;
 //   report("4397 hrs = " + hrs + " TZD = " + TZD);
    xhrs = hrs;
    min = t.getMinutes();
    runningtime = 60 * hrs + min;
    if(!document.getElementById("t24cb").checked)
    {
        if(hrs > 11) b = true;
        if(hrs >= 24) {hrs -= 24; b = false;}
        if(hrs > 12) hrs -= 12;
        if((xhrs == 0) || (xhrs == 24)) hrs = "12";
    }
    hrs = hrs.toString();
    min = min.toString();
    if(min.length == 1) 
    {
      if(min == "0") sndmin = " oh clock";
      else sndmin = " oh " + min;
      min = "0" + min;
    }
    else sndmin = min;
    if(ahr != hrs)
    {
      ahr = hrs;

      checkAlerts(true);
    }
  }
  else
  {
    runningtime += 1;
    hrs = getHours();
    xhrs = hrs;
    min = getMinutes();
//    report("hrs = " + hrs + ", min = " + min + ", timemode = " + timemode);
    if(!document.getElementById("t24cb").checked)
    {
        if(hrs > 11) b = true;
        if(hrs > 12) hrs -= 12;
        if(hrs > 24) {hrs -= 24; b = false;}
        if((xhrs == 0) || (xhrs == 24)) hrs = "12";
    }
    else if(hrs.toString() == "0") hrs = "00";
    
    min = min.toString();
    if(min.length == 1) 
    {
      if(min == "0") sndmin = " oh clock";
      else sndmin = " oh " + min;
      min = "0" + min;
    }
    else sndmin = min;

  }

  timestring += hrs + ":" + min;
  if(!bz) timestring += "<span style='font-size:10px;'>" + getTZString() + "</span></span>";
  sndtime = hrs + " " + sndmin;
  if((xhrs == 0) || (xhrs == 24)) ;
  else if(b) 
  {
    timestring += " <span style='font-size:12pt'>PM</span>";
    sndtime += " P M"; 
  }
  
  if(SelectedLanguage == 2)
  {
    sndtime = hrs + " heures " + sndmin + " minutes";
    if(b && !document.getElementById("t24cb").checked)
    {
      sndtime += " après-midi";
    }
  }
  if(!bz) sndtime += " " + getTZString();
  document.getElementById("thr").value = xhrs;
  document.getElementById("tmn").value = min;
  CurrentTime = hrs.toString() + min.toString();
  if(((map != null) && (vehs.length > 0) && (document.getElementById("KMap").style.visibility == "visible")) || bMonitorMode) checktime(updateVehicles);
  else if(DISPLAYTYPE == 1) checktime(updateVehicles);
  if((bMonitorMode && !bMonitorLabel) || bSWUpdateFound) checkConnection();
  if(!bonce) qupdateDisplay();
  if((notif != null) && (notif.length > 0))
  {
    let tn = Math.floor(NOW / 1000);
    for(let ii = 0; ii < notif.length; ii += 1)
    {
      if(bNotifySupported && notif[ii].pending && (notif[ii].t <= tn))
      {
        report("notify " + bNotifySupported + " " + tn + " " + notif[ii].t + " " + Notification.permission);
        notif[ii].pending = false;
        if(bNotifySupported)
        {
          let opt = {requireInteraction : true};
          if(Notification.permission === "granted")
          {
            let notification = new Notification(notif[ii].d, opt);
 //           setTimeout(notification.close.bind(notification), 4000);
          }
          else if (Notification.permission !== "denied") 
          {
            NotText = notif[ii].d;
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") 
                  {
                  bNotifyPermission = true;
                  let notification = new Notification(NotText, opt);
                  reportBubble(NotText);
//                  setTimeout(notification.close.bind(notification), 4000);
                  updateNotifications();
                  }
                }).catch(function(e) {
                    report("4614 " + e);
                    });
                
          }
        }
        report("4619 " + notif[ii].d);
        reportBubble(notif[ii].d);
        beep1();
      }
    }
  }
}

function newConnections()
{
}

function addConnections()
{
}

function editConnections()
{
  CloseMenu();
  DISPLAYTYPE = 3;
  updateDisplay();
}

function saveConnections()
{
  CloseMenu();
  if(ctnx != null)
  {
    DISPLAYTYPE = 2;
    saveLocalFile();
  }
  else alert("No connections defined.");
}

let qup = false;
const Trefresh = 5000;
let todisp = null;
let tlastdisp = 0;

function qupdateDisplay()
{
//  checktime3(updateDisplay);
  let tnow = Date.now();
  if(tnow - tlastdisp > Trefresh)
  {
    tlastdisp = tnow;
    qd();
  }
  else if(todisp == null)
  {
    todisp = setTimeout(qd, Trefresh);   
    tlastdisp = tnow;
  }
}

function qd()
{
  todisp = null;
  updateDisplay();
}

let stps = [];

function updateTimeDisplay()
{
  let z = getTZPlace();
  let b = Number(TZPlatform) == Number(z);
  let tdp = document.getElementById("tm").style.color;
  if(b && (timemode == 0)) tdp = "var(--Ccolor)";
  else tdp = "var(--TZcolor)";
  if(b) document.getElementById("tm").innerHTML = "<br>" + timestring ;
  else document.getElementById("tm").innerHTML = "<br>" + timestring + "<span style='font-size:10px;'>" + getTZString() + "</span>" ;
}

function showWchair(n)
{
 let s = WC1;
 if(n == 0) s = WC0;
 else if(n == 2) s = WC2;
 alert(s);
}

function updateFacility(stop_id)
{
  let fac = document.getElementById("plc2");
  fac.innerHTML = "";
  let facel = document.createElement("a");
  facel.href = "javascript:reportFacility(Place_id)";
  fac.appendChild(facel);
  let b = ((PALETTE == 2) || (PALETTE == 3));
  let s3 = "";  
  let facx = getFacilitiesForId(stop_id);
  if(typeof facx === 'undefined') return;
  else facx = facx.toString();
  let iig = facx.indexOf(":");
  wcnote = "";
  if(iig != -1)
  {
    wcnote = facx.substring(iig + 1); 
    facx = facx.substring(0, iig);
  }
  facx = Number(facx);
  stopwch = facx & 3;
  if(stopwch != null)
  {
    s3 = "&nbsp;&nbsp;"
    if(stopwch == "1") 
    {
      if(b) facel.appendChild(wchair2w);
      else facel.appendChild(wchair2);
//    s3 += "<a href='javascript:showWchair(1)'><img alt='Wheelchair accessible.' title='Wheelchair accessible' src ='images/wchair2.png' width='36' height='36'></a>";
    }
    else if(stopwch == "0") 
    {
//      wchairy.alt = 'Wheelchair accessible.';
//      wchairy.title = 'Wheelchair accessible.';
//      facel.appendChild(wchairy);
//    s3 += "<a href='javascript:showWchair(0)'><img alt='Wheelchair accessible.' title='Wheelchair accessible' src ='images/wchairy.png' width='36' height='36'></a>";
    
    }
    else if(stopwch == "2") 
    {
      facel.appendChild(wchairr);
//    s3 += "<a href='javascript:showWchair(2)'><img alt='Wheelchair accessible.' title='Wheelchair accessible' src ='images/wchairr.png' width='36' height='36'></a>";
    }
    else if(stopwch == "3") 
    {
      facel.appendChild(wchairy);
    }
    else 
    {
    s3 = "";
    }
  }
  else s3 = "";
  if(facx & 4)
  {
    if(b) facel.appendChild(Elevw);
    else facel.appendChild(Elev);
//    s3 += "<img alt='Elevator' title='Elevator' src ='images/elev.png'  width='32' height='36'>";
  }
  if(facx & 8)
  {
    if(b) facel.appendChild(escalw);
    else facel.appendChild(escal);
//  s3 += "<img alt='Escalator' title='Escalator' src ='images/escal.png'width='68' height='36' >";
  }
  if(facx & 16)
  {
    park.alt = 'Parking';
    park.title = 'Parking';
    if(b) facel.appendChild(parkw);
    else facel.appendChild(park);
//  s3 += "<img alt='Parking' title='Parking' src ='images/park.png' width='33' height='36'>";
  }
//  if(fac & 2048) s3 += "<img alt='E-Car Charging' title='E-Cae Charging' src ='images/park.png'>";
  if(facx & 32)
  {
    if(b) facel.appendChild(wcw);
    else facel.appendChild(wc);
//  s3 += "<img alt='Restrooms' title='Restrooms' src ='images/wc.png' width='41' height='36'>";
  }
  if(facx & 64)
  {
    if(b) facel.appendChild(vendw);
    else facel.appendChild(vend);
//  s3 += "<img alt='Vending Machines' title='Vending Machines' src ='images/vend.png' width='42' height='36'>";
  }
  if(facx & 128)
  {
    if(b) facel.appendChild(forkw);
    else facel.appendChild(fork);
//  s3 += "<img alt='Food service' title='Food service' src ='images/fork.png' width='38' height='36'>";
  }
  if(facx & 256)
  {
    ticket.alt = 'Tickets';
    ticket.title = 'Tickets';
    facel.appendChild(ticket);
//  s3 += "<img alt='Tickets' title='Tickets' src ='images/ticket.png'>";
  }
  else if(facx & 512)
  {
    ticket.alt = 'Ticket Machines';
    ticket.title = 'Ticket Machine';
    facel.appendChild(ticket);
//  s3 += "<img alt='Ticket Machines' title='Ticket Machine' src ='images/ticket.png' width='50' height='36'>";
  }
//  if(fac & 1024) s3 += "<img alt='Connecting bus' title='Connecting bus' src ='images/elev.png'>";
//  report("4758 facx = " + facx);
  if((facx & C_DIR) || (Place_id.indexOf("NYT") == 0) || ((Place_id.indexOf("T_") == 0) && ! isNaN(Place_id.charAt(2))) || (Place_id.indexOf("WMA") == 0) || (Place_id.indexOf("B_") == 0))
  {
    let faced = document.createElement("a");
    faced.href = "javascript:showPathways(Place_id)";
    fac.appendChild(faced);
 
    if(b) faced.appendChild(dir2img);
    else faced.appendChild(dir1img); 
    
//  s3 += "<img alt='Food service' title='Food service' src ='images/fork.png' width='38' height='36'>";
  }
  if(facx & C_INFO)
  {
    facel.appendChild(info);
//  s3 += "<a href=\"javascript:getInfoA(\'" + stop_id + "\')\"> <img alt='Info' title='Info' src ='images/info.png' width='36' height='36'></a>";
  }
//  factxt = s3 ;
  
 
//  document.getElementById("olf").innerHTML += s3;
}

const C_WCHAIR = 3;
const C_ELEV = 4;
const C_ESCAL = 8;
const C_PARK = 16;
const C_WC = 32;
const C_VEND = 64;
const C_FOOD = 128;
const C_TICKETS = 256;
const C_TICKET_MACHINES = 512;
const C_CONNECTING_SERVICE = 1024;
const C_ECAR = 2048;
const C_PICKDROP = 4096
const C_ELSUBPLAT = 8192;
const C_FULLELPLAT = 16384;
const C_PORTBOARDLIFT = 32768;
const C_RAMP = 65536;
const C_BIKE_STG = 131072;
const C_INFO = 262144;
const C_AIR =  524288;
const C_DIR = 1048576;

function reportFacility()
{
  document.getElementById("infowin").innerHTML = showFacilities(Place_id);
  menu("InfoWindow");
}

function showFacilities(stop_id)
{
//  let pid = getParentIdFromId(stop_id);
  let c = "<br>"
  let s3 = "Information about " + getStopNameFromID(stop_id) + "<hr>" ; 
  let s = getInfo(stop_id);
  if(typeof s !== 'undefined') s3 += s + c;
  let fac = getFacilitiesForId(stop_id);
  if(stopwch == null) stopwch = fac & 3;
  if(stopwch != null)
  {
    if(stopwch == "1") s3 += WC1 + c;
    else if(stopwch == "0") s3 += WC0 + c;
    else if(stopwch == "2") s3 += WC2 + c;
  }
  if(fac & C_ELEV) s3 += "Elevators available" + c;
  if(fac & C_ESCAL) s3 += "Escalators available." + c;
  if(fac & C_ELSUBPLAT) s3 += "Elevated sub-platform" + c;
  if(fac & C_FULLELPLAT) s3 += "Full elevated plarform" + c;
  if(fac & C_PORTBOARDLIFT) s3 += "Portable boardlift" + c;
  if(fac & C_RAMP) s3 += "Ramp" + "\n";
  
  s3 += c;
  if(fac & C_PICKDROP) s3 += "Pickup / Dropoff" + c;
  if(fac & C_PARK) s3 += "Parking Area" + c;
  if(fac & C_ECAR) s3 += "Electric car chargers" + c;
  if(fac & C_BIKE_STG) s3 += "Bike Storage" + c;
  
  s3 += c;
  if(fac & C_TICKETS) s3 += "Ticket booth" + c;
  if(fac & C_TICKET_MACHINES) s3 += "Ticket machines" + c;
  if(fac & C_FOOD) s3 += "Food service" + c;
  if(fac & C_VEND) s3 += "Vending machines" + c;
  if(fac & C_WC) s3 += "Restrooms" + c;
  s3 += "<hr><a href='javascript:CloseMenu()'>Close</a>";
  return(s3);
}

function getTimeStringX(tg, b24)
{
      let tgd = new Date(Number(tg * 1000));
      let mm = tgd.getMinutes();
      if(mm < 10) mm = "0" + mm;
      let hh = tgd.getHours();
      let hm = hh % 24;
      let b = false;
      let nxday = 0;
      while((hh - nxday * 24) > 23)
      {
        nxday += 1;
      }
      if(b24)
      {
        if(hm > 11) b = true;
        if(hm > 12) hm -= 12;
        if(hm.toString() == "0") hm = "12";
      }
      else if(hm.toString() == "0") hh = "00";
      bhy = false;
      if(isNaN(hm)) {hm = "-"; bhy = true;}
      if(isNaN(mm)) {mm = "-"; bhy = true;}
      
      let s = hm + ":" + mm;
//      if(b) {s += " PM"; bPM = true;}
      if(b) {s += " PM";}
     if(nxday > 0) s += " Day +1";
      return(s);
}

function updateDisplay()
{
  if(!bUD)
  {
    setTimeout(doUpdate, 500);
    bUD = true;
  }
}

function doUpdate()
{
  let p = updateDisplay1().then(function(d){}); //.catch(function(e){console.log("4850 " + e); console.trace();});
}

function updateDisplay1()
{
  let tzp = getTZPlace();
  if((tzp != lastTZPlace) && (timemode == 0)) updateTimeTick();
  lastTZPlace = tzp;
  bGreenFilter = document.getElementById("glf").checked;
  let s1 = "";
  let s2 = "";
  let tdp = document.getElementById("tm").style.color;
  let b = Number(TZPlatform) == Number(tzp);
  if(b && (timemode == 0)) tdp = "var(--Ccolor)";
  else tdp = "var(--TZcolor)"; 
  document.getElementById("tm").innerHTML = "<br>" + timestring;
  clearArray(stps);
  stps = getStopIdsFromId(Place_id);
  let stp = stps[0];
//  report("4164  " + Place_id + " " + stps[0] + " " + stps.length + " " + stps );
  DistanceToId = getDistanceFromIdToHere(stp);
  let d = DistanceToId + " mi";
  let brg = "";
  if((Xpos != 0) && (Ypos != 0))
  {
    let ptb = getPositionForId(stp);
    if(ptb == null) report("4745 no position for " + stp);
    else
    {
      Bearing = getBearing(Xpos, Ypos, ptb.x, ptb.y);
      brg = " " + Bearing + " deg";
      d += brg;
      let im1 = document.getElementById("needle1");
      im1.style.transform = "rotate(" + Bearing + "deg)";
    }
  } 
//  ADIST = d;
  if(SunTimes != null)
  {
    d += " Sunrise: " + SunTimes.sunriseS + " Sunset: " + SunTimes.sunsetS;   
  }
  let tdx = document.getElementById("plc").style.color = "var(--Ccolor)";
  if(pcolor != "red") pcolor = "var(--Ccolor)";
  if(vcapt != null) d += vcapt;
  if((Xpos == 0) && (Ypos == 0)) s2 = "</a><br>";
  else s2 = "</a><span style='font-size: 8pt;margin-top:0;'><br>" + d + "</span>";
  let pln = getStopNameFromID(Place_id);
  let plm = getDescriptionForStop(Place_id);
  s1 ="<a href='javascript:placeOptions()' id='pll' style=\'color:" + pcolor + "\' accesskey='p' title='Click for Change Stop Menu'><div class='tt'><span class='ttt'>p</span></div>";
  
  let s3 = "" //"<img style='vertical-align:middle' title='Change Stop' alt='Click to change' id='sc6' width='52' height='38'>";
  
  if(stps.length > 1) s2 = "*" + s3 + s2;
  else s2 = s3 + s2;
  //report("stps.length = " + stps.length);

  document.getElementById("plc").innerHTML = s1 + plm + s2; // + factxt;
   updateFacility(Place_id);
  let s9 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Connections' alt='Show Connections' id='sc0' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'><img style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn3' width='30' height='30'>&nbsp;";
  let s10 = "<a href='javascript:showDetails(DETAILSINDEX)'><img style='vertical-align:middle' title='Connections' alt='Show Details' id='sc2' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'><img style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn2' width='30' height='30'>&nbsp;";
  if(DISPLAYTYPE == 0)
  {
    if((bGetRefresh) || (bGetRefresh2))
    {
      displaystop = "";
      displayid = "";
    }
    /*
    s1 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Show Last Connections' alt='Show Connections' id='sc1' src='images/barrow.png' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'> <img  style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn1' src='images/q2.png' width='30' height='30'>&nbsp;</a><span style='color: var(--Btext)'><a href=\"javascript:menu('SkedPop')\"style='color: var(--Btext)' accesskey='t' title='Timetable Menu'><div class='tt'><span class='ttt'>t</span></div>";
    s2 = "</a><a href=\"javascript:viewTrainBoard1()\">";
    s2 += "&nbsp;<img id='rf1' src='images/refresh.png' width='30' height='22' alt='refresh' title='Refresh'></a></span>";
    */
    s1 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Show Last Connections' alt='Show Connections' id='sc1' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'> <img  style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn1'  width='30' height='30'>&nbsp;</a><span style='color: var(--Btext)'><a href=\"javascript:menu('SkedPop')\"style='color: var(--Btext)' accesskey='t' title='Timetable Menu'><div class='tt'><span class='ttt'>t</span></div>";
    s2 = "</a><a href=\"javascript:viewTrainBoard1()\">";
    s2 += "&nbsp;<img id='rf1'  width='30' height='22' alt='refresh' title='Refresh'></a></span>";

    document.getElementById("cap").innerHTML = s1 + getPhrase("EOP109") + s2;
    document.getElementById("sc1").src = barrow.src;
    document.getElementById("wn1").src = questmark.src;
    document.getElementById("rf1").src = refresharrow.src;
//    document.getElementById("sc6").src = barrow.src;
   
    vcapt = null;
  }
  else if(DISPLAYTYPE == 1)
  {
    let s3 = "";
    if((CurrentTripRouteID != null) && (CurrentTripID != null))
    {
      s3 = getOccImg(CurrentTripRouteID, CurrentTripID, 1);
      if((s3 == null) || (s3 == "null")) s3 = "";
    }
    s1 = "<span style=\'color: var(--Btext)\'><a href=\"javascript:menu(\'TripPopup\')\" accesskey='u' style=\'color: var(--Btext)\' title='Trip Menu'><div class='tt'><span class='ttt'>t</span></div>";
    s2 = "</a><a href=\"javascript:updateTripView()\"><img id='rf2' width='30' height='22' alt='refresh' title='Refresh'></a></span>";
    document.getElementById("cap").innerHTML = s10 + s1 + capt + s3 + s2;
    document.getElementById("sc2").src = barrow.src;
    document.getElementById("wn2").src = questmark.src;
    document.getElementById("rf2").src = refresharrow.src;
  }
  else if(DISPLAYTYPE == 2)
  {
    let s11 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Show Last Connections' alt='Show Connections' id='sc12' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'> <img  style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn12'  width='30' height='30'>&nbsp;</a><span style='color: var(--Btext)'><a href=\"javascript:menu('SkedPop')\"style='color: var(--Btext)' accesskey='t' title='Timetable Menu'><div class='tt'><span class='ttt'>t</span></div>";
    s1 = "<span style='color: var(--Btext)'>";
    s2 = "</span>";
    document.getElementById("cap").innerHTML = s11 + s1 + getPhrase("EOP110") + s2;
    document.getElementById("sc12").src = barrow.src;
    document.getElementById("wn12").src = questmark.src;
    vcapt = null;
  }
  else if(DISPLAYTYPE == 3)
  {
    s1 = "<span style='color: var(--Btext)'><a href='javascript:menu(\"ConnectionsDetails\")' accesskey='d' style=\'color: var(--Btext)\' title='Connections Details Menu'><div class='tt'><span class='ttt'>t</span></div>";
    s2 = "</a></span>"
    document.getElementById("cap").innerHTML = s9 + s1 + getPhrase("EOP111") + s2;
    document.getElementById("sc0").src = barrow.src;
    document.getElementById("wn3").src = questmark.src;
    vcapt = null;
  }
  else if(DISPLAYTYPE == 4)
  {
//    s1 = "<span style=\'color: var(--Btext)\'><a href='javascript:showBus()' id='sb' accesskey='b' style= 'color: var(--Btext)'><div class='tt'><span class='ttt'>t</span></div>"
    s1 = "<span style=\'color: var(--Btext)\'><a href='javascript:showBus()' id='sb' accesskey='b' style= \'color: " + qcolor + "\'><div class='tt'><span class='ttt'>t</span></div>"
//    s2 = "</a></span>"
    s2 = "</a><a href=\"javascript:qupdateDisplay()\">";
    s2 += "&nbsp;<img id='rf4' width='30' height='22' alt='refresh' title='Refresh'></a></span>";
    let bn = BusNum;
    if(bn.indexOf("Y") == 0) bn = "NJT " + BusNum.substring(1);
    document.getElementById("cap").innerHTML = s1 + "Bus " + bn + " " + BusDesc + s2;
    document.getElementById("rf4").src = refresharrow.src;
    vcapt = null;
  }
  else if(DISPLAYTYPE == 5)
  {
    s1 = "<span style=\'color: var(--Btext)'\'>"; //<a href='javascript:showBus()' id='sb' accesskey='t'><div class='tt'><span class='ttt'>t</span></div>"
    s2 = "<a href=\"javascript:whatsNearby()\" style=\'color: var(--Btext)\'><img id='rf5' alt='refresh' width='30' height='22'  title='Refresh'></a></span> "; //</a></span>"
    document.getElementById("cap").innerHTML = s1 + getPhrase("EOP112") + s2;
    document.getElementById("rf5").src = refresharrow.src;
    vcapt = null;
  }
  else if(DISPLAYTYPE == 6)
  {
//    let s13 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Show Last Connections' alt='Show Connections' id='sc16' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'> <img  style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn16'  width='30' height='30'>&nbsp;</a><span style='color: var(--Btext)'><a href=\"javascript:menu('SkedPop')\"style='color: var(--Btext)' accesskey='t' title='Timetable Menu'><div class='tt'><span class='ttt'>t</span></div>";
    let s13 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Show Last Connections' alt='Show Connections' id='sc16' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'> <img  style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn16'  width='30' height='30'>&nbsp;</a><span style='color: var(--Btext)'>";
    s1 = "<span style='color: var(--Btext)'>";
    s2 = "</span>";
    document.getElementById("cap").innerHTML = s13 + s1 + getPhrase("EOP114") + s2;
    document.getElementById("sc16").src = barrow.src;
    document.getElementById("wn16").src = questmark.src;
    vcapt = null;
  }
  else if(DISPLAYTYPE == 7)
  {
    let s15 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Show Last Connections' alt='Show Connections' id='sc1' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'> <img  style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn1'  width='30' height='30'>&nbsp;</a><span style='color: var(--Btext)'><a href=\"javascript:menu('Dirs')\"style='color: var(--Btext)'>";
    let s22 = "</a></span>";

//    document.getElementById("cap").innerHTML = s1 + getPhrase("EOP109") + s2;
    document.getElementById("cap").innerHTML = s15 + "Doors" + s22;
    document.getElementById("sc1").src = barrow.src;
    document.getElementById("wn1").src = questmark.src;
   
    vcapt = null;
      
  }
  else if(DISPLAYTYPE == 8)
  {
    let s15 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Show Last Connections' alt='Show Connections' id='sc1' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'> <img  style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn1'  width='30' height='30'>&nbsp;</a><span style='color: var(--Btext)'><a href=\"javascript:menu('Path')\"style='color: var(--Btext)'>";
    let s22 = "</a></span>";

//    document.getElementById("cap").innerHTML = s1 + getPhrase("EOP109") + s2;
    document.getElementById("cap").innerHTML = s15 + "Path" + s22;
    document.getElementById("sc1").src = barrow.src;
    document.getElementById("wn1").src = questmark.src;
   
    vcapt = null;
      
  }
  else if(DISPLAYTYPE == 9)
  {
    let s15 = "<a href='javascript:showConnections()'><img style='vertical-align:middle' title='Show Last Connections' alt='Show Connections' id='sc1' width='52' height='38'></a>&nbsp;<a href='javascript:whatsNearby()'> <img  style='vertical-align:middle' title='Whats Nearby' alt='Whats Nearby' id='wn1'  width='30' height='30'>&nbsp;</a><span style='color: var(--Btext)'><a href=\"javascript:menu('Plat')\"style='color: var(--Btext)'>";
    let s22 = "</a></span>";

//    document.getElementById("cap").innerHTML = s1 + getPhrase("EOP109") + s2;
    document.getElementById("cap").innerHTML = s15 + "Destination Platforms" + s22;
    document.getElementById("sc1").src = barrow.src;
    document.getElementById("wn1").src = questmark.src;
   
    vcapt = null;
      
  }

  if(document.getElementById("eaudio").checked)
  {
    if((alarmtime != 0) && (alarmtime == NOW))
    {
      beep1();
      alarmtime = 0;
    }
    if(herestops != null)
    {
    
    }
  }
//  report("5143 " + Place_id);
  let p = updateDisplayInfo(Place, Place_id);
  bUD = false;
  return(p);
}

function showPathToStop()
{
  CloseMenu();
  if(eopw != null)
  {
    DISPLAYTYPE = 8; 
    qupdateDisplay();
  }
}

function showPathToDoor()
{
  CloseMenu();  
  if(eopw != null)
  {
    DISPLAYTYPE = 8; 
    qupdateDisplay();
  }
}

function showPathToPlat()
{
  CloseMenu();  
  if(eopw != null)
  {
    DISPLAYTYPE = 8; 
    qupdateDisplay();
  }
}

function toDoors()
{
  CloseMenu();
  DISPLAYTYPE = 7;
  qupdateDisplay();
}

function DisplayItem()
{
 this.tgd = 0;
 this.time = "0:0";
 this.delta = "";
 this.text = "";
 this.ccolor = "white";
 this.pcolor = "black";
 this.index = 0;
 this.pred = false;
 this.predtime = "0:0";
 this.predcolor = "black";
 this.delay = 0;
}

function notifCompare(a, b)
{
let x = Number(a.t);
let y = Number(b.t);
//report("  " + x + " " + y);
if(x < y) return(-1);
if(x > y) return(1);
return(0);

}

function tripComparez(a,b)
{
if((a.tgd == null) || (b.tgd == null)) return(0);
let x = a.tgd.getTime();
let y = b.tgd.getTime();
//report("  " + x + " " + y);
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function tripComparez4(a,b)
{
if((a.tg == null) || (b.tg == null)) return(0);
let x = Number(a.tg);
let y = Number(b.tg);
//report("  " + x + " " + y);
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function tripComparez2a(a,b)
{
if((a.stop_seq == null) || (b.stop_seq == null)) return(0);
let x = Number(a.stop_seq);
let y = Number(b.stop_seq);
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function tripComparez2(a,b)
{
let x = 0;
let y = 0;
if(typeof a.stop_sequence != 'undefined')
{
  x = Number(a.stop_sequence);
  y = Number(b.stop_sequence);
}
else if(typeof a.stop_seq != 'undefined')
//if((a.stop_seq == null) || (b.stop_seq == null)) return(0);
{
  x = Number(a.stop_seq);
  y = Number(b.stop_seq);
}
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function tripComparez3(a,b)
{
if((a.stop_sequence == null) || (b.stop_sequence == null)) return(0);
let x = Number(a.stop_sequence);
let y = Number(b.stop_sequence);
/*
if(x < y) return(-1);
if(x > y) return(1);
return(0);
*/
return(x-y);
}

function tripCompareold(a, b)
{
let bx = false;
let x = a.sch_dep_dt;
if((x === undefined) || (x == null) || (x == "null")) x = a.sch_arr_dt;
if((x === undefined) || (x == null) || (x == "null")) x = a.pre_dt;
if((x === undefined) || (x == null) || (x == "null")) bx = true;
let y = b.sch_dep_dt;
if((y === undefined) || (y == null) || (y == "null")) y = b.sch_arr_dt;
if((y === undefined) || (y == null) || (y == "null")) y = b.pre_dt;
if(bx) return(1);
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function tripCompare(a, b)
{
let bx = false;
let x = a.pre_dt;
if((typeof x === 'undefined') || (x == null) || (x == "null")) 
{
  x = a.pred_dep_dt;
  if((typeof x === 'undefined') || (x == null) || (x == "null")) 
  {
    x = a.pred_arr_dt;
    if((typeof x === 'undefined') || (x == null) || (x == "null")) 
    {
//      bx = true;
      x = a.sch_dep_dt;
      if((typeof x === 'undefined') || (x == null) || (x == "null") || (x == "")) 
      {
        x = a.sch_arr_dt;
        if((typeof x === 'undefined') || (x == null) || (x == "null")) 
        {
//          bx = true;
        }
      }
    }
  }
}
let y = b.pre_dt;
if((typeof y === 'undefined') || (y == null) || (y == "null")) 
{
  y = b.pred_dep_dt;
  if((typeof y === 'undefined') || (y == null) || (y == "null")) 
  {
    y = b.pred_arr_dt;
    if((typeof y === 'undefined') || (y == null) || (y == "null")) 
    {
      y = b.sch_dep_dt;
      if((typeof y === 'undefined') || (y == null) || (y == "null") || (y == ""))
      {
        y = b.sch_arr_dt;
//        if((typeof y === 'undefined') || (y == null) || (y == "null"))
      }
    }
  }
}
x = Number(x);
y = Number(y);
if(isNaN(x) || isNaN(y)) bx = true; 
let zq = 0;
if(bx) zq = 1;
else if(x < y) zq = -1;
else if(x > y) zq = 1;
return(zq);
}

function tripCompare2(ar, br)
{
let a = ar.stop[0];
if((typeof a === 'undefined') || (a == null)) return(-1);
let b = br.stop[0];
if((typeof b === 'undefined') || (b == null)) return(-1);
let x = a.sch_dep_dt;
if(typeof x === 'undefined') x = a.sch_arr_dt;
let y = b.sch_dep_dt;
if(typeof y === 'undefined') y = b.sch_arr_dt;
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function tripOptionCompare(a, b)
{
let x = a.legs[0].starttime;
let y = b.legs[0].starttime;
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function clearArray(a)
{
  if(a != null)
  {
    let k = a.length;
    if(k > 0)
    {
      a.splice(0,k);
    }  
  }
}

function TimeObject()
{
  this.s = "";
  this.color = "lightgreen";
  this.tu = 0;
  this.mode = 0;
}

function getTimeObject(date)
{
  let ot = new TimeObject();
  let mm = date.getMinutes();
  if(mm < 10) mm = "0" + mm;
  let hh = date.getHours();
  let hm = hh % 24;
  let b = false;
  let nxday = 0;
  while((hh - nxday * 24) > 23)
  {
    nxday += 1;
  }
  if(!document.getElementById("t24cb").checked)
  {
    if(hm > 11) b = true;
    if(hm > 12) hm -= 12;
    if(hm.toString() == "0") hm = "12";
  }
  else if(hm.toString() == "0") hm = "00";
  let s = hm + ":" + mm;
  ot.hh = hh;
  ot.mm = mm;
  ot.bPM = b;
  if(b) s += " PM";
  if(nxday > 0) s += " Day +1";
  ot.s = s;
  ot.color = "lightgreen";
  let xx = getTTime();
  let tu = date.getTime() - 1000 * xx;
  ot.tu = tu;
//  report("tu = " + tu + ", xx = " + xx + ", t = " + date.getTime());
  if(tu <= 0) 
  {
//          report("  tg = " + tg + " xx = " + xx + " tu = " + tu);
//    ccolor = "lightgrey";
    ot.color = "lightgrey";
    ot.mode = 10;
  }
  else if (tu < 300000) 
  {
    ot.color = "red";
    ot.mode = 20;
    if(bUT) beep();
  }
  if(nxday > 0) 
  {
      ot.color = "#9900cc";
      ot.mode = 40;
      report("5402 nxday = " + nxday);
  }
  return(ot);
}

function refresh()
{
 CloseMenu();
// getLocation();
 let x = getStopNameFromID(Place_id);
 cachecount = MAXCACHECOUNT;
 //deleteFromCache(x);
 displaystop = null;
 //displayj = null;
 bUD = false;
 displayid = null;
 displaysked = null;
 displaytripid = null;
 skedbyroutes = null;
 bUseFile = false;
 BusNum = "";
 pcolor = "red";
// document.getElementById("pll").style.color = pcolor;
 if(bOnLine) bForceSked = false;
 bNetFail = false;
 qupdateDisplay();
}

let laststopid = "";

function isInArray(e, a)
{
  let b = false;
  let k = a.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(e == a[i]) b = true;
    i += 1;
  }
  return(b);
}

function updateCurrentAlerts(t2)
{
  let k2 = t2.length;
  let i2 = 0;
  while(i2 < k2)
  {
    CurrentAlerts.push(new AlertItem(t2[i2].alert_id , t2[i2].effect, t2[i2].header_text, t2[i2].description));    
    i2 += 1;
  }
}

function getAlertDisplayData(aa)
{
  let ah = "";
  let k2 = aa.length;
  let i2 = 0;
  while(i2 < k2)
  {
    let sh = "";
    let sg = "";
    let sd = "";
    if((aa[i2].cause !== undefined) && (aa[i2].cause != "UNKNOWN_CAUSE")) 
    {
      sd = aa[i2].cause + ":  ";
    }
    sd += aa[i2].description;
    if((aa[i2].link !== undefined) && (aa[i2].link != ""))
    {
      sh += "<a href=\"" + aa[i2].link + "\" target='h' style= 'color:var(--Btext)'>";
      sg = "</a>";
    }
    else if((aa[i2].description !== undefined) && (sd != null)) 
    {
      let regex = /"/g;
      sd = sd.replace(regex, '_');
      regex = /'/g;
      sd = sd.replace(regex, '_');
 //     report("sd = " + sd);
      sh += "<a href='javascript:alertw(\"" + sd + "\")' style= 'color:var(--Btext)'>";
      sg = "</a>";
    }
//    CurrentAlerts[CurrentAlerts.length] = new AlertItem(t2[i2].alert_id , t2[i2].effect, t2[i2].header_text, t2[i2].description);
    if(bshowAlerts)
    {           
      ah += "<p>"+ sh + aa[i2].alert_id + "&nbsp;&nbsp;" + aa[i2].effect +"&nbsp;&nbsp;" + aa[i2].header_text + sg +  "</p>";
    }
    i2 += 1;
  }
  return(ah);
}

function getAlertDisplay(t2)
{
  let ah = "<br><br>&nbsp;&nbsp;Click items for more information:<br><fieldset style='background-color:var(--main-background);'>";
  asd = "";
  let k2 = WxAlerts.length;
  let bDet = null;
  let detel = document.getElementById("Wdet");
  if((typeof detel !== 'undefined') && (detel != null))
  {
    bDet = detel.hasAttribute("open");
  }
  if(k2 > 0)
  {
    if(bDet == null)
    {
      if(k2 < 5) ah += "<details open id='Wdet' style='color:var(--Btext);background-color:var(--main-background);'><summary>Weather Alerts (" + k2 + ")</summary>";
      else ah += "<details id='Wdet' style='color:var(--Btext);background-color:var(--main-background);'><summary>Weather Alerts (" + k2 + ")</summary>";
    }
    else if(bDet)
    {
      ah += "<details open id='Wdet' style='color:var(--Btext);background-color:var(--main-background);'><summary>Weather Alerts (" + k2 + ")</summary>";
    }
    else
    {
      ah += "<details id='Wdet' style='color:var(--Btext);background-color:var(--main-background);' ><summary>Weather Alerts (" + k2 + ")</summary>";
    }
    ah += getAlertDisplayData(WxAlerts);
    ah += "</details>";
  }
  k2 = t2.length;
  detel = document.getElementById("Tdet");
  bDet = null;
  if((typeof detel !== 'undefined') && (detel != null))
  {
    bDet = detel.hasAttribute("open");
  }
  if(k2 > 0)
  {
    //if(k2 < 5)
    ah += "<details open id='Tdet' style='color:var(--Btext);background-color:var(--main-background);'><summary>Transit Alerts (" + k2 + ")</summary>";
    //else ah += "<details><summary>Transit Alerts (" + k2 + ")</summary>";
    ah += getAlertDisplayData(t2);
    ah += "</details>";
  }
  ah += "</fieldset>";
/*  
  let i2 = 0;
  while(i2 < k2)
  {
    let sh = "";
    let sg = "";
    let sd = "";
    if((t2[i2].cause !== undefined) && (t2[i2].cause != "UNKNOWN_CAUSE")) 
    {
      sd = t2[i2].cause + ":  ";
    }
    sd += t2[i2].description;
    if(t2[i2].link !== undefined)
    {
      sh += "<a href=\"" + t2[i2].link + "\" target='h' style= 'color:var(--Btext)'>";
      sg = "</a>";
    }
    else if((t2[i2].description !== undefined) && (sd != null)) 
    {
      let regex = /"/g;
      sd = sd.replace(regex, '_');
      regex = /'/g;
      sd = sd.replace(regex, '_');
 //     report("sd = " + sd);
      sh += "<a href='javascript:alertw(\"" + sd + "\")' style= 'color:var(--Btext)'>";
      sg = "</a>";
    }
//    CurrentAlerts[CurrentAlerts.length] = new AlertItem(t2[i2].alert_id , t2[i2].effect, t2[i2].header_text, t2[i2].description);
    if(bshowAlerts)
    {           
      ah += "<p>"+ sh + t2[i2].alert_id + "&nbsp;&nbsp;" + t2[i2].effect +"&nbsp;&nbsp;" + t2[i2].header_text + sg +  "</p>";
    }
    i2 += 1;
  }
*/
  return(ah);
}

function getAlertScroll(t2)
{
  let k2 = t2.length;
  let i2 = 0;
  let d = "";
  while(i2 < k2)
  {
    d += getTextA(t2[i2].effect + ": " + t2[i2].header_text) + "      ";
    i2 += 1;
  }
  d = "<span>" + d + "</span>";
  return(d); 
}

function getTextA(h)
{
   let temp = document.createElement("div");
   temp.innerHTML = h;
   return temp.textContent || temp.innerText || "";
}

function updateDisplayInfo(stop_name, stop_id)
{
let pz = new Promise(function(resolve, reject) {
let trips = [];
let bReport = document.getElementById("rp").checked;
if(((DISPLAYTYPE == 0) || (DISPLAYTYPE == 1)) && (LASTDISPLAYTYPE == DISPLAYTYPE) && (laststopid == stop_id))
{
  let tn = Date.now();
  let tm = tn - DUtime;
  if(tm < 10000)
  {
    return(null);
  }
  DUtime = tn;
}
LASTDISPLAYTYPE = DISPLAYTYPE;

if(DISPLAYTYPE == 0)
{
  ACT_TRIP_STATUS = "";
  ACT_TRIP_STOP = "";
  ACT_TRIP_TSTAMP = 0;
  bACTSTART = false;
  CurrentHeadsign = null;
  
  Ptript = 0;
  Ptripi = null;
  
 // let px = 
//  report("5671 " + stop_id);
  checkLoadable(stop_id);
  
  
//  report("5377 isAssociate(" + stop_id + ") = " + isAssociate(stop_id));
  if(laststopid != stop_id)
  {
   bForceSked = false;
 //  bGreenLineStop = isGreenLine(stop_id);
  }
  if(bFirstTime)
  {
    bFirstTime = false;
//    bForceSked = true;
  }
//  bGreenLineStop = isGreenLine(stop_id);
  let bFilterCR = false;
  laststopid = stop_id;
//  report("updateDisplayInfo " + stop_name + " " + stop_id + " " + displaystop + " bUseFile= " + bUseFile + " bForceSked= " + bForceSked + " bUseSked= " + bUseSked + " bE= " + bE);
  let p = null;
  bgotData = true;
  let usingCache = false;
  bE = false;
  let rid = "";
  let rnm = "";
//  let groutes = getRoutesS(stop_id);

  let xx = null;
  if(stop_name != displaystop)
  {
//      report("5657 " + stop_name + " " + displaystop);
//    bForceSked = false;
  }
  
  if((stop_id == null) || (stop_id == "") || (stop_id == " "))
  {
    p = new Promise(function(resolve, reject) {
      console.trace();
      report("No stop_id for " + stop_name);
      reject("No stop_id for " + stop_name);
    } );    
  }
  else if((stop_id.indexOf("door-") != -1) || (stop_id.indexOf("node-") != -1))
  {
    p = new Promise(function(resolve, reject) {
      report("Not supported stop_id  " + stop_id);
      reject("Not supported stop_id  " + stop_id);
    } );      
  }
  
  else if((((stop_name == displaystop) || (stop_id == displayid)) && (!bForceSked || bUseFile) && !document.getElementById("nch").checked && !bGetRefresh && !bGetRefresh2) && !bFirstD0 || bUseFile)
  {
//   report("5422 updateDisplayInfo use cache " + stop_name + " " + stop_id + " " + displayj.mode.length);
   usingCache = true;
   p = new Promise(function(resolve, reject) {
      if(displayj.mode.length > 0) resolve(displayj);
      else reject("  no cache data");
    } );
  }
  
  
  else if(((xx = getFromCache(stop_id)) != null) && (!bForceSked || bUseFile) && (cachecount < MAXCACHECOUNT) && !bGetRefresh && !bFirstD0)
  {
//   report("5431 using cache for " + stop_name);
   PredictionTime = "";
   let xy = JSON.parse(xx);
   usingCache = true;
   cachecount += 1;
   p = new Promise(function(resolve, reject) {
      if(xy.mode.length > 0) resolve(xy);
      else reject("  no cache data2");
    } );
  }
  else if((stop_id.indexOf("T_") == 0) || (stop_id.indexOf("TB_") == 0)) // MBTA
  {
    bFirstD0 = false;
    bUpdateOnce = true;
    pcolor = "red";
    PredictionTime = "";
    document.getElementById("pll").style.color = pcolor;
//   dreport("updateDisplayInfo get new data " + stop_name + " " + stop_id + " " + bUseSked + " " + bForceSked);
    bUseFile = false;
    cachecount = 0;
    let usid = stop_id;
    let bLit = (stop_id == "T_FR-0301") || (stop_id == "T_NHRML-0127");
    let iq = usid.indexOf("/");
//   if((iq != -1) && (!isNaN(usid.substring(iq+1)))) usid = usid.substring(0,iq);
    let groutes = getRoutesS(stop_id);
    if(groutes.indexOf("G4S") != -1) groutes += ",Green-E";

    if(!bOnLine)
    {
//    report("5570 " + usid + " " + isCarrierLoaded("MBTA"));
      if(isCarrierLoaded("MBTA"))
      {
        let ttime = getTTime();
        p = serviceT.getScheduleByStop(usid, document.getElementById("max_time").value, document.getElementById("max_trips").value, ttime);   
      }
      else
      {
        p = new Promise(function(resolve, reject) {
 //        report("No MBTA schedule loaded. ");
 //        reject("No MBTA schedule loaded. ");
           resolve({});
         });     
      }
    }
    else if(bUseSked || bForceSked || !bOnLine || bUseBuiltIn || bLit) // || !bGreenLineStop)
    {
      let ttime = getTTime();
     report("4495 svc.getScheduleByStop " + usid);
      p = service.getScheduleByStop(usid, document.getElementById("max_time").value, document.getElementById("max_trips").value, ttime);
    }
    else
    {
      let svc = service3;
//     report("4500 svc.getPredictionByStop " + usid);
//     let usid = stop_id;
//     let iq = usid.indexOf("/");
//     if(iq != -1) usid = usid.substring(0,iq);
//     let usidi = -1;
//     if((usidi = getStopsExtensionIndex(stop_id)) != -1)
      if((stop_id == "T_BNT-0000") || (stop_id == "T_NEC-2287") || (stop_id == "T_NEC-2276"))
      {
 //      usid = getParentIdFromId(stop_id);
        bFilterCR = true;
      } 
//     if(isSubwayStop(stop_id)) p = svc.getPredictionByStop2(usid);
//     else 
//     report("5500 "+ usid);
      p = svc.getPredictionByStop(usid);
    }
  }
  else 
      /*if(((isOther(stop_id)  || (isAssociate(stop_id))) && (stop_id != "place-aqucl") && (stop_id != "Boat-Logan")) || (Number(stop_id) > 794900) || (stop_id.indexOf("NYT") == 0) || (Number(stop_id) == 786487) || (Number(stop_id) == 786488))
          */
  {
//    report("5831 " + serviceE);
    if(serviceE != null)
    {
      pcolor = "red";
      document.getElementById("pll").style.color = pcolor;
//      let dnow = NOWDATE; //new Date();
      if(document.getElementById("spp").checked) document.getElementById("sps").checked = true;
      let dtz = new Date(NOW);
      if(timemode == 1) dnow = new Date(getTTime() * 1000);
      let usid = stop_id;
      let iq = usid.indexOf("/");
      if(iq != -1) usid = usid.substring(0,iq);
      iq = usid.indexOf(":");
      if(iq == usid.length - 1) usid = usid.substring(0, usid.length - 1); 
      if(true) //(document.getElementById("mnrp").checked)
      {
//      report("5841 usid = " + usid);
      p = serviceE.getPredictionByStop(usid, document.getElementById("max_time").value, document.getElementById("max_trips").value, dtz); // was dnow
      }
 /*     else
      {
      p = serviceE.getScheduleByStop(usid, document.getElementById("max_time").value, document.getElementById("max_trips").value, dnow);
      }
      */
//      report("got here 324");
    }
    else
    {
      p = new Promise(function(resolve, reject) {
      report("No support for " + stop_name);
      reject("No support for " + stop_name);
      } );
    }     
  }
/*
  else if(service == null)
  {
    clearArray(DT0Alerts);
    bFirstD0 = false;
    p = new Promise(function(resolve, reject) {
      report("No T server ");
      reject("No T server ");
    } );    
  }
//  else  // 
  else 
   {
       report("5804 undecoded stop_id " + stop_id + " "+ ttime);
       p = serviceE.getScheduleByStop(stop_id, document.getElementById("max_time").value, document.getElementById("max_trips").value, ttime);
       console.log("5800 undecoded stop_id " + stop_id);
 //      p = new Promise(function(resolve, reject) {
 //      report("5804 undecoded stop_id " + stop_id);
 //      reject("5805 undecoded stop_id " + stop_id);
 //      });    
   }
   */
   if(p == null) report("5886 " + stop_id);
   p.then(function(t){
//   report("got here 333 " + JSON.stringify(t, null, 4));
    if(typeof t === 'undefined') 
    {
        qupdateDisplay();
        reject();
    }
    bUseBuiltIn = false;
//    if(t == null) return;
    if(t == null) { reject();}
//    pcolor = "white";
//    document.getElementById("pll").style.color = pcolor;
    else
    {
    displaystop = getStopNameFromID(stop_id);
    displayj = t;
    displayid = stop_id;
    CurrentStop = null;
    clearArray(CurrentTrips);
    clearArray(ASND);
    clearArray(CurrentAlerts);
    let t2 = t.mode;
    if(typeof t.mode === 'undefined') 
    {
      bgotData = false;
    }
    else
    {
    if(bOnLine)
    {
      try {
        let z = JSON.stringify(displayj);
        deleteFromCache(stop_id);
        addToCache(stop_id, z);
        }
      catch(e) {
      
      }
    }
    //bForceSked = false;
    if(t.wchair != null) stopwch = t.wchair;
    else stopwch = null;
    updateFacility(stop_id);
    let k2 = t2.length;
    let i2 = 0;
    while(i2 < k2)
    {
      let t3 = t2[i2].route;
      let k3 = t3.length;
      let i3 = 0;
      while(i3 < k3)
      {
        let t4 = t3[i3].direction;
        rid = t3[i3].route_id;
        rnm = t3[i3].route_name;
        let k4 = t4.length;
        let i4 = 0;
        while(i4 < k4)
        {
          let t5 = t4[i4].trip;
          let k5 = t5.length;
          let i5 = 0;
          while(i5 < k5)
          {
            let tx = t5[i5];
            if(tx == null) report("4863 tx is null");
            else
            {
            tx.direction_name = t4[i4].direction_name; 
            tx.route_id = rid;
            tx.route_name = rnm;
            trips.push(tx);
            }
            i5 += 1;
          }
          i4 += 1;
        }
        i3 += 1;
      }
      i2 += 1;
    }
    }
    DT0Stop = stop_id;
    let ah = "";
    abcolor = "lightgrey";
    
    checkAlerts(false);
    t2 = DT0Alerts;
        
    if((WxAlerts.length > 0) || ((t2 != null) && (t2.length > 0))) abcolor = "yellow";
    
    ah = "<button type='button' id='ab' class ='buttonT' onClick='toggleAlerts()' accesskey='w'>Show/Hide Alerts:</button>";
    if(bBtnAdd1) ah += 
    ' <button  id="btnAdd" class ="buttonT" style=" height:25px; background-color:white;visibility:visible;" onClick="addToHome()" title="Add to Home Screen">Add to Home Screen </button>';
    
    
    if(bshowAlerts)
    { 
      ah += getAlertDisplay(t2);
    }
    updateCurrentAlerts(t2);
    
    if(trips.length > 1) trips.sort(tripCompare);
    CurrentTrips = trips;
    let i = 0;
    let k = trips.length;
    if(k == 0) bForceSked = true;
    let sqs = "<table class='datatable'>";
    if(k > 0) bGetRefresh = true;
    else bGetRefresh = false;
    let vehlabels = [];
    
    while(i < k)
    {
      let tp = trips[i];
      if(tp.veh_label != "") vehlabels[vehlabels.length] = tp.veh_label;
      if((typeof tp.status !== 'undefined') && (tp.sch_arr_dt == "null"))
      {
        if(((m = tp.status.indexOf("stop")) != -1) && (tp.sch_arr_dt == "null"))
        {
          let n = Number(tp.status.substring(0, 2));
          if((n == 1) || ((n == 2) && (stop_id != "70205")))
          {
          tp.sch_arr_dt = Math.floor(NOWDATE.getTime() /1000) +  n * 120;
          tp.sch_dep_dt = tp.sch_arr_dt;
          tp.pre_dt = tp.sch_dep_dt;
          }
        }
        else if(((m = tp.status.indexOf("Approaching")) != -1) ||  ((m = tp.status.indexOf("Boarding")) != -1))
        {
          tp.sch_arr_dt = Math.floor(NOWDATE.getTime() /1000) +  60;
          tp.sch_dep_dt = tp.sch_arr_dt;
          tp.pre_dt = tp.sch_dep_dt;
       }
      }
      i += 1;
    }
    if(bGreenFilter)
    {
      i = k - 1;
      while(i >= 0)
      {
        if(isInArray(trips[i].trip_id, vehlabels)) 
        {
//          report("Green Filter deletes trip " + trips[i].trip_id);
          trips.splice(i,1); 
        }
        i -= 1;
      }
    }
    if(trips.length > 1) trips.sort(tripCompare);
    bGetRefresh = false;
    let bssa = document.getElementById("spa").checked;
    let bikes = [];
    k = trips.length;
    i = 0;
    while(i < k)
    {
      let bHideEntry = false;
      let cell1 = "";
      let cell2 = "";
      let cell3 = "";
      let tp = trips[i];
      let isNotBus = isNaN(tp.route_name);
      let bSubway = false;
      if(typeof tp.route_name !== 'undefined')
      {
        bSubway = (tp.route_name.indexOf("Red ") == 0) || (tp.route_name.indexOf("Blue ") == 0) || (tp.route_name.indexOf("Green ") == 0) || (tp.route_name.indexOf("Orange ") == 0) || (tp.route_name.indexOf("Silver ") == 0);
      }
      if(!bFilterCR || (!bSubway && isNotBus))
      {
      let tlate = 0;
      let tu = 0;
      let tarr = tp.sch_arr_dt;
      let tdep = tp.sch_dep_dt;
//      report("6016 tdep = " + tdep + " tarr = " + tarr + " " + tp.trip_id);
      if(!isNaN(tp.pre_dt))
      {
//        report("6019 tp.pre_dt = " + tp.pre_dt);
        tarr = tp.pre_dt;
        tdep = tarr;
        tlate = tp.pre_dt - tp.sch_arr_dt;
      }
      if((typeof tp.pred_arr_dt !== 'undefined') && (!isNaN(tp.pred_arr_dt)))
      {
//        report("6026 tp.pred_arr_dt = " + tp.pred_arr_dt);
        tarr = tp.pred_arr_dt;
        tdep = tarr;
        tlate = tarr - tp.sch_arr_dt;
      }
      if((typeof tp.pred_dep_dt !== 'undefined') && (tp.pred_dep_dt != null))
      {
        tdep = tp.pred_dep_dt;
      }
      if((!isNaN(tdep)) && (!isNaN(tarr)) && ((Number(tdep) + 1) < tarr)) 
      {
//        report("6037 tdep = " + tdep + " tarr = "+ tarr + " " + (tdep == "") );
        if(tdep != "") tarr = tdep;
      }
//      if(tlate > 1000) report("tlate = " + tlate + " " + tp.pre_dt + " " + tp.sch_arr_dt);
      let tmadj = isAdjusted(tp.trip_id);
      if((tmadj != null) && (!isNaN(tdep)))
      {
        if(tdep < 0) tdep = -tdep;
        tdep = Number(tdep) + Number(tmadj);
        tlate = Number(tp.pre_dt) + Number(tdep);
      }
      let tg = null;
//      report("6042 tdep = " + tdep + " tarr = " + tarr + " " + tp.trip_id);
      if((typeof tdep === 'undefined') || (tdep == null) || (tdep == "")) tg = tarr;
//      if((tdep === undefined) || (tdep == null)) tg = tarr;
      else if(tdep < -10) tg = tarr;
      else tg = tdep;
      let s = "";
//      let ccolor = getColor("sgbk",PALETTES[PALETTE]); //"lightgreen";
      
//      if((tp.status !== undefined) && ((m = tp.status.indexOf("stops")) != -1)) 
      if((tp.status !== undefined) && (tp.status.indexOf("stops") != -1)) 
      {
         let n = Number(tp.status.substring(0, 2));
         tg = Math.floor(NOWDATE.getTime() /1000) +  n * 120;  // was 300
      }
      let aah = "0";
      let aam = "0";
      let hh = "0";
      let mm = "0";
      let bPM = false;
      let bFreq = false;
//      report("5092 " + tp.trip_id + " " + tg + " " + tdep + " " + tarr);

      let smode = 0; // green
      if(isNaN(tg) || ((tdep == null) && (tarr == null))) 
      {
        let m = -1;
        s = "-";
        smode = 10;  // grey

        bGetRefresh = false;
        tlate = 0;
      }
      else if(tg <= 0)
      {
        smode = 0;  // green 
        s = "Freq";
        bFreq = true;
      }
      else if(tg == 0)
      {
        smode = 10; // grey
        s = "--";      
      }
      else
      {
        let tgd = new Date(Number(tg * 1000));
        mm = tgd.getMinutes();  // was var
        if(mm < 10) mm = "0" + mm;
        hh = tgd.getHours();   // was var
        let b = false;
        let nxday = 0;
        while((hh - nxday * 24) > 23)
        {
          nxday += 1;
        }
        if(tg - getNextLocalMidnight() > 0) smode = 40; // purple ccolor = "#cc66ff";
        else smode = 0; // green
//        report("5472 " + hh + " " + ccolor);
        if(!document.getElementById("t24cb").checked)
        {
          if(hh > 11) b = true;
          if(hh > 12) hh -= 12;
          if(hh.toString() == "0") hh = "12";
        }
        else if(hh.toString() == "0") hh = "00";
        s = hh + ":" + mm;
        if(b) {s += " PM"; bPM = true;}
        if(nxday > 0) s += " Day +1";
//        ccolor = "lightgreen";
        let xx = getTTime();
        tu = tg - xx;
 //       if(tp.trip_id.indexOf("ME") == 0)
 //       {
 //         report( "5454 " + tp.trip_id + " tu = " + tu + " " + tg + " " + xx)
 //       }
        if(tu < 0) 
        {
          smode = 10; // grey ccolor = getColor("swbk", PALETTES[PALETTE]); //"lightgrey";
        }
        else if (tu < 300) 
        {
          smode = 20; // red
//          ccolor = getColor("srbk", PALETTES[PALETTE]); //"red";
          if(bUT) beep();
        }
        else if((tu < -600) && (!document.getElementById("spa").checked))
        {
//          smode = 40;
//          ccolor = getColor("spbk", PALETTES[PALETTE]); //"violet";
        }
        if((tu >= 0) && (tp.route_id.indexOf("AM") != 0)) bGetRefresh = false;
        if((tu < -60) && !bssa) bHideEntry = true;
      }
//      report("6189 tu = " + tu + " tg = " + tg + " bHideEntry = " + bHideEntry + " " + tp.tztrip);
      bUT = false;
      let bCancelled = false;
      if(typeof tp.status !== 'undefined')
      {
        if(tp.status.indexOf("Approaching") != -1) smode = 20; //ccolor = "red";
        else if(tp.status.indexOf("Boarding") != -1) smode = 20; //ccolor = "red"; 
        else if(tp.status.indexOf("boarding") != -1) smode = 20; //ccolor = "red"; 
        else if(tp.status.indexOf("1 stop") != -1) smode = 20; //ccolor = "red"; 
        else if(tp.status.indexOf("2 stop") != -1) smode = 20; //ccolor = "red"; 
        else if(tp.status.indexOf("stop") != -1) smode = 0; //ccolor = "lightgreen"; 
        else if(tp.status.indexOf("Cancelled") != -1) 
        {
            smode = 1;
//            ccolor = "lightgrey"; 
            bCancelled = true;
        }
//        report("6174 " + tp.status + " smode = " + smode);
      }
      if(!bCancelled)
      {
       if(tlate > 600)
       {
        tlate = Math.round(tlate/60);
        if(tlate < 600) 
        {
          if(tlate > 59)
          {
            let h1 = Math.floor(tlate / 60);
            let m1 = tlate % 60;
            s += "     " + h1 + "hr " + m1 + "min delay";
          }
          else s += "     " + tlate + "min delay";
          if(getBackgroundMode(smode) == 0) smode = 30; // orange ccolor = getColor("sobk", PALETTES[PALETTE]); //"orange";
        }
       }
       if((getBackgroundMode(smode) == 0) && (typeof tp.status !== 'undefined') && (tp.status.indexOf("DELAYED") != -1)) smode = 30; //ccolor = getColor("sobk", PALETTES[PALETTE]); //"orange";
       if(getBackgroundMode(smode) == 2) //if(ccolor == "red") 
       {
        bGetRefresh2 = true;
        cachecount = MAXCACHECOUNT;
       }
       if((typeof tp.sked_rel !== 'undefined') && (tp.sked_rel != "null") && (tp.sked_rel == "CANCELLED")) smode = 10; //ccolor = getColor("swbk", PALETTES[PALETTE]); //"lightgrey";
      }
      
      if((tarr != tdep) && (tarr != null) && (tdep != null))
      {
        let s6 = getTimeStringX(tarr, !document.getElementById("t24cb").checked);
        if(s6.indexOf(s) != 0) s = s6 + " / " + s;
        let ih = s6.indexOf(":");
        aah = s6.substring(0, ih);
        aam = s6.substring(ih + 1);
      }
      
      cell1 = s;
      if(typeof tp.pred !== 'undefined')
      {
        if(tp.pred == "true")
        {
          smode += 1;
        }
        else if(tp.pred == "est")
        {
          smode += 2;
       }
      }
      if(tmadj != null) smode += 3; //csc = getColor("tman",PALETTES[PALETTE]); //"#ff5500";
      s = "";
      let timetil = "";
      if((tu > 0) && (tu < 3600)) 
      {
        timetil = Math.floor(tu/60);
        s = timetil + " min";
        if(getBackgroundMode(smode) == 2) s += "!";
//        if(ccolor == "red") s += "!";
      }
      cell2 = s;
      
      if(bSubway && (smode== 2))
      {
//        let p9 = service.getTripUpdate(tp.trip_id);
      }
      
      let sf = "";
      if(!isNaN(tp.route_id)) sf = "Bus " + tp.route_id + "\r\n";
      let ss = "";
//      report("::" + tp.route_id + " " + tp.route_name);
      if(document.getElementById("irn").checked)
      {
      if((typeof tp.route_name !== 'undefined') && (tp.route_name != "null"))
      {
        let sj = tp.route_name;
        let ik = sj.indexOf("/");
        if(ik != -1) sj = sj.substring(0, ik) + " / " + tp.route_name.substring(ik + 1);
        ss += "\r\n" + sj;
      }
      }
      if((typeof tp.status !== 'undefined') && (tp.status != "null")) ss += "\r\n " + tp.status.toUpperCase();
      let sei = -1;
      let trkno = null;
      if((typeof tp.track !== 'undefined') && (tp.track != "null") && (tp.track != "undefined")) 
      {
        ss += " Track " + tp.track;
        trkno = tp.track;
      }

      let ssz = "";
      
      if(!bCancelled)
      {
       let bgy = true;
       if((typeof tp.vehicle !== 'undefined') && (typeof tp.vehicle.timestamp !== 'undefined') && (typeof tp.vehicle.timestamp.low !== 'undefined'))
       {
         report("4603 " + getTTime() + " " + tp.vehicle.timestamp.low);
         if((getTTime() - tp.vehicle.timestamp.low) > 120) bgy = false;
       }
       if(bgy && (typeof tp.vstat !== 'undefined') && (tp.vstat != "null")) 
       {
        let s8 = getStopNameFromID(tp.vstopid);
        let ik = s8.indexOf("/");
        if(ik != -1) s8 = s8.substring(0, ik) + " / " + s8.substring(ik + 1);
        ss += "\r\n " + tp.vstat + " " + s8;
        ssz =  fixDest(tp.vstat) + " " + fixDest(s8);
       }
       if((typeof tp.sked_rel !== 'undefined') && (tp.sked_rel != "null"))
       {
        if(tp.sked_rel != "UNSCHEDULED") ss += " " + tp.sked_rel;
       }
      }
      
      let hs = tp.trip_headsign;
      if(typeof hs == 'undefined')
      {
        hs = "?";
        report("6005 headsign undefined for " + tp.trip_id);         
        
      }
//      if(typeof hs == 'undefined') hs = getHeadsignFromTripId(tp.trip_id);
      let ik = hs.indexOf("/");
      if(ik != -1) hs = hs.substring(0, ik) + " / " + hs.substring(ik + 1);
      if(tp.trip_id.indexOf("CC3139") != -1) hs = "";
      if(hs == "") 
      {
        if(tp.direction_name == "Westbound")
        {
          if(ss.indexOf("Green Line B") != -1) hs = "Boston College? ";
          else if(ss.indexOf("Green Line C") != -1) hs = "Cleveland Circle? ";
          else if(ss.indexOf("Green Line D") != -1) hs = "Riverside? ";
          else if(ss.indexOf("Green Line E") != -1) hs = "Heath Street? ";
          tp.trip_headsign = hs;
          hs = "to " + hs;
        }
        cell3 = sf + " " + hs + tp.direction_name + "  " + tp.trip_name + " " + tp.trip_id + ss;
      }
      else if(hs == -1)
      {
        cell3 = sf + " " + tp.direction_name + "  " + tp.trip_name + ss;
      }
      else if((tp.trip_id.indexOf("MSLB") == 0) && (hs.indexOf(" TO ") != -1))
      {
        cell3 = sf + " " + hs + ": \r\n" + tp.direction_name + "  " + tp.trip_name + ss;  
      }
      else 
      {
        cell3 = sf + "to " + hs + ": \r\n" + tp.direction_name + "  " + tp.trip_name + ss;
      }
      if(tp.bikes == "1") 
      {
        let gs = bike;
        if((PALETTE == 3) || (PALETTE == 4)) gs = bike1ws;
        cell3 += " <img src=" + gs.src + " width='35' height='23' title='Bikes OK' alt='Bikes OK'>";
      }
      else if(tp.bikes == "2") 
      {
        let gs = bikeno;
        if((PALETTE == 3) || (PALETTE == 4)) gs = bikeno1ws;

        cell3 += " <img src=" + gs.src + " width='35' height='23' title='No Bikes' alt='No Bikes'>";
      }
      if(typeof tp.ostat !== 'undefined')
      {
        cell3 += getOccImg2(tp.ostat);
      }
//      report("6278 " + tp.trip_name + " " + smode + " " + bHideEntry + " " + bCancelled);
//      if((getBackgroundMode(smode) != 4) && !( (tu < -600) && !document.getElementById("spa").checked))
      if( !( (tu < -600) && !document.getElementById("spa").checked))
      {
      let ty = 0;
      if(!bHideEntry)
      {
      let csc = getTimeColorForMode(smode);
      let cst = getTextColorForMode(smode);
      let ccolor = getBackgroundColorForMode(smode);
//      report("6248 " + smode + " " + hs + " " + tp.trip_name + " " + csc);
      if(!bCancelled)
      {
      ty = tarr;
//      report("6274 " + csc);
      if(typeof tp.pre_dt !== 'undefined') ty = tp.pre_dt;
      let rtd = "";
      if(typeof tp.trip_idr != 'undefined') rtd = " " + tp.trip_idr ;
      if(typeof tp.dupe != 'undefined') rtd += " DUPE";
      if(document.getElementById("sti").checked) cell3 += " (" + tp.trip_id + rtd + ")";
      else if(typeof tp.dupe != 'undefined') cell3 += " (DUPE!)";
      sqs += "<tr class=\'datatable\' style=\'line-height: 40px;\'><td  class='dtb' style=\'width:10%;background-color: " + ccolor + ";color: " + csc + "\'><a style=\"color:" + csc + "\" href=\'javascript:showTripAdjust(" + i + ")\'>" + cell1 + "</a></td><td  class='dtb' style=\'width:10%;background-color: " + ccolor + ";color: " + csc + "\'>" + cell2 + "</td><td class='dtb' style=\'width:80%;background-color: " + ccolor + ";color: " + cst + "\'><a href=\'javascript:showTripSchedule(" + i + "," + ty + ")\' style=\'color: "+ cst + "\'>" + cell3 + "</a></td></tr>";
      }
      else
      {
      if(document.getElementById("sti").checked) cell3 += " (" + tp.trip_id + ")";
      sqs += "<tr class=\'datatable\' style=\'line-height: 40px;\'><td  class='dtb' style=\'width:10%;background-color: " + ccolor + ";color: " + csc + "\'><a style=\"color:" + csc + "\" href=\'javascript:showTripAdjust(" + i + ")\'>" + cell1 + "</a></td><td  class='dtb' style=\'width:10%;background-color: " + ccolor + ";color: " + csc + "\'>" + cell2 + "</td><td class='dtb' style=\'width:80%;background-color: " + ccolor + ";color: " + cst + "\'>" + cell3 + "</td></tr>";      
      }
      }
//      report(hs + ":" + Place);
      if(((Place.indexOf(hs) != -1) &&(hs.length > 0)) || (hs.indexOf(Place) != -1)); 
 //     else if((Place.indexOf("York") != -1) && ((tp.trip_name.indexOf("to NYC") != -1) ||   (hs.indexOf("Washington") != -1) || (hs.indexOf("NYC") != -1))) ; //report("b");
      else if((hs.indexOf("Washington") != -1) && (Place.indexOf("Washington") != -1)); 
      else if((hs.indexOf("NewYork-Penn") != -1) && (Place.indexOf("New York-Penn") != -1)); 
      else 
      {
 //       report("  " + aah + ":" + aam + " " + hh + ":" + mm);
 //         report("6119 " + trkno);
        ASND[ASND.length] = new ASND0(timetil, tp.route_id, tp.trip_name, tp.direction_name, hs, "", tp.status, trkno);
        ASND[ASND.length -1].hh = hh;  
        ASND[ASND.length -1].mm = mm;
        ASND[ASND.length -1].ah = aah;
        ASND[ASND.length -1].am = aam;
        ASND[ASND.length -1].bPM = bPM;
        ASND[ASND.length -1].trip_id = tp.trip_id;
        ASND[ASND.length -1].bFreq = bFreq;
        ASND[ASND.length -1].bPred = (getBackgroundMode(smode) != 0);
        ASND[ASND.length -1].ss = ssz;
        ASND[ASND.length -1].rowIndex = i;
        ASND[ASND.length -1].ttime = ty;
      }
      }
      }
      i += 1;
    }
    sqs += "</table>";
    
    
    if(PredictionTime != "") 
    {
      let nd = new Date(Number(PredictionTime) * 1000);
      let ps = "Prediction time = " + nd.toUTCString();
      document.getElementById("pt").innerText = ps;
    }
    else document.getElementById("pt").innerText ="";
          
//    clearReport();
//    report(sqs);
    
//    report("ASND.length = " + ASND.length);
    document.getElementById("pinz").innerHTML = sqs;
    try{
    for(let jj = 0; jj < bikes.length; jj++)
    {
      if(bikes[jj].indexOf("biy_") == 0)
      {
        document.getElementById(bikes[jj]).src = bike.src;
      }
      else
      {
        document.getElementById(bikes[jj]).src = bikeno.src;
      }
    }
    }
    catch(e){}
    
    if((bgotData) && (trips.length != 0))
    {
      if(!bForceSked && !usingCache) PSTATUS = "";
      if(!bForceSked) PSTATUS = "";
      if(!bOnLine) checkConnection();
      bUpdateOnce = true;
      Timeo = 0;
    }
    else 
    {
//  report("udi2 " + stop_name + " " + stop_id + " " + displaystop + " bUseFile= " + bUseFile + " bForceSked= " + bForceSked + " bUseSked= " + bUseSked + " bE= " + bE);
//      if((!bUseSked) && (!bForceSked) && (!bE))
      if((!bUseSked) && (!bE))
     {
 //       document.getElementById("pinz").innerHTML = "<span style='font-size: 8pt;color:black;'>No prediction data from server.</span>";
        PSTATUS = ""; //"&nbsp;&nbsp;NOTE: Using schedule data.";
        report("No prediction data for stop_id " + stop_id + " routes " + getRoutesS(getParentIdFromId(stop_id)));
        bForceSked = true;
//        if(!bOnLine) qupdateDisplay();
//        else 
//            if(Timeo < 4) setTimeout(qupdateDisplay, 4000);
//        Timeo += 1;
//        qupdateDisplay();
      }
      else
      {
        PSTATUS = "";
//        console.log("6080: " + document.getElementById("pinz").innerHTML);
//        document.getElementById("pinz").innerHTML = "<span style='font-size: 8pt;color:black;'>No schedule data for " + getStopNameFromID(stop_id) + "<br>routes: " + getRoutesS(getParentIdFromId(stop_id)) + "</span>";
        checkLoadable(stop_id);
        if(document.getElementById("spp").checked) document.getElementById("sps").checked = true;
        if(bUpdateOnce) 
        {
          setTimeout(qupdateDisplay, 4000);
          bUpdateOnce = false;
        }
      }
    }
    document.getElementById("aa").innerHTML = ah + PSTATUS + "<br><br>";
    pcolor = "var(--Ccolor)"; //"white";
    document.getElementById("pll").style.color = pcolor;
    let abx = document.getElementById("ab");
    if((typeof abx !== 'undefined') && (abx != null)) abx.style.background = abcolor;
    let pxx = checkLoadable(stop_id);

    resolve();
    }
  }); /*.catch(function(t) {
    report("got here 1092 " + t);
    console.log("got here 1092 " + t);
//    console.trace();
//  report("udi3 " + stop_name + " " + stop_id + " " + displaystop + " bUseFile= " + bUseFile + " bForceSked= " + bForceSked + " bUseSked= " + bUseSked + " bE= " + bE);
    bOnLine = false;
    capcolor = "black";
    checkConnection();
//    bForceSked = true;
    abcolor = "lightgrey";
    if(t.toString().indexOf("data length is 0") != -1) pcolor = "var(--Ccolor)";//"white";
    document.getElementById("pll").style.color = pcolor;
    let abx = document.getElementById("ab");
    if((typeof abx !== 'undefined') && (abx != null)) abx.style.background = abcolor;
    if(bReport) report("No data for stop " + stop_id + " routes " + getRoutesS(getParentIdFromId(stop_id)));
    if((stop_id == "") || (stop_id.indexOf("door-") == 0) || (stop_id.indexOf("door-") == 0))
    {
      if(laststopid != "") stop_id = laststopid;
    }
    else
    {
      if(bForceSked) bUseBuiltIn = true;
      bForceSked = true;
//      if(document.getElementById("qnsu").checked && !document.getElementById("mnrp").checked) 
      qupdateDisplay();
    }
//    reject();
  }); */
}
else if(DISPLAYTYPE == 1)
{
  let p = null;
  clearArray(BSND);
  let bMNRroute = false;
  CurrentHeadsign = null;
//  report("5928 CurrentTripID = " + CurrentTripID);
  if(CurrentTripRouteID != null) bMNRroute = (CurrentTripRouteID.indexOf("MN") == 0);
  if((CurrentTripID == null) || (CurrentTripID == "") || (CurrentTripID == " "))
  {
//    report(":2916");
    clearArray(DT1Alerts);
    p = new Promise(function(resolve, reject) {
      CurrentTripID = displaytripid;
      report("No CurrentTripID for " + displaytripid);
      reject("No CurrentTripID for " + displaytripid);
    } );    
  }
  else if(!bD1Refresh && (displaytripid == CurrentTripID) && !bForceSked)
  {
//    report(":2925 " + bForceSked);
   p = new Promise(function(resolve, reject) {
      resolve(displaysked);
    } );  
  }
//  else if((isOther(displayid)) || (CurrentTripID.indexOf("AM") == 0) || (serviceE.isAssociateTrip(CurrentTripID)))
  else if((CurrentTripID.indexOf("AM") == 0) || (serviceE.isAssociateTrip(CurrentTripID)) )
  {
//    report("2933 " + CurrentTripID + " " + Ptript + " " + TRIP_STARTTIME + " " + CurrentTripCDate);
    clearArray(DT1Alerts);
    if(serviceE != null)
    {
      capcolor = "red";
      DT1Alerts = OAlerts;
      document.getElementById("cap").style.color = capcolor;
//      let dnow = new Date(NOW);
      let tbs = null;
//    report("6195 " + Ptript + " " + TRIP_STARTTIME + " " + CurrentTripCDate + " " + typeof CurrentTripCDate + " " + (Ptript == 0));
//      if(((CurrentTripCDate == null) || (CurrentTripCDate == "null"))  && (Ptript == 0))
      if((Ptript == 0) && (TRIP_STARTTIME != null))
      {
//          report("6197 " + TRIP_STARTTIME);
        Ptript = TRIP_STARTTIME;
      }
//      report("6430 " + CurrentTripCDate);
      if((typeof CurrentTripCDate === 'undefined') || (CurrentTripCDate == null) || (CurrentTripCDate == "null") || (CurrentTripCDate == "undefined"))
      {
//        report("6432 " + CurrentTripCDate + " " + NOW);
        CurrentTripCDate = getCDateFromDate(new Date(NOW));
//        report("6433 " + CurrentTripCDate + " " + NOW);
      }
//      report("6203 " + Ptript + " " + CurrentTripCDate);
      if((Ptript != null) && (Ptript != 0))
      {
//         report("made tbs = " + Ptript);
         tbs = new Date(Ptript * 1000);
 //        report("6200 " + tbs.getTime());
      }
      
      {
//        report("6079 " + CurrentTripID + " " + CurrentTripCDate + " " + Ptript + " " + TRIP_STARTTIME + " "+ tbs.getTime());
 //       p = serviceE.getPredictionByTrip(CurrentTripID, tbs);
        p = serviceE.getPredictionByTripA(CurrentTripID, CurrentTripCDate, tbs);
      }
/*      else
      {
        p = serviceE.getScheduleByTrip(CurrentTripID, dnow);
      } */
    }
    else
    {
      p = new Promise(function(resolve, reject) {
      report("No support for " + stop_name);
      reject("No support for " + stop_name);
      } );
    }     
  }
  
  else if(CurrentTripID.indexOf("ADDED") != -1) // || !bOnLine)
  {
     clearArray(DT1Alerts);
     report("6134 DISPLAY ADDED " + Place_id + " " + Leghs + " " + CurrentTripRouteID);
     if(Place_id == null) report("Place_id is null. Place = " + Place);
     p = serviceT.getScheduleTemplateByRoute(CurrentTripRouteID, Place_id, Leghs, capt, CurrentStop);
  }
  else if(CurrentTripID.indexOf("T_") == 0)
  {
//     report("6244 T_ id " + CurrentTripID);
     clearArray(DT1Alerts);
     capcolor = "red";
     document.getElementById("cap").style.color = capcolor;
     try {
         let rt = serviceT.getRoute(CurrentTripRouteID);
         let tr = rt.getTTrip(CurrentTripID);
//      report("2308 " + CurrentTripRouteID +" " + tid + " " + tr.tid);
         let tidx = tr.tid;
         p = new Promise(function(resolve, reject) {
             let p5 = service3.getPredictionByTrip(tidx).then(function(d) {
                 resolve(d);
             }).catch(function(e){
                 let p6 = serviceT.getScheduleByTrip(CurrentTripID, null).then(function(d) {
                 resolve(d);
                 }).catch(function(e){
                   reject(e);
                 });
             });
         });
                 
     }
     catch(e){
         p = serviceT.getScheduleByTrip(CurrentTripID, null);
     }
     
  }
  
  else
  {
 //   report(":2952 bForceSked = " + bForceSked + " " + bUseBuiltIn + " " + document.getElementById("msp").checked + " " + CurrentTripID);
//     report("updateDisplayInfo 1 " + CurrentTripID);
//     bshowAlerts = false;
     clearArray(DT1Alerts);
     capcolor = "red";
     document.getElementById("cap").style.color = capcolor;
     let svc = service;
//     report("6260 " + CurrentTripID + " " + bUseSked + " " + bForceSked)
     if((document.getElementById("msp").checked) && !bUseSked)  // mix sked and pred
     {
//      report("5857 getScheduleByTrip " + CurrentTripID);
       p = svc.getScheduleByTrip(CurrentTripID, null);     
     }
     else if( (bUseSked) || bForceSked || bUseBuiltIn || !bOnLine)
     {
//      report("5861 getScheduleByTrip ") + CurrentTripID;
       p = svc.getScheduleByTrip(CurrentTripID, TRIP_STARTTIME );
     }
     else
     {
//       report("6650 getPredictionByTrip "+ CurrentTripID);
       p = svc.getPredictionByTrip(CurrentTripID);
     } 
   }
   p.then(function(t) {
     let bReport = document.getElementById("rp").checked;
     if(t == null)
     {
       report("6273 t is null");
       console.trace();
       return;
     }
//     if(t.stop == null) 
     {
//       report("6398 " + JSON.stringify(t, null, 4));
 //      console.trace();
     }
//     report("t.stop.length = " + t.stop.length);
//     report("DISPLAYTYPE 1 NOW = " + Math.round(NOW / 1000));
//     if(bReport)
/*     {
       t.stop.sort(tripComparez3);
       let rrr = t.route;
       t.route= null;
       report("\n6167 now = " + getTTime2() + "\n" + JSON.stringify(t, null, 4));
       t.route = rrr;
     } */
     pcolor = "var(--Ccolor)"; //"white";
     document.getElementById("pll").style.color = pcolor;
     capcolor = "black";
     document.getElementById("cap").style.color = capcolor;
     displaytripid = CurrentTripID;
//     t.stop.sort(tripComparez3);
//     t = getSortedTripStops(data);
//       report("\n6599 now = " + getTTime2() + "\n" + JSON.stringify(t, null, 4));
     displaysked = t; // needed for -2 templates
     let rrr = t.route;
 //      t.route= null;
//       let tyr = JSON.stringify(t);
//       report("6201:\n" + JSON.stringify(t,null,4) + "\n");
//     displaysked = JSON.parse(tyr);
     CurrentTripRouteID = t.route_id;
     clearArray(CurrentAlerts);
     let ct = t.direction_name;
     if((typeof ct === 'undefined') || (ct == "undefined")) ct = "";
     if(typeof t.trip_name !== 'undefined') capt = t.trip_name + " " +  ct + " "; // + t.route_name + " " + t.trip_id;
     if((capt == "") && (typeof t.route_name !== 'undefined')) capt = t.route_name;
     let hs = t.trip_headsign;
     if((typeof hs === 'undefined') || (hs == "")) hs = t.headsign;
//     if((typeof hs == 'undefined') || (hs == "")) hs = getHeadsignFromTripId(t.trip_id);
     if((typeof hs !== 'undefined') && (hs != "")) capt += " to " + hs;
     //else capt += t.route_name + " " + t.trip_id;
     if(capt.indexOf(")") == -1) capt += " (" + t.trip_id + ")";
     if(!isNaN(t.route_id)) capt = "Bus " + t.route_id + ", " + capt;
     CurrentHeadsign = hs;
     
     vcapt = null;
     if((typeof t.vehicle_latitude !== 'undefined') && ( t.vehicle_latitude != null))
     {
       let pp = getPositionForId(Place_id);
       let db = getDistanceBetween(t.vehicle_latitude, t.vehicle_longitude, pp.x, pp.y);
       db = Math.round(10 * db) / 10;
       vcapt = " (veh " + db + " mi away)";
     }
     
     let ah = "";
     checkAlerts(false);
    abcolor = "lightgrey";
    DT1Route = t.route_id;
    let t2 = DT1Alerts;
    if((WxAlerts.length > 0) || ((t2 != null) && (t2.length > 0))) abcolor = "yellow";
       ah = "<button type='button' id='ab' class ='buttonT' onClick='toggleAlerts()' accesskey='i'>Show/Hide Alerts:</button><div class='tt'><span class='ttt'>a</span></div>"; // + PSTATUS + "<br><br>";
       if(bBtnAdd1) ah += 
    ' <button  id="btnAdd" class ="buttonT" style=" height:25px; background-color:white;visibility:visible;" onClick="addToHome()" title="Add to Home Screen">Add to Home Screen </button>';
       
    if(bshowAlerts)
    {
      ah += getAlertDisplay(t2);
    }
    updateCurrentAlerts(t2);
       
     let sqs = "<table class='datatable'>";
     let wcs = [];
 
     if(typeof t.stop === 'undefined') 
     {
      bgotData = false;
     }
     else
     {
     bgotData = true;
     bForceSked = false;
     let darray = [];
     clearArray(darray);
     let k = t.stop.length;
     let i = 0;
     let bmz = true;
     let tnadj = 0;
     let hh = ""
     let mm = "";
     if((Ptript != null) && (typeof t.stop[i] !== 'undefined') && (typeof t.stop[i].pre_dt !== 'undefined') && (t.stop[0].pred_dep_dt != "null"))
     {
       deleteAdjustedNTrip(t.trip_id)
       while(bmz && (i < k))
       {
         if(getParentIdFromId(t.stop[i].stop_id) == Ptripi)
         {
//         report("5944 " + Ptripi + " " + t.stop[i].sch_dep_dt + " " + t.stop[i].pred_dep_dt + " " + t.stop[i].pre_dt + " " + Ptript);
           if(isNaN(t.stop[i].pre_dt))
           {
             bmz = false;
             let tn = Ptript - t.stop[i].sch_dep_dt;
              adjustNDeparture(tn);
           }
         }
         i += 1;
       }
       Ptripi = "";
       Ptript = null;
     }
     
     if((CurrentTrip != null) && (typeof t.stop !== 'undefined'))
     {
       CurrentTrip.stop = t.stop;
     }
     
     tnadj = isAdjustedN(t.trip_id);
//     report("tnadj = " + tnadj);
     i = 0;
     tlastdep = 0;
     tlastskeddep = 0;

//     let sqs = "<table class='datatable'>";
     bD1Refresh = false;
     let SomePred = 0;
     let bPM = false;
     let tf = Math.round(NOW / 1000) - ACT_TRIP_TSTAMP;
     let bACT = !(ACT_TRIP_STATUS == "");
//     let bACTSTART = false;
//     report("ACT_TRIP_STATUS = " + ACT_TRIP_STATUS + ", ACT_TRIP_STOP = " + ACT_TRIP_STOP + " " + bACT + " " + tf);
//stringify(t, null,4));
     let bACTSTART2 = false;    
     let bFirstx = false;
     let bUsingTemplate = false;
     let lasttg = 0;
     let bGotStat = false;
     let stattime = -1;
     let tp = null;
     let tmadj = 0;
     while(i < k)
     {
      let bnadj = false;
      tp = t.stop[i];
//      report("4479 " + bACT + " " + tp.stop_id + ", " + ACT_TRIP_STOP);
      if(bACT && ((tp.stop_id == ACT_TRIP_STOP) || (tp.stop_id == getParentIdFromId(ACT_TRIP_STOP)))) //&& (tf < 200))
      {
        bACTSTART = true;
        bACTSTART2 = true;
      }

      let tarr = tp.sch_arr_dt;
      let tdep = tp.sch_dep_dt;
//      report("6768 tdep = " + tdep);
//      report("6769 tdep = " + tdep + " tarr = " + tarr + " smode = " + smode);
      if(tdep < 10000) tdep = tarr;  // fudge for halifax
      if(tdep == "") tdep = tarr; // fudge for halifax
      
      if(bACT && !bACTSTART && !bACTSTART2 && !document.getElementById("spa").checked)
      {
        tarr = -2;
        tdep = -2;
      }
      
      let tarr0 = tarr;
      let tdep0 = tdep;
      if((typeof tp.pred_arr_dt !== 'undefined') && (tp.pred_arr_dt != "null"))
      {
        tarr = tp.pred_arr_dt;
      }
      if((typeof tp.pred_dep_dt !== 'undefined') && (tp.pred_dep_dt != "null"))
      {
//        report("6787 " + tp.pred_dep_dt);
        tdep = tp.pred_dep_dt;
      }
      if((typeof tp.pre_dt !== 'undefined') && !isNaN(tp.pre_dt))
      {
        tarr = tp.pre_dt;
        tdep = tarr;
//        report("6794 " + tp.pre_dt);
      }
      else if(tdep == -2) ;
      else
      {
          // this doesnt work if data ist sorted!!!
          
//        report("4416 " + tarr + " " + tlastdep + " " + tlastskeddep + " tarr0 = " + tarr0 + " tdep0 = " + tdep0);
/*        if((tarr0 > 0) && (tarr < tlastdep))
        {
          report("6802 tarr0 = " + tarr0 + " tlastdep = " + tlastdep + " tlastskeddep = " + tlastskeddep);
          tarr = Number(tlastdep) + Number(tarr) - Number(tlastskeddep);
          if(tdep < tarr) tdep = tarr;
        } */
//        report("6803 tnadj = " + tnadj);

        if(tnadj != 0)
        {
//          report("6809 tnadj = " + tnadj + " tdep = " + tdep); 
          if (tdep < 0) tdep = - tdep;
          tdep = Number(tdep) + Number(tnadj);
          tarr = Number(tarr) + Number(tnadj);
          bnadj = true;
        }
      }
//        report("6812 tmadj = " + tmadj + " tnadj = " + tnadj + " tdep = " + tdep + " " + tp.pred_arr_dt + " " + tp.pred_dep_dt);
      
      tmadj = isAdjusted(t.trip_id);

      if(tmadj != null)
      {
        if(tdep == -2) ;
        else if (tdep0 > 0)
        {
          if (tdep < 0) tdep = - tdep;
          tdep = Number(tdep) + Number(tmadj);
          if(typeof tarr !== 'undefined') tarr = tdep;
//        report("b. tmadj = " + tmadj + " tdep = " + tdep);
        }
        else
        {
          if (tdep < 0) tdep = - tdep;
          tdep = -Number(tdep0) + Number(tmadj);
          if(typeof tarr !== 'undefined') tarr = tdep;
//        report("c. tmadj = " + tmadj + " tdep = " + tdep);
        }
      }
      tlastdep = tdep;
      tlastskeddep = tp.sch_dep_dt;
      
//      let ccolor = "lightgreen";
      let tg = null;
      if((typeof tarr !== 'undefined') && (tarr != null)) {tg = tarr; }
      if((typeof tdep !== 'undefined') && (tdep != null) && (tg != "")) {tg = tdep; }
      
      
      let smode = 0; // green
//      if(tdep - getNextLocalMidnight() > 0) smode = 40; //ccolor = "#cc66ff";
//      report("6415 " + tarr + " " + tdep + " " + getNextLocalMidnight() + " " + tg + " " + NOW);
      let tgd = null;
      let bEst = false;
      let s = "";
//      report("6833 tg = " + tg + " smode = " +  smode);
//      report("6847 tdep = " + tdep + " tarr = " + tarr + " tg = " + tg + " smode = " + smode);
      if(tg == null) 
      {
//        report("tg is null 2863 " + tarr + " " + tdep);
//        ccolor = "lightgrey";
        smode = 10;
        s = "-";
      }
      else if(tdep - getNextLocalMidnight() > 0) smode = 40; //ccolor = "#cc66ff";
      else if(tg <= 0)
      {
        tg =  -tg;
        if(bFirstx)
        {
          bUsingTemplate = true;
          tg = Number(tg) + Number(lasttg);
 //         report("tg2 = " +tg2 + " = " + tg + " + " + lasttg);
        }
        tgd = new Date(Number(tg * 1000));
        mm = tgd.getMinutes();
        hh = tgd.getHours() - 19;
        if(bFirstx) 
        {
          hh = tgd.getHours();
          if(mm < 10) mm = "0" + mm;
          smode = 0;
//          ccolor = "lightgreen";
          s = getTimeStringX(tg, !document.getElementById("t24cb").checked);
          let tu = tg - getTTime();
//          report("6135 tu = " + tu + " " + tg + " " + getTTime());
          if(tu < 0) smode = 10; //ccolor = "lightgrey";
          else if (tu < 300) smode = 20; //ccolor = "red";
        }
        else
        {
        mm += hh * 60;
        if(mm == 0) {s = "--"; smode = 10;}
        else 
        {
          if(mm < 10) mm = "0" + mm;
          smode = 0;
//          ccolor = "lightgreen";
          s = "+ : " + mm;
        }
        bEst = true;
        }
      }
      else 
      {
      
 //     if(!bFirstx)
      {
        if(tg == null) tg = lasttg;
        bFirstx = true;
        lasttg = tg;
      }
//      bhy = false;
      
      tgd = new Date(Number(tg * 1000));
      mm = tgd.getMinutes();
      if(mm < 10) mm = "0" + mm;
      hh = tgd.getHours();
      let hm = hh % 24;
      let b = false;
      let nxday = 0;
      while((hh - nxday * 24) > 23)
      {
        nxday += 1;
      }
      if(!document.getElementById("t24cb").checked)
      {
        if(hm > 11) b = true;
        if(hm > 12) hm -= 12;
        if(hm.toString() == "0") hm = "12";
      }
      else if(hm.toString() == "0") hm = "00";
      let bhy = false;
      if(isNaN(hm)) {hm = "-"; bhy = true;}
      if(isNaN(mm)) {mm = "-"; bhy = true;}
      
      s = hm + ":" + mm;
      if(b) {s += " PM"; bPM = true;}
      if(nxday > 0) s += " Day +1";
      
//      s = getTimeStringX(tarr, !document.getElementById("t24cb").checked) 
//      report("6719 hh = " + hh + " mm = " + mm + " s = " + s + " " + tp.pred);

      if((tarr != tdep) && (tarr < tdep))
      {
        s = getTimeStringX(tarr, !document.getElementById("t24cb").checked) + " / " + s;
      }
      smode = 0; //ccolor = "lightgreen";
      if(nxday > 0) smode = 40; //ccolor = "#9900cc";
      let tu = tg - getTTime();
      let dd1 = new Date(tg * 1000);
      let dd2 = new Date(getTTime() * 1000);
//      report("6136 tu = " + tu + " " + tg + " " + getTTime() );
//      report(dd1.toLocaleDateString() + " " + dd1.toLocaleTimeString() + " " + dd2.toLocaleDateString() + " " + dd2.toLocaleTimeString());
      if(tu < 0) smode = 10; // ccolor = "lightgrey";
      else if (tu < 300) 
      {
        smode = 20;
//        ccolor = "red";
        if(bUT) beep();
        if(bMonitorMode && (CurrentTripID == MonitorTripID))
        {
 //         announceTripX(0);
        }
//        report("6998 smode = " + smode + " " + tu);
      }
      if((getBackgroundMode(smode) == 0) && (tg - getNextLocalMidnight() > 0)) smode = 40; // ccolor = "#cc66ff";
//      report("6882 ccolor = " + ccolor + " " + nxday + " " + (tg - getNextLocalMidnight() > 0));
      let ot = null;
      let bEst = false;
      if(tp.pred == "est")
      {
        bEst = true;
      }
//     report("7008 " + tu + " " + getNextLocalMidnight() + " " + tg + " smode = " + smode + " " + tp.status);

//      let tf = Math.round(NOW / 1000) - ACT_TRIP_TSTAMP;
      if(((tp.stop_id == ACT_TRIP_STOP) || (tp.stop_id == getParentIdFromId(ACT_TRIP_STOP))) ) //&& (tf < 200))
      {
        if(ACT_TRIP_STATUS == "STOPPED_AT")
        {
//          report("tp.stop_id = " + tp.stop_id + " tnadj = " + tnadj + " tu = " + tu );
          tnadj -= tu;
          adjustNDeparture(tnadj);
          let ty = Math.floor(Date.now() /1000) +  30;
          tgd = new Date(ty * 1000);
          let ot = getTimeObject(tgd);
          s = ot.s;
//          ccolor = ot.color;
          smode = ot.mode;
          bGotStat = true;
          stattime = tg;
        }
        else if(ACT_TRIP_STATUS == "IN_TRANSIT_TO")
        {
          let ty = Math.floor(Date.now() /1000) +  30;
          tgd = new Date(ty * 1000);
          let ot = getTimeObject(tgd);
          s = ot.s;
          if(tu < 300)  smode = ot.mode; //ccolor = ot.color;
          bGotStat = true;
          stattime = tg;
        }
        else if(ACT_TRIP_STATUS == "INCOMING_AT")
        {
          let ty = Math.floor(Date.now() /1000) ;
          tgd = new Date(ty * 1000);
          let ot = getTimeObject(tgd);
          s = ot.s;
//          ccolor = ot.color;
          smode = ot.mode;
          bGotStat = true;
          stattime = tg;
        }

      }
      if(bhy && (typeof tp.status != 'undefined'))
      {
        if((m = tp.status.indexOf("stop")) != -1)
        {
          let n = Number(tp.status.substring(0, 2));
 //        report(n + " " + tp.status + " " + tp.sch_dep_dt);
 //         if((n == 1) || ((n == 2) && (stop_id != "70205")))
          {
            let ty = Math.floor(Date.now() /1000) +  n * 120;
            tgd = new Date(ty * 1000);
            let ot = getTimeObject(tgd);
            s = ot.s;
 //           ccolor = ot.color;
            smode = ot.mode;
            bEst = true;
          }
        }
        else if(((m = tp.status.indexOf("Approaching")) != -1) ||  ((m = tp.status.indexOf("Boarding")) != -1))
        {
          let ty = Math.floor(Date.now() /1000) +  60;
          tgd = new Date(ty * 1000);
          let ot = getTimeObject(tgd);
          s = ot.s;
 //         ccolor = ot.color;
          smode = ot.mode;
       }
      }
      
      }
      
      if((getBackgroundMode(smode) == 0) && (typeof tp.status != 'undefined') && (tp.status.indexOf("DELAYED") != -1)) smode = 30;//ccolor == "orange";
//      report("t.vehicle_stop = " + t.vehicle_stop);
      if(((typeof t.vehicle_stop !== 'undefined') && (t.vehicle_stop != null) && (t.vehicle_stop == tp.stop_id)) || (VEH_STOP != null) && (VEH_STOP == tp.stop_id) && (SomePred == 0))
      {
        smode = 20;
//        ccolor = "red";
        report("got here 7086 " + t.vehicle_stop + " " +VEH_STOP );
      }

      let dx = new DisplayItem();
      dx.tgd = tgd;
      dx.time = s;
      bUT = false;
      if((tgd != null) && ((tg == null) || (tg == "null"))) tg = tgd.getTime() / 1000;

      if(bEst)
      {
        smode = 10 * Math.floor(smode /10) + 2;
        dx.pcolor = "#9900cc";
      }
      else if((typeof tp.pred !== 'undefined') && (tp.pred == "true")) 
      {
        SomePred += 1;
        smode = 10 * Math.floor(smode /10) + 1;
        dx.pcolor = "blue";
        dx.pred = true;
        let taa = tp.pred_arr_dt;
        let tdd = tp.pred_dep_dt;
        if((tdd == null) && (taa != null))
        {
          tdd = taa;
        }
        if(tdd != null)
        {
          tdd = Number(tdd) + Number(tmadj);
          let tya = new Date(tdd * 1000);
          let ot = getTimeObject(tya);
          dx.predtime = ot.s;
          dx.predcolor = ot.color;
          smode = 10 * Math.floor(smode /10) + 1;
          dx.delay = (tdd - tg);
          tg = tdd;
        }
      }
//      report("6273 " + bEst + " " + bnadj + " " + dx.pcolor);
      if(tmadj != null)
      {
        dx.pcolor = "#ff5500";
        smode = 10 * Math.floor(smode / 10) +3;
      }
      else if(bnadj)
      {
        dx.pcolor = "#9900cc";
        smode = 10 * Math.floor(smode / 10) +2;
      }
      
//      if(bGotStat && (getBackgroundMode(smode) == 0)) smode = 20 + (smode % 10);

      if(getBackgroundMode(smode) == 2) bD1Refresh = true;
      s = "";
      dx.delta = "";
      dx.zelta = "";
      let xx = getTTime();
      let tu = tg - xx;
//      report("7144 smode = " + smode + " tu = " + tu);
      
      if((tu > 0) && (tu < 3600)) 
      {
        s = Math.floor(tu/60); // + " min";
        dx.delta = s + " min";
        dx.zelta = s + " minutes";
      }
      dx.tgd = tgd;
      dx.tg = tg;
      dx.tu = tu;
      dx.hh = hh;
      dx.mm = mm;
      dx.bPM = bPM;
      dx.smode = smode;
      let status = tp.status;

      if((typeof status !== 'undefined') && (status != null) && (status != "null")) status = " " + status;
      else status = "";
      if((typeof tp.track !== 'undefined') && (tp.track != null)) 
      {
        status += " Track " + tp.track;
      }
      let prestatus = "";
//      report(tp.stop_id + " " + ACT_TRIP_STOP + "  " + tf);
      if(((tp.stop_id == ACT_TRIP_STOP) || (tp.stop_id == getParentIdFromId(ACT_TRIP_STOP))) && (tf < 300))
      {
        prestatus  = ACT_TRIP_STATUS + "  &nbsp;&nbsp;";
      }
 //     dx.text = tp.stop_name + status;
      if(((tp.stop_id == ACT_TRIP_STOP) || (tp.stop_id == getParentIdFromId(ACT_TRIP_STOP))))
      {
        dx.bstat = true;
      }
      else dx.bstat = false;
//      dx.text = prestatus + getDescriptionForStop(tp.stop_id) + status;
      let snid = tp.stop_id;
//      if(snid.indexOf("T_") == 0) snid = snid.substring(2);
      let sn = getStopNameFromID(snid);
      if((sn == null) || (sn == "")) sn = "[" + snid + "]";
      dx.text = prestatus + sn + status;
      dx.stop_id = tp.stop_id;
      dx.wchair = tp.wchair;
      dx.stop_seq = tp.stop_sequence;
      if(CurrentTrip != null) dx.trip_headsign = CurrentTrip.trip_headsign;
      
      if(bGreenFilter)
      {
        if((status.indexOf("4 stops") != -1) && (getParentIdFromId(tp.stop_id) == "place-north")) bD1Refresh = true; 
      }
      dx.ccolor = getBackgroundColorForMode(smode); //ccolor;
      dx.track = tp.track;
      dx.index = i;
      darray[darray.length] = dx;
      i += 1;
    }
    
    // sort things
    if(darray.length > 1) 
    {
      if((typeof tp.stop_sequence !== 'undefined') && (CurrentTripRouteID.indexOf("NJR") != 0) && (CurrentTripRouteID.indexOf("LIR") != 0) && (t.route_id.indexOf("MW") != 0) && (CurrentTripRouteID.indexOf("PP") != 0) && (CurrentTripRouteID.indexOf("Y") != 0)
      && (CurrentTripRouteID.indexOf("BRTA") != 0) 
//      && (CurrentTripRouteID.indexOf("AMR") != 0) 
      && (CurrentTripRouteID.indexOf("CC") != 0)
      && (CurrentTripRouteID.indexOf("SF") != 0)
      && (CurrentTripRouteID.indexOf("LAMB") != 0)
      && (CurrentTripRouteID.indexOf("MDR") != 0)
      && (CurrentTripRouteID.indexOf("MN") != 0)
      && (CurrentTripRouteID.indexOf("SBB") != 0)
      && (CurrentTripRouteID.indexOf("WAB") != 0)
      && (darray[0].stop_id.indexOf("T_") != 0)
      && (CurrentTripRouteID.indexOf("CTAB") != 0))
      {
//        report("sort tripComparez2 by sequence " + CurrentTripRouteID);
        if(!bUsingTemplate) darray.sort(tripComparez2); // sort by sequence
      }
      else if(CurrentTripRouteID.indexOf("AMR") == 0)
      {
        darray.sort(tripComparez4);  
      }
      else //if(!bUsingTemplate)
      {
//        report("sort tripComparez  sort by time");
        darray.sort(tripComparez); // sort by time
      }
    }
//       report("\n7075 now = " + getTTime2() + "\n" + JSON.stringify(darray, null, 4));
    clearArray(CurrentTripZ);
    let bZF = true;
    let bZcolor = false;
    let lastdelay = 0;
    let bHadPred = false;
    let bD1Added = false; //(CurrentTripID.indexOf("ADDED") != -1);
    let bShowExpiredStops = document.getElementById("sxs").checked; // || bD1Added || (tmadj != null);
    bD1Added = (CurrentTripID.indexOf("ADDED") != -1);
    let bBefore = document.getElementById("spa").checked;
    let bstatoccured = false;
    i = 0;
    while(i < k)
    {
      let z = darray[i];
      let row = document.createElement("tr");
      row.className = "datatable";
      let cell = document.createElement("td");
      cell.className = "datatable";
      let zs = z.time;
      let zscolor = z.pcolor;
      let zccolor = z.ccolor;
      let timetil = "";
      if(z.pred)
      {
        zs = z.predtime;
//        zccolor = z.predcolor;
        bHadPred = true;
        lastdelay = z.delay;
      }
      else if(bHadPred)
      {
        if(lastdelay > 0)
        {
          let tff = Math.round(z.tgd.getTime() / 1000);
          tff += lastdelay;
          let mun = Math.round(lastdelay / 60);
          let tya = new Date(tff * 1000);
          let ot = getTimeObject(tya);
          zs = ot.s;
          z.smode = 10 * Math.floor(z.smode) + 2;
//          zscolor = "#9900cc";
          let xx = getTTime();
          let ttu = tff - xx;
          let sw = "";
          let zw = "";
          if((ttu > 0) && (ttu < 3600)) 
          {
            timetil = Math.floor(ttu/60);
            sw = timetil + " min";
            zw = timetil + " minutes";
//            if(zccolor == "red") sw += "!";
            if(getBackgroundColorForMode(z.smode) == 2) sw += "!";
          }
          z.delta = sw;
          z.zelta = zw;
          z.hh = ot.hh;
          z.mm = ot.mm;
          z.bPM = ot.bPM;
         }
      }
//      if(bD1Added) zscolor = "#9900cc";
      if(tmadj != null) zscolor = "#ff5500";
      if(z.ccolor == "red") zccolor = "red";
          
//      report("7245: " + i + " " + bUseSked + " " + bShowExpiredStops + " " + bBefore + " " + (z.ccolor == "red") +  " " + z.tu + " " + SomePred + " " + bHadPred + " " + z.smode);
          
      if(bUseSked || (bShowExpiredStops || bBefore || (z.ccolor == "red")) || (((SomePred < 2) || bHadPred) && ((z.tu > -60) || ((z.tu < -80000) && !bD1Added))  ) )
//      || (z.tu > -60)
      
      {
      CurrentTripZ[CurrentTripZ.length] = z;
      
      let bZZ = false;
      if((LegStartid != null) && (LegStartid == z.stop_id)) 
      {
        bZcolor = true; 
        bZZ = true;
        CurrentTG = z.tg;
        CurrentTString = z.hh + ":" + z.mm;
        if(z.bPM) CurrentTString += " PM";
      }
 //     if(bGotStat && (stattime > z.tg) && !z.pred) 
      if(z.bstat) bstatoccured = true;
      if(bGotStat && !bstatoccured)
      {
        zccolor = "lightgrey";
        zs = "-";
        z.delta = "";
      }
      
      zccolor = getBackgroundColorForMode(z.smode);
      zscolor = getTimeColorForMode(z.smode);
      let zscolor2 = getTextColorForMode(z.smode);
      let zcc = "yellow";
      if(!bZcolor) zcc = zccolor;
          
//      report("7233 " + z.smode + " " + zccolor + " " + zscolor + " " + zscolor2);
//      if(zccolor == "black") zccolor = "lightgrey";
      sqs += "<tr class=\'datatable\' style=\'line-height: 40px;\'><td  class='dtb' style=\'width:10%;background-color: " + zccolor + ";color: " + zscolor + "\'><a style=\"color:" + zscolor + "\" href=\'javascript:showTripAdjust(" + i + ")\'>" + zs + "</a></td><td  class='dtb' style=\'width:9%;background-color: " + zccolor + ";color:" + zscolor + "\'>" + z.delta + "</td><td class='dtb' style=\'width:80%;background-color: " + zccolor + "\'><a style=\"color:" + zscolor2 + "\" href=\'javascript:showTrainBoard(" + i + ",\"" + z.stop_id + "\")\'>" + z.text + "</a>";
      
//      </td><td  class='dtb' style=\'width:1%;background-color: " + zcc + "\'></td></tr>";
      
      if((typeof z.wchair !== 'undefined') && (z.wchair != ""))
      {
        if(z.wchair == "1") 
        {
            sqs += "<img id=\'wcb_" + i + "\' width='36' height='36' title='Wheelchair OK' alt='Wheelchair OK'>";
            wcs.push("wcb_" + i );
        }
        else if(z.wchair == "2")
        {
            sqs += "<img id=\'wcr_" + i + "\' width='36' height='36' title='No Wheelchair' alt='No Wheelchair'>";
            wcs.push("wcr_" + i );
        }
        else if(z.wchair == "3") 
        {
            sqs +="<img id=\'wcy_" + i + "\' width='36' height='36' title='Wheelchair Partial' alt='Wheelchair Partial'>";
            wcs.push("wcy_" + i );
        }
      }
      sqs += "</td><td  class='dtb' style=\'width:1%;background-color: " + zcc + "\'></td></tr>";
      
      
     if((LegStartid != null) && (LegDestid == z.stop_id)) 
      {
        bZcolor = false;
//        report("LegDestid = " + z.stop_id);
      }
//      report("7004 " + z.track);
      if(bZZ) 
      {
//        report("bZZ begin trip true for " + z.stop_id);
        BSND[BSND.length] = new ASND0(z.zelta, tp.route_id, t.trip_name, tp.direction_name, hs, "", tp.status, z.track);
        BSND[BSND.length - 1].stop_id = z.stop_id;
        BSND[BSND.length -1].hh = z.hh;  
        BSND[BSND.length -1].mm = z.mm;
        BSND[BSND.length -1].bPM = z.bPM;
        BSND[BSND.length -1].shape_id = t.shape_id;
      }
      else if(PrintMode || (bZF && (zccolor != "lightgrey")))
      {
//        report("bZF next stop true for " + z.stop_id);
        bZF = false;
        BSND[BSND.length] = new ASND0(z.zelta, tp.route_id, t.trip_name, tp.direction_name, hs, "", tp.status, z.track);
        BSND[BSND.length - 1].stop_id = z.stop_id;
        BSND[BSND.length -1].hh = z.hh;  
        BSND[BSND.length -1].mm = z.mm;
        BSND[BSND.length -1].bPM = z.bPM;
      }
      }
      i += 1;
    }
    
    }

        sqs += "</table>";
//    report("ASND.length = " + ASND.length);
    document.getElementById("pinz").innerHTML = sqs;
    
    for(let jj = 0; jj < wcs.length; jj++)
    {
      if(wcs[jj].indexOf("wcb_") == 0)
      {
        document.getElementById(wcs[jj]).src = wchair2.src;
      }
      else if(wcs[jj].indexOf("wcr_") == 0)
      {
        document.getElementById(wcs[jj]).src = wchairr.src;
      }
      else if(wcs[jj].indexOf("wcy_") == 0)
      {
        document.getElementById(wcs[jj]).src = wchairy.src;
      }
    }

    if(bgotData) 
    {
      if(!bForceSked) PSTATUS = "";
      Greencount = 0;
    }
    else 
    {
      bForceSked = false;
      if(!bUseSked)
      {
        if((typeof tp !== 'undefined') && (tp.route_id.indexOf("Green") == 0))
        {
          report("check if trip_id changed from " + tp.trip_id );
          let p9 = getTripForVehicle(tr.route_id, tp.trip_id);
          p9.then(function(data) {
            report("changing Green Line trip_id from " + CurrentTripID + " to " + data + ".");
            CurrentTripID = data;
          }).catch(function(error) {
            document.getElementById("pinz").innerHTML = "<span style='font-size: 8pt;color:black;'>No prediction data from server.</span>";
            report("No prediction data for trip_id " + CurrentTripID + " capt " + capt);
            report("3850:" + error);
            bForceSked = true;
          } );
        }
        else
        {
          document.getElementById("pinz").innerHTML = "<span style='font-size: 8pt;color:black;'>No prediction data from server.</span>";
          report("No prediction data for trip_id " + CurrentTripID + " capt " + capt);
          bForceSked = true;
        }
        checktime3(qupdateDisplay);
      }
      else
      {
        document.getElementById("pinz").innerHTML = "<span style='font-size: 8pt;color:black;'>No schedule data from server.</span>";
      }
        displaystop = "";
    }
    document.getElementById("aa").innerHTML = ah;
    let abx = document.getElementById("ab");
    if((abx !== undefined) && (abx != null)) abx.style.background = abcolor;
    resolve();
   }); /*.catch(function(e) {
    report("6974 DISPLAY1: " + e);
    }); */
   
}
else if(DISPLAYTYPE == 2)
{
  bshowAlerts = false;
  pcolor = "var(--Ccolor)"; //"white";
  let s = "<span style='font-size: 10pt;color:black; float:left; text-align:left;'>From: " + getStopNameFromID(ctnx.startid);
  let dt = new Date(1000 * ctnx.datetime).toLocaleString();
  s += "<br>To: " + getStopNameFromID(ctnx.destid) + "&nbsp;&nbsp;&nbsp;&nbsp;" +  dt + "<br></span>";
  s += "<table class='datatable'><tr><th style='width:20%'>Depart</th><th style='width:20%'>Arrive</th><th style='width:20%'>Duration</th><th style='width:20%'>Changes</th><th>&nbsp;</th></tr>";
  ctnx.TripOptions.sort(tripOptionCompare);
  let bhbc = !document.getElementById("hbc").checked;
  let bGreenOccurred = false;
  let kk = ctnx.TripOptions.length;
  let ii = 0;
  while (ii < kk)
  {
    let tf = ctnx.TripOptions[ii];
    let bok = checkTripOption(tf);
    let t1 = getTimeString(tf.legs[0].starttime);
    let t2 = getTimeString(tf.legs[tf.legs.length -1].desttime);
    let t3 = tf.legs[tf.legs.length -1].desttime - tf.legs[0].starttime;
    let t30 = tf.check.duration;
    let myt = (Math.floor(t3/60) % 60);
    myt = myt.toString();
    let mys = (Math.floor(t30/60) % 60);
    mys = mys.toString();
    if(myt.length == 1) myt = "0" + myt;
    if(mys.length == 1) mys = "0" + mys;
    let cyx = Math.floor(t3/3600);
    let st3 = cyx + ":" + myt;
    let st4 = Math.floor(t30/3600) + ":" + mys;
    let ccolor = "lightgreen";
    let tu = tf.legs[0].starttime - getTTime();
//    let tu = tf.legs[0].starttime - NOW/1000;
    if(tu < 0) ccolor = "lightgrey";
    else if (tu < 300) ccolor = "red";
    if(!bok) 
    {
      st3 = "-";
      t2 = "-";
      ccolor = "gray";
    }
    if(ccolor == "lightgreen")
    {
      bGreenOccurred = true;
    }
    if(bok || bhbc) // || !bGreenOccurred)
//    s += "<tr class='datatable' style=\'background-color:" + ccolor + ";line-height: 40px;\' onClick=\'showDetails(" + ii + ")\'><td>" + t1 + "</td><td>" + t2 + "</td><td>" + st3 + " (" + st4 + ")</td><td>" + (tf.legs.length -1) + "</td><td></td></tr>";
    s += "<tr class='datatable' style=\'background-color:" + ccolor + ";line-height: 40px;\' onClick=\'showDetails(" + ii + ")\'><td>" + t1 + "</td><td>" + t2 + "</td><td>" + st4 + "</td><td>" + (tf.legs.length -1) + "</td><td></td></tr>";
    ii += 1;
  }
  s += "</table>";
  
  document.getElementById("pinz").innerHTML = s;
  document.getElementById("aa").innerHTML = "";
  if(bAnnounceConnections) announceConnections();
  resolve();
}
else if(DISPLAYTYPE == 3)
{
  bshowAlerts = false;
  let ss = getStopNameFromID(ctnx.startid);
  let s = "<span style='font-size: 10pt;color:black; float:left; text-align:left;'>From: " + getStopNameFromID(ctnx.startid);
  let dt = new Date(1000 * ctnx.datetime).toLocaleString();
  s += "<br>To: " + getStopNameFromID(ctnx.destid) + "&nbsp;&nbsp;&nbsp;&nbsp;" +  dt + "<br></span>";
  s += "<table class='datatable'><tr><th style='width:10%'>Time</th><th style='width:10%'>Stop</th><th style='width:20%'>Remark</th></tr>";
  let lastlegdesttime = 0;
  let lastlegdestid = null;
  let legs = null;
  let kk = 0;
  if(ctnx.TripOptions[DETAILSINDEX] === undefined)
  {
    report("ctnx.TripOptions[" + DETAILSINDEX + "] is undefined");
  }
  else
  {
    legs = ctnx.TripOptions[DETAILSINDEX].legs;
    kk = legs.length;
  }
  let bFail = false;
  if(legs != null)
  {
  let sx = getStopNameFromID(legs[0].startid);
//  alert(ss + "\n" + getStopNameFromID(legs[0].startid) + "\n" + Place);
  if((sx != Place) && (kk > 0))
  {
      let pt1 = getPositionForName(sx);
      let pt2 = getPositionForName(Place);
      let d = getDistanceBetween(pt1.x, pt1.y, Xpos, Ypos);
      d = Math.ceil(10 * d) / 10;
      let td = d * 19.5;
      td = Math.ceil(10 * td) / 10;
      let tu = legs[0].starttime - (60 * td) - getTTime();
      let ccolor = "lightgreen";
      if(tu < 0) ccolor = "lightgrey";
      else if (tu < 300) ccolor = "red";
 //     alert("walk distance = " + d);
      if((d < WALK_LIMIT) && (d > .05))
      {
        s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td colspan=3 class='datatable' style=\'background-color:" + ccolor + "\'>Walk  (" + td + " min ) " + d + " mi from here to " + sx  + "</td></tr>";
      }
      else if((d >= WALK_LIMIT) && (d < 2))
      {
        ccolor = "lightgrey";
        s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td colspan=3 class='datatable' style=\'background-color:" + ccolor + "\'>Start station, " + sx + ", is " + d + " mi away from here.</td></tr>";
      }
      else
      {
        let d2 = getDistanceBetween(pt1.x, pt1.y, pt2.x, pt2.y);
        d2 = Math.ceil(10 * d2) / 10;
        let td = d2 * 19.5;
        td = Math.ceil(10 * td) / 10;
        if(d < 2)
        {
        s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td colspan=3 class='datatable' style=\'background-color:" + ccolor + "\'>Walk  (" + td + " min ) " + d + " mi from " + ss + " to " + sx  + "</td></tr>";
        
        }
        else 
        {
        ccolor = "lightgrey";
        s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td colspan=3 class='datatable' style=\'background-color:" + ccolor + "\'>Start station, " + sx + ", is " + d + " mi away from here and " + d2 + " mi away from " + Place + ".</td></tr>";
        } 
      }
  }
  }
  
  let ii = 0;
  while (ii < kk)
  {
    let leg = legs[ii];
    let t1 = getTimeString(leg.starttime);
    let t2 = getTimeString(leg.desttime);
    let t3 = ""; //Math.round((leg.desttime - leg.starttime) / 60);
    
    let trs = Number(leg.starttime) + 60 * getTZOffset(leg.startid);
    let trd = Number(leg.desttime) +  60 * getTZOffset(leg.destid);
    let duration = Math.floor((trd - trs) / 60);
    let hrs = Math.floor(duration / 60);
    let min = duration % 60;
    if(hrs == 0) t3 = min;
    else if(hrs == 1) t3 = hrs + " hr " + min;
    else t3 = hrs + " hrs " + min;

    let ctime = (leg.starttime - lastlegdesttime) / 60; // minutes
    let cctime = ctime;
    if(ctime < 0) 
    {
        ctime = "no data";
        t1 = "-";
        t2 = "-";
        bFail = true;
        if(typeof leg.frequency != 'undefined')
        {
          report("a. leg.starttime = " + leg.starttime + " leg.desttime = " + leg.desttime);
          leg.starttime = lastlegdesttime + 60 * leg.frequency;
          leg.desttime  += leg.starttime;
          report("b. leg.starttime = " + leg.starttime + " leg.desttime = " + leg.desttime);
        }
    }
    else if(ctime > 60)
    {
      let cyx = Math.floor(ctime/60);
      if(cyx > 24) // and running today
      {
        cyx = cyx % 24;
      }
      ctime = cyx + " hr " + Math.floor(ctime % 60) + " min";
    }
    else ctime = Math.floor(ctime) + " min";
    lastlegdesttime = leg.desttime;
    let ccolor = "lightgreen";
    let tu = leg.starttime - getTTime();
    if((tu < 0) || bFail) ccolor = "lightgrey";
    else if (tu < 300) ccolor = "red";
    let vcolor = ccolor;
    let dx = "";
    if((leg.tripleg != null) && (lastlegdestid != null))
    {
      let d0 = getPositionForId(lastlegdestid);
      if((d0 == null) && (lastlegdestid.indexOf("place-") == 0)) d0 = getPositionForParent(lastlegdestid);
      let d1 = getPositionForId(leg.startid);
      if((d1 == null) && (leg.startid.indexOf("place-") == 0)) d1 = getPositionForParent(leg.startid);
      
      let d = getDistanceBetween(d0.x, d0.y, d1.x, d1.y);
      d = Math.round(100 * d) / 100;
      let td = Math.ceil(d * 19.5);
      if(d > .05) dx = "&nbsp;&nbsp;&nbsp;(Walk " + d + " mi in est " + td + " min)";
      if((td > 0) && (td >= cctime)) vcolor = "orange";
    }
    if(cctime < 8) vcolor = "orange";
    if(ii > 0) s += "<tr style=\'background-color:" + vcolor + ";line-height: 40px;\'><td colspan=3 class='datatable' style=\'background-color:" + vcolor + "\'>Change  (" + ctime + ")" + dx + "</td></tr>";
    s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td>Depart " + t1 + "</td><td>" + getStopNameFromID(leg.startid) + "</td><td></td></tr>";
    let hs = "";
    if(leg.tripleg != null)
    {
    lastlegdestid = leg.destid;
    let ridp = getPhraseForRoute(leg.routeid, leg.tripleg.trip_name);
//    let hs = getHeadsignFromTripId(leg.tripleg.trip_id);
    let hs = leg.tripleg.trip_headsign;
//    if(hs == "") hs = leg.direction_name + "  " + leg.tripleg.trip_name + " " + leg.tripleg.trip_id;
    if(hs == "") hs = leg.direction_name + "  " + ridp + " " + leg.tripleg.trip_id;
    else hs = "to " + hs + ": \u00A0 \u00A0 " + leg.direction_name + "  " + ridp + " " + leg.tripleg.trip_id + " " + leg.tripleg.trip_name;
//    report("leg.routeid = " + leg.routeid);
    let r4 = Math.round(leg.dist /duration * 60);
    if(!isNaN(leg.routeid)) hs = "Bus " + leg.routeid + " " + hs;
    s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td colspan='3'> <span style=\'font-size: 9pt;color:#0000cc;\'><a href=\'javascript:showTrip(\"" + leg.tripleg.trip_id + "\", \"" + hs + "\", \"" + leg.startid + "\", \"" + leg.destid + "\", " + leg.starttime + ")\'>" + hs + "</a></span></td></tr>";
    s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td>Arrive " + t2 + "</td><td>" + getStopNameFromID(leg.destid) + "</td><td>(" + leg.dist + " mi, " + t3 + " min, " + r4 + " mi/hr)</td></tr>";
    }
    else
    {
    s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td colspan='3'> " + hs + "</td></tr>";
    if(!isNaN(leg.routeid))
    {
      s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td colspan='3'> <span style=\'font-size: 9pt;color:#0000cc;\'><a href=\'javascript:findBusNumberN(" + leg.routeid + ")\'>Bus " + leg.routeid + "</a></span></td></tr>";
    }
    else
    {
      s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td colspan='3'><span style=\'font-size: 9pt;\'> No trip found for route " + leg.routeid + "</span></td></tr>";   
    }
    s += "<tr style=\'background-color:" + ccolor + ";line-height: 40px;\'><td>Arrive " + t2 + "</td><td>" + getStopNameFromID(leg.destid) + "</td><td>(" + leg.dist + " mi, " + t3 + " min, " + r4 + " mi/hr)</td></tr>";
    }
    ii += 1;
  }
  if((lastlegdestid != ctnx.destid) && (lastlegdestid != null))
  {
//    report("lastlegdestid = " + lastlegdestid + " " + ctnx.destid);
    let d0 = getPositionForId(lastlegdestid);
    let d1 = getPositionForId(ctnx.destid);
    if((d0 != null)  && (d1 != null))
    {
      let dg = getDistanceBetween(d0.x, d0.y, d1.x, d1.y);
      dg = Math.round(100 * dg) / 100;
      let td = Math.round(dg * 19.5);
      s += "<tr style=\'background-color: lightgrey;line-height: 40px;\'><td colspan=3>Desired destination is " + dg + " mi away. (" + td + " min)</td></tr>";
    }
    
  }
  s += "</table>";
  
  //s += "</span>";
  document.getElementById("pinz").innerHTML = s;
  document.getElementById("aa").innerHTML = "";
  resolve();
}
else if(DISPLAYTYPE == 4)
{
  let p = null;
  bForceSked = false;
  bUseBuiltIn = false;
  updateVehiclesA(BusNum);
  if((BusNum == lastBusNum) && (skedbyroutes != null))
  {
    qcolor = "var(--Btext)";
    if(skedbyroutes != null)
    {
      p = new Promise(function(resolve, reject) {
        resolve(skedbyroutes);
      } );  
    }
    else
    {
      lastBusNum = -1;
      p = new Promise(function(resolve, reject) {
        reject("6876 null 404");
      } );  
    }
  }
  else
  {
    lastBusNum = BusNum;
    clearArray(CurrentTrips);
    capcolor = "red";
    qcolor = "red";
    document.getElementById("sb").style.color = capcolor;
//    report("7434 DISPLAYTYPE == 4 " + BusNum);
//    p = service.getScheduleByRoutes(BusNum, document.getElementById("max_time").value, document.getElementById("max_trips").value, null);
//    report("BusNum = " + BusNum + " " + BusNum.toString().indexOf("MTA"));
    if((BusNum.toString().indexOf("Y") != 0) && (BusNum.toString().indexOf("CTA") != 0) && (BusNum.toString().indexOf("SF") != 0) && (BusNum.toString().indexOf("LAM") != 0) && (BusNum.toString().indexOf("MTA") != 0) && (BusNum.toString().indexOf("RIPT") != 0) && (BusNum.toString().indexOf("MSLB") != 0) && (BusNum.toString().indexOf("WMB") != 0))
    {
//      report("7742 " + BusNum);
      p = service.getPredictionByRoute(BusNum, document.getElementById("max_time").value, document.getElementById("max_trips").value, null);
    }
    else if(BusNum.toString().indexOf("MTA") == 0)
    {
      p = serviceE.getPredictionByRoute(BusNum, document.getElementById("max_time").value, document.getElementById("max_trips").value, null);
    }
    else
    {
//      report("7708 "+ BusNum);
      p = serviceE.getScheduleByRoutes(BusNum, document.getElementById("max_time").value, document.getElementById("max_trips").value, null);
    }
  }
  p.then(function(t) {
//     report("7468 " + JSON.stringify(t, null, 4));
     pcolor = "var(--Ccolor)"; //"white";
     capcolor = "black";
     capcolor = "var(--Btext)";
     qcolor = "var(--Btext)";
     document.getElementById("sb").style.color = capcolor;
     skedbyroutes = t;
     let tbl = document.createElement("table");
     tbl.className = "datatable";
     let tblBody = document.createElement("tbody");
     let t0 = t.mode;
     let k0 = t0.length;
     let i0 = 0;
     while(i0 < k0)
     {
     let t1 = t0[i0].route;
     let k1 = t1.length;
     let i1 = 0;
     while(i1 < k1)
     {
       let r = t1[i1].route_id;
       let t2 = t1[i1].direction;
       let k2 = t2.length;
       let i2 = 0;

       let t3 = [];
       while(i2 < k2)
       {
         t3 = t3.concat(t2[i2].trip);
         i2 += 1;
       }
       
 //      while(i2 < k2)
       {
 //        let t3 = t2[i2].trip;
         let k3 = t3.length;
         if(k3 > 1) t3.sort(tripCompare2);
         clearArray(DSND);
         let i3 = 0;
//         report("7806 " + JSON.stringify(t3, null, 4));
         CurrentTrips = t3;
         let fabdisplayed = 0;
         while(i3 < k3)
         {
            if((typeof t3[i3] !== 'undefined') && (typeof t3[i3].stop[0] !== 'undefined') && (typeof t3[i3].stop[0] !== null))
            {
            CurrentTrips[i3].route_id = r;
            let row = document.createElement("tr");
            row.className = "datatable";
            let cell = document.createElement("td");
            cell.className = "datatable";
//            let s = t3[i3].trip_name;
            let s = "";
            let se = 0;
            let dst =null;
            let tnow = Math.floor(NOW / 1000);
            if(t3[i3].stop[0] == null) se = 0;
            else
            {
              let st = t3[i3].stop[0].sch_dep_dt;
//              dst = new Date(st * 1000);
              se = t3[i3].stop[t3[i3].stop.length - 1].sch_arr_dt;
            }
            let ccolor = "lightgreen";
            if(tnow > se) {ccolor = "lightgrey";}
//            dst = null;
            let bs = false;
            let j = 0;
            let kk = t3[i3].stop.length;
            let pt2 = getParentIdFromId(Place_id);
//            report("7518 " + dst.getHours() + " " + dst.getMinutes());
            while(!bs && (j < kk))
            {
              if(t3[i3].stop[j] != null)
              {
                let pt1 = getParentIdFromId(t3[i3].stop[j].stop_id);
                if(pt1 == pt2)
                {
                  bs = true;
                  let ss = t3[i3].stop[j].sch_dep_dt;
                  dst = new Date(ss * 1000);
                  if(tnow > ss) {ccolor = "lightgrey";}
                  else if(tnow > ss - 300) ccolor = "red";
                }
              }
              j += 1;
            }
//            if(!bs) ccolor = "lightgrey";
//            if(s == "")
            if(dst != null)
            {
              let h = dst.getHours();
              let m = dst.getMinutes().toString();
              if(m.length == 1) m = "0" + m;
              if(!((h == 0) && (m == 0)))
              {
                if(h == 0) h = 12;
                if(h > 12) s += " " + (h - 12) + ":" + m + " PM";
                else s += " " + h + ":" + m;
              }
              s += " to " + t3[i3].trip_headsign;
            }
            else s += " to " + t3[i3].trip_headsign;
            D4stat = "";
            D4stat1 = "";
            let elm = getOccImg(r, t3[i3].trip_id, 0);
            if(typeof t3[i3].status !== 'undefined') D4stat = t3[i3].status;
            let cellText = document.createTextNode(s + " " + D4stat + " (" + t3[i3].trip_id + ")");
            cell.appendChild(cellText);
            DSND[DSND.length] = {
                route_id: r,
                trip_id: t3[i3].trip_id,
                trip_name: t3[i3].trip_name,
                dest: t3[i3].trip_headsign,
                stat: D4stat + ". " + D4stat1
                };
            if(elm != null)
            {
              cell.appendChild(elm);
            }
            cell.style.width = "10%";
            cell.style.backgroundColor = ccolor;
//            if((ccolor != "lightgrey") && (fabdisplayed < FABMAX.value)) 
            if((ccolor != "lightgrey") && (fabdisplayed < document.getElementById("max_trips").value)) 
            {
              row.appendChild(cell);
              fabdisplayed += 1;
            }
            row.trip = t3[i3];
            row.addEventListener("click",function() {showTripSchedule1(this.rowIndex);} );
            tblBody.appendChild(row);
            }
            i3 += 1;
         }
//         i2 += 1;
     }
     i1 += 1;
     }
     i0 += 1;
    }
    tbl.appendChild(tblBody);
    tbl.setAttribute("align", "center");
    let iff = document.getElementById("pinz");

    while(iff.firstChild)
    {
        iff.removeChild(iff.firstChild);
    }
    iff.appendChild(tbl);
    document.getElementById("aa").innerHTML = "";
    if(CurrentTrips.length == 0) skedbyroutes = null;
    resolve();
   } ); /*.catch(function(t) {
    pcolor = "var(--Ccolor)"; //"white";
    capcolor = "black"
    document.getElementById("sb").style.color = capcolor;
//    if((BusNum.indexOf("Y") != 0) && (BusNum.indexOf("CTA") != 0))
    if((BusNum.indexOf("Y") == 0) || (BusNum.indexOf("CTA") == 0)|| (BusNum.indexOf("SFB") == 0))
    {
      if(bOnLine) s+= "Trying to load bus data.";
      else s += "Must be on-line to get bus data.";
    }
    else
    {
      let s = t.toString();
      if(s.indexOf("404") != -1) s += " No data for this route on the server.";
      report("Find Bus Error:\n" + s);
//      if(CurrentTripID == null) DISPLAYTYPE = 0;
//      else DISPLAYTYPE = 1;
//      report(t);
    }
    reject(t);
  }); */
}
else if(DISPLAYTYPE == 5) // What's Nearby
{
  let a = Xpos;
  let b = Ypos;
  let o = null;
  if(document.getElementById("usn").checked) // use selected as nearby
  {
    SelectedPlace = getStopIdFromName(Place);
    let pt = getPositionForId(SelectedPlace);
    a = pt.x;
    b = pt.y;
  }
  let t = getNearbyStops(a, b, true);
  if(t.length == 0)
  {
      o = new Object();
      o.stop_id = getNearestStation(a, b);
      o.stop_name = o.stop_id;
      o.distance = gnsd;
      if(t.length == 0) t[0] = o;
  }
  display5 = t;
  displaylat = a;
  displaylon = b;
//  report("7954 " + a + " " + b + " " + o.stop_id);
  let p2 = service.getPredictionByLocation(a, b);
  p2.then(function(data) {
//      report("7957 " + data.data[0].id);
  let t = null;
  if((data != null) && (data.data.length > 0))
  {
  let t = data.data;
  let k = t.length;
  let i = 0;
  clearArray(CSND);
  while(i < k)
    {
        let tp = t[i];
        let tstop = tp.relationships.stop.data.id;
        let ttime =  getOldTime(tp.attributes.departure_time);
        let ttrip = tp.relationships.trip.data.id;
        let tf = getThisTypeInfo("trip", ttrip, data);
        let trr = tp.relationships.route.data.id
        let headsign = "";
        if(tf != null) headsign = tf.attributes.headsign;
        if(isNaN(ttime)) ttime =  getOldTime(tp.attributes.arrival_time);
        let stp = getStopIndexFromDisplay5(tstop);
        if((stp != -1) && (ttime != null) && (ttime != "null"))
        {
          if((typeof display5[stp].ttime === 'undefined') || (ttime < display5[stp].ttime))
          {
            display5[stp].ttime = ttime;
            display5[stp].headsign = headsign;
            display5[stp].route = trr;
            display5[stp].ttrip = ttrip;
          }
        }
        i += 1;
    }
  }
  
  let s = "<table class='datatable'><tr><th class='dtb'  style='width:10%'>Type</th><th class='dtb' style='width:60%'>Stop</th><th class='dtb' >Next Event (Routes)</th></tr>";
  t = display5;
  let k = t.length;
  let i = 0;
  for(i=0; i<k; i+=1)
  {
      if((i == 0) || (t[i].distance < WALK_LIMIT))
      {
         let sg = "Train";
         let sm = "";
         if(t[i].stop_name.indexOf("@") != -1)
         { 
           sg = "Bus";
           sm = " Number " + t[i].route + ", ";
         }
         else if(isRailStop(t[i].stop_id)) sg = "Train";
         else if(isSubwayStop(t[i].stop_id)) 
         {
           sg = "Subway";
           if(t[i].stop_id.indexOf("CG") == 0) sg = "L Train";
           sm = " " + t[i].route + " Line ";
         }
         else if(t[i].stop_id.indexOf("SSL") == 0) sg = "Train";
         else if(t[i].stop_id.indexOf("B_") == 0) sg = "Train";
         else if(t[i].stop_id.indexOf("SEP_") == 0) sg = "Train";
         else if(t[i].stop_id.indexOf("SF_") == 0) sg = "Muni";
         else if(t[i].stop_id.indexOf("Z_") == 0) sg = "Train";
         else sg = "Bus";

         let sz = "";
         let csn = new CSND0();
         csn.type = sg;
         if(typeof t[i].headsign !== 'undefined') 
         {
           sz = " to " + t[i].headsign;
           csn.headsign = t[i].headsign;
         }
         
         let tu = t[i].ttime - getTTime();
         let ccolor = "lightgrey";
         if(tu < 0) ccolor = "lightgrey";
         else if (tu < 300) ccolor = "red";
         else ccolor = "lightgreen";
         
         if(typeof t[i].ttime !== 'undefined') sm += getTimeString(t[i].ttime) + sz;
         else sm = " ";
         let dff = Math.round(t[i].distance * 100) / 100;
         csn.timestring = sm;
         csn.stop_name = t[i].stop_name;
         csn.stop_id = t[i].stop_id;
         csn.distance = dff;
         csn.route = t[i].route;
         
         let sf = "";
         if((typeof t[i].routes !== 'undefined') && (t[i].routes.length > 0) && (t[i].routes.length < 40))
         {
             let rsp = t[i].routes.replace(/,/g, ', ');
             sf = " (" + rsp + ")";
         }
         
         s += "<tr class=\'datatable\'  style=\'background-color:" + ccolor + "; line-height: 40px;\'><td style='width:10%'>" + sg + "</td><td class='dtb1' style='width:60%'><a href=\'javascript:showTrainBoardz(\"" + t[i].stop_id + "\")\'>" + t[i].stop_name + " : " + dff + " mi (" + getWalkTime(dff) + " min)</a></td><td><a href=\'javascript:showTrip(\"" + t[i].ttrip + "\", \"" + t[i].headsign + "\",null,null,null)\')>" + sm + "</a>" + sf + "</td></tr>";
         CSND[CSND.length] = csn;
      }
  }
  s += "</table>";
  if(bAnnounceNearby) announceNearby();
  capcolor = "black";
  document.getElementById("cap").style.color = "var(--Btext)"; //capcolor;    
  let s2 = "<a href=\"javascript:whatsNearby()\"><img id='rf6' alt='refresh' width='30' height='22'></a>"; 
  document.getElementById("cap").innerHTML = "What\'s Nearby" + s2;
  document.getElementById("rf6").src = refresharrow.src;
  document.getElementById("pinz").innerHTML = s;
  document.getElementById("aa").innerHTML = "";
    resolve();  
    } ).catch(function(error) {
        report("8060 " + error);
        DISPLAYTYPE = 0;
        reject();
    } );
}
else if(DISPLAYTYPE == 6)  // show strategies
{
  bshowAlerts = false;
  pcolor = "var(--Ccolor)"; //"white";
  let s = "<span style='font-size: 10pt;color:black; float:left; text-align:left;'>From: " + getStopNameFromID(ctnx.startid);
  let dt = new Date(1000 * ctnx.datetime).toLocaleString();
  s += "<br>To: " + getStopNameFromID(ctnx.destid) + "&nbsp;&nbsp;&nbsp;&nbsp;" +  dt + "<br></span>";
  s += "<table class='datatable'><thead><tr><th style='width:20%'>Strategy</th><th style='width:80%'>Route</th></tr></thead><tbody>";
  let ssize = TS.length;
  let i6 = 0;
  for(i6 =0; i6 < ssize; i6++)
  {
    let ccolor = "lightgreen";
    s += "<tr class='datatable' style=\'background-color:" + ccolor +"'><td>"+ i6 + "</td><td style='text-align:left'>"
    let lsize = TS[i6].length;
    let i7 = 0;
    for(i7 = 0; i7 < lsize; i7++)
    {
      let leg = TS[i6][i7];
      let sw1 = leg.routeid;
      if(sw1 == "") sw1 = " No route found."
      else
      {
          var r = getRoute(leg.routeid);
          if(r != null) sw1 = r.route_name;
      }
//      s +=  "<br>Leg " + i7 + ":  " + getStopNameFromID(leg.startid) + " (" + leg.startid + ") to " + getStopNameFromID(leg.destid) + " (" + leg.destid + ") : " + sw1 + " : " + leg.routeS + "<br>";
      s +=  "<br>Leg " + i7 + ":  " + getStopNameFromID(leg.startid) + " to " + getStopNameFromID(leg.destid) + " : " + sw1 + " : " + leg.routeS + "<br>";
    }
    s += "<br></td></tr>";
  }
  s += "</tbody></table>";
  document.getElementById("pinz").innerHTML = s;
  if(bAnnounceConnections) announceConnections();
//  report("\n\n" + s + "\n\n");
  resolve();
}
else if(DISPLAYTYPE == 7)  // directions
{
  let ccolor = "lightgreen";
  bshowAlerts = false;
  pcolor = "var(--Ccolor)"; //"white";
  let s = "<button onclick='showDMap(true)' style='float:left'>Show Graph</button>";
  s += "<br><br><span style='font-size: 10pt;color:black; float:left; text-align:left;'>" + getStopNameFromID(Place_id);

  s += "<table class='datatable' style=\'background-color:" + ccolor +"'><thead><tr><th style='width:70%'>Entrances</th><th style='width:15%'>Distance</th><th>Bearing</th></tr></thead><tbody>";
  if(eopw != null)
  {
    let ssi = eopw.selectedDoorIndex;
    let k9 = eopw.DOORS.length;
    let i9 = 0;
    for(i9 = 0; i9 < k9; i9++)
    {
      let d2door = eopw.getDistanceToDoor(i9);
      if(d2door < 1) d2door = Math.round(5280 * d2door) + " feet away.";
      else d2door = " " + Math.round(d2door) + " miles away.";
      let dpt = eopw.getDoorLocation(i9);
      let bear = getBearing(Xpos, Ypos, dpt.lat, dpt.lon);
      let d = " N";
      if((bear > 22) && (bear < 68)) d = " NE";
      else if((bear >= 68) && (bear < 112)) d = " E"; 
      else if((bear >= 112) && (bear < 158)) d = " SE"; 
      else if((bear >= 158) && (bear < 202)) d = " S"; 
      else if((bear >= 202) && (bear < 248)) d = " SW"; 
      else if((bear >= 248) && (bear < 292)) d = " W"; 
      else if((bear >= 292) && (bear < 348)) d = " NW"; 
      
      
      let nm = eopw.getDoorName(i9).replaceAll("\"", "");
      if((nm.indexOf("Elevator") != -1) || (nm.indexOf("(EL") != -1))ccolor = "yellow";
      else if((nm.indexOf("Escalator") != -1) || (nm.indexOf("(ES") != -1)) ccolor = "orange";
      else ccolor = "lightgreen";
      if((ssi != null) && (ssi == i9)) ccolor = "#cc66ff";
    
      s += "<tr class='datatable' style=\'background-color:" + ccolor +"\'><td><a href=\'javascript:selectDoor(" + i9 + ")\'>" + nm + "</a></td><td>" + d2door + "</td><td>" + bear + d + "</td></tr>";  
    }
      
  }
  else report("7863 eopw is null");
  s += "</tbody></table>";
  document.getElementById("pinz").innerHTML = s;
  resolve();
}
else if(DISPLAYTYPE == 8)  // path
{
  let ccolor = "lightgreen";
  bshowAlerts = false;
  pcolor = "var(--Ccolor)"; //"white";
  s = "<table class='datatable' style=\'background-color:" + ccolor +"'><thead><tr><th>Step</th><th style='width:70%'>Instruction</th></tr></thead><tbody>";
  if(eopw != null)
  {

  }
  else report("7967 eopw is null");
  s += "</tbody></table>";
  document.getElementById("pinz").innerHTML = s;
  resolve();
}
else if(DISPLAYTYPE == 9)  // dest platform
{
  let ccolor = "lightgreen";
  bshowAlerts = false;
  pcolor = "var(--Ccolor)"; //"white";
  s = "<table class='datatable' style=\'background-color:" + ccolor +"'><thead><tr><th>Step</th><th style='width:70%'>Instruction</th></tr></thead><tbody>";
  if(eopw != null)
  {

  }
  else report("003 eopw is null");
  s += "</tbody></table>";
  document.getElementById("pinz").innerHTML = s;
  resolve();
}
else if(DISPLAYTYPE == 10)
{
  let ccolor = "lightgreen";
  s = "<table class='datatable' style=\'background-color:" + ccolor +"'><thead><tr><th>Step</th><th style='width:70%'>Instruction</th></tr></thead><tbody>";
  if(eopw != null)
  {

  }
  else report("003 eopw is null");
  s += "</tbody></table>";
  document.getElementById("pinz").innerHTML = s;
  resolve();
}

});
return(pz);
}

function getStopIndexFromDisplay5(tstop)
{
  let k = display5.length;
  let i = 0;
  let b = true;
  let n = -1;
  while(b && (i < k))
  {
    if(tstop == display5[i].stop_id)
    {
      n = i;
      b = false;
    }
    i += 1;
  }
  return(n);
}

const OAlerts = [ { alert_id : "EO_0001" , header_text : "Schedule data is shown.", effect: "NOTE"} ];
const OAlerts2 = [ { alert_id : "EO_0002" , header_text : "Unable to access servers.", effect: "NOTE" } ];
const OAlerts3 = [ { alert_id : "EO_0003" , header_text : "Unable to access T server.", effect: "NOTE" } ];


function getAlertData1()
{
  CloseMenu();
  LastAlertDataTime = 0;
  getAlertData();
}

function getAlertData()
{
  let tn = Date.now();
  if(bOnLine && (service != null) && (service.cname == "Service3") && ((AlertData == null) || ((tn - LastAlertDataTime) > 10000)))
  {
    LastAlertDataTime = tn;
    let p = service.getAlertData();
    p.then(function(d) {
      AlertData = d;
//      report("getAlertData got " + AlertData.length + " items");
    }).catch(function(e) {
      report(e);
    } );
  }
}


function toggleAlerts()
{
  if(bshowAlerts) bshowAlerts = false;
  else 
  {
//    getAlertData();
    checkAlerts(false);
    bshowAlerts = true;
  }
  updateDisplay();
}



function checkAlerts(bForce)
{
  if(bForce || (Place_id != last_stop_id) || (NOW - lastAlertsUpdate > 900000))
  {
    if(Place_id != last_stop_id)
    {
      last_stop_id = Place_id;
      AlertData = [];
      clearArray(DT0Alerts);
    }
    
    lastAlertsUpdate = NOW;
   
    if(DISPLAYTYPE == 0)
    {
      if(!isAssociate(Place_id)) 
      {
        let p = service.getAlertData();
        p.then(function(d) {
          AlertData = d;
          }).catch(function(e) {
 //         report("7662 " + e);
          });
      }
      else 
      {
        let routes = getRoutesS(Place_id);
        let p9 = serviceE.getAlertsByStop(Place_id, routes, null);
        if(p9 != null)
        {
          p9.then(function(az){
            clearArray(DT0Alerts);
 //    report("7677 az.length = " + az.length + " WxAlerts.length = " + WxAlerts.length);
            if(az.length > 0) 
            {
              DT0Alerts = az; //.concat(DT0Alerts);  
            }
            /*
            if(WxAlerts.length > 0)
            {
              DT0Alerts = WxAlerts.concat(DT0Alerts);  
            }
            */
            }).catch(function(e){
//             report("7632: " + e);
           });
 //          report("7634 checkAlerts  " + DT0Alerts.length + " " + MTA_ALERTS.length + " " + NJ_ALERTS.length);
        }
      }
      if((document.getElementById('bIncludeWx').checked))
      {
          /*
        let wid = getWXurl(Place_id);
        if((wid != last_wx_id) || (NOW - lastWXAlertsUpdate > 900000))
        {
          last_wx_id = wid;
          lastWXAlertsUpdate = NOW;
          p = getWXalerts(wid).then(function() {}
              ).catch(function(e){}
                );
        }
        */
        Weather.getWXalertsByStop(Place_id);
      }
      
    }
  }
}

function getDT0Alerts()
{
  /*
  if(!document.getElementById("api3").checked)
  {
  let p = service.getAlertHeadersByStop(DT0Stop);
  p.then(function(t) {
    DT0Alerts = t.alert_headers;
  } ).catch(function(t) {
    if(TFAIL) DT0Alerts = OAlerts3;
    report("DT0Alerts error " + t);
  } );
  }
  */
}

function getDT0Alerts1()
{
  let t = null;
  report("TFAIL = " + TFAIL);
  if(TFAIL) t = OAlerts3;
  return(t);
}

function getDT1Alerts()
{
  /*
  if(!document.getElementById("api3").checked)
  {
  let p = service.getAlertHeadersByRoute(DT1Route);
  p.then(function(t) {
    DT1Alerts = t.alert_headers;
    qupdateDisplay();
  } ).catch(function(t) {
    if(TFAIL) DT1Alerts = OAlerts3;
    report("DT1Alerts error " + t);
  } );
  }
  */
}

let TRIP_STARTTIME = 0;

function showTrip(trip_id, hs, startid, destid, starttime)
{
  CurrentTripID = trip_id;
  LegStartid = startid;
  LegDestid = destid;
  capt = hs;
  TRIP_STARTTIME = Number(starttime);
  bUseSked = true;
  bForceSked = true;
  DISPLAYTYPE = 1;
  updateDisplay();
}

function updateTripView()
{
  CloseMenu();
  if((CurrentTripID != null) && (CurrentTripID  != ""))
  {
    displaytripid = "";
    DISPLAYTYPE = 1;
    bD1Refresh = false;
    bgotData = false;
    qupdateDisplay();
  }
}

function getTimeString(tg)
{
  let tgd = new Date(Number(tg * 1000));
  let mm = tgd.getMinutes();
  if(mm < 10) mm = "0" + mm;
  let hh = tgd.getHours();
//      report("hh = " + hh + " mm = " + mm + " " + capt);
  let b = false;
  if(!document.getElementById("t24cb").checked)
  {
     if(hh > 11) b = true;
     if(hh > 12) hh -= 12;
     if(hh.toString() == "0") hh = "12";
  }
  else if(hh.toString() == "0") hh = "00";
  let s = hh + ":" + mm;
  if(b) s += " PM";
  return(s);
}

function getOccImg2(ostat)
{
   let elm = "";
   if((typeof ostat !== 'undefined') && (ostat != null))
   {
     if(!isNaN(ostat))
     {
       switch(ostat)
       {
         case 0: // empty
           break;
         case 1: // many
           elm = "<img src='images/os1.png' width='32' height='36' title='Many seats available' alt='Many seats'>";
           break;
         case 2: // few
           elm = "<img src='images/os2.png' width='32' height='36' title='Few seats available' alt='Few seats'>";
           break;
         case 3: //standing room only
           elm = "<img src='images/os3.png' width='32' height='36' title='Full' alt='Full'>";
           break;
         case 4: //crushed standing only
           elm = "<img src='images/os3.png' width='32' height='36' title='Full' alt='Full'>";
           break;
         case 5: //full
           elm = "<img src='images/os3.png' width='32' height='36' title='Full' alt='Full'>";
           break;
         case 6: // not accepting passengers
           break;
         case 7: // no data available  
           break;
         case 8: // not bordable
           break;
       }
     }
     else if(ostat.indexOf("MANY") != -1) 
     {
        elm = "<img src='images/os1.png' width='32' height='36' title='Many seats available' alt='Many seats'>";
     }
     else if(ostat.indexOf("FEW") != -1) 
     {
        elm = "<img src='images/os2.png' width='32' height='36' title='Few seats available' alt='Few seats'>";
     }
     else if(ostat.indexOf("FULL") != -1) 
     {
       elm = "<img src='images/os3.png' width='32' height='36' title='Full' alt='Full'>";
     }
   }
   return(elm);
}

function getOccImg(route_id, trip_id, mode)
{
  let elm = null;
  let otype = 0;
  if(VBR != null)
  {
    let b = false;
    let t0 = VBR.mode;
    let k0 = t0.length;
    let i0 = 0;
    while(!b && (i0 < k0))
    {
      let t1 = t0[i0].route;
      let k1 = t1.length;
 //     report("VBR routes length = " + k1);
      let i1 = 0;
      while(!b && (i1 < k1))
      {
        if(t1[i1].route_id == route_id)
        {
          let t2 = t1[i1].direction;
          let k2 = t2.length;
          let i2 = 0;
          while(!b && (i2 < k2))
          {
            let t3 = t2[i2].trip;
            let k3 = t3.length;
 //      report("VBR trips length = " + k3);
           let i3 = 0;
            while(!b && (i3 < k3))
            {
 //             report(trip_id + " " + t3[i3].trip_id + " " + (t3[i3].trip_id == trip_id));
              if(t3[i3].trip_id == trip_id)
              {
                b = true;
                let ostat = t3[i3].vehicle.ostat;
                D4stat1 = "";
                D4stat = t3[i3].vehicle.status + " " + getStopNameFromID(t3[i3].vehicle.stop_id); 
 //               report(trip_id + " " + ostat);
                if((typeof ostat !== 'undefined') && (ostat != null))
                {
                  if(!isNaN(ostat))
                  {
                    otype = ostat;
                    switch(ostat)
                    {
                        case 0: // empty
                          break;
                        case 1: // many
                          D4stat1 = "Many seats available.";
                          break;
                        case 2: // few
                          D4stat1 = "Few seats available.";
                          break;
                        case 3: //standing room only
                          D4stat1 = "Standing room only.";
                          break;
                        case 4: //crushed standing only
                          D4stat1 = "Crushed standing room only.";
                          break;
                        case 5: //full
                          D4stat1 = "Full";
                          break;
                        case 6: // not accepting passengers
                          D4stat1 = "Not accepting passengers.";
                          break;
                        case 7: // no data available  
                          break;
                        case 8: // not bordable
                          D4stat1 = "Do not board.";
                          break;
                    }
                  }
                  else if(ostat.indexOf("MANY") != -1) 
                  {
                    otype = 1;
                    D4stat1 = "Many seats available.";
                  }
                  else if(ostat.indexOf("FEW") != -1) 
                  {
                    otype = 2;
                    D4stat1 = "Few seats available.";
                  }
                  else if(ostat.indexOf("FULL") != -1) 
                  {
                    otype = 3;
                    D4stat1 = "Full";
                  }
                }
              }
              i3 += 1;
            }
            i2 += 1;
          }
        }
        i1 += 1;
      }
      i0 += 1;
    }
    if((otype != 0) && (mode == 0))
    {
//      elm = document.createElement("img");
      if(otype == 1)
      {
        elm = os1;
//        elm.setAttribute("src", "images/os1.png");
        elm.setAttribute("title", "Many seats available");
        elm.setAttribute("width", "32");
        elm.setAttribute("height", "36");
        elm.setAttribute("alt", "Many seats");
      }
      else if(otype == 2)
      {
        elm = os2;
        elm.setAttribute("src", "images/os2.png");
        elm.setAttribute("title", "Few seats available");
        elm.setAttribute("width", "32");
        elm.setAttribute("height", "36");
        elm.setAttribute("alt", "Few seats");
      }
      else if(otype == 3)
      {
        elm = os3;
        elm.setAttribute("src", "images/os3.png");
        elm.setAttribute("title", "Full");
        elm.setAttribute("width", "32");
        elm.setAttribute("height", "36");
        elm.setAttribute("alt", "Full");
      }
     
    }
    else if((otype != 0) && (mode == 1))
    {
      elm = "";
      if(otype == 1)
      {
        elm = os1;
        elm = "<img src='images/os1.png' width='32' height='36' title='Many seats available' alt='Many seats'>";
      }
      else if(otype == 2)
      {
        elm = os2;
        elm = "<img src='images/os2.png' width='32' height='36' title='Few seats available' alt='Few seats'>";
      }
      else if(otype == 3)
      {
        elm = os3;
        elm = "<img src='images/os3.png' width='32' height='36' title='Full' alt='Full'>";
      }
     
    }
  }
//  report("getOccImg " + route_id + " " + trip_id + " " + otype)
  return(elm);
}

function buschg()
{
  let p = null;
  let b = true;
  
  let ss = document.getElementById("buscarrierlist");
  let si = ss.selectedIndex;
  let cn = "";
  let cnt = "";
  switch(si)
  {
      case 0: // MBTA
          cn = "MBTABUS";
          cnt = "TB_1";
          break;
      case 1: // NJBus
          cn = "NJBUS";
          cnt = "NZ162";
          break;
      case 2: // CTA
          cn = "CTABUS";
          cnt = "CH1";
          break;
      case 3: // SF
          cn = "SFBUS";
          cnt = "SFB_4803";
          b = false;
          break;
      case 4 : // LA
          cn = "LABUS";
          cnt = "LAMB2497";
          b = false;
          break;
      case 5: // RIPTA
          cn = "RIPTA";
          cnt = "RIPT1380";
          b = false;
          break;
      case 6: // St Louis MSL
          cn = "MSL";
          cnt = "MSLB3499";
          b = false;
          break;
      case 7: // WashingtonDC
          cn = "WMB";
          cnt = "WMB20414";
          b = false;
          break;
      case 8: // NYC MTA
          cn = "MTA";
          cnt = "MTA307269";
          break;
      default:
          break;
  }
//  report("8671 buschg " + si + " " + cn + " " + cnt);
  if(cn != "")
  {
    if(!isCarrierLoaded(cn))
    {
      p = checkLoadable(cnt);
      if(p != null) p.then(() => {
          updateBusList();
          setTimeout(updateBusList, 1000);
      });
    }
    else updateBusList();
  }
}

function updateBusList()
{
  let ss = document.getElementById("buslist");
  let si = ss.selectedIndex;
  let i = ss.children.length - 1;
  while( i >= 0)
  {
    ss.remove(i);
    i -= 1;
  }
//  let bm = document.getElementById("mbtabus").checked;
  let k = 0;
  let inc = 5;
  let a = [];
  let offset = 2;
  let bsfsel = false;
  let ss2 = document.getElementById("buscarrierlist");
  let si2 = ss2.selectedIndex;
//  report("8678 updateBusList " + si2);
  switch(si2)
  {
      case 0:
        k = routes_bus.length;
        inc = 5;
        a = routes_bus;
        break;
      case 1:
        k = routes_NJBUS.length;
        inc = 4;
        a = routes_NJBUS;
        break;
      case 2:
        k = routes_CTABus.length;
        inc = 2;
        a = routes_CTABus;
        offset = 1;
        break;
      case 3:
//        report("8714 map = " +  (typeof SFMTARouteMapMap !== 'undefined'));
        if(typeof SFMTARouteMapMap !== 'undefined')
        {
        k = SFMTARouteMapMap.length;
        inc = 3;
        a = SFMTARouteMapMap;
        bsfsel = true;
        offset = 2;
        }
        break;
      case 4:
        if(typeof LAMBRouteMap !== 'undefined')
        {
        k = LAMBRouteMap.length;
        inc = 3;
        a = LAMBRouteMap;
        bsfsel = true;
        offset = 2;
        }
        break;
      case 5:
        if(typeof RIPTABusRoutes !== 'undefined')
        {
        k = RIPTABusRoutes.length;
        inc = 2;
        a = RIPTABusRoutes;
        offset = 1;
        }
        break;
      case 6:
        if(typeof MSL_BusRoutes !== 'undefined')
        {
          k = MSL_BusRoutes.length;
          inc = 3;
          a = MSL_BusRoutes;
          bsfsel = true;
          offset = 2;
        }
        break;
      case 7:
        if(typeof WMATA_BusRouteMap !== 'undefined')
        {
          k = WMATA_BusRouteMap.length;
          inc = 2;
          a = WMATA_BusRouteMap;
          offset = 1;
        }
        break;
      case 8:
        if(typeof routes_MTA !== 'undefined')
        {
        k = routes_MTA.length;
        inc = 3;
        bsfsel = true;
        a = routes_MTA;
        offset = 2;
        }
        break;
      default:
          break;
  }
  
  i = 0;
  while(i < k)
  {
    let op = document.createElement("option");
    let t = "";
    if(bsfsel) t = a[i+1] + " : " + a[i+ offset];
    else t = a[i] + " : " + a[i + offset];
//    t.replace('amp;', ''); // does not work
    op.text = t;
    ss.add(op);
    i += inc; 
  }
  if((si >= 0) && (si < k)) ss.selectedIndex = si;
}

function findBusNumber()
{
  buschg();
  menu("BusSel2");
}

function getBusNum(si2, i)
{
//  report("8682 getBusNum " + si2 + " " + i);
  let inc = 5;
  BusNum = "";
  BusDesc = "";
  
  switch(si2)
  {
      case 0:
        a = routes_bus;
        setRoutemap("MBTABUS", BusList, routes_bus);
        inc = 5;
        BusNum = a[i*inc + 1];
        BusDesc = a[i*inc + 2]; 
        break;
      case 1:
        a = routes_NJBUS;
        setRoutemap("NJBUS", BusList, routes_NJBUS);
        checkLoadable("NJBUS");
        inc = 4;
        BusNum = a[i*inc + 1];
        BusDesc = a[i*inc + 2];
        break;
      case 2:
        a = routes_CTABus;
        setRoutemap("CTABUS", BusList, routes_CTABus);
        inc = 2;
        BusNum = a[i*inc ];
        BusDesc = a[i*inc + 1];
        break;
      case 3:
        a = SFMTARouteMapMap;
        setRoutemap("SFMTA", BusList, SFMTARouteMapMap);
        inc = 3;
        BusNum = "SFB_" + a[i*inc + 1];
        BusDesc = a[i*inc + 2];
        break;
      case 4:
        a = LAMBRouteMap;
        setRoutemap("LABUS", BusList, LAMBRouteMap);
        inc = 3;
        BusNum = "LAMB" + a[i*inc + 1];
        BusDesc = a[i*inc + 2];
        break;
      case 5:
        a = RIPTABusRoutes;
        setRoutemap("RIPTA", BusList, RIPTABusRoutes);
        inc = 2;
        BusNum = "RIPT" + a[i*inc];
        BusDesc = a[i*inc] + " " + a[i*inc + 1];
        break;
      case 6:
        a = MSL_BusRoutes;
        checkLoadable("MSLB");
        setRoutemap("MSL", BusList, MSL_BusRoutes);
        inc = 3;
        BusNum =  "MSLB" + a[i*inc+1];
        BusDesc = a[i*inc + 1] + " " + a[i*inc + 2];
        break;
      case 7:
        a = WMATA_BusRouteMap;
        setRoutemap("WMB", BusList, WMATA_BusRouteMap);
        inc = 2;
        BusNum =  a[i*inc];
        BusDesc = a[i*inc] + " " + a[i*inc + 1];
        break;
      case 8:
        a = routes_MTA;
        setRoutemap("MTA", BusList, routes_MTA);
        inc = 3;
        BusNum =  a[i*inc];
        BusDesc = a[i*inc + 2] + " " + a[i*inc + 1];
        break;
      default:
        BusNum = a[i*inc + 1];
        BusDesc = a[i*inc + 2];
        break;
  }
    
}

function findBusNumberFromList()
{
  let ss2 = document.getElementById("buscarrierlist");
  let si2 = ss2.selectedIndex;
  let i = document.getElementById("buslist").selectedIndex;
  let a = routes_bus;
  let inc = 5;
  BusNum = "";
  BusDesc = "";
  
  switch(si2)
  {
      case 0:
        a = routes_bus;
        inc = 5;
        BusNum = a[i*inc + 1];
        BusDesc = a[i*inc + 2]; 
        break;
      case 1:
        a = routes_NJBUS;
        inc = 4;
        BusNum = a[i*inc + 1];
        BusDesc = a[i*inc + 2];
        break;
      case 2:
        a = routes_CTABus;
        inc = 2;
        BusNum = a[i*inc ];
        BusDesc = a[i*inc + 1];
        break;
      case 3:
        a = SFMTARouteMapMap;
        inc = 3;
        BusNum = "SFB_" + a[i*inc + 1];
        BusDesc = a[i*inc + 2];
        break;
      case 4:
        a = LAMBRouteMap;
        inc = 3;
        BusNum = "LAMB" + a[i*inc + 1];
        BusDesc = a[i*inc + 2];
        break;
      case 5:
        a = RIPTABusRoutes;
        inc = 2;
        BusNum = "RIPT" + a[i*inc];
        BusDesc = a[i*inc] + " " + a[i*inc + 1];
        break;
      case 6:
        a = MSL_BusRoutes;
        inc = 3;
        BusNum = "MSLB" + a[i*inc+1];
        BusDesc = a[i*inc + 1] + " " + a[i*inc + 2];
        break;
      case 7:
        a = WMATA_BusRouteMap;
        inc = 2;
        BusNum = "WMB_" + a[i*inc];
        BusDesc = a[i*inc] + " " + a[i*inc + 1];
        break;
      case 8:
        a = routes_MTA;
        inc = 3;
        BusNum =  a[i*inc];
        BusDesc = a[i*inc + 2] + " " + a[i*inc + 1];
        break;
      default:
        BusNum = a[i*inc + 1];
        BusDesc = a[i*inc + 2];
        break;
  }
  CloseMenu();
  capcolor = "red"
  DISPLAYTYPE = 4;
  qupdateDisplay();
}

function findBusNumberN(n)
{
    BusNum = n;
    CloseMenu();
    capcolor = "red"
    DISPLAYTYPE = 4;
    qupdateDisplay();

}

function showBus()
{
    CloseMenu();
    DISPLAYTYPE = 4;
    updateDisplay();
}

function showConnections()
{
  if(ctnx != null)
  {
    CloseMenu();
    if(DISPLAYTYPE == 2) DISPLAYTYPE = 6;
    else DISPLAYTYPE = 2;
    updateDisplay();
  }
}

function showDetails(i)
{
  CloseMenu();
  if(ctnx != null)
  {
  DETAILSINDEX = i;
  DISPLAYTYPE = 3;
  updateDisplay();
  }
}

function showT()
{
  let s = prompt("Enter trip_id");
  if(s!= "")
  {
    CurrentTripID = s;
    capt = "Trip " + s;
    DISPLAYTYPE = 1;
    LegStartid = null;
    LegDestid = null;
//    bUseSked = false;
    bForceSked = false;
    qupdateDisplay();
  }
  CloseMenu();
}

function showTripSked(trip_id, trip_name, route_id, headsign)
{
  CurrentTripID = trip_id;
  capt = trip_name;
  if((!isNaN(route_id)) && (Number(route_id) < 999)) capt = "Bus " + route_id + ", " + capt;
  if(typeof hs !== 'undefined') capt += " to " + hs;
  DISPLAYTYPE = 1;
  qupdateDisplay();
}

function showTripAdjust(rowIndex)
{
  if(DISPLAYTYPE == 0)
  {
    CurrentTrip = CurrentTrips[rowIndex];
    CurrentTrip.rowIndex = rowIndex;
    CurrentTripID = CurrentTrips[rowIndex].trip_id;
  }
  else if(DISPLAYTYPE == 1)
  {
     CurrentTrip.rowIndex = rowIndex;
   
  }
  menu("TAdj");
}

function showTripSchedule(rowIndex, tpred)
{
//  report("- showTripSchedule " + CurrentTrips[rowIndex].trip_id);
//  clearReport();
  CurrentTrip = CurrentTrips[rowIndex];
  CurrentTripID = CurrentTrips[rowIndex].trip_id;
  CurrentTripCDate = CurrentTrips[rowIndex].startcdate;
  capt = CurrentTrips[rowIndex].trip_name;
  CurrentTripRouteID = CurrentTrips[rowIndex].route_id;
  Ptroute = CurrentTripRouteID;
  CurrentStop = CurrentTrips[rowIndex].vstopid;
  CurrentVehicleId = CurrentTrips[rowIndex].veh_id;
  if(!isNaN(CurrentTrips[rowIndex].route_id)) capt = "Bus " + CurrentTrips[rowIndex].route_id + ", " + capt;
  let hs = CurrentTrips[rowIndex].trip_headsign;
//  report("headsign7 = " + hs );
  let sd = CurrentTrips[rowIndex].trip_dest;
  if(typeof sd !== 'undefined')
  {
      siridest = sd;
  }
  else siridest = null;
  CTAHS = hs;
  if(typeof hs !== 'undefined') capt += " to " + hs;
  LegStartid = Place_id;
  LegDestid = null;
  let lix = -1;
  Leghs = hs;
  if((typeof Leghs !== 'undefined') && ((lix = Leghs.indexOf("(")) != -1)) Leghs = Leghs.substring(0, lix);
  CurrentTp = CurrentTrips[rowIndex].pre_dt;
  DISPLAYTYPE = 1;
  Ptript = tpred;
  if(CurrentTripID.indexOf("_Day_") != -1) Ptript = null;
  Ptripi = getParentIdFromId(Place_id);
  qupdateDisplay();
}

function showTripSchedule1(rowIndex)
{
  if(CurrentTrips.length > rowIndex)
  {
    CurrentTripID = CurrentTrips[rowIndex].trip_id;
    CurrentTripRouteID = CurrentTrips[rowIndex].route_id;
    capt = CurrentTrips[rowIndex].trip_name;
    capt = "Bus " + BusNum + ", " + capt;
    let hs = CurrentTrips[rowIndex].trip_headsign;
    if(hs !== undefined) capt += " to " + hs;
//    report("8541 " + JSON.stringify(CurrentTrips[rowIndex], null, 4));
/*    if(CurrentTripID.indexOf("MTA") == 0)
    {
      setPlaceId(CurrentTrips[rowIndex].stop[0].stop_id);   
      DISPLAYTYPE = 0;
    }
    else 
        */
//    report("9106 " + rowIndex + " " + CurrentTripID + " " + CurrentTripRouteID + " " + BusNum);
    DISPLAYTYPE = 1;
    LegStartid = Place_id;
    LegDestid = null;
//    DISPLAYTYPE = 1;
    Ptript = null;
    qupdateDisplay();
  }
  else report("showTripSchedule1 error rowIndex = " + rowIndex);
}

function viewTrainBoard1()
{
  bProc = false;
  clearFindQueue();
  getLocation();
  DUtime = 0;
  viewTrainBoard();
}

function viewTrainBoard()
{
  CloseMenu();
  bUseFile = false;
  vcapt = null;
  bUpdateOnce = true;
  TRIP_STARTTIME = null;
  if(DISPLAYTYPE == 0) refresh();
  else
  {
    DISPLAYTYPE = 0;
    qupdateDisplay();
  }
}

function showTrainBoard(rowIndex, stopid)
{
  let x = stopid.toString();
  setPlaceId(x);
  SelectedPlace = Place;
  Xplace = 5;
  DISPLAYTYPE = 0;
  TRIP_STARTTIME = null;
  bForceSked = false;
  vcapt = null;
  stopwch = null;
  qupdateDisplay();
}

function showTrainBoardz(stop_id)
{
  setPlaceId(stop_id);
  SelectedPlace = Place;
  Xplace = 5;
  DISPLAYTYPE = 0;
  TRIP_STARTTIME = null;
  bForceSked = false;
  vcapt = null;
  stopwch = null;
  qupdateDisplay();
}

function whatsNearby()
{
  DISPLAYTYPE = 5;
  capcolor = "red";
  CloseMenu();
  qupdateDisplay();  
}

function whatsNearby1()
{
  if(display5 != null)
  {
    DISPLAYTYPE = 5;
    capcolor = "red";
    CloseMenu();
    qupdateDisplay(); 
  }
}

function getHere()
{
  let p = new Promise(function(resolve, rejectx){
    let p2 = service3.getNearbyStops(Xpos, Ypos);
    p2.then(function(nstops){
//      report("got nearby stops");
      if(nstops.length == 0) 
      {
//        report("No stops found near here.");
        resolve(nstops);
      }
      else
      {
//        report("getHere " + nstops[0].stop_name);
        resolve(nstops);
      }
    }).catch(function(error) {
      rejectx(error);
//      qupdateDisplay();
      } );
  } );
  return(p);
}

async function selectHere()  // called from ops menu
{
if((Xpos != 0) && (Ypos !=0))
{
  setPlaceId(estNearest());
  qupdateDisplay();
}

}

function pick(n)
{
  let pid = "T_BNT-0000";
  let pname = "";
  let b = true;
  switch(n)
  {
  case 0: pid = Here;
    CloseMenu();
//    report("8531 pick(0) pid = " + pid);
    if((pid == null) || (pid == "") || (pid == " "))
    {
      if((Xpos == 0) && (Ypos == 0)) 
      {
        getLocation();
        selectHere();
//          report("8511 " + Here);
      }
      else 
      {
        estNearest();
        pid = Here;
//          report("8517 " + Here);
      }
      bFindFrom = false;
      bFindTo = false;
      if((pid == null) || (pid == "") || (pid == " "))
      {
        report("Here is undefined. 2334");
        locfirst = true;
        locfirst2 = true;
        b = false;
      }
    }
    else if((Xpos != 0) && (Ypos != 0) && document.getElementById("ath").checked) 
    {
//        report("8533");
      getLocation();
      selectHere();
    }
    else
    {
//        report("8539 " + Here);
      setPlaceId(Here);
      pcolor = "red";
      qupdateDisplay();
    }
    break;
  case 1: pid = "T_BNT-0000";
    break;
  case 2: pid = "T_NEC-2287";
    break;
  case 3: pid = Home;
    if((pid == null) || (pid == "") || (pid == " "))
    {
      let hi = getCurrentPlaceId();
      if(confirm("Home is not set.\nSet Home to " + Place + "?", hi))
      {
        setHome();
        pid = hi;
      }
      bFindFrom = false;
      bFindTo = false;
      b = false;
    }
    break;
  case 4: pid = Place;
    if((pid == null) || (pid == "") || (pid == " "))
    {
      alert("No stop has been selected.");
      bFindFrom = false;
      bFindTo = false;
      b = false;
    }
    break;
  case 6: pname = "New York Penn Station Amtrak";
    pid = "AMSNYP";
    break;
  case 7: pname = "New York-Grand-Central-NY";
    pid = "NewYork-Grand-Central-NY";
    break;
  case 8: pname = "Secaucus (Upper Level) -NJ";
    pid = "NJ38187";
    break;
  case 9: pname = "New Haven-CT";
    pid = "NewHaven-CT";
    break;
  case 10: pname = "Jamaica-NY";
    pid = "LI102";
    break;
  case 11: pname = "Chicago-IL Union Station";
    pid = "AMSCHI";
    break;
  case 12: pname = "San Francisco Embarcadero -1 BART";
    pid = "B_M16-1";
    break;
  case 13: pname = "Los Angeles-CA Union Station";
    pid = "AMSLAX";
    break;
  case 14: pname = "Seattle King Street Station-WA";
    pid = "AMSSEA";
    break;
  case 15: pname = "Denver Union Station-CO";
    pid = "AMSDEN";
    break;
  case 16: pname = "Dallas-TX Union Station";
    pid = "AMSDAL";
    break;
  case 17: pname = "New Orleans-LA Union Passenger Terminal";
    pid = "AMSNOL";
    break;
  case 18: pname = "Washington-DC Union Station";
    pid = "AMSWAS";
    break;
  case 19: pname = "Philadelphia-PA 30th Street Station Amtrak";
    pid = "AMSPHL";
    break;
  case 20: pname = "Miami-FL Amtrak Station";
    pid = "AMSMIA";
    break;
  case 21: pname = "St Louis-MO Gateway Amtrak Station";
    pid = "AMSSTL";
    break;
  case 22: pname = "Paris_Est TER";
    pid = "SNCF_Train_TER_87113001";
    break;
  default: 
    break;
  }
  if(b)
  {
  Xplace = n;
  checkLoadable(pid);
  if(bFindFrom) 
  {
    setFindFrom(pname, pid);
    menu("Plan");
  }
  else if(bFindTo) 
  {
    setFindTo(pname, pid);
    menu("Plan");
  }
  else
  {
    pcolor = "red";
    stopwch = null;
    CloseMenu();
    selPlace();
//    report("2942 got here");
  }
  bFindFrom = false;
  bFindTo = false;
  qupdateDisplay();
  }
}

function showHere()
{
  if((Xpos != 0) && (Ypos != 0))
  {
    if(map == null)
    {
      selectFromMap1();
    }
    putHere();
    map.panTo(new MAPCLASS.LatLng(Xpos, Ypos));
  }
  closeHerePopup();
}

function mpSelect()
{
  let pid = nstn;
  let pname = "";
  let k = document.getElementById("nbp").selectedIndex;
//  if(k > 0)
  {
 //   p = MapStops[k-1].stop_id;
    pid = NBPoptions[k].id;
    report("mpSelect stop_id = " + NBPoptions[k].id + " " + pid);
//    pid = NBPoptions[k].id;
  }
  if(pid != "")
  {
    checkLoadable(pid);
    pname = getStopNameFromID(pid);
    if(bFindFrom) 
    {
      setFindFrom(pname, pid);
      menu("Plan");
    }
    else if(bFindTo) 
    {
      setFindTo(pname, pid);
      menu("Plan");
    }
    else if((pid.indexOf("door-") == 0) || (pid.indexOf("node-") == 0))
    {
      report("no action on " + p);
    }
    else
    {
      setPlaceId(pid);
      let pt = null;
      stopwch = null;
      if(k == 0) 
      {
        pt = getPositionForName(Place);
      }
      else
      {
        let xPlace = MapStops[k-1].stop_name;
        let xPlaceid = getStopIdFromName(xPlace);
        report("xPlace = " + xPlace + " xPlaceid = " + xPlaceid);
        if(xPlaceid != "") 
        {
          setPlaceId(xPlaceid);
          pt = new PointI(MapStops[k-1].stop_lat, MapStops[k-1].stop_lon);
        }
      }
      SelectedPlace = Place;
      DISPLAYTYPE = 0;
      capt = Place;
      capcolor = "red";
      map.panTo(new MAPCLASS.LatLng(pt.x, pt.y));
      if((bEoMap) && (pt != null))
      {
        let st = new map.DText(SelectedPlace, pt, "10px", eomapcolor);
        st.setMap(map);
      }
      if(CenterMarker != null)
      {
        CenterMarker.setPosition(new MAPCLASS.LatLng(pt.x, pt.y));
      }
      else report("CenterMarker is null");
//    viewTrainBoard();
    }
    bFindFrom = false;
    bFindTo = false;
    updateDisplay();
    pcolor = "red";
    document.getElementById("plc").style.color = pcolor;
  }
}


function updatePlaces(d)
{
  let k = d.length;
  clearArray(Xplaces); 
  Xplaces.push("Here");
  Xplaces.push("Boston North Station");
  Xplaces.push("Boston South Station");
  Xplaces.push("Home (Default)");
  Xplaces.push("Selected");
  Xplaces.push("0");
  Xplaces.push("New York-Penn-NY");
  Xplaces.push("New York-Grand-Central-NY");
  Xplaces.push("Jamaica-NY");
  Xplaces.push("Secaucus (Upper Level) -NJ");
  Xplaces.push("New Haven-CT");
  Xplaces.push("Chicago-IL Union Station");
  Xplaces.push("San Francisco Embarcadero -1 BART");
  Xplaces.push("Los Angeles-CA Union Station");
  Xplaces.push("Seattle King Street Station-WA");
  Xplaces.push("Denver Union Station-CO");
  Xplaces.push("Dallas-TX Union Station");
  Xplaces.push("New Orleans-LA Union Passenger Terminal");
  Xplaces.push("Washington-DC Union Station");
  Xplaces.push("Philadelphia-PA 30th Street Station Amtrak");
  Xplaces.push("Miami-FL Amtrak Station");
  Xplaces.push("St. Louis-MO Gateway AMTRAK Station");
  Xplaces.push("Paris_Est TER");
  i = 0;
  while(i < k)
  {
    Xplaces.push(d[i].stop_name);
    i += 1;
  }

}

function setHome()
{
  CloseMenu();
  Xposlast = 0;
  Home = Place_id;
  localStorage.setItem("Trains_home_default", Place_id);
  
}

function clearHome()
{
  Home = "";
  removeLocal("Trains_home_default");
}

function onDeviceReady()
{
  report("received onDeviceReady");
}

function getLocation() 
{
    if(navigator.geolocation) 
    {
        if(locfirst && locfirst2) 
        {
          navigator.geolocation.getCurrentPosition(showPosition1, positionError, {maximumAge:4000, timeout:80000, enableHighAccuracy: true});
          locfirst2 = false;
        }
//        if(document.getElementById("lse").checked && (wpid == null)) wpid = navigator.geolocation.watchPosition(showPosition, positionError2, {maximumAge:0, timeout:60000});
    } 
    else 
    {
        if(GEO) report("Geolocation is not supported by this browser.");
        GEO = false;
        document.getElementById("lse").checked = false;
    }
}

function showPosition1(position) 
{
//  report("showPosition1");
  bGeo = true;
  showPosition(position);
}

function Waypoint(lat, lon, alt, acc, date)
{
  this.lat = lat;
  this.lon = lon;
  this.alt = alt;
  this.acc = acc;
  this.timestamp = date;
  this.bearing = null;
  this.compacc = null;
  this.bAbsolute = false;
}

Waypoint.prototype.addBearingInfo = function(bearing, acc, bAbsolute)
{
  this.bearing = bearing;
  this.compacc = acc;
  this.bAbsolute = bAbsolute;
}

function clearSavedPositions()
{
  clearArray(SavedPositions);
  CloseMenu();
}

function deleteLastWaypoint()
{
  let l = SavedPositions.length;
  if(l > 0) SavedPositions.splice(l - 1, 1);
  closePlotPopup();
}

function saveRecording()
{
  CloseMenu();
  let s = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>\n';
  s += '<gpx version="1.1"\ncreator="eightolives Trains">\n';
  let name = prompt("Enter a name for the waypoints:", "");
  if(name != "")
  {
    s += '<trk>\n<name>' + name + '</name>\n<trkseg>\n';
  }
  else
  {
    s += '<trk>\n<trkseg>\n';
  }
  let k = SavedPositions.length;
  let i = 0;
  for(i = 0; i < k; i++)
  {
    let w = SavedPositions[i];
    s += '<trkpt lat=\"' + w.lat + '\" lon=\"' + w.lon + '\">\n';
    s += '   <ele>' + w.alt + "</ele>\n";
    let d = new Date(w.timestamp);
    s += '   <time>' + d.toISOString() + '</time>\n'; 
    s += '</trkpt>\n';
  }
  s += '</trkseg>\n</trk>\n</gpx>\n';
  
  let fn = prompt("Enter waypoints file name", "waypoints.gpx");
/*  if(ipod) 
  {
    let fn = prompt("Enter local track file name", "SavedPos.gpx");
    if((fn != null) || (fn != "")) saveFileLocal(fn, s);
  }
  else */ 
  saveFileFS(fn, s);
}

function reportGeo()
{
  CloseMenu();
  clearReport();
  report("Trains Geolocation Report\n");
  if(! document.getElementById("lse").checked) report("Location Services are not enabled.");
  if(!bCompassEnabled) report("Compass is not enabled.");
  let len = SavedPositions.length;
  if(len == 0) report("There are no positions saved for analysis.");
  else report("There are " + len + " points saved for analysis.");
  report("Current lat = " + Xpos + "\nCurrent lon = " + Ypos + "\nCurrent Altitude = " + Zpos +"\nReading Accuracy = " + PosAccuracy); 
  if(len != 0)
  {
  let latavg = 0;
  let lonavg = 0;
  let altavg = 0;
  let minlat = 0;
  let maxlat = 1000;
  let minlon = 0;
  let maxlon = -1000;
  let minalt = 0;
  let maxalt = 0;
  let i = 0;
  for(i = 0; i<len; i++)
  {
    let x = SavedPositions[i].lat;
    latavg += x;
    if(x > maxlat) maxlat = x;
    if(x < minlat) minlat = x;
    x = SavedPositions[i].lon;
    lonavg += x;
    if(x > maxlon) maxlon = x;
    if(x < minlon) minlon = x;
    x = SavedPositions[i].alt;
    altavg += x;
    if(x > maxalt) maxalt = x;
    if(x < minalt) minalt = x;
  }
  latavg /= len;
  lonavg /= len;
  altavg /= len;
  report("\nAverage lat = " + latavg +"\nAverage lon = " + lonavg + "\nAverage Altitude = " + altavg + " m");
  let l2 = Math.round(len/2);
  report("\nMedian lat = " + SavedPositions[l2].lat + "\nMedian lon = " + SavedPositions[l2].lon + "\nMedian alt = " + SavedPositions[l2].alt + " m");
  let y = getDistanceBetween(SavedPositions[0].lat, SavedPositions[0].lon, SavedPositions[len-1].lat, SavedPositions[len-1].lon);
  let ft = Math.round(5280 * y);
  let py = Math.round( 10 * y) / 10;
  report("Distance from first measurement to last measurement = " + py + " mi [" + y + " ft]");
  
  }
}

function showPosition(position) 
{
    Xposlast = Xpos;
    Yposlast = Ypos;
    Zposlast = Zpos;
    Xpos = position.coords.latitude;
    Ypos = position.coords.longitude;
    Zpos = position.coords.altitude;
    
//    Xpos = 37.79476;
//    Ypos = -122.3922;
    PosAccuracy = Math.round(10 * position.coords.accuracy) / 10;
    let bMarkDelta = false
    
    if(PosAccuracy < 70)
    {
      let x = getDistanceBetween(Xposlast, Yposlast, Xpos, Ypos);
      let dt = NOW - LASTNOW;
      LASTNOW = NOW;
      // 1 mi/hr
      if(dt > 20000)
      {
        let vel = x * 3600000 / dt;
        if(vel > 60) report("vel = " + vel + " mi/hr");
        else if(VELO > 4)
        {
          VELO = Math.round(.8 * VELO + .2 * vel);
        }
        else
        {
          VELO = Math.round(vel);
        }
      }
      let y = getDistanceBetween(Xz, Yz, Xpos, Ypos);
      if(y > .5)
      {
        Xz = Xpos;
        Yz = Ypos;
        bMarkDelta = true;
      }
    }
    LastWaypoint = CurrentWaypoint;
    CurrentWaypoint = new Waypoint(Xpos, Ypos, Zpos, PosAccuracy, NOW);
    if(document.getElementById("bSavePositions").checked && (SavedPositions.length < SPMAX) && bMarkDelta)
    {
      saveAWaypoint(Xpos, Ypos, Zpos, PosAccuracy);
      /*
      let w = new Waypoint(Xpos, Ypos, Zpos, PosAccuracy, NOW);
      if(bCompassEnabled)
      {
        w.addBearingInfo(zo, compacc, bAbsolute);
      }
      SavedPositions.push(w);
      */
    }
    if(SavedPositions.length >= SPMAX) 
    { 
      document.getElementById("bSavePositions").checked = false;
    }
    bMarkDelta = false;
    if(bMapShowing)
    {
      putHere();
    }
    
    // test code
//    Xpos = "42.306577";
//    Ypos = "-71.10745";

/*
    Xpos = "46.49228";
    Ypos = "9.90345";
    Xpos = "34.052";
    Ypos = "-118.24";
    */
//    Xpos = "39.34385645872587";
//    Ypos = "-115.19897462334485";
    document.getElementById("XPOS").value = Xpos;
    document.getElementById("YPOS").value = Ypos;
    document.getElementById("ZPOS").value = Zpos;
    document.getElementById("POSA").value = PosAccuracy;
    if((VELO >= 0) && (VELO < 80))
    {
      document.getElementById("VEL").value = VELO;
    }
    else
    {
      document.getElementById("VEL").value = "";
    }
    if(Xplace == 0)
    {
      let x = Math.abs(Xposlast - Xpos);
      let y = Math.abs(Yposlast - Ypos);
      if((x > LatDiff) || (y > LonDiff))
      {
        /*
        let p = getHere();
        p.then(function(data){
        if(data.length > 0)
        {
          if(Place != data[0].stop_name)
          {
            setPlaceId(data[0].stop_id);
            Here = Place_id;
          }
          qupdateDisplay();
        }
        else 
        {
          estNearest();
        } 
        }).catch(function(error) {
          report("425 " + error);
          estNearest();
        } );
        */
        estNearest();
      }
    if(locfirst)
    {
        wpid = navigator.geolocation.watchPosition(showPosition, positionError2, {maximumAge:4000, timeout:80000});  
        Xz = Xpos;
        Yz = Ypos;
    }
    locfirst = false;
    }
    return(true);
}

function saveAWaypoint(X, Y, Z, A)
{
  let w = new Waypoint(X, Y, Z, A, NOW);
  /*
  if(bCompassEnabled)
  {
    w.addBearingInfo(zo, compacc, bAbsolute);
  }
  */
  SavedPositions.push(w);
}

function positionError(error)
{
  let msg = "";
  if(typeof error !== 'undefined') msg = error.message;
  console.log("8908 positionError: " + msg);
  report("9572 Geolocation service not available.");
  locfirst = true;
  locfirst2 = true;
  return(true);
}

function positionError2(error)
{
  let msg = "";
  if(typeof error !== 'undefined') msg = error.message;
//  report("8918 positionError2: " + msg);
  if(!locfirst) navigator.geolocation.clearWatch(wpid);
  return(true);
}

function checkCompass()
{
  let img = arrow; //"images/arrow.png";
  let img2 = dirimg; //"images/dir.png";
  let bdoperm = (typeof DeviceOrientationEvent.requestPermission === 'function');
  report("9423 checkCompass " + document.getElementById("ecmps").checked + " " + bDeviceOrientation + " " + bCompassEnabled + " " + bHasCompass + " " + bdoperm);
  if(document.getElementById("ecmps").checked && bDeviceOrientation && (bCompassEnabled == false))
  {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') 
    {
        report("9429 ");
      DeviceOrientationEvent.requestPermission()
        .then(function(permissionState) {
            report("9432 " + permissionState);
          if (permissionState === 'granted') 
          {
            window.addEventListener('deviceorientation', handleOrientation,true);
            bCompassEnabled = true;
            report("9439 compass enabled ios");
          }
        })
        .catch(function(error) {
            report("9441 " + error);
            });
   
    }
    else
    {
      window.addEventListener("deviceorientation", handleOrientation, true);
      bCompassEnabled = true;
      report("9451 compass enabled");
    }
  }
  else if(bCompassEnabled == true)
  {
      report("9454");
    if (typeof DeviceOrientationEvent.requestPermission === 'function') 
    {
      DeviceOrientationEvent.requestPermission()
        .then(function(permissionState) {
            report("9459 " + permissionState);
          if (permissionState === 'granted') 
          {
            window.removeEventListener('deviceorientation', handleOrientation,true);
            bCompassEnabled = false;
            document.getElementById("needle").src = img.src;
            report("compass disabled ios");
          }
        })
        .catch(function(error){
           report("949 " + error);
           });
   
    }
    else
    {
      window.removeEventListener("deviceorientation", handleOrientation,true);
      bCompassEnabled = false;
      report("compass disabled");
    }
  }
  document.getElementById("needle").src = img.src;
}

function handleOrientation(evt)
{
  let im = document.getElementById("needle");
  let im1 = document.getElementById("needle1");
  im1.style.transform = "rotate(" + Bearing + "deg)";
  let zo = "0";
  let xo = 0;
  let yo = 0;
  if(evt == null) ;
  else if(evt.absolute == false)
  {
    im.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAA6ElEQVRIie2Quw2EMBBEiS69YpzSAaIJqjJVQBG0QAOOSCAkZC7grOOzawP+XOKRVkIg5o1elqWkXAym6Y2+f/0HrhQwjgCAOMBtpASaBseEhQLAsgB5DhTF+kwkDBgAlAKEWO+r3vsAtlXKH5xQ72UA2aaVa7hB/WM427ZVfkH9owFs01a5vraNAD8qD6GebaGU+1bPNlDKfasn/+aUR1FvUm5RfwtMwuvaDmfUu8FtyvWVJan+Nnw34IpyRv0j8A4+DEDXna+qzu98wXcDqAhh/OwEtg4wwL2AjSPmOTzUNiQKMCXFNR/TEoQ28JAhOAAAAABJRU5ErkJggg=="; //"images/arrow.png";
    try{
    if(typeof evt.webkitCompassHeading === 'undefined') ;
    else
    {
      if(evt.webkitCompassAccuracy === 'undefined') ;
      else if(evt.webkitCompassAccuracy == -1)
      {
        compacc = evt.webkitCompassAccuracy;
        report("compass needs calibration");
      }
      else
      {
        report("compass accuracy = " + evt.webkitCompassAccuracy);
        compacc = evt.webkitCompassAccuracy;
        zo = 360 - evt.webkitCompassHeading;
      }
    }
    }
    catch(err){
      report("compass catch " + err);
    }
  }
  else
  {
    im.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAA50lEQVRIie2VOw7DIBBEqVJxu5Q5lFOgXCeKlCv4Aq7cuHVjLZPKDo6XxZ/FaRiJCjFv9BqMKSlZmcdwf6KuL3+BO6rgqAIAnAJEEEtmgofJCgUAeA9LBpYM4P3iWm0EV+yo+sK7joUfHhArveE6wTn1KgPYtkB5Sv1ueKzsjdcSLqjfNSBWFCrPpp5tYZSrq4+VcMrV1ccKOOXq6tnXgvLs6iXlKfWbwBxcUp5Sfwy+QrmkfjN8NqBp1sN/1O8Cz+Bti/H/Ds+oOjxq8NkAJpbE63zfagquAhZH9H1+aGrIKcCSkqP5AKA0Weoo36i2AAAAAElFTkSuQmCC"; //"images/arrowg.png";
    compacc = -2;
    xo = evt.beta;
    yo = evt.gamma;
    zo = evt.alpha;
  }
  if((evt != null) && (evt.webkitCompassHeading))
  {
      compacc = evt.webkitCompassAccuracy;
      zo = 360 - evt.webkitCompassHeading;
      bHasCompass = true;
//    report("webkit");
  }
  Zo = zo;
  bGotCompassReading = true;
 // requestAnimationFrame(updateCompass);
  if(bCompassEnabled) setTimeout(updateCompass, 1000);
//  report("zo = " + zo + " " + evt.absolute);
//  im.style.transform = "rotate(" + zo + "deg)";
}

function handleMotion(evt)
{

}

function updateCompass()
{
  let im = document.getElementById("needle");
  im.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAA50lEQVRIie2VOw7DIBBEqVJxu5Q5lFOgXCeKlCv4Aq7cuHVjLZPKDo6XxZ/FaRiJCjFv9BqMKSlZmcdwf6KuL3+BO6rgqAIAnAJEEEtmgofJCgUAeA9LBpYM4P3iWm0EV+yo+sK7joUfHhArveE6wTn1KgPYtkB5Sv1ueKzsjdcSLqjfNSBWFCrPpp5tYZSrq4+VcMrV1ccKOOXq6tnXgvLs6iXlKfWbwBxcUp5Sfwy+QrmkfjN8NqBp1sN/1O8Cz+Bti/H/Ds+oOjxq8NkAJpbE63zfagquAhZH9H1+aGrIKcCSkqP5AKA0Weoo36i2AAAAAElFTkSuQmCC";
  im.style.transform = "rotate(" + Zo + "deg)";
  if(bDMapShowing && (typeof updateDMap != 'undefined'))
  {
    let zx = Math.round(360 - Zo);
    updateDMap(zx);
  }
}


function checkTo()
{
  let si = document.getElementById("tripto").value;
  let six = document.getElementById("tripto").selectedIndex;
  switch(six)
  {
    case 0:
      si = null;
      break;
    case 1: // home
      si = getStopNameFromID(Home);
      break;
    case 2: // here
      let startid = getNearestStation(Xpos, Ypos);
      si = getStopNameFromID(startid);
      break;
    case 3: // selected
      si = Place;
      break;
    case 4: // Select from List
      bFindTo = true;
      selectFromAll()
      break;  
    case 5: // Select from Map
      bFindTo = true;
      selectFromMap()
      break;
    case 6: // Search For Stop
      bFindTo = true;
      showStopSearch();
      break
    default:
      break;
  }
  /*
  if(ei == "Select from List")
  {
    bFindTo = true;
    selectFromAll()
  }
  else if(ei == "Select from Map")
  {
    bFindTo = true;
    selectFromMap()
  }
  else if(ei == "Search For Stop")
  {
    bFindTo = true;
    menu('StopSearch');
  }
  else
  {
    triptoi = getStopIdFromName(ei);
    if((tripfromi != null) && (triptoi != null))
    {
      report("a. " + tripfromi + " " + triptoi);
      let pt1 = getPositionForId(tripfromi);
      let pt2 = getPositionForId(triptoi);
      report("pt1.x = " + pt1.x + ", " + pt1.y + ", " + pt2.x + ", " + pt2.y);
      document.getElementById("bearing").innerHTML ="True Bearing = " +  getBearing(pt1.x, pt1.y, pt2.x, pt2.y) + " degrees";
    }
    else document.getElementById("bearing").innerHTML = "";
  }
  */
  if(!bFindTo) 
  {
    triptoi = getStopIdFromName(si);
    displayCnxBearing();
  }
}

function checkFrom()
{

  let si = document.getElementById("tripfrom").value;
  let six = document.getElementById("tripfrom").selectedIndex;
  switch(six)
  {
    case 0:
      si = null;
      break;
    case 1: // here
      let startid = getNearestStation(Xpos, Ypos);
      si = getStopNameFromID(startid);
      break;
    case 2: // home
      si = getStopNameFromID(Home);
      break;
    case 3: // selected
      si = Place;
      break;
    case 4: // Select from List
      bFindFrom = true;
      selectFromAll()
      break;  
    case 5: // Select from Map
      bFindFrom = true;
      selectFromMap()
      break;
    case 6: // Search For Stop
      bFindFrom = true;
      showStopSearch();
      break
    default:
      break;
  }
  /*
  if(si == "Select from List")
  {
    bFindFrom = true;
    selectFromAll()
  }
  else if(si == "Select from Map")
  {
    bFindFrom = true;
    selectFromMap()
  }
  else if(si == "Search For Stop")
  {
    bFindFrom = true;
    menu('StopSearch');
  }
  else
  */
  if(!bFindFrom)
  {
    tripfromi = getStopIdFromName(si);
    displayCnxBearing();
  }
}

function showStopSearch()
{
  if(Place.indexOf("-NJ") != -1)
  {
    if(!isCarrierLoaded("NJBUS")) checkLoadable("NZ162");
  }
  menu('StopSearch');
  document.getElementById("shst").focus();
}

function displayCnxBearing()
{
//    report("b. " + tripfromi + " " + triptoi);
  if((tripfromi != null) && (triptoi != null))
  {
//    report("b. " + tripfromi + " " + triptoi);
    let pt1 = getPositionForId(tripfromi);
    let pt2 = getPositionForId(triptoi);
    if((pt1 !=null) && (pt2 != null))
    {
    let br = getBearing(pt1.x, pt1.y, pt2.x, pt2.y);
    if(br == null) document.getElementById("bearing").innerHTML = "";
    else document.getElementById("bearing").innerHTML ="True Bearing = " +  getBearing(pt1.x, pt1.y, pt2.x, pt2.y) + " degrees";
    }
    else document.getElementById("bearing").innerHTML = "";
  }
  else document.getElementById("bearing").innerHTML = "";
}

function setFindFrom(pname, pid)
{
  pname = getStopNameFromID(pid);
  document.getElementById("tripfrom").selectedIndex = 0;
  document.getElementById("tripfrom").getElementsByTagName("option")[0].innerHTML = pname;
  tripfromi = pid; //getStopIdFromName(pname);
  displayCnxBearing();
//  let pm = checkLoadable(getStopIdFromName(pi));
//  if(!checkLoadable(pi)) checkLoadable(getStopIdFromName(pi));
  if(checkLoadable(pid) == null) checkLoadable(getStopIdFromName(pid));
}

function setFindTo(pname, pid)
{
  pname = getStopNameFromID(pid);
  document.getElementById("tripto").selectedIndex = 0;
  document.getElementById("tripto").getElementsByTagName("option")[0].innerHTML = pname;
  triptoi = pid; //getStopIdFromName(pi);
  displayCnxBearing();
//  if(!checkLoadable(pi)) checkLoadable(getStopIdFromName(pi));
  if(checkLoadable(pid) == null) checkLoadable(getStopIdFromName(pid));
}

function showPlanMenu()
{
  menu("Plan");
  triptoi = null;
  tripfromi = null;
}

function reverse()
{
  let si = document.getElementById("tripfrom").value;
  let ei = document.getElementById("tripto").value;
  let isi = document.getElementById("tripfrom").selectedIndex;
  let iei = document.getElementById("tripto").selectedIndex;
  document.getElementById("tripfrom").selectedIndex = 0;
  document.getElementById("tripto").selectedIndex = 0;
  document.getElementById("tripfrom").getElementsByTagName("option")[0].innerHTML = ei;
  document.getElementById("tripto").getElementsByTagName("option")[0].innerHTML = si;
  document.getElementById("tripfrom").value = ei;
  document.getElementById("tripto").value = si;
  tripfromi = null;
  triptoi = null;
  displayCnxBearing();
}

function closeConnections()
{
  clearFcbut();
  CloseMenu();
}

function getConnections()
{
  let si = document.getElementById("tripfrom").value;
  let ei = document.getElementById("tripto").value;
  let dn = document.getElementById("tripday").selectedIndex;
  let startx = document.getElementById("starttime").selectedIndex;
  displayCnxBearing();
  getConnectionsX(si, ei, dn, startx, false);
}
  
function getConnectionsX(si, ei, dn, startx, bFCOK)
{
  console.log("getConnectionsX si = " + si + ", ei = " + ei);
  let s = "Trip Definition:\n";
  let startplace = "";
  let startid = "";
  let startmode = -1;
  let startindex = 1;
  if(si == "Here") 
  {
    if((Xpos != 0) && (Ypos != 0))
    {
    startid = getNearestStation(Xpos, Ypos);
    startplace = getStopNameFromID(startid);
    startmode = stopmode;
    startindex = stopindex;
    }
    else s += "Can\'t determine Here for trip from.\n"; 
  }
  else if(si == "Home")
  {
    if((Home != null) && (Home != ""))
    {
      startid = Home;
      startplace = getStopNameFromID(Home);
      startmode = stopmode;
      startindex = stopindex;
    }
    else 
    {
      s += "Can\'t determine Home for trip from.\n";
      alert("Home not set.");
      return(-1);
    }
  }
  else if(si == "Current Selection")
  {
    console.log("Current Selection = " + SelectedPlace + ", " + Place + " " + Place_id);
    if((SelectedPlace == null) || (SelectedPlace == "")) SelectedPlace = Place;
    if((SelectedPlace != null) && (SelectedPlace != ""))
    {
      startplace = SelectedPlace;
      startid = getStopIdFromName(SelectedPlace);
      startmode = stopmode;
      startindex = stopindex;
    }
    else
    {
      s += "No \"from\" stop selected.\n";
      alert("No \"from\" stop selected.");
      return(-1);
    }
  }
  else
  {
    startplace = si;
    if(!isNaN(si)) startid = si;
    else if(si.indexOf("place-") == 0) startid = si;
    else startid = getStopIdFromName(si);
    console.log("- startid = " + startid + ", si = " + si);
    if(tripfromi != null) startid = tripfromi;
    startmode = stopmode;
    startindex = stopindex;
 }
  let destid = "";
  let dest = "";
  let destmode = -1;
  let destindex = -1;
  if(ei == "Here") 
  {
    if((Xpos != 0) && (Ypos != 0))
    {
      destid = getNearestStation(Xpos, Ypos);
      dest = getStopNameFromID(destid);
      destmode = stopmode;
      destindex = stopindex;
    }
    else s += "Can\'t determine Here for trip to.\n"; 
  }
  else if(ei == "Home")
  {
    if((Home != null) && (Home != ""))
    {
      destid = Home;
      dest = getStopNameFromID(Home);
      destmode = stopmode;
      destindex = stopindex;
    }
    else
    {
      s += "Can\'t determine Home for trip to.\n";
      alert("Home not set.");
      return(-1);
    }
  }
  else if(ei == "Current Selection")
  {
    report("Place = " + Place + ", " + getStopIdFromName(Place));
    if((Place != null) && (Place != ""))
    {
      dest = Place;
      destid = getStopIdFromName(Place);
      destmode = stopmode;
      destindex = stopindex;
    }
    else
    {
      s += "No \"to\" stop selected.\n";
      alert("No \"to\" stop selected.");
      return(-1);
    }
  }  
  else
  {
    dest = ei;
//    if(!isNaN(ei)) destid = ei;
//    else destid = getStopIdFromName(ei);
    destid = getStopIdFromName(ei);
    if(destid == "") destid = ei;
    else if(ei.indexOf("place-") == 0) destid = ei;
    report("- destid = " + destid + ", ei = " + ei);
    if(triptoi != null) destid = triptoi;
    destmode = stopmode;
    destindex = stopindex;
  }
  let dday = document.getElementById("tripday").value;
//  dn = document.getElementById("tripday").selectedIndex;
  let startt = document.getElementById("starttime").value;
  startx = document.getElementById("starttime").selectedIndex;
  let d = new Date(NOW);
  let day = d.getDay();
  let datetime = d.getTime();
  bxnotnow = false;
  if((dn > 0) || (startx > 0))
  {
    let e = dn -1  - day;
    if(e < 0) e += 7;
    let ft = e * 86400000;
    datetime += ft;
    let dd = new Date(datetime);
    d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate(), startx, 0, 0, 0);
    datetime = d.getTime();
    bxnotnow = true;
  }
  
  if(startid == destid)
  {
    alert("Start and Destination are the same. " + startid);
    return;
  }
  CloseMenu();
  let dxx = new Date(datetime);
  let dx = dxx.toLocaleString();
  if((ctnx != null) && (ctnx.startid == startid) && (ctnx.destid == destid) && (datetime == ctnx.datetime))
  {
    DISPLAYTYPE = 2;
    updateDisplay();
  }
  else if(startid == "") {alert("From location not specified."); return;}
  else if (destid == "") {alert("To location not specified."); return;}
  else if(bFCOK || confirm("Get trip options\nfrom " + startplace + "\n to " + dest + 
  "\non " + dday + "\nstarting after " + startt + "\n\n" + dx))
  {
    clearReport();
    datetime = Math.floor(datetime /= 1000);
    report("Find connections from: " + startplace + "\nto: " + dest + "\non: " + d.toLocaleDateString() + " (" + datetime + ")\n");
    report("startid = " + startid + " destid = " + destid);
    let py1 = getPositionForId(startid);
    let py2 = getPositionForId(destid);
    let py = Math.round( 10 * getDistanceBetween(py1.x, py1.y, py2.x, py2.y)) / 10;
    report("Trip distance est = " + py + " mi");
    if(py <= WALK_LIMIT)
    {
      alert("The distance between start and destination is only " + py + " miles. \nConsider walking.");
    }
    let xcolor = "#ff0000";
    document.getElementById("fcbut").style.backgroundColor = xcolor;
    
    afromroutes = "";
    atoroutes = "";
    fisbus = false;
    tisbus = false;
    bOtherStop = false;
    OtherStop = "";
    
    xstartid = startid;
    xdestid = destid;
    xdatetime = datetime;
    xstartmode = startmode;
    xstartindex = startindex;
    xdestmode = destmode;
    xdestindex = destindex;
    
    let ds = dxx.getFullYear().toString();
    let dm = (1 + dxx.getMonth()).toString();
    if(dm.length == 1) ds += "0" + dm;
    else ds += dm;
    let dd = dxx.getDate().toString();
    if(dd.length == 1) ds += "0" + dd;
    else ds += dd;
    dd = dxx.getDay();
    let cc = getFromCache("calendar");
    clearArray(msvc);
    if(cc != null)
    {
      ci = cc.toString().split(/,|\r?\n/);
      let i = 10;
      let k = ci.length;
      dd = Number(dd);
      report("date = " + ds + " k = " + k + " dd = " + dd);
      ds = Number(ds);
      if(dd == 0) dd = 7;
      k -= 1;
      while(i < k)
      {
//        report(i + " " + ci[i]);
        
 //       report(ci[i+8] + " " + ds + " " + ci[i+9] + " " + ci[i+dd] + " " + (i+dd));
        if((Number(ci[i+8]) <= ds) && (ds <= Number(ci[i+9])) && (ci[i+dd] == "1"))
        {
 //         report("msvc added " + ci[i]);
          msvc[msvc.length] = ci[i];
        }
        i += 10;
      }
 //     report("msvc.length = " + msvc.length);
    }
    
    xsvc = service;
    
//    let ptid = getParentIdFromId(startid);
    let pm = checkLoadable(startid);
    if(pm != null)
    {
//     report("got here 7945");
      pm.then(function() {
//        report("got here 7947");
        let pn = checkLoadable(destid);
        if(pn != null)
        {
          pn.then(function() {
            gc0(startid, destid);
          }).catch(function(e) {
            report(e);
            gc0(startid, destid);
          });
        }
        else gc0(startid, destid);
      }).catch(function(e) {
            report(e);
            gc0(startid, destid);
          });
    }
    else
    {
      let pn = checkLoadable(destid);
      if(pn != null)
      {
        pn.then(function() {
          gc0(startid, destid);
          }).catch(function(e) {
            report(e);
            gc0(startid, destid);
          });
      }
      else gc0(startid, destid);
    }
    
    /*
    if(isBusStop(startid))
    {
      if(startx == 0) checktime3(gc2);
      else checktime(gc2a);
    }  
    else if(isBusStop(destid))
    {
      checktime3(gc3);
    }  
    else
    {
      checktime3(gc4);
    }
    */
  }
  else
  {
    clearFcbut();
  }
  
}

function gc0(startid, destid)
{
    if(isBusStop(startid))
    {
      if(startx == 0) checktime3(gc2);
      else checktime(gc2a);
    }  
    else if(isBusStop(destid))
    {
      checktime3(gc3);
    }  
    else
    {
      checktime3(gc4);
    }
}

function clearFcbut()
{
    document.getElementById("fcbut").style.backgroundColor = "#d3d3d3";
}

let xstartid = null;
let xdestid = null;
let xdatetime = null;
let xstartmode = null;
let xstartindex = null;
let xdestmode = null;
let xdestindex = null;
let bxnotnow = false;
let xsvc = null;


function gc2()
{
  report("gc2");
  let p1 = xsvc.getPredictionByStop(xstartid);
  p1.then(function(d) {
    if((d == null) || (typeof d.mode === 'undefined') || (d.mode[0].route.length == 0) || (bxnotnow))
    {
      let p3 = xsvc.getScheduleByStop(xstartid, 1440, 100, xdatetime);
      p3.then(function(dx) {
        afromroutes = decodeRoutes2(dx);
        fisbus = true;
        if(isBusStop(xdestid))
        {
          checktime3(gc3);
        }
        else 
        {
          checktime3(gc4);
        }
        } ).catch(function(error) {
        report(error);
        } );
    }
    else
    {
    afromroutes = decodeRoutes2(d);
    report("afromroutes20 = " + afromroutes);
    fisbus = true;
    if(isBusStop(xdestid))
    {
      checktime3(gc3);
    }
    else 
    {
      checktime3(gc4);
    }
    }
  } ).catch(function(error) {
        report("gc2 error: " + error);
  } );

}

function gc2a()
{
  report("gc2a");
  let p3 = xsvc.getScheduleByStop(xstartid, 1440, 100, xdatetime);
  p3.then(function(dx) {
        afromroutes = decodeRoutes2(dx);
        fisbus = true;
        if(isBusStop(xdestid))
        {
          checktime3(gc3);
        }
        else 
        {
          checktime3(gc4);
        }
        } ).catch(function(error) {
        report(error);
        } );
}

function gc3()
{
  report("gc3");
  let p2 = xsvc.getPredictionByStop(xdestid);
  p2.then(function(d) {
    report("::" + bxnotnow + " d = " + d);
    if((d == null) || (typeof d.mode === 'undefined') || (d.mode[0].route.length == 0) || (bxnotnow))
    {
      let p3 = xsvc.getScheduleByStop(xdestid, 1440, 100, xdatetime);
      p3.then(function(dx) {
        atoroutes = decodeRoutes2(dx);
        tisbus = true;
        checktime3(gc4);
        } ).catch(function(error) {
        report(error);
        } );
    }
    else
    {
      atoroutes = decodeRoutes2(d);
      tisbus = true;
      checktime3(gc4);
    }
    } ).catch(function(error) {
    report(error);
  } );
}

function gc4()
{
  let p = xsvc.findConnections(xstartid, xdestid, xdatetime, xstartmode, xstartindex, xdestmode, xdestindex);
  p.then(findDisplay).catch(function(error) {
    clearFcbut();
    report(error);
    } );
}

function findDisplay() 
{
  let c = ctnx;
  cleanDuplicateTripOptions(c);
  let ca = c.TripOptions;
  report(ca.length + " itineraries found.");
  clearFcbut();
  let kkk = ca.length;
  if(kkk > 0) 
  {
    DISPLAYTYPE = 2;
    updateDisplay();
  }
  else 
  {
    if(SNDMODE == 2) sayPhrase("EOP4"); //say("No itineraries found");
 //   alert("No itineraries found.\n" + SPX);
    DISPLAYTYPE = 6;
    report("\n\nSummary:  No itineraries found.\n" + SPX);
    updateDisplay();
  }
}

function checktime(f)
{
  let tn = Date.now();
  let tx = (tn - DUtime);
  if(tx > 10000) 
  {
//    report("checktime now");
    f();
  }
  else setTimeout(f, 11000 - tx);
}

function checktime3(f)
{
  let T = 5000;
  let tn = Date.now();
  let tx = (tn - DUtime);
//  report("10097 " + tn + " " + DUtime);
  if(tx > T) 
  {
//    report("checktime now");
    f();
  }
  else setTimeout(f, 1.1 * T - tx);
}
   
function decodeRoutes(d)
{
  let f = "";
  if(d != null)
  {
    let k1 = d.mode.length;
    report("decodeRoutes " + k1);
    let i1 = 0;
    while(i1 < k1)
    {
      let r1 = d.mode[i1];
      let k2 = r1.route.length;
      let i2 = 0;
      while(i2 < k2)
      {
        let s = r1.route[i2].route_id;
        if(f != "") f += "," + s;
        else f = s;
        i2 += 1;
      }
      i1 += 1;
    }
  }
  return(f);
}

function decodeRoutes2(d)
{
    let rids = "";
    let t2 = d.mode;
    let da = [];
    if(d.mode === undefined) 
    {
      report("decodeRoutes2 d.mode is undefined");
    }
    else
    {
    let k2 = t2.length;
    let i2 = 0;
    while(i2 < k2)
    {
      let t3 = t2[i2].route;
      let k3 = t3.length;
      let i3 = 0;
      while(i3 < k3)
      {
//        let t4 = t3[i3].direction;
//        if(rids != "") rids += ",";
//        rids += t3[i3].route_id;
        let tx = t3[i3].route_id;
        if(notInArray(tx, da)) da[da.length] = tx
        i3 += 1;
      }
      i2 += 1;
    }
    
    k2 = da.length;
    i2 = 0;
    while(i2 < k2)
    {
      if(i2 > 0) rids += ",";
      rids += da[i2];
      i2 += 1;
    }
    report("decodeRoutes2 rids = " + rids);
    }
    return(rids);
}

function notInArray(x, a)
{
  let b = true;
  let k = a.length;
  let i = 0;
  while(b && (i < k))
  {
    if(a[i] == x) b = false;
    i += 1;
  }
  return(b);
}

function viewAlerts()
{
  document.getElementById("spp").checked = true;
  updateSPS();
  viewTrainBoard();
  bshowAlerts = true;
}

function updateSPS()
{
  if(document.getElementById("spa").checked) bUseSked = true;
  /*
  else if(document.getElementById("sps").checked) 
  {
    bUseSked = true;
  }
  */
  else bUseSked = false;
  displaystop = "";
  displaytripid = "";
}

let SEARCHB = null;

function searchStop()
{
  let s = document.getElementById("shst").value.toLowerCase();
  let type = 0;
//  if(document.getElementById("tpt").checked) type = 1;
//  else if(document.getElementById("tps").checked) type = 2;
//  else if(document.getElementById("tpz").checked) type = 3;
  type = 3;
  let r = searchForStops(s, type, 50);
  SEARCHB = r;
  let ss = document.getElementById("stoplist");
  let i = ss.children.length - 1;
  while( i >= 0)
  {
    ss.remove(i);
    i -= 1;
  }
  let k = r.length;
  i = 0;
  let z = 0;
  while(i < k)
  {
    let op = document.createElement("option");
    let t = r[i+1];
    t.replace('amp;', ''); // does not work
    op.text = t;
    ss.add(op);
    i += 2; 
  }
  
}

function selectFromList()
{
  let i = document.getElementById("stoplist").selectedIndex;
  let pname = SEARCHB[2*i + 1];
  let pid = SEARCHB[2*i];
  pname = pname.trim();
  pid = pid.trim();
  if(bFindFrom) 
  {
    setFindFrom(pname, pid);
    menu("Plan");
  }
  else if(bFindTo) 
  {
    setFindTo(pname, pid);
    menu("Plan");
  }
  else
  {
    CloseMenu();
    setPlaceId(pid);
    SelectedPlace = Place;
    pcolor = "red";
    DISPLAYTYPE = 0;
    refresh();
    report("search " + pname + " " + pid);
  }
  bFindFrom = false;
  bFindTo = false;
  bUseFile = false;
  updateDisplay();
}


function deleteLocal2()
{
  let x = document.getElementById("pfilelist").selectedIndex;
  if(x != -1)
  {
    if(confirm("Do you want to delete the selected item from local storage?"))
    {
      localStorage.removeItem(localStorage.key(x));
      CloseMenu();
    }
  }
}


function openFileFS()
{
CloseMenu();
document.getElementById("files").click();
}

/*
function openFileFS()
{
CloseMenu();
menu("OpenFile");
//document.getElementById("files").click();
}
*/

function openSelFile(evt)
{
  let files = evt.target.files;
  ofname = files[0].name;
  let n = ofname.indexOf(".sk");
  if(n != -1)
  {
    reader = new FileReader();
    reader.onload = function(evt)
    {
      clearReport();
      report(evt.target.result);
      let t = JSON.parse(evt.target.result);
      let k = Number(ofname.substring(n+3));
      switch(k)
      {
        case 0:
          DISPLAYTYPE = 0;
          displayid = ofname.substring(0, n);
          setPlaceId(displayid);
          displaystop = Place; 
          displayj = t;
          report("10808 openSelFile 0 " + Place + " " + Place_id + " " + displayj.mode.length);
          bUseFile = true;
          updateDisplay();
          break;
        case 1:
          DISPLAYTYPE = 1;
          displaysked = t;
          report("10815 " + t.trip_id);
          displaytripid = t.trip_id;
          CurrentTripID = t.trip_id;
          LegStartid = Place_id;
          LegDestid = null;
          updateDisplay();
          break;
      }
   }
    reader.readAsText(files[0]);
  }
  else if(ofname.indexOf(".gpx") != -1)
  {
    reader = new FileReader();
    reader.onload = function(evt)
    {
      clearReport();
//      report(evt.target.result);
      let xmlDoc = new DOMParser().parseFromString(evt.target.result, 'text/xml');
      mapGPX(xmlDoc, ofname);
    }
    reader.readAsText(files[0]);
  }
}

function clearCache()
{
  if(navigator.cookieEnabled)
  {
    let k = localStorage.length;
    let i = k-1;
    let z = 0;
    while(i >= 0)
    {
      let t = localStorage.key(i);
      let n = t.indexOf("CACHE_");
      if(n == 0)
      {
        localStorage.removeItem(localStorage.key(i));
      }
      i -= 1;
    }
  }
  clearArray(SUB);
}

function addToCache(id, data)
{
  if(navigator.cookieEnabled)
  {
    let x = localStorage.getItem("CACHE_" + id);
    if(x != null)
    {
      localStorage.removeItem("CACHE_" + id);
    }
    localStorage.setItem("CACHE_" + id, data);
  }
}

function getFromCache(id)
{
  let x = null;
  if(navigator.cookieEnabled) x = localStorage.getItem("CACHE_" + id);
  return(x);
}

function deleteFromCache(id)
{
  if(navigator.cookieEnabled) localStorage.removeItem("CACHE_" + id);
}

/**
 * m = 0 is stop info
 * m = 1 is trip info
 * m = 3 is itinerary info
 * n = index 1 or 2
 * 
 */
function saveTrip(n, m)
{
  let fn = "";
  if((n == 1) || (n == 2))
  {
    let data = null;
    if(m == 0)
    {
      data = JSON.stringify(Place_id);
//      report("10494 data = " + data);
      fn = "FAV" + n + ".sk0";
      localStorage.setItem(fn, data);
    }
    else if(m == 1)
    {
      data = JSON.stringify(displaysked);
      fn = "FAV" + n + ".sk1";
      localStorage.setItem(fn, data);
      fn = "FAV" + n + ".sk2";
      localStorage.setItem(fn, CurrentTripID);
    }
    else if(m == 3)
    {
      data = JSON.stringify(ctnx);
      fn = "FAV" + n + "_" + DETAILSINDEX + "Connections.sk3";
      localStorage.setItem(fn, data);
      fn = "FAV" + n + ".sk4";
      localStorage.setItem(fn, DETAILSINDEX);
   }
//   if(navigator.cookieEnabled) localStorage.setItem(fn, data);
  }
  CloseMenu();
}

function openTrip(n, m)
{
  if(navigator.cookieEnabled)
  {
  let k = localStorage.length;
  let i = 0;
  let nt = "";
  if(m == 0)
  {
    nt = "FAV" + n + ".sk0";
    let d = localStorage.getItem(nt);
    if(d != null) 
    {
      setPlaceId(JSON.parse(d));
      DISPLAYTYPE = 0;
      updateDisplay();
    }
  }
  else if(m == 1) 
  {
    nt = "FAV" + n + ".sk1";
    let d = localStorage.getItem(nt);
    if(d != null)
    {
      let data = JSON.parse(d);
      let tid = localStorage.getItem("FAV" + n + ".sk2");
      DISPLAYTYPE = 1;
      displaytripid = tid;
      CurrentTripID = tid;
      displaysked = data;
      updateDisplay();       
    }
  }
  else if(m == 3) 
  {
    nt = "FAV" + n + ".sk3";
    let d = localStorage.getItem(nt);
    if(d != null)
    {
      let data = JSON.parse(d);
      DISPLAYTYPE = 3;
      ctnx = data;
      nt = "FAV" + n + ".sk4";
      DETAILSINDEX = localStorage.getItem(nt);
      updateDisplay();
    }
  }
  }
  CloseMenu();
  
}

function getFavName(n, y)
{
  let s = "";
  if(navigator.cookieEnabled)
  {
  let k = localStorage.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    let t = localStorage.key(i);
    let nt = -1;
    if(y == 1) nt = t.indexOf(".sk1");
    else if(y == 3) nt = t.indexOf(".sk3");
    else nt = t.indexOf(".sk0");
    let m = t.indexOf("FAV"+n);
//    report(":" + t + " " + m);
    if((m == 0) && (nt != -1))
    { 
      let d = JSON.parse(localStorage.getItem(t));
      if(y == 3)
      {
        let kk = t.indexOf("_");
        let jj = t.indexOf("Connections");
        let index = t.substring(kk + 1, jj);
//        DETAILSINDEX = index;
//        displayData(t, d);
      }
      else
      {
//        capt = d.trip_name;
//        displayData(t.substring(4), d);
      }
      b = false;
      s = t.substring(4, nt);
    }
    i += 1;
  }
//  if(b) report("No Favorite Trip " + n + " saved.");
//  report("getFavName = " + s);
  }
  return(s);
}

function openLocal()
{
  CloseMenu();
  if(navigator.cookieEnabled)
  {
  let ss = document.getElementById("pfilelist");
  let i = ss.children.length - 1;
  while( i >= 0)
  {
    ss.remove(i);
    i -= 1;
  }
  clearArray(LFN);
    let k = localStorage.length;
    i = 0;
    let z = 0;
    while(i < k)
    {
      let t = localStorage.key(i);
      let n = t.indexOf(".sk");
      let m = t.indexOf("CACHE_");
      let p = t.indexOf(".gpx");
      if((n != -1) || (m == 0) || (p != -1))
      {
        let op = document.createElement("option");
        LFN[LFN.length] = t;
        op.text = t;
        ss.add(op);
      }
      i += 1; 
    }
  menu("FileSel");
  }
}

function openLocalFile()
{
  if(navigator.cookieEnabled)
  {
    let i = document.getElementById("pfilelist").selectedIndex;
    let fn = LFN[i];
    if(fn.indexOf(".gpx") != -1)
    {
      let xmlDoc = new DOMParser().parseFromString(localStorage.getItem(fn), 'text/xml');
      mapGPX(xmlDoc, ofname);    
    }
    else
    {
//  let t = localStorage.getItem(fn);
      let t = JSON.parse(localStorage.getItem(fn));
      displayData(fn, t);
    }
  }
  CloseMenu();
}

function displayData(n, t)
{
  let i = n.indexOf(".sk");
  let j = n.indexOf("CACHE_");
  let k = 0;  
  if(i != -1)
  {
    k = Number(n.substring(i+3));
  }
  else i = n.length;
  if((i != -1) || (j == 0))
  {
    switch(k)
    {
      case 0:
        DISPLAYTYPE = 0;
        if(j == 0) displayid = n.substring(6, i);
        else displayid = n.substring(0, i);
        setPlaceId(displayid);
        displaystop = Place; //getStopNameFromID(displayid);
        displayj = t;
        bUseFile = true;
        updateDisplay();
        break;
      case 1:
        DISPLAYTYPE = 1;
//        displayid = n.substring(0, i);
//        setPlaceId(displayid);
//        displaystop = getStopNameFromID(displayid);
        displaytripid = t.trip_id;
        CurrentTripID = t.trip_id;
        displaysked = t;
        LegStartid = Place_id;
        LegDestid = null;
        updateDisplay();
        break;
      case 2:
        DISPLAYTYPE = 2;
        ctnx = t;
        updateDisplay();
        break;
      case 3:
        DISPLAYTYPE = 3;
        ctnx = t;
        updateDisplay();
        break;        
      default:
        break;
    }
   }
}

function saveLocalFile()
{
  if(navigator.cookieEnabled)
  {
  let fn = "";
  let data = "";
  report("DISPLAYTYPE = " + DISPLAYTYPE);
  switch(DISPLAYTYPE)
  {
    case 0:
      data = JSON.stringify(displayj);
      fn = displayid + ".sk0";
      report("displayid = " + displayid);
      if((displayid != null) && (displayid != ""))
      {
        let fn = prompt("Save locally as:", fn);
        if((fn != null) && (fn != ""))
        {
          localStorage.setItem(fn, data);
        }
      }
      break;
    case 1:
      data = JSON.stringify(displaysked);
      fn = displaysked.trip_id + ".sk1";
      report("displayid = " + displayid);
      if((displayid != null) && (displayid != ""))
      {
        let fn = prompt("Save locally as:", fn);
        if((fn != null) && (fn != ""))
        {
          localStorage.setItem(fn, data);
        }
      }
      break;
    case 2:
      data = JSON.stringify(ctnx);
      fn = prompt("Enter connections file name", "MyTrip1.sk2");
      if((fn != null) && (fn != ""))
      {
        if(fn.indexOf(".sk2") == -1) fn = fn + ".sk2";
        if(confirm("Save locally as: " + fn))
        {
          localStorage.setItem(fn, data);
        }
      }
      break;
      
    default:
      break;
  }
  }
  CloseMenu();
}

function saveFileLocal(filename, data)
{
  localStorage.setItem(filename, data);
}

function saveFS()
{
  let fn = "";
  let data = "";
  switch(DISPLAYTYPE)
  {
    case 0:
      data = JSON.stringify(displayj);
      fn = displayid + ".sk0";
      if((displayid != null) && (displayid != "")) saveFileFS(fn, data);
      break;
    case 1:
      data = JSON.stringify(displaysked);
      fn = displaysked.trip_id + ".sk1";
      if((displayid != null) && (displayid != "")) saveFileFS(fn, data);
      break;
    default:
      break;
  }
  CloseMenu();
}

function saveFileFS(filename, data)
{
	let textFileAsBlob = new Blob([data], {type:'text/plain'});
	let downloadLink = document.createElement("a");
	downloadLink.download = filename;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}

function saveBlobFS(filename, blob)
{
	let downloadLink = document.createElement("a");
	downloadLink.download = filename;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(blob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(blob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function getSBR()
{
  CloseMenu();
  let s = prompt("Enter route_id");
  if((s != null) && (s != ""))
  {
      let t1 = Math.floor((new Date()).getTime() / 1000);
      report("t1 = " + t1);
      let p31 = service3.getScheduleByRoutes(s, 240, 5, t1);
      p31.then( function(t) {
      let t1 = t.mode;
      let k1 = t1.length;
      let i1 = 0;
      clearReport();
//      report(":");
//      report(JSON.stringify(t1));
//      report(":");
      } ).catch( function(err) {
        report(err);
      } );
  }
}

function getPBR()
{
  CloseMenu();
  let s = prompt("Enter route_id");
  if((s != null) && (s != ""))
  {
      let p31 = service3.getPredictionByRoute(s, 240, 5);
      p31.then( function(t) {
      let t1 = t.mode;
      let k1 = t1.length;
      let i1 = 0;
//      clearReport();
//      report("\n:");
//      report(JSON.stringify(t1));
//      report(":\n");
      } ).catch( function(err) {
        report(err);
      } );
  }
}

function changeTime()
{
  let tmin = Number(document.getElementById("chgt").value);
  if(isNaN(tmin)) ;
  else
  {
    Tchg = tmin * 60;
  }
}

function beep()
{
if(document.getElementById("eaudio").checked) beep1();
}

function saveFile(filename, data)
{
	let textFileAsBlob = new Blob([data], {type:'text/plain'});
	let downloadLink = document.createElement("a");
	downloadLink.download = filename;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function printPreview(n)
{
PrintMode = n;
report("Print Preview");
CloseMenu();
wxxx = window.open("", "Print Preview", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360");
wxxx.document.open();
wxxx.document.write("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n");
wxxx.document.write("<meta name=viewport content=\"width=device-width, initial-scale=1\">\n");
wxxx.document.write("</head>\n<body>\n");

if(DISPLAYTYPE == 2)
{
  let s = "<span style='font-size: 10pt;color:black; float:left; text-align:left;'>From: " + getStopNameFromID(ctnx.startid);
  let dt = new Date(1000 * ctnx.datetime).toLocaleString();
  s += "<br>To: " + getStopNameFromID(ctnx.destid) + "&nbsp;&nbsp;&nbsp;&nbsp;" +  dt + "<br></span>";
  s += "<table class='datatable'><tr><th style='width:20%'>Depart</th><th style='width:20%'>Arrive</th><th style='width:20%'>Duration</th><th style='width:20%'>Changes</th><th>&nbsp;</th></tr>";
  let kk = ctnx.TripOptions.length;
  let ii = 0;
  while (ii < kk)
  {
    let tf = ctnx.TripOptions[ii];
    let bok = checkTripOption(tf);
    let t1 = getTimeString(tf.legs[0].starttime);
    let t2 = getTimeString(tf.legs[tf.legs.length -1].desttime);
    let t3 = tf.legs[tf.legs.length -1].desttime - tf.legs[0].starttime;
    let t30 = tf.check.duration;
    let myt = (Math.floor(t3/60) % 60);
    myt = myt.toString();
    let mys = (Math.floor(t30/60) % 60);
    mys = mys.toString();
    if(myt.length == 1) myt = "0" + myt;
    if(mys.length == 1) mys = "0" + mys;
    let st3 = Math.floor(t3/3600) + ":" + myt;
    let st4 = Math.floor(t30/3600) + ":" + mys;
    let tu = tf.legs[0].starttime - getTTime();
    if(!bok) 
    {
      st3 = "-";
      t2 = "-";
    }
    let bhbc = !document.getElementById("hbc").checked;
    if(bok || bhbc) 
//    s += "<tr class='datatable' style=\'line-height: 40px;\'><td>" + t1 + "</td><td>" + t2 + "</td><td>" + st3 + "(" + st4 +")</td><td>" + (tf.legs.length -1) + "</td><td></td></tr>";
    s += "<tr class='datatable' style=\'line-height: 40px;\'><td>" + t1 + "</td><td>" + t2 + "</td><td>" + st4 + "</td><td>" + (tf.legs.length -1) + "</td><td></td></tr>";
    ii += 1;
  }
  s += "</table>";
  wxxx.document.write(s);
}
else if(DISPLAYTYPE == 3)
{
 let s = "<span style='font-size: 10pt;color:black; float:left; text-align:left;'>From: " + getStopNameFromID(ctnx.startid);
  let dt = new Date(1000 * ctnx.datetime).toLocaleString();
  s += "<br>To: " + getStopNameFromID(ctnx.destid) + "&nbsp;&nbsp;&nbsp;&nbsp;" +  dt + "<br></span>";
  s += "<br><br><table ><tr><th style='width:10%'>Time</th><th style='width:10%'>Stop</th><th style='width:20%'>Remark</th></tr>";
  let TripOp = null;
  let lastlegdesttime = 0;
  let lastlegdestid = null;
  let legs = null;
  let kk = 0;
  if(ctnx.TripOptions[DETAILSINDEX] === undefined)
  {
  }
  else
  {
    TripOp = ctnx.TripOptions[DETAILSINDEX];
    legs = TripOp.legs;
    kk = legs.length;
  }
  let bFail = false;
  if(legs != null)
  {
  let sx = getStopNameFromID(legs[0].startid);
  if((sx != Place) && (kk > 0))
  {
      let pt1 = getPositionForName(sx);
      let pt2 = getPositionForName(Place);
      let d = getDistanceBetween(pt1.x, pt1.y, Xpos, Ypos);
      d = Math.ceil(10 * d) / 10;
      let td = d * 19.5;
      td = Math.ceil(10 * td) / 10;
      let tu = legs[0].starttime - (60 * td) - getTTime();
      if((d < WALK_LIMIT) && (d > .05))
      {
        s += "<tr style=\'line-height: 40px;border-width:2px;\'><td colspan=3 class='datatable' >Walk  (" + td + " min ) " + d + " mi from here to " + sx  + "</td></tr>";
      }
      else if((d >= WALK_LIMIT) && (d < 2))
      {
        ccolor = "lightgrey";
        s += "<tr style=\'line-height: 40px;border-width:2px;\'><td colspan=3 class='datatable' >Start station, " + sx + ", is " + d + " mi away from here.</td></tr>";
      }
      else
      {
        let d2 = getDistanceBetween(pt1.x, pt1.y, pt2.x, pt2.y);
        d2 = Math.ceil(10 * d2) / 10;
        let td = d2 * 19.5;
        td = Math.ceil(10 * td) / 10;
        if(d < 2)
        {
        s += "<tr style=\'line-height: 40px;border-width:2px;\'><td colspan=3 class='datatable' >Walk  (" + td + " min ) " + d + " mi from " + ss + " to " + sx  + "</td></tr>";
        
        }
        else 
        {
        s += "<tr style=\'line-height: 40px;border-width:2px;\'><td colspan=3 class='datatable' >Start station, " + sx + ", is " + d + " mi away from here and " + d2 + " mi away from " + Place + ".</td></tr>";
        } 
      }
  }
  }
  
  let ii = 0;
  while (ii < kk)
  {
    let leg = legs[ii];
    let t1 = getTimeString(leg.starttime);
    let t2 = getTimeString(leg.desttime);
    let t3 = Math.round((leg.desttime - leg.starttime) / 60);
    let trs = Number(leg.starttime) + 60 * getTZOffset(leg.startid);
    let trd = Number(leg.desttime) +  60 * getTZOffset(leg.destid);
    let duration = Math.floor((trd - trs) / 60);
    let hrs = Math.floor(duration / 60);
    let min = duration % 60;
    let ctime = (leg.starttime - lastlegdesttime) / 60; // minutes
    let cctime = ctime;
    if(ctime < 0) 
    {
        ctime = "no data";
        t1 = "-";
        t2 = "-";
        bFail = true;
        if(typeof leg.frequency != 'undefined')
        {
          report("a. leg.starttime = " + leg.starttime + " leg.desttime = " + leg.desttime);
          leg.starttime = lastlegdesttime + 60 * leg.frequency;
          leg.desttime  += leg.starttime;
          report("b. leg.starttime = " + leg.starttime + " leg.desttime = " + leg.desttime);
        }
    }
    else if(ctime > 60)
    {
      ctime = Math.floor(ctime/60) + " hr " + Math.floor(ctime % 60) + " min";
    }
    else ctime = Math.floor(ctime) + " min";
    lastlegdesttime = leg.desttime;
    let tu = leg.starttime - getTTime();
    let dx = "";
    if((leg.tripleg != null) && (lastlegdestid != null))
    {
      let d0 = getPositionForId(lastlegdestid);
      if((d0 == null) && (lastlegdestid.indexOf("place-") == 0)) d0 = getPositionForParent(lastlegdestid);
      let d1 = getPositionForId(leg.startid);
      if((d1 == null) && (leg.startid.indexOf("place-") == 0)) d1 = getPositionForParent(leg.startid);
      
      let d = getDistanceBetween(d0.x, d0.y, d1.x, d1.y);
      d = Math.round(100 * d) / 100;
      let td = Math.ceil(d * 19.5);
      if(d > .05) dx = "&nbsp;&nbsp;&nbsp;(Walk " + d + " mi in est " + td + " min)";
    }
    if(ii > 0) s += "<tr style=\'line-height: 40px;border-width:2px;border-color:#000000\'><td colspan=3 class='datatable' style=\'border-width:4px;border-color:#000000\' >Change  (" + ctime + ")" + dx + "</td></tr>";
    s += "<tr ><td>Depart " + t1 + "</td><td>" + getStopNameFromID(leg.startid) + "</td><td></td></tr>";
    let hs = "";
    if(leg.tripleg != null)
    {
    lastlegdestid = leg.destid;
    let ridp = getPhraseForRoute(leg.routeid, leg.tripleg.trip_name);
    let hs = leg.tripleg.trip_headsign;
    if(hs == "") hs = leg.direction_name + "  " + ridp + " " + leg.tripleg.trip_id;
    else hs = "to " + hs + ": \u00A0 \u00A0 " + leg.direction_name + "  " + ridp + " " + leg.tripleg.trip_id + "\n" +
       leg.tripleg.trip_name;
    let r4 = Math.round(leg.dist /t3 * 60);
    if(!isNaN(leg.routeid)) hs = "Bus " + leg.routeid + " " + hs;
    s += "<tr style=\'line-height: 40px;\'><td colspan='3'> <span style=\'font-size: 9pt;\'>" + hs + "</span></td></tr>";
    s += "<tr><td>Arrive " + t2 + "</td><td>" + getStopNameFromID(leg.destid) + "</td><td>(" + leg.dist + " mi, " + t3 + " min, " + r4 + " mi/hr)</td></tr>";
    }
    else
    {
    s += "<tr style=\'line-height: 40px;\'><td colspan='3'> " + hs + "</td></tr>";
    if(!isNaN(leg.routeid))
    {
      s += "<tr style=\'line-height: 40px;\'><td colspan='3'> <span style=\'font-size: 9pt;color:#0000cc;\'>Bus " + leg.routeid + "</span></td></tr>";
    }
    else
    {
      s += "<tr style=\'line-height: 40px;\'><td colspan='3'><span style=\'font-size: 9pt;\'> No trip found for route " + leg.routeid + "</span></td></tr>";   
    }
    s += "<tr style=\'line-height: 40px;\'><td>Arrive " + t2 + "</td><td>" + getStopNameFromID(leg.destid) + "</td><td>(" + leg.dist + " mi, " + t3 + " min, " + r4 + " mi/hr)</td></tr>";
    }
    ii += 1;
  }
  if((lastlegdestid != ctnx.destid) && (lastlegdestid != null))
  {
    let d0 = getPositionForId(lastlegdestid);
    let d1 = getPositionForId(ctnx.destid);
    if((d0 != null)  && (d1 != null))
    {
      let dg = getDistanceBetween(d0.x, d0.y, d1.x, d1.y);
      dg = Math.round(100 * dg) / 100;
      let td = Math.round(dg * 19.5);
      s += "<tr style=\'line-height: 40px;border-width:2px;\'><td colspan=3>Desired destination is " + dg + " mi away. (" + td + " min)</td></tr>";
    }
    
  }
  s += "</table>";
  wxxx.document.write(s);
}
else if(DISPLAYTYPE == 1)
{
  let s = "<span style='font-family:monospace;font-size: 10pt;color:black; float:left; text-align:left;'>" + capt + "<br>";
  s += "<table><tr><th style='width:10%'>Time</th><th style='width:10%'></th><th style='width:20%'>Stop</th></tr>";
  let len = BSND.length;
  let i = 0;
  for(i = 0; i < len; i++)
  {
    s += "<tr><td>" + BSND[i].hh + ":" + BSND[i].mm;
    if(BSND[i].bPM) s += " PM";
//    report("BSND.stop_id = " + BSND[i].stop_id);
//    s += "</td><td>"; 
//    if(typeof BSND[i].timetil !== 'undefined') s += BSND[i].timetil + " min";
    s += "</td><td>" + getStopNameFromID(BSND[i].stop_id) + "</td></tr>";
  }
  
  s += "</table></code>";
  wxxx.document.write(s);
}
else if(DISPLAYTYPE == 0)
{
  let s = "<span style='font-family:monospace;font-size: 10pt;color:black; float:left; text-align:left;'>" + Place + "<br>";
  s += "<table><tr><th style='width:10%'>Time</th><th style='width:10%'></th><th style='width:20%'>Stop</th></tr>";
  let len = ASND.length;
  let i = 0;
  for(i = 0; i < len; i++)
  {
    s += "<tr><td>" + ASND[i].hh + ":" + ASND[i].mm;
    if(ASND[i].bPM) s += " PM";
//    report("ASND.dest = " + ASND[i].dest);
//    s += "</td><td>"; 
//    if((typeof ASND[i].timetil !== 'undefined') && (ASND[i].timetil != "")) s += ASND[i].timetil + " min";
    s += "</td><td>to " + ASND[i].dest + " (" + ASND[i].id + ") " +  ASND[i].tripname + "</td></tr>";
  }
  
  s += "</table></code>";
  wxxx.document.write(s);
}
else wxxx.document.write(document.getElementById("pinz").innerHTML + "\n");

wxxx.document.write("</body>\n");
wxxx.document.close();

}

function updateDss()
{
  bDSS = document.getElementById("dss").checked;
  repaint();
}

function updateDs()
{
  bDS = document.getElementById("ds").checked;
  repaint();
}

function updateTiles()
{
  bTiles = document.getElementById("stiles").checked;
  repaint();
}

function apop(s)
{
  let pop = document.getElementById("desc");
  pop.innerHTML = s;
  pop.classList.toggle("show");
}

function alertw(s)
{
  let d = document.getElementById("alertwin");
  d.innerHTML = s;
  menu("AlertWindow");
  let x = (window.scrollY + 50) + "px";
  document.getElementById("AlertWindow").style.top = x;
}

function showAlertI(i)
{
  let desc = DT0Alerts[i].description;
  alertw(desc);
//  document.getElementById("alertwin").innerHTML = desc;
//  menu("AlertWindow");  
}

function alertw2(t)
{
//  document.getElementById("alertwin").innerHTML = t.description;
//  menu("AlertWindow");
  alertw(t.description);
}

function showAccess()
{
    let i = 0;
    let els = document.getElementsByClassName("tt");
    for(i = 0; i < els.length; i++)
    {
      els[i].style.display = "inline-block";
    }
}

function hideAccess()
{
    let i = 0;
    let els = document.getElementsByClassName("tt");
//    report("length = " + els.length);
    for(i = 0; i < els.length; i++)
    {
      els[i].style.display = "none";
    }    
}

function setWalkLimit()
{
  WALK_LIMIT = document.getElementById("wdmi").value;
}

function reportAS()
{
  clearReport();
  let s = "Service Report\n\n";
  s += serviceE.reportService();
  clearReport();
  report(s);
  CloseMenu();
}

function showTripInfo()
{
  CloseMenu();
  if(CurrentTrip == null) report("CurrentTrip is null");
  else
  {
  let r = serviceE.getRouteS(CurrentTrip.route_id);
  if(r == null)
  {
    r = serviceT.getRouteS(CurrentTrip.route_id);
  }
  if(r != null)
  {
  let d = r.getTTrip(CurrentTrip.trip_id);
  let s = d.trip_name + " (" + d.trip_id +")\n";
  s += "to " + d.headsign + " " + d.getDays() + "\n";
  if(d.cal != null)
  {
    let svc = d.cal.getService(d.service_id);
    s += "last updated " + d.cal.lastUpdated + "\n";
    s += "feed Info " + d.cal.feedInfo + "\n";
    s += "start_date " + svc.start_date + "\n";
    s += "end_date " + svc.end_date;
  }
  }
  else  
  {
    s = CurrentTrip.trip_name + " (" + CurrentTrip.trip_id + ")\n";
  }
  }
  alert(s);
}

function saveReport()
{
  if(!ipod) saveFile(reportfilename, document.getElementById("ta").value);
  else 
  {
    let email=('me@myemail');
    let subject = ('eightolives Trains file');
    let cc = ('');
    let bcc = ('');
    let body = encodeURI(document.getElementById("ta").value);
    window.location = "mailto:" + email + '?subject=' +subject+ '&cc=' +cc+ '&bcc=' +bcc+ '&body=' +body;
  }
}

function dreport(s)
{
if(document.getElementById("debugr"));
{
let ta = document.getElementById("ta");
//if(ta.value.length > 1000) ta.value = "";
if(ta != null) ta.value = ta.value + s + "\n";
else alert("report: " + s);
}
}

function report(s)
{
if(Debug)
{
let ta = document.getElementById("ta");
//if(ta.value.length > 1000) ta.value = "";
if(ta != null) ta.value = ta.value + s + "\n";
else alert("report: " + s);
scrollReporttoBottom();
}
}

function scrollReporttoBottom()
{
  let ta = document.getElementById("ta");
  ta.scrollTop = ta.scrollHeight;    
}

function clearReport()
{
if(Debug) document.getElementById("ta").value = "";
reportfilename = "TrainsReport.txt";
}

function getGTFSDate()
{
  CloseMenu();
  clearReport();
  report("Get MBTA GTFS Last Modified Date:");
  let p = serviceEO.getMBTAGTFSDate();
  p.then(function(data){
    report(data);
    let a = data.split('\n');
    let k = a.length;
    let i = 0;
    let b = true;
    while(b && (i < k))
    {
      if(a[i].indexOf("Last-Modified") == 0)
      {
        b = false;
        report(a[i]);
      }
      i += 1;
    }
  } ).catch(function(error){
    report(error);
  });
}

function getLIRRDate()
{
  CloseMenu();
  clearReport();
  report("Get LIRR GTFS Last Modified Date:");
  let p = serviceEO.getLIRRGTFSDate();
  p.then(function(data){
    report(data);
    let a = data.split('\n');
    let k = a.length;
    let i = 0;
    let b = true;
    while(b && (i < k))
    {
      if(a[i].indexOf("Last-Modified") == 0)
      {
        b = false;
        report(a[i]);
      }
      i += 1;
    }
  } ).catch(function(error){
    report(error);
  });
}

function getMetraDate()
{
  CloseMenu();
  clearReport();
  report("Get Metra GTFS Last Modified Date:");
  let p = getRealTimeData("207");
  p.then(function(response){
    report(response);
    }).catch(function(error){
    report(error);
  });
}

function getMetraGTFS()
{
  CloseMenu();
  report("Get Metra GTFS");
  let p = getRealTimeData(206);
  p.then(function(data){
    saveFileFS("Metragtfs.zip", data);
    }).catch(function(error){
    report(error);
  });
}

function getFacilityInfo()
{
  let stop = prompt("Enter stop_id", getParentIdFromId(Place_id));
  let facility_type = prompt("Enter facility_type", "elevator");
  if((stop != null) && (facility_type != null))
  {
  let p = serviceEO.getFacilityInfo(stop, facility_type);
  p.then(function(data){
    clearReport();
    report(data);
  } ).catch(function(error){
    report(error);
  });
  }
  CloseMenu();  
}

function getFacilityInfoByStop()
{
  let p = serviceEO.getFacilityInfoByStop(getParentIdFromId(Place_id));
  p.then(function(data){
    clearReport();
    report(data);
  } ).catch(function(error){
    report(error);
  });
  CloseMenu();  
}

function getPathwaysInfoByStop()
{
  let p = serviceEO.getPathwaysInfoByStop(Place_id);
  p.then(function(data){
    clearReport();
    report(data);
  } ).catch(function(error){
    report(error);
  });
  CloseMenu();  
}

function getLevelsInfoByStop()
{
  let p = serviceEO.getLevelsInfoByStop(Place_id);
  p.then(function(data){
    clearReport();
    report(data);
  } ).catch(function(error){
    report(error);
  });
  CloseMenu();  
}

function test14()
{
  let s = prompt("Key");
  if(s == "do14")
  {
  let p = serviceEO.test14();
  p.then(function(data){
    report(data);
  } ).catch(function(error){
    report(error);
  });
  }
  CloseMenu();
}

function dev(n)
{
  let s = prompt("Key");
  if(s == "do14")
  {
  let p = serviceEO.test(n);
  p.then(function(data){
    report(data);
  } ).catch(function(error){
    report(error);
  });
  }
  CloseMenu();
}

function dev2(n)
{
  let s = prompt("Key");
  if(s == "do14")
  {
  let p = serviceEO.test2(n);
  p.then(function(data){
    report(data);
  } ).catch(function(error){
    report(error);
  });
  }
  CloseMenu();
}

function dev3(n)
{
  let s = prompt("Key");
  if(s == "do14")
  {
  let p = serviceEO.test3(n);
  p.then(function(data){
    report(data);
  } ).catch(function(error){
    report(error);
  });
  }
  CloseMenu();
}

function dev4(n)
{
  let s = prompt("Key");
  if(s == "do14")
  {
  let p = serviceEO.test4(n);
  p.then(function(data){
    report(data);
  } ).catch(function(error){
    report(error);
  });
  }
  CloseMenu();
}

function developer()
{
  let s = prompt("Key");
  if(s == "do14")
  {
    menu("Dev");
  }
  else CloseMenu();
}

function selectLang()
{
  SelectedLanguage = document.getElementById("langsel").selectedIndex;
  let n = "en";
  switch(SelectedLanguage)
  {
  case 0: n = "en-US"; break;
  case 1: n = "es-ES"; break;
  case 2: n = "fr-FR"; break;
  case 3: n = "de-DE"; break;
  case 4: n = "it-IT"; break;
  case 5: n = "ja-JP"; break;
  case 6: n = "zh-CN"; break;
  default: n = null;
  }
  let b = getVoice(n);
  if(!b)
  {
    switch(SelectedLanguage)
    {
    case 0: n = "en"; break;
    case 1: n = "es"; break;
    case 2: n = "fr"; break;
    case 3: n = "de"; break;
    case 4: n = "it"; break;
    case 5: n = "ja"; break;
    case 6: n = "cmn"; break;
    default: n = "en";
    }
    getVoice(n);
  }
  report("11193 SelectedLanguage = " + SelectedLanguage + " " + n); 
  eo_i18n.updateLanguage(SelectedLanguage).then(() => {
      eo_i18n.updateLanguageContent()
      report("12077 ");
    }).catch((e) => {
        report("12076 " + e);
    });
}

function getVoice(lang)
{
  let b = true;
  if(lang != null)
  {
  let k = voices.length;
  let i = 0;
  while(b && (i < k))
  {
    if((voices[i] != null) && (voices[i].lang != null) && (voices[i].lang.indexOf(lang) == 0))
    {
      b = false;
      document.getElementById("vselect").selectedIndex = i;
    }
    else i += 1;
  }
//  if(b) report("no voice found for language " + lang);
  }
  return(!b);
}


function initAudio()
{
  let p = new Promise(function(resolve, reject){
//    synth = window.speechSynthesis;
    if(synth != null)
    {
      let dummy = new SpeechSynthesisUtterance();
      voices = synth.getVoices();
      if(voices.length !== 0)
      {
        bVoices = true;
        populateVoices();
        resolve(voices);
      }
      else if(typeof synth.onvoiceschanged !== 'undefined') 
      {
        synth.addEventListener("voiceschanged", function() {
          voices = synth.getVoices();
          report("voices a changed " + voices.length);
          if(voices.length != 0) 
          {
            bVoices = true;
            populateVoices();
            resolve(voices);
          }
          else
          {
            reject("10716 no voices found");
          }
          });        
      }
      else
      {
        let id;
        id = setTimeout(() => {
          if (synth.getVoices().length !== 0) {
             resolve(synth.getVoices());
//             clearInterval(id);
          }
        }, 5000);
      }      
    }
    else reject("no speech synthesis");
  });
  return(p);
}

function populateVoices()
{
//  voices = synth.getVoices();
  let vs = document.getElementById("vselect");
//  vs.multiple  = false;
  let ds = -1;
  let es = -1;
  let fs = -1;
  let gs = -1;
  let defau = -1;
  let selname = getLocal("TrainsVoiceName");
  let sellang = getLocal("TrainsVoiceLang");
//  report("11276 " + selname + " " + sellang + " " + SelectedVoiceIndex);
  if((bFirstVoice || (vs.options.length == 0)) && (voices.length > 0))
  {
  report("voices length = " + voices.length); 
  for(let i = 0; i < voices.length ; i++) 
  {
    if((voices[i] != null) && (voices[i].lang != null))
    {
//    report(voices[i].name + " " + voices[i].lang);
      bFirstVoice = false;
      let opt = document.createElement('option');
      opt.textContent = voices[i].name + '(' + voices[i].lang + ')';
      if(SelectedVoiceIndex == -1)
      {
        if(voices[i].name == "Samantha") ds = i;
        if(voices[i].name.indexOf("Samantha") != -1) fs = i;  // apple
        if(voices[i].name.indexOf("English_(America") != -1) gs = i;
        if(voices[i].lang == "en-US") es = i;  // chrome
      }
      if(voices[i].default)
      {
        opt.textContent += ' -- DEFAULT';
        defau = i;
      }
//    report("default = " + ds);
      opt.setAttribute('data-lang', voices[i].lang);
      opt.setAttribute('data-name', voices[i].name);
      vs.appendChild(opt);
      if((selname == voices[i].name) && (sellang == voices[i].lang))
      {
        vs.selectedIndex = i;
        SelectedVoiceIndex = i;
      }
    }
  }
  if(SelectedVoiceIndex == -1)
  {
    if(fs != -1) SelectedVoiceIndex = fs;
    else if(ds != -1) SelectedVoiceIndex = ds;
    else if(gs != -1) SelectedVoiceIndex = gs;
    else if(es != -1) SelectedVoiceIndex = es;
    else if(defau != -1) SelectedVoiceIndex = defau;
    else SelectedVoiceIndex = 0;
    vs.selectedIndex = SelectedVoiceIndex;
//    selectLang();
//  report("11439 voice " + vs.selectedIndex + " " + voices[vs.selectedIndex].lang + " " + voices[vs.selectedIndex].name);
  }
  }

  if((voices.length > 0) && (synth != null)) 
  {
    bVoices = true;
    if(document.getElementById("eaudio").checked)
    {
      document.getElementById("sb3").style.visibility = "visible";
    }
    else if(document.getElementById("aop").checked || bVoices)
    {
      document.getElementById("sb3").style.visibility = "visible";
      setTimeout(noAudio, 20000);
    }
  }
}

function say(txt)
{
  let p = new Promise(function(resolve, reject){
    if((synth == null) || (voices.length == 0))
    {
      report("synth null, say redefine");
      synth = window.speechSynthesis; 
    }
    if(typeof txt === 'undefined') {report("10145 say(txt) txt undefined"); console.trace();}
    else if(typeof txt.split === 'undefined') report("10146 txt is " + txt);
    else if((synth != null) && (voices.length > 0))
    {
      if(synth.paused) synth.resume();
      let sentences = txt.split("^");
      let j = 0;
      for(j = 0; j < sentences.length; j++)
      {
        let sentence = sentences[j];
        let phrase = new SpeechSynthesisUtterance(sentence); // was txt
        let i = document.getElementById("vselect").selectedIndex;
        SelectedVoiceIndex = i;
        phrase.voice = voices[i];
        phrase.pitch = 1.0;
        phrase.rate = 1.0;
        phrase.lang = phrase.voice.lang;
        phrase.onerror = function(event) {
          reject("Speech error sentence " + j + " " + event.error);
          };
        if(j == sentences.length - 1) phrase.onend = resolve(sentence);
        report(sentence);
 //       reportBubble(sentence);
        synth.speak(phrase);
        reportBubble(sentence);
      }
    }
    else if(synth == null)reject("Speech error synth is null");
    else reject("11421 no voices");
    });
  p.then(function(d){
 //   report(d);
    }).catch(function(e){
      report("12018 " + e);
      });
}

function enaudio()
{
  CloseMenu();
//  if(typeof synth !== 'undefined')
  {
  if(document.getElementById("eaudio").checked)
  {
    document.getElementById("sb3").style.visibility = "visible";
    if(voices.length > 0)
    {
      populateVoices();
    }
    else 
    {
      initAudio().then( function(v){
        voices = v;
        if(v.length > 0)
        {
          populateVoices();
        }
      }).catch(function(e){
          reject(e);
        })
    }
  }
  else
  {
    SNDMODE = 0;
    document.getElementById("sb3").style.visibility = "hidden";
    hideSnd();
  }
  beep1();
  }
  /*
  else
  {
    report("No speech synthesis available.");
  }
  */
}

function noAudio()
{
  if(SNDMODE == 0)
  {
    document.getElementById("sb3").style.visibility = "hidden";
    hideSnd();
  }
}

let SNDMODE = 0;
let NCHECK = 0;

function gCheck()
{
  if(!bGeo) sayPhrase("EOP5"); //("Geolocation not enabled.");
//  nextSndState(NCHECK);
}

function snd(n)
{
if(typeof synth !== 'undefined')
{
  if(n == 3)
  {
    if(SNDMODE == 0)
    {
      document.getElementById("eaudio").checked = true;
      if(!bWelcome3Closed) 
      {
        closeMenuById("Welcome3");
        bWelcome3Closed = true;
      }
      if(!bWelcomeClosed)
      {
        closeMenuById("Welcome");
        bWelcomeClosed = true;
      }
      setScalable(false);
      locfirst = true;
      getLocation();
    }
    if((SNDMODE == 0) || (SNDMODE == 1))
    {
//      if((voices.length > 0) &&(SNDMODE == 0))  say("eight olives trains");
      if((synth != null) &&(SNDMODE == 0))  say("eight olives trains");
      SNDMODE = 2;
      document.getElementById("sb1").style.visibility = "visible";
      document.getElementById("sb2").style.visibility = "visible";
      document.getElementById("sb3").style.visibility = "visible";
      document.getElementById("sb4").style.visibility = "visible";
      document.getElementById("sb5").style.visibility = "visible";
 //     beep1();
      if(!bOnLine) sayPhrase("EOP1"); //say("Offline schedule mode.");
 //     if(locfirst) say("Geolocation not enabled.");
      sayPhrase("EOP2"); //say("Use the lower left corner quiet button to reset.");
      sayPhrase("EOP3"); //say("Click the right side center Menu button twice for help.");
      NCHECK = n;
      setTimeout(gCheck, 5000);
    }
    else if(SNDMODE == 3)
    {
      SNDMODE = 1;
      hideSnd();
//      nextSndState(n);
    }
  }
  
  else if(n == 2)
  {
    bSndBusy = false;
  }
  
  if(!bSndBusy)
  {
    if(synth.paused)
    {
      report("SpeechSynthesis is paused!");
      synth.resume();
    }
//    if((n == 4) && (bSpeechRecg || bPspeech)) startSpeechRec();
    
    bSndBusy = true;
    nextSndState(n);
    bSndBusy = false;
  }
}
}

function snd2(n)
{
  if(bSpeechRecg || bPspeech) snd(6);
  else snd(4);
}

function hideSnd()
{
      document.getElementById("sb1").style.visibility = "hidden";
      document.getElementById("sb2").style.visibility = "hidden";
      document.getElementById("sb4").style.visibility = "hidden";
      document.getElementById("sb5").style.visibility = "hidden";
}

function changedWx()
{
  if(document.getElementById("bIncludeWx").checked)
  {
  }
  else
  {
    clearArray(WxAlerts);
  }
}

function viewDirections()
{
    
}

function showDMap(b)
{
  CloseMenu();
  menu("DMap");
  report("showDMap " + b);
  let sl = document.getElementById("DMap");
  let isOpen = sl.classList.contains('slide-in');
  if(b) // && !isOpen)
  {
    sl.style.visibility = "visible";
    sl.setAttribute('class', 'slide-in');
    bDMapShowing = true;
    sprun = true;
    if(typeof adjust !== 'undefined') Springy.requestAnimationFrame(adjust);
//    updateDMap(35);
  }
  else 
  {
    sl.setAttribute('class', 'slide-out');
    setTimeout(hideDMap, 700);
    bDMapShowing = false;
    sprun = false;
  }

}

function hideDMap()
{
  document.getElementById("DMap").style.visibility = "hidden";
}

function hideMap()
{
  document.getElementById("KMap").style.visibility = "hidden";
}

function showMap(b)
{
  let sl = document.getElementById("KMap");
  let isOpen = sl.classList.contains('slide-in');
  if(b) // && !isOpen)
  {
    menu("KMap");
    document.getElementById("KMap").style.visibility = "visible";
    sl.setAttribute('class', 'slide-in');
    bMapShowing = true;
  }
  else 
  {
    sl.setAttribute('class', 'slide-out');
    setTimeout(hideMap, 700);
    VEH_STOP = null;
    bMapShowing = false;
  }
}

function sendFeedback()
{
  window.scrollTo(0,0);
  menu("Feedback");
}

function feedbackSubmit()
{
  let tid = scrub(document.getElementById("tid").value);
  let ttitle = scrub(document.getElementById("ttitle").value);
  let fb = scrub(document.getElementById("fb").value);
  if((tid.length > 5) && (ttitle.length > 0) && (fb.length > 0))
  {
    let fd = createForm();
    fd.append("tid", tid);
    fd.append("ttitle", ttitle);
    fd.append("fb", fb);
    sendForm(fd).then(function(t) {
      alert(t);
      CloseMenu();
      }).catch(function(e) {
        report(e);
        CloseMenu();
        } );
  }
}

function scrub(s)
{
  let t = s.replace(/</g, "*");
  t = t.replace(/>/g, "*");
  t = t.replace(/&/g, "*");
  return(t);
}

function writePad()
{
  CloseMenu();
  let rows = 8;
  let cols = 8;
  let i = 0;
  let j = 0;
  let s = "";
  s += "<span style='float:left'><a href='javascript:clearPad()'>Clear</a></span>";
  s += "<span style='float:right'><a href='javascript:closePad()'>X</a></span>";
  s += "<div style='text-align:center'><div id='spg' style='display:inline-block; color:blue; '></div></div>";
  s += "<br><canvas id=\"wPad\" width=\"180\" height=\"250\" style=\"background-color: black\" ></canvas>";

//  report(s);
  let d = document.getElementById("Wron");
  d.innerHTML = s;
  d.style.visibility = "visible";
  wpadcanvas = document.getElementById("wPad");
  if(wpadcanvas == null) report("wpadcanvas is null");
  wpad = new EoPad(wpadcanvas);
  wpad.init();
  report("writePad");
}

let wpadcanvas = null;
let wpadptdwn = null;

function EoPad(celement)
{
  this.segments = [];
  this.ptdwn = null;
  this.ptup = null;
  this.canvas = celement;
  this.ctx = this.canvas.getContext("2d");
  this.ctx.strokeStyle = "white";
  this.ctx.lineWidth = 4;
  let scaleFactor = backingScale(this.ctx);
  if (scaleFactor > 1) 
  {
    this.ctx.lineWidth = 4 * scaleFactor;
  }
}

EoPad.prototype.init = function()
{
  wpadcanvas.addEventListener('mousedown', function(evt) {
    evt.preventDefault();
    wpad.dragging = true;
    wpad.ptdwn = getMousePos(wpadcanvas, evt);
    }, false);
  wpadcanvas.addEventListener('mouseup', function(evt) {
    evt.preventDefault();
    wpad.dragging = false;
    wpad.ptup = getMousePos(wpadcanvas, evt);
    let dx = wpad.ptdwn.x - wpad.ptup.x;
    let dy = wpad.ptdwn.y - wpad.ptup.y;
    report("mu " + wpad.ptdwn.x + ", " + wpad.ptdwn.y + " : " + wpad.ptup.x + ", " + wpad.ptup.y);
    report("dx = " + dx + ", dy = " + dy);
    if(wpad.ptdwn != null)
    {
      wpad.segments.push(wpad.ptdwn);
      wpad.segments.push(wpad.ptup);
      wpad.ptdwn = null;
      wpad.ptup = null;
      checkPad();
    }
    wpad.paint();
    }, false);
  wpadcanvas.addEventListener('mousemove', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    }, false);

  wpadcanvas.addEventListener("touchstart", function (evt) {
        evt.preventDefault();
        wpad.dragging = true;
        let touches = evt.changedTouches;
        let touch = touches[0];
        let rect = wpadcanvas.getBoundingClientRect();
        wpad.ptdwn = new PointI(touch.clientX - rect.left, touch.clientY - rect.top);
  }, false);
  wpadcanvas.addEventListener("touchend", function (evt) {
        evt.preventDefault();
        wpad.dragging = false;
        let touches = evt.changedTouches;
        let touch = touches[touches.length - 1];
        let rect = wpadcanvas.getBoundingClientRect();
        wpad.ptup = new PointI(touch.clientX - rect.left, touch.clientY - rect.top);
        let dx = wpad.ptdwn.x - wpad.ptup.x;
        let dy = wpad.ptdwn.y - wpad.ptup.y;
        report("te " + wpad.ptdwn.x + ", " + wpad.ptdwn.y + " : " + wpad.ptup.x + ", " + wpad.ptup.y);
        report("dx = " + dx + ", dy = " + dy);
        if(wpad.ptdwn != null)
        {
          wpad.segments.push(wpad.ptdwn);
          wpad.segments.push(wpad.ptup);
          wpad.ptdwn = null;
          wpad.ptup = null;
          checkPad();
        }
        wpad.paint();
  }, false);
  wpadcanvas.addEventListener("touchmove", function (e) {
        e.preventDefault();
  }, false);
  
}

EoPad.prototype.paint = function()
{
  
  let k = wpad.segments.length;
  report("paint " + k);
  let i = 1;
  while(i < k)
  {
    let pt = wpad.segments[i-1];
    wpad.ctx.beginPath();
    wpad.ctx.moveTo(pt.x, pt.y);
    pt = wpad.segments[i];
    wpad.ctx.lineTo(pt.x, pt.y);
    wpad.ctx.stroke();
    i += 2;
  }
}

function formatTrips()
{
  serviceEO.formatTrips();
}

function clearPad()
{
  wpad.ctx.clearRect(0,0, 180, 250);
  clearArray(wpad.segments);
}

function closePad()
{
  let d = document.getElementById("Wron");
  d.style.visibility = "hidden";
  clearArray(wpad.segments);
  document.getElementById("spg").innerHTML = "";
  wpad = null;
  sphrase = "";
  setSndState(0);
  quiet();
}

function closeAdvlb()
{
  let d = document.getElementById("advlb");
  d.style.top = con + "px";
  d.style.display = "none"
  d.style.visibility = "hidden";  
}

function lastMonitor()
{
  if(!bMonitorMode && (LastMonitorTrip != null))
  {
    CurrentTripID = LastMonitorTrip;
    DISPLAYTYPE = 1;
    updateDisplay();
    setMonitorMode(true);
  }
}

function evalWin()
{
  CloseMenu();
  let s = prompt("Eval");
  if(s != "") eval(s);
}

function procBeep()
{
  bDontBeep = document.getElementById("dba").checked;
}

function procOK()
{
  bDontOK = document.getElementById("dbb").checked;
}

function pIsInSystemCache(url)
{
  let p = new Promise(function(resolve, reject) {
    if(caches)
    {
      caches.match(url).then( function(r) {
        if(typeof r === 'undefined')
        {
          reject();   
        }
        else resolve();
      }).catch(reject);
    } 
    else reject();
  });
  return(p);
}

function reportCache()
{
  CloseMenu();
  clearReport();
  let s = "Cache Status\n\n";
  if(caches)
  {
    caches.keys().then(function (keys){
      let k = keys.length;
      let i = 0;
      for(i = 0; i< k; i++)
      {
        let key = keys[i];
 //     keys.forEach(key => {
 //       s += "  " + key + "\n";
        caches.open(key).then(function(cache) {
          cache.keys().then(function(items) {
            s += "  " + key + "\n";
            let k2 = items.length;
            let i2 = 0;
            for(i2 = 0; i2<k2; i2++)
            {
              let item = items[i2];
              let x = item.url; //.substring(item.url.lastIndexOf("/"));
              s += "    " + x + "\n";
              }
              report(s);
              let sm = null;
              if(typeof navigator.storage !== 'undefined')
              {
                navigator.storage.estimate().then(function(se) {
                  let u = se.usage;
                  let q = se.quota;
                  report("\nstorage useage = " + u + " bytes");
                  report("storage quota = " + q + " bytes");
                  report("% used = " + Math.round(u / q * 100) + "%");
                });
              }
          }).catch(function(e) {
          report("e2: " + e);
          });
        
        }).catch(function(e) {
          report("e1: " + e);
          });
 //       });
        }
        });
  }
}

function sliderChange()
{
  let gdb = -40  + 60 / 1024 * document.getElementById("micvol").value;
  let g = Math.pow(10, gdb / 20);
  if(gainNode3 != null)
  {
    gainNode3.gain.value = g;
  }
  let s = Math.round(10 * gdb) / 10 + " db";
  document.getElementById("tbid").innerHTML = s;
}

function getMicSettingDB()
{
  let gdb = -40  + 60 / 1024 * document.getElementById("micvol").value;
  return(gdb);
}

function getMicSetting()
{
  let gdb = -40  + 60 / 1024 * document.getElementById("micvol").value;
  let g = Math.pow(10, gdb / 20);
  return(g);
}

let cf = Math.PI / 180;

function getSunTimes()
{
  let d = new Date();
  let yyyy = d.getYear();
  let mm = d.getMonth() + 1;
  let dd = d.getDate();
  let ptb = getPositionForId(Place_id);
  if(ptb == null) 
  {
      report("12198 " + Place_id + " not in stop list");
      return(null);
  }
  let lat = ptb.x;
  let lon = ptb.y;
  let dpy = 365;
  let bly = false;
  if(yyyy % 4 == 0) 
  {
    bly = true;
    dpy = 366;
  }
  var sc = 0;
  var min = 0;
  var hr = 12;
  var doy = getDayOfYear(mm, dd, bly);
   
  // g1 is fractional year in radians
  var g1 = 2 * Math.PI /dpy * (doy -1 + (hr -12) / 24);
//  report("g1 = " + g1 + ", dpy = " + dpy + ", doy = " +doy + ", hour = " + hr);
   
  // eqtime = equation of time in minutes
  var eqtime = 229.18 * (.000075 + .001868 * Math.cos(g1) - .032077 * Math.sin(g1)
       - .014615 * Math.cos(2 * g1) - .040849 * Math.sin(2*g1));
   
  // decl = solar declination angle in radians
  var decl = .006918 - .399912 * Math.cos(g1) + .070257 * Math.sin(g1) 
       -.006758 * Math.cos(2 * g1) + .000907 * Math.sin(2* g1)
       -.002697 * Math.cos(3 * g1) + .00148 * Math.sin(3 * g1);


  let rha = Math.acos((Math.cos(90.833 * cf) /(Math.cos(lat * cf) * Math.cos(decl))) - Math.tan(lat * cf) * Math.tan(decl));
  let ha = rha / cf;
   
  let lph = Number(lon) + Number(ha);
  let lmh = Number(lon) - Number(ha);
//  let tznum = (-4 - TZD) * 60;
  let tznum = - getTZPlace();
//  report("12047 " + tznum + " " + getTZPlace() / 60);
//  report("\n66: ha = " + ha + ", lng + ha = " + lph + " TZD = " + TZD);
  let r = new Object();
  r.sunrise = 720 - 4 * (lph) -eqtime + tznum;
  r.sunset = 720 - 4 * (lmh) -eqtime + tznum;
//  report("\n70 " + lon + " " + ha + " " + eqtime);
  let mj = Math.round(r.sunrise % 60);
  mj = mj.toString();
  if(mj.length == 1) mj = "0" + mj;
  r.sunriseS = Math.floor(r.sunrise / 60).toString() + ":" + mj;
  mj = Math.round(r.sunset % 60);
  mj = mj.toString();
  if(mj.length == 1) mj = "0" + mj;
  let mh = Math.floor(r.sunset / 60);
  let suf = "";
  if(!document.getElementById("t24cb").checked)
  {
    if(mh > 11) 
    {
        mh -= 12;
        suf = " PM";
    }
    mh = mh.toString();
  }

  r.sunsetS = mh + ":" + mj + suf;
  
//  report("sunrise = " + Math.floor(r.sunrise / 60) + ":" + Math.round(r.sunrise % 60));
//  report("sunset = " + Math.floor(r.sunset / 60) + ":" + Math.round(r.sunset % 60));
  return(r);

}

function getDayOfYear(mm, dd, bly)
{
  var dn = 0;
  switch(Number(mm))
  {
      case 2: dn = 31; break; //  31
      case 3: dn = 59; break;  // +28
      case 4: dn = 90; break;  // +31
      case 5: dn = 120; break; // +30
      case 6: dn = 151; break; // +31
      case 7: dn = 181; break; // +30
      case 8: dn = 212; break; // +31
      case 9: dn = 243; break; // +31
      case 10: dn = 273; break;  // +30
      case 11: dn = 304; break;  // +31
      case 12: dn = 334; break;  // +30
      default: break;
  }
  if(bly && (mm > 2)) dn += 1;
  dn = Number(dn) + Number(dd);
  return(dn);
}

function clearTileCache()
{
  if(caches != null)
  {
      caches.delete('eo_Trains_mapcache_2024');
      caches.delete('eo_Trains_mapcache_2022');
      caches.delete('eo_Trains_mapcache_2023');
  }
}

function adjustCanvas(e)
{
  let c = document.getElementById("Canvas0");
  c.width = e.offsetWidth;
  c.height = e.offsetHeight;
  report("adjustCanvas c.width =" + c.width + " c.height =" + c.height );
//  document.getElementById("bdm").onClick = showDMap(false);
}


function setPalette()
{
  let i = document.getElementById("palettesel").selectedIndex;
  PALETTE = i;
  let bdy = document.getElementsByTagName("body")[0];
  let pal = PALETTES[i];
  let c = getColor("main-background", pal);
  if(c != "")
  {
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", c);
  }
  
  if(typeof pal !== 'undefined')
  {
    if(navigator.cookieEnabled)
    {
      localStorage.setItem("TrainsBackground", i);
    }
    let k = pal.length;
    let j= 0;
    for(j=0; j < k; j++)
    {
      bdy.style.setProperty("--" + pal[j].name, pal[j].value);
    }
  }
}


function setPalette2()
{
  setPalette();
  CloseMenu();
  updateFacility(Place_id);
}
  
function initPalettes2()
{
  let ps = document.getElementById("palettesel");
  ps.multiple  = false;
  let i = ps.children.length - 1;
  while( i >= 0)
  {
    ps.remove(i);
    i -= 1;
  }
  for(i = 0; i < PALETTE_NAMES.length ; i++) 
  {
    let opt = document.createElement('option');
    opt.textContent = PALETTE_NAMES[i];
    ps.appendChild(opt);
  }
  let nx = 0;
  if(navigator.cookieEnabled) nx = localStorage.getItem("TrainsBackground");
  if((typeof nx === 'undefined') || (nx == null)) nx = 0;
  ps.selectedIndex = nx;
  PALETTE = nx;
}

async function getGTFSInfo(gname, dirf)
{
  var u = EOS + "?f=55&u=" + UKEY + "&p=" + PKEY + "&h=" + homeport + "&stop=" + gname + "&svc=" + dirf;
  return(getXHRP4(u));
}

function SimpleCSVparse(data)
{
  let d = [];
  if(data.indexOf("\"") == -1)
  {
    let rows = data.split('\n');
    rows.forEach((row) => {
        let els = row.split(',');
        els.forEach((el) => {
            d.push(el);
        });
    });
  }
  return(d); 
}

function checkLastModified(u, n)
{
  getLastModified(u).then((s) => {
      addLMD(s, n);
      showLMD();
  }).catch((e) => {
      
  });
}

function addLMD(s, f)
{
//  if(s.length > 0)
  {
  let b = true;
  LMD.forEach((e) => {
     if(e.indexOf(f) != -1) b = false; 
  });
  if(b) LMD.push(s);
//  report("12970 "+ s + " " + !b + " " + f);
  }
}

function showLMD()
{
  let a = document.getElementById("LMDA");
  let h = "";
  let s = "";
  LMD.forEach((e) => {
      s = e;
      if(s.indexOf("eo_") == 0) 
      s = s.substring(3);
      let r = s.replace(".js", "");
      h += "<br>" + r + " UTC";
  });
  a.innerHTML = h;
}

function initLMD()
{
  if(bOnLine)
  {
    getLastModified("eo_AMTRAK.js").then((lmd) => {
        addLMD(lmd, "AMTRAK");
        showLMD();
    }).catch();
    getLastModified("eo_LIRR.js").then((lmd) => {
        addLMD(lmd, "LIRR");
        showLMD();
    }).catch();
  }
}

function saveLocal(fname, data)
{
  if(navigator.cookieEnabled) localStorage.setItem(fname, data);
}

function getLocal(fname)
{
  var x = null;
  if(navigator.cookieEnabled) x = localStorage.getItem(fname);
  return(x);   
}

function removeLocal(fname)
{
  if(navigator.cookieEnabled) localStorage.removeItem(fname);   
}

function reportBubble(s)
{
  if(s.length < 100)
  {
    if(BTO != null) 
    {
//      {clearTimeout(BTO); BTO = null;}
      Bubble1.innerHTML += "<br>" + s;
    }
    else
    {
      let h = '<span style="float:right;font-size:10pt"><a href="javascript:CloseBubble()">X</a></span><br>';
      h += s;
      Bubble1.innerHTML = h;
      Bubble.style.visibility = "visible";
    }
    if(bBubbleTO) BTO = setTimeout(CloseBubble, 10000);
  }
}

function CloseBubble()
{
  Bubble.style.visibility = "hidden";  
  BTO = null;
}

function changedBubble()
{
  bBubbleTO = document.getElementById("bVoiceBubble").checked;  
}



