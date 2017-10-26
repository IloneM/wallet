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

/*global Windows, WinJS, cordova, module, require*/

var inputPane = Windows.UI.ViewManagement.InputPane.getForCurrentView();
var keyboardScrollDisabled = false;

inputPane.addEventListener('hiding', function() {
    cordova.fireWindowEvent('native.keyboardhide');
    cordova.plugins.Keyboard.isVisible = false;
});

inputPane.addEventListener('showing', function(e) {
    if (keyboardScrollDisabled) {
        // this disables automatic scrolling of view contents to show focused control
        e.ensuredFocusedElementInView = true;
    }
    cordova.fireWindowEvent('native.keyboardshow', { keyboardHeight: e.occludedRect.height });
    cordova.plugins.Keyboard.isVisible = true;
});

module.exports.disableScroll = function (disable) {
    keyboardScrollDisabled = disable;
};

module.exports.show = function () {
    if (typeof inputPane.tryShow === 'function') {
        inputPane.tryShow();
    }
};

module.exports.close = function () {
    if (typeof inputPane.tryShow === 'function') {
        inputPane.tryHide();
    }
};

require("cordova/exec/proxy").add("Keyboard", module.exports);
