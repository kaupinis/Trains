// eo_conn5.js
"use strict";

let Tchg = 120; // 2 minutes x 60
let afromroutes = "";
let atoroutes = "";
let fisbus = false;
let tisbus = false;
let bOtherStop = false;
let OtherStop = "";
let SPX = "";
let StrategyLevel = 0;
let MAXOPTIONS = 15;
let STRATEGIESMAX = 16;


class TripOption {
     constructor() {
       this.legs = []; // an array of Leg
       this.check = null;
     }
 }

class TransferPoint {
    
    constructor(froute, fstop, route, tstop, troute) {
      this.froute = froute;
      this.fstop = fstop;
      this.route = route;
      this.tstop = tstop;
      this.troute = troute;
    }
}

class TransferPoint2 {
    constructor(fromid, route0, t1id, route1, t2id, route2, toid) {
      this.fromid = fromid;
      this.route0 = route0;
      this.t1id = t1id;
      this.route1 = route1;
      this.t2id = t2id;
      this.route2 = route2;
      this.toid = toid;  
    }
}


class Leg {
   
   constructor() {
       this.children = [];
       this.startid = "";
       this.pstartid = "";
       this.starttime = "";
       this.destid = "";
       this.pdestid = "";
       this.desttime = "";
       this.direction_name = "";
       this.tripleg = ""; 
       this.routeid = "";
       this.routeS = "";
       
   }
   
   isEqual(leg2) {
     let b = false;
     if((this.startid == leg2.startid) && (this.destid == leg2.destid) && (this.routeS == leg2.routeS))
     {
       b = true;   
     }
     else if(this.children.length == leg2.children.length)
     {
       let k =  this.children.length;
       let i = 0
       while(!b && (i < k))
       {
         let lc1 = this.children[i];
         let lc2 = leg2.children[i];
         b = lc1.isEqual(lc2);
         i += 1;
       }
     }
     return(b);   
   }
   
   init() {
     if(this.routeS != null) this.routeid = this.setRouteS(this.routeS);
     let p1 = getPositionForId(this.startid);
     if(p1 == null) p1 = getPositionForName(this.startid);
     if((p1 == null) && (this.startid.indexOf("place-") == 0)) p1 = getPositionForParent(this.startid);
     let p2 = getPositionForId(this.destid);
     if(p2 == null) p2 = getPositionForName(this.destid);
     if((p2 == null) && (this.destid.indexOf("place-") == 0)) p2 = getPositionForParent(this.destid);
     if(p1 == null) report("22 p1 null for " + this.startid); 
     else if(p2 == null) report("23 p2 null for " + this.destid); 
     else this.dist = Math.round(10 * getDistanceBetween(p1.x, p1.y, p2.x, p2.y)) / 10;
   }
   
   hasChildren() {
     return(this.children.length > 0);    
   }
 
   addChild(leg) {
     this.children[this.children.length] = leg;    
   }
 
   addLeg(leg) {
     if(leg.children.length > 0)
     {
       let k = leg.children.length;
       let i = 0;
       while(i < k)
       {
         this.children.push(leg.children[i]);
         i += 1;
       }
     }
     else if(leg.startid != "")
     {
       this.children.push(leg);
     }
   }
 
   preAddLeg(leg) {
     if(leg.children.length > 0)
     {
       let k = leg.children.length - 1;
       while(k >= 0)
       {
         this.children.unshift(leg.children[k]);
         k -= 1;
       }
     }
     else
     {
       this.children.unshift(leg);
     }
   }
 
   getChild(i) {
     let c = null;
     if((i >=0) && (i < this.children.length))
     {
       c = this.children[i];    
     }
     return(c);
   }
 
   removeChildren() {
     clearArray(this.children);   
   }
 
   update() {
     if(this.routeS != null)
     {
     let sx = this.routeS.toString();
     if(sx != null) 
     {
       if(sx.indexOf(",") == -1) 
       {
         this.routeid = getRouteIdForS(sx);
         if(this.routeid == "") this.routeid = sx;
       }
       else
       {
         let sa = sx.split(",");
         let s = "";
         let i = 0;
         while(i < 1) // !
         {
           if(i != 0) s += ",";
           let ss = getRouteIdForS(sa[i]);
           if(ss == "") ss = sa[i];
           s += ss;
           i += 1;
         }
         this.routeid = s;
         report("leg update c routeid = " + s);
       }
     }
     }
     else report("leg update this.routeS == null");
   }
 
 
   setRouteS(sid) {
     this.routeS = sid.toString();
     let j = this.routeS.indexOf(",");
     if(j != -1)
     {
       this.routeid = this.routeS.substring(0,j);
     }
     else
     {
       this.routeid = getRouteIdForS(sid);
       if(sid == "S1") this.routeid = "741";
       else if(sid == "SL2") this.routeid = "742";
       if(this.routeid == "") this.routeid = sid;
     }
   }

   clone() {
     let d = this.routeid;
     let c = null;
     if(this.children.length > 0 )
     {
       c = new Leg();
       let k = this.children.length;
       let i = 0;
       while(i < k)
       {
         let l = this.children[i].clone();
         c.addLeg(l);
         i += 1;
       }
     }
     else 
     {
       c = makeLeg(this.startid, this.starttime, this.destid, this.desttime, this.tripleg, this.routeS);
      c.routeid = d;
     }
     return(c);
   }
 
   isRedundant(strategy) {
     let b = false;
     if(!this.hasChildren())
     {
       let k = strategy.length;
       let i = 0;
       while(!b && (i < k))
       {
         let l1 = strategy[i];
         if(this.routeS == l1.routeS) b = true;
         i += 1;
       }
     }
     else
     {
       let a = this.children;
       let k2 = a.length;
       let k = strategy.length;
       let i = 0;
       while(!b && (i < k))
       {
         let l1 = strategy[i];
         let j = 0;
         while(!b && (j < k2))
         {
           if(a[j].routeS == l1.routeS) b = true;
           j += 1;
         }
         i += 1;
       }
    }
    if(b) report("281 Leg isRedundant");
    return(b);
   }

   isDuplicate(strategy) {
     let b = false;
     if(this.pstartid == "") this.pstartid = getParentIdFromId(this.startid);
     if(this.pdestid == "")  this.pdestid == getParentIdFromId(this.destid);
     if(!this.hasChildren())
     {
       let k = strategy.length;
       let i = 0;
       while(!b && (i < k))
       {
         let l1 = strategy[i];
         if(l1.pstartid == "") l1.pstartid = getParentIdFromId(l1.startid);
         if(l1.pdestid == "")  l1.pdestid == getParentIdFromId(l1.destid);
         if((this.pstartid == l1.pstartid) && (this.pdestid == l1.pdestid) && (this.routeS == l1.routeS))
         {
           b = true;   
         }
       if(this.routeS == l1.routeS) b = true;
       i += 1;
       }
     }
     else
     {
       let a = this.children;
       let k2 = a.length;
       let k = strategy.length;
       let i = 0;
       while(!b && (i < k))
       {
         let l1 = strategy[i];
         if(l1.pstartid == "") l1.pstartid = getParentIdFromId(l1.startid);
         if(l1.pdestid == "")  l1.pdestid == getParentIdFromId(l1.destid);
         let j = 0;
         while(!b && (j < k2))
         {
           if((a[j].pstartid == l1.pstartid) && (a[j].pdestid == l1.pdestid) && (a[j].routeS == l1.routeS))
           {
             b = true;   
           }
           if(a[j].routeS == l1.routeS) b = true;
           j += 1;
         }
         i += 1;
       }
     }
     return(b);
   }
 
 } // end of class Leg
 
 
// Generic Legs Record

class GLR {
    
    constructor(fromid, fromroutes, toid, toroutes, strategies, strategy, lastleg, bEnd) {
      this.fromid = fromid;
      this.pfromid = getParentIdFromId(this.fromid);
      this.fromroutes = fromroutes;
      this.toid = toid;
      this.ptoid = getParentIdFromId(this.toid);
      this.toroutes = toroutes;
      this.strategies = strategies;
      this.cfromid = this.pfromid;
      this.pcfromid = this.pfromid;
      this.ctoid = this.ptoid;
      this.pctoid = this.ptoid;
      this.cfromroutes = this.fromroutes;
      this.ctoroutes = this.toroutes;
      this.strategy = strategy;
      this.lastleg = lastleg;
      this.bEnd = bEnd;
    }
    
    setCurrentFromId(id) {
      this.cfromid = id;
      this.pcfromid = getParentIdFromId(id);
    }
    
    setCurrentToId(id) {
      this.ctoid = id;
      this.pctoid = getParentIdFromId(id);
    }
    
    getCurrentFromId() {
      return(this.cfromid);  
    }
    
    getCurrentToId() {
      return(this.ctoid);  
    }
    
    getCurrentFromIdP() {
      return(this.pcfromid);  
    }
    
    getCurrentToIdP() {
      return(this.pctoid);  
    }
    
    addStrategy(s){
      let b = this.isDuplicateStrategy(s);
      let b1 = (this.strategies.length < STRATEGIESMAX);
      if(!b && b1)
      {
        report("  1331 glr addStrategy " + this.strategies.length);
        this.strategies.push(s);
      }
      return(b1);
    }
    
    getLastLeg(n) {
      let z = null;
      if(this.lastleg != null)
      {
        let k = this.lastleg.children.length;
        if(n < k)
        {
          z = this.lastleg.children[n];   
        }
      }
      return(z);  
    }
    
    isDuplicateStrategy(s) {
      let b = true;
      let k = this.strategies.length;
      if((k == 0) || (s.length == 0)) b = false;
      let i = 0;
      while(b && (i < k))
      {
        let s2 = this.strategies[i];
        if(s.length != s2.length) b = false;
        else
        {
          for(let j=0; j< s.length; j++)
          {
            let L1 = s[j];
            let L2 = s2[j];
            if((typeof L1 !== 'undefined') && (typeof L2 !== 'undefined')) b = b && L1.isEqual(L2);
          }
        }
        i += 1;
      }
      return(b);
    }
    
  }  // end of class GLR


 
function makeLeg(startid, starttime, destid, desttime, trip, routeS)
{
//   report("makeLeg " + startid + " " + destid + " " + routeS );
  let k =  new Leg();
  k.startid = startid; 
  k.starttime = starttime;
  k.destid = destid;
  k.desttime = desttime;
  k.tripleg = trip;
  k.routeS = routeS;
  k.init();
  return(k);
}
 
 function addLegToStrategy(strategy, leg)
 {
//     report("addLegToStrategy " + leg.startid + ", " + leg.destid);
   if(!leg.isDuplicate(strategy))
   {
   if((leg != null) && (leg.hasChildren() || (getParentIdFromId(leg.startid) != getParentIdFromId(leg.destid))))
   {
//    report("addLegToStrategy " + leg.startid + ", " + leg.destid);
    if(leg.hasChildren())
    {
//     report("   leg.children.length = " + leg.children.length);
     let k = leg.children.length;
     let i = 0;
     while(i < k)
     {
       let lc = leg.children[i];
       if(lc.pstartid == "") lc.pstartid = getParentIdFromId(lc.startid);
       if(lc.pdestid == "")  lc.pdestid == getParentIdFromId(lc.destid);
       if((lc.startid != "") && (lc.destid != "") && (lc.pstartid != lc.pdestid))
       {
//         report("265 addLegToStrategy " + lc.startid + ", " + lc.destid + ", " + lc.routeS);
         strategy.push(leg.children[i]);
       }
       i += 1;
     }
    }
    else if(leg.startid != "") 
    {
      report("  273 addLegToStrategy " + leg.startid + ", " + leg.destid + ", " + leg.routeS);
      if(leg.pstartid == "") leg.pstartid = getParentIdFromId(leg.startid);
      if(leg.pdestid == "")  leg.pdestid == getParentIdFromId(leg.destid);
      strategy.push(leg);
    }
   }
   }
//   else report("addLegToStrategy error: leg.startid == leg.destid");
   return(strategy);
 }

 function cloneStrategy(st1)
 {
   let st2 = [];
   let k = st1.length;
   let i = 0;
   while(i < k)
   {
     st2[st2.length] = st1[i].clone();
     i += 1;
   }
   return(st2);   
 }
 
  
 const TFHINSEC = 24 * 60 * 60;
 
  function checkTripOption(t)
 {
   let check = {
       b: true,
       wait_time: 0,
       duration: 0
       };
   let b = true;
   let lastlegdesttime = 0;
   let lastleg = null;
   let duration = 0;
   let wait_time = 0;
   let legstart = 0;
   let k = t.legs.length;
   if(k <= 0) b = false;
   else
   {
     let i = 0;
     while(i < k)
     {
       let leg = t.legs[i];
       let trs = Number(leg.starttime) + 60 * getTZOffset(leg.startid);
       let trd = Number(leg.desttime) +  60 * getTZOffset(leg.destid);
       duration += trd - trs;
       let ts = leg.starttime;
//       report("leg.starttime = " + leg.starttime);
//       report("leg.desttime = " + leg.desttime);
       if(trs > TFHINSEC)
       {
//         trs = trs % TFHINSEC;   
       }
/*
       if(i == 0) report("a " + trs + " " + duration + " " + leg.starttime + " " + getTZOffset(leg.startid));
       if(i == 1) report("b " + trs + " " + duration + " " + leg.starttime + " " + leg.desttime);
*/
       let ctime = (trs - lastlegdesttime) / 60; // minutes
       if(ctime < 0) 
       {
 //        b = false;   
       }
       if(lastleg != null)
       {
         let tl = trs - lastlegdesttime;
         if(tl < 0)
         {
           tl +=  TFHINSEC;  
         }
         wait_time += tl;
         duration +=  tl;  
       }
       lastleg = leg;
       lastlegdesttime = trd;
       i += 1;
     }
     check.b = b;
     check.wait_time = wait_time;
     check.duration = duration;
     t.check = check;
   }
   return(b);   
 }
 
class Connections {
    
    constructor(startid, destid, datetime, startmode, startindex, destmode, destindex) {
      this.startid = startid;
      this.destid = destid;
      this.datetime = datetime;
      this.startmode = startmode;
      this.startindex = startindex;
      this.destmode = destmode;
      this.destinex = destindex;
   
      this.startcnx = "";
      this.destcnx = "";
      this.tripsstart = [];
      this.tripsdest = [];
      this.skedtripstart = null;
      this.skedtripdest = null;
      this.cp = null;
      this.sked_start = null;
      this.sked_dest = null;
      this.routes_start = null;
      this.routes_dest = null;
      this.common_routes = [];
      this.Strategies = [];
      this.trips = [];
      this.stops = [];
      this.TripOptions = []; // an array of trip options
    }
   
}

//let ctnx = null;
let ctnxcpr = null;

function CConnection(route, stopid, d)
{
  this.route = route;
  this.stopid = stopid;
  this.d = d;
}

function getClosestConnection(fromid, fromroutes, toid)
{
  report("getClosestConnection " + fromid + " " + fromroutes + " " + toid);
  let f = fromroutes.split(",");
  let k = f.length;
  let i = 0;
  let ts = "";
  let ix = -1;
  let iy = "";
  let d = 1000;
  let pid = getParentIdFromId(toid);
  report("ccs pid = " + pid);
  let p1 = getPositionForId(fromid);
  while(i < k)
  {
    let tt = getTransferStopsFor(f[i]);
    report(" i = " + i + " " + f[i] + " " + tt.length);
    if((tt != "") && (tt.indexOf(pid) != -1 ))
    {
      d = 0;
      iy = pid;
      ix = 0;
    }
    else if(tt != "")
    {
    let g = tt.split(",");
    let kk = g.length;
    report("g.length = " + kk);
    let ii = 0;
    while(ii < kk)
    {
      let p2 = getPositionForId(g[ii]); 
      if(p2 != null)
      {
        let d2 = getDistanceBetween(p1.x, p1.y, p2.x, p2.y);
        if(d2 < d)
        {
          d = d2;
          ix = i;
          iy = g[ii];
        }
      }
      else report("218 p2 position null for " + g[ii]);
      ii += 1;
    }
    }
    i += 1;
  }
  let c = null;
  if(ix != -1 )
  {
    c = new CConnection(f[ix], iy, d);   
  }
  return(c);
}

function getClosestConnection2(fromid, fromroutes, toid)
{
//  report("getClosestConnection2 " + fromid + " " + fromroutes + " " + toid);
  let f = fromroutes.split(",");
  let k = f.length;
  let i = 0;
  let ts = "";
  let ix = -1;
  let iy = "";
  let d = 1000;
  let pid = getParentIdFromId(toid);
//  report("ccs pid = " + pid);
  let p1 = getPositionForId(toid);
  while(i < k)
  {
    let tt = getTransferStops(f[i]);
//    report(" i = " + i + " " + f[i] + " " + tt.length + " " + tt[0]);
    if(tt.length == 0) report("no transfer stops for route " + f[i]);
    else if((tt[0] != "") && (tt[0].indexOf(pid) != -1 ))
    {
      d = 0;
      iy = pid;
      ix = 0;
    }
    else if(tt[0] != "")
    {
    let g = tt;  //.split(",");
    let kk = g.length;
    let ii = 0;
    while(ii < kk)
    {
      let p2 = getPositionForId(g[ii]); 
      if(p2 != null)
      {
        let d2 = getDistanceBetween(p1.x, p1.y, p2.x, p2.y);
        if(d2 < d)
        {
          d = d2;
          ix = i;
          iy = g[ii];
        }
      }
      else report("219 p2 position null for " + g[ii]);
      ii += 1;
    }
    } 
    i += 1;
  }
  let c = null;
  if(ix != -1 )
  {
    c = new CConnection(f[ix], iy, d);   
  }
  return(c);
}


function getLegsNY(fromid, toid)
{
  let Legs = new Leg();
  let pfromid = getParentIdFromId(fromid);
  let ptoid = getParentIdFromId(toid);
  let fromroutes = getRoutesS(pfromid);
  let toroutes = getRoutesS(ptoid);
  
  let cr = getCommonRoutesS(fromroutes, toroutes);
  let kx = cr.length;
  report("getLegsNY " + fromid + " " + toid + " " + kx);
  report("getLegsNY " + pfromid + " " + ptoid + " " + fromroutes + " " + toroutes);
  if((kx > 0) && (pfromid != ptoid))
  {
      report("427 " + fromid + " " + toid);
    Legs.addLeg(makeLeg(fromid, 0, toid, 0, null, cr[0]));
  }
  else
  {
    let fr = getNY(fromroutes);
    let tr = getNY(toroutes);
    report("filtered fromroutes = " + fr);
    report("filtered toroutes = " + tr);
    let tps = getTransferPoints(pfromid, fr, ptoid, tr);
    let tp = null;
    if(tps.length > 0) 
    {
        report("got " + tps.length + " transfer points");
        tp = tps[0];
    }
    if(tp != null)
    {
      if(pfromid != getParentIdFromId(tp.fstop))
      {
        Legs.addLeg( makeLeg(pfromid, 0, tp.fstop, 0, null, tp.froute));
      }
      if(tp.fstop != tp.tstop)
      {
        Legs.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
//        report("451 " + tp.tstop + " " + toid);
        Legs.addLeg( makeLeg(tp.tstop, 0, toid, 0, null, tp.troute));
      }
      else if(getParentIdFromId(tp.fstop) != getParentIdFromId(ptoid))
      {
        report("456 " + tp.fstop + " " + toid);
        Legs.addLeg( makeLeg(tp.fstop, 0, ptoid, 0, null, tp.troute));          
      }
    }
  }
  
  return(Legs);
}

function getNY(routes)
{
  let a = routes.split(",");
  let k = a.length;
  let i = 0;
  let st = "";
  let bFirst = true;
  while(i < k)
  {
    if(a[i].indexOf("NY") == 0)
    {
      if(bFirst) bFirst = false;
      else st += ",";
      st += a[i];
    }
    i += 1;
  }
  return(st);
}

function getBRHub(xid)
{
  let px = getPositionForId(xid);
  let p1 = getPositionForId("place-springf");
  let d1 = getDistanceBetween(px.lat, px.lon, p1.lat, p1.lon);
  let p2 = getPositionForId("place-pabt");
  let d2 = getDistanceBetween(px.lat, px.lon, p2.lat, p2.lon);
  let p3 = getPositionForId("Albany-Rensselaer-NY");
  let d3 = getDistanceBetween(px.lat, px.lon, p3.lat, p3.lon);
  let hub = "place-springf";
  if(d2 < d1) hub = "place-pabt";
  if((d3 < d1) && (d3 < d2)) hub = "Albany-Rensselaer-NY";
  return(hub);
}

function getCommonLegs(glr)
{
  let pfid = glr.getCurrentFromIdP();
  let ptid = glr.getCurrentToIdP();
  let fr = getRoutesS(pfid);
  let tr = getRoutesS(ptid);
  let cr = getCommonRoutesS(fr, tr);
  let kr = cr.length;
  report("fr = " + fr);
  report("kr = " + kr);
  report("tr = " + tr);
  report("bf = " + bf + " bt = " + bt);
  if(kr > 0)
  {
    let i = 0;
    while(i < kr)
    { 
      let Stg = cloneStrategy(glr.strategy);
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, glr.toid, 0, null, cr[i]));
      if(glr.lastleg == null) glr.lastleg = new Leg();
      addLegToStrategy(Stg, glr.lastleg);
      glr.addStrategy(Stg);
      i += 1;
    }
    glr.bEnd = true;
  }
  return(glr);    
}


function getLegsChicago(glr)
{
  if(glr.fromid == glr.toid) return(glr); 
  let bf = (glr.fromroutes.indexOf("ME_") != -1) || (glr.fromroutes.indexOf("CG") != -1);
  let bt = (glr.toroutes.indexOf("ME_") != -1) || (glr.toroutes.indexOf("CG") != -1);
  let bfs = (glr.fromroutes.indexOf("SSL") != -1);
  let bts = (glr.toroutes.indexOf("SSL") != -1);
  if(!(bf || bfs) && !(bt || bts)) return(glr);
  
  let pfid = getParentIdFromId(glr.fromid);
  let ptid = getParentIdFromId(glr.toid);
  let fr = getRoutesS(pfid);
  let tr = getRoutesS(ptid);
  let cr = getCommonRoutesS(fr, tr);
  let kr = cr.length;
  report("fr = " + fr);
  report("kr = " + kr);
  report("tr = " + tr);
  report("bf = " + bf + " bt = " + bt);
  if(kr > 0)
  {
    let i = 0;
    while(i < kr)
    { 
      let Stg = cloneStrategy(glr.strategy);
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, glr.toid, 0, null, cr[i]));
      if(glr.lastleg == null) glr.lastleg = new Leg();
      addLegToStrategy(Stg, glr.lastleg);
      glr.addStrategy(Stg);
      i += 1;
    }
    glr.bEnd = true;
    return(glr);
  }
  let Stg = [];
  let bfm = (glr.fromroutes.indexOf("ME_ME") != -1) || (glr.fromroutes.indexOf("SSL") != -1);
  let btm = (glr.toroutes.indexOf("ME_ME") != -1) || (glr.toroutes.indexOf("SSL") != -1);
  if(bfm && (pfid != "place-millenium"))
  {
      let rt = "ME_ME";
      if(glr.fromroutes.indexOf("ME_ME") != -1) ;
      else rt = "SSL1";
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, "place-millenium", 0, null, rt));
      addLegToStrategy(Stg,  makeLeg("CG41700", 0, "CG40040", 0, null, "CTA_Pink"));
      glr.fromid = "place-chicago";
  }
  if(btm && (ptid != "place-millenium"))
  {
      let rt = "ME_ME";
      if(glr.toroutes.indexOf("ME_ME") != -1) ;
      else rt = "SSL1";
      addLegToStrategy(Stg, makeLeg("CG40040", 0, "CG41700", 0, null, "CTA_Org"));
      addLegToStrategy(Stg, makeLeg("place-millenium", 0, glr.toid, 0, null, rt));
      glr.toid = "place-chicago";    
      glr.addStrategy(Stg);
      glr.bEnd = true;

  }
  
  return(glr);  
}


