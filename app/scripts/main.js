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
var IS_CX = false;
if (typeof chrome != 'undefined') IS_CX = chrome.windows === undefined ? false : true;
require("babel-polyfill");
var angular = require('angular');
var angularTranslate = require('angular-translate');
var angularTranslateErrorLog = require('angular-translate-handler-log');
var angularSanitize = require('angular-sanitize');
var BigNumber = require('bignumber.js');
window.BigNumber = BigNumber;
var marked = require('./customMarked');
window.marked = marked;
var ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');
ethUtil.Tx = require('ethereumjs-tx');
ethUtil.scrypt = require('scryptsy');
ethUtil.uuid = require('uuid');
window.ethUtil = ethUtil;
var Wallet = require('./myetherwallet');
window.Wallet = Wallet;
var Token = require('./tokens');
window.Token = Token;
var globalFuncs = require('./globalFuncs');
window.globalFuncs = globalFuncs;
var uiFuncs = require('./uiFuncs');
window.uiFuncs = uiFuncs;
var etherUnits = require('./etherUnits');
window.etherUnits = etherUnits;
var ajaxReq = require('./ajaxReq');
window.ajaxReq = ajaxReq;
var ethFuncs = require('./ethFuncs');
window.ethFuncs = ethFuncs;
var translate = require('./translations/translate.js');


require('./angular-local-storage');


var tabsCtrl = require('./controllers/tabsCtrl');
var viewCtrl = require('./controllers/viewCtrl');
var walletGenCtrl = require('./controllers/walletGenCtrl');
var decryptWalletCtrl = require('./controllers/decryptWalletCtrl');
var viewWalletCtrl = require('./controllers/viewWalletCtrl');
var lemanCtrl = require('./controllers/lemanCtrl');
var balanceCtrl = require('./controllers/balanceCtrl');
var transactionsCtrl = require('./controllers/transactionsCtrl');
var contactsCtrl = require('./controllers/contactsCtrl');
var storageCtrl = require('./controllers/storageCtrl');
var exchangeCtrl = require('./controllers/exchangeCtrl');
var globalCtrl = require('./controllers/globalCtrl');


var globalService = require('./services/globalService');
var walletService = require('./services/walletService');
var contactService = require('./services/contactService');
var memoService = require('./services/memoService');

var walletDecryptDrtv = require('./directives/walletDecryptDrtv');
var blockiesDrtv = require('./directives/blockiesDrtv');
var QRCodeDrtv = require('./directives/QRCodeDrtv');
var fileReaderDrtv = require('./directives/fileReaderDrtv');
var blockedAccountDrtv = require('./directives/blockedAccountDrtv');
var waitingDrtv = require('./directives/waitingDrtv');

var app = angular.module('mewApp', ['pascalprecht.translate', 'ngSanitize']);
app.config(['$compileProvider', function($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|https|):/);
}]);
app.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
	new translate($translateProvider);
}]);
app.factory('globalService', ['$http', '$httpParamSerializerJQLike', globalService]);
app.factory('walletService', walletService);
app.factory('contactService', contactService);
app.factory('memoService', memoService);

app.directive('blockieAddress', blockiesDrtv);
app.directive('qrCode', QRCodeDrtv);
app.directive('onReadFile', fileReaderDrtv);
app.directive('walletDecryptDrtv', walletDecryptDrtv);
app.directive('blockedAccountDrtv', blockedAccountDrtv);
app.directive('waitingDrtv', waitingDrtv);

app.controller('tabsCtrl', ['$scope','$attrs','globalService', '$translate','$compile',tabsCtrl]);
app.controller('viewCtrl', ['$scope', 'globalService', '$translate', viewCtrl]);
app.controller('walletGenCtrl', ['$scope', '$translate', 'walletService','contactService', walletGenCtrl]);
app.controller('decryptWalletCtrl', ['$scope', '$sce', '$translate', 'walletService', 'contactService', decryptWalletCtrl]);
app.controller('viewWalletCtrl', ['$scope', 'walletService', viewWalletCtrl]);
app.controller('lemanCtrl', ['$scope','$locale', '$sce', 'walletService','contactService', '$translate', lemanCtrl]);
app.controller('balanceCtrl', ['$scope','$locale', '$sce', 'walletService','contactService', '$translate', balanceCtrl]);
app.controller('exchangeCtrl', ['$scope','$locale', '$sce', 'walletService', '$translate', exchangeCtrl]);
app.controller('globalCtrl', ['$scope','$locale', '$sce', 'walletService', '$translate', globalCtrl]);
app.controller('transactionsCtrl', ['$scope','$locale', '$sce', 'walletService','contactService','memoService', '$translate', transactionsCtrl]);
app.controller('contactsCtrl', ['$scope', '$sce', 'walletService','contactService', '$translate', contactsCtrl]);
app.controller('storageCtrl', ['$scope', '$sce', 'walletService', '$translate', storageCtrl]);

