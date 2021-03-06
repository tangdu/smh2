/*
 * Extensible 1.5.2
 * Copyright(c) 2010-2013 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.define("Extensible", {singleton: true, version: "1.5.2", versionDetails: {major: 1, minor: 5, patch: 2}, extVersion: "4.0.1", hasBorderRadius: Ext.supports.CSS3BorderRadius, log: function (a) {
}, getScrollWidth: function () {
    return Ext.getScrollbarSize ? Ext.getScrollbarSize().width : Ext.getScrollBarWidth()
}, constructor: function () {
    Ext.onReady(function () {
        if (Extensible.getScrollWidth() < 3) {
            Ext.getBody().addCls("x-no-scrollbar")
        }
        if (Ext.isWindows) {
            Ext.getBody().addCls("x-win")
        }
    })
}, Date: {use24HourTime: false, diff: function (f, a, c) {
    var b = 1, e = a.getTime() - f.getTime();
    if (c == "s") {
        b = 1000
    } else {
        if (c == "m") {
            b = 1000 * 60
        } else {
            if (c == "h") {
                b = 1000 * 60 * 60
            }
        }
    }
    return Math.round(e / b)
}, diffDays: function (f, b) {
    var c = 1000 * 60 * 60 * 24, a = Ext.Date.clearTime, e = a(b, true).getTime() - a(f, true).getTime();
    return Math.ceil(e / c)
}, copyTime: function (c, b) {
    var a = Ext.Date.clone(b);
    a.setHours(c.getHours(), c.getMinutes(), c.getSeconds(), c.getMilliseconds());
    return a
}, compare: function (c, b, a) {
    var f = c, e = b;
    if (a !== true) {
        f = Ext.Date.clone(c);
        f.setMilliseconds(0);
        e = Ext.Date.clone(b);
        e.setMilliseconds(0)
    }
    return e.getTime() - f.getTime()
}, maxOrMin: function (a) {
    var f = (a ? 0 : Number.MAX_VALUE), c = 0, b = arguments[1], e = b.length;
    for (; c < e; c++) {
        f = Math[a ? "max" : "min"](f, b[c].getTime())
    }
    return new Date(f)
}, max: function () {
    return this.maxOrMin.apply(this, [true, arguments])
}, min: function () {
    return this.maxOrMin.apply(this, [false, arguments])
}, isInRange: function (a, c, b) {
    return(a >= c && a <= b)
}, rangesOverlap: function (g, b, f, a) {
    var c = (g >= f && g <= a), e = (b >= f && b <= a), h = (g <= f && b >= a);
    return(c || e || h)
}, isWeekend: function (a) {
    return a.getDay() % 6 === 0
}, isWeekday: function (a) {
    return a.getDay() % 6 !== 0
}, isMidnight: function (a) {
    return a.getHours() === 0 && a.getMinutes() === 0
}, isToday: function (a) {
    return this.diffDays(a, this.today()) === 0
}, today: function () {
    return Ext.Date.clearTime(new Date())
}, add: function (c, e) {
    if (!e) {
        return c
    }
    var b = Ext.Date, a = b.add, f = b.clone(c);
    if (e.years) {
        f = a(f, b.YEAR, e.years)
    }
    if (e.months) {
        f = a(f, b.MONTH, e.months)
    }
    if (e.weeks) {
        e.days = (e.days || 0) + (e.weeks * 7)
    }
    if (e.days) {
        f = a(f, b.DAY, e.days)
    }
    if (e.hours) {
        f = a(f, b.HOUR, e.hours)
    }
    if (e.minutes) {
        f = a(f, b.MINUTE, e.minutes)
    }
    if (e.seconds) {
        f = a(f, b.SECOND, e.seconds)
    }
    if (e.millis) {
        f = a(f, b.MILLI, e.millis)
    }
    return e.clearTime ? b.clearTime(f) : f
}}});
Ext.require(["Ext.picker.Color", "Ext.form.Basic", "Ext.data.proxy.Memory"]);
Extensible.applyOverrides = function () {
    var a = Ext.getVersion();
    if (Ext.layout.container.AbstractCard) {
        Ext.layout.container.AbstractCard.override({renderChildren: function () {
            if (!this.deferredRender) {
                this.getActiveItem();
                this.callParent()
            }
        }})
    }
    Ext.Component.override({getId: function () {
        var b = this, c;
        if (!b.id) {
            c = b.getXType();
            c = c ? c.replace(/[\.,\s]/g, "-") : "ext-comp";
            b.id = c + "-" + b.getAutoId()
        }
        return b.id
    }});
    if (Ext.picker && Ext.picker.Color) {
        Ext.picker.Color.override({constructor: function () {
            this.renderTpl = this.renderTpl || Ext.create("Ext.XTemplate", '<tpl for="colors"><a href="#" class="color-{.}" hidefocus="on"><em><span style="background:#{.}" unselectable="on">&#160;</span></em></a></tpl>');
            this.callParent(arguments)
        }})
    }
    if (a.isLessThan("4.1")) {
        if (Ext.data && Ext.data.reader && Ext.data.reader.Reader) {
            Ext.data.reader.Reader.override({extractData: function (m) {
                var l = this, n = [], g = [], f = l.model, h = 0, c = m.length, o = l.getIdProperty(), e, b, k;
                if (!m.length && Ext.isObject(m)) {
                    m = [m];
                    c = 1
                }
                for (; h < c; h++) {
                    e = m[h];
                    n = l.extractValues(e);
                    b = l.getId(n);
                    k = new f(n, b, e);
                    g.push(k);
                    if (l.implicitIncludes) {
                        l.readAssociated(k, e)
                    }
                }
                return g
            }})
        }
    }
    if (Ext.form && Ext.form.Basic) {
        Ext.form.Basic.override({reset: function () {
            var b = this;
            b.getFields().each(function (c) {
                c.reset()
            });
            return b
        }})
    }
    if (Ext.data && Ext.data.proxy && Ext.data.proxy.Memory) {
        Ext.data.proxy.Memory.override({updateOperation: function (b, e, c) {
            Ext.each(b.records, function (f) {
                f.commit()
            });
            b.setCompleted();
            b.setSuccessful();
            Ext.callback(e, c || this, [b])
        }, create: function () {
            this.updateOperation.apply(this, arguments)
        }, update: function () {
            this.updateOperation.apply(this, arguments)
        }, destroy: function () {
            this.updateOperation.apply(this, arguments)
        }})
    }
};
Ext.onReady(Extensible.applyOverrides);
Ext.ns("Extensible.calendar.data");
Extensible.calendar.data.EventMappings = {EventId: {name: "EventId", mapping: "id", type: "int"}, CalendarId: {name: "CalendarId", mapping: "cid", type: "int"}, Title: {name: "Title", mapping: "title", type: "string"}, StartDate: {name: "StartDate", mapping: "start", type: "date", dateFormat: "c"}, EndDate: {name: "EndDate", mapping: "end", type: "date", dateFormat: "c"}, RRule: {name: "RecurRule", mapping: "rrule", type: "string"}, Location: {name: "Location", mapping: "loc", type: "string"}, Notes: {name: "Notes", mapping: "notes", type: "string"}, Url: {name: "Url", mapping: "url", type: "string"}, IsAllDay: {name: "IsAllDay", mapping: "ad", type: "boolean"}, Reminder: {name: "Reminder", mapping: "rem", type: "string"}};
Ext.ns("Extensible.calendar.data");
Extensible.calendar.data.CalendarMappings = {CalendarId: {name: "CalendarId", mapping: "id", type: "int"}, Title: {name: "Title", mapping: "title", type: "string"}, Description: {name: "Description", mapping: "desc", type: "string"}, ColorId: {name: "ColorId", mapping: "color", type: "int"}, IsHidden: {name: "IsHidden", mapping: "hidden", type: "boolean"}};
Ext.define("Extensible.calendar.template.BoxLayout", {extend: "Ext.XTemplate", requires: ["Ext.Date"], firstWeekDateFormat: "D j", otherWeeksDateFormat: "j", singleDayDateFormat: "l, F j, Y", multiDayFirstDayFormat: "M j, Y", multiDayMonthStartFormat: "M j", constructor: function (a) {
    Ext.apply(this, a);
    var b = this.showWeekLinks ? '<div id="{weekLinkId}" class="ext-cal-week-link">{weekNum}</div>' : "";
    Extensible.calendar.template.BoxLayout.superclass.constructor.call(this, '<tpl for="weeks">', '<div id="{[this.id]}-wk-{[xindex-1]}" class="ext-cal-wk-ct" style="top:{[this.getRowTop(xindex, xcount)]}%; height:{[this.getRowHeight(xcount)]}%;">', b, '<table class="ext-cal-bg-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for=".">', '<td id="{[this.id]}-day-{date:date("Ymd")}" class="{cellCls}">&#160;</td>', "</tpl>", "</tr>", "</tbody>", "</table>", '<table class="ext-cal-evt-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for=".">', '<td id="{[this.id]}-ev-day-{date:date("Ymd")}" class="{titleCls}"><div>{title}</div></td>', "</tpl>", "</tr>", "</tbody>", "</table>", "</div>", "</tpl>", {getRowTop: function (c, e) {
        return((c - 1) * (100 / e))
    }, getRowHeight: function (c) {
        return 100 / c
    }})
}, applyTemplate: function (n) {
    Ext.apply(this, n);
    var k = 0, u = "", f = true, v = false, h = false, t = false, a = false, m = false, e = n.weekendCls, p = n.prevMonthCls, s = n.nextMonthCls, b = n.todayCls, g = [
        []
    ], r = Extensible.Date.today(), l = Ext.Date.clone(this.viewStart), c = this.startDate.getMonth();
    for (; k < this.weekCount || this.weekCount == -1; k++) {
        if (l > this.viewEnd) {
            break
        }
        g[k] = [];
        for (var q = 0; q < this.dayCount; q++) {
            v = l.getTime() === r.getTime();
            h = f || (l.getDate() == 1);
            t = (l.getMonth() < c) && this.weekCount == -1;
            a = (l.getMonth() > c) && this.weekCount == -1;
            m = l.getDay() % 6 === 0;
            if (l.getDay() == 1) {
                g[k].weekNum = this.showWeekNumbers ? Ext.Date.format(l, "W") : "&#160;";
                g[k].weekLinkId = "ext-cal-week-" + Ext.Date.format(l, "Ymd")
            }
            if (h) {
                if (v) {
                    u = this.getTodayText()
                } else {
                    u = Ext.Date.format(l, this.dayCount == 1 ? this.singleDayDateFormat : (f ? this.multiDayFirstDayFormat : this.multiDayMonthStartFormat))
                }
            } else {
                var i = (k == 0 && this.showHeader !== true) ? this.firstWeekDateFormat : this.otherWeeksDateFormat;
                u = v ? this.getTodayText() : Ext.Date.format(l, i)
            }
            g[k].push({title: u, date: Ext.Date.clone(l), titleCls: "ext-cal-dtitle " + (v ? " ext-cal-dtitle-today" : "") + (k == 0 ? " ext-cal-dtitle-first" : "") + (t ? " ext-cal-dtitle-prev" : "") + (a ? " ext-cal-dtitle-next" : ""), cellCls: "ext-cal-day " + (v ? " " + b : "") + (q == 0 ? " ext-cal-day-first" : "") + (t ? " " + p : "") + (a ? " " + s : "") + (m && e ? " " + e : "")});
            l = Extensible.Date.add(l, {days: 1});
            f = false
        }
    }
    if (Ext.getVersion().isLessThan("4.1")) {
        return Extensible.calendar.template.BoxLayout.superclass.applyTemplate.call(this, {weeks: g})
    } else {
        return this.applyOut({weeks: g}, []).join("")
    }
}, getTodayText: function () {
    var b = Extensible.Date.use24HourTime ? "G:i " : "g:ia ", c = this.showTodayText !== false ? this.todayText : "", a = this.showTime !== false ? ' <span id="' + this.id + '-clock" class="ext-cal-dtitle-time" aria-live="off">' + Ext.Date.format(new Date(), b) + "</span>" : "", e = c.length > 0 || a.length > 0 ? " &#8212; " : "";
    if (this.dayCount == 1) {
        return Ext.Date.format(new Date(), this.singleDayDateFormat) + e + c + a
    }
    fmt = this.weekCount == 1 ? this.firstWeekDateFormat : this.otherWeeksDateFormat;
    return c.length > 0 ? c + a : Ext.Date.format(new Date(), fmt) + a
}}, function () {
    this.createAlias("apply", "applyTemplate")
});
Ext.define("Extensible.calendar.template.DayHeader", {extend: "Ext.XTemplate", requires: ["Extensible.calendar.template.BoxLayout"], constructor: function (a) {
    Ext.apply(this, a);
    this.allDayTpl = Ext.create("Extensible.calendar.template.BoxLayout", a);
    this.allDayTpl.compile();
    Extensible.calendar.template.DayHeader.superclass.constructor.call(this, '<div class="ext-cal-hd-ct">', '<table class="ext-cal-hd-days-tbl" cellspacing="0" cellpadding="0">', "<tbody>", "<tr>", '<td class="ext-cal-gutter"></td>', '<td class="ext-cal-hd-days-td"><div class="ext-cal-hd-ad-inner">{allDayTpl}</div></td>', '<td class="ext-cal-gutter-rt"></td>', "</tr>", "</tbody>", "</table>", "</div>")
}, applyTemplate: function (b) {
    var a = {allDayTpl: this.allDayTpl.apply(b)};
    if (Ext.getVersion().isLessThan("4.1")) {
        return Extensible.calendar.template.DayHeader.superclass.applyTemplate.call(this, a)
    } else {
        return this.applyOut(a, []).join("")
    }
}}, function () {
    this.createAlias("apply", "applyTemplate")
});
Ext.define("Extensible.calendar.template.DayBody", {extend: "Ext.XTemplate", constructor: function (a) {
    Ext.apply(this, a);
    Extensible.calendar.template.DayBody.superclass.constructor.call(this, '<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0" style="height:{dayHeight}px;">', "<tbody>", '<tr height="1">', '<td class="ext-cal-gutter"></td>', '<td colspan="{dayCount}">', '<div class="ext-cal-bg-rows">', '<div class="ext-cal-bg-rows-inner">', '<tpl for="times">', '<div class="ext-cal-bg-row ext-row-{[xindex]}" style="height:{parent.hourHeight}px;">', '<div class="ext-cal-bg-row-div {parent.hourSeparatorCls}" style="height:{parent.hourSeparatorHeight}px;"></div>', "</div>", "</tpl>", "</div>", "</div>", "</td>", "</tr>", "<tr>", '<td class="ext-cal-day-times">', '<tpl for="times">', '<div class="ext-cal-bg-row" style="height:{parent.hourHeight}px;">', '<div class="ext-cal-day-time-inner"  style="height:{parent.hourHeight-1}px;">{.}</div>', "</div>", "</tpl>", "</td>", '<tpl for="days">', '<td class="ext-cal-day-col">', '<div class="ext-cal-day-col-inner">', '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter" style="height:{parent.dayHeight}px;"></div>', "</div>", "</td>", "</tpl>", "</tr>", "</tbody>", "</table>")
}, applyTemplate: function (e) {
    this.today = Extensible.Date.today();
    this.dayCount = this.dayCount || 1;
    var l = 0, n = [], f = Ext.Date.clone(e.viewStart);
    for (; l < this.dayCount; l++) {
        n[l] = Extensible.Date.add(f, {days: l})
    }
    var a = [], b = this.viewStartHour, k = this.viewEndHour, c = this.hourIncrement, m = this.hourHeight * (k - b), g = Extensible.Date.use24HourTime ? "G:i" : "ga", h;
    f = Extensible.Date.add(new Date("5/26/1972"), {hours: b});
    for (l = b; l < k; l++) {
        a.push(Ext.Date.format(f, g));
        f = Extensible.Date.add(f, {minutes: c})
    }
    h = {days: n, dayCount: n.length, times: a, hourHeight: this.hourHeight, hourSeparatorCls: this.showHourSeparator ? "" : "no-sep", dayHeight: m, hourSeparatorHeight: (this.hourHeight / 2)};
    if (Ext.getVersion().isLessThan("4.1")) {
        return Extensible.calendar.template.DayBody.superclass.applyTemplate.call(this, h)
    } else {
        return this.applyOut(h, []).join("")
    }
}}, function () {
    this.createAlias("apply", "applyTemplate")
});
Ext.define("Extensible.calendar.template.Month", {extend: "Ext.XTemplate", requires: ["Extensible.calendar.template.BoxLayout"], dayHeaderFormat: "D", dayHeaderTitleFormat: "l, F j, Y", constructor: function (a) {
    Ext.apply(this, a);
    this.weekTpl = Ext.create("Extensible.calendar.template.BoxLayout", a);
    this.weekTpl.compile();
    var b = this.showWeekLinks ? '<div class="ext-cal-week-link-hd">&#160;</div>' : "";
    Extensible.calendar.template.Month.superclass.constructor.call(this, '<div class="ext-cal-inner-ct {extraClasses}">', '<div class="ext-cal-hd-ct ext-cal-month-hd">', b, '<table class="ext-cal-hd-days-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for="days">', '<th class="ext-cal-hd-day{[xindex==1 ? " ext-cal-day-first" : ""]}" title="{title}">{name}</th>', "</tpl>", "</tr>", "</tbody>", "</table>", "</div>", '<div class="ext-cal-body-ct">{weeks}</div>', "</div>")
}, applyTemplate: function (c) {
    var l = [], b = this.weekTpl.apply(c), e = c.viewStart, a = Extensible.Date, f;
    for (var h = 0; h < 7; h++) {
        var k = a.add(e, {days: h});
        l.push({name: Ext.Date.format(k, this.dayHeaderFormat), title: Ext.Date.format(k, this.dayHeaderTitleFormat)})
    }
    var g = this.showHeader === true ? "" : "ext-cal-noheader";
    if (this.showWeekLinks) {
        g += " ext-cal-week-links"
    }
    f = {days: l, weeks: b, extraClasses: g};
    if (Ext.getVersion().isLessThan("4.1")) {
        return Extensible.calendar.template.Month.superclass.applyTemplate.call(this, f)
    } else {
        return this.applyOut(f, []).join("")
    }
}}, function () {
    this.createAlias("apply", "applyTemplate")
});
Ext.define("Ext.dd.ScrollManager", {singleton: true, requires: ["Ext.dd.DragDropManager"], constructor: function () {
    var a = Ext.dd.DragDropManager;
    a.fireEvents = Ext.Function.createSequence(a.fireEvents, this.onFire, this);
    a.stopDrag = Ext.Function.createSequence(a.stopDrag, this.onStop, this);
    this.doScroll = Ext.Function.bind(this.doScroll, this);
    this.ddmInstance = a;
    this.els = {};
    this.dragEl = null;
    this.proc = {}
}, onStop: function (a) {
    this.dragEl = null;
    this.clearProc()
}, triggerRefresh: function () {
    if (this.ddmInstance.dragCurrent) {
        this.ddmInstance.refreshCache(this.ddmInstance.dragCurrent.groups)
    }
}, doScroll: function () {
    if (this.ddmInstance.dragCurrent) {
        var a = this.proc, b = a.el, c = a.el.ddScrollConfig, e = c ? c.increment : this.increment;
        if (!this.animate) {
            if (b.scroll(a.dir, e)) {
                this.triggerRefresh()
            }
        } else {
            b.scroll(a.dir, e, true, this.animDuration, this.triggerRefresh)
        }
    }
}, clearProc: function () {
    var a = this.proc;
    if (a.id) {
        clearInterval(a.id)
    }
    a.id = 0;
    a.el = null;
    a.dir = ""
}, startProc: function (b, a) {
    this.clearProc();
    this.proc.el = b;
    this.proc.dir = a;
    var e = b.ddScrollConfig ? b.ddScrollConfig.ddGroup : undefined, c = (b.ddScrollConfig && b.ddScrollConfig.frequency) ? b.ddScrollConfig.frequency : this.frequency;
    if (e === undefined || this.ddmInstance.dragCurrent.ddGroup == e) {
        this.proc.id = setInterval(this.doScroll, c)
    }
}, onFire: function (h, l) {
    if (l || !this.ddmInstance.dragCurrent) {
        return
    }
    if (!this.dragEl || this.dragEl != this.ddmInstance.dragCurrent) {
        this.dragEl = this.ddmInstance.dragCurrent;
        this.refreshCache()
    }
    var m = h.getXY(), n = h.getPoint(), i = this.proc, g = this.els;
    for (var b in g) {
        var f = g[b], a = f._region;
        var k = f.ddScrollConfig ? f.ddScrollConfig : this;
        if (a && a.contains(n) && f.isScrollable()) {
            if (a.bottom - n.y <= k.vthresh) {
                if (i.el != f) {
                    this.startProc(f, "down")
                }
                return
            } else {
                if (a.right - n.x <= k.hthresh) {
                    if (i.el != f) {
                        this.startProc(f, "left")
                    }
                    return
                } else {
                    if (n.y - a.top <= k.vthresh) {
                        if (i.el != f) {
                            this.startProc(f, "up")
                        }
                        return
                    } else {
                        if (n.x - a.left <= k.hthresh) {
                            if (i.el != f) {
                                this.startProc(f, "right")
                            }
                            return
                        }
                    }
                }
            }
        }
    }
    this.clearProc()
}, register: function (c) {
    if (Ext.isArray(c)) {
        for (var b = 0, a = c.length; b < a; b++) {
            this.register(c[b])
        }
    } else {
        c = Ext.get(c);
        this.els[c.id] = c
    }
}, unregister: function (c) {
    if (Ext.isArray(c)) {
        for (var b = 0, a = c.length; b < a; b++) {
            this.unregister(c[b])
        }
    } else {
        c = Ext.get(c);
        delete this.els[c.id]
    }
}, vthresh: 25, hthresh: 25, increment: 100, frequency: 500, animate: true, animDuration: 0.4, ddGroup: undefined, refreshCache: function () {
    var a = this.els, b;
    for (b in a) {
        if (typeof a[b] == "object") {
            a[b]._region = a[b].getRegion()
        }
    }
}});
Ext.define("Extensible.calendar.dd.StatusProxy", {extend: "Ext.dd.StatusProxy", moveEventCls: "ext-cal-dd-move", addEventCls: "ext-cal-dd-add", renderTpl: ['<div class="' + Ext.baseCSSPrefix + 'dd-drop-icon"></div>', '<div class="ext-dd-ghost-ct">', '<div id="{id}-ghost" class="' + Ext.baseCSSPrefix + 'dd-drag-ghost"></div>', '<div id="{id}-message" class="ext-dd-msg"></div>', "</div>"], childEls: ["ghost", "message"], constructor: function (a) {
    if (Ext.getVersion().isLessThan("4.1")) {
        this.preComponentConstructor(a)
    } else {
        this.callParent(arguments)
    }
}, preComponentConstructor: function (a) {
    var b = this;
    Ext.apply(b, a);
    b.id = b.id || Ext.id();
    b.proxy = Ext.createWidget("component", {floating: true, id: b.id || Ext.id(), html: b.renderTpl.join(""), cls: Ext.baseCSSPrefix + "dd-drag-proxy " + b.dropNotAllowed, shadow: !a || a.shadow !== false, renderTo: document.body});
    b.el = b.proxy.el;
    b.el.show();
    b.el.setVisibilityMode(Ext.Element.VISIBILITY);
    b.el.hide();
    b.ghost = Ext.get(b.el.dom.childNodes[1].childNodes[0]);
    b.message = Ext.get(b.el.dom.childNodes[1].childNodes[1]);
    b.dropStatus = b.dropNotAllowed
}, update: function (a) {
    this.callParent(arguments);
    var b = this.ghost.dom.firstChild;
    if (b) {
        Ext.fly(b).setHeight("auto")
    }
}, updateMsg: function (a) {
    this.message.update(a)
}});
Ext.define("Extensible.calendar.dd.DragZone", {extend: "Ext.dd.DragZone", requires: ["Ext.util.Point", "Extensible.calendar.dd.StatusProxy", "Extensible.calendar.data.EventMappings"], ddGroup: "CalendarDD", eventSelector: ".ext-cal-evt", constructor: function (b, a) {
    if (!Extensible.calendar._statusProxyInstance) {
        Extensible.calendar._statusProxyInstance = Ext.create("Extensible.calendar.dd.StatusProxy")
    }
    this.proxy = Extensible.calendar._statusProxyInstance;
    this.callParent(arguments)
}, getDragData: function (b) {
    var a = b.getTarget(this.eventSelector, 3);
    if (a) {
        var c = this.view.getEventRecordFromEl(a);
        if (!c) {
            return
        }
        return{type: "eventdrag", ddel: a, eventStart: c.data[Extensible.calendar.data.EventMappings.StartDate.name], eventEnd: c.data[Extensible.calendar.data.EventMappings.EndDate.name], proxy: this.proxy}
    }
    a = this.view.getDayAt(b.getX(), b.getY());
    if (a.el) {
        return{type: "caldrag", start: a.date, proxy: this.proxy}
    }
    return null
}, onInitDrag: function (a, e) {
    if (this.dragData.ddel) {
        var b = this.dragData.ddel.cloneNode(true), c = Ext.fly(b).down("dl");
        Ext.fly(b).setWidth("auto");
        if (c) {
            c.setHeight("auto")
        }
        this.proxy.update(b);
        this.onStartDrag(a, e)
    } else {
        if (this.dragData.start) {
            this.onStartDrag(a, e)
        }
    }
    this.view.onInitDrag();
    return true
}, afterRepair: function () {
    if (Ext.enableFx && this.dragData.ddel) {
        Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor || "c3daf9")
    }
    this.dragging = false
}, getRepairXY: function (a) {
    if (this.dragData.ddel) {
        return Ext.Element.fly(this.dragData.ddel).getXY()
    }
}, afterInvalidDrop: function (a, b) {
    Ext.select(".ext-dd-shim").hide()
}, destroy: function () {
    this.callParent(arguments);
    delete Extensible.calendar._statusProxyInstance
}});
Ext.define("Extensible.calendar.dd.DropZone", {extend: "Ext.dd.DropZone", requires: [Ext.getVersion().isLessThan("4.2") ? "Ext.Layer" : "Ext.dom.Layer", "Extensible.calendar.data.EventMappings"], ddGroup: "CalendarDD", eventSelector: ".ext-cal-evt", dateRangeFormat: "{0}-{1}", dateFormat: "n/j", shims: [], getTargetFromEvent: function (b) {
    var a = this.dragOffset || 0, f = b.getPageY() - a, c = this.view.getDayAt(b.getPageX(), f);
    return c.el ? c : null
}, onNodeOver: function (f, l, k, h) {
    var a = Extensible.Date, b = h.type == "eventdrag" ? f.date : a.min(h.start, f.date), g = h.type == "eventdrag" ? a.add(f.date, {days: a.diffDays(h.eventStart, h.eventEnd)}) : a.max(h.start, f.date);
    if (!this.dragStartDate || !this.dragEndDate || (a.diffDays(b, this.dragStartDate) != 0) || (a.diffDays(g, this.dragEndDate) != 0)) {
        this.dragStartDate = b;
        this.dragEndDate = a.add(g, {days: 1, millis: -1, clearTime: true});
        this.shim(b, g);
        var i = Ext.Date.format(b, this.dateFormat);
        if (a.diffDays(b, g) > 0) {
            g = Ext.Date.format(g, this.dateFormat);
            i = Ext.String.format(this.dateRangeFormat, i, g)
        }
        var c = Ext.String.format(h.type == "eventdrag" ? this.moveText : this.createText, i);
        h.proxy.updateMsg(c)
    }
    return this.dropAllowed
}, shim: function (b, g) {
    this.currWeek = -1;
    var c = Ext.Date.clone(b), h = 0, f, k, a = Extensible.Date, e = a.diffDays(c, g) + 1;
    this.DDMInstance.notifyOccluded = true;
    Ext.each(this.shims, function (i) {
        if (i) {
            i.isActive = false
        }
    });
    while (h++ < e) {
        var l = this.view.getDayEl(c);
        if (l) {
            var m = this.view.getWeekIndex(c), f = this.shims[m];
            if (!f) {
                f = this.createShim();
                this.shims[m] = f
            }
            if (m != this.currWeek) {
                f.boxInfo = l.getBox();
                this.currWeek = m
            } else {
                k = l.getBox();
                f.boxInfo.right = k.right;
                f.boxInfo.width = k.right - f.boxInfo.x
            }
            f.isActive = true
        }
        c = a.add(c, {days: 1})
    }
    Ext.each(this.shims, function (i) {
        if (i) {
            if (i.isActive) {
                i.show();
                i.setBox(i.boxInfo)
            } else {
                if (i.isVisible()) {
                    i.hide()
                }
            }
        }
    })
}, createShim: function () {
    var a = this.view.ownerCalendarPanel ? this.view.ownerCalendarPanel : this.view;
    if (!this.shimCt) {
        this.shimCt = Ext.get("ext-dd-shim-ct-" + a.id);
        if (!this.shimCt) {
            this.shimCt = document.createElement("div");
            this.shimCt.id = "ext-dd-shim-ct-" + a.id;
            a.getEl().parent().appendChild(this.shimCt)
        }
    }
    var b = document.createElement("div");
    b.className = "ext-dd-shim";
    this.shimCt.appendChild(b);
    return Ext.create(Ext.getVersion().isLessThan("4.2") ? "Ext.Layer" : "Ext.dom.Layer", {shadow: false, useDisplay: true, constrain: false}, b)
}, clearShims: function () {
    Ext.each(this.shims, function (a) {
        if (a) {
            a.hide()
        }
    });
    this.DDMInstance.notifyOccluded = false
}, onContainerOver: function (a, c, b) {
    return this.dropAllowed
}, onCalendarDragComplete: function () {
    delete this.dragStartDate;
    delete this.dragEndDate;
    this.clearShims()
}, onNodeDrop: function (h, a, f, c) {
    if (h && c) {
        if (c.type == "eventdrag") {
            var g = this.view.getEventRecordFromEl(c.ddel), b = Extensible.Date.copyTime(g.data[Extensible.calendar.data.EventMappings.StartDate.name], h.date);
            this.view.onEventDrop(g, b);
            this.onCalendarDragComplete();
            return true
        }
        if (c.type == "caldrag") {
            this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate, Ext.bind(this.onCalendarDragComplete, this));
            return true
        }
    }
    this.onCalendarDragComplete();
    return false
}, onContainerDrop: function (a, c, b) {
    this.onCalendarDragComplete();
    return false
}, destroy: function () {
    Ext.each(this.shims, function (a) {
        if (a) {
            Ext.destroy(a)
        }
    });
    Ext.removeNode(this.shimCt);
    delete this.shimCt;
    this.shims.length = 0
}});
Ext.define("Extensible.calendar.dd.DayDragZone", {extend: "Extensible.calendar.dd.DragZone", ddGroup: "DayViewDD", resizeSelector: ".ext-evt-rsz", getDragData: function (c) {
    var a = c.getTarget(this.resizeSelector, 2, true);
    if (a) {
        var b = a.parent(this.eventSelector), f = this.view.getEventRecordFromEl(b);
        if (!f) {
            return
        }
        return{type: "eventresize", xy: c.getXY(), ddel: b.dom, eventStart: f.data[Extensible.calendar.data.EventMappings.StartDate.name], eventEnd: f.data[Extensible.calendar.data.EventMappings.EndDate.name], proxy: this.proxy}
    }
    var a = c.getTarget(this.eventSelector, 3);
    if (a) {
        var f = this.view.getEventRecordFromEl(a);
        if (!f) {
            return
        }
        return{type: "eventdrag", xy: c.getXY(), ddel: a, eventStart: f.data[Extensible.calendar.data.EventMappings.StartDate.name], eventEnd: f.data[Extensible.calendar.data.EventMappings.EndDate.name], proxy: this.proxy}
    }
    a = this.view.getDayAt(c.getX(), c.getY());
    if (a.el) {
        return{type: "caldrag", dayInfo: a, proxy: this.proxy}
    }
    return null
}});
Ext.define("Extensible.calendar.dd.DayDropZone", {extend: "Extensible.calendar.dd.DropZone", ddGroup: "DayViewDD", dateRangeFormat: "{0}-{1}", dateFormat: "n/j", onNodeOver: function (c, p, m, i) {
    var b, q = this.createText, h = Extensible.Date.use24HourTime ? "G:i" : "g:ia";
    if (i.type == "caldrag") {
        if (!this.dragStartMarker) {
            this.dragStartMarker = c.el.parent().createChild({style: "position:absolute;"});
            this.dragStartMarker.setBox(i.dayInfo.timeBox);
            this.dragCreateDt = i.dayInfo.date
        }
        var l, k = this.dragStartMarker.getBox();
        k.height = Math.ceil(Math.abs(m.getY() - k.y) / c.timeBox.height) * c.timeBox.height;
        if (m.getY() < k.y) {
            k.height += c.timeBox.height;
            k.y = k.y - k.height + c.timeBox.height;
            l = Extensible.Date.add(this.dragCreateDt, {minutes: this.ddIncrement})
        } else {
            c.date = Extensible.Date.add(c.date, {minutes: this.ddIncrement})
        }
        this.shim(this.dragCreateDt, k);
        var o = Extensible.Date.diff(this.dragCreateDt, c.date), t = Extensible.Date.add(this.dragCreateDt, {millis: o});
        this.dragStartDate = Extensible.Date.min(this.dragCreateDt, t);
        this.dragEndDate = l || Extensible.Date.max(this.dragCreateDt, t);
        b = Ext.String.format(this.dateRangeFormat, Ext.Date.format(this.dragStartDate, h), Ext.Date.format(this.dragEndDate, h))
    } else {
        var s = Ext.get(i.ddel), r = s.parent().parent(), k = s.getBox();
        k.width = r.getWidth();
        if (i.type == "eventdrag") {
            if (this.dragOffset === undefined) {
                var f = this.view.getDayAt(i.xy[0], i.xy[1]).timeBox;
                this.dragOffset = f.y - k.y
            } else {
                k.y = c.timeBox.y
            }
            b = Ext.Date.format(c.date, (this.dateFormat + " " + h));
            k.x = c.el.getLeft();
            this.shim(c.date, k);
            q = this.moveText
        }
        if (i.type == "eventresize") {
            if (!this.resizeDt) {
                this.resizeDt = c.date
            }
            k.x = r.getLeft();
            k.height = Math.ceil(Math.abs(m.getY() - k.y) / c.timeBox.height) * c.timeBox.height;
            if (m.getY() < k.y) {
                k.y -= k.height
            } else {
                c.date = Extensible.Date.add(c.date, {minutes: this.ddIncrement})
            }
            this.shim(this.resizeDt, k);
            var o = Extensible.Date.diff(this.resizeDt, c.date), t = Extensible.Date.add(this.resizeDt, {millis: o}), a = Extensible.Date.min(i.eventStart, t), g = Extensible.Date.max(i.eventStart, t);
            i.resizeDates = {StartDate: a, EndDate: g};
            b = Ext.String.format(this.dateRangeFormat, Ext.Date.format(a, h), Ext.Date.format(g, h));
            q = this.resizeText
        }
    }
    i.proxy.updateMsg(Ext.String.format(q, b));
    return this.dropAllowed
}, shim: function (b, a) {
    this.DDMInstance.notifyOccluded = true;
    Ext.each(this.shims, function (e) {
        if (e) {
            e.isActive = false;
            e.hide()
        }
    });
    var c = this.shims[0];
    if (!c) {
        c = this.createShim();
        this.shims[0] = c
    }
    c.isActive = true;
    c.show();
    c.setBox(a)
}, onNodeDrop: function (g, a, c, b) {
    if (g && b) {
        if (b.type == "eventdrag") {
            var f = this.view.getEventRecordFromEl(b.ddel);
            this.view.onEventDrop(f, g.date);
            this.onCalendarDragComplete();
            delete this.dragOffset;
            return true
        }
        if (b.type == "eventresize") {
            var f = this.view.getEventRecordFromEl(b.ddel);
            this.view.onEventResize(f, b.resizeDates);
            this.onCalendarDragComplete();
            delete this.resizeDt;
            return true
        }
        if (b.type == "caldrag") {
            Ext.destroy(this.dragStartMarker);
            delete this.dragStartMarker;
            delete this.dragCreateDt;
            this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate, Ext.bind(this.onCalendarDragComplete, this));
            return true
        }
    }
    this.onCalendarDragComplete();
    return false
}});
Ext.define("Extensible.calendar.data.EventModel", {extend: "Ext.data.Model", requires: ["Ext.util.MixedCollection", "Extensible.calendar.data.EventMappings"], statics: {reconfigure: function () {
    var f = Extensible.calendar.data, c = f.EventMappings, g = f.EventModel.prototype, b = [];
    g.idProperty = c.EventId.name || "id";
    for (prop in c) {
        if (c.hasOwnProperty(prop)) {
            b.push(c[prop])
        }
    }
    g.fields.clear();
    for (var e = 0, a = b.length; e < a; e++) {
        g.fields.add(Ext.create("Ext.data.Field", b[e]))
    }
    return f.EventModel
}}, getId: function () {
    return this.get(this.idProperty)
}}, function () {
    Extensible.calendar.data.EventModel.reconfigure()
});
Ext.define("Extensible.calendar.data.EventStore", {extend: "Ext.data.Store", model: "Extensible.calendar.data.EventModel", constructor: function (a) {
    a = a || {};
    this.deferLoad = a.autoLoad;
    a.autoLoad = false;
    this.callParent(arguments)
}, load: function (a) {
    Extensible.log("store load");
    a = a || {};
    if (a.params) {
        delete this.initialParams
    }
    if (this.initialParams) {
        a.params = a.params || {};
        Ext.apply(a.params, this.initialParams);
        delete this.initialParams
    }
    this.callParent(arguments)
}});
Ext.define("Extensible.calendar.data.CalendarModel", {extend: "Ext.data.Model", requires: ["Ext.util.MixedCollection", "Extensible.calendar.data.CalendarMappings"], statics: {reconfigure: function () {
    var f = Extensible.calendar.data, c = f.CalendarMappings, g = f.CalendarModel.prototype, b = [];
    g.idProperty = c.CalendarId.name || "id";
    for (prop in c) {
        if (c.hasOwnProperty(prop)) {
            b.push(c[prop])
        }
    }
    g.fields.clear();
    for (var e = 0, a = b.length; e < a; e++) {
        g.fields.add(Ext.create("Ext.data.Field", b[e]))
    }
    return f.CalendarModel
}}}, function () {
    Extensible.calendar.data.CalendarModel.reconfigure()
});
Ext.define("Extensible.calendar.data.MemoryCalendarStore", {extend: "Ext.data.Store", model: "Extensible.calendar.data.CalendarModel", requires: ["Ext.data.proxy.Memory", "Ext.data.reader.Json", "Ext.data.writer.Json", "Extensible.calendar.data.CalendarModel", "Extensible.calendar.data.CalendarMappings"], proxy: {type: "memory", reader: {type: "json", root: "calendars"}, writer: {type: "json"}}, autoLoad: true, initComponent: function () {
    this.sorters = this.sorters || [
        {property: Extensible.calendar.data.CalendarMappings.Title.name, direction: "ASC"}
    ];
    this.idProperty = this.idProperty || Extensible.calendar.data.CalendarMappings.CalendarId.name || "id";
    this.fields = Extensible.calendar.data.CalendarModel.prototype.fields.getRange();
    this.callParent(arguments)
}});
Ext.define("Extensible.calendar.data.MemoryEventStore", {extend: "Ext.data.Store", model: "Extensible.calendar.data.EventModel", requires: ["Ext.data.proxy.Memory", "Ext.data.reader.Json", "Ext.data.writer.Json", "Extensible.calendar.data.EventModel", "Extensible.calendar.data.EventMappings"], proxy: {type: "memory", reader: {type: "json", root: "evts"}, writer: {type: "json"}}, constructor: function (a) {
    a = a || {};
    this.callParent(arguments);
    this.sorters = this.sorters || [
        {property: Extensible.calendar.data.EventMappings.StartDate.name, direction: "ASC"}
    ];
    this.idProperty = this.idProperty || Extensible.calendar.data.EventMappings.EventId.mapping || "id";
    this.fields = Extensible.calendar.data.EventModel.prototype.fields.getRange();
    if (a.autoMsg !== false) {
        this.on("write", this.onWrite, this)
    }
    this.autoMsg = a.autoMsg;
    this.onCreateRecords = Ext.Function.createInterceptor(this.onCreateRecords, this.interceptCreateRecords);
    this.initRecs()
}, interceptCreateRecords: function (c, b, g) {
    if (g) {
        var e = 0, f, a = c.length;
        for (; e < a; e++) {
            c[e].data[Extensible.calendar.data.EventMappings.EventId.name] = c[e].id
        }
    }
}, initRecs: function () {
    this.each(function (a) {
        a.store = this;
        a.phantom = false
    }, this)
}, onWrite: function (b, a) {
    var c = this;
    if (Extensible.example && Extensible.example.msg) {
        var g = a.wasSuccessful(), f = a.getRecords()[0], e = f.data[Extensible.calendar.data.EventMappings.Title.name];
        switch (a.action) {
            case"create":
                Extensible.example.msg("Add", 'Added "' + Ext.value(e, "(No title)") + '"');
                break;
            case"update":
                Extensible.example.msg("Update", 'Updated "' + Ext.value(e, "(No title)") + '"');
                break;
            case"destroy":
                Extensible.example.msg("Delete", 'Deleted "' + Ext.value(e, "(No title)") + '"');
                break
        }
    }
}, onProxyLoad: function (b) {
    var e = this, a;
    if (e.data && e.data.length > 0) {
        e.totalCount = e.data.length;
        a = e.data.items
    } else {
        var c = b.getResultSet(), f = b.wasSuccessful();
        a = b.getRecords();
        if (c) {
            e.totalCount = c.total
        }
        if (f) {
            e.loadRecords(a, b)
        }
    }
    e.loading = false;
    e.fireEvent("load", e, a, f)
}});
Ext.define("Extensible.calendar.util.WeekEventRenderer", {requires: ["Ext.DomHelper"], statics: {getEventRow: function (a, b, h) {
    var f = 1, g = Ext.get(a + "-wk-" + b), e, c;
    if (g) {
        c = g.child(".ext-cal-evt-tbl", true);
        e = c.tBodies[0].childNodes[h + f];
        if (!e) {
            e = Ext.DomHelper.append(c.tBodies[0], "<tr></tr>")
        }
    }
    return Ext.get(e)
}, renderEvent: function (e, l, b, c, a, g, f) {
    var k = Extensible.calendar.data.EventMappings, n = e.data || e.event.data, o = Ext.Date.clone(g), p = Extensible.Date.add(o, {days: a - b, millis: -1}), h = this.getEventRow(f.viewId, l, c), m = Extensible.Date.diffDays(g, n[k.EndDate.name]) + 1, i = Math.min(m, a - b);
    n._weekIndex = l;
    n._renderAsAllDay = n[k.IsAllDay.name] || e.isSpanStart;
    n.spanLeft = n[k.StartDate.name].getTime() < o.getTime();
    n.spanRight = n[k.EndDate.name].getTime() > p.getTime();
    n.spanCls = (n.spanLeft ? (n.spanRight ? "ext-cal-ev-spanboth" : "ext-cal-ev-spanleft") : (n.spanRight ? "ext-cal-ev-spanright" : ""));
    var q = {tag: "td", cls: "ext-cal-ev", cn: f.tpl.apply(f.templateDataFn(n))};
    if (i > 1) {
        q.colspan = i
    }
    Ext.DomHelper.append(h, q)
}, render: function (u) {
    var w = this, x = "&#160;", r = 0, g = u.eventGrid, h = Ext.Date.clone(u.viewStart), l = "", m = u.tpl, p = u.maxEventsPerDay != undefined ? u.maxEventsPerDay : 999, s = u.weekCount < 1 ? 6 : u.weekCount, n = u.weekCount == 1 ? u.dayCount : 7, t, o, a, e, f, q, c, k, i, b;
    for (; r < s; r++) {
        o = 0;
        a = g[r];
        for (; o < n; o++) {
            l = Ext.Date.format(h, "Ymd");
            if (a && a[o]) {
                e = 0;
                f = 0;
                q = a[o];
                c = q.length;
                for (; e < c; e++) {
                    if (!q[e]) {
                        if (e >= p) {
                            continue
                        }
                        t = w.getEventRow(u.viewId, r, e);
                        Ext.DomHelper.append(t, {tag: "td", cls: "ext-cal-ev", html: x, id: u.viewId + "-empty-" + c + "-day-" + l})
                    } else {
                        if (e >= p) {
                            f++;
                            continue
                        }
                        k = q[e];
                        if (!k.isSpan || k.isSpanStart) {
                            w.renderEvent(k, r, o, e, n, h, u)
                        }
                    }
                }
                if (f > 0) {
                    t = w.getEventRow(u.viewId, r, p);
                    Ext.DomHelper.append(t, {tag: "td", cls: "ext-cal-ev-more", id: "ext-cal-ev-more-" + Ext.Date.format(h, "Ymd"), cn: {tag: "a", html: Ext.String.format(u.getMoreText(f), f)}})
                } else {
                    if (c < u.evtMaxCount[r]) {
                        t = w.getEventRow(u.viewId, r, c);
                        if (t) {
                            i = {tag: "td", cls: "ext-cal-ev", html: x, id: u.viewId + "-empty-" + (c + 1) + "-day-" + l};
                            var v = u.evtMaxCount[r] - c;
                            if (v > 1) {
                                i.rowspan = v
                            }
                            Ext.DomHelper.append(t, i)
                        }
                    }
                }
            } else {
                t = w.getEventRow(u.viewId, r, 0);
                if (t) {
                    i = {tag: "td", cls: "ext-cal-ev", html: x, id: u.viewId + "-empty-day-" + l};
                    if (u.evtMaxCount[r] > 1) {
                        i.rowspan = u.evtMaxCount[r]
                    }
                    Ext.DomHelper.append(t, i)
                }
            }
            h = Extensible.Date.add(h, {days: 1})
        }
    }
}}});
Ext.define("Extensible.calendar.form.field.CalendarCombo", {extend: "Ext.form.field.ComboBox", alias: "widget.extensible.calendarcombo", requires: ["Extensible.calendar.data.CalendarMappings"], fieldLabel: "Calendar", triggerAction: "all", queryMode: "local", forceSelection: true, selectOnFocus: true, defaultCls: "x-cal-default", hiddenCalendarCls: "ext-cal-hidden", initComponent: function () {
    this.valueField = Extensible.calendar.data.CalendarMappings.CalendarId.name;
    this.displayField = Extensible.calendar.data.CalendarMappings.Title.name;
    this.listConfig = Ext.apply(this.listConfig || {}, {getInnerTpl: this.getListItemTpl});
    this.store.on("update", this.refreshColorCls, this);
    this.callParent(arguments)
}, getListItemTpl: function (a) {
    return'<div class="x-combo-list-item x-cal-{' + Extensible.calendar.data.CalendarMappings.ColorId.name + '}"><div class="ext-cal-picker-icon">&#160;</div>{' + a + "}</div>"
}, afterRender: function () {
    this.callParent(arguments);
    this.wrap = this.el.down(".x-form-item-body");
    this.wrap.addCls("ext-calendar-picker");
    this.icon = Ext.core.DomHelper.append(this.wrap, {tag: "div", cls: "ext-cal-picker-icon ext-cal-picker-mainicon"})
}, refreshColorCls: function () {
    var a = this, e = Extensible.calendar.data.CalendarMappings, c = "", b = a.getValue();
    if (!a.wrap) {
        return a
    }
    if (a.currentStyleClss !== undefined) {
        a.wrap.removeCls(a.currentStyleClss)
    }
    if (!Ext.isEmpty(b)) {
        if (Ext.isArray(b)) {
            b = b[0]
        }
        if (!b.data) {
            b = this.store.findRecord(e.CalendarId.name, b)
        }
        c = "x-cal-" + (b.data ? b.data[e.ColorId.name] : b)
    }
    a.currentStyleClss = c;
    a.wrap.addCls(c);
    return a
}, setValue: function (a) {
    if (!a && this.store.getCount() > 0) {
        a = this.store.getAt(0).data[Extensible.calendar.data.CalendarMappings.CalendarId.name]
    }
    this.callParent(arguments);
    this.refreshColorCls()
}});
Ext.define("Extensible.form.recurrence.Combo", {extend: "Ext.form.field.ComboBox", alias: "widget.extensible.recurrencecombo", requires: ["Ext.data.ArrayStore"], width: 160, fieldLabel: "Repeats", mode: "local", triggerAction: "all", forceSelection: true, displayField: "pattern", valueField: "id", recurrenceText: {none: "Does not repeat", daily: "Daily", weekly: "Weekly", monthly: "Monthly", yearly: "Yearly"}, initComponent: function () {
    this.callParent(arguments);
    this.addEvents("recurrencechange");
    this.store = this.store || Ext.create("Ext.data.ArrayStore", {fields: ["id", "pattern"], idIndex: 0, data: [
        ["NONE", this.recurrenceText.none],
        ["DAILY", this.recurrenceText.daily],
        ["WEEKLY", this.recurrenceText.weekly],
        ["MONTHLY", this.recurrenceText.monthly],
        ["YEARLY", this.recurrenceText.yearly]
    ]})
}, initValue: function () {
    this.callParent(arguments);
    if (this.value != undefined) {
        this.fireEvent("recurrencechange", this.value)
    }
}, setValue: function (b) {
    var a = this.value;
    this.callParent(arguments);
    if (a != b) {
        this.fireEvent("recurrencechange", b)
    }
    return this
}});
Ext.define("Extensible.form.recurrence.Fieldset", {extend: "Ext.form.field.Field", alias: "widget.extensible.recurrencefield", requires: ["Extensible.form.recurrence.Combo"], fieldLabel: "Repeats", startDate: Ext.Date.clearTime(new Date()), enableFx: true, initComponent: function () {
    this.callParent(arguments);
    if (!this.height) {
        this.autoHeight = true
    }
}, onRender: function (b, a) {
    if (!this.el) {
        this.frequencyCombo = Ext.create("Extensible.form.recurrence.Combo", {id: this.id + "-frequency", listeners: {recurrencechange: {fn: this.showOptions, scope: this}}});
        if (this.fieldLabel) {
            this.frequencyCombo.fieldLabel = this.fieldLabel
        }
        this.innerCt = Ext.create("Ext.Container", {cls: "extensible-recur-inner-ct", items: []});
        this.fieldCt = Ext.create("Ext.Container", {autoEl: {id: this.id}, cls: "extensible-recur-ct", renderTo: b, items: [this.frequencyCombo, this.innerCt]});
        this.fieldCt.ownerCt = this;
        this.innerCt.ownerCt = this.fieldCt;
        this.el = this.fieldCt.getEl();
        this.items = Ext.create("Ext.util.MixedCollection");
        this.items.addAll(this.initSubComponents())
    }
    this.callParent(arguments)
}, initValue: function () {
    this.setStartDate(this.startDate);
    if (this.value !== undefined) {
        this.setValue(this.value)
    } else {
        if (this.frequency !== undefined) {
            this.setValue("FREQ=" + this.frequency)
        } else {
            this.setValue("NONE")
        }
    }
    this.originalValue = this.getValue()
}, showOptions: function (c) {
    var b = false, a = "day";
    if (c != "NONE") {
        this.hideSubPanels()
    }
    this.frequency = c;
    switch (c) {
        case"DAILY":
            b = this.showSubPanel(this.repeatEvery);
            b |= this.showSubPanel(this.until);
            break;
        case"WEEKLY":
            b = this.showSubPanel(this.repeatEvery);
            b |= this.showSubPanel(this.weekly);
            b |= this.showSubPanel(this.until);
            a = "week";
            break;
        case"MONTHLY":
            b = this.showSubPanel(this.repeatEvery);
            b |= this.showSubPanel(this.monthly);
            b |= this.showSubPanel(this.until);
            a = "month";
            break;
        case"YEARLY":
            b = this.showSubPanel(this.repeatEvery);
            b |= this.showSubPanel(this.yearly);
            b |= this.showSubPanel(this.until);
            a = "year";
            break;
        default:
            this.hideInnerCt();
            return
    }
    if (b) {
        this.innerCt.doLayout()
    }
    this.showInnerCt();
    this.repeatEvery.updateLabel(a)
}, showSubPanel: function (a) {
    if (a.rendered) {
        a.show();
        return false
    } else {
        if (this.repeatEvery.rendered) {
            a = this.innerCt.insert(1, a)
        } else {
            a = this.innerCt.add(a)
        }
        a.show();
        return true
    }
}, showInnerCt: function () {
    if (!this.innerCt.isVisible()) {
        if (this.enableFx && Ext.enableFx) {
            this.innerCt.getPositionEl().slideIn("t", {duration: 0.3})
        } else {
            this.innerCt.show()
        }
    }
}, hideInnerCt: function () {
    if (this.innerCt.isVisible()) {
        if (this.enableFx && Ext.enableFx) {
            this.innerCt.getPositionEl().slideOut("t", {duration: 0.3, easing: "easeIn", callback: this.hideSubPanels, scope: this})
        } else {
            this.innerCt.hide();
            this.hideSubPanels()
        }
    }
}, setStartDate: function (a) {
    this.items.each(function (b) {
        b.setStartDate(a)
    })
}, getValue: function () {
    if (!this.rendered) {
        return this.value
    }
    if (this.frequency == "NONE") {
        return""
    }
    var a = "FREQ=" + this.frequency;
    this.items.each(function (b) {
        if (b.isVisible()) {
            a += b.getValue()
        }
    });
    return a
}, setValue: function (a) {
    this.value = a;
    if (a == null || a == "" || a == "NONE") {
        this.frequencyCombo.setValue("NONE");
        this.showOptions("NONE");
        return this
    }
    var b = a.split(";");
    this.items.each(function (c) {
        c.setValue(b)
    });
    Ext.each(b, function (e) {
        if (e.indexOf("FREQ") > -1) {
            var c = e.split("=")[1];
            this.frequencyCombo.setValue(c);
            this.showOptions(c);
            return
        }
    }, this);
    return this
}, hideSubPanels: function () {
    this.items.each(function (a) {
        a.hide()
    })
}, initSubComponents: function () {
    Extensible.calendar.recurrenceBase = Ext.extend(Ext.Container, {fieldLabel: " ", labelSeparator: "", hideLabel: true, layout: "table", anchor: "100%", startDate: this.startDate, getSuffix: function (a) {
        if (!Ext.isNumber(a)) {
            return""
        }
        switch (a) {
            case 1:
            case 21:
            case 31:
                return"st";
            case 2:
            case 22:
                return"nd";
            case 3:
            case 23:
                return"rd";
            default:
                return"th"
        }
    }, initNthCombo: function (i) {
        var i = Ext.getCmp(this.id + "-combo"), b = this.startDate, n = i.getStore(), o = b.getLastDateOfMonth().getDate(), c = b.getDate(), p = Ext.Date.format(b, "jS") + " day", h = this.id.indexOf("-yearly") > -1, l = " in " + Ext.Date.format(b, "F"), g, e, k, a, m, f, q;
        g = Math.ceil(c / 7);
        e = g + this.getSuffix(g) + Ext.Date.format(b, " l");
        if (h) {
            p += l;
            e += l
        }
        f = [
            [p],
            [e]
        ];
        q = h ? l : "";
        if (o - c < 7) {
            f.push(["last " + Ext.Date.format(b, "l") + q])
        }
        if (o == c) {
            f.push(["last day" + q])
        }
        m = n.find("field1", i.getValue());
        n.removeAll();
        i.clearValue();
        n.loadData(f);
        if (m > f.length - 1) {
            m = f.length - 1
        }
        i.setValue(n.getAt(m > -1 ? m : 0).data.field1);
        return this
    }, setValue: Ext.emptyFn});
    this.repeatEvery = new Extensible.calendar.recurrenceBase({id: this.id + "-every", layoutConfig: {columns: 3}, items: [
        {xtype: "label", text: "Repeat every"},
        {xtype: "numberfield", id: this.id + "-every-num", value: 1, width: 35, minValue: 1, maxValue: 99, allowBlank: false, enableKeyEvents: true, listeners: {keyup: {fn: function () {
            this.repeatEvery.updateLabel()
        }, scope: this}}},
        {xtype: "label", id: this.id + "-every-label"}
    ], setStartDate: function (a) {
        this.startDate = a;
        this.updateLabel();
        return this
    }, getValue: function () {
        var a = Ext.getCmp(this.id + "-num").getValue();
        return a > 1 ? ";INTERVAL=" + a : ""
    }, setValue: function (a) {
        var c = false, b = Ext.isArray(a) ? a : a.split(";");
        Ext.each(b, function (f) {
            if (f.indexOf("INTERVAL") > -1) {
                var e = f.split("=")[1];
                Ext.getCmp(this.id + "-num").setValue(e)
            }
        }, this);
        return this
    }, updateLabel: function (b) {
        if (this.rendered) {
            var a = Ext.getCmp(this.id + "-num").getValue() == 1 ? "" : "s";
            this.type = b ? b.toLowerCase() : this.type || "day";
            var c = Ext.getCmp(this.id + "-label");
            if (c.rendered) {
                c.update(this.type + a + " beginning " + Ext.Date.format(this.startDate, "l, F j"))
            }
        }
        return this
    }, afterRender: function () {
        this.callParent(arguments);
        this.updateLabel()
    }});
    this.weekly = new Extensible.calendar.recurrenceBase({id: this.id + "-weekly", layoutConfig: {columns: 2}, items: [
        {xtype: "label", text: "on:"},
        {xtype: "checkboxgroup", id: this.id + "-weekly-days", items: [
            {boxLabel: "Sun", name: "SU", id: this.id + "-weekly-SU"},
            {boxLabel: "Mon", name: "MO", id: this.id + "-weekly-MO"},
            {boxLabel: "Tue", name: "TU", id: this.id + "-weekly-TU"},
            {boxLabel: "Wed", name: "WE", id: this.id + "-weekly-WE"},
            {boxLabel: "Thu", name: "TH", id: this.id + "-weekly-TH"},
            {boxLabel: "Fri", name: "FR", id: this.id + "-weekly-FR"},
            {boxLabel: "Sat", name: "SA", id: this.id + "-weekly-SA"}
        ]}
    ], setStartDate: function (a) {
        this.startDate = a;
        this.selectToday();
        return this
    }, selectToday: function () {
        this.clearValue();
        var a = Ext.Date.format(this.startDate, "D").substring(0, 2).toUpperCase();
        Ext.getCmp(this.id + "-days").setValue(a, true)
    }, clearValue: function () {
        Ext.getCmp(this.id + "-days").setValue([false, false, false, false, false, false, false])
    }, getValue: function () {
        var b = "", c = Ext.getCmp(this.id + "-days").getValue();
        Ext.each(c, function (e) {
            if (b.length > 0) {
                b += ","
            }
            b += e.name
        });
        var a = Ext.Date.format(this.startDate, "D").substring(0, 2).toUpperCase();
        return b.length > 0 && b != a ? ";BYDAY=" + b : ""
    }, setValue: function (a) {
        var c = false, b = Ext.isArray(a) ? a : a.split(";");
        this.clearValue();
        Ext.each(b, function (f) {
            if (f.indexOf("BYDAY") > -1) {
                var g = f.split("=")[1].split(","), e = {};
                Ext.each(g, function (h) {
                    e[h] = true
                }, this);
                Ext.getCmp(this.id + "-days").setValue(e);
                return c = true
            }
        }, this);
        if (!c) {
            this.selectToday()
        }
        return this
    }});
    this.monthly = new Extensible.calendar.recurrenceBase({id: this.id + "-monthly", layoutConfig: {columns: 3}, items: [
        {xtype: "label", text: "on the"},
        {xtype: "combo", id: this.id + "-monthly-combo", mode: "local", width: 150, triggerAction: "all", forceSelection: true, store: []},
        {xtype: "label", text: "of each month"}
    ], setStartDate: function (a) {
        this.startDate = a;
        this.initNthCombo();
        return this
    }, getValue: function () {
        var f = Ext.getCmp(this.id + "-combo"), c = f.getStore(), a = c.find("field1", f.getValue()), e = this.startDate, b = Ext.Date.format(e, "D").substring(0, 2).toUpperCase();
        if (a > -1) {
            switch (a) {
                case 0:
                    return";BYMONTHDAY=" + Ext.Date.format(e, "j");
                case 1:
                    return";BYDAY=" + f.getValue()[0].substring(0, 1) + b;
                case 2:
                    return";BYDAY=-1" + b;
                default:
                    return";BYMONTHDAY=-1"
            }
        }
        return""
    }});
    this.yearly = new Extensible.calendar.recurrenceBase({id: this.id + "-yearly", layoutConfig: {columns: 3}, items: [
        {xtype: "label", text: "on the"},
        {xtype: "combo", id: this.id + "-yearly-combo", mode: "local", width: 170, triggerAction: "all", forceSelection: true, store: []},
        {xtype: "label", text: "each year"}
    ], setStartDate: function (a) {
        this.startDate = a;
        this.initNthCombo();
        return this
    }, getValue: function () {
        var f = Ext.getCmp(this.id + "-combo"), c = f.getStore(), a = c.find("field1", f.getValue()), e = this.startDate, b = Ext.Date.format(e, "D").substring(0, 2).toUpperCase(), g = ";BYMONTH=" + e.format("n");
        if (a > -1) {
            switch (a) {
                case 0:
                    return g;
                case 1:
                    return g + ";BYDAY=" + f.getValue()[0].substring(0, 1) + b;
                case 2:
                    return g + ";BYDAY=-1" + b;
                default:
                    return g + ";BYMONTHDAY=-1"
            }
        }
        return""
    }});
    this.until = new Extensible.calendar.recurrenceBase({id: this.id + "-until", untilDateFormat: "Ymd\\T000000\\Z", layoutConfig: {columns: 5}, items: [
        {xtype: "label", text: "and continuing"},
        {xtype: "combo", id: this.id + "-until-combo", mode: "local", width: 85, triggerAction: "all", forceSelection: true, value: "forever", store: ["forever", "for", "until"], listeners: {select: {fn: function (b, c) {
            var a = Ext.getCmp(this.id + "-until-date");
            if (c.data.field1 == "until") {
                a.show();
                if (a.getValue() == "") {
                    a.setValue(this.startDate.add(Date.DAY, 5));
                    a.setMinValue(this.startDate.clone().add(Date.DAY, 1))
                }
            } else {
                a.hide()
            }
            if (c.data.field1 == "for") {
                Ext.getCmp(this.id + "-until-num").show();
                Ext.getCmp(this.id + "-until-endlabel").show()
            } else {
                Ext.getCmp(this.id + "-until-num").hide();
                Ext.getCmp(this.id + "-until-endlabel").hide()
            }
        }, scope: this}}},
        {xtype: "datefield", id: this.id + "-until-date", showToday: false, hidden: true},
        {xtype: "numberfield", id: this.id + "-until-num", value: 5, width: 35, minValue: 1, maxValue: 99, allowBlank: false, hidden: true},
        {xtype: "label", id: this.id + "-until-endlabel", text: "occurrences", hidden: true}
    ], setStartDate: function (a) {
        this.startDate = a;
        return this
    }, getValue: function () {
        var b = Ext.getCmp(this.id + "-date");
        if (b.isVisible()) {
            return";UNTIL=" + Ext.String.format(b.getValue(), this.untilDateFormat)
        }
        var a = Ext.getCmp(this.id + "-num");
        if (a.isVisible()) {
            return";COUNT=" + a.getValue()
        }
        return""
    }, setValue: function (a) {
        var c = false, b = Ext.isArray(a) ? a : a.split(";");
        Ext.each(b, function (g) {
            if (g.indexOf("COUNT") > -1) {
                var f = g.split("=")[1];
                Ext.getCmp(this.id + "-combo").setValue("for");
                Ext.getCmp(this.id + "-num").setValue(f).show();
                Ext.getCmp(this.id + "-endlabel").show()
            } else {
                if (g.indexOf("UNTIL") > -1) {
                    var e = g.split("=")[1];
                    Ext.getCmp(this.id + "-combo").setValue("until");
                    Ext.getCmp(this.id + "-date").setValue(Date.parseDate(e, this.untilDateFormat)).show();
                    Ext.getCmp(this.id + "-endlabel").hide()
                }
            }
        }, this);
        return this
    }});
    return[this.repeatEvery, this.weekly, this.monthly, this.yearly, this.until]
}});
Ext.define("Extensible.form.field.DateRangeLayout", {extend: "Ext.layout.container.Container", alias: ["layout.extensible.daterange"], onLayout: function () {
    var c = this, e = c.getShadowCt(), b = c.owner, a = b.isSingleLine();
    c.owner.suspendLayout = true;
    if (a) {
        e.getComponent("row1").add(b.startDate, b.startTime, b.toLabel, b.endTime, b.endDate, b.allDay)
    } else {
        e.getComponent("row1").add(b.startDate, b.startTime, b.toLabel);
        e.getComponent("row2").add(b.endDate, b.endTime, b.allDay)
    }
    if (!e.rendered) {
        e.render(c.getRenderTarget())
    }
    e.doComponentLayout();
    b.setHeight(e.getHeight() - 5);
    delete c.owner.suspendLayout
}, getShadowCt: function () {
    var b = this, a = [];
    if (!b.shadowCt) {
        b.shadowCt = Ext.createWidget("container", {layout: "auto", anchor: "100%", ownerCt: b.owner, items: [
            {xtype: "container", itemId: "row1", layout: "hbox", defaults: {margins: "0 5 0 0"}},
            {xtype: "container", itemId: "row2", layout: "hbox", defaults: {margins: "0 5 0 0"}}
        ]})
    }
    return b.shadowCt
}, renderItems: Ext.emptyFn});
Ext.define("Extensible.form.field.DateRange", {extend: "Ext.form.FieldContainer", alias: "widget.extensible.daterangefield", requires: ["Ext.form.field.Date", "Ext.form.field.Time", "Ext.form.Label", "Ext.form.field.Checkbox"], toText: "至", allDayText: "All day", singleLine: true, dateFormat: "n/j/Y", fieldLayout: {type: "hbox", defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}, initComponent: function () {
    var a = this;
    a.timeFormat = a.timeFormat || (Extensible.Date.use24HourTime ? "G:i" : "g:i A");
    a.addCls("ext-dt-range");
    if (a.singleLine) {
        a.layout = a.fieldLayout;
        a.items = a.getFieldConfigs()
    } else {
        a.items = [
            {xtype: "container", layout: a.fieldLayout, items: [a.getStartDateConfig(), a.getStartTimeConfig(), a.getDateSeparatorConfig()]},
            {xtype: "container", layout: a.fieldLayout, items: [a.getEndDateConfig(), a.getEndTimeConfig(), a.getAllDayConfig()]}
        ]
    }
    a.callParent(arguments);
    a.initRefs()
}, initRefs: function () {
    var a = this;
    a.startDate = a.down("#" + a.id + "-start-date");
    a.startTime = a.down("#" + a.id + "-start-time");
    a.endTime = a.down("#" + a.id + "-end-time");
    a.endDate = a.down("#" + a.id + "-end-date");
    a.allDay = a.down("#" + a.id + "-allday");
    a.toLabel = a.down("#" + a.id + "-to-label")
}, getFieldConfigs: function () {
    var a = this;
    return[a.getStartDateConfig(), a.getStartTimeConfig(), a.getDateSeparatorConfig(), a.getEndTimeConfig(), a.getEndDateConfig(), a.getAllDayConfig()]
}, getLayoutItems: function (a) {
    var b = this;
    return a ? b.items.items : [
        [b.startDate, b.startTime, b.toLabel],
        [b.endDate, b.endTime, b.allDay]
    ]
}, getStartDateConfig: function () {
    return{xtype: "datefield", id: this.id + "-start-date", format: this.dateFormat, width: 100, listeners: {change: {fn: function () {
        this.onFieldChange("date", "start")
    }, scope: this}}}
}, getStartTimeConfig: function () {
    return{xtype: "timefield", id: this.id + "-start-time", hidden: this.showTimes === false, labelWidth: 0, hideLabel: true, width: 90, format: this.timeFormat, listeners: {select: {fn: function () {
        this.onFieldChange("time", "start")
    }, scope: this}}}
}, getEndDateConfig: function () {
    return{xtype: "datefield", id: this.id + "-end-date", format: this.dateFormat, hideLabel: true, width: 100, listeners: {change: {fn: function () {
        this.onFieldChange("date", "end")
    }, scope: this}}}
}, getEndTimeConfig: function () {
    return{xtype: "timefield", id: this.id + "-end-time", hidden: this.showTimes === false, labelWidth: 0, hideLabel: true, width: 90, format: this.timeFormat, listeners: {select: {fn: function () {
        this.onFieldChange("time", "end")
    }, scope: this}}}
}, getAllDayConfig: function () {
    return{xtype: "checkbox", id: this.id + "-allday", hidden: this.showTimes === false || this.showAllDay === false, boxLabel: this.allDayText, margins: {top: 2, right: 5, bottom: 0, left: 0}, handler: this.onAllDayChange, scope: this}
}, onAllDayChange: function (a, b) {
    this.startTime.setVisible(!b);
    this.endTime.setVisible(!b)
}, getDateSeparatorConfig: function () {
    return{xtype: "label", id: this.id + "-to-label", text: this.toText, margins: {top: 4, right: 5, bottom: 0, left: 0}}
}, isSingleLine: function () {
    var c = this;
    if (c.calculatedSingleLine === undefined) {
        if (c.singleLine == "auto") {
            var e = c.ownerCt.getEl(), a = c.ownerCt.getWidth() - e.getPadding("lr"), b = e.down(".x-panel-body");
            if (b) {
                a -= b.getPadding("lr")
            }
            b = e.down(".x-form-item-label");
            if (b) {
                a -= b.getWidth() - b.getPadding("lr")
            }
            singleLine = a <= c.singleLineMinWidth ? false : true
        } else {
            c.calculatedSingleLine = c.singleLine !== undefined ? c.singleLine : true
        }
    }
    return c.calculatedSingleLine
}, onFieldChange: function (a, b) {
    this.checkDates(a, b);
    this.fireEvent("change", this, this.getValue())
}, checkDates: function (f, i) {
    var h = this, g = f === "date" ? "Date" : "Time", e = this["start" + g], b = this["end" + g], c = h.getDT("start"), a = h.getDT("end");
    if (c > a) {
        if (i == "start") {
            b.setValue(c)
        } else {
            e.setValue(a);
            h.checkDates(f, "start")
        }
    }
    if (f == "date") {
        h.checkDates("time", i)
    }
}, getValue: function () {
    return[this.getDT("start"), this.getDT("end"), this.allDay.getValue()]
}, getDT: function (e) {
    var b = this[e + "Time"].getValue(), a = this[e + "Date"].getValue();
    if (Ext.isDate(a)) {
        a = Ext.Date.format(a, this[e + "Date"].format)
    } else {
        return null
    }
    if (b && b != "") {
        b = Ext.Date.format(b, this[e + "Time"].format);
        var c = Ext.Date.parseDate(a + " " + b, this[e + "Date"].format + " " + this[e + "Time"].format);
        return c
    }
    return Ext.Date.parseDate(a, this[e + "Date"].format)
}, setValue: function (a) {
    if (!a) {
        return
    }
    var c = this, b = Extensible.calendar.data.EventMappings, e = b.StartDate.name;
    if (Ext.isArray(a)) {
        c.setDT(a[0], "start");
        c.setDT(a[1], "end");
        c.allDay.setValue(!!a[2])
    } else {
        if (Ext.isDate(a)) {
            c.setDT(a, "start");
            c.setDT(a, "end");
            c.allDay.setValue(false)
        } else {
            if (a[e]) {
                c.setDT(a[e], "start");
                if (!c.setDT(a[b.EndDate.name], "end")) {
                    c.setDT(a[e], "end")
                }
                c.allDay.setValue(!!a[b.IsAllDay.name])
            }
        }
    }
}, setDT: function (a, b) {
    if (a && Ext.isDate(a)) {
        this[b + "Date"].setValue(a);
        this[b + "Time"].setValue(Ext.Date.format(a, this[b + "Time"].format));
        return true
    }
}, isDirty: function () {
    var a = false;
    if (this.rendered && !this.disabled) {
        this.items.each(function (b) {
            if (b.isDirty()) {
                a = true;
                return false
            }
        })
    }
    return a
}, reset: function () {
    this.delegateFn("reset")
}, delegateFn: function (a) {
    this.items.each(function (b) {
        if (b[a]) {
            b[a]()
        }
    })
}, beforeDestroy: function () {
    Ext.destroy(this.fieldCt);
    this.callParent(arguments)
}, getRawValue: Ext.emptyFn, setRawValue: Ext.emptyFn});
Ext.define("Extensible.calendar.form.field.ReminderCombo", {extend: "Ext.form.field.ComboBox", alias: "widget.extensible.remindercombo", requires: ["Ext.data.ArrayStore"], fieldLabel: "Reminder", queryMode: "local", triggerAction: "all", forceSelection: true, displayField: "desc", valueField: "value", noneText: "None", atStartTimeText: "At start time", reminderValueFormat: "{0} {1} before start", minutesText: "minutes", hourText: "hour", hoursText: "hours", dayText: "day", daysText: "days", weekText: "week", weeksText: "weeks", initComponent: function () {
    this.store = this.store || Ext.create("Ext.data.ArrayStore", {fields: ["value", "desc"], idIndex: 0, data: this.getValueList()});
    this.callParent(arguments)
}, getValueList: function () {
    var c = this, a = c.reminderValueFormat, b = Ext.String.format;
    return[
        ["", c.noneText],
        ["0", c.atStartTimeText],
        ["5", b(a, "5", c.getMinutesText(5))],
        ["15", b(a, "15", c.getMinutesText(15))],
        ["30", b(a, "30", c.getMinutesText(30))],
        ["60", b(a, "1", c.getHoursText(1))],
        ["90", b(a, "1.5", c.getHoursText(1.5))],
        ["120", b(a, "2", c.getHoursText(2))],
        ["180", b(a, "3", c.getHoursText(3))],
        ["360", b(a, "6", c.getHoursText(6))],
        ["720", b(a, "12", c.getHoursText(12))],
        ["1440", b(a, "1", c.getDaysText(1))],
        ["2880", b(a, "2", c.getDaysText(2))],
        ["4320", b(a, "3", c.getDaysText(3))],
        ["5760", b(a, "4", c.getDaysText(4))],
        ["7200", b(a, "5", c.getDaysText(5))],
        ["10080", b(a, "1", c.getWeeksText(1))],
        ["20160", b(a, "2", c.getWeeksText(2))]
    ]
}, getMinutesText: function (a) {
    return a === 1 ? this.minuteText : this.minutesText
}, getHoursText: function (a) {
    return a === 1 ? this.hourText : this.hoursText
}, getDaysText: function (a) {
    return a === 1 ? this.dayText : this.daysText
}, getWeeksText: function (a) {
    return a === 1 ? this.weekText : this.weeksText
}, initValue: function () {
    if (this.value !== undefined) {
        this.setValue(this.value)
    } else {
        this.setValue("")
    }
    this.originalValue = this.getValue()
}});
Ext.define("Extensible.calendar.util.ColorPicker", {extend: "Ext.picker.Color", alias: "widget.extensible.calendarcolorpicker", requires: ["Ext.XTemplate"], colorCount: 32, constructor: function () {
    this.renderTpl = ['<tpl for="colors">', '<a href="#" class="x-cal-{.}" hidefocus="on">', '<em><span unselectable="on">&#160;</span></em>', "</a>", "</tpl>"];
    this.callParent(arguments)
}, initComponent: function () {
    this.callParent(arguments);
    this.addCls("x-calendar-palette");
    if (this.handler) {
        this.on("select", this.handler, this.scope || this, {delegate: "a"})
    }
    this.colors = [];
    for (var a = 1; a <= this.colorCount; a++) {
        this.colors.push(a)
    }
}, handleClick: function (b, a) {
    b.preventDefault();
    var c = a.className.split("x-cal-")[1];
    this.select(c)
}, select: function (g, a) {
    var c = this, f = c.selectedCls, e = c.value;
    if (!c.rendered) {
        c.value = g;
        return
    }
    if (g != e || c.allowReselect) {
        var b = c.el;
        if (c.value) {
            b.down(".x-cal-" + e).removeCls(f)
        }
        b.down(".x-cal-" + g).addCls(f);
        c.value = g;
        if (a !== true) {
            c.fireEvent("select", c, g)
        }
    }
}});
Ext.define("Extensible.calendar.gadget.CalendarListMenu", {extend: "Ext.menu.Menu", alias: "widget.extensible.calendarlistmenu", requires: ["Extensible.calendar.util.ColorPicker"], hideOnClick: true, ignoreParentClicks: true, displayOnlyThisCalendarText: "Display only this calendar", enableScrolling: false, initComponent: function () {
    this.addEvents("showcalendar", "hidecalendar", "radiocalendar", "colorchange");
    Ext.apply(this, {plain: true, items: [
        {text: this.displayOnlyThisCalendarText, iconCls: "extensible-cal-icon-cal-show", handler: Ext.bind(this.handleRadioCalendarClick, this)},
        "-",
        {xtype: "extensible.calendarcolorpicker", id: this.id + "-calendar-color-picker", handler: Ext.bind(this.handleColorSelect, this)}
    ]});
    this.addClass("x-calendar-list-menu");
    this.callParent(arguments)
}, afterRender: function () {
    this.callParent(arguments);
    this.palette = this.down("#" + this.id + "-calendar-color-picker");
    if (this.colorId) {
        this.palette.select(this.colorId, true)
    }
}, handleRadioCalendarClick: function (b, a) {
    this.fireEvent("radiocalendar", this, this.calendarId)
}, handleColorSelect: function (b, a) {
    this.fireEvent("colorchange", this, this.calendarId, a, this.colorId);
    this.colorId = a;
    this.menuHide()
}, setCalendar: function (b, a) {
    this.calendarId = b;
    this.colorId = a;
    if (this.rendered) {
        this.palette.select(a, true)
    }
    return this
}, menuHide: function () {
    if (this.hideOnClick) {
        this.hide()
    }
}});
Ext.define("Extensible.calendar.gadget.CalendarListPanel", {extend: "Ext.panel.Panel", alias: "widget.extensible.calendarlist", requires: ["Ext.XTemplate", "Extensible.calendar.gadget.CalendarListMenu"], title: "Calendars", collapsible: true, autoHeight: true, layout: "fit", menuSelector: "em", width: 100, initComponent: function () {
    this.addCls("x-calendar-list");
    this.callParent(arguments)
}, afterRender: function (b, a) {
    this.callParent(arguments);
    if (this.store) {
        this.setStore(this.store, true)
    }
    this.refresh();
    this.body.on("click", this.onClick, this);
    this.body.on("mouseover", this.onMouseOver, this, {delegate: "li"});
    this.body.on("mouseout", this.onMouseOut, this, {delegate: "li"})
}, getListTemplate: function () {
    if (!this.tpl) {
        this.tpl = !(Ext.isIE || Ext.isOpera) ? Ext.create("Ext.XTemplate", '<ul class="x-unselectable"><tpl for=".">', '<li id="{cmpId}" class="ext-cal-evr {colorCls} {hiddenCls}">{title}<em>&#160;</em></li>', "</tpl></ul>") : Ext.create("Ext.XTemplate", '<ul class="x-unselectable"><tpl for=".">', '<li id="{cmpId}" class="ext-cal-evo {colorCls} {hiddenCls}">', '<div class="ext-cal-evm">', '<div class="ext-cal-evi">{title}<em>&#160;</em></div>', "</div>", "</li>", "</tpl></ul>");
        this.tpl.compile()
    }
    return this.tpl
}, setStore: function (a, b) {
    if (!b && this.store) {
        this.store.un("load", this.refresh, this);
        this.store.un("add", this.refresh, this);
        this.store.un("remove", this.refresh, this);
        this.store.un("update", this.onUpdate, this);
        this.store.un("clear", this.refresh, this)
    }
    if (a) {
        a.on("load", this.refresh, this);
        a.on("add", this.refresh, this);
        a.on("remove", this.refresh, this);
        a.on("update", this.onUpdate, this);
        a.on("clear", this.refresh, this)
    }
    this.store = a
}, onUpdate: function (b, c, a) {
    if (a == Ext.data.Record.COMMIT) {
        this.refresh()
    }
}, refresh: function () {
    if (this.skipRefresh) {
        return
    }
    var f = [], c = 0, g = null, b = Extensible.calendar.data.CalendarMappings, e = this.store.getRange(), a = e.length;
    for (; c < a; c++) {
        g = {cmpId: this.id + "__" + e[c].data[b.CalendarId.name], title: e[c].data[b.Title.name], colorCls: this.getColorCls(e[c].data[b.ColorId.name])};
        if (e[c].data[b.IsHidden.name] === true) {
            g.hiddenCls = "ext-cal-hidden"
        }
        f[f.length] = g
    }
    this.getListTemplate().overwrite(this.body, f)
}, getColorCls: function (a) {
    return"x-cal-" + a + "-ad"
}, toggleCalendar: function (c, b) {
    var a = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, c);
    CM = Extensible.calendar.data.CalendarMappings, isHidden = a.data[CM.IsHidden.name];
    a.set(CM.IsHidden.name, !isHidden);
    if (b !== false) {
        a.commit()
    }
}, showCalendar: function (c, b) {
    var a = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, c);
    if (a.data[Extensible.calendar.data.CalendarMappings.IsHidden.name] === true) {
        this.toggleCalendar(c, b)
    }
}, hideCalendar: function (c, b) {
    var a = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, c);
    if (a.data[Extensible.calendar.data.CalendarMappings.IsHidden.name] !== true) {
        this.toggleCalendar(c, b)
    }
}, radioCalendar: function (g) {
    var b = 0, f, c = Extensible.calendar.data.CalendarMappings.CalendarId.name, e = this.store.getRange(), a = e.length;
    for (; b < a; b++) {
        f = e[b].data[c];
        if (f == g) {
            this.showCalendar(f, false)
        } else {
            this.hideCalendar(f, false)
        }
    }
    this.skipRefresh = true;
    this.store.sync();
    delete this.skipRefresh;
    this.refresh()
}, onMouseOver: function (b, a) {
    Ext.fly(a).addCls("hover")
}, onMouseOut: function (b, a) {
    Ext.fly(a).removeCls("hover")
}, getCalendarId: function (a) {
    return a.id.split("__")[1]
}, getCalendarItemEl: function (a) {
    return Ext.get(this.id + "__" + a)
}, onClick: function (c, a) {
    var b;
    if (b = c.getTarget(this.menuSelector, 3, true)) {
        this.showEventMenu(b, c.getXY())
    } else {
        if (b = c.getTarget("li", 3, true)) {
            this.toggleCalendar(this.getCalendarId(b))
        }
    }
}, handleColorChange: function (e, f, c, a) {
    var b = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, f);
    b.data[Extensible.calendar.data.CalendarMappings.ColorId.name] = c;
    b.commit()
}, handleRadioCalendar: function (a, b) {
    this.radioCalendar(b)
}, showEventMenu: function (a, b) {
    var e = this.getCalendarId(a.parent("li")), c = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, e);
    colorId = c.data[Extensible.calendar.data.CalendarMappings.ColorId.name];
    if (!this.menu) {
        this.menu = Ext.create("Extensible.calendar.gadget.CalendarListMenu");
        this.menu.on("colorchange", this.handleColorChange, this);
        this.menu.on("radiocalendar", this.handleRadioCalendar, this)
    }
    this.menu.setCalendar(e, colorId);
    this.menu.showAt(b)
}});
Ext.define("Extensible.calendar.menu.Event", {extend: "Ext.menu.Menu", alias: "widget.extensible.eventcontextmenu", requires: ["Ext.menu.DatePicker"], hideOnClick: true, ignoreParentClicks: true, editDetailsText: "编辑详情", deleteText: "删除", moveToText: "移动至...", enableScrolling: false, initComponent: function () {
    this.addEvents("editdetails", "eventdelete", "eventmove");
    this.buildMenu();
    this.callParent(arguments)
}, buildMenu: function () {
    if (this.rendered) {
        return
    }
    this.dateMenu = Ext.create("Ext.menu.DatePicker", {scope: this, handler: function (b, a) {
        a = Extensible.Date.copyTime(this.rec.data[Extensible.calendar.data.EventMappings.StartDate.name], a);
        this.fireEvent("eventmove", this, this.rec, a)
    }});
    Ext.apply(this, {items: [
        {text: this.editDetailsText, iconCls: "extensible-cal-icon-evt-edit", scope: this, handler: function () {
            this.fireEvent("editdetails", this, this.rec, this.ctxEl)
        }},
        {text: this.deleteText, iconCls: "extensible-cal-icon-evt-del", scope: this, handler: function () {
            this.fireEvent("eventdelete", this, this.rec, this.ctxEl)
        }},
        "-",
        {text: this.moveToText, iconCls: "extensible-cal-icon-evt-move", menu: this.dateMenu}
    ]})
}, showForEvent: function (c, a, b) {
    this.rec = c;
    this.ctxEl = a;
    this.dateMenu.picker.setValue(c.data[Extensible.calendar.data.EventMappings.StartDate.name]);
    this.showAt(b)
}, onHide: function () {
    this.callParent(arguments);
    delete this.ctxEl
}});
Ext.define("Extensible.calendar.form.EventDetails", {extend: "Ext.form.Panel", alias: "widget.extensible.eventeditform", requires: ["Extensible.form.field.DateRange", "Extensible.calendar.form.field.ReminderCombo", "Extensible.calendar.data.EventMappings", "Extensible.calendar.form.field.CalendarCombo", "Extensible.form.recurrence.Combo", "Ext.layout.container.Column"], labelWidth: 65, labelWidthRightCol: 65, colWidthLeft: 0.6, colWidthRight: 0.4, title: "事件表单", titleTextAdd: "添加事件", titleTextEdit: "编辑事件", titleLabelText: "标题", datesLabelText: "提醒时段", reminderLabelText: "Reminder", notesLabelText: "备注", locationLabelText: "区域", webLinkLabelText: "URL", calendarLabelText: "日历", repeatsLabelText: "重复", saveButtonText: "保存", deleteButtonText: "删除", cancelButtonText: "取消", bodyStyle: "padding:20px 20px 10px;", border: false, buttonAlign: "center", autoHeight: true, enableRecurrence: false, layout: "column", initComponent: function () {
    this.addEvents({eventadd: true, eventupdate: true, eventdelete: true, eventcancel: true});
    this.titleField = Ext.create("Ext.form.field.Text", {fieldLabel: this.titleLabelText, name: Extensible.calendar.data.EventMappings.Title.name, anchor: "90%"});
    this.dateRangeField = Ext.create("Extensible.form.field.DateRange", {fieldLabel: this.datesLabelText, singleLine: false, anchor: "90%", listeners: {change: Ext.bind(this.onDateChange, this)}});
    this.reminderField = Ext.create("Extensible.calendar.form.field.ReminderCombo", {name: Extensible.calendar.data.EventMappings.Reminder.name, fieldLabel: this.reminderLabelText, anchor: "70%"});
    this.notesField = Ext.create("Ext.form.field.TextArea", {fieldLabel: this.notesLabelText, name: Extensible.calendar.data.EventMappings.Notes.name, grow: true, growMax: 150, anchor: "100%"});
    this.locationField = Ext.create("Ext.form.field.Text", {fieldLabel: this.locationLabelText, name: Extensible.calendar.data.EventMappings.Location.name, anchor: "100%"});
    this.urlField = Ext.create("Ext.form.field.Text", {fieldLabel: this.webLinkLabelText, name: Extensible.calendar.data.EventMappings.Url.name, anchor: "100%"});
    var a = [this.titleField, this.dateRangeField, this.reminderField], b = [this.notesField, this.locationField, this.urlField];
    if (this.enableRecurrence) {
        this.recurrenceField = Ext.create("Extensible.form.recurrence.Fieldset", {name: Extensible.calendar.data.EventMappings.RRule.name, fieldLabel: this.repeatsLabelText, anchor: "90%"});
        a.splice(2, 0, this.recurrenceField)
    }
    if (this.calendarStore) {
        this.calendarField = Ext.create("Extensible.calendar.form.field.CalendarCombo", {store: this.calendarStore, fieldLabel: this.calendarLabelText, name: Extensible.calendar.data.EventMappings.CalendarId.name, anchor: "70%"});
        a.splice(2, 0, this.calendarField)
    }
    this.items = [
        {id: this.id + "-left-col", columnWidth: this.colWidthLeft, layout: "anchor", fieldDefaults: {labelWidth: this.labelWidth}, border: false, items: a},
        {id: this.id + "-right-col", columnWidth: this.colWidthRight, layout: "anchor", fieldDefaults: {labelWidth: this.labelWidthRightCol || this.labelWidth}, border: false, items: b}
    ];
    this.fbar = [
        {text: this.saveButtonText, scope: this, handler: this.onSave,iconCls:ipe.sty.save},
        {itemId: this.id + "-del-btn", text: this.deleteButtonText, scope: this, handler: this.onDelete},
        {text: this.cancelButtonText, scope: this, handler: this.onCancel,iconCls:ipe.sty.cancel}
    ];
    this.addCls("ext-evt-edit-form");
    this.callParent(arguments)
}, onDateChange: function (a, b) {
    if (this.recurrenceField) {
        this.recurrenceField.setStartDate(b[0])
    }
}, loadRecord: function (a) {
    this.form.reset().loadRecord.apply(this.form, arguments);
    this.activeRecord = a;
    this.dateRangeField.setValue(a.data);
    if (this.recurrenceField) {
        this.recurrenceField.setStartDate(a.data[Extensible.calendar.data.EventMappings.StartDate.name])
    }
    if (this.calendarStore) {
        this.form.setValues({calendar: a.data[Extensible.calendar.data.EventMappings.CalendarId.name]})
    }
    if (a.phantom) {
        this.setTitle(this.titleTextAdd);
        this.down("#" + this.id + "-del-btn").hide()
    } else {
        this.setTitle(this.titleTextEdit);
        this.down("#" + this.id + "-del-btn").show()
    }
    this.titleField.focus()
}, updateRecord: function () {
    var c = this.dateRangeField.getValue(), f = Extensible.calendar.data.EventMappings, e = this.activeRecord, a = e.fields, b = false;
    e.beginEdit();
    a.each(function (h) {
        var i = this.form.findField(h.name);
        if (i) {
            var g = i.getValue();
            if (g.getGroupValue) {
                g = g.getGroupValue()
            } else {
                if (i.eachItem) {
                    g = [];
                    i.eachItem(function (k) {
                        g.push(k.getValue())
                    })
                }
            }
            e.set(h.name, g)
        }
    }, this);
    e.set(f.StartDate.name, c[0]);
    e.set(f.EndDate.name, c[1]);
    e.set(f.IsAllDay.name, c[2]);
    b = e.dirty;
    e.endEdit();
    return b
}, onCancel: function () {
    this.cleanup(true);
    this.fireEvent("eventcancel", this, this.activeRecord)
}, cleanup: function (a) {
    if (this.activeRecord) {
        this.activeRecord.reject()
    }
    delete this.activeRecord;
    if (this.form.isDirty()) {
        this.form.reset()
    }
}, onSave: function () {
    if (!this.form.isValid()) {
        return
    }
    if (!this.updateRecord()) {
        this.onCancel();
        return
    }
    this.fireEvent(this.activeRecord.phantom ? "eventadd" : "eventupdate", this, this.activeRecord)
}, onDelete: function () {
    this.fireEvent("eventdelete", this, this.activeRecord)
}});
Ext.define("Extensible.calendar.form.EventWindow", {extend: "Ext.window.Window", alias: "widget.extensible.eventeditwindow", requires: ["Ext.form.Panel", "Extensible.calendar.data.EventModel", "Extensible.calendar.data.EventMappings"], titleTextAdd: "添加事件", titleTextEdit: "编辑事件", width: 600, labelWidth: 65, detailsLinkText: "编辑详情...", savingMessage: "保存...", deletingMessage: "删除...", saveButtonText: "保存", deleteButtonText: "删除", cancelButtonText: "取消", titleLabelText: "标题", datesLabelText: "提醒时段", calendarLabelText: "日历", closeAction: "hide", modal: false, resizable: false, constrain: true, buttonAlign: "left", editDetailsLinkClass: "edit-dtl-link", enableEditDetails: true, layout: "fit", formPanelConfig: {border: false}, initComponent: function () {
    this.addEvents({eventadd: true, eventupdate: true, eventdelete: true, eventcancel: true, editdetails: true});
    this.fbar = this.getFooterBarConfig();
    this.callParent(arguments)
}, getFooterBarConfig: function () {
    var a = ["->", {text: this.saveButtonText, itemId: this.id + "-save-btn", disabled: false, handler: this.onSave, scope: this,iconCls:ipe.sty.save}, {text: this.deleteButtonText, itemId: this.id + "-delete-btn", disabled: false, handler: this.onDelete, scope: this, hideMode: "offsets",iconCls:ipe.sty.del}, {text: this.cancelButtonText, itemId: this.id + "-cancel-btn", disabled: false, handler: this.onCancel, scope: this,iconCls:ipe.sty.cancel}];
    if (this.enableEditDetails !== false) {
        a.unshift({xtype: "tbtext", itemId: this.id + "-details-btn", text: '<a href="#" class="' + this.editDetailsLinkClass + '">' + this.detailsLinkText + "</a>"})
    }else{
        a.unshift({xtype:'hidden'});//保持按钮居右
    }
    return a
}, onRender: function (b, a) {
    this.formPanel = Ext.create("Ext.form.Panel", Ext.applyIf({fieldDefaults: {labelWidth: this.labelWidth}, items: this.getFormItemConfigs()}, this.formPanelConfig));
    this.add(this.formPanel);
    this.callParent(arguments)
}, getFormItemConfigs: function () {
    var a = [
        {xtype: "textfield", itemId: this.id + "-title", name: Extensible.calendar.data.EventMappings.Title.name, fieldLabel: this.titleLabelText, anchor: "100%"},
        {xtype: "extensible.daterangefield", itemId: this.id + "-dates", name: "dates", anchor: "95%", singleLine: true, fieldLabel: this.datesLabelText}
    ];
    if (this.calendarStore) {
        a.push({xtype: "extensible.calendarcombo", itemId: this.id + "-calendar", name: Extensible.calendar.data.EventMappings.CalendarId.name, anchor: "100%", fieldLabel: this.calendarLabelText, store: this.calendarStore})
    }
    return a
}, afterRender: function () {
    this.callParent(arguments);
    this.el.addCls("ext-cal-event-win");
    this.initRefs();
    var a = this.getDockedItems("toolbar")[0].items.items[0];
    if (a.el.hasCls("x-component-default")) {
        Ext.destroy(a)
    }
}, initRefs: function () {
    this.saveButton = this.down("#" + this.id + "-save-btn");
    this.deleteButton = this.down("#" + this.id + "-delete-btn");
    this.cancelButton = this.down("#" + this.id + "-cancel-btn");
    this.detailsButton = this.down("#" + this.id + "-details-btn");
    if (this.detailsButton) {
        this.detailsButton.getEl().on("click", this.onEditDetailsClick, this)
    }
    this.titleField = this.down("#" + this.id + "-title");
    this.dateRangeField = this.down("#" + this.id + "-dates");
    this.calendarField = this.down("#" + this.id + "-calendar")
}, onEditDetailsClick: function (a) {
    a.stopEvent();
    this.updateRecord(this.activeRecord, true);
    this.fireEvent("editdetails", this, this.activeRecord, this.animateTarget)
}, show: function (g, e) {
    this.animateTarget = (Ext.isIE8 && Ext.isStrict) ? null : e, M = Extensible.calendar.data.EventMappings;
    this.callParent([this.animateTarget, function () {
        this.titleField.focus(false, 100)
    }, this]);
    this.deleteButton[g.data && g.data[M.EventId.name] ? "show" : "hide"]();
    var c, b = this.formPanel.form;
    if (g.data) {
        c = g;
        if (c.phantom) {
            this.setTitle(this.titleTextAdd)
        } else {
            this.setTitle(this.titleTextEdit)
        }
        b.loadRecord(c)
    } else {
        this.setTitle(this.titleTextAdd);
        var h = g[M.StartDate.name], a = g[M.EndDate.name] || Extensible.Date.add(h, {hours: 1});
        c = Ext.create("Extensible.calendar.data.EventModel");
        c.data[M.StartDate.name] = h;
        c.data[M.EndDate.name] = a;
        c.data[M.IsAllDay.name] = !!g[M.IsAllDay.name] || h.getDate() != Extensible.Date.add(a, {millis: 1}).getDate();
        b.reset();
        b.loadRecord(c)
    }
    if (this.calendarStore) {
        this.calendarField.setValue(c.data[M.CalendarId.name])
    }
    this.dateRangeField.setValue(c.data);
    this.activeRecord = c;
    return this
}, roundTime: function (b, c) {
    c = c || 15;
    var a = parseInt(b.getMinutes());
    return b.add("mi", c - (a % c))
}, onCancel: function () {
    this.cleanup(true);
    this.fireEvent("eventcancel", this, this.activeRecord, this.animateTarget)
}, cleanup: function (a) {
    if (this.activeRecord) {
        this.activeRecord.reject()
    }
    delete this.activeRecord;
    if (a === true) {
        this.hide()
    }
}, updateRecord: function (b, f) {
    var a = b.fields, c = this.formPanel.getForm().getValues(), e, i = Extensible.calendar.data.EventMappings, h = {};
    a.each(function (k) {
        e = k.name;
        if (e in c) {
            h[e] = c[e]
        }
    });
    var g = this.dateRangeField.getValue();
    h[i.StartDate.name] = g[0];
    h[i.EndDate.name] = g[1];
    h[i.IsAllDay.name] = g[2];
    b.beginEdit();
    b.set(h);
    if (!f) {
        b.endEdit()
    }
    return this
}, onSave: function () {
    if (!this.formPanel.form.isValid()) {
        return
    }
    if (!this.updateRecord(this.activeRecord)) {
        this.onCancel();
        return
    }
    this.fireEvent(this.activeRecord.phantom ? "eventadd" : "eventupdate", this, this.activeRecord, this.animateTarget)
}, onDelete: function () {
    this.fireEvent("eventdelete", this, this.activeRecord, this.animateTarget)
}});
Ext.define("Extensible.calendar.view.AbstractCalendar", {extend: "Ext.Component", requires: ["Ext.dom.CompositeElement"], requires: ["Extensible.calendar.form.EventDetails", "Extensible.calendar.form.EventWindow", "Extensible.calendar.menu.Event", "Extensible.calendar.dd.DragZone", "Extensible.calendar.dd.DropZone"], startDay: 0, spansHavePriority: false, trackMouseOver: true, enableFx: true, enableAddFx: true, enableUpdateFx: false, enableRemoveFx: true, enableDD: true, enableContextMenus: true, suppressBrowserContextMenu: false, monitorResize: true, todayText: "今天", ddCreateEventText: "创建事件{0}", ddMoveEventText: "移动至{0}", ddResizeEventText: "编辑事件{0}", defaultEventTitleText: "(空标题)", dateParamStart: "startDate", dateParamEnd: "endDate", dateParamFormat: "Y-m-d", editModal: false, enableEditDetails: true, weekendCls: "ext-cal-day-we", prevMonthCls: "ext-cal-day-prev", nextMonthCls: "ext-cal-day-next", todayCls: "ext-cal-day-today", hideMode: "offsets", weekCount: 1, dayCount: 1, eventSelector: ".ext-cal-evt", eventOverClass: "ext-evt-over", eventElIdDelimiter: "-evt-", dayElIdDelimiter: "-day-", getEventBodyMarkup: Ext.emptyFn, getEventTemplate: Ext.emptyFn, initComponent: function () {
    this.setStartDate(this.startDate || new Date());
    this.callParent(arguments);
    if (this.readOnly === true) {
        this.addCls("ext-cal-readonly")
    }
    this.addEvents({eventsrendered: true, eventclick: true, eventover: true, eventout: true, beforedatechange: true, datechange: true, rangeselect: true, beforeeventmove: true, eventmove: true, initdrag: true, dayover: true, dayout: true, editdetails: true, eventadd: true, eventupdate: true, eventcancel: true, beforeeventdelete: true, eventdelete: true})
}, afterRender: function () {
    this.callParent(arguments);
    this.renderTemplate();
    if (this.store) {
        this.setStore(this.store, true);
        if (this.store.deferLoad) {
            this.reloadStore(this.store.deferLoad);
            delete this.store.deferLoad
        } else {
            this.store.initialParams = this.getStoreParams()
        }
    }
    if (this.calendarStore) {
        this.setCalendarStore(this.calendarStore, true)
    }
    this.on("resize", this.onResize, this);
    this.el.on({mouseover: this.onMouseOver, mouseout: this.onMouseOut, click: this.onClick, scope: this});
    if (this.enableContextMenus && this.readOnly !== true) {
        this.el.on("contextmenu", this.onContextMenu, this)
    }
    this.el.unselectable();
    if (this.enableDD && this.readOnly !== true && this.initDD) {
        this.initDD()
    }
    this.on("eventsrendered", this.onEventsRendered);
    Ext.defer(this.forceSize, 100, this)
}, getStoreDateParams: function () {
    var a = {};
    a[this.dateParamStart] = Ext.Date.format(this.viewStart, this.dateParamFormat);
    a[this.dateParamEnd] = Ext.Date.format(this.viewEnd, this.dateParamFormat);
    return a
}, getStoreParams: function () {
    var a = this.getStoreDateParams();
    return a
}, reloadStore: function (a) {
    Extensible.log("reloadStore");
    a = Ext.isObject(a) ? a : {};
    a.params = a.params || {};
    Ext.apply(a.params, this.getStoreParams());
    this.store.load(a)
}, onEventsRendered: function () {
    this.forceSize()
}, forceSize: function () {
    if (this.el && this.el.down) {
        var e = this.el.down(".ext-cal-hd-ct"), b = this.el.down(".ext-cal-body-ct");
        if (b == null || e == null) {
            return
        }
        var a = e.getHeight(), c = this.el.parent().getSize();
        b.setHeight(c.height - a)
    }
}, refresh: function (a) {
    Extensible.log("refresh (base), reload = " + a);
    if (a === true) {
        this.reloadStore()
    }
    this.prepareData();
    this.renderTemplate();
    this.renderItems()
}, getWeekCount: function () {
    var a = Extensible.Date.diffDays(this.viewStart, this.viewEnd);
    return Math.ceil(a / this.dayCount)
}, prepareData: function () {
    var h = Ext.Date.getLastDateOfMonth(this.startDate), c = 0, g = 0, f = Ext.Date.clone(this.viewStart), e = this.weekCount < 1 ? 6 : this.weekCount;
    this.eventGrid = [
        []
    ];
    this.allDayGrid = [
        []
    ];
    this.evtMaxCount = [];
    var b = this.store.queryBy(function (i) {
        return this.isEventVisible(i.data)
    }, this);
    for (; c < e; c++) {
        this.evtMaxCount[c] = 0;
        if (this.weekCount == -1 && f > h) {
            break
        }
        this.eventGrid[c] = this.eventGrid[c] || [];
        this.allDayGrid[c] = this.allDayGrid[c] || [];
        for (d = 0; d < this.dayCount; d++) {
            if (b.getCount() > 0) {
                var a = b.filterBy(function (m) {
                    var k = Ext.Date.clearTime(m.data[Extensible.calendar.data.EventMappings.StartDate.name], true), l = f.getTime() == k.getTime(), i = (c == 0 && d == 0 && (f > m.data[Extensible.calendar.data.EventMappings.StartDate.name]));
                    return l || i
                }, this);
                this.sortEventRecordsForDay(a);
                this.prepareEventGrid(a, c, d)
            }
            f = Extensible.Date.add(f, {days: 1})
        }
    }
    this.currentWeekCount = c
}, prepareEventGrid: function (c, b, i) {
    var g = this, h = 0, f = Ext.Date.clone(g.viewStart), a = g.maxEventsPerDay || 999, e;
    c.each(function (l) {
        var m = Extensible.calendar.data.EventMappings;
        if (Extensible.Date.diffDays(l.data[m.StartDate.name], l.data[m.EndDate.name]) > 0) {
            var k = Extensible.Date.diffDays(Extensible.Date.max(g.viewStart, l.data[m.StartDate.name]), Extensible.Date.min(g.viewEnd, l.data[m.EndDate.name])) + 1;
            g.prepareEventGridSpans(l, g.eventGrid, b, i, k);
            g.prepareEventGridSpans(l, g.allDayGrid, b, i, k, true)
        } else {
            h = g.findEmptyRowIndex(b, i);
            g.eventGrid[b][i] = g.eventGrid[b][i] || [];
            g.eventGrid[b][i][h] = l;
            if (l.data[m.IsAllDay.name]) {
                h = g.findEmptyRowIndex(b, i, true);
                g.allDayGrid[b][i] = g.allDayGrid[b][i] || [];
                g.allDayGrid[b][i][h] = l
            }
        }
        e = g[g.isHeaderView ? "allDayGrid" : "eventGrid"][b][i] || [];
        if (e.length && g.evtMaxCount[b] < e.length) {
            g.evtMaxCount[b] = Math.min(a + 1, e.length)
        }
        return true
    }, g)
}, prepareEventGridSpans: function (i, a, h, g, k, l) {
    var f = h, b = g, m = this.findEmptyRowIndex(h, g, l), e = Ext.Date.clone(this.viewStart);
    var c = {event: i, isSpan: true, isSpanStart: true, spanLeft: false, spanRight: (g == 6)};
    a[h][g] = a[h][g] || [];
    a[h][g][m] = c;
    while (--k) {
        e = Extensible.Date.add(e, {days: 1});
        if (e > this.viewEnd) {
            break
        }
        if (++b > 6) {
            b = 0;
            f++;
            m = this.findEmptyRowIndex(f, 0)
        }
        a[f] = a[f] || [];
        a[f][b] = a[f][b] || [];
        a[f][b][m] = {event: i, isSpan: true, isSpanStart: (b == 0), spanLeft: (f > h) && (b % 7 == 0), spanRight: (b == 6) && (k > 1)}
    }
}, findEmptyRowIndex: function (b, h, a) {
    var f = a ? this.allDayGrid : this.eventGrid, c = f[b] ? f[b][h] || [] : [], e = 0, g = c.length;
    for (; e < g; e++) {
        if (c[e] == null) {
            return e
        }
    }
    return g
}, renderTemplate: function () {
    if (this.tpl) {
        this.tpl.overwrite(this.el, this.getTemplateParams());
        this.lastRenderStart = Ext.Date.clone(this.viewStart);
        this.lastRenderEnd = Ext.Date.clone(this.viewEnd)
    }
}, getTemplateParams: function () {
    return{viewStart: this.viewStart, viewEnd: this.viewEnd, startDate: this.startDate, dayCount: this.dayCount, weekCount: this.weekCount, weekendCls: this.weekendCls, prevMonthCls: this.prevMonthCls, nextMonthCls: this.nextMonthCls, todayCls: this.todayCls}
}, disableStoreEvents: function () {
    this.monitorStoreEvents = false;
    return this
}, enableStoreEvents: function (a) {
    this.monitorStoreEvents = true;
    if (a === true) {
        this.refresh()
    }
    return this
}, onResize: function () {
    this.refresh(false)
}, onInitDrag: function () {
    this.fireEvent("initdrag", this)
}, onEventDrop: function (b, a) {
    this.moveEvent(b, a)
}, onCalendarEndDrag: function (e, a, c) {
    this.dragPending = true;
    var b = {}, c = Ext.bind(this.onCalendarEndDragComplete, this, [c]);
    b[Extensible.calendar.data.EventMappings.StartDate.name] = e;
    b[Extensible.calendar.data.EventMappings.EndDate.name] = a;
    if (this.fireEvent("rangeselect", this, b, c) !== false) {
        this.showEventEditor(b, null);
        if (this.editWin) {
            this.editWin.on("hide", c, this, {single: true})
        } else {
            c()
        }
    } else {
        this.onCalendarEndDragComplete(c)
    }
}, onCalendarEndDragComplete: function (a) {
    a();
    this.dragPending = false
}, onUpdate: function (b, c, a) {
    if (this.hidden === true || this.monitorStoreEvents === false) {
        return
    }
    if (a == Ext.data.Record.COMMIT) {
        Extensible.log("onUpdate");
        this.dismissEventEditor();
        var e = c.data[Extensible.calendar.data.EventMappings.RRule.name];
        this.refresh(e !== undefined && e !== "");
        if (this.enableFx && this.enableUpdateFx) {
            this.doUpdateFx(this.getEventEls(c.data[Extensible.calendar.data.EventMappings.EventId.name]), {scope: this})
        }
    }
}, doUpdateFx: function (a, b) {
    this.highlightEvent(a, null, b)
}, onAdd: function (c, b, a) {
    var e = Ext.isArray(b) ? b[0] : b;
    if (this.hidden === true || this.monitorStoreEvents === false) {
        return
    }
    if (e._deleting) {
        delete e._deleting;
        return
    }
    Extensible.log("onAdd");
    var f = e.data[Extensible.calendar.data.EventMappings.RRule.name];
    this.dismissEventEditor();
    this.tempEventId = e.id;
    this.refresh(f !== undefined && f !== "");
    if (this.enableFx && this.enableAddFx) {
        this.doAddFx(this.getEventEls(e.data[Extensible.calendar.data.EventMappings.EventId.name]), {scope: this})
    }
}, doAddFx: function (a, b) {
    a.fadeIn(Ext.apply(b, {duration: 2000}))
}, onRemove: function (b, c) {
    if (this.hidden === true || this.monitorStoreEvents === false) {
        return
    }
    Extensible.log("onRemove");
    this.dismissEventEditor();
    var e = c.data[Extensible.calendar.data.EventMappings.RRule.name], a = e !== undefined && e !== "";
    if (this.enableFx && this.enableRemoveFx) {
        this.doRemoveFx(this.getEventEls(c.data[Extensible.calendar.data.EventMappings.EventId.name]), {remove: true, scope: this, callback: Ext.bind(this.refresh, this, [a])})
    } else {
        this.getEventEls(c.data[Extensible.calendar.data.EventMappings.EventId.name]).remove();
        this.refresh(a)
    }
}, doRemoveFx: function (a, b) {
    if (a.getCount() == 0 && Ext.isFunction(b.callback)) {
        b.callback.call(b.scope || this)
    } else {
        a.fadeOut(b)
    }
}, highlightEvent: function (b, a, e) {
    if (this.enableFx) {
        var f;
        !(Ext.isIE || Ext.isOpera) ? b.highlight(a, e) : b.each(function (c) {
            c.highlight(a, Ext.applyIf({attr: "color"}, e));
            if (f = c.down(".ext-cal-evm")) {
                f.highlight(a, e)
            }
        }, this)
    }
}, getEventIdFromEl: function (c) {
    c = Ext.get(c);
    var e, f = "", a, b = c.dom.className.split(" ");
    Ext.each(b, function (g) {
        e = g.split(this.eventElIdDelimiter);
        if (e.length > 1) {
            f = e[1];
            return false
        }
    }, this);
    return f
}, getEventId: function (a) {
    if (a === undefined && this.tempEventId) {
        a = this.tempEventId
    }
    return a
}, getEventSelectorCls: function (b, a) {
    var c = a ? "." : "";
    return c + this.id + this.eventElIdDelimiter + this.getEventId(b)
}, getEventEls: function (b) {
    var a = this.el.select(this.getEventSelectorCls(this.getEventId(b), true), false);
    return Ext.create("Ext.CompositeElement", a)
}, isToday: function () {
    var a = Ext.Date.clearTime(new Date()).getTime();
    return this.viewStart.getTime() <= a && this.viewEnd.getTime() >= a
}, onDataChanged: function (a) {
    Extensible.log("onDataChanged");
    this.refresh(false)
}, isEventVisible: function (c) {
    var i = Extensible.calendar.data.EventMappings, f = c.data || c, b = this.calendarStore ? this.calendarStore.findRecord(i.CalendarId.name, c[i.CalendarId.name]) : null;
    if (b && b.data[Extensible.calendar.data.CalendarMappings.IsHidden.name] === true) {
        return false
    }
    var h = this.viewStart.getTime(), a = this.viewEnd.getTime(), g = f[i.StartDate.name].getTime(), e = f[i.EndDate.name].getTime();
    return Extensible.Date.rangesOverlap(h, a, g, e)
}, isOverlapping: function (m, l) {
    var k = m.data ? m.data : m, i = l.data ? l.data : l, f = Extensible.calendar.data.EventMappings, c = k[f.StartDate.name].getTime(), g = Extensible.Date.add(k[f.EndDate.name], {seconds: -1}).getTime(), b = i[f.StartDate.name].getTime(), e = Extensible.Date.add(i[f.EndDate.name], {seconds: -1}).getTime(), h = Extensible.Date.diff(k[f.StartDate.name], i[f.StartDate.name], "m");
    if (g < c) {
        g = c
    }
    if (e < b) {
        e = b
    }
    var o = Extensible.Date.rangesOverlap(c, g, b, e), n = this.minEventDisplayMinutes || 0, a = n > 0 && (h > -n && h < n);
    return(o || a)
}, isEventSpanning: function (a) {
    var e = Extensible.calendar.data.EventMappings, b = a.data || a, c;
    c = Extensible.Date.diffDays(b[e.StartDate.name], b[e.EndDate.name]);
    return c > 0
}, getDayEl: function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId: function (a) {
    if (Ext.isDate(a)) {
        a = Ext.Date.format(a, "Ymd")
    }
    return this.id + this.dayElIdDelimiter + a
}, getStartDate: function () {
    return this.startDate
}, setStartDate: function (i, g) {
    var f = this;
    Extensible.log("setStartDate (base) " + Ext.Date.format(i, "Y-m-d"));
    var c = Ext.Date.clone, b = f.startDate ? c(f.startDate) : null, e = c(i), a = f.viewStart ? c(f.viewStart) : null, h = f.viewEnd ? c(f.viewEnd) : null;
    if (f.fireEvent("beforedatechange", f, b, e, a, h) !== false) {
        f.startDate = Ext.Date.clearTime(i);
        f.setViewBounds(i);
        if (f.ownerCalendarPanel && f.ownerCalendarPanel.startDate !== f.startDate) {
            f.ownerCalendarPanel.startDate = f.startDate
        }
        if (f.rendered) {
            f.refresh(g)
        }
        f.fireEvent("datechange", f, c(f.startDate), c(f.viewStart), c(f.viewEnd))
    }
}, setViewBounds: function (a) {
    var c = this, g = a || c.startDate, f = g.getDay() - c.startDay, e = Extensible.Date;
    if (f < 0) {
        f += 7
    }
    switch (this.weekCount) {
        case 0:
        case 1:
            c.viewStart = c.dayCount < 7 && !c.startDayIsStatic ? g : e.add(g, {days: -f, clearTime: true});
            c.viewEnd = e.add(c.viewStart, {days: c.dayCount || 7, seconds: -1});
            return;
        case -1:
            g = Ext.Date.getFirstDateOfMonth(g);
            f = g.getDay() - c.startDay;
            if (f < 0) {
                f += 7
            }
            c.viewStart = e.add(g, {days: -f, clearTime: true});
            var b = e.add(g, {months: 1, seconds: -1});
            f = c.startDay;
            if (f > b.getDay()) {
                f -= 7
            }
            c.viewEnd = e.add(b, {days: 6 - b.getDay() + f});
            return;
        default:
            c.viewStart = e.add(g, {days: -f, clearTime: true});
            c.viewEnd = e.add(c.viewStart, {days: c.weekCount * 7, seconds: -1})
    }
}, getViewBounds: function () {
    return{start: this.viewStart, end: this.viewEnd}
}, sortEventRecordsForDay: function (a) {
    if (a.length < 2) {
        return
    }
    a.sortBy(Ext.bind(function (g, f) {
        var e = g.data, c = f.data, i = Extensible.calendar.data.EventMappings;
        if (e[i.IsAllDay.name]) {
            return -1
        } else {
            if (c[i.IsAllDay.name]) {
                return 1
            }
        }
        if (this.spansHavePriority) {
            var h = Extensible.Date.diffDays;
            if (h(e[i.StartDate.name], e[i.EndDate.name]) > 0) {
                if (h(c[i.StartDate.name], c[i.EndDate.name]) > 0) {
                    if (e[i.StartDate.name].getTime() == c[i.StartDate.name].getTime()) {
                        return c[i.EndDate.name].getTime() - e[i.EndDate.name].getTime()
                    }
                    return e[i.StartDate.name].getTime() - c[i.StartDate.name].getTime()
                }
                return -1
            } else {
                if (h(c[i.StartDate.name], c[i.EndDate.name]) > 0) {
                    return 1
                }
            }
            return e[i.StartDate.name].getTime() - c[i.StartDate.name].getTime()
        } else {
            return e[i.StartDate.name].getTime() - c[i.StartDate.name].getTime()
        }
    }, this))
}, moveTo: function (b, a) {
    if (Ext.isDate(b)) {
        this.setStartDate(b, a);
        return this.startDate
    }
    return b
}, moveNext: function (a) {
    return this.moveTo(Extensible.Date.add(this.viewEnd, {days: 1}), a)
}, movePrev: function (a) {
    var b = Extensible.Date.diffDays(this.viewStart, this.viewEnd) + 1;
    return this.moveDays(-b, a)
}, moveMonths: function (b, a) {
    return this.moveTo(Extensible.Date.add(this.startDate, {months: b}), a)
}, moveWeeks: function (b, a) {
    return this.moveTo(Extensible.Date.add(this.startDate, {days: b * 7}), a)
}, moveDays: function (b, a) {
    return this.moveTo(Extensible.Date.add(this.startDate, {days: b}), a)
}, moveToday: function (a) {
    return this.moveTo(new Date(), a)
}, setStore: function (a, b) {
    var c = this.store;
    if (!b && c) {
        c.un("datachanged", this.onDataChanged, this);
        c.un("clear", this.refresh, this);
        c.un("write", this.onWrite, this);
        c.un("exception", this.onException, this)
    }
    if (a) {
        a.on("datachanged", this.onDataChanged, this);
        a.on("clear", this.refresh, this);
        a.on("write", this.onWrite, this);
        a.on("exception", this.onException, this)
    }
    this.store = a
}, onException: function (c, e, f, g, b, a) {
    if (a.reject) {
        a.reject()
    }
}, setCalendarStore: function (a, b) {
    if (!b && this.calendarStore) {
        this.calendarStore.un("datachanged", this.refresh, this);
        this.calendarStore.un("add", this.refresh, this);
        this.calendarStore.un("remove", this.refresh, this);
        this.calendarStore.un("update", this.refresh, this)
    }
    if (a) {
        a.on("datachanged", this.refresh, this);
        a.on("add", this.refresh, this);
        a.on("remove", this.refresh, this);
        a.on("update", this.refresh, this)
    }
    this.calendarStore = a
}, getEventRecord: function (b) {
    var a = this.store.find(Extensible.calendar.data.EventMappings.EventId.name, b, 0, false, true, true);
    return this.store.getAt(a)
}, getEventRecordFromEl: function (a) {
    return this.getEventRecord(this.getEventIdFromEl(a))
}, getEventEditor: function () {
    this.editWin = this.editWin || Ext.WindowMgr.get("ext-cal-editwin");
    if (!this.editWin) {
        this.editWin = Ext.create("Extensible.calendar.form.EventWindow", {id: "ext-cal-editwin", calendarStore: this.calendarStore, modal: this.editModal, enableEditDetails: this.enableEditDetails, listeners: {eventadd: {fn: function (b, c, a) {
            b.currentView.onEventAdd(null, c)
        }, scope: this}, eventupdate: {fn: function (b, c, a) {
            b.currentView.onEventUpdate(null, c)
        }, scope: this}, eventdelete: {fn: function (b, c, a) {
            b.currentView.onEventDelete(null, c)
        }, scope: this}, editdetails: {fn: function (c, e, b, a) {
            c.animateTarget = null;
            c.hide();
            c.currentView.fireEvent("editdetails", c.currentView, e)
        }, scope: this}, eventcancel: {fn: function (b, c, a) {
            this.dismissEventEditor(null, a);
            b.currentView.onEventCancel()
        }, scope: this}}})
    }
    this.editWin.currentView = this;
    return this.editWin
}, showEventEditor: function (b, a) {
    this.getEventEditor().show(b, a, this);
    return this
}, dismissEventEditor: function (b, c) {
    if (this.newRecord && this.newRecord.phantom) {
        this.store.remove(this.newRecord)
    }
    delete this.newRecord;
    var a = Ext.WindowMgr.get("ext-cal-editwin");
    if (a) {
        a[b ? b : "hide"](c)
    }
    return this
}, save: function () {
    if (!this.store.autoSync) {
        this.store.sync()
    }
}, onWrite: function (b, a) {
    if (a.wasSuccessful()) {
        var c = a.records[0];
        switch (a.action) {
            case"create":
                this.onAdd(b, c);
                break;
            case"update":
                this.onUpdate(b, c, Ext.data.Record.COMMIT);
                break;
            case"destroy":
                this.onRemove(b, c);
                break
        }
    }
}, onEventAdd: function (a, b) {
    this.newRecord = b;
    if (!b.store) {
        this.store.add(b);
        this.save()
    }
    this.fireEvent("eventadd", this, b)
}, onEventUpdate: function (a, b) {
    this.save();
    this.fireEvent("eventupdate", this, b)
}, onEventDelete: function (a, b) {
    if (b.store) {
        this.store.remove(b)
    }
    this.save();
    this.fireEvent("eventdelete", this, b)
}, onEventCancel: function (a, b) {
    this.fireEvent("eventcancel", this, b)
}, onDayClick: function (c, b, a) {
    if (this.readOnly === true) {
        return
    }
    if (this.fireEvent("dayclick", this, Ext.Date.clone(c), b, a) !== false) {
        var f = Extensible.calendar.data.EventMappings, e = {};
        e[f.StartDate.name] = c;
        e[f.IsAllDay.name] = b;
        this.showEventEditor(e, a)
    }
}, showEventMenu: function (a, b) {
    if (!this.eventMenu) {
        this.eventMenu = Ext.create("Extensible.calendar.menu.Event", {listeners: {editdetails: Ext.bind(this.onEditDetails, this), eventdelete: Ext.bind(this.onDeleteEvent, this), eventmove: Ext.bind(this.onMoveEvent, this)}})
    }
    this.eventMenu.showForEvent(this.getEventRecordFromEl(a), a, b);
    this.menuActive = true
}, onEditDetails: function (c, b, a) {
    this.fireEvent("editdetails", this, b, a);
    this.menuActive = false
}, onMoveEvent: function (c, b, a) {
    this.moveEvent(b, a);
    this.menuActive = false
}, moveEvent: function (c, a) {
    if (Extensible.Date.compare(c.data[Extensible.calendar.data.EventMappings.StartDate.name], a) === 0) {
        return
    }
    if (this.fireEvent("beforeeventmove", this, c, Ext.Date.clone(a)) !== false) {
        var b = a.getTime() - c.data[Extensible.calendar.data.EventMappings.StartDate.name].getTime();
        c.beginEdit();
        c.set(Extensible.calendar.data.EventMappings.StartDate.name, a);
        c.set(Extensible.calendar.data.EventMappings.EndDate.name, Extensible.Date.add(c.data[Extensible.calendar.data.EventMappings.EndDate.name], {millis: b}));
        c.endEdit();
        this.save();
        this.fireEvent("eventmove", this, c)
    }
}, onDeleteEvent: function (c, b, a) {
    b._deleting = true;
    this.deleteEvent(b, a);
    this.menuActive = false
}, deleteEvent: function (b, a) {
    if (this.fireEvent("beforeeventdelete", this, b, a) !== false) {
        this.store.remove(b);
        this.save();
        this.fireEvent("eventdelete", this, b, a)
    }
}, onContextMenu: function (f, b) {
    var c, a = false;
    if (c = f.getTarget(this.eventSelector, 5, true)) {
        this.dismissEventEditor().showEventMenu(c, f.getXY());
        a = true
    }
    if (a || this.suppressBrowserContextMenu === true) {
        f.preventDefault()
    }
}, onClick: function (f, a) {
    var c = this, b = f.getTarget(c.eventSelector, 5);
    if (c.dropZone) {
        c.dropZone.clearShims()
    }
    if (c.menuActive === true) {
        c.menuActive = false;
        return true
    }
    if (b) {
        var h = c.getEventIdFromEl(b), g = c.getEventRecord(h);
        if (c.fireEvent("eventclick", c, g, b) !== false) {
            if (c.readOnly !== true) {
                c.showEventEditor(g, b)
            }
        }
        return true
    }
}, onMouseOver: function (b, a) {
    if (this.trackMouseOver !== false && (this.dragZone == undefined || !this.dragZone.dragging)) {
        if (!this.handleEventMouseEvent(b, a, "over")) {
            this.handleDayMouseEvent(b, a, "over")
        }
    }
}, onMouseOut: function (b, a) {
    if (this.trackMouseOver !== false && (this.dragZone == undefined || !this.dragZone.dragging)) {
        if (!this.handleEventMouseEvent(b, a, "out")) {
            this.handleDayMouseEvent(b, a, "out")
        }
    }
}, handleEventMouseEvent: function (h, c, g) {
    var f;
    if (f = h.getTarget(this.eventSelector, 5, true)) {
        var a = Ext.get(h.getRelatedTarget());
        if (f == a || f.contains(a)) {
            return true
        }
        var i = this.getEventIdFromEl(f);
        if (this.eventOverClass != "") {
            var b = this.getEventEls(i);
            b[g == "over" ? "addCls" : "removeCls"](this.eventOverClass)
        }
        this.fireEvent("event" + g, this, this.getEventRecord(i), f);
        return true
    }
    return false
}, getDateFromId: function (c, b) {
    var a = c.split(b);
    return a[a.length - 1]
}, handleDayMouseEvent: function (k, f, h) {
    if (f = k.getTarget("td", 3)) {
        if (f.id && f.id.indexOf(this.dayElIdDelimiter) > -1) {
            var i = this.getDateFromId(f.id, this.dayElIdDelimiter), a = Ext.get(k.getRelatedTarget()), c, b;
            if (a) {
                c = a.is("td") ? a : a.up("td", 3);
                b = c && c.id ? this.getDateFromId(c.id, this.dayElIdDelimiter) : ""
            }
            if (!a || i != b) {
                var g = this.getDayEl(i);
                if (g && this.dayOverClass != "") {
                    g[h == "over" ? "addCls" : "removeCls"](this.dayOverClass)
                }
                this.fireEvent("day" + h, this, Ext.Date.parseDate(i, "Ymd"), g)
            }
        }
    }
}, renderItems: function () {
    throw"This method must be implemented by a subclass"
}, destroy: function () {
    this.callParent(arguments);
    if (this.el) {
        this.el.un("contextmenu", this.onContextMenu, this)
    }
    Ext.destroy(this.editWin, this.eventMenu, this.dragZone, this.dropZone)
}});
Ext.define("Extensible.calendar.view.MonthDayDetail", {extend: "Ext.Component", alias: "widget.extensible.monthdaydetailview", requires: ["Ext.XTemplate", "Extensible.calendar.view.AbstractCalendar"], initComponent: function () {
    this.callParent(arguments);
    this.addEvents({eventsrendered: true})
}, afterRender: function () {
    this.tpl = this.getTemplate();
    this.callParent(arguments);
    this.el.on({click: this.view.onClick, mouseover: this.view.onMouseOver, mouseout: this.view.onMouseOut, scope: this.view})
}, getTemplate: function () {
    if (!this.tpl) {
        this.tpl = Ext.create("Ext.XTemplate", '<div class="ext-cal-mdv x-unselectable">', '<table class="ext-cal-mvd-tbl" cellpadding="0" cellspacing="0">', "<tbody>", '<tpl for=".">', '<tr><td class="ext-cal-ev">{markup}</td></tr>', "</tpl>", "</tbody>", "</table>", "</div>")
    }
    this.tpl.compile();
    return this.tpl
}, update: function (a) {
    this.date = a;
    this.refresh()
}, refresh: function () {
    if (!this.rendered) {
        return
    }
    var a = this.view.getEventTemplate(), b = [];
    evts = this.store.queryBy(function (e) {
        var g = Ext.Date.clearTime(this.date, true).getTime(), k = Extensible.calendar.data.EventMappings, i = Ext.Date.clearTime(e.data[k.StartDate.name], true).getTime(), f = (g == i), h = false, m = e.data[k.CalendarId.name], c = this.calendarStore ? this.calendarStore.getById(m) : null;
        if (c && c.data[Extensible.calendar.data.CalendarMappings.IsHidden.name] === true) {
            return false
        }
        if (!f) {
            var l = Ext.Date.clearTime(e.data[k.EndDate.name], true).getTime();
            h = i < g && l >= g
        }
        return f || h
    }, this);
    Extensible.calendar.view.AbstractCalendar.prototype.sortEventRecordsForDay.call(this, evts);
    evts.each(function (c) {
        var e = c.data, f = Extensible.calendar.data.EventMappings;
        e._renderAsAllDay = e[f.IsAllDay.name] || Extensible.Date.diffDays(e[f.StartDate.name], e[f.EndDate.name]) > 0;
        e.spanLeft = Extensible.Date.diffDays(e[f.StartDate.name], this.date) > 0;
        e.spanRight = Extensible.Date.diffDays(this.date, e[f.EndDate.name]) > 0;
        e.spanCls = (e.spanLeft ? (e.spanRight ? "ext-cal-ev-spanboth" : "ext-cal-ev-spanleft") : (e.spanRight ? "ext-cal-ev-spanright" : ""));
        b.push({markup: a.apply(this.getTemplateEventData(e))})
    }, this);
    this.tpl.overwrite(this.el, b);
    this.fireEvent("eventsrendered", this, this.date, evts.getCount())
}, getTemplateEventData: function (a) {
    var b = this.view.getTemplateEventData(a);
    b._elId = "dtl-" + b._elId;
    return b
}});
Ext.define("Extensible.calendar.view.Month", {extend: "Extensible.calendar.view.AbstractCalendar", alias: "widget.extensible.monthview", requires: ["Ext.XTemplate", Ext.getVersion().isLessThan("4.2.0") ? "Ext.TaskManager" : "Ext.util.TaskManager", "Extensible.calendar.template.Month", "Extensible.calendar.util.WeekEventRenderer", "Extensible.calendar.view.MonthDayDetail"], moreText: "+{0} more...", detailsTitleDateFormat: "F j", showTime: true, showTodayText: true, showHeader: false, showWeekLinks: false, showWeekNumbers: false, weekLinkOverClass: "ext-week-link-over", daySelector: ".ext-cal-day", moreSelector: ".ext-cal-ev-more", weekLinkSelector: ".ext-cal-week-link", weekCount: -1, dayCount: 7, moreElIdDelimiter: "-more-", weekLinkIdDelimiter: "ext-cal-week-", initComponent: function () {
    this.callParent(arguments);
    this.addEvents({dayclick: true, weekclick: true, dayover: true, dayout: true})
}, initDD: function () {
    var a = {view: this, createText: this.ddCreateEventText, moveText: this.ddMoveEventText, ddGroup: this.ddGroup || this.id + "-MonthViewDD"};
    this.dragZone = Ext.create("Extensible.calendar.dd.DragZone", this.el, a);
    this.dropZone = Ext.create("Extensible.calendar.dd.DropZone", this.el, a)
}, onDestroy: function () {
    Ext.destroy(this.ddSelector);
    Ext.destroy(this.dragZone);
    Ext.destroy(this.dropZone);
    this.callParent(arguments)
}, afterRender: function () {
    if (!this.tpl) {
        this.tpl = Ext.create("Extensible.calendar.template.Month", {id: this.id, showTodayText: this.showTodayText, todayText: this.todayText, showTime: this.showTime, showHeader: this.showHeader, showWeekLinks: this.showWeekLinks, showWeekNumbers: this.showWeekNumbers});
        this.tpl.compile()
    }
    this.addCls("ext-cal-monthview ext-cal-ct");
    this.callParent(arguments)
}, onResize: function () {
    if (this.monitorResize) {
        this.maxEventsPerDay = this.getMaxEventsPerDay();
        this.refresh(false)
    }
}, forceSize: function () {
    if (this.showWeekLinks && this.el) {
        var f = this.el.down(".ext-cal-hd-days-tbl"), e = this.el.select(".ext-cal-bg-tbl"), c = this.el.select(".ext-cal-evt-tbl"), b = this.el.down(".ext-cal-week-link").getWidth(), a = this.el.getWidth() - b;
        f.setWidth(a);
        e.setWidth(a);
        c.setWidth(a)
    }
    this.callParent(arguments)
}, initClock: function () {
    if (Ext.fly(this.id + "-clock") !== null) {
        this.prevClockDay = new Date().getDay();
        if (this.clockTask) {
            Ext.util.TaskManager.stop(this.clockTask)
        }
        this.clockTask = Ext.util.TaskManager.start({run: function () {
            var b = Ext.fly(this.id + "-clock"), a = new Date();
            if (a.getDay() == this.prevClockDay) {
                if (b) {
                    b.update(Ext.Date.format(a, Extensible.Date.use24HourTime ? "G:i" : "g:ia"))
                }
            } else {
                this.prevClockDay = a.getDay();
                this.moveTo(a)
            }
        }, scope: this, interval: 1000})
    }
}, getMoreText: function (a) {
    return this.moreText
}, getEventBodyMarkup: function () {
    if (!this.eventBodyMarkup) {
        this.eventBodyMarkup = ["{Title}", '<tpl if="_isReminder">', '<i class="ext-cal-ic ext-cal-ic-rem">&#160;</i>', "</tpl>", '<tpl if="_isRecurring">', '<i class="ext-cal-ic ext-cal-ic-rcr">&#160;</i>', "</tpl>", '<tpl if="spanLeft">', '<i class="ext-cal-spl">&#160;</i>', "</tpl>", '<tpl if="spanRight">', '<i class="ext-cal-spr">&#160;</i>', "</tpl>"].join("")
    }
    return this.eventBodyMarkup
}, getEventTemplate: function () {
    if (!this.eventTpl) {
        var b, a = this.getEventBodyMarkup();
        b = !(Ext.isIE || Ext.isOpera) ? Ext.create("Ext.XTemplate", '<div class="{_extraCls} {spanCls} ext-cal-evt ext-cal-evr">', a, "</div>") : Ext.create("Ext.XTemplate", '<tpl if="_renderAsAllDay">', '<div class="{_extraCls} {spanCls} ext-cal-evt ext-cal-evo">', '<div class="ext-cal-evm">', '<div class="ext-cal-evi">', "</tpl>", '<tpl if="!_renderAsAllDay">', '<div class="{_extraCls} ext-cal-evt ext-cal-evr">', "</tpl>", a, '<tpl if="_renderAsAllDay">', "</div>", "</div>", "</tpl>", "</div>");
        b.compile();
        this.eventTpl = b
    }
    return this.eventTpl
}, getTemplateEventData: function (k) {
    var h = Extensible.calendar.data.EventMappings, f = [this.getEventSelectorCls(k[h.EventId.name])], g = {}, b = k[h.RRule.name] != "", a = "x-cal-default", i = k[h.Title.name], c = Extensible.Date.use24HourTime ? "G:i " : "g:ia ";
    if (this.calendarStore && k[h.CalendarId.name]) {
        var e = this.calendarStore.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, k[h.CalendarId.name]);
        if (e) {
            a = "x-cal-" + e.data[Extensible.calendar.data.CalendarMappings.ColorId.name]
        }
    }
    a += (k._renderAsAllDay ? "-ad" : "");
    f.push(a);
    if (this.getEventClass) {
        var e = this.getEventRecord(k[h.EventId.name]), l = this.getEventClass(e, !!k._renderAsAllDay, g, this.store);
        f.push(l)
    }
    g._extraCls = f.join(" ");
    g._isRecurring = k.Recurrence && k.Recurrence != "";
    g._isReminder = k[h.Reminder.name] && k[h.Reminder.name] != "";
    g.Title = (k[h.IsAllDay.name] ? "" : Ext.Date.format(k[h.StartDate.name], c)) + (!i || i.length == 0 ? this.defaultEventTitleText : i);
    return Ext.applyIf(g, k)
}, refresh: function (a) {
    Extensible.log("refresh (MonthView)");
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
    this.callParent(arguments);
    if (this.showTime !== false) {
        this.initClock()
    }
}, renderItems: function () {
    Extensible.calendar.util.WeekEventRenderer.render({eventGrid: this.allDayOnly ? this.allDayGrid : this.eventGrid, viewStart: this.viewStart, tpl: this.getEventTemplate(), maxEventsPerDay: this.maxEventsPerDay, viewId: this.id, templateDataFn: Ext.bind(this.getTemplateEventData, this), evtMaxCount: this.evtMaxCount, weekCount: this.weekCount, dayCount: this.dayCount, getMoreText: Ext.bind(this.getMoreText, this)});
    this.fireEvent("eventsrendered", this)
}, getDayEl: function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId: function (a) {
    if (Ext.isDate(a)) {
        a = Ext.Date.format(a, "Ymd")
    }
    return this.id + this.dayElIdDelimiter + a
}, getWeekIndex: function (b) {
    var a = this.getDayEl(b).up(".ext-cal-wk-ct");
    return parseInt(a.id.split("-wk-")[1])
}, getDaySize: function (g) {
    var c = this.el.getBox(), f = this.getViewPadding(), a = (c.width - f.width) / this.dayCount, b = (c.height - f.height) / this.getWeekCount();
    if (g) {
        var e = this.el.select(".ext-cal-dtitle").last().parent("tr");
        b = e ? b - e.getHeight(true) : b
    }
    return{height: b, width: a}
}, getEventHeight: function () {
    if (!this.eventHeight) {
        var a = this.el.select(".ext-cal-evt").first();
        if (a) {
            this.eventHeight = a.parent("td").getHeight()
        } else {
            return 16
        }
    }
    return this.eventHeight
}, getMaxEventsPerDay: function () {
    var b = this.getDaySize(true).height, c = this.getEventHeight(), a = Math.max(Math.floor((b - c) / c), 0);
    return a
}, getViewPadding: function (e) {
    var e = e || "tlbr", g = e.indexOf("t") > -1, f = e.indexOf("l") > -1, b = e.indexOf("r") > -1, a = this.showHeader && g ? this.el.select(".ext-cal-hd-days-tbl").first().getHeight() : 0, c = 0;
    if (this.isHeaderView) {
        if (f) {
            c = this.el.select(".ext-cal-gutter").first().getWidth()
        }
        if (b) {
            c += this.el.select(".ext-cal-gutter-rt").first().getWidth()
        }
    } else {
        if (this.showWeekLinks && f) {
            c = this.el.select(".ext-cal-week-link").first().getWidth()
        }
    }
    return{height: a, width: c}
}, getDayAt: function (i, f) {
    var c = this.el.getBox(), g = this.getViewPadding("tl"), h = this.getDaySize(), e = Math.floor(((i - c.x - g.width) / h.width)), b = Math.floor(((f - c.y - g.height) / h.height)), k = (b * 7) + e, a = Extensible.Date.add(this.viewStart, {days: k});
    return{date: a, el: this.getDayEl(a)}
}, moveNext: function () {
    return this.moveMonths(1, true)
}, movePrev: function () {
    return this.moveMonths(-1, true)
}, onInitDrag: function () {
    this.callParent(arguments);
    Ext.select(this.daySelector).removeCls(this.dayOverClass);
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
}, onMoreClick: function (a) {
    if (!this.detailPanel) {
        this.detailPanel = Ext.create("Ext.Panel", {id: this.id + "-details-panel", title: Ext.Date.format(a, this.detailsTitleDateFormat), layout: "fit", floating: true, renderTo: Ext.getBody(), tools: [
            {type: "close", handler: function (f, b, c) {
                c.ownerCt.hide()
            }}
        ], items: {xtype: "extensible.monthdaydetailview", id: this.id + "-details-view", date: a, view: this, store: this.store, calendarStore: this.calendarStore, listeners: {eventsrendered: Ext.bind(this.onDetailViewUpdated, this)}}});
        if (this.enableContextMenus && this.readOnly !== true) {
            this.detailPanel.body.on("contextmenu", this.onContextMenu, this)
        }
    } else {
        this.detailPanel.setTitle(Ext.Date.format(a, this.detailsTitleDateFormat))
    }
    this.detailPanel.getComponent(this.id + "-details-view").update(a)
}, onDetailViewUpdated: function (a, e, b) {
    var g = this.detailPanel, f = this.getDayEl(e), c = f.getBox();
    g.setWidth(Math.max(c.width, 220));
    g.show();
    g.getPositionEl().alignTo(f, "t-t?")
}, onHide: function () {
    this.callParent(arguments);
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
}, onClick: function (f, a) {
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
    if (el = f.getTarget(this.moreSelector, 3)) {
        var b = el.id.split(this.moreElIdDelimiter)[1];
        this.onMoreClick(Ext.Date.parseDate(b, "Ymd"));
        return
    }
    if (el = f.getTarget(this.weekLinkSelector, 3)) {
        var b = el.id.split(this.weekLinkIdDelimiter)[1];
        this.fireEvent("weekclick", this, Ext.Date.parseDate(b, "Ymd"));
        return
    }
    if (Extensible.calendar.view.Month.superclass.onClick.apply(this, arguments)) {
        return
    }
    if (el = f.getTarget("td", 3)) {
        if (el.id && el.id.indexOf(this.dayElIdDelimiter) > -1) {
            var c = el.id.split(this.dayElIdDelimiter), b = c[c.length - 1];
            this.onDayClick(Ext.Date.parseDate(b, "Ymd"), false, Ext.get(this.getDayId(b)));
            return
        }
    }
}, handleDayMouseEvent: function (f, a, c) {
    var b = f.getTarget(this.weekLinkSelector, 3, true);
    if (b) {
        b[c == "over" ? "addCls" : "removeCls"](this.weekLinkOverClass);
        return
    }
    this.callParent(arguments)
}, destroy: function () {
    this.callParent(arguments);
    if (this.detailsPanel) {
        this.detailPanel.body.un("contextmenu", this.onContextMenu, this)
    }
}});
Ext.define("Extensible.calendar.view.DayHeader", {extend: "Extensible.calendar.view.Month", alias: "widget.extensible.dayheaderview", requires: ["Extensible.calendar.template.DayHeader"], weekCount: 1, dayCount: 1, allDayOnly: true, monitorResize: false, isHeaderView: true, afterRender: function () {
    if (!this.tpl) {
        this.tpl = Ext.create("Extensible.calendar.template.DayHeader", {id: this.id, showTodayText: this.showTodayText, todayText: this.todayText, showTime: this.showTime})
    }
    this.tpl.compile();
    this.addCls("ext-cal-day-header");
    this.callParent(arguments)
}, forceSize: Ext.emptyFn, refresh: function (a) {
    Extensible.log("refresh (DayHeaderView)");
    this.callParent(arguments);
    this.recalcHeaderBox()
}, recalcHeaderBox: function () {
    var b = this.el.down(".ext-cal-evt-tbl"), a = b.getHeight();
    this.el.setHeight(a + 7);
    this.el.down(".ext-cal-hd-ad-inner").setHeight(a + 5);
    this.el.down(".ext-cal-bg-tbl").setHeight(a + 5)
}, moveNext: function () {
    return this.moveDays(this.dayCount)
}, movePrev: function () {
    return this.moveDays(-this.dayCount)
}, onClick: function (f, a) {
    if (el = f.getTarget("td", 3)) {
        if (el.id && el.id.indexOf(this.dayElIdDelimiter) > -1) {
            var c = el.id.split(this.dayElIdDelimiter), b = c[c.length - 1];
            this.onDayClick(Ext.Date.parseDate(b, "Ymd"), true, Ext.get(this.getDayId(b, true)));
            return
        }
    }
    this.callParent(arguments)
}});
Ext.define("Extensible.calendar.view.DayBody", {extend: "Extensible.calendar.view.AbstractCalendar", alias: "widget.extensible.daybodyview", requires: ["Ext.XTemplate", "Extensible.calendar.template.DayBody", "Extensible.calendar.data.EventMappings", "Extensible.calendar.dd.DayDragZone", "Extensible.calendar.dd.DayDropZone"], dayColumnElIdDelimiter: "-day-col-", hourIncrement: 60, initComponent: function () {
    this.callParent(arguments);
    if (this.readOnly === true) {
        this.enableEventResize = false
    }
    this.incrementsPerHour = this.hourIncrement / this.ddIncrement;
    this.minEventHeight = this.minEventDisplayMinutes / (this.hourIncrement / this.hourHeight);
    this.addEvents({beforeeventresize: true, eventresize: true, dayclick: true})
}, initDD: function () {
    var a = {view: this, createText: this.ddCreateEventText, moveText: this.ddMoveEventText, resizeText: this.ddResizeEventText, ddIncrement: this.ddIncrement, ddGroup: this.ddGroup || this.id + "-DayViewDD"};
    this.el.ddScrollConfig = {vthresh: Ext.isIE || Ext.isOpera ? 100 : 40, hthresh: -1, frequency: 50, increment: 100, ddGroup: this.ddGroup || this.id + "-DayViewDD"};
    this.dragZone = Ext.create("Extensible.calendar.dd.DayDragZone", this.el, Ext.apply({}, a));
    this.dropZone = Ext.create("Extensible.calendar.dd.DayDropZone", this.el, a)
}, refresh: function (a) {
    Extensible.log("refresh (DayBodyView)");
    var b = this.el.getScroll().top;
    this.callParent(arguments);
    if (this.scrollReady) {
        this.scrollTo(b)
    }
}, scrollTo: function (b, a) {
    a = a || (Ext.isIE || Ext.isOpera);
    if (a) {
        Ext.defer(function () {
            this.el.scrollTo("top", b);
            this.scrollReady = true
        }, 10, this)
    } else {
        this.el.scrollTo("top", b);
        this.scrollReady = true
    }
}, afterRender: function () {
    if (!this.tpl) {
        this.tpl = Ext.create("Extensible.calendar.template.DayBody", {id: this.id, dayCount: this.dayCount, showTodayText: this.showTodayText, todayText: this.todayText, showTime: this.showTime, showHourSeparator: this.showHourSeparator, viewStartHour: this.viewStartHour, viewEndHour: this.viewEndHour, hourIncrement: this.hourIncrement, hourHeight: this.hourHeight})
    }
    this.tpl.compile();
    this.addCls("ext-cal-body-ct");
    this.callParent(arguments);
    var b = Math.max(this.scrollStartHour, this.viewStartHour), a = Math.max(0, b - this.viewStartHour);
    if (a > 0) {
        this.scrollTo(a * this.hourHeight)
    }
}, forceSize: Ext.emptyFn, onEventResize: function (e, b) {
    if (this.fireEvent("beforeeventresize", this, e, b) !== false) {
        var c = Extensible.Date, f = Extensible.calendar.data.EventMappings.StartDate.name, a = Extensible.calendar.data.EventMappings.EndDate.name;
        if (c.compare(e.data[f], b.StartDate) === 0 && c.compare(e.data[a], b.EndDate) === 0) {
            return
        }
        e.set(f, b.StartDate);
        e.set(a, b.EndDate);
        this.onEventUpdate(null, e);
        this.fireEvent("eventresize", this, e)
    }
}, getEventBodyMarkup: function () {
    if (!this.eventBodyMarkup) {
        this.eventBodyMarkup = ["{Title}", '<tpl if="_isReminder">', '<i class="ext-cal-ic ext-cal-ic-rem">&#160;</i>', "</tpl>", '<tpl if="_isRecurring">', '<i class="ext-cal-ic ext-cal-ic-rcr">&#160;</i>', "</tpl>"].join("")
    }
    return this.eventBodyMarkup
}, getEventTemplate: function () {
    if (!this.eventTpl) {
        this.eventTpl = !(Ext.isIE || Ext.isOpera) ? Ext.create("Ext.XTemplate", '<div id="{_elId}" class="{_extraCls} ext-cal-evt ext-cal-evr" ', 'style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', '<div class="ext-evt-bd">', this.getEventBodyMarkup(), "</div>", this.enableEventResize ? '<div class="ext-evt-rsz"><div class="ext-evt-rsz-h">&#160;</div></div>' : "", "</div>") : Ext.create("Ext.XTemplate", '<div id="{_elId}" class="ext-cal-evt {_extraCls}" ', 'style="left: {_left}%; width: {_width}%; top: {_top}px;">', '<div class="ext-cal-evb">&#160;</div>', '<dl style="height: {_height}px;" class="ext-cal-evdm">', '<dd class="ext-evt-bd">', this.getEventBodyMarkup(), "</dd>", this.enableEventResize ? '<div class="ext-evt-rsz"><div class="ext-evt-rsz-h">&#160;</div></div>' : "", "</dl>", '<div class="ext-cal-evb">&#160;</div>', "</div>");
        this.eventTpl.compile()
    }
    return this.eventTpl
}, getEventAllDayTemplate: function () {
    if (!this.eventAllDayTpl) {
        var b, a = this.getEventBodyMarkup();
        b = !(Ext.isIE || Ext.isOpera) ? Ext.create("Ext.XTemplate", '<div class="{_extraCls} {spanCls} ext-cal-evt ext-cal-evr" ', 'style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', a, "</div>") : Ext.create("Ext.XTemplate", '<div class="ext-cal-evt" ', 'style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', '<div class="{_extraCls} {spanCls} ext-cal-evo">', '<div class="ext-cal-evm">', '<div class="ext-cal-evi">', a, "</div>", "</div>", "</div>", "</div>");
        b.compile();
        this.eventAllDayTpl = b
    }
    return this.eventAllDayTpl
}, getTemplateEventData: function (k) {
    var h = Extensible.calendar.data.EventMappings, f = [this.getEventSelectorCls(k[h.EventId.name])], g = {}, a = "x-cal-default", i = k[h.Title.name], c = Extensible.Date.use24HourTime ? "G:i " : "g:ia ", b = k[h.RRule.name] != "";
    this.getTemplateEventBox(k);
    if (this.calendarStore && k[h.CalendarId.name]) {
        var e = this.calendarStore.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, k[h.CalendarId.name]);
        if (e) {
            a = "x-cal-" + e.data[Extensible.calendar.data.CalendarMappings.ColorId.name]
        }
    }
    a += (k._renderAsAllDay ? "-ad" : "") + (Ext.isIE || Ext.isOpera ? "-x" : "");
    f.push(a);
    if (this.getEventClass) {
        var e = this.getEventRecord(k[h.EventId.name]), l = this.getEventClass(e, !!k._renderAsAllDay, g, this.store);
        f.push(l)
    }
    g._extraCls = f.join(" ");
    g._isRecurring = k.Recurrence && k.Recurrence != "";
    g._isReminder = k[h.Reminder.name] && k[h.Reminder.name] != "";
    g.Title = (k[h.IsAllDay.name] ? "" : Ext.Date.format(k[h.StartDate.name], c)) + (!i || i.length == 0 ? this.defaultEventTitleText : i);
    return Ext.applyIf(g, k)
}, getEventPositionOffsets: function () {
    return{top: 0, height: -1}
}, getTemplateEventBox: function (k) {
    var c = this.hourHeight / this.hourIncrement, b = k[Extensible.calendar.data.EventMappings.StartDate.name], e = k[Extensible.calendar.data.EventMappings.EndDate.name], h = Math.max(b.getHours() - this.viewStartHour, 0), i = Math.min(e.getHours() - this.viewStartHour, this.viewEndHour - this.viewStartHour), a = h * this.hourIncrement, f = i * this.hourIncrement, l = Extensible.Date.add(Ext.Date.clone(e), {hours: this.viewEndHour, clearTime: true}), g = this.getEventPositionOffsets();
    if (b.getHours() >= this.viewStartHour) {
        a += b.getMinutes()
    }
    if (e <= l) {
        f += e.getMinutes()
    }
    k._left = 0;
    k._width = 100;
    k._top = a * c + g.top;
    k._height = Math.max(((f - a) * c), this.minEventHeight) + g.height
}, renderItems: function () {
    var o = 0, c = [];
    for (; o < this.dayCount; o++) {
        var t = emptyCells = skipped = 0, u = this.eventGrid[0][o], b = u ? u.length : 0, g;
        for (; t < b; t++) {
            g = u[t];
            if (!g) {
                continue
            }
            var s = g.data || g.event.data, e = Extensible.calendar.data.EventMappings, v = s[e.IsAllDay.name] === true, n = this.isEventSpanning(g.event || g), f = v || n;
            if (f) {
                continue
            }
            Ext.apply(s, {cls: "ext-cal-ev", _positioned: true});
            c.push({data: this.getTemplateEventData(s), date: Extensible.Date.add(this.viewStart, {days: o})})
        }
    }
    var p = j = 0, q = [], k = c.length, a;
    for (; p < k; p++) {
        var g = c[p].data, m = null, h = g[Extensible.calendar.data.EventMappings.StartDate.name].getDate();
        for (j = 0; j < k; j++) {
            if (p == j) {
                continue
            }
            m = c[j].data;
            if (this.isOverlapping(g, m)) {
                g._overlap = g._overlap == undefined ? 1 : g._overlap + 1;
                if (p < j) {
                    if (g._overcol === undefined) {
                        g._overcol = 0
                    }
                    m._overcol = g._overcol + 1;
                    q[h] = q[h] ? Math.max(q[h], m._overcol) : m._overcol
                }
            }
        }
    }
    for (p = 0; p < k; p++) {
        var g = c[p].data, h = g[Extensible.calendar.data.EventMappings.StartDate.name].getDate();
        if (g._overlap !== undefined) {
            var w = 100 / (q[h] + 1), y = 100 - (w * g._overlap);
            g._width = w;
            g._left = w * g._overcol
        }
        var r = this.getEventTemplate().apply(g), x = this.id + "-day-col-" + Ext.Date.format(c[p].date, "Ymd");
        Ext.DomHelper.append(x, r)
    }
    this.fireEvent("eventsrendered", this)
}, getDayEl: function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId: function (a) {
    if (Ext.isDate(a)) {
        a = Ext.Date.format(a, "Ymd")
    }
    return this.id + this.dayColumnElIdDelimiter + a
}, getDaySize: function () {
    var a = this.el.down(".ext-cal-day-col-inner").getBox();
    return{height: a.height, width: a.width}
}, getDayAt: function (o, k) {
    var f = ".ext-cal-body-ct", h = this.el.down(".ext-cal-day-times").getWidth(), s = this.el.getBox(), n = this.getDaySize(false), p = o - s.x - h, a = Math.floor(p / n.width), m = this.el.getScroll(), r = this.el.down(".ext-cal-bg-row"), q = r.getHeight() / this.incrementsPerHour, l = k - s.y - q + m.top, i = Math.max(0, Math.ceil(l / q)), b = i * (this.hourIncrement / this.incrementsPerHour), e = Extensible.Date.add(this.viewStart, {days: a, minutes: b, hours: this.viewStartHour}), c = this.getDayEl(e), g = o;
    if (c) {
        g = c.getLeft()
    }
    return{date: e, el: c, timeBox: {x: g, y: (i * this.hourHeight / this.incrementsPerHour) + s.y - m.top, width: n.width, height: q}}
}, onClick: function (g, b) {
    if (this.dragPending || Extensible.calendar.view.DayBody.superclass.onClick.apply(this, arguments)) {
        return
    }
    if (g.getTarget(".ext-cal-day-times", 3) !== null) {
        return
    }
    var c = g.getTarget("td", 3);
    if (c) {
        if (c.id && c.id.indexOf(this.dayElIdDelimiter) > -1) {
            var f = this.getDateFromId(c.id, this.dayElIdDelimiter);
            this.onDayClick(Ext.Date.parseDate(f, "Ymd"), true, Ext.get(this.getDayId(f)));
            return
        }
    }
    var a = this.getDayAt(g.getX(), g.getY());
    if (a && a.date) {
        this.onDayClick(a.date, false, null)
    }
}});
Ext.define("Extensible.calendar.view.Day", {extend: "Ext.container.Container", alias: "widget.extensible.dayview", requires: ["Extensible.calendar.view.AbstractCalendar", "Extensible.calendar.view.DayHeader", "Extensible.calendar.view.DayBody"], showTime: true, showTodayText: true, dayCount: 1, enableEventResize: true, ddIncrement: 30, minEventDisplayMinutes: 30, showHourSeparator: true, viewStartHour: 0, viewEndHour: 24, scrollStartHour: 7, hourHeight: 42, hideMode: "offsets", initComponent: function () {
    this.ddCreateEventText = this.ddCreateEventText || Extensible.calendar.view.AbstractCalendar.prototype.ddCreateEventText;
    this.ddMoveEventText = this.ddMoveEventText || Extensible.calendar.view.AbstractCalendar.prototype.ddMoveEventText;
    this.dayCount = this.dayCount > 7 ? 7 : (this.dayCount < 1 ? 1 : this.dayCount);
    var b = Ext.apply({}, this.initialConfig);
    b.showTime = this.showTime;
    b.showTodayText = this.showTodayText;
    b.todayText = this.todayText;
    b.dayCount = this.dayCount;
    b.weekCount = 1;
    b.readOnly = this.readOnly;
    b.ddIncrement = this.ddIncrement;
    b.minEventDisplayMinutes = this.minEventDisplayMinutes;
    var c = Ext.applyIf({xtype: "extensible.dayheaderview", id: this.id + "-hd", ownerCalendarPanel: this.ownerCalendarPanel}, b);
    var a = Ext.applyIf({xtype: "extensible.daybodyview", enableEventResize: this.enableEventResize, showHourSeparator: this.showHourSeparator, viewStartHour: this.viewStartHour, viewEndHour: this.viewEndHour, scrollStartHour: this.scrollStartHour, hourHeight: this.hourHeight, id: this.id + "-bd", ownerCalendarPanel: this.ownerCalendarPanel}, b);
    this.items = [c, a];
    this.addCls("ext-cal-dayview ext-cal-ct");
    this.callParent(arguments)
}, afterRender: function () {
    this.callParent(arguments);
    this.header = Ext.getCmp(this.id + "-hd");
    this.body = Ext.getCmp(this.id + "-bd");
    this.body.on("eventsrendered", this.forceSize, this);
    this.on("resize", this.onResize, this)
}, refresh: function () {
    Extensible.log("refresh (DayView)");
    this.header.refresh();
    this.body.refresh()
}, forceSize: function () {
    Ext.defer(function () {
        var a = this.el.up(".x-panel-body"), c = this.el.down(".ext-cal-day-header"), b = a.getHeight() - c.getHeight();
        this.el.down(".ext-cal-body-ct").setHeight(b - 1)
    }, 1, this)
}, onResize: function () {
    this.forceSize();
    Ext.defer(this.refresh, Ext.isIE ? 1 : 0, this)
}, doHide: function () {
    this.header.doHide.apply(this, arguments);
    this.body.doHide.apply(this, arguments)
}, getViewBounds: function () {
    return this.header.getViewBounds()
}, getStartDate: function () {
    return this.header.getStartDate()
}, setStartDate: function (a) {
    this.header.setStartDate(a, true);
    this.body.setStartDate(a)
}, renderItems: function () {
    this.header.renderItems();
    this.body.renderItems()
}, isToday: function () {
    return this.header.isToday()
}, moveTo: function (a) {
    this.header.moveTo(a);
    return this.body.moveTo(a, true)
}, moveNext: function () {
    this.header.moveNext();
    return this.body.moveNext(true)
}, movePrev: function (a) {
    this.header.movePrev();
    return this.body.movePrev(true)
}, moveDays: function (a) {
    this.header.moveDays(a);
    return this.body.moveDays(a, true)
}, moveToday: function () {
    this.header.moveToday();
    return this.body.moveToday(true)
}, showEventEditor: function (b, a) {
    return Extensible.calendar.view.AbstractCalendar.prototype.showEventEditor.apply(this, arguments)
}, dismissEventEditor: function (a) {
    return Extensible.calendar.view.AbstractCalendar.prototype.dismissEventEditor.apply(this, arguments)
}});
Ext.define("Extensible.calendar.view.MultiDay", {extend: "Extensible.calendar.view.Day", alias: "widget.extensible.multidayview", dayCount: 3, startDayIsStatic: false, moveNext: function (a) {
    return this.moveDays(this.startDayIsStatic ? 7 : this.dayCount, a)
}, movePrev: function (a) {
    return this.moveDays(this.startDayIsStatic ? -7 : -this.dayCount, a)
}});
Ext.define("Extensible.calendar.view.Week", {extend: "Extensible.calendar.view.MultiDay", alias: "widget.extensible.weekview", dayCount: 7});
Ext.define("Extensible.calendar.view.MultiWeek", {extend: "Extensible.calendar.view.Month", alias: "widget.extensible.multiweekview", weekCount: 2, moveNext: function () {
    return this.moveWeeks(this.weekCount, true)
}, movePrev: function () {
    return this.moveWeeks(-this.weekCount, true)
}});
Ext.define("Extensible.calendar.CalendarPanel", {extend: "Ext.panel.Panel", alias: "widget.extensible.calendarpanel", requires: ["Ext.layout.container.Card", "Extensible.calendar.view.Day", "Extensible.calendar.view.Week", "Extensible.calendar.view.Month", "Extensible.calendar.view.MultiDay", "Extensible.calendar.view.MultiWeek"], enableRecurrence: false, showDayView: true, showMultiDayView: false, showWeekView: true, showMultiWeekView: true, showMonthView: true, showNavBar: true, todayText: "今天", showTodayText: true, showTime: true, readOnly: false, showNavToday: true, showNavJump: true, showNavNextPrev: true, jumpToText: "选择:", goText: "Go", dayText: "日", multiDayText: "{0}天", weekText: "周", multiWeekText: "{0}周", monthText: "月", editModal: false, enableEditDetails: true, layout: {type: "card", deferredRender: true}, startDate: new Date(), initComponent: function () {
    this.tbar = {cls: "ext-cal-toolbar", border: true, items: []};
    this.viewCount = 0;
    var b = (this.multiDayViewCfg && this.multiDayViewCfg.dayCount) || 3, g = (this.multiWeekViewCfg && this.multiWeekViewCfg.weekCount) || 2;
    if (this.showNavToday) {
        this.tbar.items.push({id: this.id + "-tb-today", text: this.todayText, handler: this.onTodayClick, scope: this})
    }
    if (this.showNavNextPrev) {
        this.tbar.items.push({id: this.id + "-tb-prev", handler: this.onPrevClick, scope: this, iconCls: "x-tbar-page-prev"});
        this.tbar.items.push({id: this.id + "-tb-next", handler: this.onNextClick, scope: this, iconCls: "x-tbar-page-next"})
    }
    if (this.showNavJump) {
        this.tbar.items.push(this.jumpToText);
        this.tbar.items.push({id: this.id + "-tb-jump-dt", xtype: "datefield", width: 120, showToday: false,format:'m/d/Y'});
        this.tbar.items.push({id: this.id + "-tb-jump", text: this.goText, handler: this.onJumpClick, scope: this})
    }
    this.tbar.items.push("->");
    if (this.showDayView) {
        this.tbar.items.push({id: this.id + "-tb-day", text: this.dayText, handler: this.onDayNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++
    }
    if (this.showMultiDayView) {
        var i = Ext.String.format(this.getMultiDayText(b), b);
        this.tbar.items.push({id: this.id + "-tb-multiday", text: i, handler: this.onMultiDayNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++
    }
    if (this.showWeekView) {
        this.tbar.items.push({id: this.id + "-tb-week", text: this.weekText, handler: this.onWeekNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++
    }
    if (this.showMultiWeekView) {
        var i = Ext.String.format(this.getMultiWeekText(g), g);
        this.tbar.items.push({id: this.id + "-tb-multiweek", text: i, handler: this.onMultiWeekNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++
    }
    if (this.showMonthView || this.viewCount == 0) {
        this.tbar.items.push({id: this.id + "-tb-month", text: this.monthText, handler: this.onMonthNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++;
        this.showMonthView = true
    }
    var h = this.viewCount - 1;
    this.activeItem = this.activeItem === undefined ? h : (this.activeItem > h ? h : this.activeItem);
    if (this.showNavBar === false) {
        delete this.tbar;
        this.addCls("x-calendar-nonav")
    }
    this.callParent(arguments);
    this.addEvents({eventadd: true, eventupdate: true, beforeeventdelete: true, eventdelete: true, eventcancel: true, viewchange: true, editdetails: true});
    this.addCls("x-cal-panel");
    if (this.eventStore) {
        this.store = this.eventStore;
        delete this.eventStore
    }
    this.setStore(this.store);
    var k = {showToday: this.showToday, todayText: this.todayText, showTodayText: this.showTodayText, showTime: this.showTime, readOnly: this.readOnly, enableRecurrence: this.enableRecurrence, store: this.store, calendarStore: this.calendarStore, editModal: this.editModal, enableEditDetails: this.enableEditDetails, ownerCalendarPanel: this};
    if (this.showDayView) {
        var f = Ext.apply({xtype: "extensible.dayview", title: this.dayText}, k);
        f = Ext.apply(Ext.apply(f, this.viewConfig), this.dayViewCfg);
        f.id = this.id + "-day";
        this.initEventRelay(f);
        this.add(f)
    }
    if (this.showMultiDayView) {
        var a = Ext.apply({xtype: "extensible.multidayview", title: this.getMultiDayText(b)}, k);
        a = Ext.apply(Ext.apply(a, this.viewConfig), this.multiDayViewCfg);
        a.id = this.id + "-multiday";
        this.initEventRelay(a);
        this.add(a)
    }
    if (this.showWeekView) {
        var l = Ext.applyIf({xtype: "extensible.weekview", title: this.weekText}, k);
        l = Ext.apply(Ext.apply(l, this.viewConfig), this.weekViewCfg);
        l.id = this.id + "-week";
        this.initEventRelay(l);
        this.add(l)
    }
    if (this.showMultiWeekView) {
        var e = Ext.applyIf({xtype: "extensible.multiweekview", title: this.getMultiWeekText(g)}, k);
        e = Ext.apply(Ext.apply(e, this.viewConfig), this.multiWeekViewCfg);
        e.id = this.id + "-multiweek";
        this.initEventRelay(e);
        this.add(e)
    }
    if (this.showMonthView) {
        var c = Ext.applyIf({xtype: "extensible.monthview", title: this.monthText, listeners: {weekclick: {fn: function (n, m) {
            this.showWeek(m)
        }, scope: this}}}, k);
        c = Ext.apply(Ext.apply(c, this.viewConfig), this.monthViewCfg);
        c.id = this.id + "-month";
        this.initEventRelay(c);
        this.add(c)
    }
    this.add(Ext.applyIf({xtype: "extensible.eventeditform", id: this.id + "-edit", calendarStore: this.calendarStore, enableRecurrence: this.enableRecurrence, listeners: {eventadd: {scope: this, fn: this.onEventAdd}, eventupdate: {scope: this, fn: this.onEventUpdate}, eventdelete: {scope: this, fn: this.onEventDelete}, eventcancel: {scope: this, fn: this.onEventCancel}}}, this.editViewCfg))
}, initEventRelay: function (a) {
    a.listeners = a.listeners || {};
    a.listeners.afterrender = {fn: function (b) {
        this.relayEvents(b, ["eventsrendered", "eventclick", "dayclick", "eventover", "eventout", "beforedatechange", "datechange", "rangeselect", "beforeeventmove", "eventmove", "initdrag", "dayover", "dayout", "beforeeventresize", "eventresize", "eventadd", "eventupdate", "beforeeventdelete", "eventdelete", "eventcancel"]);
        b.on("editdetails", this.onEditDetails, this)
    }, scope: this, single: true}
}, afterRender: function () {
    this.callParent(arguments);
    this.body.addCls("x-cal-body");
    this.updateNavState();
    this.setActiveView()
}, getMultiDayText: function (a) {
    return this.multiDayText
}, getMultiWeekText: function (a) {
    return this.multiWeekText
}, setStore: function (a, b) {
    var c = this.store;
    if (!b && c) {
        c.un("write", this.onWrite, this)
    }
    if (a) {
        a.on("write", this.onWrite, this)
    }
    this.store = a
}, onStoreAdd: function (c, b, a) {
    this.hideEditForm()
}, onStoreUpdate: function (b, c, a) {
    if (a == Ext.data.Record.COMMIT) {
        this.hideEditForm()
    }
}, onStoreRemove: function (a, b) {
    this.hideEditForm()
}, onWrite: function (b, a) {
    var c = a.records[0];
    switch (a.action) {
        case"create":
            this.onStoreAdd(b, c);
            break;
        case"update":
            this.onStoreUpdate(b, c, Ext.data.Record.COMMIT);
            break;
        case"destroy":
            this.onStoreRemove(b, c);
            break
    }
}, onEditDetails: function (b, c, a) {
    if (this.fireEvent("editdetails", this, b, c, a) !== false) {
        this.showEditForm(c)
    }
}, save: function () {
    if (!this.store.autoSync) {
        this.store.sync()
    }
}, onEventAdd: function (a, b) {
    if (!b.store) {
        this.store.add(b);
        this.save()
    }
    this.fireEvent("eventadd", this, b)
}, onEventUpdate: function (a, b) {
    this.save();
    this.fireEvent("eventupdate", this, b)
}, onEventDelete: function (a, b) {
    this.store.remove(b);
    this.save();
    this.fireEvent("eventdelete", this, b)
}, onEventCancel: function (a, b) {
    this.hideEditForm();
    this.fireEvent("eventcancel", this, b)
}, showEditForm: function (a) {
    this.preEditView = this.layout.getActiveItem().id;
    this.setActiveView(this.id + "-edit");
    this.layout.getActiveItem().loadRecord(a);
    return this
}, hideEditForm: function () {
    if (this.preEditView) {
        this.setActiveView(this.preEditView);
        delete this.preEditView
    }
    return this
}, setActiveView: function (g, a) {
    var f = this, e = f.layout, b = f.id + "-edit", c;
    if (a) {
        f.startDate = a
    }
    if (g !== e.getActiveItem().id) {
        c = f.getDockedItems("toolbar")[0];
        if (c) {
            c[g === b ? "hide" : "show"]()
        }
        e.setActiveItem(g || f.activeItem);
        f.doComponentLayout();
        f.activeView = e.getActiveItem();
        if (g !== b) {
            if (g && g !== f.preEditView) {
                e.activeItem.setStartDate(f.startDate, true)
            }
            f.updateNavState()
        }
        f.fireViewChange()
    }
}, fireViewChange: function () {
    if (this.layout && this.layout.getActiveItem) {
        var a = this.layout.getActiveItem(), b = Ext.Date.clone;
        if (a) {
            if (a.getViewBounds) {
                var c = a.getViewBounds(), e = {activeDate: b(a.getStartDate()), viewStart: b(c.start), viewEnd: b(c.end)}
            }
            if (a.dismissEventEditor) {
                a.dismissEventEditor()
            }
            this.fireEvent("viewchange", this, a, e)
        }
    }
}, updateNavState: function () {
    var b = this, e = b.layout.activeItem;
    if (e && b.showNavBar !== false) {
        var c = e.id.split(b.id + "-")[1], a = Ext.getCmp(b.id + "-tb-" + c);
        if (b.showNavToday) {
            Ext.getCmp(b.id + "-tb-today").setDisabled(e.isToday())
        }
        a.toggle(true)
    }
}, setStartDate: function (a) {
    Extensible.log("setStartDate (CalendarPanel");
    this.startDate = a;
    this.layout.activeItem.setStartDate(a, true);
    this.updateNavState();
    this.fireViewChange();
    return this
}, showWeek: function (a) {
    this.setActiveView(this.id + "-week", a)
}, onTodayClick: function () {
    this.startDate = this.layout.activeItem.moveToday(true);
    this.updateNavState();
    this.fireViewChange()
}, onJumpClick: function () {
    var a = Ext.getCmp(this.id + "-tb-jump-dt").getValue();
    if (a !== "") {
        this.startDate = this.layout.activeItem.moveTo(a, true);
        this.updateNavState();
        this.fireViewChange()
    }
}, onPrevClick: function () {
    this.startDate = this.layout.activeItem.movePrev(true);
    this.updateNavState();
    this.fireViewChange()
}, onNextClick: function () {
    this.startDate = this.layout.activeItem.moveNext(true);
    this.updateNavState();
    this.fireViewChange()
}, onDayNavClick: function () {
    this.setActiveView(this.id + "-day")
}, onMultiDayNavClick: function () {
    this.setActiveView(this.id + "-multiday")
}, onWeekNavClick: function () {
    this.setActiveView(this.id + "-week")
}, onMultiWeekNavClick: function () {
    this.setActiveView(this.id + "-multiweek")
}, onMonthNavClick: function () {
    this.setActiveView(this.id + "-month")
}, getActiveView: function () {
    return this.layout.activeItem
}});