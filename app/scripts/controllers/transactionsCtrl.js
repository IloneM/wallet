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
var transactionsCtrl = function($scope, $locale, $sce, walletService,contactservice,memoService, $translate) {
    // Check the environment
    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    $scope.currentWalletAddress=globalFuncs.getWalletAddress();
    
    // Create the modal popups
	$scope.addContact = new Modal(document.getElementById('addContact'));
  	$scope.transDetails = new Modal(document.getElementById('transDetails'));
    $scope.pendingApprovalHelpModal = new Modal(document.getElementById('approval_help_pop'));
    $scope.pendingRequestHelpModal = new Modal(document.getElementById('pending_help_pop'));
    $scope.sendTransactionModal = new Modal(document.getElementById('acceptRequestPay'));
    $scope.rejectTransactionModal = new Modal(document.getElementById('reject_Request'));
    $scope.conf_requestModal = new Modal(document.getElementById('conf_request'));
    $scope.conf_dissModal = new Modal(document.getElementById('conf_diss'));
    $scope.exportTraModal = new Modal(document.getElementById('exportTraPop'));
    
   
   
    
    // Controler variables 
    $locale.NUMBER_FORMATS.GROUP_SEP = "'";
    $scope.merge_type=0;
    $scope.content='';    
    $scope.ready = true;
    $scope.showNone = true;
    $scope.showNoMore = false;
    $scope.contacts=[]; 
    $scope.memos=[]; 
    $scope.transactions= {};
    $scope.tra_number=4;
    $scope.requested_tra_number=4;
    $scope.tra_offset=0;
    
    $scope.tot_in=0;
    $scope.tot_out=0;
    
    $scope.request_tab=0;
    $scope.pendingRequest=[];
    $scope.acceptedRequest=[];
    $scope.rejectedRequest=[];
    $scope.pendingApproval=[];
    $scope.is_locked = false;
    document.getElementById("rafraichir").title=$translate.instant("CTC_Tooltip_Rafraichir").replace("\n","");
    document.getElementById("exporter").title=$translate.instant("CTC_Tooltip_Ajout").replace("\n","");
    
    
    $scope.trans_message = $translate.instant("GP_Wait_tran");
    
    
	$scope.$watch(function() {
		if (walletService.wallet == null) return null;
		return walletService.wallet.getAddressString();
	}, function() {
		if (walletService.wallet == null) return;
		$scope.wallet = walletService.wallet; 
        globalFuncs.getAccInfo(globalFuncs.slockitAccStatus, $scope.wallet.getAddressString(), function(status){
           $scope.is_locked = status==0;
        });
	});
    
    $scope.loadTransactions= function(count,offset){
         $scope.memos = memoService.getMemos(false);
         if(!$scope.isApp){
             $scope.blobMemo = memoService.getMemoBlob($scope.memos)
         }
         $scope.showNone = true;
         $scope.showNoMore = true;
         if (offset>0){
              document.getElementById("prevTransactions").style.display = 'block';
              $scope.showNone = false;
          } else {
               document.getElementById("prevTransactions").style.display = 'none';
          
          }
          
          document.getElementById("addTransactions").style.display = 'none';
        
        
          ajaxReq.getTransList($scope.currentWalletAddress,count,offset,function(result){
              $scope.contacts = contactservice.loadContacts();
              $scope.transactions= null;
              $scope.transactions= {};
              $scope.tot_in=0;
              $scope.tot_out=0;
              
              for (var ind = 0; ind < result.length; ++ind) {
                  $scope.transactions[ind]={'id': (ind), 'data':JSON.parse(result[ind])};
                  $scope.transactions[ind].data.to_name = contactservice.getContactName($scope.contacts, $scope.transactions[ind].data._TO);
                  $scope.transactions[ind].data.from_name = contactservice.getContactName($scope.contacts, $scope.transactions[ind].data._FROM);
                  $scope.transactions[ind].data.memo = memoService.getMemo($scope.memos,$scope.transactions[ind].data.HASH);
                  $scope.transactions[ind].data.currency='';
                  if ($scope.transactions[ind].data.TYPE=='Transfer'){
                      $scope.transactions[ind].data.currency=$translate.instant('CUR_nanti');
                  } else if ($scope.transactions[ind].data.TYPE=='TransferCredit'){
                      $scope.transactions[ind].data.currency=$translate.instant('CUR_credit_mut');
                  } else if ($scope.transactions[ind].data.TYPE=='TransferFond'){
                      $scope.transactions[ind].data.currency='fond';
                  }
                  
                  if ($scope.transactions[ind].data._TO==$scope.currentWalletAddress){
                      $scope.tot_in +=  Number($scope.transactions[ind].data.AMOUNT);
                  }
                  if ($scope.transactions[ind].data._FROM==$scope.currentWalletAddress){
                      $scope.tot_out+= Number($scope.transactions[ind].data.AMOUNT);
                  }
              }
              
              if (result.length==count){
                  document.getElementById("addTransactions").style.display = 'block';
                  $scope.showNoMore =false;
              } else {
                  $scope.showNoMore = ! $scope.showNone;
              }
              
              if (result.length>0){
                  $scope.showNone = false;
              }
              
              $scope.ready = true;
          })  
      
        

    }
    
    $scope.loadPendingTransactions = function(){
        globalFuncs.notifyApproval();
        globalFuncs.getPendingRequestList($scope.currentWalletAddress,0,1, function(list){
            $scope.pendingRequest=list;
            if ( $scope.pendingRequest.length>0){
                 $scope.request_tab=2;
            }
            globalFuncs.getRejectedRequestList($scope.currentWalletAddress,0,1, function(list){
              $scope.rejectedRequest=list;
              if ( $scope.rejectedRequest.length>0){
                 $scope.request_tab=1;
              }
              globalFuncs.getAcceptedRequestList($scope.currentWalletAddress,0,1, function(list){
                 $scope.acceptedRequest=list;
                 if ( $scope.acceptedRequest.length>0){
                     $scope.request_tab=0;
                 }
              });
           });
        });
        
        globalFuncs.getRequestToApproveList($scope.currentWalletAddress,0,1, function(list){
            $scope.pendingApproval=list;
        });
    }
    
    $scope.contacts = contactservice.loadContacts();
    $scope.index=0;
    $scope.loadTransactions($scope.tra_number,$scope.index*$scope.tra_number + $scope.tra_offset);
    $scope.loadPendingTransactions();
    
    $scope.addTransactions = function(){
        $scope.ready = false;
        $scope.index = $scope.index+1;
        $scope.loadTransactions($scope.tra_number,($scope.index)*$scope.tra_number + $scope.tra_offset);
    }
     $scope.prevTransactions = function(){
        $scope.ready = false;
        $scope.index = $scope.index-1;
        $scope.loadTransactions($scope.tra_number,$scope.index*$scope.tra_number + $scope.tra_offset);
    }
    
    $scope.refreshTrans = function(){

        
        $scope.ready = false;
        $scope.index = 0;
        if (!$scope.requested_tra_number){
            $scope.requested_tra_number=$scope.tra_number;
        }
        if ($scope.requested_tra_number<1){
            $scope.requested_tra_number=1;
        } else if ($scope.requested_tra_number>20){
            $scope.requested_tra_number=20;
        }
        $scope.tra_number = $scope.requested_tra_number;
        $scope.loadTransactions($scope.tra_number,$scope.index*$scope.tra_number + $scope.tra_offset);
        $scope.loadPendingTransactions();
    }
    
    
    $scope.openDetails = function(tid){
        
        $scope.selectedTrans=null;
        
        for (var transId in $scope.transactions){
            if (transId==tid){
                $scope.selectedTrans=$scope.transactions[transId].data;
                break;
            }
        }
        
        if ($scope.selectedTrans){
          $scope.current_trans_memo =  memoService.getMemo($scope.memos, $scope.selectedTrans.HASH);
          $scope.transDetails.open();
        }
    }
    
    $scope.closeDetails = function(){
        $scope.current_trans_memo = document.getElementById('current_trans_memo').value;
        $scope.memos = memoService.setMemo($scope.memos, $scope.selectedTrans.HASH,$scope.current_trans_memo);
         if(!$scope.isApp){
             $scope.blobMemo = memoService.getMemoBlob($scope.memos)
         }
         $scope.transDetails.close(); 
         $scope.ready = false;
         $scope.loadTransactions($scope.tra_number,$scope.index*$scope.tra_number + $scope.tra_offset);
    }
    
    
     $scope.addCtc = function(address){
        $scope.curraddress=address;
        $scope.currName=contactservice.getContactName($scope.contacts,$scope.curraddress);
        
        $scope.addContact.open();
    }
    
    $scope.saveContact = function(){
        $scope.addContact.close();
        
        $scope.ready = false;
        $scope.contacts = contactservice.addEditContact($scope.contacts,$scope.curraddress,$scope.currName);
        $scope.loadTransactions($scope.tra_number,$scope.index*$scope.tra_number + $scope.tra_offset);

        
    }
    
    
    $scope.exportMemos = function(){
        $scope.exportTraModal.open(); 
    }
    
    $scope.start_date =  new Date();
    $scope.end_date =  new Date();
    $scope.ExportTra=function(){
       if ($scope.end_date.getTime()<$scope.start_date.getTime()){
            var swap = $scope.start_date;
            $scope.start_date=$scope.end_date;
            $scope.end_date=swap;
        }
        $scope.start_date=new Date($scope.start_date.getFullYear(), $scope.start_date.getMonth(),  $scope.start_date.getDate(), 0, 0, 0, 0);
        $scope.end_date=new Date($scope.end_date.getFullYear(), $scope.end_date.getMonth(),  $scope.end_date.getDate(), 23, 59, 59, 0);
        var d_start = $scope.start_date.getTime()/1000;
        var d_end = $scope.end_date.getTime()/1000;
        
       
        
        ajaxReq.getExportTransList($scope.currentWalletAddress,d_start,d_end, function(result){
            var trans=[];
            for (var ind = 0; ind < result.length; ++ind) {
                  trans[ind]={'id': (ind), 'data':JSON.parse(result[ind])};
                  trans[ind].data.to_name = contactservice.getContactName($scope.contacts, trans[ind].data._TO);
                  trans[ind].data.from_name = contactservice.getContactName($scope.contacts, trans[ind].data._FROM);
                  trans[ind].data.memo = memoService.getMemo($scope.memos,trans[ind].data.HASH);
                  trans[ind].data.currency='';
                  if (trans[ind].data.TYPE=='Transfer'){
                      trans[ind].data.currency=$translate.instant('CUR_nanti');
                  } else if (trans[ind].data.TYPE=='TransferCredit'){
                      trans[ind].data.currency=$translate.instant('CUR_credit_mut');
                  } 
            }
            
            var cvs='"'+$translate.instant("CVS_COL_id").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_date").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_from").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_to").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_amount").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_amount_send").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_tax").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_curr").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_memo").replace(/[\n\r]+/g, '')+'","'
                       +$translate.instant("CVS_COL_tr_id").replace(/[\n\r]+/g, '')+'"\n';
                       
           for (var index = 0; index < trans.length; ++index){
               var tra=trans[index].data;
               cvs=cvs+'"'+trans[index].id+'",';
               var date = new Date(tra.TIME*1000);
               var str_date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ (date.getDate())+ ' '+date.getHours()+ ':'+date.getMinutes();
               cvs=cvs+'"'+str_date+'",';
               
               var from = tra._FROM;
               if (tra.from_name!=''){
                  from = from + ' ('+tra.from_name+')';
               }
               cvs=cvs+'"'+from+'",';
               var to = tra._TO;
               if (tra.to_name!=''){
                  to = to + ' ('+tra.to_name+')';
               }
               cvs=cvs+'"'+to+'",';
               if ($scope.currentWalletAddress==tra._TO){
                   cvs=cvs+tra.AMOUNT/100.+',,'; 
               } else {
                   cvs=cvs+','+tra.AMOUNT/100.+',';
               } 
               cvs=cvs+'"'+tra.TAX/100.+'",';
               cvs=cvs+'"'+tra.currency.replace(/[\n\r]+/g, '')+'",';
               cvs=cvs+'"'+tra.memo.replace('"', '""')+'",';
               cvs=cvs+'"'+tra.HASH+'"\n';
           }
             
           
           var name= "Transactions_"+$scope.start_date.getFullYear()+'-'+($scope.start_date.getMonth()+1)+'-'+ ($scope.start_date.getDate())+"_"+$scope.end_date.getFullYear()+'-'+($scope.end_date.getMonth()+1)+'-'+ ($scope.end_date.getDate())+".csv";
           
            var charCode, byteArray = [];
               // LE BOM
               byteArray.push(255, 254);
               for (var i = 0; i < cvs.length; ++i) {

                 charCode = cvs.charCodeAt(i);

                 // LE Bytes
                 byteArray.push(charCode & 0xff);
                 byteArray.push(charCode / 256 >>> 0);
              }
              var blob = new Blob([new Uint8Array(byteArray)], {type:'text/plain;charset=UTF-16LE;'});
           
           
           
           if ($scope.isApp){
               globalFuncs.dowloadCsvFileWithName(name, blob);
           } else {
               
              
              var encodedUri = URL.createObjectURL(blob);
               var link = document.createElement("a");
               link.setAttribute("href", encodedUri);
               link.setAttribute("download", name);
               document.body.appendChild(link); // Required for FF
               link.click();
   
           }
           
           $scope.exportTraModal.close();
            
        });
    }
  
    

    
    
    ////////////////////////////////////////////////////////////////
      $scope.handlePendingRequest= function(){
       
       $scope.req_index=0;
       $scope.req_number=4;
       $scope.req_offset=0;
       
       $scope.app_index=0;
       $scope.app_number=4;
       $scope.app_offset=0;
       
       $scope.rej_index=0;
       $scope.rej_number=4;
       $scope.rej_offset=0;
       
       $scope.ready = false;
       $scope.loadPendingRequests($scope.req_number,$scope.req_index*$scope.req_number + $scope.req_offset);
       $scope.ready = false;
       $scope.loadApprovedRequests($scope.app_number,$scope.app_index*$scope.app_number + $scope.app_offset);
       $scope.ready = false;
       $scope.loadRejectedRequests($scope.rej_number,$scope.rej_index*$scope.rej_number + $scope.rej_offset);
        
       document.getElementById('pending_tab').style.display="inline-block"; 
       setTimeout(function () {
        document.getElementById('pending_tab').style.top="62px";
       }, 200);
       
    }
    
    $scope.nextPending = function(){
       $scope.ready = false;
       $scope.req_index = $scope.req_index+1;
       $scope.loadPendingRequests($scope.req_number,$scope.req_index*$scope.req_number + $scope.req_offset);
    }
    
    $scope.prevPending = function(){
       $scope.ready = false;
       $scope.req_index = $scope.req_index-1;
       $scope.loadPendingRequests($scope.req_number,$scope.req_index*$scope.req_number + $scope.req_offset);
    }
    
    $scope.nextRejected = function(){
       $scope.ready = false;
       $scope.rej_index = $scope.rej_index+1;
       $scope.loadRejectedRequests($scope.rej_number,$scope.rej_index*$scope.rej_number + $scope.rej_offset);
    }
    
    $scope.prevRejected = function(){
       $scope.ready = false;
       $scope.rej_index = $scope.rej_index-1;
       $scope.loadRejectedRequests($scope.rej_number,$scope.rej_index*$scope.rej_number + $scope.rej_offset);
    }
    
    $scope.nextAccepted = function(){
       $scope.ready = false;
       $scope.app_index = $scope.app_index+1;
       $scope.loadApprovedRequests($scope.app_number,$scope.app_index*$scope.app_number + $scope.app_offset);
    }
    
    $scope.prevAccepted = function(){
       $scope.ready = false;
       $scope.app_index = $scope.app_index-1;
       $scope.loadApprovedRequests($scope.app_number,$scope.app_index*$scope.app_number + $scope.app_offset);
    }
    
    $scope.refreshPending = function(){
       $scope.ready = false;
       $scope.req_index = 0;
       $scope.app_index = 0;
       $scope.rej_index = 0;
       $scope.loadPendingRequests($scope.req_number,$scope.req_index*$scope.req_number + $scope.req_offset);
       $scope.ready = false;
       $scope.loadApprovedRequests($scope.app_number,$scope.app_index*$scope.app_number + $scope.app_offset);
       $scope.ready = false;
       $scope.loadRejectedRequests($scope.rej_number,$scope.rej_index*$scope.rej_number + $scope.rej_offset);
       
       setTimeout(function(){  
           if ( $scope.pendingRequest.length>0){
              $scope.request_tab=2;
           }
           if ( $scope.rejectedRequest.length>0){
              $scope.request_tab=1;
           }
           if ( $scope.acceptedRequest.length>0){
              $scope.request_tab=0;
           }
       }, 200);
      
    }
    
      
    $scope.loadPendingRequests= function(count,offset){

         $scope.noMorePending = true;
         if (offset>0){
              document.getElementById("prevPending").style.display = 'block';
       
          } else {
               document.getElementById("prevPending").style.display = 'none';
          
          }
          
          document.getElementById("nextPending").style.display = 'none';
        
          
         globalFuncs.getPendingRequestList($scope.wallet.getAddressString(),offset,offset+count-1 ,
                                     function(list){
                                         $scope.pendingRequest = list;
                                         $scope.noMorePending = $scope.pendingRequest.length<count;
                                         
                                         if (!$scope.noMorePending){
                                              document.getElementById("nextPending").style.display = 'block';
                                         }
                                         
                                       
                                         for(var ind =0;ind<$scope.pendingRequest.length;ind++){
                                            $scope.pendingRequest[ind].name =  contactservice.getContactName($scope.contacts, $scope.pendingRequest[ind].address); 
                                         }
                                          // $scope.$apply();
                                         $scope.transPendingStatus='';
                                         $scope.ready = true;
                                     });
        
    }
    
    
      $scope.loadRejectedRequests= function(count,offset){

         $scope.noMoreRejected = true;
         if (offset>0){
              document.getElementById("prevRejected").style.display = 'block';
       
          } else {
               document.getElementById("prevRejected").style.display = 'none';
          
          }
          
          document.getElementById("nextRejected").style.display = 'none';
        
          
         globalFuncs.getRejectedRequestList($scope.wallet.getAddressString(),offset,offset+count-1 ,
                                     function(list){
                                         $scope.rejectedRequest = list;
                                         $scope.noMoreRejected = $scope.rejectedRequest.length<count;
                                         
                                         if (!$scope.noMoreRejected){
                                              document.getElementById("nextRejected").style.display = 'block';
                                         }
                                         
                                       
                                         for(var ind =0;ind<$scope.rejectedRequest.length;ind++){
                                            $scope.rejectedRequest[ind].name =  contactservice.getContactName($scope.contacts, $scope.rejectedRequest[ind].address); 
                                         }
                                          // $scope.$apply();
                                         $scope.transPendingStatus='';
                                         $scope.ready = true;
                                     });
        
    }
    
     $scope.loadApprovedRequests= function(count,offset){

         $scope.noMoreAccepted = true;
         if (offset>0){
              document.getElementById("prevAccepted").style.display = 'block';
       
          } else {
               document.getElementById("prevAccepted").style.display = 'none';
          
          }
          
          document.getElementById("nextAccepted").style.display = 'none';
        
          
         globalFuncs.getAcceptedRequestList($scope.wallet.getAddressString(),offset,offset+count-1 ,
                                     function(list){
                                         $scope.acceptedRequest = list;
                                         $scope.noMoreAccepted = $scope.acceptedRequest.length<count;
                                         
                                         if (!$scope.noMoreAccepted){
                                              document.getElementById("nextAccepted").style.display = 'block';
                                         }
                                         
                                       
                                         for(var ind =0;ind<$scope.acceptedRequest.length;ind++){
                                            $scope.acceptedRequest[ind].name =  contactservice.getContactName($scope.contacts, $scope.acceptedRequest[ind].address); 
                                         }
                                          // $scope.$apply();
                                         $scope.transPendingStatus='';
                                         $scope.ready = true;
                                     });
        
    }
    
    
    $scope.dissmissRejected =function(address){
        globalFuncs.DissmissRejectedInfo($scope.wallet,address, function(res){
             if (res.isError){
                    $scope.transPendingStatus=$sce.trustAsHtml(globalFuncs.getDangerText(res.error));
             } else {
                $scope.transPendingStatus=$sce.trustAsHtml($translate.instant("TRA_Accepted_dissmissed"));
               // $scope.conf_dissModal.open();
                
                $scope.trans_message = $translate.instant("TRA_Accepted_dissmissed") + " "+ $translate.instant("GP_Wait_tran");
                $scope.waitTransaction(res.data);
            }
        });
    }
    
    $scope.dissmissAccepted =function(address){
        globalFuncs.DissmissAcceptedInfo($scope.wallet,address, function(res){
              if (res.isError){
                    $scope.transPendingStatus=$sce.trustAsHtml(globalFuncs.getDangerText(res.error));
             } else {
                $scope.transPendingStatus=$sce.trustAsHtml($translate.instant("TRA_Accepted_dissmissed"));
                $scope.trans_message = $translate.instant("TRA_Accepted_dissmissed") + " "+ $translate.instant("GP_Wait_tran");
                //$scope.conf_dissModal.open();
                $scope.waitTransaction(res.data);
            }
        });
    }
    
    
    
    
    $scope.closePending = function(){
       
        document.getElementById('pending_tab').style.top="100%";
         setTimeout(function () {
              document.getElementById('pending_tab').style.display="none"; 
              $scope.loadPendingTransactions();
         }, 700);
    }
    
    $scope.pendingHelp = function(){
        $scope.pendingRequestHelpModal.open();
      
    }
    ////////////////////////////////////////////////////////////////
      $scope.handlePendingApproval = function(){
       $scope.transApprovalStatus='';
       $scope.app_index=0;
       $scope.app_number=4;
       $scope.app_offset=0;
       
       $scope.ready = false;
       $scope.loadPendingApprovals($scope.app_number,$scope.app_index*$scope.app_number + $scope.app_offset);
        
       document.getElementById('approval_tab').style.display="inline-block"; 
       setTimeout(function () {
        document.getElementById('approval_tab').style.top="62px";
       }, 200);
       
    }
    
    $scope.nextApproval = function(){
        $scope.ready = false;
        $scope.app_index = $scope.app_index+1;
       $scope.loadPendingApprovals($scope.app_number,$scope.app_index*$scope.app_number + $scope.app_offset);
    }
    
    $scope.prevApproval = function(){
        $scope.ready = false;
        $scope.app_index = $scope.app_index-1;
       $scope.loadPendingApprovals($scope.app_number,$scope.app_index*$scope.app_number + $scope.app_offset);
    }
    
    $scope.refreshApproval = function(){
        $scope.ready = false;
        $scope.app_index = 0;
       
        $scope.loadPendingApprovals($scope.app_number,$scope.app_index*$scope.app_number + $scope.app_offset);
    }
    
      
    $scope.loadPendingApprovals= function(count,offset){

         $scope.noMoreApproval = true;
         if (offset>0){
              document.getElementById("prevApproval").style.display = 'block';
       
          } else {
               document.getElementById("prevApproval").style.display = 'none';
          
          }
          
          document.getElementById("nextApproval").style.display = 'none';
        
          
         globalFuncs.getRequestToApproveList($scope.wallet.getAddressString(),offset,offset+count-1 ,
                                     function(list){
                                         $scope.pendingApproval = list;
                                         $scope.noMoreApproval = $scope.pendingApproval.length<count;
                                         
                                         if (!$scope.noMoreApproval){
                                              document.getElementById("nextApproval").style.display = 'block';
                                         }
                                         
                                       
                                         for(var ind =0;ind<$scope.pendingApproval.length;ind++){
                                            $scope.pendingApproval[ind].name =  contactservice.getContactName($scope.contacts, $scope.pendingApproval[ind].address); 
                                         }
                                          // $scope.$apply();
                                         $scope.transApprovalStatus='';
                                         $scope.ready = true;
                                     });
        
    }
    
    
    
    
    $scope.closeApproval = function(){
       
        document.getElementById('approval_tab').style.top="100%";
         setTimeout(function () {
              document.getElementById('approval_tab').style.display="none"; 
              $scope.loadPendingTransactions();
         }, 700);
    }
    
    $scope.approvalHelp = function(){
        $scope.pendingApprovalHelpModal.open();
      
    }
    
    $scope.payRequest = function(request){
       $scope.ready = false;
       globalFuncs.getAmmount(
           globalFuncs.slockitElBlance,
           $scope.wallet.getAddressString(), 
           function(balanceEL){
               globalFuncs.getAmmount(
                   globalFuncs.slockitCmLimitm,
                   $scope.wallet.getAddressString(), 
                   function(limitCMm){
                     globalFuncs.getAmmount(
                       globalFuncs.slockitCmBlance,
                       $scope.wallet.getAddressString(), 
                       function(balanceCM){
                           $scope.trPass=walletService.getPass();
                           $scope.tr_err_message='';
                           $scope.trStatus='';
                           $scope.ready = true;
                           $scope.transaction_amount =  request.amount;
                           $scope.transaction_to = request.address;
                           $scope.selectedName = request.name;
                           $scope.typeTrans='no';
                           var cur_tran_type = globalFuncs.getTransCurrency(balanceEL, balanceCM, limitCMm, request.amount);
                           if (cur_tran_type=='cm'){
                                $scope.typeTrans=$translate.instant('CUR_credit_mut');
                           } else if (cur_tran_type=='nant'){
                                $scope.typeTrans=$translate.instant('CUR_nanti');
                           } else {
                                $scope.tr_err_message=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant('TRAN_NotPossible'))); 
                           }
                           
                           $scope.sendTransactionModal.open();
                       });
            });
        });   
       
            
    }
    
    $scope.sendTx = function(){
      if ($scope.trPass==walletService.password){
        walletService.setUsed();
        $scope.sendTransactionModal.close();
        $scope.ready = false; 
        if ($scope.typeTrans==$translate.instant('CUR_credit_mut')){
            globalFuncs.PayRequestCM($scope.wallet, $scope.transaction_to ,  Math.round($scope.transaction_amount*100),  function(res){
                  $scope.ready = true;
                   if (res.isError){
                       $scope.tr_err_message=$sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                       $scope.sendTransactionModal.open();
                   } else {
                       $scope.tr_err_message=$translate.instant("TRAN_Done");
                       $scope.transApprovalStatus=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("TRA_Request_Payed")));
                       $scope.trans_message = $translate.instant("TRA_Request_Payed") + " "+ $translate.instant("GP_Wait_tran");
                       $scope.waitTransaction(res.data);
                       $scope.openConf();
                   }
            });
        } else if ($scope.typeTrans==$translate.instant('CUR_nanti')){
            globalFuncs.PayRequestNant($scope.wallet, $scope.transaction_to ,  Math.round($scope.transaction_amount*100),  function(res){
                  $scope.ready = true;
                   if (res.isError){
                       $scope.tr_err_message=$sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                       $scope.sendTransactionModal.open();
                   } else {
                       $scope.tr_err_message=$translate.instant("TRAN_Done");
                       $scope.transApprovalStatus=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("TRA_Request_Payed")));
                       $scope.trans_message = $translate.instant("TRA_Request_Payed") + " "+ $translate.instant("GP_Wait_tran");
                       $scope.waitTransaction(res.data);
                       $scope.openConf();
                   }
            });
        } 
      } else {
          $scope.trStatus=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("TRAN_WrongPass")));
      }
    }
    

    
    
    $scope.rejectRequest = function(request){
         $scope.trPass=walletService.getPass();
         $scope.trRejectStatus='';
         $scope.err_reject_message='';
         $scope.typeTrans='no';
         $scope.transaction_amount = request.amount;
         $scope.transaction_to = request.address;
         $scope.selectedName = request.name;
         $scope.rejectTransactionModal.open();
    }
    
    $scope.rejectTx = function(){
       if ($scope.trPass==walletService.password){
            walletService.setUsed();
            $scope.rejectTransactionModal.close();
            $scope.ready = false; 
            globalFuncs.RejectRequest($scope.wallet, $scope.transaction_to , function(res){
                 $scope.ready = true;
                 if (res.isError){
                    $scope.err_reject_message=$sce.trustAsHtml(globalFuncs.getDangerText(res.error));
                    $scope.rejectTransactionModal.open();
                 } else {
                    $scope.waitTransaction(res.data);
                    $scope.err_reject_message=$translate.instant("TRAN_Done");
                    $scope.transApprovalStatus=$sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant("TRA_Request_Rejected")));
                   
                    $scope.trans_message = $translate.instant("TRA_Request_Rejected") + " "+ $translate.instant("GP_Wait_tran");
                    $scope.typeTrans='no';
                    //$scope.openConf();
                 }
            });
       } else {
          $scope.trRejectStatus=$sce.trustAsHtml(globalFuncs.getDangerText($translate.instant("TRAN_WrongPass")));
      }
    }
   
    $scope.openConf = function(){
         $scope.conf_requestModal.open(); 
    }
    
  $scope.refresh = function(){
       $scope.refreshApproval();
       $scope.refreshPending();
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
module.exports = transactionsCtrl;


