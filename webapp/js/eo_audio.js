// eo_audio.js

function beep1()
{
  setTimeout(beep3, 400);   
}

function beep3() {
  var bq =false;
  if((typeof synth !== 'undefined') && (synth != null) && (document.getElementById("eaudio").checked))
  {
    if(synth.speaking) ;
    else if(ipod || bDontBeep)
    {
      if(!bDontOK) say("Ok.");
    }
  }
  if(!bDontBeep && !ipod) 
  {
  (new
	Audio(
	"data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+ Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ 0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7 FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb//////////////////////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
	)).play();
  }
}

function beep2() {
  (new
	Audio(
	"data:audio/wav;base64,/+MYxAAEaAIEeUAQAgBgNgP/////KQQ/////Lvrg+lcWYHgtjadzsbTq+yREu495tq9c6v/7vt/of7mna9v6/btUnU17Jun9/+MYxCkT26KW+YGBAj9v6vUh+zab//v/96C3/pu6H+pv//r/ycIIP4pcWWTRBBBAMXgNdbRaABQAAABRWKwgjQVX0ECmrb///+MYxBQSM0sWWYI4A++Z/////////////0rOZ3MP//7H44QEgxgdvRVMXHZseL//540B4JAvMPEgaA4/0nHjxLhRgAoAYAgA/+MYxAYIAAJfGYEQAMAJAIAQMAwX936/q/tWtv/2f/+v//6v/+7qTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
	)).play();
}

// SNDMODE == 0 , no audio
// SNDMODE == 1, not operating
// SNDMODE == 2, operating
// SNDMODE == 3, armed to hide buttons

var SNDSTATE = 0;
var FromPlace_id = "";
var ToPlace_id = "";
var SelTime = "";
var SelDay = "";
//var bMonitorMode = false;
var bMonitorCnx = false;
var bNumberMode = false;
var bFirstCompass = true;
var MonitorTripID = null;
var MonitorTrip = null;
var LastMonitorTrip = null;
var SSA = 0;
var LastPlace_id = "";
var Xalerts = [];
var bWA = false;
var CurrentCarrierIndex = 0;

function setMonitorMode(b)
{
  if(!b)
  {
    LastMonitorTrip = MonitorTripID;
    MonitorTripID = null;
    MonitorTrip = null;
    if(b && (synth != null)) say("Monitor off.");
    bMonitorMode = false;
    showMap(false);
//    quiet();
  }
  else if(b && !bMonitorMode && (CurrentTripID != null))
  {
    MonitorTripID = CurrentTripID;
    MonitorTrip = CurrentTrip;
    bMonitorMode = true;
    plotTrip();
  }
  checkConnection(); 
}

function setMonitorCnx(b)
{
  if(b)
  {
     if((ctnx != null) && (ctnx.TripOptions != null))
     {
       bMonitorCnx = true; 
       MOPTION = ctnx.TripOptions[DETAILSINDEX];
     }
  }
  else
  {
     bMonitorCnx = false; 
     MOPTION = null;

  }
}

function spRec()
{
  if(bSpeechRecg && document.getElementById("sprec").checked) ptt();
}

function sayI(txt, index)
{
  var p = new Promise(function(resolve, reject) {
  if(synth == null)
  {
     report("synth null, sayI redefine");
     synth = window.speechSynthesis; 
  }
  if(synth != null)
  {
    if(synth.paused) synth.resume();
    var phrase = new SpeechSynthesisUtterance(txt);
    var i = document.getElementById("vselect").selectedIndex;
    phrase.voice = voices[i];
    phrase.pitch = 1.0;
    phrase.rate = 1.0;
    phrase.sin = index;
    phrase.onend = function(){snd_end(); resolve();};
    synth.speak(phrase);
    report(txt);
    reportBubble(txt);
  }
  });
  return(p);
}

function setSndState(n)
{
//  report("128 setSndState = " + n);
  SNDSTATE = n;
}

function getSndState()
{
  return(SNDSTATE);
}

var bxReport = false;

function xreport(s)
{
  if(bxReport) report(s);   
}

function nextSndState(x1)
{
  var x = x1;
  bxReport = (document.getElementById("rap").checked);
//  report("149 SNDMODE = " + SNDMODE + ", setSndState " + SNDSTATE + ", x = " + x + "DISPLAYTYPE = " + DISPLAYTYPE);
  if((SNDMODE == 0) || (SNDMODE == 1))
  {
    // turn off sound
    setMonitorMode(false);
    bNumberMode = false;
//    bMonitorCnx = false;
    //    quiet();
  }
  else 
  {
    if(x == 2) 
    {
        clearReport();  
        setSndState(0); 
        xreport("SNDMODE = " + SNDMODE + ", setSndState( " + SNDSTATE + ", x = " + x); 
        beep1();
    }
    else if(x == 6)
    {
      if((SNDSTATE == 13) || (SNDSTATE == 15))
      {
        x = 4;  
      }
      spRec();   
    }

    switch(SNDSTATE)
    {
      case 0:  // quiescent
          setMonitorMode(false);
 //         setMonitorCnx(false);
          document.getElementById("sph").innerHTML = "";
          bNumberMode = false;
          StopArraySel = 0;
          if(x == 3) // announce status
          {
            if(CurrentPhrase == -1)
            {
              setSndState(9);
              CurrentPhrase = 0;
              capt = ASND[CurrentPhrase].trip_name;
              announcePlatforms(1);
            }
            else if(DISPLAYTYPE == 4)
            {
              setSndState(35);
              CurrentPhrase = 0;
              announceFindBusX(0);
            }
            else
            {
              setSndState(0);
              announceStatus();
              DISPLAYTYPE = 0;
              updateDisplay();
            }
          }
          else if(x == 1) // announce train board
          {
            SNDMODE = 2;
            if(DISPLAYTYPE == 0)
            {
//              setSndState(2);  
//              announceTrainBoard(0);
              setSndState(14);
              CurrentPhrase = 0;
              announceTrainBoard(1);
            }
            else if(DISPLAYTYPE == 1)
            {
              setSndState(10);
              CurrentPhrase = 0;
              announceTripX();
            }
            else if(DISPLAYTYPE == 2)
            {
              setSndState(31);
              CurrentPhrase = 0;
              announceConnectionsX();
            }
            else if(DISPLAYTYPE == 3)
            {
              setSndState(32);
              CurrentPhrase = 0;
              announceConnectionDetailsX(0);
            }
            else if(DISPLAYTYPE == 4)
            {
              setSndState(35);
              CurrentPhrase = 0;
              announceFindBusX(0);
            }
            else if(DISPLAYTYPE == 6) // strategies
            {
              CurrentPhrase = 0;
              setSndState(121);
              announceStrategies(0);
            }

          }
          else if(x == 2)
          {
            SNDMODE = 2;
            setSndState(0);
            quiet();
          }
          else if(x == 5)
          {
            SNDMODE = 2;
            setSndState(12);
            CurrentPhrase = 0;
            announceMenu();
          }
          else if(x == 4)
          {
 /*           if(bSpeechEnabled)
            {
              spRec();
              CurrentPhrase = -2;
            }
            else */
            {
              CurrentPhrase = -1;
              setSndState(7);
            }
          }
 //         beep1();
          break;
      case 7:
          CurrentPhrase = -1;
      case 14:  
          if(x == 1)
          {
            setSndState(8); 
            CurrentPhrase += 1;
            if(DISPLAYTYPE == 0)
            {
              announceTrainBoard(1);
              break;
            }
          }
     case 8: // single step
          xreport("state 8 " + CurrentPhrase + " " + x);
          if(x == 3) // 
          {
            if(CurrentPhrase == -1)
            {
              setSndState(9);
              CurrentPhrase = 0;
              if(typeof ASND[CurrentPhrase] !== 'undefined')
              {
                capt = ASND[CurrentPhrase].trip_name;
              }
              announcePlatforms(1);
            }
            else
            {
              CurrentTripID = ASND[CurrentPhrase].trip_id;
              CurrentTripRouteID = ASND[CurrentPhrase].id;
              capt = ASND[CurrentPhrase].id + " " + ASND[CurrentPhrase].tripname + " " + ASND[CurrentPhrase].dir + " " + ASND[CurrentPhrase].dest;
              quiet();
              DISPLAYTYPE = 1;
              showTripSchedule(ASND[CurrentPhrase].rowIndex, ASND[CurrentPhrase].ttime);
/*              try{
                updateDisplay();
              }
              catch(e){ report(e);}
              */
              setSndState(10); 
              CurrentPhrase = 0;
              setTimeout(announceTripX, 3000);
            }
          }
          else if(x == 1) // announce train board
          {
            setSndState(8); 
            CurrentPhrase += 1;
            if(DISPLAYTYPE == 0)
            {
              announceTrainBoard(1);
            }
            else if(DISPLAYTYPE == 1)
            {
              CurrentPhrase = 0;
              setSndState(10); 
              announceTripX();   
            }
          }
          else if(x == 2)
          {
            setSndState(0);
//            SNDMODE = 3;
            quiet();
          }
          else if(x == 5) 
          {
            setSndState(8); 
            if(CurrentPhrase > 0) CurrentPhrase -= 1;
            if(DISPLAYTYPE == 0)
            {
              announceTrainBoard(1);
            }
          }
          else if(x == 4)
          {
            setSndState(8); 
//            spRec();
          }
          break;
      case 1: // status announcement
          if(x == 1) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 3) // select item in progress
          {
            xreport("state 1 CurrentPhrase = " + CurrentPhrase);
            quiet();
            if(stps.length > 1) 
            {
              setSndState(3);
              CurrentPhrase = 0;
              announcePlatforms(0);
            }
            else 
            {
              setSndState(4);
              announceStopSelector();
            }
          }
          else if(x == 4)
          {
//            spRec();
          }
          break;
      case 2: // train board announcement in process
          if((x == 1) || (x == 2)) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 3) // select item in progress
          {
            setSndState(5);
            xreport("state 2 CurrentPhrase index = " + CurrentPhrase);
            quiet();
            announceTrip();
          }
          else if(x == 4)
          {
//            spRec();
          }
          break;
      case 3: // announce platforms
          if((x == 1) || (x == 2)) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 3) // select item in progress
          {
            xreport("state 3 select platform index = " + CurrentPhrase);
            quiet();
            setPlaceId(stps[CurrentPhrase]);
//            Place = getStopNameFromID(Place_id);
            DISPLAYTYPE = 0;
            updateDisplay();
            setSndState(0);
          }
          else if(x == 4)
          {
//            spRec();
          }
          break;
      case 4: // announce stop selector
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceStopSelectorX();
          }
          else if(x == 3) // select item in progress
          {
            var sid = StopArrayIds[CurrentPhrase];
            var p = checkLoadable(sid);
            if(p != null) p.then(function(){
                setPlaceId(sid);
                DISPLAYTYPE = 0;
                updateDisplay();
                setSndState(0);
                setTimeout(announceStatus, 1000);
                });
            else
            {
              setPlaceId(StopArrayIds[CurrentPhrase]);
              DISPLAYTYPE = 0;
              updateDisplay();
              setSndState(0);
              setTimeout(announceStatus, 1000);
            }
          }
          else if((x == 5) && (CurrentPhrase > 0))
          {
            CurrentPhrase -= 1;   
            announceStopSelectorX();
          }
          else if(x == 4)
          {
            switchStopArrays();
            setSndState(18);
          }
          break;
      case 5: // announce trip
          if((x == 1) || (x == 2)) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            announceTrip1(CurrentPhrase);
          }
          else if(x == 3) // select item in progress
          {
            xreport("state 5 trip index = " + CurrentPhrase);
            setPlaceId(BSND[CurrentPhrase].stop_id);
//            Place = getStopNameFromID(Place_id);
            quiet();
            DISPLAYTYPE = 0;
            updateDisplay();
            setSndState(0);
            announceStatus();
//            announceTrip();
          }
          else if((x == 5) && (CurrentPhrase > 0))
          {
            CurrentPhrase -= 1;   
            announceTrip1(CurrentPhrase);
          }
          else if(x == 4)
          {
//            spRec();
          }
          break;
      case 6: // announce alerts
          report("  state 6 x = " + x);
          if(x == 1)
          {
            CurrentPhrase += 1;
            announceAlerts(1);
          }
          else if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 5) // 
          {
            if(CurrentPhrase > 0) CurrentPhrase -= 1;
            announceAlerts(1);
          }
          else if(x == 3) // select item in progress
          {
            xreport("state 6 alert index = " + CurrentPhrase);
//            quiet();
            if(CurrentPhrase < CurrentAlerts.length)
            {
              if(Xalerts[CurrentPhrase].description.length == 0)
              {
                say("Sorry, no additional details.");  
              }
              else
              {
              say(Xalerts[CurrentPhrase].description);
              sayPhrase("EOP6"); //("Shall I repeat this?");
              }
            }
          }
          else if(x == 4)
          {
//             spRec();
            CurrentPhrase += 1;
            announceAlerts(2);
          }
          break;
      case 9:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            setSndState(9); 
            CurrentPhrase += 1;
            announcePlatforms(1);
          }              
          else if(x == 3)
          {
//            Place_id = stps[CurrentPhrase];
            setPlaceId(stps[CurrentPhrase]);
            DISPLAYTYPE = 0;
            updateDisplay();
            quiet();
            announceStatus();
            setSndState(0);
          }
          else if((x == 5) && (CurrentPhrase > 0))
          {
            setSndState(9); 
            CurrentPhrase -= 1;
            announcePlatforms(1);
          }                        
          else if(x == 4)
          {
//            spRec();
          }
         break;
      case 10:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1) // announce train board
          {
            if(DISPLAYTYPE == 0)
            {
              setSndState(2);  
              announceTrainBoard(0);
            }
            else if(DISPLAYTYPE == 1)
            {
              setSndState(10);
              CurrentPhrase += 1;
              announceTripX();
            }
          }
          else if(x == 3)
          {
            quiet();
//            report("561 changePlace " + CurrentTripZ[CurrentPhrase].stop_id + " " + CurrentPhrase);
            changePlace(CurrentTripZ[CurrentPhrase].stop_id);
            setSndState(57);
/*          Place_id = CurrentTripZ[CurrentPhrase].stop_id;
            DISPLAYTYPE = 0;
            updateDisplay();
            announceStatus();
            setSndState(0);
            */
          }
          else if(x == 4)
          {
 /*           if(bSpeechEnabled)
            {
              spRec();
            }
            else */
            {
              setSndState(20);
              announceMonitorTrip(0);
            }
          }
          else if((x == 5) && (CurrentPhrase >= 0)) // announce train board
          {
            if(DISPLAYTYPE == 1)
            {
              setSndState(10);
              if(CurrentPhrase > 0) CurrentPhrase -= 1;
              announceTripX();
            }
          }
          break;
      case 11:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
         
          break;
      case 12: // announce announceMenu
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceMenu();
          }
          else if(x == 3)
          {
            switch(CurrentPhrase)
            {
                case 0:   
                  setSndState(6);
                  getAlertData();
                  if(WxAlerts.length > 0) 
                  {
                      if(CurrentAlerts.length > 0)
                      {
                        say("Shall I list the " + WxAlerts.length + " weather alerts first?");
                        setSndState(103)
                      }
                      else
                      {
                        Xalerts = WxAlerts; 
                        bWA = true;
                        setSndState(6);
                        announceAlerts(0);
                     }
                  }
                  else
                  {
                    Xalerts = CurrentAlerts;
                    bWA = false;
                    setSndState(6);
                    announceAlerts(0);
                  }
                  break;
                case 1: // whats nearby
                    bAnnounceNearby = true;
                    CurrentPhrase = -1;
                    say("Shall I only list active nearby?");
                    setSndState(102);
//                    whatsNearby();
                  break;
                case 2: // find connections
                  setSndState(13);
                  makeStopArray(StopArraySel);
                  CurrentPhrase = 0;
                  say("Find connections from one of the following");
                  say(StopArray[0]);
//                 say("Find connections from here, " +  getDescriptionForStop( Here));  
                  break;
                case 3: // select a stop
                  CurrentPhrase = -1;
                  announceStopSelector();
                  break;
                case 4: // platforms at this station
                  CurrentPhrase = 0;
                  setSndState(9);
                  announcePlatforms(1);
                  break;
                 case 5: // direction
                  setSndState(150);
                  CurrentPhrase = 0;
                  bFirstCompass = true;
                  report("662 stop_id = " + Place_id);
                  announceDirection(0);
                  break;
                case 6:  // search select
                  setSndState(100);
                  CurrentPhrase = 0;
                  announceSearchSelect();
                  break;
                case 7: // find carrier or bus line // was search by sketch
/*
                  if(wpad != null) closePad();
                  writePad();
                  setSndState(70);
                  CurrentPhrase = 0;
                  announcePad(0);
 */                 
                  setSndState(170);
                  CurrentPhrase = 0;
                  announceBusList(0);  
                  break;
                case 8: // get favorites
                  setSndState(40);
                  CurrentPhrase = 0;
                  announceGetFavorites();
                  break;
                case 9: // save favorites
                  setSndState(41);
                  CurrentPhrase = 1;
                  announceSaveFavorites();
                  break;
                case 10: // last connections
                  if(ctnx != null)
                  {
                    showConnections();
                    CurrentPhrase = 0;
                    bAnnounceConnections = true;
                    announceConnections();
                  }
                  else
                  {
                    say("No find connections results.");
                    setSndState(0);
                  }
                  break;
                case 11: // last stop
                  setPlaceId(laststopid);
                  DISPLAYTYPE = 0;
                  updateDisplay();
                  setSndState(0);
                  beep1();
                  break;
                case 12: // last trip
                  DISPLAYTYPE = 1;
                  updateDisplay();
                  setSndState(0);
                  beep1();
                  break;
                case 13:
                  setSndState(85);
                  CurrentPhrase = 0;
                  announcePreferencesMenu(0);
                  break;
                case 14:
                  setSndState(80);
                  CurrentPhrase = 0;
                  announceHelpMenu(0);
                  break;
                case 15: // select stop by category
                  CurrentPhrase = 0;
                  setSndState(60);
                  announceCatMenu(0);  
                  break;
                default:
                    break;
            }
          }
          else if(x == 5) 
          {
            if(CurrentPhrase > 0)
            {
              CurrentPhrase -= 1;
              announceMenu();
            }
            else
            {
              say("Quick Help.");
              announceQuickHelp();
              setSndState(80);
            }
          }
          else if(x == 4) 
          {
            if((!bSpeechRecg) && (CurrentPhrase == 0))
            {
              document.getElementById("sprec").checked = true;
              say("Enabling speech recognition.  You may be prompted to allow microphone use.");
              setSndState(0);
              enableSpeech();
            }
//            else spRec();
//              CurrentPhrase = 0;
//              setSndState(60);
//              announceCatMenu(0);  
          }
          break;
      case 13: // find connections
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
/*          else if(x == 1)
          {
            
            setSndState(14);
          }
          */
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceStopSelectorX();
          }
          else if(x == 3)
          {
            FromPlace_id = StopArrayIds[CurrentPhrase];
            FromPlace = getStopNameFromID(FromPlace_id);
            report("FromPlace_id = " + FromPlace_id + " FromPlace = " + FromPlace + " " + CurrentPhrase);
            CurrentPhrase = 0;
            setSndState(15);
//            say("then find connections to selected, " +  getDescriptionForStop(Place_id));
            say("then find connections to one of the following");
            say(StopArray[0]);
          }
          else if(x == 4)
          {
            switchStopArrays();
            setSndState(18);
          }
          else if((x == 5) && (CurrentPhrase > 0))
          {
            CurrentPhrase -= 1;
            announceStopSelectorX();
          }
          break;
