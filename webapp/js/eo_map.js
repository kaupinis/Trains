// eo_map.js Trains version

var PXT = '<span style="float:right"><a href="javascript:CloseMarkerPopup()">X</a></span>';

const CPXLAT = 100;
const CPXLON = 100;

var Zpoint = null;
var Zpoint2 = null;

function round(x, p)
{
  var m = Math.pow(10, p);
  var n = x * m;
  return(Math.round(n) / m);
}

function CloseMarkerPopup()
{
  map.popup.setPosition();
}

var markerSource = null;

function OSM(div)
{
  this.div = div;
  this.omap = null;
  this.doj = [];
  this.bOK = false;
  if(typeof ol === 'undefined')
  {
    report("OSM - ol not loaded.");
  }
  else
  {
  this.bOK = true;
  this.markerSource = new ol.source.Vector();
  var pos = getPositionForName(Place);
  if(pos == null) report("40 pos is null for " + Place);
  var c = [round(pos.y, 4), round(pos.x, 4)];
//  report("pos.x = " + pos.x + " " + pos.y );
  this.omap = new ol.Map({
      layers: [
         new ol.layer.Tile({
             source: new ol.source.OSM()
         }),
         new ol.layer.Vector({
             source: this.markerSource
         })
         ],
      target: div,
      view: new ol.View({
             center: ol.proj.fromLonLat(c), 
             zoom: 15
         })
      });
  }
  this.popup = new ol.Overlay({
       element: document.getElementById('popup-container'),
       positioning: 'bottom-center',
       offset: [0, -10]
       });
//  popup.setPosition(coordinate);
  this.omap.addOverlay(this.popup);
}

OSM.prototype.init = function()
{
  this.omap.on('singleclick', function(evt) {
    var coordinate = evt.coordinate;
    var c = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
    var lat = Number(c[1]);
    var lon = Number(c[0]);
    report("map click 7 lat = " + lat + ", lng = " + lon);
    Zpoint2 = Zpoint;
    Zpoint = new MAPCLASS.LatLng(lat, lon );
//    report(Zpoint.lat + " " + Zpoint.lng + " " + Zpoint.x + " " + Zpoint.y);
    var fes = map.omap.getFeaturesAtPixel(evt.pixel, 30);
    if (fes) 
    {
//      report("fes.length = " + fes.length + " " + fes[0].get('name') + " " + fes[0].get('sc'));
      if(fes[0].get('name') == "Marker")
      {
        var cc = fes[0].getGeometry().getCoordinates();
        map.popup.getElement().innerHTML = PXT + fes[0].get('sc');
        map.popup.setPosition(cc);
      }
    }
    else
    {
    var ff = getNearestTrain(lat,lon);
    if(ff != null)
    {
      map.popup.getElement().innerHTML = PXT + ff.sc;
      map.popup.setPosition(coordinate);
//        report("got it: " + ff.sc);
    }
    }
    
    nstn = getNearestStation(lat, lon);
//    report("Nearest station = " + nstn);
    var d = "";
    if(gnspt != null)
    {
      d =getDistanceBetween( lat, lon, gnspt.x, gnspt.y);
      d = (Math.round(d * 100)) / 100 + " mi";
    }
    document.getElementById("NSTN").innerHTML = getStopNameFromID(nstn) + " " + d;
    populateNBP(lat, lon);
  });
}

function getNearestTrain(lat, lon)
{
  var t = null;
  var k = map.doj.length;
  var i = 0;
  var d = 100000;
  while(i < k)
  {
    var o = map.doj[i];
    if(o.klass == "Marker")
    {
      var dd = getDistanceBetween( lat, lon, o.position.x, o.position.y);
      if((dd < d) && (o.sc != ""))
      {
        t = o;
        d = dd;
      }
    }
    i += 1;
  }
  if(d > 1) t = null;
  return(t);
}

var NBPoptions = [];

function ObjectPair(a, b)
{
    this.a = a;
    this.b = b;
}

function populateNBP(lat, lon)
{
    var ss = document.getElementById("nbp");
    var i = ss.children.length - 1;
    while( i >= 0)
    {
      ss.remove(i);
      i -= 1;
    } 
    clearArray(NBPoptions);
    var op = document.createElement("option");
    op.text = getStopNameFromID(nstn);
//    NBPoptions[NBPoptions.length] = new ObjectPair(nstn, op.text);
    NBPoptions[NBPoptions.length] = {
        id: nstn,
        name: op.text
        };
    ss.add(op);
    if(document.getElementById("sl").checked)
    {
      var p1 = getStopsByLocation3(lat, lon);
      p1.then(function(t) {
      MapStops = t;
      var k = t.length;
      for(i=0; i<k; i+=1)
      {
//        report("  stop_id = " + t[i].stop_id + " " + t[i].stop_desc);
        var v = t[i].stop_desc;
        if((v == null) || (v == "null"))
        {
          v = t[i].stop_name;   
        }
        if((t[i].stop_id.indexOf("place-") == 0) || (t[i].stop_id.indexOf("-") == -1) || isStateID(t[i].stop_id))
        {
          if(t[i].distance < WALK_LIMIT)
          {
            op = document.createElement("option");   
            var dff = Math.round(t[i].distance * 100) / 100;
            op.text = v + " : " + dff + " mi (" + getWalkTime(dff) + " min)";
 //           NBPoptions[NBPoptions.length] = new ObjectPair(t[i].stop_id, v);
            NBPoptions[NBPoptions.length] = {
                id: t[i].stop_id,
                name: v
                };
            ss.add(op);
          }
        }
      }
            
      } ).catch(function(error) {
            report(error);  
      } );
    }
   
}

OSM.prototype.panTo = function(pt)
{
  var c = [round(pt.y, 4), round(pt.x, 4)];
  this.omap.getView().setCenter(ol.proj.fromLonLat(c));
}

OSM.prototype.LatLng = function(lat, lon )
{
  return(new PointI(lat, lon));
}

OSM.prototype.plotObject = function(pl)
{
  this.doj[this.doj.length] = pl;
}

OSM.prototype.clearAll = function()
{
  var k = this.doj.length;
  var i = k - 1;
  while(i >= 0)
  {
    this.doj[i].setMap(null); 
    i -= 1;
  }
  clearArray(this.doj);
  this.markerSource.clear(true);
}


OSM.prototype.Polyline = function(setup)
{
  this.klass = "Polyline";
  this.map = null;
  this.path = setup.path; //: pts,
  this.coordinates = [];
  this.geodesic = setup.geodesic; //: true,
  this.strokeColor = setup.strokeColor; 
  this.strokeOpacity = setup.strokeOpacity;
  this.strokeWeight = setup.strokeWeight;
  this.setMap = function(m){
      if(m != null)
      {
        this.map = m; 
        m.plotObject(this);
      }  
      else if(this.map != null)
      {
        var i = this.map.doj.length - 1;
        while(i >= 0)
        {
          if(this.map.doj[i] == this)
          {
            this.map.doj.splice(i, 1);
          }
          i -= 1;
        }
        this.map = null;
      }
      };
  this.paint = function() {
      var k = this.path.length;
//      report("Polyline paint " + k);
      var i = 0;
      clearArray(this.coordinates);
      while(i < k)
      {
        var p = this.path[i];
        this.coordinates[this.coordinates.length] = [round(p.y, 4), round(p.x, 4)];
        i += 1;
      }
      var f = new ol.Feature({
              geometry: new ol.geom.LineString(this.coordinates),
              name: 'PolyLine'
              });
      f.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      
      var sd = new ol.style.Style({
              stroke: new ol.style.Stroke({
                     color : this.strokeColor,
                     width: this.strokeWeight
                     })
              });
      f.setStyle(sd);  
      
      this.map.markerSource.addFeature(f);
      };
}


OSM.prototype.Marker = function(setup)
{
  this.klass = "Marker";
  this.setup = setup;
  this.position = setup.position; //:mp,
  this.map = setup.map; //: map,
  this.title = setup.title; //: 'Vehicle',
  this.icon = setup.icon; //: 'images/vehr.png'
  this.loaded = false;
  this.img = null;
  this.width = 0;
  this.height = 0;
  this.sc = null;
  
  this.iconFeature = new ol.Feature({
        geometry: new ol.geom.Point([0, 0]),
        name: "Marker",
        sc: ""
      });

  this.iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: this.icon
        }))
      });
  this.iconFeature.setStyle(this.iconStyle);
  
  this.setPosition = function(ptll)
    {
      var x = null;
      var y = null;
      if(ptll.lat !== undefined) x = ptll.lat;
      else x = ptll.x;
      if(ptll.lon !== undefined) y = ptll.lon;
      else if(ptll.lng !== undefined) y = ptll.lng;
      else y = ptll.y;
      this.position = new PointI(x, y); 
      this.iconFeature.set('sc', this.sc);
    };
  this.setMap = function(m)
    { 
//      report("Marker set map " + this.icon);
      var r = 0;
      if(m != null)
      {
        this.map = m; 
        m.plotObject(this);
      }  
      else if(this.map != null)
      {
        var i = this.map.doj.length - 1;
        while(i >= 0)
        {
          if(this.map.doj[i] == this)
          {
            this.map.doj.splice(i, 1);
            r += 1;
          }
          i -= 1;
        }
        this.map = null;
        if(r > 1) report("Marker.setMap r = " + r);
      }
    }; 
  this.paint = function()
    {
//      report("Marker paint " + this.icon);
      var p = this.position;
      this.coordinate = [round(p.y, 4), round(p.x, 4)];
      this.iconFeature.setGeometry(new ol.geom.Point(this.coordinate));
      this.iconFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      
      this.map.markerSource.addFeature(this.iconFeature);
//      var cc = this.iconFeature.getGeometry().getCoordinates();
//      map.popup.setPosition(cc);
//      map.popup.getElement().innerHTML = PXT + this.iconFeature.sc ;
              
    };
  var _that = this;
//  report(": " + this.icon);
  this.img = getImage(this.icon); // getImage in eo_map
  this.width = this.img.width;
  this.height = this.img.height;
  this.loaded = true;
  this.src = this.icon;
  this.img.src = this.icon;
}

OSM.prototype.repaint = function()
{
  putHere();
  var po = getPositionForId(Place_id);
  putMarkerAt(po.x, po.y);
  this.markerSource.clear(true);
  var k = this.doj.length;
//  report("OSM repaint " + k);
  var i = 0;
  while(i < k)
  {
    var d = this.doj[i];
    if(d.klass == "Polyline")
    {
      d.paint();
    }
    else if(d.klass == "Marker")
    {
      d.paint();
    }
    else report("d.klass = " + d.klass);
    i += 1;
  }
}

OSM.prototype.connectWaypoints = function()
{
  var wps = []
  var k = this.doj.length;
  var i = 0;
  while(i < k)
  {
    var d = this.doj[i];
    if(d.klass == "Marker")
    {
      if(d.title.indexOf("Marker") == 0)
      {
        wps.push(d);
      }
    }
    i += 1;
  }
  var ptx = null;
  var pts = [];
  k = wps.length;
  i = 0;
  while(i < k)
  {
    var pt = wps[i].position;  
    var lat = Number(pt.x);
    var lng = Number(pt.y);
    /*
    if(bEoMap)
    {
          var st = new map.DText(wps[i].title, pt, "10px", "lightblue");
          if(i == 0) ptx = new PointI(pt.lat, pt.lng);
          st.setMap(map);
    }
    */
    pts.push(new MAPCLASS.LatLng(lat, lng ));
    i += 1;
  }
//  if(bEoMap) map.panTo(ptx);
  if(wayroute != null) wayroute.setMap(null);
  wayroute = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
//          strokeColor: '#FFCC00',
          strokeColor: '#FF00FF',
          strokeOpacity: 1.0,
          strokeWeight: 5
          });
  wayroute.setMap(map);
  map.repaint();
}




/*
var scale = 1;
var wx    = 0; // world zoom origin
var wy    = 0;
var sx    = 0; // mouse screen pos
var sy    = 0;

var mouse = {};
mouse.x   = 0; // pixel pos of mouse
mouse.y   = 0;
mouse.rx  = 0; // mouse real (world) pos
mouse.ry  = 0;
mouse.button = 0;

function zoomed(number) { // just scale
  return Math.floor(number * scale);
}
// converts from world coord to screen pixel coord
function zoomedX(number) { // scale & origin X
  return Math.floor((number - wx) * scale + sx);
}
*/

// eo_map.js 

var canvas = null
var ctx = null;
var canvasheight = 300; // orig = 400
var MAXWIDTH = 11000;
var MAXHEIGHT = 8500;
var MAXZOOMFF = 10; // 5
var mousePos = null;

// Logan Airport Terminal A
const bkgd = ["North Station", "Rockport", "Newburyport", "Fitchburg", "Haverhill",
  "Providence-RI", "Framingham", "TF Green Airport-RI", "Kingston", "Needham Center",
  "Stoughton", "Greenbush", "Franklin", "Fairmount", "Middleborough/ Lakeville",
  "Plymouth", "Airport", "Reading", "Salem", "Gloucester",
  "Portland-ME", "Lowell", "Worcester", "Springfield", "Northampton Amtrak", "EssexJct-VT",
  "Brattleboro-VT", "Bellows Falls-VT", "Windsor-VT", "White River Jct-VT","Freeport-ME",
  "Randolph-VT", "Montpelier-VT", "Waterbury-VT","StAlbans-VT","Old Orchard Beach-ME",
  "Brunswick-ME","Durham-UNH-NH", "Exeter-NH",
  "Claremont-NH", "Holyoke", "Pittsfield", "Greenfield", "Albany-Rensselaer-NY",
  "Stamford-CT", "NewRochelle-NY", "Hartford-CT", "New Haven-CT", "New London-CT", "New York-Penn-NY", "Kingston-RI", "Hyannis","Provincetown", "Hudson-NY", "Rhinecliff-NY",
  "Nantucket", "Oak Bluffs", "Truro", "Wellfleet", "Eastham", "Harwich", "Ticonderoga-NY",
  "Montreal-QC", "Plattsburgh-NY", "Port Henry-NY", "Port Kent-NY", "Westport-NY",
  "Poughkeepsie-NY","Rutland-VT","Castleton-VT", "Saratoga Springs-NY", "Schenectady-NY",
  "Halifax-NS", "Yarmouth-Ferry-NS", "Moncton", "Sainte-Foy","Mont-Joli", "Saint-Hyacinthe", "Drummondville", "Montmagny", "La Pocatière", "Rivière-du-Loup", "Trois Pistoles", "Rimouski", "Sayabec", "Amqui", "Causapscal", "Matapédia", "Campbellton", "Charlo", "Jacquet River", "Petit Rocher", "Bathurst", "Miramichi", "Rogersville", "Sackville", "Amherst-NS", "Springhill Jct", "Truro-NS", 
"Danbury-CT", "Waterbury-CT", "Bridgeport-CT", "SouthNorwalk-CT", "New Canaan-CT", "Southeast-NY", "Wassaic-NY", "Yonkers-NY", "Croton-Harmon-NY", "White Plains-NY", "Peekskill-NY", "New Hamburg-NY", "Tarrytown-NY", "Stratford-CT", "Bridgeport-CT","Naugatuck-CT", "Beacon Falls-CT", "Seymour-CT", "Ansonia-CT", "Derby-CT", "New Hamburg-NY", "Beacon-NY", "Cold Spring-NY", "Garrison-NY", "Peekskill-NY", "Cortlandt-NY", "Dobbs Ferry-NY", "Greystone-NY",
  "Newark Penn Station -NJ","Newark Airport Railroad Station -NJ","Trenton Transit Center -NJ", "Hoboken -NJ","Princeton Jct. -NJ","Secaucus (Upper Level) -NJ","Atlantic City -NJ","Jamaica-NY","Port Jefferson-NY","Greenport-NY","Montauk-NY","Far Rockaway-NY","Babylon-NY","Mount Olive -NJ","Spring Valley -NY","Woodside-NY",
  "Philadelphia-PA","Wilmington-DE","Newark-DE","Baltimore-MD","BWI_Marshall_Airport-MD", "Washington, DC",
  "Chicago-IL Union Station","Alexandria Amtrak Station","Fort Worth-TX Amtrak Station","Miami-FL Amtrak Station","Milwaukee-WI Intermodal Station","Oakland-CA Jack London Square Station","Orlando-FL Amtrak Station","Oceanside-CA Amtrak Station","San Francisco-CA Salesforce Plaza (AMTRAK Shuttle)","Seattle King Street Station-WA","San Diego-CA Santa Fe Depot","Los Angeles-CA Union Station","Jacksonville-FL Amtrak Station","New Orleans-LA Union Passenger Terminal","Vancouver-BC","Toronto","Winnipeg","Saskatoon","Edmonton"
  ];
  
