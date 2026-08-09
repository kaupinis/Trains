// eo_trains31.js
"use strict";

// Notes:
// In stops_subway, deleted O0 from Park Street
// changed "Logan Aiport Ferry Terminal" to "Logan Airport Ferry Terminal"

let gnsd = 1000;
let grouteid = "";
let gnspt = null;
let STOPTYPES = 9;
let SimRoute = null;
let COUNTSX = 0;

function getTransferStopsFor(busroute)
{
  let n = 5;
  let a = routes_bus;
  if(busroute.indexOf("Y") == 0) 
  {
      a = routes_NJBUS;
      n = 4;
  }
  let k = a.length;
  let i = 0;
  let b = true;
  let ts = "";
  while(b && (i < k))
  {
    if(busroute == a[i+1])
    {
       ts = a[i+n-1];
       b = false;
    }
    i += n;
  }
  return(ts);
}


// returns an array of transfer stop_ids
function getTransferStops(route_id)
{
//  report("getTransferStops " + route);
  let ts = "";
  if(route_id.indexOf("LRTA") == 0) ts = "place-NHRML-0254,place-NHRML-0152,place-NHRML-0218";
  else if(route_id.indexOf("MVRTA") == 0) ts = "MV_2448784,place-m3,place-WR-0264,place-WR-0329,place-ER-0362,place-NHRML-0254,place-WR-0228";
  else if(route_id.indexOf("PP") == 0) ts = "place-springf,place-pabt,place-sstat";
  /*
  else if(route.indexOf("AMR") == 0)
  {
    let s =  "AMR40751,AMR40789,AMR95,AMR58,AMR85,AMR36923,AMR36921,AMR36949,AMR94, AMR81,AMR68,AMR88,AMR69,AMR64,AMR91,AMR70,AMR90,";
    if(s.indexOf(route + ",") != -1) ts = "place-nyc";
  }
  */
  else if(route_id.indexOf("Z_") == 0)
  {
    if(route_id.indexOf("Z_BOB") == 0) ts = "8507492,8507380,8507384";
    else if(route_id.indexOf("Z_WAB") == 0) ts = "8507380,8507384,8507374";
    else if(route_id.indexOf("Z_ZB") == 0) ts = "8507492,8505000";
    else if(route_id.indexOf("Z_SOB") == 0) ts = "8509000,8505000";
    else if(route_id.indexOf("Z_RhB") == 0) ts = "8509000,8509002,8509179,8509251,8509183";
    else if(route_id.indexOf("Z_MOB") == 0) ts = "8501300,8504070";
    else if(route_id.indexOf("Z_MGB-fo") == 0) ts = "8501605,8501609,8509179,8505165";
    else if(route_id.indexOf("Z_MGB-bvz") == 0) ts = "8501605";
    else if(route_id.indexOf("Z_BLS") == 0) ts = "8507492,8507483,8501609,8507000,8301003";
    else if(route_id.indexOf("Z_DB") == 0) ts = "8500090";
    else if(route_id.indexOf("Z_THURBO") == 0) ts = "8509000,8506302,8506314";
    else if(route_id.indexOf("Z_OBB") == 0) ts = "8102336,8101236";
    else if(route_id.indexOf("Z_SNCF") == 0) ts = "8774647,Z_8774549,8774687,Z_8774630";
    else if(route_id.indexOf("Z_SBB") == 0) ts = "8507483,8501605,8501609,8507000,8509000, 8102336,8500010,8500090,8509002,8505000,8501500,8501300,8504014,Z_8774549,8505119,8501008,8505400";
//    else if(route_id.indexOf("Z_SBB_Gott") == 0) ts = "";
    else if(route_id.indexOf("Z_RA") == 0) ts = "8501403,8501500,8501609,8501605";
    else if(route_id.indexOf("Z_TMR") == 0) ts = "8501500,8774687";
    else if(route_id.indexOf("Z_TPF") == 0) ts = "8504070,8504014";
    else if(route_id.indexOf("Z_FART") == 0) ts = "8301003,8505400";
    /*
    else if(route_id.indexOf("Z_BOB") == 0) ts = "";
    else if(route_id.indexOf("Z_BOB") == 0) ts = "";
    else if(route_id.indexOf("Z_BOB") == 0) ts = "";
    else if(route_id.indexOf("Z_BOB") == 0) ts = "";
    else if(route_id.indexOf("Z_BOB") == 0) ts = "";
    */
    
    if((route_id.indexOf("Z_SBB") == 0)  && (typeof SBB !== 'undeined'))
    {
      let r = SBB.getRoute(route_id);
      if(r!= null)
      {
        if(typeof r.transfer !== 'undefined') 
        {
          if(ts == "") ts = r.transfer;
          else ts += "," + r.transfer;
        }
        else if(typeof r.transfer_stops !== 'undefined') ts = r.transfer_stops;  
      }
    }
  }
  else if(isNaN(route_id) && (route_id.indexOf("Y") != 0))
  {
    let k = route_transfer.length;
    let i = 0;
    let b = true;
    while(b && (i < k))
    {
      if(route_id == route_transfer[i])
      {
       if(ts.length > 0) ts += ",";
       ts += route_transfer[i+2];
       b = false;
      }
      i += 3;
    }
    
    if(b && (serviceE != null)) 
    {
      let r = serviceE.getRouteS(route_id);
      if(r!= null)
      {
        if(typeof r.transfer !== 'undefined') ts = r.transfer;
        else if(typeof r.transfer_stops !== 'undefined') ts = r.transfer_stops;  
      }
    }
  }
  else if(route_id.indexOf("TN_") == 0)
  {
    if(route_id.indexOf("TN_RE_80") == 0) ts = "8505300,8505307";
    else if(route_id.indexOf("TN_RE_8") == 0) ts = "8509369";
    else if(route_id.indexOf("TN_RE_12") == 0) ts = "8509369";
    else if(route_id.indexOf("TN_RE_4") == 0) ts = "8301003";
    else if(route_id.indexOf("TN_R23") == 0) ts = "8301003";
  }
  else ts = getTransferStopsFor(route_id);
  
  if((ts.length == 0) && (serviceE !== null))
  {
    let r = serviceE.getRouteS(route_id);
    if(r != null) 
    {
      if(typeof r.transfer !== 'undefined') ts = r.transfer;
      else if(typeof r.transfer_stops !== 'undefined') ts = r.transfer_stops;  
    }
  }
  let a = [];
  try {
    if(ts.length > 0) a = ts.split(",");
  }
  catch(e) {
      report("148 getTransferStops error " + e + " (ts = " + ts + ")" );
  }
  return(a);
}

function addTransferStops(shortid, routeid, stops)
{
  route_transfer.push( shortid);
  route_transfer.push( routeid);
  route_transfer.push( stops);  
}

function getHub(stopid)
{
  let hub = null;
  if(stopid.indexOf("-CT") != -1) hub = "NewHaven-CT";
  else if(stopid.indexOf("-NY") != -1) hub = "NewYork-Penn-NY";
  else hub = "South Station";
  return(hub);
}

//TODO
function findCommonHubs(id1, id2)
{
  let i1 = getRoutesSForId(id1);
  let i2 = getRoutesSForId(id2);
  let hubs = [];
  let r = [];
  if(i1 != "") 
  {
    i1 = i1.split(",");
    if(i2 != "") 
    {
      i2 = i2.split(",");
      let k1 = i1.length;
      let k2 = i2.length;
      let hubs1 = [];
      let hubs2 = [];
      let j1 = 0;
      let b = true;
      while(b && (j1 < k1))
      {
 //       hubs1 = addUnique(hubs1, getTransferStops()  
          
          
        let j2 = 0;
        while(j2 < k2)
        {
          if(i1[j1].indexOf(i2[j2]) != -1)
          {
 //           route_transfer
 //             getIntersection(hubs, getTransferStops(route)
          }
          j2 += 1;
        }
        j1 += 1;
      }
    }
  }
  return(hubs);
}

function getStopList(i)
{
  let trainstops = [];
  let k = StopListData.length;
  if(i < k)
  {
    trainstops =  StopListData[3*i + 1];
  }
  return(trainstops);
}

function getStopListP(i)
{
  let p = new Promise(function(resolve, reject) { 
      let p2 = null;
      let trainstops = [];
      let stoplist = [];
      let k = StopListData.length;
      if(i < k)
      {
        let carrier = StopListData[3*i + 2];
//        report("169 " + i + " " + carrier);
        if((carrier != "") && (!isCarrierLoaded(carrier)))
        {
          p2 = loadCarrier(carrier).then(function() {
              if(typeof StopListData[3*i + 1] !== 'undefined')
              {
                trainstops =  StopListData[3*i + 1];  
                resolve(trainstops);
              }
          });
        }
        else
        {
          let x = StopListData[3*i + 1];
          if((typeof x !== 'undefined') && (x != null))
          {
            trainstops =  StopListData[3*i + 1];
            resolve(trainstops);
          }
          else reject("186");
        }
      }
      else reject("190");
  });
  return(p);
}
 
function getStopListNames(i)
{
//  report("209 getStopListNames " + StopListData[3*i + 2]);
  let p2 = new Promise(function(resolve, reject) {
      getStopListP(i).then(function(a) {
        if(a != null)
        {
        let stoplistnames = [];
        let k = a.length;
//        report("214 a.length = " + k);
        let j = 0;
        for(j=0; j<k; j+=12)
        {
          stoplistnames.push(a[j+1]);
        }
        if(document.getElementById("PlaceSelect").visiility == "hidden")
        {
          menu(" PlaceSelect"); 
        }
        resolve(stoplistnames);
        }
        else reject("224 a is null");
        }).catch(function(e) {
            reject(e);
        });
  });
  return(p2);
}

function isAirportStop(stopid)
{
    let b = false;
    let k = stops_Airport.length;
    let i = 0;
    while(!b && (i < k))
    {
        if((stopid == stops_Airport[i]) || (stopid == stops_Airport[i+8]))
        {
          b = true;   
        }
        i += 12;
    }
    return(b);

}

function isBoatStop(stopid)
{
    let b = false;
    let k = stops_BOAT.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(stopid == stops_BOAT[i])
        {
          b = true;   
        }
        i += 12;
    }
    return(b);
}

function isRailStop(stopid)
{
    let b = false;
    let k = stops_MBTA_CR3.length;
    let i = 0;
    while(!b && (i < k))
    {
        if((stopid == stops_MBTA_CR3[i]) || (stopid == stops_MBTA_CR3[i + 8]))
        {
          b = true; 
          SimRoute = stops_MBTA_CR3[i+11];
        }
        i += 12;
    }
    if(!b) b = (stopid.indexOf("AM") == 0);
    if(!b) b = (stopid.indexOf("ME") == 0);
    if(!b) b = (stopid.indexOf("MNR") == 0);
    if(!b) b = (stopid.indexOf("LI") == 0);
    if(!b) b = (stopid.indexOf("NJ") == 0);
    if(!b) b = (stopid.indexOf("PATH") == 0);
    if(!b) b = (stopid.indexOf("CS") == 0);
    if(!b) b = (stopid.indexOf("CML") == 0);
    if(!b) b = (stopid.indexOf("TR") == 0);
    if(!b) b = (stopid.indexOf("BL") == 0);
    if(!b) b = (stopid.indexOf("MDC") == 0);
    if(!b) b = (stopid.indexOf("CAL") == 0);
    if(!b) b = (stopid.indexOf("VIA") == 0);
    if(!b) b = isOther(stopid);
    if(!b) b = isCanada(stopid);
    if(!b) b = isNJstop(stopid);
    if(!b) b = isStopOf(stopid, stops_MidAtlantic);
   return(b);
}

function isRailStopNS(stopid)
{
    let b = false;
    let k = stops_TrainNS.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(stopid == stops_TrainNS[i])
        {
          b = true;   
        }
        i += 1;
    }
    return(b);
}

function isSubwayStop(stopid)
{
    let b = false;
    let k = stops_MBTA_SUB.length;
    let i = 0;
    if(stopid.indexOf("NYT") == 0) b = true;
    else if(stopid.indexOf("CG") == 0) b = true;
    while(!b && (i < k))
    {
        if(stopid == stops_MBTA_SUB[i])
        {
          b = true;
          SimRoute = stops_MBTA_SUB[i + 11];
        }
        i += 12;
    }
    if(!b)
    {
      i = 0;
      k = stops_Connecting.length;   
      while(!b && (i < k))
      {
        if(stopid == stops_Connecting[i])
        {
          b = true;   
        }
        i += 12;
      }
    }
    return(b);
}

function isLocalBusStop(stopid)
{
    let b = false;
    if(stopidIsInArray(stopid, stops_MVRTA)) b = true;
//    else if(stopidIsInArray(stopid, stops_lrta)) b = true;
    else if(stopidIsInArray(stopid, stops_metrowest)) b = true;
    return(b);    
}

function isBusStop(stopid)
{
    bOtherStop = false;
    OtherStop = "";
    let b = false;
    if(typeof stops_MBTABus !== 'undefined')
    {
    let k = stops_MBTABus.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(stopid == stops_MBTABus[i])
        {
          b = true; 
          if(stops_MBTABus[i + 8] != "")
          {
            bOtherStop = true;
            OtherStop = stops_MBTABus[i + 8];
          }
        }
        i += 12;
    }
    }
    return(b);
}

function isBusRoute(routeid)
{
    bOtherStop = false;
    OtherStop = "";
    let b = false;
    let k = routes_bus.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(routeid == routes_bus[i+1])
        {
          b = true;
        }
        i += 5;
    }
    return(b);
}

function isNYCstop(stopid)
{
  let b = false;
  if(stopid.indexOf("NYT") != -1) b = true;
  else if(stopid.indexOf("MTA") == 0) b = true;
  else
  {
    let pid = getParentIdFromId(stopid); 
    if((pid == "place-nyc") || (pid == "place-gcny") || (pid == "place-pabt")) b = true;
  }
  return(b);
}

function isNJstop(stop_id)
{
    let b = false;
    let k = stops_NJ.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(stop_id == stops_NJ[i])
        {
          b = true;   
        }
        i += 12;
    }
    return(b);
}

/*
function isMNRStop(stop_id)
{
  let b = false;
  if(getRoutesS(stop_id).indexOf("MNR") != -1) b = true;
  else if(stop_id == "NewYork-Grand-Central-NY") b = true;
  return(b);
}
*/

function isStopOf(stop_id, arr)
{
    let b = false;
    let k = arr.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(stop_id == arr[i])
        {
          b = true;   
        }
        i += 12;
    }
    return(b);
}

function getConnectingStation(stop_name_id)
{
    let n = null;
    let b = false;
    let k = stops_Connecting.length;
    let i = 0;
    while(!b && (i < k))
    {
        if((stop_name_id == stops_Connecting[i]) ||(stop_name_id == stops_Connecting[i+1]) )
        {
          b = true;
          n = stops_Connecting[i + 8];
        }
        i += 12;
    }
    if((n != null) && ((n == "") || (n == " "))) n = null;
    return(n);
}

function isAmtrak(stop_id)
{
    let b = false;
    let k = stops_Amtrak.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(stop_id == stops_Amtrak[i])
        {
          b = true;   
        }
        i += 12;
    }
    if(!b) b = isOther(stop_id);
    return(b);
}

function isAmtrak1(stop_id)
{
    let b = false;
    let k = stops_Amtrak.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(stop_id == stops_Amtrak[i])
        {
          b = true;   
        }
        i += 12;
    }
    return(b);
}

function isAmtrak2(stop_id)
{
  return(isOther(stop_id));
}

function isOther(stop_id1)
{
    /*
   let stop_id = stop_id1;
   let iq = stop_id.indexOf("/");
   if((iq != -1) && (!isNaN(stop_id.substring(iq+1)))) stop_id = stop_id.substring(0,iq);
    let b = false;
    let k = stops_Other.length;
    let i = 0;
    while(!b && (i < k))
    {
        if((stop_id == stops_Other[i]) || (stop_id == stops_Other[i+8]))
        {
          b = true;   
        }
        i += 12;
    }
    */
    return(false);
}

function isCanada(stop_id)
{
    let b = false;
    let k = stops_Canada.length;
    let i = 0;
    while(!b && (i < k))
    {
        if(stop_id == stops_Canada[i])
        {
          b = true;   
        }
        i += 8;
    }
    return(b);
}

function isLoadable(stop_id)
{
  let b = false;
  if(stop_id.indexOf("MV_") == 0) b = true;
  else if(stop_id.indexOf("LR") == 0) b = true;
  else if(stop_id.indexOf("MW") == 0) b = true;
  else if(stop_id.indexOf("VTA") == 0) b = true;
  return(b);  
}

function isAssociate(stop_id1)
{
   let stop_id = stop_id1;
   let iq = stop_id.indexOf("/");
   if((iq != -1) && (!isNaN(stop_id.substring(iq+1)))) stop_id = stop_id.substring(0,iq);
    let b = false;
    if(stop_id.indexOf("T_") == 0) b = false;
    else if(stop_id.indexOf("TB_") == 0) b = false;
    else if(stop_id.indexOf("MW") == 0) b = true;
    else if(stop_id.indexOf("LI") == 0) b = true;
    else if(stop_id.indexOf("NZ") == 0) b = true;
    else if(stop_id.indexOf("PV") == 0) b = true;
    else if(stop_id.indexOf("place_HTC") == 0) b = true;
    else if(stop_id.indexOf("LGA") == 0) b = true;
    else if(stop_id.indexOf("RIPT") == 0) b = true;
    else if(stop_id.indexOf("AMS") == 0) b = true;
//    else if(stop_id.indexOf("T_") == 0) b = true;
    else if(stop_id.indexOf("MDC") == 0) b = true;
    else if(stop_id.indexOf("TR") == 0) b = true;
    else if(stop_id.indexOf("BL") == 0) b = true;
    else if(stop_id.indexOf("CS") == 0) b = true;
    else if(stop_id.indexOf("CML") == 0) b = true;
    else if(stop_id.indexOf("CAL") == 0) b = true;
    else if(stop_id.indexOf("ME_") == 0) b = true;
    else if(stop_id.indexOf("CG") == 0) b = true;
    else if(stop_id.indexOf("CH") == 0) b = true;
    else if(stop_id.indexOf("SSL") == 0) b = true;
    else if(stop_id.indexOf("B_") == 0) b = true;
    else if(stop_id.indexOf("SF_") == 0) b = true;
    else if(stop_id.indexOf("SFB_") == 0) b = true;
    else if(stop_id.indexOf("LAM") == 0) b = true;
    else if(stop_id.indexOf("VIA") == 0) b = true;
    else if(stop_id.indexOf("SEP_") == 0) b = true;
    else if(stop_id.indexOf("PATCO") == 0) b = true;
    else if(stop_id.indexOf("SMART") == 0) b = true;
    else if(stop_id.indexOf("SFF") == 0) b = true;
    else if(stop_id.indexOf("PS_") == 0) b = true;
    else if(stop_id.indexOf("Z_") == 0) b = true;
    else if(stop_id.indexOf("VIA") == 0) b = true;
    else if(stop_id.indexOf("SMART") == 0) b = true;
    else if(stop_id.indexOf("DT_") == 0) b = true;
    else if(stop_id.indexOf("TEX_") == 0) b = true;
    else if(stop_id.indexOf("RTD_") == 0) b = true;
    else if(stop_id.indexOf("MARC_") == 0) b = true;
    else if(stop_id.indexOf("NYT") == 0) b = true;
    else if(stop_id.indexOf("VRE") == 0) b = true;
    else if(stop_id.indexOf("WMA") == 0) b = true;
    else if(stop_id.indexOf("WMB") == 0) b = true;
    else if(stop_id.indexOf("SUN_") == 0) b = true;
    else if(stop_id.indexOf("VTA_") == 0) b = true;
    else if(stop_id.indexOf("DCTA") == 0) b = true;
    else if(stop_id.indexOf("MTA") == 0) b = true;
    else if(stop_id.indexOf("MSL") == 0) b = true;
    else if(stop_id.indexOf("MSLB") == 0) b = true;
    else if(stop_id.indexOf("MDM") == 0) b = true;
    else if(stop_id.indexOf("LR") == 0) b = true;
    else if(stop_id.indexOf("MV_") == 0) b = true;
    else if(stop_id.indexOf("BR") == 0) b = true;
    else if(stop_id.indexOf("TM") == 0) b = true;
    else if(stop_id.indexOf("UTA") == 0) b = true;
    else if(stop_id.indexOf("NM") == 0) b = true;
    else if(stop_id.indexOf("MARTA") == 0) b = true;
    else if(stop_id.indexOf("TXR") == 0) b = true;
    else if(stop_id.indexOf("STM_") == 0) b = true;
    else if(stop_id.indexOf("STMB_") == 0) b = true;
    else if(stop_id.indexOf("TTC") == 0) b = true;
    else if(stop_id.indexOf("REM_") == 0) b = true;
    else if(stop_id.indexOf("EXO_") == 0) b = true;
    else if(stop_id.indexOf("CC_") == 0) b = true;
    else if(stop_id.indexOf("SNCF_") == 0) b = true;

    let r = [];
    let k = stops_Associate.length;
    let j = 0;
    while(!b && (j < 17))
    {
      if(j == 0) {r = stops_Associate; k = stops_Associate.length;}
      if(j == 1) {r = stops_Cape; k = stops_Cape.length;}
      if(j == 2) {r = stops_Canada; k = stops_Canada.length;}
      if(j == 3) {r = stops_CT; k = stops_CT.length;}
      if(j == 4) {r = stops_NY; k = stops_NY.length;}
      if(j == 5) {r = stops_Berkshires; k = stops_Berkshires.length;}
//      if(j == 6) {r = stops_CCRTA; k = stops_CCRTA.length;}
      if(j == 7) {r = stops_pb; k = stops_pb.length;}
      if(j == 8) {r = stops_NJ; k = stops_NJ.length;}
      if(j == 9) {r = stops_MidAtlantic; k = stops_MidAtlantic.length;}
      if(j == 10) {r = stops_mvrta; k = stops_mvrta.length;}
//      if(j == 11) {r = stops_lrta; k = stops_lrta.length;}
      if(j == 12) {r = stops_metrowest; k = stops_metrowest.length;}
      if(j == 13) {r = stops_ME; k = stops_ME.length;}
      if(j == 14) {r = stops_path; k = stops_path.length;}
      if(j == 15) {r = stops_LI; k = stops_LI.length;}
      if(j == 16) {r = stops_capeann; k = stops_capeann.length;}
      let i = 0;
      while(!b && (i < k))
      {
        if(stop_id == r[i])
        {
          b = true;   
        }
        i += 12;
      }
      j+= 1;
     }
//     report("isAssociate " + stop_id + " " + b);
    return(b);
}

function isMBTA(stop_id)
{
  let b = true;
  if((stop_id.indexOf("T_") != 0) && (stop_id.indexOf("TB_") != 0))
  {
  if(isAssociate(stop_id)) b = false;
  if(isOther(stop_id)) b = false;
  let sas = [stops_MBTA_CR3, stops_MBTA_SUB, stops_MBTABus];
  let k = sas.length;
  let i = 0;
  while(b && (i < k))
  {
    let a = sas[i];
    let k2 = a.length;
    let i2 = 0;
    while(b && (i2 < k2))
    {
      if(stop_id == r[i])
      {
          b = true;   
      }
      i2 += 12;
    }
    i += 1;
  }
  }
  return(b);
}

