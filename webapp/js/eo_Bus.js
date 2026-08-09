// eo_Bus.js

//let BusRoutes = [];


function loadBusListList()
{
  let ss = document.getElementById("buscarrierlist");
  let si = ss.selectedIndex;
  let i = ss.children.length - 1;
  while( i >= 0)
  {
    ss.remove(i);
    i -= 1;
  }
  let k = BusList.length;
  for(i=0; i<k; i++)
  {
    let op = document.createElement("option");
    let a = BusList[i];
    op.text = a.name;
    op.bci = i;
    ss.add(op);
  }
    
}

function checkLoadable2(stop_id)
{
  bProc2 = false;
  let p = null;
  
  if(!bOnLine || bNetFail) ;
  else if(isNaN(stop_id))
  {
    let b = true;
    
  }
  
}

function buschg2()
{
  let p = null;
  let b = true;
  
  let ss = document.getElementById("buscarrierlist");
  let si = ss.selectedIndex;
  let cn = "";
  let cnt = "";
  let a = BusList[si];
  if(! a.loaded) 
  {
      p = checkLoadable2(a.refstop);
      if(p != null) p.then(updateBusList());
  }
  else updateBusList();
  
}

function updateBusList2()
{
  let ss = document.getElementById("buslist");
  let si = ss.selectedIndex;
  let i = ss.children.length - 1;
  while( i >= 0)
  {
    ss.remove(i);
    i -= 1;
  }
//  let bm = document.getElementById("mbtabus").checked;
  let k = 0;
  let inc = 5;
  let a = [];
  let offset = 2;
  let bsfsel = false;
  let ss2 = document.getElementById("buscarrierlist");
  let si2 = ss2.selectedIndex;
  let d = BusList[si2];
  if(typeof d.routemap != 'undefined')
  {
    let k = d.routemap.length;
    let i = 0;
    while(i<k)
    {
      let op = document.createElement("option");
      let t = "";
      if((typeof d.bsfsel !== 'undefined') && d.bsfsel) t = d.routemap[i+1] + " : " + d.routemap[i+ d.offset];
      else t = d.routemap[i] + " : " + d.routemap[i + d.offset];
      op.text = t;
      ss.add(op);
      i += d.inc; 
    }
    if((si >= 0) && (si < k)) ss.selectedIndex = si;
  }
}

function setRoutemap(c, a, map)
{
  let k = a.length;
  let i = 0;
  let b = true;
  while(b && (i<k))
  {
    if(a[i].id == c)
    {
      b = false;   
    }
    else i += 1;
  }
  if(!b)
  {
    a[i].routemap = map;   
  }
  return(!b);
}
