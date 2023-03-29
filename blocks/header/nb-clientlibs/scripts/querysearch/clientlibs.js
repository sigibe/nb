/* eslint-disable no-use-before-define */
const NEDBANK_HOST = 'personal.nedbank.co.za';

$(document).ready(function () {
    function b(a, c) {
        e && e.internalSearch && (e.internalSearch.internalSearchTerm = $(".nbd-qs-container .nbd-qs-input-item") ? $(".nbd-qs-container .nbd-qs-input-item").val() : "",
            e.internalSearch.internalSearchResultFilter = $(".nbd-qs-container .nbd-qsfilter-button.nbd-qsfilter-active").text() || "All",
            e.internalSearch.internalSearchResultCount = $(".nbd-qs-pagedata.nbd-qsfilter") ? $(".nbd-qs-pagedata.nbd-qsfilter").length : 0,
            e.internalSearch.internalSearchSelectedResultUrl = $(a).attr("href") || "",
            e.internalSearch.internalSearchSelectedResultTerm = $(a).text() || "",
            e.internalSearch.internalSearchResultOnPopup = c,
            e.internalSearch.internalSearchResultFilter && "all" != e.internalSearch.internalSearchResultFilter.toLowerCase() && (e.internalSearch.internalSearchResultCount = $(".nbd-qs-pagedata.showByqsfilter") ? $(".nbd-qs-pagedata.showByqsfilter").length : e.internalSearch.internalSearchResultCount),
            e.internalSearch.internalSearchResultCurrentPage = $(".nbd-qs-container #nbd-qs-nav .nbd-qs-navspan").clone().children().remove().end().text() || "",
            window._satellite && _satellite.track("internalsearch"))
    }
    function g() {
        $(".nbd-qs-page-results .nbd-qs-dropdowndata .nbd-qs-page-anchor").off();
        $(".nbd-qs-pagination-result .nbd-qs-pagedata.nbd-qsfilter a").off();
        $(".nbd-qs-page-results .nbd-qs-dropdowndata .nbd-qs-page-anchor").on("click", function () {
            b(this, !0)
        });
        $(".nbd-qs-pagination-result .nbd-qs-pagedata.nbd-qsfilter a").on("click", function () {
            b(this, !1)
        })
    }
    function d() {
        $(".nbd-qs-pagination-result").addClass("nbd-qs-result-hide");
        $(".qsfilter-background-class").addClass("d-none");
        $("#nbd-qs-nav").addClass("nbd-qs-result-hide");
        $(".nbd-qs-container .qs-top").addClass("nbd-qs-result-hide").removeClass("d-flex");
        $(".nbd-qs-note").show()
    }
    function h(a) {
        $.ajax({
            method: "GET",
            url: `https://${NEDBANK_HOST}` + "/bin/globalSearch.searchresults.json?key\x3d" + a,
            dataType: "text",
            success: function (c) {
                c = JSON.parse(c);
                c = c.result;
                if ("" != c) {
                    for (var b = "", f = "", d = 0; d < c.length; d++) {
                        title = CreateMark(c[d].title, a);
                        displayClass = d > l - 1 ? "d-none" : "";
                        b = b + "\x3cp class\x3d'nbd-qs-dropdowndata " + displayClass + "'\x3e\x3ca href\x3d'" + c[d].path + "' class\x3d'nbd-qs-page-anchor'\x3e" + title + "\x3c/a\x3e\x3c/p\x3e";
                        var e = "tags" in c[d] ? c[d].tags : "";
                        pageDesc = void 0 === c[d].description || " " === c[d].description || "" === c[d].description ? "" : c[d].description;
                        navTitle = void 0 === c[d].navTitle || " " === c[d].navTitle || "" === c[d].navTitle ? c[d].title : c[d].navTitle;
                        f = "" != e ? f + "\x3cdiv class\x3d'nbd-qs-pagedata nbd-qsfilter' data-qstag\x3d'" + e + "' \x3e\x3ca class\x3d'stretched-link' href\x3d'" + c[d].path + "'\x3e" + title + "\x3c/a\x3e\x3cp\x3e" + pageDesc + "\x3c/p\x3e \x3cspan\x3e" + navTitle + "\x3c/span\x3e\x3c/div\x3e" : f + "\x3cdiv class\x3d'nbd-qs-pagedata nbd-qsfilter' \x3e\x3ca class\x3d'stretched-link' href\x3d'" + c[d].path + "'\x3e" + title + "\x3c/a\x3e\x3cp\x3e" + pageDesc + "\x3c/p\x3e \x3cspan\x3e" + navTitle + "\x3c/span\x3e\x3c/div\x3e"
                    }
                    $(".nbd-qs-pagination-result").html(f);
                    resultwrap = b + '\x3cdiv class\x3d"nbd-tertiary-outer"\x3e\x3ca class\x3d"nbd-btn-tertiary nbd-qs-btnlinks nbd-qs-seeall"\x3e' + $("#qs_ctatext").val() + '\x3cem class\x3d"tertiary-btn-icon right-arrow-btn"\x3e\x3c/em\x3e\x3c/a\x3e\x3c/div\x3e';
                    $(".nbd-qs-results-warp .nbd-qs-page-results").html(resultwrap);
                    $(".nbd-qs-results-warp .nbd-qs-link-results").addClass("nbd-qs-result-hide").removeClass("nbd-qs-addmargin")
                } else
                    $(".nbd-qs-results-warp .nbd-qs-page-results").html('\x3ca href\x3d"javascrip:void(0);" class\x3d"nbd-qs-no-search-result"\x3e' + $("#qs_noresultheading").val().trim() + "\x3cspan\x3e" + $("#qs_noresultdesc").val().trim() + "\x3c/span\x3e\x3c/a\x3e"),
                        $(".nbd-qs-results-warp .nbd-qs-link-results").removeClass("nbd-qs-result-hide").addClass("nbd-qs-addmargin"),
                        $(".nbd-qs-pagination-result").text(""),
                        $(".nbd-qs-pagination-result").addClass("nbd-qs-result-hide");
                g()
            },
            error: function (a) {
                console.log("Error")
            }
        })
    }
    var f = {
        init: function (a) {
            var c = $.extend({
                items: 1,
                itemsOnPage: 1,
                pages: 0,
                displayedPages: 5,
                edges: 2,
                currentPage: 0,
                useAnchors: !0,
                hrefTextPrefix: "#page-",
                hrefTextSuffix: "",
                prevText: "Prev",
                nextText: "Next",
                ellipseText: "\x26hellip;",
                ellipsePageSet: !0,
                cssStyle: "light-theme",
                listStyle: "",
                labelMap: [],
                selectOnClick: !0,
                nextAtFront: !1,
                invertPageOrder: !1,
                useStartEdge: !0,
                useEndEdge: !0,
                onPageClick: function (a, c) { },
                onInit: function () { }
            }, a || {})
                , b = this;
            c.pages = c.pages ? c.pages : Math.ceil(c.items / c.itemsOnPage) ? Math.ceil(c.items / c.itemsOnPage) : 1;
            c.currentPage = c.currentPage ? c.currentPage - 1 : c.invertPageOrder ? c.pages - 1 : 0;
            c.halfDisplayed = c.displayedPages / 2;
            this.each(function () {
                b.addClass(c.cssStyle + " simple-pagination").data("pagination", c);
                f._draw.call(b)
            });
            c.onInit();
            return this
        },
        selectPage: function (a) {
            f._selectPage.call(this, a - 1);
            return this
        },
        prevPage: function () {
            var a = this.data("pagination");
            a.invertPageOrder ? a.currentPage < a.pages - 1 && f._selectPage.call(this, a.currentPage + 1) : 0 < a.currentPage && f._selectPage.call(this, a.currentPage - 1);
            return this
        },
        nextPage: function () {
            var a = this.data("pagination");
            a.invertPageOrder ? 0 < a.currentPage && f._selectPage.call(this, a.currentPage - 1) : a.currentPage < a.pages - 1 && f._selectPage.call(this, a.currentPage + 1);
            return this
        },
        getPagesCount: function () {
            return this.data("pagination").pages
        },
        setPagesCount: function (a) {
            this.data("pagination").pages = a
        },
        getCurrentPage: function () {
            return this.data("pagination").currentPage + 1
        },
        destroy: function () {
            this.empty();
            return this
        },
        drawPage: function (a) {
            var c = this.data("pagination");
            c.currentPage = a - 1;
            this.data("pagination", c);
            f._draw.call(this);
            return this
        },
        redraw: function () {
            f._draw.call(this);
            return this
        },
        disable: function () {
            var a = this.data("pagination");
            a.disabled = !0;
            this.data("pagination", a);
            f._draw.call(this);
            return this
        },
        enable: function () {
            var a = this.data("pagination");
            a.disabled = !1;
            this.data("pagination", a);
            f._draw.call(this);
            return this
        },
        updateItems: function (a) {
            var c = this.data("pagination");
            c.items = a;
            c.pages = f._getPages(c);
            this.data("pagination", c);
            f._draw.call(this)
        },
        updateItemsOnPage: function (a) {
            var c = this.data("pagination");
            c.itemsOnPage = a;
            c.pages = f._getPages(c);
            this.data("pagination", c);
            f._selectPage.call(this, 0);
            return this
        },
        getItemsOnPage: function () {
            return this.data("pagination").itemsOnPage
        },
        _draw: function () {
            var a = this.data("pagination"), c = f._getInterval(a), b;
            f.destroy.call(this);
            var d = "UL" === ("function" === typeof this.prop ? this.prop("tagName") : this.attr("tagName")) ? this : $("\x3cul" + (a.listStyle ? ' class\x3d"' + a.listStyle + '"' : "") + "\x3e\x3c/ul\x3e").appendTo(this);
            a.prevText && f._appendItem.call(this, a.invertPageOrder ? a.currentPage + 1 : a.currentPage - 1, {
                text: a.prevText,
                classes: "prev"
            });
            a.nextText && a.nextAtFront && f._appendItem.call(this, a.invertPageOrder ? a.currentPage - 1 : a.currentPage + 1, {
                text: a.nextText,
                classes: "next"
            });
            if (!a.invertPageOrder) {
                if (0 < c.start && 0 < a.edges) {
                    if (a.useStartEdge) {
                        var e = Math.min(a.edges, c.start);
                        for (b = 0; b < e; b++)
                            f._appendItem.call(this, b)
                    }
                    a.edges < c.start && 1 != c.start - a.edges ? d.append('\x3cli class\x3d"disabled"\x3e\x3cspan class\x3d"ellipse"\x3e' + a.ellipseText + "\x3c/span\x3e\x3c/li\x3e") : 1 == c.start - a.edges && f._appendItem.call(this, a.edges)
                }
            } else if (c.end < a.pages && 0 < a.edges) {
                if (a.useStartEdge)
                    for (e = Math.max(a.pages - a.edges, c.end),
                        b = a.pages - 1; b >= e; b--)
                        f._appendItem.call(this, b);
                a.pages - a.edges > c.end && 1 != a.pages - a.edges - c.end ? d.append('\x3cli class\x3d"disabled"\x3e\x3cspan class\x3d"ellipse"\x3e' + a.ellipseText + "\x3c/span\x3e\x3c/li\x3e") : 1 == a.pages - a.edges - c.end && f._appendItem.call(this, c.end)
            }
            if (a.invertPageOrder)
                for (b = c.end - 1; b >= c.start; b--)
                    f._appendItem.call(this, b);
            else
                for (b = c.start; b < c.end; b++)
                    f._appendItem.call(this, b);
            if (!a.invertPageOrder) {
                if (c.end < a.pages && 0 < a.edges && (a.pages - a.edges > c.end && 1 != a.pages - a.edges - c.end ? d.append('\x3cli class\x3d"disabled"\x3e\x3cspan class\x3d"ellipse"\x3e' + a.ellipseText + "\x3c/span\x3e\x3c/li\x3e") : 1 == a.pages - a.edges - c.end && f._appendItem.call(this, c.end),
                    a.useEndEdge))
                    for (b = Math.max(a.pages - a.edges, c.end); b < a.pages; b++)
                        f._appendItem.call(this, b)
            } else if (0 < c.start && 0 < a.edges && (a.edges < c.start && 1 != c.start - a.edges ? d.append('\x3cli class\x3d"disabled"\x3e\x3cspan class\x3d"ellipse"\x3e' + a.ellipseText + "\x3c/span\x3e\x3c/li\x3e") : 1 == c.start - a.edges && f._appendItem.call(this, a.edges),
                a.useEndEdge))
                for (e = Math.min(a.edges, c.start),
                    b = e - 1; 0 <= b; b--)
                    f._appendItem.call(this, b);
            a.nextText && !a.nextAtFront && f._appendItem.call(this, a.invertPageOrder ? a.currentPage - 1 : a.currentPage + 1, {
                text: a.nextText,
                classes: "next"
            });
            a.ellipsePageSet && !a.disabled && f._ellipseClick.call(this, d)
        },
        _getPages: function (a) {
            return Math.ceil(a.items / a.itemsOnPage) || 1
        },
        _getInterval: function (a) {
            return {
                start: Math.ceil(a.currentPage > a.halfDisplayed ? Math.max(Math.min(a.currentPage - a.halfDisplayed, a.pages - a.displayedPages), 0) : 0),
                end: Math.ceil(a.currentPage > a.halfDisplayed ? Math.min(a.currentPage + a.halfDisplayed, a.pages) : Math.min(a.displayedPages, a.pages))
            }
        },
        _appendItem: function (a, b) {
            var c = this
                , d = c.data("pagination")
                , e = $("\x3cli\x3e\x3c/li\x3e")
                , g = c.find("ul");
            a = 0 > a ? 0 : a < d.pages ? a : d.pages - 1;
            var k = {
                text: a + 1,
                classes: ""
            };
            d.labelMap.length && d.labelMap[a] && (k.text = d.labelMap[a]);
            k = $.extend(k, b || {});
            a == d.currentPage || d.disabled ? (d.disabled || "prev" === k.classes || "next" === k.classes ? e.addClass("disabled") : e.addClass("active"),
                b = $('\x3cspan class\x3d"current"\x3e' + k.text + "\x3c/span\x3e")) : (b = d.useAnchors ? $('\x3ca href\x3d"' + d.hrefTextPrefix + (a + 1) + d.hrefTextSuffix + '" class\x3d"page-link"\x3e' + k.text + "\x3c/a\x3e") : $("\x3cspan \x3e" + k.text + "\x3c/span\x3e"),
                    b.click(function (b) {
                        return f._selectPage.call(c, a, b)
                    }));
            k.classes && b.addClass(k.classes);
            e.append(b);
            g.length ? g.append(e) : c.append(e)
        },
        _selectPage: function (a, b) {
            var c = this.data("pagination");
            c.currentPage = a;
            c.selectOnClick && f._draw.call(this);
            return c.onPageClick(a + 1, b)
        },
        _ellipseClick: function (a) {
            var b = this
                , d = this.data("pagination")
                , e = a.find(".ellipse");
            e.addClass("clickable").parent().removeClass("disabled");
            e.click(function (a) {
                if (!d.disable) {
                    a = $(this);
                    var c = (parseInt(a.parent().prev().text(), 10) || 0) + 1;
                    a.html('\x3cinput type\x3d"number" min\x3d"1" max\x3d"' + d.pages + '" step\x3d"1" value\x3d"' + c + '"\x3e').find("input").focus().click(function (a) {
                        a.stopPropagation()
                    }).keyup(function (a) {
                        var c = $(this).val();
                        13 === a.which && "" !== c ? 0 < c && c <= d.pages && f._selectPage.call(b, c - 1) : 27 === a.which && e.empty().html(d.ellipseText)
                    }).bind("blur", function (a) {
                        a = $(this).val();
                        "" !== a && f._selectPage.call(b, a - 1);
                        e.empty().html(d.ellipseText);
                        return !1
                    })
                }
                return !1
            })
        }
    };
    $.fn.pagination = function (a) {
        if (f[a] && "_" != a.charAt(0))
            return f[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof a && a)
            $.error("Method " + a + " does not exist on jQuery.pagination");
        else
            return f.init.apply(this, arguments)
    }
        ;
    var e = {
        internalSearch: {
            internalSearchTerm: "",
            internalSearchResultCount: 0,
            internalSearchResultFilter: "All",
            internalSearchSelectedResultTerm: "",
            internalSearchSelectedResultUrl: "",
            internalSearchResultOnPopup: "",
            internalSearchResultCurrentPage: ""
        }
    };
    window.digitalData || (window.digitalData = {});
    window.digitalData.internalSearch = e.internalSearch;
    g();
    $(document).on("click", ".nbd-qs-container .nbd-qs-seeall", function () {
        e && e.internalSearch && (e.internalSearch.internalSearchTerm = $(".nbd-qs-container .nbd-qs-input-item") ? $(".nbd-qs-container .nbd-qs-input-item").val() : "",
            e.internalSearch.internalSearchResultFilter = $(".nbd-qs-container .nbd-qsfilter-button.nbd-qsfilter-active").text() || "All",
            e.internalSearch.internalSearchResultCount = $(".nbd-qs-pagedata.nbd-qsfilter") ? $(".nbd-qs-pagedata.nbd-qsfilter").length : 0,
            e.internalSearch.internalSearchResultOnPopup = !0,
            e.internalSearch.internalSearchSelectedResultTerm = $(this).text(),
            e.internalSearch.internalSearchSelectedResultUrl = "",
            window._satellite && _satellite.track("internalsearch"))
    });
    var m = $("#qs_errormessage").val();
    $(".nbd-qs-search .nbd-clear").click(function () {
        $(".nbd-qs-input-item").val("");
        $(".nbd-qs-results-warp").addClass("nbd-qs-result-hide");
        d();
        $(".nbd-qs-input-item").removeAttr("placeholder");
        $(".nbd-qs-input-item").focus()
    });
    var l = parseInt($("#qs_droptotal").val());
    $(".nbd-qs-container .nbd-qs-input-item").keyup(debounce(function (a) {
        $(".nbd-qs-container .qs-top").removeClass("d-flex").addClass("nbd-qs-result-hide");
        var b = $(this).val();
        b.length > parseInt($("#qs_minchar").val()) ? 13 === a.keyCode ? 0 < $(".nbd-qs-dropdowndata").length && seeAllResults() : (h(b),
            $(".nbd-qs-pagination-result").text(""),
            $(".nbd-qs-pagination-result").addClass("nbd-qs-result-hide"),
            $("#nbd-qs-nav").addClass("nbd-qs-result-hide"),
            "" == b ? $(".nbd-qs-results-warp").addClass("nbd-qs-result-hide") : $(".nbd-qs-results-warp").removeClass("nbd-qs-result-hide")) : (d(),
                $(".nbd-qs-results-warp .nbd-qs-page-results").html('\x3ca href\x3d"javascrip:void(0);" class\x3d"nbd-qs-no-search-result"\x3e ' + m + " \x3c/a\x3e"));
        $(".nbd-qs-results-warp.nbd-qs-result-hide") && $(".nbd-qs-note").hide()
    }, 200));
    $(document).on("click", ".nbd-qs-container .nbd-find", function () {
        seeAllResults()
    });
    $(document).on("click", ".nbd-qs-container .nbd-qs-seeall", function () {
        seeAllResults()
    });
    $(document).on("click", ".nbd-qs-close-btn , .nbd-qs-container .nbd-qs-dropdowndata a , .nbd-qs-container .nbd-qs-pagedata a", function () {
        $(".nbd-qs-container .nbd-qs-input-item").val("");
        $(".nbd-qs-container .nbd-qs-input-item").css("border-color", "rgb(213, 228, 225)");
        $(".nbd-qs-container .qs-top").removeClass("d-flex").addClass("nbd-qs-result-hide");
        $(".nbd-qs-pagination-result").addClass("nbd-qs-result-hide");
        $("#nbd-qs-nav").addClass("nbd-qs-result-hide");
        $(".nbd-qs-container .qsfilter-background-class").addClass("d-none");
        $(".nbd-qs-note").show()
    })
});
function seeAllResults() {
    $(".nbd-qs-pagination-result").removeClass("nbd-qs-result-hide");
    $(".nbd-qs-results-warp").addClass("nbd-qs-result-hide");
    $("#nbd-qs-nav").removeClass("nbd-qs-result-hide");
    $(".nbd-qs-container .qs-top").removeClass("nbd-qs-result-hide").addClass("d-flex");
    $("#nbd-qs-nav a").length && $("#nbd-qs-nav a").remove();
    custPagination("init");
    createTags()
}
function custPagination(b) {
    var g = "init" == b ? $(".nbd-qs-pagedata") : $(".nbd-qs-pagedata.showByqsfilter")
        , d = g.length
        , h = parseInt($("#qs_numofresult").val());
    g.slice(h).hide();
    setTimeout(function () {
        var b = parseInt($("#pagination-container .active .current").text());
        b = h * (b - 1);
        var e = b + h;
        e = e > d ? d : e;
        $(".nbd-qs-container .nbd-qs-nav-left").html('\x3cspan class\x3d"nbd-qs-navspan"\x3eShowing ' + (0 == b ? 1 : b) + " - " + e + " of " + d + " \x3clabel\x3e results for: " + $(".nbd-qs-container .nbd-qs-input-item").val() + "\x3c/label\x3e\x3c/span\x3e")
    }, 500);
    $("#pagination-container").pagination({
        items: d,
        itemsOnPage: h,
        prevText: '\x3cdiv class\x3d"nbd-qs-previmg"\x3e\x3c/div\x3e',
        nextText: '\x3cdiv class\x3d"nbd-qs-nextimg"\x3e\x3c/div\x3e',
        onPageClick: function (b) {
            b = h * (b - 1);
            var e = b + h;
            e = e > d ? d : e;
            $(".nbd-qs-container .nbd-qs-nav-left").html('\x3cspan class\x3d"nbd-qs-navspan"\x3eShowing ' + (0 == b ? 1 : b) + " - " + e + " of " + d + " \x3clabel\x3e results for: " + $(".nbd-qs-container .nbd-qs-input-item").val() + "\x3c/label\x3e\x3c/span\x3e");
            g.hide().slice(b, e).show()
        }
    })
}
function CreateMark(b, g) {
    g = g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$\x26");
    g = new RegExp("(" + g + ")", "gi");
    var d = g.exec(b);
    d && (b = b.replace(g, "\x3cmark\x3e" + d[0] + "\x3c/mark\x3e"));
    return b
}
var debounce = function (b, g) {
    var d;
    return function () {
        var h = this
            , f = arguments;
        clearTimeout(d);
        d = setTimeout(function () {
            return b.apply(h, f)
        }, g)
    }
}
    , $jscomp = {
        scope: {}
    };
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (b, g, d) {
    if (d.get || d.set)
        throw new TypeError("ES3 does not support getters and setters.");
    b != Array.prototype && b != Object.prototype && (b[g] = d.value)
}
    ;
