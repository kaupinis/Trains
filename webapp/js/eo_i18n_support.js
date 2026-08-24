// eo_i18n_support.js

/** Creates a JSON object for a messages_lang.json file
 * mode == 0 -> create complete data
 * mode == 1 -> create only items not defined in current messages data.
 */
function makeMessagesTemplate(mode)
{
  let o = {};
  document.querySelectorAll('[data-dxt]').forEach((el) => { // dit == data-i18n
      const key = el.getAttribute('data-dxt');
      if(mode == 0)
      {
        o[key] = el.textContent;
      }
      else if(mode == 1)
      {
        let r = eo_i18n.getMessage(key);
        if((typeof r === 'undefined') || (r == null) || (r == ""))
        {
          o[key] = el.textContent;
        }
      }
      });
  let r = {
      lang: "en",
      data: o
  };
  clearReport();
  report(JSON.stringify(r, null, 4));
}
