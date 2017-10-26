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
var balanceCtrl = function($scope, $locale, $sce, walletService,contactservice, $translate) {
    // Check the environment
    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    $scope.currentWalletAddress=globalFuncs.getWalletAddress();
    $scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", localStorage.getItem('LemanWallet'));
    
    
	$scope.addDelegationModal = new Modal(document.getElementById('addDelegation'));
	$scope.editDelegationModal = new Modal(document.getElementById('editDelegation'));
    $scope.deleteDelegationModal = new Modal(document.getElementById('deleteDelegation'));
	$scope.delegationHelpPop = new Modal(document.getElementById('delegation_help_pop'), { keyboard: false, backdrop  : 'static'});
    
    
	$scope.addAllowanceModal = new Modal(document.getElementById('addAllowance'));
	$scope.editAllowanceModal = new Modal(document.getElementById('editAllowance'));
    $scope.deleteAllowanceModal = new Modal(document.getElementById('deleteAllowance'));
	$scope.allowanceHelpPop = new Modal(document.getElementById('allowance_help_pop'), { keyboard: false, backdrop  : 'static'});
    
	$scope.confPopModal = new Modal(document.getElementById('conf_pop'));
	$scope.optionPopModal = new Modal(document.getElementById('option_pop'));
    
    $scope.trans_message = $translate.instant("GP_Wait_tran");
    
    
    
    // Controler variables 
    $locale.NUMBER_FORMATS.GROUP_SEP = "'";
	$scope.showRaw = false;
    $scope.ready = false;
    $scope.contacts = [];
    $scope.showContactPop=false;

	$scope.token = {
		balance: 0
	}
    
    $scope.token.balance = $translate.instant("TRAN_Wait");
    $scope.token.balanceEL = $translate.instant("TRAN_Wait");
    $scope.token.balanceCM = $translate.instant("TRAN_Wait");
    $scope.token.limitCMm = $translate.instant("TRAN_Wait");
    $scope.token.limitCMp = $translate.instant("TRAN_Wait");

    $scope.is_locked = false;
    
	$scope.$watch(function() {
		if (walletService.wallet == null) return null;
		return walletService.wallet.getAddressString();
	}, function() {
		if (walletService.wallet == null) return;
		$scope.wallet = walletService.wallet;
        $scope.contacts = contactservice.hideContact(contactservice.loadContacts(), $scope.wallet.getAddressString());
        globalFuncs.getAccInfo(globalFuncs.slockitAccStatus, $scope.wallet.getAddressString(), function(status){
           $scope.is_locked = status==0;
        });
     
        
	});
    
	$scope.setBalance = function() {

        globalFuncs.getAmmount(globalFuncs.slockitBalance, $scope.currentWalletAddress, function(value){$scope.token.balance = value;});
        globalFuncs.getAmmount(globalFuncs.slockitElBlance, $scope.currentWalletAddress, function(value){$scope.token.balanceEL = value;});
        globalFuncs.getAmmount(globalFuncs.slockitCmBlance, $scope.currentWalletAddress, function(value){$scope.token.balanceCM = value;});
        globalFuncs.getAmmount(globalFuncs.slockitCmLimitm, $scope.currentWalletAddress, function(value){$scope.token.limitCMm = value;});
        globalFuncs.getAmmount(globalFuncs.slockitCmLimitp, $scope.currentWalletAddress, function(value){$scope.token.limitCMp = value; $scope.ready = true;});
	}
    
    $scope.setBalance();
    
    $scope.refresh=function(){
         $scope.refreshBal();
         $scope.refreshDel();
         $scope.refreshAllowance();
         
    }
    
    $scope.refreshBal=function(){
        $scope.ready = false;
        $scope.setBalance();
    }

    $scope.dowloadAppFile = function(){
        globalFuncs.dowloadAppFileWithName('Save_'+$scope.currentWalletAddress+'.dat', JSON.parse(localStorage.getItem('LemanWallet')));
    }
    
    $scope.callback = function(pdf_doc){
        pdf_doc.save('Save_QR_'+$scope.currentWalletAddress+'.pdf');
    }

	$scope.printQRCode = function() {
       globalFuncs.generateSaveQR();
       setTimeout(function(){ globalFuncs.generateSavePDF($scope.callback);},100); 
	}
    
    
    
    $scope.handleDelegation = function(){

       $scope.deleg_index=0;
       $scope.deleg_number=4;
       $scope.deleg_offset=0;
       
       $scope.ready = false;
       $scope.loadDelegations($scope.deleg_number,$scope.deleg_index*$scope.deleg_number + $scope.deleg_offset);
        
       document.getElementById('delegation_tab').style.display="inline-block"; 
       setTimeout(function () {
        document.getElementById('delegation_tab').style.top="62px";
       }, 200);
       
    }
    
    $scope.nextDeleg = function(){
        $scope.ready = false;
        $scope.deleg_index = $scope.deleg_index+1;
       $scope.loadDelegations($scope.deleg_number,$scope.deleg_index*$scope.deleg_number + $scope.deleg_offset);
    }
     $scope.prevDeleg = function(){
        $scope.ready = false;
        $scope.deleg_index = $scope.deleg_index-1;
       $scope.loadDelegations($scope.deleg_number,$scope.deleg_index*$scope.deleg_number + $scope.deleg_offset);
    }
    
     $scope.refreshDel = function(){
        $scope.ready = false;
        $scope.deleg_index = 0;
        document.getElementById('transDelStatus').innerHTML='';
        $scope.loadDelegations($scope.deleg_number,$scope.deleg_index*$scope.deleg_number + $scope.deleg_offset);
    }
    
    
      $scope.loadDelegations= function(count,offset){

         $scope.noDelegation = true;
         $scope.noMoreDelegation = true;
         if (offset>0){
              document.getElementById("prevDeleg").style.display = 'block';
              $scope.noDelegation = false;
          } else {
               document.getElementById("prevDeleg").style.display = 'none';
          
          }
          
          document.getElementById("nextDeleg").style.display = 'none';
        
          
          globalFuncs.getDelegationList($scope.wallet.getAddressString(),offset,offset+count-1 ,
                                     function(list){
                                         $scope.delegations = list;
                                         $scope.noDelegation = $scope.delegations.length==0 && offset==0;
                                         $scope.noMoreDelegation = !$scope.noDelegation && $scope.delegations.length<count;
                                         
                                         if (!$scope.noMoreDelegation && !$scope.noDelegation){
                                              document.getElementById("nextDeleg").style.display = 'block';
                                         }
                                         
                                       
                                         for(var ind =0;ind<$scope.delegations.length;ind++){
                                            $scope.delegations[ind].name =  contactservice.getContactName($scope.contacts, $scope.delegations[ind].address); 
                                         }
                                          // $scope.$apply();
                                         document.getElementById('transDelStatus').innerHTML='';
                                         document.getElementById('delStatus').innerHTML='';
                                         $scope.ready = true;
                                     });
        
    }
    

    
    $scope.addDelegPop = function(){
        $scope.currDelLimit='';
        $scope.curraddress='';
        $scope.trPass=walletService.getPass();
        $scope.selectedName='';
        document.getElementById('delStatus').innerHTML='';
        $scope.addDelegationModal.open();
    }
    
    $scope.closeDelegation = function(){
        document.getElementById('delegation_tab').style.top="100%";
         setTimeout(function () {
              document.getElementById('delegation_tab').style.display="none"; 
         }, 700);
    }
    
    $scope.delegateHelp = function(){
        $scope.delegationHelpPop.open();
      
    }
    
    $scope.saveNewDeleg = function(){
        if ($scope.trPass==walletService.password){
            walletService.setUsed();
          
            
            if ($scope.curraddress.length!=$scope.currentWalletAddress.length  || $scope.curraddress==$scope.currentWalletAddress)  {
                document.getElementById('delStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("DELEG_NotAcceptedAddress")));
            } else if (isNaN($scope.currDelLimit)  || $scope.currDelLimit<=0){
                 document.getElementById('delStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("DELEG_InvalidDelegationLimit")));
            } else {
              globalFuncs.setDelegation($scope.wallet, $scope.curraddress,$scope.currDelLimit,function(res){
                   if (res.isError){
                        $scope.ready = true;
				        document.getElementById('delStatus').innerHTML= $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                    } else {
                       $scope.waitTransaction(res.data);
                       document.getElementById('transDelStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("Deleg_order_create_send")));
                       $scope.addDelegationModal.close();
                       $scope.confStatus = $translate.instant("Deleg_order_create_send");
                       
                       $scope.trans_message = $translate.instant("Deleg_order_create_send")+ " " +$translate.instant("GP_Wait_tran");
                       //$scope.confPopModal.open();
                 }
                   
              }); 
            }
        } else {
              document.getElementById('delStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("WIEW_WrongPass")));
        }
    }
    
    
    // contacts
    $scope.contactPop = function() {
      $scope.NoCtc= $scope.contacts.length==0;
      $scope.showContactPop=true;
    }
    
    $scope.closeCttPop = function() {
      $scope.showContactPop=false;  
    }
    
    $scope.pickCtc = function(address,name,type){
        if (type=='deleg'){
             $scope.curraddress=address;
             $scope.selectedName = name; 
        }
        $scope.closeCttPop();
    }
    
    $scope.getCttName = function(){
        $scope.selectedName = contactservice.getContactName($scope.contacts, $scope.curraddress); 
    }
    

    
    
    $scope.helloToAddress = function(text){
      $scope.curraddress=text;
      $scope.selectedName = contactservice.getContactName($scope.contacts, text); 
      $scope.$apply();
    }
    
    $scope.startScanToAddress = function(){
      cordova.plugins.barcodeScanner.scan(
        function (result) {
			$scope.helloToAddress(result.text);
	    }, 
		function (error) {
			alert("Scanning failed: " + error);
		});
    }
    
    
    $scope.editDeleg = function(deleg){
        $scope.curraddress=deleg.address;
        $scope.selectedName = contactservice.getContactName($scope.contacts, deleg.address); 
        $scope.currDelLimit=deleg.amount;
        document.getElementById('del_lim_ed_p').value=deleg.amount;
        document.getElementById('delEditStatus').innerHTML='';
        $scope.trPass=walletService.getPass();
        $scope.editDelegationModal.open();
    }
    
    $scope.saveEditDeleg = function(){
        if ($scope.trPass==walletService.password){
            walletService.setUsed();
          
            if (isNaN($scope.currDelLimit)  || $scope.currDelLimit<=0){
                 document.getElementById('delEditStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("DELEG_InvalidDelegationLimit")));
            } else {
              globalFuncs.setDelegation($scope.wallet, $scope.curraddress,$scope.currDelLimit,function(res){
                    if (res.isError){
                        $scope.ready = true;
				        document.getElementById('delEditStatus').innerHTML= $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                    } else {
                       $scope.waitTransaction(res.data);
                       document.getElementById('transDelStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("Deleg_order_edit_send")));
                       $scope.editDelegationModal.close();
                       $scope.confStatus = $translate.instant("Deleg_order_edit_send");
                       $scope.confPopModal.open();
                    }
              }); 
            }
        } else {
              document.getElementById('delEditStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("WIEW_WrongPass")));
        }
    }
    
    $scope.deleteDeleg = function(deleg){
        $scope.curraddress=deleg.address;
        $scope.selectedName = contactservice.getContactName($scope.contacts, deleg.address); 
        $scope.currDelLimit=deleg.amount;
        document.getElementById('delDeleteStatus').innerHTML='';
        $scope.trPass=walletService.getPass();
        $scope.deleteDelegationModal.open();
    }
    
     $scope.saveDeleteDeleg = function(){
        if ($scope.trPass==walletService.password){
              walletService.setUsed();
              globalFuncs.setDelegation($scope.wallet, $scope.curraddress,-1,function(res){
                    if (res.isError){
                        $scope.ready = true;
				        document.getElementById('delDeleteStatus').innerHTML= $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                    } else {
                       $scope.waitTransaction(res.data);
                       document.getElementById('transDelStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("Deleg_order_delete_send")));
                       $scope.deleteDelegationModal.close();
                       $scope.confStatus = $translate.instant("Deleg_order_delete_send");
                       $scope.trans_message = $translate.instant("Deleg_order_delete_send")+ " " +$translate.instant("GP_Wait_tran");
                       //$scope.confPopModal.open();
                    }

              }); 
            
        } else {
              document.getElementById('delDeleteStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("WIEW_WrongPass")));
        }
    }
    
    
    
    ///////
    
     $scope.handleAllowance = function(){
       
       $scope.allow_index=0;
       $scope.allow_number=4;
       $scope.allow_offset=0;
       
       $scope.ready = false;
       $scope.loadAllowances($scope.allow_number,$scope.allow_index*$scope.allow_number + $scope.allow_offset);
        
       document.getElementById('allowance_tab').style.display="inline-block"; 
       setTimeout(function () {
        document.getElementById('allowance_tab').style.top="62px";
       }, 200);
       
    }
    
    $scope.nextAllow = function(){
        $scope.ready = false;
        $scope.allow_index = $scope.allow_index+1;
       $scope.loadAllowances($scope.allow_number,$scope.allow_index*$scope.allow_number + $scope.allow_offset);
    }
    
    $scope.prevAllow = function(){
        $scope.ready = false;
        $scope.allow_index = $scope.allow_index-1;
       $scope.loadAllowances($scope.allow_number,$scope.allow_index*$scope.allow_number + $scope.allow_offset);
    }
    
    $scope.refreshAllowance = function(){
        $scope.ready = false;
        $scope.allow_index = 0;
        document.getElementById('transAllowStatus').innerHTML='';
        $scope.loadAllowances($scope.allow_number,$scope.allow_index*$scope.allow_number + $scope.allow_offset);
    }
    
      
    $scope.loadAllowances= function(count,offset){

         $scope.noAllowance = true;
         $scope.noMoreAllowance = true;
         if (offset>0){
              document.getElementById("prevAllow").style.display = 'block';
              $scope.noAllowance = false;
          } else {
               document.getElementById("prevAllow").style.display = 'none';
          
          }
          
          document.getElementById("nextAllow").style.display = 'none';
        
          
         globalFuncs.getAllowanceList($scope.wallet.getAddressString(),offset,offset+count-1 ,
                                     function(list){
                                         $scope.allowances = list;
                                         $scope.noAllowance = $scope.allowances.length==0 && offset==0;
                                         $scope.noMoreAllowance = !$scope.noAllowance && $scope.allowances.length<count;
                                         
                                         if (!$scope.noMoreAllowance && !$scope.noAllowance){
                                              document.getElementById("nextAllow").style.display = 'block';
                                         }
                                         
                                       
                                         for(var ind =0;ind<$scope.allowances.length;ind++){
                                            $scope.allowances[ind].name =  contactservice.getContactName($scope.contacts, $scope.allowances[ind].address); 
                                         }
                                          // $scope.$apply();
                                         document.getElementById('transAllowStatus').innerHTML='';
                                         document.getElementById('allowStatus').innerHTML='';
                                         $scope.ready = true;
                                     });
        
    }
    
    
    
    
    $scope.closeAllowance = function(){
        document.getElementById('allowance_tab').style.top="100%";
         setTimeout(function () {
              document.getElementById('allowance_tab').style.display="none"; 
         }, 700);
    }
    
    $scope.allowanceHelp = function(){
        $scope.allowanceHelpPop.open();
      
    }
    
     $scope.addAllowPop = function(){
        $scope.currAllowAmount='';
        $scope.curraddress='';
        $scope.selectedName='';
        $scope.trPass=walletService.getPass();
        document.getElementById('allowStatus').innerHTML='';
        $scope.addAllowanceModal.open();
    }
    
    $scope.saveNewAllow = function(){
      if ($scope.trPass==walletService.password){
           walletService.setUsed();
           
            if ($scope.curraddress.length!=$scope.currentWalletAddress.length  || $scope.curraddress==$scope.currentWalletAddress)  {
                document.getElementById('allowStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("ALLOW_NotAcceptedAddress")));
            }  else if (isNaN($scope.currAllowAmount)  || $scope.currAllowAmount<=0){
                 document.getElementById('allowStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("ALLOW_InvalidAmount")));
            } else {
              globalFuncs.setAllowance($scope.wallet, $scope.curraddress,$scope.currAllowAmount,function(res){
                    if (res.isError){
                        $scope.ready = true;
				        document.getElementById('allowStatus').innerHTML= $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                    } else {
                       $scope.waitTransaction(res.data);
                       document.getElementById('transAllowStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("ALLOW_order_create_send")));
                       
                       $scope.addAllowanceModal.close();
                       $scope.confStatus = $translate.instant("ALLOW_order_create_send");
                       
                       $scope.trans_message = $translate.instant("ALLOW_order_create_send")+ " " +$translate.instant("GP_Wait_tran");
                       //$scope.confPopModal.open();
                    } 
              }); 
            }
        } else {
              document.getElementById('allowStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("WIEW_WrongPass")));
        }
    }
    
       
    $scope.editAllow = function(allowance){
        $scope.curraddress=allowance.address;
        $scope.selectedName = contactservice.getContactName($scope.contacts, allowance.address); 
        $scope.currAllowAmount=allowance.amount;
        document.getElementById('all_amount_p').value=allowance.amount;
        document.getElementById('allowEditStatus').innerHTML='';
        $scope.trPass=walletService.getPass();
        $scope.editAllowanceModal.open();
    }
    
    $scope.saveEditAllowance = function(){
        if ($scope.trPass==walletService.password){
            walletService.setUsed();
          
            if (isNaN($scope.currAllowAmount)  || $scope.currAllowAmount<=0){
                 document.getElementById('allowEditStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("ALLOW_InvalidAmount")));
            } else {
              globalFuncs.setAllowance($scope.wallet, $scope.curraddress,$scope.currAllowAmount,function(res){
                    if (res.isError){
                        $scope.ready = true;
				        document.getElementById('allowEditStatus').innerHTML= $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                    } else {
                       $scope.waitTransaction(res.data);
                       document.getElementById('transAllowStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("ALLOW_order_edit_send")));
                       $scope.editAllowanceModal.close();
                       $scope.confStatus = $translate.instant("ALLOW_order_edit_send");
                       
                       $scope.trans_message = $translate.instant("ALLOW_order_edit_send")+ " " +$translate.instant("GP_Wait_tran");
                      // $scope.confPopModal.open();
                    } 
              }); 
            }
        } else {
              document.getElementById('allowEditStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("WIEW_WrongPass")));
        }
    }
    
    $scope.deleteAllow = function(allowance){
        $scope.curraddress=allowance.address;
        $scope.selectedName = contactservice.getContactName($scope.contacts, allowance.address); 
      
        document.getElementById('allowDeleteStatus').innerHTML='';
        $scope.trPass=walletService.getPass();
        $scope.deleteAllowanceModal.open();
    }
    
     $scope.saveDeleteAllowance = function(){
        if ($scope.trPass==walletService.password){
            walletService.setUsed();
               globalFuncs.setAllowance($scope.wallet, $scope.curraddress,-1,function(res){
                   if (res.isError){
                        $scope.ready = true;
				        document.getElementById('allowDeleteStatus').innerHTML= $sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                    } else {
                       $scope.waitTransaction(res.data);
                       document.getElementById('transAllowStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("ALLOW_order_delete_send")));
                       $scope.deleteAllowanceModal.close();
                       $scope.confStatus = $translate.instant("ALLOW_order_delete_send");
                       $scope.trans_message = $translate.instant("ALLOW_order_delete_send")+ " " +$translate.instant("GP_Wait_tran");
                       
                       //$scope.confPopModal.open();
                    }  
              }); 
            
        } else {
              document.getElementById('allowDeleteStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("WIEW_WrongPass")));
        }
    }
    
    
 ////////////////////////////////////////////////////////////////
    $scope.openOptions = function(){
        $scope.trPass='';
        document.getElementById('optStatus').innerHTML='';
        $scope.delay = walletService.delay;
        $scope.optionPopModal.open();
    }
    
    $scope.saveOption = function(){
       if ($scope.trPass==walletService.password){
          walletService.setUsed();
          walletService.setDelay($scope.delay);
          $scope.optionPopModal.close();
         } else {
              document.getElementById('optStatus').innerHTML=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("WIEW_WrongPass")));
        }
    }
     
     
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
module.exports = balanceCtrl;


