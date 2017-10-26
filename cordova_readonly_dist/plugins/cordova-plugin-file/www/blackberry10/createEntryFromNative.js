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

/*
 * createEntryFromNative
 * 
 * IN
 *  native - webkit Entry
 * OUT
 *  returns Cordova entry
 */

var info = require('cordova-plugin-file.bb10FileSystemInfo'),
    fileSystems = require('cordova-plugin-file.fileSystems');

module.exports = function (native) {
    var entry = {
            nativeEntry: native,
            isDirectory: !!native.isDirectory,
            isFile: !!native.isFile,
            name: native.name,
            fullPath: native.fullPath,
            filesystemName: native.filesystem.name,
            nativeURL: native.toURL()
        },
        persistentPath = info.persistentPath.substring(7),
        temporaryPath = info.temporaryPath.substring(7);
    //fix bb10 webkit incorrect nativeURL
    if (native.filesystem.name === 'root') {
        entry.nativeURL = 'file:///' + FileSystem.encodeURIPath(native.fullPath);
    } else if (entry.nativeURL.indexOf('filesystem:local:///persistent/') === 0) {
        entry.nativeURL = info.persistentPath + FileSystem.encodeURIPath(native.fullPath);
    } else if (entry.nativeURL.indexOf('filesystem:local:///temporary') === 0) {
        entry.nativeURL = info.temporaryPath + FileSystem.encodeURIPath(native.fullPath);
    }
    //translate file system name from bb10 webkit
    if (entry.filesystemName === 'local__0:Persistent' || entry.fullPath.indexOf(persistentPath) !== -1) {
        entry.filesystemName = 'persistent';
    } else if (entry.filesystemName === 'local__0:Temporary' || entry.fullPath.indexOf(temporaryPath) !== -1) {
        entry.filesystemName = 'temporary';
    }
    //add file system property (will be called sync)
    fileSystems.getFs(entry.filesystemName, function (fs) {
        entry.filesystem = fs;
    });
    //set root on fullPath for persistent / temporary locations
    entry.fullPath = entry.fullPath.replace(persistentPath, "");
    entry.fullPath = entry.fullPath.replace(temporaryPath, "");
    //set trailing slash on directory
    if (entry.isDirectory && entry.fullPath.substring(entry.fullPath.length - 1) !== '/') {
        entry.fullPath += '/';
    }
    if (entry.isDirectory && entry.nativeURL.substring(entry.nativeURL.length - 1) !== '/') {
        entry.nativeURL += '/';
    }
    return entry;
};
