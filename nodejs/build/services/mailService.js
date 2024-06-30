"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _nodeMailer = _interopRequireDefault(require("../config/nodeMailer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var notifyOrderPlaceSuccess = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var _data$resTime$split, _data$resTime$split2, hours, minutes, date, newHours, newMinutes, newResTime;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _data$resTime$split = data.resTime.split(":"), _data$resTime$split2 = _slicedToArray(_data$resTime$split, 2), hours = _data$resTime$split2[0], minutes = _data$resTime$split2[1];
          date = new Date();
          date.setHours(parseInt(hours));
          date.setMinutes(parseInt(minutes));

          // Add 15 minutes
          date.setMinutes(date.getMinutes() + 15);

          // Convert back to a string
          newHours = date.getHours().toString().padStart(2, "0");
          newMinutes = date.getMinutes().toString().padStart(2, "0");
          newResTime = "".concat(newHours, ":").concat(newMinutes);
          _context.next = 10;
          return _nodeMailer["default"].sendMail({
            from: '"VŨ THÙY LINH" <vuthuylinh23082002@gmail.com>',
            to: "".concat(data.email),
            subject: "RESERVATION CONFIRMATION",
            text: "Reservation Confirmation",
            html: "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>Reservation Confirmation</title>\n      <style>\n        body {\n          font-family: Arial, sans-serif;\n          background-color: #f4f4f4;\n          margin: 0;\n          padding: 0;\n        }\n        .container {\n          max-width: 600px;\n          margin: 50px auto;\n          background-color: white;\n          padding: 20px;\n          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n          border-radius: 8px;\n        }\n        .header {\n          text-align: center;\n          border-bottom: 1px solid #ddd;\n          padding-bottom: 20px;\n        }\n        .header h1 {\n          margin: 0;\n          font-size: 24px;\n          color: #333;\n        }\n        .header p {\n          margin: 5px 0;\n          font-size: 14px;\n          color: #666;\n        }\n        .header a {\n          color: #007bff;\n          text-decoration: none;\n        }\n        .content {\n          padding: 20px  0;\n        }\n        .info {\n          display: flex;\n          flex-direction: row;\n          justify-content: space-between;\n          align-items: center;\n        }\n        .details {\n          display: flex;\n          flex-direction: column;\n           margin-right: 20px;\n        }\n           .details div {\n        display: flex;\n        align-items: center;\n        margin-bottom: 10px;\n      }\n        .details img {\n          margin-right: 10px;\n        }\n        .confirmed {\n          text-align: center;\n          color: green;\n          flex-shrink: 0;\n        }\n        .confirmed img {\n          display: block;\n          margin: 0 auto 5px;\n          width: 72px;\n          height: 72px;\n          color: #54ad7a;\n        }\n        .footer {\n          border-top: 1px solid #ddd;\n          padding-top: 20px;\n          text-align: center;\n          font-size: 14px;\n          color: #666;\n        }\n      </style>\n    </head>\n    <body>\n      <div class=\"container\">\n        <div class=\"header\">\n          <h1>HOT POT</h1>\n          <p>19, Nguyen An Ninh, Hoang Mai, Ha Noi, +441592261635</p>\n          <p>\n            <a href=\"https://www.facebook.com/weareoneEXO\">www.facebook.com/weareoneEXO</a>\n          </p>\n          <p>\n            <a href=\"#\">Add to Calendar</a> | <a href=\"#\">Cancel Booking</a>\n          </p>\n        </div>\n        <div class=\"content\">\n          <div class=\"info\">\n            <div class=\"details\">\n              <div>\n                <img\n                  src=\"https://img.icons8.com/ios-filled/50/000000/user-male-circle.png\"\n                  alt=\"User Icon\"\n                  width=\"24\"\n                  height=\"24\"\n                />\n                <span>".concat(data.fullName, "</span>\n              </div>\n              <div>\n                <img\n                  src=\"https://img.icons8.com/ios-filled/50/000000/calendar.png\"\n                  alt=\"Calendar Icon\"\n                  width=\"24\"\n                  height=\"24\"\n                />\n                <span>").concat(data.resDate, "</span>\n              </div>\n              <div>\n                <img\n                  src=\"https://img.icons8.com/ios-filled/50/000000/clock.png\"\n                  alt=\"Clock Icon\"\n                  width=\"24\"\n                  height=\"24\"\n                />\n                <span>").concat(data.resTime, "</span>\n              </div>\n            </div>\n            <div class=\"confirmed\">\n              <img\n                src=\"https://img.icons8.com/?size=100&id=63312&format=png&color=000000\"\n                alt=\"Confirmed Icon\"\n              />\n              <span>Confirmed</span><br />\n              <span>").concat(data.id, "</span>\n            </div>\n          </div>\n          <p>\n            Your table is booked till ").concat(newResTime, ". Tables are kept for 15 min after\n            reservation time. For more information please call us on +441592261635\n            or email\n            <a href=\"mailto:vuthuylinh23082002@gmail.com\">vuthuylinh23082002@gmail.com</a>\n          </p>\n          <p>\n            Should your plans change, please let us know. We look forward to\n            serving you.\n          </p>\n        </div>\n        <div class=\"footer\">\n          <p>Have a nice day.</p>\n        </div>\n      </div>\n    </body>\n    </html>\n    ")
          });
        case 10:
          return _context.abrupt("return", _context.sent);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function notifyOrderPlaceSuccess(_x) {
    return _ref.apply(this, arguments);
  };
}();
var notifyOrderCanceled = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _nodeMailer["default"].sendMail({
            from: '"VŨ THÙY LINH" <vuthuylinh23082002@gmail.com>',
            to: "".concat(data.email),
            subject: "RESERVATION CANCELED",
            text: "Reservation Canceled",
            html: "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>Reservation Confirmation</title>\n      <style>\n        body {\n          font-family: Arial, sans-serif;\n          background-color: #f4f4f4;\n          margin: 0;\n          padding: 0;\n        }\n        .container {\n          max-width: 600px;\n          margin: 50px auto;\n          background-color: white;\n          padding: 20px;\n          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n          border-radius: 8px;\n        }\n        .header {\n          text-align: center;\n          border-bottom: 1px solid #ddd;\n          padding-bottom: 20px;\n        }\n        .header h1 {\n          margin: 0;\n          font-size: 24px;\n          color: #333;\n        }\n        .header p {\n          margin: 5px 0;\n          font-size: 14px;\n          color: #666;\n        }\n        .header a {\n          color: #007bff;\n          text-decoration: none;\n        }\n        .content {\n          padding: 20px  0;\n        }\n        .info {\n          display: flex;\n          flex-direction: row;\n          justify-content: space-between;\n          align-items: center;\n        }\n        .details {\n          display: flex;\n          flex-direction: column;\n        }\n          .details div {\n        display: flex;\n        align-items: center;\n        margin-bottom: 10px;\n      }\n        .details img {\n          margin-right: 10px;\n        }\n        .confirmed {\n          text-align: center;\n          color: rgb(176, 53, 53;\n          flex-shrink: 0;\n        }\n        .confirmed img {\n          display: block;\n          margin: 0 auto 5px;\n          width: 72px;\n          height: 72px;\n        }\n        .footer {\n          border-top: 1px solid #ddd;\n          padding-top: 20px;\n          text-align: center;\n          font-size: 14px;\n          color: #666;\n        }\n      </style>\n    </head>\n    <body>\n      <div class=\"container\">\n        <div class=\"header\">\n          <h1>LEE HOT POT</h1>\n          <p>19, Nguyen An Ninh, Hoang Mai, Ha Noi, +441592261635</p>\n          <p>\n            <a href=\"https://www.facebook.com/weareoneEXO\">www.facebook.com/weareoneEXO</a>\n          </p>\n          <p>\n            <a href=\"#\">Add to Calendar</a> | <a href=\"#\">Cancel Booking</a>\n          </p>\n        </div>\n        <div class=\"content\">\n          <div class=\"info\">\n            <div class=\"details\">\n              <div>\n                <img\n                  src=\"https://img.icons8.com/ios-filled/50/000000/user-male-circle.png\"\n                  alt=\"User Icon\"\n                  width=\"24\"\n                  height=\"24\"\n                />\n                <span>".concat(data.fullName, "</span>\n              </div>\n              <div>\n                <img\n                  src=\"https://img.icons8.com/ios-filled/50/000000/calendar.png\"\n                  alt=\"Calendar Icon\"\n                  width=\"24\"\n                  height=\"24\"\n                />\n                <span>").concat(data.resDate, "</span>\n              </div>\n              <div>\n                <img\n                  src=\"https://img.icons8.com/ios-filled/50/000000/clock.png\"\n                  alt=\"Clock Icon\"\n                  width=\"24\"\n                  height=\"24\"\n                />\n                <span>").concat(data.resTime, "</span>\n              </div>\n            </div>\n            <div class=\"confirmed\">\n              <img\n              src=\"https://img.icons8.com/?size=100&id=WlUYL50DQGDm&format=png&color=000000\"\n              alt=\"Canceled Icon\"\n            />\n              <span>Canceled</span><br />\n              <span>").concat(data.id, "</span>\n            </div>\n          </div>\n          <p>\n            We are sorry to see you go and hope to see you soon. Please feel free\n          to visit\n            <a href=\"mailto:vuthuylinh23082002@gmail.com\">vuthuylinh23082002@gmail.com</a>\n            and book a table at Lee Hotpot Restaurant for another date.\n          </p>\n\n        </div>\n        <div class=\"footer\">\n          <p>Have a nice day.</p>\n        </div>\n      </div>\n    </body>\n    </html>\n    ")
          });
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function notifyOrderCanceled(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = {
  notifyOrderPlaceSuccess: notifyOrderPlaceSuccess,
  notifyOrderCanceled: notifyOrderCanceled
};