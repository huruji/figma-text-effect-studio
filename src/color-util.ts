export function rgbToHex(rgb: { r: number, g: number, b: number, a?: number }) {
  let hex = "#" + (16777216 + (rgb.r << 16 | rgb.g << 8 | rgb.b)).toString(16).slice(1);
  if (rgb.a !== undefined) {
    const a = Math.floor(rgb.a * 255);
    hex += (a < 16 ? "0" : "") + a.toString(16);
  }
  return hex;
}

export function isHexColor(hex:string) {
  return new RegExp("^#([0-9a-f]{6}|[0-9a-f]{3})$", "i").test(hex);
}

export function hexToRgb(hex:string) {
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
}

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function parseRgba(rgbaStr: string): RgbaColor | null {
  const match = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);

  if (!match) {
    return null;
  }

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] ? parseFloat(match[4]) : 1
  };
}

export function hsbToRgb(h, s, b) {
  s /= 100;
  b /= 100;
  let k = (n) => (n + h / 60) % 6;
  let f = (n) => b - b * s * Math.max(Math.min(k(n), 4 - k(n), 1), 0);
  return [
    Math.round(f(5) * 255),
    Math.round(f(3) * 255),
    Math.round(f(1) * 255)
  ];
}

export function hsbToHex(h, s, b) {
  const [r, g, b_] = hsbToRgb(h, s, b);
  return rgbToHex({r, g, b: b_});
}