function getLegsBR(glr)
{
  if(glr.fromid == glr.toid) return(glr); 
  let bf = (glr.fromroutes.indexOf("BRTA") != -1);
  let bt = (glr.toroutes.indexOf("BRTA") != -1);
  if(!bf && !bt) return(glr);
  report("getLegsBR :" + glr.fromid + ": :" + glr.toid + ":");
  let pfid = getParentIdFromId(glr.fromid);
  let ptid = getParentIdFromId(glr.toid);
  let fr = getRoutesS(pfid);
  let tr = getRoutesS(ptid);
  let cr = getCommonRoutesS(fr, tr);
  let kr = cr.length;
  report("fr = " + fr);
  report("kr = " + kr);
  report("tr = " + tr);
  report("bf = " + bf + " bt = " + bt);
  if(kr > 0)
  {
    let i = 0;
    while(i < kr)
    { 
      let Stg = cloneStrategy(glr.strategy);
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, glr.toid, 0, null, cr[i]));
      if(glr.lastleg == null) glr.lastleg = new Leg();
      addLegToStrategy(Stg, glr.lastleg);
      glr.addStrategy(Stg);
      i += 1;
    }
    glr.bEnd = true;
    return(glr);
  }
  if(bf && bt)
  {
    let tps = getTransferPoints(pfid, fr, ptid, tr);
    let tp = null;
    let leg = new Leg();
    if(tps.length > 0) 
    {
        report("got " + tps.length + " transfer points");
        tp = tps[0];
    }
    else report("got no transfer points " + pfid + " " + ptid);
    if(tp != null)
    {
      if(pfid != getParentIdFromId(tp.fstop))
      {
        leg.addLeg( makeLeg(glr.fromid, 0, tp.fstop, 0, null, tp.froute));
      }
      if(tp.fstop != tp.tstop)
      {
        leg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        leg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      else
      {
        leg.addLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute));          
      }
    
    addLegToStrategy(glr.strategy, leg);
    addLegToStrategy(glr.strategy, glr.lastleg);
    glr.addStrategy(glr.strategy);
    glr.bEnd = true;
    return(glr);
   }
  }
  if(bf && !bt)
  {
    let hub = getBRHub(ptid);
    report("hub = " + hub);
    let fh = getRoutesS(hub);
    let tps = getTransferPoints(pfid, fr, hub, fh);
    let tp = null;
    let leg = new Leg();
    if(glr.lastleg == null) glr.lastleg = new Leg();
    if(tps.length == 0) 
    {
    
    }
    else
    {
      let tp = tps[0];
      report("tp.fstop = " + tp.fstop + " tp.tstop = " + tp.tstop);
      if(tp.fstop != tp.tstop)
      {
        report("got here 573");
        addLegToStrategy(glr.strategy, makeLeg(glr.fromid, 0, tp.fstop, 0, null, fr));
        addLegToStrategy(glr.strategy, makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.troute));
      }
      else
      {
        report("got here 579");
        addLegToStrategy(glr.strategy, makeLeg(glr.fromid, 0, hub, 0, null, fr));          
      }
      glr.fromid = hub;
      glr.fromroutes = fh;
    }
    return(glr);
  }
  if(!bf && bt)
  {
    let hub = getBRHub(pfid);
    let hr = getRoutesS(hub);
    report("hub = " + hub);
    let tps = getTransferPoints(hub, hr, ptid, tr);
    let tp = null;
    let leg = new Leg();
    if(glr.lastleg == null) glr.lastleg = new Leg();
    if(tps.length == 0) 
    {
      report("got no transfer points " + pfid + " " + ptid);
      fr = getRoutesS(hub);
      let cr = getCommonRoutesS(fr, tr);
      let kx = cr.length;
      report("cr.length = " + cr.length + " " + glr.toid + " " + cr[0]);
      if(kx > 0)
      {
        glr.lastleg.addLeg( makeLeg(hub, 0, glr.toid, 0, null, cr[0]));   
        glr.toid = hub;
        glr.toroutes = getRoutesS(hub);
        return(glr);
      }
    }
    if(tps.length > 0) 
    {
      report("got " + tps.length + " transfer points, using only 1");
      tp = tps[0];
      
      if(tp.fstop != tp.tstop)
      {
        glr.lastleg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        glr.lastleg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      else
      {
        glr.lastleg.addLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute));          
      }
      
      glr.toid = tp.tstop;
      glr.toroutes = getRoutesS(glr.toid);
    
      return(glr);
    }
  }
  return(glr);
}

function addUniqueElement3(a, e)
{
  let b = true;
  let i = 0;
  let k = a.length;
  while(b && (i < k))
  {
    let e1 = a[i];
    if((e1.stopid == e.stopid) && (e1.route == e.route) && (e1.froute == e.froute)) b = false;
    if(e.stopid == e.fstopid) b = false;
    i += 1;
  }
  if(b) a.push(e);
}

function TPA(stopid, routeid, fstopid, froute)
{
  this.stopid = stopid; // second stopid
  this.route = routeid; // route from fstopid to stopid
  this.fstopid = fstopid;  // first stopid
  this.froute = froute;    // route from fromid to fstopid
}

// tstps = transfer stops for exstp
function getSecondLevelTransferPoints(a, tstps, exstp, froute)
{
  let i1 = 0;
  let k1 = tstps.length;
  let pexstp = getParentIdFromId(exstp);
  for(i1 = 0; i1 < k1; i1++)
  {
    if(pexstp != getParentIdFromId(tstps[i1]))
    {
      let rts = getRoutesS(tstps[i1]).split(",");
      let i2 = 0;
      let k2 = rts.length;
      for(i2 = 0; i2 < k2; i2++)
      {
        let stps = getTransferStops(rts[i2]);
        let i3 = 0;
        let k3 = stps.length;
        for(i3 = 0; i3 < k3; i3++)
        {
          if(getParentIdFromId(stps[i3]) != getParentIdFromId(tstps[i1]))
          {
            let t = new TPA(stps[i3], rts[i2], tstps[i1], froute);
            if(pexstp != getParentIdFromId(stps[i3])) addUniqueElement3(a, t);
          }
        }
      }
    }
  }
}


function getTransferPoints2(fromid, fromroutes, toid, toroutes)
{
  let ftps = []; 
  let ttps = [];
  let tp2 = [];
  let fr =  fromroutes.split(",");
  let tr =  toroutes.split(",");
  let i1 = 0;
  let k1 = fr.length;
//  report("983 " + k1 + " " + fromroutes);
  for(i1 = 0; i1 < k1; i1++)
  {
    getSecondLevelTransferPoints(ftps, getTransferStops(fr[i1]), fromid, fr[i1]);
  }
/*  for(i1 = 0; i1 < ftps.length; i1++)
  {
//    report("920 " + ftps[i1].stopid + " " + ftps[i1].route + " " + ftps[i1].fstopid);
    report("990 " + ftps[i1].fstopid+ " " + ftps[i1].froute + " " + ftps[i1].stopid + " " + ftps[i1].route);
  }
  */
  let lts = [];
  k1 = tr.length;
  for(i1 = 0; i1 < k1; i1++)
  {
    let stps2 = getTransferStops(tr[i1]);
    let k2 = stps2.length;
    let i2 = 0;
    for(i2 = 0; i2 < k2; i2++)
    {
      let t = new TPA(stps2[i2], tr[i1], toid, null);
      addUniqueElement3(lts, t);
    }
  }
 /* for(i1 = 0; i1 < lts.length; i1++)
  {
//    report("929 " + ttps[i1].stopid + " " + ttps[i1].route + " " + ttps[i1].fstopid);
    report("929 " + lts[i1].stopid + " " + lts[i1].route + " " + lts[i1].fstopid);
  }
  */
//  report("919 " + ftps.length + " " + ttps.length);
  let b = false;
  k1 = ftps.length;
  let k2 = lts.length;
  i1 = 0;
  if((k1 != 0) && (k2 != 0))
  {
    while(!b && (i1 < k1))
    {
      let i2 = 0;
      let stp1 = ftps[i1].stopid;
      while(!b && (i2 < k2))
      {
        if(stp1 == lts[i2].stopid)
        {
 //         b = true;
 //         report("934 " + fromid + " " + ftps[i1].froute + " " + ftps[i1].fstopid + " " + ftps[i1].route + " " +  ftps[i1].stopid + " " + lts[i2].route + " " + toid);
          let tp = new TransferPoint2(fromid, ftps[i1].froute, ftps[i1].fstopid, ftps[i1].route, ftps[i1].stopid, lts[i2].route, toid);
          tp2.push(tp);
        }
        i2 += 1;
      }
      i1 += 1;
    }
  }
  return(tp2);
}

function getTransferPoints(fromid, fromroutes, toid, toroutes)
{
  report("  getTransferPoints from " + fromid + ": " + fromroutes + "\nto " + toid + ": " + toroutes);
  let tps = [];
  let tp = null;
  let fstps = [];
  let fstpr = [];
  let frts = [];
  let tstps = [];
  let tstpr = [];
  let trts = [];
  let pfid = getParentIdFromId(fromid);
  let ptid = getParentIdFromId(toid);
  if(pfid != ptid)
  {
  let a = fromroutes.split(",");
  let k = a.length;
  let i = 0;
  let b = false;
  while(!b && (i < k)) // for each route at fromid
  {
    let r = a[i];
    // for each transfer stop on the route
    let stps = getTransferStops(r);
    let kk = stps.length;
//    report("  transfer stops from " + r + " = " + kk);
    let ii = 0;
    let b1 = true;
    while(ii < kk)
    {
      let stp = getParentIdFromId(stps[ii]);
      if((stp != pfid) && (stp != ptid))
      {
        let rts = getRoutesS(stp);
        fstps.push(stp);    // potential transfer stops
        fstpr.push(r);      // fromid route
        frts.push(rts);     // routes at transfer stop
      }
      ii += 1;
    }
    i += 1;
  }
  
  a = toroutes.split(",");
  k = a.length;
  i = 0;
  b = false;
  while(!b && (i < k)) // for each route at toid
  {
    let r = a[i];
    // for each tranfer stop on the route
    let stps = getTransferStops(r);
    let kk = stps.length;
//     report("  transfer stops for route " + r + " = " + kk);
    let ii = 0;
    let b1 = true;
    while(ii < kk)
    {
      let stp = getParentIdFromId(stps[ii]);
      if((stp != ptid) && (stp != pfid))
      {
        let rts = getRoutesS(stp);
//      report(":" + stp + " : " + rts);
        tstps.push(stp);
        tstpr.push(r);
        trts.push(rts);
      }
      ii += 1;
    }
    i += 1;
  }
  
  /*
  k = fstps.length
  i = 0;
  let kk = tstps.length;
  let j = 0;
  b = false;
  let cs = [];
  while(!b && (i < k))
  {
    let cs1 = fstps[i];
    let b1 = false;
    while(!b1 &&(j < kk))
    {
      if(cs1 == tstps[j)
      {
        b1 = true;
        cs.push(j);
      }
      else j += 1;
    }
    i += 1;
  }
  if(cs.length > 0)
  {
    tp = new TransferPoint(fstpr[i], fstps[i], ck[ii], fstps[i], ck[ii]); 
       
  }
  */
  
  // find common routes between frts and trts
  report("916 fstps = " + fstps.length + " tstps = " + tstps.length + " " + trts.length + " " + tstpr.length);
  k = frts.length;
  i = 0;
  b = false;
  while(!b && (i < k))
  {
    let ck = [];
    let f7 = getParentIdFromId(fstps[i]);
    let t7 = getParentIdFromId(toid);
    if(f7 != t7) ck = getCommonRoutesSS(f7, t7);

    if(ck.length == 0) 
    {
        /*
      let b2 = false;
      let k2 = tstps.length;
      let i2 = 0;
      while(!b && (i2 < k2))
      {
        t7 = getParentIdFromId(tstps[i2]);
        if(f7 != t7) ck = getCommonRoutesSS(f7, t7);
        if(ck.length != 0)
        {
            
             TransferPoint(froute, fstop, route, tstop, troute)
        }
        i2 += 1;
      }
      */
    }
    else
    {
      let ii = 0;
      let kk = ck.length;
//      report("ck.length = " + kk);
      while(ii < kk)
      {
//            report("found match2 " + fstpr[i] + " " +fstps[i]+ " " + ck[ii] + " " + fstps[i] + " " + ck[ii]);
        tp = new TransferPoint(fstpr[i], fstps[i], ck[ii], fstps[i], ck[ii]); 
//        tp = new TransferPoint(fstpr[i], fstps[i], ck[ii], t7, ck[ii]); 
        tps.push(tp);
        ii += 1;
      }
 //     b = true;
    }
    i += 1;
  }
  }
//  report("  tps.length = " + tps.length);
  return(tps);
}

function makeStringFromRouteArray(cr)
{
  let k = cr.length;
  let s = "";
  let i = 0;
  while(i < k)
  {
    if(i != 0) s += ",";
    s += cr[i];
    i += 1;
  }
  return(s);
}

function routelistContains(list, item)
{
  let b = false;
  list = list.toString();
//  report("::" + list);
  let a = list.split(",");
  let k = a.length;
  let i = 0;
  if(k == 0)
  {
    report("routelistContains k = 0 " + list);   
  }
  else
  {
//    report("rc k = " + k + " " + item + " " + a[0]);
    while(!b && (i < k))   
    {
      if(a[i] == item)
      {
        b = true;   
      }
      i += 1;
    }
//    report("  " + b);
  }
  return(b);
}

function stopsHaveSameParent(stopid1, stopid2)
{
  let b = false;
  let p1 = getParentIdFromId(stopid1);
  let p2 = getParentIdFromId(stopid2);
  if(p1 == p2) b = true;
  return(b);
}

function getCommonTransferStops(glr)
{
  let cts = [];
  let fr = glr.fromroutes.split(",");
  let tr = glr.toroutes.split(",");
  let i = 0;
  let j = 0;
  for(i = 0; i < fr.length; i++)
  {
    let ctsf = getTransferStops(fr[i]);
    for(j=0; j < ctsf.length; j++)
    {
      let s1 = ctsf[j];
      let ps1 = getParentIdFromId(s1);
      for(let jj = 0; jj < tr.length; jj++)
      {
        let ctst = getTransferStops(tr[jj]); 
        for(let m = 0; m < ctst.length; m++)
        {
          let s2 = ctst[m];
          let ps2 = getParentIdFromId(s2);
          if(ps1 == ps2) addUniqueElement2(cts, {ts: s1, r1: fr[i], r2: tr[jj]}); 
 //         else if(ps1 == getParentIdFromId(ctst[m])) addUniqueElement2(cts, {ts: s1, r1: fr[i], r2: tr[jj]});
        }
      }
      
    }
  }
  return(cts);
}

function addUniqueElement2(cts, e)
{
  let b = true;
  let i = 0;
  let k = cts.length;
  while(b && (i < k))
  {
    let e1 = cts[i];
    if((e1.ts == e.ts) && (e1.r1 == e.r1) && (e1.r2 == e.r2)) b = false;
    i += 1;
  }
  if(b) cts.push(e);
}

function getLegsCC(glr)
{
  if(glr.fromid == glr.toid) return(glr); 
  let bf = (glr.fromroutes.indexOf("CC") != -1);
  let bt = (glr.toroutes.indexOf("CC") != -1);
  if(!bf && !bt) return(glr);
  report("getLegsCC :" + glr.fromid + ": :" + glr.toid + ":");
  let pfid = getParentIdFromId(glr.fromid);
  let ptid = getParentIdFromId(glr.toid);
  let fr = getRoutesS(pfid);
  let tr = getRoutesS(ptid);
  let cr = getCommonRoutesS(fr, tr);
  let kr = cr.length;
  report("fr = " + fr);
  report("kr = " + kr);
  report("tr = " + tr);
  report("bf = " + bf + " bt = " + bt);
  if(kr > 0)
  {
    let i = 0;
    while(i < kr)
    { 
      let Stg = cloneStrategy(glr.strategy);
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, glr.toid, 0, null, cr[i]));
      if(glr.lastleg == null) glr.lastleg = new Leg();
      addLegToStrategy(Stg, glr.lastleg);
      glr.addStrategy(Stg);
      i += 1;
    }
    glr.bEnd = true;
    return(glr);
  }
  if(bf && bt)
  {
    let tps = getTransferPoints(pfid, fr, ptid, tr);
    let tp = null;
    let leg = new Leg();
    if(tps.length > 0) 
    {
        report("got " + tps.length + " transfer points");
        tp = tps[0];
    }
    else report("1223 got no transfer points " + pfid + " " + ptid);
    if(tp != null)
    {
      if(pfid != getParentIdFromId(tp.fstop))
      {
        leg.addLeg( makeLeg(glr.fromid, 0, tp.fstop, 0, null, tp.froute));
      }
      if(tp.fstop != tp.tstop)
      {
        leg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        leg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      else
      {
        leg.addLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute));          
      }
    
    addLegToStrategy(glr.strategy, leg);
    addLegToStrategy(glr.strategy, glr.lastleg);
    glr.addStrategy(glr.strategy);
    glr.bEnd = true;
    return(glr);
   }
  }
  if(bf && !bt)
  {
    let fh = getRoutesS("place-hyannis");
    let tps = getTransferPoints(pfid, fr, "place-hyannis", fh);
    let tp = null;
    let leg = new Leg();
    if(glr.lastleg == null) glr.lastleg = new Leg();
    if(tps.length == 0) 
    {
    
    }
    else
    {
      let tp = tps[0];
      report("tp.fstop = " + tp.fstop + " tp.tstop = " + tp.tstop);
      if(tp.fstop != tp.tstop)
      {
        report("got here 738");
        addLegToStrategy(glr.strategy, makeLeg(glr.fromid, 0, tp.fstop, 0, null, fr));
        addLegToStrategy(glr.strategy, makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.troute));
      }
      else
      {
 //       report("got here 744");
        let cr5 = getCommonRoutesS(fr, fh);
        let kx = cr5.length;
        report("got here 744 cr5.length = " + kx + " " + cr5[0]);
        if(kx > 0) 
        {
          addLegToStrategy(glr.strategy, makeLeg(glr.fromid, 0, "place-hyannis", 0, null, cr5[0]));          
        }
      }
      glr.fromid = "place-hyannis";
      glr.fromroutes = fh;
    }
    return(glr);
  }
  if(!bf && bt && (getParentIdFromId(glr.toid) != "place-hyannis"))
  {
    let tps = getTransferPoints(pfid, fr, ptid, tr);
    let tp = null;
    let leg = new Leg();
    if(glr.lastleg == null) glr.lastleg = new Leg();
    if(tps.length == 0) 
    {
      report("got no transfer points " + pfid + " " + ptid);
      fr = getRoutesS("place-hyannis");
      let cr = getCommonRoutesS(fr, tr);
      let kx = cr.length;
      report("cr.length = " + cr.length + " " + glr.toid + " " + cr[0]);
      if(kx > 0)
      {
        glr.lastleg.addLeg( makeLeg("place-hyannis", 0, glr.toid, 0, null, cr[0]));   
        glr.toid = "place-hyannis";
        glr.toroutes = getRoutesS("place-hyannis");
        return(glr);
      }
    }
    if(tps.length > 0) 
    {
      report("got " + tps.length + " transfer points, using only 1");
      tp = tps[0];
      
      if(tp.fstop != tp.tstop)
      {
        glr.lastleg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        glr.lastleg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      else
      {
        glr.lastleg.addLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute));          
      }
      
      glr.toid = tp.tstop;
      glr.toroutes = getRoutesS(glr.toid);
    
      return(glr);
    }
  }
  return(glr);
}

function getLegsNYC(glr)
{
  if(glr.fromid == glr.toid) return(glr); 
  let bfnyc = isNYCstop(glr.fromid); 
  let btnyc = isNYCstop(glr.toid); 
  if(!bfnyc && !btnyc) return(glr);
  report("\ngetLegsNYC :" + glr.fromid + ": :" + glr.toid + ":");
  let pfid = getParentIdFromId(glr.fromid);
  let ptid = getParentIdFromId(glr.toid);
  let fr = getRoutesS(pfid);
  let tr = getRoutesS(ptid);
  let cr = getCommonRoutesS(fr, tr);
  let kr = cr.length;
  report("\nbfnyc = " + bfnyc + " btnyc = " + btnyc);
  if(kr > 0)
  {
    let i = 0;
    while(i < kr)
    { 
      let Stg = cloneStrategy(glr.strategy);
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, glr.toid, 0, null, cr[i]));
      if(glr.lastleg == null) glr.lastleg = new Leg();
      addLegToStrategy(Stg, glr.lastleg);
      glr.addStrategy(Stg);
      i += 1;
    }
    glr.bEnd = true;
    return(glr);
  }
  else if(!bfnyc && btnyc)
  {
    report("!bfnyc && btnyc");
//    let lastlegs = new Leg();
    if(fr.indexOf("MN") != -1)
    {
      if(pfid != "NewYork-Grand-Central-NY")
      {
        let xroutes = getRoutesS("NewYork-Grand-Central-NY");
        let kr = getCommonRoutesS(fr, xroutes);
        report("kr1047 = " + kr.length + " " + fr + " " + xroutes);
        if(kr.length > 0)
        {
 //             lastlegs.addLeg(makeLeg(fromid, 0, "NewYork-Grand-Central-NY", 0, null,kr[0])); 
          let legs = getLegsNY("NewYork-Grand-Central-NY", ptid);
          let k = legs.children.length;
          let i = 0;
          report("k = " + k);
          if(legs != null)
          {
            glr.lastleg.preAddLeg(legs); 
          }
//              if(LastLego != null)
//              {
//                lastlegs.addLeg(LastLego);   
//              }
//              report("set LastLego a");
//              LastLego = lastlegs;
          glr.toid = "NewYork-Grand-Central-NY";
//          toroutes = xroutes; 
            }
          }
        }
        else
        {
          if(pfid != "place-nyc")
          {
            let xroutes = getRoutesS("AMSNYP");
            let kr = getCommonRoutesS(fr, xroutes);
            if(kr == 0)
            {
              let hub = getHub(pfid);
              if(hub != null)
              {
                 let fr2 = getRoutesS(hub);
                 let ks = getCommonRoutesS(fr2, xroutes);
                 if(ks.length > 0)
                 {
                   fid = hub;
                   kr = ks;
//                   toid = hub;
//                   toroutes = fr2;
                   btnyc = false;
                 }
              }
            }
            if(kr.length > 0)
            {
 //             lastlegs.addLeg(makeLeg(fid, 0, "AMSNYP", 0, null,kr[0])); 
              let legs = getLegsNY("place-nyc", ptid);
              let k = legs.children.length;
              let i = 0;
 //             report("k2 = " + k + " " + lastlegs.children.length);
              if(legs != null)
              {
                glr.lastleg.addLeg(legs); 
              }
//              if(LastLego != null)
//              {
//                report("LastLego " + LastLego.children.length + " " + LastLego.startid);
//                lastlegs.addLeg(LastLego);   
//                report("set LastLego b1 " + lastlegs.children.length);
//              }
//              report("set LastLego b");
//              LastLego = lastlegs;
 //             if(btnyc)
//              {
             glr.toid = "AMSNYP";
//                toroutes = getRoutesS(toid);
             btnyc = false;
            }
           }
        }
      }
      else if(bfnyc && !btnyc)
      {
        report("bfnyc && !btnyc");
        let lastlegs = new Leg();
        if(tr.indexOf("MN") != -1)
        {
          if(ptid != "place-gcny")
          {
            let legs = getLegsNY(pfid, "place-gcny");
            let k = legs.children.length;
            let i = 0;
            report("add " + k + " legs a");
            addLegToStrategy(glr.strategy, legs); 
            glr.fromid = "NewYork-Grand-Central-NY";
//            fromroutes = getRoutesS("place-gcny"); 
          }
        }
        else
        {
          if(ptid != "place-nyc")
          {
            let xroutes = getRoutesS("AMSNYP");
            let legs = getLegsNY(pfid, "place-nyc");
            let k = legs.children.length;
            let i = 0;
            report("add " + k + " legs b");
            addLegToStrategy(glr.strategy, legs); 
            glr.fromid = "AMSNYP";
//            fromroutes = xroutes; 
          }
        }
       
      }
      
      if(bfnyc && btnyc)
      {
         let legs = getLegsNY(glr.fromid, glr.toid);
         let k = legs.children.length;
         let i = 0;
         report("bfnyc btnyc " + k);
         if(legs != null)
         {
 //          report("Strategy.length = " + Strategy.length + " " + legs.children[0].startid + " " + legs.children[0].destid);
           Strategy = addLegToStrategy(glr.strategy, legs);  
 //           report("Strategy.length = " + Strategy.length );
          report("glr.strategy.length = " + glr.strategy.length);
//           if(LastLego != null)
//           {
//               report("added LastLego");
//             Strategy = addLegToStrategy(Strategy, LastLego);   
//           }
//           Strategies[Strategies.length] = Strategy;
//           report("1436 Strategies.length = " + Strategies.length);
//           report("1437 Strategy.length = " + Strategies[0].length + " " + Strategy.length);
//           report("1438 Strategies[0].children.length = " + Strategies[0][0].children.length);
 //          resolve(Strategies);
           glr.toid = glr.fromid;
           bEnd = true;
         }
      }
      
      /*
      let bfnyc = isNYCstop(fromid);
      let btnyc = isNYCstop(toid);
      report("\nbfnyc = " + bfnyc + " btnyc = " + btnyc);
     report("LastLego7 startid = " + LastLego.startid + " destid = " + LastLego.destid + " " + kx + " children = " + LastLego.children.length);

      if(kx > 0)
      {
          /*
        addLegToStrategy( Strategy,  makeLeg(fromid, 0, toid, 0, null, cr[0]);
        if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
        Strategies[Strategies.length] = Strategy;
        resolve(Strategies); 
        */