function stopHasRoute(stop_id, route_id)
{
  let a = getRoutesArrayForId(stop_id);
  let b = false;
  let i = 0;
  let k = a.length;
  while(!b && (i < k))
  {
    if(a[i] == route_id) b = true;
    else i += 1;
  }
  return(b);
}

function getRoutesArrayForId(stop_id1)
{
  let a = [];
  let s =  getRoutesS(stop_id1);
  if(s.length > 0) a =  s.split(",");
  return(a);
}

function stopIdIsInParent(id, p)
{
//  if(typeof p === 'undefined') console.trace();
  let b = (p == id);
  if(!b && (p.indexOf(",") != -1))
  {
    let c = p.split(",");
    let i = 0;
    while(!b && (i < c.length))
    {
      if(c[i] == id) b = true;
      else i+= 1;
    }
  }
  return(b);
}

let StopTZ = "";

function getRoutesS(stop_id1)
{
//   let stop_id = getParentIdFromId(stop_id1);
  StopTZ = "";
  let stop_id = stop_id1;
  let bMSL = (stop_id.indexOf("MSL") == 0);
  let iq = stop_id.indexOf("/");
  if((iq != -1) && (!isNaN(stop_id.substring(iq+1)))) stop_id = stop_id.substring(0,iq);
  let r = "";
  let ps = "";
  let i = 0;
  let ry = [];
  COUNTSX = 0;
  let MAXLIMIT = stop_Categories.length;
  let trainstops = stop_Categories[0];
  while(i < MAXLIMIT)
  {
    trainstops = stop_Categories[i];
    let ii = 0;
    ps = getParentIdFromId(stop_id);
    while(ii < trainstops.length) // - 12)
    {
//      if((trainstops[ii] == stop_id) || (trainstops[ii + 8] == stop_id) || (trainstops[ii] == ps)) 
      let bx = (trainstops[ii] == stop_id);
      if(typeof trainstops[ii + 8] === 'undefined') report("731 " + ii + " " + i + " " + trainstops[ii]);
      if(bx || stopIdIsInParent(stop_id, trainstops[ii + 8]) || (trainstops[ii] == ps)) 
      {
        StopTZ = trainstops[ii + 6]
//        if((trainstops[ii + 8] != " ") && (trainstops[ii + 8] != "")) ps = trainstops[ii + 8];
        if((ry.length == 0) && (trainstops[ii + 11] != " ") && (trainstops[ii + 11] != ""))
        {
            if(trainstops[ii + 11].indexOf(",") != -1)
            {
              ry = trainstops[ii + 11].split(",");
            }
            else
            {
              ry = [];
              ry[0] = trainstops[ii + 11];
            }
        }
 //       report("  " + ry.length + " " + trainstops[ii + 11] + " " + ry[0]);
        if(r == "") r = trainstops[ii + 11];
        else 
        {
            let rr = trainstops[ii + 11];
            if(typeof rr === 'undefined') {rr = ""; report("706 rr underfined for " + trainstops[ii]);}
            let rx = rr.split(",");
            let k3 = rx.length;
            if(bx) COUNTSX += k3;
            let i3 = 0;
            addUnique(ry, rx);
            while(i3 < k3)
            {
//                addUnique(ry, rx);
                let rf = rx[i3];
                if(bMSL && (rf.indexOf("MSL") == 0))
                {
                  let rt = getRouteIdsFromRef(rf, "MSL");  
 //                 console.log("787 i3 = " + i3 + " " + rf + " " + rt.toString() + " k3 = " + k3); 
                  let kk = rt.length;
                  let i4 = 0;
                  for(i4 = 0; i4 < kk; i4++)
                  {
                      rx.push(rt[i4]);
                      k3 = rx.length;
                  }
                }
//                report(":" + i3 + " r = " + r + " : rf = " + rf);
                if(r.indexOf(rf) == -1) r = r + "," + rf;
                i3 += 1;
            }
        }
      }
      ii += 12;
    }
    i += 1;
  }
//  report("old r = " + r + " " + ry.length + " " + ry[0]);
  r = "";
  let k = ry.length;
  i = 0;
  while(i < k)
  {
    if(i == 0) r = ry[0];
    else
    {
      if(ry[i] != "") r += "," + ry[i];   
    }
    i += 1;
  }
 // report("new r = " + r);
  return(r);
}

function getIntersection(a1, a2)
{
  let k1 = a1.length;
  let k2 = a2.length;
  let r = [];
  let j1 = 0;
  let j2 = 0;
  while(j1 <k1)
  {
    while(j2 < k2)
    {
      if(a1[j1] == a2[j2])
      {
        addUniqueElement(r,  a1[j1]); 
      }
      j2 += 1;
    }
    j1 += 1;
  }
  return(r);
}

function addUnique(ry, rx)
{
 let k = rx.length;
 let i = 0;
 while(i < k)
 {
   let r = rx[i];
//   report("addIUnique " + r)
   let b = true;
   let kk = ry.length;
   let ii = 0;
   while(b && ii < kk)
   {
     if(r == ry[ii]) b = false;
     ii += 1;
   }
   if(b)
   {
     ry[ry.length] = r;   
   }
   i += 1;
 }   
 return(ry);
}

function addUniqueElement(ry, rx)
{
  let b = true;
  let kk = ry.length;
  let ii = 0;
  while(b && ii < kk)
  {
     if(rx == ry[ii]) b = false;
     ii += 1;
  }
  if(b)
  {
     ry[ry.length] = rx;   
  }
  return(ry);
}

function getRoutesByStopId(stop_id)
{
    let pr = null;
    if((stop_id == "North Station") || (stop_id == "114") ||(stop_id == "70026") ||(stop_id == "70027") ||(stop_id == "70205") ||(stop_id == "70206") ||(stop_id == "place-north"))
    {
        pr = new Promise(function(resolve, reject) {
            resolve(JSON.parse(NS_routes));
        } );
    }
    else if((stop_id == "South Station") || (stop_id == "70079") ||(stop_id == "70080") ||(stop_id == "74611") ||(stop_id == "74617") ||(stop_id == "6564") ||(stop_id == "place-sstat"))
    {
        pr = new Promise(function(resolve, reject) {
            resolve(JSON.parse(SS_routes));
        } );
    }

    else pr = service.getRoutesByStop(stop_id);
  return(pr);
}

function getRailStopId(stop_id)
{
  let rsid = "";
  let b = true;
  let i = 0;
  let ry = [];
  let trainstops = stops_MBTA_CR3;
  while( b && (i < 5))
  {
    if(i == 1) trainstops = stops_MBTA_SUB;
 //   if(i == 2) trainstops = stops_Other;
    if(i == 2) trainstops = stops_Associate;
    if(i == 3) trainstops = stops_Cape;
    if(i == 4) trainstops = stops_Canada;
    let kk = trainstops.length;
    let ii = 0;
    while(b && (ii < kk))
    {
      if(trainstops[ii + 8] == stop_id)
      {
        rsid = trainstops[ii];
        b = false;
      }
      ii += 12;
    }
    i += 1;
  }
  return(rsid);
}

let bsns = false;
let bsss = false;
let bsps = false;
let bscp = false;
let bjfk = false;
let bsah = false;

// branch is 2 Sroutes separated by comma 
function getBranchStops(stop_id, branch) 
{
  let a = [];
  bsns = false;
  bsss = false;
  bsps = false;
  bscp = false;
  bjfk = false;
  bsah = false;
  let ps = "";
  let bi = branch.indexOf(",");
  let b0 = branch.substring(0, bi);
  let b1 = branch.substring(bi + 1);
  let i = 0;
  let trainstops = stops_train;
  while(i < 3)
  {
    if(i == 1) trainstops = stops_subway;
    if(i == 2) trainstops = stops_amtrak2;
    let kk = trainstops.length;
    let ii = 0;
    while(ii < kk)
    {
      let x = trainstops[ii + 7];
      if((x.indexOf(b0) != -1) && (x.indexOf(b1) != -1))
      {
        let y = trainstops[ii];
        a[a.length] = y;
        if((y == "North Station") || (y == "place-north")) bsns = true;
        if((y == "Park Street") || (y == "place-pktrm")) bsps = true;
        if((y == "South Station") || (y == "place-sstat"))bsss = true;
        if((y == "Copley") || (y == "place-coecl")) bscp = true;
        if((y == "JFK/UMASS") || (y == "place-jfk")) bjfk = true;
        if((y == "Ashmont") || (y == "place-asmnl")) bsah = true;
      }
      ii += 8;
    }
    i += 1;
  }
  return(a);
}

// returns stop_id
function getNearestStation(lat, lon)
{
  let bf = document.getElementById("bIncludeBuses").checked;
  return(getNearestStation1(lat, lon, bf));
}

let gnsdx = -1;
let NJBUSINDEX = -1;
let PVRTABUSINDEX = -1;

// returns stop_id
function getNearestStation1(lat, lon, bf)
{
  let sid = null;
  let pt = null;
  let dm = 1000;
  let dii = -1;
  let did = "";
  let ii = 0;
  if((lat != 0) && (lon != 0))
  {
  let kb = stop_Categories.length;
  while(ii < kb)
  {
    /*
    if(!bf && (ii == 10)) ii += 1;  // if stops_Bus
    if(!bf && (ii == 22)) ii += 1;  // if stops_mvrta
    if(!bf && (ii == 23)) ii += 1;  // if stops_lowell
    if(!bf && (ii == 24)) ii += 1;  // if stops_metrowest
    if(!bf && (NJBUSINDEX != -1) && (ii == NJBUSINDEX)) ii += 1;
    if(!bf && (PVRTABUSINDEX != -1) && (ii == PVRTABUSINDEX)) ii += 1;
    */
    let a = stop_Categories[ii];
    let bok = true;
    if(!bf)
    {
      for(let j=0; j < BusLists.length; j++)
      {
        if(a == BusLists[j]) bok = false; 
      }
    }
    if(bok)
    {
    let k = a.length;
    let i = 0;
    while(i < k)
    {
        let d = getDistanceBetween(a[i + 4], a[i + 5], lat, lon);
        gnsdx = d;
        if(d < dm)
        {
          dm = d;
          dii = ii;
          did = a[i];
          pt = new PointI(a[i + 4], a[i + 5]);
        }
        i += 12;
    }
    }
    ii += 1;
  }
  sid = did;
  gnsd = dm;
  gnspt = pt;
  }
  return(sid);  
}

// return array of objects
function getNearbyStops(lat, lon, bf)
{
  return(getNearbyStops1(lat, lon, bf, WALK_LIMIT));
}

// return array of objects
function getNearbyStops1(lat, lon, bf, dx)
{
  let sid = [];
//  let rid = [];
  clearArray(sid);
//  clearArray(rid);
  let pt = null;
  let dm = 1000;
  let dii = -1;
  let did = "";
  let ii = 0;
  if((lat != 0) && (lon != 0))
  {
//  let kb = STOPTYPES;
//  if(!bf) kb = STOPTYPES - 1;
  let kb = stop_Categories.length;
  while(ii < kb)
  {
//    if((ii == 5) && !document.getElementById("iam").checked) ii += 1;
    if((ii == 10) && !bf) ii += 1;
    let a = stop_Categories[ii];
    let k = a.length;
    let i = 0;
    while(i < k)
    {
        let d = getDistanceBetween(a[i + 4], a[i + 5], lat, lon);
        if(d < dx)
        {
          let z = new Object();
          z.distance = d;
          z.stop_id = a[i];
          z.stop_name = a[i+1];
          z.list = ii;
          z.routes = a[i + 11];
          if(addUniqueStop(z, sid))
          {
            sid[sid.length] = z;
          }
        }
        i += 12;
    }
    ii += 1;
  }
  if(sid.length > 1) sid.sort(compareSid);
  }
  return(sid);  
}

function addUniqueStop(z, sid)
{
  let b = true;
  let k = sid.length;
  let i = 0;
  while(b && (i < k))
  {
    if(z.stop_id == sid[i].stop_id)
    {
      b = false;   
    }
    i += 1;
  }
  return(b);
}

function compareSid(a,b)
{
let x = a.distance;
let y = b.distance;
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}


function PointI(x, y)
{
  this.x = x;
  this.y = y;
}

function getPositionForName(name)
{
  let lat = 0;
  let lon = 0;
  let r = getRecordForStopByName(name);
  let p = null;
  if(r.length > 0)
  {
      lat = r[4];
      lon = r[5];
      p = new PointI(lat, lon);      
  }
  return(p);
}

function getPositionForId(idd)
{
  let p = null;
  if(typeof idd === 'undefined') return(p);
  let id = idd.toString();
  let b = true;
  let lat = 0;
  let lon = 0;
  let r = getRecordForStop(id.trim());
  if(r.length > 0)
  {
      lat = r[4];
      lon = r[5];
      p = new PointI(lat, lon);      
  }
  if(p == null)
  {
    r = getRecordForStopByParent(idd); 
    if(r.length > 0)
    {
      lat = r[4];
      lon = r[5];
      p = new PointI(lat, lon);      
    }
  }
  
  if(p == null) report("getPositionForId null for " + id);
  return(p);
}

function getPositionForParent(pid)
{
  let lat = 0;
  let lon = 0;
  let r = getRecordForStopByParent(pid);
  let p = null;
  if(r.length > 0)
  {
      lat = r[4];
      lon = r[5];
      p = new PointI(lat, lon);      
  }
  return(p);
}


function getFacilitiesForId(id)
{
  let b = true;
  let pid = id;
  if(isBoatStop(id)) pid = getParentIdFromId(id);
  let fac = 0;
  let r = getRecordForStop(pid);
  if(r.length > 0)
  {
      fac = r[10];      
  }
  if((fac == "") || (fac == " ")) fac = ""; // was 3
  if(fac == "") fac = r[9];
  return(fac);
}


function getDistanceToHere(lat, lon)
{
    return(getDistanceBetween(lat, lon, Xpos, Ypos));
}

function toRadians(degrees)
{
  return(degrees * Math.PI / 180);    
}

function fnarccos(z)
{
  return(Math.PI / 2 - Math.atan(z / Math.sqrt(1 - z * z)));   
}

function getBearing(lat1, lon1, lat2, lon2)
{
  let RTOD = 180 / Math.PI;
  let DTOR = Math.PI / 180;
  let KTOM = .6214;
  let RE = 6371;
  let az = 0;
  let azsp = 0;
  let Lat1 = lat1 * DTOR;
  let Lng1 = lon1 * DTOR;
  let Lat2 = lat2 * DTOR;
  let Lng2 = lon2 * DTOR;
  if(Math.abs(lat1) <= 89.99)
  {
    let cosbeta = Math.sin(Lat1) * Math.sin(Lat2) + Math.cos(Lat1) * Math.cos(Lat2) * Math.cos(Lng2 - Lng1);
//    report("cosbeta = " + cosbeta);
    if(cosbeta == 1) return(null);
 //   if(cosbeta > .999999) return(null); //points coincide
 //   if(cosbeta < -.999999) return(null);
    let beta = fnarccos(cosbeta);
    let distsp = beta * RE;
    let cosaz = (Math.sin(Lat2) - Math.sin(Lat1) * Math.cos(beta)) / (Math.cos(Lat1) * Math.sin(beta));
//    report("cosaz = " + cosaz);
    if(cosaz > .999999) return(null);
    if(cosaz < -.999999) return(null);
    az = fnarccos(cosaz) * RTOD;
    if(Math.sin(Lng2 - Lng1) >= 0) 
    {
      azsp = Math.round(az);   
    }
    else
    {
      azsp = Math.round(360 - az);   
    }
    
  }
//  report("getBearing " + azsp);
  return(azsp);
}

function getDistanceBetween(lat1a, lon1a, lat2a, lon2a)
{
    let lat1 = Number(lat1a);
    let lon1 = Number(lon1a);
    let lat2 = Number(lat2a);
    let lon2 = Number(lon2a);
    let dlat = toRadians(Math.abs(lat1 - lat2));
    let dlon = toRadians(Math.abs(lon1 - lon2));
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    let d = 3961 * c;    // 3961 miles
    return(d);
}

function getDistanceFromIdToHere(id)
{
  let b = true;
  let s = "";
  let lat = 0;
  let lon = 0;
  let d = "";
  let r = getRecordForStop(id);
  if(r.length > 0)
  {
    lat = r[4];
    lon = r[5];
    d = Math.round(10 * getDistanceToHere(lat, lon)) / 10;
   
  }
  return(d);
}

function getDistanceFrom(id1, id2)
{
  let b = true;
  let s = "";
  let lat1 = 0;
  let lon1 = 0;
  let lat2 = 0;
  let lon2 = 0;
  let d = "";
  let r1 = getRecordForStop(id1);
  if(r1.length > 0)
  {
    lat1 = r1[4];
    lon1 = r1[5];
    let r2 = getRecordForStop(id2);
    if(r2.length > 0)
    {
      lat2 = r2[4];
      lon2 = r2[5];
      d = Math.round(10 * getDistanceBetween(lat1, lon1, lat2, lon2)) / 10;
    }
  }
  return(d);
}

// dmi = distance in miles
// returns minutes
function getWalkTime(dmi)
{
  let td = dmi * 19.5;
  td = Math.ceil(10 * td) / 10;
  return(td);
}

let stopmode = -1;
let stopindex = -1;


function getStopIdsFromName(name)
{
  let b = true;
  let s = "";
  let a = [];
  let sids = [];
  let ps = " ";
  let ii = 0;
  let k1 = stop_Categories.length;
  while(b && ii < k1)
  {
    a = stop_Categories[ii];
    /*
  if(ii == 0) a = stops_MBTA_CR3;
  else if(ii == 1) a = stops_MBTA_SUB;
  else if(ii == 2) a = stops_Airport;
  else if(ii == 3) a = stops_Connecting;
  else if(ii == 4) a = stops_BOAT;
  else if(ii == 5) a = stops_Other;
  else if(ii == 6) a = stops_Cape;
  else if(ii == 7) a = stops_Canada;
  else if(ii == 8) a = stops_Bus;
  */
  let k = a.length;
  let i = 0;
  while(b && (i < k))
  {
    if(name == a[i + 1])
    {
      b = false;
      sids[0] = a[i];
      ps = a[i+8];
    }
    i += 12;
  }
  ii += 1;
  }
  
  if((!b) && ((ps != " ") || (sids[0].indexOf("place-") == 0)))
  {
  let sname = "";
  if(ps != " ") sname = ps;
  else sname = sids[0];
  ii = 0;
  b = true;
  while(b && ii < k1)
  {
      a = stop_Categories[ii];
      /*
  if(ii == 0) a = stops_MBTA_CR3;
  else if(ii == 1) a = stops_MBTA_SUB;
  else if(ii == 2) a = stops_Airport;
  else if(ii == 3) a = stops_Connecting;
  else if(ii == 4) a = stops_BOAT;
  else if(ii == 5) a = stops_Other;
  else if(ii == 6) a = stops_Cape;
  else if(ii == 7) a = stops_Canada;
  else if(ii == 8) a = stops_Bus;
  */
  let k = a.length;
  let i = 0;
  while(b && (i < k))
  {
    if((sname == a[i+8]) && (sids[0] != a[i]))
    {
      sids[sids.length] = a[i];
    }
    else if((sname == a[i]) && (sids[0] != a[i]))
    {
      sids[sids.length] = a[i];
    }
    i += 12;
  }
  ii += 1;
  }
  }
  return(sids);    
}

let cid = "";

function checkId(id, idarray)
{
   let b = false;
   cid = "";
   let k = idarray.length;
   let i = 0;
   while(!b && (i < k))
   {
     if(id == idarray[i])
     {
       b = true;
       cid = id;
     }
     i += 1;
   }
   return(b);
}

function checkIdP(id, idarray)
{
   let b = false;
   let pid = getParentIdFromId(id);
   cid = "";
   let k = idarray.length;
   let i = 0;
   while(!b && (i < k))
   {
     if(pid == getParentIdFromId(idarray[i]))
     {
       b = true;
       cid = id;
     }
     i += 1;
   }
//   report("1430 checkIdP " + id + " " + pid + " " + b);
   return(b);
}

function getStopIdsFromId(id)
{
  let b = true;
  let s = "";
  let a = [];
  let sids = [];
  let ps = " ";
  let ii = 0;
//  sids[0] = id;
/*  if(id.indexOf("place-") == 0) 
  {
     ps = id;
     b = false;
  }
  else */
  {
    let r = getRecordsForParent(id); 
//    report("gsifi " + id + " " + r.length);
    let k = r.length;
    let i = 0;
    while(i < k)
    {
      sids[sids.length] = r[i][0];
      i += 1;
    }
  }
  let rids = [];
  addUnique(rids, sids);
  return(rids);    
}
      

function getStopChildrenNamesFromId(id)
{
  let pid = id;
  if(pid.indexOf("place-") == -1) pid = getParentIdFromId(pid);
  let rr = getRecordsForParent(pid);
  let kk = rr.length;
  let ii = 0;
  while(ii < kk)
  {
    s[s.length] = r[ii][1];   
  }  
  return(s);    
}

function getParentIdFromId(stop_id)
{
  let pi = getParentIdsFromId(stop_id);
  let n = pi.indexOf(",");
  if(n != -1) pi = pi.substring(0, n);
  return(pi);
}

function getMBTAParentIdFromId(stop_id)
{
  let pi = getParentIdsFromId(stop_id);
  let n = pi.indexOf(",");
  if(n != -1) pi = pi.substring(n+1);
  return(pi);
}

function getParentIdsFromId(stop_id)
{
  let ii = 0;
  let kk = stop_Categories.length;
  let b = true;
  let pi = "";
  let a = [];
  if((typeof stop_id === 'undefined') || (stop_id == null) || (stop_id == "null")) ;
  else
  {
  if(stop_id.indexOf("place-") != -1)
  {
    pi = stop_id;   
  }
  else
  {
    let r = getRecordForStop(stop_id);
    if(r.length != 0)
    {
      pi = r[8];
    }  
    else
    {
        r = getRecordForStopByName(stop_id);
        if(r.length != 0)
        {
          pi = r[8];
          if((pi == "") && (r[0].indexOf("place-") == 0)) pi = r[0];
        }  
        else 
        {
          r = getRecordForStopFromArray(stop_id, stops_tracks);
          if(r.length != 0)
          {
            pi = r[8];
            if((pi == "") && (r[0].indexOf("place-") == 0)) pi = r[0];
          }
        }
        if((r.length == 0) && (document.getElementById("rp").checked)) report("1350 no record for stop_id " + stop_id);
    }
    if((pi == " ") || (pi == "")) pi = stop_id;
  }
  }
//  report("1530 getParentIdFromId " + stop_id + " " + pi);
  if(typeof pi === 'undefined') pi = "";
  return(pi);
}

// get route_id from short_id
function getRouteIdForS(sid)
{
  let s = "";
  let b = true;
  let k = routesS.length;
  let i = 0;
  while(b && (i < k))
  {
    if(sid ==routesS[i])
    {
      s = routesS[i+1];
      b = false;
    }
    i += 2;
  }
  return(s);
}

// get short_id from route_id
function getRouteSForId(id)
{
  let s = "";
  let b = true;
  let k = routesS.length;
  let i = 1;
  while(b && (i < k))
  {
//    if(id ==routesS[i])
    if(routesS[i].indexOf(id) != -1)
    {
      s = routesS[i-1];
      b = false;
    }
    i += 2;
  }
  return(s);
}