/*      case 14:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }          
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceStopSelectorX();
          }
          break;
          */
      case 15:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceStopSelectorX();
          }
          else if(x == 3)
          {
            ToPlace_id = StopArrayIds[CurrentPhrase];
            ToPlace = getStopNameFromID(ToPlace_id);
            xreport("ToPlace_id = " + ToPlace_id + " ToPlace = " + ToPlace + " " + CurrentPhrase);
            CurrentPhrase = 0;
            say("taking the trip ");
            say(DayArray[0]);
            setSndState(16);
          }
          else if(x == 4)
          {
            switchStopArrays();
            setSndState(18);
          }
          else if((x == 5) && (CurrentPhrase > 0))
          {
            CurrentPhrase -= 1;
            announceStopSelectorX();
          }
          break;
      case 16:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceDaySelectorX();
          }
          else if(x == 3)
          {
            SelDay = CurrentPhrase;
            CurrentPhrase = 0;
            say("starting about now");
            setSndState(17);
          }
          else if((x == 5) && (CurrentPhrase > 0))
          {
            CurrentPhrase -= 1;
            announceDaySelectorX();
          }
          else if(x == 4)
          {
 //           spRec();
          }
          break;
      case 17:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceTimeSelectorX();
          }
          else if(x == 3)
          {
            SelTime = SelTimeIndex[CurrentPhrase];
            bAnnounceConnections = true;
            setSndState(0);
            getConnectionsX(FromPlace, ToPlace, SelDay, SelTime, true);
          }
          else if((x == 5) && (CurrentPhrase > 0))
          {
            CurrentPhrase -= 1;
            announceTimeSelectorX();
          }
          else if(x == 4)
          {
//            spRec();
          }
         break;
      case 18:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            switchStopArrays();
          }
          else if(x == 3)
          {
//            CurrentPhrase += 1;
            CurrentPhrase = 1;
            announceStopSelectorX();
            setSndState(SSA);
          }
          else if(x == 4)
          {
            switchStopArrays();
          }
          else if(x == 5)
          {
            if(StopArraySel > 0) StopArraySel -= 2;  
            switchStopArrays();
          }
          break;
      case 20: // monitor trip
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            setSndState(10);
            announceTripX();
          }
          else if(x == 3)
          {
            if(!bMonitorMode)
            {
              setSndState(21);
              setMonitorMode(true);
              CurrentPhrase = 0;
              announceTripX();
            }
            else
            {
              setMonitorMode(false);
              CurrentPhrase = 0;
              setSndState(0);
              beep1();
            }
          }
          break;
       case 21: // monitor trip
           /*
          if(BSND[0].stop_id != null)
          {
            Place_id = BSND[0].stop_id;
            Place = getStopNameFromID(Place_id);
          }
          */
          if(x == 2) // stop audio
          {
            setSndState(0);
            setMonitorMode(false);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceTripX();
 //           setSndState(10);
          }
          else if(x == 3)
          {
            announceStatus();
            setSndState(21);
          }
          else if(x == 4)
          {
//            spRec();
          }
          break;
     case 30: // what's nearby
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            if(CSND.length <= CurrentPhrase) CurrentPhrase = 0;
            announceNearbyX();
          }
          else if((x == 5) && (CurrentPhrase > 0))
          {
 //           CurrentPhrase -= 1;
            CurrentPhrase = 0;
            announceNearbyX();
          }
          else if(x == 3)
          {
//            setSndState(0);
            if(typeof CSND[CurrentPhrase].headsign !== 'undefined')
            {
              setSndState(0);
              showTrainBoardz(CSND[CurrentPhrase].stop_id);
            }
          }
          else if(x == 4)
          {
 //           spRec();
          }
         break;
      case 31: // announceConnections
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceConnectionsX();
          }
          else if(x == 3)
          {
            setSndState(32);
            showDetails(CurrentPhrase);
            ACDXOptionNumber = CurrentPhrase;
            CurrentPhrase = 0;
            announceConnectionDetailsX(0);
          }  
          else if(x == 5)
          {
            CurrentPhrase = 0;
            announceConnectionsX();
          }
          else if(x == 4)
          {
            if(CurrentPhrase > 0)
            {
              CurrentPhrase -= 1;
            }
            announceConnectionsX();            
          }
          break;
       case 32: // announceConnectionDetails
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceConnectionDetailsX(1);
          }
          else if(x == 5)
          {
            setSndState(31);
            showConnections();
            CurrentPhrase = 0;
            announceConnectionsX();               
          }
          else if(x == 4)
          {
            if(CurrentPhrase > 0)
            {
              CurrentPhrase -= 1;
              if(CurrentPhrase == 0) announceConnectionDetailsX(0);
              else announceConnectionDetailsX(1);
            }
            else if(CurrentPhrase == 0)
            {
              if(!document.getElementById("cnx").checked)
              {
                announceConnectionDetailsX(0);
              }
              else
              {
                say("Monitor this itinerary?");
                setSndState(34);
              }
            }
          }
          else if(x == 3)
          {
            var z = ctnx.TripOptions[ACDXOptionNumber].legs[CurrentPhrase];
            var tl = z.tripleg;
            CurrentTripID = tl.trip_id;
            xreport("CurrentTripID = " + CurrentTripID);
            capt = tl.trip_name;
            var hs = tl.trip_headsign; //getHeadsignFromTripId(tl.trip_id);
            xreport("- hs = " + hs);
            if(hs == "") hs = z.direction_name + "  " + tl.trip_name + " " + tl.trip_id;
            else hs = "to " + hs + ": \u00A0 \u00A0 " + z.direction_name + "  " + tl.trip_name;
//            report("audio hs = " + hs);
            quiet();
            DISPLAYTYPE = 1;
            showTrip(tl.trip_id, hs, z.startid, z.destid, z.starttime);
            updateDisplay();
            CurrentPhrase = 0;
            setSndState(33); 
            setTimeout(announceTrip, 3000);
          }  
          break;
       case 33:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceTripX();
          }
          else if(x == 5)
          {
            setSndState(32);
            showDetails(ACDXOptionNumber);
            CurrentPhrase = 0;
            announceConnectionDetailsX(0);               
          }
          else if(x == 3) // select item in progress
          {
            xreport("state 33 trip index = " + CurrentPhrase);
            quiet();
            if(Place_id != BSND[CurrentPhrase].stop_id)
            {
              changePlace(BSND[CurrentPhrase].stop_id);
              setSndState(58);
            }
            else
            {
              setSndState(59);
              announceMonitorTrip(0);
            }
          }
          else if((x == 4) && (CurrentPhrase > 0)) // announce train board
          {
            if(DISPLAYTYPE == 1)
            {
              setSndState(33);
              CurrentPhrase -= 1;
              announceTripX();
            }
          }
          else if(x == 4)
          {
            setSndState(59);
            announceMonitorTrip(0);
          }
          
           break;
       case 34: // monitor connections
           if(x == 2)
           {
            setSndState(0);
            quiet();
           }
           else if(x == 1)
           {
            setSndState(32);
            CurrentPhrase = 0;
            announceConnectionDetailsX(0);
           }
           else if(x == 3)
           {
            setMonitorCnx(true);
            setSndState(32);
            CurrentPhrase = 0;
            announceConnectionDetailsX(0);
           }
           else if(x == 4)
           {
             setSndState(36);
             say("Monitor these connections?");
          }
           else if(x == 5)
           {
            setSndState(32);
            showDetails(ACDXOptionNumber);
            CurrentPhrase = 0;
            announceConnectionDetailsX(0);               
           }
               
           break;
       case 36: // monitor connections
           if(x == 2)
           {
            setSndState(0);
            quiet();
           }
           else if(x == 1)
           {
            setSndState(32);
            CurrentPhrase = 0;
            announceConnectionDetailsX(0);
           }
           else if(x == 3)
           {
            monitorItinerary(ctnx.TripOptions[ACDXOptionNumber]);
            setSndState(32);
            CurrentPhrase = 0;
            announceConnectionDetailsX(0);
           }
           
           break;
       case 35: // announceFindBus
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            if(CurrentPhrase + 1 < DSND.length) CurrentPhrase += 1;
            announceFindBusX(CurrentPhrase);
          }
          else if(x == 5)
          {
            if(CurrentPhrase > 0) CurrentPhrase -= 1;
            announceFindBusX(CurrentPhrase);               
          }
          else if(x == 4)
          {
//            spRec();
          }
          else if(x == 3)
          {
            CurrentTripID = DSND[CurrentPhrase].trip_id;
            capt = "Bus " + DSND[CurrentPhrase].route_id + " " + DSND[CurrentPhrase].trip_name + "  to " + DSND[CurrentPhrase].dest;
            DISPLAYTYPE = 1;
//            showTrip(tl.trip_id, hs, z.startid, z.destid, z.starttime);
            updateDisplay();
            CurrentPhrase = 0;
            setSndState(33); 
            setTimeout(announceTrip, 3000);
          }  
          break;
       case 40: // announce getFavorites
          if(x == 2) // stofile:///home/kaupinis/WWW/eightolives/docs/Trains/js/eo_audio.jsp audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceGetFavorites();
          }
          else if(x == 3)
          {
            switch(CurrentPhrase)
            {
                case 0:   
                  Place = Here;
                  setPlaceId(getStopIdFromName(Here));
                  DISPLAYTYPE = 0;
                  updateDisplay();
                  break;
                case 1: 
                  Place = Home;
                  setPlaceId(getStopIdFromName(Home));
                  DISPLAYTYPE = 0;
                  updateDisplay();
                  break;
                case 2:
                  openTrip(1,0);
                  break;  
                case 3:
                  openTrip(2,0);
                  break;  
                case 4:
                  openTrip(1,1);
                  break;  
                case 5:
                  openTrip(2,1);
                  break;  
                case 6:
                  openTrip(1,3);
                  setSndState(32);
                  CurrentPhrase = 0;
                  announceConnectionDetailsX(0);
                  break;  
                case 7:
                  openTrip(2,3);
                  setSndState(32);
                  CurrentPhrase = 0;
                  announceConnectionDetailsX(0);
                  break;  
                default: 
                    
                  break;
            }
            setSndState(0);
            quiet();
          }  
          break;
       case 41: // announce saveFavorites
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSaveFavorites();
          }
          else if(x == 3)
          {
            switch(CurrentPhrase)
            {
                case 1: 
                  setHome();
                  break;
                case 2:
                  saveTrip(1,0);
                  break;  
                case 3:
                  saveTrip(2,0);
                  break;  
                case 4:
                  saveTrip(1,1);
                  break;  
                case 5:
                  saveTrip(2,1);
                  break;  
                case 6:
                  saveTrip(1,3);
                  break;  
                case 7:
                  saveTrip(2,3);
                  break;  
                default: 
                    
                  break;
            }
            setSndState(0);
            beep1();
            quiet();
          }  
          break;
     case 50: //search
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSearch(0);
          }
          else if(x == 3)
          {
             switch(CurrentPhrase)
            {
                case 1: // train
                  document.getElementById("tpt").checked = true;
                  CurrentPhrase = 0;
                  setSndState(51);
                  announceSearch(1);
                  break;
                case 2: // subway
                  document.getElementById("tps").checked = true;
                  CurrentPhrase = 0;
                  setSndState(51);
                  announceSearch(1);
                  break;  
                case 3:  // bus
                  document.getElementById("tpb").checked = true;
                  CurrentPhrase = 0;
                  setSndState(51);
                  announceSearch(1);
                  break;  
                case 0:  // all
                  document.getElementById("tpz").checked = true;
                  CurrentPhrase = 0;
                  setSndState(51);
                  announceSearch(1);
                  break;  
                default:
                  break;
            }
          }
          break;
      case 51: //search
          if(x == 2) // stop audio
          {
            document.getElementById("sph").innerHTML = "";
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            document.getElementById("sph").innerHTML = "";
            CurrentPhrase += 1;
            announceSearch(1);
          }
          else if(x == 3)
          {
            if(sphrase.length == 0) sphrase += letters[CurrentPhrase];
            else sphrase += letters[CurrentPhrase];
            saySearchPhrase(); 
            CurrentPhrase = 0;
            say("Add a letter. " + letters[0]);
            document.getElementById("sph").innerHTML = letters[0];
         }
          else if(x == 5)
          {
            saySearchPhrase();
            report(sphrase);
            if(sphrase.length > 0)
            {
              say("Do you wish to delete the last character?");
              setSndState(53);
            }
          }
          else if(x == 4)
          {
            say("Search started.");
            document.getElementById("sph").innerHTML = "";
            document.getElementById("shst").value = sphrase; 
            searchStop();
            CurrentPhrase = 0;
            if(SEARCHB.length > 0) 
            {
              setSndState(52);
              announceSearch(3);
            }
            else say("No search results.");
          }
          break;
      case 52: //search
          if(x == 2) // stop audio
          {
            document.getElementById("sph").innerHTML = "";
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSearch(3);
          }
          else if(x == 3)
          {
            var p = SEARCHB[2*CurrentPhrase + 1];
            var pi = SEARCHB[2*CurrentPhrase];
            Place = p;
            setPlaceId(pi);
            SelectedPlace = Place;
            pcolor = "red";
            DISPLAYTYPE = 0;
            qupdateDisplay();
            setSndState(0);
            quiet();
            beep1();
          }
          else if(x == 4)
          {
//            spRec();   
          }
          break;
      case 53:
          if(x == 2) // stop audio
          {
            document.getElementById("sph").innerHTML = "";
            setSndState(0);
            quiet();
          }
          else if(x == 1) 
          {
            setSndState(51);
            CurrentPhrase = 0;
            say("Add a letter. " + letters[0]);
          }
          else if(x == 3)
          {
            sphrase = sphrase.substring(0,sphrase.length -1);
            setSndState(51);
            CurrentPhrase = 0;
            say("Add a letter. " + letters[0]);
          }
          else if(x == 4)
          {
//            spRec();   
          }
          
          break;
      case 57:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1) 
          {
            setSndState(10);
          }
          else if(x == 3)
          {
            setPlaceId(CurrentTripZ[CurrentPhrase].stop_id);
            DISPLAYTYPE = 0;
            updateDisplay();
            announceStatus();
            setSndState(0);
          }
          else if(x == 4)
          {
//            spRec();   
          }
          break;
      case 58:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1) 
          {
            setSndState(33);
          }
          else if(x == 3)
          {
            setPlaceId(CurrentTripZ[CurrentPhrase].stop_id);
//            Place = getStopNameFromID(Place_id);
            DISPLAYTYPE = 0;
            updateDisplay();
            announceStatus();
            setSndState(0);
          }          
          else if(x == 4)
          {
//            spRec();   
          }
          break;
      case 59:// monitor trip
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            setSndState(33);
          }
          else if(x == 3)
          {
            if(!bMonitorMode)
            {
              setSndState(21);
              setMonitorMode(true);
              CurrentPhrase = 0;
              announceTripX();
            }
            else
            {
              setMonitorMode(false);
              CurrentPhrase = 0;
              setSndState(0);
              beep1();
            }
          }
          else if(x == 4)
          {
//            spRec();   
          }
          break;

      case 60:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1) 
          {
            CurrentPhrase += 1;
            announceCatMenu(1);
          }
          else if(x == 3)
          {
            setSndState(61);
            cat = CurrentPhrase;
            CurrentPhrase = 0;
            announceCatMenu(2);
          }
          break;
      case 61:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1) 
          {
            CurrentPhrase += 1;
            announceCatMenu(2);
          }
          else if(x == 3)
          {
              
          }
          break;
     case 70: //search by sketch
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            if(wpad != null) closePad();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSearch(0);
          }
          else if(x == 3)
          {
             switch(CurrentPhrase)
            {
                case 1: // train
                  document.getElementById("tpt").checked = true;
                  CurrentPhrase = 0;
                  document.getElementById("spg").innerHTML = "Number? or sketch";
                  setSndState(71);
                  announcePad(1);
                  break;
                case 2: // subway
                  document.getElementById("tps").checked = true;
                  CurrentPhrase = 0;
                  document.getElementById("spg").innerHTML = "Number? or sketch";
                  setSndState(71);
                  announcePad(1);
                  break;  
                case 3:  // bus
                  document.getElementById("tpb").checked = true;
                  CurrentPhrase = 0;
                  document.getElementById("spg").innerHTML = "Number? or sketch";
                  setSndState(71);
                  announcePad(1);
                  break;  
                case 0:  // all
                  document.getElementById("tpz").checked = true;
                  CurrentPhrase = 0;
                  document.getElementById("spg").innerHTML = "Number? or sketch";
                  setSndState(71);
                  announcePad(1);
                  break;  
                default:
                  break;
            }
          }
          else if(x == 4)
          {
//            spRec();   
          }
          break;
      case 71: //search
          if(x == 2) // stop audio
          {
            document.getElementById("spg").innerHTML = "";
            setSndState(0);
            quiet();
            if(wpad != null) closePad();
          }
          else if(x == 1)
          {
            document.getElementById("spg").innerHTML = "";
            if((gptr + 1  < guesses.length) && (guesses.length > 0))
            {
                gptr += 1;
                announcePad(2);
            }
            else if(bNumberMode)
            {
              setSndState(76); 
              say("Do you want to exit number mode?");
            }
            else
            {
              document.getElementById("spg").innerHTML = "";  
            }
          }
          else if(x == 3)
          {
            if((sphrase.length == 0) && (wpad.segments.length == 0) && (!bNumberMode))
            {
              setSndState(75); 
              document.getElementById("spg").innerHTML = "Number?";
              say("Do you want to enter a number?");
            }
            else if((sphrase.length != 0) && (wpad.segments.length == 0))
            {
              setSndState(74); 
              document.getElementById("spg").innerHTML = "Blank space?";
              say("Add a blank space?");
            }
            else
            {
              if(guess != null) sphrase += guess;
              saySearchPhrase(); 
              CurrentPhrase = 0;
              clearPad();
              guess = null;
              if(bNumberMode) 
              {
//                  document.getElementById("spg").innerHTML = "";
                  say("Sketch a new number. ");
              }
              else say("Sketch a new letter. ");
//            document.getElementById("sph").innerHTML = letters[0];
            }
          }
          else if(x == 5)
          {
            saySearchPhrase();
            report(sphrase);
            if(sphrase.length > 0)
            {
              say("Do you wish to delete the last character?");             document.getElementById("spg").innerHTML = "Delete last?";
              setSndState(73);
            }
          }
          else if(x == 4)
          {
            say("Search started.");
            document.getElementById("spg").innerHTML = "";
            document.getElementById("shst").value = sphrase; 
            searchStop();
            CurrentPhrase = 0;
            if(SEARCHB.length > 0) 
            {
              setSndState(72);
              announceSearch(3);
            }
            else say("No search results.");
          }
          break;
      case 72: //search
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            if(wpad != null) closePad();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSearch(3);
          }
          else if(x == 3)
          {
            var p = SEARCHB[2*CurrentPhrase + 1];
            var pi = SEARCHB[2*CurrentPhrase];
 //           Place = p;
            setPlaceId(pi);
            SelectedPlace = p;
            pcolor = "red";
            DISPLAYTYPE = 0;
            qupdateDisplay();
            setSndState(0);
            if(wpad != null) closePad();
            announceStatus();
//            quiet();
            beep1();
          }
          else if(x == 4)
          {
//            spRec();   
          }
          break;
      case 73:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            if(wpad != null) closePad();
          }
          else if(x == 1) 
          {
            setSndState(71);
            CurrentPhrase = 0;
            say("Sketch a letter. ");
          }
          else if(x == 3)
          {
            sphrase = sphrase.substring(0,sphrase.length -1);
            saySearchPhrase(); 
            setSndState(71);
            CurrentPhrase = 0;
            clearPad();
            guess = null;
            say("Sketch a new letter. ");
          }
          
          break;
      case 74:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            if(wpad != null) closePad();
          }
          else if(x == 1) 
          {
            setSndState(71);
            if(bNumberMode) say("Sketch a number. ");
            else say("Sketch a letter. ");
          }
          else if(x == 3)
          {
            sphrase += " ";
            saySearchPhrase();
            bNumberMode = false;
            setSndState(71);
            CurrentPhrase = 0;
            say("Sketch a letter. ");
          }
          break;
      case 75:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            if(wpad != null) closePad();
          }
          else if(x == 1) 
          {
            document.getElementById("spg").innerHTML = "";
            setSndState(71);
            say("Sketch a letter. ");
          }
          else if(x == 3)
          {
            document.getElementById("spg").innerHTML = "";
            bNumberMode = true;
            setSndState(71);
            CurrentPhrase = 0;
            say("Sketch a number. ");
          }
          break;
      case 76:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            if(wpad != null) closePad();
          }
          else if(x == 1) 
          {
            setSndState(71);
            CurrentPhrase = 0;
            say("Sketch a letter. ");
          }
          else if(x == 3)
          {
            bNumberMode = false;
            say("Number mode off.");
            document.getElementById("spg").innerHTML = "";
            setSndState(71);
            CurrentPhrase = 0;
            say("Sketch a letter. ");
          }
          break;
      case 80:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1) 
          {
            CurrentPhrase += 1;
            announceHelpMenu(1);
          }
          else if(x == 5)
          {
            if(CurrentPhrase > 0)
            {
              CurrentPhrase -= 1;
              announceHelpMenu(1);
            }
          }
         else if(x == 3)
          {
            announceHelpTopic();   
          }
           
          break;
       case 85:   // preferences
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1) 
          {
            CurrentPhrase += 1;
            announcePreferencesMenu(1);
          }
          else if(x == 5)
          {
            if(CurrentPhrase > 0)
            {
              CurrentPhrase -= 1;
              announcePreferencesMenu(1);
            }
          }
         else if(x == 3)
          {
            setSndState(86);
            announcePreferenceTopic();   
          }
           
          break;
       case 86:   // preferences
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1) 
          {
            switch(CurrentPhrase)
            {
                case 0:
                    setSndState(0);
                    CurrentPhrase = 0;                    
                    break;
                case 1:
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
                case 2:
                    document.getElementById("sps").checked = true;
                    updateSPS();
                    say("Schedules only mode selected.");
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
                case 3:
                    document.getElementById("bIncludeWx").checked = false;
                    changedWx();
                    say("Weather alerts not included.");
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
                case 4:
                    document.getElementById("bIncludeBuses").checked = false;
                    say("Local bus stops not included.");
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
                default:
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
            }
          }
          else if(x == 5)
          {
            if(CurrentPhrase > 0)
            {
              setSndState(85);
              CurrentPhrase -= 1;
              announcePreferencesMenu(1);
            }
          }
         else if(x == 3)
          {
            switch(CurrentPhrase)
            {
               case 0:
                    if(bMonitorMode) setMonitorMode(false);
                    else if((CurrentTripID != null) && (CurrentTripID != "")) setMonitorMode(true);
                    if(bMonitorMode) say("Monitor Mode is ON");
                    else say("Monitor Mode is OFF.");
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
               case 1:
                    if(document.getElementById("sprec").checked) document.getElementById("sprec").checked = false;
                    else 
                    {
                        document.getElementById("sprec").checked = true;
                        enableSpeech();
                    }
                    setSndState(0);
                    CurrentPhrase = 0;
                   break;
               case 2:
                    document.getElementById("spp").checked = true;
                    updateSPS();
                    say("Predictions will be used if available.");
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
                case 3:
                    document.getElementById("bIncludeWx").checked = true;
                    changedWx();
                    say("Weather alerts will be included.");
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
                case 4:
                    document.getElementById("bIncludeBuses").checked = true;
                    say("Local bus stops will be included.");
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
                default:
                    setSndState(0);
                    CurrentPhrase = 0;
                    break;
            }
          }
           
          break;
       case 90:   // spell search
         if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSearch(0);
          }
          else if(x == 3)
          {
             switch(CurrentPhrase)
            {
                case 1: // train
                  document.getElementById("tpt").checked = true;
                  CurrentPhrase = 0;
                  setSndState(91);
                  announceSpSearch(1);
                  break;
                case 2: // subway
                  document.getElementById("tps").checked = true;
                  CurrentPhrase = 0;
                  setSndState(91);
                  announceSpSearch(1);
                  break;  
                case 3:  // bus
                  document.getElementById("tpb").checked = true;
                  CurrentPhrase = 0;
                  setSndState(91);
                  announceSpSearch(1);
                  break;  
                case 0:  // all
                  document.getElementById("tpz").checked = true;
                  CurrentPhrase = 0;
                  setSndState(91);
                  announceSpSearch(1);
                  break;  
                default:
                  break;
            }
          }
          else if(x == 4)
          {
//            spRec();   
          }
          break;
      case 91:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 4)
          {
//            spRec();   
          }
          break;
      case 92: //search
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSpSearch(3);
          }
          else if(x == 3)
          {
            var p = SEARCHB[2*CurrentPhrase + 1];
            var pi = SEARCHB[2*CurrentPhrase];
 //           Place = p;
            setPlaceId(pi);
            SelectedPlace = p;
            pcolor = "red";
            DISPLAYTYPE = 0;
            qupdateDisplay();
            setSndState(0);
            CloseMenu();
            quiet();
            beep1();
          }
          else if(x == 4)
          {
 //           spRec();   
          }
          break;
      case 95:
