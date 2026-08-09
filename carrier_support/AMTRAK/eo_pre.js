// eo_pre.js

class Carrier {
    id = null;
    calendar = null;
    routes = [];
    
    constructor(id) {
        this.id = id;
    }
    
    setCalendar(cal) {
        this.calendar = cal;
    }
    
    addRouteToService(r) {
        this.routes.push(r);
        addRouteToService(r);
    }
    
    addStops(a) {
        
    }
    
    setStops(a) {
        
    }
   
}

class Carriers {
    static Carriers = [];
    static addCarrier(c) {
        Carriers.Carriers.push(c);
    }
}

var stops_AM = [];

function TCalendar()
{
   this.calservices = [];
}

TCalendar.prototype.addServiceDays = function(service_id, days, start_date, end_date, adds, dels)
{
  var calserv = new ServiceCalendar(service_id, days, start_date, end_date, adds, dels);
  this.calservices.push(calserv);
  this.getService = function(id) {
      var b = true;
      var r = null;
      var k = this.calservices.length;
      var i = 0
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

var Routes = [];

function addRouteToService(r)
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
  this.cal = null;
  this.addTrip = function(ttrip) {
      
       if((this.cal != null) && (ttrip.days != ""))
       {
         var t = ttrip.service_ids;
         if(typeof t !== 'undefined')
         {
           var s = "";
           var k = t.length;
           var i = 0;
           for(i = 0; i<k; i++)
           {
             var sc = this.cal.getService(t[i]);
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
       this.trips[this.trips.length] = ttrip;
       };
}

/*
function getStopNameFromID(stop_id)
{
  var d = "";
  if(stop_id != "")
  {
    var a = stops_BART;
    var k = a.length;
    var i = 0;
    var b = true;
    while(b && (i < k))
    {
      if(stop_id == a[i])
      {
        b = false;
        d = a[i+1];
      }
      i += 12;
    }
  }
  return(d);
}
*/

function TTrip(trip_id, trip_name, direction, days)
{
  this.trip_id = trip_id;
  this.trip_name = trip_name;
  var parent = null;
  this.parent_id = null;
  this.direction = direction; // 0 = stop_id order, 1 = reverse order
  this.days = days; // 0 = Sunday
  this.headsign = "";
  this.times = [];
  this.comp = [];
  this.early_arrival = [];
  this.alerts = "";
  this.service_id = null;
  this.cal = null;
  this.startcdate = null;
}