/*      }
      else if(!bfnyc && btnyc)
      {
        report("!bfnyc && btnyc");
        let lastlegs = new Leg();
        if(fromroutes.indexOf("MN") != -1)
        {
          if(getParentIdFromId(fromid) != "NewYork-Grand-Central-NY")
          {
            let xroutes = getRoutesS("NewYork-Grand-Central-NY");
            let kr = getCommonRoutesS(fromroutes, xroutes);
            report("kr = " + kr.length + " " + fromroutes + " " + xroutes);
            if(kr.length > 0)
            {
 //             lastlegs.addLeg(makeLeg(fromid, 0, "NewYork-Grand-Central-NY", 0, null,kr[0])); 
              let legs = getLegsNY("NewYork-Grand-Central-NY", toid);
              let k = legs.children.length;
              let i = 0;
              report("k = " + k);
              if(legs != null)
              {
                lastlegs.addLeg(legs); 
              }
              if(LastLego != null)
              {
                lastlegs.addLeg(LastLego);   
              }
              report("set LastLego a");
              LastLego = lastlegs;
              toid = "NewYork-Grand-Central-NY";
              toroutes = xroutes; 
            }
          }
        }
        else
        {
          let fid = fromid;
          if(getParentIdFromId(fromid) != "place-nyc")
          {
            let xroutes = getRoutesS("AMSNYP");
            let kr = getCommonRoutesS(fromroutes, xroutes);
            if(kr == 0)
            {
              let hub = getHub(fromid);
              if(hub != null)
              {
                 let fr2 = getRoutesS(hub);
                 let ks = getCommonRoutesS(fr2, xroutes);
                 if(ks.length > 0)
                 {
                   fid = hub;
                   kr = ks;
//                   toid = hub;
//                   toroutes = fr2;
                   btnyc = false;
                 }
              }
            }
            if(kr.length > 0)
            {
 //             lastlegs.addLeg(makeLeg(fid, 0, "AMSNYP", 0, null,kr[0])); 
              let legs = getLegsNY("AMSNYP", toid);
              let k = legs.children.length;
              let i = 0;
              report("k2 = " + k + " " + lastlegs.children.length);
              if(legs != null)
              {
                lastlegs.addLeg(legs); 
              }
              if(LastLego != null)
              {
                report("LastLego " + LastLego.children.length + " " + LastLego.startid);
                lastlegs.addLeg(LastLego);   
                report("set LastLego b1 " + lastlegs.children.length);
              }
              report("set LastLego b");
              LastLego = lastlegs;
 //             if(btnyc)
              {
                toid = "AMSNYP";
                toroutes = getRoutesS(toid);
                btnyc = false;
              }
           }
          }
              
        }
        
      }
      else if(bfnyc && !btnyc)
      {
        report("bfnyc && !btnyc");
        let lastlegs = new Leg();
        if(toroutes.indexOf("MN") != -1)
        {
          if(getParentIdFromId(toid) != "place-gcny")
          {
            let legs = getLegsNY(fromid, "place-gcny");
            let k = legs.children.length;
            let i = 0;
            report("add " + k + " legs a");
            addLegToStrategy(Strategy, legs); 
            fromid = "NewYork-Grand-Central-NY";
            fromroutes = getRoutesS("place-gcny"); 
          }
        }
        else
        {
          if(getParentIdFromId(fromid) != "place-nyc")
          {
            let xroutes = getRoutesS("AMSNYP");
            let legs = getLegsNY(fromid, "place-nyc");
            let k = legs.children.length;
            let i = 0;
            report("add " + k + " legs b");
            addLegToStrategy(Strategy, legs); 
            fromid = "AMSNYP";
            fromroutes = xroutes; 
          }
        }
       
      }
      
      if(bfnyc && btnyc)
      {
         let legs = getLegsNY(fromid, toid);
         let k = legs.children.length;
         let i = 0;
         report("bfnyc btnyc " + k);
         if(legs != null)
         {
           report("Strategy.length = " + Strategy.length + " " + legs.children[0].startid + " " + legs.children[0].destid);
           Strategy = addLegToStrategy(Strategy, legs);  
            report("Strategy.length = " + Strategy.length );
          report("Strategy[0].children.length = " + Strategy[0].children.length);
           if(LastLego != null)
           {
               report("added LastLego");
             Strategy = addLegToStrategy(Strategy, LastLego);   
           }
           Strategies[Strategies.length] = Strategy;
           report("1436 Strategies.length = " + Strategies.length);
           report("1437 Strategy.length = " + Strategies[0].length + " " + Strategy.length);
           report("1438 Strategies[0].children.length = " + Strategies[0][0].children.length);
 //          resolve(Strategies);
           toid = fromid;
           bEnd = true;
         }
      }
      */
 return(glr);
}

function isLIJeffersonBranch(stop_id)
{
  let stopids = ["LI78", "LI153", "LI111", "LI202","LI193", "LI14", "LI164"];
  let b = false;
  let k = stopids.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(stop_id == stopids[i])
    {
      b = true;   
    }
    else i += 1;
  }
  return(b);
}

function isLIGreenportBranch(stop_id)
{
  let stopids = ["LI73", "LI190", "LI126", "LI176","LI223", "LI129"];
  let b = false;
  let k = stopids.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(stop_id == stopids[i])
    {
      b = true;   
    }
    else i += 1;
  }
  return(b);
}

function getLegsLI(glr)
{
  if(glr.fromid == glr.toid) return(glr); 
  let bf = ((glr.fromid.indexOf("LI") == 0)); 
  let bt = ((glr.toid.indexOf("LI") == 0)); 
  if(!bf && !bt) return(glr);
  report("\ngetLegsLI :" + glr.fromid + ": :" + glr.toid + ":");
  let bjrf = isLIJeffersonBranch(glr.fromid);
  let bjrt = isLIJeffersonBranch(glr.toid);
  let bgrf = isLIGreenportBranch(glr.fromid);
  let bgrt = isLIGreenportBranch(glr.toid);
  report("bgrf = " + bgrf + " bgrt = " + bgrt);
  let pfid = getParentIdFromId(glr.fromid);
  let ptid = getParentIdFromId(glr.toid);
  let fr = getRoutesS(pfid);
  let tr = getRoutesS(ptid);
  let cr = getCommonRoutesS(fr, tr);
  let kr = cr.length;
  if(kr > 0)
  {
    let i = 0;
    while(i < kr)
    { 
      let Stg = cloneStrategy(glr.strategy);
      let Stg1 = cloneStrategy(glr.strategy);
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, glr.toid, 0, null, cr[i]));
      if(glr.lastleg == null) glr.lastleg = new Leg();
      addLegToStrategy(Stg, glr.lastleg);
      glr.addStrategy(Stg);
      if(bjrf && !bjrt)
      {
        addLegToStrategy(Stg1,  makeLeg(glr.fromid, 0, "LI91", 0, null, "LIRR10"));
        addLegToStrategy(Stg1,  makeLeg("LI91", 0, glr.toid, 0, null, cr[i]));
        glr.addStrategy(Stg1);
      }
      else if(!bjrf && bjrt)
      {
        addLegToStrategy(Stg1,  makeLeg(glr.fromid, 0, "LI91", 0, null, cr[i])); 
        addLegToStrategy(Stg1,  makeLeg("LI91", 0, glr.toid, 0, null, "LIRR10"));
        glr.addStrategy(Stg1);
      }
      if(bgrf && !bgrt)
      {
        addLegToStrategy(Stg1,  makeLeg(glr.fromid, 0, "LI179", 0, null, "LIRR4"));
        addLegToStrategy(Stg1,  makeLeg("LI179", 0, glr.toid, 0, null, cr[i]));
        glr.addStrategy(Stg1);
      }
      else if(!bgrf && bgrt)
      {
        addLegToStrategy(Stg1,  makeLeg(glr.fromid, 0, "LI179", 0, null, cr[i])); 
        addLegToStrategy(Stg1,  makeLeg("LI179", 0, glr.toid, 0, null, "LIRR4"));
        glr.addStrategy(Stg1);
      }
      i += 1;
    }
    glr.bEnd = true;
    return(glr);
  }
  if(bf && bt)
  {
    
  }
  else if(!bf && bt)
  {
    let frs = getRoutesS("place-nyc");
    let fps = getTransferPoints("place-nyc", frs, ptid, tr);
    report("transfer points nyc to " + ptid + " = " + fps.length);
    let leg = new Leg();
    let n = fps.length;
    if(n > 0)
    {
      let tp = fps[0]; // pick the first transfer point
      if("place-nyc" != getParentIdFromId(tp.tstop))
      {
        report("  d place-nyc to " + tp.tstop + " " + tp.froute);
        glr.lastleg.addLeg( makeLeg("place-nyc", 0, tp.tstop, 0, null, tp.troute));
      }
      if(tp.fstop != tp.tstop)
      {
        report("  e");
        glr.lastleg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        glr.lastleg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      else
      {
        report("  f " );
        if(bjrt)
        {
          glr.lastleg.addLeg( makeLeg("place-nyc", 0, "LI91", 0, null, tp.troute));          
          glr.lastleg.addLeg( makeLeg("LI91", 0, glr.toid, 0, null, "LIRR10"));          
        }
        else if(bgrt)
        {
          glr.lastleg.addLeg( makeLeg("place-nyc", 0, "LI179", 0, null, tp.troute));          
          glr.lastleg.addLeg( makeLeg("LI179", 0, glr.toid, 0, null, "LIRR4"));          
        }
        else glr.lastleg.addLeg( makeLeg("place-nyc", 0, glr.toid, 0, null, tp.troute));          
      }
      glr.toid = "place-nyc";  
      report(" glr.lastleg.children.length = " + glr.lastleg.children.length);
//      addLegToStrategy(glr.strategy, leg);
    }
      
  }
  else if(bf && !bt)
  {
    let trs = getRoutesS("place-nyc");
    let tps = getTransferPoints(pfid, fr, "place-nyc", trs);
    report("transfer points " + pfid + " to place-nyc = " + tps.length);
    let leg = new Leg();
    let n = tps.length;
    if(n > 0)
    {
      let tp = tps[0]; // pick the first transfer point
      if(pfid != getParentIdFromId(tp.fstop))
      {
        report("  a");
        if(bjrf)
        {
          leg.addLeg( makeLeg(glr.fromid, 0, "LI91", 0, null, "LIRR10"));
          leg.addLeg( makeLeg("LI91", 0, tp.tstop, 0, null, tp.froute));
            
        }
        else if(bgrf)
        {
          leg.addLeg( makeLeg(glr.fromid, 0, "LI179", 0, null, "LIRR4"));
          leg.addLeg( makeLeg("LI179", 0, "LI237", 0, null, tp.froute));
            
        }
        else leg.addLeg( makeLeg(glr.fromid, 0, tp.fstop, 0, null, tp.froute));
      }
      if(tp.fstop != tp.tstop)
      {
        report("  b");
        leg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        leg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      
      else
      {
        report("  c");
//        leg.addLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute));          
      }
      
      glr.fromid = "place-nyc";
      addLegToStrategy(glr.strategy, leg);
    }
      
  }
  
  return(glr);
}

function getLegsNJ(glr)
{
  if(glr.fromid == glr.toid) return(glr); 
  let bf = (((glr.fromid.indexOf("NJ") == 0) && (glr.fromid != "NJ105")) || 
      (glr.fromid.indexOf("NZ") == 0)); 
  let bt = ((glr.toid.indexOf("NJ") == 0) && (glr.fromid != "NJ105")) || 
      (glr.toid.indexOf("NZ") == 0); 
  if(!bf && !bt) return(glr);
  report("\ngetLegsNJ :" + glr.fromid + ": :" + glr.toid + ":");
  let pfid = getParentIdFromId(glr.fromid);
  let ptid = getParentIdFromId(glr.toid);
  let fr = getRoutesS(pfid);
  let tr = getRoutesS(ptid);
  let cr = getCommonRoutesS(fr, tr);
  let kr = cr.length;
  let bf11 = (pfid != "NJ74") && (fr.indexOf("NJR11") != -1);
  let bt11 = (ptid != "NJ74") && (tr.indexOf("NJR11") != -1);
  if(bf11 && bt11) ;
  else if(!bf11 && !bt11) ;
  else if(bf11)
  {
    addLegToStrategy(glr.strategy,  makeLeg(pfid, 0, "NJ74", 0, null, "NJR11")); 
    pfid = "NJ74";
    glr.fromid = "NJ74";
    fr = getRoutesS(pfid);
    cr = getCommonRoutesS(fr, tr);
    kr = cr.length;
  }
  else if(bt11)
  {
    glr.lastleg.addLeg(makeLeg("NJ74", 0, ptid, 0, null, "NJR11")); 
    ptid = "NJ74";
    glr.toid = "NJ74";
    tr = getRoutesS(ptid);
    cr = getCommonRoutesS(fr, tr);
    kr = cr.length;    
  }  
  report("fr = " + fr);
  report("kr = " + kr);
  report("tr = " + tr);
  report("bf = " + bf + " bt = " + bt);
  if(kr > 0)
  {
    let i = 0;
    while(i < kr)
    { 
      let Stg = cloneStrategy(glr.strategy);
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, glr.toid, 0, null, cr[i]));
      if(glr.lastleg == null) glr.lastleg = new Leg();
      addLegToStrategy(Stg, glr.lastleg);
      glr.addStrategy(Stg);
      i += 1;
    }
    glr.bEnd = true;
    return(glr);
  }
  
  if(bf && bt)
  {
    let tps = getTransferPoints(pfid, fr, ptid, tr);
    let tp = null;
    let leg = new Leg();
    if(tps.length == 0)
    {
      if(stopHasRoute(glr.fromid, "NJR1"))
      {
        addLegToStrategy(glr.strategy,  makeLeg(glr.fromid, 0, "place-pensk", 0, null, "NJR1"));
        glr.fromid = "place-pensk";
        pfid = getParentIdFromId(glr.fromid);
        fr = getRoutesS("place-pensk");
        tps = getTransferPoints(pfid, fr, ptid, tr);
        bf = false;
      }
      else if(stopHasRoute(glr.toid, "NJR1"))
      {
        glr.lastleg = makeLeg("place-pensk", 0, glr.toid, 0, null, "NJR1");
        glr.toid = "place-pensk";
        ptid = getParentIdFromId(glr.toid);
        tr = getRoutesS("place-pensk");
        tps = getTransferPoints(pfid, fr, ptid, tr);
        bt = false;
      }
    }
    if(tps.length > 0) 
    {
        report("got " + tps.length + " transfer points1");
        tp = tps[0];
    }
    else if(bf)
    {
      report("got no transfer points " + pfid + " " + ptid);
      let fh = getRoutesS("place-secaucus");
      tps = getTransferPoints(pfid, fr, "place-secaucus", fh);
      if((pfid != "place-secaucus") && (tps.length > 0)) 
      {
        report("got " + tps.length + " transfer points2");
        tp = tps[0];
      }
      else
      {
        fh = getRoutesS("place-hoboken");
        tps = getTransferPoints(pfid, fr, "place-hoboken", fh);
        if(tps.length > 0) 
        {
          report("got " + tps.length + " transfer points3");
          tp = tps[0];
        }
      }
    }
    if((tps.length == 0) && bt)
    {
      report("got no transfer points " + pfid + " " + ptid);
      let fh = getRoutesS("place-secaucus");
      tps = getTransferPoints("place-secaucus", fh,ptid,tr);
      if(tps.length > 0) 
      {
        report("got " + tps.length + " transfer points4");
        tp = tps[0];
      }
      else
      {
        fh = getRoutesS("place-hoboken");
        tps = getTransferPoints("place-hoboken", fh,ptid,tr);
        if(tps.length > 0) 
        {
          report("got " + tps.length + " transfer points5");
          tp = tps[0];
        }
      }
    }
    
    if(tp != null)
    {
      if(pfid != getParentIdFromId(tp.fstop))
      {
        leg.addLeg( makeLeg(glr.fromid, 0, tp.fstop, 0, null, tp.froute));
      }
      if(tp.fstop != tp.tstop)
      {
        leg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        leg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      else
      {
        leg.addLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute));          
      }
    
    addLegToStrategy(glr.strategy, leg);
    if(glr.lastleg != null) addLegToStrategy(glr.strategy, glr.lastleg);
    glr.addStrategy(glr.strategy);
    glr.bEnd = true;
    return(glr);
   }
  }
  if(bf && !bt)
  {
    let tfspoint = "place-nyc"; // "place-secaucus"
    let fh = getRoutesS(tfspoint);
    let tps = getTransferPoints(pfid, fr, tfspoint, fh);
    let tp = null;
    let leg = new Leg();
    if(glr.lastleg == null) glr.lastleg = new Leg();
    if(tps.length == 0) 
    {
    
    }
    else
    {
      let tp = tps[0];
      report("tp.fstop = " + tp.fstop + " tp.tstop = " + tp.tstop);
      if(tp.fstop != tp.tstop)
      {
        report("got here 738");
        addLegToStrategy(glr.strategy, makeLeg(glr.fromid, 0, tp.fstop, 0, null, fr));
        addLegToStrategy(glr.strategy, makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.troute));
      }
      else
      {
 //       report("got here 744");
        let cr5 = getCommonRoutesS(fr, fh);
        let kx = cr5.length;
        report("got here 744 cr5.length = " + kx + " " + cr5[0]);
        if(kx > 0) 
        {
          addLegToStrategy(glr.strategy, makeLeg(glr.fromid, 0, tfspoint, 0, null, cr5[0]));          
        }
      }
      glr.fromid = tfspoint;
      glr.fromroutes = fh;
    }
    return(glr);
  }
  if(!bf && bt) // && (getParentIdFromId(glr.toid) != "place-secaucus"))
  {
    let tps = getTransferPoints(pfid, fr, ptid, tr);
    let tp = null;
    let leg = new Leg();
    if(glr.lastleg == null) glr.lastleg = new Leg();
    if(tps.length == 0) 
    {
      report("got no transfer points " + pfid + " " + ptid);
      fr = getRoutesS("place-nyc");
      let cr = getCommonRoutesS(fr, tr);
      let kx = cr.length;
      report("cr.length = " + cr.length + " " + glr.toid + " " + cr[0]);
      if(kx > 0)
      {
        glr.lastleg.preAddLeg( makeLeg("place-nyc", 0, glr.toid, 0, null, cr[0]));   
        glr.toid = "place-nyc";
        glr.toroutes = getRoutesS("place-nyc");
        return(glr);
      }
      else
      {
        fr = getRoutesS("place-secaucus");
        cr = getCommonRoutesS(fr, tr);
        kx = cr.length;
        if(kx > 0)
        {
          glr.lastleg.addLeg( makeLeg("place-nyc", 0, "place-secaucus", 0, null, "NJR9"));   
          glr.lastleg.addLeg( makeLeg("place-secaucus", 0, glr.toid, 0, null, cr[0]));   
          glr.toid = "place-nyc";
          glr.toroutes = getRoutesS("place-nyc");
          return(glr);
        }
        else
        {
          fr = getRoutesS("place-hoboken");
          cr = getCommonRoutesS(fr, tr);
          kx = cr.length;
          if(kx > 0)
          {
          glr.lastleg.addLeg( makeLeg("place-nyc", 0, "place-secaucus", 0, null, "NJR9"));   
          glr.lastleg.addLeg( makeLeg("place-secaucus", 0, "place-hoboken", 0, null, "NJR5"));   
          glr.lastleg.addLeg( makeLeg("place-secaucus", 0, glr.toid, 0, null, cr[0]));   
          glr.toid = "place-nyc";
          glr.toroutes = getRoutesS("place-nyc");
          return(glr);
          }
        }

      }
    }
    if(tps.length > 0) 
    {
      report("got " + tps.length + " transfer points, using only 1 " + tps[0].fstop + " " + tps[0].tstop + " " + tps[0].troute);
      for(iu = 0; iu < tps.length; iu++)
      {
         report("  " +  tps[iu].fstop + " " + tps[iu].tstop);  
      }
      tp = tps[0];
      
      if(tp.fstop != tp.tstop)
      {
        glr.lastleg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        glr.lastleg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      else
      {
        glr.lastleg.preAddLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute)); 
        report("  lastleg children = " + glr.lastleg.children.length);
      }
      
      glr.toid = tp.tstop;
      glr.toroutes = getRoutesS(glr.toid);
    
      return(glr);
    }
  }
  return(glr);
}

function isAnException(pid)
{
  let b = false;
  if(pid == "place-aport") b = true;
  if(pid == "place-north") b = true;
  if(pid == "place-sstat") b = true;
//  if(pid == "place-bbsta") b = true;
  if(pid == "place-GB-0353") b = true; // Rockpprt
  if(pid == "place-GB-0316") b = true; // Gloucester
  if(pid == "place-GB-0296") b = true; // West Gloucester
  return(b);
}

/*
function isCN0Shuttle(pid)
{
  let b = false;
//  if(pid == "place-GB-0353") b = true; // Rockpprt
//  if(pid == "place-GB-0316") b = true; // Gloucester
//  if(pid == "place-GB-0296") b = true; // West Gloucester
//  if(b) Tchg = -300;
  return(b);    
}
*/
/*
function getChildStopsThatServeRoute(parentStop, route)
{
  let stops = [];
  let sids = getStopIdsFromId(parentStop);
  let k = sid.length;
  let i = 0;
  for(i = 0; i < k; i++)
  {
    let r = getRecordForStop(sid[i]);
    
  }
  
  return(stops);
}
*/