//          report("2132 case 95 got here");
          break;
      case 96:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSpSearch(5);
          }
          else if(x == 3)
          {
            say("Search started.");
//            document.getElementById("spg").innerHTML = "";
            document.getElementById("shst").value = sphrase; 
            searchStop();
            CurrentPhrase = 0;
            if(SEARCHB.length > 0) 
            {
              setSndState(72);
              announceSearch(3);
            }
            else say("No search results.");
              
          }
          
          break;
      case 100:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSearchSelect();
          }
          else if(x == 3)
          {
            if(CurrentPhrase == 0)
            {
              setSndState(50); // search by guess
              CurrentPhrase = 0;
              announceSearch(0);
            }
            else if(CurrentPhrase == 1) // search by sketch
            {
              if(wpad != null) closePad();
              writePad();
              setSndState(70);
              CurrentPhrase = 0;
              announcePad(0);
            }
            else if(CurrentPhrase == 2) // search by speak
            {
              setSndState(95);
              CurrentPhrase = 0;
              announceSearchBySpeak(0);
            }
          }
          else if(x == 5)
          {
            CurrentPhrase -= 1;
            announceSearchSelect();
          }
          break;
      case 101: // search by speak
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceSearchBySpeak();
          }
          else if(x == 3)
          {
              
          }
          else if(x == 5)
          {
            CurrentPhrase -= 1;
            announceSearchBySpeak();
          }
          
          break;
      case 102:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            setSndState(30);
            bwnlistall = false;
            whatsNearby();
          }
          else if(x == 3)
          {
            setSndState(30);
            bwnlistall = true;              
            whatsNearby();
         }
          else if(x == 5)
          {
          }
          
          break;
      case 103:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            Xalerts = CurrentAlerts;
            bWA = false;
            setSndState(6);
            announceAlerts(0);
          }
          else if(x == 3)
          {
            Xalerts = WxAlerts;
            bWA = true;
            setSndState(6);
            announceAlerts(0);
          }
          break;
      case 120: // strategies
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            quiet();
            setSndState(0);
          }
          else if(x == 3)
          {
            CurrentPhrase = 0;
            setSndState(121);
            announceStrategies(0);
          }
          break;
      case 121: // strategies
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            announceStrategies(1);
          }
          else if(x == 3)
          {
            announceStrategies(1);
          }
          else if(x == 5)
          {
            if(CurrentPhrase > 0) CurrentPhrase -= 1;
            announceStrategies(1);
          }
          break;
      case 122:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            setSndState(0);
            say("OK");
            CloseMenu();
          }
          else if(x == 3)
          {
            CurrentPhrase = 0;
            setSndState(121);
            announceStrategies(0);
          }
          else if(x == 5)
          {
            if(CurrentPhrase > 0) CurrentPhrase -= 1;
            announceStrategies(1);
          }
          break;
          
      case 150:  // direction menu
          if(eopw == null)
          {
            eopw = new eo_pathway();   
          }
          if((eopw != null) && (Place_id != LastPlace_id))
          {
            LastPlace_id = Place_id;
            eopw.setStopId(Place_id);
            var pt1 = getPositionForId(Place_id);
            DestWaypoint = new Waypoint(pt1.x, pt1.y, 0, 10, NOW);
            showPathways(Place_id);
            /*
            eopw.getPathwayObjects().then(function() {
                report("2187: " + eopw.DOORS.length + " DOORS, " + eopw.NODES.length + " NODES, " + eopw.STOPS.length + " STOPS, " + eopw.PWS.length + " PWs");
            }).catch(function(e) {
                report(e);
            });
            */
          }
          eopw.setHere({lat: Xpos, lng: Ypos});
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            if((CurrentPhrase == 1) && ( eopw.DOORS.length == 0)) CurrentPhrase += 1;
            if((CurrentPhrase == 3) && ( eopw.STOPS.length == 0)) CurrentPhrase += 1;
            if((CurrentPhrase == 4) && ( eopw.PWS.length == 0)) CurrentPhrase += 1;
            if(CurrentPhrase >= DirMenu.length)
            {
               CurrentPhrase = 0;  
            }
            announceDirection(CurrentPhrase);
          }
          else if(x == 3)
          {
            if(CurrentPhrase == 0)
            {
              if(bHasCompass)
              {
                if(bCompassEnabled == false) 
                {
                  checkCompass();
                }
                setTimeout(announceDirection2, 2000);
              }
              say("Click YES or NO for bearings.");
              setSndState(151);
            }
            else if(CurrentPhrase == 1) // entrance
            {
              CurrentPhrase = 0;
              var y = eopw.DOORS.length;
              if( y == 0)
              {
                eopw.selectedDoorIndex = null;
                say("No entrances defined. Select another option.");   
              }
              else if(y == 1)
              {
                say("Only one entrance defined.");
                say(fixDest(eopw.getDoorName(0)));
                
              }
              else if(y > 0)
              {
                CurrentPhrase = 0;
                var d2door = eopw.getDistanceToDoor(CurrentPhrase);
                if(d2door < 1) d2door = Math.round(5280 * d2door) + " feet away.";
                else d2door = " " + Math.round(d2door) + " miles away.";

                say("Select one of " + y + " entrances. The first is " + fixDest(eopw.getDoorName(0)) + d2door);
                setSndState(152);
             }
            }
            else if(CurrentPhrase == 2) // reset entrance
            {
              var sdi = eopw.selectedDoorIndex;
              if(sdi != null)
              {
                var nme = fixDest(eopw.getDoorName(sdi));
                say("Current entrance is " + nme + ". Reset it now?");
                setSndState(155);
              }
              else
              {
                say("No entrance is set.");
                CurrentPhrase += 1;
                announceDirection(CurrentPhrase);
              }
                
            }
            else if(CurrentPhrase == 3) // platform
            {
              CurrentPhrase = 0;
              var y = eopw.STOPS.length;
              if( y == 0)
              {
                say("No other internal platforms defined. Select another option.");   
              }
              else if(y == 1)
              {
                CurrentPhrase = 0;
                say("Only one platform defined.");
                say(eopw.getStopName(0));
                setSndState(153);
              }
              else if(y > 0)
              {
                CurrentPhrase = 0;
                say("Select one of " + y + " internal platforms. The first is " + eopw.getStopName(0));
                setSndState(153);
             }
              
            }
            else if(CurrentPhrase == 4) // pathway
            {
              say("Looking for pathways.");
              var p = eopw.getPathwayOptions().then(function(options) {
                 var k = options.length;
                 if(k == 0) say("No pathways found.");
                 // TODO
              });
            }
          }
          else if(x == 5)
          {
            CurrentPhrase = 0;
//            setSndState(0);
//            quiet();
          }
          
          break;
      case 151:  // direction
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            updateWaypoint();
            announceDirection1();
            setSndState(151);
          }
          else if(x == 3)
          {
            updateWaypoint();
            if(bHasCompass)
            {
              if(bCompassEnabled == false) 
              {
                checkCompass();
              }
              setTimeout(announceDirection2, 2000);
            }
            else
            {
              announceDirection1();
              setSndState(151);
            }
          }
          else if(x == 5)
          {
            CurrentPhrase = 0;
            setSndState(150);
            announceDirection(CurrentPhrase);            
          }
          break;
      case 152:  // entrances
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            if(CurrentPhrase >= eopw.DOORS.length)
            {
              CurrentPhrase = -1;
              say ("Exit entrance selection?");
            }
            else
            {
              var d2door = eopw.getDistanceToDoor(CurrentPhrase);
              if(d2door < 1) d2door = Math.round(5280 * d2door) + " feet away.";
              else d2door = " " + Math.round(d2door) + " miles away.";
              say(fixDest(eopw.getDoorName(CurrentPhrase)) + d2door);
            }
          }
          else if(x == 3)
          {
            if(CurrentPhrase == -1)
            {
              CurrentPhrase = 0;
 //             setSndState(150);
//              announceDirection(CurrentPhrase);            
            }
            else
            {
              eopw.setSelectedDoor(CurrentPhrase);
              say("Setting selected entrance as " + fixDest(eopw.getDoorName(CurrentPhrase)));
//            eopw.selectedDoorIndex = CurrentPhrase;
            }
            CurrentPhrase = 0;
            setSndState(150);
            announceDirection(CurrentPhrase);            
          }
          else if(x == 5)
          {
            CurrentPhrase -= 1;
            if(CurrentPhrase < 0)
            {
              CurrentPhrase = -1;
              say ("Exit entrance selection?");
            }
            else
            {
              var d2door = eopw.getDistanceToDoor(CurrentPhrase);
              if(d2door < 1) d2door = Math.round(5280 * d2door) + " feet away.";
              else d2door = " " + Math.round(d2door) + " miles away.";
              say(fixDest(eopw.getDoorName(CurrentPhrase)) + d2door);
            }
          }          
          break;
      case 153:  // platforms
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            if(CurrentPhrase >= eopw.STOPS.length)
            {
              CurrentPhrase = 0;
              say ("Repeating the list.");
            }
            var s7 = eopw.getStopName(CurrentPhrase);
//                 report("2382 " + CurrentPhrase + " " + s7);
            say(s7);
          }
          else if(x == 3)
          {
            eopw.setSelectedStop(CurrentPhrase);
            say("Setting selected platform as " + eopw.getStopName(CurrentPhrase));
 //           eopw.selectedStopIndex = CurrentPhrase;
            CurrentPhrase = 0;
            setSndState(150);
            announceDirection(CurrentPhrase);            
          }
          else if(x == 5)
          {
            CurrentPhrase = 0;
            setSndState(150);
            announceDirection(CurrentPhrase);            
          }          
          break;
      case 154:  // pathways
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
          }
          else if(x == 3)
          {
          }
          else if(x == 5)
          {
            CurrentPhrase = 0;
            setSndState(150);
            announceDirection(CurrentPhrase);            
          }          
          break;
      case 155:  // reset entrance
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase = 0;
            setSndState(150);
            announceDirection(CurrentPhrase);                        
          }
          else if(x == 3)
          {
            eopw.selectedDoorIndex = null;
            say("Current entrance reset.")
            CurrentPhrase = 0;
            setSndState(150);
            announceDirection(CurrentPhrase);            
          }
          else if(x == 5)
          {
            CurrentPhrase = 0;
            setSndState(150);
            announceDirection(CurrentPhrase);            
          }          
          break;
      case 170:  // bus
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            say("OK");
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            if(CurrentPhrase >= BusList.length) CurrentPhrase = 0;
            announceBusList(1);                        
          }
          else if(x == 3)
          {
            if(!isCarrierLoaded(BusList[CurrentPhrase].id))
            {
                var ss = "";
                if(typeof BusList[CurrentPhrase].refstop !== 'undefined') ss = BusList[CurrentPhrase].refstop;
 //               report("2721 CurrentPhrase = " + CurrentPhrase + " " + ss);
                p = checkLoadable(ss);
                if(p != null) p.then(function(){
//                   report("2717");
                   CurrentCarrierIndex = CurrentPhrase;
                   CurrentPhrase = 0;
                   getBusNum(CurrentCarrierIndex, CurrentPhrase);
                   if(typeof BusList[CurrentCarrierIndex].routemap !== 'undefined')
                   {
//                     report("2722 " + CurrentCarrierIndex + " " + CurrentPhrase);
                     setSndState(171);
                     announceBusList(2);
                   }
                   }).catch(function(e) {
                     report("2721 state 170 " + e);
                   });
                 else report("2723 p is null");
            }
            else 
            {
              CurrentCarrierIndex = CurrentPhrase;
              CurrentPhrase = 0;
              getBusNum(CurrentCarrierIndex, CurrentPhrase);
              if(typeof BusList[CurrentCarrierIndex].routemap !== 'undefined')
              {
                setSndState(171);
                announceBusList(2);
              }
              else report("2750 state 170 routemap undefined");
            }
          }
          else if(x == 5)
          {
            CurrentPhrase -= 1;
            if(CurrentPhrase < 0) CurrentPhrase = 0;
            announceBusList(1);
          }          
          break;
      case 171:  // bus
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
            say("OK");
            CloseMenu();
          }
          else if(x == 1)
          {
            CurrentPhrase += 1;
            if(CurrentPhrase >= BusList[CurrentCarrierIndex].routemap.length) CurrentPhrase = 0;
            getBusNum(CurrentCarrierIndex,CurrentPhrase);
            announceBusList(3);                        
          }
          else if(x == 3)
          {
            capcolor = "red"
            DISPLAYTYPE = 4;
//            qupdateDisplay();
            say("Selected " + BusNum + ". " + BusDesc);
            CurrentPhrase = 0;
            updateDisplay1().then(function() {
                say("There are " + DSND.length + " active vehicles.");
                if(DSND.length == 0)
                {
                  quiet();
                  say("OK");
                  setTimeout(waitfortrips, 5000);
                }
                else
                {
                  setSndState(172);
                  announceFindBusX(0);
                }
            }).catch(function(e) {
                report("2784 " + e);
                say("Error " + e);
                setSndState(0);
                quiet();
            });
          }
          else if(x == 5)
          {
            CurrentPhrase -= 1;
            if(CurrentPhrase < 0) CurrentPhrase = 0;
            getBusNum(CurrentCarrierIndex,CurrentPhrase);
            announceBusList(3);
          }          
          break;
       case 172: // announceFindBus
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          else if(x == 1)
          {
            if(CurrentPhrase + 1 < DSND.length) CurrentPhrase += 1;
            announceFindBusX(CurrentPhrase);
          }
          else if(x == 5)
          {
            if(CurrentPhrase > 0) CurrentPhrase -= 1;
            announceFindBusX(CurrentPhrase);               
          }
          else if(x == 4)
          {
//            spRec();
          }
          else if(x == 3)
          {
            CurrentTripID = DSND[CurrentPhrase].trip_id;
            capt = "Bus " + DSND[CurrentPhrase].route_id + " " + DSND[CurrentPhrase].trip_name + "  to " + DSND[CurrentPhrase].dest;
            DISPLAYTYPE = 1;
//            showTrip(tl.trip_id, hs, z.startid, z.destid, z.starttime);
            updateDisplay();
            CurrentPhrase = 0;
            setSndState(10); 
            setTimeout(announceTrip, 3000);
          }  
          break;
       case 200: 
           
           break;
      default:
          if(x == 2) // stop audio
          {
            setSndState(0);
            quiet();
          }
          break;
    }
//    report("  next setSndState(" + SNDSTATE);
  }
}