$jscomp.getGlobal = function (b) {
    return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
}
    ;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () { }
        ;
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
    ;
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (b) {
    return $jscomp.SYMBOL_PREFIX + (b || "") + $jscomp.symbolCounter_++
}
    ;
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var b = $jscomp.global.Symbol.iterator;
    b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () { }
}
    ;
$jscomp.arrayIterator = function (b) {
    var g = 0;
    return $jscomp.iteratorPrototype(function () {
        return g < b.length ? {
            done: !1,
            value: b[g++]
        } : {
            done: !0
        }
    })
}
    ;
$jscomp.iteratorPrototype = function (b) {
    $jscomp.initSymbolIterator();
    b = {
        next: b
    };
    b[$jscomp.global.Symbol.iterator] = function () {
        return this
    }
        ;
    return b
}
    ;
$jscomp.makeIterator = function (b) {
    $jscomp.initSymbolIterator();
    var g = b[Symbol.iterator];
    return g ? g.call(b) : $jscomp.arrayIterator(b)
}
    ;
$jscomp.arrayFromIterator = function (b) {
    for (var g, d = []; !(g = b.next()).done;)
        d.push(g.value);
    return d
}
    ;
$jscomp.arrayFromIterable = function (b) {
    return b instanceof Array ? b : $jscomp.arrayFromIterator($jscomp.makeIterator(b))
}
    ;