function measure()
{
  var d = getDistanceBetween(Zpoint2.lat, Zpoint2.lon, Zpoint.lat, Zpoint.lon);
  var f = 5280 * d;
  var m = .30479 * f;
  closeOptionPopup();
  report("measured distance = " + d + " miles (" + f + " feet) (" + m + " meters)");
  alert("Measured distance = \n" + d + " miles (" + f + " feet) (" + m + " meters)");
}
  
function PointL(lat, lon)
{
  this.lat = lat;
  this.lon = lon;
}

function EoMap(divelement)
{ 
//  this.zoom = .015625;
  this.zoom = .25;
  this.zoomcode = 14;
  this.tiles = [];
  this.doj = [];
  this.doors = [];
  this.nodes = [];
  this.SFlat = 0;
  this.SFlon = 0;
  this.x0 = 0;
  this.y0 = 0;
  this.mdpt = null;
  this.mupt = null;
  this.posCenter = getPositionForName(Place);
  this.posWidthLon = 0.0194; //.01826;
  this.posHeightLat = 0.0145; //.005803;
  divelement.innerHTML = "<canvas id=\"eomap\" width=\"" + MAXWIDTH/MAXZOOMFF + "\" height=\"" +  MAXHEIGHT/MAXZOOMFF + "\" style=\"background-color: white\" ></canvas>";
  this.latmin = 0;
  this.latmax = 0;
  this.lonmax = 0;
  this.lonmin = 0;
  this.dragging = false;
}

EoMap.prototype.init = function()
{
this.dragging = false;
this.zoom = .25;
this.zoomcode = 14;
this.posCenter = getPositionForName(Place);
var g = document.getElementById("GMap");
var c = g.firstChild;
canvas =document.getElementById("eomap");
if(ctx == null) ctx = canvas.getContext("2d");
report(Place + " " + map.posCenter.x + " " + map.posCenter.y);
var gmap = document.getElementById("GMap");
report("GMap width = " + gmap.clientWidth + " height = " + gmap.clientHeight);
//this.dlat = 256 / .01623444361714;
//this.dlon = 256 / .02197265625;
this.SFlat = this.getSFlat(map.posCenter.x);
this.SFlon = this.getSFlon(map.posCenter.y);
this.getTileset(this.zoomcode, this.posCenter.x, this.posCenter.y);

canvas.addEventListener('click', function(evt) {
  evt.preventDefault();
  mousePos = getMousePos(canvas, evt);
  var pt1 = mousePos;
//  report("mouseClick " + pt1.x + " " + pt1.y);
  if(isNaN(pt1.x) || isNaN(pt1.y)) report("NaN 1 " + pt1.x + " " + pt1.y);
  else
  {
    var pt = map.getLatLonPoint(pt1);
    if(isNaN(pt.lat) || isNaN(pt.lon)) report("NaN 2 " + pt.lat + " " + pt.lon);
    else 
    {
       var ll = pt;
       Zpoint2 = Zpoint;
       Zpoint = pt;
//      pt = map.getMousePoint(pt.lat, pt.lon);
       var filename = map.getTileFilename(map.zoomcode, ll.lat, ll.lon);
       LLFilename = filename;
       report("map click lat = " + ll.lat + ", lng = " + ll.lon + " " + filename );
       if(bTiles) map.getTileset(map.zoomcode, ll.lat, ll.lon);
       nstn = getNearestStation(ll.lat, ll.lon);
       report("Nearest station = " + nstn);
       var d = "";
       if(gnspt != null)
       {
         d =getDistanceBetween( ll.lat, ll.lon, gnspt.x, gnspt.y);
         d = (Math.round(d * 100)) / 100 + " mi";
       }
       document.getElementById("NSTN").innerHTML = getStopNameFromID(nstn) + " " + d;
       populateNBP(ll.lat, ll.lon);
    }
  }
  mouseClicked(evt);
  }, false);
canvas.addEventListener('mousedown', function(evt) {
  evt.preventDefault();
  this.dragging = true;
  mousePos = getMousePos(canvas, evt);
  var pt = mousePos;
  if(isNaN(pt.x) || isNaN(pt.y)) report("NaN md3 " + pt.x + " " + pt.y);
  map.mdpt = pt;
  }, false);
canvas.addEventListener('mouseup', function(evt) {
  evt.preventDefault();
  this.dragging = false;
  mousePos = getMousePos(canvas, evt);
  var pt = mousePos;
  if(isNaN(pt.x) || isNaN(pt.y)) report("NaN mu4 " + pt.x + " " + pt.y);
  else(!isNaN(pt.x) && !isNaN(pt.y) && !isNaN(map.mdpt.x) && !isNaN(map.mdpt.y))
  {
      map.mupt = pt;
      var deltax = Number(map.mupt.x) - Number(map.mdpt.x); 
      var deltay = Number(map.mupt.y) - Number(map.mdpt.y);
      var p = Math.pow(2, 14 - map.zoomcode);
      p = 1; // + 14 - map.zoomcode;
      if(Math.abs(deltax) > 5)
      {
        map.posCenter.y = Number(map.posCenter.y) - (deltax / Number(map.SFlon) * p);  
        document.getElementById("trktp").checked = false;
      }
      if(Math.abs(deltay) > 5)
      {
        map.posCenter.x = Number(map.posCenter.x) + (deltay / Number(map.SFlat) * p);   
        document.getElementById("trktp").checked = false;
      }
      var ll = map.getLatLonPoint(map.posCenter);
      if(bTiles) map.getTileset(map.zoomcode, ll.lat, ll.lon);
      requestAnimationFrame(repaint);
  }
  }, false);
 canvas.addEventListener('mousemove', function(evt) {
  evt.preventDefault();
  mousePos = getMousePos(canvas, evt);
  var pt = mousePos;
  }, false);

 
 
  canvas.addEventListener("touchstart", function (evt) {
        evt.preventDefault();
        map.dragging = true;
        var touches = evt.changedTouches;
        var touch = touches[0];
        var rect = canvas.getBoundingClientRect();
        map.ptdwn = new PointI(touch.clientX - rect.left, touch.clientY - rect.top);
        mousePos = map.ptdwn;
        /*
        var ll = map.getLatLonPoint(map.ptdwn);
        report("map click lat = " + ll.lat + ", lng = " + ll.lon );
        nstn = getNearestStation(ll.lat, ll.lon);
        report("Nearest station = " + nstn);
        var d = "";
        if(gnspt != null)
        {
          d =getDistanceBetween( ll.lat, ll.lon, gnspt.x, gnspt.y);
          d = (Math.round(d * 100)) / 100 + " mi";
        }
        document.getElementById("NSTN").innerHTML = getStopNameFromID(nstn) + " " + d;
        populateNBP(ll.lat, ll.lon); 
        */
 //       mouseClicked(touch);
 //       report("got here 590 " + touch.clientX + " " + touch.clientY);
        
  }, false);
  canvas.addEventListener("touchend", function (evt) {
        evt.preventDefault();
        map.dragging = false;
        var touches = evt.changedTouches;
        var touch = touches[touches.length - 1];
        var rect = canvas.getBoundingClientRect();
        map.ptup = new PointI(touch.clientX - rect.left, touch.clientY - rect.top);
        mousePos = map.ptup;
        var dx = map.ptdwn.x - map.ptup.x;
        var dy = map.ptdwn.y - map.ptup.y;
//        report("te " + map.ptdwn.x + ", " + map.ptdwn.y + " : " + map.ptup.x + ", " + map.ptup.y);
//        report("dx = " + dx + ", dy = " + dy);
        
        if(map.ptdwn != null)
        {
          var deltax = Number(map.ptup.x) - Number(map.ptdwn.x); 
          var deltay = Number(map.ptup.y) - Number(map.ptdwn.y);
          var p = Math.pow(2, 14 - map.zoomcode);
          p = 1;
          if(Math.abs(deltax) > 5)
          {
            map.posCenter.y = Number(map.posCenter.y) - (deltax / Number(map.SFlon) * p);   
            document.getElementById("trktp").checked = false;
          }
          if(Math.abs(deltay) > 5)
          {
            map.posCenter.x = Number(map.posCenter.x) + (deltay / Number(map.SFlat) * p);   
            document.getElementById("trktp").checked = false;
          }
          var ll = map.getLatLonPoint(map.ptdwn);
//          report("map click lat = " + ll.lat + ", lng = " + ll.lon );
          nstn = getNearestStation(ll.lat, ll.lon);
//          report("Nearest station = " + nstn);
          var d = "";
          if(gnspt != null)
          {
           d =getDistanceBetween( ll.lat, ll.lon, gnspt.x, gnspt.y);
           d = (Math.round(d * 100)) / 100 + " mi";
          }
          Zpoint2 = Zpoint;
          Zpoint = ll;
          document.getElementById("NSTN").innerHTML = getStopNameFromID(nstn) + " " + d;
          populateNBP(ll.lat, ll.lon); 
          ll = map.getLatLonPoint(map.posCenter);
//         report("center lat = " + ll.lat + ", lng = " + ll.lon  + " " + map.posCenter.x + " " + map.posCenter.y);
          if(bTiles) map.getTileset(map.zoomcode, ll.lat, ll.lon);
 //         mouseClicked(touch);
          setTimeout(mouseClicked2, 1000);
        }
        
        requestAnimationFrame(repaint);
  }, false);
  canvas.addEventListener("touchmove", function (e) {
        e.preventDefault();
  }, false);


 
  
  
var scaleFactor = backingScale(ctx);
if (scaleFactor > 1) 
{
  canvas.width = canvas.width * scaleFactor;
  canvas.height = canvas.height * scaleFactor;
  ctx = canvas.getContext("2d");
}

//this.drawString(ctx,"eightolives", 60, 100, "30px", "30px");
//this.drawString(ctx,"Trains", 60, 130, "30px", "30px");
this.SFlat = this.getSFlat(map.posCenter.x);
this.SFlon = this.getSFlon(map.posCenter.y);
this.addBackground();
}

EoMap.prototype.getSFlon = function(lon)
{
  var tilenw =  long2tile(lon, this.zoomcode);
  var lonnw = tile2long(tilenw,this.zoomcode);
  var lonne = tile2long(tilenw + 1,this.zoomcode);
  return(256 / Math.abs(lonnw - lonne));
}

EoMap.prototype.getSFlat = function(lat)
{
  var tilenw =  lat2tile(lat, this.zoomcode);
  var latnw = tile2lat(tilenw, this.zoomcode);
  var latsw = tile2lat(tilenw + 1, this.zoomcode);
  return(256 / Math.abs(latnw - latsw));
}

EoMap.prototype.getMousePoint = function(lat, lon)
{
  var cpt = this.posCenter;
  var SFlat = this.getSFlat(lat);
  var SFlon = this.getSFlon(lon);
  var mx = (lon - cpt.y) * SFlon + CPXLON; 
  var my = (cpt.x - lat) * SFlat + CPXLAT; 
  var mpt = new PointI(mx, my);
//  var mn = this.getMousePointnew(lat, lon);
//  report(":: " + mpt.x + " " + mpt.y + ", " + mn.x + " " + mn.y);
  return(mpt);
}

//TODO
EoMap.prototype.getMousePointnew = function(lat, lon)
{
  var cpt = this.posCenter;  
  var tilenw =  lat2tile(lat, this.zoomcode);
  var tilec = lat2tile(cpt.y, this.zoomcode);
  var latc = tile2lat(tilec, this.zoomcode);
  var latnw = tile2lat(tilenw, this.zoomcode);
  
  var m = tilenw - tilec;
  var SFlat = this.getSFlat(lat);
  var my = 0;
  
  if(m == 0) // on same tile
  {
    my = (cpt.x - lat) * SFlat + CPXLAT; 
  }
  else if(tilenw < tilec)
  {
    var SFc = this.getSFlat(cpt.x);
    var y1 = (latc - cpt.x) * SFc;
    var y2 = 256 - (latnw - lat) * SFlat;
    m -=1;
    my = CPXLAT - y1 - y2 - m * 256;
  }
  else if(tilenw > tilenwc)
  {
    var SFc = this.getSFlat(cpt.x);
    var y1 = (latc - cpt.x) * SFc;
    var y2 = (latnw - lat) * SFlat;
    m -=1;
    my = 256 - y1 + y2 + m * 256;
  }
  var SFlon = this.getSFlon(lon);
  var mx = (lon - cpt.y) * SFlon + CPXLON; 
  var mpt = new PointI(mx, my);
  return(mpt);
}


EoMap.prototype.getLatLonPoint = function(mousePoint)
{
  var cpt = this.posCenter;
  var SFlat = this.getSFlat(cpt.x);
  var SFlon = this.getSFlon(cpt.y);
  var lat = Number(cpt.x) - (mousePoint.y - CPXLAT) / SFlat; 
  var lon = Number(cpt.y) + (mousePoint.x - CPXLON) / SFlon;
  var lpt = new PointL(lat, lon);
  return(lpt);
}

EoMap.prototype.LatLng = function(lat, lon )
{
  return(new PointL(lat, lon));
}

EoMap.prototype.setZoomcode = function(n)
{
  if((n >= 5) && (n <= 18))
  {
    var cpt = this.posCenter;
    this.zoomcode = n;  // 14
    this.zoom = 1 / Math.pow(2, n - 12);  // .25
    this.SFlat = this.getSFlat(cpt.x);
    this.SFlon = this.getSFlon(cpt.y);
    map.SFlat = this.SFlat;
    map.SFlon = this.SFlon;
    var ll = map.getLatLonPoint(map.posCenter);
    if(bTiles) map.getTileset(map.zoomcode, ll.lat, ll.lon);
  }
}

EoMap.prototype.panTo = function(pt)
{
  if(typeof pt !== 'undefined')
  {
  var p = pt;
  if(typeof pt.x === 'undefined') 
  {
      p = new PointI(pt.lat, 0);
      if(pt.lng === undefined) p.y = pt.lon;
      else p.y = pt.lng;
  }
  this.posCenter = p;
  if(bTiles) 
  {
    var ll = map.getLatLonPoint(p);
    map.getTileset(map.zoomcode, ll.lat, ll.lon);
  }
  requestAnimationFrame(repaint);
  }
}

EoMap.prototype.Polyline = function(setup)
{
  this.klass = "Polyline";
  this.map = null;
  this.path = setup.path; //: pts,
  this.geodesic = setup.geodesic; //: true,
  this.strokeColor = setup.strokeColor; //: '#FFCC00',
  this.strokeOpacity = setup.strokeOpacity;
  this.strokeWeight = setup.strokeWeight;
  this.setMap = function(m){
      if(m != null)
      {
        this.map = m; 
        m.plotObject(this);
      }  
      else if(this.map != null)
      {
        var i = this.map.doj.length - 1;
        while(i >= 0)
        {
          if(this.map.doj[i] == this)
          {
            this.map.doj.splice(i, 1);
          }
          i -= 1;
        }
        this.map = null;
      }
      };
}

var mlimit = 0;

EoMap.prototype.Marker = function(setup)
{
  this.klass = "Marker";
  this.setup = setup;
  this.position = setup.position; //:mp,
  this.map = setup.map; //: map,
  this.title = setup.title; //: 'Vehicle',
  this.icon = setup.icon; //: 'images/vehr.png'
  this.loaded = false;
  this.img = null;
  this.width = 0;
  this.height = 0;
  this.setPosition = function(ptll)
    {
      var x = null;
      var y = null;
      if(ptll.lat !== undefined) x = ptll.lat;
      else x = ptll.x;
      if(ptll.lon !== undefined) y = ptll.lon;
      else if(ptll.lng !== undefined) y = ptll.lng;
      else y = ptll.y;
      this.position = new PointI(x, y); 
    };
  this.inRange = function()
    {
      var b = false;
      var pt = map.getMousePoint(this.position.x, this.position.y);
//      report("pt = " + pt.x + " " + pt.y + " " + mousePos.x + " " + mousePos.y);
      if((mousePos.x > (pt.x-10)) && (mousePos.x < pt.x -10 + this.width) && (mousePos.y > pt.y - 10) && (mousePos.y < pt.y -10 + this.height))
      {
        b = true;
      }
      return(b);
    }
  this.setMap = function(m)
    { 
      var r = 0;
      if(m != null)
      {
        this.map = m; 
//        m.plotObject(this);
        map.plotObject(this);
      }  
      else if(this.map != null)
      {
        var i = this.map.doj.length - 1;
        while(i >= 0)
        {
          if(this.map.doj[i] == this)
          {
            this.map.doj.splice(i, 1);
            r += 1;
          }
          i -= 1;
        }
        this.map = null;
        if(r > 1) report("Marker.setMap r = " + r);
      }
    };
  var _that = this;
  this.img = getImage(this.icon);
  this.width = this.img.width;
  this.height = this.img.height;
  this.loaded = true;
  this.src = this.icon;
//  this.img.src = this.icon;
}

