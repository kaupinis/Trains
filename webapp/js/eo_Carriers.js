// eo_Carriers.js

let bProc2 = false;

/*
 * This class defines a Stop record.
 */
class Stop {
    stop_id = ""; // old 0
    stop_name = ""; // old 1
    desc = ""; // old 2
    lat = ""; // old 4
    lon = ""; // old 5
    tz = "";  // old 6
    parent = ""; // old 8
    fac = ""; // old 9
    routes = ""; // old 11
    s3 = ""; // old 3
    s7 = ""; // old 7
    s10 = ""; //  old 10
    
    constructor() {
    }
    
    static createStop(stop_id, stop_name, desc,lat, lon, tz, parent, fac, routes, s3, s4, s8)
    {
      let s = new Stop();
      s.stop_id = stop_id;
      s.stop_name = stop_name;
      s.desc = desc;
      s.lat = lat;
      s.lon = lon;
      s.tz = tz;
      s.parent = parent;
      s.fac = fac;
      s.routes = routes;
      s.s3 = s3;
      s.s7 = s7;
      s.s10 = s10;
      return(s);
    }
    
    static createStopFromArrayIndex(array, index)
    {
      let s = new Stop();
      s.stop_id = array[index + 0];
      s.stop_name = array[index + 1];
      s.desc = array[index + 2];
      s.lat = array[index + 4];
      s.lon = array[index + 5];
      s.tz = array[index + 6];
      s.parent = array[index + 8];
      s.fac = array[index + 9];
      s.routes = array[index + 11];
      s.s3 = array[index + 3];
      s.s7 = array[index + 7];
      s.s10 = array[index + 10];
      return(s);
    }
    
    getStop_id() { return(this.stop_id); }
    getStop_name() { return(this.stop_name); }
    getStop_lat() { return(this.lat); }
    getStop_lon() { return(this.lon); }
    getStop_tz() { return(this.tz); }
    getStop_parent() { return(this.parent); }
    getStop_fac() { return(this.fac); }
    getStop_routes() { return(this.routes); }
    getStop_s3() { return(this.s3); }
    getStop_s7() { return(this.s7); }
    getStop_s10() { return(this.s10); }
    getStop_Position() { return({lat: this.lat, lon: this.lon}); }
   
}

class Carrier {
    name = "";
    id = "";
    stop_prefix = "";
    route_prefix = "";
    trip_prefix = "";
    refstop = "";
    hasSked = "";
    hasPred = "";
    loaded = false;
    isDynamic = false;
    routes = [];
    calendar = null;
    stops = [];
    
    constructor(id) {
        this.id = id;
    }
    
    getId() {
        return(this.id);
    }
    
    addCarrier(c) {
        return(Carriers.addCarrier(c));
    }
    
    addRoute(route) {
        let rid = route.route_id;
        let b = false;
        let i = 0;
        let k = this.routes.length;
        while(!b && (i < k))
        {
          if(rid == this.routes[i].route_id)
          {
            b = true;   
          }
          else i += 1;
        }
        if(!b) 
        {
            route.cal = this.calendar;
            this.routes.push(route);
        }
        addRouteToService(route);
        return(!b);
    }
    
    addRouteToService(route) {
        this.addRoute(route);
    }
    
    getRoute(route_id) {
        let r = null;
        let b = false;
        let i = 0;
        let k = this.routes.length;
        while(!b && (i < k))
        {
          if(route_id == this.routes[i].route_id)
          {
            b = true;  
            r = this.routes[i];
          }
          else i += 1;
        }
        return(r);
    }
    
    getRouteIdsByRef(ref) {
        let r = [];
        let i = 0;
        let k = this.routes.length;
        for(i=0; i < k; i++)
        {
          if(ref == this.routes[i].ref)
          {
            r.push(this.routes[i].route_id);
          }
        }
        return(r);
    }
    
    setCalendar(cal) {
        this.calendar = cal;
    }
    
    addStops(stops_a) {    // deprecated
        this.stops = stops_a;
        addStopGroupToCategories(stops_a, this.id);
    }
    
    setStops(stops_a) {
        this.stops = stops_a;
        addStopGroupToCategories(stops_a, this.id);
    }
    
    getStopIndex(stop_id) {
        let k = this.stops.length;
        let i = 0;
        let b = true;
        while(b && (i < k))
        {
          if(stop_id == this.stops[i])
          {
            b = false;
          }
          else 
          {
            i += 12;
          }
        }
        if(b) i = -1;
        return(i);
    }
    
    getStopItem(index) {
        return(this.stops[index]);
    }
    