// get short_ids (multiple) from route_id
function getRoutesSForId(id)
{
  let s = "";
  let bFirst = true;
  let k = routesS.length;
  let i = 1;
  while(i < k)
  {
    if(id ==routesS[i])
    {
      if(!bFirst) s += ",";
      else bFirst = false;
      s += routesS[i-1];
    }
    i += 2;
  }
  return(s);
}

function isMBTARoute(route_id)
{
  let b = true;
  let k = MBTAroutes.length;
  let i = 1;
  while(b && (i < k))
  {
    if(route_id == MBTAroutes[i])
    {
      b = false;
    }
    i += 1;
  }
  if(b)
  {
    if(isMBTABus(route_id))
    {
      b = false;   
    }
  }
  return(!b);
}

function getMBTARouteAlt(route_id)
{
  let b = true;
  let r = "";
  let k = MBTAroutes.length;
  let i = 1;
  while(b && (i < k))
  {
    if(route_id == MBTAroutes[i])
    {
      b = false;
      r = MBTAroutes[i-1]
    }
    i += 1;
  }
  return(r);
}

function isMBTABus(route_id)
{
  let b = true;
  let k = routes_bus.length;
  let i = 1;
  while(b && (i < k))
  {
    if(route_id == routes_bus[i])
    {
      b = false;
    }
    i += 5;
  }
  return(!b);   
}

function isAmRoute(route_id)
{
  let b = true;
  let k = amroutes.length;
  let i = 1;
  while(b && (i < k))
  {
    if(route_id == amroutes[i])
    {
      s = amroutes[i-1];
      b = false;
    }
    i += 2;
  }
  return(!b);
}

let TTS = "";

function isOtherRoute(routelist)
{
  let b = false;
  TTS = "";
  let k = routes_other.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(routelist.indexOf(routes_other[i]) != -1) 
    {
      b = true;
      TTS = routes_other[i + 3]; 
    }
    i += 4;
  }
  return(b);
}


function searchForStops(s, type, max)
{
  let aa = stop_Categories;
  let kk = aa.length;
//  report("1737 search " + s + " " + kk);
  let r = [];
  let rl = 0;
  let ii = 0;
  while(ii < kk)
  {
    let a = aa[ii];
    let k = a.length;
    let i = 0;
    while((rl < max) && (i < k))
    {
//      if(typeof a[i+1] === 'undefined') report("search error type = " + type + " ii = " + ii + " i = " + i);
      if(a[i + 1].toLowerCase().indexOf(s) != -1)
      {
        r[r.length] = a[i]; //stop_id
        r[r.length] = a[i+1]; //stop_name
        rl += 1;
      }
      i += 12;
    }
    ii +=1;
  }
  return(r);
}

function timezone(stop_id)
{
  let tz = 0;
  let b = false;
  let k = Atimezone.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(Atimezone[i] == stop_id) 
    {
      b = true;
      tz = -1;
    }
    i += 1;
  }
  return(tz);
}

const Atimezone = ["Campbellton-NB", "Charlo", "Jacquet River", "Petit-Rocher", "Bathurst", "Miramichi", "Rogersville", "Moncton", "Sackville-NB", "Amherst-NS", "Springhill-Jct", "Truro-NS", "Halifax-NS", "Yarmouth-Ferry-NS"];

const routesS = ["CH0", "CR-Haverhill", "CN0", "CR-Newburyport", "CN1", "CR-Newburyport", "CL0", "CR-Lowell", "CL1", "CR-Lowell","CW0", "CR-Worcester","KP0","CR-Kingston","FT0","CR-Fitchburg","ND0", "CR-Needham","PS0", "CR-Providence", "PS1", "CR-Providence", "FK0","CR-Franklin","FM0", "CR-Fairmount","CG0","CR-Greenbush","ML0","CR-Middleborough","FX0","CR-Foxboro",
"B0", "Blue", "O0", "Orange", "R0","Red", "R2", "Red", "R3", "Mattapan", "G0", "Green-E", "G1", "Green-B", "G2","Green-C", "G3", "Green-D", "G4", "Green-E",
"AD0","AD0","AV0","AV0","AA0","AA0","AL0","AL0","AR0","AR0","AR1","AR1","AR2","AR2","BP0","BP0", "BPH0", "BPH0","PP0","PP0","SL3","743","S1","741","SL2","742", "L22","L22","L33","L33","L55","L55","L66","L66","VM0","VM0","AV1","AV1", "HN0", "HN0","AM0", "AM0", "AE0","AE0", "OB0", "OB0", "VIA1", "VIA1","CT1","CT1","SE1","SE1", "MN3", "MN3","MN4", "MN4","MN5", "MN5","MN6", "MN6","MN1", "MN1","MN2", "MN2", "MN7", "MN7","GH2","GH2"
];

const MBTAroutes =
["CH0", "CR-Haverhill", "CN0", "CR-Newburyport", "CN1", "CR-Newburyport", "CL0", "CR-Lowell", "CL1", "CR-Lowell", "CW0", "CR-Worcester","KP0","CR-Kingston","FT0","CR-Fitchburg","ND0", "CR-Needham","PS0", "CR-Providence", "PS1", "CR-Providence", "FK0","CR-Franklin","FM0", "CR-Fairmount","CG0","CR-Greenbush","ML0","CR-Middleborough","FX0","CR-Foxboro","SC","CR-NewBedford",
"B0", "Blue", "O0", "Orange", "R0","Red", "R2", "Red", "R3", "Mattapan", "G0", "Green-E", "G1", "Green-B", "G2","Green-C", "G3", "Green-D", "G4", "Green-E"
];

const amroutes = ["AD0","AD0","AV0","AV0","AA0","AA0","AL0","AL0","AR0","AR0","AR1","AR1","AR2","AR2",
"CF0", "CF0", 
"PP0", "PP0", "BP0", "BP0", "BPH0", "BPH0","PY0", "PY0", "L22","L22","L33","L33","L55","L55","L66","L66", "HN0", "HN0", "OB0", "OB0", "OB1", "OB1", "VM0","VM0", "AV1","AV1", "AM0","AM0", "AE0","AE0", "GH0", "GH0", "VIA1", "VIA1", "CT1", "CT1","SE1","SE1", "MN3", "MN3", "MN4", "MN4","MN5", "MN5","MN6", "MN6","MN1", "MN1", "MN2", "MN2","MN7", "MN7"];

const routes_other = [ // shortid, route_id, route description, transfer stops
"AV0","AV0","AMTRAK Vermonter", "Springfield,NewHaven-CT,NewYork-Penn-NY",
"AV1","AV1","AMTRAK Ethan Allan", "Albany-Rensselaer-NY,NewYork-Penn-NY",
"VM0","VM0","AMTRAK Adirondack","Albany-Rensselaer-NY,NewYork-Penn-NY,Montreal-QC",
"AM0","AM0","AMTRAK Maple Leaf","Albany-Rensselaer-NY,NewYork-Penn-NY",
"AE0","AE0","AMTRAK Empire","Albany-Rensselaer-NY,NewYork-Penn-NY",
"AR1","AR1","AMTRAK Northeast Regional", "Springfield,NewHaven-CT,NewYork-Penn-NY",
"AR2","AR2","AMTRAK Northeast Regional", "Springfield,NewHaven-CT,"
];

const route_transfer = [ // short_id, route_id, transfer_stops
"CH0", "CR-Haverhill", "T_BNT-0000,T_WR-0329,place-WR-0120",
"CH0B","CR-Haverhill","place-WR-0120",
"CN0", "CR-Newburyport", "T_BNT-0000,T_ER-0183,T_ER-0046,T_GB-0254",
"CN1", "CR-Newburyport", "T_BNT-0000,T_ER-0183,T_ER-0046",
//"CN2", "CR-Rockport Shuttle", "GB-0254",
"CL0", "CR-Lowell", "T_BNT-0000,T_NHRML-0127",
"CL1", "CR-Lowell", "5271,T_NHRML-0127",
"CW0", "CR-Worcester","T_NEC-2287",
"KP0","CR-Kingston", "T_NEC-2287",
"SC","CR-NewBedford", "T_NEC-2287",
"FT0","CR-Fitchburg", "T_BNT-0000",
"ND0", "CR-Needham", "T_NEC-2287",
"PS0", "CR-Providence", "T_NEC-2287,T_NEC-1851",
"PS1", "CR-Providence", "T_NEC-2287,T_NEC-1851",
"FK0","CR-Franklin","T_DB-0095,T_NEC-2287",
"FM0", "CR-Fairmount","T_DB-0095,T_NEC-2287",
"CG0","CR-Greenbush","T_NEC-2287",
"ML0","CR-Middleborough","T_NEC-2287",
"FX0","CR-Foxboro","T_NEC-2287",
"CF0","CapeFlyer", "T_NEC-2287,T_CM-0790-S",
"B0", "Blue", "place-state,place-gover,place-aport",
"O0", "Orange","T_BNT-0000",
"R0","Red", "T_NEC-2287",
"R2", "Red", "place-asmnl,place-jfk,place-sstat,place-dwnxg,place-pktrm,place-portr",
"R3", "Mattapan", "place-asmnl",
"G0", "Green-E","place-pktrm,place-coecl,place-gover,place-north",
"G1", "Green-B", "place-kencl,place-coecl,place-pktrm,place-gover",
"G2","Green-C", "place-kencl,place-coecl,place-gover,place-pktrm",
"G3", "Green-D", "place-kencl,place-coecl,place-gover,place-pktrm, place-north",
"G4", "Green-E","place-pktrm,place-coecl,place-gover,place-north",
//"AR1","AR1", "NewYork-Penn-NY,NewHaven-CT,Springfield",
//"AR2","AR2", "NewHaven-CT,Springfield",
"CT1","CT1", "AMSNYP,AMSSPG",
"SE1","SE1", "AMSNHV",
"MN3","MN3", "NewHaven-CT,Stamford-CT,place-gcny",
"MN4","MN4", "Stamford-CT,place-gcny",
"MN5","MN5", "SouthNorwalk-CT",
"MN5A","MN5A", "SouthNorwalk-CT",
"MN6","MN6", "Bridgeport-CT",
"MN1","MN1", "Poughkeepsie-NY,Croton-Harmon-NY,place-gcny",
"MN2","MN2", "place-gcny",
"MN7","MN7", "Southeast-NY",
"BP0","BP0", "Boston-Seaport,ProvincetownDock",
"BPH0", "BPH0", "Long Wharf,Boston,ProvincetownDock",
//"PB2","PB2", "NEC-2287,CM-0790-S",
//"PB5","PB5", "NEC-2287,CM-0790-S",
"PP0","PP0", "Springfield,T_WML-0442-CS,T_NEC-2287",
"SL3","743", "T_ER-0046,place-aport,T_NEC-2287",
"PP14343","PP14343", "T_CM-0790-S,Provincetown",
"L22","L22", "place-aport",
"L33","L33", "place-aport",
"L55","L55", "place-aport",
"L66","L66", "place-aport,Logan-Dock",
"LBB","LBB", "place-LoganA",
"LPB","LPB", "place-LoganA",
"LFH","LFH", "place-LoganA",
"LBT","LBT", "place-LoganA",
"LWB","LWB", "place-LoganA",
//"AV1","AV1", "NewYork-Penn-NY,Albany-Rensselaer-NY",
"HN0", "HN0","Nantucket,HyannisTerminal",
//"AM0", "AM0","NewYork-Penn-NY,Albany-Rensselaer-NY", 
//"AE0","AE0", "NewYork-Penn-NY,Albany-Rensselaer-NY",
"OB0", "OB0", "Oak Bluffs,Hyannis Terminal",
"MV0", "MV0", "place-woods",
"MV1", "MV1", "place-woods",
"PY0", "CAT", "Bar-Harbor-ME",
"VIA1", "VIA1", "Montreal-QC",
"NY1", "NY1", "place-sfwh,NYT128,NYT127,NYT120,NYT123,NYT132,NYT137",
"NY2", "NY2", "NYT127,NYT235,NYT234,NYT239",
"NY3", "NY3", "NYT127,NYT235,NYT234,NYT239",
"NY4", "NY4", "NYT635,NYTR20,NYT631,NYT234,NYT235,NYT239,NYT621",
"NY5", "NY5", "NYT635,NYTR20,NYT631,NYT621,NYT626,NYT629",
"NY6", "NY6", "NYT635,NYTR20,NYT631,NYT621,NYT626,NYT629",
"NY7", "NY7", "NYT127,NYT631,NYT710,place-qp,place-cs,place-gcy,place-tsq",
//"NYGS", "NYGS", "NYT901,NYT902",
"NYA", "NYA", "NYTA27,NYTA28,NYT629,place-nycbj,NYTA15,NYTA24",
//"NYB", "NYB", "NYTA24,NYTD15,NYTD17,NYTR30,NYTA15,NYTD16,NYTD20,NYTD21",
"NYC", "NYC", "NYTA27,NYTA28,NYT629,place-nycbj,NYTA15,NYTA24",
"NYD", "NYD", "NYTD14,NYTD17,NYTR31,NYTA24",
"NYE", "NYE", "NYTA28,NYTA27,NYTE01,NYTG14,NYTG06,NYTF09",
"NYF", "NYF", "NYTR17,NYTD17,NYTD20,NYTG14",
//"NYFS", "NYFS", "place-nycfa,NYTD26,place-nycbg",
"NYG", "NYG", "NYTF23,NYTA42",
"NYJ", "NYJ", "NYTG06,place-nycbj",
"NYL", "NYL", "place-nycus,place-nycbj,NYTM08",
"NYM", "NYM", "NYTG14,NYTD15,NYTD16,NYTD17,NYTD20,NYTD21,NYTG08",
"NYN", "NYN", "place-tsq,NYTD17,place-nycus,NYTD43,NYTR14,NYTR16,NYTR17,NYTR20,NYTR31,NYTR36",
"NYQ", "NYQ", "place-tsq,place-nycus,place-canal,NYTD43,NYTR14,NYTR16,NYTR17,NYTR20,NYTR31,NYTR36",
"NYR", "NYR", "NYTR16,NYTD17,NYTG08,NYTG14,NYTR14,NYTR16,NYTR17,NYTR20,NYTR31,NYTR36",
//"NYH", "NYH", "NYTH04", // Far Rockaway Shuttle
//"NYW", "NYW", "NYTR16,NYTD17,NYTR14,NYTR20",
//"NYZ", "NYZ", "NYTM20",
"NYSI", "NYSI", "place-stgft,place-nycbg,place-nycpp,nycfa",
"SIF","SIF","place-stgft,place-sfwh",
"CC2976", "CC2976", "800551,800569", // Woods Hole
"CC2973", "CC2973", "800551,800588", // H2O
"CC2981", "CC2981", "800551", // Barnstable
"CC3139", "CC3139", "800551", // Hyannis Loop
"CC2977", "CC2977", "800551", // Sandwich
"CC2980", "CC2980", "800616,800588", //Flex
"CC2978", "CC2978", "800569,800652",  //Bourne Run
"CZ1","CZ1","NEC-2287,Portland-ME,Bangor-ME",
"DE1","DE1","Bangor-ME,Bangor-ME (Airport)",
"GH2","GH2","Bangor-ME (Airport),Portland-ME,Portland-ME (GH)",
"NJR1","NJR1","place-wrtcn,place-trenton",
"NJR2","NJR2","place-PA,place-pensk",
"NJR3","NJR3","place-hoboken",
"NJR4","NJR4","place-newbr,place-hoboken",
"NJR5","NJR5","place-newbr,place-secaucus,place-nyc", // NJ105
"NJR6","NJR6","place-hoboken",
"NJR7","NJR7","NJ43599,place-hoboken",
"NJR8","NJR8","place-secaucus,place-hoboken",
"NJR9","NJR9","place-secaucus,place-newbr,place-nyc,place-hoboken",
"NJR10","NJR10","place-newbr,place-nyc,place-hoboken",
"NJR11","NJR11","place-newark,place-secaucus,place-trenton,place-nyc,place-newarkair",
"NJR12","NJR12","place-newark,place-secaucus,place-nyc,NJ74,place-newarkair",
"NJR13","NJR13","NJ74",
"NJR14","NJR14","place-newark",
"NJR15","NJR15","place-secaucus,place-hoboken",
"NJR16","NJR16","NJ124,NJ125",
"NJR17","NJR17","place-newark",
"NJR18","NJR18","place-trenton,place-pensk",
"PATH862","PATH862","place-newark,place-xchg",
"PATH860","PATH860","place-hoboken,place-xchg",
"PATH859", "PATH859","place-hoboken",
"PATH1024", "PATH1024","place-hoboken",
"PATH861", "PATH861","place-jour",
"NAT","NAT","place-newarkair",
"JFK","JFK", "place-jamaica,place-howard",
"LIRR1","LIRR1","place-nyc,LI27,LI214,LI349",
"LIRR2","LIRR2","LI102,LI214,LI349",
"LIRR3","LIRR3","LI102,LI214,LI349",
"LIRR4","LIRR4","LI102,LI214,LI349",
"LIRR5","LIRR5","LI102,LI27,LI214,LI349",
"LIRR6","LIRR6","place-nyc,LI102,LI214,LI349",
"LIRR7","LIRR7","place-nyc,LI102,LI214,LI349",
"LIRR8","LIRR8","place-nyc,LI102,LI214,LI349",
"LIRR9","LIRR9","place-nyc,LI214,LI349",
"LIRR10","LIRR10","LI91,LI102,LI132,LI214,LI349",
"LIRR11","LIRR11","place-nyc,LI27,LI214,LI349",
"LIRR12","LIRR12","place-nyc,LI27,LI102,LI214,LI349",
"LIRR13","LIRR13","LI27",
"MVRTA10733","MVRTA10733","MV_2448784",
"MVRTA10746","MVRTA10746","MV_2448784,MV_2448845",

"AMR51","AMR51","AMSCHI,AMSLAX,AMSKCY,AMSGBB",
"AMR54","AMR54","AMSCHI,AMSMKE",
"AMR55","AMR55","AMSCHI",
"AMR56","AMR56","AMSCHI,AMSCDL",
"AMR58","AMR58","AMSNYP,AMSCHI,AMSWAS",
"AMR59","AMR59","AMSCHI,AMSIND",
"AMR60","AMR60","AMSSEA,AMSVAC,AMSPDX",
"AMR61","AMR61","AMSBON,AMSPOR,T_BNT-0000,T_WR-0329",
"AMR62","AMR62","AMSNOL,AMSCHI",
"AMR63","AMR63","AMSCHI,AMSCDL",
"AMR64","AMR64","place-nyc,AMSPHL,AMSPGH",
"AMR68","AMR68","AMSNYP,AMSBUF,AMSTWO,AMSALB,AMSPOU",
"AMR69","AMR69","AMSWAS,AMSNYP",
"AMR70","AMR70","AMSMIA,AMSWAS,AMSNYP,AMSPHL,AMSORL",
"AMR72","AMR72","AMSCHI,AMSGBB",
"AMR75","AMR75","AMSCHI,AMSSEA,AMSPDX,AMSSPK",
"AMR78","AMR78","AMSSAN,AMSLAX,place-otc",
"AMR79","AMR79","AMSCDL",
"AMR80","AMR80","AMSCHI",
"AMR81","AMR81","AMSCHI,AMSNYP,AMSALB,AMSPOU,AMSCLE,AMSBUF,AMSSPG,T_NEC-2287",
"AMR84","AMR84","AMSSJC,AMSEMY",
"AMR85","AMR85","AMSNYP,AMSWAS",
"AMR86","AMR86","AMSFTW,AMSOKC",
"AMR87","AMR87","AMSCHI,AMSLAX,AMSFTW,AMSSAS,AMSSTL",
"AMR88","AMR88", "AMSNYP,AMSNHV,T_NEC-2287,place-PA,place-newark,place-newarkair",
"AMR90","AMR90","place-nyc,AMSNHV,AMSESX,AMSPHL,AMSSPG",
"AMR91","AMR91","AMSMIA,AMSWAS,AMSNYP,AMSORL",
"AMR93","AMR93","AMSCHI,AMSGBB,AMSQCY",
"AMR94","AMR94","AMSCHI,place-nyc,AMSPHL",
"AMR95","AMR95", "AMSNYP,AMSALB,AMSMTR,AMSPOU",
"AMR96","AMR96", "AMSCHI,AMSEMY,AMSGBB,place-33727",
"AMR26025","AMR26025","AMSEMY",
"AMR36921","AMR36921","place-nyc,AMSALB,AMSPOU,AMSBUF",
"AMR36922","AMR36922","AMSCHI,AMSPGH,AMSWAS,AMSCLE",
"AMR36923","AMR36923","AMSNOL,AMSNYP,AMSWAS",
"AMR36924","AMR36924","AMSLAX,AMSEMY,AMSSEA,AMSPDX",
"AMR36926","AMR36926","AMSCHI,AMSSTL",
"AMR37329","AMR37329","AMSEMY,AMSOKJ,place-EMBR",
"AMR36930","AMR36930","AMSNOL,AMSLAX,AMSSAS",
"AMR36948","AMR36948","AMSKCY,AMSSTL",
"AMR36949","AMR36949","place-nyc,AMSALB,AMSPOU",
"AMR40751","AMR40751","place-nyc,AMSNHV,place-wdc,AMSWAS",
"AMR41042","AMR41042","place-nhc,place-springf",
"AMR41044","AMR41044","AMSSPG",
"AMR40751","AMR40751","AMSNYP,AMSNHV,T_NEC-2287,place-PA,AMSWAS",
"MDR1","MDR1","place-trirail,place-miamicentral",
"MDR2","MDR2","MDC9500",
"TRR1","TRR1","place-trirail,place-wpb",
"DCTA","DCTA","place-trinmills",
"BL1","BL1","place-miamicentral",
"ME_BNSF","ME_BNSF","place-chicago",
"ME_HC","ME_HC","place-chicago",
"ME_MDN","ME_MDN","place-chicago",
"ME_MDW","ME_MDW","place-chicago",
"ME_NCS","ME_NCS","place-chicago",
"ME_SWS","ME_SWS","place-chicago",
"ME_UPN","ME_UPN","place-chicago",
"ME_UPNW","ME_UPNW","place-chicago",
"ME_UPW","ME_UPW","place-chicago",
"ME_ME","ME_ME","place-millennium",
"ME_RI","ME_RI","place-lss",
"CTA_Blue","CTA_Blue","place-chicago,place-lss,place-40070",
"CTA_Red","CTA_Red","place-40070",
"CTA_Org","CTA_Org","place-chicago,place-millennium,place-40070",
"CTA_Y","CTA_Y","place-40900",
"CTA_G","CTA_G","place-millennium",
"CTA_Brn","CTA_Brn","place-chicago,place-millennium,place-40070",
"CTA_Pink","CTA_Pink","place-chicago,place-millennium,place-40070",
"CTA_P","CTA_P","place-chicago,place-millennium,place-40070",
"SSL1","SSL1","place-millennium",
"B_BEIGE","B_BEIGE","place-COLS",
"B_RED","B_RED","place-EMBR,place-BALB,place-ca16,place-RICH,place-MCAR,place-19TH,place-POWL",
"B_YELLOW","B_YELLOW","place-EMBR,place-BALB,place-MCAR,place-19TH,place-POWL",
"B_GREEN","B_GREEN","place-EMBR,place-BALB,place-COLS,place-POWL",
"B_BLUE","B_BLUE","place-EMBR,place-BALB,place-COLS,place-POWL",
"B_ORANGE","B_ORANGE","place-COLS,place-RICH,place-MCAR,place-19TH",
"NCTD398","NCTD398","place-otc,place-sds",
"SF_F","SF_F","place-EMBR",
"SF_M","SF_M","place-EMBR,place-POWL",
"SF_N","SF_N","place-EMBR,place-POWL",
"SF_K","SF_K","place-EMBR,place-POWL",
"SF_J","SF_J","place-BALB",
"SF_T","SF_T","place-POWL",
"NCTD399","NCTD399","place-otc",
"SEP_AIR","SEP_AIR","place-PA",
"SEP_CHE","SEP_CHE","place-PA",
"SEP_CHW","SEP_CHW","place-PA",
"SEP_LAN","SEP_LAN","place-PA",
"SEP_MED","SEP_MED","place-PA",
"SEP_FOX","SEP_FOX","place-PA",
"SEP_NOR","SEP_NOR","place-PA",
"SEP_PAO","SEP_PAO","place-PA",
"SEP_CYN","SEP_CYN","place-PA",
"SEP_TRE","SEP_TRE","place-PA",
"SEP_WAR","SEP_WAR","place-PA",
"SEP_WIL","SEP_WIL","place-PA",
"SEP_WTR","SEP_WTR","place-PA",
"LAMA","LAMA","place-lam7,place-lawrp,place-laus", // blue
"LAMC","LAMC","place-lawrp,place-lalax", // green
"LAMB","LAMB","place-laus,place-lam7,place-la15684,place-laus", //red
"LAMD","LAMD","place-laus,place-lam7,place-laus", // purple
"LAME","LAME","place-lam7,place-laexv,place-laexse", //expo
"LAMBO","LAMBO","place-laus", //orange bus
"LAMBS","LAMBS","place-laus", // silver
"LAML91","LAML91","place-laus,place-rivca",
"LAMLOC","LAMLOC","place-laus,place-otc",
"LAMLIE","LAMLIE","place-otc,place-irvine,place-rivca,CML185",
"LAMLAV","LAMLAV","place-laus",
"LAMLRL","LAMLRL","place-laus,place-rivca",
"LAMLSB","LAMLSB","place-laus,CML185",
"LAMLVC","LAMLVC","place-laus",
"LAMLFA","LAMLFA","place-laus,CML180",
"CALT","CALT","place-ca25,place-ca16,place-ca24",
"CALA","CALA","place-ca25,place-ca16,place-ca24",
"CALB","CALB","place-ca25,place-ca16,place-ca24",
"CALC","CALC","place-ca25,place-ca16,place-ca24",
"CALD","CALD","place-ca25,place-ca16,place-ca24",
"CALE","CALE","place-ca25,place-ca16,place-ca24",
"VIAR1","VIAR1","VIA119,VIA93",
"VIAR2","VIAR2","VIA119",
"VIAR3","VIAR3","VIA226",
"VIAR4","VIAR4","VIA226,VIA119",
"VIAR5","VIAR5","VIA226",
"VIAR6","VIAR6","VIA119,VIA8,VIA388,VIA21",
"VIAR8","VIAR8","place-sudca",
"VIAR10","VIAR10","VIA226",
//"VIAR11","VIAR11","VIA226",
"VIAR12","VIAR12","VIA119",
"VIAR13","VIAR13","VIA21",
"VIAR15","VIAR15","VIA119,AMSNYP",
"VIAR16","VIAR16","VIA643",
"VIAR17","VIAR17","place-que",
"VIAR18","VIAR18","VIA226,VIA617",
"VIAR19","VIAR19","VIA119,VIA617",
"VIAR20","VIAR20","VIA628",
"VIAR21","VIAR21","VIA226,VIA628",
"VIAR22","VIAR22","VIA226",
"VIAR23","VIAR23","VIA149",
"VIAR24","VIAR24","VIA226,VIA620",

"DART_TRE","DART_TRE","place-fortw,place-dallas",
"DART_Red","DART_Red","place-dallas,DT_22749",
"DART_Blue","DART_Blue","place-dallas,DT_22749",
"DART_Green","DART_Green","DT_22749,place-trinmills",
"DART_Orange","DART_Orange","DT_22749",
"DART_Silver","DART_Silver","DT_26895,place-29817",

"VRE2", "VRE2","place-wdc,place-ALX",
"VRE4", "VRE4","place-wdc,place-ALX",

"SUN_1","SUN_1","place-AMSORL",
"VTA_Blue","VTA_Blue","place-PS_TAMN,place-PS_CONV",
"VTA_Green","VTA_Green","place-PS_CONV,place-PS_DRDN",
"VTA_Ornge","VTA_Ornge","place-ca18,place-MLPT",

"RTD_A","RTD_A","place-33727,place-34502",
"RTD_B","RTD_B","place-33727,place-34508",
"RTD_G","RTD_G","place-33727,place-34508",
"RTD_D","RTD_D","place-33686,place-34115place-34114,",
"RTD_H","RTD_H","place-34679,place-33686,place-34115place-34114,",
"RTD_E","RTD_E","place-33727,place-33686",
"RTD_W","RTD_W","place-33727",
"RTD_N","RTD_N","place-33727",
"RTD_R","RTD_R","place-34679,place-34502,place-34682",
"RTD_L","RTD_L","place-34115,place-34114",
"MSLMLB","MSLMLB","place-AMSSTL",
"MSLMLR","MSLMLR","place-AMSSTL",
"MSLMLB_B","MSLMLB_B","place-AMSSTL",
"MSLMLR_R","MSLMLR_R","place-AMSSTL",
"MARC_Brunswick","MARC_Brunswick","place-wdc,place-11942",
"MARC_PENN","MARC_PENN","place-wdc,place-balt",
"MARC_Camden","MARC_Camden","place-wdc",
"MDM1","MDM1","place-s0010,place-s0011",
"MDM2","MDM2","place-Camden,place-s0011,place-balt",
"STT","STT","place-PS_SS07",
"STN","STN","place-skks",
"STS","STS","place-skks",
"ST1","ST1","place-skks,place-PS_SS07",
"WMA_RED","WMA_RED","place-wdc,WMASTN_A01_C01,WMASTN_B01_F01",
"WMA_GREEN","WMA_GREEN","WMASTN_B01_F01,WMASTN_B06_E06",
"WMA_BLUE","WMA_BLUE","WMASTN_A01_C01",
"WMA_ORANGE","WMA_ORANGE","WMASTN_A01_C01",
"WMA_YELLOW","WMA_YELLOW","WMASTN_D03_F03,WMASTN_B01_F01",
"WMA_SILVER","WMA_SILVER","WMASTN_A01_C01",
"WMA_SHUTTLE","WMA_SHUTTLE","place-12019,WMASTN_B06_E06",
"TM190","TM190","place-AMSPDX",
"TM200","TM200","place-AMSPDX",
"TM290","TM290","place-AMSPDX,place-TM7646",
"TM291","TM291","place-AMSPDX,place-TM7646",
"TM293","TM293","place-AMSPDX,place-TM7646",
"TM90","TM90","place-TM7646"
];