const DayArray = ["Today", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const SelTimeArray = ["Now", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "noon",
   "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "midnight"];
   
const SelTimeIndex = [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

function snd_end()
{
  switch(SNDSTATE)
  {
      case 1:
         setSndState(0);
         break;
      case 2:
      case 3:
      case 5:
      case 6:
      case 7:
         setTimeout(endUpdate, 2000);
//         CurrentPhrase += 1;
         break;
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
          break;
      default:
//         setSndState(0);
         break;
  }
//  report("snd_end state = " + SNDSTATE + " CurrentPhrase = " + CurrentPhrase);
          
}

function endUpdate()
{
   CurrentPhrase += 1; 
}

function quiet()
{
  if(synth != null) 
  {
    synth.cancel();   
  }
  stopSpeechRec();
//  CurrentPhrase = 0;
  CloseMenu();
}

function spause()
{
  if(synth != null) synth.pause();   
}

function sresume()
{
  if(synth != null) synth.resume();   
}

function sayCurrentTime()
{
  say(sndtime);
}

function sayTime(hr, min)
{
  say(hr + " " + min);
}

function sayMinutes(min)
{
  if(min == 1) say("one minute");
  else if(min == 0) ;
  else say(min + " minutes");
}

function announceSearchStops()
{
    
}

var bXtra = true;

function announceMonitor(sw, lat, lon, stop_id)
{
  if(sw != null) 
  {
      var se = fixDest(sw);
      say(se);
//      report(se);
  }
  if((lat != null) && (lon != null))
  {
    var p = getPositionForId(stop_id);
    var dx = getDistanceBetween(lat, lon, p.x, p.y);
    var d = Math.round( 10 * dx) / 10 + " miles ";
    var d2 = Math.round( 10 * getDistanceFrom(stop_id, Place_id)) / 10;
    var d3 = Math.round( 10 * getDistanceToHere(lat, lon)) / 10;
//    report("lat = " + lat + " lon = " + lon + " p.x = " + p.x + " p.y = " + p.y);
    if(d3 < 0.21) beep1();
    else if(d2 < 0.21) beep1();
    /*
    if(dx < .21)
    {
      if(bXtra)
      {
        setTimeout(updateVehicles, 30000);
        bXtra = false;
      } 
      else bXtra = true;
    }
    else bXtra = true;
    */
//    report("Monitor " + d + " " + d2 + " " + d3);
    var sn = getStopNameFromID(stop_id);
    if(document.getElementById("bMTS").checked)
    {
      setPlaceId(stop_id);
//      Place_id = stop_id;
//      Place = sn;
    }
    say("Vehicle is " + d + " from " + fixDest(sn));
 //   report("Vehicle is " + d + " from " + getStopNameFromID(stop_id));
//    if(Place_id != stop_id) say(" and " + d2 + " from " + Place);
//    if(Place_id != Here) say(" and " + d3 + " to " + getStopNameFromID(Here));
//    CurrentPhrase = 0;
  }
}

function changePlace(pid)
{
//  if((n == 0) && (typeof CurrentTripZ !== 'undefined') && (typeof CurrentTripZ[CurrentPhrase] !== 'undefined'))
  if(pid != null)
  {            
//    var pid = CurrentTripZ[CurrentPhrase].stop_id;
    var pl = getStopNameFromID(pid);
    say("Change selected stop from " + fixDest(Place) + " to " + fixDest(pl));   
  }
}

var sphrase = "";
const lettersfirst = ['t', 's', 'b', 'p', 'n', 'a', 'h', 'r', 'd', 'l', 'c', 'u', 'm', 'w',
    'f','g', 'y', 'i', 'o', 'e', 'v', 'k', 'j', 'x', 'z', 'q'];
const letters = ['e', 't', 'a', 'o', 'i', 'n', 's', 'h', 'r', 'd', 'l', 'c', 'u', 'm', 'w',
    'f','g', 'p', 'y', 'b', 'v', 'k', 'j', 'x', 'z', 'q'];

function announceSearch(n)
{
//  report("2842 announceSearch " + n);
  if(n == 0)
  {
    sphrase = "";
    if(SNDSTATE == 70)
    {
      var sd = "";
      if(CurrentPhrase == 1) sd = "Train stop?";
      else if(CurrentPhrase == 2) sd = "Subway stop?";   
      else if(CurrentPhrase == 3) sd = "Bus stop?";  
      else if(CurrentPhrase == 0) sd = "All stops?";  
      document.getElementById("spg").innerHTML = sd;
    }
    if(CurrentPhrase == 1) say("Train stop");   
    else if(CurrentPhrase == 2) say("Subway stop");   
    else if(CurrentPhrase == 3) say("Bus stop");  
    else if(CurrentPhrase == 0) say("Search for one of the following: All stops");  
    else  
    {
      beep1();
      setSndState(0);
      if(wpad != null) 
      {
          clearPad();
          document.getElementById("spg").innerHTML = "";
      }
    }
  }
  else if(n == 1)
  {
    if(CurrentPhrase == 0) 
    {
        say("Add a letter to your search phrase. ");
        say(letters[0]);
        document.getElementById("sph").innerHTML = letters[0];
    }
    else
    {
      if(CurrentPhrase < letters.length) 
      {
        say(letters[CurrentPhrase]);
        document.getElementById("sph").innerHTML = letters[CurrentPhrase];
      }
      else
      {
        saySearchPhrase();
        CurrentPhrase = 0;
        document.getElementById("sph").innerHTML = letters[CurrentPhrase];
      }
    }
  }
  else if(n == 3)
  {
    var tf = document.getElementById("spg");
    var bf = (typeof tf !== 'undefined') && (tf != null);
//    report("2897 bf = " + bf + " tf = " + tf + " " + CurrentPhrase);
    if(CurrentPhrase == 0) 
    {
        say("Pick one of the following search results: " + fixDest(SEARCHB[1]));
        if(bf && (SNDSTATE == 72)) document.getElementById("spg").innerHTML =SEARCHB[1];
    }
    else if(CurrentPhrase < SEARCHB.length / 2)
    {
      say(fixDest(SEARCHB[2*CurrentPhrase + 1]));
      if(bf && (SNDSTATE == 72)) document.getElementById("spg").innerHTML = SEARCHB[2*CurrentPhrase + 1];
    }
    else
    {
      CurrentPhrase = 0;
      beep1();
      announceSearch(3);
    }
  }
 
}

function saySearchPhrase()
{
  say("Your search phrase is spelled:");
  report("Your search phrase is spelled: " + sphrase);
  if(SNDSTATE == 71) document.getElementById("spg").innerHTML = sphrase;
  var k = sphrase.length;
  var i = 0;
  while(i < k)
  {
     say(sphrase.substring(i, i + 1) + " "); 
     i += 1;
  }
}

function announceMonitorTrip(n)
{
  if(n == 0)
  {
    if(!bMonitorMode) say("Monitor this trip?");
    else say("Stop monitoring this trip?");
  }
  else if(n == 1)
  {
       
  }
}

const sseln = ["Search by letters", "Search by sketch", "Search by speech"];

function announceSearchSelect()
{
  var l = sseln.length;
  if(!document.getElementById("sprec").checked) l = l-1;
  if(CurrentPhrase >= l) CurrentPhrase = 0;
  
  if( CurrentPhrase < l) 
  {
    say("Do you want to " + sseln[CurrentPhrase]);
  }
}

function announceSearchBySpeak(n)
{
  switch(n) {
      case 0:
          say("Say your search phrase.");
          break;
  }
}

function announceGetFavorites()
{
  var afid = "";
  report("announceGetFavorites " + CurrentPhrase);
  if(CurrentPhrase == 0) 
  {
      say("Select one of the following favorites: Here. " + Here);
      report("  Here = " + Here);
  }
  if(CurrentPhrase == 1) 
  {
      if((Home != "") && (Home != null) && (Home != "null"))  {say ("Home. " + Home);report("  Home = " + Home);}
      else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 2) 
  {
      afid = getFavName(1, 0);
      if(afid != "")  {say ("favorite stop 1 " + afid); report("  fav stop 1 = " + afid);}
      else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 3) 
  {
      afid = getFavName(2, 0);
      if(afid != "") {say ("favorite stop 2. " + afid); report("  fav stop 2 = " + afid);}
      else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 4) 
  {
      afid = getFavName(1, 1);
      if(afid != "")  {say ("favorite trip 1. " + afid); report("  fav trip 1 = " + afid);}
      else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 5) 
  {
      afid = getFavName(2, 1);
      if(afid != "")  {say ("favorite trip 2. " + afid); report("  fav trip 2 = " + afid);}
      else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 6) 
  {
      afid = getFavName(1, 3);
      if(afid != "")  {say ("favorite itinerary 1. " + afid); report("  fav itinerary 1 = " + afid);}
      else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 7) 
  {
      afid = getFavName(2, 3);
      if(afid != "")  {say ("favorite itinerary 2. " + afid); report("  fav itinerary 2 = " + afid);}
      else CurrentPhrase += 1;
  }
  if(CurrentPhrase > 7)
  {
     beep1();
     setSndState(0);  
  }
}

function announceSaveFavorites()
{
  report("announceSaveFavorites " + CurrentPhrase + " " + Place + " " + capt);
  if(CurrentPhrase == 1) {say("Save " + Place + " as Home.");}
  if(CurrentPhrase == 2) {say("Save " + Place + " as favorite stop 1.");}
  if(CurrentPhrase == 3) {say("Save " + Place + " as favorite stop 2.");}
  if(CurrentPhrase == 4)
  {
    if(DISPLAYTYPE == 1) {say("Save " + capt + " as favorite trip 1.");}
    else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 5)
  {
    if(DISPLAYTYPE == 1) {say("Save " + capt + " as favorite trip 2.");}
    else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 6)
  {
    if(DISPLAYTYPE == 3) {say("Save " + capt + " as favorite itinerary 1.");}
    else CurrentPhrase += 1;
  }
  if(CurrentPhrase == 7)
  {
    if(DISPLAYTYPE == 3) {say("Save " + capt + " as favorite itinearary 2."); return;}
    else CurrentPhrase += 1;
  }
  if(CurrentPhrase > 7)
  {
     beep1();
     setSndState(0);  
  }
 
}

function announceStrategies(n)
{
  var k = TS.length;
  if(n == 0)
  {
    say("There were " + k + " strategies examined.^");
  }
  if(CurrentPhrase < TS.length)
  {
    var k1 = TS[CurrentPhrase].length;
    var i1 = 0;
    say("Strategy " + CurrentPhrase + " of " + k + " has " +  k1 + " legs.^");
    for(i1 = 0; i1 < k1; i1++)
    {
      var leg = TS[CurrentPhrase][i1];
      var r = getRoute(leg.routeid);
      var sw1 = leg.routeid;
      if(r != null) sw1 = r.route_name;
      say("Leg " + i1 + " is from " + fixDest(getStopNameFromID(leg.startid)) + " to " +  fixDest(getStopNameFromID(leg.destid)) + " on route " + sw1 + "^ " + fixDest(leg.routeS) + ".^");
    }
    say("Repeat this?");
  }
  else
  {
    say("End of Strategies List.^ Start again?");
    setSndState(122);  
  }
}

function announceConnections()
{
   var k = ctnx.TripOptions.length;
   if(k == 0)
   {
     say("Sorry, no possible trips were found."); 
     if(TS != null)
     {
       var k7 = TS.length;
       if(k7 > 0)
       {
         say("Do you want to list the " + k7 + " strategies?");
         setSndState(120);
       }
       else setSndState(0);
     }
     else setSndState(0);   
   }
   else 
   {
     say("Here is a list of some possible trips from " + fixDest(getStopNameFromID(ctnx.startid)) + " to " + fixDest(getStopNameFromID(ctnx.destid))  );
     setSndState(31);
     CurrentPhrase = 0;
     announceConnectionsX();
   }
   bAnnounceConnections = false;
}

function announceConnectionsX()
{
  var k = ctnx.TripOptions.length;
  while((CurrentPhrase < k) && ( k != 0) && !checkTripOption(ctnx.TripOptions[ CurrentPhrase]))
  {
    CurrentPhrase += 1;  
  }
  if(k == 0)
  {
    say("Sorry, no possible trips were found.");   
    setSndState(0);   
  }
  else if(CurrentPhrase >= k)
  {
    beep1();
    CurrentPhrase = 0;
    say("Repeating the options.");
    announceConnectionsX();
  }
  else if(CurrentPhrase < k)
  {
    if(CurrentPhrase == 0)
    {
      if(k == 1) say("Connections List of one option.");
      else say("Connections List of " + k + " options.");
    }
    var sp = fixDest(getStopNameFromID(ctnx.startid));
    var dp = fixDest(getStopNameFromID(ctnx.destid));
    var g = ctnx.TripOptions[ CurrentPhrase];
    var t1 = getTimeString(g.legs[0].starttime);
    var t2 = getTimeString(g.legs[g.legs.length -1].desttime);
    var t3 = g.legs[g.legs.length -1].desttime - g.legs[0].starttime;
    var myt = (Math.floor(t3/60) % 60);
    var s ="Option " + (CurrentPhrase + 1) + ", Depart " + sp + " at " + t1 + ", arrive " + dp + " at " + t2 + " with " + (g.legs.length - 1) + " transfers.";
    if(typeof g.check != 'undefined')
    {
       var t = g.check.duration;
       if(t > 7200) // 2 hrs
       {
         var h = Math.floor(t/3600);
         var m = Math.floor(t/60) % 60;
         if(h == 1)
         {
           s += " This option takes one hour and " + m + " minutes.";
         }
         else
         {
           s += " This option takes " + h + " hours and " + m + " minutes.";   
         }
       }
    }
    report(s);
    say(s);
  }
  else
  {
    beep1();
    CurrentPhrase = 0;
  }
}

var ACDXOptionNumber = -1;

function announceConnectionDetailsX(n)
{
  if(n == 0)
  {
    var sp = fixDest(getStopNameFromID(ctnx.startid));
    var dp = fixDest(getStopNameFromID(ctnx.destid));
    var g = ctnx.TripOptions[ACDXOptionNumber];
    var t1 = getTimeString(g.legs[0].starttime);
    var t2 = getTimeString(g.legs[g.legs.length -1].desttime);
    var t3 = g.legs[g.legs.length -1].desttime - g.legs[0].starttime;
    var t4 = getTimeString(g.legs[0].desttime);
    var myt = (Math.floor(t3/60) % 60);
    var s ="Selected option " + (ACDXOptionNumber + 1) + ", Depart " + sp + " at " + t1 + ", arrive " + dp + " at " + t2 + " with " + (g.legs.length - 1) + " transfers.";
    report(s);
    say(s);
    var ridp = getPhraseForRoute(g.legs[0].routeid,g.legs[0].tripleg.trip_name );
//    report("ridp " + g.legs[0].routeid + " " + g.legs[0].tripleg.trip_name + " " + ridp);
    s = "Leg " + (CurrentPhrase + 1) + " " + ridp + " departs " + fixDest(getStopNameFromID(g.legs[0].startid)) + " at " + t1 + " and arrives at " + fixDest(getStopNameFromID(g.legs[0].destid)) + " at " + t4;
    say(s);
    report("leg routeS = " + g.legs[0].routeS + " routid = " + g.legs[0].routeid);
    if(g.legs.length > 1) ; //say("Leg details?");
    else say("Final leg.");
  }
  else if(n == 1)
  {
    var g = ctnx.TripOptions[ACDXOptionNumber];
    if(CurrentPhrase < g.legs.length)
    {
      var t0 = 0;
      if(CurrentPhrase > 0) t0 = g.legs[CurrentPhrase -1].desttime;
      var t1 = g.legs[CurrentPhrase].starttime;
      var t4 = g.legs[CurrentPhrase].desttime;
      var ctime = (t1 - t0) / 60;
      if(ctime > 60)
      {
        ctime = Math.floor(ctime/60) + " hr " + Math.floor(ctime % 60) + " min";
      }
      else ctime = Math.floor(ctime) + " min";
      s = "You have " + ctime + " to change to next connection.";
      report(s);
      say(s);
      var ridp = getPhraseForRoute(g.legs[CurrentPhrase].routeid, g.legs[CurrentPhrase].tripleg.trip_name);
      s = "Leg " +  (CurrentPhrase + 1) + " " + fixDest(ridp) +  " departs " + fixDest(getStopNameFromID(g.legs[CurrentPhrase].startid)) + " at " + getTimeString(t1) + " and arrives at " + fixDest(getStopNameFromID(g.legs[CurrentPhrase].destid)) + " at " + getTimeString(t4);
      report(s);
      say(s);
      if(g.legs.length > (CurrentPhrase + 1)) ; //say("Leg details?");
      else 
      {
          report("Final leg");
          say("Final leg.");
      }
    }
      
  }
}

function getPhraseForRoute(r, t)
{
  var p = "";
//  report("getPhraseForRoute " + r);
  if(r.indexOf("CR-") == 0) p = "Train " + t + " " + r.substring(3) + " line";
  else if(!isNaN(r)) p = "Bus " + r;
  else if((r == "Orange") || (r == "Red") || (r == "Blue") || (r.indexOf("Green") == 0))
      p = r + " line ";
  else if(r.indexOf("PP") == 0) p = "Peter Pan bus";
  else if(r.indexOf("PB") == 0) p = "Plymouth Brocton bus";
  else if(r.indexOf("GH") == 0) p = "Greyhound bus";
  else if(r.indexOf("AD") == 0) p = "Am track train";
  else if(r.indexOf("AV") == 0) p = "Am track train";
  else if(r.indexOf("AM") == 0) p = "Am track train";
  else if(r.indexOf("AE") == 0) p = "Am track train";
  else if(r.indexOf("AR") == 0) p = "Am track train";
  else if(r.indexOf("AL") == 0) p = "Am track train";
  else if(r.indexOf("AA") == 0) p = "Am track train";
  else if(r.indexOf("VM") == 0) p = "Am track train";
  else if(r.indexOf("VIA") == 0) p = "Via Rail train";
  else if(r.indexOf("HN") == 0) p = "Steamship Authority ferry";
  else if(r.indexOf("MV") == 0) p = "Steamship Authority ferry";
  else if(r.indexOf("OB") == 0) p = "Hy Line ferry";
  else if(r.indexOf("PY") == 0) p = "The Cat ferry";
  else if(r.indexOf("BPH") == 0) p = "Boston Harbor Cruise ferry";
  else if(r.indexOf("BP") == 0) p = "Bay State Cruise Company ferry";
  else if(r.indexOf("Y") == 0) p = "New Jerset Transit Bus";
  else if(r.indexOf("RIPT") == 0) p = "Rhode Island Public Transit Bus";
  else if(r.indexOf("CZ") == 0) p = "Concord Coach Bus";
  else if(r.indexOf("MN") == 0) p = "Metro North";
  else if(r.indexOf("LI") == 0) p = "Long Island Rail";
  else if(r.indexOf("LGA") == 0) p = "Laguardia Airport Bus";
  else if(r.indexOf("JFK") == 0) p = "JFK Air train";
  else if(r.indexOf("NAT") == 0) p = "Newark Air train";
  else if(r.indexOf("LWB") == 0) p = "Logan Express Bus";
 
  else p = r;
  return(p);
}

function monitorItinerary(itin)
{
  
  var itinstart = itin.legs[0].starttime;
  var itinstop = itin.legs[itin.legs.length -1].desttime;
  var nowtime = Math.ceil(NOW / 1000);
  var t1 = itinstart - nowtime;
  var t2 = itinstop - nowtime;
  report("nowtime = " + nowtime + " start = " + itinstart + " stop = " + itinstop + " t1 = " + t1 + " t2 = " + t2);
  if((t1 < 3600) && (t2 > 0))
  {
    // ok to start monitor 1 hr before trip and before scheduled completion
    if(t1 > 300)
    {
      var sx = getStopNameFromID(itin.legs[0].startid);
      var pt1 = getPositionForName(sx);
      var d = getDistanceBetween(pt1.x, pt1.y, Xpos, Ypos);
      d = Math.ceil(10 * d) / 10;
      var td = d * 19.5;
      td = Math.ceil(10 * td) / 10;
      if((d >= WALK_LIMIT) && (d < 2))
      {
        say("Start station, " + sx + ", is " + d + " miles away from here.");
      }
      if((d < WALK_LIMIT) && (d > .05))
      {
        say("You are " + d + " miles or " + td + " minutes away from the " + sx  + " stop.");
      }
    }
    setMonitorCnx(true);
  }
  else
  {
    say("The selected itinerary is not within a one hour time window.");
  }
}

function announceBusList(n)
{
  switch(n)
  {
      case 0:
          say("First select one of the following carriers.^");
      case 1:
          if(BusList[CurrentPhrase].loaded) say(BusList[CurrentPhrase].name + " already loaded.");
          else say(BusList[CurrentPhrase].name);
          break;
      case 2:
          say("Select a route from the following.^");
      case 3:
          say(fixDest(BusNum + ". " + BusDesc));
          break;
      default:
          break;
  }
}

function announceNearby()
{
  say("Here is a list of what's nearby " + Place);
  bAnnounceNearby = false;
//  setSndState(30);
  CurrentPhrase = 0;
  announceNearbyX();
}

var wncount = 0;
var bwnlistall = false;

function announceNearbyX()
{
  var k = CSND.length;
  if(k == 0)
  {
    say("There are no stops nearby.");   
    setSndState(0);   
  }
  else if(CurrentPhrase < k)
  {
    if(CurrentPhrase == 0) wncount = 0;
    var g = CSND[CurrentPhrase];
    while(((typeof g.headsign == 'undefined') || bwnlistall) && ((CurrentPhrase + 1) < k))
    {
       CurrentPhrase += 1;
       g = CSND[CurrentPhrase];
    }
    if(typeof g.headsign !== 'undefined')
    {
      var sd = (g.distance);
      sd = sd.toString();
      if(sd.indexOf("0.") == 0) sd = sd.substring(1); 
      else if(sd.indexOf("0") == 0) sd = "zero"; 
      say (g.type + " stop " + fixDest(g.stop_name) + " " + sd + " miles away has " + g.route + " " + g.timestring); 
      wncount += 1;
    }
    else
    {
      var sd = (g.distance);
      sd = sd.toString();
      if(sd.indexOf("0.") == 0) sd = sd.substring(1); 
      else if(sd.indexOf("0") == 0) sd = "zero"; 
      say (g.type + " stop " + fixDest(g.stop_name) + " " + sd + " is miles away."); 
         
    }
  }
  xreport("wncount = " + wncount + " CurrentPhrase = " + CurrentPhrase + " k = " + k);
  if((wncount == 0) && ((CurrentPhrase + 1) == k))
  {
     say("There are no imminent trips near " + fixDest(Place));
  }
  else if((CurrentPhrase + 1) == k)
  {
     say("End of list.");   
  }
  /*
  if((wncount == 0) && ((CurrentPhrase + 1) >= k))
  {
    var nt = getNearestStation1(Xpos, Ypos, false);
    var d1 = Math.round(10 * gnsd) / 10;
    var nb = getNearestStation1(Xpos, Ypos, true);
    var d2 = Math.round(10 * gnsd) / 10;
    if(Here != "") 
    {  
      say(getDescriptionForStop(Here) + " is " + getDistanceFromIdToHere(Here) + " miles away.");
    }
    if((d1 < 10) && (d1 >= 0) && (nt != Here))
    {
      say(getDescriptionForStop(nt) + " is " + d1 + " miles away.");
    }
    if((d2 < 2) && (d2 >= 0) && (nb != nt) && (nb != Here))
    {
      say(getDescriptionForStop(nb) + " is " + d2 + " miles away.");
    }
      
  }
  */
  else
  {
    beep1();
//    setSndState(0);   
  }
}

function announceStatus()
{
  report("announce status");
  sayCurrentTime();
  var i = 0;
  var st = fixDest(getDescriptionForStop(Place_id));
  if(bMonitorMode) st += " monitor";
  if(!bOnLine) st += " offline mode"
  CurrentPhrase = 0;  
  say(st);
}

function fixDest(dest)
{
  var st = " ";
  if((typeof dest === 'undefined') || (dest == "undefined")) ;
  else 
  {
  st = dest + " ";
  if(st.indexOf("/") != -1) st = st.replace("/", " / ");
  var i = -1;
  if((i = st.indexOf("ME_")) != -1) st = st.replace("ME_"," ");
  if((i = st.indexOf("-ME")) != -1) st = st.replace(/-ME/g, " Maine ");
  if((i=st.indexOf("-VT")) != -1) st = st.replace("-VT", " Vermont ");
  if((i=st.indexOf("VT")) != -1) st = st.replace("VT", " Vermont ");
  if((i=st.indexOf("-RI")) != -1) st = st.replace("-RI", " Rhode Island ");
  if((i=st.indexOf("MTA_NYCT_")) != -1) st = st.replace(/MTA_NYCT_/g, " ");
  else if((i=st.indexOf("MTA NYCT_")) != -1) st = st.replace(/MTA NYCT_/g, " ");
  else if((i=st.indexOf("NYC")) != -1) st = st.replace(/NYC/g, " New York ");
  else if((i=st.indexOf("NY")) != -1) st = st.replace(/NY/g, " New York ");
  if((i=st.indexOf("NewHaven_StateSt-CT")) != -1) st = st.replace("NewHaven_StateSt-CT", " New Haven State Street Connecticuit ");
  else if((i=st.indexOf("NH-State St")) != -1) st = st.replace("NH-State St", " New Haven State Street ");
  else if((i=st.indexOf("NH")) != -1) st = st.replace("NH", " New Hampshire ");
  if((i=st.indexOf("IN_TRANSIT_TO")) != -1) st = st.replace("IN_TRANSIT_TO", " in transit to ");
  else if((i=st.indexOf("INCOMING_AT")) != -1) st = st.replace("INCOMING_AT", " incoming at ");
  else if((i=st.indexOf("STOPPED_AT")) != -1) st = st.replace("STOPPED_AT", " stopped at ");
  if((i=st.indexOf("CTA")) != -1) st = st.replace(/CTA/g, " Chicago Transit ");
  else if((i=st.indexOf("CTR")) != -1) st = st.replace(/CTR/g, " Center ");
  else if((i=st.indexOf(" CT ")) != -1) st = st.replace(/CT/g, " Connecticut ");
  if((i=st.indexOf("QC")) != -1) st = st.replace("QC", " Quebec ");
  if((i=st.indexOf("NB")) != -1) st = st.replace("NB", " New Brunswick ");
  if((i=st.indexOf("-NS")) != -1) st = st.replace("-NS", " Nova Scotia ");
  if((i=st.indexOf("-ON")) != -1) st = st.replace("-ON", " Ontario ");
  if((i=st.indexOf("-WA")) != -1) st = st.replace("-WA", " Washington ");
  if((i=st.indexOf("-BC")) != -1) st = st.replace("-BC", " British Columbia ");
  if((i=st.indexOf("-KS")) != -1) st = st.replace("-KS", " Kansas ");
  if((i=st.indexOf("-KY")) != -1) st = st.replace("-KY", " Kentucky ");
  if((i=st.indexOf("-AZ")) != -1) st = st.replace("-AZ", " Arizona ");
  if((i=st.indexOf("-NM")) != -1) st = st.replace("-NM", " New Mexico ");
  if((i=st.indexOf("-OK")) != -1) st = st.replace("-OK", " Oklahoma ");
  if((i=st.indexOf(" MA ")) != -1) st = st.replace(" MA ", " Massachusetts ");
  if((i=st.indexOf("-MA")) != -1) st = st.replace("-MA", " Massachusetts ");
  if((i=st.indexOf("-Ill")) != -1) st = st.replace("-Ill", " Illinois ");
  if((i=st.indexOf("-IL")) != -1) st = st.replace("-IL", " Illinois ");
  if((i=st.indexOf("-CA")) != -1) st = st.replace("-CA", " California ");
  if((i=st.indexOf("-CO")) != -1) st = st.replace("-CO", " Colorado ");
  if((i=st.indexOf("-LA")) != -1) st = st.replace("-LA", " Louisiana ");
  if((i=st.indexOf("-FL")) != -1) st = st.replace("-FL", " Florida ");
  if((i=st.indexOf("-WI")) != -1) st = st.replace("-WI", " Wisconsin ");
  if((i=st.indexOf("-OR")) != -1) st = st.replace("-OR", " Oregon ");
  if((i=st.indexOf("-OK")) != -1) st = st.replace("-OK", " Oklahoma ");
  if((i=st.indexOf("-OH")) != -1) st = st.replace("-OH", " Ohio ");
  if((i=st.indexOf("-MI")) != -1) st = st.replace("-MI", " Michigan ");
  if((i=st.indexOf("-IN")) != -1) st = st.replace("-IN", " Indiana ");
  if((i=st.indexOf("-TX")) != -1) st = st.replace("-TX", " Texas ");
  if((i=st.indexOf("-TN")) != -1) st = st.replace("-TN", " Tennessee ");
  if((i=st.indexOf("-MS")) != -1) st = st.replace("-MS", " Mississippi ");
  if((i=st.indexOf("-MO")) != -1) st = st.replace("-MO", " Missouri ");
  if((i=st.indexOf("-AL")) != -1) st = st.replace("-AL", " Alabama ");
  if((i=st.indexOf("-AR")) != -1) st = st.replace("-AR", " Arkansas ");
  if((i=st.indexOf("-VA")) != -1) st = st.replace("-VA", " Virginia ");
  if((i=st.indexOf("-MN")) != -1) st = st.replace("-MN", " Minnesota ");
  if((i=st.indexOf("-WI")) != -1) st = st.replace("-WI", " Wisconsin ");
  if((i=st.indexOf("-ND")) != -1) st = st.replace("-ND", " North Dakota ");
  if((i=st.indexOf("-NC")) != -1) st = st.replace("-NC", " North Carolina ");
  if((i=st.indexOf("-NE")) != -1) st = st.replace("-NE", " Nebraska ");
  if((i=st.indexOf("-GA")) != -1) st = st.replace("-GA", " Georgia ");
  if((i=st.indexOf("-SD")) != -1) st = st.replace("-SD", " South Dakota ");
  if((i=st.indexOf("-SC")) != -1) st = st.replace("-SC", " South Carolina ");
  if((i=st.indexOf("-NV")) != -1) st = st.replace("-NV", " Nevada ");
  if((i=st.indexOf("-WV")) != -1) st = st.replace("-WV", " West Virginia ");
  if((i=st.indexOf("-WY")) != -1) st = st.replace("-WY", " Wyoming ");
  if((i=st.indexOf("-MT")) != -1) st = st.replace("-MT", " Montana ");
  if((i=st.indexOf("-OR")) != -1) st = st.replace("-OR", " Oregon ");
  if((i=st.indexOf("-IA")) != -1) st = st.replace("-IA", " Iowa ");
  if((i=st.indexOf("-DC")) != -1) st = st.replace("-DC", " D C ");
  if((i=st.indexOf("-UT")) != -1) st = st.replace("-UT", " Utah ");
  if((i=st.indexOf("NJT")) != -1) st = st.replace("NJT", " New Jersey Transit ");
  if((i=st.indexOf("-NJ")) != -1) st = st.replace("-NJ", " New Jersey ");
  if((i=st.indexOf("NJ")) != -1) st = st.replace("NJ", " New Jersey ");
  if((i=st.indexOf("PATH")) != -1) ;
  else if((i=st.indexOf("-PA")) != -1) st = st.replace("-PA", " Pennsylvania ");
  if((i=st.indexOf("-DE")) != -1) st = st.replace("-DE", " Delaware ");
  if((i=st.indexOf("-MD")) != -1) st = st.replace("-MD", " Maryland ");
  if((i=st.indexOf(", MD")) != -1) st = st.replace("MD", " Maryland ");
  if((i=st.indexOf("M-F")) != -1) st = st.replace("M-F", " Monday through Friday ");
  if((i=st.indexOf("M-Th")) != -1) st = st.replace("M-Th", " Monday through Thursday ");
  if((i=st.indexOf("Su-Th")) != -1) st = st.replace("Su-Th", " Sunday through Thursday ");
  if((i=st.indexOf("MF")) != -1) st = st.replace("MF", " Monday through Friday ");
  if((i=st.indexOf("SaSu")) != -1) st = st.replace("SaSu", " Saturday and Sunday ");
  if((i=st.indexOf(" Sa ")) != -1) st = st.replace(" Sa ", " Saturday ");
  if((i=st.indexOf("F-Sa")) != -1) st = st.replace("F-Sa", " Friday and Saturday ");
  if((i=st.indexOf(" Su ")) != -1) st = st.replace(" Su ", " Sunday ");
  if((i=st.indexOf("Jct")) != -1) st = st.replace("Jct", " Junction ");
  if((i=st.indexOf("AMTRAK")) != -1) st = st.replace("AMTRAK", " am track ");
//  if((i=st.indexOf("Avenue")) != -1)  ;
  if((i=st.indexOf(" AV ")) != -1) st = st.replace(" AV ", " Avenue ");
  if((i=st.indexOf("Ave ")) != -1) st = st.replace(/Ave /g, " Avenue ");
  else if((i=st.indexOf("Ave,")) != -1) st = st.replace(/Ave,/g, " Avenue ");
  else if((i=st.indexOf("Ave.")) != -1) st = st.replace(/Ave./g, " Avenue ");
  if((i=st.indexOf("St Albans ")) != -1) st = st.replace("St Albans", " Saint Albans ");
  else if((i=st.indexOf("St. Albans ")) != -1) st = st.replace("St. Albans", " Saint Albans ");
  else if((i=st.indexOf("StAlbans")) != -1) st = st.replace("StAlbans", " Saint Albans ");
  else if((i=st.indexOf("St. Louis ")) != -1) st = st.replace("St. Louis", " Saint Louis ");
  else if((i=st.indexOf("St Louis ")) != -1) st = st.replace("St Louis", " Saint Louis ");
  else if((i=st.indexOf("St George ")) != -1) st = st.replace("St George", " Saint George ");
  else if((i=st.indexOf(" St /")) != -1) st = st.replace(/St \/ /g, " Street ");
  else if((i=st.indexOf(" St ")) != -1) st = st.replace(/St /g, " Street ");
  else if((i=st.indexOf(" ST ")) != -1) st = st.replace(/ST /g, " Street ");
  if((i=st.indexOf("Sq ")) != -1) st = st.replace(/Sq /g, " Square ");
  if((i=st.indexOf("Blvd ")) != -1) st = st.replace(/Blvd /g, " Boulevard ");
  if((i=st.indexOf(" opp ")) != -1) st = st.replace(" opp ", " opposite ");
  if((i=st.indexOf(" W ")) != -1) st = st.replace(" W ", " west ");
  if((i=st.indexOf("Green E")) != -1) ;
  else if((i=st.indexOf(" E ")) != -1) st = st.replace(" E ", " east ");
  if((i=st.indexOf(" S ")) != -1) st = st.replace(" S ", " south ");
  if((i=st.indexOf(" N ")) != -1) st = st.replace(" N ", " north ");
  if((i=st.indexOf("N ")) == 0) st = st.replace("N ", "North ");
  if((i=st.indexOf("S ")) == 0) st = st.replace("S ", "South ");
  if((i=st.indexOf("W ")) == 0) st = st.replace("W ", "West ");
  if((i=st.indexOf("E ")) == 0) st = st.replace("E ", "East ");
  if((i=st.indexOf(" NB")) != -1) st = st.replace(" NB", "Northbound ");
  if((i=st.indexOf(" SB")) != -1) st = st.replace(" SB", "Southbound ");
  if((i=st.indexOf(" WB")) != -1) st = st.replace(" WB", "Westbound ");
  if((i=st.indexOf(" EB")) != -1) st = st.replace(" EB", "Eastbound ");
  if((i=st.indexOf(" NE ")) != -1) st = st.replace(" NE ", " Northeast ");
  if((i=st.indexOf(" SE ")) != -1) st = st.replace(" SE ", " Southeast ");
  if((i=st.indexOf(" NW ")) != -1) st = st.replace(" NW ", " Northwest ");
  if((i=st.indexOf(" SW ")) != -1) st = st.replace(" SW ", " Southwest ");
  if((i=st.indexOf("_")) == 0) st = st.replace("_", " ");
  if((i=st.indexOf(" Ny ")) != -1) st = st.replace(" Ny ", " New York ");
  if((i=st.indexOf(" Pk ")) != -1) st = st.replace(" Pk ", " park ");
  if((i=st.indexOf(" Rd ")) != -1) st = st.replace(" Rd ", " Road ");
  if((i=st.indexOf(" Pkwy")) != -1) st = st.replace(" Pkwy", " Parkway ");
  if((i=st.indexOf(" Tpke")) != -1) st = st.replace(" Tpke", " Turnpike ");
  if((i=st.indexOf("Mt ")) != -1) st = st.replace("Mt ", " mount ");
  if((i=st.indexOf("MIT")) != -1) st = st.replace("MIT", " M I T ");
  if((i=st.indexOf("RTA")) != -1) st = st.replace("RTA", " R T A ");
  if((i=st.indexOf(" LA ")) != -1) st = st.replace(" LA ", " L A ");
  if((i=st.indexOf(" Lax ")) != -1) st = st.replace(" Lax ", " L A X ");
  if((i=st.indexOf("/ Rte ")) != -1) st = st.replace(" Rte ", " route ");
  if((i=st.indexOf("/Rte ")) != -1) st = st.replace(" Rte ", " route ");
  if((i=st.indexOf("Rt ")) != -1) st = st.replace("Rt ", " route ");
  if((i=st.indexOf(" Ctr")) != -1) st = st.replace(" Ctr", " center ");
  else if((i=st.indexOf(" Ct")) != -1) st = st.replace(" Ct", " court ");
  if((i=st.indexOf(" Cty ")) != -1) st = st.replace(" Cty ", " city ");
  if((i=st.indexOf("@")) != -1) st = st.replace("@", " at ");
  if((i=st.indexOf("-")) != -1) st = st.replace("-", " ");
  if((i=st.indexOf("Ayer ")) != -1) st = st.replace("Ayer ", " air ");
  var sw = st + " "; 
  if((i=sw.indexOf(" Dr ")) != -1) st = st.replace(" Dr ", " Drive ");
  if((i=sw.indexOf(" DR ")) != -1) st = st.replace(" Dr ", " Drive ");
  if((i=sw.indexOf(" Pz ")) != -1) st = st.replace(" Pz ", " Plaza ");
  if((i=sw.indexOf(" Ter ")) != -1) st = st.replace(" Ter ", " Terrace ");
  if((i=sw.indexOf(" Sta ")) != -1) st = st.replace(" Sta ", " station ");
  if((i=st.indexOf("P.A.B.T.")) != -1) st = st.replace("P.A.B.T.", " Port Authority Bus Terminal ");
  if((i=st.indexOf("Lechmere")) != -1) st = st.replace("Lechmere", " leach meer ");
  if((i=st.indexOf("Reading")) != -1) st = st.replace("Reading", " red ing ");
  if((i=st.indexOf("_")) != -1) st = st.replace(/_ /g, " ");
  if((i=st.indexOf("(dir")) != -1) st = st.replace("(dir", " direction ");
  if((i=st.indexOf("LIRR")) != -1) st = st.replace("LIRR", " Long Island Rail ");
  if((i=st.indexOf("WTC")) != -1) st = st.replace("WTC", " World Trade Center ");
  if((i=st.indexOf("LRS")) != -1) st = st.replace("LRS", " Light Rail Station ");
  if((i=st.indexOf("Transp.")) != -1) st = st.replace("Transp.", " Transportation ");
  if((i=st.indexOf("Trans.")) != -1) st = st.replace("Trans.", " Transportation ");
  if((i=st.indexOf("Opp ")) != -1) st = st.replace("Opp ", " opposite ");
  if((i=st.indexOf("Nat\'l ")) != -1) st = st.replace("Nat\'l ", " National ");
  if((i=st.indexOf("Ccri")) != -1) st = st.replace("Ccri", " Community College of Rhode Island ");
  if((i=st.indexOf("CZ1")) != -1) st = st.replace("CZ1", " Concord Coach ");
  if((i=st.indexOf("Santa Fe")) != -1) st = st.replace("Santa Fe", " Santa Fay ");
  if((i=st.indexOf("Surfliner")) != -1) st = st.replace("Surfliner", " Surf liner ");
  if((i=st.indexOf("BOB")) != -1) st = st.replace("BOB", " bee oh bee ");
  if((i=st.indexOf("WAB")) != -1) st = st.replace("WAB", " venger alp bahn ");
  if((i=st.indexOf("_")) != -1) st = st.replace(/_/g, " ");
  if((i=st.indexOf("AMRAMTK")) != -1) st = st.replace("AMRAMTK", " Amtrak ");
  if((i=st.indexOf("AMR")) != -1) st = st.replace("AMR", " Amtrak ");
}
  return(st);  
}

function fixIdNumber(n)
{
  var st = n.toString().trim();
  if((i=st.indexOf("-MA")) != -1) st = st.replace("-MA", " Massachusetts ");
  if(!isNaN(n))
  {
    var k = st.length;
    if(n <= 999) //(k == 3)
    {
      var a = st.substring(0, 1);
      var b = st.substring(1);
      if(b == "00") b = " hundred";
      else
      {
        var i = b.indexOf("0");
        if(i == 0) b = " oh " + b.substring(1);
      }
      st = a + " " + b;
    }
    else if(n < 9999) //(k == 4)
    {
      var a = st.substring(0, 2);
      var b = st.substring(2);
      if(b == "00") b = " hundred";
      else
      {
        var i = b.indexOf("0");
        if(i == 0) b = " oh " + b.substring(1);
      }
      st = a + " " + b;         
    }
  }
  return(st);
}

function announceTrainBoard(n)
{
//  report("announce train board");
 // CurrentPhrase = 0;  
  var b = true;
  var bcount = 0;
  var k = ASND.length;
//  report("announce train board length = " + k);
  var i = 0;
  if(k == 0)
  {
    beep1();
    setSndState(0);
    b = false;
  }
  if(n == 0)
  {
    while(b && (i < k))
    {
      b = announceTB1(i);
      i += 1;
    }
    if(b && (i >= k) && (k != 0))
    {
//    beep1();
    setSndState(0);         
    }
  }
  else
  {
    if((CurrentPhrase) < ASND.length)
    {
      announceTB1(CurrentPhrase);
    }
    else
    {
      say("End of list.");
      CurrentPhrase = ASND.length -2;
      if(CurrentPhrase < 0) CurrentPhrase = 0;
    }
  }
}

var bcount = 0;

function announceTB1(i)
{
    var a = ASND[i];
    var b = true;
    if((typeof a !== 'undefined') && (typeof a.dest !== 'undefined'))
    {
    var ad = fixDest(a.dest);
    var atn = fixDest(a.tripname);
//    report("3481 " + atn);
    atn = fixIdNumber(atn);
//    report("announceTB1 i = " + i + " " + a.bFreq + " " + a.timetil + ", " + a.hh);

    bcount = 0;
    var s = "";
    var minph = " minutes ";
//    if(a.bPred) minph = " predicted minutes ";
    var bx = false;
    var p1 = " departs ";
    if((Place.indexOf(a.dest) != -1) && (a.ah != "0")) p1 = "arrives"
//    if(i == (ASND.length -1)) p1 = " arrives ";
//    if(a.ah != "0") p1 = " arrives ";
    var pfx = "train ";
//    report("Place = " + Place + " a.dest = " + a.dest);
    if(a.tripname.indexOf("Bus") != -1) pfx = "";
    if(isBoatStop(a.id)) pfx = " ";
//    if((Place.indexOf(a.dest) != -1) || (a.dest.indexOf(Place) != -1)) ;
//    else 
    if(atn.indexOf("ubway") != -1) atn = atn + " to " + ad;
    if(a.bFreq)
    {
      sayI(atn + " departs frequently ", i);
//      report(": " + atn + " departs frequently ");
    }
    else if(!isNaN(a.id))
    {
      var fid = fixIdNumber(a.id); 
      if(a.timetil != "")
      {
        s = "bus " + fid + " " + a.dir + " to " + ad + p1 + "in " + a.timetil + minph;
//        report("1. " + s);
        sayI(s, i);
      }
      else b = false;
    }
    else if((a.id.indexOf("PB") == 0) || (a.id.indexOf("GH") == 0) || (a.id.indexOf("PP") == 0))
    {
      var fid = fixIdNumber(a.trip_id);  // was a.id
      if(a.timetil != "")
      {
        s = "bus " + fid + " " + a.dir + " to " + ad + p1 + "in " + a.timetil + minph;
//        report("1. " + s);
        sayI(s, i);
      }
      else b = false;
    }
    else if((a.tripname.indexOf("Bus ") != -1) && (a.tripname.indexOf("MTA") != 0))
    {
      var fid = fixIdNumber(a.id);
      if(isNaN(a.id)) fid = fixIdNumber(a.id); // was trip_id
      s = fid + " " + a.dir + " to " + ad + p1 + "in " + a.timetil + minph;
//      report("2. " + s);
      sayI(s, i);
    }
    else
    {
      if(a.timetil != "")
      {
        var st = null;
        if(a.tripname.indexOf(" to ") != -1)
        {
            st = pfx + atn + " " + a.dir + p1 + a.timetil + minph;
        }
        else st = pfx + atn + " " + a.dir + " to " + ad + p1 + "in " + a.timetil + minph;
//        report("3537 " + a.track);
        if((a.status != null) && (a.status != "null") && (a.status != ""))
        {
          if((typeof a.track !== 'undefined') && (a.track != null) && (a.track != "null") && (a.track != ""))
          {
            st += " " + a.status + " on track " + a.track;   
          }
          else st += " " + a.status;
        }
        if(a.ss != "") st += "  currently " + a.ss;
  //      report("3. " + st);
        sayI(st, i);
      }
      else if(a.hh != "")
      {
        var st = null;
        if(a.tripname.indexOf(" to ") != -1)
        {
          var hh = a.hh;
          var mm = a.mm;
          if((p1.indexOf("arrives") != -1) && (a.ah != "0"))
          {
             hh = a.ah;
             mm = a.am;
          }
          st = pfx + atn + " " + a.dir + p1 + makeSndTime(hh, mm, a.bPM);
        }
        else st = pfx + atn + " " + a.dir + " to " + ad + p1 + "at " + makeSndTime(a.hh, a.mm, a.bPM);
        if((a.status != null) && (a.status != "null") && (a.status != ""))
        {
          if((a.track != null) && (a.track != "null") && (a.track != "") && (a.track != "undefined"))
          {
            st += " " + a.status + " on track " + a.track;   
          }
          else st += " " + a.status;
        }
//        report("4. " + st);
        if(a.ss != "") st += "  currently " + a.ss;
        st = fixDest(st);
        sayI(st, i);
        if(bcount > 0) b = false; 
        bcount += 1;
      }
      else 
      {
          report("no speak " + a.bFreq + " " + atn + ", " + a.timetil + ", " + a.dir);
          b = false;
      }
    }
    }
    return(b);
}

function makeSndTime(hh, mm, bPM)
{
    var sndmin = "";
    if(bPM && (hh > 12) && (hh < 24))
    {
      hh -= 12;   
    }
    var hrs = hh.toString();
    var min = mm.toString();
    if(min.length == 1) 
    {
      if(min == "0") sndmin = " oh clock";
      else sndmin = "oh " + min;
    }
    else if(min == "00") sndmin = " oh clock";
    else if(min.indexOf("0") == 0) sndmin = "oh " + min.substring(1);
    else sndmin = min;
    var p = "";
    if(bPM) p = " PM";
    var sndtime = hrs + " " + sndmin + p;
    if(SelectedLanguage == 2)
    {
      sndtime = hrs + " heures " + min + " minutes";
      if(bPM && !document.getElementById("t24cb").checked)
      {
        sndtime += " après-midi";
      }
    }
   
    return(sndtime);
}

function announcePlatforms(n)
{
  report("announce platforms " + n + " " + stps.length);
  var k = stps.length;
  var i = 0;
  if(k > 0)
  {
    if(n == 0)
    {
      say("platforms at this station include ");
      while(i < k)
      {
        sayI(fixDest(getDescriptionForStop(stps[i])), i);
        i += 1;
      }
      say(" or you can ");
      setSndState(4);
      announceStopSelector();
    }
    else
    {
      if(CurrentPhrase == 0) say("platforms at this station include ");
      if((CurrentPhrase) < stps.length)
      {
        sayI(fixDest(getDescriptionForStop(stps[CurrentPhrase])), CurrentPhrase);
      }
      else
      {
        beep1();
        setSndState(0);   
      }
    }
  }
  else
  {
    say("Selecting a stop.");
    setSndState(4);
    announceStopSelector();
      
  }
}

var avgvel = "";
var avgangle = "";

function updateWaypoint()
{ 
  Waypoint2 = Waypoint1;
  Waypoint1 = CurrentWaypoint;
}

function processWaypoints()
{
  avgvel = "";
  avgangle = "";
  if((Waypoint1 != null) && (Waypoint2 != null))
  {
    var dt = (Waypoint1.timestamp - Waypoint2.timestamp) / 1000;
    if(dt != 0)
    {
      if(dt > 10)
      {
        var d = getDistanceBetween( Waypoint1.lat, Waypoint1.lon, Waypoint2.lat,  Waypoint2.lon); // miles
        var vel = Math.round(d / dt * 3600); // mi/hr  
        if((vel > 1) && (vel < 95))
        {
          avgvel = "Your average velocity is " + vel + " miles per hour.";     
        }
          
        var dlat = Waypoint1.lat - Waypoint2.lat;
        var dlon = Waypoint1.lon - Waypoint2.lon;
        var aa = 0;
        if(dlat == 0) ;
        else if(dlon != 0)
        {
          aa = Math.atan(dlat / dlon);   
        }
        report("3551 avgvel = " + avgvel + " at " + (aa * 180 /Math.PI) + " degrees " + dlat + " " + dlon);   
        
        if(DestWaypoint != null)
        {
          var d = getDistanceBetween( Waypoint1.lat, Waypoint1.lon, DestWaypoint.lat,  DestWaypoint.lon); // miles
          var dm = d * 5280 * .305; //meters
          if(dm < Waypoint1.acc) ; // too close, follow signs
        }
      }
    }
  }
}


const DirMenu = ["Get bearings?", "Select an entrance?", "Reset entrance?", "Select another platform?", "Follow a pathway?"];

function announceDirection(n)
{
/*  if(n == 0)
  {
    announceDirection1();
    if(bHasCompass) announceDirection2();
  }
  else 
      */
  say(DirMenu[n]);
  setSndState(150);
}

function announceDirection1()
{
  if((Bearing != 0) && ( DistanceToId != 0)) 
  {
      var s = DistanceToId + " miles away at ";
      if(DistanceToId < 1) s = DistanceToId * 5280 + " feet away at ";
      s += Bearing + " degrees.";
      say("Selected stop " +  fixDest(Place) + " is " + s);   
  }
}

function getDirectionForAngle(deg)
{
  var z = deg;
  var d = "North";
  if((z > 22) && (z < 68)) d = "Northeast";
  else if((z >= 68) && (z < 112)) d = "East"; 
  else if((z >= 112) && (z < 158)) d = "Southeast"; 
  else if((z >= 158) && (z < 202)) d = "South"; 
  else if((z >= 202) && (z < 248)) d = "Southwest"; 
  else if((z >= 248) && (z < 292)) d = "West"; 
  else if((z >= 292) && (z < 348)) d = "Northwest"; 
  return(d);  
}

function announceDirection2()
{
  if(document.getElementById("ecmps").checked && bDeviceOrientation)
  {
  if(bFirstCompass && (Zo == 0)) {say("Click YES for compass reading or NO for bearing."); bFirstCompass = false;}
  else
  {
  if(bCompassEnabled == true) checkCompass();
  var d = "North";
  var z = 360 - Zo;
  d = getDirectionForAngle(z);
  var zx = z;
  var b = Bearing;
  var dd = Math.round(z - b);
  var ds = " left.";
  if(dd > 180) 
  {
    dd = Math.round(360 - dd);
    ds = " right.";
  }
  else if(dd < -180)
  {
    dd = Math.round(360 + dd);
  }
  else if(dd < 0)
  {
    dd = - dd;
    ds = " right. ";
  }
  var zz = Math.round(zx);
  var s = "";
  if( DistanceToId != 0) 
  {
      s = DistanceToId + " miles away and ";
      if(DistanceToId < 1) s = DistanceToId * 5280 + " feet away and ";
  }

  say("You are facing " + d + ", " + zz + " degrees. The stop " + fixDest(Place) + " is " + s + Math.abs(dd) + " degrees to your " + ds);
  }
  if(bCompassEnabled) checkCompass();
  }
  else announceDirection1();
}



/*
const AudioMenu = ["Main menu. Alerts", "What's nearby", "Find Connections", "Select a Common Stop", "Platforms at this station",
 "Search for Stop", "Search by sketching", "Get favorites ", "Save favorites", "Last Connections", "Last Stop", "Last trip","Preferences","Help topics"
];
*/

function announceMenu()
{
  if(CurrentPhrase < AudioMenu[SelectedLanguage].length)
  {
    sayI(AudioMenu[SelectedLanguage][CurrentPhrase], CurrentPhrase);
    setSndState(12);
  }
  else
  {
    setSndState(0);
    beep1();
  }
     
}


const STOPARRAYTITLES = ["Boston, New England", "New York", "New York City","New Jersey","Long Island", "Rhode Island", "Chicago", "Florida", "Los Angeles", "San Francisco", "California","AMTRAK", "VIA Canada"];

const STOPARRAY = ["North Station", "South Station", "Park Street", "State Street", "Aquarium",
    "Kenmore", "Harvard Square","JFK/Umass", "Ruggles", "Nubian",
    "Logan Airport", "Salem", "Hyannis", "Provincetown","Worcester", "Springfield", "Pittsfield", "Portland Maine", "Providence Rhode Island","New York Penn Station", "New Haven Connecticut", "Secaucus NJ", "Albany Rensselaer NY", "Philadelphia","Washington DC","Montreal Quebec"
    ];
const STOPARRAYIDs = ["T_BNT-0000", "T_NEC-2287", "place-pktrm", "place-state","place-aqucl", "place-kencl","place-harsq","T_MM-0023-S", "place-rugg", "64",
"place-aport", "T_ER-0168-S", "2435799", "place-ptown", "T_WML-0442-CS", "AMSSPG","AMSPIT", "AMSPOR", "T_NEC-1851","AMSNYP","NewHaven-CT", "NJ38187","AMSALB","AMSPHL","AMSWAS","VIA226"
    ];
    
const STOPARRAY2 = [ "New York Penn", "New York Grand Central", "Times Square", "Secaucus NJ", "Hoboken NJ", "Jamaica NY JFK Airport", "South Ferry", "Saint George NY", "Mets", "Meadowlands", "Spring Valley NY", "Suffern NY", "Poughkeepsie NY", "Newark Penn", "Newark Airport", "Boston", "New Haven Connecticut", "Philadelphia","Washington DC","Montreal Quebec"];

const STOPARRAYID2 = ["AMSNYP","NewYork-Grand-Central-NY", "NYT127","NJ38187",
"NJ63","LI102","NYT142","NYTS31","LI199",
"NJ40570","NJ142","NJ144","AMSPOU","NJ107","NJ37953",
"T_NEC-2287","NewHaven-CT","AMSPHL","AMSWAS","VIA226"
];

const STOPARRAY3 = ["New York Penn NJ Transit", "Secaucus NJ", "Hoboken NJ", "Newark Penn", "Newark Airport","Trenton", "Princeton", "Atlantic City", "Long Branch", "Bay Head", "Spring Valley NY", "Port Jervis", "Waldwick", "Suffern", "Journal Square", "Toms River", "Lakewood"];

const STOPARRAYID3 = ["NJ105","NJ38187","NJ63","NJ107","NJ37953","NJ148","NJR14","NJ10", "NJ74", "NJ13","NJ142","NJ123","NJ151","NJ144","PATH26731", "NZ3603","NZ3539"];

const STOPARRAY4 = ["New York Penn Long Island","Grand Central Madison","Jamaica JFK Airport","Atlantic Terminal","Babylon", "Hicksville","Port Washington","Mineola","Hempstead","Long Beach","Port Jefferson", "Far Rockaway", "Ronkonkoma", "Oyster Bay", "West Hempstead", "Speonk"];
    
const STOPARRAYID4 = ["LI237","LI349","LI102","LI241","LI27","LI92", "LI171","LI132","LI84", "LI113", "LI164","LI65", "LI179","LI154","LI216", "LI198"];

const STOPARRAY5 = ["NewYork Penn", "New York Grand Central", "Times Square", "Jamaica NY JFK Airport", "South Ferry", "Saint George NY", "Mets", "Meadowlands","Port Authority Bus Terminal", "World Trade Center", "Rockefeller Center", "Lincoln Center","Yankee Stadium","Museum of Natural History", "Herald Sq","NY Aquarium","Coney Island"];


const STOPARRAYID5 = ["AMSNYP","NewYork-Grand-Central-NY", "NYT127", "LI102", "NYT142", "NYTS31", "LI199", "NJ40570", "2328682", "NYTE01","NYTD15","NYT124","NYT414","NYTA21","NYTD17", "NYTD42","NYTD43"];

const STOPARRAY6 = ["Providence-RI", "Providence Kennedy Plaza", "TF Green Airport", 
"Westerly-RI","Kingston-RI", "Wickford Junction", "Newport Visitor Center", "Pawtucket",
"Warwick Mall", "Galilee Ferry Terminal"
];

const STOPARRAYID6 = ["NEC-1851", "RIPT16400", "NEC-1768-03","AMSWLY", 
"AMSKIN","NEC-1659-03", "RIPT1380","RIPT59060","RIPT7075","RIPT29120"
];

const STOPARRAY7 = ["New York Penn", "Philadelphia", "Washington D C", "Orlando", "Tampa", "Miami",
"Chicago", "Memphis", "New Orleans", "Houston", "San Antonio", "Fort Worth", "Dallas", "Tucson",
"Los Angeles","Emeryville", "Portland Oregon", "Seattle", "Vancouver British Columbia"
];

const STOPARRAYID7 = ["AMSNYP","AMSPHL","AMSWAS", "AMSORL","AMSTPA","AMSMIA",
"AMSCHI","AMSMEM","AMSNOL","AMSHOS","AMSSAS","AMSFTW","AMSDAL","AMSTUS",
"AMSLAX","AMSEMY","AMSPDX","AMSSEA","AMSVAC"];

const STOPARRAY8 = ["Los Angeles", "Oceanside", "San Diego Santa Fe Station", "Riverside", "Santa Barbara","San Francisco Fishermans Wharf", "Emeryville", "Oakland", "San Jose", "Sacramento Valley Station",
"Palm Springs"];

const STOPARRAYID8 = ["AMSLAX","AMSOSD","AMSSAN","AMSRIV","AMSSBA","AMSSFW","AMSEMY","AMSOAC",
"AMSSJC","AMSSAC","AMSPSN"];

const STOPARRAY9 = ["Miami", "Miami Airport", "Fort Lauderdale", "West Palm Beach", "Orlando", "St. Petersburg-Clearwater", "Jacksonville", "Winter Park"];

const STOPARRAYID9 = ["AMSMIA","TR18","AMSFTL","AMSWPB","AMSORL","AMSSTP","AMSJAX","AMSWPK"];


const STOPARRAY10 = ["Chicago Union Station", "LaSalle Street Station", "Millenium Station", 
"Ogilvie Transportation Center", "Downtown Washington Wabash","O'Hare Airport", "Midway Airport", 
"Museum Campus/11th St.","Museum of Science and Industry / 55th - 56th - 57th St.","Sox-35th",
"Addison (Red) / Wrigley Field"];

const STOPARRAYID10 = ["AMSCHI","ME_LSS","ME_MILLENNIUM","ME_OTC","CG41700","CG40890","CG40930",
"ME_MUSEUM","ME_5556-57TH","CG40190","CG41420"];

const STOPARRAY11 = ["Toronto", "Montreal", "Vancouver", "Ottawa", "Halifax", "Winnipeg", "Edmonton",
"Jasper", "Prince Rupert", "Churchill", "Senneterre", "Quebec City", "Jonquiere"];

const STOPARRAYID11 = ["VIA119", "VIA226","VIA8", "VIA617","VIA620", "VIA388","VIA449",
"VIA21", "VIA458","VIA435","VIA460","VIA628","VIA444"];


const STOPARRAY12 = ["Los Angeles Union Station", "LAX Airport Metro C (Green)","seventh street Metro center", "North Hollywood", "Hollywood and Vine", "Universal Studio City",
"Willowbrook Rosa Parks", "Santa Monica", "Long Beach", "Chatsworth"];


const STOPARRAYID12 = ["AMSLAX", "LAM80305","LAM80122","LAM80201","LAM80204","LAM80202",
"LAM80311", "LAM80139", "LAM80101", "B_BALB","LAMB901"];

const STOPARRAY13 = ["San Francisco Embarcadero", "Emmeryville AMTRAK","San Francisco Airport", "Balboa Park"];


const STOPARRAYID13 = ["B_EMBR","AMSEMY", "B_SFIA", "B_BALB"];

function switchStopArrays()
{
  if(SNDSTATE != 18) SSA = SNDSTATE;
  if(StopArraySel < (STOPARRAYTITLES.length -1))
  {
      StopArraySel += 1;
  }
  else StopArraySel = 0;
  say("Switching to " + STOPARRAYTITLES[StopArraySel] + " stop list. OK?");
  makeStopArray(StopArraySel);   
}

var StopArray = [];
var StopArrayIds = [];
var StopArraySel = 0;

function makeStopArray(k)
{
  clearArray(StopArray);
  clearArray(StopArrayIds);
  var nt = getNearestStation1(Xpos, Ypos, false);
  var d1 = Math.round(10 * gnsd) / 10;
  var nb = getNearestStation1(Xpos, Ypos, true);
  var d2 = Math.round(10 * gnsd) / 10;
  if(Here != "") 
  {  
      var d = " which is " + getDistanceFromIdToHere(Here) + " miles away";
      StopArray[StopArray.length] = getDescriptionForStop(Here) + d;
  //    StopArray[StopArray.length] = getDescriptionForStop(Here);
      StopArrayIds[StopArrayIds.length] = Here;
  }
  if((Home != null) && (Home != Here))
  {
      StopArray[StopArray.length] = getDescriptionForStop(Home);
      StopArrayIds[StopArrayIds.length] = Home;      
  }
//  nt = getNearestStation1(Xpos, Ypos, false);
  if((d1 < 10) && (d1 >= 0) && (nt != Here))
  {
      var d = " which is " + d1 + " miles away";
      StopArray[StopArray.length] = getDescriptionForStop(nt) + d;
 //     StopArray[StopArray.length] = getDescriptionForStop(nt);
      StopArrayIds[StopArrayIds.length] = nt;
  }
//  var nb = getNearestStation1(Xpos, Ypos, true);
  if((d2 < 2) && (d2 >= 0) && (nb != nt) && (nb != Here))
  {
      var d = " which is " + d2 + " miles away";
      StopArray[StopArray.length] = getDescriptionForStop(nb) + d;
 //     StopArray[StopArray.length] = getDescriptionForStop(nb);
      StopArrayIds[StopArrayIds.length] = nb;
  }
  
  var afid = getFavName(1, 0);
  if(afid != "")  
  {
     StopArray[StopArray.length] = afid;
     StopArrayIds[StopArrayIds.length] = getStopIdFromName(afid);
  }
  afid = getFavName(2, 0);
  if(afid != "")  
  {
     StopArray[StopArray.length] = afid;
     StopArrayIds[StopArrayIds.length] = getStopIdFromName(afid);
  }

  
  if((nt != Place_id) && (Place_id != Here))
  {
      StopArray[StopArray.length] = getDescriptionForStop(Place_id);
      StopArrayIds[StopArrayIds.length] = Place_id;      
  }
  if(k == 1)
  {
    StopArray = StopArray.concat(STOPARRAY2);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID2);      
  }
  else if(k == 0)
  {
    StopArray = StopArray.concat(STOPARRAY);
    StopArrayIds = StopArrayIds.concat(STOPARRAYIDs);
  }
  else if(k == 3)
  {
    StopArray = StopArray.concat(STOPARRAY3);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID3);      
  }
  else if(k == 4)
  {
    StopArray = StopArray.concat(STOPARRAY4);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID4);      
  }
  else if(k == 2)
  {
    StopArray = StopArray.concat(STOPARRAY5);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID5);      
  }
  else if(k == 5)
  {
    StopArray = StopArray.concat(STOPARRAY6);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID6);      
  }
  else if(k == 6)
  {
    StopArray = StopArray.concat(STOPARRAY10);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID10);      
  }
  else if(k == 7)
  {
    StopArray = StopArray.concat(STOPARRAY9);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID9);      
  }
  else if(k == 8)
  {
    StopArray = StopArray.concat(STOPARRAY12);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID12);      
  }
  else if(k == 9)
  {
    StopArray = StopArray.concat(STOPARRAY13);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID13);      
  }
  else if(k == 10)
  {
    StopArray = StopArray.concat(STOPARRAY8);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID8);      
  }
  else if(k == 11)
  {
    StopArray = StopArray.concat(STOPARRAY7);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID7);      
  }
  else if(k == 12)
  {
    StopArray = StopArray.concat(STOPARRAY11);
    StopArrayIds = StopArrayIds.concat(STOPARRAYID11);      
  }
}

