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

function TRoute(route_id, route_name)
{
  this.route_id = route_id;
  this.route_name = route_name;
  this.stop_ids = [];
  this.stop_names = [];
  this.trips = [];
}

function getStopNameFromID(stop_id)
{
  var d = "";
  if(stop_id != "")
  {
    var a = stops_brightline;
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

const stops_brightline = [
//"BL004","Orlando Airport Brightline", "","","28.412210","-81.308970","","","","","",""
"BL7","Fort Lauderdale Brightline","","","26.1236190796","-80.1455459595","","","","","","BL1",
"BL1","Miami Central Brightline","","","25.7799682617","-80.195640564","","","place-miamicentral","","","BL1",
"BL3","West Palm Beach Brightline","","","26.712015152","-80.0553588867","","","place-wpb","","","BL1",
"BL10","Aventura Brightline","","","25.958688736","-80.1473236084","","","","","","BL1",
"BL11","Boca Raton Brightline","","","26.3538284302","-80.0874938965","","","","","","BL1",
"BL12","Orlando Airport Brightline","","","28.4116916656","-81.3082962036", "","","","","","BL1"
];


