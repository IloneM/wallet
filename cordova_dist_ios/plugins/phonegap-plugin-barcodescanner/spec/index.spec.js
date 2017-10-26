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
/* globals require */

/*!
 * Module dependencies.
 */

var cordova = require('./helper/cordova'),
    BarcodeScanner = require('../www/barcodescanner'),
    execSpy,
    execWin,
    options;

/*!
 * Specification.
 */

describe('phonegap-plugin-barcodescanner', function () {
    beforeEach(function () {
        execWin = jasmine.createSpy();
        execSpy = spyOn(cordova.required, 'cordova/exec').andCallFake(execWin);
    });

    describe('BarcodeScanner', function () {
      it("BarcodeScanner plugin should exist", function() {
          expect(BarcodeScanner).toBeDefined();
          expect(typeof BarcodeScanner == 'object').toBe(true);
      });

      it("should contain a scan function", function() {
          expect(BarcodeScanner.scan).toBeDefined();
          expect(typeof BarcodeScanner.scan == 'function').toBe(true);
      });

      it("should contain an encode function", function() {
          expect(BarcodeScanner.encode).toBeDefined();
          expect(typeof BarcodeScanner.encode == 'function').toBe(true);
      });

      it("should contain three DestinationType constants", function() {
          expect(BarcodeScanner.Encode.TEXT_TYPE).toBe("TEXT_TYPE");
          expect(BarcodeScanner.Encode.EMAIL_TYPE).toBe("EMAIL_TYPE");
          expect(BarcodeScanner.Encode.PHONE_TYPE).toBe("PHONE_TYPE");
          expect(BarcodeScanner.Encode.SMS_TYPE).toBe("SMS_TYPE");
      });
    });

    describe('BarcodeScanner instance', function () {
        describe('cordova.exec', function () {
            it('should call cordova.exec on next process tick', function (done) {
                BarcodeScanner.scan(function() {}, function() {}, {});
                setTimeout(function () {
                    expect(execSpy).toHaveBeenCalledWith(
                        jasmine.any(Function),
                        jasmine.any(Function),
                        'BarcodeScanner',
                        'scan',
                        jasmine.any(Object)
                    );
                    done();
                }, 100);
            });

            it('should call cordova.exec on next process tick', function (done) {
                BarcodeScanner.encode("", "",function() {}, function() {}, {});
                setTimeout(function () {
                    expect(execSpy).toHaveBeenCalledWith(
                        jasmine.any(Function),
                        jasmine.any(Function),
                        'BarcodeScanner',
                        'encode',
                        jasmine.any(Object)
                    );
                    done();
                }, 100);
            });
        });
    });
});