    getStopNameById(stop_id) {
        let b = true;
        let r = "";
        let k = this.stops.length;
        let i = 0;
        while(b && (i < k))
        {
          if(this.stops[i] == stop_id)
          {
            b = false;
            r = this.stops[i+1];
          }
          else i += 12;
        }
        return(r);
    }
    
    getStop(stop_id) {
        let stop = null;
        let i = this.getStopIndex(stop_id);
        if(i != -1)
        {
          stop = Stop.createStopFromArrayIndex(this.stops, i);   
        }
        return(stop);
    }
    
   
}

class Carrier1 extends Carrier {
    constructor(name, shortid, builtin, url) {
        super(shortid);
        this.name = name;
        this.builtin = builtin;
        this.url = url;
    }
    
}


class Carriers {
    static Carriers = []
    
    static addCarrier(c) {
        let b = false;
        let c1 = Carriers.getCarrier(c.getId());
        if(c1 == null)
        {
          Carriers.Carriers.push(c);
          b = true;
        }
        return(b);
    }
    
    static clear() {
        Carriers.Carriers = [];
    }
    
    static push(c) {
        Carriers.Carriers.push(c);
    }
    
    static isCarrierLoaded(id) {
        let b = false;
        let i = 0;
        let k = Carriers.Carriers.length;
//        console.log("68 " + k + " " + id);
        while(!b && (i < k))
        {
//          if(i == 4) console.log("71 " + Carriers.Carriers[4].id);
          if(id == Carriers.Carriers[i].id)
          {
            b = true;
          }
          i += 1;
        }
//        console.log("78 isLoaded " + id + " " + b);
        return(b);
    }
       
    static getCarrier(id) {
        let b = false;
        let i = 0;
        let k = Carriers.Carriers.length;
        let r = null;
        while(!b && (i < k))
        {
          if(id == Carriers.Carriers[i].id)
          {
            b = true;
            r = Carriers.Carriers[i];
          }
          i += 1;
        }
        return(r);
    }
    
    static getCarrierByStopId(stop_id) {
        let b = false;
        let i = 0;
        let k = Carriers.Carriers.length;
        let r = null;
        while(!b && (i < k))
        {
          if(stop_id.indexOf(Carriers.Carriers[i].stop_prefix) == 0)
          {
            b = true;
            r = Carriers.Carriers[i];
          }
          i += 1;
        }
        return(r);
    }
    
    static getCarrierByRouteId(route_id) {
        let b = false;
        let i = 0;
        let k = Carriers.Carriers.length;
        let r = null;
        while(!b && (i < k))
        {
          if(stop_id.indexOf(Carriers.Carriers[i].route_prefix) == 0)
          {
            b = true;
            r = Carriers.Carriers[i];
          }
          i += 1;
        }
        return(r);
    }
    
    static async checkLoadable(stop_id) {
        let b = false;
        let p = null;
        let i = 0;
        let k = Carriers.Carriers.length;
        while(!b && (i < k))
        {
          if(stop_id.indexOf(Carriers.Carriers[i].stop_prefix) == 0)
          {
            b = true;
        
          }
          else i += 1;
        }
        
        if(b)
        {
          let sc = Carriers.getSupportedCarrier(Carriers.Carriers[i].id);
          p = Carriers.loadCarrier(sc.id);
        }
        return(p);
    }
    
    static async checkRouteLoadable(route_id) {
        let b = false;
        let p = null;
        let i = 0;
        let k = Carriers.Carriers.length;
        while(!b && (i < k))
        {
          if(route_id.indexOf(Carriers.Carriers[i].route_prefix) == 0)
          {
            b = true;
        
          }
          else i += 1;
        }
        
        if(b)
        {
          let sc = Carriers.getSupportedCarrier(Carriers.Carriers[i].id);
          p = Carriers.loadCarrier(sc.id);
        }
        return(p);
    }
        
    static async loadCarrier(id) {
        let p = null;
        let c = Carriers.getCarrier(id);
        if((c != null) && (c.sourcefile != ""))
        {
          let u = EODATA + c.Carriers.e;
          p = loadScript(u);
        }
        return(p);
    }
    
    static getStopName(stop_id) {
        let r = "";
        let c = Carriers.getCarrierByStopId(stop_id);
        if(c != null)
        {       
          r = c.getStopNameById(stop_id);
        }
        if(r == "")
        {
          r = getStopNameFromID(stop_id) 
        }
        return(r);
    }
    
    static getStop(stop_id) {
        let stop = null;
        let c = Carriers.getCarrierByStopId(stop_id);
        i(c != null)
        {
          stop = c.getStop(stop_id);   
        }
        return(stop);
    }
    