addTransferStops("MW01","MW01","place-woodl,MWN21");
addTransferStops("MW08","MW08","place-woodl,MWN17");
addTransferStops("MW14","MW14","MWMF6");
addTransferStops("MW05","MW05","MWBH,MWF56,MWA6");
addTransferStops("MW06","MW06","MWBH,MWMF6");
addTransferStops("MW07","MW07","MWBH,MWMB1");
addTransferStops("MW07C","MW07C","MWMB1");
addTransferStops("MW15","MW15","MWMB13");
addTransferStops("MW09","MW09","MWN21");
addTransferStops("MW11","MW11","MWBH");
addTransferStops("MW02","MW02","MWBH");
addTransferStops("MW03","MW03","MWBH");
addTransferStops("MW04S","MW04S","MWBH");
addTransferStops("MW04N","MW04N","MWBH");


const stops_TrainNS = [
"T_NHRML-0127","T_WR-0228-02","T_FR-0361","T_WR-0205-02","T_FR-0064","T_ER-0183","T_GB-0229","T_WR-0325",
"T_FR-0115","T_ER-0046","T_FR-0201","T_FR-0494-CS","T_FB-0275-S","T_GB-0316-S","T_WML-0364",
"T_WR-0085","T_PB-0281","T_FR-0137","T_WR-0329","T_NB-0076-S","T_ER-0276-S","T_FR-0132","T_WR-0264-02",
"T_FR-0167","T_FR-0301","T_NHRML-0254","T_ER-0115","T_WR-0045-S","T_GB-0254","T_WR-0067",
"T_WR-0075","T_NHRML-0116","T_GB-0198","T_ER-0362","T_ER-0208","T_NHRML-0218",
"T_FR-0451","T_BNT-0000","T_WR-0163-S","T_FR-0034","T_GB-0222",
"T_WR-0120-S","T_ER-0099","T_GB-0353-S","T_ER-0312-S","T_ER-0168-S","T_FR-0394",
"T_FR-0147","T_FR-0253","T_ER-0128","T_FR-3338-CS","T_WR-0099","T_FR-0098",
"T_FR-0074","T_NHRML-0073","T_FR-0219","T_GB-0296","T_NHRML-0055","T_WML-0091-02",
"T_WML-0340","T_NHRML-0152","T_NHRML-0078","T_WR-0062","Exeter-NH","Durham-UNH-NH",
"Dover-NH","Wells-ME","Saco-ME","OldOrchardBeach-ME","Portland-ME","Freeport-ME","Brunswick-ME", 
"place-chels","place-mlmnl","place-north","place-portr","place-salem","place-waltham","place-lynn"
];

/*
"Anderson/ Woburn", "Andover","Ayer","Ballardvale","Belmont","Beverly","Beverly Farms","Bradford",
"Brandeis/ Roberts","Chelsea","Concord","Fitchburg","Franklin","Gloucester","Grafton",
"Greenwood","Halifax","Hastings","Haverhill","Highland","Ipswich","Kendal Green","Lawrence",
"Lincoln","Littleton / Rte 495","Lowell","Lynn","Malden Center","Manchester","Melrose Cedar Park",
"Melrose Highlands","Mishawum","Montserrat","Newburyport","North Beverly","North Billerica",
"North Leominster","North Station","North Wilmington","Porter Square","Prides Crossing",
"Reading","River Works / GE Employees Only","Rockport","Rowley","Salem","place-salem","Shirley",
"Silver Hill","South Acton","Swampscott","Wachusett","Wakefield","Waltham",
"Waverley","Wedgemere","West Concord","West Gloucester","West Medford","West Newton",
"Westborough","Wilmington","Winchester Center","Wyoming Hill","Exeter-NH","Durham-UNH-NH",
"Dover-NH","Wells-ME","Saco-ME","OldOrchardBeach-ME","Portland-ME","Freeport-ME","Brunswick-ME", 
"place-belsq","place-mlmnl","place-north","place-portr","place-salem","place-waltham","place-lynn"
];
*/

const NS_routes = '{"stop_id":"North Station","stop_name":"North Station","mode":[{"route_type":"2","mode_name":"Commuter Rail","route":[{"route_id":"CR-Fitchburg","route_name":"Fitchburg Line"},{"route_id":"CR-Haverhill","route_name":"Haverhill Line"},{"route_id":"CR-Lowell","route_name":"Lowell Line"},{"route_id":"CR-Newburyport","route_name":"Newburyport/Rockport Line"}]},{"route_type":"0","mode_name":"Subway","route":[{"route_id":"Green-B","route_name":"Green Line B"},{"route_id":"Green-C","route_name":"Green Line C"},{"route_id":"Green-D","route_name":"Green Line D"},{"route_id":"Green-E","route_name":"Green Line E"}]}, {"route_type":"1","mode_name":"Subway","route":[{"route_id":"Orange","route_name":"Orange Line"}]}, {"route_type":"3","mode_name":"Bus","route":[{"route_id":"4","route_name":"4"},{"route_id":"8993","route_name":"89/93","route_hide":"true"}]}, {"route_type":"3","mode_name":"Bus","route":[{"route_id":"4","route_name":"4"}]}]}';

const SS_routes = '{"stop_id":"South Station","stop_name":"South Station","mode":[{"route_type":"2","mode_name":"Commuter Rail","route":[{"route_id":"CapeFlyer","route_name":"CapeFLYER"},{"route_id":"CR-Fairmount","route_name":"Fairmount Line"},{"route_id":"CR-Worcester","route_name":"Framingham/Worcester Line"},{"route_id":"CR-Franklin","route_name":"Franklin Line"},{"route_id":"CR-Greenbush","route_name":"Greenbush Line"},{"route_id":"CR-Kingston","route_name":"Kingston/Plymouth Line"},{"route_id":"CR-Middleborough","route_name":"Middleborough/ Lakeville Line"},{"route_id":"CR-Needham","route_name":"Needham Line"},{"route_id":"CR-Providence","route_name":"Providence/Stoughton Line"}]},{"route_type":"1","mode_name":"Subway","route":[{"route_id":"Red","route_name":"Red Line"}]}, {"route_type":"3","mode_name":"Bus","route":[{"route_id":"741","route_name":"Silver Line SL1"},{"route_id":"742","route_name":"Silver Line SL2"},{"route_id":"743","route_name":"Silver Line SL3"},{"route_id":"746","route_name":"Silver Line Waterfront","route_hide":"true"}]}, {"route_type":"3","mode_name":"Bus","route":[{"route_id":"4","route_name":"4"},{"route_id":"7","route_name":"7"},{"route_id":"11","route_name":"11"},{"route_id":"448","route_name":"448"},{"route_id":"449","route_name":"449"},{"route_id":"459","route_name":"459"}]}]}';


// 1 = "Key Bus Route (Frequent Service)"
// 2 = "Limited Service"
// 3 = "Local Bus"
// 4 = "Express Bus"
// 5 = "Rapid Transit"

//"route_short_name","route_id","route_long_name","route_desc","tranfer"
const routes_bus = [
"CT2", "747", "Sullivan - Ruggles", "3", "place-rugg",
"CT3", "708", "Beth Israel Deaconess or Boston Medical Center - Andrew", "3", "place-andrw",
"SL1", "741", "Logan Airport - South Station", "5", "place-sstat",
"SL2", "742", "Design Center - South Station", "5", "place-sstat",
"SL3", "743", "Chelsea - South Station", "5", "place-sstat,place-belsq",
"SL4", "751", "Nubian - South Station", "5", "place-sstat,64,place-dudly",
"SL5", "749", "Nubian - Temple Place", "5", "64,place-dudly",
"SL6", "746", "Silver Line Way - South Station", "5", "64",
"1", "1", "Harvard - Nubian via Massachusetts Avenue", "1", "place-masta,64,110,187,place-dudly",
"4", "4", "North Station - Tide Street", "2", "place-north,place-wtcst,place-sstat",
//"5", "5", "City Point - McCormack Housing", "2", "place-andrw,33",
"7", "7", "City Point - Downtown Boston", "3", "place-sstat,33",
"8", "8", "Harbor Point/UMass - Kenmore", "3", "place-kencl,place-jfk,place-rugg",
"9", "9", "City Point - Copley via Broadway Station", "3", "place-coecl,33,place-brdwy",
"10", "10", "City Point - Copley via Boston Medical Center", "3", "place-coecl,33",
"11", "11", "City Point - Chauncy & Summer", "3", "place-sstat,place-brdwy,33",
"14", "14", "Roslindale Square - Heath Street", "3", "64,place-hsmnl,place-dudly",
"15", "15", "Kane Square - Ruggles", "1", "place-rugg",
"16", "16", "Forest Hills - Andrew or UMass", "3", "place-forhl,place-andrw",
"17", "17", "Fields Corner - Andrew via Uphams Corner", "3", "place-andrw",
"18", "18", "Ashmont - Andrew", "3", "place-andrw",
"19", "19", "Fields Corner - Kenmore or Ruggles", "3", "place-fldcr",
"21", "21", "Ashmont - Forest Hills", "3", "place-forhl,place-asmnl",
"22", "22", "Ashmont - Ruggles via Jackson Square", "1", "place-rugg",
"23", "23", "Ashmont - Ruggles via Washington Street", "1", "place-rugg,place-asmnl",
"24", "24", "Wakefield Avenue & Truman Parkway - Mattapan or Ashmont", "3", "place-matt",
"26", "26", "Ashmont - Gallivan Boulevard", "3", "place-asmnl",
"27", "27", "Mattapan - Ashmont", "3", "place-asmnl,place-matt",
"28", "28", "Mattapan - Ruggles", "1", "place-matt,place-rugg,64,place-dudly",
"29", "29", "Mattapan - Jackson Square", "3", "place-matt",
"30", "30", "Mattapan - Forest Hills via Roslindale Square", "3", "place-matt,place-forhl",
"31", "31", "Mattapan - Forest Hills via Morton Street", "3", "place-matt,place-forhl",
"32", "32", "Wolcott Square - Forest Hills", "1", "place-forhl",
"33", "33", "River Street & Milton Street, Dedham - Mattapan", "3", "place-matt",
"34", "34", "Dedham Line - Forest Hills", "3", "place-forhl",
"35", "35", "Dedham Mall - Forest Hills", "3", "place-forhl",
"36", "36", "Millennium Park or VA - Forest Hills", "3", "place-forhl",
"37", "37", "Baker Street & Vermont Street - Forest Hills", "3", "place-forhl",
"38", "38", "Wren Street - Forest Hills", "3", "place-forhl",
"39", "39", "Forest Hills - Back Bay Station", "1", "place-forhl,place-bbsta",
"40", "40", "Georgetowne - Forest Hills", "3", "place-forhl",
"41", "41", "Centre Street & Elliott Street - JFK/UMass Station", "3", "place-jfk,place-dudly",
"42", "42", "Forest Hills - Nubian", "3", "place-forhl,place-dudly",
"43", "43", "Ruggles - Downtown Boston", "3", "place-pktrm,place-rugg",
"44", "44", "Jackson Square - Ruggles", "3", "place-rugg,place-dudly",
"45", "45", "Franklin Park - Ruggles", "3", "place-rugg",
"47", "47", "Central Square, Cambridge - Broadway Station", "3", "place-cntsq,place-brdwy",
"50", "50", "Cleary Square - Forest Hills", "3", "place-forhl",
"51", "51", "Reservoir - Forest Hills", "3", "place-clmnl",
"52", "52", "Dedham Mall - Watertown Yard", "3", "",
"55", "55", "Jersey Street & Queensberry Street - Downtown Boston", "3", "place-pktrm,place-coecl",
"57", "57", "Watertown Yard - Kenmore", "1", "place-kencl",
"59", "59", "Needham Junction - Watertown Square", "3", "Needham Junction",
"60", "60", "Chestnut Hill - Kenmore", "3", "place-kencl",
"61", "61", "North Waltham - Waltham Center", "3", "place-waltham",
"62", "62", "Bedford VA Hospital - Alewife", "3", "place-alfcl",
"64", "64", "Oak Square - University Park or Kendall/MIT", "3", "",
"65", "65", "Brighton - Kenmore", "3", "place-kencl",
"66", "66", "Harvard - Nubian via Allston", "1", "place-harsq,place-dudly",
"67", "67", "Turkey Hill - Alewife", "3", "place-alfcl",
"68", "68", "Harvard - Kendall/MIT", "3", "place-harsq",
"69", "69", "Harvard - Lechmere", "3", "place-lech,place-harsq",
"70", "70", "Cedarwood - Central Square, Cambridge", "3", "place-cntsq,place-waltham",
"71", "71", "Watertown Square - Harvard", "1", "place-harsq",
"72", "72", "Huron Avenue - Harvard", "3", "place-harsq",
"73", "73", "Waverley Square - Harvard", "1", "place-harsq",
"74", "74", "Belmont Center - Harvard via Concord Avenue", "3", "place-harsq",
"75", "75", "Belmont Center - Harvard via Huron Ave", "3", "place-harsq",
"76", "76", "Lincoln Lab/Hanscom Air Force Base - Alewife", "3", "place-alfcl",
"77", "77", "Arlington Heights - Harvard", "1", "place-harsq",
"78", "78", "Arlmont Village - Harvard", "3", "place-harsq",
//"79", "79", "Arlington Heights - Alewife", "3", "place-alfcl",
"80", "80", "Arlington Center - Lechmere", "3", "place-lech",
"83", "83", "Rindge Avenue - Central Square, Cambridge", "3", "place-portr",
//"84", "84", "Arlmont Village - Alewife", "2", "place-alfcl",
"85", "85", "Spring Hill - Kendall/MIT", "3", "place-knncl",
"86", "86", "Sullivan - Reservoir", "3", "place-clmnl",
"87", "87", "Clarendon Hill or Arlington Center - Lechmere via Somerville Avenue", "3", "place-lech",
"88", "88", "Clarendon Hill - Lechmere via Highland Avenue", "3", "place-lech",
"89", "89", "Clarendon Hill or Davis - Sullivan", "3", "",
"90", "90", "Davis - Assembly", "3", "place-welln",
"91", "91", "Sullivan - Central Square, Cambridge", "3", "place-sull",
"92", "92", "Assembly - Downtown Boston", "3", "place-sull",
"93", "93", "Sullivan - Downtown Boston", "3", "place-sull",
"94", "94", "Medford Square - Davis", "3", "",
"95", "95", "West Medford - Sullivan via Mystic Avenue", "3", "place-sull",
"96", "96", "Medford Square - Harvard", "3", "place-harsq",
"97", "97", "Malden Center - Wellington", "3", "place-mlmnl,place-welln",
"99", "99", "Woodland Road, Stoneham - Wellington", "3", "place-mlmnl,place-welln",
"100", "100", "Elm Street - Wellington", "3", "place-welln",
"101", "101", "Malden Center - Sullivan via Winter Hill", "3", "place-mlmnl,place-sull",
"104", "104", "Malden Center - Sullivan via Ferry Street", "3", "place-mlmnl,place-sull",
"105", "105", "Malden Center - Sullivan via Newland Street Housing", "3", "place-mlmnl,place-sull",
"106", "106", "Lebanon Street, Malden - Wellington", "3", "place-welln",
"108", "108", "Linden Square - Wellington", "3", "place-mlmnl,place-welln",
"109", "109", "Linden Square - Sullivan", "3", "place-sull",
"110", "110", "Wonderland - Wellington", "3", "place-welln",
"111", "111", "Everett, Revere, or Chelsea - Haymarket", "1", "place-haecl",
"112", "112", "Wellington - Wood Island", "3", "place-welln,place-chels",
"114", "114", "Chelsea - Maverick", "2", "place-mvbcl,place-belsq,place-chels",
"116", "116", "Wonderland - Maverick via Revere Street", "1", "place-wondl,place-mvbcl",
"117", "117", "Wonderland - Maverick via Beach Street", "1", "place-wondl,place-mvbcl",
"119", "119", "Northgate Shopping Center - Beachmont", "3", "place-bmmnl",
"120", "120", "Orient Heights - Maverick", "3", "place-mvbcl",
"121", "121", "Wood Island - Maverick", "2", "place-mvbcl",
"131", "131", "Melrose Highlands - Oak Grove", "3", "place-mlmnl",
"132", "132", "Redstone Shopping Center - Malden Center", "3", "",
"134", "134", "North Woburn - Wellington", "3", "place-welln",
//"136", "136", "Reading Depot - Malden Center via Lowell Street", "3", "place-mlmnl,Reading",
"137", "137", "Reading Depot - Malden Center via North Avenue", "3", "place-mlmnl,Reading",
//"170", "170", "Waltham - Nubian", "4", "place-waltham",
"171", "171", "Nubian - Logan Airport", "2", "place-andrw,64,place-dudly",
"195", "195", "Shattuck Hospital - Downtown Boston", "3", "place-pktrm",
"201", "201", "Fields Corner Loop via Neponset Ave", "3", "place-fldcr",
"202", "202", "Fields Corner Loop via Adams Street", "3", "place-fldcr",
"210", "210", "Quincy Center - Fields Corner", "3", "place-qnctr",
"211", "211", "Quincy Center - Squantum", "3", "place-qnctr",
//"212", "212", "Quincy Center - North Quincy", "3", "place-qnctr",
//"214", "214", "Germantown - Quincy Center", "3", "place-qnctr",
"215", "215", "Quincy Center - Ashmont via West Quincy", "3", "place-qnctr,place-asmnl",
"216", "216", "Houghs Neck - Quincy Center", "3", "place-qnctr",
"217", "217", "Quincy Center - Ashmont via Wollaston", "2", "place-qnctr,place-asmnl",
"220", "220", "Hingham Depot - Quincy Center", "3", "place-qnctr",
//"221", "221", "Fort Point - Quincy Center", "2", "place-qnctr",
"222", "222", "East Weymouth - Quincy Center", "3", "place-qnctr",
"225", "225", "Weymouth Landing - Quincy Center", "3", "place-qnctr",
"230", "230", "Montello Commuter Rail Station - Quincy Center", "3", "place-qnctr",
"236", "236", "South Shore Plaza - Quincy Center", "3", "place-qnctr",
"238", "238", "Holbrook/Randolph Commuter Rail Station - Quincy Center", "3", "place-qnctr",
"240", "240", "Avon Square - Ashmont", "3", "Holbrook/ Randolph",
"245", "245", "Quincy Center - Mattapan via Quarry Street & Edge Hill Road", "3", "place-qnctr",
//"325", "325", "Elm Street - Haymarket", "4", "place-haecl",
//"326", "326", "West Medford - Haymarket", "4", "place-haecl",
"350", "350", "North Burlington - Alewife", "3", "place-alfcl",
"351", "351", "Oak Park/Bedford Woods - Alewife", "4", "place-alfcl",
//"352", "352", "Burlington - Downtown Boston", "4", "place-state,place-gover",
"354", "354", "Woburn Line - Downtown Boston", "4", "place-state,place-gover",
"411", "411", "Jack Satter House, Revere - Malden Center", "3", "place-mlmnl",
"424", "424", "Eastern Avenue & Essex Street - Haymarket or Wonderland", "4", "place-haecl",
"426", "426", "Central Square, Lynn - Haymarket or Wonderland via Cliftondale Square", "4", "place-haecl",
"428", "428", "Oaklandvale - Haymarket", "4", "place-haecl",
"429", "429", "Northgate Shopping Center - Central Square, Lynn", "3", "place-lynn",
"430", "430", "Saugus Center - Malden Center", "3", "place-mlmnl",
//"434", "434", "Main Street, Peabody - Haymarket via Goodwin Circle", "4", "place-haecl",
"435", "435", "Liberty Tree Mall - Central Square, Lynn or Neptune Towers via Peabody Square", "3", "place-lynn",
"436", "436", "Liberty Tree Mall - Central Square, Lynn via Goodwin Circle", "3", "place-lynn",
"439", "439", "Bass Point, Nahant - Central Square, Lynn", "2", "place-cntsq",
"441", "441", "Marblehead - Wonderland via Paradise Road", "3", "place-lynn,place-wondl",
"442", "442", "Marblehead - Wonderland via Humphrey Street", "3", "place-lynn,place-wondl",
"450", "450", "Salem Depot - Haymarket or Wonderland", "4", "place-haecl",
"451", "451", "North Beverly - Salem Depot", "2", "place-salem",
"455", "455", "Salem Depot - Wonderland", "3", "place-wondl,place-salem",
"456", "456", "Salem Depot - Central Square, Lynn", "2", "place-salem,place-cntsq",
//"459", "459", "Salem Depot - Downtown Crossing", "4", "place-salem,place-dwnxg",
//"465", "465", "Danvers Square - Salem Depot", "3", "place-salem",
"501", "501", "Brighton - Downtown Boston", "4", "",
//"502", "502", "Watertown Yard - Copley", "4", "place-coecl",
//"503", "503", "Brighton - Copley", "4", "place-coecl",
"504", "504", "Watertown Yard - Downtown Boston", "4", "",
"505", "505", "Waltham Center - Downtown Boston", "4", "place-waltham",
"553", "553", "Roberts - Downtown Boston", "4", "Waltham",
"554", "554", "Waverley Square - Downtown Boston", "4", "place-waltham",
"556", "556", "Waltham Highlands - Downtown Boston", "4", "place-waltham",
"558", "558", "Riverside - Downtown Boston", "4", "place-river",
"62/76", "627", "Bedford VA Hospital - Alewife via Hanscom Air Force Base", "2", "place-alfcl",
//"710", "710", "North Medford - Medford Square, Meadow Glen Mall, or Wellington", "3", "",
"712", "712", "Point Shirley, Winthrop - Orient Heights via Revere Street", "3", "place-orhte",
"713", "713", "Point Shirley, Winthrop - Orient Heights via Winthrop Center", "3", "place-orhte",
"714", "714", "Pemberton Point, Hull - Hingham", "3", "3582",
"716", "716", "Cobbs Corner - Mattapan", "3", "place-matt",
//"72/75", "725", "Belmont Center - Harvard via Huron Avenue", "2", "place-harsq",
//"24/27", "2427", "Wakefield Avenue & Truman Parkway - Ashmont", "2", "place-asmnl",
"32/33", "3233", "River Street & Milton Street, Dedham - Forest Hills", "2", "place-forhl ",
//"37/38", "3738", "Baker Street & Vermont Street - Forest Hills via South Street", "2", "place-forhl",
"40/50", "4050", "Cleary Square - Forest Hills", "2", "place-forhl",
"89/93", "8993", "Clarendon Hill - Haymarket", "2", "place-haecl",
//"116/117", "116117", "Bellingham Square - Maverick", "2", "place-belsq,place-mvbcl",
//"214/216", "214216", "Quincy Center - Houghs Neck via Germantown", "2", "place-qnctr",
"441/442", "441442", "Central Square, Lynn - Wonderland", "2", "place-lynn,place-wondl",
"34E", "34E", "Walpole - Forest Hills", "3", "place-forhl"
//"57A", "57A", "Oak Square - Kenmore", "2", "place-kencl",
//"70A", "70A", "North Waltham - Central Square, Cambridge", "3", "place-cntsq,place-waltham"
];

