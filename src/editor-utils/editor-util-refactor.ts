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
  hexToRgb(hex: string) {
    const hexArray = hex.substring(1).match(/.{1,2}/g)
    if (!hexArray) return null
    const rgb: { r: number, g: number, b: number, a?: number } = {
      r: parseInt(hexArray[0], 16),
      g: parseInt(hexArray[1], 16),
      b: parseInt(hexArray[2], 16)
    }
    if (hexArray.length === 4) {
      rgb.a = parseInt(hexArray[3], 16) / 255
    }
    Object.keys(rgb).map(function (item, index) {
      if (isNaN(rgb[item])) {
        rgb[item] = 0
      }
    })
    return rgb
  },
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  },
  removeAllHexOpaqueAlpha(hex: string) {
    return hex.replace(/(#\w{6})ff/gi, "$1")
  },
  isHexColor(hex: string) {
    return new RegExp("^#([0-9a-f]{6}|[0-9a-f]{3})$", "i").test(hex)
  },
  rgbToHex(rgb: { r: number, g: number, b: number, a?: number }) {
    let hex = "#" + (16777216 + (rgb.r << 16 | rgb.g << 8 | rgb.b)).toString(16).slice(1)
    if (rgb.a !== undefined) {
      const a = Math.floor(rgb.a * 255)
      hex += (a < 16 ? "0" : "") + a.toString(16)
    }
    return hex
  },
  degrad(deg: number) {
    return deg * Math.PI / 180
  },
  generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
      const random = Math.random() * 16 | 0
      return (char === "x" ? random : random & 3 | 8).toString(16)
    })
  },
  exponentialCurve(value: number, exponent = 100, base = 4) {
    const log = Math.log(value) / Math.log(base)
    return Array(value).fill(log).map((_, i) => _ / Math.pow(log, i))
  },
  mergeDeep(obj1: any, obj2: any) {
    const isObject = (value: any) => value && typeof value === "object" && !Array.isArray(value)
    if (isObject(obj1) && isObject(obj2)) {
      Object.keys(obj2).forEach(key => {
        if (isObject(obj2[key])) {
          if (!obj1[key]) obj1[key] = {}
          this.mergeDeep(obj1[key], obj2[key])
        } else {
          obj1[key] = obj2[key]
        }
      })
    }
    if (isObject(obj1) && isObject(obj2)) {
      for (const key in obj2) {
        if (isObject(obj2[key])) {
          if (!obj1[key]) obj1[key] = {}
          this.mergeDeep(obj1[key], obj2[key])
        } else {
          obj1[key] = obj2[key]
        }
      }
    }
    return obj1
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
  cloneCanvas(canvas: HTMLCanvasElement) {
    const newCanvas = document.createElement("canvas")
    const ctx = newCanvas.getContext("2d")
    newCanvas.width = canvas.width
    newCanvas.height = canvas.height
    ctx?.drawImage(canvas, 0, 0)
    return newCanvas
  },
  opencvToCanvas(imageData: ImageData) {
    const newImageData = new ImageData(new Uint8ClampedArray(imageData.data), imageData.cols, imageData.rows)
    const newCanvas = document.createElement("canvas")
    const ctx = newCanvas.getContext("2d", {
      willReadFrequently: true
    })
    newCanvas.width = newImageData.width
    newCanvas.height = newImageData.height
    ctx?.putImageData(newImageData, 0, 0)
    return newCanvas
  },
  async bestResize(from, to) {
    window.__pica ||= window.pica()
    try {
      await window.__pica.resize(from, to)
    } catch (error) {
      console.error(error)
      const ctx = to.getContext("2d")
      if (ctx) {
        ctx.drawImage(from, 0, 0, from.width, from.height, 0, 0, to.width, to.height)
      }
    }
  },
  showCanvas(canvas: HTMLCanvasElement) {
    const cloneCanvas = this.cloneCanvas(canvas)
    cloneCanvas.style.background = "#ff00d8"
    cloneCanvas.style.margin = "10px"
    document.body.append(cloneCanvas)
  },
  download(data: string, filename: string, type: string) {
    const link = document.createElement("a")
    const blob = new Blob([data], {
      type,
    })
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  },
  cyrb53(str: string, seed = 0) {
    let hash = seed ^ -559038737
    let hash2 = seed ^ 1103547991
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = Math.imul(hash ^ char, 2654435761)
      hash2 = Math.imul(hash2 ^ char, 1597334677)
    }
    hash = Math.imul(hash ^ hash >>> 16, 2246822507) ^ Math.imul(hash2 ^ hash2 >>> 13, 3266489909)
    hash2 = Math.imul(hash2 ^ hash2 >>> 16, 2246822507) ^ Math.imul(hash ^ hash >>> 13, 3266489909)
    return (hash2 & 2097151) * 4294967296 + (hash >>> 0)
  },
  arrayBufferToBase64(buffer: ArrayBuffer) {
    let str = ""
    const array = new Uint8Array(buffer)
    const length = array.byteLength
    for (let i = 0; i < length; i++) {
      str += String.fromCharCode(array[i])
    }
    return window.btoa(str)
  },
  parseRgbString(str: string) {
    if (/rgb/.test(str)) {
      const match = str.match(/\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/)
      if (match) {
        return {
          r: match[1],
          g: match[2],
          b: match[3]
        }
      }
    }
    return false
  },
  rgbStringToHex(str: string) {
    const rgb = TextEditorUtil.parseRgbString(str)
    return !!rgb && TextEditorUtil.rgbToHex(rgb)
  },
  pathResolve(path: string, key: string) {
    return path.split(".").reduce((acc, part) => acc && acc[part], key)
  },
  cloneObject(obj: any) {
    return this.mergeDeep({}, obj)
  },
  getImg: async (url: string) => new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.addEventListener("load", function loadCallback() {
      img.removeEventListener("load", loadCallback)
      resolve(img)
    })
    img.addEventListener("error", function errorCallback(_0x845601) {
      img.removeEventListener("error", errorCallback)
      resolve(false)
    })
    img.src = url
  }),
  isSvgFromDataURL: (dataURL: string) => dataURL && dataURL.substring(0, 20).indexOf("svg") !== -1,
  getCanvasFromImg: (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas")
    canvas.height = img.naturalHeight
    canvas.width = img.naturalWidth
    const ctx = canvas.getContext("2d")
    ctx?.drawImage(img, 0, 0)
    return canvas
  },
  dataURLToSVGStr(dataURL: string) {
    if (dataURL.startsWith("data:image/svg")) {
      if (dataURL.indexOf(",") === -1) {
        return false
      }
      if (dataURL.indexOf("base64") !== -1) {
        const base64 = dataURL.split(",")[1]
        return window.atob(base64)
      }
      {
        const svg = dataURL.split(",")[1]
        return decodeURIComponent(svg)
      }
    }
    return false
  },
  SVGStrToDataURL: (svgStr: string) => "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgStr))),
  getSVGNodeFromStr(svgStr: string) {
    const svgDoc = new DOMParser().parseFromString(svgStr, "image/svg+xml")
    if (svgDoc.querySelector("parsererror")) {
      return false
    }
    return svgDoc.documentElement
  },
  getStrFromSVGNode: (svgNode: SVGElement) => new XMLSerializer().serializeToString(svgNode),
  supportsWoff2() {
    if (!("FontFace" in window)) {
      return false
    }
    const fontFace = new FontFace("t", "url(\"data:font/woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA\") format(\"woff2\")", {})
    fontFace.load().catch(function () { })
    return fontFace.status === "loading" || fontFace.status === "loaded"
  },
  ready: (callback: () => void) => new Promise(resolve => {
    if (document.readyState !== "interactive" && document.readyState !== "complete") {
      document.addEventListener("DOMContentLoaded", function (event) {
        resolve(true)
      })
    } else {
      callback?.()
    }
  }),
  getScaleDownSize(originalWidth: number, originalHeight: number, maxWidth: number, maxHeight: number) {
    const size = {
      width: originalWidth,
      height: originalHeight
    }
    if (originalWidth > maxWidth || originalHeight > maxHeight) {
      const scale = Math.min(maxWidth / originalWidth, maxHeight / originalHeight)
      size.width = scale * originalWidth
      size.height = scale * originalHeight
    }
    return size
  },
  thumbnailImageCanvas(image: HTMLImageElement, maxWidth: number, maxHeight: number) {
    const naturalWidth = image.naturalWidth || image.width
    const naturalHeight = image.naturalHeight || image.height
    const size = this.getScaleDownSize(naturalWidth, naturalHeight, maxWidth, maxHeight)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = size.width
    canvas.height = size.height
    ctx?.drawImage(image, 0, 0, naturalWidth, naturalHeight, 0, 0, size.width, size.height)
    return canvas
  },
  getCompositeOperations() {
    return ["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "copy", "xor"]
  },
  parseCssGradient(gradientString) {
    return (gradientString = gradientString.split("%")).map(function (colorStop) {
      if ((colorStop = colorStop.trim()) !== "") {
        if (/rgba/.test(colorStop)) {
          if (colorStop = colorStop.match(/\((\d+),\s*(\d+),\s*(\d+),\s*([\.\d]+)\)\s*([\.\d]+)/)) {
            const rgbaColor = {
              r: parseInt(colorStop[1], 10),
              g: parseInt(colorStop[2], 10),
              b: parseInt(colorStop[3], 10),
              a: parseFloat(colorStop[4])
            }
            return {
              color: TextEditorUtil.rgbToHex(rgbaColor),
              pos: parseFloat(colorStop[5])
            }
          }
        } else if (/rgb/.test(colorStop)) {
          if (colorStop = colorStop.match(/\((\d+),\s*(\d+),\s*(\d+)\)\s*([\.\d]+)/)) {
            const rgbColor = {
              r: parseInt(colorStop[1], 10),
              g: parseInt(colorStop[2], 10),
              b: parseInt(colorStop[3], 10)
            }
            return {
              color: TextEditorUtil.rgbToHex(rgbColor),
              pos: parseFloat(colorStop[4])
            }
          }
        } else if (/(#\w{8})\s+([\.\d]+)/.test(colorStop)) {
          if (colorStop = colorStop.match(/(#\w{8})\s+([\.\d]+)/)) {
            return {
              color: colorStop[1],
              pos: parseFloat(colorStop[2])
            }
          }
        } else if (colorStop = colorStop.match(/(#\w{3,6})\s+([\.\d]+)/)) {
          return {
            color: colorStop[1],
            pos: parseFloat(colorStop[2])
          }
        }
      }
    }).filter(stop => stop && stop !== undefined)
  },

  trimCanvas: function () {
    function _0xe1aa4b(_0x5b2aea, _0x4e7696, _0x35e251, _0x14041a) {
      for (let _0x2e27e2 = 0; _0x2e27e2 < _0x4e7696; ++_0x2e27e2) {
        if (_0x5b2aea.data[_0x35e251 * _0x4e7696 * 4 + _0x2e27e2 * 4 + 3] > _0x14041a) {
          return false
        }
      }
      return true
    }
    function _0x159952(_0x45581b, _0xec733a, _0x11cfe7, _0x3bcc83, _0x74f9ec, _0x25d4da) {
      for (let _0x81fd82 = _0x3bcc83; _0x81fd82 < _0x74f9ec; ++_0x81fd82) {
        if (_0x45581b.data[_0x81fd82 * _0xec733a * 4 + _0x11cfe7 * 4 + 3] > _0x25d4da) {
          return false
        }
      }
      return true
    }
    return function (_0x45346f, _0x1d8014, _0x513a24) {
      _0x513a24 ||= 0
      const _0x5e0388 = _0x45346f.getContext("2d", {
        willReadFrequently: true
      })
      const _0x3e9eea = _0x45346f.width
      const _0x1cfa81 = _0x5e0388.getImageData(0, 0, _0x45346f.width, _0x45346f.height)
      let _0x4d28b3 = 0
      let _0x503ace = _0x1cfa81.height
      let _0xe57e8a = 0
      let _0x285378 = _0x1cfa81.width
      while (_0x4d28b3 < _0x503ace && _0xe1aa4b(_0x1cfa81, _0x3e9eea, _0x4d28b3, _0x513a24)) {
        ++_0x4d28b3
      }
      while (_0x503ace - 1 > _0x4d28b3 && _0xe1aa4b(_0x1cfa81, _0x3e9eea, _0x503ace - 1, _0x513a24)) {
        --_0x503ace
      }
      while (_0xe57e8a < _0x285378 && _0x159952(_0x1cfa81, _0x3e9eea, _0xe57e8a, _0x4d28b3, _0x503ace, _0x513a24)) {
        ++_0xe57e8a
      }
      while (_0x285378 - 1 > _0xe57e8a && _0x159952(_0x1cfa81, _0x3e9eea, _0x285378 - 1, _0x4d28b3, _0x503ace, _0x513a24)) {
        --_0x285378
      }
      const _0x49e9a4 = _0x285378 - _0xe57e8a
      const _0x4d06a7 = _0x503ace - _0x4d28b3
      if (_0x49e9a4 === 0 || _0x4d06a7 === 0) {
        return false
      }
      const _0x18d2f4 = {
        x: _0xe57e8a,
        y: _0x4d28b3,
        width: _0x49e9a4,
        height: _0x4d06a7
      }
      if (!_0x1d8014) {
        const _0x25d3a5 = document.createElement("canvas")
        const _0x18b67e = _0x25d3a5.getContext("2d")
        _0x25d3a5.width = _0x49e9a4
        _0x25d3a5.height = _0x4d06a7
        _0x18b67e.drawImage(_0x45346f, _0xe57e8a, _0x4d28b3, _0x49e9a4, _0x4d06a7, 0, 0, _0x49e9a4, _0x4d06a7)
        _0x18d2f4.canvas = _0x25d3a5
      }
      return _0x18d2f4
    }
  }(),
  /**
 * Counts the number of occurrences of a substring in a string.
 * @param text - The string to search in
 * @param searchString - The substring to search for
 * @param direction - The direction to search in ('left' or 'right')
 * @returns The number of occurrences
 */
  countOccurrences(
    text: string,
    searchString: string,
    direction: 'left' | 'right' = 'left'
  ): number {
    if (text.length === 0) {
      return 0
    }

    const searchLength = searchString.length
    let count = 0
    let position = 0

    // Reverse the text if searching from right
    const searchText = direction === 'right' ? text.split('').reverse().join('') : text

    while (true) {
      position = searchText.indexOf(searchString, position)
      if (position === -1) {
        break
      }
      position += searchLength
      count++
    }

    return count
  },


  /**
 * Progressively resizes an image by halving its dimensions until it's close to the target size,
 * then performs a final resize to the exact target dimensions.
 * @param image - The source image to resize (HTMLImageElement or HTMLCanvasElement)
 * @param targetWidth - The desired final width
 * @param targetHeight - The desired final height
 * @param padding - Optional padding factor for the final resize
 * @returns The resized canvas element or false if resize fails
 */
  progressiveResize(
    image: HTMLImageElement | HTMLCanvasElement,
    targetWidth: number,
    targetHeight: number,
    padding = 0
  ): HTMLCanvasElement | false {
    // Progressively halve the image size until it's close to target size
    while (image.width * 0.5 > targetWidth && image.height * 0.5 > targetHeight) {
      const resizedImage = this.resize(image, image.width / 2, image.height / 2)
      if (!resizedImage) {
        return false
      }
      image = resizedImage
    }

    // Final resize to exact target dimensions
    return this.resize(image, targetWidth, targetHeight, padding)
  },

  /**
 * Resizes an image to specified dimensions with optional padding.
 * @param image - The source image to resize (HTMLImageElement or HTMLCanvasElement)
 * @param targetWidth - The desired width of the output image
 * @param targetHeight - The desired height of the output image
 * @param padding - Optional padding factor (defaults to 0)
 * @returns A new canvas element containing the resized image, or null if context creation fails
 */
  resize(
    image: HTMLImageElement | HTMLCanvasElement,
    targetWidth: number,
    targetHeight: number,
    padding = 0
  ): HTMLCanvasElement | null {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return null
    }

    // Calculate dimensions with padding
    const paddedWidth = targetWidth + padding * targetWidth
    const paddedHeight = targetHeight + padding * targetHeight

    // Set canvas dimensions
    canvas.width = paddedWidth
    canvas.height = paddedHeight

    // Calculate centering offsets
    const offsetX = (paddedWidth - targetWidth) / 2
    const offsetY = (paddedHeight - targetHeight) / 2

    // Draw the resized image centered on the canvas
    ctx.drawImage(
      image,
      0, 0, image.width, image.height,  // Source rectangle
      offsetX, offsetY, targetWidth, targetHeight  // Destination rectangle
    )

    // Clear the source canvas if it's a canvas element
    if (image instanceof HTMLCanvasElement) {
      image.width = 0
      image.height = 0
    }

    return canvas
  },

  /**
 * Creates a linear gradient with specified parameters and color stops.
 * @param ctx - The canvas 2D context
 * @param offsetX - X offset for the gradient
 * @param offsetY - Y offset for the gradient
 * @param width - Width of the gradient area
 * @param height - Height of the gradient area
 * @param colorStops - Array of color stop objects with r,g,b,a,pos properties
 * @param angle - Angle of the gradient in degrees
 * @param opacity - Global opacity multiplier
 * @returns The created linear gradient
 */
  getLinearGradient(
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
    colorStops: Array<{ r?: number; g?: number; b?: number; a?: number; pos?: number }>,
    angle: number,
    opacity: number
  ): CanvasGradient {
    // Convert angle to radians and adjust direction
    angle = (angle * -1 + 180) % 360
    angle = TextEditorUtil.degrad(angle)

    // Helper function to calculate distance from center
    const calculateDistance = (x: number, y: number, angle: number): number => {
      const centerX = width / 2
      const centerY = height / 2
      return Math.abs(
        Math.cos(angle) * (x - centerX) - Math.sin(angle) * (y - centerY)
      )
    }

    // Calculate maximum distance for gradient bounds
    const maxDistance = Math.max(
      calculateDistance(0, 0, angle),
      calculateDistance(0, height, angle)
    )

    // Calculate gradient end points
    const offsetX1 = Math.cos(angle) * maxDistance
    const offsetY1 = Math.sin(angle) * maxDistance

    // Create the gradient
    const gradient = ctx.createLinearGradient(
      width / 2 + offsetX1 + offsetX,
      height / 2 + offsetY1 + offsetY,
      width / 2 - offsetX1 + offsetX,
      height / 2 - offsetY1 + offsetY
    )

    // Add color stops
    for (const stop of colorStops) {
      const r = stop.r ?? 0
      const g = stop.g ?? 0
      const b = stop.b ?? 0
      let a = stop.a !== undefined ? stop.a : 1
      a *= opacity
      const pos = stop.pos ?? 0

      gradient.addColorStop(pos, `rgba(${r},${g},${b},${a})`)
    }

    return gradient
  },

  /**
 * Draws a linear gradient on a canvas context.
 * @param ctx - The canvas 2D context
 * @param x - X position of the gradient
 * @param y - Y position of the gradient
 * @param width - Width of the gradient area
 * @param height - Height of the gradient area
 * @param colorStops - Array of color stop objects
 * @param angle - Angle of the gradient in degrees
 * @param opacity - Global opacity multiplier
 * @param compositeOperation - Optional composite operation mode
 */
  drawLinearGradient(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    colorStops: any[], // Using any[] since we don't know the exact type from TextEditorUtil
    angle: number,
    opacity: number,
    compositeOperation?: GlobalCompositeOperation
  ): void {
    // Get the gradient from TextEditorUtil
    const gradient = TextEditorUtil.getLinearGradient(
      ctx,
      x,
      y,
      width,
      height,
      colorStops,
      angle,
      opacity
    )

    // Save the current context state
    ctx.save()

    // Apply composite operation if specified
    if (compositeOperation) {
      ctx.globalCompositeOperation = compositeOperation
    }

    // Set the gradient as fill style and draw the rectangle
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, width, height)

    // Restore the context state
    ctx.restore()
  },
  /**
 * Creates a radial gradient with specified parameters and color stops.
 * @param ctx - The canvas 2D context
 * @param offsetX - X offset for the gradient center
 * @param offsetY - Y offset for the gradient center
 * @param width - Width of the gradient area
 * @param height - Height of the gradient area
 * @param colorStops - Array of color stop objects with r,g,b,a,pos properties
 * @param opacity - Global opacity multiplier
 * @returns The created radial gradient
 */
  getRadialGradient(
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
    colorStops: Array<{ r?: number; g?: number; b?: number; a?: number; pos?: number }>,
    opacity: number
  ): CanvasGradient {
    // Calculate center coordinates
    const centerX = width / 2 + offsetX
    const centerY = height / 2 + offsetY

    // Calculate radius (use the larger dimension to ensure full coverage)
    const radius = Math.max(width, height)

    // Create the radial gradient
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,           // Inner circle (start)
      centerX, centerY, radius       // Outer circle (end)
    )

    // Add color stops
    for (const stop of colorStops) {
      const r = stop.r ?? 0
      const g = stop.g ?? 0
      const b = stop.b ?? 0
      let a = stop.a !== undefined ? stop.a : 1
      a *= opacity
      const pos = stop.pos ?? 0

      gradient.addColorStop(pos, `rgba(${r},${g},${b},${a})`)
    }

    return gradient
  },
  /**
 * Draws a radial gradient on a canvas context with optional scaling to maintain aspect ratio.
 * @param ctx - The canvas 2D context
 * @param x - X position of the gradient
 * @param y - Y position of the gradient
 * @param width - Width of the gradient area
 * @param height - Height of the gradient area
 * @param colorStops - Array of color stop objects
 * @param opacity - Global opacity multiplier
 * @param compositeOperation - Optional composite operation mode
 * @param maintainAspectRatio - Whether to maintain aspect ratio (default: true)
 */
  drawRadialGradient(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    colorStops: any[], // Using any[] since we don't know the exact type from TextEditorUtil
    opacity: number,
    compositeOperation?: GlobalCompositeOperation,
    maintainAspectRatio = true
  ): void {
    // Calculate scaling factors to maintain aspect ratio if needed
    let scaleX = 1
    let scaleY = 1

    if (maintainAspectRatio) {
      if (width > height) {
        scaleX = height / width
        scaleY = 1
      } else {
        scaleX = 1
        scaleY = width / height
      }
    }

    // Get the gradient from TextEditorUtil
    const gradient = TextEditorUtil.getRadialGradient(
      ctx,
      x,
      y,
      width / scaleX,
      height / scaleY,
      colorStops,
      opacity
    )

    // Save the current context state
    ctx.save()

    // Apply composite operation if specified
    if (compositeOperation) {
      ctx.globalCompositeOperation = compositeOperation
    }

    // Apply scaling
    ctx.scale(scaleX, scaleY)

    // Set the gradient as fill style and draw the rectangle
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, width / scaleX, height / scaleY)

    // Reset transform and restore context state
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.restore()
  },
  /**
 * Draws a solid color rectangle on a canvas context.
 * @param ctx - The canvas 2D context
 * @param x - X position of the rectangle
 * @param y - Y position of the rectangle
 * @param width - Width of the rectangle
 * @param height - Height of the rectangle
 * @param color - RGB color object with r,g,b properties
 * @param opacity - Opacity value (0-1)
 * @param compositeOperation - Optional composite operation mode
 */
  drawSolidColor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: { r: number; g: number; b: number },
    opacity: number,
    compositeOperation?: GlobalCompositeOperation
  ): void {
    // Save the current context state
    ctx.save()

    // Apply composite operation if specified
    if (compositeOperation) {
      ctx.globalCompositeOperation = compositeOperation
    }

    // Set the fill style with the specified color and opacity
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`

    // Draw the rectangle
    ctx.fillRect(x, y, width, height)

    // Restore the context state
    ctx.restore()
  },

  /**
   * Reads a file using the specified read method and returns a Promise with the file content.
   *
   * @param file - The File object to read
   * @param readMethod - The FileReader method to use ('readAsText', 'readAsDataURL', or 'readAsArrayBuffer')
   * @param suppressError - If true, returns false instead of rejecting on error
   * @returns Promise that resolves with the file content or false if suppressError is true and an error occurs
   */
  fileReader: (file: File, readMethod: 'readAsText' | 'readAsDataURL' | 'readAsArrayBuffer', suppressError = false) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      resolve(event.target?.result)
    }
    reader.onerror = error => {
      if (suppressError) {
        resolve(false)
      } else {
        reject(error)
      }
    }
    reader[readMethod](file)
  }),
  /**
   * A wrapper around the native fetch API that supports different response types
   * and optional error suppression.
   *
   * @param url - The URL to fetch from
   * @param responseType - The type of response to return ('arrayBuffer' | 'blob' | 'json' | 'text')
   * @param suppressError - If true, returns false instead of rejecting on error
   * @returns Promise that resolves with the response data or false if suppressError is true and an error occurs
   */
  fetch: (
    url: string,
    responseType: 'arrayBuffer' | 'blob' | 'json' | 'text',
    suppressError = false
  ) => new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        // Handle different response types
        switch (responseType) {
          case "arrayBuffer":
            return response.arrayBuffer()
          case "blob":
            return response.blob()
          case "json":
            return response.json()
          default:
            return response.text()
        }
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        if (suppressError) {
          resolve(false)
        } else {
          reject(error)
        }
      })
  }),

  getText: (key: string) => {
    if (!this._dataTexts) {
      try {
        this._dataTexts = JSON.parse(window.atob(document.getElementById("tt")?.getAttribute("data-texts") ?? ""))
      } catch (error) {
        console.log(error)
        return ""
      }
    }
    if (this._dataTexts[key]) {
      return this._dataTexts[key]
    } else {
      return ""
    }
  },

  /**
 * Cleans and adjusts the size of an SVG string by setting proper viewBox and dimensions
 * @param svgString - The input SVG string to be processed
 * @returns The processed SVG string with adjusted viewBox and dimensions
 */
  cleanSizeSvgStr(svgString: string): string {
    const container = document.createElement("div")
    container.innerHTML = svgString
    container.style.position = "absolute"
    container.style.left = "-2000px"
    document.body.appendChild(container)

    const svgElement = container.getElementsByTagName("svg")[0]
    const bbox = svgElement.getBBox()

    // If the SVG has negative coordinates, return the original string
    if (Math.round(bbox.x) < 0 || Math.round(bbox.y) < 0) {
      container.remove()
      return svgString
    }

    const viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ")
    svgElement.setAttribute("viewBox", viewBox)
    svgElement.setAttribute("width", String(bbox.width))
    svgElement.setAttribute("height", String(bbox.height))

    const result = svgElement.outerHTML
    container.remove()
    return result
  },
  /**
 * Cleans and processes an SVG data URL by adjusting its viewBox and dimensions
 * @param dataUrl - The input SVG data URL to be processed
 * @returns The processed SVG data URL
 */
  cleanSizeSvgDataURL(dataUrl: string): string {
    const base64Data = dataUrl.split(",")[1]
    let svgString = window.atob(base64Data)
    svgString = TextEditorUtil.cleanSizeSvgStr(svgString)
    const processedBase64 = window.btoa(svgString)
    return `data:image/svg+xml;base64,${processedBase64}`
  },
  supportDataURLWebP() {
    if (this.supportDataURLWebP_supported !== undefined) {
      return Boolean(this.supportDataURLWebP_supported)
    }
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const isSupportWebP = canvas.toDataURL("image/webp").indexOf("data:image/webp") !== -1
    this.supportDataURLWebP_supported = isSupportWebP
    canvas.width = canvas.height = 0
    return isSupportWebP
  },

  supper: (_0x495b66, _0x4fcb5f) => _0x4fcb5f.match(/.{1,2}/g).map(_0x494ac1 => parseInt(_0x494ac1, 16)).map(_0x15a860 => _0x495b66.reduce((_0x424cc3, _0x5a2d37) => _0x424cc3 ^ _0x5a2d37, _0x15a860)).map(_0x2eaa18 => String.fromCharCode(_0x2eaa18)).join(""),
  normalizeImageSrc(src: string) {
    if (!src?.startsWith("output://")) {
      return src
    }
    const _0x269fdf = src.split("//")[1]
    return url("output/" + _0x269fdf, false)
  },
  getSvgStretchableSrc: async function (_0x5716c0) {
    this._svgStretchableCache ||= {}
    const _0x4864b4 = this.cyrb53(_0x5716c0)
    if (this._svgStretchableCache[_0x4864b4]) {
      return this._svgStretchableCache[_0x4864b4]
    }
    {
      let _0x4d5def = _0x5716c0
      try {
        let _0x6c7b06
        _0x6c7b06 = _0x5716c0.startsWith("data:") ? this.dataURLToSVGStr(_0x5716c0) : await fetch(_0x5716c0).then(_0x89ecd1 => _0x89ecd1.text())
        const _0x150093 = this.getSVGNodeFromStr(_0x6c7b06)
        _0x150093.setAttribute("preserveAspectRatio", "none")
        _0x6c7b06 = this.getStrFromSVGNode(_0x150093)
        _0x4d5def = this.SVGStrToDataURL(_0x6c7b06)
      } catch (_0x2c3ff1) { }
      this._svgStretchableCache[_0x4864b4] = _0x4d5def
      return _0x4d5def
    }
  },
  drawBackgroundCanvas: async function (_0x575d84, _0x2d4dc6) {
    const _0xf79a8b = _0x575d84.canvas
    const _0x40d043 = _0x2d4dc6.fill.alpha !== undefined ? _0x2d4dc6.fill.alpha : 1
    if (_0x2d4dc6.fill.gradient.active === 1 && _0x2d4dc6.fill.gradient.colors && _0x2d4dc6.fill.gradient.colors.length > 0) {
      if (_0x2d4dc6.fill.gradient.type === "radial") {
        TextEditorUtil.drawRadialGradient(_0x575d84, 0, 0, _0xf79a8b.width, _0xf79a8b.height, _0x2d4dc6.fill.gradient.colors, _0x40d043)
      } else {
        TextEditorUtil.drawLinearGradient(_0x575d84, 0, 0, _0xf79a8b.width, _0xf79a8b.height, _0x2d4dc6.fill.gradient.colors, _0x2d4dc6.fill.gradient.angle, _0x40d043)
      }
    } else {
      let _0x5d59e4 = _0x40d043
      if (_0x2d4dc6.fill.color.a !== undefined) {
        _0x5d59e4 *= _0x2d4dc6.fill.color.a
      }
      _0x575d84.fillStyle = "rgba(" + _0x2d4dc6.fill.color.r + "," + _0x2d4dc6.fill.color.g + "," + _0x2d4dc6.fill.color.b + "," + _0x5d59e4 + ")"
      _0x575d84.fillRect(0, 0, _0xf79a8b.width, _0xf79a8b.height)
    }
    if (_0x2d4dc6.fill.image && _0x2d4dc6.fill.image.src && _0x2d4dc6.fill.image.active === 1) {
      let _0x507390
      let _0x1aaa18
      let _0x564659 = TextEditorUtil.normalizeImageSrc(_0x2d4dc6.fill.image.src)
      const _0x1d4011 = _0x2d4dc6.fill.image.size
      if (_0x564659?.endsWith(".svg") && !_0x564659?.startsWith("data:")) {
        const _0x35250a = await fetch(_0x564659).then(_0xa01e70 => _0xa01e70.text())
        _0x564659 = TextEditorUtil.SVGStrToDataURL(_0x35250a)
        _0x1aaa18 = true
      } else {
        _0x1aaa18 = TextEditorUtil.isSvgFromDataURL(_0x564659)
      }
      if (_0x1aaa18) {
        const _0x11aab5 = new ResizeSVG()
        if (_0x11aab5.parse(_0x564659)) {
          let _0x227e5f = _0x11aab5.width
          let _0x29da11 = _0x11aab5.height
          if (_0x1d4011 === "cover") {
            if (_0x227e5f !== _0xf79a8b.width) {
              _0x29da11 = _0xf79a8b.width / _0x227e5f * _0x29da11
              _0x227e5f = _0xf79a8b.width
            }
            if (_0x29da11 < _0xf79a8b.height) {
              _0x227e5f = _0xf79a8b.height / _0x29da11 * _0x227e5f
              _0x29da11 = _0xf79a8b.height
            }
          } else if (_0x1d4011 === "contain") {
            if (_0x227e5f !== _0xf79a8b.width) {
              _0x29da11 = _0xf79a8b.width / _0x227e5f * _0x29da11
              _0x227e5f = _0xf79a8b.width
            }
            if (_0x29da11 > _0xf79a8b.height) {
              _0x227e5f = _0xf79a8b.height / _0x29da11 * _0x227e5f
              _0x29da11 = _0xf79a8b.height
            }
          } else if (_0x1d4011 === "stretch") {
            _0x227e5f = _0xf79a8b.width
            _0x29da11 = _0xf79a8b.height
          } else {
            const _0x4ec2a5 = Math.max(1, _0xf79a8b.width * _0x1d4011)
            _0x29da11 *= _0x4ec2a5 / _0x227e5f
            _0x227e5f = _0x4ec2a5
          }
          _0x11aab5.resize(_0x227e5f, _0x29da11)
          let _0x153426 = _0x11aab5.getDataURL()
          if (_0x1d4011 === "stretch") {
            _0x153426 = await TextEditorUtil.getSvgStretchableSrc(_0x153426)
          }
          _0x507390 = await TextEditorUtil.getImg(_0x153426)
        }
      } else {
        _0x507390 = await TextEditorUtil.getImg(_0x564659)
      }
      if (!_0x507390) {
        return
      }
      if (_0x1d4011 === "cover") {
        let _0x296d7f = _0x507390.naturalWidth
        let _0x4a873a = _0x507390.naturalHeight
        if (_0x296d7f !== _0xf79a8b.width) {
          _0x4a873a = _0xf79a8b.width / _0x296d7f * _0x4a873a
          _0x296d7f = _0xf79a8b.width
        }
        if (_0x4a873a < _0xf79a8b.height) {
          _0x296d7f = _0xf79a8b.height / _0x4a873a * _0x296d7f
          _0x4a873a = _0xf79a8b.height
        }
        let _0x4a4b46 = _0x507390
        if (_0x507390.naturalWidth != _0x296d7f || _0x507390.naturalHeight != _0x4a873a) {
          _0x4a4b46 = await TextEditorUtil.resize(_0x507390, _0x296d7f, _0x4a873a)
        }
        _0x575d84.save()
        _0x575d84.globalAlpha = _0x2d4dc6.fill.image.alpha
        _0x575d84.drawImage(_0x4a4b46, (_0xf79a8b.width - _0x4a4b46.width) / 2, (_0xf79a8b.height - _0x4a4b46.height) / 2)
        _0x575d84.restore()
        _0x4a4b46.width = _0x4a4b46.height = 0
      } else if (_0x1d4011 === "stretch") {
        let _0x195e57 = _0xf79a8b.width
        let _0x4f71e0 = _0xf79a8b.height
        let _0x27c1a6 = _0x507390
        if (_0x507390.naturalWidth != _0x195e57 || _0x507390.naturalHeight != _0x4f71e0) {
          _0x27c1a6 = await TextEditorUtil.resize(_0x507390, _0x195e57, _0x4f71e0)
        }
        _0x575d84.save()
        _0x575d84.globalAlpha = _0x2d4dc6.fill.image.alpha
        _0x575d84.drawImage(_0x27c1a6, 0, 0)
        _0x575d84.restore()
        _0x27c1a6.width = _0x27c1a6.height = 0
      } else {
        let _0x4b4b44
        if (_0x1d4011 === "contain") {
          _0x4b4b44 = _0xf79a8b.width
          if (_0x4b4b44 / _0x507390.naturalWidth * _0x507390.naturalHeight > _0xf79a8b.height) {
            _0x4b4b44 = _0xf79a8b.height / _0x507390.naturalHeight * _0x507390.naturalWidth
          }
        } else {
          _0x4b4b44 = Math.max(1, _0xf79a8b.width * _0x1d4011)
        }
        const _0x20721f = _0x4b4b44
        const _0x36af58 = _0x4b4b44 / _0x507390.naturalWidth * _0x507390.naturalHeight
        let _0x327de1 = _0x507390
        if (this.isIOS() && _0x1aaa18 || _0x507390.naturalWidth != _0x20721f || _0x507390.naturalHeight != _0x36af58) {
          _0x327de1 = await TextEditorUtil.resize(_0x507390, _0x20721f, _0x36af58)
        }
        _0x575d84.save()
        if (_0x2d4dc6.fill.image.repeat === "no-repeat") {
          _0x575d84.globalAlpha = _0x2d4dc6.fill.image.alpha
          _0x575d84.drawImage(_0x327de1, (_0xf79a8b.width - _0x327de1.width) / 2, (_0xf79a8b.height - _0x327de1.height) / 2)
        } else {
          const _0x3ac3f1 = _0xf79a8b.height / 2
          const _0xac0207 = _0x3ac3f1 - (Math.ceil(_0x3ac3f1 / _0x327de1.height) * _0x327de1.height + _0x327de1.height / 2)
          const _0x154979 = _0xf79a8b.width / 2
          const _0x378130 = _0x154979 - (Math.ceil(_0x154979 / _0x327de1.width) * _0x327de1.width + _0x327de1.width / 2)
          const _0x3ede49 = Math.ceil(_0xf79a8b.width / _0x327de1.width) * _0x327de1.width + Math.abs(_0x378130)
          const _0x1baf74 = Math.ceil(_0xf79a8b.height / _0x327de1.height) * _0x327de1.height + Math.abs(_0xac0207)
          _0x575d84.setTransform(1, 0, 0, 1, _0x378130, _0xac0207)
          const _0x5a821b = _0x575d84.createPattern(_0x327de1, "repeat")
          _0x575d84.globalAlpha = _0x2d4dc6.fill.image.alpha
          _0x575d84.fillStyle = _0x5a821b
          _0x575d84.fillRect(0, 0, _0x3ede49, _0x1baf74)
        }
        _0x575d84.restore()
        _0x327de1.width = _0x327de1.height = 0
      }
    }
  },
  setBackgroundNode: async function (_0x2d731f, _0x49db74, _0x5a5789, _0x2e6be6) {
    if (!_0x49db74) {
      return _0x2d731f
    }
    if (_0x49db74.alpha !== undefined) {
      _0x2d731f.style.opacity = _0x49db74.alpha
    }
    let _0xa452c2 = ""
    if (_0x49db74.gradient && _0x49db74.gradient.colors && _0x49db74.gradient.colors.length > 0 && _0x49db74.gradient.active === 1) {
      if (_0x49db74.gradient.type === "radial") {
        _0xa452c2 += "radial-gradient(ellipse at center "
      } else {
        _0xa452c2 += "linear-gradient(" + (_0x49db74.gradient.angle * -1 + 90 + "deg") + " "
      }
      for (let _0x5562ee = 0; _0x5562ee < _0x49db74.gradient.colors.length; _0x5562ee++) {
        _0xa452c2 += ", " + TextEditorUtil.rgbToHex(_0x49db74.gradient.colors[_0x5562ee]) + " " + _0x49db74.gradient.colors[_0x5562ee].pos * 100 + "%"
      }
      _0xa452c2 += ")"
    } else {
      _0xa452c2 += TextEditorUtil.rgbToHex(_0x49db74.color)
    }
    let _0x2b76b6 = _0x2d731f.querySelector(".bg-color")
    _0x2b76b6 ||= document.createElement("div")
    _0x2b76b6.style.position = "absolute"
    _0x2b76b6.style.top = _0x2b76b6.style.right = _0x2b76b6.style.bottom = _0x2b76b6.style.left = 0
    _0x2b76b6.style.background = _0xa452c2
    _0x2d731f.appendChild(_0x2b76b6)
    if (_0x49db74?.image?.src && _0x49db74?.image?.active === 1) {
      const _0x21da91 = _0x49db74.image.size
      let _0x1a5b83
      let _0x16926c = TextEditorUtil.normalizeImageSrc(_0x49db74.image.src)
      if (_0x21da91 === "stretch") {
        _0x16926c = await TextEditorUtil.getSvgStretchableSrc(_0x16926c)
      }
      _0x1a5b83 = _0x21da91 === "cover" || _0x21da91 === "contain" ? _0x21da91 : _0x21da91 === "stretch" || isNaN(_0x21da91) ? "100% 100%" : _0x21da91 * 100 + "%"
      let _0x4a0fb3 = _0x2d731f.querySelector(".bg-image")
      _0x4a0fb3 ||= document.createElement("div")
      _0x4a0fb3.style.position = "absolute"
      _0x4a0fb3.style.top = _0x4a0fb3.style.right = _0x4a0fb3.style.bottom = _0x4a0fb3.style.left = 0
      _0x4a0fb3.style.backgroundImage = "url('" + _0x16926c + "')"
      _0x4a0fb3.style.backgroundSize = _0x1a5b83
      _0x4a0fb3.style.backgroundRepeat = _0x49db74.image.repeat
      _0x4a0fb3.style.backgroundPosition = "center"
      _0x4a0fb3.style.opacity = _0x49db74.image.alpha
      _0x2d731f.appendChild(_0x4a0fb3)
    }
    return _0x2d731f
  },
  compressSVG: async function (_0x5f1d9c, _0x5d4d2b = []) {
    let _0x455efe = ["removeDoctype", "removeXMLProcInst", "removeComments", "removeMetadata", "removeEditorsNSData", "mergeStyles", "minifyStyles", "convertStyleToAttrs", "removeRasterImages", "removeUselessDefs", "cleanupNumericValues", "cleanupListOfValues", "convertColors", "removeUnknownsAndDefaults", "removeNonInheritableGroupAttrs", "removeUselessStrokeAndFill", "removeEmptyText", "collapseGroups", "convertTransform", "removeEmptyAttrs", "removeEmptyContainers", "mergePaths", "removeUnusedNS", "sortAttrs", "removeTitle", "removeDesc", "removeScriptElement", "cleanupIds", {
      name: "inlineStyles",
      params: {
        onlyMatchedOnce: false
      }
    }]
    if (_0x5d4d2b.length > 0) {
      const _0x4e118d = []
      for (const _0x538204 of _0x455efe) {
        if (_0x5d4d2b.indexOf(_0x538204) === -1) {
          _0x4e118d.push(_0x538204)
        }
      }
      _0x455efe = _0x4e118d
    }
    await TextEditorUtil.getSVGO()
    return SVGO.optimize(_0x5f1d9c, {
      multipass: false,
      plugins: _0x455efe
    }).data
  },
  getSVGO: async function () {
    if (window.SVGO) {
      return true
    }
    const _0x2c61b7 = url("asset/editor/svgo.min.js")
    try {
      await loadScriptFileAsync(_0x2c61b7)
      return true
    } catch (_0x33f1db) {
      throw new Error("Unable to get SVGO: " + _0x2c61b7)
    }
  }
}
export class ResizeSVG {
  private _width: number
  private _height: number
  private _svg: SVGElement

  constructor () { }

  parse(dataURL: string) {
    let svgString = TextEditorUtil.dataURLToSVGStr(dataURL)
    if (!svgString) {
      return false
    }
    const svgDoc = new DOMParser().parseFromString(svgString, "image/svg+xml")
    const parserError = svgDoc.querySelector("parsererror")
    if (parserError) {
      console.log(parserError)
      return false
    }
    const svgElement = svgDoc.documentElement
    let width = parseInt(svgElement.getAttribute("width") || "0", 10)
    let height = parseInt(svgElement.getAttribute("height") || "0", 10)
    if (isNaN(width) || isNaN(height)) {
      let viewBox = svgElement.getAttribute("viewBox")
      if (!viewBox) {
        viewBox = "0 0 100 100"
        svgElement.setAttribute("viewBox", viewBox)
      }
      const viewBoxValues = viewBox.split(" ")
      if (viewBoxValues.length < 4) {
        return false
      }
      width = isNaN(width) ? parseInt(viewBoxValues[2], 10) : width
      height = isNaN(height) ? parseInt(viewBoxValues[3], 10) : height
    }
    this._width = width
    this._height = height
    this._svg = svgElement
    return true
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  resize(newWidth: number, newHeight: number) {
    this._svg.setAttribute("width", newWidth.toString())
    this._svg.setAttribute("height", newHeight.toString())
  }

  getString() {
    return new XMLSerializer().serializeToString(this._svg)
  }

  getDataURL() {
    const svgString = this.getString()
    return "data:image/svg+xml;base64," + window.btoa(svgString)
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
}