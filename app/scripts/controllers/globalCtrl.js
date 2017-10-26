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
var globalCtrl = function($scope, $locale, $sce, walletService, $translate) {
    // Check the environment
    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    $scope.ready = true;
    $scope.trans_message = $translate.instant("GP_Wait_tran");
    $scope.validateStatus='';
	$scope.confTaxPop = new Modal(document.getElementById('confTax'));
	$scope.confTaxLegPop = new Modal(document.getElementById('confTaxLeg'));
	$scope.confTaxAccountPop = new Modal(document.getElementById('confTaxAccount'));
	$scope.confOwnerAccountPop = new Modal(document.getElementById('confOwnerAccount'));
   

    $scope.is_owner=false;
    
  
    
    $scope.$watch(function() {
		    if (walletService.wallet == null) return null;

		    return walletService.wallet.getAddressString();
	    }, function() {
		    if (walletService.wallet == null) return;
		    $scope.wallet = walletService.wallet;
            $scope.refresh();
    });
    
    $scope.refresh = function(){
        $scope.validateStatus='';
        globalFuncs.getAccInfo(globalFuncs.slockitIsOwner, $scope.wallet.getAddressString(), function(status){
                $scope.is_owner = status==1;
                $scope.owner_account=$scope.wallet.getAddressString();
                $scope.load(); 
        }); 
    }
    
    $scope.load = function(){
        $scope.ready = false;
        globalFuncs.getAccInfo(globalFuncs.slockitTaxAmount, $scope.wallet.getAddressString(), function(amount){
          globalFuncs.getAccInfo(globalFuncs.slockitTaxLegAmount, $scope.wallet.getAddressString(), function(amountLeg){
           globalFuncs.getGlobInfo(globalFuncs.slockitTaxAccount, function(acc){
               $scope.taxes_amount = amount;
               $scope.taxes_amount_leg = amountLeg;

               $scope.tax_account = '0x'+acc.substring(26, 67);
               $scope.ready = true;
           });
        });
        });
    }
     
    
    $scope.updateTax = function(){
        $scope.new_tax_amount =  $scope.taxes_amount;
        $scope.confTaxPop.open();
    }
    
    $scope.confirmTax = function(){
         $scope.confTaxPop.close();
         globalFuncs.SetTaxAmount($scope.wallet, $scope.new_tax_amount, function(res){
            if (res.isError){
                $scope.validateStatus= $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("GLB_Tax_amount_not_updated")));
            } else {
                $scope.validateStatus= $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("GLB_Tax_amount_updated")));
                $scope.trans_message = $translate.instant("GLB_Tax_amount_updated");
                $scope.waitTransaction(res.data); 
            }
         });   
    }
    
    $scope.updateTaxLeg = function(){
        $scope.new_tax_amount_leg =  $scope.taxes_amount_leg;
        $scope.confTaxLegPop.open();
    }
    
    $scope.confirmTaxLeg = function(){
         $scope.confTaxLegPop.close();
         globalFuncs.SetTaxLegAmount($scope.wallet, $scope.new_tax_amount_leg, function(res){
            if (res.isError){
                $scope.validateStatus= $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("GLB_Tax_amount_not_updated")));
            } else {
                $scope.validateStatus= $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("GLB_Tax_amount_updated")));
                $scope.trans_message = $translate.instant("GLB_Tax_amount_updated");
                $scope.waitTransaction(res.data); 
            }
         });   
    }
    
    
    $scope.updateTaxAcc = function(){
        $scope.new_tax_account =  $scope.tax_account;
        $scope.confTaxAccountPop.open();
    }
    
    $scope.confirmTaxAccount = function(){
        globalFuncs.SetTaxAccount($scope.wallet, $scope.new_tax_account, function(res){
           if (res.isError){
                $scope.validateStatus= $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("GLB_Tax_account_not_updated")));
            } else {
                $scope.validateStatus= $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("GLB_Tax_account_updated")));
                $scope.trans_message = $translate.instant("GLB_Tax_account_updated");
                $scope.waitTransaction(res.data); 
            } 
        });
        $scope.confTaxAccountPop.close();
    }
    
    $scope.updateOwnAcc = function(){
        $scope.new_owner_account = $scope.owner_account;
        $scope.confOwnerAccountPop.open();
    }
    
     $scope.confirmOwnerAccount = function(){
        globalFuncs.SetOwnerAccount($scope.wallet, $scope.new_owner_account, function(res){
           if (res.isError){
                $scope.validateStatus= $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("GLB_Owner_account_not_updated")));
            } else {
                $scope.validateStatus= $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("GLB_Owner_account_updated")));
                
                $scope.trans_message = $translate.instant("GLB_Owner_account_updated");
                $scope.waitTransaction(res.data); 
            } 
        });
        $scope.confOwnerAccountPop.close();
        
    }
    
  $scope.waiting_tran=false;
  $scope.interval_id=null;
  
  $scope.recievedTransaction = function(){
        clearInterval($scope.interval_id);
        $scope.waiting_tran=false;
        $scope.refresh();
        $scope.$apply();
  }
  
   $scope.waitTransaction = function(transaction_ash){
      if ($scope.interval_id){
          clearInterval($scope.interval_id);
          $scope.interval_id=null;
      }
      
      $scope.waiting_tran=true;
      $scope.ready = false;
      
      $scope.interval_id = setInterval(function(){
          ajaxReq.getBlock(transaction_ash, function(block_json){
              if (block_json.blockNumber.startsWith('0x')){
                 $scope.recievedTransaction();
              }
          });
      },5000);  
  }  
  
  
  
    $scope.helloToAddressOwn = function(text){
      $scope.new_owner_account=text;
      $scope.$apply();
    }
    
    $scope.helloToAddressTax = function(text){
      $scope.new_tax_account=text;
      $scope.$apply();
    }
    
    $scope.startScanToAddressTax = function(){
        cordova.plugins.barcodeScanner.scan(
		function (result) {
			$scope.helloToAddressTax(result.text);
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	    );
    };
  
     $scope.startScanToAddressOwn = function(){
        cordova.plugins.barcodeScanner.scan(
		function (result) {
			$scope.helloToAddressOwn(result.text);
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	    );
    };
  
  
  
  
  
   
};
module.exports = globalCtrl;