function getLegsGeneric(glr)
{
  let bCommonRoutes = false;
  if(glr.fromid == glr.toid) return(glr); 
  report("\na getLegsGeneric :" + glr.fromid + ": :" + glr.toid + ":");
  let pfid = getParentIdFromId(glr.fromid);
  let ptid = getParentIdFromId(glr.toid);
  let bExceptions = isAnException(pfid) || isAnException(ptid) ;
  
  let fr = getRoutesS(pfid);
  let tr = getRoutesS(ptid);
  //first see if there is a common route
  report("1. see if common routes");
  let cr = getCommonRoutesS(fr, tr);
  let kr = cr.length;
  report("  fr = " + fr);
  report("  kr = " + kr);
  report("  tr = " + tr);
  if(kr > 0)
  {
    bCommonRoutes = true;
    let i = 0;
    let b9 = true;
    while(b9 && (i < kr))
    { 
      let Stg = cloneStrategy(glr.strategy);
      addLegToStrategy(Stg,  makeLeg(glr.fromid, 0, glr.toid, 0, null, cr[i]));
      if(glr.lastleg == null) glr.lastleg = new Leg();
      addLegToStrategy(Stg, glr.lastleg);
      b9 = glr.addStrategy(Stg);
      i += 1;
    }
    if(!bExceptions) glr.bEnd = true;
//    return(glr);
  }
  else report("2123 No common routes");
  
  // then see if there is a common transfer stop
//  report("2197 " + glr.fromroutes + " " + glr.toroutes);
  report("2. see if there is a common transfer stop");
  let cts = getCommonTransferStops(glr);
//  report(JSON.stringify(cts, null,4));
  let kl = cts.length;
  let il = 0;
  if(kl > 0)
  {
    let b9 = true;
    while(b9 && (il < kl))
    {
      let leg = new Leg();
      let tse = cts[il];
      let pts = getParentIdFromId(tse.ts);
      if((getParentIdFromId(glr.fromid) != pts) && (getParentIdFromId(glr.toid) != pts))
      {
       let bp = ((getParentIdFromId(glr.fromid) == "place-nyc") && ( getParentIdFromId(tse.ts) == "place-gcny")) || ((getParentIdFromId(tse.ts) == "place-nyc") && ( getParentIdFromId(glr.toid) == "place-gcny"));
//       report("2468 " + getParentIdFromId(tse.ts) + " " + getParentIdFromId(glr.toid) + " " + bp);
       if(!bp && (tse.r1 != tse.r2))
       {
        // startid, starttime, destid, desttime, trip, routeS
        leg.addLeg( makeLeg(glr.fromid, 0, tse.ts, 0, null, tse.r1));
        leg.addLeg( makeLeg(tse.ts, 0, glr.toid, 0, null, tse.r2));          
        let Stg = cloneStrategy(glr.strategy);
 //     report("2410 try new strategy");
        addLegToStrategy(Stg, leg);
        if(glr.lastleg != null) addLegToStrategy(Stg, glr.lastleg);
        //b9 = 
        glr.addStrategy(Stg);
       }
      }
      il += 1;
    }
    if(!bExceptions) glr.bEnd = true;
  }
  else report("2203 No common transfer stops.");
  
  // then try transfer points
  if((!glr.bEnd) && (!bCommonRoutes))
  {
    report("3. see if there are transfer points");
//    let tps = getTransferPoints(pfid, fr, ptid, tr);
    let tps = getTransferPoints2(pfid, fr, ptid, tr)
    let tp = null;
    let leg = new Leg();
    let k = tps.length;
    if((k > 0)) // && (k < 4))
    {
        report("1843 got " + tps.length + " transfer points");
        let b = true;
        let i = 0;
        let cr = [];
        if(k > 4) k = 4;
        while(i < k)
        {
          tp = tps[i]; 
//          report("  " + glr.fromid + " " + tp.t1id + " " + tp.t2id + " " + glr.toid);
//          if((tp.tstop == tp.fstop) && (tp.froute != "4") && (tp.troute != "4"))
          {
            leg = new Leg();
/*            report("   try transfer point a1. " + glr.fromid + " " + tp.fstop + " " + tp.froute);
            report("   try transfer point a2. " + tp.fstop + " " + glr.toid + " "  + tp.troute);
            leg.addLeg( makeLeg(glr.fromid, 0, tp.fstop, 0, null, tp.froute));
            leg.addLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute));  
            */
            report("   try transfer point a1. " + glr.fromid + " " + tp.t1id + " " + tp.route0);
            report("   try transfer point a2. " + tp.t1id + " " + tp.t2id + " "  + tp.route1);
            report("   try transfer point a3. " + tp.t2id + " " + glr.toid + " "  + tp.route2);
            leg.addLeg( makeLeg(glr.fromid, 0, tp.t1id, 0, null, tp.route0));
            leg.addLeg( makeLeg(tp.t1id, 0, tp.t2id, 0, null, tp.route1));          
            leg.addLeg( makeLeg(tp.t2id, 0, glr.toid, 0, null, tp.route2));          
            b = false;  
            let Stg = cloneStrategy(glr.strategy);
            addLegToStrategy(Stg, leg);
            if(glr.lastleg != null) addLegToStrategy(Stg, glr.lastleg);
            glr.addStrategy(Stg);
          }
          
          i += 1;
        }
        if(!b)
        {
//          addLegToStrategy(glr.strategy, leg);
//          if(glr.lastleg != null) addLegToStrategy(glr.strategy, glr.lastleg);
//          glr.strategies[glr.strategies.length] = glr.strategy;
          if(!bExceptions) glr.bEnd = true;
          return(glr);
        }
    }
    else report("1874 got no transfer points " + pfid + " " + ptid);
    /*
    if(tp != null)
    {
      if(pfid != getParentIdFromId(tp.fstop))
      {
        report("try transfer point a. " + glr.fromid + " " + tp.fstop + " " + tp.froute);
        leg.addLeg( makeLeg(glr.fromid, 0, tp.fstop, 0, null, tp.froute));
      }
      if(tp.fstop != tp.tstop)
      {
        report("try transfer point b1. " + tp.fstop + " " + tp.tstop + " " + tp.route);
        report("try transfer point b2. " + tp.tstop + " " + glr.toid + " " + tp.troute);
        leg.addLeg( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
        leg.addLeg( makeLeg(tp.tstop, 0, glr.toid, 0, null, tp.troute));
      }
      else
      {
        report("try transfer point c. " + tp.fstop + " " + glr.toid + " "  + tp.troute);
        leg.addLeg( makeLeg(tp.fstop, 0, glr.toid, 0, null, tp.troute));          
      }
    
    addLegToStrategy(glr.strategy, leg);
    if(glr.lastleg != null) addLegToStrategy(glr.strategy, glr.lastleg);
    glr.strategies[glr.strategies.length] = glr.strategy;
    glr.bEnd = true;
    
    return(glr);
   }
   */
  }
  return(glr);
}




