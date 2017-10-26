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
'use strict';
var cxFuncs = function() {}
cxFuncs.storage = chrome.storage.sync;
cxFuncs.getAllNickNames = function(callback) {
	var nickNames = [];
	this.storage.get(null, function(items) {
		for (var key in items) {
			if (items.hasOwnProperty(key)) {
				var tobj = JSON.parse(items[key]);
				if (tobj.type == 'wallet' || tobj.type == 'watchOnly') {
				    nickNames.push(tobj.nick);
                    nickNames.push(key);
                }
			}
		}
		callback(nickNames);
	});
}
cxFuncs.addWalletToStorage = function(address, encStr, nickname, callback) {
	nickname = nickname.replace(/(<([^>]+)>)/ig, "");
	var value = {
		nick: nickname,
		priv: encStr,
		type: 'wallet'
	};
	var keyname = ethUtil.toChecksumAddress(address);
	var obj = {};
	obj[keyname] = JSON.stringify(value);
	this.storage.set(obj, callback);
}
cxFuncs.addWatchOnlyAddress = function(address, nickname, callback) {
	nickname = nickname.replace(/(<([^>]+)>)/ig, "");
	var value = {
		nick: nickname,
		type: 'watchOnly'
	};
	var keyname = ethUtil.toChecksumAddress(address);;
	var obj = {};
	obj[keyname] = JSON.stringify(value);
	this.storage.set(obj, callback);
}
cxFuncs.getStorageArr = function(filter, callback) {
	var wallets = [];
	this.storage.get(null, function(items) {
		for (var key in items) {
			if (items.hasOwnProperty(key)) {
				var tobj = JSON.parse(items[key]);
				if (tobj.type == filter) {
					tobj['addr'] = key;
					wallets.push(tobj);
				}
			}
		}
		wallets.sort(function(a, b) {
			if (a.nick < b.nick) return -1;
			if (a.nick > b.nick) return 1;
			return 0;
		});
		callback(wallets);
	});
}
cxFuncs.getWalletsArr = function(callback) {
	this.getStorageArr('wallet', callback);
}
cxFuncs.getWatchOnlyArr = function(callback) {
	this.getStorageArr('watchOnly', callback);
}
cxFuncs.deleteAccount = function(address,callback){
    this.storage.remove(address,function(){
        callback(address);
    });
}
cxFuncs.editNickName = function(address,newNick, callback){
    newNick = newNick.replace(/(<([^>]+)>)/ig,"");
    this.storage.get(address, function(account) {
        var accountInfo = account[address];
        accountInfo = JSON.parse(accountInfo);
        accountInfo['nick'] = newNick;
        account[address] = JSON.stringify(accountInfo);
        cxFuncs.storage.set(account,function(){
            callback(newNick);
        });
    });
}
module.exports = cxFuncs;
