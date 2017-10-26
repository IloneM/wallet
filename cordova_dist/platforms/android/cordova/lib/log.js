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
#!/usr/bin/env node

/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

var path  = require('path'),
    os  = require('os'),
    Q     = require('q'),
    child_process = require('child_process'),
    ROOT  = path.join(__dirname, '..', '..');

/*
 * Starts running logcat in the shell.
 * Returns a promise.
 */
module.exports.run = function() {
    var d = Q.defer();
    var adb = child_process.spawn('adb', ['logcat'], {cwd: os.tmpdir()});

    adb.stdout.on('data', function(data) {
        var lines = data ? data.toString().split('\n') : [];
        var out = lines.filter(function(x) { return x.indexOf('nativeGetEnabledTags') < 0; });
        console.log(out.join('\n'));
    });

    adb.stderr.on('data', console.error);
    adb.on('close', function(code) {
        if (code > 0) {
            d.reject('Failed to run logcat command.');
        } else d.resolve();
    });

    return d.promise;
};

module.exports.help = function() {
    console.log('Usage: ' + path.relative(process.cwd(), path.join(ROOT, 'cordova', 'log')));
    console.log('Gives the logcat output on the command line.');
    process.exit(0);
};
