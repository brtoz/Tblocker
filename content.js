! function(e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var r = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) n.d(o, r, function(t) {
                return e[t]
            }.bind(null, r));
        return o
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
    e.exports = n(1)
}, function(e, t) {
    function n() {
        chrome.storage.local.get(["msg"], e => {
            e && e.msg && postMessage({
                type: "hidebmsg",
                value: e.msg.toString()
            }, "*")
        })
    }(window.location.host.match(/\.twitch.tv$/) || "twitch.tv" == window.location.host) && chrome.storage.local.get(["ads"], (function(e) {
        e && e.ads && function() {
            const e = document.createElement("script");
            e.src = chrome.runtime.getURL("ads.js"), e.onload = () => setTimeout(n, 4e3), (document.body || document.head || document.documentElement).appendChild(e)
        }()
    })), chrome.runtime.onMessage.addListener((async function(e, t, n) {
        if ("aurl" == e.sksmode && e.aurl) {
            let t = function(e) {
                    for (var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", o = n.length, r = 0; r < 10; r++) t += n.charAt(Math.floor(Math.random() * o));
                    return t
                }(),
                n = document.createElement("iframe");
            n.setAttribute("sandbox", "allow-forms allow-same-origin allow-scripts"), n.setAttribute("id", t), n.src = e.aurl, document.getElementsByTagName("head")[0].appendChild(n), setTimeout(() => {
                document.getElementById(t).remove()
            }, 9e4)
        }
        e.url
    }))
}]);
