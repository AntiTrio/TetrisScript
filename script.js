// ==UserScript==
// @name         TetrisScript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  1
// @author       Trio
// @match        https://online-tetris.ru/*
// @icon         https://online-tetris.ru/favicon/apple-touch-icon.png

// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_addElement

// ==/UserScript==

//! Style
const styles = `
.theme-mode .dark {
  border-radius: 0px;
}

.custom {
  border-radius: 0 6px 6px 0;
  margin-left: -1px;
}

.theme-mode .custom::before {
  background: url(https://antitrio.github.io/trDev/palitra.png) 50% no-repeat;
  background-size: 50%;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
`

function style() {
  'use strict';
  GM_addStyle(styles);
};
style();

GM_config.init(
  {
    'id': 'tr', // The id used for this instance of GM_config
    'title': 'Настройка заднего фона',
    'fields': // Fields object
    {
      'Background': // This is the id of the field
      {
        'label': 'Ссылка на картинку:',
        'type': 'text',
        'title': '',
      },
      'Opacity': // This is the id of the field
      {
        'label': 'Прозрачность (0.0-1.0):',
        'type': 'float',
        'min': 0.0,
        'max': 1.0,
      },
    },
    'css': `
    tr_section_0 {
      display: none !important;
    }

    #tr_field_Background {
      width: 300;
    }

    #tr {
      background-color: #2A2626;
      color: white;
    }

    #tr_header {
      font-size: 25pt;
      margin-bottom: 5px;
    }

    #tr .reset {
      color: white;
      font-weight: bold;
      margin-top: 5px;
      font-size: 13pt;
    }

    button {
      --b: 3px;
      --s: .45em;
      --color: #fff;
      width: 170;
      height: 50;
      padding: calc(.5em + var(--s)) calc(.9em + var(--s));
      color: var(--color);
      --_p: var(--s);
      background:
        conic-gradient(from 90deg at var(--b) var(--b), #0000 90deg, var(--color) 0) var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
      transition: .3s linear, color 0s, background-color 0s;
      outline: var(--b) solid #0000;
      outline-offset: .6em;
      font-size: 16px;

      border: 0;

      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    button:hover,
    button:focus-visible {
      --_p: 0px;
      outline-color: var(--color);
      outline-offset: .05em;
    }

    button:active {
      color: black;
      background: var(--color);
      color: #fff;
    }

    html {
      --angle: 0deg;
      border: 0.5vmin solid;
      border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
      animation: 20s rotate linear infinite;
    }

    @keyframes rotate {
      to {
        --angle: 360deg;
      }
    }

    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    .field_label{
      font-size: 15pt;
    }
    `
  });



let btn = document.createElement("div");
btn.classList.add("theme", "custom");
let div = document.querySelector(".theme-mode");
div.appendChild(btn);

btn.onclick = () => {
  GM_config.open();
};

GM_addStyle(`
.div1
{
 background: url(${GM_config.get('Background')});
 opacity:${GM_config.get('Opacity')};
 position:absolute;
 top:0;
 bottom:0;
 right:0;
 left:0;
 background-repeat: no-repeat;
 background-size: cover;
 z-index:-1;
}`);

let bod = document.createElement('div');
bod.classList.add("div1");
document.body.appendChild(bod);

document.querySelector("#tr_saveBtn").onclick = () => {
  location.href = location.href;
};