function getImage(url)
{
 var i = null;
 if(url.indexOf("you1.png") != -1) i = Img0;
 else if(url.indexOf("vehr.png") != -1) i = Imgr;
 else if(url.indexOf("veh.png") != -1) i = Imgg;
 else if(url.indexOf("vehp.png") != -1) i = Imgp;
 else if(url.indexOf("markerr.png") != -1) i = Imgm;
 else if(url.indexOf("markery.png") != -1) i = Imgn;
 else if(url.indexOf("markerb.png") != -1) i = Imgo;
 else if(url.indexOf("markerg.png") != -1) i = Imgz;
 else if(url.indexOf("doorb.png") != -1) i = Imga1;
 else if(url.indexOf("nodeb.png") != -1) i = Imga2;
 else if(url.indexOf("wp.png") != -1) i = Imga3;
 if(i == null) report("getImage is null for " + url);
 return(i);
}

EoMap.prototype.plotObject = function(pl)
{
  this.doj[this.doj.length] = pl;
}

EoMap.prototype.clearAll = function()
{
  clearArray(this.doj);
  clearPathArrays();
  this.addBackground();
  repaint();
}

EoMap.prototype.addBackground = function()
{
  var bgstops = [bkgd];
  for(j = 0; j < bgstops.length; j++)
  {
    var a = bgstops[j];
    var k = a.length;
    var i = 0;
    if(a == bkgd)
    {
      while(i < k)
      {
        var pt = getPositionForName(a[i]);
        if(pt == null) report("1023map no position for " + a[i]);
        else
        {
          var st = new map.DText(bkgd[i], pt, "10px", eomapcolor);
          st.setMap(map);
        }
        i += 1;
      }
    }
    else
    {
      while(i < k)
      {
        var pt = new PointI(a[i+4], a[i+5]);
        var st = new map.DText(a[i+1], pt, "10px", eomapcolor);
        st.setMap(map);
        i += 12;
      }        
    }
  }
  putHere();
  var po = getPositionForId(Place_id);
  putMarkerAt(po.x, po.y);
  plotBorders();
}

EoMap.prototype.DText = function(s, pt, size, color)
{
  this.klass = "DText";
  this.s = s;
  this.pt = pt;
  this.size = size;
  this.color = color;
  this.setMap = function(m)
    { 
      if(m != null)
      {
        this.map = m; 
        m.plotObject(this);
      }  
      else if(this.map != null)
      {
        var i = this.map.doj.length - 1;
        while(i >= 0)
        {
          if(this.map.doj[i] == this)
          {
            this.map.doj.splice(i, 1);
          }
          i -= 1;
        }
        this.map = null;
//        repaint();
      }
        
    };
}

EoMap.prototype.drawString = function(ctx, s, x, y, height, size)
{
  ctx.strokeStyle = "#ffff00";
  ctx.moveTo(x, y); 
  ctx.fillStyle = "red";
  ctx.textAlign = "left";
  ctx.font = size + " sans-serif"; //TODO
  ctx.fillText(s, x, y, 500);  //TODO
}

function long2tile(lon,zoom) 
{ 
    return (Math.floor((lon+180)/360*Math.pow(2,zoom))); 
}

function lat2tile(lat,zoom)  
{ 
    var m = Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 * Math.pow(2,zoom)); 
    return(m);
}

function tile2long(x,z) 
{
  return (x/Math.pow(2,z)*360-180);
}

function tile2lat(y,z) 
{
  var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  var m = (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
  return(m);
}

function EoMapTile()
{
  this.klass = "Tile";
  this.zoomcode = 0;
  this.tilelat = 0;
  this.tilelon = 0;
  this.latc = 0;
  this.lonc = 0;
  this.filename = "";
  this.img = null;
}

EoMapTile.prototype.init = function(zoomcode, tilelat, tilelon, latc, lonc, filename)
{
  this.zoomcode = zoomcode;
  this.tilelat = tilelat;
  this.tilelon = tilelon;
  this.latc = latc;
  this.lonc = lonc;
  this.filename = filename;
//  report(": " + filename + " " + tilelat + " " + tilelon + " " + latc + " " + lonc);
}

function isValidTile(zoomcode, filename)
{
  return((zoomcode == 14) || ((zoomcode >= 5) && (zoomcode <= 17  )));
}

EoMap.prototype.getTileFilename = function(zoomcode, lat, lon)
{
   var tilelat = lat2tile(Number(lat),zoomcode);
   var tilelon = long2tile(Number(lon),zoomcode);
   var filename = zoomcode + "/" + tilelon + "/" + tilelat + ".png"; 
   return(filename);
}

EoMap.prototype.getTile = function(zoomcode, lat, lon)
{
   var tilelat = lat2tile(Number(lat),zoomcode);
   var tilelon = long2tile(Number(lon),zoomcode);
   var filename = zoomcode + "/" + tilelon + "/" + tilelat + ".png"; 
//   report("getTile " + zoomcode + " " + lon + " " + lat);
//   report("getTile " + filename);
   this.getTileFromCache(filename).then(function(t) {
     if((t == null) && isValidTile(zoomcode, filename))
     {
       var img = new Image();
//     report( "try getting " + eo_base + "../forms/map/" + filename);
//     img.src = eo_base + "../forms/map/" + filename;
       img.src = eo_base + "Trains/map/" + filename;
       img.onload = function(){
         var tile = new EoMapTile();
         var latc = tile2lat(tilelat,zoomcode);
         var lonc = tile2long(tilelon,zoomcode);
         tile.init(zoomcode, tilelat, tilelon, latc, lonc, filename);
         tile.img = this;
         map.tiles.push(tile);
         repaint();
 //        report("getTile got " + filename);
       };
     }
   }).catch(function() {});
}

EoMap.prototype.getTileFromCache = function(s)
{
  var p = new Promise(function(resolve, reject) {
    var b = true;
    var x = null;
    var k = this.tiles.length;
    var i = 0;
    while(b && (i < k))
    {
      if(s == this.tiles[i].filename) 
      {
        x = this.tiles[i];
        b = false;
      }
      i += 1;
    }
    if(x == null) 
    {
      checkMapCache(s).then(function(r) {
        if((typeof r === 'undefined') || (r == null)) reject();
        else resolve(r.blob());
        }).catch(function() { reject();});
    }
    else resolve(x);
  });
  return(p);
}

EoMap.prototype.getTileset = function(zoomcode, lat, lon)
{
   var gmap = document.getElementById("GMap");
   var width = gmap.clientWidth;
   var height = gmap.clientHeight;
   var xmax = Math.floor(width / 256) + 1;
   var ymax = Math.floor(height / 256) + 1;
   var p = Math.pow(2, zoomcode - 14);
   p = 1;
   var i = 0;
   var j = 0;
//   report("getTileset " + xmax + " " + ymax);
   for(i = -1; i < xmax; i++)
   {
     var xlon = Number(lon) + (-128 + i * 256) / this.SFlon / p;
     for(j = -1; j < ymax; j++)
     {
        var ylat = Number(lat) + (-128 + j * 256) / this.SFlat / p;
        this.getTile(zoomcode, ylat, xlon)
     }
   }
}


EoMap.prototype.reportTiles = function()
{
  CloseMenu();
  var k = map.tiles.length;
  var i = 0;
  clearReport();
  while(i < k)
  {
    var x = map.tiles[i];
    report(x.filename + " " + x.latc + " " + x.lonc);
    i += 1;
  }
}

EoMap.prototype.paint = function(ctx)
{
  clearCanvas();
  var mcount = 0;
  var k = this.tiles.length;
  var i = 0;
  if(bTiles)
  {
    while(i < k)
    {
      var d = this.tiles[i];
      if((d.klass == "Tile") && (d.filename.indexOf(map.zoomcode + "/") == 0))
      {
        ctx.save();
        var pt = this.getMousePoint(d.latc, d.lonc);
        pt.x = Math.round(pt.x);
        pt.y = Math.round(pt.y);
//        report("paint " + pt.x + " " + pt.y);
        ctx.drawImage(d.img, pt.x, pt.y);
        ctx.restore();         
      }
      i += 1;
    }
  }
//  report("bDSS " + bDSS + " " + this.zoom);
  if(bDSS && (this.zoom >= .125))
  {
    var a = stops_MBTA_SUB;
    var k = a.length;
    var i = 0;
    ctx.save();
    ctx.strokeStyle = "#ffff00";
    ctx.fillStyle = eosubcolor;
    ctx.textAlign = "left";
    ctx.font = "10px sans-serif"; 
    while(i < k)
    {
      var p = this.getMousePoint(a[4+i] , a[5+i]);
      ctx.moveTo(p.x, p.y); 
      ctx.fillText(a[1+i], p.x, p.y, 500);  
      i += 12;
    }
    ctx.restore();  
  }
  k = this.doj.length;
  i = 0;
  while(i < k)
  {
    var d = this.doj[i];
    if(d.klass == "Polyline")
    {
      var kk = d.path.length;
      if(kk > 1)
      {
        var ii = 1;
        while(ii < kk)
        {
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = d.strokeColor;
          ctx.lineWidth = d.strokeWeight;
          var p1 = this.getMousePoint(d.path[ii - 1].lat, d.path[ii - 1].lon);
          var p2 = this.getMousePoint(d.path[ii].lat, d.path[ii].lon);
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
          ii += 1;
        }
      }
    }
    else if(d.klass == "Marker")
    {
      if(((d.title != "Stop") && (d.title != "Door")) || (this.zoomcode >= 14))
      {
      ctx.save();
      var pt = this.getMousePoint(d.position.x , d.position.y);
//      if(d.height == 39) 
      ctx.drawImage(d.img, pt.x -10 , pt.y - 10, d.width , d.height );
//      else 
//          ctx.drawImage(d.img, pt.x , pt.y, d.width , d.height );
      ctx.restore();  
      mcount += 1;
      }
    }
    else if((d.klass == "DText") && bDS)
    {
      ctx.save();
      ctx.strokeStyle = "#ffff00";
      ctx.fillStyle = eomapcolor; //d.color;
      ctx.textAlign = "left";
      ctx.font = d.size + " sans-serif"; 
      var p = this.getMousePoint(d.pt.x , d.pt.y);
      ctx.moveTo(p.x, p.y); 
      ctx.fillText(d.s, p.x, p.y, 500);  
      ctx.restore();  
      
    }
    i += 1;
  }
  if(this.zoomcode >= 17)
  {
    var g = map.doors;
    k = g.length;
//    report("map doors " + k);
    if(k > 0)
    {
      i = 0;
      ctx.save();
      while(i < k)
      {
        var d = g[i];
        if(d.klass == "Marker")
        {
//          ctx.save();
          var pt = this.getMousePoint(d.position.x , d.position.y);
          ctx.drawImage(d.img, pt.x -18 , pt.y - 34, d.width , d.height );
//          ctx.restore();  
        }
        i += 1;
      }
      ctx.restore();
    }
  }
}

EoMap.prototype.connectWaypoints = function()
{
  var wps = []
  var k = this.doj.length;
  var i = 0;
  while(i < k)
  {
    var d = this.doj[i];
    if(d.klass == "Marker")
    {
      if(d.title.indexOf("Marker") == 0)
      {
        wps.push(d);
      }
    }
    i += 1;
  }
  var ptx = null;
  var pts = [];
  k = wps.length;
  i = 0;
  while(i < k)
  {
    var pt = wps[i].position; 
    var lat = Number(pt.x);
    var lng = Number(pt.y);
    if(bEoMap)
    {
          var st = new map.DText(wps[i].title, pt, "10px", "lightblue");
          if(i == 0) ptx = new PointI(lat, lng);
          st.setMap(map);
    }
    pts.push(new MAPCLASS.LatLng(lat, lng ));
    i += 1;
  }
  if(bEoMap) map.panTo(ptx);
  if(wayroute != null) wayroute.setMap(null);
  wayroute = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
//          strokeColor: '#FF0000',
          strokeColor: '#FF00FF',
          strokeOpacity: 1.0,
          strokeWeight: 5
          });
  wayroute.setMap(map);
  repaint();
}

function backingScale(context) 
{
  if ('devicePixelRatio' in window) {
    if (window.devicePixelRatio > 1) {
  return window.devicePixelRatio;
  }
  }
return 1;
}

function getMousePos(canvas, evt) 
{
var rect = canvas.getBoundingClientRect();
return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function clearCanvas()
{
  ctx.clearRect(0,0, MAXWIDTH, MAXHEIGHT);
}

function repaint()
{
  map.paint(ctx);
}

// Line2D

function Line2D(x1, y1, x2, y2)
{
 this.klass = "Line2D";
 this.x1 = x1;
 this.y1 = y1;
 this.x2 = x2,
 this.y2 = y2;
 this.lineWidth = 1;
}

Line2D.prototype.setLine = function(x1, y1, x2, y2)
{
 this.x1 = x1;
 this.y1 = y1;
 this.x2 = x2,
 this.y2 = y2;
 return(this);
}

Line2D.prototype.getX = function()
{
  return(this.x1);
}

Line2D.prototype.getY = function()
{
  return(this.y1);
}

Line2D.prototype.setX2 = function(x)
{
  this.x2 = x;
}

Line2D.prototype.setY2 = function(y)
{
  this.y2 = y;
}

Line2D.prototype.paint = function(ctx, color, z)
{
    z = getInverseZoom();
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.x1 / z, this.y1 / z);
    ctx.lineTo(this.x2 / z, this.y2 / z);
    ctx.closePath();
//    ctx.lineWidth = this.linewidth;
    ctx.stroke();
    ctx.restore();
}


// Rectangle2D
function Rectangle2D()
{
  this.klass = "Rectangle2D";
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.filltype = 0;
}

Rectangle2D.prototype.outcode = function(x, y)
{
 var z = -1;
 if((x >= this.x) && (x <= this.x + this.width)) 
 {
   if((y >= this.y - this.height) && (y <= this.y ))
   {
     z = 0;
   }
 }
 return(z);
}

Rectangle2D.prototype.setRect = function(x, y, width, height)
{
 this.x = x;
 this.y = y;
 this.width = width;
 this.height = height;
 return(this);
}

Rectangle2D.prototype.paint = function(ctx, color, z)
{
    z = de.getInverseZoom();
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
//    alert(this.x / z + " " + (this.y - this.height) / z + " " + this.width / z + " " + this.height / z);
    ctx.rect(this.x / z, (this.y - this.height) / z, this.width / z, this.height / z);
    ctx.closePath();
    if(this.filltype == 1)
    {
      ctx.fillStyle = color;
      ctx.fill();
    }
    else ctx.stroke();
    ctx.restore();
}

// Arc2D
function Arc2D()
{
  this.klass = "Arc2D";
  this.x = 0;
  this.y = 0;
  this.radius = 0;
  this.startangle = 0;
  this.endangle = 2 *Math.PI;
  this.filltype = 0;
}

Arc2D.prototype.makeArc = function(x, y, radius, startangle, endangle)
{
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startangle = startangle;
  this.endangle = endangle;
}

Arc2D.prototype.outcode = function(x, y)
{
 var z = -1;
 if((x >= this.x - this.radius) && (x <= this.x + this.radius)) 
 {
   if((y >= this.y - this.radius) && (y <= this.y + this.radius))
   {
     z = 0;
   }
 }
 return(z);
}

Arc2D.prototype.paint = function(ctx, color, z)
{
    z = de.getInverseZoom();
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    var a = 2 * Math.PI -this.startangle;
//    if(this.startangle == 0) a = 0;
    var b = 2* Math.PI -this.endangle;
//    if(this.endangle == 0) b = 0
    ctx.arc(this.x / z, this.y / z, this.radius / z, a, b, true);
//    ctx.closePath();
    if(this.filltype == 1)
    {
      ctx.fillStyle = color;
      ctx.fill();
    }
    else ctx.stroke();
    ctx.restore();
}



