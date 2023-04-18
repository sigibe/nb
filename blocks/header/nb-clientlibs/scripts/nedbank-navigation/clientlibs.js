(function(g, l) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l() : "function" == typeof define && define.amd ? define(l) : g.Popper = l()
}
)(this, function() {
    function g(a) {
        return a && "[object Function]" === {}.toString.call(a)
    }
    function l(a, b) {
        if (1 !== a.nodeType)
            return [];
        a = window.getComputedStyle(a, null);
        return b ? a[b] : a
    }
    function p(a) {
        return "HTML" === a.nodeName ? a : a.parentNode || a.host
    }
    function k(a) {
        if (!a || -1 !== ["HTML", "BODY", "#document"].indexOf(a.nodeName))
            return window.document.body;
        var b = l(a);
        return /(auto|scroll)/.test(b.overflow + b.overflowY + b.overflowX) ? a : k(p(a))
    }
    function r(a) {
        var b = (a = a && a.offsetParent) && a.nodeName;
        return b && "BODY" !== b && "HTML" !== b ? -1 !== ["TD", "TABLE"].indexOf(a.nodeName) && "static" === l(a, "position") ? r(a) : a : window.document.documentElement
    }
    function u(a) {
        return null === a.parentNode ? a : u(a.parentNode)
    }
    function w(a, b) {
        if (!(a && a.nodeType && b && b.nodeType))
            return window.document.documentElement;
        var c = a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
          , d = c ? a : b;
        c = c ? b : a;
        var e = document.createRange();
        e.setStart(d, 0);
        e.setEnd(c, 0);
        e = e.commonAncestorContainer;
        if (a !== e && b !== e || d.contains(c))
            return a = e.nodeName,
            "BODY" === a || "HTML" !== a && r(e.firstElementChild) !== e ? r(e) : e;
        d = u(a);
        return d.host ? w(d.host, b) : w(a, u(b).host)
    }
    function v(a) {
        var b = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft"
          , c = a.nodeName;
        return "BODY" === c || "HTML" === c ? (c = window.document.documentElement,
        (window.document.scrollingElement || c)[b]) : a[b]
    }
    function z(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] && arguments[2]
          , d = v(b, "top")
          , e = v(b, "left");
        c = c ? -1 : 1;
        return a.top += d * c,
        a.bottom += d * c,
        a.left += e * c,
        a.right += e * c,
        a
    }
    function O(a, b) {
        b = "x" === b ? "Left" : "Top";
        var c = "Left" == b ? "Right" : "Bottom";
        return +a["border" + b + "Width"].split("px")[0] + +a["border" + c + "Width"].split("px")[0]
    }
    function P(a, b, c, d) {
        return x(b["offset" + a], c["client" + a], c["offset" + a], B() ? c["offset" + a] + d["margin" + ("Height" === a ? "Top" : "Left")] + d["margin" + ("Height" === a ? "Bottom" : "Right")] : 0)
    }
    function Q() {
        var a = window.document.body
          , b = window.document.documentElement
          , c = B() && window.getComputedStyle(b);
        return {
            height: P("Height", a, b, c),
            width: P("Width", a, b, c)
        }
    }
    function m(a) {
        return t({}, a, {
            right: a.left + a.width,
            bottom: a.top + a.height
        })
    }
    function G(a) {
        var b = {};
        if (B())
            try {
                b = a.getBoundingClientRect();
                var c = v(a, "top")
                  , d = v(a, "left");
                b.top += c;
                b.left += d;
                b.bottom += c;
                b.right += d
            } catch (e) {}
        else
            b = a.getBoundingClientRect();
        b = {
            left: b.left,
            top: b.top,
            width: b.right - b.left,
            height: b.bottom - b.top
        };
        d = "HTML" === a.nodeName ? Q() : {};
        c = a.offsetWidth - (d.width || a.clientWidth || b.right - b.left);
        d = a.offsetHeight - (d.height || a.clientHeight || b.bottom - b.top);
        if (c || d)
            a = l(a),
            c -= O(a, "x"),
            d -= O(a, "y"),
            b.width -= c,
            b.height -= d;
        return m(b)
    }
    function C(a, b) {
        var c = B()
          , d = "HTML" === b.nodeName
          , e = G(a)
          , f = G(b);
        a = k(a);
        var h = l(b)
          , q = +h.borderTopWidth.split("px")[0]
          , H = +h.borderLeftWidth.split("px")[0];
        e = m({
            top: e.top - f.top - q,
            left: e.left - f.left - H,
            width: e.width,
            height: e.height
        });
        if (e.marginTop = 0,
        e.marginLeft = 0,
        !c && d)
            d = +h.marginTop.split("px")[0],
            h = +h.marginLeft.split("px")[0],
            e.top -= q - d,
            e.bottom -= q - d,
            e.left -= H - h,
            e.right -= H - h,
            e.marginTop = d,
            e.marginLeft = h;
        return (c ? b.contains(a) : b === a && "BODY" !== a.nodeName) && (e = z(e, b)),
        e
    }
    function R(a) {
        var b = a.nodeName;
        return "BODY" === b || "HTML" === b ? !1 : "fixed" === l(a, "position") || R(p(a))
    }
    function I(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        b = w(a, b);
        if ("viewport" === d) {
            e = window.document.documentElement;
            b = C(b, e);
            var f = x(e.clientWidth, window.innerWidth || 0);
            a = x(e.clientHeight, window.innerHeight || 0);
            d = v(e);
            e = v(e, "left");
            e = m({
                top: d - b.top + b.marginTop,
                left: e - b.left + b.marginLeft,
                width: f,
                height: a
            })
        } else
            "scrollParent" === d ? (f = k(p(a)),
            "BODY" === f.nodeName && (f = window.document.documentElement)) : "window" === d ? f = window.document.documentElement : f = d,
            a = C(f, b),
            "HTML" !== f.nodeName || R(b) ? e = a : (f = Q(),
            b = f.height,
            f = f.width,
            e.top += a.top - a.marginTop,
            e.bottom = b + a.top,
            e.left += a.left - a.marginLeft,
            e.right = f + a.left);
        return e.left += c,
        e.top += c,
        e.right -= c,
        e.bottom -= c,
        e
    }
    function S(a, b, c, d, e) {
        var f = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === a.indexOf("auto"))
            return a;
        f = I(c, d, f, e);
        var h = {
            top: {
                width: f.width,
                height: b.top - f.top
            },
            right: {
                width: f.right - b.right,
                height: f.height
            },
            bottom: {
                width: f.width,
                height: f.bottom - b.bottom
            },
            left: {
                width: b.left - f.left,
                height: f.height
            }
        };
        f = Object.keys(h).map(function(a) {
            var b = h[a];
            return t({
                key: a
            }, h[a], {
                area: b.width * b.height
            })
        }).sort(function(a, b) {
            return b.area - a.area
        });
        var q = f.filter(function(a) {
            var b = a.height;
            return a.width >= c.clientWidth && b >= c.clientHeight
        });
        f = 0 < q.length ? q[0].key : f[0].key;
        q = a.split("-")[1];
        return f + (q ? "-" + q : "")
    }
    function T(a) {
        var b = window.getComputedStyle(a)
          , c = parseFloat(b.marginTop) + parseFloat(b.marginBottom);
        b = parseFloat(b.marginLeft) + parseFloat(b.marginRight);
        return {
            width: a.offsetWidth + b,
            height: a.offsetHeight + c
        }
    }
    function D(a) {
        var b = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return a.replace(/left|right|bottom|top/g, function(a) {
            return b[a]
        })
    }
    function U(a, b, c) {
        c = c.split("-")[0];
        a = T(a);
        var d = {
            width: a.width,
            height: a.height
        }
          , e = -1 !== ["right", "left"].indexOf(c)
          , f = e ? "top" : "left"
          , h = e ? "left" : "top"
          , q = e ? "height" : "width";
        return d[f] = b[f] + b[q] / 2 - a[q] / 2,
        d[h] = c === h ? b[h] - a[e ? "width" : "height"] : b[D(h)],
        d
    }
    function A(a, b) {
        return Array.prototype.find ? a.find(b) : a.filter(b)[0]
    }
    function ea(a, b, c) {
        if (Array.prototype.findIndex)
            return a.findIndex(function(a) {
                return a[b] === c
            });
        var d = A(a, function(a) {
            return a[b] === c
        });
        return a.indexOf(d)
    }
    function V(a, b, c) {
        return (void 0 === c ? a : a.slice(0, ea(a, "name", c))).forEach(function(a) {
            a.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var c = a.function || a.fn;
            a.enabled && g(c) && (b.offsets.popper = m(b.offsets.popper),
            b.offsets.reference = m(b.offsets.reference),
            b = c(b, a))
        }),
        b
    }
    function W(a, b) {
        return a.some(function(a) {
            var c = a.name;
            return a.enabled && c === b
        })
    }
    function X(a) {
        for (var b = [!1, "ms", "Webkit", "Moz", "O"], c = a.charAt(0).toUpperCase() + a.slice(1), d = 0; d < b.length - 1; d++) {
            var e = b[d];
            e = e ? "" + e + c : a;
            if ("undefined" != typeof window.document.body.style[e])
                return e
        }
        return null
    }
    function Y(a, b, c, d) {
        var e = "BODY" === a.nodeName;
        a = e ? window : a;
        a.addEventListener(b, c, {
            passive: !0
        });
        e || Y(k(a.parentNode), b, c, d);
        d.push(a)
    }
    function fa(a, b) {
        return window.removeEventListener("resize", b.updateBound),
        b.scrollParents.forEach(function(a) {
            a.removeEventListener("scroll", b.updateBound)
        }),
        b.updateBound = null,
        b.scrollParents = [],
        b.scrollElement = null,
        b.eventsEnabled = !1,
        b
    }
    function J(a) {
        return "" !== a && !isNaN(parseFloat(a)) && isFinite(a)
    }
    function K(a, b) {
        Object.keys(b).forEach(function(c) {
            var d = "";
            -1 !== "width height top right bottom left".split(" ").indexOf(c) && J(b[c]) && (d = "px");
            a.style[c] = b[c] + d
        })
    }
    function ha(a, b) {
        Object.keys(b).forEach(function(c) {
            !1 === b[c] ? a.removeAttribute(c) : a.setAttribute(c, b[c])
        })
    }
    function Z(a, b, c) {
        var d = A(a, function(a) {
            return a.name === b
        });
        a = !!d && a.some(function(a) {
            return a.name === c && a.enabled && a.order < d.order
        });
        if (!a) {
            var e = "`" + b + "`";
            console.warn("`" + c + "` modifier is required by " + e + " modifier in order to work, be sure to include it before " + e + "!")
        }
        return a
    }
    function aa(a) {
        var b = 1 < arguments.length && void 0 !== arguments[1] && arguments[1]
          , c = L.indexOf(a);
        c = L.slice(c + 1).concat(L.slice(0, c));
        return b ? c.reverse() : c
    }
    function ia(a, b, c, d) {
        var e = [0, 0]
          , f = -1 !== ["right", "left"].indexOf(d);
        a = a.split(/(\+|\-)/).map(function(a) {
            return a.trim()
        });
        d = a.indexOf(A(a, function(a) {
            return -1 !== a.search(/,|\s/)
        }));
        a[d] && -1 === a[d].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var h = /\s*,\s*|\s+/;
        a = -1 === d ? [a] : [a.slice(0, d).concat([a[d].split(h)[0]]), [a[d].split(h)[1]].concat(a.slice(d + 1))];
        return a = a.map(function(a, d) {
            var e = (1 === d ? !f : f) ? "height" : "width"
              , h = !1;
            return a.reduce(function(a, b) {
                return "" === a[a.length - 1] && -1 !== ["+", "-"].indexOf(b) ? (a[a.length - 1] = b,
                h = !0,
                a) : h ? (a[a.length - 1] += b,
                h = !1,
                a) : a.concat(b)
            }, []).map(function(a) {
                var d = a.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
                var f = +d[1];
                d = d[2];
                if (f)
                    if (0 === d.indexOf("%")) {
                        switch (d) {
                        case "%p":
                            var h = b;
                            break;
                        default:
                            h = c
                        }
                        f *= m(h)[e] / 100
                    } else {
                        if ("vh" === d || "vw" === d)
                            f = (h = "vh" === d ? x(document.documentElement.clientHeight, window.innerHeight || 0) : x(document.documentElement.clientWidth, window.innerWidth || 0),
                            h / 100 * f)
                    }
                else
                    f = a;
                return f
            })
        }),
        a.forEach(function(a, b) {
            a.forEach(function(d, c) {
                J(d) && (e[b] += d * ("-" === a[c - 1] ? -1 : 1))
            })
        }),
        e
    }
    for (var ba = Math.min, n = Math.floor, x = Math.max, ja = ["native code", "[object MutationObserverConstructor]"], E = function(a) {
        return ja.some(function(b) {
            return -1 < (a || "").toString().indexOf(b)
        })
    }, y = "undefined" != typeof window, ca = ["Edge", "Trident", "Firefox"], da = 0, M = 0; M < ca.length; M += 1)
        if (y && 0 <= navigator.userAgent.indexOf(ca[M])) {
            da = 1;
            break
        }
    var N, ka = y && E(window.MutationObserver) ? function(a) {
        var b = !1
          , c = 0
          , d = document.createElement("span");
        return (new MutationObserver(function() {
            a();
            b = !1
        }
        )).observe(d, {
            attributes: !0
        }),
        function() {
            b || (b = !0,
            d.setAttribute("x-index", c),
            ++c)
        }
    }
    : function(a) {
        var b = !1;
        return function() {
            b || (b = !0,
            setTimeout(function() {
                b = !1;
                a()
            }, da))
        }
    }
    , B = function() {
        return void 0 == N && (N = -1 !== navigator.appVersion.indexOf("MSIE 10")),
        N
    }, la = function() {
        function a(a, c) {
            for (var b, e = 0; e < c.length; e++)
                b = c[e],
                b.enumerable = b.enumerable || !1,
                b.configurable = !0,
                "value"in b && (b.writable = !0),
                Object.defineProperty(a, b.key, b)
        }
        return function(b, c, d) {
            return c && a(b.prototype, c),
            d && a(b, d),
            b
        }
    }(), F = function(a, b, c) {
        return b in a ? Object.defineProperty(a, b, {
            value: c,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : a[b] = c,
        a
    }, t = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++)
            for (var d in b = arguments[c],
            b)
                Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a
    }
    ;
    E = "auto-start auto auto-end top-start top top-end right-start right right-end bottom-end bottom bottom-start left-end left left-start".split(" ");
    var L = E.slice(3);
    y = function() {
        function a(b, c) {
            var d = this
              , e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            if (!(this instanceof a))
                throw new TypeError("Cannot call a class as a function");
            this.scheduleUpdate = function() {
                return requestAnimationFrame(d.update)
            }
            ;
            this.update = ka(this.update.bind(this));
            this.options = t({}, a.Defaults, e);
            this.state = {
                isDestroyed: !1,
                isCreated: !1,
                scrollParents: []
            };
            this.reference = b.jquery ? b[0] : b;
            this.popper = c.jquery ? c[0] : c;
            this.options.modifiers = {};
            Object.keys(t({}, a.Defaults.modifiers, e.modifiers)).forEach(function(b) {
                d.options.modifiers[b] = t({}, a.Defaults.modifiers[b] || {}, e.modifiers ? e.modifiers[b] : {})
            });
            this.modifiers = Object.keys(this.options.modifiers).map(function(a) {
                return t({
                    name: a
                }, d.options.modifiers[a])
            }).sort(function(a, b) {
                return a.order - b.order
            });
            this.modifiers.forEach(function(a) {
                a.enabled && g(a.onLoad) && a.onLoad(d.reference, d.popper, d.options, a, d.state)
            });
            this.update();
            var f = this.options.eventsEnabled;
            f && this.enableEventListeners();
            this.state.eventsEnabled = f
        }
        return la(a, [{
            key: "update",
            value: function() {
                if (!this.state.isDestroyed) {
                    var a = {
                        instance: this,
                        styles: {},
                        attributes: {},
                        flipped: !1,
                        offsets: {}
                    }
                      , c = a.offsets;
                    var d = this.reference;
                    var e = w(this.popper, d);
                    d = C(d, e);
                    c.reference = d;
                    a.placement = S(this.options.placement, a.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
                    a.originalPlacement = a.placement;
                    a.offsets.popper = U(this.popper, a.offsets.reference, a.placement);
                    a.offsets.popper.position = "absolute";
                    a = V(this.modifiers, a);
                    this.state.isCreated ? this.options.onUpdate(a) : (this.state.isCreated = !0,
                    this.options.onCreate(a))
                }
            }
        }, {
            key: "destroy",
            value: function() {
                return this.state.isDestroyed = !0,
                W(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"),
                this.popper.style.left = "",
                this.popper.style.position = "",
                this.popper.style.top = "",
                this.popper.style[X("transform")] = ""),
                this.disableEventListeners(),
                this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                this
            }
        }, {
            key: "enableEventListeners",
            value: function() {
                if (!this.state.eventsEnabled) {
                    var a = this.reference
                      , c = this.state;
                    c.updateBound = this.scheduleUpdate;
                    window.addEventListener("resize", c.updateBound, {
                        passive: !0
                    });
                    a = k(a);
                    this.state = (Y(a, "scroll", c.updateBound, c.scrollParents),
                    c.scrollElement = a,
                    c.eventsEnabled = !0,
                    c)
                }
            }
        }, {
            key: "disableEventListeners",
            value: function() {
                this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate),
                this.state = fa(this.reference, this.state))
            }
        }]),
        a
    }();
    return y.Utils = ("undefined" == typeof window ? global : window).PopperUtils,
    y.placements = E,
    y.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(a) {
                    var b = a.placement
                      , c = b.split("-")[0];
                    if (b = b.split("-")[1]) {
                        var d = a.offsets
                          , e = d.reference;
                        d = d.popper;
                        var f = -1 !== ["bottom", "top"].indexOf(c);
                        c = f ? "left" : "top";
                        f = f ? "width" : "height";
                        e = {
                            start: F({}, c, e[c]),
                            end: F({}, c, e[c] + e[f] - d[f])
                        };
                        a.offsets.popper = t({}, d, e[b])
                    }
                    return a
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(a, b) {
                    var c;
                    b = b.offset;
                    var d = a.offsets
                      , e = d.popper;
                    d = d.reference;
                    var f = a.placement.split("-")[0];
                    return c = J(+b) ? [+b, 0] : ia(b, e, d, f),
                    "left" === f ? (e.top += c[0],
                    e.left -= c[1]) : "right" === f ? (e.top += c[0],
                    e.left += c[1]) : "top" === f ? (e.left += c[0],
                    e.top -= c[1]) : "bottom" === f && (e.left += c[0],
                    e.top += c[1]),
                    a.popper = e,
                    a
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(a, b) {
                    var c = b.boundariesElement || r(a.instance.popper);
                    a.instance.reference === c && (c = r(c));
                    var d = I(a.instance.popper, a.instance.reference, b.padding, c);
                    b.boundaries = d;
                    var e = a.offsets.popper
                      , f = {
                        primary: function(a) {
                            var c = e[a];
                            return e[a] < d[a] && !b.escapeWithReference && (c = x(e[a], d[a])),
                            F({}, a, c)
                        },
                        secondary: function(a) {
                            var c = "right" === a ? "left" : "top"
                              , f = e[c];
                            return e[a] > d[a] && !b.escapeWithReference && (f = ba(e[c], d[a] - ("right" === a ? e.width : e.height))),
                            F({}, c, f)
                        }
                    };
                    return b.priority.forEach(function(a) {
                        var b = -1 === ["left", "top"].indexOf(a) ? "secondary" : "primary";
                        e = t({}, e, f[b](a))
                    }),
                    a.offsets.popper = e,
                    a
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(a) {
                    var b = a.offsets
                      , c = b.popper;
                    b = b.reference;
                    var d = a.placement.split("-")[0]
                      , e = -1 !== ["top", "bottom"].indexOf(d);
                    d = e ? "right" : "bottom";
                    var f = e ? "left" : "top";
                    e = e ? "width" : "height";
                    return c[d] < n(b[f]) && (a.offsets.popper[f] = n(b[f]) - c[e]),
                    c[f] > n(b[d]) && (a.offsets.popper[f] = n(b[d])),
                    a
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(a, b) {
                    if (!Z(a.instance.modifiers, "arrow", "keepTogether"))
                        return a;
                    b = b.element;
                    if ("string" == typeof b) {
                        if (b = a.instance.popper.querySelector(b),
                        !b)
                            return a
                    } else if (!a.instance.popper.contains(b))
                        return console.warn("WARNING: `arrow.element` must be child of its popper element!"),
                        a;
                    var c = a.placement.split("-")[0]
                      , d = a.offsets
                      , e = d.popper;
                    d = d.reference;
                    var f = -1 !== ["left", "right"].indexOf(c);
                    c = f ? "height" : "width";
                    var h = f ? "top" : "left"
                      , r = f ? "left" : "top"
                      , g = f ? "bottom" : "right";
                    f = T(b)[c];
                    d[g] - f < e[h] && (a.offsets.popper[h] -= e[h] - (d[g] - f));
                    d[h] + f > e[g] && (a.offsets.popper[h] += d[h] + f - e[g]);
                    d = d[h] + d[c] / 2 - f / 2 - m(a.offsets.popper)[h];
                    return d = x(ba(e[c] - f, d), 0),
                    a.arrowElement = b,
                    a.offsets.arrow = {},
                    a.offsets.arrow[h] = Math.round(d),
                    a.offsets.arrow[r] = "",
                    a
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(a, b) {
                    if (W(a.instance.modifiers, "inner") || a.flipped && a.placement === a.originalPlacement)
                        return a;
                    var c = I(a.instance.popper, a.instance.reference, b.padding, b.boundariesElement)
                      , d = a.placement.split("-")[0]
                      , e = D(d)
                      , f = a.placement.split("-")[1] || ""
                      , h = [];
                    switch (b.behavior) {
                    case "flip":
                        h = [d, e];
                        break;
                    case "clockwise":
                        h = aa(d);
                        break;
                    case "counterclockwise":
                        h = aa(d, !0);
                        break;
                    default:
                        h = b.behavior
                    }
                    return h.forEach(function(g, r) {
                        if (d !== g || h.length === r + 1)
                            return a;
                        d = a.placement.split("-")[0];
                        e = D(d);
                        var k = a.offsets.popper;
                        g = a.offsets.reference;
                        g = "left" === d && n(k.right) > n(g.left) || "right" === d && n(k.left) < n(g.right) || "top" === d && n(k.bottom) > n(g.top) || "bottom" === d && n(k.top) < n(g.bottom);
                        var l = n(k.left) < n(c.left)
                          , m = n(k.right) > n(c.right)
                          , p = n(k.top) < n(c.top)
                          , q = n(k.bottom) > n(c.bottom);
                        k = "left" === d && l || "right" === d && m || "top" === d && p || "bottom" === d && q;
                        var u = -1 !== ["top", "bottom"].indexOf(d);
                        l = !!b.flipVariations && (u && "start" === f && l || u && "end" === f && m || !u && "start" === f && p || !u && "end" === f && q);
                        (g || k || l) && (a.flipped = !0,
                        (g || k) && (d = h[r + 1]),
                        l && (f = "end" === f ? "start" : "start" === f ? "end" : f),
                        a.placement = d + (f ? "-" + f : ""),
                        a.offsets.popper = t({}, a.offsets.popper, U(a.instance.popper, a.offsets.reference, a.placement)),
                        a = V(a.instance.modifiers, a, "flip"))
                    }),
                    a
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(a) {
                    var b = a.placement
                      , c = b.split("-")[0]
                      , d = a.offsets
                      , e = d.popper;
                    d = d.reference;
                    var f = -1 !== ["left", "right"].indexOf(c);
                    c = -1 === ["top", "left"].indexOf(c);
                    return e[f ? "left" : "top"] = d[b] - (c ? e[f ? "width" : "height"] : 0),
                    a.placement = D(b),
                    a.offsets.popper = m(e),
                    a
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(a) {
                    if (!Z(a.instance.modifiers, "hide", "preventOverflow"))
                        return a;
                    var b = a.offsets.reference
                      , c = A(a.instance.modifiers, function(a) {
                        return "preventOverflow" === a.name
                    }).boundaries;
                    if (b.bottom < c.top || b.left > c.right || b.top > c.bottom || b.right < c.left) {
                        if (!0 === a.hide)
                            return a;
                        a.hide = !0;
                        a.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === a.hide)
                            return a;
                        a.hide = !1;
                        a.attributes["x-out-of-boundaries"] = !1
                    }
                    return a
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(a, b) {
                    var c = b.x
                      , d = b.y
                      , e = a.offsets.popper
                      , f = A(a.instance.modifiers, function(a) {
                        return "applyStyle" === a.name
                    }).gpuAcceleration;
                    void 0 !== f && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    b = void 0 === f ? b.gpuAcceleration : f;
                    f = r(a.instance.popper);
                    var h = G(f);
                    f = {
                        position: e.position
                    };
                    var g = n(e.left);
                    var k = n(e.top);
                    var l = n(e.bottom);
                    e = n(e.right);
                    c = "bottom" === c ? "top" : "bottom";
                    d = "right" === d ? "left" : "right";
                    var m = X("transform");
                    (k = "bottom" == c ? -h.height + l : k,
                    h = "right" == d ? -h.width + e : g,
                    b && m) ? (f[m] = "translate3d(" + h + "px, " + k + "px, 0)",
                    f[c] = 0,
                    f[d] = 0,
                    f.willChange = "transform") : (f[c] = k * ("bottom" == c ? -1 : 1),
                    f[d] = h * ("right" == d ? -1 : 1),
                    f.willChange = c + ", " + d);
                    return a.attributes = t({}, {
                        "x-placement": a.placement
                    }, a.attributes),
                    a.styles = t({}, f, a.styles),
                    a
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(a) {
                    return K(a.instance.popper, a.styles),
                    ha(a.instance.popper, a.attributes),
                    a.offsets.arrow && K(a.arrowElement, a.offsets.arrow),
                    a
                },
                onLoad: function(a, b, c, d, e) {
                    d = w(b, a);
                    d = C(a, d);
                    a = S(c.placement, d, b, a, c.modifiers.flip.boundariesElement, c.modifiers.flip.padding);
                    return b.setAttribute("x-placement", a),
                    K(b, {
                        position: "absolute"
                    }),
                    c
                },
                gpuAcceleration: void 0
            }
        }
    },
    y
});
$(document).ready(function() {
    var g = $(".nav-item")
      , l = $(".nav-link")
      , p = $(".dropdown-menu");
    $(window).on("load resize", function() {
        this.matchMedia("(min-width: 768px)").matches ? g.hover(function() {
            var g = $(this);
            g.addClass("show");
            g.find(l).attr("aria-expanded", "true");
            g.find(p).addClass("show");
            $(".nbd-header-container .nav-item a").removeClass("nbd-show-for-nav")
        }, function() {
            var g = $(this);
            g.removeClass("show");
            g.find(l).attr("aria-expanded", "false");
            g.find(p).removeClass("show");
            g = localStorage.getItem("selectParent");
            "" != g && ($(".nbd-header-container .nav-item a").removeClass("nbd-show-for-nav"),
            $('.nbd-header-container .nav-item a[data-val\x3d"' + g + '"]').addClass("nbd-show-for-nav"))
        }) : g.off("mouseenter mouseleave")
    });
    $(".nbd-hamburger-menu-btn").click(function() {
        $("html, body").animate({
            scrollTop: 0
        });
        $(".modal-backdrop.show").hide();
        $(".nbd-listpopup-container .modal.show").hide();
        $(".navbar.navbar-expand-lg").addClass("displayHide");
        $(".nbd-hamburger-menu-wrapper").removeClass("displayHide");
        $(".nbd-hamburger-menu-desk").removeClass("displayHide")
    });
    $(".nbd-hamburger-menu-desk .nbd-hamburger-close-icon").click(function() {
        $(".nbd-hamburger-menu-back a").click();
        resetMenu();
        $(".navbar.navbar-expand-lg").removeClass("displayHide");
        $(".nbd-hamburger-menu-wrapper").addClass("displayHide");
        $(".nbd-hamburger-menu-desk").addClass("displayHide")
    });
    $(".nbd-hamburger-menu-btn,.nbd-hamburger-icon").click(function() {
        $('div[id*\x3d"NBD_"]').addClass("d-none");
        $("#NBD_NEDBANK-NAVIGATION_1").removeClass("d-none");
        $(".responsivegrid,.experiencefragment").removeClass("d-none");
        $(".nbd-alert-pop,.cookiealert").addClass("d-none")
    });
    $(".nbd-hamburger-close-icon,.nbd-hamburger-close-icon").click(function() {
        $('div[id*\x3d"NBD_"]').removeClass("d-none");
        $(".nbd-alert-pop,.cookiealert").removeClass("d-none")
    });
    $(".menu-item").click(function() {
        var g = $(".menu-item.selectedMenu").index()
          , k = $($(".menu-item")[g]).attr("data-menuLayerOne");
        $('div [data-menuLayerOneChild\x3d"' + k + '"]').removeClass("nbd-fadeInUp").removeClass("nbd-fadeInDown-two");
        var l = $(this).index();
        var p = l > g ? "nbd-fadeInUp" : "nbd-fadeInDown-two";
        var z = l > g ? "nbd-fadeOutUp" : "nbd-fadeOutDown";
        $(".menu-item").removeClass("selectedMenu");
        $(this).addClass("selectedMenu");
        l != g && fnDisplayLevelTwoMenu($(this).attr("data-menuLayerOne"), p, k, z)
    });
    $(".nbd-first_level_side_menu .nbd-menu-green-card").click(function() {
        if (flag = $(this).find(".card-body a").hasClass("stretched-link") ? !1 : !0) {
            var g = $(this).data("menulayeroneinnerchild")
              , k = $(this).parent().parent().data("menulayeronechild");
            $(".nbd-hamburger-menu-levelOne").addClass("displayHide");
            $(".nbd-first_level_side_menu").removeClass("nbd-fadeOutUp").removeClass("nbd-fadeOutDown").removeClass("nbd-fadeInDown-two").removeClass("nbd-fadeInUp");
            $('div [data-menulayertwoparent\x3d"' + k + '"], div [data-menulayertwochild\x3d"' + g + '"]').removeClass("displayHide")
        }
    });
    $(".nbd-hamburger-menu-back a").click(function() {
        $(".nbd-hamburger-menu-level-two, .nbd-hamburger-menu-levelTwo").addClass("displayHide");
        $(".nbd-hamburger-menu-levelOne").removeClass("displayHide")
    });
    var k = $(window).height();
    $(".nbd-hm-l3-multi-link").hover(function() {
        scrolY = $(window).scrollTop();
        var g = $(this).offset().top
          , l = $(this).find(".nbd-hm-l4-link").length;
        g - scrolY + 40 * l > k && (g = g - scrolY + 40 * (l + 1) - k,
        $(this).find(".nbd-hm-level-four-links").css("top", -g + "px"))
    })
});
function fnDisplayLevelTwoMenu(g, l, p, k) {
    l = void 0 === l ? "" : l;
    p = void 0 === p ? "" : p;
    k = void 0 === k ? "" : k;
    $('div [data-menuLayerOneChild\x3d"' + p + '"]').addClass(k);
    setTimeout(function() {
        $('div [data-menuLayerOneChild\x3d"' + g + '"]').removeClass("displayHide").addClass(l);
        $('div [data-menuLayerOneChild\x3d"' + p + '"]').addClass("displayHide").removeClass(k)
    }, 400)
}
function resetMenu() {
    $(".menu-item").removeClass("selectedMenu");
    $(".menu-item:nth(0)").addClass("selectedMenu");
    $(".nbd-first_level_side_menu").addClass("displayHide");
    $(".nbd-first_level_side_menu:nth(0)").removeClass("displayHide")
}