//"route_id","NZBroute_id","route long name","desc","transfer",
// note: first item is not the real route_id.  Must remap via routes.txt
const routes_NJBUS = [
"Y1","Y1","1 NEWARK","",
"Y2","Y2","2 JERSEY CITY - JOURNAL SQUARE - SECAUCUS","place-secaucus,place-jour",
"Y5","Y5","5 KINNEY","place-newark",
"Y6","Y6","6 OCEAN AVENUE - JOURNAL SQUARE","place-jour",
"Y10","Y10","10 BAYONNE - JERSEY CITY","",
"Y11","Y11","11 NEWARK - WILLOWBROOK &amp; NEWARK - MONTCLAIR STATE - WILLOWBROOK (Combined)","place-newark",
"Y13","Y13","13 BROAD STREET - CLINTON AVENUE","",
"Y21","Y21","21 MAIN STREET","place-newark",
"Y22","Y22","22 NORTH BERGEN - UNION CITY - HOBOKEN","place-hoboken",
"Y23","Y23","23 NORTH BERGEN - WEEHAWKEN - HOBOKEN","place-hoboken",
"Y25","Y25","25 SPRINGFIELD AVENUE","",
"Ygo25","Ygo25","GO 25 SPRINGFIELD AVENUE LINE","",
"Y26","Y26","26 IRVINGTON - SPRINGFIELD - UNION - ELIZABETH (Combined)","",
"Y27","Y27","27 MT. PROSPECT","",
"Y28","Y28","28 NEWARK - WILLOWBROOK &amp; NEWARK - MONTCLAIR STATE - WILLOWBROOK (Combined)","",
"Ygo28","Ygo28","GO 28 BLOOMFIELD - NEWARK - NEWARK AIRPORT","",
"Y29","Y29","29 BLOOMFIELD AVENUE","place-newark",
"Y30","Y30","30 NORTH ARLINGTON - KEARNY - NEWARK","",
"Y34","Y34","34 MARKET STREET","",
"Y37","Y37","37 LYONS AVENUE","",
"Y39","Y39","39 IRVINGTON - NEWARK","place-newark",
"Y40","Y40","40 KEARNY - JERSEY GARDENS","",
"Y41","Y41","41 PARK AVENUE","",
"Y48","Y48","48 ELIZABETH - WOODBRIDGE - PERTH AMBOY","",
"Y52","Y52","52 IRVINGTON - SPRINGFIELD - UNION - ELIZABETH (Combined)","",
"Y56","Y56","56 ELIZABETH - WINFIELD (Combined)","",
"Y57","Y57","57 ELIZABETH -  TREMLEY (Combined)","",
"Y58","Y58","58 ELIZABETH - KENILWORTH","",
"Y59","Y59","59 PLAINFIELD - NEWARK","",
"Y62","Y62","62 NEWARK - ELIZABETH","place-newark",
"Y63","Y63","63 LAKEWOOD - JERSEY CITY - WEEHAWKEN EXPRESS","",
"Y64","Y64","64 LAKEWOOD - JERSEY CITY - WEEHAWKEN","",
"Y65","Y65","65 NEWARK - MOUNTAINSIDE - SOMERVILLE (Combined)","place-newark",
"Y66","Y66","66 NEWARK - MOUNTAINSIDE - SOMERVILLE (Combined)","place-newark",
"Y67","Y67","67 TOMS RIVER - LAKEWOOD - NEWARK","place-newark",
"Y68","Y68","68 OLD BRIDGE - EAST BRUNSWICK - JERSEY CITY - WEEHAWKEN - NEW YORK","",
"Y70","Y70","70 NEWARK - LIVINGSTON","place-newark",
"Y71","Y71","71 NEWARK - WEST CALDWELL","place-newark",
"Y72","Y72","72 PATERSON - BLOOMFIELD - NEWARK","place-newark",
"Y73","Y73","73 NEWARK - ORANGE - LIVINGSTON MALL","place-newark",
"Y74","Y74","74 PATERSON - NUTLEY - NEWARK","",
"Y76","Y76","76 NEWARK - HACKENSACK","place-newark",
"Y78","Y78","78 NEWARK - SECAUCUS","place-newark",
"Y79","Y79","79 NEWARK - PARSIPPANY EXPRESS","place-newark",
"Y80","Y80","80 GREENVILLE - JOURNAL SQUARE - EXCHANGE PLACE","place-jour",
"Y81","Y81","81 GREENVILLE - BAYONNE","",
"Y82","Y82","82 JERSEY CITY HEIGHTS - EXCHANGE PLACE","",
"Y83","Y83","83 HACKENSACK - JERSEY CITY - JOURNAL SQUARE ","place-jour",
"Y84","Y84","84 NORTH BERGEN - JERSEY CITY - JOURNAL SQUARE","place-jour",
"Y85","Y85","85 AMERICAN DREAM - MILL CREEK - HOBOKEN","",
"Y86","Y86","86 UNION CITY - JERSEY CITY - NEWPORT CENTRE MALL","",
"Y87","Y87","87 JERSEY CITY - HOBOKEN","",
"Y88","Y88","88 NORTH BERGEN - JERSEY CITY - JOURNAL SQUARE","place-jour",
"Y89","Y89","89 NORTH BERGEN - HOBOKEN","place-hoboken",
"Y90","Y90","90 GROVE STREET CROSSTOWN","",
"Y92","Y92","92 ORANGE CROSSTOWN","",
"Y94","Y94","94 STUYVESANT CROSSTOWN","",
"Y96","Y96","96 18TH STREET CROSSTOWN","",
"Y97","Y97","97 EAST ORANGE - MONTCLAIR","",
"Y99","Y99","99 CLIFTON AVENUE CROSSTOWN","",
"Y107","Y107","107 SOUTH ORANGE - NEW YORK","place-pabt",
"Y108","Y108","108 NEWARK - NEW YORK","place-newark,place-pabt",
"Y111","Y111","111 NEW YORK - IKEA - JERSEY GARDENS","place-pabt",
"Y112","Y112","112 CLARK - NEW YORK","place-pabt",
"Y113","Y113","113 DUNELLEN - NEW YORK","place-pabt",
"Y114","Y114","114 BRIDGEWATER -  NEW YORK","place-pabt",
"Y115","Y115","115 RAHWAY - NEW YORK","place-pabt",
"Y116","Y116","116 PERTH AMBOY - NEW YORK","place-pabt",
"Y117","Y117","117 SOMERVILLE  -  NEW YORK EXPRESS","place-pabt",
"Y119","Y119","119 BAYONNE - JERSEY CITY - NEW YORK","place-pabt",
"Y120","Y120","120 BAYONNE - DOWNTOWN NEW YORK","",
"Y121","Y121","121 NORTH BERGEN - NEW YORK","place-pabt",
"Y122","Y122","122 SECAUCUS - NEW YORK","place-secaucus,place-pabt",
"Y123","Y123","123 JERSEY CITY - UNION CITY - NEW YORK","place-pabt",
"Y124","Y124","124 SECAUCUS - NEW YORK","place-secaucus,place-pabt",
"Y125","Y125","125 JERSEY CITY - JOURNAL SQUARE - NEW YORK","place-jour,place-pabt",
"Y126","Y126","126 HOBOKEN - NEW YORK","place-hoboken,place-pabt",
"Y127","Y127","127 RIDGEFIELD - UNION CITY - NEW YORK","place-pabt",
"Y128","Y128","128 NORTH BERGEN - BOULEVARD EAST - NEW YORK","place-pabt",
"Y129","Y129","129 SECAUCUS - UNION CITY - NEW YORK","place-secaucus,place-pabt",
"Y130","Y130","130 LAKEWOOD - NEW YORK UNION HILL EXPRESS","place-pabt",
"Y131","Y131","131 SAYREVILLE NEW YORK FREEHOLD - MATAWAN - NEW YORK","place-pabt",
"Y132","Y132","132 LAKEWOOD - NEW YORK GORDON&#039;S CORNER EXPRESS","place-pabt",
"Y133","Y133","133 OLD BRIDGE - ABERDEEN - NEW YORK","place-pabt",
"Y135","Y135","135 SAYREVILLE NEW YORK FREEHOLD - MATAWAN - NEW YORK","place-pabt",
"Y136","Y136","136 LAKEWOOD - NEW YORK FREEHOLD MALL EXPRESS","place-pabt",
"Y137","Y137","137 TOMS RIVER (Seaside","place-pabt",
"Y138","Y138","138 OLD BRIDGE - EAST BRUNSWICK - JERSEY CITY - WEEHAWKEN - NEW YORK","place-pabt",
"Y139","Y139","139 LAKEWOOD - NEW YORK","place-pabt",
"Y144","Y144","144 ELMWOOD PARK - HACKENSACK - NEW YORK","place-pabt",
"Y145","Y145","145 FAIR LAWN - NEW YORK","place-pabt",
"Y148","Y148","148 MIDLAND PARK - NEW YORK","place-pabt",
"Y151","Y151","151 PATERSON - NEW YORK EXPRESS","place-pabt",
"Y153","Y153","153 FAIRVIEW - FORT LEE - NEW YORK","place-pabt",
"Y154","Y154","154 FORT LEE - PALISADES PARK - NEW YORK","place-pabt",
"Y155","Y155","155 BOGOTA - RIDGEFIELD PARK - NEW YORK","place-pabt",
"Y156","Y156","156 ENGLEWOOD CLIFFS - FORT LEE - NEW YORK","place-pabt",
"Y157","Y157","157 TEANECK - RIDGEFIELD PARK - NEW YORK","place-pabt",
"Y158","Y158","158 FORT LEE - EDGEWATER - NEW YORK","place-pabt",
"Y159","Y159","159 FORT LEE - NEW YORK","place-pabt",
"Y160","Y160","160 ELMWOOD PARK - WALLINGTON - NEW YORK","place-pabt",
"Y161","Y161","161 PATERSON - PASSAIC - NEW YORK","place-pabt",
"Y162","Y162","162 MAYWOOD - NEW YORK","place-pabt",
"Y163","Y163","163 RIDGEWOOD - NEW YORK","place-pabt",
"Y164","Y164","164 MIDLAND PARK - FAIRLAWN - NEW YORK","place-pabt",
"Y165","Y165","165 WESTWOOD - NEW YORK","place-pabt",
"Y166","Y166","166 CRESSKILL - BERGENFIELD - NEW YORK","place-pabt",
"Y167","Y167","167 HARRINGTON PARK - TEANECK - NEW YORK","place-pabt",
"Y168","Y168","168 PARAMUS - NEW YORK","place-pabt",
"Y171","Y171","171 PATERSON - NEW YORK (GWB)","",
"Y175","Y175","175 RIDGEWOOD - NEW YORK (GWB)","",
"Y177","Y177","177 HARRINGTON PARK - NEW MILFORD - NEW YORK EXPRESS","place-pabt",
"Y178","Y178","178 HACKENSACK - ENGLEWOOD - NEW YORK (GWB)","",
"Y181","Y181","181 UNION CITY - NEW YORK (GWB)","",
"Y182","Y182","182 HACKENSACK - NEW YORK (GWB)","",
"Y186","Y186","186 DUMONT - NEW YORK (GWB)","",
"Y188","Y188","188 WEST NEW YORK - NEW YORK (GWB)","",
"Y190","Y190","190 PATERSON - RUTHERFORD - NEW YORK","place-pabt",
"Y191","Y191","191 WILLOWBROOK - MONTCLAIR - NEW YORK","place-pabt",
"Y192","Y192","192 CLIFTON - NEW YORK","place-pabt",
"Y193","Y193","193 WILLOWBROOK - NEW YORK","place-pabt",
"Y194","Y194","194 STOCKHOLM - WEST MILFORD - NEW YORK","place-pabt",
"Y195","Y195","195 WILLOWBROOK - CEDAR GROVE - NEW YORK","place-pabt",
"Y196","Y196","196 WARWICK - RINGWOOD - NEW YORK","place-pabt",
"Y197","Y197","197 WARWICK - WAYNE - NEW YORK","place-pabt",
"Y198","Y198","198 WAYNE - WILLIAM PATERSON UNIVERSITY - NEW YORK","place-pabt",
"Y199","Y199","199 CLIFTON -  LYNDHURST - NEW YORK","place-pabt",
"Y308","Y308","308 NEW YORK - NEWARK PENN STATION - SIX FLAGS GREAT ADVENTURE (Seasonal)","",
"Y313","Y313","313 CAPE MAY - WILDWOOD - PHILADELPHIA","",
"Y315","Y315","315 CAPE MAY - WILDWOOD - PHILADELPHIA","",
"Y316","Y316","316 PHILADELPHIA - WILDWOOD - CAPE MAY - EXPRESS","",
"Y317","Y317","317 ASBURY PARK - FT. DIX - PHILADELPHIA","",
"Y319","Y319","319 NEW YORK - ATLANTIC CITY - WILDWOOD - CAPE MAY (Seasonal)","place-pabt",
"Y320","Y320","320 MILL CREEK - NORTH BERGEN PARK &amp; RIDE - NEW YORK","place-pabt",
"Y321","Y321","321 VINCE LOMBARDI PARK &amp; RIDE - NEW YORK","place-pabt",
"Y324","Y324","324 WAYNE PARK &amp; RIDES - NEW YORK EXPRESS (combined schedule)","place-pabt",
"Y329","Y329","329 HARMON COVE - SECAUCUS JUNCTION","place-secaucus",
"Y353","Y353","353 MEADOWLANDS SPORTS COMPLEX - SECAUCUS JUNCTION (Special Event Service)","place-secaucus",
"Y355","Y355","355 AMERICAN DREAM - NEW YORK","place-pabt",
//"Y356","Y356","356 AMERICAN DREAM - SECAUCUS JUNCTION","place-secaucus",
"Y361","Y361","361 NEWARK EXPRESS","",
"Y375","Y375","375 SPRINGFIELD AVENUE EXPRESS","",
"Y378","Y378","378 NEWARK - SECAUCUS EXPRESS","place-newark",
"Y400","Y400","400 SICKLERVILLE - PHILADELPHIA","",
"Y401","Y401","401 SALEM - PHILADELPHIA","",
"Y401","Y401","401 SALEM - PHILADELPHIA","",
"Y402","Y402","402 PENNSVILLE - PHILADELPHIA","",
"Y402","Y402","402 PENNSVILLE - PHILADELPHIA","",
"Y403","Y403","403 CAMDEN - LINDENWOLD PATCO - TURNERSVILLE","",
"Y404","Y404","404 CHERRY HILL MALL - PENNSAUKEN- PHILADELPHIA","",
"Y405","Y405","405 CAMDEN - MERCHANTVILLE - CHERRY HILL MALL","",
"Y406","Y406","406 BERLIN - MARLTON - PHILADELPHIA","",
"Y407","Y407","407 CAMDEN - MERCHANTVILLE - MOORESTOWN MALL","",
"Y408","Y408","408 MILLVILLE - PHILADELPHIA","",
"Y409","Y409","409 TRENTON - WILLINGBORO - PHILADELPHIA","place-trenton",
"Y410","Y410","410 BRIDGETON - PHILADELPHIA","",
"Y410","Y410","410 BRIDGETON - PHILADELPHIA","",
"Y412","Y412","412 SEWELL - GLASSBORO - PHILADELPHIA","",
"Y412","Y412","412 SEWELL - GLASSBORO - PHILADELPHIA","",
"Y413","Y413","413 CAMDEN - MT. HOLLY - FLORENCE","",
"Y414","Y414","414 MOORESTOWN - 30TH STREET PHILADELPHIA","",
"Y417","Y417","417 MT. HOLLY - WILLINGBORO - 30TH STREET PHILADELPHIA EXPRESS","",
"Y418","Y418","418 TRENTON EXPRESS","place-trenton",
"Y419","Y419","419 CAMDEN - RT.73/PENNSAUKEN STATION - RIVERSIDE","",
"Y450","Y450","450 CAMDEN - CHERRY HILL MALL","",
"Y451","Y451","451 CAMDEN - VOORHEES TOWN CENTER","",
"Y452","Y452","452 CAMDEN - 36TH STREET STATION","",
"Y453","Y453","453 FERRY AVENUE PATCO - CAMDEN","",
"Y455","Y455","455 CHERRY HILL MALL - WOODBURY - PAULSBORO","",
"Y457","Y457","457 CAMDEN - MOORESTOWN MALL","",
"Y459","Y459","459 VOORHEES TOWN CENTER - CAMDEN COUNTY COLLEGE - AVANDALE PARK &amp; RIDE","",
"Y463","Y463","463 WOODBURY - AVANDALE PARK/RIDE","",
"Y468","Y468","468 PENNS GROVE - SALEM - WOODSTOWN","",
"Y501","Y501","501 ATLANTIC CITY - BRIGANTINE BEACH","",
"Y502","Y502","502 ATLANTIC CITY - HAMILTON MALL - ATLANTIC CAPE COMMUNITY COLLEGE","",
"Y504","Y504","504 BUNGALOW PARK - CHELSEA HEIGHTS - VENTNOR PLAZA","",
"Y505","Y505","505 ATLANTIC CITY - MARGATE - LONGPORT","",
"Y507","Y507","507 ATLANTIC CITY - OCEAN CITY","",
"Y508","Y508","508 ATLANTIC CITY - RICHARD STOCKTON UNIVERSITY - HAMILTON MALL","",
"Y509","Y509","509 ATLANTIC CITY - SOMERS POINT","",
"Y510","Y510","510 WILDWOOD - RIO GRANDE CIRCULATOR","",
"Y551","Y551","551 PHILADELPHIA - ATLANTIC CITY","",
"Y552","Y552","552 ATLANTIC CITY - CAPE MAY","",
"Y553","Y553","553 UPPER DEERFIELD - ATLANTIC CITY","",
"Y554","Y554","554 LINDENWOLD PATCO- ATLANTIC CITY","",
"Y555","Y555","555 AVANDALE PARK &amp; RIDE - 30TH STREET PHILADELPHIA","",
"Y559","Y559","559 ATLANTIC CITY - LAKEWOOD","",
"Y600","Y600","600 TRENTON - PLAINSBORO (US 1 CORRIDOR)","",
"Y601","Y601","601 CAPITAL CONNECTION","",
"Y601","Y601","601 CAPITAL CONNECTION","",
"Y603","Y603","603 MERCER MALL - HAMILTON SQUARE - YARDVILLE - HAMILTON MARKETPLACE","",
"Y605","Y605","605 MONTGOMERY TOWNSHIP - PRINCETON - QUAKER BRIDGE MALL","",
"Y606","Y606","606 CAPITAL CONNECTION","",
"Y606","Y606","606 CAPITAL CONNECTION","",
"Y607","Y607","607 EWING - TRENTON - INDEPENDENCE PLAZA","",
"Y608","Y608","608 HAMILTON - WEST TRENTON","",
"Y608","Y608","608 HAMILTON - WEST TRENTON","",
"Y609","Y609","609 EWING - QUAKER BRIDGE MALL","",
"Y609","Y609","609 EWING - QUAKER BRIDGE MALL","",
"Y610","Y610","610 PRINCETON SEASONAL SERVICE","",
"Y611","Y611","611 TRENTON - RIVER VIEW PLAZA CIRCULATOR","",
"Y612","Y612","612 WHEELS LAWRENCE - WEST WINDSOR","",
"Y613","Y613","613 MERCER MALL - HAMILTON SQUARE - YARDVILLE - HAMILTON MARKETPLACE","",
"Y619","Y619","619 EWING - QUAKER BRIDGE MALL - MERCER COUNTY COLLEGE","",
"Y619","Y619","619 EWING - QUAKER BRIDGE MALL - MERCER COUNTY COLLEGE","",
"Y624","Y624","624 PENNINGTON - EAST TRENTON","",
"Y702","Y702","702 PATERSON - ELMWOOD PARK","",
"Y703","Y703","703 HALEDON - PATERSON - EAST RUTHERFORD","",
"Y704","Y704","704 PATERSON - WILLOWBROOK MALL","",
"Y705","Y705","705 PASSAIC - WILLOWBROOK MALL","",
"Y707","Y707","707 PATERSON - PARAMUS","",
"Y709","Y709","709 BLOOMFIELD - PASSAIC - PARAMUS","",
"Y712","Y712","712 HACKENSACK - PATERSON - WILLOWBROOK","",
"Y722","Y722","722 PATERSON - PARAMUS PARK","",
"Y744","Y744","744 PASSAIC - PATERSON - WAYNE","",
"Y746","Y746","746 RIDGEWOOD - PATERSON","",
"Y748","Y748","748 PATERSON - WAYNE","",
"Y751","Y751","751 PARAMUS - CLIFFSIDE PARK - EDGEWATER","",
"Y752","Y752","752 OAKLAND - RIDGEWOOD - HACKENSACK","",
"Y753","Y753","753 NEW MILFORD - PARAMUS","",
"Y755","Y755","755 PARAMUS - FORT LEE - EDGEWATER","",
"Y756","Y756","756 ENGLEWOOD CLIFFS - FORT LEE - PARAMUS","",
"Y758","Y758","758 PASSAIC - PARAMUS PARK","",
"Y762","Y762","762 HACKENSACK - NEW MILFORD - PARAMUS","",
"Y770","Y770","770 PATERSON - HACKENSACK","",
"Y772","Y772","772 PARAMUS - HACKENSACK- AMERICAN DREAM","",
"Y780","Y780","780 PASSAIC - HACKENSACK - ENGLEWOOD","",
"Y801","Y801","801 METROPARK LOOPS","",
"Y802","Y802","802 METROPARK LOOPS","",
"Y803","Y803","803 METROPARK LOOPS","",
"Y804","Y804","804  METROPARK LOOPS","",
"Y805","Y805","805  METROPARK LOOPS","",
"Y810","Y810","810 NEW BRUNSWICK - WOODBRIDGE CENTER","",
"Y811","Y811","811 NEW BRUNSWICK - SOUTH RIVER","",
"Y813","Y813","813 PERTH AMBOY - MIDDLESEX COUNTY COLLEGE","",
"Y814","Y814","814 NORTH BRUNSWICK - NEW BRUNSWICK - MIDDLESEX COUNTY COLLEGE","",
"Y815","Y815","815 NEW BRUNSWICK - EAST BRUNSWICK - WOODBRIDGE CENTER","",
"Y817","Y817","817 PERTH AMBOY - CAMPBELL&#039;S JUNCTION","",
"Y818","Y818","818 NEW BRUNSWICK - EAST BRUNSWICK - OLD BRIDGE","",
"Y819","Y819","819 PISCATAWAY - PLAINFIELD - METUCHEN - MIDDLESEX MALL","",
"Y822","Y822","822 PLAINFIELD - NORTH PLAINFIELD","",
"Y830","Y830","830 ASBURY PARK - POINT PLEASANT BEACH","",
"Y831","Y831","831 RED BANK - MONMOUTH MALL - LONG BRANCH","",
"Y832","Y832","832 RED BANK - MONMOUTH MALL - ASBURY PARK","",
"Y834","Y834","834 RED BANK - HIGHLANDS","",
"Y836","Y836","836 ASBURY PARK - FREEHOLD RACEWAY MALL - CENTRA STATE","",
"Y837","Y837","837 LONG BRANCH - ASBURY PARK - SEAVIEW SQUARE MALL","",
"Y838","Y838","838 FREEHOLD - RED BANK - SEA BRIGHT","",
"Y871","Y871","871 MORRISTOWN - BOONTON - WAYNE","",
"Y872","Y872","872 MORRISTOWN - RT. 10 - PARSIPPANY-TROY HILLS","",
"Y873","Y873","873 GREYSTONE - MORRISTOWN - LIVINGSTON","",
"Y874","Y874","874 MORRISTOWN - BOONTON - WAYNE","",
"Y875","Y875","875 MORRISTOWN - DOVER - ROXBURY","",
"Y878","Y878","878 MORRIS (CONVENT STATION) - FLORHAM PARK (CAMPUS DRIVE)","",
"Y880","Y880","880 MORRISTOWN - DOVER - ROCKAWAY","",
"Y890","Y890","890 SOUTH MAIN STREET","",
"Y891","Y891","891 HECKMAN (Combined)","",
"Y986","Y986","986 SUMMIT – PLAINFIELD",""
];