function mouseClicked(evt)
{
  var d = map.doj;
  var k = d.length;
  var i = 0;
  while(i < k)
  {
    if(d[i].klass == "Marker")
    {
//      report("d[i].sc = " + d[i].sc);
//        report("got here 704 " + evt.clientX + " " + evt.clientY);
      if(d[i].inRange() && (d[i].sc !== undefined))
      {
//        report("got here 704 " + evt.clientX + " " + evt.clientY);
        showAlertWindow(evt.clientX, evt.clientY, d[i].sc); 
      }
    }
    i += 1;
  }
}

function mouseClicked2()
{
  var d = map.doj;
  var k = d.length;
  var i = 0;
  while(i < k)
  {
    if(d[i].klass == "Marker")
    {
      if(d[i].inRange() && (d[i].sc !== undefined))
      {
         showAlertWindow(map.ptdwn.x, map.ptdwn.y, d[i].sc); 
      }
    }
    i += 1;
  }
   
}


function mapWaypoints()
{
  var k = SavedPositions.length;
  var i = 0;
  var pts = [];
  var pt = null;
  for(i = 0; i < k; i++)
  {
    var w = SavedPositions[i];
    pts.push(new MAPCLASS.LatLng(w.lat, w.lon ));
  }
  map.panTo(pts[0]);
  var route = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#FF00FF', // was ffcc00
          strokeOpacity: 1.0,
          strokeWeight: 5
          });
  route.setMap(map);
  if(bOSM) map.repaint();
  closePlotPopup();
}  


function mapGPX(xmlDoc)
{
  console.log(xmlDoc);
  var wpts = xmlDoc.getElementsByTagName("wpt");
  var i = 0;
  var k = wpts.length;
  for(i = 0; i< k; i++)
  {
    var name = wpts[i].getElementsByTagName("name")[0].textContent.toString();
    var ele = wpts[i].getElementsByTagName("ele")[0].textContent.toString();
    var pt = new PointI(wpts[i].getAttribute("lat"),wpts[i].getAttribute("lon") );
    if(bEoMap)
    {
      var st = new map.DText(name, pt, "10px", eomapcolor);
      st.setMap(map);
    }
  }
  var pts = [];
  var pt = null;
  var tracks = xmlDoc.getElementsByTagName("trk");
  var i1 = 0;
  var k1 = tracks.length;
  for(i1 = 0; i1 < k1; i1++)
  {
    var trackseg = tracks[i1].getElementsByTagName("trkseg");
    var i2 = 0;
    var k2 = trackseg.length;
    for(i2 = 0; i2 < k2; i2++)
    {
      var trkpts = trackseg[i2].children;
      var i3 = 0;
      var k3 = trkpts.length;
      for(i3 = 0; i3 < k3; i3++)
      {
        pts.push(new MAPCLASS.LatLng(trkpts[i3].getAttribute("lat"), trkpts[i3].getAttribute("lon") ));
      }
    }
  }
  map.panTo(pts[0]);
  var route = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#FF9900', // was ffcc00
          strokeOpacity: 1.0,
          strokeWeight: 5
          });
  route.setMap(map);
  if(bOSM) map.repaint();
}

function saveWaypoints()
{
  closePlotPopup();
  var s = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>\n';
  s += '<gpx version="1.1"\ncreator="eightolives Trains">\n';
  /*
  s += '<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="Trains" version="1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">';
  */
  var name = prompt("Enter a name for the waypoints:", "");
  if(name != "")
  {
    s += '<trk>\n<name>' + name + '</name>\n<trkseg>\n';
  }
  else
  {
    s += '<trk>\n<trkseg>\n';
  }

  // add waypoints
  var wps = []
  var k = map.doj.length;
  var i = 0;
  while(i < k)
  {
    var d = map.doj[i];
    if(d.klass == "Marker")
    {
      if(d.title.indexOf("Marker") == 0)
      {
        wps.push(d);
      }
    }
    i += 1;
  }
  var ptx = null;
  var pts = [];
  k = wps.length;
  i = 0;
  while(i < k)
  {
    var pt = wps[i].position; 
    var lat = Number(pt.x);
    var lng = Number(pt.y);
    s += '<trkpt lat=\"' + lat + '\" lon=\"' + lng + '\">\n';
    
    s += '</trkpt>\n';
    i += 1;
  }
  
  s += '</trkseg>\n</trk>\n</gpx>\n';
  
  if(ipod) 
  {
    var fn = prompt("Enter local track file name", "Track.gpx");
    if((fn != null) || (fn != "")) saveFileLocal(fn, s);
  }
  else saveFileFS("Track.gpx", s);
  
}

const orangeShape = [
42.436967,-71.070867,
42.436397,-71.070961,
42.435658,-71.071095,
42.435525,-71.071118,
42.435418,-71.071138,
42.43533,-71.071151,
42.435239,-71.071164,
42.434283,-71.071349,
42.433925,-71.071425,
42.433538,-71.071536,
42.433,-71.071732,
42.432094,-71.072104,
42.432017,-71.072134,
42.431941,-71.072164,
42.431566,-71.072312,
42.429877,-71.07297,
42.428529,-71.073511,
42.428226,-71.073647,
42.427858,-71.073801,
42.42741,-71.073974,
42.427275,-71.074027,
42.426713,-71.074257,
42.426713,-71.074257,
42.426572,-71.074314,
42.425997,-71.07455,
42.425946,-71.074571,
42.424474,-71.075168,
42.42331,-71.075647,
42.42246,-71.075987,
42.422051,-71.076139,
42.421711,-71.076258,
42.421633,-71.076285,
42.420656,-71.076547,
42.420264,-71.076624,
42.419499,-71.076744,
42.418976,-71.076807,
42.417822,-71.076835,
42.417641,-71.076835,
42.417129,-71.076831,
42.416433,-71.076805,
42.41591,-71.076804,
42.4147,-71.076825,
42.413161,-71.076867,
42.411561,-71.076908,
42.411038,-71.076913,
42.410595,-71.076891,
42.409317,-71.076932,
42.406351,-71.076988,
42.405784,-71.07699,
42.404992,-71.077003,
42.404896,-71.077003,
42.404411,-71.076996,
42.404288,-71.076998,
42.404159,-71.077001,
42.403952,-71.077022,
42.403952,-71.077022,
42.403722,-71.077045,
42.402716,-71.077092,
42.402646,-71.0771,
42.402447,-71.077121,
42.401722,-71.077151,
42.400793,-71.077191,
42.400432,-71.077209,
42.400069,-71.077209,
42.399364,-71.077232,
42.398849,-71.077236,
42.398491,-71.077262,
42.397769,-71.077266,
42.396978,-71.07728,
42.394309,-71.077294,
42.393336,-71.077273,
42.392659,-71.077216,
42.392659,-71.077216,
42.392354,-71.077191,
42.391317,-71.077086,
42.390653,-71.077048,
42.38998,-71.077044,
42.389523,-71.07705,
42.388473,-71.077017,
42.387963,-71.076995,
42.387402,-71.076947,
42.38697,-71.076938,
42.386457,-71.076925,
42.386303,-71.076923,
42.386191,-71.076929,
42.385786,-71.076923,
42.385596,-71.076927,
42.385274,-71.076927,
42.385151,-71.076919,
42.384489,-71.076918,
42.384131,-71.076943,
42.383673,-71.076967,
42.383673,-71.076967,
42.383106,-71.076998,
42.383007,-71.077001,
42.382872,-71.077006,
42.382587,-71.077017,
42.381775,-71.076955,
42.380549,-71.076935,
42.380307,-71.076932,
42.380169,-71.076908,
42.379995,-71.076868,
42.379743,-71.076783,
42.379593,-71.07671,
42.379536,-71.076679,
42.379358,-71.076605,
42.378895,-71.076313,
42.376996,-71.07468,
42.376445,-71.074194,
42.375918,-71.073634,
42.375461,-71.073003,
42.375065,-71.072442,
42.374488,-71.071477,
42.374366,-71.071204,
42.374109,-71.070642,
42.373666,-71.069631,
42.373666,-71.069631,
42.373642,-71.069578,
42.373453,-71.069084,
42.372677,-71.067739,
42.37131,-71.065748,
42.371298,-71.065725,
42.365832,-71.060531,
42.365739,-71.060451,
42.365739,-71.060451,
42.364186,-71.059114,
42.363533,-71.058364,
42.363321,-71.058165,
42.363141,-71.058044,
42.363141,-71.058044,
42.36314,-71.058043,
42.362969,-71.05794,
42.362708,-71.057892,
42.360395,-71.057691,
42.358975,-71.057708,
42.358975,-71.057708,
42.358872,-71.05771,
42.35811,-71.057709,
42.358026,-71.057719,
42.357914,-71.057795,
42.356942,-71.058665,
42.356503,-71.059266,
42.355996,-71.059847,
42.355572,-71.060326,
42.355572,-71.060326,
42.355565,-71.060333,
42.355291,-71.060598,
42.35492,-71.061027,
42.354067,-71.06185,
42.353888,-71.062045,
42.353618,-71.062304,
42.353504,-71.062363,
42.353281,-71.062439,
42.353068,-71.062446,
42.35283,-71.062467,
42.352533,-71.062512,
42.352533,-71.062512,
42.352431,-71.062528,
42.351596,-71.062699,
42.350966,-71.062858,
42.350838,-71.062918,
42.350737,-71.062986,
42.350443,-71.063318,
42.349826,-71.063918,
42.349517,-71.063997,
42.349517,-71.063997,
42.349072,-71.064112,
42.348989,-71.064201,
42.347542,-71.067344,
42.347481,-71.067527,
42.347464,-71.067673,
42.347465,-71.067868,
42.347546,-71.068647,
42.347565,-71.068987,
42.347583,-71.070204,
42.347596,-71.071599,
42.347588,-71.072294,
42.347593,-71.073569,
42.347579,-71.073841,
42.347569,-71.074335,
42.34756,-71.074718,
42.347519,-71.07511,
42.347458,-71.075585,
42.347401,-71.07579,
42.347401,-71.07579,
42.347399,-71.075797,
42.34734,-71.075982,
42.347309,-71.076049,
42.347208,-71.076226,
42.347101,-71.076388,
42.346819,-71.076738,
42.346353,-71.077351,
42.345848,-71.077993,
42.344332,-71.079816,
42.344174,-71.08002,
42.343723,-71.080565,
42.343661,-71.080621,
42.343418,-71.08091,
42.342841,-71.081571,
42.341968,-71.08261,
42.341701,-71.082966,
42.341701,-71.082966,
42.341558,-71.083157,
42.341376,-71.083399,
42.341203,-71.083629,
42.34032,-71.08472,
42.337857,-71.087766,
42.337498,-71.088198,
42.336766,-71.089097,
42.336592,-71.089311,
42.336494,-71.089431,
42.336494,-71.089431,
42.33574,-71.090355,
42.335642,-71.090472,
42.333499,-71.093011,
42.333418,-71.093109,
42.332422,-71.094313,
42.332336,-71.094391,
42.331856,-71.094924,
42.331615,-71.095156,
42.331539,-71.095223,
42.331372,-71.095369,
42.331372,-71.09537,
42.331372,-71.09537,
42.33106,-71.095644,
42.33007,-71.096443,
42.329667,-71.096747,
42.329328,-71.096988,
42.329091,-71.097121,
42.328915,-71.097242,
42.328728,-71.097335,
42.328423,-71.097501,
42.328274,-71.097603,
42.328067,-71.097706,
42.327823,-71.097839,
42.327575,-71.097942,
42.327268,-71.098048,
42.326951,-71.098189,
42.326539,-71.098357,
42.326307,-71.098437,
42.326166,-71.098486,
42.325096,-71.098903,
42.325049,-71.09892,
42.324851,-71.09899,
42.323392,-71.099733,
42.322951,-71.099985,
42.322951,-71.099985,
42.322875,-71.100028,
42.322782,-71.100095,
42.322578,-71.100248,
42.322487,-71.100315,
42.322054,-71.100624,
42.321662,-71.100939,
42.321188,-71.101309,
42.320426,-71.101965,
42.319591,-71.102699,
42.319187,-71.103013,
42.318497,-71.103509,
42.318221,-71.103689,
42.317776,-71.10396,
42.317391,-71.104179,
42.31727,-71.104247,
42.31727,-71.104247,
42.31721,-71.10428,
42.317021,-71.104387,
42.316429,-71.104689,
42.316064,-71.104846,
42.315963,-71.104889,
42.315036,-71.105221,
42.314686,-71.105355,
42.314155,-71.105585,
42.313754,-71.105737,
42.313753,-71.105744,
42.312954,-71.106096,
42.312494,-71.106312,
42.311567,-71.106832,
42.3108,-71.107317,
42.310671,-71.107398,
42.310493,-71.107512,
42.310493,-71.107512,
42.310406,-71.107568,
42.310064,-71.107786,
42.309259,-71.108304,
42.308946,-71.108509,
42.308743,-71.108649,
42.308458,-71.108858,
42.307619,-71.109388,
42.307568,-71.109421,
42.306368,-71.110181,
42.306021,-71.110418,
42.305258,-71.11091,
42.304624,-71.111329,
42.304175,-71.111647,
42.303392,-71.112192,
42.302972,-71.11251,
42.30244,-71.112876,
42.302369,-71.112936,
42.302143,-71.11313,
42.302063,-71.113184,
42.301979,-71.113242,
42.301103,-71.113837,
42.300731,-71.114102
];

