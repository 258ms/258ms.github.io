{
    const e = () => {
        document.documentElement.style.setProperty("--body-scroll-width", window.innerWidth - document.documentElement.clientWidth + "px")
    };
    window.addEventListener("resize", e), e()
}
feather.replace({
    class: "icon"
});
const isDarkMode = () => document.documentElement.classList.contains("uk-dark"),
    setDarkMode = (e = !0) => {
        isDarkMode() !== e && (e ? document.documentElement.classList.add("uk-dark") : document.documentElement.classList.remove("uk-dark"), window.dispatchEvent(new CustomEvent("darkmodechange")))
    }; {
    const e = $(window),
        t = t => {
            const o = e.height() || 0,
                n = t.height() || 0,
                s = (t.offset() || {
                    top: 0
                }).top,
                i = s + n,
                a = e.scrollTop() || 0,
                r = a + o,
                c = n - (Math.max(i, r) - Math.min(s, a) - o);
            return c <= 0 ? 0 : c / n
        },
        o = .25,
        n = $("[data-viewport-dark]").toArray().map((e => ({
            ratio: parseFloat(e.getAttribute("data-viewport-dark") || "") || o,
            $el: $(e)
        })));
    if (n.length) {
        const o = () => {
            const e = n.some((e => t(e.$el) > e.ratio));
            setDarkMode(e)
        };
        e.on("scroll resize load", o), o()
    }
}
$("#material_icons").find(".uk-button").each((function() {
    let e = $(this).find("i").text(),
        t = $(this).find("i").attr("class");
    $(this).on("click", (function() {
        alert('<i class="' + t + '">' + e + "</i>")
    }))
})), window.addEventListener("load", (e => {
    setTimeout((() => {
        const e = document.querySelector("#preloader");
        e && (e.classList.add("loading-leave"), setTimeout((() => {
            e.remove()
        }), 300))
    }), 1e3)
})); {
    class e {
        constructor(e) {
            this.dd = e, this.placeholder = this.dd.find("span"), this.opts = this.dd.find(".uk-droplist-dropdown li"), this.val = "", this.index = -1, this.initEvents(), this.onChangeHandlers = new Set
        }
        initEvents() {
            const e = this;
            e.dd.on("click", (function(e) {
                e.preventDefault(), e.stopPropagation(), $(this).toggleClass("uk-active")
            })), e.opts.on("click", (function() {
                const t = $(this);
                e.val = t.text(), e.index = t.index(), e.placeholder.text(e.val), t.siblings().removeClass("uk-active"), t.filter(':contains("' + e.val + '")').addClass("uk-active"), e.dd.trigger("change")
            })).trigger("change"), $(document).on("click", (function() {
                e.dd.removeClass("uk-active")
            }))
        }
        get options() {
            return this.opts
        }
        get value() {
            return this.val
        }
        get selectedIndex() {
            return this.index
        }
    }
    $((function() {
        document.querySelectorAll(".uk-droplist").forEach((t => {
            const o = new e($(t));
            t.classList.contains("uk-droplist-filter") && o.dd.on("change", (() => {
                const e = o.options[o.selectedIndex];
                UIkit.filter(o.dd.closest("[data-uk-filter]")).apply(e)
            }))
        }))
    }))
} {
    const e = document.querySelectorAll("[data-image-hover-revealer]"),
        t = 17,
        o = 400,
        n = !0,
        s = document.createElement("img");
    let i, a;
    s.alt = "", s.className = "image-hover-revealer", document.body.append(s);
    let r = !1;
    e.forEach((e => {
        if (!(e instanceof HTMLElement)) return;
        if (!(s instanceof Image)) return;
        const c = e.getAttribute("data-image-hover-revealer");
        e.addEventListener("mouseover", (() => {
            s.setAttribute("src", c), s.classList.add("uk-active"), i = Date.now(), r = !0, clearTimeout(a)
        })), window.addEventListener("mousemove", (e => {
            if (!r) return;
            let o = e.pageX,
                i = e.pageY;
            const a = s.clientWidth,
                c = s.clientHeight;
            o + a >= window.scrollX + window.innerWidth - t && (n ? o -= a : o = window.innerWidth - t - a), i + c >= window.scrollY + window.innerHeight && (n ? i -= c : i = window.scrollY + window.innerHeight - c), s.style.setProperty("--move-x", o + "px"), s.style.setProperty("--move-y", i + "px")
        })), e.addEventListener("mouseleave", (() => {
            const e = Date.now() - i;
            a = setTimeout((() => {
                s.classList.remove("uk-active"), a = setTimeout((() => {
                    r = !1, s.style.setProperty("--move-x", "0px"), s.style.setProperty("--move-y", "0px")
                }), o)
            }), Math.max(0, o - e))
        }))
    }))
}
const stickyItemContrast = (e, t, o, n = {}) => {
        n = Object.assign({
            black: "contrast-black",
            white: "contrast-white"
        }, n);
        const s = (e => {
                const t = {};
                return o => {
                    if (null != t[o]) return t[o]; {
                        const n = e(o);
                        return t[o] = n, n
                    }
                }
            })((e => {
                if (!e.startsWith("rgb(")) return "black";
                const t = e.slice(4, -1).split(",").map(Number);
                return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 >= 128 ? "black" : "white"
            })),
            i = $(window);
        let a = "";
        const r = () => {
            const i = "function" == typeof o ? o(t) : o,
                r = e.map((e => e instanceof HTMLElement && window.scrollY + i >= e.offsetTop)).lastIndexOf(!0);
            if (-1 === r) return;
            const c = (e => {
                    let t = "";
                    for (; e && (t = window.getComputedStyle(e, null).getPropertyValue("background-color"), /rgba\(.*?,\s*0\)$/.test(t));) e = e.parentElement;
                    return t
                })(e[r]),
                d = s(c);
            a !== d && n[a] && t.classList.remove(n[a]), n[d] && t.classList.add(n[d]), a = d
        };
        i.on("scroll resize load darkmodechange", r), r()
    },
    getElementParents = e => {
        const t = [];
        for (; e = e.parentNode;) t.push(e);
        return t
    },
    stickyItemsDarkMode = (e, t) => {
        const o = [...document.querySelectorAll('.uk-section, [class*="uk-section-"]')],
            n = [...document.querySelectorAll(e)];
        for (const e of n) stickyItemContrast(o, e, t, {
            black: "",
            white: "uk-dark"
        })
    };
stickyItemsDarkMode(".uni-header, .uni-sticky-menu, .uni-header-social", (e => e.offsetTop + e.clientHeight / 2)), stickyItemsDarkMode(".uni-header-location, .uni-header-section-indicator", (() => window.innerHeight / 2)); {
    const e = document.querySelector(".uni-header-section-indicator");
    if (e) {
        const t = [...e.querySelectorAll("li[data-selector]")].map((e => document.querySelector(e.getAttribute("data-selector")))),
            o = $(window);
        let n = 0;
        const s = () => {
            const o = window.innerHeight / 2,
                s = t.map((e => e instanceof HTMLElement && window.scrollY + o >= e.offsetTop)).lastIndexOf(!0); - 1 !== s && n !== s && (n = s, e.style.setProperty("--section-indicator-index", n + ""))
        };
        o.on("scroll resize load darkmodechange", s), s()
    }
}
$("[data-uk-modal] [data-uk-scrollspy-nav] a").on("click", (function() {
    UIkit.toggle($(this).closest("[data-uk-modal].uk-open")).toggle()
})), $(".uk-horizontal-scroll").each((function(e, t) {
    t.addEventListener("wheel", (e => {
        e.preventDefault(), t.scrollBy(e.deltaY, 0)
    }))
}));