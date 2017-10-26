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
var lemanCtrl = function($scope, $locale, $sce, walletService, contactservice, $translate) {
    $locale.NUMBER_FORMATS.GROUP_SEP = "'";
    $scope.limitWithoutPass=0;
    
	$scope.sendTxModal = new Modal(document.getElementById('sendTransaction'));
	$scope.executedTransModal = new Modal(document.getElementById('executedTrans'));
	$scope.chooseOrigineModal = new Modal(document.getElementById('chooseOrigine'));
    

	$scope.showRaw = false;
    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    $scope.ready = false;
    
    $scope.showContactPop=false;
    $scope.showContactPopOrigine=false;
    $scope.showDelegationPop=false;
    $scope.showMyBalance=true;
    $scope.showDelegLimit=false;
    $scope.display_deleg_limit='';
    $scope.delegation_limit = 0;
    
    $scope.elemanAmmount=0;
    $scope.lemanexAmmount=0;
    
    $scope.is_locked=false;
    
    $scope.contacts = [];
    $scope.lock_address_reading=false;
    $scope.mode = "fromMe";
    $scope.delegations=[];
    $scope.is_request_mode=false;
    
    $scope.myAddress='';
 
	
	$scope.token = {
		balance: 0,
		total: 0,
		totRaised: 0
	}
    
    $scope.token.balance = $translate.instant("TRAN_Wait");
    $scope.trans_message = $translate.instant("GP_Wait_tran");
    
	$scope.tokenTx = {
		to: '',
		value: '',
		unit: "Lem"
	}
	$scope.$watch(function() {
		if (walletService.wallet == null) return null;
		return walletService.wallet.getAddressString();
	}, function() {
		if (walletService.wallet == null) return;
		$scope.wallet = walletService.wallet;
       
        $scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toV3(walletService.password, {
				kdf: globalFuncs.kdf,
                n: globalFuncs.scrypt.n
		}));
 
        $scope.contacts = contactservice.hideContact(contactservice.loadContacts(), $scope.wallet.getAddressString());
        $scope.setOrigineAddress($scope.wallet.getAddressString());
        $scope.lockDestinationAddress(false);
        globalFuncs.getAccInfo(globalFuncs.slockitAccStatus, $scope.wallet.getAddressString(), function(status){
                    $scope.is_locked = status==0;
        });
        $scope.setBalance(true);
        globalFuncs.notifyApproval();
	});
    
	$scope.setBalance = function(readyStatus) {
        var wallet_address = $scope.wallet.getAddressString();

        globalFuncs.getAmmount(globalFuncs.slockitBalance, wallet_address, function(value){$scope.token.balance = value;});
        globalFuncs.getAmmount(globalFuncs.slockitElBlance, wallet_address, function(value){$scope.balanceEL = Math.round(value * 100);});
        globalFuncs.getAmmount(globalFuncs.slockitCmBlance, wallet_address, function(value){$scope.balanceCM = Math.round(value * 100);});
        globalFuncs.getAmmount(globalFuncs.slockitCmLimitm,wallet_address, function(value){$scope.limitCMm = Math.round(value * 100);$scope.ready = readyStatus;});

	}
    
    
    $scope.refresh= function(){
         $scope.refreshSend();
         if ($scope.showDelegLimit){
            $scope.refreshDeleg(function(){});
         }
    }
    
    $scope.refreshSend = function(){
         $scope.ready = false;
         $scope.validateTxStatus ='';
         $scope.setBalance(true);
    }
    
    $scope.refreshDeleg = function(callback){
        $scope.ready = false;
        $scope.showDelegLimit=true;
        globalFuncs.getAmmount(globalFuncs.slockitElBlance, $scope.origine_address, function(value){
            $scope.deleg_nant_bal = Math.round(value * 100);
            globalFuncs.getAmmount(globalFuncs.slockitCmBlance, $scope.origine_address, function(value){
                $scope.deleg_cm_bal = Math.round(value * 100);
                globalFuncs.getAmmount(globalFuncs.slockitCmLimitm, $scope.origine_address, function(value){
                    $scope.deleg_cm_lim = Math.round(value * 100);
                    var cm_available= $scope.deleg_cm_bal- $scope.deleg_cm_lim;
                    $scope.display_deleg_limit = Math.min( Math.round($scope.delegation_limit* 100), Math.max(cm_available, $scope.deleg_nant_bal))/100.;
                    $scope.ready = true;
                    callback();
                });
            });
        });  
    }
    
    
   $scope.refreshFrom = function(callback){
        $scope.ready = false;
        globalFuncs.getAmmount(globalFuncs.slockitElBlance, $scope.curr_from_add, function(value){
            $scope.from_nant_bal = Math.round(value * 100);
            globalFuncs.getAmmount(globalFuncs.slockitCmBlance, $scope.curr_from_add, function(value){
                $scope.from_cm_bal = Math.round(value * 100);
                globalFuncs.getAmmount(globalFuncs.slockitCmLimitm, $scope.curr_from_add, function(value){
                    $scope.from_cm_lim = Math.round(value * 100);
                     $scope.ready = true;
                    callback();
                });
            });
        });  
    }
    
    
    
    $scope.setName = function(){
        $scope.selectedName = contactservice.getContactName($scope.contacts, $scope.tokenTx.to); 
    }
    
	$scope.generateTokenTx = function() {
        $scope.setName();
        
        if ($scope.tokenTx.to=='' ||$scope.tokenTx.value=='' ){
            $scope.showRaw = false;
            return;
        }
        
        try {
            document.getElementById('trStatus').innerHTML='';
                
            $scope.tokenTx.value = $scope.tokenTx.value.replace(",", ".");
            
            if (!$scope.is_request_mode && $scope.tokenTx.to.toUpperCase() == $scope.wallet.getAddressString().toUpperCase()) throw 'ERROR_6';
            
            if (!ethFuncs.validateEtherAddress($scope.tokenTx.to)) throw 'ERROR_6';
		    else if (!globalFuncs.isNumeric($scope.tokenTx.value) || parseFloat($scope.tokenTx.value) <= 0) throw 'ERROR_8';
		
            if ($scope.tokenTx.value % 1 >0){
                $scope.tokenTx.value = Math.round($scope.tokenTx.value * 100)/100.;
            }
            $scope.validateTxStatus='';
            
            if ($scope.mode == "fromDeleg" && $scope.tokenTx.value>$scope.display_deleg_limit){
                $scope.validateTxStatus = $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant('DELEG_AmountBiggerThanDeleg')));
			    $scope.showRaw = false;
            } else {
                
                $scope.showRaw = true;
            }
            
        } catch (e) {
			$scope.showRaw = false;
			$scope.validateTxStatus = $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant(e)));
		} 
	}
    
    $scope.generateeTx = function(){
        globalFuncs.TransfertNant($scope.wallet, $scope.tokenTx.to, $scope.elemanAmmount,  function(res){
                    if (res.isError){
                        $scope.ready = true;
				        $scope.err_message = $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                        $scope.sendTxModal.open();
                    } else {

                        if ($scope.lemanexAmmount>0){
                             $scope.generatelTx(1);
                        } else {
                            $scope.waitTransaction(res.data);
                            $scope.err_message = $translate.instant("TRAN_Done");
                            $scope.openConf();
                        }
                      
                    }
                 
		        });
     }
    
    
    $scope.generatelTx = function(incr){
        
        globalFuncs.TransfertCM($scope.wallet, $scope.tokenTx.to, $scope.lemanexAmmount,incr, function(res){
                    if (res.isError){
                        $scope.ready = true;
				        $scope.err_message = $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                        $scope.sendTxModal.open();
                    } else {
                        $scope.waitTransaction(res.data);
                        $scope.err_message = $translate.instant("TRAN_Done");
                        $scope.openConf();
                    }
                 
		        });
    }
    
    
   
    
    $scope.generateTxx = function() {
        if ($scope.elemanAmmount>0){
             $scope.generateeTx();
        } else if ($scope.lemanexAmmount>0){
             $scope.generatelTx(0);
        } 
	}
    
    $scope.confirmPop= function() {
       $scope.trPass=walletService.getPass();
       if ($scope.mode == "fromMe"){
           $scope.setBalance(true);
           $scope.typeTrans="no"
           $scope.err_message='';
           var value_cent = Math.round($scope.tokenTx.value * 100);
           
          /* $scope.typeTrans = globalFuncs.getTransCurrency($scope.balanceEL, $scope.balanceCM, $scope.limitCMm, value_cent);
           if ($scope.typeTrans=="no"){
               if ($scope.balanceEL+$scope.balanceCM-$scope.limitCMm>=value_cent){
                    $scope.err_message=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant('TRAN_SplitedTrans')));
               } else {
                   $scope.err_message=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant('TRAN_NotPossible')));
               }
           } else if ($scope.typeTrans=="nant"){
                $scope.typeTrans=$translate.instant('CUR_nanti');
           } else if ($scope.typeTrans=="cm"){
               $scope.typeTrans=$translate.instant('CUR_credit_mut');
           }*/
           
           
           var splitted = globalFuncs.getSplitting($scope.balanceEL, $scope.balanceCM, $scope.limitCMm, value_cent);
           if (splitted['possible']){
                if (splitted['cm']>0){
                    if (splitted['nant']>0){
                         $scope.typeTrans=$translate.instant('CUR_nanti')+"/"+$translate.instant('CUR_credit_mut');
                         $scope.err_message=$sce.trustAsHtml(globalFuncs.getWarningText($translate.instant('TRAN_SplitedTrans')));
                    } else {
                        $scope.typeTrans=$translate.instant('CUR_credit_mut');
                    }
                }  else  if (splitted['nant']>0){
                    $scope.typeTrans=$translate.instant('CUR_nanti');
                }
           } else {
              $scope.err_message=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant('TRAN_NotPossible')));
           }
           
           
       } else if ($scope.mode == "fromDeleg"){
            $scope.err_message='';
            $scope.typeTrans="";
               
       } else if ($scope.mode == "toMe"){
            $scope.err_message='';
            $scope.typeTrans="toMe"
       }
       $scope.sendTxModal.open();
    }
    
  
    $scope.cancelTx = function(){
        $scope.refreshSend();
    }
    
    
    $scope.delegationSendCallBack = function(res){
         if (res.isError){
            $scope.ready = true;
			$scope.err_message = $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
            $scope.sendTxModal.open();
         } else {
            $scope.err_message = $translate.instant("TRAN_Done");
            $scope.waitTransaction(res.data);
            $scope.openConf();
         }
    }
    
	$scope.sendTx = function() {
        if ($scope.tokenTx.value<$scope.limitWithoutPass || $scope.trPass==walletService.password){
           walletService.setUsed();
           $scope.sendTxModal.close();
           $scope.ready = false; 
           try {
                if ($scope.mode == "fromMe"){
                   $scope.setBalance(false);
                   // Compute the splitting 
                   var value_cent = Math.round($scope.tokenTx.value * 100);
                   var splitted = globalFuncs.getSplitting($scope.balanceEL, $scope.balanceCM, $scope.limitCMm, value_cent);
                /*   var cur_tran_type = globalFuncs.getTransCurrency($scope.balanceEL, $scope.balanceCM, $scope.limitCMm, value_cent);
    
                   if (cur_tran_type=='nant'){
                        $scope.elemanAmmount=value_cent;
                        $scope.lemanexAmmount=0;
                   } else if (cur_tran_type=='cm'){
                        $scope.elemanAmmount=0;
                        $scope.lemanexAmmount=value_cent;
                  // } */
                   if (splitted['possible']){
                       $scope.elemanAmmount=splitted['nant'];
                       $scope.lemanexAmmount=splitted['cm'];
                   } else {
                       throw 'TRAN_NotPossible';
                   }
                   
			       $scope.generateTxx();
                    
               } else if ($scope.mode == "fromDeleg"){
                   $scope.refreshDeleg(function(){
                      $scope.elemanAmmount=0;
                      $scope.lemanexAmmount=0;
                      var value_cent = Math.round($scope.tokenTx.value * 100);
                      var cur_tran_type = globalFuncs.getTransCurrency($scope.deleg_nant_bal, $scope.deleg_cm_bal, $scope.deleg_cm_lim, value_cent);
                    
                      if (cur_tran_type=='nant'){
                            $scope.elemanAmmount=value_cent;
                            globalFuncs.TransfertOnBehalfNant($scope.wallet,
                                                                $scope.origine_address, 
                                                                $scope.tokenTx.to, 
                                                                parseInt(100*$scope.tokenTx.value,10),    
                                                                $scope.delegationSendCallBack);
                      } else if (cur_tran_type=='cm'){
                             $scope.lemanexAmmount=value_cent;
                             globalFuncs.TransfertOnBehalfCM($scope.wallet,
                                                                $scope.origine_address, 
                                                                $scope.tokenTx.to, 
                                                                parseInt(100*$scope.tokenTx.value,10),    
                                                                $scope.delegationSendCallBack);
                      } else {
                           throw 'TRAN_NotPossible';
                      }
                   });
               
               } else if ($scope.mode == "toMe"){
                   $scope.refreshFrom(function(){
                       
                      $scope.elemanAmmount=0;
                      $scope.lemanexAmmount=0;
                      var value_cent = Math.round($scope.tokenTx.value * 100);
                      var cur_tran_type = globalFuncs.getTransCurrency($scope.from_nant_bal, $scope.from_cm_bal, $scope.from_cm_lim, value_cent);
                      if (cur_tran_type=='cm'){
                             $scope.lemanexAmmount=value_cent;
                             globalFuncs.askTransfertCMFrom($scope.wallet, 
                                                          $scope.wallet.getAddressString(), 
                                                          $scope.curr_from_add, 
                                                          parseInt(100*$scope.tokenTx.value,10), 
                                                          $scope.delegationSendCallBack);
                      } else {
                          
                              $scope.elemanAmmount=value_cent;
                              globalFuncs.askTransfertFrom($scope.wallet, 
                                                          $scope.wallet.getAddressString(), 
                                                          $scope.curr_from_add, 
                                                          parseInt(100*$scope.tokenTx.value,10), 
                                                          $scope.delegationSendCallBack);
                      } 
                   });
                
               }  
		   } catch (e) {
		        $scope.ready = true;
			    $scope.err_message = $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant(e)));
                $scope.sendTxModal.open();
		   } 
        } else {
            
           document.getElementById('trStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("TRAN_WrongPass")));
        }
	}
    
    $scope.openConf = function(){
        $scope.executedTransModal.open();
    }
    
     $scope.closeConf = function() {
        $scope.executedTransModal.close();
        $scope.token.to='';
        $scope.token.value='';
        $scope.tokenTx.to='';
        $scope.tokenTx.value='';
        $scope.selectedName='';
        $scope.showRaw = false;
        $scope.lock_address_reading=false;
        $scope.mode = "fromMe";
        $scope.is_request_mode=false;
    
       
     }
    
    
    // contacts
    $scope.contactPop = function() {
      $scope.NoCtc= $scope.contacts.length==0;
      $scope.showContactPop=true;
    }
    
    
    $scope.closeCttPop = function() {
      $scope.showContactPop=false;  
    }
    
    $scope.pickCtc = function(address,name){
        $scope.tokenTx.to= address; 
        $scope.generateTokenTx();
        $scope.closeCttPop();
    }
    
    
    // origine
    
    $scope.originePop = function(){
        $scope.myAddress=$scope.wallet.getAddressString();
        $scope.ready = false;
        globalFuncs.getMyDelegationList($scope.myAddress,function(list){
            $scope.delegations=list;
            $scope.hasDelegations= $scope.delegations.length>0;
            for(var ind =0;ind<$scope.delegations.length;ind++){
               $scope.delegations[ind].name =  contactservice.getContactName($scope.contacts, $scope.delegations[ind].address); 
            }
            $scope.ready = true;
            $scope.chooseOrigineModal.open();
            
        });
        
    }
    
    
    $scope.setOrigineAddress = function(address){
        $scope.origine_address = address;
        $scope.from_name=contactservice.getContactName($scope.contacts, address); 
        $scope.showMyBalance=address==$scope.wallet.getAddressString();
        $scope.showDelegLimit=$scope.mode == "fromDeleg";
    }
    
    
    
    $scope.lockDestinationAddress = function(do_lock){
        $scope.lock_address_reading=do_lock;
        document.getElementById('toField').readOnly = do_lock;
        
        if (do_lock){
            $scope.tokenTx.to = $scope.wallet.getAddressString();
            document.getElementById('ctc_pop_btn').style.display ='none';
        } else {
           $scope.tokenTx.to = '';
           
           document.getElementById('ctc_pop_btn').style.display ='block';
        }
        
        $scope.setName();
    }
    
     // contacts
    $scope.contactPopOrigine = function() {
      $scope.NoCtc= $scope.contacts.length==0;
      $scope.showContactPopOrigine=true;
    }
    
    $scope.closeCttPopO = function() {
        $scope.showContactPopOrigine=false; 
    }
    
    $scope.pickCtcO = function(address,name){
        $scope.curr_from_add= address; 
        $scope.setNameFrom();
        $scope.closeCttPopO();
    }
    
    $scope.delegPop = function() {
      $scope.showDelegationPop=true;
    }
    
    $scope.closeDelPop = function() {
      $scope.showDelegationPop=false; 
    }
    
    $scope.pickDeleg = function(address,name,limit){
        $scope.curent_deleg_add = address; 
        $scope.curent_deleg_limit = limit; 
        $scope.curent_deleg_name = name;
        $scope.closeDelPop();
    }
    
    
    
    // closing origin: my address
    $scope.selectOrigineMy= function(){
        $scope.mode = "fromMe";
        $scope.setOrigineAddress($scope.wallet.getAddressString());
        $scope.lockDestinationAddress(false);
        $scope.is_request_mode=false;
        $scope.generateTokenTx();
        $scope.tokenTx.value='';
        $scope.chooseOrigineModal.close();
    }
    
    
    // closing origin: delegation mode
    $scope.selectOrigineDeleg= function(){
        
        if ($scope.curent_deleg_add.length!=$scope.wallet.getAddressString().length  || $scope.curent_deleg_add==$scope.wallet.getAddressString())  {
           // todo error_message in the popup
        } else {
            $scope.mode = "fromDeleg";
            $scope.setOrigineAddress($scope.curent_deleg_add);
            $scope.delegation_limit = $scope.curent_deleg_limit;
            $scope.lockDestinationAddress(false);
    
            $scope.is_request_mode=false;
            
            $scope.refreshDeleg(function(){});
            $scope.generateTokenTx();
            $scope.tokenTx.value='';
            $scope.chooseOrigineModal.close();
        }
    }
    
    // closing origin: ask payement from
    $scope.selectOrigineFrom= function(){
        
        if ($scope.curr_from_add.length!=$scope.wallet.getAddressString().length  || $scope.curr_from_add==$scope.wallet.getAddressString())  {
           // todo error_message in the popup
        } else {
            $scope.mode = "toMe";
            $scope.setOrigineAddress($scope.curr_from_add);
            
            $scope.lockDestinationAddress(true);
     
            $scope.is_request_mode=true;
            $scope.tokenTx.value='';
            $scope.chooseOrigineModal.close();
        }
    }
    
    
     $scope.setNameFrom = function(){
        $scope.curr_from_name = contactservice.getContactName($scope.contacts, $scope.curr_from_add); 
    }
    
    

    
    // Scan address
     
    $scope.helloToAddress = function(text){
      $scope.tokenTx.to=text;
      $scope.$apply();
    }
    
    $scope.startScanToAddress = function(){
        if (!$scope.lock_address_reading){
            cordova.plugins.barcodeScanner.scan(
		    function (result) {
			    $scope.helloToAddress(result.text);
		    }, 
		    function (error) {
			    alert("Scanning failed: " + error);
		    }
	        );
        }
    };
    
    
     // Scan address
     
    $scope.helloToAddressOrigine = function(text){
      $scope.curr_from_add=text;
      $scope.setNameFrom();
      $scope.$apply();
    }
    
    $scope.startScanToAddressOrigine = function(){
        cordova.plugins.barcodeScanner.scan(
		function (result) {
		 $scope.helloToAddressOrigine(result.text);
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		 }
	   );
        
    };
  
    
  $scope.waiting_tran=false;
  $scope.interval_id=null;
  
  $scope.dismissWaiting=function(){
      $scope.waiting_tran=false;
      $scope.ready = true;
  }
  
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
module.exports = lemanCtrl;


