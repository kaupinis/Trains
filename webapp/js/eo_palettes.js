// eo_palettes.js

  let PALETTES = [];
  let PALETTE_NAMES =[];
  let PALETTE = 0; // index into the arrays
  
  function getColor(name, pal)
{
  let r = "";
  let b = false;
  let i = 0;
  if(typeof pal !== 'undefined')
  {
  while(!b && (i < pal.length))
  {
    if(pal[i].name == name)
    {
      r = pal[i].value;
      b = true;
    }
    else i += 1;
  }
  }
  return(r);
}

function getBackgroundMode(mode)
{
  return(Math.floor(mode / 10));  
}

function getTimeColorForMode(mode)
  {
    let n = mode % 10;
    switch(n)
    {
        case 0: // schedule
            n = getColor("tsked",PALETTES[PALETTE]);
            break;
        case 1: // prediction
            n = getColor("tpred",PALETTES[PALETTE]);
            break;
        case 2: // estimate
            n = getColor("test",PALETTES[PALETTE]);
            break;
        case 3: // manual adjustment
            n = getColor("tman",PALETTES[PALETTE]);
            break;
        default: 
            n = getColor("tsked",PALETTES[PALETTE]);
            break;
    }
    return(n);
  }
  
  function getBackgroundColorForMode(mode)
  {
    let n = Math.floor(mode / 10);
    switch(n)
    {
        case 0: // normal / green
            n = getColor("sgbk",PALETTES[PALETTE]);
            break;
        case 1: // expired / grey
            n = getColor("swbk",PALETTES[PALETTE]);
            break;
        case 2: // iminent / red
            n = getColor("srbk",PALETTES[PALETTE]);
            break;
        case 3: // late / orange
            n = getColor("sobk",PALETTES[PALETTE]);
            break;
        case 4: // next day / violet
            n = getColor("spbk",PALETTES[PALETTE]);
            break;
        default: 
            n = getColor("sgbk",PALETTES[PALETTE]);
            break;
    }
    return(n);
    
  }
  
  function getTextColorForMode(mode)
  {
    let n = Math.floor(mode / 10);
    switch(n)
    {
        case 0: // normal / green
            n = getColor("sgt",PALETTES[PALETTE]);
            break;
        case 1: // expired / grey
            n = getColor("swt",PALETTES[PALETTE]);
            break;
        case 2: // iminent / red
            n = getColor("srt",PALETTES[PALETTE]);
            break;
        case 3: // late / orange
            n = getColor("sot",PALETTES[PALETTE]);
            break;
        case 4: // next day / violet
            n = getColor("spt",PALETTES[PALETTE]);
            break;
        default: 
            n = getColor("sgt",PALETTES[PALETTE]);
            break;
    }
    return(n);      
  }
  
  
  const pOriginal = [ 
    {name:"Ltext", value: "#ffffff"}, 
    {name:"Dtext", value: "#000000"},
    {name:"Btext", value: "#000000"},
    {name:"Ccolor", value: "#ffffff"}, 
    {name:"Mtext", value: "#000000"}, 
    {name:"Mcolor", value: "#ffff99"}, 
    {name:"TZcolor", value: "#ffcccc"},
    {name:"main-background", value: "#7388a5"},
    {name:"audio-background", value: "#4169e1"},
    {name:"Rbackground", value: "#7388a5"},
    {name:"foot-background", value: "#7388a5"},
    {name:"Bbackground", value: "#7388a5"},
    {name:"TSbackground", value: "#add8e6"},
    {name:"aside-background", value: "lightblue"},
    {name:"aside-border", value: "black"},
    {name:"menu-background", value: "#ffff99"},
    {name:"sgbk", value: "#90ee90"},
    {name:"sgt", value: "#000000"},
    {name:"srbk", value: "#ff0000"},
    {name:"srt", value: "#000000"},
    {name:"swbk", value: "lightgrey"},
    {name:"swt", value: "#000000"},
    {name:"sobk", value: "#ffa500"},
    {name:"sot", value: "#000000"},
    {name:"spbk", value: "#cc66ff"},
    {name:"spt", value: "#000000"},
    {name:"tsked", value: "#000000"},
    {name:"tpred", value: "#0000ff"},
    {name:"test", value: "#9900cc"},
    {name:"tman", value: "#ff5500"}
    ];
  PALETTES.push(pOriginal);
  PALETTE_NAMES.push("Original");
  
  const pBrown = [ 
    {name:"Ltext", value: "#ffffff"}, 
    {name:"Dtext", value: "#000000"},
    {name:"Btext", value: "#000000"},
    {name:"Ccolor", value: "#ffffff"}, 
    {name:"Mtext", value: "#000000"}, 
    {name:"Mcolor", value: "#ffff99"}, 
    {name:"TZcolor", value: "#ffcccc"},
    {name:"main-background", value: "#7c6727"},
    {name:"audio-background", value: "#7843ff"},
    {name:"Rbackground", value: "#7388a5"},
    {name:"foot-background", value: "#7388a5"},
    {name:"Bbackground", value: "#7388a5"},
    {name:"TSbackground", value: "#add8e6"},
    {name:"aside-background", value: "#ffab00"},
    {name:"aside-border", value: "black"},
    {name:"menu-background", value: "#ffff99"},
    {name:"sgbk", value: "lightgreen"},
    {name:"sgt", value: "black"},
    {name:"srbk", value: "red"},
    {name:"srt", value: "black"},
    {name:"swbk", value: "lightgrey"},
    {name:"swt", value: "black"},
    {name:"sobk", value: "orange"},
    {name:"sot", value: "black"},
    {name:"spbk", value: "#cc66ff"},
    {name:"spt", value: "black"},
    {name:"tsked", value: "black"},
    {name:"tpred", value: "blue"},
    {name:"test", value: "#9900cc"},
    {name:"tman", value: "#ff5500"}
    ];
  PALETTES.push(pBrown);
  PALETTE_NAMES.push("Brown");
  
  const pMidnight = [ 
    {name:"Ltext", value: "#ffffff"}, 
    {name:"Dtext", value: "#ffffff"},
    {name:"Btext", value: "#ffffff"},
    {name:"Ccolor", value: "#ffffff"}, 
    {name:"Mtext", value: "#000000"},
    {name:"Mcolor", value: "#ffff99"}, 
    {name:"TZcolor", value: "#ffcccc"},
    {name:"main-background", value: "#000000"},
    {name:"audio-background", value: "#7843ff"},
    {name:"Rbackground", value: "#606060"},
    {name:"capbackground", value: "#606060"},
    {name:"foot-background", value: "#c0c0c0"},
    {name:"Bbackground", value: "#7388a5"},
    {name:"TSbackground", value: "#add8e6"},
    {name:"aside-background", value: "#000000"},
    {name:"aside-border", value: "white"},
    {name:"menu-background", value: "#ffff99"},
    {name:"sgbk", value: "lightgreen"},
    {name:"sgt", value: "black"},
    {name:"srbk", value: "red"},
    {name:"srt", value: "black"},
    {name:"swbk", value: "lightgrey"},
    {name:"swt", value: "black"},
    {name:"sobk", value: "orange"},
    {name:"sot", value: "black"},
    {name:"spbk", value: "#cc66ff"},
    {name:"spt", value: "black"},
    {name:"tsked", value: "black"},
    {name:"tpred", value: "blue"},
    {name:"test", value: "#9900cc"},
    {name:"tman", value: "#ff5500"}
    ];
  PALETTES.push(pMidnight);
  PALETTE_NAMES.push("Midnight");

  const pPastMidnight = [ 
    {name:"Ltext", value: "#ffffff"}, 
    {name:"Dtext", value: "#ffffff"},
    {name:"Btext", value: "#ffffff"},
    {name:"Ccolor", value: "#ffffff"}, 
    {name:"Mtext", value: "#000000"},
    {name:"Mcolor", value: "#ffff99"}, 
    {name:"TZcolor", value: "#ffcccc"},
    {name:"main-background", value: "#000000"},
    {name:"audio-background", value: "#7843ff"},
    {name:"Rbackground", value: "#606060"},
    {name:"capbackground", value: "#606060"},
    {name:"foot-background", value: "#c0c0c0"},
    {name:"Bbackground", value: "#7388a5"},
    {name:"TSbackground", value: "#add8e6"},
    {name:"aside-background", value: "#000000"},
    {name:"aside-border", value: "white"},
    {name:"menu-background", value: "#ffff99"},
    {name:"sgbk", value: "black"},
    {name:"sgt", value: "lightgreen"},
    {name:"srbk", value: "black"},
    {name:"srt", value: "red"},
    {name:"swbk", value: "black"},
    {name:"swt", value: "lightgrey"},
    {name:"sobk", value: "black"},
    {name:"sot", value: "orange"},
    {name:"spbk", value: "black"},
    {name:"spt", value: "#cc66ff"},
    {name:"tsked", value: "white"},
    {name:"tpred", value: "#6666ff"},
    {name:"test", value: "#9900cc"},
    {name:"tman", value: "#ff5500"}
    ];
  PALETTES.push(pPastMidnight);
  PALETTE_NAMES.push("Past Midnight");
  
    const pDawn = [ 
    {name:"Ltext", value: "#ffffff"}, 
    {name:"Dtext", value: "#000000"},
    {name:"Btext", value: "#212121"},
    {name:"Ccolor", value: "#212121"}, 
    {name:"Mtext", value: "#000000"},
    {name:"Mcolor", value: "#ffff99"}, 
    {name:"TZcolor", value: "#bc0a0a"},
    {name:"main-background", value: "#fbe551"},
    {name:"audio-background", value: "#f48200"},
    {name:"Rbackground", value: "#606060"},
    {name:"capbackground", value: "#606060"},
    {name:"foot-background", value: "#c0c0c0"},
    {name:"Bbackground", value: "#7388a5"},
    {name:"TSbackground", value: "#add8e6"},
    {name:"aside-background", value: "lightblue"},
    {name:"aside-border", value: "black"},
    {name:"menu-background", value: "#ffff99"},
    {name:"sgbk", value: "lightgreen"},
    {name:"sgt", value: "black"},
    {name:"srbk", value: "red"},
    {name:"srt", value: "black"},
    {name:"swbk", value: "lightgrey"},
    {name:"swt", value: "black"},
    {name:"sobk", value: "orange"},
    {name:"sot", value: "black"},
    {name:"spbk", value: "#cc66ff"},
    {name:"spt", value: "black"},
    {name:"tsked", value: "black"},
    {name:"tpred", value: "blue"},
    {name:"test", value: "#9900cc"},
    {name:"tman", value: "#ff5500"}
    ];
  PALETTES.push(pDawn);
  PALETTE_NAMES.push("Dawn");
  
    const pOffice = [
    {name:"Ltext", value: "#000000"}, 
    {name:"Dtext", value: "#000000"},
    {name:"Btext", value: "#000000"},
    {name:"Ccolor", value: "#000000"}, 
    {name:"Mtext", value: "#000000"},
    {name:"Mcolor", value: "#ffff99"}, 
    {name:"TZcolor", value: "#ff6666"},
    {name:"main-background", value: "#fdf8f0"}, //fbfae8"},
    {name:"audio-background", value: "#4169e1"},
    {name:"Rbackground", value: "#7388a5"},
    {name:"capbackground", value: "#7388a5"},
    {name:"foot-background", value: "#7388a5"},
    {name:"Bbackground", value: "#7388a5"},
    {name:"TSbackground", value: "#cccccc"},
    {name:"aside-background", value: "#cccc99"},
    {name:"aside-border", value: "black"},
    {name:"menu-background", value: "#ffff99"},
    {name:"sgbk", value: "lightgreen"},
    {name:"sgt", value: "black"},
    {name:"srbk", value: "red"},
    {name:"srt", value: "black"},
    {name:"swbk", value: "lightgrey"},
    {name:"swt", value: "black"},
    {name:"sobk", value: "orange"},
    {name:"sot", value: "black"},
    {name:"spbk", value: "#cc66ff"},
    {name:"spt", value: "black"},
    {name:"tsked", value: "black"},
    {name:"tpred", value: "blue"},
    {name:"test", value: "#9900cc"},
    {name:"tman", value: "#ff5500"}
    ];
  PALETTES.push(pOffice);
  PALETTE_NAMES.push("Office");
  
    const pFresh = [
    {name:"Ltext", value: "#323232"}, 
    {name:"Dtext", value: "#323232"},
    {name:"Btext", value: "#323232"},
    {name:"Ccolor", value: "#323232"}, 
    {name:"Mtext", value: "#323232"},
    {name:"Mcolor", value: "#ffff99"}, 
    {name:"TZcolor", value: "#ff6666"},
    {name:"main-background", value: "#ddd0c8"},
    {name:"audio-background", value: "#4169e1"},
    {name:"Rbackground", value: "#ddd0c8"},
    {name:"capbackground", value: "#ddd0c8"},
    {name:"foot-background", value: "#ddd0c8"},
    {name:"Bbackground", value: "#ddd0c8"},
    {name:"TSbackground", value: "#cccccc"},
    {name:"aside-background", value: "#ddd0c8"},
    {name:"aside-border", value: "black"},
    {name:"menu-background", value: "#ffff99"},
    {name:"sgbk", value: "lightgreen"},
    {name:"sgt", value: "black"},
    {name:"srbk", value: "red"},
    {name:"srt", value: "black"},
    {name:"swbk", value: "lightgrey"},
    {name:"swt", value: "black"},
    {name:"sobk", value: "orange"},
    {name:"sot", value: "black"},
    {name:"spbk", value: "#cc66ff"},
    {name:"spt", value: "black"},
    {name:"tsked", value: "black"},
    {name:"tpred", value: "blue"},
    {name:"test", value: "#9900cc"},
    {name:"tman", value: "#ff5500"}
    ];
  PALETTES.push(pFresh);
  PALETTE_NAMES.push("Fresh");