function announceStopSelector()
{
  report("announce stop selector");
  setSndState(4);
  var g =0;
  if(Place.indexOf("-NY") != -1) g = 1;
  else if((Place.indexOf("-NJ") != -1) || (Place_id.indexOf("NJ") == 0)) g = 3;
  else if(Place_id.indexOf("LI") == 0) g = 4;
  StopArraySel = g;
  makeStopArray(g);
  CurrentPhrase = 0;
//  if(!bGeo) say("Note: geolocation is not enabled.");
  say("Select a stop from the following list or click ALT for a different list.");
  say(fixDest(StopArray[0]));
}

function announceStopSelectorX()
{
  if(CurrentPhrase < StopArray.length)
  {
    say(fixDest(StopArray[CurrentPhrase]));
  }
  else
  {
//    beep1();
//    setSndState(0);
     CurrentPhrase = -1; 
  }
}

function announceDaySelectorX()
{
  if(CurrentPhrase < DayArray.length)
  {
    say(DayArray[CurrentPhrase]);
  }
  else
  {
    beep1();
    setSndState(0);
  }
}

function announceTimeSelectorX()
{
  if(CurrentPhrase < SelTimeArray.length)
  {
    say(SelTimeArray[CurrentPhrase]);
  }
  else
  {
    beep1();
    setSndState(0);
  }
}

