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

var child_process = require('child_process'),
    Q     = require('q');

var get_highest_sdk = function(results){
    var reg = /\d+/;
    var apiLevels = [];
    for(var i=0;i<results.length;i++){
        apiLevels[i] = parseInt(results[i].match(reg)[0]);
    }
    apiLevels.sort(function(a,b){return b-a;});
    console.log(apiLevels[0]);
};

var get_sdks = function() {
    var d = Q.defer();
    child_process.exec('android list targets', function(err, stdout, stderr) {
        if (err) d.reject(stderr);
        else d.resolve(stdout);
    });

    return d.promise.then(function(output) {
        var reg = /android-\d+/gi;
        var results = output.match(reg);
        if(results.length===0){
            return Q.reject(new Error('No android sdks installed.'));
        }else{
            get_highest_sdk(results);
        }

        return Q();
    }, function(stderr) {
        if (stderr.match(/command\snot\sfound/) || stderr.match(/'android' is not recognized/)) {
            return Q.reject(new Error('The command \"android\" failed. Make sure you have the latest Android SDK installed, and the \"android\" command (inside the tools/ folder) is added to your path.'));
        } else {
            return Q.reject(new Error('An error occurred while listing Android targets'));
        }
    });
};

module.exports.run = function() {
    return Q.all([get_sdks()]);
};

