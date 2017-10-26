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
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
var browser = require('cordova/platform');

function getPlatform() {
    return "browser";
}

function getModel() {
    return getBrowserInfo(true);
}

function getVersion() {
    return getBrowserInfo(false);
}

function getBrowserInfo(getModel) {
    var userAgent = navigator.userAgent;
    var returnVal = '';
    var offset;

    if ((offset = userAgent.indexOf('Chrome')) !== -1) {
        returnVal = (getModel) ? 'Chrome' : userAgent.substring(offset + 7);
    } else if ((offset = userAgent.indexOf('Safari')) !== -1) {
        if (getModel) {
            returnVal = 'Safari';
        } else {
            returnVal = userAgent.substring(offset + 7);

            if ((offset = userAgent.indexOf('Version')) !== -1) {
                returnVal = userAgent.substring(offset + 8);
            }
        }
    } else if ((offset = userAgent.indexOf('Firefox')) !== -1) {
        returnVal = (getModel) ? 'Firefox' : userAgent.substring(offset + 8);
    } else if ((offset = userAgent.indexOf('MSIE')) !== -1) {
        returnVal = (getModel) ? 'MSIE' : userAgent.substring(offset + 5);
    } else if ((offset = userAgent.indexOf('Trident')) !== -1) {
        returnVal = (getModel) ? 'MSIE' : '11';
    }

    if ((offset = returnVal.indexOf(';')) !== -1 || (offset = returnVal.indexOf(' ')) !== -1) {
        returnVal = returnVal.substring(0, offset);
    }

    return returnVal;
}


module.exports = {
    getDeviceInfo: function (success, error) {
        setTimeout(function () {
            success({
                cordova: browser.cordovaVersion,
                platform: getPlatform(),
                model: getModel(),
                version: getVersion(),
                uuid: null
            });
        }, 0);
    }
};

require("cordova/exec/proxy").add("Device", module.exports);
