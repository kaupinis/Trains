// eo_pb.js
"use strict";
// worker support

const PBURL = "https://www.eightolives.com/forms/eo_RT.php";

var abortController = null;
var signal = null;
var eopb = null;
var bisWorker = false;
var Url = "";

function sendMessagePB(func, data) 
{
   postMessage([func, data]);
}

if(typeof pbworker === 'undefined')
{
onmessage = function(evt) {
    var m = evt.data;
//    console.log("18pb " + m[0] + " " + m[1]);
   console.log("22pb " + m[0] );
   switch(m[0])
    {
        case 0:  // initialize
            bisWorker = true;
            abortController = new AbortController();
            signal = abortController.signal;
            eopb = null;
            eopb = new eo_pb();
            eopb.setDecoder(new GTFSdecoder());
            sendMessagePB(2, "eo_pb initialized as worker");
            break;
        case 1: // getData(n)
            var n = m[1];
            var url = PBURL + "?f=" + n;
            Url = url;
            console.log("33pb " + url);
            var p = fetch(url, {credentials: "include"}, signal).then(function(response) {
                response.arrayBuffer().then( function(a) {
                    var data = new Uint8Array(a);
                    console.log("42pb data.length = " + data.length);
                    var res = eopb.decode(data);
                    sendMessagePB(1, res);
                    data = null;
                }).catch(function(e) {
                    console.log(e);
                });
            }).catch(function(e) {
                console.log(e);
            });
            break;
        case 2: // abort fetch
            if(signal != null) abortController.abort();
            break;
        case 3:
 //           var data = new Uint8Array(m[1]);
            var res = eopb.decode(m[1]);
            sendMessagePB(1, res);
            break;
        default:
            
            break;
    }
};
}


/*
function getLendian()
{
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return( new Int16Array(buffer)[0] === 256);
}

var Lendian = getLendian(); // little endian
*/

// eo_pb

var bpbreport = false;
var bovreport = true;
var laststate = 0;

function greport(s)
{
    console.log(s);
}

function pbreport(s)
{
  if(bpbreport) greport(s);   
}
  
function ovreport(cs, tag)
{
  if(bovreport) greport("error: undefined case " + cs + " for tag.key = " + tag.key + " and tag.wt = " + tag.wt + " " + Url + " " + laststate);   
}

// define a pseudo-array

function PSA(buf, start, end)
{
  this.b = buf;
  this.i = 0;
  this.start = start;
  this.end = end;
  this.length = this.end - this.start;
  this.dataAvailable = function() {
      return((this.i + this.start) < this.end);
  };
  this.getBufferByte = function() {
      var r = null;
      if((this.i > 0) && (this.i < length))
      {
        r = this.b[this.i + this.start];   
      }
      return(r);
  };
}


