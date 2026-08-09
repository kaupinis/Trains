// eo_wx.js

//https://api.weather.gov/points/38.8894,-77.0352

//https://api.weather.gov/alerts/active?status=actual&message_type=alert&area=MA

class Weather {
    
    static getForecast(lat, lon){
        
    }
    
    
    static async getWxData(url) {
         let p = new Promise(async function(resolve, reject){
            let resp = await fetch(url).catch(function(e) {
                report("18 fetch wx error " + e);
                return(null);
                });
            if(!resp.ok) reject("19 fetch resp not ok");
            if(resp == null) reject("20 fetch resp error");
            else
            {
              let r = await resp.json();
              resolve(r);
            }
         });
         return(p);
    }
    
    static getWXAlerts(statecode) {
        let url = "https://api.weather.gov/alerts/active?status=actual&message_type=alert&area=" + statecode;
        let p = W.getWxData(url);
        return(p);
    }
    
    static decodeWxAlerts(statecode, data) {
        let WA = [];
        if((typeof data.features !== 'undefined') && (data.features != null))
        {
            data.features.forEach(function(feature,index) {
                let ind = Number(index) + 1;
                let ev = feature.properties.event;
                let title = feature.properties.headline;
                let description = feature.properties.description;
                let severity = feature.properties.severity;
                let area = feature.properties.areaDesc;
//                report("47 " + statecode + ind + " " + ev+ " " + title);
                let a = {alert_id : statecode + ind, header_text: ev + " (" + area + ") (" + severity + ") " + title,
                  description: description, cause: "", severity: severity, effect: "", link:""};
                WA.push(a);
            });
        }
        return(WA);
    }
    
    static getWxStatecode(stopid) {
        let n = null;
        let stopname = getStopNameFromID(stopid);
        if(stopid == "AMSNYP") n = "NY";
        else if((stopid.indexOf("TR") == 0) || (stopid.indexOf("MDC") == 0) || (stopid.indexOf("BL") == 0) || (stopname.indexOf("-FL") != -1)) n = "FL";
        else if((stopname.indexOf("-CA") != -1) || (stopid.indexOf("CS") == 0) || (stopid.indexOf("CML") == 0)  || (stopid.indexOf("SF") == 0) || (stopid.indexOf("B_") == 0) || (stopid.indexOf("LAM") == 0) || (stopid.indexOf("CAL") == 0) || (stopid.indexOf("SMART") == 0)) n = "CA";
        else if(stopname.indexOf("-LA") != -1) n = "LA";
        else if(stopname.indexOf("-WI") != -1) n = "WI";
        else if(stopname.indexOf("-AZ") != -1) n = "AZ";
        else if(stopname.indexOf("-NM") != -1) n = "NM";
        else if(stopname.indexOf("-TX") != -1) n = "TX";
        else if(stopname.indexOf("-KS") != -1) n = "KS";
        else if(stopname.indexOf("-OH") != -1) n = "OH";
        else if(stopname.indexOf("-WA") != -1) n = "WA";
        else if(stopname.indexOf("-OR") != -1) n = "OR";
        else if(stopname.indexOf("-OK") != -1) n = "OK";
        else if(stopname.indexOf("-MI") != -1) n = "MI";
        else if(stopname.indexOf("-IN") != -1) n = "IN";
        else if(stopname.indexOf("-PA") != -1) n = "PA";
        else if(stopname.indexOf("-GA") != -1) n = "GA";
        else if(stopname.indexOf("-NC") != -1) n = "NC";
        else if(stopname.indexOf("-SC") != -1) n = "SC";
        else if(stopname.indexOf("-WV") != -1) n = "WV";
        else if(stopname.indexOf("-NY") != -1) n = "NY";
        else if(stopname.indexOf("-NJ") != -1) n = "NJ";
        else if(stopname.indexOf("-ME") != -1) n = "ME";
        else if(stopname.indexOf("-NH") != -1) n = "NH";
        else if(stopname.indexOf("-VT") != -1) n = "VT";
        else if(stopname.indexOf("-CO") != -1) n = "CO";
        else if(stopname.indexOf("-VA") != -1) n = "VA";
        else if(stopname.indexOf("-UT") != -1) n = "UT";
        else if(stopname.indexOf("-WV") != -1) n = "WV";
        else if(stopname.indexOf("-MA") != -1) n = "MA";
        else if(stopname.indexOf("-MD") != -1) n = "MD";
        else if(stopname.indexOf("-MO") != -1) n = "MO";
        else if(stopname.indexOf("-IL") != -1) n = "IL";
        else if(stopid.indexOf("T_") == 0)     n = "MA";
        else if(stopid.indexOf("TB_") == 0)    n = "MA";
        else if(stopid.indexOf("SEP_") == 0)   n = "PA";
        else if(stopid.indexOf("PATCO") == 0)  n = "NJ";
        else if(stopid.indexOf("PS_") == 0)    n = "WA";
        else if(stopid.indexOf("DT_") != -1)   n = "TX";
        else if(stopid.indexOf("TEX_") != -1)  n = "TX";
        else if(stopid.indexOf("WMA") == 0)    n = "MD";
        else if(stopid.indexOf("VRE") == 0)    n = "VA";
        else if(stopid.indexOf("RTD") == 0)    n = "CO";
        else if(stopid.indexOf("SSL") == 0)    n = "IL";
        else if(stopid.indexOf("NYT") == 0)    n = "NY";
        else if(stopid.indexOf("SUN_") == 0)   n = "FL";
        else if(stopid.indexOf("MARC_") == 0)  n = "MD";
        else if(stopid.indexOf("B_") == 0)     n = "CA";
        else if(stopid.indexOf("ME_") == 0)    n = "IL";
        else if(stopid.indexOf("VTA_") == 0)   n = "CA";
        else if(stopid.indexOf("MTA") == 0)    n = "NY";
        else if(stopid.indexOf("MV_") == 0)    n = "MA";
        else if(stopid.indexOf("MSL") == 0)    n = "MO";
        else if(stopid.indexOf("UTA") == 0)    n = "UT";
        else if(stopid.indexOf("NM") == 0)     n = "NM";
        else if(stopid.indexOf("TM") == 0)     n = "WA";
        else if(stopid == "AMSWAS") n = "MD";
        else if(stopid.indexOf("MDM") == 0)    n = "MD";
        else
        {
//    console.log("61 check wx alerts for stopid = " + stopid);
          var routes = getRoutesS(stopid);
          if(routes.indexOf("CTA") == 0) n = "IL";
          else if(routes.indexOf("ME_") != -1) n = "IL";
          else if((routes.indexOf("MN") != -1) || (routes.indexOf("LIRR") != -1) || (routes.indexOf("NY") != -1)) n = "NY";
        }
        return(n);  
    }   
      
    static getWXalertsByStop(stop_id) {
//        report("129 wx " + stop_id + " " + bshowAlerts);
        let p = new Promise(function (resolve, reject) {
          if(bshowAlerts)
          {
            let statecode = W.getWxStatecode(stop_id);
//            report("133 " + stop_id + " : " + statecode);
            if(statecode != null)
            {
              W.getWXAlerts(statecode).then(function(data) {
//                  report("137 " + JSON.stringify(data, null, 4));
                  let WA = W.decodeWxAlerts(statecode, data);
                  WxAlerts = WA;
                  resolve(WA);
                  }).catch(function(e) {
                      report("21 " + e);
                      reject("27 ");
                  });
            }
            else
            {
                reject("32");
            }
          }
//          else reject("35 ");
        });
        return(p);
    }

    
}

let W = Weather;