var greenBShape = [
42.356334,-71.062193,
42.356219,-71.062336,
42.355921,-71.06269,
42.355781,-71.062846,
42.355624,-71.063034,
42.355495,-71.063168,
42.355287,-71.063349,
42.355047,-71.063499,
42.354897,-71.06352,
42.354773,-71.063596,
42.354517,-71.063713,
42.354002,-71.063991,
42.353896,-71.064035,
42.353725,-71.064129,
42.353644,-71.064166,
42.353564,-71.064264,
42.353351,-71.064363,
42.35318,-71.064467,
42.353028,-71.064543,
42.353014,-71.064548,
42.353014,-71.064548,
42.352584,-71.064688,
42.352532,-71.064751,
42.352502,-71.064808,
42.352481,-71.06488,
42.352464,-71.06504,
42.352589,-71.067135,
42.352528,-71.067633,
42.352427,-71.068292,
42.352242,-71.069109,
42.351799,-71.070811,
42.351799,-71.070811,
42.351757,-71.07097,
42.349978,-71.077448,
42.349978,-71.077448,
42.349906,-71.077713,
42.349747,-71.078361,
42.349615,-71.078855,
42.347877,-71.0853,
42.347838,-71.085472,
42.347831,-71.085554,
42.347829,-71.085651,
42.348012,-71.087419,
42.348034,-71.087653,
42.348058,-71.087953,
42.348058,-71.087953,
42.348076,-71.088178,
42.348082,-71.088564,
42.347988,-71.091707,
42.347998,-71.091797,
42.348019,-71.091888,
42.348056,-71.092005,
42.348133,-71.092174,
42.348184,-71.092252,
42.34864,-71.092792,
42.348905,-71.093123,
42.348948,-71.093214,
42.348962,-71.093277,
42.348968,-71.093383,
42.348969,-71.094102,
42.348967,-71.094129,
42.348967,-71.094129,
42.348965,-71.094152,
42.3489,-71.095358,
42.34887,-71.096733,
42.348878,-71.097219,
42.348996,-71.098394,
42.349122,-71.099484,
42.349184,-71.100057,
42.349213,-71.100279,
42.349213,-71.100279,
42.349263,-71.100664,
42.349357,-71.101499,
42.349474,-71.102461,
42.349642,-71.103909,
42.349642,-71.103909,
42.349679,-71.104226,
42.349918,-71.106243,
42.34999,-71.106882,
42.34999,-71.106882,
42.350075,-71.107626,
42.350303,-71.109342,
42.350453,-71.110566,
42.3505,-71.110928,
42.350503,-71.110965,
42.35053,-71.111127,
42.350566,-71.111411,
42.35058,-71.11155,
42.3506,-71.111668,
42.350747,-71.112924,
42.350823,-71.113619,
42.350857,-71.113894,
42.350857,-71.113894,
42.35113,-71.116119,
42.35113,-71.116119,
42.35113,-71.116121,
42.351228,-71.116973,
42.35138,-71.118163,
42.351435,-71.118798,
42.351447,-71.118905,
42.351447,-71.118905,
42.351464,-71.119044,
42.351508,-71.119426,
42.351622,-71.120318,
42.351788,-71.121662,
42.351788,-71.121662,
42.351794,-71.121716,
42.35192,-71.122822,
42.352131,-71.124522,
42.352131,-71.124649,
42.352115,-71.124727,
42.35207,-71.124824,
42.35194,-71.124994,
42.35194,-71.124994,
42.351855,-71.125106,
42.351663,-71.125354,
42.351407,-71.125732,
42.351275,-71.125943,
42.35109,-71.126264,
42.350909,-71.126611,
42.350795,-71.126852,
42.350715,-71.127075,
42.350661,-71.127269,
42.35057,-71.127685,
42.350541,-71.12794,
42.350526,-71.128132,
42.350527,-71.128487,
42.350541,-71.128705,
42.350605,-71.129322,
42.350645,-71.129769,
42.350649,-71.129996,
42.350637,-71.130211,
42.350608,-71.130412,
42.35057,-71.130592,
42.350493,-71.130811,
42.35023,-71.131348,
42.35023,-71.131348,
42.350202,-71.131406,
42.349885,-71.132083,
42.349729,-71.132398,
42.349471,-71.132967,
42.349134,-71.133656,
42.348695,-71.134602,
42.348536,-71.134929,
42.348533,-71.134936,
42.348533,-71.134936,
42.34838,-71.135267,
42.348303,-71.135504,
42.348255,-71.135719,
42.348223,-71.135933,
42.34821,-71.136125,
42.34821,-71.136292,
42.348221,-71.136463,
42.348252,-71.136642,
42.348307,-71.136878,
42.348386,-71.137122,
42.348675,-71.137956,
42.348675,-71.137956,
42.348675,-71.137956,
42.348874,-71.138601,
42.348921,-71.138771,
42.34894,-71.138915,
42.348951,-71.139069,
42.348948,-71.139269,
42.348916,-71.139554,
42.348871,-71.139756,
42.348806,-71.139939,
42.348703,-71.140133,
42.348606,-71.140256,
42.34856,-71.1403,
42.348445,-71.140364,
42.348331,-71.140415,
42.348331,-71.140415,
42.348038,-71.140544,
42.347839,-71.14061,
42.347147,-71.140715,
42.346967,-71.140772,
42.346717,-71.140866,
42.346274,-71.141088,
42.345791,-71.141392,
42.345645,-71.141498,
42.345555,-71.141552,
42.345329,-71.141687,
42.344579,-71.1422,
42.344276,-71.142425,
42.343847,-71.142716,
42.343821,-71.142733,
42.343821,-71.142733,
42.343473,-71.142965,
42.34319,-71.143177,
42.342954,-71.14338,
42.342797,-71.143525,
42.342645,-71.143697,
42.342486,-71.14389,
42.34222,-71.144285,
42.342097,-71.144508,
42.341958,-71.144797,
42.341813,-71.145152,
42.341713,-71.145472,
42.341642,-71.145714,
42.341594,-71.145941,
42.341558,-71.14619,
42.341558,-71.14619,
42.341538,-71.146329,
42.341507,-71.146541,
42.341483,-71.147011,
42.341484,-71.147321,
42.341495,-71.14785,
42.341508,-71.148073,
42.341487,-71.148569,
42.341446,-71.148888,
42.341406,-71.149132,
42.34132,-71.149444,
42.34118,-71.149864,
42.341014,-71.150242,
42.34079,-71.150644,
42.340774,-71.150668,
42.340774,-71.150668,
42.340461,-71.151125,
42.340176,-71.151481,
42.34004,-71.151635,
42.339871,-71.151797,
42.339689,-71.151956,
42.339514,-71.152081,
42.339268,-71.152245,
42.339086,-71.152337,
42.338886,-71.15245,
42.33869,-71.152546,
42.33856,-71.152638,
42.338329,-71.152839,
42.3383,-71.152872,
42.338225,-71.152959,
42.338127,-71.153088,
42.338127,-71.153088,
42.338126,-71.153088,
42.338111,-71.1531,
42.338049,-71.153216,
42.33802,-71.153317,
42.338,-71.153425,
42.338073,-71.153922,
42.338102,-71.154047,
42.338167,-71.15427,
42.338235,-71.154473,
42.338483,-71.155014,
42.338834,-71.155746,
42.339024,-71.15613,
42.339194,-71.156521,
42.339306,-71.156802,
42.339446,-71.157241,
42.339575,-71.157676,
42.339575,-71.157676,
42.339611,-71.157797,
42.339712,-71.158181,
42.339771,-71.158462,
42.33989,-71.159123,
42.33995,-71.159575,
42.339995,-71.15998,
42.340025,-71.160467,
42.340043,-71.161462,
42.340099,-71.163529,
42.340093,-71.16442,
42.340078,-71.164873,
42.340037,-71.165419,
42.33998,-71.165973,
42.339988,-71.166278,
42.339999,-71.166399,
42.34002,-71.166556,
42.34002,-71.166556
];

var greenCShape = [
42.365657,-71.0606,
42.363989,-71.059097,
42.363543,-71.058602,
42.363465,-71.058509,
42.363258,-71.058332,
42.363191,-71.058281,
42.363046,-71.058192,
42.363046,-71.058192,
42.362973,-71.058147,
42.362865,-71.058119,
42.362731,-71.058096,
42.362562,-71.058051,
42.361266,-71.057954,
42.361071,-71.057935,
42.36096,-71.057951,
42.360846,-71.058034,
42.359782,-71.058984,
42.359534,-71.05922,
42.359435,-71.059307,
42.359338,-71.059393,
42.359338,-71.059393,
42.359208,-71.059508,
42.359069,-71.059616,
42.35808,-71.060329,
42.357811,-71.060584,
42.357219,-71.061218,
42.356984,-71.061489,
42.356805,-71.061665,
42.356693,-71.06176,
42.356581,-71.061887,
42.356334,-71.062194,
42.356334,-71.062194,
42.356219,-71.062336,
42.355921,-71.06269,
42.355781,-71.062846,
42.355624,-71.063034,
42.355495,-71.063168,
42.355287,-71.063349,
42.355047,-71.063499,
42.354897,-71.06352,
42.354773,-71.063596,
42.354517,-71.063713,
42.354002,-71.063991,
42.353896,-71.064035,
42.353725,-71.064129,
42.353644,-71.064166,
42.353564,-71.064264,
42.353351,-71.064363,
42.35318,-71.064467,
42.353028,-71.064543,
42.353014,-71.064548,
42.353014,-71.064548,
42.352584,-71.064688,
42.352532,-71.064751,
42.352502,-71.064808,
42.352481,-71.06488,
42.352464,-71.06504,
42.352589,-71.067135,
42.352528,-71.067633,
42.352427,-71.068292,
42.352242,-71.069109,
42.351799,-71.070811,
42.351799,-71.070811,
42.351757,-71.07097,
42.349978,-71.077448,
42.349978,-71.077448,
42.349906,-71.077713,
42.349747,-71.078361,
42.349615,-71.078855,
42.347877,-71.0853,
42.347838,-71.085472,
42.347831,-71.085554,
42.347829,-71.085651,
42.348012,-71.087419,
42.348034,-71.087653,
42.348058,-71.087953,
42.348058,-71.087953,
42.348076,-71.088178,
42.348082,-71.088564,
42.347988,-71.091707,
42.347998,-71.091797,
42.348019,-71.091888,
42.348056,-71.092005,
42.348133,-71.092174,
42.348184,-71.092252,
42.34864,-71.092792,
42.348905,-71.093123,
42.348948,-71.093214,
42.348962,-71.093277,
42.348968,-71.093383,
42.348969,-71.094102,
42.348967,-71.094129,
42.348967,-71.094129,
42.348965,-71.094152,
42.348875,-71.094781,
42.348877,-71.094806,
42.348855,-71.095352,
42.348837,-71.09578,
42.348825,-71.096785,
42.348813,-71.096873,
42.348813,-71.096873,
42.348799,-71.096973,
42.347639,-71.101425,
42.346464,-71.105515,
42.346201,-71.106504,
42.346054,-71.106994,
42.345968,-71.107237,
42.345935,-71.107328,
42.345935,-71.107328,
42.345849,-71.107562,
42.345792,-71.107741,
42.345494,-71.108804,
42.34542,-71.109091,
42.345305,-71.10954,
42.345181,-71.109968,
42.34486,-71.111121,
42.34486,-71.111121,
42.344845,-71.111175,
42.344741,-71.11157,
42.344541,-71.112294,
42.344366,-71.112888,
42.344052,-71.114067,
42.344024,-71.114168,
42.344024,-71.114168,
42.343944,-71.114455,
42.343697,-71.115368,
42.343438,-71.116244,
42.343356,-71.116573,
42.343254,-71.116959,
42.343254,-71.116959,
42.343147,-71.117365,
42.342651,-71.119135,
42.342472,-71.119735,
42.342365,-71.120112,
42.342226,-71.120666,
42.342201,-71.120859,
42.342189,-71.120987,
42.34215,-71.121178,
42.34215,-71.121178,
42.342126,-71.12129,
42.342101,-71.121402,
42.342004,-71.121719,
42.341656,-71.123054,
42.341455,-71.12403,
42.341395,-71.124308,
42.341197,-71.125113,
42.341066,-71.125587,
42.341066,-71.125587,
42.341011,-71.125786,
42.340989,-71.125874,
42.340816,-71.126391,
42.340768,-71.126517,
42.340714,-71.126644,
42.340661,-71.12679,
42.340503,-71.12718,
42.340421,-71.127394,
42.340229,-71.127968,
42.340122,-71.128337,
42.340025,-71.128713,
42.339942,-71.129045,
42.339942,-71.129045,
42.339887,-71.129266,
42.339793,-71.129786,
42.339718,-71.130272,
42.339665,-71.130777,
42.339642,-71.131063,
42.339642,-71.131063,
42.339624,-71.131299,
42.33961,-71.131509,
42.339599,-71.131969,
42.339601,-71.132847,
42.339612,-71.133492,
42.339601,-71.133779,
42.339573,-71.134112,
42.339514,-71.134618,
42.339471,-71.134827,
42.339437,-71.13496,
42.339376,-71.135194,
42.33934,-71.135294,
42.33934,-71.135294,
42.339314,-71.135368,
42.339198,-71.135644,
42.33917,-71.135708,
42.339115,-71.135897,
42.339005,-71.136325,
42.338651,-71.137838,
42.33844,-71.13869,
42.33844,-71.13869,
42.338397,-71.138861,
42.338414,-71.138769,
42.338258,-71.139439,
42.338055,-71.140278,
42.337843,-71.141209,
42.337716,-71.14182,
42.337716,-71.14182,
42.337655,-71.142111,
42.337627,-71.142281,
42.337536,-71.142709,
42.337364,-71.143602,
42.337201,-71.144355,
42.337096,-71.144894,
42.337044,-71.145168,
42.336965,-71.145497,
42.336934,-71.145643,
42.336934,-71.145643,
42.336628,-71.147112,
42.336432,-71.147967,
42.336397,-71.148102,
42.336314,-71.148435,
42.336152,-71.149188
];

