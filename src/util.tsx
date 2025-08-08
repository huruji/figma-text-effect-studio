import { useState, useEffect } from "preact/compat"
import { emit } from '@create-figma-plugin/utilities'

// 声明 window 上的 fontCache 属性，避免 TS 报错
declare global {
  interface Window {
    fontCache: Map<string, string>;
  }
}

export function svgToCanvasDataUrl(svgString: string, width: number, height: number) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const scale = 4
    canvas.width = width * scale
    canvas.height = height * scale
    const ctx = canvas.getContext('2d')

    ctx?.scale(scale, scale)

    const img = new Image()
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/png')
      resolve(dataUrl)
      // canvas.toBlob((blob) => {
      //   resolve(blob)
      // }, 'image/png')
    }
    img.onerror = (err) => {
      reject(err)
    }

    const encodedSvg = encodeURIComponent(svgString)
    img.src = `data:image/svg+xml;charset=utf-8,${encodedSvg}`
  })
}
export const generateDataUrlFromSvg = (svgString: string) => {
  const decoded = unescape(encodeURIComponent(svgString))
  const base64 = btoa(decoded)
  const dataUrl = `data:image/svg+xml;base64,${base64}`
  return dataUrl
}

export const loadImagePromise = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.crossOrigin = "anonymous"
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject()
    }
    img.onabort = () => {
      reject()
    }
  })
}

export const imgSrctoDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
export const transformImageToDataUrl = async (imageUrl: string, backgroundColor: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageUrl
    image.crossOrigin = "anonymous"
    image.onload = function () {
      const canvas = document.createElement("canvas")
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const ctx = canvas.getContext("2d")
      if (backgroundColor) {
        (ctx as CanvasRenderingContext2D).fillStyle = backgroundColor
        ctx?.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx?.drawImage(image, 0, 0)
      const dataURL = canvas.toDataURL("image/png")
      resolve(dataURL as string)
    }
    image.onerror = () => {
      reject()
    }
  })
}

export function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  //Old Code
  //write the ArrayBuffer to a blob, and you're done
  //var bb = new BlobBuilder();
  //bb.append(ab);
  //return bb.getBlob(mimeString);

  //New Code
  return new Blob([ab], { type: mimeString })
}

const CACHE_PREFIX = 'canva-type-curve-'

export function setCacheData(key: string, value: string) {
  const cacheKey = `${CACHE_PREFIX}${key}`
  try {
    localStorage.setItem(cacheKey, value)
  } catch (error) {
    console.error(error)
  }
}

export function getCacheData(key: string) {
  const cacheKey = `${CACHE_PREFIX}${key}`
  try {
    return localStorage.getItem(cacheKey)
  } catch (error) {
    return ''
  }
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}

export const getFontBase64 = async (url: string) => {
  if (!window.fontCache) {
    window.fontCache = new Map<string, string>()
  }
  if (window.fontCache.has(url)) {
    return window.fontCache.get(url)
  }
  const blob = await (await fetch(url)).blob()
  const base64 = await blobToBase64(blob) as string
  window.fontCache.set(url, base64)
  return base64
}

export const loadFonts = async (config: {
  name: string
  url: string
}[]) => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < config.length; i++) {
      // console.log('load font config: ', config)
      const url = config[i].url
      const name = config[i].name
      try {
        const base64 = await getFontBase64(url)
        // console.log('base64: ', base64)
        const fontface = new FontFace(name, `url(${base64})`)
        await fontface.load()
        document.fonts.add(fontface)
        // console.log(`load font ${name}, url: ${url} success`)
      } catch (error) {
        console.error(`load font ${name}, url: ${url} error: `, error)
      }
    }
    resolve(true)
  })
}

export const parseSVGString = (svgString: string): SVGElement | null => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  return doc.documentElement as unknown as SVGElement
}

export const prehandlePathSample = (pathSample: {
  name: string
  path: string
  viewBox: string
  url: string
}[]) => {
  return pathSample
}

/**
 * 在 Figma Plugin 中打开外部链接
 * @param url 要打开的链接
 */
export const openExternalUrl = (url: string) => {
  emit('OPEN_URL', url)
}
