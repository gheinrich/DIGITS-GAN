// This code is a subset of Google Tensorflow's Tensorboard
//@license
//Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
//This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE
//The complete set of authors may be found at http://polymer.github.io/AUTHORS
//The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS
//Code distributed by Google as part of the polymer project is also
//subject to an additional IP rights grant found at http://polymer.github.io/PATENTS
//@license
//Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
//This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
//The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
//The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
//Code distributed by Google as part of the polymer project is also
//subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
//@license
//Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
//This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
//The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
//The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
//Code distributed by Google as part of the polymer project is also
//subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
!function () {
window.WebComponents = window.WebComponents || { flags: {} };
var e = 'webcomponents-lite.js', t = document.querySelector('script[src*="' + e + '"]'), n = {};
if (!n.noOpts) {
if (location.search.slice(1).split('&').forEach(function (e) {
var t, r = e.split('=');
r[0] && (t = r[0].match(/wc-(.+)/)) && (n[t[1]] = r[1] || !0);
}), t)
for (var r, o = 0; r = t.attributes[o]; o++)
'src' !== r.name && (n[r.name] = r.value || !0);
if (n.log && n.log.split) {
var i = n.log.split(',');
n.log = {}, i.forEach(function (e) {
n.log[e] = !0;
});
} else
n.log = {};
}
n.register && (window.CustomElements = window.CustomElements || { flags: {} }, window.CustomElements.flags.register = n.register), WebComponents.flags = n;
}(), function (e) {
'use strict';
function t(e) {
return void 0 !== h[e];
}
function n() {
s.call(this), this._isInvalid = !0;
}
function r(e) {
return '' == e && n.call(this), e.toLowerCase();
}
function o(e) {
var t = e.charCodeAt(0);
return t > 32 && 127 > t && -1 == [
34,
35,
60,
62,
63,
96
].indexOf(t) ? e : encodeURIComponent(e);
}
function i(e) {
var t = e.charCodeAt(0);
return t > 32 && 127 > t && -1 == [
34,
35,
60,
62,
96
].indexOf(t) ? e : encodeURIComponent(e);
}
function a(e, a, s) {
function c(e) {
g.push(e);
}
var d = a || 'scheme start', u = 0, l = '', _ = !1, w = !1, g = [];
e:
for (; (e[u - 1] != p || 0 == u) && !this._isInvalid;) {
var b = e[u];
switch (d) {
case 'scheme start':
if (!b || !m.test(b)) {
if (a) {
c('Invalid scheme.');
break e;
}
l = '', d = 'no scheme';
continue;
}
l += b.toLowerCase(), d = 'scheme';
break;
case 'scheme':
if (b && v.test(b))
l += b.toLowerCase();
else {
if (':' != b) {
if (a) {
if (p == b)
break e;
c('Code point not allowed in scheme: ' + b);
break e;
}
l = '', u = 0, d = 'no scheme';
continue;
}
if (this._scheme = l, l = '', a)
break e;
t(this._scheme) && (this._isRelative = !0), d = 'file' == this._scheme ? 'relative' : this._isRelative && s && s._scheme == this._scheme ? 'relative or authority' : this._isRelative ? 'authority first slash' : 'scheme data';
}
break;
case 'scheme data':
'?' == b ? (this._query = '?', d = 'query') : '#' == b ? (this._fragment = '#', d = 'fragment') : p != b && '\t' != b && '\n' != b && '\r' != b && (this._schemeData += o(b));
break;
case 'no scheme':
if (s && t(s._scheme)) {
d = 'relative';
continue;
}
c('Missing scheme.'), n.call(this);
break;
case 'relative or authority':
if ('/' != b || '/' != e[u + 1]) {
c('Expected /, got: ' + b), d = 'relative';
continue;
}
d = 'authority ignore slashes';
break;
case 'relative':
if (this._isRelative = !0, 'file' != this._scheme && (this._scheme = s._scheme), p == b) {
this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = s._query, this._username = s._username, this._password = s._password;
break e;
}
if ('/' == b || '\\' == b)
'\\' == b && c('\\ is an invalid code point.'), d = 'relative slash';
else if ('?' == b)
this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = '?', this._username = s._username, this._password = s._password, d = 'query';
else {
if ('#' != b) {
var y = e[u + 1], E = e[u + 2];
('file' != this._scheme || !m.test(b) || ':' != y && '|' != y || p != E && '/' != E && '\\' != E && '?' != E && '#' != E) && (this._host = s._host, this._port = s._port, this._username = s._username, this._password = s._password, this._path = s._path.slice(), this._path.pop()), d = 'relative path';
continue;
}
this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = s._query, this._fragment = '#', this._username = s._username, this._password = s._password, d = 'fragment';
}
break;
case 'relative slash':
if ('/' != b && '\\' != b) {
'file' != this._scheme && (this._host = s._host, this._port = s._port, this._username = s._username, this._password = s._password), d = 'relative path';
continue;
}
'\\' == b && c('\\ is an invalid code point.'), d = 'file' == this._scheme ? 'file host' : 'authority ignore slashes';
break;
case 'authority first slash':
if ('/' != b) {
c('Expected \'/\', got: ' + b), d = 'authority ignore slashes';
continue;
}
d = 'authority second slash';
break;
case 'authority second slash':
if (d = 'authority ignore slashes', '/' != b) {
c('Expected \'/\', got: ' + b);
continue;
}
break;
case 'authority ignore slashes':
if ('/' != b && '\\' != b) {
d = 'authority';
continue;
}
c('Expected authority, got: ' + b);
break;
case 'authority':
if ('@' == b) {
_ && (c('@ already seen.'), l += '%40'), _ = !0;
for (var L = 0; L < l.length; L++) {
var T = l[L];
if ('\t' != T && '\n' != T && '\r' != T)
if (':' != T || null !== this._password) {
var M = o(T);
null !== this._password ? this._password += M : this._username += M;
} else
this._password = '';
else
c('Invalid whitespace in authority.');
}
l = '';
} else {
if (p == b || '/' == b || '\\' == b || '?' == b || '#' == b) {
u -= l.length, l = '', d = 'host';
continue;
}
l += b;
}
break;
case 'file host':
if (p == b || '/' == b || '\\' == b || '?' == b || '#' == b) {
2 != l.length || !m.test(l[0]) || ':' != l[1] && '|' != l[1] ? 0 == l.length ? d = 'relative path start' : (this._host = r.call(this, l), l = '', d = 'relative path start') : d = 'relative path';
continue;
}
'\t' == b || '\n' == b || '\r' == b ? c('Invalid whitespace in file host.') : l += b;
break;
case 'host':
case 'hostname':
if (':' != b || w) {
if (p == b || '/' == b || '\\' == b || '?' == b || '#' == b) {
if (this._host = r.call(this, l), l = '', d = 'relative path start', a)
break e;
continue;
}
'\t' != b && '\n' != b && '\r' != b ? ('[' == b ? w = !0 : ']' == b && (w = !1), l += b) : c('Invalid code point in host/hostname: ' + b);
} else if (this._host = r.call(this, l), l = '', d = 'port', 'hostname' == a)
break e;
break;
case 'port':
if (/[0-9]/.test(b))
l += b;
else {
if (p == b || '/' == b || '\\' == b || '?' == b || '#' == b || a) {
if ('' != l) {
var N = parseInt(l, 10);
N != h[this._scheme] && (this._port = N + ''), l = '';
}
if (a)
break e;
d = 'relative path start';
continue;
}
'\t' == b || '\n' == b || '\r' == b ? c('Invalid code point in port: ' + b) : n.call(this);
}
break;
case 'relative path start':
if ('\\' == b && c('\'\\\' not allowed in path.'), d = 'relative path', '/' != b && '\\' != b)
continue;
break;
case 'relative path':
if (p != b && '/' != b && '\\' != b && (a || '?' != b && '#' != b))
'\t' != b && '\n' != b && '\r' != b && (l += o(b));
else {
'\\' == b && c('\\ not allowed in relative path.');
var O;
(O = f[l.toLowerCase()]) && (l = O), '..' == l ? (this._path.pop(), '/' != b && '\\' != b && this._path.push('')) : '.' == l && '/' != b && '\\' != b ? this._path.push('') : '.' != l && ('file' == this._scheme && 0 == this._path.length && 2 == l.length && m.test(l[0]) && '|' == l[1] && (l = l[0] + ':'), this._path.push(l)), l = '', '?' == b ? (this._query = '?', d = 'query') : '#' == b && (this._fragment = '#', d = 'fragment');
}
break;
case 'query':
a || '#' != b ? p != b && '\t' != b && '\n' != b && '\r' != b && (this._query += i(b)) : (this._fragment = '#', d = 'fragment');
break;
case 'fragment':
p != b && '\t' != b && '\n' != b && '\r' != b && (this._fragment += b);
}
u++;
}
}
function s() {
this._scheme = '', this._schemeData = '', this._username = '', this._password = null, this._host = '', this._port = '', this._path = [], this._query = '', this._fragment = '', this._isInvalid = !1, this._isRelative = !1;
}
function c(e, t) {
void 0 === t || t instanceof c || (t = new c(String(t))), this._url = e, s.call(this);
var n = e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, '');
a.call(this, n, null, t);
}
var d = !1;
if (!e.forceJURL)
try {
var u = new URL('b', 'http://a');
u.pathname = 'c%20d', d = 'http://a/c%20d' === u.href;
} catch (l) {
}
if (!d) {
var h = Object.create(null);
h.ftp = 21, h.file = 0, h.gopher = 70, h.http = 80, h.https = 443, h.ws = 80, h.wss = 443;
var f = Object.create(null);
f['%2e'] = '.', f['.%2e'] = '..', f['%2e.'] = '..', f['%2e%2e'] = '..';
var p = void 0, m = /[a-zA-Z]/, v = /[a-zA-Z0-9\+\-\.]/;
c.prototype = {
toString: function () {
return this.href;
},
get href() {
if (this._isInvalid)
return this._url;
var e = '';
return ('' != this._username || null != this._password) && (e = this._username + (null != this._password ? ':' + this._password : '') + '@'), this.protocol + (this._isRelative ? '//' + e + this.host : '') + this.pathname + this._query + this._fragment;
},
set href(e) {
s.call(this), a.call(this, e);
},
get protocol() {
return this._scheme + ':';
},
set protocol(e) {
this._isInvalid || a.call(this, e + ':', 'scheme start');
},
get host() {
return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
},
set host(e) {
!this._isInvalid && this._isRelative && a.call(this, e, 'host');
},
get hostname() {
return this._host;
},
set hostname(e) {
!this._isInvalid && this._isRelative && a.call(this, e, 'hostname');
},
get port() {
return this._port;
},
set port(e) {
!this._isInvalid && this._isRelative && a.call(this, e, 'port');
},
get pathname() {
return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
},
set pathname(e) {
!this._isInvalid && this._isRelative && (this._path = [], a.call(this, e, 'relative path start'));
},
get search() {
return this._isInvalid || !this._query || '?' == this._query ? '' : this._query;
},
set search(e) {
!this._isInvalid && this._isRelative && (this._query = '?', '?' == e[0] && (e = e.slice(1)), a.call(this, e, 'query'));
},
get hash() {
return this._isInvalid || !this._fragment || '#' == this._fragment ? '' : this._fragment;
},
set hash(e) {
this._isInvalid || (this._fragment = '#', '#' == e[0] && (e = e.slice(1)), a.call(this, e, 'fragment'));
},
get origin() {
var e;
if (this._isInvalid || !this._scheme)
return '';
switch (this._scheme) {
case 'data':
case 'file':
case 'javascript':
case 'mailto':
return 'null';
}
return e = this.host, e ? this._scheme + '://' + e : '';
}
};
var _ = e.URL;
_ && (c.createObjectURL = function (e) {
return _.createObjectURL.apply(_, arguments);
}, c.revokeObjectURL = function (e) {
_.revokeObjectURL(e);
}), e.URL = c;
}
}(self), 'undefined' == typeof WeakMap && !function () {
var e = Object.defineProperty, t = Date.now() % 1000000000, n = function () {
this.name = '__st' + (1000000000 * Math.random() >>> 0) + (t++ + '__');
};
n.prototype = {
set: function (t, n) {
var r = t[this.name];
return r && r[0] === t ? r[1] = n : e(t, this.name, {
value: [
t,
n
],
writable: !0
}), this;
},
get: function (e) {
var t;
return (t = e[this.name]) && t[0] === e ? t[1] : void 0;
},
'delete': function (e) {
var t = e[this.name];
return t && t[0] === e ? (t[0] = t[1] = void 0, !0) : !1;
},
has: function (e) {
var t = e[this.name];
return t ? t[0] === e : !1;
}
}, window.WeakMap = n;
}(), function (e) {
function t(e) {
b.push(e), g || (g = !0, m(r));
}
function n(e) {
return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e;
}
function r() {
g = !1;
var e = b;
b = [], e.sort(function (e, t) {
return e.uid_ - t.uid_;
});
var t = !1;
e.forEach(function (e) {
var n = e.takeRecords();
o(e), n.length && (e.callback_(n, e), t = !0);
}), t && r();
}
function o(e) {
e.nodes_.forEach(function (t) {
var n = v.get(t);
n && n.forEach(function (t) {
t.observer === e && t.removeTransientObservers();
});
});
}
function i(e, t) {
for (var n = e; n; n = n.parentNode) {
var r = v.get(n);
if (r)
for (var o = 0; o < r.length; o++) {
var i = r[o], a = i.options;
if (n === e || a.subtree) {
var s = t(a);
s && i.enqueue(s);
}
}
}
}
function a(e) {
this.callback_ = e, this.nodes_ = [], this.records_ = [], this.uid_ = ++y;
}
function s(e, t) {
this.type = e, this.target = t, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null;
}
function c(e) {
var t = new s(e.type, e.target);
return t.addedNodes = e.addedNodes.slice(), t.removedNodes = e.removedNodes.slice(), t.previousSibling = e.previousSibling, t.nextSibling = e.nextSibling, t.attributeName = e.attributeName, t.attributeNamespace = e.attributeNamespace, t.oldValue = e.oldValue, t;
}
function d(e, t) {
return E = new s(e, t);
}
function u(e) {
return L ? L : (L = c(E), L.oldValue = e, L);
}
function l() {
E = L = void 0;
}
function h(e) {
return e === L || e === E;
}
function f(e, t) {
return e === t ? e : L && h(e) ? L : null;
}
function p(e, t, n) {
this.observer = e, this.target = t, this.options = n, this.transientObservedNodes = [];
}
if (!e.JsMutationObserver) {
var m, v = new WeakMap();
if (/Trident|Edge/.test(navigator.userAgent))
m = setTimeout;
else if (window.setImmediate)
m = window.setImmediate;
else {
var _ = [], w = String(Math.random());
window.addEventListener('message', function (e) {
if (e.data === w) {
var t = _;
_ = [], t.forEach(function (e) {
e();
});
}
}), m = function (e) {
_.push(e), window.postMessage(w, '*');
};
}
var g = !1, b = [], y = 0;
a.prototype = {
observe: function (e, t) {
if (e = n(e), !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData)
throw new SyntaxError();
var r = v.get(e);
r || v.set(e, r = []);
for (var o, i = 0; i < r.length; i++)
if (r[i].observer === this) {
o = r[i], o.removeListeners(), o.options = t;
break;
}
o || (o = new p(this, e, t), r.push(o), this.nodes_.push(e)), o.addListeners();
},
disconnect: function () {
this.nodes_.forEach(function (e) {
for (var t = v.get(e), n = 0; n < t.length; n++) {
var r = t[n];
if (r.observer === this) {
r.removeListeners(), t.splice(n, 1);
break;
}
}
}, this), this.records_ = [];
},
takeRecords: function () {
var e = this.records_;
return this.records_ = [], e;
}
};
var E, L;
p.prototype = {
enqueue: function (e) {
var n = this.observer.records_, r = n.length;
if (n.length > 0) {
var o = n[r - 1], i = f(o, e);
if (i)
return void (n[r - 1] = i);
} else
t(this.observer);
n[r] = e;
},
addListeners: function () {
this.addListeners_(this.target);
},
addListeners_: function (e) {
var t = this.options;
t.attributes && e.addEventListener('DOMAttrModified', this, !0), t.characterData && e.addEventListener('DOMCharacterDataModified', this, !0), t.childList && e.addEventListener('DOMNodeInserted', this, !0), (t.childList || t.subtree) && e.addEventListener('DOMNodeRemoved', this, !0);
},
removeListeners: function () {
this.removeListeners_(this.target);
},
removeListeners_: function (e) {
var t = this.options;
t.attributes && e.removeEventListener('DOMAttrModified', this, !0), t.characterData && e.removeEventListener('DOMCharacterDataModified', this, !0), t.childList && e.removeEventListener('DOMNodeInserted', this, !0), (t.childList || t.subtree) && e.removeEventListener('DOMNodeRemoved', this, !0);
},
addTransientObserver: function (e) {
if (e !== this.target) {
this.addListeners_(e), this.transientObservedNodes.push(e);
var t = v.get(e);
t || v.set(e, t = []), t.push(this);
}
},
removeTransientObservers: function () {
var e = this.transientObservedNodes;
this.transientObservedNodes = [], e.forEach(function (e) {
this.removeListeners_(e);
for (var t = v.get(e), n = 0; n < t.length; n++)
if (t[n] === this) {
t.splice(n, 1);
break;
}
}, this);
},
handleEvent: function (e) {
switch (e.stopImmediatePropagation(), e.type) {
case 'DOMAttrModified':
var t = e.attrName, n = e.relatedNode.namespaceURI, r = e.target, o = new d('attributes', r);
o.attributeName = t, o.attributeNamespace = n;
var a = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
i(r, function (e) {
return !e.attributes || e.attributeFilter && e.attributeFilter.length && -1 === e.attributeFilter.indexOf(t) && -1 === e.attributeFilter.indexOf(n) ? void 0 : e.attributeOldValue ? u(a) : o;
});
break;
case 'DOMCharacterDataModified':
var r = e.target, o = d('characterData', r), a = e.prevValue;
i(r, function (e) {
return e.characterData ? e.characterDataOldValue ? u(a) : o : void 0;
});
break;
case 'DOMNodeRemoved':
this.addTransientObserver(e.target);
case 'DOMNodeInserted':
var s, c, h = e.target;
'DOMNodeInserted' === e.type ? (s = [h], c = []) : (s = [], c = [h]);
var f = h.previousSibling, p = h.nextSibling, o = d('childList', e.target.parentNode);
o.addedNodes = s, o.removedNodes = c, o.previousSibling = f, o.nextSibling = p, i(e.relatedNode, function (e) {
return e.childList ? o : void 0;
});
}
l();
}
}, e.JsMutationObserver = a, e.MutationObserver || (e.MutationObserver = a, a._isPolyfilled = !0);
}
}(self), 'undefined' == typeof HTMLTemplateElement && !function () {
function e(e) {
switch (e) {
case '&':
return '&amp;';
case '<':
return '&lt;';
case '>':
return '&gt;';
case '\xA0':
return '&nbsp;';
}
}
function t(t) {
return t.replace(a, e);
}
var n = 'template', r = document.implementation.createHTMLDocument('template'), o = !0;
HTMLTemplateElement = function () {
}, HTMLTemplateElement.prototype = Object.create(HTMLElement.prototype), HTMLTemplateElement.decorate = function (e) {
e.content || (e.content = r.createDocumentFragment());
for (var n; n = e.firstChild;)
e.content.appendChild(n);
if (o)
try {
Object.defineProperty(e, 'innerHTML', {
get: function () {
for (var e = '', n = this.content.firstChild; n; n = n.nextSibling)
e += n.outerHTML || t(n.data);
return e;
},
set: function (e) {
for (r.body.innerHTML = e, HTMLTemplateElement.bootstrap(r); this.content.firstChild;)
this.content.removeChild(this.content.firstChild);
for (; r.body.firstChild;)
this.content.appendChild(r.body.firstChild);
},
configurable: !0
});
} catch (i) {
o = !1;
}
}, HTMLTemplateElement.bootstrap = function (e) {
for (var t, r = e.querySelectorAll(n), o = 0, i = r.length; i > o && (t = r[o]); o++)
HTMLTemplateElement.decorate(t);
}, document.addEventListener('DOMContentLoaded', function () {
HTMLTemplateElement.bootstrap(document);
});
var i = document.createElement;
document.createElement = function () {
'use strict';
var e = i.apply(document, arguments);
return 'template' == e.localName && HTMLTemplateElement.decorate(e), e;
};
var a = /[&\u00A0<>]/g;
}(), function (e) {
'use strict';
if (!window.performance) {
var t = Date.now();
window.performance = {
now: function () {
return Date.now() - t;
}
};
}
window.requestAnimationFrame || (window.requestAnimationFrame = function () {
var e = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
return e ? function (t) {
return e(function () {
t(performance.now());
});
} : function (e) {
return window.setTimeout(e, 1000 / 60);
};
}()), window.cancelAnimationFrame || (window.cancelAnimationFrame = function () {
return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (e) {
clearTimeout(e);
};
}());
var n = function () {
var e = document.createEvent('Event');
return e.initEvent('foo', !0, !0), e.preventDefault(), e.defaultPrevented;
}();
if (!n) {
var r = Event.prototype.preventDefault;
Event.prototype.preventDefault = function () {
this.cancelable && (r.call(this), Object.defineProperty(this, 'defaultPrevented', {
get: function () {
return !0;
}
}));
};
}
var o = /Trident/.test(navigator.userAgent);
if ((!window.CustomEvent || o && 'function' != typeof window.CustomEvent) && (window.CustomEvent = function (e, t) {
t = t || {};
var n = document.createEvent('CustomEvent');
return n.initCustomEvent(e, Boolean(t.bubbles), Boolean(t.cancelable), t.detail), n;
}, window.CustomEvent.prototype = window.Event.prototype), !window.Event || o && 'function' != typeof window.Event) {
var i = window.Event;
window.Event = function (e, t) {
t = t || {};
var n = document.createEvent('Event');
return n.initEvent(e, Boolean(t.bubbles), Boolean(t.cancelable)), n;
}, window.Event.prototype = i.prototype;
}
}(window.WebComponents), window.HTMLImports = window.HTMLImports || { flags: {} }, function (e) {
function t(e, t) {
t = t || p, r(function () {
i(e, t);
}, t);
}
function n(e) {
return 'complete' === e.readyState || e.readyState === _;
}
function r(e, t) {
if (n(t))
e && e();
else {
var o = function () {
('complete' === t.readyState || t.readyState === _) && (t.removeEventListener(w, o), r(e, t));
};
t.addEventListener(w, o);
}
}
function o(e) {
e.target.__loaded = !0;
}
function i(e, t) {
function n() {
c == d && e && e({
allImports: s,
loadedImports: u,
errorImports: l
});
}
function r(e) {
o(e), u.push(this), c++, n();
}
function i(e) {
l.push(this), c++, n();
}
var s = t.querySelectorAll('link[rel=import]'), c = 0, d = s.length, u = [], l = [];
if (d)
for (var h, f = 0; d > f && (h = s[f]); f++)
a(h) ? (c++, n()) : (h.addEventListener('load', r), h.addEventListener('error', i));
else
n();
}
function a(e) {
return l ? e.__loaded || e['import'] && 'loading' !== e['import'].readyState : e.__importParsed;
}
function s(e) {
for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
c(t) && d(t);
}
function c(e) {
return 'link' === e.localName && 'import' === e.rel;
}
function d(e) {
var t = e['import'];
t ? o({ target: e }) : (e.addEventListener('load', o), e.addEventListener('error', o));
}
var u = 'import', l = Boolean(u in document.createElement('link')), h = Boolean(window.ShadowDOMPolyfill), f = function (e) {
return h ? window.ShadowDOMPolyfill.wrapIfNeeded(e) : e;
}, p = f(document), m = {
get: function () {
var e = window.HTMLImports.currentScript || document.currentScript || ('complete' !== document.readyState ? document.scripts[document.scripts.length - 1] : null);
return f(e);
},
configurable: !0
};
Object.defineProperty(document, '_currentScript', m), Object.defineProperty(p, '_currentScript', m);
var v = /Trident/.test(navigator.userAgent), _ = v ? 'complete' : 'interactive', w = 'readystatechange';
l && (new MutationObserver(function (e) {
for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
t.addedNodes && s(t.addedNodes);
}).observe(document.head, { childList: !0 }), function () {
if ('loading' === document.readyState)
for (var e, t = document.querySelectorAll('link[rel=import]'), n = 0, r = t.length; r > n && (e = t[n]); n++)
d(e);
}()), t(function (e) {
window.HTMLImports.ready = !0, window.HTMLImports.readyTime = new Date().getTime();
var t = p.createEvent('CustomEvent');
t.initCustomEvent('HTMLImportsLoaded', !0, !0, e), p.dispatchEvent(t);
}), e.IMPORT_LINK_TYPE = u, e.useNative = l, e.rootDocument = p, e.whenReady = t, e.isIE = v;
}(window.HTMLImports), function (e) {
var t = [], n = function (e) {
t.push(e);
}, r = function () {
t.forEach(function (t) {
t(e);
});
};
e.addModule = n, e.initializeModules = r;
}(window.HTMLImports), window.HTMLImports.addModule(function (e) {
var t = /(url\()([^)]*)(\))/g, n = /(@import[\s]+(?!url\())([^;]*)(;)/g, r = {
resolveUrlsInStyle: function (e, t) {
var n = e.ownerDocument, r = n.createElement('a');
return e.textContent = this.resolveUrlsInCssText(e.textContent, t, r), e;
},
resolveUrlsInCssText: function (e, r, o) {
var i = this.replaceUrls(e, o, r, t);
return i = this.replaceUrls(i, o, r, n);
},
replaceUrls: function (e, t, n, r) {
return e.replace(r, function (e, r, o, i) {
var a = o.replace(/["']/g, '');
return n && (a = new URL(a, n).href), t.href = a, a = t.href, r + '\'' + a + '\'' + i;
});
}
};
e.path = r;
}), window.HTMLImports.addModule(function (e) {
var t = {
async: !0,
ok: function (e) {
return e.status >= 200 && e.status < 300 || 304 === e.status || 0 === e.status;
},
load: function (n, r, o) {
var i = new XMLHttpRequest();
return (e.flags.debug || e.flags.bust) && (n += '?' + Math.random()), i.open('GET', n, t.async), i.addEventListener('readystatechange', function (e) {
if (4 === i.readyState) {
var n = null;
try {
var a = i.getResponseHeader('Location');
a && (n = '/' === a.substr(0, 1) ? location.origin + a : a);
} catch (e) {
console.error(e.message);
}
r.call(o, !t.ok(i) && i, i.response || i.responseText, n);
}
}), i.send(), i;
},
loadDocument: function (e, t, n) {
this.load(e, t, n).responseType = 'document';
}
};
e.xhr = t;
}), window.HTMLImports.addModule(function (e) {
var t = e.xhr, n = e.flags, r = function (e, t) {
this.cache = {}, this.onload = e, this.oncomplete = t, this.inflight = 0, this.pending = {};
};
r.prototype = {
addNodes: function (e) {
this.inflight += e.length;
for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
this.require(t);
this.checkDone();
},
addNode: function (e) {
this.inflight++, this.require(e), this.checkDone();
},
require: function (e) {
var t = e.src || e.href;
e.__nodeUrl = t, this.dedupe(t, e) || this.fetch(t, e);
},
dedupe: function (e, t) {
if (this.pending[e])
return this.pending[e].push(t), !0;
return this.cache[e] ? (this.onload(e, t, this.cache[e]), this.tail(), !0) : (this.pending[e] = [t], !1);
},
fetch: function (e, r) {
if (n.load && console.log('fetch', e, r), e)
if (e.match(/^data:/)) {
var o = e.split(','), i = o[0], a = o[1];
a = i.indexOf(';base64') > -1 ? atob(a) : decodeURIComponent(a), setTimeout(function () {
this.receive(e, r, null, a);
}.bind(this), 0);
} else {
var s = function (t, n, o) {
this.receive(e, r, t, n, o);
}.bind(this);
t.load(e, s);
}
else
setTimeout(function () {
this.receive(e, r, { error: 'href must be specified' }, null);
}.bind(this), 0);
},
receive: function (e, t, n, r, o) {
this.cache[e] = r;
for (var i, a = this.pending[e], s = 0, c = a.length; c > s && (i = a[s]); s++)
this.onload(e, i, r, n, o), this.tail();
this.pending[e] = null;
},
tail: function () {
--this.inflight, this.checkDone();
},
checkDone: function () {
this.inflight || this.oncomplete();
}
}, e.Loader = r;
}), window.HTMLImports.addModule(function (e) {
var t = function (e) {
this.addCallback = e, this.mo = new MutationObserver(this.handler.bind(this));
};
t.prototype = {
handler: function (e) {
for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
'childList' === t.type && t.addedNodes.length && this.addedNodes(t.addedNodes);
},
addedNodes: function (e) {
this.addCallback && this.addCallback(e);
for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
t.children && t.children.length && this.addedNodes(t.children);
},
observe: function (e) {
this.mo.observe(e, {
childList: !0,
subtree: !0
});
}
}, e.Observer = t;
}), window.HTMLImports.addModule(function (e) {
function t(e) {
return 'link' === e.localName && e.rel === u;
}
function n(e) {
var t = r(e);
return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(t);
}
function r(e) {
return e.textContent + o(e);
}
function o(e) {
var t = e.ownerDocument;
t.__importedScripts = t.__importedScripts || 0;
var n = e.ownerDocument.baseURI, r = t.__importedScripts ? '-' + t.__importedScripts : '';
return t.__importedScripts++, '\n//# sourceURL=' + n + r + '.js\n';
}
function i(e) {
var t = e.ownerDocument.createElement('style');
return t.textContent = e.textContent, a.resolveUrlsInStyle(t), t;
}
var a = e.path, s = e.rootDocument, c = e.flags, d = e.isIE, u = e.IMPORT_LINK_TYPE, l = 'link[rel=' + u + ']', h = {
documentSelectors: l,
importsSelectors: [
l,
'link[rel=stylesheet]:not([type])',
'style:not([type])',
'script:not([type])',
'script[type="application/javascript"]',
'script[type="text/javascript"]'
].join(','),
map: {
link: 'parseLink',
script: 'parseScript',
style: 'parseStyle'
},
dynamicElements: [],
parseNext: function () {
var e = this.nextToParse();
e && this.parse(e);
},
parse: function (e) {
if (this.isParsed(e))
return void (c.parse && console.log('[%s] is already parsed', e.localName));
var t = this[this.map[e.localName]];
t && (this.markParsing(e), t.call(this, e));
},
parseDynamic: function (e, t) {
this.dynamicElements.push(e), t || this.parseNext();
},
markParsing: function (e) {
c.parse && console.log('parsing', e), this.parsingElement = e;
},
markParsingComplete: function (e) {
e.__importParsed = !0, this.markDynamicParsingComplete(e), e.__importElement && (e.__importElement.__importParsed = !0, this.markDynamicParsingComplete(e.__importElement)), this.parsingElement = null, c.parse && console.log('completed', e);
},
markDynamicParsingComplete: function (e) {
var t = this.dynamicElements.indexOf(e);
t >= 0 && this.dynamicElements.splice(t, 1);
},
parseImport: function (e) {
if (e['import'] = e.__doc, window.HTMLImports.__importsParsingHook && window.HTMLImports.__importsParsingHook(e), e['import'] && (e['import'].__importParsed = !0), this.markParsingComplete(e), e.__resource && !e.__error ? e.dispatchEvent(new CustomEvent('load', { bubbles: !1 })) : e.dispatchEvent(new CustomEvent('error', { bubbles: !1 })), e.__pending)
for (var t; e.__pending.length;)
t = e.__pending.shift(), t && t({ target: e });
this.parseNext();
},
parseLink: function (e) {
t(e) ? this.parseImport(e) : (e.href = e.href, this.parseGeneric(e));
},
parseStyle: function (e) {
var t = e;
e = i(e), t.__appliedElement = e, e.__importElement = t, this.parseGeneric(e);
},
parseGeneric: function (e) {
this.trackElement(e), this.addElementToDocument(e);
},
rootImportForElement: function (e) {
for (var t = e; t.ownerDocument.__importLink;)
t = t.ownerDocument.__importLink;
return t;
},
addElementToDocument: function (e) {
var t = this.rootImportForElement(e.__importElement || e);
t.parentNode.insertBefore(e, t);
},
trackElement: function (e, t) {
var n = this, r = function (o) {
e.removeEventListener('load', r), e.removeEventListener('error', r), t && t(o), n.markParsingComplete(e), n.parseNext();
};
if (e.addEventListener('load', r), e.addEventListener('error', r), d && 'style' === e.localName) {
var o = !1;
if (-1 == e.textContent.indexOf('@import'))
o = !0;
else if (e.sheet) {
o = !0;
for (var i, a = e.sheet.cssRules, s = a ? a.length : 0, c = 0; s > c && (i = a[c]); c++)
i.type === CSSRule.IMPORT_RULE && (o = o && Boolean(i.styleSheet));
}
o && setTimeout(function () {
e.dispatchEvent(new CustomEvent('load', { bubbles: !1 }));
});
}
},
parseScript: function (t) {
var r = document.createElement('script');
r.__importElement = t, r.src = t.src ? t.src : n(t), e.currentScript = t, this.trackElement(r, function (t) {
r.parentNode && r.parentNode.removeChild(r), e.currentScript = null;
}), this.addElementToDocument(r);
},
nextToParse: function () {
return this._mayParse = [], !this.parsingElement && (this.nextToParseInDoc(s) || this.nextToParseDynamic());
},
nextToParseInDoc: function (e, n) {
if (e && this._mayParse.indexOf(e) < 0) {
this._mayParse.push(e);
for (var r, o = e.querySelectorAll(this.parseSelectorsForNode(e)), i = 0, a = o.length; a > i && (r = o[i]); i++)
if (!this.isParsed(r))
return this.hasResource(r) ? t(r) ? this.nextToParseInDoc(r.__doc, r) : r : void 0;
}
return n;
},
nextToParseDynamic: function () {
return this.dynamicElements[0];
},
parseSelectorsForNode: function (e) {
var t = e.ownerDocument || e;
return t === s ? this.documentSelectors : this.importsSelectors;
},
isParsed: function (e) {
return e.__importParsed;
},
needsDynamicParsing: function (e) {
return this.dynamicElements.indexOf(e) >= 0;
},
hasResource: function (e) {
return t(e) && void 0 === e.__doc ? !1 : !0;
}
};
e.parser = h, e.IMPORT_SELECTOR = l;
}), window.HTMLImports.addModule(function (e) {
function t(e) {
return n(e, a);
}
function n(e, t) {
return 'link' === e.localName && e.getAttribute('rel') === t;
}
function r(e) {
return !!Object.getOwnPropertyDescriptor(e, 'baseURI');
}
function o(e, t) {
var n = document.implementation.createHTMLDocument(a);
n._URL = t;
var o = n.createElement('base');
o.setAttribute('href', t), n.baseURI || r(n) || Object.defineProperty(n, 'baseURI', { value: t });
var i = n.createElement('meta');
return i.setAttribute('charset', 'utf-8'), n.head.appendChild(i), n.head.appendChild(o), n.body.innerHTML = e, window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(n), n;
}
var i = e.flags, a = e.IMPORT_LINK_TYPE, s = e.IMPORT_SELECTOR, c = e.rootDocument, d = e.Loader, u = e.Observer, l = e.parser, h = {
documents: {},
documentPreloadSelectors: s,
importsPreloadSelectors: [s].join(','),
loadNode: function (e) {
f.addNode(e);
},
loadSubtree: function (e) {
var t = this.marshalNodes(e);
f.addNodes(t);
},
marshalNodes: function (e) {
return e.querySelectorAll(this.loadSelectorsForNode(e));
},
loadSelectorsForNode: function (e) {
var t = e.ownerDocument || e;
return t === c ? this.documentPreloadSelectors : this.importsPreloadSelectors;
},
loaded: function (e, n, r, a, s) {
if (i.load && console.log('loaded', e, n), n.__resource = r, n.__error = a, t(n)) {
var c = this.documents[e];
void 0 === c && (c = a ? null : o(r, s || e), c && (c.__importLink = n, this.bootDocument(c)), this.documents[e] = c), n.__doc = c;
}
l.parseNext();
},
bootDocument: function (e) {
this.loadSubtree(e), this.observer.observe(e), l.parseNext();
},
loadedAll: function () {
l.parseNext();
}
}, f = new d(h.loaded.bind(h), h.loadedAll.bind(h));
if (h.observer = new u(), !document.baseURI) {
var p = {
get: function () {
var e = document.querySelector('base');
return e ? e.href : window.location.href;
},
configurable: !0
};
Object.defineProperty(document, 'baseURI', p), Object.defineProperty(c, 'baseURI', p);
}
e.importer = h, e.importLoader = f;
}), window.HTMLImports.addModule(function (e) {
var t = e.parser, n = e.importer, r = {
added: function (e) {
for (var r, o, i, a, s = 0, c = e.length; c > s && (a = e[s]); s++)
r || (r = a.ownerDocument, o = t.isParsed(r)), i = this.shouldLoadNode(a), i && n.loadNode(a), this.shouldParseNode(a) && o && t.parseDynamic(a, i);
},
shouldLoadNode: function (e) {
return 1 === e.nodeType && o.call(e, n.loadSelectorsForNode(e));
},
shouldParseNode: function (e) {
return 1 === e.nodeType && o.call(e, t.parseSelectorsForNode(e));
}
};
n.observer.addCallback = r.added.bind(r);
var o = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
}), function (e) {
function t() {
window.HTMLImports.importer.bootDocument(r);
}
var n = e.initializeModules;
e.isIE;
if (!e.useNative) {
n();
var r = e.rootDocument;
'complete' === document.readyState || 'interactive' === document.readyState && !window.attachEvent ? t() : document.addEventListener('DOMContentLoaded', t);
}
}(window.HTMLImports), window.CustomElements = window.CustomElements || { flags: {} }, function (e) {
var t = e.flags, n = [], r = function (e) {
n.push(e);
}, o = function () {
n.forEach(function (t) {
t(e);
});
};
e.addModule = r, e.initializeModules = o, e.hasNative = Boolean(document.registerElement), e.isIE = /Trident/.test(navigator.userAgent), e.useNative = !t.register && e.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
}(window.CustomElements), window.CustomElements.addModule(function (e) {
function t(e, t) {
n(e, function (e) {
return t(e) ? !0 : void r(e, t);
}), r(e, t);
}
function n(e, t, r) {
var o = e.firstElementChild;
if (!o)
for (o = e.firstChild; o && o.nodeType !== Node.ELEMENT_NODE;)
o = o.nextSibling;
for (; o;)
t(o, r) !== !0 && n(o, t, r), o = o.nextElementSibling;
return null;
}
function r(e, n) {
for (var r = e.shadowRoot; r;)
t(r, n), r = r.olderShadowRoot;
}
function o(e, t) {
i(e, t, []);
}
function i(e, t, n) {
if (e = window.wrap(e), !(n.indexOf(e) >= 0)) {
n.push(e);
for (var r, o = e.querySelectorAll('link[rel=' + a + ']'), s = 0, c = o.length; c > s && (r = o[s]); s++)
r['import'] && i(r['import'], t, n);
t(e);
}
}
var a = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : 'none';
e.forDocumentTree = o, e.forSubtree = t;
}), window.CustomElements.addModule(function (e) {
function t(e, t) {
return n(e, t) || r(e, t);
}
function n(t, n) {
return e.upgrade(t, n) ? !0 : void (n && a(t));
}
function r(e, t) {
g(e, function (e) {
return n(e, t) ? !0 : void 0;
});
}
function o(e) {
L.push(e), E || (E = !0, setTimeout(i));
}
function i() {
E = !1;
for (var e, t = L, n = 0, r = t.length; r > n && (e = t[n]); n++)
e();
L = [];
}
function a(e) {
y ? o(function () {
s(e);
}) : s(e);
}
function s(e) {
e.__upgraded__ && !e.__attached && (e.__attached = !0, e.attachedCallback && e.attachedCallback());
}
function c(e) {
d(e), g(e, function (e) {
d(e);
});
}
function d(e) {
y ? o(function () {
u(e);
}) : u(e);
}
function u(e) {
e.__upgraded__ && e.__attached && (e.__attached = !1, e.detachedCallback && e.detachedCallback());
}
function l(e) {
for (var t = e, n = window.wrap(document); t;) {
if (t == n)
return !0;
t = t.parentNode || t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host;
}
}
function h(e) {
if (e.shadowRoot && !e.shadowRoot.__watched) {
w.dom && console.log('watching shadow-root for: ', e.localName);
for (var t = e.shadowRoot; t;)
m(t), t = t.olderShadowRoot;
}
}
function f(e, n) {
if (w.dom) {
var r = n[0];
if (r && 'childList' === r.type && r.addedNodes && r.addedNodes) {
for (var o = r.addedNodes[0]; o && o !== document && !o.host;)
o = o.parentNode;
var i = o && (o.URL || o._URL || o.host && o.host.localName) || '';
i = i.split('/?').shift().split('/').pop();
}
console.group('mutations (%d) [%s]', n.length, i || '');
}
var a = l(e);
n.forEach(function (e) {
'childList' === e.type && (T(e.addedNodes, function (e) {
e.localName && t(e, a);
}), T(e.removedNodes, function (e) {
e.localName && c(e);
}));
}), w.dom && console.groupEnd();
}
function p(e) {
for (e = window.wrap(e), e || (e = window.wrap(document)); e.parentNode;)
e = e.parentNode;
var t = e.__observer;
t && (f(e, t.takeRecords()), i());
}
function m(e) {
if (!e.__observer) {
var t = new MutationObserver(f.bind(this, e));
t.observe(e, {
childList: !0,
subtree: !0
}), e.__observer = t;
}
}
function v(e) {
e = window.wrap(e), w.dom && console.group('upgradeDocument: ', e.baseURI.split('/').pop());
var n = e === window.wrap(document);
t(e, n), m(e), w.dom && console.groupEnd();
}
function _(e) {
b(e, v);
}
var w = e.flags, g = e.forSubtree, b = e.forDocumentTree, y = window.MutationObserver._isPolyfilled && w['throttle-attached'];
e.hasPolyfillMutations = y, e.hasThrottledAttached = y;
var E = !1, L = [], T = Array.prototype.forEach.call.bind(Array.prototype.forEach), M = Element.prototype.createShadowRoot;
M && (Element.prototype.createShadowRoot = function () {
var e = M.call(this);
return window.CustomElements.watchShadow(this), e;
}), e.watchShadow = h, e.upgradeDocumentTree = _, e.upgradeDocument = v, e.upgradeSubtree = r, e.upgradeAll = t, e.attached = a, e.takeRecords = p;
}), window.CustomElements.addModule(function (e) {
function t(t, r) {
if (!t.__upgraded__ && t.nodeType === Node.ELEMENT_NODE) {
var o = t.getAttribute('is'), i = e.getRegisteredDefinition(t.localName) || e.getRegisteredDefinition(o);
if (i && (o && i.tag == t.localName || !o && !i['extends']))
return n(t, i, r);
}
}
function n(t, n, o) {
return a.upgrade && console.group('upgrade:', t.localName), n.is && t.setAttribute('is', n.is), r(t, n), t.__upgraded__ = !0, i(t), o && e.attached(t), e.upgradeSubtree(t, o), a.upgrade && console.groupEnd(), t;
}
function r(e, t) {
Object.__proto__ ? e.__proto__ = t.prototype : (o(e, t.prototype, t['native']), e.__proto__ = t.prototype);
}
function o(e, t, n) {
for (var r = {}, o = t; o !== n && o !== HTMLElement.prototype;) {
for (var i, a = Object.getOwnPropertyNames(o), s = 0; i = a[s]; s++)
r[i] || (Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(o, i)), r[i] = 1);
o = Object.getPrototypeOf(o);
}
}
function i(e) {
e.createdCallback && e.createdCallback();
}
var a = e.flags;
e.upgrade = t, e.upgradeWithDefinition = n, e.implementPrototype = r;
}), window.CustomElements.addModule(function (e) {
function t(t, r) {
var c = r || {};
if (!t)
throw new Error('document.registerElement: first argument `name` must not be empty');
if (t.indexOf('-') < 0)
throw new Error('document.registerElement: first argument (\'name\') must contain a dash (\'-\'). Argument provided was \'' + String(t) + '\'.');
if (o(t))
throw new Error('Failed to execute \'registerElement\' on \'Document\': Registration failed for type \'' + String(t) + '\'. The type name is invalid.');
if (d(t))
throw new Error('DuplicateDefinitionError: a type with name \'' + String(t) + '\' is already registered');
return c.prototype || (c.prototype = Object.create(HTMLElement.prototype)), c.__name = t.toLowerCase(), c.lifecycle = c.lifecycle || {}, c.ancestry = i(c['extends']), a(c), s(c), n(c.prototype), u(c.__name, c), c.ctor = l(c), c.ctor.prototype = c.prototype, c.prototype.constructor = c.ctor, e.ready && _(document), c.ctor;
}
function n(e) {
if (!e.setAttribute._polyfilled) {
var t = e.setAttribute;
e.setAttribute = function (e, n) {
r.call(this, e, n, t);
};
var n = e.removeAttribute;
e.removeAttribute = function (e) {
r.call(this, e, null, n);
}, e.setAttribute._polyfilled = !0;
}
}
function r(e, t, n) {
e = e.toLowerCase();
var r = this.getAttribute(e);
n.apply(this, arguments);
var o = this.getAttribute(e);
this.attributeChangedCallback && o !== r && this.attributeChangedCallback(e, r, o);
}
function o(e) {
for (var t = 0; t < E.length; t++)
if (e === E[t])
return !0;
}
function i(e) {
var t = d(e);
return t ? i(t['extends']).concat([t]) : [];
}
function a(e) {
for (var t, n = e['extends'], r = 0; t = e.ancestry[r]; r++)
n = t.is && t.tag;
e.tag = n || e.__name, n && (e.is = e.__name);
}
function s(e) {
if (!Object.__proto__) {
var t = HTMLElement.prototype;
if (e.is) {
var n = document.createElement(e.tag);
t = Object.getPrototypeOf(n);
}
for (var r, o = e.prototype, i = !1; o;)
o == t && (i = !0), r = Object.getPrototypeOf(o), r && (o.__proto__ = r), o = r;
i || console.warn(e.tag + ' prototype not found in prototype chain for ' + e.is), e['native'] = t;
}
}
function c(e) {
return g(M(e.tag), e);
}
function d(e) {
return e ? L[e.toLowerCase()] : void 0;
}
function u(e, t) {
L[e] = t;
}
function l(e) {
return function () {
return c(e);
};
}
function h(e, t, n) {
return e === T ? f(t, n) : N(e, t);
}
function f(e, t) {
e && (e = e.toLowerCase()), t && (t = t.toLowerCase());
var n = d(t || e);
if (n) {
if (e == n.tag && t == n.is)
return new n.ctor();
if (!t && !n.is)
return new n.ctor();
}
var r;
return t ? (r = f(e), r.setAttribute('is', t), r) : (r = M(e), e.indexOf('-') >= 0 && b(r, HTMLElement), r);
}
function p(e, t) {
var n = e[t];
e[t] = function () {
var e = n.apply(this, arguments);
return w(e), e;
};
}
var m, v = e.isIE, _ = e.upgradeDocumentTree, w = e.upgradeAll, g = e.upgradeWithDefinition, b = e.implementPrototype, y = e.useNative, E = [
'annotation-xml',
'color-profile',
'font-face',
'font-face-src',
'font-face-uri',
'font-face-format',
'font-face-name',
'missing-glyph'
], L = {}, T = 'http://www.w3.org/1999/xhtml', M = document.createElement.bind(document), N = document.createElementNS.bind(document);
m = Object.__proto__ || y ? function (e, t) {
return e instanceof t;
} : function (e, t) {
if (e instanceof t)
return !0;
for (var n = e; n;) {
if (n === t.prototype)
return !0;
n = n.__proto__;
}
return !1;
}, p(Node.prototype, 'cloneNode'), p(document, 'importNode'), v && !function () {
var e = document.importNode;
document.importNode = function () {
var t = e.apply(document, arguments);
if (t.nodeType == t.DOCUMENT_FRAGMENT_NODE) {
var n = document.createDocumentFragment();
return n.appendChild(t), n;
}
return t;
};
}(), document.registerElement = t, document.createElement = f, document.createElementNS = h, e.registry = L, e['instanceof'] = m, e.reservedTagList = E, e.getRegisteredDefinition = d, document.register = document.registerElement;
}), function (e) {
function t() {
i(window.wrap(document)), window.CustomElements.ready = !0;
var e = window.requestAnimationFrame || function (e) {
setTimeout(e, 16);
};
e(function () {
setTimeout(function () {
window.CustomElements.readyTime = Date.now(), window.HTMLImports && (window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime), document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: !0 }));
});
});
}
var n = e.useNative, r = e.initializeModules;
e.isIE;
if (n) {
var o = function () {
};
e.watchShadow = o, e.upgrade = o, e.upgradeAll = o, e.upgradeDocumentTree = o, e.upgradeSubtree = o, e.takeRecords = o, e['instanceof'] = function (e, t) {
return e instanceof t;
};
} else
r();
var i = e.upgradeDocumentTree, a = e.upgradeDocument;
if (window.wrap || (window.ShadowDOMPolyfill ? (window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded, window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded) : window.wrap = window.unwrap = function (e) {
return e;
}), window.HTMLImports && (window.HTMLImports.__importsParsingHook = function (e) {
e['import'] && a(wrap(e['import']));
}), 'complete' === document.readyState || e.flags.eager)
t();
else if ('interactive' !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
var s = window.HTMLImports && !window.HTMLImports.ready ? 'HTMLImportsLoaded' : 'DOMContentLoaded';
window.addEventListener(s, t);
} else
t();
}(window.CustomElements), function (e) {
var t = document.createElement('style');
t.textContent = 'body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n';
var n = document.querySelector('head');
n.insertBefore(t, n.firstChild);
}(window.WebComponents);
(function () {
function resolve() {
document.body.removeAttribute('unresolved');
}
if (window.WebComponents) {
addEventListener('WebComponentsReady', resolve);
} else {
if (document.readyState === 'interactive' || document.readyState === 'complete') {
resolve();
} else {
addEventListener('DOMContentLoaded', resolve);
}
}
}());
window.Polymer = {
Settings: function () {
var user = window.Polymer || {};
location.search.slice(1).split('&').forEach(function (o) {
o = o.split('=');
o[0] && (user[o[0]] = o[1] || true);
});
var wantShadow = user.dom === 'shadow';
var hasShadow = Boolean(Element.prototype.createShadowRoot);
var nativeShadow = hasShadow && !window.ShadowDOMPolyfill;
var useShadow = wantShadow && hasShadow;
var hasNativeImports = Boolean('import' in document.createElement('link'));
var useNativeImports = hasNativeImports;
var useNativeCustomElements = !window.CustomElements || window.CustomElements.useNative;
return {
wantShadow: wantShadow,
hasShadow: hasShadow,
nativeShadow: nativeShadow,
useShadow: useShadow,
useNativeShadow: useShadow && nativeShadow,
useNativeImports: useNativeImports,
useNativeCustomElements: useNativeCustomElements
};
}()
};
(function () {
var userPolymer = window.Polymer;
window.Polymer = function (prototype) {
if (typeof prototype === 'function') {
prototype = prototype.prototype;
}
if (!prototype) {
prototype = {};
}
var factory = desugar(prototype);
prototype = factory.prototype;
var options = { prototype: prototype };
if (prototype.extends) {
options.extends = prototype.extends;
}
Polymer.telemetry._registrate(prototype);
document.registerElement(prototype.is, options);
return factory;
};
var desugar = function (prototype) {
var base = Polymer.Base;
if (prototype.extends) {
base = Polymer.Base._getExtendedPrototype(prototype.extends);
}
prototype = Polymer.Base.chainObject(prototype, base);
prototype.registerCallback();
return prototype.constructor;
};
window.Polymer = Polymer;
if (userPolymer) {
for (var i in userPolymer) {
Polymer[i] = userPolymer[i];
}
}
Polymer.Class = desugar;
}());
Polymer.telemetry = {
registrations: [],
_regLog: function (prototype) {
console.log('[' + prototype.is + ']: registered');
},
_registrate: function (prototype) {
this.registrations.push(prototype);
Polymer.log && this._regLog(prototype);
},
dumpRegistrations: function () {
this.registrations.forEach(this._regLog);
}
};
Object.defineProperty(window, 'currentImport', {
enumerable: true,
configurable: true,
get: function () {
return (document._currentScript || document.currentScript).ownerDocument;
}
});
Polymer.RenderStatus = {
_ready: false,
_callbacks: [],
whenReady: function (cb) {
if (this._ready) {
cb();
} else {
this._callbacks.push(cb);
}
},
_makeReady: function () {
this._ready = true;
this._callbacks.forEach(function (cb) {
cb();
});
this._callbacks = [];
},
_catchFirstRender: function () {
requestAnimationFrame(function () {
Polymer.RenderStatus._makeReady();
});
}
};
if (window.HTMLImports) {
HTMLImports.whenReady(function () {
Polymer.RenderStatus._catchFirstRender();
});
} else {
Polymer.RenderStatus._catchFirstRender();
}
Polymer.ImportStatus = Polymer.RenderStatus;
Polymer.ImportStatus.whenLoaded = Polymer.ImportStatus.whenReady;
Polymer.Base = {
__isPolymerInstance__: true,
_addFeature: function (feature) {
this.extend(this, feature);
},
registerCallback: function () {
this._desugarBehaviors();
this._doBehavior('beforeRegister');
this._registerFeatures();
this._doBehavior('registered');
},
createdCallback: function () {
Polymer.telemetry.instanceCount++;
this.root = this;
this._doBehavior('created');
this._initFeatures();
},
attachedCallback: function () {
Polymer.RenderStatus.whenReady(function () {
this.isAttached = true;
this._doBehavior('attached');
}.bind(this));
},
detachedCallback: function () {
this.isAttached = false;
this._doBehavior('detached');
},
attributeChangedCallback: function (name) {
this._attributeChangedImpl(name);
this._doBehavior('attributeChanged', arguments);
},
_attributeChangedImpl: function (name) {
this._setAttributeToProperty(this, name);
},
extend: function (prototype, api) {
if (prototype && api) {
Object.getOwnPropertyNames(api).forEach(function (n) {
this.copyOwnProperty(n, api, prototype);
}, this);
}
return prototype || api;
},
mixin: function (target, source) {
for (var i in source) {
target[i] = source[i];
}
return target;
},
copyOwnProperty: function (name, source, target) {
var pd = Object.getOwnPropertyDescriptor(source, name);
if (pd) {
Object.defineProperty(target, name, pd);
}
},
_log: console.log.apply.bind(console.log, console),
_warn: console.warn.apply.bind(console.warn, console),
_error: console.error.apply.bind(console.error, console),
_logf: function () {
return this._logPrefix.concat([this.is]).concat(Array.prototype.slice.call(arguments, 0));
}
};
Polymer.Base._logPrefix = function () {
var color = window.chrome || /firefox/i.test(navigator.userAgent);
return color ? [
'%c[%s::%s]:',
'font-weight: bold; background-color:#EEEE00;'
] : ['[%s::%s]:'];
}();
Polymer.Base.chainObject = function (object, inherited) {
if (object && inherited && object !== inherited) {
if (!Object.__proto__) {
object = Polymer.Base.extend(Object.create(inherited), object);
}
object.__proto__ = inherited;
}
return object;
};
Polymer.Base = Polymer.Base.chainObject(Polymer.Base, HTMLElement.prototype);
if (window.CustomElements) {
Polymer.instanceof = CustomElements.instanceof;
} else {
Polymer.instanceof = function (obj, ctor) {
return obj instanceof ctor;
};
}
Polymer.isInstance = function (obj) {
return Boolean(obj && obj.__isPolymerInstance__);
};
Polymer.telemetry.instanceCount = 0;
(function () {
var modules = {};
var lcModules = {};
var findModule = function (id) {
return modules[id] || lcModules[id.toLowerCase()];
};
var DomModule = function () {
return document.createElement('dom-module');
};
DomModule.prototype = Object.create(HTMLElement.prototype);
Polymer.Base.extend(DomModule.prototype, {
constructor: DomModule,
createdCallback: function () {
this.register();
},
register: function (id) {
var id = id || this.id || this.getAttribute('name') || this.getAttribute('is');
if (id) {
this.id = id;
modules[id] = this;
lcModules[id.toLowerCase()] = this;
}
},
import: function (id, selector) {
if (id) {
var m = findModule(id);
if (!m) {
forceDocumentUpgrade();
m = findModule(id);
}
if (m && selector) {
m = m.querySelector(selector);
}
return m;
}
}
});
var cePolyfill = window.CustomElements && !CustomElements.useNative;
document.registerElement('dom-module', DomModule);
function forceDocumentUpgrade() {
if (cePolyfill) {
var script = document._currentScript || document.currentScript;
var doc = script && script.ownerDocument || document;
if (doc) {
CustomElements.upgradeAll(doc);
}
}
}
}());
Polymer.Base._addFeature({
_prepIs: function () {
if (!this.is) {
var module = (document._currentScript || document.currentScript).parentNode;
if (module.localName === 'dom-module') {
var id = module.id || module.getAttribute('name') || module.getAttribute('is');
this.is = id;
}
}
if (this.is) {
this.is = this.is.toLowerCase();
}
}
});
Polymer.Base._addFeature({
behaviors: [],
_desugarBehaviors: function () {
if (this.behaviors.length) {
this.behaviors = this._desugarSomeBehaviors(this.behaviors);
}
},
_desugarSomeBehaviors: function (behaviors) {
behaviors = this._flattenBehaviorsList(behaviors);
for (var i = behaviors.length - 1; i >= 0; i--) {
this._mixinBehavior(behaviors[i]);
}
return behaviors;
},
_flattenBehaviorsList: function (behaviors) {
var flat = [];
behaviors.forEach(function (b) {
if (b instanceof Array) {
flat = flat.concat(this._flattenBehaviorsList(b));
} else if (b) {
flat.push(b);
} else {
this._warn(this._logf('_flattenBehaviorsList', 'behavior is null, check for missing or 404 import'));
}
}, this);
return flat;
},
_mixinBehavior: function (b) {
Object.getOwnPropertyNames(b).forEach(function (n) {
switch (n) {
case 'hostAttributes':
case 'registered':
case 'properties':
case 'observers':
case 'listeners':
case 'created':
case 'attached':
case 'detached':
case 'attributeChanged':
case 'configure':
case 'ready':
break;
default:
if (!this.hasOwnProperty(n)) {
this.copyOwnProperty(n, b, this);
}
break;
}
}, this);
},
_prepBehaviors: function () {
this._prepFlattenedBehaviors(this.behaviors);
},
_prepFlattenedBehaviors: function (behaviors) {
for (var i = 0, l = behaviors.length; i < l; i++) {
this._prepBehavior(behaviors[i]);
}
this._prepBehavior(this);
},
_doBehavior: function (name, args) {
this.behaviors.forEach(function (b) {
this._invokeBehavior(b, name, args);
}, this);
this._invokeBehavior(this, name, args);
},
_invokeBehavior: function (b, name, args) {
var fn = b[name];
if (fn) {
fn.apply(this, args || Polymer.nar);
}
},
_marshalBehaviors: function () {
this.behaviors.forEach(function (b) {
this._marshalBehavior(b);
}, this);
this._marshalBehavior(this);
}
});
Polymer.Base._addFeature({
_getExtendedPrototype: function (tag) {
return this._getExtendedNativePrototype(tag);
},
_nativePrototypes: {},
_getExtendedNativePrototype: function (tag) {
var p = this._nativePrototypes[tag];
if (!p) {
var np = this.getNativePrototype(tag);
p = this.extend(Object.create(np), Polymer.Base);
this._nativePrototypes[tag] = p;
}
return p;
},
getNativePrototype: function (tag) {
return Object.getPrototypeOf(document.createElement(tag));
}
});
Polymer.Base._addFeature({
_prepConstructor: function () {
this._factoryArgs = this.extends ? [
this.extends,
this.is
] : [this.is];
var ctor = function () {
return this._factory(arguments);
};
if (this.hasOwnProperty('extends')) {
ctor.extends = this.extends;
}
Object.defineProperty(this, 'constructor', {
value: ctor,
writable: true,
configurable: true
});
ctor.prototype = this;
},
_factory: function (args) {
var elt = document.createElement.apply(document, this._factoryArgs);
if (this.factoryImpl) {
this.factoryImpl.apply(elt, args);
}
return elt;
}
});
Polymer.nob = Object.create(null);
Polymer.Base._addFeature({
properties: {},
getPropertyInfo: function (property) {
var info = this._getPropertyInfo(property, this.properties);
if (!info) {
this.behaviors.some(function (b) {
return info = this._getPropertyInfo(property, b.properties);
}, this);
}
return info || Polymer.nob;
},
_getPropertyInfo: function (property, properties) {
var p = properties && properties[property];
if (typeof p === 'function') {
p = properties[property] = { type: p };
}
if (p) {
p.defined = true;
}
return p;
}
});
Polymer.CaseMap = {
_caseMap: {},
dashToCamelCase: function (dash) {
var mapped = Polymer.CaseMap._caseMap[dash];
if (mapped) {
return mapped;
}
if (dash.indexOf('-') < 0) {
return Polymer.CaseMap._caseMap[dash] = dash;
}
return Polymer.CaseMap._caseMap[dash] = dash.replace(/-([a-z])/g, function (m) {
return m[1].toUpperCase();
});
},
camelToDashCase: function (camel) {
var mapped = Polymer.CaseMap._caseMap[camel];
if (mapped) {
return mapped;
}
return Polymer.CaseMap._caseMap[camel] = camel.replace(/([a-z][A-Z])/g, function (g) {
return g[0] + '-' + g[1].toLowerCase();
});
}
};
Polymer.Base._addFeature({
_prepAttributes: function () {
this._aggregatedAttributes = {};
},
_addHostAttributes: function (attributes) {
if (attributes) {
this.mixin(this._aggregatedAttributes, attributes);
}
},
_marshalHostAttributes: function () {
this._applyAttributes(this, this._aggregatedAttributes);
},
_applyAttributes: function (node, attr$) {
for (var n in attr$) {
if (!this.hasAttribute(n) && n !== 'class') {
this.serializeValueToAttribute(attr$[n], n, this);
}
}
},
_marshalAttributes: function () {
this._takeAttributesToModel(this);
},
_takeAttributesToModel: function (model) {
for (var i = 0, l = this.attributes.length; i < l; i++) {
this._setAttributeToProperty(model, this.attributes[i].name);
}
},
_setAttributeToProperty: function (model, attrName) {
if (!this._serializing) {
var propName = Polymer.CaseMap.dashToCamelCase(attrName);
var info = this.getPropertyInfo(propName);
if (info.defined || this._propertyEffects && this._propertyEffects[propName]) {
var val = this.getAttribute(attrName);
model[propName] = this.deserialize(val, info.type);
}
}
},
_serializing: false,
reflectPropertyToAttribute: function (name) {
this._serializing = true;
this.serializeValueToAttribute(this[name], Polymer.CaseMap.camelToDashCase(name));
this._serializing = false;
},
serializeValueToAttribute: function (value, attribute, node) {
var str = this.serialize(value);
(node || this)[str === undefined ? 'removeAttribute' : 'setAttribute'](attribute, str);
},
deserialize: function (value, type) {
switch (type) {
case Number:
value = Number(value);
break;
case Boolean:
value = value !== null;
break;
case Object:
try {
value = JSON.parse(value);
} catch (x) {
}
break;
case Array:
try {
value = JSON.parse(value);
} catch (x) {
value = null;
console.warn('Polymer::Attributes: couldn`t decode Array as JSON');
}
break;
case Date:
value = new Date(value);
break;
case String:
default:
break;
}
return value;
},
serialize: function (value) {
switch (typeof value) {
case 'boolean':
return value ? '' : undefined;
case 'object':
if (value instanceof Date) {
return value;
} else if (value) {
try {
return JSON.stringify(value);
} catch (x) {
return '';
}
}
default:
return value != null ? value : undefined;
}
}
});
Polymer.Base._addFeature({
_setupDebouncers: function () {
this._debouncers = {};
},
debounce: function (jobName, callback, wait) {
return this._debouncers[jobName] = Polymer.Debounce.call(this, this._debouncers[jobName], callback, wait);
},
isDebouncerActive: function (jobName) {
var debouncer = this._debouncers[jobName];
return debouncer && debouncer.finish;
},
flushDebouncer: function (jobName) {
var debouncer = this._debouncers[jobName];
if (debouncer) {
debouncer.complete();
}
},
cancelDebouncer: function (jobName) {
var debouncer = this._debouncers[jobName];
if (debouncer) {
debouncer.stop();
}
}
});
Polymer.version = '1.2.1';
Polymer.Base._addFeature({
_registerFeatures: function () {
this._prepIs();
this._prepAttributes();
this._prepBehaviors();
this._prepConstructor();
},
_prepBehavior: function (b) {
this._addHostAttributes(b.hostAttributes);
},
_marshalBehavior: function (b) {
},
_initFeatures: function () {
this._marshalHostAttributes();
this._setupDebouncers();
this._marshalBehaviors();
}
});
Polymer.Base._addFeature({
_prepTemplate: function () {
this._template = this._template || Polymer.DomModule.import(this.is, 'template');
if (this._template && this._template.hasAttribute('is')) {
this._warn(this._logf('_prepTemplate', 'top-level Polymer template ' + 'must not be a type-extension, found', this._template, 'Move inside simple <template>.'));
}
if (this._template && !this._template.content && HTMLTemplateElement.bootstrap) {
HTMLTemplateElement.decorate(this._template);
HTMLTemplateElement.bootstrap(this._template.content);
}
},
_stampTemplate: function () {
if (this._template) {
this.root = this.instanceTemplate(this._template);
}
},
instanceTemplate: function (template) {
var dom = document.importNode(template._content || template.content, true);
return dom;
}
});
(function () {
var baseAttachedCallback = Polymer.Base.attachedCallback;
Polymer.Base._addFeature({
_hostStack: [],
ready: function () {
},
_pushHost: function (host) {
this.dataHost = host = host || Polymer.Base._hostStack[Polymer.Base._hostStack.length - 1];
if (host && host._clients) {
host._clients.push(this);
}
this._beginHost();
},
_beginHost: function () {
Polymer.Base._hostStack.push(this);
if (!this._clients) {
this._clients = [];
}
},
_popHost: function () {
Polymer.Base._hostStack.pop();
},
_tryReady: function () {
if (this._canReady()) {
this._ready();
}
},
_canReady: function () {
return !this.dataHost || this.dataHost._clientsReadied;
},
_ready: function () {
this._beforeClientsReady();
this._setupRoot();
this._readyClients();
this._afterClientsReady();
this._readySelf();
},
_readyClients: function () {
this._beginDistribute();
var c$ = this._clients;
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
c._ready();
}
this._finishDistribute();
this._clientsReadied = true;
this._clients = null;
},
_readySelf: function () {
this._doBehavior('ready');
this._readied = true;
if (this._attachedPending) {
this._attachedPending = false;
this.attachedCallback();
}
},
_beforeClientsReady: function () {
},
_afterClientsReady: function () {
},
_beforeAttached: function () {
},
attachedCallback: function () {
if (this._readied) {
this._beforeAttached();
baseAttachedCallback.call(this);
} else {
this._attachedPending = true;
}
}
});
}());
Polymer.ArraySplice = function () {
function newSplice(index, removed, addedCount) {
return {
index: index,
removed: removed,
addedCount: addedCount
};
}
var EDIT_LEAVE = 0;
var EDIT_UPDATE = 1;
var EDIT_ADD = 2;
var EDIT_DELETE = 3;
function ArraySplice() {
}
ArraySplice.prototype = {
calcEditDistances: function (current, currentStart, currentEnd, old, oldStart, oldEnd) {
var rowCount = oldEnd - oldStart + 1;
var columnCount = currentEnd - currentStart + 1;
var distances = new Array(rowCount);
for (var i = 0; i < rowCount; i++) {
distances[i] = new Array(columnCount);
distances[i][0] = i;
}
for (var j = 0; j < columnCount; j++)
distances[0][j] = j;
for (var i = 1; i < rowCount; i++) {
for (var j = 1; j < columnCount; j++) {
if (this.equals(current[currentStart + j - 1], old[oldStart + i - 1]))
distances[i][j] = distances[i - 1][j - 1];
else {
var north = distances[i - 1][j] + 1;
var west = distances[i][j - 1] + 1;
distances[i][j] = north < west ? north : west;
}
}
}
return distances;
},
spliceOperationsFromEditDistances: function (distances) {
var i = distances.length - 1;
var j = distances[0].length - 1;
var current = distances[i][j];
var edits = [];
while (i > 0 || j > 0) {
if (i == 0) {
edits.push(EDIT_ADD);
j--;
continue;
}
if (j == 0) {
edits.push(EDIT_DELETE);
i--;
continue;
}
var northWest = distances[i - 1][j - 1];
var west = distances[i - 1][j];
var north = distances[i][j - 1];
var min;
if (west < north)
min = west < northWest ? west : northWest;
else
min = north < northWest ? north : northWest;
if (min == northWest) {
if (northWest == current) {
edits.push(EDIT_LEAVE);
} else {
edits.push(EDIT_UPDATE);
current = northWest;
}
i--;
j--;
} else if (min == west) {
edits.push(EDIT_DELETE);
i--;
current = west;
} else {
edits.push(EDIT_ADD);
j--;
current = north;
}
}
edits.reverse();
return edits;
},
calcSplices: function (current, currentStart, currentEnd, old, oldStart, oldEnd) {
var prefixCount = 0;
var suffixCount = 0;
var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
if (currentStart == 0 && oldStart == 0)
prefixCount = this.sharedPrefix(current, old, minLength);
if (currentEnd == current.length && oldEnd == old.length)
suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
currentStart += prefixCount;
oldStart += prefixCount;
currentEnd -= suffixCount;
oldEnd -= suffixCount;
if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
return [];
if (currentStart == currentEnd) {
var splice = newSplice(currentStart, [], 0);
while (oldStart < oldEnd)
splice.removed.push(old[oldStart++]);
return [splice];
} else if (oldStart == oldEnd)
return [newSplice(currentStart, [], currentEnd - currentStart)];
var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
var splice = undefined;
var splices = [];
var index = currentStart;
var oldIndex = oldStart;
for (var i = 0; i < ops.length; i++) {
switch (ops[i]) {
case EDIT_LEAVE:
if (splice) {
splices.push(splice);
splice = undefined;
}
index++;
oldIndex++;
break;
case EDIT_UPDATE:
if (!splice)
splice = newSplice(index, [], 0);
splice.addedCount++;
index++;
splice.removed.push(old[oldIndex]);
oldIndex++;
break;
case EDIT_ADD:
if (!splice)
splice = newSplice(index, [], 0);
splice.addedCount++;
index++;
break;
case EDIT_DELETE:
if (!splice)
splice = newSplice(index, [], 0);
splice.removed.push(old[oldIndex]);
oldIndex++;
break;
}
}
if (splice) {
splices.push(splice);
}
return splices;
},
sharedPrefix: function (current, old, searchLength) {
for (var i = 0; i < searchLength; i++)
if (!this.equals(current[i], old[i]))
return i;
return searchLength;
},
sharedSuffix: function (current, old, searchLength) {
var index1 = current.length;
var index2 = old.length;
var count = 0;
while (count < searchLength && this.equals(current[--index1], old[--index2]))
count++;
return count;
},
calculateSplices: function (current, previous) {
return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
},
equals: function (currentValue, previousValue) {
return currentValue === previousValue;
}
};
return new ArraySplice();
}();
Polymer.domInnerHTML = function () {
var escapeAttrRegExp = /[&\u00A0"]/g;
var escapeDataRegExp = /[&\u00A0<>]/g;
function escapeReplace(c) {
switch (c) {
case '&':
return '&amp;';
case '<':
return '&lt;';
case '>':
return '&gt;';
case '"':
return '&quot;';
case '\xA0':
return '&nbsp;';
}
}
function escapeAttr(s) {
return s.replace(escapeAttrRegExp, escapeReplace);
}
function escapeData(s) {
return s.replace(escapeDataRegExp, escapeReplace);
}
function makeSet(arr) {
var set = {};
for (var i = 0; i < arr.length; i++) {
set[arr[i]] = true;
}
return set;
}
var voidElements = makeSet([
'area',
'base',
'br',
'col',
'command',
'embed',
'hr',
'img',
'input',
'keygen',
'link',
'meta',
'param',
'source',
'track',
'wbr'
]);
var plaintextParents = makeSet([
'style',
'script',
'xmp',
'iframe',
'noembed',
'noframes',
'plaintext',
'noscript'
]);
function getOuterHTML(node, parentNode, composed) {
switch (node.nodeType) {
case Node.ELEMENT_NODE:
var tagName = node.localName;
var s = '<' + tagName;
var attrs = node.attributes;
for (var i = 0, attr; attr = attrs[i]; i++) {
s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
}
s += '>';
if (voidElements[tagName]) {
return s;
}
return s + getInnerHTML(node, composed) + '</' + tagName + '>';
case Node.TEXT_NODE:
var data = node.data;
if (parentNode && plaintextParents[parentNode.localName]) {
return data;
}
return escapeData(data);
case Node.COMMENT_NODE:
return '<!--' + node.data + '-->';
default:
console.error(node);
throw new Error('not implemented');
}
}
function getInnerHTML(node, composed) {
if (node instanceof HTMLTemplateElement)
node = node.content;
var s = '';
var c$ = Polymer.dom(node).childNodes;
c$ = composed ? node._composedChildren : c$;
for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
s += getOuterHTML(child, node, composed);
}
return s;
}
return { getInnerHTML: getInnerHTML };
}();
Polymer.DomApi = function () {
'use strict';
var Settings = Polymer.Settings;
var getInnerHTML = Polymer.domInnerHTML.getInnerHTML;
var nativeInsertBefore = Element.prototype.insertBefore;
var nativeRemoveChild = Element.prototype.removeChild;
var nativeAppendChild = Element.prototype.appendChild;
var nativeCloneNode = Element.prototype.cloneNode;
var nativeImportNode = Document.prototype.importNode;
var DomApi = function (node) {
this.node = node;
if (this.patch) {
this.patch();
}
};
if (window.wrap && Settings.useShadow && !Settings.useNativeShadow) {
DomApi = function (node) {
this.node = wrap(node);
if (this.patch) {
this.patch();
}
};
}
DomApi.prototype = {
flush: function () {
Polymer.dom.flush();
},
deepContains: function (node) {
if (this.node.contains(node)) {
return true;
}
var n = node;
var wrappedDocument = wrap(document);
while (n && n !== wrappedDocument && n !== this.node) {
n = Polymer.dom(n).parentNode || n.host;
}
return n === this.node;
},
_lazyDistribute: function (host) {
if (host.shadyRoot && host.shadyRoot._distributionClean) {
host.shadyRoot._distributionClean = false;
Polymer.dom.addDebouncer(host.debounce('_distribute', host._distributeContent));
}
},
appendChild: function (node) {
return this._addNode(node);
},
insertBefore: function (node, ref_node) {
return this._addNode(node, ref_node);
},
_addNode: function (node, ref_node) {
this._removeNodeFromParent(node);
var addedInsertionPoint;
var root = this.getOwnerRoot();
if (root) {
addedInsertionPoint = this._maybeAddInsertionPoint(node, this.node);
}
if (this._nodeHasLogicalChildren(this.node)) {
if (ref_node) {
var children = this.childNodes;
var index = children.indexOf(ref_node);
if (index < 0) {
throw Error('The ref_node to be inserted before is not a child ' + 'of this node');
}
}
this._addLogicalInfo(node, this.node, index);
}
this._addNodeToHost(node);
if (!this._maybeDistribute(node, this.node) && !this._tryRemoveUndistributedNode(node)) {
if (ref_node) {
ref_node = ref_node.localName === CONTENT ? this._firstComposedNode(ref_node) : ref_node;
}
var container = this.node._isShadyRoot ? this.node.host : this.node;
addToComposedParent(container, node, ref_node);
if (ref_node) {
nativeInsertBefore.call(container, node, ref_node);
} else {
nativeAppendChild.call(container, node);
}
}
if (addedInsertionPoint) {
this._updateInsertionPoints(root.host);
}
this.notifyObserver();
return node;
},
removeChild: function (node) {
if (factory(node).parentNode !== this.node) {
console.warn('The node to be removed is not a child of this node', node);
}
this._removeNodeFromHost(node);
if (!this._maybeDistribute(node, this.node)) {
var container = this.node._isShadyRoot ? this.node.host : this.node;
if (container === node.parentNode) {
removeFromComposedParent(container, node);
nativeRemoveChild.call(container, node);
}
}
this.notifyObserver();
return node;
},
replaceChild: function (node, ref_node) {
this.insertBefore(node, ref_node);
this.removeChild(ref_node);
return node;
},
_hasCachedOwnerRoot: function (node) {
return Boolean(node._ownerShadyRoot !== undefined);
},
getOwnerRoot: function () {
return this._ownerShadyRootForNode(this.node);
},
_ownerShadyRootForNode: function (node) {
if (!node) {
return;
}
if (node._ownerShadyRoot === undefined) {
var root;
if (node._isShadyRoot) {
root = node;
} else {
var parent = Polymer.dom(node).parentNode;
if (parent) {
root = parent._isShadyRoot ? parent : this._ownerShadyRootForNode(parent);
} else {
root = null;
}
}
node._ownerShadyRoot = root;
}
return node._ownerShadyRoot;
},
_maybeDistribute: function (node, parent) {
var fragContent = node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !node.__noContent && Polymer.dom(node).querySelector(CONTENT);
var wrappedContent = fragContent && Polymer.dom(fragContent).parentNode.nodeType !== Node.DOCUMENT_FRAGMENT_NODE;
var hasContent = fragContent || node.localName === CONTENT;
if (hasContent) {
var root = this._ownerShadyRootForNode(parent);
if (root) {
var host = root.host;
this._lazyDistribute(host);
}
}
var parentNeedsDist = this._parentNeedsDistribution(parent);
if (parentNeedsDist) {
this._lazyDistribute(parent);
}
return parentNeedsDist || hasContent && !wrappedContent;
},
_maybeAddInsertionPoint: function (node, parent) {
var added;
if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !node.__noContent) {
var c$ = factory(node).querySelectorAll(CONTENT);
for (var i = 0, n, np, na; i < c$.length && (n = c$[i]); i++) {
np = factory(n).parentNode;
if (np === node) {
np = parent;
}
na = this._maybeAddInsertionPoint(n, np);
added = added || na;
}
} else if (node.localName === CONTENT) {
saveLightChildrenIfNeeded(parent);
saveLightChildrenIfNeeded(node);
added = true;
}
return added;
},
_tryRemoveUndistributedNode: function (node) {
if (this.node.shadyRoot) {
var parent = getComposedParent(node);
if (parent) {
nativeRemoveChild.call(parent, node);
}
return true;
}
},
_updateInsertionPoints: function (host) {
var i$ = host.shadyRoot._insertionPoints = factory(host.shadyRoot).querySelectorAll(CONTENT);
for (var i = 0, c; i < i$.length; i++) {
c = i$[i];
saveLightChildrenIfNeeded(c);
saveLightChildrenIfNeeded(factory(c).parentNode);
}
},
_nodeHasLogicalChildren: function (node) {
return Boolean(node._lightChildren !== undefined);
},
_parentNeedsDistribution: function (parent) {
return parent && parent.shadyRoot && hasInsertionPoint(parent.shadyRoot);
},
_removeNodeFromParent: function (node) {
var parent = node._lightParent || node.parentNode;
if (parent && hasDomApi(parent)) {
factory(parent).notifyObserver();
}
this._removeNodeFromHost(node, true);
},
_removeNodeFromHost: function (node, ensureComposedRemoval) {
var hostNeedsDist;
var root;
var parent = node._lightParent;
if (parent) {
factory(node)._distributeParent();
root = this._ownerShadyRootForNode(node);
if (root) {
root.host._elementRemove(node);
hostNeedsDist = this._removeDistributedChildren(root, node);
}
this._removeLogicalInfo(node, parent);
}
this._removeOwnerShadyRoot(node);
if (root && hostNeedsDist) {
this._updateInsertionPoints(root.host);
this._lazyDistribute(root.host);
} else if (ensureComposedRemoval) {
removeFromComposedParent(getComposedParent(node), node);
}
},
_removeDistributedChildren: function (root, container) {
var hostNeedsDist;
var ip$ = root._insertionPoints;
for (var i = 0; i < ip$.length; i++) {
var content = ip$[i];
if (this._contains(container, content)) {
var dc$ = factory(content).getDistributedNodes();
for (var j = 0; j < dc$.length; j++) {
hostNeedsDist = true;
var node = dc$[j];
var parent = node.parentNode;
if (parent) {
removeFromComposedParent(parent, node);
nativeRemoveChild.call(parent, node);
}
}
}
}
return hostNeedsDist;
},
_contains: function (container, node) {
while (node) {
if (node == container) {
return true;
}
node = factory(node).parentNode;
}
},
_addNodeToHost: function (node) {
var root = this.getOwnerRoot();
if (root) {
root.host._elementAdd(node);
}
},
_addLogicalInfo: function (node, container, index) {
var children = factory(container).childNodes;
index = index === undefined ? children.length : index;
if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
var c$ = Array.prototype.slice.call(node.childNodes);
for (var i = 0, n; i < c$.length && (n = c$[i]); i++) {
children.splice(index++, 0, n);
n._lightParent = container;
}
} else {
children.splice(index, 0, node);
node._lightParent = container;
}
},
_removeLogicalInfo: function (node, container) {
var children = factory(container).childNodes;
var index = children.indexOf(node);
if (index < 0 || container !== node._lightParent) {
throw Error('The node to be removed is not a child of this node');
}
children.splice(index, 1);
node._lightParent = null;
},
_removeOwnerShadyRoot: function (node) {
if (this._hasCachedOwnerRoot(node)) {
var c$ = factory(node).childNodes;
for (var i = 0, l = c$.length, n; i < l && (n = c$[i]); i++) {
this._removeOwnerShadyRoot(n);
}
}
node._ownerShadyRoot = undefined;
},
_firstComposedNode: function (content) {
var n$ = factory(content).getDistributedNodes();
for (var i = 0, l = n$.length, n, p$; i < l && (n = n$[i]); i++) {
p$ = factory(n).getDestinationInsertionPoints();
if (p$[p$.length - 1] === content) {
return n;
}
}
},
querySelector: function (selector) {
return this.querySelectorAll(selector)[0];
},
querySelectorAll: function (selector) {
return this._query(function (n) {
return matchesSelector.call(n, selector);
}, this.node);
},
_query: function (matcher, node) {
node = node || this.node;
var list = [];
this._queryElements(factory(node).childNodes, matcher, list);
return list;
},
_queryElements: function (elements, matcher, list) {
for (var i = 0, l = elements.length, c; i < l && (c = elements[i]); i++) {
if (c.nodeType === Node.ELEMENT_NODE) {
this._queryElement(c, matcher, list);
}
}
},
_queryElement: function (node, matcher, list) {
if (matcher(node)) {
list.push(node);
}
this._queryElements(factory(node).childNodes, matcher, list);
},
getDestinationInsertionPoints: function () {
return this.node._destinationInsertionPoints || [];
},
getDistributedNodes: function () {
return this.node._distributedNodes || [];
},
queryDistributedElements: function (selector) {
var c$ = this.getEffectiveChildNodes();
var list = [];
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
if (c.nodeType === Node.ELEMENT_NODE && matchesSelector.call(c, selector)) {
list.push(c);
}
}
return list;
},
getEffectiveChildNodes: function () {
var list = [];
var c$ = this.childNodes;
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
if (c.localName === CONTENT) {
var d$ = factory(c).getDistributedNodes();
for (var j = 0; j < d$.length; j++) {
list.push(d$[j]);
}
} else {
list.push(c);
}
}
return list;
},
_clear: function () {
while (this.childNodes.length) {
this.removeChild(this.childNodes[0]);
}
},
setAttribute: function (name, value) {
this.node.setAttribute(name, value);
this._distributeParent();
},
removeAttribute: function (name) {
this.node.removeAttribute(name);
this._distributeParent();
},
_distributeParent: function () {
if (this._parentNeedsDistribution(this.parentNode)) {
this._lazyDistribute(this.parentNode);
}
},
cloneNode: function (deep) {
var n = nativeCloneNode.call(this.node, false);
if (deep) {
var c$ = this.childNodes;
var d = factory(n);
for (var i = 0, nc; i < c$.length; i++) {
nc = factory(c$[i]).cloneNode(true);
d.appendChild(nc);
}
}
return n;
},
importNode: function (externalNode, deep) {
var doc = this.node instanceof Document ? this.node : this.node.ownerDocument;
var n = nativeImportNode.call(doc, externalNode, false);
if (deep) {
var c$ = factory(externalNode).childNodes;
var d = factory(n);
for (var i = 0, nc; i < c$.length; i++) {
nc = factory(doc).importNode(c$[i], true);
d.appendChild(nc);
}
}
return n;
},
observeNodes: function (callback) {
if (callback) {
if (!this.observer) {
this.observer = this.node.localName === CONTENT ? new DomApi.DistributedNodesObserver(this) : new DomApi.EffectiveNodesObserver(this);
}
return this.observer.addListener(callback);
}
},
unobserveNodes: function (handle) {
if (this.observer) {
this.observer.removeListener(handle);
}
},
notifyObserver: function () {
if (this.observer) {
this.observer.notify();
}
}
};
if (!Settings.useShadow) {
Object.defineProperties(DomApi.prototype, {
childNodes: {
get: function () {
var c$ = getLightChildren(this.node);
return Array.isArray(c$) ? c$ : Array.prototype.slice.call(c$);
},
configurable: true
},
children: {
get: function () {
return Array.prototype.filter.call(this.childNodes, function (n) {
return n.nodeType === Node.ELEMENT_NODE;
});
},
configurable: true
},
parentNode: {
get: function () {
return this.node._lightParent || getComposedParent(this.node);
},
configurable: true
},
firstChild: {
get: function () {
return this.childNodes[0];
},
configurable: true
},
lastChild: {
get: function () {
var c$ = this.childNodes;
return c$[c$.length - 1];
},
configurable: true
},
nextSibling: {
get: function () {
var c$ = this.parentNode && factory(this.parentNode).childNodes;
if (c$) {
return c$[Array.prototype.indexOf.call(c$, this.node) + 1];
}
},
configurable: true
},
previousSibling: {
get: function () {
var c$ = this.parentNode && factory(this.parentNode).childNodes;
if (c$) {
return c$[Array.prototype.indexOf.call(c$, this.node) - 1];
}
},
configurable: true
},
firstElementChild: {
get: function () {
return this.children[0];
},
configurable: true
},
lastElementChild: {
get: function () {
var c$ = this.children;
return c$[c$.length - 1];
},
configurable: true
},
nextElementSibling: {
get: function () {
var c$ = this.parentNode && factory(this.parentNode).children;
if (c$) {
return c$[Array.prototype.indexOf.call(c$, this.node) + 1];
}
},
configurable: true
},
previousElementSibling: {
get: function () {
var c$ = this.parentNode && factory(this.parentNode).children;
if (c$) {
return c$[Array.prototype.indexOf.call(c$, this.node) - 1];
}
},
configurable: true
},
textContent: {
get: function () {
var nt = this.node.nodeType;
if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
return this.node.textContent;
} else {
var tc = [];
for (var i = 0, cn = this.childNodes, c; c = cn[i]; i++) {
if (c.nodeType !== Node.COMMENT_NODE) {
tc.push(c.textContent);
}
}
return tc.join('');
}
},
set: function (text) {
var nt = this.node.nodeType;
if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
this.node.textContent = text;
} else {
this._clear();
if (text) {
this.appendChild(document.createTextNode(text));
}
}
},
configurable: true
},
innerHTML: {
get: function () {
var nt = this.node.nodeType;
if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
return null;
} else {
return getInnerHTML(this.node);
}
},
set: function (text) {
var nt = this.node.nodeType;
if (nt !== Node.TEXT_NODE || nt !== Node.COMMENT_NODE) {
this._clear();
var d = document.createElement('div');
d.innerHTML = text;
var c$ = Array.prototype.slice.call(d.childNodes);
for (var i = 0; i < c$.length; i++) {
this.appendChild(c$[i]);
}
}
},
configurable: true
}
});
DomApi.prototype._getComposedInnerHTML = function () {
return getInnerHTML(this.node, true);
};
} else {
var forwardMethods = [
'cloneNode',
'appendChild',
'insertBefore',
'removeChild',
'replaceChild'
];
forwardMethods.forEach(function (name) {
DomApi.prototype[name] = function () {
return this.node[name].apply(this.node, arguments);
};
});
DomApi.prototype.querySelectorAll = function (selector) {
return Array.prototype.slice.call(this.node.querySelectorAll(selector));
};
DomApi.prototype.getOwnerRoot = function () {
var n = this.node;
while (n) {
if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE && n.host) {
return n;
}
n = n.parentNode;
}
};
DomApi.prototype.importNode = function (externalNode, deep) {
var doc = this.node instanceof Document ? this.node : this.node.ownerDocument;
return doc.importNode(externalNode, deep);
};
DomApi.prototype.getDestinationInsertionPoints = function () {
var n$ = this.node.getDestinationInsertionPoints && this.node.getDestinationInsertionPoints();
return n$ ? Array.prototype.slice.call(n$) : [];
};
DomApi.prototype.getDistributedNodes = function () {
var n$ = this.node.getDistributedNodes && this.node.getDistributedNodes();
return n$ ? Array.prototype.slice.call(n$) : [];
};
DomApi.prototype._distributeParent = function () {
};
var nativeForwards = [
'appendChild',
'insertBefore',
'removeChild',
'replaceChild'
];
nativeForwards.forEach(function (forward) {
DomApi.prototype[forward] = function () {
return this.node[forward].apply(this.node, arguments);
};
});
Object.defineProperties(DomApi.prototype, {
childNodes: {
get: function () {
return Array.prototype.slice.call(this.node.childNodes);
},
configurable: true
},
children: {
get: function () {
return Array.prototype.slice.call(this.node.children);
},
configurable: true
},
textContent: {
get: function () {
return this.node.textContent;
},
set: function (value) {
return this.node.textContent = value;
},
configurable: true
},
innerHTML: {
get: function () {
return this.node.innerHTML;
},
set: function (value) {
return this.node.innerHTML = value;
},
configurable: true
}
});
var forwardProperties = [
'parentNode',
'firstChild',
'lastChild',
'nextSibling',
'previousSibling',
'firstElementChild',
'lastElementChild',
'nextElementSibling',
'previousElementSibling'
];
forwardProperties.forEach(function (name) {
Object.defineProperty(DomApi.prototype, name, {
get: function () {
return this.node[name];
},
configurable: true
});
});
}
var CONTENT = 'content';
function factory(node, patch) {
node = node || document;
if (!node.__domApi) {
node.__domApi = new DomApi(node, patch);
}
return node.__domApi;
}
;
function hasDomApi(node) {
return Boolean(node.__domApi);
}
Polymer.dom = function (obj, patch) {
if (obj instanceof Event) {
return Polymer.EventApi.factory(obj);
} else {
return factory(obj, patch);
}
};
function getLightChildren(node) {
var children = node._lightChildren;
return children ? children : node.childNodes;
}
function getComposedChildren(node) {
if (!node._composedChildren) {
node._composedChildren = Array.prototype.slice.call(node.childNodes);
}
return node._composedChildren;
}
function addToComposedParent(parent, node, ref_node) {
var children = getComposedChildren(parent);
var i = ref_node ? children.indexOf(ref_node) : -1;
if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
var fragChildren = getComposedChildren(node);
for (var j = 0; j < fragChildren.length; j++) {
addNodeToComposedChildren(fragChildren[j], parent, children, i + j);
}
node._composedChildren = null;
} else {
addNodeToComposedChildren(node, parent, children, i);
}
}
function getComposedParent(node) {
return node.__patched ? node._composedParent : node.parentNode;
}
function addNodeToComposedChildren(node, parent, children, i) {
node._composedParent = parent;
children.splice(i >= 0 ? i : children.length, 0, node);
}
function removeFromComposedParent(parent, node) {
node._composedParent = null;
if (parent) {
var children = getComposedChildren(parent);
var i = children.indexOf(node);
if (i >= 0) {
children.splice(i, 1);
}
}
}
function saveLightChildrenIfNeeded(node) {
if (!node._lightChildren) {
var c$ = Array.prototype.slice.call(node.childNodes);
for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
child._lightParent = child._lightParent || node;
}
node._lightChildren = c$;
}
}
function hasInsertionPoint(root) {
return Boolean(root && root._insertionPoints.length);
}
var p = Element.prototype;
var matchesSelector = p.matches || p.matchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector || p.webkitMatchesSelector;
return {
getLightChildren: getLightChildren,
getComposedParent: getComposedParent,
getComposedChildren: getComposedChildren,
removeFromComposedParent: removeFromComposedParent,
saveLightChildrenIfNeeded: saveLightChildrenIfNeeded,
matchesSelector: matchesSelector,
hasInsertionPoint: hasInsertionPoint,
ctor: DomApi,
factory: factory,
hasDomApi: hasDomApi
};
}();
Polymer.Base.extend(Polymer.dom, {
_flushGuard: 0,
_FLUSH_MAX: 100,
_needsTakeRecords: !Polymer.Settings.useNativeCustomElements,
_debouncers: [],
_staticFlushList: [],
_finishDebouncer: null,
flush: function () {
this._flushGuard = 0;
this._prepareFlush();
while (this._debouncers.length && this._flushGuard < this._FLUSH_MAX) {
for (var i = 0; i < this._debouncers.length; i++) {
this._debouncers[i].complete();
}
if (this._finishDebouncer) {
this._finishDebouncer.complete();
}
this._prepareFlush();
this._flushGuard++;
}
if (this._flushGuard >= this._FLUSH_MAX) {
console.warn('Polymer.dom.flush aborted. Flush may not be complete.');
}
},
_prepareFlush: function () {
if (this._needsTakeRecords) {
CustomElements.takeRecords();
}
for (var i = 0; i < this._staticFlushList.length; i++) {
this._staticFlushList[i]();
}
},
addStaticFlush: function (fn) {
this._staticFlushList.push(fn);
},
removeStaticFlush: function (fn) {
var i = this._staticFlushList.indexOf(fn);
if (i >= 0) {
this._staticFlushList.splice(i, 1);
}
},
addDebouncer: function (debouncer) {
this._debouncers.push(debouncer);
this._finishDebouncer = Polymer.Debounce(this._finishDebouncer, this._finishFlush);
},
_finishFlush: function () {
Polymer.dom._debouncers = [];
}
});
Polymer.EventApi = function () {
'use strict';
var DomApi = Polymer.DomApi.ctor;
var Settings = Polymer.Settings;
DomApi.Event = function (event) {
this.event = event;
};
if (Settings.useShadow) {
DomApi.Event.prototype = {
get rootTarget() {
return this.event.path[0];
},
get localTarget() {
return this.event.target;
},
get path() {
return this.event.path;
}
};
} else {
DomApi.Event.prototype = {
get rootTarget() {
return this.event.target;
},
get localTarget() {
var current = this.event.currentTarget;
var currentRoot = current && Polymer.dom(current).getOwnerRoot();
var p$ = this.path;
for (var i = 0; i < p$.length; i++) {
if (Polymer.dom(p$[i]).getOwnerRoot() === currentRoot) {
return p$[i];
}
}
},
get path() {
if (!this.event._path) {
var path = [];
var o = this.rootTarget;
while (o) {
path.push(o);
o = Polymer.dom(o).parentNode || o.host;
}
path.push(window);
this.event._path = path;
}
return this.event._path;
}
};
}
var factory = function (event) {
if (!event.__eventApi) {
event.__eventApi = new DomApi.Event(event);
}
return event.__eventApi;
};
return { factory: factory };
}();
(function () {
'use strict';
var DomApi = Polymer.DomApi.ctor;
Object.defineProperty(DomApi.prototype, 'classList', {
get: function () {
if (!this._classList) {
this._classList = new DomApi.ClassList(this);
}
return this._classList;
},
configurable: true
});
DomApi.ClassList = function (host) {
this.domApi = host;
this.node = host.node;
};
DomApi.ClassList.prototype = {
add: function () {
this.node.classList.add.apply(this.node.classList, arguments);
this.domApi._distributeParent();
},
remove: function () {
this.node.classList.remove.apply(this.node.classList, arguments);
this.domApi._distributeParent();
},
toggle: function () {
this.node.classList.toggle.apply(this.node.classList, arguments);
this.domApi._distributeParent();
},
contains: function () {
return this.node.classList.contains.apply(this.node.classList, arguments);
}
};
}());
(function () {
'use strict';
var DomApi = Polymer.DomApi.ctor;
var Settings = Polymer.Settings;
var hasDomApi = Polymer.DomApi.hasDomApi;
DomApi.EffectiveNodesObserver = function (domApi) {
this.domApi = domApi;
this.node = this.domApi.node;
this._listeners = [];
};
DomApi.EffectiveNodesObserver.prototype = {
addListener: function (callback) {
if (!this._isSetup) {
this._setup();
this._isSetup = true;
}
var listener = {
fn: callback,
_nodes: []
};
this._listeners.push(listener);
this._scheduleNotify();
return listener;
},
removeListener: function (handle) {
var i = this._listeners.indexOf(handle);
if (i >= 0) {
this._listeners.splice(i, 1);
handle._nodes = [];
}
if (!this._hasListeners()) {
this._cleanup();
this._isSetup = false;
}
},
_setup: function () {
this._observeContentElements(this.domApi.childNodes);
},
_cleanup: function () {
this._unobserveContentElements(this.domApi.childNodes);
},
_hasListeners: function () {
return Boolean(this._listeners.length);
},
_scheduleNotify: function () {
if (this._debouncer) {
this._debouncer.stop();
}
this._debouncer = Polymer.Debounce(this._debouncer, this._notify);
this._debouncer.context = this;
Polymer.dom.addDebouncer(this._debouncer);
},
notify: function () {
if (this._hasListeners()) {
this._scheduleNotify();
}
},
_notify: function (mxns) {
this._beforeCallListeners();
this._callListeners();
},
_beforeCallListeners: function () {
this._updateContentElements();
},
_updateContentElements: function () {
this._observeContentElements(this.domApi.childNodes);
},
_observeContentElements: function (elements) {
for (var i = 0, n; i < elements.length && (n = elements[i]); i++) {
if (this._isContent(n)) {
n.__observeNodesMap = n.__observeNodesMap || new WeakMap();
if (!n.__observeNodesMap.has(this)) {
n.__observeNodesMap.set(this, this._observeContent(n));
}
}
}
},
_observeContent: function (content) {
var h = Polymer.dom(content).observeNodes(this._scheduleNotify.bind(this));
h._avoidChangeCalculation = true;
return h;
},
_unobserveContentElements: function (elements) {
for (var i = 0, n, h; i < elements.length && (n = elements[i]); i++) {
if (this._isContent(n)) {
h = n.__observeNodesMap.get(this);
if (h) {
Polymer.dom(n).unobserveNodes(h);
n.__observeNodesMap.delete(this);
}
}
}
},
_isContent: function (node) {
return node.localName === 'content';
},
_callListeners: function () {
var o$ = this._listeners;
var nodes = this._getEffectiveNodes();
for (var i = 0, o; i < o$.length && (o = o$[i]); i++) {
var info = this._generateListenerInfo(o, nodes);
if (info || o._alwaysNotify) {
this._callListener(o, info);
}
}
},
_getEffectiveNodes: function () {
return this.domApi.getEffectiveChildNodes();
},
_generateListenerInfo: function (listener, newNodes) {
if (listener._avoidChangeCalculation) {
return true;
}
var oldNodes = listener._nodes;
var info = {
target: this.node,
addedNodes: [],
removedNodes: []
};
var splices = Polymer.ArraySplice.calculateSplices(newNodes, oldNodes);
for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
for (var j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
info.removedNodes.push(n);
}
}
for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
for (var j = s.index; j < s.index + s.addedCount; j++) {
info.addedNodes.push(newNodes[j]);
}
}
listener._nodes = newNodes;
if (info.addedNodes.length || info.removedNodes.length) {
return info;
}
},
_callListener: function (listener, info) {
return listener.fn.call(this.node, info);
},
enableShadowAttributeTracking: function () {
}
};
if (Settings.useShadow) {
var baseSetup = DomApi.EffectiveNodesObserver.prototype._setup;
var baseCleanup = DomApi.EffectiveNodesObserver.prototype._cleanup;
var beforeCallListeners = DomApi.EffectiveNodesObserver.prototype._beforeCallListeners;
Polymer.Base.extend(DomApi.EffectiveNodesObserver.prototype, {
_setup: function () {
if (!this._observer) {
var self = this;
this._mutationHandler = function (mxns) {
if (mxns && mxns.length) {
self._scheduleNotify();
}
};
this._observer = new MutationObserver(this._mutationHandler);
this._boundFlush = this._flush.bind(this);
Polymer.dom.addStaticFlush(this._boundFlush);
this._observer.observe(this.node, { childList: true });
}
baseSetup.call(this);
},
_cleanup: function () {
this._observer.disconnect();
this._observer = null;
this._mutationHandler = null;
Polymer.dom.removeStaticFlush(this._boundFlush);
baseCleanup.call(this);
},
_flush: function () {
if (this._observer) {
this._mutationHandler(this._observer.takeRecords());
}
},
enableShadowAttributeTracking: function () {
if (this._observer) {
this._makeContentListenersAlwaysNotify();
this._observer.disconnect();
this._observer.observe(this.node, {
childList: true,
attributes: true,
subtree: true
});
var root = this.domApi.getOwnerRoot();
var host = root && root.host;
if (host && Polymer.dom(host).observer) {
Polymer.dom(host).observer.enableShadowAttributeTracking();
}
}
},
_makeContentListenersAlwaysNotify: function () {
for (var i = 0, h; i < this._listeners.length; i++) {
h = this._listeners[i];
h._alwaysNotify = h._isContentListener;
}
}
});
}
}());
(function () {
'use strict';
var DomApi = Polymer.DomApi.ctor;
var Settings = Polymer.Settings;
DomApi.DistributedNodesObserver = function (domApi) {
DomApi.EffectiveNodesObserver.call(this, domApi);
};
DomApi.DistributedNodesObserver.prototype = Object.create(DomApi.EffectiveNodesObserver.prototype);
Polymer.Base.extend(DomApi.DistributedNodesObserver.prototype, {
_setup: function () {
},
_cleanup: function () {
},
_beforeCallListeners: function () {
},
_getEffectiveNodes: function () {
return this.domApi.getDistributedNodes();
}
});
if (Settings.useShadow) {
Polymer.Base.extend(DomApi.DistributedNodesObserver.prototype, {
_setup: function () {
if (!this._observer) {
var root = this.domApi.getOwnerRoot();
var host = root && root.host;
if (host) {
this._observer = Polymer.dom(host).observeNodes(this._scheduleNotify.bind(this));
this._observer._isContentListener = true;
if (this._hasAttrSelect()) {
Polymer.dom(host).observer.enableShadowAttributeTracking();
}
}
}
},
_hasAttrSelect: function () {
var select = this.node.getAttribute('select');
return select && select.match(/[[.]+/);
},
_cleanup: function () {
var root = this.domApi.getOwnerRoot();
var host = root && root.host;
if (host) {
Polymer.dom(host).unobserveNodes(this._observer);
}
this._observer = null;
}
});
}
}());
(function () {
var hasDomApi = Polymer.DomApi.hasDomApi;
Polymer.Base._addFeature({
_prepShady: function () {
this._useContent = this._useContent || Boolean(this._template);
},
_poolContent: function () {
if (this._useContent) {
saveLightChildrenIfNeeded(this);
}
},
_setupRoot: function () {
if (this._useContent) {
this._createLocalRoot();
if (!this.dataHost) {
upgradeLightChildren(this._lightChildren);
}
}
},
_createLocalRoot: function () {
this.shadyRoot = this.root;
this.shadyRoot._distributionClean = false;
this.shadyRoot._isShadyRoot = true;
this.shadyRoot._dirtyRoots = [];
var i$ = this.shadyRoot._insertionPoints = !this._notes || this._notes._hasContent ? this.shadyRoot.querySelectorAll('content') : [];
saveLightChildrenIfNeeded(this.shadyRoot);
for (var i = 0, c; i < i$.length; i++) {
c = i$[i];
saveLightChildrenIfNeeded(c);
saveLightChildrenIfNeeded(c.parentNode);
}
this.shadyRoot.host = this;
},
get domHost() {
var root = Polymer.dom(this).getOwnerRoot();
return root && root.host;
},
distributeContent: function (updateInsertionPoints) {
if (this.shadyRoot) {
var dom = Polymer.dom(this);
if (updateInsertionPoints) {
dom._updateInsertionPoints(this);
}
var host = getTopDistributingHost(this);
dom._lazyDistribute(host);
}
},
_distributeContent: function () {
if (this._useContent && !this.shadyRoot._distributionClean) {
this._beginDistribute();
this._distributeDirtyRoots();
this._finishDistribute();
}
},
_beginDistribute: function () {
if (this._useContent && hasInsertionPoint(this.shadyRoot)) {
this._resetDistribution();
this._distributePool(this.shadyRoot, this._collectPool());
}
},
_distributeDirtyRoots: function () {
var c$ = this.shadyRoot._dirtyRoots;
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
c._distributeContent();
}
this.shadyRoot._dirtyRoots = [];
},
_finishDistribute: function () {
if (this._useContent) {
this.shadyRoot._distributionClean = true;
if (hasInsertionPoint(this.shadyRoot)) {
this._composeTree();
notifyContentObservers(this.shadyRoot);
} else {
if (!this.shadyRoot._hasDistributed) {
this.textContent = '';
this._composedChildren = null;
this.appendChild(this.shadyRoot);
} else {
var children = this._composeNode(this);
this._updateChildNodes(this, children);
}
}
if (!this.shadyRoot._hasDistributed) {
notifyInitialDistribution(this);
}
this.shadyRoot._hasDistributed = true;
}
},
elementMatches: function (selector, node) {
node = node || this;
return matchesSelector.call(node, selector);
},
_resetDistribution: function () {
var children = getLightChildren(this);
for (var i = 0; i < children.length; i++) {
var child = children[i];
if (child._destinationInsertionPoints) {
child._destinationInsertionPoints = undefined;
}
if (isInsertionPoint(child)) {
clearDistributedDestinationInsertionPoints(child);
}
}
var root = this.shadyRoot;
var p$ = root._insertionPoints;
for (var j = 0; j < p$.length; j++) {
p$[j]._distributedNodes = [];
}
},
_collectPool: function () {
var pool = [];
var children = getLightChildren(this);
for (var i = 0; i < children.length; i++) {
var child = children[i];
if (isInsertionPoint(child)) {
pool.push.apply(pool, child._distributedNodes);
} else {
pool.push(child);
}
}
return pool;
},
_distributePool: function (node, pool) {
var p$ = node._insertionPoints;
for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
this._distributeInsertionPoint(p, pool);
maybeRedistributeParent(p, this);
}
},
_distributeInsertionPoint: function (content, pool) {
var anyDistributed = false;
for (var i = 0, l = pool.length, node; i < l; i++) {
node = pool[i];
if (!node) {
continue;
}
if (this._matchesContentSelect(node, content)) {
distributeNodeInto(node, content);
pool[i] = undefined;
anyDistributed = true;
}
}
if (!anyDistributed) {
var children = getLightChildren(content);
for (var j = 0; j < children.length; j++) {
distributeNodeInto(children[j], content);
}
}
},
_composeTree: function () {
this._updateChildNodes(this, this._composeNode(this));
var p$ = this.shadyRoot._insertionPoints;
for (var i = 0, l = p$.length, p, parent; i < l && (p = p$[i]); i++) {
parent = p._lightParent || p.parentNode;
if (!parent._useContent && parent !== this && parent !== this.shadyRoot) {
this._updateChildNodes(parent, this._composeNode(parent));
}
}
},
_composeNode: function (node) {
var children = [];
var c$ = getLightChildren(node.shadyRoot || node);
for (var i = 0; i < c$.length; i++) {
var child = c$[i];
if (isInsertionPoint(child)) {
var distributedNodes = child._distributedNodes;
for (var j = 0; j < distributedNodes.length; j++) {
var distributedNode = distributedNodes[j];
if (isFinalDestination(child, distributedNode)) {
children.push(distributedNode);
}
}
} else {
children.push(child);
}
}
return children;
},
_updateChildNodes: function (container, children) {
var composed = getComposedChildren(container);
var splices = Polymer.ArraySplice.calculateSplices(children, composed);
for (var i = 0, d = 0, s; i < splices.length && (s = splices[i]); i++) {
for (var j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
if (getComposedParent(n) === container) {
remove(n);
}
composed.splice(s.index + d, 1);
}
d -= s.addedCount;
}
for (var i = 0, s, next; i < splices.length && (s = splices[i]); i++) {
next = composed[s.index];
for (var j = s.index, n; j < s.index + s.addedCount; j++) {
n = children[j];
insertBefore(container, n, next);
composed.splice(j, 0, n);
}
}
ensureComposedParent(container, children);
},
_matchesContentSelect: function (node, contentElement) {
var select = contentElement.getAttribute('select');
if (!select) {
return true;
}
select = select.trim();
if (!select) {
return true;
}
if (!(node instanceof Element)) {
return false;
}
var validSelectors = /^(:not\()?[*.#[a-zA-Z_|]/;
if (!validSelectors.test(select)) {
return false;
}
return this.elementMatches(select, node);
},
_elementAdd: function () {
},
_elementRemove: function () {
}
});
var saveLightChildrenIfNeeded = Polymer.DomApi.saveLightChildrenIfNeeded;
var getLightChildren = Polymer.DomApi.getLightChildren;
var matchesSelector = Polymer.DomApi.matchesSelector;
var hasInsertionPoint = Polymer.DomApi.hasInsertionPoint;
var getComposedChildren = Polymer.DomApi.getComposedChildren;
var getComposedParent = Polymer.DomApi.getComposedParent;
var removeFromComposedParent = Polymer.DomApi.removeFromComposedParent;
function distributeNodeInto(child, insertionPoint) {
insertionPoint._distributedNodes.push(child);
var points = child._destinationInsertionPoints;
if (!points) {
child._destinationInsertionPoints = [insertionPoint];
} else {
points.push(insertionPoint);
}
}
function clearDistributedDestinationInsertionPoints(content) {
var e$ = content._distributedNodes;
if (e$) {
for (var i = 0; i < e$.length; i++) {
var d = e$[i]._destinationInsertionPoints;
if (d) {
d.splice(d.indexOf(content) + 1, d.length);
}
}
}
}
function maybeRedistributeParent(content, host) {
var parent = content._lightParent;
if (parent && parent.shadyRoot && hasInsertionPoint(parent.shadyRoot) && parent.shadyRoot._distributionClean) {
parent.shadyRoot._distributionClean = false;
host.shadyRoot._dirtyRoots.push(parent);
}
}
function isFinalDestination(insertionPoint, node) {
var points = node._destinationInsertionPoints;
return points && points[points.length - 1] === insertionPoint;
}
function isInsertionPoint(node) {
return node.localName == 'content';
}
var nativeInsertBefore = Element.prototype.insertBefore;
var nativeRemoveChild = Element.prototype.removeChild;
function insertBefore(parentNode, newChild, refChild) {
var newChildParent = getComposedParent(newChild);
if (newChildParent !== parentNode) {
removeFromComposedParent(newChildParent, newChild);
}
remove(newChild);
nativeInsertBefore.call(parentNode, newChild, refChild || null);
newChild._composedParent = parentNode;
}
function remove(node) {
var parentNode = getComposedParent(node);
if (parentNode) {
node._composedParent = null;
nativeRemoveChild.call(parentNode, node);
}
}
function ensureComposedParent(parent, children) {
for (var i = 0, n; i < children.length; i++) {
children[i]._composedParent = parent;
}
}
function getTopDistributingHost(host) {
while (host && hostNeedsRedistribution(host)) {
host = host.domHost;
}
return host;
}
function hostNeedsRedistribution(host) {
var c$ = Polymer.dom(host).children;
for (var i = 0, c; i < c$.length; i++) {
c = c$[i];
if (c.localName === 'content') {
return host.domHost;
}
}
}
function notifyContentObservers(root) {
for (var i = 0, c; i < root._insertionPoints.length; i++) {
c = root._insertionPoints[i];
if (hasDomApi(c)) {
Polymer.dom(c).notifyObserver();
}
}
}
function notifyInitialDistribution(host) {
if (hasDomApi(host)) {
Polymer.dom(host).notifyObserver();
}
}
var needsUpgrade = window.CustomElements && !CustomElements.useNative;
function upgradeLightChildren(children) {
if (needsUpgrade && children) {
for (var i = 0; i < children.length; i++) {
CustomElements.upgrade(children[i]);
}
}
}
}());
if (Polymer.Settings.useShadow) {
Polymer.Base._addFeature({
_poolContent: function () {
},
_beginDistribute: function () {
},
distributeContent: function () {
},
_distributeContent: function () {
},
_finishDistribute: function () {
},
_createLocalRoot: function () {
this.createShadowRoot();
this.shadowRoot.appendChild(this.root);
this.root = this.shadowRoot;
}
});
}
Polymer.DomModule = document.createElement('dom-module');
Polymer.Base._addFeature({
_registerFeatures: function () {
this._prepIs();
this._prepAttributes();
this._prepBehaviors();
this._prepConstructor();
this._prepTemplate();
this._prepShady();
},
_prepBehavior: function (b) {
this._addHostAttributes(b.hostAttributes);
},
_initFeatures: function () {
this._poolContent();
this._pushHost();
this._stampTemplate();
this._popHost();
this._marshalHostAttributes();
this._setupDebouncers();
this._marshalBehaviors();
this._tryReady();
},
_marshalBehavior: function (b) {
}
});
Polymer.nar = [];
Polymer.Annotations = {
parseAnnotations: function (template) {
var list = [];
var content = template._content || template.content;
this._parseNodeAnnotations(content, list);
return list;
},
_parseNodeAnnotations: function (node, list) {
return node.nodeType === Node.TEXT_NODE ? this._parseTextNodeAnnotation(node, list) : this._parseElementAnnotations(node, list);
},
_bindingRegex: /([^{[]*)({{|\[\[)([^}\]]*)(?:]]|}})/g,
_parseBindings: function (text) {
var re = this._bindingRegex;
var parts = [];
var m, lastIndex;
while ((m = re.exec(text)) !== null) {
if (m[1]) {
parts.push({ literal: m[1] });
}
var mode = m[2][0];
var value = m[3].trim();
var negate = false;
if (value[0] == '!') {
negate = true;
value = value.substring(1).trim();
}
var customEvent, notifyEvent, colon;
if (mode == '{' && (colon = value.indexOf('::')) > 0) {
notifyEvent = value.substring(colon + 2);
value = value.substring(0, colon);
customEvent = true;
}
parts.push({
compoundIndex: parts.length,
value: value,
mode: mode,
negate: negate,
event: notifyEvent,
customEvent: customEvent
});
lastIndex = re.lastIndex;
}
if (lastIndex && lastIndex < text.length) {
var literal = text.substring(lastIndex);
if (literal) {
parts.push({ literal: literal });
}
}
if (parts.length) {
return parts;
}
},
_literalFromParts: function (parts) {
var s = '';
for (var i = 0; i < parts.length; i++) {
var literal = parts[i].literal;
s += literal || '';
}
return s;
},
_parseTextNodeAnnotation: function (node, list) {
var parts = this._parseBindings(node.textContent);
if (parts) {
node.textContent = this._literalFromParts(parts) || ' ';
var annote = {
bindings: [{
kind: 'text',
name: 'textContent',
parts: parts,
isCompound: parts.length !== 1
}]
};
list.push(annote);
return annote;
}
},
_parseElementAnnotations: function (element, list) {
var annote = {
bindings: [],
events: []
};
if (element.localName === 'content') {
list._hasContent = true;
}
this._parseChildNodesAnnotations(element, annote, list);
if (element.attributes) {
this._parseNodeAttributeAnnotations(element, annote, list);
if (this.prepElement) {
this.prepElement(element);
}
}
if (annote.bindings.length || annote.events.length || annote.id) {
list.push(annote);
}
return annote;
},
_parseChildNodesAnnotations: function (root, annote, list, callback) {
if (root.firstChild) {
for (var i = 0, node = root.firstChild; node; node = node.nextSibling, i++) {
if (node.localName === 'template' && !node.hasAttribute('preserve-content')) {
this._parseTemplate(node, i, list, annote);
}
if (node.nodeType === Node.TEXT_NODE) {
var n = node.nextSibling;
while (n && n.nodeType === Node.TEXT_NODE) {
node.textContent += n.textContent;
root.removeChild(n);
n = n.nextSibling;
}
}
var childAnnotation = this._parseNodeAnnotations(node, list, callback);
if (childAnnotation) {
childAnnotation.parent = annote;
childAnnotation.index = i;
}
}
}
},
_parseTemplate: function (node, index, list, parent) {
var content = document.createDocumentFragment();
content._notes = this.parseAnnotations(node);
content.appendChild(node.content);
list.push({
bindings: Polymer.nar,
events: Polymer.nar,
templateContent: content,
parent: parent,
index: index
});
},
_parseNodeAttributeAnnotations: function (node, annotation) {
var attrs = Array.prototype.slice.call(node.attributes);
for (var i = attrs.length - 1, a; a = attrs[i]; i--) {
var n = a.name;
var v = a.value;
var b;
if (n.slice(0, 3) === 'on-') {
node.removeAttribute(n);
annotation.events.push({
name: n.slice(3),
value: v
});
} else if (b = this._parseNodeAttributeAnnotation(node, n, v)) {
annotation.bindings.push(b);
} else if (n === 'id') {
annotation.id = v;
}
}
},
_parseNodeAttributeAnnotation: function (node, name, value) {
var parts = this._parseBindings(value);
if (parts) {
var origName = name;
var kind = 'property';
if (name[name.length - 1] == '$') {
name = name.slice(0, -1);
kind = 'attribute';
}
var literal = this._literalFromParts(parts);
if (literal && kind == 'attribute') {
node.setAttribute(name, literal);
}
if (node.localName == 'input' && name == 'value') {
node.setAttribute(origName, '');
}
node.removeAttribute(origName);
if (kind === 'property') {
name = Polymer.CaseMap.dashToCamelCase(name);
}
return {
kind: kind,
name: name,
parts: parts,
literal: literal,
isCompound: parts.length !== 1
};
}
},
_localSubTree: function (node, host) {
return node === host ? node.childNodes : node._lightChildren || node.childNodes;
},
findAnnotatedNode: function (root, annote) {
var parent = annote.parent && Polymer.Annotations.findAnnotatedNode(root, annote.parent);
return !parent ? root : Polymer.Annotations._localSubTree(parent, root)[annote.index];
}
};
(function () {
function resolveCss(cssText, ownerDocument) {
return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
return pre + '\'' + resolve(url.replace(/["']/g, ''), ownerDocument) + '\'' + post;
});
}
function resolveAttrs(element, ownerDocument) {
for (var name in URL_ATTRS) {
var a$ = URL_ATTRS[name];
for (var i = 0, l = a$.length, a, at, v; i < l && (a = a$[i]); i++) {
if (name === '*' || element.localName === name) {
at = element.attributes[a];
v = at && at.value;
if (v && v.search(BINDING_RX) < 0) {
at.value = a === 'style' ? resolveCss(v, ownerDocument) : resolve(v, ownerDocument);
}
}
}
}
}
function resolve(url, ownerDocument) {
if (url && url[0] === '#') {
return url;
}
var resolver = getUrlResolver(ownerDocument);
resolver.href = url;
return resolver.href || url;
}
var tempDoc;
var tempDocBase;
function resolveUrl(url, baseUri) {
if (!tempDoc) {
tempDoc = document.implementation.createHTMLDocument('temp');
tempDocBase = tempDoc.createElement('base');
tempDoc.head.appendChild(tempDocBase);
}
tempDocBase.href = baseUri;
return resolve(url, tempDoc);
}
function getUrlResolver(ownerDocument) {
return ownerDocument.__urlResolver || (ownerDocument.__urlResolver = ownerDocument.createElement('a'));
}
var CSS_URL_RX = /(url\()([^)]*)(\))/g;
var URL_ATTRS = {
'*': [
'href',
'src',
'style',
'url'
],
form: ['action']
};
var BINDING_RX = /\{\{|\[\[/;
Polymer.ResolveUrl = {
resolveCss: resolveCss,
resolveAttrs: resolveAttrs,
resolveUrl: resolveUrl
};
}());
Polymer.Base._addFeature({
_prepAnnotations: function () {
if (!this._template) {
this._notes = [];
} else {
Polymer.Annotations.prepElement = this._prepElement.bind(this);
if (this._template._content && this._template._content._notes) {
this._notes = this._template._content._notes;
} else {
this._notes = Polymer.Annotations.parseAnnotations(this._template);
}
this._processAnnotations(this._notes);
Polymer.Annotations.prepElement = null;
}
},
_processAnnotations: function (notes) {
for (var i = 0; i < notes.length; i++) {
var note = notes[i];
for (var j = 0; j < note.bindings.length; j++) {
var b = note.bindings[j];
for (var k = 0; k < b.parts.length; k++) {
var p = b.parts[k];
if (!p.literal) {
p.signature = this._parseMethod(p.value);
if (!p.signature) {
p.model = this._modelForPath(p.value);
}
}
}
}
if (note.templateContent) {
this._processAnnotations(note.templateContent._notes);
var pp = note.templateContent._parentProps = this._discoverTemplateParentProps(note.templateContent._notes);
var bindings = [];
for (var prop in pp) {
bindings.push({
index: note.index,
kind: 'property',
name: '_parent_' + prop,
parts: [{
mode: '{',
model: prop,
value: prop
}]
});
}
note.bindings = note.bindings.concat(bindings);
}
}
},
_discoverTemplateParentProps: function (notes) {
var pp = {};
notes.forEach(function (n) {
n.bindings.forEach(function (b) {
b.parts.forEach(function (p) {
if (p.signature) {
var args = p.signature.args;
for (var k = 0; k < args.length; k++) {
pp[args[k].model] = true;
}
} else {
pp[p.model] = true;
}
});
});
if (n.templateContent) {
var tpp = n.templateContent._parentProps;
Polymer.Base.mixin(pp, tpp);
}
});
return pp;
},
_prepElement: function (element) {
Polymer.ResolveUrl.resolveAttrs(element, this._template.ownerDocument);
},
_findAnnotatedNode: Polymer.Annotations.findAnnotatedNode,
_marshalAnnotationReferences: function () {
if (this._template) {
this._marshalIdNodes();
this._marshalAnnotatedNodes();
this._marshalAnnotatedListeners();
}
},
_configureAnnotationReferences: function (config) {
var notes = this._notes;
var nodes = this._nodes;
for (var i = 0; i < notes.length; i++) {
var note = notes[i];
var node = nodes[i];
this._configureTemplateContent(note, node);
this._configureCompoundBindings(note, node);
}
},
_configureTemplateContent: function (note, node) {
if (note.templateContent) {
node._content = note.templateContent;
}
},
_configureCompoundBindings: function (note, node) {
var bindings = note.bindings;
for (var i = 0; i < bindings.length; i++) {
var binding = bindings[i];
if (binding.isCompound) {
var storage = node.__compoundStorage__ || (node.__compoundStorage__ = {});
var parts = binding.parts;
var literals = new Array(parts.length);
for (var j = 0; j < parts.length; j++) {
literals[j] = parts[j].literal;
}
var name = binding.name;
storage[name] = literals;
if (binding.literal && binding.kind == 'property') {
if (node._configValue) {
node._configValue(name, binding.literal);
} else {
node[name] = binding.literal;
}
}
}
}
},
_marshalIdNodes: function () {
this.$ = {};
this._notes.forEach(function (a) {
if (a.id) {
this.$[a.id] = this._findAnnotatedNode(this.root, a);
}
}, this);
},
_marshalAnnotatedNodes: function () {
if (this._nodes) {
this._nodes = this._nodes.map(function (a) {
return this._findAnnotatedNode(this.root, a);
}, this);
}
},
_marshalAnnotatedListeners: function () {
this._notes.forEach(function (a) {
if (a.events && a.events.length) {
var node = this._findAnnotatedNode(this.root, a);
a.events.forEach(function (e) {
this.listen(node, e.name, e.value);
}, this);
}
}, this);
}
});
Polymer.Base._addFeature({
listeners: {},
_listenListeners: function (listeners) {
var node, name, key;
for (key in listeners) {
if (key.indexOf('.') < 0) {
node = this;
name = key;
} else {
name = key.split('.');
node = this.$[name[0]];
name = name[1];
}
this.listen(node, name, listeners[key]);
}
},
listen: function (node, eventName, methodName) {
var handler = this._recallEventHandler(this, eventName, node, methodName);
if (!handler) {
handler = this._createEventHandler(node, eventName, methodName);
}
if (handler._listening) {
return;
}
this._listen(node, eventName, handler);
handler._listening = true;
},
_boundListenerKey: function (eventName, methodName) {
return eventName + ':' + methodName;
},
_recordEventHandler: function (host, eventName, target, methodName, handler) {
var hbl = host.__boundListeners;
if (!hbl) {
hbl = host.__boundListeners = new WeakMap();
}
var bl = hbl.get(target);
if (!bl) {
bl = {};
hbl.set(target, bl);
}
var key = this._boundListenerKey(eventName, methodName);
bl[key] = handler;
},
_recallEventHandler: function (host, eventName, target, methodName) {
var hbl = host.__boundListeners;
if (!hbl) {
return;
}
var bl = hbl.get(target);
if (!bl) {
return;
}
var key = this._boundListenerKey(eventName, methodName);
return bl[key];
},
_createEventHandler: function (node, eventName, methodName) {
var host = this;
var handler = function (e) {
if (host[methodName]) {
host[methodName](e, e.detail);
} else {
host._warn(host._logf('_createEventHandler', 'listener method `' + methodName + '` not defined'));
}
};
handler._listening = false;
this._recordEventHandler(host, eventName, node, methodName, handler);
return handler;
},
unlisten: function (node, eventName, methodName) {
var handler = this._recallEventHandler(this, eventName, node, methodName);
if (handler) {
this._unlisten(node, eventName, handler);
handler._listening = false;
}
},
_listen: function (node, eventName, handler) {
node.addEventListener(eventName, handler);
},
_unlisten: function (node, eventName, handler) {
node.removeEventListener(eventName, handler);
}
});
(function () {
'use strict';
var HAS_NATIVE_TA = typeof document.head.style.touchAction === 'string';
var GESTURE_KEY = '__polymerGestures';
var HANDLED_OBJ = '__polymerGesturesHandled';
var TOUCH_ACTION = '__polymerGesturesTouchAction';
var TAP_DISTANCE = 25;
var TRACK_DISTANCE = 5;
var TRACK_LENGTH = 2;
var MOUSE_TIMEOUT = 2500;
var MOUSE_EVENTS = [
'mousedown',
'mousemove',
'mouseup',
'click'
];
var MOUSE_WHICH_TO_BUTTONS = [
0,
1,
4,
2
];
var MOUSE_HAS_BUTTONS = function () {
try {
return new MouseEvent('test', { buttons: 1 }).buttons === 1;
} catch (e) {
return false;
}
}();
var IS_TOUCH_ONLY = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
var mouseCanceller = function (mouseEvent) {
mouseEvent[HANDLED_OBJ] = { skip: true };
if (mouseEvent.type === 'click') {
var path = Polymer.dom(mouseEvent).path;
for (var i = 0; i < path.length; i++) {
if (path[i] === POINTERSTATE.mouse.target) {
return;
}
}
mouseEvent.preventDefault();
mouseEvent.stopPropagation();
}
};
function setupTeardownMouseCanceller(setup) {
for (var i = 0, en; i < MOUSE_EVENTS.length; i++) {
en = MOUSE_EVENTS[i];
if (setup) {
document.addEventListener(en, mouseCanceller, true);
} else {
document.removeEventListener(en, mouseCanceller, true);
}
}
}
function ignoreMouse() {
if (IS_TOUCH_ONLY) {
return;
}
if (!POINTERSTATE.mouse.mouseIgnoreJob) {
setupTeardownMouseCanceller(true);
}
var unset = function () {
setupTeardownMouseCanceller();
POINTERSTATE.mouse.target = null;
POINTERSTATE.mouse.mouseIgnoreJob = null;
};
POINTERSTATE.mouse.mouseIgnoreJob = Polymer.Debounce(POINTERSTATE.mouse.mouseIgnoreJob, unset, MOUSE_TIMEOUT);
}
function hasLeftMouseButton(ev) {
var type = ev.type;
if (MOUSE_EVENTS.indexOf(type) === -1) {
return false;
}
if (type === 'mousemove') {
var buttons = ev.buttons === undefined ? 1 : ev.buttons;
if (ev instanceof window.MouseEvent && !MOUSE_HAS_BUTTONS) {
buttons = MOUSE_WHICH_TO_BUTTONS[ev.which] || 0;
}
return Boolean(buttons & 1);
} else {
var button = ev.button === undefined ? 0 : ev.button;
return button === 0;
}
}
function isSyntheticClick(ev) {
if (ev.type === 'click') {
if (ev.detail === 0) {
return true;
}
var t = Gestures.findOriginalTarget(ev);
var bcr = t.getBoundingClientRect();
var x = ev.pageX, y = ev.pageY;
return !(x >= bcr.left && x <= bcr.right && (y >= bcr.top && y <= bcr.bottom));
}
return false;
}
var POINTERSTATE = {
mouse: {
target: null,
mouseIgnoreJob: null
},
touch: {
x: 0,
y: 0,
id: -1,
scrollDecided: false
}
};
function firstTouchAction(ev) {
var path = Polymer.dom(ev).path;
var ta = 'auto';
for (var i = 0, n; i < path.length; i++) {
n = path[i];
if (n[TOUCH_ACTION]) {
ta = n[TOUCH_ACTION];
break;
}
}
return ta;
}
function trackDocument(stateObj, movefn, upfn) {
stateObj.movefn = movefn;
stateObj.upfn = upfn;
document.addEventListener('mousemove', movefn);
document.addEventListener('mouseup', upfn);
}
function untrackDocument(stateObj) {
document.removeEventListener('mousemove', stateObj.movefn);
document.removeEventListener('mouseup', stateObj.upfn);
}
var Gestures = {
gestures: {},
recognizers: [],
deepTargetFind: function (x, y) {
var node = document.elementFromPoint(x, y);
var next = node;
while (next && next.shadowRoot) {
next = next.shadowRoot.elementFromPoint(x, y);
if (next) {
node = next;
}
}
return node;
},
findOriginalTarget: function (ev) {
if (ev.path) {
return ev.path[0];
}
return ev.target;
},
handleNative: function (ev) {
var handled;
var type = ev.type;
var node = ev.currentTarget;
var gobj = node[GESTURE_KEY];
var gs = gobj[type];
if (!gs) {
return;
}
if (!ev[HANDLED_OBJ]) {
ev[HANDLED_OBJ] = {};
if (type.slice(0, 5) === 'touch') {
var t = ev.changedTouches[0];
if (type === 'touchstart') {
if (ev.touches.length === 1) {
POINTERSTATE.touch.id = t.identifier;
}
}
if (POINTERSTATE.touch.id !== t.identifier) {
return;
}
if (!HAS_NATIVE_TA) {
if (type === 'touchstart' || type === 'touchmove') {
Gestures.handleTouchAction(ev);
}
}
if (type === 'touchend') {
POINTERSTATE.mouse.target = Polymer.dom(ev).rootTarget;
ignoreMouse(true);
}
}
}
handled = ev[HANDLED_OBJ];
if (handled.skip) {
return;
}
var recognizers = Gestures.recognizers;
for (var i = 0, r; i < recognizers.length; i++) {
r = recognizers[i];
if (gs[r.name] && !handled[r.name]) {
if (r.flow && r.flow.start.indexOf(ev.type) > -1) {
if (r.reset) {
r.reset();
}
}
}
}
for (var i = 0, r; i < recognizers.length; i++) {
r = recognizers[i];
if (gs[r.name] && !handled[r.name]) {
handled[r.name] = true;
r[type](ev);
}
}
},
handleTouchAction: function (ev) {
var t = ev.changedTouches[0];
var type = ev.type;
if (type === 'touchstart') {
POINTERSTATE.touch.x = t.clientX;
POINTERSTATE.touch.y = t.clientY;
POINTERSTATE.touch.scrollDecided = false;
} else if (type === 'touchmove') {
if (POINTERSTATE.touch.scrollDecided) {
return;
}
POINTERSTATE.touch.scrollDecided = true;
var ta = firstTouchAction(ev);
var prevent = false;
var dx = Math.abs(POINTERSTATE.touch.x - t.clientX);
var dy = Math.abs(POINTERSTATE.touch.y - t.clientY);
if (!ev.cancelable) {
} else if (ta === 'none') {
prevent = true;
} else if (ta === 'pan-x') {
prevent = dy > dx;
} else if (ta === 'pan-y') {
prevent = dx > dy;
}
if (prevent) {
ev.preventDefault();
} else {
Gestures.prevent('track');
}
}
},
add: function (node, evType, handler) {
var recognizer = this.gestures[evType];
var deps = recognizer.deps;
var name = recognizer.name;
var gobj = node[GESTURE_KEY];
if (!gobj) {
node[GESTURE_KEY] = gobj = {};
}
for (var i = 0, dep, gd; i < deps.length; i++) {
dep = deps[i];
if (IS_TOUCH_ONLY && MOUSE_EVENTS.indexOf(dep) > -1) {
continue;
}
gd = gobj[dep];
if (!gd) {
gobj[dep] = gd = { _count: 0 };
}
if (gd._count === 0) {
node.addEventListener(dep, this.handleNative);
}
gd[name] = (gd[name] || 0) + 1;
gd._count = (gd._count || 0) + 1;
}
node.addEventListener(evType, handler);
if (recognizer.touchAction) {
this.setTouchAction(node, recognizer.touchAction);
}
},
remove: function (node, evType, handler) {
var recognizer = this.gestures[evType];
var deps = recognizer.deps;
var name = recognizer.name;
var gobj = node[GESTURE_KEY];
if (gobj) {
for (var i = 0, dep, gd; i < deps.length; i++) {
dep = deps[i];
gd = gobj[dep];
if (gd && gd[name]) {
gd[name] = (gd[name] || 1) - 1;
gd._count = (gd._count || 1) - 1;
if (gd._count === 0) {
node.removeEventListener(dep, this.handleNative);
}
}
}
}
node.removeEventListener(evType, handler);
},
register: function (recog) {
this.recognizers.push(recog);
for (var i = 0; i < recog.emits.length; i++) {
this.gestures[recog.emits[i]] = recog;
}
},
findRecognizerByEvent: function (evName) {
for (var i = 0, r; i < this.recognizers.length; i++) {
r = this.recognizers[i];
for (var j = 0, n; j < r.emits.length; j++) {
n = r.emits[j];
if (n === evName) {
return r;
}
}
}
return null;
},
setTouchAction: function (node, value) {
if (HAS_NATIVE_TA) {
node.style.touchAction = value;
}
node[TOUCH_ACTION] = value;
},
fire: function (target, type, detail) {
var ev = Polymer.Base.fire(type, detail, {
node: target,
bubbles: true,
cancelable: true
});
if (ev.defaultPrevented) {
var se = detail.sourceEvent;
if (se && se.preventDefault) {
se.preventDefault();
}
}
},
prevent: function (evName) {
var recognizer = this.findRecognizerByEvent(evName);
if (recognizer.info) {
recognizer.info.prevent = true;
}
}
};
Gestures.register({
name: 'downup',
deps: [
'mousedown',
'touchstart',
'touchend'
],
flow: {
start: [
'mousedown',
'touchstart'
],
end: [
'mouseup',
'touchend'
]
},
emits: [
'down',
'up'
],
info: {
movefn: function () {
},
upfn: function () {
}
},
reset: function () {
untrackDocument(this.info);
},
mousedown: function (e) {
if (!hasLeftMouseButton(e)) {
return;
}
var t = Gestures.findOriginalTarget(e);
var self = this;
var movefn = function movefn(e) {
if (!hasLeftMouseButton(e)) {
self.fire('up', t, e);
untrackDocument(self.info);
}
};
var upfn = function upfn(e) {
if (hasLeftMouseButton(e)) {
self.fire('up', t, e);
}
untrackDocument(self.info);
};
trackDocument(this.info, movefn, upfn);
this.fire('down', t, e);
},
touchstart: function (e) {
this.fire('down', Gestures.findOriginalTarget(e), e.changedTouches[0]);
},
touchend: function (e) {
this.fire('up', Gestures.findOriginalTarget(e), e.changedTouches[0]);
},
fire: function (type, target, event) {
var self = this;
Gestures.fire(target, type, {
x: event.clientX,
y: event.clientY,
sourceEvent: event,
prevent: Gestures.prevent.bind(Gestures)
});
}
});
Gestures.register({
name: 'track',
touchAction: 'none',
deps: [
'mousedown',
'touchstart',
'touchmove',
'touchend'
],
flow: {
start: [
'mousedown',
'touchstart'
],
end: [
'mouseup',
'touchend'
]
},
emits: ['track'],
info: {
x: 0,
y: 0,
state: 'start',
started: false,
moves: [],
addMove: function (move) {
if (this.moves.length > TRACK_LENGTH) {
this.moves.shift();
}
this.moves.push(move);
},
movefn: function () {
},
upfn: function () {
},
prevent: false
},
reset: function () {
this.info.state = 'start';
this.info.started = false;
this.info.moves = [];
this.info.x = 0;
this.info.y = 0;
this.info.prevent = false;
untrackDocument(this.info);
},
hasMovedEnough: function (x, y) {
if (this.info.prevent) {
return false;
}
if (this.info.started) {
return true;
}
var dx = Math.abs(this.info.x - x);
var dy = Math.abs(this.info.y - y);
return dx >= TRACK_DISTANCE || dy >= TRACK_DISTANCE;
},
mousedown: function (e) {
if (!hasLeftMouseButton(e)) {
return;
}
var t = Gestures.findOriginalTarget(e);
var self = this;
var movefn = function movefn(e) {
var x = e.clientX, y = e.clientY;
if (self.hasMovedEnough(x, y)) {
self.info.state = self.info.started ? e.type === 'mouseup' ? 'end' : 'track' : 'start';
self.info.addMove({
x: x,
y: y
});
if (!hasLeftMouseButton(e)) {
self.info.state = 'end';
untrackDocument(self.info);
}
self.fire(t, e);
self.info.started = true;
}
};
var upfn = function upfn(e) {
if (self.info.started) {
Gestures.prevent('tap');
movefn(e);
}
untrackDocument(self.info);
};
trackDocument(this.info, movefn, upfn);
this.info.x = e.clientX;
this.info.y = e.clientY;
},
touchstart: function (e) {
var ct = e.changedTouches[0];
this.info.x = ct.clientX;
this.info.y = ct.clientY;
},
touchmove: function (e) {
var t = Gestures.findOriginalTarget(e);
var ct = e.changedTouches[0];
var x = ct.clientX, y = ct.clientY;
if (this.hasMovedEnough(x, y)) {
this.info.addMove({
x: x,
y: y
});
this.fire(t, ct);
this.info.state = 'track';
this.info.started = true;
}
},
touchend: function (e) {
var t = Gestures.findOriginalTarget(e);
var ct = e.changedTouches[0];
if (this.info.started) {
Gestures.prevent('tap');
this.info.state = 'end';
this.info.addMove({
x: ct.clientX,
y: ct.clientY
});
this.fire(t, ct);
}
},
fire: function (target, touch) {
var secondlast = this.info.moves[this.info.moves.length - 2];
var lastmove = this.info.moves[this.info.moves.length - 1];
var dx = lastmove.x - this.info.x;
var dy = lastmove.y - this.info.y;
var ddx, ddy = 0;
if (secondlast) {
ddx = lastmove.x - secondlast.x;
ddy = lastmove.y - secondlast.y;
}
return Gestures.fire(target, 'track', {
state: this.info.state,
x: touch.clientX,
y: touch.clientY,
dx: dx,
dy: dy,
ddx: ddx,
ddy: ddy,
sourceEvent: touch,
hover: function () {
return Gestures.deepTargetFind(touch.clientX, touch.clientY);
}
});
}
});
Gestures.register({
name: 'tap',
deps: [
'mousedown',
'click',
'touchstart',
'touchend'
],
flow: {
start: [
'mousedown',
'touchstart'
],
end: [
'click',
'touchend'
]
},
emits: ['tap'],
info: {
x: NaN,
y: NaN,
prevent: false
},
reset: function () {
this.info.x = NaN;
this.info.y = NaN;
this.info.prevent = false;
},
save: function (e) {
this.info.x = e.clientX;
this.info.y = e.clientY;
},
mousedown: function (e) {
if (hasLeftMouseButton(e)) {
this.save(e);
}
},
click: function (e) {
if (hasLeftMouseButton(e)) {
this.forward(e);
}
},
touchstart: function (e) {
this.save(e.changedTouches[0]);
},
touchend: function (e) {
this.forward(e.changedTouches[0]);
},
forward: function (e) {
var dx = Math.abs(e.clientX - this.info.x);
var dy = Math.abs(e.clientY - this.info.y);
var t = Gestures.findOriginalTarget(e);
if (isNaN(dx) || isNaN(dy) || dx <= TAP_DISTANCE && dy <= TAP_DISTANCE || isSyntheticClick(e)) {
if (!this.info.prevent) {
Gestures.fire(t, 'tap', {
x: e.clientX,
y: e.clientY,
sourceEvent: e
});
}
}
}
});
var DIRECTION_MAP = {
x: 'pan-x',
y: 'pan-y',
none: 'none',
all: 'auto'
};
Polymer.Base._addFeature({
_listen: function (node, eventName, handler) {
if (Gestures.gestures[eventName]) {
Gestures.add(node, eventName, handler);
} else {
node.addEventListener(eventName, handler);
}
},
_unlisten: function (node, eventName, handler) {
if (Gestures.gestures[eventName]) {
Gestures.remove(node, eventName, handler);
} else {
node.removeEventListener(eventName, handler);
}
},
setScrollDirection: function (direction, node) {
node = node || this;
Gestures.setTouchAction(node, DIRECTION_MAP[direction] || 'auto');
}
});
Polymer.Gestures = Gestures;
}());
Polymer.Async = {
_currVal: 0,
_lastVal: 0,
_callbacks: [],
_twiddleContent: 0,
_twiddle: document.createTextNode(''),
run: function (callback, waitTime) {
if (waitTime > 0) {
return ~setTimeout(callback, waitTime);
} else {
this._twiddle.textContent = this._twiddleContent++;
this._callbacks.push(callback);
return this._currVal++;
}
},
cancel: function (handle) {
if (handle < 0) {
clearTimeout(~handle);
} else {
var idx = handle - this._lastVal;
if (idx >= 0) {
if (!this._callbacks[idx]) {
throw 'invalid async handle: ' + handle;
}
this._callbacks[idx] = null;
}
}
},
_atEndOfMicrotask: function () {
var len = this._callbacks.length;
for (var i = 0; i < len; i++) {
var cb = this._callbacks[i];
if (cb) {
try {
cb();
} catch (e) {
i++;
this._callbacks.splice(0, i);
this._lastVal += i;
this._twiddle.textContent = this._twiddleContent++;
throw e;
}
}
}
this._callbacks.splice(0, len);
this._lastVal += len;
}
};
new window.MutationObserver(function () {
Polymer.Async._atEndOfMicrotask();
}).observe(Polymer.Async._twiddle, { characterData: true });
Polymer.Debounce = function () {
var Async = Polymer.Async;
var Debouncer = function (context) {
this.context = context;
this.boundComplete = this.complete.bind(this);
};
Debouncer.prototype = {
go: function (callback, wait) {
var h;
this.finish = function () {
Async.cancel(h);
};
h = Async.run(this.boundComplete, wait);
this.callback = callback;
},
stop: function () {
if (this.finish) {
this.finish();
this.finish = null;
}
},
complete: function () {
if (this.finish) {
this.stop();
this.callback.call(this.context);
}
}
};
function debounce(debouncer, callback, wait) {
if (debouncer) {
debouncer.stop();
} else {
debouncer = new Debouncer(this);
}
debouncer.go(callback, wait);
return debouncer;
}
return debounce;
}();
Polymer.Base._addFeature({
$$: function (slctr) {
return Polymer.dom(this.root).querySelector(slctr);
},
toggleClass: function (name, bool, node) {
node = node || this;
if (arguments.length == 1) {
bool = !node.classList.contains(name);
}
if (bool) {
Polymer.dom(node).classList.add(name);
} else {
Polymer.dom(node).classList.remove(name);
}
},
toggleAttribute: function (name, bool, node) {
node = node || this;
if (arguments.length == 1) {
bool = !node.hasAttribute(name);
}
if (bool) {
Polymer.dom(node).setAttribute(name, '');
} else {
Polymer.dom(node).removeAttribute(name);
}
},
classFollows: function (name, toElement, fromElement) {
if (fromElement) {
Polymer.dom(fromElement).classList.remove(name);
}
if (toElement) {
Polymer.dom(toElement).classList.add(name);
}
},
attributeFollows: function (name, toElement, fromElement) {
if (fromElement) {
Polymer.dom(fromElement).removeAttribute(name);
}
if (toElement) {
Polymer.dom(toElement).setAttribute(name, '');
}
},
getEffectiveChildNodes: function () {
return Polymer.dom(this).getEffectiveChildNodes();
},
getEffectiveChildren: function () {
var list = Polymer.dom(this).getEffectiveChildNodes();
return list.filter(function (n) {
return n.nodeType === Node.ELEMENT_NODE;
});
},
getEffectiveTextContent: function () {
var cn = this.getEffectiveChildNodes();
var tc = [];
for (var i = 0, c; c = cn[i]; i++) {
if (c.nodeType !== Node.COMMENT_NODE) {
tc.push(Polymer.dom(c).textContent);
}
}
return tc.join('');
},
queryEffectiveChildren: function (slctr) {
var e$ = Polymer.dom(this).queryDistributedElements(slctr);
return e$ && e$[0];
},
queryAllEffectiveChildren: function (slctr) {
return Polymer.dom(this).queryAllDistributedElements(slctr);
},
getContentChildNodes: function (slctr) {
var content = Polymer.dom(this.root).querySelector(slctr || 'content');
return content ? Polymer.dom(content).getDistributedNodes() : [];
},
getContentChildren: function (slctr) {
return this.getContentChildNodes(slctr).filter(function (n) {
return n.nodeType === Node.ELEMENT_NODE;
});
},
fire: function (type, detail, options) {
options = options || Polymer.nob;
var node = options.node || this;
var detail = detail === null || detail === undefined ? Polymer.nob : detail;
var bubbles = options.bubbles === undefined ? true : options.bubbles;
var cancelable = Boolean(options.cancelable);
var event = new CustomEvent(type, {
bubbles: Boolean(bubbles),
cancelable: cancelable,
detail: detail
});
node.dispatchEvent(event);
return event;
},
async: function (callback, waitTime) {
return Polymer.Async.run(callback.bind(this), waitTime);
},
cancelAsync: function (handle) {
Polymer.Async.cancel(handle);
},
arrayDelete: function (path, item) {
var index;
if (Array.isArray(path)) {
index = path.indexOf(item);
if (index >= 0) {
return path.splice(index, 1);
}
} else {
var arr = this._get(path);
index = arr.indexOf(item);
if (index >= 0) {
return this.splice(path, index, 1);
}
}
},
transform: function (transform, node) {
node = node || this;
node.style.webkitTransform = transform;
node.style.transform = transform;
},
translate3d: function (x, y, z, node) {
node = node || this;
this.transform('translate3d(' + x + ',' + y + ',' + z + ')', node);
},
importHref: function (href, onload, onerror) {
var l = document.createElement('link');
l.rel = 'import';
l.href = href;
if (onload) {
l.onload = onload.bind(this);
}
if (onerror) {
l.onerror = onerror.bind(this);
}
document.head.appendChild(l);
return l;
},
create: function (tag, props) {
var elt = document.createElement(tag);
if (props) {
for (var n in props) {
elt[n] = props[n];
}
}
return elt;
},
isLightDescendant: function (node) {
return this !== node && this.contains(node) && Polymer.dom(this).getOwnerRoot() === Polymer.dom(node).getOwnerRoot();
},
isLocalDescendant: function (node) {
return this.root === Polymer.dom(node).getOwnerRoot();
}
});
Polymer.Bind = {
prepareModel: function (model) {
model._propertyEffects = {};
model._bindListeners = [];
Polymer.Base.mixin(model, this._modelApi);
},
_modelApi: {
_notifyChange: function (property) {
var eventName = Polymer.CaseMap.camelToDashCase(property) + '-changed';
Polymer.Base.fire(eventName, { value: this[property] }, {
bubbles: false,
node: this
});
},
_propertySetter: function (property, value, effects, fromAbove) {
var old = this.__data__[property];
if (old !== value && (old === old || value === value)) {
this.__data__[property] = value;
if (typeof value == 'object') {
this._clearPath(property);
}
if (this._propertyChanged) {
this._propertyChanged(property, value, old);
}
if (effects) {
this._effectEffects(property, value, effects, old, fromAbove);
}
}
return old;
},
__setProperty: function (property, value, quiet, node) {
node = node || this;
var effects = node._propertyEffects && node._propertyEffects[property];
if (effects) {
node._propertySetter(property, value, effects, quiet);
} else {
node[property] = value;
}
},
_effectEffects: function (property, value, effects, old, fromAbove) {
effects.forEach(function (fx) {
var fn = Polymer.Bind['_' + fx.kind + 'Effect'];
if (fn) {
fn.call(this, property, value, fx.effect, old, fromAbove);
}
}, this);
},
_clearPath: function (path) {
for (var prop in this.__data__) {
if (prop.indexOf(path + '.') === 0) {
this.__data__[prop] = undefined;
}
}
}
},
ensurePropertyEffects: function (model, property) {
var fx = model._propertyEffects[property];
if (!fx) {
fx = model._propertyEffects[property] = [];
}
return fx;
},
addPropertyEffect: function (model, property, kind, effect) {
var fx = this.ensurePropertyEffects(model, property);
fx.push({
kind: kind,
effect: effect
});
},
createBindings: function (model) {
var fx$ = model._propertyEffects;
if (fx$) {
for (var n in fx$) {
var fx = fx$[n];
fx.sort(this._sortPropertyEffects);
this._createAccessors(model, n, fx);
}
}
},
_sortPropertyEffects: function () {
var EFFECT_ORDER = {
'compute': 0,
'annotation': 1,
'computedAnnotation': 2,
'reflect': 3,
'notify': 4,
'observer': 5,
'complexObserver': 6,
'function': 7
};
return function (a, b) {
return EFFECT_ORDER[a.kind] - EFFECT_ORDER[b.kind];
};
}(),
_createAccessors: function (model, property, effects) {
var defun = {
get: function () {
return this.__data__[property];
}
};
var setter = function (value) {
this._propertySetter(property, value, effects);
};
var info = model.getPropertyInfo && model.getPropertyInfo(property);
if (info && info.readOnly) {
if (!info.computed) {
model['_set' + this.upper(property)] = setter;
}
} else {
defun.set = setter;
}
Object.defineProperty(model, property, defun);
},
upper: function (name) {
return name[0].toUpperCase() + name.substring(1);
},
_addAnnotatedListener: function (model, index, property, path, event) {
var fn = this._notedListenerFactory(property, path, this._isStructured(path), this._isEventBogus);
var eventName = event || Polymer.CaseMap.camelToDashCase(property) + '-changed';
model._bindListeners.push({
index: index,
property: property,
path: path,
changedFn: fn,
event: eventName
});
},
_isStructured: function (path) {
return path.indexOf('.') > 0;
},
_isEventBogus: function (e, target) {
return e.path && e.path[0] !== target;
},
_notedListenerFactory: function (property, path, isStructured, bogusTest) {
return function (e, target) {
if (!bogusTest(e, target)) {
if (e.detail && e.detail.path) {
this._notifyPath(this._fixPath(path, property, e.detail.path), e.detail.value);
} else {
var value = target[property];
if (!isStructured) {
this[path] = target[property];
} else {
if (this.__data__[path] != value) {
this.set(path, value);
}
}
}
}
};
},
prepareInstance: function (inst) {
inst.__data__ = Object.create(null);
},
setupBindListeners: function (inst) {
inst._bindListeners.forEach(function (info) {
var node = inst._nodes[info.index];
node.addEventListener(info.event, inst._notifyListener.bind(inst, info.changedFn));
});
}
};
Polymer.Base.extend(Polymer.Bind, {
_shouldAddListener: function (effect) {
return effect.name && effect.kind != 'attribute' && effect.kind != 'text' && !effect.isCompound && effect.parts[0].mode === '{' && !effect.parts[0].negate;
},
_annotationEffect: function (source, value, effect) {
if (source != effect.value) {
value = this._get(effect.value);
this.__data__[effect.value] = value;
}
var calc = effect.negate ? !value : value;
if (!effect.customEvent || this._nodes[effect.index][effect.name] !== calc) {
return this._applyEffectValue(effect, calc);
}
},
_reflectEffect: function (source) {
this.reflectPropertyToAttribute(source);
},
_notifyEffect: function (source, value, effect, old, fromAbove) {
if (!fromAbove) {
this._notifyChange(source);
}
},
_functionEffect: function (source, value, fn, old, fromAbove) {
fn.call(this, source, value, old, fromAbove);
},
_observerEffect: function (source, value, effect, old) {
var fn = this[effect.method];
if (fn) {
fn.call(this, value, old);
} else {
this._warn(this._logf('_observerEffect', 'observer method `' + effect.method + '` not defined'));
}
},
_complexObserverEffect: function (source, value, effect) {
var fn = this[effect.method];
if (fn) {
var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
if (args) {
fn.apply(this, args);
}
} else {
this._warn(this._logf('_complexObserverEffect', 'observer method `' + effect.method + '` not defined'));
}
},
_computeEffect: function (source, value, effect) {
var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
if (args) {
var fn = this[effect.method];
if (fn) {
this.__setProperty(effect.name, fn.apply(this, args));
} else {
this._warn(this._logf('_computeEffect', 'compute method `' + effect.method + '` not defined'));
}
}
},
_annotatedComputationEffect: function (source, value, effect) {
var computedHost = this._rootDataHost || this;
var fn = computedHost[effect.method];
if (fn) {
var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
if (args) {
var computedvalue = fn.apply(computedHost, args);
if (effect.negate) {
computedvalue = !computedvalue;
}
this._applyEffectValue(effect, computedvalue);
}
} else {
computedHost._warn(computedHost._logf('_annotatedComputationEffect', 'compute method `' + effect.method + '` not defined'));
}
},
_marshalArgs: function (model, effect, path, value) {
var values = [];
var args = effect.args;
for (var i = 0, l = args.length; i < l; i++) {
var arg = args[i];
var name = arg.name;
var v;
if (arg.literal) {
v = arg.value;
} else if (arg.structured) {
v = Polymer.Base._get(name, model);
} else {
v = model[name];
}
if (args.length > 1 && v === undefined) {
return;
}
if (arg.wildcard) {
var baseChanged = name.indexOf(path + '.') === 0;
var matches = effect.trigger.name.indexOf(name) === 0 && !baseChanged;
values[i] = {
path: matches ? path : name,
value: matches ? value : v,
base: v
};
} else {
values[i] = v;
}
}
return values;
}
});
Polymer.Base._addFeature({
_addPropertyEffect: function (property, kind, effect) {
Polymer.Bind.addPropertyEffect(this, property, kind, effect);
},
_prepEffects: function () {
Polymer.Bind.prepareModel(this);
this._addAnnotationEffects(this._notes);
},
_prepBindings: function () {
Polymer.Bind.createBindings(this);
},
_addPropertyEffects: function (properties) {
if (properties) {
for (var p in properties) {
var prop = properties[p];
if (prop.observer) {
this._addObserverEffect(p, prop.observer);
}
if (prop.computed) {
prop.readOnly = true;
this._addComputedEffect(p, prop.computed);
}
if (prop.notify) {
this._addPropertyEffect(p, 'notify');
}
if (prop.reflectToAttribute) {
this._addPropertyEffect(p, 'reflect');
}
if (prop.readOnly) {
Polymer.Bind.ensurePropertyEffects(this, p);
}
}
}
},
_addComputedEffect: function (name, expression) {
var sig = this._parseMethod(expression);
sig.args.forEach(function (arg) {
this._addPropertyEffect(arg.model, 'compute', {
method: sig.method,
args: sig.args,
trigger: arg,
name: name
});
}, this);
},
_addObserverEffect: function (property, observer) {
this._addPropertyEffect(property, 'observer', {
method: observer,
property: property
});
},
_addComplexObserverEffects: function (observers) {
if (observers) {
observers.forEach(function (observer) {
this._addComplexObserverEffect(observer);
}, this);
}
},
_addComplexObserverEffect: function (observer) {
var sig = this._parseMethod(observer);
sig.args.forEach(function (arg) {
this._addPropertyEffect(arg.model, 'complexObserver', {
method: sig.method,
args: sig.args,
trigger: arg
});
}, this);
},
_addAnnotationEffects: function (notes) {
this._nodes = [];
notes.forEach(function (note) {
var index = this._nodes.push(note) - 1;
note.bindings.forEach(function (binding) {
this._addAnnotationEffect(binding, index);
}, this);
}, this);
},
_addAnnotationEffect: function (note, index) {
if (Polymer.Bind._shouldAddListener(note)) {
Polymer.Bind._addAnnotatedListener(this, index, note.name, note.parts[0].value, note.parts[0].event);
}
for (var i = 0; i < note.parts.length; i++) {
var part = note.parts[i];
if (part.signature) {
this._addAnnotatedComputationEffect(note, part, index);
} else if (!part.literal) {
this._addPropertyEffect(part.model, 'annotation', {
kind: note.kind,
index: index,
name: note.name,
value: part.value,
isCompound: note.isCompound,
compoundIndex: part.compoundIndex,
event: part.event,
customEvent: part.customEvent,
negate: part.negate
});
}
}
},
_addAnnotatedComputationEffect: function (note, part, index) {
var sig = part.signature;
if (sig.static) {
this.__addAnnotatedComputationEffect('__static__', index, note, part, null);
} else {
sig.args.forEach(function (arg) {
if (!arg.literal) {
this.__addAnnotatedComputationEffect(arg.model, index, note, part, arg);
}
}, this);
}
},
__addAnnotatedComputationEffect: function (property, index, note, part, trigger) {
this._addPropertyEffect(property, 'annotatedComputation', {
index: index,
isCompound: note.isCompound,
compoundIndex: part.compoundIndex,
kind: note.kind,
name: note.name,
negate: part.negate,
method: part.signature.method,
args: part.signature.args,
trigger: trigger
});
},
_parseMethod: function (expression) {
var m = expression.match(/([^\s]+)\((.*)\)/);
if (m) {
var sig = {
method: m[1],
static: true
};
if (m[2].trim()) {
var args = m[2].replace(/\\,/g, '&comma;').split(',');
return this._parseArgs(args, sig);
} else {
sig.args = Polymer.nar;
return sig;
}
}
},
_parseArgs: function (argList, sig) {
sig.args = argList.map(function (rawArg) {
var arg = this._parseArg(rawArg);
if (!arg.literal) {
sig.static = false;
}
return arg;
}, this);
return sig;
},
_parseArg: function (rawArg) {
var arg = rawArg.trim().replace(/&comma;/g, ',').replace(/\\(.)/g, '$1');
var a = {
name: arg,
model: this._modelForPath(arg)
};
var fc = arg[0];
if (fc === '-') {
fc = arg[1];
}
if (fc >= '0' && fc <= '9') {
fc = '#';
}
switch (fc) {
case '\'':
case '"':
a.value = arg.slice(1, -1);
a.literal = true;
break;
case '#':
a.value = Number(arg);
a.literal = true;
break;
}
if (!a.literal) {
a.structured = arg.indexOf('.') > 0;
if (a.structured) {
a.wildcard = arg.slice(-2) == '.*';
if (a.wildcard) {
a.name = arg.slice(0, -2);
}
}
}
return a;
},
_marshalInstanceEffects: function () {
Polymer.Bind.prepareInstance(this);
Polymer.Bind.setupBindListeners(this);
},
_applyEffectValue: function (info, value) {
var node = this._nodes[info.index];
var property = info.name;
if (info.isCompound) {
var storage = node.__compoundStorage__[property];
storage[info.compoundIndex] = value;
value = storage.join('');
}
if (info.kind == 'attribute') {
this.serializeValueToAttribute(value, property, node);
} else {
if (property === 'className') {
value = this._scopeElementClass(node, value);
}
if (property === 'textContent' || node.localName == 'input' && property == 'value') {
value = value == undefined ? '' : value;
}
return node[property] = value;
}
},
_executeStaticEffects: function () {
if (this._propertyEffects.__static__) {
this._effectEffects('__static__', null, this._propertyEffects.__static__);
}
}
});
Polymer.Base._addFeature({
_setupConfigure: function (initialConfig) {
this._config = {};
for (var i in initialConfig) {
if (initialConfig[i] !== undefined) {
this._config[i] = initialConfig[i];
}
}
this._handlers = [];
},
_marshalAttributes: function () {
this._takeAttributesToModel(this._config);
},
_attributeChangedImpl: function (name) {
var model = this._clientsReadied ? this : this._config;
this._setAttributeToProperty(model, name);
},
_configValue: function (name, value) {
this._config[name] = value;
},
_beforeClientsReady: function () {
this._configure();
},
_configure: function () {
this._configureAnnotationReferences();
this._aboveConfig = this.mixin({}, this._config);
var config = {};
this.behaviors.forEach(function (b) {
this._configureProperties(b.properties, config);
}, this);
this._configureProperties(this.properties, config);
this._mixinConfigure(config, this._aboveConfig);
this._config = config;
this._distributeConfig(this._config);
},
_configureProperties: function (properties, config) {
for (var i in properties) {
var c = properties[i];
if (c.value !== undefined) {
var value = c.value;
if (typeof value == 'function') {
value = value.call(this, this._config);
}
config[i] = value;
}
}
},
_mixinConfigure: function (a, b) {
for (var prop in b) {
if (!this.getPropertyInfo(prop).readOnly) {
a[prop] = b[prop];
}
}
},
_distributeConfig: function (config) {
var fx$ = this._propertyEffects;
if (fx$) {
for (var p in config) {
var fx = fx$[p];
if (fx) {
for (var i = 0, l = fx.length, x; i < l && (x = fx[i]); i++) {
if (x.kind === 'annotation' && !x.isCompound) {
var node = this._nodes[x.effect.index];
if (node._configValue) {
var value = p === x.effect.value ? config[p] : this._get(x.effect.value, config);
node._configValue(x.effect.name, value);
}
}
}
}
}
}
},
_afterClientsReady: function () {
this._executeStaticEffects();
this._applyConfig(this._config, this._aboveConfig);
this._flushHandlers();
},
_applyConfig: function (config, aboveConfig) {
for (var n in config) {
if (this[n] === undefined) {
this.__setProperty(n, config[n], n in aboveConfig);
}
}
},
_notifyListener: function (fn, e) {
if (!this._clientsReadied) {
this._queueHandler([
fn,
e,
e.target
]);
} else {
return fn.call(this, e, e.target);
}
},
_queueHandler: function (args) {
this._handlers.push(args);
},
_flushHandlers: function () {
var h$ = this._handlers;
for (var i = 0, l = h$.length, h; i < l && (h = h$[i]); i++) {
h[0].call(this, h[1], h[2]);
}
this._handlers = [];
}
});
(function () {
'use strict';
Polymer.Base._addFeature({
notifyPath: function (path, value, fromAbove) {
var info = {};
this._get(path, this, info);
this._notifyPath(info.path, value, fromAbove);
},
_notifyPath: function (path, value, fromAbove) {
var old = this._propertySetter(path, value);
if (old !== value && (old === old || value === value)) {
this._pathEffector(path, value);
if (!fromAbove) {
this._notifyPathUp(path, value);
}
return true;
}
},
_getPathParts: function (path) {
if (Array.isArray(path)) {
var parts = [];
for (var i = 0; i < path.length; i++) {
var args = path[i].toString().split('.');
for (var j = 0; j < args.length; j++) {
parts.push(args[j]);
}
}
return parts;
} else {
return path.toString().split('.');
}
},
set: function (path, value, root) {
var prop = root || this;
var parts = this._getPathParts(path);
var array;
var last = parts[parts.length - 1];
if (parts.length > 1) {
for (var i = 0; i < parts.length - 1; i++) {
var part = parts[i];
if (array && part[0] == '#') {
prop = Polymer.Collection.get(array).getItem(part);
} else {
prop = prop[part];
if (array && parseInt(part, 10) == part) {
parts[i] = Polymer.Collection.get(array).getKey(prop);
}
}
if (!prop) {
return;
}
array = Array.isArray(prop) ? prop : null;
}
if (array) {
var coll = Polymer.Collection.get(array);
if (last[0] == '#') {
var key = last;
var old = coll.getItem(key);
last = array.indexOf(old);
coll.setItem(key, value);
} else if (parseInt(last, 10) == last) {
var old = prop[last];
var key = coll.getKey(old);
parts[i] = key;
coll.setItem(key, value);
}
}
prop[last] = value;
if (!root) {
this._notifyPath(parts.join('.'), value);
}
} else {
prop[path] = value;
}
},
get: function (path, root) {
return this._get(path, root);
},
_get: function (path, root, info) {
var prop = root || this;
var parts = this._getPathParts(path);
var array;
for (var i = 0; i < parts.length; i++) {
if (!prop) {
return;
}
var part = parts[i];
if (array && part[0] == '#') {
prop = Polymer.Collection.get(array).getItem(part);
} else {
prop = prop[part];
if (info && array && parseInt(part, 10) == part) {
parts[i] = Polymer.Collection.get(array).getKey(prop);
}
}
array = Array.isArray(prop) ? prop : null;
}
if (info) {
info.path = parts.join('.');
}
return prop;
},
_pathEffector: function (path, value) {
var model = this._modelForPath(path);
var fx$ = this._propertyEffects[model];
if (fx$) {
fx$.forEach(function (fx) {
var fxFn = this['_' + fx.kind + 'PathEffect'];
if (fxFn) {
fxFn.call(this, path, value, fx.effect);
}
}, this);
}
if (this._boundPaths) {
this._notifyBoundPaths(path, value);
}
},
_annotationPathEffect: function (path, value, effect) {
if (effect.value === path || effect.value.indexOf(path + '.') === 0) {
Polymer.Bind._annotationEffect.call(this, path, value, effect);
} else if (path.indexOf(effect.value + '.') === 0 && !effect.negate) {
var node = this._nodes[effect.index];
if (node && node._notifyPath) {
var p = this._fixPath(effect.name, effect.value, path);
node._notifyPath(p, value, true);
}
}
},
_complexObserverPathEffect: function (path, value, effect) {
if (this._pathMatchesEffect(path, effect)) {
Polymer.Bind._complexObserverEffect.call(this, path, value, effect);
}
},
_computePathEffect: function (path, value, effect) {
if (this._pathMatchesEffect(path, effect)) {
Polymer.Bind._computeEffect.call(this, path, value, effect);
}
},
_annotatedComputationPathEffect: function (path, value, effect) {
if (this._pathMatchesEffect(path, effect)) {
Polymer.Bind._annotatedComputationEffect.call(this, path, value, effect);
}
},
_pathMatchesEffect: function (path, effect) {
var effectArg = effect.trigger.name;
return effectArg == path || effectArg.indexOf(path + '.') === 0 || effect.trigger.wildcard && path.indexOf(effectArg) === 0;
},
linkPaths: function (to, from) {
this._boundPaths = this._boundPaths || {};
if (from) {
this._boundPaths[to] = from;
} else {
this.unlinkPaths(to);
}
},
unlinkPaths: function (path) {
if (this._boundPaths) {
delete this._boundPaths[path];
}
},
_notifyBoundPaths: function (path, value) {
for (var a in this._boundPaths) {
var b = this._boundPaths[a];
if (path.indexOf(a + '.') == 0) {
this._notifyPath(this._fixPath(b, a, path), value);
} else if (path.indexOf(b + '.') == 0) {
this._notifyPath(this._fixPath(a, b, path), value);
}
}
},
_fixPath: function (property, root, path) {
return property + path.slice(root.length);
},
_notifyPathUp: function (path, value) {
var rootName = this._modelForPath(path);
var dashCaseName = Polymer.CaseMap.camelToDashCase(rootName);
var eventName = dashCaseName + this._EVENT_CHANGED;
this.fire(eventName, {
path: path,
value: value
}, { bubbles: false });
},
_modelForPath: function (path) {
var dot = path.indexOf('.');
return dot < 0 ? path : path.slice(0, dot);
},
_EVENT_CHANGED: '-changed',
notifySplices: function (path, splices) {
var info = {};
var array = this._get(path, this, info);
this._notifySplices(array, info.path, splices);
},
_notifySplices: function (array, path, splices) {
var change = {
keySplices: Polymer.Collection.applySplices(array, splices),
indexSplices: splices
};
if (!array.hasOwnProperty('splices')) {
Object.defineProperty(array, 'splices', {
configurable: true,
writable: true
});
}
array.splices = change;
this._notifyPath(path + '.splices', change);
this._notifyPath(path + '.length', array.length);
change.keySplices = null;
change.indexSplices = null;
},
_notifySplice: function (array, path, index, added, removed) {
this._notifySplices(array, path, [{
index: index,
addedCount: added,
removed: removed,
object: array,
type: 'splice'
}]);
},
push: function (path) {
var info = {};
var array = this._get(path, this, info);
var args = Array.prototype.slice.call(arguments, 1);
var len = array.length;
var ret = array.push.apply(array, args);
if (args.length) {
this._notifySplice(array, info.path, len, args.length, []);
}
return ret;
},
pop: function (path) {
var info = {};
var array = this._get(path, this, info);
var hadLength = Boolean(array.length);
var args = Array.prototype.slice.call(arguments, 1);
var ret = array.pop.apply(array, args);
if (hadLength) {
this._notifySplice(array, info.path, array.length, 0, [ret]);
}
return ret;
},
splice: function (path, start, deleteCount) {
var info = {};
var array = this._get(path, this, info);
if (start < 0) {
start = array.length - Math.floor(-start);
} else {
start = Math.floor(start);
}
if (!start) {
start = 0;
}
var args = Array.prototype.slice.call(arguments, 1);
var ret = array.splice.apply(array, args);
var addedCount = Math.max(args.length - 2, 0);
if (addedCount || ret.length) {
this._notifySplice(array, info.path, start, addedCount, ret);
}
return ret;
},
shift: function (path) {
var info = {};
var array = this._get(path, this, info);
var hadLength = Boolean(array.length);
var args = Array.prototype.slice.call(arguments, 1);
var ret = array.shift.apply(array, args);
if (hadLength) {
this._notifySplice(array, info.path, 0, 0, [ret]);
}
return ret;
},
unshift: function (path) {
var info = {};
var array = this._get(path, this, info);
var args = Array.prototype.slice.call(arguments, 1);
var ret = array.unshift.apply(array, args);
if (args.length) {
this._notifySplice(array, info.path, 0, args.length, []);
}
return ret;
},
prepareModelNotifyPath: function (model) {
this.mixin(model, {
fire: Polymer.Base.fire,
notifyPath: Polymer.Base.notifyPath,
_get: Polymer.Base._get,
_EVENT_CHANGED: Polymer.Base._EVENT_CHANGED,
_notifyPath: Polymer.Base._notifyPath,
_notifyPathUp: Polymer.Base._notifyPathUp,
_pathEffector: Polymer.Base._pathEffector,
_annotationPathEffect: Polymer.Base._annotationPathEffect,
_complexObserverPathEffect: Polymer.Base._complexObserverPathEffect,
_annotatedComputationPathEffect: Polymer.Base._annotatedComputationPathEffect,
_computePathEffect: Polymer.Base._computePathEffect,
_modelForPath: Polymer.Base._modelForPath,
_pathMatchesEffect: Polymer.Base._pathMatchesEffect,
_notifyBoundPaths: Polymer.Base._notifyBoundPaths,
_getPathParts: Polymer.Base._getPathParts
});
}
});
}());
Polymer.Base._addFeature({
resolveUrl: function (url) {
var module = Polymer.DomModule.import(this.is);
var root = '';
if (module) {
var assetPath = module.getAttribute('assetpath') || '';
root = Polymer.ResolveUrl.resolveUrl(assetPath, module.ownerDocument.baseURI);
}
return Polymer.ResolveUrl.resolveUrl(url, root);
}
});
Polymer.CssParse = function () {
var api = {
parse: function (text) {
text = this._clean(text);
return this._parseCss(this._lex(text), text);
},
_clean: function (cssText) {
return cssText.replace(this._rx.comments, '').replace(this._rx.port, '');
},
_lex: function (text) {
var root = {
start: 0,
end: text.length
};
var n = root;
for (var i = 0, s = 0, l = text.length; i < l; i++) {
switch (text[i]) {
case this.OPEN_BRACE:
if (!n.rules) {
n.rules = [];
}
var p = n;
var previous = p.rules[p.rules.length - 1];
n = {
start: i + 1,
parent: p,
previous: previous
};
p.rules.push(n);
break;
case this.CLOSE_BRACE:
n.end = i + 1;
n = n.parent || root;
break;
}
}
return root;
},
_parseCss: function (node, text) {
var t = text.substring(node.start, node.end - 1);
node.parsedCssText = node.cssText = t.trim();
if (node.parent) {
var ss = node.previous ? node.previous.end : node.parent.start;
t = text.substring(ss, node.start - 1);
t = t.substring(t.lastIndexOf(';') + 1);
var s = node.parsedSelector = node.selector = t.trim();
node.atRule = s.indexOf(this.AT_START) === 0;
if (node.atRule) {
if (s.indexOf(this.MEDIA_START) === 0) {
node.type = this.types.MEDIA_RULE;
} else if (s.match(this._rx.keyframesRule)) {
node.type = this.types.KEYFRAMES_RULE;
}
} else {
if (s.indexOf(this.VAR_START) === 0) {
node.type = this.types.MIXIN_RULE;
} else {
node.type = this.types.STYLE_RULE;
}
}
}
var r$ = node.rules;
if (r$) {
for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
this._parseCss(r, text);
}
}
return node;
},
stringify: function (node, preserveProperties, text) {
text = text || '';
var cssText = '';
if (node.cssText || node.rules) {
var r$ = node.rules;
if (r$ && (preserveProperties || !this._hasMixinRules(r$))) {
for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
cssText = this.stringify(r, preserveProperties, cssText);
}
} else {
cssText = preserveProperties ? node.cssText : this.removeCustomProps(node.cssText);
cssText = cssText.trim();
if (cssText) {
cssText = '  ' + cssText + '\n';
}
}
}
if (cssText) {
if (node.selector) {
text += node.selector + ' ' + this.OPEN_BRACE + '\n';
}
text += cssText;
if (node.selector) {
text += this.CLOSE_BRACE + '\n\n';
}
}
return text;
},
_hasMixinRules: function (rules) {
return rules[0].selector.indexOf(this.VAR_START) >= 0;
},
removeCustomProps: function (cssText) {
cssText = this.removeCustomPropAssignment(cssText);
return this.removeCustomPropApply(cssText);
},
removeCustomPropAssignment: function (cssText) {
return cssText.replace(this._rx.customProp, '').replace(this._rx.mixinProp, '');
},
removeCustomPropApply: function (cssText) {
return cssText.replace(this._rx.mixinApply, '').replace(this._rx.varApply, '');
},
types: {
STYLE_RULE: 1,
KEYFRAMES_RULE: 7,
MEDIA_RULE: 4,
MIXIN_RULE: 1000
},
OPEN_BRACE: '{',
CLOSE_BRACE: '}',
_rx: {
comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
port: /@import[^;]*;/gim,
customProp: /(?:^|[\s;])--[^;{]*?:[^{};]*?(?:[;\n]|$)/gim,
mixinProp: /(?:^|[\s;])?--[^;{]*?:[^{;]*?{[^}]*?}(?:[;\n]|$)?/gim,
mixinApply: /@apply[\s]*\([^)]*?\)[\s]*(?:[;\n]|$)?/gim,
varApply: /[^;:]*?:[^;]*var[^;]*(?:[;\n]|$)?/gim,
keyframesRule: /^@[^\s]*keyframes/
},
VAR_START: '--',
MEDIA_START: '@media',
AT_START: '@'
};
return api;
}();
Polymer.StyleUtil = function () {
return {
MODULE_STYLES_SELECTOR: 'style, link[rel=import][type~=css], template',
INCLUDE_ATTR: 'include',
toCssText: function (rules, callback, preserveProperties) {
if (typeof rules === 'string') {
rules = this.parser.parse(rules);
}
if (callback) {
this.forEachStyleRule(rules, callback);
}
return this.parser.stringify(rules, preserveProperties);
},
forRulesInStyles: function (styles, callback) {
if (styles) {
for (var i = 0, l = styles.length, s; i < l && (s = styles[i]); i++) {
this.forEachStyleRule(this.rulesForStyle(s), callback);
}
}
},
rulesForStyle: function (style) {
if (!style.__cssRules && style.textContent) {
style.__cssRules = this.parser.parse(style.textContent);
}
return style.__cssRules;
},
clearStyleRules: function (style) {
style.__cssRules = null;
},
forEachStyleRule: function (node, callback) {
if (!node) {
return;
}
var s = node.parsedSelector;
var skipRules = false;
if (node.type === this.ruleTypes.STYLE_RULE) {
callback(node);
} else if (node.type === this.ruleTypes.KEYFRAMES_RULE || node.type === this.ruleTypes.MIXIN_RULE) {
skipRules = true;
}
var r$ = node.rules;
if (r$ && !skipRules) {
for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
this.forEachStyleRule(r, callback);
}
}
},
applyCss: function (cssText, moniker, target, afterNode) {
var style = document.createElement('style');
if (moniker) {
style.setAttribute('scope', moniker);
}
style.textContent = cssText;
target = target || document.head;
if (!afterNode) {
var n$ = target.querySelectorAll('style[scope]');
afterNode = n$[n$.length - 1];
}
target.insertBefore(style, afterNode && afterNode.nextSibling || target.firstChild);
return style;
},
cssFromModules: function (moduleIds, warnIfNotFound) {
var modules = moduleIds.trim().split(' ');
var cssText = '';
for (var i = 0; i < modules.length; i++) {
cssText += this.cssFromModule(modules[i], warnIfNotFound);
}
return cssText;
},
cssFromModule: function (moduleId, warnIfNotFound) {
var m = Polymer.DomModule.import(moduleId);
if (m && !m._cssText) {
m._cssText = this._cssFromElement(m);
}
if (!m && warnIfNotFound) {
console.warn('Could not find style data in module named', moduleId);
}
return m && m._cssText || '';
},
_cssFromElement: function (element) {
var cssText = '';
var content = element.content || element;
var e$ = Array.prototype.slice.call(content.querySelectorAll(this.MODULE_STYLES_SELECTOR));
for (var i = 0, e; i < e$.length; i++) {
e = e$[i];
if (e.localName === 'template') {
cssText += this._cssFromElement(e);
} else {
if (e.localName === 'style') {
var include = e.getAttribute(this.INCLUDE_ATTR);
if (include) {
cssText += this.cssFromModules(include, true);
}
e = e.__appliedElement || e;
e.parentNode.removeChild(e);
cssText += this.resolveCss(e.textContent, element.ownerDocument);
} else if (e.import && e.import.body) {
cssText += this.resolveCss(e.import.body.textContent, e.import);
}
}
}
return cssText;
},
resolveCss: Polymer.ResolveUrl.resolveCss,
parser: Polymer.CssParse,
ruleTypes: Polymer.CssParse.types
};
}();
Polymer.StyleTransformer = function () {
var nativeShadow = Polymer.Settings.useNativeShadow;
var styleUtil = Polymer.StyleUtil;
var api = {
dom: function (node, scope, useAttr, shouldRemoveScope) {
this._transformDom(node, scope || '', useAttr, shouldRemoveScope);
},
_transformDom: function (node, selector, useAttr, shouldRemoveScope) {
if (node.setAttribute) {
this.element(node, selector, useAttr, shouldRemoveScope);
}
var c$ = Polymer.dom(node).childNodes;
for (var i = 0; i < c$.length; i++) {
this._transformDom(c$[i], selector, useAttr, shouldRemoveScope);
}
},
element: function (element, scope, useAttr, shouldRemoveScope) {
if (useAttr) {
if (shouldRemoveScope) {
element.removeAttribute(SCOPE_NAME);
} else {
element.setAttribute(SCOPE_NAME, scope);
}
} else {
if (scope) {
if (element.classList) {
if (shouldRemoveScope) {
element.classList.remove(SCOPE_NAME);
element.classList.remove(scope);
} else {
element.classList.add(SCOPE_NAME);
element.classList.add(scope);
}
} else if (element.getAttribute) {
var c = element.getAttribute(CLASS);
if (shouldRemoveScope) {
if (c) {
element.setAttribute(CLASS, c.replace(SCOPE_NAME, '').replace(scope, ''));
}
} else {
element.setAttribute(CLASS, c + (c ? ' ' : '') + SCOPE_NAME + ' ' + scope);
}
}
}
}
},
elementStyles: function (element, callback) {
var styles = element._styles;
var cssText = '';
for (var i = 0, l = styles.length, s, text; i < l && (s = styles[i]); i++) {
var rules = styleUtil.rulesForStyle(s);
cssText += nativeShadow ? styleUtil.toCssText(rules, callback) : this.css(rules, element.is, element.extends, callback, element._scopeCssViaAttr) + '\n\n';
}
return cssText.trim();
},
css: function (rules, scope, ext, callback, useAttr) {
var hostScope = this._calcHostScope(scope, ext);
scope = this._calcElementScope(scope, useAttr);
var self = this;
return styleUtil.toCssText(rules, function (rule) {
if (!rule.isScoped) {
self.rule(rule, scope, hostScope);
rule.isScoped = true;
}
if (callback) {
callback(rule, scope, hostScope);
}
});
},
_calcElementScope: function (scope, useAttr) {
if (scope) {
return useAttr ? CSS_ATTR_PREFIX + scope + CSS_ATTR_SUFFIX : CSS_CLASS_PREFIX + scope;
} else {
return '';
}
},
_calcHostScope: function (scope, ext) {
return ext ? '[is=' + scope + ']' : scope;
},
rule: function (rule, scope, hostScope) {
this._transformRule(rule, this._transformComplexSelector, scope, hostScope);
},
_transformRule: function (rule, transformer, scope, hostScope) {
var p$ = rule.selector.split(COMPLEX_SELECTOR_SEP);
for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
p$[i] = transformer.call(this, p, scope, hostScope);
}
rule.selector = rule.transformedSelector = p$.join(COMPLEX_SELECTOR_SEP);
},
_transformComplexSelector: function (selector, scope, hostScope) {
var stop = false;
var hostContext = false;
var self = this;
selector = selector.replace(SIMPLE_SELECTOR_SEP, function (m, c, s) {
if (!stop) {
var info = self._transformCompoundSelector(s, c, scope, hostScope);
stop = stop || info.stop;
hostContext = hostContext || info.hostContext;
c = info.combinator;
s = info.value;
} else {
s = s.replace(SCOPE_JUMP, ' ');
}
return c + s;
});
if (hostContext) {
selector = selector.replace(HOST_CONTEXT_PAREN, function (m, pre, paren, post) {
return pre + paren + ' ' + hostScope + post + COMPLEX_SELECTOR_SEP + ' ' + pre + hostScope + paren + post;
});
}
return selector;
},
_transformCompoundSelector: function (selector, combinator, scope, hostScope) {
var jumpIndex = selector.search(SCOPE_JUMP);
var hostContext = false;
if (selector.indexOf(HOST_CONTEXT) >= 0) {
hostContext = true;
} else if (selector.indexOf(HOST) >= 0) {
selector = selector.replace(HOST_PAREN, function (m, host, paren) {
return hostScope + paren;
});
selector = selector.replace(HOST, hostScope);
} else if (jumpIndex !== 0) {
selector = scope ? this._transformSimpleSelector(selector, scope) : selector;
}
if (selector.indexOf(CONTENT) >= 0) {
combinator = '';
}
var stop;
if (jumpIndex >= 0) {
selector = selector.replace(SCOPE_JUMP, ' ');
stop = true;
}
return {
value: selector,
combinator: combinator,
stop: stop,
hostContext: hostContext
};
},
_transformSimpleSelector: function (selector, scope) {
var p$ = selector.split(PSEUDO_PREFIX);
p$[0] += scope;
return p$.join(PSEUDO_PREFIX);
},
documentRule: function (rule) {
rule.selector = rule.parsedSelector;
this.normalizeRootSelector(rule);
if (!nativeShadow) {
this._transformRule(rule, this._transformDocumentSelector);
}
},
normalizeRootSelector: function (rule) {
if (rule.selector === ROOT) {
rule.selector = 'body';
}
},
_transformDocumentSelector: function (selector) {
return selector.match(SCOPE_JUMP) ? this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR) : this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
},
SCOPE_NAME: 'style-scope'
};
var SCOPE_NAME = api.SCOPE_NAME;
var SCOPE_DOC_SELECTOR = ':not([' + SCOPE_NAME + '])' + ':not(.' + SCOPE_NAME + ')';
var COMPLEX_SELECTOR_SEP = ',';
var SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)([^\s>+~]+)/g;
var HOST = ':host';
var ROOT = ':root';
var HOST_PAREN = /(\:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/g;
var HOST_CONTEXT = ':host-context';
var HOST_CONTEXT_PAREN = /(.*)(?:\:host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))(.*)/;
var CONTENT = '::content';
var SCOPE_JUMP = /\:\:content|\:\:shadow|\/deep\//;
var CSS_CLASS_PREFIX = '.';
var CSS_ATTR_PREFIX = '[' + SCOPE_NAME + '~=';
var CSS_ATTR_SUFFIX = ']';
var PSEUDO_PREFIX = ':';
var CLASS = 'class';
return api;
}();
Polymer.StyleExtends = function () {
var styleUtil = Polymer.StyleUtil;
return {
hasExtends: function (cssText) {
return Boolean(cssText.match(this.rx.EXTEND));
},
transform: function (style) {
var rules = styleUtil.rulesForStyle(style);
var self = this;
styleUtil.forEachStyleRule(rules, function (rule) {
var map = self._mapRule(rule);
if (rule.parent) {
var m;
while (m = self.rx.EXTEND.exec(rule.cssText)) {
var extend = m[1];
var extendor = self._findExtendor(extend, rule);
if (extendor) {
self._extendRule(rule, extendor);
}
}
}
rule.cssText = rule.cssText.replace(self.rx.EXTEND, '');
});
return styleUtil.toCssText(rules, function (rule) {
if (rule.selector.match(self.rx.STRIP)) {
rule.cssText = '';
}
}, true);
},
_mapRule: function (rule) {
if (rule.parent) {
var map = rule.parent.map || (rule.parent.map = {});
var parts = rule.selector.split(',');
for (var i = 0, p; i < parts.length; i++) {
p = parts[i];
map[p.trim()] = rule;
}
return map;
}
},
_findExtendor: function (extend, rule) {
return rule.parent && rule.parent.map && rule.parent.map[extend] || this._findExtendor(extend, rule.parent);
},
_extendRule: function (target, source) {
if (target.parent !== source.parent) {
this._cloneAndAddRuleToParent(source, target.parent);
}
target.extends = target.extends || (target.extends = []);
target.extends.push(source);
source.selector = source.selector.replace(this.rx.STRIP, '');
source.selector = (source.selector && source.selector + ',\n') + target.selector;
if (source.extends) {
source.extends.forEach(function (e) {
this._extendRule(target, e);
}, this);
}
},
_cloneAndAddRuleToParent: function (rule, parent) {
rule = Object.create(rule);
rule.parent = parent;
if (rule.extends) {
rule.extends = rule.extends.slice();
}
parent.rules.push(rule);
},
rx: {
EXTEND: /@extends\(([^)]*)\)\s*?;/gim,
STRIP: /%[^,]*$/
}
};
}();
(function () {
var prepElement = Polymer.Base._prepElement;
var nativeShadow = Polymer.Settings.useNativeShadow;
var styleUtil = Polymer.StyleUtil;
var styleTransformer = Polymer.StyleTransformer;
var styleExtends = Polymer.StyleExtends;
Polymer.Base._addFeature({
_prepElement: function (element) {
if (this._encapsulateStyle) {
styleTransformer.element(element, this.is, this._scopeCssViaAttr);
}
prepElement.call(this, element);
},
_prepStyles: function () {
if (this._encapsulateStyle === undefined) {
this._encapsulateStyle = !nativeShadow && Boolean(this._template);
}
this._styles = this._collectStyles();
var cssText = styleTransformer.elementStyles(this);
if (cssText && this._template) {
var style = styleUtil.applyCss(cssText, this.is, nativeShadow ? this._template.content : null);
if (!nativeShadow) {
this._scopeStyle = style;
}
}
},
_collectStyles: function () {
var styles = [];
var cssText = '', m$ = this.styleModules;
if (m$) {
for (var i = 0, l = m$.length, m; i < l && (m = m$[i]); i++) {
cssText += styleUtil.cssFromModule(m);
}
}
cssText += styleUtil.cssFromModule(this.is);
if (cssText) {
var style = document.createElement('style');
style.textContent = cssText;
if (styleExtends.hasExtends(style.textContent)) {
cssText = styleExtends.transform(style);
}
styles.push(style);
}
return styles;
},
_elementAdd: function (node) {
if (this._encapsulateStyle) {
if (node.__styleScoped) {
node.__styleScoped = false;
} else {
styleTransformer.dom(node, this.is, this._scopeCssViaAttr);
}
}
},
_elementRemove: function (node) {
if (this._encapsulateStyle) {
styleTransformer.dom(node, this.is, this._scopeCssViaAttr, true);
}
},
scopeSubtree: function (container, shouldObserve) {
if (nativeShadow) {
return;
}
var self = this;
var scopify = function (node) {
if (node.nodeType === Node.ELEMENT_NODE) {
node.className = self._scopeElementClass(node, node.className);
var n$ = node.querySelectorAll('*');
Array.prototype.forEach.call(n$, function (n) {
n.className = self._scopeElementClass(n, n.className);
});
}
};
scopify(container);
if (shouldObserve) {
var mo = new MutationObserver(function (mxns) {
mxns.forEach(function (m) {
if (m.addedNodes) {
for (var i = 0; i < m.addedNodes.length; i++) {
scopify(m.addedNodes[i]);
}
}
});
});
mo.observe(container, {
childList: true,
subtree: true
});
return mo;
}
}
});
}());
Polymer.StyleProperties = function () {
'use strict';
var nativeShadow = Polymer.Settings.useNativeShadow;
var matchesSelector = Polymer.DomApi.matchesSelector;
var styleUtil = Polymer.StyleUtil;
var styleTransformer = Polymer.StyleTransformer;
return {
decorateStyles: function (styles) {
var self = this, props = {};
styleUtil.forRulesInStyles(styles, function (rule) {
self.decorateRule(rule);
self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
});
var names = [];
for (var i in props) {
names.push(i);
}
return names;
},
decorateRule: function (rule) {
if (rule.propertyInfo) {
return rule.propertyInfo;
}
var info = {}, properties = {};
var hasProperties = this.collectProperties(rule, properties);
if (hasProperties) {
info.properties = properties;
rule.rules = null;
}
info.cssText = this.collectCssText(rule);
rule.propertyInfo = info;
return info;
},
collectProperties: function (rule, properties) {
var info = rule.propertyInfo;
if (info) {
if (info.properties) {
Polymer.Base.mixin(properties, info.properties);
return true;
}
} else {
var m, rx = this.rx.VAR_ASSIGN;
var cssText = rule.parsedCssText;
var any;
while (m = rx.exec(cssText)) {
properties[m[1]] = (m[2] || m[3]).trim();
any = true;
}
return any;
}
},
collectCssText: function (rule) {
var customCssText = '';
var cssText = rule.parsedCssText;
cssText = cssText.replace(this.rx.BRACKETED, '').replace(this.rx.VAR_ASSIGN, '');
var parts = cssText.split(';');
for (var i = 0, p; i < parts.length; i++) {
p = parts[i];
if (p.match(this.rx.MIXIN_MATCH) || p.match(this.rx.VAR_MATCH)) {
customCssText += p + ';\n';
}
}
return customCssText;
},
collectPropertiesInCssText: function (cssText, props) {
var m;
while (m = this.rx.VAR_CAPTURE.exec(cssText)) {
props[m[1]] = true;
var def = m[2];
if (def && def.match(this.rx.IS_VAR)) {
props[def] = true;
}
}
},
reify: function (props) {
var names = Object.getOwnPropertyNames(props);
for (var i = 0, n; i < names.length; i++) {
n = names[i];
props[n] = this.valueForProperty(props[n], props);
}
},
valueForProperty: function (property, props) {
if (property) {
if (property.indexOf(';') >= 0) {
property = this.valueForProperties(property, props);
} else {
var self = this;
var fn = function (all, prefix, value, fallback) {
var propertyValue = self.valueForProperty(props[value], props) || (props[fallback] ? self.valueForProperty(props[fallback], props) : fallback);
return prefix + (propertyValue || '');
};
property = property.replace(this.rx.VAR_MATCH, fn);
}
}
return property && property.trim() || '';
},
valueForProperties: function (property, props) {
var parts = property.split(';');
for (var i = 0, p, m; i < parts.length; i++) {
if (p = parts[i]) {
m = p.match(this.rx.MIXIN_MATCH);
if (m) {
p = this.valueForProperty(props[m[1]], props);
} else {
var pp = p.split(':');
if (pp[1]) {
pp[1] = pp[1].trim();
pp[1] = this.valueForProperty(pp[1], props) || pp[1];
}
p = pp.join(':');
}
parts[i] = p && p.lastIndexOf(';') === p.length - 1 ? p.slice(0, -1) : p || '';
}
}
return parts.join(';');
},
applyProperties: function (rule, props) {
var output = '';
if (!rule.propertyInfo) {
this.decorateRule(rule);
}
if (rule.propertyInfo.cssText) {
output = this.valueForProperties(rule.propertyInfo.cssText, props);
}
rule.cssText = output;
},
propertyDataFromStyles: function (styles, element) {
var props = {}, self = this;
var o = [], i = 0;
styleUtil.forRulesInStyles(styles, function (rule) {
if (!rule.propertyInfo) {
self.decorateRule(rule);
}
if (element && rule.propertyInfo.properties && matchesSelector.call(element, rule.transformedSelector || rule.parsedSelector)) {
self.collectProperties(rule, props);
addToBitMask(i, o);
}
i++;
});
return {
properties: props,
key: o
};
},
scopePropertiesFromStyles: function (styles) {
if (!styles._scopeStyleProperties) {
styles._scopeStyleProperties = this.selectedPropertiesFromStyles(styles, this.SCOPE_SELECTORS);
}
return styles._scopeStyleProperties;
},
hostPropertiesFromStyles: function (styles) {
if (!styles._hostStyleProperties) {
styles._hostStyleProperties = this.selectedPropertiesFromStyles(styles, this.HOST_SELECTORS);
}
return styles._hostStyleProperties;
},
selectedPropertiesFromStyles: function (styles, selectors) {
var props = {}, self = this;
styleUtil.forRulesInStyles(styles, function (rule) {
if (!rule.propertyInfo) {
self.decorateRule(rule);
}
for (var i = 0; i < selectors.length; i++) {
if (rule.parsedSelector === selectors[i]) {
self.collectProperties(rule, props);
return;
}
}
});
return props;
},
transformStyles: function (element, properties, scopeSelector) {
var self = this;
var hostSelector = styleTransformer._calcHostScope(element.is, element.extends);
var rxHostSelector = element.extends ? '\\' + hostSelector.slice(0, -1) + '\\]' : hostSelector;
var hostRx = new RegExp(this.rx.HOST_PREFIX + rxHostSelector + this.rx.HOST_SUFFIX);
return styleTransformer.elementStyles(element, function (rule) {
self.applyProperties(rule, properties);
if (rule.cssText && !nativeShadow) {
self._scopeSelector(rule, hostRx, hostSelector, element._scopeCssViaAttr, scopeSelector);
}
});
},
_scopeSelector: function (rule, hostRx, hostSelector, viaAttr, scopeId) {
rule.transformedSelector = rule.transformedSelector || rule.selector;
var selector = rule.transformedSelector;
var scope = viaAttr ? '[' + styleTransformer.SCOPE_NAME + '~=' + scopeId + ']' : '.' + scopeId;
var parts = selector.split(',');
for (var i = 0, l = parts.length, p; i < l && (p = parts[i]); i++) {
parts[i] = p.match(hostRx) ? p.replace(hostSelector, hostSelector + scope) : scope + ' ' + p;
}
rule.selector = parts.join(',');
},
applyElementScopeSelector: function (element, selector, old, viaAttr) {
var c = viaAttr ? element.getAttribute(styleTransformer.SCOPE_NAME) : element.className;
var v = old ? c.replace(old, selector) : (c ? c + ' ' : '') + this.XSCOPE_NAME + ' ' + selector;
if (c !== v) {
if (viaAttr) {
element.setAttribute(styleTransformer.SCOPE_NAME, v);
} else {
element.className = v;
}
}
},
applyElementStyle: function (element, properties, selector, style) {
var cssText = style ? style.textContent || '' : this.transformStyles(element, properties, selector);
var s = element._customStyle;
if (s && !nativeShadow && s !== style) {
s._useCount--;
if (s._useCount <= 0 && s.parentNode) {
s.parentNode.removeChild(s);
}
}
if (nativeShadow || (!style || !style.parentNode)) {
if (nativeShadow && element._customStyle) {
element._customStyle.textContent = cssText;
style = element._customStyle;
} else if (cssText) {
style = styleUtil.applyCss(cssText, selector, nativeShadow ? element.root : null, element._scopeStyle);
}
}
if (style) {
style._useCount = style._useCount || 0;
if (element._customStyle != style) {
style._useCount++;
}
element._customStyle = style;
}
return style;
},
mixinCustomStyle: function (props, customStyle) {
var v;
for (var i in customStyle) {
v = customStyle[i];
if (v || v === 0) {
props[i] = v;
}
}
},
rx: {
VAR_ASSIGN: /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:([^;{]*)|{([^}]*)})(?:(?=[;\s}])|$)/gi,
MIXIN_MATCH: /(?:^|\W+)@apply[\s]*\(([^)]*)\)/i,
VAR_MATCH: /(^|\W+)var\([\s]*([^,)]*)[\s]*,?[\s]*((?:[^,)]*)|(?:[^;]*\([^;)]*\)))[\s]*?\)/gi,
VAR_CAPTURE: /\([\s]*(--[^,\s)]*)(?:,[\s]*(--[^,\s)]*))?(?:\)|,)/gi,
IS_VAR: /^--/,
BRACKETED: /\{[^}]*\}/g,
HOST_PREFIX: '(?:^|[^.#[:])',
HOST_SUFFIX: '($|[.:[\\s>+~])'
},
HOST_SELECTORS: [':host'],
SCOPE_SELECTORS: [':root'],
XSCOPE_NAME: 'x-scope'
};
function addToBitMask(n, bits) {
var o = parseInt(n / 32);
var v = 1 << n % 32;
bits[o] = (bits[o] || 0) | v;
}
}();
(function () {
Polymer.StyleCache = function () {
this.cache = {};
};
Polymer.StyleCache.prototype = {
MAX: 100,
store: function (is, data, keyValues, keyStyles) {
data.keyValues = keyValues;
data.styles = keyStyles;
var s$ = this.cache[is] = this.cache[is] || [];
s$.push(data);
if (s$.length > this.MAX) {
s$.shift();
}
},
retrieve: function (is, keyValues, keyStyles) {
var cache = this.cache[is];
if (cache) {
for (var i = cache.length - 1, data; i >= 0; i--) {
data = cache[i];
if (keyStyles === data.styles && this._objectsEqual(keyValues, data.keyValues)) {
return data;
}
}
}
},
clear: function () {
this.cache = {};
},
_objectsEqual: function (target, source) {
var t, s;
for (var i in target) {
t = target[i], s = source[i];
if (!(typeof t === 'object' && t ? this._objectsStrictlyEqual(t, s) : t === s)) {
return false;
}
}
if (Array.isArray(target)) {
return target.length === source.length;
}
return true;
},
_objectsStrictlyEqual: function (target, source) {
return this._objectsEqual(target, source) && this._objectsEqual(source, target);
}
};
}());
Polymer.StyleDefaults = function () {
var styleProperties = Polymer.StyleProperties;
var styleUtil = Polymer.StyleUtil;
var StyleCache = Polymer.StyleCache;
var api = {
_styles: [],
_properties: null,
customStyle: {},
_styleCache: new StyleCache(),
addStyle: function (style) {
this._styles.push(style);
this._properties = null;
},
get _styleProperties() {
if (!this._properties) {
styleProperties.decorateStyles(this._styles);
this._styles._scopeStyleProperties = null;
this._properties = styleProperties.scopePropertiesFromStyles(this._styles);
styleProperties.mixinCustomStyle(this._properties, this.customStyle);
styleProperties.reify(this._properties);
}
return this._properties;
},
_needsStyleProperties: function () {
},
_computeStyleProperties: function () {
return this._styleProperties;
},
updateStyles: function (properties) {
this._properties = null;
if (properties) {
Polymer.Base.mixin(this.customStyle, properties);
}
this._styleCache.clear();
for (var i = 0, s; i < this._styles.length; i++) {
s = this._styles[i];
s = s.__importElement || s;
s._apply();
}
}
};
return api;
}();
(function () {
'use strict';
var serializeValueToAttribute = Polymer.Base.serializeValueToAttribute;
var propertyUtils = Polymer.StyleProperties;
var styleTransformer = Polymer.StyleTransformer;
var styleUtil = Polymer.StyleUtil;
var styleDefaults = Polymer.StyleDefaults;
var nativeShadow = Polymer.Settings.useNativeShadow;
Polymer.Base._addFeature({
_prepStyleProperties: function () {
this._ownStylePropertyNames = this._styles ? propertyUtils.decorateStyles(this._styles) : [];
},
customStyle: {},
_setupStyleProperties: function () {
this.customStyle = {};
},
_needsStyleProperties: function () {
return Boolean(this._ownStylePropertyNames && this._ownStylePropertyNames.length);
},
_beforeAttached: function () {
if (!this._scopeSelector && this._needsStyleProperties()) {
this._updateStyleProperties();
}
},
_findStyleHost: function () {
var e = this, root;
while (root = Polymer.dom(e).getOwnerRoot()) {
if (Polymer.isInstance(root.host)) {
return root.host;
}
e = root.host;
}
return styleDefaults;
},
_updateStyleProperties: function () {
var info, scope = this._findStyleHost();
if (!scope._styleCache) {
scope._styleCache = new Polymer.StyleCache();
}
var scopeData = propertyUtils.propertyDataFromStyles(scope._styles, this);
scopeData.key.customStyle = this.customStyle;
info = scope._styleCache.retrieve(this.is, scopeData.key, this._styles);
var scopeCached = Boolean(info);
if (scopeCached) {
this._styleProperties = info._styleProperties;
} else {
this._computeStyleProperties(scopeData.properties);
}
this._computeOwnStyleProperties();
if (!scopeCached) {
info = styleCache.retrieve(this.is, this._ownStyleProperties, this._styles);
}
var globalCached = Boolean(info) && !scopeCached;
var style = this._applyStyleProperties(info);
if (!scopeCached) {
style = style && nativeShadow ? style.cloneNode(true) : style;
info = {
style: style,
_scopeSelector: this._scopeSelector,
_styleProperties: this._styleProperties
};
scopeData.key.customStyle = {};
this.mixin(scopeData.key.customStyle, this.customStyle);
scope._styleCache.store(this.is, info, scopeData.key, this._styles);
if (!globalCached) {
styleCache.store(this.is, Object.create(info), this._ownStyleProperties, this._styles);
}
}
},
_computeStyleProperties: function (scopeProps) {
var scope = this._findStyleHost();
if (!scope._styleProperties) {
scope._computeStyleProperties();
}
var props = Object.create(scope._styleProperties);
this.mixin(props, propertyUtils.hostPropertiesFromStyles(this._styles));
scopeProps = scopeProps || propertyUtils.propertyDataFromStyles(scope._styles, this).properties;
this.mixin(props, scopeProps);
this.mixin(props, propertyUtils.scopePropertiesFromStyles(this._styles));
propertyUtils.mixinCustomStyle(props, this.customStyle);
propertyUtils.reify(props);
this._styleProperties = props;
},
_computeOwnStyleProperties: function () {
var props = {};
for (var i = 0, n; i < this._ownStylePropertyNames.length; i++) {
n = this._ownStylePropertyNames[i];
props[n] = this._styleProperties[n];
}
this._ownStyleProperties = props;
},
_scopeCount: 0,
_applyStyleProperties: function (info) {
var oldScopeSelector = this._scopeSelector;
this._scopeSelector = info ? info._scopeSelector : this.is + '-' + this.__proto__._scopeCount++;
var style = propertyUtils.applyElementStyle(this, this._styleProperties, this._scopeSelector, info && info.style);
if (!nativeShadow) {
propertyUtils.applyElementScopeSelector(this, this._scopeSelector, oldScopeSelector, this._scopeCssViaAttr);
}
return style;
},
serializeValueToAttribute: function (value, attribute, node) {
node = node || this;
if (attribute === 'class' && !nativeShadow) {
var host = node === this ? this.domHost || this.dataHost : this;
if (host) {
value = host._scopeElementClass(node, value);
}
}
node = Polymer.dom(node);
serializeValueToAttribute.call(this, value, attribute, node);
},
_scopeElementClass: function (element, selector) {
if (!nativeShadow && !this._scopeCssViaAttr) {
selector += (selector ? ' ' : '') + SCOPE_NAME + ' ' + this.is + (element._scopeSelector ? ' ' + XSCOPE_NAME + ' ' + element._scopeSelector : '');
}
return selector;
},
updateStyles: function (properties) {
if (this.isAttached) {
if (properties) {
this.mixin(this.customStyle, properties);
}
if (this._needsStyleProperties()) {
this._updateStyleProperties();
} else {
this._styleProperties = null;
}
if (this._styleCache) {
this._styleCache.clear();
}
this._updateRootStyles();
}
},
_updateRootStyles: function (root) {
root = root || this.root;
var c$ = Polymer.dom(root)._query(function (e) {
return e.shadyRoot || e.shadowRoot;
});
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
if (c.updateStyles) {
c.updateStyles();
}
}
}
});
Polymer.updateStyles = function (properties) {
styleDefaults.updateStyles(properties);
Polymer.Base._updateRootStyles(document);
};
var styleCache = new Polymer.StyleCache();
Polymer.customStyleCache = styleCache;
var SCOPE_NAME = styleTransformer.SCOPE_NAME;
var XSCOPE_NAME = propertyUtils.XSCOPE_NAME;
}());
Polymer.Base._addFeature({
_registerFeatures: function () {
this._prepIs();
this._prepAttributes();
this._prepConstructor();
this._prepTemplate();
this._prepStyles();
this._prepStyleProperties();
this._prepAnnotations();
this._prepEffects();
this._prepBehaviors();
this._prepBindings();
this._prepShady();
},
_prepBehavior: function (b) {
this._addPropertyEffects(b.properties);
this._addComplexObserverEffects(b.observers);
this._addHostAttributes(b.hostAttributes);
},
_initFeatures: function () {
this._poolContent();
this._setupConfigure();
this._setupStyleProperties();
this._pushHost();
this._stampTemplate();
this._popHost();
this._marshalAnnotationReferences();
this._setupDebouncers();
this._marshalInstanceEffects();
this._marshalHostAttributes();
this._marshalBehaviors();
this._marshalAttributes();
this._tryReady();
},
_marshalBehavior: function (b) {
this._listenListeners(b.listeners);
}
});
(function () {
var nativeShadow = Polymer.Settings.useNativeShadow;
var propertyUtils = Polymer.StyleProperties;
var styleUtil = Polymer.StyleUtil;
var cssParse = Polymer.CssParse;
var styleDefaults = Polymer.StyleDefaults;
var styleTransformer = Polymer.StyleTransformer;
Polymer({
is: 'custom-style',
extends: 'style',
properties: { include: String },
ready: function () {
this._tryApply();
},
attached: function () {
this._tryApply();
},
_tryApply: function () {
if (!this._appliesToDocument) {
if (this.parentNode && this.parentNode.localName !== 'dom-module') {
this._appliesToDocument = true;
var e = this.__appliedElement || this;
styleDefaults.addStyle(e);
if (e.textContent || this.include) {
this._apply();
} else {
var observer = new MutationObserver(function () {
observer.disconnect();
this._apply();
}.bind(this));
observer.observe(e, { childList: true });
}
}
}
},
_apply: function () {
var e = this.__appliedElement || this;
if (this.include) {
e.textContent = styleUtil.cssFromModules(this.include, true) + e.textContent;
}
if (e.textContent) {
styleUtil.forEachStyleRule(styleUtil.rulesForStyle(e), function (rule) {
styleTransformer.documentRule(rule);
});
this._applyCustomProperties(e);
}
},
_applyCustomProperties: function (element) {
this._computeStyleProperties();
var props = this._styleProperties;
var rules = styleUtil.rulesForStyle(element);
element.textContent = styleUtil.toCssText(rules, function (rule) {
var css = rule.cssText = rule.parsedCssText;
if (rule.propertyInfo && rule.propertyInfo.cssText) {
css = cssParse.removeCustomPropAssignment(css);
rule.cssText = propertyUtils.valueForProperties(css, props);
}
});
}
});
}());
Polymer.Templatizer = {
properties: { __hideTemplateChildren__: { observer: '_showHideChildren' } },
_instanceProps: Polymer.nob,
_parentPropPrefix: '_parent_',
templatize: function (template) {
this._templatized = template;
if (!template._content) {
template._content = template.content;
}
if (template._content._ctor) {
this.ctor = template._content._ctor;
this._prepParentProperties(this.ctor.prototype, template);
return;
}
var archetype = Object.create(Polymer.Base);
this._customPrepAnnotations(archetype, template);
this._prepParentProperties(archetype, template);
archetype._prepEffects();
this._customPrepEffects(archetype);
archetype._prepBehaviors();
archetype._prepBindings();
archetype._notifyPathUp = this._notifyPathUpImpl;
archetype._scopeElementClass = this._scopeElementClassImpl;
archetype.listen = this._listenImpl;
archetype._showHideChildren = this._showHideChildrenImpl;
var _constructor = this._constructorImpl;
var ctor = function TemplateInstance(model, host) {
_constructor.call(this, model, host);
};
ctor.prototype = archetype;
archetype.constructor = ctor;
template._content._ctor = ctor;
this.ctor = ctor;
},
_getRootDataHost: function () {
return this.dataHost && this.dataHost._rootDataHost || this.dataHost;
},
_showHideChildrenImpl: function (hide) {
var c = this._children;
for (var i = 0; i < c.length; i++) {
var n = c[i];
if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
if (n.nodeType === Node.TEXT_NODE) {
if (hide) {
n.__polymerTextContent__ = n.textContent;
n.textContent = '';
} else {
n.textContent = n.__polymerTextContent__;
}
} else if (n.style) {
if (hide) {
n.__polymerDisplay__ = n.style.display;
n.style.display = 'none';
} else {
n.style.display = n.__polymerDisplay__;
}
}
}
n.__hideTemplateChildren__ = hide;
}
},
_debounceTemplate: function (fn) {
Polymer.dom.addDebouncer(this.debounce('_debounceTemplate', fn));
},
_flushTemplates: function (debouncerExpired) {
Polymer.dom.flush();
},
_customPrepEffects: function (archetype) {
var parentProps = archetype._parentProps;
for (var prop in parentProps) {
archetype._addPropertyEffect(prop, 'function', this._createHostPropEffector(prop));
}
for (var prop in this._instanceProps) {
archetype._addPropertyEffect(prop, 'function', this._createInstancePropEffector(prop));
}
},
_customPrepAnnotations: function (archetype, template) {
archetype._template = template;
var c = template._content;
if (!c._notes) {
var rootDataHost = archetype._rootDataHost;
if (rootDataHost) {
Polymer.Annotations.prepElement = rootDataHost._prepElement.bind(rootDataHost);
}
c._notes = Polymer.Annotations.parseAnnotations(template);
Polymer.Annotations.prepElement = null;
this._processAnnotations(c._notes);
}
archetype._notes = c._notes;
archetype._parentProps = c._parentProps;
},
_prepParentProperties: function (archetype, template) {
var parentProps = this._parentProps = archetype._parentProps;
if (this._forwardParentProp && parentProps) {
var proto = archetype._parentPropProto;
var prop;
if (!proto) {
for (prop in this._instanceProps) {
delete parentProps[prop];
}
proto = archetype._parentPropProto = Object.create(null);
if (template != this) {
Polymer.Bind.prepareModel(proto);
Polymer.Base.prepareModelNotifyPath(proto);
}
for (prop in parentProps) {
var parentProp = this._parentPropPrefix + prop;
var effects = [
{
kind: 'function',
effect: this._createForwardPropEffector(prop)
},
{ kind: 'notify' }
];
Polymer.Bind._createAccessors(proto, parentProp, effects);
}
}
if (template != this) {
Polymer.Bind.prepareInstance(template);
template._forwardParentProp = this._forwardParentProp.bind(this);
}
this._extendTemplate(template, proto);
template._pathEffector = this._pathEffectorImpl.bind(this);
}
},
_createForwardPropEffector: function (prop) {
return function (source, value) {
this._forwardParentProp(prop, value);
};
},
_createHostPropEffector: function (prop) {
var prefix = this._parentPropPrefix;
return function (source, value) {
this.dataHost._templatized[prefix + prop] = value;
};
},
_createInstancePropEffector: function (prop) {
return function (source, value, old, fromAbove) {
if (!fromAbove) {
this.dataHost._forwardInstanceProp(this, prop, value);
}
};
},
_extendTemplate: function (template, proto) {
Object.getOwnPropertyNames(proto).forEach(function (n) {
var val = template[n];
var pd = Object.getOwnPropertyDescriptor(proto, n);
Object.defineProperty(template, n, pd);
if (val !== undefined) {
template._propertySetter(n, val);
}
});
},
_showHideChildren: function (hidden) {
},
_forwardInstancePath: function (inst, path, value) {
},
_forwardInstanceProp: function (inst, prop, value) {
},
_notifyPathUpImpl: function (path, value) {
var dataHost = this.dataHost;
var dot = path.indexOf('.');
var root = dot < 0 ? path : path.slice(0, dot);
dataHost._forwardInstancePath.call(dataHost, this, path, value);
if (root in dataHost._parentProps) {
dataHost._templatized.notifyPath(dataHost._parentPropPrefix + path, value);
}
},
_pathEffectorImpl: function (path, value, fromAbove) {
if (this._forwardParentPath) {
if (path.indexOf(this._parentPropPrefix) === 0) {
var subPath = path.substring(this._parentPropPrefix.length);
var model = this._modelForPath(subPath);
if (model in this._parentProps) {
this._forwardParentPath(subPath, value);
}
}
}
Polymer.Base._pathEffector.call(this._templatized, path, value, fromAbove);
},
_constructorImpl: function (model, host) {
this._rootDataHost = host._getRootDataHost();
this._setupConfigure(model);
this._pushHost(host);
this.root = this.instanceTemplate(this._template);
this.root.__noContent = !this._notes._hasContent;
this.root.__styleScoped = true;
this._popHost();
this._marshalAnnotatedNodes();
this._marshalInstanceEffects();
this._marshalAnnotatedListeners();
var children = [];
for (var n = this.root.firstChild; n; n = n.nextSibling) {
children.push(n);
n._templateInstance = this;
}
this._children = children;
if (host.__hideTemplateChildren__) {
this._showHideChildren(true);
}
this._tryReady();
},
_listenImpl: function (node, eventName, methodName) {
var model = this;
var host = this._rootDataHost;
var handler = host._createEventHandler(node, eventName, methodName);
var decorated = function (e) {
e.model = model;
handler(e);
};
host._listen(node, eventName, decorated);
},
_scopeElementClassImpl: function (node, value) {
var host = this._rootDataHost;
if (host) {
return host._scopeElementClass(node, value);
}
},
stamp: function (model) {
model = model || {};
if (this._parentProps) {
var templatized = this._templatized;
for (var prop in this._parentProps) {
model[prop] = templatized[this._parentPropPrefix + prop];
}
}
return new this.ctor(model, this);
},
modelForElement: function (el) {
var model;
while (el) {
if (model = el._templateInstance) {
if (model.dataHost != this) {
el = model.dataHost;
} else {
return model;
}
} else {
el = el.parentNode;
}
}
}
};
Polymer({
is: 'dom-template',
extends: 'template',
behaviors: [Polymer.Templatizer],
ready: function () {
this.templatize(this);
}
});
Polymer._collections = new WeakMap();
Polymer.Collection = function (userArray) {
Polymer._collections.set(userArray, this);
this.userArray = userArray;
this.store = userArray.slice();
this.initMap();
};
Polymer.Collection.prototype = {
constructor: Polymer.Collection,
initMap: function () {
var omap = this.omap = new WeakMap();
var pmap = this.pmap = {};
var s = this.store;
for (var i = 0; i < s.length; i++) {
var item = s[i];
if (item && typeof item == 'object') {
omap.set(item, i);
} else {
pmap[item] = i;
}
}
},
add: function (item) {
var key = this.store.push(item) - 1;
if (item && typeof item == 'object') {
this.omap.set(item, key);
} else {
this.pmap[item] = key;
}
return '#' + key;
},
removeKey: function (key) {
key = this._parseKey(key);
this._removeFromMap(this.store[key]);
delete this.store[key];
},
_removeFromMap: function (item) {
if (item && typeof item == 'object') {
this.omap.delete(item);
} else {
delete this.pmap[item];
}
},
remove: function (item) {
var key = this.getKey(item);
this.removeKey(key);
return key;
},
getKey: function (item) {
var key;
if (item && typeof item == 'object') {
key = this.omap.get(item);
} else {
key = this.pmap[item];
}
if (key != undefined) {
return '#' + key;
}
},
getKeys: function () {
return Object.keys(this.store).map(function (key) {
return '#' + key;
});
},
_parseKey: function (key) {
if (key[0] == '#') {
return key.slice(1);
}
throw new Error('unexpected key ' + key);
},
setItem: function (key, item) {
key = this._parseKey(key);
var old = this.store[key];
if (old) {
this._removeFromMap(old);
}
if (item && typeof item == 'object') {
this.omap.set(item, key);
} else {
this.pmap[item] = key;
}
this.store[key] = item;
},
getItem: function (key) {
key = this._parseKey(key);
return this.store[key];
},
getItems: function () {
var items = [], store = this.store;
for (var key in store) {
items.push(store[key]);
}
return items;
},
_applySplices: function (splices) {
var keyMap = {}, key, i;
splices.forEach(function (s) {
s.addedKeys = [];
for (i = 0; i < s.removed.length; i++) {
key = this.getKey(s.removed[i]);
keyMap[key] = keyMap[key] ? null : -1;
}
for (i = 0; i < s.addedCount; i++) {
var item = this.userArray[s.index + i];
key = this.getKey(item);
key = key === undefined ? this.add(item) : key;
keyMap[key] = keyMap[key] ? null : 1;
s.addedKeys.push(key);
}
}, this);
var removed = [];
var added = [];
for (var key in keyMap) {
if (keyMap[key] < 0) {
this.removeKey(key);
removed.push(key);
}
if (keyMap[key] > 0) {
added.push(key);
}
}
return [{
removed: removed,
added: added
}];
}
};
Polymer.Collection.get = function (userArray) {
return Polymer._collections.get(userArray) || new Polymer.Collection(userArray);
};
Polymer.Collection.applySplices = function (userArray, splices) {
var coll = Polymer._collections.get(userArray);
return coll ? coll._applySplices(splices) : null;
};
Polymer({
is: 'dom-repeat',
extends: 'template',
properties: {
items: { type: Array },
as: {
type: String,
value: 'item'
},
indexAs: {
type: String,
value: 'index'
},
sort: {
type: Function,
observer: '_sortChanged'
},
filter: {
type: Function,
observer: '_filterChanged'
},
observe: {
type: String,
observer: '_observeChanged'
},
delay: Number
},
behaviors: [Polymer.Templatizer],
observers: ['_itemsChanged(items.*)'],
created: function () {
this._instances = [];
},
detached: function () {
for (var i = 0; i < this._instances.length; i++) {
this._detachRow(i);
}
},
attached: function () {
var parentNode = Polymer.dom(this).parentNode;
for (var i = 0; i < this._instances.length; i++) {
Polymer.dom(parentNode).insertBefore(this._instances[i].root, this);
}
},
ready: function () {
this._instanceProps = { __key__: true };
this._instanceProps[this.as] = true;
this._instanceProps[this.indexAs] = true;
if (!this.ctor) {
this.templatize(this);
}
},
_sortChanged: function () {
var dataHost = this._getRootDataHost();
var sort = this.sort;
this._sortFn = sort && (typeof sort == 'function' ? sort : function () {
return dataHost[sort].apply(dataHost, arguments);
});
this._needFullRefresh = true;
if (this.items) {
this._debounceTemplate(this._render);
}
},
_filterChanged: function () {
var dataHost = this._getRootDataHost();
var filter = this.filter;
this._filterFn = filter && (typeof filter == 'function' ? filter : function () {
return dataHost[filter].apply(dataHost, arguments);
});
this._needFullRefresh = true;
if (this.items) {
this._debounceTemplate(this._render);
}
},
_observeChanged: function () {
this._observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
},
_itemsChanged: function (change) {
if (change.path == 'items') {
if (Array.isArray(this.items)) {
this.collection = Polymer.Collection.get(this.items);
} else if (!this.items) {
this.collection = null;
} else {
this._error(this._logf('dom-repeat', 'expected array for `items`,' + ' found', this.items));
}
this._keySplices = [];
this._indexSplices = [];
this._needFullRefresh = true;
this._debounceTemplate(this._render);
} else if (change.path == 'items.splices') {
this._keySplices = this._keySplices.concat(change.value.keySplices);
this._indexSplices = this._indexSplices.concat(change.value.indexSplices);
this._debounceTemplate(this._render);
} else {
var subpath = change.path.slice(6);
this._forwardItemPath(subpath, change.value);
this._checkObservedPaths(subpath);
}
},
_checkObservedPaths: function (path) {
if (this._observePaths) {
path = path.substring(path.indexOf('.') + 1);
var paths = this._observePaths;
for (var i = 0; i < paths.length; i++) {
if (path.indexOf(paths[i]) === 0) {
this._needFullRefresh = true;
if (this.delay) {
this.debounce('render', this._render, this.delay);
} else {
this._debounceTemplate(this._render);
}
return;
}
}
}
},
render: function () {
this._needFullRefresh = true;
this._debounceTemplate(this._render);
this._flushTemplates();
},
_render: function () {
var c = this.collection;
if (this._needFullRefresh) {
this._applyFullRefresh();
this._needFullRefresh = false;
} else {
if (this._sortFn) {
this._applySplicesUserSort(this._keySplices);
} else {
if (this._filterFn) {
this._applyFullRefresh();
} else {
this._applySplicesArrayOrder(this._indexSplices);
}
}
}
this._keySplices = [];
this._indexSplices = [];
var keyToIdx = this._keyToInstIdx = {};
for (var i = 0; i < this._instances.length; i++) {
var inst = this._instances[i];
keyToIdx[inst.__key__] = i;
inst.__setProperty(this.indexAs, i, true);
}
this.fire('dom-change');
},
_applyFullRefresh: function () {
var c = this.collection;
var keys;
if (this._sortFn) {
keys = c ? c.getKeys() : [];
} else {
keys = [];
var items = this.items;
if (items) {
for (var i = 0; i < items.length; i++) {
keys.push(c.getKey(items[i]));
}
}
}
if (this._filterFn) {
keys = keys.filter(function (a) {
return this._filterFn(c.getItem(a));
}, this);
}
if (this._sortFn) {
keys.sort(function (a, b) {
return this._sortFn(c.getItem(a), c.getItem(b));
}.bind(this));
}
for (var i = 0; i < keys.length; i++) {
var key = keys[i];
var inst = this._instances[i];
if (inst) {
inst.__setProperty('__key__', key, true);
inst.__setProperty(this.as, c.getItem(key), true);
} else {
this._instances.push(this._insertRow(i, key));
}
}
for (; i < this._instances.length; i++) {
this._detachRow(i);
}
this._instances.splice(keys.length, this._instances.length - keys.length);
},
_keySort: function (a, b) {
return this.collection.getKey(a) - this.collection.getKey(b);
},
_numericSort: function (a, b) {
return a - b;
},
_applySplicesUserSort: function (splices) {
var c = this.collection;
var instances = this._instances;
var keyMap = {};
var pool = [];
var sortFn = this._sortFn || this._keySort.bind(this);
splices.forEach(function (s) {
for (var i = 0; i < s.removed.length; i++) {
var key = s.removed[i];
keyMap[key] = keyMap[key] ? null : -1;
}
for (var i = 0; i < s.added.length; i++) {
var key = s.added[i];
keyMap[key] = keyMap[key] ? null : 1;
}
}, this);
var removedIdxs = [];
var addedKeys = [];
for (var key in keyMap) {
if (keyMap[key] === -1) {
removedIdxs.push(this._keyToInstIdx[key]);
}
if (keyMap[key] === 1) {
addedKeys.push(key);
}
}
if (removedIdxs.length) {
removedIdxs.sort(this._numericSort);
for (var i = removedIdxs.length - 1; i >= 0; i--) {
var idx = removedIdxs[i];
if (idx !== undefined) {
pool.push(this._detachRow(idx));
instances.splice(idx, 1);
}
}
}
if (addedKeys.length) {
if (this._filterFn) {
addedKeys = addedKeys.filter(function (a) {
return this._filterFn(c.getItem(a));
}, this);
}
addedKeys.sort(function (a, b) {
return this._sortFn(c.getItem(a), c.getItem(b));
}.bind(this));
var start = 0;
for (var i = 0; i < addedKeys.length; i++) {
start = this._insertRowUserSort(start, addedKeys[i], pool);
}
}
},
_insertRowUserSort: function (start, key, pool) {
var c = this.collection;
var item = c.getItem(key);
var end = this._instances.length - 1;
var idx = -1;
var sortFn = this._sortFn || this._keySort.bind(this);
while (start <= end) {
var mid = start + end >> 1;
var midKey = this._instances[mid].__key__;
var cmp = sortFn(c.getItem(midKey), item);
if (cmp < 0) {
start = mid + 1;
} else if (cmp > 0) {
end = mid - 1;
} else {
idx = mid;
break;
}
}
if (idx < 0) {
idx = end + 1;
}
this._instances.splice(idx, 0, this._insertRow(idx, key, pool));
return idx;
},
_applySplicesArrayOrder: function (splices) {
var pool = [];
var c = this.collection;
splices.forEach(function (s) {
for (var i = 0; i < s.removed.length; i++) {
var inst = this._detachRow(s.index + i);
if (!inst.isPlaceholder) {
pool.push(inst);
}
}
this._instances.splice(s.index, s.removed.length);
for (var i = 0; i < s.addedKeys.length; i++) {
var inst = {
isPlaceholder: true,
key: s.addedKeys[i]
};
this._instances.splice(s.index + i, 0, inst);
}
}, this);
for (var i = this._instances.length - 1; i >= 0; i--) {
var inst = this._instances[i];
if (inst.isPlaceholder) {
this._instances[i] = this._insertRow(i, inst.key, pool, true);
}
}
},
_detachRow: function (idx) {
var inst = this._instances[idx];
if (!inst.isPlaceholder) {
var parentNode = Polymer.dom(this).parentNode;
for (var i = 0; i < inst._children.length; i++) {
var el = inst._children[i];
Polymer.dom(inst.root).appendChild(el);
}
}
return inst;
},
_insertRow: function (idx, key, pool, replace) {
var inst;
if (inst = pool && pool.pop()) {
inst.__setProperty(this.as, this.collection.getItem(key), true);
inst.__setProperty('__key__', key, true);
} else {
inst = this._generateRow(idx, key);
}
var beforeRow = this._instances[replace ? idx + 1 : idx];
var beforeNode = beforeRow ? beforeRow._children[0] : this;
var parentNode = Polymer.dom(this).parentNode;
Polymer.dom(parentNode).insertBefore(inst.root, beforeNode);
return inst;
},
_generateRow: function (idx, key) {
var model = { __key__: key };
model[this.as] = this.collection.getItem(key);
model[this.indexAs] = idx;
var inst = this.stamp(model);
return inst;
},
_showHideChildren: function (hidden) {
for (var i = 0; i < this._instances.length; i++) {
this._instances[i]._showHideChildren(hidden);
}
},
_forwardInstanceProp: function (inst, prop, value) {
if (prop == this.as) {
var idx;
if (this._sortFn || this._filterFn) {
idx = this.items.indexOf(this.collection.getItem(inst.__key__));
} else {
idx = inst[this.indexAs];
}
this.set('items.' + idx, value);
}
},
_forwardInstancePath: function (inst, path, value) {
if (path.indexOf(this.as + '.') === 0) {
this._notifyPath('items.' + inst.__key__ + '.' + path.slice(this.as.length + 1), value);
}
},
_forwardParentProp: function (prop, value) {
this._instances.forEach(function (inst) {
inst.__setProperty(prop, value, true);
}, this);
},
_forwardParentPath: function (path, value) {
this._instances.forEach(function (inst) {
inst._notifyPath(path, value, true);
}, this);
},
_forwardItemPath: function (path, value) {
if (this._keyToInstIdx) {
var dot = path.indexOf('.');
var key = path.substring(0, dot < 0 ? path.length : dot);
var idx = this._keyToInstIdx[key];
var inst = this._instances[idx];
if (inst) {
if (dot >= 0) {
path = this.as + '.' + path.substring(dot + 1);
inst._notifyPath(path, value, true);
} else {
inst.__setProperty(this.as, value, true);
}
}
}
},
itemForElement: function (el) {
var instance = this.modelForElement(el);
return instance && instance[this.as];
},
keyForElement: function (el) {
var instance = this.modelForElement(el);
return instance && instance.__key__;
},
indexForElement: function (el) {
var instance = this.modelForElement(el);
return instance && instance[this.indexAs];
}
});
Polymer({
is: 'array-selector',
properties: {
items: {
type: Array,
observer: 'clearSelection'
},
multi: {
type: Boolean,
value: false,
observer: 'clearSelection'
},
selected: {
type: Object,
notify: true
},
selectedItem: {
type: Object,
notify: true
},
toggle: {
type: Boolean,
value: false
}
},
clearSelection: function () {
if (Array.isArray(this.selected)) {
for (var i = 0; i < this.selected.length; i++) {
this.unlinkPaths('selected.' + i);
}
} else {
this.unlinkPaths('selected');
this.unlinkPaths('selectedItem');
}
if (this.multi) {
if (!this.selected || this.selected.length) {
this.selected = [];
this._selectedColl = Polymer.Collection.get(this.selected);
}
} else {
this.selected = null;
this._selectedColl = null;
}
this.selectedItem = null;
},
isSelected: function (item) {
if (this.multi) {
return this._selectedColl.getKey(item) !== undefined;
} else {
return this.selected == item;
}
},
deselect: function (item) {
if (this.multi) {
if (this.isSelected(item)) {
var skey = this._selectedColl.getKey(item);
this.arrayDelete('selected', item);
this.unlinkPaths('selected.' + skey);
}
} else {
this.selected = null;
this.selectedItem = null;
this.unlinkPaths('selected');
this.unlinkPaths('selectedItem');
}
},
select: function (item) {
var icol = Polymer.Collection.get(this.items);
var key = icol.getKey(item);
if (this.multi) {
if (this.isSelected(item)) {
if (this.toggle) {
this.deselect(item);
}
} else {
this.push('selected', item);
var skey = this._selectedColl.getKey(item);
this.linkPaths('selected.' + skey, 'items.' + key);
}
} else {
if (this.toggle && item == this.selected) {
this.deselect();
} else {
this.selected = item;
this.selectedItem = item;
this.linkPaths('selected', 'items.' + key);
this.linkPaths('selectedItem', 'items.' + key);
}
}
}
});
Polymer({
is: 'dom-if',
extends: 'template',
properties: {
'if': {
type: Boolean,
value: false,
observer: '_queueRender'
},
restamp: {
type: Boolean,
value: false,
observer: '_queueRender'
}
},
behaviors: [Polymer.Templatizer],
_queueRender: function () {
this._debounceTemplate(this._render);
},
detached: function () {
this._teardownInstance();
},
attached: function () {
if (this.if && this.ctor) {
this.async(this._ensureInstance);
}
},
render: function () {
this._flushTemplates();
},
_render: function () {
if (this.if) {
if (!this.ctor) {
this.templatize(this);
}
this._ensureInstance();
this._showHideChildren();
} else if (this.restamp) {
this._teardownInstance();
}
if (!this.restamp && this._instance) {
this._showHideChildren();
}
if (this.if != this._lastIf) {
this.fire('dom-change');
this._lastIf = this.if;
}
},
_ensureInstance: function () {
if (!this._instance) {
this._instance = this.stamp();
var root = this._instance.root;
var parent = Polymer.dom(Polymer.dom(this).parentNode);
parent.insertBefore(root, this);
}
},
_teardownInstance: function () {
if (this._instance) {
var c = this._instance._children;
if (c) {
var parent = Polymer.dom(Polymer.dom(c[0]).parentNode);
c.forEach(function (n) {
parent.removeChild(n);
});
}
this._instance = null;
}
},
_showHideChildren: function () {
var hidden = this.__hideTemplateChildren__ || !this.if;
if (this._instance) {
this._instance._showHideChildren(hidden);
}
},
_forwardParentProp: function (prop, value) {
if (this._instance) {
this._instance[prop] = value;
}
},
_forwardParentPath: function (path, value) {
if (this._instance) {
this._instance._notifyPath(path, value, true);
}
}
});
Polymer({
is: 'dom-bind',
extends: 'template',
created: function () {
Polymer.RenderStatus.whenReady(this._markImportsReady.bind(this));
},
_ensureReady: function () {
if (!this._readied) {
this._readySelf();
}
},
_markImportsReady: function () {
this._importsReady = true;
this._ensureReady();
},
_registerFeatures: function () {
this._prepConstructor();
},
_insertChildren: function () {
var parentDom = Polymer.dom(Polymer.dom(this).parentNode);
parentDom.insertBefore(this.root, this);
},
_removeChildren: function () {
if (this._children) {
for (var i = 0; i < this._children.length; i++) {
this.root.appendChild(this._children[i]);
}
}
},
_initFeatures: function () {
},
_scopeElementClass: function (element, selector) {
if (this.dataHost) {
return this.dataHost._scopeElementClass(element, selector);
} else {
return selector;
}
},
_prepConfigure: function () {
var config = {};
for (var prop in this._propertyEffects) {
config[prop] = this[prop];
}
this._setupConfigure = this._setupConfigure.bind(this, config);
},
attached: function () {
if (this._importsReady) {
this.render();
}
},
detached: function () {
this._removeChildren();
},
render: function () {
this._ensureReady();
if (!this._children) {
this._template = this;
this._prepAnnotations();
this._prepEffects();
this._prepBehaviors();
this._prepConfigure();
this._prepBindings();
Polymer.Base._initFeatures.call(this);
this._children = Array.prototype.slice.call(this.root.childNodes);
}
this._insertChildren();
this.fire('dom-change');
}
});
(function () {
var metaDatas = {};
var metaArrays = {};
var singleton = null;
Polymer.IronMeta = Polymer({
is: 'iron-meta',
properties: {
type: {
type: String,
value: 'default',
observer: '_typeChanged'
},
key: {
type: String,
observer: '_keyChanged'
},
value: {
type: Object,
notify: true,
observer: '_valueChanged'
},
self: {
type: Boolean,
observer: '_selfChanged'
},
list: {
type: Array,
notify: true
}
},
hostAttributes: { hidden: true },
factoryImpl: function (config) {
if (config) {
for (var n in config) {
switch (n) {
case 'type':
case 'key':
case 'value':
this[n] = config[n];
break;
}
}
}
},
created: function () {
this._metaDatas = metaDatas;
this._metaArrays = metaArrays;
},
_keyChanged: function (key, old) {
this._resetRegistration(old);
},
_valueChanged: function (value) {
this._resetRegistration(this.key);
},
_selfChanged: function (self) {
if (self) {
this.value = this;
}
},
_typeChanged: function (type) {
this._unregisterKey(this.key);
if (!metaDatas[type]) {
metaDatas[type] = {};
}
this._metaData = metaDatas[type];
if (!metaArrays[type]) {
metaArrays[type] = [];
}
this.list = metaArrays[type];
this._registerKeyValue(this.key, this.value);
},
byKey: function (key) {
return this._metaData && this._metaData[key];
},
_resetRegistration: function (oldKey) {
this._unregisterKey(oldKey);
this._registerKeyValue(this.key, this.value);
},
_unregisterKey: function (key) {
this._unregister(key, this._metaData, this.list);
},
_registerKeyValue: function (key, value) {
this._register(key, value, this._metaData, this.list);
},
_register: function (key, value, data, list) {
if (key && data && value !== undefined) {
data[key] = value;
list.push(value);
}
},
_unregister: function (key, data, list) {
if (key && data) {
if (key in data) {
var value = data[key];
delete data[key];
this.arrayDelete(list, value);
}
}
}
});
Polymer.IronMeta.getIronMeta = function getIronMeta() {
if (singleton === null) {
singleton = new Polymer.IronMeta();
}
return singleton;
};
Polymer.IronMetaQuery = Polymer({
is: 'iron-meta-query',
properties: {
type: {
type: String,
value: 'default',
observer: '_typeChanged'
},
key: {
type: String,
observer: '_keyChanged'
},
value: {
type: Object,
notify: true,
readOnly: true
},
list: {
type: Array,
notify: true
}
},
factoryImpl: function (config) {
if (config) {
for (var n in config) {
switch (n) {
case 'type':
case 'key':
this[n] = config[n];
break;
}
}
}
},
created: function () {
this._metaDatas = metaDatas;
this._metaArrays = metaArrays;
},
_keyChanged: function (key) {
this._setValue(this._metaData && this._metaData[key]);
},
_typeChanged: function (type) {
this._metaData = metaDatas[type];
this.list = metaArrays[type];
if (this.key) {
this._keyChanged(this.key);
}
},
byKey: function (key) {
return this._metaData && this._metaData[key];
}
});
}());
Polymer({
is: 'iron-iconset-svg',
properties: {
name: {
type: String,
observer: '_nameChanged'
},
size: {
type: Number,
value: 24
}
},
attached: function () {
this.style.display = 'none';
},
getIconNames: function () {
this._icons = this._createIconMap();
return Object.keys(this._icons).map(function (n) {
return this.name + ':' + n;
}, this);
},
applyIcon: function (element, iconName) {
element = element.root || element;
this.removeIcon(element);
var svg = this._cloneIcon(iconName);
if (svg) {
var pde = Polymer.dom(element);
pde.insertBefore(svg, pde.childNodes[0]);
return element._svgIcon = svg;
}
return null;
},
removeIcon: function (element) {
if (element._svgIcon) {
Polymer.dom(element).removeChild(element._svgIcon);
element._svgIcon = null;
}
},
_nameChanged: function () {
new Polymer.IronMeta({
type: 'iconset',
key: this.name,
value: this
});
this.async(function () {
this.fire('iron-iconset-added', this, { node: window });
});
},
_createIconMap: function () {
var icons = Object.create(null);
Polymer.dom(this).querySelectorAll('[id]').forEach(function (icon) {
icons[icon.id] = icon;
});
return icons;
},
_cloneIcon: function (id) {
this._icons = this._icons || this._createIconMap();
return this._prepareSvgClone(this._icons[id], this.size);
},
_prepareSvgClone: function (sourceSvg, size) {
if (sourceSvg) {
var content = sourceSvg.cloneNode(true), svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), viewBox = content.getAttribute('viewBox') || '0 0 ' + size + ' ' + size;
svg.setAttribute('viewBox', viewBox);
svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
svg.style.cssText = 'pointer-events: none; display: block; width: 100%; height: 100%;';
svg.appendChild(content).removeAttribute('id');
return svg;
}
return null;
}
});
(function () {
'use strict';
var KEY_IDENTIFIER = {
'U+0009': 'tab',
'U+001B': 'esc',
'U+0020': 'space',
'U+002A': '*',
'U+0030': '0',
'U+0031': '1',
'U+0032': '2',
'U+0033': '3',
'U+0034': '4',
'U+0035': '5',
'U+0036': '6',
'U+0037': '7',
'U+0038': '8',
'U+0039': '9',
'U+0041': 'a',
'U+0042': 'b',
'U+0043': 'c',
'U+0044': 'd',
'U+0045': 'e',
'U+0046': 'f',
'U+0047': 'g',
'U+0048': 'h',
'U+0049': 'i',
'U+004A': 'j',
'U+004B': 'k',
'U+004C': 'l',
'U+004D': 'm',
'U+004E': 'n',
'U+004F': 'o',
'U+0050': 'p',
'U+0051': 'q',
'U+0052': 'r',
'U+0053': 's',
'U+0054': 't',
'U+0055': 'u',
'U+0056': 'v',
'U+0057': 'w',
'U+0058': 'x',
'U+0059': 'y',
'U+005A': 'z',
'U+007F': 'del'
};
var KEY_CODE = {
9: 'tab',
13: 'enter',
27: 'esc',
33: 'pageup',
34: 'pagedown',
35: 'end',
36: 'home',
32: 'space',
37: 'left',
38: 'up',
39: 'right',
40: 'down',
46: 'del',
106: '*'
};
var MODIFIER_KEYS = {
'shift': 'shiftKey',
'ctrl': 'ctrlKey',
'alt': 'altKey',
'meta': 'metaKey'
};
var KEY_CHAR = /[a-z0-9*]/;
var IDENT_CHAR = /U\+/;
var ARROW_KEY = /^arrow/;
var SPACE_KEY = /^space(bar)?/;
function transformKey(key) {
var validKey = '';
if (key) {
var lKey = key.toLowerCase();
if (lKey.length == 1) {
if (KEY_CHAR.test(lKey)) {
validKey = lKey;
}
} else if (ARROW_KEY.test(lKey)) {
validKey = lKey.replace('arrow', '');
} else if (SPACE_KEY.test(lKey)) {
validKey = 'space';
} else if (lKey == 'multiply') {
validKey = '*';
} else {
validKey = lKey;
}
}
return validKey;
}
function transformKeyIdentifier(keyIdent) {
var validKey = '';
if (keyIdent) {
if (IDENT_CHAR.test(keyIdent)) {
validKey = KEY_IDENTIFIER[keyIdent];
} else {
validKey = keyIdent.toLowerCase();
}
}
return validKey;
}
function transformKeyCode(keyCode) {
var validKey = '';
if (Number(keyCode)) {
if (keyCode >= 65 && keyCode <= 90) {
validKey = String.fromCharCode(32 + keyCode);
} else if (keyCode >= 112 && keyCode <= 123) {
validKey = 'f' + (keyCode - 112);
} else if (keyCode >= 48 && keyCode <= 57) {
validKey = String(48 - keyCode);
} else if (keyCode >= 96 && keyCode <= 105) {
validKey = String(96 - keyCode);
} else {
validKey = KEY_CODE[keyCode];
}
}
return validKey;
}
function normalizedKeyForEvent(keyEvent) {
return transformKey(keyEvent.key) || transformKeyIdentifier(keyEvent.keyIdentifier) || transformKeyCode(keyEvent.keyCode) || transformKey(keyEvent.detail.key) || '';
}
function keyComboMatchesEvent(keyCombo, keyEvent) {
return normalizedKeyForEvent(keyEvent) === keyCombo.key && !!keyEvent.shiftKey === !!keyCombo.shiftKey && !!keyEvent.ctrlKey === !!keyCombo.ctrlKey && !!keyEvent.altKey === !!keyCombo.altKey && !!keyEvent.metaKey === !!keyCombo.metaKey;
}
function parseKeyComboString(keyComboString) {
return keyComboString.split('+').reduce(function (parsedKeyCombo, keyComboPart) {
var eventParts = keyComboPart.split(':');
var keyName = eventParts[0];
var event = eventParts[1];
if (keyName in MODIFIER_KEYS) {
parsedKeyCombo[MODIFIER_KEYS[keyName]] = true;
} else {
parsedKeyCombo.key = keyName;
parsedKeyCombo.event = event || 'keydown';
}
return parsedKeyCombo;
}, { combo: keyComboString.split(':').shift() });
}
function parseEventString(eventString) {
return eventString.split(' ').map(function (keyComboString) {
return parseKeyComboString(keyComboString);
});
}
Polymer.IronA11yKeysBehavior = {
properties: {
keyEventTarget: {
type: Object,
value: function () {
return this;
}
},
stopKeyboardEventPropagation: {
type: Boolean,
value: false
},
_boundKeyHandlers: {
type: Array,
value: function () {
return [];
}
},
_imperativeKeyBindings: {
type: Object,
value: function () {
return {};
}
}
},
observers: ['_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)'],
keyBindings: {},
registered: function () {
this._prepKeyBindings();
},
attached: function () {
this._listenKeyEventListeners();
},
detached: function () {
this._unlistenKeyEventListeners();
},
addOwnKeyBinding: function (eventString, handlerName) {
this._imperativeKeyBindings[eventString] = handlerName;
this._prepKeyBindings();
this._resetKeyEventListeners();
},
removeOwnKeyBindings: function () {
this._imperativeKeyBindings = {};
this._prepKeyBindings();
this._resetKeyEventListeners();
},
keyboardEventMatchesKeys: function (event, eventString) {
var keyCombos = parseEventString(eventString);
var index;
for (index = 0; index < keyCombos.length; ++index) {
if (keyComboMatchesEvent(keyCombos[index], event)) {
return true;
}
}
return false;
},
_collectKeyBindings: function () {
var keyBindings = this.behaviors.map(function (behavior) {
return behavior.keyBindings;
});
if (keyBindings.indexOf(this.keyBindings) === -1) {
keyBindings.push(this.keyBindings);
}
return keyBindings;
},
_prepKeyBindings: function () {
this._keyBindings = {};
this._collectKeyBindings().forEach(function (keyBindings) {
for (var eventString in keyBindings) {
this._addKeyBinding(eventString, keyBindings[eventString]);
}
}, this);
for (var eventString in this._imperativeKeyBindings) {
this._addKeyBinding(eventString, this._imperativeKeyBindings[eventString]);
}
},
_addKeyBinding: function (eventString, handlerName) {
parseEventString(eventString).forEach(function (keyCombo) {
this._keyBindings[keyCombo.event] = this._keyBindings[keyCombo.event] || [];
this._keyBindings[keyCombo.event].push([
keyCombo,
handlerName
]);
}, this);
},
_resetKeyEventListeners: function () {
this._unlistenKeyEventListeners();
if (this.isAttached) {
this._listenKeyEventListeners();
}
},
_listenKeyEventListeners: function () {
Object.keys(this._keyBindings).forEach(function (eventName) {
var keyBindings = this._keyBindings[eventName];
var boundKeyHandler = this._onKeyBindingEvent.bind(this, keyBindings);
this._boundKeyHandlers.push([
this.keyEventTarget,
eventName,
boundKeyHandler
]);
this.keyEventTarget.addEventListener(eventName, boundKeyHandler);
}, this);
},
_unlistenKeyEventListeners: function () {
var keyHandlerTuple;
var keyEventTarget;
var eventName;
var boundKeyHandler;
while (this._boundKeyHandlers.length) {
keyHandlerTuple = this._boundKeyHandlers.pop();
keyEventTarget = keyHandlerTuple[0];
eventName = keyHandlerTuple[1];
boundKeyHandler = keyHandlerTuple[2];
keyEventTarget.removeEventListener(eventName, boundKeyHandler);
}
},
_onKeyBindingEvent: function (keyBindings, event) {
if (this.stopKeyboardEventPropagation) {
event.stopPropagation();
}
keyBindings.forEach(function (keyBinding) {
var keyCombo = keyBinding[0];
var handlerName = keyBinding[1];
if (!event.defaultPrevented && keyComboMatchesEvent(keyCombo, event)) {
this._triggerKeyHandler(keyCombo, handlerName, event);
}
}, this);
},
_triggerKeyHandler: function (keyCombo, handlerName, keyboardEvent) {
var detail = Object.create(keyCombo);
detail.keyboardEvent = keyboardEvent;
var event = new CustomEvent(keyCombo.event, {
detail: detail,
cancelable: true
});
this[handlerName].call(this, event);
if (event.defaultPrevented) {
keyboardEvent.preventDefault();
}
}
};
}());
Polymer.IronControlState = {
properties: {
focused: {
type: Boolean,
value: false,
notify: true,
readOnly: true,
reflectToAttribute: true
},
disabled: {
type: Boolean,
value: false,
notify: true,
observer: '_disabledChanged',
reflectToAttribute: true
},
_oldTabIndex: { type: Number },
_boundFocusBlurHandler: {
type: Function,
value: function () {
return this._focusBlurHandler.bind(this);
}
}
},
observers: ['_changedControlState(focused, disabled)'],
ready: function () {
this.addEventListener('focus', this._boundFocusBlurHandler, true);
this.addEventListener('blur', this._boundFocusBlurHandler, true);
},
_focusBlurHandler: function (event) {
if (event.target === this) {
this._setFocused(event.type === 'focus');
} else if (!this.shadowRoot && !this.isLightDescendant(event.target)) {
this.fire(event.type, { sourceEvent: event }, {
node: this,
bubbles: event.bubbles,
cancelable: event.cancelable
});
}
},
_disabledChanged: function (disabled, old) {
this.setAttribute('aria-disabled', disabled ? 'true' : 'false');
this.style.pointerEvents = disabled ? 'none' : '';
if (disabled) {
this._oldTabIndex = this.tabIndex;
this.focused = false;
this.tabIndex = -1;
} else if (this._oldTabIndex !== undefined) {
this.tabIndex = this._oldTabIndex;
}
},
_changedControlState: function () {
if (this._controlStateChanged) {
this._controlStateChanged();
}
}
};
Polymer.IronButtonStateImpl = {
properties: {
pressed: {
type: Boolean,
readOnly: true,
value: false,
reflectToAttribute: true,
observer: '_pressedChanged'
},
toggles: {
type: Boolean,
value: false,
reflectToAttribute: true
},
active: {
type: Boolean,
value: false,
notify: true,
reflectToAttribute: true
},
pointerDown: {
type: Boolean,
readOnly: true,
value: false
},
receivedFocusFromKeyboard: {
type: Boolean,
readOnly: true
},
ariaActiveAttribute: {
type: String,
value: 'aria-pressed',
observer: '_ariaActiveAttributeChanged'
}
},
listeners: {
down: '_downHandler',
up: '_upHandler',
tap: '_tapHandler'
},
observers: [
'_detectKeyboardFocus(focused)',
'_activeChanged(active, ariaActiveAttribute)'
],
keyBindings: {
'enter:keydown': '_asyncClick',
'space:keydown': '_spaceKeyDownHandler',
'space:keyup': '_spaceKeyUpHandler'
},
_mouseEventRe: /^mouse/,
_tapHandler: function () {
if (this.toggles) {
this._userActivate(!this.active);
} else {
this.active = false;
}
},
_detectKeyboardFocus: function (focused) {
this._setReceivedFocusFromKeyboard(!this.pointerDown && focused);
},
_userActivate: function (active) {
if (this.active !== active) {
this.active = active;
this.fire('change');
}
},
_downHandler: function (event) {
this._setPointerDown(true);
this._setPressed(true);
this._setReceivedFocusFromKeyboard(false);
},
_upHandler: function () {
this._setPointerDown(false);
this._setPressed(false);
},
__isFocusedLightDescendant: function (target) {
var root = Polymer.dom(this).getOwnerRoot() || document;
var focusedElement = root.activeElement;
return this !== target && this.isLightDescendant(target) && target == focusedElement;
},
_spaceKeyDownHandler: function (event) {
var keyboardEvent = event.detail.keyboardEvent;
var target = Polymer.dom(keyboardEvent).localTarget;
if (this.__isFocusedLightDescendant(target))
return;
keyboardEvent.preventDefault();
keyboardEvent.stopImmediatePropagation();
this._setPressed(true);
},
_spaceKeyUpHandler: function (event) {
var keyboardEvent = event.detail.keyboardEvent;
var target = Polymer.dom(keyboardEvent).localTarget;
if (this.__isFocusedLightDescendant(target))
return;
if (this.pressed) {
this._asyncClick();
}
this._setPressed(false);
},
_asyncClick: function () {
this.async(function () {
this.click();
}, 1);
},
_pressedChanged: function (pressed) {
this._changedButtonState();
},
_ariaActiveAttributeChanged: function (value, oldValue) {
if (oldValue && oldValue != value && this.hasAttribute(oldValue)) {
this.removeAttribute(oldValue);
}
},
_activeChanged: function (active, ariaActiveAttribute) {
if (this.toggles) {
this.setAttribute(this.ariaActiveAttribute, active ? 'true' : 'false');
} else {
this.removeAttribute(this.ariaActiveAttribute);
}
this._changedButtonState();
},
_controlStateChanged: function () {
if (this.disabled) {
this._setPressed(false);
} else {
this._changedButtonState();
}
},
_changedButtonState: function () {
if (this._buttonStateChanged) {
this._buttonStateChanged();
}
}
};
Polymer.IronButtonState = [
Polymer.IronA11yKeysBehavior,
Polymer.IronButtonStateImpl
];
Polymer.PaperRippleBehavior = {
properties: {
noink: {
type: Boolean,
observer: '_noinkChanged'
},
_rippleContainer: { type: Object }
},
_buttonStateChanged: function () {
if (this.focused) {
this.ensureRipple();
}
},
_downHandler: function (event) {
Polymer.IronButtonStateImpl._downHandler.call(this, event);
if (this.pressed) {
this.ensureRipple(event);
}
},
ensureRipple: function (opt_triggeringEvent) {
if (!this.hasRipple()) {
this._ripple = this._createRipple();
this._ripple.noink = this.noink;
var rippleContainer = this._rippleContainer || this.root;
if (rippleContainer) {
Polymer.dom(rippleContainer).appendChild(this._ripple);
}
var domContainer = rippleContainer === this.shadyRoot ? this : rippleContainer;
if (opt_triggeringEvent) {
var target = opt_triggeringEvent.target;
if (domContainer.contains(target)) {
this._ripple.uiDownAction(opt_triggeringEvent);
}
}
}
},
getRipple: function () {
this.ensureRipple();
return this._ripple;
},
hasRipple: function () {
return Boolean(this._ripple);
},
_createRipple: function () {
return document.createElement('paper-ripple');
},
_noinkChanged: function (noink) {
if (this.hasRipple()) {
this._ripple.noink = noink;
}
}
};
Polymer.PaperButtonBehaviorImpl = {
properties: {
elevation: {
type: Number,
reflectToAttribute: true,
readOnly: true
}
},
observers: [
'_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)',
'_computeKeyboardClass(receivedFocusFromKeyboard)'
],
hostAttributes: {
role: 'button',
tabindex: '0',
animated: true
},
_calculateElevation: function () {
var e = 1;
if (this.disabled) {
e = 0;
} else if (this.active || this.pressed) {
e = 4;
} else if (this.receivedFocusFromKeyboard) {
e = 3;
}
this._setElevation(e);
},
_computeKeyboardClass: function (receivedFocusFromKeyboard) {
this.classList.toggle('keyboard-focus', receivedFocusFromKeyboard);
},
_spaceKeyDownHandler: function (event) {
Polymer.IronButtonStateImpl._spaceKeyDownHandler.call(this, event);
if (this.hasRipple()) {
this._ripple.uiDownAction();
}
},
_spaceKeyUpHandler: function (event) {
Polymer.IronButtonStateImpl._spaceKeyUpHandler.call(this, event);
if (this.hasRipple()) {
this._ripple.uiUpAction();
}
}
};
Polymer.PaperButtonBehavior = [
Polymer.IronButtonState,
Polymer.IronControlState,
Polymer.PaperRippleBehavior,
Polymer.PaperButtonBehaviorImpl
];
Polymer.IronValidatableBehavior = {
properties: {
validatorType: {
type: String,
value: 'validator'
},
validator: { type: String },
invalid: {
notify: true,
reflectToAttribute: true,
type: Boolean,
value: false
},
_validatorMeta: { type: Object }
},
observers: ['_invalidChanged(invalid)'],
get _validator() {
return this._validatorMeta && this._validatorMeta.byKey(this.validator);
},
ready: function () {
this._validatorMeta = new Polymer.IronMeta({ type: this.validatorType });
},
_invalidChanged: function () {
if (this.invalid) {
this.setAttribute('aria-invalid', 'true');
} else {
this.removeAttribute('aria-invalid');
}
},
hasValidator: function () {
return this._validator != null;
},
validate: function (value) {
this.invalid = !this._getValidity(value);
return !this.invalid;
},
_getValidity: function (value) {
if (this.hasValidator()) {
return this._validator.validate(value);
}
return true;
}
};
Polymer({
is: 'iron-input',
extends: 'input',
behaviors: [Polymer.IronValidatableBehavior],
properties: {
bindValue: {
observer: '_bindValueChanged',
type: String
},
preventInvalidInput: { type: Boolean },
allowedPattern: { type: String },
_previousValidInput: {
type: String,
value: ''
},
_patternAlreadyChecked: {
type: Boolean,
value: false
}
},
listeners: {
'input': '_onInput',
'keypress': '_onKeypress'
},
get _patternRegExp() {
var pattern;
if (this.allowedPattern) {
pattern = new RegExp(this.allowedPattern);
} else if (this.pattern) {
pattern = new RegExp(this.pattern);
} else {
switch (this.type) {
case 'number':
pattern = /[0-9.,e-]/;
break;
}
}
return pattern;
},
ready: function () {
this.bindValue = this.value;
},
_bindValueChanged: function () {
if (this.value !== this.bindValue) {
this.value = !(this.bindValue || this.bindValue === 0) ? '' : this.bindValue;
}
this.fire('bind-value-changed', { value: this.bindValue });
},
_onInput: function () {
if (this.preventInvalidInput && !this._patternAlreadyChecked) {
var valid = this._checkPatternValidity();
if (!valid) {
this.value = this._previousValidInput;
}
}
this.bindValue = this.value;
this._previousValidInput = this.value;
this._patternAlreadyChecked = false;
},
_isPrintable: function (event) {
var anyNonPrintable = event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 27;
var mozNonPrintable = event.keyCode == 19 || event.keyCode == 20 || event.keyCode == 45 || event.keyCode == 46 || event.keyCode == 144 || event.keyCode == 145 || event.keyCode > 32 && event.keyCode < 41 || event.keyCode > 111 && event.keyCode < 124;
return !anyNonPrintable && !(event.charCode == 0 && mozNonPrintable);
},
_onKeypress: function (event) {
if (!this.preventInvalidInput && this.type !== 'number') {
return;
}
var regexp = this._patternRegExp;
if (!regexp) {
return;
}
if (event.metaKey || event.ctrlKey || event.altKey)
return;
this._patternAlreadyChecked = true;
var thisChar = String.fromCharCode(event.charCode);
if (this._isPrintable(event) && !regexp.test(thisChar)) {
event.preventDefault();
}
},
_checkPatternValidity: function () {
var regexp = this._patternRegExp;
if (!regexp) {
return true;
}
for (var i = 0; i < this.value.length; i++) {
if (!regexp.test(this.value[i])) {
return false;
}
}
return true;
},
validate: function () {
if (!this.required && this.value == '') {
this.invalid = false;
return true;
}
var valid;
if (this.hasValidator()) {
valid = Polymer.IronValidatableBehavior.validate.call(this, this.value);
} else {
this.invalid = !this.validity.valid;
valid = this.validity.valid;
}
this.fire('iron-input-validate');
return valid;
}
});
Polymer.IronFormElementBehavior = {
properties: {
name: { type: String },
value: {
notify: true,
type: String
},
required: {
type: Boolean,
value: false
},
_parentForm: { type: Object }
},
attached: function () {
this.fire('iron-form-element-register');
},
detached: function () {
if (this._parentForm) {
this._parentForm.fire('iron-form-element-unregister', { target: this });
}
}
};
Polymer.PaperInputBehaviorImpl = {
properties: {
label: { type: String },
value: {
notify: true,
type: String
},
disabled: {
type: Boolean,
value: false
},
invalid: {
type: Boolean,
value: false,
notify: true
},
preventInvalidInput: { type: Boolean },
allowedPattern: { type: String },
type: { type: String },
list: { type: String },
pattern: { type: String },
required: {
type: Boolean,
value: false
},
errorMessage: { type: String },
charCounter: {
type: Boolean,
value: false
},
noLabelFloat: {
type: Boolean,
value: false
},
alwaysFloatLabel: {
type: Boolean,
value: false
},
autoValidate: {
type: Boolean,
value: false
},
validator: { type: String },
autocomplete: {
type: String,
value: 'off'
},
autofocus: { type: Boolean },
inputmode: { type: String },
minlength: { type: Number },
maxlength: { type: Number },
min: { type: String },
max: { type: String },
step: { type: String },
name: { type: String },
placeholder: {
type: String,
value: ''
},
readonly: {
type: Boolean,
value: false
},
size: { type: Number },
autocapitalize: {
type: String,
value: 'none'
},
autocorrect: {
type: String,
value: 'off'
},
autosave: { type: String },
results: { type: Number },
accept: { type: String },
multiple: { type: Boolean },
_ariaDescribedBy: {
type: String,
value: ''
}
},
listeners: { 'addon-attached': '_onAddonAttached' },
observers: ['_focusedControlStateChanged(focused)'],
get inputElement() {
return this.$.input;
},
attached: function () {
this._updateAriaLabelledBy();
},
_appendStringWithSpace: function (str, more) {
if (str) {
str = str + ' ' + more;
} else {
str = more;
}
return str;
},
_onAddonAttached: function (event) {
var target = event.path ? event.path[0] : event.target;
if (target.id) {
this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, target.id);
} else {
var id = 'paper-input-add-on-' + Math.floor(Math.random() * 100000);
target.id = id;
this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, id);
}
},
validate: function () {
return this.inputElement.validate();
},
_handleAutoValidate: function () {
if (this.autoValidate)
this.validate();
},
updateValueAndPreserveCaret: function (newValue) {
try {
var start = this.inputElement.selectionStart;
this.value = newValue;
this.inputElement.selectionStart = start;
this.inputElement.selectionEnd = start;
} catch (e) {
this.value = newValue;
}
},
_computeAlwaysFloatLabel: function (alwaysFloatLabel, placeholder) {
return placeholder || alwaysFloatLabel;
},
_focusedControlStateChanged: function (focused) {
if (!this.$.container) {
this.$.container = Polymer.dom(this.root).querySelector('paper-input-container');
if (!this.$.container) {
return;
}
}
if (focused) {
this.$.container._onFocus();
} else {
this.$.container._onBlur();
}
},
_updateAriaLabelledBy: function () {
var label = Polymer.dom(this.root).querySelector('label');
if (!label) {
this._ariaLabelledBy = '';
return;
}
var labelledBy;
if (label.id) {
labelledBy = label.id;
} else {
labelledBy = 'paper-input-label-' + new Date().getUTCMilliseconds();
label.id = labelledBy;
}
this._ariaLabelledBy = labelledBy;
},
_onChange: function (event) {
if (this.shadowRoot) {
this.fire(event.type, { sourceEvent: event }, {
node: this,
bubbles: event.bubbles,
cancelable: event.cancelable
});
}
}
};
Polymer.PaperInputBehavior = [
Polymer.IronControlState,
Polymer.PaperInputBehaviorImpl
];
Polymer.PaperInputAddonBehavior = {
hostAttributes: { 'add-on': '' },
attached: function () {
this.fire('addon-attached');
},
update: function (state) {
}
};
Polymer.IronCheckedElementBehaviorImpl = {
properties: {
checked: {
type: Boolean,
value: false,
reflectToAttribute: true,
notify: true,
observer: '_checkedChanged'
},
toggles: {
type: Boolean,
value: true,
reflectToAttribute: true
},
value: {
type: String,
value: ''
}
},
observers: ['_requiredChanged(required)'],
_getValidity: function (_value) {
return this.disabled || !this.required || this.required && this.checked;
},
_requiredChanged: function () {
if (this.required) {
this.setAttribute('aria-required', 'true');
} else {
this.removeAttribute('aria-required');
}
},
_checkedChanged: function () {
this.active = this.checked;
if (this.value === '')
this.value = this.checked ? 'on' : '';
this.fire('iron-change');
}
};
Polymer.IronCheckedElementBehavior = [
Polymer.IronFormElementBehavior,
Polymer.IronValidatableBehavior,
Polymer.IronCheckedElementBehaviorImpl
];
Polymer.PaperInkyFocusBehaviorImpl = {
observers: ['_focusedChanged(receivedFocusFromKeyboard)'],
_focusedChanged: function (receivedFocusFromKeyboard) {
if (receivedFocusFromKeyboard) {
this.ensureRipple();
}
if (this.hasRipple()) {
this._ripple.holdDown = receivedFocusFromKeyboard;
}
},
_createRipple: function () {
var ripple = Polymer.PaperRippleBehavior._createRipple();
ripple.id = 'ink';
ripple.setAttribute('center', '');
ripple.classList.add('circle');
return ripple;
}
};
Polymer.PaperInkyFocusBehavior = [
Polymer.IronButtonState,
Polymer.IronControlState,
Polymer.PaperRippleBehavior,
Polymer.PaperInkyFocusBehaviorImpl
];
Polymer.PaperCheckedElementBehaviorImpl = {
_checkedChanged: function () {
Polymer.IronCheckedElementBehaviorImpl._checkedChanged.call(this);
if (this.hasRipple()) {
if (this.checked) {
this._ripple.setAttribute('checked', '');
} else {
this._ripple.removeAttribute('checked');
}
}
},
_buttonStateChanged: function () {
Polymer.PaperRippleBehavior._buttonStateChanged.call(this);
if (this.disabled) {
return;
}
if (this.isAttached) {
this.checked = this.active;
}
}
};
Polymer.PaperCheckedElementBehavior = [
Polymer.PaperInkyFocusBehavior,
Polymer.IronCheckedElementBehavior,
Polymer.PaperCheckedElementBehaviorImpl
];
!function () {
var d3 = { version: '3.5.6' };
var d3_arraySlice = [].slice, d3_array = function (list) {
return d3_arraySlice.call(list);
};
var d3_document = this.document;
function d3_documentElement(node) {
return node && (node.ownerDocument || node.document || node).documentElement;
}
function d3_window(node) {
return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
}
if (d3_document) {
try {
d3_array(d3_document.documentElement.childNodes)[0].nodeType;
} catch (e) {
d3_array = function (list) {
var i = list.length, array = new Array(i);
while (i--)
array[i] = list[i];
return array;
};
}
}
if (!Date.now)
Date.now = function () {
return +new Date();
};
if (d3_document) {
try {
d3_document.createElement('DIV').style.setProperty('opacity', 0, '');
} catch (error) {
var d3_element_prototype = this.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = this.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
d3_element_prototype.setAttribute = function (name, value) {
d3_element_setAttribute.call(this, name, value + '');
};
d3_element_prototype.setAttributeNS = function (space, local, value) {
d3_element_setAttributeNS.call(this, space, local, value + '');
};
d3_style_prototype.setProperty = function (name, value, priority) {
d3_style_setProperty.call(this, name, value + '', priority);
};
}
}
d3.ascending = d3_ascending;
function d3_ascending(a, b) {
return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
d3.descending = function (a, b) {
return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
d3.min = function (array, f) {
var i = -1, n = array.length, a, b;
if (arguments.length === 1) {
while (++i < n)
if ((b = array[i]) != null && b >= b) {
a = b;
break;
}
while (++i < n)
if ((b = array[i]) != null && a > b)
a = b;
} else {
while (++i < n)
if ((b = f.call(array, array[i], i)) != null && b >= b) {
a = b;
break;
}
while (++i < n)
if ((b = f.call(array, array[i], i)) != null && a > b)
a = b;
}
return a;
};
d3.max = function (array, f) {
var i = -1, n = array.length, a, b;
if (arguments.length === 1) {
while (++i < n)
if ((b = array[i]) != null && b >= b) {
a = b;
break;
}
while (++i < n)
if ((b = array[i]) != null && b > a)
a = b;
} else {
while (++i < n)
if ((b = f.call(array, array[i], i)) != null && b >= b) {
a = b;
break;
}
while (++i < n)
if ((b = f.call(array, array[i], i)) != null && b > a)
a = b;
}
return a;
};
d3.extent = function (array, f) {
var i = -1, n = array.length, a, b, c;
if (arguments.length === 1) {
while (++i < n)
if ((b = array[i]) != null && b >= b) {
a = c = b;
break;
}
while (++i < n)
if ((b = array[i]) != null) {
if (a > b)
a = b;
if (c < b)
c = b;
}
} else {
while (++i < n)
if ((b = f.call(array, array[i], i)) != null && b >= b) {
a = c = b;
break;
}
while (++i < n)
if ((b = f.call(array, array[i], i)) != null) {
if (a > b)
a = b;
if (c < b)
c = b;
}
}
return [
a,
c
];
};
function d3_number(x) {
return x === null ? NaN : +x;
}
function d3_numeric(x) {
return !isNaN(x);
}
d3.sum = function (array, f) {
var s = 0, n = array.length, a, i = -1;
if (arguments.length === 1) {
while (++i < n)
if (d3_numeric(a = +array[i]))
s += a;
} else {
while (++i < n)
if (d3_numeric(a = +f.call(array, array[i], i)))
s += a;
}
return s;
};
d3.mean = function (array, f) {
var s = 0, n = array.length, a, i = -1, j = n;
if (arguments.length === 1) {
while (++i < n)
if (d3_numeric(a = d3_number(array[i])))
s += a;
else
--j;
} else {
while (++i < n)
if (d3_numeric(a = d3_number(f.call(array, array[i], i))))
s += a;
else
--j;
}
if (j)
return s / j;
};
d3.quantile = function (values, p) {
var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
return e ? v + e * (values[h] - v) : v;
};
d3.median = function (array, f) {
var numbers = [], n = array.length, a, i = -1;
if (arguments.length === 1) {
while (++i < n)
if (d3_numeric(a = d3_number(array[i])))
numbers.push(a);
} else {
while (++i < n)
if (d3_numeric(a = d3_number(f.call(array, array[i], i))))
numbers.push(a);
}
if (numbers.length)
return d3.quantile(numbers.sort(d3_ascending), 0.5);
};
d3.variance = function (array, f) {
var n = array.length, m = 0, a, d, s = 0, i = -1, j = 0;
if (arguments.length === 1) {
while (++i < n) {
if (d3_numeric(a = d3_number(array[i]))) {
d = a - m;
m += d / ++j;
s += d * (a - m);
}
}
} else {
while (++i < n) {
if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) {
d = a - m;
m += d / ++j;
s += d * (a - m);
}
}
}
if (j > 1)
return s / (j - 1);
};
d3.deviation = function () {
var v = d3.variance.apply(this, arguments);
return v ? Math.sqrt(v) : v;
};
function d3_bisector(compare) {
return {
left: function (a, x, lo, hi) {
if (arguments.length < 3)
lo = 0;
if (arguments.length < 4)
hi = a.length;
while (lo < hi) {
var mid = lo + hi >>> 1;
if (compare(a[mid], x) < 0)
lo = mid + 1;
else
hi = mid;
}
return lo;
},
right: function (a, x, lo, hi) {
if (arguments.length < 3)
lo = 0;
if (arguments.length < 4)
hi = a.length;
while (lo < hi) {
var mid = lo + hi >>> 1;
if (compare(a[mid], x) > 0)
hi = mid;
else
lo = mid + 1;
}
return lo;
}
};
}
var d3_bisect = d3_bisector(d3_ascending);
d3.bisectLeft = d3_bisect.left;
d3.bisect = d3.bisectRight = d3_bisect.right;
d3.bisector = function (f) {
return d3_bisector(f.length === 1 ? function (d, x) {
return d3_ascending(f(d), x);
} : f);
};
d3.shuffle = function (array, i0, i1) {
if ((m = arguments.length) < 3) {
i1 = array.length;
if (m < 2)
i0 = 0;
}
var m = i1 - i0, t, i;
while (m) {
i = Math.random() * m-- | 0;
t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
}
return array;
};
d3.permute = function (array, indexes) {
var i = indexes.length, permutes = new Array(i);
while (i--)
permutes[i] = array[indexes[i]];
return permutes;
};
d3.pairs = function (array) {
var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
while (i < n)
pairs[i] = [
p0 = p1,
p1 = array[++i]
];
return pairs;
};
d3.zip = function () {
if (!(n = arguments.length))
return [];
for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
zip[j] = arguments[j][i];
}
}
return zips;
};
function d3_zipLength(d) {
return d.length;
}
d3.transpose = function (matrix) {
return d3.zip.apply(d3, matrix);
};
d3.keys = function (map) {
var keys = [];
for (var key in map)
keys.push(key);
return keys;
};
d3.values = function (map) {
var values = [];
for (var key in map)
values.push(map[key]);
return values;
};
d3.entries = function (map) {
var entries = [];
for (var key in map)
entries.push({
key: key,
value: map[key]
});
return entries;
};
d3.merge = function (arrays) {
var n = arrays.length, m, i = -1, j = 0, merged, array;
while (++i < n)
j += arrays[i].length;
merged = new Array(j);
while (--n >= 0) {
array = arrays[n];
m = array.length;
while (--m >= 0) {
merged[--j] = array[m];
}
}
return merged;
};
var abs = Math.abs;
d3.range = function (start, stop, step) {
if (arguments.length < 3) {
step = 1;
if (arguments.length < 2) {
stop = start;
start = 0;
}
}
if ((stop - start) / step === Infinity)
throw new Error('infinite range');
var range = [], k = d3_range_integerScale(abs(step)), i = -1, j;
start *= k, stop *= k, step *= k;
if (step < 0)
while ((j = start + step * ++i) > stop)
range.push(j / k);
else
while ((j = start + step * ++i) < stop)
range.push(j / k);
return range;
};
function d3_range_integerScale(x) {
var k = 1;
while (x * k % 1)
k *= 10;
return k;
}
function d3_class(ctor, properties) {
for (var key in properties) {
Object.defineProperty(ctor.prototype, key, {
value: properties[key],
enumerable: false
});
}
}
d3.map = function (object, f) {
var map = new d3_Map();
if (object instanceof d3_Map) {
object.forEach(function (key, value) {
map.set(key, value);
});
} else if (Array.isArray(object)) {
var i = -1, n = object.length, o;
if (arguments.length === 1)
while (++i < n)
map.set(i, object[i]);
else
while (++i < n)
map.set(f.call(object, o = object[i], i), o);
} else {
for (var key in object)
map.set(key, object[key]);
}
return map;
};
function d3_Map() {
this._ = Object.create(null);
}
var d3_map_proto = '__proto__', d3_map_zero = '\0';
d3_class(d3_Map, {
has: d3_map_has,
get: function (key) {
return this._[d3_map_escape(key)];
},
set: function (key, value) {
return this._[d3_map_escape(key)] = value;
},
remove: d3_map_remove,
keys: d3_map_keys,
values: function () {
var values = [];
for (var key in this._)
values.push(this._[key]);
return values;
},
entries: function () {
var entries = [];
for (var key in this._)
entries.push({
key: d3_map_unescape(key),
value: this._[key]
});
return entries;
},
size: d3_map_size,
empty: d3_map_empty,
forEach: function (f) {
for (var key in this._)
f.call(this, d3_map_unescape(key), this._[key]);
}
});
function d3_map_escape(key) {
return (key += '') === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key;
}
function d3_map_unescape(key) {
return (key += '')[0] === d3_map_zero ? key.slice(1) : key;
}
function d3_map_has(key) {
return d3_map_escape(key) in this._;
}
function d3_map_remove(key) {
return (key = d3_map_escape(key)) in this._ && delete this._[key];
}
function d3_map_keys() {
var keys = [];
for (var key in this._)
keys.push(d3_map_unescape(key));
return keys;
}
function d3_map_size() {
var size = 0;
for (var key in this._)
++size;
return size;
}
function d3_map_empty() {
for (var key in this._)
return false;
return true;
}
d3.nest = function () {
var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
function map(mapType, array, depth) {
if (depth >= keys.length)
return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
while (++i < n) {
if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
values.push(object);
} else {
valuesByKey.set(keyValue, [object]);
}
}
if (mapType) {
object = mapType();
setter = function (keyValue, values) {
object.set(keyValue, map(mapType, values, depth));
};
} else {
object = {};
setter = function (keyValue, values) {
object[keyValue] = map(mapType, values, depth);
};
}
valuesByKey.forEach(setter);
return object;
}
function entries(map, depth) {
if (depth >= keys.length)
return map;
var array = [], sortKey = sortKeys[depth++];
map.forEach(function (key, keyMap) {
array.push({
key: key,
values: entries(keyMap, depth)
});
});
return sortKey ? array.sort(function (a, b) {
return sortKey(a.key, b.key);
}) : array;
}
nest.map = function (array, mapType) {
return map(mapType, array, 0);
};
nest.entries = function (array) {
return entries(map(d3.map, array, 0), 0);
};
nest.key = function (d) {
keys.push(d);
return nest;
};
nest.sortKeys = function (order) {
sortKeys[keys.length - 1] = order;
return nest;
};
nest.sortValues = function (order) {
sortValues = order;
return nest;
};
nest.rollup = function (f) {
rollup = f;
return nest;
};
return nest;
};
d3.set = function (array) {
var set = new d3_Set();
if (array)
for (var i = 0, n = array.length; i < n; ++i)
set.add(array[i]);
return set;
};
function d3_Set() {
this._ = Object.create(null);
}
d3_class(d3_Set, {
has: d3_map_has,
add: function (key) {
this._[d3_map_escape(key += '')] = true;
return key;
},
remove: d3_map_remove,
values: d3_map_keys,
size: d3_map_size,
empty: d3_map_empty,
forEach: function (f) {
for (var key in this._)
f.call(this, d3_map_unescape(key));
}
});
d3.behavior = {};
function d3_identity(d) {
return d;
}
d3.rebind = function (target, source) {
var i = 1, n = arguments.length, method;
while (++i < n)
target[method = arguments[i]] = d3_rebind(target, source, source[method]);
return target;
};
function d3_rebind(target, source, method) {
return function () {
var value = method.apply(source, arguments);
return value === source ? target : value;
};
}
function d3_vendorSymbol(object, name) {
if (name in object)
return name;
name = name.charAt(0).toUpperCase() + name.slice(1);
for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
var prefixName = d3_vendorPrefixes[i] + name;
if (prefixName in object)
return prefixName;
}
}
var d3_vendorPrefixes = [
'webkit',
'ms',
'moz',
'Moz',
'o',
'O'
];
function d3_noop() {
}
d3.dispatch = function () {
var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
while (++i < n)
dispatch[arguments[i]] = d3_dispatch_event(dispatch);
return dispatch;
};
function d3_dispatch() {
}
d3_dispatch.prototype.on = function (type, listener) {
var i = type.indexOf('.'), name = '';
if (i >= 0) {
name = type.slice(i + 1);
type = type.slice(0, i);
}
if (type)
return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
if (arguments.length === 2) {
if (listener == null)
for (type in this) {
if (this.hasOwnProperty(type))
this[type].on(name, null);
}
return this;
}
};
function d3_dispatch_event(dispatch) {
var listeners = [], listenerByName = new d3_Map();
function event() {
var z = listeners, i = -1, n = z.length, l;
while (++i < n)
if (l = z[i].on)
l.apply(this, arguments);
return dispatch;
}
event.on = function (name, listener) {
var l = listenerByName.get(name), i;
if (arguments.length < 2)
return l && l.on;
if (l) {
l.on = null;
listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
listenerByName.remove(name);
}
if (listener)
listeners.push(listenerByName.set(name, { on: listener }));
return dispatch;
};
return event;
}
d3.event = null;
function d3_eventPreventDefault() {
d3.event.preventDefault();
}
function d3_eventSource() {
var e = d3.event, s;
while (s = e.sourceEvent)
e = s;
return e;
}
function d3_eventDispatch(target) {
var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
while (++i < n)
dispatch[arguments[i]] = d3_dispatch_event(dispatch);
dispatch.of = function (thiz, argumentz) {
return function (e1) {
try {
var e0 = e1.sourceEvent = d3.event;
e1.target = target;
d3.event = e1;
dispatch[e1.type].apply(thiz, argumentz);
} finally {
d3.event = e0;
}
};
};
return dispatch;
}
d3.requote = function (s) {
return s.replace(d3_requote_re, '\\$&');
};
var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
var d3_subclass = {}.__proto__ ? function (object, prototype) {
object.__proto__ = prototype;
} : function (object, prototype) {
for (var property in prototype)
object[property] = prototype[property];
};
function d3_selection(groups) {
d3_subclass(groups, d3_selectionPrototype);
return groups;
}
var d3_select = function (s, n) {
return n.querySelector(s);
}, d3_selectAll = function (s, n) {
return n.querySelectorAll(s);
}, d3_selectMatches = function (n, s) {
var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, 'matchesSelector')];
d3_selectMatches = function (n, s) {
return d3_selectMatcher.call(n, s);
};
return d3_selectMatches(n, s);
};
if (typeof Sizzle === 'function') {
d3_select = function (s, n) {
return Sizzle(s, n)[0] || null;
};
d3_selectAll = Sizzle;
d3_selectMatches = Sizzle.matchesSelector;
}
d3.selection = function () {
return d3.select(d3_document.documentElement);
};
var d3_selectionPrototype = d3.selection.prototype = [];
d3_selectionPrototype.select = function (selector) {
var subgroups = [], subgroup, subnode, group, node;
selector = d3_selection_selector(selector);
for (var j = -1, m = this.length; ++j < m;) {
subgroups.push(subgroup = []);
subgroup.parentNode = (group = this[j]).parentNode;
for (var i = -1, n = group.length; ++i < n;) {
if (node = group[i]) {
subgroup.push(subnode = selector.call(node, node.__data__, i, j));
if (subnode && '__data__' in node)
subnode.__data__ = node.__data__;
} else {
subgroup.push(null);
}
}
}
return d3_selection(subgroups);
};
function d3_selection_selector(selector) {
return typeof selector === 'function' ? selector : function () {
return d3_select(selector, this);
};
}
d3_selectionPrototype.selectAll = function (selector) {
var subgroups = [], subgroup, node;
selector = d3_selection_selectorAll(selector);
for (var j = -1, m = this.length; ++j < m;) {
for (var group = this[j], i = -1, n = group.length; ++i < n;) {
if (node = group[i]) {
subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
subgroup.parentNode = node;
}
}
}
return d3_selection(subgroups);
};
function d3_selection_selectorAll(selector) {
return typeof selector === 'function' ? selector : function () {
return d3_selectAll(selector, this);
};
}
var d3_nsPrefix = {
svg: 'http://www.w3.org/2000/svg',
xhtml: 'http://www.w3.org/1999/xhtml',
xlink: 'http://www.w3.org/1999/xlink',
xml: 'http://www.w3.org/XML/1998/namespace',
xmlns: 'http://www.w3.org/2000/xmlns/'
};
d3.ns = {
prefix: d3_nsPrefix,
qualify: function (name) {
var i = name.indexOf(':'), prefix = name;
if (i >= 0) {
prefix = name.slice(0, i);
name = name.slice(i + 1);
}
return d3_nsPrefix.hasOwnProperty(prefix) ? {
space: d3_nsPrefix[prefix],
local: name
} : name;
}
};
d3_selectionPrototype.attr = function (name, value) {
if (arguments.length < 2) {
if (typeof name === 'string') {
var node = this.node();
name = d3.ns.qualify(name);
return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
}
for (value in name)
this.each(d3_selection_attr(value, name[value]));
return this;
}
return this.each(d3_selection_attr(name, value));
};
function d3_selection_attr(name, value) {
name = d3.ns.qualify(name);
function attrNull() {
this.removeAttribute(name);
}
function attrNullNS() {
this.removeAttributeNS(name.space, name.local);
}
function attrConstant() {
this.setAttribute(name, value);
}
function attrConstantNS() {
this.setAttributeNS(name.space, name.local, value);
}
function attrFunction() {
var x = value.apply(this, arguments);
if (x == null)
this.removeAttribute(name);
else
this.setAttribute(name, x);
}
function attrFunctionNS() {
var x = value.apply(this, arguments);
if (x == null)
this.removeAttributeNS(name.space, name.local);
else
this.setAttributeNS(name.space, name.local, x);
}
return value == null ? name.local ? attrNullNS : attrNull : typeof value === 'function' ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
}
function d3_collapse(s) {
return s.trim().replace(/\s+/g, ' ');
}
d3_selectionPrototype.classed = function (name, value) {
if (arguments.length < 2) {
if (typeof name === 'string') {
var node = this.node(), n = (name = d3_selection_classes(name)).length, i = -1;
if (value = node.classList) {
while (++i < n)
if (!value.contains(name[i]))
return false;
} else {
value = node.getAttribute('class');
while (++i < n)
if (!d3_selection_classedRe(name[i]).test(value))
return false;
}
return true;
}
for (value in name)
this.each(d3_selection_classed(value, name[value]));
return this;
}
return this.each(d3_selection_classed(name, value));
};
function d3_selection_classedRe(name) {
return new RegExp('(?:^|\\s+)' + d3.requote(name) + '(?:\\s+|$)', 'g');
}
function d3_selection_classes(name) {
return (name + '').trim().split(/^|\s+/);
}
function d3_selection_classed(name, value) {
name = d3_selection_classes(name).map(d3_selection_classedName);
var n = name.length;
function classedConstant() {
var i = -1;
while (++i < n)
name[i](this, value);
}
function classedFunction() {
var i = -1, x = value.apply(this, arguments);
while (++i < n)
name[i](this, x);
}
return typeof value === 'function' ? classedFunction : classedConstant;
}
function d3_selection_classedName(name) {
var re = d3_selection_classedRe(name);
return function (node, value) {
if (c = node.classList)
return value ? c.add(name) : c.remove(name);
var c = node.getAttribute('class') || '';
if (value) {
re.lastIndex = 0;
if (!re.test(c))
node.setAttribute('class', d3_collapse(c + ' ' + name));
} else {
node.setAttribute('class', d3_collapse(c.replace(re, ' ')));
}
};
}
d3_selectionPrototype.style = function (name, value, priority) {
var n = arguments.length;
if (n < 3) {
if (typeof name !== 'string') {
if (n < 2)
value = '';
for (priority in name)
this.each(d3_selection_style(priority, name[priority], value));
return this;
}
if (n < 2) {
var node = this.node();
return d3_window(node).getComputedStyle(node, null).getPropertyValue(name);
}
priority = '';
}
return this.each(d3_selection_style(name, value, priority));
};
function d3_selection_style(name, value, priority) {
function styleNull() {
this.style.removeProperty(name);
}
function styleConstant() {
this.style.setProperty(name, value, priority);
}
function styleFunction() {
var x = value.apply(this, arguments);
if (x == null)
this.style.removeProperty(name);
else
this.style.setProperty(name, x, priority);
}
return value == null ? styleNull : typeof value === 'function' ? styleFunction : styleConstant;
}
d3_selectionPrototype.property = function (name, value) {
if (arguments.length < 2) {
if (typeof name === 'string')
return this.node()[name];
for (value in name)
this.each(d3_selection_property(value, name[value]));
return this;
}
return this.each(d3_selection_property(name, value));
};
function d3_selection_property(name, value) {
function propertyNull() {
delete this[name];
}
function propertyConstant() {
this[name] = value;
}
function propertyFunction() {
var x = value.apply(this, arguments);
if (x == null)
delete this[name];
else
this[name] = x;
}
return value == null ? propertyNull : typeof value === 'function' ? propertyFunction : propertyConstant;
}
d3_selectionPrototype.text = function (value) {
return arguments.length ? this.each(typeof value === 'function' ? function () {
var v = value.apply(this, arguments);
this.textContent = v == null ? '' : v;
} : value == null ? function () {
this.textContent = '';
} : function () {
this.textContent = value;
}) : this.node().textContent;
};
d3_selectionPrototype.html = function (value) {
return arguments.length ? this.each(typeof value === 'function' ? function () {
var v = value.apply(this, arguments);
this.innerHTML = v == null ? '' : v;
} : value == null ? function () {
this.innerHTML = '';
} : function () {
this.innerHTML = value;
}) : this.node().innerHTML;
};
d3_selectionPrototype.append = function (name) {
name = d3_selection_creator(name);
return this.select(function () {
return this.appendChild(name.apply(this, arguments));
});
};
function d3_selection_creator(name) {
function create() {
var document = this.ownerDocument, namespace = this.namespaceURI;
return namespace ? document.createElementNS(namespace, name) : document.createElement(name);
}
function createNS() {
return this.ownerDocument.createElementNS(name.space, name.local);
}
return typeof name === 'function' ? name : (name = d3.ns.qualify(name)).local ? createNS : create;
}
d3_selectionPrototype.insert = function (name, before) {
name = d3_selection_creator(name);
before = d3_selection_selector(before);
return this.select(function () {
return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
});
};
d3_selectionPrototype.remove = function () {
return this.each(d3_selectionRemove);
};
function d3_selectionRemove() {
var parent = this.parentNode;
if (parent)
parent.removeChild(this);
}
d3_selectionPrototype.data = function (value, key) {
var i = -1, n = this.length, group, node;
if (!arguments.length) {
value = new Array(n = (group = this[0]).length);
while (++i < n) {
if (node = group[i]) {
value[i] = node.__data__;
}
}
return value;
}
function bind(group, groupData) {
var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
if (key) {
var nodeByKeyValue = new d3_Map(), keyValues = new Array(n), keyValue;
for (i = -1; ++i < n;) {
if (nodeByKeyValue.has(keyValue = key.call(node = group[i], node.__data__, i))) {
exitNodes[i] = node;
} else {
nodeByKeyValue.set(keyValue, node);
}
keyValues[i] = keyValue;
}
for (i = -1; ++i < m;) {
if (!(node = nodeByKeyValue.get(keyValue = key.call(groupData, nodeData = groupData[i], i)))) {
enterNodes[i] = d3_selection_dataNode(nodeData);
} else if (node !== true) {
updateNodes[i] = node;
node.__data__ = nodeData;
}
nodeByKeyValue.set(keyValue, true);
}
for (i = -1; ++i < n;) {
if (nodeByKeyValue.get(keyValues[i]) !== true) {
exitNodes[i] = group[i];
}
}
} else {
for (i = -1; ++i < n0;) {
node = group[i];
nodeData = groupData[i];
if (node) {
node.__data__ = nodeData;
updateNodes[i] = node;
} else {
enterNodes[i] = d3_selection_dataNode(nodeData);
}
}
for (; i < m; ++i) {
enterNodes[i] = d3_selection_dataNode(groupData[i]);
}
for (; i < n; ++i) {
exitNodes[i] = group[i];
}
}
enterNodes.update = updateNodes;
enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
enter.push(enterNodes);
update.push(updateNodes);
exit.push(exitNodes);
}
var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
if (typeof value === 'function') {
while (++i < n) {
bind(group = this[i], value.call(group, group.parentNode.__data__, i));
}
} else {
while (++i < n) {
bind(group = this[i], value);
}
}
update.enter = function () {
return enter;
};
update.exit = function () {
return exit;
};
return update;
};
function d3_selection_dataNode(data) {
return { __data__: data };
}
d3_selectionPrototype.datum = function (value) {
return arguments.length ? this.property('__data__', value) : this.property('__data__');
};
d3_selectionPrototype.filter = function (filter) {
var subgroups = [], subgroup, group, node;
if (typeof filter !== 'function')
filter = d3_selection_filter(filter);
for (var j = 0, m = this.length; j < m; j++) {
subgroups.push(subgroup = []);
subgroup.parentNode = (group = this[j]).parentNode;
for (var i = 0, n = group.length; i < n; i++) {
if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
subgroup.push(node);
}
}
}
return d3_selection(subgroups);
};
function d3_selection_filter(selector) {
return function () {
return d3_selectMatches(this, selector);
};
}
d3_selectionPrototype.order = function () {
for (var j = -1, m = this.length; ++j < m;) {
for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
if (node = group[i]) {
if (next && next !== node.nextSibling)
next.parentNode.insertBefore(node, next);
next = node;
}
}
}
return this;
};
d3_selectionPrototype.sort = function (comparator) {
comparator = d3_selection_sortComparator.apply(this, arguments);
for (var j = -1, m = this.length; ++j < m;)
this[j].sort(comparator);
return this.order();
};
function d3_selection_sortComparator(comparator) {
if (!arguments.length)
comparator = d3_ascending;
return function (a, b) {
return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
};
}
d3_selectionPrototype.each = function (callback) {
return d3_selection_each(this, function (node, i, j) {
callback.call(node, node.__data__, i, j);
});
};
function d3_selection_each(groups, callback) {
for (var j = 0, m = groups.length; j < m; j++) {
for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
if (node = group[i])
callback(node, i, j);
}
}
return groups;
}
d3_selectionPrototype.call = function (callback) {
var args = d3_array(arguments);
callback.apply(args[0] = this, args);
return this;
};
d3_selectionPrototype.empty = function () {
return !this.node();
};
d3_selectionPrototype.node = function () {
for (var j = 0, m = this.length; j < m; j++) {
for (var group = this[j], i = 0, n = group.length; i < n; i++) {
var node = group[i];
if (node)
return node;
}
}
return null;
};
d3_selectionPrototype.size = function () {
var n = 0;
d3_selection_each(this, function () {
++n;
});
return n;
};
function d3_selection_enter(selection) {
d3_subclass(selection, d3_selection_enterPrototype);
return selection;
}
var d3_selection_enterPrototype = [];
d3.selection.enter = d3_selection_enter;
d3.selection.enter.prototype = d3_selection_enterPrototype;
d3_selection_enterPrototype.append = d3_selectionPrototype.append;
d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
d3_selection_enterPrototype.node = d3_selectionPrototype.node;
d3_selection_enterPrototype.call = d3_selectionPrototype.call;
d3_selection_enterPrototype.size = d3_selectionPrototype.size;
d3_selection_enterPrototype.select = function (selector) {
var subgroups = [], subgroup, subnode, upgroup, group, node;
for (var j = -1, m = this.length; ++j < m;) {
upgroup = (group = this[j]).update;
subgroups.push(subgroup = []);
subgroup.parentNode = group.parentNode;
for (var i = -1, n = group.length; ++i < n;) {
if (node = group[i]) {
subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
subnode.__data__ = node.__data__;
} else {
subgroup.push(null);
}
}
}
return d3_selection(subgroups);
};
d3_selection_enterPrototype.insert = function (name, before) {
if (arguments.length < 2)
before = d3_selection_enterInsertBefore(this);
return d3_selectionPrototype.insert.call(this, name, before);
};
function d3_selection_enterInsertBefore(enter) {
var i0, j0;
return function (d, i, j) {
var group = enter[j].update, n = group.length, node;
if (j != j0)
j0 = j, i0 = 0;
if (i >= i0)
i0 = i + 1;
while (!(node = group[i0]) && ++i0 < n);
return node;
};
}
d3.select = function (node) {
var group;
if (typeof node === 'string') {
group = [d3_select(node, d3_document)];
group.parentNode = d3_document.documentElement;
} else {
group = [node];
group.parentNode = d3_documentElement(node);
}
return d3_selection([group]);
};
d3.selectAll = function (nodes) {
var group;
if (typeof nodes === 'string') {
group = d3_array(d3_selectAll(nodes, d3_document));
group.parentNode = d3_document.documentElement;
} else {
group = nodes;
group.parentNode = null;
}
return d3_selection([group]);
};
d3_selectionPrototype.on = function (type, listener, capture) {
var n = arguments.length;
if (n < 3) {
if (typeof type !== 'string') {
if (n < 2)
listener = false;
for (capture in type)
this.each(d3_selection_on(capture, type[capture], listener));
return this;
}
if (n < 2)
return (n = this.node()['__on' + type]) && n._;
capture = false;
}
return this.each(d3_selection_on(type, listener, capture));
};
function d3_selection_on(type, listener, capture) {
var name = '__on' + type, i = type.indexOf('.'), wrap = d3_selection_onListener;
if (i > 0)
type = type.slice(0, i);
var filter = d3_selection_onFilters.get(type);
if (filter)
type = filter, wrap = d3_selection_onFilter;
function onRemove() {
var l = this[name];
if (l) {
this.removeEventListener(type, l, l.$);
delete this[name];
}
}
function onAdd() {
var l = wrap(listener, d3_array(arguments));
onRemove.call(this);
this.addEventListener(type, this[name] = l, l.$ = capture);
l._ = listener;
}
function removeAll() {
var re = new RegExp('^__on([^.]+)' + d3.requote(type) + '$'), match;
for (var name in this) {
if (match = name.match(re)) {
var l = this[name];
this.removeEventListener(match[1], l, l.$);
delete this[name];
}
}
}
return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
}
var d3_selection_onFilters = d3.map({
mouseenter: 'mouseover',
mouseleave: 'mouseout'
});
if (d3_document) {
d3_selection_onFilters.forEach(function (k) {
if ('on' + k in d3_document)
d3_selection_onFilters.remove(k);
});
}
function d3_selection_onListener(listener, argumentz) {
return function (e) {
var o = d3.event;
d3.event = e;
argumentz[0] = this.__data__;
try {
listener.apply(this, argumentz);
} finally {
d3.event = o;
}
};
}
function d3_selection_onFilter(listener, argumentz) {
var l = d3_selection_onListener(listener, argumentz);
return function (e) {
var target = this, related = e.relatedTarget;
if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
l.call(target, e);
}
};
}
var d3_event_dragSelect, d3_event_dragId = 0;
function d3_event_dragSuppress(node) {
var name = '.dragsuppress-' + ++d3_event_dragId, click = 'click' + name, w = d3.select(d3_window(node)).on('touchmove' + name, d3_eventPreventDefault).on('dragstart' + name, d3_eventPreventDefault).on('selectstart' + name, d3_eventPreventDefault);
if (d3_event_dragSelect == null) {
d3_event_dragSelect = 'onselectstart' in node ? false : d3_vendorSymbol(node.style, 'userSelect');
}
if (d3_event_dragSelect) {
var style = d3_documentElement(node).style, select = style[d3_event_dragSelect];
style[d3_event_dragSelect] = 'none';
}
return function (suppressClick) {
w.on(name, null);
if (d3_event_dragSelect)
style[d3_event_dragSelect] = select;
if (suppressClick) {
var off = function () {
w.on(click, null);
};
w.on(click, function () {
d3_eventPreventDefault();
off();
}, true);
setTimeout(off, 0);
}
};
}
d3.mouse = function (container) {
return d3_mousePoint(container, d3_eventSource());
};
var d3_mouse_bug44083 = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
function d3_mousePoint(container, e) {
if (e.changedTouches)
e = e.changedTouches[0];
var svg = container.ownerSVGElement || container;
if (svg.createSVGPoint) {
var point = svg.createSVGPoint();
if (d3_mouse_bug44083 < 0) {
var window = d3_window(container);
if (window.scrollX || window.scrollY) {
svg = d3.select('body').append('svg').style({
position: 'absolute',
top: 0,
left: 0,
margin: 0,
padding: 0,
border: 'none'
}, 'important');
var ctm = svg[0][0].getScreenCTM();
d3_mouse_bug44083 = !(ctm.f || ctm.e);
svg.remove();
}
}
if (d3_mouse_bug44083)
point.x = e.pageX, point.y = e.pageY;
else
point.x = e.clientX, point.y = e.clientY;
point = point.matrixTransform(container.getScreenCTM().inverse());
return [
point.x,
point.y
];
}
var rect = container.getBoundingClientRect();
return [
e.clientX - rect.left - container.clientLeft,
e.clientY - rect.top - container.clientTop
];
}
d3.touch = function (container, touches, identifier) {
if (arguments.length < 3)
identifier = touches, touches = d3_eventSource().changedTouches;
if (touches)
for (var i = 0, n = touches.length, touch; i < n; ++i) {
if ((touch = touches[i]).identifier === identifier) {
return d3_mousePoint(container, touch);
}
}
};
d3.behavior.drag = function () {
var event = d3_eventDispatch(drag, 'drag', 'dragstart', 'dragend'), origin = null, mousedown = dragstart(d3_noop, d3.mouse, d3_window, 'mousemove', 'mouseup'), touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_identity, 'touchmove', 'touchend');
function drag() {
this.on('mousedown.drag', mousedown).on('touchstart.drag', touchstart);
}
function dragstart(id, position, subject, move, end) {
return function () {
var that = this, target = d3.event.target, parent = that.parentNode, dispatch = event.of(that, arguments), dragged = 0, dragId = id(), dragName = '.drag' + (dragId == null ? '' : '-' + dragId), dragOffset, dragSubject = d3.select(subject(target)).on(move + dragName, moved).on(end + dragName, ended), dragRestore = d3_event_dragSuppress(target), position0 = position(parent, dragId);
if (origin) {
dragOffset = origin.apply(that, arguments);
dragOffset = [
dragOffset.x - position0[0],
dragOffset.y - position0[1]
];
} else {
dragOffset = [
0,
0
];
}
dispatch({ type: 'dragstart' });
function moved() {
var position1 = position(parent, dragId), dx, dy;
if (!position1)
return;
dx = position1[0] - position0[0];
dy = position1[1] - position0[1];
dragged |= dx | dy;
position0 = position1;
dispatch({
type: 'drag',
x: position1[0] + dragOffset[0],
y: position1[1] + dragOffset[1],
dx: dx,
dy: dy
});
}
function ended() {
if (!position(parent, dragId))
return;
dragSubject.on(move + dragName, null).on(end + dragName, null);
dragRestore(dragged && d3.event.target === target);
dispatch({ type: 'dragend' });
}
};
}
drag.origin = function (x) {
if (!arguments.length)
return origin;
origin = x;
return drag;
};
return d3.rebind(drag, event, 'on');
};
function d3_behavior_dragTouchId() {
return d3.event.changedTouches[0].identifier;
}
d3.touches = function (container, touches) {
if (arguments.length < 2)
touches = d3_eventSource().touches;
return touches ? d3_array(touches).map(function (touch) {
var point = d3_mousePoint(container, touch);
point.identifier = touch.identifier;
return point;
}) : [];
};
var ε = 0.000001, ε2 = ε * ε, π = Math.PI, τ = 2 * π, τε = τ - ε, halfπ = π / 2, d3_radians = π / 180, d3_degrees = 180 / π;
function d3_sgn(x) {
return x > 0 ? 1 : x < 0 ? -1 : 0;
}
function d3_cross2d(a, b, c) {
return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}
function d3_acos(x) {
return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
}
function d3_asin(x) {
return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
}
function d3_sinh(x) {
return ((x = Math.exp(x)) - 1 / x) / 2;
}
function d3_cosh(x) {
return ((x = Math.exp(x)) + 1 / x) / 2;
}
function d3_tanh(x) {
return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
function d3_haversin(x) {
return (x = Math.sin(x / 2)) * x;
}
var ρ = Math.SQRT2, ρ2 = 2, ρ4 = 4;
d3.interpolateZoom = function (p0, p1) {
var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2];
var dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + ρ4 * d2) / (2 * w0 * ρ2 * d1), b1 = (w1 * w1 - w0 * w0 - ρ4 * d2) / (2 * w1 * ρ2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1), dr = r1 - r0, S = (dr || Math.log(w1 / w0)) / ρ;
function interpolate(t) {
var s = t * S;
if (dr) {
var coshr0 = d3_cosh(r0), u = w0 / (ρ2 * d1) * (coshr0 * d3_tanh(ρ * s + r0) - d3_sinh(r0));
return [
ux0 + u * dx,
uy0 + u * dy,
w0 * coshr0 / d3_cosh(ρ * s + r0)
];
}
return [
ux0 + t * dx,
uy0 + t * dy,
w0 * Math.exp(ρ * s)
];
}
interpolate.duration = S * 1000;
return interpolate;
};
d3.behavior.zoom = function () {
var view = {
x: 0,
y: 0,
k: 1
}, translate0, center0, center, size = [
960,
500
], scaleExtent = d3_behavior_zoomInfinity, duration = 250, zooming = 0, mousedown = 'mousedown.zoom', mousemove = 'mousemove.zoom', mouseup = 'mouseup.zoom', mousewheelTimer, touchstart = 'touchstart.zoom', touchtime, event = d3_eventDispatch(zoom, 'zoomstart', 'zoom', 'zoomend'), x0, x1, y0, y1;
if (!d3_behavior_zoomWheel) {
d3_behavior_zoomWheel = 'onwheel' in d3_document ? (d3_behavior_zoomDelta = function () {
return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
}, 'wheel') : 'onmousewheel' in d3_document ? (d3_behavior_zoomDelta = function () {
return d3.event.wheelDelta;
}, 'mousewheel') : (d3_behavior_zoomDelta = function () {
return -d3.event.detail;
}, 'MozMousePixelScroll');
}
function zoom(g) {
g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + '.zoom', mousewheeled).on('dblclick.zoom', dblclicked).on(touchstart, touchstarted);
}
zoom.event = function (g) {
g.each(function () {
var dispatch = event.of(this, arguments), view1 = view;
if (d3_transitionInheritId) {
d3.select(this).transition().each('start.zoom', function () {
view = this.__chart__ || {
x: 0,
y: 0,
k: 1
};
zoomstarted(dispatch);
}).tween('zoom:zoom', function () {
var dx = size[0], dy = size[1], cx = center0 ? center0[0] : dx / 2, cy = center0 ? center0[1] : dy / 2, i = d3.interpolateZoom([
(cx - view.x) / view.k,
(cy - view.y) / view.k,
dx / view.k
], [
(cx - view1.x) / view1.k,
(cy - view1.y) / view1.k,
dx / view1.k
]);
return function (t) {
var l = i(t), k = dx / l[2];
this.__chart__ = view = {
x: cx - l[0] * k,
y: cy - l[1] * k,
k: k
};
zoomed(dispatch);
};
}).each('interrupt.zoom', function () {
zoomended(dispatch);
}).each('end.zoom', function () {
zoomended(dispatch);
});
} else {
this.__chart__ = view;
zoomstarted(dispatch);
zoomed(dispatch);
zoomended(dispatch);
}
});
};
zoom.translate = function (_) {
if (!arguments.length)
return [
view.x,
view.y
];
view = {
x: +_[0],
y: +_[1],
k: view.k
};
rescale();
return zoom;
};
zoom.scale = function (_) {
if (!arguments.length)
return view.k;
view = {
x: view.x,
y: view.y,
k: +_
};
rescale();
return zoom;
};
zoom.scaleExtent = function (_) {
if (!arguments.length)
return scaleExtent;
scaleExtent = _ == null ? d3_behavior_zoomInfinity : [
+_[0],
+_[1]
];
return zoom;
};
zoom.center = function (_) {
if (!arguments.length)
return center;
center = _ && [
+_[0],
+_[1]
];
return zoom;
};
zoom.size = function (_) {
if (!arguments.length)
return size;
size = _ && [
+_[0],
+_[1]
];
return zoom;
};
zoom.duration = function (_) {
if (!arguments.length)
return duration;
duration = +_;
return zoom;
};
zoom.x = function (z) {
if (!arguments.length)
return x1;
x1 = z;
x0 = z.copy();
view = {
x: 0,
y: 0,
k: 1
};
return zoom;
};
zoom.y = function (z) {
if (!arguments.length)
return y1;
y1 = z;
y0 = z.copy();
view = {
x: 0,
y: 0,
k: 1
};
return zoom;
};
function location(p) {
return [
(p[0] - view.x) / view.k,
(p[1] - view.y) / view.k
];
}
function point(l) {
return [
l[0] * view.k + view.x,
l[1] * view.k + view.y
];
}
function scaleTo(s) {
view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
}
function translateTo(p, l) {
l = point(l);
view.x += p[0] - l[0];
view.y += p[1] - l[1];
}
function zoomTo(that, p, l, k) {
that.__chart__ = {
x: view.x,
y: view.y,
k: view.k
};
scaleTo(Math.pow(2, k));
translateTo(center0 = p, l);
that = d3.select(that);
if (duration > 0)
that = that.transition().duration(duration);
that.call(zoom.event);
}
function rescale() {
if (x1)
x1.domain(x0.range().map(function (x) {
return (x - view.x) / view.k;
}).map(x0.invert));
if (y1)
y1.domain(y0.range().map(function (y) {
return (y - view.y) / view.k;
}).map(y0.invert));
}
function zoomstarted(dispatch) {
if (!zooming++)
dispatch({ type: 'zoomstart' });
}
function zoomed(dispatch) {
rescale();
dispatch({
type: 'zoom',
scale: view.k,
translate: [
view.x,
view.y
]
});
}
function zoomended(dispatch) {
if (!--zooming)
dispatch({ type: 'zoomend' }), center0 = null;
}
function mousedowned() {
var that = this, target = d3.event.target, dispatch = event.of(that, arguments), dragged = 0, subject = d3.select(d3_window(that)).on(mousemove, moved).on(mouseup, ended), location0 = location(d3.mouse(that)), dragRestore = d3_event_dragSuppress(that);
d3_selection_interrupt.call(that);
zoomstarted(dispatch);
function moved() {
dragged = 1;
translateTo(d3.mouse(that), location0);
zoomed(dispatch);
}
function ended() {
subject.on(mousemove, null).on(mouseup, null);
dragRestore(dragged && d3.event.target === target);
zoomended(dispatch);
}
}
function touchstarted() {
var that = this, dispatch = event.of(that, arguments), locations0 = {}, distance0 = 0, scale0, zoomName = '.zoom-' + d3.event.changedTouches[0].identifier, touchmove = 'touchmove' + zoomName, touchend = 'touchend' + zoomName, targets = [], subject = d3.select(that), dragRestore = d3_event_dragSuppress(that);
started();
zoomstarted(dispatch);
subject.on(mousedown, null).on(touchstart, started);
function relocate() {
var touches = d3.touches(that);
scale0 = view.k;
touches.forEach(function (t) {
if (t.identifier in locations0)
locations0[t.identifier] = location(t);
});
return touches;
}
function started() {
var target = d3.event.target;
d3.select(target).on(touchmove, moved).on(touchend, ended);
targets.push(target);
var changed = d3.event.changedTouches;
for (var i = 0, n = changed.length; i < n; ++i) {
locations0[changed[i].identifier] = null;
}
var touches = relocate(), now = Date.now();
if (touches.length === 1) {
if (now - touchtime < 500) {
var p = touches[0];
zoomTo(that, p, locations0[p.identifier], Math.floor(Math.log(view.k) / Math.LN2) + 1);
d3_eventPreventDefault();
}
touchtime = now;
} else if (touches.length > 1) {
var p = touches[0], q = touches[1], dx = p[0] - q[0], dy = p[1] - q[1];
distance0 = dx * dx + dy * dy;
}
}
function moved() {
var touches = d3.touches(that), p0, l0, p1, l1;
d3_selection_interrupt.call(that);
for (var i = 0, n = touches.length; i < n; ++i, l1 = null) {
p1 = touches[i];
if (l1 = locations0[p1.identifier]) {
if (l0)
break;
p0 = p1, l0 = l1;
}
}
if (l1) {
var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1, scale1 = distance0 && Math.sqrt(distance1 / distance0);
p0 = [
(p0[0] + p1[0]) / 2,
(p0[1] + p1[1]) / 2
];
l0 = [
(l0[0] + l1[0]) / 2,
(l0[1] + l1[1]) / 2
];
scaleTo(scale1 * scale0);
}
touchtime = null;
translateTo(p0, l0);
zoomed(dispatch);
}
function ended() {
if (d3.event.touches.length) {
var changed = d3.event.changedTouches;
for (var i = 0, n = changed.length; i < n; ++i) {
delete locations0[changed[i].identifier];
}
for (var identifier in locations0) {
return void relocate();
}
}
d3.selectAll(targets).on(zoomName, null);
subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
dragRestore();
zoomended(dispatch);
}
}
function mousewheeled() {
var dispatch = event.of(this, arguments);
if (mousewheelTimer)
clearTimeout(mousewheelTimer);
else
d3_selection_interrupt.call(this), translate0 = location(center0 = center || d3.mouse(this)), zoomstarted(dispatch);
mousewheelTimer = setTimeout(function () {
mousewheelTimer = null;
zoomended(dispatch);
}, 50);
d3_eventPreventDefault();
scaleTo(Math.pow(2, d3_behavior_zoomDelta() * 0.002) * view.k);
translateTo(center0, translate0);
zoomed(dispatch);
}
function dblclicked() {
var p = d3.mouse(this), k = Math.log(view.k) / Math.LN2;
zoomTo(this, p, location(p), d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1);
}
return d3.rebind(zoom, event, 'on');
};
var d3_behavior_zoomInfinity = [
0,
Infinity
], d3_behavior_zoomDelta, d3_behavior_zoomWheel;
d3.color = d3_color;
function d3_color() {
}
d3_color.prototype.toString = function () {
return this.rgb() + '';
};
d3.hsl = d3_hsl;
function d3_hsl(h, s, l) {
return this instanceof d3_hsl ? void (this.h = +h, this.s = +s, this.l = +l) : arguments.length < 2 ? h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l) : d3_rgb_parse('' + h, d3_rgb_hsl, d3_hsl) : new d3_hsl(h, s, l);
}
var d3_hslPrototype = d3_hsl.prototype = new d3_color();
d3_hslPrototype.brighter = function (k) {
k = Math.pow(0.7, arguments.length ? k : 1);
return new d3_hsl(this.h, this.s, this.l / k);
};
d3_hslPrototype.darker = function (k) {
k = Math.pow(0.7, arguments.length ? k : 1);
return new d3_hsl(this.h, this.s, k * this.l);
};
d3_hslPrototype.rgb = function () {
return d3_hsl_rgb(this.h, this.s, this.l);
};
function d3_hsl_rgb(h, s, l) {
var m1, m2;
h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
l = l < 0 ? 0 : l > 1 ? 1 : l;
m2 = l <= 0.5 ? l * (1 + s) : l + s - l * s;
m1 = 2 * l - m2;
function v(h) {
if (h > 360)
h -= 360;
else if (h < 0)
h += 360;
if (h < 60)
return m1 + (m2 - m1) * h / 60;
if (h < 180)
return m2;
if (h < 240)
return m1 + (m2 - m1) * (240 - h) / 60;
return m1;
}
function vv(h) {
return Math.round(v(h) * 255);
}
return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
}
d3.hcl = d3_hcl;
function d3_hcl(h, c, l) {
return this instanceof d3_hcl ? void (this.h = +h, this.c = +c, this.l = +l) : arguments.length < 2 ? h instanceof d3_hcl ? new d3_hcl(h.h, h.c, h.l) : h instanceof d3_lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : new d3_hcl(h, c, l);
}
var d3_hclPrototype = d3_hcl.prototype = new d3_color();
d3_hclPrototype.brighter = function (k) {
return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
};
d3_hclPrototype.darker = function (k) {
return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
};
d3_hclPrototype.rgb = function () {
return d3_hcl_lab(this.h, this.c, this.l).rgb();
};
function d3_hcl_lab(h, c, l) {
if (isNaN(h))
h = 0;
if (isNaN(c))
c = 0;
return new d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
}
d3.lab = d3_lab;
function d3_lab(l, a, b) {
return this instanceof d3_lab ? void (this.l = +l, this.a = +a, this.b = +b) : arguments.length < 2 ? l instanceof d3_lab ? new d3_lab(l.l, l.a, l.b) : l instanceof d3_hcl ? d3_hcl_lab(l.h, l.c, l.l) : d3_rgb_lab((l = d3_rgb(l)).r, l.g, l.b) : new d3_lab(l, a, b);
}
var d3_lab_K = 18;
var d3_lab_X = 0.95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
var d3_labPrototype = d3_lab.prototype = new d3_color();
d3_labPrototype.brighter = function (k) {
return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
};
d3_labPrototype.darker = function (k) {
return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
};
d3_labPrototype.rgb = function () {
return d3_lab_rgb(this.l, this.a, this.b);
};
function d3_lab_rgb(l, a, b) {
var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
x = d3_lab_xyz(x) * d3_lab_X;
y = d3_lab_xyz(y) * d3_lab_Y;
z = d3_lab_xyz(z) * d3_lab_Z;
return new d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), d3_xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z), d3_xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z));
}
function d3_lab_hcl(l, a, b) {
return l > 0 ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : new d3_hcl(NaN, NaN, l);
}
function d3_lab_xyz(x) {
return x > 0.206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
}
function d3_xyz_lab(x) {
return x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
}
function d3_xyz_rgb(r) {
return Math.round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055));
}
d3.rgb = d3_rgb;
function d3_rgb(r, g, b) {
return this instanceof d3_rgb ? void (this.r = ~~r, this.g = ~~g, this.b = ~~b) : arguments.length < 2 ? r instanceof d3_rgb ? new d3_rgb(r.r, r.g, r.b) : d3_rgb_parse('' + r, d3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b);
}
function d3_rgbNumber(value) {
return new d3_rgb(value >> 16, value >> 8 & 255, value & 255);
}
function d3_rgbString(value) {
return d3_rgbNumber(value) + '';
}
var d3_rgbPrototype = d3_rgb.prototype = new d3_color();
d3_rgbPrototype.brighter = function (k) {
k = Math.pow(0.7, arguments.length ? k : 1);
var r = this.r, g = this.g, b = this.b, i = 30;
if (!r && !g && !b)
return new d3_rgb(i, i, i);
if (r && r < i)
r = i;
if (g && g < i)
g = i;
if (b && b < i)
b = i;
return new d3_rgb(Math.min(255, r / k), Math.min(255, g / k), Math.min(255, b / k));
};
d3_rgbPrototype.darker = function (k) {
k = Math.pow(0.7, arguments.length ? k : 1);
return new d3_rgb(k * this.r, k * this.g, k * this.b);
};
d3_rgbPrototype.hsl = function () {
return d3_rgb_hsl(this.r, this.g, this.b);
};
d3_rgbPrototype.toString = function () {
return '#' + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
};
function d3_rgb_hex(v) {
return v < 16 ? '0' + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
}
function d3_rgb_parse(format, rgb, hsl) {
format = format.toLowerCase();
var r = 0, g = 0, b = 0, m1, m2, color;
m1 = /([a-z]+)\((.*)\)/.exec(format);
if (m1) {
m2 = m1[2].split(',');
switch (m1[1]) {
case 'hsl': {
return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
}
case 'rgb': {
return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
}
}
}
if (color = d3_rgb_names.get(format)) {
return rgb(color.r, color.g, color.b);
}
if (format != null && format.charAt(0) === '#' && !isNaN(color = parseInt(format.slice(1), 16))) {
if (format.length === 4) {
r = (color & 3840) >> 4;
r = r >> 4 | r;
g = color & 240;
g = g >> 4 | g;
b = color & 15;
b = b << 4 | b;
} else if (format.length === 7) {
r = (color & 16711680) >> 16;
g = (color & 65280) >> 8;
b = color & 255;
}
}
return rgb(r, g, b);
}
function d3_rgb_hsl(r, g, b) {
var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
if (d) {
s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
if (r == max)
h = (g - b) / d + (g < b ? 6 : 0);
else if (g == max)
h = (b - r) / d + 2;
else
h = (r - g) / d + 4;
h *= 60;
} else {
h = NaN;
s = l > 0 && l < 1 ? 0 : h;
}
return new d3_hsl(h, s, l);
}
function d3_rgb_lab(r, g, b) {
r = d3_rgb_xyz(r);
g = d3_rgb_xyz(g);
b = d3_rgb_xyz(b);
var x = d3_xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / d3_lab_X), y = d3_xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / d3_lab_Y), z = d3_xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / d3_lab_Z);
return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
}
function d3_rgb_xyz(r) {
return (r /= 255) <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
}
function d3_rgb_parseNumber(c) {
var f = parseFloat(c);
return c.charAt(c.length - 1) === '%' ? Math.round(f * 2.55) : f;
}
var d3_rgb_names = d3.map({
aliceblue: 15792383,
antiquewhite: 16444375,
aqua: 65535,
aquamarine: 8388564,
azure: 15794175,
beige: 16119260,
bisque: 16770244,
black: 0,
blanchedalmond: 16772045,
blue: 255,
blueviolet: 9055202,
brown: 10824234,
burlywood: 14596231,
cadetblue: 6266528,
chartreuse: 8388352,
chocolate: 13789470,
coral: 16744272,
cornflowerblue: 6591981,
cornsilk: 16775388,
crimson: 14423100,
cyan: 65535,
darkblue: 139,
darkcyan: 35723,
darkgoldenrod: 12092939,
darkgray: 11119017,
darkgreen: 25600,
darkgrey: 11119017,
darkkhaki: 12433259,
darkmagenta: 9109643,
darkolivegreen: 5597999,
darkorange: 16747520,
darkorchid: 10040012,
darkred: 9109504,
darksalmon: 15308410,
darkseagreen: 9419919,
darkslateblue: 4734347,
darkslategray: 3100495,
darkslategrey: 3100495,
darkturquoise: 52945,
darkviolet: 9699539,
deeppink: 16716947,
deepskyblue: 49151,
dimgray: 6908265,
dimgrey: 6908265,
dodgerblue: 2003199,
firebrick: 11674146,
floralwhite: 16775920,
forestgreen: 2263842,
fuchsia: 16711935,
gainsboro: 14474460,
ghostwhite: 16316671,
gold: 16766720,
goldenrod: 14329120,
gray: 8421504,
green: 32768,
greenyellow: 11403055,
grey: 8421504,
honeydew: 15794160,
hotpink: 16738740,
indianred: 13458524,
indigo: 4915330,
ivory: 16777200,
khaki: 15787660,
lavender: 15132410,
lavenderblush: 16773365,
lawngreen: 8190976,
lemonchiffon: 16775885,
lightblue: 11393254,
lightcoral: 15761536,
lightcyan: 14745599,
lightgoldenrodyellow: 16448210,
lightgray: 13882323,
lightgreen: 9498256,
lightgrey: 13882323,
lightpink: 16758465,
lightsalmon: 16752762,
lightseagreen: 2142890,
lightskyblue: 8900346,
lightslategray: 7833753,
lightslategrey: 7833753,
lightsteelblue: 11584734,
lightyellow: 16777184,
lime: 65280,
limegreen: 3329330,
linen: 16445670,
magenta: 16711935,
maroon: 8388608,
mediumaquamarine: 6737322,
mediumblue: 205,
mediumorchid: 12211667,
mediumpurple: 9662683,
mediumseagreen: 3978097,
mediumslateblue: 8087790,
mediumspringgreen: 64154,
mediumturquoise: 4772300,
mediumvioletred: 13047173,
midnightblue: 1644912,
mintcream: 16121850,
mistyrose: 16770273,
moccasin: 16770229,
navajowhite: 16768685,
navy: 128,
oldlace: 16643558,
olive: 8421376,
olivedrab: 7048739,
orange: 16753920,
orangered: 16729344,
orchid: 14315734,
palegoldenrod: 15657130,
palegreen: 10025880,
paleturquoise: 11529966,
palevioletred: 14381203,
papayawhip: 16773077,
peachpuff: 16767673,
peru: 13468991,
pink: 16761035,
plum: 14524637,
powderblue: 11591910,
purple: 8388736,
rebeccapurple: 6697881,
red: 16711680,
rosybrown: 12357519,
royalblue: 4286945,
saddlebrown: 9127187,
salmon: 16416882,
sandybrown: 16032864,
seagreen: 3050327,
seashell: 16774638,
sienna: 10506797,
silver: 12632256,
skyblue: 8900331,
slateblue: 6970061,
slategray: 7372944,
slategrey: 7372944,
snow: 16775930,
springgreen: 65407,
steelblue: 4620980,
tan: 13808780,
teal: 32896,
thistle: 14204888,
tomato: 16737095,
turquoise: 4251856,
violet: 15631086,
wheat: 16113331,
white: 16777215,
whitesmoke: 16119285,
yellow: 16776960,
yellowgreen: 10145074
});
d3_rgb_names.forEach(function (key, value) {
d3_rgb_names.set(key, d3_rgbNumber(value));
});
function d3_functor(v) {
return typeof v === 'function' ? v : function () {
return v;
};
}
d3.functor = d3_functor;
d3.xhr = d3_xhrType(d3_identity);
function d3_xhrType(response) {
return function (url, mimeType, callback) {
if (arguments.length === 2 && typeof mimeType === 'function')
callback = mimeType, mimeType = null;
return d3_xhr(url, mimeType, response, callback);
};
}
function d3_xhr(url, mimeType, response, callback) {
var xhr = {}, dispatch = d3.dispatch('beforesend', 'progress', 'load', 'error'), headers = {}, request = new XMLHttpRequest(), responseType = null;
if (this.XDomainRequest && !('withCredentials' in request) && /^(http(s)?:)?\/\//.test(url))
request = new XDomainRequest();
'onload' in request ? request.onload = request.onerror = respond : request.onreadystatechange = function () {
request.readyState > 3 && respond();
};
function respond() {
var status = request.status, result;
if (!status && d3_xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
try {
result = response.call(xhr, request);
} catch (e) {
dispatch.error.call(xhr, e);
return;
}
dispatch.load.call(xhr, result);
} else {
dispatch.error.call(xhr, request);
}
}
request.onprogress = function (event) {
var o = d3.event;
d3.event = event;
try {
dispatch.progress.call(xhr, request);
} finally {
d3.event = o;
}
};
xhr.header = function (name, value) {
name = (name + '').toLowerCase();
if (arguments.length < 2)
return headers[name];
if (value == null)
delete headers[name];
else
headers[name] = value + '';
return xhr;
};
xhr.mimeType = function (value) {
if (!arguments.length)
return mimeType;
mimeType = value == null ? null : value + '';
return xhr;
};
xhr.responseType = function (value) {
if (!arguments.length)
return responseType;
responseType = value;
return xhr;
};
xhr.response = function (value) {
response = value;
return xhr;
};
[
'get',
'post'
].forEach(function (method) {
xhr[method] = function () {
return xhr.send.apply(xhr, [method].concat(d3_array(arguments)));
};
});
xhr.send = function (method, data, callback) {
if (arguments.length === 2 && typeof data === 'function')
callback = data, data = null;
request.open(method, url, true);
if (mimeType != null && !('accept' in headers))
headers['accept'] = mimeType + ',*/*';
if (request.setRequestHeader)
for (var name in headers)
request.setRequestHeader(name, headers[name]);
if (mimeType != null && request.overrideMimeType)
request.overrideMimeType(mimeType);
if (responseType != null)
request.responseType = responseType;
if (callback != null)
xhr.on('error', callback).on('load', function (request) {
callback(null, request);
});
dispatch.beforesend.call(xhr, request);
request.send(data == null ? null : data);
return xhr;
};
xhr.abort = function () {
request.abort();
return xhr;
};
d3.rebind(xhr, dispatch, 'on');
return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
}
function d3_xhr_fixCallback(callback) {
return callback.length === 1 ? function (error, request) {
callback(error == null ? request : null);
} : callback;
}
function d3_xhrHasResponse(request) {
var type = request.responseType;
return type && type !== 'text' ? request.response : request.responseText;
}
d3.dsv = function (delimiter, mimeType) {
var reFormat = new RegExp('["' + delimiter + '\n]'), delimiterCode = delimiter.charCodeAt(0);
function dsv(url, row, callback) {
if (arguments.length < 3)
callback = row, row = null;
var xhr = d3_xhr(url, mimeType, row == null ? response : typedResponse(row), callback);
xhr.row = function (_) {
return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
};
return xhr;
}
function response(request) {
return dsv.parse(request.responseText);
}
function typedResponse(f) {
return function (request) {
return dsv.parse(request.responseText, f);
};
}
dsv.parse = function (text, f) {
var o;
return dsv.parseRows(text, function (row, i) {
if (o)
return o(row, i - 1);
var a = new Function('d', 'return {' + row.map(function (name, i) {
return JSON.stringify(name) + ': d[' + i + ']';
}).join(',') + '}');
o = f ? function (row, i) {
return f(a(row), i);
} : a;
});
};
dsv.parseRows = function (text, f) {
var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
function token() {
if (I >= N)
return EOF;
if (eol)
return eol = false, EOL;
var j = I;
if (text.charCodeAt(j) === 34) {
var i = j;
while (i++ < N) {
if (text.charCodeAt(i) === 34) {
if (text.charCodeAt(i + 1) !== 34)
break;
++i;
}
}
I = i + 2;
var c = text.charCodeAt(i + 1);
if (c === 13) {
eol = true;
if (text.charCodeAt(i + 2) === 10)
++I;
} else if (c === 10) {
eol = true;
}
return text.slice(j + 1, i).replace(/""/g, '"');
}
while (I < N) {
var c = text.charCodeAt(I++), k = 1;
if (c === 10)
eol = true;
else if (c === 13) {
eol = true;
if (text.charCodeAt(I) === 10)
++I, ++k;
} else if (c !== delimiterCode)
continue;
return text.slice(j, I - k);
}
return text.slice(j);
}
while ((t = token()) !== EOF) {
var a = [];
while (t !== EOL && t !== EOF) {
a.push(t);
t = token();
}
if (f && (a = f(a, n++)) == null)
continue;
rows.push(a);
}
return rows;
};
dsv.format = function (rows) {
if (Array.isArray(rows[0]))
return dsv.formatRows(rows);
var fieldSet = new d3_Set(), fields = [];
rows.forEach(function (row) {
for (var field in row) {
if (!fieldSet.has(field)) {
fields.push(fieldSet.add(field));
}
}
});
return [fields.map(formatValue).join(delimiter)].concat(rows.map(function (row) {
return fields.map(function (field) {
return formatValue(row[field]);
}).join(delimiter);
})).join('\n');
};
dsv.formatRows = function (rows) {
return rows.map(formatRow).join('\n');
};
function formatRow(row) {
return row.map(formatValue).join(delimiter);
}
function formatValue(text) {
return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
}
return dsv;
};
d3.csv = d3.dsv(',', 'text/csv');
d3.tsv = d3.dsv('\t', 'text/tab-separated-values');
var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_active, d3_timer_frame = this[d3_vendorSymbol(this, 'requestAnimationFrame')] || function (callback) {
setTimeout(callback, 17);
};
d3.timer = function (callback, delay, then) {
var n = arguments.length;
if (n < 2)
delay = 0;
if (n < 3)
then = Date.now();
var time = then + delay, timer = {
c: callback,
t: time,
f: false,
n: null
};
if (d3_timer_queueTail)
d3_timer_queueTail.n = timer;
else
d3_timer_queueHead = timer;
d3_timer_queueTail = timer;
if (!d3_timer_interval) {
d3_timer_timeout = clearTimeout(d3_timer_timeout);
d3_timer_interval = 1;
d3_timer_frame(d3_timer_step);
}
};
function d3_timer_step() {
var now = d3_timer_mark(), delay = d3_timer_sweep() - now;
if (delay > 24) {
if (isFinite(delay)) {
clearTimeout(d3_timer_timeout);
d3_timer_timeout = setTimeout(d3_timer_step, delay);
}
d3_timer_interval = 0;
} else {
d3_timer_interval = 1;
d3_timer_frame(d3_timer_step);
}
}
d3.timer.flush = function () {
d3_timer_mark();
d3_timer_sweep();
};
function d3_timer_mark() {
var now = Date.now();
d3_timer_active = d3_timer_queueHead;
while (d3_timer_active) {
if (now >= d3_timer_active.t)
d3_timer_active.f = d3_timer_active.c(now - d3_timer_active.t);
d3_timer_active = d3_timer_active.n;
}
return now;
}
function d3_timer_sweep() {
var t0, t1 = d3_timer_queueHead, time = Infinity;
while (t1) {
if (t1.f) {
t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
} else {
if (t1.t < time)
time = t1.t;
t1 = (t0 = t1).n;
}
}
d3_timer_queueTail = t0;
return time;
}
function d3_format_precision(x, p) {
return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
}
d3.round = function (x, n) {
return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
};
var d3_formatPrefixes = [
'y',
'z',
'a',
'f',
'p',
'n',
'µ',
'm',
'',
'k',
'M',
'G',
'T',
'P',
'E',
'Z',
'Y'
].map(d3_formatPrefix);
d3.formatPrefix = function (value, precision) {
var i = 0;
if (value) {
if (value < 0)
value *= -1;
if (precision)
value = d3.round(value, d3_format_precision(value, precision));
i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
}
return d3_formatPrefixes[8 + i / 3];
};
function d3_formatPrefix(d, i) {
var k = Math.pow(10, abs(8 - i) * 3);
return {
scale: i > 8 ? function (d) {
return d / k;
} : function (d) {
return d * k;
},
symbol: d
};
}
function d3_locale_numberFormat(locale) {
var locale_decimal = locale.decimal, locale_thousands = locale.thousands, locale_grouping = locale.grouping, locale_currency = locale.currency, formatGroup = locale_grouping && locale_thousands ? function (value, width) {
var i = value.length, t = [], j = 0, g = locale_grouping[0], length = 0;
while (i > 0 && g > 0) {
if (length + g + 1 > width)
g = Math.max(1, width - length);
t.push(value.substring(i -= g, i + g));
if ((length += g + 1) > width)
break;
g = locale_grouping[j = (j + 1) % locale_grouping.length];
}
return t.reverse().join(locale_thousands);
} : d3_identity;
return function (specifier) {
var match = d3_format_re.exec(specifier), fill = match[1] || ' ', align = match[2] || '>', sign = match[3] || '-', symbol = match[4] || '', zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, prefix = '', suffix = '', integer = false, exponent = true;
if (precision)
precision = +precision.substring(1);
if (zfill || fill === '0' && align === '=') {
zfill = fill = '0';
align = '=';
}
switch (type) {
case 'n':
comma = true;
type = 'g';
break;
case '%':
scale = 100;
suffix = '%';
type = 'f';
break;
case 'p':
scale = 100;
suffix = '%';
type = 'r';
break;
case 'b':
case 'o':
case 'x':
case 'X':
if (symbol === '#')
prefix = '0' + type.toLowerCase();
case 'c':
exponent = false;
case 'd':
integer = true;
precision = 0;
break;
case 's':
scale = -1;
type = 'r';
break;
}
if (symbol === '$')
prefix = locale_currency[0], suffix = locale_currency[1];
if (type == 'r' && !precision)
type = 'g';
if (precision != null) {
if (type == 'g')
precision = Math.max(1, Math.min(21, precision));
else if (type == 'e' || type == 'f')
precision = Math.max(0, Math.min(20, precision));
}
type = d3_format_types.get(type) || d3_format_typeDefault;
var zcomma = zfill && comma;
return function (value) {
var fullSuffix = suffix;
if (integer && value % 1)
return '';
var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, '-') : sign === '-' ? '' : sign;
if (scale < 0) {
var unit = d3.formatPrefix(value, precision);
value = unit.scale(value);
fullSuffix = unit.symbol + suffix;
} else {
value *= scale;
}
value = type(value, precision);
var i = value.lastIndexOf('.'), before, after;
if (i < 0) {
var j = exponent ? value.lastIndexOf('e') : -1;
if (j < 0)
before = value, after = '';
else
before = value.substring(0, j), after = value.substring(j);
} else {
before = value.substring(0, i);
after = locale_decimal + value.substring(i + 1);
}
if (!zfill && comma)
before = formatGroup(before, Infinity);
var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : '';
if (zcomma)
before = formatGroup(padding + before, padding.length ? width - after.length : Infinity);
negative += prefix;
value = before + after;
return (align === '<' ? negative + value + padding : align === '>' ? padding + negative + value : align === '^' ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix;
};
};
}
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
var d3_format_types = d3.map({
b: function (x) {
return x.toString(2);
},
c: function (x) {
return String.fromCharCode(x);
},
o: function (x) {
return x.toString(8);
},
x: function (x) {
return x.toString(16);
},
X: function (x) {
return x.toString(16).toUpperCase();
},
g: function (x, p) {
return x.toPrecision(p);
},
e: function (x, p) {
return x.toExponential(p);
},
f: function (x, p) {
return x.toFixed(p);
},
r: function (x, p) {
return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
}
});
function d3_format_typeDefault(x) {
return x + '';
}
var d3_time = d3.time = {}, d3_date = Date;
function d3_date_utc() {
this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
}
d3_date_utc.prototype = {
getDate: function () {
return this._.getUTCDate();
},
getDay: function () {
return this._.getUTCDay();
},
getFullYear: function () {
return this._.getUTCFullYear();
},
getHours: function () {
return this._.getUTCHours();
},
getMilliseconds: function () {
return this._.getUTCMilliseconds();
},
getMinutes: function () {
return this._.getUTCMinutes();
},
getMonth: function () {
return this._.getUTCMonth();
},
getSeconds: function () {
return this._.getUTCSeconds();
},
getTime: function () {
return this._.getTime();
},
getTimezoneOffset: function () {
return 0;
},
valueOf: function () {
return this._.valueOf();
},
setDate: function () {
d3_time_prototype.setUTCDate.apply(this._, arguments);
},
setDay: function () {
d3_time_prototype.setUTCDay.apply(this._, arguments);
},
setFullYear: function () {
d3_time_prototype.setUTCFullYear.apply(this._, arguments);
},
setHours: function () {
d3_time_prototype.setUTCHours.apply(this._, arguments);
},
setMilliseconds: function () {
d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
},
setMinutes: function () {
d3_time_prototype.setUTCMinutes.apply(this._, arguments);
},
setMonth: function () {
d3_time_prototype.setUTCMonth.apply(this._, arguments);
},
setSeconds: function () {
d3_time_prototype.setUTCSeconds.apply(this._, arguments);
},
setTime: function () {
d3_time_prototype.setTime.apply(this._, arguments);
}
};
var d3_time_prototype = Date.prototype;
function d3_time_interval(local, step, number) {
function round(date) {
var d0 = local(date), d1 = offset(d0, 1);
return date - d0 < d1 - date ? d0 : d1;
}
function ceil(date) {
step(date = local(new d3_date(date - 1)), 1);
return date;
}
function offset(date, k) {
step(date = new d3_date(+date), k);
return date;
}
function range(t0, t1, dt) {
var time = ceil(t0), times = [];
if (dt > 1) {
while (time < t1) {
if (!(number(time) % dt))
times.push(new Date(+time));
step(time, 1);
}
} else {
while (time < t1)
times.push(new Date(+time)), step(time, 1);
}
return times;
}
function range_utc(t0, t1, dt) {
try {
d3_date = d3_date_utc;
var utc = new d3_date_utc();
utc._ = t0;
return range(utc, t1, dt);
} finally {
d3_date = Date;
}
}
local.floor = local;
local.round = round;
local.ceil = ceil;
local.offset = offset;
local.range = range;
var utc = local.utc = d3_time_interval_utc(local);
utc.floor = utc;
utc.round = d3_time_interval_utc(round);
utc.ceil = d3_time_interval_utc(ceil);
utc.offset = d3_time_interval_utc(offset);
utc.range = range_utc;
return local;
}
function d3_time_interval_utc(method) {
return function (date, k) {
try {
d3_date = d3_date_utc;
var utc = new d3_date_utc();
utc._ = date;
return method(utc, k)._;
} finally {
d3_date = Date;
}
};
}
d3_time.year = d3_time_interval(function (date) {
date = d3_time.day(date);
date.setMonth(0, 1);
return date;
}, function (date, offset) {
date.setFullYear(date.getFullYear() + offset);
}, function (date) {
return date.getFullYear();
});
d3_time.years = d3_time.year.range;
d3_time.years.utc = d3_time.year.utc.range;
d3_time.day = d3_time_interval(function (date) {
var day = new d3_date(2000, 0);
day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
return day;
}, function (date, offset) {
date.setDate(date.getDate() + offset);
}, function (date) {
return date.getDate() - 1;
});
d3_time.days = d3_time.day.range;
d3_time.days.utc = d3_time.day.utc.range;
d3_time.dayOfYear = function (date) {
var year = d3_time.year(date);
return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 60000) / 86400000);
};
[
'sunday',
'monday',
'tuesday',
'wednesday',
'thursday',
'friday',
'saturday'
].forEach(function (day, i) {
i = 7 - i;
var interval = d3_time[day] = d3_time_interval(function (date) {
(date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
return date;
}, function (date, offset) {
date.setDate(date.getDate() + Math.floor(offset) * 7);
}, function (date) {
var day = d3_time.year(date).getDay();
return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
});
d3_time[day + 's'] = interval.range;
d3_time[day + 's'].utc = interval.utc.range;
d3_time[day + 'OfYear'] = function (date) {
var day = d3_time.year(date).getDay();
return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7);
};
});
d3_time.week = d3_time.sunday;
d3_time.weeks = d3_time.sunday.range;
d3_time.weeks.utc = d3_time.sunday.utc.range;
d3_time.weekOfYear = d3_time.sundayOfYear;
function d3_locale_timeFormat(locale) {
var locale_dateTime = locale.dateTime, locale_date = locale.date, locale_time = locale.time, locale_periods = locale.periods, locale_days = locale.days, locale_shortDays = locale.shortDays, locale_months = locale.months, locale_shortMonths = locale.shortMonths;
function d3_time_format(template) {
var n = template.length;
function format(date) {
var string = [], i = -1, j = 0, c, p, f;
while (++i < n) {
if (template.charCodeAt(i) === 37) {
string.push(template.slice(j, i));
if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null)
c = template.charAt(++i);
if (f = d3_time_formats[c])
c = f(date, p == null ? c === 'e' ? ' ' : '0' : p);
string.push(c);
j = i + 1;
}
}
string.push(template.slice(j, i));
return string.join('');
}
format.parse = function (string) {
var d = {
y: 1900,
m: 0,
d: 1,
H: 0,
M: 0,
S: 0,
L: 0,
Z: null
}, i = d3_time_parse(d, template, string, 0);
if (i != string.length)
return null;
if ('p' in d)
d.H = d.H % 12 + d.p * 12;
var localZ = d.Z != null && d3_date !== d3_date_utc, date = new (localZ ? d3_date_utc : d3_date)();
if ('j' in d)
date.setFullYear(d.y, 0, d.j);
else if ('w' in d && ('W' in d || 'U' in d)) {
date.setFullYear(d.y, 0, 1);
date.setFullYear(d.y, 0, 'W' in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
} else
date.setFullYear(d.y, d.m, d.d);
date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
return localZ ? date._ : date;
};
format.toString = function () {
return template;
};
return format;
}
function d3_time_parse(date, template, string, j) {
var c, p, t, i = 0, n = template.length, m = string.length;
while (i < n) {
if (j >= m)
return -1;
c = template.charCodeAt(i++);
if (c === 37) {
t = template.charAt(i++);
p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t];
if (!p || (j = p(date, string, j)) < 0)
return -1;
} else if (c != string.charCodeAt(j++)) {
return -1;
}
}
return j;
}
d3_time_format.utc = function (template) {
var local = d3_time_format(template);
function format(date) {
try {
d3_date = d3_date_utc;
var utc = new d3_date();
utc._ = date;
return local(utc);
} finally {
d3_date = Date;
}
}
format.parse = function (string) {
try {
d3_date = d3_date_utc;
var date = local.parse(string);
return date && date._;
} finally {
d3_date = Date;
}
};
format.toString = local.toString;
return format;
};
d3_time_format.multi = d3_time_format.utc.multi = d3_time_formatMulti;
var d3_time_periodLookup = d3.map(), d3_time_dayRe = d3_time_formatRe(locale_days), d3_time_dayLookup = d3_time_formatLookup(locale_days), d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays), d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays), d3_time_monthRe = d3_time_formatRe(locale_months), d3_time_monthLookup = d3_time_formatLookup(locale_months), d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths), d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
locale_periods.forEach(function (p, i) {
d3_time_periodLookup.set(p.toLowerCase(), i);
});
var d3_time_formats = {
a: function (d) {
return locale_shortDays[d.getDay()];
},
A: function (d) {
return locale_days[d.getDay()];
},
b: function (d) {
return locale_shortMonths[d.getMonth()];
},
B: function (d) {
return locale_months[d.getMonth()];
},
c: d3_time_format(locale_dateTime),
d: function (d, p) {
return d3_time_formatPad(d.getDate(), p, 2);
},
e: function (d, p) {
return d3_time_formatPad(d.getDate(), p, 2);
},
H: function (d, p) {
return d3_time_formatPad(d.getHours(), p, 2);
},
I: function (d, p) {
return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
},
j: function (d, p) {
return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3);
},
L: function (d, p) {
return d3_time_formatPad(d.getMilliseconds(), p, 3);
},
m: function (d, p) {
return d3_time_formatPad(d.getMonth() + 1, p, 2);
},
M: function (d, p) {
return d3_time_formatPad(d.getMinutes(), p, 2);
},
p: function (d) {
return locale_periods[+(d.getHours() >= 12)];
},
S: function (d, p) {
return d3_time_formatPad(d.getSeconds(), p, 2);
},
U: function (d, p) {
return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2);
},
w: function (d) {
return d.getDay();
},
W: function (d, p) {
return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2);
},
x: d3_time_format(locale_date),
X: d3_time_format(locale_time),
y: function (d, p) {
return d3_time_formatPad(d.getFullYear() % 100, p, 2);
},
Y: function (d, p) {
return d3_time_formatPad(d.getFullYear() % 10000, p, 4);
},
Z: d3_time_zone,
'%': function () {
return '%';
}
};
var d3_time_parsers = {
a: d3_time_parseWeekdayAbbrev,
A: d3_time_parseWeekday,
b: d3_time_parseMonthAbbrev,
B: d3_time_parseMonth,
c: d3_time_parseLocaleFull,
d: d3_time_parseDay,
e: d3_time_parseDay,
H: d3_time_parseHour24,
I: d3_time_parseHour24,
j: d3_time_parseDayOfYear,
L: d3_time_parseMilliseconds,
m: d3_time_parseMonthNumber,
M: d3_time_parseMinutes,
p: d3_time_parseAmPm,
S: d3_time_parseSeconds,
U: d3_time_parseWeekNumberSunday,
w: d3_time_parseWeekdayNumber,
W: d3_time_parseWeekNumberMonday,
x: d3_time_parseLocaleDate,
X: d3_time_parseLocaleTime,
y: d3_time_parseYear,
Y: d3_time_parseFullYear,
Z: d3_time_parseZone,
'%': d3_time_parseLiteralPercent
};
function d3_time_parseWeekdayAbbrev(date, string, i) {
d3_time_dayAbbrevRe.lastIndex = 0;
var n = d3_time_dayAbbrevRe.exec(string.slice(i));
return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
}
function d3_time_parseWeekday(date, string, i) {
d3_time_dayRe.lastIndex = 0;
var n = d3_time_dayRe.exec(string.slice(i));
return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
}
function d3_time_parseMonthAbbrev(date, string, i) {
d3_time_monthAbbrevRe.lastIndex = 0;
var n = d3_time_monthAbbrevRe.exec(string.slice(i));
return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
}
function d3_time_parseMonth(date, string, i) {
d3_time_monthRe.lastIndex = 0;
var n = d3_time_monthRe.exec(string.slice(i));
return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
}
function d3_time_parseLocaleFull(date, string, i) {
return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
}
function d3_time_parseLocaleDate(date, string, i) {
return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
}
function d3_time_parseLocaleTime(date, string, i) {
return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
}
function d3_time_parseAmPm(date, string, i) {
var n = d3_time_periodLookup.get(string.slice(i, i += 2).toLowerCase());
return n == null ? -1 : (date.p = n, i);
}
return d3_time_format;
}
var d3_time_formatPads = {
'-': '',
_: ' ',
'0': '0'
}, d3_time_numberRe = /^\s*\d+/, d3_time_percentRe = /^%/;
function d3_time_formatPad(value, fill, width) {
var sign = value < 0 ? '-' : '', string = (sign ? -value : value) + '', length = string.length;
return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function d3_time_formatRe(names) {
return new RegExp('^(?:' + names.map(d3.requote).join('|') + ')', 'i');
}
function d3_time_formatLookup(names) {
var map = new d3_Map(), i = -1, n = names.length;
while (++i < n)
map.set(names[i].toLowerCase(), i);
return map;
}
function d3_time_parseWeekdayNumber(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 1));
return n ? (date.w = +n[0], i + n[0].length) : -1;
}
function d3_time_parseWeekNumberSunday(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i));
return n ? (date.U = +n[0], i + n[0].length) : -1;
}
function d3_time_parseWeekNumberMonday(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i));
return n ? (date.W = +n[0], i + n[0].length) : -1;
}
function d3_time_parseFullYear(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 4));
return n ? (date.y = +n[0], i + n[0].length) : -1;
}
function d3_time_parseYear(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 2));
return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
}
function d3_time_parseZone(date, string, i) {
return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, i + 5) : -1;
}
function d3_time_expandYear(d) {
return d + (d > 68 ? 1900 : 2000);
}
function d3_time_parseMonthNumber(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 2));
return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
}
function d3_time_parseDay(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 2));
return n ? (date.d = +n[0], i + n[0].length) : -1;
}
function d3_time_parseDayOfYear(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 3));
return n ? (date.j = +n[0], i + n[0].length) : -1;
}
function d3_time_parseHour24(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 2));
return n ? (date.H = +n[0], i + n[0].length) : -1;
}
function d3_time_parseMinutes(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 2));
return n ? (date.M = +n[0], i + n[0].length) : -1;
}
function d3_time_parseSeconds(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 2));
return n ? (date.S = +n[0], i + n[0].length) : -1;
}
function d3_time_parseMilliseconds(date, string, i) {
d3_time_numberRe.lastIndex = 0;
var n = d3_time_numberRe.exec(string.slice(i, i + 3));
return n ? (date.L = +n[0], i + n[0].length) : -1;
}
function d3_time_zone(d) {
var z = d.getTimezoneOffset(), zs = z > 0 ? '-' : '+', zh = abs(z) / 60 | 0, zm = abs(z) % 60;
return zs + d3_time_formatPad(zh, '0', 2) + d3_time_formatPad(zm, '0', 2);
}
function d3_time_parseLiteralPercent(date, string, i) {
d3_time_percentRe.lastIndex = 0;
var n = d3_time_percentRe.exec(string.slice(i, i + 1));
return n ? i + n[0].length : -1;
}
function d3_time_formatMulti(formats) {
var n = formats.length, i = -1;
while (++i < n)
formats[i][0] = this(formats[i][0]);
return function (date) {
var i = 0, f = formats[i];
while (!f[1](date))
f = formats[++i];
return f[0](date);
};
}
d3.locale = function (locale) {
return {
numberFormat: d3_locale_numberFormat(locale),
timeFormat: d3_locale_timeFormat(locale)
};
};
var d3_locale_enUS = d3.locale({
decimal: '.',
thousands: ',',
grouping: [3],
currency: [
'$',
''
],
dateTime: '%a %b %e %X %Y',
date: '%m/%d/%Y',
time: '%H:%M:%S',
periods: [
'AM',
'PM'
],
days: [
'Sunday',
'Monday',
'Tuesday',
'Wednesday',
'Thursday',
'Friday',
'Saturday'
],
shortDays: [
'Sun',
'Mon',
'Tue',
'Wed',
'Thu',
'Fri',
'Sat'
],
months: [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'
],
shortMonths: [
'Jan',
'Feb',
'Mar',
'Apr',
'May',
'Jun',
'Jul',
'Aug',
'Sep',
'Oct',
'Nov',
'Dec'
]
});
d3.format = d3_locale_enUS.numberFormat;
d3.geo = {};
function d3_adder() {
}
d3_adder.prototype = {
s: 0,
t: 0,
add: function (y) {
d3_adderSum(y, this.t, d3_adderTemp);
d3_adderSum(d3_adderTemp.s, this.s, this);
if (this.s)
this.t += d3_adderTemp.t;
else
this.s = d3_adderTemp.t;
},
reset: function () {
this.s = this.t = 0;
},
valueOf: function () {
return this.s;
}
};
var d3_adderTemp = new d3_adder();
function d3_adderSum(a, b, o) {
var x = o.s = a + b, bv = x - a, av = x - bv;
o.t = a - av + (b - bv);
}
d3.geo.stream = function (object, listener) {
if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
d3_geo_streamObjectType[object.type](object, listener);
} else {
d3_geo_streamGeometry(object, listener);
}
};
function d3_geo_streamGeometry(geometry, listener) {
if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
d3_geo_streamGeometryType[geometry.type](geometry, listener);
}
}
var d3_geo_streamObjectType = {
Feature: function (feature, listener) {
d3_geo_streamGeometry(feature.geometry, listener);
},
FeatureCollection: function (object, listener) {
var features = object.features, i = -1, n = features.length;
while (++i < n)
d3_geo_streamGeometry(features[i].geometry, listener);
}
};
var d3_geo_streamGeometryType = {
Sphere: function (object, listener) {
listener.sphere();
},
Point: function (object, listener) {
object = object.coordinates;
listener.point(object[0], object[1], object[2]);
},
MultiPoint: function (object, listener) {
var coordinates = object.coordinates, i = -1, n = coordinates.length;
while (++i < n)
object = coordinates[i], listener.point(object[0], object[1], object[2]);
},
LineString: function (object, listener) {
d3_geo_streamLine(object.coordinates, listener, 0);
},
MultiLineString: function (object, listener) {
var coordinates = object.coordinates, i = -1, n = coordinates.length;
while (++i < n)
d3_geo_streamLine(coordinates[i], listener, 0);
},
Polygon: function (object, listener) {
d3_geo_streamPolygon(object.coordinates, listener);
},
MultiPolygon: function (object, listener) {
var coordinates = object.coordinates, i = -1, n = coordinates.length;
while (++i < n)
d3_geo_streamPolygon(coordinates[i], listener);
},
GeometryCollection: function (object, listener) {
var geometries = object.geometries, i = -1, n = geometries.length;
while (++i < n)
d3_geo_streamGeometry(geometries[i], listener);
}
};
function d3_geo_streamLine(coordinates, listener, closed) {
var i = -1, n = coordinates.length - closed, coordinate;
listener.lineStart();
while (++i < n)
coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
listener.lineEnd();
}
function d3_geo_streamPolygon(coordinates, listener) {
var i = -1, n = coordinates.length;
listener.polygonStart();
while (++i < n)
d3_geo_streamLine(coordinates[i], listener, 1);
listener.polygonEnd();
}
d3.geo.area = function (object) {
d3_geo_areaSum = 0;
d3.geo.stream(object, d3_geo_area);
return d3_geo_areaSum;
};
var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder();
var d3_geo_area = {
sphere: function () {
d3_geo_areaSum += 4 * π;
},
point: d3_noop,
lineStart: d3_noop,
lineEnd: d3_noop,
polygonStart: function () {
d3_geo_areaRingSum.reset();
d3_geo_area.lineStart = d3_geo_areaRingStart;
},
polygonEnd: function () {
var area = 2 * d3_geo_areaRingSum;
d3_geo_areaSum += area < 0 ? 4 * π + area : area;
d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
}
};
function d3_geo_areaRingStart() {
var λ00, φ00, λ0, cosφ0, sinφ0;
d3_geo_area.point = function (λ, φ) {
d3_geo_area.point = nextPoint;
λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), sinφ0 = Math.sin(φ);
};
function nextPoint(λ, φ) {
λ *= d3_radians;
φ = φ * d3_radians / 2 + π / 4;
var dλ = λ - λ0, sdλ = dλ >= 0 ? 1 : -1, adλ = sdλ * dλ, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u = cosφ0 * cosφ + k * Math.cos(adλ), v = k * sdλ * Math.sin(adλ);
d3_geo_areaRingSum.add(Math.atan2(v, u));
λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
}
d3_geo_area.lineEnd = function () {
nextPoint(λ00, φ00);
};
}
function d3_geo_cartesian(spherical) {
var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
return [
cosφ * Math.cos(λ),
cosφ * Math.sin(λ),
Math.sin(φ)
];
}
function d3_geo_cartesianDot(a, b) {
return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function d3_geo_cartesianCross(a, b) {
return [
a[1] * b[2] - a[2] * b[1],
a[2] * b[0] - a[0] * b[2],
a[0] * b[1] - a[1] * b[0]
];
}
function d3_geo_cartesianAdd(a, b) {
a[0] += b[0];
a[1] += b[1];
a[2] += b[2];
}
function d3_geo_cartesianScale(vector, k) {
return [
vector[0] * k,
vector[1] * k,
vector[2] * k
];
}
function d3_geo_cartesianNormalize(d) {
var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
d[0] /= l;
d[1] /= l;
d[2] /= l;
}
function d3_geo_spherical(cartesian) {
return [
Math.atan2(cartesian[1], cartesian[0]),
d3_asin(cartesian[2])
];
}
function d3_geo_sphericalEqual(a, b) {
return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε;
}
d3.geo.bounds = function () {
var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range;
var bound = {
point: point,
lineStart: lineStart,
lineEnd: lineEnd,
polygonStart: function () {
bound.point = ringPoint;
bound.lineStart = ringStart;
bound.lineEnd = ringEnd;
dλSum = 0;
d3_geo_area.polygonStart();
},
polygonEnd: function () {
d3_geo_area.polygonEnd();
bound.point = point;
bound.lineStart = lineStart;
bound.lineEnd = lineEnd;
if (d3_geo_areaRingSum < 0)
λ0 = -(λ1 = 180), φ0 = -(φ1 = 90);
else if (dλSum > ε)
φ1 = 90;
else if (dλSum < -ε)
φ0 = -90;
range[0] = λ0, range[1] = λ1;
}
};
function point(λ, φ) {
ranges.push(range = [
λ0 = λ,
λ1 = λ
]);
if (φ < φ0)
φ0 = φ;
if (φ > φ1)
φ1 = φ;
}
function linePoint(λ, φ) {
var p = d3_geo_cartesian([
λ * d3_radians,
φ * d3_radians
]);
if (p0) {
var normal = d3_geo_cartesianCross(p0, p), equatorial = [
normal[1],
-normal[0],
0
], inflection = d3_geo_cartesianCross(equatorial, normal);
d3_geo_cartesianNormalize(inflection);
inflection = d3_geo_spherical(inflection);
var dλ = λ - λ_, s = dλ > 0 ? 1 : -1, λi = inflection[0] * d3_degrees * s, antimeridian = abs(dλ) > 180;
if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
var φi = inflection[1] * d3_degrees;
if (φi > φ1)
φ1 = φi;
} else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
var φi = -inflection[1] * d3_degrees;
if (φi < φ0)
φ0 = φi;
} else {
if (φ < φ0)
φ0 = φ;
if (φ > φ1)
φ1 = φ;
}
if (antimeridian) {
if (λ < λ_) {
if (angle(λ0, λ) > angle(λ0, λ1))
λ1 = λ;
} else {
if (angle(λ, λ1) > angle(λ0, λ1))
λ0 = λ;
}
} else {
if (λ1 >= λ0) {
if (λ < λ0)
λ0 = λ;
if (λ > λ1)
λ1 = λ;
} else {
if (λ > λ_) {
if (angle(λ0, λ) > angle(λ0, λ1))
λ1 = λ;
} else {
if (angle(λ, λ1) > angle(λ0, λ1))
λ0 = λ;
}
}
}
} else {
point(λ, φ);
}
p0 = p, λ_ = λ;
}
function lineStart() {
bound.point = linePoint;
}
function lineEnd() {
range[0] = λ0, range[1] = λ1;
bound.point = point;
p0 = null;
}
function ringPoint(λ, φ) {
if (p0) {
var dλ = λ - λ_;
dλSum += abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ;
} else
λ__ = λ, φ__ = φ;
d3_geo_area.point(λ, φ);
linePoint(λ, φ);
}
function ringStart() {
d3_geo_area.lineStart();
}
function ringEnd() {
ringPoint(λ__, φ__);
d3_geo_area.lineEnd();
if (abs(dλSum) > ε)
λ0 = -(λ1 = 180);
range[0] = λ0, range[1] = λ1;
p0 = null;
}
function angle(λ0, λ1) {
return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1;
}
function compareRanges(a, b) {
return a[0] - b[0];
}
function withinRange(x, range) {
return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}
return function (feature) {
φ1 = λ1 = -(λ0 = φ0 = Infinity);
ranges = [];
d3.geo.stream(feature, bound);
var n = ranges.length;
if (n) {
ranges.sort(compareRanges);
for (var i = 1, a = ranges[0], b, merged = [a]; i < n; ++i) {
b = ranges[i];
if (withinRange(b[0], a) || withinRange(b[1], a)) {
if (angle(a[0], b[1]) > angle(a[0], a[1]))
a[1] = b[1];
if (angle(b[0], a[1]) > angle(a[0], a[1]))
a[0] = b[0];
} else {
merged.push(a = b);
}
}
var best = -Infinity, dλ;
for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
b = merged[i];
if ((dλ = angle(a[1], b[0])) > best)
best = dλ, λ0 = b[0], λ1 = a[1];
}
}
ranges = range = null;
return λ0 === Infinity || φ0 === Infinity ? [
[
NaN,
NaN
],
[
NaN,
NaN
]
] : [
[
λ0,
φ0
],
[
λ1,
φ1
]
];
};
}();
d3.geo.centroid = function (object) {
d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
d3.geo.stream(object, d3_geo_centroid);
var x = d3_geo_centroidX2, y = d3_geo_centroidY2, z = d3_geo_centroidZ2, m = x * x + y * y + z * z;
if (m < ε2) {
x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
if (d3_geo_centroidW1 < ε)
x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
m = x * x + y * y + z * z;
if (m < ε2)
return [
NaN,
NaN
];
}
return [
Math.atan2(y, x) * d3_degrees,
d3_asin(z / Math.sqrt(m)) * d3_degrees
];
};
var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
var d3_geo_centroid = {
sphere: d3_noop,
point: d3_geo_centroidPoint,
lineStart: d3_geo_centroidLineStart,
lineEnd: d3_geo_centroidLineEnd,
polygonStart: function () {
d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
},
polygonEnd: function () {
d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
}
};
function d3_geo_centroidPoint(λ, φ) {
λ *= d3_radians;
var cosφ = Math.cos(φ *= d3_radians);
d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ));
}
function d3_geo_centroidPointXYZ(x, y, z) {
++d3_geo_centroidW0;
d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
}
function d3_geo_centroidLineStart() {
var x0, y0, z0;
d3_geo_centroid.point = function (λ, φ) {
λ *= d3_radians;
var cosφ = Math.cos(φ *= d3_radians);
x0 = cosφ * Math.cos(λ);
y0 = cosφ * Math.sin(λ);
z0 = Math.sin(φ);
d3_geo_centroid.point = nextPoint;
d3_geo_centroidPointXYZ(x0, y0, z0);
};
function nextPoint(λ, φ) {
λ *= d3_radians;
var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
d3_geo_centroidW1 += w;
d3_geo_centroidX1 += w * (x0 + (x0 = x));
d3_geo_centroidY1 += w * (y0 + (y0 = y));
d3_geo_centroidZ1 += w * (z0 + (z0 = z));
d3_geo_centroidPointXYZ(x0, y0, z0);
}
}
function d3_geo_centroidLineEnd() {
d3_geo_centroid.point = d3_geo_centroidPoint;
}
function d3_geo_centroidRingStart() {
var λ00, φ00, x0, y0, z0;
d3_geo_centroid.point = function (λ, φ) {
λ00 = λ, φ00 = φ;
d3_geo_centroid.point = nextPoint;
λ *= d3_radians;
var cosφ = Math.cos(φ *= d3_radians);
x0 = cosφ * Math.cos(λ);
y0 = cosφ * Math.sin(λ);
z0 = Math.sin(φ);
d3_geo_centroidPointXYZ(x0, y0, z0);
};
d3_geo_centroid.lineEnd = function () {
nextPoint(λ00, φ00);
d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
d3_geo_centroid.point = d3_geo_centroidPoint;
};
function nextPoint(λ, φ) {
λ *= d3_radians;
var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = Math.sqrt(cx * cx + cy * cy + cz * cz), u = x0 * x + y0 * y + z0 * z, v = m && -d3_acos(u) / m, w = Math.atan2(m, u);
d3_geo_centroidX2 += v * cx;
d3_geo_centroidY2 += v * cy;
d3_geo_centroidZ2 += v * cz;
d3_geo_centroidW1 += w;
d3_geo_centroidX1 += w * (x0 + (x0 = x));
d3_geo_centroidY1 += w * (y0 + (y0 = y));
d3_geo_centroidZ1 += w * (z0 + (z0 = z));
d3_geo_centroidPointXYZ(x0, y0, z0);
}
}
function d3_geo_compose(a, b) {
function compose(x, y) {
return x = a(x, y), b(x[0], x[1]);
}
if (a.invert && b.invert)
compose.invert = function (x, y) {
return x = b.invert(x, y), x && a.invert(x[0], x[1]);
};
return compose;
}
function d3_true() {
return true;
}
function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
var subject = [], clip = [];
segments.forEach(function (segment) {
if ((n = segment.length - 1) <= 0)
return;
var n, p0 = segment[0], p1 = segment[n];
if (d3_geo_sphericalEqual(p0, p1)) {
listener.lineStart();
for (var i = 0; i < n; ++i)
listener.point((p0 = segment[i])[0], p0[1]);
listener.lineEnd();
return;
}
var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true), b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
a.o = b;
subject.push(a);
clip.push(b);
a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
a.o = b;
subject.push(a);
clip.push(b);
});
clip.sort(compare);
d3_geo_clipPolygonLinkCircular(subject);
d3_geo_clipPolygonLinkCircular(clip);
if (!subject.length)
return;
for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) {
clip[i].e = entry = !entry;
}
var start = subject[0], points, point;
while (1) {
var current = start, isSubject = true;
while (current.v)
if ((current = current.n) === start)
return;
points = current.z;
listener.lineStart();
do {
current.v = current.o.v = true;
if (current.e) {
if (isSubject) {
for (var i = 0, n = points.length; i < n; ++i)
listener.point((point = points[i])[0], point[1]);
} else {
interpolate(current.x, current.n.x, 1, listener);
}
current = current.n;
} else {
if (isSubject) {
points = current.p.z;
for (var i = points.length - 1; i >= 0; --i)
listener.point((point = points[i])[0], point[1]);
} else {
interpolate(current.x, current.p.x, -1, listener);
}
current = current.p;
}
current = current.o;
points = current.z;
isSubject = !isSubject;
} while (!current.v);
listener.lineEnd();
}
}
function d3_geo_clipPolygonLinkCircular(array) {
if (!(n = array.length))
return;
var n, i = 0, a = array[0], b;
while (++i < n) {
a.n = b = array[i];
b.p = a;
a = b;
}
a.n = b = array[0];
b.p = a;
}
function d3_geo_clipPolygonIntersection(point, points, other, entry) {
this.x = point;
this.z = points;
this.o = other;
this.e = entry;
this.v = false;
this.n = this.p = null;
}
function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
return function (rotate, listener) {
var line = clipLine(listener), rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]);
var clip = {
point: point,
lineStart: lineStart,
lineEnd: lineEnd,
polygonStart: function () {
clip.point = pointRing;
clip.lineStart = ringStart;
clip.lineEnd = ringEnd;
segments = [];
polygon = [];
},
polygonEnd: function () {
clip.point = point;
clip.lineStart = lineStart;
clip.lineEnd = lineEnd;
segments = d3.merge(segments);
var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
if (segments.length) {
if (!polygonStarted)
listener.polygonStart(), polygonStarted = true;
d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener);
} else if (clipStartInside) {
if (!polygonStarted)
listener.polygonStart(), polygonStarted = true;
listener.lineStart();
interpolate(null, null, 1, listener);
listener.lineEnd();
}
if (polygonStarted)
listener.polygonEnd(), polygonStarted = false;
segments = polygon = null;
},
sphere: function () {
listener.polygonStart();
listener.lineStart();
interpolate(null, null, 1, listener);
listener.lineEnd();
listener.polygonEnd();
}
};
function point(λ, φ) {
var point = rotate(λ, φ);
if (pointVisible(λ = point[0], φ = point[1]))
listener.point(λ, φ);
}
function pointLine(λ, φ) {
var point = rotate(λ, φ);
line.point(point[0], point[1]);
}
function lineStart() {
clip.point = pointLine;
line.lineStart();
}
function lineEnd() {
clip.point = point;
line.lineEnd();
}
var segments;
var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), polygonStarted = false, polygon, ring;
function pointRing(λ, φ) {
ring.push([
λ,
φ
]);
var point = rotate(λ, φ);
ringListener.point(point[0], point[1]);
}
function ringStart() {
ringListener.lineStart();
ring = [];
}
function ringEnd() {
pointRing(ring[0][0], ring[0][1]);
ringListener.lineEnd();
var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
ring.pop();
polygon.push(ring);
ring = null;
if (!n)
return;
if (clean & 1) {
segment = ringSegments[0];
var n = segment.length - 1, i = -1, point;
if (n > 0) {
if (!polygonStarted)
listener.polygonStart(), polygonStarted = true;
listener.lineStart();
while (++i < n)
listener.point((point = segment[i])[0], point[1]);
listener.lineEnd();
}
return;
}
if (n > 1 && clean & 2)
ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
}
return clip;
};
}
function d3_geo_clipSegmentLength1(segment) {
return segment.length > 1;
}
function d3_geo_clipBufferListener() {
var lines = [], line;
return {
lineStart: function () {
lines.push(line = []);
},
point: function (λ, φ) {
line.push([
λ,
φ
]);
},
lineEnd: d3_noop,
buffer: function () {
var buffer = lines;
lines = [];
line = null;
return buffer;
},
rejoin: function () {
if (lines.length > 1)
lines.push(lines.pop().concat(lines.shift()));
}
};
}
function d3_geo_clipSort(a, b) {
return ((a = a.x)[0] < 0 ? a[1] - halfπ - ε : halfπ - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfπ - ε : halfπ - b[1]);
}
var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [
-π,
-π / 2
]);
function d3_geo_clipAntimeridianLine(listener) {
var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
return {
lineStart: function () {
listener.lineStart();
clean = 1;
},
point: function (λ1, φ1) {
var sλ1 = λ1 > 0 ? π : -π, dλ = abs(λ1 - λ0);
if (abs(dλ - π) < ε) {
listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? halfπ : -halfπ);
listener.point(sλ0, φ0);
listener.lineEnd();
listener.lineStart();
listener.point(sλ1, φ0);
listener.point(λ1, φ0);
clean = 0;
} else if (sλ0 !== sλ1 && dλ >= π) {
if (abs(λ0 - sλ0) < ε)
λ0 -= sλ0 * ε;
if (abs(λ1 - sλ1) < ε)
λ1 -= sλ1 * ε;
φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
listener.point(sλ0, φ0);
listener.lineEnd();
listener.lineStart();
listener.point(sλ1, φ0);
clean = 0;
}
listener.point(λ0 = λ1, φ0 = φ1);
sλ0 = sλ1;
},
lineEnd: function () {
listener.lineEnd();
λ0 = φ0 = NaN;
},
clean: function () {
return 2 - clean;
}
};
}
function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
return abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
}
function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
var φ;
if (from == null) {
φ = direction * halfπ;
listener.point(-π, φ);
listener.point(0, φ);
listener.point(π, φ);
listener.point(π, 0);
listener.point(π, -φ);
listener.point(0, -φ);
listener.point(-π, -φ);
listener.point(-π, 0);
listener.point(-π, φ);
} else if (abs(from[0] - to[0]) > ε) {
var s = from[0] < to[0] ? π : -π;
φ = direction * s / 2;
listener.point(-s, φ);
listener.point(0, φ);
listener.point(s, φ);
} else {
listener.point(to[0], to[1]);
}
}
function d3_geo_pointInPolygon(point, polygon) {
var meridian = point[0], parallel = point[1], meridianNormal = [
Math.sin(meridian),
-Math.cos(meridian),
0
], polarAngle = 0, winding = 0;
d3_geo_areaRingSum.reset();
for (var i = 0, n = polygon.length; i < n; ++i) {
var ring = polygon[i], m = ring.length;
if (!m)
continue;
var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), j = 1;
while (true) {
if (j === m)
j = 0;
point = ring[j];
var λ = point[0], φ = point[1] / 2 + π / 4, sinφ = Math.sin(φ), cosφ = Math.cos(φ), dλ = λ - λ0, sdλ = dλ >= 0 ? 1 : -1, adλ = sdλ * dλ, antimeridian = adλ > π, k = sinφ0 * sinφ;
d3_geo_areaRingSum.add(Math.atan2(k * sdλ * Math.sin(adλ), cosφ0 * cosφ + k * Math.cos(adλ)));
polarAngle += antimeridian ? dλ + sdλ * τ : dλ;
if (antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
d3_geo_cartesianNormalize(arc);
var intersection = d3_geo_cartesianCross(meridianNormal, arc);
d3_geo_cartesianNormalize(intersection);
var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
if (parallel > φarc || parallel === φarc && (arc[0] || arc[1])) {
winding += antimeridian ^ dλ >= 0 ? 1 : -1;
}
}
if (!j++)
break;
λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ, point0 = point;
}
}
return (polarAngle < -ε || polarAngle < ε && d3_geo_areaRingSum < 0) ^ winding & 1;
}
function d3_geo_clipCircle(radius) {
var cr = Math.cos(radius), smallRadius = cr > 0, notHemisphere = abs(cr) > ε, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [
0,
-radius
] : [
-π,
radius - π
]);
function visible(λ, φ) {
return Math.cos(λ) * Math.cos(φ) > cr;
}
function clipLine(listener) {
var point0, c0, v0, v00, clean;
return {
lineStart: function () {
v00 = v0 = false;
clean = 1;
},
point: function (λ, φ) {
var point1 = [
λ,
φ
], point2, v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
if (!point0 && (v00 = v0 = v))
listener.lineStart();
if (v !== v0) {
point2 = intersect(point0, point1);
if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
point1[0] += ε;
point1[1] += ε;
v = visible(point1[0], point1[1]);
}
}
if (v !== v0) {
clean = 0;
if (v) {
listener.lineStart();
point2 = intersect(point1, point0);
listener.point(point2[0], point2[1]);
} else {
point2 = intersect(point0, point1);
listener.point(point2[0], point2[1]);
listener.lineEnd();
}
point0 = point2;
} else if (notHemisphere && point0 && smallRadius ^ v) {
var t;
if (!(c & c0) && (t = intersect(point1, point0, true))) {
clean = 0;
if (smallRadius) {
listener.lineStart();
listener.point(t[0][0], t[0][1]);
listener.point(t[1][0], t[1][1]);
listener.lineEnd();
} else {
listener.point(t[1][0], t[1][1]);
listener.lineEnd();
listener.lineStart();
listener.point(t[0][0], t[0][1]);
}
}
}
if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
listener.point(point1[0], point1[1]);
}
point0 = point1, v0 = v, c0 = c;
},
lineEnd: function () {
if (v0)
listener.lineEnd();
point0 = null;
},
clean: function () {
return clean | (v00 && v0) << 1;
}
};
}
function intersect(a, b, two) {
var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
var n1 = [
1,
0,
0
], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
if (!determinant)
return !two && a;
var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
d3_geo_cartesianAdd(A, B);
var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
if (t2 < 0)
return;
var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
d3_geo_cartesianAdd(q, A);
q = d3_geo_spherical(q);
if (!two)
return q;
var λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1], z;
if (λ1 < λ0)
z = λ0, λ0 = λ1, λ1 = z;
var δλ = λ1 - λ0, polar = abs(δλ - π) < ε, meridian = polar || δλ < ε;
if (!polar && φ1 < φ0)
z = φ0, φ0 = φ1, φ1 = z;
if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
d3_geo_cartesianAdd(q1, A);
return [
q,
d3_geo_spherical(q1)
];
}
}
function code(λ, φ) {
var r = smallRadius ? radius : π - radius, code = 0;
if (λ < -r)
code |= 1;
else if (λ > r)
code |= 2;
if (φ < -r)
code |= 4;
else if (φ > r)
code |= 8;
return code;
}
}
function d3_geom_clipLine(x0, y0, x1, y1) {
return function (line) {
var a = line.a, b = line.b, ax = a.x, ay = a.y, bx = b.x, by = b.y, t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
r = x0 - ax;
if (!dx && r > 0)
return;
r /= dx;
if (dx < 0) {
if (r < t0)
return;
if (r < t1)
t1 = r;
} else if (dx > 0) {
if (r > t1)
return;
if (r > t0)
t0 = r;
}
r = x1 - ax;
if (!dx && r < 0)
return;
r /= dx;
if (dx < 0) {
if (r > t1)
return;
if (r > t0)
t0 = r;
} else if (dx > 0) {
if (r < t0)
return;
if (r < t1)
t1 = r;
}
r = y0 - ay;
if (!dy && r > 0)
return;
r /= dy;
if (dy < 0) {
if (r < t0)
return;
if (r < t1)
t1 = r;
} else if (dy > 0) {
if (r > t1)
return;
if (r > t0)
t0 = r;
}
r = y1 - ay;
if (!dy && r < 0)
return;
r /= dy;
if (dy < 0) {
if (r > t1)
return;
if (r > t0)
t0 = r;
} else if (dy > 0) {
if (r < t0)
return;
if (r < t1)
t1 = r;
}
if (t0 > 0)
line.a = {
x: ax + t0 * dx,
y: ay + t0 * dy
};
if (t1 < 1)
line.b = {
x: ax + t1 * dx,
y: ay + t1 * dy
};
return line;
};
}
var d3_geo_clipExtentMAX = 1000000000;
d3.geo.clipExtent = function () {
var x0, y0, x1, y1, stream, clip, clipExtent = {
stream: function (output) {
if (stream)
stream.valid = false;
stream = clip(output);
stream.valid = true;
return stream;
},
extent: function (_) {
if (!arguments.length)
return [
[
x0,
y0
],
[
x1,
y1
]
];
clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
if (stream)
stream.valid = false, stream = null;
return clipExtent;
}
};
return clipExtent.extent([
[
0,
0
],
[
960,
500
]
]);
};
function d3_geo_clipExtent(x0, y0, x1, y1) {
return function (listener) {
var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), clipLine = d3_geom_clipLine(x0, y0, x1, y1), segments, polygon, ring;
var clip = {
point: point,
lineStart: lineStart,
lineEnd: lineEnd,
polygonStart: function () {
listener = bufferListener;
segments = [];
polygon = [];
clean = true;
},
polygonEnd: function () {
listener = listener_;
segments = d3.merge(segments);
var clipStartInside = insidePolygon([
x0,
y1
]), inside = clean && clipStartInside, visible = segments.length;
if (inside || visible) {
listener.polygonStart();
if (inside) {
listener.lineStart();
interpolate(null, null, 1, listener);
listener.lineEnd();
}
if (visible) {
d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener);
}
listener.polygonEnd();
}
segments = polygon = ring = null;
}
};
function insidePolygon(p) {
var wn = 0, n = polygon.length, y = p[1];
for (var i = 0; i < n; ++i) {
for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
b = v[j];
if (a[1] <= y) {
if (b[1] > y && d3_cross2d(a, b, p) > 0)
++wn;
} else {
if (b[1] <= y && d3_cross2d(a, b, p) < 0)
--wn;
}
a = b;
}
}
return wn !== 0;
}
function interpolate(from, to, direction, listener) {
var a = 0, a1 = 0;
if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
do {
listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
} while ((a = (a + direction + 4) % 4) !== a1);
} else {
listener.point(to[0], to[1]);
}
}
function pointVisible(x, y) {
return x0 <= x && x <= x1 && y0 <= y && y <= y1;
}
function point(x, y) {
if (pointVisible(x, y))
listener.point(x, y);
}
var x__, y__, v__, x_, y_, v_, first, clean;
function lineStart() {
clip.point = linePoint;
if (polygon)
polygon.push(ring = []);
first = true;
v_ = false;
x_ = y_ = NaN;
}
function lineEnd() {
if (segments) {
linePoint(x__, y__);
if (v__ && v_)
bufferListener.rejoin();
segments.push(bufferListener.buffer());
}
clip.point = point;
if (v_)
listener.lineEnd();
}
function linePoint(x, y) {
x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
var v = pointVisible(x, y);
if (polygon)
ring.push([
x,
y
]);
if (first) {
x__ = x, y__ = y, v__ = v;
first = false;
if (v) {
listener.lineStart();
listener.point(x, y);
}
} else {
if (v && v_)
listener.point(x, y);
else {
var l = {
a: {
x: x_,
y: y_
},
b: {
x: x,
y: y
}
};
if (clipLine(l)) {
if (!v_) {
listener.lineStart();
listener.point(l.a.x, l.a.y);
}
listener.point(l.b.x, l.b.y);
if (!v)
listener.lineEnd();
clean = false;
} else if (v) {
listener.lineStart();
listener.point(x, y);
clean = false;
}
}
}
x_ = x, y_ = y, v_ = v;
}
return clip;
};
function corner(p, direction) {
return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
}
function compare(a, b) {
return comparePoints(a.x, b.x);
}
function comparePoints(a, b) {
var ca = corner(a, 1), cb = corner(b, 1);
return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
}
}
function d3_geo_conic(projectAt) {
var φ0 = 0, φ1 = π / 3, m = d3_geo_projectionMutator(projectAt), p = m(φ0, φ1);
p.parallels = function (_) {
if (!arguments.length)
return [
φ0 / π * 180,
φ1 / π * 180
];
return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
};
return p;
}
function d3_geo_conicEqualArea(φ0, φ1) {
var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
function forward(λ, φ) {
var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
return [
ρ * Math.sin(λ *= n),
ρ0 - ρ * Math.cos(λ)
];
}
forward.invert = function (x, y) {
var ρ0_y = ρ0 - y;
return [
Math.atan2(x, ρ0_y) / n,
d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n))
];
};
return forward;
}
(d3.geo.conicEqualArea = function () {
return d3_geo_conic(d3_geo_conicEqualArea);
}).raw = d3_geo_conicEqualArea;
d3.geo.albers = function () {
return d3.geo.conicEqualArea().rotate([
96,
0
]).center([
-0.6,
38.7
]).parallels([
29.5,
45.5
]).scale(1070);
};
d3.geo.albersUsa = function () {
var lower48 = d3.geo.albers();
var alaska = d3.geo.conicEqualArea().rotate([
154,
0
]).center([
-2,
58.5
]).parallels([
55,
65
]);
var hawaii = d3.geo.conicEqualArea().rotate([
157,
0
]).center([
-3,
19.9
]).parallels([
8,
18
]);
var point, pointStream = {
point: function (x, y) {
point = [
x,
y
];
}
}, lower48Point, alaskaPoint, hawaiiPoint;
function albersUsa(coordinates) {
var x = coordinates[0], y = coordinates[1];
point = null;
(lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
return point;
}
albersUsa.invert = function (coordinates) {
var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
return (y >= 0.12 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii : lower48).invert(coordinates);
};
albersUsa.stream = function (stream) {
var lower48Stream = lower48.stream(stream), alaskaStream = alaska.stream(stream), hawaiiStream = hawaii.stream(stream);
return {
point: function (x, y) {
lower48Stream.point(x, y);
alaskaStream.point(x, y);
hawaiiStream.point(x, y);
},
sphere: function () {
lower48Stream.sphere();
alaskaStream.sphere();
hawaiiStream.sphere();
},
lineStart: function () {
lower48Stream.lineStart();
alaskaStream.lineStart();
hawaiiStream.lineStart();
},
lineEnd: function () {
lower48Stream.lineEnd();
alaskaStream.lineEnd();
hawaiiStream.lineEnd();
},
polygonStart: function () {
lower48Stream.polygonStart();
alaskaStream.polygonStart();
hawaiiStream.polygonStart();
},
polygonEnd: function () {
lower48Stream.polygonEnd();
alaskaStream.polygonEnd();
hawaiiStream.polygonEnd();
}
};
};
albersUsa.precision = function (_) {
if (!arguments.length)
return lower48.precision();
lower48.precision(_);
alaska.precision(_);
hawaii.precision(_);
return albersUsa;
};
albersUsa.scale = function (_) {
if (!arguments.length)
return lower48.scale();
lower48.scale(_);
alaska.scale(_ * 0.35);
hawaii.scale(_);
return albersUsa.translate(lower48.translate());
};
albersUsa.translate = function (_) {
if (!arguments.length)
return lower48.translate();
var k = lower48.scale(), x = +_[0], y = +_[1];
lower48Point = lower48.translate(_).clipExtent([
[
x - 0.455 * k,
y - 0.238 * k
],
[
x + 0.455 * k,
y + 0.238 * k
]
]).stream(pointStream).point;
alaskaPoint = alaska.translate([
x - 0.307 * k,
y + 0.201 * k
]).clipExtent([
[
x - 0.425 * k + ε,
y + 0.12 * k + ε
],
[
x - 0.214 * k - ε,
y + 0.234 * k - ε
]
]).stream(pointStream).point;
hawaiiPoint = hawaii.translate([
x - 0.205 * k,
y + 0.212 * k
]).clipExtent([
[
x - 0.214 * k + ε,
y + 0.166 * k + ε
],
[
x - 0.115 * k - ε,
y + 0.234 * k - ε
]
]).stream(pointStream).point;
return albersUsa;
};
return albersUsa.scale(1070);
};
var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
point: d3_noop,
lineStart: d3_noop,
lineEnd: d3_noop,
polygonStart: function () {
d3_geo_pathAreaPolygon = 0;
d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
},
polygonEnd: function () {
d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2);
}
};
function d3_geo_pathAreaRingStart() {
var x00, y00, x0, y0;
d3_geo_pathArea.point = function (x, y) {
d3_geo_pathArea.point = nextPoint;
x00 = x0 = x, y00 = y0 = y;
};
function nextPoint(x, y) {
d3_geo_pathAreaPolygon += y0 * x - x0 * y;
x0 = x, y0 = y;
}
d3_geo_pathArea.lineEnd = function () {
nextPoint(x00, y00);
};
}
var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
var d3_geo_pathBounds = {
point: d3_geo_pathBoundsPoint,
lineStart: d3_noop,
lineEnd: d3_noop,
polygonStart: d3_noop,
polygonEnd: d3_noop
};
function d3_geo_pathBoundsPoint(x, y) {
if (x < d3_geo_pathBoundsX0)
d3_geo_pathBoundsX0 = x;
if (x > d3_geo_pathBoundsX1)
d3_geo_pathBoundsX1 = x;
if (y < d3_geo_pathBoundsY0)
d3_geo_pathBoundsY0 = y;
if (y > d3_geo_pathBoundsY1)
d3_geo_pathBoundsY1 = y;
}
function d3_geo_pathBuffer() {
var pointCircle = d3_geo_pathBufferCircle(4.5), buffer = [];
var stream = {
point: point,
lineStart: function () {
stream.point = pointLineStart;
},
lineEnd: lineEnd,
polygonStart: function () {
stream.lineEnd = lineEndPolygon;
},
polygonEnd: function () {
stream.lineEnd = lineEnd;
stream.point = point;
},
pointRadius: function (_) {
pointCircle = d3_geo_pathBufferCircle(_);
return stream;
},
result: function () {
if (buffer.length) {
var result = buffer.join('');
buffer = [];
return result;
}
}
};
function point(x, y) {
buffer.push('M', x, ',', y, pointCircle);
}
function pointLineStart(x, y) {
buffer.push('M', x, ',', y);
stream.point = pointLine;
}
function pointLine(x, y) {
buffer.push('L', x, ',', y);
}
function lineEnd() {
stream.point = point;
}
function lineEndPolygon() {
buffer.push('Z');
}
return stream;
}
function d3_geo_pathBufferCircle(radius) {
return 'm0,' + radius + 'a' + radius + ',' + radius + ' 0 1,1 0,' + -2 * radius + 'a' + radius + ',' + radius + ' 0 1,1 0,' + 2 * radius + 'z';
}
var d3_geo_pathCentroid = {
point: d3_geo_pathCentroidPoint,
lineStart: d3_geo_pathCentroidLineStart,
lineEnd: d3_geo_pathCentroidLineEnd,
polygonStart: function () {
d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
},
polygonEnd: function () {
d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
}
};
function d3_geo_pathCentroidPoint(x, y) {
d3_geo_centroidX0 += x;
d3_geo_centroidY0 += y;
++d3_geo_centroidZ0;
}
function d3_geo_pathCentroidLineStart() {
var x0, y0;
d3_geo_pathCentroid.point = function (x, y) {
d3_geo_pathCentroid.point = nextPoint;
d3_geo_pathCentroidPoint(x0 = x, y0 = y);
};
function nextPoint(x, y) {
var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
d3_geo_centroidX1 += z * (x0 + x) / 2;
d3_geo_centroidY1 += z * (y0 + y) / 2;
d3_geo_centroidZ1 += z;
d3_geo_pathCentroidPoint(x0 = x, y0 = y);
}
}
function d3_geo_pathCentroidLineEnd() {
d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
}
function d3_geo_pathCentroidRingStart() {
var x00, y00, x0, y0;
d3_geo_pathCentroid.point = function (x, y) {
d3_geo_pathCentroid.point = nextPoint;
d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
};
function nextPoint(x, y) {
var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
d3_geo_centroidX1 += z * (x0 + x) / 2;
d3_geo_centroidY1 += z * (y0 + y) / 2;
d3_geo_centroidZ1 += z;
z = y0 * x - x0 * y;
d3_geo_centroidX2 += z * (x0 + x);
d3_geo_centroidY2 += z * (y0 + y);
d3_geo_centroidZ2 += z * 3;
d3_geo_pathCentroidPoint(x0 = x, y0 = y);
}
d3_geo_pathCentroid.lineEnd = function () {
nextPoint(x00, y00);
};
}
function d3_geo_pathContext(context) {
var pointRadius = 4.5;
var stream = {
point: point,
lineStart: function () {
stream.point = pointLineStart;
},
lineEnd: lineEnd,
polygonStart: function () {
stream.lineEnd = lineEndPolygon;
},
polygonEnd: function () {
stream.lineEnd = lineEnd;
stream.point = point;
},
pointRadius: function (_) {
pointRadius = _;
return stream;
},
result: d3_noop
};
function point(x, y) {
context.moveTo(x + pointRadius, y);
context.arc(x, y, pointRadius, 0, τ);
}
function pointLineStart(x, y) {
context.moveTo(x, y);
stream.point = pointLine;
}
function pointLine(x, y) {
context.lineTo(x, y);
}
function lineEnd() {
stream.point = point;
}
function lineEndPolygon() {
context.closePath();
}
return stream;
}
function d3_geo_resample(project) {
var δ2 = 0.5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
function resample(stream) {
return (maxDepth ? resampleRecursive : resampleNone)(stream);
}
function resampleNone(stream) {
return d3_geo_transformPoint(stream, function (x, y) {
x = project(x, y);
stream.point(x[0], x[1]);
});
}
function resampleRecursive(stream) {
var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
var resample = {
point: point,
lineStart: lineStart,
lineEnd: lineEnd,
polygonStart: function () {
stream.polygonStart();
resample.lineStart = ringStart;
},
polygonEnd: function () {
stream.polygonEnd();
resample.lineStart = lineStart;
}
};
function point(x, y) {
x = project(x, y);
stream.point(x[0], x[1]);
}
function lineStart() {
x0 = NaN;
resample.point = linePoint;
stream.lineStart();
}
function linePoint(λ, φ) {
var c = d3_geo_cartesian([
λ,
φ
]), p = project(λ, φ);
resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
stream.point(x0, y0);
}
function lineEnd() {
resample.point = point;
stream.lineEnd();
}
function ringStart() {
lineStart();
resample.point = ringPoint;
resample.lineEnd = ringEnd;
}
function ringPoint(λ, φ) {
linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
resample.point = linePoint;
}
function ringEnd() {
resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
resample.lineEnd = lineEnd;
lineEnd();
}
return resample;
}
function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
if (d2 > 4 * δ2 && depth--) {
var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
if (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
stream.point(x2, y2);
resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
}
}
}
resample.precision = function (_) {
if (!arguments.length)
return Math.sqrt(δ2);
maxDepth = (δ2 = _ * _) > 0 && 16;
return resample;
};
return resample;
}
d3.geo.path = function () {
var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
function path(object) {
if (object) {
if (typeof pointRadius === 'function')
contextStream.pointRadius(+pointRadius.apply(this, arguments));
if (!cacheStream || !cacheStream.valid)
cacheStream = projectStream(contextStream);
d3.geo.stream(object, cacheStream);
}
return contextStream.result();
}
path.area = function (object) {
d3_geo_pathAreaSum = 0;
d3.geo.stream(object, projectStream(d3_geo_pathArea));
return d3_geo_pathAreaSum;
};
path.centroid = function (object) {
d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
return d3_geo_centroidZ2 ? [
d3_geo_centroidX2 / d3_geo_centroidZ2,
d3_geo_centroidY2 / d3_geo_centroidZ2
] : d3_geo_centroidZ1 ? [
d3_geo_centroidX1 / d3_geo_centroidZ1,
d3_geo_centroidY1 / d3_geo_centroidZ1
] : d3_geo_centroidZ0 ? [
d3_geo_centroidX0 / d3_geo_centroidZ0,
d3_geo_centroidY0 / d3_geo_centroidZ0
] : [
NaN,
NaN
];
};
path.bounds = function (object) {
d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
d3.geo.stream(object, projectStream(d3_geo_pathBounds));
return [
[
d3_geo_pathBoundsX0,
d3_geo_pathBoundsY0
],
[
d3_geo_pathBoundsX1,
d3_geo_pathBoundsY1
]
];
};
path.projection = function (_) {
if (!arguments.length)
return projection;
projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
return reset();
};
path.context = function (_) {
if (!arguments.length)
return context;
contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
if (typeof pointRadius !== 'function')
contextStream.pointRadius(pointRadius);
return reset();
};
path.pointRadius = function (_) {
if (!arguments.length)
return pointRadius;
pointRadius = typeof _ === 'function' ? _ : (contextStream.pointRadius(+_), +_);
return path;
};
function reset() {
cacheStream = null;
return path;
}
return path.projection(d3.geo.albersUsa()).context(null);
};
function d3_geo_pathProjectStream(project) {
var resample = d3_geo_resample(function (x, y) {
return project([
x * d3_degrees,
y * d3_degrees
]);
});
return function (stream) {
return d3_geo_projectionRadians(resample(stream));
};
}
d3.geo.transform = function (methods) {
return {
stream: function (stream) {
var transform = new d3_geo_transform(stream);
for (var k in methods)
transform[k] = methods[k];
return transform;
}
};
};
function d3_geo_transform(stream) {
this.stream = stream;
}
d3_geo_transform.prototype = {
point: function (x, y) {
this.stream.point(x, y);
},
sphere: function () {
this.stream.sphere();
},
lineStart: function () {
this.stream.lineStart();
},
lineEnd: function () {
this.stream.lineEnd();
},
polygonStart: function () {
this.stream.polygonStart();
},
polygonEnd: function () {
this.stream.polygonEnd();
}
};
function d3_geo_transformPoint(stream, point) {
return {
point: point,
sphere: function () {
stream.sphere();
},
lineStart: function () {
stream.lineStart();
},
lineEnd: function () {
stream.lineEnd();
},
polygonStart: function () {
stream.polygonStart();
},
polygonEnd: function () {
stream.polygonEnd();
}
};
}
d3.geo.projection = d3_geo_projection;
d3.geo.projectionMutator = d3_geo_projectionMutator;
function d3_geo_projection(project) {
return d3_geo_projectionMutator(function () {
return project;
})();
}
function d3_geo_projectionMutator(projectAt) {
var project, rotate, projectRotate, projectResample = d3_geo_resample(function (x, y) {
x = project(x, y);
return [
x[0] * k + δx,
δy - x[1] * k
];
}), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null, stream;
function projection(point) {
point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
return [
point[0] * k + δx,
δy - point[1] * k
];
}
function invert(point) {
point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
return point && [
point[0] * d3_degrees,
point[1] * d3_degrees
];
}
projection.stream = function (output) {
if (stream)
stream.valid = false;
stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output))));
stream.valid = true;
return stream;
};
projection.clipAngle = function (_) {
if (!arguments.length)
return clipAngle;
preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
return invalidate();
};
projection.clipExtent = function (_) {
if (!arguments.length)
return clipExtent;
clipExtent = _;
postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
return invalidate();
};
projection.scale = function (_) {
if (!arguments.length)
return k;
k = +_;
return reset();
};
projection.translate = function (_) {
if (!arguments.length)
return [
x,
y
];
x = +_[0];
y = +_[1];
return reset();
};
projection.center = function (_) {
if (!arguments.length)
return [
λ * d3_degrees,
φ * d3_degrees
];
λ = _[0] % 360 * d3_radians;
φ = _[1] % 360 * d3_radians;
return reset();
};
projection.rotate = function (_) {
if (!arguments.length)
return [
δλ * d3_degrees,
δφ * d3_degrees,
δγ * d3_degrees
];
δλ = _[0] % 360 * d3_radians;
δφ = _[1] % 360 * d3_radians;
δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
return reset();
};
d3.rebind(projection, projectResample, 'precision');
function reset() {
projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
var center = project(λ, φ);
δx = x - center[0] * k;
δy = y + center[1] * k;
return invalidate();
}
function invalidate() {
if (stream)
stream.valid = false, stream = null;
return projection;
}
return function () {
project = projectAt.apply(this, arguments);
projection.invert = project.invert && invert;
return reset();
};
}
function d3_geo_projectionRadians(stream) {
return d3_geo_transformPoint(stream, function (x, y) {
stream.point(x * d3_radians, y * d3_radians);
});
}
function d3_geo_equirectangular(λ, φ) {
return [
λ,
φ
];
}
(d3.geo.equirectangular = function () {
return d3_geo_projection(d3_geo_equirectangular);
}).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
d3.geo.rotation = function (rotate) {
rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
function forward(coordinates) {
coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
}
forward.invert = function (coordinates) {
coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
};
return forward;
};
function d3_geo_identityRotation(λ, φ) {
return [
λ > π ? λ - τ : λ < -π ? λ + τ : λ,
φ
];
}
d3_geo_identityRotation.invert = d3_geo_equirectangular;
function d3_geo_rotation(δλ, δφ, δγ) {
return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_identityRotation;
}
function d3_geo_forwardRotationλ(δλ) {
return function (λ, φ) {
return λ += δλ, [
λ > π ? λ - τ : λ < -π ? λ + τ : λ,
φ
];
};
}
function d3_geo_rotationλ(δλ) {
var rotation = d3_geo_forwardRotationλ(δλ);
rotation.invert = d3_geo_forwardRotationλ(-δλ);
return rotation;
}
function d3_geo_rotationφγ(δφ, δγ) {
var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
function rotation(λ, φ) {
var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
return [
Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ),
d3_asin(k * cosδγ + y * sinδγ)
];
}
rotation.invert = function (λ, φ) {
var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
return [
Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ),
d3_asin(k * cosδφ - x * sinδφ)
];
};
return rotation;
}
d3.geo.circle = function () {
var origin = [
0,
0
], angle, precision = 6, interpolate;
function circle() {
var center = typeof origin === 'function' ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
interpolate(null, null, 1, {
point: function (x, y) {
ring.push(x = rotate(x, y));
x[0] *= d3_degrees, x[1] *= d3_degrees;
}
});
return {
type: 'Polygon',
coordinates: [ring]
};
}
circle.origin = function (x) {
if (!arguments.length)
return origin;
origin = x;
return circle;
};
circle.angle = function (x) {
if (!arguments.length)
return angle;
interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
return circle;
};
circle.precision = function (_) {
if (!arguments.length)
return precision;
interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
return circle;
};
return circle.angle(90);
};
function d3_geo_circleInterpolate(radius, precision) {
var cr = Math.cos(radius), sr = Math.sin(radius);
return function (from, to, direction, listener) {
var step = direction * precision;
if (from != null) {
from = d3_geo_circleAngle(cr, from);
to = d3_geo_circleAngle(cr, to);
if (direction > 0 ? from < to : from > to)
from += direction * τ;
} else {
from = radius + direction * τ;
to = radius - 0.5 * step;
}
for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) {
listener.point((point = d3_geo_spherical([
cr,
-sr * Math.cos(t),
-sr * Math.sin(t)
]))[0], point[1]);
}
};
}
function d3_geo_circleAngle(cr, point) {
var a = d3_geo_cartesian(point);
a[0] -= cr;
d3_geo_cartesianNormalize(a);
var angle = d3_acos(-a[1]);
return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
}
d3.geo.distance = function (a, b) {
var Δλ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ), sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1), t;
return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
};
d3.geo.graticule = function () {
var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
function graticule() {
return {
type: 'MultiLineString',
coordinates: lines()
};
}
function lines() {
return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function (x) {
return abs(x % DX) > ε;
}).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function (y) {
return abs(y % DY) > ε;
}).map(y));
}
graticule.lines = function () {
return lines().map(function (coordinates) {
return {
type: 'LineString',
coordinates: coordinates
};
});
};
graticule.outline = function () {
return {
type: 'Polygon',
coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
};
};
graticule.extent = function (_) {
if (!arguments.length)
return graticule.minorExtent();
return graticule.majorExtent(_).minorExtent(_);
};
graticule.majorExtent = function (_) {
if (!arguments.length)
return [
[
X0,
Y0
],
[
X1,
Y1
]
];
X0 = +_[0][0], X1 = +_[1][0];
Y0 = +_[0][1], Y1 = +_[1][1];
if (X0 > X1)
_ = X0, X0 = X1, X1 = _;
if (Y0 > Y1)
_ = Y0, Y0 = Y1, Y1 = _;
return graticule.precision(precision);
};
graticule.minorExtent = function (_) {
if (!arguments.length)
return [
[
x0,
y0
],
[
x1,
y1
]
];
x0 = +_[0][0], x1 = +_[1][0];
y0 = +_[0][1], y1 = +_[1][1];
if (x0 > x1)
_ = x0, x0 = x1, x1 = _;
if (y0 > y1)
_ = y0, y0 = y1, y1 = _;
return graticule.precision(precision);
};
graticule.step = function (_) {
if (!arguments.length)
return graticule.minorStep();
return graticule.majorStep(_).minorStep(_);
};
graticule.majorStep = function (_) {
if (!arguments.length)
return [
DX,
DY
];
DX = +_[0], DY = +_[1];
return graticule;
};
graticule.minorStep = function (_) {
if (!arguments.length)
return [
dx,
dy
];
dx = +_[0], dy = +_[1];
return graticule;
};
graticule.precision = function (_) {
if (!arguments.length)
return precision;
precision = +_;
x = d3_geo_graticuleX(y0, y1, 90);
y = d3_geo_graticuleY(x0, x1, precision);
X = d3_geo_graticuleX(Y0, Y1, 90);
Y = d3_geo_graticuleY(X0, X1, precision);
return graticule;
};
return graticule.majorExtent([
[
-180,
-90 + ε
],
[
180,
90 - ε
]
]).minorExtent([
[
-180,
-80 - ε
],
[
180,
80 + ε
]
]);
};
function d3_geo_graticuleX(y0, y1, dy) {
var y = d3.range(y0, y1 - ε, dy).concat(y1);
return function (x) {
return y.map(function (y) {
return [
x,
y
];
});
};
}
function d3_geo_graticuleY(x0, x1, dx) {
var x = d3.range(x0, x1 - ε, dx).concat(x1);
return function (y) {
return x.map(function (x) {
return [
x,
y
];
});
};
}
function d3_source(d) {
return d.source;
}
function d3_target(d) {
return d.target;
}
d3.geo.greatArc = function () {
var source = d3_source, source_, target = d3_target, target_;
function greatArc() {
return {
type: 'LineString',
coordinates: [
source_ || source.apply(this, arguments),
target_ || target.apply(this, arguments)
]
};
}
greatArc.distance = function () {
return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
};
greatArc.source = function (_) {
if (!arguments.length)
return source;
source = _, source_ = typeof _ === 'function' ? null : _;
return greatArc;
};
greatArc.target = function (_) {
if (!arguments.length)
return target;
target = _, target_ = typeof _ === 'function' ? null : _;
return greatArc;
};
greatArc.precision = function () {
return arguments.length ? greatArc : 0;
};
return greatArc;
};
d3.geo.interpolate = function (source, target) {
return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
};
function d3_geo_interpolate(x0, y0, x1, y1) {
var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
var interpolate = d ? function (t) {
var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
return [
Math.atan2(y, x) * d3_degrees,
Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees
];
} : function () {
return [
x0 * d3_degrees,
y0 * d3_degrees
];
};
interpolate.distance = d;
return interpolate;
}
d3.geo.length = function (object) {
d3_geo_lengthSum = 0;
d3.geo.stream(object, d3_geo_length);
return d3_geo_lengthSum;
};
var d3_geo_lengthSum;
var d3_geo_length = {
sphere: d3_noop,
point: d3_noop,
lineStart: d3_geo_lengthLineStart,
lineEnd: d3_noop,
polygonStart: d3_noop,
polygonEnd: d3_noop
};
function d3_geo_lengthLineStart() {
var λ0, sinφ0, cosφ0;
d3_geo_length.point = function (λ, φ) {
λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
d3_geo_length.point = nextPoint;
};
d3_geo_length.lineEnd = function () {
d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
};
function nextPoint(λ, φ) {
var sinφ = Math.sin(φ *= d3_radians), cosφ = Math.cos(φ), t = abs((λ *= d3_radians) - λ0), cosΔλ = Math.cos(t);
d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
}
}
function d3_geo_azimuthal(scale, angle) {
function azimuthal(λ, φ) {
var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
return [
k * cosφ * Math.sin(λ),
k * Math.sin(φ)
];
}
azimuthal.invert = function (x, y) {
var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
return [
Math.atan2(x * sinc, ρ * cosc),
Math.asin(ρ && y * sinc / ρ)
];
};
return azimuthal;
}
var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function (cosλcosφ) {
return Math.sqrt(2 / (1 + cosλcosφ));
}, function (ρ) {
return 2 * Math.asin(ρ / 2);
});
(d3.geo.azimuthalEqualArea = function () {
return d3_geo_projection(d3_geo_azimuthalEqualArea);
}).raw = d3_geo_azimuthalEqualArea;
var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function (cosλcosφ) {
var c = Math.acos(cosλcosφ);
return c && c / Math.sin(c);
}, d3_identity);
(d3.geo.azimuthalEquidistant = function () {
return d3_geo_projection(d3_geo_azimuthalEquidistant);
}).raw = d3_geo_azimuthalEquidistant;
function d3_geo_conicConformal(φ0, φ1) {
var cosφ0 = Math.cos(φ0), t = function (φ) {
return Math.tan(π / 4 + φ / 2);
}, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
if (!n)
return d3_geo_mercator;
function forward(λ, φ) {
if (F > 0) {
if (φ < -halfπ + ε)
φ = -halfπ + ε;
} else {
if (φ > halfπ - ε)
φ = halfπ - ε;
}
var ρ = F / Math.pow(t(φ), n);
return [
ρ * Math.sin(n * λ),
F - ρ * Math.cos(n * λ)
];
}
forward.invert = function (x, y) {
var ρ0_y = F - y, ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
return [
Math.atan2(x, ρ0_y) / n,
2 * Math.atan(Math.pow(F / ρ, 1 / n)) - halfπ
];
};
return forward;
}
(d3.geo.conicConformal = function () {
return d3_geo_conic(d3_geo_conicConformal);
}).raw = d3_geo_conicConformal;
function d3_geo_conicEquidistant(φ0, φ1) {
var cosφ0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0), G = cosφ0 / n + φ0;
if (abs(n) < ε)
return d3_geo_equirectangular;
function forward(λ, φ) {
var ρ = G - φ;
return [
ρ * Math.sin(n * λ),
G - ρ * Math.cos(n * λ)
];
}
forward.invert = function (x, y) {
var ρ0_y = G - y;
return [
Math.atan2(x, ρ0_y) / n,
G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y)
];
};
return forward;
}
(d3.geo.conicEquidistant = function () {
return d3_geo_conic(d3_geo_conicEquidistant);
}).raw = d3_geo_conicEquidistant;
var d3_geo_gnomonic = d3_geo_azimuthal(function (cosλcosφ) {
return 1 / cosλcosφ;
}, Math.atan);
(d3.geo.gnomonic = function () {
return d3_geo_projection(d3_geo_gnomonic);
}).raw = d3_geo_gnomonic;
function d3_geo_mercator(λ, φ) {
return [
λ,
Math.log(Math.tan(π / 4 + φ / 2))
];
}
d3_geo_mercator.invert = function (x, y) {
return [
x,
2 * Math.atan(Math.exp(y)) - halfπ
];
};
function d3_geo_mercatorProjection(project) {
var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
m.scale = function () {
var v = scale.apply(m, arguments);
return v === m ? clipAuto ? m.clipExtent(null) : m : v;
};
m.translate = function () {
var v = translate.apply(m, arguments);
return v === m ? clipAuto ? m.clipExtent(null) : m : v;
};
m.clipExtent = function (_) {
var v = clipExtent.apply(m, arguments);
if (v === m) {
if (clipAuto = _ == null) {
var k = π * scale(), t = translate();
clipExtent([
[
t[0] - k,
t[1] - k
],
[
t[0] + k,
t[1] + k
]
]);
}
} else if (clipAuto) {
v = null;
}
return v;
};
return m.clipExtent(null);
}
(d3.geo.mercator = function () {
return d3_geo_mercatorProjection(d3_geo_mercator);
}).raw = d3_geo_mercator;
var d3_geo_orthographic = d3_geo_azimuthal(function () {
return 1;
}, Math.asin);
(d3.geo.orthographic = function () {
return d3_geo_projection(d3_geo_orthographic);
}).raw = d3_geo_orthographic;
var d3_geo_stereographic = d3_geo_azimuthal(function (cosλcosφ) {
return 1 / (1 + cosλcosφ);
}, function (ρ) {
return 2 * Math.atan(ρ);
});
(d3.geo.stereographic = function () {
return d3_geo_projection(d3_geo_stereographic);
}).raw = d3_geo_stereographic;
function d3_geo_transverseMercator(λ, φ) {
return [
Math.log(Math.tan(π / 4 + φ / 2)),
-λ
];
}
d3_geo_transverseMercator.invert = function (x, y) {
return [
-y,
2 * Math.atan(Math.exp(x)) - halfπ
];
};
(d3.geo.transverseMercator = function () {
var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator), center = projection.center, rotate = projection.rotate;
projection.center = function (_) {
return _ ? center([
-_[1],
_[0]
]) : (_ = center(), [
_[1],
-_[0]
]);
};
projection.rotate = function (_) {
return _ ? rotate([
_[0],
_[1],
_.length > 2 ? _[2] + 90 : 90
]) : (_ = rotate(), [
_[0],
_[1],
_[2] - 90
]);
};
return rotate([
0,
0,
90
]);
}).raw = d3_geo_transverseMercator;
d3.geom = {};
function d3_geom_pointX(d) {
return d[0];
}
function d3_geom_pointY(d) {
return d[1];
}
d3.geom.hull = function (vertices) {
var x = d3_geom_pointX, y = d3_geom_pointY;
if (arguments.length)
return hull(vertices);
function hull(data) {
if (data.length < 3)
return [];
var fx = d3_functor(x), fy = d3_functor(y), i, n = data.length, points = [], flippedPoints = [];
for (i = 0; i < n; i++) {
points.push([
+fx.call(this, data[i], i),
+fy.call(this, data[i], i),
i
]);
}
points.sort(d3_geom_hullOrder);
for (i = 0; i < n; i++)
flippedPoints.push([
points[i][0],
-points[i][1]
]);
var upper = d3_geom_hullUpper(points), lower = d3_geom_hullUpper(flippedPoints);
var skipLeft = lower[0] === upper[0], skipRight = lower[lower.length - 1] === upper[upper.length - 1], polygon = [];
for (i = upper.length - 1; i >= 0; --i)
polygon.push(data[points[upper[i]][2]]);
for (i = +skipLeft; i < lower.length - skipRight; ++i)
polygon.push(data[points[lower[i]][2]]);
return polygon;
}
hull.x = function (_) {
return arguments.length ? (x = _, hull) : x;
};
hull.y = function (_) {
return arguments.length ? (y = _, hull) : y;
};
return hull;
};
function d3_geom_hullUpper(points) {
var n = points.length, hull = [
0,
1
], hs = 2;
for (var i = 2; i < n; i++) {
while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0)
--hs;
hull[hs++] = i;
}
return hull.slice(0, hs);
}
function d3_geom_hullOrder(a, b) {
return a[0] - b[0] || a[1] - b[1];
}
d3.geom.polygon = function (coordinates) {
d3_subclass(coordinates, d3_geom_polygonPrototype);
return coordinates;
};
var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
d3_geom_polygonPrototype.area = function () {
var i = -1, n = this.length, a, b = this[n - 1], area = 0;
while (++i < n) {
a = b;
b = this[i];
area += a[1] * b[0] - a[0] * b[1];
}
return area * 0.5;
};
d3_geom_polygonPrototype.centroid = function (k) {
var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
if (!arguments.length)
k = -1 / (6 * this.area());
while (++i < n) {
a = b;
b = this[i];
c = a[0] * b[1] - b[0] * a[1];
x += (a[0] + b[0]) * c;
y += (a[1] + b[1]) * c;
}
return [
x * k,
y * k
];
};
d3_geom_polygonPrototype.clip = function (subject) {
var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
while (++i < n) {
input = subject.slice();
subject.length = 0;
b = this[i];
c = input[(m = input.length - closed) - 1];
j = -1;
while (++j < m) {
d = input[j];
if (d3_geom_polygonInside(d, a, b)) {
if (!d3_geom_polygonInside(c, a, b)) {
subject.push(d3_geom_polygonIntersect(c, d, a, b));
}
subject.push(d);
} else if (d3_geom_polygonInside(c, a, b)) {
subject.push(d3_geom_polygonIntersect(c, d, a, b));
}
c = d;
}
if (closed)
subject.push(subject[0]);
a = b;
}
return subject;
};
function d3_geom_polygonInside(p, a, b) {
return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
}
function d3_geom_polygonIntersect(c, d, a, b) {
var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
return [
x1 + ua * x21,
y1 + ua * y21
];
}
function d3_geom_polygonClosed(coordinates) {
var a = coordinates[0], b = coordinates[coordinates.length - 1];
return !(a[0] - b[0] || a[1] - b[1]);
}
var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiBeachPool = [], d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiCirclePool = [];
function d3_geom_voronoiBeach() {
d3_geom_voronoiRedBlackNode(this);
this.edge = this.site = this.circle = null;
}
function d3_geom_voronoiCreateBeach(site) {
var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach();
beach.site = site;
return beach;
}
function d3_geom_voronoiDetachBeach(beach) {
d3_geom_voronoiDetachCircle(beach);
d3_geom_voronoiBeaches.remove(beach);
d3_geom_voronoiBeachPool.push(beach);
d3_geom_voronoiRedBlackNode(beach);
}
function d3_geom_voronoiRemoveBeach(beach) {
var circle = beach.circle, x = circle.x, y = circle.cy, vertex = {
x: x,
y: y
}, previous = beach.P, next = beach.N, disappearing = [beach];
d3_geom_voronoiDetachBeach(beach);
var lArc = previous;
while (lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε) {
previous = lArc.P;
disappearing.unshift(lArc);
d3_geom_voronoiDetachBeach(lArc);
lArc = previous;
}
disappearing.unshift(lArc);
d3_geom_voronoiDetachCircle(lArc);
var rArc = next;
while (rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε) {
next = rArc.N;
disappearing.push(rArc);
d3_geom_voronoiDetachBeach(rArc);
rArc = next;
}
disappearing.push(rArc);
d3_geom_voronoiDetachCircle(rArc);
var nArcs = disappearing.length, iArc;
for (iArc = 1; iArc < nArcs; ++iArc) {
rArc = disappearing[iArc];
lArc = disappearing[iArc - 1];
d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
}
lArc = disappearing[0];
rArc = disappearing[nArcs - 1];
rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
d3_geom_voronoiAttachCircle(lArc);
d3_geom_voronoiAttachCircle(rArc);
}
function d3_geom_voronoiAddBeach(site) {
var x = site.x, directrix = site.y, lArc, rArc, dxl, dxr, node = d3_geom_voronoiBeaches._;
while (node) {
dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
if (dxl > ε)
node = node.L;
else {
dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
if (dxr > ε) {
if (!node.R) {
lArc = node;
break;
}
node = node.R;
} else {
if (dxl > -ε) {
lArc = node.P;
rArc = node;
} else if (dxr > -ε) {
lArc = node;
rArc = node.N;
} else {
lArc = rArc = node;
}
break;
}
}
}
var newArc = d3_geom_voronoiCreateBeach(site);
d3_geom_voronoiBeaches.insert(lArc, newArc);
if (!lArc && !rArc)
return;
if (lArc === rArc) {
d3_geom_voronoiDetachCircle(lArc);
rArc = d3_geom_voronoiCreateBeach(lArc.site);
d3_geom_voronoiBeaches.insert(newArc, rArc);
newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
d3_geom_voronoiAttachCircle(lArc);
d3_geom_voronoiAttachCircle(rArc);
return;
}
if (!rArc) {
newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
return;
}
d3_geom_voronoiDetachCircle(lArc);
d3_geom_voronoiDetachCircle(rArc);
var lSite = lArc.site, ax = lSite.x, ay = lSite.y, bx = site.x - ax, by = site.y - ay, rSite = rArc.site, cx = rSite.x - ax, cy = rSite.y - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = {
x: (cy * hb - by * hc) / d + ax,
y: (bx * hc - cx * hb) / d + ay
};
d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
d3_geom_voronoiAttachCircle(lArc);
d3_geom_voronoiAttachCircle(rArc);
}
function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
var site = arc.site, rfocx = site.x, rfocy = site.y, pby2 = rfocy - directrix;
if (!pby2)
return rfocx;
var lArc = arc.P;
if (!lArc)
return -Infinity;
site = lArc.site;
var lfocx = site.x, lfocy = site.y, plby2 = lfocy - directrix;
if (!plby2)
return lfocx;
var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
if (aby2)
return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
return (rfocx + lfocx) / 2;
}
function d3_geom_voronoiRightBreakPoint(arc, directrix) {
var rArc = arc.N;
if (rArc)
return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
var site = arc.site;
return site.y === directrix ? site.x : Infinity;
}
function d3_geom_voronoiCell(site) {
this.site = site;
this.edges = [];
}
d3_geom_voronoiCell.prototype.prepare = function () {
var halfEdges = this.edges, iHalfEdge = halfEdges.length, edge;
while (iHalfEdge--) {
edge = halfEdges[iHalfEdge].edge;
if (!edge.b || !edge.a)
halfEdges.splice(iHalfEdge, 1);
}
halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
return halfEdges.length;
};
function d3_geom_voronoiCloseCells(extent) {
var x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], x2, y2, x3, y3, cells = d3_geom_voronoiCells, iCell = cells.length, cell, iHalfEdge, halfEdges, nHalfEdges, start, end;
while (iCell--) {
cell = cells[iCell];
if (!cell || !cell.prepare())
continue;
halfEdges = cell.edges;
nHalfEdges = halfEdges.length;
iHalfEdge = 0;
while (iHalfEdge < nHalfEdges) {
end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
if (abs(x3 - x2) > ε || abs(y3 - y2) > ε) {
halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < ε && y1 - y3 > ε ? {
x: x0,
y: abs(x2 - x0) < ε ? y2 : y1
} : abs(y3 - y1) < ε && x1 - x3 > ε ? {
x: abs(y2 - y1) < ε ? x2 : x1,
y: y1
} : abs(x3 - x1) < ε && y3 - y0 > ε ? {
x: x1,
y: abs(x2 - x1) < ε ? y2 : y0
} : abs(y3 - y0) < ε && x3 - x0 > ε ? {
x: abs(y2 - y0) < ε ? x2 : x0,
y: y0
} : null), cell.site, null));
++nHalfEdges;
}
}
}
}
function d3_geom_voronoiHalfEdgeOrder(a, b) {
return b.angle - a.angle;
}
function d3_geom_voronoiCircle() {
d3_geom_voronoiRedBlackNode(this);
this.x = this.y = this.arc = this.site = this.cy = null;
}
function d3_geom_voronoiAttachCircle(arc) {
var lArc = arc.P, rArc = arc.N;
if (!lArc || !rArc)
return;
var lSite = lArc.site, cSite = arc.site, rSite = rArc.site;
if (lSite === rSite)
return;
var bx = cSite.x, by = cSite.y, ax = lSite.x - bx, ay = lSite.y - by, cx = rSite.x - bx, cy = rSite.y - by;
var d = 2 * (ax * cy - ay * cx);
if (d >= -ε2)
return;
var ha = ax * ax + ay * ay, hc = cx * cx + cy * cy, x = (cy * ha - ay * hc) / d, y = (ax * hc - cx * ha) / d, cy = y + by;
var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle();
circle.arc = arc;
circle.site = cSite;
circle.x = x + bx;
circle.y = cy + Math.sqrt(x * x + y * y);
circle.cy = cy;
arc.circle = circle;
var before = null, node = d3_geom_voronoiCircles._;
while (node) {
if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
if (node.L)
node = node.L;
else {
before = node.P;
break;
}
} else {
if (node.R)
node = node.R;
else {
before = node;
break;
}
}
}
d3_geom_voronoiCircles.insert(before, circle);
if (!before)
d3_geom_voronoiFirstCircle = circle;
}
function d3_geom_voronoiDetachCircle(arc) {
var circle = arc.circle;
if (circle) {
if (!circle.P)
d3_geom_voronoiFirstCircle = circle.N;
d3_geom_voronoiCircles.remove(circle);
d3_geom_voronoiCirclePool.push(circle);
d3_geom_voronoiRedBlackNode(circle);
arc.circle = null;
}
}
function d3_geom_voronoiClipEdges(extent) {
var edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length, e;
while (i--) {
e = edges[i];
if (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε) {
e.a = e.b = null;
edges.splice(i, 1);
}
}
}
function d3_geom_voronoiConnectEdge(edge, extent) {
var vb = edge.b;
if (vb)
return true;
var va = edge.a, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], lSite = edge.l, rSite = edge.r, lx = lSite.x, ly = lSite.y, rx = rSite.x, ry = rSite.y, fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb;
if (ry === ly) {
if (fx < x0 || fx >= x1)
return;
if (lx > rx) {
if (!va)
va = {
x: fx,
y: y0
};
else if (va.y >= y1)
return;
vb = {
x: fx,
y: y1
};
} else {
if (!va)
va = {
x: fx,
y: y1
};
else if (va.y < y0)
return;
vb = {
x: fx,
y: y0
};
}
} else {
fm = (lx - rx) / (ry - ly);
fb = fy - fm * fx;
if (fm < -1 || fm > 1) {
if (lx > rx) {
if (!va)
va = {
x: (y0 - fb) / fm,
y: y0
};
else if (va.y >= y1)
return;
vb = {
x: (y1 - fb) / fm,
y: y1
};
} else {
if (!va)
va = {
x: (y1 - fb) / fm,
y: y1
};
else if (va.y < y0)
return;
vb = {
x: (y0 - fb) / fm,
y: y0
};
}
} else {
if (ly < ry) {
if (!va)
va = {
x: x0,
y: fm * x0 + fb
};
else if (va.x >= x1)
return;
vb = {
x: x1,
y: fm * x1 + fb
};
} else {
if (!va)
va = {
x: x1,
y: fm * x1 + fb
};
else if (va.x < x0)
return;
vb = {
x: x0,
y: fm * x0 + fb
};
}
}
}
edge.a = va;
edge.b = vb;
return true;
}
function d3_geom_voronoiEdge(lSite, rSite) {
this.l = lSite;
this.r = rSite;
this.a = this.b = null;
}
function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
var edge = new d3_geom_voronoiEdge(lSite, rSite);
d3_geom_voronoiEdges.push(edge);
if (va)
d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
if (vb)
d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
return edge;
}
function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
var edge = new d3_geom_voronoiEdge(lSite, null);
edge.a = va;
edge.b = vb;
d3_geom_voronoiEdges.push(edge);
return edge;
}
function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
if (!edge.a && !edge.b) {
edge.a = vertex;
edge.l = lSite;
edge.r = rSite;
} else if (edge.l === rSite) {
edge.b = vertex;
} else {
edge.a = vertex;
}
}
function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
var va = edge.a, vb = edge.b;
this.edge = edge;
this.site = lSite;
this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y);
}
d3_geom_voronoiHalfEdge.prototype = {
start: function () {
return this.edge.l === this.site ? this.edge.a : this.edge.b;
},
end: function () {
return this.edge.l === this.site ? this.edge.b : this.edge.a;
}
};
function d3_geom_voronoiRedBlackTree() {
this._ = null;
}
function d3_geom_voronoiRedBlackNode(node) {
node.U = node.C = node.L = node.R = node.P = node.N = null;
}
d3_geom_voronoiRedBlackTree.prototype = {
insert: function (after, node) {
var parent, grandpa, uncle;
if (after) {
node.P = after;
node.N = after.N;
if (after.N)
after.N.P = node;
after.N = node;
if (after.R) {
after = after.R;
while (after.L)
after = after.L;
after.L = node;
} else {
after.R = node;
}
parent = after;
} else if (this._) {
after = d3_geom_voronoiRedBlackFirst(this._);
node.P = null;
node.N = after;
after.P = after.L = node;
parent = after;
} else {
node.P = node.N = null;
this._ = node;
parent = null;
}
node.L = node.R = null;
node.U = parent;
node.C = true;
after = node;
while (parent && parent.C) {
grandpa = parent.U;
if (parent === grandpa.L) {
uncle = grandpa.R;
if (uncle && uncle.C) {
parent.C = uncle.C = false;
grandpa.C = true;
after = grandpa;
} else {
if (after === parent.R) {
d3_geom_voronoiRedBlackRotateLeft(this, parent);
after = parent;
parent = after.U;
}
parent.C = false;
grandpa.C = true;
d3_geom_voronoiRedBlackRotateRight(this, grandpa);
}
} else {
uncle = grandpa.L;
if (uncle && uncle.C) {
parent.C = uncle.C = false;
grandpa.C = true;
after = grandpa;
} else {
if (after === parent.L) {
d3_geom_voronoiRedBlackRotateRight(this, parent);
after = parent;
parent = after.U;
}
parent.C = false;
grandpa.C = true;
d3_geom_voronoiRedBlackRotateLeft(this, grandpa);
}
}
parent = after.U;
}
this._.C = false;
},
remove: function (node) {
if (node.N)
node.N.P = node.P;
if (node.P)
node.P.N = node.N;
node.N = node.P = null;
var parent = node.U, sibling, left = node.L, right = node.R, next, red;
if (!left)
next = right;
else if (!right)
next = left;
else
next = d3_geom_voronoiRedBlackFirst(right);
if (parent) {
if (parent.L === node)
parent.L = next;
else
parent.R = next;
} else {
this._ = next;
}
if (left && right) {
red = next.C;
next.C = node.C;
next.L = left;
left.U = next;
if (next !== right) {
parent = next.U;
next.U = node.U;
node = next.R;
parent.L = node;
next.R = right;
right.U = next;
} else {
next.U = parent;
parent = next;
node = next.R;
}
} else {
red = node.C;
node = next;
}
if (node)
node.U = parent;
if (red)
return;
if (node && node.C) {
node.C = false;
return;
}
do {
if (node === this._)
break;
if (node === parent.L) {
sibling = parent.R;
if (sibling.C) {
sibling.C = false;
parent.C = true;
d3_geom_voronoiRedBlackRotateLeft(this, parent);
sibling = parent.R;
}
if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
if (!sibling.R || !sibling.R.C) {
sibling.L.C = false;
sibling.C = true;
d3_geom_voronoiRedBlackRotateRight(this, sibling);
sibling = parent.R;
}
sibling.C = parent.C;
parent.C = sibling.R.C = false;
d3_geom_voronoiRedBlackRotateLeft(this, parent);
node = this._;
break;
}
} else {
sibling = parent.L;
if (sibling.C) {
sibling.C = false;
parent.C = true;
d3_geom_voronoiRedBlackRotateRight(this, parent);
sibling = parent.L;
}
if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
if (!sibling.L || !sibling.L.C) {
sibling.R.C = false;
sibling.C = true;
d3_geom_voronoiRedBlackRotateLeft(this, sibling);
sibling = parent.L;
}
sibling.C = parent.C;
parent.C = sibling.L.C = false;
d3_geom_voronoiRedBlackRotateRight(this, parent);
node = this._;
break;
}
}
sibling.C = true;
node = parent;
parent = parent.U;
} while (!node.C);
if (node)
node.C = false;
}
};
function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
var p = node, q = node.R, parent = p.U;
if (parent) {
if (parent.L === p)
parent.L = q;
else
parent.R = q;
} else {
tree._ = q;
}
q.U = parent;
p.U = q;
p.R = q.L;
if (p.R)
p.R.U = p;
q.L = p;
}
function d3_geom_voronoiRedBlackRotateRight(tree, node) {
var p = node, q = node.L, parent = p.U;
if (parent) {
if (parent.L === p)
parent.L = q;
else
parent.R = q;
} else {
tree._ = q;
}
q.U = parent;
p.U = q;
p.L = q.R;
if (p.L)
p.L.U = p;
q.R = p;
}
function d3_geom_voronoiRedBlackFirst(node) {
while (node.L)
node = node.L;
return node;
}
function d3_geom_voronoi(sites, bbox) {
var site = sites.sort(d3_geom_voronoiVertexOrder).pop(), x0, y0, circle;
d3_geom_voronoiEdges = [];
d3_geom_voronoiCells = new Array(sites.length);
d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree();
d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree();
while (true) {
circle = d3_geom_voronoiFirstCircle;
if (site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) {
if (site.x !== x0 || site.y !== y0) {
d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
d3_geom_voronoiAddBeach(site);
x0 = site.x, y0 = site.y;
}
site = sites.pop();
} else if (circle) {
d3_geom_voronoiRemoveBeach(circle.arc);
} else {
break;
}
}
if (bbox)
d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
var diagram = {
cells: d3_geom_voronoiCells,
edges: d3_geom_voronoiEdges
};
d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null;
return diagram;
}
function d3_geom_voronoiVertexOrder(a, b) {
return b.y - a.y || b.x - a.x;
}
d3.geom.voronoi = function (points) {
var x = d3_geom_pointX, y = d3_geom_pointY, fx = x, fy = y, clipExtent = d3_geom_voronoiClipExtent;
if (points)
return voronoi(points);
function voronoi(data) {
var polygons = new Array(data.length), x0 = clipExtent[0][0], y0 = clipExtent[0][1], x1 = clipExtent[1][0], y1 = clipExtent[1][1];
d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function (cell, i) {
var edges = cell.edges, site = cell.site, polygon = polygons[i] = edges.length ? edges.map(function (e) {
var s = e.start();
return [
s.x,
s.y
];
}) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [
[
x0,
y1
],
[
x1,
y1
],
[
x1,
y0
],
[
x0,
y0
]
] : [];
polygon.point = data[i];
});
return polygons;
}
function sites(data) {
return data.map(function (d, i) {
return {
x: Math.round(fx(d, i) / ε) * ε,
y: Math.round(fy(d, i) / ε) * ε,
i: i
};
});
}
voronoi.links = function (data) {
return d3_geom_voronoi(sites(data)).edges.filter(function (edge) {
return edge.l && edge.r;
}).map(function (edge) {
return {
source: data[edge.l.i],
target: data[edge.r.i]
};
});
};
voronoi.triangles = function (data) {
var triangles = [];
d3_geom_voronoi(sites(data)).cells.forEach(function (cell, i) {
var site = cell.site, edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder), j = -1, m = edges.length, e0, s0, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l;
while (++j < m) {
e0 = e1;
s0 = s1;
e1 = edges[j].edge;
s1 = e1.l === site ? e1.r : e1.l;
if (i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0) {
triangles.push([
data[i],
data[s0.i],
data[s1.i]
]);
}
}
});
return triangles;
};
voronoi.x = function (_) {
return arguments.length ? (fx = d3_functor(x = _), voronoi) : x;
};
voronoi.y = function (_) {
return arguments.length ? (fy = d3_functor(y = _), voronoi) : y;
};
voronoi.clipExtent = function (_) {
if (!arguments.length)
return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent;
clipExtent = _ == null ? d3_geom_voronoiClipExtent : _;
return voronoi;
};
voronoi.size = function (_) {
if (!arguments.length)
return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1];
return voronoi.clipExtent(_ && [
[
0,
0
],
_
]);
};
return voronoi;
};
var d3_geom_voronoiClipExtent = [
[
-1000000,
-1000000
],
[
1000000,
1000000
]
];
function d3_geom_voronoiTriangleArea(a, b, c) {
return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y);
}
d3.geom.delaunay = function (vertices) {
return d3.geom.voronoi().triangles(vertices);
};
d3.geom.quadtree = function (points, x1, y1, x2, y2) {
var x = d3_geom_pointX, y = d3_geom_pointY, compat;
if (compat = arguments.length) {
x = d3_geom_quadtreeCompatX;
y = d3_geom_quadtreeCompatY;
if (compat === 3) {
y2 = y1;
x2 = x1;
y1 = x1 = 0;
}
return quadtree(points);
}
function quadtree(data) {
var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
if (x1 != null) {
x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
} else {
x2_ = y2_ = -(x1_ = y1_ = Infinity);
xs = [], ys = [];
n = data.length;
if (compat)
for (i = 0; i < n; ++i) {
d = data[i];
if (d.x < x1_)
x1_ = d.x;
if (d.y < y1_)
y1_ = d.y;
if (d.x > x2_)
x2_ = d.x;
if (d.y > y2_)
y2_ = d.y;
xs.push(d.x);
ys.push(d.y);
}
else
for (i = 0; i < n; ++i) {
var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
if (x_ < x1_)
x1_ = x_;
if (y_ < y1_)
y1_ = y_;
if (x_ > x2_)
x2_ = x_;
if (y_ > y2_)
y2_ = y_;
xs.push(x_);
ys.push(y_);
}
}
var dx = x2_ - x1_, dy = y2_ - y1_;
if (dx > dy)
y2_ = y1_ + dx;
else
x2_ = x1_ + dy;
function insert(n, d, x, y, x1, y1, x2, y2) {
if (isNaN(x) || isNaN(y))
return;
if (n.leaf) {
var nx = n.x, ny = n.y;
if (nx != null) {
if (abs(nx - x) + abs(ny - y) < 0.01) {
insertChild(n, d, x, y, x1, y1, x2, y2);
} else {
var nPoint = n.point;
n.x = n.y = n.point = null;
insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
insertChild(n, d, x, y, x1, y1, x2, y2);
}
} else {
n.x = x, n.y = y, n.point = d;
}
} else {
insertChild(n, d, x, y, x1, y1, x2, y2);
}
}
function insertChild(n, d, x, y, x1, y1, x2, y2) {
var xm = (x1 + x2) * 0.5, ym = (y1 + y2) * 0.5, right = x >= xm, below = y >= ym, i = below << 1 | right;
n.leaf = false;
n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
if (right)
x1 = xm;
else
x2 = xm;
if (below)
y1 = ym;
else
y2 = ym;
insert(n, d, x, y, x1, y1, x2, y2);
}
var root = d3_geom_quadtreeNode();
root.add = function (d) {
insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_);
};
root.visit = function (f) {
d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
};
root.find = function (point) {
return d3_geom_quadtreeFind(root, point[0], point[1], x1_, y1_, x2_, y2_);
};
i = -1;
if (x1 == null) {
while (++i < n) {
insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
}
--i;
} else
data.forEach(root.add);
xs = ys = data = d = null;
return root;
}
quadtree.x = function (_) {
return arguments.length ? (x = _, quadtree) : x;
};
quadtree.y = function (_) {
return arguments.length ? (y = _, quadtree) : y;
};
quadtree.extent = function (_) {
if (!arguments.length)
return x1 == null ? null : [
[
x1,
y1
],
[
x2,
y2
]
];
if (_ == null)
x1 = y1 = x2 = y2 = null;
else
x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1];
return quadtree;
};
quadtree.size = function (_) {
if (!arguments.length)
return x1 == null ? null : [
x2 - x1,
y2 - y1
];
if (_ == null)
x1 = y1 = x2 = y2 = null;
else
x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
return quadtree;
};
return quadtree;
};
function d3_geom_quadtreeCompatX(d) {
return d.x;
}
function d3_geom_quadtreeCompatY(d) {
return d.y;
}
function d3_geom_quadtreeNode() {
return {
leaf: true,
nodes: [],
point: null,
x: null,
y: null
};
}
function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
if (!f(node, x1, y1, x2, y2)) {
var sx = (x1 + x2) * 0.5, sy = (y1 + y2) * 0.5, children = node.nodes;
if (children[0])
d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
if (children[1])
d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
if (children[2])
d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
if (children[3])
d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
}
}
function d3_geom_quadtreeFind(root, x, y, x0, y0, x3, y3) {
var minDistance2 = Infinity, closestPoint;
(function find(node, x1, y1, x2, y2) {
if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0)
return;
if (point = node.point) {
var point, dx = x - node.x, dy = y - node.y, distance2 = dx * dx + dy * dy;
if (distance2 < minDistance2) {
var distance = Math.sqrt(minDistance2 = distance2);
x0 = x - distance, y0 = y - distance;
x3 = x + distance, y3 = y + distance;
closestPoint = point;
}
}
var children = node.nodes, xm = (x1 + x2) * 0.5, ym = (y1 + y2) * 0.5, right = x >= xm, below = y >= ym;
for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
if (node = children[i & 3])
switch (i & 3) {
case 0:
find(node, x1, y1, xm, ym);
break;
case 1:
find(node, xm, y1, x2, ym);
break;
case 2:
find(node, x1, ym, xm, y2);
break;
case 3:
find(node, xm, ym, x2, y2);
break;
}
}
}(root, x0, y0, x3, y3));
return closestPoint;
}
d3.interpolateRgb = d3_interpolateRgb;
function d3_interpolateRgb(a, b) {
a = d3.rgb(a);
b = d3.rgb(b);
var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
return function (t) {
return '#' + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
};
}
d3.interpolateObject = d3_interpolateObject;
function d3_interpolateObject(a, b) {
var i = {}, c = {}, k;
for (k in a) {
if (k in b) {
i[k] = d3_interpolate(a[k], b[k]);
} else {
c[k] = a[k];
}
}
for (k in b) {
if (!(k in a)) {
c[k] = b[k];
}
}
return function (t) {
for (k in i)
c[k] = i[k](t);
return c;
};
}
d3.interpolateNumber = d3_interpolateNumber;
function d3_interpolateNumber(a, b) {
a = +a, b = +b;
return function (t) {
return a * (1 - t) + b * t;
};
}
d3.interpolateString = d3_interpolateString;
function d3_interpolateString(a, b) {
var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
a = a + '', b = b + '';
while ((am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b))) {
if ((bs = bm.index) > bi) {
bs = b.slice(bi, bs);
if (s[i])
s[i] += bs;
else
s[++i] = bs;
}
if ((am = am[0]) === (bm = bm[0])) {
if (s[i])
s[i] += bm;
else
s[++i] = bm;
} else {
s[++i] = null;
q.push({
i: i,
x: d3_interpolateNumber(am, bm)
});
}
bi = d3_interpolate_numberB.lastIndex;
}
if (bi < b.length) {
bs = b.slice(bi);
if (s[i])
s[i] += bs;
else
s[++i] = bs;
}
return s.length < 2 ? q[0] ? (b = q[0].x, function (t) {
return b(t) + '';
}) : function () {
return b;
} : (b = q.length, function (t) {
for (var i = 0, o; i < b; ++i)
s[(o = q[i]).i] = o.x(t);
return s.join('');
});
}
var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, 'g');
d3.interpolate = d3_interpolate;
function d3_interpolate(a, b) {
var i = d3.interpolators.length, f;
while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
return f;
}
d3.interpolators = [function (a, b) {
var t = typeof b;
return (t === 'string' ? d3_rgb_names.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === 'object' && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b);
}];
d3.interpolateArray = d3_interpolateArray;
function d3_interpolateArray(a, b) {
var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
for (i = 0; i < n0; ++i)
x.push(d3_interpolate(a[i], b[i]));
for (; i < na; ++i)
c[i] = a[i];
for (; i < nb; ++i)
c[i] = b[i];
return function (t) {
for (i = 0; i < n0; ++i)
c[i] = x[i](t);
return c;
};
}
var d3_ease_default = function () {
return d3_identity;
};
var d3_ease = d3.map({
linear: d3_ease_default,
poly: d3_ease_poly,
quad: function () {
return d3_ease_quad;
},
cubic: function () {
return d3_ease_cubic;
},
sin: function () {
return d3_ease_sin;
},
exp: function () {
return d3_ease_exp;
},
circle: function () {
return d3_ease_circle;
},
elastic: d3_ease_elastic,
back: d3_ease_back,
bounce: function () {
return d3_ease_bounce;
}
});
var d3_ease_mode = d3.map({
'in': d3_identity,
out: d3_ease_reverse,
'in-out': d3_ease_reflect,
'out-in': function (f) {
return d3_ease_reflect(d3_ease_reverse(f));
}
});
d3.ease = function (name) {
var i = name.indexOf('-'), t = i >= 0 ? name.slice(0, i) : name, m = i >= 0 ? name.slice(i + 1) : 'in';
t = d3_ease.get(t) || d3_ease_default;
m = d3_ease_mode.get(m) || d3_identity;
return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
};
function d3_ease_clamp(f) {
return function (t) {
return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
};
}
function d3_ease_reverse(f) {
return function (t) {
return 1 - f(1 - t);
};
}
function d3_ease_reflect(f) {
return function (t) {
return 0.5 * (t < 0.5 ? f(2 * t) : 2 - f(2 - 2 * t));
};
}
function d3_ease_quad(t) {
return t * t;
}
function d3_ease_cubic(t) {
return t * t * t;
}
function d3_ease_cubicInOut(t) {
if (t <= 0)
return 0;
if (t >= 1)
return 1;
var t2 = t * t, t3 = t2 * t;
return 4 * (t < 0.5 ? t3 : 3 * (t - t2) + t3 - 0.75);
}
function d3_ease_poly(e) {
return function (t) {
return Math.pow(t, e);
};
}
function d3_ease_sin(t) {
return 1 - Math.cos(t * halfπ);
}
function d3_ease_exp(t) {
return Math.pow(2, 10 * (t - 1));
}
function d3_ease_circle(t) {
return 1 - Math.sqrt(1 - t * t);
}
function d3_ease_elastic(a, p) {
var s;
if (arguments.length < 2)
p = 0.45;
if (arguments.length)
s = p / τ * Math.asin(1 / a);
else
a = 1, s = p / 4;
return function (t) {
return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p);
};
}
function d3_ease_back(s) {
if (!s)
s = 1.70158;
return function (t) {
return t * t * ((s + 1) * t - s);
};
}
function d3_ease_bounce(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
}
d3.interpolateHcl = d3_interpolateHcl;
function d3_interpolateHcl(a, b) {
a = d3.hcl(a);
b = d3.hcl(b);
var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
if (isNaN(bc))
bc = 0, ac = isNaN(ac) ? b.c : ac;
if (isNaN(bh))
bh = 0, ah = isNaN(ah) ? b.h : ah;
else if (bh > 180)
bh -= 360;
else if (bh < -180)
bh += 360;
return function (t) {
return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + '';
};
}
d3.interpolateHsl = d3_interpolateHsl;
function d3_interpolateHsl(a, b) {
a = d3.hsl(a);
b = d3.hsl(b);
var ah = a.h, as = a.s, al = a.l, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
if (isNaN(bs))
bs = 0, as = isNaN(as) ? b.s : as;
if (isNaN(bh))
bh = 0, ah = isNaN(ah) ? b.h : ah;
else if (bh > 180)
bh -= 360;
else if (bh < -180)
bh += 360;
return function (t) {
return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + '';
};
}
d3.interpolateLab = d3_interpolateLab;
function d3_interpolateLab(a, b) {
a = d3.lab(a);
b = d3.lab(b);
var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
return function (t) {
return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + '';
};
}
d3.interpolateRound = d3_interpolateRound;
function d3_interpolateRound(a, b) {
b -= a;
return function (t) {
return Math.round(a + b * t);
};
}
d3.transform = function (string) {
var g = d3_document.createElementNS(d3.ns.prefix.svg, 'g');
return (d3.transform = function (string) {
if (string != null) {
g.setAttribute('transform', string);
var t = g.transform.baseVal.consolidate();
}
return new d3_transform(t ? t.matrix : d3_transformIdentity);
})(string);
};
function d3_transform(m) {
var r0 = [
m.a,
m.b
], r1 = [
m.c,
m.d
], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
if (r0[0] * r1[1] < r1[0] * r0[1]) {
r0[0] *= -1;
r0[1] *= -1;
kx *= -1;
kz *= -1;
}
this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
this.translate = [
m.e,
m.f
];
this.scale = [
kx,
ky
];
this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
}
d3_transform.prototype.toString = function () {
return 'translate(' + this.translate + ')rotate(' + this.rotate + ')skewX(' + this.skew + ')scale(' + this.scale + ')';
};
function d3_transformDot(a, b) {
return a[0] * b[0] + a[1] * b[1];
}
function d3_transformNormalize(a) {
var k = Math.sqrt(d3_transformDot(a, a));
if (k) {
a[0] /= k;
a[1] /= k;
}
return k;
}
function d3_transformCombine(a, b, k) {
a[0] += k * b[0];
a[1] += k * b[1];
return a;
}
var d3_transformIdentity = {
a: 1,
b: 0,
c: 0,
d: 1,
e: 0,
f: 0
};
d3.interpolateTransform = d3_interpolateTransform;
function d3_interpolateTransform(a, b) {
var s = [], q = [], n, A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
if (ta[0] != tb[0] || ta[1] != tb[1]) {
s.push('translate(', null, ',', null, ')');
q.push({
i: 1,
x: d3_interpolateNumber(ta[0], tb[0])
}, {
i: 3,
x: d3_interpolateNumber(ta[1], tb[1])
});
} else if (tb[0] || tb[1]) {
s.push('translate(' + tb + ')');
} else {
s.push('');
}
if (ra != rb) {
if (ra - rb > 180)
rb += 360;
else if (rb - ra > 180)
ra += 360;
q.push({
i: s.push(s.pop() + 'rotate(', null, ')') - 2,
x: d3_interpolateNumber(ra, rb)
});
} else if (rb) {
s.push(s.pop() + 'rotate(' + rb + ')');
}
if (wa != wb) {
q.push({
i: s.push(s.pop() + 'skewX(', null, ')') - 2,
x: d3_interpolateNumber(wa, wb)
});
} else if (wb) {
s.push(s.pop() + 'skewX(' + wb + ')');
}
if (ka[0] != kb[0] || ka[1] != kb[1]) {
n = s.push(s.pop() + 'scale(', null, ',', null, ')');
q.push({
i: n - 4,
x: d3_interpolateNumber(ka[0], kb[0])
}, {
i: n - 2,
x: d3_interpolateNumber(ka[1], kb[1])
});
} else if (kb[0] != 1 || kb[1] != 1) {
s.push(s.pop() + 'scale(' + kb + ')');
}
n = q.length;
return function (t) {
var i = -1, o;
while (++i < n)
s[(o = q[i]).i] = o.x(t);
return s.join('');
};
}
function d3_uninterpolateNumber(a, b) {
b = (b -= a = +a) || 1 / b;
return function (x) {
return (x - a) / b;
};
}
function d3_uninterpolateClamp(a, b) {
b = (b -= a = +a) || 1 / b;
return function (x) {
return Math.max(0, Math.min(1, (x - a) / b));
};
}
d3.layout = {};
d3.layout.bundle = function () {
return function (links) {
var paths = [], i = -1, n = links.length;
while (++i < n)
paths.push(d3_layout_bundlePath(links[i]));
return paths;
};
};
function d3_layout_bundlePath(link) {
var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [start];
while (start !== lca) {
start = start.parent;
points.push(start);
}
var k = points.length;
while (end !== lca) {
points.splice(k, 0, end);
end = end.parent;
}
return points;
}
function d3_layout_bundleAncestors(node) {
var ancestors = [], parent = node.parent;
while (parent != null) {
ancestors.push(node);
node = parent;
parent = parent.parent;
}
ancestors.push(node);
return ancestors;
}
function d3_layout_bundleLeastCommonAncestor(a, b) {
if (a === b)
return a;
var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
while (aNode === bNode) {
sharedNode = aNode;
aNode = aNodes.pop();
bNode = bNodes.pop();
}
return sharedNode;
}
d3.layout.chord = function () {
var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
function relayout() {
var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
chords = [];
groups = [];
k = 0, i = -1;
while (++i < n) {
x = 0, j = -1;
while (++j < n) {
x += matrix[i][j];
}
groupSums.push(x);
subgroupIndex.push(d3.range(n));
k += x;
}
if (sortGroups) {
groupIndex.sort(function (a, b) {
return sortGroups(groupSums[a], groupSums[b]);
});
}
if (sortSubgroups) {
subgroupIndex.forEach(function (d, i) {
d.sort(function (a, b) {
return sortSubgroups(matrix[i][a], matrix[i][b]);
});
});
}
k = (τ - padding * n) / k;
x = 0, i = -1;
while (++i < n) {
x0 = x, j = -1;
while (++j < n) {
var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
subgroups[di + '-' + dj] = {
index: di,
subindex: dj,
startAngle: a0,
endAngle: a1,
value: v
};
}
groups[di] = {
index: di,
startAngle: x0,
endAngle: x,
value: (x - x0) / k
};
x += padding;
}
i = -1;
while (++i < n) {
j = i - 1;
while (++j < n) {
var source = subgroups[i + '-' + j], target = subgroups[j + '-' + i];
if (source.value || target.value) {
chords.push(source.value < target.value ? {
source: target,
target: source
} : {
source: source,
target: target
});
}
}
}
if (sortChords)
resort();
}
function resort() {
chords.sort(function (a, b) {
return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
});
}
chord.matrix = function (x) {
if (!arguments.length)
return matrix;
n = (matrix = x) && matrix.length;
chords = groups = null;
return chord;
};
chord.padding = function (x) {
if (!arguments.length)
return padding;
padding = x;
chords = groups = null;
return chord;
};
chord.sortGroups = function (x) {
if (!arguments.length)
return sortGroups;
sortGroups = x;
chords = groups = null;
return chord;
};
chord.sortSubgroups = function (x) {
if (!arguments.length)
return sortSubgroups;
sortSubgroups = x;
chords = null;
return chord;
};
chord.sortChords = function (x) {
if (!arguments.length)
return sortChords;
sortChords = x;
if (chords)
resort();
return chord;
};
chord.chords = function () {
if (!chords)
relayout();
return chords;
};
chord.groups = function () {
if (!groups)
relayout();
return groups;
};
return chord;
};
d3.layout.force = function () {
var force = {}, event = d3.dispatch('start', 'tick', 'end'), size = [
1,
1
], drag, alpha, friction = 0.9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, chargeDistance2 = d3_layout_forceChargeDistance2, gravity = 0.1, theta2 = 0.64, nodes = [], links = [], distances, strengths, charges;
function repulse(node) {
return function (quad, x1, _, x2) {
if (quad.point !== node) {
var dx = quad.cx - node.x, dy = quad.cy - node.y, dw = x2 - x1, dn = dx * dx + dy * dy;
if (dw * dw / theta2 < dn) {
if (dn < chargeDistance2) {
var k = quad.charge / dn;
node.px -= dx * k;
node.py -= dy * k;
}
return true;
}
if (quad.point && dn && dn < chargeDistance2) {
var k = quad.pointCharge / dn;
node.px -= dx * k;
node.py -= dy * k;
}
}
return !quad.charge;
};
}
force.tick = function () {
if ((alpha *= 0.99) < 0.005) {
event.end({
type: 'end',
alpha: alpha = 0
});
return true;
}
var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
for (i = 0; i < m; ++i) {
o = links[i];
s = o.source;
t = o.target;
x = t.x - s.x;
y = t.y - s.y;
if (l = x * x + y * y) {
l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
x *= l;
y *= l;
t.x -= x * (k = s.weight / (t.weight + s.weight));
t.y -= y * k;
s.x += x * (k = 1 - k);
s.y += y * k;
}
}
if (k = alpha * gravity) {
x = size[0] / 2;
y = size[1] / 2;
i = -1;
if (k)
while (++i < n) {
o = nodes[i];
o.x += (x - o.x) * k;
o.y += (y - o.y) * k;
}
}
if (charge) {
d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
i = -1;
while (++i < n) {
if (!(o = nodes[i]).fixed) {
q.visit(repulse(o));
}
}
}
i = -1;
while (++i < n) {
o = nodes[i];
if (o.fixed) {
o.x = o.px;
o.y = o.py;
} else {
o.x -= (o.px - (o.px = o.x)) * friction;
o.y -= (o.py - (o.py = o.y)) * friction;
}
}
event.tick({
type: 'tick',
alpha: alpha
});
};
force.nodes = function (x) {
if (!arguments.length)
return nodes;
nodes = x;
return force;
};
force.links = function (x) {
if (!arguments.length)
return links;
links = x;
return force;
};
force.size = function (x) {
if (!arguments.length)
return size;
size = x;
return force;
};
force.linkDistance = function (x) {
if (!arguments.length)
return linkDistance;
linkDistance = typeof x === 'function' ? x : +x;
return force;
};
force.distance = force.linkDistance;
force.linkStrength = function (x) {
if (!arguments.length)
return linkStrength;
linkStrength = typeof x === 'function' ? x : +x;
return force;
};
force.friction = function (x) {
if (!arguments.length)
return friction;
friction = +x;
return force;
};
force.charge = function (x) {
if (!arguments.length)
return charge;
charge = typeof x === 'function' ? x : +x;
return force;
};
force.chargeDistance = function (x) {
if (!arguments.length)
return Math.sqrt(chargeDistance2);
chargeDistance2 = x * x;
return force;
};
force.gravity = function (x) {
if (!arguments.length)
return gravity;
gravity = +x;
return force;
};
force.theta = function (x) {
if (!arguments.length)
return Math.sqrt(theta2);
theta2 = x * x;
return force;
};
force.alpha = function (x) {
if (!arguments.length)
return alpha;
x = +x;
if (alpha) {
if (x > 0)
alpha = x;
else
alpha = 0;
} else if (x > 0) {
event.start({
type: 'start',
alpha: alpha = x
});
d3.timer(force.tick);
}
return force;
};
force.start = function () {
var i, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
for (i = 0; i < n; ++i) {
(o = nodes[i]).index = i;
o.weight = 0;
}
for (i = 0; i < m; ++i) {
o = links[i];
if (typeof o.source == 'number')
o.source = nodes[o.source];
if (typeof o.target == 'number')
o.target = nodes[o.target];
++o.source.weight;
++o.target.weight;
}
for (i = 0; i < n; ++i) {
o = nodes[i];
if (isNaN(o.x))
o.x = position('x', w);
if (isNaN(o.y))
o.y = position('y', h);
if (isNaN(o.px))
o.px = o.x;
if (isNaN(o.py))
o.py = o.y;
}
distances = [];
if (typeof linkDistance === 'function')
for (i = 0; i < m; ++i)
distances[i] = +linkDistance.call(this, links[i], i);
else
for (i = 0; i < m; ++i)
distances[i] = linkDistance;
strengths = [];
if (typeof linkStrength === 'function')
for (i = 0; i < m; ++i)
strengths[i] = +linkStrength.call(this, links[i], i);
else
for (i = 0; i < m; ++i)
strengths[i] = linkStrength;
charges = [];
if (typeof charge === 'function')
for (i = 0; i < n; ++i)
charges[i] = +charge.call(this, nodes[i], i);
else
for (i = 0; i < n; ++i)
charges[i] = charge;
function position(dimension, size) {
if (!neighbors) {
neighbors = new Array(n);
for (j = 0; j < n; ++j) {
neighbors[j] = [];
}
for (j = 0; j < m; ++j) {
var o = links[j];
neighbors[o.source.index].push(o.target);
neighbors[o.target.index].push(o.source);
}
}
var candidates = neighbors[i], j = -1, l = candidates.length, x;
while (++j < l)
if (!isNaN(x = candidates[j][dimension]))
return x;
return Math.random() * size;
}
return force.resume();
};
force.resume = function () {
return force.alpha(0.1);
};
force.stop = function () {
return force.alpha(0);
};
force.drag = function () {
if (!drag)
drag = d3.behavior.drag().origin(d3_identity).on('dragstart.force', d3_layout_forceDragstart).on('drag.force', dragmove).on('dragend.force', d3_layout_forceDragend);
if (!arguments.length)
return drag;
this.on('mouseover.force', d3_layout_forceMouseover).on('mouseout.force', d3_layout_forceMouseout).call(drag);
};
function dragmove(d) {
d.px = d3.event.x, d.py = d3.event.y;
force.resume();
}
return d3.rebind(force, event, 'on');
};
function d3_layout_forceDragstart(d) {
d.fixed |= 2;
}
function d3_layout_forceDragend(d) {
d.fixed &= ~6;
}
function d3_layout_forceMouseover(d) {
d.fixed |= 4;
d.px = d.x, d.py = d.y;
}
function d3_layout_forceMouseout(d) {
d.fixed &= ~4;
}
function d3_layout_forceAccumulate(quad, alpha, charges) {
var cx = 0, cy = 0;
quad.charge = 0;
if (!quad.leaf) {
var nodes = quad.nodes, n = nodes.length, i = -1, c;
while (++i < n) {
c = nodes[i];
if (c == null)
continue;
d3_layout_forceAccumulate(c, alpha, charges);
quad.charge += c.charge;
cx += c.charge * c.cx;
cy += c.charge * c.cy;
}
}
if (quad.point) {
if (!quad.leaf) {
quad.point.x += Math.random() - 0.5;
quad.point.y += Math.random() - 0.5;
}
var k = alpha * charges[quad.point.index];
quad.charge += quad.pointCharge = k;
cx += k * quad.point.x;
cy += k * quad.point.y;
}
quad.cx = cx / quad.charge;
quad.cy = cy / quad.charge;
}
var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1, d3_layout_forceChargeDistance2 = Infinity;
d3.layout.hierarchy = function () {
var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
function hierarchy(root) {
var stack = [root], nodes = [], node;
root.depth = 0;
while ((node = stack.pop()) != null) {
nodes.push(node);
if ((childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
var n, childs, child;
while (--n >= 0) {
stack.push(child = childs[n]);
child.parent = node;
child.depth = node.depth + 1;
}
if (value)
node.value = 0;
node.children = childs;
} else {
if (value)
node.value = +value.call(hierarchy, node, node.depth) || 0;
delete node.children;
}
}
d3_layout_hierarchyVisitAfter(root, function (node) {
var childs, parent;
if (sort && (childs = node.children))
childs.sort(sort);
if (value && (parent = node.parent))
parent.value += node.value;
});
return nodes;
}
hierarchy.sort = function (x) {
if (!arguments.length)
return sort;
sort = x;
return hierarchy;
};
hierarchy.children = function (x) {
if (!arguments.length)
return children;
children = x;
return hierarchy;
};
hierarchy.value = function (x) {
if (!arguments.length)
return value;
value = x;
return hierarchy;
};
hierarchy.revalue = function (root) {
if (value) {
d3_layout_hierarchyVisitBefore(root, function (node) {
if (node.children)
node.value = 0;
});
d3_layout_hierarchyVisitAfter(root, function (node) {
var parent;
if (!node.children)
node.value = +value.call(hierarchy, node, node.depth) || 0;
if (parent = node.parent)
parent.value += node.value;
});
}
return root;
};
return hierarchy;
};
function d3_layout_hierarchyRebind(object, hierarchy) {
d3.rebind(object, hierarchy, 'sort', 'children', 'value');
object.nodes = object;
object.links = d3_layout_hierarchyLinks;
return object;
}
function d3_layout_hierarchyVisitBefore(node, callback) {
var nodes = [node];
while ((node = nodes.pop()) != null) {
callback(node);
if ((children = node.children) && (n = children.length)) {
var n, children;
while (--n >= 0)
nodes.push(children[n]);
}
}
}
function d3_layout_hierarchyVisitAfter(node, callback) {
var nodes = [node], nodes2 = [];
while ((node = nodes.pop()) != null) {
nodes2.push(node);
if ((children = node.children) && (n = children.length)) {
var i = -1, n, children;
while (++i < n)
nodes.push(children[i]);
}
}
while ((node = nodes2.pop()) != null) {
callback(node);
}
}
function d3_layout_hierarchyChildren(d) {
return d.children;
}
function d3_layout_hierarchyValue(d) {
return d.value;
}
function d3_layout_hierarchySort(a, b) {
return b.value - a.value;
}
function d3_layout_hierarchyLinks(nodes) {
return d3.merge(nodes.map(function (parent) {
return (parent.children || []).map(function (child) {
return {
source: parent,
target: child
};
});
}));
}
d3.layout.partition = function () {
var hierarchy = d3.layout.hierarchy(), size = [
1,
1
];
function position(node, x, dx, dy) {
var children = node.children;
node.x = x;
node.y = node.depth * dy;
node.dx = dx;
node.dy = dy;
if (children && (n = children.length)) {
var i = -1, n, c, d;
dx = node.value ? dx / node.value : 0;
while (++i < n) {
position(c = children[i], x, d = c.value * dx, dy);
x += d;
}
}
}
function depth(node) {
var children = node.children, d = 0;
if (children && (n = children.length)) {
var i = -1, n;
while (++i < n)
d = Math.max(d, depth(children[i]));
}
return 1 + d;
}
function partition(d, i) {
var nodes = hierarchy.call(this, d, i);
position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
return nodes;
}
partition.size = function (x) {
if (!arguments.length)
return size;
size = x;
return partition;
};
return d3_layout_hierarchyRebind(partition, hierarchy);
};
d3.layout.pie = function () {
var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = τ, padAngle = 0;
function pie(data) {
var n = data.length, values = data.map(function (d, i) {
return +value.call(pie, d, i);
}), a = +(typeof startAngle === 'function' ? startAngle.apply(this, arguments) : startAngle), da = (typeof endAngle === 'function' ? endAngle.apply(this, arguments) : endAngle) - a, p = Math.min(Math.abs(da) / n, +(typeof padAngle === 'function' ? padAngle.apply(this, arguments) : padAngle)), pa = p * (da < 0 ? -1 : 1), k = (da - n * pa) / d3.sum(values), index = d3.range(n), arcs = [], v;
if (sort != null)
index.sort(sort === d3_layout_pieSortByValue ? function (i, j) {
return values[j] - values[i];
} : function (i, j) {
return sort(data[i], data[j]);
});
index.forEach(function (i) {
arcs[i] = {
data: data[i],
value: v = values[i],
startAngle: a,
endAngle: a += v * k + pa,
padAngle: p
};
});
return arcs;
}
pie.value = function (_) {
if (!arguments.length)
return value;
value = _;
return pie;
};
pie.sort = function (_) {
if (!arguments.length)
return sort;
sort = _;
return pie;
};
pie.startAngle = function (_) {
if (!arguments.length)
return startAngle;
startAngle = _;
return pie;
};
pie.endAngle = function (_) {
if (!arguments.length)
return endAngle;
endAngle = _;
return pie;
};
pie.padAngle = function (_) {
if (!arguments.length)
return padAngle;
padAngle = _;
return pie;
};
return pie;
};
var d3_layout_pieSortByValue = {};
d3.layout.stack = function () {
var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
function stack(data, index) {
if (!(n = data.length))
return data;
var series = data.map(function (d, i) {
return values.call(stack, d, i);
});
var points = series.map(function (d) {
return d.map(function (v, i) {
return [
x.call(stack, v, i),
y.call(stack, v, i)
];
});
});
var orders = order.call(stack, points, index);
series = d3.permute(series, orders);
points = d3.permute(points, orders);
var offsets = offset.call(stack, points, index);
var m = series[0].length, n, i, j, o;
for (j = 0; j < m; ++j) {
out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
for (i = 1; i < n; ++i) {
out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
}
}
return data;
}
stack.values = function (x) {
if (!arguments.length)
return values;
values = x;
return stack;
};
stack.order = function (x) {
if (!arguments.length)
return order;
order = typeof x === 'function' ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
return stack;
};
stack.offset = function (x) {
if (!arguments.length)
return offset;
offset = typeof x === 'function' ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
return stack;
};
stack.x = function (z) {
if (!arguments.length)
return x;
x = z;
return stack;
};
stack.y = function (z) {
if (!arguments.length)
return y;
y = z;
return stack;
};
stack.out = function (z) {
if (!arguments.length)
return out;
out = z;
return stack;
};
return stack;
};
function d3_layout_stackX(d) {
return d.x;
}
function d3_layout_stackY(d) {
return d.y;
}
function d3_layout_stackOut(d, y0, y) {
d.y0 = y0;
d.y = y;
}
var d3_layout_stackOrders = d3.map({
'inside-out': function (data) {
var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function (a, b) {
return max[a] - max[b];
}), top = 0, bottom = 0, tops = [], bottoms = [];
for (i = 0; i < n; ++i) {
j = index[i];
if (top < bottom) {
top += sums[j];
tops.push(j);
} else {
bottom += sums[j];
bottoms.push(j);
}
}
return bottoms.reverse().concat(tops);
},
reverse: function (data) {
return d3.range(data.length).reverse();
},
'default': d3_layout_stackOrderDefault
});
var d3_layout_stackOffsets = d3.map({
silhouette: function (data) {
var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
for (j = 0; j < m; ++j) {
for (i = 0, o = 0; i < n; i++)
o += data[i][j][1];
if (o > max)
max = o;
sums.push(o);
}
for (j = 0; j < m; ++j) {
y0[j] = (max - sums[j]) / 2;
}
return y0;
},
wiggle: function (data) {
var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
y0[0] = o = o0 = 0;
for (j = 1; j < m; ++j) {
for (i = 0, s1 = 0; i < n; ++i)
s1 += data[i][j][1];
for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
}
s2 += s3 * data[i][j][1];
}
y0[j] = o -= s1 ? s2 / s1 * dx : 0;
if (o < o0)
o0 = o;
}
for (j = 0; j < m; ++j)
y0[j] -= o0;
return y0;
},
expand: function (data) {
var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
for (j = 0; j < m; ++j) {
for (i = 0, o = 0; i < n; i++)
o += data[i][j][1];
if (o)
for (i = 0; i < n; i++)
data[i][j][1] /= o;
else
for (i = 0; i < n; i++)
data[i][j][1] = k;
}
for (j = 0; j < m; ++j)
y0[j] = 0;
return y0;
},
zero: d3_layout_stackOffsetZero
});
function d3_layout_stackOrderDefault(data) {
return d3.range(data.length);
}
function d3_layout_stackOffsetZero(data) {
var j = -1, m = data[0].length, y0 = [];
while (++j < m)
y0[j] = 0;
return y0;
}
function d3_layout_stackMaxIndex(array) {
var i = 1, j = 0, v = array[0][1], k, n = array.length;
for (; i < n; ++i) {
if ((k = array[i][1]) > v) {
j = i;
v = k;
}
}
return j;
}
function d3_layout_stackReduceSum(d) {
return d.reduce(d3_layout_stackSum, 0);
}
function d3_layout_stackSum(p, d) {
return p + d[1];
}
d3.layout.histogram = function () {
var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
function histogram(data, i) {
var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
while (++i < m) {
bin = bins[i] = [];
bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
bin.y = 0;
}
if (m > 0) {
i = -1;
while (++i < n) {
x = values[i];
if (x >= range[0] && x <= range[1]) {
bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
bin.y += k;
bin.push(data[i]);
}
}
}
return bins;
}
histogram.value = function (x) {
if (!arguments.length)
return valuer;
valuer = x;
return histogram;
};
histogram.range = function (x) {
if (!arguments.length)
return ranger;
ranger = d3_functor(x);
return histogram;
};
histogram.bins = function (x) {
if (!arguments.length)
return binner;
binner = typeof x === 'number' ? function (range) {
return d3_layout_histogramBinFixed(range, x);
} : d3_functor(x);
return histogram;
};
histogram.frequency = function (x) {
if (!arguments.length)
return frequency;
frequency = !!x;
return histogram;
};
return histogram;
};
function d3_layout_histogramBinSturges(range, values) {
return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
}
function d3_layout_histogramBinFixed(range, n) {
var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
while (++x <= n)
f[x] = m * x + b;
return f;
}
function d3_layout_histogramRange(values) {
return [
d3.min(values),
d3.max(values)
];
}
d3.layout.pack = function () {
var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [
1,
1
], radius;
function pack(d, i) {
var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === 'function' ? radius : function () {
return radius;
};
root.x = root.y = 0;
d3_layout_hierarchyVisitAfter(root, function (d) {
d.r = +r(d.value);
});
d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
if (padding) {
var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
d3_layout_hierarchyVisitAfter(root, function (d) {
d.r += dr;
});
d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
d3_layout_hierarchyVisitAfter(root, function (d) {
d.r -= dr;
});
}
d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
return nodes;
}
pack.size = function (_) {
if (!arguments.length)
return size;
size = _;
return pack;
};
pack.radius = function (_) {
if (!arguments.length)
return radius;
radius = _ == null || typeof _ === 'function' ? _ : +_;
return pack;
};
pack.padding = function (_) {
if (!arguments.length)
return padding;
padding = +_;
return pack;
};
return d3_layout_hierarchyRebind(pack, hierarchy);
};
function d3_layout_packSort(a, b) {
return a.value - b.value;
}
function d3_layout_packInsert(a, b) {
var c = a._pack_next;
a._pack_next = b;
b._pack_prev = a;
b._pack_next = c;
c._pack_prev = b;
}
function d3_layout_packSplice(a, b) {
a._pack_next = b;
b._pack_prev = a;
}
function d3_layout_packIntersects(a, b) {
var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
return 0.999 * dr * dr > dx * dx + dy * dy;
}
function d3_layout_packSiblings(node) {
if (!(nodes = node.children) || !(n = nodes.length))
return;
var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
function bound(node) {
xMin = Math.min(node.x - node.r, xMin);
xMax = Math.max(node.x + node.r, xMax);
yMin = Math.min(node.y - node.r, yMin);
yMax = Math.max(node.y + node.r, yMax);
}
nodes.forEach(d3_layout_packLink);
a = nodes[0];
a.x = -a.r;
a.y = 0;
bound(a);
if (n > 1) {
b = nodes[1];
b.x = b.r;
b.y = 0;
bound(b);
if (n > 2) {
c = nodes[2];
d3_layout_packPlace(a, b, c);
bound(c);
d3_layout_packInsert(a, c);
a._pack_prev = c;
d3_layout_packInsert(c, b);
b = a._pack_next;
for (i = 3; i < n; i++) {
d3_layout_packPlace(a, b, c = nodes[i]);
var isect = 0, s1 = 1, s2 = 1;
for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
if (d3_layout_packIntersects(j, c)) {
isect = 1;
break;
}
}
if (isect == 1) {
for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
if (d3_layout_packIntersects(k, c)) {
break;
}
}
}
if (isect) {
if (s1 < s2 || s1 == s2 && b.r < a.r)
d3_layout_packSplice(a, b = j);
else
d3_layout_packSplice(a = k, b);
i--;
} else {
d3_layout_packInsert(a, c);
b = c;
bound(c);
}
}
}
}
var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
for (i = 0; i < n; i++) {
c = nodes[i];
c.x -= cx;
c.y -= cy;
cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
}
node.r = cr;
nodes.forEach(d3_layout_packUnlink);
}
function d3_layout_packLink(node) {
node._pack_next = node._pack_prev = node;
}
function d3_layout_packUnlink(node) {
delete node._pack_next;
delete node._pack_prev;
}
function d3_layout_packTransform(node, x, y, k) {
var children = node.children;
node.x = x += k * node.x;
node.y = y += k * node.y;
node.r *= k;
if (children) {
var i = -1, n = children.length;
while (++i < n)
d3_layout_packTransform(children[i], x, y, k);
}
}
function d3_layout_packPlace(a, b, c) {
var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
if (db && (dx || dy)) {
var da = b.r + c.r, dc = dx * dx + dy * dy;
da *= da;
db *= db;
var x = 0.5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
c.x = a.x + x * dx + y * dy;
c.y = a.y + x * dy - y * dx;
} else {
c.x = a.x + db;
c.y = a.y;
}
}
d3.layout.tree = function () {
var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [
1,
1
], nodeSize = null;
function tree(d, i) {
var nodes = hierarchy.call(this, d, i), root0 = nodes[0], root1 = wrapTree(root0);
d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z;
d3_layout_hierarchyVisitBefore(root1, secondWalk);
if (nodeSize)
d3_layout_hierarchyVisitBefore(root0, sizeNode);
else {
var left = root0, right = root0, bottom = root0;
d3_layout_hierarchyVisitBefore(root0, function (node) {
if (node.x < left.x)
left = node;
if (node.x > right.x)
right = node;
if (node.depth > bottom.depth)
bottom = node;
});
var tx = separation(left, right) / 2 - left.x, kx = size[0] / (right.x + separation(right, left) / 2 + tx), ky = size[1] / (bottom.depth || 1);
d3_layout_hierarchyVisitBefore(root0, function (node) {
node.x = (node.x + tx) * kx;
node.y = node.depth * ky;
});
}
return nodes;
}
function wrapTree(root0) {
var root1 = {
A: null,
children: [root0]
}, queue = [root1], node1;
while ((node1 = queue.pop()) != null) {
for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
queue.push((children[i] = child = {
_: children[i],
parent: node1,
children: (child = children[i].children) && child.slice() || [],
A: null,
a: null,
z: 0,
m: 0,
c: 0,
s: 0,
t: null,
i: i
}).a = child);
}
}
return root1.children[0];
}
function firstWalk(v) {
var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
if (children.length) {
d3_layout_treeShift(v);
var midpoint = (children[0].z + children[children.length - 1].z) / 2;
if (w) {
v.z = w.z + separation(v._, w._);
v.m = v.z - midpoint;
} else {
v.z = midpoint;
}
} else if (w) {
v.z = w.z + separation(v._, w._);
}
v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
}
function secondWalk(v) {
v._.x = v.z + v.parent.m;
v.m += v.parent.m;
}
function apportion(v, w, ancestor) {
if (w) {
var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
vom = d3_layout_treeLeft(vom);
vop = d3_layout_treeRight(vop);
vop.a = v;
shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
if (shift > 0) {
d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
sip += shift;
sop += shift;
}
sim += vim.m;
sip += vip.m;
som += vom.m;
sop += vop.m;
}
if (vim && !d3_layout_treeRight(vop)) {
vop.t = vim;
vop.m += sim - sop;
}
if (vip && !d3_layout_treeLeft(vom)) {
vom.t = vip;
vom.m += sip - som;
ancestor = v;
}
}
return ancestor;
}
function sizeNode(node) {
node.x *= size[0];
node.y = node.depth * size[1];
}
tree.separation = function (x) {
if (!arguments.length)
return separation;
separation = x;
return tree;
};
tree.size = function (x) {
if (!arguments.length)
return nodeSize ? null : size;
nodeSize = (size = x) == null ? sizeNode : null;
return tree;
};
tree.nodeSize = function (x) {
if (!arguments.length)
return nodeSize ? size : null;
nodeSize = (size = x) == null ? null : sizeNode;
return tree;
};
return d3_layout_hierarchyRebind(tree, hierarchy);
};
function d3_layout_treeSeparation(a, b) {
return a.parent == b.parent ? 1 : 2;
}
function d3_layout_treeLeft(v) {
var children = v.children;
return children.length ? children[0] : v.t;
}
function d3_layout_treeRight(v) {
var children = v.children, n;
return (n = children.length) ? children[n - 1] : v.t;
}
function d3_layout_treeMove(wm, wp, shift) {
var change = shift / (wp.i - wm.i);
wp.c -= change;
wp.s += shift;
wm.c += change;
wp.z += shift;
wp.m += shift;
}
function d3_layout_treeShift(v) {
var shift = 0, change = 0, children = v.children, i = children.length, w;
while (--i >= 0) {
w = children[i];
w.z += shift;
w.m += shift;
shift += w.s + (change += w.c);
}
}
function d3_layout_treeAncestor(vim, v, ancestor) {
return vim.a.parent === v.parent ? vim.a : ancestor;
}
d3.layout.cluster = function () {
var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [
1,
1
], nodeSize = false;
function cluster(d, i) {
var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
d3_layout_hierarchyVisitAfter(root, function (node) {
var children = node.children;
if (children && children.length) {
node.x = d3_layout_clusterX(children);
node.y = d3_layout_clusterY(children);
} else {
node.x = previousNode ? x += separation(node, previousNode) : 0;
node.y = 0;
previousNode = node;
}
});
var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
d3_layout_hierarchyVisitAfter(root, nodeSize ? function (node) {
node.x = (node.x - root.x) * size[0];
node.y = (root.y - node.y) * size[1];
} : function (node) {
node.x = (node.x - x0) / (x1 - x0) * size[0];
node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
});
return nodes;
}
cluster.separation = function (x) {
if (!arguments.length)
return separation;
separation = x;
return cluster;
};
cluster.size = function (x) {
if (!arguments.length)
return nodeSize ? null : size;
nodeSize = (size = x) == null;
return cluster;
};
cluster.nodeSize = function (x) {
if (!arguments.length)
return nodeSize ? size : null;
nodeSize = (size = x) != null;
return cluster;
};
return d3_layout_hierarchyRebind(cluster, hierarchy);
};
function d3_layout_clusterY(children) {
return 1 + d3.max(children, function (child) {
return child.y;
});
}
function d3_layout_clusterX(children) {
return children.reduce(function (x, child) {
return x + child.x;
}, 0) / children.length;
}
function d3_layout_clusterLeft(node) {
var children = node.children;
return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
}
function d3_layout_clusterRight(node) {
var children = node.children, n;
return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
}
d3.layout.treemap = function () {
var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [
1,
1
], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = 'squarify', ratio = 0.5 * (1 + Math.sqrt(5));
function scale(children, k) {
var i = -1, n = children.length, child, area;
while (++i < n) {
area = (child = children[i]).value * (k < 0 ? 0 : k);
child.area = isNaN(area) || area <= 0 ? 0 : area;
}
}
function squarify(node) {
var children = node.children;
if (children && children.length) {
var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === 'slice' ? rect.dx : mode === 'dice' ? rect.dy : mode === 'slice-dice' ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
scale(remaining, rect.dx * rect.dy / node.value);
row.area = 0;
while ((n = remaining.length) > 0) {
row.push(child = remaining[n - 1]);
row.area += child.area;
if (mode !== 'squarify' || (score = worst(row, u)) <= best) {
remaining.pop();
best = score;
} else {
row.area -= row.pop().area;
position(row, u, rect, false);
u = Math.min(rect.dx, rect.dy);
row.length = row.area = 0;
best = Infinity;
}
}
if (row.length) {
position(row, u, rect, true);
row.length = row.area = 0;
}
children.forEach(squarify);
}
}
function stickify(node) {
var children = node.children;
if (children && children.length) {
var rect = pad(node), remaining = children.slice(), child, row = [];
scale(remaining, rect.dx * rect.dy / node.value);
row.area = 0;
while (child = remaining.pop()) {
row.push(child);
row.area += child.area;
if (child.z != null) {
position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
row.length = row.area = 0;
}
}
children.forEach(stickify);
}
}
function worst(row, u) {
var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
while (++i < n) {
if (!(r = row[i].area))
continue;
if (r < rmin)
rmin = r;
if (r > rmax)
rmax = r;
}
s *= s;
u *= u;
return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
}
function position(row, u, rect, flush) {
var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
if (u == rect.dx) {
if (flush || v > rect.dy)
v = rect.dy;
while (++i < n) {
o = row[i];
o.x = x;
o.y = y;
o.dy = v;
x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
}
o.z = true;
o.dx += rect.x + rect.dx - x;
rect.y += v;
rect.dy -= v;
} else {
if (flush || v > rect.dx)
v = rect.dx;
while (++i < n) {
o = row[i];
o.x = x;
o.y = y;
o.dx = v;
y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
}
o.z = false;
o.dy += rect.y + rect.dy - y;
rect.x += v;
rect.dx -= v;
}
}
function treemap(d) {
var nodes = stickies || hierarchy(d), root = nodes[0];
root.x = 0;
root.y = 0;
root.dx = size[0];
root.dy = size[1];
if (stickies)
hierarchy.revalue(root);
scale([root], root.dx * root.dy / root.value);
(stickies ? stickify : squarify)(root);
if (sticky)
stickies = nodes;
return nodes;
}
treemap.size = function (x) {
if (!arguments.length)
return size;
size = x;
return treemap;
};
treemap.padding = function (x) {
if (!arguments.length)
return padding;
function padFunction(node) {
var p = x.call(treemap, node, node.depth);
return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === 'number' ? [
p,
p,
p,
p
] : p);
}
function padConstant(node) {
return d3_layout_treemapPad(node, x);
}
var type;
pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === 'function' ? padFunction : type === 'number' ? (x = [
x,
x,
x,
x
], padConstant) : padConstant;
return treemap;
};
treemap.round = function (x) {
if (!arguments.length)
return round != Number;
round = x ? Math.round : Number;
return treemap;
};
treemap.sticky = function (x) {
if (!arguments.length)
return sticky;
sticky = x;
stickies = null;
return treemap;
};
treemap.ratio = function (x) {
if (!arguments.length)
return ratio;
ratio = x;
return treemap;
};
treemap.mode = function (x) {
if (!arguments.length)
return mode;
mode = x + '';
return treemap;
};
return d3_layout_hierarchyRebind(treemap, hierarchy);
};
function d3_layout_treemapPadNull(node) {
return {
x: node.x,
y: node.y,
dx: node.dx,
dy: node.dy
};
}
function d3_layout_treemapPad(node, padding) {
var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
if (dx < 0) {
x += dx / 2;
dx = 0;
}
if (dy < 0) {
y += dy / 2;
dy = 0;
}
return {
x: x,
y: y,
dx: dx,
dy: dy
};
}
d3.random = {
normal: function (µ, σ) {
var n = arguments.length;
if (n < 2)
σ = 1;
if (n < 1)
µ = 0;
return function () {
var x, y, r;
do {
x = Math.random() * 2 - 1;
y = Math.random() * 2 - 1;
r = x * x + y * y;
} while (!r || r > 1);
return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
};
},
logNormal: function () {
var random = d3.random.normal.apply(d3, arguments);
return function () {
return Math.exp(random());
};
},
bates: function (m) {
var random = d3.random.irwinHall(m);
return function () {
return random() / m;
};
},
irwinHall: function (m) {
return function () {
for (var s = 0, j = 0; j < m; j++)
s += Math.random();
return s;
};
}
};
d3.scale = {};
function d3_scaleExtent(domain) {
var start = domain[0], stop = domain[domain.length - 1];
return start < stop ? [
start,
stop
] : [
stop,
start
];
}
function d3_scaleRange(scale) {
return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
}
function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
return function (x) {
return i(u(x));
};
}
function d3_scale_nice(domain, nice) {
var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
if (x1 < x0) {
dx = i0, i0 = i1, i1 = dx;
dx = x0, x0 = x1, x1 = dx;
}
domain[i0] = nice.floor(x0);
domain[i1] = nice.ceil(x1);
return domain;
}
function d3_scale_niceStep(step) {
return step ? {
floor: function (x) {
return Math.floor(x / step) * step;
},
ceil: function (x) {
return Math.ceil(x / step) * step;
}
} : d3_scale_niceIdentity;
}
var d3_scale_niceIdentity = {
floor: d3_identity,
ceil: d3_identity
};
function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
if (domain[k] < domain[0]) {
domain = domain.slice().reverse();
range = range.slice().reverse();
}
while (++j <= k) {
u.push(uninterpolate(domain[j - 1], domain[j]));
i.push(interpolate(range[j - 1], range[j]));
}
return function (x) {
var j = d3.bisect(domain, x, 1, k) - 1;
return i[j](u[j](x));
};
}
d3.scale.linear = function () {
return d3_scale_linear([
0,
1
], [
0,
1
], d3_interpolate, false);
};
function d3_scale_linear(domain, range, interpolate, clamp) {
var output, input;
function rescale() {
var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
output = linear(domain, range, uninterpolate, interpolate);
input = linear(range, domain, uninterpolate, d3_interpolate);
return scale;
}
function scale(x) {
return output(x);
}
scale.invert = function (y) {
return input(y);
};
scale.domain = function (x) {
if (!arguments.length)
return domain;
domain = x.map(Number);
return rescale();
};
scale.range = function (x) {
if (!arguments.length)
return range;
range = x;
return rescale();
};
scale.rangeRound = function (x) {
return scale.range(x).interpolate(d3_interpolateRound);
};
scale.clamp = function (x) {
if (!arguments.length)
return clamp;
clamp = x;
return rescale();
};
scale.interpolate = function (x) {
if (!arguments.length)
return interpolate;
interpolate = x;
return rescale();
};
scale.ticks = function (m) {
return d3_scale_linearTicks(domain, m);
};
scale.tickFormat = function (m, format) {
return d3_scale_linearTickFormat(domain, m, format);
};
scale.nice = function (m) {
d3_scale_linearNice(domain, m);
return rescale();
};
scale.copy = function () {
return d3_scale_linear(domain, range, interpolate, clamp);
};
return rescale();
}
function d3_scale_linearRebind(scale, linear) {
return d3.rebind(scale, linear, 'range', 'rangeRound', 'interpolate', 'clamp');
}
function d3_scale_linearNice(domain, m) {
return d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
}
function d3_scale_linearTickRange(domain, m) {
if (m == null)
m = 10;
var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
if (err <= 0.15)
step *= 10;
else if (err <= 0.35)
step *= 5;
else if (err <= 0.75)
step *= 2;
extent[0] = Math.ceil(extent[0] / step) * step;
extent[1] = Math.floor(extent[1] / step) * step + step * 0.5;
extent[2] = step;
return extent;
}
function d3_scale_linearTicks(domain, m) {
return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
}
function d3_scale_linearTickFormat(domain, m, format) {
var range = d3_scale_linearTickRange(domain, m);
if (format) {
var match = d3_format_re.exec(format);
match.shift();
if (match[8] === 's') {
var prefix = d3.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
if (!match[7])
match[7] = '.' + d3_scale_linearPrecision(prefix.scale(range[2]));
match[8] = 'f';
format = d3.format(match.join(''));
return function (d) {
return format(prefix.scale(d)) + prefix.symbol;
};
}
if (!match[7])
match[7] = '.' + d3_scale_linearFormatPrecision(match[8], range);
format = match.join('');
} else {
format = ',.' + d3_scale_linearPrecision(range[2]) + 'f';
}
return d3.format(format);
}
var d3_scale_linearFormatSignificant = {
s: 1,
g: 1,
p: 1,
r: 1,
e: 1
};
function d3_scale_linearPrecision(value) {
return -Math.floor(Math.log(value) / Math.LN10 + 0.01);
}
function d3_scale_linearFormatPrecision(type, range) {
var p = d3_scale_linearPrecision(range[2]);
return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +(type !== 'e') : p - (type === '%') * 2;
}
d3.scale.log = function () {
return d3_scale_log(d3.scale.linear().domain([
0,
1
]), 10, true, [
1,
10
]);
};
function d3_scale_log(linear, base, positive, domain) {
function log(x) {
return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
}
function pow(x) {
return positive ? Math.pow(base, x) : -Math.pow(base, -x);
}
function scale(x) {
return linear(log(x));
}
scale.invert = function (x) {
return pow(linear.invert(x));
};
scale.domain = function (x) {
if (!arguments.length)
return domain;
positive = x[0] >= 0;
linear.domain((domain = x.map(Number)).map(log));
return scale;
};
scale.base = function (_) {
if (!arguments.length)
return base;
base = +_;
linear.domain(domain.map(log));
return scale;
};
scale.nice = function () {
var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
linear.domain(niced);
domain = niced.map(pow);
return scale;
};
scale.ticks = function () {
var extent = d3_scaleExtent(domain), ticks = [], u = extent[0], v = extent[1], i = Math.floor(log(u)), j = Math.ceil(log(v)), n = base % 1 ? 2 : base;
if (isFinite(j - i)) {
if (positive) {
for (; i < j; i++)
for (var k = 1; k < n; k++)
ticks.push(pow(i) * k);
ticks.push(pow(i));
} else {
ticks.push(pow(i));
for (; i++ < j;)
for (var k = n - 1; k > 0; k--)
ticks.push(pow(i) * k);
}
for (i = 0; ticks[i] < u; i++) {
}
for (j = ticks.length; ticks[j - 1] > v; j--) {
}
ticks = ticks.slice(i, j);
}
return ticks;
};
scale.tickFormat = function (n, format) {
if (!arguments.length)
return d3_scale_logFormat;
if (arguments.length < 2)
format = d3_scale_logFormat;
else if (typeof format !== 'function')
format = d3.format(format);
var k = Math.max(0.1, n / scale.ticks().length), f = positive ? (e = 1e-12, Math.ceil) : (e = -1e-12, Math.floor), e;
return function (d) {
return d / pow(f(log(d) + e)) <= k ? format(d) : '';
};
};
scale.copy = function () {
return d3_scale_log(linear.copy(), base, positive, domain);
};
return d3_scale_linearRebind(scale, linear);
}
var d3_scale_logFormat = d3.format('.0e'), d3_scale_logNiceNegative = {
floor: function (x) {
return -Math.ceil(-x);
},
ceil: function (x) {
return -Math.floor(-x);
}
};
d3.scale.pow = function () {
return d3_scale_pow(d3.scale.linear(), 1, [
0,
1
]);
};
function d3_scale_pow(linear, exponent, domain) {
var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
function scale(x) {
return linear(powp(x));
}
scale.invert = function (x) {
return powb(linear.invert(x));
};
scale.domain = function (x) {
if (!arguments.length)
return domain;
linear.domain((domain = x.map(Number)).map(powp));
return scale;
};
scale.ticks = function (m) {
return d3_scale_linearTicks(domain, m);
};
scale.tickFormat = function (m, format) {
return d3_scale_linearTickFormat(domain, m, format);
};
scale.nice = function (m) {
return scale.domain(d3_scale_linearNice(domain, m));
};
scale.exponent = function (x) {
if (!arguments.length)
return exponent;
powp = d3_scale_powPow(exponent = x);
powb = d3_scale_powPow(1 / exponent);
linear.domain(domain.map(powp));
return scale;
};
scale.copy = function () {
return d3_scale_pow(linear.copy(), exponent, domain);
};
return d3_scale_linearRebind(scale, linear);
}
function d3_scale_powPow(e) {
return function (x) {
return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
};
}
d3.scale.sqrt = function () {
return d3.scale.pow().exponent(0.5);
};
d3.scale.ordinal = function () {
return d3_scale_ordinal([], {
t: 'range',
a: [[]]
});
};
function d3_scale_ordinal(domain, ranger) {
var index, range, rangeBand;
function scale(x) {
return range[((index.get(x) || (ranger.t === 'range' ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length];
}
function steps(start, step) {
return d3.range(domain.length).map(function (i) {
return start + step * i;
});
}
scale.domain = function (x) {
if (!arguments.length)
return domain;
domain = [];
index = new d3_Map();
var i = -1, n = x.length, xi;
while (++i < n)
if (!index.has(xi = x[i]))
index.set(xi, domain.push(xi));
return scale[ranger.t].apply(scale, ranger.a);
};
scale.range = function (x) {
if (!arguments.length)
return range;
range = x;
rangeBand = 0;
ranger = {
t: 'range',
a: arguments
};
return scale;
};
scale.rangePoints = function (x, padding) {
if (arguments.length < 2)
padding = 0;
var start = x[0], stop = x[1], step = domain.length < 2 ? (start = (start + stop) / 2, 0) : (stop - start) / (domain.length - 1 + padding);
range = steps(start + step * padding / 2, step);
rangeBand = 0;
ranger = {
t: 'rangePoints',
a: arguments
};
return scale;
};
scale.rangeRoundPoints = function (x, padding) {
if (arguments.length < 2)
padding = 0;
var start = x[0], stop = x[1], step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 0) : (stop - start) / (domain.length - 1 + padding) | 0;
range = steps(start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
rangeBand = 0;
ranger = {
t: 'rangeRoundPoints',
a: arguments
};
return scale;
};
scale.rangeBands = function (x, padding, outerPadding) {
if (arguments.length < 2)
padding = 0;
if (arguments.length < 3)
outerPadding = padding;
var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
range = steps(start + step * outerPadding, step);
if (reverse)
range.reverse();
rangeBand = step * (1 - padding);
ranger = {
t: 'rangeBands',
a: arguments
};
return scale;
};
scale.rangeRoundBands = function (x, padding, outerPadding) {
if (arguments.length < 2)
padding = 0;
if (arguments.length < 3)
outerPadding = padding;
var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
range = steps(start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
if (reverse)
range.reverse();
rangeBand = Math.round(step * (1 - padding));
ranger = {
t: 'rangeRoundBands',
a: arguments
};
return scale;
};
scale.rangeBand = function () {
return rangeBand;
};
scale.rangeExtent = function () {
return d3_scaleExtent(ranger.a[0]);
};
scale.copy = function () {
return d3_scale_ordinal(domain, ranger);
};
return scale.domain(domain);
}
d3.scale.category10 = function () {
return d3.scale.ordinal().range(d3_category10);
};
d3.scale.category20 = function () {
return d3.scale.ordinal().range(d3_category20);
};
d3.scale.category20b = function () {
return d3.scale.ordinal().range(d3_category20b);
};
d3.scale.category20c = function () {
return d3.scale.ordinal().range(d3_category20c);
};
var d3_category10 = [
2062260,
16744206,
2924588,
14034728,
9725885,
9197131,
14907330,
8355711,
12369186,
1556175
].map(d3_rgbString);
var d3_category20 = [
2062260,
11454440,
16744206,
16759672,
2924588,
10018698,
14034728,
16750742,
9725885,
12955861,
9197131,
12885140,
14907330,
16234194,
8355711,
13092807,
12369186,
14408589,
1556175,
10410725
].map(d3_rgbString);
var d3_category20b = [
3750777,
5395619,
7040719,
10264286,
6519097,
9216594,
11915115,
13556636,
9202993,
12426809,
15186514,
15190932,
8666169,
11356490,
14049643,
15177372,
8077683,
10834324,
13528509,
14589654
].map(d3_rgbString);
var d3_category20c = [
3244733,
7057110,
10406625,
13032431,
15095053,
16616764,
16625259,
16634018,
3253076,
7652470,
10607003,
13101504,
7695281,
10394312,
12369372,
14342891,
6513507,
9868950,
12434877,
14277081
].map(d3_rgbString);
d3.scale.quantile = function () {
return d3_scale_quantile([], []);
};
function d3_scale_quantile(domain, range) {
var thresholds;
function rescale() {
var k = 0, q = range.length;
thresholds = [];
while (++k < q)
thresholds[k - 1] = d3.quantile(domain, k / q);
return scale;
}
function scale(x) {
if (!isNaN(x = +x))
return range[d3.bisect(thresholds, x)];
}
scale.domain = function (x) {
if (!arguments.length)
return domain;
domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending);
return rescale();
};
scale.range = function (x) {
if (!arguments.length)
return range;
range = x;
return rescale();
};
scale.quantiles = function () {
return thresholds;
};
scale.invertExtent = function (y) {
y = range.indexOf(y);
return y < 0 ? [
NaN,
NaN
] : [
y > 0 ? thresholds[y - 1] : domain[0],
y < thresholds.length ? thresholds[y] : domain[domain.length - 1]
];
};
scale.copy = function () {
return d3_scale_quantile(domain, range);
};
return rescale();
}
d3.scale.quantize = function () {
return d3_scale_quantize(0, 1, [
0,
1
]);
};
function d3_scale_quantize(x0, x1, range) {
var kx, i;
function scale(x) {
return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
}
function rescale() {
kx = range.length / (x1 - x0);
i = range.length - 1;
return scale;
}
scale.domain = function (x) {
if (!arguments.length)
return [
x0,
x1
];
x0 = +x[0];
x1 = +x[x.length - 1];
return rescale();
};
scale.range = function (x) {
if (!arguments.length)
return range;
range = x;
return rescale();
};
scale.invertExtent = function (y) {
y = range.indexOf(y);
y = y < 0 ? NaN : y / kx + x0;
return [
y,
y + 1 / kx
];
};
scale.copy = function () {
return d3_scale_quantize(x0, x1, range);
};
return rescale();
}
d3.scale.threshold = function () {
return d3_scale_threshold([0.5], [
0,
1
]);
};
function d3_scale_threshold(domain, range) {
function scale(x) {
if (x <= x)
return range[d3.bisect(domain, x)];
}
scale.domain = function (_) {
if (!arguments.length)
return domain;
domain = _;
return scale;
};
scale.range = function (_) {
if (!arguments.length)
return range;
range = _;
return scale;
};
scale.invertExtent = function (y) {
y = range.indexOf(y);
return [
domain[y - 1],
domain[y]
];
};
scale.copy = function () {
return d3_scale_threshold(domain, range);
};
return scale;
}
d3.scale.identity = function () {
return d3_scale_identity([
0,
1
]);
};
function d3_scale_identity(domain) {
function identity(x) {
return +x;
}
identity.invert = identity;
identity.domain = identity.range = function (x) {
if (!arguments.length)
return domain;
domain = x.map(identity);
return identity;
};
identity.ticks = function (m) {
return d3_scale_linearTicks(domain, m);
};
identity.tickFormat = function (m, format) {
return d3_scale_linearTickFormat(domain, m, format);
};
identity.copy = function () {
return d3_scale_identity(domain);
};
return identity;
}
d3.svg = {};
function d3_zero() {
return 0;
}
d3.svg.arc = function () {
var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, cornerRadius = d3_zero, padRadius = d3_svg_arcAuto, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle, padAngle = d3_svg_arcPadAngle;
function arc() {
var r0 = Math.max(0, +innerRadius.apply(this, arguments)), r1 = Math.max(0, +outerRadius.apply(this, arguments)), a0 = startAngle.apply(this, arguments) - halfπ, a1 = endAngle.apply(this, arguments) - halfπ, da = Math.abs(a1 - a0), cw = a0 > a1 ? 0 : 1;
if (r1 < r0)
rc = r1, r1 = r0, r0 = rc;
if (da >= τε)
return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : '') + 'Z';
var rc, cr, rp, ap, p0 = 0, p1 = 0, x0, y0, x1, y1, x2, y2, x3, y3, path = [];
if (ap = (+padAngle.apply(this, arguments) || 0) / 2) {
rp = padRadius === d3_svg_arcAuto ? Math.sqrt(r0 * r0 + r1 * r1) : +padRadius.apply(this, arguments);
if (!cw)
p1 *= -1;
if (r1)
p1 = d3_asin(rp / r1 * Math.sin(ap));
if (r0)
p0 = d3_asin(rp / r0 * Math.sin(ap));
}
if (r1) {
x0 = r1 * Math.cos(a0 + p1);
y0 = r1 * Math.sin(a0 + p1);
x1 = r1 * Math.cos(a1 - p1);
y1 = r1 * Math.sin(a1 - p1);
var l1 = Math.abs(a1 - a0 - 2 * p1) <= π ? 0 : 1;
if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
var h1 = (a0 + a1) / 2;
x0 = r1 * Math.cos(h1);
y0 = r1 * Math.sin(h1);
x1 = y1 = null;
}
} else {
x0 = y0 = 0;
}
if (r0) {
x2 = r0 * Math.cos(a1 - p0);
y2 = r0 * Math.sin(a1 - p0);
x3 = r0 * Math.cos(a0 + p0);
y3 = r0 * Math.sin(a0 + p0);
var l0 = Math.abs(a0 - a1 + 2 * p0) <= π ? 0 : 1;
if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === 1 - cw ^ l0) {
var h0 = (a0 + a1) / 2;
x2 = r0 * Math.cos(h0);
y2 = r0 * Math.sin(h0);
x3 = y3 = null;
}
} else {
x2 = y2 = 0;
}
if ((rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments))) > 0.001) {
cr = r0 < r1 ^ cw ? 0 : 1;
var oc = x3 == null ? [
x2,
y2
] : x1 == null ? [
x0,
y0
] : d3_geom_polygonIntersect([
x0,
y0
], [
x3,
y3
], [
x1,
y1
], [
x2,
y2
]), ax = x0 - oc[0], ay = y0 - oc[1], bx = x1 - oc[0], by = y1 - oc[1], kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2), lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
if (x1 != null) {
var rc1 = Math.min(rc, (r1 - lc) / (kc + 1)), t30 = d3_svg_arcCornerTangents(x3 == null ? [
x2,
y2
] : [
x3,
y3
], [
x0,
y0
], r1, rc1, cw), t12 = d3_svg_arcCornerTangents([
x1,
y1
], [
x2,
y2
], r1, rc1, cw);
if (rc === rc1) {
path.push('M', t30[0], 'A', rc1, ',', rc1, ' 0 0,', cr, ' ', t30[1], 'A', r1, ',', r1, ' 0 ', 1 - cw ^ d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ',', cw, ' ', t12[1], 'A', rc1, ',', rc1, ' 0 0,', cr, ' ', t12[0]);
} else {
path.push('M', t30[0], 'A', rc1, ',', rc1, ' 0 1,', cr, ' ', t12[0]);
}
} else {
path.push('M', x0, ',', y0);
}
if (x3 != null) {
var rc0 = Math.min(rc, (r0 - lc) / (kc - 1)), t03 = d3_svg_arcCornerTangents([
x0,
y0
], [
x3,
y3
], r0, -rc0, cw), t21 = d3_svg_arcCornerTangents([
x2,
y2
], x1 == null ? [
x0,
y0
] : [
x1,
y1
], r0, -rc0, cw);
if (rc === rc0) {
path.push('L', t21[0], 'A', rc0, ',', rc0, ' 0 0,', cr, ' ', t21[1], 'A', r0, ',', r0, ' 0 ', cw ^ d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ',', 1 - cw, ' ', t03[1], 'A', rc0, ',', rc0, ' 0 0,', cr, ' ', t03[0]);
} else {
path.push('L', t21[0], 'A', rc0, ',', rc0, ' 0 0,', cr, ' ', t03[0]);
}
} else {
path.push('L', x2, ',', y2);
}
} else {
path.push('M', x0, ',', y0);
if (x1 != null)
path.push('A', r1, ',', r1, ' 0 ', l1, ',', cw, ' ', x1, ',', y1);
path.push('L', x2, ',', y2);
if (x3 != null)
path.push('A', r0, ',', r0, ' 0 ', l0, ',', 1 - cw, ' ', x3, ',', y3);
}
path.push('Z');
return path.join('');
}
function circleSegment(r1, cw) {
return 'M0,' + r1 + 'A' + r1 + ',' + r1 + ' 0 1,' + cw + ' 0,' + -r1 + 'A' + r1 + ',' + r1 + ' 0 1,' + cw + ' 0,' + r1;
}
arc.innerRadius = function (v) {
if (!arguments.length)
return innerRadius;
innerRadius = d3_functor(v);
return arc;
};
arc.outerRadius = function (v) {
if (!arguments.length)
return outerRadius;
outerRadius = d3_functor(v);
return arc;
};
arc.cornerRadius = function (v) {
if (!arguments.length)
return cornerRadius;
cornerRadius = d3_functor(v);
return arc;
};
arc.padRadius = function (v) {
if (!arguments.length)
return padRadius;
padRadius = v == d3_svg_arcAuto ? d3_svg_arcAuto : d3_functor(v);
return arc;
};
arc.startAngle = function (v) {
if (!arguments.length)
return startAngle;
startAngle = d3_functor(v);
return arc;
};
arc.endAngle = function (v) {
if (!arguments.length)
return endAngle;
endAngle = d3_functor(v);
return arc;
};
arc.padAngle = function (v) {
if (!arguments.length)
return padAngle;
padAngle = d3_functor(v);
return arc;
};
arc.centroid = function () {
var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - halfπ;
return [
Math.cos(a) * r,
Math.sin(a) * r
];
};
return arc;
};
var d3_svg_arcAuto = 'auto';
function d3_svg_arcInnerRadius(d) {
return d.innerRadius;
}
function d3_svg_arcOuterRadius(d) {
return d.outerRadius;
}
function d3_svg_arcStartAngle(d) {
return d.startAngle;
}
function d3_svg_arcEndAngle(d) {
return d.endAngle;
}
function d3_svg_arcPadAngle(d) {
return d && d.padAngle;
}
function d3_svg_arcSweep(x0, y0, x1, y1) {
return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
}
function d3_svg_arcCornerTangents(p0, p1, r1, rc, cw) {
var x01 = p0[0] - p1[0], y01 = p0[1] - p1[1], lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x1 = p0[0] + ox, y1 = p0[1] + oy, x2 = p1[0] + ox, y2 = p1[1] + oy, x3 = (x1 + x2) / 2, y3 = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, d2 = dx * dx + dy * dy, r = r1 - rc, D = x1 * y2 - x2 * y1, d = (dy < 0 ? -1 : 1) * Math.sqrt(r * r * d2 - D * D), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x3, dy0 = cy0 - y3, dx1 = cx1 - x3, dy1 = cy1 - y3;
if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1)
cx0 = cx1, cy0 = cy1;
return [
[
cx0 - ox,
cy0 - oy
],
[
cx0 * r1 / r,
cy0 * r1 / r
]
];
}
function d3_svg_line(projection) {
var x = d3_geom_pointX, y = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = 0.7;
function line(data) {
var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
function segment() {
segments.push('M', interpolate(projection(points), tension));
}
while (++i < n) {
if (defined.call(this, d = data[i], i)) {
points.push([
+fx.call(this, d, i),
+fy.call(this, d, i)
]);
} else if (points.length) {
segment();
points = [];
}
}
if (points.length)
segment();
return segments.length ? segments.join('') : null;
}
line.x = function (_) {
if (!arguments.length)
return x;
x = _;
return line;
};
line.y = function (_) {
if (!arguments.length)
return y;
y = _;
return line;
};
line.defined = function (_) {
if (!arguments.length)
return defined;
defined = _;
return line;
};
line.interpolate = function (_) {
if (!arguments.length)
return interpolateKey;
if (typeof _ === 'function')
interpolateKey = interpolate = _;
else
interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
return line;
};
line.tension = function (_) {
if (!arguments.length)
return tension;
tension = _;
return line;
};
return line;
}
d3.svg.line = function () {
return d3_svg_line(d3_identity);
};
var d3_svg_lineInterpolators = d3.map({
linear: d3_svg_lineLinear,
'linear-closed': d3_svg_lineLinearClosed,
step: d3_svg_lineStep,
'step-before': d3_svg_lineStepBefore,
'step-after': d3_svg_lineStepAfter,
basis: d3_svg_lineBasis,
'basis-open': d3_svg_lineBasisOpen,
'basis-closed': d3_svg_lineBasisClosed,
bundle: d3_svg_lineBundle,
cardinal: d3_svg_lineCardinal,
'cardinal-open': d3_svg_lineCardinalOpen,
'cardinal-closed': d3_svg_lineCardinalClosed,
monotone: d3_svg_lineMonotone
});
d3_svg_lineInterpolators.forEach(function (key, value) {
value.key = key;
value.closed = /-closed$/.test(key);
});
function d3_svg_lineLinear(points) {
return points.join('L');
}
function d3_svg_lineLinearClosed(points) {
return d3_svg_lineLinear(points) + 'Z';
}
function d3_svg_lineStep(points) {
var i = 0, n = points.length, p = points[0], path = [
p[0],
',',
p[1]
];
while (++i < n)
path.push('H', (p[0] + (p = points[i])[0]) / 2, 'V', p[1]);
if (n > 1)
path.push('H', p[0]);
return path.join('');
}
function d3_svg_lineStepBefore(points) {
var i = 0, n = points.length, p = points[0], path = [
p[0],
',',
p[1]
];
while (++i < n)
path.push('V', (p = points[i])[1], 'H', p[0]);
return path.join('');
}
function d3_svg_lineStepAfter(points) {
var i = 0, n = points.length, p = points[0], path = [
p[0],
',',
p[1]
];
while (++i < n)
path.push('H', (p = points[i])[0], 'V', p[1]);
return path.join('');
}
function d3_svg_lineCardinalOpen(points, tension) {
return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, -1), d3_svg_lineCardinalTangents(points, tension));
}
function d3_svg_lineCardinalClosed(points, tension) {
return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), points), d3_svg_lineCardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension));
}
function d3_svg_lineCardinal(points, tension) {
return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
}
function d3_svg_lineHermite(points, tangents) {
if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
return d3_svg_lineLinear(points);
}
var quad = points.length != tangents.length, path = '', p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
if (quad) {
path += 'Q' + (p[0] - t0[0] * 2 / 3) + ',' + (p[1] - t0[1] * 2 / 3) + ',' + p[0] + ',' + p[1];
p0 = points[1];
pi = 2;
}
if (tangents.length > 1) {
t = tangents[1];
p = points[pi];
pi++;
path += 'C' + (p0[0] + t0[0]) + ',' + (p0[1] + t0[1]) + ',' + (p[0] - t[0]) + ',' + (p[1] - t[1]) + ',' + p[0] + ',' + p[1];
for (var i = 2; i < tangents.length; i++, pi++) {
p = points[pi];
t = tangents[i];
path += 'S' + (p[0] - t[0]) + ',' + (p[1] - t[1]) + ',' + p[0] + ',' + p[1];
}
}
if (quad) {
var lp = points[pi];
path += 'Q' + (p[0] + t[0] * 2 / 3) + ',' + (p[1] + t[1] * 2 / 3) + ',' + lp[0] + ',' + lp[1];
}
return path;
}
function d3_svg_lineCardinalTangents(points, tension) {
var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
while (++i < n) {
p0 = p1;
p1 = p2;
p2 = points[i];
tangents.push([
a * (p2[0] - p0[0]),
a * (p2[1] - p0[1])
]);
}
return tangents;
}
function d3_svg_lineBasis(points) {
if (points.length < 3)
return d3_svg_lineLinear(points);
var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [
x0,
x0,
x0,
(pi = points[1])[0]
], py = [
y0,
y0,
y0,
pi[1]
], path = [
x0,
',',
y0,
'L',
d3_svg_lineDot4(d3_svg_lineBasisBezier3, px),
',',
d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
];
points.push(points[n - 1]);
while (++i <= n) {
pi = points[i];
px.shift();
px.push(pi[0]);
py.shift();
py.push(pi[1]);
d3_svg_lineBasisBezier(path, px, py);
}
points.pop();
path.push('L', pi);
return path.join('');
}
function d3_svg_lineBasisOpen(points) {
if (points.length < 4)
return d3_svg_lineLinear(points);
var path = [], i = -1, n = points.length, pi, px = [0], py = [0];
while (++i < 3) {
pi = points[i];
px.push(pi[0]);
py.push(pi[1]);
}
path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + ',' + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
--i;
while (++i < n) {
pi = points[i];
px.shift();
px.push(pi[0]);
py.shift();
py.push(pi[1]);
d3_svg_lineBasisBezier(path, px, py);
}
return path.join('');
}
function d3_svg_lineBasisClosed(points) {
var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
while (++i < 4) {
pi = points[i % n];
px.push(pi[0]);
py.push(pi[1]);
}
path = [
d3_svg_lineDot4(d3_svg_lineBasisBezier3, px),
',',
d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
];
--i;
while (++i < m) {
pi = points[i % n];
px.shift();
px.push(pi[0]);
py.shift();
py.push(pi[1]);
d3_svg_lineBasisBezier(path, px, py);
}
return path.join('');
}
function d3_svg_lineBundle(points, tension) {
var n = points.length - 1;
if (n) {
var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
while (++i <= n) {
p = points[i];
t = i / n;
p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
}
}
return d3_svg_lineBasis(points);
}
function d3_svg_lineDot4(a, b) {
return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
var d3_svg_lineBasisBezier1 = [
0,
2 / 3,
1 / 3,
0
], d3_svg_lineBasisBezier2 = [
0,
1 / 3,
2 / 3,
0
], d3_svg_lineBasisBezier3 = [
0,
1 / 6,
2 / 3,
1 / 6
];
function d3_svg_lineBasisBezier(path, x, y) {
path.push('C', d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ',', d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ',', d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ',', d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ',', d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ',', d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}
function d3_svg_lineSlope(p0, p1) {
return (p1[1] - p0[1]) / (p1[0] - p0[0]);
}
function d3_svg_lineFiniteDifferences(points) {
var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
while (++i < j) {
m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
}
m[i] = d;
return m;
}
function d3_svg_lineMonotoneTangents(points) {
var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
while (++i < j) {
d = d3_svg_lineSlope(points[i], points[i + 1]);
if (abs(d) < ε) {
m[i] = m[i + 1] = 0;
} else {
a = m[i] / d;
b = m[i + 1] / d;
s = a * a + b * b;
if (s > 9) {
s = d * 3 / Math.sqrt(s);
m[i] = s * a;
m[i + 1] = s * b;
}
}
}
i = -1;
while (++i <= j) {
s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
tangents.push([
s || 0,
m[i] * s || 0
]);
}
return tangents;
}
function d3_svg_lineMonotone(points) {
return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
}
d3.svg.line.radial = function () {
var line = d3_svg_line(d3_svg_lineRadial);
line.radius = line.x, delete line.x;
line.angle = line.y, delete line.y;
return line;
};
function d3_svg_lineRadial(points) {
var point, i = -1, n = points.length, r, a;
while (++i < n) {
point = points[i];
r = point[0];
a = point[1] - halfπ;
point[0] = r * Math.cos(a);
point[1] = r * Math.sin(a);
}
return points;
}
function d3_svg_area(projection) {
var x0 = d3_geom_pointX, x1 = d3_geom_pointX, y0 = 0, y1 = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = 'L', tension = 0.7;
function area(data) {
var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function () {
return x;
} : d3_functor(x1), fy1 = y0 === y1 ? function () {
return y;
} : d3_functor(y1), x, y;
function segment() {
segments.push('M', interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), 'Z');
}
while (++i < n) {
if (defined.call(this, d = data[i], i)) {
points0.push([
x = +fx0.call(this, d, i),
y = +fy0.call(this, d, i)
]);
points1.push([
+fx1.call(this, d, i),
+fy1.call(this, d, i)
]);
} else if (points0.length) {
segment();
points0 = [];
points1 = [];
}
}
if (points0.length)
segment();
return segments.length ? segments.join('') : null;
}
area.x = function (_) {
if (!arguments.length)
return x1;
x0 = x1 = _;
return area;
};
area.x0 = function (_) {
if (!arguments.length)
return x0;
x0 = _;
return area;
};
area.x1 = function (_) {
if (!arguments.length)
return x1;
x1 = _;
return area;
};
area.y = function (_) {
if (!arguments.length)
return y1;
y0 = y1 = _;
return area;
};
area.y0 = function (_) {
if (!arguments.length)
return y0;
y0 = _;
return area;
};
area.y1 = function (_) {
if (!arguments.length)
return y1;
y1 = _;
return area;
};
area.defined = function (_) {
if (!arguments.length)
return defined;
defined = _;
return area;
};
area.interpolate = function (_) {
if (!arguments.length)
return interpolateKey;
if (typeof _ === 'function')
interpolateKey = interpolate = _;
else
interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
interpolateReverse = interpolate.reverse || interpolate;
L = interpolate.closed ? 'M' : 'L';
return area;
};
area.tension = function (_) {
if (!arguments.length)
return tension;
tension = _;
return area;
};
return area;
}
d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
d3.svg.area = function () {
return d3_svg_area(d3_identity);
};
d3.svg.area.radial = function () {
var area = d3_svg_area(d3_svg_lineRadial);
area.radius = area.x, delete area.x;
area.innerRadius = area.x0, delete area.x0;
area.outerRadius = area.x1, delete area.x1;
area.angle = area.y, delete area.y;
area.startAngle = area.y0, delete area.y0;
area.endAngle = area.y1, delete area.y1;
return area;
};
d3.svg.chord = function () {
var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
function chord(d, i) {
var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
return 'M' + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + 'Z';
}
function subgroup(self, f, d, i) {
var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) - halfπ, a1 = endAngle.call(self, subgroup, i) - halfπ;
return {
r: r,
a0: a0,
a1: a1,
p0: [
r * Math.cos(a0),
r * Math.sin(a0)
],
p1: [
r * Math.cos(a1),
r * Math.sin(a1)
]
};
}
function equals(a, b) {
return a.a0 == b.a0 && a.a1 == b.a1;
}
function arc(r, p, a) {
return 'A' + r + ',' + r + ' 0 ' + +(a > π) + ',1 ' + p;
}
function curve(r0, p0, r1, p1) {
return 'Q 0,0 ' + p1;
}
chord.radius = function (v) {
if (!arguments.length)
return radius;
radius = d3_functor(v);
return chord;
};
chord.source = function (v) {
if (!arguments.length)
return source;
source = d3_functor(v);
return chord;
};
chord.target = function (v) {
if (!arguments.length)
return target;
target = d3_functor(v);
return chord;
};
chord.startAngle = function (v) {
if (!arguments.length)
return startAngle;
startAngle = d3_functor(v);
return chord;
};
chord.endAngle = function (v) {
if (!arguments.length)
return endAngle;
endAngle = d3_functor(v);
return chord;
};
return chord;
};
function d3_svg_chordRadius(d) {
return d.radius;
}
d3.svg.diagonal = function () {
var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
function diagonal(d, i) {
var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [
p0,
{
x: p0.x,
y: m
},
{
x: p3.x,
y: m
},
p3
];
p = p.map(projection);
return 'M' + p[0] + 'C' + p[1] + ' ' + p[2] + ' ' + p[3];
}
diagonal.source = function (x) {
if (!arguments.length)
return source;
source = d3_functor(x);
return diagonal;
};
diagonal.target = function (x) {
if (!arguments.length)
return target;
target = d3_functor(x);
return diagonal;
};
diagonal.projection = function (x) {
if (!arguments.length)
return projection;
projection = x;
return diagonal;
};
return diagonal;
};
function d3_svg_diagonalProjection(d) {
return [
d.x,
d.y
];
}
d3.svg.diagonal.radial = function () {
var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
diagonal.projection = function (x) {
return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
};
return diagonal;
};
function d3_svg_diagonalRadialProjection(projection) {
return function () {
var d = projection.apply(this, arguments), r = d[0], a = d[1] - halfπ;
return [
r * Math.cos(a),
r * Math.sin(a)
];
};
}
d3.svg.symbol = function () {
var type = d3_svg_symbolType, size = d3_svg_symbolSize;
function symbol(d, i) {
return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
}
symbol.type = function (x) {
if (!arguments.length)
return type;
type = d3_functor(x);
return symbol;
};
symbol.size = function (x) {
if (!arguments.length)
return size;
size = d3_functor(x);
return symbol;
};
return symbol;
};
function d3_svg_symbolSize() {
return 64;
}
function d3_svg_symbolType() {
return 'circle';
}
function d3_svg_symbolCircle(size) {
var r = Math.sqrt(size / π);
return 'M0,' + r + 'A' + r + ',' + r + ' 0 1,1 0,' + -r + 'A' + r + ',' + r + ' 0 1,1 0,' + r + 'Z';
}
var d3_svg_symbols = d3.map({
circle: d3_svg_symbolCircle,
cross: function (size) {
var r = Math.sqrt(size / 5) / 2;
return 'M' + -3 * r + ',' + -r + 'H' + -r + 'V' + -3 * r + 'H' + r + 'V' + -r + 'H' + 3 * r + 'V' + r + 'H' + r + 'V' + 3 * r + 'H' + -r + 'V' + r + 'H' + -3 * r + 'Z';
},
diamond: function (size) {
var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
return 'M0,' + -ry + 'L' + rx + ',0' + ' 0,' + ry + ' ' + -rx + ',0' + 'Z';
},
square: function (size) {
var r = Math.sqrt(size) / 2;
return 'M' + -r + ',' + -r + 'L' + r + ',' + -r + ' ' + r + ',' + r + ' ' + -r + ',' + r + 'Z';
},
'triangle-down': function (size) {
var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
return 'M0,' + ry + 'L' + rx + ',' + -ry + ' ' + -rx + ',' + -ry + 'Z';
},
'triangle-up': function (size) {
var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
return 'M0,' + -ry + 'L' + rx + ',' + ry + ' ' + -rx + ',' + ry + 'Z';
}
});
d3.svg.symbolTypes = d3_svg_symbols.keys();
var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
d3_selectionPrototype.transition = function (name) {
var id = d3_transitionInheritId || ++d3_transitionId, ns = d3_transitionNamespace(name), subgroups = [], subgroup, node, transition = d3_transitionInherit || {
time: Date.now(),
ease: d3_ease_cubicInOut,
delay: 0,
duration: 250
};
for (var j = -1, m = this.length; ++j < m;) {
subgroups.push(subgroup = []);
for (var group = this[j], i = -1, n = group.length; ++i < n;) {
if (node = group[i])
d3_transitionNode(node, i, ns, id, transition);
subgroup.push(node);
}
}
return d3_transition(subgroups, ns, id);
};
d3_selectionPrototype.interrupt = function (name) {
return this.each(name == null ? d3_selection_interrupt : d3_selection_interruptNS(d3_transitionNamespace(name)));
};
var d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace());
function d3_selection_interruptNS(ns) {
return function () {
var lock, active;
if ((lock = this[ns]) && (active = lock[lock.active])) {
if (--lock.count)
delete lock[lock.active];
else
delete this[ns];
lock.active += 0.5;
active.event && active.event.interrupt.call(this, this.__data__, active.index);
}
};
}
function d3_transition(groups, ns, id) {
d3_subclass(groups, d3_transitionPrototype);
groups.namespace = ns;
groups.id = id;
return groups;
}
var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
d3_transitionPrototype.call = d3_selectionPrototype.call;
d3_transitionPrototype.empty = d3_selectionPrototype.empty;
d3_transitionPrototype.node = d3_selectionPrototype.node;
d3_transitionPrototype.size = d3_selectionPrototype.size;
d3.transition = function (selection, name) {
return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d3.selection().transition(selection);
};
d3.transition.prototype = d3_transitionPrototype;
d3_transitionPrototype.select = function (selector) {
var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnode, node;
selector = d3_selection_selector(selector);
for (var j = -1, m = this.length; ++j < m;) {
subgroups.push(subgroup = []);
for (var group = this[j], i = -1, n = group.length; ++i < n;) {
if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
if ('__data__' in node)
subnode.__data__ = node.__data__;
d3_transitionNode(subnode, i, ns, id, node[ns][id]);
subgroup.push(subnode);
} else {
subgroup.push(null);
}
}
}
return d3_transition(subgroups, ns, id);
};
d3_transitionPrototype.selectAll = function (selector) {
var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnodes, node, subnode, transition;
selector = d3_selection_selectorAll(selector);
for (var j = -1, m = this.length; ++j < m;) {
for (var group = this[j], i = -1, n = group.length; ++i < n;) {
if (node = group[i]) {
transition = node[ns][id];
subnodes = selector.call(node, node.__data__, i, j);
subgroups.push(subgroup = []);
for (var k = -1, o = subnodes.length; ++k < o;) {
if (subnode = subnodes[k])
d3_transitionNode(subnode, k, ns, id, transition);
subgroup.push(subnode);
}
}
}
}
return d3_transition(subgroups, ns, id);
};
d3_transitionPrototype.filter = function (filter) {
var subgroups = [], subgroup, group, node;
if (typeof filter !== 'function')
filter = d3_selection_filter(filter);
for (var j = 0, m = this.length; j < m; j++) {
subgroups.push(subgroup = []);
for (var group = this[j], i = 0, n = group.length; i < n; i++) {
if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
subgroup.push(node);
}
}
}
return d3_transition(subgroups, this.namespace, this.id);
};
d3_transitionPrototype.tween = function (name, tween) {
var id = this.id, ns = this.namespace;
if (arguments.length < 2)
return this.node()[ns][id].tween.get(name);
return d3_selection_each(this, tween == null ? function (node) {
node[ns][id].tween.remove(name);
} : function (node) {
node[ns][id].tween.set(name, tween);
});
};
function d3_transition_tween(groups, name, value, tween) {
var id = groups.id, ns = groups.namespace;
return d3_selection_each(groups, typeof value === 'function' ? function (node, i, j) {
node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
} : (value = tween(value), function (node) {
node[ns][id].tween.set(name, value);
}));
}
d3_transitionPrototype.attr = function (nameNS, value) {
if (arguments.length < 2) {
for (value in nameNS)
this.attr(value, nameNS[value]);
return this;
}
var interpolate = nameNS == 'transform' ? d3_interpolateTransform : d3_interpolate, name = d3.ns.qualify(nameNS);
function attrNull() {
this.removeAttribute(name);
}
function attrNullNS() {
this.removeAttributeNS(name.space, name.local);
}
function attrTween(b) {
return b == null ? attrNull : (b += '', function () {
var a = this.getAttribute(name), i;
return a !== b && (i = interpolate(a, b), function (t) {
this.setAttribute(name, i(t));
});
});
}
function attrTweenNS(b) {
return b == null ? attrNullNS : (b += '', function () {
var a = this.getAttributeNS(name.space, name.local), i;
return a !== b && (i = interpolate(a, b), function (t) {
this.setAttributeNS(name.space, name.local, i(t));
});
});
}
return d3_transition_tween(this, 'attr.' + nameNS, value, name.local ? attrTweenNS : attrTween);
};
d3_transitionPrototype.attrTween = function (nameNS, tween) {
var name = d3.ns.qualify(nameNS);
function attrTween(d, i) {
var f = tween.call(this, d, i, this.getAttribute(name));
return f && function (t) {
this.setAttribute(name, f(t));
};
}
function attrTweenNS(d, i) {
var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
return f && function (t) {
this.setAttributeNS(name.space, name.local, f(t));
};
}
return this.tween('attr.' + nameNS, name.local ? attrTweenNS : attrTween);
};
d3_transitionPrototype.style = function (name, value, priority) {
var n = arguments.length;
if (n < 3) {
if (typeof name !== 'string') {
if (n < 2)
value = '';
for (priority in name)
this.style(priority, name[priority], value);
return this;
}
priority = '';
}
function styleNull() {
this.style.removeProperty(name);
}
function styleString(b) {
return b == null ? styleNull : (b += '', function () {
var a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name), i;
return a !== b && (i = d3_interpolate(a, b), function (t) {
this.style.setProperty(name, i(t), priority);
});
});
}
return d3_transition_tween(this, 'style.' + name, value, styleString);
};
d3_transitionPrototype.styleTween = function (name, tween, priority) {
if (arguments.length < 3)
priority = '';
function styleTween(d, i) {
var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
return f && function (t) {
this.style.setProperty(name, f(t), priority);
};
}
return this.tween('style.' + name, styleTween);
};
d3_transitionPrototype.text = function (value) {
return d3_transition_tween(this, 'text', value, d3_transition_text);
};
function d3_transition_text(b) {
if (b == null)
b = '';
return function () {
this.textContent = b;
};
}
d3_transitionPrototype.remove = function () {
var ns = this.namespace;
return this.each('end.transition', function () {
var p;
if (this[ns].count < 2 && (p = this.parentNode))
p.removeChild(this);
});
};
d3_transitionPrototype.ease = function (value) {
var id = this.id, ns = this.namespace;
if (arguments.length < 1)
return this.node()[ns][id].ease;
if (typeof value !== 'function')
value = d3.ease.apply(d3, arguments);
return d3_selection_each(this, function (node) {
node[ns][id].ease = value;
});
};
d3_transitionPrototype.delay = function (value) {
var id = this.id, ns = this.namespace;
if (arguments.length < 1)
return this.node()[ns][id].delay;
return d3_selection_each(this, typeof value === 'function' ? function (node, i, j) {
node[ns][id].delay = +value.call(node, node.__data__, i, j);
} : (value = +value, function (node) {
node[ns][id].delay = value;
}));
};
d3_transitionPrototype.duration = function (value) {
var id = this.id, ns = this.namespace;
if (arguments.length < 1)
return this.node()[ns][id].duration;
return d3_selection_each(this, typeof value === 'function' ? function (node, i, j) {
node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
} : (value = Math.max(1, value), function (node) {
node[ns][id].duration = value;
}));
};
d3_transitionPrototype.each = function (type, listener) {
var id = this.id, ns = this.namespace;
if (arguments.length < 2) {
var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
try {
d3_transitionInheritId = id;
d3_selection_each(this, function (node, i, j) {
d3_transitionInherit = node[ns][id];
type.call(node, node.__data__, i, j);
});
} finally {
d3_transitionInherit = inherit;
d3_transitionInheritId = inheritId;
}
} else {
d3_selection_each(this, function (node) {
var transition = node[ns][id];
(transition.event || (transition.event = d3.dispatch('start', 'end', 'interrupt'))).on(type, listener);
});
}
return this;
};
d3_transitionPrototype.transition = function () {
var id0 = this.id, id1 = ++d3_transitionId, ns = this.namespace, subgroups = [], subgroup, group, node, transition;
for (var j = 0, m = this.length; j < m; j++) {
subgroups.push(subgroup = []);
for (var group = this[j], i = 0, n = group.length; i < n; i++) {
if (node = group[i]) {
transition = node[ns][id0];
d3_transitionNode(node, i, ns, id1, {
time: transition.time,
ease: transition.ease,
delay: transition.delay + transition.duration,
duration: transition.duration
});
}
subgroup.push(node);
}
}
return d3_transition(subgroups, ns, id1);
};
function d3_transitionNamespace(name) {
return name == null ? '__transition__' : '__transition_' + name + '__';
}
function d3_transitionNode(node, i, ns, id, inherit) {
var lock = node[ns] || (node[ns] = {
active: 0,
count: 0
}), transition = lock[id];
if (!transition) {
var time = inherit.time;
transition = lock[id] = {
tween: new d3_Map(),
time: time,
delay: inherit.delay,
duration: inherit.duration,
ease: inherit.ease,
index: i
};
inherit = null;
++lock.count;
d3.timer(function (elapsed) {
var delay = transition.delay, duration, ease, timer = d3_timer_active, tweened = [];
timer.t = delay + time;
if (delay <= elapsed)
return start(elapsed - delay);
timer.c = start;
function start(elapsed) {
if (lock.active > id)
return stop();
var active = lock[lock.active];
if (active) {
--lock.count;
delete lock[lock.active];
active.event && active.event.interrupt.call(node, node.__data__, active.index);
}
lock.active = id;
transition.event && transition.event.start.call(node, node.__data__, i);
transition.tween.forEach(function (key, value) {
if (value = value.call(node, node.__data__, i)) {
tweened.push(value);
}
});
ease = transition.ease;
duration = transition.duration;
d3.timer(function () {
timer.c = tick(elapsed || 1) ? d3_true : tick;
return 1;
}, 0, time);
}
function tick(elapsed) {
if (lock.active !== id)
return 1;
var t = elapsed / duration, e = ease(t), n = tweened.length;
while (n > 0) {
tweened[--n].call(node, e);
}
if (t >= 1) {
transition.event && transition.event.end.call(node, node.__data__, i);
return stop();
}
}
function stop() {
if (--lock.count)
delete lock[id];
else
delete node[ns];
return 1;
}
}, 0, time);
}
}
d3.svg.axis = function () {
var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickArguments_ = [10], tickValues = null, tickFormat_;
function axis(g) {
g.each(function () {
var g = d3.select(this);
var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = scale.copy();
var ticks = tickValues == null ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues, tickFormat = tickFormat_ == null ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_, tick = g.selectAll('.tick').data(ticks, scale1), tickEnter = tick.enter().insert('g', '.domain').attr('class', 'tick').style('opacity', ε), tickExit = d3.transition(tick.exit()).style('opacity', ε).remove(), tickUpdate = d3.transition(tick.order()).style('opacity', 1), tickSpacing = Math.max(innerTickSize, 0) + tickPadding, tickTransform;
var range = d3_scaleRange(scale1), path = g.selectAll('.domain').data([0]), pathUpdate = (path.enter().append('path').attr('class', 'domain'), d3.transition(path));
tickEnter.append('line');
tickEnter.append('text');
var lineEnter = tickEnter.select('line'), lineUpdate = tickUpdate.select('line'), text = tick.select('text').text(tickFormat), textEnter = tickEnter.select('text'), textUpdate = tickUpdate.select('text'), sign = orient === 'top' || orient === 'left' ? -1 : 1, x1, x2, y1, y2;
if (orient === 'bottom' || orient === 'top') {
tickTransform = d3_svg_axisX, x1 = 'x', y1 = 'y', x2 = 'x2', y2 = 'y2';
text.attr('dy', sign < 0 ? '0em' : '.71em').style('text-anchor', 'middle');
pathUpdate.attr('d', 'M' + range[0] + ',' + sign * outerTickSize + 'V0H' + range[1] + 'V' + sign * outerTickSize);
} else {
tickTransform = d3_svg_axisY, x1 = 'y', y1 = 'x', x2 = 'y2', y2 = 'x2';
text.attr('dy', '.32em').style('text-anchor', sign < 0 ? 'end' : 'start');
pathUpdate.attr('d', 'M' + sign * outerTickSize + ',' + range[0] + 'H0V' + range[1] + 'H' + sign * outerTickSize);
}
lineEnter.attr(y2, sign * innerTickSize);
textEnter.attr(y1, sign * tickSpacing);
lineUpdate.attr(x2, 0).attr(y2, sign * innerTickSize);
textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);
if (scale1.rangeBand) {
var x = scale1, dx = x.rangeBand() / 2;
scale0 = scale1 = function (d) {
return x(d) + dx;
};
} else if (scale0.rangeBand) {
scale0 = scale1;
} else {
tickExit.call(tickTransform, scale1, scale0);
}
tickEnter.call(tickTransform, scale0, scale1);
tickUpdate.call(tickTransform, scale1, scale1);
});
}
axis.scale = function (x) {
if (!arguments.length)
return scale;
scale = x;
return axis;
};
axis.orient = function (x) {
if (!arguments.length)
return orient;
orient = x in d3_svg_axisOrients ? x + '' : d3_svg_axisDefaultOrient;
return axis;
};
axis.ticks = function () {
if (!arguments.length)
return tickArguments_;
tickArguments_ = arguments;
return axis;
};
axis.tickValues = function (x) {
if (!arguments.length)
return tickValues;
tickValues = x;
return axis;
};
axis.tickFormat = function (x) {
if (!arguments.length)
return tickFormat_;
tickFormat_ = x;
return axis;
};
axis.tickSize = function (x) {
var n = arguments.length;
if (!n)
return innerTickSize;
innerTickSize = +x;
outerTickSize = +arguments[n - 1];
return axis;
};
axis.innerTickSize = function (x) {
if (!arguments.length)
return innerTickSize;
innerTickSize = +x;
return axis;
};
axis.outerTickSize = function (x) {
if (!arguments.length)
return outerTickSize;
outerTickSize = +x;
return axis;
};
axis.tickPadding = function (x) {
if (!arguments.length)
return tickPadding;
tickPadding = +x;
return axis;
};
axis.tickSubdivide = function () {
return arguments.length && axis;
};
return axis;
};
var d3_svg_axisDefaultOrient = 'bottom', d3_svg_axisOrients = {
top: 1,
right: 1,
bottom: 1,
left: 1
};
function d3_svg_axisX(selection, x0, x1) {
selection.attr('transform', function (d) {
var v0 = x0(d);
return 'translate(' + (isFinite(v0) ? v0 : x1(d)) + ',0)';
});
}
function d3_svg_axisY(selection, y0, y1) {
selection.attr('transform', function (d) {
var v0 = y0(d);
return 'translate(0,' + (isFinite(v0) ? v0 : y1(d)) + ')';
});
}
d3.svg.brush = function () {
var event = d3_eventDispatch(brush, 'brushstart', 'brush', 'brushend'), x = null, y = null, xExtent = [
0,
0
], yExtent = [
0,
0
], xExtentDomain, yExtentDomain, xClamp = true, yClamp = true, resizes = d3_svg_brushResizes[0];
function brush(g) {
g.each(function () {
var g = d3.select(this).style('pointer-events', 'all').style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)').on('mousedown.brush', brushstart).on('touchstart.brush', brushstart);
var background = g.selectAll('.background').data([0]);
background.enter().append('rect').attr('class', 'background').style('visibility', 'hidden').style('cursor', 'crosshair');
g.selectAll('.extent').data([0]).enter().append('rect').attr('class', 'extent').style('cursor', 'move');
var resize = g.selectAll('.resize').data(resizes, d3_identity);
resize.exit().remove();
resize.enter().append('g').attr('class', function (d) {
return 'resize ' + d;
}).style('cursor', function (d) {
return d3_svg_brushCursor[d];
}).append('rect').attr('x', function (d) {
return /[ew]$/.test(d) ? -3 : null;
}).attr('y', function (d) {
return /^[ns]/.test(d) ? -3 : null;
}).attr('width', 6).attr('height', 6).style('visibility', 'hidden');
resize.style('display', brush.empty() ? 'none' : null);
var gUpdate = d3.transition(g), backgroundUpdate = d3.transition(background), range;
if (x) {
range = d3_scaleRange(x);
backgroundUpdate.attr('x', range[0]).attr('width', range[1] - range[0]);
redrawX(gUpdate);
}
if (y) {
range = d3_scaleRange(y);
backgroundUpdate.attr('y', range[0]).attr('height', range[1] - range[0]);
redrawY(gUpdate);
}
redraw(gUpdate);
});
}
brush.event = function (g) {
g.each(function () {
var event_ = event.of(this, arguments), extent1 = {
x: xExtent,
y: yExtent,
i: xExtentDomain,
j: yExtentDomain
}, extent0 = this.__chart__ || extent1;
this.__chart__ = extent1;
if (d3_transitionInheritId) {
d3.select(this).transition().each('start.brush', function () {
xExtentDomain = extent0.i;
yExtentDomain = extent0.j;
xExtent = extent0.x;
yExtent = extent0.y;
event_({ type: 'brushstart' });
}).tween('brush:brush', function () {
var xi = d3_interpolateArray(xExtent, extent1.x), yi = d3_interpolateArray(yExtent, extent1.y);
xExtentDomain = yExtentDomain = null;
return function (t) {
xExtent = extent1.x = xi(t);
yExtent = extent1.y = yi(t);
event_({
type: 'brush',
mode: 'resize'
});
};
}).each('end.brush', function () {
xExtentDomain = extent1.i;
yExtentDomain = extent1.j;
event_({
type: 'brush',
mode: 'resize'
});
event_({ type: 'brushend' });
});
} else {
event_({ type: 'brushstart' });
event_({
type: 'brush',
mode: 'resize'
});
event_({ type: 'brushend' });
}
});
};
function redraw(g) {
g.selectAll('.resize').attr('transform', function (d) {
return 'translate(' + xExtent[+/e$/.test(d)] + ',' + yExtent[+/^s/.test(d)] + ')';
});
}
function redrawX(g) {
g.select('.extent').attr('x', xExtent[0]);
g.selectAll('.extent,.n>rect,.s>rect').attr('width', xExtent[1] - xExtent[0]);
}
function redrawY(g) {
g.select('.extent').attr('y', yExtent[0]);
g.selectAll('.extent,.e>rect,.w>rect').attr('height', yExtent[1] - yExtent[0]);
}
function brushstart() {
var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed('extent'), dragRestore = d3_event_dragSuppress(target), center, origin = d3.mouse(target), offset;
var w = d3.select(d3_window(target)).on('keydown.brush', keydown).on('keyup.brush', keyup);
if (d3.event.changedTouches) {
w.on('touchmove.brush', brushmove).on('touchend.brush', brushend);
} else {
w.on('mousemove.brush', brushmove).on('mouseup.brush', brushend);
}
g.interrupt().selectAll('*').interrupt();
if (dragging) {
origin[0] = xExtent[0] - origin[0];
origin[1] = yExtent[0] - origin[1];
} else if (resizing) {
var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
offset = [
xExtent[1 - ex] - origin[0],
yExtent[1 - ey] - origin[1]
];
origin[0] = xExtent[ex];
origin[1] = yExtent[ey];
} else if (d3.event.altKey)
center = origin.slice();
g.style('pointer-events', 'none').selectAll('.resize').style('display', null);
d3.select('body').style('cursor', eventTarget.style('cursor'));
event_({ type: 'brushstart' });
brushmove();
function keydown() {
if (d3.event.keyCode == 32) {
if (!dragging) {
center = null;
origin[0] -= xExtent[1];
origin[1] -= yExtent[1];
dragging = 2;
}
d3_eventPreventDefault();
}
}
function keyup() {
if (d3.event.keyCode == 32 && dragging == 2) {
origin[0] += xExtent[1];
origin[1] += yExtent[1];
dragging = 0;
d3_eventPreventDefault();
}
}
function brushmove() {
var point = d3.mouse(target), moved = false;
if (offset) {
point[0] += offset[0];
point[1] += offset[1];
}
if (!dragging) {
if (d3.event.altKey) {
if (!center)
center = [
(xExtent[0] + xExtent[1]) / 2,
(yExtent[0] + yExtent[1]) / 2
];
origin[0] = xExtent[+(point[0] < center[0])];
origin[1] = yExtent[+(point[1] < center[1])];
} else
center = null;
}
if (resizingX && move1(point, x, 0)) {
redrawX(g);
moved = true;
}
if (resizingY && move1(point, y, 1)) {
redrawY(g);
moved = true;
}
if (moved) {
redraw(g);
event_({
type: 'brush',
mode: dragging ? 'move' : 'resize'
});
}
}
function move1(point, scale, i) {
var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], extent = i ? yExtent : xExtent, size = extent[1] - extent[0], min, max;
if (dragging) {
r0 -= position;
r1 -= size + position;
}
min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i];
if (dragging) {
max = (min += position) + size;
} else {
if (center)
position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
if (position < min) {
max = min;
min = position;
} else {
max = position;
}
}
if (extent[0] != min || extent[1] != max) {
if (i)
yExtentDomain = null;
else
xExtentDomain = null;
extent[0] = min;
extent[1] = max;
return true;
}
}
function brushend() {
brushmove();
g.style('pointer-events', 'all').selectAll('.resize').style('display', brush.empty() ? 'none' : null);
d3.select('body').style('cursor', null);
w.on('mousemove.brush', null).on('mouseup.brush', null).on('touchmove.brush', null).on('touchend.brush', null).on('keydown.brush', null).on('keyup.brush', null);
dragRestore();
event_({ type: 'brushend' });
}
}
brush.x = function (z) {
if (!arguments.length)
return x;
x = z;
resizes = d3_svg_brushResizes[!x << 1 | !y];
return brush;
};
brush.y = function (z) {
if (!arguments.length)
return y;
y = z;
resizes = d3_svg_brushResizes[!x << 1 | !y];
return brush;
};
brush.clamp = function (z) {
if (!arguments.length)
return x && y ? [
xClamp,
yClamp
] : x ? xClamp : y ? yClamp : null;
if (x && y)
xClamp = !!z[0], yClamp = !!z[1];
else if (x)
xClamp = !!z;
else if (y)
yClamp = !!z;
return brush;
};
brush.extent = function (z) {
var x0, x1, y0, y1, t;
if (!arguments.length) {
if (x) {
if (xExtentDomain) {
x0 = xExtentDomain[0], x1 = xExtentDomain[1];
} else {
x0 = xExtent[0], x1 = xExtent[1];
if (x.invert)
x0 = x.invert(x0), x1 = x.invert(x1);
if (x1 < x0)
t = x0, x0 = x1, x1 = t;
}
}
if (y) {
if (yExtentDomain) {
y0 = yExtentDomain[0], y1 = yExtentDomain[1];
} else {
y0 = yExtent[0], y1 = yExtent[1];
if (y.invert)
y0 = y.invert(y0), y1 = y.invert(y1);
if (y1 < y0)
t = y0, y0 = y1, y1 = t;
}
}
return x && y ? [
[
x0,
y0
],
[
x1,
y1
]
] : x ? [
x0,
x1
] : y && [
y0,
y1
];
}
if (x) {
x0 = z[0], x1 = z[1];
if (y)
x0 = x0[0], x1 = x1[0];
xExtentDomain = [
x0,
x1
];
if (x.invert)
x0 = x(x0), x1 = x(x1);
if (x1 < x0)
t = x0, x0 = x1, x1 = t;
if (x0 != xExtent[0] || x1 != xExtent[1])
xExtent = [
x0,
x1
];
}
if (y) {
y0 = z[0], y1 = z[1];
if (x)
y0 = y0[1], y1 = y1[1];
yExtentDomain = [
y0,
y1
];
if (y.invert)
y0 = y(y0), y1 = y(y1);
if (y1 < y0)
t = y0, y0 = y1, y1 = t;
if (y0 != yExtent[0] || y1 != yExtent[1])
yExtent = [
y0,
y1
];
}
return brush;
};
brush.clear = function () {
if (!brush.empty()) {
xExtent = [
0,
0
], yExtent = [
0,
0
];
xExtentDomain = yExtentDomain = null;
}
return brush;
};
brush.empty = function () {
return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1];
};
return d3.rebind(brush, event, 'on');
};
var d3_svg_brushCursor = {
n: 'ns-resize',
e: 'ew-resize',
s: 'ns-resize',
w: 'ew-resize',
nw: 'nwse-resize',
ne: 'nesw-resize',
se: 'nwse-resize',
sw: 'nesw-resize'
};
var d3_svg_brushResizes = [
[
'n',
'e',
's',
'w',
'nw',
'ne',
'se',
'sw'
],
[
'e',
'w'
],
[
'n',
's'
],
[]
];
var d3_time_format = d3_time.format = d3_locale_enUS.timeFormat;
var d3_time_formatUtc = d3_time_format.utc;
var d3_time_formatIso = d3_time_formatUtc('%Y-%m-%dT%H:%M:%S.%LZ');
d3_time_format.iso = Date.prototype.toISOString && +new Date('2000-01-01T00:00:00.000Z') ? d3_time_formatIsoNative : d3_time_formatIso;
function d3_time_formatIsoNative(date) {
return date.toISOString();
}
d3_time_formatIsoNative.parse = function (string) {
var date = new Date(string);
return isNaN(date) ? null : date;
};
d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
d3_time.second = d3_time_interval(function (date) {
return new d3_date(Math.floor(date / 1000) * 1000);
}, function (date, offset) {
date.setTime(date.getTime() + Math.floor(offset) * 1000);
}, function (date) {
return date.getSeconds();
});
d3_time.seconds = d3_time.second.range;
d3_time.seconds.utc = d3_time.second.utc.range;
d3_time.minute = d3_time_interval(function (date) {
return new d3_date(Math.floor(date / 60000) * 60000);
}, function (date, offset) {
date.setTime(date.getTime() + Math.floor(offset) * 60000);
}, function (date) {
return date.getMinutes();
});
d3_time.minutes = d3_time.minute.range;
d3_time.minutes.utc = d3_time.minute.utc.range;
d3_time.hour = d3_time_interval(function (date) {
var timezone = date.getTimezoneOffset() / 60;
return new d3_date((Math.floor(date / 3600000 - timezone) + timezone) * 3600000);
}, function (date, offset) {
date.setTime(date.getTime() + Math.floor(offset) * 3600000);
}, function (date) {
return date.getHours();
});
d3_time.hours = d3_time.hour.range;
d3_time.hours.utc = d3_time.hour.utc.range;
d3_time.month = d3_time_interval(function (date) {
date = d3_time.day(date);
date.setDate(1);
return date;
}, function (date, offset) {
date.setMonth(date.getMonth() + offset);
}, function (date) {
return date.getMonth();
});
d3_time.months = d3_time.month.range;
d3_time.months.utc = d3_time.month.utc.range;
function d3_time_scale(linear, methods, format) {
function scale(x) {
return linear(x);
}
scale.invert = function (x) {
return d3_time_scaleDate(linear.invert(x));
};
scale.domain = function (x) {
if (!arguments.length)
return linear.domain().map(d3_time_scaleDate);
linear.domain(x);
return scale;
};
function tickMethod(extent, count) {
var span = extent[1] - extent[0], target = span / count, i = d3.bisect(d3_time_scaleSteps, target);
return i == d3_time_scaleSteps.length ? [
methods.year,
d3_scale_linearTickRange(extent.map(function (d) {
return d / 31536000000;
}), count)[2]
] : !i ? [
d3_time_scaleMilliseconds,
d3_scale_linearTickRange(extent, count)[2]
] : methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i];
}
scale.nice = function (interval, skip) {
var domain = scale.domain(), extent = d3_scaleExtent(domain), method = interval == null ? tickMethod(extent, 10) : typeof interval === 'number' && tickMethod(extent, interval);
if (method)
interval = method[0], skip = method[1];
function skipped(date) {
return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length;
}
return scale.domain(d3_scale_nice(domain, skip > 1 ? {
floor: function (date) {
while (skipped(date = interval.floor(date)))
date = d3_time_scaleDate(date - 1);
return date;
},
ceil: function (date) {
while (skipped(date = interval.ceil(date)))
date = d3_time_scaleDate(+date + 1);
return date;
}
} : interval));
};
scale.ticks = function (interval, skip) {
var extent = d3_scaleExtent(scale.domain()), method = interval == null ? tickMethod(extent, 10) : typeof interval === 'number' ? tickMethod(extent, interval) : !interval.range && [
{ range: interval },
skip
];
if (method)
interval = method[0], skip = method[1];
return interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip);
};
scale.tickFormat = function () {
return format;
};
scale.copy = function () {
return d3_time_scale(linear.copy(), methods, format);
};
return d3_scale_linearRebind(scale, linear);
}
function d3_time_scaleDate(t) {
return new Date(t);
}
var d3_time_scaleSteps = [
1000,
5000,
15000,
30000,
60000,
300000,
900000,
1800000,
3600000,
10800000,
21600000,
43200000,
86400000,
172800000,
604800000,
2592000000,
7776000000,
31536000000
];
var d3_time_scaleLocalMethods = [
[
d3_time.second,
1
],
[
d3_time.second,
5
],
[
d3_time.second,
15
],
[
d3_time.second,
30
],
[
d3_time.minute,
1
],
[
d3_time.minute,
5
],
[
d3_time.minute,
15
],
[
d3_time.minute,
30
],
[
d3_time.hour,
1
],
[
d3_time.hour,
3
],
[
d3_time.hour,
6
],
[
d3_time.hour,
12
],
[
d3_time.day,
1
],
[
d3_time.day,
2
],
[
d3_time.week,
1
],
[
d3_time.month,
1
],
[
d3_time.month,
3
],
[
d3_time.year,
1
]
];
var d3_time_scaleLocalFormat = d3_time_format.multi([
[
'.%L',
function (d) {
return d.getMilliseconds();
}
],
[
':%S',
function (d) {
return d.getSeconds();
}
],
[
'%I:%M',
function (d) {
return d.getMinutes();
}
],
[
'%I %p',
function (d) {
return d.getHours();
}
],
[
'%a %d',
function (d) {
return d.getDay() && d.getDate() != 1;
}
],
[
'%b %d',
function (d) {
return d.getDate() != 1;
}
],
[
'%B',
function (d) {
return d.getMonth();
}
],
[
'%Y',
d3_true
]
]);
var d3_time_scaleMilliseconds = {
range: function (start, stop, step) {
return d3.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate);
},
floor: d3_identity,
ceil: d3_identity
};
d3_time_scaleLocalMethods.year = d3_time.year;
d3_time.scale = function () {
return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
};
var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function (m) {
return [
m[0].utc,
m[1]
];
});
var d3_time_scaleUtcFormat = d3_time_formatUtc.multi([
[
'.%L',
function (d) {
return d.getUTCMilliseconds();
}
],
[
':%S',
function (d) {
return d.getUTCSeconds();
}
],
[
'%I:%M',
function (d) {
return d.getUTCMinutes();
}
],
[
'%I %p',
function (d) {
return d.getUTCHours();
}
],
[
'%a %d',
function (d) {
return d.getUTCDay() && d.getUTCDate() != 1;
}
],
[
'%b %d',
function (d) {
return d.getUTCDate() != 1;
}
],
[
'%B',
function (d) {
return d.getUTCMonth();
}
],
[
'%Y',
d3_true
]
]);
d3_time_scaleUtcMethods.year = d3_time.year.utc;
d3_time.scale.utc = function () {
return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat);
};
d3.text = d3_xhrType(function (request) {
return request.responseText;
});
d3.json = function (url, callback) {
return d3_xhr(url, 'application/json', d3_json, callback);
};
function d3_json(request) {
return JSON.parse(request.responseText);
}
d3.html = function (url, callback) {
return d3_xhr(url, 'text/html', d3_html, callback);
};
function d3_html(request) {
var range = d3_document.createRange();
range.selectNode(d3_document.body);
return range.createContextualFragment(request.responseText);
}
d3.xml = d3_xhrType(function (request) {
return request.responseXML;
});
if (typeof define === 'function' && define.amd)
define(d3);
else if (typeof module === 'object' && module.exports)
module.exports = d3;
this.d3 = d3;
}();
;
(function () {
var undefined;
var VERSION = '3.10.1';
var BIND_FLAG = 1, BIND_KEY_FLAG = 2, CURRY_BOUND_FLAG = 4, CURRY_FLAG = 8, CURRY_RIGHT_FLAG = 16, PARTIAL_FLAG = 32, PARTIAL_RIGHT_FLAG = 64, ARY_FLAG = 128, REARG_FLAG = 256;
var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = '...';
var HOT_COUNT = 150, HOT_SPAN = 16;
var LARGE_ARRAY_SIZE = 200;
var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2;
var FUNC_ERROR_TEXT = 'Expected a function';
var PLACEHOLDER = '__lodash_placeholder__';
var argsTag = '[object Arguments]', arrayTag = '[object Array]', boolTag = '[object Boolean]', dateTag = '[object Date]', errorTag = '[object Error]', funcTag = '[object Function]', mapTag = '[object Map]', numberTag = '[object Number]', objectTag = '[object Object]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]', float32Tag = '[object Float32Array]', float64Tag = '[object Float64Array]', int8Tag = '[object Int8Array]', int16Tag = '[object Int16Array]', int32Tag = '[object Int32Array]', uint8Tag = '[object Uint8Array]', uint8ClampedTag = '[object Uint8ClampedArray]', uint16Tag = '[object Uint16Array]', uint32Tag = '[object Uint32Array]';
var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g, reUnescapedHtml = /[&<>"'`]/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g, reHasRegExpChars = RegExp(reRegExpChars.source);
var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;
var reEscapeChar = /\\(\\)?/g;
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var reFlags = /\w*$/;
var reHasHexPrefix = /^0[xX]/;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var reIsUint = /^\d+$/;
var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
var reNoMatch = /($^)/;
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
var reWords = function () {
var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]', lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
}();
var contextProps = [
'Array',
'ArrayBuffer',
'Date',
'Error',
'Float32Array',
'Float64Array',
'Function',
'Int8Array',
'Int16Array',
'Int32Array',
'Math',
'Number',
'Object',
'RegExp',
'Set',
'String',
'_',
'clearTimeout',
'isFinite',
'parseFloat',
'parseInt',
'setTimeout',
'TypeError',
'Uint8Array',
'Uint8ClampedArray',
'Uint16Array',
'Uint32Array',
'WeakMap'
];
var templateCounter = -1;
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;
var deburredLetters = {
'À': 'A',
'Á': 'A',
'Â': 'A',
'Ã': 'A',
'Ä': 'A',
'Å': 'A',
'à': 'a',
'á': 'a',
'â': 'a',
'ã': 'a',
'ä': 'a',
'å': 'a',
'Ç': 'C',
'ç': 'c',
'Ð': 'D',
'ð': 'd',
'È': 'E',
'É': 'E',
'Ê': 'E',
'Ë': 'E',
'è': 'e',
'é': 'e',
'ê': 'e',
'ë': 'e',
'Ì': 'I',
'Í': 'I',
'Î': 'I',
'Ï': 'I',
'ì': 'i',
'í': 'i',
'î': 'i',
'ï': 'i',
'Ñ': 'N',
'ñ': 'n',
'Ò': 'O',
'Ó': 'O',
'Ô': 'O',
'Õ': 'O',
'Ö': 'O',
'Ø': 'O',
'ò': 'o',
'ó': 'o',
'ô': 'o',
'õ': 'o',
'ö': 'o',
'ø': 'o',
'Ù': 'U',
'Ú': 'U',
'Û': 'U',
'Ü': 'U',
'ù': 'u',
'ú': 'u',
'û': 'u',
'ü': 'u',
'Ý': 'Y',
'ý': 'y',
'ÿ': 'y',
'Æ': 'Ae',
'æ': 'ae',
'Þ': 'Th',
'þ': 'th',
'ß': 'ss'
};
var htmlEscapes = {
'&': '&amp;',
'<': '&lt;',
'>': '&gt;',
'"': '&quot;',
'\'': '&#39;',
'`': '&#96;'
};
var htmlUnescapes = {
'&amp;': '&',
'&lt;': '<',
'&gt;': '>',
'&quot;': '"',
'&#39;': '\'',
'&#96;': '`'
};
var objectTypes = {
'function': true,
'object': true
};
var regexpEscapes = {
'0': 'x30',
'1': 'x31',
'2': 'x32',
'3': 'x33',
'4': 'x34',
'5': 'x35',
'6': 'x36',
'7': 'x37',
'8': 'x38',
'9': 'x39',
'A': 'x41',
'B': 'x42',
'C': 'x43',
'D': 'x44',
'E': 'x45',
'F': 'x46',
'a': 'x61',
'b': 'x62',
'c': 'x63',
'd': 'x64',
'e': 'x65',
'f': 'x66',
'n': 'x6e',
'r': 'x72',
't': 'x74',
'u': 'x75',
'v': 'x76',
'x': 'x78'
};
var stringEscapes = {
'\\': '\\',
'\'': '\'',
'\n': 'n',
'\r': 'r',
'\u2028': 'u2028',
'\u2029': 'u2029'
};
var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
var freeSelf = objectTypes[typeof self] && self && self.Object && self;
var freeWindow = objectTypes[typeof window] && window && window.Object && window;
var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
var root = freeGlobal || freeWindow !== (this && this.window) && freeWindow || freeSelf || this;
function baseCompareAscending(value, other) {
if (value !== other) {
var valIsNull = value === null, valIsUndef = value === undefined, valIsReflexive = value === value;
var othIsNull = other === null, othIsUndef = other === undefined, othIsReflexive = other === other;
if (value > other && !othIsNull || !valIsReflexive || valIsNull && !othIsUndef && othIsReflexive || valIsUndef && othIsReflexive) {
return 1;
}
if (value < other && !valIsNull || !othIsReflexive || othIsNull && !valIsUndef && valIsReflexive || othIsUndef && valIsReflexive) {
return -1;
}
}
return 0;
}
function baseFindIndex(array, predicate, fromRight) {
var length = array.length, index = fromRight ? length : -1;
while (fromRight ? index-- : ++index < length) {
if (predicate(array[index], index, array)) {
return index;
}
}
return -1;
}
function baseIndexOf(array, value, fromIndex) {
if (value !== value) {
return indexOfNaN(array, fromIndex);
}
var index = fromIndex - 1, length = array.length;
while (++index < length) {
if (array[index] === value) {
return index;
}
}
return -1;
}
function baseIsFunction(value) {
return typeof value == 'function' || false;
}
function baseToString(value) {
return value == null ? '' : value + '';
}
function charsLeftIndex(string, chars) {
var index = -1, length = string.length;
while (++index < length && chars.indexOf(string.charAt(index)) > -1) {
}
return index;
}
function charsRightIndex(string, chars) {
var index = string.length;
while (index-- && chars.indexOf(string.charAt(index)) > -1) {
}
return index;
}
function compareAscending(object, other) {
return baseCompareAscending(object.criteria, other.criteria) || object.index - other.index;
}
function compareMultiple(object, other, orders) {
var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
while (++index < length) {
var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
if (result) {
if (index >= ordersLength) {
return result;
}
var order = orders[index];
return result * (order === 'asc' || order === true ? 1 : -1);
}
}
return object.index - other.index;
}
function deburrLetter(letter) {
return deburredLetters[letter];
}
function escapeHtmlChar(chr) {
return htmlEscapes[chr];
}
function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
if (leadingChar) {
chr = regexpEscapes[chr];
} else if (whitespaceChar) {
chr = stringEscapes[chr];
}
return '\\' + chr;
}
function escapeStringChar(chr) {
return '\\' + stringEscapes[chr];
}
function indexOfNaN(array, fromIndex, fromRight) {
var length = array.length, index = fromIndex + (fromRight ? 0 : -1);
while (fromRight ? index-- : ++index < length) {
var other = array[index];
if (other !== other) {
return index;
}
}
return -1;
}
function isObjectLike(value) {
return !!value && typeof value == 'object';
}
function isSpace(charCode) {
return charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160 || charCode == 5760 || charCode == 6158 || charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279);
}
function replaceHolders(array, placeholder) {
var index = -1, length = array.length, resIndex = -1, result = [];
while (++index < length) {
if (array[index] === placeholder) {
array[index] = PLACEHOLDER;
result[++resIndex] = index;
}
}
return result;
}
function sortedUniq(array, iteratee) {
var seen, index = -1, length = array.length, resIndex = -1, result = [];
while (++index < length) {
var value = array[index], computed = iteratee ? iteratee(value, index, array) : value;
if (!index || seen !== computed) {
seen = computed;
result[++resIndex] = value;
}
}
return result;
}
function trimmedLeftIndex(string) {
var index = -1, length = string.length;
while (++index < length && isSpace(string.charCodeAt(index))) {
}
return index;
}
function trimmedRightIndex(string) {
var index = string.length;
while (index-- && isSpace(string.charCodeAt(index))) {
}
return index;
}
function unescapeHtmlChar(chr) {
return htmlUnescapes[chr];
}
function runInContext(context) {
context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
var Array = context.Array, Date = context.Date, Error = context.Error, Function = context.Function, Math = context.Math, Number = context.Number, Object = context.Object, RegExp = context.RegExp, String = context.String, TypeError = context.TypeError;
var arrayProto = Array.prototype, objectProto = Object.prototype, stringProto = String.prototype;
var fnToString = Function.prototype.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var idCounter = 0;
var objToString = objectProto.toString;
var oldDash = root._;
var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
var ArrayBuffer = context.ArrayBuffer, clearTimeout = context.clearTimeout, parseFloat = context.parseFloat, pow = Math.pow, propertyIsEnumerable = objectProto.propertyIsEnumerable, Set = getNative(context, 'Set'), setTimeout = context.setTimeout, splice = arrayProto.splice, Uint8Array = context.Uint8Array, WeakMap = getNative(context, 'WeakMap');
var nativeCeil = Math.ceil, nativeCreate = getNative(Object, 'create'), nativeFloor = Math.floor, nativeIsArray = getNative(Array, 'isArray'), nativeIsFinite = context.isFinite, nativeKeys = getNative(Object, 'keys'), nativeMax = Math.max, nativeMin = Math.min, nativeNow = getNative(Date, 'now'), nativeParseInt = context.parseInt, nativeRandom = Math.random;
var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY, POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
var MAX_SAFE_INTEGER = 9007199254740991;
var metaMap = WeakMap && new WeakMap();
var realNames = {};
function lodash(value) {
if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
if (value instanceof LodashWrapper) {
return value;
}
if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
return wrapperClone(value);
}
}
return new LodashWrapper(value);
}
function baseLodash() {
}
function LodashWrapper(value, chainAll, actions) {
this.__wrapped__ = value;
this.__actions__ = actions || [];
this.__chain__ = !!chainAll;
}
var support = lodash.support = {};
lodash.templateSettings = {
'escape': reEscape,
'evaluate': reEvaluate,
'interpolate': reInterpolate,
'variable': '',
'imports': { '_': lodash }
};
function LazyWrapper(value) {
this.__wrapped__ = value;
this.__actions__ = [];
this.__dir__ = 1;
this.__filtered__ = false;
this.__iteratees__ = [];
this.__takeCount__ = POSITIVE_INFINITY;
this.__views__ = [];
}
function lazyClone() {
var result = new LazyWrapper(this.__wrapped__);
result.__actions__ = arrayCopy(this.__actions__);
result.__dir__ = this.__dir__;
result.__filtered__ = this.__filtered__;
result.__iteratees__ = arrayCopy(this.__iteratees__);
result.__takeCount__ = this.__takeCount__;
result.__views__ = arrayCopy(this.__views__);
return result;
}
function lazyReverse() {
if (this.__filtered__) {
var result = new LazyWrapper(this);
result.__dir__ = -1;
result.__filtered__ = true;
} else {
result = this.clone();
result.__dir__ *= -1;
}
return result;
}
function lazyValue() {
var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
if (!isArr || arrLength < LARGE_ARRAY_SIZE || arrLength == length && takeCount == length) {
return baseWrapperValue(array, this.__actions__);
}
var result = [];
outer:
while (length-- && resIndex < takeCount) {
index += dir;
var iterIndex = -1, value = array[index];
while (++iterIndex < iterLength) {
var data = iteratees[iterIndex], iteratee = data.iteratee, type = data.type, computed = iteratee(value);
if (type == LAZY_MAP_FLAG) {
value = computed;
} else if (!computed) {
if (type == LAZY_FILTER_FLAG) {
continue outer;
} else {
break outer;
}
}
}
result[resIndex++] = value;
}
return result;
}
function MapCache() {
this.__data__ = {};
}
function mapDelete(key) {
return this.has(key) && delete this.__data__[key];
}
function mapGet(key) {
return key == '__proto__' ? undefined : this.__data__[key];
}
function mapHas(key) {
return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
}
function mapSet(key, value) {
if (key != '__proto__') {
this.__data__[key] = value;
}
return this;
}
function SetCache(values) {
var length = values ? values.length : 0;
this.data = {
'hash': nativeCreate(null),
'set': new Set()
};
while (length--) {
this.push(values[length]);
}
}
function cacheIndexOf(cache, value) {
var data = cache.data, result = typeof value == 'string' || isObject(value) ? data.set.has(value) : data.hash[value];
return result ? 0 : -1;
}
function cachePush(value) {
var data = this.data;
if (typeof value == 'string' || isObject(value)) {
data.set.add(value);
} else {
data.hash[value] = true;
}
}
function arrayConcat(array, other) {
var index = -1, length = array.length, othIndex = -1, othLength = other.length, result = Array(length + othLength);
while (++index < length) {
result[index] = array[index];
}
while (++othIndex < othLength) {
result[index++] = other[othIndex];
}
return result;
}
function arrayCopy(source, array) {
var index = -1, length = source.length;
array || (array = Array(length));
while (++index < length) {
array[index] = source[index];
}
return array;
}
function arrayEach(array, iteratee) {
var index = -1, length = array.length;
while (++index < length) {
if (iteratee(array[index], index, array) === false) {
break;
}
}
return array;
}
function arrayEachRight(array, iteratee) {
var length = array.length;
while (length--) {
if (iteratee(array[length], length, array) === false) {
break;
}
}
return array;
}
function arrayEvery(array, predicate) {
var index = -1, length = array.length;
while (++index < length) {
if (!predicate(array[index], index, array)) {
return false;
}
}
return true;
}
function arrayExtremum(array, iteratee, comparator, exValue) {
var index = -1, length = array.length, computed = exValue, result = computed;
while (++index < length) {
var value = array[index], current = +iteratee(value);
if (comparator(current, computed)) {
computed = current;
result = value;
}
}
return result;
}
function arrayFilter(array, predicate) {
var index = -1, length = array.length, resIndex = -1, result = [];
while (++index < length) {
var value = array[index];
if (predicate(value, index, array)) {
result[++resIndex] = value;
}
}
return result;
}
function arrayMap(array, iteratee) {
var index = -1, length = array.length, result = Array(length);
while (++index < length) {
result[index] = iteratee(array[index], index, array);
}
return result;
}
function arrayPush(array, values) {
var index = -1, length = values.length, offset = array.length;
while (++index < length) {
array[offset + index] = values[index];
}
return array;
}
function arrayReduce(array, iteratee, accumulator, initFromArray) {
var index = -1, length = array.length;
if (initFromArray && length) {
accumulator = array[++index];
}
while (++index < length) {
accumulator = iteratee(accumulator, array[index], index, array);
}
return accumulator;
}
function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
var length = array.length;
if (initFromArray && length) {
accumulator = array[--length];
}
while (length--) {
accumulator = iteratee(accumulator, array[length], length, array);
}
return accumulator;
}
function arraySome(array, predicate) {
var index = -1, length = array.length;
while (++index < length) {
if (predicate(array[index], index, array)) {
return true;
}
}
return false;
}
function arraySum(array, iteratee) {
var length = array.length, result = 0;
while (length--) {
result += +iteratee(array[length]) || 0;
}
return result;
}
function assignDefaults(objectValue, sourceValue) {
return objectValue === undefined ? sourceValue : objectValue;
}
function assignOwnDefaults(objectValue, sourceValue, key, object) {
return objectValue === undefined || !hasOwnProperty.call(object, key) ? sourceValue : objectValue;
}
function assignWith(object, source, customizer) {
var index = -1, props = keys(source), length = props.length;
while (++index < length) {
var key = props[index], value = object[key], result = customizer(value, source[key], key, object, source);
if ((result === result ? result !== value : value === value) || value === undefined && !(key in object)) {
object[key] = result;
}
}
return object;
}
function baseAssign(object, source) {
return source == null ? object : baseCopy(source, keys(source), object);
}
function baseAt(collection, props) {
var index = -1, isNil = collection == null, isArr = !isNil && isArrayLike(collection), length = isArr ? collection.length : 0, propsLength = props.length, result = Array(propsLength);
while (++index < propsLength) {
var key = props[index];
if (isArr) {
result[index] = isIndex(key, length) ? collection[key] : undefined;
} else {
result[index] = isNil ? undefined : collection[key];
}
}
return result;
}
function baseCopy(source, props, object) {
object || (object = {});
var index = -1, length = props.length;
while (++index < length) {
var key = props[index];
object[key] = source[key];
}
return object;
}
function baseCallback(func, thisArg, argCount) {
var type = typeof func;
if (type == 'function') {
return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
}
if (func == null) {
return identity;
}
if (type == 'object') {
return baseMatches(func);
}
return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
}
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
var result;
if (customizer) {
result = object ? customizer(value, key, object) : customizer(value);
}
if (result !== undefined) {
return result;
}
if (!isObject(value)) {
return value;
}
var isArr = isArray(value);
if (isArr) {
result = initCloneArray(value);
if (!isDeep) {
return arrayCopy(value, result);
}
} else {
var tag = objToString.call(value), isFunc = tag == funcTag;
if (tag == objectTag || tag == argsTag || isFunc && !object) {
result = initCloneObject(isFunc ? {} : value);
if (!isDeep) {
return baseAssign(result, value);
}
} else {
return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : object ? value : {};
}
}
stackA || (stackA = []);
stackB || (stackB = []);
var length = stackA.length;
while (length--) {
if (stackA[length] == value) {
return stackB[length];
}
}
stackA.push(value);
stackB.push(result);
(isArr ? arrayEach : baseForOwn)(value, function (subValue, key) {
result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
});
return result;
}
var baseCreate = function () {
function object() {
}
return function (prototype) {
if (isObject(prototype)) {
object.prototype = prototype;
var result = new object();
object.prototype = undefined;
}
return result || {};
};
}();
function baseDelay(func, wait, args) {
if (typeof func != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
return setTimeout(function () {
func.apply(undefined, args);
}, wait);
}
function baseDifference(array, values) {
var length = array ? array.length : 0, result = [];
if (!length) {
return result;
}
var index = -1, indexOf = getIndexOf(), isCommon = indexOf === baseIndexOf, cache = isCommon && values.length >= LARGE_ARRAY_SIZE ? createCache(values) : null, valuesLength = values.length;
if (cache) {
indexOf = cacheIndexOf;
isCommon = false;
values = cache;
}
outer:
while (++index < length) {
var value = array[index];
if (isCommon && value === value) {
var valuesIndex = valuesLength;
while (valuesIndex--) {
if (values[valuesIndex] === value) {
continue outer;
}
}
result.push(value);
} else if (indexOf(values, value, 0) < 0) {
result.push(value);
}
}
return result;
}
var baseEach = createBaseEach(baseForOwn);
var baseEachRight = createBaseEach(baseForOwnRight, true);
function baseEvery(collection, predicate) {
var result = true;
baseEach(collection, function (value, index, collection) {
result = !!predicate(value, index, collection);
return result;
});
return result;
}
function baseExtremum(collection, iteratee, comparator, exValue) {
var computed = exValue, result = computed;
baseEach(collection, function (value, index, collection) {
var current = +iteratee(value, index, collection);
if (comparator(current, computed) || current === exValue && current === result) {
computed = current;
result = value;
}
});
return result;
}
function baseFill(array, value, start, end) {
var length = array.length;
start = start == null ? 0 : +start || 0;
if (start < 0) {
start = -start > length ? 0 : length + start;
}
end = end === undefined || end > length ? length : +end || 0;
if (end < 0) {
end += length;
}
length = start > end ? 0 : end >>> 0;
start >>>= 0;
while (start < length) {
array[start++] = value;
}
return array;
}
function baseFilter(collection, predicate) {
var result = [];
baseEach(collection, function (value, index, collection) {
if (predicate(value, index, collection)) {
result.push(value);
}
});
return result;
}
function baseFind(collection, predicate, eachFunc, retKey) {
var result;
eachFunc(collection, function (value, key, collection) {
if (predicate(value, key, collection)) {
result = retKey ? key : value;
return false;
}
});
return result;
}
function baseFlatten(array, isDeep, isStrict, result) {
result || (result = []);
var index = -1, length = array.length;
while (++index < length) {
var value = array[index];
if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
if (isDeep) {
baseFlatten(value, isDeep, isStrict, result);
} else {
arrayPush(result, value);
}
} else if (!isStrict) {
result[result.length] = value;
}
}
return result;
}
var baseFor = createBaseFor();
var baseForRight = createBaseFor(true);
function baseForIn(object, iteratee) {
return baseFor(object, iteratee, keysIn);
}
function baseForOwn(object, iteratee) {
return baseFor(object, iteratee, keys);
}
function baseForOwnRight(object, iteratee) {
return baseForRight(object, iteratee, keys);
}
function baseFunctions(object, props) {
var index = -1, length = props.length, resIndex = -1, result = [];
while (++index < length) {
var key = props[index];
if (isFunction(object[key])) {
result[++resIndex] = key;
}
}
return result;
}
function baseGet(object, path, pathKey) {
if (object == null) {
return;
}
if (pathKey !== undefined && pathKey in toObject(object)) {
path = [pathKey];
}
var index = 0, length = path.length;
while (object != null && index < length) {
object = object[path[index++]];
}
return index && index == length ? object : undefined;
}
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
if (value === other) {
return true;
}
if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
return value !== value && other !== other;
}
return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
if (!objIsArr) {
objTag = objToString.call(object);
if (objTag == argsTag) {
objTag = objectTag;
} else if (objTag != objectTag) {
objIsArr = isTypedArray(object);
}
}
if (!othIsArr) {
othTag = objToString.call(other);
if (othTag == argsTag) {
othTag = objectTag;
} else if (othTag != objectTag) {
othIsArr = isTypedArray(other);
}
}
var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
if (isSameTag && !(objIsArr || objIsObj)) {
return equalByTag(object, other, objTag);
}
if (!isLoose) {
var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'), othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
if (objIsWrapped || othIsWrapped) {
return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
}
}
if (!isSameTag) {
return false;
}
stackA || (stackA = []);
stackB || (stackB = []);
var length = stackA.length;
while (length--) {
if (stackA[length] == object) {
return stackB[length] == other;
}
}
stackA.push(object);
stackB.push(other);
var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
stackA.pop();
stackB.pop();
return result;
}
function baseIsMatch(object, matchData, customizer) {
var index = matchData.length, length = index, noCustomizer = !customizer;
if (object == null) {
return !length;
}
object = toObject(object);
while (index--) {
var data = matchData[index];
if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
return false;
}
}
while (++index < length) {
data = matchData[index];
var key = data[0], objValue = object[key], srcValue = data[1];
if (noCustomizer && data[2]) {
if (objValue === undefined && !(key in object)) {
return false;
}
} else {
var result = customizer ? customizer(objValue, srcValue, key) : undefined;
if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
return false;
}
}
}
return true;
}
function baseMap(collection, iteratee) {
var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
baseEach(collection, function (value, key, collection) {
result[++index] = iteratee(value, key, collection);
});
return result;
}
function baseMatches(source) {
var matchData = getMatchData(source);
if (matchData.length == 1 && matchData[0][2]) {
var key = matchData[0][0], value = matchData[0][1];
return function (object) {
if (object == null) {
return false;
}
return object[key] === value && (value !== undefined || key in toObject(object));
};
}
return function (object) {
return baseIsMatch(object, matchData);
};
}
function baseMatchesProperty(path, srcValue) {
var isArr = isArray(path), isCommon = isKey(path) && isStrictComparable(srcValue), pathKey = path + '';
path = toPath(path);
return function (object) {
if (object == null) {
return false;
}
var key = pathKey;
object = toObject(object);
if ((isArr || !isCommon) && !(key in object)) {
object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
if (object == null) {
return false;
}
key = last(path);
object = toObject(object);
}
return object[key] === srcValue ? srcValue !== undefined || key in object : baseIsEqual(srcValue, object[key], undefined, true);
};
}
function baseMerge(object, source, customizer, stackA, stackB) {
if (!isObject(object)) {
return object;
}
var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)), props = isSrcArr ? undefined : keys(source);
arrayEach(props || source, function (srcValue, key) {
if (props) {
key = srcValue;
srcValue = source[key];
}
if (isObjectLike(srcValue)) {
stackA || (stackA = []);
stackB || (stackB = []);
baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
} else {
var value = object[key], result = customizer ? customizer(value, srcValue, key, object, source) : undefined, isCommon = result === undefined;
if (isCommon) {
result = srcValue;
}
if ((result !== undefined || isSrcArr && !(key in object)) && (isCommon || (result === result ? result !== value : value === value))) {
object[key] = result;
}
}
});
return object;
}
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
var length = stackA.length, srcValue = source[key];
while (length--) {
if (stackA[length] == srcValue) {
object[key] = stackB[length];
return;
}
}
var value = object[key], result = customizer ? customizer(value, srcValue, key, object, source) : undefined, isCommon = result === undefined;
if (isCommon) {
result = srcValue;
if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
result = isArray(value) ? value : isArrayLike(value) ? arrayCopy(value) : [];
} else if (isPlainObject(srcValue) || isArguments(srcValue)) {
result = isArguments(value) ? toPlainObject(value) : isPlainObject(value) ? value : {};
} else {
isCommon = false;
}
}
stackA.push(srcValue);
stackB.push(result);
if (isCommon) {
object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
} else if (result === result ? result !== value : value === value) {
object[key] = result;
}
}
function baseProperty(key) {
return function (object) {
return object == null ? undefined : object[key];
};
}
function basePropertyDeep(path) {
var pathKey = path + '';
path = toPath(path);
return function (object) {
return baseGet(object, path, pathKey);
};
}
function basePullAt(array, indexes) {
var length = array ? indexes.length : 0;
while (length--) {
var index = indexes[length];
if (index != previous && isIndex(index)) {
var previous = index;
splice.call(array, index, 1);
}
}
return array;
}
function baseRandom(min, max) {
return min + nativeFloor(nativeRandom() * (max - min + 1));
}
function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
eachFunc(collection, function (value, index, collection) {
accumulator = initFromCollection ? (initFromCollection = false, value) : iteratee(accumulator, value, index, collection);
});
return accumulator;
}
var baseSetData = !metaMap ? identity : function (func, data) {
metaMap.set(func, data);
return func;
};
function baseSlice(array, start, end) {
var index = -1, length = array.length;
start = start == null ? 0 : +start || 0;
if (start < 0) {
start = -start > length ? 0 : length + start;
}
end = end === undefined || end > length ? length : +end || 0;
if (end < 0) {
end += length;
}
length = start > end ? 0 : end - start >>> 0;
start >>>= 0;
var result = Array(length);
while (++index < length) {
result[index] = array[index + start];
}
return result;
}
function baseSome(collection, predicate) {
var result;
baseEach(collection, function (value, index, collection) {
result = predicate(value, index, collection);
return !result;
});
return !!result;
}
function baseSortBy(array, comparer) {
var length = array.length;
array.sort(comparer);
while (length--) {
array[length] = array[length].value;
}
return array;
}
function baseSortByOrder(collection, iteratees, orders) {
var callback = getCallback(), index = -1;
iteratees = arrayMap(iteratees, function (iteratee) {
return callback(iteratee);
});
var result = baseMap(collection, function (value) {
var criteria = arrayMap(iteratees, function (iteratee) {
return iteratee(value);
});
return {
'criteria': criteria,
'index': ++index,
'value': value
};
});
return baseSortBy(result, function (object, other) {
return compareMultiple(object, other, orders);
});
}
function baseSum(collection, iteratee) {
var result = 0;
baseEach(collection, function (value, index, collection) {
result += +iteratee(value, index, collection) || 0;
});
return result;
}
function baseUniq(array, iteratee) {
var index = -1, indexOf = getIndexOf(), length = array.length, isCommon = indexOf === baseIndexOf, isLarge = isCommon && length >= LARGE_ARRAY_SIZE, seen = isLarge ? createCache() : null, result = [];
if (seen) {
indexOf = cacheIndexOf;
isCommon = false;
} else {
isLarge = false;
seen = iteratee ? [] : result;
}
outer:
while (++index < length) {
var value = array[index], computed = iteratee ? iteratee(value, index, array) : value;
if (isCommon && value === value) {
var seenIndex = seen.length;
while (seenIndex--) {
if (seen[seenIndex] === computed) {
continue outer;
}
}
if (iteratee) {
seen.push(computed);
}
result.push(value);
} else if (indexOf(seen, computed, 0) < 0) {
if (iteratee || isLarge) {
seen.push(computed);
}
result.push(value);
}
}
return result;
}
function baseValues(object, props) {
var index = -1, length = props.length, result = Array(length);
while (++index < length) {
result[index] = object[props[index]];
}
return result;
}
function baseWhile(array, predicate, isDrop, fromRight) {
var length = array.length, index = fromRight ? length : -1;
while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
}
return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
}
function baseWrapperValue(value, actions) {
var result = value;
if (result instanceof LazyWrapper) {
result = result.value();
}
var index = -1, length = actions.length;
while (++index < length) {
var action = actions[index];
result = action.func.apply(action.thisArg, arrayPush([result], action.args));
}
return result;
}
function binaryIndex(array, value, retHighest) {
var low = 0, high = array ? array.length : low;
if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
while (low < high) {
var mid = low + high >>> 1, computed = array[mid];
if ((retHighest ? computed <= value : computed < value) && computed !== null) {
low = mid + 1;
} else {
high = mid;
}
}
return high;
}
return binaryIndexBy(array, value, identity, retHighest);
}
function binaryIndexBy(array, value, iteratee, retHighest) {
value = iteratee(value);
var low = 0, high = array ? array.length : 0, valIsNaN = value !== value, valIsNull = value === null, valIsUndef = value === undefined;
while (low < high) {
var mid = nativeFloor((low + high) / 2), computed = iteratee(array[mid]), isDef = computed !== undefined, isReflexive = computed === computed;
if (valIsNaN) {
var setLow = isReflexive || retHighest;
} else if (valIsNull) {
setLow = isReflexive && isDef && (retHighest || computed != null);
} else if (valIsUndef) {
setLow = isReflexive && (retHighest || isDef);
} else if (computed == null) {
setLow = false;
} else {
setLow = retHighest ? computed <= value : computed < value;
}
if (setLow) {
low = mid + 1;
} else {
high = mid;
}
}
return nativeMin(high, MAX_ARRAY_INDEX);
}
function bindCallback(func, thisArg, argCount) {
if (typeof func != 'function') {
return identity;
}
if (thisArg === undefined) {
return func;
}
switch (argCount) {
case 1:
return function (value) {
return func.call(thisArg, value);
};
case 3:
return function (value, index, collection) {
return func.call(thisArg, value, index, collection);
};
case 4:
return function (accumulator, value, index, collection) {
return func.call(thisArg, accumulator, value, index, collection);
};
case 5:
return function (value, other, key, object, source) {
return func.call(thisArg, value, other, key, object, source);
};
}
return function () {
return func.apply(thisArg, arguments);
};
}
function bufferClone(buffer) {
var result = new ArrayBuffer(buffer.byteLength), view = new Uint8Array(result);
view.set(new Uint8Array(buffer));
return result;
}
function composeArgs(args, partials, holders) {
var holdersLength = holders.length, argsIndex = -1, argsLength = nativeMax(args.length - holdersLength, 0), leftIndex = -1, leftLength = partials.length, result = Array(leftLength + argsLength);
while (++leftIndex < leftLength) {
result[leftIndex] = partials[leftIndex];
}
while (++argsIndex < holdersLength) {
result[holders[argsIndex]] = args[argsIndex];
}
while (argsLength--) {
result[leftIndex++] = args[argsIndex++];
}
return result;
}
function composeArgsRight(args, partials, holders) {
var holdersIndex = -1, holdersLength = holders.length, argsIndex = -1, argsLength = nativeMax(args.length - holdersLength, 0), rightIndex = -1, rightLength = partials.length, result = Array(argsLength + rightLength);
while (++argsIndex < argsLength) {
result[argsIndex] = args[argsIndex];
}
var offset = argsIndex;
while (++rightIndex < rightLength) {
result[offset + rightIndex] = partials[rightIndex];
}
while (++holdersIndex < holdersLength) {
result[offset + holders[holdersIndex]] = args[argsIndex++];
}
return result;
}
function createAggregator(setter, initializer) {
return function (collection, iteratee, thisArg) {
var result = initializer ? initializer() : {};
iteratee = getCallback(iteratee, thisArg, 3);
if (isArray(collection)) {
var index = -1, length = collection.length;
while (++index < length) {
var value = collection[index];
setter(result, value, iteratee(value, index, collection), collection);
}
} else {
baseEach(collection, function (value, key, collection) {
setter(result, value, iteratee(value, key, collection), collection);
});
}
return result;
};
}
function createAssigner(assigner) {
return restParam(function (object, sources) {
var index = -1, length = object == null ? 0 : sources.length, customizer = length > 2 ? sources[length - 2] : undefined, guard = length > 2 ? sources[2] : undefined, thisArg = length > 1 ? sources[length - 1] : undefined;
if (typeof customizer == 'function') {
customizer = bindCallback(customizer, thisArg, 5);
length -= 2;
} else {
customizer = typeof thisArg == 'function' ? thisArg : undefined;
length -= customizer ? 1 : 0;
}
if (guard && isIterateeCall(sources[0], sources[1], guard)) {
customizer = length < 3 ? undefined : customizer;
length = 1;
}
while (++index < length) {
var source = sources[index];
if (source) {
assigner(object, source, customizer);
}
}
return object;
});
}
function createBaseEach(eachFunc, fromRight) {
return function (collection, iteratee) {
var length = collection ? getLength(collection) : 0;
if (!isLength(length)) {
return eachFunc(collection, iteratee);
}
var index = fromRight ? length : -1, iterable = toObject(collection);
while (fromRight ? index-- : ++index < length) {
if (iteratee(iterable[index], index, iterable) === false) {
break;
}
}
return collection;
};
}
function createBaseFor(fromRight) {
return function (object, iteratee, keysFunc) {
var iterable = toObject(object), props = keysFunc(object), length = props.length, index = fromRight ? length : -1;
while (fromRight ? index-- : ++index < length) {
var key = props[index];
if (iteratee(iterable[key], key, iterable) === false) {
break;
}
}
return object;
};
}
function createBindWrapper(func, thisArg) {
var Ctor = createCtorWrapper(func);
function wrapper() {
var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
return fn.apply(thisArg, arguments);
}
return wrapper;
}
function createCache(values) {
return nativeCreate && Set ? new SetCache(values) : null;
}
function createCompounder(callback) {
return function (string) {
var index = -1, array = words(deburr(string)), length = array.length, result = '';
while (++index < length) {
result = callback(result, array[index], index);
}
return result;
};
}
function createCtorWrapper(Ctor) {
return function () {
var args = arguments;
switch (args.length) {
case 0:
return new Ctor();
case 1:
return new Ctor(args[0]);
case 2:
return new Ctor(args[0], args[1]);
case 3:
return new Ctor(args[0], args[1], args[2]);
case 4:
return new Ctor(args[0], args[1], args[2], args[3]);
case 5:
return new Ctor(args[0], args[1], args[2], args[3], args[4]);
case 6:
return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
case 7:
return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
}
var thisBinding = baseCreate(Ctor.prototype), result = Ctor.apply(thisBinding, args);
return isObject(result) ? result : thisBinding;
};
}
function createCurry(flag) {
function curryFunc(func, arity, guard) {
if (guard && isIterateeCall(func, arity, guard)) {
arity = undefined;
}
var result = createWrapper(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
result.placeholder = curryFunc.placeholder;
return result;
}
return curryFunc;
}
function createDefaults(assigner, customizer) {
return restParam(function (args) {
var object = args[0];
if (object == null) {
return object;
}
args.push(customizer);
return assigner.apply(undefined, args);
});
}
function createExtremum(comparator, exValue) {
return function (collection, iteratee, thisArg) {
if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
iteratee = undefined;
}
iteratee = getCallback(iteratee, thisArg, 3);
if (iteratee.length == 1) {
collection = isArray(collection) ? collection : toIterable(collection);
var result = arrayExtremum(collection, iteratee, comparator, exValue);
if (!(collection.length && result === exValue)) {
return result;
}
}
return baseExtremum(collection, iteratee, comparator, exValue);
};
}
function createFind(eachFunc, fromRight) {
return function (collection, predicate, thisArg) {
predicate = getCallback(predicate, thisArg, 3);
if (isArray(collection)) {
var index = baseFindIndex(collection, predicate, fromRight);
return index > -1 ? collection[index] : undefined;
}
return baseFind(collection, predicate, eachFunc);
};
}
function createFindIndex(fromRight) {
return function (array, predicate, thisArg) {
if (!(array && array.length)) {
return -1;
}
predicate = getCallback(predicate, thisArg, 3);
return baseFindIndex(array, predicate, fromRight);
};
}
function createFindKey(objectFunc) {
return function (object, predicate, thisArg) {
predicate = getCallback(predicate, thisArg, 3);
return baseFind(object, predicate, objectFunc, true);
};
}
function createFlow(fromRight) {
return function () {
var wrapper, length = arguments.length, index = fromRight ? length : -1, leftIndex = 0, funcs = Array(length);
while (fromRight ? index-- : ++index < length) {
var func = funcs[leftIndex++] = arguments[index];
if (typeof func != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
wrapper = new LodashWrapper([], true);
}
}
index = wrapper ? -1 : length;
while (++index < length) {
func = funcs[index];
var funcName = getFuncName(func), data = funcName == 'wrapper' ? getData(func) : undefined;
if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
} else {
wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
}
}
return function () {
var args = arguments, value = args[0];
if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
return wrapper.plant(value).value();
}
var index = 0, result = length ? funcs[index].apply(this, args) : value;
while (++index < length) {
result = funcs[index].call(this, result);
}
return result;
};
};
}
function createForEach(arrayFunc, eachFunc) {
return function (collection, iteratee, thisArg) {
return typeof iteratee == 'function' && thisArg === undefined && isArray(collection) ? arrayFunc(collection, iteratee) : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
};
}
function createForIn(objectFunc) {
return function (object, iteratee, thisArg) {
if (typeof iteratee != 'function' || thisArg !== undefined) {
iteratee = bindCallback(iteratee, thisArg, 3);
}
return objectFunc(object, iteratee, keysIn);
};
}
function createForOwn(objectFunc) {
return function (object, iteratee, thisArg) {
if (typeof iteratee != 'function' || thisArg !== undefined) {
iteratee = bindCallback(iteratee, thisArg, 3);
}
return objectFunc(object, iteratee);
};
}
function createObjectMapper(isMapKeys) {
return function (object, iteratee, thisArg) {
var result = {};
iteratee = getCallback(iteratee, thisArg, 3);
baseForOwn(object, function (value, key, object) {
var mapped = iteratee(value, key, object);
key = isMapKeys ? mapped : key;
value = isMapKeys ? value : mapped;
result[key] = value;
});
return result;
};
}
function createPadDir(fromRight) {
return function (string, length, chars) {
string = baseToString(string);
return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
};
}
function createPartial(flag) {
var partialFunc = restParam(function (func, partials) {
var holders = replaceHolders(partials, partialFunc.placeholder);
return createWrapper(func, flag, undefined, partials, holders);
});
return partialFunc;
}
function createReduce(arrayFunc, eachFunc) {
return function (collection, iteratee, accumulator, thisArg) {
var initFromArray = arguments.length < 3;
return typeof iteratee == 'function' && thisArg === undefined && isArray(collection) ? arrayFunc(collection, iteratee, accumulator, initFromArray) : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
};
}
function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
var isAry = bitmask & ARY_FLAG, isBind = bitmask & BIND_FLAG, isBindKey = bitmask & BIND_KEY_FLAG, isCurry = bitmask & CURRY_FLAG, isCurryBound = bitmask & CURRY_BOUND_FLAG, isCurryRight = bitmask & CURRY_RIGHT_FLAG, Ctor = isBindKey ? undefined : createCtorWrapper(func);
function wrapper() {
var length = arguments.length, index = length, args = Array(length);
while (index--) {
args[index] = arguments[index];
}
if (partials) {
args = composeArgs(args, partials, holders);
}
if (partialsRight) {
args = composeArgsRight(args, partialsRight, holdersRight);
}
if (isCurry || isCurryRight) {
var placeholder = wrapper.placeholder, argsHolders = replaceHolders(args, placeholder);
length -= argsHolders.length;
if (length < arity) {
var newArgPos = argPos ? arrayCopy(argPos) : undefined, newArity = nativeMax(arity - length, 0), newsHolders = isCurry ? argsHolders : undefined, newHoldersRight = isCurry ? undefined : argsHolders, newPartials = isCurry ? args : undefined, newPartialsRight = isCurry ? undefined : args;
bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG;
bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
if (!isCurryBound) {
bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
}
var newData = [
func,
bitmask,
thisArg,
newPartials,
newsHolders,
newPartialsRight,
newHoldersRight,
newArgPos,
ary,
newArity
], result = createHybridWrapper.apply(undefined, newData);
if (isLaziable(func)) {
setData(result, newData);
}
result.placeholder = placeholder;
return result;
}
}
var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
if (argPos) {
args = reorder(args, argPos);
}
if (isAry && ary < args.length) {
args.length = ary;
}
if (this && this !== root && this instanceof wrapper) {
fn = Ctor || createCtorWrapper(func);
}
return fn.apply(thisBinding, args);
}
return wrapper;
}
function createPadding(string, length, chars) {
var strLength = string.length;
length = +length;
if (strLength >= length || !nativeIsFinite(length)) {
return '';
}
var padLength = length - strLength;
chars = chars == null ? ' ' : chars + '';
return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
}
function createPartialWrapper(func, bitmask, thisArg, partials) {
var isBind = bitmask & BIND_FLAG, Ctor = createCtorWrapper(func);
function wrapper() {
var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength);
while (++leftIndex < leftLength) {
args[leftIndex] = partials[leftIndex];
}
while (argsLength--) {
args[leftIndex++] = arguments[++argsIndex];
}
var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
return fn.apply(isBind ? thisArg : this, args);
}
return wrapper;
}
function createRound(methodName) {
var func = Math[methodName];
return function (number, precision) {
precision = precision === undefined ? 0 : +precision || 0;
if (precision) {
precision = pow(10, precision);
return func(number * precision) / precision;
}
return func(number);
};
}
function createSortedIndex(retHighest) {
return function (array, value, iteratee, thisArg) {
var callback = getCallback(iteratee);
return iteratee == null && callback === baseCallback ? binaryIndex(array, value, retHighest) : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
};
}
function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
var isBindKey = bitmask & BIND_KEY_FLAG;
if (!isBindKey && typeof func != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
var length = partials ? partials.length : 0;
if (!length) {
bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
partials = holders = undefined;
}
length -= holders ? holders.length : 0;
if (bitmask & PARTIAL_RIGHT_FLAG) {
var partialsRight = partials, holdersRight = holders;
partials = holders = undefined;
}
var data = isBindKey ? undefined : getData(func), newData = [
func,
bitmask,
thisArg,
partials,
holders,
partialsRight,
holdersRight,
argPos,
ary,
arity
];
if (data) {
mergeData(newData, data);
bitmask = newData[1];
arity = newData[9];
}
newData[9] = arity == null ? isBindKey ? 0 : func.length : nativeMax(arity - length, 0) || 0;
if (bitmask == BIND_FLAG) {
var result = createBindWrapper(newData[0], newData[2]);
} else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
result = createPartialWrapper.apply(undefined, newData);
} else {
result = createHybridWrapper.apply(undefined, newData);
}
var setter = data ? baseSetData : setData;
return setter(result, newData);
}
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
var index = -1, arrLength = array.length, othLength = other.length;
if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
return false;
}
while (++index < arrLength) {
var arrValue = array[index], othValue = other[index], result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
if (result !== undefined) {
if (result) {
continue;
}
return false;
}
if (isLoose) {
if (!arraySome(other, function (othValue) {
return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
})) {
return false;
}
} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
return false;
}
}
return true;
}
function equalByTag(object, other, tag) {
switch (tag) {
case boolTag:
case dateTag:
return +object == +other;
case errorTag:
return object.name == other.name && object.message == other.message;
case numberTag:
return object != +object ? other != +other : object == +other;
case regexpTag:
case stringTag:
return object == other + '';
}
return false;
}
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
var objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
if (objLength != othLength && !isLoose) {
return false;
}
var index = objLength;
while (index--) {
var key = objProps[index];
if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
return false;
}
}
var skipCtor = isLoose;
while (++index < objLength) {
key = objProps[index];
var objValue = object[key], othValue = other[key], result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;
if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
return false;
}
skipCtor || (skipCtor = key == 'constructor');
}
if (!skipCtor) {
var objCtor = object.constructor, othCtor = other.constructor;
if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
return false;
}
}
return true;
}
function getCallback(func, thisArg, argCount) {
var result = lodash.callback || callback;
result = result === callback ? baseCallback : result;
return argCount ? result(func, thisArg, argCount) : result;
}
var getData = !metaMap ? noop : function (func) {
return metaMap.get(func);
};
function getFuncName(func) {
var result = func.name + '', array = realNames[result], length = array ? array.length : 0;
while (length--) {
var data = array[length], otherFunc = data.func;
if (otherFunc == null || otherFunc == func) {
return data.name;
}
}
return result;
}
function getIndexOf(collection, target, fromIndex) {
var result = lodash.indexOf || indexOf;
result = result === indexOf ? baseIndexOf : result;
return collection ? result(collection, target, fromIndex) : result;
}
var getLength = baseProperty('length');
function getMatchData(object) {
var result = pairs(object), length = result.length;
while (length--) {
result[length][2] = isStrictComparable(result[length][1]);
}
return result;
}
function getNative(object, key) {
var value = object == null ? undefined : object[key];
return isNative(value) ? value : undefined;
}
function getView(start, end, transforms) {
var index = -1, length = transforms.length;
while (++index < length) {
var data = transforms[index], size = data.size;
switch (data.type) {
case 'drop':
start += size;
break;
case 'dropRight':
end -= size;
break;
case 'take':
end = nativeMin(end, start + size);
break;
case 'takeRight':
start = nativeMax(start, end - size);
break;
}
}
return {
'start': start,
'end': end
};
}
function initCloneArray(array) {
var length = array.length, result = new array.constructor(length);
if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
result.index = array.index;
result.input = array.input;
}
return result;
}
function initCloneObject(object) {
var Ctor = object.constructor;
if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
Ctor = Object;
}
return new Ctor();
}
function initCloneByTag(object, tag, isDeep) {
var Ctor = object.constructor;
switch (tag) {
case arrayBufferTag:
return bufferClone(object);
case boolTag:
case dateTag:
return new Ctor(+object);
case float32Tag:
case float64Tag:
case int8Tag:
case int16Tag:
case int32Tag:
case uint8Tag:
case uint8ClampedTag:
case uint16Tag:
case uint32Tag:
var buffer = object.buffer;
return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
case numberTag:
case stringTag:
return new Ctor(object);
case regexpTag:
var result = new Ctor(object.source, reFlags.exec(object));
result.lastIndex = object.lastIndex;
}
return result;
}
function invokePath(object, path, args) {
if (object != null && !isKey(path, object)) {
path = toPath(path);
object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
path = last(path);
}
var func = object == null ? object : object[path];
return func == null ? undefined : func.apply(object, args);
}
function isArrayLike(value) {
return value != null && isLength(getLength(value));
}
function isIndex(value, length) {
value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
length = length == null ? MAX_SAFE_INTEGER : length;
return value > -1 && value % 1 == 0 && value < length;
}
function isIterateeCall(value, index, object) {
if (!isObject(object)) {
return false;
}
var type = typeof index;
if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
var other = object[index];
return value === value ? value === other : other !== other;
}
return false;
}
function isKey(value, object) {
var type = typeof value;
if (type == 'string' && reIsPlainProp.test(value) || type == 'number') {
return true;
}
if (isArray(value)) {
return false;
}
var result = !reIsDeepProp.test(value);
return result || object != null && value in toObject(object);
}
function isLaziable(func) {
var funcName = getFuncName(func), other = lodash[funcName];
if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
return false;
}
if (func === other) {
return true;
}
var data = getData(other);
return !!data && func === data[0];
}
function isLength(value) {
return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isStrictComparable(value) {
return value === value && !isObject(value);
}
function mergeData(data, source) {
var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < ARY_FLAG;
var isCombo = srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG || srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8] || srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG;
if (!(isCommon || isCombo)) {
return data;
}
if (srcBitmask & BIND_FLAG) {
data[2] = source[2];
newBitmask |= bitmask & BIND_FLAG ? 0 : CURRY_BOUND_FLAG;
}
var value = source[3];
if (value) {
var partials = data[3];
data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
}
value = source[5];
if (value) {
partials = data[5];
data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
}
value = source[7];
if (value) {
data[7] = arrayCopy(value);
}
if (srcBitmask & ARY_FLAG) {
data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
}
if (data[9] == null) {
data[9] = source[9];
}
data[0] = source[0];
data[1] = newBitmask;
return data;
}
function mergeDefaults(objectValue, sourceValue) {
return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
}
function pickByArray(object, props) {
object = toObject(object);
var index = -1, length = props.length, result = {};
while (++index < length) {
var key = props[index];
if (key in object) {
result[key] = object[key];
}
}
return result;
}
function pickByCallback(object, predicate) {
var result = {};
baseForIn(object, function (value, key, object) {
if (predicate(value, key, object)) {
result[key] = value;
}
});
return result;
}
function reorder(array, indexes) {
var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = arrayCopy(array);
while (length--) {
var index = indexes[length];
array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
}
return array;
}
var setData = function () {
var count = 0, lastCalled = 0;
return function (key, value) {
var stamp = now(), remaining = HOT_SPAN - (stamp - lastCalled);
lastCalled = stamp;
if (remaining > 0) {
if (++count >= HOT_COUNT) {
return key;
}
} else {
count = 0;
}
return baseSetData(key, value);
};
}();
function shimKeys(object) {
var props = keysIn(object), propsLength = props.length, length = propsLength && object.length;
var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));
var index = -1, result = [];
while (++index < propsLength) {
var key = props[index];
if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
result.push(key);
}
}
return result;
}
function toIterable(value) {
if (value == null) {
return [];
}
if (!isArrayLike(value)) {
return values(value);
}
return isObject(value) ? value : Object(value);
}
function toObject(value) {
return isObject(value) ? value : Object(value);
}
function toPath(value) {
if (isArray(value)) {
return value;
}
var result = [];
baseToString(value).replace(rePropName, function (match, number, quote, string) {
result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
});
return result;
}
function wrapperClone(wrapper) {
return wrapper instanceof LazyWrapper ? wrapper.clone() : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
}
function chunk(array, size, guard) {
if (guard ? isIterateeCall(array, size, guard) : size == null) {
size = 1;
} else {
size = nativeMax(nativeFloor(size) || 1, 1);
}
var index = 0, length = array ? array.length : 0, resIndex = -1, result = Array(nativeCeil(length / size));
while (index < length) {
result[++resIndex] = baseSlice(array, index, index += size);
}
return result;
}
function compact(array) {
var index = -1, length = array ? array.length : 0, resIndex = -1, result = [];
while (++index < length) {
var value = array[index];
if (value) {
result[++resIndex] = value;
}
}
return result;
}
var difference = restParam(function (array, values) {
return isObjectLike(array) && isArrayLike(array) ? baseDifference(array, baseFlatten(values, false, true)) : [];
});
function drop(array, n, guard) {
var length = array ? array.length : 0;
if (!length) {
return [];
}
if (guard ? isIterateeCall(array, n, guard) : n == null) {
n = 1;
}
return baseSlice(array, n < 0 ? 0 : n);
}
function dropRight(array, n, guard) {
var length = array ? array.length : 0;
if (!length) {
return [];
}
if (guard ? isIterateeCall(array, n, guard) : n == null) {
n = 1;
}
n = length - (+n || 0);
return baseSlice(array, 0, n < 0 ? 0 : n);
}
function dropRightWhile(array, predicate, thisArg) {
return array && array.length ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true) : [];
}
function dropWhile(array, predicate, thisArg) {
return array && array.length ? baseWhile(array, getCallback(predicate, thisArg, 3), true) : [];
}
function fill(array, value, start, end) {
var length = array ? array.length : 0;
if (!length) {
return [];
}
if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
start = 0;
end = length;
}
return baseFill(array, value, start, end);
}
var findIndex = createFindIndex();
var findLastIndex = createFindIndex(true);
function first(array) {
return array ? array[0] : undefined;
}
function flatten(array, isDeep, guard) {
var length = array ? array.length : 0;
if (guard && isIterateeCall(array, isDeep, guard)) {
isDeep = false;
}
return length ? baseFlatten(array, isDeep) : [];
}
function flattenDeep(array) {
var length = array ? array.length : 0;
return length ? baseFlatten(array, true) : [];
}
function indexOf(array, value, fromIndex) {
var length = array ? array.length : 0;
if (!length) {
return -1;
}
if (typeof fromIndex == 'number') {
fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
} else if (fromIndex) {
var index = binaryIndex(array, value);
if (index < length && (value === value ? value === array[index] : array[index] !== array[index])) {
return index;
}
return -1;
}
return baseIndexOf(array, value, fromIndex || 0);
}
function initial(array) {
return dropRight(array, 1);
}
var intersection = restParam(function (arrays) {
var othLength = arrays.length, othIndex = othLength, caches = Array(length), indexOf = getIndexOf(), isCommon = indexOf === baseIndexOf, result = [];
while (othIndex--) {
var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
caches[othIndex] = isCommon && value.length >= 120 ? createCache(othIndex && value) : null;
}
var array = arrays[0], index = -1, length = array ? array.length : 0, seen = caches[0];
outer:
while (++index < length) {
value = array[index];
if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
var othIndex = othLength;
while (--othIndex) {
var cache = caches[othIndex];
if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
continue outer;
}
}
if (seen) {
seen.push(value);
}
result.push(value);
}
}
return result;
});
function last(array) {
var length = array ? array.length : 0;
return length ? array[length - 1] : undefined;
}
function lastIndexOf(array, value, fromIndex) {
var length = array ? array.length : 0;
if (!length) {
return -1;
}
var index = length;
if (typeof fromIndex == 'number') {
index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
} else if (fromIndex) {
index = binaryIndex(array, value, true) - 1;
var other = array[index];
if (value === value ? value === other : other !== other) {
return index;
}
return -1;
}
if (value !== value) {
return indexOfNaN(array, index, true);
}
while (index--) {
if (array[index] === value) {
return index;
}
}
return -1;
}
function pull() {
var args = arguments, array = args[0];
if (!(array && array.length)) {
return array;
}
var index = 0, indexOf = getIndexOf(), length = args.length;
while (++index < length) {
var fromIndex = 0, value = args[index];
while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
splice.call(array, fromIndex, 1);
}
}
return array;
}
var pullAt = restParam(function (array, indexes) {
indexes = baseFlatten(indexes);
var result = baseAt(array, indexes);
basePullAt(array, indexes.sort(baseCompareAscending));
return result;
});
function remove(array, predicate, thisArg) {
var result = [];
if (!(array && array.length)) {
return result;
}
var index = -1, indexes = [], length = array.length;
predicate = getCallback(predicate, thisArg, 3);
while (++index < length) {
var value = array[index];
if (predicate(value, index, array)) {
result.push(value);
indexes.push(index);
}
}
basePullAt(array, indexes);
return result;
}
function rest(array) {
return drop(array, 1);
}
function slice(array, start, end) {
var length = array ? array.length : 0;
if (!length) {
return [];
}
if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
start = 0;
end = length;
}
return baseSlice(array, start, end);
}
var sortedIndex = createSortedIndex();
var sortedLastIndex = createSortedIndex(true);
function take(array, n, guard) {
var length = array ? array.length : 0;
if (!length) {
return [];
}
if (guard ? isIterateeCall(array, n, guard) : n == null) {
n = 1;
}
return baseSlice(array, 0, n < 0 ? 0 : n);
}
function takeRight(array, n, guard) {
var length = array ? array.length : 0;
if (!length) {
return [];
}
if (guard ? isIterateeCall(array, n, guard) : n == null) {
n = 1;
}
n = length - (+n || 0);
return baseSlice(array, n < 0 ? 0 : n);
}
function takeRightWhile(array, predicate, thisArg) {
return array && array.length ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true) : [];
}
function takeWhile(array, predicate, thisArg) {
return array && array.length ? baseWhile(array, getCallback(predicate, thisArg, 3)) : [];
}
var union = restParam(function (arrays) {
return baseUniq(baseFlatten(arrays, false, true));
});
function uniq(array, isSorted, iteratee, thisArg) {
var length = array ? array.length : 0;
if (!length) {
return [];
}
if (isSorted != null && typeof isSorted != 'boolean') {
thisArg = iteratee;
iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
isSorted = false;
}
var callback = getCallback();
if (!(iteratee == null && callback === baseCallback)) {
iteratee = callback(iteratee, thisArg, 3);
}
return isSorted && getIndexOf() === baseIndexOf ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
}
function unzip(array) {
if (!(array && array.length)) {
return [];
}
var index = -1, length = 0;
array = arrayFilter(array, function (group) {
if (isArrayLike(group)) {
length = nativeMax(group.length, length);
return true;
}
});
var result = Array(length);
while (++index < length) {
result[index] = arrayMap(array, baseProperty(index));
}
return result;
}
function unzipWith(array, iteratee, thisArg) {
var length = array ? array.length : 0;
if (!length) {
return [];
}
var result = unzip(array);
if (iteratee == null) {
return result;
}
iteratee = bindCallback(iteratee, thisArg, 4);
return arrayMap(result, function (group) {
return arrayReduce(group, iteratee, undefined, true);
});
}
var without = restParam(function (array, values) {
return isArrayLike(array) ? baseDifference(array, values) : [];
});
function xor() {
var index = -1, length = arguments.length;
while (++index < length) {
var array = arguments[index];
if (isArrayLike(array)) {
var result = result ? arrayPush(baseDifference(result, array), baseDifference(array, result)) : array;
}
}
return result ? baseUniq(result) : [];
}
var zip = restParam(unzip);
function zipObject(props, values) {
var index = -1, length = props ? props.length : 0, result = {};
if (length && !values && !isArray(props[0])) {
values = [];
}
while (++index < length) {
var key = props[index];
if (values) {
result[key] = values[index];
} else if (key) {
result[key[0]] = key[1];
}
}
return result;
}
var zipWith = restParam(function (arrays) {
var length = arrays.length, iteratee = length > 2 ? arrays[length - 2] : undefined, thisArg = length > 1 ? arrays[length - 1] : undefined;
if (length > 2 && typeof iteratee == 'function') {
length -= 2;
} else {
iteratee = length > 1 && typeof thisArg == 'function' ? (--length, thisArg) : undefined;
thisArg = undefined;
}
arrays.length = length;
return unzipWith(arrays, iteratee, thisArg);
});
function chain(value) {
var result = lodash(value);
result.__chain__ = true;
return result;
}
function tap(value, interceptor, thisArg) {
interceptor.call(thisArg, value);
return value;
}
function thru(value, interceptor, thisArg) {
return interceptor.call(thisArg, value);
}
function wrapperChain() {
return chain(this);
}
function wrapperCommit() {
return new LodashWrapper(this.value(), this.__chain__);
}
var wrapperConcat = restParam(function (values) {
values = baseFlatten(values);
return this.thru(function (array) {
return arrayConcat(isArray(array) ? array : [toObject(array)], values);
});
});
function wrapperPlant(value) {
var result, parent = this;
while (parent instanceof baseLodash) {
var clone = wrapperClone(parent);
if (result) {
previous.__wrapped__ = clone;
} else {
result = clone;
}
var previous = clone;
parent = parent.__wrapped__;
}
previous.__wrapped__ = value;
return result;
}
function wrapperReverse() {
var value = this.__wrapped__;
var interceptor = function (value) {
return value.reverse();
};
if (value instanceof LazyWrapper) {
var wrapped = value;
if (this.__actions__.length) {
wrapped = new LazyWrapper(this);
}
wrapped = wrapped.reverse();
wrapped.__actions__.push({
'func': thru,
'args': [interceptor],
'thisArg': undefined
});
return new LodashWrapper(wrapped, this.__chain__);
}
return this.thru(interceptor);
}
function wrapperToString() {
return this.value() + '';
}
function wrapperValue() {
return baseWrapperValue(this.__wrapped__, this.__actions__);
}
var at = restParam(function (collection, props) {
return baseAt(collection, baseFlatten(props));
});
var countBy = createAggregator(function (result, value, key) {
hasOwnProperty.call(result, key) ? ++result[key] : result[key] = 1;
});
function every(collection, predicate, thisArg) {
var func = isArray(collection) ? arrayEvery : baseEvery;
if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
predicate = undefined;
}
if (typeof predicate != 'function' || thisArg !== undefined) {
predicate = getCallback(predicate, thisArg, 3);
}
return func(collection, predicate);
}
function filter(collection, predicate, thisArg) {
var func = isArray(collection) ? arrayFilter : baseFilter;
predicate = getCallback(predicate, thisArg, 3);
return func(collection, predicate);
}
var find = createFind(baseEach);
var findLast = createFind(baseEachRight, true);
function findWhere(collection, source) {
return find(collection, baseMatches(source));
}
var forEach = createForEach(arrayEach, baseEach);
var forEachRight = createForEach(arrayEachRight, baseEachRight);
var groupBy = createAggregator(function (result, value, key) {
if (hasOwnProperty.call(result, key)) {
result[key].push(value);
} else {
result[key] = [value];
}
});
function includes(collection, target, fromIndex, guard) {
var length = collection ? getLength(collection) : 0;
if (!isLength(length)) {
collection = values(collection);
length = collection.length;
}
if (typeof fromIndex != 'number' || guard && isIterateeCall(target, fromIndex, guard)) {
fromIndex = 0;
} else {
fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex || 0;
}
return typeof collection == 'string' || !isArray(collection) && isString(collection) ? fromIndex <= length && collection.indexOf(target, fromIndex) > -1 : !!length && getIndexOf(collection, target, fromIndex) > -1;
}
var indexBy = createAggregator(function (result, value, key) {
result[key] = value;
});
var invoke = restParam(function (collection, path, args) {
var index = -1, isFunc = typeof path == 'function', isProp = isKey(path), result = isArrayLike(collection) ? Array(collection.length) : [];
baseEach(collection, function (value) {
var func = isFunc ? path : isProp && value != null ? value[path] : undefined;
result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
});
return result;
});
function map(collection, iteratee, thisArg) {
var func = isArray(collection) ? arrayMap : baseMap;
iteratee = getCallback(iteratee, thisArg, 3);
return func(collection, iteratee);
}
var partition = createAggregator(function (result, value, key) {
result[key ? 0 : 1].push(value);
}, function () {
return [
[],
[]
];
});
function pluck(collection, path) {
return map(collection, property(path));
}
var reduce = createReduce(arrayReduce, baseEach);
var reduceRight = createReduce(arrayReduceRight, baseEachRight);
function reject(collection, predicate, thisArg) {
var func = isArray(collection) ? arrayFilter : baseFilter;
predicate = getCallback(predicate, thisArg, 3);
return func(collection, function (value, index, collection) {
return !predicate(value, index, collection);
});
}
function sample(collection, n, guard) {
if (guard ? isIterateeCall(collection, n, guard) : n == null) {
collection = toIterable(collection);
var length = collection.length;
return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
}
var index = -1, result = toArray(collection), length = result.length, lastIndex = length - 1;
n = nativeMin(n < 0 ? 0 : +n || 0, length);
while (++index < n) {
var rand = baseRandom(index, lastIndex), value = result[rand];
result[rand] = result[index];
result[index] = value;
}
result.length = n;
return result;
}
function shuffle(collection) {
return sample(collection, POSITIVE_INFINITY);
}
function size(collection) {
var length = collection ? getLength(collection) : 0;
return isLength(length) ? length : keys(collection).length;
}
function some(collection, predicate, thisArg) {
var func = isArray(collection) ? arraySome : baseSome;
if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
predicate = undefined;
}
if (typeof predicate != 'function' || thisArg !== undefined) {
predicate = getCallback(predicate, thisArg, 3);
}
return func(collection, predicate);
}
function sortBy(collection, iteratee, thisArg) {
if (collection == null) {
return [];
}
if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
iteratee = undefined;
}
var index = -1;
iteratee = getCallback(iteratee, thisArg, 3);
var result = baseMap(collection, function (value, key, collection) {
return {
'criteria': iteratee(value, key, collection),
'index': ++index,
'value': value
};
});
return baseSortBy(result, compareAscending);
}
var sortByAll = restParam(function (collection, iteratees) {
if (collection == null) {
return [];
}
var guard = iteratees[2];
if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
iteratees.length = 1;
}
return baseSortByOrder(collection, baseFlatten(iteratees), []);
});
function sortByOrder(collection, iteratees, orders, guard) {
if (collection == null) {
return [];
}
if (guard && isIterateeCall(iteratees, orders, guard)) {
orders = undefined;
}
if (!isArray(iteratees)) {
iteratees = iteratees == null ? [] : [iteratees];
}
if (!isArray(orders)) {
orders = orders == null ? [] : [orders];
}
return baseSortByOrder(collection, iteratees, orders);
}
function where(collection, source) {
return filter(collection, baseMatches(source));
}
var now = nativeNow || function () {
return new Date().getTime();
};
function after(n, func) {
if (typeof func != 'function') {
if (typeof n == 'function') {
var temp = n;
n = func;
func = temp;
} else {
throw new TypeError(FUNC_ERROR_TEXT);
}
}
n = nativeIsFinite(n = +n) ? n : 0;
return function () {
if (--n < 1) {
return func.apply(this, arguments);
}
};
}
function ary(func, n, guard) {
if (guard && isIterateeCall(func, n, guard)) {
n = undefined;
}
n = func && n == null ? func.length : nativeMax(+n || 0, 0);
return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
}
function before(n, func) {
var result;
if (typeof func != 'function') {
if (typeof n == 'function') {
var temp = n;
n = func;
func = temp;
} else {
throw new TypeError(FUNC_ERROR_TEXT);
}
}
return function () {
if (--n > 0) {
result = func.apply(this, arguments);
}
if (n <= 1) {
func = undefined;
}
return result;
};
}
var bind = restParam(function (func, thisArg, partials) {
var bitmask = BIND_FLAG;
if (partials.length) {
var holders = replaceHolders(partials, bind.placeholder);
bitmask |= PARTIAL_FLAG;
}
return createWrapper(func, bitmask, thisArg, partials, holders);
});
var bindAll = restParam(function (object, methodNames) {
methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);
var index = -1, length = methodNames.length;
while (++index < length) {
var key = methodNames[index];
object[key] = createWrapper(object[key], BIND_FLAG, object);
}
return object;
});
var bindKey = restParam(function (object, key, partials) {
var bitmask = BIND_FLAG | BIND_KEY_FLAG;
if (partials.length) {
var holders = replaceHolders(partials, bindKey.placeholder);
bitmask |= PARTIAL_FLAG;
}
return createWrapper(key, bitmask, object, partials, holders);
});
var curry = createCurry(CURRY_FLAG);
var curryRight = createCurry(CURRY_RIGHT_FLAG);
function debounce(func, wait, options) {
var args, maxTimeoutId, result, stamp, thisArg, timeoutId, trailingCall, lastCalled = 0, maxWait = false, trailing = true;
if (typeof func != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
wait = wait < 0 ? 0 : +wait || 0;
if (options === true) {
var leading = true;
trailing = false;
} else if (isObject(options)) {
leading = !!options.leading;
maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
trailing = 'trailing' in options ? !!options.trailing : trailing;
}
function cancel() {
if (timeoutId) {
clearTimeout(timeoutId);
}
if (maxTimeoutId) {
clearTimeout(maxTimeoutId);
}
lastCalled = 0;
maxTimeoutId = timeoutId = trailingCall = undefined;
}
function complete(isCalled, id) {
if (id) {
clearTimeout(id);
}
maxTimeoutId = timeoutId = trailingCall = undefined;
if (isCalled) {
lastCalled = now();
result = func.apply(thisArg, args);
if (!timeoutId && !maxTimeoutId) {
args = thisArg = undefined;
}
}
}
function delayed() {
var remaining = wait - (now() - stamp);
if (remaining <= 0 || remaining > wait) {
complete(trailingCall, maxTimeoutId);
} else {
timeoutId = setTimeout(delayed, remaining);
}
}
function maxDelayed() {
complete(trailing, timeoutId);
}
function debounced() {
args = arguments;
stamp = now();
thisArg = this;
trailingCall = trailing && (timeoutId || !leading);
if (maxWait === false) {
var leadingCall = leading && !timeoutId;
} else {
if (!maxTimeoutId && !leading) {
lastCalled = stamp;
}
var remaining = maxWait - (stamp - lastCalled), isCalled = remaining <= 0 || remaining > maxWait;
if (isCalled) {
if (maxTimeoutId) {
maxTimeoutId = clearTimeout(maxTimeoutId);
}
lastCalled = stamp;
result = func.apply(thisArg, args);
} else if (!maxTimeoutId) {
maxTimeoutId = setTimeout(maxDelayed, remaining);
}
}
if (isCalled && timeoutId) {
timeoutId = clearTimeout(timeoutId);
} else if (!timeoutId && wait !== maxWait) {
timeoutId = setTimeout(delayed, wait);
}
if (leadingCall) {
isCalled = true;
result = func.apply(thisArg, args);
}
if (isCalled && !timeoutId && !maxTimeoutId) {
args = thisArg = undefined;
}
return result;
}
debounced.cancel = cancel;
return debounced;
}
var defer = restParam(function (func, args) {
return baseDelay(func, 1, args);
});
var delay = restParam(function (func, wait, args) {
return baseDelay(func, wait, args);
});
var flow = createFlow();
var flowRight = createFlow(true);
function memoize(func, resolver) {
if (typeof func != 'function' || resolver && typeof resolver != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
var memoized = function () {
var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
if (cache.has(key)) {
return cache.get(key);
}
var result = func.apply(this, args);
memoized.cache = cache.set(key, result);
return result;
};
memoized.cache = new memoize.Cache();
return memoized;
}
var modArgs = restParam(function (func, transforms) {
transforms = baseFlatten(transforms);
if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
throw new TypeError(FUNC_ERROR_TEXT);
}
var length = transforms.length;
return restParam(function (args) {
var index = nativeMin(args.length, length);
while (index--) {
args[index] = transforms[index](args[index]);
}
return func.apply(this, args);
});
});
function negate(predicate) {
if (typeof predicate != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
return function () {
return !predicate.apply(this, arguments);
};
}
function once(func) {
return before(2, func);
}
var partial = createPartial(PARTIAL_FLAG);
var partialRight = createPartial(PARTIAL_RIGHT_FLAG);
var rearg = restParam(function (func, indexes) {
return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
});
function restParam(func, start) {
if (typeof func != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
return function () {
var args = arguments, index = -1, length = nativeMax(args.length - start, 0), rest = Array(length);
while (++index < length) {
rest[index] = args[start + index];
}
switch (start) {
case 0:
return func.call(this, rest);
case 1:
return func.call(this, args[0], rest);
case 2:
return func.call(this, args[0], args[1], rest);
}
var otherArgs = Array(start + 1);
index = -1;
while (++index < start) {
otherArgs[index] = args[index];
}
otherArgs[start] = rest;
return func.apply(this, otherArgs);
};
}
function spread(func) {
if (typeof func != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
return function (array) {
return func.apply(this, array);
};
}
function throttle(func, wait, options) {
var leading = true, trailing = true;
if (typeof func != 'function') {
throw new TypeError(FUNC_ERROR_TEXT);
}
if (options === false) {
leading = false;
} else if (isObject(options)) {
leading = 'leading' in options ? !!options.leading : leading;
trailing = 'trailing' in options ? !!options.trailing : trailing;
}
return debounce(func, wait, {
'leading': leading,
'maxWait': +wait,
'trailing': trailing
});
}
function wrap(value, wrapper) {
wrapper = wrapper == null ? identity : wrapper;
return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
}
function clone(value, isDeep, customizer, thisArg) {
if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
isDeep = false;
} else if (typeof isDeep == 'function') {
thisArg = customizer;
customizer = isDeep;
isDeep = false;
}
return typeof customizer == 'function' ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3)) : baseClone(value, isDeep);
}
function cloneDeep(value, customizer, thisArg) {
return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 3)) : baseClone(value, true);
}
function gt(value, other) {
return value > other;
}
function gte(value, other) {
return value >= other;
}
function isArguments(value) {
return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}
var isArray = nativeIsArray || function (value) {
return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};
function isBoolean(value) {
return value === true || value === false || isObjectLike(value) && objToString.call(value) == boolTag;
}
function isDate(value) {
return isObjectLike(value) && objToString.call(value) == dateTag;
}
function isElement(value) {
return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
}
function isEmpty(value) {
if (value == null) {
return true;
}
if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) || isObjectLike(value) && isFunction(value.splice))) {
return !value.length;
}
return !keys(value).length;
}
function isEqual(value, other, customizer, thisArg) {
customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
var result = customizer ? customizer(value, other) : undefined;
return result === undefined ? baseIsEqual(value, other, customizer) : !!result;
}
function isError(value) {
return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
}
function isFinite(value) {
return typeof value == 'number' && nativeIsFinite(value);
}
function isFunction(value) {
return isObject(value) && objToString.call(value) == funcTag;
}
function isObject(value) {
var type = typeof value;
return !!value && (type == 'object' || type == 'function');
}
function isMatch(object, source, customizer, thisArg) {
customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
return baseIsMatch(object, getMatchData(source), customizer);
}
function isNaN(value) {
return isNumber(value) && value != +value;
}
function isNative(value) {
if (value == null) {
return false;
}
if (isFunction(value)) {
return reIsNative.test(fnToString.call(value));
}
return isObjectLike(value) && reIsHostCtor.test(value);
}
function isNull(value) {
return value === null;
}
function isNumber(value) {
return typeof value == 'number' || isObjectLike(value) && objToString.call(value) == numberTag;
}
function isPlainObject(value) {
var Ctor;
if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) || !hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) {
return false;
}
var result;
baseForIn(value, function (subValue, key) {
result = key;
});
return result === undefined || hasOwnProperty.call(value, result);
}
function isRegExp(value) {
return isObject(value) && objToString.call(value) == regexpTag;
}
function isString(value) {
return typeof value == 'string' || isObjectLike(value) && objToString.call(value) == stringTag;
}
function isTypedArray(value) {
return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}
function isUndefined(value) {
return value === undefined;
}
function lt(value, other) {
return value < other;
}
function lte(value, other) {
return value <= other;
}
function toArray(value) {
var length = value ? getLength(value) : 0;
if (!isLength(length)) {
return values(value);
}
if (!length) {
return [];
}
return arrayCopy(value);
}
function toPlainObject(value) {
return baseCopy(value, keysIn(value));
}
var merge = createAssigner(baseMerge);
var assign = createAssigner(function (object, source, customizer) {
return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
});
function create(prototype, properties, guard) {
var result = baseCreate(prototype);
if (guard && isIterateeCall(prototype, properties, guard)) {
properties = undefined;
}
return properties ? baseAssign(result, properties) : result;
}
var defaults = createDefaults(assign, assignDefaults);
var defaultsDeep = createDefaults(merge, mergeDefaults);
var findKey = createFindKey(baseForOwn);
var findLastKey = createFindKey(baseForOwnRight);
var forIn = createForIn(baseFor);
var forInRight = createForIn(baseForRight);
var forOwn = createForOwn(baseForOwn);
var forOwnRight = createForOwn(baseForOwnRight);
function functions(object) {
return baseFunctions(object, keysIn(object));
}
function get(object, path, defaultValue) {
var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
return result === undefined ? defaultValue : result;
}
function has(object, path) {
if (object == null) {
return false;
}
var result = hasOwnProperty.call(object, path);
if (!result && !isKey(path)) {
path = toPath(path);
object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
if (object == null) {
return false;
}
path = last(path);
result = hasOwnProperty.call(object, path);
}
return result || isLength(object.length) && isIndex(path, object.length) && (isArray(object) || isArguments(object));
}
function invert(object, multiValue, guard) {
if (guard && isIterateeCall(object, multiValue, guard)) {
multiValue = undefined;
}
var index = -1, props = keys(object), length = props.length, result = {};
while (++index < length) {
var key = props[index], value = object[key];
if (multiValue) {
if (hasOwnProperty.call(result, value)) {
result[value].push(key);
} else {
result[value] = [key];
}
} else {
result[value] = key;
}
}
return result;
}
var keys = !nativeKeys ? shimKeys : function (object) {
var Ctor = object == null ? undefined : object.constructor;
if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
return shimKeys(object);
}
return isObject(object) ? nativeKeys(object) : [];
};
function keysIn(object) {
if (object == null) {
return [];
}
if (!isObject(object)) {
object = Object(object);
}
var length = object.length;
length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;
var Ctor = object.constructor, index = -1, isProto = typeof Ctor == 'function' && Ctor.prototype === object, result = Array(length), skipIndexes = length > 0;
while (++index < length) {
result[index] = index + '';
}
for (var key in object) {
if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
result.push(key);
}
}
return result;
}
var mapKeys = createObjectMapper(true);
var mapValues = createObjectMapper();
var omit = restParam(function (object, props) {
if (object == null) {
return {};
}
if (typeof props[0] != 'function') {
var props = arrayMap(baseFlatten(props), String);
return pickByArray(object, baseDifference(keysIn(object), props));
}
var predicate = bindCallback(props[0], props[1], 3);
return pickByCallback(object, function (value, key, object) {
return !predicate(value, key, object);
});
});
function pairs(object) {
object = toObject(object);
var index = -1, props = keys(object), length = props.length, result = Array(length);
while (++index < length) {
var key = props[index];
result[index] = [
key,
object[key]
];
}
return result;
}
var pick = restParam(function (object, props) {
if (object == null) {
return {};
}
return typeof props[0] == 'function' ? pickByCallback(object, bindCallback(props[0], props[1], 3)) : pickByArray(object, baseFlatten(props));
});
function result(object, path, defaultValue) {
var result = object == null ? undefined : object[path];
if (result === undefined) {
if (object != null && !isKey(path, object)) {
path = toPath(path);
object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
result = object == null ? undefined : object[last(path)];
}
result = result === undefined ? defaultValue : result;
}
return isFunction(result) ? result.call(object) : result;
}
function set(object, path, value) {
if (object == null) {
return object;
}
var pathKey = path + '';
path = object[pathKey] != null || isKey(path, object) ? [pathKey] : toPath(path);
var index = -1, length = path.length, lastIndex = length - 1, nested = object;
while (nested != null && ++index < length) {
var key = path[index];
if (isObject(nested)) {
if (index == lastIndex) {
nested[key] = value;
} else if (nested[key] == null) {
nested[key] = isIndex(path[index + 1]) ? [] : {};
}
}
nested = nested[key];
}
return object;
}
function transform(object, iteratee, accumulator, thisArg) {
var isArr = isArray(object) || isTypedArray(object);
iteratee = getCallback(iteratee, thisArg, 4);
if (accumulator == null) {
if (isArr || isObject(object)) {
var Ctor = object.constructor;
if (isArr) {
accumulator = isArray(object) ? new Ctor() : [];
} else {
accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
}
} else {
accumulator = {};
}
}
(isArr ? arrayEach : baseForOwn)(object, function (value, index, object) {
return iteratee(accumulator, value, index, object);
});
return accumulator;
}
function values(object) {
return baseValues(object, keys(object));
}
function valuesIn(object) {
return baseValues(object, keysIn(object));
}
function inRange(value, start, end) {
start = +start || 0;
if (end === undefined) {
end = start;
start = 0;
} else {
end = +end || 0;
}
return value >= nativeMin(start, end) && value < nativeMax(start, end);
}
function random(min, max, floating) {
if (floating && isIterateeCall(min, max, floating)) {
max = floating = undefined;
}
var noMin = min == null, noMax = max == null;
if (floating == null) {
if (noMax && typeof min == 'boolean') {
floating = min;
min = 1;
} else if (typeof max == 'boolean') {
floating = max;
noMax = true;
}
}
if (noMin && noMax) {
max = 1;
noMax = false;
}
min = +min || 0;
if (noMax) {
max = min;
min = 0;
} else {
max = +max || 0;
}
if (floating || min % 1 || max % 1) {
var rand = nativeRandom();
return nativeMin(min + rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1))), max);
}
return baseRandom(min, max);
}
var camelCase = createCompounder(function (result, word, index) {
word = word.toLowerCase();
return result + (index ? word.charAt(0).toUpperCase() + word.slice(1) : word);
});
function capitalize(string) {
string = baseToString(string);
return string && string.charAt(0).toUpperCase() + string.slice(1);
}
function deburr(string) {
string = baseToString(string);
return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
}
function endsWith(string, target, position) {
string = baseToString(string);
target = target + '';
var length = string.length;
position = position === undefined ? length : nativeMin(position < 0 ? 0 : +position || 0, length);
position -= target.length;
return position >= 0 && string.indexOf(target, position) == position;
}
function escape(string) {
string = baseToString(string);
return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
}
function escapeRegExp(string) {
string = baseToString(string);
return string && reHasRegExpChars.test(string) ? string.replace(reRegExpChars, escapeRegExpChar) : string || '(?:)';
}
var kebabCase = createCompounder(function (result, word, index) {
return result + (index ? '-' : '') + word.toLowerCase();
});
function pad(string, length, chars) {
string = baseToString(string);
length = +length;
var strLength = string.length;
if (strLength >= length || !nativeIsFinite(length)) {
return string;
}
var mid = (length - strLength) / 2, leftLength = nativeFloor(mid), rightLength = nativeCeil(mid);
chars = createPadding('', rightLength, chars);
return chars.slice(0, leftLength) + string + chars;
}
var padLeft = createPadDir();
var padRight = createPadDir(true);
function parseInt(string, radix, guard) {
if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
radix = 0;
} else if (radix) {
radix = +radix;
}
string = trim(string);
return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
}
function repeat(string, n) {
var result = '';
string = baseToString(string);
n = +n;
if (n < 1 || !string || !nativeIsFinite(n)) {
return result;
}
do {
if (n % 2) {
result += string;
}
n = nativeFloor(n / 2);
string += string;
} while (n);
return result;
}
var snakeCase = createCompounder(function (result, word, index) {
return result + (index ? '_' : '') + word.toLowerCase();
});
var startCase = createCompounder(function (result, word, index) {
return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
});
function startsWith(string, target, position) {
string = baseToString(string);
position = position == null ? 0 : nativeMin(position < 0 ? 0 : +position || 0, string.length);
return string.lastIndexOf(target, position) == position;
}
function template(string, options, otherOptions) {
var settings = lodash.templateSettings;
if (otherOptions && isIterateeCall(string, options, otherOptions)) {
options = otherOptions = undefined;
}
string = baseToString(string);
options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = '__p += \'';
var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
var sourceURL = '//# sourceURL=' + ('sourceURL' in options ? options.sourceURL : 'lodash.templateSources[' + ++templateCounter + ']') + '\n';
string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
interpolateValue || (interpolateValue = esTemplateValue);
source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
if (escapeValue) {
isEscaping = true;
source += '\' +\n__e(' + escapeValue + ') +\n\'';
}
if (evaluateValue) {
isEvaluating = true;
source += '\';\n' + evaluateValue + ';\n__p += \'';
}
if (interpolateValue) {
source += '\' +\n((__t = (' + interpolateValue + ')) == null ? \'\' : __t) +\n\'';
}
index = offset + match.length;
return match;
});
source += '\';\n';
var variable = options.variable;
if (!variable) {
source = 'with (obj) {\n' + source + '\n}\n';
}
source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + 'var __t, __p = \'\'' + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + 'function print() { __p += __j.call(arguments, \'\') }\n' : ';\n') + source + 'return __p\n}';
var result = attempt(function () {
return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
});
result.source = source;
if (isError(result)) {
throw result;
}
return result;
}
function trim(string, chars, guard) {
var value = string;
string = baseToString(string);
if (!string) {
return string;
}
if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
}
chars = chars + '';
return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
}
function trimLeft(string, chars, guard) {
var value = string;
string = baseToString(string);
if (!string) {
return string;
}
if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
return string.slice(trimmedLeftIndex(string));
}
return string.slice(charsLeftIndex(string, chars + ''));
}
function trimRight(string, chars, guard) {
var value = string;
string = baseToString(string);
if (!string) {
return string;
}
if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
return string.slice(0, trimmedRightIndex(string) + 1);
}
return string.slice(0, charsRightIndex(string, chars + '') + 1);
}
function trunc(string, options, guard) {
if (guard && isIterateeCall(string, options, guard)) {
options = undefined;
}
var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
if (options != null) {
if (isObject(options)) {
var separator = 'separator' in options ? options.separator : separator;
length = 'length' in options ? +options.length || 0 : length;
omission = 'omission' in options ? baseToString(options.omission) : omission;
} else {
length = +options || 0;
}
}
string = baseToString(string);
if (length >= string.length) {
return string;
}
var end = length - omission.length;
if (end < 1) {
return omission;
}
var result = string.slice(0, end);
if (separator == null) {
return result + omission;
}
if (isRegExp(separator)) {
if (string.slice(end).search(separator)) {
var match, newEnd, substring = string.slice(0, end);
if (!separator.global) {
separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
}
separator.lastIndex = 0;
while (match = separator.exec(substring)) {
newEnd = match.index;
}
result = result.slice(0, newEnd == null ? end : newEnd);
}
} else if (string.indexOf(separator, end) != end) {
var index = result.lastIndexOf(separator);
if (index > -1) {
result = result.slice(0, index);
}
}
return result + omission;
}
function unescape(string) {
string = baseToString(string);
return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
}
function words(string, pattern, guard) {
if (guard && isIterateeCall(string, pattern, guard)) {
pattern = undefined;
}
string = baseToString(string);
return string.match(pattern || reWords) || [];
}
var attempt = restParam(function (func, args) {
try {
return func.apply(undefined, args);
} catch (e) {
return isError(e) ? e : new Error(e);
}
});
function callback(func, thisArg, guard) {
if (guard && isIterateeCall(func, thisArg, guard)) {
thisArg = undefined;
}
return isObjectLike(func) ? matches(func) : baseCallback(func, thisArg);
}
function constant(value) {
return function () {
return value;
};
}
function identity(value) {
return value;
}
function matches(source) {
return baseMatches(baseClone(source, true));
}
function matchesProperty(path, srcValue) {
return baseMatchesProperty(path, baseClone(srcValue, true));
}
var method = restParam(function (path, args) {
return function (object) {
return invokePath(object, path, args);
};
});
var methodOf = restParam(function (object, args) {
return function (path) {
return invokePath(object, path, args);
};
});
function mixin(object, source, options) {
if (options == null) {
var isObj = isObject(source), props = isObj ? keys(source) : undefined, methodNames = props && props.length ? baseFunctions(source, props) : undefined;
if (!(methodNames ? methodNames.length : isObj)) {
methodNames = false;
options = source;
source = object;
object = this;
}
}
if (!methodNames) {
methodNames = baseFunctions(source, keys(source));
}
var chain = true, index = -1, isFunc = isFunction(object), length = methodNames.length;
if (options === false) {
chain = false;
} else if (isObject(options) && 'chain' in options) {
chain = options.chain;
}
while (++index < length) {
var methodName = methodNames[index], func = source[methodName];
object[methodName] = func;
if (isFunc) {
object.prototype[methodName] = function (func) {
return function () {
var chainAll = this.__chain__;
if (chain || chainAll) {
var result = object(this.__wrapped__), actions = result.__actions__ = arrayCopy(this.__actions__);
actions.push({
'func': func,
'args': arguments,
'thisArg': object
});
result.__chain__ = chainAll;
return result;
}
return func.apply(object, arrayPush([this.value()], arguments));
};
}(func);
}
}
return object;
}
function noConflict() {
root._ = oldDash;
return this;
}
function noop() {
}
function property(path) {
return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}
function propertyOf(object) {
return function (path) {
return baseGet(object, toPath(path), path + '');
};
}
function range(start, end, step) {
if (step && isIterateeCall(start, end, step)) {
end = step = undefined;
}
start = +start || 0;
step = step == null ? 1 : +step || 0;
if (end == null) {
end = start;
start = 0;
} else {
end = +end || 0;
}
var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
while (++index < length) {
result[index] = start;
start += step;
}
return result;
}
function times(n, iteratee, thisArg) {
n = nativeFloor(n);
if (n < 1 || !nativeIsFinite(n)) {
return [];
}
var index = -1, result = Array(nativeMin(n, MAX_ARRAY_LENGTH));
iteratee = bindCallback(iteratee, thisArg, 1);
while (++index < n) {
if (index < MAX_ARRAY_LENGTH) {
result[index] = iteratee(index);
} else {
iteratee(index);
}
}
return result;
}
function uniqueId(prefix) {
var id = ++idCounter;
return baseToString(prefix) + id;
}
function add(augend, addend) {
return (+augend || 0) + (+addend || 0);
}
var ceil = createRound('ceil');
var floor = createRound('floor');
var max = createExtremum(gt, NEGATIVE_INFINITY);
var min = createExtremum(lt, POSITIVE_INFINITY);
var round = createRound('round');
function sum(collection, iteratee, thisArg) {
if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
iteratee = undefined;
}
iteratee = getCallback(iteratee, thisArg, 3);
return iteratee.length == 1 ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee) : baseSum(collection, iteratee);
}
lodash.prototype = baseLodash.prototype;
LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
MapCache.prototype['delete'] = mapDelete;
MapCache.prototype.get = mapGet;
MapCache.prototype.has = mapHas;
MapCache.prototype.set = mapSet;
SetCache.prototype.push = cachePush;
memoize.Cache = MapCache;
lodash.after = after;
lodash.ary = ary;
lodash.assign = assign;
lodash.at = at;
lodash.before = before;
lodash.bind = bind;
lodash.bindAll = bindAll;
lodash.bindKey = bindKey;
lodash.callback = callback;
lodash.chain = chain;
lodash.chunk = chunk;
lodash.compact = compact;
lodash.constant = constant;
lodash.countBy = countBy;
lodash.create = create;
lodash.curry = curry;
lodash.curryRight = curryRight;
lodash.debounce = debounce;
lodash.defaults = defaults;
lodash.defaultsDeep = defaultsDeep;
lodash.defer = defer;
lodash.delay = delay;
lodash.difference = difference;
lodash.drop = drop;
lodash.dropRight = dropRight;
lodash.dropRightWhile = dropRightWhile;
lodash.dropWhile = dropWhile;
lodash.fill = fill;
lodash.filter = filter;
lodash.flatten = flatten;
lodash.flattenDeep = flattenDeep;
lodash.flow = flow;
lodash.flowRight = flowRight;
lodash.forEach = forEach;
lodash.forEachRight = forEachRight;
lodash.forIn = forIn;
lodash.forInRight = forInRight;
lodash.forOwn = forOwn;
lodash.forOwnRight = forOwnRight;
lodash.functions = functions;
lodash.groupBy = groupBy;
lodash.indexBy = indexBy;
lodash.initial = initial;
lodash.intersection = intersection;
lodash.invert = invert;
lodash.invoke = invoke;
lodash.keys = keys;
lodash.keysIn = keysIn;
lodash.map = map;
lodash.mapKeys = mapKeys;
lodash.mapValues = mapValues;
lodash.matches = matches;
lodash.matchesProperty = matchesProperty;
lodash.memoize = memoize;
lodash.merge = merge;
lodash.method = method;
lodash.methodOf = methodOf;
lodash.mixin = mixin;
lodash.modArgs = modArgs;
lodash.negate = negate;
lodash.omit = omit;
lodash.once = once;
lodash.pairs = pairs;
lodash.partial = partial;
lodash.partialRight = partialRight;
lodash.partition = partition;
lodash.pick = pick;
lodash.pluck = pluck;
lodash.property = property;
lodash.propertyOf = propertyOf;
lodash.pull = pull;
lodash.pullAt = pullAt;
lodash.range = range;
lodash.rearg = rearg;
lodash.reject = reject;
lodash.remove = remove;
lodash.rest = rest;
lodash.restParam = restParam;
lodash.set = set;
lodash.shuffle = shuffle;
lodash.slice = slice;
lodash.sortBy = sortBy;
lodash.sortByAll = sortByAll;
lodash.sortByOrder = sortByOrder;
lodash.spread = spread;
lodash.take = take;
lodash.takeRight = takeRight;
lodash.takeRightWhile = takeRightWhile;
lodash.takeWhile = takeWhile;
lodash.tap = tap;
lodash.throttle = throttle;
lodash.thru = thru;
lodash.times = times;
lodash.toArray = toArray;
lodash.toPlainObject = toPlainObject;
lodash.transform = transform;
lodash.union = union;
lodash.uniq = uniq;
lodash.unzip = unzip;
lodash.unzipWith = unzipWith;
lodash.values = values;
lodash.valuesIn = valuesIn;
lodash.where = where;
lodash.without = without;
lodash.wrap = wrap;
lodash.xor = xor;
lodash.zip = zip;
lodash.zipObject = zipObject;
lodash.zipWith = zipWith;
lodash.backflow = flowRight;
lodash.collect = map;
lodash.compose = flowRight;
lodash.each = forEach;
lodash.eachRight = forEachRight;
lodash.extend = assign;
lodash.iteratee = callback;
lodash.methods = functions;
lodash.object = zipObject;
lodash.select = filter;
lodash.tail = rest;
lodash.unique = uniq;
mixin(lodash, lodash);
lodash.add = add;
lodash.attempt = attempt;
lodash.camelCase = camelCase;
lodash.capitalize = capitalize;
lodash.ceil = ceil;
lodash.clone = clone;
lodash.cloneDeep = cloneDeep;
lodash.deburr = deburr;
lodash.endsWith = endsWith;
lodash.escape = escape;
lodash.escapeRegExp = escapeRegExp;
lodash.every = every;
lodash.find = find;
lodash.findIndex = findIndex;
lodash.findKey = findKey;
lodash.findLast = findLast;
lodash.findLastIndex = findLastIndex;
lodash.findLastKey = findLastKey;
lodash.findWhere = findWhere;
lodash.first = first;
lodash.floor = floor;
lodash.get = get;
lodash.gt = gt;
lodash.gte = gte;
lodash.has = has;
lodash.identity = identity;
lodash.includes = includes;
lodash.indexOf = indexOf;
lodash.inRange = inRange;
lodash.isArguments = isArguments;
lodash.isArray = isArray;
lodash.isBoolean = isBoolean;
lodash.isDate = isDate;
lodash.isElement = isElement;
lodash.isEmpty = isEmpty;
lodash.isEqual = isEqual;
lodash.isError = isError;
lodash.isFinite = isFinite;
lodash.isFunction = isFunction;
lodash.isMatch = isMatch;
lodash.isNaN = isNaN;
lodash.isNative = isNative;
lodash.isNull = isNull;
lodash.isNumber = isNumber;
lodash.isObject = isObject;
lodash.isPlainObject = isPlainObject;
lodash.isRegExp = isRegExp;
lodash.isString = isString;
lodash.isTypedArray = isTypedArray;
lodash.isUndefined = isUndefined;
lodash.kebabCase = kebabCase;
lodash.last = last;
lodash.lastIndexOf = lastIndexOf;
lodash.lt = lt;
lodash.lte = lte;
lodash.max = max;
lodash.min = min;
lodash.noConflict = noConflict;
lodash.noop = noop;
lodash.now = now;
lodash.pad = pad;
lodash.padLeft = padLeft;
lodash.padRight = padRight;
lodash.parseInt = parseInt;
lodash.random = random;
lodash.reduce = reduce;
lodash.reduceRight = reduceRight;
lodash.repeat = repeat;
lodash.result = result;
lodash.round = round;
lodash.runInContext = runInContext;
lodash.size = size;
lodash.snakeCase = snakeCase;
lodash.some = some;
lodash.sortedIndex = sortedIndex;
lodash.sortedLastIndex = sortedLastIndex;
lodash.startCase = startCase;
lodash.startsWith = startsWith;
lodash.sum = sum;
lodash.template = template;
lodash.trim = trim;
lodash.trimLeft = trimLeft;
lodash.trimRight = trimRight;
lodash.trunc = trunc;
lodash.unescape = unescape;
lodash.uniqueId = uniqueId;
lodash.words = words;
lodash.all = every;
lodash.any = some;
lodash.contains = includes;
lodash.eq = isEqual;
lodash.detect = find;
lodash.foldl = reduce;
lodash.foldr = reduceRight;
lodash.head = first;
lodash.include = includes;
lodash.inject = reduce;
mixin(lodash, function () {
var source = {};
baseForOwn(lodash, function (func, methodName) {
if (!lodash.prototype[methodName]) {
source[methodName] = func;
}
});
return source;
}(), false);
lodash.sample = sample;
lodash.prototype.sample = function (n) {
if (!this.__chain__ && n == null) {
return sample(this.value());
}
return this.thru(function (value) {
return sample(value, n);
});
};
lodash.VERSION = VERSION;
arrayEach([
'bind',
'bindKey',
'curry',
'curryRight',
'partial',
'partialRight'
], function (methodName) {
lodash[methodName].placeholder = lodash;
});
arrayEach([
'drop',
'take'
], function (methodName, index) {
LazyWrapper.prototype[methodName] = function (n) {
var filtered = this.__filtered__;
if (filtered && !index) {
return new LazyWrapper(this);
}
n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);
var result = this.clone();
if (filtered) {
result.__takeCount__ = nativeMin(result.__takeCount__, n);
} else {
result.__views__.push({
'size': n,
'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
});
}
return result;
};
LazyWrapper.prototype[methodName + 'Right'] = function (n) {
return this.reverse()[methodName](n).reverse();
};
});
arrayEach([
'filter',
'map',
'takeWhile'
], function (methodName, index) {
var type = index + 1, isFilter = type != LAZY_MAP_FLAG;
LazyWrapper.prototype[methodName] = function (iteratee, thisArg) {
var result = this.clone();
result.__iteratees__.push({
'iteratee': getCallback(iteratee, thisArg, 1),
'type': type
});
result.__filtered__ = result.__filtered__ || isFilter;
return result;
};
});
arrayEach([
'first',
'last'
], function (methodName, index) {
var takeName = 'take' + (index ? 'Right' : '');
LazyWrapper.prototype[methodName] = function () {
return this[takeName](1).value()[0];
};
});
arrayEach([
'initial',
'rest'
], function (methodName, index) {
var dropName = 'drop' + (index ? '' : 'Right');
LazyWrapper.prototype[methodName] = function () {
return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
};
});
arrayEach([
'pluck',
'where'
], function (methodName, index) {
var operationName = index ? 'filter' : 'map', createCallback = index ? baseMatches : property;
LazyWrapper.prototype[methodName] = function (value) {
return this[operationName](createCallback(value));
};
});
LazyWrapper.prototype.compact = function () {
return this.filter(identity);
};
LazyWrapper.prototype.reject = function (predicate, thisArg) {
predicate = getCallback(predicate, thisArg, 1);
return this.filter(function (value) {
return !predicate(value);
});
};
LazyWrapper.prototype.slice = function (start, end) {
start = start == null ? 0 : +start || 0;
var result = this;
if (result.__filtered__ && (start > 0 || end < 0)) {
return new LazyWrapper(result);
}
if (start < 0) {
result = result.takeRight(-start);
} else if (start) {
result = result.drop(start);
}
if (end !== undefined) {
end = +end || 0;
result = end < 0 ? result.dropRight(-end) : result.take(end - start);
}
return result;
};
LazyWrapper.prototype.takeRightWhile = function (predicate, thisArg) {
return this.reverse().takeWhile(predicate, thisArg).reverse();
};
LazyWrapper.prototype.toArray = function () {
return this.take(POSITIVE_INFINITY);
};
baseForOwn(LazyWrapper.prototype, function (func, methodName) {
var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName), retUnwrapped = /^(?:first|last)$/.test(methodName), lodashFunc = lodash[retUnwrapped ? 'take' + (methodName == 'last' ? 'Right' : '') : methodName];
if (!lodashFunc) {
return;
}
lodash.prototype[methodName] = function () {
var args = retUnwrapped ? [1] : arguments, chainAll = this.__chain__, value = this.__wrapped__, isHybrid = !!this.__actions__.length, isLazy = value instanceof LazyWrapper, iteratee = args[0], useLazy = isLazy || isArray(value);
if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
isLazy = useLazy = false;
}
var interceptor = function (value) {
return retUnwrapped && chainAll ? lodashFunc(value, 1)[0] : lodashFunc.apply(undefined, arrayPush([value], args));
};
var action = {
'func': thru,
'args': [interceptor],
'thisArg': undefined
}, onlyLazy = isLazy && !isHybrid;
if (retUnwrapped && !chainAll) {
if (onlyLazy) {
value = value.clone();
value.__actions__.push(action);
return func.call(value);
}
return lodashFunc.call(undefined, this.value())[0];
}
if (!retUnwrapped && useLazy) {
value = onlyLazy ? value : new LazyWrapper(this);
var result = func.apply(value, args);
result.__actions__.push(action);
return new LodashWrapper(result, chainAll);
}
return this.thru(interceptor);
};
});
arrayEach([
'join',
'pop',
'push',
'replace',
'shift',
'sort',
'splice',
'split',
'unshift'
], function (methodName) {
var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru', retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
lodash.prototype[methodName] = function () {
var args = arguments;
if (retUnwrapped && !this.__chain__) {
return func.apply(this.value(), args);
}
return this[chainName](function (value) {
return func.apply(value, args);
});
};
});
baseForOwn(LazyWrapper.prototype, function (func, methodName) {
var lodashFunc = lodash[methodName];
if (lodashFunc) {
var key = lodashFunc.name + '', names = realNames[key] || (realNames[key] = []);
names.push({
'name': methodName,
'func': lodashFunc
});
}
});
realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{
'name': 'wrapper',
'func': undefined
}];
LazyWrapper.prototype.clone = lazyClone;
LazyWrapper.prototype.reverse = lazyReverse;
LazyWrapper.prototype.value = lazyValue;
lodash.prototype.chain = wrapperChain;
lodash.prototype.commit = wrapperCommit;
lodash.prototype.concat = wrapperConcat;
lodash.prototype.plant = wrapperPlant;
lodash.prototype.reverse = wrapperReverse;
lodash.prototype.toString = wrapperToString;
lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
lodash.prototype.collect = lodash.prototype.map;
lodash.prototype.head = lodash.prototype.first;
lodash.prototype.select = lodash.prototype.filter;
lodash.prototype.tail = lodash.prototype.rest;
return lodash;
}
var _ = runInContext();
if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
root._ = _;
define(function () {
return _;
});
} else if (freeExports && freeModule) {
if (moduleExports) {
(freeModule.exports = _)._ = _;
} else {
freeExports._ = _;
}
} else {
root._ = _;
}
}.call(this));
(function e(t, n, r) {
function s(o, u) {
if (!n[o]) {
if (!t[o]) {
var a = typeof require == 'function' && require;
if (!u && a)
return a(o, !0);
if (i)
return i(o, !0);
var f = new Error('Cannot find module \'' + o + '\'');
throw f.code = 'MODULE_NOT_FOUND', f;
}
var l = n[o] = { exports: {} };
t[o][0].call(l.exports, function (e) {
var n = t[o][1][e];
return s(n ? n : e);
}, l, l.exports, e, t, n, r);
}
return n[o].exports;
}
var i = typeof require == 'function' && require;
for (var o = 0; o < r.length; o++)
s(r[o]);
return s;
}({
1: [
function (require, module, exports) {
(function (global) {
global.graphlib = require('./index');
}.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
},
{ './index': 2 }
],
2: [
function (require, module, exports) {
var lib = require('./lib');
module.exports = {
Graph: lib.Graph,
json: require('./lib/json'),
alg: require('./lib/alg'),
version: lib.version
};
},
{
'./lib': 18,
'./lib/alg': 9,
'./lib/json': 19
}
],
3: [
function (require, module, exports) {
var _ = require('../lodash');
module.exports = components;
function components(g) {
var visited = {}, cmpts = [], cmpt;
function dfs(v) {
if (_.has(visited, v))
return;
visited[v] = true;
cmpt.push(v);
_.each(g.successors(v), dfs);
_.each(g.predecessors(v), dfs);
}
_.each(g.nodes(), function (v) {
cmpt = [];
dfs(v);
if (cmpt.length) {
cmpts.push(cmpt);
}
});
return cmpts;
}
},
{ '../lodash': 20 }
],
4: [
function (require, module, exports) {
var _ = require('../lodash');
module.exports = dfs;
function dfs(g, vs, order) {
if (!_.isArray(vs)) {
vs = [vs];
}
var acc = [], visited = {};
_.each(vs, function (v) {
if (!g.hasNode(v)) {
throw new Error('Graph does not have node: ' + v);
}
doDfs(g, v, order === 'post', visited, acc);
});
return acc;
}
function doDfs(g, v, postorder, visited, acc) {
if (!_.has(visited, v)) {
visited[v] = true;
if (!postorder) {
acc.push(v);
}
_.each(g.neighbors(v), function (w) {
doDfs(g, w, postorder, visited, acc);
});
if (postorder) {
acc.push(v);
}
}
}
},
{ '../lodash': 20 }
],
5: [
function (require, module, exports) {
var dijkstra = require('./dijkstra'), _ = require('../lodash');
module.exports = dijkstraAll;
function dijkstraAll(g, weightFunc, edgeFunc) {
return _.transform(g.nodes(), function (acc, v) {
acc[v] = dijkstra(g, v, weightFunc, edgeFunc);
}, {});
}
},
{
'../lodash': 20,
'./dijkstra': 6
}
],
6: [
function (require, module, exports) {
var _ = require('../lodash'), PriorityQueue = require('../data/priority-queue');
module.exports = dijkstra;
var DEFAULT_WEIGHT_FUNC = _.constant(1);
function dijkstra(g, source, weightFn, edgeFn) {
return runDijkstra(g, String(source), weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function (v) {
return g.outEdges(v);
});
}
function runDijkstra(g, source, weightFn, edgeFn) {
var results = {}, pq = new PriorityQueue(), v, vEntry;
var updateNeighbors = function (edge) {
var w = edge.v !== v ? edge.v : edge.w, wEntry = results[w], weight = weightFn(edge), distance = vEntry.distance + weight;
if (weight < 0) {
throw new Error('dijkstra does not allow negative edge weights. ' + 'Bad edge: ' + edge + ' Weight: ' + weight);
}
if (distance < wEntry.distance) {
wEntry.distance = distance;
wEntry.predecessor = v;
pq.decrease(w, distance);
}
};
g.nodes().forEach(function (v) {
var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
results[v] = { distance: distance };
pq.add(v, distance);
});
while (pq.size() > 0) {
v = pq.removeMin();
vEntry = results[v];
if (vEntry.distance === Number.POSITIVE_INFINITY) {
break;
}
edgeFn(v).forEach(updateNeighbors);
}
return results;
}
},
{
'../data/priority-queue': 16,
'../lodash': 20
}
],
7: [
function (require, module, exports) {
var _ = require('../lodash'), tarjan = require('./tarjan');
module.exports = findCycles;
function findCycles(g) {
return _.filter(tarjan(g), function (cmpt) {
return cmpt.length > 1 || cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]);
});
}
},
{
'../lodash': 20,
'./tarjan': 14
}
],
8: [
function (require, module, exports) {
var _ = require('../lodash');
module.exports = floydWarshall;
var DEFAULT_WEIGHT_FUNC = _.constant(1);
function floydWarshall(g, weightFn, edgeFn) {
return runFloydWarshall(g, weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function (v) {
return g.outEdges(v);
});
}
function runFloydWarshall(g, weightFn, edgeFn) {
var results = {}, nodes = g.nodes();
nodes.forEach(function (v) {
results[v] = {};
results[v][v] = { distance: 0 };
nodes.forEach(function (w) {
if (v !== w) {
results[v][w] = { distance: Number.POSITIVE_INFINITY };
}
});
edgeFn(v).forEach(function (edge) {
var w = edge.v === v ? edge.w : edge.v, d = weightFn(edge);
results[v][w] = {
distance: d,
predecessor: v
};
});
});
nodes.forEach(function (k) {
var rowK = results[k];
nodes.forEach(function (i) {
var rowI = results[i];
nodes.forEach(function (j) {
var ik = rowI[k];
var kj = rowK[j];
var ij = rowI[j];
var altDistance = ik.distance + kj.distance;
if (altDistance < ij.distance) {
ij.distance = altDistance;
ij.predecessor = kj.predecessor;
}
});
});
});
return results;
}
},
{ '../lodash': 20 }
],
9: [
function (require, module, exports) {
module.exports = {
components: require('./components'),
dijkstra: require('./dijkstra'),
dijkstraAll: require('./dijkstra-all'),
findCycles: require('./find-cycles'),
floydWarshall: require('./floyd-warshall'),
isAcyclic: require('./is-acyclic'),
postorder: require('./postorder'),
preorder: require('./preorder'),
prim: require('./prim'),
tarjan: require('./tarjan'),
topsort: require('./topsort')
};
},
{
'./components': 3,
'./dijkstra': 6,
'./dijkstra-all': 5,
'./find-cycles': 7,
'./floyd-warshall': 8,
'./is-acyclic': 10,
'./postorder': 11,
'./preorder': 12,
'./prim': 13,
'./tarjan': 14,
'./topsort': 15
}
],
10: [
function (require, module, exports) {
var topsort = require('./topsort');
module.exports = isAcyclic;
function isAcyclic(g) {
try {
topsort(g);
} catch (e) {
if (e instanceof topsort.CycleException) {
return false;
}
throw e;
}
return true;
}
},
{ './topsort': 15 }
],
11: [
function (require, module, exports) {
var dfs = require('./dfs');
module.exports = postorder;
function postorder(g, vs) {
return dfs(g, vs, 'post');
}
},
{ './dfs': 4 }
],
12: [
function (require, module, exports) {
var dfs = require('./dfs');
module.exports = preorder;
function preorder(g, vs) {
return dfs(g, vs, 'pre');
}
},
{ './dfs': 4 }
],
13: [
function (require, module, exports) {
var _ = require('../lodash'), Graph = require('../graph'), PriorityQueue = require('../data/priority-queue');
module.exports = prim;
function prim(g, weightFunc) {
var result = new Graph(), parents = {}, pq = new PriorityQueue(), v;
function updateNeighbors(edge) {
var w = edge.v === v ? edge.w : edge.v, pri = pq.priority(w);
if (pri !== undefined) {
var edgeWeight = weightFunc(edge);
if (edgeWeight < pri) {
parents[w] = v;
pq.decrease(w, edgeWeight);
}
}
}
if (g.nodeCount() === 0) {
return result;
}
_.each(g.nodes(), function (v) {
pq.add(v, Number.POSITIVE_INFINITY);
result.setNode(v);
});
pq.decrease(g.nodes()[0], 0);
var init = false;
while (pq.size() > 0) {
v = pq.removeMin();
if (_.has(parents, v)) {
result.setEdge(v, parents[v]);
} else if (init) {
throw new Error('Input graph is not connected: ' + g);
} else {
init = true;
}
g.nodeEdges(v).forEach(updateNeighbors);
}
return result;
}
},
{
'../data/priority-queue': 16,
'../graph': 17,
'../lodash': 20
}
],
14: [
function (require, module, exports) {
var _ = require('../lodash');
module.exports = tarjan;
function tarjan(g) {
var index = 0, stack = [], visited = {}, results = [];
function dfs(v) {
var entry = visited[v] = {
onStack: true,
lowlink: index,
index: index++
};
stack.push(v);
g.successors(v).forEach(function (w) {
if (!_.has(visited, w)) {
dfs(w);
entry.lowlink = Math.min(entry.lowlink, visited[w].lowlink);
} else if (visited[w].onStack) {
entry.lowlink = Math.min(entry.lowlink, visited[w].index);
}
});
if (entry.lowlink === entry.index) {
var cmpt = [], w;
do {
w = stack.pop();
visited[w].onStack = false;
cmpt.push(w);
} while (v !== w);
results.push(cmpt);
}
}
g.nodes().forEach(function (v) {
if (!_.has(visited, v)) {
dfs(v);
}
});
return results;
}
},
{ '../lodash': 20 }
],
15: [
function (require, module, exports) {
var _ = require('../lodash');
module.exports = topsort;
topsort.CycleException = CycleException;
function topsort(g) {
var visited = {}, stack = {}, results = [];
function visit(node) {
if (_.has(stack, node)) {
throw new CycleException();
}
if (!_.has(visited, node)) {
stack[node] = true;
visited[node] = true;
_.each(g.predecessors(node), visit);
delete stack[node];
results.push(node);
}
}
_.each(g.sinks(), visit);
if (_.size(visited) !== g.nodeCount()) {
throw new CycleException();
}
return results;
}
function CycleException() {
}
},
{ '../lodash': 20 }
],
16: [
function (require, module, exports) {
var _ = require('../lodash');
module.exports = PriorityQueue;
function PriorityQueue() {
this._arr = [];
this._keyIndices = {};
}
PriorityQueue.prototype.size = function () {
return this._arr.length;
};
PriorityQueue.prototype.keys = function () {
return this._arr.map(function (x) {
return x.key;
});
};
PriorityQueue.prototype.has = function (key) {
return _.has(this._keyIndices, key);
};
PriorityQueue.prototype.priority = function (key) {
var index = this._keyIndices[key];
if (index !== undefined) {
return this._arr[index].priority;
}
};
PriorityQueue.prototype.min = function () {
if (this.size() === 0) {
throw new Error('Queue underflow');
}
return this._arr[0].key;
};
PriorityQueue.prototype.add = function (key, priority) {
var keyIndices = this._keyIndices;
key = String(key);
if (!_.has(keyIndices, key)) {
var arr = this._arr;
var index = arr.length;
keyIndices[key] = index;
arr.push({
key: key,
priority: priority
});
this._decrease(index);
return true;
}
return false;
};
PriorityQueue.prototype.removeMin = function () {
this._swap(0, this._arr.length - 1);
var min = this._arr.pop();
delete this._keyIndices[min.key];
this._heapify(0);
return min.key;
};
PriorityQueue.prototype.decrease = function (key, priority) {
var index = this._keyIndices[key];
if (priority > this._arr[index].priority) {
throw new Error('New priority is greater than current priority. ' + 'Key: ' + key + ' Old: ' + this._arr[index].priority + ' New: ' + priority);
}
this._arr[index].priority = priority;
this._decrease(index);
};
PriorityQueue.prototype._heapify = function (i) {
var arr = this._arr;
var l = 2 * i, r = l + 1, largest = i;
if (l < arr.length) {
largest = arr[l].priority < arr[largest].priority ? l : largest;
if (r < arr.length) {
largest = arr[r].priority < arr[largest].priority ? r : largest;
}
if (largest !== i) {
this._swap(i, largest);
this._heapify(largest);
}
}
};
PriorityQueue.prototype._decrease = function (index) {
var arr = this._arr;
var priority = arr[index].priority;
var parent;
while (index !== 0) {
parent = index >> 1;
if (arr[parent].priority < priority) {
break;
}
this._swap(index, parent);
index = parent;
}
};
PriorityQueue.prototype._swap = function (i, j) {
var arr = this._arr;
var keyIndices = this._keyIndices;
var origArrI = arr[i];
var origArrJ = arr[j];
arr[i] = origArrJ;
arr[j] = origArrI;
keyIndices[origArrJ.key] = i;
keyIndices[origArrI.key] = j;
};
},
{ '../lodash': 20 }
],
17: [
function (require, module, exports) {
'use strict';
var _ = require('./lodash');
module.exports = Graph;
var DEFAULT_EDGE_NAME = '\0', GRAPH_NODE = '\0', EDGE_KEY_DELIM = '\x01';
function Graph(opts) {
this._isDirected = _.has(opts, 'directed') ? opts.directed : true;
this._isMultigraph = _.has(opts, 'multigraph') ? opts.multigraph : false;
this._isCompound = _.has(opts, 'compound') ? opts.compound : false;
this._label = undefined;
this._defaultNodeLabelFn = _.constant(undefined);
this._defaultEdgeLabelFn = _.constant(undefined);
this._nodes = {};
if (this._isCompound) {
this._parent = {};
this._children = {};
this._children[GRAPH_NODE] = {};
}
this._in = {};
this._preds = {};
this._out = {};
this._sucs = {};
this._edgeObjs = {};
this._edgeLabels = {};
}
Graph.prototype._nodeCount = 0;
Graph.prototype._edgeCount = 0;
Graph.prototype.isDirected = function () {
return this._isDirected;
};
Graph.prototype.isMultigraph = function () {
return this._isMultigraph;
};
Graph.prototype.isCompound = function () {
return this._isCompound;
};
Graph.prototype.setGraph = function (label) {
this._label = label;
return this;
};
Graph.prototype.graph = function () {
return this._label;
};
Graph.prototype.setDefaultNodeLabel = function (newDefault) {
if (!_.isFunction(newDefault)) {
newDefault = _.constant(newDefault);
}
this._defaultNodeLabelFn = newDefault;
return this;
};
Graph.prototype.nodeCount = function () {
return this._nodeCount;
};
Graph.prototype.nodes = function () {
return _.keys(this._nodes);
};
Graph.prototype.sources = function () {
return _.filter(this.nodes(), function (v) {
return _.isEmpty(this._in[v]);
}, this);
};
Graph.prototype.sinks = function () {
return _.filter(this.nodes(), function (v) {
return _.isEmpty(this._out[v]);
}, this);
};
Graph.prototype.setNodes = function (vs, value) {
var args = arguments;
_.each(vs, function (v) {
if (args.length > 1) {
this.setNode(v, value);
} else {
this.setNode(v);
}
}, this);
return this;
};
Graph.prototype.setNode = function (v, value) {
if (_.has(this._nodes, v)) {
if (arguments.length > 1) {
this._nodes[v] = value;
}
return this;
}
this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
if (this._isCompound) {
this._parent[v] = GRAPH_NODE;
this._children[v] = {};
this._children[GRAPH_NODE][v] = true;
}
this._in[v] = {};
this._preds[v] = {};
this._out[v] = {};
this._sucs[v] = {};
++this._nodeCount;
return this;
};
Graph.prototype.node = function (v) {
return this._nodes[v];
};
Graph.prototype.hasNode = function (v) {
return _.has(this._nodes, v);
};
Graph.prototype.removeNode = function (v) {
var self = this;
if (_.has(this._nodes, v)) {
var removeEdge = function (e) {
self.removeEdge(self._edgeObjs[e]);
};
delete this._nodes[v];
if (this._isCompound) {
this._removeFromParentsChildList(v);
delete this._parent[v];
_.each(this.children(v), function (child) {
this.setParent(child);
}, this);
delete this._children[v];
}
_.each(_.keys(this._in[v]), removeEdge);
delete this._in[v];
delete this._preds[v];
_.each(_.keys(this._out[v]), removeEdge);
delete this._out[v];
delete this._sucs[v];
--this._nodeCount;
}
return this;
};
Graph.prototype.setParent = function (v, parent) {
if (!this._isCompound) {
throw new Error('Cannot set parent in a non-compound graph');
}
if (_.isUndefined(parent)) {
parent = GRAPH_NODE;
} else {
parent += '';
for (var ancestor = parent; !_.isUndefined(ancestor); ancestor = this.parent(ancestor)) {
if (ancestor === v) {
throw new Error('Setting ' + parent + ' as parent of ' + v + ' would create create a cycle');
}
}
this.setNode(parent);
}
this.setNode(v);
this._removeFromParentsChildList(v);
this._parent[v] = parent;
this._children[parent][v] = true;
return this;
};
Graph.prototype._removeFromParentsChildList = function (v) {
delete this._children[this._parent[v]][v];
};
Graph.prototype.parent = function (v) {
if (this._isCompound) {
var parent = this._parent[v];
if (parent !== GRAPH_NODE) {
return parent;
}
}
};
Graph.prototype.children = function (v) {
if (_.isUndefined(v)) {
v = GRAPH_NODE;
}
if (this._isCompound) {
var children = this._children[v];
if (children) {
return _.keys(children);
}
} else if (v === GRAPH_NODE) {
return this.nodes();
} else if (this.hasNode(v)) {
return [];
}
};
Graph.prototype.predecessors = function (v) {
var predsV = this._preds[v];
if (predsV) {
return _.keys(predsV);
}
};
Graph.prototype.successors = function (v) {
var sucsV = this._sucs[v];
if (sucsV) {
return _.keys(sucsV);
}
};
Graph.prototype.neighbors = function (v) {
var preds = this.predecessors(v);
if (preds) {
return _.union(preds, this.successors(v));
}
};
Graph.prototype.filterNodes = function (filter) {
var copy = new this.constructor({
directed: this._isDirected,
multigraph: this._isMultigraph,
compound: this._isCompound
});
copy.setGraph(this.graph());
_.each(this._nodes, function (value, v) {
if (filter(v)) {
copy.setNode(v, value);
}
}, this);
_.each(this._edgeObjs, function (e) {
if (copy.hasNode(e.v) && copy.hasNode(e.w)) {
copy.setEdge(e, this.edge(e));
}
}, this);
var self = this;
var parents = {};
function findParent(v) {
var parent = self.parent(v);
if (parent === undefined || copy.hasNode(parent)) {
parents[v] = parent;
return parent;
} else if (parent in parents) {
return parents[parent];
} else {
return findParent(parent);
}
}
if (this._isCompound) {
_.each(copy.nodes(), function (v) {
copy.setParent(v, findParent(v));
});
}
return copy;
};
Graph.prototype.setDefaultEdgeLabel = function (newDefault) {
if (!_.isFunction(newDefault)) {
newDefault = _.constant(newDefault);
}
this._defaultEdgeLabelFn = newDefault;
return this;
};
Graph.prototype.edgeCount = function () {
return this._edgeCount;
};
Graph.prototype.edges = function () {
return _.values(this._edgeObjs);
};
Graph.prototype.setPath = function (vs, value) {
var self = this, args = arguments;
_.reduce(vs, function (v, w) {
if (args.length > 1) {
self.setEdge(v, w, value);
} else {
self.setEdge(v, w);
}
return w;
});
return this;
};
Graph.prototype.setEdge = function () {
var v, w, name, value, valueSpecified = false, arg0 = arguments[0];
if (typeof arg0 === 'object' && arg0 !== null && 'v' in arg0) {
v = arg0.v;
w = arg0.w;
name = arg0.name;
if (arguments.length === 2) {
value = arguments[1];
valueSpecified = true;
}
} else {
v = arg0;
w = arguments[1];
name = arguments[3];
if (arguments.length > 2) {
value = arguments[2];
valueSpecified = true;
}
}
v = '' + v;
w = '' + w;
if (!_.isUndefined(name)) {
name = '' + name;
}
var e = edgeArgsToId(this._isDirected, v, w, name);
if (_.has(this._edgeLabels, e)) {
if (valueSpecified) {
this._edgeLabels[e] = value;
}
return this;
}
if (!_.isUndefined(name) && !this._isMultigraph) {
throw new Error('Cannot set a named edge when isMultigraph = false');
}
this.setNode(v);
this.setNode(w);
this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);
var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
v = edgeObj.v;
w = edgeObj.w;
Object.freeze(edgeObj);
this._edgeObjs[e] = edgeObj;
incrementOrInitEntry(this._preds[w], v);
incrementOrInitEntry(this._sucs[v], w);
this._in[w][e] = edgeObj;
this._out[v][e] = edgeObj;
this._edgeCount++;
return this;
};
Graph.prototype.edge = function (v, w, name) {
var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
return this._edgeLabels[e];
};
Graph.prototype.hasEdge = function (v, w, name) {
var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
return _.has(this._edgeLabels, e);
};
Graph.prototype.removeEdge = function (v, w, name) {
var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name), edge = this._edgeObjs[e];
if (edge) {
v = edge.v;
w = edge.w;
delete this._edgeLabels[e];
delete this._edgeObjs[e];
decrementOrRemoveEntry(this._preds[w], v);
decrementOrRemoveEntry(this._sucs[v], w);
delete this._in[w][e];
delete this._out[v][e];
this._edgeCount--;
}
return this;
};
Graph.prototype.inEdges = function (v, u) {
var inV = this._in[v];
if (inV) {
var edges = _.values(inV);
if (!u) {
return edges;
}
return _.filter(edges, function (edge) {
return edge.v === u;
});
}
};
Graph.prototype.outEdges = function (v, w) {
var outV = this._out[v];
if (outV) {
var edges = _.values(outV);
if (!w) {
return edges;
}
return _.filter(edges, function (edge) {
return edge.w === w;
});
}
};
Graph.prototype.nodeEdges = function (v, w) {
var inEdges = this.inEdges(v, w);
if (inEdges) {
return inEdges.concat(this.outEdges(v, w));
}
};
function incrementOrInitEntry(map, k) {
if (map[k]) {
map[k]++;
} else {
map[k] = 1;
}
}
function decrementOrRemoveEntry(map, k) {
if (!--map[k]) {
delete map[k];
}
}
function edgeArgsToId(isDirected, v_, w_, name) {
var v = '' + v_;
var w = '' + w_;
if (!isDirected && v > w) {
var tmp = v;
v = w;
w = tmp;
}
return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM + (_.isUndefined(name) ? DEFAULT_EDGE_NAME : name);
}
function edgeArgsToObj(isDirected, v_, w_, name) {
var v = '' + v_;
var w = '' + w_;
if (!isDirected && v > w) {
var tmp = v;
v = w;
w = tmp;
}
var edgeObj = {
v: v,
w: w
};
if (name) {
edgeObj.name = name;
}
return edgeObj;
}
function edgeObjToId(isDirected, edgeObj) {
return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}
},
{ './lodash': 20 }
],
18: [
function (require, module, exports) {
module.exports = {
Graph: require('./graph'),
version: require('./version')
};
},
{
'./graph': 17,
'./version': 21
}
],
19: [
function (require, module, exports) {
var _ = require('./lodash'), Graph = require('./graph');
module.exports = {
write: write,
read: read
};
function write(g) {
var json = {
options: {
directed: g.isDirected(),
multigraph: g.isMultigraph(),
compound: g.isCompound()
},
nodes: writeNodes(g),
edges: writeEdges(g)
};
if (!_.isUndefined(g.graph())) {
json.value = _.clone(g.graph());
}
return json;
}
function writeNodes(g) {
return _.map(g.nodes(), function (v) {
var nodeValue = g.node(v), parent = g.parent(v), node = { v: v };
if (!_.isUndefined(nodeValue)) {
node.value = nodeValue;
}
if (!_.isUndefined(parent)) {
node.parent = parent;
}
return node;
});
}
function writeEdges(g) {
return _.map(g.edges(), function (e) {
var edgeValue = g.edge(e), edge = {
v: e.v,
w: e.w
};
if (!_.isUndefined(e.name)) {
edge.name = e.name;
}
if (!_.isUndefined(edgeValue)) {
edge.value = edgeValue;
}
return edge;
});
}
function read(json) {
var g = new Graph(json.options).setGraph(json.value);
_.each(json.nodes, function (entry) {
g.setNode(entry.v, entry.value);
if (entry.parent) {
g.setParent(entry.v, entry.parent);
}
});
_.each(json.edges, function (entry) {
g.setEdge({
v: entry.v,
w: entry.w,
name: entry.name
}, entry.value);
});
return g;
}
},
{
'./graph': 17,
'./lodash': 20
}
],
20: [
function (require, module, exports) {
var lodash;
if (typeof require === 'function') {
try {
lodash = require('lodash');
} catch (e) {
}
}
if (!lodash) {
lodash = window._;
}
module.exports = lodash;
},
{ 'lodash': undefined }
],
21: [
function (require, module, exports) {
module.exports = '1.0.7';
},
{}
]
}, {}, [1]));
var tf;
(function (tf) {
var ASYNC_TASK_DELAY = 20;
function time(msg, task) {
var start = Date.now();
var result = task();
console.log(msg, ':', Date.now() - start, 'ms');
return result;
}
tf.time = time;
function getSubtaskTracker(parentTracker, impactOnTotalProgress, subtaskMsg) {
return {
setMessage: function (progressMsg) {
parentTracker.setMessage(subtaskMsg + ' : ' + progressMsg);
},
updateProgress: function (incrementValue) {
parentTracker.updateProgress(incrementValue * impactOnTotalProgress / 100);
},
reportError: function (errorMsg) {
parentTracker.reportError(subtaskMsg + ' : ' + errorMsg);
}
};
}
tf.getSubtaskTracker = getSubtaskTracker;
function runAsyncTask(msg, incProgressValue, task, tracker) {
return new Promise(function (resolve, reject) {
tracker.setMessage(msg);
setTimeout(function () {
try {
var result = tf.time(msg, task);
tracker.updateProgress(incProgressValue);
resolve(result);
} catch (e) {
reject(result);
}
}, ASYNC_TASK_DELAY);
});
}
tf.runAsyncTask = runAsyncTask;
function escapeQuerySelector(querySelector) {
return querySelector.replace(/([:.\[\],\/\\\(\)])/g, '\\$1');
}
tf.escapeQuerySelector = escapeQuerySelector;
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph_1) {
graph_1.NAMESPACE_DELIM = '/';
var FULL_GRAPH_NAME = 'fullGraph';
graph_1.ROOT_NAME = '__root__';
graph_1.EDGE_KEY_DELIM = '--';
(function (GraphType) {
GraphType[GraphType['FULL'] = 0] = 'FULL';
GraphType[GraphType['EMBEDDED'] = 1] = 'EMBEDDED';
GraphType[GraphType['META'] = 2] = 'META';
GraphType[GraphType['SERIES'] = 3] = 'SERIES';
GraphType[GraphType['CORE'] = 4] = 'CORE';
GraphType[GraphType['SHADOW'] = 5] = 'SHADOW';
GraphType[GraphType['BRIDGE'] = 6] = 'BRIDGE';
GraphType[GraphType['EDGE'] = 7] = 'EDGE';
}(graph_1.GraphType || (graph_1.GraphType = {})));
var GraphType = graph_1.GraphType;
;
(function (NodeType) {
NodeType[NodeType['META'] = 0] = 'META';
NodeType[NodeType['OP'] = 1] = 'OP';
NodeType[NodeType['SERIES'] = 2] = 'SERIES';
NodeType[NodeType['BRIDGE'] = 3] = 'BRIDGE';
NodeType[NodeType['ELLIPSIS'] = 4] = 'ELLIPSIS';
}(graph_1.NodeType || (graph_1.NodeType = {})));
var NodeType = graph_1.NodeType;
;
var SlimGraph = function () {
function SlimGraph() {
this.nodes = {};
this.edges = [];
}
return SlimGraph;
}();
graph_1.SlimGraph = SlimGraph;
var EllipsisNodeImpl = function () {
function EllipsisNodeImpl(numNodes) {
this.type = NodeType.ELLIPSIS;
this.isGroupNode = false;
this.cardinality = 1;
this.parentNode = null;
this.stats = null;
this.setNumMoreNodes(numNodes);
}
EllipsisNodeImpl.prototype.setNumMoreNodes = function (numNodes) {
this.numMoreNodes = numNodes;
this.name = '... ' + numNodes + ' more';
};
return EllipsisNodeImpl;
}();
graph_1.EllipsisNodeImpl = EllipsisNodeImpl;
;
var OpNodeImpl = function () {
function OpNodeImpl(rawNode, normalizedInputs) {
this.op = rawNode.op;
this.name = rawNode.name;
this.device = rawNode.device;
this.attr = rawNode.attr;
this.inputs = normalizedInputs;
this.type = NodeType.OP;
this.isGroupNode = false;
this.cardinality = 1;
this.inEmbeddings = [];
this.outEmbeddings = [];
this.parentNode = null;
}
return OpNodeImpl;
}();
;
function createMetanode(name, opt) {
if (opt === void 0) {
opt = {};
}
return new MetanodeImpl(name, opt);
}
graph_1.createMetanode = createMetanode;
function joinStatsInfoWithGraph(graph, statsJson) {
_.each(statsJson.devStats, function (stats) {
_.each(stats.nodeStats, function (nodeStats) {
var nodeName = nodeStats.nodeName in graph.nodes ? nodeStats.nodeName : nodeStats.nodeName + graph_1.NAMESPACE_DELIM + '(' + nodeStats.nodeName + ')';
if (nodeName in graph.nodes) {
var totalBytes = 0;
if (nodeStats.memory) {
_.each(nodeStats.memory, function (alloc) {
if (alloc.totalBytes) {
totalBytes += Number(alloc.totalBytes);
}
});
}
var outputSize = null;
if (nodeStats.output) {
outputSize = _.map(nodeStats.output, function (output) {
return _.map(output.tensorDescription.shape.dim, function (dim) {
return Number(dim.size);
});
});
}
graph.nodes[nodeName].stats = new NodeStats(totalBytes, Number(nodeStats.allEndRelMicros), outputSize);
}
});
});
}
graph_1.joinStatsInfoWithGraph = joinStatsInfoWithGraph;
var NodeStats = function () {
function NodeStats(totalBytes, totalMicros, outputSize) {
this.totalBytes = totalBytes;
this.totalMicros = totalMicros;
this.outputSize = outputSize;
}
NodeStats.prototype.combine = function (stats) {
if (stats.totalBytes != null) {
this.totalBytes += stats.totalBytes;
}
if (stats.totalMicros != null) {
this.totalMicros += stats.totalMicros;
}
};
return NodeStats;
}();
var MetanodeImpl = function () {
function MetanodeImpl(name, opt) {
if (opt === void 0) {
opt = {};
}
this.name = name;
this.type = NodeType.META;
this.depth = 1;
this.isGroupNode = true;
this.cardinality = 0;
this.metagraph = createGraph(name, GraphType.META, opt);
this.bridgegraph = null;
this.opHistogram = {};
this.deviceHistogram = {};
this.templateId = null;
this.parentNode = null;
this.stats = new NodeStats(0, 0, null);
this.hasNonControlEdges = false;
}
MetanodeImpl.prototype.getFirstChild = function () {
return this.metagraph.node(this.metagraph.nodes()[0]);
};
MetanodeImpl.prototype.getRootOp = function () {
var nameSplit = this.name.split('/');
var rootOpName = this.name + '/(' + nameSplit[nameSplit.length - 1] + ')';
return this.metagraph.node(rootOpName);
};
MetanodeImpl.prototype.leaves = function () {
var leaves = [];
var queue = [this];
var metagraph;
while (queue.length) {
var node = queue.shift();
if (node.isGroupNode) {
metagraph = node.metagraph;
_.each(metagraph.nodes(), function (name) {
return queue.push(metagraph.node(name));
});
} else {
leaves.push(node.name);
}
}
return leaves;
};
return MetanodeImpl;
}();
;
function createMetaedge(v, w) {
return new MetaedgeImpl(v, w);
}
graph_1.createMetaedge = createMetaedge;
var MetaedgeImpl = function () {
function MetaedgeImpl(v, w) {
this.v = v;
this.w = w;
this.baseEdgeList = [];
this.inbound = null;
this.numRegularEdges = 0;
this.numControlEdges = 0;
this.numRefEdges = 0;
}
MetaedgeImpl.prototype.addBaseEdge = function (edge) {
this.baseEdgeList.push(edge);
if (edge.isControlDependency) {
this.numControlEdges += 1;
} else {
this.numRegularEdges += 1;
}
if (edge.isReferenceEdge) {
this.numRefEdges += 1;
}
};
return MetaedgeImpl;
}();
function createSeriesNode(prefix, suffix, parent, clusterId, name) {
return new SeriesNodeImpl(prefix, suffix, parent, clusterId, name);
}
graph_1.createSeriesNode = createSeriesNode;
function getSeriesNodeName(prefix, suffix, parent, startId, endId) {
var numRepresentation = typeof startId !== 'undefined' && typeof endId !== 'undefined' ? '[' + startId + '-' + endId + ']' : '#';
var pattern = prefix + numRepresentation + suffix;
return (parent ? parent + '/' : '') + pattern;
}
graph_1.getSeriesNodeName = getSeriesNodeName;
var SeriesNodeImpl = function () {
function SeriesNodeImpl(prefix, suffix, parent, clusterId, name) {
this.name = name || getSeriesNodeName(prefix, suffix, parent);
this.type = NodeType.SERIES;
this.hasLoop = false;
this.prefix = prefix;
this.suffix = suffix;
this.clusterId = clusterId;
this.ids = [];
this.parent = parent;
this.isGroupNode = true;
this.cardinality = 0;
this.metagraph = createGraph(name, GraphType.SERIES);
this.bridgegraph = null;
this.parentNode = null;
this.deviceHistogram = {};
this.hasNonControlEdges = false;
this.stats = new NodeStats(0, 0, null);
}
return SeriesNodeImpl;
}();
function normalizeInputs(inputs) {
return _.reduce(inputs, function (normalizedInputs, inputName) {
var start = inputName[0] === '^';
var colon = inputName.lastIndexOf(':');
var end = colon !== -1 && inputName.length - colon > 1 && !/\D/.test(inputName.substring(colon + 1)) ? colon : inputName.length;
var name = inputName.substring(start ? 1 : 0, end);
if (normalizedInputs.length === 0 || name !== normalizedInputs[normalizedInputs.length - 1].name) {
normalizedInputs.push({
name: name,
hasNumberPart: end !== inputName.length,
isControlDependency: start
});
}
return normalizedInputs;
}, []);
}
function build(rawNodes, params, tracker) {
var inEmbedding = {};
var outEmbeddings = {};
var isInEmbeddedPred = getEmbedPredicate(params.inEmbeddingTypes);
var isOutEmbeddedPred = getEmbedPredicate(params.outEmbeddingTypes);
var embeddingNodeNames = [];
var nodeNames = new Array(rawNodes.length);
return tf.runAsyncTask('Normalizing names', 30, function () {
var opNodes = new Array(rawNodes.length);
var index = 0;
_.each(rawNodes, function (rawNode) {
var normalizedInputs = normalizeInputs(rawNode.input);
var opNode = new OpNodeImpl(rawNode, normalizedInputs);
if (isInEmbeddedPred(opNode)) {
embeddingNodeNames.push(opNode.name);
inEmbedding[opNode.name] = opNode;
return;
}
if (isOutEmbeddedPred(opNode)) {
embeddingNodeNames.push(opNode.name);
_.each(opNode.inputs, function (input) {
var inputName = input.name;
outEmbeddings[inputName] = outEmbeddings[inputName] || [];
outEmbeddings[inputName].push(opNode);
});
return;
}
opNodes[index] = opNode;
nodeNames[index] = opNode.name;
index++;
});
opNodes.splice(index);
nodeNames.splice(index);
return opNodes;
}, tracker).then(function (opNodes) {
return tf.runAsyncTask('Building the data structure', 70, function () {
var normalizedNameDict = mapStrictHierarchy(nodeNames, embeddingNodeNames);
var graph = new SlimGraph();
_.each(opNodes, function (opNode) {
var normalizedName = normalizedNameDict[opNode.name] || opNode.name;
graph.nodes[normalizedName] = opNode;
if (opNode.name in outEmbeddings) {
opNode.outEmbeddings = outEmbeddings[opNode.name];
_.each(opNode.outEmbeddings, function (node) {
node.name = normalizedNameDict[node.name] || node.name;
});
}
opNode.name = normalizedName;
});
_.each(opNodes, function (opNode) {
_.each(opNode.inputs, function (input, i) {
var inputName = input.name;
if (inputName in inEmbedding) {
opNode.inEmbeddings.push(inEmbedding[inputName]);
} else {
graph.edges.push({
v: normalizedNameDict[inputName] || inputName,
w: opNode.name,
isControlDependency: input.isControlDependency,
isReferenceEdge: params.refEdges[opNode.op + ' ' + i] === true
});
}
});
});
_.each(inEmbedding, function (node, name) {
node.name = normalizedNameDict[node.name] || node.name;
});
return graph;
}, tracker);
}).catch(function (reason) {
throw new Error('Failure creating graph');
});
}
graph_1.build = build;
;
function createGraph(name, type, opt) {
if (opt === void 0) {
opt = {};
}
var graph = new graphlib.Graph(opt);
graph.setGraph({
name: name,
rankdir: 'BT',
type: type
});
return graph;
}
graph_1.createGraph = createGraph;
;
function getEmbedPredicate(types) {
return function (node) {
for (var i = 0; i < types.length; i++) {
var regExp = new RegExp(types[i]);
if (node.op.match(regExp)) {
return true;
}
}
return false;
};
}
;
function getStrictName(name) {
var parts = name.split(graph_1.NAMESPACE_DELIM);
return name + graph_1.NAMESPACE_DELIM + '(' + parts[parts.length - 1] + ')';
}
function mapStrictHierarchy(nodeNames, embeddingNodeNames) {
var newNameDictionary = {};
var namespaceSet = {};
nodeNames.sort();
for (var i = 0; i < nodeNames.length - 1; ++i) {
var a = nodeNames[i];
_.each(getHierarchicalPath(a).slice(0, -1), function (ns) {
namespaceSet[ns] = true;
});
var b = nodeNames[i + 1];
if (_.startsWith(b, a + graph_1.NAMESPACE_DELIM)) {
newNameDictionary[a] = getStrictName(a);
}
}
_.each(embeddingNodeNames, function (embeddingName) {
if (embeddingName in namespaceSet) {
newNameDictionary[embeddingName] = getStrictName(embeddingName);
}
});
return newNameDictionary;
}
;
function degreeSequence(graph) {
var degrees = graph.nodes().map(function (name) {
return graph.neighbors(name).length;
});
degrees.sort();
return degrees;
}
;
function hasSimilarDegreeSequence(graph1, graph2) {
var dg1 = degreeSequence(graph1);
var dg2 = degreeSequence(graph2);
for (var i = 0; i < dg1.length; i++) {
if (dg1[i] !== dg2[i]) {
return false;
}
}
return true;
}
graph_1.hasSimilarDegreeSequence = hasSimilarDegreeSequence;
;
function getHierarchicalPath(name, seriesNames) {
var path = [];
var i = name.indexOf(graph_1.NAMESPACE_DELIM);
while (i >= 0) {
path.push(name.substring(0, i));
i = name.indexOf(graph_1.NAMESPACE_DELIM, i + 1);
}
if (seriesNames) {
var seriesName = seriesNames[name];
if (seriesName) {
path.push(seriesName);
}
}
path.push(name);
return path;
}
graph_1.getHierarchicalPath = getHierarchicalPath;
;
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph) {
var parser;
(function (parser) {
function parseValue(value) {
if (value === 'true') {
return true;
}
if (value === 'false') {
return false;
}
var firstChar = value[0];
if (firstChar === '"') {
return value.substring(1, value.length - 1);
}
var num = parseFloat(value);
return isNaN(num) ? value : num;
}
function readPbTxt(filepath) {
return new Promise(function (resolve, reject) {
d3.text(filepath, function (error, text) {
if (error) {
reject(error);
return;
}
resolve(text);
});
});
}
parser.readPbTxt = readPbTxt;
function readJson(filepath) {
return new Promise(function (resolve, reject) {
d3.json(filepath, function (error, text) {
if (error) {
reject(error);
return;
}
resolve(text);
});
});
}
parser.readJson = readJson;
function readAndParseData(dataset, pbTxtContent, tracker) {
var graphPbTxt;
var statsJson;
return tf.runAsyncTask('Reading graph.pbtxt', 20, function () {
return pbTxtContent || readPbTxt(dataset.path);
}, tracker).then(function (text) {
graphPbTxt = text;
return tf.runAsyncTask('Reading stats.pbtxt', 20, function () {
return dataset != null && dataset.statsPath != null ? readJson(dataset.statsPath) : null;
}, tracker);
}).then(function (json) {
statsJson = json;
return tf.runAsyncTask('Parsing graph.pbtxt', 60, function () {
return parsePbtxt(graphPbTxt);
}, tracker);
}).then(function (nodes) {
return {
nodes: nodes,
statsJson: statsJson
};
}).catch(function (reason) {
throw new Error('Failure parsing graph definition');
});
}
parser.readAndParseData = readAndParseData;
function parsePbtxt(input) {
var output = { node: [] };
var stack = [];
var path = [];
var current = output;
function splitNameAndValueInAttribute(line) {
var colonIndex = line.indexOf(':');
var name = line.substring(0, colonIndex).trim();
var value = parseValue(line.substring(colonIndex + 2).trim());
return {
name: name,
value: value
};
}
var ARRAY_ATTRIBUTES = {
'node': true,
'node.input': true,
'node.attr': true,
'node.attr.value.list.type': true,
'node.attr.value.shape.dim': true,
'node.attr.value.tensor.string_val': true,
'node.attr.value.tensor.tensor_shape.dim': true
};
function addAttribute(obj, name, value, path) {
var existingValue = obj[name];
if (existingValue == null) {
obj[name] = path.join('.') in ARRAY_ATTRIBUTES ? [value] : value;
} else if (Array.isArray(existingValue)) {
existingValue.push(value);
} else {
obj[name] = [
existingValue,
value
];
}
}
var startPos = 0;
while (startPos < input.length) {
var endPos = input.indexOf('\n', startPos);
if (endPos === -1) {
endPos = input.length;
}
var line = input.substring(startPos, endPos);
startPos = endPos + 1;
if (!line) {
continue;
}
switch (line[line.length - 1]) {
case '{':
var name_1 = line.substring(0, line.length - 2).trim();
var newValue = {};
stack.push(current);
path.push(name_1);
addAttribute(current, name_1, newValue, path);
current = newValue;
break;
case '}':
current = stack.pop();
path.pop();
break;
default:
var x = splitNameAndValueInAttribute(line);
addAttribute(current, x.name, x.value, path.concat(x.name));
break;
}
}
return output['node'];
}
parser.parsePbtxt = parsePbtxt;
}(parser = graph.parser || (graph.parser = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph_1) {
var hierarchy;
(function (hierarchy_1) {
var LOG_PREFIX_MSG = 'Graph hierarchy: ';
var HierarchyImpl = function () {
function HierarchyImpl() {
this.root = graph_1.createMetanode(graph_1.ROOT_NAME, { compound: true });
this.templates = null;
this.devices = null;
this.index = {};
this.index[graph_1.ROOT_NAME] = this.root;
this.orderings = {};
}
HierarchyImpl.prototype.getNodeMap = function () {
return this.index;
};
HierarchyImpl.prototype.node = function (name) {
return this.index[name];
};
HierarchyImpl.prototype.setNode = function (name, node) {
this.index[name] = node;
};
HierarchyImpl.prototype.getBridgegraph = function (nodeName) {
var _this = this;
var node = this.index[nodeName];
if (!node) {
throw Error('Could not find node in hierarchy: ' + nodeName);
}
if (!('metagraph' in node)) {
return null;
}
var groupNode = node;
if (groupNode.bridgegraph) {
return groupNode.bridgegraph;
}
var bridgegraph = groupNode.bridgegraph = graph_1.createGraph('BRIDGEGRAPH', graph_1.GraphType.BRIDGE);
if (!node.parentNode || !('metagraph' in node.parentNode)) {
return bridgegraph;
}
var parentNode = node.parentNode;
var parentMetagraph = parentNode.metagraph;
var parentBridgegraph = this.getBridgegraph(parentNode.name);
_.each([
parentMetagraph,
parentBridgegraph
], function (parentGraph) {
_(parentGraph.edges()).filter(function (e) {
return e.v === nodeName || e.w === nodeName;
}).each(function (parentEdgeObj) {
var inbound = parentEdgeObj.w === nodeName;
var parentMetaedge = parentGraph.edge(parentEdgeObj);
_.each(parentMetaedge.baseEdgeList, function (baseEdge) {
var _a = inbound ? [
baseEdge.w,
parentEdgeObj.v
] : [
baseEdge.v,
parentEdgeObj.w
], descendantName = _a[0], otherName = _a[1];
var childName = _this.getChildName(nodeName, descendantName);
var bridgeEdgeObj = {
v: inbound ? otherName : childName,
w: inbound ? childName : otherName
};
var bridgeMetaedge = bridgegraph.edge(bridgeEdgeObj);
if (!bridgeMetaedge) {
bridgeMetaedge = graph_1.createMetaedge(bridgeEdgeObj.v, bridgeEdgeObj.w);
bridgeMetaedge.inbound = inbound;
bridgegraph.setEdge(bridgeEdgeObj.v, bridgeEdgeObj.w, bridgeMetaedge);
}
bridgeMetaedge.addBaseEdge(baseEdge);
});
}).value();
});
return bridgegraph;
};
HierarchyImpl.prototype.getChildName = function (nodeName, descendantName) {
var currentNode = this.index[descendantName];
while (currentNode) {
if (currentNode.parentNode && currentNode.parentNode.name === nodeName) {
return currentNode.name;
}
currentNode = currentNode.parentNode;
}
throw Error('Could not find immediate child for descendant: ' + descendantName);
};
;
HierarchyImpl.prototype.getPredecessors = function (nodeName) {
var node = this.index[nodeName];
if (!node) {
throw Error('Could not find node with name: ' + nodeName);
}
var predecessors = this.getOneWayEdges(node, true);
if (!node.isGroupNode) {
_.each(node.inEmbeddings, function (embeddedNode) {
predecessors.regular.push(embeddedNode.name);
});
}
return predecessors;
};
HierarchyImpl.prototype.getSuccessors = function (nodeName) {
var node = this.index[nodeName];
if (!node) {
throw Error('Could not find node with name: ' + nodeName);
}
var successors = this.getOneWayEdges(node, false);
if (!node.isGroupNode) {
_.each(node.outEmbeddings, function (embeddedNode) {
successors.regular.push(embeddedNode.name);
});
}
return successors;
};
HierarchyImpl.prototype.getOneWayEdges = function (node, inEdges) {
var edges = {
control: [],
regular: []
};
if (!node.parentNode) {
return edges;
}
if (node.parentNode.isGroupNode) {
var parentNode = node.parentNode;
var metagraph = parentNode.metagraph;
var bridgegraph = this.getBridgegraph(parentNode.name);
findEdgeTargetsInGraph(metagraph, node, inEdges, edges);
findEdgeTargetsInGraph(bridgegraph, node, inEdges, edges);
}
return edges;
};
HierarchyImpl.prototype.getTopologicalOrdering = function (nodeName) {
var node = this.index[nodeName];
if (!node) {
throw Error('Could not find node with name: ' + nodeName);
}
if (!node.isGroupNode) {
return null;
}
if (nodeName in this.orderings) {
return this.orderings[nodeName];
}
var successors = {};
var destinations = {};
var metagraph = node.metagraph;
_.each(metagraph.edges(), function (e) {
if (!metagraph.edge(e).numRegularEdges) {
return;
}
if (!(e.v in successors)) {
successors[e.v] = [];
}
successors[e.v].push(e.w);
destinations[e.w] = true;
});
var queue = _.difference(_.keys(successors), _.keys(destinations));
var ordering = this.orderings[nodeName] = {};
var index = 0;
while (queue.length) {
var childName = queue.shift();
ordering[childName] = index++;
_.each(successors[childName], function (succName) {
return queue.push(succName);
});
delete successors[childName];
}
return ordering;
};
return HierarchyImpl;
}();
function findEdgeTargetsInGraph(graph, node, inbound, targets) {
_.each(graph.edges(), function (e) {
var _a = inbound ? [
e.w,
e.v
] : [
e.v,
e.w
], selfName = _a[0], otherName = _a[1];
if (selfName === node.name) {
if (node.isGroupNode) {
var targetList = graph.edge(e).numRegularEdges ? targets.regular : targets.control;
targetList.push(otherName);
} else {
_.each(graph.edge(e).baseEdgeList, function (baseEdge) {
var targetList = baseEdge.isControlDependency ? targets.control : targets.regular;
targetList.push(inbound ? baseEdge.v : baseEdge.w);
});
}
}
});
}
function build(graph, params, tracker) {
var h = new HierarchyImpl();
var seriesNames = {};
return tf.runAsyncTask('Adding nodes', 20, function () {
var deviceNames = {};
_.each(graph.nodes, function (node, nodeName) {
if (node.device != null) {
deviceNames[node.device] = true;
}
});
h.devices = _.keys(deviceNames);
addNodes(h, graph);
}, tracker).then(function () {
return tf.runAsyncTask('Detect series', 20, function () {
if (params.groupSeries) {
groupSeries(h.root, h, seriesNames);
}
}, tracker);
}).then(function () {
return tf.runAsyncTask('Adding edges', 30, function () {
addEdges(h, graph, seriesNames);
}, tracker);
}).then(function () {
return tf.runAsyncTask('Finding similar subgraphs', 30, function () {
h.templates = graph_1.template.detect(h, params.verifyTemplate);
}, tracker);
}).then(function () {
return h;
}).catch(function (reason) {
throw new Error('Failure creating graph hierarchy');
});
}
hierarchy_1.build = build;
;
function addNodes(h, graph) {
_.each(graph.nodes, function (node, nodeName) {
var path = graph_1.getHierarchicalPath(node.name);
var parent = h.root;
parent.depth = Math.max(path.length, parent.depth);
for (var i = 0; i < path.length; i++) {
parent.depth = Math.max(parent.depth, path.length - i);
parent.cardinality += node.cardinality;
parent.opHistogram[node.op] = (parent.opHistogram[node.op] || 0) + 1;
if (node.stats) {
parent.stats.combine(node.stats);
}
if (node.device != null) {
parent.deviceHistogram[node.device] = (parent.deviceHistogram[node.device] || 0) + 1;
}
if (i === path.length - 1) {
break;
}
var name_1 = path[i];
var child = h.node(name_1);
if (!child) {
child = graph_1.createMetanode(name_1);
child.parentNode = parent;
h.setNode(name_1, child);
parent.metagraph.setNode(name_1, child);
}
parent = child;
}
h.setNode(node.name, node);
node.parentNode = parent;
parent.metagraph.setNode(node.name, node);
_.each(node.inEmbeddings, function (embedding) {
h.setNode(embedding.name, embedding);
embedding.parentNode = node;
});
_.each(node.outEmbeddings, function (embedding) {
h.setNode(embedding.name, embedding);
embedding.parentNode = node;
});
});
}
;
function addEdges(h, graph, seriesNames) {
var nodeIndex = h.getNodeMap();
var sourcePath = [];
var destPath = [];
var getPath = function (node, path) {
var i = 0;
while (node) {
path[i++] = node.name;
node = node.parentNode;
}
return i - 1;
};
_.each(graph.edges, function (baseEdge) {
var sourceAncestorIndex = getPath(graph.nodes[baseEdge.v], sourcePath);
var destAncestorIndex = getPath(graph.nodes[baseEdge.w], destPath);
while (sourcePath[sourceAncestorIndex] === destPath[destAncestorIndex]) {
sourceAncestorIndex--;
destAncestorIndex--;
if (sourceAncestorIndex < 0 || destAncestorIndex < 0) {
throw Error('No difference found between ancestor paths.');
}
}
var sharedAncestorNode = nodeIndex[sourcePath[sourceAncestorIndex + 1]];
var sourceAncestorName = sourcePath[sourceAncestorIndex];
var destAncestorName = destPath[destAncestorIndex];
var metaedge = sharedAncestorNode.metagraph.edge(sourceAncestorName, destAncestorName);
if (!metaedge) {
metaedge = graph_1.createMetaedge(sourceAncestorName, destAncestorName);
sharedAncestorNode.metagraph.setEdge(sourceAncestorName, destAncestorName, metaedge);
}
if (!sharedAncestorNode.hasNonControlEdges && !baseEdge.isControlDependency) {
sharedAncestorNode.hasNonControlEdges = true;
}
metaedge.addBaseEdge(baseEdge);
});
}
;
function groupSeries(metanode, hierarchy, seriesNames) {
var metagraph = metanode.metagraph;
_.each(metagraph.nodes(), function (n) {
var child = metagraph.node(n);
if (child.type === tf.graph.NodeType.META) {
groupSeries(child, hierarchy, seriesNames);
}
});
var clusters = clusterNodes(metagraph);
var seriesDict = detectSeries(clusters, metagraph);
_.each(seriesDict, function (seriesNode, seriesName) {
var nodeMemberNames = seriesNode.metagraph.nodes();
var firstMember = seriesNode.metagraph.node(nodeMemberNames[0]);
var seriesType = firstMember.type;
hierarchy.setNode(seriesName, seriesNode);
metagraph.setNode(seriesName, seriesNode);
_.each(nodeMemberNames, function (n) {
var child = metagraph.node(n);
seriesNode.metagraph.setNode(n, child);
seriesNode.parentNode = child.parentNode;
seriesNode.cardinality++;
if (child.device != null) {
seriesNode.deviceHistogram[child.device] = (seriesNode.deviceHistogram[child.device] || 0) + 1;
}
child.parentNode = seriesNode;
seriesNames[n] = seriesName;
if (child.stats) {
seriesNode.stats.combine(child.stats);
}
metagraph.removeNode(n);
});
});
}
;
function clusterNodes(metagraph) {
var result = {};
return _.reduce(metagraph.nodes(), function (clusters, n) {
var child = metagraph.node(n);
if (child.type === graph_1.NodeType.META) {
return clusters;
}
var template = child.op;
if (template) {
clusters[template] = clusters[template] || [];
clusters[template].push(child.name);
}
return clusters;
}, result);
}
function detectSeries(clusters, metagraph) {
var seriesDict = {};
_.each(clusters, function (members, clusterId) {
if (members.length <= 1) {
return;
}
var candidatesDict = {};
_.each(members, function (name) {
var isGroup = name.charAt(name.length - 1) === '*';
var namepath = name.split('/');
var leaf = namepath[namepath.length - 1];
var parent = namepath.slice(0, namepath.length - 1).join('/');
var matches = leaf.match(/^(\D*)_(\d+)$/);
var prefix;
var id;
var suffix = '';
if (matches) {
prefix = matches[1];
id = matches[2];
} else {
prefix = isGroup ? leaf.substr(0, leaf.length - 1) : leaf;
if (prefix.charAt(prefix.length - 1) !== '_') {
prefix += '_';
}
id = 0;
suffix = isGroup ? '*' : '';
}
var seriesName = graph_1.getSeriesNodeName(prefix, suffix, parent);
candidatesDict[seriesName] = candidatesDict[seriesName] || [];
var seriesNode = graph_1.createSeriesNode(prefix, suffix, parent, +id, name);
candidatesDict[seriesName].push(seriesNode);
});
_.each(candidatesDict, function (seriesInfoArray, seriesName) {
if (seriesInfoArray.length < 2) {
return;
}
seriesInfoArray.sort(function (a, b) {
return +a.clusterId - +b.clusterId;
});
var seriesNodes = [seriesInfoArray[0]];
for (var index = 1; index < seriesInfoArray.length; index++) {
var nextNode = seriesInfoArray[index];
if (nextNode.clusterId === seriesNodes[seriesNodes.length - 1].clusterId + 1) {
seriesNodes.push(nextNode);
continue;
}
addSeriesToDict(seriesNodes, seriesDict, +clusterId, metagraph);
seriesNodes = [nextNode];
}
addSeriesToDict(seriesNodes, seriesDict, +clusterId, metagraph);
});
});
return seriesDict;
}
function addSeriesToDict(seriesNodes, seriesDict, clusterId, metagraph) {
if (seriesNodes.length > 1) {
var curSeriesName = graph_1.getSeriesNodeName(seriesNodes[0].prefix, seriesNodes[0].suffix, seriesNodes[0].parent, seriesNodes[0].clusterId, seriesNodes[seriesNodes.length - 1].clusterId);
var curSeriesNode = graph_1.createSeriesNode(seriesNodes[0].prefix, seriesNodes[0].suffix, seriesNodes[0].parent, clusterId, curSeriesName);
_.each(seriesNodes, function (node) {
curSeriesNode.ids.push(node.clusterId);
curSeriesNode.metagraph.setNode(node.name, metagraph.node(node.name));
});
seriesDict[curSeriesName] = curSeriesNode;
}
}
}(hierarchy = graph_1.hierarchy || (graph_1.hierarchy = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var __extends = this && this.__extends || function (d, b) {
for (var p in b)
if (b.hasOwnProperty(p))
d[p] = b[p];
function __() {
this.constructor = d;
}
__.prototype = b.prototype;
d.prototype = new __();
};
var tf;
(function (tf) {
var graph;
(function (graph_1) {
var render;
(function (render) {
render.MetanodeColors = {
SATURATION: 0.6,
LIGHTNESS: 0.85,
EXPANDED_COLOR: '#f0f0f0',
HUES: [
220,
100,
180,
40,
20,
340,
260,
300,
140,
60
],
STRUCTURE_PALETTE: function (id, lightened) {
var hues = render.MetanodeColors.HUES;
var n = hues.length;
var hue = hues[id % n];
var m = Math.sin(hue * Math.PI / 360);
var sat = lightened ? 30 : 90 - 60 * m;
var light = lightened ? 95 : 80;
return d3.hsl(hue, 0.01 * sat, 0.01 * light).toString();
},
DEVICE_PALETTE: function (index) {
return render.MetanodeColors.STRUCTURE_PALETTE(index);
},
UNKNOWN: '#eee',
GRADIENT_OUTLINE: '#888'
};
var RenderGraphInformation = function () {
function RenderGraphInformation(hierarchy, params) {
this.hierarchy = hierarchy;
this.index = {};
this.deviceColorMap = d3.scale.ordinal().domain(hierarchy.devices).range(_.map(d3.range(hierarchy.devices.length), render.MetanodeColors.DEVICE_PALETTE));
var topLevelGraph = hierarchy.root.metagraph;
var memoryExtent = d3.extent(topLevelGraph.nodes(), function (nodeName, index) {
var node = topLevelGraph.node(nodeName);
if (node.stats != null) {
return node.stats.totalBytes;
}
});
this.memoryUsageScale = d3.scale.linear().domain(memoryExtent).range(params.minMaxColors);
var computeTimeExtent = d3.extent(topLevelGraph.nodes(), function (nodeName, index) {
var node = topLevelGraph.node(nodeName);
if (node.stats != null) {
return node.stats.totalMicros;
}
});
this.computeTimeScale = d3.scale.linear().domain(computeTimeExtent).range(params.minMaxColors);
this.hasSubhierarchy = {};
this.params = params;
this.root = new RenderGroupNodeInformation(hierarchy.root);
this.index[hierarchy.root.name] = this.root;
this.buildSubhierarchy(hierarchy.root.name);
this.root.expanded = true;
}
RenderGraphInformation.prototype.getRenderNodeByName = function (nodeName) {
return this.index[nodeName];
};
RenderGraphInformation.prototype.getNearestVisibleAncestor = function (name) {
var path = graph_1.getHierarchicalPath(name);
for (var i = 0; i < path.length; i++) {
var nodeName = path[i];
if (!this.getRenderNodeByName(nodeName).expanded) {
return nodeName;
}
}
return name;
};
RenderGraphInformation.prototype.setDepth = function (depth) {
setGroupNodeDepth(this.root, +depth);
};
RenderGraphInformation.prototype.buildSubhierarchy = function (nodeName) {
var _this = this;
if (nodeName in this.hasSubhierarchy) {
return;
}
var renderNodeInfo = this.index[nodeName];
if (renderNodeInfo.node.type !== graph_1.NodeType.META && renderNodeInfo.node.type !== graph_1.NodeType.SERIES) {
return;
}
var renderGroupNodeInfo = renderNodeInfo;
var metagraph = renderGroupNodeInfo.node.metagraph;
var coreGraph = renderGroupNodeInfo.coreGraph;
_.each(metagraph.nodes(), function (childName) {
var childNode = metagraph.node(childName);
var childRenderInfo = childNode.isGroupNode ? new RenderGroupNodeInformation(childNode) : new RenderNodeInformation(childNode);
_this.index[childName] = childRenderInfo;
coreGraph.setNode(childName, childRenderInfo);
if (childRenderInfo.node.stats != null) {
childRenderInfo.memoryColor = _this.memoryUsageScale(childRenderInfo.node.stats.totalBytes);
childRenderInfo.computeTimeColor = _this.computeTimeScale(childRenderInfo.node.stats.totalMicros);
}
if (!childNode.isGroupNode) {
_.each(childNode.inEmbeddings, function (embedding) {
var renderMetaedgeInfo = new RenderMetaedgeInformation(null);
addInAnnotation(childRenderInfo, embedding, null, renderMetaedgeInfo, AnnotationType.CONSTANT, _this.params);
_this.index[embedding.name] = new RenderNodeInformation(embedding);
});
_.each(childNode.outEmbeddings, function (embedding) {
var renderMetaedgeInfo = new RenderMetaedgeInformation(null);
addOutAnnotation(childRenderInfo, embedding, null, renderMetaedgeInfo, AnnotationType.SUMMARY, _this.params);
_this.index[embedding.name] = new RenderNodeInformation(embedding);
});
var device = childRenderInfo.node.device;
if (device != null) {
childRenderInfo.deviceColors = [{
color: _this.deviceColorMap(device),
proportion: 1
}];
}
} else {
var pairs = _.pairs(childNode.deviceHistogram);
if (pairs.length > 0) {
var numDevices = _.sum(pairs, _.last);
childRenderInfo.deviceColors = _.map(pairs, function (pair) {
return {
color: _this.deviceColorMap(pair[0]),
proportion: pair[1] / numDevices
};
});
}
}
});
_.each(metagraph.edges(), function (edgeObj) {
var metaedge = metagraph.edge(edgeObj);
var renderMetaedgeInfo = new RenderMetaedgeInformation(metaedge);
coreGraph.setEdge(edgeObj.v, edgeObj.w, renderMetaedgeInfo);
});
if (this.params.enableExtraction && renderGroupNodeInfo.node.type === graph_1.NodeType.META) {
extractHighDegrees(renderGroupNodeInfo, this.params);
}
this.hasSubhierarchy[nodeName] = true;
var parentNode = renderGroupNodeInfo.node.parentNode;
if (!parentNode) {
return;
}
var parentNodeInfo = this.index[parentNode.name];
var getBridgeNodeName = function (inbound) {
var rest = [];
for (var _i = 1; _i < arguments.length; _i++) {
rest[_i - 1] = arguments[_i];
}
return rest.concat([inbound ? 'IN' : 'OUT']).join('~~');
};
var bridgegraph = this.hierarchy.getBridgegraph(nodeName);
var otherCounts = {
in: {},
out: {},
control: {}
};
_.each(bridgegraph.edges(), function (e) {
var inbound = !!metagraph.node(e.w);
var otherName = inbound ? e.v : e.w;
var metaedge = bridgegraph.edge(e);
if (!metaedge.numRegularEdges) {
otherCounts.control[otherName] = (otherCounts.control[otherName] || 0) + 1;
} else if (inbound) {
otherCounts.out[otherName] = (otherCounts.out[otherName] || 0) + 1;
} else {
otherCounts.in[otherName] = (otherCounts.in[otherName] || 0) + 1;
}
});
var hierarchyNodeMap = this.hierarchy.getNodeMap();
_.each(bridgegraph.edges(), function (bridgeEdgeObj) {
var bridgeMetaedge = bridgegraph.edge(bridgeEdgeObj);
var inbound = !!metagraph.node(bridgeEdgeObj.w);
var _a = inbound ? [
bridgeEdgeObj.w,
bridgeEdgeObj.v
] : [
bridgeEdgeObj.v,
bridgeEdgeObj.w
], childName = _a[0], otherName = _a[1];
var childRenderInfo = _this.index[childName];
var otherRenderInfo = _this.index[otherName];
var otherNode = otherRenderInfo ? otherRenderInfo.node : hierarchyNodeMap[otherName];
var isHighDegreeControlEdge = !bridgeMetaedge.numRegularEdges && otherCounts.control[otherName] > _this.params.maxControlDegree;
var _b = inbound ? [
renderNodeInfo.inAnnotations,
childRenderInfo.inAnnotations
] : [
renderNodeInfo.outAnnotations,
childRenderInfo.outAnnotations
], annotations = _b[0], childAnnotations = _b[1];
var isOtherHighDegree = inbound ? otherCounts.out[otherName] > _this.params.maxOutDegree : otherCounts.in[otherName] > _this.params.maxInDegree;
var adjoiningMetaedge = null;
var canDrawBridgePath = false;
if (_this.params.enableBridgegraph && !isOtherHighDegree && !isHighDegreeControlEdge && childRenderInfo.isInCore()) {
var findAdjoiningMetaedge = function (targetName) {
var adjoiningEdgeObj = inbound ? {
v: targetName,
w: nodeName
} : {
v: nodeName,
w: targetName
};
return parentNodeInfo.coreGraph.edge(adjoiningEdgeObj);
};
adjoiningMetaedge = findAdjoiningMetaedge(otherName);
if (!adjoiningMetaedge) {
adjoiningMetaedge = findAdjoiningMetaedge(getBridgeNodeName(inbound, otherName, parentNode.name));
}
canDrawBridgePath = !!adjoiningMetaedge;
}
var backwards = false;
if (adjoiningMetaedge && !bridgeMetaedge.numRegularEdges) {
var topAdjoiningMetaedge = adjoiningMetaedge;
var topGroupNode = parentNodeInfo.node;
while (topAdjoiningMetaedge.adjoiningMetaedge) {
topAdjoiningMetaedge = topAdjoiningMetaedge.adjoiningMetaedge;
topGroupNode = topGroupNode.parentNode;
}
var ordering = _this.hierarchy.getTopologicalOrdering(topGroupNode.name);
var e = topAdjoiningMetaedge.metaedge;
backwards = ordering[e.v] > ordering[e.w];
}
canDrawBridgePath = canDrawBridgePath && !backwards;
if (!canDrawBridgePath) {
childAnnotations.push(new Annotation(otherNode, otherRenderInfo, new RenderMetaedgeInformation(bridgeMetaedge), AnnotationType.SHORTCUT, inbound), _this.params);
return;
}
var bridgeContainerName = getBridgeNodeName(inbound, nodeName);
var bridgeNodeName = getBridgeNodeName(inbound, otherName, nodeName);
var bridgeNodeRenderInfo = coreGraph.node(bridgeNodeName);
if (!bridgeNodeRenderInfo) {
var bridgeContainerInfo = coreGraph.node(bridgeContainerName);
if (!bridgeContainerInfo) {
var bridgeContainerNode = {
name: bridgeContainerName,
type: graph_1.NodeType.BRIDGE,
isGroupNode: false,
cardinality: 0,
parentNode: null,
stats: null,
inbound: inbound
};
bridgeContainerInfo = new RenderNodeInformation(bridgeContainerNode);
_this.index[bridgeContainerName] = bridgeContainerInfo;
coreGraph.setNode(bridgeContainerName, bridgeContainerInfo);
}
var bridgeNode = {
name: bridgeNodeName,
type: graph_1.NodeType.BRIDGE,
isGroupNode: false,
cardinality: 1,
parentNode: null,
stats: null,
inbound: inbound
};
bridgeNodeRenderInfo = new RenderNodeInformation(bridgeNode);
_this.index[bridgeNodeName] = bridgeNodeRenderInfo;
coreGraph.setNode(bridgeNodeName, bridgeNodeRenderInfo);
coreGraph.setParent(bridgeNodeName, bridgeContainerName);
bridgeContainerInfo.node.cardinality++;
}
var bridgeRenderMetaedge = new RenderMetaedgeInformation(bridgeMetaedge);
bridgeRenderMetaedge.adjoiningMetaedge = adjoiningMetaedge;
inbound ? coreGraph.setEdge(bridgeNodeName, childName, bridgeRenderMetaedge) : coreGraph.setEdge(childName, bridgeNodeName, bridgeRenderMetaedge);
});
_.each([
true,
false
], function (inbound) {
var bridgeContainerName = getBridgeNodeName(inbound, nodeName);
var bridgeContainerInfo = coreGraph.node(bridgeContainerName);
if (!bridgeContainerInfo) {
return;
}
_.each(coreGraph.nodes(), function (childName) {
var childNodeInfo = coreGraph.node(childName);
if (childNodeInfo.node.type === graph_1.NodeType.BRIDGE) {
return;
}
var isTerminal = inbound ? !coreGraph.predecessors(childName).length : !coreGraph.successors(childName).length;
if (!isTerminal) {
return;
}
var structuralNodeName = getBridgeNodeName(inbound, nodeName, 'STRUCTURAL_TARGET');
var structuralRenderInfo = coreGraph.node(structuralNodeName);
if (!structuralRenderInfo) {
var bridgeNode = {
name: structuralNodeName,
type: graph_1.NodeType.BRIDGE,
isGroupNode: false,
cardinality: 1,
parentNode: null,
stats: null,
inbound: inbound
};
structuralRenderInfo = new RenderNodeInformation(bridgeNode);
structuralRenderInfo.structural = true;
_this.index[structuralNodeName] = structuralRenderInfo;
coreGraph.setNode(structuralNodeName, structuralRenderInfo);
bridgeContainerInfo.node.cardinality++;
coreGraph.setParent(structuralNodeName, bridgeContainerName);
}
var structuralMetaedgeInfo = new RenderMetaedgeInformation(null);
structuralMetaedgeInfo.structural = true;
structuralMetaedgeInfo.weight--;
inbound ? coreGraph.setEdge(structuralNodeName, childName, structuralMetaedgeInfo) : coreGraph.setEdge(childName, structuralNodeName, structuralMetaedgeInfo);
});
});
};
return RenderGraphInformation;
}();
render.RenderGraphInformation = RenderGraphInformation;
var Annotation = function () {
function Annotation(node, renderNodeInfo, renderMetaedgeInfo, type, isIn) {
this.node = node;
this.renderNodeInfo = renderNodeInfo;
this.renderMetaedgeInfo = renderMetaedgeInfo;
this.annotationType = type;
this.dx = 0;
this.dy = 0;
this.width = 0;
this.height = 0;
this.isIn = isIn;
this.points = [];
}
return Annotation;
}();
render.Annotation = Annotation;
;
(function (AnnotationType) {
AnnotationType[AnnotationType['SHORTCUT'] = 0] = 'SHORTCUT';
AnnotationType[AnnotationType['CONSTANT'] = 1] = 'CONSTANT';
AnnotationType[AnnotationType['SUMMARY'] = 2] = 'SUMMARY';
AnnotationType[AnnotationType['ELLIPSIS'] = 3] = 'ELLIPSIS';
}(render.AnnotationType || (render.AnnotationType = {})));
var AnnotationType = render.AnnotationType;
;
var AnnotationList = function () {
function AnnotationList() {
this.list = [];
this.nodeNames = {};
}
AnnotationList.prototype.push = function (annotation, params) {
if (annotation.node.name in this.nodeNames) {
return;
}
this.nodeNames[annotation.node.name] = true;
if (this.list.length < params.maxAnnotations) {
this.list.push(annotation);
return;
}
var lastAnnotation = this.list[this.list.length - 1];
if (lastAnnotation.annotationType === AnnotationType.ELLIPSIS) {
var ellipsisNode_1 = lastAnnotation.node;
ellipsisNode_1.setNumMoreNodes(++ellipsisNode_1.numMoreNodes);
return;
}
var ellipsisNode = new tf.graph.EllipsisNodeImpl(1);
this.list.push(new Annotation(ellipsisNode, new RenderNodeInformation(ellipsisNode), null, AnnotationType.ELLIPSIS, annotation.isIn));
};
return AnnotationList;
}();
render.AnnotationList = AnnotationList;
var RenderNodeInformation = function () {
function RenderNodeInformation(node) {
this.node = node;
this.expanded = false;
this.inAnnotations = new AnnotationList();
this.outAnnotations = new AnnotationList();
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.inboxWidth = 0;
this.outboxWidth = 0;
this.excluded = false;
this.structural = false;
this.labelOffset = 0;
this.extractXOffset = 0;
this.radius = 0;
this.labelHeight = 0;
this.paddingTop = 0;
this.paddingLeft = 0;
this.paddingRight = 0;
this.paddingBottom = 0;
this.outerWidth = 0;
this.outerHeight = 0;
this.isInExtract = false;
this.isOutExtract = false;
}
RenderNodeInformation.prototype.isInCore = function () {
return !this.isInExtract && !this.isOutExtract;
};
return RenderNodeInformation;
}();
render.RenderNodeInformation = RenderNodeInformation;
var RenderMetaedgeInformation = function () {
function RenderMetaedgeInformation(metaedge) {
this.metaedge = metaedge;
this.adjoiningMetaedge = null;
this.structural = false;
this.weight = 1;
}
return RenderMetaedgeInformation;
}();
render.RenderMetaedgeInformation = RenderMetaedgeInformation;
function addInAnnotation(node, predecessor, predecessorRenderInfo, edge, type, params) {
var annotation = new Annotation(predecessor, predecessorRenderInfo, edge, type, true);
node.inAnnotations.push(annotation, params);
}
function addOutAnnotation(node, successor, successorRenderInfo, edge, type, params) {
var annotation = new Annotation(successor, successorRenderInfo, edge, type, false);
node.outAnnotations.push(annotation, params);
}
function setGraphDepth(graph, depth) {
_.each(graph.nodes(), function (nodeName) {
var child = graph.node(nodeName);
child.expanded = depth > 1;
if (depth > 0) {
switch (child.node.type) {
case graph_1.NodeType.META:
case graph_1.NodeType.SERIES:
setGroupNodeDepth(child, depth - 1);
break;
}
}
});
}
;
var RenderGroupNodeInformation = function (_super) {
__extends(RenderGroupNodeInformation, _super);
function RenderGroupNodeInformation(groupNode) {
_super.call(this, groupNode);
var metagraph = groupNode.metagraph;
var gl = metagraph.graph();
this.coreGraph = graph_1.createGraph(gl.name, graph_1.GraphType.CORE, { compound: true });
this.coreBox = {
width: 0,
height: 0
};
this.inExtractBox = {
width: 0,
height: 0
};
this.outExtractBox = {
width: 0,
height: 0
};
this.isolatedInExtract = [];
this.isolatedOutExtract = [];
}
return RenderGroupNodeInformation;
}(RenderNodeInformation);
render.RenderGroupNodeInformation = RenderGroupNodeInformation;
function setGroupNodeDepth(renderInfo, depth) {
if (renderInfo.coreGraph) {
setGraphDepth(renderInfo.coreGraph, depth);
}
}
function createShortcut(graph, v, w, params) {
var src = graph.node(v);
var sink = graph.node(w);
var edge = graph.edge(v, w);
addOutAnnotation(src, sink.node, sink, edge, AnnotationType.SHORTCUT, params);
addInAnnotation(sink, src.node, src, edge, AnnotationType.SHORTCUT, params);
graph.removeEdge(v, w);
}
function makeOutExtract(renderNode, n, params) {
var graph = renderNode.coreGraph;
graph.node(n).isOutExtract = true;
_.each(graph.predecessors(n), function (p, index) {
createShortcut(graph, p, n, params);
});
if (params.detachAllEdgesForHighDegree) {
_.each(graph.successors(n), function (s, index) {
createShortcut(graph, n, s, params);
});
}
if (params.detachAllEdgesForHighDegree || graph.neighbors(n).length === 0) {
renderNode.isolatedOutExtract.push(graph.node(n));
graph.removeNode(n);
}
}
function makeInExtract(renderNode, n, params) {
var graph = renderNode.coreGraph;
graph.node(n).isInExtract = true;
_.each(graph.successors(n), function (s, index) {
createShortcut(graph, n, s, params);
});
if (params.detachAllEdgesForHighDegree) {
_.each(graph.predecessors(n), function (p, index) {
createShortcut(graph, p, n, params);
});
}
if (params.detachAllEdgesForHighDegree || graph.neighbors(n).length === 0) {
renderNode.isolatedInExtract.push(graph.node(n));
graph.removeNode(n);
}
}
function hasTypeIn(node, types) {
if (node.type === graph_1.NodeType.OP) {
for (var i = 0; i < types.length; i++) {
if (node.op === types[i]) {
return true;
}
}
} else if (node.type === graph_1.NodeType.META) {
var rootOpNode = node.getRootOp();
if (rootOpNode) {
for (var i = 0; i < types.length; i++) {
if (rootOpNode.op === types[i]) {
return true;
}
}
}
}
return false;
}
function extractPredefinedSink(renderNode, params) {
var graph = renderNode.coreGraph;
_.each(graph.nodes(), function (n) {
var renderInfo = graph.node(n);
if (hasTypeIn(renderInfo.node, params.outExtractTypes)) {
makeOutExtract(renderNode, n, params);
}
});
}
function extractPredefinedSource(renderNode, params) {
var graph = renderNode.coreGraph;
_.each(graph.nodes(), function (n) {
var renderInfo = graph.node(n);
if (hasTypeIn(renderInfo.node, params.inExtractTypes)) {
makeInExtract(renderNode, n, params);
}
});
}
function extractHighInDegree(renderNode, params) {
var graph = renderNode.coreGraph;
var maxInDegree = params.maxInDegree;
var highInDegreeNames = _.filter(graph.nodes(), function (n) {
var numEdgesToCount = _.reduce(graph.predecessors(n), function (numEdgesToCount, pred) {
var metaedge = graph.edge(pred, n).metaedge;
return numEdgesToCount + (metaedge.numRegularEdges ? 1 : 0);
}, 0);
if (numEdgesToCount === 0 && graph.predecessors(n).length > 0) {
numEdgesToCount = graph.predecessors(n).length;
}
return numEdgesToCount > maxInDegree;
});
_.each(highInDegreeNames, function (n) {
makeOutExtract(renderNode, n, params);
});
}
function extractHighOutDegree(renderNode, params) {
var graph = renderNode.coreGraph;
var maxOutDegree = params.maxOutDegree;
var highOutDegreeNames = _.filter(graph.nodes(), function (n) {
var numEdgesToCount = _.reduce(graph.successors(n), function (numEdgesToCount, succ) {
var metaedge = graph.edge(n, succ).metaedge;
return numEdgesToCount + (metaedge.numRegularEdges ? 1 : 0);
}, 0);
if (numEdgesToCount === 0 && graph.successors(n).length > 0) {
numEdgesToCount = graph.successors(n).length;
}
return numEdgesToCount > maxOutDegree;
});
_.each(highOutDegreeNames, function (n) {
makeInExtract(renderNode, n, params);
});
}
function removeControlEdges(renderNode, params) {
var graph = renderNode.coreGraph;
var map = {};
_.each(graph.edges(), function (e) {
if (!graph.edge(e).metaedge.numRegularEdges) {
(map[e.v] = map[e.v] || []).push(e);
(map[e.w] = map[e.w] || []).push(e);
}
});
_.each(map, function (edges, nodeName) {
if (edges.length > params.maxControlDegree) {
_.each(edges, function (e) {
return createShortcut(graph, e.v, e.w, params);
});
}
});
}
function mapIndexToHue(id) {
var GOLDEN_RATIO = 1.61803398875;
var MIN_HUE = 1;
var MAX_HUE = 359;
var COLOR_RANGE = MAX_HUE - MIN_HUE;
return MIN_HUE + COLOR_RANGE * GOLDEN_RATIO * id % COLOR_RANGE;
}
render.mapIndexToHue = mapIndexToHue;
;
function extractHighDegrees(renderNode, params) {
if (params.outExtractTypes) {
extractPredefinedSink(renderNode, params);
}
if (params.inExtractTypes) {
extractPredefinedSource(renderNode, params);
}
if (params.maxInDegree) {
extractHighInDegree(renderNode, params);
}
if (params.maxOutDegree) {
extractHighOutDegree(renderNode, params);
}
if (params.maxControlDegree) {
removeControlEdges(renderNode, params);
}
var graph = renderNode.coreGraph;
_.each(graph.nodes(), function (n) {
var child = graph.node(n);
var degree = graph.neighbors(n).length;
if (degree === 0) {
var hasOutAnnotations = child.outAnnotations.list.length > 0;
var hasInAnnotations = child.inAnnotations.list.length > 0;
if (child.isInExtract) {
renderNode.isolatedInExtract.push(child);
graph.removeNode(n);
} else if (child.isOutExtract) {
renderNode.isolatedOutExtract.push(child);
graph.removeNode(n);
} else if (params.extractIsolatedNodesWithAnnotationsOnOneSide) {
if (hasOutAnnotations && !hasInAnnotations) {
child.isInExtract = true;
renderNode.isolatedInExtract.push(child);
graph.removeNode(n);
} else if (hasInAnnotations && !hasOutAnnotations) {
child.isOutExtract = true;
renderNode.isolatedOutExtract.push(child);
graph.removeNode(n);
} else {
}
}
}
});
}
}(render = graph_1.render || (graph_1.render = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph_1) {
var template;
(function (template) {
function detect(h, verifyTemplate) {
var nnGroups = clusterSimilarSubgraphs(h);
var templates = groupTemplateAndAssignId(nnGroups, verifyTemplate);
return _(templates).pairs().sortBy(function (pair) {
return pair[1].level;
}).map(function (pair) {
return [
pair[0],
pair[1].nodes
];
}).object().value();
}
template.detect = detect;
;
function getSignature(metanode) {
var props = _.map({
'depth': metanode.depth,
'|V|': metanode.metagraph.nodes().length,
'|E|': metanode.metagraph.edges().length
}, function (v, k) {
return k + '=' + v;
}).join(' ');
var ops = _.map(metanode.opHistogram, function (count, op) {
return op + '=' + count;
}).join(',');
return props + ' [ops] ' + ops;
}
function clusterSimilarSubgraphs(h) {
var hashDict = _(h.getNodeMap()).reduce(function (hash, node, name) {
if (node.type !== graph_1.NodeType.META) {
return hash;
}
var levelOfMetaNode = name.split('/').length - 1;
var signature = getSignature(node);
var templateInfo = hash[signature] || {
nodes: [],
level: levelOfMetaNode
};
hash[signature] = templateInfo;
templateInfo.nodes.push(node);
if (templateInfo.level > levelOfMetaNode) {
templateInfo.level = levelOfMetaNode;
}
return hash;
}, {});
return _(hashDict).pairs().filter(function (pair) {
return pair[1].nodes.length > 1;
}).sortBy(function (pair) {
return pair[1].nodes[0].depth;
}).value();
}
function groupTemplateAndAssignId(nnGroups, verifyTemplate) {
return _.reduce(nnGroups, function (templates, nnGroupPair) {
var signature = nnGroupPair[0], nnGroup = nnGroupPair[1].nodes, clusters = [];
nnGroup.forEach(function (metanode) {
for (var i = 0; i < clusters.length; i++) {
var similar = !verifyTemplate || isSimilarSubgraph(clusters[i].metanode.metagraph, metanode.metagraph);
if (similar) {
metanode.templateId = clusters[i].metanode.templateId;
clusters[i].members.push(metanode.name);
return;
}
}
metanode.templateId = signature + '[' + clusters.length + ']';
clusters.push({
metanode: metanode,
members: [metanode.name]
});
});
clusters.forEach(function (c) {
templates[c.metanode.templateId] = {
level: nnGroupPair[1].level,
nodes: c.members
};
});
return templates;
}, {});
}
function sortNodes(names, graph, prefix) {
return _.sortByAll(names, function (name) {
var node = graph.node(name);
return node.op;
}, function (name) {
var node = graph.node(name);
return node.templateId;
}, function (name) {
return graph.neighbors(name).length;
}, function (name) {
return graph.predecessors(name).length;
}, function (name) {
return graph.successors(name).length;
}, function (name) {
return name.substr(prefix.length);
});
}
function isSimilarSubgraph(g1, g2) {
if (!tf.graph.hasSimilarDegreeSequence(g1, g2)) {
return false;
}
var g1prefix = g1.graph().name;
var g2prefix = g2.graph().name;
var visited1 = {};
var visited2 = {};
var stack = [];
function stackPushIfNotDifferent(n1, n2) {
var sub1 = n1.substr(g1prefix.length), sub2 = n2.substr(g2prefix.length);
if (visited1[sub1] ^ visited2[sub1]) {
console.warn('different visit pattern', '[' + g1prefix + ']', sub1, '[' + g2prefix + ']', sub2);
return true;
}
if (!visited1[sub1]) {
visited1[sub1] = visited2[sub2] = true;
stack.push({
n1: n1,
n2: n2
});
}
return false;
}
var sources1 = g1.sources();
var sources2 = g2.sources();
if (sources1.length !== sources2.length) {
console.log('different source length');
return false;
}
sources1 = sortNodes(sources1, g1, g1prefix);
sources2 = sortNodes(sources2, g2, g2prefix);
for (var i = 0; i < sources1.length; i++) {
var different = stackPushIfNotDifferent(sources1[i], sources2[i]);
if (different) {
return false;
}
}
while (stack.length > 0) {
var cur = stack.pop();
var similar = isSimilarNode(g1.node(cur.n1), g2.node(cur.n2));
if (!similar) {
return false;
}
var succ1 = g1.successors(cur.n1), succ2 = g2.successors(cur.n2);
if (succ1.length !== succ2.length) {
console.log('# of successors mismatch', succ1, succ2);
return false;
}
succ1 = sortNodes(succ1, g1, g1prefix);
succ2 = sortNodes(succ2, g2, g2prefix);
for (var j = 0; j < succ1.length; j++) {
var different = stackPushIfNotDifferent(succ1[j], succ2[j]);
if (different) {
return false;
}
}
}
return true;
}
function isSimilarNode(n1, n2) {
if (n1.type === graph_1.NodeType.META) {
var metanode1 = n1;
var metanode2 = n2;
return metanode1.templateId && metanode2.templateId && metanode1.templateId === metanode2.templateId;
} else if (n1.type === graph_1.NodeType.OP && n2.type === graph_1.NodeType.OP) {
return n1.op === n2.op;
} else if (n1.type === graph_1.NodeType.SERIES && n2.type === graph_1.NodeType.SERIES) {
var seriesnode1 = n1;
var seriesnode2 = n2;
var seriesnode1Count = seriesnode1.metagraph.nodeCount();
return seriesnode1Count === seriesnode2.metagraph.nodeCount() && (seriesnode1Count === 0 || seriesnode1.metagraph.node(seriesnode1.metagraph.nodes()[0]).op === seriesnode2.metagraph.node(seriesnode2.metagraph.nodes()[0]).op);
}
return false;
}
}(template = graph_1.template || (graph_1.template = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph) {
var scene;
(function (scene) {
scene.Class = {
Node: {
CONTAINER: 'nodes',
GROUP: 'node',
SHAPE: 'nodeshape',
COLOR_TARGET: 'nodecolortarget',
LABEL: 'nodelabel',
BUTTON_CONTAINER: 'buttoncontainer',
BUTTON_CIRCLE: 'buttoncircle',
EXPAND_BUTTON: 'expandbutton',
COLLAPSE_BUTTON: 'collapsebutton'
},
Edge: {
CONTAINER: 'edges',
GROUP: 'edge',
LINE: 'edgeline',
REF_LINE: 'refline',
STRUCTURAL: 'structural'
},
Annotation: {
OUTBOX: 'out-annotations',
INBOX: 'in-annotations',
GROUP: 'annotation',
NODE: 'annotation-node',
EDGE: 'annotation-edge',
CONTROL_EDGE: 'annotation-control-edge',
LABEL: 'annotation-label',
ELLIPSIS: 'annotation-ellipsis'
},
Scene: {
GROUP: 'scene',
CORE: 'core',
INEXTRACT: 'in-extract',
OUTEXTRACT: 'out-extract'
},
Subscene: { GROUP: 'subscene' },
OPNODE: 'op',
METANODE: 'meta',
SERIESNODE: 'series',
BRIDGENODE: 'bridge',
ELLIPSISNODE: 'ellipsis'
};
function fit(svg, zoomG, d3zoom, callback) {
var svgRect = svg.getBoundingClientRect();
var sceneSize = zoomG.getBBox();
var scale = 0.9 * Math.min(svgRect.width / sceneSize.width, svgRect.height / sceneSize.height, 2);
var params = graph.layout.PARAMS.graph;
var zoomEvent = d3zoom.scale(scale).on('zoomend.fitted', function () {
d3zoom.on('zoomend.fitted', null);
callback();
}).translate([
params.padding.paddingLeft,
params.padding.paddingTop
]).event;
d3.select(zoomG).transition().duration(500).call(zoomEvent);
}
scene.fit = fit;
;
function panToNode(nodeName, svg, zoomG, d3zoom) {
var node = d3.selectAll('[data-name=\'' + nodeName + '\'].' + scene.Class.Node.GROUP)[0][0];
if (!node) {
return false;
}
var translate = d3zoom.translate();
var nodeBox = node.getBBox();
var nodeCtm = node.getScreenCTM();
var pointTL = svg.createSVGPoint();
var pointBR = svg.createSVGPoint();
pointTL.x = nodeBox.x;
pointTL.y = nodeBox.y;
pointBR.x = nodeBox.x + nodeBox.width;
pointBR.y = nodeBox.y + nodeBox.height;
pointTL = pointTL.matrixTransform(nodeCtm);
pointBR = pointBR.matrixTransform(nodeCtm);
var isOutsideOfBounds = function (start, end, bound) {
return end < 0 || start > bound;
};
var svgRect = svg.getBoundingClientRect();
if (isOutsideOfBounds(pointTL.x, pointBR.x, svgRect.width) || isOutsideOfBounds(pointTL.y, pointBR.y, svgRect.height)) {
var centerX = (pointTL.x + pointBR.x) / 2;
var centerY = (pointTL.y + pointBR.y) / 2;
var dx = svgRect.width / 2 - centerX;
var dy = svgRect.height / 2 - centerY;
var zoomEvent = d3zoom.translate([
translate[0] + dx,
translate[1] + dy
]).event;
d3.select(zoomG).transition().duration(500).call(zoomEvent);
return true;
}
return false;
}
scene.panToNode = panToNode;
;
function selectOrCreateChild(container, tagName, className, before) {
var child = selectChild(container, tagName, className);
if (!child.empty()) {
return child;
}
var newElement = document.createElementNS('http://www.w3.org/2000/svg', tagName);
if (className) {
newElement.classList.add(className);
}
if (before) {
container.node().insertBefore(newElement, before);
} else {
container.node().appendChild(newElement);
}
return d3.select(newElement).datum(container.datum());
}
scene.selectOrCreateChild = selectOrCreateChild;
;
function selectChild(container, tagName, className) {
var children = container.node().childNodes;
for (var i = 0; i < children.length; i++) {
var child = children[i];
if (child.tagName === tagName && (!className || child.classList.contains(className))) {
return d3.select(child);
}
}
return d3.select(null);
}
scene.selectChild = selectChild;
;
function buildGroup(container, renderNode, sceneBehavior, sceneClass) {
sceneClass = sceneClass || scene.Class.Scene.GROUP;
var isNewSceneGroup = selectChild(container, 'g', sceneClass).empty();
var sceneGroup = selectOrCreateChild(container, 'g', sceneClass);
var coreGroup = selectOrCreateChild(sceneGroup, 'g', scene.Class.Scene.CORE);
var coreNodes = _.reduce(renderNode.coreGraph.nodes(), function (nodes, name) {
var node = renderNode.coreGraph.node(name);
if (!node.excluded) {
nodes.push(node);
}
return nodes;
}, []);
if (renderNode.node.type === graph.NodeType.SERIES) {
coreNodes.reverse();
}
scene.edge.buildGroup(coreGroup, renderNode.coreGraph, sceneBehavior);
scene.node.buildGroup(coreGroup, coreNodes, sceneBehavior);
if (renderNode.isolatedInExtract.length > 0) {
var inExtractGroup = selectOrCreateChild(sceneGroup, 'g', scene.Class.Scene.INEXTRACT);
scene.node.buildGroup(inExtractGroup, renderNode.isolatedInExtract, sceneBehavior);
} else {
selectChild(sceneGroup, 'g', scene.Class.Scene.INEXTRACT).remove();
}
if (renderNode.isolatedOutExtract.length > 0) {
var outExtractGroup = selectOrCreateChild(sceneGroup, 'g', scene.Class.Scene.OUTEXTRACT);
scene.node.buildGroup(outExtractGroup, renderNode.isolatedOutExtract, sceneBehavior);
} else {
selectChild(sceneGroup, 'g', scene.Class.Scene.OUTEXTRACT).remove();
}
position(sceneGroup, renderNode);
if (isNewSceneGroup) {
sceneGroup.attr('opacity', 0).transition().attr('opacity', 1);
}
return sceneGroup;
}
scene.buildGroup = buildGroup;
;
function position(sceneGroup, renderNode) {
var yTranslate = renderNode.node.type === graph.NodeType.SERIES ? 0 : graph.layout.PARAMS.subscene.meta.labelHeight;
translate(selectChild(sceneGroup, 'g', scene.Class.Scene.CORE), 0, yTranslate);
var inExtractX = renderNode.coreBox.width === 0 ? 0 : renderNode.coreBox.width;
var hasInExtract = renderNode.isolatedInExtract.length > 0;
if (hasInExtract) {
translate(selectChild(sceneGroup, 'g', scene.Class.Scene.INEXTRACT), inExtractX, yTranslate);
}
var hasOutExtract = renderNode.isolatedOutExtract.length > 0;
if (hasOutExtract) {
var outExtractX = inExtractX + renderNode.inExtractBox.width + renderNode.extractXOffset;
translate(selectChild(sceneGroup, 'g', scene.Class.Scene.OUTEXTRACT), outExtractX, yTranslate);
}
}
;
function addGraphClickListener(graphGroup, sceneBehavior) {
d3.select(graphGroup).on('click', function () {
sceneBehavior.fire('graph-select');
});
}
scene.addGraphClickListener = addGraphClickListener;
;
function translate(selection, x0, y0) {
selection.attr('transform', 'translate(' + x0 + ',' + y0 + ')');
}
scene.translate = translate;
;
function positionRect(rect, cx, cy, width, height) {
rect.transition().attr({
x: cx - width / 2,
y: cy - height / 2,
width: width,
height: height
});
}
scene.positionRect = positionRect;
;
function positionButton(button, renderNode) {
var x = renderNode.x + renderNode.width / 2 - 6;
var y = renderNode.y - renderNode.height / 2 + 6;
if (renderNode.node.type === graph.NodeType.SERIES && !renderNode.expanded) {
x += 10;
y -= 2;
}
var translateStr = 'translate(' + x + ',' + y + ')';
button.selectAll('path').transition().attr('transform', translateStr);
button.select('circle').transition().attr({
cx: x,
cy: y,
r: graph.layout.PARAMS.nodeSize.meta.expandButtonRadius
});
}
scene.positionButton = positionButton;
;
function positionEllipse(ellipse, cx, cy, width, height) {
ellipse.transition().attr({
cx: cx,
cy: cy,
rx: width / 2,
ry: height / 2
});
}
scene.positionEllipse = positionEllipse;
;
}(scene = graph.scene || (graph.scene = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph) {
var scene;
(function (scene) {
var annotation;
(function (annotation) {
function buildGroup(container, annotationData, d, sceneBehavior) {
var annotationGroups = container.selectAll(function () {
return this.childNodes;
}).data(annotationData.list, function (d) {
return d.node.name;
});
annotationGroups.enter().append('g').attr('data-name', function (a) {
return a.node.name;
}).each(function (a) {
var aGroup = d3.select(this);
sceneBehavior.addAnnotationGroup(a, d, aGroup);
var edgeType = scene.Class.Annotation.EDGE;
var metaedge = a.renderMetaedgeInfo && a.renderMetaedgeInfo.metaedge;
if (metaedge && !metaedge.numRegularEdges) {
edgeType += ' ' + scene.Class.Annotation.CONTROL_EDGE;
}
if (metaedge && metaedge.numRefEdges) {
edgeType += ' ' + scene.Class.Edge.REF_LINE;
}
scene.edge.appendEdge(aGroup, a, sceneBehavior, edgeType);
if (a.annotationType !== tf.graph.render.AnnotationType.ELLIPSIS) {
addAnnotationLabelFromNode(aGroup, a);
buildShape(aGroup, a, sceneBehavior);
} else {
addAnnotationLabel(aGroup, a.node.name, a, scene.Class.Annotation.ELLIPSIS);
}
});
annotationGroups.attr('class', function (a) {
return scene.Class.Annotation.GROUP + ' ' + annotationToClassName(a.annotationType) + ' ' + scene.node.nodeClass(a);
}).each(function (a) {
var aGroup = d3.select(this);
update(aGroup, d, a, sceneBehavior);
if (a.annotationType !== tf.graph.render.AnnotationType.ELLIPSIS) {
addInteraction(aGroup, d, sceneBehavior);
}
});
annotationGroups.exit().each(function (a) {
var aGroup = d3.select(this);
sceneBehavior.removeAnnotationGroup(a, d, aGroup);
}).remove();
return annotationGroups;
}
annotation.buildGroup = buildGroup;
;
function annotationToClassName(annotationType) {
return (tf.graph.render.AnnotationType[annotationType] || '').toLowerCase() || null;
}
function buildShape(aGroup, a, sceneBehavior) {
if (a.annotationType === tf.graph.render.AnnotationType.SUMMARY) {
var image = scene.selectOrCreateChild(aGroup, 'image');
image.attr({
'xlink:href': '../../../static/tb/summary-icon.svg',
'height': '12px',
'width': '12px',
'cursor': 'pointer'
});
} else {
var shape = scene.node.buildShape(aGroup, a, scene.Class.Annotation.NODE);
scene.selectOrCreateChild(shape, 'title').text(a.node.name);
}
}
function addAnnotationLabelFromNode(aGroup, a) {
var namePath = a.node.name.split('/');
var text = namePath[namePath.length - 1];
var shortenedText = text.length > 8 ? text.substring(0, 8) + '...' : text;
return addAnnotationLabel(aGroup, shortenedText, a, null, text);
}
function addAnnotationLabel(aGroup, label, a, additionalClassNames, fullLabel) {
var classNames = scene.Class.Annotation.LABEL;
if (additionalClassNames) {
classNames += ' ' + additionalClassNames;
}
var titleText = fullLabel ? fullLabel : label;
return aGroup.append('text').attr('class', classNames).attr('dy', '.35em').attr('text-anchor', a.isIn ? 'end' : 'start').text(label).append('title').text(titleText);
}
function addInteraction(selection, d, sceneBehavior) {
selection.on('mouseover', function (a) {
sceneBehavior.fire('annotation-highlight', {
name: a.node.name,
hostName: d.node.name
});
}).on('mouseout', function (a) {
sceneBehavior.fire('annotation-unhighlight', {
name: a.node.name,
hostName: d.node.name
});
}).on('click', function (a) {
d3.event.stopPropagation();
sceneBehavior.fire('annotation-select', {
name: a.node.name,
hostName: d.node.name
});
});
}
;
function update(aGroup, d, a, sceneBehavior) {
if (a.renderNodeInfo && a.annotationType !== tf.graph.render.AnnotationType.ELLIPSIS) {
scene.node.stylize(aGroup, a.renderNodeInfo, sceneBehavior, scene.Class.Annotation.NODE);
}
if (a.annotationType === tf.graph.render.AnnotationType.SUMMARY) {
a.width += 10;
}
aGroup.select('text.' + scene.Class.Annotation.LABEL).transition().attr({
x: d.x + a.dx + (a.isIn ? -1 : 1) * (a.width / 2 + a.labelOffset),
y: d.y + a.dy
});
aGroup.select('image').transition().attr({
x: d.x + a.dx - 3,
y: d.y + a.dy - 6
});
scene.positionEllipse(aGroup.select('.' + scene.Class.Annotation.NODE + ' ellipse'), d.x + a.dx, d.y + a.dy, a.width, a.height);
scene.positionRect(aGroup.select('.' + scene.Class.Annotation.NODE + ' rect'), d.x + a.dx, d.y + a.dy, a.width, a.height);
scene.positionRect(aGroup.select('.' + scene.Class.Annotation.NODE + ' use'), d.x + a.dx, d.y + a.dy, a.width, a.height);
aGroup.select('path.' + scene.Class.Annotation.EDGE).transition().attr('d', function (a) {
var points = a.points.map(function (p) {
return {
x: p.dx + d.x,
y: p.dy + d.y
};
});
return scene.edge.interpolate(points);
});
}
;
}(annotation = scene.annotation || (scene.annotation = {})));
}(scene = graph.scene || (graph.scene = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph_1) {
var scene;
(function (scene) {
var edge;
(function (edge) {
var Scene = tf.graph.scene;
function getEdgeKey(edgeObj) {
return edgeObj.v + tf.graph.EDGE_KEY_DELIM + edgeObj.w;
}
edge.getEdgeKey = getEdgeKey;
function buildGroup(sceneGroup, graph, sceneBehavior) {
var edgeData = _.reduce(graph.edges(), function (edges, edgeObj) {
var edgeLabel = graph.edge(edgeObj);
edges.push({
v: edgeObj.v,
w: edgeObj.w,
label: edgeLabel
});
return edges;
}, []);
var container = scene.selectOrCreateChild(sceneGroup, 'g', scene.Class.Edge.CONTAINER);
var containerNode = container.node();
var edgeGroups = container.selectAll(function () {
return this.childNodes;
}).data(edgeData, getEdgeKey);
edgeGroups.enter().append('g').attr('class', scene.Class.Edge.GROUP).attr('data-edge', getEdgeKey).each(function (d) {
var edgeGroup = d3.select(this);
d.label.edgeGroup = edgeGroup;
sceneBehavior._edgeGroupIndex[getEdgeKey(d)] = edgeGroup;
var extraEdgeClass = d.label.metaedge && d.label.metaedge.numRefEdges ? scene.Class.Edge.REF_LINE + ' ' + scene.Class.Edge.LINE : undefined;
appendEdge(edgeGroup, d, scene, extraEdgeClass);
});
edgeGroups.each(position);
edgeGroups.each(function (d) {
stylize(d3.select(this), d, sceneBehavior);
});
edgeGroups.exit().each(function (d) {
delete sceneBehavior._edgeGroupIndex[getEdgeKey(d)];
}).remove();
return edgeGroups;
}
edge.buildGroup = buildGroup;
;
function appendEdge(edgeGroup, d, sceneBehavior, edgeClass) {
edgeClass = edgeClass || scene.Class.Edge.LINE;
if (d.label && d.label.structural) {
edgeClass += ' ' + scene.Class.Edge.STRUCTURAL;
}
edgeGroup.append('path').attr('class', edgeClass);
}
edge.appendEdge = appendEdge;
;
function getEdgePathInterpolator(d, i, a) {
var renderMetaedgeInfo = d.label;
var adjoiningMetaedge = renderMetaedgeInfo.adjoiningMetaedge;
if (!adjoiningMetaedge) {
return d3.interpolate(a, edge.interpolate(renderMetaedgeInfo.points));
}
var renderPath = this;
var adjoiningPath = adjoiningMetaedge.edgeGroup.node().firstChild;
var inbound = renderMetaedgeInfo.metaedge.inbound;
return function (t) {
var adjoiningPoint = adjoiningPath.getPointAtLength(inbound ? adjoiningPath.getTotalLength() : 0).matrixTransform(adjoiningPath.getCTM()).matrixTransform(renderPath.getCTM().inverse());
var points = renderMetaedgeInfo.points;
var index = inbound ? 0 : points.length - 1;
points[index].x = adjoiningPoint.x;
points[index].y = adjoiningPoint.y;
var dPath = edge.interpolate(points);
return dPath;
};
}
edge.interpolate = d3.svg.line().interpolate('basis').x(function (d) {
return d.x;
}).y(function (d) {
return d.y;
});
function position(d) {
d3.select(this).select('path.' + scene.Class.Edge.LINE).each(function (d) {
var path = d3.select(this);
path.transition().attrTween('d', getEdgePathInterpolator);
});
}
;
function stylize(edgeGroup, d, stylize) {
var a;
var metaedge = d.label.metaedge;
edgeGroup.select('path.' + scene.Class.Edge.LINE).classed('control-dep', metaedge && !metaedge.numRegularEdges);
}
;
}(edge = scene.edge || (scene.edge = {})));
}(scene = graph_1.scene || (graph_1.scene = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph) {
var scene;
(function (scene) {
var node;
(function (node_1) {
function buildGroup(sceneGroup, nodeData, sceneBehavior) {
var container = scene.selectOrCreateChild(sceneGroup, 'g', scene.Class.Node.CONTAINER);
var nodeGroups = container.selectAll(function () {
return this.childNodes;
}).data(nodeData, function (d) {
return d.node.name + ':' + d.node.type;
});
nodeGroups.enter().append('g').attr('data-name', function (d) {
return d.node.name;
}).each(function (d) {
var nodeGroup = d3.select(this);
sceneBehavior.addNodeGroup(d.node.name, nodeGroup);
});
nodeGroups.attr('class', function (d) {
return scene.Class.Node.GROUP + ' ' + nodeClass(d);
}).each(function (d) {
var nodeGroup = d3.select(this);
var inAnnotationBox = scene.selectOrCreateChild(nodeGroup, 'g', scene.Class.Annotation.INBOX);
scene.annotation.buildGroup(inAnnotationBox, d.inAnnotations, d, sceneBehavior);
var outAnnotationBox = scene.selectOrCreateChild(nodeGroup, 'g', scene.Class.Annotation.OUTBOX);
scene.annotation.buildGroup(outAnnotationBox, d.outAnnotations, d, sceneBehavior);
var label = labelBuild(nodeGroup, d, sceneBehavior);
addInteraction(label, d, sceneBehavior, d.node.type === graph.NodeType.META);
var shape = buildShape(nodeGroup, d, scene.Class.Node.SHAPE, label.node());
if (d.node.isGroupNode) {
addButton(shape, d, sceneBehavior);
}
addInteraction(shape, d, sceneBehavior);
subsceneBuild(nodeGroup, d, sceneBehavior);
stylize(nodeGroup, d, sceneBehavior);
position(nodeGroup, d, sceneBehavior);
});
nodeGroups.exit().each(function (d) {
sceneBehavior.removeNodeGroup(d.node.name);
var nodeGroup = d3.select(this);
if (d.inAnnotations.list.length > 0) {
nodeGroup.select('.' + scene.Class.Annotation.INBOX).selectAll('.' + scene.Class.Annotation.GROUP).each(function (a) {
sceneBehavior.removeAnnotationGroup(a, d);
});
}
if (d.outAnnotations.list.length > 0) {
nodeGroup.select('.' + scene.Class.Annotation.OUTBOX).selectAll('.' + scene.Class.Annotation.GROUP).each(function (a) {
sceneBehavior.removeAnnotationGroup(a, d);
});
}
}).remove();
return nodeGroups;
}
node_1.buildGroup = buildGroup;
;
function subsceneBuild(nodeGroup, renderNodeInfo, sceneBehavior) {
if (renderNodeInfo.node.isGroupNode) {
if (renderNodeInfo.expanded) {
return scene.buildGroup(nodeGroup, renderNodeInfo, sceneBehavior, scene.Class.Subscene.GROUP);
}
scene.selectChild(nodeGroup, 'g', scene.Class.Subscene.GROUP).remove();
}
return null;
}
;
function subscenePosition(nodeGroup, d) {
var x0 = d.x - d.width / 2 + d.paddingLeft;
var y0 = d.y - d.height / 2 + d.paddingTop;
var subscene = scene.selectChild(nodeGroup, 'g', scene.Class.Subscene.GROUP);
scene.translate(subscene, x0, y0);
}
;
function addButton(selection, d, sceneBehavior) {
var group = scene.selectOrCreateChild(selection, 'g', scene.Class.Node.BUTTON_CONTAINER);
scene.selectOrCreateChild(group, 'circle', scene.Class.Node.BUTTON_CIRCLE);
scene.selectOrCreateChild(group, 'path', scene.Class.Node.EXPAND_BUTTON).attr('d', 'M0,-2.2 V2.2 M-2.2,0 H2.2');
scene.selectOrCreateChild(group, 'path', scene.Class.Node.COLLAPSE_BUTTON).attr('d', 'M-2.2,0 H2.2');
group.on('click', function (d) {
d3.event.stopPropagation();
sceneBehavior.fire('node-toggle-expand', { name: d.node.name });
});
scene.positionButton(group, d);
}
;
function addInteraction(selection, d, sceneBehavior, disableInteraction) {
if (disableInteraction) {
selection.attr('pointer-events', 'none');
return;
}
selection.on('dblclick', function (d) {
sceneBehavior.fire('node-toggle-expand', { name: d.node.name });
}).on('mouseover', function (d) {
if (sceneBehavior.isNodeExpanded(d)) {
return;
}
sceneBehavior.fire('node-highlight', { name: d.node.name });
}).on('mouseout', function (d) {
if (sceneBehavior.isNodeExpanded(d)) {
return;
}
sceneBehavior.fire('node-unhighlight', { name: d.node.name });
}).on('click', function (d) {
d3.event.stopPropagation();
sceneBehavior.fire('node-select', { name: d.node.name });
});
}
;
function labelBuild(nodeGroup, renderNodeInfo, sceneBehavior) {
var namePath = renderNodeInfo.node.name.split('/');
var text = namePath[namePath.length - 1];
var useFontScale = renderNodeInfo.node.type === graph.NodeType.META && !renderNodeInfo.expanded;
var label = scene.selectOrCreateChild(nodeGroup, 'text', scene.Class.Node.LABEL);
label.attr('dy', '.35em').attr('text-anchor', 'middle');
if (useFontScale) {
if (text.length > sceneBehavior.maxMetanodeLabelLength) {
text = text.substr(0, sceneBehavior.maxMetanodeLabelLength - 2) + '...';
}
var scale = getLabelFontScale(sceneBehavior);
label.attr('font-size', scale(text.length) + 'px');
}
label.text(text);
return label;
}
;
var fontScale = null;
function getLabelFontScale(sceneBehavior) {
if (!fontScale) {
fontScale = d3.scale.linear().domain([
sceneBehavior.maxMetanodeLabelLengthLargeFont,
sceneBehavior.maxMetanodeLabelLength
]).range([
sceneBehavior.maxMetanodeLabelLengthFontSize,
sceneBehavior.minMetanodeLabelLengthFontSize
]).clamp(true);
}
return fontScale;
}
function labelPosition(nodeGroup, d, yOffset) {
scene.selectChild(nodeGroup, 'text', scene.Class.Node.LABEL).transition().attr('x', d.x).attr('y', d.y + yOffset);
}
;
function buildShape(nodeGroup, d, nodeClass, before) {
var shapeGroup = scene.selectOrCreateChild(nodeGroup, 'g', nodeClass, before);
switch (d.node.type) {
case graph.NodeType.OP:
scene.selectOrCreateChild(shapeGroup, 'ellipse', scene.Class.Node.COLOR_TARGET);
break;
case graph.NodeType.SERIES:
var stampType = 'annotation';
var groupNodeInfo = d;
if (groupNodeInfo.coreGraph) {
stampType = groupNodeInfo.node.hasNonControlEdges ? 'vertical' : 'horizontal';
}
scene.selectOrCreateChild(shapeGroup, 'use', scene.Class.Node.COLOR_TARGET).attr('xlink:href', '#op-series-' + stampType + '-stamp');
scene.selectOrCreateChild(shapeGroup, 'rect', scene.Class.Node.COLOR_TARGET).attr({
rx: d.radius,
ry: d.radius
});
break;
case graph.NodeType.BRIDGE:
scene.selectOrCreateChild(shapeGroup, 'rect', scene.Class.Node.COLOR_TARGET).attr({
rx: d.radius,
ry: d.radius
});
break;
case graph.NodeType.META:
scene.selectOrCreateChild(shapeGroup, 'rect', scene.Class.Node.COLOR_TARGET).attr({
rx: d.radius,
ry: d.radius
});
break;
default:
throw Error('Unrecognized node type: ' + d.node.type);
}
return shapeGroup;
}
node_1.buildShape = buildShape;
;
function nodeClass(d) {
switch (d.node.type) {
case graph.NodeType.OP:
return scene.Class.OPNODE;
case graph.NodeType.META:
return scene.Class.METANODE;
case graph.NodeType.SERIES:
return scene.Class.SERIESNODE;
case graph.NodeType.BRIDGE:
return scene.Class.BRIDGENODE;
case graph.NodeType.ELLIPSIS:
return scene.Class.ELLIPSISNODE;
}
;
throw Error('Unrecognized node type: ' + d.node.type);
}
node_1.nodeClass = nodeClass;
;
function position(nodeGroup, d, sceneBehavior) {
var shapeGroup = scene.selectChild(nodeGroup, 'g', scene.Class.Node.SHAPE);
switch (d.node.type) {
case graph.NodeType.OP: {
var shape = scene.selectChild(shapeGroup, 'ellipse');
scene.positionEllipse(shape, d.x, d.y, d.width, d.height);
labelPosition(nodeGroup, d, d.labelOffset);
break;
}
case graph.NodeType.META: {
var shape = scene.selectChild(shapeGroup, 'rect');
scene.positionRect(shape, d.x, d.y, d.width, d.height);
if (d.expanded) {
subscenePosition(nodeGroup, d);
labelPosition(nodeGroup, d, -d.height / 2 + d.labelHeight / 2);
} else {
labelPosition(nodeGroup, d, 0);
}
break;
}
case graph.NodeType.SERIES: {
var shape = scene.selectChild(shapeGroup, 'use');
scene.positionRect(shape, d.x, d.y, d.width, d.height);
if (d.expanded) {
subscenePosition(nodeGroup, d);
labelPosition(nodeGroup, d, -d.height / 2 + d.labelHeight / 2);
} else {
labelPosition(nodeGroup, d, d.labelOffset);
}
}
case graph.NodeType.BRIDGE: {
var shape = scene.selectChild(shapeGroup, 'rect');
scene.positionRect(shape, d.x, d.y, d.width, d.height);
break;
}
default: {
throw Error('Unrecognized node type: ' + d.node.type);
}
}
}
;
var ColorBy = {
STRUCTURE: 0,
DEVICE: 1,
COMPUTE_TIME: 2,
MEMORY: 3
};
function getFillForNode(sceneBehavior, colorBy, renderInfo, isExpanded) {
var colorParams = tf.graph.render.MetanodeColors;
switch (colorBy) {
case ColorBy.STRUCTURE:
if (renderInfo.node.type === tf.graph.NodeType.META) {
var tid = renderInfo.node.templateId;
return tid === null ? colorParams.UNKNOWN : colorParams.STRUCTURE_PALETTE(sceneBehavior.templateIndex(tid), renderInfo.expanded);
} else if (renderInfo.node.type === tf.graph.NodeType.SERIES) {
return renderInfo.expanded ? colorParams.EXPANDED_COLOR : 'white';
} else if (renderInfo.node.type === graph.NodeType.BRIDGE) {
return renderInfo.structural ? '#f0e' : renderInfo.node.inbound ? '#0ef' : '#fe0';
} else {
return 'white';
}
case ColorBy.DEVICE:
if (renderInfo.deviceColors == null) {
return colorParams.UNKNOWN;
}
var id = renderInfo.node.name;
var escapedId = tf.escapeQuerySelector(id);
var gradientDefs = d3.select('svg#svg defs #linearGradients');
var linearGradient = gradientDefs.select('linearGradient#' + escapedId);
if (linearGradient.size() === 0) {
linearGradient = gradientDefs.append('linearGradient').attr('id', id);
linearGradient.selectAll('*').remove();
var cumulativeProportion = 0;
_.each(renderInfo.deviceColors, function (d) {
var color = d.color;
linearGradient.append('stop').attr('offset', cumulativeProportion).attr('stop-color', color);
linearGradient.append('stop').attr('offset', cumulativeProportion + d.proportion).attr('stop-color', color);
cumulativeProportion += d.proportion;
});
}
return isExpanded ? colorParams.EXPANDED_COLOR : 'url(#' + escapedId + ')';
case ColorBy.COMPUTE_TIME:
return isExpanded ? colorParams.EXPANDED_COLOR : renderInfo.computeTimeColor || colorParams.UNKNOWN;
case ColorBy.MEMORY:
return isExpanded ? colorParams.EXPANDED_COLOR : renderInfo.memoryColor || colorParams.UNKNOWN;
default:
throw new Error('Unknown case to color nodes by');
}
}
function stylize(nodeGroup, renderInfo, sceneBehavior, nodeClass) {
nodeClass = nodeClass || scene.Class.Node.SHAPE;
var isHighlighted = sceneBehavior.isNodeHighlighted(renderInfo.node.name);
var isSelected = sceneBehavior.isNodeSelected(renderInfo.node.name);
var isExtract = renderInfo.isInExtract || renderInfo.isOutExtract;
var isExpanded = renderInfo.expanded;
nodeGroup.classed('highlighted', isHighlighted);
nodeGroup.classed('selected', isSelected);
nodeGroup.classed('extract', isExtract);
nodeGroup.classed('expanded', isExpanded);
var node = nodeGroup.select('.' + nodeClass + ' .' + scene.Class.Node.COLOR_TARGET);
var fillColor = getFillForNode(sceneBehavior, ColorBy[sceneBehavior.colorBy.toUpperCase()], renderInfo, isExpanded);
node.style('fill', fillColor);
if (isSelected) {
node.style('stroke', null);
} else {
var outlineColor = fillColor.substring(0, 3) === 'url' ? tf.graph.render.MetanodeColors.GRADIENT_OUTLINE : d3.rgb(fillColor).darker().toString();
node.style('stroke', outlineColor);
}
}
node_1.stylize = stylize;
;
}(node = scene.node || (scene.node = {})));
}(scene = graph.scene || (graph.scene = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph_1) {
var layout;
(function (layout) {
layout.PARAMS = {
animation: { duration: 250 },
graph: {
meta: {
nodeSep: 110,
rankSep: 25
},
series: {
nodeSep: 90,
rankSep: 25
},
padding: {
paddingTop: 40,
paddingLeft: 20
}
},
subscene: {
meta: {
paddingTop: 10,
paddingBottom: 10,
paddingLeft: 10,
paddingRight: 10,
labelHeight: 20,
extractXOffset: 50,
extractYOffset: 20
},
series: {
paddingTop: 10,
paddingBottom: 10,
paddingLeft: 10,
paddingRight: 10,
labelHeight: 10
}
},
nodeSize: {
meta: {
radius: 5,
width: 60,
height: d3.scale.linear().domain([
1,
200
]).range([
15,
60
]).clamp(true),
expandButtonRadius: 3
},
op: {
width: 15,
height: 6,
radius: 3,
labelOffset: -8
},
series: {
expanded: {
radius: 10,
labelOffset: 0
},
vertical: {
width: 16,
height: 13,
labelOffset: -13
},
horizontal: {
width: 24,
height: 8,
radius: 10,
labelOffset: -10
}
},
bridge: {
width: 20,
height: 20,
radius: 2,
labelOffset: 0
}
},
shortcutSize: {
op: {
width: 10,
height: 4
},
meta: {
width: 12,
height: 4,
radius: 1
},
series: {
width: 14,
height: 4
}
},
annotations: {
xOffset: 10,
yOffset: 3,
labelOffset: 2,
labelWidth: 35
},
constant: {
size: {
width: 4,
height: 4
}
},
series: {
maxStackCount: 3,
parallelStackOffsetRatio: 0.2,
towerStackOffsetRatio: 0.5
},
minimap: { size: 150 }
};
function scene(renderNodeInfo) {
if (renderNodeInfo.node.isGroupNode) {
layoutChildren(renderNodeInfo);
}
if (renderNodeInfo.node.type === graph_1.NodeType.META) {
layoutMetanode(renderNodeInfo);
} else if (renderNodeInfo.node.type === graph_1.NodeType.SERIES) {
layoutSeriesNode(renderNodeInfo);
}
}
layout.scene = scene;
;
function layoutChildren(renderNodeInfo) {
var children = renderNodeInfo.coreGraph.nodes().map(function (n) {
return renderNodeInfo.coreGraph.node(n);
}).concat(renderNodeInfo.isolatedInExtract, renderNodeInfo.isolatedOutExtract);
_.each(children, function (childNodeInfo) {
switch (childNodeInfo.node.type) {
case graph_1.NodeType.OP:
_.extend(childNodeInfo, layout.PARAMS.nodeSize.op);
break;
case graph_1.NodeType.BRIDGE:
_.extend(childNodeInfo, layout.PARAMS.nodeSize.bridge);
break;
case graph_1.NodeType.META:
if (!childNodeInfo.expanded) {
_.extend(childNodeInfo, layout.PARAMS.nodeSize.meta);
childNodeInfo.height = layout.PARAMS.nodeSize.meta.height(childNodeInfo.node.cardinality);
} else {
var childGroupNodeInfo = childNodeInfo;
scene(childGroupNodeInfo);
}
break;
case graph_1.NodeType.SERIES:
if (childNodeInfo.expanded) {
_.extend(childNodeInfo, layout.PARAMS.nodeSize.series.expanded);
var childGroupNodeInfo = childNodeInfo;
scene(childGroupNodeInfo);
} else {
var childGroupNodeInfo = childNodeInfo;
var seriesParams = childGroupNodeInfo.node.hasNonControlEdges ? layout.PARAMS.nodeSize.series.vertical : layout.PARAMS.nodeSize.series.horizontal;
_.extend(childNodeInfo, seriesParams);
}
break;
default:
throw Error('Unrecognized node type: ' + childNodeInfo.node.type);
}
layoutAnnotation(childNodeInfo);
});
}
function dagreLayout(graph, params) {
_.extend(graph.graph(), {
nodeSep: params.nodeSep,
rankSep: params.rankSep
});
var bridgeNodeNames = [];
var nonBridgeNodeNames = [];
_.each(graph.nodes(), function (nodeName) {
var nodeInfo = graph.node(nodeName);
if (nodeInfo.node.type === graph_1.NodeType.BRIDGE) {
bridgeNodeNames.push(nodeName);
} else {
nonBridgeNodeNames.push(nodeName);
}
});
if (!nonBridgeNodeNames.length) {
return {
width: 0,
height: 0
};
}
dagre.layout(graph);
var graphLabel = graph.graph();
var minX = Infinity;
var minY = Infinity;
var maxX = -Infinity;
var maxY = -Infinity;
_.each(nonBridgeNodeNames, function (nodeName) {
var nodeInfo = graph.node(nodeName);
var w = 0.5 * nodeInfo.width;
var x1 = nodeInfo.x - w - nodeInfo.inboxWidth;
var x2 = nodeInfo.x + w + nodeInfo.outboxWidth;
minX = x1 < minX ? x1 : minX;
maxX = x2 > maxX ? x2 : maxX;
var labelLength = nodeName.length - nodeName.lastIndexOf(graph_1.NAMESPACE_DELIM);
var charWidth = 3;
var lw = 0.5 * labelLength * charWidth;
var lx1 = nodeInfo.x - lw;
var lx2 = nodeInfo.x + lw;
minX = lx1 < minX ? lx1 : minX;
maxX = lx2 > maxX ? lx2 : maxX;
var h = 0.5 * nodeInfo.outerHeight;
var y1 = nodeInfo.y - h;
var y2 = nodeInfo.y + h;
minY = y1 < minY ? y1 : minY;
maxY = y2 > maxY ? y2 : maxY;
});
_.each(graph.edges(), function (edgeObj) {
var renderMetaedgeInfo = graph.edge(edgeObj);
if (renderMetaedgeInfo.structural) {
return;
}
_.each(renderMetaedgeInfo.points, function (point) {
minX = point.x < minX ? point.x : minX;
maxX = point.x > maxX ? point.x : maxX;
minY = point.y < minY ? point.y : minY;
maxY = point.y > maxY ? point.y : maxY;
});
});
_.each(graph.nodes(), function (nodeName) {
var nodeInfo = graph.node(nodeName);
nodeInfo.x -= minX;
nodeInfo.y -= minY;
});
_.each(graph.edges(), function (edgeObj) {
_.each(graph.edge(edgeObj).points, function (point) {
point.x -= minX;
point.y -= minY;
});
});
return {
width: maxX - minX,
height: maxY - minY
};
}
function layoutMetanode(renderNodeInfo) {
var params = layout.PARAMS.subscene.meta;
renderNodeInfo = _.extend(renderNodeInfo, params);
_.extend(renderNodeInfo.coreBox, dagreLayout(renderNodeInfo.coreGraph, layout.PARAMS.graph.meta));
var hasInExtract = renderNodeInfo.isolatedInExtract.length > 0;
renderNodeInfo.inExtractBox.width = hasInExtract ? _(renderNodeInfo.isolatedInExtract).pluck('outerWidth').max() : 0;
renderNodeInfo.inExtractBox.height = _.reduce(renderNodeInfo.isolatedInExtract, function (height, child, i) {
var yOffset = i > 0 ? params.extractYOffset : 0;
child.x = renderNodeInfo.inExtractBox.width / 2;
child.y = height + yOffset + child.outerHeight / 2;
return height + yOffset + child.outerHeight;
}, 0);
var hasOutExtract = renderNodeInfo.isolatedOutExtract.length > 0;
renderNodeInfo.outExtractBox.width = hasOutExtract ? _(renderNodeInfo.isolatedOutExtract).pluck('outerWidth').max() : 0;
renderNodeInfo.outExtractBox.height = _.reduce(renderNodeInfo.isolatedOutExtract, function (height, child, i) {
var yOffset = i > 0 ? params.extractYOffset : 0;
child.x = renderNodeInfo.outExtractBox.width / 2;
child.y = height + yOffset + child.outerHeight / 2;
return height + yOffset + child.outerHeight;
}, 0);
renderNodeInfo.width = params.paddingLeft + renderNodeInfo.coreBox.width + params.paddingRight + (hasInExtract ? renderNodeInfo.inExtractBox.width + params.extractXOffset : 0) + (hasOutExtract ? params.extractXOffset + renderNodeInfo.outExtractBox.width : 0);
renderNodeInfo.height = renderNodeInfo.labelHeight + params.paddingTop + Math.max(renderNodeInfo.inExtractBox.height, renderNodeInfo.coreBox.height, renderNodeInfo.outExtractBox.height) + params.paddingBottom;
}
function layoutSeriesNode(node) {
var graph = node.coreGraph;
var params = layout.PARAMS.subscene.series;
_.extend(node, params);
_.extend(node.coreBox, dagreLayout(node.coreGraph, layout.PARAMS.graph.series));
_.each(graph.nodes(), function (nodeName) {
graph.node(nodeName).excluded = false;
});
node.width = node.coreBox.width + params.paddingLeft + params.paddingRight;
node.height = node.coreBox.height + params.paddingTop + params.paddingBottom;
}
function layoutAnnotation(renderNodeInfo) {
if (renderNodeInfo.expanded) {
_.extend(renderNodeInfo, {
inboxWidth: 0,
inboxHeight: 0,
outboxWidth: 0,
outboxHeight: 0,
outerWidth: renderNodeInfo.width,
outerHeight: renderNodeInfo.height
});
return;
}
var inAnnotations = renderNodeInfo.inAnnotations.list;
var outAnnotations = renderNodeInfo.outAnnotations.list;
_.each(inAnnotations, function (a) {
return sizeAnnotation(a);
});
_.each(outAnnotations, function (a) {
return sizeAnnotation(a);
});
var params = layout.PARAMS.annotations;
renderNodeInfo.inboxWidth = inAnnotations.length > 0 ? _(inAnnotations).pluck('width').max() + params.xOffset + params.labelWidth + params.labelOffset : 0;
renderNodeInfo.outboxWidth = outAnnotations.length > 0 ? _(outAnnotations).pluck('width').max() + params.xOffset + params.labelWidth + params.labelOffset : 0;
var inboxHeight = _.reduce(inAnnotations, function (height, a, i) {
var yOffset = i > 0 ? params.yOffset : 0;
a.dx = -(renderNodeInfo.width + a.width) / 2 - params.xOffset;
a.dy = height + yOffset + a.height / 2;
return height + yOffset + a.height;
}, 0);
_.each(inAnnotations, function (a) {
a.dy -= inboxHeight / 2;
a.labelOffset = params.labelOffset;
});
var outboxHeight = _.reduce(outAnnotations, function (height, a, i) {
var yOffset = i > 0 ? params.yOffset : 0;
a.dx = (renderNodeInfo.width + a.width) / 2 + params.xOffset;
a.dy = height + yOffset + a.height / 2;
return height + yOffset + a.height;
}, 0);
_.each(outAnnotations, function (a) {
a.dy -= outboxHeight / 2;
a.labelOffset = params.labelOffset;
});
var inTouchHeight = Math.min(renderNodeInfo.height / 2 - renderNodeInfo.radius, inboxHeight / 2);
inTouchHeight = inTouchHeight < 0 ? 0 : inTouchHeight;
var inY = d3.scale.linear().domain([
0,
inAnnotations.length - 1
]).range([
-inTouchHeight,
inTouchHeight
]);
_.each(inAnnotations, function (a, i) {
a.points = [
{
dx: a.dx + a.width / 2,
dy: a.dy
},
{
dx: -renderNodeInfo.width / 2,
dy: inAnnotations.length > 1 ? inY(i) : 0
}
];
});
var outTouchHeight = Math.min(renderNodeInfo.height / 2 - renderNodeInfo.radius, outboxHeight / 2);
outTouchHeight = outTouchHeight < 0 ? 0 : outTouchHeight;
var outY = d3.scale.linear().domain([
0,
outAnnotations.length - 1
]).range([
-outTouchHeight,
outTouchHeight
]);
_.each(outAnnotations, function (a, i) {
a.points = [
{
dx: renderNodeInfo.width / 2,
dy: outAnnotations.length > 1 ? outY(i) : 0
},
{
dx: a.dx - a.width / 2,
dy: a.dy
}
];
});
renderNodeInfo.outerWidth = renderNodeInfo.width + renderNodeInfo.inboxWidth + renderNodeInfo.outboxWidth;
renderNodeInfo.outerHeight = Math.max(renderNodeInfo.height, inboxHeight, outboxHeight);
}
function sizeAnnotation(a) {
switch (a.annotationType) {
case graph_1.render.AnnotationType.CONSTANT:
_.extend(a, layout.PARAMS.constant.size);
break;
case graph_1.render.AnnotationType.SHORTCUT:
if (a.node.type === graph_1.NodeType.OP) {
_.extend(a, layout.PARAMS.shortcutSize.op);
} else if (a.node.type === graph_1.NodeType.META) {
_.extend(a, layout.PARAMS.shortcutSize.meta);
} else if (a.node.type === graph_1.NodeType.SERIES) {
_.extend(a, layout.PARAMS.shortcutSize.series);
} else {
throw Error('Invalid node type: ' + a.node.type);
}
break;
case graph_1.render.AnnotationType.SUMMARY:
_.extend(a, layout.PARAMS.constant.size);
break;
}
}
}(layout = graph_1.layout || (graph_1.layout = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
tf.COLORS = [
{
'name': 'Google Blue',
'color': '#4184f3',
'active': '#3a53c5',
'disabled': '#cad8fc'
},
{
'name': 'Google Red',
'color': '#db4437',
'active': '#8f2a0c',
'disabled': '#e8c6c1'
},
{
'name': 'Google Yellow',
'color': '#f4b400',
'active': '#db9200',
'disabled': '#f7e8b0'
},
{
'name': 'Google Green',
'color': '#0f9d58',
'active': '#488046',
'disabled': '#c2e1cc'
},
{
'name': 'Purple',
'color': '#aa46bb',
'active': '#5c1398',
'disabled': '#d7bce6'
},
{
'name': 'Teal',
'color': '#00abc0',
'active': '#47828e',
'disabled': '#c2eaf2'
},
{
'name': 'Deep Orange',
'color': '#ff6f42',
'active': '#ca4a06',
'disabled': '#f2cbba'
},
{
'name': 'Lime',
'color': '#9d9c23',
'active': '#7f771d',
'disabled': '#f1f4c2'
},
{
'name': 'Indigo',
'color': '#5b6abf',
'active': '#3e47a9',
'disabled': '#c5c8e8'
},
{
'name': 'Pink',
'color': '#ef6191',
'active': '#ca1c60',
'disabled': '#e9b9ce'
},
{
'name': 'Deep Teal',
'color': '#00786a',
'active': '#2b4f43',
'disabled': '#bededa'
},
{
'name': 'Deep Pink',
'color': '#c1175a',
'active': '#75084f',
'disabled': '#de8cae'
},
{
'name': 'Gray',
'color': '#9E9E9E',
'active': '#424242',
'disabled': 'F5F5F5'
}
].reduce(function (m, c) {
m[c.name] = c;
return m;
}, {});
tf.OP_GROUP_COLORS = [
{
color: 'Google Red',
groups: [
'gen_legacy_ops',
'legacy_ops',
'legacy_flogs_input',
'legacy_image_input',
'legacy_input_example_input',
'legacy_sequence_input',
'legacy_seti_input_input'
]
},
{
color: 'Deep Orange',
groups: ['constant_ops']
},
{
color: 'Indigo',
groups: ['state_ops']
},
{
color: 'Purple',
groups: [
'nn_ops',
'nn'
]
},
{
color: 'Google Green',
groups: ['math_ops']
},
{
color: 'Lime',
groups: ['array_ops']
},
{
color: 'Teal',
groups: [
'control_flow_ops',
'data_flow_ops'
]
},
{
color: 'Pink',
groups: ['summary_ops']
},
{
color: 'Deep Pink',
groups: ['io_ops']
}
].reduce(function (m, c) {
c.groups.forEach(function (group) {
m[group] = c.color;
});
return m;
}, {});
}(tf || (tf = {})));
var tf;
(function (tf) {
var scene;
(function (scene) {
var FRAC_VIEWPOINT_AREA = 0.8;
var Minimap = function () {
function Minimap(svg, zoomG, mainZoom, minimap, maxWandH, labelPadding) {
var _this = this;
this.svg = svg;
this.labelPadding = labelPadding;
this.zoomG = zoomG;
this.mainZoom = mainZoom;
this.maxWandH = maxWandH;
var $minimap = d3.select(minimap);
var $minimapSvg = $minimap.select('svg');
var $viewpoint = $minimapSvg.select('rect');
var dragmove = function (d) {
_this.viewpointCoord.x = d3.event.x;
_this.viewpointCoord.y = d3.event.y;
_this.updateViewpoint();
};
this.viewpointCoord = {
x: 0,
y: 0
};
var drag = d3.behavior.drag().origin(Object).on('drag', dragmove);
$viewpoint.datum(this.viewpointCoord).call(drag);
$minimapSvg.on('click', function () {
if (d3.event.defaultPrevented) {
return;
}
var width = Number($viewpoint.attr('width'));
var height = Number($viewpoint.attr('height'));
var clickCoords = d3.mouse($minimapSvg.node());
_this.viewpointCoord.x = clickCoords[0] - width / 2;
_this.viewpointCoord.y = clickCoords[1] - height / 2;
_this.updateViewpoint();
});
this.viewpoint = $viewpoint.node();
this.minimapSvg = $minimapSvg.node();
this.minimap = minimap;
this.canvas = $minimap.select('canvas.first').node();
this.canvasBuffer = $minimap.select('canvas.second').node();
}
Minimap.prototype.updateViewpoint = function () {
d3.select(this.viewpoint).attr('x', this.viewpointCoord.x).attr('y', this.viewpointCoord.y);
var mainX = -this.viewpointCoord.x * this.scaleMain / this.scaleMinimap;
var mainY = -this.viewpointCoord.y * this.scaleMain / this.scaleMinimap;
var zoomEvent = this.mainZoom.translate([
mainX,
mainY
]).event;
d3.select(this.zoomG).call(zoomEvent);
};
Minimap.prototype.update = function () {
var _this = this;
var $svg = d3.select(this.svg);
var stylesText = '';
for (var k = 0; k < document.styleSheets.length; k++) {
try {
var cssRules = document.styleSheets[k].cssRules || document.styleSheets[k].rules;
if (cssRules == null) {
continue;
}
for (var i = 0; i < cssRules.length; i++) {
stylesText += cssRules[i].cssText + '\n';
}
} catch (e) {
if (e.name !== 'SecurityError') {
throw e;
}
}
}
var svgStyle = $svg.append('style');
svgStyle.text(stylesText);
var $zoomG = d3.select(this.zoomG);
var zoomTransform = $zoomG.attr('transform');
$zoomG.attr('transform', null);
var sceneSize = this.zoomG.getBBox();
sceneSize.height += this.labelPadding;
$svg.attr({
width: sceneSize.width,
height: sceneSize.height
});
this.scaleMinimap = this.maxWandH / Math.max(sceneSize.width, sceneSize.height);
this.minimapSize = {
width: sceneSize.width * this.scaleMinimap,
height: sceneSize.height * this.scaleMinimap
};
d3.select(this.minimapSvg).attr(this.minimapSize);
d3.select(this.canvasBuffer).attr(this.minimapSize);
if (this.translate != null && this.zoom != null) {
requestAnimationFrame(function () {
return _this.zoom();
});
}
var svgXml = new XMLSerializer().serializeToString(this.svg);
svgStyle.remove();
$svg.attr({
width: null,
height: null
});
$zoomG.attr('transform', zoomTransform);
var image = new Image();
image.onload = function () {
var context = _this.canvasBuffer.getContext('2d');
context.clearRect(0, 0, _this.canvasBuffer.width, _this.canvasBuffer.height);
context.drawImage(image, 0, 0, _this.minimapSize.width, _this.minimapSize.height);
requestAnimationFrame(function () {
d3.select(_this.canvasBuffer).style('display', null);
d3.select(_this.canvas).style('display', 'none');
_a = [
_this.canvasBuffer,
_this.canvas
], _this.canvas = _a[0], _this.canvasBuffer = _a[1];
var _a;
});
};
image.src = 'data:image/svg+xml;base64,' + btoa(svgXml);
};
Minimap.prototype.zoom = function (translate, scale) {
this.translate = translate || this.translate;
this.scaleMain = scale || this.scaleMain;
var svgRect = this.svg.getBoundingClientRect();
var $viewpoint = d3.select(this.viewpoint);
this.viewpointCoord.x = -this.translate[0] * this.scaleMinimap / this.scaleMain;
this.viewpointCoord.y = -this.translate[1] * this.scaleMinimap / this.scaleMain;
var viewpointWidth = svgRect.width * this.scaleMinimap / this.scaleMain;
var viewpointHeight = svgRect.height * this.scaleMinimap / this.scaleMain;
$viewpoint.attr({
x: this.viewpointCoord.x,
y: this.viewpointCoord.y,
width: viewpointWidth,
height: viewpointHeight
});
var mapWidth = this.minimapSize.width;
var mapHeight = this.minimapSize.height;
var x = this.viewpointCoord.x;
var y = this.viewpointCoord.y;
var w = Math.min(Math.max(0, x + viewpointWidth), mapWidth) - Math.min(Math.max(0, x), mapWidth);
var h = Math.min(Math.max(0, y + viewpointHeight), mapHeight) - Math.min(Math.max(0, y), mapHeight);
var fracIntersect = w * h / (mapWidth * mapHeight);
if (fracIntersect < FRAC_VIEWPOINT_AREA) {
this.minimap.classList.remove('hidden');
} else {
this.minimap.classList.add('hidden');
}
};
return Minimap;
}();
scene.Minimap = Minimap;
}(scene = tf.scene || (tf.scene = {})));
}(tf || (tf = {})));
var tf;
(function (tf) {
var graph;
(function (graph_1) {
var layout;
(function (layout) {
layout.PARAMS = {
animation: { duration: 250 },
graph: {
meta: {
nodeSep: 110,
rankSep: 25
},
series: {
nodeSep: 90,
rankSep: 25
},
padding: {
paddingTop: 40,
paddingLeft: 20
}
},
subscene: {
meta: {
paddingTop: 10,
paddingBottom: 10,
paddingLeft: 10,
paddingRight: 10,
labelHeight: 20,
extractXOffset: 50,
extractYOffset: 20
},
series: {
paddingTop: 10,
paddingBottom: 10,
paddingLeft: 10,
paddingRight: 10,
labelHeight: 10
}
},
nodeSize: {
meta: {
radius: 5,
width: 60,
height: d3.scale.linear().domain([
1,
200
]).range([
15,
60
]).clamp(true),
expandButtonRadius: 3
},
op: {
width: 15,
height: 6,
radius: 3,
labelOffset: -8
},
series: {
expanded: {
radius: 10,
labelOffset: 0
},
vertical: {
width: 16,
height: 13,
labelOffset: -13
},
horizontal: {
width: 24,
height: 8,
radius: 10,
labelOffset: -10
}
},
bridge: {
width: 20,
height: 20,
radius: 2,
labelOffset: 0
}
},
shortcutSize: {
op: {
width: 10,
height: 4
},
meta: {
width: 12,
height: 4,
radius: 1
},
series: {
width: 14,
height: 4
}
},
annotations: {
xOffset: 10,
yOffset: 3,
labelOffset: 2,
labelWidth: 35
},
constant: {
size: {
width: 4,
height: 4
}
},
series: {
maxStackCount: 3,
parallelStackOffsetRatio: 0.2,
towerStackOffsetRatio: 0.5
},
minimap: { size: 150 }
};
function scene(renderNodeInfo) {
if (renderNodeInfo.node.isGroupNode) {
layoutChildren(renderNodeInfo);
}
if (renderNodeInfo.node.type === graph_1.NodeType.META) {
layoutMetanode(renderNodeInfo);
} else if (renderNodeInfo.node.type === graph_1.NodeType.SERIES) {
layoutSeriesNode(renderNodeInfo);
}
}
layout.scene = scene;
;
function layoutChildren(renderNodeInfo) {
var children = renderNodeInfo.coreGraph.nodes().map(function (n) {
return renderNodeInfo.coreGraph.node(n);
}).concat(renderNodeInfo.isolatedInExtract, renderNodeInfo.isolatedOutExtract);
_.each(children, function (childNodeInfo) {
switch (childNodeInfo.node.type) {
case graph_1.NodeType.OP:
_.extend(childNodeInfo, layout.PARAMS.nodeSize.op);
break;
case graph_1.NodeType.BRIDGE:
_.extend(childNodeInfo, layout.PARAMS.nodeSize.bridge);
break;
case graph_1.NodeType.META:
if (!childNodeInfo.expanded) {
_.extend(childNodeInfo, layout.PARAMS.nodeSize.meta);
childNodeInfo.height = layout.PARAMS.nodeSize.meta.height(childNodeInfo.node.cardinality);
} else {
var childGroupNodeInfo = childNodeInfo;
scene(childGroupNodeInfo);
}
break;
case graph_1.NodeType.SERIES:
if (childNodeInfo.expanded) {
_.extend(childNodeInfo, layout.PARAMS.nodeSize.series.expanded);
var childGroupNodeInfo = childNodeInfo;
scene(childGroupNodeInfo);
} else {
var childGroupNodeInfo = childNodeInfo;
var seriesParams = childGroupNodeInfo.node.hasNonControlEdges ? layout.PARAMS.nodeSize.series.vertical : layout.PARAMS.nodeSize.series.horizontal;
_.extend(childNodeInfo, seriesParams);
}
break;
default:
throw Error('Unrecognized node type: ' + childNodeInfo.node.type);
}
layoutAnnotation(childNodeInfo);
});
}
function dagreLayout(graph, params) {
_.extend(graph.graph(), {
nodeSep: params.nodeSep,
rankSep: params.rankSep
});
var bridgeNodeNames = [];
var nonBridgeNodeNames = [];
_.each(graph.nodes(), function (nodeName) {
var nodeInfo = graph.node(nodeName);
if (nodeInfo.node.type === graph_1.NodeType.BRIDGE) {
bridgeNodeNames.push(nodeName);
} else {
nonBridgeNodeNames.push(nodeName);
}
});
if (!nonBridgeNodeNames.length) {
return {
width: 0,
height: 0
};
}
dagre.layout(graph);
var graphLabel = graph.graph();
var minX = Infinity;
var minY = Infinity;
var maxX = -Infinity;
var maxY = -Infinity;
_.each(nonBridgeNodeNames, function (nodeName) {
var nodeInfo = graph.node(nodeName);
var w = 0.5 * nodeInfo.width;
var x1 = nodeInfo.x - w - nodeInfo.inboxWidth;
var x2 = nodeInfo.x + w + nodeInfo.outboxWidth;
minX = x1 < minX ? x1 : minX;
maxX = x2 > maxX ? x2 : maxX;
var labelLength = nodeName.length - nodeName.lastIndexOf(graph_1.NAMESPACE_DELIM);
var charWidth = 3;
var lw = 0.5 * labelLength * charWidth;
var lx1 = nodeInfo.x - lw;
var lx2 = nodeInfo.x + lw;
minX = lx1 < minX ? lx1 : minX;
maxX = lx2 > maxX ? lx2 : maxX;
var h = 0.5 * nodeInfo.outerHeight;
var y1 = nodeInfo.y - h;
var y2 = nodeInfo.y + h;
minY = y1 < minY ? y1 : minY;
maxY = y2 > maxY ? y2 : maxY;
});
_.each(graph.edges(), function (edgeObj) {
var renderMetaedgeInfo = graph.edge(edgeObj);
if (renderMetaedgeInfo.structural) {
return;
}
_.each(renderMetaedgeInfo.points, function (point) {
minX = point.x < minX ? point.x : minX;
maxX = point.x > maxX ? point.x : maxX;
minY = point.y < minY ? point.y : minY;
maxY = point.y > maxY ? point.y : maxY;
});
});
_.each(graph.nodes(), function (nodeName) {
var nodeInfo = graph.node(nodeName);
nodeInfo.x -= minX;
nodeInfo.y -= minY;
});
_.each(graph.edges(), function (edgeObj) {
_.each(graph.edge(edgeObj).points, function (point) {
point.x -= minX;
point.y -= minY;
});
});
return {
width: maxX - minX,
height: maxY - minY
};
}
function layoutMetanode(renderNodeInfo) {
var params = layout.PARAMS.subscene.meta;
renderNodeInfo = _.extend(renderNodeInfo, params);
_.extend(renderNodeInfo.coreBox, dagreLayout(renderNodeInfo.coreGraph, layout.PARAMS.graph.meta));
var hasInExtract = renderNodeInfo.isolatedInExtract.length > 0;
renderNodeInfo.inExtractBox.width = hasInExtract ? _(renderNodeInfo.isolatedInExtract).pluck('outerWidth').max() : 0;
renderNodeInfo.inExtractBox.height = _.reduce(renderNodeInfo.isolatedInExtract, function (height, child, i) {
var yOffset = i > 0 ? params.extractYOffset : 0;
child.x = renderNodeInfo.inExtractBox.width / 2;
child.y = height + yOffset + child.outerHeight / 2;
return height + yOffset + child.outerHeight;
}, 0);
var hasOutExtract = renderNodeInfo.isolatedOutExtract.length > 0;
renderNodeInfo.outExtractBox.width = hasOutExtract ? _(renderNodeInfo.isolatedOutExtract).pluck('outerWidth').max() : 0;
renderNodeInfo.outExtractBox.height = _.reduce(renderNodeInfo.isolatedOutExtract, function (height, child, i) {
var yOffset = i > 0 ? params.extractYOffset : 0;
child.x = renderNodeInfo.outExtractBox.width / 2;
child.y = height + yOffset + child.outerHeight / 2;
return height + yOffset + child.outerHeight;
}, 0);
renderNodeInfo.width = params.paddingLeft + renderNodeInfo.coreBox.width + params.paddingRight + (hasInExtract ? renderNodeInfo.inExtractBox.width + params.extractXOffset : 0) + (hasOutExtract ? params.extractXOffset + renderNodeInfo.outExtractBox.width : 0);
renderNodeInfo.height = renderNodeInfo.labelHeight + params.paddingTop + Math.max(renderNodeInfo.inExtractBox.height, renderNodeInfo.coreBox.height, renderNodeInfo.outExtractBox.height) + params.paddingBottom;
}
function layoutSeriesNode(node) {
var graph = node.coreGraph;
var params = layout.PARAMS.subscene.series;
_.extend(node, params);
_.extend(node.coreBox, dagreLayout(node.coreGraph, layout.PARAMS.graph.series));
_.each(graph.nodes(), function (nodeName) {
graph.node(nodeName).excluded = false;
});
node.width = node.coreBox.width + params.paddingLeft + params.paddingRight;
node.height = node.coreBox.height + params.paddingTop + params.paddingBottom;
}
function layoutAnnotation(renderNodeInfo) {
if (renderNodeInfo.expanded) {
_.extend(renderNodeInfo, {
inboxWidth: 0,
inboxHeight: 0,
outboxWidth: 0,
outboxHeight: 0,
outerWidth: renderNodeInfo.width,
outerHeight: renderNodeInfo.height
});
return;
}
var inAnnotations = renderNodeInfo.inAnnotations.list;
var outAnnotations = renderNodeInfo.outAnnotations.list;
_.each(inAnnotations, function (a) {
return sizeAnnotation(a);
});
_.each(outAnnotations, function (a) {
return sizeAnnotation(a);
});
var params = layout.PARAMS.annotations;
renderNodeInfo.inboxWidth = inAnnotations.length > 0 ? _(inAnnotations).pluck('width').max() + params.xOffset + params.labelWidth + params.labelOffset : 0;
renderNodeInfo.outboxWidth = outAnnotations.length > 0 ? _(outAnnotations).pluck('width').max() + params.xOffset + params.labelWidth + params.labelOffset : 0;
var inboxHeight = _.reduce(inAnnotations, function (height, a, i) {
var yOffset = i > 0 ? params.yOffset : 0;
a.dx = -(renderNodeInfo.width + a.width) / 2 - params.xOffset;
a.dy = height + yOffset + a.height / 2;
return height + yOffset + a.height;
}, 0);
_.each(inAnnotations, function (a) {
a.dy -= inboxHeight / 2;
a.labelOffset = params.labelOffset;
});
var outboxHeight = _.reduce(outAnnotations, function (height, a, i) {
var yOffset = i > 0 ? params.yOffset : 0;
a.dx = (renderNodeInfo.width + a.width) / 2 + params.xOffset;
a.dy = height + yOffset + a.height / 2;
return height + yOffset + a.height;
}, 0);
_.each(outAnnotations, function (a) {
a.dy -= outboxHeight / 2;
a.labelOffset = params.labelOffset;
});
var inTouchHeight = Math.min(renderNodeInfo.height / 2 - renderNodeInfo.radius, inboxHeight / 2);
inTouchHeight = inTouchHeight < 0 ? 0 : inTouchHeight;
var inY = d3.scale.linear().domain([
0,
inAnnotations.length - 1
]).range([
-inTouchHeight,
inTouchHeight
]);
_.each(inAnnotations, function (a, i) {
a.points = [
{
dx: a.dx + a.width / 2,
dy: a.dy
},
{
dx: -renderNodeInfo.width / 2,
dy: inAnnotations.length > 1 ? inY(i) : 0
}
];
});
var outTouchHeight = Math.min(renderNodeInfo.height / 2 - renderNodeInfo.radius, outboxHeight / 2);
outTouchHeight = outTouchHeight < 0 ? 0 : outTouchHeight;
var outY = d3.scale.linear().domain([
0,
outAnnotations.length - 1
]).range([
-outTouchHeight,
outTouchHeight
]);
_.each(outAnnotations, function (a, i) {
a.points = [
{
dx: renderNodeInfo.width / 2,
dy: outAnnotations.length > 1 ? outY(i) : 0
},
{
dx: a.dx - a.width / 2,
dy: a.dy
}
];
});
renderNodeInfo.outerWidth = renderNodeInfo.width + renderNodeInfo.inboxWidth + renderNodeInfo.outboxWidth;
renderNodeInfo.outerHeight = Math.max(renderNodeInfo.height, inboxHeight, outboxHeight);
}
function sizeAnnotation(a) {
switch (a.annotationType) {
case graph_1.render.AnnotationType.CONSTANT:
_.extend(a, layout.PARAMS.constant.size);
break;
case graph_1.render.AnnotationType.SHORTCUT:
if (a.node.type === graph_1.NodeType.OP) {
_.extend(a, layout.PARAMS.shortcutSize.op);
} else if (a.node.type === graph_1.NodeType.META) {
_.extend(a, layout.PARAMS.shortcutSize.meta);
} else if (a.node.type === graph_1.NodeType.SERIES) {
_.extend(a, layout.PARAMS.shortcutSize.series);
} else {
throw Error('Invalid node type: ' + a.node.type);
}
break;
case graph_1.render.AnnotationType.SUMMARY:
_.extend(a, layout.PARAMS.constant.size);
break;
}
}
}(layout = graph_1.layout || (graph_1.layout = {})));
}(graph = tf.graph || (tf.graph = {})));
}(tf || (tf = {})));
!function (e) {
if ('object' == typeof exports && 'undefined' != typeof module)
module.exports = e();
else if ('function' == typeof define && define.amd)
define([], e);
else {
var f;
'undefined' != typeof window ? f = window : 'undefined' != typeof global ? f = global : 'undefined' != typeof self && (f = self), f.dagre = e();
}
}(function () {
var define, module, exports;
return function e(t, n, r) {
function s(o, u) {
if (!n[o]) {
if (!t[o]) {
var a = typeof require == 'function' && require;
if (!u && a)
return a(o, !0);
if (i)
return i(o, !0);
var f = new Error('Cannot find module \'' + o + '\'');
throw f.code = 'MODULE_NOT_FOUND', f;
}
var l = n[o] = { exports: {} };
t[o][0].call(l.exports, function (e) {
var n = t[o][1][e];
return s(n ? n : e);
}, l, l.exports, e, t, n, r);
}
return n[o].exports;
}
var i = typeof require == 'function' && require;
for (var o = 0; o < r.length; o++)
s(r[o]);
return s;
}({
1: [
function (require, module, exports) {
module.exports = {
graphlib: require('./lib/graphlib'),
layout: require('./lib/layout'),
debug: require('./lib/debug'),
util: {
time: require('./lib/util').time,
notime: require('./lib/util').notime
},
version: require('./lib/version')
};
},
{
'./lib/debug': 6,
'./lib/graphlib': 7,
'./lib/layout': 9,
'./lib/util': 29,
'./lib/version': 30
}
],
2: [
function (require, module, exports) {
'use strict';
var _ = require('./lodash'), greedyFAS = require('./greedy-fas');
module.exports = {
run: run,
undo: undo
};
function run(g) {
var fas = g.graph().acyclicer === 'greedy' ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
_.each(fas, function (e) {
var label = g.edge(e);
g.removeEdge(e);
label.forwardName = e.name;
label.reversed = true;
g.setEdge(e.w, e.v, label, _.uniqueId('rev'));
});
function weightFn(g) {
return function (e) {
return g.edge(e).weight;
};
}
}
function dfsFAS(g) {
var fas = [], stack = {}, visited = {};
function dfs(v) {
if (_.has(visited, v)) {
return;
}
visited[v] = true;
stack[v] = true;
_.each(g.outEdges(v), function (e) {
if (_.has(stack, e.w)) {
fas.push(e);
} else {
dfs(e.w);
}
});
delete stack[v];
}
_.each(g.nodes(), dfs);
return fas;
}
function undo(g) {
_.each(g.edges(), function (e) {
var label = g.edge(e);
if (label.reversed) {
g.removeEdge(e);
var forwardName = label.forwardName;
delete label.reversed;
delete label.forwardName;
g.setEdge(e.w, e.v, label, forwardName);
}
});
}
},
{
'./greedy-fas': 8,
'./lodash': 10
}
],
3: [
function (require, module, exports) {
var _ = require('./lodash'), util = require('./util');
module.exports = addBorderSegments;
function addBorderSegments(g) {
function dfs(v) {
var children = g.children(v), node = g.node(v);
if (children.length) {
_.each(children, dfs);
}
if (_.has(node, 'minRank')) {
node.borderLeft = [];
node.borderRight = [];
for (var rank = node.minRank, maxRank = node.maxRank + 1; rank < maxRank; ++rank) {
addBorderNode(g, 'borderLeft', '_bl', v, node, rank);
addBorderNode(g, 'borderRight', '_br', v, node, rank);
}
}
}
_.each(g.children(), dfs);
}
function addBorderNode(g, prop, prefix, sg, sgNode, rank) {
var label = {
width: 0,
height: 0,
rank: rank,
borderType: prop
}, prev = sgNode[prop][rank - 1], curr = util.addDummyNode(g, 'border', label, prefix);
sgNode[prop][rank] = curr;
g.setParent(curr, sg);
if (prev) {
g.setEdge(prev, curr, { weight: 1 });
}
}
},
{
'./lodash': 10,
'./util': 29
}
],
4: [
function (require, module, exports) {
'use strict';
var _ = require('./lodash');
module.exports = {
adjust: adjust,
undo: undo
};
function adjust(g) {
var rankDir = g.graph().rankdir.toLowerCase();
if (rankDir === 'lr' || rankDir === 'rl') {
swapWidthHeight(g);
}
}
function undo(g) {
var rankDir = g.graph().rankdir.toLowerCase();
if (rankDir === 'bt' || rankDir === 'rl') {
reverseY(g);
}
if (rankDir === 'lr' || rankDir === 'rl') {
swapXY(g);
swapWidthHeight(g);
}
}
function swapWidthHeight(g) {
_.each(g.nodes(), function (v) {
swapWidthHeightOne(g.node(v));
});
_.each(g.edges(), function (e) {
swapWidthHeightOne(g.edge(e));
});
}
function swapWidthHeightOne(attrs) {
var w = attrs.width;
attrs.width = attrs.height;
attrs.height = w;
}
function reverseY(g) {
_.each(g.nodes(), function (v) {
reverseYOne(g.node(v));
});
_.each(g.edges(), function (e) {
var edge = g.edge(e);
_.each(edge.points, reverseYOne);
if (_.has(edge, 'y')) {
reverseYOne(edge);
}
});
}
function reverseYOne(attrs) {
attrs.y = -attrs.y;
}
function swapXY(g) {
_.each(g.nodes(), function (v) {
swapXYOne(g.node(v));
});
_.each(g.edges(), function (e) {
var edge = g.edge(e);
_.each(edge.points, swapXYOne);
if (_.has(edge, 'x')) {
swapXYOne(edge);
}
});
}
function swapXYOne(attrs) {
var x = attrs.x;
attrs.x = attrs.y;
attrs.y = x;
}
},
{ './lodash': 10 }
],
5: [
function (require, module, exports) {
module.exports = List;
function List() {
var sentinel = {};
sentinel._next = sentinel._prev = sentinel;
this._sentinel = sentinel;
}
List.prototype.dequeue = function () {
var sentinel = this._sentinel, entry = sentinel._prev;
if (entry !== sentinel) {
unlink(entry);
return entry;
}
};
List.prototype.enqueue = function (entry) {
var sentinel = this._sentinel;
if (entry._prev && entry._next) {
unlink(entry);
}
entry._next = sentinel._next;
sentinel._next._prev = entry;
sentinel._next = entry;
entry._prev = sentinel;
};
List.prototype.toString = function () {
var strs = [], sentinel = this._sentinel, curr = sentinel._prev;
while (curr !== sentinel) {
strs.push(JSON.stringify(curr, filterOutLinks));
curr = curr._prev;
}
return '[' + strs.join(', ') + ']';
};
function unlink(entry) {
entry._prev._next = entry._next;
entry._next._prev = entry._prev;
delete entry._next;
delete entry._prev;
}
function filterOutLinks(k, v) {
if (k !== '_next' && k !== '_prev') {
return v;
}
}
},
{}
],
6: [
function (require, module, exports) {
var _ = require('./lodash'), util = require('./util'), Graph = require('./graphlib').Graph;
module.exports = { debugOrdering: debugOrdering };
function debugOrdering(g) {
var layerMatrix = util.buildLayerMatrix(g);
var h = new Graph({
compound: true,
multigraph: true
}).setGraph({});
_.each(g.nodes(), function (v) {
h.setNode(v, { label: v });
h.setParent(v, 'layer' + g.node(v).rank);
});
_.each(g.edges(), function (e) {
h.setEdge(e.v, e.w, {}, e.name);
});
_.each(layerMatrix, function (layer, i) {
var layerV = 'layer' + i;
h.setNode(layerV, { rank: 'same' });
_.reduce(layer, function (u, v) {
h.setEdge(u, v, { style: 'invis' });
return v;
});
});
return h;
}
},
{
'./graphlib': 7,
'./lodash': 10,
'./util': 29
}
],
7: [
function (require, module, exports) {
var graphlib;
if (typeof require === 'function') {
try {
graphlib = require('graphlib');
} catch (e) {
}
}
if (!graphlib) {
graphlib = window.graphlib;
}
module.exports = graphlib;
},
{ 'graphlib': undefined }
],
8: [
function (require, module, exports) {
var _ = require('./lodash'), Graph = require('./graphlib').Graph, List = require('./data/list');
module.exports = greedyFAS;
var DEFAULT_WEIGHT_FN = _.constant(1);
function greedyFAS(g, weightFn) {
if (g.nodeCount() <= 1) {
return [];
}
var state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
var results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
return _.flatten(_.map(results, function (e) {
return g.outEdges(e.v, e.w);
}), true);
}
function doGreedyFAS(g, buckets, zeroIdx) {
var results = [], sources = buckets[buckets.length - 1], sinks = buckets[0];
var entry;
while (g.nodeCount()) {
while (entry = sinks.dequeue()) {
removeNode(g, buckets, zeroIdx, entry);
}
while (entry = sources.dequeue()) {
removeNode(g, buckets, zeroIdx, entry);
}
if (g.nodeCount()) {
for (var i = buckets.length - 2; i > 0; --i) {
entry = buckets[i].dequeue();
if (entry) {
results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
break;
}
}
}
}
return results;
}
function removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
var results = collectPredecessors ? [] : undefined;
_.each(g.inEdges(entry.v), function (edge) {
var weight = g.edge(edge), uEntry = g.node(edge.v);
if (collectPredecessors) {
results.push({
v: edge.v,
w: edge.w
});
}
uEntry.out -= weight;
assignBucket(buckets, zeroIdx, uEntry);
});
_.each(g.outEdges(entry.v), function (edge) {
var weight = g.edge(edge), w = edge.w, wEntry = g.node(w);
wEntry['in'] -= weight;
assignBucket(buckets, zeroIdx, wEntry);
});
g.removeNode(entry.v);
return results;
}
function buildState(g, weightFn) {
var fasGraph = new Graph(), maxIn = 0, maxOut = 0;
_.each(g.nodes(), function (v) {
fasGraph.setNode(v, {
v: v,
'in': 0,
out: 0
});
});
_.each(g.edges(), function (e) {
var prevWeight = fasGraph.edge(e.v, e.w) || 0, weight = weightFn(e), edgeWeight = prevWeight + weight;
fasGraph.setEdge(e.v, e.w, edgeWeight);
maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
maxIn = Math.max(maxIn, fasGraph.node(e.w)['in'] += weight);
});
var buckets = _.range(maxOut + maxIn + 3).map(function () {
return new List();
});
var zeroIdx = maxIn + 1;
_.each(fasGraph.nodes(), function (v) {
assignBucket(buckets, zeroIdx, fasGraph.node(v));
});
return {
graph: fasGraph,
buckets: buckets,
zeroIdx: zeroIdx
};
}
function assignBucket(buckets, zeroIdx, entry) {
if (!entry.out) {
buckets[0].enqueue(entry);
} else if (!entry['in']) {
buckets[buckets.length - 1].enqueue(entry);
} else {
buckets[entry.out - entry['in'] + zeroIdx].enqueue(entry);
}
}
},
{
'./data/list': 5,
'./graphlib': 7,
'./lodash': 10
}
],
9: [
function (require, module, exports) {
'use strict';
var _ = require('./lodash'), acyclic = require('./acyclic'), normalize = require('./normalize'), rank = require('./rank'), normalizeRanks = require('./util').normalizeRanks, parentDummyChains = require('./parent-dummy-chains'), removeEmptyRanks = require('./util').removeEmptyRanks, nestingGraph = require('./nesting-graph'), addBorderSegments = require('./add-border-segments'), coordinateSystem = require('./coordinate-system'), order = require('./order'), position = require('./position'), util = require('./util'), Graph = require('./graphlib').Graph;
module.exports = layout;
function layout(g, opts) {
var time = opts && opts.debugTiming ? util.time : util.notime;
time('layout', function () {
var layoutGraph = time('  buildLayoutGraph', function () {
return buildLayoutGraph(g);
});
time('  runLayout', function () {
runLayout(layoutGraph, time);
});
time('  updateInputGraph', function () {
updateInputGraph(g, layoutGraph);
});
});
}
function runLayout(g, time) {
time('    makeSpaceForEdgeLabels', function () {
makeSpaceForEdgeLabels(g);
});
time('    removeSelfEdges', function () {
removeSelfEdges(g);
});
time('    acyclic', function () {
acyclic.run(g);
});
time('    nestingGraph.run', function () {
nestingGraph.run(g);
});
time('    rank', function () {
rank(util.asNonCompoundGraph(g));
});
time('    injectEdgeLabelProxies', function () {
injectEdgeLabelProxies(g);
});
time('    removeEmptyRanks', function () {
removeEmptyRanks(g);
});
time('    nestingGraph.cleanup', function () {
nestingGraph.cleanup(g);
});
time('    normalizeRanks', function () {
normalizeRanks(g);
});
time('    assignRankMinMax', function () {
assignRankMinMax(g);
});
time('    removeEdgeLabelProxies', function () {
removeEdgeLabelProxies(g);
});
time('    normalize.run', function () {
normalize.run(g);
});
time('    parentDummyChains', function () {
parentDummyChains(g);
});
time('    addBorderSegments', function () {
addBorderSegments(g);
});
time('    order', function () {
order(g);
});
time('    insertSelfEdges', function () {
insertSelfEdges(g);
});
time('    adjustCoordinateSystem', function () {
coordinateSystem.adjust(g);
});
time('    position', function () {
position(g);
});
time('    positionSelfEdges', function () {
positionSelfEdges(g);
});
time('    removeBorderNodes', function () {
removeBorderNodes(g);
});
time('    normalize.undo', function () {
normalize.undo(g);
});
time('    fixupEdgeLabelCoords', function () {
fixupEdgeLabelCoords(g);
});
time('    undoCoordinateSystem', function () {
coordinateSystem.undo(g);
});
time('    translateGraph', function () {
translateGraph(g);
});
time('    assignNodeIntersects', function () {
assignNodeIntersects(g);
});
time('    reversePoints', function () {
reversePointsForReversedEdges(g);
});
time('    acyclic.undo', function () {
acyclic.undo(g);
});
}
function updateInputGraph(inputGraph, layoutGraph) {
_.each(inputGraph.nodes(), function (v) {
var inputLabel = inputGraph.node(v), layoutLabel = layoutGraph.node(v);
if (inputLabel) {
inputLabel.x = layoutLabel.x;
inputLabel.y = layoutLabel.y;
if (layoutGraph.children(v).length) {
inputLabel.width = layoutLabel.width;
inputLabel.height = layoutLabel.height;
}
}
});
_.each(inputGraph.edges(), function (e) {
var inputLabel = inputGraph.edge(e), layoutLabel = layoutGraph.edge(e);
inputLabel.points = layoutLabel.points;
if (_.has(layoutLabel, 'x')) {
inputLabel.x = layoutLabel.x;
inputLabel.y = layoutLabel.y;
}
});
inputGraph.graph().width = layoutGraph.graph().width;
inputGraph.graph().height = layoutGraph.graph().height;
}
var graphNumAttrs = [
'nodesep',
'edgesep',
'ranksep',
'marginx',
'marginy'
], graphDefaults = {
ranksep: 50,
edgesep: 20,
nodesep: 50,
rankdir: 'tb'
}, graphAttrs = [
'acyclicer',
'ranker',
'rankdir',
'align'
], nodeNumAttrs = [
'width',
'height'
], nodeDefaults = {
width: 0,
height: 0
}, edgeNumAttrs = [
'minlen',
'weight',
'width',
'height',
'labeloffset'
], edgeDefaults = {
minlen: 1,
weight: 1,
width: 0,
height: 0,
labeloffset: 10,
labelpos: 'r'
}, edgeAttrs = ['labelpos'];
function buildLayoutGraph(inputGraph) {
var g = new Graph({
multigraph: true,
compound: true
}), graph = canonicalize(inputGraph.graph());
g.setGraph(_.merge({}, graphDefaults, selectNumberAttrs(graph, graphNumAttrs), _.pick(graph, graphAttrs)));
_.each(inputGraph.nodes(), function (v) {
var node = canonicalize(inputGraph.node(v));
g.setNode(v, _.defaults(selectNumberAttrs(node, nodeNumAttrs), nodeDefaults));
g.setParent(v, inputGraph.parent(v));
});
_.each(inputGraph.edges(), function (e) {
var edge = canonicalize(inputGraph.edge(e));
g.setEdge(e, _.merge({}, edgeDefaults, selectNumberAttrs(edge, edgeNumAttrs), _.pick(edge, edgeAttrs)));
});
return g;
}
function makeSpaceForEdgeLabels(g) {
var graph = g.graph();
graph.ranksep /= 2;
_.each(g.edges(), function (e) {
var edge = g.edge(e);
edge.minlen *= 2;
if (edge.labelpos.toLowerCase() !== 'c') {
if (graph.rankdir === 'TB' || graph.rankdir === 'BT') {
edge.width += edge.labeloffset;
} else {
edge.height += edge.labeloffset;
}
}
});
}
function injectEdgeLabelProxies(g) {
_.each(g.edges(), function (e) {
var edge = g.edge(e);
if (edge.width && edge.height) {
var v = g.node(e.v), w = g.node(e.w), label = {
rank: (w.rank - v.rank) / 2 + v.rank,
e: e
};
util.addDummyNode(g, 'edge-proxy', label, '_ep');
}
});
}
function assignRankMinMax(g) {
var maxRank = 0;
_.each(g.nodes(), function (v) {
var node = g.node(v);
if (node.borderTop) {
node.minRank = g.node(node.borderTop).rank;
node.maxRank = g.node(node.borderBottom).rank;
maxRank = _.max(maxRank, node.maxRank);
}
});
g.graph().maxRank = maxRank;
}
function removeEdgeLabelProxies(g) {
_.each(g.nodes(), function (v) {
var node = g.node(v);
if (node.dummy === 'edge-proxy') {
g.edge(node.e).labelRank = node.rank;
g.removeNode(v);
}
});
}
function translateGraph(g) {
var minX = Number.POSITIVE_INFINITY, maxX = 0, minY = Number.POSITIVE_INFINITY, maxY = 0, graphLabel = g.graph(), marginX = graphLabel.marginx || 0, marginY = graphLabel.marginy || 0;
function getExtremes(attrs) {
var x = attrs.x, y = attrs.y, w = attrs.width, h = attrs.height;
minX = Math.min(minX, x - w / 2);
maxX = Math.max(maxX, x + w / 2);
minY = Math.min(minY, y - h / 2);
maxY = Math.max(maxY, y + h / 2);
}
_.each(g.nodes(), function (v) {
getExtremes(g.node(v));
});
_.each(g.edges(), function (e) {
var edge = g.edge(e);
if (_.has(edge, 'x')) {
getExtremes(edge);
}
});
minX -= marginX;
minY -= marginY;
_.each(g.nodes(), function (v) {
var node = g.node(v);
node.x -= minX;
node.y -= minY;
});
_.each(g.edges(), function (e) {
var edge = g.edge(e);
_.each(edge.points, function (p) {
p.x -= minX;
p.y -= minY;
});
if (_.has(edge, 'x')) {
edge.x -= minX;
}
if (_.has(edge, 'y')) {
edge.y -= minY;
}
});
graphLabel.width = maxX - minX + marginX;
graphLabel.height = maxY - minY + marginY;
}
function assignNodeIntersects(g) {
_.each(g.edges(), function (e) {
var edge = g.edge(e), nodeV = g.node(e.v), nodeW = g.node(e.w), p1, p2;
if (!edge.points) {
edge.points = [];
p1 = nodeW;
p2 = nodeV;
} else {
p1 = edge.points[0];
p2 = edge.points[edge.points.length - 1];
}
edge.points.unshift(util.intersectRect(nodeV, p1));
edge.points.push(util.intersectRect(nodeW, p2));
});
}
function fixupEdgeLabelCoords(g) {
_.each(g.edges(), function (e) {
var edge = g.edge(e);
if (_.has(edge, 'x')) {
if (edge.labelpos === 'l' || edge.labelpos === 'r') {
edge.width -= edge.labeloffset;
}
switch (edge.labelpos) {
case 'l':
edge.x -= edge.width / 2 + edge.labeloffset;
break;
case 'r':
edge.x += edge.width / 2 + edge.labeloffset;
break;
}
}
});
}
function reversePointsForReversedEdges(g) {
_.each(g.edges(), function (e) {
var edge = g.edge(e);
if (edge.reversed) {
edge.points.reverse();
}
});
}
function removeBorderNodes(g) {
_.each(g.nodes(), function (v) {
if (g.children(v).length) {
var node = g.node(v), t = g.node(node.borderTop), b = g.node(node.borderBottom), l = g.node(_.last(node.borderLeft)), r = g.node(_.last(node.borderRight));
node.width = Math.abs(r.x - l.x);
node.height = Math.abs(b.y - t.y);
node.x = l.x + node.width / 2;
node.y = t.y + node.height / 2;
}
});
_.each(g.nodes(), function (v) {
if (g.node(v).dummy === 'border') {
g.removeNode(v);
}
});
}
function removeSelfEdges(g) {
_.each(g.edges(), function (e) {
if (e.v === e.w) {
var node = g.node(e.v);
if (!node.selfEdges) {
node.selfEdges = [];
}
node.selfEdges.push({
e: e,
label: g.edge(e)
});
g.removeEdge(e);
}
});
}
function insertSelfEdges(g) {
var layers = util.buildLayerMatrix(g);
_.each(layers, function (layer) {
var orderShift = 0;
_.each(layer, function (v, i) {
var node = g.node(v);
node.order = i + orderShift;
_.each(node.selfEdges, function (selfEdge) {
util.addDummyNode(g, 'selfedge', {
width: selfEdge.label.width,
height: selfEdge.label.height,
rank: node.rank,
order: i + ++orderShift,
e: selfEdge.e,
label: selfEdge.label
}, '_se');
});
delete node.selfEdges;
});
});
}
function positionSelfEdges(g) {
_.each(g.nodes(), function (v) {
var node = g.node(v);
if (node.dummy === 'selfedge') {
var selfNode = g.node(node.e.v), x = selfNode.x + selfNode.width / 2, y = selfNode.y, dx = node.x - x, dy = selfNode.height / 2;
g.setEdge(node.e, node.label);
g.removeNode(v);
node.label.points = [
{
x: x + 2 * dx / 3,
y: y - dy
},
{
x: x + 5 * dx / 6,
y: y - dy
},
{
x: x + dx,
y: y
},
{
x: x + 5 * dx / 6,
y: y + dy
},
{
x: x + 2 * dx / 3,
y: y + dy
}
];
node.label.x = node.x;
node.label.y = node.y;
}
});
}
function selectNumberAttrs(obj, attrs) {
return _.mapValues(_.pick(obj, attrs), Number);
}
function canonicalize(attrs) {
var newAttrs = {};
_.each(attrs, function (v, k) {
newAttrs[k.toLowerCase()] = v;
});
return newAttrs;
}
},
{
'./acyclic': 2,
'./add-border-segments': 3,
'./coordinate-system': 4,
'./graphlib': 7,
'./lodash': 10,
'./nesting-graph': 11,
'./normalize': 12,
'./order': 17,
'./parent-dummy-chains': 22,
'./position': 24,
'./rank': 26,
'./util': 29
}
],
10: [
function (require, module, exports) {
var lodash;
if (typeof require === 'function') {
try {
lodash = require('lodash');
} catch (e) {
}
}
if (!lodash) {
lodash = window._;
}
module.exports = lodash;
},
{ 'lodash': undefined }
],
11: [
function (require, module, exports) {
var _ = require('./lodash'), util = require('./util');
module.exports = {
run: run,
cleanup: cleanup
};
function run(g) {
var root = util.addDummyNode(g, 'root', {}, '_root'), depths = treeDepths(g), height = _.max(depths) - 1, nodeSep = 2 * height + 1;
g.graph().nestingRoot = root;
_.each(g.edges(), function (e) {
g.edge(e).minlen *= nodeSep;
});
var weight = sumWeights(g) + 1;
_.each(g.children(), function (child) {
dfs(g, root, nodeSep, weight, height, depths, child);
});
g.graph().nodeRankFactor = nodeSep;
}
function dfs(g, root, nodeSep, weight, height, depths, v) {
var children = g.children(v);
if (!children.length) {
if (v !== root) {
g.setEdge(root, v, {
weight: 0,
minlen: nodeSep
});
}
return;
}
var top = util.addBorderNode(g, '_bt'), bottom = util.addBorderNode(g, '_bb'), label = g.node(v);
g.setParent(top, v);
label.borderTop = top;
g.setParent(bottom, v);
label.borderBottom = bottom;
_.each(children, function (child) {
dfs(g, root, nodeSep, weight, height, depths, child);
var childNode = g.node(child), childTop = childNode.borderTop ? childNode.borderTop : child, childBottom = childNode.borderBottom ? childNode.borderBottom : child, thisWeight = childNode.borderTop ? weight : 2 * weight, minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
g.setEdge(top, childTop, {
weight: thisWeight,
minlen: minlen,
nestingEdge: true
});
g.setEdge(childBottom, bottom, {
weight: thisWeight,
minlen: minlen,
nestingEdge: true
});
});
if (!g.parent(v)) {
g.setEdge(root, top, {
weight: 0,
minlen: height + depths[v]
});
}
}
function treeDepths(g) {
var depths = {};
function dfs(v, depth) {
var children = g.children(v);
if (children && children.length) {
_.each(children, function (child) {
dfs(child, depth + 1);
});
}
depths[v] = depth;
}
_.each(g.children(), function (v) {
dfs(v, 1);
});
return depths;
}
function sumWeights(g) {
return _.reduce(g.edges(), function (acc, e) {
return acc + g.edge(e).weight;
}, 0);
}
function cleanup(g) {
var graphLabel = g.graph();
g.removeNode(graphLabel.nestingRoot);
delete graphLabel.nestingRoot;
_.each(g.edges(), function (e) {
var edge = g.edge(e);
if (edge.nestingEdge) {
g.removeEdge(e);
}
});
}
},
{
'./lodash': 10,
'./util': 29
}
],
12: [
function (require, module, exports) {
'use strict';
var _ = require('./lodash'), util = require('./util');
module.exports = {
run: run,
undo: undo
};
function run(g) {
g.graph().dummyChains = [];
_.each(g.edges(), function (edge) {
normalizeEdge(g, edge);
});
}
function normalizeEdge(g, e) {
var v = e.v, vRank = g.node(v).rank, w = e.w, wRank = g.node(w).rank, name = e.name, edgeLabel = g.edge(e), labelRank = edgeLabel.labelRank;
if (wRank === vRank + 1)
return;
g.removeEdge(e);
var dummy, attrs, i;
for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
edgeLabel.points = [];
attrs = {
width: 0,
height: 0,
edgeLabel: edgeLabel,
edgeObj: e,
rank: vRank
};
dummy = util.addDummyNode(g, 'edge', attrs, '_d');
if (vRank === labelRank) {
attrs.width = edgeLabel.width;
attrs.height = edgeLabel.height;
attrs.dummy = 'edge-label';
attrs.labelpos = edgeLabel.labelpos;
}
g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
if (i === 0) {
g.graph().dummyChains.push(dummy);
}
v = dummy;
}
g.setEdge(v, w, { weight: edgeLabel.weight }, name);
}
function undo(g) {
_.each(g.graph().dummyChains, function (v) {
var node = g.node(v), origLabel = node.edgeLabel, w;
g.setEdge(node.edgeObj, origLabel);
while (node.dummy) {
w = g.successors(v)[0];
g.removeNode(v);
origLabel.points.push({
x: node.x,
y: node.y
});
if (node.dummy === 'edge-label') {
origLabel.x = node.x;
origLabel.y = node.y;
origLabel.width = node.width;
origLabel.height = node.height;
}
v = w;
node = g.node(v);
}
});
}
},
{
'./lodash': 10,
'./util': 29
}
],
13: [
function (require, module, exports) {
var _ = require('../lodash');
module.exports = addSubgraphConstraints;
function addSubgraphConstraints(g, cg, vs) {
var prev = {}, rootPrev;
_.each(vs, function (v) {
var child = g.parent(v), parent, prevChild;
while (child) {
parent = g.parent(child);
if (parent) {
prevChild = prev[parent];
prev[parent] = child;
} else {
prevChild = rootPrev;
rootPrev = child;
}
if (prevChild && prevChild !== child) {
cg.setEdge(prevChild, child);
return;
}
child = parent;
}
});
}
},
{ '../lodash': 10 }
],
14: [
function (require, module, exports) {
var _ = require('../lodash');
module.exports = barycenter;
function barycenter(g, movable) {
return _.map(movable, function (v) {
var inV = g.inEdges(v);
if (!inV.length) {
return { v: v };
} else {
var result = _.reduce(inV, function (acc, e) {
var edge = g.edge(e), nodeU = g.node(e.v);
return {
sum: acc.sum + edge.weight * nodeU.order,
weight: acc.weight + edge.weight
};
}, {
sum: 0,
weight: 0
});
return {
v: v,
barycenter: result.sum / result.weight,
weight: result.weight
};
}
});
}
},
{ '../lodash': 10 }
],
15: [
function (require, module, exports) {
var _ = require('../lodash'), Graph = require('../graphlib').Graph;
module.exports = buildLayerGraph;
function buildLayerGraph(g, rank, relationship) {
var root = createRootNode(g), result = new Graph({ compound: true }).setGraph({ root: root }).setDefaultNodeLabel(function (v) {
return g.node(v);
});
_.each(g.nodes(), function (v) {
var node = g.node(v), parent = g.parent(v);
if (node.rank === rank || node.minRank <= rank && rank <= node.maxRank) {
result.setNode(v);
result.setParent(v, parent || root);
_.each(g[relationship](v), function (e) {
var u = e.v === v ? e.w : e.v, edge = result.edge(u, v), weight = !_.isUndefined(edge) ? edge.weight : 0;
result.setEdge(u, v, { weight: g.edge(e).weight + weight });
});
if (_.has(node, 'minRank')) {
result.setNode(v, {
borderLeft: node.borderLeft[rank],
borderRight: node.borderRight[rank]
});
}
}
});
return result;
}
function createRootNode(g) {
var v;
while (g.hasNode(v = _.uniqueId('_root')));
return v;
}
},
{
'../graphlib': 7,
'../lodash': 10
}
],
16: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash');
module.exports = crossCount;
function crossCount(g, layering) {
var cc = 0;
for (var i = 1; i < layering.length; ++i) {
cc += twoLayerCrossCount(g, layering[i - 1], layering[i]);
}
return cc;
}
function twoLayerCrossCount(g, northLayer, southLayer) {
var southPos = _.zipObject(southLayer, _.map(southLayer, function (v, i) {
return i;
}));
var southEntries = _.flatten(_.map(northLayer, function (v) {
return _.chain(g.outEdges(v)).map(function (e) {
return {
pos: southPos[e.w],
weight: g.edge(e).weight
};
}).sortBy('pos').value();
}), true);
var firstIndex = 1;
while (firstIndex < southLayer.length)
firstIndex <<= 1;
var treeSize = 2 * firstIndex - 1;
firstIndex -= 1;
var tree = _.map(new Array(treeSize), function () {
return 0;
});
var cc = 0;
_.each(southEntries.forEach(function (entry) {
var index = entry.pos + firstIndex;
tree[index] += entry.weight;
var weightSum = 0;
while (index > 0) {
if (index % 2) {
weightSum += tree[index + 1];
}
index = index - 1 >> 1;
tree[index] += entry.weight;
}
cc += entry.weight * weightSum;
}));
return cc;
}
},
{ '../lodash': 10 }
],
17: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash'), initOrder = require('./init-order'), crossCount = require('./cross-count'), sortSubgraph = require('./sort-subgraph'), buildLayerGraph = require('./build-layer-graph'), addSubgraphConstraints = require('./add-subgraph-constraints'), Graph = require('../graphlib').Graph, util = require('../util');
module.exports = order;
function order(g) {
var maxRank = util.maxRank(g), downLayerGraphs = buildLayerGraphs(g, _.range(1, maxRank + 1), 'inEdges'), upLayerGraphs = buildLayerGraphs(g, _.range(maxRank - 1, -1, -1), 'outEdges');
var layering = initOrder(g);
assignOrder(g, layering);
var bestCC = Number.POSITIVE_INFINITY, best;
for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);
layering = util.buildLayerMatrix(g);
var cc = crossCount(g, layering);
if (cc < bestCC) {
lastBest = 0;
best = _.cloneDeep(layering);
bestCC = cc;
}
}
assignOrder(g, best);
}
function buildLayerGraphs(g, ranks, relationship) {
return _.map(ranks, function (rank) {
return buildLayerGraph(g, rank, relationship);
});
}
function sweepLayerGraphs(layerGraphs, biasRight) {
var cg = new Graph();
_.each(layerGraphs, function (lg) {
var root = lg.graph().root;
var sorted = sortSubgraph(lg, root, cg, biasRight);
_.each(sorted.vs, function (v, i) {
lg.node(v).order = i;
});
addSubgraphConstraints(lg, cg, sorted.vs);
});
}
function assignOrder(g, layering) {
_.each(layering, function (layer) {
_.each(layer, function (v, i) {
g.node(v).order = i;
});
});
}
},
{
'../graphlib': 7,
'../lodash': 10,
'../util': 29,
'./add-subgraph-constraints': 13,
'./build-layer-graph': 15,
'./cross-count': 16,
'./init-order': 18,
'./sort-subgraph': 20
}
],
18: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash');
module.exports = initOrder;
function initOrder(g) {
var visited = {}, simpleNodes = _.filter(g.nodes(), function (v) {
return !g.children(v).length;
}), maxRank = _.max(_.map(simpleNodes, function (v) {
return g.node(v).rank;
})), layers = _.map(_.range(maxRank + 1), function () {
return [];
});
function dfs(v) {
if (_.has(visited, v))
return;
visited[v] = true;
var node = g.node(v);
layers[node.rank].push(v);
_.each(g.successors(v), dfs);
}
var orderedVs = _.sortBy(simpleNodes, function (v) {
return g.node(v).rank;
});
_.each(orderedVs, dfs);
return layers;
}
},
{ '../lodash': 10 }
],
19: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash');
module.exports = resolveConflicts;
function resolveConflicts(entries, cg) {
var mappedEntries = {};
_.each(entries, function (entry, i) {
var tmp = mappedEntries[entry.v] = {
indegree: 0,
'in': [],
out: [],
vs: [entry.v],
i: i
};
if (!_.isUndefined(entry.barycenter)) {
tmp.barycenter = entry.barycenter;
tmp.weight = entry.weight;
}
});
_.each(cg.edges(), function (e) {
var entryV = mappedEntries[e.v], entryW = mappedEntries[e.w];
if (!_.isUndefined(entryV) && !_.isUndefined(entryW)) {
entryW.indegree++;
entryV.out.push(mappedEntries[e.w]);
}
});
var sourceSet = _.filter(mappedEntries, function (entry) {
return !entry.indegree;
});
return doResolveConflicts(sourceSet);
}
function doResolveConflicts(sourceSet) {
var entries = [];
function handleIn(vEntry) {
return function (uEntry) {
if (uEntry.merged) {
return;
}
if (_.isUndefined(uEntry.barycenter) || _.isUndefined(vEntry.barycenter) || uEntry.barycenter >= vEntry.barycenter) {
mergeEntries(vEntry, uEntry);
}
};
}
function handleOut(vEntry) {
return function (wEntry) {
wEntry['in'].push(vEntry);
if (--wEntry.indegree === 0) {
sourceSet.push(wEntry);
}
};
}
while (sourceSet.length) {
var entry = sourceSet.pop();
entries.push(entry);
_.each(entry['in'].reverse(), handleIn(entry));
_.each(entry.out, handleOut(entry));
}
return _.chain(entries).filter(function (entry) {
return !entry.merged;
}).map(function (entry) {
return _.pick(entry, [
'vs',
'i',
'barycenter',
'weight'
]);
}).value();
}
function mergeEntries(target, source) {
var sum = 0, weight = 0;
if (target.weight) {
sum += target.barycenter * target.weight;
weight += target.weight;
}
if (source.weight) {
sum += source.barycenter * source.weight;
weight += source.weight;
}
target.vs = source.vs.concat(target.vs);
target.barycenter = sum / weight;
target.weight = weight;
target.i = Math.min(source.i, target.i);
source.merged = true;
}
},
{ '../lodash': 10 }
],
20: [
function (require, module, exports) {
var _ = require('../lodash'), barycenter = require('./barycenter'), resolveConflicts = require('./resolve-conflicts'), sort = require('./sort');
module.exports = sortSubgraph;
function sortSubgraph(g, v, cg, biasRight) {
var movable = g.children(v), node = g.node(v), bl = node ? node.borderLeft : undefined, br = node ? node.borderRight : undefined, subgraphs = {};
if (bl) {
movable = _.filter(movable, function (w) {
return w !== bl && w !== br;
});
}
var barycenters = barycenter(g, movable);
_.each(barycenters, function (entry) {
if (g.children(entry.v).length) {
var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
subgraphs[entry.v] = subgraphResult;
if (_.has(subgraphResult, 'barycenter')) {
mergeBarycenters(entry, subgraphResult);
}
}
});
var entries = resolveConflicts(barycenters, cg);
expandSubgraphs(entries, subgraphs);
var result = sort(entries, biasRight);
if (bl) {
result.vs = _.flatten([
bl,
result.vs,
br
], true);
if (g.predecessors(bl).length) {
var blPred = g.node(g.predecessors(bl)[0]), brPred = g.node(g.predecessors(br)[0]);
if (!_.has(result, 'barycenter')) {
result.barycenter = 0;
result.weight = 0;
}
result.barycenter = (result.barycenter * result.weight + blPred.order + brPred.order) / (result.weight + 2);
result.weight += 2;
}
}
return result;
}
function expandSubgraphs(entries, subgraphs) {
_.each(entries, function (entry) {
entry.vs = _.flatten(entry.vs.map(function (v) {
if (subgraphs[v]) {
return subgraphs[v].vs;
}
return v;
}), true);
});
}
function mergeBarycenters(target, other) {
if (!_.isUndefined(target.barycenter)) {
target.barycenter = (target.barycenter * target.weight + other.barycenter * other.weight) / (target.weight + other.weight);
target.weight += other.weight;
} else {
target.barycenter = other.barycenter;
target.weight = other.weight;
}
}
},
{
'../lodash': 10,
'./barycenter': 14,
'./resolve-conflicts': 19,
'./sort': 21
}
],
21: [
function (require, module, exports) {
var _ = require('../lodash'), util = require('../util');
module.exports = sort;
function sort(entries, biasRight) {
var parts = util.partition(entries, function (entry) {
return _.has(entry, 'barycenter');
});
var sortable = parts.lhs, unsortable = _.sortBy(parts.rhs, function (entry) {
return -entry.i;
}), vs = [], sum = 0, weight = 0, vsIndex = 0;
sortable.sort(compareWithBias(!!biasRight));
vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
_.each(sortable, function (entry) {
vsIndex += entry.vs.length;
vs.push(entry.vs);
sum += entry.barycenter * entry.weight;
weight += entry.weight;
vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
});
var result = { vs: _.flatten(vs, true) };
if (weight) {
result.barycenter = sum / weight;
result.weight = weight;
}
return result;
}
function consumeUnsortable(vs, unsortable, index) {
var last;
while (unsortable.length && (last = _.last(unsortable)).i <= index) {
unsortable.pop();
vs.push(last.vs);
index++;
}
return index;
}
function compareWithBias(bias) {
return function (entryV, entryW) {
if (entryV.barycenter < entryW.barycenter) {
return -1;
} else if (entryV.barycenter > entryW.barycenter) {
return 1;
}
return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
};
}
},
{
'../lodash': 10,
'../util': 29
}
],
22: [
function (require, module, exports) {
var _ = require('./lodash');
module.exports = parentDummyChains;
function parentDummyChains(g) {
var postorderNums = postorder(g);
_.each(g.graph().dummyChains, function (v) {
var node = g.node(v), edgeObj = node.edgeObj, pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w), path = pathData.path, lca = pathData.lca, pathIdx = 0, pathV = path[pathIdx], ascending = true;
while (v !== edgeObj.w) {
node = g.node(v);
if (ascending) {
while ((pathV = path[pathIdx]) !== lca && g.node(pathV).maxRank < node.rank) {
pathIdx++;
}
if (pathV === lca) {
ascending = false;
}
}
if (!ascending) {
while (pathIdx < path.length - 1 && g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
pathIdx++;
}
pathV = path[pathIdx];
}
g.setParent(v, pathV);
v = g.successors(v)[0];
}
});
}
function findPath(g, postorderNums, v, w) {
var vPath = [], wPath = [], low = Math.min(postorderNums[v].low, postorderNums[w].low), lim = Math.max(postorderNums[v].lim, postorderNums[w].lim), parent, lca;
parent = v;
do {
parent = g.parent(parent);
vPath.push(parent);
} while (parent && (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
lca = parent;
parent = w;
while ((parent = g.parent(parent)) !== lca) {
wPath.push(parent);
}
return {
path: vPath.concat(wPath.reverse()),
lca: lca
};
}
function postorder(g) {
var result = {}, lim = 0;
function dfs(v) {
var low = lim;
_.each(g.children(v), dfs);
result[v] = {
low: low,
lim: lim++
};
}
_.each(g.children(), dfs);
return result;
}
},
{ './lodash': 10 }
],
23: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash'), Graph = require('../graphlib').Graph, util = require('../util');
module.exports = {
positionX: positionX,
findType1Conflicts: findType1Conflicts,
findType2Conflicts: findType2Conflicts,
addConflict: addConflict,
hasConflict: hasConflict,
verticalAlignment: verticalAlignment,
horizontalCompaction: horizontalCompaction,
alignCoordinates: alignCoordinates,
findSmallestWidthAlignment: findSmallestWidthAlignment,
balance: balance
};
function findType1Conflicts(g, layering) {
var conflicts = {};
function visitLayer(prevLayer, layer) {
var k0 = 0, scanPos = 0, prevLayerLength = prevLayer.length, lastNode = _.last(layer);
_.each(layer, function (v, i) {
var w = findOtherInnerSegmentNode(g, v), k1 = w ? g.node(w).order : prevLayerLength;
if (w || v === lastNode) {
_.each(layer.slice(scanPos, i + 1), function (scanNode) {
_.each(g.predecessors(scanNode), function (u) {
var uLabel = g.node(u), uPos = uLabel.order;
if ((uPos < k0 || k1 < uPos) && !(uLabel.dummy && g.node(scanNode).dummy)) {
addConflict(conflicts, u, scanNode);
}
});
});
scanPos = i + 1;
k0 = k1;
}
});
return layer;
}
_.reduce(layering, visitLayer);
return conflicts;
}
function findType2Conflicts(g, layering) {
var conflicts = {};
function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
var v;
_.each(_.range(southPos, southEnd), function (i) {
v = south[i];
if (g.node(v).dummy) {
_.each(g.predecessors(v), function (u) {
var uNode = g.node(u);
if (uNode.dummy && (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
addConflict(conflicts, u, v);
}
});
}
});
}
function visitLayer(north, south) {
var prevNorthPos = -1, nextNorthPos, southPos = 0;
_.each(south, function (v, southLookahead) {
if (g.node(v).dummy === 'border') {
var predecessors = g.predecessors(v);
if (predecessors.length) {
nextNorthPos = g.node(predecessors[0]).order;
scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
southPos = southLookahead;
prevNorthPos = nextNorthPos;
}
}
scan(south, southPos, south.length, nextNorthPos, north.length);
});
return south;
}
_.reduce(layering, visitLayer);
return conflicts;
}
function findOtherInnerSegmentNode(g, v) {
if (g.node(v).dummy) {
return _.find(g.predecessors(v), function (u) {
return g.node(u).dummy;
});
}
}
function addConflict(conflicts, v, w) {
if (v > w) {
var tmp = v;
v = w;
w = tmp;
}
var conflictsV = conflicts[v];
if (!conflictsV) {
conflicts[v] = conflictsV = {};
}
conflictsV[w] = true;
}
function hasConflict(conflicts, v, w) {
if (v > w) {
var tmp = v;
v = w;
w = tmp;
}
return _.has(conflicts[v], w);
}
function verticalAlignment(g, layering, conflicts, neighborFn) {
var root = {}, align = {}, pos = {};
_.each(layering, function (layer) {
_.each(layer, function (v, order) {
root[v] = v;
align[v] = v;
pos[v] = order;
});
});
_.each(layering, function (layer) {
var prevIdx = -1;
_.each(layer, function (v) {
var ws = neighborFn(v);
if (ws.length) {
ws = _.sortBy(ws, function (w) {
return pos[w];
});
var mp = (ws.length - 1) / 2;
for (var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
var w = ws[i];
if (align[v] === v && prevIdx < pos[w] && !hasConflict(conflicts, v, w)) {
align[w] = v;
align[v] = root[v] = root[w];
prevIdx = pos[w];
}
}
}
});
});
return {
root: root,
align: align
};
}
function horizontalCompaction(g, layering, root, align, reverseSep) {
var xs = {}, blockG = buildBlockGraph(g, layering, root, reverseSep);
var visited = {};
function pass1(v) {
if (!_.has(visited, v)) {
visited[v] = true;
xs[v] = _.reduce(blockG.inEdges(v), function (max, e) {
pass1(e.v);
return Math.max(max, xs[e.v] + blockG.edge(e));
}, 0);
}
}
_.each(blockG.nodes(), pass1);
var borderType = reverseSep ? 'borderLeft' : 'borderRight';
function pass2(v) {
if (visited[v] !== 2) {
visited[v]++;
var node = g.node(v);
var min = _.reduce(blockG.outEdges(v), function (min, e) {
pass2(e.w);
return Math.min(min, xs[e.w] - blockG.edge(e));
}, Number.POSITIVE_INFINITY);
if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
xs[v] = Math.max(xs[v], min);
}
}
}
_.each(blockG.nodes(), pass2);
_.each(align, function (v) {
xs[v] = xs[root[v]];
});
return xs;
}
function buildBlockGraph(g, layering, root, reverseSep) {
var blockGraph = new Graph(), graphLabel = g.graph(), sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
_.each(layering, function (layer) {
var u;
_.each(layer, function (v) {
var vRoot = root[v];
blockGraph.setNode(vRoot);
if (u) {
var uRoot = root[u], prevMax = blockGraph.edge(uRoot, vRoot);
blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
}
u = v;
});
});
return blockGraph;
}
function findSmallestWidthAlignment(g, xss) {
return _.min(xss, function (xs) {
var min = _.min(xs, function (x, v) {
return x - width(g, v) / 2;
}), max = _.max(xs, function (x, v) {
return x + width(g, v) / 2;
});
return max - min;
});
}
function alignCoordinates(xss, alignTo) {
var alignToMin = _.min(alignTo), alignToMax = _.max(alignTo);
_.each([
'u',
'd'
], function (vert) {
_.each([
'l',
'r'
], function (horiz) {
var alignment = vert + horiz, xs = xss[alignment], delta;
if (xs === alignTo)
return;
delta = horiz === 'l' ? alignToMin - _.min(xs) : alignToMax - _.max(xs);
if (delta) {
xss[alignment] = _.mapValues(xs, function (x) {
return x + delta;
});
}
});
});
}
function balance(xss, align) {
return _.mapValues(xss.ul, function (ignore, v) {
if (align) {
return xss[align.toLowerCase()][v];
} else {
var xs = _.sortBy(_.pluck(xss, v));
return (xs[1] + xs[2]) / 2;
}
});
}
function positionX(g) {
var layering = util.buildLayerMatrix(g), conflicts = _.merge(findType1Conflicts(g, layering), findType2Conflicts(g, layering));
var xss = {}, adjustedLayering;
_.each([
'u',
'd'
], function (vert) {
adjustedLayering = vert === 'u' ? layering : _.values(layering).reverse();
_.each([
'l',
'r'
], function (horiz) {
if (horiz === 'r') {
adjustedLayering = _.map(adjustedLayering, function (inner) {
return _.values(inner).reverse();
});
}
var neighborFn = _.bind(vert === 'u' ? g.predecessors : g.successors, g);
var align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
var xs = horizontalCompaction(g, adjustedLayering, align.root, align.align, horiz === 'r');
if (horiz === 'r') {
xs = _.mapValues(xs, function (x) {
return -x;
});
}
xss[vert + horiz] = xs;
});
});
var smallestWidth = findSmallestWidthAlignment(g, xss);
alignCoordinates(xss, smallestWidth);
return balance(xss, g.graph().align);
}
function sep(nodeSep, edgeSep, reverseSep) {
return function (g, v, w) {
var vLabel = g.node(v), wLabel = g.node(w), sum = 0, delta;
sum += vLabel.width / 2;
if (_.has(vLabel, 'labelpos')) {
switch (vLabel.labelpos.toLowerCase()) {
case 'l':
delta = -vLabel.width / 2;
break;
case 'r':
delta = vLabel.width / 2;
break;
}
}
if (delta) {
sum += reverseSep ? delta : -delta;
}
delta = 0;
sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;
sum += wLabel.width / 2;
if (_.has(wLabel, 'labelpos')) {
switch (wLabel.labelpos.toLowerCase()) {
case 'l':
delta = wLabel.width / 2;
break;
case 'r':
delta = -wLabel.width / 2;
break;
}
}
if (delta) {
sum += reverseSep ? delta : -delta;
}
delta = 0;
return sum;
};
}
function width(g, v) {
return g.node(v).width;
}
},
{
'../graphlib': 7,
'../lodash': 10,
'../util': 29
}
],
24: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash'), util = require('../util'), positionX = require('./bk').positionX;
module.exports = position;
function position(g) {
g = util.asNonCompoundGraph(g);
positionY(g);
_.each(positionX(g), function (x, v) {
g.node(v).x = x;
});
}
function positionY(g) {
var layering = util.buildLayerMatrix(g), rankSep = g.graph().ranksep, prevY = 0;
_.each(layering, function (layer) {
var maxHeight = _.max(_.map(layer, function (v) {
return g.node(v).height;
}));
_.each(layer, function (v) {
g.node(v).y = prevY + maxHeight / 2;
});
prevY += maxHeight + rankSep;
});
}
},
{
'../lodash': 10,
'../util': 29,
'./bk': 23
}
],
25: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash'), Graph = require('../graphlib').Graph, slack = require('./util').slack;
module.exports = feasibleTree;
function feasibleTree(g) {
var t = new Graph({ directed: false });
var start = g.nodes()[0], size = g.nodeCount();
t.setNode(start, {});
var edge, delta;
while (tightTree(t, g) < size) {
edge = findMinSlackEdge(t, g);
delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
shiftRanks(t, g, delta);
}
return t;
}
function tightTree(t, g) {
function dfs(v) {
_.each(g.nodeEdges(v), function (e) {
var edgeV = e.v, w = v === edgeV ? e.w : edgeV;
if (!t.hasNode(w) && !slack(g, e)) {
t.setNode(w, {});
t.setEdge(v, w, {});
dfs(w);
}
});
}
_.each(t.nodes(), dfs);
return t.nodeCount();
}
function findMinSlackEdge(t, g) {
return _.min(g.edges(), function (e) {
if (t.hasNode(e.v) !== t.hasNode(e.w)) {
return slack(g, e);
}
});
}
function shiftRanks(t, g, delta) {
_.each(t.nodes(), function (v) {
g.node(v).rank += delta;
});
}
},
{
'../graphlib': 7,
'../lodash': 10,
'./util': 28
}
],
26: [
function (require, module, exports) {
'use strict';
var rankUtil = require('./util'), longestPath = rankUtil.longestPath, feasibleTree = require('./feasible-tree'), networkSimplex = require('./network-simplex');
module.exports = rank;
function rank(g) {
switch (g.graph().ranker) {
case 'network-simplex':
networkSimplexRanker(g);
break;
case 'tight-tree':
tightTreeRanker(g);
break;
case 'longest-path':
longestPathRanker(g);
break;
default:
networkSimplexRanker(g);
}
}
var longestPathRanker = longestPath;
function tightTreeRanker(g) {
longestPath(g);
feasibleTree(g);
}
function networkSimplexRanker(g) {
networkSimplex(g);
}
},
{
'./feasible-tree': 25,
'./network-simplex': 27,
'./util': 28
}
],
27: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash'), feasibleTree = require('./feasible-tree'), slack = require('./util').slack, initRank = require('./util').longestPath, preorder = require('../graphlib').alg.preorder, postorder = require('../graphlib').alg.postorder, simplify = require('../util').simplify;
module.exports = networkSimplex;
networkSimplex.initLowLimValues = initLowLimValues;
networkSimplex.initCutValues = initCutValues;
networkSimplex.calcCutValue = calcCutValue;
networkSimplex.leaveEdge = leaveEdge;
networkSimplex.enterEdge = enterEdge;
networkSimplex.exchangeEdges = exchangeEdges;
function networkSimplex(g) {
g = simplify(g);
initRank(g);
var t = feasibleTree(g);
initLowLimValues(t);
initCutValues(t, g);
var e, f;
while (e = leaveEdge(t)) {
f = enterEdge(t, g, e);
exchangeEdges(t, g, e, f);
}
}
function initCutValues(t, g) {
var vs = postorder(t, t.nodes());
vs = vs.slice(0, vs.length - 1);
_.each(vs, function (v) {
assignCutValue(t, g, v);
});
}
function assignCutValue(t, g, child) {
var childLab = t.node(child), parent = childLab.parent;
t.edge(child, parent).cutvalue = calcCutValue(t, g, child);
}
function calcCutValue(t, g, child) {
var childLab = t.node(child), parent = childLab.parent, childIsTail = true, graphEdge = g.edge(child, parent), cutValue = 0;
if (!graphEdge) {
childIsTail = false;
graphEdge = g.edge(parent, child);
}
cutValue = graphEdge.weight;
_.each(g.nodeEdges(child), function (e) {
var isOutEdge = e.v === child, other = isOutEdge ? e.w : e.v;
if (other !== parent) {
var pointsToHead = isOutEdge === childIsTail, otherWeight = g.edge(e).weight;
cutValue += pointsToHead ? otherWeight : -otherWeight;
if (isTreeEdge(t, child, other)) {
var otherCutValue = t.edge(child, other).cutvalue;
cutValue += pointsToHead ? -otherCutValue : otherCutValue;
}
}
});
return cutValue;
}
function initLowLimValues(tree, root) {
if (arguments.length < 2) {
root = tree.nodes()[0];
}
dfsAssignLowLim(tree, {}, 1, root);
}
function dfsAssignLowLim(tree, visited, nextLim, v, parent) {
var low = nextLim, label = tree.node(v);
visited[v] = true;
_.each(tree.neighbors(v), function (w) {
if (!_.has(visited, w)) {
nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
}
});
label.low = low;
label.lim = nextLim++;
if (parent) {
label.parent = parent;
} else {
delete label.parent;
}
return nextLim;
}
function leaveEdge(tree) {
return _.find(tree.edges(), function (e) {
return tree.edge(e).cutvalue < 0;
});
}
function enterEdge(t, g, edge) {
var v = edge.v, w = edge.w;
if (!g.hasEdge(v, w)) {
v = edge.w;
w = edge.v;
}
var vLabel = t.node(v), wLabel = t.node(w), tailLabel = vLabel, flip = false;
if (vLabel.lim > wLabel.lim) {
tailLabel = wLabel;
flip = true;
}
var candidates = _.filter(g.edges(), function (edge) {
return flip === isDescendant(t, t.node(edge.v), tailLabel) && flip !== isDescendant(t, t.node(edge.w), tailLabel);
});
return _.min(candidates, function (edge) {
return slack(g, edge);
});
}
function exchangeEdges(t, g, e, f) {
var v = e.v, w = e.w;
t.removeEdge(v, w);
t.setEdge(f.v, f.w, {});
initLowLimValues(t);
initCutValues(t, g);
updateRanks(t, g);
}
function updateRanks(t, g) {
var root = _.find(t.nodes(), function (v) {
return !g.node(v).parent;
}), vs = preorder(t, root);
vs = vs.slice(1);
_.each(vs, function (v) {
var parent = t.node(v).parent, edge = g.edge(v, parent), flipped = false;
if (!edge) {
edge = g.edge(parent, v);
flipped = true;
}
g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
});
}
function isTreeEdge(tree, u, v) {
return tree.hasEdge(u, v);
}
function isDescendant(tree, vLabel, rootLabel) {
return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
}
},
{
'../graphlib': 7,
'../lodash': 10,
'../util': 29,
'./feasible-tree': 25,
'./util': 28
}
],
28: [
function (require, module, exports) {
'use strict';
var _ = require('../lodash');
module.exports = {
longestPath: longestPath,
slack: slack
};
function longestPath(g) {
var visited = {};
function dfs(v) {
var label = g.node(v);
if (_.has(visited, v)) {
return label.rank;
}
visited[v] = true;
var rank = _.min(_.map(g.outEdges(v), function (e) {
return dfs(e.w) - g.edge(e).minlen;
}));
if (rank === Number.POSITIVE_INFINITY) {
rank = 0;
}
return label.rank = rank;
}
_.each(g.sources(), dfs);
}
function slack(g, e) {
return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
}
},
{ '../lodash': 10 }
],
29: [
function (require, module, exports) {
'use strict';
var _ = require('./lodash'), Graph = require('./graphlib').Graph;
module.exports = {
addDummyNode: addDummyNode,
simplify: simplify,
asNonCompoundGraph: asNonCompoundGraph,
successorWeights: successorWeights,
predecessorWeights: predecessorWeights,
intersectRect: intersectRect,
buildLayerMatrix: buildLayerMatrix,
normalizeRanks: normalizeRanks,
removeEmptyRanks: removeEmptyRanks,
addBorderNode: addBorderNode,
maxRank: maxRank,
partition: partition,
time: time,
notime: notime
};
function addDummyNode(g, type, attrs, name) {
var v;
do {
v = _.uniqueId(name);
} while (g.hasNode(v));
attrs.dummy = type;
g.setNode(v, attrs);
return v;
}
function simplify(g) {
var simplified = new Graph().setGraph(g.graph());
_.each(g.nodes(), function (v) {
simplified.setNode(v, g.node(v));
});
_.each(g.edges(), function (e) {
var simpleLabel = simplified.edge(e.v, e.w) || {
weight: 0,
minlen: 1
}, label = g.edge(e);
simplified.setEdge(e.v, e.w, {
weight: simpleLabel.weight + label.weight,
minlen: Math.max(simpleLabel.minlen, label.minlen)
});
});
return simplified;
}
function asNonCompoundGraph(g) {
var simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
_.each(g.nodes(), function (v) {
if (!g.children(v).length) {
simplified.setNode(v, g.node(v));
}
});
_.each(g.edges(), function (e) {
simplified.setEdge(e, g.edge(e));
});
return simplified;
}
function successorWeights(g) {
var weightMap = _.map(g.nodes(), function (v) {
var sucs = {};
_.each(g.outEdges(v), function (e) {
sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
});
return sucs;
});
return _.zipObject(g.nodes(), weightMap);
}
function predecessorWeights(g) {
var weightMap = _.map(g.nodes(), function (v) {
var preds = {};
_.each(g.inEdges(v), function (e) {
preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
});
return preds;
});
return _.zipObject(g.nodes(), weightMap);
}
function intersectRect(rect, point) {
var x = rect.x;
var y = rect.y;
var dx = point.x - x;
var dy = point.y - y;
var w = rect.width / 2;
var h = rect.height / 2;
if (!dx && !dy) {
throw new Error('Not possible to find intersection inside of the rectangle');
}
var sx, sy;
if (Math.abs(dy) * w > Math.abs(dx) * h) {
if (dy < 0) {
h = -h;
}
sx = h * dx / dy;
sy = h;
} else {
if (dx < 0) {
w = -w;
}
sx = w;
sy = w * dy / dx;
}
return {
x: x + sx,
y: y + sy
};
}
function buildLayerMatrix(g) {
var layering = _.map(_.range(maxRank(g) + 1), function () {
return [];
});
_.each(g.nodes(), function (v) {
var node = g.node(v), rank = node.rank;
if (!_.isUndefined(rank)) {
layering[rank][node.order] = v;
}
});
return layering;
}
function normalizeRanks(g) {
var min = _.min(_.map(g.nodes(), function (v) {
return g.node(v).rank;
}));
_.each(g.nodes(), function (v) {
var node = g.node(v);
if (_.has(node, 'rank')) {
node.rank -= min;
}
});
}
function removeEmptyRanks(g) {
var offset = _.min(_.map(g.nodes(), function (v) {
return g.node(v).rank;
}));
var layers = [];
_.each(g.nodes(), function (v) {
var rank = g.node(v).rank - offset;
if (!layers[rank]) {
layers[rank] = [];
}
layers[rank].push(v);
});
var delta = 0, nodeRankFactor = g.graph().nodeRankFactor;
_.each(layers, function (vs, i) {
if (_.isUndefined(vs) && i % nodeRankFactor !== 0) {
--delta;
} else if (delta) {
_.each(vs, function (v) {
g.node(v).rank += delta;
});
}
});
}
function addBorderNode(g, prefix, rank, order) {
var node = {
width: 0,
height: 0
};
if (arguments.length >= 4) {
node.rank = rank;
node.order = order;
}
return addDummyNode(g, 'border', node, prefix);
}
function maxRank(g) {
return _.max(_.map(g.nodes(), function (v) {
var rank = g.node(v).rank;
if (!_.isUndefined(rank)) {
return rank;
}
}));
}
function partition(collection, fn) {
var result = {
lhs: [],
rhs: []
};
_.each(collection, function (value) {
if (fn(value)) {
result.lhs.push(value);
} else {
result.rhs.push(value);
}
});
return result;
}
function time(name, fn) {
var start = _.now();
try {
return fn();
} finally {
console.log(name + ' time: ' + (_.now() - start) + 'ms');
}
}
function notime(name, fn) {
return fn();
}
},
{
'./graphlib': 7,
'./lodash': 10
}
],
30: [
function (require, module, exports) {
module.exports = '0.7.4';
},
{}
]
}, {}, [1])(1);
});
Polymer.IronResizableBehavior = {
properties: {
_parentResizable: {
type: Object,
observer: '_parentResizableChanged'
},
_notifyingDescendant: {
type: Boolean,
value: false
}
},
listeners: { 'iron-request-resize-notifications': '_onIronRequestResizeNotifications' },
created: function () {
this._interestedResizables = [];
this._boundNotifyResize = this.notifyResize.bind(this);
},
attached: function () {
this.fire('iron-request-resize-notifications', null, {
node: this,
bubbles: true,
cancelable: true
});
if (!this._parentResizable) {
window.addEventListener('resize', this._boundNotifyResize);
this.notifyResize();
}
},
detached: function () {
if (this._parentResizable) {
this._parentResizable.stopResizeNotificationsFor(this);
} else {
window.removeEventListener('resize', this._boundNotifyResize);
}
this._parentResizable = null;
},
notifyResize: function () {
if (!this.isAttached) {
return;
}
this._interestedResizables.forEach(function (resizable) {
if (this.resizerShouldNotify(resizable)) {
this._notifyDescendant(resizable);
}
}, this);
this._fireResize();
},
assignParentResizable: function (parentResizable) {
this._parentResizable = parentResizable;
},
stopResizeNotificationsFor: function (target) {
var index = this._interestedResizables.indexOf(target);
if (index > -1) {
this._interestedResizables.splice(index, 1);
this.unlisten(target, 'iron-resize', '_onDescendantIronResize');
}
},
resizerShouldNotify: function (element) {
return true;
},
_onDescendantIronResize: function (event) {
if (this._notifyingDescendant) {
event.stopPropagation();
return;
}
if (!Polymer.Settings.useShadow) {
this._fireResize();
}
},
_fireResize: function () {
this.fire('iron-resize', null, {
node: this,
bubbles: false
});
},
_onIronRequestResizeNotifications: function (event) {
var target = event.path ? event.path[0] : event.target;
if (target === this) {
return;
}
if (this._interestedResizables.indexOf(target) === -1) {
this._interestedResizables.push(target);
this.listen(target, 'iron-resize', '_onDescendantIronResize');
}
target.assignParentResizable(this);
this._notifyDescendant(target);
event.stopPropagation();
},
_parentResizableChanged: function (parentResizable) {
if (parentResizable) {
window.removeEventListener('resize', this._boundNotifyResize);
}
},
_notifyDescendant: function (descendant) {
if (!this.isAttached) {
return;
}
this._notifyingDescendant = true;
descendant.notifyResize();
this._notifyingDescendant = false;
}
};
Polymer.IronRangeBehavior = {
properties: {
value: {
type: Number,
value: 0,
notify: true,
reflectToAttribute: true
},
min: {
type: Number,
value: 0,
notify: true
},
max: {
type: Number,
value: 100,
notify: true
},
step: {
type: Number,
value: 1,
notify: true
},
ratio: {
type: Number,
value: 0,
readOnly: true,
notify: true
}
},
observers: ['_update(value, min, max, step)'],
_calcRatio: function (value) {
return (this._clampValue(value) - this.min) / (this.max - this.min);
},
_clampValue: function (value) {
return Math.min(this.max, Math.max(this.min, this._calcStep(value)));
},
_calcStep: function (value) {
value = parseFloat(value);
return this.step ? (Math.round((value + this.min) / this.step) - this.min / this.step) / (1 / this.step) : value;
},
_validateValue: function () {
var v = this._clampValue(this.value);
this.value = this.oldValue = isNaN(v) ? this.oldValue : v;
return this.value !== v;
},
_update: function () {
this._validateValue();
this._setRatio(this._calcRatio(this.value) * 100);
}
};
Polymer.IronSelection = function (selectCallback) {
this.selection = [];
this.selectCallback = selectCallback;
};
Polymer.IronSelection.prototype = {
get: function () {
return this.multi ? this.selection.slice() : this.selection[0];
},
clear: function (excludes) {
this.selection.slice().forEach(function (item) {
if (!excludes || excludes.indexOf(item) < 0) {
this.setItemSelected(item, false);
}
}, this);
},
isSelected: function (item) {
return this.selection.indexOf(item) >= 0;
},
setItemSelected: function (item, isSelected) {
if (item != null) {
if (isSelected) {
this.selection.push(item);
} else {
var i = this.selection.indexOf(item);
if (i >= 0) {
this.selection.splice(i, 1);
}
}
if (this.selectCallback) {
this.selectCallback(item, isSelected);
}
}
},
select: function (item) {
if (this.multi) {
this.toggle(item);
} else if (this.get() !== item) {
this.setItemSelected(this.get(), false);
this.setItemSelected(item, true);
}
},
toggle: function (item) {
this.setItemSelected(item, !this.isSelected(item));
}
};
Polymer.IronSelectableBehavior = {
properties: {
attrForSelected: {
type: String,
value: null
},
selected: {
type: String,
notify: true
},
selectedItem: {
type: Object,
readOnly: true,
notify: true
},
activateEvent: {
type: String,
value: 'tap',
observer: '_activateEventChanged'
},
selectable: String,
selectedClass: {
type: String,
value: 'iron-selected'
},
selectedAttribute: {
type: String,
value: null
},
items: {
type: Array,
readOnly: true,
value: function () {
return [];
}
},
_excludedLocalNames: {
type: Object,
value: function () {
return { 'template': 1 };
}
}
},
observers: ['_updateSelected(attrForSelected, selected)'],
created: function () {
this._bindFilterItem = this._filterItem.bind(this);
this._selection = new Polymer.IronSelection(this._applySelection.bind(this));
},
attached: function () {
this._observer = this._observeItems(this);
this._updateItems();
if (!this._shouldUpdateSelection) {
this._updateSelected(this.attrForSelected, this.selected);
}
this._addListener(this.activateEvent);
},
detached: function () {
if (this._observer) {
Polymer.dom(this).unobserveNodes(this._observer);
}
this._removeListener(this.activateEvent);
},
indexOf: function (item) {
return this.items.indexOf(item);
},
select: function (value) {
this.selected = value;
},
selectPrevious: function () {
var length = this.items.length;
var index = (Number(this._valueToIndex(this.selected)) - 1 + length) % length;
this.selected = this._indexToValue(index);
},
selectNext: function () {
var index = (Number(this._valueToIndex(this.selected)) + 1) % this.items.length;
this.selected = this._indexToValue(index);
},
get _shouldUpdateSelection() {
return this.selected != null;
},
_addListener: function (eventName) {
this.listen(this, eventName, '_activateHandler');
},
_removeListener: function (eventName) {
this.unlisten(this, eventName, '_activateHandler');
},
_activateEventChanged: function (eventName, old) {
this._removeListener(old);
this._addListener(eventName);
},
_updateItems: function () {
var nodes = Polymer.dom(this).queryDistributedElements(this.selectable || '*');
nodes = Array.prototype.filter.call(nodes, this._bindFilterItem);
this._setItems(nodes);
},
_updateSelected: function () {
this._selectSelected(this.selected);
},
_selectSelected: function (selected) {
this._selection.select(this._valueToItem(this.selected));
},
_filterItem: function (node) {
return !this._excludedLocalNames[node.localName];
},
_valueToItem: function (value) {
return value == null ? null : this.items[this._valueToIndex(value)];
},
_valueToIndex: function (value) {
if (this.attrForSelected) {
for (var i = 0, item; item = this.items[i]; i++) {
if (this._valueForItem(item) == value) {
return i;
}
}
} else {
return Number(value);
}
},
_indexToValue: function (index) {
if (this.attrForSelected) {
var item = this.items[index];
if (item) {
return this._valueForItem(item);
}
} else {
return index;
}
},
_valueForItem: function (item) {
return item[this.attrForSelected] || item.getAttribute(this.attrForSelected);
},
_applySelection: function (item, isSelected) {
if (this.selectedClass) {
this.toggleClass(this.selectedClass, isSelected, item);
}
if (this.selectedAttribute) {
this.toggleAttribute(this.selectedAttribute, isSelected, item);
}
this._selectionChange();
this.fire('iron-' + (isSelected ? 'select' : 'deselect'), { item: item });
},
_selectionChange: function () {
this._setSelectedItem(this._selection.get());
},
_observeItems: function (node) {
return Polymer.dom(node).observeNodes(function (mutations) {
this.fire('iron-items-changed', mutations, {
bubbles: false,
cancelable: false
});
this._updateItems();
if (this._shouldUpdateSelection) {
this._updateSelected();
}
});
},
_activateHandler: function (e) {
var t = e.target;
var items = this.items;
while (t && t != this) {
var i = items.indexOf(t);
if (i >= 0) {
var value = this._indexToValue(i);
this._itemActivate(value, t);
return;
}
t = t.parentNode;
}
},
_itemActivate: function (value, item) {
if (!this.fire('iron-activate', {
selected: value,
item: item
}, { cancelable: true }).defaultPrevented) {
this.select(value);
}
}
};
Polymer.IronMultiSelectableBehaviorImpl = {
properties: {
multi: {
type: Boolean,
value: false,
observer: 'multiChanged'
},
selectedValues: {
type: Array,
notify: true
},
selectedItems: {
type: Array,
readOnly: true,
notify: true
}
},
observers: ['_updateSelected(attrForSelected, selectedValues)'],
select: function (value) {
if (this.multi) {
if (this.selectedValues) {
this._toggleSelected(value);
} else {
this.selectedValues = [value];
}
} else {
this.selected = value;
}
},
multiChanged: function (multi) {
this._selection.multi = multi;
},
get _shouldUpdateSelection() {
return this.selected != null || this.selectedValues != null && this.selectedValues.length;
},
_updateSelected: function () {
if (this.multi) {
this._selectMulti(this.selectedValues);
} else {
this._selectSelected(this.selected);
}
},
_selectMulti: function (values) {
this._selection.clear();
if (values) {
for (var i = 0; i < values.length; i++) {
this._selection.setItemSelected(this._valueToItem(values[i]), true);
}
}
},
_selectionChange: function () {
var s = this._selection.get();
if (this.multi) {
this._setSelectedItems(s);
} else {
this._setSelectedItems([s]);
this._setSelectedItem(s);
}
},
_toggleSelected: function (value) {
var i = this.selectedValues.indexOf(value);
var unselected = i < 0;
if (unselected) {
this.push('selectedValues', value);
} else {
this.splice('selectedValues', i, 1);
}
this._selection.setItemSelected(this._valueToItem(value), unselected);
}
};
Polymer.IronMultiSelectableBehavior = [
Polymer.IronSelectableBehavior,
Polymer.IronMultiSelectableBehaviorImpl
];
Polymer.IronMenuBehaviorImpl = {
properties: {
focusedItem: {
observer: '_focusedItemChanged',
readOnly: true,
type: Object
},
attrForItemTitle: { type: String }
},
hostAttributes: {
'role': 'menu',
'tabindex': '0'
},
observers: ['_updateMultiselectable(multi)'],
listeners: {
'focus': '_onFocus',
'keydown': '_onKeydown',
'iron-items-changed': '_onIronItemsChanged'
},
keyBindings: {
'up': '_onUpKey',
'down': '_onDownKey',
'esc': '_onEscKey',
'shift+tab:keydown': '_onShiftTabDown'
},
attached: function () {
this._resetTabindices();
},
select: function (value) {
if (this._defaultFocusAsync) {
this.cancelAsync(this._defaultFocusAsync);
this._defaultFocusAsync = null;
}
var item = this._valueToItem(value);
if (item && item.hasAttribute('disabled'))
return;
this._setFocusedItem(item);
Polymer.IronMultiSelectableBehaviorImpl.select.apply(this, arguments);
},
_resetTabindices: function () {
var selectedItem = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
this.items.forEach(function (item) {
item.setAttribute('tabindex', item === selectedItem ? '0' : '-1');
}, this);
},
_updateMultiselectable: function (multi) {
if (multi) {
this.setAttribute('aria-multiselectable', 'true');
} else {
this.removeAttribute('aria-multiselectable');
}
},
_focusWithKeyboardEvent: function (event) {
for (var i = 0, item; item = this.items[i]; i++) {
var attr = this.attrForItemTitle || 'textContent';
var title = item[attr] || item.getAttribute(attr);
if (title && title.trim().charAt(0).toLowerCase() === String.fromCharCode(event.keyCode).toLowerCase()) {
this._setFocusedItem(item);
break;
}
}
},
_focusPrevious: function () {
var length = this.items.length;
var index = (Number(this.indexOf(this.focusedItem)) - 1 + length) % length;
this._setFocusedItem(this.items[index]);
},
_focusNext: function () {
var index = (Number(this.indexOf(this.focusedItem)) + 1) % this.items.length;
this._setFocusedItem(this.items[index]);
},
_applySelection: function (item, isSelected) {
if (isSelected) {
item.setAttribute('aria-selected', 'true');
} else {
item.removeAttribute('aria-selected');
}
Polymer.IronSelectableBehavior._applySelection.apply(this, arguments);
},
_focusedItemChanged: function (focusedItem, old) {
old && old.setAttribute('tabindex', '-1');
if (focusedItem) {
focusedItem.setAttribute('tabindex', '0');
focusedItem.focus();
}
},
_onIronItemsChanged: function (event) {
var mutations = event.detail;
var mutation;
var index;
for (index = 0; index < mutations.length; ++index) {
mutation = mutations[index];
if (mutation.addedNodes.length) {
this._resetTabindices();
break;
}
}
},
_onShiftTabDown: function (event) {
var oldTabIndex;
Polymer.IronMenuBehaviorImpl._shiftTabPressed = true;
oldTabIndex = this.getAttribute('tabindex');
this.setAttribute('tabindex', '-1');
this.async(function () {
this.setAttribute('tabindex', oldTabIndex);
Polymer.IronMenuBehaviorImpl._shiftTabPressed = false;
}, 1);
},
_onFocus: function (event) {
if (Polymer.IronMenuBehaviorImpl._shiftTabPressed) {
return;
}
this.blur();
this._setFocusedItem(null);
this._defaultFocusAsync = this.async(function () {
var selectedItem = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
if (selectedItem) {
this._setFocusedItem(selectedItem);
} else {
this._setFocusedItem(this.items[0]);
}
}, 100);
},
_onUpKey: function (event) {
this._focusPrevious();
},
_onDownKey: function (event) {
this._focusNext();
},
_onEscKey: function (event) {
this.focusedItem.blur();
},
_onKeydown: function (event) {
if (this.keyboardEventMatchesKeys(event, 'up down esc')) {
return;
}
this._focusWithKeyboardEvent(event);
}
};
Polymer.IronMenuBehaviorImpl._shiftTabPressed = false;
Polymer.IronMenuBehavior = [
Polymer.IronMultiSelectableBehavior,
Polymer.IronA11yKeysBehavior,
Polymer.IronMenuBehaviorImpl
];
Polymer.IronFitBehavior = {
properties: {
sizingTarget: {
type: Object,
value: function () {
return this;
}
},
fitInto: {
type: Object,
value: window
},
autoFitOnAttach: {
type: Boolean,
value: false
},
_fitInfo: { type: Object }
},
get _fitWidth() {
var fitWidth;
if (this.fitInto === window) {
fitWidth = this.fitInto.innerWidth;
} else {
fitWidth = this.fitInto.getBoundingClientRect().width;
}
return fitWidth;
},
get _fitHeight() {
var fitHeight;
if (this.fitInto === window) {
fitHeight = this.fitInto.innerHeight;
} else {
fitHeight = this.fitInto.getBoundingClientRect().height;
}
return fitHeight;
},
get _fitLeft() {
var fitLeft;
if (this.fitInto === window) {
fitLeft = 0;
} else {
fitLeft = this.fitInto.getBoundingClientRect().left;
}
return fitLeft;
},
get _fitTop() {
var fitTop;
if (this.fitInto === window) {
fitTop = 0;
} else {
fitTop = this.fitInto.getBoundingClientRect().top;
}
return fitTop;
},
attached: function () {
if (this.autoFitOnAttach) {
if (window.getComputedStyle(this).display === 'none') {
setTimeout(function () {
this.fit();
}.bind(this));
} else {
this.fit();
}
}
},
fit: function () {
this._discoverInfo();
this.constrain();
this.center();
},
_discoverInfo: function () {
if (this._fitInfo) {
return;
}
var target = window.getComputedStyle(this);
var sizer = window.getComputedStyle(this.sizingTarget);
this._fitInfo = {
inlineStyle: {
top: this.style.top || '',
left: this.style.left || ''
},
positionedBy: {
vertically: target.top !== 'auto' ? 'top' : target.bottom !== 'auto' ? 'bottom' : null,
horizontally: target.left !== 'auto' ? 'left' : target.right !== 'auto' ? 'right' : null,
css: target.position
},
sizedBy: {
height: sizer.maxHeight !== 'none',
width: sizer.maxWidth !== 'none'
},
margin: {
top: parseInt(target.marginTop, 10) || 0,
right: parseInt(target.marginRight, 10) || 0,
bottom: parseInt(target.marginBottom, 10) || 0,
left: parseInt(target.marginLeft, 10) || 0
}
};
},
resetFit: function () {
if (!this._fitInfo || !this._fitInfo.sizedBy.height) {
this.sizingTarget.style.maxHeight = '';
this.style.top = this._fitInfo ? this._fitInfo.inlineStyle.top : '';
}
if (!this._fitInfo || !this._fitInfo.sizedBy.width) {
this.sizingTarget.style.maxWidth = '';
this.style.left = this._fitInfo ? this._fitInfo.inlineStyle.left : '';
}
if (this._fitInfo) {
this.style.position = this._fitInfo.positionedBy.css;
}
this._fitInfo = null;
},
refit: function () {
this.resetFit();
this.fit();
},
constrain: function () {
var info = this._fitInfo;
if (!this._fitInfo.positionedBy.vertically) {
this.style.top = '0px';
}
if (!this._fitInfo.positionedBy.horizontally) {
this.style.left = '0px';
}
if (!this._fitInfo.positionedBy.vertically || !this._fitInfo.positionedBy.horizontally) {
this.style.position = 'fixed';
}
this.sizingTarget.style.boxSizing = 'border-box';
var rect = this.getBoundingClientRect();
if (!info.sizedBy.height) {
this._sizeDimension(rect, info.positionedBy.vertically, 'top', 'bottom', 'Height');
}
if (!info.sizedBy.width) {
this._sizeDimension(rect, info.positionedBy.horizontally, 'left', 'right', 'Width');
}
},
_sizeDimension: function (rect, positionedBy, start, end, extent) {
var info = this._fitInfo;
var max = extent === 'Width' ? this._fitWidth : this._fitHeight;
var flip = positionedBy === end;
var offset = flip ? max - rect[end] : rect[start];
var margin = info.margin[flip ? start : end];
var offsetExtent = 'offset' + extent;
var sizingOffset = this[offsetExtent] - this.sizingTarget[offsetExtent];
this.sizingTarget.style['max' + extent] = max - margin - offset - sizingOffset + 'px';
},
center: function () {
if (!this._fitInfo.positionedBy.vertically || !this._fitInfo.positionedBy.horizontally) {
this.style.position = 'fixed';
}
if (!this._fitInfo.positionedBy.vertically) {
var top = (this._fitHeight - this.offsetHeight) / 2 + this._fitTop;
top -= this._fitInfo.margin.top;
this.style.top = top + 'px';
}
if (!this._fitInfo.positionedBy.horizontally) {
var left = (this._fitWidth - this.offsetWidth) / 2 + this._fitLeft;
left -= this._fitInfo.margin.left;
this.style.left = left + 'px';
}
}
};
Polymer.IronOverlayManager = function () {
var overlays = [];
var DEFAULT_Z = 10;
var backdrops = [];
function addOverlay(overlay) {
var z0 = currentOverlayZ();
overlays.push(overlay);
var z1 = currentOverlayZ();
if (z1 <= z0) {
applyOverlayZ(overlay, z0);
}
}
function removeOverlay(overlay) {
var i = overlays.indexOf(overlay);
if (i >= 0) {
overlays.splice(i, 1);
setZ(overlay, '');
}
}
function applyOverlayZ(overlay, aboveZ) {
setZ(overlay, aboveZ + 2);
}
function setZ(element, z) {
element.style.zIndex = z;
}
function currentOverlay() {
var i = overlays.length - 1;
while (overlays[i] && !overlays[i].opened) {
--i;
}
return overlays[i];
}
function currentOverlayZ() {
var z;
var current = currentOverlay();
if (current) {
var z1 = window.getComputedStyle(current).zIndex;
if (!isNaN(z1)) {
z = Number(z1);
}
}
return z || DEFAULT_Z;
}
function focusOverlay() {
var current = currentOverlay();
if (current && !current.transitioning) {
current._applyFocus();
}
}
function trackBackdrop(element) {
if (element.opened) {
backdrops.push(element);
} else {
var index = backdrops.indexOf(element);
if (index >= 0) {
backdrops.splice(index, 1);
}
}
}
function getBackdrops() {
return backdrops;
}
return {
addOverlay: addOverlay,
removeOverlay: removeOverlay,
currentOverlay: currentOverlay,
currentOverlayZ: currentOverlayZ,
focusOverlay: focusOverlay,
trackBackdrop: trackBackdrop,
getBackdrops: getBackdrops
};
}();
Polymer.IronOverlayBehaviorImpl = {
properties: {
opened: {
observer: '_openedChanged',
type: Boolean,
value: false,
notify: true
},
canceled: {
observer: '_canceledChanged',
readOnly: true,
type: Boolean,
value: false
},
withBackdrop: {
type: Boolean,
value: false
},
noAutoFocus: {
type: Boolean,
value: false
},
noCancelOnEscKey: {
type: Boolean,
value: false
},
noCancelOnOutsideClick: {
type: Boolean,
value: false
},
closingReason: { type: Object },
_manager: {
type: Object,
value: Polymer.IronOverlayManager
},
_boundOnCaptureClick: {
type: Function,
value: function () {
return this._onCaptureClick.bind(this);
}
},
_boundOnCaptureKeydown: {
type: Function,
value: function () {
return this._onCaptureKeydown.bind(this);
}
}
},
listeners: {
'tap': '_onClick',
'iron-resize': '_onIronResize'
},
get backdropElement() {
return this._backdrop;
},
get _focusNode() {
return Polymer.dom(this).querySelector('[autofocus]') || this;
},
registered: function () {
this._backdrop = document.createElement('iron-overlay-backdrop');
},
ready: function () {
this._ensureSetup();
if (this._callOpenedWhenReady) {
this._openedChanged();
}
},
detached: function () {
this.opened = false;
this._completeBackdrop();
this._manager.removeOverlay(this);
},
toggle: function () {
this.opened = !this.opened;
},
open: function () {
this.opened = true;
this.closingReason = { canceled: false };
},
close: function () {
this.opened = false;
this._setCanceled(false);
},
cancel: function () {
var cancelEvent = this.fire('iron-overlay-canceled', undefined, { cancelable: true });
if (cancelEvent.defaultPrevented) {
return;
}
this.opened = false;
this._setCanceled(true);
},
_ensureSetup: function () {
if (this._overlaySetup) {
return;
}
this._overlaySetup = true;
this.style.outline = 'none';
this.style.display = 'none';
},
_openedChanged: function () {
if (this.opened) {
this.removeAttribute('aria-hidden');
} else {
this.setAttribute('aria-hidden', 'true');
}
if (!this._overlaySetup) {
this._callOpenedWhenReady = this.opened;
return;
}
if (this._openChangedAsync) {
this.cancelAsync(this._openChangedAsync);
}
this._toggleListeners();
if (this.opened) {
this._prepareRenderOpened();
}
this._openChangedAsync = this.async(function () {
this.style.display = '';
this.offsetWidth;
if (this.opened) {
this._renderOpened();
} else {
this._renderClosed();
}
this._openChangedAsync = null;
});
},
_canceledChanged: function () {
this.closingReason = this.closingReason || {};
this.closingReason.canceled = this.canceled;
},
_toggleListener: function (enable, node, event, boundListener, capture) {
if (enable) {
if (event === 'tap') {
Polymer.Gestures.add(document, 'tap', null);
}
node.addEventListener(event, boundListener, capture);
} else {
if (event === 'tap') {
Polymer.Gestures.remove(document, 'tap', null);
}
node.removeEventListener(event, boundListener, capture);
}
},
_toggleListeners: function () {
if (this._toggleListenersAsync) {
this.cancelAsync(this._toggleListenersAsync);
}
this._toggleListenersAsync = this.async(function () {
this._toggleListener(this.opened, document, 'tap', this._boundOnCaptureClick, true);
this._toggleListener(this.opened, document, 'keydown', this._boundOnCaptureKeydown, true);
this._toggleListenersAsync = null;
}, 1);
},
_prepareRenderOpened: function () {
this._manager.addOverlay(this);
if (this.withBackdrop) {
this.backdropElement.prepare();
this._manager.trackBackdrop(this);
}
this._preparePositioning();
this.fit();
this._finishPositioning();
},
_renderOpened: function () {
if (this.withBackdrop) {
this.backdropElement.open();
}
this._finishRenderOpened();
},
_renderClosed: function () {
if (this.withBackdrop) {
this.backdropElement.close();
}
this._finishRenderClosed();
},
_onTransitionend: function (event) {
if (event && event.target !== this) {
return;
}
if (this.opened) {
this._finishRenderOpened();
} else {
this._finishRenderClosed();
}
},
_finishRenderOpened: function () {
if (!this.noAutoFocus) {
this._focusNode.focus();
}
this.fire('iron-overlay-opened');
this._squelchNextResize = true;
this.async(this.notifyResize);
},
_finishRenderClosed: function () {
this.resetFit();
this.style.display = 'none';
this._completeBackdrop();
this._manager.removeOverlay(this);
this._focusNode.blur();
this._manager.focusOverlay();
this.fire('iron-overlay-closed', this.closingReason);
this._squelchNextResize = true;
this.async(this.notifyResize);
},
_completeBackdrop: function () {
if (this.withBackdrop) {
this._manager.trackBackdrop(this);
this.backdropElement.complete();
}
},
_preparePositioning: function () {
this.style.transition = this.style.webkitTransition = 'none';
this.style.transform = this.style.webkitTransform = 'none';
this.style.display = '';
},
_finishPositioning: function () {
this.style.display = 'none';
this.style.transform = this.style.webkitTransform = '';
this.offsetWidth;
this.style.transition = this.style.webkitTransition = '';
},
_applyFocus: function () {
if (this.opened) {
if (!this.noAutoFocus) {
this._focusNode.focus();
}
} else {
this._focusNode.blur();
this._manager.focusOverlay();
}
},
_onCaptureClick: function (event) {
if (!this.noCancelOnOutsideClick && this._manager.currentOverlay() == this) {
this._cancelJob = this.async(function () {
this.cancel();
}, 10);
}
},
_onClick: function (event) {
if (this._cancelJob) {
this.cancelAsync(this._cancelJob);
this._cancelJob = null;
}
},
_onCaptureKeydown: function (event) {
var ESC = 27;
if (!this.noCancelOnEscKey && event.keyCode === ESC) {
this.cancel();
event.stopPropagation();
}
},
_onIronResize: function () {
if (this._squelchNextResize) {
this._squelchNextResize = false;
return;
}
if (this.opened) {
this.refit();
}
}
};
Polymer.IronOverlayBehavior = [
Polymer.IronFitBehavior,
Polymer.IronResizableBehavior,
Polymer.IronOverlayBehaviorImpl
];
Polymer.NeonAnimationBehavior = {
properties: {
animationTiming: {
type: Object,
value: function () {
return {
duration: 500,
easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
fill: 'both'
};
}
}
},
registered: function () {
new Polymer.IronMeta({
type: 'animation',
key: this.is,
value: this.constructor
});
},
timingFromConfig: function (config) {
if (config.timing) {
for (var property in config.timing) {
this.animationTiming[property] = config.timing[property];
}
}
return this.animationTiming;
},
setPrefixedProperty: function (node, property, value) {
var map = {
'transform': ['webkitTransform'],
'transformOrigin': [
'mozTransformOrigin',
'webkitTransformOrigin'
]
};
var prefixes = map[property];
for (var prefix, index = 0; prefix = prefixes[index]; index++) {
node.style[prefix] = value;
}
node.style[property] = value;
},
complete: function () {
}
};
!function (a, b) {
b['true'] = a;
var c = {}, d = {}, e = {}, f = null;
!function (a) {
function b(a) {
if ('number' == typeof a)
return a;
var b = {};
for (var c in a)
b[c] = a[c];
return b;
}
function c() {
this._delay = 0, this._endDelay = 0, this._fill = 'none', this._iterationStart = 0, this._iterations = 1, this._duration = 0, this._playbackRate = 1, this._direction = 'normal', this._easing = 'linear';
}
function d(b, d) {
var e = new c();
return d && (e.fill = 'both', e.duration = 'auto'), 'number' != typeof b || isNaN(b) ? void 0 !== b && Object.getOwnPropertyNames(b).forEach(function (c) {
if ('auto' != b[c]) {
if (('number' == typeof e[c] || 'duration' == c) && ('number' != typeof b[c] || isNaN(b[c])))
return;
if ('fill' == c && -1 == s.indexOf(b[c]))
return;
if ('direction' == c && -1 == t.indexOf(b[c]))
return;
if ('playbackRate' == c && 1 !== b[c] && a.isDeprecated('AnimationEffectTiming.playbackRate', '2014-11-28', 'Use Animation.playbackRate instead.'))
return;
e[c] = b[c];
}
}) : e.duration = b, e;
}
function e(a) {
return 'number' == typeof a && (a = isNaN(a) ? { duration: 0 } : { duration: a }), a;
}
function f(b, c) {
b = a.numericTimingToObject(b);
var e = d(b, c);
return e._easing = i(e.easing), e;
}
function g(a, b, c, d) {
return 0 > a || a > 1 || 0 > c || c > 1 ? B : function (e) {
function f(a, b, c) {
return 3 * a * (1 - c) * (1 - c) * c + 3 * b * (1 - c) * c * c + c * c * c;
}
if (0 == e || 1 == e)
return e;
for (var g = 0, h = 1;;) {
var i = (g + h) / 2, j = f(a, c, i);
if (Math.abs(e - j) < 0.001)
return f(b, d, i);
e > j ? g = i : h = i;
}
};
}
function h(a, b) {
return function (c) {
if (c >= 1)
return 1;
var d = 1 / a;
return c += b * d, c - c % d;
};
}
function i(a) {
var b = z.exec(a);
if (b)
return g.apply(this, b.slice(1).map(Number));
var c = A.exec(a);
if (c)
return h(Number(c[1]), {
start: u,
middle: v,
end: w
}[c[2]]);
var d = x[a];
return d ? d : B;
}
function j(a) {
return Math.abs(k(a) / a.playbackRate);
}
function k(a) {
return a.duration * a.iterations;
}
function l(a, b, c) {
return null == b ? C : b < c.delay ? D : b >= c.delay + a ? E : F;
}
function m(a, b, c, d, e) {
switch (d) {
case D:
return 'backwards' == b || 'both' == b ? 0 : null;
case F:
return c - e;
case E:
return 'forwards' == b || 'both' == b ? a : null;
case C:
return null;
}
}
function n(a, b, c, d) {
return (d.playbackRate < 0 ? b - a : b) * d.playbackRate + c;
}
function o(a, b, c, d, e) {
return 1 / 0 === c || c === -1 / 0 || c - d == b && e.iterations && (e.iterations + e.iterationStart) % 1 == 0 ? a : c % a;
}
function p(a, b, c, d) {
return 0 === c ? 0 : b == a ? d.iterationStart + d.iterations - 1 : Math.floor(c / a);
}
function q(a, b, c, d) {
var e = a % 2 >= 1, f = 'normal' == d.direction || d.direction == (e ? 'alternate-reverse' : 'alternate'), g = f ? c : b - c, h = g / b;
return b * d.easing(h);
}
function r(a, b, c) {
var d = l(a, b, c), e = m(a, c.fill, b, d, c.delay);
if (null === e)
return null;
if (0 === a)
return d === D ? 0 : 1;
var f = c.iterationStart * c.duration, g = n(a, e, f, c), h = o(c.duration, k(c), g, f, c), i = p(c.duration, h, g, c);
return q(i, c.duration, h, c) / c.duration;
}
var s = 'backwards|forwards|both|none'.split('|'), t = 'reverse|alternate|alternate-reverse'.split('|');
c.prototype = {
_setMember: function (b, c) {
this['_' + b] = c, this._effect && (this._effect._timingInput[b] = c, this._effect._timing = a.normalizeTimingInput(a.normalizeTimingInput(this._effect._timingInput)), this._effect.activeDuration = a.calculateActiveDuration(this._effect._timing), this._effect._animation && this._effect._animation._rebuildUnderlyingAnimation());
},
get playbackRate() {
return this._playbackRate;
},
set delay(a) {
this._setMember('delay', a);
},
get delay() {
return this._delay;
},
set endDelay(a) {
this._setMember('endDelay', a);
},
get endDelay() {
return this._endDelay;
},
set fill(a) {
this._setMember('fill', a);
},
get fill() {
return this._fill;
},
set iterationStart(a) {
this._setMember('iterationStart', a);
},
get iterationStart() {
return this._iterationStart;
},
set duration(a) {
this._setMember('duration', a);
},
get duration() {
return this._duration;
},
set direction(a) {
this._setMember('direction', a);
},
get direction() {
return this._direction;
},
set easing(a) {
this._setMember('easing', a);
},
get easing() {
return this._easing;
},
set iterations(a) {
this._setMember('iterations', a);
},
get iterations() {
return this._iterations;
}
};
var u = 1, v = 0.5, w = 0, x = {
ease: g(0.25, 0.1, 0.25, 1),
'ease-in': g(0.42, 0, 1, 1),
'ease-out': g(0, 0, 0.58, 1),
'ease-in-out': g(0.42, 0, 0.58, 1),
'step-start': h(1, u),
'step-middle': h(1, v),
'step-end': h(1, w)
}, y = '\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*', z = new RegExp('cubic-bezier\\(' + y + ',' + y + ',' + y + ',' + y + '\\)'), A = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/, B = function (a) {
return a;
}, C = 0, D = 1, E = 2, F = 3;
a.cloneTimingInput = b, a.makeTiming = d, a.numericTimingToObject = e, a.normalizeTimingInput = f, a.calculateActiveDuration = j, a.calculateTimeFraction = r, a.calculatePhase = l, a.toTimingFunction = i;
}(c, f), function (a) {
function b(a, b) {
return a in h ? h[a][b] || b : b;
}
function c(a, c, d) {
var g = e[a];
if (g) {
f.style[a] = c;
for (var h in g) {
var i = g[h], j = f.style[i];
d[i] = b(i, j);
}
} else
d[a] = b(a, c);
}
function d(b) {
function d() {
var a = e.length;
null == e[a - 1].offset && (e[a - 1].offset = 1), a > 1 && null == e[0].offset && (e[0].offset = 0);
for (var b = 0, c = e[0].offset, d = 1; a > d; d++) {
var f = e[d].offset;
if (null != f) {
for (var g = 1; d - b > g; g++)
e[b + g].offset = c + (f - c) * g / (d - b);
b = d, c = f;
}
}
}
if (!Array.isArray(b) && null !== b)
throw new TypeError('Keyframes must be null or an array of keyframes');
if (null == b)
return [];
for (var e = b.map(function (b) {
var d = {};
for (var e in b) {
var f = b[e];
if ('offset' == e) {
if (null != f && (f = Number(f), !isFinite(f)))
throw new TypeError('keyframe offsets must be numbers.');
} else {
if ('composite' == e)
throw {
type: DOMException.NOT_SUPPORTED_ERR,
name: 'NotSupportedError',
message: 'add compositing is not supported'
};
f = 'easing' == e ? a.toTimingFunction(f) : '' + f;
}
c(e, f, d);
}
return void 0 == d.offset && (d.offset = null), void 0 == d.easing && (d.easing = a.toTimingFunction('linear')), d;
}), f = !0, g = -1 / 0, h = 0; h < e.length; h++) {
var i = e[h].offset;
if (null != i) {
if (g > i)
throw {
code: DOMException.INVALID_MODIFICATION_ERR,
name: 'InvalidModificationError',
message: 'Keyframes are not loosely sorted by offset. Sort or specify offsets.'
};
g = i;
} else
f = !1;
}
return e = e.filter(function (a) {
return a.offset >= 0 && a.offset <= 1;
}), f || d(), e;
}
var e = {
background: [
'backgroundImage',
'backgroundPosition',
'backgroundSize',
'backgroundRepeat',
'backgroundAttachment',
'backgroundOrigin',
'backgroundClip',
'backgroundColor'
],
border: [
'borderTopColor',
'borderTopStyle',
'borderTopWidth',
'borderRightColor',
'borderRightStyle',
'borderRightWidth',
'borderBottomColor',
'borderBottomStyle',
'borderBottomWidth',
'borderLeftColor',
'borderLeftStyle',
'borderLeftWidth'
],
borderBottom: [
'borderBottomWidth',
'borderBottomStyle',
'borderBottomColor'
],
borderColor: [
'borderTopColor',
'borderRightColor',
'borderBottomColor',
'borderLeftColor'
],
borderLeft: [
'borderLeftWidth',
'borderLeftStyle',
'borderLeftColor'
],
borderRadius: [
'borderTopLeftRadius',
'borderTopRightRadius',
'borderBottomRightRadius',
'borderBottomLeftRadius'
],
borderRight: [
'borderRightWidth',
'borderRightStyle',
'borderRightColor'
],
borderTop: [
'borderTopWidth',
'borderTopStyle',
'borderTopColor'
],
borderWidth: [
'borderTopWidth',
'borderRightWidth',
'borderBottomWidth',
'borderLeftWidth'
],
flex: [
'flexGrow',
'flexShrink',
'flexBasis'
],
font: [
'fontFamily',
'fontSize',
'fontStyle',
'fontVariant',
'fontWeight',
'lineHeight'
],
margin: [
'marginTop',
'marginRight',
'marginBottom',
'marginLeft'
],
outline: [
'outlineColor',
'outlineStyle',
'outlineWidth'
],
padding: [
'paddingTop',
'paddingRight',
'paddingBottom',
'paddingLeft'
]
}, f = document.createElementNS('http://www.w3.org/1999/xhtml', 'div'), g = {
thin: '1px',
medium: '3px',
thick: '5px'
}, h = {
borderBottomWidth: g,
borderLeftWidth: g,
borderRightWidth: g,
borderTopWidth: g,
fontSize: {
'xx-small': '60%',
'x-small': '75%',
small: '89%',
medium: '100%',
large: '120%',
'x-large': '150%',
'xx-large': '200%'
},
fontWeight: {
normal: '400',
bold: '700'
},
outlineWidth: g,
textShadow: { none: '0px 0px 0px transparent' },
boxShadow: { none: '0px 0px 0px 0px transparent' }
};
a.normalizeKeyframes = d;
}(c, f), function (a) {
var b = {};
a.isDeprecated = function (a, c, d, e) {
var f = e ? 'are' : 'is', g = new Date(), h = new Date(c);
return h.setMonth(h.getMonth() + 3), h > g ? (a in b || console.warn('Web Animations: ' + a + ' ' + f + ' deprecated and will stop working on ' + h.toDateString() + '. ' + d), b[a] = !0, !1) : !0;
}, a.deprecated = function (b, c, d, e) {
var f = e ? 'are' : 'is';
if (a.isDeprecated(b, c, d, e))
throw new Error(b + ' ' + f + ' no longer supported. ' + d);
};
}(c), function () {
if (document.documentElement.animate) {
var a = document.documentElement.animate([], 0), b = !0;
if (a && (b = !1, 'play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState'.split('|').forEach(function (c) {
void 0 === a[c] && (b = !0);
})), !b)
return;
}
!function (a, b) {
function c(a) {
for (var b = {}, c = 0; c < a.length; c++)
for (var d in a[c])
if ('offset' != d && 'easing' != d && 'composite' != d) {
var e = {
offset: a[c].offset,
easing: a[c].easing,
value: a[c][d]
};
b[d] = b[d] || [], b[d].push(e);
}
for (var f in b) {
var g = b[f];
if (0 != g[0].offset || 1 != g[g.length - 1].offset)
throw {
type: DOMException.NOT_SUPPORTED_ERR,
name: 'NotSupportedError',
message: 'Partial keyframes are not supported'
};
}
return b;
}
function d(a) {
var c = [];
for (var d in a)
for (var e = a[d], f = 0; f < e.length - 1; f++) {
var g = e[f].offset, h = e[f + 1].offset, i = e[f].value, j = e[f + 1].value;
g == h && (1 == h ? i = j : j = i), c.push({
startTime: g,
endTime: h,
easing: e[f].easing,
property: d,
interpolation: b.propertyInterpolation(d, i, j)
});
}
return c.sort(function (a, b) {
return a.startTime - b.startTime;
}), c;
}
b.convertEffectInput = function (e) {
var f = a.normalizeKeyframes(e), g = c(f), h = d(g);
return function (a, c) {
if (null != c)
h.filter(function (a) {
return 0 >= c && 0 == a.startTime || c >= 1 && 1 == a.endTime || c >= a.startTime && c <= a.endTime;
}).forEach(function (d) {
var e = c - d.startTime, f = d.endTime - d.startTime, g = 0 == f ? 0 : d.easing(e / f);
b.apply(a, d.property, d.interpolation(g));
});
else
for (var d in g)
'offset' != d && 'easing' != d && 'composite' != d && b.clear(a, d);
};
};
}(c, d, f), function (a) {
function b(a, b, c) {
e[c] = e[c] || [], e[c].push([
a,
b
]);
}
function c(a, c, d) {
for (var e = 0; e < d.length; e++) {
var f = d[e];
b(a, c, f), /-/.test(f) && b(a, c, f.replace(/-(.)/g, function (a, b) {
return b.toUpperCase();
}));
}
}
function d(b, c, d) {
if ('initial' == c || 'initial' == d) {
var g = b.replace(/-(.)/g, function (a, b) {
return b.toUpperCase();
});
'initial' == c && (c = f[g]), 'initial' == d && (d = f[g]);
}
for (var h = c == d ? [] : e[b], i = 0; h && i < h.length; i++) {
var j = h[i][0](c), k = h[i][0](d);
if (void 0 !== j && void 0 !== k) {
var l = h[i][1](j, k);
if (l) {
var m = a.Interpolation.apply(null, l);
return function (a) {
return 0 == a ? c : 1 == a ? d : m(a);
};
}
}
}
return a.Interpolation(!1, !0, function (a) {
return a ? d : c;
});
}
var e = {};
a.addPropertiesHandler = c;
var f = {
backgroundColor: 'transparent',
backgroundPosition: '0% 0%',
borderBottomColor: 'currentColor',
borderBottomLeftRadius: '0px',
borderBottomRightRadius: '0px',
borderBottomWidth: '3px',
borderLeftColor: 'currentColor',
borderLeftWidth: '3px',
borderRightColor: 'currentColor',
borderRightWidth: '3px',
borderSpacing: '2px',
borderTopColor: 'currentColor',
borderTopLeftRadius: '0px',
borderTopRightRadius: '0px',
borderTopWidth: '3px',
bottom: 'auto',
clip: 'rect(0px, 0px, 0px, 0px)',
color: 'black',
fontSize: '100%',
fontWeight: '400',
height: 'auto',
left: 'auto',
letterSpacing: 'normal',
lineHeight: '120%',
marginBottom: '0px',
marginLeft: '0px',
marginRight: '0px',
marginTop: '0px',
maxHeight: 'none',
maxWidth: 'none',
minHeight: '0px',
minWidth: '0px',
opacity: '1.0',
outlineColor: 'invert',
outlineOffset: '0px',
outlineWidth: '3px',
paddingBottom: '0px',
paddingLeft: '0px',
paddingRight: '0px',
paddingTop: '0px',
right: 'auto',
textIndent: '0px',
textShadow: '0px 0px 0px transparent',
top: 'auto',
transform: '',
verticalAlign: '0px',
visibility: 'visible',
width: 'auto',
wordSpacing: 'normal',
zIndex: 'auto'
};
a.propertyInterpolation = d;
}(d, f), function (a, b) {
function c(b) {
var c = a.calculateActiveDuration(b), d = function (d) {
return a.calculateTimeFraction(c, d, b);
};
return d._totalDuration = b.delay + c + b.endDelay, d._isCurrent = function (d) {
var e = a.calculatePhase(c, d, b);
return e === PhaseActive || e === PhaseBefore;
}, d;
}
b.KeyframeEffect = function (d, e, f) {
var g, h = c(a.normalizeTimingInput(f)), i = b.convertEffectInput(e), j = function () {
i(d, g);
};
return j._update = function (a) {
return g = h(a), null !== g;
}, j._clear = function () {
i(d, null);
}, j._hasSameTarget = function (a) {
return d === a;
}, j._isCurrent = h._isCurrent, j._totalDuration = h._totalDuration, j;
}, b.NullEffect = function (a) {
var b = function () {
a && (a(), a = null);
};
return b._update = function () {
return null;
}, b._totalDuration = 0, b._isCurrent = function () {
return !1;
}, b._hasSameTarget = function () {
return !1;
}, b;
};
}(c, d, f), function (a) {
a.apply = function (b, c, d) {
b.style[a.propertyName(c)] = d;
}, a.clear = function (b, c) {
b.style[a.propertyName(c)] = '';
};
}(d, f), function (a) {
window.Element.prototype.animate = function (b, c) {
return a.timeline._play(a.KeyframeEffect(this, b, c));
};
}(d), function (a) {
function b(a, c, d) {
if ('number' == typeof a && 'number' == typeof c)
return a * (1 - d) + c * d;
if ('boolean' == typeof a && 'boolean' == typeof c)
return 0.5 > d ? a : c;
if (a.length == c.length) {
for (var e = [], f = 0; f < a.length; f++)
e.push(b(a[f], c[f], d));
return e;
}
throw 'Mismatched interpolation arguments ' + a + ':' + c;
}
a.Interpolation = function (a, c, d) {
return function (e) {
return d(b(a, c, e));
};
};
}(d, f), function (a, b) {
a.sequenceNumber = 0;
var c = function (a, b, c) {
this.target = a, this.currentTime = b, this.timelineTime = c, this.type = 'finish', this.bubbles = !1, this.cancelable = !1, this.currentTarget = a, this.defaultPrevented = !1, this.eventPhase = Event.AT_TARGET, this.timeStamp = Date.now();
};
b.Animation = function (b) {
this._sequenceNumber = a.sequenceNumber++, this._currentTime = 0, this._startTime = null, this._paused = !1, this._playbackRate = 1, this._inTimeline = !0, this._finishedFlag = !1, this.onfinish = null, this._finishHandlers = [], this._effect = b, this._inEffect = this._effect._update(0), this._idle = !0, this._currentTimePending = !1;
}, b.Animation.prototype = {
_ensureAlive: function () {
this._inEffect = this._effect._update(this.playbackRate < 0 && 0 === this.currentTime ? -1 : this.currentTime), this._inTimeline || !this._inEffect && this._finishedFlag || (this._inTimeline = !0, b.timeline._animations.push(this));
},
_tickCurrentTime: function (a, b) {
a != this._currentTime && (this._currentTime = a, this._isFinished && !b && (this._currentTime = this._playbackRate > 0 ? this._totalDuration : 0), this._ensureAlive());
},
get currentTime() {
return this._idle || this._currentTimePending ? null : this._currentTime;
},
set currentTime(a) {
a = +a, isNaN(a) || (b.restart(), this._paused || null == this._startTime || (this._startTime = this._timeline.currentTime - a / this._playbackRate), this._currentTimePending = !1, this._currentTime != a && (this._tickCurrentTime(a, !0), b.invalidateEffects()));
},
get startTime() {
return this._startTime;
},
set startTime(a) {
a = +a, isNaN(a) || this._paused || this._idle || (this._startTime = a, this._tickCurrentTime((this._timeline.currentTime - this._startTime) * this.playbackRate), b.invalidateEffects());
},
get playbackRate() {
return this._playbackRate;
},
set playbackRate(a) {
if (a != this._playbackRate) {
var b = this.currentTime;
this._playbackRate = a, this._startTime = null, 'paused' != this.playState && 'idle' != this.playState && this.play(), null != b && (this.currentTime = b);
}
},
get _isFinished() {
return !this._idle && (this._playbackRate > 0 && this._currentTime >= this._totalDuration || this._playbackRate < 0 && this._currentTime <= 0);
},
get _totalDuration() {
return this._effect._totalDuration;
},
get playState() {
return this._idle ? 'idle' : null == this._startTime && !this._paused && 0 != this.playbackRate || this._currentTimePending ? 'pending' : this._paused ? 'paused' : this._isFinished ? 'finished' : 'running';
},
play: function () {
this._paused = !1, (this._isFinished || this._idle) && (this._currentTime = this._playbackRate > 0 ? 0 : this._totalDuration, this._startTime = null, b.invalidateEffects()), this._finishedFlag = !1, b.restart(), this._idle = !1, this._ensureAlive();
},
pause: function () {
this._isFinished || this._paused || this._idle || (this._currentTimePending = !0), this._startTime = null, this._paused = !0;
},
finish: function () {
this._idle || (this.currentTime = this._playbackRate > 0 ? this._totalDuration : 0, this._startTime = this._totalDuration - this.currentTime, this._currentTimePending = !1);
},
cancel: function () {
this._inEffect && (this._inEffect = !1, this._idle = !0, this.currentTime = 0, this._startTime = null, this._effect._update(null), b.invalidateEffects(), b.restart());
},
reverse: function () {
this.playbackRate *= -1, this.play();
},
addEventListener: function (a, b) {
'function' == typeof b && 'finish' == a && this._finishHandlers.push(b);
},
removeEventListener: function (a, b) {
if ('finish' == a) {
var c = this._finishHandlers.indexOf(b);
c >= 0 && this._finishHandlers.splice(c, 1);
}
},
_fireEvents: function (a) {
var b = this._isFinished;
if ((b || this._idle) && !this._finishedFlag) {
var d = new c(this, this._currentTime, a), e = this._finishHandlers.concat(this.onfinish ? [this.onfinish] : []);
setTimeout(function () {
e.forEach(function (a) {
a.call(d.target, d);
});
}, 0);
}
this._finishedFlag = b;
},
_tick: function (a) {
return this._idle || this._paused || (null == this._startTime ? this.startTime = a - this._currentTime / this.playbackRate : this._isFinished || this._tickCurrentTime((a - this._startTime) * this.playbackRate)), this._currentTimePending = !1, this._fireEvents(a), !this._idle && (this._inEffect || !this._finishedFlag);
}
};
}(c, d, f), function (a, b) {
function c(a) {
var b = i;
i = [], a < s.currentTime && (a = s.currentTime), g(a), b.forEach(function (b) {
b[1](a);
}), o && g(a), f(), l = void 0;
}
function d(a, b) {
return a._sequenceNumber - b._sequenceNumber;
}
function e() {
this._animations = [], this.currentTime = window.performance && performance.now ? performance.now() : 0;
}
function f() {
p.forEach(function (a) {
a();
}), p.length = 0;
}
function g(a) {
n = !1;
var c = b.timeline;
c.currentTime = a, c._animations.sort(d), m = !1;
var e = c._animations;
c._animations = [];
var f = [], g = [];
e = e.filter(function (b) {
return b._inTimeline = b._tick(a), b._inEffect ? g.push(b._effect) : f.push(b._effect), b._isFinished || b._paused || b._idle || (m = !0), b._inTimeline;
}), p.push.apply(p, f), p.push.apply(p, g), c._animations.push.apply(c._animations, e), o = !1, m && requestAnimationFrame(function () {
});
}
var h = window.requestAnimationFrame, i = [], j = 0;
window.requestAnimationFrame = function (a) {
var b = j++;
return 0 == i.length && h(c), i.push([
b,
a
]), b;
}, window.cancelAnimationFrame = function (a) {
i.forEach(function (b) {
b[0] == a && (b[1] = function () {
});
});
}, e.prototype = {
_play: function (c) {
c._timing = a.normalizeTimingInput(c.timing);
var d = new b.Animation(c);
return d._idle = !1, d._timeline = this, this._animations.push(d), b.restart(), b.invalidateEffects(), d;
}
};
var k, l = void 0, k = function () {
return void 0 == l && (l = performance.now()), l;
}, m = !1, n = !1;
b.restart = function () {
return m || (m = !0, requestAnimationFrame(function () {
}), n = !0), n;
};
var o = !1;
b.invalidateEffects = function () {
o = !0;
};
var p = [], q = 1000 / 60, r = window.getComputedStyle;
Object.defineProperty(window, 'getComputedStyle', {
configurable: !0,
enumerable: !0,
value: function () {
if (o) {
var a = k();
a - s.currentTime > 0 && (s.currentTime += q * (Math.floor((a - s.currentTime) / q) + 1)), g(s.currentTime);
}
return f(), r.apply(this, arguments);
}
});
var s = new e();
b.timeline = s;
}(c, d, f), function (a) {
function b(a, b) {
var c = a.exec(b);
return c ? (c = a.ignoreCase ? c[0].toLowerCase() : c[0], [
c,
b.substr(c.length)
]) : void 0;
}
function c(a, b) {
b = b.replace(/^\s*/, '');
var c = a(b);
return c ? [
c[0],
c[1].replace(/^\s*/, '')
] : void 0;
}
function d(a, d, e) {
a = c.bind(null, a);
for (var f = [];;) {
var g = a(e);
if (!g)
return [
f,
e
];
if (f.push(g[0]), e = g[1], g = b(d, e), !g || '' == g[1])
return [
f,
e
];
e = g[1];
}
}
function e(a, b) {
for (var c = 0, d = 0; d < b.length && (!/\s|,/.test(b[d]) || 0 != c); d++)
if ('(' == b[d])
c++;
else if (')' == b[d] && (c--, 0 == c && d++, 0 >= c))
break;
var e = a(b.substr(0, d));
return void 0 == e ? void 0 : [
e,
b.substr(d)
];
}
function f(a, b) {
for (var c = a, d = b; c && d;)
c > d ? c %= d : d %= c;
return c = a * b / (c + d);
}
function g(a) {
return function (b) {
var c = a(b);
return c && (c[0] = void 0), c;
};
}
function h(a, b) {
return function (c) {
var d = a(c);
return d ? d : [
b,
c
];
};
}
function i(b, c) {
for (var d = [], e = 0; e < b.length; e++) {
var f = a.consumeTrimmed(b[e], c);
if (!f || '' == f[0])
return;
void 0 !== f[0] && d.push(f[0]), c = f[1];
}
return '' == c ? d : void 0;
}
function j(a, b, c, d, e) {
for (var g = [], h = [], i = [], j = f(d.length, e.length), k = 0; j > k; k++) {
var l = b(d[k % d.length], e[k % e.length]);
if (!l)
return;
g.push(l[0]), h.push(l[1]), i.push(l[2]);
}
return [
g,
h,
function (b) {
var d = b.map(function (a, b) {
return i[b](a);
}).join(c);
return a ? a(d) : d;
}
];
}
function k(a, b, c) {
for (var d = [], e = [], f = [], g = 0, h = 0; h < c.length; h++)
if ('function' == typeof c[h]) {
var i = c[h](a[g], b[g++]);
d.push(i[0]), e.push(i[1]), f.push(i[2]);
} else
!function (a) {
d.push(!1), e.push(!1), f.push(function () {
return c[a];
});
}(h);
return [
d,
e,
function (a) {
for (var b = '', c = 0; c < a.length; c++)
b += f[c](a[c]);
return b;
}
];
}
a.consumeToken = b, a.consumeTrimmed = c, a.consumeRepeated = d, a.consumeParenthesised = e, a.ignore = g, a.optional = h, a.consumeList = i, a.mergeNestedRepeated = j.bind(null, null), a.mergeWrappedNestedRepeated = j, a.mergeList = k;
}(d), function (a) {
function b(b) {
function c(b) {
var c = a.consumeToken(/^inset/i, b);
if (c)
return d.inset = !0, c;
var c = a.consumeLengthOrPercent(b);
if (c)
return d.lengths.push(c[0]), c;
var c = a.consumeColor(b);
return c ? (d.color = c[0], c) : void 0;
}
var d = {
inset: !1,
lengths: [],
color: null
}, e = a.consumeRepeated(c, /^/, b);
return e && e[0].length ? [
d,
e[1]
] : void 0;
}
function c(c) {
var d = a.consumeRepeated(b, /^,/, c);
return d && '' == d[1] ? d[0] : void 0;
}
function d(b, c) {
for (; b.lengths.length < Math.max(b.lengths.length, c.lengths.length);)
b.lengths.push({ px: 0 });
for (; c.lengths.length < Math.max(b.lengths.length, c.lengths.length);)
c.lengths.push({ px: 0 });
if (b.inset == c.inset && !!b.color == !!c.color) {
for (var d, e = [], f = [
[],
0
], g = [
[],
0
], h = 0; h < b.lengths.length; h++) {
var i = a.mergeDimensions(b.lengths[h], c.lengths[h], 2 == h);
f[0].push(i[0]), g[0].push(i[1]), e.push(i[2]);
}
if (b.color && c.color) {
var j = a.mergeColors(b.color, c.color);
f[1] = j[0], g[1] = j[1], d = j[2];
}
return [
f,
g,
function (a) {
for (var c = b.inset ? 'inset ' : ' ', f = 0; f < e.length; f++)
c += e[f](a[0][f]) + ' ';
return d && (c += d(a[1])), c;
}
];
}
}
function e(b, c, d, e) {
function f(a) {
return {
inset: a,
color: [
0,
0,
0,
0
],
lengths: [
{ px: 0 },
{ px: 0 },
{ px: 0 },
{ px: 0 }
]
};
}
for (var g = [], h = [], i = 0; i < d.length || i < e.length; i++) {
var j = d[i] || f(e[i].inset), k = e[i] || f(d[i].inset);
g.push(j), h.push(k);
}
return a.mergeNestedRepeated(b, c, g, h);
}
var f = e.bind(null, d, ', ');
a.addPropertiesHandler(c, f, [
'box-shadow',
'text-shadow'
]);
}(d), function (a) {
function b(a) {
return a.toFixed(3).replace('.000', '');
}
function c(a, b, c) {
return Math.min(b, Math.max(a, c));
}
function d(a) {
return /^\s*[-+]?(\d*\.)?\d+\s*$/.test(a) ? Number(a) : void 0;
}
function e(a, c) {
return [
a,
c,
b
];
}
function f(a, b) {
return 0 != a ? h(0, 1 / 0)(a, b) : void 0;
}
function g(a, b) {
return [
a,
b,
function (a) {
return Math.round(c(1, 1 / 0, a));
}
];
}
function h(a, d) {
return function (e, f) {
return [
e,
f,
function (e) {
return b(c(a, d, e));
}
];
};
}
function i(a, b) {
return [
a,
b,
Math.round
];
}
a.clamp = c, a.addPropertiesHandler(d, h(0, 1 / 0), [
'border-image-width',
'line-height'
]), a.addPropertiesHandler(d, h(0, 1), [
'opacity',
'shape-image-threshold'
]), a.addPropertiesHandler(d, f, [
'flex-grow',
'flex-shrink'
]), a.addPropertiesHandler(d, g, [
'orphans',
'widows'
]), a.addPropertiesHandler(d, i, ['z-index']), a.parseNumber = d, a.mergeNumbers = e, a.numberToString = b;
}(d, f), function (a) {
function b(a, b) {
return 'visible' == a || 'visible' == b ? [
0,
1,
function (c) {
return 0 >= c ? a : c >= 1 ? b : 'visible';
}
] : void 0;
}
a.addPropertiesHandler(String, b, ['visibility']);
}(d), function (a) {
function b(a) {
a = a.trim(), e.fillStyle = '#000', e.fillStyle = a;
var b = e.fillStyle;
if (e.fillStyle = '#fff', e.fillStyle = a, b == e.fillStyle) {
e.fillRect(0, 0, 1, 1);
var c = e.getImageData(0, 0, 1, 1).data;
e.clearRect(0, 0, 1, 1);
var d = c[3] / 255;
return [
c[0] * d,
c[1] * d,
c[2] * d,
d
];
}
}
function c(b, c) {
return [
b,
c,
function (b) {
function c(a) {
return Math.max(0, Math.min(255, a));
}
if (b[3])
for (var d = 0; 3 > d; d++)
b[d] = Math.round(c(b[d] / b[3]));
return b[3] = a.numberToString(a.clamp(0, 1, b[3])), 'rgba(' + b.join(',') + ')';
}
];
}
var d = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
d.width = d.height = 1;
var e = d.getContext('2d');
a.addPropertiesHandler(b, c, [
'background-color',
'border-bottom-color',
'border-left-color',
'border-right-color',
'border-top-color',
'color',
'outline-color',
'text-decoration-color'
]), a.consumeColor = a.consumeParenthesised.bind(null, b), a.mergeColors = c;
}(d, f), function (a, b) {
function c(a, b) {
if (b = b.trim().toLowerCase(), '0' == b && 'px'.search(a) >= 0)
return { px: 0 };
if (/^[^(]*$|^calc/.test(b)) {
b = b.replace(/calc\(/g, '(');
var c = {};
b = b.replace(a, function (a) {
return c[a] = null, 'U' + a;
});
for (var d = 'U(' + a.source + ')', e = b.replace(/[-+]?(\d*\.)?\d+/g, 'N').replace(new RegExp('N' + d, 'g'), 'D').replace(/\s[+-]\s/g, 'O').replace(/\s/g, ''), f = [
/N\*(D)/g,
/(N|D)[*\/]N/g,
/(N|D)O\1/g,
/\((N|D)\)/g
], g = 0; g < f.length;)
f[g].test(e) ? (e = e.replace(f[g], '$1'), g = 0) : g++;
if ('D' == e) {
for (var h in c) {
var i = eval(b.replace(new RegExp('U' + h, 'g'), '').replace(new RegExp(d, 'g'), '*0'));
if (!isFinite(i))
return;
c[h] = i;
}
return c;
}
}
}
function d(a, b) {
return e(a, b, !0);
}
function e(b, c, d) {
var e, f = [];
for (e in b)
f.push(e);
for (e in c)
f.indexOf(e) < 0 && f.push(e);
return b = f.map(function (a) {
return b[a] || 0;
}), c = f.map(function (a) {
return c[a] || 0;
}), [
b,
c,
function (b) {
var c = b.map(function (c, e) {
return 1 == b.length && d && (c = Math.max(c, 0)), a.numberToString(c) + f[e];
}).join(' + ');
return b.length > 1 ? 'calc(' + c + ')' : c;
}
];
}
var f = 'px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc', g = c.bind(null, new RegExp(f, 'g')), h = c.bind(null, new RegExp(f + '|%', 'g')), i = c.bind(null, /deg|rad|grad|turn/g);
a.parseLength = g, a.parseLengthOrPercent = h, a.consumeLengthOrPercent = a.consumeParenthesised.bind(null, h), a.parseAngle = i, a.mergeDimensions = e;
var j = a.consumeParenthesised.bind(null, g), k = a.consumeRepeated.bind(void 0, j, /^/), l = a.consumeRepeated.bind(void 0, k, /^,/);
a.consumeSizePairList = l;
var m = function (a) {
var b = l(a);
return b && '' == b[1] ? b[0] : void 0;
}, n = a.mergeNestedRepeated.bind(void 0, d, ' '), o = a.mergeNestedRepeated.bind(void 0, n, ',');
a.mergeNonNegativeSizePair = n, a.addPropertiesHandler(m, o, ['background-size']), a.addPropertiesHandler(h, d, [
'border-bottom-width',
'border-image-width',
'border-left-width',
'border-right-width',
'border-top-width',
'flex-basis',
'font-size',
'height',
'line-height',
'max-height',
'max-width',
'outline-width',
'width'
]), a.addPropertiesHandler(h, e, [
'border-bottom-left-radius',
'border-bottom-right-radius',
'border-top-left-radius',
'border-top-right-radius',
'bottom',
'left',
'letter-spacing',
'margin-bottom',
'margin-left',
'margin-right',
'margin-top',
'min-height',
'min-width',
'outline-offset',
'padding-bottom',
'padding-left',
'padding-right',
'padding-top',
'perspective',
'right',
'shape-margin',
'text-indent',
'top',
'vertical-align',
'word-spacing'
]);
}(d, f), function (a) {
function b(b) {
return a.consumeLengthOrPercent(b) || a.consumeToken(/^auto/, b);
}
function c(c) {
var d = a.consumeList([
a.ignore(a.consumeToken.bind(null, /^rect/)),
a.ignore(a.consumeToken.bind(null, /^\(/)),
a.consumeRepeated.bind(null, b, /^,/),
a.ignore(a.consumeToken.bind(null, /^\)/))
], c);
return d && 4 == d[0].length ? d[0] : void 0;
}
function d(b, c) {
return 'auto' == b || 'auto' == c ? [
!0,
!1,
function (d) {
var e = d ? b : c;
if ('auto' == e)
return 'auto';
var f = a.mergeDimensions(e, e);
return f[2](f[0]);
}
] : a.mergeDimensions(b, c);
}
function e(a) {
return 'rect(' + a + ')';
}
var f = a.mergeWrappedNestedRepeated.bind(null, e, d, ', ');
a.parseBox = c, a.mergeBoxes = f, a.addPropertiesHandler(c, f, ['clip']);
}(d, f), function (a) {
function b(a) {
return function (b) {
var c = 0;
return a.map(function (a) {
return a === j ? b[c++] : a;
});
};
}
function c(a) {
return a;
}
function d(b) {
if (b = b.toLowerCase().trim(), 'none' == b)
return [];
for (var c, d = /\s*(\w+)\(([^)]*)\)/g, e = [], f = 0; c = d.exec(b);) {
if (c.index != f)
return;
f = c.index + c[0].length;
var g = c[1], h = m[g];
if (!h)
return;
var i = c[2].split(','), j = h[0];
if (j.length < i.length)
return;
for (var n = [], o = 0; o < j.length; o++) {
var p, q = i[o], r = j[o];
if (p = q ? {
A: function (b) {
return '0' == b.trim() ? l : a.parseAngle(b);
},
N: a.parseNumber,
T: a.parseLengthOrPercent,
L: a.parseLength
}[r.toUpperCase()](q) : {
a: l,
n: n[0],
t: k
}[r], void 0 === p)
return;
n.push(p);
}
if (e.push({
t: g,
d: n
}), d.lastIndex == b.length)
return e;
}
}
function e(a) {
return a.toFixed(6).replace('.000000', '');
}
function f(b, c) {
if (b.decompositionPair !== c) {
b.decompositionPair = c;
var d = a.makeMatrixDecomposition(b);
}
if (c.decompositionPair !== b) {
c.decompositionPair = b;
var f = a.makeMatrixDecomposition(c);
}
return null == d[0] || null == f[0] ? [
[!1],
[!0],
function (a) {
return a ? c[0].d : b[0].d;
}
] : (d[0].push(0), f[0].push(1), [
d,
f,
function (b) {
var c = a.quat(d[0][3], f[0][3], b[5]), g = a.composeMatrix(b[0], b[1], b[2], c, b[4]), h = g.map(e).join(',');
return h;
}
]);
}
function g(a) {
return a.replace(/[xy]/, '');
}
function h(a) {
return a.replace(/(x|y|z|3d)?$/, '3d');
}
function i(b, c) {
var d = a.makeMatrixDecomposition && !0, e = !1;
if (!b.length || !c.length) {
b.length || (e = !0, b = c, c = []);
for (var i = 0; i < b.length; i++) {
var j = b[i].t, k = b[i].d, l = 'scale' == j.substr(0, 5) ? 1 : 0;
c.push({
t: j,
d: k.map(function (a) {
if ('number' == typeof a)
return l;
var b = {};
for (var c in a)
b[c] = l;
return b;
})
});
}
}
var n = function (a, b) {
return 'perspective' == a && 'perspective' == b || ('matrix' == a || 'matrix3d' == a) && ('matrix' == b || 'matrix3d' == b);
}, o = [], p = [], q = [];
if (b.length != c.length) {
if (!d)
return;
var r = f(b, c);
o = [r[0]], p = [r[1]], q = [[
'matrix',
[r[2]]
]];
} else
for (var i = 0; i < b.length; i++) {
var j, s = b[i].t, t = c[i].t, u = b[i].d, v = c[i].d, w = m[s], x = m[t];
if (n(s, t)) {
if (!d)
return;
var r = f([b[i]], [c[i]]);
o.push(r[0]), p.push(r[1]), q.push([
'matrix',
[r[2]]
]);
} else {
if (s == t)
j = s;
else if (w[2] && x[2] && g(s) == g(t))
j = g(s), u = w[2](u), v = x[2](v);
else {
if (!w[1] || !x[1] || h(s) != h(t)) {
if (!d)
return;
var r = f(b, c);
o = [r[0]], p = [r[1]], q = [[
'matrix',
[r[2]]
]];
break;
}
j = h(s), u = w[1](u), v = x[1](v);
}
for (var y = [], z = [], A = [], B = 0; B < u.length; B++) {
var C = 'number' == typeof u[B] ? a.mergeNumbers : a.mergeDimensions, r = C(u[B], v[B]);
y[B] = r[0], z[B] = r[1], A.push(r[2]);
}
o.push(y), p.push(z), q.push([
j,
A
]);
}
}
if (e) {
var D = o;
o = p, p = D;
}
return [
o,
p,
function (a) {
return a.map(function (a, b) {
var c = a.map(function (a, c) {
return q[b][1][c](a);
}).join(',');
return 'matrix' == q[b][0] && 16 == c.split(',').length && (q[b][0] = 'matrix3d'), q[b][0] + '(' + c + ')';
}).join(' ');
}
];
}
var j = null, k = { px: 0 }, l = { deg: 0 }, m = {
matrix: [
'NNNNNN',
[
j,
j,
0,
0,
j,
j,
0,
0,
0,
0,
1,
0,
j,
j,
0,
1
],
c
],
matrix3d: [
'NNNNNNNNNNNNNNNN',
c
],
rotate: ['A'],
rotatex: ['A'],
rotatey: ['A'],
rotatez: ['A'],
rotate3d: ['NNNA'],
perspective: ['L'],
scale: [
'Nn',
b([
j,
j,
1
]),
c
],
scalex: [
'N',
b([
j,
1,
1
]),
b([
j,
1
])
],
scaley: [
'N',
b([
1,
j,
1
]),
b([
1,
j
])
],
scalez: [
'N',
b([
1,
1,
j
])
],
scale3d: [
'NNN',
c
],
skew: [
'Aa',
null,
c
],
skewx: [
'A',
null,
b([
j,
l
])
],
skewy: [
'A',
null,
b([
l,
j
])
],
translate: [
'Tt',
b([
j,
j,
k
]),
c
],
translatex: [
'T',
b([
j,
k,
k
]),
b([
j,
k
])
],
translatey: [
'T',
b([
k,
j,
k
]),
b([
k,
j
])
],
translatez: [
'L',
b([
k,
k,
j
])
],
translate3d: [
'TTL',
c
]
};
a.addPropertiesHandler(d, i, ['transform']);
}(d, f), function (a) {
function b(a, b) {
b.concat([a]).forEach(function (b) {
b in document.documentElement.style && (c[a] = b);
});
}
var c = {};
b('transform', [
'webkitTransform',
'msTransform'
]), b('transformOrigin', ['webkitTransformOrigin']), b('perspective', ['webkitPerspective']), b('perspectiveOrigin', ['webkitPerspectiveOrigin']), a.propertyName = function (a) {
return c[a] || a;
};
}(d, f);
}(), !function (a, b) {
function c(a) {
var b = window.document.timeline;
b.currentTime = a, b._discardAnimations(), 0 == b._animations.length ? e = !1 : requestAnimationFrame(c);
}
var d = window.requestAnimationFrame;
window.requestAnimationFrame = function (a) {
return d(function (b) {
window.document.timeline._updateAnimationsPromises(), a(b), window.document.timeline._updateAnimationsPromises();
});
}, b.AnimationTimeline = function () {
this._animations = [], this.currentTime = void 0;
}, b.AnimationTimeline.prototype = {
getAnimations: function () {
return this._discardAnimations(), this._animations.slice();
},
_updateAnimationsPromises: function () {
b.animationsWithPromises = b.animationsWithPromises.filter(function (a) {
return a._updatePromises();
});
},
_discardAnimations: function () {
this._updateAnimationsPromises(), this._animations = this._animations.filter(function (a) {
return 'finished' != a.playState && 'idle' != a.playState;
});
},
_play: function (a) {
var c = new b.Animation(a, this);
return this._animations.push(c), b.restartWebAnimationsNextTick(), c._updatePromises(), c._animation.play(), c._updatePromises(), c;
},
play: function (a) {
return a && a.remove(), this._play(a);
}
};
var e = !1;
b.restartWebAnimationsNextTick = function () {
e || (e = !0, requestAnimationFrame(c));
};
var f = new b.AnimationTimeline();
b.timeline = f;
try {
Object.defineProperty(window.document, 'timeline', {
configurable: !0,
get: function () {
return f;
}
});
} catch (g) {
}
try {
window.document.timeline = f;
} catch (g) {
}
}(c, e, f), function (a, b) {
b.animationsWithPromises = [], b.Animation = function (b, c) {
if (this.effect = b, b && (b._animation = this), !c)
throw new Error('Animation with null timeline is not supported');
this._timeline = c, this._sequenceNumber = a.sequenceNumber++, this._holdTime = 0, this._paused = !1, this._isGroup = !1, this._animation = null, this._childAnimations = [], this._callback = null, this._oldPlayState = 'idle', this._rebuildUnderlyingAnimation(), this._animation.cancel(), this._updatePromises();
}, b.Animation.prototype = {
_updatePromises: function () {
var a = this._oldPlayState, b = this.playState;
return this._readyPromise && b !== a && ('idle' == b ? (this._rejectReadyPromise(), this._readyPromise = void 0) : 'pending' == a ? this._resolveReadyPromise() : 'pending' == b && (this._readyPromise = void 0)), this._finishedPromise && b !== a && ('idle' == b ? (this._rejectFinishedPromise(), this._finishedPromise = void 0) : 'finished' == b ? this._resolveFinishedPromise() : 'finished' == a && (this._finishedPromise = void 0)), this._oldPlayState = this.playState, this._readyPromise || this._finishedPromise;
},
_rebuildUnderlyingAnimation: function () {
this._updatePromises();
var a, c, d, e, f = this._animation ? !0 : !1;
f && (a = this.playbackRate, c = this._paused, d = this.startTime, e = this.currentTime, this._animation.cancel(), this._animation._wrapper = null, this._animation = null), (!this.effect || this.effect instanceof window.KeyframeEffect) && (this._animation = b.newUnderlyingAnimationForKeyframeEffect(this.effect), b.bindAnimationForKeyframeEffect(this)), (this.effect instanceof window.SequenceEffect || this.effect instanceof window.GroupEffect) && (this._animation = b.newUnderlyingAnimationForGroup(this.effect), b.bindAnimationForGroup(this)), this.effect && this.effect._onsample && b.bindAnimationForCustomEffect(this), f && (1 != a && (this.playbackRate = a), null !== d ? this.startTime = d : null !== e ? this.currentTime = e : null !== this._holdTime && (this.currentTime = this._holdTime), c && this.pause()), this._updatePromises();
},
_updateChildren: function () {
if (this.effect && 'idle' != this.playState) {
var a = this.effect._timing.delay;
this._childAnimations.forEach(function (c) {
this._arrangeChildren(c, a), this.effect instanceof window.SequenceEffect && (a += b.groupChildDuration(c.effect));
}.bind(this));
}
},
_setExternalAnimation: function (a) {
if (this.effect && this._isGroup)
for (var b = 0; b < this.effect.children.length; b++)
this.effect.children[b]._animation = a, this._childAnimations[b]._setExternalAnimation(a);
},
_constructChildAnimations: function () {
if (this.effect && this._isGroup) {
var a = this.effect._timing.delay;
this._removeChildAnimations(), this.effect.children.forEach(function (c) {
var d = window.document.timeline._play(c);
this._childAnimations.push(d), d.playbackRate = this.playbackRate, this._paused && d.pause(), c._animation = this.effect._animation, this._arrangeChildren(d, a), this.effect instanceof window.SequenceEffect && (a += b.groupChildDuration(c));
}.bind(this));
}
},
_arrangeChildren: function (a, b) {
null === this.startTime ? a.currentTime = this.currentTime - b / this.playbackRate : a.startTime !== this.startTime + b / this.playbackRate && (a.startTime = this.startTime + b / this.playbackRate);
},
get timeline() {
return this._timeline;
},
get playState() {
return this._animation ? this._animation.playState : 'idle';
},
get finished() {
return window.Promise ? (this._finishedPromise || (-1 == b.animationsWithPromises.indexOf(this) && b.animationsWithPromises.push(this), this._finishedPromise = new Promise(function (a, b) {
this._resolveFinishedPromise = function () {
a(this);
}, this._rejectFinishedPromise = function () {
b({
type: DOMException.ABORT_ERR,
name: 'AbortError'
});
};
}.bind(this)), 'finished' == this.playState && this._resolveFinishedPromise()), this._finishedPromise) : (console.warn('Animation Promises require JavaScript Promise constructor'), null);
},
get ready() {
return window.Promise ? (this._readyPromise || (-1 == b.animationsWithPromises.indexOf(this) && b.animationsWithPromises.push(this), this._readyPromise = new Promise(function (a, b) {
this._resolveReadyPromise = function () {
a(this);
}, this._rejectReadyPromise = function () {
b({
type: DOMException.ABORT_ERR,
name: 'AbortError'
});
};
}.bind(this)), 'pending' !== this.playState && this._resolveReadyPromise()), this._readyPromise) : (console.warn('Animation Promises require JavaScript Promise constructor'), null);
},
get onfinish() {
return this._onfinish;
},
set onfinish(a) {
'function' == typeof a ? (this._onfinish = a, this._animation.onfinish = function (b) {
b.target = this, a.call(this, b);
}.bind(this)) : (this._animation.onfinish = a, this.onfinish = this._animation.onfinish);
},
get currentTime() {
this._updatePromises();
var a = this._animation.currentTime;
return this._updatePromises(), a;
},
set currentTime(a) {
this._updatePromises(), this._animation.currentTime = isFinite(a) ? a : Math.sign(a) * Number.MAX_VALUE, this._register(), this._forEachChild(function (b, c) {
b.currentTime = a - c;
}), this._updatePromises();
},
get startTime() {
return this._animation.startTime;
},
set startTime(a) {
this._updatePromises(), this._animation.startTime = isFinite(a) ? a : Math.sign(a) * Number.MAX_VALUE, this._register(), this._forEachChild(function (b, c) {
b.startTime = a + c;
}), this._updatePromises();
},
get playbackRate() {
return this._animation.playbackRate;
},
set playbackRate(a) {
this._updatePromises();
var b = this.currentTime;
this._animation.playbackRate = a, this._forEachChild(function (b) {
b.playbackRate = a;
}), 'paused' != this.playState && 'idle' != this.playState && this.play(), null !== b && (this.currentTime = b), this._updatePromises();
},
play: function () {
this._updatePromises(), this._paused = !1, this._animation.play(), -1 == this._timeline._animations.indexOf(this) && this._timeline._animations.push(this), this._register(), b.awaitStartTime(this), this._forEachChild(function (a) {
var b = a.currentTime;
a.play(), a.currentTime = b;
}), this._updatePromises();
},
pause: function () {
this._updatePromises(), this.currentTime && (this._holdTime = this.currentTime), this._animation.pause(), this._register(), this._forEachChild(function (a) {
a.pause();
}), this._paused = !0, this._updatePromises();
},
finish: function () {
this._updatePromises(), this._animation.finish(), this._register(), this._updatePromises();
},
cancel: function () {
this._updatePromises(), this._animation.cancel(), this._register(), this._removeChildAnimations(), this._updatePromises();
},
reverse: function () {
this._updatePromises();
var a = this.currentTime;
this._animation.reverse(), this._forEachChild(function (a) {
a.reverse();
}), null !== a && (this.currentTime = a), this._updatePromises();
},
addEventListener: function (a, b) {
var c = b;
'function' == typeof b && (c = function (a) {
a.target = this, b.call(this, a);
}.bind(this), b._wrapper = c), this._animation.addEventListener(a, c);
},
removeEventListener: function (a, b) {
this._animation.removeEventListener(a, b && b._wrapper || b);
},
_removeChildAnimations: function () {
for (; this._childAnimations.length;)
this._childAnimations.pop().cancel();
},
_forEachChild: function (b) {
var c = 0;
if (this.effect.children && this._childAnimations.length < this.effect.children.length && this._constructChildAnimations(), this._childAnimations.forEach(function (a) {
b.call(this, a, c), this.effect instanceof window.SequenceEffect && (c += a.effect.activeDuration);
}.bind(this)), 'pending' != this.playState) {
var d = this.effect._timing, e = this.currentTime;
null !== e && (e = a.calculateTimeFraction(a.calculateActiveDuration(d), e, d)), (null == e || isNaN(e)) && this._removeChildAnimations();
}
}
}, window.Animation = b.Animation;
}(c, e, f), function (a, b) {
function c(b) {
this._frames = a.normalizeKeyframes(b);
}
function d() {
for (var a = !1; h.length;) {
var b = h.shift();
b._updateChildren(), a = !0;
}
return a;
}
var e = function (a) {
if (a._animation = void 0, a instanceof window.SequenceEffect || a instanceof window.GroupEffect)
for (var b = 0; b < a.children.length; b++)
e(a.children[b]);
};
b.removeMulti = function (a) {
for (var b = [], c = 0; c < a.length; c++) {
var d = a[c];
d._parent ? (-1 == b.indexOf(d._parent) && b.push(d._parent), d._parent.children.splice(d._parent.children.indexOf(d), 1), d._parent = null, e(d)) : d._animation && d._animation.effect == d && (d._animation.cancel(), d._animation.effect = new KeyframeEffect(null, []), d._animation._callback && (d._animation._callback._animation = null), d._animation._rebuildUnderlyingAnimation(), e(d));
}
for (c = 0; c < b.length; c++)
b[c]._rebuild();
}, b.KeyframeEffect = function (b, d, e) {
return this.target = b, this._parent = null, e = a.numericTimingToObject(e), this._timingInput = a.cloneTimingInput(e), this._timing = a.normalizeTimingInput(e), this.timing = a.makeTiming(e, !1, this), this.timing._effect = this, 'function' == typeof d ? (a.deprecated('Custom KeyframeEffect', '2015-06-22', 'Use KeyframeEffect.onsample instead.'), this._normalizedKeyframes = d) : this._normalizedKeyframes = new c(d), this._keyframes = d, this.activeDuration = a.calculateActiveDuration(this._timing), this;
}, b.KeyframeEffect.prototype = {
getFrames: function () {
return 'function' == typeof this._normalizedKeyframes ? this._normalizedKeyframes : this._normalizedKeyframes._frames;
},
set onsample(a) {
if ('function' == typeof this.getFrames())
throw new Error('Setting onsample on custom effect KeyframeEffect is not supported.');
this._onsample = a, this._animation && this._animation._rebuildUnderlyingAnimation();
},
get parent() {
return this._parent;
},
clone: function () {
if ('function' == typeof this.getFrames())
throw new Error('Cloning custom effects is not supported.');
var b = new KeyframeEffect(this.target, [], a.cloneTimingInput(this._timingInput));
return b._normalizedKeyframes = this._normalizedKeyframes, b._keyframes = this._keyframes, b;
},
remove: function () {
b.removeMulti([this]);
}
};
var f = Element.prototype.animate;
Element.prototype.animate = function (a, c) {
return b.timeline._play(new b.KeyframeEffect(this, a, c));
};
var g = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
b.newUnderlyingAnimationForKeyframeEffect = function (a) {
if (a) {
var b = a.target || g, c = a._keyframes;
'function' == typeof c && (c = []);
var d = a._timingInput;
} else
var b = g, c = [], d = 0;
return f.apply(b, [
c,
d
]);
}, b.bindAnimationForKeyframeEffect = function (a) {
a.effect && 'function' == typeof a.effect._normalizedKeyframes && b.bindAnimationForCustomEffect(a);
};
var h = [];
b.awaitStartTime = function (a) {
null === a.startTime && a._isGroup && (0 == h.length && requestAnimationFrame(d), h.push(a));
};
var i = window.getComputedStyle;
Object.defineProperty(window, 'getComputedStyle', {
configurable: !0,
enumerable: !0,
value: function () {
window.document.timeline._updateAnimationsPromises();
var a = i.apply(this, arguments);
return d() && (a = i.apply(this, arguments)), window.document.timeline._updateAnimationsPromises(), a;
}
}), window.KeyframeEffect = b.KeyframeEffect, window.Element.prototype.getAnimations = function () {
return document.timeline.getAnimations().filter(function (a) {
return null !== a.effect && a.effect.target == this;
}.bind(this));
};
}(c, e, f), function (a, b) {
function c(a) {
a._registered || (a._registered = !0, f.push(a), g || (g = !0, requestAnimationFrame(d)));
}
function d() {
var a = f;
f = [], a.sort(function (a, b) {
return a._sequenceNumber - b._sequenceNumber;
}), a = a.filter(function (a) {
a();
var b = a._animation ? a._animation.playState : 'idle';
return 'running' != b && 'pending' != b && (a._registered = !1), a._registered;
}), f.push.apply(f, a), f.length ? (g = !0, requestAnimationFrame(d)) : g = !1;
}
var e = (document.createElementNS('http://www.w3.org/1999/xhtml', 'div'), 0);
b.bindAnimationForCustomEffect = function (b) {
var d, f = b.effect.target, g = 'function' == typeof b.effect.getFrames();
d = g ? b.effect.getFrames() : b.effect._onsample;
var h = b.effect.timing, i = null;
h = a.normalizeTimingInput(h);
var j = function () {
var c = j._animation ? j._animation.currentTime : null;
null !== c && (c = a.calculateTimeFraction(a.calculateActiveDuration(h), c, h), isNaN(c) && (c = null)), c !== i && (g ? d(c, f, b.effect) : d(c, b.effect, b.effect._animation)), i = c;
};
j._animation = b, j._registered = !1, j._sequenceNumber = e++, b._callback = j, c(j);
};
var f = [], g = !1;
b.Animation.prototype._register = function () {
this._callback && c(this._callback);
};
}(c, e, f), function (a, b) {
function c(a) {
return a._timing.delay + a.activeDuration + a._timing.endDelay;
}
function d(b, c) {
this._parent = null, this.children = b || [], this._reparent(this.children), c = a.numericTimingToObject(c), this._timingInput = a.cloneTimingInput(c), this._timing = a.normalizeTimingInput(c, !0), this.timing = a.makeTiming(c, !0, this), this.timing._effect = this, 'auto' === this._timing.duration && (this._timing.duration = this.activeDuration);
}
window.SequenceEffect = function () {
d.apply(this, arguments);
}, window.GroupEffect = function () {
d.apply(this, arguments);
}, d.prototype = {
_isAncestor: function (a) {
for (var b = this; null !== b;) {
if (b == a)
return !0;
b = b._parent;
}
return !1;
},
_rebuild: function () {
for (var a = this; a;)
'auto' === a.timing.duration && (a._timing.duration = a.activeDuration), a = a._parent;
this._animation && this._animation._rebuildUnderlyingAnimation();
},
_reparent: function (a) {
b.removeMulti(a);
for (var c = 0; c < a.length; c++)
a[c]._parent = this;
},
_putChild: function (a, b) {
for (var c = b ? 'Cannot append an ancestor or self' : 'Cannot prepend an ancestor or self', d = 0; d < a.length; d++)
if (this._isAncestor(a[d]))
throw {
type: DOMException.HIERARCHY_REQUEST_ERR,
name: 'HierarchyRequestError',
message: c
};
for (var d = 0; d < a.length; d++)
b ? this.children.push(a[d]) : this.children.unshift(a[d]);
this._reparent(a), this._rebuild();
},
append: function () {
this._putChild(arguments, !0);
},
prepend: function () {
this._putChild(arguments, !1);
},
get parent() {
return this._parent;
},
get firstChild() {
return this.children.length ? this.children[0] : null;
},
get lastChild() {
return this.children.length ? this.children[this.children.length - 1] : null;
},
clone: function () {
for (var b = a.cloneTimingInput(this._timingInput), c = [], d = 0; d < this.children.length; d++)
c.push(this.children[d].clone());
return this instanceof GroupEffect ? new GroupEffect(c, b) : new SequenceEffect(c, b);
},
remove: function () {
b.removeMulti([this]);
}
}, window.SequenceEffect.prototype = Object.create(d.prototype), Object.defineProperty(window.SequenceEffect.prototype, 'activeDuration', {
get: function () {
var a = 0;
return this.children.forEach(function (b) {
a += c(b);
}), Math.max(a, 0);
}
}), window.GroupEffect.prototype = Object.create(d.prototype), Object.defineProperty(window.GroupEffect.prototype, 'activeDuration', {
get: function () {
var a = 0;
return this.children.forEach(function (b) {
a = Math.max(a, c(b));
}), a;
}
}), b.newUnderlyingAnimationForGroup = function (c) {
var d, e = null, f = function (b) {
var c = d._wrapper;
return c && 'pending' != c.playState && c.effect ? null == b ? void c._removeChildAnimations() : 0 == b && c.playbackRate < 0 && (e || (e = a.normalizeTimingInput(c.effect.timing)), b = a.calculateTimeFraction(a.calculateActiveDuration(e), -1, e), isNaN(b) || null == b) ? (c._forEachChild(function (a) {
a.currentTime = -1;
}), void c._removeChildAnimations()) : void 0 : void 0;
}, g = new KeyframeEffect(null, [], c._timing);
return g.onsample = f, d = b.timeline._play(g);
}, b.bindAnimationForGroup = function (a) {
a._animation._wrapper = a, a._isGroup = !0, b.awaitStartTime(a), a._constructChildAnimations(), a._setExternalAnimation(a);
}, b.groupChildDuration = c;
}(c, e, f);
}({}, function () {
return this;
}());
Polymer({
is: 'opaque-animation',
behaviors: [Polymer.NeonAnimationBehavior],
configure: function (config) {
var node = config.node;
node.style.opacity = '0';
this._effect = new KeyframeEffect(node, [
{ 'opacity': '1' },
{ 'opacity': '1' }
], this.timingFromConfig(config));
return this._effect;
},
complete: function (config) {
config.node.style.opacity = '';
}
});
Polymer.NeonAnimatableBehavior = {
properties: {
animationConfig: { type: Object },
entryAnimation: {
observer: '_entryAnimationChanged',
type: String
},
exitAnimation: {
observer: '_exitAnimationChanged',
type: String
}
},
_entryAnimationChanged: function () {
this.animationConfig = this.animationConfig || {};
if (this.entryAnimation !== 'fade-in-animation') {
this.animationConfig['entry'] = [
{
name: 'opaque-animation',
node: this
},
{
name: this.entryAnimation,
node: this
}
];
} else {
this.animationConfig['entry'] = [{
name: this.entryAnimation,
node: this
}];
}
},
_exitAnimationChanged: function () {
this.animationConfig = this.animationConfig || {};
this.animationConfig['exit'] = [{
name: this.exitAnimation,
node: this
}];
},
_copyProperties: function (config1, config2) {
for (var property in config2) {
config1[property] = config2[property];
}
},
_cloneConfig: function (config) {
var clone = { isClone: true };
this._copyProperties(clone, config);
return clone;
},
_getAnimationConfigRecursive: function (type, map, allConfigs) {
if (!this.animationConfig) {
return;
}
var thisConfig;
if (type) {
thisConfig = this.animationConfig[type];
} else {
thisConfig = this.animationConfig;
}
if (!Array.isArray(thisConfig)) {
thisConfig = [thisConfig];
}
if (thisConfig) {
for (var config, index = 0; config = thisConfig[index]; index++) {
if (config.animatable) {
config.animatable._getAnimationConfigRecursive(config.type || type, map, allConfigs);
} else {
if (config.id) {
var cachedConfig = map[config.id];
if (cachedConfig) {
if (!cachedConfig.isClone) {
map[config.id] = this._cloneConfig(cachedConfig);
cachedConfig = map[config.id];
}
this._copyProperties(cachedConfig, config);
} else {
map[config.id] = config;
}
} else {
allConfigs.push(config);
}
}
}
}
},
getAnimationConfig: function (type) {
var map = [];
var allConfigs = [];
this._getAnimationConfigRecursive(type, map, allConfigs);
for (var key in map) {
allConfigs.push(map[key]);
}
return allConfigs;
}
};
Polymer.NeonAnimationRunnerBehaviorImpl = {
properties: {
_animationMeta: {
type: Object,
value: function () {
return new Polymer.IronMeta({ type: 'animation' });
}
},
_player: { type: Object }
},
_configureAnimationEffects: function (allConfigs) {
var allAnimations = [];
if (allConfigs.length > 0) {
for (var config, index = 0; config = allConfigs[index]; index++) {
var animationConstructor = this._animationMeta.byKey(config.name);
if (animationConstructor) {
var animation = animationConstructor && new animationConstructor();
var effect = animation.configure(config);
if (effect) {
allAnimations.push({
animation: animation,
config: config,
effect: effect
});
}
} else {
console.warn(this.is + ':', config.name, 'not found!');
}
}
}
return allAnimations;
},
_runAnimationEffects: function (allEffects) {
return document.timeline.play(new GroupEffect(allEffects));
},
_completeAnimations: function (allAnimations) {
for (var animation, index = 0; animation = allAnimations[index]; index++) {
animation.animation.complete(animation.config);
}
},
playAnimation: function (type, cookie) {
var allConfigs = this.getAnimationConfig(type);
if (!allConfigs) {
return;
}
var allAnimations = this._configureAnimationEffects(allConfigs);
var allEffects = allAnimations.map(function (animation) {
return animation.effect;
});
if (allEffects.length > 0) {
this._player = this._runAnimationEffects(allEffects);
this._player.onfinish = function () {
this._completeAnimations(allAnimations);
if (this._player) {
this._player.cancel();
this._player = null;
}
this.fire('neon-animation-finish', cookie, { bubbles: false });
}.bind(this);
} else {
this.fire('neon-animation-finish', cookie, { bubbles: false });
}
},
cancelAnimation: function () {
if (this._player) {
this._player.cancel();
}
}
};
Polymer.NeonAnimationRunnerBehavior = [
Polymer.NeonAnimatableBehavior,
Polymer.NeonAnimationRunnerBehaviorImpl
];
(function () {
'use strict';
Polymer.IronDropdownScrollManager = {
get currentLockingElement() {
return this._lockingElements[this._lockingElements.length - 1];
},
elementIsScrollLocked: function (element) {
var currentLockingElement = this.currentLockingElement;
var scrollLocked;
if (this._hasCachedLockedElement(element)) {
return true;
}
if (this._hasCachedUnlockedElement(element)) {
return false;
}
scrollLocked = !!currentLockingElement && currentLockingElement !== element && !this._composedTreeContains(currentLockingElement, element);
if (scrollLocked) {
this._lockedElementCache.push(element);
} else {
this._unlockedElementCache.push(element);
}
return scrollLocked;
},
pushScrollLock: function (element) {
if (this._lockingElements.length === 0) {
this._lockScrollInteractions();
}
this._lockingElements.push(element);
this._lockedElementCache = [];
this._unlockedElementCache = [];
},
removeScrollLock: function (element) {
var index = this._lockingElements.indexOf(element);
if (index === -1) {
return;
}
this._lockingElements.splice(index, 1);
this._lockedElementCache = [];
this._unlockedElementCache = [];
if (this._lockingElements.length === 0) {
this._unlockScrollInteractions();
}
},
_lockingElements: [],
_lockedElementCache: null,
_unlockedElementCache: null,
_originalBodyStyles: {},
_isScrollingKeypress: function (event) {
return Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(event, 'pageup pagedown home end up left down right');
},
_hasCachedLockedElement: function (element) {
return this._lockedElementCache.indexOf(element) > -1;
},
_hasCachedUnlockedElement: function (element) {
return this._unlockedElementCache.indexOf(element) > -1;
},
_composedTreeContains: function (element, child) {
var contentElements;
var distributedNodes;
var contentIndex;
var nodeIndex;
if (element.contains(child)) {
return true;
}
contentElements = Polymer.dom(element).querySelectorAll('content');
for (contentIndex = 0; contentIndex < contentElements.length; ++contentIndex) {
distributedNodes = Polymer.dom(contentElements[contentIndex]).getDistributedNodes();
for (nodeIndex = 0; nodeIndex < distributedNodes.length; ++nodeIndex) {
if (this._composedTreeContains(distributedNodes[nodeIndex], child)) {
return true;
}
}
}
return false;
},
_scrollInteractionHandler: function (event) {
if (Polymer.IronDropdownScrollManager.elementIsScrollLocked(event.target)) {
if (event.type === 'keydown' && !Polymer.IronDropdownScrollManager._isScrollingKeypress(event)) {
return;
}
event.preventDefault();
}
},
_lockScrollInteractions: function () {
this._originalBodyStyles.overflow = document.body.style.overflow;
this._originalBodyStyles.overflowX = document.body.style.overflowX;
this._originalBodyStyles.overflowY = document.body.style.overflowY;
document.body.style.overflow = 'hidden';
document.body.style.overflowX = 'hidden';
document.body.style.overflowY = 'hidden';
window.addEventListener('wheel', this._scrollInteractionHandler, true);
window.addEventListener('mousewheel', this._scrollInteractionHandler, true);
window.addEventListener('DOMMouseScroll', this._scrollInteractionHandler, true);
window.addEventListener('touchmove', this._scrollInteractionHandler, true);
document.addEventListener('keydown', this._scrollInteractionHandler, true);
},
_unlockScrollInteractions: function () {
document.body.style.overflow = this._originalBodyStyles.overflow;
document.body.style.overflowX = this._originalBodyStyles.overflowX;
document.body.style.overflowY = this._originalBodyStyles.overflowY;
window.removeEventListener('wheel', this._scrollInteractionHandler, true);
window.removeEventListener('mousewheel', this._scrollInteractionHandler, true);
window.removeEventListener('DOMMouseScroll', this._scrollInteractionHandler, true);
window.removeEventListener('touchmove', this._scrollInteractionHandler, true);
document.removeEventListener('keydown', this._scrollInteractionHandler, true);
}
};
}());
Polymer({
is: 'fade-in-animation',
behaviors: [Polymer.NeonAnimationBehavior],
configure: function (config) {
var node = config.node;
this._effect = new KeyframeEffect(node, [
{ 'opacity': '0' },
{ 'opacity': '1' }
], this.timingFromConfig(config));
return this._effect;
}
});
Polymer({
is: 'fade-out-animation',
behaviors: [Polymer.NeonAnimationBehavior],
configure: function (config) {
var node = config.node;
this._effect = new KeyframeEffect(node, [
{ 'opacity': '1' },
{ 'opacity': '0' }
], this.timingFromConfig(config));
return this._effect;
}
});
Polymer({
is: 'paper-menu-grow-height-animation',
behaviors: [Polymer.NeonAnimationBehavior],
configure: function (config) {
var node = config.node;
var rect = node.getBoundingClientRect();
var height = rect.height;
this._effect = new KeyframeEffect(node, [
{ height: height / 2 + 'px' },
{ height: height + 'px' }
], this.timingFromConfig(config));
return this._effect;
}
});
Polymer({
is: 'paper-menu-grow-width-animation',
behaviors: [Polymer.NeonAnimationBehavior],
configure: function (config) {
var node = config.node;
var rect = node.getBoundingClientRect();
var width = rect.width;
this._effect = new KeyframeEffect(node, [
{ width: width / 2 + 'px' },
{ width: width + 'px' }
], this.timingFromConfig(config));
return this._effect;
}
});
Polymer({
is: 'paper-menu-shrink-width-animation',
behaviors: [Polymer.NeonAnimationBehavior],
configure: function (config) {
var node = config.node;
var rect = node.getBoundingClientRect();
var width = rect.width;
this._effect = new KeyframeEffect(node, [
{ width: width + 'px' },
{ width: width - width / 20 + 'px' }
], this.timingFromConfig(config));
return this._effect;
}
});
Polymer({
is: 'paper-menu-shrink-height-animation',
behaviors: [Polymer.NeonAnimationBehavior],
configure: function (config) {
var node = config.node;
var rect = node.getBoundingClientRect();
var height = rect.height;
var top = rect.top;
this.setPrefixedProperty(node, 'transformOrigin', '0 0');
this._effect = new KeyframeEffect(node, [
{
height: height + 'px',
transform: 'translateY(0)'
},
{
height: height / 2 + 'px',
transform: 'translateY(-20px)'
}
], this.timingFromConfig(config));
return this._effect;
}
});
Polymer({
is: 'iron-icon',
properties: {
icon: {
type: String,
observer: '_iconChanged'
},
theme: {
type: String,
observer: '_updateIcon'
},
src: {
type: String,
observer: '_srcChanged'
},
_meta: { value: Polymer.Base.create('iron-meta', { type: 'iconset' }) }
},
_DEFAULT_ICONSET: 'icons',
_iconChanged: function (icon) {
var parts = (icon || '').split(':');
this._iconName = parts.pop();
this._iconsetName = parts.pop() || this._DEFAULT_ICONSET;
this._updateIcon();
},
_srcChanged: function (src) {
this._updateIcon();
},
_usesIconset: function () {
return this.icon || !this.src;
},
_updateIcon: function () {
if (this._usesIconset()) {
if (this._iconsetName) {
this._iconset = this._meta.byKey(this._iconsetName);
if (this._iconset) {
this._iconset.applyIcon(this, this._iconName, this.theme);
this.unlisten(window, 'iron-iconset-added', '_updateIcon');
} else {
this.listen(window, 'iron-iconset-added', '_updateIcon');
}
}
} else {
if (!this._img) {
this._img = document.createElement('img');
this._img.style.width = '100%';
this._img.style.height = '100%';
this._img.draggable = false;
}
this._img.src = this.src;
Polymer.dom(this.root).appendChild(this._img);
}
}
});
Polymer({
is: 'paper-material',
properties: {
elevation: {
type: Number,
reflectToAttribute: true,
value: 1
},
animated: {
type: Boolean,
reflectToAttribute: true,
value: false
}
}
});
(function () {
var Utility = {
distance: function (x1, y1, x2, y2) {
var xDelta = x1 - x2;
var yDelta = y1 - y2;
return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
},
now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
};
function ElementMetrics(element) {
this.element = element;
this.width = this.boundingRect.width;
this.height = this.boundingRect.height;
this.size = Math.max(this.width, this.height);
}
ElementMetrics.prototype = {
get boundingRect() {
return this.element.getBoundingClientRect();
},
furthestCornerDistanceFrom: function (x, y) {
var topLeft = Utility.distance(x, y, 0, 0);
var topRight = Utility.distance(x, y, this.width, 0);
var bottomLeft = Utility.distance(x, y, 0, this.height);
var bottomRight = Utility.distance(x, y, this.width, this.height);
return Math.max(topLeft, topRight, bottomLeft, bottomRight);
}
};
function Ripple(element) {
this.element = element;
this.color = window.getComputedStyle(element).color;
this.wave = document.createElement('div');
this.waveContainer = document.createElement('div');
this.wave.style.backgroundColor = this.color;
this.wave.classList.add('wave');
this.waveContainer.classList.add('wave-container');
Polymer.dom(this.waveContainer).appendChild(this.wave);
this.resetInteractionState();
}
Ripple.MAX_RADIUS = 300;
Ripple.prototype = {
get recenters() {
return this.element.recenters;
},
get center() {
return this.element.center;
},
get mouseDownElapsed() {
var elapsed;
if (!this.mouseDownStart) {
return 0;
}
elapsed = Utility.now() - this.mouseDownStart;
if (this.mouseUpStart) {
elapsed -= this.mouseUpElapsed;
}
return elapsed;
},
get mouseUpElapsed() {
return this.mouseUpStart ? Utility.now() - this.mouseUpStart : 0;
},
get mouseDownElapsedSeconds() {
return this.mouseDownElapsed / 1000;
},
get mouseUpElapsedSeconds() {
return this.mouseUpElapsed / 1000;
},
get mouseInteractionSeconds() {
return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds;
},
get initialOpacity() {
return this.element.initialOpacity;
},
get opacityDecayVelocity() {
return this.element.opacityDecayVelocity;
},
get radius() {
var width2 = this.containerMetrics.width * this.containerMetrics.width;
var height2 = this.containerMetrics.height * this.containerMetrics.height;
var waveRadius = Math.min(Math.sqrt(width2 + height2), Ripple.MAX_RADIUS) * 1.1 + 5;
var duration = 1.1 - 0.2 * (waveRadius / Ripple.MAX_RADIUS);
var timeNow = this.mouseInteractionSeconds / duration;
var size = waveRadius * (1 - Math.pow(80, -timeNow));
return Math.abs(size);
},
get opacity() {
if (!this.mouseUpStart) {
return this.initialOpacity;
}
return Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity);
},
get outerOpacity() {
var outerOpacity = this.mouseUpElapsedSeconds * 0.3;
var waveOpacity = this.opacity;
return Math.max(0, Math.min(outerOpacity, waveOpacity));
},
get isOpacityFullyDecayed() {
return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, Ripple.MAX_RADIUS);
},
get isRestingAtMaxRadius() {
return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, Ripple.MAX_RADIUS);
},
get isAnimationComplete() {
return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius;
},
get translationFraction() {
return Math.min(1, this.radius / this.containerMetrics.size * 2 / Math.sqrt(2));
},
get xNow() {
if (this.xEnd) {
return this.xStart + this.translationFraction * (this.xEnd - this.xStart);
}
return this.xStart;
},
get yNow() {
if (this.yEnd) {
return this.yStart + this.translationFraction * (this.yEnd - this.yStart);
}
return this.yStart;
},
get isMouseDown() {
return this.mouseDownStart && !this.mouseUpStart;
},
resetInteractionState: function () {
this.maxRadius = 0;
this.mouseDownStart = 0;
this.mouseUpStart = 0;
this.xStart = 0;
this.yStart = 0;
this.xEnd = 0;
this.yEnd = 0;
this.slideDistance = 0;
this.containerMetrics = new ElementMetrics(this.element);
},
draw: function () {
var scale;
var translateString;
var dx;
var dy;
this.wave.style.opacity = this.opacity;
scale = this.radius / (this.containerMetrics.size / 2);
dx = this.xNow - this.containerMetrics.width / 2;
dy = this.yNow - this.containerMetrics.height / 2;
this.waveContainer.style.webkitTransform = 'translate(' + dx + 'px, ' + dy + 'px)';
this.waveContainer.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)';
this.wave.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
this.wave.style.transform = 'scale3d(' + scale + ',' + scale + ',1)';
},
downAction: function (event) {
var xCenter = this.containerMetrics.width / 2;
var yCenter = this.containerMetrics.height / 2;
this.resetInteractionState();
this.mouseDownStart = Utility.now();
if (this.center) {
this.xStart = xCenter;
this.yStart = yCenter;
this.slideDistance = Utility.distance(this.xStart, this.yStart, this.xEnd, this.yEnd);
} else {
this.xStart = event ? event.detail.x - this.containerMetrics.boundingRect.left : this.containerMetrics.width / 2;
this.yStart = event ? event.detail.y - this.containerMetrics.boundingRect.top : this.containerMetrics.height / 2;
}
if (this.recenters) {
this.xEnd = xCenter;
this.yEnd = yCenter;
this.slideDistance = Utility.distance(this.xStart, this.yStart, this.xEnd, this.yEnd);
}
this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart);
this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + 'px';
this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + 'px';
this.waveContainer.style.width = this.containerMetrics.size + 'px';
this.waveContainer.style.height = this.containerMetrics.size + 'px';
},
upAction: function (event) {
if (!this.isMouseDown) {
return;
}
this.mouseUpStart = Utility.now();
},
remove: function () {
Polymer.dom(this.waveContainer.parentNode).removeChild(this.waveContainer);
}
};
Polymer({
is: 'paper-ripple',
behaviors: [Polymer.IronA11yKeysBehavior],
properties: {
initialOpacity: {
type: Number,
value: 0.25
},
opacityDecayVelocity: {
type: Number,
value: 0.8
},
recenters: {
type: Boolean,
value: false
},
center: {
type: Boolean,
value: false
},
ripples: {
type: Array,
value: function () {
return [];
}
},
animating: {
type: Boolean,
readOnly: true,
reflectToAttribute: true,
value: false
},
holdDown: {
type: Boolean,
value: false,
observer: '_holdDownChanged'
},
noink: {
type: Boolean,
value: false
},
_animating: { type: Boolean },
_boundAnimate: {
type: Function,
value: function () {
return this.animate.bind(this);
}
}
},
observers: ['_noinkChanged(noink, isAttached)'],
get target() {
var ownerRoot = Polymer.dom(this).getOwnerRoot();
var target;
if (this.parentNode.nodeType == 11) {
target = ownerRoot.host;
} else {
target = this.parentNode;
}
return target;
},
keyBindings: {
'enter:keydown': '_onEnterKeydown',
'space:keydown': '_onSpaceKeydown',
'space:keyup': '_onSpaceKeyup'
},
attached: function () {
this.listen(this.target, 'up', 'uiUpAction');
this.listen(this.target, 'down', 'uiDownAction');
},
detached: function () {
this.unlisten(this.target, 'up', 'uiUpAction');
this.unlisten(this.target, 'down', 'uiDownAction');
},
get shouldKeepAnimating() {
for (var index = 0; index < this.ripples.length; ++index) {
if (!this.ripples[index].isAnimationComplete) {
return true;
}
}
return false;
},
simulatedRipple: function () {
this.downAction(null);
this.async(function () {
this.upAction();
}, 1);
},
uiDownAction: function (event) {
if (!this.noink) {
this.downAction(event);
}
},
downAction: function (event) {
if (this.holdDown && this.ripples.length > 0) {
return;
}
var ripple = this.addRipple();
ripple.downAction(event);
if (!this._animating) {
this.animate();
}
},
uiUpAction: function (event) {
if (!this.noink) {
this.upAction(event);
}
},
upAction: function (event) {
if (this.holdDown) {
return;
}
this.ripples.forEach(function (ripple) {
ripple.upAction(event);
});
this.animate();
},
onAnimationComplete: function () {
this._animating = false;
this.$.background.style.backgroundColor = null;
this.fire('transitionend');
},
addRipple: function () {
var ripple = new Ripple(this);
Polymer.dom(this.$.waves).appendChild(ripple.waveContainer);
this.$.background.style.backgroundColor = ripple.color;
this.ripples.push(ripple);
this._setAnimating(true);
return ripple;
},
removeRipple: function (ripple) {
var rippleIndex = this.ripples.indexOf(ripple);
if (rippleIndex < 0) {
return;
}
this.ripples.splice(rippleIndex, 1);
ripple.remove();
if (!this.ripples.length) {
this._setAnimating(false);
}
},
animate: function () {
var index;
var ripple;
this._animating = true;
for (index = 0; index < this.ripples.length; ++index) {
ripple = this.ripples[index];
ripple.draw();
this.$.background.style.opacity = ripple.outerOpacity;
if (ripple.isOpacityFullyDecayed && !ripple.isRestingAtMaxRadius) {
this.removeRipple(ripple);
}
}
if (!this.shouldKeepAnimating && this.ripples.length === 0) {
this.onAnimationComplete();
} else {
window.requestAnimationFrame(this._boundAnimate);
}
},
_onEnterKeydown: function () {
this.uiDownAction();
this.async(this.uiUpAction, 1);
},
_onSpaceKeydown: function () {
this.uiDownAction();
},
_onSpaceKeyup: function () {
this.uiUpAction();
},
_holdDownChanged: function (newVal, oldVal) {
if (oldVal === undefined) {
return;
}
if (newVal) {
this.downAction();
} else {
this.upAction();
}
},
_noinkChanged: function (noink, attached) {
if (attached) {
this.keyEventTarget = noink ? this : this.target;
}
}
});
}());
Polymer({
is: 'paper-button',
behaviors: [Polymer.PaperButtonBehavior],
properties: {
raised: {
type: Boolean,
reflectToAttribute: true,
value: false,
observer: '_calculateElevation'
}
},
_calculateElevation: function () {
if (!this.raised) {
this.elevation = 0;
} else {
Polymer.PaperButtonBehaviorImpl._calculateElevation.apply(this);
}
}
});
Polymer({
is: 'paper-input-container',
properties: {
noLabelFloat: {
type: Boolean,
value: false
},
alwaysFloatLabel: {
type: Boolean,
value: false
},
attrForValue: {
type: String,
value: 'bind-value'
},
autoValidate: {
type: Boolean,
value: false
},
invalid: {
observer: '_invalidChanged',
type: Boolean,
value: false
},
focused: {
readOnly: true,
type: Boolean,
value: false,
notify: true
},
_addons: { type: Array },
_inputHasContent: {
type: Boolean,
value: false
},
_inputSelector: {
type: String,
value: 'input,textarea,.paper-input-input'
},
_boundOnFocus: {
type: Function,
value: function () {
return this._onFocus.bind(this);
}
},
_boundOnBlur: {
type: Function,
value: function () {
return this._onBlur.bind(this);
}
},
_boundOnInput: {
type: Function,
value: function () {
return this._onInput.bind(this);
}
},
_boundValueChanged: {
type: Function,
value: function () {
return this._onValueChanged.bind(this);
}
}
},
listeners: {
'addon-attached': '_onAddonAttached',
'iron-input-validate': '_onIronInputValidate'
},
get _valueChangedEvent() {
return this.attrForValue + '-changed';
},
get _propertyForValue() {
return Polymer.CaseMap.dashToCamelCase(this.attrForValue);
},
get _inputElement() {
return Polymer.dom(this).querySelector(this._inputSelector);
},
get _inputElementValue() {
return this._inputElement[this._propertyForValue] || this._inputElement.value;
},
ready: function () {
if (!this._addons) {
this._addons = [];
}
this.addEventListener('focus', this._boundOnFocus, true);
this.addEventListener('blur', this._boundOnBlur, true);
if (this.attrForValue) {
this._inputElement.addEventListener(this._valueChangedEvent, this._boundValueChanged);
} else {
this.addEventListener('input', this._onInput);
}
},
attached: function () {
if (this._inputElementValue != '') {
this._handleValueAndAutoValidate(this._inputElement);
} else {
this._handleValue(this._inputElement);
}
this._numberOfPrefixNodes = 0;
this._prefixObserver = Polymer.dom(this.$.prefix).observeNodes(function (mutations) {
this._numberOfPrefixNodes += mutations.addedNodes.length - mutations.removedNodes.length;
}.bind(this));
},
detached: function () {
if (this._prefixObserver) {
Polymer.dom(this.$.prefix).unobserveNodes(this._prefixObserver);
}
},
_onAddonAttached: function (event) {
if (!this._addons) {
this._addons = [];
}
var target = event.target;
if (this._addons.indexOf(target) === -1) {
this._addons.push(target);
if (this.isAttached) {
this._handleValue(this._inputElement);
}
}
},
_onFocus: function () {
this._setFocused(true);
},
_onBlur: function () {
this._setFocused(false);
this._handleValueAndAutoValidate(this._inputElement);
},
_onInput: function (event) {
this._handleValueAndAutoValidate(event.target);
},
_onValueChanged: function (event) {
this._handleValueAndAutoValidate(event.target);
},
_handleValue: function (inputElement) {
var value = this._inputElementValue;
if (value || value === 0 || inputElement.type === 'number' && !inputElement.checkValidity()) {
this._inputHasContent = true;
} else {
this._inputHasContent = false;
}
this.updateAddons({
inputElement: inputElement,
value: value,
invalid: this.invalid
});
},
_handleValueAndAutoValidate: function (inputElement) {
if (this.autoValidate) {
var valid;
if (inputElement.validate) {
valid = inputElement.validate(this._inputElementValue);
} else {
valid = inputElement.checkValidity();
}
this.invalid = !valid;
}
this._handleValue(inputElement);
},
_onIronInputValidate: function (event) {
this.invalid = this._inputElement.invalid;
},
_invalidChanged: function () {
if (this._addons) {
this.updateAddons({ invalid: this.invalid });
}
},
updateAddons: function (state) {
for (var addon, index = 0; addon = this._addons[index]; index++) {
addon.update(state);
}
},
_computeInputContentClass: function (noLabelFloat, alwaysFloatLabel, focused, invalid, _inputHasContent) {
var cls = 'input-content';
if (!noLabelFloat) {
var label = this.querySelector('label');
if (alwaysFloatLabel || _inputHasContent) {
cls += ' label-is-floating';
if (invalid) {
cls += ' is-invalid';
} else if (focused) {
cls += ' label-is-highlighted';
}
if (this._numberOfPrefixNodes > 0) {
this.$.labelAndInputContainer.style.position = 'static';
}
} else {
if (label) {
this.$.labelAndInputContainer.style.position = 'relative';
}
}
} else {
if (_inputHasContent) {
cls += ' label-is-hidden';
}
}
return cls;
},
_computeUnderlineClass: function (focused, invalid) {
var cls = 'underline';
if (invalid) {
cls += ' is-invalid';
} else if (focused) {
cls += ' is-highlighted';
}
return cls;
},
_computeAddOnContentClass: function (focused, invalid) {
var cls = 'add-on-content';
if (invalid) {
cls += ' is-invalid';
} else if (focused) {
cls += ' is-highlighted';
}
return cls;
}
});
Polymer({
is: 'paper-input-error',
behaviors: [Polymer.PaperInputAddonBehavior],
properties: {
invalid: {
readOnly: true,
reflectToAttribute: true,
type: Boolean
}
},
update: function (state) {
this._setInvalid(state.invalid);
}
});
Polymer({
is: 'paper-input-char-counter',
behaviors: [Polymer.PaperInputAddonBehavior],
properties: {
_charCounterStr: {
type: String,
value: '0'
}
},
update: function (state) {
if (!state.inputElement) {
return;
}
state.value = state.value || '';
var str = state.value.replace(/(\r\n|\n|\r)/g, '--').length;
if (state.inputElement.hasAttribute('maxlength')) {
str += '/' + state.inputElement.getAttribute('maxlength');
}
this._charCounterStr = str;
}
});
Polymer({
is: 'paper-input',
behaviors: [
Polymer.IronFormElementBehavior,
Polymer.PaperInputBehavior,
Polymer.IronControlState
]
});
Polymer({
is: 'paper-toggle-button',
behaviors: [Polymer.PaperCheckedElementBehavior],
hostAttributes: {
role: 'button',
'aria-pressed': 'false',
tabindex: 0
},
properties: {},
listeners: { track: '_ontrack' },
_ontrack: function (event) {
var track = event.detail;
if (track.state === 'start') {
this._trackStart(track);
} else if (track.state === 'track') {
this._trackMove(track);
} else if (track.state === 'end') {
this._trackEnd(track);
}
},
_trackStart: function (track) {
this._width = this.$.toggleBar.offsetWidth / 2;
this._trackChecked = this.checked;
this.$.toggleButton.classList.add('dragging');
},
_trackMove: function (track) {
var dx = track.dx;
this._x = Math.min(this._width, Math.max(0, this._trackChecked ? this._width + dx : dx));
this.translate3d(this._x + 'px', 0, 0, this.$.toggleButton);
this._userActivate(this._x > this._width / 2);
},
_trackEnd: function (track) {
this.$.toggleButton.classList.remove('dragging');
this.transform('', this.$.toggleButton);
},
_createRipple: function () {
this._rippleContainer = this.$.toggleButton;
var ripple = Polymer.PaperRippleBehavior._createRipple();
ripple.id = 'ink';
ripple.setAttribute('recenters', '');
ripple.classList.add('circle', 'toggle-ink');
return ripple;
}
});
Polymer({
is: 'tf-graph-minimap',
init: function (svg, zoomG, mainZoom, maxWAndH, labelPadding) {
return new tf.scene.Minimap(svg, zoomG, mainZoom, this, maxWAndH, labelPadding);
}
});
Polymer({
is: 'tf-graph-scene',
properties: {
graphHierarchy: Object,
name: String,
colorBy: {
type: String,
observer: '_colorByChanged'
},
_zoom: Object,
highlightedNode: {
type: String,
observer: '_highlightedNodeChanged'
},
selectedNode: {
type: String,
observer: '_selectedNodeChanged'
},
_zoomed: {
type: Boolean,
observer: '_onZoomChanged',
value: false
},
_zoomStartCoords: {
type: Array,
value: null
},
_zoomCoords: {
type: Array,
value: null
},
_maxZoomDistanceForClick: {
type: Number,
value: 20
},
templateIndex: Object,
minimap: Object,
_nodeGroupIndex: {
type: Object,
value: function () {
return {};
}
},
_annotationGroupIndex: {
type: Object,
value: function () {
return {};
}
},
_edgeGroupIndex: {
type: Object,
value: function () {
return {};
}
},
maxMetanodeLabelLengthFontSize: {
type: Number,
value: 9
},
minMetanodeLabelLengthFontSize: {
type: Number,
value: 6
},
maxMetanodeLabelLengthLargeFont: {
type: Number,
value: 11
},
maxMetanodeLabelLength: {
type: Number,
value: 18
},
progress: Object
},
observers: ['_buildAndFit(graphHierarchy)'],
getNode: function (nodeName) {
return this.graphHierarchy.getRenderNodeByName(nodeName);
},
isNodeExpanded: function (node) {
return node.expanded;
},
setNodeExpanded: function (renderNode) {
this._build(this.graphHierarchy);
},
_resetState: function () {
this._nodeGroupIndex = {};
this._annotationGroupIndex = {};
this._edgeGroupIndex = {};
this._updateLabels(false);
d3.select(this.$.svg).select('#root').selectAll('*').remove();
d3.select(this.$.svg).select('defs #linearGradients').selectAll('*').remove();
},
_build: function (graphHierarchy) {
if (!graphHierarchy) {
return;
}
var templateNames = d3.keys(graphHierarchy.hierarchy.templates);
this.templateIndex = d3.scale.ordinal().domain(templateNames).range(d3.range(0, templateNames.length));
tf.time('tf-graph-scene (layout):', function () {
tf.graph.layout.scene(graphHierarchy.root, this);
}.bind(this));
tf.time('tf-graph-scene (build scene):', function () {
tf.graph.scene.buildGroup(d3.select(this.$.root), graphHierarchy.root, this);
tf.graph.scene.addGraphClickListener(this.$.svg, this);
}.bind(this));
setTimeout(function () {
this.minimap.update();
}.bind(this), tf.graph.layout.PARAMS.animation.duration);
},
ready: function () {
this._zoom = d3.behavior.zoom().on('zoomend', function () {
if (this._zoomStartCoords) {
var dragDistance = Math.sqrt(Math.pow(this._zoomStartCoords[0] - this._zoomCoords[0], 2) + Math.pow(this._zoomStartCoords[1] - this._zoomCoords[1], 2));
if (dragDistance < this._maxZoomDistanceForClick) {
this._fireEnableClick();
} else {
setTimeout(this._fireEnableClick.bind(this), 50);
}
}
this._zoomStartCoords = null;
}.bind(this)).on('zoom', function () {
this._zoomCoords = d3.event.translate;
if (!this._zoomStartCoords) {
this._zoomStartCoords = this._zoomCoords.slice();
this.fire('disable-click');
}
this._zoomed = true;
d3.select(this.$.root).attr('transform', 'translate(' + d3.event.translate + ')' + 'scale(' + d3.event.scale + ')');
this.minimap.zoom(d3.event.translate, d3.event.scale);
}.bind(this));
d3.select(this.$.svg).call(this._zoom).on('dblclick.zoom', null);
d3.select(window).on('resize', function () {
this.minimap.zoom();
}.bind(this));
this.minimap = this.$.minimap.init(this.$.svg, this.$.root, this._zoom, tf.graph.layout.PARAMS.minimap.size, tf.graph.layout.PARAMS.subscene.meta.labelHeight);
},
_buildAndFit: function (graphHierarchy) {
this._resetState();
this._build(graphHierarchy);
setTimeout(this.fit.bind(this), tf.graph.layout.PARAMS.animation.duration);
},
_updateLabels: function (showLabels) {
var titleStyle = this.getElementsByClassName('title')[0].style;
var auxTitleStyle = this.getElementsByClassName('auxTitle')[0].style;
var core = this.getElementsByClassName(tf.graph.scene.Class.Scene.CORE)[0];
if (showLabels && core && this.progress && this.progress.value === 100) {
var aux = this.getElementsByClassName(tf.graph.scene.Class.Scene.INEXTRACT)[0] || this.getElementsByClassName(tf.graph.scene.Class.Scene.OUTEXTRACT)[0];
var coreX = core.getCTM().e;
var auxX = aux ? aux.getCTM().e : null;
titleStyle.display = 'inline';
titleStyle.left = coreX + 'px';
if (auxX !== null && auxX !== coreX) {
auxTitleStyle.display = 'inline';
auxTitleStyle.left = auxX + 'px';
} else {
auxTitleStyle.display = 'none';
}
} else {
titleStyle.display = 'none';
auxTitleStyle.display = 'none';
}
},
_colorByChanged: function () {
_.each(this._nodeGroupIndex, function (nodeGroup, nodeName) {
this._updateNodeState(nodeName);
}, this);
this.minimap.update();
},
fit: function () {
tf.graph.scene.fit(this.$.svg, this.$.root, this._zoom, function () {
this._zoomed = false;
}.bind(this));
},
isNodeSelected: function (n) {
return n === this.selectedNode;
},
isNodeHighlighted: function (n) {
return n === this.highlightedNode;
},
addAnnotationGroup: function (a, d, selection) {
var an = a.node.name;
this._annotationGroupIndex[an] = this._annotationGroupIndex[an] || {};
this._annotationGroupIndex[an][d.node.name] = selection;
},
getAnnotationGroupsIndex: function (a) {
return this._annotationGroupIndex[a];
},
removeAnnotationGroup: function (a, d) {
delete this._annotationGroupIndex[a.node.name][d.node.name];
},
addNodeGroup: function (n, selection) {
this._nodeGroupIndex[n] = selection;
},
getNodeGroup: function (n) {
return this._nodeGroupIndex[n];
},
removeNodeGroup: function (n) {
delete this._nodeGroupIndex[n];
},
addEdgeGroup: function (n, selection) {
this._edgeGroupIndex[e] = selection;
},
getEdgeGroup: function (e) {
return this._edgeGroupIndex[e];
},
_updateNodeState: function (n) {
var node = this.getNode(n);
var nodeGroup = this.getNodeGroup(n);
if (nodeGroup) {
tf.graph.scene.node.stylize(nodeGroup, node, this);
}
var annotationGroupIndex = this.getAnnotationGroupsIndex(n);
_.each(annotationGroupIndex, function (aGroup, hostName) {
tf.graph.scene.node.stylize(aGroup, node, this, tf.graph.scene.Class.Annotation.NODE);
}, this);
},
_selectedNodeChanged: function (selectedNode, oldSelectedNode) {
if (selectedNode === oldSelectedNode) {
return;
}
if (selectedNode) {
this._updateNodeState(selectedNode);
}
if (oldSelectedNode) {
this._updateNodeState(oldSelectedNode);
}
if (!selectedNode) {
return;
}
this.minimap.update();
var node = this.graphHierarchy.hierarchy.node(selectedNode);
var nodeParents = [];
while (node.parentNode != null && node.parentNode.name != tf.graph.ROOT_NAME) {
node = node.parentNode;
nodeParents.push(node.name);
}
var topParentNodeToBeExpanded;
_.forEachRight(nodeParents, function (parentName) {
this.graphHierarchy.buildSubhierarchy(parentName);
var renderNode = this.graphHierarchy.getRenderNodeByName(parentName);
if (renderNode.node.isGroupNode && !renderNode.expanded) {
renderNode.expanded = true;
if (!topParentNodeToBeExpanded) {
topParentNodeToBeExpanded = renderNode;
}
}
}, this);
if (topParentNodeToBeExpanded) {
this.setNodeExpanded(topParentNodeToBeExpanded);
this._zoomed = true;
}
if (tf.graph.scene.panToNode(selectedNode, this.$.svg, this.$.root, this._zoom)) {
this._zoomed = true;
}
},
_highlightedNodeChanged: function (highlightedNode, oldHighlightedNode) {
if (highlightedNode === oldHighlightedNode) {
return;
}
if (highlightedNode) {
this._updateNodeState(highlightedNode);
}
if (oldHighlightedNode) {
this._updateNodeState(oldHighlightedNode);
}
},
_onZoomChanged: function () {
this._updateLabels(!this._zoomed);
},
_fireEnableClick: function () {
this.fire('enable-click');
}
});
Polymer({
is: 'tf-graph-params',
properties: {
enableExtraction: {
type: Boolean,
value: true
},
maxInDegree: {
type: Number,
value: 4
},
maxOutDegree: {
type: Number,
value: 4
},
maxControlDegree: {
type: Number,
value: 4
},
outExtractTypes: {
type: Array,
value: function () {
return ['NoOp'];
}
},
inExtractTypes: {
type: Array,
value: function () {
return ['Variable'];
}
},
detachAllEdgesForHighDegree: {
type: Boolean,
value: false
},
extractIsolatedNodesWithAnnotationsOnOneSide: {
type: Boolean,
value: true
},
enableBridgegraph: {
type: Boolean,
value: true
},
minMaxColors: {
type: Array,
value: function () {
return [
'#fff5f0',
'#fb6a4a'
];
}
},
maxAnnotations: {
type: Number,
value: 5
}
}
});
Polymer({
is: 'tf-graph',
properties: {
graphHierarchy: {
type: Object,
notify: true,
observer: '_graphChanged'
},
title: String,
selectedNode: {
type: String,
notify: true
},
highlightedNode: {
type: String,
notify: true
},
colorBy: String,
colorByParams: {
type: Object,
notify: true,
readOnly: true
},
_graphParams: {
type: Object,
value: function () {
return this.$.graphParams;
}
},
_renderDepth: {
type: Number,
value: 1
},
_renderHierarchy: {
type: Object,
readOnly: true,
notify: true,
computed: '_buildRenderHierarchy(graphHierarchy, _graphParams)'
},
_allowGraphSelect: {
type: Boolean,
value: true
}
},
_buildRenderHierarchy: function (graphHierarchy, params) {
return tf.time('new tf.graph.render.Hierarchy', function () {
if (graphHierarchy.root.type !== tf.graph.NodeType.META) {
return;
}
var renderGraph = new tf.graph.render.RenderGraphInformation(graphHierarchy, params);
function getColorParamsFromScale(scale) {
return {
minValue: scale.domain()[0],
maxValue: scale.domain()[1],
startColor: scale.range()[0],
endColor: scale.range()[1]
};
}
this._setColorByParams({
compute_time: getColorParamsFromScale(renderGraph.computeTimeScale),
memory: getColorParamsFromScale(renderGraph.memoryUsageScale),
device: _.map(renderGraph.deviceColorMap.domain(), function (deviceName) {
return {
device: deviceName,
color: renderGraph.deviceColorMap(deviceName)
};
})
});
return renderGraph;
}.bind(this));
},
_getVisible: function (name) {
if (!name) {
return name;
}
return this._renderHierarchy.getNearestVisibleAncestor(name);
},
listeners: {
'graph-select': '_graphSelected',
'disable-click': '_disableClick',
'enable-click': '_enableClick',
'node-toggle-expand': '_nodeToggleExpand',
'node-select': '_nodeSelected',
'node-highlight': '_nodeHighlighted',
'node-unhighlight': '_nodeUnhighlighted',
'annotation-select': '_nodeSelected',
'annotation-highlight': '_nodeHighlighted',
'annotation-unhighlight': '_nodeUnhighlighted'
},
_graphChanged: function () {
this.fire('graph-select');
},
_graphSelected: function (event) {
if (this._allowGraphSelect) {
this.set('selectedNode', null);
}
this._allowGraphSelect = true;
},
_disableClick: function (event) {
this._allowGraphSelect = false;
},
_enableClick: function (event) {
this._allowGraphSelect = true;
},
_nodeSelected: function (event) {
if (this._allowGraphSelect) {
this.set('selectedNode', event.detail.name);
}
this._allowGraphSelect = true;
},
_nodeHighlighted: function (event) {
this.set('highlightedNode', event.detail.name);
},
_nodeUnhighlighted: function (event) {
this.set('highlightedNode', null);
},
_nodeToggleExpand: function (event) {
var nodeName = event.detail.name;
var renderNode = this._renderHierarchy.getRenderNodeByName(nodeName);
if (renderNode.node.type === tf.graph.NodeType.OP) {
return;
}
this._renderHierarchy.buildSubhierarchy(nodeName);
renderNode.expanded = !renderNode.expanded;
this.querySelector('#scene').setNodeExpanded(renderNode);
this._nodeSelected(event);
},
not: function (x) {
return !x;
}
});
Polymer({
is: 'iron-collapse',
properties: {
horizontal: {
type: Boolean,
value: false,
observer: '_horizontalChanged'
},
opened: {
type: Boolean,
value: false,
notify: true,
observer: '_openedChanged'
}
},
hostAttributes: {
role: 'group',
'aria-expanded': 'false'
},
listeners: { transitionend: '_transitionEnd' },
ready: function () {
this._enableTransition = true;
},
toggle: function () {
this.opened = !this.opened;
},
show: function () {
this.opened = true;
},
hide: function () {
this.opened = false;
},
updateSize: function (size, animated) {
this.enableTransition(animated);
var s = this.style;
var nochange = s[this.dimension] === size;
s[this.dimension] = size;
if (animated && nochange) {
this._transitionEnd();
}
},
enableTransition: function (enabled) {
this.style.transitionDuration = enabled && this._enableTransition ? '' : '0s';
},
_horizontalChanged: function () {
this.dimension = this.horizontal ? 'width' : 'height';
this.style.transitionProperty = this.dimension;
},
_openedChanged: function () {
if (this.opened) {
this.setAttribute('aria-expanded', 'true');
this.setAttribute('aria-hidden', 'false');
this.toggleClass('iron-collapse-closed', false);
this.updateSize('auto', false);
var s = this._calcSize();
this.updateSize('0px', false);
this.offsetHeight;
this.updateSize(s, true);
this.focus();
} else {
this.setAttribute('aria-expanded', 'false');
this.setAttribute('aria-hidden', 'true');
this.toggleClass('iron-collapse-opened', false);
this.updateSize(this._calcSize(), false);
this.offsetHeight;
this.updateSize('0px', true);
}
},
_transitionEnd: function () {
if (this.opened) {
this.updateSize('auto', false);
}
this.toggleClass('iron-collapse-closed', !this.opened);
this.toggleClass('iron-collapse-opened', this.opened);
this.enableTransition(false);
},
_calcSize: function () {
return this.getBoundingClientRect()[this.dimension] + 'px';
}
});
(function () {
var IOS = navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/);
var IOS_TOUCH_SCROLLING = IOS && IOS[1] >= 8;
var DEFAULT_PHYSICAL_COUNT = 20;
var MAX_PHYSICAL_COUNT = 500;
Polymer({
is: 'iron-list',
properties: {
items: { type: Array },
as: {
type: String,
value: 'item'
},
indexAs: {
type: String,
value: 'index'
},
selectedAs: {
type: String,
value: 'selected'
},
selectionEnabled: {
type: Boolean,
value: false
},
selectedItem: {
type: Object,
notify: true
},
selectedItems: {
type: Object,
notify: true
},
multiSelection: {
type: Boolean,
value: false
}
},
observers: [
'_itemsChanged(items.*)',
'_selectionEnabledChanged(selectionEnabled)',
'_multiSelectionChanged(multiSelection)'
],
behaviors: [
Polymer.Templatizer,
Polymer.IronResizableBehavior
],
listeners: { 'iron-resize': '_resizeHandler' },
_ratio: 0.5,
_scroller: null,
_scrollerPaddingTop: 0,
_scrollPosition: 0,
_physicalCount: 0,
_physicalStart: 0,
_physicalEnd: 0,
_physicalSize: 0,
_physicalAverage: 0,
_physicalAverageCount: 0,
_physicalTop: 0,
_virtualCount: 0,
_virtualStartVal: 0,
_physicalIndexForKey: null,
_estScrollHeight: 0,
_scrollHeight: 0,
_viewportSize: 0,
_physicalItems: null,
_physicalSizes: null,
_firstVisibleIndexVal: null,
_collection: null,
_itemsRendered: false,
get _physicalBottom() {
return this._physicalTop + this._physicalSize;
},
get _scrollBottom() {
return this._scrollPosition + this._viewportSize;
},
get _virtualEnd() {
return this._virtualStartVal + this._physicalCount - 1;
},
_minVirtualStart: 0,
get _maxVirtualStart() {
return Math.max(0, this._virtualCount - this._physicalCount);
},
get _hiddenContentSize() {
return this._physicalSize - this._viewportSize;
},
get _maxScrollTop() {
return this._estScrollHeight - this._viewportSize;
},
set _virtualStart(val) {
this._virtualStartVal = Math.min(this._maxVirtualStart, Math.max(this._minVirtualStart, val));
this._physicalStart = this._virtualStartVal % this._physicalCount;
this._physicalEnd = (this._physicalStart + this._physicalCount - 1) % this._physicalCount;
},
get _virtualStart() {
return this._virtualStartVal;
},
get _optPhysicalSize() {
return this._viewportSize * 3;
},
get _isVisible() {
return this._scroller && Boolean(this._scroller.offsetWidth || this._scroller.offsetHeight);
},
get firstVisibleIndex() {
var physicalOffset;
if (this._firstVisibleIndexVal === null) {
physicalOffset = this._physicalTop;
this._firstVisibleIndexVal = this._iterateItems(function (pidx, vidx) {
physicalOffset += this._physicalSizes[pidx];
if (physicalOffset > this._scrollPosition) {
return vidx;
}
}) || 0;
}
return this._firstVisibleIndexVal;
},
ready: function () {
if (IOS_TOUCH_SCROLLING) {
this._scrollListener = function () {
requestAnimationFrame(this._scrollHandler.bind(this));
}.bind(this);
} else {
this._scrollListener = this._scrollHandler.bind(this);
}
},
attached: function () {
var el = Polymer.dom(this);
var parentNode = el.parentNode;
if (parentNode && parentNode.scroller) {
this._scroller = parentNode.scroller;
} else {
this._scroller = this;
this.classList.add('has-scroller');
}
if (IOS_TOUCH_SCROLLING) {
this._scroller.style.webkitOverflowScrolling = 'touch';
}
this._scroller.addEventListener('scroll', this._scrollListener);
this.updateViewportBoundaries();
this._render();
},
detached: function () {
this._itemsRendered = false;
if (this._scroller) {
this._scroller.removeEventListener('scroll', this._scrollListener);
}
},
updateViewportBoundaries: function () {
var scrollerStyle = window.getComputedStyle(this._scroller);
this._scrollerPaddingTop = parseInt(scrollerStyle['padding-top'], 10);
this._viewportSize = this._scroller.offsetHeight;
},
_refresh: function () {
var scrollTop = Math.max(0, Math.min(this._maxScrollTop, this._scroller.scrollTop));
var tileHeight, tileTop, kth, recycledTileSet, scrollBottom;
var ratio = this._ratio;
var delta = scrollTop - this._scrollPosition;
var recycledTiles = 0;
var hiddenContentSize = this._hiddenContentSize;
var currentRatio = ratio;
var movingUp = [];
this._scrollPosition = scrollTop;
this._firstVisibleIndexVal = null;
scrollBottom = this._scrollBottom;
if (Math.abs(delta) > this._physicalSize) {
this._physicalTop += delta;
recycledTiles = Math.round(delta / this._physicalAverage);
} else if (delta < 0) {
var topSpace = scrollTop - this._physicalTop;
var virtualStart = this._virtualStart;
var physicalBottom = this._physicalBottom;
recycledTileSet = [];
kth = this._physicalEnd;
currentRatio = topSpace / hiddenContentSize;
while (currentRatio < ratio && recycledTiles < this._physicalCount && virtualStart - recycledTiles > 0 && physicalBottom - this._physicalSizes[kth] > scrollBottom) {
tileHeight = this._physicalSizes[kth];
currentRatio += tileHeight / hiddenContentSize;
physicalBottom -= tileHeight;
recycledTileSet.push(kth);
recycledTiles++;
kth = kth === 0 ? this._physicalCount - 1 : kth - 1;
}
movingUp = recycledTileSet;
recycledTiles = -recycledTiles;
} else if (delta > 0) {
var bottomSpace = this._physicalBottom - scrollBottom;
var virtualEnd = this._virtualEnd;
var lastVirtualItemIndex = this._virtualCount - 1;
recycledTileSet = [];
kth = this._physicalStart;
currentRatio = bottomSpace / hiddenContentSize;
while (currentRatio < ratio && recycledTiles < this._physicalCount && virtualEnd + recycledTiles < lastVirtualItemIndex && this._physicalTop + this._physicalSizes[kth] < scrollTop) {
tileHeight = this._physicalSizes[kth];
currentRatio += tileHeight / hiddenContentSize;
this._physicalTop += tileHeight;
recycledTileSet.push(kth);
recycledTiles++;
kth = (kth + 1) % this._physicalCount;
}
}
if (recycledTiles === 0) {
if (this._increasePoolIfNeeded()) {
this.async(this._update);
}
} else {
this._virtualStart = this._virtualStart + recycledTiles;
this._update(recycledTileSet, movingUp);
}
},
_update: function (itemSet, movingUp) {
this._assignModels(itemSet);
this._updateMetrics(itemSet);
if (movingUp) {
while (movingUp.length) {
this._physicalTop -= this._physicalSizes[movingUp.pop()];
}
}
this._positionItems();
this._updateScrollerSize();
if (this._increasePoolIfNeeded()) {
this.async(this._update);
}
},
_createPool: function (size) {
var physicalItems = new Array(size);
this._ensureTemplatized();
for (var i = 0; i < size; i++) {
var inst = this.stamp(null);
physicalItems[i] = inst.root.querySelector('*');
Polymer.dom(this).appendChild(inst.root);
}
return physicalItems;
},
_increasePoolIfNeeded: function () {
if (this._physicalAverage === 0) {
return false;
}
if (this._physicalBottom < this._scrollBottom || this._physicalTop > this._scrollPosition) {
return this._increasePool(1);
}
if (this._physicalSize < this._optPhysicalSize) {
return this._increasePool(Math.round((this._optPhysicalSize - this._physicalSize) * 1.2 / this._physicalAverage));
}
return false;
},
_increasePool: function (missingItems) {
var nextPhysicalCount = Math.min(this._physicalCount + missingItems, this._virtualCount, MAX_PHYSICAL_COUNT);
var prevPhysicalCount = this._physicalCount;
var delta = nextPhysicalCount - prevPhysicalCount;
if (delta <= 0) {
return false;
}
[].push.apply(this._physicalItems, this._createPool(delta));
[].push.apply(this._physicalSizes, new Array(delta));
this._physicalCount = prevPhysicalCount + delta;
return true;
},
_render: function () {
var requiresUpdate = this._virtualCount > 0 || this._physicalCount > 0;
if (this.isAttached && !this._itemsRendered && this._isVisible && requiresUpdate) {
this._update();
this._itemsRendered = true;
}
},
_ensureTemplatized: function () {
if (!this.ctor) {
var props = {};
props.__key__ = true;
props[this.as] = true;
props[this.indexAs] = true;
props[this.selectedAs] = true;
this._instanceProps = props;
this._userTemplate = Polymer.dom(this).querySelector('template');
if (this._userTemplate) {
this.templatize(this._userTemplate);
} else {
console.warn('iron-list requires a template to be provided in light-dom');
}
}
},
_getStampedChildren: function () {
return this._physicalItems;
},
_forwardInstancePath: function (inst, path, value) {
if (path.indexOf(this.as + '.') === 0) {
this.notifyPath('items.' + inst.__key__ + '.' + path.slice(this.as.length + 1), value);
}
},
_forwardParentProp: function (prop, value) {
if (this._physicalItems) {
this._physicalItems.forEach(function (item) {
item._templateInstance[prop] = value;
}, this);
}
},
_forwardParentPath: function (path, value) {
if (this._physicalItems) {
this._physicalItems.forEach(function (item) {
item._templateInstance.notifyPath(path, value, true);
}, this);
}
},
_forwardItemPath: function (path, value) {
if (this._physicalIndexForKey) {
var dot = path.indexOf('.');
var key = path.substring(0, dot < 0 ? path.length : dot);
var idx = this._physicalIndexForKey[key];
var row = this._physicalItems[idx];
if (row) {
var inst = row._templateInstance;
if (dot >= 0) {
path = this.as + '.' + path.substring(dot + 1);
inst.notifyPath(path, value, true);
} else {
inst[this.as] = value;
}
}
}
},
_itemsChanged: function (change) {
if (change.path === 'items') {
this._itemsRendered = false;
this._virtualStartVal = 0;
this._physicalTop = 0;
this._virtualCount = this.items ? this.items.length : 0;
this._collection = this.items ? Polymer.Collection.get(this.items) : null;
this._physicalIndexForKey = {};
this._resetScrollPosition(0);
if (!this._physicalItems) {
this._physicalCount = Math.max(1, Math.min(DEFAULT_PHYSICAL_COUNT, this._virtualCount));
this._physicalItems = this._createPool(this._physicalCount);
this._physicalSizes = new Array(this._physicalCount);
}
this.debounce('refresh', this._render);
} else if (change.path === 'items.splices') {
this._itemsRendered = false;
this._adjustVirtualIndex(change.value.indexSplices);
this._virtualCount = this.items ? this.items.length : 0;
this.debounce('refresh', this._render);
} else {
this._forwardItemPath(change.path.split('.').slice(1).join('.'), change.value);
}
},
_adjustVirtualIndex: function (splices) {
var i, splice, idx;
for (i = 0; i < splices.length; i++) {
splice = splices[i];
splice.removed.forEach(this.$.selector.deselect, this.$.selector);
idx = splice.index;
if (idx >= this._virtualStartVal) {
break;
}
this._virtualStart = this._virtualStart + Math.max(splice.addedCount - splice.removed.length, idx - this._virtualStartVal);
}
},
_scrollHandler: function () {
this._refresh();
},
_iterateItems: function (fn, itemSet) {
var pidx, vidx, rtn, i;
if (arguments.length === 2 && itemSet) {
for (i = 0; i < itemSet.length; i++) {
pidx = itemSet[i];
if (pidx >= this._physicalStart) {
vidx = this._virtualStartVal + (pidx - this._physicalStart);
} else {
vidx = this._virtualStartVal + (this._physicalCount - this._physicalStart) + pidx;
}
if ((rtn = fn.call(this, pidx, vidx)) != null) {
return rtn;
}
}
} else {
pidx = this._physicalStart;
vidx = this._virtualStartVal;
for (; pidx < this._physicalCount; pidx++, vidx++) {
if ((rtn = fn.call(this, pidx, vidx)) != null) {
return rtn;
}
}
pidx = 0;
for (; pidx < this._physicalStart; pidx++, vidx++) {
if ((rtn = fn.call(this, pidx, vidx)) != null) {
return rtn;
}
}
}
},
_assignModels: function (itemSet) {
this._iterateItems(function (pidx, vidx) {
var el = this._physicalItems[pidx];
var inst = el._templateInstance;
var item = this.items && this.items[vidx];
if (item) {
inst[this.as] = item;
inst.__key__ = this._collection.getKey(item);
inst[this.selectedAs] = this.$.selector.isSelected(item);
inst[this.indexAs] = vidx;
el.removeAttribute('hidden');
this._physicalIndexForKey[inst.__key__] = pidx;
} else {
inst.__key__ = null;
el.setAttribute('hidden', '');
}
}, itemSet);
},
_updateMetrics: function (itemSet) {
var newPhysicalSize = 0;
var oldPhysicalSize = 0;
var prevAvgCount = this._physicalAverageCount;
var prevPhysicalAvg = this._physicalAverage;
Polymer.dom.flush();
this._iterateItems(function (pidx, vidx) {
oldPhysicalSize += this._physicalSizes[pidx] || 0;
this._physicalSizes[pidx] = this._physicalItems[pidx].offsetHeight;
newPhysicalSize += this._physicalSizes[pidx];
this._physicalAverageCount += this._physicalSizes[pidx] ? 1 : 0;
}, itemSet);
this._physicalSize = this._physicalSize + newPhysicalSize - oldPhysicalSize;
this._viewportSize = this._scroller.offsetHeight;
if (this._physicalAverageCount !== prevAvgCount) {
this._physicalAverage = Math.round((prevPhysicalAvg * prevAvgCount + newPhysicalSize) / this._physicalAverageCount);
}
},
_positionItems: function () {
this._adjustScrollPosition();
var y = this._physicalTop;
this._iterateItems(function (pidx) {
this.transform('translate3d(0, ' + y + 'px, 0)', this._physicalItems[pidx]);
y += this._physicalSizes[pidx];
});
},
_adjustScrollPosition: function () {
var deltaHeight = this._virtualStartVal === 0 ? this._physicalTop : Math.min(this._scrollPosition + this._physicalTop, 0);
if (deltaHeight) {
this._physicalTop = this._physicalTop - deltaHeight;
if (!IOS_TOUCH_SCROLLING) {
this._resetScrollPosition(this._scroller.scrollTop - deltaHeight);
}
}
},
_resetScrollPosition: function (pos) {
if (this._scroller) {
this._scroller.scrollTop = pos;
this._scrollPosition = this._scroller.scrollTop;
}
},
_updateScrollerSize: function (forceUpdate) {
this._estScrollHeight = this._physicalBottom + Math.max(this._virtualCount - this._physicalCount - this._virtualStartVal, 0) * this._physicalAverage;
forceUpdate = forceUpdate || this._scrollHeight === 0;
forceUpdate = forceUpdate || this._scrollPosition >= this._estScrollHeight - this._physicalSize;
if (forceUpdate || Math.abs(this._estScrollHeight - this._scrollHeight) >= this._optPhysicalSize) {
this.$.items.style.height = this._estScrollHeight + 'px';
this._scrollHeight = this._estScrollHeight;
}
},
scrollToIndex: function (idx) {
if (typeof idx !== 'number') {
return;
}
var firstVisible = this.firstVisibleIndex;
idx = Math.min(Math.max(idx, 0), this._virtualCount - 1);
this._virtualStart = idx - 1;
this._assignModels();
this._updateMetrics();
this._physicalTop = this._virtualStart * this._physicalAverage;
var currentTopItem = this._physicalStart;
var currentVirtualItem = this._virtualStart;
var targetOffsetTop = 0;
var hiddenContentSize = this._hiddenContentSize;
while (currentVirtualItem !== idx && targetOffsetTop < hiddenContentSize) {
targetOffsetTop = targetOffsetTop + this._physicalSizes[currentTopItem];
currentTopItem = (currentTopItem + 1) % this._physicalCount;
currentVirtualItem++;
}
this._updateScrollerSize(true);
this._positionItems();
this._resetScrollPosition(this._physicalTop + targetOffsetTop + 1);
if (this._increasePoolIfNeeded()) {
this.async(this._update);
}
this._firstVisibleIndexVal = null;
},
_resetAverage: function () {
this._physicalAverage = 0;
this._physicalAverageCount = 0;
},
_resizeHandler: function () {
this.debounce('resize', function () {
this._render();
if (this._itemsRendered && this._physicalItems && this._isVisible) {
this._resetAverage();
this.updateViewportBoundaries();
this.scrollToIndex(this.firstVisibleIndex);
}
});
},
_getModelFromItem: function (item) {
var key = this._collection.getKey(item);
var pidx = this._physicalIndexForKey[key];
if (pidx !== undefined) {
return this._physicalItems[pidx]._templateInstance;
}
return null;
},
_getNormalizedItem: function (item) {
if (typeof item === 'number') {
item = this.items[item];
if (!item) {
throw new RangeError('<item> not found');
}
} else if (this._collection.getKey(item) === undefined) {
throw new TypeError('<item> should be a valid item');
}
return item;
},
selectItem: function (item) {
item = this._getNormalizedItem(item);
var model = this._getModelFromItem(item);
if (!this.multiSelection && this.selectedItem) {
this.deselectItem(this.selectedItem);
}
if (model) {
model[this.selectedAs] = true;
}
this.$.selector.select(item);
},
deselectItem: function (item) {
item = this._getNormalizedItem(item);
var model = this._getModelFromItem(item);
if (model) {
model[this.selectedAs] = false;
}
this.$.selector.deselect(item);
},
toggleSelectionForItem: function (item) {
item = this._getNormalizedItem(item);
if (this.$.selector.isSelected(item)) {
this.deselectItem(item);
} else {
this.selectItem(item);
}
},
clearSelection: function () {
function unselect(item) {
var model = this._getModelFromItem(item);
if (model) {
model[this.selectedAs] = false;
}
}
if (Array.isArray(this.selectedItems)) {
this.selectedItems.forEach(unselect, this);
} else if (this.selectedItem) {
unselect.call(this, this.selectedItem);
}
this.$.selector.clearSelection();
},
_selectionEnabledChanged: function (selectionEnabled) {
if (selectionEnabled) {
this.listen(this, 'tap', '_selectionHandler');
this.listen(this, 'keypress', '_selectionHandler');
} else {
this.unlisten(this, 'tap', '_selectionHandler');
this.unlisten(this, 'keypress', '_selectionHandler');
}
},
_selectionHandler: function (e) {
if (e.type !== 'keypress' || e.keyCode === 13) {
var model = this.modelForElement(e.target);
if (model) {
this.toggleSelectionForItem(model[this.as]);
}
}
},
_multiSelectionChanged: function (multiSelection) {
this.clearSelection();
this.$.selector.multi = multiSelection;
},
updateSizeForItem: function (item) {
item = this._getNormalizedItem(item);
var key = this._collection.getKey(item);
var pidx = this._physicalIndexForKey[key];
if (pidx !== undefined) {
this._updateMetrics([pidx]);
this._positionItems();
}
}
});
}());
Polymer({
is: 'paper-icon-button',
hostAttributes: {
role: 'button',
tabindex: '0'
},
behaviors: [Polymer.PaperInkyFocusBehavior],
properties: {
src: { type: String },
icon: { type: String },
alt: {
type: String,
observer: '_altChanged'
}
},
_altChanged: function (newValue, oldValue) {
var label = this.getAttribute('aria-label');
if (!label || oldValue == label) {
this.setAttribute('aria-label', newValue);
}
}
});
Polymer({
is: 'paper-item',
hostAttributes: {
role: 'option',
tabindex: '0'
},
behaviors: [
Polymer.IronControlState,
Polymer.IronButtonState
]
});
Polymer({ is: 'paper-item-body' });
Polymer({
is: 'paper-icon-item',
hostAttributes: {
'role': 'option',
'tabindex': '0'
},
behaviors: [
Polymer.IronControlState,
Polymer.IronButtonState
]
});
(function () {
Polymer({
is: 'tf-graph-icon',
properties: {
node: {
type: Object,
value: null
},
type: {
type: String,
value: null
},
vertical: {
type: Boolean,
value: false
},
const: {
type: Boolean,
value: false
},
summary: {
type: Boolean,
value: false
},
height: {
type: Number,
value: 20
}
},
_isType: function (inputNode, inputType, targetType) {
if (inputNode) {
return tf.graph.NodeType[inputNode.type] === targetType;
}
return inputType === targetType;
},
_isVertical: function (inputNode, inputVertical) {
if (inputNode) {
return inputNode.hasNonControlEdges;
}
return !!inputVertical;
},
_isConst: function (inputNode, inputConst) {
if (inputNode) {
return inputNode.op === 'Const';
}
return !!inputConst;
},
_isSummary: function (inputNode, inputSummary) {
if (inputNode) {
return this._isType(inputNode, null, 'OP') && inputNode.op.substr(-7) === 'Summary';
}
return !!inputSummary;
},
_isRegularOp: function (inputNode, inputConst, inputSummary) {
return !this._isConst(inputNode, inputConst) && !this._isSummary(inputNode, inputSummary);
}
});
}());
(function () {
Polymer({
is: 'tf-node-list-item',
properties: {
cardNode: Object,
itemNode: Object,
name: String,
itemType: {
type: String,
observer: '_itemTypeChanged'
}
},
_itemTypeChanged: function () {
if (this.itemType !== 'subnode') {
this.$['list-item'].classList.add('clickable');
} else {
this.$['list-item'].classList.remove('clickable');
}
},
_nodeListener: function (event) {
this.fire('node-list-item-' + event.type, {
cardNode: this.cardNode.name,
nodeName: this.name,
type: this.itemType
});
}
});
}());
(function () {
Polymer({
is: 'tf-node-info',
properties: {
nodeName: String,
graphHierarchy: Object,
_node: {
type: Object,
computed: '_getNode(nodeName, graphHierarchy)',
observer: '_resetState'
},
_attributes: {
type: Array,
computed: '_getAttributes(_node)'
},
_device: {
type: String,
computed: '_getDevice(_node)'
},
_successors: {
type: Object,
computed: '_getSuccessors(_node, graphHierarchy)'
},
_predecessors: {
type: Object,
computed: '_getPredecessors(_node, graphHierarchy)'
},
_subnodes: {
type: Array,
computed: '_getSubnodes(_node)'
},
_expanded: {
type: Boolean,
value: true
},
_totalPredecessors: {
type: Number,
computed: '_getTotalPred(_predecessors)'
},
_totalSuccessors: {
type: Number,
computed: '_getTotalSucc(_successors)'
},
_openedControlPred: {
type: Boolean,
value: false
},
_openedControlSucc: {
type: Boolean,
value: false
}
},
expandNode: function () {
this.fire('_node.expand', this.node);
},
_getNode: function (n, graphHierarchy) {
return graphHierarchy.node(n);
},
_getNodeName: function (nodeName) {
return (nodeName || '').replace(/\//g, '\u200B/');
},
_getAttributes: function (node) {
this.async(this._resizeList.bind(this, '#attributesList'));
return node && node.attr ? node.attr.map(function (entry) {
return {
key: entry.key,
value: JSON.stringify(entry.value)
};
}) : [];
},
_getDevice: function (node) {
return node ? node.device : null;
},
_getSuccessors: function (node, hierarchy) {
this.async(this._resizeList.bind(this, '#inputsList'));
return node ? hierarchy.getSuccessors(node.name) : [
[],
[]
];
},
_getPredecessors: function (node, hierarchy) {
this.async(this._resizeList.bind(this, '#outputsList'));
return node ? hierarchy.getPredecessors(node.name) : [
[],
[]
];
},
_getSubnodes: function (node) {
return node && node.metagraph ? node.metagraph.nodes() : null;
},
_getTotalPred: function (predecessors) {
return predecessors.regular.length + predecessors.control.length;
},
_getTotalSucc: function (successors) {
return successors.regular.length + successors.control.length;
},
_toggleControlPred: function () {
this._openedControlPred = !this._openedControlPred;
},
_toggleControlSucc: function () {
this._openedControlSucc = !this._openedControlSucc;
},
_toggleExpanded: function () {
this._expanded = !this._expanded;
},
_getToggleIcon: function (expanded) {
return expanded ? 'expand-less' : 'expand-more';
},
_resetState: function () {
this._openedControlPred = false;
this._openedControlSucc = false;
},
_resizeList: function (selector) {
var list = document.querySelector(selector);
if (list) {
list.fire('iron-resize');
}
}
});
}());
(function () {
Polymer({
is: 'tf-graph-info',
properties: {
title: String,
graphHierarchy: Object,
graph: Object,
selectedNode: {
type: String,
notify: true
},
highlightedNode: {
type: String,
notify: true
}
},
listeners: {
'node-list-item-click': '_nodeListItemClicked',
'node-list-item-mouseover': '_nodeListItemMouseover',
'node-list-item-mouseout': '_nodeListItemMouseout'
},
_nodeListItemClicked: function (event) {
this.selectedNode = event.detail.nodeName;
},
_nodeListItemMouseover: function (event) {
this.highlightedNode = event.detail.nodeName;
},
_nodeListItemMouseout: function () {
this.highlightedNode = null;
}
});
}());
Polymer({
is: 'paper-progress',
behaviors: [Polymer.IronRangeBehavior],
properties: {
secondaryProgress: {
type: Number,
value: 0
},
secondaryRatio: {
type: Number,
value: 0,
readOnly: true
},
indeterminate: {
type: Boolean,
value: false,
observer: '_toggleIndeterminate'
},
disabled: {
type: Boolean,
value: false,
reflectToAttribute: true,
observer: '_disabledChanged'
}
},
observers: ['_progressChanged(secondaryProgress, value, min, max)'],
hostAttributes: { role: 'progressbar' },
_toggleIndeterminate: function (indeterminate) {
this.toggleClass('indeterminate', indeterminate, this.$.primaryProgress);
},
_transformProgress: function (progress, ratio) {
var transform = 'scaleX(' + ratio / 100 + ')';
progress.style.transform = progress.style.webkitTransform = transform;
},
_mainRatioChanged: function (ratio) {
this._transformProgress(this.$.primaryProgress, ratio);
},
_progressChanged: function (secondaryProgress, value, min, max) {
secondaryProgress = this._clampValue(secondaryProgress);
value = this._clampValue(value);
var secondaryRatio = this._calcRatio(secondaryProgress) * 100;
var mainRatio = this._calcRatio(value) * 100;
this._setSecondaryRatio(secondaryRatio);
this._transformProgress(this.$.secondaryProgress, secondaryRatio);
this._transformProgress(this.$.primaryProgress, mainRatio);
this.secondaryProgress = secondaryProgress;
this.setAttribute('aria-valuenow', value);
this.setAttribute('aria-valuemin', min);
this.setAttribute('aria-valuemax', max);
},
_disabledChanged: function (disabled) {
this.setAttribute('aria-disabled', disabled ? 'true' : 'false');
},
_hideSecondaryProgress: function (secondaryRatio) {
return secondaryRatio === 0;
}
});
Polymer({
is: 'tf-graph-board',
properties: {
graphHierarchy: Object,
graph: Object,
graphName: String,
hasStats: Boolean,
progress: Object,
colorByParams: {
type: Object,
notify: true
},
_selectedNode: String,
_highlightedNode: String
},
_isNotComplete: function (progress) {
return progress.value < 100;
},
_getContainerClass: function (progress) {
var result = 'container';
if (progress.error) {
result += ' error';
}
if (this._isNotComplete(progress)) {
result += ' loading';
}
return result;
}
});
Polymer({
is: 'tf-graph-loader',
properties: {
progress: {
type: Object,
notify: true,
readOnly: true
},
datasets: Array,
hasStats: {
type: Boolean,
readOnly: true,
notify: true
},
selectedDataset: Number,
selectedFile: {
type: Object,
observer: '_selectedFileChanged'
},
outGraphHierarchy: {
type: Object,
readOnly: true,
notify: true
},
outGraph: {
type: Object,
readOnly: true,
notify: true
},
outGraphName: {
type: String,
readOnly: true,
notify: true
}
},
observers: ['_selectedDatasetChanged(selectedDataset, datasets)'],
_parseAndConstructHierarchicalGraph: function (dataset, pbTxtContent) {
var self = this;
self._setProgress({
value: 0,
msg: ''
});
var tracker = {
setMessage: function (msg) {
self._setProgress({
value: self.progress.value,
msg: msg
});
},
updateProgress: function (value) {
self._setProgress({
value: self.progress.value + value,
msg: self.progress.msg
});
},
reportError: function (msg) {
self._setProgress({
value: self.progress.value,
msg: msg,
error: true
});
}
};
var statsJson;
var dataTracker = tf.getSubtaskTracker(tracker, 30, 'Data');
tf.graph.parser.readAndParseData(dataset, pbTxtContent, dataTracker).then(function (result) {
var nodes = result.nodes;
statsJson = result.statsJson;
var refEdges = {};
refEdges['Assign 0'] = true;
refEdges['AssignAdd 0'] = true;
refEdges['AssignSub 0'] = true;
refEdges['assign 0'] = true;
refEdges['assign_add 0'] = true;
refEdges['assign_sub 0'] = true;
refEdges['count_up_to 0'] = true;
refEdges['ScatterAdd 0'] = true;
refEdges['ScatterSub 0'] = true;
refEdges['ScatterUpdate 0'] = true;
refEdges['scatter_add 0'] = true;
refEdges['scatter_sub 0'] = true;
refEdges['scatter_update 0'] = true;
var buildParams = {
enableEmbedding: true,
inEmbeddingTypes: ['Const'],
outEmbeddingTypes: ['^[a-zA-Z]+Summary$'],
refEdges: refEdges
};
var graphTracker = tf.getSubtaskTracker(tracker, 20, 'Graph');
return tf.graph.build(nodes, buildParams, graphTracker);
}).then(function (graph) {
this._setOutGraph(graph);
if (statsJson) {
tf.time('Joining stats info with graph...', function () {
tf.graph.joinStatsInfoWithGraph(graph, statsJson);
});
}
var hierarchyParams = {
verifyTemplate: true,
groupSeries: true
};
var hierarchyTracker = tf.getSubtaskTracker(tracker, 50, 'Namespace hierarchy');
return tf.graph.hierarchy.build(graph, hierarchyParams, hierarchyTracker);
}.bind(this)).then(function (graphHierarchy) {
this._setHasStats(statsJson != null);
this._setOutGraphHierarchy(graphHierarchy);
}.bind(this)).catch(function (reason) {
tracker.reportError('Graph visualization failed: ' + reason);
});
},
_selectedDatasetChanged: function (datasetIndex, datasets) {
var dataset = datasets[datasetIndex];
this._parseAndConstructHierarchicalGraph(dataset);
this._setOutGraphName(dataset.name);
},
_selectedFileChanged: function (e) {
if (!e) {
return;
}
var file = e.target.files[0];
if (!file) {
return;
}
e.target.value = '';
var reader = new FileReader();
reader.onload = function (e) {
this._parseAndConstructHierarchicalGraph(null, e.target.result);
}.bind(this);
reader.readAsText(file);
}
});
(function () {
Polymer({
is: 'paper-menu',
behaviors: [Polymer.IronMenuBehavior]
});
}());
(function () {
Polymer({
is: 'iron-overlay-backdrop',
properties: {
opened: {
readOnly: true,
reflectToAttribute: true,
type: Boolean,
value: false
},
_manager: {
type: Object,
value: Polymer.IronOverlayManager
}
},
prepare: function () {
if (!this.parentNode) {
Polymer.dom(document.body).appendChild(this);
this.style.zIndex = this._manager.currentOverlayZ() - 1;
}
},
open: function () {
if (this._manager.getBackdrops().length < 2) {
this._setOpened(true);
}
},
close: function () {
if (this._manager.getBackdrops().length < 2) {
this._setOpened(false);
}
},
complete: function () {
if (this._manager.getBackdrops().length === 0 && this.parentNode) {
Polymer.dom(this.parentNode).removeChild(this);
}
}
});
}());
(function () {
'use strict';
Polymer({
is: 'iron-dropdown',
behaviors: [
Polymer.IronControlState,
Polymer.IronA11yKeysBehavior,
Polymer.IronOverlayBehavior,
Polymer.NeonAnimationRunnerBehavior
],
properties: {
horizontalAlign: {
type: String,
value: 'left',
reflectToAttribute: true
},
verticalAlign: {
type: String,
value: 'top',
reflectToAttribute: true
},
horizontalOffset: {
type: Number,
value: 0,
notify: true
},
verticalOffset: {
type: Number,
value: 0,
notify: true
},
positionTarget: {
type: Object,
observer: '_positionTargetChanged'
},
openAnimationConfig: { type: Object },
closeAnimationConfig: { type: Object },
focusTarget: { type: Object },
noAnimations: {
type: Boolean,
value: false
},
allowOutsideScroll: {
type: Boolean,
value: false
},
_positionRectMemo: { type: Object }
},
listeners: { 'neon-animation-finish': '_onNeonAnimationFinish' },
observers: ['_updateOverlayPosition(verticalAlign, horizontalAlign, verticalOffset, horizontalOffset)'],
attached: function () {
if (this.positionTarget === undefined) {
this.positionTarget = this._defaultPositionTarget;
}
},
get containedElement() {
return Polymer.dom(this.$.content).getDistributedNodes()[0];
},
get _focusTarget() {
return this.focusTarget || this.containedElement;
},
get _defaultPositionTarget() {
var parent = Polymer.dom(this).parentNode;
if (parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
parent = parent.host;
}
return parent;
},
get _positionRect() {
if (!this._positionRectMemo && this.positionTarget) {
this._positionRectMemo = this.positionTarget.getBoundingClientRect();
}
return this._positionRectMemo;
},
get _horizontalAlignTargetValue() {
var target;
if (this.horizontalAlign === 'right') {
target = document.documentElement.clientWidth - this._positionRect.right;
} else {
target = this._positionRect.left;
}
target += this.horizontalOffset;
return Math.max(target, 0);
},
get _verticalAlignTargetValue() {
var target;
if (this.verticalAlign === 'bottom') {
target = document.documentElement.clientHeight - this._positionRect.bottom;
} else {
target = this._positionRect.top;
}
target += this.verticalOffset;
return Math.max(target, 0);
},
_openedChanged: function (opened) {
if (opened && this.disabled) {
this.cancel();
} else {
this.cancelAnimation();
this._prepareDropdown();
Polymer.IronOverlayBehaviorImpl._openedChanged.apply(this, arguments);
}
if (this.opened) {
this._focusContent();
}
},
_renderOpened: function () {
if (!this.allowOutsideScroll) {
Polymer.IronDropdownScrollManager.pushScrollLock(this);
}
if (!this.noAnimations && this.animationConfig && this.animationConfig.open) {
this.$.contentWrapper.classList.add('animating');
this.playAnimation('open');
} else {
Polymer.IronOverlayBehaviorImpl._renderOpened.apply(this, arguments);
}
},
_renderClosed: function () {
Polymer.IronDropdownScrollManager.removeScrollLock(this);
if (!this.noAnimations && this.animationConfig && this.animationConfig.close) {
this.$.contentWrapper.classList.add('animating');
this.playAnimation('close');
} else {
Polymer.IronOverlayBehaviorImpl._renderClosed.apply(this, arguments);
}
},
_onNeonAnimationFinish: function () {
this.$.contentWrapper.classList.remove('animating');
if (this.opened) {
Polymer.IronOverlayBehaviorImpl._renderOpened.apply(this);
} else {
Polymer.IronOverlayBehaviorImpl._renderClosed.apply(this);
}
},
_onIronResize: function () {
var containedElement = this.containedElement;
var scrollTop;
var scrollLeft;
if (containedElement) {
scrollTop = containedElement.scrollTop;
scrollLeft = containedElement.scrollLeft;
}
if (this.opened) {
this._updateOverlayPosition();
}
Polymer.IronOverlayBehaviorImpl._onIronResize.apply(this, arguments);
if (containedElement) {
containedElement.scrollTop = scrollTop;
containedElement.scrollLeft = scrollLeft;
}
},
_positionTargetChanged: function () {
this._updateOverlayPosition();
},
_updateAnimationConfig: function () {
var animationConfig = {};
var animations = [];
if (this.openAnimationConfig) {
animationConfig.open = [{ name: 'opaque-animation' }].concat(this.openAnimationConfig);
animations = animations.concat(animationConfig.open);
}
if (this.closeAnimationConfig) {
animationConfig.close = this.closeAnimationConfig;
animations = animations.concat(animationConfig.close);
}
animations.forEach(function (animation) {
animation.node = this.containedElement;
}, this);
this.animationConfig = animationConfig;
},
_prepareDropdown: function () {
this.sizingTarget = this.containedElement || this.sizingTarget;
this._updateAnimationConfig();
this._updateOverlayPosition();
},
_updateOverlayPosition: function () {
this._positionRectMemo = null;
if (!this.positionTarget) {
return;
}
this.style[this.horizontalAlign] = this._horizontalAlignTargetValue + 'px';
this.style[this.verticalAlign] = this._verticalAlignTargetValue + 'px';
if (this._fitInfo) {
this._fitInfo.inlineStyle[this.horizontalAlign] = this.style[this.horizontalAlign];
this._fitInfo.inlineStyle[this.verticalAlign] = this.style[this.verticalAlign];
}
},
_focusContent: function () {
this.async(function () {
if (this._focusTarget) {
this._focusTarget.focus();
}
});
}
});
}());
(function () {
'use strict';
var PaperMenuButton = Polymer({
is: 'paper-menu-button',
behaviors: [
Polymer.IronA11yKeysBehavior,
Polymer.IronControlState
],
properties: {
opened: {
type: Boolean,
value: false,
notify: true,
observer: '_openedChanged'
},
horizontalAlign: {
type: String,
value: 'left',
reflectToAttribute: true
},
verticalAlign: {
type: String,
value: 'top',
reflectToAttribute: true
},
horizontalOffset: {
type: Number,
value: 0,
notify: true
},
verticalOffset: {
type: Number,
value: 0,
notify: true
},
noAnimations: {
type: Boolean,
value: false
},
ignoreSelect: {
type: Boolean,
value: false
},
openAnimationConfig: {
type: Object,
value: function () {
return [
{
name: 'fade-in-animation',
timing: {
delay: 100,
duration: 200
}
},
{
name: 'paper-menu-grow-width-animation',
timing: {
delay: 100,
duration: 150,
easing: PaperMenuButton.ANIMATION_CUBIC_BEZIER
}
},
{
name: 'paper-menu-grow-height-animation',
timing: {
delay: 100,
duration: 275,
easing: PaperMenuButton.ANIMATION_CUBIC_BEZIER
}
}
];
}
},
closeAnimationConfig: {
type: Object,
value: function () {
return [
{
name: 'fade-out-animation',
timing: { duration: 150 }
},
{
name: 'paper-menu-shrink-width-animation',
timing: {
delay: 100,
duration: 50,
easing: PaperMenuButton.ANIMATION_CUBIC_BEZIER
}
},
{
name: 'paper-menu-shrink-height-animation',
timing: {
duration: 200,
easing: 'ease-in'
}
}
];
}
},
_dropdownContent: { type: Object }
},
hostAttributes: {
role: 'group',
'aria-haspopup': 'true'
},
listeners: { 'iron-select': '_onIronSelect' },
get contentElement() {
return Polymer.dom(this.$.content).getDistributedNodes()[0];
},
open: function () {
if (this.disabled) {
return;
}
this.$.dropdown.open();
},
close: function () {
this.$.dropdown.close();
},
_onIronSelect: function (event) {
if (!this.ignoreSelect) {
this.close();
}
},
_openedChanged: function (opened, oldOpened) {
if (opened) {
this._dropdownContent = this.contentElement;
this.fire('paper-dropdown-open');
} else if (oldOpened != null) {
this.fire('paper-dropdown-close');
}
},
_disabledChanged: function (disabled) {
Polymer.IronControlState._disabledChanged.apply(this, arguments);
if (disabled && this.opened) {
this.close();
}
}
});
PaperMenuButton.ANIMATION_CUBIC_BEZIER = 'cubic-bezier(.3,.95,.5,1)';
PaperMenuButton.MAX_ANIMATION_TIME_MS = 400;
Polymer.PaperMenuButton = PaperMenuButton;
}());
(function () {
'use strict';
Polymer({
is: 'paper-dropdown-menu',
behaviors: [
Polymer.IronControlState,
Polymer.IronButtonState,
Polymer.IronFormElementBehavior,
Polymer.IronValidatableBehavior
],
properties: {
selectedItemLabel: {
type: String,
notify: true,
readOnly: true
},
selectedItem: {
type: Object,
notify: true,
readOnly: true
},
value: {
type: String,
notify: true,
readOnly: true
},
label: { type: String },
placeholder: { type: String },
opened: {
type: Boolean,
notify: true,
value: false
},
noLabelFloat: {
type: Boolean,
value: false,
reflectToAttribute: true
},
alwaysFloatLabel: {
type: Boolean,
value: false
},
noAnimations: {
type: Boolean,
value: false
}
},
listeners: { 'tap': '_onTap' },
keyBindings: {
'up down': 'open',
'esc': 'close'
},
hostAttributes: {
role: 'group',
'aria-haspopup': 'true'
},
observers: ['_selectedItemChanged(selectedItem)'],
attached: function () {
var contentElement = this.contentElement;
if (contentElement && contentElement.selectedItem) {
this._setSelectedItem(contentElement.selectedItem);
}
},
get contentElement() {
return Polymer.dom(this.$.content).getDistributedNodes()[0];
},
open: function () {
this.$.menuButton.open();
},
close: function () {
this.$.menuButton.close();
},
_onIronSelect: function (event) {
this._setSelectedItem(event.detail.item);
},
_onIronDeselect: function (event) {
this._setSelectedItem(null);
},
_onTap: function (event) {
if (Polymer.Gestures.findOriginalTarget(event) === this) {
this.open();
}
},
_selectedItemChanged: function (selectedItem) {
var value = '';
if (!selectedItem) {
value = '';
} else {
value = selectedItem.label || selectedItem.textContent.trim();
}
this._setValue(value);
this._setSelectedItemLabel(value);
},
_computeMenuVerticalOffset: function (noLabelFloat) {
return noLabelFloat ? -4 : 8;
},
_getValidity: function () {
return this.disabled || !this.required || this.required && this.value;
}
});
}());
(function () {
Polymer({
is: 'tf-graph-controls',
ready: function () {
d3.select(this.$['summary-icon']).attr('xlink:href', '../../../static/tb/summary-icon.svg');
},
properties: {
hasStats: { type: Boolean },
colorBy: {
type: String,
notify: true,
computed: '_getColorBy(_colorByIndex)'
},
colorByParams: Object,
datasets: {
type: Array,
observer: '_datasetsChanged'
},
selectedDataset: {
type: Number,
notify: true,
value: 0
},
selectedFile: {
type: Object,
notify: true
},
_colorByIndex: {
type: Number,
value: 0
},
_currentGradientParams: {
type: Object,
computed: '_getCurrentGradientParams(colorByParams, colorBy)'
}
},
_getColorBy: function (colorByIndex) {
return [
'structure',
'device',
'compute_time',
'memory'
][colorByIndex];
},
_getBackgroundColor: function (color) {
return 'background-color:' + color;
},
fit: function () {
document.querySelector('#scene').fit();
},
_isGradientColoring: function (colorBy) {
return [
'compute_time',
'memory'
].indexOf(colorBy) !== -1;
},
_equals: function (a, b) {
return a === b;
},
_getCurrentGradientParams: function (colorByParams, colorBy) {
if (!this._isGradientColoring(colorBy)) {
return;
}
var params = colorByParams[colorBy];
var minValue = params.minValue;
var maxValue = params.maxValue;
if (colorBy === 'memory') {
minValue = convertToHumanReadable(minValue, MEMORY_UNITS);
maxValue = convertToHumanReadable(maxValue, MEMORY_UNITS);
} else if (colorBy === 'compute_time') {
minValue = convertToHumanReadable(minValue, TIME_UNITS);
maxValue = convertToHumanReadable(maxValue, TIME_UNITS);
}
return {
minValue: minValue,
maxValue: maxValue,
startColor: params.startColor,
endColor: params.endColor
};
},
_updateFileInput: function (e) {
this.set('selectedFile', e);
},
_datasetsChanged: function (newDatasets, oldDatasets) {
if (oldDatasets != null || this.selected == null) {
this.set('selectedDataset', 0);
}
},
_getFile: function () {
this.$.file.click();
}
});
var MEMORY_UNITS = [
{ symbol: 'B' },
{
symbol: 'KB',
numUnits: 1024
},
{
symbol: 'MB',
numUnits: 1024
},
{
symbol: 'GB',
numUnits: 1024
},
{
symbol: 'TB',
numUnits: 1024
},
{
symbol: 'PB',
numUnits: 1024
}
];
var TIME_UNITS = [
{ symbol: 'µs' },
{
symbol: 'ms',
numUnits: 1000
},
{
symbol: 's',
numUnits: 1000
},
{
symbol: 'min',
numUnits: 60
},
{
symbol: 'hr',
numUnits: 60
},
{
symbol: 'days',
numUnits: 24
}
];
function convertToHumanReadable(value, units, unitIndex) {
unitIndex = unitIndex == null ? 0 : unitIndex;
if (unitIndex + 1 < units.length && value >= units[unitIndex + 1].numUnits) {
return convertToHumanReadable(value / units[unitIndex + 1].numUnits, units, unitIndex + 1);
}
return value.toPrecision(3) - 0 + ' ' + units[unitIndex].symbol;
}
}());
Polymer({
is: 'tf-graph-basic',
properties: {
hasStats: Boolean,
pbtxt: {
type: String,
observer: '_updateGraph'
},
_progress: Object
},
_updateGraph: function () {
this.$.loader._parseAndConstructHierarchicalGraph(null, this.pbtxt);
}
});