var greenDShape = [
42.359338,-71.059393,
42.359208,-71.059508,
42.359069,-71.059616,
42.35808,-71.060329,
42.357811,-71.060584,
42.357219,-71.061218,
42.356984,-71.061489,
42.356805,-71.061665,
42.356693,-71.06176,
42.356581,-71.061887,
42.356334,-71.062194,
42.356334,-71.062194,
42.356219,-71.062336,
42.355921,-71.06269,
42.355781,-71.062846,
42.355624,-71.063034,
42.355495,-71.063168,
42.355287,-71.063349,
42.355047,-71.063499,
42.354897,-71.06352,
42.354773,-71.063596,
42.354517,-71.063713,
42.354002,-71.063991,
42.353896,-71.064035,
42.353725,-71.064129,
42.353644,-71.064166,
42.353564,-71.064264,
42.353351,-71.064363,
42.35318,-71.064467,
42.353028,-71.064543,
42.353014,-71.064548,
42.353014,-71.064548,
42.352584,-71.064688,
42.352532,-71.064751,
42.352502,-71.064808,
42.352481,-71.06488,
42.352464,-71.06504,
42.352589,-71.067135,
42.352528,-71.067633,
42.352427,-71.068292,
42.352242,-71.069109,
42.351799,-71.070811,
42.351799,-71.070811,
42.351757,-71.07097,
42.349978,-71.077448,
42.349978,-71.077448,
42.349906,-71.077713,
42.349747,-71.078361,
42.349615,-71.078855,
42.347877,-71.0853,
42.347838,-71.085472,
42.347831,-71.085554,
42.347829,-71.085651,
42.348012,-71.087419,
42.348034,-71.087653,
42.348058,-71.087953,
42.348058,-71.087953,
42.348076,-71.088178,
42.348082,-71.088564,
42.347988,-71.091707,
42.347998,-71.091797,
42.348019,-71.091888,
42.348056,-71.092005,
42.348133,-71.092174,
42.348184,-71.092252,
42.34864,-71.092792,
42.348905,-71.093123,
42.348948,-71.093214,
42.348962,-71.093277,
42.348968,-71.093383,
42.348969,-71.094102,
42.348967,-71.094129,
42.348967,-71.094129,
42.348965,-71.094152,
42.348875,-71.094781,
42.348877,-71.094806,
42.348855,-71.095352,
42.348837,-71.09578,
42.348825,-71.096785,
42.348813,-71.096873,
42.348813,-71.096873,
42.348799,-71.096973,
42.347639,-71.101425,
42.347571,-71.101503,
42.347522,-71.101549,
42.347434,-71.10159,
42.347142,-71.101644,
42.346908,-71.101705,
42.346797,-71.101747,
42.346698,-71.101812,
42.346617,-71.101917,
42.346144,-71.102791,
42.345827,-71.103363,
42.345386,-71.104182,
42.345386,-71.104182,
42.345358,-71.104235,
42.345282,-71.104368,
42.345245,-71.104438,
42.345173,-71.104555,
42.345016,-71.104837,
42.344864,-71.105111,
42.344184,-71.106194,
42.343815,-71.106764,
42.343227,-71.107691,
42.342469,-71.108901,
42.342287,-71.109172,
42.34212,-71.109397,
42.341917,-71.109651,
42.341655,-71.109936,
42.341432,-71.110169,
42.341201,-71.110375,
42.341134,-71.110424,
42.341134,-71.110424,
42.340896,-71.1106,
42.34066,-71.110736,
42.340489,-71.110822,
42.340417,-71.110849,
42.340321,-71.110899,
42.340038,-71.111012,
42.339852,-71.111094,
42.339477,-71.111225,
42.338926,-71.111373,
42.338566,-71.111483,
42.338175,-71.111635,
42.337473,-71.111977,
42.337322,-71.112058,
42.336999,-71.112255,
42.336464,-71.112537,
42.33591,-71.112867,
42.335535,-71.113079,
42.335476,-71.113121,
42.335408,-71.113171,
42.33518,-71.113312,
42.335065,-71.113393,
42.334866,-71.11356,
42.334643,-71.113761,
42.334252,-71.114139,
42.333882,-71.114548,
42.333703,-71.114802,
42.333509,-71.115094,
42.333347,-71.115359,
42.333149,-71.115682,
42.332972,-71.116011,
42.332853,-71.116247,
42.332853,-71.116247,
42.332695,-71.116561,
42.33258,-71.116828,
42.332308,-71.117466,
42.332085,-71.11797,
42.332038,-71.118084,
42.332006,-71.118155,
42.331952,-71.118274,
42.331821,-71.118602,
42.331757,-71.118811,
42.331668,-71.119143,
42.331589,-71.119474,
42.331549,-71.119702,
42.331532,-71.119882,
42.331515,-71.120159,
42.331478,-71.121287,
42.331477,-71.121384,
42.33143,-71.122445,
42.331413,-71.123008,
42.3314,-71.123307,
42.33137,-71.123656,
42.331305,-71.124155,
42.331248,-71.124462,
42.3312,-71.124834,
42.331174,-71.125255,
42.331166,-71.125502,
42.331171,-71.125724,
42.33118,-71.125847,
42.331189,-71.125965,
42.331259,-71.126548,
42.331278,-71.126703,
42.331307,-71.127003,
42.331307,-71.127003,
42.331429,-71.128254,
42.331523,-71.129339,
42.331629,-71.130311,
42.331712,-71.131218,
42.331723,-71.131293,
42.33174,-71.131405,
42.331841,-71.132221,
42.331891,-71.132571,
42.332029,-71.133125,
42.332097,-71.133378,
42.332178,-71.133626,
42.332326,-71.134014,
42.332525,-71.13443,
42.333031,-71.135324,
42.333347,-71.135881,
42.333547,-71.136246,
42.333978,-71.136942,
42.334959,-71.138639,
42.335324,-71.139317,
42.335467,-71.139666,
42.335667,-71.140264,
42.335696,-71.140353,
42.335824,-71.14082,
42.335826,-71.140833,
42.335826,-71.140833,
42.335879,-71.14113,
42.335906,-71.141519,
42.335907,-71.14162,
42.335917,-71.141742,
42.335943,-71.142119,
42.335944,-71.142667,
42.335933,-71.143095,
42.335905,-71.143439,
42.335868,-71.143704,
42.335823,-71.143947,
42.335752,-71.144213,
42.335693,-71.144361,
42.335648,-71.144524,
42.335566,-71.144941,
42.335516,-71.145223,
42.335281,-71.146663,
42.335236,-71.146984,
42.335199,-71.1473,
42.335196,-71.147538,
42.335171,-71.147842,
42.335141,-71.148109,
42.335101,-71.148375,
42.335031,-71.148726,
42.334948,-71.149076,
42.334948,-71.149076,
42.334884,-71.149343,
42.334844,-71.149477,
42.334777,-71.149677,
42.33462,-71.150069,
42.334411,-71.150476,
42.334238,-71.150801,
42.33404,-71.151153,
42.333832,-71.151478,
42.333394,-71.152181,
42.332231,-71.154114,
42.331959,-71.154582,
42.331234,-71.155774,
42.330948,-71.156256,
42.330906,-71.156321,
42.330855,-71.156416,
42.330613,-71.156796,
42.329089,-71.159293,
42.32842,-71.160408,
42.327926,-71.161199,
42.327767,-71.161483,
42.327449,-71.162091,
42.327308,-71.162414,
42.327146,-71.162845,
42.327018,-71.163228,
42.326911,-71.163625,
42.326833,-71.163943,
42.326716,-71.164609,
42.326709,-71.164646,
42.326653,-71.165315,
42.326653,-71.165315,
42.326642,-71.16544,
42.326643,-71.165503,
42.326643,-71.16558,
42.326645,-71.166224,
42.326667,-71.166612,
42.32672,-71.167097,
42.326815,-71.16767,
42.32702,-71.16867,
42.327331,-71.170302,
42.3275,-71.171137,
42.327652,-71.171946,
42.327919,-71.173289,
42.328145,-71.174482,
42.328271,-71.175102,
42.328802,-71.177858,
42.328832,-71.178032,
42.328865,-71.17823,
42.328993,-71.178895,
42.329165,-71.179754,
42.329296,-71.180501,
42.329475,-71.181363,
42.329672,-71.182342,
42.329764,-71.182767,
42.330109,-71.184504,
42.330268,-71.185371,
42.330339,-71.186046,
42.330379,-71.186831,
42.330391,-71.187228,
42.330388,-71.187575,
42.330372,-71.18808,
42.330301,-71.188851,
42.330182,-71.189636,
42.330042,-71.190322,
42.329906,-71.190887,
42.329879,-71.19098,
42.329833,-71.191115,
42.329741,-71.191414,
42.329503,-71.192083,
42.329388,-71.192359,
42.329367,-71.19241,
42.329367,-71.19241,
42.32924,-71.192719,
42.329009,-71.193243,
42.32895,-71.193371,
42.328902,-71.193476,
42.328677,-71.193917,
42.328391,-71.19445,
42.328343,-71.19454,
42.328311,-71.194614,
42.327545,-71.196162,
42.327406,-71.196415,
42.327269,-71.196684,
42.32696,-71.197291,
42.326865,-71.197501,
42.326751,-71.197751,
42.326579,-71.198104,
42.326339,-71.198566,
42.326094,-71.199055,
42.325797,-71.199622,
42.325093,-71.201003,
42.324569,-71.201996,
42.324538,-71.202045,
42.324508,-71.202104,
42.323954,-71.203245,
42.323645,-71.203867,
42.323457,-71.204172,
42.323431,-71.204214,
42.32341,-71.204238,
42.323241,-71.20449,
42.322977,-71.204811,
42.322677,-71.205163,
42.322351,-71.205486,
42.322005,-71.205827,
42.321771,-71.206078,
42.321731,-71.206113,
42.321731,-71.206113,
42.321677,-71.20616,
42.32156,-71.206258,
42.320552,-71.207311,
42.319945,-71.207913,
42.319486,-71.208357,
42.319413,-71.208445,
42.319388,-71.208474,
42.319301,-71.208566,
42.319228,-71.208661,
42.318897,-71.209009,
42.318727,-71.209217,
42.318539,-71.209464,
42.318385,-71.20971,
42.318256,-71.209952,
42.318147,-71.210179,
42.318023,-71.210484,
42.31789,-71.210896,
42.317792,-71.211288,
42.317744,-71.211541,
42.317704,-71.211837,
42.317674,-71.212295,
42.317671,-71.212538,
42.317702,-71.213138,
42.31772,-71.213358,
42.317779,-71.213707,
42.317868,-71.214076,
42.317977,-71.21444,
42.318075,-71.214727,
42.31824,-71.215097,
42.318359,-71.215347,
42.318434,-71.2155,
42.318797,-71.216233,
42.31902,-71.216715,
42.31902,-71.216715,
42.319065,-71.216812,
42.319755,-71.218269,
42.320347,-71.219503,
42.320683,-71.220226,
42.321524,-71.222014,
42.321811,-71.222607,
42.322413,-71.223899,
42.322818,-71.224738,
42.323522,-71.226237,
42.323742,-71.226694,
42.323991,-71.22723,
42.324124,-71.227503,
42.324442,-71.228189,
42.324738,-71.228792,
42.324883,-71.22911,
42.325051,-71.229443,
42.325231,-71.229755,
42.325493,-71.230179,
42.325914,-71.230767,
42.325914,-71.230767,
42.325922,-71.230777,
42.326178,-71.231147,
42.326227,-71.231208,
42.326283,-71.231292,
42.3268,-71.232027,
42.327333,-71.232762,
42.32771,-71.233302,
42.328031,-71.233797,
42.328292,-71.234233,
42.329392,-71.236402,
42.329726,-71.237105,
42.330527,-71.238713,
42.330716,-71.239062,
42.33105,-71.239754,
42.331368,-71.240374,
42.332075,-71.241787,
42.332188,-71.242028,
42.332297,-71.24225,
42.332481,-71.242597,
42.332874,-71.243375,
42.333078,-71.243793,
42.333346,-71.244328,
42.333346,-71.244328,
42.3336,-71.244833,
42.333644,-71.244946,
42.333701,-71.245082,
42.333764,-71.245189,
42.334036,-71.24573,
42.334295,-71.246264,
42.334942,-71.247562,
42.335535,-71.248773,
42.335986,-71.249671,
42.336288,-71.250286,
42.336384,-71.25048,
42.336588,-71.250856,
42.336976,-71.251613,
42.337052,-71.25175,
42.337239,-71.2522,
42.337302,-71.25237
];

var greenEShape = [
42.370947,-71.077058,
42.370905,-71.076982,
42.370836,-71.076858,
42.370777,-71.07671,
42.370752,-71.076532,
42.370679,-71.076069,
42.370674,-71.076038,
42.370636,-71.075813,
42.370609,-71.075709,
42.370572,-71.075564,
42.370464,-71.075221,
42.370366,-71.074949,
42.37024,-71.074681,
42.369657,-71.073517,
42.369377,-71.072975,
42.368968,-71.072176,
42.368429,-71.071138,
42.367917,-71.070106,
42.367683,-71.069654,
42.367674,-71.069631,
42.367674,-71.069631,
42.367366,-71.068936,
42.366933,-71.068095,
42.3669,-71.068029,
42.366707,-71.067651,
42.366616,-71.06746,
42.366512,-71.067251,
42.366402,-71.067014,
42.366303,-71.066764,
42.366204,-71.066485,
42.366089,-71.066057,
42.36603,-71.065719,
42.365971,-71.06546,
42.36581,-71.064812,
42.365664,-71.064487,
42.365639,-71.064413,
42.365627,-71.064332,
42.365646,-71.064149,
42.365682,-71.063979,
42.365749,-71.063754,
42.365954,-71.063284,
42.366446,-71.062158,
42.366505,-71.062022,
42.366532,-71.061902,
42.366554,-71.061694,
42.366551,-71.061592,
42.36653,-71.061508,
42.366493,-71.061417,
42.365743,-71.060677,
42.365657,-71.0606,
42.365657,-71.0606,
42.363989,-71.059097,
42.363543,-71.058602,
42.363465,-71.058509,
42.363258,-71.058332,
42.363191,-71.058281,
42.363046,-71.058192,
42.363046,-71.058192,
42.362973,-71.058147,
42.362865,-71.058119,
42.362731,-71.058096,
42.362562,-71.058051,
42.361266,-71.057954,
42.361071,-71.057935,
42.36096,-71.057951,
42.360846,-71.058034,
42.359782,-71.058984,
42.359534,-71.05922,
42.359435,-71.059307,
42.359338,-71.059393,
42.359338,-71.059393,
42.359208,-71.059508,
42.359069,-71.059616,
42.35808,-71.060329,
42.357811,-71.060584,
42.357219,-71.061218,
42.356984,-71.061489,
42.356805,-71.061665,
42.356693,-71.06176,
42.356581,-71.061887,
42.356334,-71.062194,
42.356334,-71.062194,
42.356219,-71.062336,
42.355921,-71.06269,
42.355781,-71.062846,
42.355624,-71.063034,
42.355495,-71.063168,
42.355287,-71.063349,
42.355047,-71.063499,
42.354897,-71.06352,
42.354773,-71.063596,
42.354517,-71.063713,
42.354002,-71.063991,
42.353896,-71.064035,
42.353725,-71.064129,
42.353644,-71.064166,
42.353564,-71.064264,
42.353351,-71.064363,
42.35318,-71.064467,
42.353028,-71.064543,
42.353014,-71.064548,
42.353014,-71.064548,
42.352584,-71.064688,
42.352532,-71.064751,
42.352502,-71.064808,
42.352481,-71.06488,
42.352464,-71.06504,
42.352589,-71.067135,
42.352528,-71.067633,
42.352427,-71.068292,
42.352242,-71.069109,
42.351799,-71.070811,
42.351799,-71.070811,
42.351757,-71.07097,
42.349978,-71.077448,
42.349978,-71.077448,
42.349906,-71.077713,
42.349747,-71.078361,
42.349615,-71.078855,
42.349486,-71.079188,
42.349438,-71.079285,
42.349354,-71.079329,
42.348799,-71.079132,
42.348719,-71.079145,
42.34723,-71.079523,
42.34695,-71.079659,
42.346792,-71.079788,
42.346671,-71.079935,
42.345582,-71.081362,
42.345417,-71.081572,
42.345417,-71.081572,
42.345318,-71.081698,
42.342945,-71.084624,
42.342945,-71.084624,
42.34272,-71.084902,
42.342552,-71.0851,
42.341753,-71.086054,
42.341388,-71.086512,
42.341274,-71.086695,
42.341081,-71.087026,
42.340997,-71.087224,
42.340908,-71.087452,
42.340759,-71.087834,
42.340631,-71.088168,
42.340367,-71.088779,
42.340367,-71.088779,
42.340278,-71.088987,
42.340081,-71.08947,
42.339621,-71.090605,
42.339572,-71.090735,
42.339318,-71.091392,
42.339065,-71.092016,
42.338912,-71.092417,
42.338798,-71.09275,
42.33844,-71.093675,
42.338306,-71.094008,
42.337832,-71.095143,
42.3377,-71.095506,
42.3377,-71.095506,
42.337513,-71.096018,
42.337005,-71.097302,
42.336382,-71.098892,
42.336149,-71.099515,
42.335929,-71.100029,
42.335929,-71.100029,
42.335869,-71.100168,
42.33579,-71.100376,
42.335639,-71.100734,
42.335424,-71.101283,
42.335347,-71.1015,
42.335123,-71.102206,
42.335021,-71.102494,
42.334554,-71.103719,
42.334521,-71.1038,
42.334303,-71.104357,
42.334207,-71.104567,
42.33418,-71.104637,
42.33418,-71.104637,
42.334079,-71.104901,
42.334,-71.105107,
42.33383,-71.105456,
42.333694,-71.105715,
42.333694,-71.105715,
42.333643,-71.105812,
42.333561,-71.105937,
42.333408,-71.106247,
42.333332,-71.106456,
42.333257,-71.106715,
42.333233,-71.106898,
42.333226,-71.107036,
42.33323,-71.107447,
42.33322,-71.108198,
42.333203,-71.10852,
42.333203,-71.108799,
42.333193,-71.109078,
42.33319,-71.109356,
42.333176,-71.109587,
42.333152,-71.109746,
42.333152,-71.109746,
42.333142,-71.109815,
42.333133,-71.10986,
42.333089,-71.109987,
42.333038,-71.110158,
42.332906,-71.110429,
42.33283,-71.110585,
42.33276,-71.110745,
42.332523,-71.111143,
42.332384,-71.111349,
42.332266,-71.111518,
42.332184,-71.111667,
42.332091,-71.111807,
42.332,-71.111943,
42.331972,-71.111972,
42.331939,-71.111978,
42.331804,-71.111935,
42.331693,-71.111893,
42.331693,-71.111893,
42.330784,-71.111554,
42.33014,-71.111304,
42.33014,-71.111304,
42.330015,-71.111255,
42.329528,-71.111021,
42.329172,-71.110846,
42.32898,-71.110743,
42.328823,-71.110545,
42.328731,-71.110415,
42.328613,-71.11025,
42.328555,-71.110188,
42.328501,-71.110119,
42.328463,-71.11009,
42.328382,-71.110069,
42.328357,-71.11008,
42.328341,-71.110095
];

