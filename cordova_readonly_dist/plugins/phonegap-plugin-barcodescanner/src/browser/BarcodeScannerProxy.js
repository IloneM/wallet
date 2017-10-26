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
function scan(success, error) {
    var code = window.prompt("Enter barcode value (empty value will fire the error handler):");
    if(code) {
        var result = {
            text:code,
            format:"Fake",
            cancelled:false
        };
        success(result);
    } else {
        error("No barcode");
    }
}

function encode(type, data, success, errorCallback) {
    success();
}

module.exports = {
    scan: scan,
    encode: encode
};

require("cordova/exec/proxy").add("BarcodeScanner",module.exports);
