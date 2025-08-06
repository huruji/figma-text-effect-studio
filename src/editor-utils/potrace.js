var Potrace = function () {
  function t(t, r) {
    this.x = t;
    this.y = r;
  }
  function r(t, r) {
    this.w = t;
    this.h = r;
    this.size = t * r;
    this.arraybuffer = new ArrayBuffer(this.size);
    this.data = new Int8Array(this.arraybuffer);
  }
  function n() {
    this.area = 0;
    this.len = 0;
    this.curve = {};
    this.pt = [];
    this.minX = 100000;
    this.minY = 100000;
    this.maxX = -1;
    this.maxY = -1;
  }
  function a(t) {
    this.n = t;
    this.tag = new Array(t);
    this.c = new Array(t * 3);
    this.alphaCurve = 0;
    this.vertex = new Array(t);
    this.alpha = new Array(t);
    this.alpha0 = new Array(t);
    this.beta = new Array(t);
  }
  t.prototype.copy = function () {
    return new t(this.x, this.y);
  };
  r.prototype.at = function (t, r) {
    return t >= 0 && t < this.w && r >= 0 && r < this.h && this.data[this.w * r + t] === 1;
  };
  r.prototype.index = function (r) {
    var n = new t();
    n.y = Math.floor(r / this.w);
    n.x = r - n.y * this.w;
    return n;
  };
  r.prototype.flip = function (t, r) {
    if (this.at(t, r)) {
      this.data[this.w * r + t] = 0;
    } else {
      this.data[this.w * r + t] = 1;
    }
  };
  r.prototype.copy = function () {
    var t;
    var n = new r(this.w, this.h);
    for (t = 0; t < this.size; t++) {
      n.data[t] = this.data[t];
    }
    return n;
  };
  var e = document.createElement("img");
  var y = document.createElement("canvas");
  var i = null;
  var o = [];
  var x = {
    isReady: false,
    turnpolicy: "minority",
    turdsize: 2,
    optcurve: true,
    alphamax: 1,
    opttolerance: 0.2
  };
  function f() {
    var t = y.getContext("2d");
    i = new r(y.width, y.height);
    var n;
    var a;
    var e;
    var o = t.getImageData(0, 0, i.w, i.h);
    var f = o.data.length;
    n = 0;
    a = 0;
    for (; n < f; n += 4, a++) {
      e = o.data[n] * 0.2126 + o.data[n + 1] * 0.7153 + o.data[n + 2] * 0.0721;
      i.data[a] = e < 128 ? 1 : 0;
    }
    x.isReady = true;
  }
  function c() {
    function r() {
      this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    function n(t, r, n, a, e) {
      this.x = t;
      this.y = r;
      this.xy = n;
      this.x2 = a;
      this.y2 = e;
    }
    function e(t, r) {
      if (t >= r) {
        return t % r;
      } else if (t >= 0) {
        return t;
      } else {
        return r - 1 - (-1 - t) % r;
      }
    }
    function y(t, r) {
      return t.x * r.y - t.y * r.x;
    }
    function i(t, r, n) {
      if (t <= n) {
        return t <= r && r < n;
      } else {
        return t <= r || r < n;
      }
    }
    function f(t) {
      if (t > 0) {
        return 1;
      } else if (t < 0) {
        return -1;
      } else {
        return 0;
      }
    }
    function c(t, r) {
      var n;
      var a;
      var e;
      var y = new Array(3);
      y[0] = r.x;
      y[1] = r.y;
      y[2] = 1;
      e = 0;
      n = 0;
      for (; n < 3; n++) {
        for (a = 0; a < 3; a++) {
          e += y[n] * t.at(n, a) * y[a];
        }
      }
      return e;
    }
    function u(r, n, a) {
      var e = new t();
      e.x = n.x + r * (a.x - n.x);
      e.y = n.y + r * (a.y - n.y);
      return e;
    }
    function h(r, n) {
      var a = function (r, n) {
        var a = new t();
        a.y = f(n.x - r.x);
        a.x = -f(n.y - r.y);
        return a;
      }(r, n);
      return a.y * (n.x - r.x) - a.x * (n.y - r.y);
    }
    function s(t, r, n) {
      var a;
      var e;
      var y;
      a = r.x - t.x;
      e = r.y - t.y;
      y = n.x - t.x;
      return a * (n.y - t.y) - y * e;
    }
    function v(t, r, n, a) {
      var e;
      var y;
      var i;
      e = r.x - t.x;
      y = r.y - t.y;
      i = a.x - n.x;
      return e * (a.y - n.y) - i * y;
    }
    function w(t, r, n) {
      var a;
      var e;
      a = r.x - t.x;
      e = r.y - t.y;
      return a * (n.x - t.x) + e * (n.y - t.y);
    }
    function p(t, r, n, a) {
      var e;
      var y;
      e = r.x - t.x;
      y = r.y - t.y;
      return e * (a.x - n.x) + y * (a.y - n.y);
    }
    function l(t, r) {
      return Math.sqrt((t.x - r.x) * (t.x - r.x) + (t.y - r.y) * (t.y - r.y));
    }
    function d(r, n, a, e, y) {
      var i = 1 - r;
      var o = new t();
      o.x = i * i * i * n.x + i * i * r * 3 * a.x + r * r * i * 3 * e.x + r * r * r * y.x;
      o.y = i * i * i * n.y + i * i * r * 3 * a.y + r * r * i * 3 * e.y + r * r * r * y.y;
      return o;
    }
    function m(t, r, n, a, e, y) {
      var i;
      var o;
      var x;
      var f;
      var c;
      var u;
      var h;
      var s;
      c = (f = (i = v(t, r, e, y)) * -2 + (o = v(r, n, e, y)) * 2) * f - (x = i - o * 2 + v(n, a, e, y)) * 4 * i;
      if (x === 0 || c < 0) {
        return -1;
      } else {
        s = (-f - (u = Math.sqrt(c))) / (x * 2);
        if ((h = (-f + u) / (x * 2)) >= 0 && h <= 1) {
          return h;
        } else if (s >= 0 && s <= 1) {
          return s;
        } else {
          return -1;
        }
      }
    }
    function g(t) {
      var r;
      var a;
      var e;
      t.x0 = t.pt[0].x;
      t.y0 = t.pt[0].y;
      t.sums = [];
      var y = t.sums;
      y.push(new n(0, 0, 0, 0, 0));
      r = 0;
      for (; r < t.len; r++) {
        a = t.pt[r].x - t.x0;
        e = t.pt[r].y - t.y0;
        y.push(new n(y[r].x + a, y[r].y + e, y[r].xy + a * e, y[r].x2 + a * a, y[r].y2 + e * e));
      }
    }
    function A(r) {
      var n = r.len;
      var a = r.pt;
      var o = new Array(n);
      var x = new Array(n);
      var c = new Array(4);
      r.lon = new Array(n);
      var u;
      var h;
      var s;
      var v;
      var w;
      var p;
      var l;
      var d;
      var m = [new t(), new t()];
      var g = new t();
      var A = new t();
      var b = new t();
      var M = 0;
      for (h = n - 1; h >= 0; h--) {
        if (a[h].x != a[M].x && a[h].y != a[M].y) {
          M = h + 1;
        }
        x[h] = M;
      }
      for (h = n - 1; h >= 0; h--) {
        c[0] = c[1] = c[2] = c[3] = 0;
        c[(3 + (a[e(h + 1, n)].x - a[h].x) * 3 + (a[e(h + 1, n)].y - a[h].y)) / 2]++;
        m[0].x = 0;
        m[0].y = 0;
        m[1].x = 0;
        m[1].y = 0;
        M = x[h];
        v = h;
        while (true) {
          u = 0;
          c[(3 + f(a[M].x - a[v].x) * 3 + f(a[M].y - a[v].y)) / 2]++;
          if (c[0] && c[1] && c[2] && c[3]) {
            o[h] = v;
            u = 1;
            break;
          }
          g.x = a[M].x - a[h].x;
          g.y = a[M].y - a[h].y;
          if (y(m[0], g) < 0 || y(m[1], g) > 0) {
            break;
          }
          if (!(Math.abs(g.x) <= 1) || !(Math.abs(g.y) <= 1)) {
            A.x = g.x + (g.y >= 0 && (g.y > 0 || g.x < 0) ? 1 : -1);
            A.y = g.y + (g.x <= 0 && (g.x < 0 || g.y < 0) ? 1 : -1);
            if (y(m[0], A) >= 0) {
              m[0].x = A.x;
              m[0].y = A.y;
            }
            A.x = g.x + (g.y <= 0 && (g.y < 0 || g.x < 0) ? 1 : -1);
            A.y = g.y + (g.x >= 0 && (g.x > 0 || g.y < 0) ? 1 : -1);
            if (y(m[1], A) <= 0) {
              m[1].x = A.x;
              m[1].y = A.y;
            }
          }
          if (!i(M = x[v = M], h, v)) {
            break;
          }
        }
        if (u === 0) {
          b.x = f(a[M].x - a[v].x);
          b.y = f(a[M].y - a[v].y);
          g.x = a[v].x - a[h].x;
          g.y = a[v].y - a[h].y;
          w = y(m[0], g);
          p = y(m[0], b);
          l = y(m[1], g);
          d = y(m[1], b);
          s = 10000000;
          if (p < 0) {
            s = Math.floor(w / -p);
          }
          if (d > 0) {
            s = Math.min(s, Math.floor(-l / d));
          }
          o[h] = e(v + s, n);
        }
      }
      s = o[n - 1];
      r.lon[n - 1] = s;
      h = n - 2;
      for (; h >= 0; h--) {
        if (i(h + 1, o[h], s)) {
          s = o[h];
        }
        r.lon[h] = s;
      }
      for (h = n - 1; i(e(h + 1, n), s, r.lon[h]); h--) {
        r.lon[h] = s;
      }
    }
    function b(t) {
      function r(t, r, n) {
        var a;
        var e;
        var y;
        var i;
        var o;
        var x;
        var f;
        var c;
        var u;
        var h;
        var s;
        var v = t.len;
        var w = t.pt;
        var p = t.sums;
        var l = 0;
        if (n >= v) {
          n -= v;
          l = 1;
        }
        if (l === 0) {
          a = p[n + 1].x - p[r].x;
          e = p[n + 1].y - p[r].y;
          i = p[n + 1].x2 - p[r].x2;
          y = p[n + 1].xy - p[r].xy;
          o = p[n + 1].y2 - p[r].y2;
          x = n + 1 - r;
        } else {
          a = p[n + 1].x - p[r].x + p[v].x;
          e = p[n + 1].y - p[r].y + p[v].y;
          i = p[n + 1].x2 - p[r].x2 + p[v].x2;
          y = p[n + 1].xy - p[r].xy + p[v].xy;
          o = p[n + 1].y2 - p[r].y2 + p[v].y2;
          x = n + 1 - r + v;
        }
        c = (w[r].x + w[n].x) / 2 - w[0].x;
        u = (w[r].y + w[n].y) / 2 - w[0].y;
        s = w[n].x - w[r].x;
        f = (h = -(w[n].y - w[r].y)) * h * ((i - a * 2 * c) / x + c * c) + h * 2 * s * ((y - a * u - e * c) / x + c * u) + s * s * ((o - e * 2 * u) / x + u * u);
        return Math.sqrt(f);
      }
      var n;
      var a;
      var y;
      var i;
      var o;
      var x;
      var f;
      var c = t.len;
      var u = new Array(c + 1);
      var h = new Array(c + 1);
      var s = new Array(c);
      var v = new Array(c + 1);
      var w = new Array(c + 1);
      var p = new Array(c + 1);
      for (n = 0; n < c; n++) {
        if ((f = e(t.lon[e(n - 1, c)] - 1, c)) == n) {
          f = e(n + 1, c);
        }
        s[n] = f < n ? c : f;
      }
      a = 1;
      n = 0;
      for (; n < c; n++) {
        while (a <= s[n]) {
          v[a] = n;
          a++;
        }
      }
      n = 0;
      a = 0;
      for (; n < c; a++) {
        w[a] = n;
        n = s[n];
      }
      w[a] = c;
      n = c;
      a = y = a;
      for (; a > 0; a--) {
        p[a] = n;
        n = v[n];
      }
      p[0] = 0;
      u[0] = 0;
      a = 1;
      for (; a <= y; a++) {
        for (n = p[a]; n <= w[a]; n++) {
          x = -1;
          i = w[a - 1];
          for (; i >= v[n]; i--) {
            o = r(t, i, n) + u[i];
            if (x < 0 || o < x) {
              h[n] = i;
              x = o;
            }
          }
          u[n] = x;
        }
      }
      t.m = y;
      t.po = new Array(y);
      n = c;
      a = y - 1;
      for (; n > 0; a--) {
        n = h[n];
        t.po[a] = n;
      }
    }
    function M(n) {
      function y(t, r, n, a, e) {
        var y;
        var i;
        var o;
        var x;
        var f;
        var c;
        var u;
        var h;
        var s;
        var v;
        var w;
        for (var p = t.len, l = t.sums, d = 0; n >= p;) {
          n -= p;
          d += 1;
        }
        while (r >= p) {
          r -= p;
          d -= 1;
        }
        while (n < 0) {
          n += p;
          d -= 1;
        }
        while (r < 0) {
          r += p;
          d += 1;
        }
        y = l[n + 1].x - l[r].x + d * l[p].x;
        i = l[n + 1].y - l[r].y + d * l[p].y;
        o = l[n + 1].x2 - l[r].x2 + d * l[p].x2;
        x = l[n + 1].xy - l[r].xy + d * l[p].xy;
        f = l[n + 1].y2 - l[r].y2 + d * l[p].y2;
        c = n + 1 - r + d * p;
        a.x = y / c;
        a.y = i / c;
        u = (o - y * y / c) / c;
        h = (x - y * i / c) / c;
        u -= v = (u + (s = (f - i * i / c) / c) + Math.sqrt((u - s) * (u - s) + h * 4 * h)) / 2;
        s -= v;
        if (Math.abs(u) >= Math.abs(s)) {
          if ((w = Math.sqrt(u * u + h * h)) !== 0) {
            e.x = -h / w;
            e.y = u / w;
          }
        } else if ((w = Math.sqrt(s * s + h * h)) !== 0) {
          e.x = -s / w;
          e.y = h / w;
        }
        if (w === 0) {
          e.x = e.y = 0;
        }
      }
      var i;
      var o;
      var x;
      var f;
      var u;
      var h;
      var s;
      var v;
      var w;
      var p;
      var l;
      var d;
      var m;
      var g;
      var A;
      var b = n.m;
      var M = n.po;
      var F = n.len;
      var R = n.pt;
      var C = n.x0;
      var E = n.y0;
      var k = new Array(b);
      var q = new Array(b);
      var z = new Array(b);
      var U = new Array(3);
      var X = new t();
      n.curve = new a(b);
      o = 0;
      for (; o < b; o++) {
        x = M[e(o + 1, b)];
        x = e(x - M[o], F) + M[o];
        k[o] = new t();
        q[o] = new t();
        y(n, M[o], x, k[o], q[o]);
      }
      for (o = 0; o < b; o++) {
        z[o] = new r();
        if ((i = q[o].x * q[o].x + q[o].y * q[o].y) === 0) {
          for (x = 0; x < 3; x++) {
            for (f = 0; f < 3; f++) {
              z[o].data[x * 3 + f] = 0;
            }
          }
        } else {
          U[0] = q[o].y;
          U[1] = -q[o].x;
          U[2] = -U[1] * k[o].y - U[0] * k[o].x;
          u = 0;
          for (; u < 3; u++) {
            for (f = 0; f < 3; f++) {
              z[o].data[u * 3 + f] = U[u] * U[f] / i;
            }
          }
        }
      }
      for (o = 0; o < b; o++) {
        h = new r();
        s = new t();
        X.x = R[M[o]].x - C;
        X.y = R[M[o]].y - E;
        x = e(o - 1, b);
        u = 0;
        for (; u < 3; u++) {
          for (f = 0; f < 3; f++) {
            h.data[u * 3 + f] = z[x].at(u, f) + z[o].at(u, f);
          }
        }
        while (true) {
          if ((p = h.at(0, 0) * h.at(1, 1) - h.at(0, 1) * h.at(1, 0)) !== 0) {
            s.x = (-h.at(0, 2) * h.at(1, 1) + h.at(1, 2) * h.at(0, 1)) / p;
            s.y = (h.at(0, 2) * h.at(1, 0) - h.at(1, 2) * h.at(0, 0)) / p;
            break;
          }
          if (h.at(0, 0) > h.at(1, 1)) {
            U[0] = -h.at(0, 1);
            U[1] = h.at(0, 0);
          } else if (h.at(1, 1)) {
            U[0] = -h.at(1, 1);
            U[1] = h.at(1, 0);
          } else {
            U[0] = 1;
            U[1] = 0;
          }
          i = U[0] * U[0] + U[1] * U[1];
          U[2] = -U[1] * X.y - U[0] * X.x;
          u = 0;
          for (; u < 3; u++) {
            for (f = 0; f < 3; f++) {
              h.data[u * 3 + f] += U[u] * U[f] / i;
            }
          }
        }
        v = Math.abs(s.x - X.x);
        w = Math.abs(s.y - X.y);
        if (v <= 0.5 && w <= 0.5) {
          n.curve.vertex[o] = new t(s.x + C, s.y + E);
        } else {
          l = c(h, X);
          m = X.x;
          g = X.y;
          if (h.at(0, 0) !== 0) {
            for (A = 0; A < 2; A++) {
              s.y = X.y - 0.5 + A;
              s.x = -(h.at(0, 1) * s.y + h.at(0, 2)) / h.at(0, 0);
              v = Math.abs(s.x - X.x);
              d = c(h, s);
              if (v <= 0.5 && d < l) {
                l = d;
                m = s.x;
                g = s.y;
              }
            }
          }
          if (h.at(1, 1) !== 0) {
            for (A = 0; A < 2; A++) {
              s.x = X.x - 0.5 + A;
              s.y = -(h.at(1, 0) * s.x + h.at(1, 2)) / h.at(1, 1);
              w = Math.abs(s.y - X.y);
              d = c(h, s);
              if (w <= 0.5 && d < l) {
                l = d;
                m = s.x;
                g = s.y;
              }
            }
          }
          for (u = 0; u < 2; u++) {
            for (f = 0; f < 2; f++) {
              s.x = X.x - 0.5 + u;
              s.y = X.y - 0.5 + f;
              if ((d = c(h, s)) < l) {
                l = d;
                m = s.x;
                g = s.y;
              }
            }
          }
          n.curve.vertex[o] = new t(m + C, g + E);
        }
      }
    }
    function F(t) {
      var r;
      var n;
      var a;
      var e = t.curve;
      var y = e.n;
      var i = e.vertex;
      r = 0;
      n = y - 1;
      for (; r < n; r++, n--) {
        a = i[r];
        i[r] = i[n];
        i[n] = a;
      }
    }
    function R(t) {
      var r;
      var n;
      var a;
      var y;
      var i;
      var o;
      var f;
      var c;
      var v;
      var w = t.curve.n;
      var p = t.curve;
      for (r = 0; r < w; r++) {
        n = e(r + 1, w);
        a = e(r + 2, w);
        v = u(0.5, p.vertex[a], p.vertex[n]);
        if ((i = h(p.vertex[r], p.vertex[a])) !== 0) {
          y = s(p.vertex[r], p.vertex[n], p.vertex[a]) / i;
          o = (y = Math.abs(y)) > 1 ? 1 - 1 / y : 0;
          o /= 0.75;
        } else {
          o = 4 / 3;
        }
        p.alpha0[n] = o;
        if (o >= x.alphamax) {
          p.tag[n] = "CORNER";
          p.c[n * 3 + 1] = p.vertex[n];
          p.c[n * 3 + 2] = v;
        } else {
          if (o < 0.55) {
            o = 0.55;
          } else if (o > 1) {
            o = 1;
          }
          f = u(0.5 + o * 0.5, p.vertex[r], p.vertex[n]);
          c = u(0.5 + o * 0.5, p.vertex[a], p.vertex[n]);
          p.tag[n] = "CURVE";
          p.c[n * 3 + 0] = f;
          p.c[n * 3 + 1] = c;
          p.c[n * 3 + 2] = v;
        }
        p.alpha[n] = o;
        p.beta[n] = 0.5;
      }
      p.alphacurve = 1;
    }
    function C(r) {
      function n() {
        this.pen = 0;
        this.c = [new t(), new t()];
        this.t = 0;
        this.s = 0;
        this.alpha = 0;
      }
      function y(t, r, n, a, y, i, o) {
        var x;
        var c;
        var h;
        var g;
        var A;
        var b;
        var M;
        var F;
        var R;
        var C;
        var E;
        var k;
        var q;
        var z;
        var U;
        var X;
        var V;
        var Y;
        var I;
        var O;
        var P;
        var D;
        var L = t.curve.n;
        var N = t.curve;
        var j = N.vertex;
        if (r == n) {
          return 1;
        }
        x = r;
        A = e(r + 1, L);
        if ((g = i[c = e(x + 1, L)]) === 0) {
          return 1;
        }
        F = l(j[r], j[A]);
        x = c;
        for (; x != n; x = c) {
          c = e(x + 1, L);
          h = e(x + 2, L);
          if (i[c] != g) {
            return 1;
          }
          if (f(v(j[r], j[A], j[c], j[h])) != g) {
            return 1;
          }
          if (p(j[r], j[A], j[c], j[h]) < F * l(j[c], j[h]) * -0.999847695156) {
            return 1;
          }
        }
        E = N.c[e(r, L) * 3 + 2].copy();
        k = j[e(r + 1, L)].copy();
        q = j[e(n, L)].copy();
        z = N.c[e(n, L) * 3 + 2].copy();
        b = o[n] - o[r];
        b -= s(j[0], N.c[r * 3 + 2], N.c[n * 3 + 2]) / 2;
        if (r >= n) {
          b += o[L];
        }
        Y = s(E, k, q);
        I = s(E, k, z);
        O = s(E, q, z);
        if (I == Y) {
          return 1;
        }
        P = I / (I - Y);
        if ((X = I * (D = O / (O - (Y + O - I))) / 2) === 0) {
          return 1;
        }
        V = b / X;
        M = 2 - Math.sqrt(4 - V / 0.3);
        a.c[0] = u(D * M, E, k);
        a.c[1] = u(P * M, z, q);
        a.alpha = M;
        a.t = D;
        a.s = P;
        k = a.c[0].copy();
        q = a.c[1].copy();
        a.pen = 0;
        x = e(r + 1, L);
        for (; x != n; x = c) {
          c = e(x + 1, L);
          if ((D = m(E, k, q, z, j[x], j[c])) < -0.5) {
            return 1;
          }
          U = d(D, E, k, q, z);
          if ((F = l(j[x], j[c])) === 0) {
            return 1;
          }
          R = s(j[x], j[c], U) / F;
          if (Math.abs(R) > y) {
            return 1;
          }
          if (w(j[x], j[c], U) < 0 || w(j[c], j[x], U) < 0) {
            return 1;
          }
          a.pen += R * R;
        }
        for (x = r; x != n; x = c) {
          c = e(x + 1, L);
          if ((D = m(E, k, q, z, N.c[x * 3 + 2], N.c[c * 3 + 2])) < -0.5) {
            return 1;
          }
          U = d(D, E, k, q, z);
          if ((F = l(N.c[x * 3 + 2], N.c[c * 3 + 2])) === 0) {
            return 1;
          }
          R = s(N.c[x * 3 + 2], N.c[c * 3 + 2], U) / F;
          C = s(N.c[x * 3 + 2], N.c[c * 3 + 2], j[c]) / F;
          if ((C *= N.alpha[c] * 0.75) < 0) {
            R = -R;
            C = -C;
          }
          if (R < C - y) {
            return 1;
          }
          if (R < C) {
            a.pen += (R - C) * (R - C);
          }
        }
        return 0;
      }
      var i;
      var o;
      var c;
      var h;
      var g;
      var A;
      var b;
      var M;
      var F;
      var R;
      var C = r.curve;
      var E = C.n;
      var k = C.vertex;
      var q = new Array(E + 1);
      var z = new Array(E + 1);
      var U = new Array(E + 1);
      var X = new Array(E + 1);
      var V = new n();
      var Y = new Array(E);
      var I = new Array(E + 1);
      for (o = 0; o < E; o++) {
        if (C.tag[o] == "CURVE") {
          Y[o] = f(s(k[e(o - 1, E)], k[o], k[e(o + 1, E)]));
        } else {
          Y[o] = 0;
        }
      }
      A = 0;
      I[0] = 0;
      h = C.vertex[0];
      o = 0;
      for (; o < E; o++) {
        g = e(o + 1, E);
        if (C.tag[g] == "CURVE") {
          A += (b = C.alpha[g]) * 0.3 * (4 - b) * s(C.c[o * 3 + 2], k[g], C.c[g * 3 + 2]) / 2;
          A += s(h, C.c[o * 3 + 2], C.c[g * 3 + 2]) / 2;
        }
        I[o + 1] = A;
      }
      q[0] = -1;
      z[0] = 0;
      U[0] = 0;
      c = 1;
      for (; c <= E; c++) {
        q[c] = c - 1;
        z[c] = z[c - 1];
        U[c] = U[c - 1] + 1;
        o = c - 2;
        for (; o >= 0 && !y(r, o, e(c, E), V, x.opttolerance, Y, I); o--) {
          if (U[c] > U[o] + 1 || U[c] == U[o] + 1 && z[c] > z[o] + V.pen) {
            q[c] = o;
            z[c] = z[o] + V.pen;
            U[c] = U[o] + 1;
            X[c] = V;
            V = new n();
          }
        }
      }
      M = new a(i = U[E]);
      F = new Array(i);
      R = new Array(i);
      c = E;
      o = i - 1;
      for (; o >= 0; o--) {
        if (q[c] == c - 1) {
          M.tag[o] = C.tag[e(c, E)];
          M.c[o * 3 + 0] = C.c[e(c, E) * 3 + 0];
          M.c[o * 3 + 1] = C.c[e(c, E) * 3 + 1];
          M.c[o * 3 + 2] = C.c[e(c, E) * 3 + 2];
          M.vertex[o] = C.vertex[e(c, E)];
          M.alpha[o] = C.alpha[e(c, E)];
          M.alpha0[o] = C.alpha0[e(c, E)];
          M.beta[o] = C.beta[e(c, E)];
          F[o] = R[o] = 1;
        } else {
          M.tag[o] = "CURVE";
          M.c[o * 3 + 0] = X[c].c[0];
          M.c[o * 3 + 1] = X[c].c[1];
          M.c[o * 3 + 2] = C.c[e(c, E) * 3 + 2];
          M.vertex[o] = u(X[c].s, C.c[e(c, E) * 3 + 2], k[e(c, E)]);
          M.alpha[o] = X[c].alpha;
          M.alpha0[o] = X[c].alpha;
          F[o] = X[c].s;
          R[o] = X[c].t;
        }
        c = q[c];
      }
      for (o = 0; o < i; o++) {
        g = e(o + 1, i);
        M.beta[o] = F[o] / (F[o] + R[g]);
      }
      M.alphacurve = 1;
      r.curve = M;
    }
    r.prototype.at = function (t, r) {
      return this.data[t * 3 + r];
    };
    for (var E = 0; E < o.length; E++) {
      var k = o[E];
      g(k);
      A(k);
      b(k);
      M(k);
      if (k.sign === "-") {
        F(k);
      }
      R(k);
      if (x.optcurve) {
        C(k);
      }
    }
  }
  function u() {
    i = null;
    o = [];
    x.isReady = false;
  }
  e.onload = function () {
    y.width = e.width;
    y.height = e.height;
    y.getContext("2d").drawImage(e, 0, 0);
    f();
  };
  return {
    loadImageFromFile: function (t) {
      if (x.isReady) {
        u();
      }
      e.file = t;
      var r;
      var n = new FileReader();
      r = e;
      n.onload = function (t) {
        r.src = t.target.result;
      };
      n.readAsDataURL(t);
    },
    loadImageFromUrl: function (t) {
      if (x.isReady) {
        u();
      }
      e.src = t;
    },
    setCanvas: function (t) {
      y = t;
      f();
    },
    clear: u,
    setParameter: function (t) {
      var r;
      for (r in t) {
        if (t.hasOwnProperty(r)) {
          x[r] = t[r];
        }
      }
    },
    process: function (r) {
      (function () {
        var r;
        var a = i.copy();
        var e = new t(0, 0);
        function y(t) {
          for (var r = a.w * t.y + t.x; r < a.size && a.data[r] !== 1;) {
            r++;
          }
          return r < a.size && a.index(r);
        }
        function f(t, r) {
          var n;
          var e;
          var y;
          for (n = 2; n < 5; n++) {
            y = 0;
            e = 1 - n;
            for (; e <= n - 1; e++) {
              y += a.at(t + e, r + n - 1) ? 1 : -1;
              y += a.at(t + n - 1, r + e - 1) ? 1 : -1;
              y += a.at(t + e - 1, r - n) ? 1 : -1;
              y += a.at(t - n, r + e) ? 1 : -1;
            }
            if (y > 0) {
              return 1;
            }
            if (y < 0) {
              return 0;
            }
          }
          return 0;
        }
        function c(r) {
          var e;
          var y = new n();
          var o = r.x;
          var c = r.y;
          var u = 0;
          var h = 1;
          for (y.sign = i.at(r.x, r.y) ? "+" : "-"; y.pt.push(new t(o, c)), o > y.maxX && (y.maxX = o), o < y.minX && (y.minX = o), c > y.maxY && (y.maxY = c), c < y.minY && (y.minY = c), y.len++, o += u, c += h, y.area -= o * h, o !== r.x || c !== r.y;) {
            var s = a.at(o + (u + h - 1) / 2, c + (h - u - 1) / 2);
            var v = a.at(o + (u - h - 1) / 2, c + (h + u - 1) / 2);
            if (v && !s) {
              if (x.turnpolicy === "right" || x.turnpolicy === "black" && y.sign === "+" || x.turnpolicy === "white" && y.sign === "-" || x.turnpolicy === "majority" && f(o, c) || x.turnpolicy === "minority" && !f(o, c)) {
                e = u;
                u = -h;
                h = e;
              } else {
                e = u;
                u = h;
                h = -e;
              }
            } else if (v) {
              e = u;
              u = -h;
              h = e;
            } else if (!s) {
              e = u;
              u = h;
              h = -e;
            }
          }
          return y;
        }
        function u(t) {
          var r;
          var n;
          var e;
          var y;
          var i;
          var o;
          var x = t.pt[0].y;
          var f = t.len;
          for (i = 1; i < f; i++) {
            r = t.pt[i].x;
            if ((n = t.pt[i].y) !== x) {
              y = x < n ? x : n;
              e = t.maxX;
              o = r;
              for (; o < e; o++) {
                a.flip(o, y);
              }
              x = n;
            }
          }
        }
        while (e = y(e)) {
          u(r = c(e));
          if (r.area > x.turdsize) {
            o.push(r);
          }
        }
      })();
      c();
    },
    getSVG: function (t, r) {
      function n(r) {
        function n(n) {
          var a = "C " + (r.c[n * 3 + 0].x * t).toFixed(3) + " " + (r.c[n * 3 + 0].y * t).toFixed(3) + ",";
          a += (r.c[n * 3 + 1].x * t).toFixed(3) + " " + (r.c[n * 3 + 1].y * t).toFixed(3) + ",";
          return a += (r.c[n * 3 + 2].x * t).toFixed(3) + " " + (r.c[n * 3 + 2].y * t).toFixed(3) + " ";
        }
        function a(n) {
          var a = "L " + (r.c[n * 3 + 1].x * t).toFixed(3) + " " + (r.c[n * 3 + 1].y * t).toFixed(3) + " ";
          return a += (r.c[n * 3 + 2].x * t).toFixed(3) + " " + (r.c[n * 3 + 2].y * t).toFixed(3) + " ";
        }
        var e;
        var y = r.n;
        var i = "M" + (r.c[(y - 1) * 3 + 2].x * t).toFixed(3) + " " + (r.c[(y - 1) * 3 + 2].y * t).toFixed(3) + " ";
        for (e = 0; e < y; e++) {
          if (r.tag[e] === "CURVE") {
            i += n(e);
          } else if (r.tag[e] === "CORNER") {
            i += a(e);
          }
        }
        return i;
      }
      var a;
      var e;
      var y;
      var x;
      var f = i.w * t;
      var c = i.h * t;
      var u = o.length;
      var h = "<svg id=\"svg\" version=\"1.1\" width=\"" + f + "\" height=\"" + c + "\" xmlns=\"http://www.w3.org/2000/svg\">";
      h += "<path d=\"";
      a = 0;
      for (; a < u; a++) {
        h += n(o[a].curve);
      }
      if (r === "curve") {
        e = "black";
        y = "none";
        x = "";
      } else {
        e = "none";
        y = "black";
        x = " fill-rule=\"evenodd\"";
      }
      return h += "\" stroke=\"" + e + "\" fill=\"" + y + "\"" + x + "/></svg>";
    },
    img: e
  };
}();

export default Potrace