var blueShape = [
42.413638,-70.991535,
42.4127,-70.992021,
42.412188,-70.992235,
42.411689,-70.992408,
42.411469,-70.992462,
42.410722,-70.992611,
42.410376,-70.99265,
42.410035,-70.992678,
42.409661,-70.992685,
42.409348,-70.992679,
42.409054,-70.992663,
42.408559,-70.992612,
42.408423,-70.992595,
42.40839,-70.992592,
42.40839,-70.992592,
42.407959,-70.992554,
42.407829,-70.992535,
42.407716,-70.992518,
42.407296,-70.992419,
42.407135,-70.992382,
42.405408,-70.992118,
42.404878,-70.992052,
42.403378,-70.991822,
42.401873,-70.991594,
42.400694,-70.991407,
42.400269,-70.991378,
42.400089,-70.99138,
42.400004,-70.991387,
42.399851,-70.991399,
42.399775,-70.991404,
42.399419,-70.991459,
42.399105,-70.99154,
42.39877,-70.991642,
42.398436,-70.99179,
42.39804,-70.991993,
42.39764,-70.992247,
42.397529,-70.992321,
42.39746,-70.992366,
42.39746,-70.992366,
42.396701,-70.992868,
42.395934,-70.993391,
42.395188,-70.993871,
42.394064,-70.994638,
42.393672,-70.99489,
42.393196,-70.995196,
42.392007,-70.995978,
42.391453,-70.996355,
42.390968,-70.996724,
42.390604,-70.99701,
42.390487,-70.997124,
42.390282,-70.997324,
42.390123,-70.997488,
42.390123,-70.997488,
42.390032,-70.997583,
42.389849,-70.997813,
42.389453,-70.998328,
42.389269,-70.998613,
42.388981,-70.999042,
42.388591,-70.999742,
42.388487,-70.999963,
42.388348,-71.000266,
42.388308,-71.000352,
42.388233,-71.000489,
42.38811,-71.000843,
42.38775,-71.001988,
42.387722,-71.002083,
42.387646,-71.002329,
42.387371,-71.003158,
42.387324,-71.003303,
42.387271,-71.003464,
42.387165,-71.003786,
42.387128,-71.003898,
42.387047,-71.004141,
42.386767,-71.004972,
42.386767,-71.004972,
42.386577,-71.005536,
42.386497,-71.00579,
42.386454,-71.005928,
42.386362,-71.006219,
42.386189,-71.006765,
42.385624,-71.008441,
42.385021,-71.010205,
42.38502,-71.010206,
42.384993,-71.010292,
42.384796,-71.01071,
42.384726,-71.010834,
42.384635,-71.010947,
42.383816,-71.012074,
42.381658,-71.014976,
42.381598,-71.015056,
42.381558,-71.01511,
42.381087,-71.015745,
42.380954,-71.015914,
42.38085,-71.016077,
42.380756,-71.016246,
42.380663,-71.016439,
42.380506,-71.016808,
42.38043,-71.017043,
42.380356,-71.017332,
42.380237,-71.017901,
42.380196,-71.018186,
42.380191,-71.018546,
42.380207,-71.020456,
42.380197,-71.020902,
42.380159,-71.021178,
42.380111,-71.021458,
42.380041,-71.021727,
42.379983,-71.02192,
42.379894,-71.022144,
42.379772,-71.022475,
42.379772,-71.022475,
42.379626,-71.022867,
42.379394,-71.023497,
42.379051,-71.024418,
42.378951,-71.024626,
42.378846,-71.024817,
42.378741,-71.024992,
42.378622,-71.025163,
42.378589,-71.025202,
42.378484,-71.025328,
42.378214,-71.025648,
42.377612,-71.026365,
42.377273,-71.02679,
42.377075,-71.027077,
42.376909,-71.027383,
42.376603,-71.027903,
42.37637,-71.028216,
42.376194,-71.028423,
42.375991,-71.028614,
42.375816,-71.02879,
42.375603,-71.028939,
42.375174,-71.029283,
42.374999,-71.02943,
42.374762,-71.029676,
42.374473,-71.030011,
42.374473,-71.030011,
42.374237,-71.030283,
42.374178,-71.030351,
42.374132,-71.030404,
42.373824,-71.030757,
42.373795,-71.030791,
42.373756,-71.030836,
42.372863,-71.031875,
42.372686,-71.0321,
42.372659,-71.032145,
42.372638,-71.032183,
42.372601,-71.032246,
42.372467,-71.032495,
42.372409,-71.032677,
42.372351,-71.032867,
42.372315,-71.033144,
42.372303,-71.035691,
42.372288,-71.035811,
42.37226,-71.035931,
42.372227,-71.036022,
42.372139,-71.036143,
42.371664,-71.036688,
42.371173,-71.037332,
42.370905,-71.037675,
42.370562,-71.038078,
42.369957,-71.038809,
42.369105,-71.039531,
42.368805,-71.039801,
42.368805,-71.039801,
42.366297,-71.042057,
42.360115,-71.047883,
42.359876,-71.050439,
42.359798,-71.050789,
42.359639,-71.051209,
42.359575,-71.051502,
42.359543,-71.051689,
42.359537,-71.051726,
42.359537,-71.051726,
42.359447,-71.05228,
42.358952,-71.056119,
42.358875,-71.056836,
42.358884,-71.057303,
42.358884,-71.057303,
42.358891,-71.057667,
42.358891,-71.057709,
42.358945,-71.058213,
42.359033,-71.058776,
42.359072,-71.058943,
42.359116,-71.059163,
42.359166,-71.059308,
42.359248,-71.059473,
42.359278,-71.059507,
42.359278,-71.059507,
42.359346,-71.059584,
42.359444,-71.059662,
42.359544,-71.059712,
42.359669,-71.059789,
42.360025,-71.060168,
42.360129,-71.060252,
42.360256,-71.060322,
42.360422,-71.060376,
42.360453,-71.060392,
42.360514,-71.060448,
42.360588,-71.060531,
42.360649,-71.060635,
42.360706,-71.060759,
42.361034,-71.061562,
42.361082,-71.061811,
42.361143,-71.06207,
42.361162,-71.06215,
42.36118,-71.062395
];

var redAshmontShape = [
42.284249,-71.063556,
42.284383,-71.063627,
42.285288,-71.064082,
42.285341,-71.064077,
42.285526,-71.06401,
42.285645,-71.064001,
42.285749,-71.064016,
42.286733,-71.064406,
42.286978,-71.064483,
42.287716,-71.064623,
42.287898,-71.064668,
42.290474,-71.065187,
42.293112,-71.065739,
42.293716,-71.065904,
42.293716,-71.065904,
42.294334,-71.066073,
42.295398,-71.066376,
42.29597,-71.066419,
42.29638,-71.066433,
42.296842,-71.066353,
42.297112,-71.066255,
42.297354,-71.06611,
42.29772,-71.065903,
42.29796,-71.065731,
42.298197,-71.065525,
42.298421,-71.065309,
42.298667,-71.065043,
42.298841,-71.06482,
42.298991,-71.064587,
42.299169,-71.064286,
42.299268,-71.064108,
42.299382,-71.06386,
42.299544,-71.063449,
42.29977,-71.062534,
42.299788,-71.062431,
42.30003,-71.061525,
42.30003,-71.061525,
42.30007,-71.061374,
42.300135,-71.061142,
42.300183,-71.060951,
42.300232,-71.060602,
42.300246,-71.060345,
42.30026,-71.060171,
42.300271,-71.059884,
42.300282,-71.059024,
42.300292,-71.058192,
42.30032,-71.057799,
42.300393,-71.057386,
42.300436,-71.057229,
42.300489,-71.057061,
42.300542,-71.056918,
42.300623,-71.056741,
42.300831,-71.056365,
42.300938,-71.05622,
42.301099,-71.056059,
42.301201,-71.055983,
42.301507,-71.055781,
42.301557,-71.05577,
42.301612,-71.05575,
42.301908,-71.055728,
42.302399,-71.055731,
42.302829,-71.055748,
42.303167,-71.055719,
42.303455,-71.055679,
42.303829,-71.055606,
42.304262,-71.055487,
42.304391,-71.055449,
42.304569,-71.055387,
42.305461,-71.055115,
42.307034,-71.054748,
42.307545,-71.054621,
42.307633,-71.054623,
42.307954,-71.054548,
42.308262,-71.054486,
42.308706,-71.054353,
42.30902,-71.054243,
42.309229,-71.054149,
42.309616,-71.054001,
42.309999,-71.053839,
42.310336,-71.05368,
42.310669,-71.05354,
42.311144,-71.053307,
42.311144,-71.053307,
42.311237,-71.053262,
42.311386,-71.053199,
42.311945,-71.052953,
42.312266,-71.052824,
42.31315,-71.052484,
42.313661,-71.052296,
42.314048,-71.052198,
42.314492,-71.052121,
42.315053,-71.052093,
42.315314,-71.052091,
42.316006,-71.052161,
42.316643,-71.052187,
42.317369,-71.052203,
42.318027,-71.052236,
42.318377,-71.052249,
42.318697,-71.052258,
42.31897,-71.052289,
42.319248,-71.052317,
42.319639,-71.052349,
42.320014,-71.052389,
42.320148,-71.052402,
42.320726,-71.052488,
42.321177,-71.052533,
42.321177,-71.052533,
42.321452,-71.052561,
42.321551,-71.052582,
42.321995,-71.052669,
42.322346,-71.052778,
42.32266,-71.052904,
42.322813,-71.052981,
42.32303,-71.053091,
42.323262,-71.053221,
42.323416,-71.053322,
42.323764,-71.053598,
42.323884,-71.053684,
42.324115,-71.053936,
42.324272,-71.054116,
42.325208,-71.055351,
42.325346,-71.055557,
42.32582,-71.056187,
42.326066,-71.056561,
42.326175,-71.056696,
42.326813,-71.05749,
42.32704,-71.057682,
42.327266,-71.057829,
42.327573,-71.057963,
42.327699,-71.057967,
42.327771,-71.057948,
42.327929,-71.057863,
42.328499,-71.057611,
42.329757,-71.056975,
42.329757,-71.056975,
42.329961,-71.056873,
42.342623,-71.057103,
42.342623,-71.057103,
42.34335,-71.057116,
42.349479,-71.052588,
42.349774,-71.052406,
42.349998,-71.052316,
42.350132,-71.052273,
42.350395,-71.052227,
42.350575,-71.052226,
42.350791,-71.052263,
42.351161,-71.052357,
42.351393,-71.052468,
42.351483,-71.052548,
42.351645,-71.052754,
42.352559,-71.055166,
42.352612,-71.055297,
42.352612,-71.055297,
42.352829,-71.055832,
42.353082,-71.056372,
42.353336,-71.056975,
42.353556,-71.057313,
42.355319,-71.060286,
42.355431,-71.060512,
42.355431,-71.060512,
42.356244,-71.062151,
42.356244,-71.062151,
42.35638,-71.062425,
42.356502,-71.062667,
42.356775,-71.063235,
42.356947,-71.063569,
42.357121,-71.063933,
42.357718,-71.065157,
42.357898,-71.065482,
42.358119,-71.065854,
42.358859,-71.066775,
42.360738,-71.069339,
42.360891,-71.069654,
42.360961,-71.069826,
42.361016,-71.069991,
42.361035,-71.070033,
42.361104,-71.070265,
42.361141,-71.07045,
42.361156,-71.070603,
42.36117,-71.070714,
42.361193,-71.071094,
42.361216,-71.071358,
42.361256,-71.071891,
42.36129,-71.072226,
42.36129,-71.072226,
42.361303,-71.072356,
42.361341,-71.072754,
42.361346,-71.072841,
42.361422,-71.073645,
42.361548,-71.075313,
42.361615,-71.076098,
42.361702,-71.077527,
42.361773,-71.078479,
42.361807,-71.078945,
42.361851,-71.079722,
42.362019,-71.081968,
42.362131,-71.083429,
42.36239,-71.08523,
42.362468,-71.086074,
42.362468,-71.086074,
42.362477,-71.086178,
42.36253,-71.086756,
42.362849,-71.091812,
42.363109,-71.094912,
42.363232,-71.096742,
42.36336,-71.09821,
42.363438,-71.09954,
42.363487,-71.100109,
42.363553,-71.100488,
42.363774,-71.100988,
42.363956,-71.101333,
42.364769,-71.102691,
42.365309,-71.103629,
42.365309,-71.103629,
42.365542,-71.104035,
42.367895,-71.107808,
42.368259,-71.108551,
42.368842,-71.109857,
42.369856,-71.112597,
42.37004,-71.113001,
42.370172,-71.113179,
42.37034,-71.113365,
42.37101,-71.114216,
42.372412,-71.115814,
42.37248,-71.1159,
42.372506,-71.115943,
42.373269,-71.118479,
42.373332,-71.118641,
42.373389,-71.118759,
42.373459,-71.118821,
42.373511,-71.118843,
42.373672,-71.118836,
42.374038,-71.118761,
42.374038,-71.118761,
42.374416,-71.118684,
42.374974,-71.118531,
42.375488,-71.118486,
42.375717,-71.118479,
42.375864,-71.118526,
42.375958,-71.118598,
42.376098,-71.118758,
42.37627,-71.119067,
42.376461,-71.119431,
42.3767,-71.119685,
42.377225,-71.1199,
42.377722,-71.120062,
42.378027,-71.120084,
42.37841,-71.120036,
42.380821,-71.119787,
42.388185,-71.118944,
42.388282,-71.11894,
42.388282,-71.11894,
42.390618,-71.118828,
42.393632,-71.119147,
42.394378,-71.119214,
42.394959,-71.119236,
42.395198,-71.119333,
42.395376,-71.119464,
42.395609,-71.119693,
42.395843,-71.12003,
42.396172,-71.120629,
42.396444,-71.121197,
42.39659,-71.121567,
42.39667,-71.121858,
42.39678,-71.122214,
42.396842,-71.122465,
42.396842,-71.122465,
42.397046,-71.123298,
42.397205,-71.124169,
42.397266,-71.124717,
42.397354,-71.125452,
42.397444,-71.126473,
42.397538,-71.128034,
42.397595,-71.129099,
42.397733,-71.130878,
42.397925,-71.134498,
42.397974,-71.135204,
42.397867,-71.136082,
42.397828,-71.136361,
42.397753,-71.136703,
42.397658,-71.137081,
42.397613,-71.137178,
42.397557,-71.137252,
42.397485,-71.137286,
42.397215,-71.137368,
42.396945,-71.137494,
42.396676,-71.137712,
42.396481,-71.138021,
42.396356,-71.138293,
42.396353,-71.138317,
42.396254,-71.138961,
42.396236,-71.139135,
42.396193,-71.139553,
42.396152,-71.142079
];

