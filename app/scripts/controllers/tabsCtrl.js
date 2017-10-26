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
var tabsCtrl = function($scope, $attrs, globalService, $translate, $compile) {
   
    ///////////////////////////////////////////////////////////////////////////
    $scope.helpUrl = "https://wallet.monnaie-leman.org/files/help_LANG.html";
    ///////////////////////////////////////////////////////////////////////////
    
	$scope.tabNames = globalService.tabs;
    
    
    $scope.isIos=false;
    
    $scope.onDeviceReady = function() {
        $scope.isIos = globalFuncs.isIos();
    }
    
    document.addEventListener("deviceready", $scope.onDeviceReady, false);
   
   
    
    $scope.other_wallets=[];
    $scope.switchPopModal = new Modal(document.getElementById('switchPop'));
    
    $scope.openLockPopup = function(){
      var current = JSON.parse(localStorage.getItem('LemanWallet'));  
      try{  
        $scope.other_wallets = JSON.parse(localStorage.getItem('LemanWallets')); 
      } catch(e){}
      
      if (!$scope.other_wallets){
          $scope.other_wallets=[]; 
      }  
      
      var id_curr=-1;
      for (var id in $scope.other_wallets){
         if ($scope.other_wallets[id].address==current.address){
                      id_curr=id;
                      break;
          }
       }
       
       if (id_curr>=0){
            $scope.other_wallets.splice(id_curr, 1);
       }
             
       if($scope.other_wallets.length==0){
           $scope.lockWallet();
       } else {
          $scope.switchPopModal.open();
       }
    }
    
    $scope.switchToWallet = function(address){
      for (var id in $scope.other_wallets){
           if ($scope.other_wallets[id].address==address){
               localStorage.setItem('LemanWallet',JSON.stringify($scope.other_wallets[id].file) ); 
               location.reload(); 
                      
          }
       }            
    }
    
    $scope.lockWallet= function(){
        localStorage.removeItem('LemanWallet');
        location.reload();
    }
    

    
    var uls=document.getElementById('lg_mn');
    var lang = uls.innerHTML.split(";");
    uls.innerHTML='';
    var inner='';
    
    for (var indx=0; indx<lang.length;indx++){
        var lan = lang[indx].split(",");
        inner=inner+" <li><a ng-class=\"{true:'active'}[curLang=='"+lan[1]+"']\" ng-click=\"changeLanguage('"+lan[0]+"','"+lan[1]+"')\">"+lan[1]+"</a></li> ";
        if (indx==0){
            inner = inner +"<li role=\"separator\" class=\"divider\"></li>";
            $scope.curLang = lan[1];
        }
    }
    
    
    var compiled = $compile(inner);
    angular.element(uls).append(compiled($scope));
    

    
    
    
    
	
	var hval = window.location.hash;
	$scope.setArrowVisibility = function() {
		setTimeout(function() {
			$scope.showLeftArrow = false;
			$scope.showRightArrow = !(document.querySelectorAll(".nav-inner")[0].clientWidth <= document.querySelectorAll(".nav-scroll")[0].clientWidth);
			$scope.$apply();
		}, 200);
	}
	$scope.setArrowVisibility();
	$scope.setTab = function(hval) {
		if (hval != "") {
			hval = hval.replace("#", '');
			for (var key in $scope.tabNames) {
				if ($scope.tabNames[key].url == hval) {
					$scope.activeTab = globalService.currentTab = $scope.tabNames[key].id;
					break;
				}
				$scope.activeTab = globalService.currentTab;
			}
		} else {
			$scope.activeTab = globalService.currentTab;
		}
	}
	$scope.setTab(hval);
	$scope.tabClick = function(id) {
		for (var key in $scope.tabNames) {
			if ($scope.tabNames[key].id == id) {
                if ($scope.tabNames[key].url=='close'){
                    $scope.openLockPopup();
                } else if ($scope.tabNames[key].url=='aide'){
                    window.open($scope.helpUrl.replace('LANG',$scope.gelLanguageCode()), "_system");
                } else{
                    location.hash = $scope.tabNames[key].url;
                    $scope.activeTab = globalService.currentTab = id;
                }
            }
		}
	}
    
	$scope.setLanguageVal = function (id, varName, pos) {
		$translate(id).then(function(paragraph) {
			globalFuncs[varName][pos] = paragraph;
		}, function(translationId) {
			globalFuncs[varName][pos] = translationId;
		});
	}
	$scope.setErrorMsgLanguage = function() {
		for (var i = 0; i < globalFuncs.errorMsgs.length; i++) $scope.setLanguageVal('ERROR_' + (i + 1), 'errorMsgs', i);
		for (var i = 0; i < globalFuncs.successMsgs.length; i++) $scope.setLanguageVal('SUCCESS_' + (i + 1), 'successMsgs', i);
	}
	$scope.setGethErrMsgLanguage = function() {
		globalFuncs.gethErrorMsgs = {};
		for (var s in globalFuncs.gethErrors) {
			var key = globalFuncs.gethErrors[s];
			if (key.indexOf("GETH_") === 0) {
				$scope.setLanguageVal(key,'gethErrorMsgs',key);
			}
		}
	}
	$scope.changeLanguage = function(key, value) {
		$translate.use(key);
		$scope.setErrorMsgLanguage();
		$scope.setGethErrMsgLanguage();
		$scope.curLang = value;
		$scope.setArrowVisibility();
		$scope.dropdown = false;
		localStorage.setItem("language", JSON.stringify({
			key: key,
			value: value
		}));
	};
	$scope.setLanguageFromStorage = function() {
		var lang = localStorage.getItem('language');
		if (lang == null) return;
		lang = JSON.parse(lang);
		var key = globalFuncs.stripTags(lang.key);
		var value = globalFuncs.stripTags(lang.value);
		$scope.changeLanguage(key, value);
	}
    
    $scope.gelLanguageCode = function(){
        var lang = localStorage.getItem('language');
        if (lang == null) return 'fr';
        lang = JSON.parse(lang);
        return lang.key;
    }
    
	$scope.setLanguageFromStorage();
	$scope.setHash = function(hash) {
		location.hash = hash;
		$scope.setTab(hash);
		$scope.$apply();
	}
	$scope.scrollHoverIn = function(isLeft, val) {
		clearInterval($scope.sHoverTimer);
		$scope.sHoverTimer = setInterval(function() {
			if (isLeft) $scope.scrollLeft(val);
			else $scope.scrollRight(val);
		}, 20);
	}
	$scope.scrollHoverOut = function() {
		clearInterval($scope.sHoverTimer);
	}
    $scope.setOnScrollArrows = function(){
        var ele = document.querySelectorAll(".nav-scroll")[0];
  		$scope.showLeftArrow = ele.scrollLeft > 0;
		$scope.showRightArrow = document.querySelectorAll(".nav-inner")[0].clientWidth > (ele.clientWidth + ele.scrollLeft);
        $scope.$apply();
    }
	$scope.scrollLeft = function(val) {
		var ele = document.querySelectorAll(".nav-scroll")[0];
		ele.scrollLeft -= val;
	}
	$scope.scrollRight = function(val) {
		var ele = document.querySelectorAll(".nav-scroll")[0];
		ele.scrollLeft += val;
	}
    
    
    $scope.tabClick($attrs.model);
    
    angular.element(document.querySelectorAll(".nav-scroll")[0]).bind('scroll',$scope.setOnScrollArrows);
    
    
    
    
	globalFuncs.changeHash = $scope.setHash;
   
    setInterval(globalFuncs.notifyApproval(), 30000);
    
    
   
};
module.exports = tabsCtrl;
