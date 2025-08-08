/* eslint-disable object-shorthand */
import { PresetType } from 'src/atoms/setting'
import { getFontBase64 } from 'src/util'
import * as d3 from 'd3'

export const baseSetting = async (n: PresetType, o: PresetType, node: SVGElement) => {
  // if (n.text !== o.text) {
    // node.querySelectorAll('text').forEach((d) => {
    //   d.textContent = n.text!
    // })
  // }
  // if (n.font) {
  //   const font = n.font
  //   let style = node?.querySelector('#svg-style')
  //   const fontConfig = (window as any).AllFonts.find(item => item.name === font)
  //   if (fontConfig) {
  //     if (!style) {
  //       style = document.createElement('style')
  //       style.id = 'svg-style'
  //       node?.appendChild(style)
  //     }
  //     const url = fontConfig.url
  //     const base64 = await getFontBase64(url) as string
  //     style.textContent = `@font-face { font-family: ${font}; src: url(${base64}) }`
  //   }
  //   node.querySelectorAll('text').forEach((text) => {
  //     text.style.fontFamily = font
  //   })
  //   const textNode = node.querySelector('text')
  //   if (textNode && !n.withoutSettingBox) {
  //     const bbox = textNode.getBBox()
  //     const width = bbox.width
  //     const height = bbox.height
  //     node.setAttribute('viewBox', `0 0 ${Math.ceil(width + 50)} ${Math.ceil(height * 1.5)}`)
  //     // text.style.fontFamily = font
  //   }
  // }
}

export const setEffect = async function (n, o, node, name) {
  const slugKey = name?.split(' ').map((w, i) => {
    if (i === 0) return w.toLowerCase()
    return w[0].toUpperCase() + w.slice(1)
  }).join('')
  if (settingEffect?.[slugKey]) {
    await settingEffect?.[slugKey]?.(n, o, node)
  } else {
    if (n.type === 'texture_bg') {
      await settingEffect?._default_texture_bg?.(n, o, node)
    } else {
      await settingEffect?._default?.(n, o, node)
    }
  }
}