function announceAlerts(n)
{
  if(n == 0)
  {
    CurrentPhrase = 0; 
  }
//  var k = CurrentAlerts.length;
//  console.log("4033 " + JSON.stringify(Xalerts, null, 4));
  var k = Xalerts.length;
  if(k == 0) 
  {
      say("No alerts.");
      setSndState(0);
  }
  else if(CurrentPhrase < k) 
  {
      if(bWA)
      {
       say("Alert " + (CurrentPhrase + 1) + " of " + k + ".");
       say(Xalerts[CurrentPhrase].header_text.replace(/\*/g, " "));   
       say("More details?");       
      }
      else if(n == 2)
      {
      say("Alert " + (CurrentPhrase + 1) + " of " + k + ".");
      say(Xalerts[CurrentPhrase].header.replace(/\*/g, " "));   
      }
      else
      {
      say("Alert " + (CurrentPhrase + 1) + " of " + k + ".");
      var s2 = Xalerts[CurrentPhrase].header.replace(/\*/g, " ");
      say(Xalerts[CurrentPhrase].effect + s2 + " " );
      say("More details?");
      }
  }
  else if(bWA && (CurrentAlerts.length >0))
  {
     Xalerts =  CurrentAlerts;
     bWA = false;
     CurrentPhrase = -1;
  }
  else
  {
     setSndState(0);
     quiet();
  }
}

