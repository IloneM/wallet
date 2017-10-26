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
var QRCodeDrtv = function() {
	return function(scope, element, attrs) {
		var watchVar = attrs.watchVar;
		scope.$watch(watchVar, function() {
			var value = attrs.qrCode;
			element.empty();
			var delay = 0;
			if (element[0].clientWidth == 0) delay = 200;
			setTimeout(function() {
				new QRCode(element[0], {
					text: value,
					width: element[0].clientWidth,
					height: element[0].clientWidth,
					colorDark: "#000000",
					colorLight: "#ffffff",
					correctLevel: QRCode.CorrectLevel.H
				});
			}, delay);
		});
	};
};
module.exports = QRCodeDrtv;
