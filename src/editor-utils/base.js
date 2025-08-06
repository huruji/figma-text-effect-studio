const $ = (..._0x58d07a) => document.querySelector(..._0x58d07a);
function ready(_0x171bb2) {
  if (document.readyState !== "complete" && document.readyState !== "interactive") {
    document.addEventListener("DOMContentLoaded", function _0x4b6587(_0x1a1d06) {
      document.removeEventListener("DOMContentLoaded", _0x4b6587);
      _0x171bb2();
    });
  } else {
    _0x171bb2();
  }
}
function isChrome() {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}
function getById(_0x6fc357) {
  return document.getElementById(_0x6fc357);
}
function get_url_extension(_0x2a6318) {
  return _0x2a6318.split(/[#?]/)[0].split(".").pop().trim();
}
function addEventListeners(_0x31bfec, _0x374f87, _0x3a68aa) {
  _0x374f87.forEach(_0x15b266 => _0x31bfec.addEventListener(_0x15b266, _0x3a68aa));
}
function trim(_0x50fa80, _0x37ad0f = " ") {
  let _0x14db78 = 0;
  let _0x2ab470 = _0x50fa80.length - 1;
  while (_0x50fa80[_0x14db78] === _0x37ad0f) {
    _0x14db78++;
  }
  while (_0x50fa80[_0x2ab470] === _0x37ad0f) {
    _0x2ab470--;
  }
  return _0x50fa80.slice(_0x14db78, _0x2ab470 + 1);
}
function escapeHTML(_0x1b74cc) {
  const _0x232fe7 = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  };
  return _0x1b74cc.replace(/[&<>"']/g, function (_0x3bca20) {
    return _0x232fe7[_0x3bca20];
  });
}
function url(_0x5c413e, _0x4db4af = true) {
  const _0x53411e = get_url_extension(_0x5c413e);
  return (CDN_EXTENSIONS.indexOf(_0x53411e) !== -1 && _0x4db4af ? LINKY_CDN : LINKY).replace(/LINKY/, _0x5c413e);
}
function isDescendant(_0x3a4fff, _0xcaacc5) {
  for (var _0x130abe = _0xcaacc5.parentNode; _0x130abe != null;) {
    if (_0x130abe == _0x3a4fff) {
      return true;
    }
    _0x130abe = _0x130abe.parentNode;
  }
  return false;
}
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function browserSupportCanvasWebp() {
  const _0xe86dcd = document.createElement("canvas");
  return !!_0xe86dcd.getContext && !!_0xe86dcd.getContext("2d") && _0xe86dcd.toDataURL("image/webp").indexOf("data:image/webp") !== -1;
}
function loadScript(_0x5a1766, _0x375774, _0x2f6635) {
  const _0x14c88e = document.getElementsByTagName("head")[0];
  const _0x2808b0 = document.createElement("script");
  _0x2808b0.type = "text/javascript";
  _0x2808b0.async = _0x375774;
  _0x2808b0.src = _0x5a1766;
  _0x2808b0.onload = function () {
    _0x2f6635(true);
  };
  _0x2808b0.onerror = function () {
    _0x2f6635(false);
  };
  _0x14c88e.appendChild(_0x2808b0);
}
async function loadScriptFileAsync(_0x216ce4) {
  return new Promise((_0x2870b0, _0xe00642) => {
    loadScript(_0x216ce4, true, _0x43af92 => {
      if (_0x43af92) {
        _0x2870b0();
      } else {
        _0xe00642();
      }
    });
  });
}
function loadCssFile(_0x3d105a, _0x445fe6, _0x4880cc) {
  const _0x14d82f = document.getElementsByTagName("head")[0];
  const _0x595cd9 = document.createElement("link");
  _0x595cd9.type = "text/css";
  _0x595cd9.rel = "stylesheet";
  _0x595cd9.href = _0x3d105a;
  _0x595cd9.media = "all";
  _0x595cd9.onload = _0x445fe6;
  _0x595cd9.onerror = _0x4880cc;
  _0x14d82f.appendChild(_0x595cd9);
}
async function loadCssFileAsync(_0x43d93) {
  return new Promise((_0x1d6786, _0x314cc0) => {
    loadCssFile(_0x43d93, _0x1d6786, _0x314cc0);
  });
}
function setCookie(_0x5132fa, _0x3660b3, _0x59359a) {
  var _0x572eb1 = "";
  if (_0x59359a) {
    var _0x53505e = new Date();
    _0x53505e.setTime(_0x53505e.getTime() + _0x59359a * 24 * 60 * 60 * 1000);
    _0x572eb1 = "; expires=" + _0x53505e.toUTCString();
  }
  document.cookie = _0x5132fa + "=" + (_0x3660b3 || "") + _0x572eb1 + "; path=/";
}
function getCookie(_0x37144b) {
  var _0xe98c20 = _0x37144b + "=";
  for (var _0x1380ed = document.cookie.split(";"), _0x16fdc1 = 0; _0x16fdc1 < _0x1380ed.length; _0x16fdc1++) {
    for (var _0x3df246 = _0x1380ed[_0x16fdc1]; _0x3df246.charAt(0) == " ";) {
      _0x3df246 = _0x3df246.substring(1, _0x3df246.length);
    }
    if (_0x3df246.indexOf(_0xe98c20) == 0) {
      return _0x3df246.substring(_0xe98c20.length, _0x3df246.length);
    }
  }
  return null;
}
function round(_0x43dede, _0x29ce6f = 0) {
  if (_0x29ce6f === 0) {
    return Math.round(_0x43dede);
  }
  const _0x195b83 = Math.pow(10, _0x29ce6f);
  return Math.round(_0x43dede * _0x195b83) / _0x195b83;
}
function roundToEven(_0x14e129) {
  if (Number.isNaN(_0x14e129)) {
    return 0;
  } else {
    return Math.round(_0x14e129 / 2) * 2;
  }
}
function removeParam(_0x1be8b6, _0x33101e) {
  let _0x2ee204;
  let _0x5d6044 = _0x33101e.split("?")[0];
  let _0x493233 = [];
  let _0x274051 = _0x33101e.indexOf("?") !== -1 ? _0x33101e.split("?")[1] : "";
  if (_0x274051 !== "") {
    _0x493233 = _0x274051.split("&");
    for (let _0xc1f04f = _0x493233.length - 1; _0xc1f04f >= 0; _0xc1f04f -= 1) {
      _0x2ee204 = _0x493233[_0xc1f04f].split("=")[0];
      if (_0x2ee204 === _0x1be8b6) {
        _0x493233.splice(_0xc1f04f, 1);
      }
    }
    if (_0x493233.length) {
      _0x5d6044 = _0x5d6044 + "?" + _0x493233.join("&");
    }
  }
  return _0x5d6044;
}
function arrayUnique(_0x1b7734) {
  return _0x1b7734.filter((_0x358aeb, _0x3f4163, _0x2c0a6d) => _0x2c0a6d.indexOf(_0x358aeb) === _0x3f4163);
}
function rand(_0x1b6489, _0x28adad) {
  if (_0x1b6489 == 0) {
    return Math.floor(Math.random() * _0x28adad + 0);
  } else {
    return Math.floor(Math.random() * (_0x28adad - _0x1b6489 + 1)) + _0x1b6489;
  }
}
function arrayRand(_0x2a0d6e) {
  return _0x2a0d6e[Math.floor(Math.random() * _0x2a0d6e.length)];
}
function sleep(_0x4de964) {
  return new Promise(_0x2ae2ff => {
    setTimeout(_0x23e598 => _0x2ae2ff(), _0x4de964);
  });
}
function Timer(_0x333f25) {
  var _0x68b38e = this;
  _0x68b38e.id = _0x333f25;
  var _0x2c8559 = [];
  _0x68b38e.start = function () {
    var _0x1abb59 = performance.now();
    console.log("[" + _0x333f25 + "] Start");
    _0x2c8559.push(_0x1abb59);
  };
  _0x68b38e.lap = function (_0x111e0c) {
    _0x111e0c = _0x111e0c || performance.now();
    console.log("[" + _0x333f25 + "] Lap " + _0x111e0c - _0x2c8559[_0x2c8559.length - 1]);
    _0x2c8559.push(_0x111e0c);
  };
  _0x68b38e.stop = function () {
    var _0x29fa71 = performance.now();
    if (_0x2c8559.length > 1) {
      _0x68b38e.lap(_0x29fa71);
    }
    console.log("[" + _0x333f25 + "] Stop " + (_0x29fa71 - _0x2c8559[0]));
    _0x2c8559 = [];
  };
}
function menuHeaderListener() {
  const _0x26b238 = getById("menu-header");
  if (!_0x26b238) {
    return;
  }
  const _0x274679 = getById("show-menu-icon");
  const _0x3297e0 = function (_0x239e86) {
    if (_0x274679 !== _0x239e86.target && _0x26b238 !== _0x239e86.target && !isDescendant(_0x26b238, _0x239e86.target)) {
      document.body.classList.remove("menu-opened");
      this.removeEventListener("click", _0x3297e0);
    }
  };
  const _0x2652e4 = function (_0x846b9f) {
    const _0x173270 = _0x846b9f ? "add" : "remove";
    document.body.classList[_0x173270]("menu-opened");
    if (_0x846b9f) {
      document.addEventListener("click", _0x3297e0);
    } else {
      document.removeEventListener("click", _0x3297e0);
    }
  };
  _0x274679.addEventListener("click", function (_0x43b0a5) {
    _0x43b0a5.stopPropagation();
    if (document.body.classList.contains("menu-opened")) {
      _0x2652e4(false);
    } else {
      _0x2652e4(true);
    }
  });
}
function disableFormButtonsListerner() {
  const _0x5869da = document.querySelectorAll("form");
  for (let _0x3702f7 = 0; _0x3702f7 < _0x5869da.length; _0x3702f7++) {
    _0x5869da[_0x3702f7].addEventListener("submit", function (_0x40c129) {
      const _0x4ce135 = this.querySelectorAll("button");
      for (let _0x3d7b58 = 0; _0x3d7b58 < _0x4ce135.length; _0x3d7b58++) {
        _0x4ce135[_0x3d7b58].disabled = true;
      }
    });
  }
}
function setPreviewTextareaEvent() {
  const _0x3c186f = getById("preview-texts-form");
  if (!_0x3c186f) {
    return;
  }
  const _0x15558c = _0x3c186f.querySelector("textarea");
  if (_0x15558c) {
    _0x15558c.addEventListener("keydown", _0x399d0b => {
      if (_0x399d0b.keyCode == 13 && !_0x399d0b.shiftKey) {
        _0x399d0b.preventDefault();
        if (_0x3c186f.tagName === "DIV") {
          const _0x42e589 = _0x3c186f.querySelector("button");
          if (_0x42e589) {
            _0x42e589.click();
          }
        } else if (_0x3c186f.tagName === "FORM") {
          _0x3c186f.submit();
        }
      }
    });
  }
}
function textGeneratorListeners() {
  const _0x59709a = getById("text-generator-form");
  if (!_0x59709a) {
    return;
  }
  const _0x55b0e8 = _0x59709a.querySelector("textarea");
  if (!_0x55b0e8) {
    return;
  }
  const _0x465987 = _0x59709a.querySelector("button[type=submit]");
  if (_0x465987) {
    _0x55b0e8.addEventListener("keypress", function (_0x33274d) {
      if (_0x33274d.keyCode === 13 && !_0x33274d.shiftKey) {
        if (_0x59709a instanceof HTMLFormElement) {
          _0x33274d.preventDefault();
          _0x33274d.stopPropagation();
          _0x59709a.submit();
        } else {
          _0x33274d.preventDefault();
          _0x33274d.stopPropagation();
          _0x465987.click();
        }
      }
    });
  }
}
ready(function () {
  menuHeaderListener();
  disableFormButtonsListerner();
  setPreviewTextareaEvent();
  textGeneratorListeners();
});
ready(_0x1caf63 => {
  const _0x3bcc56 = document.querySelector(".favorite-button");
  if (!_0x3bcc56) {
    return;
  }
  const _0x242d88 = _0x3bcc56.getAttribute("data-item-id");
  const _0x382549 = _0x3bcc56.getAttribute("data-item-type");
  if (!_0x242d88 || _0x242d88 === "0") {
    return;
  }
  let _0x22938d = true;
  const _0x102d24 = (_0x3c22d5, _0x44143b) => {
    _0x22938d = false;
    _0x3bcc56.removeAttribute("disabled");
    if (_0x3c22d5) {
      let _0x8ffef1;
      if (_0x3c22d5 === "yes") {
        _0x3bcc56.classList.add("selected");
        _0x3bcc56.setAttribute("data-selected", "yes");
        _0x3bcc56.setAttribute("title", _0x3bcc56.getAttribute("data-remove-text"));
        _0x8ffef1 = _0x3bcc56.getAttribute("data-success-add-text");
      } else {
        _0x3bcc56.classList.remove("selected");
        _0x3bcc56.setAttribute("data-selected", "no");
        _0x3bcc56.setAttribute("title", _0x3bcc56.getAttribute("data-add-text"));
        _0x8ffef1 = _0x3bcc56.getAttribute("data-success-remove-text");
      }
      if (_0x44143b) {
        Toastify({
          text: _0x8ffef1,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          className: "",
          offset: {
            x: 0,
            y: 0
          },
          onClick: function () {}
        }).showToast();
      }
    }
  };
  const _0x25382c = _0x566949 => {
    Toastify({
      text: _0x566949 || "An error occurred during the update of the bookmark.",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      className: "toastify-error",
      offset: {
        x: 0,
        y: 0
      },
      onClick: function () {}
    }).showToast();
  };
  const _0x3a68b8 = url("ajax/favorite?status=1&itemId=" + _0x242d88 + "&itemType=" + _0x382549);
  fetch(_0x3a68b8).then(_0x2bc801 => _0x2bc801.json()).then(_0x407e00 => {
    if (_0x407e00.error) {
      _0x25382c(_0x407e00.error);
    } else {
      if (!_0x407e00.selected) {
        _0x102d24();
        _0x25382c();
        return;
      }
      _0x102d24(_0x407e00.selected);
      _0x3bcc56.style.display = "block";
    }
  }).catch(_0x54e47a => {
    _0x102d24();
    _0x25382c(_0x54e47a);
    console.error(_0x54e47a);
  });
  _0x3bcc56.addEventListener("click", _0x2843c2 => {
    _0x2843c2.stopPropagation();
    if (_0x22938d) {
      return;
    }
    _0x22938d = true;
    _0x3bcc56.setAttribute("disabled", "disabled");
    const _0x3ba4d7 = url("ajax/favorite?" + (_0x3bcc56.getAttribute("data-selected") === "yes" ? "remove" : "add") + "=1&itemId=" + _0x242d88 + "&itemType=" + _0x382549);
    fetch(_0x3ba4d7).then(_0x9cb399 => _0x9cb399.json()).then(_0x3a6b74 => {
      console.log(_0x3a6b74);
      if (_0x3a6b74.error) {
        _0x102d24();
        _0x25382c(_0x3a6b74.error);
        return;
      } else if (_0x3a6b74.selected) {
        _0x102d24(_0x3a6b74.selected, true);
        return;
      } else {
        _0x25382c();
        _0x102d24();
        return;
      }
    }).catch(_0xc9bb1c => {
      _0x25382c(_0xc9bb1c);
      console.error(_0xc9bb1c);
      _0x102d24();
    });
  });
});
class RatingBar extends HTMLElement {
  connectedCallback() {
    this._cfg = {
      rate: "0",
      canrate: "1",
      initurl: null,
      rateurl: null,
      starsize: "40",
      label: "",
      labelcolor: "#fff",
      onrating: ""
    };
    for (const _0x4113be in this._cfg) {
      const _0x473d92 = this.getAttribute(_0x4113be);
      if (_0x473d92 !== null && this._cfg[_0x4113be] !== undefined) {
        this._cfg[_0x4113be] = _0x473d92;
      }
    }
    this._rate = this._normalizeRate(this._cfg.rate);
    this._build();
    this._init();
    this.canrate = this._cfg.canrate === "1";
    this.label = this._cfg.label;
  }
  constructor() {
    super();
  }
  _build() {
    this._labelNode = document.createElement("label");
    this._starsNode = document.createElement("stars");
    this._starsBackNode = document.createElement("stars-back");
    this._starsActiveNode = document.createElement("stars-active");
    for (let _0x474fd7 = 0; _0x474fd7 < 5; _0x474fd7++) {
      let _0x320e5f = document.createElement("star");
      _0x320e5f.setAttribute("rate", _0x474fd7 + 1);
      _0x320e5f.addEventListener("mouseover", _0x519113 => this._mouseover(_0x519113));
      _0x320e5f.addEventListener("mouseout", _0x40fe6e => this._mouseout(_0x40fe6e));
      _0x320e5f.addEventListener("click", _0x315ab9 => this._click(_0x315ab9));
      _0x320e5f.style.width = _0x320e5f.style.height = parseInt(this._cfg.starsize) + "px";
      this._starsBackNode.appendChild(_0x320e5f);
      this._starsNode.appendChild(this._starsBackNode);
      _0x320e5f = document.createElement("star");
      _0x320e5f.setAttribute("rate", _0x474fd7 + 1);
      _0x320e5f.style.width = _0x320e5f.style.height = parseInt(this._cfg.starsize) + "px";
      this._starsActiveNode.appendChild(_0x320e5f);
      this._starsNode.appendChild(this._starsActiveNode);
      this.appendChild(this._starsNode);
    }
    this._labelNode.style.color = this._cfg.labelcolor;
    this.appendChild(this._labelNode);
  }
  _init() {
    if (this._cfg.initurl) {
      this.disabled = true;
      fetch(this._cfg.initurl).then(_0x1d1672 => _0x1d1672.json()).then(_0x4157e8 => {
        this._update(_0x4157e8);
      }).catch(_0x11706a => {
        console.log(_0x11706a);
      }).finally(_0x2228cc => {
        this.disabled = false;
        this.setAttribute("initialized", "1");
      });
    } else {
      this._set(this._rate);
      this.setAttribute("initialized", "1");
    }
  }
  _update(_0x39d367) {
    if (!this._undefined(_0x39d367.rate)) {
      this._rate = this._normalizeRate(_0x39d367.rate);
    }
    if (!this._undefined(_0x39d367.nb_rates)) {
      this._nb_rates = parseInt(_0x39d367.nb_rates);
    }
    if (!this._undefined(_0x39d367.canrate)) {
      this.canrate = !!_0x39d367.canrate;
    }
    if (!this._undefined(_0x39d367.label)) {
      this.label = _0x39d367.label;
    }
    if (!this._undefined(_0x39d367.title)) {
      this.title = _0x39d367.title;
    }
    this._set(this._rate);
  }
  _set(_0x2e7f4e) {
    const _0xbc25c0 = this._starsBackNode.offsetWidth * (_0x2e7f4e / 5);
    this._starsActiveNode.style.width = _0xbc25c0 + "px";
  }
  _mouseover(_0x5b7eaa) {
    if (!this.canrate) {
      return;
    }
    const _0x2f8120 = this._normalizeRate(_0x5b7eaa.target.getAttribute("rate"));
    if (this.title === "") {
      this.title = _0x2f8120 + "/5";
      this._removeTitleOnMouseOut = true;
    }
    this._set(_0x2f8120);
  }
  _mouseout(_0x4c7eee) {
    if (this.canrate) {
      if (this._removeTitleOnMouseOut) {
        this.title = "";
        delete this._removeTitleOnMouseOut;
      }
      this._set(this._rate);
    }
  }
  _click(_0x20b4e5) {
    if (this.canrate && (this._rate = this._normalizeRate(_0x20b4e5.target.getAttribute("rate")), this._set(this._rate), this._cfg.onrating && (typeof this._cfg.onrating == "function" ? this._cfg.onrating() : function () {
      return eval(this._cfg.onrating);
    }.call(this)), this._cfg.rateurl)) {
      this.disabled = true;
      const _0x34100a = this._cfg.rateurl.replace("{{rate}}", this._rate);
      fetch(_0x34100a).then(_0x3e8566 => _0x3e8566.json()).then(_0x4c140e => {
        this._update(_0x4c140e);
      }).catch(_0xf92df6 => {
        console.log(_0xf92df6);
      }).finally(_0x1e0df4 => {
        this.disabled = false;
      });
    }
  }
  show() {
    this.style.display = this._defaultDisplay ? this._defaultDisplay : "inlinex-flex";
  }
  hide() {
    this._defaultDisplay = this.style.display;
    this.style.display = "none";
  }
  set rate(_0x215a73) {
    this._rate = this._normalizeRate(_0x215a73);
    this._set(this._rate);
  }
  get rate() {
    return this._rate;
  }
  set canrate(_0x1e5475) {
    this._canrate = !!_0x1e5475;
    if (this._canrate) {
      this.classList.remove("locked");
    } else {
      this.classList.add("locked");
    }
  }
  get canrate() {
    return this._canrate;
  }
  set label(_0x28788b) {
    const _0x4bf62a = this.querySelector("label");
    if (_0x28788b === "") {
      _0x4bf62a.classList.add("hide");
    } else {
      _0x4bf62a.classList.remove("hide");
    }
    this._labelNode.innerHTML = _0x28788b;
  }
  get label() {
    return this._labelNode.innerHTML;
  }
  set disabled(_0x154932) {
    if (_0x154932) {
      this.classList.add("disabled");
    } else {
      this.classList.remove("disabled");
    }
  }
  get disabled() {
    return this.classList.indexOf("disabled") !== -1;
  }
  _normalizeRate(_0xb6a78c) {
    return Math.min(5, Math.max(0, parseFloat(_0xb6a78c)));
  }
  _undefined(_0x2c3de4) {
    return _0x2c3de4 === undefined;
  }
}
window.customElements.define("rating-bar", RatingBar);
ready(_0x49514f => {
  const _0x1f9ade = $("#search-input");
  if (_0x1f9ade) {
    const _0x12a503 = $("#search-form");
    _0x12a503.querySelector("button");
    const _0x308f0c = $("#search-type-input");
    _0x12a503.addEventListener("submit", _0x2aba78 => {
      _0x2aba78.preventDefault();
      let _0x1073f5 = _0x2aba78.target;
      let _0x486996 = _0x1073f5.querySelector("input[name=\"q\"]")?.value;
      let _0x1bd10c = _0x1073f5.getAttribute("action");
      let _0x294c7d = _0x1073f5.querySelector("select")?.value;
      u = _0x1bd10c;
      if (_0x486996.trim() !== "") {
        _0x486996 = _0x486996.trim().replace(/ /g, "-");
        if (_0x294c7d !== "all") {
          u = (_0x294c7d !== "" ? _0x294c7d + "/" : "") + "s";
        }
        u += "/" + encodeURIComponent(_0x486996.trim());
      }
      window.location = url(u);
    });
    _0x1f9ade.style.paddingRight = _0x308f0c.offsetWidth + 14 + "px";
  }
});
class AutoResizingTextarea {
  constructor(..._0x14c08b) {
    this.textareas = _0x14c08b.map(_0x2c3c9d => typeof _0x2c3c9d == "string" ? document.querySelector(_0x2c3c9d) : _0x2c3c9d);
    this.proxies = new Map();
    this.init();
  }
  init() {
    this.textareas.forEach(_0x3812ff => {
      this.createProxyFor(_0x3812ff);
      this.attachEvents(_0x3812ff);
      this.resize(_0x3812ff);
    });
  }
  createProxyFor(_0x1bc0a3) {
    const _0x915fc8 = document.createElement("div");
    const _0x10f71c = getComputedStyle(_0x1bc0a3);
    Object.assign(_0x915fc8.style, {
      position: "absolute",
      visibility: "hidden",
      left: "-9999px",
      top: "0",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      boxSizing: _0x10f71c.boxSizing,
      width: _0x10f71c.width,
      fontSize: _0x10f71c.fontSize,
      fontFamily: _0x10f71c.fontFamily,
      lineHeight: _0x10f71c.lineHeight,
      padding: _0x10f71c.padding,
      border: _0x10f71c.border,
      letterSpacing: _0x10f71c.letterSpacing
    });
    document.body.appendChild(_0x915fc8);
    this.proxies.set(_0x1bc0a3, _0x915fc8);
  }
  getHeightFor(_0x143ec9) {
    const _0x4c753a = this.proxies.get(_0x143ec9);
    _0x4c753a.textContent = _0x143ec9.value + ".";
    return Math.ceil(_0x4c753a.offsetHeight + 1) + "px";
  }
  attachEvents(_0x452d35) {
    ["input", "paste"].forEach(_0xfd873e => {
      _0x452d35.addEventListener(_0xfd873e, () => this.resize(_0x452d35));
    });
  }
  resize(_0x1c880e) {
    requestAnimationFrame(() => {
      _0x1c880e.style.height = "auto";
      _0x1c880e.style.height = this.getHeightFor(_0x1c880e);
    });
  }
  forceResize(_0xccfb49) {
    let _0x55d6d8 = typeof _0xccfb49 == "string" ? document.querySelector(_0xccfb49) : _0xccfb49;
    if (_0x55d6d8) {
      if (!this.proxies.has(_0x55d6d8)) {
        this.textareas.push(_0x55d6d8);
        this.createProxyFor(_0x55d6d8);
        this.attachEvents(_0x55d6d8);
      }
      this.resize(_0x55d6d8);
    }
  }
}