    /*
    static getStopsByParent(stop_id) {
        
    }
    
    static getRoutesForStop(stop_id) {
    }
    
    static getRoutesForParent(stop_id) {
    }
        
    */
    
}

function getSupportedCarrierFromRouteId(route_id)
{
  let a = SupportedCarriers;
  let k = a.length;
  let i = 0;
  let b = false;
  let r = null;
  while(!b && (i < k))
  {
    if(route_id.indexOf(a[i].route_prefix) == 0)
    {
      b = true;
      r =  a[i];
    }
    i += 1;
  }
  return(r);
}

let SupportedCarriers = [
{
    id: "SBB",
    name: "SBB",
    stop_prefix: "Z_",
    route_prefix:"Z_",
    trip_prefix: "Z_",
    sourcefile: "eo_SBB.js",
    refstop: "Z_8507380:2",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: false,
    isDynamic: true,
    loaded: false,
    routes: []
},
{
    id: "SNCF",
    name: "SNCF",
    stop_prefix: "SNCF_",
    route_prefix:"SNCF_",
    trip_prefix: "SNCF_",
    sourcefile: "eo_SNCF.js",
    refstop: "SNCF_Car_TER_87113001",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: false,
    isDynamic: true,
    loaded: false,
    routes: []
},
{
    id: "TN",
    name: "Trenord",
    stop_prefix: "TN_",
    route_prefix:"TN_",
    trip_prefix: "TN_",
    sourcefile: "eo_Trenord.js",
    refstop: "TN_S01700",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: false,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "DB",
    name: "DB",
    stop_prefix: "DB_",
    route_prefix:"DB_",
    trip_prefix: "DB",
    sourcefile: "eo_DB.js",
    refstop: "TN_S01700",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: false,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "AMR",
    name: "AMTRAK",
    stop_prefix: "AMS",
    route_prefix:"AMR",
    trip_prefix: "AMR_",
    sourcefile: "eo_AMTRAK.js",
    refstop: "AMSACD",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: true,
    isDynamic: false,
    loaded: true,
    routes: []
},
{
    id: "LI",
    name: "LIRR",
    stop_prefix: "LI",
    route_prefix:"LIRR",
    trip_prefix: "LI",
    sourcefile: "eo_LIRR.js",
    refstop: "LI27",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: true,
    isDynamic: false,
    loaded: true,
    routes: []
},
{
    id: "MBTA",
    name: "MBTA",
    stop_prefix: "T_",
    route_prefix:"T_",
    trip_prefix: "T_",
    sourcefile: "eo_MBTA.js",
    refstop: "T_BNT-0000",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: true,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "MNR",
    name: "MNR",
    stop_prefix: "MNR_",
    route_prefix:"MN",
    trip_prefix: "MNR",
    sourcefile: "eo_MNR.js",
    refstop: "MNR_157",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: true,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "ME",
    name: "Metra",
    stop_prefix: "ME_",
    route_prefix:"ME_",
    trip_prefix: "ME_",
    sourcefile: "eo_Metra.js",
    refstop: "ME_CUS",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: true,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "NJ",
    name: "NJ Transit",
    stop_prefix: "NJ",
    route_prefix:"NJR",
    trip_prefix: "NJT",
    sourcefile: "eo_NJ1.js",
    refstop: "NJ38187",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: true,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "DART",
    name: "DART",
    stop_prefix: "DT_",
    route_prefix:"DART_",
    trip_prefix: "DART_",
    sourcefile: "eo_DART.js",
    refstop: "DT_28180",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: false,
    isDynamic: true,
    loaded: false,
    routes: []
},
{
    id: "MDC",
    name: "Miami MetroRail",
    stop_prefix: "MDC",
    route_prefix:"MDR",
    trip_prefix: "MDC",
    sourcefile: "eo_MDC.js",
    refstop: "MDC9486",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: false,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "TRR",
    name: "TriRail FL",
    stop_prefix: "TR",
    route_prefix:"TRR",
    trip_prefix: "TR",
    sourcefile: "eo_TR.js",
    refstop: "TR1",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: false,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "BART",
    name: "BART",
    stop_prefix: "B_",
    route_prefix:"B_",
    trip_prefix: "B_",
    sourcefile: "eo_BART.js",
    refstop: "B_DALY",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: true,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "PATH",
    name: "PATH",
    stop_prefix: "PATH",
    route_prefix:"PATH",
    trip_prefix: "PH_",
    sourcefile: "eo_PATH.js",
    refstop: "PATH781721",
    nlat: "",
    nlon: "",
    hasSked: true,
    hasPred: true,
    isDynamic: false,
    loaded: false,
    routes: []
}

];

