// eo_pathway.js    copyright (c) 2022 William Kaupinis. All rights reserved.

let SPGY = null;
let bSPGYrender = true;


function eo_pathway()
{
  this.here_pos = null;
  this.stop_id = null;
  this.pid = null;
  this.agency = null;
  this.bNYT = false;
  this.bMBTA = false;
  this.bWMATA = false;
  this.bBART = false;
  this.inc = 19; // MBTA stops.txt
  this.setHere = function(pt) {
      this.here_pos = pt;
      };
  this.setStopId = function(stop_id) {
      this.bMBTA = false;
      this.bNYT = false;
      this.stop_id = stop_id;
      this.pid = getParentIdFromId(stop_id);
      if(this.pid == "") this.pid = stop_id;
      if(stop_id.indexOf("NYT") == 0) 
      {
        this.agency = "NYT"; 
        this.bNYT = true;
        this.inc = 6; // NY stops.txt
      }
      else if(stop_id.indexOf("T_") == 0)
      {
        this.agency = "MBTA";
        this.bMBTA = true;  
        this.inc = 19; // MBTA stops.txt
        report("35 " + stop_id + " " + this.pid);
      }
      else if(stop_id.indexOf("WMA") == 0)
      {
        this.agency = "WMATA";
        this.bWMATA = true;  
        this.inc = 19; 
        report("35 " + stop_id + " " + this.pid);
      }
      else if(stop_id.indexOf("B_") == 0)
      {
        this.agency = "BART";
        this.bBART = true;  
        this.inc = 12; 
        report("52 " + stop_id + " " + this.pid);
      }
      };
  this.getDoorName = function(i) {
      let name = "";
      if((i != null) && (i < this.DOORS.length))
      {
        name = this.DOORS[i];
      }
      return(name);
      };
  this.getStopName = function(i) {
      let name = "";
      if(i < this.STOPS.length)
      {
        name = this.STOPS[i];
      }
      return(name);
      };
  this.setSelectedDoor = function(i) {
      this.selectedDoorIndex = i;
  };
  this.setSelectedStop = function(i) {
      this.selectedStopIndex = i;
  };
  this.selectedDoorIndex = null;
  this.selectedStopIndex = null;
  this.pathwayOptions = [];
  this.nobs = [];
  this.DDATA = [];
  this.DDATA2 = [];
  this.DDATA3 = [];
  this.DOORS = [];
  this.DOORSI = [];
  this.NODES = [];
  this.NODESI = [];
  this.STOPS = [];
  this.STOPSI = [];
  this.PWS = [];
  this.PWSI = [];
  this.ELEV = [];
  this.ELEVI = [];
  this.STAIRS = [];
  this.STAIRSI = [];
  this.clearPathArrays = function() {
      clearArray(this.DDATA);
      clearArray(this.DOORS);
      clearArray(this.DOORSI);
      clearArray(this.NODES);
      clearArray(this.NODESI);
      clearArray(this.STOPS);
      clearArray(this.STOPSI);
      clearArray(this.PWS);
      clearArray(this.PWSI);
      clearArray(this.ELEV);
      clearArray(this.ELEVI);
      clearArray(this.STAIRS);
      clearArray(this.STAIRSI);
      clearArray(this.nobs);
      };
  let that = this;
  this.getPathwayObjects = async function() {
    report("97 getPathwayObjects " + that.bNYT + " " + that.bMBTA);
   let p = new Promise(async function(resolve, reject) {
    let j = that.pid.indexOf("place-");
    let INC = that.inc;
    let d = "MBTA_GTFS";
    let i = 0;
    if(that.bNYT) 
    {
        d = "NYT_pathways";
        let INCSTOPS = 6; // was 7
        let INCPWS = 10; // was11
        let grepi = "," + that.stop_id.substring(3);
        report("88 stop_id = " + grepi);
        let data = await getGTFSInfo(grepi, d + "/pathways.txt");
    
        that.DDATA = splitCSV2(data); // splitCVS(data);
        let k = that.DDATA.length;
        report("93 DDATA.length = " + k);
        if(k > 0)
        {
          let pix = that.DDATA[0].substring(0, that.DDATA[0].indexOf("-"));
          report("107 pix = " + pix);
          that.DDATA = [];
          let data2 = await getGTFSInfo(pix, d + "/stops.csv");
          that.DDATA = splitCSV2(data2); //splitCVS(data2);
 //         report("130 " + that.DDATA[0] + " " + that.DDATA[1] + " "+ that.DDATA[2] + " "+ that.DDATA[3] + " "+ that.DDATA[4] + " "+ that.DDATA[5] + " "+ that.DDATA[6] + " "+ that.DDATA[7] + " "); 
          k = that.DDATA.length;
          if(k > 0)
          {
            i = 0;
            for(i = 0; i < k; i+= INCSTOPS)  
            {
              if(that.DDATA[i].indexOf("ENTRANCE-") != -1)
              {
                that.DOORS.push(that.DDATA[i+1]);
                that.DOORSI.push(i);
              }
              else if(that.DDATA[i].indexOf("MEZZANINE-") != -1)
              {
                that.NODES.push(that.DDATA[i+1]);
                that.NODESI.push(i);
              }
              else
              {
 //                   that.STOPS.push(that.DDATA[i+1]);
 //                   that.STOPSI.push(i);
              }
             }
             
             let data2 = await getGTFSInfo(pix, d + "/pathways.txt"); 
             that.DDATA2 = splitCSV2(data2); //splitCVS(data2);
             let k2 = that.DDATA2.length;
//             report("157 " + that.DDATA2[0] + " " + that.DDATA2[1] + " " + that.DDATA2[2] + " " + that.DDATA2[3] + " " + that.DDATA2[4] + " " + that.DDATA2[5] + " " + that.DDATA2[6] + " " + that.DDATA2[7] + " " + that.DDATA2[8] + " :" + that.DDATA2[9] + " ");
             if(k2 > 0)
             {
               let i2 = 0;
               for(i2 = 0; i2 < k2; i2 += INCPWS)  
               {
                 that.PWS.push(that.DDATA2[i2+1]);
                 that.PWSI.push(i2);
               }
             }
             
             let sid2 = grepi.substring(1) + "N,";
             report("149 sid2 = " + sid2);
             let data3 = await getGTFSInfo(sid2, d + "/stops.txt");
             that.DDATA3 = splitCSV2(data3); //splitCVS(data3);
             let k3 = that.DDATA3.length;
             if(k3 > 0)
             {
                let i3 = 0;
                for(i3 = 0; i3 < k3; i3+= INCSTOPS) 
                {
                  that.STOPS.push(that.DDATA3[i3] + ":" + that.DDATA3[i3+1]);
//                  that.STOPSI.push(i3);
                }
             } 
             
             sid2 = grepi.substring(1) + "S,";
             data3 = await getGTFSInfo(sid2, d + "/stops.txt");
             that.DDATA3 = splitCSV2(data3); //splitCVS(data3);
             k3 = that.DDATA3.length;
             if(k3 > 0)
             {
                let i3 = 0;
                for(i3 = 0; i3 < k3; i3+= INCSTOPS) 
                {
                  that.STOPS.push(that.DDATA3[i3] + ":" + that.DDATA3[i3+1]);
 //                 that.STOPSI.push(i3);
                }
             }
 
                  
          }
        }
        resolve(null);        
    }
    else if(that.bBART)  // BART
    {
      d = "BART_GTFS";
      if(j != -1)
      {
        that.clearPathArrays(); 
        report("217: try getGTFSInfo " + that.pid);
        let data3 = await getGTFSInfo(that.pid, d + "/facilities.txt");
        that.DDATA3 = splitCSV2(data3); 
        let k3 = that.DDATA3.length;
        if(k3 > 0)
        {
          let i3 = 0;
          for(i3 = 0; i3 < k3; i3+= that.inc) 
          {
            if(that.DDATA3[i3+1].indexOf("Entrance") != -1)
            {
              that.DOORS.push(that.DDATA3[i3+1]);
              that.DOORSI.push(i3);
            }
          }
        }
        report("233: " + that.stop_id + " doors.length = " + that.DOORS.length);
        resolve(null);
      }
    }
    else if(that.bMBTA)  // MBTA
    {
      d = "MBTA_GTFS";
      if(j != -1)
      {
        that.clearPathArrays(); 
        report("65: try getStopInfo " + that.pid);
//        let p2 = serviceEO.getStopsInfo2(that.pid, d);
//        p2.then(function(data){
        let sid = that.pid;
        if(that.pid.indexOf("T_") == 0) sid = sid.substring(2);
//        let data = await serviceEO.getStopsInfo2(sid, d);
        let data = await getGTFSInfo(sid, d+ "/stops.txt");
        that.DDATA = splitCVS(data);
        let k = that.DDATA.length;
        report("70: DDATA.length = " + k + data);
        
        i = 0;
        for(i = 0; i < k; i+= INC)
        {
          if(that.DDATA[i].indexOf("door-") == 0)
          {
            that.DOORS.push(that.DDATA[i+3]);
            that.DOORSI.push(i);
          }
          else if(that.DDATA[i].indexOf("node-") == 0)
          {
            that.NODES.push(that.DDATA[i]);
            that.NODESI.push(i);
          }
          else
          {
            let s = that.DDATA[i+3];
            if(s == "") s = that.DDATA[i+2];
            if((typeof s !== 'undefined') && (that.DDATA[i] != that.pid))
            {
              that.STOPS.push(that.DDATA[i] + ":" + s);
              that.STOPSI.push(i);
            }
          }
        }
        
        let pix2 = that.pid.substring(that.pid.indexOf("-") + 1);
        if(pix2 != "north")
        {
          let data2 = await getGTFSInfo(pix2, d + "/pathways.txt"); 
          let INCPWS = 16;
          that.DDATA2 = splitCVS(data2);
          let k2 = that.DDATA2.length;
          report("232 INCPWS = " + INCPWS + " DDATA2.length = " + k2 + " " + pix2);
          if(k2 > 0)
          {
            let i2 = 0;
            for(i2 = 0; i2 < k2; i2 += INCPWS)  
            {
              that.PWS.push(that.DDATA2[i2+1]);
              that.PWSI.push(i2);
            }
          }
        }

        report("115: " + that.stop_id + " doors.length = " + that.DOORS.length + " nodes = " + that.NODES.length + " stops= " + that.STOPS.length);
        resolve(null);
      } 
    }
    else if(that.bWMATA) 
    {
        d = "WMATA";
        let INCSTOPS = 10;
        let INCPWS = 12;
        let grepi = that.stop_id.substring(3) ;
        report("268 stop_id = " + grepi);
        let data = await getGTFSInfo(grepi, d + "/stops.txt"); 
    
        that.DDATA = splitCVS(data);
        let k = that.DDATA.length;
        report("273 DDATA.length = " + k);
        for(i = 0; i < k; i+= INCSTOPS)
        {
          if(that.DDATA[i].indexOf("ENT_") == 0)
          {
            that.DOORS.push(that.DDATA[i+2]);
            that.DOORSI.push(i);
          }
          else if(that.DDATA[i].indexOf("NODE_") == 0)
          {
            that.NODES.push(that.DDATA[i]);
            that.NODESI.push(i);
          }
          else
          {
            let s = that.DDATA[i+2];
            if(s == "") s = that.DDATA[i+1];
            if(typeof s !== 'undefined')
            {
              that.STOPS.push(s);
              that.STOPSI.push(i);
            }
          }
        }
        
        let pix2 = that.stop_id.substring(3) + "_";
        let data2 = await getGTFSInfo(pix2, d + "/pathways.txt"); 
        that.DDATA2 = splitCVS(data2);
        let k2 = that.DDATA2.length;
        report("302 INCPWS = " + INCPWS + " DDATA2.length = " + k2 + " " + pix2);
        if(k2 > 0)
        {
          let i2 = 0;
          for(i2 = 0; i2 < k2; i2 += INCPWS)  
          {
            that.PWS.push(that.DDATA2[i2]);
            that.PWSI.push(i2);
          }
        }
      resolve(null);
    }
    });
  return(p);
  };
  this.getDoorLocation = function(index) {
      let x = null;
      if(this.bMBTA) x = {lat: this.DDATA[this.DOORSI[index] + 6], lon: this.DDATA[this.DOORSI[index] + 7]};
      else if(this.bNYT)
      {
          let lat = this.DDATA[this.DOORSI[index] + 2].replace(/"/g, '');
          let lon = this.DDATA[this.DOORSI[index] + 3].replace(/"/g, '');
          x = {lat: lat, lon: lon};
      }
      else if(this.bWMATA)
      {
          let lat = this.DDATA[this.DOORSI[index] + 3].replace(/"/g, '');
          let lon = this.DDATA[this.DOORSI[index] + 4].replace(/"/g, '');
          x = {lat: lat, lon: lon};
      }
      else if(this.bBART)
      {
          let lat = this.DDATA3[this.DOORSI[index] + 4].replace(/"/g, '');
          let lon = this.DDATA3[this.DOORSI[index] + 5].replace(/"/g, '');
          x = {lat: lat, lon: lon};
      }
      return(x);
  };
  this.getDistanceToDoor = function(i) {
      let doorloc = this.getDoorLocation(i);
      let d2door = getDistanceBetween(doorloc.lat, doorloc.lon, Xpos, Ypos);
//      if(d2door < 1) d2door = Math.round(5280 * d2door) + " feet away.";
//      else d2door = Math.round(d2door) + " miles away.";
      return(d2door);
  };
  this.getPathwayOptions = function() {
    let p = new Promise (function(resolve, reject) {
        that.pathwayOptions = [];
        
        resolve(that.pathwayOptions);
    });
    return(p);
  };
}

function updateList(listarray)
{
  let ss = document.getElementById("sellist");
  let j = ss.children.length - 1;
  while( j >= 0)
  {
    ss.remove(j);
    j -= 1;
  } 
  let i = 0;
  let k = listarray.length;
  for(i=0; i<k; i++)
  {
    let op = document.createElement("option");   
    op.text = listarray[i];
    ss.add(op);
  }
}

let selP = null;
let selMode = 0;
let ft = 0;

function selWin()
{
  closeMenuById("SELW");
  let x = document.getElementById("sellist").selectedIndex;
  let selidx = document.getElementById("sellist").selectedIndex;
  
  if(selMode == 0)
  {
    let y = document.getElementById("fstopfrom");
    y.selectedIndex = 0;
    y.getElementsByTagName("option")[0].innerHTML = document.getElementById("sellist").value;
  }
  else if(selMode == 1)
  {
    let y = document.getElementById("fstopto");
    y.selectedIndex = 0;
    y.getElementsByTagName("option")[0].innerHTML = document.getElementById("sellist").value;    
  }
  let a = DOORSI;
  if(ft == 1) a = STOPSI;
  if(selMode == 0)
  {
    pathway.fromid = DDATA[a[selidx]];
    pathway.fromdesc = DDATA[a[selidx]+3];
    pathway.fromlevel = DDATA[a[selidx]+11];
    pathway.fromlat = DDATA[a[selidx]+6];
    pathway.fromlon = DDATA[a[selidx]+7];
  }
  else
  {
    pathway.toid = DDATA[a[selidx]];
    pathway.todesc = DDATA[a[selidx]+3];
    pathway.tolevel = DDATA[a[selidx]+11];
    pathway.tolat = DDATA[a[selidx]+6];
    pathway.tolon = DDATA[a[selidx]+7];
  }
  
}

function selectDoor(i)
{
  if((eopw != null) && (i < eopw.DOORS.length))   
  {
    if(i == eopw.selectedDoorIndex) eopw.setSelectedDoor(null);
    else eopw.setSelectedDoor(i); 
    updateDisplay();
  }
}

function selectClosestDoor()
{
  CloseMenu();
  let i9 = -1;
  if(eopw != null)
  {
    let d = 1000000;
    let ssi = null;
    let k9 = eopw.DOORS.length;
    for(i9 = 0; i9 < k9; i9++)
    {
      let d2door = eopw.getDistanceToDoor(i9);
      if(d2door < d) 
      {
        ssi = i9;
        d = d2door;
      }
    }
    eopw.setSelectedDoor(ssi);
    updateDisplay();
  }
}



function Pathway()
{
  this.fromid = "";
  this.fromdesc = "";
  this.fromlevel = "";
  this.fromlat = "";
  this.fromlon = "";
  this.toid = "";
  this.todesc = "";
  this.tolevel = "";
  this.tolat = "";
  this.tolon = "";
  this.wheelchair= false;
  this.neardoor = 0;
  this.pwlegs = [];
  this.pwlastlegs = [];
}

function PWLeg(idx, type)
{
  this.idx = idx;
  this.type = type;
}

let pathway = null;

function showPMap()
{
  if(document.getElementById("smp").checked)
  {
 //   if(map == null) bEoMap = true;
    selectFromMap();
    if(bGetInfo)
    {
      plotObjects();
    }
    else setTimeout(plotObjects, 5000);
  }
}

function getPathway()
{
  CloseMenu();
  bGetInfo = false;
  if(bOnLine)
  {
    let p = getPathwayObjects();
    p.then(function(t){
        bGetInfo = true;
        report("DOORS.length = " + DOORS.length + ", STOPS.length = " + STOPS.length + "  NODES.length = " + NODES.length);
        if(map != null)
        {
          plotObjects();   
        }
        else report("map is null");
    }).catch(function(e){
        report("getPathway did not get external data");
    });
  }
  document.getElementById("fstopfrom").getElementsByTagName("option")[0].innerHTML = "-";
  document.getElementById("fstopto").getElementsByTagName("option")[0].innerHTML = "-";
  pathway = new Pathway();
  selMode = 0;
//  fcheck(1);
//  selMode = 1;
//  fcheck(3);
//  menu("FSTOP");
  if(!bOnLine) report("You must be on-line for Pathways.");
}

function fcheckFrom()
{
  selMode = 0;
  fcheck(document.getElementById("fstopfrom").selectedIndex);
}

function fcheckTo()
{
  selMode = 1;
  fcheck(document.getElementById("fstopto").selectedIndex);
}

function getIndexClosestDoor()
{
  let k = DOORS.length;
  let i = 0;
  let dmin = 10000;
  let idx = -1;
  while(i < k)
  {
    let d = getDistanceToHere(DDATA[DOORSI[i]+6],DDATA[DOORSI[i]+7]);
    if(d < dmin)
    {
      dmin = d;
      idx = i;
    }
    i += 19;
  }
  pathway.neardoor = dmin;
  return(idx);
}

function fcheck(si)
{
  switch(si)
  {
    case 1: // Here
        
        break;
    case 2: // selected
        
        break;
/*    case 1:  // closest door
      ft = 0;
      if(bGetInfo)
      {
        let idx = getIndexClosestDoor();
        let y = document.getElementById("fstopfrom");
        if(selMode == 1)
        {
          y = document.getElementById("fstopto");
        }
        y.selectedIndex = 0;
        y.getElementsByTagName("option")[0].innerHTML = DOORS[idx+3];
        if(selMode == 0)
        {
          pathway.fromid = DDATA[DOORSI[idx]];
          pathway.fromdesc = DOORS[idx+3];
          pathway.fromlevel = DDATA[DOORSI[idx]+11];
          pathway.fromlat = DDATA[DOORSI[idx]+6];
          pathway.fromlon = DDATA[DOORSI[idx]+7];
        }
        else
        {
          pathway.toid = DDATA[DOORSI[idx]];
          pathway.todesc = DOORS[idx+3];
          pathway.tolevel = DDATA[DOORSI[idx]+11];
          pathway.tolat = DDATA[DOORSI[idx]+6];
          pathway.tolon = DDATA[DOORSI[idx]+7];
        }
        
      }
      break;
      */
    case 3:  // select door from list
      ft = 0;
      if(!bGetInfo)
      {
        let p = getPathwayObjects();
        p.then(function(data){
          updateList(DOORS);
          let x = document.getElementById("SELW");
          x.style.top = menux[1] + "px";
          x.style.visibility = "visible";
        }).catch(function(error){
          report(error);
          });
      }
      else
      {
          updateList(DOORS);
          let x = document.getElementById("SELW");
          x.style.top = menux[1] + "px";
          x.style.visibility = "visible";        
      }
      break;
      /*
    case 3:  // current stop/track
      ft = 1;
      let y = document.getElementById("fstopfrom");
      if(selMode == 1)
      {
        y = document.getElementById("fstopto");
      }
      y.selectedIndex = 0;
      y.getElementsByTagName("option")[0].innerHTML = Place;
      let k = STOPS.length;
      let i = 0;
      let b = true;
      let idx = -1;
      while(b && (i < k))
      {
        if(Place_id == DDATA[STOPSI[i]])
        {
          b = false;
          idx = i;
        }
        i += 15;
      }
      if(idx == -1) report("Place not found in STOPS");
      else
      {
        if(selMode == 0)
        {
          pathway.fromid = DDATA[STOPSI[idx]];
          pathway.fromdesc = STOPS[idx+3];
          pathway.fromlevel = DDATA[STOPSI[idx]+11];
          pathway.fromlat = DDATA[STOPSI[idx]+6];
          pathway.fromlon = DDATA[STOPSI[idx]+7];
        }
        else
        {
          pathway.toid = DDATA[STOPSI[idx]];
          pathway.todesc = STOPS[idx+3];
          pathway.tolevel = DDATA[STOPSI[idx]+11];
          pathway.tolat = DDATA[STOPSI[idx]+6];
          pathway.tolon = DDATA[STOPSI[idx]+7];
        }
      }
      break;
      */
    case 4:  // select stop/track from list
      ft = 1;
      if(!bGetInfo)
      {
       let p = getPathwayObjects();
        p.then(function(data){
          updateList(STOPS);
          let x = document.getElementById("SELW");
          x.style.top = menux[1] + "px";
          x.style.visibility = "visible";
        }).catch(function(error){
          report(error);
          });
      }
      else
      {
          updateList(STOPS);
          let x = document.getElementById("SELW");
          x.style.top = menux[1] + "px";
          x.style.visibility = "visible";        
      }
      break;
    default:
      break;
  }

}

let bGetInfo = false;
let DDATA = [];
let DOORS = [];
let DOORSI = [];
let NODES = [];
let NODESI = [];
let STOPS = [];
let STOPSI = [];

function clearPathArrays()
{
  clearArray(DDATA);
  clearArray(DOORS);
  clearArray(DOORSI);
  clearArray(NODES);
  clearArray(NODESI);
  clearArray(STOPS);
  clearArray(STOPSI);
}

function getPathwayObjects()
{
  let p = new Promise(function(resolve, reject) {
    let pid = getParentIdFromId(Place_id);
    let j = pid.indexOf("place-");
    clearReport();
    const INC = 19; // was 15
    if(j != -1)
    {
      clearPathArrays(); 
//      let p2 = serviceEO.getStopsInfo(pid);
      let p2 = getGTFSInfo(pid, "MBTA_GTFS/stops.txt")
      p2.then(function(data){
        DDATA = splitCVS(data);
        let k = DDATA.length;
//        report("DDATA.length = " + k);
        let i = 0;
        for(i = 0; i < k; i+= INC)
        {
//          report(": " + DDATA[i]);
          report("576 " + DDATA[i] + " " + DDATA[i+1] + " " + DDATA[i+2] + " " + DDATA[i+3] + " " + DDATA[i+4] + " " + DDATA[i+5] + " " + DDATA[i+6] + " " + DDATA[i+7] + " " + DDATA[i+8] + " " + DDATA[i+9] + " " + DDATA[i+10] + " " + DDATA[i+11] + " " + DDATA[i+12] + " " + DDATA[i+13] + " " + DDATA[i+14] + " " + DDATA[i+15] + " " + DDATA[i+16]);
          if(DDATA[i].indexOf("door-") == 0)
          {
            DOORS.push(DDATA[i+2]);
            DOORSI.push(i);
          }
          else if(DDATA[i].indexOf("node-") == 0)
          {
            NODES.push(i);
            NODESI.push(i);
          }
          else
          {
            STOPS.push(DDATA[i+2]);
            STOPSI.push(i);
          }
        }
//        report("doors.length = " + DOORS.length);
        resolve(null);
      } ).catch(function(error){
        reject(error);
      });
    }
  });
  return(p);
}

function plotObjects()
{
  if((map != null)) // && bEoMap)
  {
    map.doors = [];
    report("DOORSI.length = " + DOORSI.length);
    if(DOORSI.length > 0)
    {
      let k = DOORSI.length;
      let i = 0;
      while(i < k)
      {
        let lat = DDATA[DOORSI[i]+6];
        let lon = DDATA[DOORSI[i]+7];
        let mp = {lat: lat, lng: lon};
        let x = new MAPCLASS.Marker({
                    position:mp,
                    map: map,
                    title: 'Door',
                    icon: 'images/doorb.png'
                    });
        let sc = '<div id="content">Entrance / Exit<br><br>' + DDATA[DOORSI[i]+3] + '<br>' + DDATA[DOORSI[i]+11] + '</div>';
        x.sc = sc;
        if((!bEoMap) && (!bOSM)) google.maps.event.addListener(x,'click', function() {
            infow.close();
            infow.setContent(this.sc);
            infow.open(map, this);
            });
        x.setMap(map);
        x.setPosition(new MAPCLASS.LatLng(lat, lon));
        map.doors[map.doors.length] = x;
        i += 1;
      }
    }
    report("STOPSI.length = " + STOPSI.length);
    if(STOPSI.length > 0)
    {
      let k = STOPSI.length;
      let i = 0;
      while(i < k)
      {
        let lat = DDATA[STOPSI[i]+6];
        let lon = DDATA[STOPSI[i]+7];
        let mp = {lat: lat, lng: lon};
        let x = new MAPCLASS.Marker({
                    position:mp,
                    map: map,
                    title: 'Stop',
                    icon: 'images/nodeb.png'
                    });
        let sd = DDATA[STOPSI[i]+3];
        if((sd == null) || (sd == ""))
        {
            sd = DDATA[STOPSI[i]+2];
        }
        let sc = '<div id="content">Stop<br><br>' + sd + '<br>' + DDATA[STOPSI[i]+11] + '</div>';
        x.sc = sc;
        if((!bEoMap) && (!bOSM)) google.maps.event.addListener(x,'click', function() {
            infow.close();
            infow.setContent(this.sc);
            infow.open(map, this);
            });
        x.setMap(map);
        x.setPosition(new MAPCLASS.LatLng(lat, lon));
        i += 1;
      }
    }
    
  }
}

function reversePath()
{
  let si = document.getElementById("fstopfrom").value;
  let ei = document.getElementById("fstopto").value;
  let isi = document.getElementById("fstopfrom").selectedIndex;
  let iei = document.getElementById("fstopto").selectedIndex;
  document.getElementById("fstopfrom").selectedIndex = 0;
  document.getElementById("fstopto").selectedIndex = 0;
  document.getElementById("fstopfrom").getElementsByTagName("option")[0].innerHTML = ei;
  document.getElementById("fstopto").getElementsByTagName("option")[0].innerHTML = si;
  document.getElementById("fstopfrom").value = ei;
  document.getElementById("fstopto").value = si;
  fstopfromi = null;
  fstoptoi = null;
}

const PWM_WALKWAY = 1;
const PWM_STAIRS = 2;
const PWM_MVSIDEWALK = 3;
const PWM_ESCALATOR = 4;
const PWM_ELEVATOR = 5;
const PWM_FAREGATE = 6;
const PWM_EXITGATE = 7;

function findPathway1()
{
  if(pathway != null)
  {
    let sel1 = document.getElementById("fstopfrom").selectedIndex;
    let sel2 = document.getElementById("fstopto").selectedIndex;
    switch(sel1)
    {
        case 1: // Here
            pathway.fromlat = Xpos;
            pathway.fromlon = Ypos;
            pathway.fromdesc = "Here";
            break;
        case 2: // Selected
            pathway.fromid = Place_id;
            pathway.fromdesc = Place;
            break;
        case 3: // Select entrance/exit 
            break;
        case 4: // Select stop/track
            break;
        default:
            break;
    }
    let s = "Find the pathway\nfrom: " + pathway.fromdesc + "\n" + pathway.fromlevel + "\nto: " + pathway.todesc + "\n" + pathway.tolevel;
    let bwcp = document.getElementById("wcp").checked;
    if(bwcp) s = s + "\nUse wheelchair path.";
    if(confirm(s))
    {
      plotObjects();
      report(s + "\n\n");
      let INC = 19;  // was 15
      let PWSI1 = [];
      let PWSI2 = [];
      let p = serviceEO.getPathwaysInfoByStop(pathway.fromid);
      p.then(function(data){
        let PWS = splitCVS(data);
        let k = PWS.length;
        report("PWS.length = " + k);
        let i = 0;
        for(i = 0; i < k; i+= INC)
        {
          let fid = PWS[i+1];
          let tid = PWS[i+2];
          let bdir = PWS[i+5];
          report("fid = " + fid + " tid = " + tid + " " + pathway.fromid + " " + pathway.toid);
          if((fid == pathway.fromid) || ((tid == pathway.fromid) && (bdir == 1)))
          {
            PWSI1.push(i);
            if((tid == pathway.toid) || ((fid == pathway.toid) && (bdir == 1)))
            {
              // this is a solution
                report("Solution: " + PWS[i] + " " + PWS[i+8] + "/" + PWS[i+9] + " sec " + PWS[i+ 12] ); 
            }
            else
            {
               report("  a. " + PWS[i+1] +" " + PWS[i+2] + " " + PWS[i+ 12]);
               
            }
          }
          else
          {
            if((tid == pathway.toid) || ((fid == pathway.toid) && (bdir == 1)))
            {
              PWSI2.push(i);
              report("  b. " + PWS[i+1] +" " + PWS[i+2] + " " + PWS[i+ 12]);
            }
              
          }
        }
      CloseMenu();
      
    });
  }
//  CloseMenu();
}

}

function stopSPGY()
{
  if(SPGY != null)
  {
    if(bSPGYrender)
    {
      SPGY.renderer.stop();   
    }
    bSPGYrender = !bSPGYrender;
  }
}

function showPathways(stop_id)
{
  clearReport();
  report("769 showPathways " + stop_id + " " + CAVS.width + " " + CAVS.height);
//  showDMap(true);
  let dmap = document.getElementById("DMap");
  let r = dmap.getBoundingClientRect();
//  report("771 " + r.width + " " + r.height);
  if(eopw == null)
  {
    eopw = new eo_pathway();   
  }
  eopw.clearPathArrays();
  eopw.setStopId(Place_id);
  let pt1 = getPositionForId(Place_id);
  let graph = new Springy.Graph();
  SPGY = springy(
    {
      graph: graph,
      nodeSelected: function(node){
        console.log('Node selected: ' + JSON.stringify(node.data));
        }
    }
  );
  bSPGYrender = true;
  
  eopw.getPathwayObjects().then(function() {
    report("2187: " + eopw.DOORS.length + " DOORS, " + eopw.NODES.length + " NODES, " + eopw.STOPS.length + " STOPS, " + eopw.PWS.length + " PWs");
    DISPLAYTYPE = 7;
    updateDisplay();
    
  let k = eopw.STOPS.length;
  let i = 0;
  let s = "";
  for(i=0; i<k; i++)
  {
//    let s = eopw.DDATA3[j]; // .replaceAll("-", "_");
    report("808 STOPS " + eopw.STOPS[i] );
    s = eopw.STOPS[i];
    eopw.nobs.push({s: s, n: graph.newNode({label: s, color: '#00ff00'})});  
  }
  
  k = eopw.DOORSI.length;
  for(i=0; i<k; i++)
  {
    let j = eopw.DOORSI[i];
    s = eopw.DDATA[j]; //.replaceAll("-", "_");
    let s1 = eopw.DDATA[j+1];
    if(eopw.bMBTA) s1 = eopw.DDATA[j+2];
    report("814 DOORS " + j+1 + " " + s1);
//    eopw.nobs.push({s: s, n: graph.newNode({label: eopw.DDATA[j+1], color: '#ffff00'} )}); 
    if(s1.indexOf("Elevator") != -1)
    {
      let j1 = s1.indexOf("(") + 1;
      let j2 = s1.indexOf(")");
      let s2 = s1.substring(j1, j2);
      eopw.nobs.push({s: s, n: graph.newNode({label:  s1, color: '#ff0000'} )});  
        
    }
    else if(s1.indexOf("Escalator") != -1)
    {
      let j1 = s1.indexOf("(") + 1;
      let j2 = s1.indexOf(")");
      let s2 = s1.substring(j1, j2);
      eopw.nobs.push({s: s, n: graph.newNode({label:  s1, color: '#ff0000'} )});  
        
    }
    else 
    {
      let s2 = s.substring(s.indexOf("ENTRANCE-") + 9, s.length -1);
        eopw.nobs.push({s: s, n: graph.newNode({label: "Door " + s1, color: '#ff00ff'} )});  
    }
  }
  
  k = eopw.NODESI.length;
  for(i=0; i<k; i++)
  {
    let j = eopw.NODESI[i];
    s = eopw.DDATA[j]; //.replaceAll("-", "_");
    let i2 = s.indexOf("MEZZANINE-");
    let s2 = s;
    if(i2 != -1) s2 = s.substring(s.indexOf("MEZZANINE-") + 10, s.length);
    report("823 NODES " + j+1 + " " + eopw.DDATA[j+1]);
//    eopw.nobs.push({s: s, n: graph.newNode({label: eopw.DDATA[j+1], color: '#0000ff'} )});  
    eopw.nobs.push({s: s, n: graph.newNode({label: s2, color: '#0000ff'} )});  
  }
  
  k = eopw.PWSI.length;
  for(i=0; i<k; i++)
  {
    let d1 = getNobs(eopw.DDATA2[Number(eopw.PWSI[i])+1]);
    let d2 = getNobs(eopw.DDATA2[Number(eopw.PWSI[i])+2]);
    let sign = eopw.DDATA2[Number(eopw.PWSI[i])+5] + " // " + eopw.DDATA2[Number(eopw.PWSI[i])+6];
    if(eopw.bMBTA) sign = eopw.DDATA2[Number(eopw.PWSI[i])+12] + " // " + eopw.DDATA2[Number(eopw.PWSI[i])+ 15];
    if(d1 == null) report("992 d1 null " + (eopw.PWSI[i]+1) + " " + eopw.DDATA2[eopw.PWSI[i]+1]);
    if(d2 == null) report("993 d2 null " + (eopw.PWSI[i]+2) + " " + eopw.DDATA2[eopw.PWSI[i]+2]);
    if((d1 != null) && (d2 != null))
    {
      report("865 OK " + eopw.DDATA2[eopw.PWSI[i]] + " " + eopw.DDATA2[eopw.PWSI[i]+1] + " " + eopw.DDATA2[eopw.PWSI[i]+2] + " sign: " + sign);  
      graph.newEdge(d1, d2, {color: '#000000', label: sign});  
    }
    else report("838 ERR " + eopw.DDATA2[eopw.PWSI[i]] + " " + eopw.DDATA2[eopw.PWSI[i]+1] + " " + eopw.DDATA2[eopw.PWSI[i]+2] + " sign: " + sign);
  }
  
/*  
let dennis = graph.newNode({
  label: 'Dennis',
  ondoubleclick: function() { console.log("Hello!"); }
});
let michael = graph.newNode({label: 'Michael'});
let jessica = graph.newNode({label: 'Jessica'});
let timothy = graph.newNode({label: 'Timothy'});
let barbara = graph.newNode({label: 'Barbara'});
let franklin = graph.newNode({label: 'Franklin'});
let monty = graph.newNode({label: 'Monty'});
let james = graph.newNode({label: 'James'});
let bianca = graph.newNode({label: 'Bianca'});

graph.newEdge(dennis, michael, {color: '#00A0B0'});
graph.newEdge(michael, dennis, {color: '#6A4A3C'});
graph.newEdge(michael, jessica, {color: '#CC333F'});
graph.newEdge(jessica, barbara, {color: '#EB6841'});
graph.newEdge(michael, timothy, {color: '#EDC951'});
graph.newEdge(franklin, monty, {color: '#7DBE3C'});
graph.newEdge(dennis, monty, {color: '#000000'});
graph.newEdge(monty, james, {color: '#00A0B0'});
graph.newEdge(barbara, timothy, {color: '#6A4A3C'});
graph.newEdge(dennis, bianca, {color: '#CC333F'});
graph.newEdge(bianca, monty, {color: '#EB6841'});
*/
/*
  eopw.getPathwayObjects().then(function() {
    report("2187: " + eopw.DOORS.length + " DOORS, " + eopw.NODES.length + " NODES, " + eopw.STOPS.length + " STOPS, " + eopw.PWS.length + " PWs");
    */
  /*  
    let dennis = graph.newNode({
  label: 'Dennis',
  ondoubleclick: function() { console.log("Hello!"); }
});
   */ 

    }).catch(function(e) {
         report(e);
    });
  
}

function getNobs(s)
{
  let k = eopw.nobs.length;
  let i = 0;
  let b = true;
  let r = null;
  
  while(b && (i < k))
  {
    let t = eopw.nobs[i].s;
    let j = t.indexOf(":");
//    if(t.indexOf(s) != -1) report("1056 s = " + s + ", t = " + t); 
    if(j != -1) 
    {
//      t = "\"" + t.substring(0,j) + "\"";
      t = t.substring(0,j);
    }
    if(s == t)
    {
      b = false;
      r = eopw.nobs[i].n;
    }
    i += 1;
  }
  return(r);
}


