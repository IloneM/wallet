/*

    Copyright © 2016-2017 Dominique Climent, Florian Dubath

    This file is part of Monnaie-Leman Wallet.

    Monnaie-Leman Wallet is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Monnaie-Leman Wallet is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Monnaie-Leman Wallet.  If not, see <http://www.gnu.org/licenses/>.

*/
'use strict';
var marked = require('marked');
var myRenderer = new marked.Renderer();
myRenderer.paragraph = function(text) {
	return text + '\n';
};
myRenderer.link = function(href, title, text) {
	if (this.options.sanitize) {
		try {
			var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, '').toLowerCase();
		} catch (e) {
			return '';
		}
		if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
			return '';
		}
	}
	var out = '<a target="_blank" href="' + href + '"';
	if (title) {
		out += ' title="' + title + '"';
	}
	out += '>' + text + '</a>';
	return out;
};
marked.setOptions({
	renderer: myRenderer
});
module.exports = marked;
