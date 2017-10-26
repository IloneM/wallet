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

var config;

function Config(xhr) {
    function loadPreferences(xhr) {
       var parser = new DOMParser();
       var doc = parser.parseFromString(xhr.responseText, "application/xml");

       var preferences = doc.getElementsByTagName("preference");
       return Array.prototype.slice.call(preferences);
    }

    this.xhr = xhr;
    this.preferences = loadPreferences(this.xhr);
}

function readConfig(success, error) {
    var xhr;

    if(typeof config != 'undefined') {
        success(config);
    }

    function fail(msg) {
        console.error(msg);

        if(error) {
            error(msg);
        }
    }

    var xhrStatusChangeHandler = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304 || xhr.status === 0 /* file:// */) {
                config = new Config(xhr);
                success(config);
            }
            else {
                fail('[Browser][cordova.js][xhrStatusChangeHandler] Could not XHR config.xml: ' + xhr.statusText);
            }
        }
    };

    if ("ActiveXObject" in window) {
        // Needed for XHR-ing via file:// protocol in IE
        xhr = new window.ActiveXObject("MSXML2.XMLHTTP");
        xhr.onreadystatechange = xhrStatusChangeHandler;
    } else {
        xhr = new XMLHttpRequest();
        xhr.addEventListener("load", xhrStatusChangeHandler);
    }

    try {
        xhr.open("get", "/config.xml", true);
        xhr.send();
    } catch(e) {
        fail('[Browser][cordova.js][readConfig] Could not XHR config.xml: ' + JSON.stringify(e));
    }
}

/**
 * Reads a preference value from config.xml.
 * Returns preference value or undefined if it does not exist.
 * @param {String} preferenceName Preference name to read */
Config.prototype.getPreferenceValue = function getPreferenceValue(preferenceName) {
    var preferenceItem = this.preferences && this.preferences.filter(function(item) {
        return item.attributes.name && item.attributes.name.value === preferenceName;
    });

    if(preferenceItem && preferenceItem[0] && preferenceItem[0].attributes && preferenceItem[0].attributes.value) {
        return preferenceItem[0].attributes.value.value;
    }
};

exports.readConfig = readConfig;
