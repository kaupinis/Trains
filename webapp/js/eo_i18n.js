// eo_i18n.js

class eo_i18n {
    static SelectedLanguage = 0;
    static CurrentLanguage = "en-US";
    static CurrentRoot = "";  // "en"
    static CurrentBase = "https://www.eightolives.com/docs/Trains/_locales/";  // https"//...
    static CurrentMessages = null;
    static CurrentLanguages = [];
    static Languages = ["en-US","es-ES", "fr-FR", "de-DE",  "it-IT", "ja-JP", "zh-CN"];
    static Filenames = ["en/messages_en.json", "es/messages_es.json", "fr/messages_fr.json","de/messages_de.json", "it/messages_it.json", "ja/messages_ja.json", "zh/messages_zh.json"];

    static initializeLanguage() {
    }

    static getIdFromIndex(n) {
        return(eo_i18n.Languages[n]);
    }

    static updateLanguage(n) {
        let p = new Promise(function(resolve, reject) {
          if(typeof eo_i18n.CurrentLanguages[n] === 'undefined')
          {
            let url = eo_i18n.CurrentBase + eo_i18n.Filenames[n];
            report("25 url = " + url);
            getJSONDataF(url).then( (result) => {
                eo_i18n.CurrentLanguages[n] = result;
                eo_i18n.CurrentMessages = eo_i18n.CurrentLanguages[n].data;
                eo_i18n.SelectedLanguage = n;
                resolve();
            }).catch( (e) => {
                document.getElementById("langsel").selectedIndex = 0;
                SelectedLanguage = 0;
                reject(e);
            });
          }
          else
          {
            eo_i18n.CurrentMessages = eo_i18n.CurrentLanguages[n].data;   
            resolve();
          }
        });
        return(p);
    }
    
    static updateLanguageContent()
    {
      if(eo_i18n.CurrentMessages != null)
      {
        document.querySelectorAll('[data-dxt]').forEach((el) => { // dxt == data-i18n
          const key = el.getAttribute('data-dxt');
          if((typeof key !== 'undefined') && (key != null))
          {
            el.textContent = eo_i18n.CurrentMessages[key];
          }
          });
      }
    }

    static getMessage(key) {
        return(eo_i18n.CurrentMessages[key]);
    }

}

function getJSONDataF(u)
{
    let p = new Promise(function (resolve, reject) {
        let p1 = fetch(u).then(function (response) {
 //           report("95 u = " + u);
            if (!response.ok)
                reject("70 " + response.status);
            else  {
                resolve(response.json());
            }
        }).catch(function (error) {
            reject("75 " + error);
        });
    });
    return (p);
}

function changeLanguage(e)
{

}