Connections.prototype.getStrategiesFromTo = function(fromid1, toid1)
{
  report("\ngetStrategiesFromTo " + fromid1 + " " + toid1);
  let bEnd = false;
  let fr = getConnectingStation(fromid1);
  let fromid  = fromid1;
  if(fr != null) fromid = fr;
  let tr = getConnectingStation(toid1);
  let toid = toid1;
  if(tr != null) toid = tr;
//  let FromStop = getStopFromID(fromid);
//  let ToStop = getStopFromID(toid);
  
  
  let Strategies = [];
  clearArray(Strategies);
  
  let p = new Promise(function(resolve, reject) {
      let Strategy = [];
      clearArray(Strategy);
      let bAddLastBus = false;
      let LastLego = null;
      let lego = null;
      if(fromid == toid) resolve(Strategies);
      let fromroutes = "";
      let toroutes = "";
      if(afromroutes != "") fromroutes = afromroutes;
      if(atoroutes != "") toroutes = atoroutes;
      let pidr = getParentIdFromId(fromid);
      report("fromid = " + fromid + " pidr = " + pidr);
      let ss = getRoutesS(pidr);
//      let ss = getRoutesS(fromid);
      if(ss == "")
      {
          report("got here 1752");
        let rt = getConnectingStation(fromid);
        if(rt != null) ss = getRoutesS(rt);
      }
      report("fromid ss = " + ss + ": length = " + ss.length);
      if((ss.length != 0) && (fromroutes.length != 0)) fromroutes += ",";
      fromroutes += ss;
//      if(toid != "ProvioncetownDock")
      pidr = getParentIdFromId(toid);
      ss = getRoutesS(pidr);
//      ss = getRoutesS(toid);
//      report("a. " + toid + " " + pidr + " " + ss);
      if(ss == "")
      {
        let rt = getConnectingStation(toid);
        if(rt != null) ss = getRoutesS(rt);
      }      
      report("toid ss = " + ss + ": length = " + ss.length);
      if((ss.length != 0) && (toroutes.length != 0)) toroutes += ",";
      toroutes += ss;
      report("\nfromroutes2 = " + fromroutes);
      report("toroutes2 = " + toroutes);
      let cr = getCommonRoutesS(fromroutes, toroutes);
      let kx = cr.length;
//      if(fisbus)
      if((fisbus && !bOtherStop) || (fisbus && tisbus))  // bOtherStop means thereis a parent stop
      {
        report("fisbus kx = " + kx); 
//        if((kx == 0) && !tisbus)
        if((kx == 0))
        {
          let ccs = getClosestConnection(fromid, fromroutes, toid);
          let p1 = getParentIdFromId(fromid);
          let p2 = getParentIdFromId(ccs.stopid);
          report(":: " + p1 + " " + p2);
          if((ccs != null) && (p1 != p2))
          {
          report("closest connection bus " + ccs.route + " to " + ccs.stopid + " in " + ccs.d + " miles"); 
          lego = makeLeg(fromid, 0, ccs.stopid, 0, null, ccs.route );
          lego.routeid = ccs.route;
          addLegToStrategy( Strategy,  lego);        
//          Strategies[Strategies.length] = Strategy;
          fromid = ccs.stopid;
          fromroutes = getRoutesS(fromid);
          }
          else
          {
            fromid = p1; 
            fromroutes = getRoutesS(fromid);
            fisbus = false;
          }
        }
      }
      else if(fisbus && bOtherStop)
      {
        fromid = OtherStop;
        fromroutes = getRoutesS(fromid);
      }
      
      report(Strategies.length + " " + Strategy.length);
      if(LastLego == null) LastLego = new Leg();
      let glr = new GLR(fromid, fromroutes, toid, toroutes, Strategies, Strategy, LastLego, false);
      let bjrf = isLIJeffersonBranch(fromid);
      let bjrt = isLIJeffersonBranch(toid);
      let bgrf = isLIGreenportBranch(fromid);
      let bgrt = isLIGreenportBranch(toid);
      report("bgrf1 = " + bgrf + " bgrt1 = " + bgrt);
      if(!bjrf && !bjrt && !bgrf && !bgrt) glr = getLegsGeneric(glr);
      bEnd = glr.bEnd;
      glr = getLegsNJ(glr);
      report("\nbEnd = " + bEnd);
      if(!bEnd)
      {
        glr = getLegsCC(glr);
        glr = getLegsLI(glr);
//        glr = getLegsNJ(glr);
        glr = getLegsBR(glr);
        glr = getLegsNYC(glr);
        glr = getLegsChicago(glr);
      }
      report("glr.lastleg.children = " + glr.lastleg.children.length);
      LastLego = glr.lastleg; //getLastLeg(0);
      if(LastLego != null)
//      report("LastLego1 startid = " + LastLego.startid + " destid = " + LastLego.destid);

//      glr = getLegsBR(glr);

      fromid = glr.fromid;
      fromroutes = glr.fromroutes;
      toid = glr.toid;
      toroutes = glr.toroutes;
//      LastLego = glr.getLastLeg(0);
      
      if(LastLego != null)
//      report("LastLego2 startid = " + LastLego.startid + " destid = " + LastLego.destid);
      if(LastLego == null) LastLego = new Leg();
//      report("LastLego3 startid = " + LastLego.startid + " destid = " + LastLego.destid);
      Strategies = glr.strategies;
      Strategy = glr.strategy;
      bEnd = glr.bEnd;
      
      report(Strategies.length + " " + Strategy.length + " " + bEnd + " " + fromid + " " + toid + " " + LastLego.children.length + " " + glr.lastleg.children.length);
      
      if(!bEnd)
      {
          /*
        if((fromroutes == "PP14343") && (routelistContains(toroutes, "PP14343") == -1))
        {
            
        }
        */
        if(fromid == "ProvincetownDock")
        {
          let leg = makeLeg(fromid, 0, "Boston-Seaport", 0, null, "BP0" );
          leg.routeid = "BP0";
          addLegToStrategy( Strategy,  leg);        
          fromid = "place-wtcst";
          fromroutes = "741";
          fisbus = true;
        }
        else if(fromid == "Nantucket")
        {
          let leg = makeLeg(fromid, 0, "HyannisTerminal", 0, null, "HN0" );
          leg.routeid = "HN0";
          addLegToStrategy( Strategy,  leg);        
          fromid = "Hyannis";
          fromroutes = getRoutesS(fromid);
          fisbus = true;
        }
        else if(fromid == "OakBluffs")
        {
          let leg = makeLeg(fromid, 0, "HyannisTerminal", 0, null, "OB0" );
          leg.routeid = "OB0";
          addLegToStrategy( Strategy,  leg);        
          fromid = "Hyannis";
          fromroutes = getRoutesS(fromid);
          fisbus = true;
        }
         else if(fromid == "Vineyard Haven")
        {
          let leg = makeLeg(fromid, 0, "Woods Hole", 0, null, "MV0" );
          leg.routeid = "MV0";
          addLegToStrategy( Strategy,  leg);        
          fromid = "Woods Hole";
          fromroutes = getRoutesS("place-woods");
          fisbus = true;
        }
        /*
       else if(fromid == "Halifax-NS")
        {
          let leg = makeLeg(fromid, 0, "Montreal-QC", 0, null, "VIA1" );
          leg.routeid = "VIA1";
          addLegToStrategy( Strategy,  leg);        
          fromid = "Montreal-QC";
          fromroutes = getRoutesS(fromid);
          fisbus = true;
        }
        */
        else if((fromroutes.indexOf("PP14343") != -1) &&  (!stopsHaveSameParent(fromid, "Hyannis"))) // (!stopsHaveSameParent(fromid, "Provincetown")) &&
        {
          let leg = makeLeg(fromid, 0, "Hyannis", 0, null, "PP14343" );
          leg.routeid = "PP14343";
          addLegToStrategy( Strategy,  leg);        
          fromid = "Hyannis";
          fromroutes = getRoutesS(fromid);
          fisbus = true;
        }
        else if(fromid == "Yarmouth-Ferry-NS")
        {
          let leg = makeLeg(fromid, 0, "Bar-Harbor-ME", 0, null, "PY0" );
          leg.routeid = "PY0";
          addLegToStrategy( Strategy,  leg);
          leg = makeLeg("Bar-Harbor-ME", 0, "Bangor-ME", 0, null, "DE1" );
          leg.routeid = "DE1";
          addLegToStrategy( Strategy,  leg);
         
          fromid = "Bangor-ME";
          fromroutes = getRoutesS(fromid);
          fisbus = true;
        }
     }
//      toid = getParentIdFromId(toid);
      if(tisbus)
      {
        report("tisbus kx = " + kx);
//        if((kx == 0) && !fisbus)
        if((kx == 0))
        {
          let ccs = getClosestConnection(toid, toroutes, fromid);
          if(ccs != null)
          {
          report("closest2 connection bus " + ccs.route + " to " + ccs.stopid + " in " + ccs.d + " miles"); 
          let lego = makeLeg(ccs.stopid, 0, toid, 0, null, ccs.route );
          lego.routeid = ccs.route;
//          LastLego = lego;
          LastLego.addLeg(lego);
          toid = ccs.stopid;
          toroutes = getRoutesS(toid);
          bAddLastBus = true;
          }
          else report("ccs is null " + toid + " " + toroutes);
        }
      }
//      report("LastLego0 startid = " + LastLego.startid + " destid = " + LastLego.destid);
     
      cr = getCommonRoutesS(fromroutes, toroutes);
      kx = cr.length;
      
 //     report("442 toid = " + toid + " kx = " + kx + " " + cr[0]);
      if(kx == 0)
      {
        if((toid == "ProvincetownDock") || (toid == "place-ptown"))
        {
            lego = makeLeg("Boston-Seaport", 0, toid, 0, null, "BP0" );
            lego.routeid = "BP0";
            LastLego = lego;
            toid = "place-wtcst";
            toroutes = "741";
            cr = getCommonRoutesS(fromroutes, toroutes);
            kx = cr.length;
            bAddLastBus = true; 
            
        }
        else if((toroutes.indexOf("PP14343") != -1) && (toid != "ProvincetownDock"))
        {
          report("add PP14343 lastlego");
          let lego = null;
          if((getParentIdFromId(fromid) != "Hyannis") && (getParentIdFromId(toid) != "place-hyannis"))
          {
            lego = makeLeg("Hyannis", 0, toid, 0, null, "PP14343" );
            lego.routeid = "PP14343";
            LastLego = lego;
            toid = "Hyannis";
            toroutes = "PP14313";
            cr = getCommonRoutesS(fromroutes, toroutes);
            kx = cr.length;
            bAddLastBus = true; 
          } 
        }
        /*
        else if(toid == "ProvincetownDock")
        {
            lego = makeLeg("Boston-Seaport", 0, toid, 0, null, "BP0" );
            lego.routeid = "BP0";
            LastLego = lego;
            toid = "place-wtcst";
            toroutes = "741";
            cr = getCommonRoutesS(fromroutes, toroutes);
            kx = cr.length;
            bAddLastBus = true; 
            
        }
        */
        else if(toid == "Nantucket")
        {
            lego = makeLeg("HyannisTerminal", 0, toid, 0, null, "HN0" );
            lego.routeid = "HN0";
            LastLego = lego;
            toid = "Hyannis";
            toroutes = "CF0,PB2,PP14343";
            cr = getCommonRoutesS(fromroutes, toroutes);
            kx = cr.length;
            bAddLastBus = true;             
        }
        else if(toid == "OakBluffs")
        {
            lego = makeLeg("HyannisTerminal", 0, toid, 0, null, "OB0" );
            lego.routeid = "OB0";
            LastLego = lego;
            toid = "Hyannis";
            toroutes = "CF0,PB2,PP14343";
            cr = getCommonRoutesS(fromroutes, toroutes);
            kx = cr.length;
            bAddLastBus = true;             
        }
        else if(toid == "Vineyard Haven")
        {
            lego = makeLeg("Woods Hole", 0, toid, 0, null, "MV0" );
            lego.routeid = "MV0";
            LastLego = lego;
            toid = "Woods Hole";
            toroutes = getRoutesS("place-woods");
 //           toroutes = "CF0,PB2,PP14343";
            cr = getCommonRoutesS(fromroutes, toroutes);
            kx = cr.length;
            bAddLastBus = true;             
        }
        /*
        else if(toid == "Portland-Dock-ME")
        {
            lego = makeLeg("Portland-ME", 0,"Portland-Dock-ME" , 0, null, "OB0" );
            lego.routeid = "PY0";
            LastLego = lego;
            toid = "Portland-ME";
            toroutes = "AMR61";
            cr = getCommonRoutesS(fromroutes, toroutes);
            kx = cr.length;
            bAddLastBus = true;                         
        }
        */
        else if(toid == "Yarmouth-Ferry-NS")
        {
            lego = makeLeg("Bar-Harbor-ME", 0, toid, 0, null, "PY0" );
            lego.routeid = "PY0";
            LastLego = lego;
            toid = "Portland-ME";
            toroutes = "AMR61";
            cr = getCommonRoutesS(fromroutes, toroutes);
            kx = cr.length;
            bAddLastBus = true;             
        }
      }

      let fp = getParentIdFromId(fromid);
      let tod = getParentIdFromId(toid);
      /*
      if(isCN0Shuttle(fp))
      {
         addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Manchester", 0, null,"Shuttle-ManchesterRockport"));
         fromid = "Manchester"; 
      }
      if(isCN0Shuttle(tod))
      {
         LastLego = makeLeg("Manchester", 0, tod, 0, null,"Shuttle-ManchesterRockport");
         toid = "Manchester";
      }
     */
      cr = getCommonRoutesS(getRoutesS(fp), getRoutesS(tod));
      kx = cr.length;
      report("kx = " + kx);
      if((!bEnd) && (kx == 0))
      {
           
      }
      if((!bEnd) && (kx > 0))
      {
         report("LastLego has " + LastLego.children.length + " children");
         report("Strategy has " + Strategy.length + " legs");
         let i = 0;
         for(i = 0; i < kx; i++)
         {
           let Strategyx = cloneStrategy(Strategy);
           addLegToStrategy(Strategyx, makeLeg(fp, 0, tod, 0, null, cr[i]));
           if(LastLego.children.length != 0)
           {
             addLegToStrategy(Strategyx, LastLego);
           }
           else if((LastLego.startid != null) && (LastLego.destid != null))
           {
              addLegToStrategy(Strategyx, LastLego);  
           }
           Strategies[Strategies.length] = Strategyx;
         }
         report("got here 1252 " + cr[0]);
         if(cr[0].indexOf("MN5") == -1)
         {
         resolve(Strategies);
         return(p);
         }
         else
         {
           kx = 0;   
         }
//         toid = fromid
      }
      report("got here 2 bEnd = " + bEnd + " " + fromid + " " + toid + " " + kx);
 
      if(bEnd)
      {
        report("Strategies2.length = " + Strategies.length);
        report("Strategies[0] has length" + Strategies[0].length);
//        report("Strategies[0] has length" + Strategies[0].length + " legs");
        resolve(Strategies);
        return;
      }
      
      report("\n ---- ");     
      report("LastLego has " + LastLego.children.length + " children");
      report("Strategy has " + Strategy.length + " legs");
      report("Strategies has " + Strategies.length + " strategies");

      
      if((toid != fromid)  && (kx == 0))
      {
          /*
      if(fromroutes.indexOf("AR2") != -1)
      {
        let kr = getCommonRoutesS(getRoutesS("NewHaven-CT"), getRoutesS(toid));
        if(kr.length > 0)
        {
          let Strategy2 = [];
          if("NewHaven-CT" != fromid)Strategy2[Strategy2.length] = makeLeg(fromid, 0, "NewHaven-CT", 0, null,"AR2");
          Strategy2[Strategy2.length] = makeLeg("NewHaven-CT", 0, toid, 0, null, kr[0]);
          Strategies[Strategies.length] = Strategy2;              
        }
      }
      else if(toroutes.indexOf("AR2") != -1)
      {
        let kr = getCommonRoutesS(getRoutesS("NewHaven-CT"), getRoutesS(fromid));
        if(kr.length > 0)
        {
          let Strategy2 = [];
          if("NewHaven-CT" != fromid)Strategy2[Strategy2.length] = makeLeg(fromid, 0, "NewHaven-CT", 0, null,kr[0]);
          Strategy2[Strategy2.length] = makeLeg("NewHaven-CT", 0, toid, 0, null, "AR2");
          Strategies[Strategies.length] = Strategy2;              
        }
      }
      */
                      
      if(fromroutes.indexOf("CT1") != -1)
      {
        let kr = getCommonRoutesS(getRoutesS("NewHaven-CT"), getRoutesS(toid));
        if(kr.length > 0)
        {
          let Strategy2 = [];
          if("NewHaven-CT" != fromid)Strategy2[Strategy2.length] = makeLeg(fromid, 0, "NewHaven-CT", 0, null,"CT1");
          Strategy2[Strategy2.length] = makeLeg("NewHaven-CT", 0, toid, 0, null, kr[0]);
          Strategies[Strategies.length] = Strategy2;              
        }
      }
      else if(toroutes.indexOf("CT1") != -1)
      {
        let kr = getCommonRoutesS(getRoutesS("NewHaven-CT"), getRoutesS(fromid));
        if(kr.length > 0)
        {
          let Strategy2 = [];
          if("NewHaven-CT" != fromid)Strategy2[Strategy2.length] = makeLeg(fromid, 0, "NewHaven-CT", 0, null,kr[0]);
          Strategy2[Strategy2.length] = makeLeg("NewHaven-CT", 0, toid, 0, null, "CT1");
          Strategies[Strategies.length] = Strategy2;              
        }
      }
      
      if(fromroutes.indexOf("SE1") != -1)
      {
        if("NewHaven-CT" != fromid) 
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "NewHaven-CT", 0, null,"SE1")); 
          fromid = "NewHaven-CT";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      if(toroutes.indexOf("SE1") != -1)
      {
        if(("NewHaven-CT" != toid) && ("NewLondon-CT" != toid) && ("Stamford-CT" != toid))
        {
          lego = makeLeg("NewHaven-CT", 0, toid, 0, null, "SE1" );
          lego.routeid = "SE1";
          LastLego = lego;
          toid = "NewHaven-CT";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      report("fromid = " + fromid + " toid = " + toid);
      if(fromroutes.indexOf("MN3") != -1)
      {
        if(("NewHaven-CT" != fromid) && ("NewYork-Grand-Central-NY" != fromid) && ("Stamford-CT" != fromid) && (getParentIdFromId(fromid) != "place-gcny")) 
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Stamford-CT", 0, null,"MN3")); 
          fromid = "Stamford-CT";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      else if(toroutes.indexOf("MN3") != -1)
      {
        if(("NewHaven-CT" != toid) && (getParentIdFromId(toid) != "place-gcny") && ("Stamford-CT" != toid))
        {
          lego = makeLeg("Stamford-CT", 0, toid, 0, null, "MN3" );
          lego.routeid = "MN3";
          LastLego = lego;
          toid = "Stamford-CT";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      if(fromroutes.indexOf("MN6") != -1)
      {
        if(("Bridgeport-CT" != fromid) && ("NewYork-Grand-Central-NY" != fromid) && ("Stamford-CT" != fromid) && (getParentIdFromId(fromid) != "place-gcny")) 
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Bridgeport-CT", 0, null,"MN6")); 
          fromid = "Bridgeport-CT";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      if(toroutes.indexOf("MN6") != -1)
      {
        if(("Bridgeport-CT" != toid) && (getParentIdFromId(toid) != "place-gcny") && ("Stamford-CT" != toid))
        {
          lego = makeLeg("Bridgeport-CT", 0, toid, 0, null, "MN6" );
          lego.routeid = "MN6";
          LastLego = lego;
          toid = "Bridgeport-CT";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      if(fromroutes.indexOf("MN1") != -1)
      {
        if(("NewYork-Grand-Central-NY" != fromid) && (getParentIdFromId(fromid) != "place-gcny")) 
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "NewYork-Grand-Central-NY", 0, null,"MN1")); 
          fromid = "place-nyc";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      if(toroutes.indexOf("MN1") != -1)
      {
        if((getParentIdFromId(toid) != "place-gcny") )
        {
          lego = makeLeg("NewYork-Grand-Central-NY", 0, toid, 0, null, "MN1" );
          lego.routeid = "MN1";
          LastLego = lego;
          toid = "NewYork-Grand-Central-NY";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      /*
      if(fromroutes.indexOf("MN5") != -1)
      {
        if(("SouthNorwalk-CT" != fromid) && (getParentIdFromId(fromid) != "place-nyc") )
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "SouthNorwalk-CT", 0, null,"MN5")); 
          fromid = "SouthNorwalk-CT";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      if(toroutes.indexOf("MN5") != -1)
      {
        if((getParentIdFromId(toid) != "SouthNorwalk-CT") && (getParentIdFromId(toid) != "place-nyc") )
        {
          lego = makeLeg("SouthNorwalk-CT", 0, toid, 0, null, "MN5" );
          lego.routeid = "MN5";
          LastLego = lego;
          toid = "SouthNorwalk-CT";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      */
      if(fromroutes.indexOf("MN4") != -1)
      {
        if(("Stamford-CT" != fromid) && (getParentIdFromId(fromid) != "place-gcny") )
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Stamford-CT", 0, null,"MN4")); 
          fromid = "Stamford-CT";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      if(toroutes.indexOf("MN4") != -1)
      {
        if((getParentIdFromId(toid) != "Stamford-CT") && (getParentIdFromId(toid) != "place-gcny") )
        {
          lego = makeLeg("Stamford-CT", 0, toid, 0, null, "MN4" );
          lego.routeid = "MN4";
          LastLego = lego;
          toid = "Stamford-CT";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      if(fromroutes.indexOf("MN7") != -1)
      {
        if(getParentIdFromId(fromid) != "MNR_94") 
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "MNR_94", 0, null,"MN7")); 
          fromid = "MNR_94";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
      }
      if(toroutes.indexOf("MN7") != -1)
      {
        if(getParentIdFromId(toid) != "MNR_94") 
        {
          lego = makeLeg("MNR_94", 0, toid, 0, null, "MN7" );
          lego.routeid = "MN7";
          LastLego = lego;
          toid = "MNR_94";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
     
      if((fromid != toid)) // && (kx != 0))
      {
      if(fromroutes.indexOf("MN2") != -1)
      {
        if(getParentIdFromId(fromid) != "place-gcny") 
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "NewYork-Grand-Central-NY", 0, null,"MN2")); 
          fromid = "NewYork-Grand-Central-NY";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      
      if(toroutes.indexOf("MN2") != -1)
      {
        if(getParentIdFromId(toid) != "place-gcny") 
        {
          lego = makeLeg("NewYork-Grand-Central-NY", 0, toid, 0, null, "MN2" );
          lego.routeid = "MN2";
          LastLego.addLeg(lego);
          toid = "NewYork-Grand-Central-NY";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      if(fromroutes.indexOf("MN5") != -1)
      {
        if(("SouthNorwalk-CT" != fromid) && (getParentIdFromId(fromid) != "place-gcny") )
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "SouthNorwalk-CT", 0, null,"MN5")); 
          fromid = "SouthNorwalk-CT";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      if(toroutes.indexOf("MN5") != -1)
      {
        if((getParentIdFromId(toid) != "SouthNorwalk-CT") && (getParentIdFromId(toid) != "place-gcny") )
        {
          lego = makeLeg("SouthNorwalk-CT", 0, toid, 0, null, "MN5" );
          lego.routeid = "MN5";
          LastLego = lego;
          toid = "SouthNorwalk-CT";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      /*
      if((fromroutes.indexOf("VIA1") != -1) && (fromid != "Montreal-QC"))
      {
        if(("SouthNorwalk-CT" != fromid) && (getParentIdFromId(fromid) != "place-gcny") )
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Montreal-QC", 0, null,"VIA1")); 
          fromid = "Montreal-QC";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
      }
      */
      /*
      if((toroutes.indexOf("VIA1") != -1) && (toid != "Montreal-QC"))
      {
          lego = makeLeg("Montreal-QC", 0, toid, 0, null, "VIA1" );
          lego.routeid = "VIA1";
          LastLego = lego;
          toid = "Montreal-QC";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
      }
      */
         
      report("kx = " + kx + " " + cr[0] + " toid = " + toid);
      
      
      if(fromroutes.indexOf("L66") != -1) 
      {
        if(getParentIdFromId(fromid) == "place-LoganA")
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-sstat", 0, null,"741")); 
          fromid = "place-sstat";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
        else if(getParentIdFromId(fromid) != "place-aport") 
        {
          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-aport", 0, null,"L66")); 
          fromid = "place-aport";
          fromroutes = getRoutesS(fromid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
        }
          
      }
      /*
      if(toroutes.indexOf("L66") != -1)
      {
        if(getParentIdFromId(toid) != "place-aport") 
        {
          lego = makeLeg("place-aport", 0, toid, 0, null, "L66" );
          lego.routeid = "L66";
          LastLego = lego;
          toid = "place-aport";
          toroutes = getRoutesS(toid);
          cr = getCommonRoutesS(fromroutes, toroutes);
          kx = cr.length;
          bAddLastBus = true;             
        }
      }
      */
      
      
      }
      /*
      let cnxt0 = getClosestConnection2(fromid, fromroutes, toid);
      let cnxt1 = getClosestConnection2(toid, toroutes, fromid);
      report("closest connections " + cnxt0.stopid + " " + cnxt1.stopid);
      let ku = getCommonRoutesS(getRoutesS(cnxt0.stopid), getRoutesS(cnxt1.stopid));
      report("ku.length = " + ku.length);
      */
      
      if(isAirportStop(fromid) && isAirportStop(toid))
      {
        if(kx == 0)
        {
          report("both stops are airport");
          let tps = getTransferPoints(fromid, fromroutes, toid, toroutes);
          let tp = null;
          if(tps.length > 0) tp = tps[0];
          if(tp != null)
          {
            let Legs = new Leg();
            Legs.addChild( makeLeg(fromid, 0, tp.fstop, 0, null, tp.froute));
            if(tp.fstop != tp.tstop)
            {
              Legs.addChild( makeLeg(tp.fstop, 0, tp.tstop, 0, null, tp.route));
              Legs.addChild( makeLeg(tp.tstop, 0, toid, 0, null, tp.troute));
            }
            else
            {
              Legs.addChild( makeLeg(tp.fstop, 0, toid, 0, null, tp.troute));          
            }
            let k = Legs.children.length;
            report("Legs.length = " + k);
            let i = 0;
            if(Legs != null)
            {
              Strategy = addLegToStrategy(Strategy, Legs);  
              if(LastLego != null)
              {
                report("LastLego not null"); 
                Strategy = addLegToStrategy(Strategy, LastLego);   
              }
              Strategies[Strategies.length] = Strategy;
              resolve(Strategies);
              return;
           }
          }
          else report("no transfer points");
        }
      }
      
      let pfid = getParentIdFromId(fromid);
      let ptid = getParentIdFromId(toid);
      /*
      if(isCN0Shuttle(pfid))
      {
         addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Manchester", 0, null,"Shuttle-ManchesterRockport"));
         fromid = "Manchester"; 
      }
      if(isCN0Shuttle(ptid))
      {
         LastLego = makeLeg("Manchester", 0, ptid, 0, null,"Shuttle-ManchesterRockport");
         toid = "Manchester";
      }
      */
      
      if(bEnd)
      {
        report( "case 000")
        resolve(Strategies);
        return;
      }
      else if(getParentIdFromId(fromid) == getParentIdFromId(toid))
      {
        report("case 00 " + Strategies.length + " " + Strategy.length);
        resolveEnd(LastLego, resolve, Strategies, Strategy);
      }
      else if((kx == 0) && (fromroutes == "CN1") && (toroutes == "CN0"))
      {
//        let Strategy1 = new Array();
        addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Beverly", 0, null,"CN1"));
        addLegToStrategy( Strategy,  makeLeg("Beverly", 0, toid, 0, null, "CN0"));
        resolveEnd(LastLego, resolve, Strategies, Strategy);
      }
      else if((kx == 0) && (fromroutes == "CN0") && (toroutes == "CN1"))
      {
//        let Strategy1 = new Array();
        addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Beverly", 0, null,"CN0"));
        addLegToStrategy( Strategy,  makeLeg("Beverly", 0, toid, 0, null, "CN1"));
        resolveEnd(LastLego, resolve, Strategies, Strategy);
      }
      else if((fromroutes.indexOf("CH0") != -1) && (toroutes == "AMR61") && (fromid != "place-north"))
      {
        addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Haverhill", 0, null,"CH0"));
        addLegToStrategy( Strategy,  makeLeg("Haverhill", 0, toid, 0, null, "AMR61"));
        resolveEnd(LastLego, resolve, Strategies, Strategy);          
      }
      else if((fromroutes.indexOf("CL0")) && (toroutes == "AMR61") && (fromid != "place-north"))
      {
        addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Anderson/ Woburn", 0, null,"CL0"));
        addLegToStrategy( Strategy,  makeLeg("Anderson/ Woburn", 0, toid, 0, null, "AMR61"));
        resolveEnd(LastLego, resolve, Strategies, Strategy);          
      }
      else if((kx > 0) && (fp != "place-rugg")) // on the same route
      {
        report("case 0 " + kx + " " + toid + " " + fromid);
        let ix = 0;
        while(ix < kx)
        {
          let Strategy1 = new Array();
          clearArray(Strategy1);
          if((fisbus) || (Strategy.length > 0))
          {
            if(Strategy[0] !== undefined) Strategy1[Strategy1.length] = Strategy[0].clone();  
          }
//          if(lego != null) Strategy1[Strategy1.length] = lego;
          report("cr "  + ix + " " + cr[ix] + " " + fromid + " " + toid);
          if(fromid == toid)
          {
            addLegToStrategy(Strategy1, LastLego);
            Strategies[Strategies.length] = Strategy1;              
          }
          else if(cr[ix].indexOf(",") == -1)
          {
            report("case 0a " + fromid + " " + toid + " " + cr[ix]);
            Strategy1[Strategy1.length] = makeLeg(fromid, 0, toid, 0, null, cr[ix]);
            addLegToStrategy(Strategy1, LastLego);
            Strategies[Strategies.length] = Strategy1;
          }
          else if(bBranch)
          {
            let x = getBranchStops(fromid, cr[ix]);
            if(bscp)
            {
              report("branch bscp " + cr[ix] );
              Strategy1[Strategy1.length] = makeLeg(fromid, 0, "place-coecl", 0, null, cr[ix]);
              Strategy1[Strategy1.length] = makeLeg("place-coecl", 0, toid, 0, null, cr[ix]);
              if(LastLego != null) Strategy1[Strategy1.length] = LastLego;
              Strategies[Strategies.length] = Strategy1;
            }
            else if(bsps)
            {
              report("branch bsps " + cr[ix] );
              Strategy1[Strategy1.length] = makeLeg(fromid, 0, "place-pktrm", 0, null, cr[ix]);
              Strategy1[Strategy1.length] = makeLeg("place-pktrm", 0, toid, 0, null, cr[ix]);
              if(LastLego != null) Strategy1[Strategy1.length] = LastLego;
              Strategies[Strategies.length] = Strategy1;
            }
            else if(bsns)
            {
              report("branch bsns " + cr[ix] );
              Strategy1[Strategy1.length] = makeLeg(fromid, 0, "place-north", 0, null, cr[ix]);
              Strategy1[Strategy1.length] = makeLeg("place-north", 0, toid, 0, null, cr[ix]);
              if(LastLego != null) Strategy1[Strategy1.length] = LastLego;
              Strategies[Strategies.length] = Strategy1;
            }
            else if(bsss)
            {
              report("branch bsss " + cr[ix] );
              Strategy1[Strategy1.length] = makeLeg(fromid, 0, "place-sstat", 0, null, cr[ix]);
              Strategy1[Strategy1.length] = makeLeg("place-sstat", 0, toid, 0, null, cr[ix]);
              if(LastLego != null) Strategy1[Strategy1.length] = LastLego;
              Strategies[Strategies.length] = Strategy1;
            }
            else
            {
              let kk = x.length;
              report("branch unimplemented kk = " + kk);
              /*
              let 
              Strategy1[Strategy1.length] = makeLeg(fromid, 0, "Park Sreet", 0, null, cr[ix]);
              Strategy1[Strategy1.length] = makeLeg("Park Sreet", 0, toid, 0, null, cr[ix]);
              Strategies[Strategies.length] = Strategy1;
               */ 
            }
                
          }
          else // TODO
          {
            report("case 0 339");
            addLegToStrategy( Strategy,  makeLeg(fromid, 0, "X" + cr[ix], 0, null, cr[ix]));
            Strategies[Strategies.length] = Strategy;
            addLegToStrategy( Strategy,  makeLeg("X" + cr[ix], 0, toid, 0, null, cr[ix]));
            Strategies[Strategies.length] = Strategy1;
  //          resolve(Strategies);               
          }
//          report("cr " + cr[ix]);
          ix += 1;
        }
         resolve(Strategies);  
       }
      else if((branches.length > 0) && (bsps || bsns || bsss))
      {
          report("case 7 branch")
          let Strategy1 = new Array();
          clearArray(Strategy1);
          let k3 = branches.length;
          let i3 = 0;
          report("branches.length = " + k3 + " " + bsps + " " + bsns + " " + bsss + " " + bjfk + " " + bsah);
          while(i3 < k3)
          {
            report("   " + branches[i3]);
            i3 += 1;
          }
          i3 = 0;
            let x = getBranchStops(fromid, branches[i3]);
            if((bscp) || (x[0] == "place-coecl"))
            {
              report("branch bscp " + branches[i3] + " " + getCommonRoutesSS("place-coecl", toid) );
              addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-coecl", 0, null, getCommonRoutesSS("place-coecl", fromid)));
              addLegToStrategy( Strategy,  makeLeg("place-coecl", 0, toid, 0, null, getCommonRoutesSS("place-coecl", toid)));
              if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
              Strategies[Strategies.length] = Strategy;
            }
            else if((bsps) || (x[0] == "place-pktrm"))
            {
              report("branch bsps");
              addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-pktrm", 0, null, branches[i3]));
              addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, toid, 0, null, getCommonRoutesSS("place-pktrm", toid)));
              if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
              Strategies[Strategies.length] = Strategy;
            }
            else if(bsns)
            {
              report("branch bsns");
              addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-north", 0, null, branches[i3]));
              addLegToStrategy( Strategy,  makeLeg("place-north", 0, toid, 0, null, branches[i3]));
              if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
              Strategies[Strategies.length] = Strategy;
            }
            else if(bsss)
            {
              report("branch bsss");
              addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-sstat", 0, null, branches[i3]));
              addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, branches[i3]));
              if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
              Strategies[Strategies.length] = Strategy;
            }
            else if(bjfk)
            {
              report("branch bjfk");
              addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-jfk", 0, null, branches[i3]));
              addLegToStrategy( Strategy,  makeLeg("place-jfk", 0, toid, 0, null, branches[i3]));
              if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
              Strategies[Strategies.length] = Strategy;
            }
            else if(bsah)
            {
              report("branch bsah");
              addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-asmnl", 0, null, branches[i3]));
              addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, toid, 0, null, branches[i3]));
              if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
              Strategies[Strategies.length] = Strategy;
            }
            else
            {
              let kk = x.length;
              let ii = 0;
              report("branch case 7 unimplemented kk = " + kk);
              while(ii < kk)
              {
                report("   " + x[ii]);
                ii += 1;
              }
              /*
              let 
              Strategy1[Strategy1.length] = makeLeg(fromid, 0, "Park Sreet", 0, null, cr[ix]);
              Strategy1[Strategy1.length] = makeLeg("Park Sreet", 0, toid, 0, null, cr[ix]);
              Strategies[Strategies.length] = Strategy1;
               */ 
            }
        
        resolve(Strategies);  
     }
      else if(fromid == toid)
      {
         report("case 00");
         if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
         Strategies[Strategies.length] = Strategy;
         resolve(Strategies);       
      }
      else if(isRailStop(fromid) && (fromid != "place-rugg"))
      {
         let fromroutes = SimRoute;
         if(fromid == "place-north")
         {
            report("case 1");
            if(isRailStop(toid))
            {
              let toroutes = SimRoute;
              if(isRailStopNS(toid))
              {
               addLegToStrategy( Strategy,  makeLeg("place-north", 0, toid, 0, null, getCommonRoutesSS("place-north", toid)));
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);               
              }
              else
              {
               addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg",0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-sstat", 0, null, "R0"));  
 //              if(toid != "South Station") 
               /*addLegToStrategy( Strategy,  makeLeg("South Station", 0, toid, 0, null, getCommonRoutesSS("South Station", toid));
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
               Strategies[Strategies.length] = Strategy;
               */
               if(getParentIdFromId(toid) != "place-sstat")
               {
                 let fromroutes = getRoutesS("place-sstat");
                 let toroutes = getRoutesS(toid);
                 let cr = getCommonRoutesS(fromroutes, toroutes);
                 let kx = cr.length;
                 let ix = 0;
                 while(ix < kx)
                 {
                   let Strategy3 = cloneStrategy(Strategy);
                   Strategy3[Strategy3.length] = makeLeg("place-sstat", 0, toid, 0,                
                        null, cr[ix]);
                   if(LastLego != null) Strategy3[Strategy3.length] = LastLego.clone();
                   Strategies[Strategies.length] = Strategy3;
                   ix += 1;
                 }
               }
               else
               {
                 Strategies[Strategies.length] = Strategy;
               }

               
               resolve(Strategies);               
              }
            }
            else if(isAirportStop(toid))
            {
               // go to airport
               addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-gover",0, null, "G0"));
               addLegToStrategy( Strategy,  makeLeg("place-gover", 0, "place-aport", 0, null, "B0"));  
               if(toroutes.indexOf("L66") != -1)
               {
                 if(getParentIdFromId(toid) != "place-aport") 
                 {
                   lego = makeLeg("place-aport", 0, toid, 0, null, "L66" );
                   lego.routeid = "L66";
                   LastLego = lego;
                   addLegToStrategy( Strategy,  LastLego);
                 }
                 Strategies[Strategies.length] = Strategy;
                 resolve(Strategies);               
               }
            }
            else if(isSubwayStop(toid))
            {
               report("case 1a toroutes = " + toroutes);
               let bUseO = false;
               let oid = fromid;
//               if(fromid != "North Station") addLegToStrategy( Strategy,  makeLeg(fromid, 0, "North Station", 0, null, getCommonRoutesSS(fromid, "North Station"));
              if(toid == "place-north")
              {
                 if(LastLego != null) 
                 {
                   addLegToStrategy( Strategy,  LastLego);
                   Strategies[Strategies.length] = Strategy;
                 }
              }
              else if(routelistContains(toroutes, "B0") )
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-state", 0,null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-state", 0, toid, 0,null, "B0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "O0") )
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, toid, 0,null, "O0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "G4") )
               {
                  addLegToStrategy( Strategy,  makeLeg("place-north", 0, toid, 0, null, "G4"));
                  if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                  Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "G0") ) || (routelistContains(toroutes, "G1") ) || (routelistContains(toroutes, "G2") ) || (routelistContains(toroutes, "G3") ) )
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-pktrm", 0, null, "G0"));
                 addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, toid, 0,null, toroutes));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "R0") ) || (routelistContains(toroutes, "R1") ) || (routelistContains(toroutes, "R2") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg", 0, null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, toid,0, null, "R0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "R3") )
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg", 0, null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-asmnl",0, null, "R2"));
                 addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, toid,0, null, "R3"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "S1") ) ||(routelistContains(toroutes, "741") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg", 0, null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-sstat",0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, "741"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               resolve(Strategies);               
             }
            else
            {
               report("case 1 error for toid = " + toid);
               clearFcbut();
            }
         }
         else if(isRailStopNS(fromid))
         {
             report("case 2");
             if(toid == "place-north") 
             {
               // go to NS
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-north", 0, null, getCommonRoutesSS(fromid, "place-north")));
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);               
             }
             else if(isAirportStop(toid))
             {
                report("got here 128");
               // go to airport
               if((routelistContains(fromroutes, "CN1") || routelistContains(fromroutes, "CN0")) && (getParentIdFromId(fromid) != "place-north"))
               {
                 addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-chels", 0, null, getCommonRoutesSS(fromid, "place-chels")));
                 addLegToStrategy( Strategy,  makeLeg("place-chels", 0, "place-aport",0, null, "743"));
               }
               else 
               {
                if(getParentIdFromId(fromid) != "place-north") addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-north", 0,                 
                 null, getCommonRoutesSS(fromid, "place-north")));
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-gover",0, null, "G0"));
                 addLegToStrategy( Strategy,  makeLeg("place-gover", 0, "place-aport", 0, null, "B0")); 
               }
               if(getParentIdFromId(toid) != "place-aport") 
               {
                 addLegToStrategy( Strategy,  makeLeg("place-aport", 0, toid, 0, null, "L66" ));
               }
     
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);               
            }
            else if(isSubwayStop(toid))
            {
               report("case 2a toid = " + toid + " toroutes = " + toroutes);
               let bUseO = false;
               let oid = fromid;
               if((fromid != "North Station") && (fromid != "place-north")) addLegToStrategy( Strategy,  makeLeg(fromid, 0, "North Station", 0, null, getCommonRoutesSS(fromid, "place-north")));
               if(toid == "place-north") resolve(Strategies);
               if(routelistContains(toroutes, "B0"))
               {
                 report("case 2aB");
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-state", 0,null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-state", 0, toid, 0,null, "B0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "O0"))
               {
                 report("case 2aO");
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, toid, 0,null, "O0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "G4"))
               {
                 report("case 2aG4");
                  addLegToStrategy( Strategy,  makeLeg("place-north", 0, toid, 0, null, "G4"));
                  if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                  Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "G0")) || (routelistContains(toroutes, "G1")) || (routelistContains(toroutes, "G2")) || (routelistContains(toroutes, "G3")) )
               {
                 report("case 2aG");
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-pktrm", 0, null, "G0"));
                 addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, toid, 0,null, toroutes));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "R0") ) || (routelistContains(toroutes, "R1") ) || (routelistContains(toroutes, "R2") ))
               {
                 report("case 2aR");
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg", 0, null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, toid,0, null, "R0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "R3") )
               {
                 report("case 2aR3");
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg", 0, null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-asmnl",0, null, "R2"));
                 addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, toid,0, null, "R3"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
                   
               }
               else if((routelistContains(toroutes, "S1") ) || (routelistContains(toroutes, "741") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg", 0, null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-sstat",0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, "741"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
 //                resolve(Strategies); 
               }
               else if((routelistContains(toroutes, "PB2") ) || (routelistContains(toroutes, "Hyannis") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg", 0, null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-sstat",0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, getCommonRoutesSS("place-sstat", toid)));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
//                 resolve(Strategies);                               
              }
              else report("case 2a fail toroutes = " + toroutes);

               resolve(Strategies);               
             }
            else if(!isRailStop(toid))
            {
                report("case 2e");
               // go to NS first then get connection  
               if(fromid != "North Station") addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-north", 0,                 
                 null, getCommonRoutesSS(fromid, "place-north")));
               let fromroutes = getRoutesS("place-north");
               let toroutes = getRoutesS(toid);
               let cr = getCommonRoutesS(fromroutes, toroutes);
               let kx = cr.length;
               /*
               let ix = 0;
               while(ix < kx)
               {
                 report("cr167 " + cr[ix]);
                 ix += 1;
               }
               */
               if(kx > 0) 
               {
                 addLegToStrategy( Strategy,  makeLeg("place-north", 0, toid, 0,                
                 null, getCommonRoutesSS("place-north", toid)));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
                 resolve(Strategies);               
               }
               else // ?? TODO
               {
                 report("case 2 error for toid = " + toid);
                 clearFcbut();
                 /*
               let p1 = getConnectionStrategies("North Station", toid);
               p1.then( function(a) {
                   Strategies = Strategies.concat(a);
                   resolve(Strategies);
               } );
               */
               }
             }
            else if(!isRailStopNS(toid))
             {
               report("case 2f " + fromid + " " + toroutes + " :" + toid);
               // go to NS first, go to SS, then get connection
//               if((fromid != "North Station") && (fromid != "place-north"))
               if(getParentIdFromId(fromid) != "place-north")
               {
                 addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-north", 0,                 
                 null, getCommonRoutesSS(fromid, "place-north")));
               }
               addLegToStrategy( Strategy,  makeLeg("place-north", 0, "place-dwnxg",0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-sstat", 0, null, "R0"));  
               let crx = getCommonRoutesS(getRoutesS("place-sstat"), toroutes);
               let kxx = crx.length;
               let md = 0;
               if(kxx == 0)
               {
                  crx = getCommonRoutesS(getRoutesS("Springfield"), toroutes);
                  kxx = crx.length;
                  if(kxx == 0)
                  {
                    crx = getCommonRoutesS(getRoutesS("Albany-Rensselaer-NY"), toroutes);
                    kxx = crx.length;
                    if(kxx == 0)
                    {
                     crx = getCommonRoutesS(getRoutesS("NewHaven-CT"), toroutes);
                     kxx = crx.length;
                     if(kxx == 0)
                     {
                      report("case 2f no hub, toroutes = " + toroutes);
                     }
                    }
                    else md = 2;
                  }
                  else md = 1;
               }
               let clist = makeStringFromRouteArray(crx);
               if(toid == "place-sstat") 
               {
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
                 resolve(Strategies);                                 
               }
               else if((stopsHaveSameParent(toid,"place-hyannis")) || (routelistContains(toroutes, "PB2") ) ||(routelistContains(toroutes, "PP14343") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, "PB2"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 else report("2419 Last:Lego is null");
                 Strategies[Strategies.length] = Strategy;
                 resolve(Strategies);               
               }
               /*
               else if(kxx > 0)
               {
                   let ix = 0;
                   while(ix < kxx)
                   {
                     let Strategy3 = cloneStrategy(Strategy);
                     Strategy3[Strategy3.length] = makeLeg("place-sstat", 0, "Springfield", 0, null, crx[ix]);
                     if(toid != "Springfield") Strategy3[Strategy3.length] = makeLeg("Springfield", 0, toid, 0, null, getCommonRoutesSS("Springfield", toid));
                     if(LastLego != null) Strategy3[Strategy3.length] = LastLego.clone();
                     Strategies[Strategies.length] = Strategy3;
                     ix += 1;
                   }
                 resolve(Strategies);               
               }
               */
               else if(isOtherRoute(clist) && (toid != "Springfield"))
               { 
                 report("case 2f2 " + toroutes);
                 if(routelistContains(toroutes, "AV0") )
                 {
                   let crx = getCommonRoutesSS("place-sstat", "Springfield");
                   let kxx = crx.length;
                   report("crx.length = " + kxx);
                   let ix = 0;
                   while(ix < kxx)
                   {
                     let Strategy3 = cloneStrategy(Strategy);
                     Strategy3[Strategy3.length] = makeLeg("place-sstat", 0, "Springfield", 0, null, crx[ix]);
                     if(toid != "Springfield") Strategy3[Strategy3.length] = makeLeg("Springfield", 0, toid, 0, null, getCommonRoutesSS("Springfield", toid));
                     if(LastLego != null) Strategy3[Strategy3.length] = LastLego.clone();
                     Strategies[Strategies.length] = Strategy3;
                     ix += 1;
                   }
                   resolve(Strategies);               
                 }
                 else if(routelistContains(toroutes, "AR1") )
                 {
                   report("case 2f3");
                   addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, "NewHaven-CT", 0, null, getCommonRoutesSS("NewHaven-CT", "place-sstat")));
                   addLegToStrategy( Strategy,  makeLeg("NewHaven-CT", 0, toid, 0, null, getCommonRoutesSS("NewHaven-CT", toid)));
                   if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                   Strategies[Strategies.length] = Strategy;
                   resolve(Strategies);               
                 }
               }
               /*
               else if(kxx > 0)
               {
                 if(md == 0)
                 {
                   let ix = 0;
                   while(ix < kxx)
                   {
                     let Strategy2 = cloneStrategy(Strategy);
                     Strategy2[Strategy2.length] = makeLeg("place-sstat", 0, toid, 0,                
                        null, cr[ix]);
                     if(LastLego != null) Strategy2[Strategy2.length] = LastLego;
                     Strategies[Strategies.length] = Strategy2;
                     ix += 1;
                   }
                 }
                 else if(md == 1)
                 {
                      
                 }
               }
               */
               else
                 {
                 report("case 2g toid = " + toid);
                 let fromroutes = getRoutesS("place-sstat");
                 let toroutes = getRoutesS(toid);
                 let cr = getCommonRoutesS(fromroutes, toroutes);
                 let kx = cr.length;
                 let bNYCG = false;
                 if((kx == 0) && (toid == "NewYork-Grand-Central-NY"))
                 {
                   cr = getCommonRoutesS(fromroutes, getRoutesS("AMSNYP"));
                   kx = cr.length;
                   toid = "AMSNYP";
 //                  bNYCG = true;
                 }
 //              report("kx = " + kx + " fromroutes = " + fromroutes + " toroutes = " + toroutes);
                 if(kx > 0)
                 {
                   let ix = 0;
                   while(ix < kx)
                   {
                     let Strategy2 = cloneStrategy(Strategy);
                     addLegToStrategy(Strategy2, makeLeg("place-sstat", 0, toid, 0, null, cr[ix]));
                     /*
                     if(bNYCG)
                     {
                       Strategy2[Strategy2.length] = makeLeg("NYT128", 0, "NYT127",0, null, "NY1");
                       Strategy2[Strategy2.length] = makeLeg("NYT902", 0, "NYT901",0, null, "NYGS");
                     }
                     */
                     if(LastLego != null) 
                     {
                         addLegToStrategy(Strategy2, LastLego);
                         report("  LastLego.children = " + LastLego.children.length);
                     }
                     Strategies[Strategies.length] = Strategy2;
                     ix += 1;
                   }
                 resolve(Strategies);               
                 }
                 /*
                 else if((cr = getCommonRoutesS(getRoutesS("Springfield"),toroutes)).length >     0)
                 {
                     
                 }
                 */
                 }
               
             }
            else
             {
               // go to NS first, transfer   
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "North Station", 0,                 
                 null, getCommonRoutesSS(fromid, "North Station")));
               addLegToStrategy( Strategy,  makeLeg("North Station", 0, toid,0,                
                 null, getCommonRoutesSS("North Station", toid)));
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);               
             }
         }
         else if(fromid == "South Station")
         {
           report("case 3 toid = " + toid + " " + toroutes);
           if(isRailStop(toid))
           {
             if(isRailStopNS(toid))
             {
               addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, "place-dwnxg", 0, null, "R0"));
               addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "North Station", 0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("place-north", 0, toid, 0, null, getCommonRoutesSS("place-north", toid)));
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);               
             }
             else if(isOtherRoute(toroutes) && (toid != "Springfield"))
             {
                if(routelistContains(toroutes, "AV0") )
                 {
                   let cr = getCommonRoutesSS("South Station", "Springfield");
                   let kx = cr.length;
                   let ix = 0;
                   while(ix < kx)
                   {
                     let Strategy3 = cloneStrategy(Strategy);
                     Strategy3[Strategy3.length] = makeLeg("South Station", 0, "Springfield", 0, null, cr[ix]);
                     Strategy3[Strategy3.length] = makeLeg("Springfield", 0, toid, 0, null, getCommonRoutesSS("Springfield", toid));
                     if(LastLego != null) Strategy3[Strategy3.length] = LastLego.clone();
                     Strategies[Strategies.length] = Strategy3;
                     ix += 1;
                   }
                    
                   /*  
                   addLegToStrategy( Strategy,  makeLeg("South Station", 0, "Springfield", 0, null, getCommonRoutesSS("place-sstat", "Springfield"));
                   addLegToStrategy( Strategy,  makeLeg("Springfield", 0, toid, 0, null, getCommonRoutesSS("Springfield", toid));
                   if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
                   Strategies[Strategies.length] = Strategy;
                   */
                   resolve(Strategies);               
                 }
                 else if(routelistContains(toroutes, "AR1") )
                 {
                   addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, "NewHaven-CT", 0, null, getCommonRoutesSS("place-sstat", "NewHaven-CT")));
                   addLegToStrategy( Strategy,  makeLeg("NewHaven-CT", 0, toid, 0, null, getCommonRoutesSS("NewHaven-CT", toid)));
                   Strategies[Strategies.length] = Strategy;
                   resolve(Strategies);               
                 }
              }
              
             else
             {
               report("case 3r");               
               addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, getCommonRoutesSS("place-sstat", toid)));
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);               
             }
           }
           else if(isAirportStop(toid))
           {
               addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, "17091", 0, null, "741"));
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);               
           }
           else if(isSubwayStop(toid))
           {
               report("case 3a toroutes = " + toroutes);
               let bUseO = false;
               let oid = fromid;
               if(routelistContains(toroutes, "B0") )
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, "place-dwnxg", 0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "State Street", 0,null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("State Street", 0, toid, 0,null, "B0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "O0") )
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, "place-dwnxg", 0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, toid, 0,null, "O0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "G0") ) || (routelistContains(toroutes, "G1") ) || (routelistContains(toroutes, "G2") ) || (routelistContains(toroutes, "G3") ) || (routelistContains(toroutes, "G4") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, "Park Street", 0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, toid, 0,null, toroutes));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "R0") ) || (routelistContains(toroutes, "R1") ) || (routelistContains(toroutes, "R2") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid,0, null, "R0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "R3") )
               {
                 addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, "place-asmnl",0, null, "R2"));
                 addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, toid,0, null, "R3"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "S1") ) || (routelistContains(toroutes, "741") ))
               {
                 if(fromid != "South Station") addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-sstat", 0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, "741"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
                // resolve(Strategies);                               
               }
               resolve(Strategies);               
            }
            else
            {
              report("case 3z");
              resolveEnd(LastLego, resolve, Strategies, Strategy);          
   
            }
         }
         else // fromid isRailStopSS
         {
             report("case 4 " + fromid + " " + toid);
             let cr = getCommonRoutesSS(getParentIdFromId(fromid), getParentIdFromId(toid));
             /*
             if(cr.length == 0)
             {
               report("case 4z not yet implemented"); 
                // find common hub
//               getStrategiesViaHubs(Strategies, Strategy,fromid, toid);
               resolve(Strategies);  
             }
             else */
             if((toid == "South Station") || (toid == "place-sstat"))
             {
               report("case 4a");
               fromid = getParentIdFromId(fromid);
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "South Station", 0, null, getCommonRoutesSS(fromid, "place-sstat")));
               if(LastLego != null) addLegToStrategy(Strategy, LastLego);
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);  
             }
             else if(isRailStop(toid))
             {
               if(isRailStopNS(toid))
               {
               report("case 4b1");
              // go to SS first, go to NS, then get connection
               let fid = getParentIdFromId(fromid);
               let ccr = getCommonRoutesSS(fid, "place-sstat");
               let kkk = ccr.length;
               let i = 0;
               while((i < 2) && (i < kkk))
               {
                  let Strategy2 = cloneStrategy(Strategy);
                  if(fid != "place-sstat") addLegToStrategy(Strategy2, makeLeg(fid, 0, "South Station", 0, null, ccr[i]));
                  addLegToStrategy(Strategy2, makeLeg("South Station", 0, "place-dwnxg", 0, null, "R0"));
                  addLegToStrategy(Strategy2, makeLeg("place-dwnxg", 0, "North Station", 0, null, "O0"));
                  if((toid != "North Station") && (toid != "place-north")) addLegToStrategy(Strategy2, makeLeg("North Station", 0, toid, 0, null, getCommonRoutesSS("North Station", toid)));
                  if(LastLego != null) addLegToStrategy(Strategy2, LastLego);
                  Strategies[Strategies.length] = Strategy2;
                  i += 1;
               }
               resolve(Strategies);               
               }
               
               else if(isOtherRoute(getCommonRoutesSS("place-sstat", toid)) && (toid != "Springfield")) // was toroutes
               {
                 report("case 4b");
                 addLegToStrategy(Strategy,makeLeg(fromid, 0, "South Station", 0, null, getCommonRoutesSS(fromid, "place-sstat")));
                 if(routelistContains(toroutes, "AV0") )
                 {
                   addLegToStrategy(Strategy, makeLeg("place-sstat", 0, "Springfield", 0, null, getCommonRoutesSS("place-sstat", "Springfield")));
                   addLegToStrategy(Strategy, makeLeg("Springfield", 0, toid, 0, null, getCommonRoutesSS("Springfield", toid)));
                   if(LastLego != null) addLegToStrategy(Strategy, LastLego);
                   Strategies[Strategies.length] = Strategy;
                   resolve(Strategies);               
                 }
                 else if(routelistContains(toroutes, "AR1") )
                 {
                   addLegToStrategy(Strategy, makeLeg("South Station", 0, "NewHaven-CT", 0, null, getCommonRoutesSS("place-sstat", "NewHaven-CT")));
                   addLegToStrategy(Strategy, makeLeg("NewHaven-CT", 0, toid, 0, null, getCommonRoutesSS("NewHaven-CT", toid)));
                   if(LastLego != null) addLegToStrategy(Strategy, LastLego);
                   Strategies[Strategies.length] = Strategy;
                   resolve(Strategies);               
                 }
                 else
                 {
                   addLegToStrategy(Strategy, makeLeg("South Station", 0, toid, 0, null, getCommonRoutesSS("South Station", toid)));
                   resolveEnd(LastLego, resolve, Strategies, Strategy);
                   /*
                   if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
                   Strategies[Strategies.length] = Strategy;
                   resolve(Strategies);    
  */
                    
                 }
               }
   /*            else if(toid == "NewYork-Grand-Central-NY")
               {
                 let bNYCG = false;
                 cr = getCommonRoutesS(fromroutes, getRoutesS("AMSNYP"));
                 kx = cr.length;
                 toid = "AMSNYP";
                 bNYCG = true;
               report("kx = " + kx + " fromroutes = " + fromroutes + " toroutes = " + toroutes);
                 if(kx > 0)
                 {
                   let ix = 0;
                   while(ix < kx)
                   {
                     let Strategy2 = cloneStrategy(Strategy);
                     Strategy2[Strategy2.length] = makeLeg("place-sstat", 0, toid, 0, null, cr[ix]);
                     if(bNYCG)
                     {
                       Strategy2[Strategy2.length] = makeLeg("NYT128", 0, "NYT127",0, null, "NY1");
                       Strategy2[Strategy2.length] = makeLeg("NYT902", 0, "NYT901",0, null, "NYGS");
                     }
                     if(LastLego != null) Strategy2[Strategy2.length] = LastLego;
                     Strategies[Strategies.length] = Strategy2;
                     ix += 1;
                   }
                 resolve(Strategies);               
                 }
               }
               */
               else // isRailStopSS
               {
               report("case 4c " + fromid + " " + toid);
               // go to SS 
               if(getParentIdFromId(fromid) != "place-sstat") addLegToStrategy(Strategy, makeLeg(fromid, 0, "place-sstat", 0, null, getCommonRoutesSS(fromid, "place-sstat")));
               {
                 let fromroutes = getRoutesS("place-sstat");
                 let toi = getParentIdFromId(toid);
                 let toroutes = getRoutesS(toi);
                 let cr = getCommonRoutesS(fromroutes, toroutes);
                 let kx = cr.length;
                 let ix = 0;
                 if(toi != "place-sstat")
                 {
                 while(ix < kx)
                 {
                   let Strategy3 = cloneStrategy(Strategy);
                   addLegToStrategy(Strategy3, makeLeg("place-sstat", 0, toi, 0,                
                        null, cr[ix]));
                   if(LastLego != null) addLegToStrategy(Strategy3, LastLego);
//                   report("LastLego was:\n" + JSON.stringify(LastLego));
                   Strategies[Strategies.length] = Strategy3;
                   ix += 1;
                 }
                 }
                 else Strategies[Strategies.length] = Strategy;
                 resolve(Strategies);               

               }

               }
             }
             else if(isAirportStop(toid))
             {
               report("case 4h " + toid);
               if(getParentIdFromId(fromid) != "place-sstat") 
               {
                   addLegToStrategy( Strategy,  makeLeg(fromid, 0, "South Station", 0, null, getCommonRoutesSS(fromid, "South Station")));
               }
               let ptoid = getParentIdFromId(toid);
               if(ptoid == "place-aport")
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, "place-aport", 0, null, "743"));
               }
               else 
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, "place-LoganA", 0, null, "741"));
                 if(ptoid != "place-LoganA")
                 {
                    addLegToStrategy( Strategy,  makeLeg("place-LoganA", 0, toid, 0, null, "L66"));  
                 }
               }
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);               
             }
             else if((toid.indexOf("NYT") == -1) && isSubwayStop(toid))
             {
               report("case 4d toroutes = " + toid + " " + toroutes);
               if(fromid != "place-sstat") addLegToStrategy( Strategy,  makeLeg(fromid, 0, "South Station", 0, null, getCommonRoutesSS(fromid, "South Station")));
               let bUseO = false;
               let oid = fromid;
               if(routelistContains(toroutes, "B0") )
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, "place-dwnxg", 0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "State Street", 0,null, "O0"));
                 addLegToStrategy( Strategy,  makeLeg("State Street", 0, toid, 0,null, "B0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if(routelistContains(toroutes, "O0") )
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, "place-dwnxg", 0, null, "R0"));
                 addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, toid, 0,null, "O0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "G0") ) || (routelistContains(toroutes, "G1") ) || (routelistContains(toroutes, "G2") ) || (routelistContains(toroutes, "G3") ) || (routelistContains(toroutes, "G4") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, "place-pktrm", 0, null, "R0"));
                 if(toid != "place-pktrm") addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, toid, 0,null, toroutes));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "R0") ) || (routelistContains(toroutes, "R1") ) || (routelistContains(toroutes, "R2") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, toid,0, null, "R0"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               else if((routelistContains(toroutes, "S1") ) || (routelistContains(toroutes, "741") ))
               {
                 addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, "741"));
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego);
                 Strategies[Strategies.length] = Strategy;
               }
               resolve(Strategies);               
             }
             else
             {
               report("Sorry, not yet implemented case 4 " + fromid + " " + toid); 
               resolve(Strategies);
             }
         }
      }
      else if(isSubwayStop(fromid))
      {
//        report("case 6: " + fromid + " " + fromroutes);
        let fromroutes = getRoutesS(fromid);
        if(fromroutes == "") 
        {
          let rt = getConnectingStation(fromid);
          if(rt != null) fromroutes = getRoutesS(getConnectingStation(fromid));
        }
        report("case 6: " + fromid + " " + fromroutes);
        let toroutes = getCommonRoutesSS(toid, "South Station");
        if(toroutes == "") toroutes = getRoutesS(toid);
        let state = 0;
        let state2 = 0;
        let bDoThis = true;
        if((isRailStop(toid)) && !isSubwayStop(toid))
        {
           toroutes = getCommonRoutesSS(toid, "South Station");
           if(toroutes == "") toroutes = getRoutesS(toid);
           report("case 6a " + toid + " " + toroutes);
           if((routelistContains(toroutes, "CN1") || routelistContains(toroutes, "CN0")) && (routelistContains(fromroutes, "B0") || routelistContains(fromroutes, "R0")) && (toid != "place-north") && (toid != "North Station"))
           {
             if((routelistContains(fromroutes, "B0") ) && (fromid != "Airport"))
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-belsq", 0, null, "743"));
               addLegToStrategy( Strategy,  makeLeg("place-belsq", 0, toid, 0, null, getCommonRoutesSS("place-belsq", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
             }
             else
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-sstat", 0, null, "R0"));
               addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, "place-belsq", 0, null, "743"));
               addLegToStrategy( Strategy,  makeLeg("place-belsq", 0, toid, 0, null, getCommonRoutesSS("place-belsq", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
             }
           }
           else if(isRailStopNS(toid))
           {
             let bUseO = false;
             let oid = fromid;
             if((routelistContains(fromroutes, "B0") ) && (fromid != "State Street"))
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-state", 0, null, "B0"));
               oid = "place-state";
               bUseO = true;
             }
             else if((routelistContains(fromroutes, "R0") ) && (fromid != "place-dwnxg") && (fromid != "place-pktrm"))
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-dwnxg", 0, null, "R0"));
               oid = "place-dwnxg";
               bUseO = true;
             }
             else if(routelistContains(fromroutes, "R3") )
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-asmnl", 0, null, "R3"));
               addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, "place-dwnxg", 0, null, "R2"));
               oid = "place-dwnxg";
               bUseO = true;
             }
             if((routelistContains(fromroutes, "O0") ) || bUseO)
             {
               addLegToStrategy( Strategy,  makeLeg(oid, 0, "North Station", 0, null, "O0"));
               if((toid != "North Station") && (toid != "place-north"))
               {
                 addLegToStrategy( Strategy,  makeLeg("North Station", 0, toid, 0, null, getCommonRoutesSS("North Station", toid)));
               }
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies); 
  */
             }
             else if((routelistContains(fromroutes, "G0") ) || (routelistContains(fromroutes, "G4") ))
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "North Station", 0, null, "G0"));
               if((toid != "North Station") || (toid != "place-north"))
               {
                 addLegToStrategy( Strategy,  makeLeg("North Station", 0, toid, 0, null, getCommonRoutesSS("North Station", toid)));
               }
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);   
  */
             }
             else if((routelistContains(fromroutes, "G1") ) || (routelistContains(fromroutes, "G2") ) || (routelistContains(fromroutes, "G3") ))
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-pktrm", 0, null, fromroutes));
               addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, "North Station", 0, null, "G0"));
               if((toid != "North Station") || (toid != "place-north"))
               {
                 addLegToStrategy( Strategy,  makeLeg("North Station", 0, toid, 0, null, toroutes));
               }
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);         
*/  
            }
           }
           else // SS
           {
             report("case 6e");
             let bUseO = false;
             let oid = fromid;
             if((routelistContains(fromroutes, "B0") ) && (fromid != "State Street"))
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-state", 0, null, "B0"));
               oid = "place-state";
               bUseO = true;
             }
             if((routelistContains(fromroutes, "O0") ) || bUseO)
             {
               report("see O0");
               addLegToStrategy( Strategy,  makeLeg(oid, 0, "place-dwnxg", 0, null, "O0"));
               oid = "place-dwnxg";
               bUseO = true;
             }
             let bCont = true;
             if((routelistContains(fromroutes, "R0") ) || bUseO)
             {
               addLegToStrategy( Strategy,  makeLeg(oid, 0, "South Station", 0, null, "R0"));
               if((toid == "South Station") || (toid == "place-sstat"))
               {
                   bCont = false;
//                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, toid, 0, null, getCommonRoutesSS("place-sstat", toid));
               }
             }
             else if((routelistContains(fromroutes, "G0") ) || (routelistContains(fromroutes, "G1") ) || (routelistContains(fromroutes, "G2") ) || (routelistContains(fromroutes, "G3") ) || (routelistContains(fromroutes, "G4") ))
             {
                 addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-pktrm", 0, null, fromroutes));
                 addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, "South Station", 0, null, "R0"));
