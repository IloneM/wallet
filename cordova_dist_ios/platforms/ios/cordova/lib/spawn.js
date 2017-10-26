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

/*jshint node: true*/

var Q    = require('q'),
    proc = require('child_process');

/**
 * Run specified command with arguments 
 * @param  {String} cmd           Command
 * @param  {Array} args           Array of arguments that should be passed to command
 * @param  {String} opt_cwd       Working directory for command
 * @param  {String} opt_verbosity Verbosity level for command stdout output, "verbose" by default
 * @return {Promise}              Promise either fullfilled or rejected with error code
 */
module.exports = function(cmd, args, opt_cwd) {
    var d = Q.defer();
    try {
        var child = proc.spawn(cmd, args, {cwd: opt_cwd, stdio: 'inherit'});

        child.on('exit', function(code) {
            if (code) {
                d.reject('Error code ' + code + ' for command: ' + cmd + ' with args: ' + args);
            } else {
                d.resolve();
            }
        });
    } catch(e) {
        d.reject(e);
    }
    return d.promise;
};
