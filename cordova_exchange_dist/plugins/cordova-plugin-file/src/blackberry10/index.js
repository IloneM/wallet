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

/* global PluginResult */

module.exports = {
    setSandbox : function (success, fail, args, env) {
        require("lib/webview").setSandbox(JSON.parse(decodeURIComponent(args[0])));
        new PluginResult(args, env).ok();
    },

    getHomePath: function (success, fail, args, env) {
        var homeDir = window.qnx.webplatform.getApplication().getEnv("HOME");
        new PluginResult(args, env).ok(homeDir);
    },

    requestAllPaths: function (success, fail, args, env) {
        var homeDir = 'file://' + window.qnx.webplatform.getApplication().getEnv("HOME").replace('/data', ''),
            paths = {
                applicationDirectory: homeDir + '/app/native/',
                applicationStorageDirectory: homeDir + '/',
                dataDirectory: homeDir + '/data/webviews/webfs/persistent/local__0/',
                cacheDirectory: homeDir + '/data/webviews/webfs/temporary/local__0/',
                externalRootDirectory: 'file:///accounts/1000/removable/sdcard/',
                sharedDirectory: homeDir + '/shared/'
            };
        success(paths);
    }
};
