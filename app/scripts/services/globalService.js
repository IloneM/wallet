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
var globalService = function($http, $httpParamSerializerJQLike) {
    globalFuncs.checkAndRedirectHTTPS();
    ajaxReq.http = $http;
    ajaxReq.postSerializer = $httpParamSerializerJQLike;
    if (localStorage.getItem('LemanWallet') == null) {
  var tabs = {
     openFromStorage: {
      id: 0,
      name: "NAV_OpenStorage",
      url: "select",
      mew: true,
      readOnly: true,
      exchangeOffice:true,
      cssClass: "storage"
    },
    generateWallet: {
    id: 1,
      name: "NAV_AddWallet",
      url: "generate",
      mew: true,
      readOnly: false,
      exchangeOffice:false,
      cssClass: "newWall"
    },
    openWallet: {
      id: 2,
      name: "NAV_OpenWallet",
      url: "open",
      mew: true,
      readOnly: true,
      exchangeOffice:true,
      cssClass: "openWall"
    }, 
  
    help1: {
      id: 3,
      name: "NAV_Help",
      url: "aide",
      mew: true,
      readOnly:true,
      exchangeOffice:true,
      cssClass: "help"
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  };
    } else {
  var tabs = {
    viewWalletInfo: {
      id: 0,
      name: "NAV_ViewWallet",
      url: "recieve",
      mew: true,
      readOnly: true,
      exchangeOffice:false,
      cssClass: "recieve"
    },
    leman: {
      id: 1,
      name: "NAV_Transaction",
      url: "send",
      mew: true,
      readOnly: false,
      exchangeOffice:false,
      cssClass: "send"
    },
    limites: {
      id: 2, 
      name: "NAV_Limites",
      url: "info",
      mew: true,
      readOnly: true,
      exchangeOffice:false,
      cssClass: "cmpt"
    },
    transactions: {
      id: 3,
      name: "NAV_Transactions",
      url: "transactions",
      mew: true,
      readOnly: true,
      exchangeOffice:false,
      cssClass: "trans"
    },
    contacts: {
      id: 4,
      name: "NAV_Contacts",
      url: "contacts",
      mew: true,
      readOnly: true,
      exchangeOffice:false,
      cssClass: "ctc"
    },
    exchange: {
      id: 5,
      name: "NAV_Exchange",
      url: "exchange",
      mew: false,
      readOnly: false,
      exchangeOffice:true,
      cssClass: "exc"
    },
    global: {
      id: 6,
      name: "NAV_Global",
      url: "global",
      mew: false,
      readOnly: false,
      exchangeOffice:true,
      cssClass: "glob"
    },
    close: {
      id: 7,
      name: "NAV_Close",
      url: "close",
      mew: true,
      readOnly: true,
      exchangeOffice:true,
      cssClass: "cls"
    },
    help2: {
      id: 8,
      name: "NAV_Help",
      url: "aide",
      mew: true,
      readOnly: true,
      exchangeOffice:true,
      cssClass: "help"
    },
  };
    };
  var currentTab = 0;
  if(typeof chrome != 'undefined')
    currentTab = chrome.windows === undefined ? 0 : 3;
  return {
    tabs: tabs,
    currentTab: currentTab
  };
};
module.exports = globalService;