const routes_CTABus = [
"CTAB1","1 Bronzeville/Union Station",
"CTAB2","2 Hyde Park Express",
"CTAB3","3 King Drive",
"CTAB4","4 Cottage Grove",
"CTAB5","5 South Shore Night Bus",
"CTAB6","6 Jackson Park Express",
"CTAB7","7 Harrison",
"CTAB8","8 Halsted",
"CTAB8A","8A South Halsted",
"CTAB9","9 Ashland",
"CTABX9","X9 Ashland Express",
"CTAB10","10 Museum of S & I",
"CTAB11","11 Lincoln",
"CTAB12","12 Roosevelt",
"CTABJ14","J14 Jeffery Jump",
"CTAB15","15 Jeffery Local",
"CTAB18","18 16th-18th",
"CTAB20","20 Madison",
"CTAB21","21 Cermak",
"CTAB22","22 Clark",
"CTAB24","24 Wentworth",
"CTAB26","26 South Shore Express",
"CTAB28","28 Stony Island",
"CTAB29","29 State",
"CTAB31","31 31st",
"CTAB30","30 South Chicago",
"CTAB34","34 South Michigan",
"CTAB35","35 35th",
"CTAB36","36 Broadway",
"CTAB37","37 Sedgwick",
"CTAB39","39 Pershing",
"CTAB43","43 43rd",
"CTAB44","44 Wallace-Racine",
"CTAB47","47 47th",
"CTAB48","48 South Damen",
"CTAB49","49 Western",
"CTAB49B","49B North Western",
"CTABX49","X49 Western Express",
"CTAB50","50 Damen",
"CTAB51","51 51st",
"CTAB52","52 Kedzie/California",
"CTAB52A","52A South Kedzie",
"CTAB53","53 Pulaski",
"CTAB53A","53A South Pulaski",
"CTAB54","54 Cicero",
"CTAB54A","54A North Cicero/Skokie Blvd.",
"CTAB54B","54B South Cicero",
"CTAB55","55 Garfield",
"CTAB55A","55A 55th/Austin",
"CTAB55N","55N 55th/Narragansett",
"CTAB56","56 Milwaukee",
"CTAB57","57 Laramie",
"CTAB59","59 59th/61st",
"CTAB60","60 Blue Island/26th",
"CTAB62","62 Archer",
"CTAB62H","62H Archer/Harlem",
"CTAB63","63 63rd",
"CTAB63W","63W West 63rd",
"CTAB65","65 Grand",
"CTAB66","66 Chicago",
"CTAB67","67 67th-69th-71st",
"CTAB68","68 Northwest Highway",
"CTAB70","70 Division",
"CTAB71","71 71st South Shore",
"CTAB72","72 North",
"CTAB73","73 Armitage",
"CTAB74","74 Fullerton",
"CTAB75","75 74th-75th",
"CTAB76","76 Diversey",
"CTAB77","77 Belmont",
"CTAB78","78 Montrose",
"CTAB79","79 79th",
"CTAB80","80 Irving Park",
"CTAB81","81 Lawrence",
"CTAB81W","81W West Lawrence",
"CTAB82","82 Kimball-Homan",
"CTAB84","84 Peterson",
"CTAB95","95 95th",
"CTAB85","85 Central",
"CTAB85A","85A North Central",
"CTAB86","86 Narragansett/Ridgeland",
"CTAB87","87 87th",
"CTAB88","88 Higgins",
"CTAB90","90 Harlem",
"CTAB91","91 Austin",
"CTAB92","92 Foster",
"CTAB93","93 California/Dodge",
"CTAB94","94 South California",
"CTAB96","96 Lunt",
"CTAB97","97 Skokie",
"CTABX98","X98 Avon Express",
"CTAB100","100 Jeffery Manor Express",
"CTAB103","103 West 103rd",
"CTAB106","106 East 103rd",
"CTAB108","108 Halsted/95th",
"CTAB111","111 111th/King Drive",
"CTAB111A","111A Pullman Shuttle",
"CTAB112","112 Vincennes/111th",
"CTAB115","115 Pullman/115th",
"CTAB119","119 Michigan/119th",
"CTAB120","120 Ogilvie/Wacker Express",
"CTAB121","121 Union/Wacker Express",
"CTAB124","124 Navy Pier",
"CTAB125","125 Water Tower Express",
"CTAB126","126 Jackson",
"CTAB130","130 Museum Campus",
"CTAB134","134 Stockton/LaSalle Express",
"CTAB135","135 Clarendon/LaSalle Express",
"CTAB136","136 Sheridan/LaSalle Express",
"CTAB143","143 Stockton/Michigan Express",
"CTAB146","146 Inner Drive/Michigan Express",
"CTAB147","147 Outer Drive Express",
"CTAB148","148 Clarendon Michigan Express",
"CTAB151","151 Sheridan",
"CTAB152","152 Addison",
"CTAB155","155 Devon",
"CTAB156","156 LaSalle",
"CTAB157","157 Streeterville/Taylor",
"CTAB165","165 West 65th",
"CTAB169","169 69th-UPS Express",
"CTAB171","171 U. of Chicago/Hyde Park",
"CTAB172","172 U. of Chicago/Kenwood",
"CTAB192","192 University of Chicago Hosp. Exp.",
"CTAB201","201 Central/Ridge",
"CTAB206","206 Evanston Circulator",
"CTABBLS-1","Blue Line Shuttle",
"CTABRLS-7","Red Line Shuttle",
"CTABBRS-2","Brown Line Shuttle"
];

/*
const SFMTARouteMapMap = [
"1", "1", "CALIFORNIA",
"12", "12", "FOLSOM-PACIFIC",
"14", "14", "MISSION",
"14R", "14R", "MISSION RAPID",
"15", "15", "BAYVIEW HUNTERS POINT EXPRESS",
"18", "18", "46TH AVENUE",
"19", "19", "POLK",
"1X", "1X", "CALIFORNIA EXPRESS",
"2", "2", "SUTTER",
"21", "21", "HAYES",
"22", "22", "FILLMORE",
"23", "23", "MONTEREY",
"24", "24", "DIVISADERO",
"25", "25", "TREASURE ISLAND",
"27", "27", "BRYANT",
"28", "28", "19TH AVENUE",
"29", "29", "SUNSET",
"30", "30", "STOCKTON",
"31", "31", "BALBOA",
"33", "33", "ASHBURY-18TH ST",
"35", "35", "EUREKA",
"36", "36", "TERESITA",
"37", "37", "CORBETT",
"38", "38", "GEARY",
"38R", "38R", "GEARY RAPID",
"39", "39", "COIT",
"43", "43", "MASONIC",
"44", "44", "O'SHAUGHNESSY",
"45", "45", "UNION-STOCKTON",
"48", "48", "QUINTARA-24TH STREET",
"49", "49", "VAN NESS-MISSION",
"5", "5", "FULTON",
"52", "52", "EXCELSIOR",
"54", "54", "FELTON",
"55", "55", "DOGPATCH",
"56", "56", "RUTLAND",
"57", "57", "PARKMERCED",
"58", "58", "LAKE MERCED",
"5R", "5R", "FULTON RAPID",
"6", "6", "HAIGHT-PARNASSUS",
"66", "66", "QUINTARA",
"67", "67", "BERNAL HEIGHTS",
"7", "7", "HAIGHT-NORIEGA",
"714", "714", "BART EARLY BIRD",
"8", "8", "BAYSHORE",
"8AX", "8AX", "BAYSHORE A EXPRESS",
"8BX", "8BX", "BAYSHORE B EXPRESS",
"9", "9", "SAN BRUNO",
"90", "90", "SAN BRUNO OWL",
"91", "91", "3RD-19TH AVE OWL",
"9R", "9R", "SAN BRUNO RAPID",
"CA", "CA", "CALIFORNIA STREET CABLE CAR",
"F", "F", "MARKET & WHARVES",
"J", "J", "CHURCH",
"K", "K", "INGLESIDE",
"KBUS", "KBUS", "K INGLESIDE BUS",
"LBUS", "LBUS", "TARAVAL BUS",
"LOWL", "LOWL", "OWL TARAVAL",
"M", "M", "M OCEAN VIEW",
"N", "N", "JUDAH",
"NBUS", "NBUS", "JUDAH BUS",
"NOWL", "NOWL", "OWL JUDAH",
"PH", "PH", "POWELL-HYDE CABLE CAR",
"PM", "PM", "POWELL-MASON CABLE CAR",
"S", "S", "SHUTTLE",
"T", "T", "THIRD",
"TBUS", "TBUS", "THIRD BUS"
];
*/
/*
const LAMBRouteMap = [
"2-13172","2","Westwood - Exposition Park Via Sunset-Alvarado",
"4-13172","4","Downtown La - Santa Monica Via Santa Monica Bl",
"10-13172","10/48","W Hollywood-Dtwn La -AVALON Sta Via Melrose-Avalon",
"14-13172","14/37","Cedar Sinai-Dtwn La-Wash/Fairfax Via Beverly-Adams",
"16-13172","16","Downtown La - West Hollywood Via West 3rd St",
"18-13172","18","Wilshire Western Sta-Montebello Via 6th - Whittier",
"20-13172","20","Downtown La - Santa Monica Via Wilshire Bl",
"28-13172","28","Century City-Dtw La-Via Olympic",
"30-13172","30","Pico Rimpau - Dtwn La - Little Tokyo Sta Via Pico",
"33-13172","33","Downtown La - Santa Monica Via Venice Bl",
"35-13172","35/38","Downtown La- Wla Via Washington Bl & Jefferson Bl",
"40-13172","40","Downtown La-Sbay Galleria Via King Bl-Hawthorne Bl",
"45-13172","45","Lincoln Heights-Dtwn La-Harbr Fwy Sta Via Broadway",
"51-13172","51","Westlake/Mcarthur Pk Sta-Dtwn La-Csu Dh Via Avalon",
"53-13172","53","Downtown La - Csu Domiguez Hills Via Central Av",
"55-13172","55","Downtown La – Willowbrook Sta Via Compton Av",
"60-13172","60","Downtown La - Artesia Station Via Long Beach Bl",
"62-13172","62","Downtown La - Hawaiian Gardens Via Telegraph Rd",
"66-13172","66","Wilshire Ctr-Dtwn La-Montebello Via 8th-Olympic",
"70-13172","70","Downtown La - El Monte Via Cesar Chavez-Garvey Avs",
"76-13172","76","Downtown La - El Monte Via Valley Bl",
"78-13172","78","Downtown La-Arcadia Via Huntington-Main-Las Tunas",
"81-13172","81","Eagle Rock- Dwntwn La- Harbor Fwy Sta Via Figueroa",
"90-13172","90","Dtla - Noho Sta Via Vineland-Foothill-Glendale Bl",
"92-13172","92","Dwntwn La- Sylmar Sta Via Glendale - Glenoaks Bls",
"94-13172","94","Dtwn La - Noho Sta Via San Fernando Rd-Magnolia Bl",
"96-13172","96","Downtown La- Burbank Sta Via Griffith Park",
"102-13172","102","Lax Cty Bus Ctr - S Gate Via La Tijera-Exposition",
"105-13172","105","W Hollywood - Vernon Via La Cienega Bl",
"106-13172","106","Montebello - Monterey Park Via 1st-Garvey",
"108-13172","108","Marina Del Rey - Pico Rivera Via Slauson Av",
"110-13172","110","Playa Vista- Bell Gardens Via Jefferson Bl-Gage Av",
"111-13172","111","Lax City Bus Ctr - Norwalk Sta Via Florence Av",
"115-13172","115","Playa Del Rey - Norwalk Via Manchester - Firestone",
"117-13172","117","Lax Cty Bus Ctr-Downey Via Century Bl-Imperial Hwy",
"120-13172","120","Aviation/Lax Sta- Whittwood Ctr  Via Imperial Hwy",
"125-13172","125","El Segundo - Norwalk Station Via Rosecrans Av",
"127-13172","127","Harbor Fwy Sta - Downey Via Compton - Somerset Bls",
"128-13172","128","Compton Sta - Cerritos Towne Center Via Alondra Bl",
"134-13172","134","Malibu - Santa Monica",
"150-13172","150","Chatsworth Sta - Encino Via Topanga Cyn-Ventura Bl",
"152-13172","152","Canoga Park - N Hollywood Sta Via Roscoe Bl",
"154-13172","154","Van Nuys - Burbank Sta Via Oxnard St",
"155-13172","155","N. Hollywood Sta- Burbank Sta Via Riverside-Olive",
"158-13172","158","Chatsworth Sta-Sherman Oaks Via Devonshire-Woodman",
"161-13172","161","Thousand Oaks -AGOURA Hills -CALABASAS -WARNER Ctr",
"162-13172","162","Woodland Hills - N Hollywood Sta Via Sherman Way",
"164-13172","164","West Hills - Burbank Via Victory Bl",
"165-13172","165","West Hills - Burbank Via Vanowen St",
"166-13172","166","Chatsworth Sta -SUN Valley Via Nordhoff-Osborne St",
"167-13172","167","Chatsworth Sta-Studio Cty-Csun Via Plummr-Cldwt Cn",
"169-13172","169","Warner Ctr-Burbank Airpt Via Valley Cir-Saticoy St",
"177-13172","177","Jpl - Pasadena",
"179-13172","179","Rose Hill Tc - Arcadia L Line Sta  Via Huntington",
"180-13172","180","Hollywood-Glendale-Pasadena Via Los Feliz-Colorado",
"182-13172","182","Rose Hill Tc - E Hollywood Via Figueroa St-York Bl",
"202-13172","202","Willowbrook Sta - Del Amo Sta Via Willowbrook Av",
"204-13172","204","Hollywood -ATHENS Via Vermont Av",
"205-13172","205","Willowbrook Sta-San Pedro Via Wilmgtn-Vermont",
"206-13172","206","Hollywood - Athens Via Normandie Av",
"207-13172","207","Hollywood - Crenshaw Sta Via Western Av",
"209-13172","209","Expo/Crenshaw Sta- Gardena  Via Arlngtn - Van Ness",
"210-13172","210","Hllywd Vine Sta - So Bay Galeria Via Crenshaw Bl",
"211-13172","211/215","Inglewood-South Bay Galleria Via Prairie-Inglewood",
"212-13172","212","Hllywd/Hghlnd Sta - Hwthrne/Lennox Sta Via La Brea",
"217-13172","217","E Hollywood - La Cienega Sta Via Hollywood-Fairfax",
"218-13172","218","Studio Cty-Cedars Sinai Med Via Laurel Cyn-Fairfax",
"222-13172","222","Burbank Ritc- Hollywood Via Riverside/Hollywood Wy",
"224-13172","224","Sylmar-Universal Cty Via San Fernando - Lankershim",
"230-13172","230","Sylmar- San Fernando- Studio City- Via Laurel Cyn",
"232-13172","232","Lax City Bus Ctr-Long Beach-Via Sepulveda Bl - Pch",
"233-13172","233","Lake View Terr - Sherman Oaks Via Van Nuys Bl",
"234-13172","234","Sylmar - Sherman Oaks  Via Sepulveda Bl",
"236-13172","236","Sylmar Sta-Encino Via Balboa Bl Rinaldi St",
"237-13172","237","Encino-N. Holywd Via Woodley-White Oak Burbank Bl",
"240-13172","240","Northridge-Universal City Via Ventura-Reseda Bls",
"242-13172","242/243","Northridge - Tarzana Via Tampa - Winnetka Avs",
"244-13172","244","Chatsworth Sta-Woodland Hills Via De Soto Av",
"246-13172","246","Harbor Gateway Trans Ctr - San Pedro Via Avalon Bl",
"251-13172","251","Eagle Rock-Long Bch C-Sta Via Eagle Rock-Soto St",
"256-13172","256","Highland Park Sta - Sierra Madre Villa Sta",
"258-13172","258","Highland Park - Paramount Via Fremont - Eastern",
"260-13172","260","Artesia Station-Pasadena Via Atlantic - Fair Oaks",
"265-13172","265","Pico Rivera - Lakewood Ctr Mall Via Paramount Bl",
"266-13172","266","S Madre Villa Sta-Lakewood Ctr Mall Via Rosemead",
"267-13172","267","El Monte Sta- Pasadena Via Temple City Bl Del Mar",
"268-13172","268","Sierra Madre Villa Sta - El Monte Sta Via Baldwin",
"287-13172","287","Montebello- El Monte- Arcadia Via Rush Santa Anita",
"294-13172","294","Sylmar Sta - Burbank Sta - Via San Fernando Rd",
"344-13172","344","Harbor Gateway Tc - Palos Verdes Via Hawthorne Bl",
"460-13172","460","Downtown La - Disneyland Via Harbor Tway-105 Fwy",
"487-13172","487","Downtown La - Sierra Madre Villa Sta",
"501-13172","501","Pasadena - N. Hollywood Sta Via 134 Fwy",
"550-13172","550","Jefferson Prk - Harbor Gatwy Tc Via Harbr Trans Wy",
"577-13172","577","El Monte Sta- Long Beach Va Med Ctr Via I-605 Fwy",
"601-13172","601","Warner Center Circulator",
"602-13172","602","Westwood - Pacific Palisades Via Sunset Bl",
"603-13172","603","Glendale-Grand Sta Via San Fernando-Rampart-Hoover",
"605-13172","605","Lac+Usc Med Ctr Out Patient Shuttle",
"611-13172","611","Huntington Park  Shuttle",
"617-13172","617","Beverly Hills-Culver City Via Burton -  Robertson",
"660-13172","660","Del Mar Station - Altadena - Via Fair Oaks Shuttle",
"662-13172","662","Altadena-Pasadena Via Lake - Los Robles - Lincoln",
"665-13172","665","Rose Hill Tc - City Terrace - East La",
"686-13172","686","Pasadena Via Del Mar Sta -COLORADO-ALLEN-NEW York",
"690-13172","690","Sylmar Olive View Hosp. - Sunland Via Foothill Bl",
"720-13172","720","Santa Monica-Downtown La Via Wilshire Blvd",
"754-13172","754","Hollywood - Athens Via Vermont Av",
"761-13172","761","Sylmar Sta- West La Via Van Nuys Bl - Sepulveda Bl",
"857-13172","857","C & K Line Link",
"901-13172","901","Metro G Line",
"910-13172","910","Metro J Line"
];
*/