//                 addLegToStrategy( Strategy,  makeLeg("South Station", 0, toid, 0, null, getCommonRoutesSS("place-sstat", toid));
             }
             else if((routelistContains(fromroutes, "S1") ) ||(routelistContains(fromroutes, "741") )) 
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-sstat", 0, null, "741"));
             }
             else if(routelistContains(fromroutes, "R3") )
             {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-asmnl", 0, null, "R3"));
               addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, "place-sstat", 0, null, "R2"));
                  
             }
             if(isOtherRoute(toroutes) && (toid != "Springfield"))
             {
                 report("case 6c");
                 bCont = false;
       //          addLegToStrategy( Strategy,  makeLeg(fromid, 0, "South Station", 0, null, getCommonRoutesSS(fromid, "South Station"));
                 if(routelistContains(toroutes, "AMR90") )
                 {
                   addLegToStrategy( Strategy,  makeLeg("South Station", 0, "Springfield", 0, null, getCommonRoutesSS("Springfield", "South Station")));
                   addLegToStrategy( Strategy,  makeLeg("Springfield", 0, toid, 0, null, getCommonRoutesSS("Springfield", toid)));
                   resolveEnd(LastLego, resolve, Strategies, Strategy);
                   /*
                  Strategies[Strategies.length] = Strategy;
                   resolve(Strategies);
  */
                   bDoThis = false;
                 }
                 else if(routelistContains(toroutes, "AR1") )
                 {
                   addLegToStrategy( Strategy,  makeLeg("South Station", 0, "NewHaven-CT", 0, null, getCommonRoutesSS("NewHaven-CT", "South Station")));
                   addLegToStrategy( Strategy,  makeLeg("NewHaven-CT", 0, toid, 0, null, getCommonRoutesSS("NewHaven-CT", toid)));
                   resolveEnd(LastLego, resolve, Strategies, Strategy);
                   /*
                   Strategies[Strategies.length] = Strategy;
                   resolve(Strategies);  
  */
                   bDoThis = false;
                 }
             }
             else if(bCont)
             {
               report("case 6d toid = " + toid);
//                  addLegToStrategy( Strategy,  makeLeg("South Station", 0, toid, 0, null, getCommonRoutesSS("place-sstat", toid));
               if((toid != "South Station") && (toid != "place-sstat"))
               {
                 fromroutes = getRoutesS("place-sstat");
                 let s = toroutes.toString();
                 report("toroutes = " + toroutes + " " + s);
                 let cr = getCommonRoutesS(fromroutes, s);
                 let kx = cr.length;
                 let ix = 0;
                 while(ix < kx)
                 {
                   let Strategy3 = cloneStrategy(Strategy);
                   if((toid != "South Station") && (toid != "place-sstat")) 
                   {
                       addLegToStrategy(Strategy3, makeLeg("South Station", 0, toid, 0,                
                        null, cr[ix]));
                       if(LastLego != null) addLegToStrategy(Strategy3, LastLego.clone());
                       Strategies[Strategies.length] = Strategy3;
                   }
                   ix += 1;
                 }
               }
               else
               {
                 if(LastLego != null) addLegToStrategy( Strategy,  LastLego.clone());
                 Strategies[Strategies.length] = Strategy;
               }
               resolve(Strategies);               
               bDoThis = false;
            }
             report("got here 976 " + bDoThis);
             if(bDoThis)
             {
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
               Strategies[Strategies.length] = Strategy;                 
               resolve(Strategies); 
  */
             }
           }
        }
        else if((isSubwayStop(toid)))// || (isAirportStop(toid)))
        { 
          toroutes = getRoutesS(toid);
          report("case 6b " + toid + " " + toroutes);
          if(routelistContains(fromroutes, "B0") )
          {
            if(routelistContains(toroutes, "O0") )
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "State Street", 0, null, "B0"));
               addLegToStrategy( Strategy,  makeLeg("place-state", 0, toid, 0, null, getCommonRoutesSS("place-state", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);         
  */
            }
            else if((routelistContains(toroutes, "G0") ) || (routelistContains(toroutes, "G1") ) || (routelistContains(toroutes, "G2") ) || (routelistContains(toroutes, "G3") ) || (routelistContains(toroutes, "G4") ))
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Government Center", 0, null, "B0"));
               let x = getCommonRoutesSS("place-gover", toid);
               if((x.length == 0) && (routelistContains(toroutes, "G4") == -1))
               {
                 addLegToStrategy( Strategy,  makeLeg("place-gover", 0, "place-pktrm", 0, null, getCommonRoutesSS("place-gover", "place-pktrm")));
                 addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, toid, 0, null, getCommonRoutesSS("place-pktrm", toid)));
               }
               else addLegToStrategy( Strategy,  makeLeg("place-gover", 0, toid, 0, null, x));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies); 
  */
            }
            else if((routelistContains(toroutes, "R0") ) || (routelistContains(toroutes, "R1") ) || (routelistContains(toroutes, "R2") ) || (routelistContains(toroutes, "R3") ))
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-state", 0, null, "B0"));
               addLegToStrategy( Strategy,  makeLeg("place-state", 0, "place-dwnxg", 0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, toid, 0, null, getCommonRoutesSS("place-dwnxg", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
            }
            else if(routelistContains(toroutes, "R3") )
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-state", 0, null, "B0"));
               addLegToStrategy( Strategy,  makeLeg("place-state", 0, "place-dwnxg", 0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-asmnl", 0, null, "R2"));
               addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, toid, 0, null, "R3"));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
                
            }
            else if((routelistContains(toroutes, "S1") )|| (routelistContains(toroutes, "741") ))
            {
               if((fromid != "Airport") && (fromid != "place-aport")) addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-aport", 0, null, "B0"));
               addLegToStrategy( Strategy,  makeLeg("place-aport", 0, "17091", 0, null, "L66"));
               addLegToStrategy( Strategy,  makeLeg("17091", 0, toid, 0, null, "741"));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);
  */
            }
             
          }
          else if((routelistContains(fromroutes, "R0") ) || (routelistContains(fromroutes, "R1") ) || (routelistContains(fromroutes, "R2") ) || (routelistContains(fromroutes, "R3") ))
          {
            let xroute = "R0";
            if(routelistContains(fromroutes, "R3") )
            {
              addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-asmnl", 0, null, "R3"));
              fromid = "place-asmnl";
              xroute = "R2";
            }
            if(routelistContains(toroutes, "O0") )
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-dwnxg", 0, null, xroute));
               addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, toid, 0, null, getCommonRoutesSS("place-dwnxg", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
            }
            else if(routelistContains(toroutes, "R3") )
            {
               if((routelistContains(fromroutes, "R2") == -1) && (routelistContains(fromroutes, "R0") ))
               {
                addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-jfk", 0, null, "R0"));
                addLegToStrategy( Strategy,  makeLeg("place-jfk", 0, "place-asmnl", 0, null, "R2"));
               }
               else addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-asmnl", 0, null, "R2"));
               addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, toid, 0, null, "R3"));
               resolveEnd(LastLego, resolve, Strategies, Strategy);               
            }
            else if((routelistContains(toroutes, "G0") ) || (routelistContains(toroutes, "G1") ) || (routelistContains(toroutes, "G2") ) || (routelistContains(toroutes, "G3") ) || (routelistContains(toroutes, "G4") ))
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-pktrm", 0, null, xroute));
               addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, toid, 0, null, getCommonRoutesSS("place-pktrm", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
              Strategies[Strategies.length] = Strategy;
               resolve(Strategies);      
  */
            }
            else if(routelistContains(toroutes, "B0") ) 
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-dwnxg", 0, null, xroute));
               addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, "place-state", 0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("place-state", 0, toid, 0, null, getCommonRoutesSS("place-state", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
            }
            else if(routelistContains(toroutes, "S1") )
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-sstat", 0, null, xroute));
               addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, "741"));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
            }
            else if(routelistContains(toroutes, "S3") || routelistContains(toroutes, "743") )
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-sstat", 0, null, xroute));
               addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, "743"));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
            }
         }
          else if(routelistContains(fromroutes, "O0") )
          {
            if(routelistContains(toroutes, "B0") )
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-state", 0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("place-state", 0, toid, 0, null, getCommonRoutesSS("place-state", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies); 
  */
            }
            else if((routelistContains(toroutes, "G0") ) || (routelistContains(toroutes, "G1") ) || (routelistContains(toroutes, "G2") ) || (routelistContains(toroutes, "G3") ) || (routelistContains(toroutes, "G4") ))
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "North Station", 0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("North Station", 0, toid, 0, null, getCommonRoutesSS("place-north", toid)));
               resolveEnd(LastLego, resolve, Strategies, Strategy);
               /*
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);  
  */
            }
            else if((routelistContains(toroutes, "R0") ) || (routelistContains(toroutes, "R1") ) || (routelistContains(toroutes, "R2") ) || (routelistContains(toroutes, "R3") ))
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-dwnxg", 0, null, "O0"));
               addLegToStrategy( Strategy,  makeLeg("place-dwnxg", 0, toid, 0, null, getCommonRoutesSS("place-dwnxg", toid)));
               resolveEnd(LastLego, resolve, Strategies,Strategy);
               /*
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);  
  */
            }

          }
          else if((routelistContains(fromroutes, "G0") ) || (routelistContains(fromroutes, "G1") ) || (routelistContains(fromroutes, "G2") ) || (routelistContains(fromroutes, "G3") ) || (routelistContains(fromroutes, "G4") ))
          {
            if(routelistContains(toroutes, "B0") )
            {
               let x = getCommonRoutesSS("place-gover", fromid);
               if(x.length == 0)
               {
                 addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-pktrm", 0, null, fromroutes));
                 addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, "place-gover", 0, null, "G0"));
               }
               else addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Government Center", 0, null, x));
               addLegToStrategy( Strategy,  makeLeg("Government Center", 0, toid, 0, null, "B0"));
               resolveEnd(LastLego, resolve, Strategies,Strategy);
               /*
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies); 
  */
            }
            else if((routelistContains(toroutes, "R0") ) || (routelistContains(toroutes, "R1") ) || (routelistContains(toroutes, "R2") ) || (routelistContains(toroutes, "R3") ))
            {
               if(fromid != "place-pktrm") addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-pktrm", 0, null, getCommonRoutesSS("place-pktrm", fromid)));
               if(routelistContains(toroutes, "R3") )
               {
               addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, "place-asmnl", 0, null, "R2"));
               addLegToStrategy( Strategy,  makeLeg("place-asmnl", 0, toid, 0, null, "R3"));
               }
               else addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, toid, 0, null, getCommonRoutesSS("place-pktrm", toid)));
              resolveEnd(LastLego, resolve, Strategies,Strategy);
              /*
              Strategies[Strategies.length] = Strategy;
               resolve(Strategies);  
  */
            }
            else if(routelistContains(toroutes, "O0") )
            {
              let x = getCommonRoutesSS("place-haecl", fromid);
              if(x.length == 0)
              {
                addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-pktrm", 0, null, getCommonRoutesSS("place-pktrm", fromid)));
                addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, "Haymarket", 0, null, "G0"));
              }
              else addLegToStrategy( Strategy,  makeLeg(fromid, 0, "Haymarket", 0, null,         
                  getCommonRoutesSS("place-haecl", fromid)));
              addLegToStrategy( Strategy,  makeLeg("place-haecl", 0, toid, 0, null, "O0"));
              resolveEnd(LastLego, resolve, Strategies,Strategy);
              /*
              Strategies[Strategies.length] = Strategy;
              resolve(Strategies);     
  */
            }
            else if(routelistContains(toroutes, "S1") )
            {
               addLegToStrategy( Strategy,  makeLeg(fromid, 0, "place-pktrm", 0, null, getCommonRoutesSS("place-pktrm", fromid)));
               addLegToStrategy( Strategy,  makeLeg("place-pktrm", 0, "place-sstat", 0, null, "R0"));
               addLegToStrategy( Strategy,  makeLeg("place-sstat", 0, toid, 0, null, "741"));
               resolveEnd(LastLego, resolve, Strategies,Strategy);
               /*
               if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
               Strategies[Strategies.length] = Strategy;
               resolve(Strategies);   
  */
            }
          }
        }
        else
        {
          report("case 6z");
          resolveEnd(LastLego, resolve, Strategies, Strategy);
          /*
          if(LastLego != null) addLegToStrategy( Strategy,  LastLego;
          Strategies[Strategies.length] = Strategy;
          resolve(Strategies);  
  */
        }
      }
      else
      {
        let bxp = true;
        let PreLeg = null;
        let PostLeg = null;
        report("\ncase 200 " + fromid + " " + fromroutes + " " + toid + " " + toroutes);
        if(StrategyLevel == 0)
        {
        if(fromroutes.indexOf(",") == -1) // only one route
        {
          let tsa = getTransferStops(fromroutes);
          if(tsa.length > 0)
          {
            PreLeg = makeLeg(fromid, 0, tsa[0], 0, null, fromroutes);
            PreLeg.routeid = fromroutes;
            addLegToStrategy( Strategy,  PreLeg);
            fromid = tsa[0];
            fromroutes = getRoutesS(fromid);
            bxp = false;  
          }
        }
        if(toroutes.indexOf(",") == -1) // only one route
        {
          let tsa = getTransferStops(toroutes);
          if(tsa.length > 0)
          {
            PostLeg = makeLeg(tsa[0], 0, toid, 0, null, toroutes);
            PostLeg.routeid = toroutes;
            toid = tsa[0];
            toroutes = getRoutesS(toid);
            bxp = false;  
          }
        }

        }
        if(!bxp && (StrategyLevel == 0))
        {
          report("case 201 " + fromid + " " + toid);
          StrategyLevel += 1;
          let p6 = ctnx.getStrategiesFromTo(fromid, toid);
          p6.then(function(t) {
              let k = t.length;
              let i = 0;
              report("Strategy.length = " + Strategy.length + ", t.length = " + t.length);
              if(Strategy.length > 0)
              {
                for(i=0; i<k; i++)
                {
                  let ii = Strategy.length -1;
                  while(ii >= 0)
                  {
                    t[i].unshift(Strategy[ii])
                    ii -= 1;
                  }
                }
              }
              if(PostLeg != null)
              {
                for(i=0; i<k; i++)
                {
                  t[i].push(PostLeg);   
                }
              }
              if(LastLego != null)
              {
                for(i=0; i<k; i++)
                {
                  t[i].push(LastLego);   
                }
              }
              resolve(t);   
          }).catch(function(e) {
              reject("case 200 fail " + e);
          } );
        }
        else
        {
          clearFcbut();
          reject("No support yet for " + fromid + " to " + toid);
        }

      }
      report(" ");
   } 
  } );
  return(p);
}

