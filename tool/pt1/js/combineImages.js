(() => {
    var S = Object.create;
    var I = Object.defineProperty;
    var B = Object.getOwnPropertyDescriptor;
    var M = Object.getOwnPropertyNames;
    var T = Object.getPrototypeOf,
        U = Object.prototype.hasOwnProperty;
    var x = (n, e) => () => (e || n((e = {
        exports: {}
    }).exports, e), e.exports);
    var k = (n, e, t, o) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (let a of M(e)) !U.call(n, a) && a !== t && I(n, a, {
                get: () => e[a],
                enumerable: !(o = B(e, a)) || o.enumerable
            });
        return n
    };
    var A = (n, e, t) => (t = n != null ? S(T(n)) : {}, k(e || !n || !n.__esModule ? I(t, "default", {
        value: n,
        enumerable: !0
    }) : t, n));
    var f = (n, e, t) => new Promise((o, a) => {
        var c = s => {
                try {
                    h(t.next(s))
                } catch (g) {
                    a(g)
                }
            },
            r = s => {
                try {
                    h(t.throw(s))
                } catch (g) {
                    a(g)
                }
            },
            h = s => s.done ? o(s.value) : Promise.resolve(s.value).then(c, r);
        h((t = t.apply(n, e)).next())
    });
    var F = x((C, D) => {
        var p = class {
            constructor(e, t) {
                this.canvas = e, this.Image = t, this.ctx = this.canvas.getContext("2d")
            }
            merge(e, t = 1) {
                return f(this, null, function* () {
                    let o = yield this.loadImages(e), a = [], c = 10, r = o.reduce((i, l) => Math.max(i, l.width), 0), h = o.reduce((i, l) => i + l.height * t + c, 0);
                    this.canvas.width = r * t, this.canvas.height = h;
                    let s = 0,
                        g = 0;
                    for (let i = 0; i < e.length; i += 1) {
                        let l = e[i],
                            m = "";
                        typeof File == "function" && l instanceof File ? m = l.name.split(".").shift() : m = l.split("/").pop().split(".").shift();
                        let {
                            width: d,
                            height: u
                        } = o[i], y = d * t, w = u * t;
                        this.ctx.drawImage(o[i], g * t, s, y, w), a.push([m, g * t, s, y, w]), s += w + c
                    }
                    return [this.getData(), a]
                })
            }
            mergeToOneColumn(e, t = 1) {
                return f(this, null, function* () {
                    let o = yield this.loadImages(e), a = [], c = o.reduce((i, l) => Math.min(i, l.width), Number.MAX_VALUE), r = o.map(i => i.height / i.width * c), h = 0;
                    for (let i of r) h += i;
                    this.canvas.width = c;
                    this.canvas.height = h;
                    let s = 0,
                        g = 0;
                    for (let i = 0; i < e.length; i += 1) {
                        let l = e[i],
                            m = "";
                        typeof File == "function" && l instanceof File ? m = l.name.split(".").shift() : m = l.split("/").pop().split(".").shift();
                        let d = c * t,
                            u = r[i] * t;
                        this.ctx.drawImage(o[i], g, s, d, u), a.push([m, g, s, d, u]), s += u + 10
                    }
                    return a
                })
            }
            getData() {
                return this.canvas.toBuffer ? this.canvas.toBuffer() : this.canvas.toDataURL()
            }
            loadImages(e) {
                let t = [],
                    o = 0,
                    {
                        length: a
                    } = e;
                return new Promise((c, r) => {
                    for (let h = 0; h < e.length; h += 1) {
                        let s = new this.Image,
                            g = e[h];
                        if (s.onerror = r, s.onload = () => {
                                t[h] = s, o += 1, o === a && c(t)
                            }, typeof File == "function" && g instanceof File) {
                            let i = new FileReader;
                            i.addEventListener("load", () => {
                                s.src = i.result
                            }, !1), i.readAsDataURL(g)
                        } else s.src = g
                    }
                })
            }
        };
        D.exports = p
    });
    var W = x(R => {
        var E = A(F()),
            L = document.getElementById("mycanvas"),
            H = new E.default(L, Image),
            v = document.getElementById("select-imgs");
        v.onchange = () => f(R, null, function* () {
            console.log(v.files);
            let n = yield H.mergeToOneColumn(v.files);
            console.log(n)
        });
        var _ = document.getElementById("download");
        _.addEventListener("click", function () {
            let n = document.createElement("a");
            n.download = O() + "_ci.png", n.href = L.toDataURL(), n.click(), n.delete
        });

        function O() {
            var n = new Date,
                e = n.getFullYear(),
                t = n.getMonth() + 1,
                o = n.getDate(),
                a = n.getHours(),
                c = n.getMinutes(),
                r = n.getSeconds();
            t.toString().length == 1 && (t = "0" + t), o.toString().length == 1 && (o = "0" + o), a.toString().length == 1 && (a = "0" + a), c.toString().length == 1 && (c = "0" + c), r.toString().length == 1 && (r = "0" + r);
            var h = e + t + o + "_" + a + c + r;
            return h
        }
    });
    W();
})();   