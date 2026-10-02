// eo_pre.js

let stops_NJ = [];

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
    
    addRoute(r) {
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

function TCalendar()
{
   this.addService = function(a,b,c,d,e){
   };
}

var Routes = [];

function addRouteToService(r)
{
  Routes.push(r);   
}

function getRoute(route_id)
{
  var b = true;
  var r = null;
  var i = 0;
  var k = Routes.length;
  while(b && (i < k))
  {
    if(Routes[i].route_id == route_id)
    {
      b = false;
      r = Routes[i];
    }
    i += 1;
  }
  return(r);
}

function TRoute(route_id, route_name)
{
  this.route_id = route_id;
  this.route_name = route_name;
  this.stop_ids = [];
  this.stop_names = [];
  this.trips = [];
  this.addTrip = function(t) {
      
  };
}

function TTrip(a, b, c, d)
{
}
