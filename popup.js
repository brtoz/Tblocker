!function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = { i: r, l: !1, exports: {} };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function (t) { return e[t] }.bind(null, o));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () { return e.default } : function () { return e };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 4)
}({
    4: function (e, t, n) {
        e.exports = n(5)
    },
    5: function (e, t, n) {
        "use strict";
        var r = document.querySelector("#ads"),
            o = document.querySelector("#msg");

        function c() {
            chrome.storage.local.set({
                ads: document.querySelector("#ads").checked,
                msg: document.querySelector("#msg").checked
            }, (function () { }))
        }

        r.addEventListener("change", (function () { c() })), o.addEventListener("change", (function () { c() })), chrome.storage.local.get(["msg", "ads"], (function (e) {
            document.querySelector("#msg").checked = e.msg,
            document.querySelector("#ads").checked = e.ads
        }));

        for (var u = document.querySelectorAll('[name="rating"]'), a = function () {
            var e = this.getAttribute("data-ratting");
            "4" == e || "5" == e ? chrome.tabs.create({ url: "#" }) : document.getElementById("rate-us").innerHTML = '<div style="\n    margin: auto;\n    text-align: center;\n    padding: 15px 0;\n    font-size: 17px;\n"></div>'
        }, i = 0; i < u.length; i++) u[i].addEventListener("click", a, !1)
    }
});
