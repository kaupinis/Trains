// eo_TrainsData4.js  
"use strict";

let ASTRIP = null;
let AddedRoutes = [];
let Tnyc = 0;
let GRB = null;
let require = null;
//let PKEY = "guest123";
let GKEY = "AIzaSyBbv8R7hvGZ3j4sQlIbL7Oa1Mf2SeDqN-c";
let xtid = "";
let bProc = false;
let AMRDFF = "";
let AMRTFF = "";
let NJStop = "";
let sSFMTA = "";

//let last_stop_id = "";
//let lastAlertsUpdate = 0;
/*
function Carrier1(name, shortid, builtin, url)
{
  
  this.name = name;
  this.id = shortid;
  this.service = null;
  this.builtin = builtin;
  this.loaded = false;
  this.url = url;
  this.routes = [];
  this.addCarrier = function(c) {
    Carriers.addCarrier(c);
  };
  */
 /*   
    let shortid = c.shortid;
    let k = Carriers.length;
    let i = 0;
    let b = false;
    while(!b && (i < k))
    {
      if(Carriers[i].shortid == shortid)
      {
         b = true;   
      }
      i += 1;
    }
    
    
    if(!b)
    {
      Carriers.push(c);   
    } 
  }); 
} */

function initCarriers()
{
Carriers.clear();
Carriers.push(new Carrier1("AMTRAK", "AMTRAK", true, null));
Carriers.push(new Carrier1("Peter Pan Bus", "PP", true, null));
Carriers.push(new Carrier1("Long Island Railroad", "LI", true, null));
Carriers.push(new Carrier1("WMATA", "WMATAB", true, null));
}

function isCarrierLoaded(id)
{
  /*  
  let b = false;
  let k = Carriers.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(Carriers[i].shortid == id) b = true;
    else i += 1;
  }
  return(b);
  */
  return(Carriers.isCarrierLoaded(id));
}


let cccc = null;
let bLCBusy = false;


function checkLoadable(stop_id)
{
//  let bProc = false;
//  report("78 checkLoadable " + stop_id + " " + bProc + " " + isCarrierLoaded("MSLB") + " " + bOnLine + " " + bNetFail);
//  report("80 " + isMNRStop(stop_id) + " " + isCarrierLoaded("WMB"));
  let p = null;
  
  if(!bOnLine || bNetFail) ;
  else if(isNaN(stop_id))
  {
  if(!bProc && ((stop_id == "BNT-0000") || (stop_id == "NEC-2287") || (stop_id.indexOf("T_") == 0)) && !isCarrierLoaded("MBTA")) {p = loadCarrier("MBTA"); bProc =   true;}
  else if(!bProc && (stop_id.indexOf("B_") == 0) && !isCarrierLoaded("BART")) {p = loadCarrier("BART"); bProc =   true;}
  else if(!bProc && (stop_id.indexOf("DT_") == 0) && !isCarrierLoaded("DART")) {p = loadCarrier("DART"); bProc =   true;}
  else if(!bProc && (stop_id.indexOf("LI") == 0) && !isCarrierLoaded("LI")) {p = loadCarrier("LI"); bProc = true;}
  else if(!bProc && (isMNRStop(stop_id))  && !isCarrierLoaded("MNR")) {p = loadCarrier("MNR"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("SEP_") == 0) && !isCarrierLoaded("SEPTA")) {p = loadCarrier("SEPTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("SMART") == 0) && !isCarrierLoaded("SMART")) {p = loadCarrier("SMART"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("ME_") == 0) && !isCarrierLoaded("ME")) {p = loadCarrier("ME"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("CAL") == 0) && !isCarrierLoaded("CAL")) {p = loadCarrier("CAL"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("CML") == 0) && !isCarrierLoaded("CML")) {p = loadCarrier("CML"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("CS2") == 0) && !isCarrierLoaded("NCTD")) {p = loadCarrier("NCTD"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("PATH") == 0) && !isCarrierLoaded("PH")) {p = loadCarrier("PH"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("RIPT") == 0) && !isCarrierLoaded("RIPTA")) {p = loadCarrier("RIPTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("LAM8") == 0) && !isCarrierLoaded("LAM")) {p = loadCarrier("LAM"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("SF_") == 0) && !isCarrierLoaded("SF")) {p = loadCarrier("SF"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("RTD_") == 0) && !isCarrierLoaded("RTD")) {p = loadCarrier("RTD"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("Z_") == 0) && !isCarrierLoaded("SBB")) {p = loadCarrier("SBB"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("MARC_") == 0) && !isCarrierLoaded("MARC")) {p = loadCarrier("MARC"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("VRE") == 0) && !isCarrierLoaded("VRE")) {p = loadCarrier("VRE"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("BL_") == 0) && !isCarrierLoaded("BL")) {p = loadCarrier("BL"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("SUN_") == 0) && !isCarrierLoaded("SUN")) {p = loadCarrier("SUN"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("WMA") == 0) && !isCarrierLoaded("WMA")) {p = loadCarrier("WMA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("WMB") == 0) && !isCarrierLoaded("WMB")) {p = loadCarrier("WMB"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("VTA_") == 0) && !isCarrierLoaded("VTA")) {p = loadCarrier("VTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("DCTA") == 0) && !isCarrierLoaded("DCTA")) {p = loadCarrier("DCTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("LR") == 0) && !isCarrierLoaded("LRTA")) {p = loadCarrier("LRTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("MV_") == 0) && !isCarrierLoaded("MEVA")) {p = loadCarrier("MEVA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("CC_") == 0) && !isCarrierLoaded("CCRTA")) {p = loadCarrier("CCRTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("MW") == 0) && !isCarrierLoaded("MWRTA")) {p = loadCarrier("MWRTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("TR") == 0) && !isCarrierLoaded("TRIRAIL")) {p = loadCarrier("TRIRAIL"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("PB") == 0) && !isCarrierLoaded("PB")) {p = loadCarrier("PB"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("BR") == 0) && !isCarrierLoaded("BR")) {p = loadCarrier("BR"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("SSL") == 0) && !isCarrierLoaded("SSL")) {p = loadCarrier("SSL"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("MDM") == 0) && !isCarrierLoaded("MDM")) {p = loadCarrier("MDM"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("MDC") == 0) && !isCarrierLoaded("MDC")) {p = loadCarrier("MDC"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("TM") == 0) && !isCarrierLoaded("TM")) {p = loadCarrier("TM"); bProc = true;}
//  else if(!bProc && (stop_id.indexOf("MSLB") == 0) && !isCarrierLoaded("MSLB")) {p = loadCarrier("MSLB"); bProc = true;}
//  else if(!bProc && (stop_id.indexOf("MSL") == 0) && !isCarrierLoaded("MSL")) {p = loadCarrier("MSL"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("UTA") == 0) && !isCarrierLoaded("UTA")) {p = loadCarrier("UTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("MARTA") == 0) && !isCarrierLoaded("MARTA")) {p = loadCarrier("MARTA"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("TXR") == 0) && !isCarrierLoaded("TEXRAIL")) {p = loadCarrier("TEXRAIL"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("NM") == 0) && !isCarrierLoaded("NM")) {p = loadCarrier("NM"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("NZ") == 0) && !isCarrierLoaded("NJBUS")) {p = loadCarrier("NJBUS"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("PS_") == 0) && !isCarrierLoaded("SOUND")) {p = loadCarrier("SOUND"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("STM_") == 0) && !isCarrierLoaded("STM")) {p = loadCarrier("STM"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("STMB_") == 0) && !isCarrierLoaded("STMB")) {p = loadCarrier("STMB"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("REM_") == 0) && !isCarrierLoaded("REM")) {p = loadCarrier("REM"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("EXO_") == 0) && !isCarrierLoaded("EXO")) {p = loadCarrier("EXO"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("TTC") == 0) && !isCarrierLoaded("TTC")) {p = loadCarrier("TTC"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("TN_") == 0) && !isCarrierLoaded("TN")) {p = loadCarrier("TN"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("DB_") == 0) && !isCarrierLoaded("DB")) {p = loadCarrier("DB"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("SNCF_") == 0) && !isCarrierLoaded("SNCF")) {p = loadCarrier("SNCF"); bProc = true;}
  else if(!bProc && (stop_id.indexOf("MTA") == 0) && !isCarrierLoaded("MTA"))
  {
      bProc = true;
      report(" load MTA Bus");
      let c = "MTA";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      p = new Promise(function(resolve, reject) {
              let p1 = loadScript(u + "eo_MTA_Stops.js").then(function() {
 //                stop_Categories.push(stops_MTABus);
                     let p3 = loadScript(u + "eo_MTA_Routes.js").then(function() {
                         let cccc = new Carrier1(c, c, false, "");
                         cccc.addCarrier(cccc);
                         report("  MTA Bus loaded");
                         qupdateDisplay();
                         resolve();
                     }).catch(function(e){report(e);});
             }).catch(function(e){report(e);});
      });
  }
  /*
  else if(!bProc && (stop_id.indexOf("NZ") == 0) && !isCarrierLoaded("NJBUS"))
  {
      bProc = true;
      report(" load NJBus");
      let c = "NJBUS";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      p = new Promise(function(resolve, reject) {
            if((typeof NJB_Cal !== 'undefined') && (typeof NJrouteIdMap !== 'undefined'))
            {
              let p1 = loadScript(u + "eo_NJBus_stops.js").then(function() {
                 stop_Categories.push(stops_NJbus);
                     let p3 = loadScript(u + "eo_NJBus_routes.js").then(function() {
                         let cccc = new Carrier1(c, c, false, "eo_NJBus_cal.js");
                         cccc.addCarrier(cccc);
                         checkLastModified("eo_NJBus_cal.js", "NJBus");
                         report("  NJBus loaded");
                         qupdateDisplay();
                         resolve();
                     }).catch(function(e){report(e);});
             }).catch(function(e){report(e);});
            }
            else
            {
              let p1 = loadScript(u + "eo_NJBus_stops.js").then(function() {
                 stop_Categories.push(stops_NJbus);
                 let p2 = loadScript(u + "eo_NJBus_cal.js").then(function() {
                     let p3 = loadScript(u + "eo_NJBus_routes.js").then(function() {
                         let cccc = new Carrier1(c, c, false, "eo_NJBus_cal.js");
                         cccc.addCarrier(cccc);
                         checkLastModified("eo_NJBus_cal.js", "NJBus");
                         report("  NJBus loaded");
                         qupdateDisplay();
                         resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
             }).catch(function(e){report(e);});
            }
      });
  }
  */
  else if(!bProc && (stop_id.indexOf("NJ") == 0) && !isCarrierLoaded("NJ")) {bProc = true; p = loadCarrier("NJ"); }
  else if(!bProc && (stop_id.indexOf("MSL") == 0))
  {
    if(!isCarrierLoaded("MSL"))
    {
      bProc = true;
      let u = "https://www.eightolives.com/docs/Trains/js/";
//      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      p = new Promise(function(resolve, reject) {
          let p1 = loadScript(u + "eo_MSL.js").then(function() {
               let cccc = new Carrier1("MSL", "MSL", false, "");
               cccc.addCarrier(cccc);
               checkLastModified("eo_MSL.js", "MSL");
               report("198 loaded carrier MSL");
//               report("215 MSL = " + JSON.stringify(MSL, null, 4));
               if((stop_id.indexOf("MSLB") == 0) && !isCarrierLoaded("MSLB"))
               {
                 let p2 = loadScript(u + "eo_MSLB.js").then(function() {
                     report("202 loaded carrier MSLB");
                     let cccc = new Carrier1("MSLB", "MSLB", false, "");
                     cccc.addCarrier(cccc);
                     checkLastModified("eo_MSLB.js", "MSLB");
                     qupdateDisplay();
                     resolve();
                 }).catch(function(e){report(e);});
               }
               else
               {
                 qupdateDisplay();
                 resolve();
               }
          }).catch(function(e){report(e);});
      });
    }
    else if((stop_id.indexOf("MSLB") == 0) && !isCarrierLoaded("MSLB"))
    {
      bProc = true;
      let u = "https://www.eightolives.com/docs/Trains/js/";
      p = new Promise(function(resolve, reject) {
        let p2 = loadScript(u + "eo_MSLB.js").then(function() {
          report("218 loaded carrier MSLB");
          let cccc = new Carrier1("MSLB", "MSLB", false, "");
          cccc.addCarrier(cccc);
          checkLastModified("eo_MSLB.js", "MSLB");
 //         report("221 MSLB");
          qupdateDisplay();
          resolve();
      }).catch(function(e){report(e);});
      });
    }
  }
  else if(!bProc && (stop_id.indexOf("TB_") == 0) && !isCarrierLoaded("MBTABUS"))
  {
      report(" load MBTABus");
      let c = "MBTABUS";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      bProc = true;
      p = new Promise(function(resolve, reject) {
             let p1 = loadScript(u + "eo_MBTA_BusStops9.js").then(function() {
                  report("MBTA Bus stops loaded");
                  bProc = false;
                  let MBTABUS =  new Carrier1(c, c, false, "");
                  MBTABUS.addCarrier(MBTABUS);
                  resolve();
//                  if(typeof MBTA_Cal === 'undefined') loadCarrier("MBTABUS").then(resolve());
//                  else resolve();
                                                                 /*
                 let p2 = loadScript(u + "eo_MBTA.js").then(function() {
                     report("MBTA loaded");
                     let p3 = loadScript(u + "eo_CTABus_routes.js").then(function() {
                         report("CTA Bus routes loaded");
                         let cccc = new Carrier1(c, c, false, "eo_CTABus_cal.js");
                         cccc.addCarrier(cccc);
                         report("  CTABus loaded");
                         qupdateDisplay();
                         resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
                 */
             }).catch(function(e){report(e); reject();});
      });
  }
  else if(!bProc && (stop_id.indexOf("CH") == 0) && !isCarrierLoaded("CTABUS"))
  {
      report(" load CTABus");
      let c = "CTABUS";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      bProc = true;
      p = new Promise(function(resolve, reject) {
             let p1 = loadScript(u + "eo_CTABusStops.js").then(function() {
                  report("CTA Bus stops loaded");
                 let p2 = loadScript(u + "eo_CTABus_cal.js").then(function() {
                     report("CTABus_cal loaded");
                     let p3 = loadScript(u + "eo_CTABus_routes.js").then(function() {
                         report("CTA Bus routes loaded");
                         let cccc = new Carrier1(c, c, false, "eo_CTABus_cal.js");
                         cccc.addCarrier(cccc);
                         report("  CTABus loaded");
                         qupdateDisplay();
                         resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
             }).catch(function(e){report(e);});
      });
  }
  else if(!bProc && (stop_id.indexOf("SFB_") == 0) && !isCarrierLoaded("SFBUS"))
  {
     report(" load SFBus");
      let c = "SFBUS";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      bProc = true;
      p = new Promise(function(resolve, reject) {
             if((typeof SF_cal !== 'undefined') && (typeof SFMTARouteMapMap !== 'undefined'))
             {
             let p1 = loadScript(u + "eo_SFMTA2BusStops.js").then(function() {
                 stop_Categories.push(stops_SFMTA2Bus);
                 let p3 = loadScript(u + "eo_SFMTA2BusRoutes.js").then(function() {
                     let cccc = new Carrier1(c, c, false, "");
                     cccc.addCarrier(cccc);
                     report("  SFMTABus loaded 1");
                     qupdateDisplay();
                     resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
             }
             else
             {
               let p0 = loadScript(u + "eo_SFMTA_cal.js").then(function() {
                 let p1 = loadScript(u + "eo_SFMTA2BusStops.js").then(function() {
                   stop_Categories.push(stops_SFMTA2Bus);
                   let p3 = loadScript(u + "eo_SFMTA2BusRoutes.js").then(function() {
                     let cccc = new Carrier1(c, c, false, "");
                     cccc.addCarrier(cccc);
                     report("  SFMTABus loaded 2");
                     qupdateDisplay();
                     resolve();
                     }).catch(function(e){report(e);});
                   }).catch(function(e){report(e);});
               }).catch(function(e){report(e);});
             }
             });
  }
  else if(!bProc && (stop_id.indexOf("LAMB") == 0) && !isCarrierLoaded("LABUS"))
  {
      report(" load LABus");
      let c = "LABUS";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      bProc = true;
      p = new Promise(function(resolve, reject) {
             if(typeof LAMB_Cal !== 'undefined')
             {
             let p1 = loadScript(u + "eo_LABusStops.js").then(function() {
                 stop_Categories.push(stops_LABus);
                 let p3 = loadScript(u + "eo_LAMetroBusRoutes.js").then(function() {
                     let cccc = new Carrier1(c, c, false, "");
                     cccc.addCarrier(cccc);
                     report("  LABus loaded");
                     qupdateDisplay();
                     resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
             }
             else
             {
               let p0 = loadScript(u + "eo_LAMB_cal.js").then(function() {
                 let p1 = loadScript(u + "eo_LABusStops.js").then(function() {
                  stop_Categories.push(stops_LABus);
                  let p3 = loadScript(u + "eo_LAMetroBusRoutes.js").then(function() {
                     let cccc = new Carrier1(c, c, false, "");
                     cccc.addCarrier(cccc);
                     report("  LABus loaded");
                     checkLastModified("eo_LAMB_cal.js", "LAMB");
                     qupdateDisplay();
                     resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
               }).catch(function(e){report(e);});
             }
             });
  }
  else if(!bProc && (stop_id.indexOf("PS_") == 0) && !isCarrierLoaded("SOUND"))
  {
      report(" load SOUND");
      let c = "SOUND";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      bProc = true;
      p = new Promise(function(resolve, reject) {
             let p1 = loadScript(u + "eo_Sound.js").then(function() {
                   report("Puget Sound loaded");
                   let cccc = new Carrier1(c, c, false, "");
                   cccc.addCarrier(cccc);
                   checkLastModified("eo_Sound.js", "Sound");
                   qupdateDisplay();
                   resolve();
                   }).catch(function(e){report(e);});
      });
  }  
  /*
  else if(!bProc && (stop_id.indexOf("RIPT") == 0) && !isCarrierLoaded("RIPT"))
  {
      bProc = true;
      report(" load RIPTA");
      let c = "RIPT";
      let cccc = new Carrier1(c, c, false, "eo_RIPTA_cal.js");
      cccc.addCarrier(cccc);
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      p = new Promise(function(resolve, reject) {
             let p1 = loadScript(u + "eo_RIPTA_stops.js").then(function() {
                 let p2 = loadScript(u + "eo_RIPTA_cal.js").then(function() {
                     let p3 = loadScript(u + "eo_RIPTA_routes.js").then(function() {
 //                        let cccc = new Carrier1(c, c, false, "eo_RIPTA_cal.js");
 //                        cccc.addCarrier(cccc);
                         report("  RIPTA loaded");
                         qupdateDisplay();
                         resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
             }).catch(function(e){report(e);});
      });
  }
  */
  else if(!bProc && (stop_id.indexOf("PV") == 0) && !isCarrierLoaded("PVRTA"))
  {
      report(" load PVRTA");
      let c = "PVRTA";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      bProc = true;
      p = new Promise(function(resolve, reject) {
             let p1 = loadScript(u + "eo_PVRTA_stops.js").then(function() {
                 stop_Categories.push(stops_PVRTA);
                 let p2 = loadScript(u + "eo_PVRTA_cal.js").then(function() {
                     let p3 = loadScript(u + "eo_PVRTA_routes.js").then(function() {
                         let cccc = new Carrier1(c, c, false, "eo_PVRTA_cal.js");
                         cccc.addCarrier(cccc);
                         report("  PVRTA loaded");
                         qupdateDisplay();
                         resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
             }).catch(function(e){report(e);});
      });
  }
  /*
  else if(!bProc && (stop_id.indexOf("DT_") == 0) && !isCarrierLoaded("DART"))
  {
      report(" load DART");
      let c = "DART";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      bProc = true;
      p = new Promise(function(resolve, reject) {
             let p1 = loadScript(u + "eo_DART.js").then(function() {
                   report("DART loaded");
                   let cccc = new Carrier1(c, c, false, "");
                   cccc.addCarrier(cccc);
                   checkLastModified("eo_DART.js", "DART");
                   qupdateDisplay();
                   resolve();
                   }).catch(function(e){report(e);});
      });
  }  
  */
/*  else if(!bProc && (stop_id.indexOf("MTA") == 0) && !isCarrierLoaded("MTABUS"))
  {
      report(" load MTABus");
      let c = "MTABUS";
      let u = "https://www.eightolives.com/docs/Trains/js/";
      if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/";
      bProc = true;
      p = new Promise(function(resolve, reject) {
             let p1 = loadScript(u + "eo_MTABusStops.js").then(function() {
 //                stop_Categories.push(stops_PVRTA);
                 report("MTA Bus stops loaded");
                 let p2 = loadScript(u + "eo_MTABus_cal.js").then(function() {
                     report("MTABus_cal loaded");
                     let p3 = loadScript(u + "eo_CTABus_routes.js").then(function() {
                         report("MTA Bus routes loaded");
                         let cccc = new Carrier1(c, c, false, "eo_MTABus_cal.js");
                         cccc.addCarrier(cccc);
                         report("  MTABus loaded");
                         qupdateDisplay();
                         resolve();
                     }).catch(function(e){report(e);});
                 }).catch(function(e){report(e);});
             }).catch(function(e){report(e);});
      });
  } */
  }
  else
  {
      /*
    if(!isCarrierLoaded("MVRTA"))
    {
      if(stopidIsInArray(stop_id, stops_mvrta)) {p = loadCarrier("MVRTA"); bProc = true;}
    }
    */
    /*
    if(!bProc && !isCarrierLoaded("LRTA"))
    {
      if(stopidIsInArray(stop_id, stops_lrta)) {p = loadCarrier("LRTA"); bProc = true;}
    }
    */
    if(!bProc && !isCarrierLoaded("HL"))
    {
      if(stopidIsInArray(stop_id, stops_HL)) {p = loadCarrier("HL"); bProc = true;}
    }
    if(!bProc && !isCarrierLoaded("CATA"))
    {
      if(stopidIsInArray(stop_id, stops_capeann)) {p = loadCarrier("CATA"); bProc = true;}
    }

  }
  return(p);
}

let LCB = "";

function loadCarrier(c)
{
//  report("432 loadCarrier " + c + " busy = " + bLCBusy + ", already loaded = " + isCarrierLoaded(c));
  let cccc = null;
//  CloseMenu();
  let pm = new Promise(function(resolve, reject) {
//  if(bOnLine && !bLCBusy && !isCarrierLoaded(c))
  if(!bLCBusy && !isCarrierLoaded(c))
  {
    bLCBusy = true;
    LCB = c;
    cccc = null;
    if(c == "MBTA") cccc = new Carrier1(c, c, false, "eo_MBTA.js");
    else if(c == "MVRTA") cccc = new Carrier1(c, c, false, "eo_MeVa.js");
    else if(c == "MEVA") cccc = new Carrier1(c, c, false, "eo_MeVa.js");
    else if(c == "LRTA") cccc = new Carrier1(c, c, false, "eo_LRTA.js");
    else if(c == "MWRTA") cccc = new Carrier1(c, c, false, "eo_MWRTA.js");
    else if(c == "HL") cccc = new Carrier1(c, c, false, "eo_HL.js");
    else if(c == "NJ") cccc = new Carrier1(c, c, false, "eo_NJ1.js");
    else if(c == "PH") cccc = new Carrier1(c, c, false, "eo_PATH.js");
//    else if(c == "LI") cccc = new Carrier1(c, c, false, "eo_LIRR.js");
    else if(c == "MNR") cccc = new Carrier1(c, c, false, "eo_MNR.js");
//    else if(c == "MNR") cccc = new Carrier1(c, c, false, "");
    else if(c == "CATA") cccc = new Carrier1(c, c, false, "eo_CATA.js");
//    else if(c == "AMT") cccc = new Carrier1(c, c, false, "eo_AM_trips2.js");
    else if(c == "NCTD") cccc = new Carrier1(c, c, false, "eo_NCTD.js");
    else if(c == "CML") cccc = new Carrier1(c, c, false, "eo_Metrolink.js");
    else if(c == "CAL") cccc = new Carrier1(c, c, false, "eo_Caltrain.js");
    else if(c == "ME") cccc = new Carrier1(c, c, false, "eo_Metra.js");
    else if(c == "BART") cccc = new Carrier1(c, c, false, "eo_BART.js");
    else if(c == "DART") cccc = new Carrier1(c, c, false, "eo_DART.js");
    else if(c == "SEPTA") cccc = new Carrier1(c, c, false, "eo_SEPTA.js");
    else if(c == "SMART") cccc = new Carrier1(c, c, false, "eo_SMART.js");
    else if(c == "RIPTA") cccc = new Carrier1(c, c, false, "eo_RIPTA.js");
    else if(c == "RTD") cccc = new Carrier1(c, c, false, "eo_RTD.js");
    else if(c == "SF") cccc = new Carrier1(c, c, false, "eo_SFMTA2.js");
    else if(c == "SBB") cccc = new Carrier1(c, c, false, "eo_SBB.js");
    else if(c == "MARC") cccc = new Carrier1(c, c, false, "eo_MARC.js");
    else if(c == "VRE") cccc = new Carrier1(c, c, false, "eo_VRE.js");
    else if(c == "WMA") cccc = new Carrier1(c, c, false, "eo_WMATA.js");
    else if(c == "WMB") cccc = new Carrier1(c, c, false, "eo_WMB.js");
    else if(c == "UTA") cccc = new Carrier1(c, c, false, "eo_UTA.js");
    else if(c == "NM") cccc = new Carrier1(c, c, false, "eo_NM.js");
    else if(c == "LAM") cccc = new Carrier1(c, c, false, "eo_LAMetro.js");
    else if(c == "SUN") cccc = new Carrier1(c, c, false, "eo_SunRail.js");
    else if(c == "VTA") cccc = new Carrier1(c, c, false, "eo_VTA.js");
    else if(c == "DCTA") cccc = new Carrier1(c, c, false, "eo_DCTA.js");
    else if(c == "PB") cccc = new Carrier1(c, c, false, "eo_PB.js");
    else if(c == "BR") cccc = new Carrier1(c, c, false, "eo_BRTA.js");
    else if(c == "BL") cccc = new Carrier1(c, c, false, "eo_BL.js");
    else if(c == "SSL") cccc = new Carrier1(c, c, false, "eo_SSL.js");
    else if(c == "NJBUS") cccc = new Carrier1(c, c, false, "eo_NJBus.js");
    else if(c == "MDM") cccc = new Carrier1(c, c, false, "eo_MDM.js");
    else if(c == "TM") cccc = new Carrier1(c, c, false, "eo_TriMet.js");
    else if(c == "MSL") cccc = new Carrier1(c, c, false, "eo_MSL.js");
    else if(c == "MDC") cccc = new Carrier1(c, c, false, "eo_MDC.js");
    else if(c == "MSLB") cccc = new Carrier1(c, c, false, "eo_MSLB.js");
    else if(c == "MARTA") cccc = new Carrier1(c, c, false, "eo_MARTA.js");
    else if(c == "TRIRAIL") cccc = new Carrier1(c, c, false, "eo_TR.js");
    else if(c == "TEXRAIL") cccc = new Carrier1(c, c, false, "eo_TEXRAIL.js");
    else if(c == "SOUND") cccc = new Carrier1(c, c, false, "eo_Sound.js");
    else if(c == "STM") cccc = new Carrier1(c, c, false, "eo_STM.js");
    else if(c == "STMB") cccc = new Carrier1(c, c, false, "eo_STMB.js");
    else if(c == "REM") cccc = new Carrier1(c, c, false, "eo_REM.js");
    else if(c == "EXO") cccc = new Carrier1(c, c, false, "eo_EXO.js");
    else if(c == "TTC") cccc = new Carrier1(c, c, false, "eo_TTC.js");
    else if(c == "TN") cccc = new Carrier1(c, c, false, "eo_Trenord.js");
    else if(c == "DB") cccc = new Carrier1(c, c, false, "eo_DB.js");
    else if(c == "CCRTA") cccc = new Carrier1(c, c, false, "eo_CCRTA.js");
    else if(c == "SNCF") cccc = new Carrier1(c, c, false, "eo_SNCF.js");
    
    if(cccc == null) report("613 cccc null for " + c);
    else
    {
    let u = "https://www.eightolives.com/docs/Trains/js/" + cccc.url;
    if(eo_base.indexOf("http") != -1) u = eo_base + "Trains/js/" + cccc.url;
    if(bAltssl) u = EURL + "/docs/Trains/js/" + cccc.url;
    
    if(!bOnLine)
    {
      pIsInSystemCache(u).then(function() {
      if(cccc.url != "")
      {
        let p = loadScript(u);
        p.then(function(b){
          if(b) 
          {
            bLCBusy = false;
            if(cccc != null) cccc.addCarrier(cccc);
            bProc = false;
            console.log("480 loaded carrier " + cccc.name);
//            report("480 loaded carrier " + cccc.name);
            resolve();
          }
          else report("loadCarrier failed 133 " + u);
          }).catch(function(error){
 //          report("loadCarrier failed for " + u + " " + error);
             bLCBusy = false;
             bProc = false;
             bNetFail = true;
             bOnLine = false;
             reject("loadCarrier failed for " + u + " " + error);
          });
      }
      }).catch(function(e) {
          reject();
      });
    }
    else
    {
      if(cccc.url != "")
      {
 //       console.log("615 " + cccc.url + " u = " + u + " " +  bLCBusy + " " + bProc + " " + isCarrierLoaded(c) + " " + c);
        let p = loadScript(u);
        p.then(function(b){
          if(b) 
          {
            bLCBusy = false;
            if(cccc != null) cccc.addCarrier(cccc);
            bProc = false;
            console.log("522 loaded carrier " + cccc.name);
//            report("522 loaded carrier " + cccc.name + " " + u);
            getLastModified(cccc.url).then(function(lmd) {
                addLMD(lmd, cccc.name);
                showLMD();
            }).catch(function(e) {
                report("649 " + e);
            });
            resolve();
          }
          else report("loadCarrier failed 133 " + u);
          }).catch(function(error){
 //          report("loadCarrier failed for " + u + " " + error);
             bLCBusy = false;
             bProc = false;
             bNetFail = true;
             bOnLine = false;
             reject("loadCarrier failed for " + u + " " + error);
          } );
    if(!bOnLine) 
    {
      bLCBusy = false;  
    }
    }
    else
    {
      bLCBusy = false;
      if(cccc != null) cccc.addCarrier(cccc);
      bProc = false;
      resolve();
        
    }
    }  
  }
  }
  else if(bLCBusy) reject("547 loadCarrier busy for " + c + " doing " + LCB);
  else if(isCarrierLoaded(c)) 
  {
      LCB = "";
      resolve(); //reject("551 loadCarrier already loaded");
  }
  else reject("552 loadCarrier fail " + c);
  });
  return(pm);
}

function loadScript(url)
{
  return(new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = url;
      script.addEventListener('load', function() {
          resolve(true);
          });
      script.addEventListener('error', function(e) {
          reject(e);
          });
      document.head.appendChild(script);
  }));
}



function getInfoA(stopid)
{
  let s = getInfo(stopid);
  if(s != "") alert(s);
}

function getInfo(stopid)
{
  let s = "";
  /*
  if((stopid == "Portland-Dock-ME") || (stopid == "Portland-ME")) s = "Portland's local bus 1 links the train station (PTC) to Monument Square downtown. Local bus 8 links Monument Square to Casco Bay Lines dock and Ocean Gateway dock (Portland-Dock)."
      */
  if(stopid == "Bar-Harbor-ME") s = "Bar Harbor has a shuttle (Down East) to Bangor ME bus station (Concord Coach) and airport (Greyhound) which operates Monday through Friday.";
  else if((stopid == "Portland-ME (GH)") || (stopid == "Portland-ME")) s = "Greater Portland Metro bus 1 connects the Portland-ME stop to the Portland-ME (GH) stop."
  else if((stopid == "2328723") ||(stopid == "Albany-Rensselaer-NY")) s = "The train and bus stations are on opposite sides of the Hudson River. Take Capital District local bus to get between stations. <a href='javascript:selectFromMap()' style='color:blue'>See map.</a>";
  else if(stopid == "AMSMIA") s = "The nearest Tri-Rail and MetroRail transfer stop is about 4 blocks away.";
  else if(stopid == "AMSATL") s = "Bus 110 links AMTRAK Peachtree Station to MARTA's Art Center Station";
  else if(stopid == "MARTA111") s = "Bus 110 links AMTRAK Peachtree Station to MARTA's Art Center Station";
  else if(stopid == "MARTA112") s = "Bus 110 links AMTRAK Peachtree Station to MARTA's Art Center Station";
  else if(stopid == "MARTA68900") s = "Bus 110 links AMTRAK Peachtree Station to MARTA's Art Center Station";
  return(s);
}

function isHoliday(month, day)
{
//  report("month = " + month + " day = " + day);
  let b = false;
  if((month == 11) && (day == 25)) b = true; // Jan is 0
  if((month == 0) && (day == 1)) b = true; // Jan is 0
  return(b);
}

function getPBTime(o)
{
  let ctime = 0;
  if(typeof o !== 'undefined')
  {
    ctime = o.low;
    if(typeof ctime === 'undefined') ctime = o;
  }
//  else console.trace();
  return(ctime);
}

function addRouteToService(troute)
{
  AddedRoutes.push(troute);
  if((typeof serviceE !== 'undefined') && (serviceE != null) && (serviceE.routes != null))
  {
      serviceE.routes.push(troute);
  }
//  addRouteToCarrier(troute);
//  else report("addRouteToService failed for " + troute.route_id);
}

function AssociateService()
{
  this.cname = "AssociateService";
  this.routes = [];
//  this.routes[this.routes.length] = MN7;
  this.getRoute = function(route_id){
    let r = null;
    let b = true;
    let k = this.routes.length;
    let i = 0;
    while(b && (i < k))
    {
      if(route_id == this.routes[i].route_id)
      {
        b = false;
        r = this.routes[i];
      }
      i += 1;
    }
    return(r);
  };
}

AssociateService.prototype.reportService = function()
{
  let s = "Associate Service Report\n\n";
  
//  s += "The following schedules are manually maintained:\n\n";
  let k = this.routes.length
  let i = 0;
  while(i < k)
  {
    let r = this.routes[i];
    s += r.route_id + " " + r.common_name + "\n";
    if(r.eff !== undefined)
    {
      s += " effective " + r.eff + "\n";   
    }
    if((typeof r.cal !== 'undefined') && (r.cal != null))
    {
    if(r.cal.lastUpdated !== undefined)
    {
      s += " last updated " + r.cal.lastUpdated + "\n";   
    }
    if(r.cal.feedInfo !== undefined)
    {
      s += " feedInfo " + r.cal.feedInfo + "\n";   
    }
    let kkk = r.cal.calservices.length;
    let ii = 0;
    let ms = 0;
    for(ii = 0; ii < kkk; ii++)
    {
      if(r.cal.calservices[ii].end_date > ms) ms = r.cal.calservices[ii].end_date;  
    }
    s += " calendar end date = " + ms + "\n";
    }
    let kk = r.trips.length;
    s += "  " + kk + " trips\n";
    /*
    let ii = 0;
    while(ii < kk)
    {
      let t = r.trips[ii];
      s += "   " + t.trip_id + " to " + t.headsign + " " + t.days + "\n";
      ii += 1;
    }
    */
    s += "\n";
    i += 1;
  }
  return(s);
}

AssociateService.prototype.routeHasTrips = function(routeid)
{
  let k = this.routes.length;
  let i = 0;
  let b = true;
  let bk = false;
  while(b && (i<k))
  {
    let r =  this.routes[i];
    if(r.route_id == routeid)
    {
      if(r.trips.length > 0) bk = true;
      b = false;
    }
  }
  return(bk);
}


let alaststop = null;
let alasttime = null;

AssociateService.prototype.getAlertsByStop = function(stopid, routes, tripid)
{
// report("748 AS.getAlertsByStop " + stopid + " " + routes + " " + tripid + " " + routes.indexOf("LIRR") + " " + (routes.indexOf("LAML") != -1));
  let p = null;
  let p1 = null;

  if((routes.indexOf("NJR") != -1) || (routes.indexOf(",Y") != -1) || (routes.indexOf("Y") == 0))
  {
     p1 = getNJAlerts(routes);
  }
  else if((routes.indexOf("MN") != -1) || (routes.indexOf("LIRR") != -1) || (routes.indexOf("NY") != -1))
  {
     p1 = getMTAalerts(stopid, routes, tripid);
  }  
  else if(stopid.indexOf("SEP_") == 0)
  {
     p1 = getSEPTAalerts(stopid, routes, tripid);
  }
  else if(stopid.indexOf("B_") == 0)
  {
     p1 = getBARTalerts(stopid, routes, tripid);
  }
  else if(routes.indexOf("ME_") != -1)
  {
     p1 = getMetraAlerts(stopid, routes, tripid);
  }
  else if(routes.indexOf("LAML") != -1)
  {
     p1 = getMetrolinkAlerts(stopid, routes, tripid);
  }
  else if(routes.indexOf("MSL") != -1)
  {
     p1 = getMSLalerts(stopid, routes, tripid);
  }
  
  p = Weather.getWXalertsByStop(stopid);
  if(p != null) p.then(function() {}).catch(function(e){
//      report("770 " + stopid);
      });
  
  return(p1);
}

AssociateService.prototype.getRouteS = function(rs)
{
  let k = this.routes.length;
  let i = 0;
  let b = false;
  let z = null;
  let bMSL = false;
  if(rs != null)
  {
  let r = rs;
  let j = r.indexOf(":");
  if(j != -1) r = r.substring(0,j);
  if(r.indexOf("MSL") == 0)
  {
    bMSL = true;
    
  }
  while(!b && (i < k))
  {
    if((bMSL) && (typeof this.routes[i].ref !== 'undefined'))
    {
//      report("930 r = " + r + ", ref = "+ this.routes[i].ref +", route_id = " + this.routes[i].route_id);
      if((this.routes[i].ref == r) || (this.routes[i].route_id == r))
      {
//        b = true;
        z = this.routes[i];  
      }
//      report("944 " + b + " " + r + " " + z);
    }
    else if(this.routes[i].route_id == r)
    {
      b = true;
      z = this.routes[i];
    }
    i += 1;
  }
  }
//  if(z == null) report("679 getRouteS null for " + rs);
  return(z);
}

AssociateService.prototype.isAssociateTrip = function(trip_id)
{
  let k = this.routes.length;
  let i = 0;
  let b = false;
  let z = null;
  ASTRIP = null;
  if(trip_id.indexOf("NYC") == 0) b = true;
  else if(trip_id.indexOf("LI") == 0) b = true;
  else if(trip_id.indexOf("MN") == 0) b = true;
  else if(trip_id.indexOf("AMR") == 0) b = true;
  else if(trip_id.indexOf("CTA") == 0) b = true;
  else if(trip_id.indexOf("SSL") == 0) b = true;
  else if(trip_id.indexOf("SFF") == 0) b = true;
  else if(trip_id.indexOf("Z_") == 0) b = true;
  else if(trip_id.indexOf("B_") == 0) b = true;
  else if(trip_id.indexOf("DT_") == 0) b = true;
  else if(trip_id.indexOf("LAM") == 0) b = true;
  else if(trip_id.indexOf("MARC_") == 0) b = true;
  else if(trip_id.indexOf("CML") == 0) b = true;
  else if(trip_id.indexOf("DCTA") == 0) b = true;
  else if(trip_id.indexOf("MTA") == 0) b = true;
  else if(trip_id.indexOf("ACE") == 0) b = true;
  else if(trip_id.indexOf("MDM") == 0) b = true;
  else if(trip_id.indexOf("WMA") == 0) b = true;
  else if(trip_id.indexOf("TR") == 0) b = true;
//  else if(trip_id.indexOf("NJB") == 0) b = true;
  while(!b && (i < k))
  {
    let r = this.routes[i];
    let kk = r.trips.length;
    let ii = 0;
    while(!b && (ii < kk))
    {
      let tr = r.trips[ii];
      if(trip_id == tr.trip_id) 
      {
          b = true;
          ASTRIP = tr;
      }
      ii += 1;
    }
    i += 1;
  }
  if(trip_id.indexOf("NJB") == 0) b = true;
  return(b);
}

AssociateService.prototype.isAssociateRoute = function(route_id)
{
  let k = this.routes.length;
  let i = 0;
  let b = false;
  let z = null;
  ASTRIP = null;
  while(!b && (i < k))
  {
    let r = this.routes[i];
    if(r.route_id == route_id) b = true;
    i += 1;
  }
  if(route_id.indexOf("CTA") != -1) b = true;
  if(route_id.indexOf("LAM") == 0) b = true;
  if(route_id.indexOf("SFF") == 0) b = true;
  if(route_id.indexOf("RIPT") == 0) b = true;
  if(route_id.indexOf("BSCC") == 0) b = true;
  if(route_id.indexOf("ST") == 0) b = true;
  if(route_id.indexOf("MARC_") == 0) b = true;
  if(route_id.indexOf("TM") == 0) b = true;
  return(b);
}

function getCDateFromDate(dt)
{
//  let day = dt.getDay().toString();
  let d = Math.floor(dt.getTime() / 1000);
  let ddm = (dt.getMonth() + 1);
  ddm = ddm.toString();
  if(ddm.length == 1) ddm = "0" + ddm;
  let ddn = dt.getDate().toString();
  if(ddn.length == 1) ddn = "0" + ddn;
  let ddf = dt.getFullYear().toString() + ddm + ddn;
  ddf = Number(ddf);
  return(ddf);
}

function isMultidayTrip(trip)
{
  let b = false;
  if(trip != null)
  {
  if((typeof trip.multiday != 'undefined') && (trip.multiday == true)) b = true;
  if(!b)
  {
    if((typeof trip.parent !== 'undefined') && (trip.parent != null))
    {
      if((typeof trip.parent.multiday !== 'undefined') && ( trip.parent.multiday == true)) b = true;
    }
    else if(typeof trip.parent_id !== 'undefined')
    {
       let r = serviceE.getRouteS(trip.parent_id);
       if((r != null) && (typeof r.multiday !== 'undefined') && (r.multiday == true)) b = true;
    }
  }
  }
  else report("904 trip is null");
  return(b);
}

function isDateOK2(route, trip, cdate1)
{
  let cdate = cdate1.toString();  
  let bx = false; 
  let bLI = false;
//  if(route.route_id.indexOf("TN_") == 0) bx = true;
//  if(trip.trip_id.indexOf("_Day_") != -1) bx = true;
//  if(bx) report("872 isDateOK2 " + trip.trip_id + " " + cdate + " " + route.route_id);
  let dateOK = false;
  let cd = Number(cdate);
  /*
  let tsd = trip.serv_date;
  if((typeof tsd !== 'undefined') && (tsd != null) && (tsd != ""))
  {
    if(cdate == Number(tsd)) dateOK = true;
  }
  else
      */
  {
  let tc = trip.cal;
  if((tc == null) && (trip.parent != null) && (trip.parent.cal != null))
  {
    tc = trip.parent.cal;  
  }
  if((tc == null) && (route != null)) tc = route.cal;
  
  let tsid = trip.service_id;
  if((tsid == null) && (typeof trip.service_ids !== 'undefined') && (trip.service_ids != null))
  {
    tsid = trip.service_ids[0]; 
  }
//  if(bx) report("903 isDateOK2 " + trip.trip_id + " " + cdate +" " + tc + " " + tsid);
  if((tc != null) && (tsid != null)) // if trip has a TCalendar and service_id
  {
    let scal = tc.getService(tsid);
//    if(scal == null) report("907 scal null");
    if((scal != null) && (scal.adds != ""))  // if adds are explicit
//    if((scal != null) && (scal.adds != "") && (scal.days == ""))  // if adds are explicit
    {
      if(scal.start_date == "0") bLI = true; // lirr
      if(scal.days == "") bLI = true; // mnr
      if(bx) report("895 case 1 explicit adds " + scal.days + " bLI = " + bLI + " " + cdate);
      if(scal.adds.toString().indexOf(cdate) != -1)
      {
         dateOK = true;   
      }
    }
    if(!dateOK && !bLI && (scal != null) && (scal.days != "") && (cd >= Number(scal.start_date)) && (cd <= Number(scal.end_date)))
    {
      if(bx) report("707 case 2 date in range for " + tsid);
      dateOK = true;
      if(scal.days != "")
      {
        let mn = Number(cdate.substring(4,6)) - 1;
        if(mn == -1) mn = 11;
        let nd = new Date(cdate.substring(0,4), mn, cdate.substring(6));
        let tday = nd.getDay().toString();
        if(scal.days.indexOf(tday) != -1)
        {
          dateOK = true;   
        }
        else
        {
          dateOK = false;   
        }
//        report("919 "+ scal.days + " " + tday + " " + dateOK); 
      }
      if(scal.dels != "")
      {
        if(scal.dels.indexOf(cdate) != -1) 
        {
            dateOK = false;
 //           report("926 " + scal.dels + ":: "+ cdate);
        }
      }
      if((typeof trip.start_date !== 'undefined') && (typeof trip.end_date !== 'undefined'))
      {
        if((cd < Number(trip.start_date)) || (cd > Number(trip.end_date))) 
        {
          dateOK = false;
//          report("732 isDateOK false. start_date = " + trip.start_date + " end_date = " + trip.end_date);
        }
      }
//      report("727 " + trip.trip_id + " " + tsid + " " +  scal.start_date + " " + scal.end_date + " " + scal.days + " " + dateOK + " " + cd);
    }
  }
  else
  {
    if((typeof trip.start_date !== 'undefined') && (typeof trip.end_date !== 'undefined'))
    {
      if(bx) report("case 3 range in trip");
      if((cd >= Number(trip.start_date)) && (cd <= Number(trip.end_date)))
      {
         if(trip.days == "") dateOK = true;
         else
         {
           let mn = Number(cdate.substring(4,6)) - 1;
           if(mn == -1) mn = 11;
           let nd = new Date(cdate.substring(0,4), mn, cdate.substring(6));
           let tday = nd.getDay();
           if((trip.days != "") && (trip.days.indexOf(tday) != -1))
           {
             dateOK = true;   
           }
         }
      }
    }
    else if(trip.days != "")
    {
//      if(bx) report("case 4 trip days only");
      let mn = Number(cdate.substring(4,6)) - 1;
      if(mn == -1) mn = 11;
      let nd = new Date(cdate.substring(0,4), mn, cdate.substring(6));
      let tday = nd.getDay();
      if(bx) report("770 " + trip.days + " : " + tday + " " + nd.toLocaleString());
      if((trip.days != "") && (trip.days.indexOf(tday) != -1))
      {
        dateOK = true;   
      }
      if(bx) report("770 " + dateOK + " " + trip.days + " : " + tday + " " + nd.toLocaleString());
         
    }
    
  }
  }
  //if(bx) report("973 isDateOK2 " + trip.trip_id + " " + cdate + " " + dateOK );
  
  return(dateOK);
}


/*
function isDateOK(route, trip, cdate, day)
{
  let bx = false; 
  if(bx) report("isDateOK " + route.route_id + " " + trip.trip_id + " " + cdate + " " + day + " " + trip.getDays().length);
  
  // first original definition  // if days OK then dateOK
  let bHoliday = false;
  if(typeof trip.bHoliday !== 'undefined') bHoliday = trip.bHoliday;

  let dateOK = (((trip.getDays().toString().indexOf(day) != -1) && !(route.bUseHolidays && bHoliday)) || (bHoliday && (trip.getDays().toString().indexOf("8") != -1)));
  if(bx) report("dateOK 1 = " + dateOK + " cdate = " + cdate);
  
  
  if(typeof trip.service_id !== 'undefined')
  {
    if(bx) report("459 got here " + trip.service_id + " " + (typeof route.cal !== 'undefined'));
    let sd = trip.getStartDate();
  //    report("sd = " + sd);
    if(cdate < sd) dateOK = false;
    let tpd = trip.getStopDate();
    if(cdate > tpd) dateOK = false;
    if(bx) report(trip.trip_id + " sd = " + sd + " tpd = " + tpd + " " + dateOK);
              
    if(trip.getDays() == "")
    {
 //     report("got here 474");
      dateOK = !b3;
    }
    else
    {
      dateOK = dateOK && !b3;
    }
    if(bx) report("dateOK 2a = " + dateOK);
     
      
  }
  
  
  // check new criteria
  if( (typeof trip.service_ids !== 'undefined') && (trip.service_ids.length > 0) && ((route.cal != null) || (trip.cal != null)))
  {
    let k3 = trip.service_ids.length;
    if(bx) report("checking " + k3 + " service_ids");
    let i3 = 0;
    let bnodays = (trip.getDays() == "");
//    report("  getDays = " + trip.getDays() + ": " + trip.days);
    let n1 = 0;
//    if(bnodays) n1 = 3;
    let b3 = true;
    while(b3 && (i3 < k3))
    {
      if(bx) report( trip.service_ids[i3] + " " + cdate);
      if(route.cal.isValidDate(trip.service_ids[i3], cdate, 0)) 
      {
          b3 = false;
          if(bx) report("valid date svc id = " + trip.service_ids[i3] + " " + cdate + " " + n1);
      }
      else 
      {
           if(bx) report("invalid date svc id = " + trip.service_ids[i3] + " " + cdate + " " + n1);
         i3 += 1;
      }
    }
    if(trip.getDays() == "")
    {
//      report("got here 474");
      dateOK = !b3;
    }
    else
    {
      dateOK = dateOK && !b3;
    }
    if(bx) report("dateOK 2 = " + dateOK);
  }
        
  if(typeof trip.start_date !== 'undefined')
  {
    if(cdate < trip.start_date) dateOK = false;
    if(bx) report("495 " + cdate + " " + trip.start_date + " " + dateOK);
  }
  
  if(bx) report("497 " + cdate + " " + trip.start_date + " " + dateOK);
  
  if(typeof trip.end_date !== 'undefined')
  {
    if(cdate > trip.end_date) dateOK = false;
  }
  
  if(bx) report("dateOK 3 = " + dateOK);
  if(bx)report("isDateOK " + route.route_id + " " + trip.trip_id + " " + cdate + " " + day + " " + dateOK);
  return(dateOK);  
}
*/
    
function isMNRStop(stop_id)
{
  let b = false;
  if(stop_id.indexOf("MNR_") == 0) b = true;
  else if(stop_id == "NewYork-Grand-Central-NY") b = true;
  else
  {
    let routes = getRoutesS(stop_id);
    if(routes.indexOf("MN") == 0) b = true;
    else if(routes.indexOf(",MN") != -1) b = true;
  }
  return(b);
}

function isLIRRStop(stop_id)
{
  let b = false;
  if((stop_id.indexOf("LI") == 0) && (stop_id.length < 6)) b = true;
  else
  {
    let routes = getRoutesS(stop_id);
    if(routes.indexOf("LIRR") != -1) b = true;
  }
  return(b);
}

function isNYCSubwayStop(stop_id)
{
  let b = false;
  if((stop_id.indexOf("NYT") == 0)) b = true;
  if(b && (stop_id.charAt(stop_id.length - 1) == 'B')) b = false;
  return(b);
}

let ExtraTrip = "";

AssociateService.prototype.getLIRRTripForTrip = function(GTrip)
{
  let routes = serviceE.routes;
  let t = null;
  let b = true;
  let k = serviceE.routes.length;
  let i = 0;
  while(b && (i < k))
  {
    let route = serviceE.routes[i];
    if(route.route_id.indexOf("LIRR") == 0)
    {
      let ltrips = route.trips;
      let kk = ltrips.length;
      let ii = 0;
      while(b && (ii < kk))
      {
        if(ltrips[ii].tid == GTrip)
        {
          t = ltrips[ii];
          b = false;
        }
        ii += 1;
      }
    }
      
    i += 1;
  }
  if(b)
  {
    if(ExtraTrip.indexOf(GTrip) == -1)
    {
      ExtraTrip += "," + GTrip;
//      report("gltft no trip " + GTrip);
    }
  }
  return(t);
}

AssociateService.prototype.getBARTTripForTrip = function(GTrip, f1)
{
  let routes = serviceE.routes;
  let t = null;
  let b = true;
  let k = serviceE.routes.length;
  let i = 0;
  while(b && (i < k))
  {
    let route = serviceE.routes[i];
    if(route.route_id.indexOf("B_") == 0)
    {
      let ltrips = route.trips;
      let kk = ltrips.length;
      let ii = 0;
      while(b && (ii < kk))
      {
//        if(ii == 0) report("901 " + ltrips[ii].tid + " " + GTrip);
        if(ltrips[ii].tid == GTrip)
        {
          t = ltrips[ii];
          b = false;
        }
        ii += 1;
      }
    }
      
    i += 1;
  }
  if(!b)
  {
    t.parent = route;
    t.parent_id = route.route_id;
  }
  
  if(b)
  {
    if(ExtraTrip.indexOf(GTrip) == -1)
    {
      ExtraTrip += "," + GTrip;
//      report("gltft no trip " + GTrip);
    }
  }
  let s = "null";
  if(t != null) s = t.trip_id;
//  report("getBARTTripForTrip " + GTrip + " " + s);
  return(t);
}

AssociateService.prototype.getTripLIRR = function(trip_id)
{
  let routes = serviceE.routes;
  let t = null;
  let b = true;
  let k = serviceE.routes.length;
  let i = 0;
  while(b && (i < k))
  {
    let route = serviceE.routes[i];
    if(route.route_id.indexOf("LIRR") == 0)
    {
      let ltrips = route.trips;
      let kk = ltrips.length;
      let ii = 0;
      while(b && (ii < kk))
      {
        if(ltrips[ii].trip_id == trip_id)
        {
          t = ltrips[ii];
          b = false;
        }
        ii += 1;
      }
    }
      
    i += 1;
  }
  return(t);
}

let trip_names = [];

function filterT(t, pass)
{
  let k2 = t.mode.length;
  let i2 = 0;
  while(i2 < k2)
    {
    let t3 = t.mode[i2].route;
    let k3 = t3.length;
    let i3 = 0;
    while(i3 < k3)
    {
      let t4 = t3[i3].direction;
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
          if(pass == 1)
          {
            if(typeof trip_names[tx.trip_name] === 'undefined') trip_names[tx.trip_name] = 1;
            else trip_names[tx.trip_name] += 1;
          }
          else if(pass == 2)
          {
            if(typeof trip_names[tx.trip_name] !== 'undefined')
            {
              if( trip_names[tx.trip_name] > 1) tx.dupe = true;  
            }
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

function makeMTAroute_id(routem)
{
  let route_id = routem.replace(" ", "_");
  route_id = route_id.replace("+", "_SBS");
  return(route_id); 
}

function makeMTAtrip_id(route_id, VehicleRef)
{
  let tripid = route_id + "_" + VehicleRef.substring(VehicleRef.lastIndexOf("_") +1);
  return(tripid) 
}

function getMTAroute_idFromtrip_i(trip_id)
{
  let route_id = "";
  let ib1 = trip_id.indexOf("_SBS");
  if(trip_id.indexOf("MTABC") == 0)
  {
    if(ib1 != -1) route_id = trip_id.substring(0, ib1 + 4);
    else
    {
      let r1 = trip_id.indexOf("_");
      let r2 = trip_id.indexOf("_", r1 + 1);
      route_id = trip_id.substring(0, r2);
    }
  }
  else
  {
    if(ib1 != -1) route_id = trip_id.substring(0, ib1 + 4);
    else
    {
      let r1 = trip_id.indexOf("_");
      let r2 = trip_id.indexOf("_", r1 + 1);
      let r3 = trip_id.indexOf("_", r2 + 1);
      route_id = trip_id.substring(0, r3);
    }
  }
  return(route_id);
}

function getMTABusNumFromroute_id(route_id)
{
  let busnum = "";
  let ib1 = route_id.indexOf("_");
  let ib2 = route_id.indexOf("_", ib1 + 1);
  if(route_id.indexOf("MTABC") == 0)
  {
    busnum = route_id.substring(ib1 + 1);
  }
  else
  {
    busnum = route_id.substring(ib2 + 1);   
  }
  return(busnum);
}

/*
function makeTFromFeed(feed)
{
  let t = {
      stop_id: stop_id,
      stop_name: getStopFromID(stop_id),
      mode: []
      };
  t.mode.push({
           route_type: "3",
           mode_name: "Bus",
           route: []
  });
  
  
  return(t);
}
*/

AssociateService.prototype.getPredictionByStop = function(stop_id, max_time, max_trips, tbase)
{
  let bReport = document.getElementById("rp").checked;
  PredictionTime = "";
  let bok = window.location.href.indexOf("https") == 0;
  let dtime = null;
  if(tbase != null) dtime = Math.floor(tbase.getTime() / 1000);
  else dtime = getTTime();
  dtime = Number(dtime);
  let dt = new Date();
  dt.setFullYear(tbase.getFullYear());
  dt.setMonth(tbase.getMonth());
  dt.setDate(tbase.getDate());
  dt.setHours(0);
  dt.setMinutes(0);
//  let day = dt.getDay().toString();
  let ddf = getCDateFromDate(dt);

//  if(bReport) 
//  report("1310 AS.getPredictionByStop " + stop_id + " " + isLIRRStop(stop_id));
  let p = null;
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }
  
  if(bOnLine  && isMNRStop(stop_id))
  {

  if(true)
  {
//    if(bReport) 
//        report("1428 AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
    
    if((SUB[9] != null) && (typeof SUB[9].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[9].header.timestamp);
      PredictionTime = SUB[9].header.timestamp;
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(9);
      }
      else if((dtime - ctime) > 450) // was 600
      {
        queueSUB(9);
      }
    }
    else queueSUB(9);
    
//    if((SUB[9] != null) && (MN1.trips.length == 2)) cleanMNR();
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
          
         if(SUB[9] != null)
         {
           let feed = null;
           feed = SUB[9];
//           console.log(JSON.stringify(feed));
//           report("1376 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("1378 got feed for MNR " + feed.header.timestamp + " " + dtime);
           combine(t, feed, "MNR", "MN", "MN");
           let routes = getRoutesS(stop_id);
         }
         
//         report("1463: " + JSON.stringify(t,null, 4));
         resolve(t);
      }).catch(function(e) {
         console.trace(); 
         report("1246 " + e);  
      }); 
    });
  }
  /*
  else
  {
    p = new Promise (function(resolve, reject){
        let p1 = getFeed("MNR");
        if(p1 != null) 
        {
            p1.then(function(Mfeed) {
            let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
                if(Mfeed.feed == null) resolve(t);
                let trips = Mfeed.feed.entity;
//                report("MNR feed had " + trips.length + " trips, stop_id = "+ stop_id + " " + dtime);
                let i = 0;
                for(i = 0; i < trips.length; i++)
                {
                  let tid = "MNR" + trips[i].id;
                  let veh = trips[i].trip_update.vehicle.label;
                  let stu = trips[i].trip_update.stop_time_update;
                  if(typeof stu !== 'undefined')
                  {
                  let k2 = t.mode.length;
                  let i2 = 0;
                  while(i2 < k2)
                  {
                     let t3 = t.mode[i2].route;
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
                           if(tx.trip_id == tid)
                           {
//                             report("  trip matches " + stu.length);
                             let k1 = stu.length;
                             let i1 = 0;
                             let bh = false;
                             while(i1 < k1)
                             {
                               let x = stu[i1]; 
                               if(typeof x.departure !== 'undefined')
                               {
                                 let sid = getStopIdForNumber(x.stop_id, "MN");
                                 let tp = Number(x.departure.time) + 14427;
                                 let delay = x.departure.delay;
                                 if(!bh && (dtime < tp))
                                 {
 //                                  report("  got here 425 ");
                                   if(i1 == 0)
                                   {
                                     if(stop_id != sid)
                                     {
                                       tx.vstat = "NEXT DEPARTURE";
                                       tx.vstopid = sid;
                                     }
                                     if(k5 == 1)
                                     {
                                       tx.vstat = "NEXT ARRIVAL";
                                       tx.vstopid = sid;
                                     }
                                     bh = true;
                                   }
                                   else
                                   {
                                     tx.vstat = "IN_TRANSIT_TO";    
                                     tx.vstopid = sid;
                                     bh = true;
                                   }
                                 }
                               }
                               i1 += 1;
                             }
                           }
                           i5 += 1;
                         }
                         i4 += 1;
                       }
                       i3 += 1;
                     }
                     i2 += 1;
                  }
                  
                           
                           
                  let k1 = stu.length;
                  let i1 = 0;
 //                 report("veh = " + veh + ", tid = " + tid + ", stopi = " + stu[0].stop_id);
                  while(i1 < k1)
                  {
                    let x = stu[i1];
                    if(typeof x.departure !== 'undefined')
                    {
                      let sid = getStopIdForNumber(x.stop_id, "MN");
                      let tp = Number(x.departure.time);
                      let delay = x.departure.delay;
  //                    report("    " + stop_id + " " + sid);
                      if(stop_id == sid)
                      {
                        let k2 = t.mode.length;
 //                       report("stop ids match, t.mode.length = " + k2 + " tid = " + tid);
                        let i2 = 0;
                        while(i2 < k2)
                        {
                          let t3 = t.mode[i2].route;
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
                                if(tx.trip_id == tid)
                                {
//                                  tx.pred_arr_dt = tp;
//                                  tx.pred_dep_dt = tp;
                                  let ty = tx.sch_dep_dt;
                                  let tpp = Number(ty) + delay;
                                  tx.pre_dt = tpp;
                                  tx.pred = "true";
                                  tx.veh_label = veh;
//                                  report("got here 418 " + tid + " " + ty + " + " + delay + " = " + tpp + " "+ tp);
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
                    }
                    i1 += 1;
                  }
                }
                else report("trip error " + tid);
                }
                if(bReport) report(JSON.stringify(t, null, 4));
                resolve(t);
            } ).catch(function(error){
            reject(error);
            });
          }).catch(function(error){
               let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) { 
                   resolve(t);
                   }).catch(function(error){
                   reject(error);
                   });
               
               report(error);
            });
          }
          else
          {
            let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
                resolve(t);
            }).catch(function(e){
                reject(e);
            });
          }
 
        });
  }
  */
  }

  else if(bOnLine && isLIRRStop(stop_id))
  {
//   if(document.getElementById("bUseNewNY").checked)
   if(true)
   {
//    if(bReport) report("AS.getPredictionByStop  LIRR " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
    
    if((SUB[10] != null) && (typeof SUB[10].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[10].header.timestamp);
      PredictionTime = SUB[10].header.timestamp;
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(10);
      }
      else if((dtime - ctime) > 180)
      {
        queueSUB(10);
      }
    }
    else queueSUB(10);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
         if(SUB[10] != null)
         {
           let feed = null;
           feed = SUB[10];
//           console.log("1704: " + JSON.stringify(feed));
//           report(JSON.stringify(feed, null, 4));
//           if(bReport) 
//               report("1730 got feed for " + stop_id + " " + getPBTime(feed.header.timestamp) + " " + dtime);
           combine(t, feed, "LI", "LIRR", "LI");
//           let routes = getRoutesS(stop_id);
         }
      if(bReport)report(JSON.stringify(t, null, 4)); //bp0
         resolve(t);
      });
    });
  }
  /*
  else
  {
    p = new Promise (function(resolve, reject){
        let p1 = getFeed("LIRR");
        if(p1 != null) 
        {
            report("got LIRR feed");
            p1.then(function(Lfeed) {
              if(bReport)  report("getPredictionByStop LIRR:\n" + JSON.stringify(Lfeed, null, 4));
              let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
                trip_names = [];
                filterT(t, 1);
                filterT(t, 2);
                trip_names = [];
                
                if(Lfeed.feed == null) 
                {
                    report("Lfeed.feed is null");
                    resolve(t);
                }
                else
                {
                let tvs = Lfeed.feed.data.entity;
 //               report("LIRRR feed had " + tvs.length + " items, stop_id = "+ stop_id + " " + dtime);
                let i = 0;
                for(i = 0; i < tvs.length; i++)
                {
                  if(typeof tvs[i].vehicle !== 'undefined')
                  {
                    let vehicle = tvs[i].vehicle;
                    let tA = serviceE.getLIRRTripForTrip(vehicle.trip.trip_id);
 //                   report("veh " + " " + vehicle.trip.trip_id);
                    if(tA != null)
                    {
                      let tid = tA.trip_id;
                      let stat = vehicle.current_status;
                      let vehid = vehicle.vehicle.id;
                      switch(stat)
                      {
                          case 0: stat = "INCOMING AT"; break;
                          case 1: stat = "STOPPED AT"; break;
                          case 2: stat = "IN_TRANSIT_TO"; break;
                          default: stat = "";
                      }
                      if(vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
                      let sstop = "LI" + vehicle.stop_id;
                      let lat = vehicle.position.latitude;
                      let lon = vehicle.position.longitude;
//                      report(tid + " " + stat + " " + sstop + " " + lat + " " + lon);
                      let k2 = t.mode.length;
                      let i2 = 0;
                      while(i2 < k2)
                      {
                        let t3 = t.mode[i2].route;
                        let k3 = t3.length;
                        let i3 = 0;
                        while(i3 < k3)
                        {
                          let t4 = t3[i3].direction;
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
                              if(tx.trip_id == tid)
                              {
 //                                 report("vehicle trip found " + tx.trip_id);
                                tx.veh_id = vehicle.vehicle.id;
                                tx.vstopid = sstop;
                                tx.vlat = lat;
                                tx.vlon = lon;
                                tx.vstat = stat;
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
                  }  
                  else if(typeof tvs[i].trip_update !== 'undefined')
                  {
                    let tA = serviceE.getLIRRTripForTrip(tvs[i].trip_update.trip.trip_id);
//                    report("trip " + tvs[i].trip_update.trip.trip_id);
                    if(tA != null)
                    {
                      let tid = tA.trip_id;
                      let stu = tvs[i].trip_update.stop_time_update;
                      if(typeof stu !== 'undefined')
                      {
                        let k1 = stu.length;
                        let i1 = 0;
 //                 report("tid = " + tid + ", stopi = " + stu[0].stop_id);
                        while(i1 < k1)
                        {
                          let x = stu[i1];
                          let tpad = 0;
                          let tpdd = 0;
                          if(typeof x.arrival !== 'undefined')
                          {
                            tpad = Number(x.arrival.delay);
                          }
                          if(typeof x.departure !== 'undefined')
                          {
                            tpdd = Number(x.departure.delay);
                          }
                    
                          {
                            let sid = "LI" + x.stop_id; 
  //                    report("    " + stop_id + " " + sid);
                            if(stop_id == sid)
                            {
                              let k2 = t.mode.length;
 //                       report("stop ids match, t.mode.length = " + k2 + " tid = " + tid);
                              let i2 = 0;
                              while(i2 < k2)
                              {
                                let t3 = t.mode[i2].route;
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
                                      if(tx.trip_id == tid)
                                      {
                                        tx.tid =  tA.trip_id;
                                        tx.pred_arr_dt = Number(tx.sch_arr_dt) + Number(tpad);
                                        tx.pred_dep_dt = Number(tx.sch_dep_dt) + Number(tpdd);
                                        if(tx.pred_arr_dt > tx.pred_dep_dt) 
                                        {
                                           tx.pred_dep_dt =  tx.pred_arr_dt;
                                        }
                                        tx.pre_dt = tx.pred_dep_dt;
                                        tx.pred = "true";
//                                  report("got here 418 " + tx.pred_arr_dt + " = " + tx.sch_arr_dt + " + " + tpad + ", " + tx.pred_dep_dt + " = " + tx.sch_dep_dt + " + " + tpdd);
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
                          }
                          i1 += 1;
                          }
                       }
                    }
                    else // 
                    {
                        
                    }
                  }
                else report("trip error " + tid);
                }
                }
                if(bReport) report(JSON.stringify(t, null, 4));
                resolve(t);
            } ).catch(function(error){
                report("etd2 758 " + error);
                reject(error);
            });
          }).catch(function(error){
                 report("etd2 762 " + error);
                 let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) { 
                   resolve(t);
                   }).catch(function(err){
                   report("etd2 765 " + err);
                   reject(err);
                   });
               
               report(error);
            });
          }
          else
          {
            if(bReport) report("getPredictionByStop LIRR feed is null");
            p1 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase);
            p1.then(function(t){
                resolve(t);
            }).catch(function(e){
                report("getPredictionByStop LIRR feed is null and " + e);
            });
          }
        });
  }
  */
  }
  else if(bOnLine && isNYCSubwayStop(stop_id))
  {
    if(bReport) report("AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
    if(PBloaded && (!PBloading) && (GRB != null) && ((stop_id != "NYT901") && (stop_id != "NYT902")))
    {
      p = new Promise (function(resolve, reject){
//          tzfactor = getTzFactor(getTZforStop(stop_id), "EasternTime");
          let t = new Object();
          t.stop_id = stop_id;
          t.stop_name = getStopNameFromID(stop_id);
          t.mode = [];
          let mode = new Object();
          t.mode.push(mode);
          mode.route_type = "3";
          mode.mode_name = "Subway";
          mode.route = [];
//          let s = "{\"stop_id\": \"" + stop_id + "\", \"stop_name\": \"" + getStopNameFromID(stop_id) + "\", ";
//          s += "\"mode\": [{ \"route_type\": \"2\", \"mode_name\": \"Rail\",\"route\": [";
          
          let routes = getRoutesS(stop_id);
          if(bReport) report("routes = " + routes  + " for " + stop_id);
          updateAlerts0(stop_id, routes, null);

          let sid = [0,0,0,0,0,0,0,0,0];
          if(routes.indexOf("NY1") != -1) sid[0] |= 1;
          if(routes.indexOf("NY2") != -1) sid[0] |= 2;
          if(routes.indexOf("NY3") != -1) sid[0] |= 4;
          if(routes.indexOf("NY4") != -1) sid[0] |= 8;
          if(routes.indexOf("NY5") != -1) sid[0] |= 16;
          if(routes.indexOf("NY6") != -1) sid[0] |= 32;
          if(routes.indexOf("NYA") != -1) sid[1] |= 1;
          if(routes.indexOf("NYC") != -1) sid[1] |= 2;
          if(routes.indexOf("NYE") != -1) sid[1] |= 4;
          if(routes.indexOf("NYH") != -1) sid[1] |= 8;
          if(routes.indexOf("NYSI") != -1) sid[5] |= 1;
          else if(routes.indexOf("NYS") != -1) sid[1] |= 16;
          if(routes.indexOf("NYN") != -1) sid[2] |= 1;
          if(routes.indexOf("NYQ") != -1) sid[2] |= 2;
          if(routes.indexOf("NYR") != -1) sid[2] |= 4;
          if(routes.indexOf("NYW") != -1) sid[2] |= 8;
          if(routes.indexOf("NYB") != -1) sid[3] |= 1;
          if(routes.indexOf("NYD") != -1) sid[3] |= 2;
          if(routes.indexOf("NYF") != -1) sid[3] |= 4;
          if(routes.indexOf("NYM") != -1) sid[3] |= 8;
          if(routes.indexOf("NYL") != -1) sid[4] |= 1;
          if(routes.indexOf("NYG") != -1) sid[6] |= 1;
          if(routes.indexOf("NYJ") != -1) sid[7] |= 1;
          if(routes.indexOf("NYZ") != -1) sid[7] |= 2;
//          if(routes.indexOf("NY7") != -1) sid[8] |= 1;
          if(routes.indexOf("NY7") != -1) sid[0] |= 64;
          if(routes.indexOf("NY7X") != -1) sid[0] |= 64;
          let k = sid.length;
          let i = 0;
          while(i < k)
          {
            if(sid[i] != 0)
            {
              if(SUB[i] != null)
              {
                let ctime = getPBTime(SUB[i].header.timestamp);
                PredictionTime = SUB[i].header.timestamp;
                if((dtime - ctime) > 3600)
                {
//                  SUB[i] = null;
                  queueSUB(i);
                }
/*                else if((dtime - ctime) > 120)
                {
                  queueSUB(i);
                } */
              }
              else queueSUB(i);
            }
            i += 1;
          }
          let sod = [];             
          if(routes.indexOf(",") != -1) sod = routes.split(",");
          else sod[0] = routes;
          k = sod.length;
          i = 0;
          let bGotSomeFeeds = false;
          while(i < k)
          {
            let tr = serviceE.getRouteS(sod[i]);
            let rname = "";
            let rname2 = "";
            if(tr != null)
            {
              let feed = null;
              feed = SUB[getSubindexByRoute(tr.route_id)];
//              if(tr.route_id == "NY7") report("2071 NY7 index = " + getSubindexByRoute(tr.route_id));
              rname = tr.route_name;
              rname2 = tr.common_name;
//              if(i != 0) s += ", ";
              if(rname.length < 8) rname = tr.common_name;
//              rname = "";
              let routeE = new Object();
              mode.route.push(routeE);
              routeE.route_id = tr.route_id;
              routeE.route_name = rname;
              routeE.direction = [];
//              s += "{ \"route_id\": \"" + tr.route_id + "\", \"route_name\": \"" + rname + "\", \"direction\": [";
              if(feed != null)
              {
                bGotSomeFeeds = true;
//                console.log(JSON.stringify(feed, null, 4));
//                report("2178 " + JSON.stringify(feed, null, 4));
                if(bReport) report("got feed for " + tr.route_id + " " + getPBTime(feed.header.timestamp) + " " + dtime);
                let bForward = !document.getElementById("spa").checked;
                let dir = 0;
                for(dir = 0; dir < 2; dir++)
                {
   //               if(dir != 0) s += ",";
  //                s += "{\"direction_id\": \"" + dir + "\", \"direction_name\": \"\", \"trip\": [ ";
                  let dirE = new Object();
                  routeE.direction.push(dirE);
                  dirE.direction_id = dir;
                  dirE.direction_name = "";
                  dirE.trip = [];
                  let ry = tr.route_id.substring(2);
                  let sy = stop_id.substring(stop_id.length - 1);
                  let sz = stop_id.substring(3);
                  let by = (sy == "N") || (sy == "S");
//                  report("2104 by = " + by + "  " + dir + " sy = " + sy + " " + tr.iddir + " " + ry); 
                  if((by && (((dir == 0) && (sy == tr.iddir)) || 
                      ((dir == 1) && (sy != tr.iddir)))) || !by)
                  {
                    let kk = feed.entity.length;
                    let ii = 0;
                    let bNotFirst = false;
                    let idx = stop_id.substring(3);
                    for(ii = 0; ii < kk; ii++)
                    {
                      let t1 = feed.entity[ii];
                      if((t1.trip_update != null) && (typeof t1.trip_update.trip !== 'undefined'))
                      { 
                        let xx = t1.trip_update.trip.route_id;
//                        if(xx == "2") xx = "5";
//                        else if(xx == "5") {xx = "2";}
                        if(ry == xx)
                        {
                          if(t1.trip_update.stop_time_update != null)
                          {
                            let t3 = t1.trip_update.stop_time_update;
                            let k3 = t3.length;
 //                           report("2126  ry = " + ry + ", k3 = " + k3 + "sz = " + sz);
                            let headsign = "";
                            if(k3 > 0) 
                            {
                                headsign = getStopNameFromID("NYT" + t3[k3 - 1].stop_id);
                            }
                            let tzfactor = getTzFactor(getTZforStop(Place_id), "EasternTime");
                            let i3 = 0;
                            let b3 = true;
                            while(b3 && (i3 < k3))
                            {
                              let t4 = t3[i3];
 //                             if(ry == 7) report("2137 t4.stop_id = " + t4.stop_id + " " + by + " " + sz);
                              if((t4.stop_id == sz) || (!by && (t4.stop_id.indexOf(sz) == 0)))
                              {
                                b3 = false;
//                               if(ry == 7) report("2137 t4.stop_id = " + t4.stop_id + " " + by + " " + sz);
                                let ta = "";
                                if(t4.arrival != null)
                                {
                                  ta = getPBTime(t4.arrival.time);   
                                }
                                let td = "";
                                if(t4.departure != null)
                                {
                                  td = getPBTime(t4.departure.time);   
                                }
                                
                                if(td > 0) td = Number(td) + 3600 * tzfactor;
                                if(ta > 0) ta = Number(ta) + 3600 * tzfactor;
                               
                                let tra = tr.trips;
                                if((typeof tra !== 'undefined') && (tra.length > 0))
                                {
                                let hs = "";
                                /*
                                if(tra[0].direction == dir)
                                {
                                  hs = tra[0].headsign;
                                }
                                else if(tra[1].direction == dir)
                                {
                                  hs = tra[1].headsign;
                                }
                                */
                                hs = headsign;
                                let tid = t1.trip_update.trip.trip_id;
                                let bw = ((dir == 0) && (tr.iddir == "S") &&    (tid.indexOf("..S") != -1)) ||
                                  ((dir == 0) && (tr.iddir == "N") && (tid.indexOf("..N") != -1)) ||
                                  ((dir == 1) && (tr.iddir == "S") && (tid.indexOf("..N") != -1)) ||
                                  ((dir == 1) && (tr.iddir == "N") && (tid.indexOf("..S") != -1));
//                                report("2172 bw = " + bw + ", " + bForward + " " + ta + " " + dtime + " " + tr.iddir + " " + tid + " " + dir);
                                if(bw && (!bForward || (ta > dtime)))
                                {
 //                                   report("got here 1216");
      //                            if(bNotFirst) s += ",";
      //                            else 
                                      bNotFirst = true;
                                  let tid2 = "NYC" + t1.trip_update.trip.trip_id;
     //                             s += "{\"trip_id\": \"" + tid2 + "\", \"trip_name\": \"" + rname + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\", \"trip_headsign\": \"" + hs + "\", \"pred\":\"true\"}";
                                  let tripE = new Object();
                                  dirE.trip.push(tripE);
                                  tripE.trip_id = tid2;
                                  tripE.trip_name = rname2;
                                  tripE.sch_arr_dt = ta;
                                  tripE.sch_dep_dt = td;
                                  tripE.trip_headsign = hs;
                                  tripE.pred = "true";
                                  if((typeof t4.nyct_stop_time_update !== 'undefined') && ( t4.nyct_stop_time_update != null))
                                  {
                                    let track =  t4.nyct_stop_time_update.actual_track;
                                    if(track != "") tripE.track = track;
                                  }
                                 /*
                                  let hs2 = getHeadsignForTrip(tid2);
                                  if((hs2 != null) && (hs != hs2))
                                  {
                                    tripE.trip_headsign = hs2;  
                                  }
                                  */
                                }
                                }
                              }
                              i3 += 1;
                            }
                          }
                        }
                      }
                      else if((t1.vehicle != null) && (dir == 0))
                      {
                        let ttid = "NYC" + t1.vehicle.trip.trip_id;
                        let k9 = dirE.trip.length;
                        let i9 = 0;
                        let b9 = true;
                        while(b9 && (i9 < k9))
                        {
                          if(dirE.trip[i9].trip_id == ttid)
                          {
                            b9 = false;
                            let x = dirE.trip[i9];
                            x.vstopid = "NYT" + t1.vehicle.stop_id;
                            let stat = t1.vehicle.current_status;
                            if(typeof stat !== 'undefined')
                            {
                            if(typeof stat.value !== 'undefined') stat = stat.value;
                            switch(stat)
                            {
                              case 0: stat = "INCOMING AT"; break;
                              case 1: stat = "STOPPED AT"; break;
                              case 2: stat = "IN_TRANSIT_TO"; break;
                              default: stat = "";
                            }
                            if(t1.vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
                            x.vstat = stat;
                            if(t1.vehicle.timestamp != null)
                            {
                              x.vehicle_timestamp = getPBTime(t1.vehicle.timestamp);
                            }
                            }
                          }
                          i9 += 1;
                        }
                          
                      }
                      
                    }
                    
                  }
  //               s += "]}"
                }
              }
  //            s += "]"; // end of direction
            }
//            else report("AS.getPredictionByStop tr null i = " + i + "sod[i] = " + sod[i]);
//            s += "}"; // end of route
            i += 1;
          }
//          s += "]}]}";

//          updateAlerts0(stop_id, routes, null);
  
          if(bReport)
          {
//            let s = JSON.stringify(t, null, 4);
//            report("\n" + s + "\n");  
          }
 //         let tj = JSON.parse(s);
//          if(bGotSomeFeeds) resolve(tj);
          if(bGotSomeFeeds) resolve(t);
          else
          {
            let p6 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase);
            p6.then(function(s){
//                report("1961 " + JSON.stringify(s, null, 4));
//                let tj = JSON.parse(s);
                resolve(s);
            }).catch(function(e){
                reject(e);
            });
          }
          });
    }
    else
    {
      p = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase);  
    }
  }
  
  else if(bOnLine && (stop_id.indexOf("CH") == 0)) // CTABus
  {
    p = new Promise (function(resolve, reject){
    let rstop_id = stop_id.substring(2);
    let p7 = getCTABusStopPred(rstop_id).then(function(response) {
        let jj = response.indexOf(":");
        let ss = "{ \"x\"" + response.substring(jj);
        let r = JSON.parse(ss);
//        report("2257 " + JSON.stringify(r, null, 4));
        if(typeof r.x.error !== 'undefined')
        {
          report("1882 stop CH" + r.x.error[0].stpid + " " + r.x.error[0].msg); 
 //       report(JSON.stringify(r, null, 4));
          checkLoadable("CH18252");
          reject("2228 " + r.x.error[0].msg);
        }
        else
        {
        let rpt = r.x.prd;
        if(typeof rpt === 'undefined') reject("1881 " + rstop_id + " " + ss);
        let t = new Object();
        t.stop_id = stop_id;
        t.stop_name = getStopNameFromID(stop_id);
        t.mode = [];
        let tsm = "";
        let mode = new Object();
        t.mode.push(mode);
        mode.route_type = "3";
        mode.mode_name = "Bus";
        mode.route = [];
        let routes = [];
        let currentroute = "";
        let rdirt = null;
        let k1 = rpt.length;
 //       report("1893 bustime length = " + k1 );
        let i1 = 0;
        for(i1 = 0; i1 < k1; i1++)
        {
          let fi = rpt[i1];
          if(!elementInArray("CTAB" + fi.rt, routes))
          {
            currentroute = new Object();
            currentroute.route_id = "CTAB" + fi.rt;
            let rt = serviceE.getRouteS("CTAB" + fi.rt);
            if(rt != null) currentroute.route_name = rt.route_name;
            else currentroute.route_name = "Bus " + fi.rt;
            currentroute.direction = [];
            let dobj = new Object();
            dobj.direction_id = fi.rtdir;
            dobj.direction_name = fi.rtdir,
            dobj.trip = [];
            rdirt = dobj.trip;
            currentroute.direction.push(dobj);
//            currentroute.direction[1] = [];
            mode.route.push(currentroute);
            routes.push("CTAB" + fi.rt);
          }
          else
          {
            currentroute = null;
            let k2 = mode.route.length;
            let i2 = 0;
            let b2 =true;
            while(b2 && (i2 < k2))
            {
               if(mode.route[i2].route_id == "CTAB" + fi.rt)
               {
                 currentroute =  mode.route[i2];
                 b2 = false;
               }
               i2 += 1;
            }
            if(!b2)
            {
              let dirs =  currentroute.direction;
              let k4 = dirs.length;
              let i4 = 0;
              let b4 = true;
              while(b4 && (i4 < k4))
              {
                if(fi.rtdir == dirs[i4].direction_id)
                {
                  b4 = false;
                  rdir = dirs[i4];
                  rdirt = dirs[i4].trip;
                }
                i4 += 1;
              }
//              report("1946 " + b4 + " " + fi.rtdir + " " + dirs[0].direction_id);
              if(b4)
              {
                let dobj = new Object();
                dobj.direction_id = fi.rtdir;
                dobj.direction_name = fi.rtdir;
                dobj.trip = [];
                currentroute.direction.push(dobj); 
                rdirt = dobj.trip;                
              }
            }
          }
          let dir = fi.rtdir;
          let tp = new Object();
          tp.trip_id = "CTAB"+ fi.rt  + "_" +  fi.tatripid;
          tp.trip_name = currentroute.route_name + "_" + fi.rt.toString();
          tp.trip_headsign = fi.des;
          tsm = fi.tmstmp;
          let tdep = getTimefromCTABus(fi.prdtm);
          tp.sch_arr_dt = tdep;
          tp.sch_dep_dt = tdep;
          tp.pred_arr_dt = tdep;
          tp.pred_dep_dt = tdep;
          tp.pred = "true";
          tp.veh_id = fi.vid;

//          tp.lat = fi.lat;
//          tp.lon = fi.lon;
//          if(fi.isApp == "1") tp.stat = "Approaching";
          if(fi.dly) tp.stat = "DELAYED";
          else tp.stat = "";
          if(rdirt != null) rdirt.push(tp);

//          if(fi.trDr == "1")  currentroute.direction[1].push(tp);
//          else currentroute.direction[0].push(tp);
          
        }
//        let s = JSON.stringify(t,null, 4);
//        report(s);
        if(tsm != "") // "20260119 08:59"
        {
//          let dg = new Date( );
          let yr = Number(tsm.substring(0,4));
          let mi = Number(tsm.substring(4,6) -1);
          let day = Number(tsm.substring(6,8));
          let hr = Number(tsm.substring(9,tsm.indexOf(":")));
          let min = Number(tsm.substring(tsm.indexOf(":") + 1));
          let dg = new Date(yr, mi, day, hr, min);
          PredictionTime = Math.round(dg.getTime() / 1000);
        }
        resolve(t);
        }
    }).catch( function(e) {
       let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
           resolve(t);
       }).catch(function(e1) {
           reject(e + e1);
       });
    });    
    });
  }
  
  else if(bOnLine && (stop_id.indexOf("CG") == 0))
  {
    p = new Promise (function(resolve, reject){
    let rstop_id = stop_id.substring(2);
    let bx = false;
    if(stop_id.indexOf("CG3") == 0)
    {
      rstop_id = getParentIdFromId(stop_id).substring(6);
      let bx = true;
    }
    let p7 = getCTAFeed(200, rstop_id);  
    p7.then(function(response) {
//        report("response for " + rstop_id + " (" + stop_id + ")\n" + response);
        let r = JSON.parse(response);
        let rpt = r.ctatt.eta;
//        if(typeof rpt === 'undefined') reject("2286 no response for " + stop_id);
        let t = new Object();
        t.stop_id = stop_id;
        t.stop_name = getStopNameFromID(stop_id);
        t.mode = [];
        let mode = new Object();
        t.mode.push(mode);
        mode.route_type = "3";
        mode.mode_name = "Subway";
        mode.route = [];
        let routes = "";
        let currentroute = "";
        let rdirt = null;
        let k1 = 0;
        if(typeof rpt !== 'undefined') k1 = rpt.length;
        let i1 = 0;
        for(i1 = 0; i1 < k1; i1++)
        {
          let fi = rpt[i1];
          if(routes.indexOf(fi.rt) == -1)
          {
            if(bx && (fi.stpId != stop_id.substring(2))) ;
            else
            {
            currentroute = new Object();
            currentroute.route_id = fi.rt;
            let rt = serviceE.getRouteS("CTA_" + fi.rt);
            currentroute.route_name = rt.route_name;
            currentroute.direction = [];
            let dobj = new Object();
            dobj.direction_id = fi.trDr;
            dobj.direction_name = "",
            dobj.trip = [];
            rdirt = dobj.trip;
            currentroute.direction.push(dobj);
//            currentroute.direction[1] = [];
            mode.route.push(currentroute);
            routes += "," + fi.rt;
            }
          }
          else
          {
            currentroute = null;
            let k2 = mode.route.length;
            let i2 = 0;
            let b2 =true;
            let rdirt = 0;
            while(b2 && (i2 < k2))
            {
               if(mode.route[i2].route_id.indexOf(fi.rt) != -1)
               {
                 currentroute =  mode.route[i2];
                 b2 = false;
               }
               i2 += 1;
            }
            if(!b2)
            {
              let dirs =  currentroute.direction;
              let k4 = dirs.length;
              let i4 = 0;
              let b4 = true;
              while(b4 && (i4 < k4))
              {
                if(fi.trDr == dirs[i4].direction_id)
                {
                  b4 = false;
                  let rdir = dirs[i4];
                  rdirt = dirs[i4].trip;
                }
                i4 += 1;
              }
              if(b4)
              {
                let dobj = new Object();
                dobj.direction_id = fi.trDr;
                dobj.direction_name = "";
                dobj.trip = [];
                currentroute.direction.push(dobj); 
                rdirt = dobj.trip;                
              }
            }
          }
          let dir = fi.trDr;
          let tp = new Object();
          tp.trip_id = "CTA"+ fi.rt  + fi.rn.toString();
          tp.trip_name = currentroute.route_name + "_" + fi.rn.toString();
          tp.trip_headsign = fi.destNm;
          /*
          let jt = fi.arrT.indexOf(":");
          let jq = fi.arrT.lastIndexOf(":");
          let hr = fi.arrT.substring(fi.arrT.indexOf("T") + 1, jt);
          let min = fi.arrT.substring(jt + 1, jq);
          let sec = fi.arrT.substring(jq + 1);
          let dx = new Date();
          report(hr + " " + min + " " + sec + " " + TZD);
          dx.setHours(Number(hr)); // + TZD );
          dx.setMinutes(min);
          dx.setSeconds(sec);
          report(dx.toLocaleDateString() + " " + dx.toLocaleTimeString() + " " + dx.getTime());
          
          let tdep = Math.round(dx.getTime() / 1000);
          tdep = tdep.toString();
          */
          let tdep = getTimefromCTA(fi.arrT);
          tp.sch_arr_dt = tdep;
          tp.sch_dep_dt = tdep;
          tp.pred_arr_dt = tdep;
          tp.pred_dep_dt = tdep;
          if(fi.isSch == "0") tp.pred = "true";
          else tp.pred = "false";
          tp.lat = fi.lat;
          tp.lon = fi.lon;
          if(fi.isApp == "1") tp.stat = "Approaching";
          else if(fi.isDly == "1") tp.stat = "DELAYED";
          else tp.stat = "";
          if(rdirt != null) rdirt.push(tp);
//          if(fi.trDr == "1")  currentroute.direction[1].push(tp);
//          else currentroute.direction[0].push(tp);
          
        }
//        let s = JSON.stringify(t,null, 4);
//        report(s);
        resolve(t);
        
    }).catch(function(e) {
        reject(e);
    });
    });
  }
  else if(bOnLine && (stop_id.indexOf("ME_") == 0)) 
  {
    if((SUB[54] != null) && (typeof SUB[54].header != 'undefined'))
    {
      let ctime = getPBTime(SUB[54].header.timestamp);
      PredictionTime = SUB[54].header.timestamp;
      if((dtime - ctime) > 3600)
      {
        queueSUB(54);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(54);
      }
    }
    else queueSUB(54);
    
    p = new Promise (function(resolve, reject){
       let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
         if(SUB[54] != null)
         {
           let feed = null;
           feed = SUB[54];
//           console.log(JSON.stringify(feed));
//           report("2574 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("2423 got feed for " + feed.header.timestamp.low + " " + dtime);
           combine(t, feed, "ME_", "ME_", "ME_");
         }
         resolve(t);
      });
           
           /*
           getRealTimeData(203).then(function(g) {
             if(g.charAt(0) == 'E') resolve(t);
             let feed = new Object();
             try{
               feed.entity = JSON.parse(g);
               combine(t, feed, "ME_", "ME_", "ME_");
             }
             catch(e) {
               report("2424 " + e);
               resolve(t);  
             }
             resolve(t);
           }).catch(function(e) {
               resolve(t);
           });
        }).catch(function(e) {
            reject(e);
        });
        */
    });
  }
  
  else if(bOnLine && (stop_id.indexOf("NJ") == 0)) // NJrail
  {
//    report("2534 getPredictionByStop " + stop_id);
    let ctime = SUBTS[45];
    if(ctime == null) ctime = 0;
    PredictionTime = SUBTS[45];
    let stc = getNJstopcode(stop_id);
    if(stc != null)
    {
      if(NJStop != stc)
      {
        NJStop = stc;
        SUBTS[45] = dtime; 
        SUB[45] = null;
        getNJrailData("&f=7&stop=" + stc);
      }
      else if(SUB[45] != null)
      {
        if((dtime - ctime) > 300)
        {
          SUBTS[45] = dtime; 
          let k = Object.keys(SUB[45]).length;
          report("2556 feed keys = " + k);
          if(k > 3) getNJrailData("&f=7&stop=" + stc);  
        }
        else 
        {
          let k = Object.keys(SUB[45]).length;
//          report("2559 keys = " + k); 
        }
      }
    }
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
         if((SUB[45] != null) && (Object.keys(SUB[45]).length > 3))
         {
           let feed = SUB[45];
 //          report("2566 " + JSON.stringify(feed, null, 4));
           if((typeof feed.ITEMS !== 'undefined') && (feed.ITEMS.length > 0) && (feed.ITEMS[0].TRAIN_ID != null))
           combineNJ(t,feed, stop_id);
         }
         resolve(t);
      }); /*.catch(function(e) {
          reject("2561 " + e);
      }); */
    });
  }  
  else if(bOnLine && (stop_id.indexOf("B_") == 0)) // BART
  {
 //   if(bReport) report("AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
//    report("2398 getPredictionByStop " + stop_id);
    if((SUB[18] != null) && (typeof SUB[18].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[18].header.timestamp);
      PredictionTime = SUB[18].header.timestamp;
      if((dtime - ctime) > 3600)
      {
        queueSUB(18);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(18);
      }
    }
    else queueSUB(18);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
//          report("2415 "+ JSON.stringify(t, null, 4));
         if((SUB[18] != null) && isCarrierLoaded("BART"))
         {
           let feed = null;
           feed = SUB[18];
//           console.log(JSON.stringify(feed));
//           report("2574 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("2423 got feed for " + feed.header.timestamp.low + " " + dtime);
           combine(t, feed, "B_", "B_", "B_");
         }
         resolve(t);
      });
    });
  }
  
  else if(bOnLine && (stop_id.indexOf("LAM") == 0)) // LA Metro
  {
    p = new Promise (function(resolve, reject){ 
    let sid = "";
    let svc = "lametro-rail";
    let route_type = "2";
    let modename = "Rail";
    let bRail = true;
    if(stop_id.indexOf("LAMB") == 0) 
    {
        sid = stop_id.substring(4);
        svc = "lametro";
        bRail = false;
        route_type = "3";
        modename = "Bus";
    }
    else sid = stop_id.substring(3);
    let t = new Object();
 //   report("2247 get LA data " + svc + " " + sid);
    getRealTimeDataA(216, "&svc=" + svc + "&stop=" + sid).then(function(fd) {
     let feed = null;
     let bFeedError = false;
//     report("2251 got feed data " + fd);
     if(fd != null)
     {
       try{
          feed = JSON.parse(fd);
       }
       catch(e) {
          report("2634 " + e + "\n" + fd);
          bFeedError = true;
       }; 
       
       let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t2) {
//            report("2500 " + JSON.stringify(t2, null, 4));
          if((feed == null) || (typeof feed.data == 'undefined'))
          {
            t = t2;
//            console.log ("2509 " + JSON.stringify(t2, null, 4));
            resolve(t);
          }
          else
          {
            t = t2;
            combine2(t, feed, bRail); 
//            console.log("2283 " + JSON.stringify(t2, null, 4));
            resolve(t);
          }
       }).catch(function(e) {
           report("2274 " + e);
       }); 
       
        
   /*
//       let t2 = new Object();
        t.stop_id = stop_id;
        t.stop_name = getStopNameFromID(stop_id);
        t.mode = [];
        let mode = new Object();
        t.mode.push(mode);
        mode.route_type = route_type;
        mode.mode_name = modename;
        mode.route = [];

        let k = feed.data.predictionsData.length;
        let i = 0;
        for(i = 0; i < k; i++) // for each predictions route
        {
//          let ptrip_id = feed.data.predictionsData[i].destinations[0].predictions[0].tripId.toString();
          let route = "";
          if(bRail)
          {
            let rid = feed.data.predictionsData[i].routeId;
            if(rid == "801") route = "LAMA";
            else if(rid == "802") route = "LAMB";
            else if(rid == "803") route = "LAMC";
            else if(rid == "805") route = "LAMD";
            else if(rid == "806") route = "LAME";
            else if(rid == "804") route = "LAMG";
          }
          else 
          {
              let nom = feed.data.predictionsData[i].routeId.indexOf("-");
              route = "LAMB" + feed.data.predictionsData[i].routeId.substring(0, nom);
          }
          let rt = serviceE.getRouteS(route);
          let r = new Object();
          r.route_id = route;
          if(rt == null) r.route_name = "LAMB" + route.substring(0, route.indexOf("-"));
          else r.route_name = rt.route_name;
 //         report("2293 route_id = " + route + " route_name = " + r.route_name);
          let d0 = new Object();
          d0.direction_id = 0;
          d0.direction_name = "";
          d0.trip = [];
          let d1 = new Object();
          d1.direction_id = 1;
          d1.direction_name = "";
          d1.trip = [];
          r.direction = [d0, d1];   
          let k3 = feed.data.predictionsData[i].destinations.length;
          let i3 = 0;
          for(i3 = 0; i3 < k3; i3++)
          {
            let k4 = feed.data.predictionsData[i].destinations[i3].predictions.length;
            let i4 = 0;
            for(i4 = 0; i4 < k4; i4++)
            {
              let tf = feed.data.predictionsData[i].destinations[i3].predictions[i4];
              let trip = new Object();
              trip.trip_id = "LAM" + tf.tripId;
              trip.trip_name = "LA Metro " + feed.data.predictionsData[i].destinations[i3].headsign;
              let tpt = getTimePacific(tf.time);
              trip.sch_arr_dt = tpt;
              trip.sch_dep_dt = tpt;
              trip.pred_arr_dt = tpt;
              trip.pred_dep_dt = tpt;
              trip.trip_headsign = feed.data.predictionsData[i].destinations[i3].headsign
              trip.pred = "true";
              trip.veh_id = tf.vehicleId;
              if(feed.data.predictionsData[i].destinations[i3].directionId == "0") d0.trip.push(trip);
              else d1.trip.push(trip);
              let tt = new TTrip(trip.trip_id, trip.trip_name, d1.direction, "0123456");
              if(rt != null) rt.addTrip(tt);
            }
          }
          mode.route.push(r);
        }
        */
     }
     else report("2326 no LA feed");
//     report(JSON.stringify(t, null, 4));
//     resolve(t);
    }).catch( function(e) {
        reject(e);
    });    
    }); // end of top LAM promise
  }
  
  /*
  else if(bOnLine && (stop_id.indexOf("LAM") == 0))
  {
    let p = new Promise (function(resolve, reject){ 
    let tnf = 0;
    let tff = 0;
    let sid = "";
    let svc = "lametro-rail";
    let bRail = true;
    if(stop_id.indexOf("LAMB") == 0) 
    {
        sid = stop_id.substring(4);
        svc = "lametro";
        bRail = false;
    }
    else sid = stop_id.substring(3);
//    report("svc = " + svc + ", stop = " + sid + " " + stop_id);
//    serviceEO.getLAMPredictionsByStop(stop_id).then(function(fd) {
//    report("svc = " + svc + ", stop = " + sid + " " + stop_id);
    getRealTimeDataA(216, "&svc=" + svc + "&stop=" + sid).then(function(fd) {
     let feed = null;
     let bFeedError = false;
     if(fd != null)
     {
       try{
          feed = JSON.parse(fd);
//          report("2371 feed = " + JSON.stringify(feed, null, 4));
       }
       catch(e) {
          report(e + "\n" + fd);
          bFeedError = true;
       }; 
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
          if(fd != null)
          {
 //           report("2380 " + bFeedError + " t = " + JSON.stringify(t, null, 4));
            if(bFeedError) resolve(t);
            
 //            clearReport();
            if(bReport)report("feed =\n" + JSON.stringify(feed, null, 4));
            let k = feed.data.predictionsData.length;
            let i = 0;
            for(i = 0; i < k; i++) // for each predictions route
            {
              let a0 = feed.data.predictionsData[i];
              let route = "";
              if(bRail)
              {
                let rid = a0.routeId;
                if(rid == "801") route = "LAMA";
                else if(rid == "802") route = "LAMB";
                else if(rid == "803") route = "LAMC";
                else if(rid == "805") route = "LAMD";
                else if(rid == "804") route = "LAME";
                else if(rid == "807") route = "LAMK";
              }
              else route = "LAMB" + a0.routeName;
 //              report("2412 " + route );
 
              let k1 = a0.destinations.length;
              let i1 = 0;
              for(i1 = 0; i1 < k1; i1++)
              {
                let a1 = a0.destinations[i1];
                let dirid = a1.directionId;
                
                let k2 = a1.predictions.length;
                let i2 = 0;
                for(i2 = 0; i2 < k2; i2++)
                {
                  let a3a = a1.predictions[i2];
                  let ptrip_id = a3a.tripId.toString();
                  let ptrip_id2 = ptrip_id;
                  let ptrip_id3 = ptrip_id2;
                  let nn = ptrip_id2.indexOf("-");
                  if(nn != -1)
                  {
                     ptrip_id3 = ptrip_id2.substring(nn - 11, nn);
                     ptrip_id2 = "LAMB_" + ptrip_id2.substring(nn - 11, nn);  
                  }
                  else
                  {
                     ptrip_id2 = "LAM" + ptrip_id;   
                  }

                  let b = true;
                  let a = t.mode;
                  let kk = a.length;
                  let ii = 0;
                  while(b && (ii < kk))
                  {
                    let a3 = a[ii].route;
                    let k3 = a3.length;
                    let i3 = 0;
                    while(b && (i3 < k3))  // for each schedule route
                    {
//                      report("2424 " + a3[i3].route_id + " " + route);
                      if(a3[i3].route_id == route)
                      {
                        let a4 = a3[i3].direction;
                        let k4 = a4.length;
                        let i4 = 0;
                        while(b && (i4 < k4))
                        {
                          let a5 = a4[i4].trip;
                          let k5 = a5.length;
//                          report("2436 k5 = " + k5);
                          let i5 = 0;
                          while(b && (i5 < k5))
                          {
 //                           report("2437 " + a5[i5].trip_id + " " + ptrip_id);
                            if((typeof a5[i5] !== 'undefined') && (a5[i5] != null))
                            {
 //                             if(i5 == 1) report("2103 " + a5[i5].trip_id + " " + ptrip_id3);
                              let ttj = a5[i5];
                              if(a5[i5].trip_id.indexOf(ptrip_id3) != -1)
                              {
                                tff += 1;
                                b = false;
//                           let ttj = a5[i5];
                                let txx = a3a.time;
//                           ttj.pred_arr_dt = "\"" + Math.round(NOW / 1000) + Number(feed.items[i].seconds) + "\"";
                                ttj.pred_arr_dt = "\"" + a3a.time + "\"";
                                ttj.pred_dep_dt = ttj.pred_arr_dt;
                                ttj.pred = "true";
                              }
                              else if((ttj.pred_arr_dt < txx) && (ttj.pred_dep_dt < txx))
                              {
                                a5[i5] = null;   
                              }
                            }
                            i5 += 1;
                          }
                       
                          if(b && a4[i4].direction_id == dirid) // pred not in schedule
                          {
                            let trip = new Object();
                            trip.trip_id = ptrip_id2;
                            trip.trip_name = "LA Metro " + a1.headsign;
                            let tpt = getTimePacific(a3a.time);
                            trip.sch_arr_dt = tpt;
                            trip.sch_dep_dt = tpt;
                            trip.pred_arr_dt = tpt;
                            trip.pred_dep_dt = tpt;
                            trip.trip_headsign = a1.headsign;
                            trip.pred = "true";
                            trip.veh_id = a3a.vehicleId;
                            a5.push(trip);
                            let tt = new TTrip(trip.trip_id, trip.trip_name, dirid, "0123456");
                            let rt = serviceE.getRouteS(route);
                            if(rt != null) rt.addTrip(tt);
                          }
                          
                          i4 += 1;
                        }
                      }
                      i3 += 1;
                    }
                    ii += 1;
                  }
                  if(b)
                  {
                    tnf += 1;
//                report("LA Bus " + route + " trip " + ptrip_id + " unscheduled arrives in " + feed.items[i].minutes + " min");   
                  }
                }
              }
            }
          }

          else
          {
              
          }
//          report("2461 tnf = " + tnf + ", tff = " + tff);
          if(bReport)report("t = \n" + JSON.stringify(t, null, 4));
          resolve(t);
        }).catch(function(e) {
            reject("2731 " + e);
        });
           
      }
      else
      {
          reject("2356 " + e);
      }
    }).catch(function(e) { // no real time
          reject("2079 " + e);
      });
    });
  }
  */
   
  else if(bOnLine && (stop_id.indexOf("MTA") == 0))  
  {
    let p = new Promise (function(resolve, reject){ 
    checkLoadable(stop_id);
    getRealTimeDataA(706,  stop_id.substring(3)).then(function(feed) {
//        report("2805 " + JSON.stringify(feed, null, 4));
       let t = {
           stop_id: stop_id,
           stop_name: getStopFromID(stop_id),
           mode: []
       };
       t.mode.push({
           route_type: "3",
           mode_name: "Bus",
           route: []
       });
       
       let msv = feed.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit;
       if(typeof msv !== 'undefined')
       {
       let k = msv.length;
       let i = 0;
       for(i = 0; i < k; i++) // for each predicted trip
       {
         let a0 = msv[i];
         let routem = a0.MonitoredVehicleJourney.LineRef;
         let route_id = makeMTAroute_id(routem);
         let dir = a0.MonitoredVehicleJourney.DirectionRef;
         let headsign = a0.MonitoredVehicleJourney.DestinationName;
         let tid = a0.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
         let veh_id = a0.MonitoredVehicleJourney.VehicleRef.replace(" ", "_");
         
//         let r1 = tid.substring(0, tid.lastIndexOf("_"));
//         let r2 = r1.lastIndexOf("_");
//         let tripid = "MTA_" + tid.substring(r2+1);
         let tripid = makeMTAtrip_id(route_id,veh_id);
//         report("2842 trip_id = " + tripid);
         let tarrp = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;
         let tarrs = a0.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime;
         let tdepp = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime;
         let tdeps = a0.MonitoredVehicleJourney.MonitoredCall.AimedDepartureTime;
         if(tarrp != null) tarrp = getTimefromCTABus(tarrp); 
         if(tarrs != null) tarrs = getTimefromCTABus(tarrs); 
         if(tdepp != null) tdepp = getTimefromCTABus(tdepp); 
         if(tdeps != null) tdeps = getTimefromCTABus(tdeps); 
                
         let aroute = serviceE.getRoute(route_id);
         if(aroute == null)
         {
           report("2844 aroute null for " + route_id);
           resolve(t);
         }
         let trip = new Object();
         trip.trip_id = tripid;
         trip.trip_name = "MTA Bus " + a0.MonitoredVehicleJourney.PublishedLineName;
         trip.tid = tid;
         trip.sch_arr_dt = tarrs;
         trip.sch_dep_dt = tdeps;
         trip.pred_arr_dt = tarrp;
         trip.pred_dep_dt = tdepp;
         trip.trip_headsign = headsign;
         trip.pred = "true";
         trip.veh_id = a0.MonitoredVehicleJourney.VehicleRef;
         let occ =  a0.MonitoredVehicleJourney.Occupancy;
         if(occ == null) ;
         else if(occ == "seatsAvailable") trip.ostat = 1;
         else if(occ == "standingAvailable") trip.ostat = 3;
         else if(occ == "full") trip.ostat = 5;
         if((typeof a0.MonitoredVehicleJourney.OnwardCalls !== 'undefined') && (typeof a0.MonitoredVehicleJourney.OnwardCalls.OnwardCall !== 'undefined'))
         {
           let a7 = a0.MonitoredVehicleJourney.OnwardCalls.OnwardCall;
           let kl = a7.length;
           trip.trip_dest = a7[kl - 1].StopPointRef.replace("_","");
         }
                
         let b9 = true;
         let a = t.mode;
         let kk = a.length;
         let ii = 0;
         while(b9 && (ii < kk))
         {
           let a3 = a[ii].route;
           let k3 = a3.length;
           let i3 = 0;
           while(b9 && (i3 < k3))  // for each schedule route
           {
 //                  report("2424 " + a3[i3].route_id + " " + route);
             if(a3[i3].route_id == route_id)
             {
               let a4 = a3[i3].direction;
               a4[dir].trip.push(trip);
               let tt = new TTrip(trip.trip_id, trip.trip_name, dir, "");
               aroute.addTrip(tt);
               b9 = false;
             }
             i3 += 1;
           }
           ii += 1;
        }
        if(b9)
        {
          let nr = {
              route_id: route_id,
              route_name: aroute.route_name,
              direction:[]
          };
          let d0 = {
              direction_id: "0",
              direction_name: "",
              trip: []
          };
          nr.direction.push(d0);
          let d1 = {
              direction_id: "1",
              direction_name: "",
              trip: []
          };
          nr.direction.push(d1);
          if(dir == "0") d0.trip.push(trip);
          else d1.trip.push(trip);
          t.mode[0].route.push(nr);
        }
          
       }
       } 
       DT0Alerts = getMTABusAlertsFromFeed(feed);
//       if(bReport) report("t = \n" + JSON.stringify(t, null, 4));
       resolve(t); 
    }).catch(function(e) {
        report("2806 " + e);
        reject(e);
    });
    });  
  }
  
//  else if(bOnLine && (stop_id.indexOf("SFB_") == 0)) 
  else if(bOnLine && ((stop_id.indexOf("SF_") == 0) || (stop_id.indexOf("SFB_") == 0))) 
  {
    let p = new Promise (function(resolve, reject){ 
    let tnf = 0;
    let tff = 0;
    let scode = "";
    let svcode = "SF";
    let bRail = true;
    checkLoadable(stop_id);
    /*
    if(stop_id.indexOf("SFB_") == 0) 
    {
//        scode = "1" + stop_id.substring(4);
        scode = stop_id.substring(4);
        bRail = false;
    }
    else scode = stop_id.substring(3);
//    report("2796 scode = " + scode + ", stop = " + stop_id  + " " + bRail);
    sSFMTA = "&svc=" + svcode + "&stop=" + scode;
    if(SUB[53] != null)
    {
      let ctime = SUBTS[53];
      if((ctime == null) || (dtime - ctime) > 450) // was 900
      {
        queueSUB(53);
      }
    }
    else queueSUB(53);
   */
 //    getRealTimeDataA(219, "&svc=" + svcode + "&stop=" + scode).then(function(fd) {
    let feed = SUB[53];
    feed = null;
    let bFeedError = false;
//    let fd = SUB[53];
    if(feed != null)
    {
        /*
       try{
          feed = JSON.parse(fd);
//          report("2371 feed = " + JSON.stringify(feed, null, 4));
       }
       catch(e) {
          report("3323 " + e + "\n" + fd);
          bFeedError = true;
       }; 
       */
       let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
          if(feed != null)
          {
//            report("2940 " + bFeedError + " t = " + JSON.stringify(t, null, 4));
            if(bFeedError) resolve(t);
            
 //            clearReport();
//            if(bReport) 
//            report("3219 feed =\n" + JSON.stringify(feed, null, 4));
            let msv = feed.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
            let k = msv.length;
            let i = 0;
            for(i = 0; i < k; i++) // for each predicted trip
            {
              let a0 = msv[i];
              let routem = a0.MonitoredVehicleJourney.LineRef;
//               report("2581 " + routem );
              let tripidpre = "SFB_";
              let route = "SFB_" + routem;
              if(bRail) 
              {
                  tripidpre = "SF_";
                  route = "SF_" + routem;
              }
              let btid = false;
//              report("3253 bRail = " + bRail);
              let tripid = a0.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
              if(!combineSF(a0, t, tripid) && !bRail)
              {   // add trip
                let routem = a0.MonitoredVehicleJourney.LineRef;
//                report("2800 routem = " + routem);
                let aroute = serviceE.getRouteS(route);
                if(aroute != null)
                {
                let destid = a0.MonitoredVehicleJourney.DestinationRef.substring(1);
//                let tripid = "SF_" + a0.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
                let headsign = a0.MonitoredVehicleJourney.DestinationName;
                let veh_id = a0.MonitoredVehicleJourney.VehicleRef; // 1001
                let tarrp = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;
                let tarrs = a0.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime;
                let tdepp = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime;
                let tdeps = a0.MonitoredVehicleJourney.MonitoredCall.AimedDepartureTime;
                if(tarrp != null) tarrp = getTimefromCTABus(tarrp) -25200;
                if(tarrs != null) tarrs = getTimefromCTABus(tarrs) -25200;
                if(tdepp != null) tdepp = getTimefromCTABus(tdepp) -25200;
                if(tdeps != null) tdeps = getTimefromCTABus(tdeps) -25200;
                
                let trip = new Object();
                trip.trip_id = tripid;
                trip.trip_name = "SF Muni Bus " + routem;
                trip.sch_arr_dt = tarrs;
                trip.sch_dep_dt = tdeps;
                trip.pred_arr_dt = tarrp;
                trip.pred_dep_dt = tdepp;
                trip.trip_headsign = headsign;
                trip.pred = "true";
                trip.veh_id = a0.MonitoredVehicleJourney.VehicleRef;
                let occ =  a0.MonitoredVehicleJourney.Occupancy;
                if(occ == null) ;
                else if(occ == "seatsAvailable") trip.ostat = 1;
                else if(occ == "standingAvailable") trip.ostat = 3;
                else if(occ == "full") trip.ostat = 5;
                let dir = getDirectionByDestId(destid, aroute);                                                                    
//                report("3084 " + tripid + " " + routem + " " + dir + " " + aroute.route_id); 
                
                let b9 = true;
                let a = t.mode;
                let kk = a.length;
                let ii = 0;
                while(b9 && (ii < kk))
                  {
                    let a3 = a[ii].route;
                    let k3 = a3.length;
                    let i3 = 0;
                    while(b9 && (i3 < k3))  // for each schedule route
                    {
 //                  report("2424 " + a3[i3].route_id + " " + route);
                      if(a3[i3].route_id == aroute.route_id)
                      {
                        let a4 = a3[i3].direction;
                        a4[dir].trip.push(trip);
                        let tt = new TTrip(trip.trip_id, trip.trip_name, dir, "");
                        aroute.addTrip(tt);
                        b9 = false;
                      }
                      i3 += 1;
                    }
                    ii += 1;
                  }

                } 
              } 
            }
          }
          else
          {
            report("2678 got here");  
          }
//          report("2461 tnf = " + tnf + ", tff = " + tff);
          if(bReport)report("t = \n" + JSON.stringify(t, null, 4));
          resolve(t);
        }).catch(function(e) {
            reject("2872 " + e);
        }); 
           
    }
    else
    {
//        report("3030 " + stop_id);
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
             resolve(t);
         }).catch(function(e) {
              reject("2356 " + e);
         });
    }
 //   }).catch(function(e) { // no real time
 //         reject("2079 " + e);
 //     });
    });
  }
  else if(bOnLine && (stop_id.indexOf("SF_") == 0))  
  {
    let p = new Promise (function(resolve, reject){ 
    let tnf = 0;
    let tff = 0;
    let svcode = "SF";
    let bRail = true;
    checkLoadable(stop_id);
    let scode = stop_id.substring(3);
//    report("2796 scode = " + scode + ", stop = " + stop_id  + " " + bRail);
    let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
//        report("3188 " + JSON.stringify(t, null, 4));
        resolve(t);
    }).catch(function(e) {
           reject("3206 " + e);
    });
        
/*        
        let p3 = getRealTimeDataA(219, "&svc=" + svcode + "&stop=" + scode).then(function(fd) {
     let feed = null;
     let bFeedError = false;
     if(fd != null)
     {
       try{
          feed = JSON.parse(fd);
//          report("2371 feed = " + JSON.stringify(feed, null, 4));
       }
       catch(e) {
          report(e + "\n" + fd);
          bFeedError = true;
       }; 
       let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
           resolve(t);
       }).catch(function(e) {
           reject("3206 " + e);
       });
           
          if(fd != null)
          {
//            report("2940 " + bFeedError + " t = " + JSON.stringify(t, null, 4));
            if(bFeedError) resolve(t);
            
 //            clearReport();
            if(bReport) report("feed =\n" + JSON.stringify(feed, null, 4));
            let msv = feed.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
            let k = msv.length;
            let i = 0;
            for(i = 0; i < k; i++) // for each predicted trip
            {
              let a0 = msv[i];
              let routem = a0.MonitoredVehicleJourney.LineRef;
//               report("2581 " + routem );
              let tripid = "SFB_";
              let route = "SFB_" + routem;
              if(bRail) 
              {
                  tripid = "SF_";
                  route = "SF_" + routem;
              }
              let btid = false;
              tripid += a0.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
              if(!combineSF(a0, t, tripid))
              {   // add trip
                let routem = a0.MonitoredVehicleJourney.LineRef;
//                report("2800 routem = " + routem);
                let aroute = serviceE.getRouteS(route);
                if(aroute != null)
                {
                let destid = a0.MonitoredVehicleJourney.DestinationRef.substring(1);
                let tripid = "SF_" + a0.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
                let headsign = a0.MonitoredVehicleJourney.DestinationName;
                let veh_id = a0.MonitoredVehicleJourney.VehicleRef; // 1001
                let tarrp = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;
                let tarrs = a0.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime;
                let tdepp = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime;
                let tdeps = a0.MonitoredVehicleJourney.MonitoredCall.AimedDepartureTime;
                if(tarrp != null) tarrp = getTimefromCTABus(tarrp) -25200;
                if(tarrs != null) tarrs = getTimefromCTABus(tarrs) -25200;
                if(tdepp != null) tdepp = getTimefromCTABus(tdepp) -25200;
                if(tdeps != null) tdeps = getTimefromCTABus(tdeps) -25200;
                
                let trip = new Object();
                trip.trip_id = tripid;
                trip.trip_name = "SF Muni Bus " + routem;
                trip.sch_arr_dt = tarrs;
                trip.sch_dep_dt = tdeps;
                trip.pred_arr_dt = tarrp;
                trip.pred_dep_dt = tdepp;
                trip.trip_headsign = headsign;
                trip.pred = "true";
                trip.veh_id = a0.MonitoredVehicleJourney.VehicleRef;
                let occ =  a0.MonitoredVehicleJourney.Occupancy;
                if(occ == null) ;
                else if(occ == "seatsAvailable") trip.ostat = 1;
                else if(occ == "standingAvailable") trip.ostat = 3;
                else if(occ == "full") trip.ostat = 5;
                let dir = getDirectionByDestId(destid, aroute);                                                                    
//                report("3084 " + tripid + " " + routem + " " + dir + " " + aroute.route_id); 
                
                let b9 = true;
                let a = t.mode;
                let kk = a.length;
                let ii = 0;
                while(b9 && (ii < kk))
                  {
                    let a3 = a[ii].route;
                    let k3 = a3.length;
                    let i3 = 0;
                    while(b9 && (i3 < k3))  // for each schedule route
                    {
 //                  report("2424 " + a3[i3].route_id + " " + route);
                      if(a3[i3].route_id == aroute.route_id)
                      {
                        let a4 = a3[i3].direction;
                        a4[dir].trip.push(trip);
                        let tt = new TTrip(trip.trip_id, trip.trip_name, dir, "");
                        aroute.addTrip(tt);
                        b9 = false;
                      }
                      i3 += 1;
                    }
                    ii += 1;
                  }

                } 
              } 
            }
          }
          else
          {
            report("2678 got here");  
          }
//          report("2461 tnf = " + tnf + ", tff = " + tff);
          if(bReport)report("t = \n" + JSON.stringify(t, null, 4));
          resolve(t);
        }).catch(function(e) {
            reject("2872 " + e);
        }); 
           
     }
     else
     {
        report("3030 " + stop_id);
         let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
             resolve(t);
         }).catch(function(e) {
              reject("2356 " + e);
         });
     }
    }).catch(function(e) { // no real time
          reject("2079 " + e);
      });
    */
    });
  }
  else if(bOnLine && (stop_id.indexOf("CAL") == 0)) 
  {
    let p = new Promise (function(resolve, reject){ 
    let tnf = 0;
    let tff = 0;
    let scode = stop_id.substring(3);
     getRealTimeDataA(219, "&svc=CT&stop=" + scode).then(function(fd) {
     let feed = null;
     let bFeedError = false;
     if(fd != null)
     {
       try{
          feed = JSON.parse(fd);
//          report("2371 feed = " + JSON.stringify(feed, null, 4));
       }
       catch(e) {
          report(e + "\n" + fd);
          bFeedError = true;
       }; 
       let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
          if(fd != null)
          {
 //           report("2380 " + bFeedError + " t = " + JSON.stringify(t, null, 4));
            if(bFeedError) resolve(t);
            
 //            clearReport();
            if(bReport)
                report("feed =\n" + JSON.stringify(feed, null, 4));
            let msv = feed.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
            let k = msv.length;
            let i = 0;
            for(i = 0; i < k; i++) // for each predicted trip
            {
              let a0 = msv[i];
              let rsn = a0.MonitoredVehicleJourney.LineRef;
              let tripid = "CAL" + a0.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
              let trip = getTripInScheduleByStop(tripid, t, false);
              if(trip != null)
              {
                let eat = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;
                let edt = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime;
//                report("3048 " + eat + " " + edt);
                if((eat != null) || (edt != null))
                { 
                  trip.pred = "true";
                  if(eat != null)
                  {
                    let pt1 = getTimefromCTA(eat);
                    pt1 -= 10800;
                    trip.pred_arr_dt =  pt1;
//                     report("3055 " + trip.sch_arr_dt + " " + trip.pred_arr_dt) + " " + eat;
                  }
                  if(edt != null)
                  {
                    let pt2 = getTimefromCTA(edt);
                    pt2 -= 10800;
                    trip.pred_dep_dt = pt2;
 //                    report("3061 " + trip.sch_dep_dt + " " + trip.pred_dep_dt) + " " + edt;
                 }
                }
 //                             else if((ttj.pred_arr_dt < txx) && (ttj.pred_dep_dt < txx))
 //                             {
 //                               a5[i5] = null;   
 //                               }
                trip.veh_id = a0.MonitoredVehicleJourney.VehicleRef;
                trip.veh_lat = a0.MonitoredVehicleJourney.VehicleLocation.Latitude;
                trip.veh_lon = a0.MonitoredVehicleJourney.VehicleLocation.Longitude;
              }
              else // add a trip
              {
              /*
                       
                          if(b && a4[i4].direction_id == dirid) // pred not in schedule
                          {
                            let trip = new Object();
                            trip.trip_id = ptrip_id2;
                            trip.trip_name = "LA Metro " + a1.headsign;
                            let tpt = getTimePacific(a3a.time);
                            trip.sch_arr_dt = tpt;
                            trip.sch_dep_dt = tpt;
                            trip.pred_arr_dt = tpt;
                            trip.pred_dep_dt = tpt;
                            trip.trip_headsign = a1.headsign;
                            trip.pred = "true";
                            trip.veh_id = a3a.vehicleId;
                            a5.push(trip);
                            let tt = new TTrip(trip.trip_id, trip.trip_name, dirid, "0123456");
                            let rt = serviceE.getRouteS(route);
                            if(rt != null) rt.addTrip(tt);
                          }
                */
              }
            }
          }
          else
          {
              
          }
//          report("2461 tnf = " + tnf + ", tff = " + tff);
          if(bReport)report("t = \n" + JSON.stringify(t, null, 4));
          resolve(t);
        }).catch(function(e) {
            reject("3109 " + e);
        });
           
      }
      else
      {
         let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
             resolve(t);
         }).catch(function(e) {
              reject("3118 " + e);
         });
      }
    }).catch(function(e) { // no real time
          reject("3122 " + e);
      });
    });
  }
  else if(bOnLine && (stop_id.indexOf("SMART") == 0)) 
  {
    let p = new Promise (function(resolve, reject){ 
    let tnf = 0;
    let tff = 0;
    let scode = stop_id.substring(5);
     getRealTimeDataA(219, "&svc=SA&stop=" + scode).then(function(fd) {
     let feed = null;
     let bFeedError = false;
     if(fd != null)
     {
       try{
          feed = JSON.parse(fd);
//          report("2371 feed = " + JSON.stringify(feed, null, 4));
       }
       catch(e) {
          report(e + "\n" + fd);
          bFeedError = true;
       }; 
       let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
          if(fd != null)
          {
 //           report("2380 " + bFeedError + " t = " + JSON.stringify(t, null, 4));
            if(bFeedError) resolve(t);
            
 //            clearReport();
            if(bReport)
                report("feed =\n" + JSON.stringify(feed, null, 4));
            let msv = feed.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
            let k = msv.length;
            let i = 0;
            for(i = 0; i < k; i++) // for each predicted trip
            {
              let a0 = msv[i];
              let rsn = a0.MonitoredVehicleJourney.LineRef;
              let tid =  a0.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
              let trip = getTripInScheduleByStop(tid, t, false);
 //             report("3163 " + tid + " " + trip);
              if(trip != null)
              {
                let eat = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;
                let edt = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime;
//                report("3048 " + eat + " " + edt);
                if((eat != null) || (edt != null))
                { 
                  trip.pred = "true";
                  if(eat != null)
                  {
                    let pt1 = getTimefromCTA(eat);
                    pt1 -= 10800;
                    trip.pred_arr_dt = "\"" + pt1 + "\"";
//                     report("3055 " + trip.sch_arr_dt + " " + trip.pred_arr_dt) + " " + eat;
                  }
                  else trip.pred_arr_dt = 0;
                  if(edt != null)
                  {
                    let pt2 = getTimefromCTA(edt);
                    pt2 -= 10800;
                    trip.pred_dep_dt = pt2;
 //                    report("3061 " + trip.sch_dep_dt + " " + trip.pred_dep_dt) + " " + edt;
                 }
                 else trip.pred_dep_dt = trip.pred_arr_dt;
                 if(trip.pred_arr_dt == 0) trip.pred_arr_dt = trip.pred_dep_dt;
                }
 //                             else if((ttj.pred_arr_dt < txx) && (ttj.pred_dep_dt < txx))
 //                             {
 //                               a5[i5] = null;   
 //                               }
                trip.veh_id = a0.MonitoredVehicleJourney.VehicleRef;
                trip.veh_lat = a0.MonitoredVehicleJourney.VehicleLocation.Latitude;
                trip.veh_lon = a0.MonitoredVehicleJourney.VehicleLocation.Longitude;
              }
            }
          }
          else
          {
              
          }
//          report("2461 tnf = " + tnf + ", tff = " + tff);
          if(bReport)report("t = \n" + JSON.stringify(t, null, 4));
          resolve(t);
        }).catch(function(e) {
            reject("3204 " + e);
        });
           
      }
      else
      {
         let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
             resolve(t);
         }).catch(function(e) {
              reject("2356 " + e);
         });
      }
    }).catch(function(e) { // no real time
          reject("2079 " + e);
      });
    });
  }
 
  else if(bOnLine && (stop_id.indexOf("AMS") == 0)) 
  {
    p = new Promise (function(resolve, reject){ 
          if((!PBloaded) && (!PBloading))
          {
            loadpb();
          }
          else if((PBloaded) && (PBloading) && (GRB == null))
          {
            defineGRB(); 
          }

//          if(GRB == null) report("GRB is null");
    
          if((SUB[20] != null) && (typeof SUB[20].header !=='undefined'))
          {
            let ctime = getPBTime(SUB[20].header.timestamp);
            PredictionTime = SUB[20].header.timestamp;
            if((dtime - ctime) > 450) // was 900
            {
              queueSUB(20);
            }
          }
          else queueSUB(20);
                     
          
          let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
            if(SUB[20] != null)
            {
              let feed = null;
              feed = SUB[20];
//              report("3407 " + JSON.stringify(feed, null, 4));
//              if(bReport) 
//               report("3188 got feed for " + stop_id + " " + feed.header.timestamp.low + " " + dtime);
             combine(t, feed, "AMR_", "AMR", "AMS");
//           let routes = getRoutesS(stop_id);
            }  
//            else report("3192 feed is null");
//            if(bReport)
//                report("3415 " + JSON.stringify(t, null, 4)); //bp0
            resolve(t);
            }); /*.catch(function(e) {
                console.trace();
                reject("2903 "+ e);
            }); */
    });
  }
  else if(bOnLine && (stop_id.indexOf("AMS") == 0)) 
  {
    p = new Promise (function(resolve, reject){ 
          if((SUB[44] != null) && (typeof SUB[44].header !== 'undefined'))
          {
            let ctime = getPBTime(SUB[44].header.timestamp);
            if((dtime - ctime) > 450) // was 900
            {
              queueSUB(44);
            }
          }
          else queueSUB(44);
          
          let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
            if(SUB[44] != null)
            {
              let feed = SUB[44].entries;
              report("3438 feed.length = " + feed.length);
              report("3675 " +JSON.stringify(feed, null, 4));
            }
            resolve(t);
          }).catch(function(e) {
              
          });
            
            
    });
  }
  else if(bOnLine && (stop_id.indexOf("VIA") == 0)) 
  {
 //     report("2977 getPrediction VIA");
    p = new Promise (function(resolve, reject){ 
      if((!PBloaded) && (!PBloading))
      {
        loadpb();
      }
      else if((PBloaded) && (PBloading) && (GRB == null))
      {
        defineGRB(); 
      }

//          if(GRB == null) report("GRB is null");
    
      if((SUB[22] != null) && (typeof SUB[22].header !== 'undefined'))
      {
        let ctime = getPBTime(SUB[22].header.timestamp);
        PredictionTime = SUB[22].header.timestamp;
        if((dtime - ctime) > 900)
        {
          queueSUB(22);
        }
      }
      else queueSUB(22);
                     
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
            if(SUB[22] != null)
            {
              let feed = null;
              feed = SUB[22];
//              console.log(JSON.stringify(feed, null, 4));
//              if(bReport) 
//               report("got feed for " + stop_id + " " + feed.header.timestamp.low + " " + dtime);
//                report("3718: " + JSON.stringify(t, null, 4)); 
             combine(t, feed, "VIA", "VIA", "VIA");
//           let routes = getRoutesS(stop_id);
            }  
//            if(bReport) report("3723: " + JSON.stringify(t, null, 4)); 
            resolve(t);
            }); //.catch(function(e) {
     //           reject("3013 "+ e);
       //     });
     }); 
  }
/*  else if(bOnLine && (stop_id.indexOf("CAL7") == 0)) 
  {
      report("3250 getPrediction Caltrain");
    p = new Promise (function(resolve, reject){ 
      if((!PBloaded) && (!PBloading))
      {
        loadpb();
      }
      else if((PBloaded) && (PBloading) && (GRB == null))
      {
        defineGRB(); 
      }

//          if(GRB == null) report("GRB is null");
    
      if(SUB[23] != null)
      {
        let ctime = getPBTime(SUB[23].header.timestamp);
        if((dtime - ctime) > 900)
        {
          queueSUB(23);
        }
      }
      else queueSUB(23);
                     
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
            if(SUB[23] != null)
            {
              let feed = null;
              feed = SUB[23];
              console.log("3278: " + JSON.stringify(feed, null, 4));
//              if(bReport) 
//               report("got feed for " + stop_id + " " + feed.header.timestamp.low + " " + dtime);
             combine(t, feed, "CAL", "CAL", "CAL");
//           let routes = getRoutesS(stop_id);
            }  
            if(bReport) report(JSON.stringify(t, null, 4)); 
            resolve(t);
            }); //.catch(function(e) {
     //           reject("3013 "+ e);
       //     });
     }); 
  }
  */
 //           report("2380 " + bFeedError + " t = " + JSON.stringify(t, null, 4));
  else if(bOnLine && (stop_id.indexOf("SEP_") == 0)) 
  {
//      report("3248 getPrediction SEPTA");
    p = new Promise (function(resolve, reject){ 
      if((!PBloaded) && (!PBloading))
      {
        loadpb();
      }
      else if((PBloaded) && (PBloading) && (GRB == null))
      {
        defineGRB(); 
      }

//          if(GRB == null) report("GRB is null");
    
      if((SUB[24] != null) && (typeof SUB[24].header !== 'undefined'))
      {
//        report("3406 " + JSON.stringify(SUB[24], null, 4));
        let ctime = getPBTime(SUB[24].header.timestamp);
        if((dtime - ctime) > 900)
        {
          queueSUB(24);
        }
      }
      else queueSUB(24);
                     
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
            if(SUB[24] != null)
            {
              let feed = null;
              feed = SUB[24];
//              console.log("3277: " + JSON.stringify(feed, null, 4));
//              if(bReport) 
//               report("got feed for " + stop_id + " " + feed.header.timestamp.low + " " + dtime);
             combine(t, feed, "SEPTA_", "SEP_", "SEP_");
//           let routes = getRoutesS(stop_id);
            }  
//            if(bReport) report("3283: " + JSON.stringify(t, null, 4)); 
            resolve(t);
            }).catch(function(e) {
                report("3013 "+ e);
                reject("3013 "+ e);
            }); 
     }); 
  }
  else if(bOnLine && (stop_id.indexOf("TR") == 0)) 
  {
//      report("3826 getPrediction TRIRAIL");
    p = new Promise (function(resolve, reject){ 
      if((!PBloaded) && (!PBloading))
      {
        loadpb();
      }
      else if((PBloaded) && (PBloading) && (GRB == null))
      {
        defineGRB(); 
      }

//          if(GRB == null) report("GRB is null");
    
      if((SUB[47] != null) && (typeof SUB[47].header !== 'undefined'))
      {
//        report("3406 " + JSON.stringify(SUB[24], null, 4));
        let ctime = getPBTime(SUB[47].header.timestamp);
        PredictionTime = SUB[47].header.timestamp;
        if((dtime - ctime) > 900)
        {
          queueSUB(47);
        }
      }
      else queueSUB(47);
                     
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
            if(SUB[47] != null)
            {
              let feed = null;
              feed = SUB[47];
//              report("3855: " + JSON.stringify(feed, null, 4));
//              report("3856: " + JSON.stringify(t, null, 4));
//              if(bReport) 
//               report("got feed for " + stop_id + " " + feed.header.timestamp.low + " " + dtime);
             combine(t, feed, "TR", "TRR", "TR");
//           let routes = getRoutesS(stop_id);
            }  
//            if(bReport) report("3283: " + JSON.stringify(t, null, 4)); 
            resolve(t);
            }).catch(function(e) {
                reject("364 "+ e);
            });
     }); 
  }
  else if(bOnLine && (stop_id.indexOf("RIPT") == 0)) // RIPTA
  {
 //   if(bReport) report("AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
//    report("2398 getPredictionByStop " + stop_id);
      /*
    if((SUB[27] != null) && (typeof SUB[27].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[27].header.timestamp);
      PredictionTime = SUB[27].header.timestamp;
      if((dtime - ctime) > 3600)
      {
        queueSUB(27);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(27);
      }
    }
    else queueSUB(27);
    */
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
//          report("2415 "+ JSON.stringify(t, null, 4));
         if((SUB[27] != null) && (SUB[27].length > 150))
         {
           let feed = null;
           feed = SUB[27];
//           console.log(JSON.stringify(feed));
//           report("2574 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("3371 got RIPTA feed for " + feed.header.timestamp + " " + dtime);
      //     (t, feed, tripprefix, routeprefix, stopprefix)
           combine(t, feed, "RIPT", "RIPT", "RIPT");
         }
         resolve(t);
      });
    });
  }
  else if(bOnLine && (stop_id.indexOf("RTD_") == 0)) // RTD
  {
 //   if(bReport) 
//      report("3593 AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
    if((SUB[30] != null) && (SUB[30].header != null))
    {
      let ctime = Number(getPBTime(SUB[30].header.timestamp));
      PredictionTime = SUB[30].header.timestamp;
      let dt = dtime - ctime + 7200;
//    report("3384 getPredictionByStop " + stop_id + " " + dtime + " " + ctime + " " + dt);
      if((dt) > 3600)
      {
        queueSUB(30);
      }
      else if((dt) > 360)
      {
        queueSUB(30);
      }
    }
    else queueSUB(30);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
 //         report("2415 "+ JSON.stringify(t, null, 4));
//         report("3614 " + (SUB[30] != null)); // + " " + SUB[30].entity.length);
//      if(SUB[30] != null) report("3615 " + JSON.stringify(SUB[30], null, 4));
//         if((SUB[30] != null) && (SUB[30].entity.length != 0)) 
         if((SUB[30] != null) && (typeof SUB[30].entity !== 'undefined')) 
         {
           let feed = null;
           feed = SUB[30];
//           console.log(JSON.stringify(feed));
//           report("3602 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("3487 got RTD feed for " + feed.header.timestamp + " " + dtime);
      //     (t, feed, tripprefix, routeprefix, stopprefix)
           combine(t, feed, "RTD_", "RTD_", "RTD_");
         }
//         else report("3628 " + JSON.stringify(feed, null, 4));
         resolve(t);
      });
    });
  }
  else if(bOnLine && (stop_id.indexOf("WMA") == 0)) // WMATA
  {
 //   if(bReport) report("AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
    if((SUB[37] != null) && (typeof SUB[37].header !== 'undefined'))
    {
      let ctime = Number(getPBTime(SUB[37].header.timestamp));
      PredictionTime = SUB[37].header.timestamp;
      let dt = dtime - ctime; // + 7200;
//    report("3384 getPredictionByStop " + stop_id + " " + dtime + " " + ctime + " " + dt);
      if((dt) > 3600)
      {
        queueSUB(37);
      }
      else if((dt) > 360)
      {
        queueSUB(37);
      }
    }
    else queueSUB(37);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
 //         report("2415 "+ JSON.stringify(t, null, 4));
         if(SUB[37] != null)
         {
           let feed = null;
           feed = SUB[37];
//           console.log(JSON.stringify(feed));
//           report("2574 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("3487 got RTD feed for " + feed.header.timestamp + " " + dtime);
      //     (t, feed, tripprefix, routeprefix, stopprefix)
           combine(t, feed, "WMA", "WMA_", "WMA");
//           report("3661 "+ JSON.stringify(t, null, 4));
        }
         resolve(t);
      });
    });
  }
  else if(bOnLine && (stop_id.indexOf("MARC_") == 0)) // MARC
  {
 //   if(bReport) report("AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
    if((SUB[39] != null) && (typeof SUB[39].header !== 'undefined'))
    {
      let ctime = Number(getPBTime(SUB[39].header.timestamp));
      PredictionTime = SUB[39].header.timestamp;
      let dt = dtime - ctime; // + 7200;
//    report("3472 getPredictionByStop " + stop_id + " " + dtime + " " + ctime + " " + dt);
      if((dt) > 3600)
      {
        queueSUB(39);
      }
      else if((dt) > 360)
      {
        queueSUB(39);
      }
    }
    else queueSUB(39);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
//          report("2415 "+ JSON.stringify(t, null, 4));
         if(SUB[39] != null)
         {
           let feed = null;
           feed = SUB[39];
//           console.log(JSON.stringify(feed));
//           report("2574 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("3487 got MARC feed for " + feed.header.timestamp + " " + dtime);
      //     (t, feed, tripprefix, routeprefix, stopprefix)
           combine(t, feed, "MARC_", "MARC_", "MARC_");
         }
         resolve(t);
      });
    });
  }
  else if(bOnLine && (stop_id.indexOf("VRE") == 0)) // VRE
  {
 //   if(bReport) report("AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
//    report("2398 getPredictionByStop " + stop_id);
    if((SUB[33] != null) && (typeof SUB[33].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[33].header.timestamp);
      PredictionTime = SUB[33].header.timestamp;
      if((dtime - ctime) > 3600)
      {
        queueSUB(33);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(33);
      }
    }
    else queueSUB(33);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
//          report("2415 "+ JSON.stringify(t, null, 4));
          
         if(SUB[33] != null)
         {
           let feed = null;
           feed = SUB[33];
//           console.log(JSON.stringify(feed));
//           report("2574 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("3443 got VRE feed for " + feed.header.timestamp + " " + dtime);
           combine(t, feed, "VRE", "VRE", "VRE");
         }
//         else report("4058 feed null");
         
         resolve(t);
      });
    });
  }
  
  else if(bOnLine && (stop_id.indexOf("MSLB") == 0)) // MSLB
  {
 //   if(bReport) report("AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
//    report("4093 getPredictionByStop " + stop_id);
    
    if((SUB[49] != null) && (typeof SUB[49].entity !== 'undefined'))
    {
      let bx = true;
      let o1 = SUB[49].header;
      if(typeof o1 === 'undefined') bx = false;
      if(bx && typeof o1.timestamp === 'undefined') bx = false;
      if(bx)
      {
      let ctime = getPBTime(SUB[49].header.timestamp);
      PredictionTime = SUB[49].header.timestamp;
      if((dtime - ctime) > 3600)
      {
        queueSUB(49);
      }
      else if((dtime - ctime) > 480)
      {
        queueSUB(49);
      }
      }
    }
    else 
    {
//      if((SUBTS[49] == null) || ((dtime - SUBTS[49]) > 480))
      {
//      report("4107 SUB(49) is null");
        queueSUB(49); 
//        SUBTS[49] = getTTime();
      }
    }
    
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
//          report("4110 "+ JSON.stringify(t, null, 4));
          
         if(SUB[49] != null)
         {
           let feed = null;
           feed = SUB[49];
//           console.log(JSON.stringify(feed));
//           report("4118 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("4120 got MSL feed for " + feed.header.timestamp + " " + dtime);
           combine(t, feed, "", "MSLB", "MSLB");
         }
//         else report("4058 feed null");
         
         resolve(t);
      }); /*.catch(function(e) {
         report("4152 error " + e);
         reject("4153 error " + e);
      }); */
    });
  }
  
  else if(bOnLine && (stop_id.indexOf("CML") == 0)) // Metrolink
  {
 //   if(bReport) report("AS.getPredictionByStop " + PBloaded + " " + PBloading);
//    if(GRB == null) report("GRB is null");
//    report("3460 getPredictionByStop " + stop_id);
    if((SUB[35] != null) && (typeof SUB[35].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[35].header.timestamp);
      PredictionTime = SUB[35].header.timestamp;
      let dt = dtime - ctime + 10800;
//    report("3465 getPredictionByStop " + stop_id + " " + dtime + " " + ctime + " " + dt);
      if((dt) > 3600)
      {
        queueSUB(35);
      }
      else if((dt) > 120)
      {
        queueSUB(35);
      }
    }
    else queueSUB(35);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
//          report("2415 "+ JSON.stringify(t, null, 4));
         if(SUB[35] != null)
         {
           let feed = null;
           feed = SUB[35];
//           console.log(JSON.stringify(feed));
//           report("2574 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("3443 got VRE feed for " + feed.header.timestamp + " " + dtime);
      //     (t, feed, tripprefix, routeprefix, stopprefix)
           combine(t, feed, "CML", "LAML", "CML");
         }
         resolve(t);
      });
    });
  }
  else if(bOnLine && (stop_id.indexOf("BL_") == 0)) // Brightline
  {
//    report("3775 getPredictionByStop " + stop_id);
    if((SUB[43] != null) && (typeof SUB[43].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[43].header.timestamp);
      PredictionTime = SUB[43].header.timestamp;
      if((dtime - ctime) > 3600)
      {
        queueSUB(43);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(43);
      }
    }
    else queueSUB(43);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
//          report("2415 "+ JSON.stringify(t, null, 4));
//         report("3793 " + SUB[43] + " " + JSON.stringify(SUB[43], null, 4));
         if(SUB[43] != null)
         {
           let feed = null;
           feed = SUB[43];
//           report("3797: " + JSON.stringify(feed, null, 4));
//           report("2574 " + JSON.stringify(feed, null, 4));
//           if(bReport) 
//           report("3443 got VRE feed for " + feed.header.timestamp + " " + dtime);
//       combine(t, feed, tripprefix, routeprefix, stopprefix)
           combine(t, feed, "BL", "BL", "BL_");
         }
         resolve(t);
      });
    });
  }
  else
  {
    p = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase);
  }
  if(p == null) report("yes, p is null");
  return(p);
}

function combineSF(a0, t, trip_id)
{
  let tx = null;
  let b = true;
  let a = t.mode;
  let kk = a.length;
  let ii = 0;
  while(b && (ii < kk))
  {
    let a3 = a[ii].route;
    let k3 = a3.length;
    let i3 = 0;
    while(b && (i3 < k3))  // for each schedule route
    {
      let a4 = a3[i3].direction;
      let k4 = a4.length;
      let i4 = 0;
      while(b && (i4 < k4))
      {
        let a5 = a4[i4].trip;
        let k5 = a5.length;
        let i5 = 0;
        while(b && (i5 < k5))
        {
          if((typeof a5[i5] !== 'undefined') && (a5[i5] != null))
          {
            let ttj = a5[i5];
//            if(i5 == 0) report("3619  " + a5[i5].tid + " " + trip_id);
            if(a5[i5].tid == trip_id)
            {
              b = false;
              trip = a5[i5];
                let eat = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;
                let edt = a0.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime;
                if((eat != null) || (edt != null))
                { 
                  trip.pred = "true";
                  if(eat != null)
                  {
                    let pt1 = getTimefromCTA(eat);  
                    pt1 -= 10800; // 25200
                    trip.pred_arr_dt =  pt1;
                  }
                  if(edt != null)
                  {
                    let pt2 = getTimefromCTA(edt);
                    pt2 -= 10800;  // 25200
                    trip.pred_dep_dt = pt2;
                  }
                  if(eat == null) trip.pred_arr_dt = trip.pred_dep_dt;
                  else if(edt == null) trip.pred_dep_dt = trip.pred_arr_dt;
                }
                trip.veh_id = a0.MonitoredVehicleJourney.VehicleRef;
                trip.veh_lat = a0.MonitoredVehicleJourney.VehicleLocation.Latitude;
                trip.veh_lon = a0.MonitoredVehicleJourney.VehicleLocation.Longitude;
                let occ =  a0.MonitoredVehicleJourney.Occupancy;
                if(occ == null) ;
                else if(occ == "seatsAvailable") trip.ostat = 1;
                else if(occ == "standingAvailable") trip.ostat = 3;
                else if(occ == "full") trip.ostat = 5;
            }
            else if((typeof a5[i5] !== 'undefined') && ((a5[i5].tid == trip_id) || (a5[i5].tid == trip_id)))
            {
               b = false;
              tx = a5[i5];               
            }
          }
          i5 += 1;
        }
        i4 += 1;
      }
      i3 += 1;
    }
    ii += 1;
  }
  return(!b);
}

function getDirectionByDestId(destid, aroute)
{
  let dir = -1;
  let k = 0;
  let i = 0;
  if(aroute != null)
  {
    if((typeof aroute.stop_ids0 !== 'undefined') && (aroute.stop_ids0.length > 0)) 
    {
      k =  aroute.stop_ids0.length; 
      i = getIndexOfStop(destid, aroute.stop_ids0);
      if(i > k/2) dir = 0;
      else dir = 1;
    }
    else if((typeof aroute.stop_ids1 !== 'undefined') && (aroute.stop_ids1.length > 0))
    {
      k =  aroute.stop_ids1.length; 
      i = getIndexOfStop(destid, aroute.stop_ids1);
      if(i > k/2) dir = 0;
      else dir = 1;        
    }
    else if(aroute.stop_ids.length > 0)
    {
      k =  aroute.stop_ids.length; 
      i = getIndexOfStop(destid, aroute.stop_ids);
      if(i > k/2) dir = 0;
      else dir = 1;
    }
      
  }
  
  return(dir);
}

function getIndexOfStop(stopid, idarray)
{
  let n = -1;
  let b = false;
  let k = idarray.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(stopid == idarray[i])
    {
      b = true;
      n = i;
    }
    i += 1;
  }
  return(n);
}

function combine2(t, feed, bRail)
{
//    report("3443 " + bRail + "\n" + JSON.stringify(t, null, 4) + "\n\n" +JSON.stringify(feed, null,4));
  let k = feed.data.predictionsData.length;
//  report("4282 " + JSON.stringify(feed, null, 4) );
  let i = 0;
  for(i = 0; i < k; i++) // for each predictions route
  {
    let route = "";
    let tpfx = "LAMB_";
    let tnn = 7;
    if(bRail)
    {
      tpfx = "LAM";
      let rid = feed.data.predictionsData[i].routeId;
      tnn = 8;
      if(rid == "801") route = "LAMA";
      else if(rid == "802") route = "LAMB";
      else if(rid == "803") route = "LAMC";
      else if(rid == "805") route = "LAMD";
      else if(rid == "804") route = "LAME";
      else if(rid == "807") route = "LAMK";
    }
    else 
    {
      let nom = feed.data.predictionsData[i].routeId.indexOf("-");
      route = "LAMB" + feed.data.predictionsData[i].routeId.substring(0, nom);
    }
    
    let k3 = feed.data.predictionsData[i].destinations.length;
//    report("2852 k3 = " + k3 + " " + route);
    let i3 = 0;
    for(i3 = 0; i3 < k3; i3++)
    {
      if(typeof feed.data.predictionsData[i].destinations[i3] !== 'undefined')
      {
      let k4 = feed.data.predictionsData[i].destinations[i3].predictions.length;
      let i4 = 0;
      for(i4 = 0; i4 < k4; i4++)
      {
        let tf = feed.data.predictionsData[i].destinations[i3].predictions[i4];
        let tripid = tpfx + tf.tripId;
        let tid = tf.tripId;
        let nh = tf.tripId.indexOf("-");
        if(nh != -1)
        {
          tripid = tpfx + tf.tripId.substring(nh - tnn, nh);
          tid = tf.tripId.substring(nh - tnn, nh);
        }
//        report("4599 " + tid);
        let tA = getTripC(tripid, t);
//        let tA = getTripC(tid, t);
//        if(i4 == 0)
//        {
//          report("2901: " + tripid + " " + JSON.stringify(t, null, 4));     
//        }
//        report("2844 try to get tripid = " + tripid + " " + tf.tripId + " " + (tA != null));
        if(tA != null)
        {
//        report("2845 " + tA.trip_headsign + " :: " + tA.headsign + " " + tid);
//          report("2901: " + JSON.stringify(tA, null, 4));     
          let tpt = getTimePacific(tf.time);
          tpt = tpt.toString();
//          trip.sch_arr_dt = tpt;
//          trip.sch_dep_dt = tpt;
          tA.pred_arr_dt = tpt;
          tA.pred_dep_dt = tpt;
          tA.trip_headsign = feed.data.predictionsData[i].destinations[i3].headsign
          tA.pred = "true";
          tA.veh_id = tf.vehicleId;
        }
        else //if(false) // if no trip found add one
        {
//          report("3540 " + tripid + " " + tf.tripId + " " + tid);
          let ttj = null;
          let b = true;
          let a5 = null;
          let a = t.mode;
          let kk = a.length;
          let ii = 0;
          while(b && (ii < kk))
          {
            let a3 = a[ii].route;
            let k7 = a3.length;
            let i7 = 0;
            while(b && (i7 < k7))  // for each schedule route
            {
 //                  report("2424 " + a3[i7].route_id + " " + route);
              let feeddir = feed.data.predictionsData[i].destinations[i3].directionId;
              if(a3[i7].route_id == route)
              {
                let a4 = a3[i7].direction;
                let k8 = a4.length;
                let i8 = 0;
                while(b && (i8 < k8))
                {
//                    report("2907 " + feeddir + " " + a4[i8].direction_id);
                  if(feeddir == a4[i8].direction_id)
                  {
                    b = false;
                    a5 = a4[i8];
                  }
                  i8 += 1;
                }
              }
              i7 += 1;
            }
            ii += 1;
          }
          
          
            
          if((!b) && (typeof a5 !== 'undefined') && (a5 != null))
          {
            let trip = new Object();
//            trip.trip_id = "LAM" + tf.tripId + "_ADDED";
            trip.trip_id = tripid; // + "_ADDED";
//            trip.trip_name = "LA Metro " + feed.data.predictionsData[i].destinations[i3].headsign;
            trip.trip_name = "LA Metro " + feed.data.predictionsData[i].routeName;
            trip.parent_id = "LAMB" + feed.data.predictionsData[i].routeName;
            let tpt = getTimePacific(tf.time);
            tpt = tpt.toString();
            trip.sch_arr_dt = tpt;
            trip.sch_dep_dt = tpt;
            trip.pred_arr_dt = tpt;
            trip.pred_dep_dt = tpt;
            trip.status = "ADDED";
            trip.trip_headsign = feed.data.predictionsData[i].destinations[i3].headsign
            trip.pred = "true";
            trip.veh_id = tf.vehicleId;
            if(feed.data.predictionsData[i].destinations[i3].directionId == "0") a5.trip.push(trip);
            else a5.trip.push(trip);
            /*
            let tt = new TTrip(trip.trip_id, trip.trip_name, a5.direction_id, "0123456");
            tt.parent_id = "LAMB" + feed.data.predictionsData[i].routeName;
            let rt = serviceE.getRouteS(route);
            if(rt != null) rt.addTrip(tt);
            */
          }
          
        }
 //       else
 //       {
 //         report("2980 no match for " +    tripid + " " + tf.tripId);
 //       }
      }
      }
    }
  }
}

function getNJrailData(s)
{
  getRealTimeDataA(600, s).then(function(d) {
      SUB[45] = d;
      updateDisplay();
 //     report("4359 " + JSON.stringify(d, null, 4));
  }).catch(function(e) {
      report("4354 " + e);
  });
    
}

function getNJstopcode(stop_id)
{
  let r = null;
  if(typeof NJcodemap !== 'undefined') 
  {
    let b = true; 
    let k = NJcodemap.length;
    let i = 0;
    while(b && (i < k))
    {
      if(NJcodemap[i] == stop_id)
      {
        b = false;
        r = NJcodemap[i+2];
      }
      else i += 3;
    }
  }
  return(r);
}

function getNJstopid(stopcode)
{
  let r = null;
  if(typeof NJcodemap !== 'undefined') 
  {
    let b = true; 
    let k = NJcodemap.length;
    let i = 0;
    while(b && (i < k))
    {
      if(NJcodemap[i+2] == stopcode)
      {
        b = false;
        r = NJcodemap[i];
      }
      else i += 3;
    }
  }
  return(r);    
}

function getTripInScheduleByStop(tid, t, btid)
{
//    report("3539 " + JSON.stringify(t, null, 4));
//    report("3588 " + tid + " " + btid);
  let tripid = tid;
  let jj = -1;
  tripid = tripid.toString(); 
//  tripid = tripid.substring(0, 11);
//  report("3522 " + tripid);
  let tx = null;
  let b = true;
  let a = t.mode;
  let kk = a.length;
  let ii = 0;
  while(b && (ii < kk))
  {
    let a3 = a[ii].route;
    let k3 = a3.length;
    let i3 = 0;
    while(b && (i3 < k3))  // for each schedule route
    {
      let a4 = a3[i3].direction;
      let k4 = a4.length;
      let i4 = 0;
      while(b && (i4 < k4))
      {
        let a5 = a4[i4].trip;
        let k5 = a5.length;
        let i5 = 0;
        while(b && (i5 < k5))
        {
          if((typeof a5[i5] !== 'undefined') && (a5[i5] != null))
          {
            let ttj = a5[i5];
  //          if(i5 == 0) report("3619  " + a5[i5].trip_id + " " + tripid);
            if(!btid && (a5[i5].trip_id == tripid))
            {
              b = false;
              tx = a5[i5];
 //             report("3624 " + i5);
            }
            else if((typeof a5[i5] !== 'undefined') && ((a5[i5].tid == tripid) || (a5[i5].tid == tripid)))
            {
               b = false;
              tx = a5[i5];               
            }
          }
//          if(i5 == 0) report("3565 " + a5[i5].tid + " " + a5[i5].tid);
          i5 += 1;
        }
        i4 += 1;
      }
      i3 += 1;
    }
    ii += 1;
  }
  return(tx);
}


function elementInArray(e, A)
{
  let b = false;
  let k = A.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(e == A[i]) b = true;
    else i += 1;
  }
  return(b);
}

function getTimefromCTA(t)
{
 /* let bz = (t.indexOf("Z") != -1);
  let jt = t.indexOf(":");
  let jq = t.lastIndexOf(":");
  let hr = Number(t.substring(t.indexOf("T") + 1, jt));
  if(bz) 
  {
      if( hr < 5) hr += 19;
      else hr -= 5;
  }
//  if(bz) hr -= 11;
  let min = t.substring(jt + 1, jq);
  let sec = t.substring(jq + 1);
  let ju = sec.indexOf(".");
  if(ju != -1) sec = sec.substring(0,ju);
  */
// report("4144 " + t);
  let dx = new Date(t);
//  report(hr + " " + min + " " + sec + " " + TZD);
//  dx.setHours(Number(hr)); // + TZD );
//  dx.setMinutes(min);
//  dx.setSeconds(sec);
//  report(dx.toLocaleDateString() + " " + dx.toLocaleTimeString() + " " + dx.getTime());
       
  let tdep = Math.round(dx.getTime() / 1000);
  tdep = tdep.toString();
  return(tdep);  
}

function getTimefromCTABus(t)
{
  let i = t.indexOf(":");
  let hr = t.substring(i-2,i);
  let min = t.substring(i+1,i+3);
  let dx = new Date();
  dx.setHours(Number(hr)); // + TZD );
  dx.setMinutes(min);
  let tdep = Math.round(dx.getTime() / 1000);
  tdep = tdep.toString();
  return(tdep);    
}

function getTimePacific(t)
{
  return(Number(t) - (3 * 60 * 60));    
}

function getAMTripsByShortname(shortname, startdate)
{
  let tps = [];
  let routes = serviceE.routes;
  let k = routes.length;
  let i = 0;
  for(i = 0; i<k; i++)
  {
     if(routes[i].route_id.indexOf("AMR") == 0)
     {
       let sn = "";
       let trips = routes[i].trips; 
       let kk = trips.length;
       let ii = 0;
       for(ii = 0; ii<kk; ii++)
       {
         let m = 0;
         let tx = trips[ii];
         let j = tx.trip_name.indexOf("-");
         if(j == -1)
         {
//             report("3240 " + tx.trip_name );
           j = tx.trip_name.lastIndexOf(" ");
           let sn = tx.trip_name.substring(j+1);
           j = sn.indexOf("_Day");
           if(j != -1) 
           {
             m = Number(sn.substring(j+5, j+6)) - 1;
             sn = sn.substring(0, j);
           }
           let bux = true;
           
           if((typeof tx.startcdate !== 'undefined') && (tx.startcdate != null))
           {
             if(tx.startcdate == startdate) bux = true;
             else bux = false;
           }  
           
           if(bux && (shortname == sn))
           {
             let b = false;
             let mstartdate = adjustedCdate(AMRDFF, -m);
             if((startdate == mstartdate) && (tx.cal.isValidDate(tx.service_id, startdate, 0))) 
             {
               b = true;
             }
             if(b) tps.push(trips[ii]);
           }
         }
       }
     }
  }
//  if(tps.length == 0) report("3284 no trips match for " + shortname + " " + startdate + " " + AMRDFF);
  return(tps);
}

function fixNJtrack(stop_id, tr)
{
  let track = tr;
  if(stop_id == "NJ68") // Lebanon
  {
    if(tr == "Single") track = "1";  
  }
  else if(stop_id == "NJ83") // Metropark
  {
    if(tr == "2") track = "1";  
  }
  else if(stop_id == "NJ38081") //MSU
  {
    if(tr == "B") track = "2";  
    if(tr == "Single") track = "1";  
  }
  else if(stop_id == "NJ37953") // Newark Airport
  {
    if(tr == "0") track = "A";   
  }
  else if(stop_id == "NJ38174") // Secaucus Lower Level
  {
    if(tr == "4") track = "E";   
    if(tr == "2") track = "F";   
    if(tr == "3") track = "H";   
    if(tr == "1") track = "G";   
      
  }
  else if(stop_id == "NJ145") // Summit
  {
    if(tr == "Single") track = "S";   
  }
  return(track);
}

function combineNJ(t, feed, stop_id)
{
  let a = feed.ITEMS;
  let k = a.length;
//  report("4607 feed.ITEMS = " + k);
  let i = 0;
  for(i = 0; i<k; i++)
  {
    let item = a[i];
    let tid = item.TRAIN_ID; 
    let track = item.TRACK;
    track = fixNJtrack(stop_id, track);
    let os = -1;
    if(item.CAPACITY.length > 0)
    {
      let pct =  item.CAPACITY[0].CUR_PERCENTAGE;
      if(pct < 70) os = 1;
      else if(pct < 95) os = 3;
      else os = 5;
    }
    let status = item.STATUS;
    let tdep = item.SCHED_DEP_DATE;
    tdep = tdep.substring(tdep.indexOf(" ") + 1);
    let b = false;
    if(tdep.indexOf("PM") != -1) b = true;
    let hr = Number(tdep.substring(0, tdep.indexOf(":")));
    let min = Number(tdep.substring(tdep.indexOf(":") + 1,tdep.lastIndexOf(":")));
    let delay = item.SEC_LATE;
    let dmin = delay /60;
    min = Math.floor(min + dmin);
    let dh = Math.floor(min /60);
    min = (min % 60).toString();
    if(min.length == 1) min = "0" + min;
    if((b) && (hr != "12")) hr = hr + 12;
    hr = hr + dh;
    tdep= hr + ":" + min;
    let dt = new Date(NOW - TZPlatform * 60000);
//    dt.setFullYear(tbase.getFullYear());
//    dt.setMonth(tbase.getMonth());
//    dt.setDate(tbase.getDate());
    dt.setHours(0);
    dt.setMinutes(0);
    let d = Math.floor(dt.getTime() / 1000);

    tdep = d + getUtime(tdep);
//    report("4635 " + tid + " " + tdep + " track " + track +" occ = " +os);
    updatePredNJ(t, tid, stop_id, tdep, tdep, track, os);
   }
  return(t);
}


function combine(t, feed, tripprefix, routeprefix, stopprefix)
{
//  report("1978 combine " + feed.entity.length + " " + tripprefix);
  let kk = 0;
  if(typeof feed.entity != 'undefined') kk = feed.entity.length;
  let ii = 0;
  let bNotFirst = false;
  let stop_id = t.stop_id;
  let routes = getRoutesS(stop_id);
  let troutes = t.mode[0].route;
  let utrip = null;
  let idx = stop_id.substring(3);
  let bx = true;
  let bNoLIRRtrip = false;
  let bAMR = (routeprefix == "AMR");
  let bVIA = (routeprefix == "VIA");
  let bBART = (routeprefix == "B_");
  let bSEP = (routeprefix == "SEP_");
  let bMetra = (routeprefix == "ME_");
  let bRIPTA = (routeprefix == "RIPT");
  let bRTD = (routeprefix == "RTD_");
  let bVRE = (routeprefix == "VRE");
  let bMetrolink = (tripprefix == "CML");
  let bWMA = (routeprefix == "WMA_");
  let bMARC = (routeprefix == "MARC_");
  let bTR = (routeprefix == "TRR");
  let bBL = (routeprefix == "BL"); // Brightline
  let bMSL = (routeprefix == "MSLB");
  let bBARTadded = false;
  let tAX = null;
  let bDayOK = true;
  let shortname = "";
  let bXroute = false;
  let fh = feed.header;
  let gtfs_version = null;
  let trip = null;
  if(typeof fh !== 'undefined') 
  {
    gtfs_version = fh.gtfsRealtimeVersion;  // 1.0
    if(typeof gtfs_version === 'undefined')
    {
      gtfs_version = fh.gtfs_realtime_version; //2.0 
    }
  }
//  report("4376 "+ JSON.stringify(t, null, 4));
//  report("3082 gtfs_version = " + gtfs_version);
  for(ii = 0; ii < kk; ii++)
  {
    bNoLIRRtrip = false;
    let rr = null;
    let route_id = null;
    let f1 = feed.entity[ii];
 //   if(ii == 0) report("1885 " + f1.id + " " + f1.trip_update);
    let trip_id = tripprefix + f1.id; 
//    report("1908 " + trip_id + " " + tripprefix);
    if(tripprefix == "LI")
    {
      let tl = f1.id.length;
//      report("try get LIRR trip for " + f1.id.substring(0, tl-2) + " :" + f1);
      let th = "";
      if((f1.id.indexOf("_T") == f1.id.length -2) || (f1.id.indexOf("_V") == f1.id.length -2)) 
      {
        th =  f1.id.substring(0, tl-2);  
      }
      let tA = serviceE.getLIRRTripForTrip(th);
      if(tA == null) 
      {
          trip_id = tripprefix + th;
          bNoLIRRtrip = true;
//          report("5134 " + JSON.stringify(f1, null, 4));
          /*
          if(f1.trip_update != null)
          report("1632 No LIRR trip for " + trip_id + " " + f1.trip_update.trip.schedule_relationship);
          else report("1640 No LIRR trip for " + trip_id);
          */
 //         report("1640 No LIRR trip for " + trip_id)
      }
      else 
      {
          bNoLIRRtrip = false;
          trip_id = tA.trip_id;
 //         report("1637 got LIRR trip_id = " + trip_id);
      }
    }
    else if((tripprefix == "TR") || bMSL)
    {
      trip_id = tripprefix + f1.trip_update.trip.trip_id; 
    }
    else if(tripprefix == "B_")
    {
       bBARTadded = false;
//       tAX = serviceE.getBARTTripForTrip(f1.id, f1);
       tAX = getTripB(f1.id, t);
//       report("4419 " + f1.id + "\n" + JSON.stringify(t, null,4));
       if(tAX != null)
       {
         trip_id = tAX.trip_id;
//         rr = serviceE.getRouteS(tAX.parent_id);
//         report("3765  trip_id = "  + trip_id + " " + tAX.tid + " " + tAX.parent_id);
       }
       else 
       {
//           report("3775 no BART trip for tid " + f1.id + " " + trip_id);
//           bBARTadded = true;
       }
       if(rr == null) rr = getBartRouteForF1(f1);
       if(rr == null) report("4101 rr null for " + f1.id);
//       else report("4102 added trip " + f1.id + " to " + rr.route_id + " " + bBARTadded);
    }
    else if(tripprefix == "AMR_")
    {
      if(f1.trip_update != null)
      {
        trip_id = tripprefix + f1.trip_update.trip.trip_id;
//        report("3884 " + trip_id);
        route_id = routeprefix + f1.trip_update.trip.route_id;
        /*
        if(route_id == "AMR42947")
        {
          report("4385 OK");
          bXroute = true;
        }
        */
        let rr = serviceE.getRouteS(route_id);
        if(typeof rr === 'undefined')
        {
          rr = null;
          report("3344 rr was undefined for " + route_id);
        }
 //       let x1 = trip_id.lastIndexOf("AMTK_");
        let x1 = f1.id.lastIndexOf("AMTK_");
        let startdate = f1.trip_update.trip.start_date;
        shortname = "";
        if(x1 != -1)
        {
          shortname = trip_id.substring(x1 + 5) + " ";
 
        }
        if(startdate != AMRDFF)
        {
          let cdiff = 1 + getCDateDiff(AMRDFF, startdate);
          if(cdiff > 1) trip_id += "_Day_" + cdiff;
          
//          report("3375 " + trip_id + " " + cdiff + " " + AMRDFF + " " + startdate);
        }
//          report("3375 " + trip_id + " " + cdiff + " " + AMRDFF + " " + startdate);
      }
      else if(f1.vehicle != null)
      {
        trip_id = tripprefix + f1.vehicle.trip.trip_id;
        route_id = routeprefix + f1.vehicle.trip.route_id;
        let rr = serviceE.getRouteS(route_id);
        if(typeof rr === 'undefined')
        {
          rr = null;
          report("3917 rr was undefined for " + route_id);
        }
        let x1 = f1.id.lastIndexOf("AMTK_");
        let startdate = f1.vehicle.trip.start_date;
        shortname = "";
        if(x1 != -1)
        {
          let x2 = f1.id.lastIndexOf("_V");
          shortname = f1.id.substring(x1 + 5, x2) + " ";
 
        }
        if(startdate != AMRDFF)
        {
          let cdiff = 1 + getCDateDiff(AMRDFF, startdate);
          if(cdiff > 1) trip_id += "_Day_" + cdiff;
          
//          report("3375 " + trip_id + " " + cdiff + " " + AMRDFF + " " + startdate);
        }
      }
    }
    else if(tripprefix == "VIA")
    {
      if(f1.trip_update != null)
      {
        let tid = f1.trip_update.trip.trip_id;
        if(tid.indexOf("VIA") == 0)
        {
          trip_id = tid.replace("_", "");
          trip = getTripA(trip_id, t);
        }
        else
        {
          let routem = f1.trip_update.trip.route_id; 
          rr = getRouteForRouteM(routeprefix, routem);
          if(rr != null) route_id = rr.route_id;
          trip = getTripByTid(tid, rr);
          if(trip != null) trip_id = trip.trip_id;
          else trip_id = tripprefix + f1.trip_update.trip.trip_id;
        }
        let startdate = f1.trip_update.trip.start_date;
        if(startdate != AMRDFF)
        {
          let cdiff = 1 + getCDateDiff(AMRDFF, startdate);
          if(cdiff > 1) trip_id += "_Day_" + cdiff;
        }
//        report("3407 trip_id = " + trip_id  + " route_id = " + route_id + " routem = " + routem + " tid = " + tid ); //+ " rr.route_id = " + rr.route_id);
      }
    }
    else if(bMetra)
    {
      trip_id = tripprefix + f1.trip_update.trip.trip_id; 
      trip_id = trip_id.replace("-", "");
      route_id = routeprefix + f1.trip_update.trip.route_id;
      route_id = route_id.replace("-", "");
      rr = serviceE.getRouteS(route_id);
//      console.log("3934 trip_id = " + trip_id  + " route_id = " + route_id + " " + rr);
    }
    else if(bBL)
    {
      trip_id = tripprefix + f1.trip_update.trip.trip_id;
      route_id = routeprefix + f1.trip_update.trip.route_id;
      rr = serviceE.getRouteS(route_id);
//      report("4471 " + trip_id + " " + route_id + " " + rr.route_id);
      trip = getTripA(trip_id, t);
//      report("4473 " + JSON.stringify(trip, null, 4));
    }
   
//    report("3407 trip_id = " + trip_id  + " route_id = " + route_id);
//    if(f1.trip_update != null) report("1914 " + f1.trip_update.trip.schedule_relationship);
//    if(gtfs_version == "2.0")
    if(bSEP)
    {
      if(typeof f1.trip_update.stop_time_update !== 'undefined')
      {
//        report("5288 " + JSON.stringify(f1, null, 4));
        let tid = "SEPTA_" + f1.trip_update.trip.trip_id;
        let zlen = f1.trip_update.stop_time_update.length;
        let iz = 0;
        for(iz = 0; iz < zlen; iz++)
        {
          let delay = f1.trip_update.stop_time_update[iz].arrival.delay;
          utrip = updatePred3(t, trip_id, stop_id, delay, delay);
//      report("3901 " + stop_id + " " + tid + " " + delay);
        }
      }
    }
    else if(bMSL)
    {
      let a = f1.trip_update.stop_time_update;
      if((typeof a !== 'undefined') && (a != null))
      {
        let kw = a.length;
        let iw =0;
        let item = null;
        for(iw = 0; iw < kw; iw++)
        {
           item = a[iw];
//        a.forEach((item) => {
           let delay = 0;
           if(typeof item.departure.delay !== 'undefined') delay = item.departure.delay;
 //     report("5063 stop = " + stop_id + " trip = " + trip_id + " " + delay);
           utrip = updatePred3(t, "MSLB" + trip_id, stop_id, delay, delay);
 //     report("5065 stop = " + stop_id + " trip = " + trip_id + " " + delay);
 //       });
        }
      }
    }
    else if(bTR)
    {
      let zlen = f1.trip_update.stop_time_update.length;
      let iz = 0;
      for(iz = 0; iz < zlen; iz++)
      {
        let delay = f1.trip_update.stop_time_update[iz].arrival.delay;
        let stop_index = f1.trip_update.stop_time_update[iz].stop_sequence;
        utrip = updatePred3(t, trip_id, stop_index, delay, delay);
//      report("3901 " + stop_id + " " + tid + " " + delay);
      }
    }
    else if(bRIPTA)
    {
      trip_id = "RIPT" + f1.trip_update.trip.trip_id;
      let iz = 0;
      if(typeof f1.trip_update.stop_time_update !== 'undefined')
      {
      let zlen = f1.trip_update.stop_time_update.length;
      let delaya = "";
      let delayd = "";
      let bst = true;
      while(bst && (iz < zlen))
      {
        let stux = f1.trip_update.stop_time_update[iz];
        let stid = "RIPT" + stux.stop_id;
        if(stid == stop_id)
        {
          bst = false;
          delaya = "";
          delayd = "";
          if(typeof stux.arrival !== 'undefined')
          delaya = stux.arrival.delay;
          if(typeof stux.departure !== 'undefined')
          delayd = stux.departure.delay;
          utrip = updatePred3(t, trip_id, stop_id, delaya, delayd);
        }
        iz += 1;
//      report("3901 " + stop_id + " " + tid + " " + delay);
      }
      }
    }
    else if(bRTD)
    {
      let iuu = f1.trip_update.trip.trip_id.indexOf("_");
      trip_id = "RTD_" + f1.trip_update.trip.trip_id.substring(iuu + 1);
      let iz = 0;
      if(typeof f1.trip_update.stop_time_update !== 'undefined')
      {
      let zlen = f1.trip_update.stop_time_update.length;
      let ta = "";
      let td = "";
      let bst = true;
      while(bst && (iz < zlen))
      {
        let stux = f1.trip_update.stop_time_update[iz];
        let stid = "RTD_" + stux.stop_id;
 //       report("4553 " + stid + " " + stop_id);
        if(stid == stop_id)
        {
          bst = false;
          ta = "";
          td = "";
          if((typeof stux.arrival !== 'undefined') && (stux.arrival != null))
          {
            ta = stux.arrival.time - 120 * 60;
          }
          if((typeof stux.departure !== 'undefined') && (stux.departure != null))
          {
            td = stux.departure.time - 120 * 60;
          }
          else td = ta;
//          report("4169 " + JSON.stringify(stux, null, 4));
//          report("4169 " + stux.arrival.time + " " + stux.departure.time);
//          report("4170 " + ta + " : " + td);
          utrip = updatePred3(t, trip_id, stop_id, ta, td);
        }
        iz += 1;
//      report("3901 " + stop_id + " " + tid + " " + delay);
      }
      }
    }
    else if(bWMA)
    {
      trip_id = "WMA" + f1.trip_update.trip.trip_id;
      let iz = 0;
      let stopid = stop_id.substring(3);
      let dir = f1.trip_update.trip.direction_id;
      let route_id = "WMA_" + f1.trip_update.trip.route_id;
      let startc = f1.trip_update.trip.start_date;
      iz = trip_id.lastIndexOf("_");
      if(iz != -1) trip_id = trip_id.substring(0, iz);
      iz = 0;
      if(typeof f1.trip_update.stop_time_update !== 'undefined')
      {
        let zlen = f1.trip_update.stop_time_update.length;
        let ta = "";
        let td = "";
        let bst = true;
        while(bst && (iz < zlen))
        {
          let stux = f1.trip_update.stop_time_update[iz];
          let izz = -1;
          izz = stux.stop_id.indexOf("_");
          let stid = stux.stop_id.substring(3);
          izz = stid.indexOf("_");
          if(izz != -1) stid = stid.substring(0,izz);
//        if(iz == 0) report("4292 " + stid + " " + stop_id);
          if(stid == stopid)
          {
             let ot = new Object();
             ot.trip_id = trip_id;
             ot.trip_name = f1.trip_update.trip.route_id + " Line";
             let hs = f1.trip_update.stop_time_update[zlen -1].stop_id;
             hs = "WMA" + hs.substring(3, hs.length -2);
             ot.trip_headsign = getStopNameFromID(hs);
 //            report("4608 " + hs + " " + ot.trip_headsign);
             if(typeof stux.departure !== 'undefined')
             {
                 td = stux.departure.time;
             }
             if(typeof stux.arrival !== 'undefined')
             {
                 ta = stux.arrival.time;
             }
             if(td == "") td = ta;
             else if(ta == "") ta = td;
             ot.sch_arr_dt = ta;
             ot.sch_dep_dt = td;
             ot.pred_arr_dt = ta;
             ot.pred_dep_dt = td;
             ot.pred = "true";
             ot.parent_id = route_id;
             let bz = true;
             let i5 = 0;
             let k5 = t.mode[0].route.length;
             while(bz && (i5 < k5))
             {
               if(t.mode[0].route[i5].route_id == route_id)
               {
                 bz = false;
                 t.mode[0].route[i5].direction[dir].trip.push(ot);
               }
               i5 += 1;
             }
          }
          iz += 1; 
        }
      }
        
    }
    else if(bMARC)
    {
      trip_id = "MARC_" + f1.trip_update.trip.trip_id;
      let iz = 0;
      if(typeof f1.trip_update.stop_time_update !== 'undefined')
      {
      let zlen = f1.trip_update.stop_time_update.length;
      let ta = "";
      let td = "";
      let bst = true;
      while(bst && (iz < zlen))
      {
        let stux = f1.trip_update.stop_time_update[iz];
        let izz = -1;
        let stid = "MARC_" + stux.stop_id;
        izz = stid.indexOf("_");
//        if(iz == 0) report("4292 " + stid + " " + stop_id);
        if(stid == stop_id)
        {
          bst = false;
          ta = "";
          td = "";
          if((typeof stux.arrival !== 'undefined') && (stux.arrival != null))
          {
            ta = stux.arrival.time;
          }
          if((typeof stux.departure !== 'undefined') && (stux.departure != null))
          {
            td = stux.departure.time;
          }
          else td = ta;
          if(ta == "") ta = td;
//          report("4169 " + JSON.stringify(stux, null, 4));
//          report("4169 " + stux.arrival.time + " " + stux.departure.time);
//          report("4170 " + ta + " : " + td);
          utrip = updatePred3(t, trip_id, stop_id, ta, td);
        }
        iz += 1;
//      report("3901 " + stop_id + " " + tid + " " + delay);
      }
      }
    }
    else if(bMetrolink)
    {
      trip_id = "CML" + f1.trip_update.trip.trip_id;
      let iz = 0;
      let ts = Number(fh.timestamp);
      if(typeof f1.trip_update.stop_time_update !== 'undefined')
      {
      let zlen = f1.trip_update.stop_time_update.length;
      let ta = "";
      let td = "";
      let bst = true;
      while(bst && (iz < zlen))
      {
        let stux = f1.trip_update.stop_time_update[iz];
        let stid = "CML" + stux.stop_id;
        if(stid == stop_id)
        {
          bst = false;
          ta = "";
          td = "";
          if((typeof stux.arrival !== 'undefined') && (stux.arrival != null))
          {
            ta = Number(stux.arrival.time) - 3600 * 3; //27;
            if((ta - ts) > 43200) ta -= 3600 * 24;
          }
          if((typeof stux.departure !== 'undefined') && (stux.departure != null))
          {
            td = Number(stux.departure.time) - 60 * 60 * 3;  //27;
            if((td - ts) > 43200) td -= 3600 * 24;
         }
          else td = ta;
//          report("4169 " + JSON.stringify(stux, null, 4));
//          report("4169 " + stux.arrival.time + " " + stux.departure.time);
//          report("4170 " + ta + " : " + td + " " + trip_id);
          utrip = updatePred3(t, trip_id, stop_id, ta, td);
        }
        iz += 1;
//      report("3901 " + stop_id + " " + tid + " " + delay);
      }
      }
    }
    else if(bVRE)
    {
      trip_id = "VRE" + f1.trip_update.trip.trip_id;
      trip_id = trip_id.replace("-", "_");
      let iz = 0;
      if(typeof f1.trip_update.stop_time_update !== 'undefined')
      {
      let zlen = f1.trip_update.stop_time_update.length;
      let delaya = "";
      let delayd = "";
      let bst = true;
      while(bst && (iz < zlen))
      {
        let stux = f1.trip_update.stop_time_update[iz];
        let stid = "VRE" + stux.stop_id.substring(28);
//        if(iz == 0) report("5208 stid = " + stid + " "+ stop_id);
        if(stid == stop_id)
        {
          bst = false;
          delaya = "";
          delayd = "";
          if(typeof stux.arrival !== 'undefined')
          delaya = stux.arrival.delay;
          if(typeof stux.departure !== 'undefined')
          delayd = stux.departure.delay;
          utrip = updatePred3(t, trip_id, stop_id, delaya, delayd);
        }
        iz += 1;
//      report("3901 " + stop_id + " " + tid + " " + delay);
      }
      }
    }
    else if(bBL)
    {
      let stu = f1.trip_update.stop_time_update;
      if(stu != null)
      {
        let k3 = stu.length;
        let i3 = 0;
        let b = true;
        while(b && (i3 < k3))
        {
          let sid = "BL_" + stu[i3].stop_id;
//            if(i3 == k3 -1) report("1654 " + stop_id + " " + sid);
          if(stop_id == sid)
          {
            b = false;
            let tarr = null;
            let tdep = null;
            let track = "";
            let status1 = "";
            if(stu[i3].arrival != null) 
            {
              tarr = getPBTime(stu[i3].arrival.time);
            }
            
            if(stu[i3].departure != null) 
            {
              tdep = getPBTime(stu[i3].departure.time);                   
            }                    
            let tzfactor = 0;
            if((rr != null) && (rr.cal != null) && (sid.indexOf("Z_") != 0)) tzfactor = getTzFactor(getTZforStop(sid), rr.cal.gtfstz);
            if(tdep > 0) tdep = Number(tdep) + 3600 * tzfactor;
            if(tarr > 0) tarr = Number(tarr) + 3600 * tzfactor;
            utrip = updatePred(t, trip_id, stop_id, tarr, tdep, track); 
          }
          i3 += 1;
        }
      }
    }
    else if(!bSEP && !bRIPTA)
    {
 //       report("3965 " + trip_id);
    if((f1.trip_update != null) &&(f1.trip_update.trip.schedule_relationship == 6))
    {
//      console.log("3923 detected  schedule_relationship = 6 for " +  f1.trip_update.trip.trip_id + " " + trip_id);
      f1.trip_update.trip.schedule_relationship = 0;
    }
    
    if(f1.is_deleted)
    {
        
    }
    else if((f1.trip_update != null) && (f1.trip_update.trip.schedule_relationship == 3)) // 3 = cancelled
       {
//      report("3418 " + trip_id + " " + route_id);
      route_id = routeprefix + f1.trip_update.trip.route_id;
//      if(bAMR) trip_id = tripprefix + f1.trip_update.trip.trip_id;
//      report("3259 " + route_id + " " + trip_id);
      if(f1.trip_update.trip.route_id == null) route_id = "";
//      report("1643 " + route_id + " " + trip_id);
      if(rr == null) rr = serviceE.getRouteS(route_id);
      /*
      if(typeof rr === 'undefined')
      {
        rr = null;
        report("3426 rr is undefined for " + route_id);
      }
      */
//      report("3430 " + route_id + " " + trip_id + " " + tripIsInRoutes(trip_id, routes));
      if((routes.indexOf(route_id) != -1) || (tripIsInRoutes(trip_id, routes)))
      {
        let stu = f1.trip_update.stop_time_update;
        if(stu != null)
        {
          let k3 = stu.length;
          let i3 = 0;
          let b = true;
          while(b && (i3 < k3))
          {
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
 //           if(i3 == 0) report("1654 " + stop_id + " " + sid);
            if(stop_id == sid)
            {
              b = false;
              let tarr = null;
              let tdep = null;
//              report("1545  " + trip_id + " ");
              if(trip_id.indexOf("LI") == 0)
              {
                let trip = getTripA(trip_id, t);
                if(trip != null)
                {
                  trip.status = "Cancelled";
//                  report("1665 trip cancelled " + trip_id);
                  utrip = null;
                }
              }
              else
              {
                if(stu[i3].arrival != null) tarr = getPBTime(stu[i3].arrival.time);
                if(stu[i3].departure != null) tdep = getPBTime(stu[i3].departure.time);
                
                let tzfactor = 0;
                if((rr != null) && (rr.cal != null) && (sid.indexOf("Z_") != 0)) tzfactor = getTzFactor(getTZforStop(sid), rr.cal.gtfstz);
                if(tdep > 0) tdep = Number(tdep) + 3600 * tzfactor;
                if(tarr > 0) tarr = Number(tarr) + 3600 * tzfactor;

                utrip = updatePred(t, trip_id, stop_id, tarr, tdep, "");
//                report("1673 trip cancelled " + trip_id);
                if(utrip != null) utrip.status = "Cancelled";
              }
            }
            i3 += 1;
          }
          if(k3 == 0)
          {
            let tid2 = trip_id;
            let tripx = getTripA(tid2, t);
            if(tripx == null)
            {
              let j = tid2.indexOf("_Day");
              if(j != -1) 
              {
                tid2 = tid2.substring(0,j);
                tripx = getTripA(tid2, t);
        //    let tripx = rr.getTTrip(tid2);
              }
            }
            if(tripx != null)
            {
//              report("3492 cancelled " + trip_id);
              tripx.vstat = "Cancelled";
              tripx.status = "Cancelled";
//              utrip.vstat =  "Cancelled";
            }
          }
//          if(b) report("1698 trip cancelled " + trip_id);
        }
        else
        {
  
        }
      }
        
    }
    else if((f1.trip_update != null) && ((f1.trip_update.trip.schedule_relationship == 1) || 
        (f1.trip_update.trip.schedule_relationship == 2) ) || (bNoLIRRtrip &&(f1.trip_update != null)  && !bAMR && (f1.trip_update.trip.schedule_relationship == 0)) || bBARTadded) // 1 = added 2 = unscheduled
    {
 //     report("3938 " + f1.trip_update.trip.route_id.length + " " + rr.route_id );
      let route_id = routeprefix;
      let bAdded = (f1.trip_update.trip.schedule_relationship == 1) || bBARTadded;
      if((rr == null) && (routeprefix == "B_") && ((f1.trip_update.trip.route_id == null) ||(f1.trip_update.trip.route_id.length == 0)) )
      {
        let rc = getBartRouteForF1(f1);
        if(rc != null) route_id = rc.route_id;
 //       report("3946 " + route_id + " " + trip_id + " " + rc);
      }
      else if(f1.trip_update.trip.route_id != null) route_id += f1.trip_update.trip.route_id;
      else if((tAX != null) && (tAX.parent != null)) route_id = tAX.parent.route_id;
//      report("1689 " + route_id + " " + trip_id);
////      if(bAMR) trip_id = tripprefix + f1.trip_update.trip.trip_id;
      if(route_id == "B_") route_id = rr.route_id; 
//      report("3314 " + bAdded + " " + route_id + " " + trip_id + " " + routes + " " );
      if((routes.indexOf(route_id) != -1) || (tripIsInRoutes(trip_id, routes)) || bAdded)
      {
//          report("3480");
        let stu = f1.trip_update.stop_time_update;
        if(stu != null)
        {
          let k3 = stu.length;
          let i3 = 0;
          let b = true;
          trip = null;
          while(i3 < k3)
          {
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
//            if(i3 == 0) report("1654 " + stop_id + " " + sid);
            if(stop_id == sid)
            {
              trip = new Object();
//              trip.trip_id = trip_id;
              trip.tid = f1.trip_update.trip.trip_id; 
              if(f1.trip_update.trip.schedule_relationship == 1)
              {
                trip.trip_name = "ADDED " + shortname + " Trip " + trip_id;
                trip_id += "_Added";
              }
              else if(f1.trip_update.trip.schedule_relationship == 2)
              {
                 trip.trip_name = "Unscheduled Trip";                 
              }
              else if(f1.trip_update.trip.schedule_relationship == 0)
              {
                 trip.trip_name = "Route " + f1.trip_update.trip.route_id;
                 if(trip_id.indexOf("B_") == 0) 
                 {
                     trip.trip_name = rr.route_id.substring(2) + " Line";
                     trip_id += "_Added";
                 }
              }
              trip.trip_id = trip_id;
//              report("3544 new trip " + trip_id);
//              report("1732 " + route_id + " " + trip.trip_id + " " + trip.trip_name);
              let tarr = null;
              let tdep = null;
              trip.sch_arr_dt = "";
              trip.sch_dep_dt = "";
              if(stu[i3].arrival != null) tarr = getPBTime(stu[i3].arrival.time);
              if(stu[i3].departure != null) tdep = getPBTime(stu[i3].departure.time);
              
              if(sid.indexOf("B_") == 0)
              {
                if(tarr != null) tarr = getTimePacific(tarr);   
                if(tdep != null) tdep = getTimePacific(tdep);   
              } 
            
              let tzfactor = 0;
              if((rr != null) && (rr.cal != null) && (sid.indexOf("Z_") != 0)) tzfactor = getTimeZFactor(sid, rr); //getTzFactor(getTZforStop(sid), rr.cal.gtfstz);
//              report("5032 tzfactor =" + tzfactor + " " + rr.route_id + " " + rr.cal.gtfstz);
              if(tdep > 0) tdep = Number(tdep) + tzfactor;
              if(tarr > 0) tarr = Number(tarr) + tzfactor;

              let dest = stu[stu.length - 1].stop_id;
              let hs = getStopNameFromID(stopprefix + dest);
              if(bBART) hs = getBARTadjustedHeadsign(hs)
//              trip.trip_headsign = getStopNameFromID(stopprefix + dest);
              trip.trip_headsign = hs;
//                  trip.tid = atrip.tid;
              trip.sch_arr_dt = tarr;
              trip.sch_dep_dt = tdep;
              trip.pred_arr_dt = tarr;
              trip.pred_dep_dt = tdep;
              trip.pred = "true";
              if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
              {
                let track =  stu[i3].mta_railroad_stop_time_update.track;
                if(track != "") trip.track = track;
                let sts = stu[i3].mta_railroad_stop_time_update.trainStatus;
                if((typeof sts !== 'undefined') && (sts != ""))
                {
                  trip.status = sts;  
                }
              }
//              trip.parent = serviceE.getRouteS(route_id);   
              utrip = trip;
              
            }
            i3 += 1;
            if((trip != null) && (i3 == k3)) 
            {
                trip.headsign = getStopNameFromID(sid); 
//                report("1756 ADDED trip " + route_id + " " + trip.headsign + " " + trip.trip_id);
            }
          }

          let route = serviceE.getRouteS(route_id);
          let dir = f1.trip_update.trip.direction_id;
          if((dir == null) && (tAX != null)) dir = tAX.direction;
          if((trip == null) && (tAX != null)) trip = tAX;
          if(route == null) ; //report("1764 combine route is null for " + route_id); // + trip.trip_id);
          else if(utrip != null)
          {
//              report("4039: " + JSON.stringify(t, null , 4));
            let rs = t.mode[0].route;
            let k3 = rs.length;
            let i3 = 0;
            let b2 = true;
            while(b2 && (i3 < k3))
            {
  //            if(i3 == 0)  report("3897 " + rs[i3].route_id);
              if(rs[i3].route_id == route.route_id)
              {
                b2 = false;
              }
              else i3 += 1;
            }
//            if(b2) report("4052 " + route_id + " " + t.mode[0].route[0].route_id + " " + route.route_id);
            if(!b2)
            {
              let dx = rs[i3].direction;
              let k4 = dx.length;
              let i4 = 0;
              let b4 = true;
              while(b4 && (i4 < k4))
              {
 //               if(i4 == 0) report("2221 " + k4 + " " + dx[i4].direction_id + " " + dir);
                if(dx[i4].direction_id == dir)
                {
                  b4 = false;   
                }
                else i4 += 1;
              }
              if(!b4)
              {
//                report("3629 added unscheduled trip " + utrip.trip_id + " " + dir);
                dx[i4].trip.push(utrip); 
                utrip = trip;
              }
//              report("3657:\n" + JSON.stringify(utrip,null,4));
//              else report("1799 no direction");
            }
            else 
            {
//                if(route != null) report("1801 no route " + route.route_id + " " + route_id);
//                else report("1801 no route " + route_id);
            }
          }
          
        }
        else report("1806 stu is null");
      }
        
    }
    else if((f1.trip_update != null) && !bNoLIRRtrip && (f1.trip_update.trip.schedule_relationship != 3)) // normal
    { 
//      report("3631 " + trip_id + " " + stop_id + " " + (tAX != null) + " " + route_id);
      if(route_id == null)
      {
        if((typeof f1.trip_update.trip.route_id === 'undefined') || (f1.trip_update.trip.route_id == null))
        {
           if(tAX) 
           {
               if(typeof tAX.parent !== 'undefined') route_id = tAX.parent.route_id; 
               if(route_id == null) route_id = tAX.parent_id;
               rr = serviceE.getRouteS(tAX.parent_id);
           }
        }
        else route_id = routeprefix + f1.trip_update.trip.route_id;
      }
      if(!bVIA && (f1.trip_update.trip.route_id == null) && (tAX != null)) route_id = tAX.parent_id;
      if((bAMR) && (trip_id.indexOf("AMR") == -1)) trip_id = tripprefix + f1.trip_update.trip.trip_id;
//      report("3420 normal trip_id = " + trip_id + " route_id = " + route_id + " " + f1.id);
      if (route_id != null)route_id = route_id.replace("-", "");
      if(stop_id.indexOf("ME_") == 0) stop_id = stop_id.substring(3);
//      report("1741 " + route_id + " " + trip_id + " " + routes  + "  " + (tripIsInRoutes(trip_id, routes)));
      if((route_id != null) && ((routes.indexOf(route_id) != -1) || (tripIsInRoutes(trip_id, routes))))
      {
//          report("4279 got here");
        let stu = f1.trip_update.stop_time_update;
        if(stu != null)
        {
          let k3 = stu.length;
          let i3 = 0;
          let b = true;
          while(b && (i3 < k3))
          {
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
//            if(i3 == k3 -1) report("1654 " + stop_id + " " + sid);
            if(stop_id == sid)
            {
              b = false;
              let tarr = null;
              let tdep = null;
              let track = "";
              let status1 = "";
//              report("1545  " + trip_id + " ");
              if(trip_id.indexOf("LI") == 0)
              {
                trip = getTripA(trip_id, t);
//                report("4301 " + trip_id + " " + trip + " " + trip.trip_name);
                let tpad = 0;
                let tpdd = 0;
                let barr = false;
                let bdep = false;
                if(stu[i3].arrival != null)
                {
                  barr = true;
                  let xl = getPBTime(stu[i3].arrival.time);
                  if(isNaN(xl))
                  {
                     if(xl.indexOf("T") != -1)
                     {
                       xl =  getTimefromCTA(xl);  
//                       report("2118 xl = " + xl);
                     }
                  }
 /*                 else if(sid.indexOf("B_") == 0)
                  {
                     xl = getTimePacific(xl);   
                  } */
                  tpad = Number(xl);
                }
                if(stu[i3].departure != null)
                {
                  bdep = true;
                  let xl = getPBTime(stu[i3].departure.time);
                  if(isNaN(xl))
                  {
                     if(xl.indexOf("T") != -1)
                     {
                       xl =  getTimefromCTA(xl);  
//                       report("2133 xl = " + xl);
                     }
                  }
 /*                 else if(sid.indexOf("B_") == 0)
                  {
                     xl = getTimePacific(xl);   
                  } */
                  tpdd = Number(xl);
                }
                
                let tzfactor = 0;
                if((rr != null) && (rr.cal != null) && (sid.indexOf("Z_") != 0)) tzfactor = getTzFactor(getTZforStop(sid), rr.cal.gtfstz);
                if(tpad > 0) tpad = Number(tpad) + 3600 * tzfactor;
                if(tpdd > 0) tpdd = Number(tpdd) + 3600 * tzfactor;
                
//                report("2318 xl = " + xl + " " + tpad + " " + tpdd + " " + tzfactor);
//                if(barr && bdep && (tpad > tpdd))
                if(barr  && (tpad > tpdd))
                {
                  tpdd =  tpad;
                }
                if(trip != null)
                {
                  if(barr) trip.pred_arr_dt = tpad;
                  if(bdep) trip.pred_dep_dt = tpdd;
                  if(barr || bdep) trip.pred = "true";
                  utrip = trip;
//                  report("4359 got here");
                }
                else
                {
                  let atrip = getLIRRtrip(trip_id);
                  trip = new Object();
                  trip.trip_id = trip_id; 
                  trip.trip_name = atrip.trip_name;
                  trip.sch_arr_dt = atrip.sch_arr_dt;
                  trip.sch_dep_dt = atrip.sch_dep_dt;
                  trip.trip_headsign = atrip.headsign;
                  trip.tid = atrip.tid;
                  if(barr) trip.pred_arr_dt = tpad;
                  if(bdep) trip.pred_dep_dt = tpdd;
                  if(barr || bdep) trip.pred = "true";
                  if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
                  {
                    let track =  stu[i3].mta_railroad_stop_time_update.track;
                    if(track != "") trip.track = track;
                  }
                  
 //                 let route = atrip.parent;
                  let route = serviceE.getRouteS(atrip.parent_id);
                  let dir = atrip.direction;
                  if(route == null) report("combine route is null for " + trip.trip_id);
                  else
                  {
                    let rs = t.mode[0].route;
                    let k3 = rs.length;
                    let i3 = 0;
                    let b2 = true;
                    while(b2 && (i3 < k3))
                    {
                      if(rs[i3].route_id == route.route_id)
                      {
                        b2 = false;
                      }
                      else i3 += 1;
                    }
                    if(!b2)
                    {
                      let dx = rs[i3].direction;
                      let k4 = dx.length;
                      let i4 = 0;
                      let b4 = true;
                      while(b4 && (i4 < k4))
                      {
                        if(dx[i4].direction_id == dir)
                        {
                          b4 = false;   
                        }
                        else i4 += 1;
                      }
                      if(!b4)
                      {
//                        report("1623 unscheduled trip " + trip.trip_id);
                        dx[i4].trip.push(trip); 
                        utrip = trip;
                      }
                      else report("1625 no direction");
                    }
                    else report("1627 no route " + route);
                  }
                  
                           
                
                }
                if(typeof stu[i3] !== 'undefined')
                {
                if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
                {
                  if(typeof stu[i3].mta_railroad_stop_time_update.track !== 'undefined')
                  {
                    track =  stu[i3].mta_railroad_stop_time_update.track;
                    if(track != "") trip.track = track;
                  }
                   if(typeof stu[i3].mta_railroad_stop_time_update.trainStatus !== 'undefined')
                  {
                    status1 =  stu[i3].mta_railroad_stop_time_update.trainStatus;
                    if((status1 != "") && (trip != null)) trip.status = status1;
                  }
                 }
                }
              }
              else
              {
                if((typeof stu[i3].schedule_relationship !== 'undefined') && (stu[i3].schedule_relationship == 1))
                {
                  tarr = 0; //was -1 changed forVIA
                  tdep = 0; //was -1 changed forVIA
                }
                else
                {
                
                if(stu[i3].arrival != null) 
                {
                  let xl = getPBTime(stu[i3].arrival.time);
                  if(isNaN(xl))
                  {
                    if(xl.indexOf("T") != -1)
                    {
                      xl =  getTimefromCTA(xl);  
//                      report("2216 xl = " + xl);
                    }
                    
                  }
                  tarr = xl;
                }
            
                if(stu[i3].departure != null) 
                {
                   let xl = getPBTime(stu[i3].departure.time);
                   if(isNaN(xl))
                   {
                     if(xl.indexOf("T") != -1)
                     {
                        xl =  getTimefromCTA(xl);  
//                        report("2232 xl = " + xl);
                      }
                    }
                    tdep = xl;
                   
                }                    
                let tzfactor = 0;
                if((typeof rr !== 'undefined') && (rr != null) && (rr.cal != null) && (sid.indexOf("Z_") != 0)) tzfactor = getTimeZFactor(sid, rr);
//                report("5851 tzfactor = " + tzfactor + " " + sid);
                if(bMetra) tzfactor = -3600;
//                if(rr != null) report("5353 tzfactor = " + tzfactor + " " + (TZPlatform/60) + " " + getTZDeltaHrsTZ(rr.cal.gtfstz) + " " + rr.cal.gtfstz + " " + rr.route_id);
                if(tdep > 0) tdep = Number(tdep) + tzfactor;
                if(tarr > 0) tarr = Number(tarr) + tzfactor;
//                if(rr != null) report("3921 tzfactor = " + tzfactor + " rr " + rr + rr.cal.gtfstz + " " + sid + " " + getTZforStop(sid));
                
                if(sid.indexOf("B_") == 0)
                {
                  tdep -= 10800;
                  tarr -= 10800;
                }
                
 //               report("4487 " + JSON.stringify(stu[i3], null, 4));
                track = "";
                if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
                {
                  if(typeof stu[i3].mta_railroad_stop_time_update.track !== 'undefined')
                  {
                    track =  stu[i3].mta_railroad_stop_time_update.track;
                  }
                  if(typeof stu[i3].mta_railroad_stop_time_update.trainStatus !== 'undefined')
                  {
                    status1 =  stu[i3].mta_railroad_stop_time_update.trainStatus;
                    if((status1 != "") && (trip != null)) trip.status = status1;
                  }
                }
                }
//                console.log("2194 " + trip_id + " " + startdate + " " + stop_id + " "+ tarr + " " + tdep + " " + tzfactor + " " + NOW);
                utrip = updatePred(t, trip_id, stop_id, tarr, tdep, track);
              }
              if(!b && (utrip == null))
              {
                if(trip_id.indexOf("MN") == 0)
                {
                  trip = new Object();
                  trip.trip_id = trip_id;
                  let dest = stu[stu.length - 1].stop_id;
                  trip.trip_headsign = getStopNameFromID("MNR_" + dest);
                  let kx = trip_id.lastIndexOf("+");
                  let dir = trip_id.substring(kx + 1);
                  if(kx == -1) dir = 0;
                  trip.trip_name = "MetroNorth " + f1.id;
                  if(tdep != null) 
                  {
                    trip.sch_dep_dt = tdep.toString();
                    trip.pred_dep_dt = tdep.toString();
                  }
                  if(tarr != null) 
                  {
                    trip.sch_arr_dt = tarr.toString();
                    trip.pred_arr_dt = tarr.toString();
                  }
                  trip.pred = "true";
                  if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
                  {
                    if(typeof stu[i3].mta_railroad_stop_time_update.track !== 'undefined')
                    {
                    track =  stu[i3].mta_railroad_stop_time_update.track;
                    if(track != "") trip.track = track;
                   }
                   if(typeof stu[i3].mta_railroad_stop_time_update.trainStatus !== 'undefined')
                   {
                    status1 =  stu[i3].mta_railroad_stop_time_update.trainStatus;
                    if((status1 != "") && (trip != null)) trip.status = status1;
                   }
                  }
//                  if(track != "") trip.track = track;
//                  if(status1 != "") trip.status = status1;
//                 report("3856 " + trip_id + " " + dir);
 //                 report("3857: " + JSON.stringify(t, null, 4));
 /*                 if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
                  {
                   if(typeof stu[i3].mta_railroad_stop_time_update.track !== 'undefined')
                   {
                    let track =  stu[i3].mta_railroad_stop_time_update.track;
                    if(track != "") trip.track = track;
                   }
                   if(typeof stu[i3].mta_railroad_stop_time_update.trainStatus !== 'undefined')
                   {
                    let status =  stu[i3].mta_railroad_stop_time_update.trainStatus;
                    if(status != "") trip.status = status;
                   }
                  } */
                 let bx = true;
                  let tz = t.mode[0].route;
                  let i1 = 0;
                  let k1 = tz.length;                
                  let trip2 = getTripA(trip_id, t);
                  if(trip2 == null)
                  {
                    while(bx && (i1 < k1))
                    {
                      if(tz[i1].route_id == route_id)
                      {
                        bx = false;
                        tz[i1].direction[dir].trip.push(trip);
                        utrip = trip;
                      }
                      i1 += 1;
                    }
                  }
                }
              }
            }
            else i3 += 1;
          }
        }
      }
//      else if(route_id == null) report("3989 route_id is null for " + trip_id);
          
      if((f1.vehicle != null) && (utrip != null))
      { 
       let ttid = tripprefix + f1.vehicle.trip.trip_id;
//       report("1744 " + ttid + " " + utrip.trip_id);
//       if(ttid == utrip.trip_id)
       let t100 = utrip.trip_id.indexOf(ttid);
//       report("4541 ttid = " + ttid + " " + t100);
       if((t100 == 0) || (t100 == 4))
       {
         let tstop = f1.vehicle.stop_id;
         if(tstop == "") 
         {
             tstop = null;
 //            report("4582 " + JSON.stringify(f1.vehicle.current_status, null, 4));
         }
         
         let statn = f1.vehicle.current_status;
//         report("4580 " + tstop + " : " + statn);
         let stat = "";
         if((statn != null) && (tstop != null))
         {
           if(typeof statn.value !== 'undefined') statn = statn.value;
           switch(statn)
           {
             case 0: stat = "INCOMING AT"; break;
             case 1: stat = "STOPPED AT"; break;
             case 2: stat = "IN_TRANSIT_TO"; break;
             default: stat = "";
           }
           tstop = getStopIdForNumber(f1.vehicle.stop_id, stopprefix);
//           report("4592 " + tstop + " " + statn);
           utrip.vstopid = tstop;
           if(f1.vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
           utrip.vstat = stat;
           utrip.ostat = f1.vehicle.occupancy_status;
         }
       
         if(f1.vehicle.timestamp != null)
         {
           utrip.vehicle_timestamp = getPBTime(f1.vehicle.timestamp);
         }
       }
//       utrip = null;
      }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    else if((f1.vehicle != null)) // && (utrip != null))
    {
       let xtrip = getTripA(trip_id, t);
 //      if((xtrip == null) && (utrip == null)) 
 //          report("1909 " + xtrip + " " + utrip + " " + f1.vehicle.trip.trip_id + ", " + trip_id);
       let ttid = tripprefix + f1.vehicle.trip.trip_id;
//       report("1684 " + utrip.trip_id  + " " + trip_id + " " + ttid + " " + xtrip.tid);
       let bz = false;
       let bg = false;
       if(utrip != null)
       {
//         bg = (ttid == utrip.trip_id);
         if(utrip.trip_id.indexOf(ttid) == 0) bg = true;
//         report("4614 " + utrip.trip_id + " " + ttid);
       }
       let qq = null;
       if(xtrip != null) 
       {
         qq = "LI" + xtrip.tid;
         if(qq == ttid) bz = true;
//         report("4620 " + xtrip.trip_id + " " + ttid);
       }
       if(bg || bz)
       {
         if(bz) utrip = xtrip;
         let tstop = f1.vehicle.stop_id;
         let statn = f1.vehicle.current_status;
         let stat = "";
         if((statn != null) && (tstop != null))
         {
           if(typeof statn.value !== 'undefined') statn = statn.value;
           switch(statn)
           {
             case 0: stat = "INCOMING AT"; break;
             case 1: stat = "STOPPED AT"; break;
             case 2: stat = "IN_TRANSIT_TO"; break;
             default: stat = "";
           }
           tstop = getStopIdForNumber(f1.vehicle.stop_id, stopprefix);
           utrip.vstopid = tstop;
           if(f1.vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
           utrip.vstat = stat;
           utrip.ostat = f1.vehicle.occupancy_status;
         }
       
         if(f1.vehicle.timestamp != null)
         {
           utrip.vehicle_timestamp = getPBTime(f1.vehicle.timestamp);
         }
       }
//       report("1951 got here " + ttid);
       utrip = null;
    }
    }
    else  // gtfs_version == 1.0
    {
      report("6066 " + trip_id + " " + routes);
//      report("3567 " + JSON.stringify(feed, null, 4));
      if((f1.tripUpdate != null) && (f1.tripUpdate.trip.scheduleRelationship == "CANCELED")) // 3 = canceled
      {
    //    let route_id = routeprefix + f1.tripUpdate.trip.route_id;
    //    if(f1.trip_update.trip.route_id == null) route_id = "";
//      report("1643 " + route_id + " " + trip_id);
      if((routes.indexOf(route_id) != -1) || (tripIsInRoutes(trip_id, routes)))
      {
        let stu = f1.tripUpdate.stopTimeUpdate;
        if(stu != null)
        {
          let k3 = stu.length;
          let i3 = 0;
          let b = true;
          while(b && (i3 < k3))
          {
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
 //           if(i3 == 0) report("1654 " + stop_id + " " + sid);
            if(stop_id == sid)
            {
              b = false;
              let tarr = null;
              let tdep = null;
 //             report("1545  " + trip_id + " ");
              if(trip_id.indexOf("LI") == 0)
              {
                let trip = getTripA(trip_id, t);
                if(trip != null)
                {
                  trip.status = "Cancelled";
//                  report("1665 trip cancelled " + trip_id);
                  utrip = null;
                }
              }
              else
              {
                if(stu[i3].arrival != null) tarr = stu[i3].arrival.time;
                if(stu[i3].departure != null) tdep = stu[i3].departure.time;
                utrip = updatePred(t, trip_id, stop_id, tarr, tdep);
//                report("1673 trip cancelled " + trip_id);
                if(utrip != null) utrip.status = "Cancelled";
              }
            }
            i3 += 1;
          }
//          if(b) report("1698 trip cancelled " + trip_id);
        }
      }
        
      }
      else if((f1.tripUpdate != null) && ((f1.tripUpdate.trip.scheduleRelationship == "ADDED") || 
        (f1.tripUpdate.trip.scheduleRelationship == "UNSCHEDULED") ) || (bNoLIRRtrip &&(f1.tripUpdate != null)  && (f1.tripUpdate.trip.scheduleRelationship == 0))) // 1 = added 2 = unscheduled
      {
//      report("3620 added");
      let route_id = routeprefix;
      if(f1.tripUpdate.trip.route_id != null) route_id += f1.tripUpdate.trip.route_id;
      else if((tAX != null) && (tAX.parent != null)) route_id = tAX.parent.route_id;
//      report("1689 " + route_id + " " + trip_id);
      if((routes.indexOf(route_id) != -1) || (tripIsInRoutes(trip_id, routes)))
      {
        let stu = f1.tripUpdate.stopTimeUpdate;
        if(stu != null)
        {
          let k3 = stu.length;
          let i3 = 0;
          let b = true;
          trip = null;
          while(i3 < k3)
          {
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
//            if(i3 == 0) report("1654 " + stop_id + " " + sid);
            if(stop_id == sid)
            {
              trip = new Object();
              trip.trip_id = trip_id;
              trip.tid = f1.tripUpdate.trip.tripId; 
              if(f1.tripUpdate.trip.scheduleRelationship == "ADDED")
              {
                trip.trip_name = "ADDED Trip";
              }
              else if(f1.tripUpdate.trip.scheduleRelationship == "UNSCHEDULED")
              {
                 trip.trip_name = "Unscheduled Trip";                 
              }
              else if(f1.tripUpdate.trip.scheduleRelationship == 0)
              {
                 trip.trip_name = "Route " + f1.trip_update.trip.route_id;                 
              }
//              report("1732 " + route_id + trip.trip_id + " " + trip.trip_name);
              let tarr = null;
              let tdep = null;
              trip.sch_arr_dt = "";
              trip.sch_dep_dt = "";
              if(stu[i3].arrival != null) tarr = stu[i3].arrival.time;
              if(stu[i3].departure != null) tdep = stu[i3].departure.time;
              if(sid.indexOf("B_") == 0)
              {
                if(tarr != null) tarr = getTimePacific(tarr);   
                if(tdep != null) tdep = getTimePacific(tdep);   
              }
             let dest = stu[stu.length - 1].stop_id;
              trip.trip_headsign = getStopNameFromID(stopprefix + dest);
//                  trip.tid = atrip.tid;
              trip.sch_arr_dt = tarr;
              trip.sch_dep_dt = tdep;
              trip.pred_arr_dt = tarr;
              trip.pred_dep_dt = tdep;
              trip.pred = "true";
//              trip.parent = serviceE.getRouteS(route_id);   
              utrip = trip;
              
            }
            i3 += 1;
            if((trip != null) && (i3 == k3)) 
            {
                trip.headsign = getStopNameFromID(sid); 
//                report("1756 ADDED trip " + route_id + " " + trip.headsign + " " + trip.trip_id);
            }
          }

          let route = serviceE.getRouteS(route_id);
          let dir = f1.tripUpdate.trip.direction_id;
          if((dir == null) && (tAX != null)) dir = tAX.direction;
          if((trip == null) && (tAX != null)) trip = tAX;
          if(route == null) report("1764 combine route is null for " + route_id); // + trip.trip_id);
          else if(utrip != null)
          {
            let rs = t.mode[0].route;
            let k3 = rs.length;
            let i3 = 0;
            let b2 = true;
            while(b2 && (i3 < k3))
            {
              if(rs[i3].route_id == route.route_id)
              {
                b2 = false;
              }
              else i3 += 1;
            }
            if(!b2)
            {
              let dx = rs[i3].direction;
              let k4 = dx.length;
              let i4 = 0;
              let b4 = true;
              while(b4 && (i4 < k4))
              {
 //               if(i4 == 0) report("2221 " + k4 + " " + dx[i4].direction_id + " " + dir);
                if(dx[i4].direction_id == dir)
                {
                  b4 = false;   
                }
                else i4 += 1;
              }
              if(!b4)
              {
//                report("1623 unscheduled trip " + utrip.trip_id);
                dx[i4].trip.push(utrip); 
                utrip = trip;
              }
              else report("1799 no direction");
            }
            else report("1801 no route " + route);
          }
          
        }
        else report("1806 stu is null");
      }
        
      }
      else if((f1.tripUpdate != null) && !bNoLIRRtrip && (f1.tripUpdate.trip.scheduleRelationship != 3)) // normal
      { 
          report("3738 version 1 scheduled");
      let route_id = routeprefix + f1.tripUpdate.trip.route_id;
      route_id = route_id.replace("-", "");
      if(stop_id.indexOf("ME_") == 0) stop_id = stop_id.substring(3);
//      report("1741 " + route_id + " " + trip_id + " " + routes);
      if((routes.indexOf(route_id) != -1) || (tripIsInRoutes(trip_id, routes)))
      {
        let stu = f1.tripUpdate.stopTimeUpdate;
        if(stu != null)
        {
          let k3 = stu.length;
          let i3 = 0;
          let b = true;
          while(b && (i3 < k3))
          {
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
//            if(i3 == 0) report("1654 " + stop_id + " " + sid);
            if(stop_id == sid)
            {
              b = false;
              let tarr = null;
              let tdep = null;
//              report("1545  " + trip_id + " ");
              if(trip_id.indexOf("LI") == 0)
              {
                let trip = getTripA(trip_id, t);
                let tpad = 0;
                let tpdd = 0;
                let barr = false;
                let bdep = false;
                if(stu[i3].arrival != null)
                {
                  barr = true;
                  let xl = stu[i3].arrival.time;
                  if(isNaN(xl))
                  {
                     if(xl.indexOf("T") != -1)
                     {
                       xl =  getTimefromCTA(xl);  
//                       report("2118 xl = " + xl);
                     }
                  }
                  else if(sid.indexOf("B_") == 0)
                  {
                     xl = getTimePacific(xl);   
                  }
                  tpad = Number(xl);
                }
                if(stu[i3].departure != null)
                {
                  bdep = true;
                  let xl = stu[i3].departure.time;
                  if(isNaN(xl))
                  {
                     if(xl.indexOf("T") != -1)
                     {
                       xl =  getTimefromCTA(xl);  
//                       report("2133 xl = " + xl);
                     }
                  }
                  else if(sid.indexOf("B_") == 0)
                  {
                     xl = getTimePacific(xl);   
                  }
                  tpdd = Number(xl);
                }
//                report("2318 xl = " + xl + " " + tpad + " " + tpdd);
                if(barr && bdep && (tpad > tpdd))
                {
                  tpdd =  tpad;
                }
                if(trip != null)
                {
                  if(barr) trip.pred_arr_dt = tpad;
                  if(bdep) trip.pred_dep_dt = tpdd;
                  if(barr || bdep) trip.pred = "true";
                  utrip = trip;
                }
                else
                {
                  let atrip = getLIRRtrip(trip_id);
                  trip = new Object();
                  trip.trip_id = trip_id; 
                  trip.trip_name = atrip.trip_name;
                  trip.sch_arr_dt = atrip.sch_arr_dt;
                  trip.sch_dep_dt = atrip.sch_dep_dt;
                  trip.trip_headsign = atrip.headsign;
                  trip.tid = atrip.tid;
                  if(barr) trip.pred_arr_dt = tpad;
                  if(bdep) trip.pred_dep_dt = tpdd;
                  if(barr || bdep) trip.pred = "true";
                  
                  let route = atrip.parent;
                  let dir = atrip.direction;
                  if(route == null) report("combine route is null for " + trip.trip_id);
                  else
                  {
                    let rs = t.mode[0].route;
                    let k3 = rs.length;
                    let i3 = 0;
                    let b2 = true;
                    while(b2 && (i3 < k3))
                    {
                      if(rs[i3].route_id == route.route_id)
                      {
                        b2 = false;
                      }
                      else i3 += 1;
                    }
                    if(!b2)
                    {
                      let dx = rs[i3].direction;
                      let k4 = dx.length;
                      let i4 = 0;
                      let b4 = true;
                      while(b4 && (i4 < k4))
                      {
                        if(dx[i4].direction_id == dir)
                        {
                          b4 = false;   
                        }
                        else i4 += 1;
                      }
                      if(!b4)
                      {
//                        report("1623 unscheduled trip " + trip.trip_id);
                        dx[i4].trip.push(trip); 
                        utrip = trip;
                      }
                      else report("1625 no direction");
                    }
                    else report("1627 no route " + route);
                  }
                  
                           
                
                }
              }
              else
              {
                if(stu[i3].arrival != null) 
                {
                  let xl = stu[i3].arrival.time;
                  if(isNaN(xl))
                  {
                    if(xl.indexOf("T") != -1)
                    {
                      xl =  getTimefromCTA(xl);  
//                      report("2216 xl = " + xl);
                    }
                  }
                  tarr = xl;
                }
            
                if(stu[i3].departure != null) 
                {
                   let xl = stu[i3].departure.time;
                   if(isNaN(xl))
                   {
                     if(xl.indexOf("T") != -1)
                     {
                        xl =  getTimefromCTA(xl);  
//                        report("2232 xl = " + xl);
                      }
                    }
                    tdep = xl;
                   
                }                    
//                report("2194 " + trip_id);
                utrip = updatePred(t, trip_id, stop_id, tarr, tdep);
              }
            }
            else i3 += 1;
          }
        }
      }
     
      if((f1.vehicle != null) && (utrip != null))
      { 
       let ttid = tripprefix + f1.vehicle.trip.trip_id;
 //      report("1744 " + ttid + " " + utrip.trip_id);
//       if(ttid == utrip.trip_id)
       if(utrip.trip_id.indexOf(ttid) == 0)
       {
         let tstop = f1.vehicle.stop_id;
         let statn = f1.vehicle.current_status;
         let stat = "";
         if((statn != null) && (tstop != null))
         {
           switch(statn)
           {
             case 0: stat = "INCOMING AT"; break;
             case 1: stat = "STOPPED AT"; break;
             case 2: stat = "IN_TRANSIT_TO"; break;
             default: stat = "";
           }
           tstop = getStopIdForNumber(f1.vehicle.stop_id, stopprefix);
           utrip.vstopid = tstop;
           if(f1.vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
           utrip.vstat = stat;
           utrip.ostat = f1.vehicle.occupancy_status;
         }
       
         if(f1.vehicle.timestamp != null)
         {
           utrip.vehicle_timestamp = f1.vehicle.timestamp.low;
         }
       }
//       utrip = null;
      }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    else if((f1.vehicle != null)) // && (utrip != null))
    {
       let xtrip = getTripA(trip_id, t);
//       if((xtrip == null) && (utrip == null)) report("1909 " + xtrip + " " + utrip + " " + f1.vehicle.trip.trip_id);
       let ttid = tripprefix + f1.vehicle.trip.trip_id;
//       report("1684 " + utrip.trip_id  + " " + trip_id + " " + ttid + " " + xtrip.tid);
       let bz = false;
       let bg = false;
       if(utrip != null)
       {
//         bg = (ttid == utrip.trip_id);
         if(utrip.trip_id.indexOf(ttid) == 0) bg = true;
       }
       let qq = null;
       if(xtrip != null) 
       {
         qq = "LI" + xtrip.tid;
         bz = (qq == ttid);
       }
       if(bg || bz)
       {
         if(bz) utrip = xtrip;
         let tstop = f1.vehicle.stop_id;
         let statn = f1.vehicle.current_status;
         let stat = "";
         if((statn != null) && (tstop != null))
         {
           switch(statn)
           {
             case 0: stat = "INCOMING AT"; break;
             case 1: stat = "STOPPED AT"; break;
             case 2: stat = "IN_TRANSIT_TO"; break;
             default: stat = "";
           }
           tstop = getStopIdForNumber(f1.vehicle.stop_id, stopprefix);
           utrip.vstopid = tstop;
           if(f1.vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
           utrip.vstat = stat;
           utrip.ostat = f1.vehicle.occupancy_status;
         }
       
         if(f1.vehicle.timestamp != null)
         {
           utrip.vehicle_timestamp = f1.vehicle.timestamp.low;
         }
       }
//       report("1951 got here " + ttid);
       utrip = null;
    }
    else
    {
      report("4000 no version 1 match");   
    }
    }
    
  }
  if(bNoLIRRtrip) 
  {
      report("No LIRR trip found, carrier loaded = " + isCarrierLoaded("LI"));
      if(!isCarrierLoaded("LI")) 
      {
          bLCBusy = false;
          loadCarrier("LI");
      }
  }
}


function getTripByTid(tid, route)
{
  let tr = null;
  if(route != null)
  {
  let trips = route.trips;
  let k = trips.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    let t = trips[i].tid;
    if(typeof t !== 'undefined')
    {
      if(tid == t)
      {
        b = false;
        tr = trips[i];
      }
    }
    i += 1;
  }
  }
  return(tr);
}

function getRouteForRouteM(routeprefix, routem)
{
   let routes = serviceE.routes;
   let k = routes.length;
   let i = 0;
   let b = true;
   let r = null;
   while(b && (i < k))
   {
     if(routes[i].route_id.indexOf(routeprefix) == 0)
     {
       let m = routes[i].routem;
       if(typeof m !== 'undefined')
       {
         if(m == routem)
         {
           b = false;
           r = routes[i];
         }
       }
     }
     i += 1;
   }
   return(r);
}

function getBartRouteForF1(f1)
{
  let rr = null;
  let i = 0;
  let b = true;
  let bHAY = false;
  let b19 = false;
  let bWOAK = false;
  let bSSAN = false;
  let bNBRK = false;
  let bDELN = false;
  let bBALB = false;
  let a2 = f1.trip_update.stop_time_update;
  let k = a2.length;
  while(b && (i < k))
  {
    let sid = a2[i].stop_id;
    if(sid == "PHIL")
    {
      rr = B_YELLOW; 
      b = false;
    }
    else if(sid == "OAKL")
    {
      rr = B_BEIGE;
      b = false;
    }
    else if(sid == "SSAN")
    {
      bSSAN = true;  
    }
    else if(sid == "NBRK")
    {
      bNBRK = true;  
    }
    else if(sid == "WDUB")
    {
      rr = B_BLUE;
      b = false;
    }
    else if(sid == "HAYW")
    {
      bHAY = true;   
    }
    else if(sid == "19TH")
    {
      b19 = true;
    }
    else if(sid == "WOAK")
    {
      bWOAK = true; 
    }
    else if(sid == "DELN")
    {
      bDELN = true;  
    }
    else if(sid == "BALB")
    {
      bBALB = true;  
    }
    
    if(bHAY && b19)
    {
      rr = B_ORANGE;
      b = false;
    }
    else if(bHAY && bWOAK)
    {
      rr = B_GREEN;
      b = false;
    }
    if(bSSAN && bNBRK)
    {
      rr = B_RED;
      b = false;
    }
    i += 1;
  }
  if(b)
  {
    if(bSSAN) rr = B_YELLOW;
    else if(bDELN) rr = B_RED;
    else if(bWOAK) rr = B_GREEN;
    else if(bBALB) rr = B_GREEN;
    else rr = B_GREEN;
  }
  if(rr == null)
  {
    let s ="";
    for(i=0; i < k; i++)
    {
      s += a2[i].stop_id + " ";
      report("6156 " + s);
    }
      
  }
//  report("5694 " + b + " :" + rr.route_id + ": " + b19 + " " + bWOAK + " " + bHAY + " " + f1.id);
  return(rr);
}

function getBARTadjustedHeadsign(hs)
{
  let headsign = hs;
  if(hs.indexOf("Balboa Park") != -1) headsign = "Daly City";
  else if(hs.indexOf("San Bruno") != -1) headsign = "San Francisco International Airport";
  else if(hs.indexOf("Pittsburg") != -1) headsign = "Antioch";
  else if(hs.indexOf("El Cerrito") != -1) headsign = "Richmond";
  else if(hs.indexOf("Milpitas") != -1) headsign = "Berryessa / North San Jose";
  else if(hs.indexOf("West Dublin") != -1) headsign = "Dublin / Pleasanton";
  else if(hs.indexOf("International") != -1) headsign = "Millbrae";
  return(headsign);  
}

function getLIRRtrip(trip_id)
{
  let c = null;
  let b = true;
  let a = serviceE.routes;
  let k = a.length;
  let i = 0;
  while(b && (i < k))
  {
    if(a[i].route_id.indexOf("LI") == 0)
    {
      let trs = a[i].trips;
      let k2 = trs.length;
      let i2 = 0;
      while(b && i2 < k2)
      {
        if(trs[i2].trip_id == trip_id)
        {
          b = false;
          c = trs[i2];
        }
        i2 += 1;
      }
    }
    i += 1;
  }
//  report("getLIRRtrip " + trip_id + " " + c.trip_id);
  return(c);
}

function tripIsInRoutes(trip_id, routes)
{
  let b = false;
  let tx = trip_id;
  let j = tx.indexOf("_Day");
  if(j != -1) tx = tx.substring(0, j);
  let a = routes.split(",")
  let k = a.length;
  let i = 0;
  while(!b && (i < k))
  {
     let route = serviceE.getRouteS(a[i]);
     let t = null;
     if(route == null) ; //report("2068 route is null " + a[i] + " " + trip_id);
     else
     {
       t = route.getTTrip(tx);
     }
     if(t != null) b = true;
     else i += 1;
  }
  return(b);
}

function makeTripDataFromFeed(t, feed,  tripprefix, routeprefix, stopprefix)
{
  let tripid = t.trip_id;
  let kk = feed.entity.length;
//  report("2084 makeTripDataFromFeed " + kk);
  let ii = 0;
  let b = true;
  let bNotFirst = false;
  let tripg = null;
  let utrip = null;
  let bNoLtrip = false;
  let bLIRRtrip = (tripprefix == "LI");
  while(b && (ii < kk))
  {
    let f1 = feed.entity[ii];
    let trip_id = tripprefix + f1.id; 
    if((trip_id.indexOf("_T") == trip_id.length - 2) || (trip_id.indexOf("_V") == trip_id.length - 2)) 
    {
//       if(trip_id.indexOf("LI") == 0) trip_id = trip_id.substring(2);
       trip_id =  trip_id.substring(0, trip_id.length - 2);
    }
    if(tripprefix == "LI")
    {
      let tl = f1.id.length;
      let tA = serviceE.getLIRRTripForTrip(trip_id);
      if(tA != null) 
      {
 //         report("5273 " + trip_id + " " + tA.trip_id + " " + tA.
          trip_id = tA.trip_id;
      }
      else 
      {
//        report("no LIRR trip for " + f1.id + " " + trip_id + " " + tripid);
        bNoLtrip = true;
      }
    }
    if(trip_id == tripid)      //   report("2107 " + tripid + " " + trip_id);
//    if(tripid.indexOf(trip_id) == 0)
    {
      if(f1.is_deleted)
      {
        
      }
      else if(f1.trip_update != null)
      { 
        let tu = f1.trip_update;
        t.route_id = routeprefix + tu.trip.route_id;
        t.direction_id = tu.trip.direction_id;
        t.tid = tu.trip.trip_id;
        
        let stu = tu.stop_time_update;
        t.stop = [];
        if((stu != null) && (f1.trip_update.trip.schedule_relationship != 3))
        { 
          let k3 = stu.length;
//          report("2131 " + k3);
          let i3 = 0;
          while(i3 < k3)
          {
            let tarr = null;
            let tdep = null;
            let tpad = 0;
            let tpdd = 0;
            let tstop_id = getStopIdForNumber(stu[i3].stop_id, stopprefix);
            if(trip_id.indexOf("LI") == 0)
            {
              if(stu[i3].arrival != null)
              {
                tpad = Number(stu[i3].arrival.delay);
              }
              if(stu[i3].departure != null)
              {
                tpdd = Number(stu[i3].departure.delay);
              }
            }
            tarr = "";
            if(stu[i3].arrival != null) tarr = getPBTime(stu[i3].arrival.time);
            tdep = "";
            if(stu[i3].departure != null) tdep = getPBTime(stu[i3].departure.time);
            if(tdep == "") tdep = tarr;
            let tt1 = Number(tarr) + Number(tpad);
            let tt2 = Number(tdep) + Number(tpdd);
            let ts = {
              stop_sequence : stu[i3].stop_sequence.toString(),
              stop_id : tstop_id,
              stop_name : getStopNameFromID(tstop_id),
              sch_arr_dt : tt1.toString(),
              sch_dep_dt : tt2.toString(),
              pred_arr_dt : tarr.toString(),
              pred_dep_dt : tdep.toString(),
              pred : "true"
              };
            t.stop.push(ts); 
            i3 += 1;
            if(i3 == k3) t.trip_headsign = ts.stop_name;
          }
        }
      else if(f1.vehicle != null)
      { 
        b = false;
        let tstop = f1.vehicle.stop_id;
        let statn = f1.vehicle.current_status;
        let stat = "";
        if((statn != null) && (tstop != null))
        {
          if(typeof statn.value !== 'undefined') statn = statn.value;
          switch(statn)
          {
            case 0: stat = "INCOMING AT"; break;
            case 1: stat = "STOPPED AT"; break;
            case 2: stat = "IN_TRANSIT_TO"; break;
            default: stat = "";
          }
//          if(bLIRRtrip) stat = "";
          tstop = getStopIdForNumber(f1.vehicle.stop_id, stopprefix);
          if(f1.vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
          if(f1.vehicle.position != null)
          {
            if(f1.vehicle.position.latitude != null) t.vehicle_latitude = f1.vehicle.position.latitude;
            if(f1.vehicle.position.longitude != null) t.vehicle_longitude = f1.vehicle.position.longitude;
          }
          t.vehicle_id = trip_id;
          t.vehicle_stop = tstop;
          t.vehicle_stat = stat;
          t.vehicle_label = f1.vehicle.vehicle.id;
          let k5 = t.stop.length;
          let i5 = 0;
          let b5 = true;
          while(b5 && (i5 < k5))
          {
            if(t.stop[i5].stop_id == tstop)
            {
              b5 = false;
              t.stop[i5].status = stat;
            }
            i5 += 1;
          }
          if(f1.vehicle.timestamp != null)
          {
            t.vehicle_timestamp = getPBTime(f1.vehicle.timestamp);
          }
        }
      }
    }
    }
    ii += 1;
  }
}

function combinetripNJ(t, feed, trip_id)
{
  let a = feed.STOPS;
  let k = a.length;
  let k1 = t.stop.length;
  let i1 = 0;
  let b1 = true;
  let b2 = false;
//  report("4607  " + trip_id);
  let i = 0;
  for(i = 0; i<k; i++)
  {
    let item = a[i];
    let stop_id = getNJstopid(item.STATION_2CHAR);
    let status = item.STOP_STATUS;
    let tdep = item.DEP_TIME;
    tdep = tdep.substring(tdep.indexOf(" ") + 1);
    let b = false;
    if(tdep.indexOf("PM") != -1) b = true;
    let hr = Number(tdep.substring(0, tdep.indexOf(":")));
    let min = Number(tdep.substring(tdep.indexOf(":") + 1,tdep.lastIndexOf(":")));
    if((b) && (hr != "12")) hr = hr + 12;
    tdep= hr + ":" + min;
    let dt = new Date(NOW - TZPlatform * 60000);
    dt.setHours(0);
    dt.setMinutes(0);
    let d = Math.floor(dt.getTime() / 1000);

    tdep = d + getUtime(tdep);
//    report("4635 " + tid + " " + tdep + " track " + track +" occ = " +os);
//    updatePredTripNJ(t, tid, stop_id, tdep, tdep);
    i1 =0;
    b1 = true;
//    report("6772 " + t.stop[i1].stop_id + " " +  stop_id + " " + tdep + " " + t.stop[i].sch_dep_dt);
    while(b1 && (i1 < k1))
    {
      if(t.stop[i1].stop_id == stop_id)
      {
        b1 = false;
        
      }
      else i1 += 1;
    }
    if(!b1)
    {
      let tt = t.stop[i1];
      if(status != "") tt.status = status;
      tt.pred_arr_dt = tdep;
      tt.pred_dep_dt = tdep;
      tt.pred = "true";
    }
    
  }   
//  report("6792 " + JSON.stringify(t, null,4));
  return(t);
}

function combinetrip(t, feed, tripprefix, routeprefix, stopprefix)
{
  let kk = feed.entity.length;
  let iig = 0;
  let b = true;
  let bNotFirst = false;
  let tripid = t.trip_id;
  let tripg = null;
  let utrip = null;
  let bNoLtrip = false;
  let bLIRRtrip = (tripprefix == "LI");
  let bmetra = (tripid.indexOf("ME_") == 0);
  let bAMR = (tripid.indexOf("AMR") == 0);
  let bMNR = (tripid.indexOf("MN") == 0);
  let bVIA = (tripid.indexOf("VIA") == 0);
  let bSEPTA = (tripid.indexOf("SEPTA") == 0);
  let bRIPTA = (tripid.indexOf("RIPT") == 0);
  let bVRE = (tripid.indexOf("VRE") == 0);
  let bRTD = (tripid.indexOf("RTD_") == 0);
  let bMetrolink = (tripid.indexOf("CML") == 0);
  let bWMA = (tripid.indexOf("WMA") == 0);
  let bMARC = (tripid.indexOf("MARC_") == 0);
  let bBL = (tripid.indexOf("BL") == 0);
  let bBART = (tripid.indexOf("B_") == 0);
  let bTR = (tripid.indexOf("TR") == 0);
  let bMSL = (tripid.indexOf("MSLB") == 0);
//  report("4693 combinetrip " + tripid + " " + kk + " " + bWMA);
//  report("4689 " + JSON.stringify(t,null,4));
//  report("2563");
//  report(JSON.stringify(feed,null,4));
//  report("6269 " + kk);
  while(b && (iig < kk))
  {
    let f1 = feed.entity[iig];
    let trip_id = tripprefix + f1.id; 
    if((trip_id.indexOf("_T") == trip_id.length - 2) || (trip_id.indexOf("_V") == trip_id.length - 2)) 
    {
 //       report("5348 got here");
       if(trip_id.indexOf("LI") == 0) trip_id = trip_id.substring(2);
       trip_id =  trip_id.substring(0, trip_id.length - 2);
    }
//    report("2661 " + tripid + " " + bAMR + bVIA + bmetra + bMNR + " " + bSEPTA + " " + bVRE + " " + bRTD + " " + bMetrolink + " " + tripprefix);
    if(tripprefix == "LI")
    {
      let tl = f1.id.length;
      let tA = serviceE.getLIRRTripForTrip(trip_id);
      if(tA != null) 
      {
          trip_id = tA.trip_id;
      }
      else 
      {
//        report("no LIRR trip for " + f1.id + " " + trip_id);
          /*
        bNoLtrip = true;
           let tk = {
               route_id : "",
               route_name : "",
               trip_id : trip_id,
               trip_name : "",
               direction_id: "0",
               direction_name: "",
               shape_id: null,
               tid: "",
               stop: []
              };
          
 //          if(SUB[10] != null)
           {
 //           let feed = null;
 //           feed = SUB[10];
            if(feed != null) makeTripDataFromFeed(tk, feed,  "LI", "LIRR", "LI");
            if(bReport) report("\n\n" + JSON.stringify(t, null, 4));
           }
           resolve(t);
           */
      }
    }
    else if(bAMR)
    {
      if((f1.trip_update != null) && (f1.trip_update.trip != null))
      {
        trip_id = "AMR_" + f1.trip_update.trip.trip_id; 
//        report("6321 " + tripid + " " + trip_id);
/*        if(typeof t.route_id === 'undefined')
        {
          t.route_id = "AMR" + f1.trip_update.trip.route_id;  
        } 
        t.route = serviceE.getRouteS(t.route_id);
        t.route_name = t.route.route_name;
        */
//        if(tripid == trip_id)
        if(tripid.indexOf(trip_id) == 0)
        {
 //           report("6332");
        if(typeof f1.trip_update.stop_time_update !== 'undefined')
        {
          let stu = f1.trip_update.stop_time_update;
          let dest = stu[stu.length - 1].stop_id;
          let x1 = trip_id.lastIndexOf("AMTK_");
          let shortname = "";
          if(x1 != -1) shortname = trip_id.substring(x1 + 5) + " ";
          t.trip_headsign = getStopNameFromID("AMS" + dest);
          t.trip_name = t.route_name + " " + shortname;
        }
        }
      }
    }
    else if(bVIA)
    {
      
      if((typeof f1.trip_update !== 'undefined') && (f1.trip_update != null) && (f1.trip_update.trip != null))
      {
        let tid = f1.trip_update.trip.trip_id;
        trip_id = "VIA" + tid;
        /*
        if(tid.indexOf("VIA") == 0)
        {
          trip_id = tid.replace("_", "");
        }
        else
        {
          let routem = f1.trip_update.trip.route_id; 
          rr = getRouteForRouteM(routeprefix, routem);
          if(rr != null) 
          {
            route_id = rr.route_id;
            let trip = getTripByTid(tid, rr);
            if(trip != null) trip_id = trip.trip_id;
          }
        }
        */
        let startdate = f1.trip_update.trip.start_date;
        if(startdate != AMRDFF)
        {
          let cdiff = 1 + getCDateDiff(AMRDFF, startdate);
          if(cdiff > 1) trip_id += "_Day_" + cdiff;
        }
      }
    }
    else if(bmetra)
    {
 //      report(JSON.stringify(t, null, 4));
       tripid = t.tid; 
       trip_id = f1.trip_update.trip.trip_id;
//       trip_id = trip_id.substring(3);
       trip_id = trip_id.replace("-", "");
//       trip_id = trip_id.substring(0, trip_id.lastIndexOf("_"));
//       report("5477 " + trip_id + " " + tripid);
    }
    else if(tripprefix == "B_")
    {
       tAX = serviceE.getBARTTripForTrip(f1.id, f1);
       if(tAX != null)
       {
         trip_id = tAX.trip_id;
 //        report("4699  trip_id = "  + trip_id + " " + tAX.tid + " tripid = " + tripid);
       }
       else //if(false) // if no trip found add one
       {
//          report("6545 " + tripid + " " + trip_id + " " + f1.id );
//          report("6546 " + JSON.stringify(t, null, 4));
 /*         
          let rr= getBartRouteForF1(f1);
          if(rr != null)
          {
            t.route_id = rr.route_id;
            report("6552 " + rr.route_id + " " + f1.id + " " + tripid + " " + trip_id );
            t.direction_id = f1.trip_update.trip.direction_id;
            t.tid = f1.id;
            let stu = f1.trip_update.stop_time_update;
            let k3 = stu.length;
            report("655 k3 = " + k3 + " " + JSON.stringify(f1, null,4));
            let hs = getStopNameFromID("B_" + stu[k3 - 1].stop_id);
            t.trip_headsign = getBARTadjustedHeadsign(hs);
            let tzfactor = 0;
            let tzfactor = getTimeZFactor(stu[0].stop_id, rr); 
            let i3 = 0;
            while(i3 < k3)
            {
              let tarr = null;
              let tdep = null;
              if(stu[i3].arrival != null) tarr = getPBTime(stu[i3].arrival.time);
              if(stu[i3].departure != null) tdep = getPBTime(stu[i3].departure.time);
              if(tdep > 0) tdep = Number(tdep) + tzfactor;
              if(tarr > 0) tarr = Number(tarr) + tzfactor;
              
              let o = new Object();
              o.stop_sequence = i3 + 1;
              o.stop_id = "B_" + stu[i3].stop_id;
              o.stop_name = getStopNameFromID(o.stop_id);
              o.sch_arr_dt = tarr;
              o.sch_dep_dt = tdep;
              o.pred_arr_dt = tarr;
              o.pred_dep_dt = tdep;
              o.pred = "true";
              t.stop.push(o);
              
              i3 += 1;
            }
           }
           */
//          report("6584 " + JSON.stringify(t, null, 4));
//          b = false;
        }
        
 //       report("6501 " + trip_id +" "+ f1.id + " " + tripid);
    }
    else if(bMNR && (tripid == trip_id))
    {
//      report("4739 " + t.trip_headsign);
      if(typeof t.trip_headsign === 'undefined')
      {
      t.route_id = "MN" + f1.trip_update.trip.route_id;
      t.route = serviceE.getRouteS(t.route_id);
      t.route_name = t.route.route_name;
      let stu = f1.trip_update.stop_time_update;
      let dest = stu[stu.length - 1].stop_id;
      t.trip_headsign = getStopNameFromID("MNR_" + dest);
      t.trip_name = "MetroNorth " + f1.id;
      t.direction_id = 0;
      if(dest == "MNR_1") t.direction_id = 1;
      tzfactor = 0;
       {
          let k3 = stu.length;
          let i3 = 0;
          while(i3 < k3)
          {
          
            let o = new Object();
            o.stop_sequence = stu[i3].stop_sequence;
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
            o.stop_id = sid;
            
            
            let tarr = null;
            let tdep = null;
            if(stu[i3].arrival != null) tarr = getPBTime(stu[i3].arrival.time);
            if(stu[i3].departure != null) tdep = getPBTime(stu[i3].departure.time);
            let tzfactor = 0;
            if(sid.indexOf("Z_") != 0) tzfactor = getTzFactor(getTZforStop(sid), t.getTripTZ());
            if(tdep > 0) tdep = Number(tdep) + 3600 * tzfactor;
            if(tarr > 0) tarr = Number(tarr) + 3600 * tzfactor;
            
//            let tzfactor = 0;
//            if((rr != null) && (rr.cal != null) && (sid.indexOf("Z_") != 0)) tzfactor = getTzFactor(getTZforStop(sid), rr.cal.gtfstz);
//            report("4715 " + tzfactor + " " + t.route.route_id);
//            if(tdep > 0) tdep = Number(tdep) + 3600 * tzfactor;
//            if(tarr > 0) tarr = Number(tarr) + 3600 * tzfactor;
            o.sch_arr_dt = tarr;
            o.sch_dep_dt = tdep;
            o.pred_arr_dt = tarr;
            o.pred_dep_dt = tdep;
            o.pred = "true";
            if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
            {
                  if(typeof stu[i3].mta_railroad_stop_time_update.track !== 'undefined')
                  {
                    let track =  stu[i3].mta_railroad_stop_time_update.track;
                    if(track != "") o.track = track;
                  }
                   if(typeof stu[i3].mta_railroad_stop_time_update.trainStatus !== 'undefined')
                  {
                    let status1 =  stu[i3].mta_railroad_stop_time_update.trainStatus;
                    if(status1 != "") o.status = status1;
                  }
            }
           
            t.stop.push(o);
            i3 += 1;
          }
      }
      }
      
      
    }
    else if(bMNR)
    {
      let n = tripid.indexOf("_");
      if(n != -1) tripid = tripid.substring(0, n);   
    }
    else if(bSEPTA)
    {
//      report("7504 " + JSON.stringify(f1, null, 4));
      let tid = "SEPTA_" + f1.trip_update.trip.trip_id;
      if(tid == null) report("5513 " + tid );
      if(f1.trip_update.schedule_relationship == 3)
      {
         t.headsign += "CANCELLED"; 
      }
      else if((typeof f1.trip_update.stop_time_update !== 'undefined') && (f1.trip_update.stop_time_update != null)) 
      {
      let zlen = f1.trip_update.stop_time_update.length;
//      report("5515 " + tid + " " + zlen);
      let iz = 0;
      for(iz = 0; iz < zlen; iz++)
      {
        if(typeof f1.trip_update.stop_time_update[iz] !== 'undeined')
        {
        let delay = Number(f1.trip_update.stop_time_update[iz].arrival.delay);
        let stop_id = "SEP_" + f1.trip_update.stop_time_update[iz].stop_id;
//      report("5519 " + stop_id + " " + tid + " " + delay);
        let k3 = t.stop.length;
        let i3 = 0;
        let b3 = true;
        while(b3 && (i3 < k3))
        {
          if(t.stop[i3].stop_id == stop_id)
          {
            b3 = false;
            t.stop[i3].pred_arr_dt = Number(t.stop[i3].sch_arr_dt) + delay;
            t.stop[i3].pred_dep_dt = Number(t.stop[i3].sch_dep_dt) + delay;
            t.stop[i3].pred = "true";
          }
          i3 += 1;
        }
        }
      }
      }
    }
    else if(bMSL)
    {
//      let tid = "SEPTA_" + f1.trip_update.trip.trip_id;
//      report("5513 " + tid );
      if(typeof f1.trip_update.stop_time_update !== 'undefined')
      {    
        trip_id = "MSLB" + f1.trip_update.trip.trip_id;
//      report("7279 " + trip_id + " " + tripid + " " + zlen);
        if(trip_id == tripid)
        {
//        report("7279 " + trip_id + " " + tripid + " " + zlen);
          let zlen = f1.trip_update.stop_time_update.length;
          let iz = 0;
          for(iz = 0; iz < zlen; iz++)
          {
            let delay = 0;
            if(typeof f1.trip_update.stop_time_update[iz].departure.delay !== 'undefined') delay = Number(f1.trip_update.stop_time_update[iz].departure.delay);
            let stop_id = "MSLB" + f1.trip_update.stop_time_update[iz].stop_id;
//          report("5519 " + stop_id + " " + tid + " " + delay);
            let k3 = t.stop.length;
            let i3 = 0;
            let b3 = true;
            while(b3 && (i3 < k3))
            {
              if(t.stop[i3].stop_id == stop_id)
              {
                b3 = false;
                t.stop[i3].pred_arr_dt = Number(t.stop[i3].sch_arr_dt) + delay;
                t.stop[i3].pred_dep_dt = Number(t.stop[i3].sch_dep_dt) + delay;
                t.stop[i3].pred = "true";
              }
              i3 += 1;
            }
          }
          b = false;
        }
      }
    }
    else if(bTR)
    {
      let tid = "TR" + f1.trip_update.trip.trip_id;
//      report("5513 " + tid );
      let zlen = f1.trip_update.stop_time_update.length;
//      report("5515 " + tid + " " + zlen);
      let iz = 0;
      for(iz = 0; iz < zlen; iz++)
      {
        let delay = Number(f1.trip_update.stop_time_update[iz].arrival.delay);
        let stop_index = f1.trip_update.stop_time_update[iz].stop_sequence;
//      report("5519 " + stop_id + " " + tid + " " + delay);
        let k3 = t.stop.length;
        let i3 = 0;
        let b3 = true;
        while(b3 && (i3 < k3))
        {
          if(t.stop[i3].stop_sequence == stop_index)
          {
            b3 = false;
            t.stop[i3].pred_arr_dt = Number(t.stop[i3].sch_arr_dt) + delay;
            t.stop[i3].pred_dep_dt = Number(t.stop[i3].sch_dep_dt) + delay;
            t.stop[i3].pred = "true";
          }
          i3 += 1;
        }
      }
    }
    else if(bVRE)
    {
      let tid = "VRE" + f1.trip_update.trip.trip_id;
      tid = tid.replace("-", "_");
//      report("5513 " + tid );
      let zlen = f1.trip_update.stop_time_update.length;
//      report("5515 " + tid + " " + zlen);
      let iz = 0;
      for(iz = 0; iz < zlen; iz++)
      {
        let delay = 0;
        if(typeof f1.trip_update.stop_time_update[iz].departure != 'undefined')
        {
          delay = Number(f1.trip_update.stop_time_update[iz].departure.delay);
        }
        else if(typeof f1.trip_update.stop_time_update[iz].arrival != 'undefined')
        {
          delay = Number(f1.trip_update.stop_time_update[iz].arrival.delay);
        }
        let stop_id = "VRE" + f1.trip_update.stop_time_update[iz].stop_id.substring(28);
//      report("5519 " + stop_id + " " + tid + " " + delay);
        let k3 = t.stop.length;
        let i3 = 0;
        let b3 = true;
        while(b3 && (i3 < k3))
        {
          if(t.stop[i3].stop_id == stop_id)
          {
            b3 = false;
            t.stop[i3].pred_arr_dt = Number(t.stop[i3].sch_arr_dt) + delay;
            t.stop[i3].pred_dep_dt = Number(t.stop[i3].sch_dep_dt) + delay;
            t.stop[i3].pred = "true";
          }
          i3 += 1;
        }
      }
    }
    else if(bBL)
    {
      let tid = "BL" + f1.trip_update.trip.trip_id;
      let zlen = f1.trip_update.stop_time_update.length;
      let iz = 0;
      for(iz = 0; iz < zlen; iz++)
      {
        let delay = 0;
        if(typeof f1.trip_update.stop_time_update[iz].departure != 'undefined')
        {
          delay = Number(f1.trip_update.stop_time_update[iz].departure.delay);
        }
        else if(typeof f1.trip_update.stop_time_update[iz].arrival != 'undefined')
        {
          delay = Number(f1.trip_update.stop_time_update[iz].arrival.delay);
        }
        let stop_id = "BL_" + f1.trip_update.stop_time_update[iz].stop_id;
        let k3 = t.stop.length;
        let i3 = 0;
        let b3 = true;
        while(b3 && (i3 < k3))
        {
          if(t.stop[i3].stop_id == stop_id)
          {
            b3 = false;
            t.stop[i3].pred_arr_dt = Number(t.stop[i3].sch_arr_dt) + delay;
            t.stop[i3].pred_dep_dt = Number(t.stop[i3].sch_dep_dt) + delay;
            t.stop[i3].pred = "true";
          }
          i3 += 1;
        }
      }
    }
    else if(bRTD)
    {

      let tid = "RTD_" + f1.trip_update.trip.trip_id;
      if(tid == t.trip_id)
      {
        let zlen = f1.trip_update.stop_time_update.length;
        let iz = 0;
        for(iz = 0; iz < zlen; iz++)
        {
          let ta = "";
          let td = "";
          let stux = f1.trip_update.stop_time_update[iz];
          if((typeof stux.arrival !== 'undefined') && (stux.arrival != null))
            ta = Number(stux.arrival.time)- 120 * 60;
          if((typeof stux.departure !== 'undefined') && (stux.departure != null))
            td = Number(stux.departure.time)- 120 * 60;
          else td = ta;
          let stop_id = "RTD_" + stux.stop_id;
          let k3 = t.stop.length;
          let i3 = 0;
          let b3 = true;
          while(b3 && (i3 < k3))
          {
            if(t.stop[i3].stop_id == stop_id)
            {
              b3 = false;
              t.stop[i3].pred_arr_dt = ta;
              t.stop[i3].pred_dep_dt = td;
              t.stop[i3].pred = "true";
            }
            i3 += 1;
          }
        }
      }
    }
    else if(bWMA)
    {

      let tid = "WMA" + f1.trip_update.trip.trip_id;
      let iuu = tid.indexOf("_");
      if(iuu != -1) tid = tid.substring(0, iuu);
//      report("6167 " + tid + " " + t.trip_id);
      if(tid == t.trip_id)
      {
        let zlen = f1.trip_update.stop_time_update.length;
        let iz = 0;
        for(iz = 0; iz < zlen; iz++)
        {
          let ta = "";
          let td = "";
          let stux = f1.trip_update.stop_time_update[iz];
          if((typeof stux.arrival !== 'undefined') && (stux.arrival != null))
            ta = Number(stux.arrival.time);
          if((typeof stux.departure !== 'undefined') && (stux.departure != null))
            td = Number(stux.departure.time);
          else td = ta;
          if(ta == "") ta = td;
//          let stop_id = "WMA" + stux.stop_id;
          let izz = -1;
          izz = stux.stop_id.indexOf("_");
          let stid = "WMA" + stux.stop_id.substring(izz + 1);
          izz = stid.indexOf("_");
          if(izz != -1) stid = stid.substring(0,izz);
          let k3 = t.stop.length;
          let i3 = 0;
          let b3 = true;
//          if(iz == 0) report("6190 " + t.stop[i3].stop_id + " " + stid);
          while(b3 && (i3 < k3))
          {
            if(t.stop[i3].stop_id == stid)
            {
//            report("6199 " + ta + " " + td);
              b3 = false;
              t.stop[i3].pred_arr_dt = ta;
              t.stop[i3].pred_dep_dt = td;
              t.stop[i3].pred = "true";
            }
            i3 += 1;
          }
        }
      }
    }
    else if(bMARC)
    {

      let tid = "MARC_" + f1.trip_update.trip.trip_id;
      let iuu = tid.indexOf("_");
      if(tid == t.trip_id)
      {
        let zlen = f1.trip_update.stop_time_update.length;
        let iz = 0;
        for(iz = 0; iz < zlen; iz++)
        {
          let ta = "";
          let td = "";
          let stux = f1.trip_update.stop_time_update[iz];
          if((typeof stux.arrival !== 'undefined') && (stux.arrival != null))
            ta = Number(stux.arrival.time);
          if((typeof stux.departure !== 'undefined') && (stux.departure != null))
            td = Number(stux.departure.time);
          else td = ta;
          if(ta == "") ta = td;
//          let stop_id = "WMA" + stux.stop_id;
          let stid = "MARC_" + stux.stop_id;
          let k3 = t.stop.length;
          let i3 = 0;
          let b3 = true;
//          if(iz == 0) report("6190 " + t.stop[i3].stop_id + " " + stid);
          while(b3 && (i3 < k3))
          {
            if(t.stop[i3].stop_id == stid)
            {
//            report("6199 " + ta + " " + td);
              b3 = false;
              t.stop[i3].pred_arr_dt = ta;
              t.stop[i3].pred_dep_dt = td;
              t.stop[i3].pred = "true";
            }
            i3 += 1;
          }
        }
      }
    }
    else if(bMetrolink)
    {

      let tid = "CML" + f1.trip_update.trip.trip_id;
      let ts = Number(feed.header.timestamp);
//      report("6076 " + tid + " " + t.trip_id);
      if(tid == t.trip_id)
      {
        let zlen = f1.trip_update.stop_time_update.length;
        let iz = 0;
        for(iz = 0; iz < zlen; iz++)
        {
          let ta = "";
          let td = "";
          let stux = f1.trip_update.stop_time_update[iz];
          if((typeof stux.arrival !== 'undefined') && (stux.arrival != null))
            ta = Number(stux.arrival.time) - 3600 * 3; 
            if((ta - ts) > 43200) ta -= 3600 * 24;
          if((typeof stux.departure !== 'undefined') && (stux.departure != null))
            td = Number(stux.departure.time) - 3600 * 3; 
            if((td - ts) > 43200) td -= 3600 * 24;
          else td = ta;
          let stop_id = "CML" + stux.stop_id;
          let k3 = t.stop.length;
          let i3 = 0;
          let b3 = true;
//          if(iz == 0) report("6097 " + t.stop[i3].stop_id + " " + stop_id);
          while(b3 && (i3 < k3))
          {
            if(t.stop[i3].stop_id == stop_id)
            {
              b3 = false;
              t.stop[i3].pred_arr_dt = ta;
              t.stop[i3].pred_dep_dt = td;
              t.stop[i3].pred = "true";
            }
            i3 += 1;
          }
        }
      }
    }
    else if(bRIPTA)
    {
      trip_id = "RIPT" + f1.trip_update.trip.trip_id; 
      if(trip_id == t.trip_id)
      {
        let zlen = f1.trip_update.stop_time_update.length;
        let iz = 0;
        let b4 = true;
        while(b4 && (iz < zlen))
        {
          let stu = f1.trip_update.stop_time_update[iz];
          let delaya = 0;
          if(typeof stu.arrival !== 'undefined')
              delaya = Number(stu.arrival.delay);
          let delayd = 0;
          if(typeof stu.departure !== 'undefined')
              delayd = Number(stu.departure.delay);
          
          let stop_id = "RIPT" + stu.stop_id;
          let k3 = t.stop.length;
          let i3 = 0;
          let b3 = true;
          while(b3 && (i3 < k3))
          {
            if(t.stop[i3].stop_id == stop_id)
            {
              b3 = false;
              t.stop[i3].pred_arr_dt = Number(t.stop[i3].sch_arr_dt) + delaya;
              t.stop[i3].pred_dep_dt = Number(t.stop[i3].sch_dep_dt) + delayd;
              t.stop[i3].pred = "true";
            }
            i3 += 1;
          }
          iz += 1;
        }
      }
    }
//    if(trip_id == tripid)
//    report("1900 " + tripid + " / " + trip_id + ":");
//      report("4798 " + JSON.stringify(t, null, 4));

    let buok = true;
    let bdayok = false;
//    let btest = (t.trip_id == "AMR482854871_Day_1");
    let j7 = t.trip_id.indexOf("_Day_");
    let tripmday = tripid;
//    if(btest) report("got here 4559 " + t.trip_id + " " + j7);
    if(j7 != -1)
    {
      tripmday = tripid.substring(0,j7);
      let dum = 0;
//       report("4563 " + dum);
      dum = Number(t.trip_id.substring(j7 +5, j7+6));
      let mstartdate = 0;
//      report("4564 " + dum + " " + AMRTFF);
      if(typeof t.startcdate != 'undefined')
      {
        if((f1.trip_update != null) && (f1.trip_update.trip != null))
        {
          mstartdate = adjustedCdate(AMRTFF, 1 - dum);
//          mstartdate = t.startcdate;
//          report("4839 " + f1.trip_update.trip.start_date + " " + t.startcdate + " " + dum + " " + mstartdate);
          if(f1.trip_update.trip.start_date == mstartdate) {buok = true; bdayok = false;}   
          else buok = false;
        }
      }
      else if((f1.trip_update != null) && (f1.trip_update.trip != null))
      {
        t.startcdate = f1.trip_update.trip.start_date;
        mstartdate = adjustedCdate(AMRTFF, 1 - dum);
        if(f1.trip_update.trip.start_date == mstartdate) buok = true;   
        else buok = false;
//        report("4850 " + trip_id + " " + tripid + " " + f1.trip_update.trip.start_date + " " + mstartdate + " " + buok);
      }
      let root = tripid.substring(0, j7);
//      if(trip_id == root) 
//      report("4855 " + trip_id + " " + tripid + " " + AMRTFF + " " + buok + " " + dum + " " + f1.trip_update.trip.start_date + " " + mstartdate);
//    if(btest) report("got here 4573 " + buok + " " + dnum);
    }
    else if(bAMR)
    {
      if((f1.trip_update != null) && (f1.trip_update.trip != null))
      {
//          report("6815 " + f1.trip_update.trip.start_date + " " + AMRTFF);
        if(f1.trip_update.trip.start_date == AMRTFF) buok = true;   
        else buok = false;
      }
//     if(btest) report("got here 4581 " + buok);
       
    }

//      report("5554 " + tripid + " / " + trip_id + ": " + buok + " " + b + " " + f1.trip_update.trip.schedule_relationship);

    if((bSEPTA) || (bRIPTA) || (bRTD)) ;
    else if(bdayok || (buok && (trip_id != "") && ((tripmday == trip_id) || (tripid == trip_id)|| (tripid == (trip_id + "_Added")))))
    {
//      if(typeof   f1.trip_update === 'undefined') report("5631 " + ii + ": " + JSON.stringify(f1, null, 4));
//      else report("2576 " + tripid + " / " + trip_id + ": " + f1.trip_update.trip.schedule_relationship);
//      report("6828");
      if(bAMR)
      {
        if(typeof t.route_id === 'undefined')
        {
          t.route_id = "AMR" + f1.trip_update.trip.route_id;  
        } 
        t.route = serviceE.getRouteS(t.route_id);
        t.route_name = t.route.route_name;
        t.trip_name = t.route_name;
        if(t.route.trips.length > 0)
        {
          let tsim = t.route.trips[0];  
          if((tsim.shape_id != null) && (tsim.shape_id != ""))
          {
 //           report("4903 got shape_id of " + tsim.shape_id);
            t.shape_id = tsim.shape_id;   
          }
        }
      }
      
      if(f1.is_deleted)
      {
        
      }
      else if((typeof f1.trip_update !== 'undefined') && (f1.trip_update != null))
      { 
        let stu = f1.trip_update.stop_time_update;
        let vpos = "";
        if(typeof f1.trip_update.position !== 'undefined')
        {
          if(typeof f1.trip_update.position.vehicle !== 'undefined')
          {
             if(typeof f1.trip_update.position.vehicle.position !== 'undefined')
             {
               vpos = f1.trip_update.position.vehicle.position;
               t.vehicle_id = f1.trip_update.position.id;
               t.vehicle_latitude = f1.trip_update.position.vehicle.position.latitude;
               t.vehicle_longitude = f1.trip_update.position.vehicle.position.longitude;
             }
          }
        }
        let stops = t.stop;
        let rr = serviceE.getRouteS(t.route_id);
        if(typeof rr === 'undefined')
        {
          rr = null;
          report("4634 rr is undefined for " + t.route_id);
        }

        if((rr == null) & bBART)
        {
           rr= getBartRouteForF1(f1); 
           t.route_id = rr.route_id;
        }
//        report("6503 " + rr.route_id + " " + f1.id + " "+ tripid + " " + trip_id);
       
        let badded = (tripid.indexOf("_Added") != -1);
//        report("4418 " + f1.trip_update.trip.schedule_relationship);
        if((stu != null) && ((f1.trip_update.trip.schedule_relationship == null) || (f1.trip_update.trip.schedule_relationship == 0)) && !badded)
        { 
//          report("6889");
          let k3 = stu.length;
          let i3 = 0;
          while(i3 < k3)
          {
            let tarr = null;
            let tdep = null;
            let tpad = 0;
            let tpdd = 0;
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
            if(trip_id.indexOf("LI") == 0)
            {
              if(stu[i3].arrival != null)
              {
                tpad = Number(stu[i3].arrival.delay);
              }
              if(stu[i3].departure != null)
              {
                tpdd = Number(stu[i3].departure.delay);
              }
            }
            else
            {
              if(stu[i3].arrival != null) 
              {
                let xl = getPBTime(stu[i3].arrival.time);
                if(isNaN(xl))
                {
                  if(xl.indexOf("T") != -1)
                  {
                    xl =  getTimefromCTA(xl);  
//                    report("2216 xl = " + xl);
                  }
                }
                tarr = xl;
              }
              if(stu[i3].departure != null) 
              {
                let xl = getPBTime(stu[i3].departure.time);
                if(isNaN(xl))
                {
                  if(xl.indexOf("T") != -1)
                  {
                    xl =  getTimefromCTA(xl);  
//                    report("2216 xl = " + xl);
                  }
                }
                tdep = xl;
              }
              
              if(sid.indexOf("B_") == 0)
              {
                if(tarr != null) tarr = getTimePacific(tarr);   
                if(tdep != null) tdep = getTimePacific(tdep);   
              } 
              
//              report("4475 " + tarr + " " + tdep);
//             tdep = stu[i3].departure.time.low;
            }
            let k4 = stops.length;
            let i4 = 0;
            let b4 = true;
 //           report("2641 " + sid + " " + stops[0].stop_id);
            while(b4 && (i4 < k4))
            {
              let sx = stops[i4];
              let sy = sx.stop_id;
              if(bmetra) sy = sy.substring(3);
// if(i4 == 0)   report("2647 " + sid + " " + sy + " " + (sy ==  sid));
              if(sy ==  sid)
              {
                b4 = false;
                if(trip_id.indexOf("LI") == 0)
                {
                  tarr = Number(sx.sch_arr_dt) + Number(tpad);
                  tdep = Number(sx.sch_dep_dt) + Number(tpdd);
                  if(tarr > tdep) 
                  {
                    tdep =  tarr;
                  }
                }
                if(tarr == null) tarr = tdep;
                if(tdep == null) tdep = tarr;
                
                let tzfactor = 0;
                if((typeof rr !== 'undefined') && (rr != null) && (rr.cal != null) && (sid.indexOf("Z_") != 0)) tzfactor = getTimeZFactor(sid, rr); //getTzFactor(getTZforStop(sid), rr.cal.gtfstz);
 //               report("7079 " + rr.route_id + " " + sid + " " + tzfactor);
                if(bmetra) tzfactor = -3600;
                if(tdep > 0) tdep = Number(tdep) + tzfactor;
                if(tarr > 0) tarr = Number(tarr) + tzfactor;

                let bbx = false;
                if(tarr != null) {sx.pred_arr_dt = tarr.toString(); bbx = true;}
                if(tdep != null) {sx.pred_dep_dt = tdep.toString(); bbx = true;}
                if(bbx) sx.pred = "true";
                /* // via455 had both 1 and 2 schedule_relationship
                if(stu[i3].schedule_relationship == 1)
                {
                 sx.sch_arr_dt = null;
                 sx.sch_dep_dt = null;
                }
                */
                if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
                {
                  let track =  stu[i3].mta_railroad_stop_time_update.track;
                  if(track != "") sx.track = track;
                }
//                report("4502 " + sid + " " + sx.pred_arr_dt + " " + sx.pred_dep_dt);
              }
            else i4 += 1;
            }
            i3 += 1;
          }
        }
        else if((stu != null) && ((f1.trip_update.trip.schedule_relationship == 1) || (f1.trip_update.trip.schedule_relationship == 2) || badded))
        {
          report("2694 " + stu.length+ " " + stopprefix);
          
          t.stop = [];
          let k3 = stu.length;
          let i3 = 0;
          while(i3 < k3)
          {
          
            let o = new Object();
            o.stop_sequence = stu[i3].stop_sequence;
            let sid = getStopIdForNumber(stu[i3].stop_id, stopprefix);
            o.stop_id = sid;
//            report("7120 " + sid);
            
            let tarr = null;
            let tdep = null;
            if(stu[i3].arrival != null) tarr = getPBTime(stu[i3].arrival.time);
            if(stu[i3].departure != null) tdep = getPBTime(stu[i3].departure.time);
            let tzfactor = 0;
            let ttz = rr.cal.gtfstz;
            if(sid.indexOf("Z_") != 0) tzfactor = getTzFactor(getTZforStop(sid), ttz);
            else if((rr != null) && (rr.cal != null) && (sid.indexOf("Z_") != 0)) tzfactor = getTzFactor(getTZforStop(sid), rr.cal.gtfstz);
            
//            report("4715 " + tzfactor + " " + t.route.route_id);
            if(tdep > 0) tdep = Number(tdep) + 3600 * tzfactor;
            if(tarr > 0) tarr = Number(tarr) + 3600 * tzfactor;
            o.sch_arr_dt = tarr;
            o.sch_dep_dt = tdep;
            o.pred_arr_dt = tarr;
            o.pred_dep_dt = tdep;
            o.pred = "true";
            if((typeof stu[i3].mta_railroad_stop_time_update !== 'undefined') && (stu[i3].mta_railroad_stop_time_update != null))
            {
              let track =  stu[i3].mta_railroad_stop_time_update.track;
              if(track != "") o.track = track;
            }
           
            t.stop.push(o);
            
            /*
            let k4 = stops.length;
            let i4 = 0;
            let b4 = true;
            while(b4 && (i4 < k4))
            {
              let sx = stops[i4];
              if(sx.stop_id ==  sid)
              {
                b4 = false;
                if(trip_id.indexOf("LI") == 0)
                {
                  tarr = Number(sx.sch_arr_dt) + Number(tpad);
                  tdep = Number(sx.sch_dep_dt) + Number(tpdd);
                  if(tarr > tdep) 
                  {
                    tdep =  tarr;
                  }
                }
                sx.pred_arr_dt = tarr.toString();
                sx.pred_dep_dt = tdep.toString();
                sx.pred = "true";
              }
            else i4 += 1;
            }
            */
            i3 += 1;
          }
          
        }
      }
      else if((typeof f1.vehicle !== 'undefined') && (f1.vehicle != null))
      { 
        b = false;
        let tstop = f1.vehicle.stop_id;
        let statn = f1.vehicle.current_status;
        let stat = "";
        if((statn != null) && (tstop != null))
        {
          if(typeof statn.value !== 'undefined') statn = statn.value;
          switch(statn)
          {
            case 0: stat = "INCOMING AT"; break;
            case 1: stat = "STOPPED AT"; break;
            case 2: stat = "IN_TRANSIT_TO"; break;
            default: stat = "";
          }
//          if(bLIRRtrip) stat = "";
          tstop = getStopIdForNumber(f1.vehicle.stop_id, stopprefix);
          if(f1.vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
          if(f1.vehicle.position != null)
          {
            if(f1.vehicle.position.latitude != null) t.vehicle_latitude = f1.vehicle.position.latitude;
            if(f1.vehicle.position.longitude != null) t.vehicle_longitude = f1.vehicle.position.longitude;
            if(f1.vehicle.position.bearing != null) t.vehicle_bearing = f1.vehicle.position.bearing;
            if(f1.vehicle.position.speed != null) t.vehicle_speed = f1.vehicle.position.speed;
          }
          t.vehicle_id = trip_id;
          t.vehicle_stop = tstop;
          t.vehicle_stat = stat;
          t.vehicle_label = f1.vehicle.vehicle.id;
          if(f1.vehicle.occupancy_status != null) t.ostat = f1.vehicle.occupancy_status;
          let k5 = t.stop.length;
          let i5 = 0;
          let b5 = true;
          while(b5 && (i5 < k5))
          {
            if(t.stop[i5].stop_id == tstop)
            {
              b5 = false;
              t.stop[i5].status = stat;
            }
            i5 += 1;
          }
          if(f1.vehicle.timestamp != null)
          {
            t.vehicle_timestamp = getPBTime(f1.vehicle.timestamp);
          }
        }
      }
    }
    iig += 1;
//    report("7123 iig = " + iig + " " + b);
  }
}                                                                                                                                                                                                                                          

function getTripA(tid, t)
{
  let trip = null;
  let modes = t.mode;
  let k1 = modes.length;
  let i1 = 0;
  let b = true;
  while(b && (i1 < k1))
  {
    let routes = modes[i1].route;
    let k2 = routes.length;
    let i2 = 0;
    while(b && (i2 < k2))
    {
      let dirs = routes[i2].direction;
      let k3 = dirs.length;
      let i3 = 0;
      while(b && (i3 < k3))
      {
        let trips = dirs[i3].trip;
        let k4 = trips.length;
        let i4 = 0;
        while(b && (i4 < k4))
        {
          if((trips[i4] != null) && ((tid == trips[i4].trip_id) || (trips[i4].trip_id.indexOf(tid) != -1)))
          {
            b = false;
            trip = trips[i4];
          }
          else i4 += 1;
        }
        i3 += 1;
      }
      i2 += 1;
    }
    i1 += 1;
  }
  return(trip);
}

function getTripB(tid, t)
{
  let trip = null;
  let modes = t.mode;
  let k1 = modes.length;
  let i1 = 0;
  let b = true;
  while(b && (i1 < k1))
  {
    let routes = modes[i1].route;
    let k2 = routes.length;
    let i2 = 0;
    while(b && (i2 < k2))
    {
      let dirs = routes[i2].direction;
      let k3 = dirs.length;
      let i3 = 0;
      while(b && (i3 < k3))
      {
        let trips = dirs[i3].trip;
        let k4 = trips.length;
        let i4 = 0;
        while(b && (i4 < k4))
        {
//            if(i4 ==0) report("5833 " + tid.toString() + " " + trips[i4].tid.toString() + " " + tid.length + " " + trips[i4].tid.length + " " + k4);
          if((trips[i4] != null) && (tid === trips[i4].tid)) 
          {
            b = false;
//            report("7303 got trip");
            trip = trips[i4];
          }
          else i4 += 1;
        }
        i3 += 1;
      }
      i2 += 1;
    }
    i1 += 1;
  }
  return(trip);
}

function getTripC(tid, t)
{
//  report("8268 " + tid);
  let tax = tid.substring(5);
  let trip = null;
  let modes = t.mode;
  let k1 = modes.length;
  let i1 = 0;
  let b = true;
  while(b && (i1 < k1))
  {
    let routes = modes[i1].route;
    let k2 = routes.length;
    let i2 = 0;
    while(b && (i2 < k2))
    {
      let dirs = routes[i2].direction;
      let k3 = dirs.length;
      let i3 = 0;
      while(b && (i3 < k3))
      {
        let trips = dirs[i3].trip;
        let k4 = trips.length;
        let i4 = 0;
        while(b && (i4 < k4))
        {
          if((trips[i4] != null) && (trips[i4].trip_id).indexOf(tax) != -1) 
          {
            b = false;
            trip = trips[i4];
          }
          else i4 += 1;
        }
        i3 += 1;
      }
      i2 += 1;
    }
    i1 += 1;
  }
  return(trip);
}

function updatePred(t, trip_id, stop_id, tarr, tdep, track)
{
  let utrip = null;
  let tid = trip_id.replace("-","");
  let tid2 = trip_id.replace("-","");
  if(tid.indexOf("MN") == 0)
  {
    tid += "_";
  }
  if(tid.indexOf("ME_") == 0) 
  {
      tid = tid.substring(3);
      let x = tid.indexOf("_V");
      if(x != -1) tid = tid.substring(0, x);
  }
  let ts = t.stop_id;
  if(ts.indexOf("ME_") == 0) ts = ts.substring(3);
 // report("2736 " + ts + " " + stop_id + " " + tid);
  if(ts == stop_id)
  {
     let t1 = t.mode;
     let k1 = t1.length;
     let i1 = 0;
     let t5 = null;
     let b2 = false;
     let b = true;
     while(b && i1 < k1) // for each mode
     {
       let t2 = t1[i1].route;
       let k2 = t2.length;
       let i2 = 0;
       while(b && i2 < k2) // for each route
       {
         let t3 = t2[i2].direction;
         let k3 = t3.length;
         let i3 = 0;
         while(b && (i3 < k3)) // for each direction
         {
           let t4 = t3[i3].trip;
           let k4 = t4.length;
           let i4 = 0;
           while(b && (i4 < k4))  // for each trip
           {
             t5 = t4[i4];
 //            if(i4 == 0) report("2764 " + t5.trip_id + " / " + tid + ": " + t5.tid);
             if(t5.trip_id == tid) {b = false;}
             else if(t5.trip_id.indexOf(tid) == 0) {b = false;}
             else if(typeof t5.tid !== 'undefined')
             {
                 if(t5.tid.indexOf(tid) != -1) {b = false;}
                 else if((tid.indexOf("_") != -1) && 
                     (t5.tid.indexOf(tid) != -1)) {b = false; b2 = true;}
//                     (t5.tid.indexOf(tid.substring(0,tid.lastIndexOf("_"))) != -1)) {b = false;}
                 else i4 += 1;
             }
             else i4 += 1;
 //            report("6067 " + t5.trip_id + " / " + tid + ": " + t5.tid + " " + b);
           }
           i3 += 1;
         }
         i2 += 1;
       }
       i1 += 1;
     }
     if(!b) 
     {
       let b2 = ((tdep != null) && (tdep.toString() != "0")) || ((tarr != null) && (tarr.toString() != "0"));
       if(b2)
       {
         if(tdep != null) t5.pred_dep_dt = tdep.toString();
         if(tarr != null) t5.pred_arr_dt = tarr.toString();
         t5.pred = "true";
       }
       if(track != "") t5.track = track.toString();
 //      t5.pred = "true";
 //      {t5.trip_id = tid2; report("tid2 = " + tid2);}
 //      report("6081 " + tid + " " + b + " " + track);
       utrip = t5;
     }
  }
  return(utrip);
}

function updatePred3(t, trip_id, stop_id, del, deld)
{
//  report("6392 updatePred3 " + trip_id + " " + stop_id + " " + del + " " +deld);
  let utrip = null;
  let babs = (trip_id.indexOf("RTD_") == 0) || (trip_id.indexOf("CML") == 0) || (trip_id.indexOf("WMA") == 0) || (trip_id.indexOf("MARC_") == 0);
  let tid = trip_id.replace("-","");
  let tid2 = trip_id.replace("-","");
  if(tid.indexOf("MN") == 0)
  {
    tid += "_";
  }
  if(tid.indexOf("ME_") == 0) 
  {
      tid = tid.substring(3);
      let x = tid.indexOf("_V");
      if(x != -1) tid = tid.substring(0, x);
  }
  let ts = t.stop_id;
  if(ts.indexOf("ME_") == 0) ts = ts.substring(3);
//  report("2736 " + ts + " " + stop_id);
//  if(ts == stop_id)
  {
     let t1 = t.mode;
     let k1 = t1.length;
     let i1 = 0;
     let t5 = null;
     let b2 = false;
     let b = true;
     while(b && i1 < k1) // for each mode
     {
       let t2 = t1[i1].route;
       let k2 = t2.length;
       let i2 = 0;
       while(b && i2 < k2) // for each route
       {
         let t3 = t2[i2].direction;
         let k3 = t3.length;
         let i3 = 0;
         while(b && (i3 < k3)) // for each direction
         {
           let t4 = t3[i3].trip;
           let k4 = t4.length;
           let i4 = 0;
           while(b && (i4 < k4))  // for each trip
           {
             t5 = t4[i4];
//             if(i4 == 0) 
//             report("8048 " + t5.trip_id + " / " + tid + ": " + t5.tid);
             if(t5.trip_id == tid) {b = false;}
             else if(t5.trip_id.indexOf(tid) == 0) {b = false;}
             else if(typeof t5.tid !== 'undefined')
             {
                 if(t5.tid.indexOf(tid) != -1) {b = false;}
                 else if((tid.indexOf("_") != -1) && 
                     (t5.tid.indexOf(tid) != -1)) {b = false; b2 = true;}
//                     (t5.tid.indexOf(tid.substring(0,tid.lastIndexOf("_"))) != -1)) {b = false;}
                 else i4 += 1;
             }
             else i4 += 1;
//             report("2764 " + t5.trip_id + " / " + tid + ": " + t5.tid + " " + b);
           }
           i3 += 1;
         }
         i2 += 1;
       }
       i1 += 1;
     }
     
//     report("8118 " + !b + " " + ts + " " + stop_id + " " + t5.ss);
     if(!b && ((ts == stop_id) || (t5.ss == stop_id)) )
     {
       if(babs) 
       {
         t5.pred_dep_dt = Number(deld)
         t5.pred_dep_dt = t5.pred_dep_dt.toString();
         t5.pred_arr_dt = Number(del)
         t5.pred_arr_dt = t5.pred_arr_dt.toString();
           
       }
       else
       {
         t5.pred_dep_dt = Number(t5.sch_dep_dt) + Number(deld)
         t5.pred_dep_dt = t5.pred_dep_dt.toString();
         t5.pred_arr_dt = Number(t5.sch_arr_dt) + Number(del)
         t5.pred_arr_dt = t5.pred_arr_dt.toString();
       }
       t5.pred = "true";
 //      {t5.trip_id = tid2; report("tid2 = " + tid2);}
       utrip = t5;
     }
  }
  return(utrip);
}

function updatePredNJ(t, tid, stop_id, tarr, tdep, track, os)
{
  let utrip = null;
  let ts = t.stop_id;
  if(ts == stop_id)
  {
     let t1 = t.mode;
     let k1 = t1.length;
     let i1 = 0;
     let t5 = null;
     let b2 = false;
     let b = true;
     while(b && i1 < k1) // for each mode
     {
       let t2 = t1[i1].route;
       let k2 = t2.length;
       let i2 = 0;
       while(b && i2 < k2) // for each route
       {
         let t3 = t2[i2].direction;
         let k3 = t3.length;
         let i3 = 0;
         while(b && (i3 < k3)) // for each direction
         {
           let t4 = t3[i3].trip;
           let k4 = t4.length;
           let i4 = 0;
           while(b && (i4 < k4))  // for each trip
           {
             t5 = t4[i4];
             if(t5.tid == tid) {b = false;}
             else i4 += 1;
           }
           i3 += 1;
         }
         i2 += 1;
       }
       i1 += 1;
     }
     if(!b) 
     {
       let b2 = ((tdep != null) && (tdep.toString() != "0")) || ((tarr != null) && (tarr.toString() != "0"));
       if(b2)
       {
         let tzfactor = 0;
 //        let ttz = rr.cal.gtfstz;
         tzfactor = getTzFactor(getTZforStop(stop_id), "EasternTime");
            
         if(tdep > 0) tdep = Number(tdep) + 3600 * tzfactor;
         if(tarr > 0) tarr = Number(tarr) + 3600 * tzfactor;
 //        report("7985 " + tzfactor + " " + tarr +" " + tdep);

         if(tdep != null) t5.pred_dep_dt = tdep.toString();
         if(tarr != null) t5.pred_arr_dt = tarr.toString();
         t5.pred = "true";
       }
       if(track != "") t5.track = track.toString();
       if(os != -1) t5.ostat = os;
 //      t5.pred = "true";
 //      {t5.trip_id = tid2; report("tid2 = " + tid2);}
 //      report("6081 " + tid + " " + b + " " + track);
       utrip = t5;
     }
  }
  return(utrip);
}


function updateAlerts0(stop_id, routes, tripid)
{
//   report("6188 updateAlerts0 " + stop_id + " " + routes + " " + tripid + " " + bshowAlerts);
   
   if(bshowAlerts)
   {
//       report("8110 stop != last_stop = " + (stop_id != last_stop_id) + " delta = " + (NOW - lastAlertsUpdate > 900000));
//       report("8111 " + (NOW - lastAlertsUpdate) + " " + NJ_ALERTS.length);
     let delta = (NOW - lastAlertsUpdate);
     if((stop_id != last_stop_id) || (delta > 200000) || (delta == 0) || (NJ_ALERTS.length == 0))
     {
       lastAlertsUpdate = NOW;
       last_stop_id = stop_id;
//       DT0Alerts = [];
       let p9 = serviceE.getAlertsByStop(stop_id, routes, tripid);
         
//         let az = await serviceE.getAlertsByStop(stop_id, routes, tripid).catch((e) => {report("8116 arrg"); return([]);});
       if(p9 != null)
       {
         p9.then(function(az){
           DT0Alerts = [];
//     report("7286 az.length = " + az.length + " WxAlerts.length = " + WxAlerts.length);
//     report("8122 NJ_ALERTS.length = "+ NJ_ALERTS.length);
        
           if(az.length > 0) 
           {
             DT0Alerts = az; //.concat(DT0Alerts);  
           }
           else if((stop_id.indexOf("NJ") == 0) && (NJ_ALERTS.length > 0))
           {
              DT0Alerts =  NJ_ALERTS;
           }
           /*
           if(WxAlerts.length > 0)
           {
             DT0Alerts = WxAlerts.concat(DT0Alerts);  
           }
           */
           }).catch(function(e){
             report("6195: " + e);
          }); 
//     report("6213 updateAlerts0 " + DT0Alerts.length + " " + MTA_ALERTS.length + " " + NJ_ALERTS.length);
       }
//       else DT0Alerts = WxAlerts;
     }
   }
   
}

function loadpb()
{
  if((!PBloaded) && (!PBloading))
  {
      /*
    if(!bUseMTApb) 
    {
      PBloading = true;
      let p7 = loadScript("https://www.eightolives.com/docs/Trains/js/pb_g2x.js"); 
      p7.then(function(s){
        report("loaded pb_g2x.js");
        PBloaded = true;
//        PBloading = false;
        setTimeout(defineGRB, 10000);
      }).catch(function(e){
        report("loadpb error: " + e);
        PBloading = false;
      });
    }
    else
        */
    {
      PBloading = true;
//      let p7 = loadScript("https://www.eightolives.com/docs/Trains/js/pbf.js"); 
      let p7 = loadScript("js/pbf.js"); 
      p7.then(function(s){
//        report("loaded pbf.js");
//        let p8 = loadScript("https://www.eightolives.com/docs/Trains/js/gtfs-realtimex.browser.proto.js");
        let p8 = loadScript("js/gtfs-realtimex.browser.proto.js");
        p8.then(function(s){
//          report("loaded mta x");
          PBloaded = true;
          bNetFail = false;
          setTimeout(loadedMTAx, 10000);
        }).catch(function(e){
        report("loadmtax error: " + e);
        PBloading = false;
        });
      }).catch(function(e){
          bNetFail = true;
//        report("loadpbf error: " + e);
        PBloading = false;
      });
    }
  }
}

function loadedMTAx()
{
  GRB = 0;
  PBloading = false;  
}

function defineGRB()
{
    /*
  if((typeof require !== 'undefined') && (require != null))
  {
    GtfsRealtimeBindings = require('gtfs-realtime-bindings');
    GRB = GtfsRealtimeBindings;
    PBloading = false;
  }
  */
}


function getSUBdata(nn)
{
    let n = nn + 20; // was 5
    if(nn == 9) n = 14; // MNR
    else if(nn == 10) n = 15; // LIRR
    else if(nn == 12) n = 17; // MNR alerts
    else if(nn == 13) n = 18; // LIRR alerts
    else if(nn == 14) n = 19; // MTA alerts
    else if(nn == 16) n = 2; // MBTA trips
    else if(nn == 17) n = 3; // MTA vehicles
    else if(nn == 18) n = 30; // BART
    else if(nn == 19) n = 31; // BART alerts
    else if(nn == 20) n = 300; // AMTRAK pb
    else if(nn == 21) n = 301; // AMTRAK json
    else if(nn == 22) n = 304; // VIA pb                                                                                                                                                                                                                                                                                                                    
    report("8668 getRealTimeData n = " + n);
    getRealTimeData(n).then(function(data){
//      report("8661 n = " + n + " length = " + data.length);
      if(data.length == 17)
      {
        report("5402: permission denied");
        SUB[nn] = null;
      }
      else if(data.length == 23) 
      {
        report("5408: message = forbidden");
        SUB[nn] = null;
      }
      else if(data.length == 42) 
      {
        report("5414: message = missing authentication Token");
        SUB[nn] = null;
      }
      else if(data.length < 100)
      {
        let x = JSON.parse(data);
        report(x.message);
      }
      else if(nn == 21)
      {
        let feed = JSON.parse(data);
        feed.header = 
        {
          timestamp : getTTime() 
        };
        SUB[21] = feed;
      }
      else // if(bUseMTApb)
      {
        let pbf = new Pbf(data);
        let d = FeedMessage.read(pbf);   
        SUB[nn] = d;
        report("6473 got data n = " + n);
        if(bGFirst)
        {
          bGFirst = false;
          checktime3(qupdateDisplay);
        }
      }
      /*
      else if(GtfsRealtimeBindings)
      {
 //     report("nfi " + FindQueue[0] + " data length = " + data.length);
        let d = GtfsRealtimeBindings.FeedMessage.decode(data);
        SUB[nn] = d;  
         if(bGFirst)
        {
          bGFirst = false;
          checktime3(qupdateDisplay);
        }
      }
      */
    }).catch(function(e, o){
      report("5458: " +  e);
//      clearRealTimeCache(Number(FindQueue[0]) + 5);
      });
}

function clearFindQueue()
{
  if(FindQueue.length > 0)
  {
    FindQueue.length = 0;   
  }
}

let FindQueue = [];
let SUB = [null,null,null,null,null,null,null,null,null,null,
null, null, null, null, null, null, null, null, null, null, 
null, null, null, null, null, null, null, null, null, null,
null, null, null, null, null, null, null, null, null, null,
null, null, null, null, null, null, null, null, null, null,
null, null, null, null, null, null, null
];

let SUBTS = [null,null,null,null,null,null,null,null,null,null,
null, null, null, null, null, null, null, null, null, null, 
null, null, null, null, null, null, null, null, null, null,
null, null, null, null, null, null, null, null, null, null,
null, null, null, null, null, null, null, null, null, null,
null, null, null, null, null, null, null
];

function queueSUB(i)
{ 
  if((SUBTS[i] == null) || ((getTTime() -  SUBTS[i]) > 160))
  {
    if(SUBTS[i] == null) SUBTS[i] = getTTime(); 
//      report("8434 queue " + i );
    if(FindQueue.length < 6)
    {
      if(FindQueue.indexOf(i) == -1) 
      {
//       report("8503 add to queue " + i );
        FindQueue.push(i);
        if((FindQueue.length == 1) ) //&& (FindRequest == null))
        {
          nextFindItem();
        }
      }
    }
    else 
    {
      report("8443 FindQueue length exceeded");
      clearFindQueue();
    }
  }
}

function removeFromFindQueue()
{
  let a = FindQueue[0];
  let i = FindQueue.length - 1;
//  report("8752 remove from queue " + a);
//  while(i >= 0)
//  {
//    if(FindQueue[i] == a) FindQueue.splice(i,1);  
//    i -= 1;
//  }
//  clearFindQueue();
  if(FindQueue.length > 0) FindQueue.splice(0,1);
  if(FindQueue.length > 0) nextFindItem();
//  else report("queue empty");
}

function nextFindItem()
{
  let p = null;
  if(FindQueue.length > 0)
  {
    let s = "";
//    report("8453 nfi nn = " + FindQueue[0]);
    let bUsePbworker = true;
    let bIsJSON = false;
    let nn = Number(FindQueue[0]);
    let n = nn + 20; // was 5
    if(nn == 9) {n = 14; bUsePbworker = true;} // MNR
    else if(nn == 10) {n = 15; bUsePbworker = true;} // LIRR
    else if(nn == 12) {n = 17; bUsePbworker = true;} // MNR alerts
    else if(nn == 13) {n = 18; bUsePbworker = true;} // LIRR alerts
    else if(nn == 14) {n = 19; bUsePbworker = true;} // MTA alerts
    else if(nn == 16) n = 2; // MBTA trips
    else if(nn == 17) {n = 3; bUsePbworker = true;} // MTA vehicles
    else if(nn == 18) {n = 30; bUsePbworker = true;} // BART
    else if(nn == 19) {n = 31; bUsePbworker = true;} // BART alerts
    else if(nn == 20) {n = 300; bUsePbworker = true;}  // AMTRAK pb
    else if(nn == 21) {n = 301; bIsJSON = true;} // AMTRAK json
    else if(nn == 22) {n = 304; bUsePbworker = true;} // VIA pb
    else if(nn == 23) {n = 220; s = "&svc=CT"; bUsePbworker = true;} // Caltrain pb
    else if(nn == 24) {n = 306; bUsePbworker = true;} // // SEPTA trips
    else if(nn == 25) {n = 307; bUsePbworker = true;} // // SEPTA veh
    else if(nn == 26) {n = 308; bUsePbworker = true;} // // SEPTA alerts
    else if(nn == 27) {n = 309; bUsePbworker = true;} // // RIPTA trips
    else if(nn == 28) {n = 310; bUsePbworker = true;} // // RIPTA vehs
    else if(nn == 29) {n = 311; bUsePbworker = true;} // // RIPTA alerts
    else if(nn == 30) {n = 312; bUsePbworker = true;} // // RTD_ trips
    else if(nn == 31) {n = 313; bUsePbworker = true;} // // RTD alerts
    else if(nn == 32) {n = 314; bUsePbworker = true;} // // RTD vehs
    else if(nn == 33) {n = 315; bUsePbworker = true;} // // VRE trips
    else if(nn == 34) {n = 316; bUsePbworker = true;} // // VRE vehs
    else if(nn == 35) {n = 317; bUsePbworker = true;} // // Metrolink trips
    else if(nn == 36) {n = 318; bUsePbworker = true;} // // Metrolink vehs
    else if(nn == 37) {n = 319; bUsePbworker = true;} // // WMATA trips
    else if(nn == 38) {n = 320; bUsePbworker = true;} // // WMATA vehs
    else if(nn == 39) {n = 321; bUsePbworker = true;} // // MARC trips
    else if(nn == 40) {n = 322; bUsePbworker = true;} // // MARC vehs
    else if(nn == 41) {n = 323; bUsePbworker = true;} // // MARC alerts
    else if(nn == 42) {n = 324; bUsePbworker = false;} // // Metrolink alerts
    else if(nn == 43) {n = 325; bUsePbworker = true;} // // Brightline trips
    else if(nn == 44) {n = 330; bUsePbworker = false; bIsJSON = true;} // // AMTRAK trips v3
    else if(nn == 45) {n = 600; s = NJStop; bUsePbworker = false;} // // NJrail
    else if(nn == 46) {n = 601; s = NJStop; bUsePbworker = false;} // // NJrail
    else if(nn == 47) {n = 331; bUsePbworker = true; } // // TRR
    else if(nn == 48) {n = 332; bUsePbworker = true; } // // TRR alerts
    else if(nn == 49) {n = 333; bUsePbworker = true; } // // MSL trips
    else if(nn == 50) {n = 334; bUsePbworker = true; } // // MSL veh
    else if(nn == 51) {n = 335; bUsePbworker = true; } // // MSL alerts
    else if(nn == 52) {n = 336; bUsePbworker = true; } // // Metrolink alerts
    else if(nn == 53) {n = 219; bIsJSON = true; bUsePbworker = false; s =sSFMTA;} // SF
    else if(nn == 54) {n = 203; bUsePbworker = true; } // // Metra trip
    else if(nn == 55) {n = 204; bUsePbworker = true; } // // Metra pos
    else if(nn == 56) {n = 205; bUsePbworker = true; } // // Metra alerts
    
//    report("6549 getRealTimeData n = " + n + " " + NOWDATE.toLocaleString());
//    report("7560 n = " + n + " "+ bUsePbworker);  
//    if((pbworker != null) && ( n != 324)  && ( n != 330) && (n != 600)  && ((n == 15) || (n == 14)  || (n >= 304) || (n == 220)  || (n == 31)))  // (n != 312)
    if((bUsePbworker) && !bIsJSON && (pbworker != null))
    {  
//        report("7604 " + n);
        let p2 = new Promise(function(resolve,reject) {
            pbworker.onmessage = function(evt) {
            let m = evt.data;
 //           console.log("6440: " + m[0]);
            switch(m[0])
            {
              case 1:
                resolve(m[1]);
                break;
              case 2:
                console.log("6446: " + m[1]);
                break;
              default:
                break;
            }
           };
           
//           if(bpbfirstinit) 
            {
              pbworker.postMessage([ 0, ""]);
              bpbfirstinit = false;
            }
            pbworker.postMessage([ 1, n+s]);
           
        }).then(function(d) {
            if(d.length <= 1)
            {
              SUBTS[Number(FindQueue[0])] = null;
              removeFromFindQueue();
              console.log("8710 d undefined " + (typeof d === 'undefined'));
            }
            else
            {
              SUB[Number(FindQueue[0])] = d; 
              SUBTS[FindQueue[0]] = getTTime();
              qupdateDisplay();
              removeFromFindQueue();
            }
            }).catch(function(e) {
                console.log("6467: " + e);
                removeFromFindQueue();
           });
    }
    else
    {
 //     report("7599 " + n + " s.length = " + s.length);
      p = getRealTimeDataA(n,s).then(function(data){
//          report("8901 n = " + n + " data = " + data);
        if(data.length <= 1)
        {
          SUBTS[Number(FindQueue[0])] = null;
//          console.log("8732 data " + data.length  + " " + (typeof data === 'undefined') + " " + (typeof data.entity === 'undefined'));
          removeFromFindQueue();
        }
        else if(data.length == 17)
        {
          report("nfi: permission denied");
          SUB[Number(FindQueue[0])] = null;
          SUBTS[Number(FindQueue[0])] = null;
          removeFromFindQueue();
        }
        else if(data.length == 23) 
        {
          report("nfi23: message = forbidden");
          SUB[Number(FindQueue[0])] = null;
          SUBTS[Number(FindQueue[0])] = null;
          removeFromFindQueue();
        }
        else if(data.length == 42) 
        {
          report("nfi23: message = missing authentication Token");
          SUB[Number(FindQueue[0])] = null;
          SUBTS[Number(FindQueue[0])] = null;
          removeFromFindQueue();
        }
        else if((n == 309) && (data.length <150)) 
        {
//          report("8975: less than 150 bytes received");
          SUB[Number(FindQueue[0])] = null;
          SUBTS[Number(FindQueue[0])] = null;
          removeFromFindQueue();
        }
        else if(bIsJSON)
        {
          report("7409: " + data);
          try {
            let feed = JSON.parse(data);
            feed.header = 
            {
              timestamp : getTTime() 
            };
            SUB[nn] = feed;
            SUBTS[nn] = getTTime();
          }
          catch(e) {
            report("8967 " + e);
          }
          removeFromFindQueue();
        }
        else if((pbworker != null) && ( n != 312)  && ( n != 333) && ( n != 324)  && ((n == 15) || (n >= 304) || (n == 220) || (n == 14) || (n == 300) ))
        {
          report("9053 n = " + n);
          if(n == 14)
          {
//          let d = GtfsRealtimeBindings.FeedMessage.decode(data);
            let pbf = new Pbf(data);
            let d = FeedMessage.read(pbf);   
            SUB[Number(FindQueue[0])] = d;  
            SUBTS[Number(FindQueue[0])] = getTTime();
          }
          let p2 = new Promise(function(resolve,reject) {
            pbworker.onmessage = function(evt) {
            let m = evt.data;
//            console.log("6521: " + m[0]);
            switch(m[0])
            {
              case 1:
                resolve(m[1]);
                break;
              case 2:
                console.log("6527:  " + m[1]);
                break;
              default:
                break;
            }
           };
           
           if(bpbfirstinit) 
            {
              pbworker.postMessage([ 0, ""]);
              bpbfirstinit = false;
            }
//            pbworker.postMessage([ 1, n]);
            pbworker.postMessage([ 3, data]);
           
          }).then(function(d) {
            SUB[Number(FindQueue[0])] = d; 
            SUBTS[FindQueue[0]] = getTTime();
            qupdateDisplay();
            removeFromFindQueue();
            }).catch(function(e) {
                console.log("6548:" + e);
                removeFromFindQueue();
           });
            /*
          if((n == 300)) // || (n == 312))
          {
            try{
//          let d = GtfsRealtimeBindings.FeedMessage.decode(data);
              if((!PBloaded) && (!PBloading))
              {
                loadpb();
              }
              else if(typeof Pbf !== 'undefined')
              {
              let pbf = new Pbf(data);
              let d = FeedMessage.read(pbf);   
              SUB[Number(FindQueue[0])] = d;  
              SUBTS[Number(FindQueue[0])] = getTTime();
              qupdateDisplay();
              }
            }
            catch(error) {
            console.log("6557 " + error);   
            }
          }
          */

        } 
        
        else if((eopb1 != null)) //    && ( n != 324)  && ((n == 15) || (n == 30)  || (n == 300) || (n >= 304) || (n == 203) || (n == 204) || (n == 205)|| (n == 220) || (bUseMTApb && (n == 14))))
//        else if(bUsePbworker && (eopb1 != null))
        {
//        report("6552 " + n );
//          report("9006 pb n = " + n + " length = " + data.length);
//          if(n != 300)
          {
          eopb1.setDecoder(new GTFSdecoder());
          SUB[Number(FindQueue[0])] = eopb1.decode(data);
//        report("7896 " + FindQueue[0] + " " + n + "\n" + JSON.stringify(SUB[Number(FindQueue[0])], null, 4));
          SUBTS[Number(FindQueue[0])] = getTTime();
          qupdateDisplay();
 //         removeFromFindQueue();  
          }
          let xx = FindQueue[0];
          removeFromFindQueue();  
          
          /*
          if((n == 300)) // || (n == 312))
          {
            try{
//          let d = GtfsRealtimeBindings.FeedMessage.decode(data);
              let pbf = new Pbf(data);
              let d = FeedMessage.read(pbf);   
              SUB[Number(xx)] = d;  
              SUBTS[Number(xx)] = getTTime();
              qupdateDisplay();
//              removeFromFindQueue();  
            }
            catch(error) {
            console.log("6557 " + error + "\n" + data);   
            removeFromFindQueue();  
            }
          }
          */
          
        }
        else // if(bUseMTApb)
        {
        report("7719 pbf n = " + n + " length = " + data.length);
 //       if(n == 17) report("9030 " + data);
 //         if(n != 21)
          {
          try {
          let pbf = new Pbf(data);
          let d = FeedMessage.read(pbf);  
          SUB[Number(FindQueue[0])] = d;  
          SUBTS[Number(FindQueue[0])] = getTTime();
          }
          catch(e) {
              report("9023 pbf " + e);
              if((!PBloaded) && (!PBloading))
              {
                loadpb();
              }
          }
//        report("7910 " + FindQueue[0] + " " + n + "\n" + JSON.stringify(d, null, 4));
          qupdateDisplay();
          removeFromFindQueue();
          if(bGFirst)
          {
            bGFirst = false;
            checktime3(qupdateDisplay);
          }
          }
        }
      /*
      else if(GtfsRealtimeBindings)
      {
//        report("6574:\n");
//      report("nfi " + FindQueue[0] + " data length = " + data.length);
//        eopb1.setDecoder(new GTFSdecoder());
//        let ggs = eopb1.decode(data);
//        report(JSON.stringify(ggs, null, 4));
        let d = GtfsRealtimeBindings.FeedMessage.decode(data);
        SUB[Number(FindQueue[0])] = d;  
        SUBTS[Number(FindQueue[0])] = getTTime();
//      report("got subway data " + FindQueue[0]);
        removeFromFindQueue();
        if(bGFirst)
        {
          bGFirst = false;
          checktime3(qupdateDisplay);
        }
      }
      */

        let tn = getTTime();
        for(let i = 0; i < SUBTS.length; i++)
        {
          if(SUBTS[i] != null)
          {
            if(tn - SUBTS[i] > 900)
            {
              SUB[i] = null;
              SUBTS[i] = null;
            }
          }
        }
      }); /*.catch(function(e){
        console.log("6812 nfi: " +  FindQueue[0] + " " + e);
//      clearRealTimeCache(Number(FindQueue[0]) + 5);
        removeFromFindQueue();
        }); */
    }
  }
}


function getSubindexByRoute(route_id)
{
  let n = 0;
//  if(route_id == "NY1") n = 0;
//  else if(route_id == "NY2") n = 0;
//  else if(route_id == "NY3") n = 0;
//  else if(route_id == "NY4") n = 0;
//  else if(route_id == "NY5") n = 0;
//  else if(route_id == "NY6") n = 0;
  if(route_id == "NYA") n = 1;
  else if(route_id == "NYC") n = 1;
  else if(route_id == "NYE") n = 1;
  else if(route_id == "NYH") n = 1;
  else if(route_id == "NYSI") n = 5;
  else if(route_id == "NYS") n = 1;
  else if(route_id == "NYN") n = 2;
  else if(route_id == "NYQ") n = 2;
  else if(route_id == "NYR") n = 2;
  else if(route_id == "NYW") n = 2;
  else if(route_id == "NYB") n = 3;
  else if(route_id == "NYD") n = 3;
  else if(route_id == "NYF") n = 3;
  else if(route_id == "NYM") n = 3;
  else if(route_id == "NYL") n = 4;
  else if(route_id == "NYG") n = 6;
  else if(route_id == "NYJ") n = 7;
  else if(route_id == "NYZ") n = 7;
//  else if(route_id == "NY7") n = 8;
  return(n);  
}

//let bMTQinProcess = false;
//let bGTQinProcess = false;
let MTQueue = [];
let GTQueue = [];
let MTQP = null;

/*
function nextMTQueueItemNew()
{
  if((MTQP == null) && !bMTQinProcess && (MTQueue.length > 0))
  {
    let o = MTQueue[0];
    if(tmworker !== null)
    {
        
    }
    else if((typeof eotm !== 'undefined') && (eotm != null)) 
    {
        report("6667 nextMTQueueItem " + o.route_id);
        bMTQinProcess = true;  
        eotm.processItem(o).then(function(res) {
          report("6668 " + JSON.stringify(res, null, 4));  
          if(MTQueue.length > 0)
          {
            MTQueue.splice(0, 1);
          }
          bMTQinProcess = false;
          if(MTQueue.length > 0) setTimeout(nextMTQueueItem, 100);
          else
          {
            qupdateDisplay();
          }
          }).catch(function(e) {
                console.log(e);
                bMTQinProcess = false;
          });
    }
    else nextMTQueueItemOld();
  }
}
*/

function getGindex(field, defarray)
{
  let b = true;
  let i = 0;
  let k = defarray.length;
  while(b && (i<k))
  {
    if(field == defarray[i])
    {
      b = false;   
    }
    else i += 1;
  }
  if(b) i = -1;
  return(i);
}

function nextMTQueueItem()
{
//    report("6584 nextMTQueueItem " +  bMTQinProcess + " " + MTQueue.length + "\n");
  if((MTQueue.length > 0) && !bMTQinProcess)
  {
    bMTQinProcess = true;
    if(!bSkedAll)
    {
         
    }
    let o = MTQueue[0];
//    report("6592 MTQueue getTripsData " + o.route_id + " " + o.svc + "\n");
    let rt = o.route_id;
    let osv = o.svc;
    let n = 1; // NJbus
    if(o.route_id.indexOf("PV") == 0) n = 2;
    else if(o.route_id.indexOf("RIPT") == 0) n = 3;
    else if(o.route_id.indexOf("MD") == 0) n = 4;
    else if(o.route_id.indexOf("TR") == 0) n = 5;
    else if(o.route_id.indexOf("CTA") == 0) n = 6;
    else if(o.route_id.indexOf("SF_") == 0) 
    {
        n = 7;
        rt = "SFB_" + o.route.routem.substring(3); 
//        rt = "o.route_id.substring(3); 
//        rt = o.route.routem;
//         osv = "SF_" + o.svc.substring(3);
         osv =  o.svc.substring(3);
//        report("3330 " + rt + " " + o.svc + " " + osv);
 //        report("   getTripsData " + rt + " " + osv + " " + n);
    }
    else if(o.route_id.indexOf("SFB_") == 0)
    {
        n = 8;
        rt = o.route_id; 
        osv = o.svc.substring(3);
//        report("6740   getTripsData " + rt + " " + osv + " " + n);
    }
    else if((o.route_id.indexOf("LAMB") == 0) && (o.route_id != "LAMB"))
    {
        n = 9;
        rt = "LAMB_" + o.route.routem.replace("-", "_"); 
    }
    else if((o.route_id.indexOf("LAM") == 0) &&  (o.route_id.indexOf("LAML") != 0))
    {
        n = 10;
        rt = "LAM" + o.route.routem; 
    }
    else if(o.route_id.indexOf("ST") == 0)
    {
        n = 11;
        rt = o.route.routem; 
        osv = o.svc;
//        report("   getTripsData " + rt + " " + osv + " " + n);
    }
    else if((o.route_id.indexOf("BOB") == 0) || (o.route_id.indexOf("SBB") == 0) || (o.route_id.indexOf("WAB") == 0) || (o.route_id.indexOf("RhB") == 0))
    {
        n = 13;
        rt = o.route.routem; 
        osv = o.svc;
 //       report("   getTripsData " + rt + " " + osv + " " + n);
    }
    else if(o.route_id.indexOf("MN") == 0)
    {
        n = 14;
        rt = o.route_id; 
        osv = o.svc;
//        report("5362   getTripsData " + rt + " " + osv + " " + n);
    }
    else if(o.route_id.indexOf("DART_") == 0)
    {
        n = 15;
        rt = "DART_" + o.route.routem; 
        osv = o.svc;
//        report("   getTripsData " + rt + " " + osv + " " + n);
    }
    else if(o.route_id.indexOf("MSLB") == 0)
    {
        n = 16;
        rt = o.route.m; 
        osv = o.svc;
//        report("   getTripsData " + rt + " " + osv + " " + n);
    }
    else if(o.route_id.indexOf("WMB_") == 0)
    {
        n = 17;
        rt = o.route_id.substring(4); 
        osv = o.svc.substring(3);
//        report("   getTripsData " + rt + " " + osv + " " + n);
    }
    else if(o.route_id.indexOf("RTDB_") == 0)
    {
        n = 18;
        rt = o.route_id; 
        osv = o.svc;
//        report("   getTripsData " + rt + " " + osv + " " + n);
    }
    let tzxd = getTzFactor(Here, o.route.cal.gtfstz);

    report("6657 MTQueue getTripsData " + o.route_id + " " + rt + " " + o.svc + " " + osv + " " + n);
    let p5 = serviceEO.getTripsData(rt, osv,n);
    p5.then(function(data) {
//        if(n == 7) 
        report("3155:\n" + data + "\n");
//        report("6970 " + data.length + " " + o.route_id + " (" + rt + ")");
//        if(data.length == 0) report("6971: no trips for route " + o.route_id + " (" + rt + ")");
        let d = [];
        if(data.indexOf("\"") == -1)
        {
          d = SimpleCSVparse(data);
//          report("9019 used SimpleCSVparse");
        }
        else d = splitCSV2(data);
        let k3 = d.length - 3;
        let i3 = 0;
        let c = 0;
//        if(n == 9) 
//            report("3159 k3 = " + k3 + " rt = " + rt + " " + osv + " " + n + " " + d[1]);
//        report("4877: " + NOWHRS + ":"+ NOWMIN);
        let tripsinc = -1;  
        if(typeof o.route.cal.tripsdef !== 'undefined')
        {
          tripsinc = o.route.cal.tripsdef.length;   
        }
        let tidoffset = 2;
        if(tripsinc != -1)
        {
          tidoffset = getGindex("trip_id", o.route.cal.tripsdef);
        }
        let actcalcount = 0;
        let acttrips =0;
        let zsvc = "";
        let inc = 9;
//        let times = 0;
        
        while(i3 < k3)
        {
          if((n == 13) || (n == 16) || (d[i3 + 1] == osv))
 //         if(d[i3 + 1] == osv)
          {
          let oj = null;
          if(n == 1) oj = o.route.getTTrip("NJB" + d[i3 + 2]);
          else if(n == 2) oj = o.route.getTTrip("PV_" + d[i3 + 2]);
          else if(n == 3) oj = o.route.getTTrip("RIPT" + d[i3 + 2].trim());
          else if(n == 4) {oj = o.route.getTTrip(d[i3 + 2].trim()); inc= 9;}
          else if(n == 5) oj = o.route.getTTrip("TR" + d[i3 + 2].trim());
          else if(n == 6) oj = o.route.getTTrip(d[i3 + 2].trim());
          else if(n == 7) { oj = o.route.getTTrip("SF_" + d[i3 + 2].substring(3).trim()); c = 3;}
          else if(n == 8) { oj = o.route.getTTrip("SFB_" + d[i3 + 2].trim()); c = 3; inc=9;}
          else if(n == 9) { oj = o.route.getTTrip("LAMB_" + d[i3 + 2].substring(7).substring(0,7).trim()); c = 3;inc = 9;} // was 10
          else if(n == 10) { oj = o.route.getTTrip("LAM" + d[i3 + 2].trim()); c = 3;}
          else if(n == 11) { oj = o.route.getTTrip(d[i3 + 2].trim()); c = 3;}
          else if(n == 13) { oj = o.route.getTTrip(d[i3 + 2].trim()); c = -6; inc=8;}
          else if(n == 14) { oj = o.route.getTTrip(d[i3 + 2].trim()); inc= 9;}
          else if(n == 15) { oj = o.route.getTTrip("DART_" + d[i3 + 2].trim()); inc= 9; c=1;}
          else if(n == 16) { oj = o.route.getTTrip("MSLB" + d[i3].trim()); inc= 8;c = 1}
          else if(n == 17) { oj = o.route.getTTrip("WMB" + d[i3].trim()); inc= 7;}
          else if(n == 18) { oj = o.route.getTTrip("RTDB_" + d[i3].trim()); inc= 7;}
//              report("3451 " + d[i3] + " " + rt + " " + d[i3+1] + " " + osv + " " + oj + " " + inc);
//          }
//         if(n == 17) report("4899 WMB" + d[i3 + 2].substring(7).substring(0,7).trim() + " " + d[i3 + 3] + " " + oj);
          if(c != tzxd) report("6694 c = " + c + ", tzxd = "+ tzxd);
          c = tzxd;
          let boj = false;
          if((oj != null) && (oj.times.length > 0)) {boj = true; report("4902 boj = true");}
//        report("6651: " + d[i3] + " " + rt + " " + d[i3+1] + " " + osv + " " + oj);
//          if(times < 3) report("9072 " + times + " " + i3 + " " + d[i3] + " " + (oj == null));
//          times += 1;
          if(((d[i3] != rt) || (d[i3+1] != osv)) && (n != 13) && (n != 16) && (n != 17)) ;
          else if(oj == null)
          {
//            if(times < 3) report("9074 " + times + " " + i3 + " " + d[i3]);
//            times += 1;
//            report("4853 " + bgo + " " + bSkedAll + " " + i3 + " " + d.length);
            let bgo = true;
            if(!bSkedAll && ((i3 + 7) < d.length) && (n != 13) && (n != 14)  && (n != 7) && (n != 8) && (n != 9) && (n != 16) && (n != 17)) 
            {
              let th = d[i3 + 8];
              let hi = th.indexOf(":");
              if(hi != -1)
              {
                th = Number(th.substring(0, hi));
                if(NOWHRS - c >  th)  bgo = false;
                else if(NOWHRS - c == th)
                {
                  let tm = Number(d[i3 + 8].substring(hi + 1)) + 2;
                  if(NOWMIN > tm) bgo = false;
                } 
                if(bSkedP)
                {
                  th = d[i3 + 7];
                  hi = th.indexOf(":");
                  if(hi != -1)
                  {
                    th = Number(th.substring(0, hi));
                    if(NOWHRS - c + 3 < th) bgo = false;
                  }
                }
              }
            }
//            if(n == 15) report("4931 " + d[i3 + 3] + " " + bgo);
            if(bgo)
            {
            let dname = d[i3 + 3];
            let tname = d[i3 + 3];
            tname = tname.replace(/"/g, '');
            if(tname.indexOf("TO ") == 0) tname = tname.substring(3);
            else if(tname.indexOf("to ") == 0) tname = tname.substring(3);
            let nn = "NJB";
            let sh = "NJG";
            let sv = "NJS";
            if(n == 1)
            {
               dname = "";   
            }
            if(n == 2) 
            {
                nn = "PV_";
                sh = "PV";
                sv = "";
            }
            else if(n == 3) 
            {
                nn = "RIPT";
                sh = "RIPT";
                sv = "";
            }
            else if(n == 4) 
            {
                nn = "";
                sh = "";
                sv = "";
            }
            else if(n == 5) 
            {
                nn = "";
                sh = "";
                sv = "";
                tname = d[i3 + 2];
                
                tname = tname.replace(/"/g, '');
                if(dname == "North")
                {
                  if(tname.indexOf("X") != -1) tname = "Northbound";
                  else tname = "Northbound / Mangonia";
                }
                else
                {
                  if(tname.indexOf("X") != -1) tname = "Southbound/ Miami Central"; 
                  else tname = "Southbound / Miami Airport"; 
                }
//                if(d[i3 + 6].indexOf("SB") != -1) tname = "Southbound / Miami Airport";
//                else tname = "Northbound / Magnolia";
//                report(d[i3 + 6]);
            }
            else if(n == 6) 
            {
                nn = "CTA";
                sh = "CTA";
                sv = "";
            }
            else if(n == 7) 
            {
                nn = "SF_";
                sh = "SF_";
                sv = "";
                dname = "SF Rapid Transit " + o.route.route_id;
            }
            else if(n == 8) 
            {
                nn = "SFB_";
                sh = "SF_";
                sv = "";
                dname = "SF Bus " + o.route.route_id;
            }
            else if(n == 9) 
            {
                nn = "LAMB_";
                sh = "LAB";
                sv = "";
                dname = "LA Metro Bus " + o.route.route_id;
                tname = d[i3+2];
            }
            else if(n == 10) 
            {
                nn = "LAM";
                sh = "LAT";
                sv = "";
                dname = "LA Metro " + o.route.route_id;
            }
            else if(n == 11) 
            {
                nn = "";
                sh = "SOUND";
                sv = "";
                dname = "Sound Transit " + o.route.route_id;
            }
            else if(n == 13) 
            {
                dname = d[i3 + 4];
                tname = d[i3 + 3];
                tname = tname.replace(/"/g, '');
                nn = "Z_";
                sh = "";
                sv = "";
//                dname = o.route.route_name;
            }
            let dir =  d[i3 + 4];
            let tid = "";
            let tn = d[i3 + 2];
            let shid = d[i3 + 6];
            if(n == 13) 
            {
                tid = d[i3 + 2];
                tn = d[i3 + 4] + "_" + tid.substring(0, tid.indexOf("."));
                dir = d[i3 + 5];
                if(dir.indexOf("0") != -1) dir = 0;
                else dir = 1;
                shid = "";
                zsvc = d[i3 + 1];
                inc = 7;
            }
            if(n == 14)
            {
              tid = tn;
              nn = d[i3] + "_";
              dname = "MetroNorth " + d[i3 + 4];
              dir = d[i3 + 5];
              inc = 10;   
 //             report("5546 " + nn + dname);
            }
            if(n == 15)
            {
              tid = tn;
              nn = "DART_";
              dname = ""; //"DART " + d[i3 + 3];
              dir = d[i3 + 4];
              inc = 9; // was 7
              sv = "";
//              report("9232 " + d[i3] + " " +  dname);
            }
            if(n == 16)
            {
              tn = d[i3]
              tid = d[i3];
              nn = "MSLB";
              let busno = o.route.route_id.substring(4);
//              dname = "Metro Bus " + busno +" " + d[i3 + 3];
              dname = "";
              dir = d[i3 + 4];
              inc = 8; 
              tripsinc = 8;
              sv = "";
//              report("9244 " + i3 + " " + tripsinc + " "  +  d[i3] + ", " +  dname +  " " + n);
            }
            if(n == 17)
            {
              tn = d[i3 + 2]
              tid = d[i3 + 2];
              nn = "WMB";
//              let busno = o.route.route_id.substring(4);
//              dname = "Metro Bus " + busno +" " + d[i3 + 3];
              dname = "";
              dir = d[i3 + 4];
              inc = 9; 
              tripsinc = 9;
              sv = "";
//              report("9244 " + i3 + " " + tripsinc + " "  +  d[i3] + ", " +  dname +  " " + n);
            }
            if((n == 7) || (n == 8))
            {
              tid = tn;
//              tn = tn.substring(3);
              dir = d[i3 +4];
              shid = d[i3 + 6];
            }
            tn = tn.trim();
            
            if(n == 9)
            {
//              report("3990 " + tn);
              tid = tn;
              let ng = tn.lastIndexOf("_");
              if(ng != -1)
              {
                  tn = tn.substring(ng - 7, ng);
              }
              shid = d[i3 + 6];
            }
            
            let tt = new TTrip(nn + tn, dname, dir, "");
//            if(n == 16)
            report("8689 new TTrip " + tt.trip_id + " " + o.route.route_id + " :" + dname + " " + tid);
//            report("  new TTrip " + nn + tn + " " + dname + " " + dir + " " + tname);
            tt.headsign = tname;
//            tt.parent = o.route;
            tt.parent_name = o.route.route_id;
            if(n == 13) tt.shape_id = null;
            else tt.shape_id = sh + shid;
            tt.direction = dir;
            tt.service_ids = [];
            tt.service_ids.push(sv + o.svc);
//            report("8391 " + sv + o.svc);
            tt.startcdate = o.startcdate;
            tt.comp = [];
            if(tid != "") tt.tid = tid;
//          tt.parent = o.route;
//            if((n == 13) || (n == 10)) report("new TTrip " + tt.trip_id + " " + tt.direction + " " + tt.headsign + " " + tt.shape_id + " " + o.route.route_id);
            if(n == 9) tt.cal = LAMB_Cal;
            if(n == 13) tt.zsvc = zsvc;
           let y = {
              route: o.route,
              trip: tt,
              n: n,
              o: o
            };
            GTQueue.push(y);
//            report("7191 added " + tt.trip_id + " to " + o.route.route_id);
            o.route.addTrip(tt);
            }
          }
          }
          if(tripsinc == -1) tripsinc = inc;
//            report("9474 " + tripsinc + " " + inc);
          i3 += tripsinc;
        }
//        report("  o.route " + o.route.route_id + " has " + o.route.trips.length + " trips");
        let p2 = nextGTQueueItem();
        p2.then(function(){
            if(MTQueue.length >= 1)
            {
              MTQueue.splice(0, 1);
//              report("removed 1 from MTQueue, " + MTQueue.length + " left");
              bMTQinProcess = false;
              if(MTQueue.length >= 1) setTimeout(nextMTQueueItem, 100);
              else
              {
                  qupdateDisplay();
              }
 //             else report(JSON.stringify(o.route.trips, null, 4));
            }
        });
       }).catch(function(e) {
            if(bOnLine) report("3288 " + e);
            if(MTQueue.length >= 1)
            {
              MTQueue.splice(0, 1);
//              report("removed 1 from MTQueue, " + MTQueue.length + " left");
              bMTQinProcess = false;
              if(MTQueue.length >= 1) setTimeout(nextMTQueueItem, 100);
              else qupdateDisplay();
 //             else report(JSON.stringify(o.route.trips, null, 4));
            }
       });
  }
}

function addRouteToStop(route, stop_id, o)
{
  let a = null;
  if((o.n == 0) || (o.n == 1)) a = stops_NJbus;
  else if(o.n == 2) a = stops_PVRTA;
  else if(o.n == 3) a = stops_RIPTA;
  else if(o.n == 4) a = stops_MDC;
  else if(o.n == 5) a = stops_trirail;
  else if(o.n == 6) a = stops_CTABus;
  else if(o.n == 7) a = stops_SFMTA2;
  else if(o.n == 8) a = stops_SFMTA2Bus;
  else if(o.n == 9) a = stops_LABus;
  else if(o.n == 10) a = stops_LAMetro;
  else if(o.n == 13) a = stops_sbb;
  else if(o.n == 14) a = stops_NY;
  else if(o.n == 15) a = stops_DART;
  let n = getStopIndexForArray(stop_id, a, 12);
  if(n != -1)
  {
     let b = document.getElementById("tas").checked;
     let routes =  a[n + 11];
     if((routes == "") || (routes == " ")) 
     {
         a[n + 11] = route.route_id;
         if(b) report("added - " + route.route_id + " to stop " + stop_id);
     }
     else if(routes.indexOf(route.route_id) == -1)
     {
       a[n + 11] += "," + route.route_id;
       if(b) report("added -- " + route.route_id + " to stop " + stop_id);
     }
  }
}

function nextGTQueueItem()
{
  let p = new Promise(function(resolve, reject) {
  if(GTQueue.length > 0)
  {
    let o = GTQueue[0];
    let bCOMP = false;
    let ttid = o.trip.trip_id;
//    report("5770 nextGTQueueItem " + o.trip.trip_id + " " + o.n + " " + o.trip.tid);
//    if((o.n == 7) || (o.n == 8) || (o.n == 14))
    if(o.n == 14)
    {
      ttid = ttid.substring(ttid.indexOf("_") + 1);   
    }
    else if((o.n == 7) || (o.n == 8) || (o.n == 9) || (o.n == 13) || (o.n == 15))
    {
      ttid = o.trip.tid;   
    }
    else if(o.n == 16)
    {
      ttid = ttid.substring(4);   
    }

 //   report("3716 getTimesData " + ttid + " " + o.n + " " + o.route.route_id);
    let p5 = serviceEO.getTimesData(ttid, o.n);
    p5.then(function(data) {
 //       if(o.n == 17)         report("6928: " + data.length + "\n" + data + "\n");
        if(data.length == 0) report("7285: no times data for trip " + ttid);
        let d = splitCVS(data);
        if(o.n == 4)
        {
          if(d[0] == d[8]) 
          {
             d.splice(8, 0, 0); 
          }
        }
//        if(o.n == 8) report("\n" + data + "\n");
        let k3 = d.length - 3;
 //       report("  " + o.trip.trip_id + " has stops = " + Math.floor(k3/8) + " " + k3);
        let i3 = 0;
        let stps = o.route.stop_ids;
        let k = o.route.stop_ids.length;
//        report("5155 k = " + k + " " + o.trip.direction + " " + o.route.stop_ids0.length + " " + o.route.stop_ids1.length);
        if(k == 0)
        {
          if((typeof o.route.stop_ids0 !== 'undefined') && (Number(o.trip.direction) == 0))
          {
              stps = o.route.stop_ids0;
              k =  o.route.stop_ids0.length;  
          }
          else if((typeof o.route.stop_ids1 !== 'undefined') && (Number(o.trip.direction) == 1)) 
          {
              stps = o.route.stop_ids1;
              k =  o.route.stop_ids1.length;  
          }
        }
        let a = [];
        let i = 0;
        if(o.n == 9) o.trip.headsign = d[5];
            
 //       report("5170  k = " + k + " dir = " + o.trip.direction + " k3 = " + k3);
        for(i = 0; i < k; i++) a.push("-1");
        if(((o.n == 6) || (o.n == 9) || (o.n == 10)) && (k3 > 0)) o.trip.headsign = d[5].replace(/"/g, '');
        while(i3 < k3)
        {
//          report("5819  " + d[i3 + 1] + " k3 = " + k3 + " " + o.n + " " + i3);
          if(typeof d[i3 + 3] !== 'undefined')
          {
          let stop =  d[i3 + 3].trim(); 
          stop = stop.replace(/"/g, '');
          let pf = "NZ";
          if(o.n == 2) pf = "PV";
          else if(o.n == 3) pf = "RIPT";
          else if(o.n == 4) pf = "MDC";
          else if(o.n == 5) pf = "TR";
          else if(o.n == 6) pf = "CH";
          else if(o.n == 7) pf = "SF_";
          else if(o.n == 8) {pf = "SFB_"; bCOMP = true;}
          else if(o.n == 9) {pf = "LAMB"; bCOMP = true;}
          else if(o.n == 10) pf = "LAM";
          else if(o.n == 11) 
          {
              stop = d[i3 + 1].trim();
              pf = "PS_";
              bCOMP = true;
//              if(o.route.route_id == "ST1") pf = "PS_1-";
          }
          else if(o.n == 13) {pf = "Z_"; bCOMP = true;}
          else if(o.n == 14) pf = "MNR_";
          else if(o.n == 15) {pf = "DT_"; bCOMP = true;}
          else if(o.n == 16) {pf = "MSLB"; bCOMP = true; stop = d[i3];}
          else if(o.n == 17) {pf = "WMB"; bCOMP = true; stop = d[i3 + 3];}
          else if(o.n == 18) {pf = "RTDB_"; bCOMP = true; stop = d[i3 + 3];}

 //         if((o.n == 11)||(o.n == 7) ||(o.n == 8)) stop = d[i3 + 1].trim();
          if(o.n == 11) stop = d[i3 + 1].trim();
          if(stop.indexOf(pf) != 0)
          {
            stop = pf + stop;   
          }
          if(o.n == 3)
          {
            stop = stop.trim();   
          }
 //         if(o.n == 15) report("5123 " + stop + " " + o.route.stop_ids[0]);
          let index = -1;
          if(!bCOMP) index = o.route.getStopIndex(stop, o.trip.direction);
          let sa = 0;
          let sd = 0;
          if(o.n == 11)
          {
            sa = d[i3 + 2].substring(0, d[i3 + 2].lastIndexOf(":"));
            sd = d[i3 + 3].substring(0, d[i3 + 3].lastIndexOf(":"));
          }
          if(o.n == 16)
          {
            sa = d[i3 + 3].substring(0, d[i3 + 3].lastIndexOf(":"));
            sd = d[i3 + 4].substring(0, d[i3 + 4].lastIndexOf(":"));
          }
          else if((o.n == 7) || (o.n == 8) || (o.n == 9))
          {
            sa = d[i3 + 1].substring(0, d[i3 + 1].lastIndexOf(":"));
            sd = d[i3 + 2].substring(0, d[i3 + 2].lastIndexOf(":"));
          }
          else if(o.n == 5)
          {
            let j4 = d[i3+1].lastIndexOf(":");
            sa = d[i3+1].substring(0, j4);
            j4 = d[i3+2].lastIndexOf(":");
            sd = d[i3+2].substring(0, j4);           
          }
          else
          {
            sa = d[i3 + 1];
            sd = d[i3 + 2];
            sa = sa.replace(/"/g, '');
            sd = sd.replace(/"/g, '');

            sa = sa.substring(0, sa.lastIndexOf(":"));
            sd = sd.substring(0, sd.lastIndexOf(":"));
          }
 //         report("5223 " + stop + " " + d[i3 + 1] + " " + d[i3 + 2] + " " + sa + " " + sd);
          if((index != -1) && (!bCOMP))
          {
            if(sa == sd) a[index] = sa;
            else a[index] = sa + "/" + sd;
          }
          else
          {
 //           report("7090 comp added " + stop + " to " + o.trip.trip_id + " " + sa + " " + sd + " " + o.route.route_id);
            {
              let tdd = sa;
              if(sa != sd) tdd = sa + "/" + sd;
 /*             let track = "";
              if(stop.indexOf(":") != -1)
              {
                track = stop.substring(stop.lastIndexOf(":") + 1);
                stop = stop.substring(0,stop.indexOf(":"));
              }
              */
//              o.trip.comp.push( { stop_id: stop, tsa: sa, tsd: sd });
              o.trip.comp.push( { s: stop, a: sa, d: sd });
            }
//            stps.push(stop);
//            if(sa == sd) a.push(sa);
//            else a.push(sa + "/" + sd);
//            addRouteToStop(o.route, stop, o);
            
          }
//          report("5192 " + stop + " " + sa + " " + sd);
          }
          else report("  stop " + stop + " is undefined for trip " + o.trip_id + " i3 = " + i3);
/*          if((o.n == 7) && (i3 < 40))
          {
             report("3793 " + sa + " " + sd);   
          }
          */
          if(o.n == 3) i3 += 7;
          else if(o.n == 5) i3 += 6;
          else if(o.n == 4) i3 += 10; //was 9
          else if(o.n == 7) i3 += 10; // was 10
          else if(o.n == 8) i3 += 10; // was 10
          else if(o.n == 9) i3 += 13; // LAMB was 13
          else if(o.n == 10) i3 += 11; // was 11
          else if(o.n == 11) i3 += 7; // was 8
          else if(o.n == 13) i3 += 7;
          else if(o.n == 15) i3 += 10; // was 10
          else if(o.n == 16) i3 += 9; 
          else if(o.n == 17) i3 += 10; 
          else i3 += 8;
        }
        if(!bCOMP) o.trip.times = a;
        if(GTQueue.length >= 1)
        {
          GTQueue.splice(0,1);
//          report("removed 1 from GTQueue, " + GTQueue.length + " left");
          let p2 = nextGTQueueItem();
          p2.then(resolve());
        }
        else resolve();
       }).catch(function(e) {
           report("7439: " + e);
           reject(e);
       });
  }
  else
  {
//      report("  resolve 2020");
      resolve();
  }
  });
  return(p);
}

function getRouteM(route_id)
{
  let b = true;
  let m = -1;
  if(typeof NJrouteIdMap !== 'undefined')
  {
    let r = route_id.substring(1);
    let k = NJrouteIdMap.length
    let i = 0;
    while(b && (i < k))
    {
      if(NJrouteIdMap[i + 1] == r)
      {
        b = false;
        m = NJrouteIdMap[i];
      }
      i += 2;
    }
    if(m == -1) report("no routem for " + route_id);
  }
  else report(" no NJrouteIdMap");
  return(m);
}

function getRouteN(route_id)
{
  let b = true;
  let m = -1;
  if(typeof SFMTARouteMapMap !== 'undefined')
  {
    let r = route_id.substring(route_id.indexOf("_") + 1);
    let k = SFMTARouteMapMap.length
    let i = 0;
    while(b && (i < k))
    {
      if(SFMTARouteMapMap[i + 1] == r)
      {
        b = false;
        m = SFMTARouteMapMap[i];
      }
      i += 3;
    }
    if(m == -1) report("no routen for " + route_id);
  }
  else report(" no SFMTARouteMapMap");
  return(m);
}

/*
function getRouteRevN(route_id)
{
  let b = true;
  let m = -1;
  if(typeof njhm RouteMapMap !== 'undefined')
  {
    let r = route_id.substring(route_id.indexOf("_") + 1);
    let k = SFMTARouteMapMap.length
    let i = 0;
    while(b && (i < k))
    {
      if(SFMTARouteMapMap[i] == r)
      {
        b = false;
        m = SFMTARouteMapMap[i+1];
      }
      i += 3;
    }
    if(m == -1) report("no routen for " + route_id);
  }
  else report(" no SFMTARouteMapMap");
  return(m);
}
*/

function getRouteR(route_id)
{
  let b = true;
  let m = -1;
//  report("9562 " + route_id);
  m = route_id.substring(4) + "_13191";
  return(m);
}

let bSkedAll = false;
let bSkedP = false;

function makeTripsForRoute(route, ddf)
{
  let p = new Promise(function(resolve, reject) {
    if(typeof route.fetched === 'undefined') route.fetched = false;
    let r = route.route_id;
//  report("  makeTripsForRoute " + route.route_id + " " + route.route_name + " " + ddf + " " + route.fetched);   
  //if(route.route_id.indexOf("Y") == 0)
    if((typeof route.fetched !== 'undefined') && (route.fetched == false))
    {
      route.fetched = true;
//      report("10043 " + route.route_id + " has " + route.trips.length + " trips");
      let that = this;
//      let pm = null;
      if(r.indexOf("Z_") == 0)
      {
//        report("  makeTripsForRoute " + route.route_id + " " + route.route_name + " " + ddf);
        let u =  "js/data/SBB/eo_" +  route.route_id + ".js";
        if(u !== "")
        {
//          report("10056 loadScript " + u);
          route.fetched = true;
          loadScript(u).then(function() {
 //           report("10009 loadScript resolved");
//           report("10077 " + route.route_id + " has " + route.trips.length + " trips");
           resolve();
          }).catch(function(e) {
            reject("10005 " + e + " " + u);
          });
        }
      }
      else
      {
      if(route.cal == null) report("10111 " + route.route_id + " " + JSON.stringify(route, null, 4));
      let pm = route.getValidServicesP(ddf).then(function(data) {
        let nc = route.cal.getServices().length;
//        let nc = "x";
//        report("  makeTripsForRoute " + route.route_id + " " + route.route_name + " " + ddf + " " + data.length + " services out of " + nc + " services"); // + JSON.stringify(cs, null, 4));
//        let r = route.route_id;
        let u = "";
        if(data.length > 0) 
        {
          if(r.indexOf("Y") == 0)
          {
            u = "js/data/NJBUS/eo_NJbus_" + route.route_id + ".js";
          }
          else if(r.indexOf("MSLB") == 0)
          {
            u =  "js/data/MSLB/eo_MSLbus_" +  route.route_id + ".js";
          }
          else if(r.indexOf("SFB_") == 0)
          {
            u =  "js/data/SFB/eo_SFBbus_" +  route.route_id + ".js";
          }
          else if(r.indexOf("LAMB") == 0)
          {
            u =  "js/data/LAMB/eo_LAbus_" +  route.route_id + ".js";
          }
          else if(r.indexOf("CTA") == 0)
          {
            u =  "js/data/CTA/eo_CTAbus_" +  route.route_id + ".js";
          }
          else if(r.indexOf("RIPT") == 0)
          {
            u =  "js/data/RIPTA/eo_RIPTA_" +  route.route_id + ".js";
          }
          else if(r.indexOf("STMB") == 0)
          {
            u =  "js/data/STM/eo_STMB_" +  route.route_id + ".js";
          }
          else if(r.indexOf("STM") == 0)
          {
            u =  "js/data/STM/eo_STM_" +  route.route_id + ".js";
          }
          else if(r.indexOf("TTC") == 0)
          {
            u =  "js/data/TTC/eo_TTC_" +  route.route_id + ".js";
          }
          else if(r.indexOf("ST") == 0)
          {
            u =  "js/data/Sound/eo_Sound_" +  route.route_id + ".js";
          }
          else if(r.indexOf("Z_") == 0)
          {
            u =  "js/data/SBB/eo_" +  route.route_id + ".js";
          }
          else if(r.indexOf("SNCF_") == 0)
          {
            u =  "js/data/SNCF/eo_SNCF_" +  route.route_id + ".js";
          }
          else route.fetched = false;
        }
        /*
        else if(r.indexOf("Z_") == 0)
        {
           u =  "js/data/SBB/eo_" +  route.route_id + ".js";
        }
        */
//         report("10002 " + u);
        if(u !== "")
        {
//          report("10056 loadScript " + u);
          route.fetched = true;
          loadScript(u).then(function() {
//            report("10009 loadScript " + u);
//           report("10077 " + route.route_id + " has " + route.trips.length + " trips");
           resolve();
          }).catch(function(e) {
            reject("10005 " + e + " " + u);
          });
        }
        
        }).catch(function(e) {
          report("10015 " + e);
        });
      }
    }
    else reject("10054");
  });
  return(p);
}

/*
function makeTripsForRouteOld(route, dff)
{
  let bfetchedok = true;
  let ptop = new Promise(function(resolve, reject) {
  let pm = route.getValidServicesP(ddf).then(function(data) {
  let cs = data;
  let p = null;
//  let cs = route.getValidServices(ddf);
  let i2 = 0;
  let k2 = cs.length;
  let sfr = "";
  bSkedAll = document.getElementById("spa").checked;
  bSkedP = document.getElementById("spp").checked;
  report("  makeTripsForRoute " + route.route_id + " " + route.route_name + " " + ddf + " " + k2 + " services "); // + JSON.stringify(cs, null, 4));
  while(i2 < k2)
  {
    if(route.route_id.indexOf("Y") == 0)
    {
      let m = getRouteM(route.route_id);
      if(m != -1)
      {
        route.routem = m;
        let o = {
          route: route,
          route_id: "NJR" + m,
          startcdate: dff,
          svc: cs[i2].service_id.substring(3)
          };
        MTQueue.push(o);
      }
    }
    else if(route.route_id.indexOf("PV") == 0)
    {
//        report("   " + route.route_id + " " + cs[i2].service_id);
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
    }
    else if(route.route_id.indexOf("RIPT") == 0)
    {
//        report("2502 " + route.route_id + " " + cs[i2].service_id);
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
    }
    else if(route.route_id.indexOf("MDR") == 0)
    {
 //       report("3028 " + route.route_id + " " + cs[i2].service_id);
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
    }
    else if(route.route_id.indexOf("TRR") == 0)
    {
//        report("2502 " + route.route_id + " " + cs[i2].service_id);
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
    }
    else if(route.route_id.indexOf("CTAB") == 0)
    {
//        report("2502 " + route.route_id + " " + cs[i2].service_id);
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
    }
    else if(route.route_id.indexOf("SF_") == 0)
    {
 //     let m = getRouteN(route.route_id);
 //     if(m != -1)
 //     {
 //       route.routem = m;
       let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
//      }
//      else bfetchedok = false;
    }
    else if(route.route_id.indexOf("SFB_") == 0)
    {
      let m = getRouteN(route.route_id);
      if(m != -1)
      {
        route.routem = m;
       let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
      }
    }
    else if((route.route_id.indexOf("LAMB") == 0) && (route.route_id != "LAMB"))
    {
      let m = getRouteR(route.route_id);
      if(m != -1)
      {
        route.routem = m;
       let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
//        report("5596 " + o.svc + " " + o.route_id);
      MTQueue.push(o);
//        report("7378 " + o.svc + " " + o.route_id + " " + MTQueue.length);
      }
    }
    else if((route.route_id.indexOf("LAM") == 0) && (route.route_id.indexOf("LAML") != 0))
    {
      let o = {
      route: route,
      route_id: route.route_id,
      startcdate: dff,
      svc: cs[i2].service_id
      };
      MTQueue.push(o);
//      report("3954 " + route.route_id + " " + cs[i2].service_id);
    }
    else if(route.route_id.indexOf("ST") == 0) 
    {
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
//      report("5676 " + route.route_id + " " + cs[i2].service_id);
    }
    else if((route.route_id.indexOf("BOB") == 0) || (route.route_id.indexOf("SBB") == 0) || (route.route_id.indexOf("WAB") == 0) || (route.route_id.indexOf("RhB") == 0))
    {
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
//      report("5676 " + route.route_id + " " + cs[i2].service_id + " " + route.routem);
    }
    else if(route.route_id.indexOf("MN") == 0) 
    {
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
//      report("5676 " + route.route_id + " " + cs[i2].service_id);
    }
    else if(route.route_id.indexOf("DART_") == 0) 
    {
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
//      report("5676 " + route.route_id + " " + cs[i2].service_id);
    }
    else if(route.route_id.indexOf("MSLB") == 0) 
    {
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
//      report("5676 " + route.route_id + " " + cs[i2].service_id);
    }
    else if(route.route_id.indexOf("WMB_") == 0) 
    {
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
//      report("5676 " + route.route_id + " " + cs[i2].service_id);
    }
    else if(route.route_id.indexOf("RTDB_") == 0) 
    {
      let o = {
        route: route,
        route_id: route.route_id,
        startcdate: dff,
        svc: cs[i2].service_id
        };
      MTQueue.push(o);
//      report("5676 " + route.route_id + " " + cs[i2].service_id);
    }
    i2 += 1;
  }
  }).catch(function(e) {
      report("8984 " + e);
      reject(e);
  });
  
  if(tmworker == null)
  {  
//    report("7442 queue MT " + bMTQinProcess + " " + MTQueue.length);
    setTimeout(nextMTQueueItem, 500);
    if(bOnLine && bfetchedok) route.fetched = true;
    resolve(null);
  }
  else if((MTQueue.length > 0) && !bMTQinProcess)
  {
    bMTQinProcess = true;
//    report("7450 queue MT " + bMTQinProcess + " " + MTQueue.length);

    let p2 = new Promise(function(resolve,reject) {
        let tripcount = 0;
        if(btmfirstinit) 
        {
          tmworker.onmessage = function(evt) {
            let m = evt.data;
            switch(m[0])
            {
              case 1:  // no trips for request item
                if(MTQueue.length > 0)
                {
                  MTQueue.splice(0,1);
                  if(MTQueue.length > 0)
                  {
                    tmworker.postMessage([ 3, MTQueue[0]]);  
                  }
                  else
                  {
                    bMTQinProcess = false;
                    resolve("7127: made " + tripcount + " trips for " + m[1].route_id);
                  }
                }
                break;
              case 2: // report message
                report(m[1]);
                break;
              case 3: // add TripObject to route
                if(m[1] != null)
                {
                  let r = serviceE.getRouteS(m[1].parent_id);
                  if(r != null)
                  {
                    r.addTripObject(m[1]);
                    tripcount += 1;
                  }
                }
                if(MTQueue.length > 0)
                {
                  MTQueue.splice(0,1);
                  if(MTQueue.length > 0)
                  {
                    tmworker.postMessage([ 3, MTQueue[0]]);  
                  }
                  else
                  {
                    bMTQinProcess = false;
                    resolve("7136: made " + tripcount + " trips for " + m[1].route_id);
                  }
                }
                break;
              default:
                break;
            }
           };

           tmworker.postMessage([ 0, ""]);
           btmfirstinit = false;
           
        }
        while(MTQueue.length > 0)
        {
            tmworker.postMessage([ 3, MTQueue[0]]);
        }
      }).then(function(m) {
          report(m);
          resolve();
      }).catch(function(e) {
          report("7170: " + e);
          reject(e);
      });
  }
  else resolve();
  
  });
  return(ptop);
}
*/

function isDynamicBusRoute(route_id)
{
  let b = (route_id.indexOf("Y") == 0) || (route_id.indexOf("PV") == 0)  ||  (route_id.indexOf("RIPT") == 0) ||  (route_id.indexOf("CTAB") == 0) || (route_id.indexOf("SF_") == 0) || ((route_id.indexOf("SFB_") == 0) && (route_id.indexOf("SFF") != 0)) || (route_id.indexOf("MSLB") == 0)   || (route_id.indexOf("WMB") == 0)   || (route_id.indexOf("RTDB_") == 0)   ||
//  (route_id.indexOf("MN") == 0) || || (route_id.indexOf("TRR") == 0)
  (((route_id.indexOf("LAMB") == 0) && (route_id != "LAMB"))) || (route_id.indexOf("STM") == 0)  || (route_id.indexOf("TTC") == 0)||
  (route_id.indexOf("ST") == 0) || (route_id.indexOf("Z_") == 0) || (route_id.indexOf("SNCF_") == 0) || (route_id.indexOf("DART_") == 0) || (route_id.indexOf("TTC_") == 0);
  return(b);
}

/*
AssociateService.prototype.makeScheduleByStopFromFeed(carrier, feed, stop_id)
{
  let p = null;
  let ag = [];
  let routes = getRoutesS(stop_id);
  let ThisStopTZ = StopTZ
  bE = true;
//  if(bReport) report("7498  routes = " + routes.toString());
  if(routes.indexOf(",") != -1)
  {
      ag = routes.split(",");
  }
  else ag[0] = routes;
  p = new Promise(function(resolvex, reject){
      let s = "{\"stop_id\": \"" + stop_id + "\", \"stop_name\": \"" + getStopNameFromID(stop_id) + "\", ";
      s += "\"mode\": [{ \"route_type\": \"2\", \"mode_name\": \"Rail\",\"route\": [";
      let k = ag.length;
      let i = 0;
      let brf = true;
      let bcount = 0;
      while(i < k)
      {
        if(isDynamicBusRoute(ag[i])) bcount += 1;
        i += 1;
      }
      i = 0;
      let bz = (bcount <= BUSLOADMAX) || (COUNTSX <= BUSLOADMAX);
      while(i < k)
      {
        if(serviceE.getRouteS(ag[i]) != null)
        {
        if(brf) brf = false;
        else s +=",";
        let tr = serviceE.getRouteS(ag[i]);
//        report("7525: " + tr.route_id + " " + tr.route_name + " " + tr.trips.length);
        let rname = "";
        if(tr != null)
        {
          rname = tr.route_name;
          if(rname.length < 8) rname = tr.common_name;
          s += "{ \"route_id\": \"" + tr.route_id + "\", \"route_name\": \"" + rname + "\", \"direction\": [";
    
}
*/


// tbase is a Date
AssociateService.prototype.getScheduleByStop = function(stop_ida, max_time, max_trips, tbase)
{
  let bReport = document.getElementById("rp").checked;
  let stop_id = stop_ida;
  if(stop_id.lastIndexOf(":") == stop_id.length -1) stop_id = stop_id.substring(0, stop_id.length -1);
  if(stop_id.indexOf("place") == 0) stop_id = getRailStopId(stop_id);
  let TZStop = getTZforStop(stop_id);
  
  let dt = new Date(NOW); // - TZPlatform * 60000);
//  report("9781 dt start " + dt.getMonth() + " " + dt.getDate() + " " + dt.toLocaleDateString() + " " + dt.toLocaleTimeString());
//  report("10255 tbase = " + tbase);
//  report("10595 TZStop = " + TZStop + " TZPlatform = " + TZPlatform);
  if(tbase != null)
  {
  dt.setFullYear(tbase.getFullYear());
  dt.setMonth(tbase.getMonth());
  dt.setDate(tbase.getDate());
  dt.setHours(0);
  dt.setMinutes(0);
  }
//  let day = dt.getDay().toString();
  let ddf = getCDateFromDate(dt);
  AMRDFF = ddf;
//  let bHoliday = isHoliday(tbase.getMonth(), tbase.getDate());
//  report("10600 " + ddf);
  let d = Math.floor(dt.getTime() / 1000);
  let hlimit = tbase.getHours();
  let mlimit = tbase.getMinutes();
//  if(bReport) 
//  report("9794 tbase.getMonth = " + tbase.getMonth() + " " + tbase.getDate());
//   report("9795 tbase.getMonth = " + dt.getMonth() + " " + dt.getDate());
// report("7726 AS.getScheduleByStop " + stop_id + " " + d + " " + max_time + " " + max_trips + " " + ddf + " " + dt.toLocaleDateString() + " " + dt.toLocaleTimeString());
  /*
  if(isAmtrak1(stop_id))
  {
    stop_id = getAmtrakMappedStop(stop_id);  
  }
  */
  checkLoadable(stop_id);
  
  let p = null;
  let ag = [];
  let routes = getRoutesS(stop_id);
  /*
  if(stop_id.indexOf("MSL") == 0)
  {
    report("10473 number MSL routes = " + Carriers.getCarrier("MSL").routes.length + " routes from service = " + routes);   
  }
  */
  let ThisStopTZ = StopTZ
  bE = true;
//  if(bReport) 
//  report("7498  routes = " + routes.toString() +" " + stop_id);
  if(routes.indexOf(",") != -1)
  {
      ag = routes.split(",");
  }
  else ag[0] = routes;
  
 
  let bMSL = (stop_id.indexOf("MSL") == 0);
  if(bMSL)
  {
    let k = ag.length;
    let i = 0;
    let r = [];
//    report("10495 ag.length before = " + k);
    if(checkLoadable(stop_id))
    {
      for(i=0; i<k; i++)
      {
        let r = MSL.getRouteIdsByRef(ag[i]);
        ag = ag.concat(r);
      }
    }
//````    report("10501 ag.length = " + ag.length + " " + ag);
        
  }
  
  p = new Promise(function(resolvex, reject){
      let s = "{\"stop_id\": \"" + stop_id + "\", \"stop_name\": \"" + getStopNameFromID(stop_id) + "\", ";
      s += "\"mode\": [{ \"route_type\": \"2\", \"mode_name\": \"Rail\",\"route\": [";
      let k = ag.length;
//      report("9175 ag.length = " + k);
      let i = 0;
      let brf = true;
      let bcount = 0;
      /*
      while(i < k)
      {
        if(isDynamicBusRoute(ag[i])) bcount += 1;
        i += 1;
      }
      */
      i = 0;
      let bz = (bcount <= BUSLOADMAX) || (COUNTSX <= BUSLOADMAX) || (stop_id.indexOf("Z_") == 0);
 //     report("9972 " + bz + " " + bcount + " " + BUSLOADMAX + " " + COUNTSX);
      bz = true;
      while(i < k)
      {
        if(serviceE.getRouteS(ag[i]) != null)
        {
        if(brf) brf = false;
        else s +=",";
        let tr = serviceE.getRouteS(ag[i]);
  
//        let pm = tr.getValidServicesP(ddf).then(function(data) {
//           report("10442 " + tr.route_id + " " + data.length + " services " + tr.trips.length + " trips");
//             });
        
        
        let TZRoute = null; //tr.cal.gtfstz;
//        report("7525: " + tr.route_id + " " + tr.route_name + " " + tr.trips.length + " i = " + i);
        let rname = "";
        if(tr != null)
        {
//          report("10420 " + tr.route_id + " " + tr.ref);
          if(tr.cal == null) 
          {
//            report("9986 tr.cal is null " + tr.route_id);
            TZRoute = "EasternTime";
          }
          else TZRoute = tr.cal.gtfstz;
          rname = tr.route_name;
          if(rname.length < 8) rname = tr.common_name;
          s += "{ \"route_id\": \"" + tr.route_id + "\", \"route_name\": \"" + rname + "\", \"direction\": [";
//          checkCalendars(tr, ddf);
        }
        else 
        {
          report("AS.getScheduleByStop tr null");
          Carriers.checkRouteLoadable(ag[i]);
        }
//        report("4863 " + tr.route_id + " " + rname + " " + tr.trips.length + " " + isDynamicBusRoute(tr.route_id) + " fetched= " + tr.fetched +" " + ddf + " " + bz);
//        report("10709 " + tr.route_id + " " + isDynamicBusRoute(tr.route_id) + " " + tr.trips.length + " " + tr.fetched + " " + bz + " " + bcount + " " + ddf);
        if(isDynamicBusRoute(tr.route_id) && ((tr.trips.length == 0) || ( tr.fetched == false)))
        {
           if(bz && (bcount < 40) && ((typeof tr.fetched === 'undefined') || ( tr.fetched == false)))
           {
             bcount += 1;
//             report("10702 bcount = " + bcount + " " + ddf);
             makeTripsForRoute(tr, ddf).catch(function(e) {report("10716 " + e);});         
           }
//           report("2281");
        }
 /*       let pm = tr.getValidServicesP(ddf).then(function(data) {
           let kg = data.length;
           let s4 = "";
           for(ig = 0; ig < kg; ig++)
           {
               s4 += data[ig].service_id + ", ";
           }
           report("8659 " + tr.route_id + " " +  ddf + " : " + s4); 
        });
*/        
        let dir = 0;
        while(dir < 2)
        {
          if(dir != 0) s += ",";
          s += "{\"direction_id\": \"" + dir + "\", \"direction_name\": \"\", \"trip\": [ ";
          let index = tr.getStopIndex(stop_id, dir);
//          report("7561  index = " + index + " " + stop_id + " " +  tr.route_id + " dir = " + dir);
          let kk = tr.trips.length;
//          report("7763 trips.length = " + kk + " index = " + index + " " + tr.route_id + " " + stop_id + " " + dir + " " + tr.trips[0].trip_id + " " + tr.trips[0].service_id);
//          if(bReport)
          /*
          if(tr.route_id == "BOB1") */
          {
 //            report("7896 gsbs :" + JSON.stringify(tr.trips[0].times, null, 4));  
          }
       /*   */
          let btrip = false;
          let zsth = "0";
          let zstm = "0";
          let ii = 0;
          let bComp = false;
          if(kk > 0) bComp = (typeof tr.trips[0].comp !== 'undefined') && (tr.trips[0].comp.length > 1);
//          report("7905 gsbs index = " + index + " bComp = " + bComp  + " kk = " + kk);
          if((index != -1) || bComp)
          {
//          report("7809 kk = " + kk + " " + tr.route_id + " " + bComp);
          let tcat = [];
          while(ii < kk)
          {
            let a = tr.trips[ii];
//            report("4096 " + a.trip_id + " " + isMultidayTrip(a) + " " + ddf);
            if((a.trip_id.indexOf("_Day_") == -1) && (isMultidayTrip(a)))
            {
//              report("4096 " + a.trip_id + " " + isMultidayTrip(a) + " " + ddf + " " + AMRDFF + " " + bComp);
              let tp = a.getTripForDay(1, ddf, tr);
              if(tp != null)
              {
                tcat.push(tp);
                tr.addTrip(tp);
              }
              tp = a.getTripForDay(2, ddf, tr);
//              report("6276 " + ddf + " " + tp + " " + a.trip_name);
              if(tp != null)
              {
//                  report("4111 " + ddf);
                tcat.push(tp);
                tr.addTrip(tp);
              }
              tp = a.getTripForDay(3, ddf, tr);
              if(tp != null)
                {
//                    report("4117 " + ddf);
                  tcat.push(tp);
                  tr.addTrip(tp);
                }
              tp = a.getTripForDay(4, ddf, tr);
                  if(tp != null)
                  {
                    tcat.push(tp);
                    tr.addTrip(tp);
                  }
               tp = a.getTripForDay(5, ddf, tr);
                    if(tp != null)
                    {
                      tcat.push(tp);
                      tr.addTrip(tp);
                    } 
            }
            else tcat.push(a);
            ii += 1;
          }
          ii = 0;
          let jj = 0;
          kk = tcat.length;
//          report("7859 tcat.length " + kk + " " + ii);
          while(ii < kk)
          {
//            let a = tr.trips[ii];
//              if(typeof tcat[ii].comp !== 'undefined') report("8000 " + JSON.stringify(tcat[ii].comp, null, 4));
            let a = tcat[ii];
            let bsncf = false;
            let dateOK = isDateOK2(tr, a, ddf);
//            if(dateOK)  
//            if(a.trip_id.indexOf("SNCF_") == 0)
//            {
//                report("7830 dateok = " + dateOK + " " + a.trip_id + " " + a.service_id + " " + tr.route_id + " " + Number(a.direction) + " " + dir);
//            if((stop_id == "SF_17217"))  report("7830 dateok = " + dateOK + " " + a.trip_id + " " + ddf);
//                bsncf = true;
//            }
            let tzfactor = 0;
            
//            if(stop_id.indexOf("Z_") == 0)
//            {
//              dateOK =true;   
//            }
            if((stop_id.indexOf("Z_") != 0) && (tr.cal != null))tzfactor = getTimeZFactor(stop_id, tr); //getTzFactor(ThisStopTZ, a.getTripTZ()); // hour difference between stop and gtfs
//            report("9350 tzfactor = " + tzfactor+ " "+ ThisStopTZ +" " + a.getTripTZ());   
//            if(a.trip_id.indexOf("ACE") ==0) report("10071 tzfactor " + tzfactor + " " + a.trip_id + " " + tr.route_id);
            if((typeof a.comp !== 'undefined') && (a.comp.length > 0) && (Number(a.direction) == dir) && dateOK)
            {
              let k3 = a.comp.length;
              let i3 = 0;
              let b3 = true;
              while(b3 && (i3 < k3))
              {
 //                 if(i3 < 2) 
 //                 report("7971 " + stop_id + " " + a.comp[i3].stop_id + " " + k3 + " " + i3);
                let compsid = a.comp[i3].s;
                if(typeof compsid === 'undefined') compsid = a.comp[i3].stop_id;
//                if(stop_id.indexOf(compsid) != -1)
//                  if(bsncf) report("10842 " + stop_id + "  " + compsid);
                if((stop_id == compsid) || (stop_id == compsid.substring(0, compsid.length - 1)))
                {
//                    report("8015 " + stop_id + " " + i3);
                  b3 = false;   
                }
                else i3 += 1;
              }
              if(!b3)
              {
//                report("8021 "); 
                let tk = "";
                if(stop_id.indexOf(":") != -1)
                {
                  tk = stop_id.substring(stop_id.lastIndexOf(":") + 1);   
                }
                let td = "";
                if(typeof a.comp[i3].tsd !== 'undefined') td = d + getUtime(a.comp[i3].tsd);
                else if(typeof a.comp[i3].d !== 'undefined') td = d + getUtime(a.comp[i3].d);
                let ta = "";
                if(typeof a.comp[i3].tsa !== 'undefined') ta = d + getUtime(a.comp[i3].tsa);
                else if(typeof a.comp[i3].a !== 'undefined') ta = d + getUtime(a.comp[i3].a);
                else ta = td;
//                if(tzfactor != 0) report("6065 " + tzfactor + " " + td + " " + td + 3600 * tzfactor);
                if(td > 0) td = Number(td) + tzfactor;
                if(ta > 0) ta = Number(ta) + tzfactor;
                let hs = a.headsign;
                if((hs == null) || (hs == "")) hs = a.comp[k3 - 1].stop_id;
                if(jj != 0) s+= ",";    
                s += "{\"trip_id\": \"" + a.trip_id + "\", \"trip_name\": \"" + a.trip_name + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\", \"trip_headsign\": \"" + hs + "\", \"startcdate\": \"" + a.startcdate + "\"";
                if(typeof a.tid !== 'undefined') s += ", \"tid\": \"" + a.tid + "\"";
                s += ", \"parent_id\": \"" + tr.route_id+ "\"";
                if(typeof a.comp[i3].ss != 'undefined') s += ", \"ss\": \"" + a.comp[i3].ss + "\"";
//                if(bFudge) s += ", \"pred\": \"est\"";
                if(tk != "") s += ", \"track\": \"" + tk + "\"";
                s += ", \"tztrip\": \"" + tr.cal.gtfstz + "\"";
                s += "}";
                jj += 1;
              }
            }
            else
            {
            if(typeof a === 'undefined') report("a undefined ii = " + ii + " kk = " + kk + " " + tr.route_id + " dir = " + dir);
//            report("2305");
//            let dateOK = isDateOK2(tr, a, ddf);
//            let tzfactor = 0;
//            if((a.parent != null) && (a.parent.cal != null) && (stop_id.indexOf("Z_") != 0)) tzfactor = getTzFactor(ThisStopTZ, a.parent.cal.gtfstz); // hour difference between stop and gtfs
//            if(tzfactor != 0) report("5927 tzfactor = " + tzfactor + " for stop " + stop_id);
//            report("5904 dateOK = " + dateOK + " " + a.trip_id + " " + a.service_ids[0]);
            else if(typeof a.times[index] === 'undefined')
            {
//              report("7638 AS.getScheduleByStop a.times undefined " + index + " " +  stop_id + " " + tr.route_name + " " + a.trip_id+ " dir = " + dir + " a.times.length = " + a.times.length);  
            }
//            report("9351 " + a.times[index] + " " + a.direction + " " + dir + " " + dateOK);
            else if( (a.times[index] != "-1") && (a.times[index] != -1) && (Number(a.direction) == dir) && dateOK)
            {
//              report("7642 " + stop_id + " " + tr.route_id + " " + a.trip_id + " a.times[" + index + "] = [" + a.times[index] + "]");
              let stx = a.times[index];
              let st = stx;
              let bFudge = false;
              if(st == "") bFudge = true;
              let sta = "";
              let ix = stx.indexOf("/");
              if(ix != -1)
              {
                st = stx.substring(ix+1);
                sta = stx.substring(0, ix);
              }
              let kg = st.indexOf("+");
              if(kg != -1) st = st.substring(0, kg);
              kg = st.indexOf(":");
              let sth = st.substring(0, kg);
              let stm = st.substring(kg+1);
              let blt = false;
              if(sth == -1)
              {
                let sj = a.start_time;
                let kj = sj.indexOf(":");
                let sjh = sj.substring(0, kj);
                let sjm = sj.substring(kj+1);
                
              }
                if(bFudge)
                {
 //                 report("bFudge " + zsth + ":" + zstm);
  //                if(zsth == 0)
                  {
                    let i2 = 0;
                    while(i2 < index)
                    {
                      let sdx =  a.times[i2];
                      if(sdx != "")
                      {
                        let kg = sdx.indexOf(":");
                        zsth = sdx.substring(0, kg);
                        zstm = sdx.substring(kg + 1);
                      }
                      i2 += 1;
                    }
 //                   report("fudge " + zsth + ":" + zstm + " " + sta);
                  }
                  sth = zsth;
                  stm = Number(zstm) + 1;
                }
//              report("9464 " + sth + " " + hlimit + " " + stm + " " + mlimit + " " + bFudge);
              let tzfact = getTzFactor(TZStop, TZRoute);
//              report("9468 tzfact = " + tzfact);
              let tlfact = getTZDeltaHrsTZ(TZRoute);
//              report("9470 tlfact = " + tlfact + " " + TZRoute);
              if(document.getElementById("spa").checked  || 
                  (((Number(sth) > hlimit - tlfact) || ( (Number(sth) == hlimit - tlfact) && (Number(stm) >= (mlimit - 1)))) && 
                      ( document.getElementById("sps").checked ||   (Number(sth) < (hlimit + 3)) ) || 
                  (sth == "-2")))
              {
                if(btrip) s += ",";
                btrip = true;
                zsth = sth;
                zstm = stm;
                let td = -60 *stm;
                if(sth != "-2") 
                {
                    td = d + 3600 * (sth)  + 60 * stm;
                }
                else
                {
                  let lasttg = 0;
                  let j = 0;
                  let bf = false;
                  while(j < index)
                  {
                    let fs = a.times[j];
                    if(fs.indexOf("-") == -1)
                    {
                       if(!bf) 
                       {
                         lasttg = fs;
                         bf = true;
                       }                    
                    }
                    else 
                    {
 //                       lasttg = 0;
 //                       bf = false;
                    }
                    j += 1;
                  }
                  if((sth == -2) && (td == 0)) td = -2000;
 //                report("6897 " + sth + " " + stm + " " + bf + " " + td);
                   if(bf) 
                    {
                        let jj = lasttg.indexOf(":");
                        let xhr = Number(lasttg.substring(0,jj));
                        let xmin = Number(lasttg.substring(jj + 1));
                        td = d + 3600 * xhr + 60 * xmin - td;
//                        let hrx = Math.floor(tdf / 60);
//                        let minx = tdf % 60;
//                        let tdx = hrx + ":" + minx;
//                        report("tdf = " + tdf + " = " + lasttg + " + " + tdx + " " + xhr + " " + xmin);
                    }
                }
                let ta = td;
                if(sta != "")
                {
                  kg = sta.indexOf(":");
                  sth = sta.substring(0, kg);
                  stm = sta.substring(kg+1);
                  ta = d + 3600 * sth + 60 * stm;   
                }
//                if(tzfactor != 0) 
//                report("6065 " + tzfactor + " " + td );
                if(td > 0) td = Number(td) + tzfactor;
                if(ta > 0) ta = Number(ta) + tzfactor;
                let hs = a.getHeadsign();
                let tsd = "";
                if(typeof a.startcdate != 'undefined') tsd = a.startcdate;
                let dx = a.tid;
                if(typeof dx === 'undefined') dx = a.tid;
//                report("3581 " + a.tid + " " + a.tid);
                  if(typeof dx !== 'undefined') hs += "\", \"tid\": \"" + dx;
                  s += "{\"trip_id\": \"" + a.trip_id + "\", \"trip_name\": \"" + a.trip_name + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\", \"trip_headsign\": \"" + hs + "\", \"startcdate\": \"" + tsd + "\"";
                  if(typeof a.tid !== 'undefined') s += ", \"tid\": \"" + a.tid + "\"";
                  s += ", \"parent_id\": \"" + tr.route_id+ "\"";
                  if(bFudge) s += ", \"pred\": \"est\"";
                  s += "}";
                  }
              }
//              else report("9477");
            }
            ii += 1;
          }
          }
          s += "]}"; // end of direction
          dir += 1;
        }
        s += "]}"; // end of route
        }
        else  // serviceE.getRouteS(ag[i] is null
        {
            let cr = ag[i].indexOf("_");
            if(cr != -1)
            {
//              let vs = ag[i].substring(0, cr);
              let vs = getSupportedCarrierFromRouteId(ag[i]);
              if(vs != null) loadCarrier(vs.id).catch( function(e) {
                  report("11047 " + e);
              });
              else 
              {
                report("11032 no Carrier for " + ag[i]);
              }
            }
        }
//        else report("serviceE.getRouteS(ag[" + i + "]) is null " + ag[i]); 
        i += 1;
      }
      s += "]}]}";
      
      updateAlerts0(stop_id, routes, null);
    //  if(bReport) 
//      console.log("7770::\n" + s + "\n::\n"); //bp0
      let t = JSON.parse(s);
//      report("9494 " + JSON.stringify(t, null, 4));
      resolvex(t);
    });
  return(p);
}

function getUtime(t)
{
  let u = t;
  let k1 = t.indexOf(":");
  if(k1 != -1)
  {
    u = 3600 * Number(t.substring(0, k1)) + 60 * Number(t.substring(k1+1));   
  }
  return(u);
}

AssociateService.prototype.getPredictionByTrip = function(trip_id, tbase)
{
  return(serviceE.getPredictionByTripA(trip_id, null, tbase));  
}

AssociateService.prototype.getPredictionByTripA = function(trip_id, tripcdate, tbase1)
{
//    report("8201 getPredictionByTripA " + trip_id + " " + tripcdate + " " + tbase1);
//    if(tbase1 != null) report("8370 " + tbase1.getTime());
  let bReport = document.getElementById("rp").checked;
  let bok = true; //window.location.href.indexOf("https") == 0;
  let dtime = null;
  let tbase = tbase1;
  if(tbase == null) tbase = new Date();
  if((typeof tripcdate !== 'undefined') && (tripcdate != null) && (tripcdate != 'undefined') && (tripcdate != null) && (tripcdate != "null")) // || (tbase == null) || (typeof tbase === 'undefined'))
  {
    let sd = tripcdate.toString();
    let dxt = new Date();
    dxt.setFullYear(sd.substring(0,4));
    dxt.setMonth(Number(sd.substring(4,6)) -1);
    dxt.setDate(Number(sd.substring(6)));
    dtime = Math.floor(dxt.getTime() / 1000);
    tbase = dxt;
  }
  else if(tbase != null) dtime = Math.floor(tbase.getTime() / 1000);
  else dtime = getTTime();
  AMRTFF = getCDateFromDate(tbase);
  let p = null;
//  if(bReport) report("AS.getPredictionByTrip " + trip_id + " " + AMRTFF);
  if(bOnLine && bok && (trip_id.indexOf("MNR") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[9] != null) && (typeof SUB[9].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[9].header.timestamp);
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(9);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(9);
      }
    }
    else queueSUB(9);
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[9] != null)
         {
           let feed = null;
           feed = SUB[9];
 //          console.log("9312 " + JSON.stringify(t, null, 4));
 //          report("9313 " + JSON.stringify(feed, null, 4));
           //if(bReport) report("6799 got feed for " + feed.header.timestamp.low + " " + dtime);
           combinetrip(t, feed, "MNR", "MN", "MN");
         }
        // if(bReport) 
 //            report(JSON.stringify(t));
         resolve(t);
      });
      /*.catch(function(e){
          report("6806 " + e);
          reject(null);
          
          });*/
    });
  }
  /*
  else
  {
    p = new Promise (function(resolve, reject){
        let p1 = getFeed("MNR");
        if(p1 != null) 
          {p1.then(function(Mfeed) {
            let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
                if(Mfeed.feed == null) resolve(t);
                let trips = Mfeed.feed.entity;
                if(bReport) report("MNR feed had " + trips.length + " trips, trip_id = "+ trip_id);
                let i = 0;
                let b = true;
                while(b &&(i < trips.length))
                {
                  let tid = "MNR" + trips[i].id;
                  if(tid == trip_id)
                  {
                    b = false;
                    let veh = trips[i].trip_update.vehicle.label;
                    let stu = trips[i].trip_update.stop_time_update;
                    if(typeof stu !== 'undefined')
                    {
                      let k1 = stu.length;
                      let i1 = 0;
                      while(i1 < k1)
                      {
                        let x = stu[i1];
                        if(typeof x.departure !== 'undefined')
                        {
                          let sid = getStopIdForNumber(x.stop_id, "MN");
                          let tp = Number(x.departure.time);
                          let delay = x.departure.delay;
                          let stp = t.stop;
                          let k2 = stp.length;
                          let i2 = 0;
                          let b1 = true;
                          while(b1 && (i2 < k2))
                          {
                            let sx = stp[i2];
                            if(sx.stop_id == sid)
                            {
                              b1 = false;
                              sx.pred_dep_dt = Number(sx.sch_dep_dt) + delay;
                              let arr = Number(sx.sch_arr_dt) + delay;
                              if(arr > sx.pred_dep_dt) arr = sx.pred_dep_dt;
                              sx.pred_arr_dt = arr;
                              sx.pred = "true";
                            }
                            i2 += 1;
                          }
                        }
                        i1 += 1;
                      }
                    }
                  }
                  i += 1;
                }
                report("\n\n" + JSON.stringify(t,null,4));
                resolve(t);
            }).catch(function(error){
            reject(error);
            });
                          
         }).catch(function(error){
               let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) { 
                   resolve(t);
                   }).catch(function(e){
                   reject(e);
                   });
               
               report(error);
            });
          }
        });
  }
  */
  }
  else if(bOnLine && bok && (trip_id.indexOf("LI") == 0))
  {
    if((!PBloaded) && (!PBloading))
    {
      loadpb();
    }
    else if((PBloaded) && (PBloading) && (GRB == null))
    {
      defineGRB(); 
    }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[10] != null) && (typeof SUB[10].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[10].header.timestamp);
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(10);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(10);
      }
    }
    else queueSUB(10);
//    report("3401 SUB[10] = " + SUB[10]);
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[10] != null)
         {
           let feed = null;
           feed = SUB[10];
//           console.log(JSON.stringify(feed));
//           report(JSON.stringify(feed, null, 4));
           if(bReport) report("got feed for " + getPBTime(feed.header.timestamp) + " " + dtime);
           if(t == null) report("3237 t is null");
           combinetrip(t, feed,  "LI", "LIRR", "LI");
           if(bReport)
           {
              report(JSON.stringify(t, null, 4)); 
           }
         }
         resolve(t);
      });
      /*.catch(function(e){
          report("3909 " + e);
          let x = "1";
          if(SUB[10] == null) x = "0";
 //          report("making tripx " + trip_id + " " + x);
           let t = {
               route_id : "",
               route_name : "",
               trip_id : trip_id,
               trip_name : "",
               direction_id: "0",
               direction_name: "",
               shape_id: null,
               tid: "",
               stop: []
              };
          
           if(SUB[10] != null)
           {
            let feed = null;
            feed = SUB[10];
            if(feed != null) makeTripDataFromFeed(t, feed,  "LI", "LIRR", "LI");
            if(bReport) report("\n\n" + JSON.stringify(t, null, 4));
           }
           resolve(t);
           }); 
      */
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("NYC") == 0))
  { 
    p = new Promise (function(resolve, reject){
        let routeq = trip_id.substring(trip_id.lastIndexOf("_") + 1,trip_id.indexOf("."));
        let route = "NY" + routeq;
        let m = trip_id.lastIndexOf(".");
        let routedir = trip_id.substring(m + 1, m + 2);
//        report("route = " + route + ", routedir = " + routedir);
//        let px = null;
        let i = getSubindexByRoute(route);
        if((SUB[i] != null) && (typeof SUB[i].header !== 'undefined'))
        {
         let ctime = getPBTime(SUB[i].header.timestamp);
         if((dtime - ctime) > 360)
          {
//            SUB[i] = null;
//            getSUBdata(i);
            queueSUB(i);
          }
/*          if((dtime - ctime) > 120)
          {
//            getSUBdata(i);
            queueSUB(i);
          } */
        }
//        else getSUBdata(i);
        else queueSUB(i);

        
                     
        let tid = trip_id.substring(3);
//        report("7407 route = " + route);
        let r = serviceE.getRouteS(route);
        let tid2 = route + "_1";
        if(r.iddir == routedir) tid2 = route + "_0";
 //       report("tid2 = " + tid2);
//        let p2 = serviceE.getScheduleByTrip(tid2, tbase).then(function(t) {
        let t = new Object();
        t.trip_id = trip_id;
        t.trip_name = r.route_name;
        t.route_id = route;
        t.route = r;
        t.stop = [];
        if(SUB[i] == null) 
        {
//            reject("7296 SUB[" + i + "] is null"); 
          resolve(t);
        }
        else
        {
          let bGotSome = false;
          let feed = SUB[i];
          let kk = feed.entity.length;
          let ii = 0;
          let bNotFirst = false;
//          report("11204 " + JSON.stringify(feed, null, 4));
// t          report("7304 " + tid + " " + feed.entity[0].trip_update.trip.trip_id);
          for(ii = 0; ii < kk; ii++)
          {
            let t1 = feed.entity[ii];
            if((t1.trip_update != null) && (t1.trip_update.trip != null))
            {
              if(tid == t1.trip_update.trip.trip_id)
              {
                let stops = t.stop;
                let stus =  t1.trip_update.stop_time_update;
                let bp = false;
                let t2 = null;
                let k3 = stus.length;
                let i3 = 0;
                for(i3 = 0; i3 < k3; i3++)
                {
                  let stu = stus[i3];
                  let ssid = stu.stop_id.substring(0, stu.stop_id.length -1);
                  if(ssid.length == 1) ssid = "0" + ssid;
                  let sid = "NYT" + ssid;
                  let spx = getStopFromID(sid);
                  bp = false;
                  t2 = new Object();
                  t2.stop_sequence = i3 + 1;
                  t2.stop_id = sid;
                  t2.stop_name = getStopNameFromID(sid);
                  if(spx != null) t2.wchair = spx.wchair;
                  t2.sch_arr_dt = -1;
                  t2.sch_dep_dt = -1;
                  let tx = 0;
                  if(stu.arrival != null)
                  {
                    tx = getPBTime(stu.arrival.time);
                    t2.sch_arr_dt = tx;
                    t2.pred_arr_dt = tx;
                    bp = true;
                  }
                  if(stu.departure != null)
                  {
                    tx = getPBTime(stu.departure.time);
                    t2.sch_dep_dt = tx; 
                    t2.pred_dep_dt = tx;
                    bp = true;
                  }
                  if(bp) t2.pred = "true";
                  t.stop.push(t2);
                  laststopid = t2.stop_id;
                  laststopdep = tx;
                }
                t.trip_headsign = t2.stop_name;
              }
              else if(t1.vehicle != null)
              {
                let tidx = "NYC" + t1.vehicle.trip.trip_id;
                if(tidx.indexOf(tid) != -1)
                {
                  let stat = t1.vehicle.current_status;
                  if(typeof stat.value !== 'undefined') stat = stat.value;
 //                       t.vehicle_id = vehicle.vehicle.id;
                  switch(stat)
                  {
                    case 0: stat = "INCOMING AT"; break;
                    case 1: stat = "STOPPED AT"; break;
                    case 2: stat = "IN_TRANSIT_TO"; break;
                    default: stat = "";
                  }
                  if(t1.vehicle.trip.schedule_relationship == 3) stat = "Cancelled";
                  t.status = stat;
                  let ssid = t1.vehicle.stop_id.substring(0, t1.vehicle.stop_id.length -1);
                  if(ssid.length == 1) ssid = "0" + ssid;
                   let sid = "NYT" + ssid;
 //                       t.vehicle_stop = sid;
 //                       t.vehicle_id = trip_id;
 //                       t.vehicle_stat = stat;
//          t.vehicle_label = f1.vehicle.vehicle.id;
                        
//                        let tw = SUB[i].header.timestamp.low - t1.vehicle.timestamp.low;
                   let tw = (NOW / 1000) - getPBTime(t1.vehicle.timestamp);
//                        report("tw = " + Marth.floor(tw));
                   if(tw < 120)
                   {
                          let k5 = t.stop.length;
                          let i5 = 0;
                          let b5 = true;
                          while(b5 && (i5 < k5))
                          {
                            if(t.stop[i5].stop_id == sid)
                            {
                              b5 = false;
                              t.stop[i5].status = stat;
                            }
                            i5 += 1;
                          }
                          t.vehicle_stop = sid;
                          t.vehicle_id = trip_id;
                          t.vehicle_stat = stat;
                       }
                        
                        if(t1.vehicle.timestamp != null)
                        {
                         t.vehicle_timestamp = getPBTime(t1.vehicle.timestamp);
                        }
 //                       report("veh match " + stat + " " + sid);
 //                       t.vehicle_latitude = vehicle.position.latitude;
 //                       t.vehicle_longitude = vehicle.position.longitude;
                            
                      }
                       
                    }
                  }   
//                  if(bGotSome) t.trip_id = trip_id;
                }
                if(bReport) 
                {
                  let x = t.route;
                  t.route = null;
                  report("7362:\n" + JSON.stringify(t, null, 4) + "\n:\n");
                  t.route = x;
                }
                resolve(t);
            }
        });
  }
  else if(bOnLine && bok && (trip_id.indexOf("CTA") == 0) && ((trip_id.indexOf("_") != -1) || (trip_id.length < 12)) && (isNaN(trip_id.substring(3,4))))  // (trip_id.length < 14)
  {
 //   report("4212 trip_id = " + trip_id + " CurrentVehicleId = " + CurrentVehicleId);
    
    if((trip_id.indexOf("CTAB") == 0) && (trip_id.indexOf("CTABlue") != 0))  //(!isNaN(trip_id.substring(3,4)))
    {
      p = new Promise (function(resolve, reject){
        if(CurrentVehicleId != null)
        {
          let p7 = getCTABusVehPred(CurrentVehicleId);  
          p7.then(function(response) {
            let jj = response.indexOf(":");
            let ss = "{ \"x\"" + response.substring(jj);
            let r = JSON.parse(ss);
//        report(JSON.stringify(r, null, 4));
            let rpt = r.x.prd;
          
            let t = new Object();
            if(typeof rpt !== 'undefined')
            {
              let k1 = rpt.length;
              if(k1 > 0)
              {
                t.route_id = "CTAB" + rpt[0].rt;
                t.route_name = rpt[0].rt;
                t.trip_id = trip_id;
                t.trip_name =  "Bus " + rpt[0].rt + " to " + rpt[0].des;
                t.trip_headsign = rpt[0].des;
                t.vehicle_id = rpt[0].vid;
                /*
                if(typeof rpt[0].lat !== 'undefined')
                {
                  t.vehicle_latitude = rpt[0].lat;
                  t.vehicle_longitude = rpt[0].lon;
                }
                */
               t.direction_id = rpt[0].rtdir;
               t.direction_name = rpt[0].rtdir;
               t.stop = [];

//          report("xtid = " + xtid);
               let laststopid = "";
               let laststopdep = 0;
               let i1 = 0;
               for(i1 = 0; i1<k1; i1++)
               {
                 let t2 = new Object();
                 t2.stop_sequence = i1 + 1;
                 t2.stop_id = "CH" + rpt[i1].stpid;
                 t2.stop_name = getStopNameFromID("CH" + rpt[i1].stpid);
                 let tx = getTimefromCTABus(rpt[i1].prdtm);
                 t2.sch_arr_dt = tx;
                 t2.sch_dep_dt = tx;
                 t2.pred_arr_dt = tx;
                 t2.pred_dep_dt = tx;
                 t2.pred_timestamp = getTimefromCTA(rpt[i1].tmstmp);
                 t2.trdr = rpt[i1].rtdir;
                 t2.pred = "true"; 
                 if(rpt[i1].prdctdn == "DUE") 
                 {
                   t2.status = "DUE";
                   t.vehicle_status = "DUE";
                   t.vehicle_stop = t2.stop_id;
                 }
                 else if(rpt[i1].dly) t2.status = "DELAYED";
                 t.stop.push(t2);
                 laststopid = t2.stop_id;
                 laststopdep = tx;
               }
             }
            }
            resolve(t);
          }).catch(function(e) {
              reject(e);
          });
        }
      });
         
    }
    else if(trip_id.indexOf("CTA_") != 0)
    {
      p = new Promise (function(resolve, reject){
      let n = 6;
      if(trip_id.indexOf("Blue") != -1) n = 7;
      else if(trip_id.indexOf("Pink") != -1) n = 7;
      else if(trip_id.indexOf("P") != -1) n = 4;
      else if(trip_id.indexOf("Y") != -1) n = 4;
      else if(trip_id.indexOf("G") != -1) n = 4;
                     
      let rtrip_id = trip_id.substring(n);
//      report("runnumber = " + rtrip_id);
      let p7 = getCTAFeed(201, rtrip_id);  
      p7.then(function(response) {
//       report("9871:\n" + response);
//        report("4228");
        let r = JSON.parse(response);
        let rpt = r.ctatt.eta;
        let t = new Object();
        if(typeof rpt !== 'undefined')
        {
        let k1 = rpt.length;
        if(k1 > 0)
        {
          t.route_id = "CTA" + rpt[0].rt;
          t.route_name = rpt[0].stpDe;
          t.trip_id = trip_id;
          t.trip_name =  rpt[0].rn;
          t.trip_headsign = rpt[0].destNm;
          t.vehicle_id = rpt[0].rn;
          t.vehicle_latitude = r.ctatt.position.lat;
          t.vehicle_longitude = r.ctatt.position.lon;
          t.vehicle_stop = "";
          t.trDr  = rpt[0].trDr;
          t.direction_id = getCTAdir(rpt[0].rt, rpt[0].trDr);
          t.direction_name = "";
          t.stop = [];
          xtid = getCTATripID(rpt[0].rt, t.direction_id);
          if(xtid == "CTA_P_0")
          {
            if(t.trip_headsign == "Linden") xtid = "CTA_P_00";
            else if(t.trip_headsign == "Loop") xtid = "CTA_P_10";
            else xtid = "CTA_P_01";
          }
          else if(xtid == "CTA_P_1")
          {
            if(t.trip_headsign == "Linden") xtid = "CTA_P_11";
            else xtid = "CTA_P_10";
          }

//          report("xtid = " + xtid);
          let laststopid = "";
          let laststopdep = 0;
          let i1 = 0;
          for(i1 = 0; i1<k1; i1++)
          {
            let t2 = new Object();
            t2.stop_sequence = i1 + 1;
            t2.stop_id = "CG" + rpt[i1].staId;
            t2.stop_name = rpt[i1].staNm;
            let tx = getTimefromCTA(rpt[i1].arrT);
//            report("9918 " + rpt[i1].arrT);
            t2.sch_arr_dt = tx;
            t2.sch_dep_dt = tx;
            t2.pred_arr_dt = tx;
            t2.pred_dep_dt = tx;
            t2.pred_timestamp = getTimefromCTA(rpt[i1].prdt);
            t2.trdr = rpt[i1].trDr;
            if(rpt[i1].isSch == 1) t2.pred = "false";
            else t2.pred = "true"; 
            if(rpt[i1].isApp == 1) 
            {
                t2.status = "Approaching";
                t.vehicle_status = "Approaching";
                t.vehicle_stop = t2.stop_id;
            }
            else if(rpt[i1].isDly == 1) t2.status = "DELAYED";
            t.stop.push(t2);
            laststopid = t2.stop_id;
            laststopdep = tx;
          }
//          report(JSON.stringify(t, null, 4));
//          report("4276 ");
          let p9 = serviceE.getScheduleByTrip(xtid, null);
          p9.then(function(x) {
 //             report("4279 xtid = " + xtid);
              let rrr = new Date(laststopdep * 1000);
 //             report("9942 " + laststopdep + ", " + Ptript + " " + rrr.toLocaleTimeString());
 //             report("9943 " + JSON.stringify(x));
              let k2 = x.stop.length;
              let i2 = 0;
              let b = true;
              while(b && (i2 < k2))
              {
                if(x.stop[i2].stop_id == laststopid) b = false;
                else i2 += 1;
              }
              let t0 = laststopdep; // + x.stop[i2].sch_dep_dt
//              report("9956 " + t0);
              if(!b)
              {
                i2 += 1;
                let b2 = true;
                while(b2 && (i2 < k2))
                {
                  let y = x.stop[i2];
                  let t2 = new Object();
                  i1 += 1;
                  t2.stop_sequence = i1;
                  t2.stop_id = y.stop_id;
                  let tg = y.sch_dep_dt;
                  t0 -= tg - x.stop[i2 - 1].sch_dep_dt;
                  t2.sch_arr_dt = t0;
                  t2.sch_dep_dt = t0;
                  t2.pred = "est";
                  t.stop.push(t2);
                  if(t2.stop_id == t.trip_headsign) b2 = false;
                  i2 += 1; 
                }
              }
//              report("4308 " + JSON.stringify(t, null, 4)); 
              resolve(t)
          }).catch(function(e){
              report("4311 " + e);
              resolve(t);
          });

        }
        }
        else
        {
 //         report("4320 " + trip_id + " " + CurrentTrip.trip_headsign + " " + CTAHS); 
          let ntid = getCTAN(trip_id, CTAHS);
 //         xtid = getCTATripID(rpt[0].rt, t.direction_id);
          if(ntid == "CTA_P_0")
          {
            if(t.trip_headsign == "Linden") ntid = "CTA_P_00";
            else if(t.trip_headsign == "Loop") ntid = "CTA_P_10";
            else ntid = "CTA_P_01";
          }
          else if(ntid == "CTA_P_1")
          {
            if(t.trip_headsign == "Linden") ntid = "CTA_P_11";
            else ntid = "CTA_P_10";
          }

//          report("ntid = " + ntid);
         let p8 = serviceE.getScheduleByTrip(ntid, tbase);
          p8.then(function(tt) {
             tt.trip_id = trip_id;
             let k3 = tt.stop.length;
             let i3 = 0;
             let b3 = false;
             let th = 0;
 //            report("4369 " + dtime + " " + Place_id);
              let rrr = new Date(dtime * 1000);
              let rrs = new Date(Ptript * 1000);
 //             report("4370 " + dtime + ", " + Ptript + " " + rrr.toLocaleTimeString() + " " + rrs.toLocaleTimeString());
             while(i3 < k3)
             {
               let x = tt.stop[i3];
               if(x.stop_id == Place_id) 
               {
                   b3 = true;
                   th = Number(x.sch_dep_dt);
               }
               if((b3)) // && (th <= -2))
               {
                  x.sch_arr_dt = Number(Ptript) - Number(x.sch_arr_dt) + th;
                  x.sch_dep_dt = Number(Ptript) - Number(x.sch_dep_dt) + th;
               }
               else
               {
                  x.sch_arr_dt = -2;
                  x.sch_dep_dt = -2;
               }
               i3 += 1;
             }
//             report(":\n" + JSON.stringify(tt,null,4));
             resolve(tt);
          }).catch(function(e) {
              reject(e);
          });
        }
//        if(bReport) report(JSON.stringify(t, null, 4));
//        resolve(t);
      }).catch(function(e) {
          report("4319 " + trip_id + " " + CurrentTrip.headsign);
          reject(e);
      });
    });
    }
    else
    {
      report("4325 " + trip_id + " " + TRIP_STARTTIME);
      let tbase = new Date(TRIP_STARTTIME * 1000);
      p = serviceE.getScheduleByTrip(trip_id, tbase);  
    }
  }
  else if(bOnLine && bok && (trip_id.indexOf("ME") == 0))
  {
    if((SUB[54] != null) && (typeof SUB[54].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[54].header.timestamp);
      PredictionTime = SUB[54].header.timestamp;
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(54);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(54);
      }
    }
    else queueSUB(54);
    p = new Promise (function(resolve, reject){
        let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
 //          if(bReport) report("got feed for " + feed.header.timestamp.low + " " + dtime);
 //           report("1826 " + feed.entity.length);
            if(SUB[54] != null)
            {
              let feed = SUB[54];
              combinetrip(t, feed, "ME_", "ME_", "ME_");
 //          let routes = getRoutesS(stop_id);
            }
            resolve(t);
        }).catch(function(e){
          report("4342 " + e);
        });
    });
  }
  else if(bOnLine && bok && (trip_id.indexOf("B_") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[18] != null) && (typeof SUB[18].header !=='undefined'))
    {
      let ctime = getPBTime(SUB[18].header.timestamp);
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(18);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(18);
      }
    }
    else queueSUB(18);
    
    p = new Promise (function(resolve, reject){
//        report("9864 getPredictionByTrip " + trip_id);
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
          
         if(SUB[18] != null)
         {
//           report("10308 got feed");
           let feed = null;
           feed = SUB[18];
//           console.log(JSON.stringify(feed));
//           report("10461 " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
           combinetrip(t, feed, "B_", "B_", "B_");
//           report("10465 " + JSON.stringify(t, null, 4));
         }
         else report("10315 SUB[18] ==null");
         //if(bReport)
//             report("9877 " + JSON.stringify(t));
         resolve(t);
      }); /* .catch(function(e){
          report("9878 no sked");
          reject(null);
          });  */
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("NJT") == 0))
  {
    let ctime = SUBTS[45];
    if(ctime == null) ctime = 0;
    let b = true;
    let a = serviceE.routes;
    let k = a.length;
    let i = 0;
    let tp = null;
    while(b && (i < k))
    {
      if(a[i].route_id.indexOf("NJR") == 0)
      {
        tp = a[i].getTTrip(trip_id);
        if(tp != null)
        {
          b = false;   
        }
      }
      i += 1;
    }
//    report("10871 " + trip_id + " " + tp.tid);
    if(tp != null)
    {
      let tid = tp.tid;
      if(NJStop != tid)
      {
        NJStop = tid;
        SUBTS[45] = dtime; 
        SUB[45] = null;
        getNJrailData("&f=8&train=" + tid);
      }
      else if(SUB[45] != null)
      {
        if((dtime - ctime) > 300)
        {
          SUBTS[45] = dtime; 
          let feed = SUB[45];
          let k = Object.keys(feed).length;
          report("10884 feed keys = " + k);
          if(k > 3) getNJrailData("&f=8&train=" + tid);  
        }
        else 
        {
          let k = Object.keys(SUB[45]).length;
//          report("10895 keys = " + k); 
        }
      }
    }
    
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if((SUB[45] != null) && (Object.keys(SUB[45]).length > 3))
         {
           let feed = SUB[45];
//           report("10895 " + JSON.stringify(feed, null, 4));
           if((typeof feed.STOPS !== 'undefined') && (feed.STOPS != null))
           {
             combinetripNJ(t,feed, trip_id);
           }
         }
         resolve(t);
      });
      /*.catch(function(e){
          report("3909 " + e);
          let x = "1";
          if(SUB[10] == null) x = "0";
*/   
    });
  }
  else if(bOnLine && bok && (trip_id.indexOf("LAM") == 0))
  {
    let nn = trip_id.indexOf("-");
    let ntripid = trip_id;
    if(nn != -1)
    {
      ntripid =  "LAMB_" + trip_id.substring(nn - 7, nn);  
    }
    let nxc = ntripid.indexOf("_ADDED");
    if((nxc != -1) && (ntripid.indexOf("LAMB") == 0))
    {
      ntripid = ntripid.substring(0, nxc);   
    }
//    report("5606 ntripid = " + ntripid);
    p = new Promise (function(resolve, reject){
 //       clearReport();
      let p2 = serviceE.getScheduleByTrip(ntripid, tbase).then(function(t) {
          let p3 = serviceEO.getLAMBTripUpdateData("", ntripid.substring(5)).then(function(feed) {
 //      report("8748 " + ntripid + "\n" + JSON.stringify(t, null,4) + "\n\n" + JSON.stringify("{" + feed + "}",null,4));

            resolve(t);    
              
          }).catch(function(e) {
              reject(null);
          });
//      resolve(t);    
      }).catch(function(){reject(null);});
    });
      
  }
  else if(bOnLine && bok && (trip_id.indexOf("MTA") == 0))  
  {
 //     report("10092 trip_id = " + trip_id + " " + Place_id);
    let route_id = getMTAroute_idFromtrip_i(trip_id);
    let rid = getMTABusNumFromroute_id(route_id);
    if(route_id.indexOf("MTABC") == 0) rid = route_id;
//    report("10104 " + route_id + " " + trip_id + " " + rid);
    let route = getRoute(route_id);
    let p = new Promise (function(resolve, reject){ 
       getRealTimeDataA(707, rid).then(function(feed) {
          let dn = (new Date()).getTime();
 //         report("10107 " + dn + " " + JSON.stringify(feed,null, 4));
          try{
          t = {};
          t.route_id = route_id;
          t.route_name = route.route_name;
          t.trip_id = trip_id;
          t.trip_name = "MTA Bus " + getMTABusNumFromroute_id(route_id);
          t.direction_name = "";
          t.shape_id = "";
          t.stop = [];
                
         if(feed != null)
          {
            let va = feed.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity;
            if(typeof va !== 'undefined')
            {
            let k1 = va.length;
            let i1 = 0;
            let b2 = true;
            let mvj = null;
            while(b2 && (i1<k1))
            {
              mvj = va[i1].MonitoredVehicleJourney;
              if(typeof mvj === 'undefined') report("10147 "+ i);
              let tid = mvj.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
              let VehicleRef = mvj.VehicleRef.replace(" ", "_");
              let tr_id = makeMTAtrip_id(route_id, VehicleRef);
//              report("10152 " + trip_id + " " + tr_id);
              if(trip_id == tr_id)
              {
                b2 = false;
              }
              else i1 += 1;
            }
            if(!b2)
            {
 //             let vehno = mvj.VehicleRef.substring(0, mvj.VehicleRef.lastIndexOf("_") + 1);
              t.trip_name = mvj.LineRef + "_" + mvj.VehicleRef;
              t.trip_headsign = mvj.DestinationName;
               
              let ss = null;
              if(typeof mvj.OnwardCalls !== 'undefined')
              {
                let dir = mvj.DirectionRef;
                t.direction_id = dir;
                let oca = mvj.OnwardCalls.OnwardCall;
                let k3 = oca.length;
                let i3 = 0;
                for(i3 = 0; i3<k3; i3++)
                {
                  let oc = oca[i3];
                  let tsa = getTimefromCTABus(oc.AimedArrivalTime);
                  let tsd = tsa;
                  let tpa = getTimefromCTABus(oc.ExpectedArrivalTime);
                  let tpd = tpa;
                  ss = {
                    stop_sequence: i3+1,
                    stop_id: oc.StopPointRef.replace("_",""),
                    stop_name: oc.StopPointName,
                    sch_arr_dt: tsa,
                    sch_dep_dt: tsd
                  };
                  if(typeof oc.ExpectedArrivalTime !== 'undefined')
                  {
                    let tpa = getTimefromCTABus(oc.ExpectedArrivalTime);
                    let tpd = tpa;
                    ss.pred_arr_dt = tpa;
                    ss.pred_dep_dt = tpd;
                    ss.pred = "true";
                  }
                  t.stop.push(ss);
                }
              }
              t.pred = "true";
              
            }
            }
          }
          else 
          {
              report("1135 feed is null");
              reject("10244 feed is null");
          }
//          report("10199");
//          report("10200 t = " + JSON.stringify(t,null,4));
          resolve(t);
          }
          catch(e) {report("10205 " + e); reject(e);};
       });
        
    });
  }
  else if(bOnLine && bok && (trip_id.indexOf("SF") == 0))
  {
      // xcvt
    p = serviceE.getScheduleByTrip(trip_id, tbase);

/*    getRealTimeDataA(221, "&svc=" + svcode + "&stop=" + scode).then(function(fd) {
//     getRealTimeDataA(219, "&svc=" + svcode + "&stop=" + scode).then(function(fd) {
     let feed = null;
     let bFeedError = false;
     if(fd != null)
     {
       try{
          feed = JSON.parse(fd);
//          report("2371 feed = " + JSON.stringify(feed, null, 4));
       }
       catch(e) {
          report(e + "\n" + fd);
          bFeedError = true;
       }; 
       let p2 = serviceE.getScheduleByStop(stop_id, max_time, max_trips, tbase).then(function(t) {
          if(fd != null)
          {
//            report("2940 " + bFeedError + " t = " + JSON.stringify(t, null, 4));
            if(bFeedError) resolve(t);
            
 //            clearReport();
            if(bReport) report("feed =\n" + JSON.stringify(feed, null, 4));
            let msv = feed.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
            let k = msv.length;
            let i = 0;
            for(i = 0; i < k; i++) // for each predicted trip
            {
              let a0 = msv[i];
              let routem = a0.MonitoredVehicleJourney.LineRef;
//               report("2581 " + routem );
              let tripid = "SFB_";
              let route = "SFB_" + routem;
              if(bRail) 
              {
                  tripid = "SF_";
                  route = "SF_" + routem;
              }
              let btid = false;
              tripid += a0.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef;
              if(!combineSF(a0, t, tripid))
    */
  }
  else if(bOnLine && bok && (trip_id.indexOf("SEPTA_") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[24] != null) && (typeof SUB[24].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[24].header.timestamp);
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(24);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(24);
      }
    }
    else queueSUB(24);
//    report("8677 SEPTA trip " + (SUB[24] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[24] != null)
         {
           let feed = null;
           feed = SUB[24];
//           report("12123 ");
//           console.log(JSON.stringify(feed));
//           report("8685: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
           combinetrip(t, feed, "SEPTA_", "SEP_", "SEP_");
         }
//         if(bReport) 
//             report("12132 " + JSON.stringify(t, null, 4));
         resolve(t);
      }).catch(function(e){
          report("12127 " + e);
          reject(null);});
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("TR") == 0))
  {
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
    if((SUB[47] != null) && (typeof SUB[47].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[47].header.timestamp);
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(47);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(47);
      }
    }
    else queueSUB(47);
//    report("11355 TR trip " + (SUB[47] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[47] != null)
         {
           let feed = null;
           feed = SUB[47];
//           console.log(JSON.stringify(feed));
//           report("11363: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
           combinetrip(t, feed, "TR", "TRR", "TR");
         }
         if(bReport) report(JSON.stringify(t));
         resolve(t);
      }).catch(function(){reject(null);});
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("RIPT") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[27] != null) && (typeof SUB[27].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[27].header.timestamp);
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(27);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(27);
      }
    }
    else queueSUB(27);
//    report("8677 SEPTA trip " + (SUB[24] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[27] != null)
         {
           let feed = null;
           feed = SUB[27];
//           console.log(JSON.stringify(feed));
//           report("8685: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
//         combinetrip(t, feed, tripprefix, routeprefix, stopprefix)
           combinetrip(t, feed, "RIPT", "RIPT", "RIPT");
         }
         if(bReport) report(JSON.stringify(t));
         resolve(t);
      }).catch(function(){reject(null);});
    });
  }
  }
  
  else if(bOnLine && bok && (trip_id.indexOf("RTD_") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[30] != null) && (typeof SUB[30].header !== 'undefined'))
    {
      report("10524 " + JSON.stringify(SUB[30], null,4));
      let ctime = getPBTime(SUB[30].header.timestamp);
      let dt = dtime - ctime + 7200;
      if((dt) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(30);
      }
      else if((dt) > 360)
      {
        queueSUB(30);
      }
    }
    else queueSUB(30);
//    report("8677 SEPTA trip " + (SUB[30] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[30] != null)
         {
           let feed = null;
           feed = SUB[30];
//           console.log(JSON.stringify(feed));
//           report("8685: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
//         combinetrip(t, feed, tripprefix, routeprefix, stopprefix)
           combinetrip(t, feed, "RTD_", "RTD_", "RTD_");
         }
         if(bReport) report(JSON.stringify(t));
         resolve(t);
      }).catch(function(){reject(null);});
    });
  }
  }
  
  else if(bOnLine && bok && (trip_id.indexOf("MSLB") == 0))
  {
//    report("11727 getPredictionByTrip " + trip_id);
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[49] != null) && (typeof SUB[49].header !== 'undefined'))
    {
//      report("10524 " + JSON.stringify(SUB[49], null,4));
      let ctime = getPBTime(SUB[49].header.timestamp);
      let dt = dtime - ctime + 7200;
//      console.log("11790 
      if((dt) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(49);
      }
      else if((dt) > 480)
      {
        queueSUB(49);
      }
    }
    else queueSUB(49);
//    report("8677 SEPTA trip " + (SUB[30] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[49] != null)
         {
           let feed = null;
           feed = SUB[49];
//           console.log(JSON.stringify(feed));
//           report("11765: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
//         combinetrip(t, feed, tripprefix, routeprefix, stopprefix)
           try{
           combinetrip(t, feed, "MSLB", "MSLB", "MSLB");
           }
           catch(e) {
               report("11820 " + e);
           }
         }
         if(bReport) report(JSON.stringify(t));
         resolve(t);
      }).catch(function(){reject(null);});
    });
  }
  }
  
  else if(bOnLine && bok && (trip_id.indexOf("WMA") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[37] != null) && (typeof SUB[37].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[37].header.timestamp);
      let dt = dtime - ctime + 7200;
      if((dt) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(37);
      }
      else if((dt) > 360)
      {
        queueSUB(37);
      }
    }
    else queueSUB(37);
//    report("10587 WMATA trip " + trip_id + " " + (SUB[30] != null))
    p = new Promise (function(resolve, reject){
      if(SUB[37] != null)
      {
        if(trip_id.indexOf("WMA_") == 0)
        {
          let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
            resolve(t);
          }).catch(function(e) {
            reject("10648 " + e);
          });
        }
        else
        {
        let feed = null;
        feed = SUB[37];
        let tid = trip_id.substring(3);
        let k6 = feed.entity.length;
        let i6 = 0;
        let b6 = true;
//    report("10597 WMATA trip " + trip_id + " " + tid)
        while(b6 && (i6 < k6))
        {
          let f1 = feed.entity[i6];
          if(f1.trip_update != null)
          {
            if(f1.trip_update.trip.trip_id.indexOf(tid) != -1)
            {
              let ot = new Object();
              ot.trip_id = trip_id; 
              ot.route_id = "WMA_" + f1.trip_update.trip.route_id;
              ot.route_name = f1.trip_update.trip.route_id; + " Line";
              ot.direction_id = f1.trip_update.trip.direction_id;
              let stu = f1.trip_update.stop_time_update;
              ot.trip_headsign = getStopNameFromID("WMA" + stu[stu.length-1].stop_id);
              ot.stop = [];
              let k7 = stu.length;
              let i7 = 0;
              for(i7 = 0; i7<k7; i7++)
              {
                let si = new Object();
                si.stop_sequence = (i7 + 1);
                let sid = stu[i7].stop_id;
                si.stop_id = "WMA" + sid.substring(3, sid.length - 2);
                si.stop_name = getStopNameFromID(si.stop_id);
                let ta = "";
                let td = "";
                if(typeof stu[i7].departure !== 'undefined') td = stu[i7].departure.time;
                if(typeof stu[i7].arrival !== 'undefined') ta = stu[i7].arrival.time;
                if(td == "") td = ta;
                else if(ta == "") ta = td;
                si.sch_arr_dt = ta;
                si.sch_dep_dt = td;
                si.pred_arr_dt = ta;
                si.pred_dep_dt = td;
                si.pred = "true";
                ot.stop.push(si);
              }
              b6 = false;
//              report("10635 " + JSON.stringify(ot, null, 4));
              resolve(ot);
            }
          }
          i6 += 1;
        }
        }
      }
      else 
      {
        let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
            resolve(t);
        }).catch(function(e) {
            reject("10648 " + e);
        });
      }
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("MARC_") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[39] != null) && (typeof SUB[39].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[39].header.timestamp);
      let dt = dtime - ctime + 7200;
      if((dt) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(39);
      }
      else if((dt) > 360)
      {
        queueSUB(39);
      }
    }
    else queueSUB(39);
//    report("10399 MARC trip " + (SUB[30] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[39] != null) 
         {
           let feed = null;
           feed = SUB[39];
//           console.log(JSON.stringify(feed));
//           report("8685: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
//         combinetrip(t, feed, tripprefix, routeprefix, stopprefix)
           if(typeof feed.entity !== 'undefined')
           {
             combinetrip(t, feed, "MARC_", "MARC_", "MARC_");
           }
         }
//         if(bReport) report("10413 " + JSON.stringify(t));
         resolve(t);
      }).catch(function(){reject(null);}); 
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("VRE") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[33] != null) && (typeof SUB[33].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[33].header.timestamp);
      if((dtime - ctime) > 3600)
      {
        queueSUB(33);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(33);
      }
    }
    else queueSUB(33);
//    report("8677 SEPTA trip " + (SUB[33] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[33] != null)
         {
           let feed = null;
           feed = SUB[33];
//           console.log(JSON.stringify(feed));
//           report("8685: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
//         combinetrip(t, feed, tripprefix, routeprefix, stopprefix)
           combinetrip(t, feed, "VRE", "VRE", "VRE");
         }
         if(bReport) report(JSON.stringify(t));
         resolve(t);
      }).catch(function(){reject(null);});
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("BL") == 0)) // Brightline
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[43] != null) && (typeof SUB[43].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[43].header.timestamp);
      if((dtime - ctime) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(43);
      }
      else if((dtime - ctime) > 120)
      {
        queueSUB(43);
      }
    }
    else queueSUB(43);
//    report("8677 SEPTA trip " + (SUB[33] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[43] != null)
         {
           let feed = null;
           feed = SUB[43];
//           console.log(JSON.stringify(feed));
//           report("8685: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
//         combinetrip(t, feed, tripprefix, routeprefix, stopprefix)
           combinetrip(t, feed, "BL", "BL", "BL_");
         }
         if(bReport) report(JSON.stringify(t));
         resolve(t);
      }); //.catch(function(){reject(null);});
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("CML") == 0))
  {
//  if(document.getElementById("bUseNewNY").checked)
  if((!PBloaded) && (!PBloading))
  {
    loadpb();
  }
  else if((PBloaded) && (PBloading) && (GRB == null))
  {
    defineGRB(); 
  }

  if(true)
  {
//    if(GRB == null) report("GRB is null");
    
    if((SUB[35] != null) && (typeof SUB[35].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[35].header.timestamp);
      let dt = dtime - ctime + 10800;
//      report("9896 " + dtime + " " + ctime + " " + dt);
      if((dt) > 3600)
      {
//                  SUB[i] = null;
        queueSUB(35);
      }
      else if((dt) > 120)
      {
        queueSUB(35);
      }
    }
    else queueSUB(35);
//    report("9907 Metrolink trip " + (SUB[35] != null))
    p = new Promise (function(resolve, reject){
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
         if(SUB[35] != null)
         {
           let feed = null;
           feed = SUB[35];
//           console.log(JSON.stringify(feed));
//           report("8685: " + JSON.stringify(t, null, 4));
//           if(bReport) report("got BART feed for " + feed.header.timestamp.low + " " + dtime);
//         combinetrip(t, feed, tripprefix, routeprefix, stopprefix)
           combinetrip(t, feed, "CML", "LAML", "CML");
         }
//         if(bReport) 
//report(JSON.stringify(t));
         resolve(t);
      }).catch(function(){reject(null);});
    });
  }
  }
  else if(bOnLine && bok && (trip_id.indexOf("AMR") == 0))
  {
    if((!PBloaded) && (!PBloading))
    {
      loadpb();
    }
    else if((PBloaded) && (PBloading) && (GRB == null))
    {
      defineGRB(); 
    }

//    if(GRB == null) report("GRB is null");
    
    if((SUB[20] != null) && (typeof SUB[20].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[20].header.timestamp);
      if((dtime - ctime) > 900)
      {
        queueSUB(20);
      }
    }
    else queueSUB(20);
    
    p = new Promise (function(resolve, reject){
//        report("7920 getScheduleByTrip " + trip_id + " " + tbase);
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
          if(t == null) report("7415 t is null " + trip_id + tbase.toDateString());
//           report("8958: "+ JSON.stringify(t));                                                    
         if(SUB[20] != null)
         {
           let feed = null;
           feed = SUB[20];
           if(bReport) report("got feed for " + getPBTime(feed.header.timestamp) + " " + dtime);
           combinetrip(t, feed, "AMR_", "AMR", "AMS");
          if(t == null) report("7422 t is null " + trip_id + tbase.toDateString());
         }
 //        if(bReport)
 //        report("10768: "+ JSON.stringify(t));
         resolve(t);
      }).catch(function(e){reject("7426 " + e);}); 
    });
  }
  else if(bOnLine && bok && (trip_id.indexOf("VIA") == 0))
  {
    if((!PBloaded) && (!PBloading))
    {
      loadpb();
    }
    else if((PBloaded) && (PBloading) && (GRB == null))
    {
      defineGRB(); 
    }
    
    if((SUB[22] != null) && (typeof SUB[22].header !== 'undefined'))
    {
      let ctime = getPBTime(SUB[22].header.timestamp);
      if((dtime - ctime) > 900)
      {
        queueSUB(22);
      }
    }
    else queueSUB(22);
    
    p = new Promise (function(resolve, reject){
//        report("7920 getScheduleByTrip " + trip_id);
      let p2 = serviceE.getScheduleByTrip(trip_id, tbase).then(function(t) {
          if(t == null) report("8053 t is null " + trip_id + tbase.toDateString());
         if(SUB[22] != null)
         {
           let feed = null;
//           report("11725: " + JSON.stringify(t, null, 4));
           feed = SUB[22];
//            report("11727: " + JSON.stringify(feed, null, 4));
          if(bReport) report("got feed for " + getPBTime(feed.header.timestamp) + " " + dtime);
           combinetrip(t, feed, "VIA", "VIAR", "VIA");
          if(t == null) report("8060 t is null " + trip_id + tbase.toDateString());
         }
 //        if(bReport)
// report("11731: " + JSON.stringify(t, null, 4));
         resolve(t);
      }).catch(function(e){report("8064 " + e); resolve(t);});
    });
  }
  else
  {
    p = serviceE.getScheduleByTrip(trip_id, tbase);
  }
  return(p);  
}  

function getCTAN(trip_id, hs)
{
  let tid = "";
  if(trip_id.indexOf("Red") != -1)
  {
    if(hs == "Howard") tid = "CTA_Red_1";
    else tid = "CTA_Red_0";
  }
  else if(trip_id.indexOf("Blue") != -1)
  {
    if(hs == "Forest Park") tid = "CTA_Blue_0";
    else tid = "CTA_Blue_1";
  }
  else if(trip_id.indexOf("G") != -1)
  {
    if(hs == "Ashland/63rd") tid = "CTA_G_0";
    else tid = "CTA_G_1";
  }
  else if(trip_id.indexOf("Pink") != -1)
  { 
    if(hs == "Loop") tid = "CTA_Pink_0";
    else tid = "CTA_Pink_1";      
  }
  else if(trip_id.indexOf("P") != -1)
  {
    if(hs == "Linden / Howard") tid = "CTA_P_0";
    else tid = "CTA_P_1";
  }
  else if(trip_id.indexOf("Br") != -1)
  {
    if(hs == "Loop") tid = "CTA_Brn_0";
    else tid = "CTA_Brn_1";
  }
  else if(trip_id.indexOf("Y") != -1)
  {
    if(hs.indexOf("Skokie") != -1) tid = "CTA_Y_0";
    else tid = "CTA_Y_1";
  }
  else if(trip_id.indexOf("O") != -1)
  {
    if(hs == "Loop") tid = "CTA_Org_0";
    else tid = "CTA_Org_1";
  }
  return(tid); 
}

function getCTAdir(rt, trDr)
{
  let dir = 0;
  if((rt.indexOf("Red") != -1) && (trDr == "1")) dir = 1;
  else if((rt.indexOf("Blue") != -1) && (trDr == "1")) dir = 1;
  else if((rt.indexOf("Green") != -1) && (trDr == "1")) dir = 1;
  else if((rt.indexOf("Purple") != -1) && (trDr == "1")) dir = 1;
  else if((rt.indexOf("Br") != -1) && (trDr == "1")) dir = 1;
  else if((rt.indexOf("Y") != -1) && (trDr == "5")) dir = 1;
  else if((rt.indexOf("Or") != -1) && (trDr == "5")) dir = 1;
  else if((rt.indexOf("Pink") != -1) && (trDr == "5")) dir = 1;
  return(dir);
}

function getCTATripID(rt, dir)
{
  let tid = "CTA_";
  if(rt.indexOf("Red") != -1) tid += "Red";
  else if(rt.indexOf("Blue") != -1) tid += "Blue";
  else if(rt.indexOf("Green") != -1) tid += "G";
  else if(rt.indexOf("Pink") != -1) tid += "Pink";
  else if(rt.indexOf("O") != -1) tid += "Org";
  else if(rt.indexOf("P") != -1) tid += "P";
  else if(rt.indexOf("Y") != -1) tid += "Y";
  else if(rt.indexOf("Br") != -1) tid += "Brn";
  else{
    tid += rt;   
  }
  tid += "_" + dir;
  return(tid);
}

  //AssociateService.prototype.getScheduleByTrip = function(trip_id, max_time, max_trips, tbase)
AssociateService.prototype.getScheduleByTrip = function(trip_id, tbase)
{
//  if(tbase != null) report("9303 " + tbase.getTime() + " " + tbase);
  let bReport = document.getElementById("rp").checked;
  let dt = new Date();
  let s = "";
  if(tbase != null)
  {
    dt.setFullYear(tbase.getFullYear());
    dt.setMonth(tbase.getMonth());
    dt.setDate(tbase.getDate());
  }
  dt.setHours(0);
  dt.setMinutes(0);
//    report("4606 " + trip_id + " " + dt.getFullYear() + " " + dt.getMonth() + " " + dt.getDate() + " " + dt.getHours() + " " + dt.getMinutes());
  let day = dt.getDay().toString();
  let d = Math.floor(dt.getTime() / 1000);
  if(d < 0)
  {
    if(tbase == null)
    {
      report("AS.getScheduleByTrip d == " + d + " tbase null dt = " + dt.toLocaleDateString() + " " + dt.toLocaleTimeString());
    }
    else
    {
      report("AS.getScheduleByTrip d == " + d + " tbase = " + tbase.toLocaleDateString() + " " + dt.toLocaleTimeString());
    }
  }
  //let d = Math.floor((new Date(tbase.getYear(), tbase.getMonth(), tbase.getDay(), 0, 0,0, 0)).getTime() / 1000);
//  if(bReport)  {
//report("11145 AS.getScheduleByTrip " + trip_id + " " + d + " " + this.routes.length + " " + dt.toLocaleDateString() + " " + dt.toLocaleTimeString());
//      if(tbase != null) report("tbase name is " + tbase.constructor.name);   

let b = false;
  let t = null;
  let k = this.routes.length;
  let i = 0;
  while(!b && (i < k))
  {
    let r = this.routes[i];
//    if(i == 0) report("11193 " + r.route_id + " " + this.routes[273].route_id);
//    if(r.route_id.indexOf("B_") == 0) report("11194 " + r.route_id + " " + trip_id);
    t = r.getTTrip(trip_id);
//    let TZRoute = r.cal.gtfstz;
//    if(t == null) report("9026 getTTrip " + trip_id + " not found " + r.route_id);
//    if((r.route_id.indexOf("LAM") == 0) && (r.trips.length > 0))report("5759 " + r.route_id + " " + r.trips[0].trip_id + " " + trip_id);
    if(t != null)
    {
      let xx = r.route_id.indexOf("CTA");
//      report("9428 getTTrip found " + trip_id + " for " + r.route_id + " " + xx);
      b = true;
//      if(xx == 0)
//      t.parent = null;
//      report("9408:" + JSON.stringify(t, null,4) + ":");
      t.route = r;
    }
//    else report("11339 trip not found. " + trip_id);
    i += 1;
  }
//  report("11211 " + i + " " + k);
  let bAddingNew = false;
//  if(!b) report("9439 " + b);
//  report("10533 b = " + b + " " + t);
//  if(t == null) {t = new Object(); bAddingNew = true; }
  
  if(!b && (trip_id.indexOf("MN") == 0)) // || bAddingNew)
  {
  let k = this.routes.length;
  let i = 0;
  while(!b && (i < k))
  {
    let r = this.routes[i];
    if(r.route_id.indexOf("MN") == 0)
    {
    let kk = r.trips.length;
    let ii = 0;
    let bx = true;
    let t1 = trip_id + "_";
    t1 = t1.toString();
    let ddf = getCDateFromDate(dt);
//    report("10773 " + t1 + " " + ddf + " " + r.route_id);
    while(bx && (ii < kk))
    {
      let t2 = r.trips[ii];
      //if(ii == 8) 
//          report("10777 " + t2.trip_id + " " + t1 + t2.trip_id.indexOf(t1));
      if(t2.trip_id.indexOf(t1) == 0)
      {
//        report("10778 found " + t2.trip_id);
        if(isDateOK2(r, t2, ddf))
        {
          bx = false;
          b = true;
          t = t2;
          t.route = r;
        }
      }
      ii += 1;
    }
    }
    i += 1;
  }
  }
  
  if(bAddingNew || !b)
  {
    s = "{\"trip_id\": \"" + trip_id + "\", \"stop\": [";   
  }
  /*
  let rr = t.route;
  t.route = null;
  report("11009 got trip " + trip_id + " \n" + JSON.stringify(t,null,4));
  t.route = rr;
  */
//  report("3580 got here " + b + " " + t.comp.length);
  let p = new Promise(function(resolve, reject) {
    if(b)
    {
       s = "{\"route_id\": \"" + t.route.route_id + "\", \"route_name\": \"" + t.route.route_name + "\", \"trip_id\": \"" + t.trip_id + "\", \"trip_name\": \"" + t.trip_name + "\", \"direction_id\": \"" + t.direction + "\", \"direction_name\": \"" + t.direction_name + "\", \"shape_id\": \"" + t.shape_id ;
      if(typeof t.tid !== 'undefined') s += "\", \"tid\": \"" + t.tid;
      if(typeof t.headsign !== 'undefined') s += "\", \"trip_headsign\": \"" + t.headsign;
      if(typeof t.tid !== 'undefined') s += "\", \"tid\": \"" + t.tid;
      s += "\", \"stop\": [";
      let btrip = false;
      if((typeof t.comp != 'undefined') && (t.comp != null) && (t.comp.length > 1))
      {
//          report("9458 " + t.comp.length +" " + JSON.stringify(t.comp, null, 4));
        let ss = 1;
        let kk = t.comp.length;
        let ii = 0;
        for(ii = 0; ii < kk; ii++)
        {
          if(ii != 0) s += ",";
          let a = t.comp[ii];
          let stopid = a.stop_id;
          if(typeof stopid === 'undefined') stopid = a.s;
          let jv = stopid.indexOf(":");
          let tracks = "";
          if(jv != -1)
          {
            tracks = stopid.substring(stopid.lastIndexOf(":") + 1);
//            stopid = stopid.substring(0, jv);  
          }
          let stopname = getStopNameFromID(stopid);
//          report("11255 " + stopname);
          let ta = "";
          let td = "";
          if(typeof a.tsd !== 'undefined') td = d + getUtime(a.tsd);
          else if(typeof a.d !== 'undefined') td = d + getUtime(a.d);
          if(typeof a.tsa !== 'undefined') ta = d + getUtime(a.tsa);
          else if(typeof a.a !== 'undefined') ta = d + getUtime(a.a);
          else ta = td;
          let tzfactor = 0; // hour difference between stop and gtfs
          if(stopid.indexOf("Z_") != 0) tzfactor = getTimeZFactor(stopid, t.route); //getTzFactor(getTZforStop(stopid), t.route.cal.gtfstz);
          td = Number(td) + tzfactor;
          ta = Number(ta) + tzfactor;
//          report("11046 " + ta + " " + td + " " + d + " " + a.d);
          s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + stopid + "\", \"stop_name\": \"" + stopname + "\",\"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\""; 
//          if(bFudge) s += ", \"pred\": \"est\"";
          if(tracks != "") s += ", \"track\": \"" + tracks + "\"";
          s += "}";
          ss += 1;
        }
//        report("11273 s = " + s);
      }
      else
      {
      let zsth = "";
      let zstm = "";
      let kk = t.times.length;
      let ii = 0;
      let ss = 1;
      if(t.direction == 1)
      {
         let iii = kk - 1;
         while(ii < kk)
         {
          if(t.times[ii] != "-1")
          {
            if(btrip) s += ",";
            btrip = true;
            let stx = t.times[ii];
            let st = stx;
            let sta = "";
            let bFudge = false;
            if(st == "") bFudge = true;
//            report("1 st = [" + st + "] " + bFudge + " " + zsth + " " + zstm);}
            let ix = stx.indexOf("/");
            if(ix != -1)
            {
              st = stx.substring(ix+1);
              sta = stx.substring(0, ix);
            }
            let kg = st.indexOf("+");
            if(kg != -1) st = st.substring(0, kg);
            kg = st.indexOf(":");
//            let tzfactor = getTimeZFactor(stopid, t.route);
//            report("11348 tzfactor= " + tzfactor);
            let sth = st.substring(0, kg);
            let stm = st.substring(kg+1);
//            report("st = " + st);
            if(bFudge)
            {
              sth = Number(zsth);
              stm = Number(zstm) + 1;
            }
            let td = -60 * stm;
            if(sth != "-2") td = d + 3600 * sth + 60 * stm;
            let ta = td;
            if(sta != "")
            {
              kg = sta.indexOf(":");
              sth = sta.substring(0, kg);
              stm = sta.substring(kg+1);
              ta = d + 3600 * sth + 60 * stm; 
            }
            if(bFudge)
            {
              sth = Number(zsth);
              stm = Number(zstm) + 1;
            }
            zsth = Number(sth);
            zstm = Number(stm);
            let stopid = null;
            if(t.route.stop_ids.length != 0) stopid = t.route.stop_ids[iii];
            else if((t.direction == 0) && (typeof t.route.stop_ids0 !== 'undefined'))
            {
               stopid = t.route.stop_ids0[iii];  
            }
            else if((t.direction == 1) && (typeof t.route.stop_ids1 !== 'undefined'))
            {
               stopid = t.route.stop_ids1[ii];  
            }
//            report(".");
            let tzfactor = 0;
            let bxx = true;
            try {
                let ixx = stopid.indexOf("Z_");
                bxx = (ixx != 0);
            }
            catch(e) {
                report("13090 stopid = " + stopid);
            }
            if(stopid.indexOf("Z_") != 0) tzfactor = getTimeZFactor(stopid, t.route ) ; //getTzFactor(getTZforStop(stopid), t.getTripTZ());
            if(td > 0) td = Number(td) + tzfactor;
            if(ta > 0) ta = Number(ta) + tzfactor;
           
            
            let stopname = getStopNameFromID(stopid);
//            report(".." + stop_id + " " + stopname);
           s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + stopid + "\", \"stop_name\": \"" + stopname + "\",\"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\""; 
           if(bFudge) s += ", \"pred\": \"est\"";
           s += "}";
            ss += 1;
          }
          iii -= 1;
          ii += 1;
         }
      }
      else
      {
        while(ii < kk)
        {
          if(t.times[ii] != "-1")
          {
            if(btrip) s += ",";
            btrip = true;
            let stx = t.times[ii];
            let st = stx;
            let bFudge = false;
            if(st == "") bFudge = true;
  //          report("2 st = [" + st + "] " + bFudge + " " + zsth + " " + zstm);
            let sta = "";
            let ix = stx.indexOf("/");
            if(ix != -1)
            {
              st = stx.substring(ix+1);
              sta = stx.substring(0, ix);
            }
            let kg = st.indexOf("+");
            if(kg != -1) st = st.substring(0, kg);
            kg = st.indexOf(":");
            let sth = st.substring(0, kg);
            let stm = st.substring(kg+1);
            if(bFudge)
            {
              sth = Number(zsth);
              stm = Number(zstm) + 1;
            }
            let td = -60 * stm;
            if(sth != "-2") td = d + 3600 * sth + 60 * stm;
            let ta = td;
            if(sta != "")
            {
              kg = sta.indexOf(":");
              sth = sta.substring(0, kg);
              stm = sta.substring(kg+1);
              ta = d + 3600 * sth + 60 * stm;
            }
            if(bFudge)
            {
              sth = Number(zsth);
              stm = Number(zstm) + 1;
            }
            zsth = Number(sth);
            zstm = Number(stm);
            let stopid = null;
//            report("4794 " + t.route.route_id + " " + t.route.stop_ids.length + " " + ii + " " + t.route.stop_ids[ii]);
            if(t.route.stop_ids.length != 0) stopid = t.route.stop_ids[ii];
            else if((t.direction == 0) && (typeof t.route.stop_ids0 !== 'undefined'))
            {
               stopid = t.route.stop_ids0[ii];  
            }
            else if((t.direction == 1) && (typeof t.route.stop_ids1 !== 'undefined'))
            {
               stopid = t.route.stop_ids1[ii];  
            }
//            report("." + stopid + " " + ii);
            let tzfactor = 0;
            if(stopid.indexOf("Z_") != 0) tzfactor = getTimeZFactor(stopid, t.route); //getTzFactor(getTZforStop(stopid), t.getTripTZ());
            if(td > 0) td = Number(td) + tzfactor;
            if(ta > 0) ta = Number(ta) + tzfactor;

            let stopname = getStopNameFromID(stopid);
//            report(".." + stopid + " :" + stopname + ":");
           s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + stopid + "\", \"stop_name\": \"" + stopname + "\",\"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\"";
           if(bFudge) s += ", \"pred\": \"est\"";
           s += "}";
           ss += 1;
          }
          ii += 1;
        }
      }
      }
      
      s += "]}";
 //      if(bReport) 
//      report("9578:\n" + s + "\n:\n");
      let tx = JSON.parse(s);
      resolve(tx);
//      reject("AS.getScheduleByTrip trip not found. " + trip_id);
      
    }
    else 
    {
//        report("9656 " + s + "]}");
        let tx = JSON.parse(s + "]}");
        resolve(tx);
    }
  });
  return(p);
}

AssociateService.prototype.getScheduleTemplateByRoute = function(route_id, from_id, to_id, capt,cur_stop_id)
{
  let bReport = document.getElementById("rp").checked;
  if(bReport) report("AS.getScheduleTemplateByRoute " + route_id + " cur_stop_id = " + cur_stop_id + " " + from_id + " " + to_id);
  let rts = this.routes;
  let p = new Promise(function(resolve, reject) {
    let rid = getRouteSForId(route_id);
    if(rid == "") rid = route_id;
 //   report("rid = " + rid);
    let s = "";
    let r = null;
    let b = true;
    let csi = null;
    if(cur_stop_id != null) csi = getParentIdFromId(cur_stop_id);
    let k = rts.length;
    let i = 0;
    while(b && (i < k))
    {
      r = rts[i];
//      report("  " + r.route_id + " " + rid + " " + route_id );
      if((r.route_id == rid) || (r.route_id == route_id))
      {
        b = false;
      }
      i += 1;
    }
    if(!b)
    {
      let dir = null;
      // dir = r.getDirection(from_id, to_id);
      let cx = cur_stop_id;
      if((cx == null) || (cx == "null")) cx = from_id;
//      report("getScheduleTemplateByRoute " + cx + " " + to_id);
      dir = r.getDirection(cx, to_id);
      if(dir != -1)
      {
        let k = r.trips.length;
        let i = 0;
        let bh = true;
        let t = null;
        while(bh && (i < k))
        {
          let t = r.trips[i];
          if(t.direction == dir)
          {
            bh = false
          }
          else i += 1;
        }
        if(!bh)
        {
          let btrip = false;
          t.route = r;
          let jj = capt.indexOf(")");
          let tn = capt;
          if(jj != -1) tn = capt.substring(0, jj+1);
          s = "{\"route_id\": \"" + t.route.route_id + "\", \"route_name\": \"" + t.route.route_name + "\", \"trip_id\": \"" + CurrentTripID + "\", \"trip_name\": \"" + tn + "\", \"direction_id\": \"" + t.direction + "\", \"direction_name\": \"" + t.direction_name + "\", \"stop\": [";
          let kk = t.times.length;
          let ii = 0;
          let ss = 1;
          let toffset = 0;
 //         report("t.direction = " + t.direction);
          if(t.direction == 1)
          {
            let bTrig = false;
            let iii = kk - 1;
            while(ii < kk)
            {
              if(t.times[ii] != "-1")
              {
                let pld = t.route.stop_ids[iii];
                if((typeof pld !== 'undefined') && ((pld == Place_id) || (Place.indexOf(pld) != -1) || (getParentIdFromId(Place_id) == getParentIdFromId(pld))))
                {
                  let st = t.times[ii];
//                  report("t.times[ii] = " + st);
                  let kg = st.indexOf("+");
                  if(kg != -1) st = st.substring(0, kg);
                  kg = st.indexOf(":");
                  let stm = st.substring(kg+1);
                  toffset = stm;
//                  report("t.times[ii] = " + st + " " + stm);
                }
              }
              iii -= 1;
              ii += 1;
            }
//            report("toffset = " + toffset);
            iii = kk - 1;
            ii = 0;
            let bx = true;
            while(bx && (ii < kk))
            {
              if(t.times[ii] != "-1")
              {
                if(btrip) s += ",";
                btrip = true;
                let st = t.times[ii];
                let kg = st.indexOf("+");
                if(kg != -1) st = st.substring(0, kg);
                kg = st.indexOf(":");
                let sth = st.substring(0, kg);
                let stm = st.substring(kg+1);
                if(sth != "-2") stm = Number(sth) * 60 + Number(stm);
//                report("sth = " + sth + " stm = " + stm + " " + t.route.stop_names[iii]);
                let td = -60 * stm;
                /*
                if(sth != "-2") 
                {
                    report("got here 1240");
                    td = d + 3600 * sth + 60 * stm;
                }
                */
                let pld = t.route.stop_ids[iii];
//                report("pld = " + pld + " Place" + Place);
                
                if((typeof pld !== 'undefined') && ((pld == Place_id) || (Place.indexOf(pld) != -1) || (getParentIdFromId(Place_id) == getParentIdFromId(pld))))
                {
                  bTrig = true;
                  toffset = stm;
//                  if(typeof CurrentTp === 'undefined') td = 0;
//                  else 
                      td = CurrentTp;
//                  report("CurrentTp = " + CurrentTp + " stm = " + stm);
                }
                else if((typeof pld !== 'undefined') && (csi == getParentIdFromId(pld)))
                {
                  bTrig = true;
                  td = Number(CurrentTp) + (stm - toffset) * 60;
                }
                else if(!bTrig) td = -2;
                else if(typeof CurrentTp === 'undefined')
                {
                  td = -(Number(stm) - toffset) * 60;  
                }
                else
                {
 //                 report("CurrentTp = " + CurrentTp + " next stm = " + stm + " - offset " + toffset);
                  td = Number(CurrentTp) + (stm - toffset) * 60;   
                }
                let ta = td;
                
                let tzfactor = 0;
                if((t.route != null) && (t.route.cal != null) && (t.route.stop_ids[iii].indexOf("Z_") != 0)) tzfactor = getTimeZFactor(t.route.stop_ids[iii], t.route); // getTzFactor(getTZforStop(t.route.stop_ids[iii]), t.getTripTZ());
                if(td > 0) td = Number(td) + tzfactor;
                if(ta > 0) ta = Number(ta) + tzfactor;

                s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + t.route.stop_ids[iii] + "\", \"stop_name\": \"" + t.route.stop_names[iii] + "\",\"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\"}";
                ss += 1;
//                report("  " + t.route.stop_ids[iii] + " " + to_id);
                if(t.route.stop_ids[iii] == getParentIdFromId(to_id)) bx = false;
//                report("  td = " + td);
              }
            iii -= 1;
            ii += 1;
            }
         }
        else
        {
          let bTrig = false;
          while(ii < kk)
          {
            if(t.times[ii] != "-1")
            {
              let pld = t.route.stop_ids[ii];
              if((typeof pld !== 'undefined') && ((pld == Place_id) || (Place.indexOf(pld) != -1) || (getParentIdFromId(Place_id) == getParentIdFromId(pld))))
              {
                let st = t.times[ii];
                let kg = st.indexOf("+");
                if(kg != -1) st = st.substring(0, kg);
                kg = st.indexOf(":");
                let stm = st.substring(kg+1);
                toffset = stm;
              }
            }
            ii += 1; 
          }
//          report("toffset = " + toffset);
          ii = 0;
          let bx = true;
          while(bx && (ii < kk))
          {
          if(t.times[ii] != "-1")
          {
            if(btrip) s += ",";
            btrip = true;
            let st = t.times[ii];
            let kg = st.indexOf("+");
            if(kg != -1) st = st.substring(0, kg);
            kg = st.indexOf(":");
            let sth = st.substring(0, kg);
            let stm = st.substring(kg+1);
            if(sth != "-2") stm = Number(sth) * 60 + Number(stm);
 //           report("sth = " + sth + " stm = " + stm +  " " + t.route.stop_names[iii]);
            let td = -60 * stm;
            /*
            if(sth != "-2") 
            {
                report("got here 1312");
                td = d + 3600 * sth + 60 * stm;
            }
            */
            let pld = t.route.stop_ids[ii];
//               report("pld = " + pld + " PLace = " + Place);
            if((typeof pld !== 'undefined') && ((pld == Place_id) || (Place.indexOf(pld) != -1) || (getParentIdFromId(Place_id) == getParentIdFromId(pld))))
            {
              bTrig = true;
              td = CurrentTp;
              toffset = stm;
 //                 report("CurrentTp = " + CurrentTp + " stm = " + stm);
            }
            else if((typeof pld !== 'undefined') && (csi == getParentIdFromId(pld)))
            {
              bTrig = true;
              td = Number(CurrentTp) + (stm - toffset) * 60;
            }
            else if(!bTrig) td = -2;
            else if(typeof CurrentTp === 'undefined')
            {
              td = -(Number(stm) - toffset) * 60;  
            }
            else
            {
//                  report(" next stm = " + stm + " - offset " + toffset);
              td = Number(CurrentTp) + (stm - toffset) * 60;   
            }
            let ta = td;
            
            let tzfactor = 0;
            if((t.route != null) && (t.route.cal != null) && (t.route.stop_ids[ii].indexOf("Z_") != 0)) tzfactor = getTimeZFactor(t.route.stop_ids[ii], t.route); //  getTzFactor(t.route.stop_ids[ii], t.route.cal.gtfstz);
            if(td > 0) td = Number(td) + tzfactor;
            if(ta > 0) ta = Number(ta) + tzfactor;

            s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + t.route.stop_ids[ii] + "\", \"stop_name\": \"" + t.route.stop_names[ii] + "\",\"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\"}";
            ss += 1;
            if(t.route.stop_ids[ii] == getParentIdFromId(to_id)) bx = false;
          }
          ii += 1;
          }
        }
        s += "]}";
      if(bReport) report(":\n" + s + "\n:\n");
      let tx = JSON.parse(s);
      resolve(tx);
      }
      else
      {
        reject("getScheduleTemplateByRoute " + route_id + " error");
      }
    }
    else reject("undetermined direction " + from_id + " to " + to_id);
  }
  else reject("can't find route " + route_id);  
  });
  return(p);
}


AssociateService.prototype.getPredictionByRoute = function(route_id, max_time, max_trips, datetime)
{
//  report("11294 getPredictionByRoute " + route_id);
  let rid = route_id;
  let jj = rid.indexOf("NYCT");
  if(jj != -1) rid = rid.substring(jj+5);
  let route = getRoute(route_id);  
//  let t = {};
//  report("11300 " + route.route_id + " " + route.route_name);
  let p1 = new Promise(function(resolve, reject){
      getRealTimeDataA(707, rid).then(function(feed) {
          let dn = (new Date()).getTime();
//          report("11299 " + dn + " " + JSON.stringify(feed,null, 4));
          let t = {};
          t.mode = [];
          t.mode[0] = {
              route_type: 2,
              mode_name: "Bus",
              route: []
          };
          t.mode[0].route[0] = {
              route_id: route_id,
              route_name: route.route_name,
              direction: []
          };
          t.mode[0].route[0].direction[0] = {
              direction_id: 0,
              direction_name: "",
              trip: []
          };
          let tripa = t.mode[0].route[0].direction[0].trip;
          
          if(feed != null)
          {
            let va = feed.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity;
            let k1 = va.length;
            let i1 = 0;
            for(i1=0; i1<k1; i1++)
            {
              let mvj = va[i1].MonitoredVehicleJourney;
              if(typeof mvj === 'undefined') report("11335 "+ i);
              if(typeof mvj.MonitoredCall !== 'undefined')
              {
              veh_id = mvj.VehicleRef.replace(" ", "_");
              let trip_id = makeMTAtrip_id(route_id,veh_id);
//              let prgstat = mvj.ProgressStatus;
              let mstop = mvj.MonitoredCall.StopPointName;
              let pd = mvj.MonitoredCall.Extensions.Distances.PresentableDistance;
              let status = "";
              if(typeof pd !== 'undefined') status = pd;
              if(typeof mstop !== 'undefined') status += " " + mstop;
//              report("11396 " + trip_id + " " + status);
              
              let tr = {
                  trip_id: trip_id,
                  trip_name: mvj.LineRef + "_" + mvj.VehicleRef,
                  trip_headsign: mvj.DestinationName,
                  status: status,
                  stop: []
              };
              
              let ss = null;
              if((typeof mvj.OnwardCalls !== 'undefined') && (typeof mvj.OnwardCalls.OnwardCall !== 'undefined'))
              {
                let oca = mvj.OnwardCalls.OnwardCall;
                let k3 = oca.length;
                let i3 = 0;
                for(i3 = 0; i3<k3; i3++)
                {
                  let oc = oca[i3];
                  let tsa = getTimefromCTABus(oc.AimedArrivalTime);
                  let tsd = tsa;
                  ss = {
                    stop_sequence: i3 + 1,
                    stop_id: oc.StopPointRef.replace("_",""),
                    stop_name: oc.StopPointName,
                    sch_arr_dt: tsa,
                    sch_dep_dt: tsd,
                  };
                  if(typeof oc.ExpectedArrivalTime !== 'undefined')
                  {
                    let tpa = getTimefromCTABus(oc.ExpectedArrivalTime);
                    let tpd = tpa;
                    ss.pred_arr_dt = tpa;
                    ss.pred_dep_dt = tpd;
                    ss.pred = "true";
                  }
                tr.stop.push(ss);
                }
              }
              tr.pred = "true";
              tripa.push(tr);
              }
            }
          }
          else report("1135 feed is null");
//        report("11360");
//          report("11346 t = " + JSON.stringify(t,null,4));
          resolve(t);
          }).catch(function(e) {
              report("11359 " + e);
              console.trace();
              reject("11317 " + e);  
          });
             
          
      });
  return(p1);
}

AssociateService.prototype.getScheduleByRoutes = function(routes, max_time, max_trips, datetime)
{
  return(this.getScheduleByRoutesStop(routes, max_time, max_trips, datetime, null));
}

//TODO
// multiple routes are comma separated
AssociateService.prototype.getScheduleByRoutesStop = function(routes, max_time, max_trips, datetime, mystop_id)
{
 let bReport = document.getElementById("rp").checked;
// bReport = true;
// if(bReport) report("13422 AS.getScheduleByRoutes " + routes + " " + datetime);
 let p1 = null;
 if((routes == null) || (routes == ""))
 {
   p1 = new Promise(function(resolve, reject){ 
      reject("No routes specified");
   } );
 }
 else
 {
 p1 = new Promise(function(resolve, reject){
 let tc = null;
 if(datetime == null) tc = new Date();
 else tc = new Date(datetime * 1000);
 let tcc = Math.floor(tc.getTime() / 1000);
 //report("datetime = " + tc.toLocaleString());
 let dt = new Date();
 dt.setFullYear(tc.getFullYear());
 dt.setMonth(tc.getMonth());
 dt.setDate(tc.getDate());
 dt.setHours(0);
 dt.setMinutes(0);
 //let day = dt.getDay().toString();
 let d = Math.floor(dt.getTime() / 1000);
 let bHoliday = isHoliday(tc.getMonth(), tc.getDate());
 let ddf = getCDateFromDate(dt);
 //report("ddf = " + ddf);
 let ag = [];
 /*
 if(routes.indexOf("PP0") != -1)
 {
   routes = routes + ", PP10931, PP5991, PP10930, PP5973";  
 }
 */
 if(routes.indexOf(",") != -1)
 {
   ag = routes.split(",");
 }
 else ag[0] = routes;
 let s = "{ \"mode\": [";
 let k0 = ag.length;
 let i0 = 0;
 bReportRecords = false;
// report("12907 ag[0] = " + ag[0]);
 while(i0 < k0)
 {
   let p9 = null;
   if((ag[i0].indexOf("Y") == 0) && !isCarrierLoaded("NJBUS"))
   {
     p9 = checkLoadable("NZ162");   
   }
   else if((ag[i0].indexOf("CTAB") == 0) && !isCarrierLoaded("CTABUS"))
   {
     p9 = checkLoadable("CH1");   
   }
   else if((ag[i0].indexOf("SFB") == 0) && !isCarrierLoaded("SFBUS"))
   {
     p9 = checkLoadable("SFB_4803");   
   }
   else if((ag[i0].indexOf("LAMB") == 0) && !isCarrierLoaded("LABUS"))
   {
     p9 = checkLoadable("LAMB2497");   
   }
   else if((ag[i0].indexOf("RIPT") == 0) && !isCarrierLoaded("RIPT"))
   {
     p9 = checkLoadable("RIPT5");  
   }
   else if((ag[i0].indexOf("DART_") == 0) && !isCarrierLoaded("DART"))
   {
     p9 = checkLoadable("DT_22748");  
   }
   else if((ag[i0].indexOf("MTA") == 0) && !isCarrierLoaded("MTA"))
   {
     p9 = checkLoadable("MTA100040");  
   }
   else if((ag[i0].indexOf("MSL") == 0) && !isCarrierLoaded("MSL"))
   {
     p9 = checkLoadable("MSLB3499");  
   }
   else if((ag[i0].indexOf("WMB") == 0) && !isCarrierLoaded("WMB"))
   {
     p9 = checkLoadable("WMB20414");  
   }
   else if((ag[i0].indexOf("STMB") == 0) && !isCarrierLoaded("STMB"))
   {
     p9 = checkLoadable("STMB_60997");  
   }
    
 //  if(p9 != null) return(null);
 //  report("5715 " + ag[i0]);
   let tr = serviceE.getRouteS(ag[i0]);
   if((tr != null) && ((tr.route_id.indexOf("Y") == 0) || (tr.route_id.indexOf("CTAB") == 0) || (tr.route_id.indexOf("SFB") == 0) || (tr.route_id.indexOf("LAMB") == 0) || (tr.route_id.indexOf("RIPT") == 0)|| (tr.route_id.indexOf("DART_") == 0) ||(tr.route_id.indexOf("MSLB") == 0) || (tr.route_id.indexOf("WMB") == 0)|| (tr.route_id.indexOf("STMB") == 0) || (tr.route_id.indexOf("Z_") == 0)) || (tr.route_id.indexOf("SNCF_") == 0) && (tr.trips.length == 0))
   {
      if((typeof tr.fetched === 'undefined') || ( tr.fetched == false))
      {
        makeTripsForRoute(tr, ddf).catch(function(e) {});         
      }
   }
//   if(tr.route_id.indexOf("CTA_") == 0)
//   {
//     tr = serviceE.getPredictionByStop(   
//   }
   if(tr != null)
   {
    s += '{\"route_type\":\"2\",\"mode_name\":\"Rail\",\"route\": [';
    s += '{\"route_id\":\"' + tr.route_id + '\",\"route_name\":\"' + tr.route_name + '\"';
    if(typeof tr.frequency != 'undefined') s += ',\"frequency\":\"' + tr.frequency + '\"';
    s += ',\"direction\": [ ';
//     report("11936 route " + tr.route_id + " has " + tr.trips.length + " trips");
    let ii = 0;
    for(ii=0; ii <=1; ii++)
    {
     if(ii == 1) s += ",";
     s += '{\"direction_id\":\"' + ii + '\","direction_name":"","trip":[ ';
     let bFirst2 = true;
     let k3 = tr.trips.length;
//     let xcount = 0;
     let i3 = 0;
     while(i3 < k3)
     {
 /*      if(i3 == 0){
           tr.trips[0].parent = null;
          report(JSON.stringify(tr.trips[0], null, 4));
       }
       */
       let tx = tr.trips[i3];
       let bFirst = true;
//       let dateOK = (((tx.getDays().toString().indexOf(day) != -1) && !(tr.bUseHolidays && bHoliday)) || (bHoliday && (tx.getDays().toString().indexOf("8") != -1)));
       let dateOK = isDateOK2(tr, tx, ddf);
//       if(dateOK) report("5166 dateOK = " + dateOK + " " + tx.direction + " " + ii + " " + ddf + " " + tx.service_id);
//       if(i3 == 0) 
//       {
//           tx.parent = null;
//           report(JSON.stringify(tx, null, 4));
//       }
       if((tx.direction == ii) && dateOK)
       {
                if(bFirst2) bFirst2 = false;
                else s += ", ";
 //                 xcount += 1;
                s += '{\"trip_id\":\"' + tx.trip_id + '\",\"trip_name\":\"' + tx.trip_name + '\",\"trip_headsign\":\"' + tx.headsign + '\",\"stop\":[';
                let stopids = tr.stop_ids;
                let k2 = tr.stop_ids.length;
                let i2 = 0;
                let ss = 1;
                let sx = tx.comp;
                if((typeof sx !== 'undefined') && (sx != null) && (sx.length > 0))
                {
//                    report("10974 comp " + sx.length + " " + tx.trip_id);
                  k2 = sx.length;
                  i2 = 0;
                  for(i2 = 0;i2 < k2; i2++)
                  {
                    let ce = sx[i2];
                    let stopid = ce.stop_id;
                    if(typeof stopid === 'undefined') stopid = ce.s;
                    let stopname = getStopNameFromID(stopid);
                    let ta = "";
                    if(typeof ce.tsa !== 'undefined') ta = ce.tsa;
                    else if(typeof ce.a !== 'undefined') ta = ce.a;
                    let td = "";
                    if(typeof ce.tsd !== 'undefined') td = ce.tsd;
                    else if(typeof ce.d !== 'undefined') td = ce.d;
                    if(ta == "") ta = td;
 //                   report("13581 ta = " + ta + " td = " + td);
                    let tzfactor = 0;
                    if((tr != null) && (tr.cal != null) && (stopid.indexOf("Z_") != 0)) tzfactor = getTimeZFactor(stopid, tr);  //getTzFactor(getTZforStop(stopid), tr.cal.gtfstz);
                    let kg = ta.indexOf(":");
                    let sth = ta.substring(0, kg);
                    let stm = ta.substring(kg+1);
                    kg = stm.indexOf(":");
                    if(kg != -1) stm = stm.substring(0, kg);
                    ta = d + 3600 * sth + 60 * stm;   
                    kg = td.indexOf(":");
                    sth = td.substring(0, kg);
                    stm = td.substring(kg+1);
                    kg = stm.indexOf(":");
                    if(kg != -1) stm = stm.substring(0, kg);
 //                       report("10993 " + d + " " + sth + " " + stm);
                    td = d + 3600 * sth + 60 * stm;   
                    if(td > 0) td = Number(td) + tzfactor;
                    if(ta > 0) ta = Number(ta) + tzfactor;
//report(ta + " " + td + " " + tzfactor);
                    if(i2 != 0) s += ", ";
                    s += '{\"stop_sequence\":\"' + ss + '\",\"stop_id\":\"' + stopid + '\",\"stop_name\":\"' + stopname + '\",\"sch_arr_dt\":\"' + ta + '\",\"sch_dep_dt\":\"' + td + '\"}';
                    ss += 1;
                  }
                }
                else
                {
                sx = tx.times;
                report("11009 times " + tx.times.length + " " + tx.trip_id);
                if(tx.direction == 1)
                {
                  let bAlt = false;
                  if((k2 == 0) && (typeof tr.stop_ids1 !== 'undefined')) 
                  {
                      stopids = tr.stop_ids1;
                      k2 = stopids.length;
                      bAlt = true;
                  }
                  let iii = k2 - 1;
                  i2 = 0;
                  while(i2 < k2) 
                  {
                    let stx = tx.times[i2];
                    if(typeof stx !== 'undefined')
                    {
                    let st = stx;
                    let sta = "";
                    let ix = stx.indexOf("/");
                    if(ix != -1)
                    {
                      st = stx.substring(ix+1);
                      sta = stx.substring(0, ix);
                    }
                    if(typeof st === 'undefined') report("1 st undefined " + tx.trip_id + " " + i2);
                    let kg = st.indexOf("+");
                    if(kg != -1) st = st.substring(0, kg);
                    kg = st.indexOf(":");
                    let sth = st.substring(0, kg);
                    let stm = st.substring(kg+1);
                    if(mystop_id != null)
                    {
                      if(((mystop_id == stopids[iii]) && !bAlt) || ((mystop_id == stopids[i2]) && bAlt))
                      {
                        tcc -= (60 * stm);    
                      }
                    }
                    let td = d + 3600 * sth + 60 * stm;
                    if(sth == "-2")
                    {
                      td = tcc + 60 * stm;
                    }
 //                   report(" sth = " + sth + " td = " + td);
                    let ta = td;
                    if(sta != "")
                    {
                      kg = sta.indexOf(":");
                      sth = sta.substring(0, kg);
                      stm = sta.substring(kg+1);
                      ta = d + 3600 * sth + 60 * stm;   
                    }
                    let stopid = stopids[iii];
                    if(bAlt) stopid = stopids[i2];
                    let stopname = getStopNameFromID(stopid);
                    if(sx[i2] != "-1")
                    {
                     if(bFirst) bFirst = false;
                     else s += ",";
                  
                     let tzfactor = 0;
                     if((tr != null) && (tr.cal != null) && (stopid.indexOf("Z_") != 0)) tzfactor = getTimeZFactor(stopid, tr); //   getTzFactor(getTZforStop(stopid), tr.cal.gtfstz);
                     if(td > 0) td = Number(td) + tzfactor;
                     if(ta > 0) ta = Number(ta) + tzfactor;

                     s += '{\"stop_sequence\":\"' + ss + '\",\"stop_id\":\"' + stopid + '\",\"stop_name\":\"' + stopname + '\",\"sch_arr_dt\":\"' + ta + '\",\"sch_dep_dt\":\"' + td + '\"}';
                      ss += 1;
                    }
                    }
                    iii -= 1;  
                    i2 += 1;
                  }
                }
                else
                {
                  if((k2 == 0) && (typeof tr.stop_ids0 !== 'undefined')) 
                  {
                      stopids = tr.stop_ids0;
                      k2 = stopids.length;
                  }
                  i2 = 0;
                  while(i2 < k2)
                  {
                    let stx = tx.times[i2];
                    if(typeof stx !== 'undefined')
                    {
                    let st = stx;
                    let sta = "";
                    let ix = stx.indexOf("/");
                    if(ix != -1)
                    {
                      st = stx.substring(ix+1);
                      sta = stx.substring(0, ix);
                    }
                   if(typeof st === 'undefined') report("2 st undefined " + tx.trip_id + " " + i2);
                    let kg = st.indexOf("+");
                    if(kg != -1) st = st.substring(0, kg);
                    kg = st.indexOf(":");
                    let sth = st.substring(0, kg);
                    let stm = st.substring(kg+1);
                    if(mystop_id != null)
                    {
                      if(mystop_id == stopids[i2])
                      {
                        tcc -= (60 * stm);    
                      }
                    }
                    let td = d + 3600 * sth + 60 * stm;
                    if(sth == "-2")
                    {
                      td = tcc + 60 * stm;
                    }
 //                   report(" sth = " + sth + " td = " + td);
                    let ta = td;
                    if(sta != "")
                    {
                      kg = sta.indexOf(":");
                      sth = sta.substring(0, kg);
                      stm = sta.substring(kg+1);
                      ta = d + 3600 * sth + 60 * stm;   
                    }
                   let stopid = stopids[i2];
                    let stopname = getStopNameFromID(stopid);
                    if(sx[i2] != "-1")
                    {
                      let tzfactor = 0;
                      if((tr != null) && (tr.cal != null) && (stopid.indexOf("Z_") != 0) ) tzfactor = getTimeZFactor(stopid, tr);   //getTzFactor(getTZforStop(stopid), tr.cal.gtfstz);
                      if(td > 0) td = Number(td) + tzfactor;
                      if(ta > 0) ta = Number(ta) + tzfactor;
                        
                      if(bFirst) bFirst = false;
                      else s += ",";
                      s += '{\"stop_sequence\":\"' + ss + '\",\"stop_id\":\"' + stopid + '\",\"stop_name\":\"' + stopname + '\",\"sch_arr_dt\":\"' + ta + '\",\"sch_dep_dt\":\"' + td + '\"}';
                      ss += 1;
                    }
                    }
                    i2 += 1;
                  }
                }
                
                }
                s += "]}"; // end of stop end of trip
       }
       i3 += 1; 
     }
//     report("xcount = " + xcount);
                  let iii = k2 - 1;
                  i2 = 0;
     s += "]}"; // end of trips
    }
    s += "]} " //end of direction
    s += "] }"; // end of route 
   }
   i0 += 1; 
 }
 bReportRecords = true;
 s += "]}"; // end of mode
// if(bReport)  
// console.log("11167 ::\n" + s + "\n::\n");
 let t = JSON.parse(s);
 resolve(t);
 });
 
 }
 return(p1);
}

//TODO
AssociateService.prototype.getVehiclesByRoutes = function(route_id)
{
 let bReport = document.getElementById("rp").checked;
// report("13210 getVehiclesByRoutes " + route_id);
 let p1 = null;
 if((route_id == null) || (route_id == ""))
 {
   p1 = new Promise(function(resolve, reject){
      reject("No routes specified");
   } );
 }
 else if(route_id.indexOf("LAMB") == 0)
 {
   p1 = new Promise(function(resolve, reject){
        let p2 = serviceEO.getLAMVehicleData();
        p2.then(function(fd) {
          let rix = route_id.substring(4);
          let feed = null;
          let t = new Object();
          t.mode = [];
          let mi = new Object();
          t.mode.push(mi);
          mi.route_type = "3";
          mi.mode_name = "Bus";
          mi.route = [];
          let ri = new Object();
          mi.route.push(ri);
          ri.route_name = "";
          let trip_name = "";
          let trip_headsign = "";
          let trou = serviceE.getRouteS(route_id);
          if(trou != null)
          {
            ri.route_name = trou.route_name; 
            trip_name = trou.route_name;
          }
          ri.dir = [];
          let dd = new Object();
          ri.push(dd);
          dd.direction_id = 0;
          dd.direction_name = "";
          dd.trip = [];
          if(fd != null)
          {
            try{
              feed = JSON.parse(fd);
            }
            catch(e) {
              report(e + "\n" + fd);
              reject(e);
            };
            
 //            clearReport();
            if(bReport)report("feed =\n" + JSON.stringify(feed, null, 4));
            let k = feed.items.length;
            let i = 0;
            for(i = 0; i < k; i++)
            {
              let fi = feed.items[i];
              if((fi.route_id == rix) && (fi.predictable == "true"))
              {
                let tip = new Object();
                dd.trip.push(tip);
                tip.trip_id = "LAMB" + rix + "_" + i;
                tip.trip_name =  "\"" + trip_name + "_" + i + "\"";
                tip.trip_headsign = trip_headsign;
                let vh = new Object();
                tip.vehicle = vh;
                vh.vehicle_id = "\"" + fi.id + "\"";
                vh.vehicle_lat = "\"" + fi.latitude + "\"";
                vh.vehicle_lon = "\"" + fi.longitude + "\"";
                vh.vehicle_bearing = "\"" + fi.heading + "\"";
                let ts = Math.round(NOW/1000) + Number(fi.seconds_since_report);
                vh.vehicle_timestamp = "\"" + ts  + "\"";
                vh.vehicle_label = "\"" + fi.id + "\"";
                vh.status = "";
                vh.stop_id = "";
              }
            }
          }
        resolve(t);             
        }).catch(function(e) {
            reject(e);
        });
   });
 }
 else if(route_id.indexOf("CTAB") == 0)
 {
   p1 = new Promise(function(resolve, reject){
       if(CurrentVehicleId != null)
       {
        let p2 = serviceEO.getCTABusVeh(CurrentVehicleId);
        p2.then(function(fd) {
          let rix = route_id.substring(4);
          let feed = null;
          let t = new Object();
          t.mode = [];
          let mi = new Object();
          t.mode.push(mi);
          mi.route_type = "3";
          mi.mode_name = "Bus";
          mi.route = [];
          let ri = new Object();
          mi.route.push(ri);
          ri.route_name = "";
          let trip_name = "";
          let trip_headsign = "";
          let trou = serviceE.getRouteS(route_id);
          if(trou != null)
          {
            ri.route_name = trou.route_name; 
            trip_name = trou.route_name;
          }
          ri.dir = [];
          let dd = new Object();
          ri.push(dd);
          dd.direction_id = 0;
          dd.direction_name = "";
          dd.trip = [];
          if(fd != null)
          {
            let jj = fd.indexOf(":");
            let ss = "{ \"x\"" + fd.substring(jj);
            feed = JSON.parse(ss);

 //            clearReport();
            if(bReport)report("feed =\n" + JSON.stringify(feed, null, 4));
            let k = feed.vehicle.length;
            let i = 0;
            for(i = 0; i < k; i++)
            {
              let fi = feed.vehicle[i];
              if(fi.rt == rix) 
              {
                let tip = new Object();
                dd.trip.push(tip);
                tip.trip_id = "CTAB" + rix + "_" + i;
                tip.trip_name =  "\"Bus " + fi.rt + "_" + i + "\"";
                tip.trip_headsign = fi.des;
                let vh = new Object();
                tip.vehicle = vh;
                vh.vehicle_id = "\"" + fi.id + "\"";
                vh.vehicle_lat = "\"" + fi.lat + "\"";
                vh.vehicle_lon = "\"" + fi.lon + "\"";
                vh.vehicle_bearing = "\"" + fi.hdg + "\"";
                vh.vehicle_timestamp = "\"" + tmstmp  + "\"";
                vh.vehicle_label = "\"" + fi.vid + "\"";
                vh.status = "";
                if(fi.dly) vh.status = "\"DELAYED\"";
                vh.stop_id = "";
              }
            }
          }
        resolve(t); 
        }).catch(function(e) {
            reject(e);
        });
       }
       else reject("6431 no vehid");
   });
 }
 else if(route_id.indexOf("AMR") == 0)
 {
   p1 = new Promise(function(resolve, reject){
   if((SUB[20] != null) && (typeof SUB[20].header !== 'undefined'))
   {
     let ctime = getPBTime(SUB[20].header.timestamp);
     let dtime = getTTime();
     if((dtime - ctime) > 900)
     {
       queueSUB(20);
     }
   }
   else queueSUB(20);
   
   let feed = SUB[20];
   if(feed != null)
   {
     let kk = feed.entity.length;
     let ii = 0;
     let rid = route_id.substring(3);
     let t = new Object();
     t.mode = [];
     let mi = new Object();
     t.mode.push(mi);
     mi.route_type = "2";
     mi.mode_name = "Train";
     mi.route = [];
     let ri = new Object();
     mi.route.push(ri);
     ri.route_name = "";
     let trip_name = "";
     let trip_headsign = "";
     let trou = serviceE.getRouteS(route_id);
     if(trou != null)
     {
       ri.route_name = trou.route_name; 
       trip_name = trou.route_name;
     }
     ri.dir = [];
     let i = 0;
     for(i=0; i<2; i++)
     {
       let dd = new Object();
       ri.dir.push(dd);
       dd.direction_id = i;
       dd.direction_name = "";
       dd.trip = [];
     }
     for(ii = 0; ii < kk; ii++)
     {
       let f1 = feed.entity[ii];
       if(f1.vehicle != null)
       {
         if(rid ==  f1.vehicle.trip.route_id)
         {
           let fi = f1.vehicle;
           let tip = new Object();
           ri.dir[f1.vehicle.trip.direction_id].trip.push(tip);
           tip.trip_id = "AMR" + fi.trip.trip_id;
           tip.trip_name =  trip_name;
//           tip.trip_headsign = ;
           let vh = new Object();
           tip.vehicle = vh;
           vh.vehicle_id = "\"" + fi.vehicle.id + "\"";
           vh.vehicle_lat = "\"" + fi.position.latitude + "\"";
           vh.vehicle_lon = "\"" + fi.position.longitude + "\"";
           vh.vehicle_bearing = "\"" + fi.position.bearing + "\"";
           vh.vehicle_timestamp = "\"" + getPBTime(fi.timestamp)  + "\"";
           vh.vehicle_label = "\"\"";
           vh.status = "\"" + fi.current_status + "\"";
           vh.stop_id = "\"" + "AMS" + fi.stop_id + "\"";
           
         }
       }
     }
     resolve(t);
   }
   else reject("9076 SUB[20] is null");
   });
 }
 else
 {
   p1 = new Promise(function(resolve, reject){
      let activetrips = [];
      let dnow = new Date(NOW);
      let mm = dnow.getMinutes();
      if(mm < 10) mm = "0" + mm;
      let hh = dnow.getHours();
      let trou = serviceE.getRouteS(route_id);
      if(trou != null)
      {
        let trips = trou.trips;
        let k = trips.length;
        let i = 0;
        while(i < k)
        {
          let b1 = false;
          let b2 = false;
          let trip = trips[i];
          let k2 = trip.stop_times.length;
          let i2 = 0;
          while(i2 < k2)
          {
            let s = trip.stop_times[i2];
            if(s.indexOf("-") != -1) ;
            else if(s.indexOf("+") != -1) ;
            else
            {
              let j = s.indexOf(":");
              if(j != -1)
              {
                let h = Number(s.substring(0, j));
                let m = Number(s.substring(j+1));
                if(h < hh) b1 = true;
                else if(h == hh)
                {
                  if(m <= mm) b1 = true;   
                }
                if(h > hh) b2 = true;
                else if(h == hh)
                {
                  if(m >= mm) b2 = true;   
                }
              }
            }
            i2 += 1;
          }
          if(b1 && b2) activetrips.push(trip);
          i += 1;
        }
        
        let t = new Object();
        t.mode = [];
        let route = [];
        tmode.push(route);
        let dir = [];
        let k3 = 2;
        let i3 = 0;
        while(i3 < k3)
        {
          let k4 = trips.length;
          let i4 = 0;
          while(i4 < k4)
          {
            i4 +=1;   
          }
          i3 += 1;   
        }
        resolve(t);
      }
      else reject("no trips for route " + route_id);
    } );
 }
 return(p1);
}

function TCalendar()
{
  // service_id, sindex, start_date, end_date, adds, dels
//  this.services = [];
  this.lastUpdated = "";
  this.feedInfo = "";
  this.gtfstz = "EasternTime";
  this.calservices = [];
  this.getService = function(id) {
      let b = true;
      let r = null;
      let k = this.calservices.length;
      let i = 0
      while(b && (i < k))
      {
        if(id == this.calservices[i].service_id)
        {
          b = false
          r = this.calservices[i];
        }
        i += 1;
      }
      return(r);
      };
  this.getServices = function() {
      return(this.calservices); 
      };
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

TCalendar.prototype.addService = function(service_id, start_date, end_date, adds, dels)
{
    /*
  this.services[this.services.length] = service_id;
  this.services[this.services.length] = "SI_" + Math.round(this.services.length /6);
  this.services[this.services.length] = start_date;   
  this.services[this.services.length] = end_date;   
  this.services[this.services.length] = adds;
  this.services[this.services.length] = dels;  
  */
  this.addServiceDays(service_id, "", start_date, end_date, adds, dels);
}

TCalendar.prototype.addServiceDays = function(service_id, days, start_date, end_date, adds, dels)
{
  let calserv = new ServiceCalendar(service_id, days, start_date, end_date, adds, dels);
  this.calservices.push(calserv);
}

let bReportOnce = true;
/** service_id eith service_id or sindex
 *  date is a string yyyymmdd
 *  mode 0 is in valid range
 *  mode 1 is Added
 *  mode 2 is deleted
 */
TCalendar.prototype.isValidDate = function(service_id, date, mode)
{
// report("10336 isValidDate " + service_id + " " + date + " " + this.calservices.length + " " + mode);
  let r = false;
  let i = 0;
  let svc = null;
  let s = service_id;
  if(typeof s === 'undefined') {report("isValidDate service_id undefined");return(r);}
  if(isNaN(s) &&(s.indexOf("SI_") == 0)) s = s.substring(3);
  let a = this.calservices;
  let k = a.length;
  if(k > 0)
  {
    let b = true;
    while(b && (i < k))
    {
      let x = a[i].service_id;
 //     report(x + " " + service_id);
      if((s == x) || (service_id == x)) 
      {
        b = false;
        svc = a[i];
      }
      else i += 1;
    }
    
    let md = mode;
    let bnodays = true;
    let bnoadds = true;
    if(!b)
    {
      bnodays = (svc.days == "");
      bnoadds = (svc.adds.length == 0);
      if(bnodays) md = 0;
    }
//    if((service_id == "NJS3")) report("svcid3 " +service_id + " " +  bnodays + " " + md + " " + svc.adds + " " + b + " " + svc.start_date + " " + svc.end_date + " " + date);
    if(b) {report("no service found for " + service_id); r = false;}
    else if(md == 0) // days is defined in trip
    {
      let dff = Number(date);
      if((typeof svc.start_date !== 'undefined') && (typeof svc.end_date !== 'undefined'))
      {
        let startd = Number(svc.start_date);
        let endd = Number(svc.end_date);
        if((dff >= startd) && (dff <= endd)) r = true;
//          report("3761 " + r);
      }
      
      if(r)
      {
        if((typeof svc.dels === 'undefined') && bReportOnce) 
        {
          report("isValidDate dels is undefined for " + service_id + " " + date + " " + mode + " " + k);
          bReportOnce = false;
        }
        else if(svc.dels.indexOf(date) != -1) r = false;
        
        if(r && (typeof svc.adds !== 'undefined') && (typeof svc.adds === "string"))
        {
          if(!bnoadds && bnodays)
          {
              if(svc.adds.indexOf(date) != -1) r = true;
              else r = false;
          }
        }
        
        if(r && !bnodays)
        {
          date = date.toString();
          let dt = new Date();
          let y = date.substring(0,4);
          let m = Number(date.substring(4,6)) - 1;
          let c = date.substring(6);
          dt.setFullYear(y);
          dt.setMonth(Number(m));
          dt.setDate(Number(c));
        
          let day = dt.getDay().toString();
          if(svc.days.toString().indexOf(day) != -1) r = true;
          else r = false;
//        report(" 3811 " + y + " " + m + " " + c + " " + day + " " + svc.days + " " + r);
 //          report("3761 " + r);
           
        }
        if((typeof svc.adds !== 'undefined'))
        {
//          if(!bnoadds && bnodays)
          if(!bnoadds && !r)  // changemade for SFMTA2
          {
              if(svc.adds.indexOf(date) != -1) r = true;
              else r = false;
          }
        }
        
        
        
        if((typeof svc.dels !== 'undefined') && svc.dels.indexOf(date) != -1) r = false;
      }
    }
    
    
    else if(mode == 2)
    {
      r = true;
      if(r && (typeof svc.dels !== 'undefined'))
      {
        if(svc.dels.length > 3)
        {
          if(svc.dels.indexOf(date) != -1) r = false;
        }
      }
    }
    else if(mode == 1)
    {
      r = false;
      if(!r && (typeof svc.adds !== 'undefined'))
      {
        if(svc.adds.length > 3)
        {
          if(svc.adds.indexOf(date) != -1) r = true;
        }
      }
    }
    /*
    else if((mode == 3) || (mode == 0))// no days
    {
      r = false;
      let dff = Number(date);
      if((typeof (svc.start_date) !== 'undefined') && (typeof (svc.end_date) !== 'undefined'))
      {
        let startd = Number(svc.start_date);
        let endd = Number(svc.end_date);
        if((dff >= startd) && (dff <= endd)) r = true;
      }
    
      if((typeof svc.adds === 'undefined') || (typeof svc.dels === 'undefined'))
      {
        if(bReportOnce) report("isValidDate svc.dels is undefined for service " + service_id + " " + date + " " + mode);
        bReportOnce = false;
        r = false;
      }
      else if(r)
      {
//          report("got here 3821 ");
        if(svc.dels.indexOf(date) != -1) r = false;
        else if(svc.adds.indexOf(date) != -1) r = true;
        else r = false;
      }
      
      if(r && (svc.days != ""))
      {
        date = date.toString();
        let dt = new Date();
        let y = date.substring(0,4);
        let m = Number(date.substring(4,6)) - 1;
        let c = date.substring(6);
//        report(" 3823 " + y + " " + m + " " + c);
        dt.setFullYear(y);
        dt.setMonth(Number(m));
        dt.setDate(Number(c));
        
        let day = dt.getDay().toString();
        if(svc.days.toString().indexOf(day) != -1) r = true;
        else r = false;
      }
      else r = false;
    }
    */
    else report("isValidDate illegal mode " + mode);
  }
//  if((service_id == "NJS4")) report("  r = " + r);
  return(r);
}

function checkCalendars(route, ddf)
{
  let nddf = Number(ddf);
  let cal = route.cal;
  let cals = cal.getServices();
  let bc = false;
  let k = cals.length;
  report("13033 checkCalendar " + ddf + " " + k);
  let i = 0;
  for(i=0; i<k; i++)
  {
    let b = false;
    let sc = cals[i];
    if(sc.adds.indexOf(ddf) != -1) 
    {
      b = true;
        
    }
    let s = Number(sc.start_date);
    let e = Number(sc.end_date);
    if(!b && (s != 0) && (nddf >= s) && (nddf <= e))
    {
      if(sc.days != "")
      {
        let sddf = ddf.toString();
        let dt = new Date();
        dt.setYear(sddf.substring(0,4));
        dt.setMonth(Number(sddf.substring(4,6)) - 1);
        dt.setDate(Number(sddf.substring(6)));
        let day = dt.getDay().toString();
        if(sc.days.indexOf(day) != -1)
        {
          b = true;   
        }
          
      }
         
    }
    
    if(sc.dels.indexOf(ddf) != -1)
    {
      b = false;   
    }
    if(b)
    {
      bc = true;
      report("13072 cal " + sc.service_id + " is valid");
    }
    else report("13079 cal " + sc.service_id + " is not valid");
  }
  return(bc);
}

let DefaultCalendar = new TCalendar();

function getRoute(route_id)
{
  let r = null;
  if(isMBTARoute(route_id) || (route_id.indexOf("T_") == 0) || (route_id.indexOf("TB_") != -1))
  {
//     report("12370 " + route_id );
     let rid = getMBTARouteAlt(route_id);
     if(rid == "") rid = route_id;
     r = serviceT.getRoute(rid);
  }
  else
  {
     r = serviceE.getRoute(route_id);  
//     report("12288 " + route_id);
  }
  return(r);
}

function getRouteIdsFromRef(ref, carrier_id)
{
  let r = [];
  let carrier = Carriers.getCarrier(carrier_id);
  if(carrier != null)
  {
    let routes = carrier.routes;
 //   console.log("14242 " + carrier_id + " routes.length = " + routes.length);
    let kk = routes.length;
    let ii = 0;
    for(ii = 0; ii < kk; ii++)
    {
        if(ref == routes[ii].ref)
        {
          r.push(routes[ii].route_id);   
        }
    }
  }
  return(r);
}

function getObjectName(o)
{
  return(Object.keys(o)[0]);  
}

/*
function makeRouteJSFile(route_id)
{
  let r = getRoute(route_id);
  let s = "let " + r.route_id + " = new TRoute(\"" + r.route_id + "\", \"" + r.route_name + "\");\n";
  s += r.route_id + ".common_name = \"" + r.common_name + "\";\n";
  s += r.route_id + ".cal = " + getObjectName(r.cal) + "\";\n";
  if(typeof r.routem !== 'undefined') s += r.route_id + ".routem = \"" + r.routem + "\";\n";
  if(typeof r.multiday !== 'undefined') s += r.route_id + ".multiday = \"" + r.multiday + "\";\n";
  s +=  r.route_id + ".stop_ids = [" + r.stop_ids.toString() + "\"];";
  if((typeof r.stop_ids0 != 'undefined') && (r.stop_ids0.length > 0))
  {
    s +=  r.route_id + ".stop_ids0 = [" + r.stop_ids0.toString() + "\"];";
  }
  if((typeof r.stop_ids2 != 'undefined') && (r.stop_ids1.length > 0))
  {
    s +=  r.route_id + ".stop_ids1 = [" + r.stop_ids1.toString() + "\"];";
  }
  s +=  r.route_id + ".trips = [];\n";
  
  s += "addRouteToService(" + r.route_id + ");\nn";
  
  let i = 0;
  let k = r.trips.length;
  for(i=0; i<k; i++)
  {
    let trip = r.trips[i]; 
    let tid = trip.trip_id;
    s += "let " + tid + " = new TTrip(\"" + tid + "\", \"" + trip.trip_name + "\", \"" + trip.dir + "\", \"" + trip.days + "\");\n";
    s += tid + ".headsign = \"" + trip.headsign + "\";\n";
    s += tid + ".service_id = \"" + trip.service_id + "\";\n";
    s += tid + ".shape_id = \"" + trip.shape_id + "\";\n";
    if(trip.tid !== 'undefined') s += tid + ".tid = \"" + trip.tid + "\";\n";
    s += tid + ".short = \"" + trip.short + "\";\n";
    if((typeof trip.comp !== 'undefined') && (trip.comp.length > 0))
    {
      let k2 = trip.comp.length;
      let i2 = 0;
      s += tid + ".comp = [\n";
      for(i2 = 0; i2 < k2; i2++)
      {
        if(i2 != 0) s += ", ";
        let oj = trip.comp[i2];
        s += "{ stop_id: \"" + oj.stop_id + "\", tsa: \"" + oj.tsa + "\", tsd: \"" + tsd + "\"} ";
      }
      s += "\n];\n";
    }
    if((typeof trip.times !== 'undefined') && (trip.times.length > 0))
    {
      let k2 = trip.times.length;
      let i2 = 0;
      s += tid + ".times = [\n";
      for(i2 = 0; i2 < k2; i2++)
      {
        if(i2 != 0) s += ", ";
        let oj = trip.times[i2];
        s += "\"" + oj + "\"";
      }
      s += "\n];\n";
    }
    
    
    s += r.route_id + ".addTrip(" + tid + ");n\n";
  }
  return(s);
}
*/

function TRoute(route_id, route_name)
{
  this.route_id = route_id;
  this.route_name = route_name;
  this.common_name = "";
  this.stop_ids = [];
  this.stop_names = [];
  this.transfer_stops = getTransferStops(this.route_id);
  this.hubs = [];
  this.trips = [];
  this.bUseHolidays = false;
  this.cal = DefaultCalendar;
  this.servicesForRoute = "";
  this.addTrip = function(ttrip) {
      
       if((this.cal != null) && (ttrip.days != ""))
       {
         let t = ttrip.service_ids;
         if(typeof t !== 'undefined')
         {
           let s = "";
           let k = t.length;
           let i = 0;
           for(i = 0; i<k; i++)
           {
             let sc = this.cal.getService(t[i]);
             if(sc.days != "")
             {
               s += sc.days;   
             }
           }
           ttrip.days = s.toString();
//           report("for " + ttrip.trip_id + " set days to " + s);
         }
       }
//       ttrip.parent = this;
       ttrip.parent_id = this.route_id;
       ttrip.cal = this.cal;       
       this.trips.push(ttrip);
       };
    this.addTripObject = function(tripo) {
       let tt = new TTrip(tripo.trip_id, tripo.trip_name, tripo.direction, tripo.days); 
//       tt.parent = this;
       tt.parent_id = this.route_id;
       tt.cal = this.cal;       
       tt.shape_id = tripo.shape_id;
       tt.service_ids = [];
       tt.service_ids.push(tripo.service_ids[0]);
       if(tripo.tid != "") tt.tid = tripo.tid;
       tt.startcdate = tripo.startcdate;
       this.trips.push(tt);
    };
    this.getValidServicesP = function(dt) {
      let rid = this.route_id;
      let sfr = this.servicesForRoute;
      let that = this;
      let p = new Promise(function(resolve, reject) {
 /*         if((rid.indexOf("LAMB") == 0) && (rid != "LAMB"))
          {
            let m = getRouteR(rid);
//            report("13861 rid = " + rid + " " + m);
            if(m != -1)
            {
              let rt = "LAMB_" + m.replace("-", "_"); 
 //             report("8179 get services for " + rt);
              let p2 = serviceEO.getServicesForRoute(rt, 1).then( function(data){
                 that.servicesForRoute = data;
                 sfr = data;
//                 report("7526 servicesForRoute " + rt + " :" + data + ":" + sfr);
                 let s = [];
                 let cal = that.cal;
                 let scount = 0;
                 if(cal != null)
                 {
                   let services = cal.getServices();
                   let k = services.length;
                   let i = 0;
                   let b = true;
                   while(b && (i < k))
                   {
//              report("12659 service = " + services[i].service_id);
                     if((sfr != "") && (sfr.indexOf(services[i].service_id) != -1))
                     {
                       if(cal.isValidDate(services[i].service_id, dt, 0))
                       {
//              report("12664 valid service = " + services[i].service_id);
                         s.push(services[i]);
                         scount += 1;
//                         b = false;
                       }
                     }
                     i += 1;
                   }
                 }
                 resolve(s);
                 }).catch(function(e) {
                    report("7528 " + e);
                    reject(e);
                    });
            } 
          }
          else */
          {
 //           report("10609 " + dt);
            resolve(that.getValidServices(dt));
          }
      });
      return(p);
      };
    this.getValidServices = function(dt) {
       let s = [];
//       if(this.cal != null) report("10617 getValidServices " + route_id + " " + route_name + " " + this.cal.getServices().length);
//       else report("10619 this.cal = null");
       let cal = this.cal;
       let scount = 0;
       if(cal != null)
       {
         let services = cal.getServices();
         let k = services.length;
         let i = 0;
         while(i < k)
         {
            if((this.servicesForRoute == "") || (this.servicesForRoute.indexOf(services[i].service_id) != -1))
            {
              if(cal.isValidDate(services[i].service_id, dt, 0))
              {
//                report("10632 valid service = " + services[i].service_id);
                s.push(services[i]);
                scount += 1;
              }
//              else report("10636 invalid date " + dt + " for " + services[i].service_id);
            }
            i += 1;
         }
       }
//       report("7070 found " + scount + " services");
       return(s);
      };
    this.getService = function(service_id)
      {
        let s = null;
        let b = true;
        if(cal != null)
        {
          let services = cal.getServices();
          let k = services.length;
          let i = 0;
          while(b && (i < k))
          {
            if(service_id == services[i].service_id)
            {
              b = false;
              s = services[i];
            }
            else i += 1;
          }
        }
        return(s);
      };
//  this.getDays = function(troute) {
//    return(troute.days);  
//  };
  this.getLegs = function(fromid, fromroutes, toid, toroutes, strategies, strategy, lastleg) {
  };
}

TRoute.prototype.getDirection = function(fromid, toid)
{
//    report("getDirection " + fromid + " " + toid);
   let fid = getParentIdFromId(fromid);
   let tid = getParentIdFromId(toid);
//   report("getDirection " + fromid + " " + toid + ", " + fid + " " + tid);
   let dir = -1;
   let i1 = getSIndex(fid, this.stop_ids);
   if(i1 == -1) i1 = getSIndex(fromid, this.stop_names);
   if(i1 == -1) i1 = getSIndex(fromid, R2.stop_names);
   if(i1 == -1) i1 = getSIndex(fid, R2.stop_ids);
   let i2 = getSIndex(tid,this.stop_ids );
   if(i2 == -1) i2 = getSIndex(toid, this.stop_names);
   if(i2 == -1) i2 = getSIndex(toid, R2.stop_names);
   if(i2 == -1) i2 = getSIndex(tid,R2.stop_ids );
   if((i1 != -1) && (i2 != -1))
   {
     if(i1 > i2) dir = 1;
     else dir = 0;
   }
   if(i1 == 0) dir = 0;
   if(i2 == 0) dir = 1;   
//   if(getParentIdFromId(fromid) == getParentIdFromId(toid) ) dir = 1;
//   report("getDirection " + i1 + " " + i2 + " " + dir + " " + getParentIdFromId(fromid) + " " + getParentIdFromId(toid));
   if((dir == -1) && (tid == "place-river"))
   {
      if((fid == "place-north") || (fid == "place-haecl"))  dir = 0;
   }
   return(dir);
}

function getSIndex(s, arr)
{
  let j = -1;
  let k = arr.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
//    report("  " + s + " " + arr[i]);
    if(s == arr[i])
    {
      b = false;
      j = i;
    }
    i += 1;
  }
  return(j);
}

TRoute.prototype.getTTrip = function(trip_id)
{
  let a = this.trips;
//  if(typeof a === 'undefined') report("getTTrip route = " + this.route_id + ", " + trip_id);
  let k = a.length;
  let i = 0;
  let b = false;
  let bLong = false;
  let t = null;
  if(trip_id.length > 7) bLong = true;
//  report("13088 " + k + "  " + bLong + " " + trip_id);
  while(!b && (i < k))
  {
    if(typeof a[i] === 'undefined') report("getTTrip route = " + this.route_id + ", " + trip_id + " " + i + " " + k);
//    if(i == 0) report("13092 " + a[i].trip_id + " " + trip_id);
      
    if(a[i].trip_id == trip_id)
    {
      b = true;
      t = a[i];
    }
    else if(bLong)
    {
      if(a[i].trip_name.indexOf(trip_id) != -1)
      {
       b = true;
       t = a[i];
      }
      else i += 1;
    }
    else i += 1;
  }
//  if(t == null) report("getTTrip " + trip_id + " not found");
  return(t);
}

TRoute.prototype.getStopIndex = function(stop_id, dir)
{
  let d = dir;
  let k = this.stop_ids.length;
  let i = 0;
  let r = -1;
  let b = true;
  let bx = false;
  let pid = getParentIdFromId(stop_id);
  let a = this.stop_ids;
  if((k == 0) && (typeof this.stop_ids0 !== 'undefined') && (d == 0)) 
  {
      a = this.stop_ids0;
      bx = true;
  }
  k = a.length;
  while(b && (i < k))
  {
//      report("=" + i + " " + stop_id + " " + this.stop_ids[i]);
    if((stop_id == a[i]) || (a[i] == pid))
    {
      b = false; 
      r = i;
    }
/*   else 
    {
      let hid = getParentIdFromId(a[i]);
      if(pid == hid)
      {
        b = false;
      }
    } */
    else i += 1;
  }
  
  if(b && (typeof this.stop_ids1 !== 'undefined') && (d == 1))
  {
    a =  this.stop_ids1;
    bx = true;
    k = a.length;
    i = 0;
    while(b && (i < k))
    {
//      report("=" + i + " " + stop_id + " " + this.stop_ids[i]);
      if((stop_id == a[i]) || (a[i] == pid))
      {
        b = false; 
        r = i;
      }
 /*     else 
      {
        let hid = getParentIdFromId(a[i]);
        if(pid == hid)
        {
          b = false;
        }
      } */
      else i += 1;
    }
    
  }
  if((dir == 1) && !bx) r = k - i -1;
  if(b) r = -1;
//  report("13134 r = " + r + " " + stop_id);
//  report("  8561 i = " + i + " r = " + r + " " + stop_id + " " + d + " " + bx + " " + k);
  return(r);
}

function getCDateDiff(a, b)
{
  let adate = a.toString();
  let ayr = Number(adate.substring(0,4));
  let amn = Number(adate.substring(4,6));
  let ady = Number(adate.substring(6));
  let bdate = b.toString();
  let byr = Number(bdate.substring(0,4));
  let bmn = Number(bdate.substring(4,6));
  let bdy = Number(bdate.substring(6));
  
  let da = new Date(ayr, amn -1, ady);
  let db = new Date(byr, bmn -1, bdy);
  let t = da.getTime() - db.getTime();
  let d = t / 86400000;
  d = Math.round(d);
  return(d);
}

function adjustedCdate(cdate, n)
{
  let ddate = cdate.toString();
  let yr = Number(ddate.substring(0,4));
  let mn = Number(ddate.substring(4,6));
  let dy = Number(ddate.substring(6));
  dy += n;
//  report("9113 " + yr + " " + mn + " " + dy); 
  if(dy < 1)
  {
//    report("9115 " + dy);
    if((mn == 10) || (mn == 5) || (mn == 7) || (mn == 12)) 
    {
      dy = 30 + dy;
      mn -= 1;
    }
    else if(mn == 1)
    {
      dy = 31;
      mn = 12;
      yr -= 1;
    }
    else if(mn == 3)
    {
      if(yr%4 == 0)  
      {
        dy = 29 + dy;   
      }
      else dy = 28 + dy;
      mn = 2;
    }
    else
    {
      dy = 31 + dy;
      mn -= 1;
    }
  }
  else if(mn == 2) 
  {
    if((yr%4 == 0) && (dy > 29))
    {
      dy -= 29;
      mn = "03";
    }
    else if(dy > 28)
    {
      dy -= 28;
      mn = "03"
    }
  }
  else if(((mn == 9) || (mn == 4) || (mn == 6) || (mn == 11)) && (dy > 30))
  {
    dy = dy - 30;
    mn += 1;
  }
  else if(dy > 31)
  {
    dy = dy - 31;
    mn += 1;
    if(mn > 12)
    {
      mn = "01";
      yr += 1;
    }
  }
  yr = yr.toString();
  mn = mn.toString();
  if(mn.length == 1) mn = "0" + mn;
  dy = dy.toString();
  if(dy.length == 1) dy = "0" + dy;
  let m = yr + mn + dy;
//  report("8673 " + cdate + " " + n + " " + m);
  return(m);
}

function TTrip(trip_id, trip_name, direction, days)
{
  this.trip_id = trip_id;
  this.trip_name = trip_name;
  let parent = null;
  this.parent_id = null;
  this.direction = direction; // 0 = stop_id order, 1 = reverse order
  this.days = days; // 0 = Sunday
  this.headsign = "";
  this.times = [];
  this.comp = [];
//  this.early_arrival = [];
  this.alerts = "";
  this.service_id = null;
//  this.cal = null;
  this.startcdate = null;
  this.setParent = function(r) {
      parent = r;
      };
  this.getDays = function(){
      let d = this.days;
      if((this.cal != null) && (this.service_id != null))
      {
        let scd = this.cal.getService(this.service_id);
        d += scd.days;
      }
      else if((this.cal != null) && (this.service_ids != null))
      {
        let scd = this.cal.getService(this.service_ids[0]);
        d += scd.days;
      }
//      report("8653  " + this.service_id + " " + d);
      return(d);};
  this.getTripTZ = function() {
      let tz = null;
      if(this.cal != null) tz = this.cal.gtfstz;
      else if((parent != null) && (parent.cal != null)) tz = parent.cal.gtfstz;
      else if(this.parent_id != null)
      {
        parent = serviceE.getRouteS(this.parent_id);
        if((parent != null) && (parent.cal != null)) tz = parent.cal.gtfstz;
      }
      return(tz);
      };
  this.getHeadsign = function() {
     if((this.headsign == "") && (this.parent_id != null))
     {
       if((this.comp.length == 0) && (parent == null) && (this.parent_id != ""))
       {
         parent = serviceE.getRouteS(this.parent_id);
       }
       if((parent != null) && (this.comp.length == 0))
       {
         let k = this.times.length -1;
         let i = -1;
         while( (i == -1) && (k >= 0))
         {
           if(this.times[k] != -1)
           {
             i = k;   
           }
           else k -= 1;
         }
         if(i != -1)
         {
           let x = parent.stop_ids.length;
           if((x > 0) && (k < x))
           {
             let b = true;
             if(this.times[0] > this.times[1]) {b = false; report("reverse direction " + this.trip_id);}
             if(b)
             {
               if(this.direction == 0) this.headsign = parent.stop_names[k];
               else this.headsign = parent.stop_names[x-k-1];
             }
             else
             {
               if(this.direction == 1) this.headsign = parent.stop_names[k];
               else this.headsign = parent.stop_names[x-k-1];
             }
           }
         }
       }
       else if(this.comp.length > 1)
       {
         if(typeof this.comp[0].stopid !== 'undefined')
         this.headsign = getStopNameFromID(this.comp[this.comp.length - 1].stop_id);   
         else if(typeof this.comp[0].s !== 'undefined')
         this.headsign = getStopNameFromID(this.comp[this.comp.length - 1].s);   
       }
     }
     return(this.headsign);
  };
  this.getStartDate = function()
    {
      let d = "";
      if(typeof this.start_date !== 'undefined')
      {
         d = this.start_date; 
      }
      else if((typeof this.cal !== 'undefined') && (this.cal != null))
      {
        if(typeof this.service_id !== 'undefined')
        {
          let svcal = this.cal.getService(this.service_id);
          d = svcal.start_date;
        }
        else if(typeof this.service_ids !== 'undefined')
        {
           report("error 4278 TTrip.getStartDate"); 
        }
                   
      }
      return(d);
    }
  this.getStopDate = function()
    {
      let d = "";
      if(typeof this.stop_date !== 'undefined')
      {
         d = this.stop_date; 
      }
      else if((typeof this.cal !== 'undefined') && (this.cal != null))
      {
        if(typeof this.service_id !== 'undefined')
        {
          let svcal = this.cal.getService(this.service_id);
          d = svcal.end_date;
        }
        else if(typeof this.service_ids !== 'undefined')
        {
           report("error 4315 TTrip.getStartDate"); 
        }
                   
      }
      return(d);
    }
  this.getTripForDay = function(n, cdate, route) {
     let ddate = cdate.toString();
     let newtrip = null;
     
     let sid = this.service_id;
     if((typeof sid !== 'undefined') && (sid == null))
     {
       if(typeof this.service_ids !== 'undefined')
       {
         if( this.service_ids.length > 0)
         {
           sid =  this.service_ids[0];  
         }
       }
     }
     
     let ac = ddate; //adjustedCdate(ddate, 1-n);
 //    report("9304 " + ddate + " " + n + " " + ac);
     let bValidDate = route.cal.isValidDate(sid, adjustedCdate(ddate, 1-n), 0);
 //    report("8828 " + this.trip_id + " " + sid + " " + bValidDate);
     if(bValidDate)
     {
     let newtrip_id = this.trip_id + "_Day_" + n;
     let tx = route.getTTrip(newtrip_id);
     if(tx != null) tx.startcdate = ac;
//     else if(n == 1) ; //newtrip = this;
     else if(n == 0) ;
     else if(isMultidayTrip(this))
     {
       let hrlow = (n-1) * 24;
       let mn = Number(ddate.substring(4,6)) - 1;
       if(mn == -1) mn = 11;
       let nd = new Date(ddate.substring(0,4), mn, ddate.substring(6));
       let tday = nd.getDay().toString();
       let gday = Number(tday) - n + 1;
       if(gday < 0) gday += 7;
       let days = this.getDays();
//       report("6578 " + gday + " " + days + " " + tday + " " + n + " " + ddate);
       if(days.indexOf(gday) != -1)
       {
         newtrip = new TTrip(newtrip_id, this.trip_name +  "_Day_" + n, direction, tday);
         newtrip.headsign = this.headsign;
         newtrip.startcdate = ddate;
         newtrip.days = tday;
         newtrip.service_id = this.service_id;
         if(typeof this.start_date !== 'undefined') newtrip.start_date = this.start_date;
         if(typeof this.end_date !== 'undefined') newtrip.end_date = this.end_date;
         let bstart = false;
         if(this.times.length > 0)
         {
         let times = this.times.slice(); // make a unique copy
         let k = times.length;
//         report("13186 k = " + k);
         let i = 0;
         for(i = 0; i<k; i++)
         {
           let j = -1;
           let zz = -1;
           let te = times[i];
           if((te == "-1") || (te == "") || (!isNaN(te) && (te < 0))) newtrip.times.push(te);
           else if((zz = te.indexOf("/")) != -1)
           {
             j = te.indexOf(":");
             if(j != -1)
             {
               let h = Number(te.substring(0, j));
               if(h >= hrlow)
               {
                 h -= hrlow;
                 let jj =  te.indexOf(":",j+1);
                 if(jj != -1)
                 {
                   let g = Number(te.substring(zz+1, jj));
                   if(g >= hrlow)
                   {
                     g -= hrlow;
                     newtrip.times.push(h.toString() + te.substring(j,zz) + "/" + g.toString() + te.substring(jj));
                     bstart = true;
                   }
                 }
               }
               else newtrip.times.push("-1");
             }
           }
           else if((j = te.indexOf(":")) != -1)
           {
             let h = Number(te.substring(0, j));
             if(h >= hrlow)
             {
                 h -= hrlow;
                 newtrip.times.push(h.toString() + te.substring(j));
                 bstart = true;
             }
             else newtrip.times.push("-1");
           }
           else
           {
             newtrip.times.push(te);   
           }
         }
         }
         else if(this.comp.length > 0)
         {
           let comp = this.comp.slice();
           let comp2 = [];
           let k = comp.length;
           let i = 0;
           for(i = 0; i<k; i++)
           {
             let c = comp[i];
             let cc = new Object();
             cc.s = c.s;
             let bx = false;
             let te = c.a;
             if(typeof te !== 'undefined')
             {
               let j = te.indexOf(":");
               if(j != -1)
               {
                 let h = Number(te.substring(0, j));
                 if(h >= hrlow)
                 {
                   h -= hrlow;
                   cc.a = h.toString() + te.substring(j);
                   bstart = true;
                   bx = true;
                 }
               }
             }
             te = c.d;
             if(typeof te !== 'undefined')
             {
               let j = te.indexOf(":");
               if(j != -1)
               {
                 let h = Number(te.substring(0, j));
                 if(h >= hrlow)
                 {
                   h -= hrlow;
                   cc.d = h.toString() + te.substring(j);
                   bstart = true;
                   bx = true;
                 }
               }
             }
             if(bx) comp2.push(cc);
             
           }
           newtrip.comp = comp2;
         }
         if(!bstart) newtrip = null;
       }
//       if(newtrip != null) report(JSON.stringify(newtrip, null, 4));
     }
     }
     return(newtrip); 
  }
}

function addRouteToTService(troute)
{
 // AddedRoutes[AddedRoutes.length] = troute;
//  if((typeof serviceE !== 'undefined') && (serviceE != null) && (serviceE.routes != null))
  if((typeof serviceT !== 'undefined') && (serviceT != null) && (serviceT.routes != null))
  {
      serviceT.routes.push(troute);
  }
}


TService.prototype = new AssociateService();

TService.prototype.constructor = TService;

function TService()
{
  this.routes = [];
  this.cname = "TService";
  this.getRoute = function(route_id) {
    let r = null;
    let b = true;
    let k = this.routes.length;
    let i = 0;
    while(b && (i < k))
    {
      if(route_id == this.routes[i].route_id)
      {
        b = false;
        r = this.routes[i];
      }
      i += 1;
    }
    return(r);
  };
}

// tbase is a Date
TService.prototype.getScheduleByStop = function(stop_id1, max_time, max_trips, tbase)
{
  let stop_idnew = getNewTstop(stop_id1);
//  report("11340 TService getScheduleByStop " + stop_idnew);
  let bReport = document.getElementById("rp").checked;
  let sid = "";
//  if(stop_idnew.indexOf("place") == 0) sid = getRailStopId(stop_idnew);
//  report("13275 " + stop_id1 + " " + stop_idnew + " " + sid + " " + tbase);
  if(sid != "") stop_idnew = sid;
  
  
  let dt = new Date();
  if(tbase != null)
  {
    dt.setFullYear(tbase.getFullYear());
    dt.setMonth(tbase.getMonth());
    dt.setDate(tbase.getDate());
    dt.setHours(0);
    dt.setMinutes(0);
  }
//  let day = dt.getDay().toString();
  let bHoliday = isHoliday(tbase.getMonth(), tbase.getDate());
  let ddm = (dt.getMonth() + 1);
  ddm = ddm.toString();
  if(ddm.length == 1) ddm = "0" + ddm;
  let ddn = dt.getDate().toString();
  if(ddn.length == 1) ddn = "0" + ddn;
  let ddf = dt.getFullYear().toString() + ddm + ddn;
  ddf = Number(ddf);
//  report("ddf = " + ddf);
  let d = Math.floor(dt.getTime() / 1000);
  let hlimit = tbase.getHours();
  let mlimit = tbase.getMinutes();
//  report("TService.getScheduleByStop " + stop_id + " " + d + " " + max_time + " " + max_trips);
  let p = null;
  let ag = [];
  let routes = getRoutesS(stop_idnew);
//  report("13203 routes " + routes);
  if(routes == "")
  {
    let liy = stop_idnew.lastIndexOf("-");
    routes = getRoutesS(stop_idnew.substring(0,liy));
  }
  bE = true;
  /*
  if(routes.length == 0)
  {
    let prt = getParentIdFromId(stop_idnew)   
  }
  */
//  report("routes = " + routes.toString() + " for " + stop_idnew);
  if(routes.indexOf(",") != -1)
  {
      ag = routes.split(",");
  }
  else ag[0] = routes;
  p = new Promise(function(resolvex, reject){
      let s = "{\"stop_id\": \"" + stop_idnew + "\", \"stop_name\": \"" + getStopNameFromID(stop_idnew) + "\", ";
      s += "\"mode\": [{ \"route_type\": \"2\", \"mode_name\": \"Rail\",\"route\": [";
      let k = ag.length;
//      report("ag.length = " + k);
      let i = 0;
      let brf = true;
      while(i < k)
      {
//        if(ag[i].indexOf("A") == 0)
        if(serviceT.getRouteS(ag[i]) != null)
        {
        if(brf) brf = false;
        else s +=",";
//        report("ag[" + i + "] = " + ag[i]);
        let tr = serviceT.getRouteS(ag[i]);
        let jj = ag[i].indexOf(":");
        if(jj != -1) jj = ag[i].substring(jj + 1);
//                  report("jj = " + jj);
//        report("ag[" + i + "] = " + ag[i] + " " + tr.route_id);
        if(tr != null) s += "{ \"route_id\": \"" + tr.route_id + "\", \"route_name\": \"" + tr.route_name + "\", \"direction\": [";
        else report("TService.getScheduleByStop tr null");
        let dir = 0;
        if(jj != -1) dir = jj;
        while(dir < 2)
        {
//          report("13165 dir = " + dir + " route_id = " + tr.route_id);
          if((dir != 0) && (jj == -1)) s += ",";
          s += "{\"direction_id\": \"" + dir + "\", \"direction_name\": \"\", \"trip\": [ ";
          let index = tr.getStopIndex(stop_idnew, dir);
//          report("a. " + index + " " + stop_id + " " + dir);
          if(index == -1) index = tr.getStopIndex(getParentIdFromId(stop_idnew), dir);
//          report("b. " + index + " " + stop_id + " " + dir);
//          if(index == -1) report("611 index -1 for " + stop_id + " " + tr.route_name + " " + dir);
          let kk = tr.trips.length;
//          report("11420 kk = " + kk + " index = " + index);
          let btrip = false;
          let ii = 0;
          while(ii < kk)
          {
            let a = tr.trips[ii];
            let dateOK = isDateOK2(tr, a, ddf);
//            report("dateOK = " + dateOK + " " + ddf + " " + a.comp.length + " " + a.trip_id);
/*            if(typeof a.times[index] === 'undefined')
            {
              report("TService.getScheduleByStop a.times undefined " + index + " " +  stop_idnew + " " + route_name);  
            }
            */
//            report(JSON.stringify(a.comp, null, 4));
//            report("11432 a.comp.length = " + a.comp.length + " " + dateOK);
            if( dateOK && (a.comp.length > 0))
            {
//                report("13271 " + dir + " " + a.direction)
              if(dir == a.direction)
              {
 //             dir = 2;
              let kg = a.comp.length;
              let ig = 0;
              let bg = true;
              let tsa = "";
              let tsd = "";
              while(bg && (ig < kg))
              {
//                if(ig == 0) report("11444 " + a.comp[ig].stop_id + " " + stop_idnew);
                let sid = "";
                if(typeof a.comp[ig].s !== 'undefined') sid = a.comp[ig].s;
                if(sid == stop_idnew)
                {
                  bg = false; 
                  if(typeof a.comp[ig].a !== 'undefined') 
                  {
                    tsa = a.comp[ig].a;
                    let x = tsa.indexOf(":");
                    let sth = tsa.substring(0, x);
                    let stm = tsa.substring(x+1);
                    tsa = d + 3600 * sth + 60 * stm;
                  }
                  if(typeof a.comp[ig].d !== 'undefined') 
                  {
                    tsd = a.comp[ig].d;
                    let x = tsd.indexOf(":");
                    let sth = tsd.substring(0, x);
                    let stm = tsd.substring(x+1);
                    tsd = d + 3600 * sth + 60 * stm;
                  }
                  if(tsa == "") tsa = tsd;
                  
                }
                else ig += 1;
              }
              if(!bg)
              {
                if(btrip) s += ",";
                btrip = true;
                s += "{\"trip_id\": \"" + a.trip_id + "\", \"trip_name\": \"" + a.trip_name + "\", \"trip_headsign\": \"" + a.headsign + "\", \"tid\": \"" + a.tid + "\", \"sch_arr_dt\": \"" + tsa + "\", \"sch_dep_dt\": \"" + tsd + "\", \"bikes\": \"" + a.bike + "\"}";
              }
              }
            }
//            else if((typeof a.times[index] !== 'undefined') && (a.times[index] != "-1") &&              
            else if((a.times[index] != "-1") && (Number(a.direction) == dir) && dateOK)
            {
//              report("a.times[" + index + "] = " + a.times[index]);
              let st = a.times[index];
              let kg = st.indexOf("+");
              if(kg != -1) st = st.substring(0, kg);
              kg = st.indexOf(":");
              let sth = st.substring(0, kg);
              let stm = st.substring(kg+1);
              let blt = false;
              if(sth == -1)
              {
                let sj = a.start_time;
                let kj = sj.indexOf(":");
                let sjh = sj.substring(0, kj);
                let sjm = sj.substring(kj+1);
                
              }
//              report("> " + sth + " " + hlimit + " " + stm + " " + mlimit);
              if((document.getElementById("spa").checked &&  document.getElementById("sam").checked) || 
                  (((Number(sth) > hlimit) || ( (Number(sth) == hlimit) && (Number(stm) >= mlimit))) && ((Number(sth) < (hlimit + 3)) || document.getElementById("sps").checked || isAmtrak2(stop_id)) || bForceSked ) || 
                  (sth == "-2") )
              {
                if(btrip) s += ",";
                btrip = true;
                let td = -60 *stm;
                if(sth != "-2") td = d + 3600 * sth + 60 * stm;
                let ta = td;
                s += "{\"trip_id\": \"" + a.trip_id + "\", \"trip_name\": \"" + a.trip_name + "\", \"trip_headsign\": \"" + a.headsign + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\"}";
              }
            }
            ii += 1;
          }
          s += "]}"; // end of direction
          dir += 1;
          if(jj != -1) dir = 3;
        }
        s += "]}"; // end of route
        }
        else 
        {
            /*
          let k3 = rds.length;
          let i3 = 0;
          let b3 = true;
          while(i3 < k3)
          {
            if(rds[i3 + 2] == ag[i])
            {
              s += "{ \"route_id\": \"" + rds[i3] + "\", \"route_name\": \"" + rds[i3] + "\", \"direction\": [";
              let dir = rds[i3 + 1];
              bDir = false;
              if(jj != -1) dir = jj;
              while(dir < 2)
              {
                if((dir != 0) && (jj == -1)) s += ",";
                 s += "{\"direction_id\": \"" + dir + "\", \"direction_name\": \"\", \"trip\": [ ";
                s += "{\"trip_id\": \"" + a.trip_id + "\", \"trip_name\": \"" + a.trip_name + "\", \"trip_headsign\": \"" + a.headsign + "\", \"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\"}";
                
              }
            }
          }
          */
//            report("Tservice getRouteS(ag[" + i + "]) " + ag[i] + " is null"); 
            
        }
        i += 1;
      }
      s += "]}]}";
//      report("::\n" + s + "\n::\n"); //bp0
//      if(bReport) report("::\n" + s + "\n::\n"); //bp0
      let t = JSON.parse(s);
      resolvex(t);
    });
  return(p);
}

TService.prototype.getScheduleTemplateByRoute = function(route_id, from_id, to_id, capt,cur_stop_id)
{
  let bReport = document.getElementById("rp").checked;
  if(bReport) report("getScheduleTemplateByRoute " + route_id + " cur_stop_id = " + cur_stop_id + " " + from_id + " " + to_id);
  let rts = this.routes;
  let p = new Promise(function(resolve, reject) {
    let rid = getRouteSForId(route_id);
    if(rid == "") rid = route_id;
 //   report("rid = " + rid);
    if(rid == "G0") rid = "G4";
    let s = "";
    let r = null;
    let b = true;
    let csi = null;
    if(cur_stop_id != null) csi = getParentIdFromId(cur_stop_id);
    let k = rts.length;
    let i = 0;
    while(b && (i < k))
    {
      r = rts[i];
//      report("  " + r.route_id + " " + rid + " " + route_id );
      if((r.route_id == rid) || (r.route_id == route_id))
      {
        b = false;
      }
      i += 1;
    }
    if(!b)
    {
      let dir = null;
      // dir = r.getDirection(from_id, to_id);
      let cx = cur_stop_id;
      if((cx == null) || (cx == "null")) cx = from_id;
//      report("getScheduleTemplateByRoute " + cx + " " + to_id);
      dir = r.getDirection(cx, to_id);
      if(dir != -1)
      {
        let k = r.trips.length;
        let i = 0;
        let bh = true;
        let t = null;
        while(bh && (i < k))
        {
          let t = r.trips[i];
          if(t.direction == dir)
          {
            bh = false
          }
          else i += 1;
        }
        if(!bh)
        {
          let btrip = false;
          t.route = r;
          let jj = capt.indexOf(")");
          let tn = capt;
          if(jj != -1) tn = capt.substring(0, jj+1);
          s = "{\"route_id\": \"" + t.route.route_id + "\", \"route_name\": \"" + t.route.route_name + "\", \"trip_id\": \"" + CurrentTripID + "\", \"trip_name\": \"" + tn + "\", \"direction_id\": \"" + t.direction + "\", \"direction_name\": \"" + t.direction_name + "\", \"stop\": [";
          let kk = t.times.length;
          let ii = 0;
          let ss = 1;
          let toffset = 0;
 //         report("t.direction = " + t.direction);
          if(t.direction == 1)
          {
            let bTrig = false;
            let iii = kk - 1;
            while(ii < kk)
            {
              if(t.times[ii] != "-1")
              {
                let pld = t.route.stop_ids[iii];
                if((typeof pld !== 'undefined') && ((pld == Place_id) || (Place.indexOf(pld) != -1) || (getParentIdFromId(Place_id) == getParentIdFromId(pld))))
                {
                  let st = t.times[ii];
//                  report("t.times[ii] = " + st);
                  let kg = st.indexOf("+");
                  if(kg != -1) st = st.substring(0, kg);
                  kg = st.indexOf(":");
                  let stm = st.substring(kg+1);
                  toffset = stm;
//                  report("t.times[ii] = " + st + " " + stm);
                }
              }
              iii -= 1;
              ii += 1;
            }
//            report("toffset = " + toffset);
            iii = kk - 1;
            ii = 0;
            let bx = true;
            while(bx && (ii < kk))
            {
              if(t.times[ii] != "-1")
              {
                if(btrip) s += ",";
                btrip = true;
                let st = t.times[ii];
                let kg = st.indexOf("+");
                if(kg != -1) st = st.substring(0, kg);
                kg = st.indexOf(":");
                let sth = st.substring(0, kg);
                let stm = st.substring(kg+1);
                if(sth != "-2") stm = Number(sth) * 60 + Number(stm);
//                report("sth = " + sth + " stm = " + stm + " " + t.route.stop_names[iii]);
                let td = -60 * stm;
                /*
                if(sth != "-2") 
                {
                    report("got here 1240");
                    td = d + 3600 * sth + 60 * stm;
                }
                */
                let pld = t.route.stop_ids[iii];
//                report("pld = " + pld + " Place" + Place);
                
                if((typeof pld !== 'undefined') && ((pld == Place_id) || (Place.indexOf(pld) != -1) || (getParentIdFromId(Place_id) == getParentIdFromId(pld))))
                {
                  bTrig = true;
                  toffset = stm;
//                  if(typeof CurrentTp === 'undefined') td = 0;
//                  else 
                      td = CurrentTp;
//                  report("CurrentTp = " + CurrentTp + " stm = " + stm);
                }
                else if((typeof pld !== 'undefined') && (csi == getParentIdFromId(pld)))
                {
                  bTrig = true;
                  td = Number(CurrentTp) + (stm - toffset) * 60;
                }
                else if(!bTrig) td = -2;
                else if(typeof CurrentTp === 'undefined')
                {
                  td = -(Number(stm) - toffset) * 60;  
                }
                else
                {
 //                 report("CurrentTp = " + CurrentTp + " next stm = " + stm + " - offset " + toffset);
                  td = Number(CurrentTp) + (stm - toffset) * 60;   
                }
                let ta = td;
                s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + t.route.stop_ids[iii] + "\", \"stop_name\": \"" + t.route.stop_names[iii] + "\",\"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\"}";
                ss += 1;
//                report("  " + t.route.stop_ids[iii] + " " + to_id);
                if(t.route.stop_ids[iii] == getParentIdFromId(to_id)) bx = false;
//                report("  td = " + td);
              }
            iii -= 1;
            ii += 1;
            }
         }
        else
        {
          let bTrig = false;
          while(ii < kk)
          {
            if(t.times[ii] != "-1")
            {
              let pld = t.route.stop_ids[ii];
              if((typeof pld !== 'undefined') && ((pld == Place_id) || (Place.indexOf(pld) != -1) || (getParentIdFromId(Place_id) == getParentIdFromId(pld))))
              {
                let st = t.times[ii];
                let kg = st.indexOf("+");
                if(kg != -1) st = st.substring(0, kg);
                kg = st.indexOf(":");
                let stm = st.substring(kg+1);
                toffset = stm;
              }
            }
            ii += 1; 
          }
//          report("toffset = " + toffset);
          ii = 0;
          let bx = true;
          while(bx && (ii < kk))
          {
          if(t.times[ii] != "-1")
          {
            if(btrip) s += ",";
            btrip = true;
            let st = t.times[ii];
            let kg = st.indexOf("+");
            if(kg != -1) st = st.substring(0, kg);
            kg = st.indexOf(":");
            let sth = st.substring(0, kg);
            let stm = st.substring(kg+1);
            if(sth != "-2") stm = Number(sth) * 60 + Number(stm);
 //           report("sth = " + sth + " stm = " + stm +  " " + t.route.stop_names[iii]);
            let td = -60 * stm;
            /*
            if(sth != "-2") 
            {
                report("got here 1312");
                td = d + 3600 * sth + 60 * stm;
            }
            */
            let pld = t.route.stop_ids[ii];
//               report("pld = " + pld + " PLace = " + Place);
            if((typeof pld !== 'undefined') && ((pld == Place_id) || (Place.indexOf(pld) != -1) || (getParentIdFromId(Place_id) == getParentIdFromId(pld))))
            {
              bTrig = true;
              td = CurrentTp;
              toffset = stm;
 //                 report("CurrentTp = " + CurrentTp + " stm = " + stm);
            }
            else if((typeof pld !== 'undefined') && (csi == getParentIdFromId(pld)))
            {
              bTrig = true;
              td = Number(CurrentTp) + (stm - toffset) * 60;
            }
            else if(!bTrig) td = -2;
            else if(typeof CurrentTp === 'undefined')
            {
              td = -(Number(stm) - toffset) * 60;  
            }
            else
            {
//                  report(" next stm = " + stm + " - offset " + toffset);
              td = Number(CurrentTp) + (stm - toffset) * 60;   
            }
            let ta = td;
            s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + t.route.stop_ids[ii] + "\", \"stop_name\": \"" + t.route.stop_names[ii] + "\",\"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\"}";
            ss += 1;
            if(t.route.stop_ids[ii] == getParentIdFromId(to_id)) bx = false;
          }
          ii += 1;
          }
        }
        s += "]}";
      if(bReport) report(":\n" + s + "\n:\n");
      let tx = JSON.parse(s);
      resolve(tx);
      }
      else
      {
        reject("getScheduleTemplateByRoute " + route_id + " error");
      }
    }
    else reject("undetermined direction " + from_id + " to " + to_id);
  }
  else reject("can't find route " + route_id);  
  });
  return(p);
}

TService.prototype.getScheduleByTrip = function(trip_id, tbase)
{
//  report("TService.getScheduleByTrip " + trip_id);
  let dt = new Date();
  if(tbase != null)
  {
    dt.setFullYear(tbase.getFullYear());
    dt.setMonth(tbase.getMonth());
    dt.setDate(tbase.getDate());
  }
  dt.setHours(0);
  dt.setMinutes(0);
  let day = dt.getDay().toString();
  let d = Math.floor(dt.getTime() / 1000);
  let b = false;
  let t = null;
  let k = this.routes.length;
  let i = 0;
  while(!b && (i < k))
  {
    let r = this.routes[i];
    t = r.getTTrip(trip_id);
    if(t != null)
    {
      b = true;
      t.route = r;
    }
    i += 1;
  }
//  report("13655 b= " + b );
  let p = new Promise(function(resolve, reject) {
    if(b)
    {
      let s = "{\"route_id\": \"" + t.route.route_id + "\", \"route_name\": \"" + t.route.route_name + "\", \"trip_id\": \"" + t.trip_id + "\", \"trip_name\": \"" + t.trip_name + "\", \"direction_id\": \"" + t.direction + "\", \"direction_name\": \"" + t.direction_name + "\", \"stop\": [";
      let btrip = false;
      let bComp = (t.comp.length > 0);
      if(bComp)
      {
        let tsa = "";
        let tsd = "";
        let ss = 1;
        let kk = t.comp.length;
        let ii = 0;
        for(ii = 0; ii < kk; ii++) // xcvrt
        {
          if(btrip) s += ",";
          btrip = true;
          let sid = "";
          if(typeof t.comp[ii].stop_id !== 'undefined') sid = t.comp[ii].stop_id;
          else if(typeof t.comp[ii].s !== 'undefined') sid = t.comp[ii].s;
          tsa = "";
          if(typeof t.comp[ii].tsa !== 'undefined') tsa = t.comp[ii].tsa;
          else if(typeof t.comp[ii].a !== 'undefined') tsa = t.comp[ii].a;
          if(tsa != "")
          {
            let x = tsa.indexOf(":");
            let sth = tsa.substring(0, x);
            let stm = tsa.substring(x+1);
            tsa = d + 3600 * sth + 60 * stm;
          }
          tsd = "";
          if(typeof t.comp[ii].tsd !== 'undefined') tsd = t.comp[ii].tsd;
          else if(typeof t.comp[ii].d !== 'undefined') tsd= t.comp[ii].d;
          x = tsd.indexOf(":");
          sth = tsd.substring(0, x);
          stm = tsd.substring(x+1);
          tsd = d + 3600 * sth + 60 * stm;
          if(tsa == "") tsa = tsd;
          s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + sid + "\", \"stop_name\": \"" + getStopNameFromID(sid) + "\",\"sch_arr_dt\": \"" + tsa + "\", \"sch_dep_dt\": \"" + tsd + "\"}";
            ss += 1;
        }
       s += "]}";
     }
      else {
      let kk = t.times.length;
      let ii = 0;
      let ss = 1;
      let iii = kk - 1;
      while(ii < kk)
      {
        if(t.times[ii] != "-1")
        {
          if(t.direction == 1) iii = kk - 1 - ii;
          else iii = ii;
          if(btrip) s += ",";
          btrip = true;
          let st = t.times[ii];
          let kg = st.indexOf("+");
          if(kg != -1) st = st.substring(0, kg);
          kg = st.indexOf(":");
          let sth = st.substring(0, kg);
          let stm = st.substring(kg+1);
          let td = -60 * stm;
          if(sth != "-2") td = d + 3600 * sth + 60 * stm;
          let ta = td;
          s += "{\"stop_sequence\": \"" + ss + "\", \"stop_id\": \"" + t.route.stop_ids[iii] + "\", \"stop_name\": \"" + t.route.stop_names[iii] + "\",\"sch_arr_dt\": \"" + ta + "\", \"sch_dep_dt\": \"" + td + "\"}";
            ss += 1;
        }
        iii -= 1;
        ii += 1;
       }
      s += "]}";
      }
//      report(":\n" + s + "\n:\n");
      let tx = JSON.parse(s);
      resolve(tx);
    }
    else
    {
      reject("TService.getScheduleByTrip trip not found.");
    }
  });
  return(p);
}

TService.prototype.getScheduleByRoutes = function(routes, max_time, max_trips, datetime)
{
  return(this.getScheduleByRoutesStop(routes, max_time, max_trips, datetime, null));    
}

TService.prototype.getScheduleByRoutesStop = function(routes, max_time, max_trips, datetime, mystop_id)
{
report("T.getScheduleByRoutes " + routes);
 let p1 = null;
 if((routes == null) || (routes == ""))
 {
   p1 = new Promise(function(resolve, reject){ 
      reject("No routes specified");
   } );
 }
 else
 {
 report("routes length = " + routes.length + " " +  routes);
 p1 = new Promise(function(resolve, reject){
     
// let tc = new Date(datetime * 1000);
  let tc = datetime;
  let tcc = Math.floor(tc.getTime() / 1000);
 report("datetime = " + tc.toLocaleString());
  let dt = new Date();
  dt.setFullYear(tc.getFullYear());
  dt.setMonth(tc.getMonth());
  dt.setDate(tc.getDate());
  dt.setHours(0);
  dt.setMinutes(0);
  let day = dt.getDay().toString();
  let d = Math.floor(dt.getTime() / 1000);
  let bHoliday = isHoliday(tc.getMonth(), tc.getDate());
  let ddm = (dt.getMonth() + 1);
  ddm = ddm.toString();
  if(ddm.length == 1) ddm = "0" + ddm;
  let ddn = dt.getDate().toString();
  if(ddn.length == 1) ddn = "0" + ddn;
  let ddf = dt.getFullYear().toString() + ddm + ddn;
  ddf = Number(ddf);
 
 let ag = [];
 if(routes.indexOf(",") != -1)
 {
   ag = routes.split(",");
 }
 else ag[0] = routes;
                  
 let k9 = ag.length;
 let i9 = 0;
 let agg = [];
 while(i9 < k9)
 {
   let sid = getRoutesSForId(ag[i9]);
//   report("sid = " + sid + " ag[" + i9 + "] = " + ag[i9]);
   if(sid.indexOf(",") != -1)
   {
     agg = agg.concat(sid.split(","));   
   }
   else agg[agg.length] = sid;
   i9 += 1;
 }
 
 let s = "{ \"mode\": [";
 let k0 = agg.length;
// report("agg.length = " + k0);
 let i0 = 0;
 while(i0 < k0)
 {
   let sid = agg[i0];
//   report("sid = " + sid + " id = " + agg[i0]);
   let tr = serviceT.getRouteS(sid);
//   report(i0 + " " + agg[i0] + " " + tr);
   if(tr != null)
   {
    if(i0 != 0) s += ", ";
    s += '{\"route_type\":\"2\",\"mode_name\":\"Rail\",\"route\": [';
    s += '{\"route_id\":\"' + tr.route_id + '\",\"route_name\":\"' + tr.route_name + '\",\"direction\": [ ';
    let ii = 0;
    for(ii=0; ii <=1; ii++)
    {
     if(ii == 1) s += ",";
     s += '{\"direction_id\":\"' + ii + '\","direction_name":"","trip":[ ';
     let bFirst2 = true;
     let k3 = tr.trips.length;
     let i3 = 0;
     while(i3 < k3)
     {
       let tx = tr.trips[i3];
       let bFirst = true;
       let dateOK = (((tx.getDays().toString().indexOf(day) != -1) && !(tr.bUseHolidays && bHoliday)) || (bHoliday && (tx.getDays().toString().indexOf("8") != -1)));
       if(typeof tx.cal !== 'undefined')
       {
         if(dateOK)
         {
           dateOK = tx.cal.isValidDate(tx.service_id, ddf, 0); // in range
         }
         if(!dateOK)
         {
           dateOK = tx.cal.isValidDate(tx.service_id, ddf, 1); // added  
         }
         if(dateOK)
         {
           dateOK = tx.cal.isValidDate(tx.service_id, ddf, 2); // deleted   
         }
       }
       if((tx.direction == ii) && dateOK)
       {
                if(bFirst2) bFirst2 = false;
                else s += ", ";
                s += '{\"trip_id\":\"' + tx.trip_id + '\",\"trip_name\":\"' + tx.trip_name + '\",\"trip_headsign\":\"' + tx.headsign + '\",\"stop\":[';
                let k2 = tr.stop_ids.length;
                let i2 = 0;
                let ss = 1;
                let sx = tx.times;
                if(tx.direction == 1)
                {
                  let iii = k2 - 1;
                  i2 = 0;
                  while(i2 < k2) 
                  {
                    let st = tx.times[i2];
                    let kg = st.indexOf("+");
                    if(kg != -1) st = st.substring(0, kg);
                    kg = st.indexOf(":");
                    let sth = st.substring(0, kg);
                    let stm = st.substring(kg+1);
                    let td = d + 3600 * sth + 60 * stm;
                    if(sth == "-2")
                    {
                      td = tcc + 60 * stm;
                        
                    }
                    let ta = td;
                    if(sx[i2] != "-1")
                    {
                     if(bFirst) bFirst = false;
                     else s += ",";
                     s += '{\"stop_sequence\":\"' + ss + '\",\"stop_id\":\"' + tr.stop_ids[iii] + '\",\"stop_name\":\"' + tr.stop_names[iii] + '\",\"sch_arr_dt\":\"' + ta + '\",\"sch_dep_dt\":\"' + td + '\"}';
                      ss += 1;
                    }
                    iii -= 1;  
                    i2 += 1;
                  }
                }
                else
                {
                  while(i2 < k2)
                  {
                    let st = tx.times[i2];
                    let kg = st.indexOf("+");
                    if(kg != -1) st = st.substring(0, kg);
                    kg = st.indexOf(":");
                    let sth = st.substring(0, kg);
                    let stm = st.substring(kg+1);
                    let td = d + 3600 * sth + 60 * stm;
                    if(sth == "-2")
                    {
                      td = tcc + 60 * stm;
                        
                    }
                    let ta = td;
                    if(sx[i2] != "-1")
                    {
                      if(bFirst) bFirst = false;
                      else s += ",";
                      s += '{\"stop_sequence\":\"' + ss + '\",\"stop_id\":\"' + tr.stop_ids[i2] + '\",\"stop_name\":\"' + tr.stop_names[i2] + '\",\"sch_arr_dt\":\"' + ta + '\",\"sch_dep_dt\":\"' + td + '\"}';
                      ss += 1;
                    }
                    i2 += 1;
                  }
                }
                s += "]}"; // end of stop end of trip
       }
       i3 += 1; 
     }
     s += "]}"; // end of trips
    }
    s += "]} " //end of direction
    s += "] }"; // end of route 
   }
   i0 += 1; 
 }
 
 s += "]}"; // end of mode
// report("::\n" + s + "\n::\n");
 let t = JSON.parse(s);
 resolve(t);
 });
 
 }
 return(p1);
}


let CF0 = new TRoute("CF0", "CF0");
CF0.common_name = "Cape Flyer";
CF0.stop_ids = ["place-sstat", "MM-0109", "MM-0200", "MM-0356-S", "CM-0493-S", "CM-0547-S", "CM-0564-S", "CM-0790-S"];
CF0.stop_names = ["South Station", "Braintree", "Brockton", "Middleborough/ Lakeville", "Wareham Village", "Buzzards Bay", "Bourne","Hyannis"];
let CF9001 = new TTrip("CF9001", "Cape Flyer to Hyannis 9001 F", 0, "5");
CF9001.headsign = "Hyannis";
CF9001.start_date = "20200626";
CF9001.end_date = "20200907";
CF9001.shape_id = "cf00002";
CF9001.times = ["17:50", "18:10", "18:21", "18:38", "19:08", "19:20", "19:25","20:20"];
CF0.trips[CF0.trips.length] = CF9001;
let CF9101 = new TTrip("CF9101", "Cape Flyer to Hyannis 9101 Sa", 0, "6");
CF9101.headsign = "Hyannis";
CF9101.start_date = "20200626";
CF9101.end_date = "20200907";
CF9101.shape_id = "cf00002";
CF9101.times = ["8:00", "8:20", "8:33", "8:52", "9:10", "9:20", "9:25", "10:20"];
CF0.trips[CF0.trips.length] = CF9101;
let CF9201 = new TTrip("CF9201", "Cape Flyer to Hyannis 9201 Su", 0, "0");
CF9201.headsign = "Hyannis";
CF9201.start_date = "20200626";
CF9201.end_date = "20200907";
CF9201.shape_id = "cf00002";
CF9201.times = ["8:00", "8:20", "8:33", "8:52", "9:10", "9:20", "9:25", "10:20"];
CF0.trips[CF0.trips.length] = CF9201;
let CF9002 = new TTrip("CF9002", "Cape Flyer to South Station 9002 F", 1, "5");
CF9002.headsign = "South Station";
CF9002.start_date = "20200626";
CF9002.end_date = "20200907";
CF9002.shape_id = "cf00001";
CF9002.times = ["21:00", "21:55", "22:00", "22:10", "22:30", "22:46", "22:59", "23:17"];
CF0.trips[CF0.trips.length] = CF9002;
let CF9102 = new TTrip("CF9102", "Cape Flyer to South Station 9102 Sa", 1, "6");
CF9102.headsign = "South Station";
CF9102.start_date = "20200626";
CF9102.end_date = "20200907";
CF9102.shape_id = "cf00001";
CF9102.times = ["18:40", "19:35","19:40", "19:50", "20:10", "20:26", "20:42", "21:02"];
CF0.trips[CF0.trips.length] = CF9102;
let CF9202 = new TTrip("CF9202", "Cape Flyer to South Station 9202 Su", 1, "0");
CF9202.headsign = "South Station";
CF9102.start_date = "20200626";
CF9102.end_date = "20200907";
CF9202.shape_id = "cf00001";
CF9202.times = ["18:40", "19:35","19:40", "19:50", "20:10", "20:26", "20:42", "21:02"];
CF0.trips[CF0.trips.length] = CF9202;


// Boston Harbor Cruises.
/*
let BPH0 = new TRoute("BPH0", "Boston Harbor Cruises");
BPH0.common_name = "Provincetown Ferry";
BPH0.stop_ids = ["Boat-Long", "ProvincetownDock"];
BPH0.stop_names = ["Long Wharf, Boston", "ProvincetownDock"];
//BPH0.eff = "June 26, 2020 - Sep 7, 2020";

let BPH01 = new TTrip("BPH01", "Boston Long Wharf to Provincetown Fast Ferry Daily", 0, "0123456");
BPH01.headsign = "Provincetown";
BPH01.start_date = "20220516";
BPH01.end_date = "20221010";
BPH01.times = ["9:00", "10:30"];
BPH0.trips[BPH0.trips.length] = BPH01;
let BPH02 = new TTrip("BPH02", "Boston Long Wharf to Provincetown Fast Ferry Daily", 0, "0123456");
BPH02.headsign = "Provincetown";
BPH02.start_date = "20220618";
BPH02.end_date = "20220905";
BPH02.times = ["14:00", "15:30"];
BPH0.trips[BPH0.trips.length] = BPH02;
let BPH03 = new TTrip("BPH03", "Boston Long Wharf to Provincetown Fast Ferry F,Sa", 0, "56");
BPH03.headsign = "Provincetown";
BPH03.start_date = "20220618";
BPH03.end_date = "20220905";
BPH03.times = ["18:00", "19:30"];
BPH0.trips[BPH0.trips.length] = BPH03;

let BPH10 = new TTrip("BPH10", "Provincetown to Boston Long Wharf, Fast Ferry Daily", 1, "0123456");
BPH10.headsign = "Long Wharf, Boston";
BPH10.start_date = "20220516";
BPH10.end_date = "20220905";
BPH10.times = ["17:30", "19:00"];
BPH0.trips[BPH0.trips.length] = BPH10;
let BPH11 = new TTrip("BPH11", "Provincetown to Boston Long Wharf, Fast Ferry Daily", 1, "0123456");
BPH11.headsign = "Long Wharf, Boston";
BPH11.start_date = "20220618";
BPH11.end_date = "20220905";
BPH11.times = ["11:30", "13:00"];
BPH0.trips[BPH0.trips.length] = BPH11;
let BPH12 = new TTrip("BPH12", "Provincetown to Boston Long Wharf, Fast Ferry F,Sa", 1, "56");
BPH12.headsign = "Long Wharf, Boston";
BPH12.start_date = "20220618";
BPH12.end_date = "20220905";
BPH12.times = ["16:00", "17:30"];
BPH0.trips[BPH0.trips.length] = BPH12;

let BPH13 = new TTrip("BPH13", "Provincetown to Boston Long Wharf, Fast Ferry F,Sa", 1, "56");
BPH13.headsign = "Long Wharf, Boston";
BPH13.start_date = "20220618";
BPH13.end_date = "20220905";
BPH13.times = ["20:00", "23:30"];
BPH0.trips[BPH0.trips.length] = BPH13;
*/
            
let L22 = new TRoute("L22", "Logan_22");
L22.common_name = "Logan shuttle 22";
L22.frequency = 6; // minutes
L22.stop_ids = ["Logan-Subway","Logan-RentalCarCenter", "Logan-A","Logan-B", "Logan-Subway","Logan-RentalCarCenter", "Logan-A"];
L22.stop_names = ["Logan-Subway","Logan-RentalCarCenter", "Logan-A","Logan-B", "Logan-Subway","Logan-RentalCarCenter", "Logan-A"];
addRouteToService(L22);

let L22_0 = new TTrip("L22_0", "Logan Shuttle Bus 22 M-F 8AM-10PM", 0, "12345");
L22_0.headsign = "Logan Shuttle Bus 22";
L22_0.start_time = "8:00";
L22_0.end_time = "22:00";
L22_0.times = ["-2:00","-2:04","-2:09", "-2:12", "-2:17","-2:21","-2:26"];
L22.trips[L22.trips.length] = L22_0;

let L22_1 = new TTrip("L22_1", "Logan Shuttle Bus 22 Sa-Su Noon-7PM", 0, "06");
L22_1.headsign = "Logan Shuttle Bus 22";
L22_1.start_time = "12:00";
L22_1.end_time = "19:00";
L22_1.times = ["-2:00","-2:04","-2:09", "-2:12", "-2:17","-2:21","-2:26"];
L22.trips[L22.trips.length] = L22_1;

let L33 = new TRoute("L33", "Logan_33");
L33.common_name = "Logan shuttle 33";
L33.frequency = 7; // minutes
L33.stop_ids = ["Logan-Subway","Logan-RentalCarCenter", "Logan-C","Logan-E","Logan-Subway","Logan-RentalCarCenter", "Logan-C"];
L33.stop_names = ["Logan-Subway","Logan-RentalCarCenter", "Logan-C","Logan-E","Logan-Subway","Logan-RentalCarCenter", "Logan-C"];
addRouteToService(L33);

let L33_0 = new TTrip("L33_0", "Logan Shuttle Bus 33 M-F 8AM-10PM", 0, "12345");
L33_0.headsign = "Logan Shuttle Bus 33";
L33_0.start_time = "8:00";
L33_0.end_time = "22:00";
L33_0.times = ["-2:00","-2:04","-2:09", "-2:12", "-2:17","-2:21","-2:26"];
L33.trips[L33.trips.length] = L33_0;

let L33_1 = new TTrip("L33_1", "Logan Shuttle Bus 33 Sa-Su Noon-7PM", 0, "06");
L33_1.headsign = "Logan Shuttle Bus 33";
L33_1.start_time = "12:00";
L33_1.end_time = "19:00";
L33_1.times = ["-2:00","-2:04","-2:09", "-2:12", "-2:17","-2:21","-2:26"];
L33.trips[L33.trips.length] = L33_1;

let L55 = new TRoute("L55", "Logan_55");
L55.common_name = "Logan shuttle 55";
L55.frequency = 10; // minutes
L55.stop_ids = ["Logan-Subway","Logan-RentalCarCenter","Logan-A","Logan-B", "Logan-C","Logan-E","Logan-Subway","Logan-RentalCarCenter", "Logan-A","Logan-B","Logan-C"];
L55.stop_names = ["Logan-Subway","Logan-RentalCarCenter","Logan-A","Logan-B", "Logan-C","Logan-E","Logan-Subway","Logan-RentalCarCenter", "Logan-A","Logan-B","Logan-C"];
addRouteToService(L55);

let L55_0 = new TTrip("L55_0", "Logan Shuttle Bus 55 M-F 10PM-9AM", 0, "12345");
L55_0.headsign = "Logan Shuttle Bus 55";
L55_0.start_time = "22:00";
L55_0.end_time = "9:00";
L55_0.times = ["-2:00","-2:04","-2:09","-2:11", "-2:12", "-2:14","-2:19","-2:23","-2:28", "-2:30","-2:31"];
L55.trips[L55.trips.length] = L55_0;

let L55_1 = new TTrip("L55_0", "Logan Shuttle Bus 55 Sa-Su 1030PM-Noon", 0, "06");
L55_1.headsign = "Logan Shuttle Bus 55";
L55_1.start_time = "22:30";
L55_1.end_time = "12:00";
L55_1.times = ["-2:00","-2:04","-2:09","-2:11", "-2:12", "-2:14","-2:19","-2:23","-2:28", "-2:30","-2:31"];
L55.trips[L55.trips.length] = L55_1;

let L66 = new TRoute("L66", "Logan_66");
L66.common_name = "Logan shuttle 66";
L66.frequency = 10; // minutes
L66.stop_ids = ["Logan-Dock","Logan-A","Logan-B", "Logan-C","Logan-E","Logan-Subway","Logan-Dock", "Logan-A","Logan-B","Logan-C","Logan-E"];
L66.stop_names = ["Logan-Dock","Logan-A","Logan-B", "Logan-C","Logan-E","Logan-Subway","Logan-Dock", "Logan-A","Logan-B","Logan-C","Logan-E"];
addRouteToService(L66);

let L66_0 = new TTrip("L66_0", "Logan Shuttle Bus 66 Daily 6AM-10:30PM", 0, "0123456");
L66_0.headsign = "Logan Shuttle Bus 66";
L66_0.start_time = "6:00";
L66_0.end_time = "22:30";
L66_0.times = ["-2:00","-2:05","-2:07","-2:09", "-2:11", "-2:16","-2:23","-2:28","-2:30", "-2:32","-2:34"];
L66.trips[L66.trips.length] = L66_0;

let LBB = new TRoute("LBB", "Logan Express - Back Bay");
LBB.common_name = "Logan Express - Back Bay";
LBB.frequency = 20; // minutes
LBB.stop_ids0 = ["2483916", "2483917", "2483924", "2483923", "2483922", "2483925", "2483928"];
LBB.stop_ids1 = ["2483918", "2483919", "2483920", "2483921", "2483926", "2483931", "2483916"];
LBB.stop_names = getStopNameArrayB(LBB.stop_ids, "LBB", stops_Airport);
addRouteToService(LBB);
/*
let LBB_0 = new TTrip("LBB_0", "Logan Express Bus - Back Bay Daily 5AM-9PM Every 20 min", 0, "0123456");
LBB_0.headsign = "Logan Airport";
LBB_0.start_time = "5:00";
LBB_0.end_time = "21:00";
LBB_0.shape_id = "p_179632";
LBB_0.times = ["-2:00","-2:01","-2:16","-2:17", "-2:18", "-2:19","-2:20"];
LBB.addTrip(LBB_0);

let LBB_1 = new TTrip("LBB_1", "Logan Express Bus - Back Bay Daily 6AM-10PM Every 20 min", 1, "0123456");
LBB_1.headsign = "Copley / Hynes Center";
LBB_1.start_time = "6:00";
LBB_1.end_time = "22:00";
LBB_1.shape_id = "p_179646";
LBB_1.times = ["-2:00","-2:01","-2:02","-2:03", "-2:04", "-2:18","-2:20"];
LBB.addTrip(LBB_1);
*/
let LPB = new TRoute("LPB", "Logan Express - Peabody");
LPB.common_name = "Logan Express - Peabody";
LPB.frequency = 60; // minutes
LPB.stop_ids1 = ["2484225", "2483924", "2483923", "2483922", "2483925", "2483928"];
LPB.stop_ids0 = ["2483918", "2483919", "2483920", "2483921", "2483926", "2484225"];
LPB.stop_names = getStopNameArrayB(LPB.stop_ids, "LPB", stops_Airport);
addRouteToService(LPB);
/*
let LPB_0 = new TTrip("LPB_0", "Logan Express Bus - Peabody Daily 4:15AM-1:15AM Hourly", 0, "0123456");
LPB_0.headsign = "Peabody";
LPB_0.start_time = "4:15";
LPB_0.end_time = "25:15";
LPB_0.shape_id = "p_179653";
LPB_0.times = ["-2:00","-2:01","-2:02","-2:03", "-2:04", "-2:45"];
LPB.addTrip(LPB_0);

let LPB_1 = new TTrip("LPB_1", "Logan Express Bus - Peabody Daily 3:15AM-10:15PM Hourly", 1, "0123456");
LPB_1.headsign = "Logan Airport";
LPB_1.start_time = "3:15";
LPB_1.end_time = "22:15";
LPB_1.shape_id = "p_179652";
LPB_1.times = ["-2:00","-2:41","-2:42","-2:43", "-2:44", "-2:45"];
LPB.addTrip(LPB_1);
*/
let LFH = new TRoute("LFH", "Logan Express - Framingham");
LFH.common_name = "Logan Express - Framingham";
LFH.frequency = 30; // minutes
LFH.stop_ids0 = ["2484224", "2483924", "2483923", "2483922", "2483925", "2483928"];
LFH.stop_ids1 = ["2483918", "2483919", "2483920", "2483921", "2483926", "2484224"];
LFH.stop_names = getStopNameArrayB(LFH.stop_ids, "LFH", stops_Airport);
addRouteToService(LFH);

let LFH_0 = new TTrip("LFH_0", "Logan Express Bus - Framingham M-F, 4AM-11PM  (Every 60 min)", 0, "0123456");
LFH_0.headsign = "Logan Airport";
LFH_0.start_time = "4:00";
LFH_0.end_time = "23:00";
LFH_0.shape_id = "p_179649";
LFH_0.times = ["-2:00","-2:36","-2:37", "-2:38", "-2:39","-2:40"];
LFH.addTrip(LFH_0);

let LFH_1 = new TTrip("LFH_1", "Logan Express Bus - Framingham M-F, 6:30AM-Midnight (Every 60 min)", 1, "0123456");
LFH_1.headsign = "Framingham";
LFH_1.start_time = "6:30";
LFH_1.end_time = "24:00";
LFH_1.shape_id = "p_179651";
LFH_1.times = ["-2:00","-2:01","-2:02","-2:03", "-2:04", "-2:40"];
LFH.addTrip(LFH_1);

let LBT = new TRoute("LBT", "Logan Express - Braintree");
LBT.common_name = "Logan Express - Braintree";
LBT.frequency = 30; // minutes
LBT.stop_ids0 = ["2484223", "2483924", "2483923", "2483922", "2483925", "2483928"];
LBT.stop_ids1 = ["2483918", "2483919", "2483920", "2483921", "2483926", "2484223"];
LBT.stop_names = getStopNameArrayB(LBT.stop_ids, "LBT", stops_Airport);
addRouteToService(LBT);

let LBT_0 = new TTrip("LBT_0", "Logan Express Bus - Braintree M-F, 4AM-11PM (Every 60 min)", 0, "0123456");
LBT_0.headsign = "Logan Airport";
LBT_0.start_time = "4:00";
LBT_0.end_time = "23:00";
LBT_0.shape_id = "p_179647";
LBT_0.times = ["-2:00","-2:36","-2:37", "-2:38", "-2:39","-2:40"];
LBT.addTrip(LBT_0);

let LBT_1 = new TTrip("LBT_1", "Logan Express Bus - Braintree M-F, 6:30AM-Midnight (Every 60 min)", 1, "0123456");
LBT_1.headsign = "Braintree";
LBT_1.start_time = "6:30";
LBT_1.end_time = "24:00";
LBT_1.shape_id = "p_179648";
LBT_1.times = ["-2:00","-2:01","-2:02","-2:03", "-2:04", "-2:40"];
LBT.addTrip(LBT_1);

let LWB = new TRoute("LWB", "Logan Express - Woburn");
LWB.common_name = "Logan Express - Woburn";
LWB.frequency = 30; // minutes
LWB.stop_ids0 = ["2483918", "2483919", "2483920", "2483921", "2483926", "2484226"];
LWB.stop_ids1 = ["2484226", "2483924", "2483923", "2483922", "2483925", "2483928"];
LWB.stop_names = getStopNameArrayB(LBT.stop_ids, "LWB", stops_Airport);
addRouteToService(LWB);

let LWB_0 = new TTrip("LWB_0", "Logan Express Bus - Woburn M-F, 6:30AM-Midnight (Every 60 min)", 0, "0123456");
LWB_0.headsign = "Woburn";
LWB_0.start_time = "6:30";
LWB_0.end_time = "24:00";
LWB_0.shape_id = "p_179655";
LWB_0.times = ["-2:00","-2:01","-2:02","-2:03", "-2:04", "-2:40"];
LWB.addTrip(LWB_0);

let LWB_1 = new TTrip("LWB_1", "Logan Express Bus - Woburn M-F, 4AM-11PM (Every 60 min)", 1, "0123456");
LWB_1.headsign = "Logan Airport";
LWB_1.start_time = "4:00";
LWB_1.end_time = "23:00";
LWB_1.shape_id = "p_179654";
LWB_1.times = ["-2:00","-2:36","-2:37", "-2:38", "-2:39","-2:40"];
LWB.addTrip(LWB_1);

let OB0 = new TRoute("OB0", "OB0");
OB0.common_name = "Marthas Vineyard Ferry";
OB0.stop_ids = ["OakBluffs", "HyannisTerminal"];
OB0.stop_names = ["Oak Bluffs", "Hyannis Terminal"];
let OB00 = new TTrip("OB00", "HL00 Hy Line Ferry Hyannis Terminal to Oak Bluffs Daily", 1, "0123456");
OB00.headsign = "Oak Bluffs";
OB00.times = ["9:25","10:25"];
OB0.trips[OB0.trips.length] = OB00;
let OB01 = new TTrip("OB01", "HL01 Hy Line Ferry Hyannis Terminal to Oak Bluffs Daily", 1, "0123456");
OB01.headsign = "Oak Bluffs";
OB01.times = ["15:15","16:15"];
OB0.trips[OB0.trips.length] = OB01;
/*
let OB02 = new TTrip("OB02", "HL02 Hy Line Ferry Hyannis Terminal to Oak Bluffs Daily", 1, "0123456");
OB02.headsign = "Oak Bluffs";
OB02.times = ["17:25","18:25"];
OB0.trips[OB0.trips.length] = OB02;
*/
let OB03 = new TTrip("OB03", "HL03 Hy Line Ferry Oak Bluffs to Hyannis Terminal Daily", 0, "0123456");
OB03.headsign = "Hyannis Terminal";
OB03.times = ["10:45","11:45"];
OB0.trips[OB0.trips.length] = OB03;
let OB04 = new TTrip("OB04", "HL04 Hy Line Ferry Oak Bluffs to Hyannis Terminal Daily", 0, "0123456");
OB04.headsign = "Hyannis Terminal";
OB04.times = ["16:30","17:30"];
OB0.trips[OB0.trips.length] = OB04;
/*
let OB05 = new TTrip("OB05", "HL05 Hy Line Ferry Oak Bluffs to Hyannis Terminal Daily", 0, "0123456");
OB05.headsign = "Hyannis Terminal";
OB05.times = ["18:45","19:45"];
OB0.trips[OB0.trips.length] = OB05;
*/


let PY_cal = new TCalendar();
PY_cal.gtfsz = "EasternTime";
PY_cal.addServiceDays("Base", "0123456", 20250515, 20251015,"","20250520, 20250521,20250527,2025052,20250603, 20250604,20250610,20250611,20250617,2025061,20250708,20250722,20250805,20250819,20250902, 20250916,20250923,20250924,20250930,20251001,20241007,20241008");

let PY0 = new TRoute("PY0", "PY0");
PY0.common_name = "CAT";
PY0.cal = PY_cal;
PY0.stop_ids = ["Yarmouth-Ferry-NS","Bar-Harbor-ME"];
PY0.stop_names = ["Yarmouth-Ferry-NS","Bar-Harbor-ME"];
addRouteToService(PY0);

let CAT1 = new TTrip("CAT1", "CAT Yarmouth NS to Bar-Harbor ME", 0, ""); 
CAT1.headsign = "Bar Harbor ME";
CAT1.service_ids = ["Base"];
CAT1.times = ["9:30","12:00"];
PY0.trips.push(CAT1);

let CAT2 = new TTrip("CAT2", "CAT Bar Harbor ME to Yarmouth NS", 1, ""); 
CAT2.headsign = "Yarmouth NS";
CAT2.service_ids = ["Base"];
CAT2.times = ["15:00","18:30"];
PY0.trips.push(CAT2);


let GH_cal = new TCalendar();

let GH0 = new TRoute("GH0", "GH0");
GH0.common_name = "Greyhound Montreal Service";
GH0.cal = GH_cal;
GH0.stop_ids = ["T_IRbusSS","Montreal-QC"];
GH0.stop_names = ["South Station", "Montreal-QC"];
addRouteToService(GH0);

let GH00 = new TTrip("GH00", "GH00 Greyhound Boston to Montreal-QC Daily", 0, "0123456");
GH00.headsign = "Montreal-QC";
GH00.times = ["13:00","21:25"];
GH0.trips[GH0.trips.length] = GH00;
/*
let GH01 = new TTrip("GH01", "GH01 Greyhound Boston to Montreal-QC Daily", 0, "0123456");
GH01.headsign = "Montreal-QC";
GH01.times = ["10:30","18:05"];
GH0.trips[GH0.trips.length] = GH01;
let GH02 = new TTrip("GH02", "GH02 Greyhound Boston to Montreal-QC Daily", 0, "0123456");
GH02.headsign = "Montreal-QC";
GH02.times = ["14:00","22:35"];
GH0.trips[GH0.trips.length] = GH02;
let GH03 = new TTrip("GH03", "GH03 Greyhound Boston to Montreal-QC Daily", 0, "0123456");
GH03.headsign = "Montreal-QC";
GH03.times = ["23:50","30:45"];
GH0.trips[GH0.trips.length] = GH03;
*/
let GH10 = new TTrip("GH10", "GH10 Greyhound Montreal-QC to Boston Daily", 1, "0123456");
GH10.headsign = "Boston";
GH10.times = ["8:00","16:40"];
GH0.trips[GH0.trips.length] = GH10;
/*
let GH11 = new TTrip("GH11", "GH11 Greyhound Montreal-QC to Boston Daily", 1, "0123456");
GH11.headsign = "Boston";
GH11.times = ["10:45","18:55"];
GH0.trips[GH0.trips.length] = GH11;
let GH12 = new TTrip("GH12", "GH12 Greyhound Montreal-QC to Boston Daily", 1, "0123456");
GH12.headsign = "Boston";
GH12.times = ["16:15","23:40"];
GH0.trips[GH0.trips.length] = GH12;
let GH13 = new TTrip("GH13", "GH13 Greyhound Montreal-QC to Boston Daily", 1, "0123456");
GH13.headsign = "Boston";
GH13.times = ["23:30","31:20"];
GH0.trips[GH0.trips.length] = GH13;
*/

let GH2 = new TRoute("GH2", "GH2");
GH2.common_name = "Greyhound Portland ME (GH) - Bangor ME (Airport)";
GH2.stop_ids = ["Portland-ME (GH)","Bangor-ME (Airport)"];
GH2.stop_names = ["Portland-ME (GH)", "Bangor-ME (Airport)"];
addRouteToService(GH2);

let GH20 = new TTrip("GH20", "GH20 Greyhound Portland-ME (GH) to Bangor-ME (Airport) Daily", 0, "0123456");
GH20.headsign = "Bangor-ME (Airport)";
GH20.times = ["19:10","22:05"];
GH2.trips[GH2.trips.length] = GH20;

let GH21 = new TTrip("GH21", "GH21 Greyhound Bangor-ME (Airport) to Portland-ME (GH) Daily", 1, "0123456");
GH21.headsign = "Portland-ME (GH)";
GH21.times = ["9:00","11:55"];
GH2.trips[GH2.trips.length] = GH21;

let GH3 = new TRoute("GH3", "GH3");
GH3.common_name = "Greyhound Boston - Albany / Rensselaer NY";
GH3.stop_ids = ["T_IRbusSS","place-springf","794942","2328723"];
GH3.stop_names = ["South Station","Springfield MA", "Pittsfield", "Albany Greyhound Bus Terminal, Albany, NY"];
addRouteToService(GH3);

let GH30 = new TTrip("GH30", "GH30 Greyhound Boston to Albany Daily", 0, "0123456");
GH30.headsign = "Albany NY Greyhound Bus Terminal";
GH30.times = ["13:45","16:15","17:25", "18:25"];
GH3.trips[GH3.trips.length] = GH30;

let GH31 = new TTrip("GH31", "GH31 Greyhound Albany to Boston Daily", 1, "0123456");
GH31.headsign = "Boston South Station";
GH31.times = ["7:45","8:45","9:55", "12:25"];
GH3.trips[GH3.trips.length] = GH31;

function cleanMNR()
{
  if(MN1.trips.length == 2) MN1.trips = [];  
  if(MN2.trips.length == 2) MN2.trips = [];  
  if(MN3.trips.length == 2) MN3.trips = [];  
  if(MN4.trips.length == 2) MN4.trips = [];  
  if(MN5.trips.length == 2) MN5.trips = [];  
  if(MN6.trips.length == 2) MN6.trips = [];  
}


/*

let MN3 = new TRoute("MN3", "MN3");
MN3.common_name = "Metro North New Haven Line";
//MN3.frequency = 30;
//MN3.stop_ids = ["MNR_151","MNR_149","MNR_190","MNR_145","MNR_143","MNR_140","MNR_188","MNR_138", "MNR_137","MNR_136","MNR_134","MNR_133","MNR_131","MNR_129","MNR_128","MNR_127","MNR_124", "MNR_121","MNR_120","MNR_118","MNR_116","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "MNR_108","MNR_106","MNR_105","MNR_56","MNR_4","MNR_1"];
MN3.stop_ids = ["NewHaven_StateSt-CT","NewHaven-CT","WestHaven-CT","Milford-CT","Stratford-CT","Bridgeport-CT","MNR_188","MNR_138", "MNR_137","MNR_136","MNR_134","MNR_133","SouthNorwalk-CT","MNR_129","MNR_128","MNR_127","Stamford-CT", "MNR_121","MNR_120","MNR_118","Greenwich-CT","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "NewRochelle-NY","MNR_106","MNR_105","MNR_56","MNR_622","MNR_4","NewYork-Grand-Central-NY"];
MN3.stop_names = ["NewHaven_StateSt-CT","NewHaven-CT", "WestHaven-CT", "Milford-CT", "Stratford-CT", "Bridgeport-CT", "Fairfield Metro-CT", "Fairfield-CT", "Southport-CT","Green's Farms-CT","Westport-CT", "East Norwalk-CT", "SouthNorwalk-CT","Rowayton-CT","Darien-CT","Noroton Heights-CT", "Stamford-CT",
"Old Greenwich-CT", "Riverside-CT", "Cos Cob-CT", "Greenwich-CT", "Port Chester-NY",  "Rye-NY", "Harrison-NY", "Mamaroneck-NY", "Larchmont-NY", "NewRochelle-NY", "Pelham-NY", "Mt Vernon East-NY","Fordham-NY","Yankees-E153 St.","Harlem-125th St.-NY","New York-Grand-Central-NY"];

let MNR_0 = new TTrip("MNR_0", "MN3", 0, "0123456");
MNR_0.headsign = "New York Grand Central";
MNR_0.start_time = "4:50";
MNR_0.end_time = "25:15";
MNR_0.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27","-2:29",
"-2:31","-2:33","-2:35", "-2:37", "-2:39", "-2:41","-2:43","-2:45","-2:47",
"-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58","-2:60","-2:62"
];
//MN3.trips.push(MNR_0);

let MNR_1 = new TTrip("MNR_1", "MN3", 0, "0123456");
MNR_1.headsign = "New Haven-CT";
MNR_1.start_time = "4:50";
MNR_1.end_time = "25:15";
MNR_1.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27","-2:29",
"-2:31","-2:33","-2:35", "-2:37", "-2:39", "-2:41","-2:43","-2:45","-2:47",
"-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58","-2:60","-2:62"
];
//MN3.trips.push(MNR_1);

let MN4 = new TRoute("MN4", "MN4");
MN4.common_name = "Metro North New Caanan Line";
//MN4.frequency = 60;
MN4.stop_ids = ["MNR_157","MNR_155","MNR_154","MNR_153",
"Stamford-CT", "MNR_121","MNR_120","MNR_118","Greenwich-CT","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "NewRochelle-NY","MNR_106","MNR_105","MNR_56","MNR_4","NewYork-Grand-Central-NY"];
MN4.stop_names = ["New Canaan-CT", "Talmadge Hill-CT", "Springdale-CT", "Glenbrook-CT", 
"Stamford-CT", "Old Greenwich-CT", "Riverside-CT", "Cos Cob-CT", "Greenwich-CT", "Port Chester-NY",  "Rye-NY", "Harrison-NY", "Mamaroneck-NY", "Larchmont-NY", "NewRochelle-NY", "Pelham-NY", "Mt Vernon East-NY","Fordham-NY","Harlem-125th St.-NY","New York-Grand-Central-NY"];

let MNR_2 = new TTrip("MNR_2", "MN4", 0, "0123456");
MNR_2.headsign = "Stamford / New York Grand Central";
MNR_2.start_time = "4:50";
MNR_2.end_time = "25:15";
MNR_2.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27","-2:29",
"-2:31","-2:33","-2:35", "-2:37"
];
//MN4.trips.push(MNR_2);

let MNR_3 = new TTrip("MNR_3", "MN4", 0, "0123456");
MNR_3.headsign = "New Canaan-CT";
MNR_3.start_time = "4:50";
MNR_3.end_time = "25:15";
MNR_3.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27","-2:29",
"-2:31","-2:33","-2:35", "-2:37"
];
//MN4.trips.push(MNR_3);

let MN5 = new TRoute("MN5", "MN5");
MN5.common_name = "Metro North Danbury Line";
//MN5.frequency = 60;
MN5.stop_ids = ["MNR_165","MNR_164","MNR_163","MNR_162","MNR_161","MNR_160","MNR_158",
"SouthNorwalk-CT","MNR_129","MNR_128","MNR_127",
"Stamford-CT", "Greenwich-CT","MNR_4","NewYork-Grand-Central-NY"];
MN5.stop_names = ["Danbury-CT", "Bethel-CT", "Redding-CT", "Branchville-CT", "Cannondale-CT", "Wilton-CT", "Merritt 7-CT",
"SouthNorwalk-CT","Rowayton","Darien","Noroton Heights",
"Stamford-CT","Greenwich-CT","Harlem-125th St.-NY","New York-Grand-Central-NY"
];

let MNR_4 = new TTrip("MNR_4", "MN5", 0, "0123456");
MNR_4.headsign = "SouthNorwalk-CT / New York Grand Central";
MNR_4.start_time = "4:50";
MNR_4.end_time = "25:15";
MNR_4.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27"
];
//MN5.trips.push(MNR_4);

let MNR_5 = new TTrip("MNR_5", "MN5", 0, "0123456");
MNR_5.headsign = "Danbury-CT";
MNR_5.start_time = "4:50";
MNR_5.end_time = "25:15";
MNR_5.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27"
];
//MN5.trips.push(MNR_5);

let MN5A = new TRoute("MN5A", "MN5A");
MN5A.common_name = "Metro North Danbury Line";
MN5A.stop_ids = ["MNR_165","MNR_164","MNR_163","MNR_162","MNR_161","MNR_160","MNR_158",
"SouthNorwalk-CT"];
MN5A.stop_names = ["Danbury-CT", "Bethel-CT", "Redding-CT", "Branchville-CT", "Cannondale-CT", "Wilton-CT", "Merritt 7-CT",
"SouthNorwalk-CT"
];

let MN6 = new TRoute("MN6", "MN6");
MN6.common_name = "Metro North Waterbury Line";
//MN6.frequency = 60;
MN6.stop_ids = ["MNR_172","MNR_171","MNR_170","MNR_169","MNR_168","MNR_167",
"Stratford-CT", "Bridgeport-CT","SouthNorwalk-CT","Stamford-CT", "MNR_4","NewYork-Grand-Central-NY"];
MN6.stop_names = ["Waterbury-CT", "Naugatuck-CT", "Beacon Falls-CT", "Seymour-CT", "Ansonia-CT", "Derby-Shelton-CT",
"Stratford-CT", "Bridgeport-CT", "SouthNorwalk-CT","Stamford-CT","Harlem-125th St.-NY", "New York-Grand-Central-NY"
];

let MNR_6 = new TTrip("MNR_6", "MN6", 0, "0123456");
MNR_6.headsign = "Stratford-CT / New York Grand Central";
MNR_6.start_time = "4:50";
MNR_6.end_time = "25:15";
MNR_6.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18"
];
//MN6.trips.push(MNR_6);

let MNR_7 = new TTrip("MNR_7", "MN6", 0, "0123456");
MNR_7.headsign = "Waterbury-CT";
MNR_7.start_time = "4:50";
MNR_7.end_time = "25:15";
MNR_7.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18"
];
//MN6.trips.push(MNR_7);

let MN1 = new TRoute("MN1", "MN1");
MN1.common_name = "Metro North Hudson Line";
//MN1.frequency = 30;
MN1.stop_ids = ["Poughkeepsie-NY","MNR_49","MNR_46","MNR_44","MNR_43","MNR_42", "MNR_40", "MNR_39","MNR_37",
"Croton-Harmon-NY","MNR_31","MNR_30","MNR_29","MNR_27","MNR_25","MNR_24", "MNR_23","MNR_22", "MNR_20","MNR_19","Yonkers-NY","MNR_17","MNR_16","MNR_14","MNR_11","MNR_10","MNR_9","MNR_184", "MNR_622", "MNR_4","NewYork-Grand-Central-NY"];
MN1.stop_names = ["Poughkeepsie-NY", "New Hamburg-NY", "Beacon-NY", "Breakneck Ridge-NY","Cold Spring-NY", "Garrison-NY", "Manitou-NY","Peekskill-NY", "Cortlandt-NY", "Croton-Harmon-NY", "Ossining-NY", "Scarborough-NY", "Philipse Manor-NY", "Tarrytown-NY", "Irvington-NY", "Ardsley-on-Hudson-NY", "Dobbs Ferry-NY", "Hastings-on-Hudson-NY", "Greystone-NY", "Glenwood-NY", "Yonkers-NY", "Ludlow-NY", "Riverdale-NY", "Spuyten Duyvil-NY", "Marble Hill-NY", "University Heights-NY", "Morris Heights-NY", "Highbridge Yard","Yankees-E 153rd Street-NY","Harlem-125th St.-NY", "New York-Grand-Central-NY"
];

let MNR_8 = new TTrip("MNR_8", "MN1", 0, "0123456"); //31
MNR_8.headsign = "New York Grand Central";
MNR_8.start_time = "4:50";
MNR_8.end_time = "25:15";
MNR_8.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27","-2:29",
"-2:31","-2:33","-2:35", "-2:37", "-2:39", "-2:41","-2:43","-2:45","-2:47",
"-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58"
];
//MN1.trips.push(MNR_8);

let MNR_9 = new TTrip("MNR_9", "MN1", 0, "0123456");
MNR_9.headsign = "Croton-Harmon / Poughkeepsie-NY";
MNR_9.start_time = "4:50";
MNR_9.end_time = "25:15";
MNR_9.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27","-2:29",
"-2:31","-2:33","-2:35", "-2:37", "-2:39", "-2:41","-2:43","-2:45","-2:47",
"-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58"
];
//MN1.trips.push(MNR_9);


let MN2 = new TRoute("MN2", "MN2");
MN2.common_name = "Metro North Harlem Line";
//MN2.frequency = 30;
MN2.stop_ids = ["MNR_177","MNR_176","MNR_101","MNR_100","MNR_99","MNR_98","MNR_97","MNR_94","MNR_91", "MNR_90","MNR_89","MNR_88","MNR_86","MNR_85","MNR_84","MNR_83","MNR_81","MNR_80", "MNR_79", "MNR_78", "MNR_76","MNR_74","MNR_72","MNR_71","MNR_68","MNR_66","MNR_65","MNR_64","MNR_62","MNR_61", "MNR_59","MNR_58","MNR_57","MNR_56","MNR_55","MNR_54","MNR_4", "NewYork-Grand-Central-NY" ];
MN2.stop_names = [ "Wassaic-NY", "Tenmile River-NY", "Dover Plains-NY", "Harlem Valley-Wingdale-NY", "Appalachian Trail", "Pawling-NY", "Patterson-NY", "Southeast-NY", "Brewster-NY", "Croton Falls-NY", "Purdys-NY", "Goldens Bridge-NY", "Katonah-NY", "Bedford Hills-NY", "Mount Kisco-NY", "Chappaqua-NY", "Pleasantville-NY", "Hawthorne-NY", "Mount Pleasant-NY", "Valhalla-NY", "North White Plains-NY", "White Plains-NY", "Hartsdale-NY", "Scarsdale-NY", "Crestwood-NY", "Tuckahoe-NY", "Bronxville-NY", "Fleetwood-NY", "Mt Vernon West-NY", "Wakefield-NY", "Woodlawn-NY", "Williams Bridge-NY", "Botanical Garden-NY", "Fordham-NY", "Tremont-NY", "Melrose-NY", "Harlem-125th St.-NY", "New York-Grand-Central-NY"
];

let MNR_10 = new TTrip("MNR_10", "MN2", 0, "0123456"); //38
MNR_10.headsign = "New York Grand Central";
MNR_10.start_time = "4:50";
MNR_10.end_time = "25:15";
MNR_10.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27","-2:29",
"-2:31","-2:33","-2:35", "-2:37", "-2:39", "-2:41","-2:43","-2:45","-2:47",
"-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58","-2:60","-2:62",
"-2:64","-2:66","-2:68", "-2:70", "-2:72"
];
//MN2.trips.push(MNR_10);

let MNR_11 = new TTrip("MNR_11", "MN2", 0, "0123456");
MNR_11.headsign = "North White Plains/ Southeast / Wassaic";
MNR_11.start_time = "4:50";
MNR_11.end_time = "25:15";
MNR_11.times = ["-2:00","-2:01","-2:02", "-2:03", "-2:04","-2:05","-2:07","-2:08",
"-2:11","-2:14","-2:16", "-2:18", "-2:22","-2:24","-2:27","-2:29",
"-2:31","-2:33","-2:35", "-2:37", "-2:39", "-2:41","-2:43","-2:45","-2:47",
"-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58","-2:60","-2:62",
"-2:64","-2:66","-2:68", "-2:70", "-2:72"
];
//MN2.trips.push(MNR_11);

*/
    
let DE1 = new TRoute("DE1", "DE1");
DE1.common_name = "Downeast Transport Bus Bangor-ME - Bar Harbor-ME";
DE1.stop_ids = ["Bar-Harbor-ME", "Bangor-ME (Airport)", "Bangor-ME"];
DE1.stop_names = ["Bar-Harbor-ME", "Bangor-ME (Airport)", "Bangor-ME (CC)"];
addRouteToService(DE1);

let DE00 = new TTrip("DE00", "DE00 Downeast Transport Bus M-F", 0, "12345");
DE00.headsign = "Bangor-ME";
DE00.times = ["8:00","9:55", "10:00"];
DE1.trips[DE1.trips.length] = DE00;

let DE01 = new TTrip("DE01", "DE01 Downeast Transport Bus M-F", 1, "12345");
DE01.headsign = "Bar Harbor-ME";
DE01.times = ["13:50", "13:55", "15:50"];
DE1.trips[DE1.trips.length] = DE01;

let CZ_cal = new TCalendar();
let CZ1 = new TRoute("CZ1", "CZ1");
CZ1.common_name = "Concord Coach Bus Portland-ME - Bangor-ME";
CZ1.stop_ids = ["Logan-A","T_IRbusSS","Portland-ME", "Auburn-ME","Augusta-ME","Bangor-ME"];
CZ1.cal = CZ_cal;
CZ1.stop_names = ["Logan Airport Terminals","South Station", "Portland-ME","Auburn-ME","Augusta-ME", "Bangor-ME (CC)"];
addRouteToService(CZ1);

let CZ50 = new TTrip("CZ50", "Concord Coach Bus 50 Logan, South Station,Portland-ME to Bangor-ME Daily",0,"0123456");
CZ50.headsign = "Bangor-ME";
CZ50.times = ["7:30","8:00","9:55/10:00","-1","10:55","12:10"];
CZ1.trips[CZ1.trips.length] = CZ50;

let CZ52 = new TTrip("CZ52", "Concord Coach Bus 52 Logan, South Station, Portland-ME to Auburn-ME Daily",0,"0123456");
CZ52.headsign = "Auburn-ME";
CZ52.times = ["7:30","8:00","9:55/10:00","10:40","-1","-1"];
CZ1.trips[CZ1.trips.length] = CZ52;

let CZ52A = new TTrip("CZ52A", "Concord Coach Bus 52A Logan, South Station, Portland-ME to Auburn-ME Daily",0,"0123456");
CZ52A.headsign = "Portland-ME";
CZ52A.times = ["9:30","10:00","11:55","-1","-1","-1"];
CZ1.trips[CZ1.trips.length] = CZ52A;

let CZ54 = new TTrip("CZ54", "Concord Coach Bus 54 Logan, South Station, Portland-ME to Bangor-ME Daily",0,"0123456");
CZ54.headsign = "Bangor-ME";
CZ54.times = ["10:45","11:15","13:10/13:15","-1","-1","17:25"];
CZ1.trips[CZ1.trips.length] = CZ54;

let CZ58 = new TTrip("CZ58", "Concord Coach Bus 58 Logan, South Station, Portland-ME to Bangor-ME Daily",0,"0123456");
CZ58.headsign = "Bangor-ME";
CZ58.times = ["12:45","13:15","15:10/15:15","-1", "16:10", "17:25"];
CZ1.trips[CZ1.trips.length] = CZ58;

let CZ62 = new TTrip("CZ62", "Concord Coach Bus 62 Logan, South Station, Portland-ME Daily",0,"0123456");
CZ62.headsign = "Portland-ME";
CZ62.times = ["13:45","14:15","16:10","-1","-1","-1"];
CZ1.trips[CZ1.trips.length] = CZ62;

let CZ62A = new TTrip("CZ62A", "Concord Coach Bus 62A Logan, South Station, Portland-ME Daily",0,"0123456");
CZ62A.headsign = "Portland-ME";
CZ62A.times = ["15:00","15:30","17:25","-1","-1","-1"];
CZ1.trips[CZ1.trips.length] = CZ62A;

let CZ64A = new TTrip("CZ64A", "Concord Coach Bus 64A Logan, South Station, Bangor-ME Daily",0,"0123456");
CZ64A.headsign = "Bangor-ME";
CZ64A.times = ["16:00","16:30","16:25/16:30","-1","19:25","20:40"];
CZ1.trips[CZ1.trips.length] = CZ64A;

let CZ64 = new TTrip("CZ64", "Concord Coach Bus 64 Logan, South Station, Auburn-ME Daily",0,"0123456");
CZ64.headsign = "Auburn-ME";
CZ64.times = ["17:00","17:30","19:25/19:30","20:10","-1","-1"];
CZ1.trips[CZ1.trips.length] = CZ64;

let CZ66 = new TTrip("CZ66", "Concord Coach Bus 66 Logan, South Station, Portland-ME Daily",0,"0123456");
CZ66.headsign = "Portland-ME";
CZ66.times = ["18:30","19:00","20:55","-1","-1","-1"];
CZ1.trips[CZ1.trips.length] = CZ66;

let CZ76 = new TTrip("CZ76", "Concord Coach Bus 76 Logan, South Station, Portland-ME Daily",0,"0123456");
CZ76.headsign = "Portland-ME";
CZ76.times = ["19:45","20:15","22:10","-1","-1","-1"];
CZ1.trips[CZ1.trips.length] = CZ76;

let CZ76A = new TTrip("CZ76A", "Concord Coach Bus 76A Logan, South Station, Portland-ME Daily",0,"0123456");
CZ76A.headsign = "Portland-ME";
CZ76A.times = ["21:30","22:00","23:55","-1","-1","-1"];
CZ1.trips[CZ1.trips.length] = CZ76A;

let CZ51 = new TTrip("CZ51", "Concord Coach Bus 51 Portland-ME to South Station, Logan Daily",1,"0123456");
CZ51.headsign = "Logan Airport";
CZ51.times = ["-1","-1","-1","4:45","6:40","7:00"];
CZ1.trips[CZ1.trips.length] = CZ51;

let CZ55 = new TTrip("CZ55", "Concord Coach Bus 55 Auburn-ME to South Station, Logan Daily",1,"0123456");
CZ55.headsign = "Logan Airport";
CZ55.times = ["-1","-1","5:35","6:15/6:30","8:25", "8:45"];
CZ1.trips[CZ1.trips.length] = CZ55;

let CZ57 = new TTrip("CZ57", "Concord Coach Bus 57 Portland-ME to South Station, Logan Daily",1,"0123456");
CZ57.headsign = "Logan Airport";
CZ57.times = ["-1","-1","-1","7:30","9:25","9:45"];
CZ1.trips[CZ1.trips.length] = CZ57;

let CZ59 = new TTrip("CZ59", "Concord Coach Bus 59 Bangor-ME to South Station,Logan Daily",1,"0123456");
CZ59.headsign = "Logan Airport";
CZ59.times = ["7:00","8:15","-1","9:25/9:30","11:25","11:45"];
CZ1.trips[CZ1.trips.length] = CZ59;

let CZ61 = new TTrip("CZ61", "Concord Coach Bus 61 Portland-ME to South Station,Logan Daily",1,"0123456");
CZ61.headsign = "Logan Airport";
CZ61.times = ["-1","-1","-1","10:30","12:25","12:45"];
CZ1.trips[CZ1.trips.length] = CZ61;

let CZ63 = new TTrip("CZ63", "Concord Coach Bus 63 Bangor-ME to South Station, Logan Daily",1,"0123456");
CZ63.headsign = "Logan Airport";
CZ63.times = ["7:00","-1","-1","11:00/11:30","13:25","13:45"];
CZ1.trips[CZ1.trips.length] = CZ63;

let CZ65 = new TTrip("CZ65", "Concord Coach Bus 65 Bangor-ME to South Station, Logan Daily",1,"0123456");
CZ65.headsign = "Logan Airport";
CZ65.times = ["-1","-1","11:35","12:15/12:30","14:25","14:45"];
CZ1.trips[CZ1.trips.length] = CZ65;

let CZ67 = new TTrip("CZ67", "Concord Coach Bus 67 Auburn-ME to South Station, Logan Daily",1,"0123456");
CZ67.headsign = "Logan Airport";
CZ67.times = ["11:00","12:15","-1","13:20/13:30","15:25","15:45"];
CZ1.trips[CZ1.trips.length] = CZ67;

let CZ67A = new TTrip("CZ67A", "Concord Coach Bus 67A Portland-ME to South Station, Logan Daily",1,"0123456");
CZ67A.headsign = "Logan Airport";
CZ67A.times = ["-1","-1","-1","15:30","17:25","17:45"];
CZ1.trips[CZ1.trips.length] = CZ67A;

let CZ69 = new TTrip("CZ69", "Concord Coach Bus 69 Bangor-ME to South Station, Logan Daily",1,"0123456");
CZ69.headsign = "Logan Airport";
CZ69.times = ["14:15","15:30","-1","16:40/16:45","18:40","19:00"];
CZ1.trips[CZ1.trips.length] = CZ69;

let CZ69A = new TTrip("CZ69A", "Concord Coach Bus 69A Portland-ME to South Station, Logan Daily",1,"0123456");
CZ69A.headsign = "Logan Airport";
CZ69A.times = ["-1","-1","-1","18:00","19:55","20:15"];
CZ1.trips[CZ1.trips.length] = CZ69A;


/*
let TR_Cal = new TCalendar();
TR_Cal.addServiceDays("MTWTF","12345","20240812","20250812","","20250526,20250704,20250901,20251127,20251225,20260101,20260525,20260907,20261126,20261225,20270101,20270531,20270906,20271125");
TR_Cal.addServiceDays("SSH","06","20240812","20250812","20250526,20250704,20250901,20251127,20251225,20260101,20260525,20260907,20261126,20261225,20270101,20270531,20270906,20271125","");
    
let TRR1 = new TRoute("TRR1", "TRR1");
TRR1.common_name = "TriRail - West Palm Beach / Miami";
TRR1.cal = TR_Cal;
TRR1.stop_ids = ["TR1","TR2","TR3","TR4","TR5","TR6","TR7","TR8","TR9",
    "TR10","TR11","TR12","TR13","TR14","TR15","TR16","TR17","TR18"];
addRouteToService(TRR1);

let TRR2 = new TRoute("TRR2", "TRR2");
TRR2.common_name = "TriRail - Downtown Miami Link";
TRR2.cal = TR_Cal;
TRR2.stop_ids = ["TR16","TR19"];
addRouteToService(TRR2);
*/

//let MDR1 = new TRoute("MDR1", "MDR1");
//MDR1.common_name = "Miami MetroRail";
//MDR1.cal = MD_Cal;
// Dadeland South
//MDR1.m = "30315";
/*
MDR1.stop_ids0 = ["MDC10494","MDC9486","MDC9488","MDC9490","MDC9492","MDC9494","MDC9496","MDC9498","MDC9500",
"MDC9502","MDC9504","MDC9506","MDC9508","MDC9510","MDC9512","MDC9514","MDC9516","MDC9518","MDC9520",
"MDC9522","MDC9524","MDC9526","MDC9528"];
// Green line Palmetto, Okeechobee
MDR1.stop_ids1 = ["MDC9529","MDC9527","MDC9525","MDC9523","MDC9521","MDC9519","MDC9517","MDC9515",
"MDC9513","MDC9511","MDC9509","MDC9507","MDC9505","MDC9503","MDC9501","MDC9499","MDC9497","MDC9495",
"MDC9493","MDC9491","MDC9489","MDC9487","MDC10495"];
*/
//addRouteToService(MDR1);

/*
let MDR2 = new TRoute("MDR2", "MDR2");
MDR2.common_name = "Miami Airport";
//MDR2.cal = MD_Cal;
// Earlington Heights
MDR2.stop_ids0 = ["MDC10494","MDC9500"];
// Orange line airport
MDR2.stop_ids1 = ["MDC9501","MDC10495"];
addRouteToService(MDR2);
*/

let NAT_cal = new TCalendar();

let NAT = new TRoute("NAT", "Newark Airport AirTrain");
NAT.common_name = "Newark Airport AirTrain";
NAT.cal = NAT_cal;
NAT.frequency = 3; // minutes
NAT.stop_ids = ["Newark_AirTrain", "Newark_Airport_P4","Newark_Airport_Terminal_C", "Newark_Airport_Terminal_B", "Newark_Airport_Terminal_A", "Newark_Airport_P3", "Newark_Airport_P2", "Newark_Airport_P1"];
addRouteToService(NAT);

let NAT_0 = new TTrip("NAT_0", "Newark Airport AirTrain Daily Every 3 min, 15 min mid-5AM ", 0, "0123456");
NAT_0.headsign = "Newark Airport Terminals";
NAT_0.times = ["-2:00","-2:08","-2:10","-2:12", "-2:14", "-2:16","-2:18","-2:20"];
NAT.trips[NAT.trips.length] = NAT_0;

let NAT_1 = new TTrip("NAT_1", "Newark Airport AirTrain Daily Every 3 min, 15 min mid-5AM ", 1, "0123456");
NAT_1.headsign = "Newark Airport Rail Station";
NAT_1.times = ["-2:00","-2:02","-2:04","-2:06", "-2:08", "-2:10","-2:12","-2:20"];
NAT.trips[NAT.trips.length] = NAT_1;

let JFK_cal = new TCalendar();

let JFK = new TRoute("JFK", "JFK Airport AirTrain");
JFK.common_name = "Newark Airport AirTrain";
JFK.frequency = 10; // minutes
JFK.cal = JFK_cal;
JFK.stop_ids = ["Jamaica_AirTrain", "HowardBeach_AirTrain","Lefferts_AirTrain", "FederalCircle", "JFK_Terminal_1", "JFK_Terminal_2", "JFK_Terminal_4", "JFK_Terminal_5", "JFK_Terminal_7", "JFK_Terminal_8", "FederalCircle", "Lefferts_AirTrain", "HowardBeach_AirTrain", "Jamaica_AirTrain"];
addRouteToService(JFK);

let JFK_Red = new TTrip("JFK_Red", "JFK AirTrain Jamaica Loop ", 0, "0123456");
JFK_Red.headsign = "Jamaica Loop Airport Terminals";
JFK_Red.times = ["-2:00","-1","-1", "-2:08","-2:12","-2:14", "-2:16", "-2:18", "-2:18", "-2:20", "-2:24", "-1","-1", "-2:32"];
JFK.trips[JFK.trips.length] = JFK_Red;

let JFK_Green = new TTrip("JFK_Green", "JFK AirTrain Howard Beach Loop ", 0, "0123456");
JFK_Green.headsign = "Howard Beach Loop Airport Terminals";
JFK_Green.times = ["-1", "-2:00","-2:02", "-2:08","-2:12","-2:14", "-2:16", "-2:18", "-2:18", "-2:20", "-2:24", "-2:30", "-2:32", "-1"];
JFK.trips[JFK.trips.length] = JFK_Green;

let JFK_Yellow = new TTrip("JFK_Yellow", "JFK AirTrain Terminals Loop ", 1, "0123456");
JFK_Yellow.headsign = "Terminals Loop";
JFK_Yellow.times = ["-1", "-1","-1", "-1", "-2:00","-2:02","-2:04", "-2:06", "-2:08", "-2:10", "-1", "-1", "-1", "-1"];
JFK.trips[JFK.trips.length] = JFK_Yellow;

let LGA_cal = new TCalendar();

let LGA1 = new TRoute("LGA1", "LaGuardia Airport Q70 Bus");
LGA1.common_name = "LaGuardia Airport Q70";
LGA1.cal = LGA_cal;
LGA1.frequency = 15; // minutes
LGA1.stop_ids = ["NYT712B", "NYT710B","NYTG14B","LGAB","LGAD","LGAC","NYTG14B","NYT710B", "NYT712B"];
addRouteToService(LGA1);

let LGAT1 = new TTrip("LGAT1", "LaGuardia Q70 Bus ", 0, "0123456");
LGAT1.headsign = "LaGuardia Q70 Terminals B C D";
LGAT1.times = ["-2:00","-2:02", "-2:02","-2:32","-2:37", "-2:42", "-2:77", "-2:77", 
"-2:79"];
LGA1.addTrip(LGAT1);

let LGA2 = new TRoute("LGA2", "LaGuardia Airport M60 Bus");
LGA2.common_name = "LaGuardia Airport M60";
LGA2.cal = LGA_cal;
LGA2.frequency = 15; // minutes
LGA2.stop_ids = ["NYT117B","NYTA15B" ,"NYT225B","NYT621B","LGAB","LGAD","LGAC", "LGAA", 
"NYT621B", "NYT225B","NYTA15B", "NYT117B"];
addRouteToService(LGA2);

let LGAT2 = new TTrip("LGAT2", "LaGuardia M60 Bus ", 0, "0123456");
LGAT2.headsign = "LaGuardia M60 Terminals A B C D";
LGAT2.times = ["-2:00","-2:02", "-2:02","-2:04","-2:34", "-2:39", "-2:44", "-2:49", 
"-2:79", "-2:84", "-2:89", "-2:94"];
LGA2.addTrip(LGAT2);

let LGA3 = new TRoute("LGA3", "LaGuardia Airport Q47");
LGA3.common_name = "LaGuardia Airport Q47";
LGA3.cal = LGA_cal;
LGA3.frequency = 15; // minutes
LGA3.stop_ids = ["NYT710B","NYTG14B", "LGAA","NYTG14B","NYT710B"];
addRouteToService(LGA3);

let LGAT3 = new TTrip("LGAT3", "LaGuardia Q47 Bus ", 0, "0123456");
LGAT3.headsign = "LaGuardia Q47 Terminal A";
LGAT3.times = ["-2:00","-2:01", "-2:32","-2:67", "-2:68"];
LGA3.addTrip(LGAT3);

let LGA4 = new TRoute("LGA4", "LaGuardia Airport Q72");
LGA4.common_name = "LaGuardia Airport Q72";
LGA4.cal = LGA_cal;
LGA4.frequency = 15; // minutes
LGA4.stop_ids = ["NYTG10B","LGAB","LGAD","LGAC","NYTG10B"];
addRouteToService(LGA4);

let LGAT4 = new TTrip("LGAT4", "LaGuardia Q72 Bus ", 0, "0123456");
LGAT4.headsign = "LaGuardia Q72 Terminals B C D";
LGAT4.times = ["-2:00","-2:32", "-2:37","-2:42","-2:72"];
LGA4.addTrip(LGAT4);

let LGA5 = new TRoute("LGA5", "LaGuardia Airport Q48");
LGA5.common_name = "LaGuardia Airport Q48";
LGA5.cal = LGA_cal;
LGA5.frequency = 15; // minutes
LGA5.stop_ids = ["NYT705B","LGAB","LGAD","LGAC","NYT705B"];
addRouteToService(LGA5);

let LGAT5 = new TTrip("LGAT5", "LaGuardia Q48 Bus ", 0, "0123456");
LGAT5.headsign = "LaGuardia Q48 Terminals B C D";
LGAT5.times = ["-2:00","-2:32","-2:37", "-2:42", "-2:77"];
LGA5.addTrip(LGAT5);

/*
let NCTD398 = new TRoute("NCTD398", "COASTER - SanDiego - Oceanside");
NCTD398.common_name = "COASTER - San Diego - Oceanside";
NCTD398.stop_ids0 = ["CS28007", "CS28006","CS28005","CS28004","CS28003","CS28002","CS28001","CS28000"];
NCTD398.stop_ids1 = ["CS28100","CS28101","CS28102","CS28103","CS28104","CS28105","CS28106","CS28107"];
addRouteToService(NCTD398);

let NCTD399 = new TRoute("NCTD399", "SPRINTER - Oceanside - Escondido");
NCTD399.common_name = "SPRINTER - Oceanside - Escondido";
NCTD399.stop_ids = ["CS27000", "CS27001","CS27002","CS27003","CS27004","CS27005","CS27006",
"CS27007","CS27008","CS27009","CS27010","CS27011","CS27012","CS27013","CS27014"];
addRouteToService(NCTD399);
*/
// LA Metrolink

let LAML91 = new TRoute("LAML91", "Metrolink 91 Line");
LAML91.common_name = "Metrolink 91 Line";
LAML91.stops_ids = ["CML107","CML143","CML130","CML174","CML173","CML147","CML148","CML123",
"CML181","CML182","CML183","CML184"];
addRouteToService(LAML91);

let LAMLOC = new TRoute("LAMLOC", "Orange County Line");
LAMLOC.common_name = "Metrolink Orange County Line";
LAMLOC.stop_ids = ["CML107","CML135","CML143","CML130","CML174","CML128","CML145","CML154",
"CML156","CML140","CML141","CML153","CML152","CML133","CML144"];
addRouteToService(LAMLOC);

let LAMLIE = new TRoute("LAMLIE", "Inland Empire - Orange County Line");
LAMLIE.common_name = "Metrolink Inland Empire - Orange County Line";
LAMLIE.stop_ids = ["CML185","CML124","CML123","CML148","CML147","CML173","CML171","CML145",
"CML154","CML156","CML140","CML141","CML153","CML152","CML133","CML144"];
addRouteToService(LAMLIE);

let LAMLAV = new TRoute("LAMLAV", "Antelope Valley Line");
LAMLAV.common_name = "Metrolink Antelope Valley Line";
LAMLAV.stop_ids = ["CML107","CML106","CML102","CML186","CML129","CML110","CML175","CML111",
"CML164","CML165","CML163","CML162"];
addRouteToService(LAMLAV);

let LAMLRL = new TRoute("LAMLRL", "Riverside Line");
LAMLRL.common_name = "Metrolink Riverside Line";
LAMLRL.stop_ids = ["CML107","CML126","CML127","CML120","CML117","CML119","CML123"];
addRouteToService(LAMLRL);

let LAMLSB = new TRoute("LAMLSB", "San Bernardino Line");
LAMLSB.common_name = "Metrolink San Bernardino Line";
LAMLSB.stop_ids = ["CML107","CML115","CML105","CML101","CML104","CML109","CML114","CML118",
"CML125","CML121","CML116","CML122","CML124","CML185","CML188","CML189","CML190","CML191"];
addRouteToService(LAMLSB);

let LAMLVC = new TRoute("LAMLVC", "Ventura Country Line");
LAMLVC.common_name = "Metrolink Ventura Country Line";
LAMLVC.stop_ids = ["CML107","CML106","CML102","CML170","CML113","CML167","CML103",
"CML112","CML108","CML166","CML168","CML169","CML187"];
addRouteToService(LAMLVC);

let LAMLFA = new TRoute("LAMLFA", "LAX FlyAway Bus");
LAMLFA.common_name = "Metrolink LAX FlyAway Bus";
LAMLFA.stop_ids = ["CML107","CML180"];
addRouteToService(LAMLFA);


/*
// BART
let B_Cal = null;

let B_YELLOW = new TRoute("B_YELLOW", "Antioch - SFIA/Millbrae");
B_YELLOW.cal = B_Cal;
B_YELLOW.stop_ids = ["B_MLBR","B_SFIA","B_SBRN","B_SSAN","B_COLM","B_DALY","B_BALB","B_GLEN","B_24TH","B_16TH","B_CIVC",
"B_POWL","B_MONT","B_EMBR","B_WOAK","B_12TH","B_19TH","B_MCAR","B_ROCK","B_ORIN","B_LAFY",
"B_WCRK","B_PHIL","B_CONC","B_NCON","B_PITT","B_PCTR","B_ANTC"];
addRouteToService(B_YELLOW);

let B_ORANGE = new TRoute("B_ORANGE", "Richmond - Berryessa/North San Jose");
B_ORANGE.cal = B_Cal;
B_ORANGE.stop_ids = ["B_BERY","B_MLPT","B_WARM","B_FRMT","B_UCTY","B_SHAY","B_HAYW","B_BAYF","B_SANL","B_COLS",
"B_FTVL","B_LAKE","B_12TH","B_19TH","B_MCAR","B_ASHB","B_DBRK","B_NBRK","B_PLZA","B_DELN","B_RICH"
];
addRouteToService(B_ORANGE);

let B_GREEN = new TRoute("B_GREEN", "Berryessa/North San Jose - Daly City");
B_GREEN.cal = B_Cal;
B_GREEN.stop_ids = ["B_DALY","B_BALB","B_GLEN","B_24TH","B_16TH","B_CIVC","B_POWL","B_MONT","B_EMBR","B_WOAK",
"B_LAKE","B_FTVL","B_COLS","B_SANL","B_BAYF","B_HAYW","B_SHAY","B_UCTY","B_FRMT","B_WARM",
"B_MLPT","B_BERY"
];
addRouteToService(B_GREEN);

let B_RED = new TRoute("B_RED", "Richmond - Daly City/Millbrae");
B_RED.cal = B_Cal;
B_RED.stop_ids = ["B_SFIA","B_MLBR","B_SBRN","B_SSAN","B_COLM","B_DALY","B_BALB","B_GLEN","B_24TH","B_16TH",
"B_CIVC","B_POWL","B_MONT","B_EMBR","B_WOAK","B_12TH","B_19TH","B_MCAR","B_ASHB","B_DBRK","B_NBRK","B_PLZA","B_DELN","B_RICH"
];
addRouteToService(B_RED);

let B_BLUE = new TRoute("B_BLUE", "Daly City - Dublin/Pleasanton");
B_BLUE.cal = B_Cal;
B_BLUE.stop_ids = ["B_DALY","B_BALB","B_GLEN","B_24TH","B_16TH","B_CIVC","B_POWL","B_MONT","B_EMBR","B_WOAK",
"B_LAKE","B_FTVL","B_COLS","B_SANL","B_BAYF","B_CAST","B_WDUB","B_DUBL"
];
addRouteToService(B_BLUE);

let B_BEIGE = new TRoute("B_BEIGE", "Coliseum - Oakland Airport");
B_BEIGE.cal = B_Cal;
B_BEIGE.stop_ids = ["B_OAKL","B_COLS"];
addRouteToService(B_BEIGE);
*/

let PATCO1 = new TRoute("PATCO1","Lindenwold - Philadelphia");
PATCO1.stop_ids = ["PATCO_1","PATCO_2","PATCO_3","PATCO_4","PATCO_5","PATCO_6","PATCO_7",
"PATCO_8","PATCO_9","PATCO_10","PATCO_11","PATCO_12","PATCO_13"];
PATCO1.cal = new TCalendar();
addRouteToService(PATCO1);

let PATCO_1 = new TTrip("PATCO_1", "PATCO Lindenwold", 1, "0123456");
PATCO_1.headsign = "Lindenwold";
PATCO_1.start_time = "6:30";
PATCO_1.end_time = "24:00";
PATCO_1.shape_id = "PAT1";
PATCO_1.times = ["-2:00","-2:02","-2:03","-2:06", "-2:08", "-2:10", "-2:12", "-2:15", "-2:16",
"-2:22", "-2:26", "-2:28"];
PATCO1.addTrip(PATCO_1);

let PATCO_2 = new TTrip("PATCO_2", "PATCO Philadelphia", 0, "0123456");
PATCO_2.headsign = "Philadelphia";
PATCO_2.start_time = "6:30";
PATCO_2.end_time = "24:00";
PATCO_2.shape_id = "PAT2";
PATCO_2.times = ["-2:00","-2:02","-2:06","-2:12", "-2:13", "-2:16", "-2:18", "-2:20", "-2:22",
"-2:25", "-2:26", "-2:28"];
PATCO1.addTrip(PATCO_2);


let SIF = new TRoute("SIF", "Staten Island Ferry");
SIF.stop_ids = ["SIF2", "SIF1"];
SIF.frequency = 15;
SIF.stop_names = ["Whitehall Ferry Termial -NY","St George Ferry Terminal -NY"]
addRouteToService(SIF);

let SIFT1 = new TTrip("SIFT1", "Staten Island Ferry Outbound", 0, "0123456");
SIFT1.headsign = "St George Ferry Terminal";
SIFT1.times = ["-2:00","-2:25"];
SIF.addTrip(SIFT1);

let SIFT2 = new TTrip("SIFT2", "Staten Island Ferry Inbound", 1, "0123456");
SIFT2.headsign = "Whitehall Ferry Terminal";
SIFT2.times = ["-2:00","-2:25"];
SIF.addTrip(SIFT2);

let SFF_Cal = new TCalendar();
let SFF1 = new TRoute("SFF1", "Larkspur / San Francisco Ferry");
SFF1.frequency = 60;
SFF1.cal = SFF_Cal;
SFF1.stop_ids = ["SFF10", "SFF11"];
addRouteToService(SFF1);

let SFF1_1 = new  TTrip("SFF1_1", "Larkspur / San Francisco Ferry Inbound", 0, "0123456");
SFF1_1.headsign = "San Francisco Ferry Building";
SFF1_1.times = ["-2:00", "-2:35"];
SFF1.addTrip(SFF1_1);

let SFF1_2 = new  TTrip("SFF1_2", "Larkspur / San Francisco Ferry Outbound", 1, "0123456");
SFF1_2.headsign = "Larkspur Ferry Terminal";
SFF1_2.times = ["-2:00", "-2:35"];
SFF1.addTrip(SFF1_2);

//eo_ACE_Routes.js

//eo_ACE_Routes.js

let ACE_Cal = new TCalendar();
ACE_Cal.lastUpdated = "07:00 AM Jan 23 2025";
ACE_Cal.gtfstz = "PacificTime";

ACE_Cal.addServiceDays("ACE_wk", "12345", 20241118,20260103, "", "20250120,20250217,20250331,20250526,20250619,20250704,20250901,20251111,20251126,20251128,20251129,20251224,20251225,20251226,20251231,20260101,20260102");
ACE_Cal.addServiceDays("ACE_H", "", 20241224,20260103, "20250120,20250217,20250331,20250619,20251111,20251126,20251224,20251231", "");


let ACE1 = new TRoute("ACE1", "ACE Train");
ACE1.cal = ACE_Cal;
addRouteToService(ACE1);
// eo_ACE3.js 04:25 AM Mar 10 2025

let ACE04 = new TTrip("ACE04", "ACE", 1, "");
ACE04.headsign = "Stockton";
ACE04.tid = "ACE04";
ACE04.short = "ACE";
ACE04.service_id = "ACE_wk";
ACE04.shape_id = "pv35";
ACE04.comp = [
{ s: "AMSSJC", d: "15:35"},{ s: "AMSSCC", d: "15:40"},{ s: "AMSGAC", d: "15:49"},{ s: "AMSFMT", d: "16:05"},{ s: "AMSPLS", d: "16:28"},{ s: "AMSLIV", d: "16:37"},{ s: "AMSVAS", d: "16:42"},{ s: "AMSTRC", d: "17:11"},{ s: "AMSLTM", d: "17:23"},{ s: "AMSSKT", d: "17:47"}
];
ACE1.addTrip(ACE04);

let ACE06 = new TTrip("ACE06", "ACE", 1, "");
ACE06.headsign = "Stockton";
ACE06.tid = "ACE06";
ACE06.short = "ACE";
ACE06.service_id = "ACE_wk";
ACE06.shape_id = "pv35";
ACE06.comp = [
{ s: "AMSSJC", d: "16:35"},{ s: "AMSSCC", d: "16:40"},{ s: "AMSGAC", d: "16:49"},{ s: "AMSFMT", d: "17:05"},{ s: "AMSPLS", d: "17:28"},{ s: "AMSLIV", d: "17:37"},{ s: "AMSVAS", d: "17:42"},{ s: "AMSTRC", d: "18:11"},{ s: "AMSLTM", d: "18:23"},{ s: "AMSSKT", d: "18:47"},
{ s: "AMSSJC", d: "16:35"},{ s: "AMSSCC", d: "16:40"},{ s: "AMSGAC", d: "16:49"},{ s: "AMSFMT", d: "17:05"},{ s: "AMSPLS", d: "17:28"},{ s: "AMSLIV", d: "17:37"},{ s: "AMSVAS", d: "17:42"},{ s: "AMSTRC", d: "18:11"},{ s: "AMSLTM", d: "18:23"},{ s: "AMSSKT", d: "18:47"}
];
ACE1.addTrip(ACE06);

let ACE08 = new TTrip("ACE08", "ACE", 1, "");
ACE08.headsign = "Stockton";
ACE08.tid = "ACE08";
ACE08.short = "ACE";
ACE08.service_id = "ACE_wk";
ACE08.shape_id = "pv35";
ACE08.comp = [
{ s: "AMSSJC", d: "17:35"},{ s: "AMSSCC", d: "17:40"},{ s: "AMSGAC", d: "17:49"},{ s: "AMSFMT", d: "18:05"},{ s: "AMSPLS", d: "18:28"},{ s: "AMSLIV", d: "18:37"},{ s: "AMSVAS", d: "18:42"},{ s: "AMSTRC", d: "19:11"},{ s: "AMSLTM", d: "19:23"},{ s: "AMSSKT", d: "19:47"}
];
ACE1.addTrip(ACE08);

let ACE01 = new TTrip("ACE01", "ACE", 0, "");
ACE01.headsign = "San Jose";
ACE01.tid = "ACE01";
ACE01.short = "ACE";
ACE01.service_id = "ACE_wk";
ACE01.shape_id = "u32g";
ACE01.comp = [
{ s: "AMSSKT", d: "4:10"},{ s: "AMSLTM", d: "4:29"},{ s: "AMSTRC", d: "4:41"},{ s: "AMSVAS", d: "5:10"},{ s: "AMSLIV", d: "5:15"},{ s: "AMSPLS", d: "5:23"},{ s: "AMSFMT", d: "5:45"},{ s: "AMSGAC", d: "6:03"},{ s: "AMSSCC", d: "6:10"},{ s: "AMSSJC", d: "6:22"}
];
ACE1.addTrip(ACE01);

let ACE03 = new TTrip("ACE03", "ACE", 0, "");
ACE03.headsign = "San Jose";
ACE03.tid = "ACE03";
ACE03.short = "ACE";
ACE03.service_id = "ACE_wk";
ACE03.shape_id = "u32g";
ACE03.comp = [
{ s: "AMSSKT", d: "5:35"},{ s: "AMSLTM", d: "5:54"},{ s: "AMSTRC", d: "6:06"},{ s: "AMSVAS", d: "6:35"},{ s: "AMSLIV", d: "6:40"},{ s: "AMSPLS", d: "6:48"},{ s: "AMSFMT", d: "7:10"},{ s: "AMSGAC", d: "7:28"},{ s: "AMSSCC", d: "7:35"},{ s: "AMSSJC", d: "7:47"},
{ s: "AMSSKT", d: "5:35"},{ s: "AMSLTM", d: "5:54"},{ s: "AMSTRC", d: "6:06"},{ s: "AMSVAS", d: "6:35"},{ s: "AMSLIV", d: "6:40"},{ s: "AMSPLS", d: "6:48"},{ s: "AMSFMT", d: "7:10"},{ s: "AMSGAC", d: "7:28"},{ s: "AMSSCC", d: "7:35"},{ s: "AMSSJC", d: "7:47"}
];
ACE1.addTrip(ACE03);

let ACE05 = new TTrip("ACE05", "ACE", 0, "");
ACE05.headsign = "San Jose";
ACE05.tid = "ACE05";
ACE05.short = "ACE";
ACE05.service_id = "ACE_wk";
ACE05.shape_id = "u32g";
ACE05.comp = [
{ s: "AMSSKT", d: "6:40"},{ s: "AMSLTM", d: "6:59"},{ s: "AMSTRC", d: "7:11"},{ s: "AMSVAS", d: "7:40"},{ s: "AMSLIV", d: "7:45"},{ s: "AMSPLS", d: "7:53"},{ s: "AMSFMT", d: "8:15"},{ s: "AMSGAC", d: "8:33"},{ s: "AMSSCC", d: "8:40"},{ s: "AMSSJC", d: "8:52"},
{ s: "AMSSKT", d: "6:40"},{ s: "AMSLTM", d: "6:59"},{ s: "AMSTRC", d: "7:11"},{ s: "AMSVAS", d: "7:40"},{ s: "AMSLIV", d: "7:45"},{ s: "AMSPLS", d: "7:53"},{ s: "AMSFMT", d: "8:15"},{ s: "AMSGAC", d: "8:33"},{ s: "AMSSCC", d: "8:40"},{ s: "AMSSJC", d: "8:52"}
];
ACE1.addTrip(ACE05);

let ACE07 = new TTrip("ACE07", "ACE", 0, "");
ACE07.headsign = "San Jose";
ACE07.tid = "ACE07";
ACE07.short = "ACE";
ACE07.service_id = "ACE_wk";
ACE07.shape_id = "u32g";
ACE07.comp = [
{ s: "AMSSKT", d: "7:32"},{ s: "AMSLTM", d: "7:51"},{ s: "AMSTRC", d: "8:03"},{ s: "AMSVAS", d: "8:32"},{ s: "AMSLIV", d: "8:37"},{ s: "AMSPLS", d: "8:45"},{ s: "AMSFMT", d: "9:07"},{ s: "AMSGAC", d: "9:25"},{ s: "AMSSCC", d: "9:32"},{ s: "AMSSJC", d: "9:44"}
];
ACE1.addTrip(ACE07);

let ACE06H = new TTrip("ACE06H", "ACE", 1, "");
ACE06H.headsign = "Stockton";
ACE06H.tid = "ACE06H";
ACE06H.short = "ACE";
ACE06H.service_id = "ACE_H";
ACE06H.shape_id = "pv35";
ACE06H.comp = [
{ s: "AMSSJC", d: "16:35"},{ s: "AMSSCC", d: "16:40"},{ s: "AMSGAC", d: "16:49"},{ s: "AMSFMT", d: "17:05"},{ s: "AMSPLS", d: "17:28"},{ s: "AMSLIV", d: "17:37"},{ s: "AMSVAS", d: "17:42"},{ s: "AMSTRC", d: "18:11"},{ s: "AMSLTM", d: "18:23"},{ s: "AMSSKT", d: "18:47"}
];
ACE1.addTrip(ACE06H);

let ACE03H = new TTrip("ACE03H", "ACE", 0, "");
ACE03H.headsign = "San Jose";
ACE03H.tid = "ACE03H";
ACE03H.short = "ACE";
ACE03H.service_id = "ACE_H";
ACE03H.shape_id = "u32g";
ACE03H.comp = [
{ s: "AMSSKT", d: "5:35"},{ s: "AMSLTM", d: "5:54"},{ s: "AMSTRC", d: "6:06"},{ s: "AMSVAS", d: "6:35"},{ s: "AMSLIV", d: "6:40"},{ s: "AMSPLS", d: "6:48"},{ s: "AMSFMT", d: "7:10"},{ s: "AMSGAC", d: "7:28"},{ s: "AMSSCC", d: "7:35"},{ s: "AMSSJC", d: "7:47"}
];
ACE1.addTrip(ACE03H);

let ACE05H = new TTrip("ACE05H", "ACE", 0, "");
ACE05H.headsign = "San Jose";
ACE05H.tid = "ACE05H";
ACE05H.short = "ACE";
ACE05H.service_id = "ACE_H";
ACE05H.shape_id = "u32g";
ACE05H.comp = [
{ s: "AMSSKT", d: "6:40"},{ s: "AMSLTM", d: "6:59"},{ s: "AMSTRC", d: "7:11"},{ s: "AMSVAS", d: "7:40"},{ s: "AMSLIV", d: "7:45"},{ s: "AMSPLS", d: "7:53"},{ s: "AMSFMT", d: "8:15"},{ s: "AMSGAC", d: "8:33"},{ s: "AMSSCC", d: "8:40"},{ s: "AMSSJC", d: "8:52"}
];
ACE1.addTrip(ACE05H);

let ACE02H = new TTrip("ACE02H", "ACE", 1, "");
ACE02H.headsign = "Stockton";
ACE02H.tid = "ACE02H";
ACE02H.short = "ACE";
ACE02H.service_id = "ACE_H";
ACE02H.shape_id = "pv35";
ACE02H.comp = [
{ s: "AMSSJC", d: "14:10"},{ s: "AMSSCC", d: "14:15"},{ s: "AMSGAC", d: "14:24"},{ s: "AMSFMT", d: "14:45"},{ s: "AMSPLS", d: "15:08"},{ s: "AMSLIV", d: "15:22"},{ s: "AMSVAS", d: "15:27"},{ s: "AMSTRC", d: "15:56"},{ s: "AMSLTM", d: "16:08"},{ s: "AMSSKT", d: "16:32"}
];
ACE1.addTrip(ACE02H);

let ACE02 = new TTrip("ACE02", "ACE", 1, "");
ACE02.headsign = "Stockton";
ACE02.tid = "ACE02";
ACE02.short = "ACE";
ACE02.service_id = "ACE_wk";
ACE02.shape_id = "pv35";
ACE02.comp = [
{ s: "AMSSJC", d: "14:10"},{ s: "AMSSCC", d: "14:15"},{ s: "AMSGAC", d: "14:24"},{ s: "AMSFMT", d: "14:45"},{ s: "AMSPLS", d: "15:08"},{ s: "AMSLIV", d: "15:22"},{ s: "AMSVAS", d: "15:27"},{ s: "AMSTRC", d: "15:56"},{ s: "AMSLTM", d: "16:08"},{ s: "AMSSKT", d: "16:32"},
{ s: "AMSSJC", d: "14:10"},{ s: "AMSSCC", d: "14:15"},{ s: "AMSGAC", d: "14:24"},{ s: "AMSFMT", d: "14:45"},{ s: "AMSPLS", d: "15:08"},{ s: "AMSLIV", d: "15:22"},{ s: "AMSVAS", d: "15:27"},{ s: "AMSTRC", d: "15:56"},{ s: "AMSLTM", d: "16:08"},{ s: "AMSSKT", d: "16:32"}
];
ACE1.addTrip(ACE02);