export const settingEffect = {
  '_default': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
  },
  '_default_texture_bg': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    if (n.colorList[0]) {
      node.querySelector('text').setAttribute('stroke', n.colorList[0])
    }
    if (n.stroke) {
      node.querySelector('text').setAttribute('stroke-width', n.stroke)
    }
  },
  'none': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.removeAttribute('filter')
    text.setAttribute('fill', n.color)
    text.setAttribute('stroke', n.strokeColor)
    text.setAttribute('stroke-width', n.stroke)
  },
  'vintage-1': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.setAttribute('filter', 'url(#vintage-1-b)')
    text.setAttribute('fill', 'url(#vintage-1)')
    text.setAttribute('stroke', n.strokeColor)
    text.setAttribute('stroke-width', n.stroke)
    if (n.colorList[0]) {
      node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')[0].setAttribute('stop-color', n.colorList[0])
    }
    if (n.colorList[1]) {
      node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')[1].setAttribute('stop-color', n.colorList[1])
    }
    if (n.colorList[2]) {
      node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')[2].setAttribute('stop-color', n.colorList[2])
    }
    if (n.colorList[3]) {
      node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')[3].setAttribute('stop-color', n.colorList[3])
    }
    if (n.colorList[4]) {
      node.querySelectorAll('feDropShadow')[0].setAttribute('flood-color', n.colorList[4])
      // node.querySelectorAll('text')[0].setAttribute('stroke', n.colorList[4])
    }
    if (n.stroke != null) {
      node.querySelector('text').setAttribute('stroke-width', n.stroke)
    }
  },
  'extruded': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.setAttribute('filter', 'url(#extruded_svg)')
    text.removeAttribute('fill')
    text.removeAttribute('stroke')
    text.removeAttribute('stroke-width')
    if (n.colorList[0]) {
      node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.colorList[0])
    }
    if (n.colorList[1]) {
      node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.colorList[1])
    }
  },
  'oil': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.removeAttribute('stroke')
    text.removeAttribute('stroke-width')
    text.removeAttribute('fill')
    text.setAttribute('filter', 'url(#oil)')
  },
  'sticker': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.setAttribute('stroke', n.strokeColor)
    text.setAttribute('stroke-width', n.stroke)
    text.setAttribute('filter', 'url(#sticker)')
    text.setAttribute('fill', 'url(#sticker-gradient)')
    var angle, dx, dy, ref$, x1, y1, x2, y2, x$
    if (n.color1) {
      node.querySelectorAll('stop')[0].setAttribute('stop-color', n.color1)
    }
    if (n.color2) {
      node.querySelectorAll('stop')[1].setAttribute('stop-color', n.color2)
    }
    // if (n.color3) {
    //   node.querySelector('text').setAttribute('stroke', n.color3)
    // }
    // if (n.stroke != null) {
    //   node.querySelector('text').setAttribute('stroke-width', n.stroke)
    // }
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 0.3
    dy = Math.sin(angle * Math.PI / 180) * 0.3
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    return x$
  },
  'normal': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.setAttribute('fill', 'url(#normal)')
    text.setAttribute('stroke', n.strokeColor)
    text.setAttribute('stroke-width', n.stroke)
    text.removeAttribute('filter')
    const stops = node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')
    stops.forEach((stop, index) => {
      if (n.colorList[index]) {
        stop.setAttribute('stop-color', n.colorList[index])
      }
    })
  },
  'twirl': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.setAttribute('fill', 'url(#twirl-b)')
    text.setAttribute('stroke', n.strokeColor)
    text.setAttribute('stroke-width', n.stroke)
    text.setAttribute('filter', 'url(#twirl)')
    const stops = node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')
    stops.forEach((stop, index) => {
      if (n.colorList[index]) {
        stop.setAttribute('stop-color', n.colorList[index])
      }
    })
  },
  'watercolorpainting': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.setAttribute('fill', 'url(#WatercolorPainting-svg-b)')
    text.setAttribute('stroke', n.strokeColor)
    text.setAttribute('stroke-width', n.stroke)
    text.setAttribute('filter', 'url(#WatercolorPainting-svg)')
    if (n.colorList[0]) {
      node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')[0].setAttribute('stop-color', n.colorList[0])
    }
    if (n.colorList[1]) {
      node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')[1].setAttribute('stop-color', n.colorList[1])
    }
  },
  "incredible": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.setAttribute('fill', 'url(#incredible-gradient)')
    text.setAttribute('stroke', n.strokeColor)
    text.setAttribute('stroke-width', n.stroke)
    text.setAttribute('filter', 'url(#incredible)')
    n.stroke = n.colorList[2]
    n.outline = n.colorList[3]
    n.shadow = n.colorList[4]
    var flood, angle, dx, dy, ref$, x1, y1, x2, y2, x$
    Array.from(node.querySelectorAll('stop')).map(function (d, i) {
      return d.setAttribute('stop-color', n.colorList[i])
    })
    flood = Array.from(node.querySelectorAll('feFlood'))
    if (n.stroke != null) {
      flood[1].setAttribute('flood-color', n.stroke)
    }
    if (n.outline != null) {
      flood[2].setAttribute('flood-color', n.outline)
    }
    if (n.shadow != null) {
      flood[3].setAttribute('flood-color', n.shadow)
    }
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180)
    dy = Math.sin(angle * Math.PI / 180)
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    return x$
  },
  "lego": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    n.fill = n.colorList[0]
    n.stroke = n.colorList[1]
    n.outline = n.colorList[2]
    const text = node.querySelector('text')
    text.setAttribute('fill', n.fill)
    text.removeAttribute('stroke')
    text.removeAttribute('stroke-width')
    text.setAttribute('filter', 'url(#lego)')
    var flood
    flood = Array.from(node.querySelectorAll('feFlood'))
    // if (n.fill !== o?.fill) {
    //   node.querySelector('text').setAttribute('fill', n.fill)
    // }
    if (n.stroke != null) {
      flood[0].setAttribute('flood-color', n.stroke)
    }
    if (n.outline != null) {
      return flood[1].setAttribute('flood-color', n.outline)
    }
  },
  'scalesbg1': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    if (n.colorList[0]) {
      node.querySelector('text').setAttribute('stroke', n.colorList[0])
    }
    if (n.stroke) {
      node.querySelector('text').setAttribute('stroke-width', n.stroke)
    }
  },
  'circleBg1': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    if (n.colorList[0]) {
      node.querySelector('text').setAttribute('stroke', n.colorList[0])
    }
    if (n.stroke) {
      node.querySelector('text').setAttribute('stroke-width', n.stroke)
    }
  },
  'splitbg': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelector('text')
    text.setAttribute('fill', 'url(#splitBgPattern)')
    if (n.colorList[0]) {
      node.querySelector('text').setAttribute('stroke', n.colorList[0])
    }
    if (n.stroke) {
      node.querySelector('text').setAttribute('stroke-width', n.stroke)
    }
  },
  'polkadots': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    if (n.dotSize !== undefined) {
      node.querySelector('circle').setAttribute('r', n.dotSize)
    }
    if (n.colorList[0]) {
      node.querySelector('circle').setAttribute('fill', n.colorList[0])
    }
  },
  'innershadow': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    if (n.colorList[0]) {
      node.querySelector('text').setAttribute('fill', n.colorList[0])
    }
    if (n.colorList[1]) {
      node.querySelector('feFlood').setAttribute('flood-color', n.colorList[1])
    }
  },
  'lines': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const paths = node.querySelectorAll('path')
    paths.forEach((path, index) => {
      path.setAttribute('stroke', n.colorList[index])
    })
    if (n.colorList[3]) {
      node.querySelector('text').setAttribute('fill', `url(#lines)${n.colorList[4]}`)
    }
    if (n.colorList[4]) {
      node.querySelector('text').setAttribute('stroke', n.colorList[4])
    }
    if (n.stroke) {
      node.querySelector('text').setAttribute('stroke-width', n.stroke)
    }
  },
  'multistroke': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const text = node.querySelectorAll('text')
    text.forEach((t, index) => {
      t.setAttribute('stroke', n.colorList[index])
    })
  },
  'shadow-2': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    const stops = node.querySelectorAll('linearGradient')[0].querySelectorAll('stop')
    stops.forEach((stop, index) => {
      if (n.colorList[index]) {
        stop.setAttribute('stop-color', n.colorList[index])
      }
    })
  },
  'vintage-3': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    if (n.colorList[0]) {
      node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.colorList[0])
    }
    if (n.colorList[1]) {
      node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.colorList[1])
    }
  },
  'vintage-4': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    if (n.colorList[0]) {
      node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.colorList[0])
    }
    if (n.colorList[1]) {
      node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.colorList[1])
    }
  },
  'extrude-glow': async function (setting, o, node) {
    const n = { ...setting }
    n.fill = n.colorList[0]
    n.extrusion = n.colorList[1]
    n.shadow = n.colorList[2]
    await baseSetting(n, o, node)
    var matrix, offsets, i
    if (n.text !== o?.text) {
      node.querySelector('text').textContent = n.text
    }
    if (n.fill !== o?.fill) {
      node.querySelector('text').setAttribute('fill', n.fill)
    }
    if (n.extrusion) {
      node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.extrusion)
    }
    if (n.shadow) {
      node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.shadow)
    }
    if (n.offset != null) {
      matrix = node.querySelector('feConvolveMatrix')
      offsets = node.querySelectorAll('feOffset')
      offsets[0].setAttribute('dx', -n.offset)
      offsets[1].setAttribute('dx', -n.offset * 1.5)
      matrix.setAttribute('order', n.offset + "," + n.offset)
      return matrix.setAttribute('kernelMatrix', (function () {
        var i$, to$, results$ = []
        for (i$ = 0, to$ = n.offset; i$ < to$; ++i$) {
          i = i$
          results$.push(i)
        }
        return results$
      }()).map(function (i) {
        var j
        return (function () {
          var i$, to$, results$ = []
          for (i$ = 0, to$ = n.offset; i$ < to$; ++i$) {
            j = i$
            results$.push(j)
          }
          return results$
        }()).map(function (j) {
          if (i === Math.floor(n.offset * 0.5)) {
            return 1
          } else {
            return 0
          }
        }).join(' ')
      }).join(' '))
    }
  },
  'hover': async function (setting, o, node) {
    const n = { ...setting }
    n.fill = n.colorList[0]
    n.shadow = n.colorList[1]
    await baseSetting(n, o, node)
    if (n.fill != null) {
      node.querySelector('text').setAttribute('fill', n.fill)
    }
    if (n.shadow != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.shadow)
    }
    if (n.offsetX != null) {
      Array.from(node.querySelectorAll('feOffset')).map(function (d, i) {
        return d.setAttribute("dx", n.offsetX * (i
          ? 1
          : -1))
      })
    }
    if (n.offsetY != null) {
      return Array.from(node.querySelectorAll('feOffset')).map(function (d, i) {
        return d.setAttribute("dy", n.offsetY * (i
          ? 1
          : -1))
      })
    }
  },
  'shiny': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    var angle, dx, dy, ref$, x1, y1, x2, y2, x$
    Array.from(node.querySelectorAll('linearGradient stop')).map(function (d, i) {
      if (i > 2) {
        return
      }
      if (n["color" + (i + 1)] != null) {
        return d.setAttribute('stop-color', n["color" + (i + 1)])
      }
    })
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 125
    dy = Math.sin(angle * Math.PI / 180) * 37.5
    ref$ = [250 - dx, 75 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [250 + dx, 75 + dy], x2 = ref$[0], y2 = ref$[1]
    dx = Math.cos(angle * Math.PI / 180) * 0.5
    dy = Math.sin(angle * Math.PI / 180) * 0.5
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    return x$
  },
  'extrusion': async function (setting, o, node) {
    const n = { ...setting }
    n.fill = n.colorList[0]
    n.extrusion = n.colorList[1]
    await baseSetting(n, o, node)
    var x$, conv, i
    if (n.fill !== o?.fill) {
      node.querySelector('text').setAttribute('fill', n.fill)
    }
    if (n.extrusion != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.extrusion)
    }
    if (n.offset) {
      x$ = node.querySelector('feOffset')
      x$.setAttribute('dx', n.offset * 0.5)
      x$.setAttribute('dy', n.offset * 0.5)
      conv = node.querySelector('feConvolveMatrix')
      conv.setAttribute('order', n.offset + "," + n.offset)
      return conv.setAttribute('kernelMatrix', (function () {
        var i$, to$, results$ = []
        for (i$ = 0, to$ = n.offset; i$ < to$; ++i$) {
          i = i$
          results$.push(i)
        }
        return results$
      }()).map(function (i) {
        var j
        return (function () {
          var i$, to$, results$ = []
          for (i$ = 0, to$ = n.offset; i$ < to$; ++i$) {
            j = i$
            results$.push(j)
          }
          return results$
        }()).map(function (j) {
          if (i === j) {
            return 1
          } else {
            return 0
          }
        }).join(' ')
      }).join(' '))
    }
  },
  'vr': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    var offsets
    if (n.color3 !== o?.color3) {
      node.querySelector('text').setAttribute('fill', n.color3)
    }
    node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.color1)
    node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.color2)
    offsets = node.querySelectorAll('feOffset')
    if (n.offsetX) {
      offsets[0].setAttribute('dx', n.offsetX)
      offsets[1].setAttribute('dx', -n.offsetX)
    }
    if (n.offsetY) {
      offsets[0].setAttribute('dy', -n.offsetY)
      return offsets[1].setAttribute('dy', n.offsetY)
    }
  },
  'stripes': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    var stop, angle, dx, dy, ref$, x1, y1, x2, y2, x$, w, w2, s, d, code
    stop = node.querySelectorAll('stop')
    if (n.color1 != null) {
      stop[0].setAttribute('stop-color', n.color1)
    }
    if (n.color2 != null) {
      stop[1].setAttribute('stop-color', n.color2)
    }
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 0.5
    dy = Math.sin(angle * Math.PI / 180) * 0.5
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    if (n.density != null) {
      ref$ = [n.density, n.density * 2, n.density * 0.25], w = ref$[0], w2 = ref$[1], s = ref$[2]
      d = ['M', -w, -w, 'L', w2, w2, 'M', -w2, -w, 'L', w, w2, 'M', -w, -w2, 'L', w2, w].join(' ')
      code = btoa("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"2000px\" height=\"1000px\"><defs><pattern id=\"pattern\" patternUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + w + "\"><path d=\"" + d + "\" stroke=\"#000\" stroke-width=\"" + s + "\"/></pattern></defs><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#pattern)\"/></svg>")
      return node.querySelector('feImage').setAttributeNS('http://www.w3.org/1999/xlink', 'href', "data:image/svg+xml;base64," + code)
    }
  },
  'hole': async function (setting, o, node) {
    const n = { ...setting }
    n.fill = n.colorList[0]
    n.shadow = n.colorList[1]
    await baseSetting(n, o, node)

    if (n.fill !== o?.fill) {
      node.querySelector('text').setAttribute('fill', n.fill)
    }
    if (n.shadow != null) {
      return node.querySelector('feFlood').setAttribute('flood-color', n.shadow)
    }
  },
  'jagged': async function (setting, o, node) {
    const n = { ...setting }
    n.color = n.colorList[0]
    await baseSetting(n, o, node)

    var d
    if (n.color != null) {
      node.querySelector('text').style.fill = n.color
    }
    if (n.frequency != null) {
      node.querySelector('feTurbulence').setAttribute('baseFrequency', n.frequency)
    }
    if (n.scale != null) {
      d = n.scale * -0.25
      node.querySelector('feDisplacementMap').setAttribute('scale', n.scale)
      return node.querySelector('text').setAttribute('transform', "translate(" + d + "," + d + ")")
    }
  },
  'vintage': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    var floods, convs, offset, matrix, res$, i$, to$, i, j$, to1$, j, order, d
    floods = node.querySelectorAll('feFlood')
    if (n.colorList[2] != null) {
      floods[0].setAttribute('flood-color', n.colorList[2] || n.extrusion)
    }
    if (n.colorList[3] != null) {
      floods[1].setAttribute('flood-color', n.colorList[3] || n.innerShadow)
    }
    if (n.colorList[0] !== o?.fill) {
      floods[2].setAttribute('flood-color', n.colorList[0] || n.fill)
    }
    if (n.colorList[4] != null) {
      floods[4].setAttribute('flood-color', n.colorList[4] || n.shadow)
    }
    if (n.colorList[1] !== o?.colorList?.[1]) {
      node.querySelectorAll('text')[1].setAttribute('stroke', n.colorList[1] || n.stroke)
    }
    if (n.depth != null) {
      convs = node.querySelectorAll('feConvolveMatrix')
      offset = node.querySelectorAll('feOffset')
      res$ = []
      for (i$ = 0, to$ = n.depth; i$ < to$; ++i$) {
        i = i$
        for (j$ = 0, to1$ = n.depth; j$ < to1$; ++j$) {
          j = j$
          if (i === j) {
            res$.push(1)
          } else {
            res$.push(0)
          }
        }
      }
      matrix = res$
      order = n.depth + "," + n.depth;
      [0, 2].map(function (it) {
        var x$, y$
        x$ = convs[it]
        x$.setAttribute('kernelMatrix', matrix)
        x$.setAttribute('order', order)
        y$ = offset[it]
        y$.setAttribute('dx', Math.ceil(n.depth * 0.5) * (it + 1))
        y$.setAttribute('dy', Math.ceil(n.depth * 0.5) * (it + 1))
        return y$
      })
      d = n.depth * -1
      return node.querySelector('g').setAttribute('transform', "translate(" + d + "," + d + ")")
    }
  },
  'outline': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.thick = n.thickness
    var angle, dx, dy, ref$, x1, y1, x2, y2, x$
    Array.from(node.querySelectorAll('stop')).map(function (d, i) {
      return d.setAttribute('stop-color', n["color" + (i + 1)])
    })
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180)
    dy = Math.sin(angle * Math.PI / 180)
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    if (n.thick != null) {
      return Array.from(node.querySelectorAll('feMorphology')).map(function (it) {
        return it.setAttribute('radius', n.thick)
      })
    }
  },
  'stripe-bk': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    var ref$, w, w2, s, d, code
    if (n.colorList[1] != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.colorList[1])
    }
    if (n.colorList[0] !== o?.colorList?.[0]) {
      node.querySelector('text').setAttribute('fill', n.colorList[0])
    }
    if (n.density != null) {
      ref$ = [n.density, n.density * 2, n.density * 0.25], w = ref$[0], w2 = ref$[1], s = ref$[2]
      d = ['M', -w, -w, 'L', w2, w2, 'M', -w2, -w, 'L', w, w2, 'M', -w, -w2, 'L', w2, w].join(' ')
      code = btoa("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"2000px\" height=\"1000px\"><defs><pattern id=\"pattern\" patternUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + w + "\"><path d=\"" + d + "\" stroke=\"#000\" stroke-width=\"" + s + "\"/></pattern></defs><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#pattern)\"/></svg>")
      return node.querySelector('feImage').setAttributeNS('http://www.w3.org/1999/xlink', 'href', "data:image/svg+xml;base64," + code)
    }
  },
  'reflect': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    var image, box, ref$, w, h, x1, y1, x2, y2, xc, yc
    image = node.querySelector('feImage')
    box = node.querySelector('text').getBBox()
    ref$ = [box.width, box.height], w = ref$[0], h = ref$[1]
    ref$ = [0, 0], x1 = ref$[0], y1 = ref$[1]
    ref$ = [box.width, box.height * 0.45], x2 = ref$[0], y2 = ref$[1]
    ref$ = [box.width * 0.5, box.height * 0.65], xc = ref$[0], yc = ref$[1]
    n.reflect = n.colorList[1]
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "data:image/svg+xml;base64," + btoa("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + w + "px\" height=\"" + h + "px\" viewBox=\"0 0 " + w + " " + h + "\">\n<defs>\n  <linearGradient id=\"reflect-gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">\n    <stop offset=\"0\" stop-color=\"" + n.reflect + "\" stop-opacity=\"0.0\"/>\n    <stop offset=\"0.3\" stop-color=\"" + n.reflect + "\" stop-opacity=\"0.0\"/>\n    <stop offset=\"1\" stop-color=\"" + n.reflect + "\" stop-opacity=\"0.9\"/>\n  </linearGradient>\n</defs>\n<path d=\"M" + x1 + " " + y1 + " L" + x1 + " " + y2 + " Q" + xc + " " + yc + " " + x2 + " " + y2 + " L" + x2 + " " + y1 + " Z\" fill=\"url(#reflect-gradient)\"/>\n</svg>"))
    if (n.colorList[1] != null) {
      Array.from(node.querySelectorAll('stop')).map(function (it) {
        return it.setAttribute('stop-color', n.colorList[1])
      })
    }
    if (n.colorList[0] !== o?.colorList?.[0]) {
      node.querySelector('text').setAttribute('fill', n.colorList[0])
    }
    if (n.colorList[2] != null) {
      return node.querySelector('feFlood').setAttribute('flood-color', n.colorList[2])
    }
  },
  'raise': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.color1)
    return node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.color2)
  },
  'offset': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    return Array.from(node.querySelectorAll('feFlood')).map(function (d, i) {
      if (i >= 3) {
        return
      }
      return d.setAttribute('flood-color', n["color" + (i + 1)])
    })
  },
  'goldstamp': async function (setting, o, node) {
    const n = { ...setting }
    n.fill = n.colorList[0]
    n.outline = n.colorList[1]
    await baseSetting(n, o, node)

    if (n.fill !== o?.fill) {
      node.querySelector('text').setAttribute('fill', n.fill)
    }
    if (n.outline != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.outline)
    }
    if (n.outlineWidth != null) {
      return node.querySelector('feMorphology').setAttribute('radius', n.outlineWidth)
    }
  },
  'halftone': async function (setting, o, node) {
    const n = { ...setting }
    n.size = n.dotSize
    n.spacing = n.dotSpacing
    await baseSetting(n, o, node)

    var r, p, d, c, x$, angle, dx, dy, ref$, x1, y1, x2, y2, y$
    Array.from(node.querySelectorAll('stop')).map(function (d, i) {
      if (n["color" + (3 - i)] != null) {
        return d.setAttribute('stop-color', n["color" + (3 - i)])
      }
    })
    r = n.size || 3
    p = n.spacing != null ? n.spacing : 1
    d = r * 2 + p
    c = r + p * 0.5
    x$ = node.querySelector('feImage')
    x$.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "data:image/svg+xml;base64," + btoa("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1000px\" height=\"1000px\">\n  <defs>\n    <pattern id=\"pattern\" patternUnits=\"userSpaceOnUse\" width=\"" + d + "\" height=\"" + d + "\">\n      <circle cx=\"" + c + "\" cy=\"" + c + "\" r=\"" + r + "\" fill=\"red\"/>\n    </pattern>\n  </defs>\n  <rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#pattern)\"/>\n</svg>"))
    x$.setAttribute('width', "1000px")
    x$.setAttribute('height', "1000px")
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 0.3
    dy = Math.sin(angle * Math.PI / 180) * 0.3
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    y$ = node.querySelector('linearGradient')
    y$.setAttribute('x1', x1)
    y$.setAttribute('y1', y1)
    y$.setAttribute('x2', x2)
    y$.setAttribute('y2', y2)
    return y$
  },
  'crystal': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.fill = n.colorList[0]
    n.stroke = n.colorList[1]
    n.innerShadow = n.colorList[2]
    n.reflect = n.colorList[3]
    var text
    if (n.fill != null) {
      node.querySelector('text').setAttribute('fill', n.fill)
    }
    if (n.stroke != null) {
      node.querySelector('text').setAttribute('stroke', n.stroke)
    }
    if (n.innerShadow != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.innerShadow)
    }
    if (n.reflect != null) {
      node.querySelector('feSpecularLighting').setAttribute('lighting-color', n.reflect)
    }
    text = node.querySelector('text')
    text.style.display = 'inline-block'
    return setTimeout(function () {
      return text.style.display = 'block'
    }, 0)
  },
  'golden': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.fill = n.colorList[0]
    n.shadow = n.colorList[2]
    n.reflect = n.colorList[1]
    var flood
    flood = Array.from(node.querySelectorAll('feFlood'))
    if (n.fill !== o?.fill) {
      node.querySelector('text').setAttribute('fill', n.fill)
    }
    if (n.shadow != null) {
      flood[0].setAttribute('flood-color', n.shadow)
    }
    if (n.reflect != null) {
      return flood[1].setAttribute('flood-color', n.reflect)
    }
  },
  'liquid': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    Array.from(node.querySelectorAll('feFlood')).map(function (d, i) {
      if (i >= 3) {
        return
      }
      if (n["color" + (i + 1)] != null) {
        return d.setAttribute('flood-color', n["color" + (i + 1)])
      }
    })
    if (n.seed != null) {
      return Array.from(node.querySelectorAll('*[seed]')).map(function (d, i) {
        return d.setAttribute('seed', n.seed + i)
      })
    }
  },
  'scratch': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)
    if (n.color1 != null) {
      node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.color1)
    }
    if (n.color2 != null) {
      node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.color2)
    }
    if (n.color3 !== o?.color3) {
      return node.querySelector('text').setAttribute('fill', n.color3)
    }
  },
  'neon': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.color = n.colorList[0]
    var c2
    if (n.color != null) {
      c2 = d3.hcl(n.color).brighter(3).hex()
      node.querySelector('text').setAttribute('stroke', c2)
      Array.from(node.querySelectorAll('feFlood')).map(function (d, i) {
        return d.setAttribute('flood-color', n.color)
      })
    }
    if (n.stroke != null) {
      return node.querySelector('text').setAttribute('stroke-width', n.stroke)
    }
  },
  'metal-beveled': async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.fill = n.colorList[0]
    n.light = n.colorList[1]
    if (n.light != null) {
      node.querySelector("feSpecularLighting").setAttribute('lighting-color', n.light)
    }
    if (n.fill !== o?.fill) {
      return node.querySelector("text").setAttribute('fill', n.fill)
    }
  },
  "stain": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.stroke = n.colorList[2]
    n.shadow = n.colorList[3]
    var flood, angle, dx, dy, ref$, x1, y1, x2, y2, x$
    Array.from(node.querySelectorAll('stop')).map(function (d, i) {
      if (n["color" + (i + 1)] != null) {
        return d.setAttribute('stop-color', n["color" + (i + 1)])
      }
    })
    flood = Array.from(node.querySelectorAll('feFlood'))
    if (n.stroke != null) {
      flood[0].setAttribute('flood-color', n.stroke)
    }
    if (n.shadow != null) {
      flood[1].setAttribute('flood-color', n.shadow)
    }
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 0.4
    dy = Math.sin(angle * Math.PI / 180) * 0.4
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    return x$
  },
  "metal": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

  },
  "marble": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.base = n.colorList[0]
    n.texture = n.colorList[1]
    var text
    if (n.base != null) {
      node.querySelector('text').setAttribute('fill', n.base)
    }
    if (n.texture != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.texture)
    }
    if (n.clarity != null) {
      node.querySelector('feGaussianBlur').setAttribute("stdDeviation", 5 - +n.clarity)
    }
    if (n.grain != null) {
      node.querySelector('feTurbulence').setAttribute("baseFrequency", n.grain)
    }
    if (n.scale != null) {
      node.querySelector('feDisplacementMap').setAttribute("scale", n.scale)
    }
    text = node.querySelector('text')
    text.style.display = 'inline-block'
    return setTimeout(function () {
      return text.style.display = 'block'
    }, 0)
  },
  "rainbow": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    var box, angle, dx, dy, ref$, x1, y1, x2, y2, x$
    Array.from(node.querySelectorAll('stop')).map(function (d, i) {
      return d.setAttribute('stop-color', n["color" + (i + 1)])
    })
    if (n.depth != null) {
      node.querySelector('feMorphology').setAttribute('radius', "1," + n.depth)
      node.querySelector('feOffset').setAttribute('dy', n.depth)
    }
    box = node.querySelector('text').getBBox()
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 0.5
    dy = Math.sin(angle * Math.PI / 180) * 0.5
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    return x$
  },
  "shadow": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.shadow = n.colorList[2]
    n.offsetx = n.offsetX
    n.offsety = n.offsetY
    var gradients, angle, dx, dy, ref$, x1, y1, x2, y2, x$
    gradients = node.querySelectorAll('linearGradient')
    Array.from(gradients[0].querySelectorAll('stop')).map(function (d, i) {
      return d.setAttribute('stop-color', n.shadow)
    })
    Array.from(gradients[1].querySelectorAll('stop')).map(function (d, i) {
      return d.setAttribute('stop-color', n["color" + (i + 1)])
    })
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180)
    dy = Math.sin(angle * Math.PI / 180)
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = gradients[1]
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    if (n.thick != null) {
      Array.from(node.querySelectorAll('feMorphology')).map(function (it) {
        return it.setAttribute('radius', n.thick)
      })
    }
    dx = -(n.fontSize || 64) * 0.3 + n.offsetx
    dy = n.offsety
    node.querySelectorAll('g')[1].setAttribute('transform', "translate(" + dx + ", " + dy + ")")
    return Array.from(node.querySelectorAll('feGaussianBlur')).map(function (d, i) {
      return d.setAttribute('stdDeviation', n.stddev / (i + 1))
    })
  },
  "gradow": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.shadow = n.colorList[2]
    var box, angle, dx, dy, ref$, x1, y1, x2, y2, x$
    Array.from(node.querySelectorAll('stop')).map(function (d, i) {
      return d.setAttribute('stop-color', n["color" + (i + 1)])
    })
    box = node.querySelector('text').getBBox()
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 0.5
    dy = Math.sin(angle * Math.PI / 180) * 0.5
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    if (n.shadow != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.shadow)
    }
    if (n.offsetX != null) {
      Array.from(node.querySelectorAll('feOffset')).map(function (d, i) {
        return d.setAttribute("dx", n.offsetX * (i
          ? 1
          : -1))
      })
    }
    if (n.offsetY != null) {
      return Array.from(node.querySelectorAll('feOffset')).map(function (d, i) {
        return d.setAttribute("dy", n.offsetY * (i
          ? 1
          : -1))
      })
    }
  },
  "gradient": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    var box, angle, dx, dy, ref$, x1, y1, x2, y2, x$
    Array.from(node.querySelectorAll('stop')).map(function (d, i) {
      return d.setAttribute('stop-color', n["color" + (i + 1)])
    })
    box = node.querySelector('text').getBBox()
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 0.5
    dy = Math.sin(angle * Math.PI / 180) * 0.5
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    return x$
  },
  "glowing": async function (setting, o, node) {
    const n = { ...setting }
    n.thick = n.thickness
    await baseSetting(n, o, node)

    var angle, dx, dy, ref$, x1, y1, x2, y2, x$
    Array.from(node.querySelectorAll('stop')).map(function (d, i) {
      return d.setAttribute('stop-color', n["color" + (i + 1)])
    })
    angle = n.direction || 0
    dx = Math.cos(angle * Math.PI / 180) * 0.5
    dy = Math.sin(angle * Math.PI / 180) * 0.5
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1]
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1]
    x$ = node.querySelector('linearGradient')
    x$.setAttribute('x1', x1)
    x$.setAttribute('y1', y1)
    x$.setAttribute('x2', x2)
    x$.setAttribute('y2', y2)
    if (n.thick != null) {
      return Array.from(node.querySelectorAll('feGaussianBlur')).map(function (it) {
        return it.setAttribute('stdDeviation', n.thick)
      })
    }
  },
  "crack": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.shadow = n.colorList[2]
    if (n.color2 !== o?.color2) {
      node.querySelector('text').setAttribute('fill', n.color2)
    }
    if (n.color1 != null) {
      node.querySelector('feSpecularLighting').setAttribute('lighting-color', n.color1)
    }
    if (n.shadow != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.shadow)
    }
    if (n.frequency != null) {
      return node.querySelector('feTurbulence').setAttribute('baseFrequency', n.frequency)
    }
  },
  "christmas": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    var density, ref$, w, w2, s, d
    density = n.density || 3
    ref$ = [density, density * 2, density * 0.25], w = ref$[0], w2 = ref$[1], s = ref$[2]
    d = ['M', -w, -w, 'L', w2, w2, 'M', -w2, -w, 'L', w, w2, 'M', -w, -w2, 'L', w2, w].join(' ')
    return node.querySelector('feImage').setAttributeNS('http://www.w3.org/1999/xlink', 'href', "data:image/svg+xml;base64," + btoa("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"2000px\" height=\"1000px\"><defs><pattern id=\"pattern\" patternUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + w + "\"><rect x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + w + "\" fill=\"" + n.color1 + "\"/><path d=\"" + d + "\" stroke=\"" + n.color2 + "\" stroke-width=\"" + s + "\"/></pattern></defs><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#pattern)\"/></svg>"))
  },
  "cake": async function (setting, o, node) {
    const n = { ...setting }
    await baseSetting(n, o, node)

    n.fill = n.colorList[0]
    n.shadow = n.colorList[1]
    n.side = n.colorList[2]
    var flood
    flood = Array.from(node.querySelectorAll('feFlood'))
    if (n.fill !== o?.fill) {
      node.querySelector('text').setAttribute('fill', n.fill)
    }
    if (n.shadow != null) {
      flood[0].setAttribute('flood-color', n.shadow)
    }
    if (n.side != null) {
      return flood[1].setAttribute('flood-color', n.side)
    }
  }
}