const routes_MTA = [

"MTA_NYCT_B1","B1","Bay Ridge - Manhattan Beach",
"MTABC_B100","B100","Mill Basin - Midwood",
"MTABC_B103","B103","Canarsie - Downtown Brooklyn Ltd",
"MTA_NYCT_B11","B11","Sunset Park - Midwood",
"MTA_NYCT_B12","B12","Lefferts Gardens - East New York",
"MTA_NYCT_B13","B13","Spring Creek - Wyckoff Hospital",
"MTA_NYCT_B14","B14","Spring Creek - Crown Heights",
"MTA_NYCT_B15","B15","Bedford Stuyvesant - JFK Airport",
"MTA_NYCT_B16","B16","Bay Ridge - Lefferts Gardens",
"MTA_NYCT_B17","B17","Canarsie - Crown Heights",
"MTA_NYCT_B2","B2","Kings Hwy Station - Kings Plaza",
"MTA_NYCT_B20","B20","Ridgewood - Spring Creek",
"MTA_NYCT_B24","B24","Williamsburg - Greenpoint",
"MTA_NYCT_B25","B25","Dwntn Bklyn & DUMBO - Broadway Junction",
"MTA_NYCT_B26","B26","Downtown Brooklyn - Ridgewood",
"MTA_NYCT_B3","B3","Bensonhurst - Bergen Beach",
"MTA_NYCT_B31","B31","Gerritsen Beach - Kings Hwy Station",
"MTA_NYCT_B32","B32","Williamsburg - Long Island City",
"MTA_NYCT_B35","B35","Brownsville - Sunset Park",
"MTA_NYCT_B36","B36","Sheepshead Bay - Coney Island",
"MTA_NYCT_B37","B37","Downtown Brooklyn - Bay Ridge",
"MTA_NYCT_B38","B38","Ridgewood - Downtown Brooklyn",
"MTA_NYCT_B39","B39","Williamsburg Bridge Plaza - Lower East Side",
"MTA_NYCT_B4","B4","Bay Ridge - Sheepshead Bay",
"MTA_NYCT_B41","B41","Kings Plaza - Downtown Brooklyn",
"MTA_NYCT_B42","B42","Canarsie Pier - Rockaway Parkway Station",
"MTA_NYCT_B43","B43","Greenpoint - Lefferts Gardens",
"MTA_NYCT_B44","B44","Sheepshead Bay - Williamsburg",
"MTA_NYCT_B44_SBS","B44-SBS","Sheepshead Bay - Williamsburg",
"MTA_NYCT_B45","B45","Downtown Brooklyn - Crown Heights",
"MTA_NYCT_B46","B46","Kings Plaza - Williamsburg",
"MTA_NYCT_B46_SBS","B46-SBS","Kings Plaza - Williamsburg",
"MTA_NYCT_B47","B47","Kings Plaza - Bedford-Stuyvesant",
"MTA_NYCT_B48","B48","Lefferts Gardens - Greenpoint",
"MTA_NYCT_B49","B49","Manhattan Beach - Bedford-Stuyvesant",
"MTA_NYCT_B52","B52","Downtown Brooklyn - Ridgewood",
"MTA_NYCT_B54","B54","Downtown Brooklyn - Ridgewood",
"MTA_NYCT_B57","B57","Gowanus - Maspeth",
"MTA_NYCT_B6","B6","Bath Beach - East New York",
"MTA_NYCT_B60","B60","Williamsburg - Canarsie",
"MTA_NYCT_B61","B61","Park Slope - Downtown Brooklyn",
"MTA_NYCT_B62","B62","Downtown Brooklyn - Long Island City",
"MTA_NYCT_B63","B63","Bay Ridge - Cobble Hill",
"MTA_NYCT_B64","B64","Bay Ridge - Coney Island",
"MTA_NYCT_B65","B65","Downtown Brooklyn - Crown Heights",
"MTA_NYCT_B67","B67","Brooklyn Navy Yard - Kensington",
"MTA_NYCT_B68","B68","Coney Island - Windsor Terrace",
"MTA_NYCT_B69","B69","Downtown Brooklyn - Kensington",
"MTA_NYCT_B7","B7","Midwood - Bedford-Stuyvesant",
"MTA_NYCT_B70","B70","Dyker Heights - Sunset Park",
"MTA_NYCT_B74","B74","Sea Gate - Stillwell Av",
"MTA_NYCT_B8","B8","Dyker Heights - East Flatbush",
"MTA_NYCT_B82","B82","Coney Island - Spring Creek Towers",
"MTA_NYCT_B82_SBS","B82-SBS","Coney Island -spring Creek Towers",
"MTA_NYCT_B83","B83","Spring Creek - Broadway Junction",
"MTA_NYCT_B84","B84","Spring Creek-New Lots",
"MTA_NYCT_B9","B9","Bay Ridge - Kings Plaza",
"MTA_NYCT_B90","B90","F Shuttle Bus - Church Av - Stillwell Av",
"MTABC_BM1","BM1","Mill Basin - Downtown/Midtown",
"MTABC_BM2","BM2","Canarsie/Spring Creek - Downtown/Midtown",
"MTABC_BM3","BM3","Sheepshead Bay - Downtown/Midtown",
"MTABC_BM4","BM4","Gerritsen Beach - Downtown/Midtown",
"MTABC_BM5","BM5","Spring Creek - Midtown",
"MTA_NYCT_BX1","Bx1","Riverdale - Mott Haven",
"MTA_NYCT_BX10","Bx10","Riverdale - Norwood",
"MTA_NYCT_BX11","Bx11","George Washington Bridge - Parkchester",
"MTA_NYCT_BX12","Bx12","Pelham Bay - Inwood",
"MTA_NYCT_BX12_SBS","Bx12-SBS","Bay Plaza - Inwood",
"MTA_NYCT_BX13","Bx13","George Washington Bridge - Bronx Terminal Market",
"MTA_NYCT_BX15","Bx15","Fordham Plaza - The Hub",
"MTA_NYCT_BX16","Bx16","Pelham - Norwood",
"MTA_NYCT_BX17","Bx17","Fordham Plaza - Port Morris",
"MTA_NYCT_BX18A","Bx18A","Morris Heights/High Bridge Circulator",
"MTA_NYCT_BX18B","Bx18B","Morris Heights/High Bridge Circulator",
"MTA_NYCT_BX19","Bx19","NY Botanical Garden - Riverbank Park",
"MTA_NYCT_BX2","Bx2","Kingsbridge Heights - Mott Haven",
"MTA_NYCT_BX20","Bx20","Riverdale - Inwood",
"MTA_NYCT_BX21","Bx21","Westchester Sq - Mott Haven",
"MTA_NYCT_BX22","Bx22","Bedford Park - Castle Hill",
"MTABC_BX23","Bx23","Pelham Bay - Co-Op City",
"MTA_NYCT_BX24","Bx24","Country Club - Hutchinson Metro Center",
"MTA_NYCT_BX25","Bx25","Co-op City Bay Plaza - Bedford Park",
"MTA_NYCT_BX26","Bx26","Co-op City Section 5 - Bedford Park",
"MTA_NYCT_BX27","Bx27","Clasons Pt - Gladstone Sq",
"MTA_NYCT_BX28","Bx28","Co-op City Section 5 - Fordham Center",
"MTA_NYCT_BX29","Bx29","City Island - Pelham Bay",
"MTA_NYCT_BX3","Bx3","Riverdale - George Washington Bridge",
"MTA_NYCT_BX30","Bx30","Co-op City Section 5 - Pelham Parkway",
"MTA_NYCT_BX31","Bx31","Woodlawn - Westchester Sq",
"MTA_NYCT_BX32","Bx32","Kingsbridge VA Hospital - Mott Haven",
"MTA_NYCT_BX33","Bx33","Port Morris - Harlem",
"MTA_NYCT_BX34","Bx34","Woodlawn - Fordham Center",
"MTA_NYCT_BX35","Bx35","George Washington Bridge-West Farms Road",
"MTA_NYCT_BX36","Bx36","Soundview - George Washington Bridge",
"MTA_NYCT_BX38","Bx38","Co-op City Bay Plaza - Norwood",
"MTA_NYCT_BX39","Bx39","Wakefield - Clasons Pt",
"MTA_NYCT_BX4","Bx4","Westchester Sq - The Hub",
"MTA_NYCT_BX40","Bx40","Throgs Neck - River Park Towers",
"MTA_NYCT_BX41","Bx41","Williamsbridge - The Hub",
"MTA_NYCT_BX41_SBS","Bx41-SBS","Williamsbridge - The Hub",
"MTA_NYCT_BX42","Bx42","Throgs Neck - River Park Towers",
"MTA_NYCT_BX46","Bx46","Prospect Av - Westchester Av / Hunts Point Market",
"MTA_NYCT_BX4A","Bx4A","Westchester Sq - Gladstone Sq",
"MTA_NYCT_BX5","Bx5","Pelham Bay - Gladstone Sq",
"MTA_NYCT_BX6","Bx6","Hunts Point - Riverside Dr",
"MTA_NYCT_BX6_SBS","Bx6-SBS","Hunts Point - Riverside Dr",
"MTA_NYCT_BX7","Bx7","Riverdale - Washington Heights",
"MTA_NYCT_BX8","Bx8","Williamsbridge - Locust Point",
"MTA_NYCT_BX9","Bx9","Riverdale - West Farms Sq",
"MTABC_BXM1","BxM1","Riverdale - East Midtown",
"MTABC_BXM10","BxM10","Williamsbridge/Morris Park - Midtown",
"MTABC_BXM11","BxM11","Wakefield - Midtown",
"MTABC_BXM18","BxM18","Riverdale - Downtown",
"MTABC_BXM2","BxM2","Riverdale - West Midtown",
"MTABC_BXM3","BxM3","Yonkers - Midtown",
"MTABC_BXM4","BxM4","Woodlawn - Midtown",
"MTABC_BXM6","BxM6","Parkchester - Midtown",
"MTABC_BXM7","BxM7","Co-Op City - Midtown",
"MTABC_BXM8","BxM8","Pelham Bay/City Island - Midtown",
"MTABC_BXM9","BxM9","Throgs Neck - Midtown",
"MTA_NYCT_D90","D90","D Shuttle Bus - Mosholu Pkwy #4 - 205 St",
"MTA_NYCT_J90","J90","J Shuttle Bus - Crescent St - Jamaica Van Wyck Station",
"MTA_NYCT_L90","L90","L Shuttle Bus - Lorimer St - Myrtle Wyckoff Avs",
"MTA_NYCT_L92","L92","L Shuttle Bus - Abingdon Sq - FDR Drive",
"MTA_NYCT_M1","M1","Harlem - East Village",
"MTA_NYCT_M10","M10","Harlem - Columbus Circle",
"MTA_NYCT_M100","M100","Inwood - Harlem",
"MTA_NYCT_M101","M101","East Village - Fort George",
"MTA_NYCT_M102","M102","Harlem - East Village",
"MTA_NYCT_M103","M103","East Harlem - City Hall",
"MTA_NYCT_M104","M104","West Harlem - Times Square",
"MTA_NYCT_M106","M106","East Harlem - West Side",
"MTA_NYCT_M11","M11","Riverbank Park & Harlem - West Village",
"MTA_NYCT_M116","M116","West Side - East Harlem",
"MTA_NYCT_M12","M12","Midtown West - West Village",
"MTA_NYCT_M125","M125","Manhattanville - The Hub",
"MTA_NYCT_M14A_SBS","M14A-SBS","Lower East Side - Abingdon Sq",
"MTA_NYCT_M14D_SBS","M14D-SBS","Lower East Side - Chelsea Piers",
"MTA_NYCT_M15","M15","East Harlem - South Ferry",
"MTA_NYCT_M15_SBS","M15-SBS","East Harlem - South Ferry",
"MTA_NYCT_M2","M2","Washington Heights - East Village",
"MTA_NYCT_M20","M20","Lincoln Center - South Ferry",
"MTA_NYCT_M21","M21","Lower East Side - West Village",
"MTA_NYCT_M22","M22","Lower East Side - Battery Park City",
"MTA_NYCT_M23_SBS","M23-SBS","Chelsea Piers - East Side",
"MTA_NYCT_M3","M3","Fort George - East Village",
"MTA_NYCT_M31","M31","Yorkville - Clinton",
"MTA_NYCT_M34_SBS","M34-SBS","East Side - Javits Center",
"MTA_NYCT_M34A_SBS","M34A-SBS","Waterside - Port Authority Terminal",
"MTA_NYCT_M35","M35","Ward's Island - East Harlem",
"MTA_NYCT_M4","M4","The Cloisters - 32 St",
"MTA_NYCT_M42","M42","United Nations - W 42 St Pier",
"MTA_NYCT_M5","M5","George Washington Bridge - 31 St & 6 Av",
"MTA_NYCT_M50","M50","W 42 St Pier - East Side",
"MTA_NYCT_M55","M55","W 44 St  - South Ferry",
"MTA_NYCT_M57","M57","East Side - West Side",
"MTA_NYCT_M60_SBS","M60-SBS","West Side - LaGuardia Airport",
"MTA_NYCT_M66","M66","East Side - Lincoln Center",
"MTA_NYCT_M7","M7","Harlem - 14th Street",
"MTA_NYCT_M72","M72","East Side - West Side",
"MTA_NYCT_M79_SBS","M79-SBS","Yorkville - West Side",
"MTA_NYCT_M8","M8","West Village - East Village",
"MTA_NYCT_M86_SBS","M86-SBS","Yorkville - West Side",
"MTA_NYCT_M9","M9","Battery Park City - Kips Bay",
"MTA_NYCT_M90","M90","M Shuttle Bus - Metropolitan Av - Myrtle Av",
"MTA_NYCT_M96","M96","East Side - West Side",
"MTA_NYCT_M98","M98","Washington Heights - Upper East Side LTD",
"MTA_NYCT_Q1","Q1","Queens Village / Bellerose - Jamaica",
"MTABC_Q10","Q10","Kew Gardens - Jfk Airport",
"MTABC_Q100","Q100","Astoria / Rikers Isl - Long Isl City Ltd",
"MTABC_Q101","Q101","Astoria - East Midtown",
"MTABC_Q102","Q102","Astoria - Roosevelt Island",
"MTABC_Q103","Q103","Astoria - Hunters Point",
"MTABC_Q104","Q104","Long Island City - Sunnyside",
"MTABC_Q11","Q11","Elmhurst / Queens Ctr - Old Howard Bch",
"MTABC_Q110","Q110","Jamaica - Queens Village",
"MTABC_Q111","Q111","Jamaica - Rosedale",
"MTABC_Q112","Q112","Jamaica - Ozone Park",
"MTABC_Q113","Q113","Jamaica - Far Rockaway Limited",
"MTABC_Q114","Q114","Jamaica - Far Rockaway Limited",
"MTA_NYCT_Q12","Q12","Little Neck - Flushing",
"MTA_NYCT_Q13","Q13","Fort Totten - Flushing",
"MTA_NYCT_Q15","Q15","Flushing - Beechhurst",
"MTA_NYCT_Q15A","Q15A","Flushing - Beechhurst / Whitestone",
"MTA_NYCT_Q16","Q16","Fort Totten - Flushing",
"MTA_NYCT_Q17","Q17","Flushing - Jamaica",
"MTABC_Q18","Q18","Astoria - Maspeth",
"MTABC_Q19","Q19","Astoria - Flushing",
"MTA_NYCT_Q2","Q2","Queens Village - Jamaica",
"MTA_NYCT_Q20A","Q20A","College Point - Jamaica",
"MTA_NYCT_Q20B","Q20B","College Point - Jamaica",
"MTABC_Q21","Q21","Elmhurst / Queens Ctr - Howard Beach",
"MTABC_Q22","Q22","Roxbury - Rockaway Pk - Far Rockaway",
"MTABC_Q23","Q23","East Elmhurst - Forest Hills",
"MTA_NYCT_Q24","Q24","Broadway Junction - Jamaica",
"MTABC_Q25","Q25","Jamaica - Flushing - College Point",
"MTA_NYCT_Q26","Q26","Fresh Meadows - Flushing (Part-time)",
"MTA_NYCT_Q27","Q27","Cambria Heights - Flushing",
"MTA_NYCT_Q28","Q28","Bayside - Flushing",
"MTABC_Q29","Q29","Jackson Heights - Glendale",
"MTA_NYCT_Q3","Q3","Jamaica - JFK Airport",
"MTA_NYCT_Q30","Q30","Little Neck or Queensborough Community College - Jamaica",
"MTA_NYCT_Q31","Q31","Bayside - Jamaica",
"MTA_NYCT_Q32","Q32","Jackson Heights - Penn Station",
"MTABC_Q33","Q33","Jackson Heights - East Elmhurst",
"MTABC_Q34","Q34","Jamaica - Flushing - Whitestone",
"MTABC_Q35","Q35","Rockaway Park - Midwood / Brooklyn Coll.",
"MTA_NYCT_Q36","Q36","Floral Park or Little Neck - Jamaica",
"MTABC_Q37","Q37","Kew Gardens - South Ozone Park",
"MTABC_Q38","Q38","Corona - Rego Park",
"MTABC_Q39","Q39","Long Island City - Ridgewood",
"MTA_NYCT_Q4","Q4","Cambria Heights - Jamaica",
"MTABC_Q40","Q40","South Ozone Park - Jamaica",
"MTABC_Q41","Q41","Jamaica - Howard Beach",
"MTA_NYCT_Q42","Q42","Addeslieigh Park - Jamaica",
"MTA_NYCT_Q43","Q43","Floral Park - Jamaica",
"MTA_NYCT_Q44_SBS","Q44-SBS","Bronx Zoo - Jamaica",
"MTA_NYCT_Q46","Q46","Glen Oaks - Kew Gardens",
"MTABC_Q47","Q47","Atlas Mall - Lga Marine Air Terminal",
"MTA_NYCT_Q48","Q48","Flushing - LaGuardia Airport",
"MTABC_Q49","Q49","Jackson Heights - East Elmhurst",
"MTA_NYCT_Q5","Q5","Rosedale or Green Acres Mall - Jamaica",
"MTABC_Q50","Q50","Co-Op City/Pelham Bay - Flushing",
"MTABC_Q52_SBS","Q52-SBS","Elmhurst - Arverne",
"MTABC_Q53_SBS","Q53-SBS","Woodside - Rockaway Park",
"MTA_NYCT_Q54","Q54","Williamsburg - Jamaica",
"MTA_NYCT_Q55","Q55","Ridgewood - Richmond Hill",
"MTA_NYCT_Q56","Q56","Broadway Junction - Jamaica",
"MTA_NYCT_Q58","Q58","Ridgewood - Flushing",
"MTA_NYCT_Q59","Q59","Williamsburg - Rego Park",
"MTABC_Q06","Q6","Jamaica - Sutphin Blvd - Jfk Cargo Area",
"MTABC_Q60","Q60","Queens Blvd. - East Midtown",
"MTABC_Q64","Q64","Forest Hills - Pomonok",
"MTABC_Q65","Q65","Jamaica - Flushing - College Point",
"MTABC_Q66","Q66","Flushing - Long Island City",
"MTABC_Q67","Q67","Middle Village - Long Island City",
"MTABC_Q69","Q69","Long Island City - Astoria",
"MTABC_Q07","Q7","East Ny - Rockaway Blvd - Jfk Cargo Area",
"MTABC_Q70_SBS","Q70-SBS","LaGuardia Link",
"MTABC_Q72","Q72","LaGuardia Airport - Rego Park",
"MTA_NYCT_Q76","Q76","College Point - Jamaica",
"MTA_NYCT_Q77","Q77","Laurelton - Jamaica",
"MTABC_Q08","Q8","Gateway Mall / East Ny - Jamaica",
"MTA_NYCT_Q83","Q83","Cambria Heights - Jamaica",
"MTA_NYCT_Q84","Q84","Laurelton - Jamaica",
"MTA_NYCT_Q85","Q85","Rosedale or Green Acres Shopping Mall - Jamaica",
"MTA_NYCT_Q88","Q88","Elmhurst - Queens Village",
"MTABC_Q09","Q9","South Ozone Park - Jamaica",
"MTA_NYCT_Q90","Q90","Q Shuttle Bus - Barclays Ctr - Prospect Park",
"MTA_NYCT_Q92","Q92","7 Shuttle Bus - Times Square - Hudson Yards",
"MTA_NYCT_Q93","Q93","7 Shuttle Bus - Queensboro Plz - Vernon Bl-Jackson Av",
"MTA_NYCT_Q94","Q94","F Shuttle Bus - Roosevelt Island - Queens Plaza",
"MTA_NYCT_Q95","Q95","F Shuttle Bus - 21 St/Queensbridge  - Queens Plaza",
"MTABC_QM1","QM1","Fresh Meadows - Midtown Via 6Th Av",
"MTABC_QM10","QM10","Lefrak City - Midtown Via 6Th Av",
"MTABC_QM11","QM11","Forest Hills - Downtown",
"MTABC_QM12","QM12","Forest Hills - Midtown Via 6Th Av",
"MTABC_QM15","QM15","Lindenwood - Midtown Express",
"MTABC_QM16","QM16","Neponsit - Midtown Express",
"MTABC_QM17","QM17","Far Rockaway - Midtown Express",
"MTABC_QM18","QM18","South Ozone Park - Midtown Express",
"MTABC_QM2","QM2","Bay Terrace - Midtown Via 6Th Av",
"MTABC_QM20","QM20","Bay Terrace - Midtown",
"MTABC_QM21","QM21","Rochdale Village - Midtown",
"MTABC_QM24","QM24","Glendale - Midtown Via 6Th Av",
"MTABC_QM25","QM25","Glendale - Downtown",
"MTABC_QM3","QM3","Little Neck - Midtown",
"MTABC_QM31","QM31","Fresh Meadows - Midtown Via 3Rd Av",
"MTABC_QM32","QM32","Bay Terrace - Midtown Via 3Rd Av",
"MTABC_QM34","QM34","Glendale - Midtown Via 3Rd Av",
"MTABC_QM35","QM35","Glen Oaks - Midtown Via 3Rd Av",
"MTABC_QM36","QM36","Lake Success - Midtown Via 3Rd Av",
"MTABC_QM4","QM4","Electchester - Midtown Via 6Th Av",
"MTABC_QM40","QM40","Lefrak City - Midtown Via 3Rd Av",
"MTABC_QM42","QM42","Forest Hills - Midtown Via 3Rd Av",
"MTABC_QM44","QM44","Electchester - Midtown Via 3Rd Av",
"MTABC_QM5","QM5","Glen Oaks - Midtown Via 6Th Av",
"MTABC_QM6","QM6","Lake Success - Midtown Via 6Th Av",
"MTABC_QM7","QM7","Fresh Meadows - Downtown",
"MTABC_QM8","QM8","Glen Oaks - Downtown",
"MTA_NYCT_S40","S40","St. George - Amazon",
"MTA_NYCT_S42","S42","St. George - Clyde Place",
"MTA_NYCT_S44","S44","St. George - Staten Island Mall",
"MTA_NYCT_S46","S46","St. George - West Shore Plaza",
"MTA_NYCT_S48","S48","St. George - Mariners Harbor",
"MTA_NYCT_S51","S51","St. George - Grant City",
"MTA_NYCT_S52","S52","St. George - Staten Island Univ. Hospital",
"MTA_NYCT_S53","S53","Port Richmond - Bay Ridge",
"MTA_NYCT_S54","S54","West New Brighton - Eltingville",
"MTA_NYCT_S55","S55","Rossville - Staten Island Mall",
"MTA_NYCT_S56","S56","Huguenot - Staten Island Mall",
"MTA_NYCT_S57","S57","Port Richmond - New Dorp",
"MTA_NYCT_S59","S59","Port Richmond - Tottenville",
"MTA_NYCT_S61","S61","St. George - Staten Island Mall",
"MTA_NYCT_S62","S62","St. George - Travis",
"MTA_NYCT_S66","S66","St. George - Port Richmond",
"MTA_NYCT_S74","S74","St. George - Bricktown Mall",
"MTA_NYCT_S76","S76","St. George - Oakwood",
"MTA_NYCT_S78","S78","St. George - Bricktown Mall",
"MTA_NYCT_S79_SBS","S79-SBS","Staten Island Mall - Bay Ridge",
"MTA_NYCT_S81","S81","St. George - Grant City LTD",
"MTA_NYCT_S84","S84","St. George - Bricktown Mall LTD",
"MTA_NYCT_S86","S86","St. George - Oakwood LTD",
"MTA_NYCT_S89","S89","Eltingville - Bayonne LTD",
"MTA_NYCT_S90","S90","St. George - Amazon",
"MTA_NYCT_S91","S91","St. George - Staten Island Mall LTD",
"MTA_NYCT_S92","S92","St. George - Travis LTD",
"MTA_NYCT_S93","S93","College of Staten Island - Bay Ridge LTD",
"MTA_NYCT_S94","S94","St. George - Staten Island Mall LTD",
"MTA_NYCT_S96","S96","St. George - West Shore Plaza LTD",
"MTA_NYCT_S98","S98","St. George - Mariners Harbor LTD",
"MTA_NYCT_SIM1","SIM1","Eltingville - Lower Manhattan Express",
"MTA_NYCT_SIM10","SIM10","Eltingville - Midtown Manhattan Express",
"MTA_NYCT_SIM11","SIM11","New Dorp - Midtown Manhattan Express",
"MTA_NYCT_SIM15","SIM15","Eltingville - Lower Manhattan Express",
"MTA_NYCT_SIM1C","SIM1C","Eltingville - Manhattan Express",
"MTA_NYCT_SIM2","SIM2","Tottenville - Lower Manhattan Express",
"MTA_NYCT_SIM22","SIM22","Eltingville - Midtown Manhattan Express",
"MTA_NYCT_SIM23","SIM23","Annadale - Midtown Manhattan Express",
"MTA_NYCT_SIM24","SIM24","Prince's Bay - Midtown Manhattan Express",
"MTA_NYCT_SIM25","SIM25","Tottenville - Midtown Manhattan Express",
"MTA_NYCT_SIM26","SIM26","Tottenville - Midtown Manhattan Express",
"MTA_NYCT_SIM3","SIM3","Pt. Richmond - Midtown Manhattan Express",
"MTA_NYCT_SIM30","SIM30","Sunnyside - Midtown Manhattan Express",
"MTA_NYCT_SIM31","SIM31","Eltingville - Midtown Manhattan Express",
"MTA_NYCT_SIM32","SIM32","Travis - Lower Manhattan Express",
"MTA_NYCT_SIM33","SIM33","Mariners Harbor - Manhattan Express",
"MTA_NYCT_SIM33C","SIM33C","Mariners Harbor - Greenwich Village Express",
"MTA_NYCT_SIM34","SIM34","Mariners Harbor - Lower Manhattan Express",
"MTA_NYCT_SIM35","SIM35","Port Richmond - Lower Manhattan Express",
"MTA_NYCT_SIM3C","SIM3C","Pt. Richmond - Manhattan Express",
"MTA_NYCT_SIM4","SIM4","Eltingville - Lower Manhattan Express",
"MTA_NYCT_SIM4C","SIM4C","Huguenot - Manhattan Express",
"MTA_NYCT_SIM4X","SIM4X","S.I. Mall - Lower Manhattan Express",
"MTA_NYCT_SIM5","SIM5","Eltingville - Lower Manhattan Express",
"MTA_NYCT_SIM6","SIM6","Eltingville - Midtown Manhattan Express",
"MTA_NYCT_SIM7","SIM7","Eltingville - Greenwich Village Express",
"MTA_NYCT_SIM8","SIM8","Huguenot - Midtown Manhattan Express",
"MTA_NYCT_SIM8X","SIM8X","S.I. Mall - Midtown Manhattan Express",
"MTA_NYCT_SIM9","SIM9","Eltingville - Greenwich Village Express",
"MTA_NYCT_X27","X27","Bay Ridge - Manhattan Express",
"MTA_NYCT_X28","X28","Sea Gate / Bensonhurst - Manhattan Express",
"MTA_NYCT_X37","X37","Bay Ridge - Midtown Manhattan Express",
"MTA_NYCT_X38","X38","Sea Gate / Bensonhurst - Midtown Manhattan Express",
"MTA_NYCT_X63","X63","Rosedale - Midtown Manhattan Express",
"MTA_NYCT_X64","X64","Cambria Heights - Midtown Manhattan Express",
"MTA_NYCT_X68","X68","Floral Park - Midtown Manhattan Express"
];