function resolveEnd(LastLego, resolve, Strategies,str)
{
          if((LastLego != null) && LastLego.hasChildren()) 
          {
             str = addLegToStrategy(str, LastLego);
          }
          if(str.length > 0) Strategies[Strategies.length] = str;
          
          resolve(Strategies);                                   
}

function getCommonRoutesSS(fromid, toid)
{
//    report("getCommonRoutesSS " + fromid + " " + toid);
    let fromroutes = getRoutesS(fromid);
    let toroutes = getRoutesS(toid);
    return(getCommonRoutesS(fromroutes, toroutes));
}

//TODO
function getStrategiesViaHubs(Strategies, Strategy,fromid, toid)
{
  let fromroutes = getRoutesS(fromid);
  let toroutes = getRoutesS(toid);
  
}

let bBranch = false;
let branches = [];

function getCommonRoutesS(fromroutes, toroutes)
{
//    report("4438 getCommonRoutesS " =);
    bBranch = false;
    clearArray(branches);
    let f = fromroutes.split(",");
    let t = toroutes.split(",");
    if(t.length < f.length)  // added 6/2026
    {
      let x = f;
      f = t;
      t = x;
    }
    let k = f.length;
    let kk = t.length;
    let cr = [];
    clearArray(cr);
    let i = 0;
    while(i < k)
    {
      let a = f[i];
//      report("  f[" + i + "] = :" + a + ":");
      let b = a.substring(0, a.length-1);
      let ii = 0;
      while(ii < kk)
      {
//        report("    t[" + ii + "] = :" + t[ii] + ":");
        if((a == t[ii]) && (a != "") && (a != " ")) 
        {
//            report("i = " + i + " ii = " + ii + " a = " + a);
            cr.push(a);
        }
        else if((b == t[ii].substring(0, t[ii].length-1)) && (b != "") && (b != " ")) // branch situation
        { 
            bBranch = true;
//            report("    bBranch got here 541 t[ii] = " + t[ii]);
            branches[branches.length]= a + "," + t[ii];
        }
        ii += 1;
      }
      i += 1;
    }
//    if(cr.length != 0) 
//report("4473 getCommonRoutesS k = " + cr.length + " branches = " + branches.length);
//    i = 0;
//    while(i < cr.length)
//    {
//      report("  " + i + " " + cr[i]);
//      i += 1;
//    }
    return(cr);
}

function tripSortCompare(a, b)
{
if(typeof a.stop[0] === 'undefined') return(0);
if(typeof b.stop[0] === 'undefined') return(0);
let x = a.stop[0].sch_dep_dt;
if(x === undefined) x = a.stop[0].sch_arr_dt;
if(x === undefined) x = a.stop[0].pre_dt;
let y = b.stop[0].sch_dep_dt;
if(y === undefined) y = b.stop[0].sch_arr_dt;
if(y === undefined) y = b.stop[0].pre_dt;
if(x < y) return(-1);
if(x > y) return(1);
return(0);
}

function getDateTimeString(et)
{
  let d = new Date(et);
  return(d.toDateString() + " " +  d.toTimeString());
}
    