var qsfilterTag = ""
    , tagsQS = []
    , tempQS = "";
$(document).ready(function () {
    $(".nbd-qs-container #qsfilterToggle").click(function () {
        $(this).hasClass("nbd-qsfilter-active") ? ($(this).html("+ Filter"),
            $(this).removeClass("nbd-qsfilter-active"),
            $(".nbd-qs-container #qsfilterTags").hide()) : ($(this).html("- Filter"),
                $(this).addClass("nbd-qsfilter-active"),
                $(".nbd-qs-container #qsfilterTags").css("display", "initial"))
    });
    $(document).on("click", ".nbd-qs-container .nbd-qsfilter-button", function () {
        $(".nbd-qs-container .nbd-qsfilter-button").removeClass("nbd-qsfilter-active");
        $(this).addClass("nbd-qsfilter-active")
    });
    $(document).on("click", ".nbd-qs-container .nbd-qsfilter-button", function () {
        var b = $(this).attr("data-qsfilter").toLowerCase().trim();
        b = b.replace(/[^a-zA-Z0-9 -]/g, "");
        "plus" == b ? ($(this).attr("data-qsfilter", "minus"),
            $(this).addClass("nbd-qsfilter-minus"),
            $(this).removeClass("nbd-qsfilter-plus"),
            $(this).removeClass("nbd-qsfilter-active"),
            $(".nbd-qs-container .nbd-qsfilter-button.plus").removeClass("d-none")) : "minus" == b && ($(this).attr("data-qsfilter", "plus"),
                $(this).removeClass("nbd-qsfilter-minus"),
                $(this).addClass("nbd-qsfilter-plus"),
                $(this).removeClass("nbd-qsfilter-active"),
                $(".nbd-qs-container .nbd-qsfilter-button.plus").addClass("d-none"));
        "all" == b ? $(".nbd-qs-container .nbd-qsfilter").map(function () {
            $(this).removeClass("hideByqsfilter").addClass("showByqsfilter").css("display", "block")
        }) : "plus" != b && "minus" != b && ($(".nbd-qs-container .nbd-qsfilter").not("." + b).removeClass("showByqsfilter").addClass("hideByqsfilter").hide("3000"),
            $(".nbd-qs-container .nbd-qsfilter").map(function () {
                $(this).filter("." + b).removeClass("hideByqsfilter").addClass("showByqsfilter").css("display", "block")
            }));
        "plus" != b && "minus" != b && custPagination("qsfilter")
    })
});
function createTags() {
    tagsQS = [];
    $(".nbd-qs-container .nbd-qsfilter").map(function () {
        var b = $(this).data("qstag")
            , h = this;
        if (void 0 != b)
            if (splitTags = b.split(","),
                0 < splitTags.length)
                splitTags.forEach(function (b) {
                    var d = b.split("/");
                    2 > d.length && (d = b.split(":"));
                    g = d[d.length - 1];
                    $(h).addClass(g.trim());
                    return tagsQS.push(g.trim())
                });
            else {
                var f = b.split("/");
                2 > f.length && (f = b.split(":"));
                g = f[f.length - 1];
                $(this).addClass(g.trim());
                return tagsQS.push(g.trim())
            }
    }).get();
    var b = new Map(tagsQS.map(function (b) {
        return [b.toLowerCase(), b]
    }));
    tagsQS = [].concat($jscomp.arrayFromIterable(b.values()));
    tagsQS.sort(function (b, g) {
        return b.localeCompare(g)
    });
    b = tagsQS.indexOf(void 0);
    -1 < b && tagsQS.splice(b, 1);
    b = tagsQS.map(function (b, g) {
        void 0 === g && (g = 0);
        var d = b.charAt(0).toUpperCase() + b.slice(1);
        b = b.replace(/[^a-zA-Z0-9 -]/g, "");
        b = b.charAt(0).toUpperCase() + b.slice(1);
        d = qs_replaceAll(d, "-", " ");
        return 3 >= g ? '\x3cbutton type\x3d"button" class\x3d"btn btn-default nbd-qsfilter-button" data-qsfilter\x3d"' + b + '"\x3e' + d + "\x3c/button\x3e" : '\x3cbutton type\x3d"button" class\x3d"btn btn-default nbd-qsfilter-button plus d-none" data-qsfilter\x3d"' + b + '"\x3e' + d + "\x3c/button\x3e"
    });
    var g = b.join("");
    5 <= (g.match(/nbd-qsfilter-button/g) || []).length ? $(".nbd-qs-container #qsfilterTags").html('\x3cbutton type\x3d"button" class\x3d"btn btn-default nbd-qsfilter-button nbd-qsfilter-active" data-qsfilter\x3d"all"\x3eAll\x3c/button\x3e' + b.join("") + '\x3cbutton type\x3d"button" class\x3d"btn btn-default nbd-qsfilter-plus nbd-qsfilter-button" data-qsfilter\x3d"plus"\x3e\x3c/button\x3e') : $(".nbd-qs-container #qsfilterTags").html('\x3cbutton type\x3d"button" class\x3d"btn btn-default nbd-qsfilter-button nbd-qsfilter-active" data-qsfilter\x3d"all"\x3eAll\x3c/button\x3e' + b.join(""));
    0 < tagsQS.length && $(".nbd-qs-container .qsfilter-background-class").removeClass("d-none")
}
function qs_escapeRegExp(b) {
    return b.replace(/[.*+?^${}()|[\]\\]/g, "\\$\x26")
}
function qs_replaceAll(b, g, d) {
    return b.replace(new RegExp(qs_escapeRegExp(g), "g"), d)
}
;