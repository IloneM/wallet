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
var exchangeCtrl = function($scope, $locale, $sce, walletService, $translate) {
    // Check the environment
    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    $scope.currentWalletAddress=globalFuncs.getWalletAddress();
    $scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", localStorage.getItem('LemanWallet'));
    
	$scope.confCreditPop = new Modal(document.getElementById('confCredit'));
	$scope.updatePop = new Modal(document.getElementById('update'));
   
    // Controler variables 
    
    $scope.pop_message='';
    $scope.ready = true;
    $scope.valid_acc = false;
    $scope.trans_message = $translate.instant("GP_Wait_tran");
    
    
    $scope.is_lock=1;
    $scope.lock_status = "";
    $scope.lock_button = "";
    $scope.balance = $translate.instant("TRAN_Wait");
    $scope.balanceEL = $translate.instant("TRAN_Wait");
    $scope.balanceCM = $translate.instant("TRAN_Wait");
    $scope.limitCMm = $translate.instant("TRAN_Wait");
    $scope.limitCMp = $translate.instant("TRAN_Wait");
    $scope.pop_acc_type=0;
    
    $scope.AccountType = function () {
        this.tp = 0;
        this.tp_name = "";
        this.can_admin = false;
        this.is_person = true;
        this.is_legal = false;
        this.is_admin = false;
    }
    
    $scope.acc_type_obj = new $scope.AccountType();
    $scope.acc_type=0;
    $scope.acc_type_obj.setType = function (type_val) {
       this.tp=type_val;
       $scope.acc_typ=type_val;
       this.is_admin = type_val==2;
       this.is_legal= type_val==1;
       this.is_person= type_val==0;
        if (type_val==0){
           this.tp_name = $translate.instant("EXC_Account_Type_physical");
        } else if (type_val==1){
           this.tp_name = $translate.instant("EXC_Account_Type_legal");
        } else if (type_val==2){
           this.tp_name = $translate.instant("EXC_Account_Type_admin");
        } 
    };
    
    
    $scope.setBalance = function() {

        globalFuncs.getAmmount(globalFuncs.slockitBalance, $scope.selected_account, function(value){$scope.balance = value;});
        globalFuncs.getAmmount(globalFuncs.slockitElBlance, $scope.selected_account, function(value){$scope.balanceEL = value;});
        globalFuncs.getAmmount(globalFuncs.slockitCmBlance, $scope.selected_account, function(value){$scope.balanceCM = value;});
        
        globalFuncs.getAccInfo(globalFuncs.slockitAccType, $scope.selected_account, function(value){
                    $scope.acc_type_obj.setType(value);
                   
        });
        globalFuncs.getAccInfo(globalFuncs.slockitAccStatus, $scope.selected_account, function(value){
                                                                                                         if (value==1){
                                                                                                            $scope.lock_status = $translate.instant("EXC_Unlocked");
                                                                                                            $scope.lock_button = $translate.instant("EXC_Lock");
                                                                                                            $scope.is_lock = false;
                                                                                                         } else {
                                                                                                            $scope.lock_status = $translate.instant("EXC_Locked");
                                                                                                            $scope.lock_button = $translate.instant("EXC_Unlock");
                                                                                                            $scope.is_lock = true;
                                                                                                         }
                                                                                                     });
        
        globalFuncs.getAmmount(globalFuncs.slockitCmLimitm, $scope.selected_account, function(value){ $scope.limitCMm = value;});
        globalFuncs.getAmmount(globalFuncs.slockitCmLimitp, $scope.selected_account, function(value){ $scope.limitCMp = value; $scope.ready = true;});
        
	}
    
    $scope.refresh = function() {
         $scope.ready = false;
         $scope.acc_message ="";
         $scope.setBalance();
    }
    
    $scope.is_admin=false;
    
    $scope.$watch(function() {
		    if (walletService.wallet == null) return null;

		    return walletService.wallet.getAddressString();
	    }, function() {
		    if (walletService.wallet == null) return;
		    $scope.wallet = walletService.wallet;
            globalFuncs.getAccInfo(globalFuncs.slockitAccType, $scope.wallet.getAddressString(), function(type){
              
               globalFuncs.getAccInfo(globalFuncs.slockitAccStatus, $scope.wallet.getAddressString(), function(status){
                    $scope.is_admin = type==2 && status==1;
               });
            });
        });
    
      
    $scope.helloToAddress = function(text){
      $scope.selected_account=text;
      $scope.checkSelectedAccount();
      $scope.$apply();
    }
    
    $scope.startScanToAddress = function(){
        cordova.plugins.barcodeScanner.scan(
		function (result) {
			$scope.helloToAddress(result.text);
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	    );
    };
    
    $scope.checkSelectedAccount = function(){
        if ($scope.selected_account.length==42){
            $scope.ready = false;
            $scope.acc_message ="";
           
            $scope.valid_acc = true;
           
            $scope.credit_amount=null;
            $scope.setBalance();
            
        } else{
             $scope.acc_message = $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("EXC_unknow_address"))); 
             $scope.valid_acc = false;
        } 
    }
    
    
    
    
    $scope.updateAccount  = function(){
      $scope.pop_message="";
      
      $scope.pop_limitCMp=$scope.limitCMp;
      document.getElementById('limitP').value = $scope.limitCMp;
      
      $scope.pop_limitCMm=$scope.limitCMm;
      document.getElementById('limitM').value = $scope.limitCMm;
      
      $scope.pop_is_lock=$scope.is_lock;
      document.getElementById('cb_lock').checked=$scope.is_lock;
      document.getElementById('cb_unlock').checked=!$scope.is_lock;
      
      $scope.pop_acc_type=$scope.acc_type_obj.tp;
      document.getElementById('cb_pers').checked=$scope.acc_type_obj.is_person;  
      document.getElementById('cb_legal').checked=$scope.acc_type_obj.is_legal;  
      document.getElementById('cb_admin').checked=$scope.acc_type_obj.is_admin;

      $scope.acc_type_obj.can_admin = false;
      if ( ($scope.balanceEL==0 && $scope.balanceCM==0) ||  $scope.acc_type_obj.is_admin){
            $scope.acc_type_obj.can_admin = true;
      } 
      
      document.getElementById('limitM').readOnly = !$scope.acc_type_obj.is_legal;
     
      $scope.updatePop.open();
    }
    
    $scope.typeChanged = function(){
        var min_enabled = $scope.pop_acc_type==1;
        document.getElementById('limitM').readOnly = !min_enabled;
        if (!min_enabled){
            $scope.pop_limitCMm=0;
            document.getElementById('limitM').value = 0;
        }
        
    }
    
    $scope.confirmUpdate = function(){
       $scope.pop_message=''; 
       // check that the CM balance is compatible with the new type
       if ($scope.pop_acc_type==1 && $scope.balanceCM<0){
            $scope.pop_message=$sce.trustAsHtml(globalFuncs.getWarningText($translate.instant("EXC_New_type_not_compatible_with_bal"))); 
            return;
       } 
       
        $scope.pop_limitCMm = document.getElementById('limitM').value;
        $scope.pop_limitCMp = document.getElementById('limitP').value;
       
       // check that the CM limit is compatible with the balance 
       if ($scope.pop_limitCMp<$scope.balanceCM || $scope.pop_limitCMm>$scope.balanceCM){
           $scope.pop_message=$sce.trustAsHtml(globalFuncs.getWarningText($translate.instant("EXC_lim_not_compatible_with_bal"))); 
           return;
       }
        
       // prepare values:
        var status=1;
        if ($scope.pop_is_lock){
            status=0;
        }
        
        if ($scope.pop_acc_type==0){
             $scope.pop_limitCMm =0;
        }
        
        if ($scope.pop_acc_type==2){
             $scope.pop_limitCMp =0;
             $scope.pop_limitCMm =0;
        }
        
        globalFuncs.SetAccountParam($scope.wallet, 
                                    $scope.selected_account, 
                                    status, 
                                    $scope.pop_acc_type,  
                                    $scope.pop_limitCMm,  
                                    $scope.pop_limitCMp, 
                                    function(data){
                                         if (data.isError){
                                            $scope.acc_message = $sce.trustAsHtml(globalFuncs.getDangerText(data.error));
                                            $scope.pop_message = $scope.acc_message;
                                         } else {

                                            $scope.acc_message = $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("EXC_Account_updated")));
                                            $scope.trans_message = $translate.instant("EXC_Account_updated");
                                            $scope.updatePop.close();
                                            $scope.waitTransaction(data.data); 

                                           
                                         }
                                    });
        
    }
    
   
   $scope.creditAccount = function(){
       if ($scope.credit_amount>0){
        $scope.confCreditPop.open();
       }
   }
      
   $scope.confirmCreditAccount = function(){
       globalFuncs.PledgeAccount($scope.wallet, $scope.selected_account, $scope.credit_amount, function(rawTx){
             if (rawTx.isError){
                 $scope.acc_message = $sce.trustAsHtml(globalFuncs.getDangerText(rawTx.error));
             } else {
                 $scope.acc_message = $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("EXC_Account_credited_with")+$scope.credit_amount+$translate.instant("CUR")));
                 $scope.trans_message = $translate.instant("EXC_Account_credited_with")+$scope.credit_amount+$translate.instant("CUR");
                 $scope.waitTransaction(rawTx.data); 
             }
             globalFuncs.getAmmount(globalFuncs.slockitBalance, $scope.selected_account, function(value){
                  $scope.balance = value;
                  globalFuncs.getAmmount(globalFuncs.slockitElBlance, $scope.selected_account, function(value){
                      $scope.balanceEL = value;
                      $scope.credit_amount=null;
                      $scope.confCreditPop.close();
                      
                  });
              });
        
       });
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

};
module.exports = exchangeCtrl;


