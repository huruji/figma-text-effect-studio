import { TextEditorUtil, ResizeSVG, ReplaceSVGColors } from './editor-utils/editor-util'

const ONLINE = true;
var TEST_PROCESSING = !ONLINE && "lettering";

(function () {
  console.log('hhhhhhhhhh')
  let t = "letterSpacing" in CanvasRenderingContext2D.prototype;
  if (!t) {
    const e = CanvasRenderingContext2D.prototype.fillText;
    const i = CanvasRenderingContext2D.prototype.strokeText;
    const a = CanvasRenderingContext2D.prototype.measureText;
    const s = [].slice;
    CanvasRenderingContext2D.prototype.fillText = function () {
      const i = this;
      const a = arguments[0];
      const n = arguments[1];
      const o = arguments[2];
      const h = s.call(arguments, arguments.length);
      const l = a.match(/./gu);
      if (!l || l.length < 2 || t || parseInt(i.letterSpacing) === 0) {
        return e.apply(this, arguments);
      }
      const r = i.letterSpacing ? parseFloat(i.letterSpacing) : 0;
      let g = 0;
      l.forEach(function (t) {
        e.apply(i, [t, n + g, o].concat(h));
        g += i.measureText(t).width + r;
      });
    };
    CanvasRenderingContext2D.prototype.strokeText = function () {
      const e = this;
      const a = arguments[0];
      const n = arguments[1];
      const o = arguments[2];
      const h = s.call(arguments, arguments.length);
      const l = a.match(/./gu);
      if (!l || l.length < 2 || t || parseInt(e.letterSpacing) === 0) {
        return i.apply(this, arguments);
      }
      const r = e.letterSpacing ? parseFloat(e.letterSpacing) : 0;
      let g = 0;
      l.forEach(function (t) {
        i.apply(e, [t, n + g, o].concat(h));
        g += e.measureText(t).width + r;
      });
    };
    CanvasRenderingContext2D.prototype.measureText = function () {
      const e = this;
      const i = arguments[0];
      const n = s.call(arguments, arguments.length);
      const o = i.match(/./gu);
      if (!o || o.length < 2 || t || parseInt(e.letterSpacing) === 0) {
        return a.apply(this, arguments);
      }
      const h = e.letterSpacing ? parseFloat(e.letterSpacing) : 0;
      const l = a.apply(e, [i].concat(n));
      const r = {};
      for (const t in l) {
        r[t] = l[t];
      }
      let g = 0;
      o.forEach(function (t) {
        const i = a.apply(e, [t].concat(n));
        g += i.width;
      });
      const c = g - r.width;
      const d = (o.length - 1) * h + c;
      r.width += d;
      r.actualBoundingBoxRight += d;
      return r;
    };
  }
})();
export function TextEditor(canvas) {
  return {
    _0x4d9511: {
      editable: 1,
      text: "Canva",
      font: {
        size: 76,
        weight: "normal",
        name: "",
        src: "https://pub-b800a41f46484915a9433b0bb7a4f019.r2.dev/fonts/text-effect-studio/LEMON-MILK-Pro-Regular/LEMON-MILK-Pro-Regular.woff2"
      },
      align: "center",
      rotate: 0,
      lineHeight: 1,
      letterSpacing: 0,
      mergeGradients: 0,
      lettering: {
        editable: 1,
        active: 0,
        blendmode: "over",
        boggle: {
          active: 0,
          angle: 12,
          amplitude: 0.1
        },
        reverseOverlap: {
          letters: 1,
          lines: 0
        },
        shadow: {
          active: 0,
          size: 0.04,
          distance: 0.02,
          angle: 180,
          fill: {
            alpha: 1,
            color: {
              r: 0,
              g: 0,
              b: 0
            }
          }
        }
      },
      distort: {
        arc: {
          angle: 0
        }
      },
      fill: {
        editable: 1,
        active: 1,
        alpha: 1,
        color: {
          r: 255,
          g: 255,
          b: 255
        },
        texture: {
          active: 0,
          alpha: 1,
          blendmode: "over",
          src: null,
          repeat: "repeat",
          position: "left top",
          size: 1,
          lettering: 0
        },
        gradient: {
          active: 0,
          angle: -90,
          colors: [{
            r: 0,
            g: 0,
            b: 0,
            pos: 0
          }, {
            r: 255,
            g: 255,
            b: 255,
            pos: 1
          }]
        },
        palette: {
          active: 0,
          lettering: {
            method: "letter"
          },
          styles: []
        }
      },
      depth: {
        editable: 1,
        active: 0,
        length: 0.2,
        angle: 135,
        fill: {
          alpha: 1,
          color: {
            r: 255,
            g: 255,
            b: 255
          },
          mergeAlpha: 0,
          gradient: {
            active: 1,
            type: "depth",
            angle: -90,
            colors: [{
              r: 200,
              g: 200,
              b: 200,
              a: 1,
              pos: 0
            }, {
              r: 255,
              g: 255,
              b: 255,
              a: 1,
              pos: 1
            }]
          },
          texture: {
            active: 0,
            alpha: 1,
            blendmode: "over",
            src: null,
            repeat: "repeat",
            position: "center",
            size: 1
          }
        }
      },
      depth2: {
        editable: 1,
        active: 0,
        length: 0.2,
        angle: 135,
        fill: {
          alpha: 1,
          color: {
            r: 255,
            g: 255,
            b: 255
          },
          mergeAlpha: 0,
          gradient: {
            active: 1,
            type: "depth",
            angle: -90,
            colors: [{
              r: 200,
              g: 200,
              b: 200,
              a: 1,
              pos: 0
            }, {
              r: 255,
              g: 255,
              b: 255,
              a: 1,
              pos: 1
            }]
          },
          texture: {
            active: 0,
            alpha: 1,
            blendmode: "over",
            src: null,
            repeat: "repeat",
            position: "center",
            size: 1
          }
        }
      },
      outline: {
        first: {
          editable: 1,
          active: 0,
          width: 0.1,
          dash: 0,
          join: "round",
          fill: {
            alpha: 1,
            color: {
              r: 0,
              g: 0,
              b: 0
            },
            gradient: {
              active: 0,
              angle: -90,
              colors: [{
                r: 0,
                g: 0,
                b: 0,
                pos: 0
              }, {
                r: 255,
                g: 255,
                b: 255,
                pos: 1
              }]
            },
            palette: {
              active: 0,
              lettering: {
                method: "letter"
              },
              styles: []
            },
            texture: {
              active: 0,
              alpha: 1,
              blendmode: "over",
              src: null,
              repeat: "repeat",
              position: "center",
              size: 1,
              lettering: 0
            }
          }
        },
        second: {
          editable: 1,
          active: 0,
          width: 0.1,
          dash: 0,
          join: "round",
          fill: {
            alpha: 1,
            color: {
              r: 0,
              g: 0,
              b: 0
            },
            gradient: {
              active: 0,
              angle: -90,
              colors: [{
                r: 0,
                g: 0,
                b: 0,
                pos: 0
              }, {
                r: 255,
                g: 255,
                b: 255,
                pos: 1
              }]
            },
            palette: {
              active: 0,
              lettering: {
                method: "letter"
              },
              styles: []
            },
            texture: {
              active: 0,
              alpha: 1,
              blendmode: "over",
              src: null,
              repeat: "repeat",
              position: "center",
              size: 1,
              lettering: 0
            }
          }
        },
        global: {
          editable: 1,
          active: 0,
          width: 0.1,
          join: "round",
          mask: 0,
          projection: 1,
          shadow: {
            active: 0,
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 1
            },
            size: 0.5
          },
          fill: {
            alpha: 1,
            color: {
              r: 255,
              g: 255,
              b: 255
            },
            gradient: {
              active: 0,
              angle: -90,
              colors: [{
                r: 0,
                g: 0,
                b: 0,
                pos: 0
              }, {
                r: 255,
                g: 255,
                b: 255,
                pos: 1
              }]
            },
            texture: {
              active: 0,
              alpha: 1,
              blendmode: "over",
              src: null,
              repeat: "repeat",
              position: "center",
              size: 1
            }
          }
        },
        global2: {
          editable: 1,
          active: 0,
          width: 0.1,
          join: "round",
          mask: 0,
          projection: 0,
          shadow: {
            active: 0,
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 1
            },
            size: 0.5
          },
          fill: {
            alpha: 1,
            color: {
              r: 255,
              g: 255,
              b: 255
            },
            gradient: {
              active: 0,
              angle: -90,
              colors: [{
                r: 0,
                g: 0,
                b: 0,
                pos: 0
              }, {
                r: 255,
                g: 255,
                b: 255,
                pos: 1
              }]
            },
            texture: {
              active: 0,
              alpha: 1,
              blendmode: "over",
              src: null,
              repeat: "repeat",
              position: "center",
              size: 1
            }
          }
        }
      },
      bevel: {
        inner: {
          editable: 1,
          active: 0,
          size: 0.1,
          smoothing: 0,
          soften: 0.1,
          angle: 135,
          highlight: {
            alpha: 1,
            blendmode: "over",
            color: {
              r: 255,
              g: 255,
              b: 255
            }
          },
          shadow: {
            alpha: 1,
            blendmode: "over",
            color: {
              r: 0,
              g: 0,
              b: 0
            }
          }
        }
      },
      shadow: {
        outer: {
          editable: 1,
          active: 0,
          size: 0.2,
          strength: 0,
          mask: 0,
          distance: 0.1,
          angle: 135,
          fill: {
            alpha: 1,
            color: {
              r: 0,
              g: 0,
              b: 0
            },
            gradient: {
              editable: 1,
              active: 0,
              angle: -90,
              colors: [{
                r: 0,
                g: 0,
                b: 0,
                pos: 0
              }, {
                r: 255,
                g: 255,
                b: 255,
                pos: 1
              }]
            }
          }
        },
        outer2: {
          editable: 1,
          active: 0,
          size: 0.2,
          strength: 0,
          mask: 0,
          distance: 0.1,
          angle: 135,
          fill: {
            alpha: 1,
            color: {
              r: 0,
              g: 0,
              b: 255
            },
            gradient: {
              editable: 1,
              active: 0,
              angle: -90,
              colors: [{
                r: 0,
                g: 0,
                b: 255,
                pos: 0
              }, {
                r: 255,
                g: 255,
                b: 255,
                pos: 1
              }]
            }
          }
        },
        inner: {
          editable: 1,
          active: 0,
          size: 0.2,
          strength: 0,
          alpha: 1,
          color: {
            r: 0,
            g: 0,
            b: 0
          },
          distance: 0.03,
          angle: -45,
          offset: 0,
          erosion: {
            size: 0,
            vector: 1
          },
          blendmode: "over"
        },
        inner2: {
          editable: 1,
          active: 0,
          size: 0.2,
          strength: 0,
          alpha: 1,
          color: {
            r: 255,
            g: 255,
            b: 255
          },
          distance: 0.03,
          angle: 135,
          offset: 0,
          erosion: {
            size: 0,
            vector: 1
          },
          blendmode: "over"
        }
      },
      icon: {
        editable: 1,
        active: 0,
        alpha: 1,
        src: null,
        size: 1,
        rotate: 0,
        position: "left",
        composite: "source-over",
        offset: {
          x: 0,
          y: 0
        }
      },
      background: {
        editable: 1,
        active: 1,
        composite: "source-over",
        fill: {
          alpha: 1,
          color: {
            r: 0,
            g: 0,
            b: 0
          },
          image: {
            active: 0,
            alpha: 1,
            src: null,
            size: "cover",
            repeat: "repeat"
          },
          gradient: {
            active: 1,
            angle: 0,
            type: "radial",
            colors: [{
              r: 0,
              g: 211,
              b: 255,
              pos: 0
            }, {
              r: 0,
              g: 117,
              b: 255,
              pos: 1
            }]
          }
        }
      },
      animation: {
        editable: 1,
        active: 1,
        id: "",
        pause: 1000,
        duration: 1000
      }
    },
    _0x1a093a: {
      isPostTreatment: false,
      isBestQuality: false,
      drawBevel: true,
      drawDistort: true,
      drawShadowErosion: true,
      forceWaitOpenCV: false,
      forceWaitDistortScript: false,
      maxWidth: 4096,
      maxHeight: 4096
    },
    _0x314f1c: [],
    _0x166fc4: function (t) {
      this.canvas = t;
      t.getContext("2d", {
        willReadFrequently: true
      });
      return this;
    },
    _0x425280: {},
    on: function (t, e) {
      this._0x425280[t] = e;
    },
    draw: async function (t, e) {
      if (!this.config) {
        console.log("No text config defined!");
        return;
      }
      if (this.drawing) {
        return;
      }
      this.drawing = true;
      const i = [[116, 101, 120, 116, 115, 116, 117, 100, 105, 111, 46, 99, 111], [116, 101, 120, 116, 115, 116, 117, 100, 105, 111, 46, 99, 111, 109], [116, 101, 120, 116, 115, 116, 117, 100, 105, 111, 46, 102, 114], [108, 111, 99, 97, 108, 104, 111, 115, 116], [108, 111, 99, 97, 108, 104, 111, 115, 116, 46, 99, 111, 109], [49, 57, 50, 46, 49, 54, 56, 46]];
      const a = new URL(window.location.href);
      const href = window.location.href
      // console.log('href: ', href)
      let n = true;
      // https://w4ingg16g.wxp.adobe-addons.com/
      // if (href.toLowerCase().includes('adobe-addons'.toLowerCase())) {
      //   n = true
      // }
      if (!n) {
        return -1;
      }
      // for (s = 0; s < i.length; s++) {
      //   const t = String.fromCharCode.apply(null, i[s]);
      //   if (a.host.indexOf(t) !== -1) {
      //     n = true;
      //     break;
      //   }
      // }
      // if (!n) {
      //   return -1;
      // }
      const o = TextEditorUtil.cloneObject(this._0x1a093a);
      this.drawConfig = TextEditorUtil.mergeDeep(o, t);
      await this._0x118309(["beforeStart"], this.config);
      if (this._0x425280.beforeStart) {
        this._0x425280.beforeStart();
      }
      const h = this.config.text;
      this.texts = h.split("\n");
      this.textSpaces = [];
      for (let t = 0; t < this.texts.length; t++) {
        this.textSpaces.push({
          left: TextEditorUtil.countOccurrences(this.texts[t], " ", "left"),
          right: TextEditorUtil.countOccurrences(this.texts[t], " ", "right")
        });
      }
      this.texts = this.texts.map(function (t) {
        return t.trim();
      });
      this._0x1b0f99 = null;
      this._0x5fa4c8();
      this._0x460d5f = {
        x: 0,
        y: 0
      };
      this._0x59e014 = {
        x: 0,
        y: 0
      };
      this._0xc2db1c = {
        x: 0,
        y: 0
      };
      this._0x1fb5ee = {
        x: 0,
        y: 0
      };
      this._0x2e44d6 = false;
      this._0x47982e = false;
      this._0x4afb2d = [];
      this._0x3ecc34 = [];
      this.needPostTreatment = false;
      await this._0x176a21();
      if (this.drawConfig.forceWaitOpenCV) {
        await this._0x4bab6b();
      } else {
        this._0x4bab6b();
      }
      await this._0xf22e29();
      await this._0x54975d();
      if (this._0x151339.canvas.width < 1 || this._0x151339.canvas.height < 1) {
        this.canvas.width = 1;
        this.canvas.height = 1;
      } else {
        this.canvas.width = this._0x151339.canvas.width;
        this.canvas.height = this._0x151339.canvas.height;
      }
      if (!this.canvas.width || !this.canvas.height) {
        this._0x370f46(e);
        return;
      }
      if (this._0x425280.drawStart) {
        this._0x425280.drawStart();
      }
      await this._0x118309(["drawStart"], this.config);
      const l = this.config.processing?.alphabet?.glyphs?.length > 0;
      if (this._0x30883b()) {
        await this._0x5b400d();
      } else if (l) {
        await this._0x105a43();
      } else {
        if (this.config.processing?.createMasks !== 0) {
          this._0x1af5d8();
        }
        await this._0x244f48("first");
        await this._0x244f48("second");
        await this._0x4d1029();
      }
      if (!l) {
        await this._0x3ba17a(this.config.depth, 1);
        await this._0x422902(this.config.outline.global, 1);
        await this._0x3ba17a(this.config.depth2, 2);
        await this._0x422902(this.config.outline.global2, 2);
      }
      await this._0x118309(["beforeOuterShadow"], this.config);
      this._0x3cab61(this.config.shadow.outer, 1);
      this._0x3cab61(this.config.shadow.outer2, 2);
      this._0x3545e8();
      await this._0x118309(["beforeIcon"], this.config);
      this._0x22915a();
      await this._0x1fea45();
      this._0x41fd25();
      this._0x5fa4c8();
      await this._0x118309(["drawFinish"], this.config);
      this._0x370f46(e);
    },
    _0x370f46: function (t) {
      this.drawing = false;
      if (this._0x425280.drawFinish) {
        this._0x425280.drawFinish();
      }
      if (t) {
        t();
      }
    },
    _0x5fa4c8: function () {
      if (this._0x496883) {
        this._0x496883.width = this._0x496883.height = 0;
        this._0x496883 = null;
      }
      if (this._0x518a89) {
        this._0x518a89.width = this._0x518a89.height = 0;
        this._0x518a89 = null;
      }
      if (this._0x27d00d) {
        this._0x27d00d.width = this._0x27d00d.height = 0;
        this._0x27d00d = null;
      }
      if (this._0x1fbf4c) {
        this._0x1fbf4c.width = this._0x1fbf4c.height = 0;
        this._0x1fbf4c = null;
      }
      if (this._0x11efa2) {
        this._0x11efa2.width = this._0x11efa2.height = 0;
        this._0x11efa2 = null;
      }
      if (this._0x40db57) {
        this._0x40db57.width = this._0x40db57.height = 0;
        this._0x40db57 = null;
      }
      if (this._0x5d76ae) {
        this._0x5d76ae.width = this._0x5d76ae.height = 0;
        this._0x5d76ae = null;
      }
      if (this._0x38e62c) {
        this._0x38e62c.width = this._0x38e62c.height = 0;
        this._0x38e62c = null;
      }
      if (this._0xf18a74) {
        this._0xf18a74.width = this._0xf18a74.height = 0;
        this._0xf18a74 = null;
      }
      if (this._0x2e9563) {
        this._0x2e9563.width = this._0x2e9563.height = 0;
        this._0x2e9563 = null;
      }
      if (this._0x30bb9) {
        this._0x30bb9.width = this._0x30bb9.height = 0;
        this._0x30bb9 = null;
      }
      if (this._0x27dab4) {
        this._0x27dab4.width = this._0x27dab4.height = 0;
        this._0x27dab4 = null;
      }
      if (this._0x3aca81) {
        this._0x3aca81.width = this._0x3aca81.height = 0;
        this._0x3aca81 = null;
      }
      if (this._0x47ee64) {
        this._0x47ee64.width = this._0x47ee64.height = 0;
        this._0x47ee64 = null;
      }
      if (this._0x10b345) {
        this._0x10b345.width = this._0x10b345.height = 0;
        this._0x10b345 = null;
      }
      if (this._0xa53b23) {
        this._0xa53b23.width = this._0xa53b23.height = 0;
        this._0xa53b23 = null;
      }
      if (this._0x11acdc) {
        this._0x11acdc.width = this._0x11acdc.height = 0;
        this._0x11acdc = null;
      }
    },
    _0x4bab6b: function () {
      const t = this;
      return new Promise(e => {
        if (this.config.bevel && this.config.bevel.inner && this.config.bevel.inner.active === 1) {
          if (t.opencvLoading) {
            return;
          }
          if (typeof cv != "undefined") {
            t.opencvAvailable = true;
            e();
            return;
          }
          t.opencvLoading = true;
          if (t._0x425280.startLoadOpencv) {
            t._0x425280.startLoadOpencv();
          }
          loadScript(OPEN_CV_FILE_URL, true, async i => {
            if (i && cv instanceof Promise) {
              cv = await cv;
            }
            t.opencvAvailable = i;
            t.opencvLoading = false;
            if (t._0x425280.opencvLoaded) {
              t._0x425280.opencvLoaded(i);
            }
            e();
          });
        } else {
          e();
        }
      });
    },
    _0xd20eb4: function () {
      const t = this;
      return new Promise(e => {
        if (this.config.distort && this.config.distort.arc && this.config.distort.arc.angle !== 0) {
          if (t.distortScriptLoading) {
            return;
          }
          if (typeof lens != "undefined") {
            t.distortScriptAvailable = true;
            e();
            return;
          }
          t.distortScriptLoading = true;
          if (t._0x425280.startLoadDistortScript) {
            t._0x425280.startLoadDistortScript();
          }
          loadScript(DISTORT_SCRIPT_FILE_URL, true, async i => {
            t.distortScriptAvailable = i;
            t.distortScriptLoading = false;
            if (t._0x425280.distortScriptLoaded) {
              t._0x425280.distortScriptLoaded(i);
            }
            e();
          });
        } else {
          e();
        }
      });
    },
    _0x176a21: async function () {
      await TextEditorUtil.ready();
      let t = false;
      let e = this.getFontNameId();
      let i = this._0x8b4ce8(this.config.font.src);
      if (this._0x314f1c.indexOf(e) === -1) {
        this._0x314f1c.push(e);
        const a = this._0x30581d();
        if (a) {
          if (this._0x425280.fontLoading) {
            this._0x425280.fontLoading(e, this.config.font.name, i);
          }
          try {
            const i = new FontFace(e, a);
            await i.load();
            document.fonts.add(i);
            this._0x3ecc34.push(e);
            t = true;
          } catch (t) {
            console.log(t, a);
            this._0x3ecc34.push(false);
          }
        }
      } else {
        this._0x3ecc34.push(e);
      }
      if (this._0x425280.fontLoaded) {
        this._0x425280.fontLoaded(e, this.config.font.name, i, t);
      }
      if (this.config.processing && Array.isArray(this.config.processing.fonts)) {
        for (const t of this.config.processing.fonts) {
          e = this.getFontNameId(t);
          i = this._0x8b4ce8(t);
          if (this._0x314f1c.indexOf(e) === -1) {
            this._0x314f1c.push(e);
            const i = this._0x30581d(t);
            if (i) {
              try {
                const t = new FontFace(e, i);
                await t.load(t);
                document.fonts.add(t);
                this._0x3ecc34.push(e);
              } catch (t) {
                console.log(t, i);
                this._0x3ecc34.push(false);
              }
            }
          } else {
            this._0x3ecc34.push(e);
          }
        }
      }
    },
    _0x54975d: async function (t, e) {
      if (this.config.fill && this.config.fill.texture && this.config.fill.texture.src && this.config.fill.texture.active === 1) {
        this._0x496883 = await this._0x5a7b5f(this.config.fill.texture);
      }
      if (this.config.depth && this.config.depth.fill && this.config.depth.fill.texture && this.config.depth.fill.texture.src && this.config.depth.fill.texture.active === 1) {
        this._0x518a89 = await this._0x5a7b5f(this.config.depth.fill.texture);
      }
      if (this.config.depth2 && this.config.depth2.fill && this.config.depth2.fill.texture && this.config.depth2.fill.texture.src && this.config.depth2.fill.texture.active === 1) {
        this._0x27d00d = await this._0x5a7b5f(this.config.depth2.fill.texture);
      }
      if (this.config.outline.first && this.config.outline.first.fill && this.config.outline.first.fill.texture && this.config.outline.first.fill.texture.src && this.config.outline.first.fill.texture.active === 1) {
        this._0x1fbf4c = await this._0x5a7b5f(this.config.outline.first.fill.texture);
      }
      if (this.config.outline.second && this.config.outline.second.fill && this.config.outline.second.fill.texture && this.config.outline.second.fill.texture.src && this.config.outline.second.fill.texture.active === 1) {
        this._0x11efa2 = await this._0x5a7b5f(this.config.outline.second.fill.texture);
      }
      if (this.config.outline.global && this.config.outline.global.fill && this.config.outline.global.fill.texture && this.config.outline.global.fill.texture.src && this.config.outline.global.fill.texture.active === 1) {
        this._0x40db57 = await this._0x5a7b5f(this.config.outline.global.fill.texture);
      }
      if (this.config.outline.global2 && this.config.outline.global2.fill && this.config.outline.global2.fill.texture && this.config.outline.global2.fill.texture.src && this.config.outline.global2.fill.texture.active === 1) {
        this._0x5d76ae = await this._0x5a7b5f(this.config.outline.global2.fill.texture);
      }
      if (this.config.processing && Array.isArray(this.config.processing.images)) {
        const t = this.config.processing.images;
        const e = t.length;
        for (let i = 0; i < e; i++) {
          if (TextEditorUtil.isSvgFromDataURL(t[i])) {
            const e = new ResizeSVG();
            if (e.parse(t[i])) {
              const t = 1200;
              const i = t / e.height * e.width;
              e.resize(i, t);
              const a = e.getDataURL();
              const s = await TextEditorUtil.getImg(a);
              this._0x4afb2d.push(s);
            }
          } else {
            const e = await TextEditorUtil.getImg(t[i]);
            e.width = e.naturalWidth;
            e.height = e.naturalHeight;
            this._0x4afb2d.push(e);
          }
        }
      }
      if (this.config.icon.src && this.config.icon.active === 1) {
        if (TextEditorUtil.isSvgFromDataURL(this.config.icon.src)) {
          const t = new ResizeSVG();
          if (t.parse(this.config.icon.src)) {
            const e = this.config.icon.size * this.config.font.size;
            const i = e / t.height * t.width;
            t.resize(i, e);
            const a = t.getDataURL();
            this._0x34bd53 = await TextEditorUtil.getImg(a);
          }
        } else {
          this._0x34bd53 = await TextEditorUtil.getImg(this.config.icon.src);
        }
      }
    },
    _0x1af5d8: function () {
      const t = this._0x4a115f(this.config.outline.first);
      const e = this._0x4a115f(this.config.outline.second);
      let i;
      let a;
      this._0x38e62c = document.createElement("canvas");
      const s = this._0x38e62c.getContext("2d");
      this._0x38e62c.width = this.canvas.width;
      this._0x38e62c.height = this.canvas.height;
      s.save();
      this._0x4cc7f8(s);
      s.fillStyle = "#000000";
      s.globalAlpha = 1;
      for (let t = 0; t < this.texts.length; t++) {
        i = this._0x151339.texts[t].position;
        s.fillText(this.texts[t], i.x, i.y);
      }
      let n;
      s.globalAlpha = 1;
      if (this.config.outline.first.active === 1 && t > 0 || this.config.outline.second.active === 1 && e > 0) {
        this._0x30bb9 = document.createElement("canvas");
        this._0x30bb9.width = this._0x38e62c.width;
        this._0x30bb9.height = this._0x38e62c.height;
        n = this._0x30bb9.getContext("2d");
        n.save();
        n.globalCompositeOperation = "source-over";
        n.drawImage(this._0x38e62c, 0, 0);
      } else {
        this._0x30bb9 = TextEditorUtil.cloneCanvas(this._0x38e62c);
      }
      if (t > 0) {
        this._0xf18a74 = document.createElement("canvas");
        const e = this._0xf18a74.getContext("2d");
        this._0xf18a74.width = this.canvas.width;
        this._0xf18a74.height = this.canvas.height;
        e.save();
        this._0x4cc7f8(e);
        e.strokeStyle = "#000000";
        e.lineWidth = t;
        e.lineJoin = this.config.outline.first.join;
        e.miterLimit = 6;
        if (this.config.outline.first.dash > 0) {
          const t = this.config.outline.first.dash * this.config.font.size;
          e.setLineDash([t, t]);
        }
        for (a = 0; a < this.texts.length; a++) {
          i = this._0x151339.texts[a].position;
          e.strokeText(this.texts[a], i.x, i.y);
        }
        n.drawImage(this._0xf18a74, 0, 0);
        e.globalCompositeOperation = "destination-out";
        e.drawImage(this._0x38e62c, 0, 0, this._0x38e62c.width, this._0x38e62c.height);
        e.restore();
      }
      if (e > 0) {
        this._0x2e9563 = document.createElement("canvas");
        const s = this._0x2e9563.getContext("2d");
        this._0x2e9563.width = this.canvas.width;
        this._0x2e9563.height = this.canvas.height;
        s.save();
        this._0x4cc7f8(s);
        s.strokeStyle = "#000000";
        s.lineWidth = t + e;
        s.lineJoin = this.config.outline.second.join;
        s.miterLimit = 6;
        if (this.config.outline.second.dash > 0) {
          const t = this.config.outline.second.dash * this.config.font.size;
          s.setLineDash([t, t]);
        }
        for (a = 0; a < this.texts.length; a++) {
          i = this._0x151339.texts[a].position;
          s.strokeText(this.texts[a], i.x, i.y);
        }
        if (t > 0 && this.config.outline.first.active === 1) {
          s.globalCompositeOperation = "destination-out";
          s.drawImage(this._0x30bb9, 0, 0, this._0x30bb9.width, this._0x30bb9.height);
        } else {
          s.globalCompositeOperation = "destination-out";
          s.drawImage(this._0x38e62c, 0, 0, this._0x38e62c.width, this._0x38e62c.height);
        }
        n.globalCompositeOperation = "lighter";
        n.drawImage(this._0x2e9563, 0, 0);
        s.restore();
      }
      s.restore();
      if (n) {
        n.restore();
      }
    },
    _0x244f48: async function (t) {
      const e = this.config.outline[t];
      if (e.active !== 1) {
        return;
      }
      const i = this._0x4a115f(e);
      if (i === 0) {
        return;
      }
      const a = t === "first" ? this._0x1fbf4c : this._0x11efa2;
      const s = t === "first" ? this._0xf18a74 : this._0x2e9563;
      if (!s) {
        return;
      }
      const n = document.createElement("canvas");
      const o = n.getContext("2d");
      n.width = canvas.width;
      n.height = canvas.height;
      if (this._0x41b976(e)) {
        let n;
        let h = 1;
        if (this._0x463806()) {
          h = i * 0.23;
        }
        if (this._0x572ab1()) {
          if (t === "first") {
            let t = this._0x4a115f(this.config.outline.first);
            n = {
              x: this._0x151339.x - t / 2,
              y: this._0x151339.y - t / 2,
              w: this._0x151339.width + t,
              h: this._0x151339.height + t
            };
          } else {
            let t = this._0x4a115f(this.config.outline.second);
            if (this.config.outline.first.active === 1) {
              t += this._0x4a115f(this.config.outline.first);
            }
            n = {
              x: this._0x151339.x - t / 2,
              y: this._0x151339.y - t / 2,
              w: this._0x151339.width + t,
              h: this._0x151339.height + t
            };
          }
          n.x -= h;
          n.y -= h;
          n.w += h * 2;
          n.h += h * 2;
          TextEditorUtil.drawLinearGradient(o, n.x, n.y, n.w, n.h, e.fill.gradient.colors, e.fill.gradient.angle, e.fill.alpha);
        } else {
          for (let i = 0; i < this.texts.length; i++) {
            let a = this._0x151339.texts[i].boundingBox;
            if (!(a.width < 1) && !(a.height < 1)) {
              if (t === "first") {
                let t = this._0x4a115f(this.config.outline.first);
                n = {
                  x: a.x - t / 2,
                  y: a.y - t / 2,
                  w: a.width + t,
                  h: a.height + t
                };
              } else {
                let t = this._0x4a115f(this.config.outline.second);
                if (this.config.outline.first.active === 1) {
                  t += this._0x4a115f(this.config.outline.first);
                }
                n = {
                  x: a.x - t / 2,
                  y: a.y - t / 2,
                  w: a.width + t,
                  h: a.height + t
                };
              }
              n.x -= h;
              n.y -= h;
              n.w += h * 2;
              n.h += h * 2;
              TextEditorUtil.drawLinearGradient(o, n.x, n.y, n.w, n.h, e.fill.gradient.colors, e.fill.gradient.angle, e.fill.alpha);
            }
          }
        }
        if (a) {
          await this._0x334da7(o, a, null, e.fill.texture.blendmode, e.fill.texture.alpha, e.fill.texture.position, e.fill.texture.repeat, e.fill.texture.size);
          a.width = a.height = 0;
        }
        o.save();
        o.globalCompositeOperation = "destination-in";
        o.drawImage(s, 0, 0, s.width, s.height);
        o.restore();
      } else {
        const t = e.fill.color;
        o.save();
        o.fillStyle = "rgba(" + t.r + "," + t.g + "," + t.b + "," + e.fill.alpha + ")";
        o.fillRect(0, 0, n.width, n.height);
        o.restore();
        if (a) {
          await this._0x334da7(o, a, null, e.fill.texture.blendmode, e.fill.texture.alpha, e.fill.texture.position, e.fill.texture.repeat, e.fill.texture.size);
          a.width = a.height = 0;
        }
        o.save();
        o.globalCompositeOperation = "destination-in";
        o.drawImage(s, 0, 0, s.width, s.height);
        o.restore();
      }
      if (t === "first") {
        this._0x27dab4 = n;
      } else {
        this._0x3aca81 = n;
      }
      if (t === "first" && this._0xf18a74) {
        this._0xf18a74.width = this._0xf18a74.height = 0;
      }
      if (t === "second" && this._0x2e9563) {
        this._0x2e9563.width = this._0x2e9563.height = 0;
      }
    },
    _0x30883b: function () {
      return this.config.lettering && this.config.lettering.active === 1;
    },
    _0x5b400d: async function () {
      const t = this.config;
      const e = this.canvas.getContext("2d");
      const i = this._0x151339.texts;
      const a = document.createElement("canvas");
      const s = a.getContext("2d");
      let n;
      a.width = this.canvas.width;
      a.height = this.canvas.height;
      this._0x30bb9 = a;
      if (t.lettering.shadow.active === 1) {
        if (this._0x185e37(1) || this._0x185e37(2)) {
          this._0x11acdc = document.createElement("canvas");
          this._0x11acdc.width = this.canvas.width;
          this._0x11acdc.height = this.canvas.height;
          n = this._0x11acdc.getContext("2d");
          n.drawImage(this.canvas, 0, 0);
        }
      }
      const o = t.fill.palette.lettering.method;
      const h = t.outline.first.fill.palette.lettering.method;
      const l = t.outline.second.fill.palette.lettering.method;
      let r;
      let g;
      let c = t.fill.palette;
      r = c && c.active === 1 ? c.styles && c.styles.length > 0 ? c.styles : [{
        solid: t.fill.color
      }] : t.fill.gradient.active === 1 ? [{
        gradient: t.fill.gradient
      }] : [{
        solid: t.fill.color
      }];
      let d;
      let f = t.outline.first.fill.palette;
      g = f && f.active === 1 ? f.styles && f.styles.length > 0 ? f.styles : [{
        solid: t.outline.first.fill.color
      }] : t.outline.first.fill.gradient.active === 1 ? [{
        gradient: t.outline.first.fill.gradient
      }] : [{
        solid: t.outline.first.fill.color
      }];
      let u = t.outline.second.fill.palette;
      d = u && u.active === 1 ? u.styles && u.styles.length > 0 ? u.styles : [{
        solid: t.outline.second.fill.color
      }] : t.outline.second.fill.gradient.active === 1 ? [{
        gradient: t.outline.second.fill.gradient
      }] : [{
        solid: t.outline.second.fill.color
      }];
      let p = 0;
      let x = 0;
      let v = 0;
      let w = false;
      t: for (let t = 0; t < this.texts.length; t++) {
        if (o === "letter-line" || o === "word-line") {
          p = 0;
        }
        if (h === "letter-line" || h === "word-line") {
          x = 0;
        }
        if (l === "letter-line" || l === "word-line") {
          v = 0;
        }
        for (let e = 0; e < i[t].chars.length; e++) {
          const a = i[t].chars[e];
          if (!i[t].styles) {
            i[t].styles = [];
            i[t].outlineFirstStyles = [];
            i[t].outlineSecondStyles = [];
          }
          i[t].styles.push(r[p]);
          i[t].outlineFirstStyles.push(g[x]);
          i[t].outlineSecondStyles.push(d[v]);
          if (i[t].chars.length === 1 && /\s/.test(a.char)) {
            continue t;
          }
          if (/\s/.test(a.char) && !w) {
            if (o.startsWith("word")) {
              p++;
              if (p >= r.length) {
                p = 0;
              }
            }
            if (h.startsWith("word")) {
              x++;
              if (x >= g.length) {
                x = 0;
              }
            }
            if (l.startsWith("word")) {
              v++;
              if (v >= d.length) {
                v = 0;
              }
            }
          }
          if (/\s/.test(a.char)) {
            w = true;
          } else {
            w = false;
            if (o.startsWith("letter")) {
              p++;
              if (p >= r.length) {
                p = 0;
              }
            }
            if (h.startsWith("letter")) {
              x++;
              if (x >= g.length) {
                x = 0;
              }
            }
            if (l.startsWith("letter")) {
              v++;
              if (v >= d.length) {
                v = 0;
              }
            }
          }
        }
        if (o === "line" || o === "word") {
          p++;
          if (p >= r.length) {
            p = 0;
          }
        }
        if (h === "line" || h === "word") {
          x++;
          if (x >= g.length) {
            x = 0;
          }
        }
        if (l === "line" || l === "word") {
          v++;
          if (v >= d.length) {
            v = 0;
          }
        }
      }
      const m = this._0x4a115f(t.outline.first);
      const _0x505a5c = this._0x4a115f(t.outline.second);
      let b = document.createElement("canvas");
      const C = document.createElement("canvas");
      const y = C.getContext("2d");
      const S = document.createElement("canvas");
      const T = S.getContext("2d");
      let O;
      let M;
      let I;
      let k;
      let E;
      let L;
      let D;
      let F;
      if (m > 0) {
        O = document.createElement("canvas");
        M = O.getContext("2d");
        I = document.createElement("canvas");
        k = I.getContext("2d");
      }
      if (_0x505a5c > 0) {
        E = document.createElement("canvas");
        L = E.getContext("2d");
        D = document.createElement("canvas");
        F = D.getContext("2d");
      }
      const B = this.config.lettering.reverseOverlap.lines === 1;
      let z;
      let P = 0;
      for (let a = 0; a < i.length; a++) {
        z = B ? i.length - 1 - a : a;
        const o = i[z];
        const h = o.boundingBox;
        if (h.width < 1 || h.height < 1) {
          P++;
          continue;
        }
        let l;
        let r;
        let g;
        if (this._0x496883 && t.fill.texture.active === 1 && t.fill.texture.lettering === 0) {
          l = document.createElement("canvas");
          l.width = h.width + 1;
          l.height = h.height + 1;
          await this._0x334da7(l.getContext("2d"), this._0x496883, null, "over", 1, t.fill.texture.position, t.fill.texture.repeat, t.fill.texture.size);
        }
        if (this._0x1fbf4c && t.outline.first.fill.texture.active === 1 && t.outline.first.fill.texture.lettering === 0) {
          r = document.createElement("canvas");
          r.width = h.width + m + 1;
          r.height = h.height + m + 1;
          await this._0x334da7(r.getContext("2d"), this._0x1fbf4c, null, "over", 1, t.outline.first.fill.texture.position, t.outline.first.fill.texture.repeat, t.outline.first.fill.texture.size);
        }
        if (this._0x11efa2 && t.outline.second.fill.texture.active === 1 && t.outline.second.fill.texture.lettering === 0) {
          g = document.createElement("canvas");
          g.width = h.width + (m + _0x505a5c) + 1;
          g.height = h.height + (m + _0x505a5c) + 1;
          await this._0x334da7(g.getContext("2d"), this._0x11efa2, null, "over", 1, t.outline.second.fill.texture.position, t.outline.second.fill.texture.repeat, t.outline.second.fill.texture.size);
        }
        const c = this.config.lettering.reverseOverlap.letters === 1;
        const d = [];
        if (c) {
          for (let t = o.chars.length - 1; t >= 0; t--) {
            d.push(o.chars[t]);
          }
        } else {
          for (let t = 0; t < o.chars.length; t++) {
            d.push(o.chars[t]);
          }
        }
        for (let a = 0; a < d.length; a++) {
          const o = d[a];
          let f = b.getContext("2d");
          const u = c ? d.length - 1 - a : a;
          let p = i[z].styles[u];
          let x = (m + _0x505a5c) / 2;
          x += 2;
          if (x % 2 != 0) {
            x += 1;
          }
          const v = o.metrics.actualBoundingBoxLeft + x;
          const w = o.metrics.actualBoundingBoxAscent + x;
          b.width = o.boundingBox.width + x * 2;
          b.height = o.boundingBox.height + x * 2;
          C.width = b.width;
          C.height = b.height;
          S.width = b.width;
          S.height = b.height;
          y.save();
          this._0x4cc7f8(y);
          y.fillStyle = "black";
          y.fillText(o.char, v, w);
          y.restore();
          if (t.fill.active === 1) {
            const e = {
              x: Math.floor(x),
              y: Math.floor(x),
              width: o.boundingBox.width + 1,
              height: o.boundingBox.height + 1
            };
            f.save();
            const i = t.font.size * 0.05;
            if (p.gradient) {
              f.fillStyle = TextEditorUtil.getLinearGradient(f, e.x - i, e.y - i, e.width + i * 2, e.height + i * 2, p.gradient.colors, p.gradient.angle, t.fill.alpha);
            } else {
              let e = p.solid.a !== undefined ? p.solid.a : 1;
              e *= t.fill.alpha;
              f.fillStyle = "rgba(" + p.solid.r + "," + p.solid.g + "," + p.solid.b + "," + e + ")";
            }
            f.fillRect(e.x - i, e.y - i, e.width + i * 2, e.height + i * 2);
            f.restore();
          }
          if (l) {
            let e = t.fill.texture.blendmode;
            switch (e) {
              case "mask":
                e = "destination-out";
                break;
              case "over":
                e = "source-over";
            }
            let i = o.boundingBox.x - h.x;
            i = Math.ceil(-i + x);
            let a = o.boundingBox.y - h.y;
            a = Math.ceil(-a + x);
            f.save();
            f.globalAlpha = t.fill.texture.alpha;
            f.globalCompositeOperation = e;
            f.drawImage(l, i, a);
            f.restore();
          } else if (this._0x496883 && t.fill.texture.active === 1 && t.fill.texture.lettering === 1) {
            const e = {
              x: Math.floor(x),
              y: Math.floor(x),
              width: o.boundingBox.width + 1,
              height: o.boundingBox.height + 1
            };
            await this._0x334da7(f, this._0x496883, e, t.fill.texture.blendmode, t.fill.texture.alpha, t.fill.texture.position, t.fill.texture.repeat, t.fill.texture.size);
          }
          b = this._0x315187(b, C);
          b = await this._0x5766a1(b, C, "inner");
          b = await this._0x5766a1(b, C, "inner2");
          f = b.getContext("2d");
          f.save();
          f.globalCompositeOperation = "destination-in";
          f.drawImage(C, 0, 0);
          f.restore();
          T.drawImage(C, 0, 0);
          const B = c ? d.length - 1 - a : a;
          const U = i[z].outlineFirstStyles[B];
          if (m > 0) {
            I.width = b.width;
            I.height = b.height;
            k.save();
            this._0x4cc7f8(k);
            if (t.outline.first.dash > 0) {
              const e = t.outline.first.dash * t.font.size;
              k.setLineDash([e, e]);
            }
            k.lineWidth = m;
            k.lineJoin = t.outline.first.join;
            k.miterLimit = 6;
            k.strokeStyle = "black";
            k.strokeText(o.char, v, w);
            k.globalCompositeOperation = "destination-out";
            k.drawImage(C, 0, 0);
            k.restore();
            O.width = b.width;
            O.height = b.height;
            const e = {
              x: Math.floor(_0x505a5c / 2),
              y: Math.floor(_0x505a5c / 2),
              width: O.width - _0x505a5c,
              height: O.height - _0x505a5c
            };
            M.save();
            if (U.gradient) {
              M.fillStyle = TextEditorUtil.getLinearGradient(M, e.x, e.y, e.width, e.height, U.gradient.colors, U.gradient.angle, t.outline.first.fill.alpha);
            } else {
              let e = t.outline.first.fill.alpha;
              if (U.solid.a !== undefined) {
                e *= U.solid.a;
              }
              M.fillStyle = "rgba(" + U.solid.r + "," + U.solid.g + "," + U.solid.b + "," + e + ")";
            }
            M.fillRect(e.x, e.y, e.width, e.height);
            M.restore();
            if (r) {
              let e = t.outline.first.fill.texture.blendmode;
              switch (e) {
                case "mask":
                  e = "destination-out";
                  break;
                case "over":
                  e = "source-over";
              }
              let i = o.boundingBox.x - h.x;
              i = Math.ceil(-i + x - m / 2);
              let a = o.boundingBox.y - h.y;
              a = Math.ceil(-a + x - m / 2);
              M.save();
              M.globalAlpha = t.outline.first.fill.texture.alpha;
              M.globalCompositeOperation = e;
              M.drawImage(r, i, a);
              M.restore();
            } else if (this._0x1fbf4c && t.outline.first.fill.texture.active === 1 && t.outline.first.fill.texture.lettering === 1) {
              const e = {
                x: _0x505a5c / 2,
                y: _0x505a5c / 2,
                width: O.width - _0x505a5c,
                height: O.height - _0x505a5c
              };
              await this._0x334da7(M, this._0x1fbf4c, e, t.outline.first.fill.texture.blendmode, t.outline.first.fill.texture.alpha, t.outline.first.fill.texture.position, t.outline.first.fill.texture.repeat, t.outline.first.fill.texture.size);
            }
            M.save();
            M.globalCompositeOperation = "destination-in";
            M.drawImage(I, 0, 0);
            M.restore();
            T.drawImage(I, 0, 0);
            f.globalCompositeOperation = "lighter";
            f.drawImage(O, 0, 0);
            O.width = O.height = 0;
            I.width = I.height = 0;
          }
          const A = c ? d.length - 1 - a : a;
          const G = i[z].outlineSecondStyles[A];
          if (_0x505a5c > 0) {
            D.width = b.width;
            D.height = b.height;
            F.save();
            this._0x4cc7f8(F);
            if (t.outline.second.dash > 0) {
              const e = t.outline.second.dash * t.font.size;
              F.setLineDash([e, e]);
            }
            F.lineWidth = m + _0x505a5c;
            F.lineJoin = t.outline.second.join;
            F.miterLimit = 6;
            F.strokeStyle = "black";
            F.strokeText(o.char, v, w);
            F.globalCompositeOperation = "destination-out";
            F.fillText(o.char, v, w);
            if (m > 0) {
              F.setLineDash([]);
              F.lineWidth = m;
              F.lineJoin = t.outline.first.join;
              F.strokeText(o.char, v, w);
            }
            F.restore();
            E.width = b.width;
            E.height = b.height;
            L.save();
            if (G.gradient) {
              L.fillStyle = TextEditorUtil.getLinearGradient(L, 0, 0, E.width, E.height, G.gradient.colors, G.gradient.angle, t.outline.second.fill.alpha);
            } else {
              let e = t.outline.second.fill.alpha;
              if (G.solid.a !== undefined) {
                e *= G.solid.a;
              }
              L.fillStyle = "rgba(" + G.solid.r + "," + G.solid.g + "," + G.solid.b + "," + e + ")";
            }
            L.fillRect(0, 0, E.width, E.height);
            L.restore();
            if (g) {
              let e = t.outline.second.fill.texture.blendmode;
              switch (e) {
                case "mask":
                  e = "destination-out";
                  break;
                case "over":
                  e = "source-over";
              }
              let i = o.boundingBox.x - h.x;
              i = Math.ceil(-i + x - (m + _0x505a5c) / 2);
              let a = o.boundingBox.y - h.y;
              a = Math.ceil(-a + x - (m + _0x505a5c) / 2);
              L.save();
              L.globalAlpha = t.outline.second.fill.texture.alpha;
              L.globalCompositeOperation = e;
              L.drawImage(g, i, a);
              L.restore();
            } else if (this._0x11efa2 && t.outline.second.fill.texture.active === 1 && t.outline.second.fill.texture.lettering === 1) {
              const e = {
                x: 0,
                y: 0,
                width: E.width,
                height: E.height
              };
              await this._0x334da7(L, this._0x11efa2, e, t.outline.second.fill.texture.blendmode, t.outline.second.fill.texture.alpha, t.outline.second.fill.texture.position, t.outline.second.fill.texture.repeat, t.outline.second.fill.texture.size);
            }
            L.save();
            L.globalCompositeOperation = "destination-in";
            L.drawImage(D, 0, 0);
            L.restore();
            T.drawImage(D, 0, 0);
            f.globalCompositeOperation = "lighter";
            f.drawImage(E, 0, 0);
            E.width = E.height = 0;
          }
          let R = o.boundingBox.x - x;
          let W = o.boundingBox.y - x;
          e.save();
          s.save();
          if (n) {
            n.save();
          }
          const j = t.lettering.shadow.fill.color;
          const N = t.lettering.shadow.fill.alpha;
          const H = {
            blur: this._0x91c57a(t.lettering.shadow),
            offset: this._0xd008d0(t.lettering.shadow),
            color: "rgba(" + j.r + "," + j.g + "," + j.b + "," + N + ")"
          };
          if (t.lettering.shadow.active === 1) {
            e.shadowColor = H.color;
            e.shadowBlur = H.blur;
            e.shadowOffsetX = H.offset.x;
            e.shadowOffsetY = H.offset.y;
          }
          if (t.lettering.boggle.active === 1) {
            const i = t.lettering.boggle.amplitude * t.font.size;
            W += o.index % 2 == 0 ? 0 : i;
            const a = o.index % 2 == 0 ? -t.lettering.boggle.angle : t.lettering.boggle.angle;
            const h = Math.PI / 180 * a;
            const l = R + b.width / 2;
            const r = W + b.height / 2;
            e.translate(l, r);
            e.rotate(h);
            if (n) {
              n.translate(l, r);
              n.rotate(h);
            }
            s.translate(l, r);
            s.rotate(h);
            R = -b.width / 2;
            W = -b.height / 2;
          }
          let $ = false;
          if (this._0x337efa("drawLettering") || TEST_PROCESSING === "lettering") {
            $ = await this._0x118309(["drawLettering"], this.config, {
              ctx: e,
              charData: o,
              charCanvas: b,
              charMaskCanvas: C,
              charCanvasPadding: x,
              charDrawX: R,
              charDrawY: W,
              charStyle: p,
              charOutlineStyle: U,
              charOutlineSecondStyle: G,
              charShadow: H,
              processIndex: P
            });
          }
          if (!$) {
            let i = t.lettering.blendmode;
            if (t.lettering.blendmode === "over") {
              i = "source-over";
            }
            e.globalCompositeOperation = i;
            e.drawImage(b, R, W);
            if (n) {
              n.globalCompositeOperation = i;
              n.drawImage(b, R, W);
            }
          }
          s.drawImage(S, R, W);
          e.restore();
          s.restore();
          if (n) {
            n.restore();
          }
          S.width = S.height = 0;
          C.width = C.height = 0;
          b.width = b.height = 0;
          P++;
        }
        if (l) {
          l.width = l.height = 0;
        }
      }
      if (this._0x496883) {
        this._0x496883.width = this._0x496883.height = 0;
      }
      if (t.outline.global.shadow.active === 1 || t.outline.global2.shadow.active === 1) {
        this._0x10b345 = TextEditorUtil.cloneCanvas(this.canvas);
      }
      if (!!this.hasBoggle() && (t.outline.global.projection === 1 || t.outline.global2.projection === 1)) {
        this._0x38e62c = TextEditorUtil.cloneCanvas(a);
      }
    },
    _0x4d1029: async function () {
      if (!this._0x38e62c) {
        return;
      }
      const t = this.config.fill.color;
      let e;
      let i;
      if (this.config.fill.active === 1) {
        if (this._0x41b976(this.config)) {
          e = document.createElement("canvas");
          i = e.getContext("2d");
          e.width = this.canvas.width;
          e.height = this.canvas.height;
          if (this._0x572ab1()) {
            const t = this.config.font.size * 0.05;
            TextEditorUtil.drawLinearGradient(i, this._0x151339.x - t, this._0x151339.y - t, this._0x151339.width + t * 2, this._0x151339.height + t * 2, this.config.fill.gradient.colors, this.config.fill.gradient.angle, this.config.fill.alpha);
          } else {
            for (let t = 0; t < this.texts.length; t++) {
              let e = this._0x151339.texts[t].boundingBox;
              if (!(e.width < 1) && !(e.height < 1)) {
                TextEditorUtil.drawLinearGradient(i, e.x, e.y, e.width + 1, e.height + 1, this.config.fill.gradient.colors, this.config.fill.gradient.angle, this.config.fill.alpha);
              }
            }
          }
        } else {
          e = document.createElement("canvas");
          i = e.getContext("2d");
          e.width = this.canvas.width;
          e.height = this.canvas.height;
          i.save();
          i.fillStyle = "rgba(" + t.r + "," + t.g + "," + t.b + "," + this.config.fill.alpha + ")";
          i.fillRect(0, 0, e.width, e.height);
          i.restore();
        }
        if (this._0x496883 && this.config.fill.texture.active === 1) {
          if (this._0x572ab1()) {
            await this._0x334da7(i, this._0x496883, this._0x151339, this.config.fill.texture.blendmode, this.config.fill.texture.alpha, this.config.fill.texture.position, this.config.fill.texture.repeat, this.config.fill.texture.size);
          } else {
            for (let t = 0; t < this.texts.length; t++) {
              let e = this._0x151339.texts[t].boundingBox;
              if (!(e.width < 1) && !(e.height < 1)) {
                await this._0x334da7(i, this._0x496883, e, this.config.fill.texture.blendmode, this.config.fill.texture.alpha, this.config.fill.texture.position, this.config.fill.texture.repeat, this.config.fill.texture.size);
              }
            }
          }
          this._0x496883.width = this._0x496883.height = 0;
        }
      }
      e = this._0x315187(e, this._0x38e62c);
      e = await this._0x5766a1(e, this._0x38e62c, "inner");
      e = await this._0x5766a1(e, this._0x38e62c, "inner2");
      if (e) {
        i = e.getContext("2d");
        i.save();
        i.globalCompositeOperation = "destination-in";
        i.drawImage(this._0x38e62c, 0, 0);
        i.restore();
      }
      if (!this._0x1ac92f()) {
        this._0x38e62c.width = this._0x38e62c.height = 0;
      }
      this._0x446bc6(e);
    },
    _0x105a43: async function () {
      window.v = [84, 69, 88, 84, 83, 84, 85, 68, 73, 79, 46, 67, 79, 77, 32, 45, 32, 65, 76, 76, 32, 82, 73, 71, 72, 84, 83, 32, 82, 69, 83, 69, 82, 86, 69, 68];
      const {
        config: t
      } = this;
      const {
        processing: e
      } = t;
      const {
        alphabet: i
      } = e;
      const {
        glyphs: a
      } = i;
      const {
        kerningPairs: s
      } = i;
      const {
        undefinedIndex: n
      } = i;
      const {
        spaceWidthFactor: o
      } = i;
      const {
        kerningPairFactor: h
      } = i;
      const l = t => t.length > 1 && t.substring(0, 1) === "%" ? decodeURIComponent(t) : t;
      for (const t of a) {
        t.char = l(t.char);
      }
      if (s) {
        for (const t of s) {
          t[0] = l(t[0]);
          t[1] = l(t[1]);
        }
      }
      const r = this.canvas.getContext("2d");
      const g = this._0x4afb2d;
      const c = t.font.size;
      const d = t.text.split("\n");
      const f = d.length;
      const u = t.letterSpacing;
      const p = t.lineHeight;
      let x = [];
      const v = document.createElement("canvas");
      v.width = 5;
      v.height = 12;
      const w = t => {
        for (const e in a) {
          if (t === " ") {
            return {
              image: v,
              glyph: {
                char: " ",
                scale: o,
                baseline: 0
              }
            };
          }
          if (t === a[e].char) {
            return {
              char: a[e].char,
              image: g[e],
              glyph: a[e]
            };
          }
        }
        for (const e in a) {
          if (t.toUpperCase() === a[e].char || t.toLowerCase() === a[e].char) {
            return {
              char: a[e].char,
              image: g[e],
              glyph: a[e]
            };
          }
        }
        return false;
      };
      const m = (t, e) => {
        let i = 0;
        if (t && e && s) {
          for (const a of s) {
            if (t === a[0] && e === a[1] || a[3] === 1 && t === a[1] && e === a[0]) {
              i += c * (a[2] * h);
              break;
            }
          }
        }
        return i;
      };
      const _0x10a826 = [];
      for (let t = 0; t < f; t++) {
        let e = d[t].normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/./gu);
        if (!e || e.length < 1) {
          e = [" "];
        }
        let i = t * c;
        i += (p - 1) * c * t;
        const s = e.length;
        let o;
        let h = 0;
        let l = 0;
        for (let r = 0; r < s; r++) {
          let s = w(e[r]);
          if (!s) {
            s = w(a[n]?.char ?? a[0].char);
          }
          /^\s$/.test(s.char);
          const g = m(o, s.char);
          const d = c * s.glyph.scale;
          const f = d / s.image.height * s.image.width;
          let p = l + g;
          let v = i + (c - d) + c * s.glyph.baseline;
          const b = s.glyph.scale - s.glyph.baseline;
          if (b > 1) {
            _0x10a826[t] = Math.max((b - 1) * c, _0x10a826[t] ?? 0);
          }
          x.push({
            char: s.char,
            x: p,
            y: v,
            width: f,
            height: d,
            lineCharIndex: h,
            lineIndex: t,
            charData: s
          });
          l += f + parseInt(u * c) + g;
          h++;
          o = s.char;
        }
      }
      const b = [];
      for (let t = 0; t < f; t++) {
        if (b[t] === undefined) {
          b[t] = 0;
        }
        if (t > 0) {
          b[t] += b[t - 1];
        }
        if (_0x10a826[t] !== undefined) {
          b[t] += _0x10a826[t];
        }
      }
      for (const t of x) {
        if (b[t.lineIndex] !== undefined) {
          t.y += b[t.lineIndex];
        }
      }
      let C = [];
      let y = [];
      for (const t of x) {
        const e = t.x + t.width;
        if (!C[t.lineIndex] || e > C[t.lineIndex]) {
          C[t.lineIndex] = e;
        }
        const i = t.y + t.height;
        if (!y[t.lineIndex] || i > y[t.lineIndex]) {
          y[t.lineIndex] = i;
        }
      }
      const S = this._0x4931f4();
      const T = Math.ceil(Math.max(...C));
      const O = Math.ceil(Math.max(...y));
      canvas.width = T + S.x * 2;
      canvas.height = O + S.y * 2;
      if (t?.lettering?.reverseOverlap?.letters === 1) {
        x = x.reverse();
      }
      for (const e of x) {
        const i = e?.charData?.image;
        if (!i) {
          continue;
        }
        let a = e.x + S.x;
        let s = e.y + S.y;
        switch (t.align) {
          case "left":
            break;
          case "right":
            a += T - C[e.lineIndex];
            break;
          default:
            a += (T - C[e.lineIndex]) / 2;
        }
        r.drawImage(i, 0, 0, i.width, i.height, a, s, e.width, e.height);
      }
    },
    _0x5a7b5f: async function (t) {
      let e = t.src;
      const i = 400;
      const a = t.size.toString().indexOf("stretch") !== -1;
      const s = document.createElement("canvas");
      const n = s.getContext("2d");
      if (TextEditorUtil.isSvgFromDataURL(e)) {
        const t = new ResizeSVG();
        if (!t.parse(e)) {
          return s;
        }
        let o;
        let h;
        const l = t.width;
        const r = t.height;
        if (a) {
          const t = Math.max(this._0x151339.width / l, this._0x151339.height / r, 1);
          o = l * t;
          h = r * t;
        } else {
          let t = 1;
          if (l > i || r > i) {
            t = Math.min(i / l, i / r);
          }
          const e = this.config.font.size / 300;
          o = Math.round(l * t * e);
          h = Math.round(r * t * e);
        }
        if (o < 1) {
          o = 1;
        }
        if (h < 1) {
          h = 1;
        }
        t.resize(o, h);
        e = t.getDataURL();
        const g = await TextEditorUtil.getImg(e);
        if (g) {
          s.width = g.naturalWidth;
          s.height = g.naturalHeight;
          n.drawImage(g, 0, 0);
          return s;
        } else {
          return s;
        }
      }
      {
        const t = await TextEditorUtil.getImg(e);
        if (!t) {
          return s;
        }
        let o;
        let h;
        const l = t.naturalWidth;
        const r = t.naturalHeight;
        if (a) {
          o = l;
          h = r;
        } else {
          let t = 1;
          if (l > i || r > i) {
            t = Math.min(i / l, i / r);
          }
          const e = this.config.font.size / 300;
          o = Math.floor(l * t * e);
          h = Math.floor(r * t * e);
        }
        if (o < 1) {
          o = 1;
        }
        if (h < 1) {
          h = 1;
        }
        s.width = o;
        s.height = h;
        n.drawImage(t, 0, 0, l, r, 0, 0, o, h);
        return s;
      }
    },
    _0x334da7: async function (t, e, i = null, a = "over", s = 1, n = "center", o = "repeat", h = 1) {
      let l;
      let r = e.width;
      let g = e.height;
      let c = false;
      if (i) {
        (i = TextEditorUtil.cloneObject(i)).x -= 1;
        i.y -= 1;
        i.width += 2;
        i.height += 2;
        l = i;
      } else {
        l = {
          x: 0,
          y: 0,
          width: t.canvas.width,
          height: t.canvas.height
        };
      }
      let d;
      let f = a;
      switch (f) {
        case "mask":
          f = "destination-out";
          break;
        case "over":
          f = "source-over";
      }
      if (h === "stretch") {
        if (this.drawConfig.isBestQuality) {
          const t = document.createElement("canvas");
          t.width = Math.max(1, l.width);
          t.height = Math.max(1, l.height);
          await TextEditorUtil.bestResize(e, t);
          e = t;
        }
        t.save();
        t.globalCompositeOperation = f;
        t.globalAlpha = s;
        t.drawImage(e, l.x, l.y, l.width, l.height);
        t.restore();
        if (this.drawConfig.isBestQuality) {
          e.width = e.height = 0;
        }
        return;
      }
      if (h === "stretch-y") {
        const t = Math.max(1, l.height);
        const i = Math.max(1, t / g * r);
        const a = document.createElement("canvas");
        a.width = i;
        a.height = t;
        if (this.drawConfig.isBestQuality) {
          await TextEditorUtil.bestResize(e, a);
        } else {
          a.getContext("2d").drawImage(e, 0, 0, i, t);
        }
        e = a;
        r = i;
        g = t;
        c = true;
      } else if (h === "stretch-x") {
        const t = Math.max(1, l.width);
        const i = Math.max(1, t / r * g);
        const a = document.createElement("canvas");
        a.width = t;
        a.height = i;
        if (this.drawConfig.isBestQuality) {
          await TextEditorUtil.bestResize(e, a);
        } else {
          a.getContext("2d").drawImage(e, 0, 0, t, i);
        }
        e = a;
        r = t;
        g = i;
        c = true;
      } else if (!isNaN(h) && h !== 1) {
        const t = Math.max(1, r * h);
        const i = Math.max(1, g * h);
        const a = document.createElement("canvas");
        a.width = t;
        a.height = i;
        if (this.drawConfig.isBestQuality) {
          await TextEditorUtil.bestResize(e, a);
        } else {
          a.getContext("2d").drawImage(e, 0, 0, t, i);
        }
        e = a;
        r = t;
        g = i;
        c = true;
      }
      const u = n.trim().split(" ");
      d = u.length > 1 ? {
        x: u[0],
        y: u[1]
      } : {
        x: u[0],
        y: "center"
      };
      if (l.width < 1 || l.height < 1) {
        if (c) {
          e.width = e.height = 0;
        }
        return;
      }
      let p;
      let x = l.width !== t.canvas.width || l.height !== t.canvas.height || l.x !== 0 || l.y !== 0;
      if (x) {
        p = document.createElement("canvas");
        p.width = l.width;
        p.height = l.height;
      } else {
        p = t.canvas;
      }
      l = {
        x: 0,
        y: 0,
        width: p.width,
        height: p.height
      };
      if (d.x === "center") {
        if (o === "repeat-y" || o === "no-repeat") {
          l.x = (p.width - r) / 2;
          l.width = r;
        } else {
          const t = p.width / 2;
          const e = t - (Math.ceil(t / r) * r + r / 2);
          const i = Math.ceil(p.width / r) * r + Math.abs(e);
          l.x = e;
          l.width = i;
        }
      } else if (d.x === "right") {
        if (o === "repeat-y" || o === "no-repeat") {
          l.x = p.width - r;
          l.width = r;
        } else {
          const t = p.width;
          const e = t - (Math.ceil(t / r) * r + r);
          const i = Math.ceil(p.width / r) * r + Math.abs(e);
          l.x = e;
          l.width = i;
        }
      } else if (d.x === "left") {
        if (o === "repeat-y" || o === "no-repeat") {
          l.x = 0;
          l.width = r;
        } else {
          const t = 0;
          const e = t - Math.ceil(t / r) * r;
          const i = Math.ceil(p.width / r) * r + Math.abs(e);
          l.x = e;
          l.width = i;
        }
      }
      if (d.y === "center") {
        if (o === "repeat-x" || o === "no-repeat") {
          l.y = (p.height - g) / 2;
          l.height = g;
        } else {
          const t = p.height / 2;
          const e = t - (Math.ceil(t / g) * g + g / 2);
          const i = Math.ceil(p.height / g) * g + Math.abs(e);
          l.y = e;
          l.height = i;
        }
      } else if (d.y === "bottom") {
        if (o === "repeat-x" || o === "no-repeat") {
          l.y = p.height - g;
          l.height = g;
        } else {
          const t = p.height;
          const e = t - (Math.ceil(t / g) * g + g);
          const i = Math.ceil(p.height / g) * g + Math.abs(e);
          l.y = e;
          l.height = i;
        }
      } else if (d.y === "top") {
        if (o === "repeat-x" || o === "no-repeat") {
          l.y = 0;
          l.height = g;
        } else {
          const t = 0;
          const e = t - Math.ceil(t / g) * g;
          const i = Math.ceil(p.height / g) * g + Math.abs(e);
          l.y = e;
          l.height = i;
        }
      }
      if (o === "repeat-x" || o === "repeat") {
        if (l.x !== Math.round(l.x)) {
          l.x = Math.floor(l.x);
          l.width = Math.floor(l.width) + 2;
        }
        if (l.width !== Math.round(l.width)) {
          l.width = Math.ceil(l.width);
        }
      }
      if (o === "repeat-y" || o === "repeat") {
        if (l.y !== Math.round(l.y)) {
          l.y = Math.floor(l.y);
          l.height = Math.floor(l.height) + 2;
        }
        if (l.height !== Math.round(l.height)) {
          l.height = Math.ceil(l.height);
        }
      }
      const v = p.getContext("2d");
      v.save();
      v.setTransform(1, 0, 0, 1, l.x, l.y);
      const w = v.createPattern(e, "repeat");
      v.fillStyle = w;
      if (!x) {
        v.globalCompositeOperation = f;
        v.globalAlpha = s;
      }
      v.fillRect(0, 0, l.width, l.height);
      v.restore();
      if (x) {
        t.save();
        t.globalCompositeOperation = f;
        t.globalAlpha = s;
        t.drawImage(p, i.x, i.y);
        t.restore();
        p.width = p.height = 0;
      }
      if (c) {
        e.width = e.height = 0;
      }
    },
    _0x446bc6: function (t) {
      const e = this.canvas.getContext("2d");
      e.save();
      if (this._0x27dab4 || this._0x3aca81) {
        const i = document.createElement("canvas");
        const a = i.getContext("2d");
        i.width = this.canvas.width;
        i.height = this.canvas.height;
        if (t) {
          a.drawImage(t, 0, 0, t.width, t.height);
        }
        if (this._0x27dab4) {
          a.globalCompositeOperation = "lighter";
          a.drawImage(this._0x27dab4, 0, 0, this._0x27dab4.width, this._0x27dab4.height);
          if (!this._0x1ac92f()) {
            this._0x27dab4.width = this._0x27dab4.height = 0;
          }
        }
        if (this._0x3aca81) {
          a.globalCompositeOperation = "lighter";
          a.drawImage(this._0x3aca81, 0, 0, this._0x3aca81.width, this._0x3aca81.height);
          if (!this._0x1ac92f()) {
            this._0x3aca81.width = this._0x3aca81.height = 0;
          }
        }
        e.globalCompositeOperation = "source-over";
        e.drawImage(i, 0, 0, i.width, i.height);
        i.width = i.height = 0;
      } else if (t) {
        e.globalCompositeOperation = "source-over";
        e.drawImage(t, 0, 0, t.width, t.height);
      }
      e.restore();
      if (this.config.outline.global.shadow.active === 1 || this.config.outline.global2.shadow.active === 1) {
        this._0x10b345 = TextEditorUtil.cloneCanvas(this.canvas);
      }
    },
    _0x315187: function (t, e) {
      window.m = [84, 69, 88, 84, 83, 84, 85, 68, 73, 79, 46, 67, 79, 77, 32, 45, 32, 65, 76, 76, 32, 82, 73, 71, 72, 84, 83, 32, 82, 69, 83, 69, 82, 86, 69, 68];
      if (TextEditorUtil.pathResolve("config.bevel.inner.active", this) !== 1) {
        return t;
      }
      if (!this.drawConfig.drawBevel && !this.drawConfig.isPostTreatment) {
        this.needPostTreatment = true;
        return t;
      }
      if (!this.opencvAvailable) {
        return t;
      }
      if (!t) {
        (t = document.createElement("canvas")).width = e.width;
        t.height = e.height;
      }
      const i = function (t) {
        switch (t) {
          case "mask":
            return "destination-out";
          case "over":
            return "source-over";
          default:
            return t;
        }
      };
      const a = Math.ceil(this.config.bevel.inner.size * (this.config.font.size / 3));
      const s = Math.ceil(this.config.bevel.inner.soften * (this.config.font.size / 3));
      const n = this.config.bevel.inner.smoothing === 1;
      const o = this.config.bevel.inner.angle;
      const h = {
        r: this.config.bevel.inner.highlight.color.r,
        g: this.config.bevel.inner.highlight.color.g,
        b: this.config.bevel.inner.highlight.color.b,
        a: this.config.bevel.inner.highlight.alpha,
        composite: i(this.config.bevel.inner.highlight.blendmode)
      };
      const l = {
        r: this.config.bevel.inner.shadow.color.r,
        g: this.config.bevel.inner.shadow.color.g,
        b: this.config.bevel.inner.shadow.color.b,
        a: this.config.bevel.inner.shadow.alpha,
        composite: i(this.config.bevel.inner.shadow.blendmode)
      };
      BevelEffect(e, t, this.drawConfig.isPostTreatment, a, s, n, o, h, l, false);
      if (!this.drawConfig.isPostTreatment) {
        this.needPostTreatment = true;
      }
      return t;
    },
    _0x5766a1: async function (t, e, i) {
      const a = TextEditorUtil.pathResolve("config.shadow." + i, this);
      if (a.active !== 1) {
        return t;
      }
      const s = this._0x44449c(i);
      const n = a.color || {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      };
      const o = this._0x4f4667(i);
      const h = a.strength || 0;
      const l = s.y > 0 ? Math.ceil(s.y) : 0;
      const r = s.x < 0 ? Math.ceil(Math.abs(s.x)) : 0;
      const g = s.y < 0 ? Math.ceil(Math.abs(s.y)) : 0;
      const c = s.x > 0 ? Math.ceil(s.x) : 0;
      let d = false;
      let f = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      };
      if (a.offset !== undefined) {
        const t = Math.round(this.config.font.size * a.offset);
        d = t > 0;
        if (d) {
          const e = (a.angle * -1 + 180) % 360;
          const i = {
            x: t * Math.cos(TextEditorUtil.degrad(e)),
            y: t * Math.sin(TextEditorUtil.degrad(e))
          };
          s.x += i.x;
          s.y += i.y;
          f = {
            top: i.y > 0 ? Math.ceil(i.y) : 0,
            right: i.x < 0 ? Math.ceil(Math.abs(i.x)) : 0,
            bottom: i.y < 0 ? Math.ceil(Math.abs(i.y)) : 0,
            left: i.x > 0 ? Math.ceil(i.x) : 0
          };
        }
      }
      let u = false;
      if (a.erosion !== undefined) {
        let erodeSize = a.erosion.size / 2 * a.distance * this.config.font.size;
        u = erodeSize > 0;
      }
      let p = e.width;
      p += c + r;
      p += f.left + f.right;
      let x = e.height;
      x += l + g;
      x += f.top + f.bottom;
      let v = document.createElement("canvas");
      let w = v.getContext("2d", {
        willReadFrequently: true
      });
      v.width = p;
      v.height = x;
      w.save();
      w.globalCompositeOperation = "source-over";
      w.drawImage(e, c + f.left, l + f.top);
      w.fillStyle = "black";
      w.globalCompositeOperation = "source-out";
      w.fillRect(0, 0, v.width, v.height);
      w.restore();
      if (d || u) {
        w.save();
        w.globalCompositeOperation = "destination-in";
        w.drawImage(e, f.left + r, f.top + g);
        w.restore();
      }
      if (u) {
        w.save();
        const t = document.createElement("canvas");
        const e = t.getContext("2d");
        t.width = v.width;
        t.height = v.height;
        e.fillRect(0, 0, t.width, t.height);
        e.globalCompositeOperation = "destination-out";
        e.drawImage(v, 0, 0);
        w.globalCompositeOperation = "destination-out";
        for (let e = 0; e < 360; e++) {
          w.drawImage(t, Math.sin(e) * erodeSize, Math.cos(e) * erodeSize);
        }
        t.width = t.height = 0;
        if (a.erosion.vector === 1) {
          if (this.drawConfig.isPostTreatment) {
            w.fillStyle = "white";
            w.globalCompositeOperation = "destination-over";
            w.fillRect(0, 0, v.width, v.height);
            Potrace.setCanvas(v);
            Potrace.setParameter({
              alphamax: 0.75
            });
            Potrace.process();
            const t = Potrace.getSVG(1);
            Potrace.clear();
            const e = new DOMParser().parseFromString(t, "image/svg+xml").querySelector("path").getAttribute("d");
            if (typeof e == "string" && e.trim() !== "") {
              const t = new Path2D(e);
              w.globalCompositeOperation = "copy";
              w.fillStyle = "black";
              w.fill(t);
            } else {
              w.clearRect(0, 0, v.width, v.height);
            }
          } else {
            this.needPostTreatment = true;
          }
        }
        w.restore();
      }
      if (o > 0) {
        StackBlur.canvasRGBA(v, 0, 0, v.width, v.height, o);
      }
      w.globalCompositeOperation = "source-atop";
      w.fillStyle = "rgb(" + n.r + "," + n.g + "," + n.b + ")";
      w.fillRect(0, 0, v.width, v.height);
      if (h > 0) {
        const t = document.createElement("canvas");
        const e = t.getContext("2d");
        t.width = v.width;
        t.height = v.height;
        e.globalCompositeOperation = "source-over";
        for (let t = 0; t < h + 1; t++) {
          e.drawImage(v, 0, 0);
        }
        v.width = v.height = 0;
        v = t;
        w = v.getContext("2d", {
          willReadFrequently: true
        });
      }
      if (a.alpha !== 1) {
        w.globalAlpha = a.alpha;
        w.globalCompositeOperation = "copy";
        w.drawImage(v, 0, 0);
        w.globalAlpha = 1;
      }
      if (!t) {
        (t = document.createElement("canvas")).width = e.width;
        t.height = e.height;
      }
      let m = a.blendmode;
      switch (m) {
        case "mask":
          m = "destination-out";
          break;
        case "over":
          m = "source-over";
      }
      const _0x356df2 = t.getContext("2d");
      _0x356df2.save();
      _0x356df2.globalCompositeOperation = m;
      _0x356df2.drawImage(v, s.x - c - f.left, s.y - l - f.top);
      _0x356df2.restore();
      v.width = v.height = 0;
      return t;
    },
    _0x456f39: function (t) {
      const e = [];
      let i = this._0x4a115f(this.config.outline.first) + this._0x4a115f(this.config.outline.second);
      if (t === 2) {
        i += this._0x4a115f(this.config.outline.global);
      }
      let a = 1;
      if (this._0x463806()) {
        a += i * 0.4;
      }
      if (this.hasBoggle()) {
        a += this.config.font.size * 0.14;
      }
      let s = false;
      let n = false;
      if (t === 2 && this.config.outline.global.projection !== 1 && this.config.outline.global.fill.alpha < 1) {
        let t = this.config.depth.angle;
        t = (t * -1 + 180) % 360;
        if (t > 90 && t < 270) {
          s = true;
        }
        if (t > 180 && t < 360) {
          n = true;
        }
      }
      if (this._0x572ab1()) {
        const o = {
          x: this._0x151339.x - i / 2,
          y: this._0x151339.y - i / 2,
          width: this._0x151339.width + i,
          height: this._0x151339.height + i
        };
        if (t === 2) {
          const t = this._0x3292cc(this.config.depth, this.config.outline.global.projection === 1);
          o.x -= t.left;
          o.y -= t.top;
          o.width += t.right;
          o.height += t.bottom;
        }
        if (s) {
          o.width += this._0x151339.x + this._0x151339.width + i / 2 - (o.x + o.width);
        }
        if (n) {
          o.height += this._0x151339.y + this._0x151339.height + i / 2 - (o.y + o.height);
        }
        o.x -= a;
        o.y -= a;
        o.width += a * 2;
        o.height += a * 2;
        e.push(o);
      } else {
        let o;
        if (t === 2) {
          o = this._0x3292cc(this.config.depth, this.config.outline.global.projection === 1);
        }
        for (let h = 0; h < this.texts.length; h++) {
          let l = this._0x151339.texts[h].boundingBox;
          if (l.width < 1 || l.height < 1) {
            continue;
          }
          const r = {
            x: l.x - i / 2,
            y: l.y - i / 2,
            width: l.width + i,
            height: l.height + i
          };
          if (t === 2) {
            r.x -= o.left;
            r.y -= o.top;
            r.width += o.right;
            r.height += o.bottom;
          }
          if (s) {
            r.width += l.x + l.width + i / 2 - (r.x + r.width);
          }
          if (n) {
            r.height += l.y + l.height + i / 2 - (r.y + r.height);
          }
          r.x -= a;
          r.y -= a;
          r.width += a * 2;
          r.height += a * 2;
          e.push(r);
        }
      }
      for (let t = 0; t < e.length; t++) {
        const i = e[t];
        i.x -= 1;
        i.y -= 1;
        i.width += 2;
        i.height += 2;
      }
      return e;
    },
    _0x3ba17a: async function (t, e) {
      if (t.active === 0) {
        return;
      }
      let i = this._0x40975e(t);
      if (i === 0) {
        return;
      }
      this.config;
      const a = document.createElement("canvas");
      const s = a.getContext("2d");
      a.width = this.canvas.width;
      a.height = this.canvas.height;
      let n = t.fill.mergeAlpha;
      const o = t.fill.color;
      let h;
      let l;
      let r;
      let g;
      if (this._0x41b976(t) && t.fill.gradient.type === "depth") {
        r = document.createElement("canvas");
        g = r.getContext("2d");
        r.width = this.canvas.width;
        r.height = this.canvas.height;
      } else {
        h = document.createElement("canvas");
        h.width = this.canvas.width;
        h.height = this.canvas.height;
        l = h.getContext("2d");
        if (e === 2 && this._0x47ee64) {
          l.drawImage(this._0x47ee64, 0, 0, this._0x47ee64.width, this._0x47ee64.height);
        } else if (this.config.fill.active === 0) {
          if (this._0x30bb9) {
            l.drawImage(this._0x30bb9, 0, 0, this._0x30bb9.width, this._0x30bb9.height);
            l.save();
            l.globalCompositeOperation = "source-in";
            l.fillStyle = "rgb(" + o.r + "," + o.g + "," + o.b + ")";
            l.fillRect(0, 0, h.width, h.height);
            l.restore();
          }
        } else {
          const t = this._0x11acdc ? this._0x11acdc : this.canvas;
          l.drawImage(t, 0, 0, t.width, t.height);
        }
        const i = this._0x456f39(e);
        for (let e = 0; e < i.length; e++) {
          let a;
          if (this._0x41b976(t) && t.fill.gradient.type === "linear") {
            a = TextEditorUtil.getLinearGradient(l, i[e].x, i[e].y, i[e].width, i[e].height, t.fill.gradient.colors, t.fill.gradient.angle, t.fill.alpha);
          } else {
            const t = o.a !== undefined ? o.a : 1;
            a = "rgba(" + o.r + "," + o.g + "," + o.b + "," + t + ")";
          }
          l.globalCompositeOperation = "source-atop";
          l.fillStyle = a;
          l.globalAlpha = 1 - n;
          l.fillRect(i[e].x, i[e].y, i[e].width, i[e].height);
        }
      }
      let c = {
        x: 1,
        y: 0
      };
      let d = c.x;
      let f = c.y;
      let u = t.angle;
      u = (u * -1 + 180) % 360;
      c.x = d * Math.cos(TextEditorUtil.degrad(u)) - f * Math.sin(TextEditorUtil.degrad(u));
      c.y = d * Math.sin(TextEditorUtil.degrad(u)) + f * Math.cos(TextEditorUtil.degrad(u));
      if (this._0x2e44d6) {
        this._0x1fb5ee = {
          x: -c.x * i,
          y: -c.y * i
        };
        this._0x59e014 = {
          x: c.x * i,
          y: c.y * i
        };
      } else {
        this._0xc2db1c = {
          x: -c.x * i,
          y: -c.y * i
        };
        this._0x460d5f = {
          x: c.x * i,
          y: c.y * i
        };
      }
      if (e === 1 && this.config.outline.global.active === 1 && this.config.depth2.active === 1 && this._0x40975e(this.config.depth2) > 0) {
        this._0x47ee64 = TextEditorUtil.cloneCanvas(a);
      }
      s.translate(c.x * i, c.y * i);
      for (let l = 0; l < i - 1; l++) {
        s.translate(-c.x, -c.y);
        if (h) {
          s.drawImage(h, 0, 0, h.width, h.height);
        } else {
          const i = this._0x21a894(l, t);
          const a = (i.a !== undefined ? i.a : 1) * (1 - n);
          let h;
          let c;
          g.globalCompositeOperation = "source-over";
          g.clearRect(0, 0, r.width, r.height);
          if (e === 1 && this.config.fill.active === 0) {
            h = this._0x30bb9;
            c = true;
          } else {
            h = e === 2 && this._0x47ee64 ? this._0x47ee64 : this._0x11acdc ? this._0x11acdc : this.canvas;
          }
          if (!h) {
            break;
          }
          g.globalCompositeOperation = "source-over";
          g.drawImage(h, 0, 0, this.canvas.width, this.canvas.height);
          if (c) {
            g.globalAlpha = 1;
            g.globalCompositeOperation = "source-in";
            g.fillStyle = "rgb(" + o.r + "," + o.g + "," + o.b + ")";
            g.fillRect(0, 0, r.width, r.height);
          }
          if (i.a !== undefined) {
            i.a;
          }
          g.globalCompositeOperation = "source-atop";
          g.fillStyle = "rgba(" + i.r + "," + i.g + "," + i.b + "," + a + ")";
          g.fillRect(0, 0, r.width, r.height);
          s.drawImage(r, 0, 0, r.width, r.height);
        }
        if (e === 1 && this.config.outline.global.active === 0 && this.config.depth2.active === 1 && this._0x40975e(this.config.depth2) > 0 && l === 0) {
          this._0x47ee64 = TextEditorUtil.cloneCanvas(a);
        }
      }
      const p = e === 2 ? this._0x27d00d : this._0x518a89;
      const x = p && t.fill.texture && t.fill.texture.active === 1;
      const v = !x || t.fill.texture.blendmode === "source-over" && t.fill.alpha === 1 ? null : TextEditorUtil.cloneCanvas(a);
      if (this._0x30bb9) {
        this._0x30bb9.getContext("2d").drawImage(a, 0, 0);
      }
      if (t.fill.alpha < 1) {
        s.save();
        s.globalCompositeOperation = "copy";
        s.globalAlpha = t.fill.alpha;
        s.drawImage(a, 0, 0);
        s.restore();
      }
      if (x) {
        const e = document.createElement("canvas");
        const i = e.getContext("2d");
        e.width = a.width;
        e.height = a.height;
        await this._0x334da7(i, p, null, "over", t.fill.texture.alpha, t.fill.texture.position, t.fill.texture.repeat, t.fill.texture.size);
        p.width = p.height = 0;
        s.save();
        if (["over", "source-over"].indexOf(t.fill.texture.blendmode) !== -1) {
          if (t.fill.alpha === 1) {
            s.globalCompositeOperation = "source-atop";
            s.drawImage(e, 0, 0);
          } else {
            s.globalCompositeOperation = "source-over";
            s.drawImage(e, 0, 0);
            s.globalCompositeOperation = "destination-in";
            s.drawImage(v, 0, 0);
          }
        } else if (t.fill.texture.blendmode === "mask") {
          s.globalCompositeOperation = "destination-out";
          s.drawImage(e, 0, 0);
        } else {
          const i = TextEditorUtil.cloneCanvas(a);
          s.globalCompositeOperation = "copy";
          s.drawImage(e, 0, 0);
          s.globalCompositeOperation = t.fill.texture.blendmode;
          s.drawImage(i, 0, 0);
          s.globalCompositeOperation = "destination-in";
          s.drawImage(v, 0, 0);
          i.width = i.height = 0;
        }
        s.restore();
        e.width = e.height = 0;
      }
      const w = this.canvas.getContext("2d");
      w.save();
      w.globalCompositeOperation = "destination-over";
      w.drawImage(a, 0, 0);
      w.restore();
      if (v) {
        v.width = v.height = 0;
      }
      if (a) {
        a.width = a.height = 0;
      }
      if (h) {
        h.width = h.height = 0;
      }
      if (r) {
        r.width = r.height = 0;
      }
      if (e === 2 && this._0x47ee64) {
        this._0x47ee64.width = this._0x47ee64.height = 0;
      }
      if (this._0x11acdc) {
        this._0x11acdc.width = this._0x11acdc.height = 0;
      }
      this._0x2e44d6 = true;
    },
    hasBoggle: function () {
      return this._0x30883b() && this.config.lettering.boggle.active === 1;
    },
    _0x185e37(t) {
      const {
        config: e
      } = this;
      const i = t === 1 ? "depth" : "depth2";
      return e[i].active !== 0 && this._0x40975e(e[i]) > 0;
    },
    _0x1c4349(t) {
      const {
        config: e
      } = this;
      const i = t === 1 ? "global" : "global2";
      return e.outline[i].active !== 0;
    },
    _0x422902: async function (t, e) {
      if (t.active !== 1) {
        return;
      }
      const {
        config: i
      } = this;
      const a = this.hasBoggle();
      const s = this._0x185e37(1) || this._0x185e37(2);
      const n = Math.floor(this._0x4a115f(t) / 2);
      const o = t.projection;
      const h = e === 1 ? this._0x40db57 : this._0x5d76ae;
      let l;
      let r;
      let g;
      let c = false;
      g = a && o === 1 ? this._0x38e62c : this._0x30bb9;
      if (!g) {
        return;
      }
      if (s && o !== 1 || a) {
        c = n !== 0;
        l = document.createElement("canvas");
        r = l.getContext("2d");
        l.width = this._0x30bb9.width;
        l.height = this._0x30bb9.height;
        r.save();
        if (a && o === 1) {
          let t = 0;
          let e = 0;
          t += this._0x460d5f.x;
          e += this._0x460d5f.y;
          t += this._0x59e014.x;
          e += this._0x59e014.y;
          r.translate(t, e);
        }
        r.drawImage(g, 0, 0);
        r.restore();
      } else {
        let e = this._0x4a115f(i.outline.first) + this._0x4a115f(i.outline.second) + n * 2;
        if (this._0x47982e) {
          e += this._0x4a115f(i.outline.global);
        }
        l = document.createElement("canvas");
        r = l.getContext("2d");
        l.width = this.canvas.width;
        l.height = this.canvas.height;
        this._0x4cc7f8(r);
        r.fillStyle = "#000000";
        r.strokeStyle = "#000000";
        r.lineWidth = e;
        r.lineJoin = t.join;
        r.miterLimit = 6;
        let a = 0;
        let s = 0;
        a += this._0x460d5f.x;
        s += this._0x460d5f.y;
        a += this._0x59e014.x;
        s += this._0x59e014.y;
        for (let t = 0; t < this.texts.length; t++) {
          let {
            x: e,
            y: i
          } = this._0x151339.texts[t].position;
          e += a;
          i += s;
          r.strokeText(this.texts[t], e, i);
          r.fillText(this.texts[t], e, i);
        }
      }
      if (c) {
        r.save();
        r.globalCompositeOperation = "source-in";
        r.fillStyle = "black";
        r.fillRect(0, 0, l.width, l.height);
        r.globalCompositeOperation = "destination-over";
        r.fillStyle = "white";
        r.fillRect(0, 0, l.width, l.height);
        Potrace.setCanvas(l);
        Potrace.setParameter({
          optcurve: 1,
          alphamax: 1
        });
        Potrace.process();
        const t = Potrace.getSVG(1);
        const e = new DOMParser().parseFromString(t, "image/svg+xml").querySelector("path").getAttribute("d");
        const s = new Path2D(e);
        let o = n * 2;
        if (a && this._0x47982e && i.outline.global.active === 1 && i.outline.global2.projection === 1) {
          o += this._0x4a115f(i.outline.global);
        }
        Potrace.clear();
        r.globalCompositeOperation = "copy";
        r.lineJoin = "round";
        r.lineCap = "round";
        r.lineWidth = o;
        r.strokeStyle = "black";
        r.stroke(s);
        r.globalCompositeOperation = "source-over";
        r.fillStyle = "black";
        r.fill(s);
        r.restore();
      }
      if (!this._0x47982e && i.outline.global2.active === 1 && i.outline.global2.shadow.active === 1) {
        this._0xa53b23 = TextEditorUtil.cloneCanvas(l);
      }
      let d;
      let f = document.createElement("canvas");
      let u = f.getContext("2d");
      f.width = l.width;
      f.height = l.height;
      if (this._0x47ee64) {
        d = this._0x47ee64.getContext("2d");
      }
      if (this._0x41b976(t)) {
        let e;
        let s;
        let n = this._0x4a115f(i.outline.first) / 2 + this._0x4a115f(i.outline.second) / 2 + this._0x4a115f(t) / 2;
        if (this._0x47982e) {
          n += this._0x4a115f(i.outline.global) / 2;
        }
        n = Math.ceil(n);
        if (this._0x185e37(1) || this._0x185e37(2)) {
          const e = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          };
          const a = t.projection === 1;
          if (this._0x185e37(1)) {
            const t = this._0x3292cc(i.depth, a);
            e.top += t.top;
            e.right += t.right;
            e.bottom += t.bottom;
            e.left += t.left;
          }
          if (this._0x185e37(2)) {
            const t = this._0x3292cc(i.depth2, a);
            e.top += t.top;
            e.right += t.right;
            e.bottom += t.bottom;
            e.left += t.left;
          }
          if (a) {
            let {
              x: t,
              y: e
            } = this._0xc2db1c;
            t += this._0x1fb5ee.x;
            e += this._0x1fb5ee.y;
            s = {
              x: t,
              y: e,
              w: 0,
              h: 0
            };
          } else {
            s = {
              x: e.left,
              y: e.top,
              w: e.left + e.right,
              h: e.top + e.bottom
            };
          }
        } else {
          s = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
          };
        }
        if (this._0x572ab1() || a) {
          e = {
            x: this._0x151339.x - n - s.x,
            y: this._0x151339.y - n - s.y,
            w: this._0x151339.width + n * 2 + s.w,
            h: this._0x151339.height + n * 2 + s.h
          };
          e.x -= n * 0.45;
          e.y -= n * 0.45;
          e.w += n * 0.9;
          e.h += n * 0.9;
          if (a && i.lettering.boggle.angle !== 0) {
            const t = this._0x151339.width * 0.2;
            e.x -= t;
            e.w += t * 2;
          }
          TextEditorUtil.drawLinearGradient(u, e.x, e.y, e.w, e.h, t.fill.gradient.colors, t.fill.gradient.angle, t.fill.alpha);
          if (d) {
            TextEditorUtil.drawLinearGradient(d, e.x, e.y, e.w, e.h, t.fill.gradient.colors, t.fill.gradient.angle, 1);
          }
        } else {
          for (let i = 0; i < this.texts.length; i++) {
            let a = this._0x151339.texts[i].boundingBox;
            if (!(a.width < 1) && !(a.height < 1)) {
              e = {
                x: a.x - n - s.x,
                y: a.y - n - s.y,
                w: a.width + n * 2 + s.w,
                h: a.height + n * 2 + s.h
              };
              if (this._0x463806()) {
                e.x -= n * 0.45;
                e.y -= n * 0.45;
                e.w += n * 0.9;
                e.h += n * 0.9;
              }
              TextEditorUtil.drawLinearGradient(u, e.x, e.y, e.w, e.h, t.fill.gradient.colors, t.fill.gradient.angle, t.fill.alpha);
              if (d) {
                TextEditorUtil.drawLinearGradient(d, e.x, e.y, e.w, e.h, t.fill.gradient.colors, t.fill.gradient.angle, 1);
              }
            }
          }
        }
        if (h) {
          await this._0x334da7(u, h, null, t.fill.texture.blendmode, t.fill.texture.alpha, t.fill.texture.position, t.fill.texture.repeat, t.fill.texture.size);
          if (d) {
            await this._0x334da7(d, h, null, t.fill.texture.blendmode, t.fill.texture.alpha, t.fill.texture.position, t.fill.texture.repeat, t.fill.texture.size);
          }
          h.width = h.height = 0;
        }
      } else {
        const e = t.fill.color;
        u.save();
        u.fillStyle = "rgba(" + e.r + "," + e.g + "," + e.b + "," + t.fill.alpha + ")";
        u.fillRect(0, 0, f.width, f.height);
        u.restore();
        if (d) {
          const t = this._0x47ee64.getContext("2d");
          const e = this.config.outline.global.fill.color;
          t.save();
          t.fillStyle = "rgba(" + e.r + "," + e.g + "," + e.b + ",1)";
          t.fillRect(0, 0, t.canvas.width, t.canvas.height);
          t.restore();
        }
        if (h) {
          await this._0x334da7(u, h, null, t.fill.texture.blendmode, t.fill.texture.alpha, t.fill.texture.position, t.fill.texture.repeat, t.fill.texture.size);
          if (d) {
            await this._0x334da7(d, h, null, t.fill.texture.blendmode, t.fill.texture.alpha, t.fill.texture.position, t.fill.texture.repeat, t.fill.texture.size);
          }
          h.width = h.height = 0;
        }
      }
      if (d) {
        d.save();
        d.globalCompositeOperation = "destination-in";
        d.drawImage(l, 0, 0);
        d.restore();
      }
      u.save();
      u.globalCompositeOperation = "destination-in";
      u.drawImage(l, 0, 0);
      u.restore();
      if (t.mask === 1 && this._0x30bb9) {
        u.save();
        u.globalCompositeOperation = "destination-out";
        u.drawImage(this._0x30bb9, 0, 0);
        u.restore();
      }
      if (t.shadow.active === 1) {
        let e;
        let i = 0;
        let a = 0;
        e = this._0x47982e ? this._0xa53b23 : this._0x10b345;
        i += this._0x460d5f.x;
        a += this._0x460d5f.y;
        i += this._0x59e014.x;
        a += this._0x59e014.y;
        if (this._0x47982e && this._0x185e37(1) && this._0x185e37(2) || this._0x47982e && this._0x1c4349(1) && this._0x1c4349(2) && this._0x185e37(1) && !this._0x185e37(2)) {
          i -= this._0x460d5f.x;
          a -= this._0x460d5f.y;
        }
        const {
          r: s,
          g: o,
          b: h,
          a: r
        } = t.shadow.color;
        u.save();
        u.shadowColor = "rgb(" + s + "," + o + "," + h + "," + r + ")";
        u.shadowBlur = Math.max(0, n * t.shadow.size);
        u.shadowOffsetX = l.width + 10;
        u.shadowOffsetY = l.height + 10;
        u.globalCompositeOperation = "source-atop";
        u.drawImage(e, 0 - this.canvas.width - 10 + i, 0 - this.canvas.height - 10 + a);
        u.restore();
        e.width = e.height = 0;
      }
      if (this._0x30bb9) {
        const t = this._0x30bb9.getContext("2d");
        t.globalCompositeOperation = "lighter";
        t.drawImage(l, 0, 0);
      }
      if (this._0x11acdc) {
        const t = this._0x11acdc.getContext("2d");
        t.globalCompositeOperation = "lighter";
        t.drawImage(f, 0, 0);
      }
      const p = this.canvas.getContext("2d");
      p.save();
      p.globalCompositeOperation = "destination-over";
      p.drawImage(f, 0, 0, f.width, f.height);
      p.restore();
      f.width = f.height = 0;
      if (a && this._0x38e62c && this._0x47982e) {
        this._0x38e62c.width = this._0x38e62c.height = 0;
      }
      this._0x47982e = true;
    },
    _0xd4f4b: function (t) {
      let e = [];
      if (!this._0x41b976(t) || this._0x572ab1()) {
        e.push(this._0x151339);
      } else {
        const t = this._0x3292cc(this.config.depth, this.config.outline.global.projection === 1);
        const i = this._0x3292cc(this.config.depth2, false);
        let a;
        for (let s = 0; s < this.texts.length; s++) {
          a = TextEditorUtil.cloneObject(this._0x151339.texts[s].boundingBox);
          a.x -= t.left + i.left;
          a.y -= t.top + i.top;
          a.width += t.right + i.right;
          a.height += t.bottom + i.bottom;
          e.push(a);
        }
      }
      return e;
    },
    _0x4532b9: function (t) {
      if (t <= 0) {
        return 0;
      }
      return TextEditorUtil.exponentialCurve(10, 1, 5).reverse()[Math.ceil(t * 10) - 1];
    },
    _0x166779: function (t, e) {
      const i = this._0xd008d0(e);
      const a = e.fill.color || {
        r: 0,
        g: 0,
        b: 0
      };
      const s = this._0x91c57a(e);
      const n = e.strength || 0;
      const o = this._0x41b976(e);
      let h = document.createElement("canvas");
      let l = h.getContext("2d");
      h.width = t.width;
      h.height = t.height;
      l.save();
      l.shadowColor = "rgba(" + a.r + "," + a.g + "," + a.b + ",1)";
      l.shadowBlur = s;
      l.shadowOffsetX = t.width + 10;
      l.shadowOffsetY = t.height + 10;
      l.drawImage(t, i.x - t.width - 10, i.y - t.height - 10);
      l.restore();
      if (n > 0) {
        const t = "drawimage";
        const e = this._0x4532b9(n);
        if (t === "imagedata") {
          let t;
          let i;
          let a = l.getImageData(0, 0, h.width, h.height);
          let s = a.data;
          h.width;
          h.height;
          for (let a = 0; a < s.length; a += 4) {
            if (s[a + 3] !== 0) {
              t = s[a + 3] / 255;
              i = t * (e * 255 * n);
              t = t + i - t * i;
              if (t > 1) {
                t = 1;
              }
              s[a + 3] = t * 255;
            }
          }
          l.putImageData(a, 0, 0);
          a = s = null;
        } else {
          let t = document.createElement("canvas");
          let i = t.getContext("2d");
          t.width = h.width;
          t.height = h.height;
          i.globalCompositeOperation = "source-over";
          const a = Math.ceil(e * 255 * n);
          for (let t = 0; t < a; t++) {
            i.drawImage(h, 0, 0);
          }
          h.width = h.height = 0;
          h = t;
          l = h.getContext("2d");
        }
        StackBlur.canvasRGBA(h, 0, 0, h.width, h.height, Math.min(Math.round(e * s), 254));
      }
      if (o) {
        const t = TextEditorUtil.trimCanvas(h, true, 1);
        if (t && t.width > 0 && t.height > 0) {
          l.save();
          l.globalCompositeOperation = "source-in";
          l.fillStyle = TextEditorUtil.getLinearGradient(l, t.x, t.y, t.width, t.height, e.fill.gradient.colors, e.fill.gradient.angle, 1);
          l.fillRect(t.x, t.y, t.width, t.height);
          l.restore();
        }
      } else {
        l.save();
        l.fillStyle = "rgb(" + a.r + "," + a.g + "," + a.b + ")";
        l.globalCompositeOperation = "source-atop";
        l.fillRect(0, 0, h.width, h.height);
        l.restore();
      }
      return h;
    },
    _0x3cab61: function (t, e) {
      if (!t || !t.active || t.active === 0) {
        return;
      }
      const i = this.config.shadow.outer.mask === 1 ? this._0x30bb9 : this.canvas;
      let a;
      let s = this._0xd4f4b(t);
      for (let e = 0; e < s.length; e++) {
        if (s.length === 1) {
          a = i;
        } else {
          if (s[e].width === 0 || s[e].height === 0) {
            continue;
          }
          a = document.createElement("canvas");
          a.width = i.width;
          a.height = i.height;
          a.getContext("2d").drawImage(i, s[e].x, s[e].y, s[e].width, s[e].height, s[e].x, s[e].y, s[e].width, s[e].height);
        }
        if (!a) {
          continue;
        }
        let n = this._0x166779(a, t);
        if (!this.shadowsCanvas) {
          this.shadowsCanvas = document.createElement("canvas");
          this.shadowsCanvas.width = n.width;
          this.shadowsCanvas.height = n.height;
        }
        const o = this.shadowsCanvas.getContext("2d");
        o.save();
        o.globalAlpha = t.fill.alpha;
        o.globalCompositeOperation = "destination-over";
        o.drawImage(n, 0, 0);
        o.restore();
        n.width = n.height = 0;
        if (s.length > 1) {
          a.width = a.height = 0;
        }
      }
    },
    _0x3545e8() {
      if (!this.shadowsCanvas) {
        return;
      }
      const t = this.canvas.getContext("2d");
      if (this.config.shadow.outer.mask === 1) {
        const e = this.shadowsCanvas.getContext("2d");
        e.globalCompositeOperation = "destination-out";
        e.drawImage(this._0x30bb9, 0, 0);
        t.save();
        t.globalCompositeOperation = "lighter";
        t.drawImage(this.shadowsCanvas, 0, 0);
        t.restore();
      } else {
        t.save();
        t.globalCompositeOperation = "destination-over";
        t.drawImage(this.shadowsCanvas, 0, 0);
        t.restore();
      }
      this.shadowsCanvas.width = this.shadowsCanvas.height = 0;
      this.shadowsCanvas = null;
    },
    _0x1fea45: async function () {
      if (!this.config.distort || !this.config.distort.arc || !this.config.distort.arc.angle || this.config.distort.arc.angle === 0) {
        return;
      }
      if (!this.drawConfig.drawDistort && !this.drawConfig.isPostTreatment) {
        this.needPostTreatment = true;
        return;
      }
      if (this._0x425280.startApplyDistort) {
        this._0x425280.startApplyDistort();
      }
      let t = parseInt(this.config.distort.arc.angle);
      const e = t < 0 ? 1 : 0;
      t = Math.abs(t);
      if (t === 0) {
        return;
      }
      const i = this.canvas;
      const a = this.canvas.getContext("2d");
      const s = await new Promise(t => this.canvas.toBlob(t));
      const n = new FormData();
      n.append("image", s);
      const o = "ajax/distort?type=arc&angle=" + t + "&reverse=" + e + "&trim=1";
      let h = await fetch(url(o), {
        method: "POST",
        body: n
      });
      if (h.ok) {
        h = await h.json();
        const t = "data:image/png;base64," + h.result;
        const e = await TextEditorUtil.getImg(t);
        if (e) {
          i.width = e.naturalWidth;
          i.height = e.naturalHeight;
          a.drawImage(e, 0, 0);
        }
      }
      if (this._0x425280.applyDistortFinish) {
        this._0x425280.applyDistortFinish();
      }
    },
    _0x41fd25: function () {
      if (this.config.rotate === 0) {
        return;
      }
      const t = this.canvas;
      const e = this.canvas.width;
      const i = this.canvas.height;
      const a = t.getContext("2d");
      const s = document.createElement("canvas");
      const n = s.getContext("2d");
      const o = TextEditorUtil.degrad(this.config.rotate);
      const h = TextEditorUtil.getBoundingSize([e, i], this.config.rotate);
      s.width = t.width;
      s.height = t.height;
      n.drawImage(t, 0, 0);
      t.width = h.width;
      t.height = h.height;
      a.save();
      a.translate(t.width / 2, t.height / 2);
      a.rotate(o);
      a.drawImage(s, -s.width / 2, -s.height / 2, s.width, s.height);
      a.restore();
      s.width = s.height = 0;
    },
    _0x118309: async function (processTypes = [], config, args = null) {
      return new Promise(async (resolve, reject) => {
        if (!TEST_PROCESSING && (!this.config.processing || !this.config.processing.code || this.config.processing.code.trim().length === 0)) {
          resolve();
          return;
        }
        const processFunc = async function (code) {
          try {
            let STATE = true;
            if (!ONLINE && TEST_PROCESSING) {
              code = await fetch(url("asset/editor/~editor-test-processing.js?" + new Date())).then(t => t.text());
            }
            eval("var EVAL_ASYNC = async () => {" + code + "}");
            await EVAL_ASYNC();
            resolve(STATE);
          } catch (t) {
            console.log(t);
            reject();
          }
        };
        const thisArg = {
          processTypes: processTypes,
          args: args,
          config: config,
          canvas: this.canvas,
          outlineFirstCanvas: this._0x27dab4,
          outlineSecondCanvas: this._0x3aca81,
          getPadding: t => this._0x4931f4(t),
          measure: this._0x151339,
          images: this._0x4afb2d,
          fonts: this._0x3ecc34,
          isPostTreatment: this.drawConfig.isPostTreatment,
          isBestQuality: this.drawConfig.isBestQuality,
          needPostTreatment: t => this.needPostTreatment = true,
          Filter: TextEditorFilter,
          Util: TextEditorUtil,
          BestResize: TextEditorUtil.bestResize,
          ParentClass: TextEditor
        };
        if (TEST_PROCESSING) {
          return await processFunc.call(thisArg, "");
        }
        {
          const t = this._0x5d38cc();
          return await processFunc.call(thisArg, t);
        }
      });
    },
    _0x5d38cc: function () {
      if (!this.config.processing || !this.config.processing.code) {
        return "";
      }
      let t = this.config.processing.code;
      if (t.charCodeAt(0) === 94) {
        if (this._0x1b0f99) {
          t = this._0x1b0f99;
        } else {
          const e = [97, 86, 73, 80, 106, 79, 56, 67, 122, 77, 71, 98, 121, 69, 57, 56];
          t = this._0x1b0f99 = TextEditorUtil.supper(e, t.substring(1));
        }
      }
      return t;
    },
    _0x337efa: function (t = []) {
      const e = this._0x5d38cc();
      for (const i of t) {
        if (e.indexOf("'" + i + "'") !== -1 || e.indexOf("\"" + i + "\"") !== -1) {
          return true;
        }
      }
      return e;
    },
    _0x1ac92f: function () {
      return !ONLINE || this.config.processing && this.config.processing.code && this.config.processing.code.trim().length > 0 && this.config.processing.active !== 0;
    },
    _0x22915a: async function () {
      const t = this.config.icon;
      if (t.active === 0 || !t.src || !this._0x34bd53) {
        return;
      }
      if (this.config.processing?.active === 1) {
        this.config.processing;
      }
      const e = this._0x34bd53;
      let i;
      let a;
      let s;
      let n;
      let o = a = t.size * this.config.font.size;
      let h = i = o / e.naturalHeight * e.naturalWidth;
      if (t.rotate !== 0) {
        const e = TextEditorUtil.getBoundingSize([h, o], t.rotate);
        h = e.width;
        o = e.height;
      }
      const l = this.canvas;
      const r = l.getContext("2d");
      {
        const t = TextEditorUtil.trimCanvas(l, false, 0);
        if (t) {
          l.width = t.canvas.width;
          l.height = t.canvas.height;
          r.drawImage(t.canvas, 0, 0);
          t.canvas.width = t.canvas.height = 0;
        } else {
          l.width = 0;
          l.height = 0;
        }
      }
      s = l.width;
      n = l.height;
      const g = {
        x: t.offset.x * this.config.font.size,
        y: t.offset.y * this.config.font.size
      };
      let c;
      let d;
      let f;
      let u;
      let p;
      let x;
      let v;
      let w = 0;
      let m = 0;
      let _0x363e6f = 0;
      let b = 0;
      let C = 0;
      let y = 0;
      let S = 0;
      switch (t.position) {
        case "left":
          if (Math.abs(g.x) > s) {
            S = Math.abs(g.x);
          }
          w = Math.max(s + h + g.x, s, h, S);
          m = Math.max(n, o, Math.abs(g.y) + (n - o > 0 ? (n - o) / 2 : 0) + o);
          _0x363e6f = g.x < 0 && Math.abs(g.x) > h ? Math.abs(g.x) - h : 0;
          c = 0;
          if (n - o > 0) {
            c += (n - o) / 2;
          }
          c += g.y;
          if (c > 0) {
            if (n - o > 0) {
              b += (n - o) / 2;
            }
            b += g.y;
          }
          C = Math.max(0, h + g.x);
          if (o < n) {
            if (b === 0 && n < m) {
              y = m - n;
            }
          } else {
            y = b === 0 ? Math.abs(g.y) + (o - n) / 2 : (o - n) / 2;
          }
          break;
        case "right":
          if (Math.abs(g.x) > s) {
            S = Math.abs(g.x);
          }
          w = Math.max(s + h + g.x, s, h, S);
          m = Math.max(n, o, Math.abs(g.y) + (n - o > 0 ? (n - o) / 2 : 0) + o);
          _0x363e6f = g.x < 0 && Math.abs(g.x) > h ? w - h - (Math.abs(g.x) - h) : w - h;
          c = 0;
          if (n - o > 0) {
            c += (n - o) / 2;
          }
          c += g.y;
          if (c > 0) {
            if (n - o > 0) {
              b += (n - o) / 2;
            }
            b += g.y;
          }
          if (S > 0) {
            C = S - s;
          }
          if (o < n) {
            if (b === 0 && n < m) {
              y = m - n;
            }
          } else {
            y = b === 0 ? Math.abs(g.y) + (o - n) / 2 : (o - n) / 2;
          }
          break;
        case "top":
          if (Math.abs(g.y) > n) {
            S = Math.abs(g.y);
          }
          m = Math.max(n + o + g.y, n, o, S);
          w = Math.max(s, h, Math.abs(g.x) + (s - h > 0 ? (s - h) / 2 : 0) + h);
          b = g.y < 0 && Math.abs(g.y) > o ? Math.abs(g.y) - o : 0;
          c = 0;
          if (s - h > 0) {
            c += (s - h) / 2;
          }
          c += g.x;
          if (c > 0) {
            if (s - h > 0) {
              _0x363e6f += (s - h) / 2;
            }
            _0x363e6f += g.x;
          }
          y = Math.max(0, o + g.y);
          if (h < s) {
            if (_0x363e6f === 0 && s < w) {
              C = w - s;
            }
          } else {
            C = _0x363e6f === 0 ? Math.abs(g.x) + (h - s) / 2 : (h - s) / 2;
          }
          break;
        case "bottom":
          if (Math.abs(g.y) > n) {
            S = Math.abs(g.y);
          }
          m = Math.max(n + o + g.y, n, o, S);
          w = Math.max(s, h, Math.abs(g.x) + (s - h > 0 ? (s - h) / 2 : 0) + h);
          b = g.y < 0 && Math.abs(g.y) > o ? m - o - (Math.abs(g.y) - o) : m - o;
          c = 0;
          if (s - h > 0) {
            c += (s - h) / 2;
          }
          c += g.x;
          if (c > 0) {
            if (s - h > 0) {
              _0x363e6f += (s - h) / 2;
            }
            _0x363e6f += g.x;
          }
          if (S > 0) {
            y = S - n;
          }
          if (h < s) {
            if (_0x363e6f === 0 && s < w) {
              C = w - s;
            }
          } else {
            C = _0x363e6f === 0 ? Math.abs(g.x) + (h - s) / 2 : (h - s) / 2;
          }
          break;
        case "center":
          w = Math.max(s, h, Math.abs(g.x) + (s - h > 0 ? (s - h) / 2 : 0) + h);
          m = Math.max(n, o, Math.abs(g.y) + (n - o > 0 ? (n - o) / 2 : 0) + o);
          c = 0;
          if (s - h > 0) {
            c += (s - h) / 2;
          }
          c += g.x;
          if (c > 0) {
            if (s - h > 0) {
              _0x363e6f += (s - h) / 2;
            }
            _0x363e6f += g.x;
          }
          if (h < s) {
            if (_0x363e6f === 0 && s < w) {
              C = w - s;
            }
          } else {
            C = _0x363e6f === 0 ? Math.abs(g.x) + (h - s) / 2 : (h - s) / 2;
          }
          c = 0;
          if (n - o > 0) {
            c += (n - o) / 2;
          }
          c += g.y;
          if (c > 0) {
            if (n - o > 0) {
              b += (n - o) / 2;
            }
            b += g.y;
          }
          if (o < n) {
            if (b === 0 && n < m) {
              y = m - n;
            }
          } else {
            y = b === 0 ? Math.abs(g.y) + (o - n) / 2 : (o - n) / 2;
          }
      }
      if (b > 0 && y > 0) {
        d = Math.min(b, y);
        m -= d;
        b -= d;
        y -= d;
      }
      if (m > b + o && m > y + n) {
        d = Math.min(m - (b + o), m - (y + n));
        m -= d;
      }
      if (_0x363e6f > 0 && C > 0) {
        d = Math.min(_0x363e6f, C);
        w -= d;
        _0x363e6f -= d;
        C -= d;
      }
      if (w > _0x363e6f + h && w > C + s) {
        d = Math.min(w - (_0x363e6f + h), w - (C + s));
        w -= d;
      }
      w = Math.ceil(w);
      m = Math.ceil(m);
      if (l.width > 0) {
        f = document.createElement("canvas");
        f.width = l.width;
        f.height = l.height;
        f.getContext("2d").drawImage(l, 0, 0);
      }
      l.width = w;
      l.height = m;
      if (f) {
        r.drawImage(f, C, y);
      }
      r.save();
      r.globalCompositeOperation = t.composite;
      r.globalAlpha = t.alpha;
      if (t.rotate !== 0) {
        let e = TextEditorUtil.degrad(t.rotate);
        u = _0x363e6f + h / 2 - i / 2;
        p = b + o / 2 - a / 2;
        r.translate(u + i / 2, p + a / 2);
        r.rotate(e);
        r.translate(-u - i / 2, -p - a / 2);
        x = i;
        v = a;
      } else {
        u = _0x363e6f;
        p = b;
        x = h;
        v = o;
      }
      r.drawImage(e, u, p, x, v);
      r.restore();
      if (f) {
        f.width = f.height = 0;
      }
    },
    _0x21a894: function (t, e) {
      const i = this._0x40975e(e);
      const a = e.fill.gradient.colors;
      const s = (t + 1) / i;
      let n = 0;
      let o = false;
      let h = 0;
      for (let t = 0; t < a.length; t++) {
        if (a[t].a === undefined) {
          a[t].a = 1;
        }
        if (s < a[t].pos) {
          o = t;
          if (o > 0) {
            n = o - 1;
            h = 1 - (s - a[n].pos) / (a[o].pos - a[n].pos);
          }
          break;
        }
      }
      if (o === false) {
        n = o = a.length - 1;
      }
      const l = a[n];
      const r = a[o];
      let g = Math.round(l.r * h + (1 - h) * r.r);
      let c = Math.round(l.g * h + (1 - h) * r.g);
      let d = Math.round(l.b * h + (1 - h) * r.b);
      let f = l.a * h + (1 - h) * r.a;
      if (g < 0) {
        g = 0;
      }
      if (g > 255) {
        g = 255;
      }
      if (c < 0) {
        c = 0;
      }
      if (c > 255) {
        c = 255;
      }
      if (d < 0) {
        d = 0;
      }
      if (d > 255) {
        d = 255;
      }
      if (f < 0) {
        f = 0;
      }
      if (f > 1) {
        f = 1;
      }
      return {
        r: g,
        g: c,
        b: d,
        a: f
      };
    },
    _0xf22e29: async function () {
      const t = this.config;
      const e = this.drawConfig;
      const i = this.canvas.getContext("2d");
      let a;
      let s;
      let n;
      let o;
      let h;
      i.save();
      for (let t = 0; t < 200; t++) {
        this._0x4cc7f8(i);
        a = i.measureText(" ").width;
        s = [];
        n = 0;
        o = 0;
        h = 0;
        for (let t = 0; t < this.texts.length; t++) {
          const e = i.measureText(this.texts[t]);
          let l = e.actualBoundingBoxLeft + e.actualBoundingBoxRight;
          l += a * (this.textSpaces[t].left + this.textSpaces[t].right);
          const r = e.actualBoundingBoxAscent + e.actualBoundingBoxDescent;
          s.push({
            width: Math.ceil(l),
            height: Math.ceil(r),
            metrics: e,
            string: this.texts[t]
          });
          if (l > o) {
            o = Math.max(l, o);
            h = t;
          }
          n += r;
        }
        const t = this.config.processing?.fontSizeMultiplier ?? 1;
        if (o * t > e.maxWidth || n * t > e.maxHeight) {
          this.config.font.size *= 0.9;
        }
      }
      const l = [];
      if (this._0x30883b()) {
        for (let t = 0; t < this.texts.length; t++) {
          let e = this.texts[t].match(/./gu);
          if (!e || e.length < 1) {
            e = [" "];
          }
          const a = [];
          for (let s = 0; s < e.length; s++) {
            const n = e[s];
            const o = i.measureText(n);
            const h = o.actualBoundingBoxLeft + o.actualBoundingBoxRight;
            const l = o.actualBoundingBoxAscent + o.actualBoundingBoxDescent;
            a.push({
              char: n,
              index: s,
              lineIndex: t,
              metrics: o,
              width: h,
              height: l
            });
          }
          l.push(a);
        }
      }
      const r = this._0x4931f4();
      const g = {
        width: o + r.x * 2,
        height: this._0x3bc2b2() * this.texts.length + r.y * 2,
        padding: r
      };
      const c = this._0x3bc2b2() - s[0].metrics.actualBoundingBoxAscent;
      g.height -= c;
      g.height += s[this.texts.length - 1].metrics.actualBoundingBoxDescent;
      g.width = Math.ceil(g.width);
      g.height = Math.ceil(g.height);
      let d = r.y - c;
      for (let e = 0; e < this.texts.length; e++) {
        let i = {};
        switch (t.align) {
          case "left":
            i.x = r.x;
            break;
          case "right":
            i.x = g.width - r.x - s[e].width;
            break;
          default:
            i.x = (g.width - s[e].width) / 2;
        }
        i.x += a * this.textSpaces[e].left;
        i.x += s[e].metrics.actualBoundingBoxLeft;
        i.y = d + this._0x3bc2b2();
        s[e].position = i;
        s[e].boundingBox = {
          x: s[e].position.x - s[e].metrics.actualBoundingBoxLeft,
          y: d + this._0x3bc2b2() - s[e].metrics.actualBoundingBoxAscent,
          width: s[e].width,
          height: s[e].height
        };
        d = s[e].position.y;
      }
      let f = 0;
      let u = 0;
      let p = 0;
      let x = 0;
      if (this._0x30883b() && t.lettering.boggle.active === 1) {
        if (t.lettering.boggle.angle > 0) {
          switch (t.align) {
            case "left":
              for (let e = 0; e < l.length; e++) {
                const i = l[e][0];
                const a = TextEditorUtil.getBoundingSize([i.width, i.height], t.lettering.boggle.angle);
                f = Math.max(f, (a.width - i.width) / 2);
              }
              break;
            case "center":
            case "right":
              const e = l[h][0];
              f = (TextEditorUtil.getBoundingSize([e.width, e.height], t.lettering.boggle.angle).width - e.width) / 2;
          }
          switch (t.align) {
            case "left":
            case "center":
              const e = l[h];
              const i = e[e.length - 1];
              u = (TextEditorUtil.getBoundingSize([i.width, i.height], t.lettering.boggle.angle).width - i.width) / 2;
              break;
            case "right":
              for (let e = 0; e < l.length; e++) {
                const i = l[e];
                const a = i[i.length - 1];
                const s = TextEditorUtil.getBoundingSize([a.width, a.height], t.lettering.boggle.angle);
                u = Math.max(u, (s.width - a.width) / 2);
              }
          }
          for (let e = 0; e < l[0].length; e++) {
            const i = l[0][e];
            const a = TextEditorUtil.getBoundingSize([i.width, i.height], t.lettering.boggle.angle);
            p = Math.max(p, (a.height - i.height) / 2);
          }
          const e = l.length - 1;
          for (let i = 0; i < l[e].length; i++) {
            const a = l[e][i];
            const s = TextEditorUtil.getBoundingSize([a.width, a.height], t.lettering.boggle.angle);
            x = Math.max(x, (s.height - a.height) / 2);
          }
        }
        if (t.lettering.boggle.amplitude > 0) {
          x += t.lettering.boggle.amplitude * t.font.size;
        }
      }
      f = Math.ceil(f);
      u = Math.ceil(u);
      p = Math.ceil(p);
      x = Math.ceil(x);
      g.width += f + u;
      g.height += p + x;
      for (const t in s) {
        const e = s[t]?.boundingBox;
        if (e && e.x !== undefined && e.y !== undefined && e.width !== undefined && e.height !== undefined) {
          e.x += f;
          e.y += p;
          e.width += f + u;
          e.height += p + x;
        }
      }
      let v = {
        x1: Infinity,
        y1: Infinity,
        x2: 0,
        y2: 0
      };
      for (let t = 0; t < s.length; t++) {
        const e = s[t].boundingBox;
        v.x1 = Math.min(e.x, v.x1);
        v.x2 = Math.max(e.x + e.width, v.x2);
        v.y1 = Math.min(e.y, v.y1);
        v.y2 = Math.max(e.y + e.height, v.y2);
      }
      const w = Math.max(0, v.x1);
      const m = Math.max(0, v.y1);
      v = {
        x: w,
        y: m,
        width: Math.min(v.x2 - v.x1, g.width - w),
        height: Math.min(v.y2 - v.y1, g.height - m)
      };
      if (this._0x30883b()) {
        for (let t = 0; t < l.length; t++) {
          const e = [];
          let a;
          let n;
          let o;
          let h;
          let r;
          let g;
          let c;
          let d;
          let f;
          let u = 0;
          let p = 0;
          for (let x = 0; x < l[t].length; x++) {
            r = 0;
            f = l[t][x];
            a = f.char;
            c = f.metrics;
            o = f.width;
            h = f.height;
            if (x + 1 < l[t].length) {
              n = l[t][x + 1].char;
              g = i.measureText(a + n);
              d = i.measureText(n);
              r = g.width - o - d.width;
            }
            e.push({
              boundingBox: {
                x: s[t].boundingBox.x + u,
                y: s[t].boundingBox.y + s[t].metrics.actualBoundingBoxAscent - c.actualBoundingBoxAscent,
                width: o,
                height: h
              },
              metrics: c,
              char: a,
              index: x,
              lineIndex: t,
              x: s[t].boundingBox.x + s[t].metrics.actualBoundingBoxLeft + p,
              y: s[t].boundingBox.y + s[t].metrics.actualBoundingBoxAscent
            });
            p += o + r;
            u += o + r + c.actualBoundingBoxLeft;
            if (d) {
              u -= d.actualBoundingBoxLeft;
            }
          }
          s[t].chars = e;
        }
      }
      const _0x22ef57 = {
        x: v.x,
        y: v.y,
        width: v.width,
        height: v.height,
        texts: s,
        canvas: g
      };
      if (this._0x337efa("adjustMeasure") || TEST_PROCESSING) {
        const e = {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        };
        await this._0x118309(["adjustMeasure"], t, {
          addPadding: e,
          padding: r,
          measure: _0x22ef57
        });
        _0x22ef57.x += e.left;
        _0x22ef57.y += e.top;
        _0x22ef57.canvas.width += e.left + e.right;
        _0x22ef57.canvas.height += e.top + e.bottom;
        for (const t of _0x22ef57.texts) {
          t.position.x += e.left;
          t.position.y += e.top;
          t.boundingBox.x += e.left;
          t.boundingBox.y += e.top;
          if (t.chars) {
            for (const i of t.chars) {
              i.x += e.left;
              i.y += e.top;
              i.boundingBox.x += e.left;
              i.boundingBox.y += e.top;
            }
          }
        }
      }
      this._0x151339 = _0x22ef57;
      i.restore();
    },
    _0x4931f4: function (t = []) {
      const e = this.config;
      const i = t.includes("depth") ? 0 : this._0x40975e(e.depth);
      const a = t.includes("depth2") ? 0 : this._0x40975e(e.depth2);
      const s = (t.includes("outline.first") ? 0 : this._0x4a115f(e.outline.first) / 2) + (t.includes("outline.second") ? 0 : this._0x4a115f(e.outline.second) / 2);
      const n = s + (t.includes("outline.global") ? 0 : this._0x4a115f(e.outline.global) / 2) + (t.includes("outline.global2") ? 0 : this._0x4a115f(e.outline.global2) / 2);
      let o = 0;
      if (e.shadow.outer.active === 1 || e.shadow.outer2.active === 1) {
        const s = !t.includes("shadow.outer");
        const h = s ? this._0xd008d0(e.shadow.outer) : 0;
        const l = s ? this._0x91c57a(e.shadow.outer) : 0;
        const r = s ? e.shadow.outer.strength : 0;
        const g = !t.includes("shadow.outer2");
        const c = g ? this._0xd008d0(e.shadow.outer2) : 0;
        const d = g ? this._0x91c57a(e.shadow.outer2) : 0;
        const f = g ? e.shadow.outer2.strength : 0;
        const u = Math.max(l, d);
        const p = Math.max(r, f);
        const x = {
          x: Math.max(Math.abs(h.x), Math.abs(c.x)),
          y: Math.max(Math.abs(h.y), Math.abs(c.y))
        };
        o += u * 1;
        o += u * p * 2;
        o += i + a + n;
        o += Math.max(Math.abs(x.x), Math.abs(x.y));
      }
      let h = 0;
      if (e.lettering.shadow.active === 1 && !t.includes("lettering.shadow")) {
        const t = this._0xd008d0(e.lettering.shadow);
        h += this._0x91c57a(e.lettering.shadow) * 1;
        h += s;
        h += Math.max(Math.abs(t.x), Math.abs(t.y));
      }
      const l = Math.max(o, h);
      let r = 0;
      if (this._0x463806()) {
        r += n * 0.9;
      }
      const g = Math.max(l * 2, n * 2 + i * 2 + a * 2, n);
      const c = Math.max(l * 2, n * 2 + i * 2 + a * 2, n);
      const d = {
        x: Math.ceil(g + r),
        y: Math.ceil(c + 6)
      };
      if (d.x % 2 != 0) {
        d.x += 1;
      }
      if (d.y % 2 != 0) {
        d.y += 1;
      }
      d.x /= 2;
      d.y /= 2;
      return d;
    },
    _0x333a01: function (t) {
      let e = t.padEnd(4, "0");
      e = e.substr(e.length - 4);
      e = e.split("").reverse().join("");
      return e[0] + "/" + e[1] + "/" + e[2] + "/" + e[3];
    },
    _0x30581d(t) {
      return `url("${this.config.font.src || 'https://pub-b800a41f46484915a9433b0bb7a4f019.r2.dev/fonts/google-fonts/Sansita/V7HBm7TXFf3qw.ttf'}")`;
      let e;
      t ||= this.config.font.src;
      const i = this._0x8b4ce8(t);
      if (i === "base64") {
        e = "data:application/octet-stream;base64," + t;
      } else if (i === "file") {
        const i = t;
        const a = i.split(".").slice(0, -1).join(".");
        let s = i.split(".").pop();
        if (TextEditorUtil.supportsWoff2()) {
          e = "output/font/woff2/";
          s = "woff2";
        } else {
          e = "output/font/";
        }
        e += this._0x333a01(a) + "/" + a + "." + s;
        e = url(e);
      }
      return !!e && "url(\"" + e + "\")";
    },
    getFontNameId: function (t) {
      // 如果name 是一种 https://xxxxx.asdfasf 这种 firefox 不合法
      t ||= this.config.font.src;
      let e = "font_";
      const i = this._0x8b4ce8(t);
      const lastName =  i === "base64" ? TextEditorUtil.cyrb53(t) : i === "file" ? t.split('/').pop().split('.').shift() : "undefined";
      e += lastName;
      return e;
    },
    _0x8b4ce8: function (t) {
      if (t) {
        if (/\.(ttf|otf|woff|woff2)$/.test(t)) {
          return "file";
        } else {
          return "base64";
        }
      } else {
        return null;
      }
    },
    _0x1b7f50: function () {
      return this.config.font.weight + " " + this.config.font.size + "px \"" + this.getFontNameId() + "\"";
    },
    _0x4cc7f8: function (t) {
      t.font = this._0x1b7f50();
      t.letterSpacing = this._0x330350(true);
    },
    _0x3bc2b2: function () {
      return Math.ceil(this.config.lineHeight * this.config.font.size);
    },
    _0x330350: function (t) {
      const e = parseInt(this.config.letterSpacing * this.config.font.size);
      if (t) {
        return e + "px";
      } else {
        return e;
      }
    },
    _0x4a115f: function (t) {
      if (t.active === 0) {
        return 0;
      }
      return Math.round(t.width * this.config.font.size);
    },
    _0x40975e: function (t) {
      if (t.active === 0) {
        return 0;
      } else {
        return Math.ceil(t.length * this.config.font.size);
      }
    },
    _0x4f4667: function (t) {
      if (TextEditorUtil.pathResolve("config.shadow." + t + ".active", this) !== 1) {
        return 0;
      }
      let e = this.config.shadow[t].size / 10 * this.config.font.size;
      return Math.round(e);
    },
    _0x44449c: function (t) {
      let e = this.config.shadow[t].distance;
      let i = this.config.shadow[t].angle;
      let a = {};
      e *= this.config.font.size;
      i = (i * -1 + 180) % 360;
      a.x = e * Math.cos(TextEditorUtil.degrad(i));
      a.y = e * Math.sin(TextEditorUtil.degrad(i));
      return {
        x: a.x,
        y: a.y
      };
    },
    _0x91c57a: function (t) {
      if (t && t.active && t.active !== 0) {
        return Math.round(t.size * this.config.font.size);
      } else {
        return 0;
      }
    },
    _0xd008d0: function (t) {
      let e = t.distance;
      let i = t.angle;
      let a = {};
      i = (i * -1 + 180) % 360;
      a.x = e * Math.cos(TextEditorUtil.degrad(i));
      a.y = e * Math.sin(TextEditorUtil.degrad(i));
      return {
        x: a.x * this.config.font.size,
        y: a.y * this.config.font.size
      };
    },
    _0x3292cc: function (t, e) {
      let i = {
        x: 1,
        y: 0
      };
      let a = i.x;
      let s = i.y;
      let n = this._0x40975e(t);
      let o = t.angle;
      if (n === 0) {
        return {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        };
      } else {
        o = (o * -1 + 180) % 360;
        i.x = a * Math.cos(TextEditorUtil.degrad(o)) - s * Math.sin(TextEditorUtil.degrad(o));
        i.y = a * Math.sin(TextEditorUtil.degrad(o)) + s * Math.cos(TextEditorUtil.degrad(o));
        if (e) {
          return {
            left: -Math.ceil(n * i.x),
            right: 0,
            top: -Math.ceil(n * i.y),
            bottom: 0
          };
        } else {
          return {
            left: i.x < 0 ? -Math.ceil(n * i.x) : 0,
            right: i.x < 0 ? 0 : Math.ceil(n * i.x),
            top: i.y < 0 ? -Math.ceil(n * i.y) : 0,
            bottom: i.y < 0 ? 0 : Math.ceil(n * i.y)
          };
        }
      }
    },
    _0x463806: function () {
      const t = this.config.outline;
      if (!t || !t.first || !t.second || !t.global) {
        return false;
      }
      return [t.first.join, t.second.join, t.global.join].includes("miter");
    },
    _0x41b976: function (t) {
      return t && t.fill && t.fill.gradient && t.fill.gradient.active === 1 && t.fill.gradient.colors && Array.isArray(t.fill.gradient.colors) && t.fill.gradient.colors.length > 0;
    },
    _0x572ab1() {
      if (this.texts.length < 2) {
        return true;
      }
      let t = this._0x4a115f(this.config.outline.first);
      let e = this._0x4a115f(this.config.outline.second);
      let i = this._0x4a115f(this.config.outline.global);
      let a = this._0x4a115f(this.config.outline.global2);
      let s = this._0x41b976(this.config.outline.first);
      let n = this._0x41b976(this.config.outline.second);
      let o = this._0x41b976(this.config.outline.global);
      let h = this._0x41b976(this.config.outline.global2);
      let l = this.config.outline.global.projection === 1;
      let r = this.config.outline.global.active === 1;
      let g = 0;
      if (o && h) {
        g += t / 2;
        g += e / 2;
        g += i / 2;
        g += a / 2;
      } else if (o) {
        g += t / 2;
        g += e / 2;
        g += i / 2;
      } else if (h) {
        g += t / 2;
        g += e / 2;
        g += a / 2;
      } else if (e > 0 && n) {
        g += t / 2;
        g += e / 2;
      } else if (t > 0 && s) {
        g += t / 2;
      }
      let c = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
      if (o && r && !l) {
        c = this._0x3292cc(this.config.depth, this.config.outline.global.projection === 1);
      }
      let d = 0;
      for (let t = 0; t < this.texts.length; t++) {
        let e = this._0x151339.texts[t].boundingBox;
        let i = e.y - g - c.top;
        let a = e.height + g * 2 + c.top + c.bottom;
        if (d > i) {
          return true;
        }
        d = i + a;
      }
      return this.config.mergeGradients === 1;
    },
    _0x5a2775: function (t, e) {
      t.mozImageSmoothingEnabled = t.webkitImageSmoothingEnabled = t.msImageSmoothingEnabled = t.imageSmoothingEnabled = e;
    },
    setConfig: function (t) {
      const e = TextEditorUtil.cloneObject(this._0x4d9511);
      this.config = TextEditorUtil.mergeDeep(e, t);
      return TextEditorUtil.cloneObject(this.config);
    }
  }._0x166fc4(canvas);
}
export function BevelEffect(t, e, i, a, s, n, o, h, l, r) {
  if (typeof cv == "undefined" || cv.imread === undefined) {
    return;
  }
  let g;
  let c;
  let d = cv.imread(t);
  let f = new cv.Mat();
  cv.Canny(d, f, 50, 100);
  if (i) {
    let A = new cv.Mat();
    cv.cvtColor(f, A, cv.COLOR_GRAY2RGBA);
    g = TextEditorUtil.opencvToCanvas(A);
    A.delete();
  }
  d.delete();
  cv.bitwise_not(f, f);
  cv.distanceTransform(f, f, cv.DIST_L2, cv.DIST_MASK_5);
  cv.threshold(f, f, a, a, cv.THRESH_TRUNC);
  switch (o) {
    case 180:
    case -180:
      c = [0, 0, -3, 0, 0, 0, -2, 0, 0, 0, -1, 0, 0, 0, 1, 0, -2, 0, 0, 0, 0, 0, -3, 0, 0];
      break;
    case 90:
      c = [0, 0, -1, 0, 0, 0, -2, 0, -2, 0, -3, 0, 0, 0, -3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
      break;
    case 0:
      c = [0, 0, -3, 0, 0, 0, 0, 0, -2, 0, 1, 0, 0, 0, -1, 0, 0, 0, -2, 0, 0, 0, -3, 0, 0];
      break;
    case -90:
      c = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -3, 0, 0, 0, -3, 0, -2, 0, -2, 0, 0, 0, -1, 0, 0];
      break;
    case 135:
      c = [-1, -2, -3, -2, 0, 0, -3, 0, 1];
      break;
    case 45:
      c = [-3, -2, -1, 0, 0, -2, 1, 0, -3];
      break;
    case -45:
      c = [1, 0, -3, 0, 0, -2, -3, -2, -1];
      break;
    case -135:
      c = [-3, 0, 1, -2, 0, 0, -1, -2, -3];
  }
  let u = Math.sqrt(c.length);
  let p = cv.matFromArray(u, u, cv.CV_32FC1, c);
  let x = cv.mean(p)[0];
  let v = new Array(c.length).fill(x);
  let w = cv.matFromArray(u, u, cv.CV_32FC1, v);
  cv.subtract(p, w, p);
  cv.filter2D(f, f, cv.CV_32FC1, p);
  p.delete();
  w.delete();
  if (l.a > 1 || h.a > 1) {
    let G;
    let R = cv.minMaxLoc(f);
    let W = Math.max(Math.abs(R.minVal), R.maxVal);
    let j = W / 255;
    let N = (l.a - 1) * -W;
    let H = (h.a - 1) * W;
    for (let $ = 0; $ < f.rows; $++) {
      for (let V = 0; V < f.cols; V++) {
        G = f.floatPtr($, V)[0];
        if (!(G <= j) || !(G >= -j)) {
          if (G > 0 && G < H) {
            G = H;
          } else if (G < 0 && G > N) {
            G = N;
          }
        }
        f.floatPtr($, V)[0] = G * 128 / W;
      }
    }
  } else {
    let q = cv.minMaxLoc(f).maxVal;
    for (let J = 0; J < f.rows; J++) {
      for (let Y = 0; Y < f.cols; Y++) {
        f.floatPtr(J, Y)[0] = f.floatPtr(J, Y)[0] * 128 / q;
      }
    }
  }
  f.convertTo(f, cv.CV_8U, 1, 128);
  cv.cvtColor(f, f, cv.COLOR_GRAY2RGBA);
  let m = TextEditorUtil.opencvToCanvas(f);
  let _0x487140 = m.getContext("2d");
  f.delete();
  mmCanvas = TextEditorUtil.cloneCanvas(m);
  mmCtx = mmCanvas.getContext("2d");
  mmCtx.globalCompositeOperation = "destination-in";
  mmCtx.drawImage(t, 0, 0);
  _0x487140.save();
  _0x487140.fillStyle = "white";
  _0x487140.globalCompositeOperation = "difference";
  _0x487140.fillRect(0, 0, mmCanvas.width, mmCanvas.height);
  _0x487140.globalCompositeOperation = "source-over";
  _0x487140.drawImage(mmCanvas, 0, 0);
  _0x487140.restore();
  mmCanvas.width = mmCanvas.height = 0;
  if (i) {
    function b(t, e, i, a) {
      return t > 0 && e > 0 && t < i && e < a;
    }
    function C(t, e, i, a) {
      if (b(t, e, i, a)) {
        return (e * i + t) * 4;
      } else {
        return -1;
      }
    }
    function y(t, e, i, a, s, n) {
      let o;
      let h = [[i - 1, a - 1], [i + 1, a + 1], [i - 1, a + 1], [i + 1, a - 1], [i - 1, a], [i, a - 1], [i + 1, a], [i, a + 1]];
      let l = 0;
      let r = 0;
      for (let i = 0; i < h.length; i++) {
        o = C(h[i][0], h[i][1], s, n);
        if (o !== -1 && e[o] === 0) {
          l += t[o];
          r++;
        }
      }
      return l / r;
    }
    let Q;
    let X;
    let K;
    let Z = g.getContext("2d").getImageData(0, 0, g.width, g.height);
    let tt = _0x487140.getImageData(0, 0, m.width, m.height);
    let et = tt.data;
    let it = Z.data;
    let at = m.width;
    let st = m.height;
    let nt = [];
    let ot = [];
    for (let rt = 0; rt < et.length; rt += 4) {
      if (it[rt] !== 0) {
        Q = rt / 4 % at;
        X = Math.floor(rt / 4 / at);
        K = y(et, it, Q, X, at, st);
        et[rt] = K;
        et[rt + 1] = K;
        et[rt + 2] = K;
        nt.push([Q, X]);
        ot[rt] = 1;
        it[rt] = 0;
      }
    }
    let ht;
    let lt = 20;
    for (let gt = 0; gt < nt.length; gt++) {
      Q = nt[gt][0];
      X = nt[gt][1];
      if (b(Q - 1, X, at, st)) {
        ht = C(Q - 1, X, at, st);
        if (ot[ht] !== 1) {
          K = y(et, it, Q - 1, X, at, st);
          if (Math.abs(et[ht] - K) > lt) {
            et[ht] = K;
            et[ht + 1] = K;
            et[ht + 2] = K;
          }
        }
      }
      if (b(Q + 1, X, at, st)) {
        ht = C(Q + 1, X, at, st);
        if (ot[ht] !== 1) {
          K = y(et, it, Q + 1, X, at, st);
          if (Math.abs(et[ht] - K) > lt) {
            et[ht] = K;
            et[ht + 1] = K;
            et[ht + 2] = K;
          }
        }
      }
    }
    _0x487140.putImageData(tt, 0, 0);
    Z = tt = et = it = null;
    nt = ot = null;
    g.width = g.height = 0;
  }
  if (n && i) {
    f = cv.imread(m);
    cv.cvtColor(f, f, cv.COLOR_RGBA2GRAY);
    let ct = new cv.Mat();
    let dt = 9;
    let ft = 30;
    cv.bilateralFilter(f, ct, dt, ft, ft);
    f.delete();
    f = ct;
    cv.cvtColor(f, f, cv.COLOR_GRAY2RGBA);
    m = TextEditorUtil.opencvToCanvas(f);
    _0x487140 = m.getContext("2d");
    f.delete();
  }
  StackBlur.canvasRGB(m, 0, 0, m.width, m.height, s);
  let S = document.createElement("canvas");
  let T = S.getContext("2d");
  S.width = m.width;
  S.height = m.height;
  let O = document.createElement("canvas");
  let M = O.getContext("2d");
  O.width = m.width;
  O.height = m.height;
  let I;
  let k;
  let E;
  let L = _0x487140.getImageData(0, 0, m.width, m.height);
  let D = T.getImageData(0, 0, S.width, S.height);
  let F = M.getImageData(0, 0, O.width, O.height);
  let B = L.data;
  let z = D.data;
  let P = F.data;
  for (let ut = 0; ut < B.length; ut += 4) {
    I = ut / 4 % m.width;
    k = Math.floor(ut / 4 / m.width);
    E = (B[ut] + B[ut + 1] + B[ut + 2]) / 3;
    if (E < 128) {
      z[ut] = l.r;
      z[ut + 1] = l.g;
      z[ut + 2] = l.b;
      z[ut + 3] = (128 - E) / 128 * 255;
    } else {
      P[ut] = h.r;
      P[ut + 1] = h.g;
      P[ut + 2] = h.b;
      P[ut + 3] = (E - 128) / 128 * 255;
    }
  }
  L = B = null;
  m.width = m.height = 0;
  T.putImageData(D, 0, 0);
  D = z = null;
  if (r) {
    T.globalCompositeOperation = "destination-in";
    T.drawImage(t, 0, 0);
  }
  M.putImageData(F, 0, 0);
  F = P = null;
  if (r) {
    M.globalCompositeOperation = "destination-in";
    M.drawImage(t, 0, 0);
  }
  const U = e.getContext("2d");
  U.save();
  U.globalCompositeOperation = l.composite;
  U.globalAlpha = Math.min(l.a, 1);
  U.drawImage(S, 0, 0);
  S.width = S.height = 0;
  U.globalCompositeOperation = h.composite;
  U.globalAlpha = Math.min(h.a, 1);
  U.drawImage(O, 0, 0);
  O.width = O.height = 0;
  U.restore();
}
export class TextEditorFilter {
  constructor(t, e, i) {
    this._0x45d165 = "http://www.w3.org/2000/svg";
    this._0x45e0c6 = "http://www.w3.org/1999/xlink";
    this._0x39ff11 = this._0x373a30("SVGFILTER");
    this._0x3ea971 = t;
    this._0x5f05ca = e;
    this._0x531555 = t.width;
    this._0x44590c = t.height;
    const a = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    i ||= {};
    for (const t in a) {
      i[t] ||= a[t];
    }
    this._0x5df240 = i;
    this._0xcfc226 = Math.ceil(this._0x531555 + i.left + i.right);
    this._0x4b699c = Math.ceil(this._0x44590c + i.top + i.bottom);
    this._0x327bc4 = i.left;
    this._0x1770bb = i.top;
    const s = t.toDataURL();
    this._0x1eeb74 = "<svg xmlns=\"" + this._0x45d165 + "\"\n\t\t\txmlns:xlink=\"" + this._0x45e0c6 + "\"\n\t\t\twidth=\"" + this._0xcfc226 + "\"\n\t\t\theight=\"" + this._0x4b699c + "\" >\n\t\t\t<defs>\n\t\t    \t<filter\n\t\t\t\t\tx=\"0\" y=\"0\"\n\t\t\t\t\tid=\"" + this._0x39ff11 + "\"\n\t\t\t\t\twidth=\"100%\"\n\t\t\t\t\theight=\"100%\"\n\t\t\t\t\tfilterUnits=\"userSpaceOnUse\">\n\t\t\t\t</filter>\n\t\t\t</defs>\n\t\t\t<image\n\t\t\t\tx=\"" + this._0x327bc4 + "\"\n\t\t\t\ty=\"" + this._0x1770bb + "\"\n\t\t\t\twidth=\"" + this._0x531555 + "\"\n\t\t\t\theight=\"" + this._0x44590c + "\"\n\t\t\t\thref=\"" + s + "\"\n\t\t\t\tfilter=\"url(#" + this._0x39ff11 + ")\">\n\t\t\t</image>\n\t\t</svg>";
  }
  async _0xff55f3(t) {
    const e = document.createElement("template");
    e.innerHTML = t;
    const i = e.content.firstChild;
    const a = new Blob([i.outerHTML], {
      type: "image/svg+xml;charset=utf-8"
    });
    const s = URL.createObjectURL(a);
    return await TextEditorUtil.getImg(s);
  }
  _0x373a30(t) {
    return t.toUpperCase() + this._0x37bdc0(16);
  }
  _0x37bdc0(t) {
    let e = "";
    const i = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let a = 0; a < t; a++) {
      e += i.charAt(Math.floor(Math.random() * 36));
    }
    return e;
  }
  async _0x4d13ab(t) {
    t = "<svg><filter>" + t + "</filter></svg>";
    const e = new DOMParser().parseFromString(t, "image/svg+xml");
    const i = e.documentElement.querySelectorAll("feTurbulence");
    for (const t of i) {
      const e = {};
      for (const i of t.attributes) {
        e[i.name] = i.value;
      }
      const i = await this._0x3a979a(e);
      t.parentNode.insertBefore(i, t.nextSibling);
      t.remove();
    }
    return t = e.documentElement.querySelector("filter").innerHTML;
  }
  async _0x3a979a(t) {
    const e = {
      baseFrequency: "0",
      numOctaves: "1",
      seed: "0",
      stitchTiles: "stitch",
      type: "turbulence",
      result: "NOISE",
      imageSize: "800"
    };
    for (const i in e) {
      t[i] ||= e[i];
    }
    const i = parseFloat(t.imageSize);
    let a;
    const s = TextEditorFilter;
    const n = t.type + t.baseFrequency + t.numOctaves + t.seed + t.baseFrequency;
    if (s.cacheTurbulenceImg && s.cacheTurbulenceImg[n]) {
      a = s.cacheTurbulenceImg[n];
    } else {
      const e = this._0x373a30("TURBULENCE");
      const o = "<svg xmlns=\"" + this._0x45d165 + "\" width=\"" + i + "\" height=\"" + i + "\">\n\t\t\t\t<defs>\n\t\t\t\t\t<filter id=\"" + e + "\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">\n\t\t\t\t\t\t<feTurbulence\n\t\t\t\t\t\t\tbaseFrequency=\"" + t.baseFrequency + "\"\n\t\t\t\t\t\t\tstitchTiles=\"stitch\"\n\t\t\t\t\t\t\ttype=\"" + t.type + "\"\n\t\t\t\t\t\t\tnumOctaves=\"" + t.numOctaves + "\"\n\t\t\t\t\t\t\tseed=\"" + t.seed + "\" />\n\t\t\t\t\t</filter>\n\t\t\t\t</defs>\n\t\t\t\t<rect x=\"0\" y=\"0\"\n\t\t\t\t\twidth=\"" + i + "\"\n\t\t\t\t\theight=\"" + i + "\"\n\t\t\t\t\tfilter=\"url(#" + e + ")\"/>\n\t\t\t</svg>";
      a = await this._0xff55f3(o);
      s.cacheTurbulenceImg ||= [];
      s.cacheTurbulenceImg[n] = a;
    }
    if (!a) {
      return "";
    }
    await new Promise(t => setTimeout(t, 0));
    const o = this._0x5f05ca / 600 * i;
    const h = document.createElement("canvas");
    h.width = o;
    h.height = o;
    h.getContext("2d").drawImage(a, 0, 0, h.width, h.height);
    const l = document.createElement("canvas");
    l.width = this._0xcfc226;
    l.height = this._0x4b699c;
    const r = l.getContext("2d");
    const g = r.createPattern(h, "repeat");
    h.width = h.height = 0;
    r.fillStyle = g;
    r.fillRect(0, 0, l.width, l.height);
    const c = l.toDataURL();
    l.width = l.height = 0;
    const d = "<feImage\n\t\t\txlink:href=\"" + c + "\"\n\t\t\tx=\"0\" y=\"0\"\n\t\t\twidth=\"" + this._0xcfc226 + "\"\n\t\t\theight=\"" + this._0x4b699c + "\"\n\t\t\tresult=\"" + t.result + "\" />";
    const f = document.createElementNS(this._0x45d165, "svg");
    f.innerHTML = "<filter>" + d + "</filter>";
    return f.querySelector("feImage");
  }
  async addHTML(t) {
    t = await this._0x4d13ab(t);
    this._0x1eeb74 = this._0x1eeb74.replace("</filter>", t + "</filter>");
  }
  async draw(t, e, i, a = false, s = "copy") {
    const n = this;
    return new Promise(async (o, h) => {
      const l = await n._0xff55f3(n._0x1eeb74);
      if (l) {
        if (l.src.startsWith("blob:")) {
          URL.revokeObjectURL(l.src);
        }
        await new Promise(t => setTimeout(t, 0));
        if (a) {
          const a = document.createElement("canvas");
          a.width = l.naturalWidth;
          a.height = l.naturalHeight;
          a.getContext("2d").drawImage(l, 0, 0);
          const n = TextEditorUtil.trimCanvas(a, true, 0);
          t.canvas.width = n.width;
          t.canvas.height = n.height;
          t.save();
          t.globalCompositeOperation = s;
          t.drawImage(a, e - n.x, i - n.y);
          t.restore();
          a.width = a.height = 0;
          o();
        } else {
          if (n._0x5df240.left > 0 || n._0x5df240.right > 0 || n._0x5df240.top > 0 || n._0x5df240.bottom > 0) {
            t.canvas.width = n._0x531555 + n._0x5df240.left + n._0x5df240.right;
            t.canvas.height = n._0x44590c + n._0x5df240.top + n._0x5df240.bottom;
          }
          t.save();
          t.globalCompositeOperation = s;
          t.drawImage(l, e, i, t.canvas.width, t.canvas.height);
          t.restore();
          o();
        }
      } else {
        h();
      }
    });
  }
  clean() {
    this._0x40ca5b = null;
  }
}
