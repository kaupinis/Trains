// eo_pre.js

function TCalendar()
{
   this.addService = function(a,b,c,d,e){
   };
   this.addServiceDays = function(a,b,c,d,e,f){
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
}