function announceTrip()
{
  report("announce trip " + BSND.length );
  CurrentPhrase = 0;
  var b = true;
  var k = BSND.length;
  var i = 0;
  if(k == 0)
  {
    say("no upcoming stops listed");
    setSndState(0);
    b = false;
  }
  while(b && (i < k))
  {
    announceTrip1(i);
    i += 1;
  }
}

function announceTrip1(i)
{
    report("announceTrip1 " + i + " " + BSND.length);
    var a = BSND[i];
//    announceTripX();
    announceTrip2(a, false, i);
}

function announceTrip2(a, blast, index)
{
    var ad = fixDest(a.dest);
    var atn = fixDest(a.tripname);
//    report("4187 atnorig = " + atn);
    var i = atn.indexOf("(");
    if(i != -1) atn = atn.substring(0, i);
    var pl = fixDest(Place);
    if(!isNaN(atn))
    {
      atn = fixIdNumber(atn);   
    }
    else if(atn != "")
    {
      atn = fixDest(atn);  
    }
    if(a.stop_id == Place_id)
    {
//        report("4123 a.timetil = " + a.timetil + ":: a.zelta = " + a.zelta);
      if(a.timetil != "")
      {
        if((blast) ) //|| (index == 0))
        {
          say(atn + " arrives " + pl + " in " + a.timetil);
        }
        else say(atn + " departs " + pl + " in " + a.timetil);
        if((a.track != null) && (a.track != "")) say("on track " + a.track);
      }
      else
      {
        if((blast)) //|| (index == 0))
        {
          say(atn + " arrives " + pl + " at " + makeSndTime(a.hh, a.mm, a.bPM)); 
        }
        else say(atn + " departs " + pl + " at " + makeSndTime(a.hh, a.mm, a.bPM)); 
        if((a.track != null) && (a.track != "")) say("on track " + a.track);
      }
      if(a.ss != "") say(a.ss);
    }
    else if(a.timetil != "")
    {
       say(atn + " next stop " + fixDest(getStopNameFromID(a.stop_id)) + " in " + a.timetil);
    }
    else
    {
       say(atn + " next stop " + fixDest(getStopNameFromID(a.stop_id)) + " at " + makeSndTime(a.hh, a.mm, a.bPM));
    }
    
}

function announceTripX()
{
   var i = capt.indexOf("(");
   var c = capt;
   if(i != -1) c = capt.substring(0, i);
   report("CurrentTripRouteID = " + CurrentTripRouteID);
   var cc = CurrentTripRouteID;
   if(cc == null) return;
   if(cc.indexOf("CR-") == 0) cc = "Commuter rail ";
   else if(cc.indexOf("Green-") == 0) cc = "Green line " + cc.substring(6);
   else if(cc.indexOf("Red") == 0) cc = "Red line ";
   else if(cc.indexOf("Orange") == 0) cc = "Orange line ";
   else if(cc.indexOf("Blue") == 0) cc = "Blue line ";
//   say("Trip  " + fixDest(cc) + " " + fixDest(c));
   var k = CurrentTripZ.length;
   if((c.indexOf(" to ") == -1) && (typeof CurrentTripZ[k] !== 'undefined') && (typeof CurrentTripZ[k].trip_headsign !== 'undefined')) c += " to " + CurrentTripZ[k].trip_headsign;
   report("announceTripX " + c + " " + k + " BSND.length = " + BSND.length + " " + CurrentPhrase);
   i = 0;
   if((CurrentPhrase == 0) && (typeof BSND !== 'undefined') && (typeof BSND[0] !== 'undefined'))
   {
     say("Trip  " + fixDest(cc) + " " + fixDest(c));
     report("CurrentPhrase == 0 " + BSND.length + " " + CurrentTripZ.length + " " + CurrentTripZ[0].text + " " + BSND[0].stop_id);
     
     k = BSND.length;
     i = 0;
     while(i < k)
     {
       var a = BSND[i];
//       report(": " + a.stop_id + " " + a.timetil + " " + a.tripname);
       announceTrip2(a, (i == (k-1)), i);
       i += 1;
     }
     
   }
   else
   {
       if(CurrentPhrase < CurrentTripZ.length)
       {
         var a = CurrentTripZ[CurrentPhrase];
         var ph = " departs ";
         if((CurrentPhrase == 0) && (CurrentTripZ.length == 1)) ph = " arrives ";
         else if(CurrentPhrase == (CurrentTripZ.length -1)) ph = " arrives ";
         if(a.delta.length > 2)say(fixDest(a.text) + ph + "in " + a.zelta);
         else say(fixDest(a.text) + ph + "at " + makeSndTime(a.hh, a.mm, a.bPM));
         if((a.track != null) && (a.track != "")) say("on track " + a.track);
       }
       else 
       {
          beep1();
          DISPLAYTYPE = 0;
          setSndState(0);
       }
   }
}

function announceFindBusX(n)
{
  var k = DSND.length;
//  if(n == 0) say(BusNum + " trip " +  DSND[0].trip_id);
  if(n < k)
  {
    var s = "Bus " + DSND[n].route_id + " to " + fixDest(DSND[n].dest) + " " + fixDest(DSND[n].stat);
    say(s);
  }
   
}

function waitfortrips()
{
  if(SNDSTATE == 171) nextSndState(3);
  else 
  {
    setSndState(0);
    say("OK");
  }
}

const cat0 = ["New York", "New Jersey", "Connecticut", "Long Island", "Cape Cod and islands" ];

const cat1 = ["New York-Penn", "NewYork-Grand-Central", "Port Authority Bus Terminal", "World Trade Center", "Rockefeller Center", "Times Square", "Herald Square", "JFK Airport", "LaGuardia Airport", "South Ferry Station"];

const cat2 = ["Secaucus", "Newark", "Newark Airport", "Princeton", "Trenton"];

/*
["Massachusetts rail.", "MBTA Subways", "Cape and Islands", "Other Massachusetts", "Maine", "New York", "Rhode Island", "Connecticut", "Vermont", "New Hampshire", "Canada"];

const cat2 = ["North Station lines", "South Station lines"];

const cat3 = [];

const cat4 = ["Green lines", "Red lines", "Orange line", "Blue line.", "Silver lines"];

const cat5 = ["Park Street and North", "B line to Boston College", "C line to Coolidge Corner", "D line to Riverside", "E line  to Heath Street"];

const cat6 = [];
*/
    
function announceCatMenu(n)
{
  if(n == 0)
  {
    say("Select an area or category.");
    say("Commuter rail.");
  }
  else if(n == 1)
  {
    if(CurrentPhrase < cat1.length) say(cat1[CurrentPhrase]);   
  }
}

const PrefItems = ["Monitor Mode","Speech Recognition","Prediction Schedules Mode", "Include weather alerts", "Include local bus stops"];

function announcePreferencesMenu(n)
{
  if(n == 0)
  {
    say("Select a preference item.");
    if((CurrentTripID != null) && (CurrentTripID != "") && !bMonitorMode)
    {
      say("Enable Monitor Mode for this trip.");
    }
    else if(bMonitorMode) say("Disable Monitor Mode");
    else 
    {
      CurrentPhrase = 1;
      say(PrefItems[1]);
    }
      
  }
  else if(n == 1)
  {
    if(CurrentPhrase < PrefItems.length) say(PrefItems[CurrentPhrase]);
    else
    {
      CurrentPhrase = 0;
      say(PrefItems[CurrentPhrase]);
    }
  }
}

function announcePreferenceTopic()
{
  switch(CurrentPhrase)
  {
    case 0:
        if(bMonitorMode) say("Select YES to disable Monitor Mode.");
        else say("Select YES to enable Monitor Mode.");
        break;
    case 1:  // speech recognition
        if(document.getElementById("sprec").checked) say("Disable speech recognition?");
        else say("Enable speech recognition?");
        break;
    case 2:  // schedule mode
        if(document.getElementById("spp").checked) say("Currently using predictions if available.");
        else say("Currently using schedules only.");
        say("Select YES to use predictions if available, or NO to use schedules only, or BACK");
        break;
    case 3:
        if(document.getElementById("bIncludeWx").checked) say("Currently including weather alerts.");
        else say("Currently not including weather alerts.");
        say("Select YES to include weather alerts, or NO to not include weather alerts, or BACK");
        break;
    case 4:
        if(document.getElementById("bIncludeBuses").checked) say("Currently including local bus stops in determining Here.");
        else say("Currently not including local bus stops in determining Here.");
        say("Select YES to include local bus stops, or NO to not include local bus stops, or BACK");
        break;
    default:
        break;
  }
}

function announceHelpMenu(n)
{
  if(n == 0)
  {
    say("Select a help topic.");
    say("Quick help.");
  }
  else if(n == 1)
  {
    if(CurrentPhrase < helptopics[SelectedLanguage].length) say(helptopics[SelectedLanguage][CurrentPhrase]);
    else
    {
      CurrentPhrase = 0;
      say(helptopics[SelectedLanguage][CurrentPhrase]);
    }
  }
}

function announceHelpTopic()
{
  say(helptext[CurrentPhrase][SelectedLanguage]);  
}