function eo_pb()
{
  this.b = []; // Uint8Array
  this.psas = [];
  this.CurrentPSA = null;
  this.psa = null;
  this.decoder = null;
  this.k = 0;
  this.i = 0;
  this.dataAvailable = function() {
      return(this.i < this.k);
  };
  this.setBuffer = function(buff) {
      this.b = buff;
      this.k = buff.length;
      this.i = 0;
      this.pushPSA(new PSA(this.buf, 0, this.k));
  };
  this.pushPSA = function(px) {
      this.psas.push(px);
      this.CurrentPSA = px;
  };
  this.popPSA = function() {
      var r = false;
      if(this.psas.length > 1)
      {
        this.psas.pop();
        this.CurrentPSA = this.psas[this.psas.length -1];
        r = true;
      }
      return(r);
  };
  this.getCurrentPSA = function() {
      var n = this.psas.length;
      var ps2 = null;
      if(n > 0) ps2 = this.psas[n -1];
      this.CurrentPSA = ps2; 
      return(this.CurrentPSA);
  };
  this.getByte = function() {
      var x = null;
      if(this.CurrentPSA.i < this.CurrentPSA.length)
      {
        x = this.b[this.CurrentPSA.i + this.CurrentPSA.start];
        this.CurrentPSA.i += 1;
      }
      return(x);
  };
  this.get64Data = function() {
      var x = null;
      var ax = [];
      var s = 0;
      for(var j=0; j < 8; j++)
      {
        if(this.CurrentPSA.dataAvailable() && ((x = this.getByte()) != null))
        {
          ax.push(x);  
        }
      }
      if(ax.length == 8)
      {
        for(var j=0; j< 8; j++)
        {
          s <<= 8;
          s |= ax[7 -j];
        }
      }
      else pbreport("54 not enough data for 64 bits");
      return(s);
  };
  this.get32Data = function() {
      var x = null;
      var ax = [];
      var s = 0;
      for(var j=0; j < 4; j++)
      {
        if(this.CurrentPSA.dataAvailable() && ((x = this.getByte()) != null))
        {
          ax.push(x);  
        }
      }
      if(ax.length == 4)
      {
        for(var j=0; j< 4; j++)
        {
          s <<= 8;
          s |= ax[3 -j];
        }
      }
      else pbreport("77 not enough data for 32 bits");
      return(s);
  };
  this.getArray = function(psa) {
      var r = [];
      var x = null;
      var k = psa.end;
      for(var j= psa.start; j< k; j++)
      {
        if((x = this.b[j]) != null)
        {
          r[j] = x;
        }
      }
      return(r);
  };
  this.getString = function(psa) {
      var r = [];
      var x = null;
      var k = psa.end;
      for(var j= psa.start; j< k; j++)
      {
        if((x = this.b[j]) != null)
        {
          r[j] = String.fromCharCode(x);
        }
      }
      var s = r.join("");
      return(s);
  };
  this.getFloat = function(value, p) {
    var m = value & 0x7fffff;
    var exp = ((value >> 23) & 0x0ff) - 127;
    var s = (1 + m * Math.pow(2, -23)) * Math.pow(2, exp);
    if(value & 0x80000000) s = -s;
    if(p > 0)
    {
      s = s * Math.pow(10, p);
      s = Math.round(s);
      s = s / Math.pow(10, p);
    }
    return(s);
  };
  this.getBool = function(value) {
    return(value == 0);  
  };
  /* not needed for gtfs
  this.getSint32 = function(value {
      return value >>> 1 ^ -(value & 1) | 0;
  }
  */
  this.getLDelim = function(s) {
      var c = this.CurrentPSA;
      //pbreport("171 getdelim " + c.i + " " + c.start + " " + c.end + " " + s);
      var r = new PSA(this.b, c.i + c.start, c.i + c.start + s);
      return(r);
  };
  this.getVarint = function() {
      var x = null;
      var ax = [];
      var s = 0;
      var b = true;
      while(b && this.CurrentPSA.dataAvailable() && ((x = this.getByte()) != null))
      {
        ax.push(x & 0x7f);
        b = ((x & 0x80) != 0);
      }
      var kx = ax.length;
      for(var j=0; j< kx; j++)
      {
        s <<= 7;
        s |= ax[kx -1 -j];
      }
      return(s);
  };
  this.getTag = function() {
      var t = null;
      if(this.CurrentPSA.dataAvailable())
      {
        var s = null;
        var wt = null;
        s = this.getVarint();
        //pbreport("117 tag varint = " + s + " (0x" + s.toString(16) + ")");
        var ss = s >> 3;
        wt = s & 0x07;
        if((wt == 0) || (wt == 1) || (wt == 2) || (wt == 5)) ; // ok
        else pbreport("63 error - incorrect wire type " + wt);
        var t = new Tag(ss, wt);
      }
      return(t);
  };
  this.getValue = function(tag) {
      var v= "";
      var wt = tag.wt;
      switch(wt)
      {
          case 0:  // varint
              v = this.getVarint();
              break;
          case 1:  // 64 bit
              v = this.get64Data();
              break;
          case 2:  // length-delimited
//        pbreport("222 before getvarint i = " + c.i + " " + c.start + " " + c.end);
              var len = this.getVarint();
//        pbreport("224 afer varint i = " + c.i + " " + c.start + " " + c.end);
              //pbreport("139 length = " + len);
              v = this.getLDelim(len);
              break;
          case 3:  // sgroup deprecated
              var c = this.CurrentPSA;
              pbreport("316 sgroup detected at " + c.i);   
              break;
          case 4:  // egroup deprecated              
              var c = this.CurrentPSA;
              pbreport("319 egroup detected at " + c.i);   
              break;
          case 5:  // 32 bit
              v = this.get32Data();
              break;
          default:
              pbreport("85 illegal wt " + wt);
              break;
      }
      return(v);
  };
  this.setDecoder = function(decoder) {
      this.decoder = decoder;
      decoder.eopb = this;
  };
  this.decode = function(buf) {
      this.setBuffer(buf);
      //pbreport("\n\n226 decoding buffer of length = " + this.b.length);
//      greport("275 start at c.i = " + c.i + " " + c.start + " " + c.end + ", psas length = " + this.psas.length);
//      this.reportBytes(0, c.end);
      var b1 = true;
      var r = new Object();
      if(this.decoder != null)
      {
      while(b1 && this.CurrentPSA.dataAvailable())
      {
        var h = this.CurrentPSA.i;
        var hi = 0;
        var value = "";
 //       pbreport("255 before tag i = " + c.i + " " + c.start + " " + c.end);
        var tag = this.getTag();
 //       pbreport("257 after tag i = " + c.i + " " + c.start + " " + c.end);
        if(tag != null)
        {
          hi = this.CurrentPSA.i;
          value = this.getValue(tag);
          if(tag.wt == 2)
          {
            //pbreport("246  hi = " + hi + " wt = " + tag.wt + " key = " + tag.key + " " + value);
//            if(h < 50) this.reportBytes(value.start, value.end);
            this.CurrentPSA.i = this.CurrentPSA.i + value.length;  
          }
          else
          {
            pbreport("252  hi = " + hi + " wt = " + tag.wt + " key = " + tag.key + " " + value);
//            this.reportBytes(hi, c.i);
          }
          if(this.decoder != null)
          {
            this.decoder.nextState(tag, value);   
          }
        }
        else
        {
          if(this.psas.length > 1) 
          {
              //pbreport("288 pop psa");
              this.popPSA();
              this.decoder.popState();
          }
//          else b1 = false;   
        }
        if(!this.CurrentPSA.dataAvailable() && (this.psas.length > 1))
        {
          //pbreport("317 pop psa");
          this.popPSA();
          this.decoder.popState();
           while(!this.CurrentPSA.dataAvailable() && (this.psas.length > 1))
          {
            this.popPSA();   
            this.decoder.popState();
          }
       }
//        pbreport("  " + h + " " + this.getBufferByte());
//        b1 = h < 100;
      } // end while
      }
//      greport("336 end at c.i = " + c.i + " " + c.start + " " + c.end + ", psas length = " + this.psas.length);
      r = this.decoder.getResult();
      return(r);
   };
   this.reportBytes = function(start, end)
   {
     var j = start;
     var k = end;
     var m = 0;
     var b = true;
     var s = "";
     while(j < k)
     {
       var s1 = "";
       if((this.b[j] >= 32) && (this.b[j] < 127)) s1 = " (" + String.fromCharCode(this.b[j]) + ")";
       s += " 0x" + this.b[j].toString(16) + s1 + ",";
       m += 1;
       if(m > 7)
       {
         pbreport(s);
         m = 0;
         s = "";
       }
       j += 1;
     }
     pbreport(s);
   }
}