/*
let NJrouteIdMap = [
"1", "1",
"2", "10",
"3", "101",
"4", "102",
"5", "105",
"6", "107",
"7", "108",
"8", "109",
"9", "11",
"10", "111",
"11", "112",
"12", "113",
"13", "114",
"14", "115",
"15", "116",
"16", "117",
"17", "119",
"18", "120",
"19", "121",
"20", "122",
"21", "123",
"22", "124",
"23", "125",
"24", "126",
"25", "127",
"26", "128",
"27", "129",
"28", "13",
"29", "130",
"30", "131",
"31", "132",
"32", "133",
"33", "135",
"34", "136",
"35", "137",
"36", "138",
"37", "139",
"38", "14",
"39", "144",
"40", "145",
"41", "148",
"42", "151",
"43", "153",
"44", "154",
"45", "155",
"46", "156",
"47", "157",
"48", "158",
"49", "159",
"50", "160",
"51", "161",
"52", "162",
"53", "163",
"54", "163S",
"55", "164",
"56", "165",
"57", "166",
"58", "167",
"59", "168",
"60", "171",
"61", "175",
"62", "177",
"63", "178",
"64", "181",
"65", "182",
"66", "186",
"67", "188",
"68", "190",
"69", "191",
"70", "192",
"71", "193",
"72", "194",
"73", "195",
"74", "196",
"75", "197",
"76", "198",
"77", "199",
"78", "2",
"79", "21",
"80", "22",
"81", "23",
"82", "24",
"83", "25",
"84", "26",
"85", "27",
"86", "28",
"87", "29",
"88", "30",
"89", "31",
"90", "313",
"91", "315",
"92", "317",
"93", "319",
"94", "320",
"95", "321",
"96", "324",
"97", "329",
"98", "34",
"99", "34S",
"100", "355",
"101", "361",
"102", "37",
"103", "375",
"104", "378",
"105", "39",
"106", "40",
"107", "400",
"108", "401",
"109", "402",
"110", "403",
"111", "404",
"112", "405",
"113", "406",
"114", "407",
"115", "408",
"116", "409",
"117", "41",
"118", "410",
"119", "412",
"120", "413",
"121", "414",
"122", "417",
"123", "418",
"124", "419",
"125", "44",
"126", "450",
"127", "451",
"128", "452",
"129", "453",
"130", "455",
"131", "457",
"132", "459",
"133", "463",
"134", "468",
"135", "48",
"136", "5",
"137", "501",
"138", "502",
"139", "504",
"140", "505",
"141", "507",
"142", "508",
"143", "509",
"144", "510",
"145", "52",
"146", "551",
"147", "552",
"148", "553",
"149", "554",
"150", "555",
"151", "559",
"152", "56",
"153", "57",
"154", "58",
"155", "59",
"156", "6",
"157", "600",
"158", "601",
"159", "603",
"160", "605",
"161", "606",
"162", "607",
"163", "608",
"164", "609",
"165", "610",
"166", "611",
"167", "612",
"168", "613",
"169", "619",
"170", "62",
"171", "624",
"172", "63",
"173", "64",
"174", "65",
"175", "66",
"176", "67",
"177", "68",
"178", "70",
"179", "702",
"180", "703",
"181", "704",
"182", "705",
"183", "707",
"184", "709",
"185", "71",
"186", "712",
"187", "72",
"188", "722",
"189", "73",
"190", "74",
"191", "744",
"192", "746",
"193", "748",
"194", "751",
"195", "752",
"196", "753",
"197", "755",
"198", "756",
"199", "758",
"200", "76",
"201", "762",
"202", "770",
"203", "772",
"204", "78",
"205", "780",
"206", "79",
"207", "8",
"208", "80",
"209", "801",
"210", "802",
"211", "803",
"212", "804",
"213", "805",
"214", "81",
"215", "810",
"216", "811",
"217", "813",
"218", "814",
"219", "815",
"220", "817",
"221", "818",
"222", "819",
"223", "82",
"224", "822",
"225", "83",
"226", "830",
"227", "831",
"228", "832",
"229", "834",
"230", "836",
"231", "837",
"232", "838",
"233", "84",
"234", "85",
"235", "86",
"236", "87",
"237", "871",
"238", "872",
"239", "873",
"240", "874",
"241", "875",
"242", "878",
"243", "88",
"244", "880",
"245", "89",
"246", "890",
"247", "891",
"248", "9",
"249", "90",
"250", "92",
"251", "94",
"252", "96",
"253", "97",
"254", "986",
"255", "99",
"256", "AC1",
"257", "AC3",
"258", "AC4B",
"259", "GO25",
"260", "GO28"
];
*/

const WMATA_BusRouteMap = [
"A11","Huntington-Pentagon",
"A12","Ballston-Hunting Point",
"A1X","Pentagon City-Braddock Rd",
"A25","Brookville-S Fairlington",
"A27","Landmark-N Fairlington",
"A28","Landmark-Holmes Run",
"A40","Columbia Pike-National Landing",
"A49","Columbia Pike-Metro Center",
"A58","Wilson Blvd-Farragut Sq",
"A66","Culmore-Shirlington",
"A70","Glebe Rd",
"A71","Ballston-King St",
"A76","Carlin Springs Rd",
"A90","Mark Center-Pentagon",
"C11","L'enfant Plaza-National Harbor",
"C13","Anacostia-Eastover",
"C15","Potomac Avenue-Southern Avenue",
"C17","Anacostia-Eastover",
"C21","Anacostia-Minnesota Avenue",
"C23","Anacostia-Deanwood",
"C25","Anacostia-Skyland",
"C26","Anacostia-Skyland",
"C27","Bellevue-Naylor Road",
"C29","Anacostia-Southern Avenue",
"C31","Navy Yard-Capitol Heights",
"C33","River Terrace-Sheriff Road",
"C35","Deanwood-Naylor Road",
"C37","Potomac Avenue-Minnesota Avenue",
"C41","West Hyattsville-Anacostia",
"C43","Carver Terrace-Union Station",
"C51","Anacostia-Tenleytown",
"C53","Congress Heights-Duke Ellington",
"C55","Union Station-L'enfant Plaza",
"C57","U Street-Capitol Heights",
"C61","Tenleytown-Brookland/Cua",
"C63","Washington Hospital Ctr-Deanwood",
"C71","Fort Totten-Union Station",
"C75","Takoma-Petworth",
"C77","Fort Totten-Takoma",
"C81","Fort Totten-Sibley Hospital",
"C83","Barnaby Woods-Friendship Heights",
"C85","Chevy Chase - Foggy Bottom",
"C87","Silver Spring-Van Ness",
"C91","Georgetown-Ledroit Park",
"D10","Kennedy Center-Southern Avenue",
"D1X","National Archives-Naylor Road",
"D20","Farragut Square-Minnesota Avenue",
"D24","Mcpherson Square-Deanwood",
"D2X","Capitol Heights-Chinatown Ltd",
"D30","Fort Totten-Federal Triangle",
"D32","Chinatown-Fort Lincoln",
"D34","West Hyattsville-Metro Center",
"D36","Washington Hosp Ctr-Franklin Sq",
"D40","Silver Spring-National Archives",
"D44","Fort Totten-Federal Triangle",
"D4X","Silver Spring-National Archives",
"D50","14th St",
"D5X","Takoma-Metro Center",
"D60","Silver Spring-Franklin Square",
"D6X","Silver Spring-Federal Triangle",
"D70","Chevy Chase-Farragut Square",
"D72","Van Ness/Udc-Lafayette Square",
"D74","Potomac Park-Rhode Island Avenue",
"D80","Friendship Heights-Union Station",
"D82","Friendship Heights-Foggy Bottom",
"D90","Tenleytown-Mount Vernon Square",
"D94","Sibley Hospital-Chinatown",
"D96","Bethesda-Lincoln Memorial",
"F19","Mt Vernon-Interior Dept",
"F1X","Richmond Hwy Express",
"F20","Leesburg Pike",
"F23","Little River Tpk-George Mason",
"F24","Little River Tpk-Vienna",
"F26","Annandale-Seven Corners",
"F28","Kings Park West",
"F29","Braddock Rd",
"F44","Columbia Pike-Pentagon",
"F50","Washington Blvd",
"F60","Arlington Blvd-Fair Oaks",
"F61","Arlington Blvd-Fair Oaks",
"F62","Pershing Dr-Arlington Bl",
"F81","Burke Centre",
"F83","Cardinal Forest",
"F85","Little River Tpk-Pentagon",
"M12","University Blvd",
"M20","Georgia Av-Silver Spring",
"M22","Bethesda-Olney",
"M42","Randolph Rd-College Park",
"M44","Randolph Rd-Hyattsville Crossing",
"M52","Colesville Rd-Burtonsville",
"M54","Colesville Rd-Greencastle",
"M60","New Hampshire Av",
"M6X","New Hampshire Av Express",
"M70","East West Hwy-Old Georgetown",
"M82","River Rd-Falls Rd",
"P10","Baltimore Av",
"P12","Laurel-Greenbelt",
"P14","Kenilworth Av",
"P15","Riggs Rd-Adelphi",
"P16","Riggs Rd-White Oak",
"P1X","Baltimore Ave Express",
"P20","Greenbelt Rd-New Carrollton",
"P21","Greenbelt-New Carrollton",
"P24","Good Luck Rd",
"P30","New Carrollton-Silver Spring",
"P31","New Carrolton-Langley Park",
"P32","Greenbelt-Fort Totten",
"P33","Queens Chapel Rd",
"P35","New Carrollton-Fort Totten",
"P40","Annapolis Rd",
"P41","Landover Rd",
"P42","Chillum Rd-New Carrollton",
"P60","Mlk Hwy-Suitland",
"P61","Glenarden-Suitland",
"P62","Branch Av-Deanwood",
"P63","Central Av-Naylor Rd",
"P66","Forestville-Suitland",
"P72","Central Av-Bowie",
"P73","Central Av-Trade Zone Av",
"P87","Brinkley Rd",
"P90","St Barnabas Rd",
"P93","Suitland-Eastover",
"P94","Suitland-National Harbor",
"P96","Suitland-Oxon Hill",
"P97","Ft Washington"
];

let MSL_map = [
"MSLB19528","1  Gold",
"MSLB19529","2  Red",
"MSLB19530","4  Natural Bridge",
"MSLB19531","5  Green",
"MSLB19532","8  Shaw-Cherokee",
"MSLB19533","9  Oakville",
"MSLB19534","10  Gravois-Lindell",
"MSLB19535","11  Chippewa",
"MSLB19536","13  Union",
"MSLB19537","16  City Limits",
"MSLB19538","18  Taylor",
"MSLB19539","19  St Louis Ave",
"MSLB19540","21  Watson Rd",
"MSLB19541","30  Arsenal",
"MSLB19542","31  Chouteau",
"MSLB19543","32  Dr ML King",
"MSLB19544","33  Midland",
"MSLB19545","34  Earth City",
"MSLB19546","35  Rock Road",
"MSLB19547","40  Broadway-Halls Ferry",
"MSLB19548","41  Lee",
"MSLB19549","42  Sarah",
"MSLB19550","49  Lindbergh",
"MSLB19551","56  Kirkwood-Webster",
"MSLB19552","57  Manchester",
"MSLB19553","58  Chesterfield Valley",
"MSLB19554","59  Oakland",
"MSLB19555","60  Shepley-Lilac",
"MSLB19556","61  Chambers Rd",
"MSLB19557","64  Lucas-Hunt",
"MSLB19558","70  Grand",
"MSLB19559","73  Carondelet",
"MSLB19560","74  Florissant",
"MSLB19561","76  N Hanley Shuttle",
"MSLB19562","77  Village Square",
"MSLB19563","78  Bellefontaine",
"MSLB19564","79  Ferguson-Clayton",
"MSLB19565","90  Hampton",
"MSLB19566","91  Olive",
"MSLB19567","94  Page",
"MSLB19568","95  Kingshighway",
"MSLB19569","97  Delmar",
"MSLB19570","98  Ballas-North Hanley",
"MSLB19571","100  Hazelwood",
"MSLB19572","1  Main Street - State Street",
"MSLB19573","2  Cahokia Heights",
"MSLB19574","3  Sauget - Water Street",
"MSLB19575","4  19th & Central",
"MSLB19576","5  Missouri Ave - ML King",
"MSLB19577","6  Rosemont",
"MSLB19578","8  Alta Sita",
"MSLB19579","9  Washington Park",
"MSLB19580","12  OFallon-Fairview Heights",
"MSLB19581","13  Caseyville",
"MSLB19582","14  Memorial Hosp-Westfield Plaza",
"MSLB19583","15  Belleville-O'Fallon",
"MSLB19584","16  St. Clair Square",
"MSLB19585","23  Belleville-College",
"MSLB19592","1  Gold",
"MSLB19593","2  Red",
"MSLB19594","4  Natural Bridge",
"MSLB19595","5  Green",
"MSLB19596","8  Shaw-Cherokee",
"MSLB19597","9  Oakville",
"MSLB19598","10  Gravois-Lindell",
"MSLB19599","11  Chippewa",
"MSLB19600","13  Union",
"MSLB19601","16  City Limits",
"MSLB19602","18  Taylor",
"MSLB19603","19  St Louis Ave",
"MSLB19604","21  Watson Rd",
"MSLB19605","30  Arsenal",
"MSLB19606","31  Chouteau",
"MSLB19607","32  Dr ML King",
"MSLB19608","33  Midland",
"MSLB19609","34  Earth City",
"MSLB19610","35  Rock Road",
"MSLB19611","40  Broadway-Halls Ferry",
"MSLB19612","41  Lee",
"MSLB19613","42  Sarah",
"MSLB19614","49  Lindbergh",
"MSLB19615","56  Kirkwood-Webster",
"MSLB19616","57  Manchester",
"MSLB19617","58  Chesterfield Valley",
"MSLB19618","59  Oakland",
"MSLB19619","60  Shepley-Lilac",
"MSLB19620","61  Chambers Rd",
"MSLB19621","64  Lucas-Hunt",
"MSLB19622","70  Grand",
"MSLB19623","73  Carondelet",
"MSLB19624","74  Florissant",
"MSLB19625","76  N Hanley Shuttle",
"MSLB19626","77  Village Square",
"MSLB19627","78  Bellefontaine",
"MSLB19628","79  Ferguson-Clayton",
"MSLB19629","90  Hampton",
"MSLB19630","91  Olive",
"MSLB19631","94  Page",
"MSLB19632","95  Kingshighway",
"MSLB19633","97  Delmar",
"MSLB19634","98  Ballas-North Hanley",
"MSLB19635","100  Hazelwood",
"MSLB19636","1  Main Street - State Street",
"MSLB19637","2  Cahokia Heights",
"MSLB19638","3  Sauget - Water Street",
"MSLB19639","4  19th & Central",
"MSLB19640","5  Missouri Ave - ML King",
"MSLB19641","6  Rosemont",
"MSLB19642","8  Alta Sita",
"MSLB19643","9  Washington Park",
"MSLB19644","12  OFallon-Fairview Heights",
"MSLB19645","13  Caseyville",
"MSLB19646","14  Memorial Hosp-Westfield Plaza",
"MSLB19647","15  Belleville-O'Fallon",
"MSLB19648","16  St. Clair Square",
"MSLB19649","23  Belleville-College"
];




