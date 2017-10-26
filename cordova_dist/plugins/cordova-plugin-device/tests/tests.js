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

/* jshint jasmine: true */

exports.defineAutoTests = function() {
  describe('Device Information (window.device)', function () {
    it("should exist", function() {
      expect(window.device).toBeDefined();
    });

    it("should contain a platform specification that is a string", function() {
      expect(window.device.platform).toBeDefined();
      expect((String(window.device.platform)).length > 0).toBe(true);
    });

    it("should contain a version specification that is a string", function() {
      expect(window.device.version).toBeDefined();
      expect((String(window.device.version)).length > 0).toBe(true);
    });

    it("should contain a UUID specification that is a string or a number", function() {
      expect(window.device.uuid).toBeDefined();
      if (typeof window.device.uuid == 'string' || typeof window.device.uuid == 'object') {
        expect((String(window.device.uuid)).length > 0).toBe(true);
      } else {
        expect(window.device.uuid > 0).toBe(true);
      }
    });

    it("should contain a cordova specification that is a string", function() {
      expect(window.device.cordova).toBeDefined();
      expect((String(window.device.cordova)).length > 0).toBe(true);
    });

    it("should depend on the presence of cordova.version string", function() {
      expect(window.cordova.version).toBeDefined();
      expect((String(window.cordova.version)).length > 0).toBe(true);
    });

    it("should contain device.cordova equal to cordova.version", function() {
      expect(window.device.cordova).toBe(window.cordova.version);
    });

    it("should contain a model specification that is a string", function() {
      expect(window.device.model).toBeDefined();
      expect((String(window.device.model)).length > 0).toBe(true);
    });

    it("should contain a manufacturer property that is a string", function() {
      expect(window.device.manufacturer).toBeDefined();
      expect((String(window.device.manufacturer)).length > 0).toBe(true);
    });

    it("should contain an isVirtual property that is a boolean", function() {
      expect(window.device.isVirtual).toBeDefined();
      expect(typeof window.device.isVirtual).toBe("boolean");
    });

    it("should contain a serial number specification that is a string", function() {
      expect(window.device.serial).toBeDefined();
      expect((String(window.device.serial)).length > 0).toBe(true);

    });

  });
};

exports.defineManualTests = function(contentEl, createActionButton) {
    var logMessage = function (message, color) {
        var log = document.getElementById('info');
        var logLine = document.createElement('div');
        if (color) {
            logLine.style.color = color;
        }
        logLine.innerHTML = message;
        log.appendChild(logLine);
    };

    var clearLog = function () {
        var log = document.getElementById('info');
        log.innerHTML = '';
    };

    var device_tests = '<h3>Press Dump Device button to get device information</h3>' +
        '<div id="dump_device"></div>' +
        'Expected result: Status box will get updated with device info. (i.e. platform, version, uuid, model, etc)';

    contentEl.innerHTML = '<div id="info"></div>' + device_tests;

    createActionButton('Dump device', function() {
      clearLog();
      logMessage(JSON.stringify(window.device, null, '\t'));
    }, "dump_device");
};
