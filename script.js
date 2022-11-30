
//! Style

(function () {
  'use strict';
  const styles = GM_getResourceText("IMPORTED_CSS");
  GM_addStyle(styles);
});

GM_addStyle(`body 
{ 
  background: url(https://antitrio.github.io/trDev/5074256.png); background-repeat: no-repeat; background-size: 100%; }`);
GM_addStyle(
  `.theme-mode .dark 
  { 
    border-radius: 0px; 
  }`
); //#141414





let btn = document.createElement("div");
btn.classList.add("theme", "custom");
let div = document.querySelector(".theme-mode");
div.appendChild(btn);

var frame = document.createElement("div");

document.body.appendChild(frame);

btn.onclick = () => {

};

GM_config.init(
  {
    'id': 'MyConfig', // The id used for this instance of GM_config
    'title': "ChangeTheme",
    'fields': // Fields object
    {
      'Name': // This is the id of the field
      {
        'label': 'Name', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'default': 'Sizzle McTwizzle' // Default value if user doesn't change it
      }
    },
    'frame': frame // Element used for the panel
  });
GM_config.open();