var redBraintreeShape = [
42.396152,-71.142079,
42.396193,-71.139553,
42.396236,-71.139135,
42.396254,-71.138961,
42.396353,-71.138317,
42.396356,-71.138293,
42.396481,-71.138021,
42.396676,-71.137712,
42.396945,-71.137494,
42.397215,-71.137368,
42.397485,-71.137286,
42.397557,-71.137252,
42.397613,-71.137178,
42.397658,-71.137081,
42.397753,-71.136703,
42.397828,-71.136361,
42.397867,-71.136082,
42.397974,-71.135204,
42.397925,-71.134498,
42.397733,-71.130878,
42.397595,-71.129099,
42.397538,-71.128034,
42.397444,-71.126473,
42.397354,-71.125452,
42.397266,-71.124717,
42.397205,-71.124169,
42.397046,-71.123298,
42.396813,-71.122348,
42.396813,-71.122348,
42.39678,-71.122214,
42.39667,-71.121858,
42.39659,-71.121567,
42.396444,-71.121197,
42.396172,-71.120629,
42.395843,-71.12003,
42.395609,-71.119693,
42.395376,-71.119464,
42.395198,-71.119333,
42.394959,-71.119236,
42.394378,-71.119214,
42.393632,-71.119147,
42.390618,-71.118828,
42.388289,-71.118939,
42.388289,-71.118939,
42.388185,-71.118944,
42.380821,-71.119787,
42.37841,-71.120036,
42.378027,-71.120084,
42.377722,-71.120062,
42.377225,-71.1199,
42.3767,-71.119685,
42.376461,-71.119431,
42.37627,-71.119067,
42.376098,-71.118758,
42.375958,-71.118598,
42.375864,-71.118526,
42.375717,-71.118479,
42.375488,-71.118486,
42.374974,-71.118531,
42.374416,-71.118684,
42.373987,-71.118772,
42.373987,-71.118772,
42.373672,-71.118836,
42.373511,-71.118843,
42.373459,-71.118821,
42.373389,-71.118759,
42.373332,-71.118641,
42.373269,-71.118479,
42.372506,-71.115943,
42.37248,-71.1159,
42.372412,-71.115814,
42.37101,-71.114216,
42.37034,-71.113365,
42.370172,-71.113179,
42.37004,-71.113001,
42.369856,-71.112597,
42.368842,-71.109857,
42.368259,-71.108551,
42.367895,-71.107808,
42.365542,-71.104035,
42.365307,-71.103625,
42.365307,-71.103625,
42.364769,-71.102691,
42.363956,-71.101333,
42.363774,-71.100988,
42.363553,-71.100488,
42.363487,-71.100109,
42.363438,-71.09954,
42.36336,-71.09821,
42.363232,-71.096742,
42.363109,-71.094912,
42.362849,-71.091812,
42.36253,-71.086756,
42.362477,-71.086178,
42.362468,-71.086074,
42.362468,-71.086074,
42.36239,-71.08523,
42.362131,-71.083429,
42.362019,-71.081968,
42.361851,-71.079722,
42.361807,-71.078945,
42.361773,-71.078479,
42.361702,-71.077527,
42.361615,-71.076098,
42.361548,-71.075313,
42.361422,-71.073645,
42.361346,-71.072841,
42.361341,-71.072754,
42.361303,-71.072356,
42.361289,-71.07222,
42.361289,-71.07222,
42.361256,-71.071891,
42.361216,-71.071358,
42.361193,-71.071094,
42.36117,-71.070714,
42.361156,-71.070603,
42.361141,-71.07045,
42.361104,-71.070265,
42.361035,-71.070033,
42.361016,-71.069991,
42.360961,-71.069826,
42.360891,-71.069654,
42.360738,-71.069339,
42.358859,-71.066775,
42.358119,-71.065854,
42.357898,-71.065482,
42.357718,-71.065157,
42.357121,-71.063933,
42.356947,-71.063569,
42.356775,-71.063235,
42.356502,-71.062667,
42.35638,-71.062425,
42.356246,-71.062155,
42.356246,-71.062155,
42.355434,-71.060517,
42.355434,-71.060517,
42.355319,-71.060286,
42.353556,-71.057313,
42.353336,-71.056975,
42.353082,-71.056372,
42.352829,-71.055832,
42.352609,-71.055291,
42.352609,-71.055291,
42.352559,-71.055166,
42.351645,-71.052754,
42.351483,-71.052548,
42.351393,-71.052468,
42.351161,-71.052357,
42.350791,-71.052263,
42.350575,-71.052226,
42.350395,-71.052227,
42.350132,-71.052273,
42.349998,-71.052316,
42.349774,-71.052406,
42.349479,-71.052588,
42.34335,-71.057116,
42.342621,-71.057103,
42.342621,-71.057103,
42.329961,-71.056873,
42.329747,-71.056981,
42.329747,-71.056981,
42.328499,-71.057611,
42.327929,-71.057863,
42.327771,-71.057948,
42.327699,-71.057967,
42.327573,-71.057963,
42.327266,-71.057829,
42.32704,-71.057682,
42.326813,-71.05749,
42.326175,-71.056696,
42.326066,-71.056561,
42.32582,-71.056187,
42.325346,-71.055557,
42.325208,-71.055351,
42.32467,-71.054522,
42.324274,-71.053986,
42.323974,-71.053622,
42.323765,-71.053404,
42.323542,-71.053204,
42.323186,-71.052944,
42.322832,-71.052753,
42.322517,-71.052625,
42.321787,-71.052441,
42.321556,-71.0524,
42.321451,-71.052379,
42.32135,-71.052354,
42.321204,-71.052314,
42.321204,-71.052314,
42.320879,-71.052227,
42.320714,-71.052203,
42.32064,-71.052191,
42.32017,-71.052153,
42.319972,-71.052144,
42.319819,-71.052119,
42.319116,-71.052079,
42.318056,-71.052024,
42.317757,-71.052013,
42.316767,-71.052001,
42.3152,-71.051873,
42.314572,-71.051898,
42.314246,-71.051963,
42.313706,-71.052116,
42.312545,-71.052596,
42.311715,-71.052938,
42.309966,-71.053661,
42.309199,-71.053944,
42.308261,-71.054254,
42.304322,-71.055247,
42.304193,-71.055284,
42.303619,-71.055451,
42.303191,-71.055533,
42.302751,-71.055585,
42.302457,-71.055567,
42.301921,-71.055517,
42.301633,-71.055455,
42.301309,-71.055345,
42.300992,-71.055185,
42.300625,-71.054971,
42.300577,-71.054943,
42.300184,-71.054643,
42.299815,-71.054341,
42.29823,-71.052635,
42.297277,-71.051551,
42.296462,-71.050661,
42.294292,-71.048204,
42.293604,-71.047425,
42.29257,-71.046255,
42.290444,-71.043849,
42.290273,-71.043674,
42.290068,-71.043427,
42.289968,-71.043317,
42.289869,-71.04321,
42.28905,-71.042313,
42.288709,-71.041944,
42.288383,-71.041582,
42.288099,-71.041263,
42.288047,-71.041202,
42.287996,-71.041145,
42.286878,-71.039883,
42.286366,-71.039319,
42.286005,-71.038958,
42.28517,-71.038021,
42.284244,-71.036982,
42.283281,-71.035837,
42.282654,-71.035139,
42.282264,-71.034704,
42.282187,-71.034615,
42.282162,-71.034588,
42.282097,-71.034511,
42.282042,-71.034448,
42.28173,-71.034094,
42.281619,-71.033967,
42.281177,-71.033569,
42.280848,-71.033301,
42.280491,-71.033042,
42.280117,-71.032816,
42.279884,-71.032727,
42.279473,-71.032555,
42.278547,-71.032214,
42.278184,-71.03207,
42.277891,-71.031938,
42.277675,-71.031816,
42.277395,-71.031646,
42.277222,-71.031515,
42.276856,-71.03119,
42.276163,-71.030515,
42.27586,-71.030184,
42.275268,-71.029573,
42.274968,-71.029267,
42.274968,-71.029267,
42.273702,-71.027979,
42.272946,-71.02717,
42.270852,-71.024953,
42.269201,-71.023213,
42.267619,-71.02141,
42.267273,-71.020975,
42.266571,-71.020204,
42.266453,-71.020074,
42.266005,-71.019628,
42.266005,-71.019628,
42.265954,-71.019577,
42.265717,-71.019407,
42.265641,-71.019339,
42.265557,-71.019267,
42.265407,-71.019134,
42.264938,-71.018697,
42.26372,-71.017422,
42.260934,-71.014414,
42.260031,-71.013455,
42.259611,-71.013009,
42.25942,-71.012823,
42.25838,-71.01172,
42.257481,-71.010806,
42.257332,-71.010644,
42.256288,-71.009516,
42.256152,-71.009392,
42.256057,-71.00929,
42.255958,-71.009184,
42.253755,-71.006803,
42.253484,-71.006487,
42.25334,-71.006346,
42.253282,-71.0063,
42.253209,-71.006242,
42.252928,-71.006006,
42.25263,-71.005805,
42.251948,-71.005417,
42.251402,-71.005027,
42.251174,-71.004894,
42.250902,-71.004745,
42.250902,-71.004745,
42.250693,-71.00463,
42.250083,-71.004282,
42.249829,-71.004128,
42.249475,-71.003916,
42.249226,-71.00379,
42.249099,-71.00374,
42.249014,-71.003706,
42.248881,-71.003653,
42.248845,-71.003637,
42.24878,-71.003613,
42.248703,-71.003578,
42.248356,-71.003493,
42.248127,-71.00345,
42.247825,-71.003434,
42.247463,-71.003456,
42.247033,-71.003532,
42.246549,-71.003633,
42.245825,-71.003771,
42.244529,-71.004057,
42.243917,-71.00423,
42.243808,-71.004256,
42.24374,-71.004273,
42.243653,-71.004294,
42.243186,-71.004407,
42.241531,-71.004846,
42.241366,-71.004885,
42.241251,-71.004915,
42.241134,-71.004944,
42.24082,-71.005022,
42.239323,-71.005413,
42.23653,-71.006131,
42.235814,-71.00632,
42.235207,-71.006451,
42.234684,-71.006533,
42.234404,-71.006585,
42.233969,-71.006675,
42.233901,-71.006689,
42.233266,-71.006818,
42.232851,-71.006902,
42.232851,-71.006902,
42.232681,-71.006936,
42.23258,-71.006958,
42.232357,-71.006981,
42.232114,-71.007019,
42.231766,-71.007051,
42.231472,-71.007053,
42.231123,-71.007001,
42.230866,-71.006951,
42.230558,-71.006881,
42.230273,-71.006789,
42.229944,-71.006674,
42.229571,-71.006535,
42.22902,-71.006279,
42.228131,-71.005785,
42.227673,-71.005527,
42.227106,-71.005169,
42.22697,-71.005076,
42.226913,-71.005037,
42.226853,-71.004996,
42.226476,-71.004744,
42.226381,-71.004681,
42.226264,-71.004605,
42.226183,-71.004553,
42.22607,-71.004479,
42.225871,-71.004351,
42.224397,-71.003366,
42.223775,-71.002978,
42.223365,-71.002703,
42.222079,-71.001825,
42.22201,-71.001777,
42.222002,-71.001772,
42.221949,-71.001734,
42.220923,-71.000974,
42.220529,-71.000755,
42.220162,-71.000595,
42.219878,-71.000492,
42.219633,-71.000414,
42.219134,-71.000256,
42.218834,-71.000204,
42.218568,-71.00015,
42.218314,-71.000121,
42.218167,-71.000098,
42.217759,-71.000101,
42.217086,-71.000197,
42.216885,-71.000232,
42.216479,-71.000283,
42.216044,-71.000364,
42.214979,-71.000528,
42.214158,-71.000639,
42.213902,-71.000672,
42.211617,-71.001017,
42.210971,-71.001084,
42.210372,-71.001181,
42.210129,-71.001209,
42.209414,-71.001278,
42.208851,-71.00137,
42.208491,-71.001411,
42.208371,-71.001423
];

var mattapanShape = [
42.284095,-71.063303,
42.283901,-71.063183,
42.283786,-71.063105,
42.283646,-71.063,
42.28348,-71.062886,
42.283209,-71.062733,
42.282775,-71.062477,
42.282454,-71.062268,
42.281687,-71.061738,
42.281239,-71.061436,
42.280766,-71.061138,
42.280445,-71.06091,
42.279704,-71.060422,
42.279687,-71.060412,
42.279687,-71.060412,
42.279663,-71.060398,
42.27937,-71.060211,
42.279334,-71.06018,
42.279141,-71.060065,
42.278894,-71.059932,
42.27873,-71.05985,
42.278511,-71.059758,
42.278408,-71.059705,
42.27829,-71.059651,
42.276912,-71.059156,
42.276864,-71.059136,
42.276312,-71.05893,
42.276088,-71.05886,
42.275921,-71.058823,
42.275726,-71.058807,
42.275503,-71.058829,
42.275339,-71.058865,
42.275248,-71.058894,
42.275047,-71.058974,
42.274941,-71.059026,
42.274832,-71.059096,
42.27473,-71.059179,
42.274594,-71.059279,
42.274513,-71.059356,
42.274364,-71.059544,
42.274101,-71.059921,
42.273783,-71.060402,
42.273461,-71.060901,
42.273075,-71.061472,
42.272588,-71.06218,
42.272345,-71.062552,
42.272332,-71.062572,
42.272332,-71.062572,
42.272019,-71.063043,
42.271688,-71.06352,
42.271285,-71.064159,
42.271088,-71.064508,
42.27106,-71.064574,
42.271033,-71.06465,
42.27087,-71.065012,
42.270786,-71.065263,
42.270711,-71.065485,
42.270588,-71.065849,
42.270459,-71.066274,
42.270346,-71.066867,
42.270311,-71.067167,
42.270308,-71.067244,
42.270297,-71.06748,
42.270295,-71.067674,
42.270295,-71.067674,
42.270295,-71.067738,
42.2703,-71.067865,
42.270305,-71.068007,
42.270292,-71.068405,
42.27028,-71.069905,
42.270265,-71.070638,
42.270251,-71.071019,
42.270222,-71.071418,
42.270065,-71.072693,
42.270026,-71.073093,
42.270015,-71.07319,
42.270003,-71.073294,
42.269998,-71.07333,
42.269998,-71.07333,
42.269961,-71.07361,
42.269875,-71.074385,
42.269789,-71.075178,
42.26972,-71.075667,
42.269674,-71.075921,
42.269611,-71.076214,
42.269489,-71.076724,
42.269333,-71.077339,
42.269242,-71.077722,
42.268948,-71.078904,
42.268807,-71.079503,
42.268646,-71.080141,
42.268451,-71.080955,
42.268312,-71.081505,
42.268299,-71.081557,
42.268299,-71.081557,
42.268233,-71.081817,
42.26768,-71.084082,
42.267571,-71.084511,
42.267482,-71.084894,
42.267409,-71.08526,
42.267377,-71.08556,
42.26737,-71.085769,
42.267371,-71.086033,
42.267379,-71.086247,
42.267403,-71.086512,
42.267465,-71.086907,
42.267539,-71.087206,
42.267608,-71.087533,
42.267663,-71.087772,
42.267663,-71.087772,
42.267698,-71.087922,
42.267861,-71.088719,
42.267892,-71.088987,
42.267906,-71.089215,
42.267907,-71.089501,
42.267885,-71.089963,
42.267869,-71.090237,
42.267844,-71.090541,
42.267812,-71.090768,
42.267754,-71.090893,
42.26769,-71.090989,
42.267667,-71.091041,
42.26765,-71.091164,
42.267516,-71.091986,
42.267504,-71.09204
];

var borders =[
[42.869 ,-70.828 ,
42.859 ,-71.031 ,
42.697 ,-71.295 ,
42.727 ,-72.459 ],
[42.746 ,-73.265 ,
42.049 ,-73.488 ],
[42.008 ,-71.8 ,
42.018 ,-71.381 ,
41.776 ,-71.318 ,
41.775 ,-71.316 ,
41.763 ,-71.287 ,
41.759 ,-71.279 ,
41.718 ,-71.232 ,
41.674 ,-71.195 ,
41.66 ,-71.136 ,
41.647 ,-71.134 ,
41.496 ,-71.121 ],
[42.727 ,-72.459 ,
42.746 ,-73.265 ],
[42.008 ,-71.8 ,
42.049 ,-73.488 ,
42.049 ,-73.488 ,
41.295 ,-73.551 ,
41.212 ,-73.482 ,
41.101 ,-73.728 ,
40.991 ,-73.659 ],
[42.008 ,-71.8 ,
41.423 ,-71.798 ],
[45.305 ,-71.084 ,
43.39 ,-70.988 ,
43.328 ,-70.926 ,
43.316 ,-70.912 ,
43.058 ,-70.704 ],

[45.013 ,-71.502 ,
44.752 ,-71.632 ,
44.588 ,-71.535 ,
44.506 ,-71.58 ,
44.319 ,-72.032 ,
44.081 ,-72.033 ,
43.574 ,-72.38 ,
43.005 ,-72.445 ,
42.872 ,-72.555 ,
42.727 ,-72.459 ],

[42.746 ,-73.265 ,
43.533 ,-73.242 ,
43.627 ,-73.304 ,
43.588 ,-73.431 ,
43.752 ,-73.363 ]];

const borders2 = [[

43.02071359427862, -70.68420412950218,
42.89206418807338, -70.79406741075218,
42.66224137632748, -70.73364260606468,
42.71473218539458, -70.60729983262718,
42.67031977251905, -70.55786135606468,
42.61779143282346, -70.56884768418968,
42.54903361222514, -70.73913577012718,
42.43156587257918, -70.86547854356468,
42.403178541828034, -70.95336916856468,
42.35448465106744, -70.89843752793968,
42.28543700749154, -70.75012209825218,
42.12674735753131, -70.65673830918968,
41.934976500546604, -70.52490237168968,
41.89001042401827, -70.51391604356468,
41.81636125072054, -70.51391604356468,
41.74262728637672, -70.33813479356468,
41.79998325207398, -70.03601077012718,
41.8450126727069, -70.04699709825218,
41.89001042401827, -70.10192873887718,
42.00848901572399, -70.09643557481468,
42.032974332441405, -70.15136721543968,
42.0207328526443, -70.17883303575218,
42.057450220246814, -70.25573733262718,
42.110448960122206, -70.16235354356468,
42.06968462804662, -70.03601077012718,
41.91454130182335, -69.93713381700218,
41.74672584176937, -69.89868166856468,
41.66060124302088, -69.89868166856468,
41.53736603550382, -69.96459963731468,
41.51680395810117, -70.03051760606468,
41.64828831259533, -70.00305178575218,
41.60312076451184, -70.24475100450218,
41.6154423246811, -70.32165530137718,
41.58668835697237, -70.40405276231468,
41.52914198872311, -70.48095705918968,
41.51269075845857, -70.66223147325218,
41.3850519497068, -70.93139651231468,
41.45919537950706, -70.91491702012718,
41.541477666790286, -70.71166994981468,
41.590796851056005, -70.79406741075218,
41.57025176609894, -70.89843752793968,
41.49212083968776, -71.01928713731468,
41.43860847395721, -71.18408205918968,
41.42625319507269, -71.40380862168968,
41.376808565702355, -71.44226077012718,
41.22411753058293, -72.01354983262718
]];

function plotBorders()
{
  var pl = [];
  var clor = '#66FF66';
  var jj = 0;
  for(j = 0; j < 2; j++)
  {
  var a = borders;
  if(j == 1) a = borders2;
  var k = a.length;
  var i = 0;
  while(i < k)
  {
    var pts = [];
    var t = a[i];
    var kk = t.length;
    var ii = 0;
    while(ii < kk)
    {
      pts[pts.length] = new MAPCLASS.LatLng(t[ii], t[ii + 1] )
      ii += 2;
    }
    var bd = new MAPCLASS.Polyline({
          path: pts,
          geodesic: true,
          strokeColor: '#66FF66',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
    bd.setMap(map);
    pl[pl.length] = bd;
    i += 1;
  }
  }
  
}







