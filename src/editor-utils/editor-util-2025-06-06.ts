// @ts-nocheck
const LINKY = '/LINKY';
const LINKY_CDN = 'https://cdn.textstudio.com/LINKY';
const CDN_EXTENSIONS = ["jpg","png","gif","svg","webp","mp4","webm","css","js","map","otf","ttf","woff2","json","FONT_EXT"];
const OPEN_CV_FILE_URL = 'https://cdn.textstudio.com/asset/editor/opencv-custom.min.js?20220122';
const DISTORT_SCRIPT_FILE_URL = 'https://cdn.textstudio.com/asset/editor/distort.min.js?20221118';
const ONLINE = true;

/**
 * Extracts the file extension from a URL
 * @param url - The URL to extract extension from
 * @returns The file extension without any query parameters or hash fragments
 */
export function get_url_extension(url: string): string {
  return url.split(/[#?]/)[0].split(".").pop()?.trim() ?? "";
}

/**
 * Processes a URL based on its extension and whether to use CDN
 * @param url - The input URL to process
 * @param useCdn - Whether to use CDN for supported extensions (default: true)
 * @returns The processed URL with appropriate CDN or regular link format
 */
export function url(url: string, useCdn: boolean = true): string {
  const extension = get_url_extension(url);
  const template = (CDN_EXTENSIONS.indexOf(extension) !== -1 && useCdn ? LINKY_CDN : LINKY);
  return template.replace(/LINKY/, url);
}

export const TextEditorUtil = {
  hexToRgb(hex:string) {
    const hexArray = hex.substring(1).match(/.{1,2}/g);
    if (!hexArray) return null;
    const rgb: { r: number, g: number, b: number, a?: number } = {
      r: parseInt(hexArray[0], 16),
      g: parseInt(hexArray[1], 16),
      b: parseInt(hexArray[2], 16)
    };
    if (hexArray.length === 4) {
      rgb.a = parseInt(hexArray[3], 16) / 255;
    }
    Object.keys(rgb).map(function (item, index) {
      if (isNaN(rgb[item])) {
        rgb[item] = 0;
      }
    });
    return rgb;
  },
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },
  removeAllHexOpaqueAlpha(hex:string) {
    return hex.replace(/(#\w{6})ff/gi, "$1");
  },
  isHexColor(hex:string) {
    return new RegExp("^#([0-9a-f]{6}|[0-9a-f]{3})$", "i").test(hex);
  },
  rgbToHex(rgb: { r: number, g: number, b: number, a?: number }) {
    let hex = "#" + (16777216 + (rgb.r << 16 | rgb.g << 8 | rgb.b)).toString(16).slice(1);
    if (rgb.a !== undefined) {
      const a = Math.floor(rgb.a * 255);
      hex += (a < 16 ? "0" : "") + a.toString(16);
    }
    return hex;
  },
  degrad(deg:number) {
    return deg * Math.PI / 180;
  },
  generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
      const random = Math.random() * 16 | 0;
      return (char === "x" ? random : random & 3 | 8).toString(16);
    });
  },
  exponentialCurve(value:number, exponent = 100, base = 4) {
    const log = Math.log(value) / Math.log(base);
    return Array(value).fill(log).map((_, i) => _ / Math.pow(log, i));
  },
  mergeDeep(obj1:any, obj2:any) {
    const isObject = (value:any) => value && typeof value === "object" && !Array.isArray(value);
    if (isObject(obj1) && isObject(obj2)) {
      Object.keys(obj2).forEach(key => {
        if (isObject(obj2[key])) {
          if (!obj1[key]) obj1[key] = {};
          this.mergeDeep(obj1[key], obj2[key]);
        } else {
          obj1[key] = obj2[key];
        }
      });
    }
    if (isObject(obj1) && isObject(obj2)) {
      for (const key in obj2) {
        if (isObject(obj2[key])) {
          if (!obj1[key]) obj1[key] = {};
          this.mergeDeep(obj1[key], obj2[key]);
        } else {
          obj1[key] = obj2[key];
        }
      }
    }
    return obj1;
  },
  cloneCanvas(canvas: HTMLCanvasElement) {
    const newCanvas = document.createElement("canvas")
    const ctx = newCanvas.getContext("2d")
    newCanvas.width = canvas.width
    newCanvas.height = canvas.height
    ctx?.drawImage(canvas, 0, 0)
    return newCanvas
  },
  getBoundingSize(size: number[], angle: number) {
    if ((angle %= 180) < 0) {
      angle = 180 + angle
    }
    if (angle >= 90) {
      size = [size[1], size[0]]
      angle -= 90
    }
    if (angle === 0) {
      return {
        width: size[0],
        height: size[1]
      }
    }
    const radian = angle * Math.PI / 180
    return {
      width: size[0] * Math.abs(Math.cos(radian)) + size[1] * Math.abs(Math.sin(radian)),
      height: size[0] * Math.abs(Math.sin(radian)) + size[1] * Math.abs(Math.cos(radian))
    }
  },
  opencvToCanvas: function (_0x9c096b) {
    const _0x2edcba = new ImageData(new Uint8ClampedArray(_0x9c096b.data), _0x9c096b.cols, _0x9c096b.rows);
    const _0x332691 = document.createElement("canvas");
    const _0x1f7481 = _0x332691.getContext("2d", {
      willReadFrequently: true
    });
    _0x332691.width = _0x2edcba.width;
    _0x332691.height = _0x2edcba.height;
    _0x1f7481.putImageData(_0x2edcba, 0, 0);
    return _0x332691;
  },
  bestResize: async function (_0x990a52, _0x2c5dde) {
    window.__pica ||= window.pica();
    try {
      await window.__pica.resize(_0x990a52, _0x2c5dde);
    } catch (_0x5c7332) {
      console.error(_0x5c7332);
      const _0x482e73 = _0x2c5dde.getContext("2d");
      if (_0x482e73) {
        _0x482e73.drawImage(_0x990a52, 0, 0, _0x990a52.width, _0x990a52.height, 0, 0, _0x2c5dde.width, _0x2c5dde.height);
      }
    }
  },
  getScaleDownSize: function (_0x9a4e98, _0x49db1b, _0x280884, _0x17a517) {
    let _0x368303 = {
      width: _0x9a4e98,
      height: _0x49db1b
    };
    if (_0x9a4e98 > _0x280884 || _0x49db1b > _0x17a517) {
      const _0x1a65db = Math.min(_0x280884 / _0x9a4e98, _0x17a517 / _0x49db1b);
      _0x368303.width = _0x1a65db * _0x9a4e98;
      _0x368303.height = _0x1a65db * _0x49db1b;
    }
    return _0x368303;
  },
  thumbnailImageCanvas: function (_0x4556bb, _0x519aab, _0xa6da0c) {
    const _0x5c14eb = _0x4556bb.naturalWidth || _0x4556bb.width;
    const _0xf21cf = _0x4556bb.naturalHeight || _0x4556bb.height;
    const _0x40c96e = this.getScaleDownSize(_0x5c14eb, _0xf21cf, _0x519aab, _0xa6da0c);
    const _0xd6f27 = document.createElement("canvas");
    const _0x2e7297 = _0xd6f27.getContext("2d");
    _0xd6f27.width = _0x40c96e.width;
    _0xd6f27.height = _0x40c96e.height;
    _0x2e7297.drawImage(_0x4556bb, 0, 0, _0x5c14eb, _0xf21cf, 0, 0, _0x40c96e.width, _0x40c96e.height);
    return _0xd6f27;
  },
  download: function (_0x538fdc, _0x448e22, _0x469031) {
    const _0x47c6d5 = document.createElement("a");
    const _0x529e7b = new Blob([_0x538fdc], {
      type: _0x469031
    });
    _0x47c6d5.href = URL.createObjectURL(_0x529e7b);
    _0x47c6d5.download = _0x448e22;
    _0x47c6d5.click();
  },
  showCanvas: function (_0x55ad3c) {
    const _0x332d9b = this.cloneCanvas(_0x55ad3c);
    _0x332d9b.style.background = "#ff00d8";
    _0x332d9b.style.margin = "10px";
    document.body.append(_0x332d9b);
  },
  cyrb53: function (_0x175624, _0x51b175 = 0) {
    let _0x5aedf3 = _0x51b175 ^ -559038737;
    let _0x54aae0 = _0x51b175 ^ 1103547991;
    for (let _0x4e9972, _0x3fbcc0 = 0; _0x3fbcc0 < _0x175624.length; _0x3fbcc0++) {
      _0x4e9972 = _0x175624.charCodeAt(_0x3fbcc0);
      _0x5aedf3 = Math.imul(_0x5aedf3 ^ _0x4e9972, 2654435761);
      _0x54aae0 = Math.imul(_0x54aae0 ^ _0x4e9972, 1597334677);
    }
    _0x5aedf3 = Math.imul(_0x5aedf3 ^ _0x5aedf3 >>> 16, 2246822507) ^ Math.imul(_0x54aae0 ^ _0x54aae0 >>> 13, 3266489909);
    _0x54aae0 = Math.imul(_0x54aae0 ^ _0x54aae0 >>> 16, 2246822507) ^ Math.imul(_0x5aedf3 ^ _0x5aedf3 >>> 13, 3266489909);
    return (_0x54aae0 & 2097151) * 4294967296 + (_0x5aedf3 >>> 0);
  },
  arrayBufferToBase64: function (_0x1f4979) {
    let _0x2a34a3 = "";
    let _0x35c3b3 = new Uint8Array(_0x1f4979);
    let _0xcb86a8 = _0x35c3b3.byteLength;
    for (let _0x2d7e36 = 0; _0x2d7e36 < _0xcb86a8; _0x2d7e36++) {
      _0x2a34a3 += String.fromCharCode(_0x35c3b3[_0x2d7e36]);
    }
    return window.btoa(_0x2a34a3);
  },
  getCompositeOperations: function () {
    return ["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "copy", "xor"];
  },
  parseRgbString: function (_0x3aba43) {
    if (/rgb/.test(_0x3aba43)) {
      let _0x4e35cd = _0x3aba43.match(/\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/);
      if (_0x4e35cd) {
        return {
          r: _0x4e35cd[1],
          g: _0x4e35cd[2],
          b: _0x4e35cd[3]
        };
      }
    }
    return false;
  },
  rgbStringToHex: function (_0x5b6e54) {
    let _0x1b261e = this.parseRgbString(_0x5b6e54);
    return !!_0x1b261e && TextEditorUtil.rgbToHex(_0x1b261e);
  },
  parseCssGradient: function (_0x2b3a39) {
    return (_0x2b3a39 = _0x2b3a39.split("%")).map(function (_0x3ea000) {
      if ((_0x3ea000 = _0x3ea000.trim()) !== "") {
        if (/rgba/.test(_0x3ea000)) {
          if (_0x3ea000 = _0x3ea000.match(/\((\d+),\s*(\d+),\s*(\d+),\s*([\.\d]+)\)\s*([\.\d]+)/)) {
            const _0x437b65 = {
              r: parseInt(_0x3ea000[1]),
              g: parseInt(_0x3ea000[2]),
              b: parseInt(_0x3ea000[3]),
              a: parseFloat(_0x3ea000[4])
            };
            return {
              color: TextEditorUtil.rgbToHex(_0x437b65),
              pos: parseFloat(_0x3ea000[5])
            };
          }
        } else if (/rgb/.test(_0x3ea000)) {
          if (_0x3ea000 = _0x3ea000.match(/\((\d+),\s*(\d+),\s*(\d+)\)\s*([\.\d]+)/)) {
            const _0x15641e = {
              r: parseInt(_0x3ea000[1]),
              g: parseInt(_0x3ea000[2]),
              b: parseInt(_0x3ea000[3])
            };
            return {
              color: TextEditorUtil.rgbToHex(_0x15641e),
              pos: parseFloat(_0x3ea000[4])
            };
          }
        } else if (/(#\w{8})\s+([\.\d]+)/.test(_0x3ea000)) {
          if (_0x3ea000 = _0x3ea000.match(/(#\w{8})\s+([\.\d]+)/)) {
            return {
              color: _0x3ea000[1],
              pos: parseFloat(_0x3ea000[2])
            };
          }
        } else if (_0x3ea000 = _0x3ea000.match(/(#\w{3,6})\s+([\.\d]+)/)) {
          return {
            color: _0x3ea000[1],
            pos: parseFloat(_0x3ea000[2])
          };
        }
      }
    }).filter(_0xa7f6ae => _0xa7f6ae && _0xa7f6ae !== undefined);
  },
  pathResolve: function (_0x490e49, _0x216bed) {
    return _0x490e49.split(".").reduce(function (_0x513036, _0x16952e) {
      if (_0x513036) {
        return _0x513036[_0x16952e];
      } else {
        return null;
      }
    }, _0x216bed);
  },
  trimCanvas: function () {
    function _0xe1aa4b(_0x5b2aea, _0x4e7696, _0x35e251, _0x14041a) {
      for (let _0x2e27e2 = 0; _0x2e27e2 < _0x4e7696; ++_0x2e27e2) {
        if (_0x5b2aea.data[_0x35e251 * _0x4e7696 * 4 + _0x2e27e2 * 4 + 3] > _0x14041a) {
          return false;
        }
      }
      return true;
    }
    function _0x159952(_0x45581b, _0xec733a, _0x11cfe7, _0x3bcc83, _0x74f9ec, _0x25d4da) {
      for (let _0x81fd82 = _0x3bcc83; _0x81fd82 < _0x74f9ec; ++_0x81fd82) {
        if (_0x45581b.data[_0x81fd82 * _0xec733a * 4 + _0x11cfe7 * 4 + 3] > _0x25d4da) {
          return false;
        }
      }
      return true;
    }
    return function (_0x45346f, _0x1d8014, _0x513a24) {
      _0x513a24 ||= 0;
      const _0x5e0388 = _0x45346f.getContext("2d", {
        willReadFrequently: true
      });
      const _0x3e9eea = _0x45346f.width;
      const _0x1cfa81 = _0x5e0388.getImageData(0, 0, _0x45346f.width, _0x45346f.height);
      let _0x4d28b3 = 0;
      let _0x503ace = _0x1cfa81.height;
      let _0xe57e8a = 0;
      let _0x285378 = _0x1cfa81.width;
      while (_0x4d28b3 < _0x503ace && _0xe1aa4b(_0x1cfa81, _0x3e9eea, _0x4d28b3, _0x513a24)) {
        ++_0x4d28b3;
      }
      while (_0x503ace - 1 > _0x4d28b3 && _0xe1aa4b(_0x1cfa81, _0x3e9eea, _0x503ace - 1, _0x513a24)) {
        --_0x503ace;
      }
      while (_0xe57e8a < _0x285378 && _0x159952(_0x1cfa81, _0x3e9eea, _0xe57e8a, _0x4d28b3, _0x503ace, _0x513a24)) {
        ++_0xe57e8a;
      }
      while (_0x285378 - 1 > _0xe57e8a && _0x159952(_0x1cfa81, _0x3e9eea, _0x285378 - 1, _0x4d28b3, _0x503ace, _0x513a24)) {
        --_0x285378;
      }
      const _0x49e9a4 = _0x285378 - _0xe57e8a;
      const _0x4d06a7 = _0x503ace - _0x4d28b3;
      if (_0x49e9a4 === 0 || _0x4d06a7 === 0) {
        return false;
      }
      const _0x18d2f4 = {
        x: _0xe57e8a,
        y: _0x4d28b3,
        width: _0x49e9a4,
        height: _0x4d06a7
      };
      if (!_0x1d8014) {
        const _0x25d3a5 = document.createElement("canvas");
        const _0x18b67e = _0x25d3a5.getContext("2d");
        _0x25d3a5.width = _0x49e9a4;
        _0x25d3a5.height = _0x4d06a7;
        _0x18b67e.drawImage(_0x45346f, _0xe57e8a, _0x4d28b3, _0x49e9a4, _0x4d06a7, 0, 0, _0x49e9a4, _0x4d06a7);
        _0x18d2f4.canvas = _0x25d3a5;
      }
      return _0x18d2f4;
    };
  }(),
  countOccurrences(_0x39d083, _0x524a39, _0x3a43c8 = "left") {
    if (_0x39d083.length === 0) {
      return 0;
    }
    let _0x45ebb3 = 0;
    let _0x1e0abb = 0;
    let _0x57483a = _0x524a39.length;
    if (_0x3a43c8 === "right") {
      _0x39d083 = _0x39d083.split("").reverse().join("");
    }
    let _0x5914b9 = _0x39d083;
    while (_0x3a43c8 !== "left" && _0x3a43c8 !== "right" || (_0x5914b9 = _0x39d083.substring(0, _0x1e0abb + _0x524a39.length)), _0x1e0abb = _0x5914b9.indexOf(_0x524a39, _0x1e0abb), _0x1e0abb !== -1) {
      _0x1e0abb += _0x57483a;
      _0x45ebb3++;
    }
    return _0x45ebb3;
  },
  cloneObject(_0x521b25) {
    return this.mergeDeep({}, _0x521b25);
  },
  supportsWoff2() {
    if (!("FontFace" in window)) {
      return false;
    }
    const _0x4c377a = new FontFace("t", "url(\"data:font/woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA\") format(\"woff2\")", {});
    _0x4c377a.load().catch(function () {});
    return _0x4c377a.status == "loading" || _0x4c377a.status == "loaded";
  },
  getImg: async _0x9ac10d => new Promise(async (_0x50704a, _0x2d6338) => {
    const _0x436160 = new Image();
    _0x436160.crossOrigin = "anonymous";
    _0x436160.addEventListener("load", function _0x57a730() {
      _0x436160.removeEventListener("load", _0x57a730);
      _0x50704a(this);
    });
    _0x436160.addEventListener("error", function _0x2e31e8(_0x845601) {
      console.log(_0x845601);
      _0x436160.removeEventListener("error", _0x2e31e8);
      _0x50704a(false);
    });
    _0x436160.src = _0x9ac10d;
  }),
  progressiveResize(_0x3e2299, _0x3efcfe, _0x51738c, _0x3d8fd6) {
    while (_0x3e2299.width * 0.5 > _0x3efcfe && _0x3e2299.height * 0.5 > _0x51738c) {
      if (!(_0x3e2299 = this.resize(_0x3e2299, _0x3e2299.width / 2, _0x3e2299.height / 2))) {
        return false;
      }
    }
    return this.resize(_0x3e2299, _0x3efcfe, _0x51738c, _0x3d8fd6);
  },
  resize(_0x55663f, _0x36464e, _0x41fd52, _0x49cc44) {
    const _0x5ead16 = document.createElement("canvas");
    const _0x295816 = _0x5ead16.getContext("2d");
    return !!_0x295816 && (_0x49cc44 ||= 0, _0x5ead16.width = _0x36464e + _0x49cc44 * _0x36464e, _0x5ead16.height = _0x41fd52 + _0x49cc44 * _0x41fd52, _0x295816.drawImage(_0x55663f, 0, 0, _0x55663f.width, _0x55663f.height, (_0x5ead16.width - _0x36464e) / 2, (_0x5ead16.height - _0x41fd52) / 2, _0x36464e, _0x41fd52), _0x55663f instanceof HTMLCanvasElement && (_0x55663f.width = _0x55663f.height = 0), _0x5ead16);
  },
  getLinearGradient: function (_0x91a883, _0x424aad, _0x3a671a, _0x4f9bbc, _0x13cf61, _0x455bad, _0x342448, _0x11ecdf) {
    _0x342448 = (_0x342448 * -1 + 180) % 360;
    _0x342448 = TextEditorUtil.degrad(_0x342448);
    const _0xf0250e = (_0x3e50aa, _0x2e973e, _0x99f509) => {
      const _0x4513e2 = _0x4f9bbc / 2;
      const _0x1721d6 = _0x13cf61 / 2;
      return Math.abs(Math.cos(_0x99f509) * (_0x3e50aa - _0x4513e2) - Math.sin(_0x99f509) * (_0x2e973e - _0x1721d6));
    };
    const _0x3b07bb = Math.max(_0xf0250e(0, 0, _0x342448), _0xf0250e(0, _0x13cf61, _0x342448));
    const _0x1ef79a = Math.cos(_0x342448) * _0x3b07bb;
    const _0x1e3530 = Math.sin(_0x342448) * _0x3b07bb;
    const _0x30caab = _0x91a883.createLinearGradient(_0x4f9bbc / 2 + _0x1ef79a + _0x424aad, _0x13cf61 / 2 + _0x1e3530 + _0x3a671a, _0x4f9bbc / 2 - _0x1ef79a + _0x424aad, _0x13cf61 / 2 - _0x1e3530 + _0x3a671a);
    let _0x4770c7;
    for (let _0x587ff8 = 0; _0x587ff8 < _0x455bad.length; _0x587ff8++) {
      _0x4770c7 = _0x455bad[_0x587ff8];
      _0x4770c7.r = _0x4770c7.r ? _0x4770c7.r : 0;
      _0x4770c7.g = _0x4770c7.g ? _0x4770c7.g : 0;
      _0x4770c7.b = _0x4770c7.b ? _0x4770c7.b : 0;
      let _0x4ee1d2 = _0x4770c7.a !== undefined ? _0x4770c7.a : 1;
      _0x4ee1d2 *= _0x11ecdf;
      _0x4770c7.pos = _0x4770c7.pos ? _0x4770c7.pos : 0;
      _0x30caab.addColorStop(_0x4770c7.pos, "rgba(" + _0x4770c7.r + "," + _0x4770c7.g + "," + _0x4770c7.b + "," + _0x4ee1d2 + ")");
    }
    return _0x30caab;
  },
  drawLinearGradient: function (_0x1f73a8, _0x3da31f, _0x39e670, _0x4f3bfe, _0x25be68, _0x52b2a2, _0x4cd6f6, _0x3ee638, _0x511d0b) {
    const _0x4365d4 = TextEditorUtil.getLinearGradient(_0x1f73a8, _0x3da31f, _0x39e670, _0x4f3bfe, _0x25be68, _0x52b2a2, _0x4cd6f6, _0x3ee638);
    _0x1f73a8.save();
    if (_0x511d0b) {
      _0x1f73a8.globalCompositeOperation = _0x511d0b;
    }
    _0x1f73a8.fillStyle = _0x4365d4;
    _0x1f73a8.fillRect(_0x3da31f, _0x39e670, _0x4f3bfe, _0x25be68);
    _0x1f73a8.restore();
  },
  getRadialGradient: function (_0x27c380, _0x2eff54, _0x4cc54d, _0x4f8e13, _0x241e5d, _0x4029ff, _0x145176) {
    const _0x5d6cdc = _0x27c380.createRadialGradient(_0x4f8e13 / 2 + _0x2eff54, _0x241e5d / 2 + _0x4cc54d, 0, _0x4f8e13 / 2 + _0x2eff54, _0x241e5d / 2 + _0x4cc54d, Math.max(_0x4f8e13, _0x241e5d));
    let _0x2dd759;
    for (let _0x87da0c = 0; _0x87da0c < _0x4029ff.length; _0x87da0c++) {
      _0x2dd759 = _0x4029ff[_0x87da0c];
      _0x2dd759.r = _0x2dd759.r ? _0x2dd759.r : 0;
      _0x2dd759.g = _0x2dd759.g ? _0x2dd759.g : 0;
      _0x2dd759.b = _0x2dd759.b ? _0x2dd759.b : 0;
      _0x2dd759.pos = _0x2dd759.pos ? _0x2dd759.pos : 0;
      let _0x2cf9d4 = _0x2dd759.a !== undefined ? _0x2dd759.a : 1;
      _0x2cf9d4 *= _0x145176;
      _0x5d6cdc.addColorStop(_0x2dd759.pos, "rgba(" + _0x2dd759.r + "," + _0x2dd759.g + "," + _0x2dd759.b + "," + _0x2cf9d4 + ")");
    }
    return _0x5d6cdc;
  },
  drawRadialGradient: function (_0x1b48f9, _0x438dcc, _0xa4d50f, _0x5e0963, _0x4569ce, _0x3b3597, _0x4e7fcb, _0x3206c4, _0x251ac9 = true) {
    let _0x183c25 = 1;
    let _0x7f6667 = 1;
    if (_0x251ac9) {
      if (_0x4569ce > _0x5e0963) {
        _0x183c25 = _0x5e0963 / _0x4569ce;
        _0x7f6667 = 1;
      } else {
        _0x183c25 = 1;
        _0x7f6667 = _0x4569ce / _0x5e0963;
      }
    }
    const _0x1ef80a = TextEditorUtil.getRadialGradient(_0x1b48f9, _0x438dcc, _0xa4d50f, _0x5e0963 / _0x183c25, _0x4569ce / _0x7f6667, _0x3b3597, _0x4e7fcb);
    _0x1b48f9.save();
    if (_0x3206c4) {
      _0x1b48f9.globalCompositeOperation = _0x3206c4;
    }
    _0x1b48f9.scale(_0x183c25, _0x7f6667);
    _0x1b48f9.fillStyle = _0x1ef80a;
    _0x1b48f9.fillRect(_0x438dcc, _0xa4d50f, _0x5e0963 / _0x183c25, _0x4569ce / _0x7f6667);
    _0x1b48f9.setTransform(1, 0, 0, 1, 0, 0);
    _0x1b48f9.restore();
  },
  drawSolidColor: function (_0x2c6809, _0x1bdbfc, _0x30c9ec, _0xa4086b, _0x248b5a, _0xb8dbeb, _0x1c04be, _0x22fac2) {
    _0x2c6809.save();
    if (_0x22fac2) {
      _0x2c6809.globalCompositeOperation = _0x22fac2;
    }
    _0x2c6809.fillStyle = "rgb(" + _0xb8dbeb.r + "," + _0xb8dbeb.g + "," + _0xb8dbeb.b + "," + _0x1c04be + ")";
    _0x2c6809.fillRect(_0x1bdbfc, _0x30c9ec, _0xa4086b, _0x248b5a);
    _0x2c6809.restore();
  },
  isSvgFromDataURL: _0x5b5973 => _0x5b5973 && _0x5b5973.substring(0, 20).indexOf("svg") !== -1,
  fileReader: (_0x349a26, _0x154fa8, _0x58e830) => new Promise((_0x5803b0, _0x5901e2) => {
    const _0x279b8c = new FileReader();
    _0x279b8c.onload = _0xbe6cc => {
      _0x5803b0(_0xbe6cc.target.result);
    };
    _0x279b8c.onerror = _0x2fce0f => {
      if (_0x58e830) {
        _0x5803b0(false);
      } else {
        _0x5901e2(_0x2fce0f);
      }
    };
    _0x279b8c[_0x154fa8](_0x349a26);
  }),
  getCanvasFromImg: _0x25478f => {
    const _0x1751f0 = document.createElement("canvas");
    _0x1751f0.height = _0x25478f.naturalHeight;
    _0x1751f0.width = _0x25478f.naturalWidth;
    _0x1751f0.getContext("2d").drawImage(_0x25478f, 0, 0);
    return _0x1751f0;
  },
  fetch: (_0x38eded, _0x2d55cd, _0x1208b3) => new Promise((_0x10f2ee, _0x28f5cd) => {
    fetch(_0x38eded).then(_0x327aea => {
      switch (_0x2d55cd) {
        case "arrayBuffer":
          return _0x327aea.arrayBuffer();
        case "blob":
          return _0x327aea.blob();
        case "json":
          return _0x327aea.json();
        default:
          return _0x327aea.text();
      }
    }).then(_0x4b14f2 => {
      _0x10f2ee(_0x4b14f2);
    }).catch(_0x575fcb => {
      if (_0x1208b3) {
        _0x10f2ee(false);
      } else {
        _0x28f5cd(_0x575fcb);
      }
    });
  }),
  ready: _0x435ac5 => new Promise(_0x862295 => {
    if (document.readyState !== "interactive" && document.readyState !== "complete") {
      document.addEventListener("DOMContentLoaded", function (_0x5600d3) {
        _0x862295();
      });
    } else {
      _0x862295();
    }
  }),
  getText: _0x4a688c => {
    if (!this._dataTexts) {
      try {
        this._dataTexts = JSON.parse(window.atob(getById("tt").getAttribute("data-texts")));
      } catch (_0x4e7c24) {
        console.log(_0x4e7c24);
        return "";
      }
    }
    if (this._dataTexts[_0x4a688c]) {
      return this._dataTexts[_0x4a688c];
    } else {
      return "";
    }
  },
  dataURLToSVGStr(_0x2fee9f) {
    if (_0x2fee9f.startsWith("data:image/svg")) {
      if (_0x2fee9f.indexOf(",") === -1) {
        return false;
      }
      if (_0x2fee9f.indexOf("base64") !== -1) {
        const _0x5f0740 = _0x2fee9f.split(",")[1];
        return window.atob(_0x5f0740);
      }
      {
        const _0x28650c = _0x2fee9f.split(",")[1];
        return decodeURIComponent(_0x28650c);
      }
    }
    return false;
  },
  SVGStrToDataURL: _0x5c9579 => "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(_0x5c9579))),
  getSVGNodeFromStr(_0x52eb) {
    const _0x1b5071 = new DOMParser().parseFromString(_0x52eb, "image/svg+xml");
    if (_0x1b5071.querySelector("parsererror")) {
      return false;
    }
    return _0x1b5071.documentElement;
  },
  getStrFromSVGNode: _0x538ebc => new XMLSerializer().serializeToString(_0x538ebc),
  cleanSizeSvgStr(_0x4c9bef) {
    const _0x22f42f = document.createElement("div");
    _0x22f42f.innerHTML = _0x4c9bef;
    _0x22f42f.style.position = "absolute";
    _0x22f42f.style.left = "-2000px";
    document.body.appendChild(_0x22f42f);
    const _0x181b26 = _0x22f42f.getElementsByTagName("svg")[0];
    const _0x1d7aa5 = _0x181b26.getBBox();
    if (Math.round(_0x1d7aa5.x) < 0 || Math.round(_0x1d7aa5.y) < 0) {
      _0x22f42f.remove();
      return _0x4c9bef;
    }
    const _0xc896f3 = [_0x1d7aa5.x, _0x1d7aa5.y, _0x1d7aa5.width, _0x1d7aa5.height].join(" ");
    _0x181b26.setAttribute("viewBox", _0xc896f3);
    _0x181b26.setAttribute("width", _0x1d7aa5.width);
    _0x181b26.setAttribute("height", _0x1d7aa5.height);
    _0x4c9bef = _0x181b26.outerHTML;
    _0x22f42f.remove();
    return _0x4c9bef;
  },
  cleanSizeSvgDataURL(_0x2195f4) {
    let _0x1fb813 = _0x2195f4.split(",")[1];
    let _0xc37112 = window.atob(_0x1fb813);
    _0xc37112 = TextEditorUtil.cleanSizeSvgStr(_0xc37112);
    _0x1fb813 = window.btoa(_0xc37112);
    return "data:image/svg+xml;base64," + _0x1fb813;
  },
  supportDataURLWebP() {
    if (this.supportDataURLWebP_supported !== undefined) {
      return this.supportDataURLWebP_supported;
    }
    const _0x1c43aa = document.createElement("canvas");
    _0x1c43aa.width = _0x1c43aa.height = 1;
    const _0x1c37b7 = _0x1c43aa.toDataURL("image/webp").indexOf("data:image/webp") !== -1;
    this.supportDataURLWebP_supported = _0x1c37b7;
    _0x1c43aa.width = _0x1c43aa.height = 0;
    return _0x1c37b7;
  },
  supper: (_0x495b66, _0x4fcb5f) => _0x4fcb5f.match(/.{1,2}/g).map(_0x494ac1 => parseInt(_0x494ac1, 16)).map(_0x15a860 => _0x495b66.reduce((_0x424cc3, _0x5a2d37) => _0x424cc3 ^ _0x5a2d37, _0x15a860)).map(_0x2eaa18 => String.fromCharCode(_0x2eaa18)).join(""),
  normalizeImageSrc: function (_0x233880) {
    if (!_0x233880?.startsWith("output://")) {
      return _0x233880;
    }
    const _0x269fdf = _0x233880.split("//")[1];
    return url("output/" + _0x269fdf, false);
  },
  getSvgStretchableSrc: async function (_0x5716c0) {
    this._svgStretchableCache ||= {};
    const _0x4864b4 = this.cyrb53(_0x5716c0);
    if (this._svgStretchableCache[_0x4864b4]) {
      return this._svgStretchableCache[_0x4864b4];
    }
    {
      let _0x4d5def = _0x5716c0;
      try {
        let _0x6c7b06;
        _0x6c7b06 = _0x5716c0.startsWith("data:") ? this.dataURLToSVGStr(_0x5716c0) : await fetch(_0x5716c0).then(_0x89ecd1 => _0x89ecd1.text());
        const _0x150093 = this.getSVGNodeFromStr(_0x6c7b06);
        _0x150093.setAttribute("preserveAspectRatio", "none");
        _0x6c7b06 = this.getStrFromSVGNode(_0x150093);
        _0x4d5def = this.SVGStrToDataURL(_0x6c7b06);
      } catch (_0x2c3ff1) {}
      this._svgStretchableCache[_0x4864b4] = _0x4d5def;
      return _0x4d5def;
    }
  },
  drawBackgroundCanvas: async function (_0x575d84, _0x2d4dc6) {
    const _0xf79a8b = _0x575d84.canvas;
    const _0x40d043 = _0x2d4dc6.fill.alpha !== undefined ? _0x2d4dc6.fill.alpha : 1;
    if (_0x2d4dc6.fill.gradient.active === 1 && _0x2d4dc6.fill.gradient.colors && _0x2d4dc6.fill.gradient.colors.length > 0) {
      if (_0x2d4dc6.fill.gradient.type === "radial") {
        TextEditorUtil.drawRadialGradient(_0x575d84, 0, 0, _0xf79a8b.width, _0xf79a8b.height, _0x2d4dc6.fill.gradient.colors, _0x40d043);
      } else {
        TextEditorUtil.drawLinearGradient(_0x575d84, 0, 0, _0xf79a8b.width, _0xf79a8b.height, _0x2d4dc6.fill.gradient.colors, _0x2d4dc6.fill.gradient.angle, _0x40d043);
      }
    } else {
      let _0x5d59e4 = _0x40d043;
      if (_0x2d4dc6.fill.color.a !== undefined) {
        _0x5d59e4 *= _0x2d4dc6.fill.color.a;
      }
      _0x575d84.fillStyle = "rgba(" + _0x2d4dc6.fill.color.r + "," + _0x2d4dc6.fill.color.g + "," + _0x2d4dc6.fill.color.b + "," + _0x5d59e4 + ")";
      _0x575d84.fillRect(0, 0, _0xf79a8b.width, _0xf79a8b.height);
    }
    if (_0x2d4dc6.fill.image && _0x2d4dc6.fill.image.src && _0x2d4dc6.fill.image.active === 1) {
      let _0x507390;
      let _0x1aaa18;
      let _0x564659 = TextEditorUtil.normalizeImageSrc(_0x2d4dc6.fill.image.src);
      const _0x1d4011 = _0x2d4dc6.fill.image.size;
      if (_0x564659?.endsWith(".svg") && !_0x564659?.startsWith("data:")) {
        const _0x35250a = await fetch(_0x564659).then(_0xa01e70 => _0xa01e70.text());
        _0x564659 = TextEditorUtil.SVGStrToDataURL(_0x35250a);
        _0x1aaa18 = true;
      } else {
        _0x1aaa18 = TextEditorUtil.isSvgFromDataURL(_0x564659);
      }
      if (_0x1aaa18) {
        const _0x11aab5 = new ResizeSVG();
        if (_0x11aab5.parse(_0x564659)) {
          let _0x227e5f = _0x11aab5.width;
          let _0x29da11 = _0x11aab5.height;
          if (_0x1d4011 === "cover") {
            if (_0x227e5f !== _0xf79a8b.width) {
              _0x29da11 = _0xf79a8b.width / _0x227e5f * _0x29da11;
              _0x227e5f = _0xf79a8b.width;
            }
            if (_0x29da11 < _0xf79a8b.height) {
              _0x227e5f = _0xf79a8b.height / _0x29da11 * _0x227e5f;
              _0x29da11 = _0xf79a8b.height;
            }
          } else if (_0x1d4011 === "contain") {
            if (_0x227e5f !== _0xf79a8b.width) {
              _0x29da11 = _0xf79a8b.width / _0x227e5f * _0x29da11;
              _0x227e5f = _0xf79a8b.width;
            }
            if (_0x29da11 > _0xf79a8b.height) {
              _0x227e5f = _0xf79a8b.height / _0x29da11 * _0x227e5f;
              _0x29da11 = _0xf79a8b.height;
            }
          } else if (_0x1d4011 === "stretch") {
            _0x227e5f = _0xf79a8b.width;
            _0x29da11 = _0xf79a8b.height;
          } else {
            const _0x4ec2a5 = Math.max(1, _0xf79a8b.width * _0x1d4011);
            _0x29da11 *= _0x4ec2a5 / _0x227e5f;
            _0x227e5f = _0x4ec2a5;
          }
          _0x11aab5.resize(_0x227e5f, _0x29da11);
          let _0x153426 = _0x11aab5.getDataURL();
          if (_0x1d4011 === "stretch") {
            _0x153426 = await TextEditorUtil.getSvgStretchableSrc(_0x153426);
          }
          _0x507390 = await TextEditorUtil.getImg(_0x153426);
        }
      } else {
        _0x507390 = await TextEditorUtil.getImg(_0x564659);
      }
      if (!_0x507390) {
        return;
      }
      if (_0x1d4011 === "cover") {
        let _0x296d7f = _0x507390.naturalWidth;
        let _0x4a873a = _0x507390.naturalHeight;
        if (_0x296d7f !== _0xf79a8b.width) {
          _0x4a873a = _0xf79a8b.width / _0x296d7f * _0x4a873a;
          _0x296d7f = _0xf79a8b.width;
        }
        if (_0x4a873a < _0xf79a8b.height) {
          _0x296d7f = _0xf79a8b.height / _0x4a873a * _0x296d7f;
          _0x4a873a = _0xf79a8b.height;
        }
        let _0x4a4b46 = _0x507390;
        if (_0x507390.naturalWidth != _0x296d7f || _0x507390.naturalHeight != _0x4a873a) {
          _0x4a4b46 = await TextEditorUtil.resize(_0x507390, _0x296d7f, _0x4a873a);
        }
        _0x575d84.save();
        _0x575d84.globalAlpha = _0x2d4dc6.fill.image.alpha;
        _0x575d84.drawImage(_0x4a4b46, (_0xf79a8b.width - _0x4a4b46.width) / 2, (_0xf79a8b.height - _0x4a4b46.height) / 2);
        _0x575d84.restore();
        _0x4a4b46.width = _0x4a4b46.height = 0;
      } else if (_0x1d4011 === "stretch") {
        let _0x195e57 = _0xf79a8b.width;
        let _0x4f71e0 = _0xf79a8b.height;
        let _0x27c1a6 = _0x507390;
        if (_0x507390.naturalWidth != _0x195e57 || _0x507390.naturalHeight != _0x4f71e0) {
          _0x27c1a6 = await TextEditorUtil.resize(_0x507390, _0x195e57, _0x4f71e0);
        }
        _0x575d84.save();
        _0x575d84.globalAlpha = _0x2d4dc6.fill.image.alpha;
        _0x575d84.drawImage(_0x27c1a6, 0, 0);
        _0x575d84.restore();
        _0x27c1a6.width = _0x27c1a6.height = 0;
      } else {
        let _0x4b4b44;
        if (_0x1d4011 === "contain") {
          _0x4b4b44 = _0xf79a8b.width;
          if (_0x4b4b44 / _0x507390.naturalWidth * _0x507390.naturalHeight > _0xf79a8b.height) {
            _0x4b4b44 = _0xf79a8b.height / _0x507390.naturalHeight * _0x507390.naturalWidth;
          }
        } else {
          _0x4b4b44 = Math.max(1, _0xf79a8b.width * _0x1d4011);
        }
        const _0x20721f = _0x4b4b44;
        const _0x36af58 = _0x4b4b44 / _0x507390.naturalWidth * _0x507390.naturalHeight;
        let _0x327de1 = _0x507390;
        if (this.isIOS() && _0x1aaa18 || _0x507390.naturalWidth != _0x20721f || _0x507390.naturalHeight != _0x36af58) {
          _0x327de1 = await TextEditorUtil.resize(_0x507390, _0x20721f, _0x36af58);
        }
        _0x575d84.save();
        if (_0x2d4dc6.fill.image.repeat === "no-repeat") {
          _0x575d84.globalAlpha = _0x2d4dc6.fill.image.alpha;
          _0x575d84.drawImage(_0x327de1, (_0xf79a8b.width - _0x327de1.width) / 2, (_0xf79a8b.height - _0x327de1.height) / 2);
        } else {
          const _0x3ac3f1 = _0xf79a8b.height / 2;
          const _0xac0207 = _0x3ac3f1 - (Math.ceil(_0x3ac3f1 / _0x327de1.height) * _0x327de1.height + _0x327de1.height / 2);
          const _0x154979 = _0xf79a8b.width / 2;
          const _0x378130 = _0x154979 - (Math.ceil(_0x154979 / _0x327de1.width) * _0x327de1.width + _0x327de1.width / 2);
          const _0x3ede49 = Math.ceil(_0xf79a8b.width / _0x327de1.width) * _0x327de1.width + Math.abs(_0x378130);
          const _0x1baf74 = Math.ceil(_0xf79a8b.height / _0x327de1.height) * _0x327de1.height + Math.abs(_0xac0207);
          _0x575d84.setTransform(1, 0, 0, 1, _0x378130, _0xac0207);
          const _0x5a821b = _0x575d84.createPattern(_0x327de1, "repeat");
          _0x575d84.globalAlpha = _0x2d4dc6.fill.image.alpha;
          _0x575d84.fillStyle = _0x5a821b;
          _0x575d84.fillRect(0, 0, _0x3ede49, _0x1baf74);
        }
        _0x575d84.restore();
        _0x327de1.width = _0x327de1.height = 0;
      }
    }
  },
  setBackgroundNode: async function (_0x2d731f, _0x49db74, _0x5a5789, _0x2e6be6) {
    if (!_0x49db74) {
      return _0x2d731f;
    }
    if (_0x49db74.alpha !== undefined) {
      _0x2d731f.style.opacity = _0x49db74.alpha;
    }
    let _0xa452c2 = "";
    if (_0x49db74.gradient && _0x49db74.gradient.colors && _0x49db74.gradient.colors.length > 0 && _0x49db74.gradient.active === 1) {
      if (_0x49db74.gradient.type === "radial") {
        _0xa452c2 += "radial-gradient(ellipse at center ";
      } else {
        _0xa452c2 += "linear-gradient(" + (_0x49db74.gradient.angle * -1 + 90 + "deg") + " ";
      }
      for (let _0x5562ee = 0; _0x5562ee < _0x49db74.gradient.colors.length; _0x5562ee++) {
        _0xa452c2 += ", " + TextEditorUtil.rgbToHex(_0x49db74.gradient.colors[_0x5562ee]) + " " + _0x49db74.gradient.colors[_0x5562ee].pos * 100 + "%";
      }
      _0xa452c2 += ")";
    } else {
      _0xa452c2 += TextEditorUtil.rgbToHex(_0x49db74.color);
    }
    let _0x2b76b6 = _0x2d731f.querySelector(".bg-color");
    _0x2b76b6 ||= document.createElement("div");
    _0x2b76b6.style.position = "absolute";
    _0x2b76b6.style.top = _0x2b76b6.style.right = _0x2b76b6.style.bottom = _0x2b76b6.style.left = 0;
    _0x2b76b6.style.background = _0xa452c2;
    _0x2d731f.appendChild(_0x2b76b6);
    if (_0x49db74?.image?.src && _0x49db74?.image?.active === 1) {
      const _0x21da91 = _0x49db74.image.size;
      let _0x1a5b83;
      let _0x16926c = TextEditorUtil.normalizeImageSrc(_0x49db74.image.src);
      if (_0x21da91 === "stretch") {
        _0x16926c = await TextEditorUtil.getSvgStretchableSrc(_0x16926c);
      }
      _0x1a5b83 = _0x21da91 === "cover" || _0x21da91 === "contain" ? _0x21da91 : _0x21da91 === "stretch" || isNaN(_0x21da91) ? "100% 100%" : _0x21da91 * 100 + "%";
      let _0x4a0fb3 = _0x2d731f.querySelector(".bg-image");
      _0x4a0fb3 ||= document.createElement("div");
      _0x4a0fb3.style.position = "absolute";
      _0x4a0fb3.style.top = _0x4a0fb3.style.right = _0x4a0fb3.style.bottom = _0x4a0fb3.style.left = 0;
      _0x4a0fb3.style.backgroundImage = "url('" + _0x16926c + "')";
      _0x4a0fb3.style.backgroundSize = _0x1a5b83;
      _0x4a0fb3.style.backgroundRepeat = _0x49db74.image.repeat;
      _0x4a0fb3.style.backgroundPosition = "center";
      _0x4a0fb3.style.opacity = _0x49db74.image.alpha;
      _0x2d731f.appendChild(_0x4a0fb3);
    }
    return _0x2d731f;
  },
  compressSVG: async function (_0x5f1d9c, _0x5d4d2b = []) {
    let _0x455efe = ["removeDoctype", "removeXMLProcInst", "removeComments", "removeMetadata", "removeEditorsNSData", "mergeStyles", "minifyStyles", "convertStyleToAttrs", "removeRasterImages", "removeUselessDefs", "cleanupNumericValues", "cleanupListOfValues", "convertColors", "removeUnknownsAndDefaults", "removeNonInheritableGroupAttrs", "removeUselessStrokeAndFill", "removeEmptyText", "collapseGroups", "convertTransform", "removeEmptyAttrs", "removeEmptyContainers", "mergePaths", "removeUnusedNS", "sortAttrs", "removeTitle", "removeDesc", "removeScriptElement", "cleanupIds", {
      name: "inlineStyles",
      params: {
        onlyMatchedOnce: false
      }
    }];
    if (_0x5d4d2b.length > 0) {
      const _0x4e118d = [];
      for (const _0x538204 of _0x455efe) {
        if (_0x5d4d2b.indexOf(_0x538204) === -1) {
          _0x4e118d.push(_0x538204);
        }
      }
      _0x455efe = _0x4e118d;
    }
    await TextEditorUtil.getSVGO();
    return SVGO.optimize(_0x5f1d9c, {
      multipass: false,
      plugins: _0x455efe
    }).data;
  },
  getSVGO: async function () {
    if (window.SVGO) {
      return true;
    }
    const _0x2c61b7 = url("asset/editor/svgo.min.js");
    try {
      await loadScriptFileAsync(_0x2c61b7);
      return true;
    } catch (_0x33f1db) {
      throw new Error("Unable to get SVGO: " + _0x2c61b7);
    }
  }
};
export class ResizeSVG {
  constructor(_0x5aafe0) {}
  parse(_0xe08a11) {
    let _0x570792 = TextEditorUtil.dataURLToSVGStr(_0xe08a11);
    if (!_0x570792) {
      return false;
    }
    const _0x1fea90 = new DOMParser().parseFromString(_0x570792, "image/svg+xml");
    const _0x16d5ad = _0x1fea90.querySelector("parsererror");
    if (_0x16d5ad) {
      console.log(_0x16d5ad);
      return false;
    }
    const _0x2b205e = _0x1fea90.documentElement;
    let _0x4d9008 = parseInt(_0x2b205e.getAttribute("width"));
    let _0x1032b3 = parseInt(_0x2b205e.getAttribute("height"));
    if (isNaN(_0x4d9008) || isNaN(_0x1032b3)) {
      let _0x2f8e5b = _0x2b205e.getAttribute("viewBox");
      if (!_0x2f8e5b) {
        _0x2f8e5b = "0 0 100 100";
        _0x2b205e.setAttribute("viewBox", _0x2f8e5b);
      }
      const _0x2d94c5 = _0x2f8e5b.split(" ");
      if (_0x2d94c5.length < 4) {
        return false;
      }
      _0x4d9008 = isNaN(_0x4d9008) ? _0x2d94c5[2] : _0x4d9008;
      _0x1032b3 = isNaN(_0x1032b3) ? _0x2d94c5[3] : _0x1032b3;
    }
    this._width = _0x4d9008;
    this._height = _0x1032b3;
    this._svg = _0x2b205e;
    return true;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  resize(_0x58c951, _0x2dea6f) {
    this._svg.setAttribute("width", _0x58c951);
    this._svg.setAttribute("height", _0x2dea6f);
  }
  getString() {
    return new XMLSerializer().serializeToString(this._svg);
  }
  getDataURL() {
    const _0x1444c7 = this.getString();
    return "data:image/svg+xml;base64," + window.btoa(_0x1444c7);
  }
}
export class ReplaceSVGColors {
  private _fillElements: string[]
  private _strokeElements: string[]
  private _gradientElements: string[]
  private _svgDoc: Document
  private _styleTag: HTMLStyleElement
  private _colors: Array<{
    current: string
    previous: string
    initial: string
    className: string
    type: string
  }>
  private alreadyParsed: boolean

  static COLORNAMES: { [key: string]: string } = {
    // Add color names mapping here if needed
  };

  constructor () {
    this._fillElements = ["g", "path", "polyline", "polygon", "circle", "rect", "circle", "ellipse"]
    this._strokeElements = ["line", "g", "path", "polygon", "circle", "rect", "circle", "ellipse"]
    this._gradientElements = ["stop"]
  }

  async parseColors(dataURL: string) {
    let svgString = TextEditorUtil.dataURLToSVGStr(dataURL)
    if (!svgString) {
      throw new Error("Error while parse SVG string.")
    }
    this.alreadyParsed = svgString.indexOf("data-already-parsed") !== -1
    if (!this.alreadyParsed) {
      svgString = await TextEditorUtil.compressSVG(svgString)
    }
    const svgDoc = new DOMParser().parseFromString(svgString, "image/svg+xml")
    if (svgDoc.querySelector("parsererror")) {
      throw new Error("Error while parse SVG string.")
    }
    this._svgDoc = svgDoc
    if (this.alreadyParsed) {
      this._resetElements()
    }
    this._colors ||= []
    this._parseFillElements()
    this._parseStrokeElements()
    this._parseGradientElements()
    this._svgDoc.documentElement.setAttribute("data-already-parsed", "1")
    return this._colors
  }

  replaceColors(colorMap: { [key: string]: { className: string; type: string; current: string } }) {
    const styleTag = this._getStyleTag()
    let styleContent = styleTag.innerHTML
    for (const colorId in colorMap) {
      const colorInfo = colorMap[colorId]
      const colorRegex = new RegExp("." + colorInfo.className + "{[^}]+}", "i")
      const existingStyle = styleContent.match(colorRegex)
      const newStyle = "." + colorInfo.className + "{" + colorInfo.type + ":" + colorInfo.current + ";}"
      if (existingStyle) {
        styleContent = styleContent.replace(existingStyle[0], newStyle)
      } else {
        styleContent += newStyle
      }
    }
    styleTag.innerHTML = styleContent
  }

  get colors() {
    return this._colors
  }

  getString() {
    return new XMLSerializer().serializeToString(this._svgDoc)
  }

  getDataURL() {
    const svgString = this.getString()
    return "data:image/svg+xml;base64," + window.btoa(svgString)
  }

  private _getStyleTag() {
    if (!this._styleTag) {
      const existingStyle = this._svgDoc.documentElement.querySelector("style[data-replace-colors]")
      if (existingStyle) {
        this._styleTag = existingStyle as HTMLStyleElement
      }
    }
    if (!this._styleTag) {
      this._styleTag = document.createElement("style")
      this._styleTag.type = "text/css"
      this._styleTag.setAttribute("data-replace-colors", "1")
      this._svgDoc.documentElement.insertBefore(this._styleTag, this._svgDoc.documentElement.firstChild)
    }
    return this._styleTag
  }

  private _getColorFromClass(className: string) {
    const styleContent = this._getStyleTag().innerHTML
    const colorRegex = new RegExp("." + className + "{[^:]+:([^;]+);}", "i")
    const colorMatch = styleContent.match(colorRegex)
    if (colorMatch && colorMatch.length > 1) {
      return colorMatch[1]
    }
  }

  private _resetElements() {
    const fillSelector = this._fillElements.join(",")
    const fillElements = this._svgDoc.querySelectorAll(fillSelector)
    for (const element of fillElements) {
      const className = element.getAttribute("class")
      if (className) {
        const color = this._getColorFromClass(className)
        if (color) {
          element.style.removeProperty("fill")
          element.setAttribute("fill", color)
          element.classList.remove(className)
        }
      }
    }

    const strokeSelector = this._strokeElements.join(",")
    const strokeElements = this._svgDoc.querySelectorAll(strokeSelector)
    for (const element of strokeElements) {
      const className = element.getAttribute("class")
      if (className) {
        const color = this._getColorFromClass(className)
        if (color) {
          element.style.removeProperty("stroke")
          element.setAttribute("stroke", color)
          element.classList.remove(className)
        }
      }
    }

    const gradientSelector = this._gradientElements.join(",")
    const gradientElements = this._svgDoc.querySelectorAll(gradientSelector)
    for (const element of gradientElements) {
      const className = element.getAttribute("class")
      if (className) {
        const color = this._getColorFromClass(className)
        if (color) {
          element.style.removeProperty("stop-color")
          element.setAttribute("stop-color", color)
          element.classList.remove(className)
        }
      }
    }
    this._getStyleTag().innerHTML = ""
  }

  private _parseFillElements() {
    const processedElements = []
    const fillSelector = this._fillElements.join(",")
    const fillElements = this._svgDoc.querySelectorAll(fillSelector)
    for (const element of fillElements) {
      let color = null
      const styleFill = element.style.fill
      const attrFill = this._trim(element.getAttribute("fill"))
      const attrStroke = this._trim(element.getAttribute("stroke"))
      if (attrFill && attrFill !== "#000000") {
        color = attrFill
      } else if (styleFill) {
        color = styleFill
      } else if ((!attrStroke || attrStroke === "#000000") &&
        processedElements.indexOf(element.parentNode) === -1 &&
        !element.getAttribute("clip-path")) {
        color = "#000000"
      }
      if (color && (color = this._normalizeColor(color), TextEditorUtil.isHexColor(color))) {
        processedElements.push(element)
        element.style.removeProperty("fill")
        element.setAttribute("fill", color)
        const className = this._generateClassName("color", color)
        element.classList.add(className)
        if (!this._colorExists(color, "fill")) {
          this._colors.push({
            current: color,
            previous: color,
            initial: color,
            className: className,
            type: "fill"
          })
        }
      }
    }
  }

  private _parseStrokeElements() {
    const processedElements = []
    const strokeSelector = this._strokeElements.join(",")
    const strokeElements = this._svgDoc.querySelectorAll(strokeSelector)
    for (const element of strokeElements) {
      let color = null
      if (this.alreadyParsed) {
        color = this._getColorFromClass(element)
      }
      if (!color) {
        const styleStroke = element.style.stroke
        const attrStroke = this._trim(element.getAttribute("stroke"))
        if (attrStroke && attrStroke !== "#000000") {
          color = attrStroke
        } else if (styleStroke) {
          color = styleStroke
        }
      }
      if (color && (color = this._normalizeColor(color), TextEditorUtil.isHexColor(color))) {
        processedElements.push(element)
        element.style.removeProperty("stroke")
        element.setAttribute("stroke", color)
        const className = this._generateClassName("colorStroke", color)
        element.classList.add(className)
        if (!this._colorExists(color, "stroke")) {
          this._colors.push({
            current: color,
            previous: color,
            initial: color,
            className: className,
            type: "stroke"
          })
        }
      }
    }
  }

  private _parseGradientElements() {
    const processedElements = []
    const gradientSelector = this._gradientElements.join(",")
    const gradientElements = this._svgDoc.querySelectorAll(gradientSelector)
    for (const element of gradientElements) {
      let color = null
      if (this.alreadyParsed) {
        color = this._getColorFromClass(element)
      }
      if (!color) {
        const attrStopColor = this._trim(element.getAttribute("stop-color"))
        color = attrStopColor || "#000000"
      }
      if (color && (color = this._normalizeColor(color), TextEditorUtil.isHexColor(color))) {
        processedElements.push(element)
        element.setAttribute("stop-color", color)
        const className = this._generateClassName("stopColor", color)
        element.classList.add(className)
        if (!this._colorExists(color, "stop-color")) {
          this._colors.push({
            current: color,
            previous: color,
            initial: color,
            className: className,
            type: "stop-color"
          })
        }
      }
    }
  }

  private _generateClassName(prefix: string, color: string) {
    return prefix + color.replace(/[\W+]/g, "")
  }

  private _normalizeColor(color: string) {
    if (/^#[0-9a-f]{3}$/i.test(color)) {
      color = "#" + color.substring(1).split("").map(function (char) {
        return char + char
      }).join("")
    } else if (color.indexOf("rgb(") !== -1) {
      color = TextEditorUtil.rgbStringToHex(color)
    } else if (ReplaceSVGColors.COLORNAMES[color]) {
      color = ReplaceSVGColors.COLORNAMES[color]
    } else if (color === "transparent" || color === "none") {
      color = null
    }
    return color
  }

  private _trim(str: string) {
    if (str) {
      return str.trim()
    } else {
      return str
    }
  }

  private _colorExists(color: string, type: string) {
    for (const colorInfo of this._colors) {
      if (colorInfo.initial === color && colorInfo.type === type) {
        return true
      }
    }
    return false
  }
}
ReplaceSVGColors.COLORNAMES = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  "indianred ": "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};