let BusList = [
{
    id: "MBTABUS",
    name: "Boston MBTA Bus",
    stop_prefix: "TB",
    route_prefix: "TB",
    trip_prefix: "TB",
    sourcefile: "eo_MBTA_BusStops3.js",
    refstop: "TB_12645",
    nlat: "",
    nlon: "",
//    routemap: routes_bus,
    inc: 5,
    offset: 2,
    hasSked: false,
    hasPred: true,
    isDynamic: false,
    loaded: false,
    routes: []
},
{
    id: "NJBUS",
    name: "New Jersey Transit Bus",
    stop_prefix: "NZ",
    route_prefix: "Y",
    trip_prefix: "NJB",
    sourcefile: "eo_NJBus_stops.js,eo_NJBus_routes.js,eo_NJBus_cal.js,",
    refstop: "NZ43888",
    nlat: "",
    nlon: "",
//    routemap: routes_NJBUS,
    inc: 4,
    offset: 2,
    hasSked: false,
    hasPred: false,
    isDynamic: true,
    loaded: false,
    routes: []
},
{
    id: "CTABUS",
    name: "Chicago Transit Authority Bus",
    stop_prefix: "CH",
    route_prefix: "CH",
    trip_prefix: "CH",
    sourcefile: "eo_CTABus_cal.js,eo_CTABusStops.js,eo_CTABus_routes.js",
    refstop: "CH10",
    nlat: "",
    nlon: "",
//    routemap: routes_CTABus,
    inc: 2,
    offset: 1,
    hasSked: false,
    hasPred: true,
    isDynamic: true,
    loaded: false,
    routes: []
},
{
    id: "SFMTA",
    name: "San Francisco SFMTA Bus",
    stop_prefix: "SFB_",
    route_prefix:"SFB_",
    trip_prefix: "SFB_",
    sourcefile: "eo_SFMTA_cal.js,eo_SFMTA2BusStops.js,eo_SFMTA2BusRoutes.js",
    refstop: "SF_14903",
    nlat: "",
    nlon: "",
//    routemap: SFMTARouteMapMap,
    inc: 3,
    offset: 2,
    bsfsel: true,
    hasSked: false,
    hasPred: true,
    isDynamic: true,
    loaded: false,
    routes: []
},
{
    id: "LABUS",
    name: "Los Angeles Metro Bus",
    stop_prefix: "LAMB",
    route_prefix:"LAMB",
    trip_prefix: "LAMB",
    sourcefile: "eo_LAMB_cal.js,eo_LABusStops.js,eo_LAMetroBusRoutes.js",
    refstop: "LAMB4224",
    nlat: "",
    nlon: "",
//    routemap: LAMBRouteMap,
    inc: 3,
    offset: 2,
    bsfsel: true,
    hasSked: false,
    hasPred: true,
    isDynamic: true,
    loaded: false,
    routes: []
},
{
    id: "RIPTA",
    name: "Rhode Island RIPTA Bus",
    stop_prefix: "RIPT",
    route_prefix: "RIPT",
    trip_prefix:  "RIPT",
    sourcefile: "eo_RIPTA.js",
    refstop: "RIPT130",
    nlat: "",
    nlon: "",
//    routemap: RIPTABusRoutes,
    inc: 2,
    offset: 1,
    hasSked: false,
    hasPred: true,
    isDynamic: true,
    loaded: false,
    routes: []
},
{
    id: "MTA",
    name: "New York MTA Bus",
    stop_prefix: "MTA",
    route_prefix: "MTA_",
    trip_prefix: "MTA",
    sourcefile: "eo_MTA_Stops.js,eo_MTA_Routes.js",
    refstop: "MTA103699",
    nlat: "",
    nlon: "",
//    routemap: routes_MTA,
    inc: 3,
    offset: 2,
    bsfsel: true,
    hasSked: false,
    hasPred: true,
    isDynamic: false,
    loaded: false,
    routes: []
}
 
    
];


function addRouteToCarrier(troute)
{
  let c = [Carriers, BusList];
  let b = true;
  let i = 0;
  while(b && (i< c.length))
  {
    let a = c[i];
    let i2 = 0;
    while(b && (i2 < a.length))
    {
      if(troute.route_id.indexOf(a[i2].route_prefix) == 0)
      {
        a[i2].routes.push(troute);
        b = false;
      }
      i2 += 1;
    }
    i += 1;
  }
  if(b) report("27 cant find carrier for route " + troute.route_id);  
}
