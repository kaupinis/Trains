// eo_i18n.js

class eo_i18n {
    static CurrentLanguage = "en-US";
    static CurrentRoot = "";  // "en"
    static CurrentBase = "";  // https"//...
    static Messages = [];
    static CurrentMessages = null;
    static Languages = ["en-US","es-ES", "fr-FR", "de-DE",  "it-IT", "ja-JP", "zh-CN"];

    static initializeLanguage() {
        if(CurrentRoot == "")
        {
          let z = window.location.href;
          eo_i18n.CurrentBase = z.substring(0,z.lastIndexOf("/"));
          let j = id.indexOf("-");
          if(j == -1) eo_i18n.CurrentRoot = eo_i18n.CurrentLanguage;
          else eo_i18n.CurrentRoot = eo_i18n.CurrentLanguage.substring(0, j);
          /*
          try {
            let langsel = document.getElementById('language-select');
            if((typeof langsel !== 'undefined') && (langsel !=  null))
            {
              langsel.addEventListener('change',  eo_i18n.changeLanguage(e));
            }

          }
          catch(e) {
            report("14 " + e);
          }
          */
        }
    }

    static getIdFromIndex(n) {
        return(eo_i18n.Languages[n]);
    }

    static async updateLanguage(id) {
        eo_i18n.CurrentLanguage = id;
        let j = id.indexOf("-");
        if(j == -1) eo_i18n.CurrentRoot = id;
        else eo_i18n.CurrentRoot = id.substring(0, j);

        let m = eo_i18n.Messages[eo_i18n.CurrentRoot];
        if((typeof m === 'undefined'))
        {
          if(eo_i18n.CurrentBase.indexOf("http") == 0)
          {
            let url = eo_i18n.CurrentBase + "_locales/" + eo_i18n.CurrentRoot + "/messages_" + eo_i18n.CurrentRoot + ".json"
            let response = await fetch(url);
            if(!response.ok)
            {
              report("43 " + response.status);
            }
            else
            {
              let result = await response.json().catch((e) => {
                  report("59 " + e);
                  return("");
              });
              if(result != "")
              {
                eo_i18n.Message[eo_i18n.CurrentRoot] = result;
                eo_i18n.CurrentMessages = eo_i18n.Messages[eo_i18n.CurrentRoot];
              }
            }
          }
        }
        else eo_i18n.CurrentMessages = m;
    }

    static updateLanguageContent()
    {
      if(eo_i18n.CurrentMessages != null)
      {
        document.querySelectorAll('[data-dxt]').forEach((el) => { // dxt == data-i18n
          const key = el.getAttribute('data-dxt');
          if((typeof key !== 'undefined') && (key != null))
          {
            el.textContent = eo_i18n.getMessage(key);
          }
          });
      }
    }

    static getMessage(key) {
        return(eo_i18n.CurrentMessages[key]);
    }

}

function changeLanguage(e)
{

}