/*
const QuickHelp = "With eight olives Trains in audio mode, you select functions from audio menu lists by pressing five buttons along the edges of your screen.  Click the southwest corner button to reset everything to the quiet state.  Use the top two corner buttons to navigate a list.  The northeast corner button gives the time and the currently selected place, or answers YES to select a menu list option.  The northwest corner button advances to the next menu list option, or answers NO.   The menu button at the east or center of the right edge of the screen starts listing the main menu options, or starts the Help menu, or goes back one list item.  Press the multi-function southeast corner button to select an alternate common stop list, or initiate a search, or  monitor a selected trip   Now, click the southwest quiet reset button for normal operation, or use the top two buttons to navigate for more help topics.  Shall I repeat this?";

const Overview = "eight olives trains is a transit schedule app that supports real time status for MBTA trains, subways and buses, Metro North trains, Long Island railroad and New York subways.  Schedules are included for other trains and buses.  It works best when you are on-line and have allowed access to your geolocation, but it also supports certain schedule only features when offline.  The Audio Mode speaks to you if your platform supports speech synthesis.  You interact using five floating buttons located at the four screen corners and the center right edge.  From your selected location you can get upcoming arrivals and departures, select and monitor trips, find nearby stops, get a list of connection options from point 'A' to point 'B', or select stops by sketching, spelling or list.  When in doubt, click the southwest reset button to return to the quiet state. Your browser may ask your permission to access your geolocation data.  Shall I repeat this?";

const UMenu = "Functions are selected by audio menus.  From the quiet state, pressing the east, menu button starts the Main Menu.  Clicking the northwest or no button advances to the next menu item.  Clicking the east, menu button goes back one menu item.  Clicking the northeast, yes button selcts that menu item and initiates the selected action.  The main menu has options to get weather and trip alerts, find connections, select a common stop, search for stop, and save or retrieve favorites. Shall I repeat this?";

const Rstatus = "From the quiet state, clicking the northeast or yes button will report the current time and stop location currently selected.  Clicking the northwest or no button will let you step through the list of upcoming arrivals and departures.  Clicking the northeast yes button will then select that trip.  The trip stop list can then be navigated using the no button to advance or the east menu button to go back.  Selecting a trip's stop item changes your location to that stop.  Shall I repeat this?";

const Platforms = "Many stops may have nearby related stops or platforms where you can access other trains or buses.  You can list these platforms from the main menu platforms option or by pressing the southeast multi-function button followed by the northeast status button.  Shall I repeat this?";

const SelStop = "You can select a stop from the main menus Select A Common stop option.  That list includes stops near your current location, any favorites or home location you may have saved plus major stops in the rail and subway networks.  Clicking the southeast corner button toggles between various geographic stop lists.  You can also select stops from trip lists or by using one of the search options.  Shall I repeat this?";

const Sketch = "The main menu option Search For Stop By Sketching lets you enter a search phrase letter by letter by sketching each block letter in the center-located sketch pad area.  Sketch using horizontal, vertical or diagonal lines and I\'ll guess the letter.  If a guess is wrong, continue sketching or click NO.  When the guess is correct, click the northeast or yes button to start the next letter.  Click the east or menu button to erase the current letter and start it again.  Click the southeast button to start the search.  Use the no and yes buttons to select a search result.  If you click YES before sketching a character you can choose to enter numbers mode or add a blank space.  Shall I repeat this?";

const Srch = "The main menu option Search For Stop lets you construct a search phrase by selecting letters I say.   Use the northwest or no button to advance to the next letter option and the northeast or yes button to accept that letter.  Use the east or menu button to go back and correct and entry.  Use the southeast button to start a search.  Use the no and yes buttons to select a search result.  Shall I repeat this?";

const Fcon = "The main menu Find Connections option lets you get a list of itineraries or connections to get from point 'A' to point 'B'.  The stops are selected from the common stop list, so uncommon stops should first be selected and saved as a favorite or just selected to be the current stop so that it appears in the common stop list.   You can also specify the start time and day if it isn't now.  The results are a list of trip options.  Selecting a trip option lists the itinerary in more detail.   You can select any leg option for more detail on the part of the trip.  Use the east or menu button to go back a step.  Shall I repeat this?";

const MTrip = "When a trip has been selected, you can click the southeast button to enable Monitor Mode.  Monitoring a trip gives a minute by minute update of vehicle location and next stop status.  For MBTA vehicles, the status is based on real time information when on-line.  For schedule based status, data is estimated based on the schedule information.  The map display is also active in Monitor Mode.  Use the southwest reset button to exit Monitor Mode.  Shall I repeat this?";

const Srec = "Speech recognition can be enabled from the tri-bar menu, or from reset state press the Menu button and then the lower right button. You may be asked to permit use of the microphone.  Once enabled, you press the lower right button to activate the microphone for 2 seconds and say a command.  Valid commands are quiet, reset, yes, no, menu, back, help, alt, search, monitor, next, list, status, stat, nearby, platforms, alerts, connections, here, select, bus and commands.  This feature is still experimental.  Shall I repeat this?"; 

const KIssues = "Trains audio may not work well if you are using other audio programs such as Voice Over or certain blue tooth apps on your platform.  Find Connections is still in development.   Shall I repeat this?" ;

const Cook = "Trains normally uses cookies or cache memory to store the program and data to permit off-line operation.  Any schedules or data you save are also stored in cookie memory.  If you clear cookies and application cache, all data is deleted.  Any eightolives software update occurs automatically when you are on-line adding a new application cache and then deleting the old.  Shall I repeat this?" ;
*/

/*
const helptopics = ["Quick Help", "Overview", "Using the menu", "Getting status and Selecting a trip", "Other platforms at a stop", "Selecting a stop", "Search for stop by sketching", "Search for Stop", "Finding connections", "Monitoring a trip", "Known Issues", "Speech Recognition","Cookies"
];
*/

const helptext = [QuickHelp, Overview,UMenu, Rstatus, Platforms, SelStop, Sketch, Srch, Fcon, MTrip, KIssues, Srec, Cook];

function announceQuickHelp()
{
  say(QuickHelp[SelectedLanguage]);
}

function announceSpSearch(n)
{
  if(n == 0)
  {
    say("Search by spelling.");
    sphrase = "";
    if(CurrentPhrase == 1) say("Train stop");   
    else if(CurrentPhrase == 2) say("Subway stop");   
    else if(CurrentPhrase == 3) say("Bus stop");  
    else if(CurrentPhrase == 0) say("Search for one of the following: All stops");  
    else  
    {
      beep1();
      setSndState(0);
      CloseMenu();
    }
  }
  else if(n == 1)
  {
    if(CurrentPhrase == 0) 
    {
        say("Add a letter to your search phrase. ");
    }
    else
    {
      if(CurrentPhrase < letters.length) 
      {
        say(letters[CurrentPhrase]);
        SFIELD.value = "";
        
        document.getElementById("sph").innerHTML = letters[CurrentPhrase];
      }
      else
      {
        saySearchPhrase();
        CurrentPhrase = 0;
        document.getElementById("sph").innerHTML = letters[CurrentPhrase];
      }
    }
  }
  else if(n == 3)
  {
    if(CurrentPhrase == 0) 
    {
        say("Pick one of the following search results: " + fixDest(SEARCHB[1]));
        if(SNDSTATE == 72) document.getElementById("spg").innerHTML =SEARCHB[1];
    }
    else if(CurrentPhrase < SEARCHB.length / 2)
    {
      say(fixDest(SEARCHB[2*CurrentPhrase + 1]));
      if(SNDSTATE == 92) document.getElementById("spg").innerHTML = SEARCHB[2*CurrentPhrase + 1];
    }
    else
    {
      CurrentPhrase = 0;
      beep1();
      announceSpSearch(3);
    }
  }
  else if(n == 5)
  {
    say("Search. Say your search phrase.");
    sphrase = "";
      
  }
 
}

function announcePad(n)
{
  if(n == 0)
  {
    say("Sketch each letter on the pad using straight vertical, straight horizontal or straight diagonal lines.");
    say("The letter 'O' is rectangular. The letter 'D' has one vertical and two diagonal lines.");
    announceSearch(0);
  }
  else if(n == 1)
  {
    clearPad();
    if(bNumberMode) say("Sketch a new number.");
    else say("Sketch a new letter.");
  }
  else if(n == 2)
  {
    guess = guesses[gptr];
    say(guess + "?");
    document.getElementById("spg").innerHTML = guess;
   
  }
}

var guesses = [];
var guess = null;
var gptr = 0;

function checkPad()
{
  if(wpad != null)
  {
    var vlines = 0;
    var hlines = 0;
    var dslopes = 0;
    var uslopes = 0;
    var k = wpad.segments.length;
    var i = 1;
    while(i < k)
    {
      var pt1 = wpad.segments[i-1];
      var pt2 = wpad.segments[i];
      var dx = pt1.x - pt2.x;
      var dy = pt1.y - pt2.y;
      var adx = Math.abs(dx);
      var ady = Math.abs(dy);
      if((adx < 20) && (ady > 30)) vlines += 1;
      else if((adx > 30) && (ady < 20)) hlines += 1;
      else if((adx > 30) && (ady > 30))
      {
        if((dx < 0) && (dy > 0)) uslopes += 1;
        else if((dx > 0) && (dy < 0)) uslopes += 1;
        else dslopes += 1;
      }
      i += 2;
    }
    report("v = " + vlines + " h = " + hlines + " d = " + dslopes + " u = " + uslopes);
    if((vlines > 3) || (hlines > 3) || (dslopes > 3) || (uslopes > 3))
    {
      say("Try again");
      clearPad();
      document.getElementById("spg").innerHTML = "";
    }
    else announcePadX(vlines, hlines, dslopes, uslopes);

  }
}


function announcePadX(v, h, d, u)
{
  if((SNDSTATE == 71) || (SNDSTATE == 73))
  {
    guesses = [];
    guess = null;
    gptr = -1;
    if(bNumberMode)
    {
       switch(v)
       {
        case 0:
            switch(h)
            {
                case 1:
                    switch(d)
                    {
                         case 0:
                            switch(u)
                            {
                                case 1: guesses = ["7"];
                                default: break;
                            }
                         default:break;
                    }
                default:break;
            }
            break;
       case 1:
            switch(h)
            {
                case 0: guesses = ["1"];
                    break;
                case 1:
                    switch(d)
                    {
                         case 0:
                            switch(u)
                            {
                                case 0: guesses = ["7","4"];
                                    break;
                                case 1: guesses = ["4"];
                                default: break;
                            }
                          default:   break;
                    }
                    break;
                case 3: guesses = ["3"];
                    break;
                default: break;
            }
            break;
       case 2:
           switch(h)
            {
                case 1: guesses = ["4"];
                    break;
                case 2: guesses = ["6", "9", "0",];
                    break;
                case 3: guesses = ["2", "5", "8",];
                    break;
                default: break;
            }
            break;
       default:break;
       }
    }
    else switch(v)
    {
        case 0:
            switch(h)
            {
                case 0:
                    switch(d)
                    {
                        case 0:
                            switch(u)
                            {
                                case 0: break;
                                
                            }
                            break;
                        case 1:
                            switch(u)
                            {
                                case 1: guesses = ["y","v","x"];
                                default: break;
                            }
                            break;
                        case 2:
                        {
                            switch(u)
                            {
                                case 2: guesses = ["w","m"];
                                default: break;
                            }
                            break;
                        }
                    }
                    break;
                case 1:
                    switch(d)
                    {
                        case 1:
                        {
                            switch(u)
                            {
                                case 1: guesses = ["a"];
                                default: break;
                            }
                            break;
                        }
                        default:break;
                    }
                    break;
                case 2:
                    switch(d)
                    {
                        case 0:
                        {
                            switch(u)
                            {
                                case 1: guesses = ["z"];
                                default: break;
                            }
                            break;
                        }
                        break;
                        default:break;
                        
                    }
            }
            break;
        case 1:
            switch(h)
            {
                case 0:
                    switch(d)
                    {
                        case 0:
                            switch(u)
                            {
                                case 0: guesses = ["i"];
                                default: break;
                            }
                        case 1:
                            switch(u)
                            {
                                case 1: guesses = ["d", "k"];
                                default: break;
                            }
                            break;
                    }
                    break;
                case 1:
                    guesses = ["t", "l", "j"];
                    break;
                case 2:
                    guesses = ["c", "f", "j"];
                    break;
                case 3:
                    guesses = ["e"];
                    break;
                default: break;
            }
            break;
        case 2:
            switch(h)
            {
                case 0:
                    switch(d)
                    {
                        case 1:
                            switch(u)
                            {
                                case 0: guesses = ["n", "m", "w"];
                                     break;
                                case 1: guesses = ["m", "w"];
                                default: break;
                            }
                            break;
                    }
                    break;
                case 1:
                    guesses = ["h", "u"];
                    break;
                case 2:
                    switch(d)
                    {
                        case 0:
                            guesses = ["a", "o", "p"];
                            break;
                        case 1:
                            guesses = ["r", "q"];
                            break;
                        default: break;
                    }
                    break;
                case 3:
                    guesses = ["s", "b", "g"];
                    break;
            }
            break;
        case 3:
            switch(h)
            {
                case 3:
                    guesses = ["b"];
                    break;
            }
            break;
    }
    if(guesses.length > 0)
    {
      guess = guesses[0];
      say("Is that " + guess + "?");
      document.getElementById("spg").innerHTML = guess;
 
    }
  }
}

function decodeSpeech(t)
{
  report("4921 state = " + SNDSTATE + " " + t); 
  if(t.indexOf("quiet") != -1) snd(2);
  if(t.indexOf("reset") != -1) snd(2);
  if(document.getElementById("dcmds").checked)
  {
    switch(SNDSTATE)
    {
        case 4:
            if(t.indexOf("alt") != -1)
            {
              switchStopArrays();
              setSndState(18);
            }
            break;
        case 95:
            say("Confirm search phrase is " + t); 
            sphrase = t;
            setSndState(96);
            break;
        case 96:
            if(t == "yes")
            {
              say("Search started.");
//              document.getElementById("spg").innerHTML = "";
              document.getElementById("shst").value = sphrase; 
              searchStop();
              CurrentPhrase = 0;
              if(SEARCHB.length > 0) 
              {
                setSndState(72);
                announceSearch(3);
              }
             else say("No search results.");
                
            }
            if(t == "no")
            {
              say("Say search phrase.");   
            }
            break;
        case 72:
            if(t == "no")
            {
              CurrentPhrase += 1;
              announceSearch(3);
            }
            if(t == "yes")
            {
              var p = SEARCHB[2*CurrentPhrase + 1];
              var pi = SEARCHB[2*CurrentPhrase];
 //           Place = p;
              setPlaceId(pi);
              SelectedPlace = p;
              pcolor = "red";
              DISPLAYTYPE = 0;
              qupdateDisplay();
              setSndState(0);
              if(wpad != null) closePad();
              announceStatus();
//              quiet();
              beep1();
            }
            break;
        case 90:
        case 91:
            if(t.indexOf("back") != -1) 
            {
              if(sphrase.length > 0) sphrase = sphrase.substring(0, sphrase.length - 1);
              saySearchPhrase();
            }
            else if(t.indexOf("search") != -1)
            {
              say("Search started.");
              document.getElementById("shst").value = sphrase; 
              searchStop();
              CurrentPhrase = 0;
              if(sphrase.length > 0) 
              {
                setSndState(92);
                announceSpSearch(3);
              }
              else {say("No search results.");setSndState(0);}
            }
            else if(t == "a") sphrase += "a"; 
            else if(t == "b") sphrase += "b"; 
            else if(t == "c") sphrase += "c"; 
            else if(t == "d") sphrase += "d"; 
            else if(t == "e") sphrase += "e"; 
            else if(t == "f") sphrase += "f"; 
            else if(t == "g") sphrase += "g"; 
            else if(t == "h") sphrase += "h"; 
            else if(t == "i") sphrase += "i"; 
            else if(t == "j") sphrase += "j"; 
            else if(t == "k") sphrase += "k"; 
            else if(t == "l") sphrase += "l"; 
            else if(t == "m") sphrase += "m"; 
            else if(t == "n") sphrase += "n"; 
            else if(t == "o") sphrase += "o"; 
            else if(t == "p") sphrase += "p"; 
            else if(t == "q") sphrase += "q"; 
            else if(t == "r") sphrase += "r"; 
            else if(t == "s") sphrase += "s"; 
            else if(t == "t") sphrase += "t"; 
            else if(t == "u") sphrase += "u"; 
            else if(t == "v") sphrase += "v"; 
            else if(t == "w") sphrase += "w"; 
            else if(t == "x") sphrase += "x"; 
            else if(t == "y") sphrase += "y"; 
            else if(t == "z") sphrase += "z"; 
            else if(t.indexOf("hey") != -1) sphrase += "a";
            else if(t.indexOf("see") != -1) sphrase += "c";
            else if(t.indexOf("hi") != -1) sphrase += "i";
            else if(t.indexOf("jay") != -1) sphrase += "j";
            else if(t.indexOf("ham") != -1) sphrase += "m";
            else if(t.indexOf("him") != -1) sphrase += "m";
            else if(t.indexOf("oh") != -1) sphrase += "o";
            else if(t.indexOf("are") != -1) sphrase += "r";
            else if(t.indexOf("hess") != -1) sphrase += "s";
            else if(t.indexOf("you") != -1) sphrase += "u";
            else if(t.indexOf("why") != -1) sphrase += "y";
//            else if(t.indexOf("one") != -1) sphrase += "z";
            else if(t.indexOf("space") != -1) sphrase += " "; 
            if(sphrase != "") saySearchPhrase();
            document.getElementById("shst").value = sphrase; 
            break;
        default:
            if(t.indexOf("no ") != -1) snd(1);
            else if(t.indexOf("no") == 0) snd(1);
            else if(t.indexOf("next") != -1) snd(1);
            else if(t.indexOf("list") != -1) snd(1);
            else if(t.indexOf("yes") != -1) snd(3);
            else if(t.indexOf("status") != -1) snd(3);
            else if(t.indexOf("stat") != -1) snd(3);
            else if(t.indexOf("menu") != -1) snd(5);
            else if(t.indexOf("back") != -1) snd(5);
            else if(t.indexOf("alt") != -1) snd(4);
            else if(t.indexOf("monitor") != -1) snd(4);
            else if((t.indexOf("help") != -1) || (t.indexOf("quick") != -1))
            {
              say("Quick Help.");
              announceQuickHelp();
              setSndState(80);
            }
            else if(t.indexOf("nearby") != -1)
            {
              bAnnounceNearby = true;
              CurrentPhrase = -1;
              setSndState(30);
              whatsNearby();
            }
            else if(t.indexOf("platforms") != -1)
            {
              CurrentPhrase = 0;
              setSndState(9);
              announcePlatforms(1);
            }
            else if(t.indexOf("alerts") != -1)
            {
              setSndState(6);
              getAlertData();
              announceAlerts(0);       
            }
            else if(t.indexOf("sketch") != -1)
            {
              if(wpad != null) closePad();
              writePad();
              setSndState(70);
              CurrentPhrase = 0;
              announcePad(0);
            }
            else if(t.indexOf("search") != -1)
            {
              menu("StopSearch");
              SFIELD = document.getElementById("shst");
              setSndState(95);
              CurrentPhrase = 0;
              announceSpSearch(5);
            }
            else if(t.indexOf("connections") != -1)
            {
              setSndState(13);
              makeStopArray(StopArraySel);
              CurrentPhrase = 0;
              say("Find connections from one of the following");
              say(StopArray[0]);       
            }
            else if(t.indexOf("here") != -1)
            {
              selectHere();
              setSndState(0);
              DISPLAYTYPE = 0;
              announceStatus();
            }
            else if(t.indexOf("select") != -1)
            {                 
              CurrentPhrase = -1;
              announceStopSelector() 
            }
   else if((t.indexOf("bus") != -1) || (t.indexOf("find") != -1))
   {
     setSndState(170);
     CurrentPhrase = 0;
     announceBusList(0);  
   }
   else if(t.indexOf("commands") != -1)
   {
      listCommands(); 
   }
   else if(t.indexOf("one") != -1)
   {
       
   }
   else if(t.indexOf("two") != -1)
   {
       
   }
   else if(t.indexOf("three") != -1)
   {
       
   }
   else if(t.indexOf("four") != -1)
   {
       
   }
   else if(t.indexOf("five") != -1)
   {
       
   }
   else if(t.indexOf("six") != -1)
   {
       
   }
   else if(t.indexOf("seven") != -1)
   {
       
   }
   else if(t.indexOf("eight") != -1)
   {
       
   }
   else if(t.indexOf("nine") != -1)
   {
       
   }
   else if(t.indexOf("zero") != -1)
   {
       
   }
   else
   {
     document.getElementById("shst").value = t;
     say(t);
     searchStop();
     CurrentPhrase = 0;
     if(SEARCHB.length > 0) 
     {
       setSndState(72);
       announceSearch(3);
     }
     else 
     {
       say("No search results. OK");
       setSndState(0);
    }
     //announceSearchStops();
   }
   
   
   }
   
   transcript = "";
   interim = "";
}

}


