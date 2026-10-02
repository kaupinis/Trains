// eo_pre.js

/*
function TCalendar()
{
   this.addServiceDays = function(a,b,c,d,e,f){
   };
}
*/

var Routes = [];
let stop_Categories = [];

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

function TCalendar()
{
  this.calservices = [];
  this.addServiceDays = function(service_id, days, start_date, end_date, adds, dels)
  {
    var calserv = new ServiceCalendar(service_id, days, start_date, end_date, adds, dels);
    this.calservices.push(calserv);
  }
  
  this.addService = function(service_id, start_date, end_date, adds, dels)
  {
    this.addServiceDays(service_id, "", start_date, end_date, adds, dels);
  }

  this.getServiceCalendar = function(id)
  {
    let i = 0;
    let k = this.calservices.length;
    let b = true;
    let r = null;
    while(b && (i < k))
    {
      if(id == this.calservices[i].service_id)
      {
        b = false;
        r = this.calservices[i];
      }
      else i += 1;
    }
    return(r);
  }

}