function getLegsFrom(startid, destid, routeid, starttime, bUsePre)
{
    let dty = new Date(1000 * starttime);
    report("\n5067 getLegsFrom " + startid + " (" + getStopNameFromID(startid) + ") to " + destid + " (" + getStopNameFromID(destid) + ") " + routeid + " " + starttime + " " + dty.toLocaleDateString() + " " + dty.toLocaleTimeString());
    let px = new Promise(function(resolve, reject) {
    let Legs = [];
    let startids = getStopIdsFromId(startid);
    let destids = getStopIdsFromId(destid);
    
    if(isBusRoute(routeid))
    {
      let startpt = getPositionForId(startid);
      let stpobjs = getNearbyStops1(startpt.x, startpt.y, true, 0.05);
      let k = stpobjs.length;
      if(k == 0) stpobjs = getNearbyStops1(startpt.x, startpt.y, true, 0.15);
      k = stpobjs.length;
      let i = 0;
      while(i < k)
      {
        let stopid = stpobjs[i].stop_id;
 //         report("  " + stopid + " " + stpobjs[i].distance);
        addUniqueElement(startids, stopid);
        i += 1;
      }
      
      let destpt = getPositionForId(destid);
      stpobjs = getNearbyStops1(destpt.x, destpt.y, true, 0.05);
      if(stpobjs.length == 0) stpobjs = getNearbyStops1(destpt.x, destpt.y, true, 0.15);
      k = stpobjs.length;
      i = 0;
      while(i < k)
      {
        let stopid = stpobjs[i].stop_id;
 //          report("  " + stopid + " " + stpobjs[i].distance);
        addUniqueElement(destids, stopid);
        i += 1;
      }
      
    }
//    report("  startids = " + startids);
//    report("  destids = " + destids);
    let startidsa = startids.splice(",");
    let destidsa = destids.splice(",");
    let i = 0;
/*
    while(i < startids.length)
    {
       report("  startids = " + startids[i]);
       i += 1;
    }
    i = 0;
    
    while(i < destids.length)
    {
       report("  destids = " + destids[i]);
       i += 1;
    }
 */   
    let gt = 35;
    if(isRailStop(startid) && isRailStop(destid)) gt = 15;
  let p31 = null;
  let svc = null;
  let bTroute = false;
//  report("isMBTARoute " + isMBTARoute(routeid) + " " + routeid);
  if(isAmRoute(routeid) || (!isMBTARoute(routeid)))
  {
    report("  using AssociateService " + routeid);
    svc = serviceE;
    bTroute = true;
  }
  else
  {
    report("  using MBTA service");
    svc = service;   
  }
  if(svc != null)
  {
   let p31 = null;
   let dtx = new Date(starttime * 1000);
   report("  5154 starttime " + dtx.toLocaleDateString() + " " + dtx.toLocaleTimeString() + " " + routeid + " " + starttime);
   p31 = svc.getScheduleByRoutesStop(routeid, 240, gt, starttime, startid);
   p31.then( function(t) {
      let t1 = t.mode;
      let k1 = t1.length;
      let i1 = 0;
//      if(svc == service)
      {
//     report("4770:");
      report("5154 " + JSON.stringify(t, null, 4));
//      report(":");
      }
      while(i1 < k1)
      {
        let t2 = t1[i1].route;
        let k2 = t2.length;
        let i2 = 0;
        while(i2 < k2)
        {
          let rid = t2[i2].route_id;
          let bAMR = (rid.indexOf("AMR") == 0);
          let t3 = t2[i2].direction;
          let k3 = t3.length;
          let i3 = 0;
          while(i3 < k3)
          {
            let t4 = t3[i3].trip;
            let k4 = t4.length;
 //           report("t4.length = " + k4);
 //           if(k4 > 40) k4 = 40;
            if(k4 > 1) t4.sort(tripSortCompare);
//            report("4798 got k4 = " + k4 + " trips dir " + t3[i3].direction_id + " " + rid );
            let i4 = 0;
            while(i4 < k4)
            {
              let t5 = t4[i4].stop;
//              report("5179 t5.length = " + t5.length);
              if(t5.length > 0)
              {
              if(t5.length > 1) t5.sort(tripCompareold);
              let k5 = t5.length;
 //             report("got k5 = " + k5 + " stops " + t5[0].sch_dep_dt);
              let starti = 0;
              let i5 = 0;
              let bdest = false;
              let bstart = false;
              let leg = null;
              let zstarttime = 0;
              let zdesttime = 0;
              let zstartid = "";
              let zstopid = "";
              let bNew = true;
              let bendd = false;
//              while(!bdest && (i5 < k5))
              while(!bendd && (i5 < k5))
              {
                let bFreq = (typeof t2[i2].frequency != 'undefined');
                bNew = !bFreq;
//                report("bbby = " + bbby + " " + bstart + " " + t5[i5].sch_dep_dt + " >= " + starttime);
//                if(bstart) report(t5[sidindex].stop_id + " " + destidsa + " " + checkIdP(t5[sidindex].stop_id, destidsa)); 
                let sidindex = i5;
//                    report("4827 " + bNew + " " + t5[i5].sch_dep_dt + " " + starttime);
//                report("5205 bfreq = " + bFreq + " bstart = " + bstart + " bendd = " + bendd);
                if(bFreq)
                {
                if(!bstart && (checkId(t5[sidindex].stop_id, startids)) && ((t5[i5].sch_dep_dt >= starttime) || bbby))
                {
//                    report(t5[i5].sch_dep_dt + " " + starttime);
                  if((t5[i5].sch_dep_dt > starttime))
                  {
                   bstart = true;
                   report("  5216 set bstart a true " + i5 + " " + !bdest + " " + !bbby + " start = " + t5[i5].sch_dep_dt + " starttime = " + starttime);
                   if(!bdest && !bbby) 
                   {
 //                      report("x  " + t5[sidindex].stop_id + " " + t5[i5].sch_dep_dt);
                       leg = makeLeg(t5[sidindex].stop_id, t5[i5].sch_dep_dt, destid, 0, t4[i4]);
                       leg.direction_name = t3[i3].direction_name;
                       leg.routeS = getRouteSForId(rid);
                       leg.routeid = rid;
                   }
                  }
                    
                  if(!bdest && bbby)
                  {
                    bstart = true;
                    starti = t5[i5].sch_dep_dt;
                    t5[i5].sch_dep_dt = starttime + 60 * t2[i2].frequency ;
//                   report("set bstart b true " + t5[i5].sch_dep_dt + " freq = " + t2[i2].frequency + " " + starti);
//                    t5[i5].sch_dep_dt = starttime + 60 * t2[i2].frequency ;
//                    report("y " + t5[i5].sch_dep_dt + " " +t2[i2].frequency );
                    leg =  makeLeg(t5[sidindex].stop_id, t5[i5].sch_dep_dt, destid, 0, t4[i4]);
                    leg.direction_name = t3[i3].direction_name;
                    leg.routeS = getRouteSForId(rid);
                    leg.routeid = rid;
                  }
                  
                }
 //               else if(checkId(t5[sidindex].stop_id, destids))
                else if(bstart && (checkIdP(t5[sidindex].stop_id, destidsa)))
                {
                    bdest = true;
                    bendd = true;
                    if(leg != null) 
                    {
                        leg.desttime = t5[i5].sch_arr_dt;
 //                       report(leg.starttime + " " + leg.desttime + "" + starti);
                        if(bbby) leg.desttime = Number(leg.starttime) + Number(leg.desttime) - Number(starti);
                        let delta = leg.desttime - leg.starttime;
                        report("z. leg.desttime = " + leg.desttime + " delta = " + delta + " " + Math.round(delta / 60));
                        leg.destid = t5[i5].stop_id;
                        Legs[Legs.length] = leg;
                    }
 //                   report("got dest Legs.length = " + Legs.length);
                }
                }
                if(!bFreq)
                {
                if(!bstart && (checkIdP(t5[sidindex].stop_id, startidsa)) && ((t5[i5].sch_dep_dt >= starttime)))
                {
                  bstart = true; 
                  zstarttime = Number(t5[i5].sch_dep_dt);
                  zstartid = t5[sidindex].stop_id;
                }
                if(!bdest && (checkIdP(t5[sidindex].stop_id, destidsa)))
                {
                  bdest = true; 
                  zdesttime = Number(t5[i5].sch_arr_dt);
                  zstopid = t5[sidindex].stop_id;
                }
//                if(bstart && bdest) report("4888 " + i5 + " " + (zstarttime < zdesttime) + " " + zstarttime + " " + zdesttime); 
                if(bstart && bdest && (zstarttime != 0) && (zdesttime != 0) && (zstarttime < zdesttime))
                {
                  leg = makeLeg(zstartid, zstarttime, zstopid, 0, t4[i4]);
                  leg.direction_name = t3[i3].direction_name;
                  leg.routeS = getRouteSForId(rid);
                  leg.routeid = rid;
                  leg.desttime = zdesttime;
                  if(bFreq) leg.desttime = Number(leg.starttime) + Number(leg.desttime) - Number(starti);
                  let delta = leg.desttime - leg.starttime;
//                  report("z. leg.desttime = " + leg.desttime + " delta = " + delta + " " + Math.round(delta / 60));
                  leg.destid = zstopid;
                  Legs.push(leg);
                  bendd = true;  
                }
                }
//                report("checked " + i4 + " " + i5 + " " + t4[i4].trip_id + " " + t5[sidindex].stop_id + " " + bstart + " " + bdest);
                i5 += 1;
              }
  //            if(bdest && bstart)
  //            {
  //                Legs[Legs.length] = tpo;
  //            }
              }
  //            report("4915 " + i4 + " " + t5.length + " " + bstart + " " + bdest);
  //            report("4919 bstart = " + bstart + " bdest = " + bdest + " bendd = " + bendd + " " + zstarttime + " " + zdesttime);
              i4 += 1;
            }
            i3 += 1;
          }
          i2 += 1;
        }
        i1 += 1;
      }
//      if(Legs.length == 0)
      {
//        report(":");
//        report(JSON.stringify(t1));
//        report(":");
      }
      report("736 Legs.length = " + Legs.length + "\n");
      //ctnxcpr(ctnx);
      resolve(Legs);
     
  }).catch( function(err) {
 //     reject(err);
      report("4939 " + err);
      resolve(Legs);
  } ); 
  }
  else 
  {
      report("747 service is null.  Legs.length = " + Legs.length);
      resolve(Legs);
  }
  } );
  return(px);
}
    
let TLD = [];  // array of TripOption used in loop
let TLP = null;  // top level loop promise
let TLPresolve = null;
let TLPreject = null;
let TLI = 0;     // loop index
let TLK = 0;     // loop length
let TLS = [];    // strategy array of legs
let TLt2 = 0;


// stg = strategy = leg[];  
Connections.prototype.makeTripOptionsFromStrategy = function(stg, starttime)
{
  clearArray(TLD);
  TLS = stg;
  TLI = 0;
  TLK = stg.length;
  TLP = new Promise(function(resolve, reject) {
  TLPresolve = resolve;
  TLPreject = reject;
  if(TLK > 0)
  {
    let leg = TLS[0];
    leg.update();
    if(leg.routeid == null) report("makeTripOptionsFromStrategy null routeid for " + leg.routeS);
    else report("makeTripOptionsFromStrategy");
    let p1 = getLegsFrom(leg.startid, leg.destid, leg.routeid, starttime, true);
    p1.then( function(legs0) {
        TLt2 = 0;
        let selindex = -1;
        let etime = -1;
        let sleg = null;
        let k0 = legs0.length;
        let i0 = 0;
 //       report("got " + k0 + " legs");
        if((k0 == 1) && (typeof legs0[0].frequency !== 'undefined'))
        {
           let aleg = legs0[0];
           aleg.desttime =  starttime + 60 * legs0[0].frequency;
           TLt2 = aleg.desttime;
           top.legs[top.legs.length] = aleg;
           TLD.push(top);
        }
        else
        {
        if(k0 > MAXOPTIONS) k0 = MAXOPTIONS;
        while(i0 < k0)
        {
          let aleg = legs0[i0];
//          report("aleg.starttime = " + aleg.starttime );
          if(aleg.starttime >= starttime)
          {
            let top = new TripOption();
            if(top.legs.length == 0) 
            {
                TLt2 = aleg.desttime; 
//                report("aleg.desttime = " + aleg.desttime);
            }
            top.legs.push(aleg);
            TLD.push(top);
            
          }
          i0 += 1;
        }
        }
        
        if(selindex != -1)
        {
          let top = new TripOption();
          if(top.legs.length == 0) 
          {
            TLt2 = sleg.desttime; 
 //               report("aleg.desttime = " + aleg.desttime);
          }
        }
        
        TLI += 1;
        mtofsCondition();
    } ).catch(function(err) {
      TLD.push((new TripOption()).leg); //?
      report(err);
      } );
  }
  else 
  {
    TLI += 1;
    mtofsCondition();
//      TLPresolve(TLD);
     // reject("No strategies");
  }
  } );
  return(TLP);
}

function mtofsCondition()
{
  if((TLI < TLK) && (TLD.length > 0))
  {
    checkDelayExecute(mtofsAction);
  }
  else
  {
    TLPresolve(TLD);
  }
}

function mtofsAction()
{
  let t22 = -1;
  report("\nTLI = " + TLI + " has " + TLD[0].legs.length + " legs");
  if(TLI > 0) 
  {
      if(TLD[0].legs[TLI - 1] === undefined) ;
      else t22 = TLD[0].legs[TLI - 1].desttime;
  }
  if(t22 == 0) report("5301 " + JSON.stringify(TLD[0].legs[TLI - 1], null, 4));
  report("mtofsAction TLI = " + TLI + " t2 = " + TLt2 + " ts = " + (Number(TLt2) + Tchg) + " t22 = " + t22);
  t22 = (Number(t22) + Tchg + 1);
//  t22 = (Number(t22) - 180); // + Tchg -5);
  let dtx = new Date(t22 * 1000);
  report(" next leg min starttime " + dtx.toLocaleDateString() + " " + dtx.toLocaleTimeString());   
  let leg = TLS[TLI];
  report("mtofs TLS routeid = " + leg.routeid + ": " + leg.routeS + " " + TLI + " " + leg.startid + " " + leg.destid);
  leg.update();
  if((leg.startid != "") && (leg.destid != null))
  {
  let p2 = getLegsFrom(leg.startid, leg.destid, leg.routeid, t22, false);
  p2.then( function(legs1) {
    let legsadded = 0;
    let k2 = TLD.length;
//    report("got " + legs1.length + " potential new legs");
    let i2 = 0;
    let k0 = legs1.length;
    if((k0 == 1) && (typeof legs1[0].frequency !== 'undefined'))
    {
           aleg.desttime =  starttime + 60 * legs1[0].frequency;
           TLt2 = aleg.desttime;
           top.legs[top.legs.length] = aleg;
           TLD[TLD.length] = top;
    }
    else
    {
    while((i2 < k2) && (legsadded < 30))
    {
      let tpo = TLD[i2];
      let k21 = legs1.length;
      let i21 = 0;
      let b21 = true;
      let l21 = null;
      if(tpo.legs[TLI - 1] === undefined) report("TLI = " + TLI + ", tpo.legs.length = " + tpo.legs.length + ", i2 = " + i2 + ", k21 = " + k21);
      else l21 = tpo.legs[TLI - 1];
//          report("k21 = " + k21);
      if(l21 != null)
      {
      let t21 = Number(l21.desttime);
//      report("5106 l21.destime = " + l21.desttime);
      //if(i2 == 0) 
      t21 = Number(t21) + Tchg;
//      report("t21 = " + t21);
      dtx = new Date(t21 * 1000);
//      report(" option " + i2 + " min starttime " + dtx.toLocaleDateString() + " " + dtx.toLocaleTimeString() + " " + t21);   
      let selindex = -1;
      let etime = -1;
      let sleg = null;
      while(i21 < k21)
      {
        let lg = legs1[i21];
        dtx = new Date(lg.starttime * 1000);
//       report("a. lg.starttime = " + lg.starttime + " lg.desttime = " + lg.desttime);
//        report(i21 + " new leg start " + dtx.toLocaleTimeString());
//        report("5121 lg.starttime = " + lg.starttime);
        if(lg.starttime > t21)
        {
          if(etime == -1) 
          {
            etime = lg.desttime;
            selindex = i21;
            sleg = lg;
          }
          else if(lg.desttime < etime)
          {
            etime = lg.desttime;
            selindex = i21;
            sleg = lg;
          }
//          tpo.legs[tpo.legs.length] = lg.clone();
          b21 = false;
        }
        else if(lg.starttime < -2)
        {
          if(typeof lg.frequency != 'undefined')
          {
            let t23 = t21 +  (lg.frequency * 60);
            report("b. lg.starttime = " + lg.starttime + " lg.desttime = " + lg.desttime);
            /*
            let tfd = lg.starttime
            if((lg.starttime > t23)
            {
              if(etime == -1) 
              {
                etime = lg.desttime;
                selindex = i21;
                sleg = lg;
              }
              else if(lg.desttime < etime)
              {
                etime = lg.desttime;
                selindex = i21;
                sleg = lg;
              }
            }
            */
//          tpo.legs[tpo.legs.length] = lg.clone();
          b21 = false;

          }
        }
        i21 += 1;
      }
      if(selindex != -1)
      {
        tpo.legs[tpo.legs.length] = sleg.clone();
//        let top = new TripOption();
//        if(top.legs.length == 0) 
//        {
//          TLt2 = sleg.desttime; 
 //             report("aleg.desttime = " + aleg.desttime);
//        }
//        top.legs[top.legs.length] = sleg;
//        TLD[TLD.length] = top;
      }
      if(b21) 
      {
//        report("did not add a leg to TLD[" + i2 + "] t21 = " + t21);
        let g = leg.clone();
        g.starttime = 0;
        g.desttime = 0;
        tpo.legs[tpo.legs.length] = g;
      }
      else 
      {
          legsadded += 1;
//          report("added a leg to TLD[" + i2 + "]");
      }
      }
      else report("l21 is null, did not add a leg to TLD[" + i2 + "]");
      i2 += 1;
    }
    }
    TLI += 1;
    mtofsCondition();
  } ).catch(function(e) {
      report("824 " + e);
      clearFcbut();
     } );
  }
  else
  {
    TLI += 1;
    mtofsCondition();      
  }
}

function checkDelayExecute(func)
{
  let b = true;
  let tn = Date.now() - ttime;
  let TL = 10000;
  let tm = 12000 - tn;
  if(b)
  {
    TL = 1000;
    tm = 1000 - tn;
  }
  if(tm < 1000) tm = 1000;
  if(tn > TL) func();
  else setTimeout(func, tm);
}

let TS = null
let TSI = 0;

 // returns an array of connections
 Connections.prototype.findConnections = function()
 {
   report("findConnections " + this.startid + " " + this.destid);
   ctnx = this;
   this.cp = new Promise(function(resolve, reject) {
   ctnxcpr = resolve;
   StrategyLevel = 0;
   let p = ctnx.getStrategiesFromTo(ctnx.startid, ctnx.destid);
   p.then(function(t) {
       TS = t;
       TSI = 0;
       let spx = "";
       if(t.length == 1) 
       {
           spx += "Got 1 strategy\n";
           report("got 1 strategy");
       }
       else 
       {
           spx += "Got " + t.length + " strategies\n"
           report("got " + t.length + " strategies");
       }
       report("------------------------");
       let kk = t.length;
       let j = 0;
       while(j < kk)
       {
         spx += "\nstrategy " + j + ":\n";
         report("\nstrategy " + (j+1) + ": " + t[j].length + " legs");
         let k = t[j].length;
         let i = 0;
         while(i < k)
         {
           let leg = t[j][i];
           if(typeof leg === 'undefined') report("  leg is undefined");
           else
           {
//               report(":");
//     report(JSON.stringify(leg));
//               report(":");
            if(typeof leg.update != 'undefined') leg.update();
//          else report("leg update undefined for:\n" + JSON.stringify(leg));
           spx += "  leg " + i + " : " + getStopNameFromID(leg.startid) + " (" + leg.startid + ") to " + getStopNameFromID(leg.destid) + " (" + leg.destid + ") :" + leg.routeid + ": " + leg.routeS + "\n";
          report("  leg " + i + " : " + getStopNameFromID(leg.startid) + " (" + leg.startid + ") to " + getStopNameFromID(leg.destid) + " (" + leg.destid + ") :" + leg.routeid + ": " + leg.routeS + "\n");
             if(i == k-1)
             {
               if(leg.hasChildren())
               {
                 let k6 = leg.length;
                 report("final legs = " + k6 + " children");
                 let i6 = 0;
                 for(i6 = 0; i6 < k6; i6++)
                 {
                   let l = leg.children[i6];
          report("  leg " + i + " : " + getStopNameFromID(l.startid) + " (" + l.startid + ") to " + getStopNameFromID(l.destid) + " (" + l.destid + ") :" + l.routeid + ": " + l.routeS + "\n");
                   
                 }
               }
             }
           }
           i += 1;
         }
         j += 1;
       }
       SPX = spx;
       report("------------------------");
       report(" ");
       ctnx.strategies = t;
       if(t.length == 0)
       {
         xcolor = "#d3d3d3";
         document.getElementById("fcbut").style.backgroundColor = xcolor;
         report("no strategies found");
       }
       else checkDelayExecute(ctnx.findConnections11);
       } ).catch(function(err) {
       report(err);
       } );
   } );
   ctnx.cp = this.cp;
/*
   let p7 = getStrategiesFromTo(ctnx.startid, ctnx.destid);
   p7.then(function(t) {
       report("\n^^^^^^^^^^^");
       report("strategies.length = " + t.length);
       let spx = "";
       let kk = t.length;
       let j = 0;
       while(j < kk)
       {
         spx += "\nstrategy " + j + ":\n";
         report("\nstrategy " + j + ":");
         let k = t[j].length;
         let i = 0;
         while(i < k)
         {
           let leg = t[j][i];
           if(leg === undefined) report("  leg is undefined");
           else
           {
           leg.update();
           spx += "  leg " + i + " : " + leg.startid + " to " + leg.destid + " :" + leg.routeid + ": " + leg.routeS + "\n";
           report("  leg " + i + " : " + leg.startid + " to " + leg.destid + " :" + leg.routeid + ": " + leg.routeS);
           }
           i += 1;
         }
         j += 1;
       }
      report("\n^^^^^^^^^^^");
   } );
   */
   return(ctnx.cp);   
 }
 
 Connections.prototype.findConnections11 = function()
 {
   report("5732 Try to get trips for each strategy. " + ctnx.startid + " " + ctnx.destid);
   let t = ctnx.strategies;
   let k = t.length;
   if(t.length > 0)
   {
     lsAction();  
   }   
 }
 
 function lsCondition()
{
  if(TSI < TS.length)
  {
    checkDelayExecute(lsAction);
  }
  else
  {
//    report("a. ctnx.TripOptions.length = " + ctnx.TripOptions.length);
    if(document.getElementById("faf").checked) filterOptions(ctnx);
//    report("b. ctnx.TripOptions.length = " + ctnx.TripOptions.length);
    ctnxcpr(ctnx); //resolve
  }
}

function lsAction()
{
  report("-------");
  report("\nstrategy " + (TSI + 1) + " of " + TS.length);
     let stg = TS[TSI];
     let p1 = ctnx.makeTripOptionsFromStrategy(stg, ctnx.datetime);
     p1.then(function(top) {
         let kkk = top.length;
         let iii = 0;
         while(iii < kkk)
         {
           ctnx.TripOptions[ ctnx.TripOptions.length] = top[iii];
           iii += 1;
         }
         report("Added " + ctnx.TripOptions.length + " trips.");
//         report("strategy length = " + stg.length + ", trip length = " + ctnx.TripOptions[TSI].legs.length);
         TSI += 1;
         lsCondition();
      } ).catch(function(err) {
       report(err);      
       clearFcbut();
       } );
    
}

function isRouteIDIn(s, d, a, b)
{
  let k = a.length;
  let i = 0;
  let bx = false;
  while(!bx && (i < k))
  {
    if((s == a[i]) || (d == b[i]))
    {
      bx = true; 
      Sindex = i;
    }
    else i += 1;
  }
  return(bx);
}

let Sindex = -1;

function filterOptions(ctnx)
{
  Sindex = -1;
  let NStrips = [];
  let NSdtimes = [];
  let kk = ctnx.TripOptions.length;
  let ii = 0;
  while (ii < kk)
  {
    let tf = ctnx.TripOptions[ii];
    let k3 = tf.legs.length;
    if(k3 == 1)
    {
//      NStrips.push(tf.legs[0].routeid);
      NStrips.push(tf.legs[0].tripleg.trip_id);
      NSdtimes.push(tf.legs[0].desttime);
//      report("ns " + tf.legs[0].tripleg.trip_id + " " + tf.legs[0].routeid + " " + tf.legs[0].desttime);
    }
    ii += 1;
  }
//  report(NStrips.length + " non-stop trips " + kk + " trip options");
  ii = kk-1;
  while(ii >= 0)
  {
    let tf = ctnx.TripOptions[ii];
    let k3 = tf.legs.length;
    if(k3 > 1)
    {
 //     let z = "";
 //     if(tf.legs[k3-1].tripleg != null) z = tf.legs[k3-1].tripleg.trip_id;
 //     report(ii + " " + z + " " + tf.legs[k3-1].routeid + " " + tf.legs[k3-1].desttime);
      if(( (tf.legs[k3-1].tripleg != null) && isRouteIDIn(tf.legs[k3-1].tripleg.trip_id,tf.legs[k3-1].desttime, NStrips, NSdtimes)) || (tf.legs[k3-1].desttime == 0))
      {
//        report("deleted " + ii + " " + tf.legs[k3-1].routeid + " " + tf.legs[k3-1].desttime);
        ctnx.TripOptions.splice(ii, 1); 
      }
      
    }
    ii -= 1;
  }
//    report("c. ctnx.TripOptions.length = " + ctnx.TripOptions.length);
}

function cleanDuplicateTripOptions(cnx)
{
  let tro = cnx.TripOptions.sort(tripOptionCompare);
//  let tro = cnx.TripOptions;
  report("check " + tro.length + " TripOptions");
  let k = tro.length-1;
  let dupes = 0;
  while(k >= 1)
  {
    let tr1 = tro[k].legs;
    let tr2 = tro[k-1].legs;
//    report("  " + k + " " + tr1[0].starttime + " " + tr2[0].starttime + " " +  tr1[0].children.length + " " + tr2[0].children.length);
    if((tr1[0].starttime == tr2[0].starttime) && (tr1[tr1.length-1].desttime == tr2[tr2.length-1].desttime))
    {
      tro.splice(k, 1);
      dupes += 1;
    }
    k -= 1;
  }
  report("cleaned " + dupes + " dupes");
  cnx.TripOptions = tro;
}

 