function Tag(k, wt)
{
  this.key = k;    // uint32
  this.wt = wt;  // wt 0 = varint; 1 = 64 bit; 2 = length delim; 5 32 bit;
}

function GTFSdecoder()
{
   this.r = new Object();
   this.u = null;
   this.tv = null;
   this.tu = null;
   this.b = false;
   this.bfirst = true;
   this.stu = null;
   this.eopb = null;
   this.states = [];
   this.state = 0;
   this.laststate = 0;
   this.states.push(this.state);
   this.getResult = function() {
       return(this.r);
   };
   this.setState = function(s) {
     //pbreport("376 setState, push " +  s);
     this.laststate = this.state;
     laststate = this.state;
     this.state = s;
     this.states.push(s);
   };
   this.popState = function()
   {
     if(this.states.length > 1) this.states.pop();
     this.state = this.states[this.states.length - 1];
     //pbreport("384 popState " + this.states[this.states.length - 1] + " " + this.states.length );
//     this.nextState(-1, 0);  
   };
}

GTFSdecoder.prototype.nextState = function(tag, value)
{
    /*
  if(this.b || (this.state == 500))
  {
    this.b = true;
    if(tag.wt == 2) console.log("470pb state = " + this.state + " " + tag.key + " wt = " + tag.wt + " value = " + this.eopb.getString(value));
    else console.log("471pb state = " + this.state + " " + tag.key + " wt = " + tag.wt + " value = " + value);
  }
  */
  switch(this.state)
  {
      case 0:  // FeedMessage
          if((tag.key == 1) && (tag.wt == 2)) // header
          {
            if(typeof this.r.header === 'undefined') this.r.header = new Object();
            
            this.eopb.pushPSA(value);
            //pbreport("358 pushPSA " + value.i + " " + value.start + " " + value.end + " " + value.length);
            this.setState(100);
          }
          else if((tag.key == 2) && (tag.wt == 2)) // entity
          {
            if(typeof this.r.entity === 'undefined') this.r.entity = [];
            var u1 = new Object();
            this.r.entity.push(u1);
            this.u = u1;
            this.eopb.pushPSA(value);
            //pbreport("392 pushPSA " + value.i + " " + value.start + " " + value.end + " " + value.length);
            this.setState(200);
          }
          else ovreport(0, tag);
          break;
      case 100:  // FeedHeader
          if((tag.key == 1) && (tag.wt == 2)) // gtfs_realtime_version
          {
            this.r.header.gtfs_realtime_version = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 0))  // incrementality
          {
             this.r.header.incrementality = value;  
          }
          else if((tag.key == 3) && (tag.wt == 0))  // timestamp uint64
          {
            this.r.header.timestamp = value;
          }
          else if((tag.key == 1001) && (tag.wt == 2)) // trip
          {
            this.r.header.nyct_feed_header = new Object(); 
            this.eopb.pushPSA(value);
            this.tv = this.r.header.nyct_feed_header;
            this.setState(101);
          }
          else if(tag == -1) this.state = 0;
          else ovreport(100, tag);
          break;
      case 101:
          if((tag.key == 1) && (tag.wt == 2)) // nyct_subway_version
          {
            this.r.header.nyct_feed_header.nyct_subway_version = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // trip_replacement_period
          {
            if(typeof this.r.header.nyct_feed_header.trip_replacement_period === 'undefined')
            {
                this.r.header.nyct_feed_header.trip_replacement_period = []; 
            }
            this.eopb.pushPSA(value);
            this.tv = new Object();
            this.r.header.nyct_feed_header.trip_replacement_period.push(this.tv);
            this.setState(102);
          }
          else ovreport(101, tag);           
          break;
      case 102:    // trip_replacement_period
          if((tag.key == 1) && (tag.wt == 2)) // route_id
          {
            this.tv.route_id = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // replacement_period
          {
            this.tv.replacement_period = new Object(); 
            this.eopb.pushPSA(value);
            this.tu = this.tv.replacement_period;
            this.setState(103);
          }
          else ovreport(102, tag);           
          break;
      case 103:   // TimeRange
          if((tag.key == 1) && (tag.wt == 0))  // start uint64
          {
            this.tu.start = value;
          }
          else if((tag.key == 2) && (tag.wt == 0))  // end uint64
          {
            this.tu.end = value;
          }
          else ovreport(103, tag);           
          break;
      case 200:   // FeedEntity
          if((tag.key == 1) && (tag.wt == 2)) // id
          {
            this.u.id = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 0)) // is_deleted
          {
            this.u.is_deleted = this.eopb.getBool(value);  
          }
          else if((tag.key == 3) && (tag.wt == 2)) // trip_update
          {
            if(typeof this.u.trip_update === 'undefined') this.u.trip_update = new Object(); 
            this.eopb.pushPSA(value);
            this.setState(300);
          }
          else if((tag.key == 4) && (tag.wt == 2)) // vehicle
          {
            if(typeof this.u.vehicle === 'undefined') this.u.vehicle = new Object();  
            this.eopb.pushPSA(value);
            this.setState(400);
         }
          else if((tag.key == 5) && (tag.wt == 2)) // alert
          {
            if(typeof this.u.alert === 'undefined') this.u.alert = new Object();
            this.eopb.pushPSA(value);
            this.setState(500);
          }
          else if((tag.key == 6) && (tag.wt == 2)) // shape
          {
            if(typeof this.u.shape === 'undefined') this.u.shape = new Object();
            this.eopb.pushPSA(value);
            this.setState(600);
          }
          else if((tag.key == 7) && (tag.wt == 2)) // stop
          {
            if(typeof this.u.stop === 'undefined') this.u.stop = new Object();
            this.eopb.pushPSA(value);
            this.setState(700);
          }
          else if((tag.key == 8) && (tag.wt == 2)) // trip_modifications
          {
            if(typeof this.u.trip_modifications === 'undefined') this.u.trip_modifications = new Object();
            this.eopb.pushPSA(value);
            this.setState(800);
          }
          else ovreport(200, tag);
         break;
      case 300:  // TripUpdate
          if((tag.key == 1) && (tag.wt == 2)) // TripDescriptor
          {
            if(typeof this.u.trip_update.trip === 'undefined') this.u.trip_update.trip = new Object(); 
            this.eopb.pushPSA(value);
            this.tv = this.u.trip_update.trip;
            this.setState(310);
          }
          else if((tag.key == 2) && (tag.wt == 2)) // stop_time_update
          {
            if(typeof this.u.trip_update.stop_time_update === 'undefined') 
            {
                this.u.trip_update.stop_time_update = [];  
            }
            var stu1 = new Object();
            this.u.trip_update.stop_time_update.push(stu1);
            this.stu = stu1;
            this.eopb.pushPSA(value);
            this.setState(330);
          }
          else if((tag.key == 3) && (tag.wt == 2)) // VehicleDescriptor
          {
            if(typeof this.u.trip_update.vehicle === 'undefined') this.u.trip_update.vehicle = new Object();
            this.tv = this.u.trip_update.vehicle;
            this.eopb.pushPSA(value);
            this.setState(320);
          }
          else if((tag.key == 4) && (tag.wt == 0))  // timestamp uint64
          {
            this.u.trip_update.timestamp = value;
          }
          else if((tag.key == 5) && (tag.wt == 0))  // delay int32
          {
            this.u.trip_update.delay = value;
          }
          else if((tag.key == 6) && (tag.wt == 2)) // trip TripProperties
          {
            if(typeof this.u.trip_update.trip_properties === 'undefined') this.u.trip_update.trip_properties = new Object();
            this.eopb.pushPSA(value);
            this.tv = this.u.trip_update.trip_properties;
            this.setState(360);
          }
          else ovreport(300, tag);
          break;
      case 310:  // TripDescriptor
          if((tag.key == 1) && (tag.wt == 2)) // trip_id
          {
            this.tv.trip_id = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // start_time
          {
            this.tv.start_time = this.eopb.getString(value);  
          }
          else if((tag.key == 3) && (tag.wt == 2)) // start_date
          {
            this.tv.start_date = this.eopb.getString(value);  
          }
          else if((tag.key == 4) && (tag.wt == 0)) // schedule_relationship
          {
            this.tv.schedule_relationship = value;  
          }
          else if((tag.key == 5) && (tag.wt == 2)) // route_id
          {
            this.tv.route_id = this.eopb.getString(value);  
          }
          else if((tag.key == 6) && (tag.wt == 0)) // direction_id
          {
            this.tv.direction_id = value;  
          }
          else if((tag.key == 1001) && (tag.wt == 2)) // nyct_trip_descriptor
          {
            if(typeof this.u.trip_update === 'undefined') this.u.trip_update = new Object();
            this.u.trip_update.nyct_trip_descriptor = new Object();
            this.tv = this.u.trip_update.nyct_trip_descriptor;
            this.eopb.pushPSA(value);
            this.setState(311);
          }
          else ovreport(310, tag);
          break;
      case 311:    // nyct_trip_descripto
          if((tag.key == 1) && (tag.wt == 2)) // train_id
          {
            this.tv.train_id = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 0)) // is_assigned
          {
            this.tv.is_assigned = this.eopb.getBool(value);  
          }
          else if((tag.key == 3) && (tag.wt == 0)) // direction
          {
            this.tv.direction = value;  
          }
          else ovreport(311, tag);          
          break;
      case 320:    // vehicle descriptor
          if((tag.key == 1) && (tag.wt == 2)) // id
          {
            this.tv.id = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // label
          {
            this.tv.label = this.eopb.getString(value);  
          }
          else if((tag.key == 3) && (tag.wt == 2)) // license_plate
          {
            this.tv.license_plate = this.eopb.getString(value);  
          }
          else ovreport(320, tag);
          break;
      case 330:  // stop_time_update
          if((tag.key == 1) && (tag.wt == 0)) // stop_sequence
          {
            this.stu.stop_sequence = value;  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // arrival
          {
            if(typeof this.stu.arrival === 'undefined') this.stu.arrival = new Object();  
            this.eopb.pushPSA(value);
            this.setState(340);
          }
          else if((tag.key == 3) && (tag.wt == 2)) // departure
          {
            if(typeof this.stu.departure === 'undefined') this.stu.departure = new Object();  
            this.eopb.pushPSA(value);
            this.setState(350);
          }
          else if((tag.key == 4) && (tag.wt == 2)) // stop_id
          {
            this.stu.stop_id = this.eopb.getString(value);  
          }
          else if((tag.key == 5) && (tag.wt == 0)) // schedule_relationship
          {
            this.stu.schedule_relationship = value;  
          }
          else if((tag.key == 7) && (tag.wt == 0)) // departure_occupancy_status
          {
            this.stu.departure_occupancy_status = value;  
          }
          else if((tag.key == 1001) && (tag.wt == 2)) // nyct_stop_time_update
          {
            if(typeof this.stu.nyct_stop_time_update === 'undefined') this.stu.nyct_stop_time_update = new Object();  
            this.eopb.pushPSA(value);
            this.setState(331);
          }
          else if((tag.key == 1005) && (tag.wt == 2)) // mta_railroad_stop_time_update
          {
            if(typeof this.stu.mta_railroad_stop_time_update === 'undefined') this.stu.mta_railroad_stop_time_update = new Object();  
            this.eopb.pushPSA(value);
            this.setState(332);
          }
          else ovreport(330, tag);
          break;
      case 331:    // nyct_stop_time_update
          if((tag.key == 1) && (tag.wt == 2)) // scheduled_track
          {
            this.stu.nyct_stop_time_update.scheduled_track = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // actual_track
          {
            this.stu.nyct_stop_time_update.actual_track = this.eopb.getString(value);  
          }
          else ovreport(331, tag);          
          break;
      case 332:    // mta_railroad_stop_time_update
          if((tag.key == 1) && (tag.wt == 2)) // track
          {
            this.stu.mta_railroad_stop_time_update.track = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // trainStatus
          {
            this.stu.mta_railroad_stop_time_update.trainStatus = this.eopb.getString(value);  
          }
          else ovreport(332, tag);          
          break;
      case 340:
          if((tag.key == 1) && (tag.wt == 0)) // delay int 32
          {
            this.stu.arrival.delay = value;  
          }
          else if((tag.key == 2) && (tag.wt == 0)) // time int64
          {
            this.stu.arrival.time = value;  
          }
          else if((tag.key == 3) && (tag.wt == 0)) // uncertaintyint32
          {
            this.stu.arrival.uncertainty = value;  
          }
          else ovreport(340, tag);
          break;
      case 350:
          if((tag.key == 1) && (tag.wt == 0)) // delay int 32
          {
            this.stu.departure.delay = value;  
          }
          else if((tag.key == 2) && (tag.wt == 0)) // time int64
          {
            this.stu.departure.time = value;  
          }
          else if((tag.key == 3) && (tag.wt == 0)) // uncertaintyint32
          {
            this.stu.departure.uncertainty = value;  
          }
          else ovreport(350, tag);
         break;
      case 360: // TripProperties
          if((tag.key == 1) && (tag.wt == 2)) // trip_id
          {
            this.tv.trip_id = this.eopb.getString(value);
          }
          else if((tag.key == 2) && (tag.wt == 2)) // start_date
          {
            this.tv.start_date = this.eopb.getString(value);
          }
          else if((tag.key == 3) && (tag.wt == 2)) // start_time
          {
            this.tv.start_time = this.eopb.getString(value);
          }
          else if((tag.key == 4) && (tag.wt == 0)) // shape_id
          {
            this.tv.shape_id = value;
          }
          else if((tag.key == 5) && (tag.wt == 2)) // trip_headsign
          {
            this.tv.trip_headsign = this.eopb.getString(value);
          }
          else if((tag.key == 6) && (tag.wt == 0)) // trip_short_name
          {
            this.tv.trip_short_name = value;
          }
          else ovreport(360, tag);
         break;
      case 400:  // VehiclePosition
          if((tag.key == 1) && (tag.wt == 2)) // trip
          {
            if(typeof this.u.vehicle.trip === 'undefined') this.u.vehicle.trip = new Object(); 
            this.tv = this.u.vehicle.trip;
            this.eopb.pushPSA(value);
            this.setState(310);
          }
          else if((tag.key == 2) && (tag.wt == 2)) // position
          {
            if(typeof this.u.vehicle.position === 'undefined') this.u.vehicle.position = new Object(); 
            this.tv = this.u.vehicle.position;
            this.eopb.pushPSA(value);
            this.setState(410);
          }
          else if((tag.key == 3) && (tag.wt == 0)) // current_stop_sequence
          {
            this.u.vehicle.current_stop_sequence = value;  
          }
          else if((tag.key == 4) && (tag.wt == 0)) // current_status
          {
            this.u.vehicle.current_status = value;  
          }
          else if((tag.key == 5) && (tag.wt == 0))  // timestamp uint64
          {
            this.u.vehicle.timestamp = value;
          }
          else if((tag.key == 6) && (tag.wt == 0))  // congestion_level
          {
            this.u.vehicle.congestion_level = value;
          }
          else if((tag.key == 7) && (tag.wt == 2)) // stop_id
          {
            this.u.vehicle.stop_id = this.eopb.getString(value);  
          }
          else if((tag.key == 8) && (tag.wt == 2)) // vehicle
          {
            if(typeof this.u.vehicle.vehicle === 'undefined') this.u.vehicle.vehicle = new Object(); 
            this.tv = this.u.vehicle.vehicle;
            this.eopb.pushPSA(value);
            this.setState(320);
          }
          else if((tag.key == 9) && (tag.wt == 0))  // occupancy_status
          {
            this.u.vehicle.occupancy_status = value;
          }
          else if((tag.key == 10) && (tag.wt == 0))  // occupancy_percentage
          {
            this.u.vehicle.occupancy_percentage = value;
          }
          else if((tag.key == 11) && (tag.wt == 2)) // multi CarriageDetails
          {
            if(typeof this.u.vehicle.multi_carriage_details === 'undefined') this.u.vehicle.multi_carriage_details = [];
            this.tu = new Object(); 
            this.u.vehicle.multi_carriage_details(this.tu);
            this.eopb.pushPSA(value);
            this.setState(450);  // 
          }
          else if((tag.key == 1005) && (tag.wt == 2)) // mta_railroad_carriage_details
          {
            if(typeof this.u.vehicle.mta_railroad_carriage_details === 'undefined') this.u.vehicle.mta_railroad_carriage_details = new Object(); 
            this.tv = this.u.vehicle.mta_railroad_carriage_details;
            this.eopb.pushPSA(value);
            this.setState(420);
          }
          else ovreport(400, tag);
          break;
       case 410:   // position
          if((tag.key == 1) && (tag.wt == 5)) // latitude
          {
            this.u.vehicle.position.latitude = this.eopb.getFloat(value, 8);  
          }
          else if((tag.key == 2) && (tag.wt == 5)) // longitude
          {
            this.u.vehicle.position.longitude = this.eopb.getFloat(value, 8);  
          }
           else if((tag.key == 3) && (tag.wt == 5)) // bearing
          {
            this.u.vehicle.position.bearing = this.eopb.getFloat(value, 8);  
          }
          else if((tag.key == 4) && (tag.wt == 1)) // odometer
          {
            this.u.vehicle.position.odometer = value;  
          }
          else if((tag.key == 5) && (tag.wt == 5)) // speed
          {
            this.u.vehicle.position.speed = this.eopb.getFloat(value, 1);  
          }
          else ovreport(410, tag);
          break;
       case 420:   // mta_railroad_carriage_details
          if((tag.key == 1) && (tag.wt == 0))  // bicycles_allowed
          {
            this.tv.bicycles_allowed = value;
          }
          else if((tag.key == 2) && (tag.wt == 2))  // carriage_class
          {
            this.tv.carriage_class = this.eopb.getString(value);
          }
          else if((tag.key == 3) && (tag.wt == 0))  // quiet_carriage
          {
            this.tv.quiet_carriage = value;
          }
          else if((tag.key == 4) && (tag.wt == 0))  // toilet_facilities
          {
            this.tv.toilet_facilities = value;
          }
          else ovreport(420, tag);
          break;
       case 450:  // CarriageDetails
          if((tag.key == 1) && (tag.wt == 2))  // id
          {
            this.tu.id = this.eopb.getString(value);
          }
          else if((tag.key == 2) && (tag.wt == 2))  // label
          {
            this.tu.label = this.eopb.getString(value);
          }
          else if((tag.key == 3) && (tag.wt == 0))  // occupancy status
          {
            this.tu.occupancy_status = value;
          }
          else if((tag.key == 4) && (tag.wt == 0))  // occupancy_percentage
          {
            this.tu.occupancy_percentage = value;
          }
          else if((tag.key == 5) && (tag.wt == 0))  // carriage_sequence
          {
            this.tu.carriage_sequence = value;
          }
          else ovreport(450, tag);
           
           break;
       case 500:  // alert
          if((tag.key == 1) && (tag.wt == 2)) // active_period
          {
            if(typeof this.u.alert.active_period === 'undefined') this.u.alert.active_period = [];
            this.tu = new Object(); 
            this.u.alert.active_period.push(this.tu);
            this.eopb.pushPSA(value);
            this.setState(103);  // time range
          }
          else if((tag.key == 5) && (tag.wt == 2)) // informed_entity
          {
            if(typeof this.u.alert.informed_entity === 'undefined') this.u.alert.informed_entity = [];
            this.tu = new Object(); 
            this.u.alert.informed_entity.push(this.tu);
            this.eopb.pushPSA(value);
            this.setState(501);
          }
          else if((tag.key == 6) && (tag.wt == 0)) // cause
          {
            this.u.alert.cause = value;  
          }
          else if((tag.key == 7) && (tag.wt == 0)) // effect
          {
            this.u.alert.effect = value;  
          }
          else if((tag.key == 8) && (tag.wt == 2)) // url
          {
            this.u.alert.url = new Object(); 
            this.tu = this.u.alert.url;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 10) && (tag.wt == 2)) // header_text
          {
            this.u.alert.header_text = new Object(); 
            this.tu = this.u.alert.header_text;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 11) && (tag.wt == 2)) // description_text
          {
            this.u.alert.description_text = new Object(); 
            this.tu = this.u.alert.description_text;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 12) && (tag.wt == 2)) // tts_header_text
          {
            this.u.alert.tts_header_text = new Object(); 
            this.tu = this.u.alert.tts_header_text;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 13) && (tag.wt == 2)) // tts_description_text
          {
            this.u.alert.tts_description_text = new Object(); 
            this.tu = this.u.alert.tts_description_text;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 14) && (tag.wt == 0)) // severity_level
          {
            this.u.alert.severity_level = value;
          }
          else if((tag.key == 1001) && (tag.wt == 2)) // mercury alert
          {
            this.u.alert.mercury_alert = new Object(); 
            this.tu = this.u.alert.mercury_alert;
            this.eopb.pushPSA(value);
            this.setState(507);
          }
          else ovreport(500, tag);
          break;
       case 501:   // entityselector
          if((tag.key == 1) && (tag.wt == 2)) // agency_id
          {
            this.tu.agency_id = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // route_id
          {
            this.tu.route_id = this.eopb.getString(value);  
          }
          else if((tag.key == 3) && (tag.wt == 0)) // route_type
          {
            this.tu.route_type = value;  
          }
          else if((tag.key == 4) && (tag.wt == 2)) // trip descriptor
          {
            this.tu.trip = new Object(); 
            this.eopb.pushPSA(value);
            this.tv = this.tu.trip;
            this.setState(310); // was 310
          }
          else if((tag.key == 5) && (tag.wt == 2)) // stop_id
          {
            this.tu.stop_id = this.eopb.getString(value);  
          }
          else if((tag.key == 6) && (tag.wt == 0)) // direction_id
          {
            this.tu.direction_id = value;
          }
          else if((tag.key == 1001) && (tag.wt == 2)) // mercury_entity_selector
          {
//            this.tu.mercury_entity_selector = value; //new Object();
            this.tu.mercury_entity_selector = new Object();
            this.eopb.pushPSA(value);
            this.tv = this.tu.mercury_entity_selector;
            this.setState(509);
          }
          else if((tag.key == 1000) && (tag.wt == 2)) // error condition
          {
              
          }
          else ovreport(501, tag);
          break;
       case 502:   // translated_string
          if((tag.key == 1) && (tag.wt == 2)) // translation
          {
            if(typeof this.tu.translation === 'undefined') this.tu.translation = [];
            this.tv = new Object();
            this.tu.translation.push(this.tv);
            this.eopb.pushPSA(value);
            this.setState(503);
          }
          else ovreport(502, tag);
          break;
       case 503:   // translation
          if((tag.key == 1) && (tag.wt == 2)) // text
          {
            this.tv.text = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 2)) // language
          {
            this.tv.language = this.eopb.getString(value);  
          }
          else ovreport(503, tag);
          break;
       case 504:  // translatedImage
          if((tag.key == 1) && (tag.wt == 2)) // localized_image
          {
            if(typeof this.tu.localized_image === 'undefined') this.tu.localized_image = [];
            this.tv = new Object();
            this.tu.translation.push(this.tv);
            this.eopb.pushPSA(value);
            this.setState(505);
          }
          else ovreport(504, tag);
          break;
      case 505:   // localized_image
          if((tag.key == 1) && (tag.wt == 2)) // url
          {
            this.tv.url = this.eopb.getString(value);
          }
          else if((tag.key == 2) && (tag.wt == 2)) // media_type
          {
            this.tv.media_type = this.eopb.getString(value);
          }
          else if((tag.key == 3) && (tag.wt == 2)) // language
          {
            this.tv.language = this.eopb.getString(value);
          }
          else ovreport(505, tag);
          break;
       case 506:  // NyctTripDescriptor
          if((tag.key == 1) && (tag.wt == 2)) // train_id
          {
            this.tu.train_id = this.eopb.getString(value);  
          }
          else if((tag.key == 2) && (tag.wt == 0)) // is_assigned
          {
            this.tu.is_assigned = value;
          }
          else if((tag.key == 3) && (tag.wt == 0)) // direction
          {
            this.tu.direction = value;
          }
          else ovreport(506, tag);           
          break;
       case 507: // MercuryAlert
          if((tag.key == 1) && (tag.wt == 0)) // created_at
          {
            this.tv.created_at = value;
          }
          else if((tag.key == 2) && (tag.wt == 0)) // updated_at
          {
            this.tv.updated_at = value;
          }
          else if((tag.key == 3) && (tag.wt == 2)) // alert_type
          {
            this.tv.alert_type = this.eopb.getString(value);
          }
          else if((tag.key == 5) && (tag.wt == 2)) // service_plan_number
          {
            if(typeof this.tv.service_plan_number  === 'undefined') this.tv.service_plan_number = [];
            this.tv.service_plan_number.push(this.eopb.getString(value))
          }
          else if((tag.key == 6) && (tag.wt == 2)) // general_order_number
          {
            if(typeof this.tv.general_order_number  === 'undefined') this.tv.general_order_number = [];
            this.tv.general_order_number.push(this.eopb.getString(value))
          }
          else if((tag.key == 7) && (tag.wt == 0)) // display_before_active
          {
            this.tv.display_before_active = value;
          }
          else if((tag.key == 9) && (tag.wt == 0)) // directionality
          {
            this.tv.directionality = value;
          }
          else if((tag.key == 12) && (tag.wt == 0)) // no_affected_stations
          {
            this.tv.no_affected_stations = value;
          }
          else if((tag.key == 13) && (tag.wt == 2)) // clone_id
          {
            this.tv.clone_id = this.eopb.getString(value);
          }
          else if((tag.key == 8) && (tag.wt == 2)) // human_readable_active_period
          {
            this.tu.human_readable_active_period = new Object(); 
            this.tu = this.tu.human_readable_active_period;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 11) && (tag.wt == 2)) // screens_summary
          {
            this.tu.screens_summary = new Object(); 
            this.tu = this.tu.screens_summary;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 10) && (tag.wt == 2)) // affected_stations
          {
            if(typeof this.tv.affected_stations === 'undefined') this.tv.affected_stations = [];
            this.tu = new Object(); 
            this.tv.affected_stations.push(this.tu);
            this.eopb.pushPSA(value);
            this.setState(501);
          }
          else if((tag.key == 4) && (tag.wt == 2)) // station_alternative
          {
            if(typeof this.tv.station_alternative === 'undefined') this.tv.station_alternative = [];
            this.tu = new Object(); 
            this.tv.station_alternative.push(this.tu);
            this.eopb.pushPSA(value);
            this.setState(508);
          }
          else ovreport(507, tag);
          break;
       case 508:  // 
          if((tag.key == 1) && (tag.wt == 2)) // affected_entity
          {
            this.tu.affected_entity = new Object(); 
            this.eopb.pushPSA(value);
            this.setState(501);
          }
          else if((tag.key == 2) && (tag.wt == 2)) // notes
          {
            this.tu.notes = new Object(); 
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else ovreport(508, tag);
          break;
       case 509:   // mercury_entity_selector
          if((tag.key == 1) && (tag.wt == 2)) // sort_order
          {
            this.tv.sort_order = this.eopb.getString(value);
          }
          else ovreport(509, tag);
          break;
       case 600: // shape
          if((tag.key == 1) && (tag.wt == 2)) // shape_id
          {
            this.u.shape.shape_id = this.eopb.getString(value);
           }
          else if((tag.key == 2) && (tag.wt == 2)) // encoded_polyline
          {
            this.u.shape.encoded_polyline = this.eopb.getString(value);
          }
          else ovreport(600, tag);
          break;
       case 700: // stop
          if((tag.key == 1) && (tag.wt == 2)) // stop_id
          {
            this.u.stop.stop_id = this.eopb.getString(value);
          }
          else if((tag.key == 2) && (tag.wt == 2)) // stop_code
          {
            this.u.stop.stop_code = new Object();
            this.tu = this.u.stop.stop_code;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 3) && (tag.wt == 2)) // stop_name
          {
            this.u.stop.stop_name = new Object();
            this.tu = this.u.stop.stop_name;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 4) && (tag.wt == 2)) // tts_stop_name
          {
            this.u.stop.tts_stop_name = new Object();
            this.tu = this.u.stop.tts_stop_name;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 5) && (tag.wt == 2)) // stop_desc
          {
            this.u.stop.stop_desc = new Object();
            this.tu = this.u.stop.stop_desc;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 6) && (tag.wt == 0)) // stop_lat
          {
            this.u.stop.stop_lat = value;
          }
          else if((tag.key == 7) && (tag.wt == 0)) // stop_lon
          {
            this.u.stop.stop_lon = value;
          }
          else if((tag.key == 8) && (tag.wt == 2)) // zone_id
          {
            this.u.stop.zone_id = this.eopb.getString(value);
          }
          else if((tag.key == 9) && (tag.wt == 2)) // stop_url
          {
            this.u.stop.stop_url = new Object();
            this.tu = this.u.stop.stop_url;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else if((tag.key == 11) && (tag.wt == 2)) // parent_station
          {
            this.u.stop.parent_station = this.eopb.getString(value);
          }
          else if((tag.key == 12) && (tag.wt == 2)) // stop_timezone
          {
            this.u.stop.stop_timezone = this.eopb.getString(value);
          }
          else if((tag.key == 13) && (tag.wt == 0)) // wheelchair_boarding
          {
            this.u.stop.wheelchair_boarding = value;
          }
          else if((tag.key == 14) && (tag.wt == 2)) // level_id
          {
            this.u.stop.level_id = this.eopb.getString(value);
          }
          else if((tag.key == 15) && (tag.wt == 2)) // platform_code
          {
            this.u.stop.platform_code = new Object();
            this.tu = this.u.stop.platform_code;
            this.eopb.pushPSA(value);
            this.setState(502);
          }
          else ovreport(700, tag);
          break;
       case 800: // trip_modifications
         /*
          if((tag.key == 1) && (tag.wt == 2)) // selected_trips
          {
            if(typeof this.u.trip_modifications.selected_trips === 'undefined')
            {
                this.u.trip_modifications.selected_trips = [];
            }
            var stu1 = new Object();
            this.u.trip_update.stop_time_update.push(stu1);
            this.stu = stu1;
            this.eopb.pushPSA(value);
            this.setState(330);
          }
          else if((tag.key == 2) && (tag.wt == 2)) // start_times
          {
            if(typeof this.u.trip_update.stop_time_update === 'undefined')
            {
                this.u.trip_update.stop_time_update = [];
            }
            var stu1 = new Object();
            this.u.trip_update.stop_time_update.push(stu1);
            this.stu = stu1;
            this.eopb.pushPSA(value);
            this.setState(330);
          }
           else if((tag.key == 3) && (tag.wt == 2)) // service_dates
          {
            if(typeof this.u.trip_update.stop_time_update === 'undefined')
            {
                this.u.trip_update.stop_time_update = [];
            }
            var stu1 = new Object();
            this.u.trip_update.stop_time_update.push(stu1);
            this.stu = stu1;
            this.eopb.pushPSA(value);
            this.setState(330);
          }
           else if((tag.key == 4) && (tag.wt == 2)) // modifications
          {
            if(typeof this.u.trip_update.stop_time_update === 'undefined')
            {
                this.u.trip_update.stop_time_update = [];
            }
            var stu1 = new Object();
            this.u.trip_update.stop_time_update.push(stu1);
            this.stu = stu1;
            this.eopb.pushPSA(value);
            this.setState(330);
          }
          else
            */
          ovreport(800, tag);
          break;
       default:
          pbreport("543 illegal state = " + this.state);
          break;
  }
}



