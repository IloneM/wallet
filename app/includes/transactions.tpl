    <!-- Transactions-->
    <div class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.transactions.id">
      
        <div>
            <wallet-decrypt-drtv></wallet-decrypt-drtv>
        </div>
       
       <div ng-show="wallet!=null" ng-controller='transactionsCtrl'>
       
        <blocked-account-drtv> </blocked-account-drtv>
        <section class="row" ng-show="pendingApproval.length>0 || pendingRequest.length>0 || acceptedRequest.length>0 || rejectedRequest.length>0 ">  
          <div class="col-md-12 ">
	       <div class="row grp"> 
	          <div  class="col-md-12">  
	            <label translate="TRAN_PAY_ASKED"></label>
	          </div>
	          <div class="col-md-12 ">
	          <div class="row">
	            <div  class="col-md-6 col-xs-6">
           <a type="button" class="btn btn-info btn-block" translate="TRA_ToApprove"   ng-show="pendingApproval.length>0"  ng-click="handlePendingApproval()">A traiter </a>
          </div>
                <div  class="col-md-6 col-xs-6">
               <a type="button" class="btn btn-info btn-block" translate="TRA_PendingRequest"  ng-show="pendingRequest.length>0 || acceptedRequest.length>0 || rejectedRequest.length>0 "     ng-click="handlePendingRequest()" >Mes demandes</a>
 
                </div>
              </div>
              </div>
              
              
           </div>
	      </div>    
       </section>  
                
       

         <div class="row grp"> 
           <div class="col-md-12 ">
             <div class="row "> 
               <div class="col-md-5 col-xs-5">
                 <label translate="TRA_Transactions" >Vos transactions :</label>
               </div>
                <div class="col-md-7 col-xs-7">
                  <button type="button" id="rafraichir" class="btn btn-primary bellowmargin"  ng-click="refreshTrans()" translate="TRA_Refresh">Refresh </button>
                  
                  <button type="button" id="exporter" class="btn btn-primary bellowmargin"  ng-click="exportMemos()" translate="CTC_export_mem" >Export </button>
                  
                  
               </div>
             </div>
             <div class="row "> 
               <div class="col-md-12 ">
                  <table width="100%">
                    <tr ng-show="showNone" class="tr_trans">
                     <td colspan="3">
                        <p translate="TRA_NoTrans" >Aucunes</p>
                     </td>
	               </tr>
	                <tr  ng-repeat="tran in transactions track by $index" class="tr_trans">
	                     <td ng-show="tran.data._FROM==currentWalletAddress">
	                     <a ng-click="openDetails(tran.id)" style="color:black;">
                            <span translate="TRA_Paid" class="paid"></span> {{ tran.data.AMOUNT/100. | number : 2}} {{ 'CUR' | translate }}
	                        <span translate="TRA_InDateOf"></span>   {{tran.data.TIME*1000 | date : 'yyyy-MM-dd HH:mm' }}
	                        <span translate="TRA_To"></span> 
	                      </a>
                         </td>
                         <td ng-show="tran.data._TO==currentWalletAddress">
                         <a ng-click="openDetails(tran.id)" style="color:black;">
	                        <span translate="TRA_Got" class="get"></span> {{ tran.data.AMOUNT/100. | number : 2}} {{ 'CUR' | translate }}
	                        <span translate="TRA_InDateOf"></span>   {{tran.data.TIME*1000 | date : 'yyyy-MM-dd HH:mm' }}
	                        <span translate="TRA_From"></span> 
	                      </a>  
                         </td>
                         <td ng-show="tran.data._FROM==currentWalletAddress" width="100px">
                            <a ng-click="addCtc(tran.data._TO)"> 
                             <div class="identiconWrapper without_text_tr" ng-class="{'with_text_tr': tran.data.to_name!=''}">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{tran.data._TO }}"  watch-var="transactions" ></div>
                             </div>
                             <div style="color:black; max-height:21px; overflow:hidden; text-align:center;">{{tran.data.to_name }}</div>
                             </a>
                         </td>
                         <td ng-show="tran.data._TO==currentWalletAddress" width="100px">
                          <a ng-click="addCtc(tran.data._FROM)"> 
	                        <div class="identiconWrapper without_text_tr" ng-class="{'with_text_tr': tran.data.from_name!=''}" >
                                 <div id="addressIdenticon" title="Address Indenticon"  img="1" blockie-address="{{tran.data._FROM }}"  watch-var="transactions"></div>
                             </div>
                             <div style="color:black; max-height:21px; overflow:hidden; text-align:center;">{{tran.data.from_name }}</div>
                          </a>
                         </td>
                          <td ng-show="tran.data._FROM==currentWalletAddress" class="tdPlus500">
                            <textarea cols="9" rows="5" class="adrtxtSml" readonly="readonly">{{tran.data._TO }} </textarea>
                         </td>
                         <td ng-show="tran.data._TO==currentWalletAddress" class="tdPlus500">
	                        <textarea cols="9" rows="5" class="adrtxtSml" readonly="readonly">{{tran.data._FROM }} </textarea>
                       </td>
                        <td >
                           <a ng-click="openDetails(tran.id)" style="color:black;">
	                          <div style="max-height:5em; max-width:200px;overflow:hidden;" >{{tran.data.memo }} </div> 
	                       </a>
                       </td>
	               </tr>
	               <tr ng-show="showNoMore" class="tr_trans">
                     <td colspan="3">
                        <p translate="TRA_NoMore" >Pas Plus</p>
                     </td>
	               </tr>
                 </table>
               </div>
             </div>
             <div class="row "> 
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="prevTransactions" ng-click="prevTransactions()"  translate="TRA_prev" > Ajouter </a>
               </div>
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="addTransactions" ng-click="addTransactions()"  translate="TRA_add" > Ajouter </a>
               </div>
             </div>
           </div>
         </div>
         
         <!-- add Modal -->
         <div class="modal fade" id="addContact" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                          <p>
                              <label translate="CTC_confirmAdd" ng-show="indctc==-1">Add name</label>
                              <label translate="CTC_AlreadyAdded" ng-hide="indctc==-1">already added</label>
                           </p>
                                <div class="identiconWrapper" style="max-width:60px;">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{curraddress }}"  watch-var="curraddress" ></div>
                             </div>
                              <p translate="CTC_withName"  ng-show="indctc==-1">Add name</p>
                              <p translate="CTC_updateName" ng-hide="indctc==-1">update name</p>
                              <input class="form-control" type="text" ng-model="currName" />
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="CTC_addCancel">Annuler </button>
                          <button type="button" class="btn btn-primary" ng-click="saveContact()" translate="CTC_addConfirm" ng-show="indctc==-1">Add</button>
                          <button type="button" class="btn btn-primary" ng-click="saveContact()" translate="CTC_updateConfirm" ng-hide="indctc==-1">Update</button>
                      </div>
                  </div>
              </div>
        </div>
        
         <div class="modal fade" id="transDetails" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          <h4 align="center">
                            <label translate="TRA_details_title">Transaction details</label><br/>
                            <textarea cols="21" rows="3" class="adrtxt" readonly="readonly" ng-model="selectedTrans.HASH" > </textarea>
                            <p><span translate="TRA_details_block">Transaction block</span> {{selectedTrans.BLOCK}}</p>
                            <p><span translate="TRA_details_date">Transaction block</span> {{selectedTrans.TIME*1000 | date : 'yyyy-MM-dd HH:mm' }}</p>
                            <p><span translate="TRA_details_amount"></span> {{ selectedTrans.AMOUNT/100. | number : 2}}  {{selectedTrans.currency}}</p>
                            <p ng-show="selectedTrans._FROM==currentWalletAddress"> 
                                 <span translate="TRA_Paid" class="paid"></span> &nbsp;
                                 <span translate="TRA_To"></span> {{selectedTrans.to_name }}
                                 <span> 
                                     <div ng-show="selectedTrans._FROM==currentWalletAddress" class="identiconWrapper without_text_tr">
                                        <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{selectedTrans._TO }}"  watch-var="selectedTrans" ></div>
                                     </div>
                                 </span>
                                 <textarea cols="9" rows="5" class="adrtxtSml" readonly="readonly" ng-show="selectedTrans._FROM==currentWalletAddress" >{{selectedTrans._TO }} </textarea>
                                 
                            </p>
                            
                            <p ng-show="selectedTrans._TO==currentWalletAddress">
                                  <span translate="TRA_Got" class="get"></span>&nbsp;
                                  <span translate="TRA_From"></span> {{selectedTrans.from_name }}
                                  <span> 
                                      <div  ng-show="selectedTrans._TO==currentWalletAddress" class="identiconWrapper without_text_tr"  >
                                        <div id="addressIdenticon" title="Address Indenticon"  img="1" blockie-address="{{selectedTrans._FROM }}"  watch-var="selectedTrans"></div>
                                      </div>
                                  </span>
                                  <textarea cols="9" rows="5" class="adrtxtSml" readonly="readonly" ng-show="selectedTrans._TO==currentWalletAddress">{{selectedTrans._FROM }} </textarea>
                                  
                            </p>
                            <p translate="TRA_memo">Memo</p>
                            <textarea cols="21" rows="4" id="current_trans_memo" ng-model="current_trans_memo" ></textarea>
                            
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-primary" ng-click="closeDetails()" translate="TRA_Close">Fermer </button>
                         
                      </div>
                  </div>
              </div>
        </div>
        
         <!-- export Modal -->
         <div class="modal fade" id="exportTraPop" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                              <label translate="TRA_Export_title">Import</label>
                             
                              <p translate="TRA_Export_date"></p>
                              
                              <p >   <input type="date" ng-model="start_date"> <span translate="TRA_Export_date_to"></span>  <input type="date" ng-model="end_date"></p>
                               
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="CTC_editNameCancel">Annuler </button>
                          <button type="button" class="btn btn-primary"  ng-click="ExportTra()" translate="CTC_Export">Sauver</button>
                      </div>
                  </div>
              </div>
        </div>
        
            
    
         
         
         
         
       
       <div class="over_tab" id="approval_tab"> 
          <div class="col-md-12 ">
         <section class="row" >  
          <div class="col-md-12 ">
	       <div class="row grp"> 
	         <div  class="col-md-12">  
	            <label translate="TRA_Approval_Tab_Title"></label>
	            <button type="button" class="btn btn-primary" ng-click="closeApproval()" style="float:right;" translate="TRA_CloseTab">Close</button>
	           <!--  <button type="button" class="btn btn-primary" style="float:right; margin-right:10px;"   ng-click="refreshApproval()" translate="TRA_Refresh">Refresh </button>-->
	   
	          </div>
	          <div  class="col-md-12">  
	          
	          <br/> 
	           <div class="row "> 
	            <div  class="col-md-12"> 
	             <div ng-bind-html="transApprovalStatus" ></div>
	            </div>
               <div class="col-md-5 col-xs-5">
                 &nbsp;
               </div>
                <div class="col-md-7 col-xs-7">
                  <button type="button" class="btn btn-primary bellowmargin" ng-click="approvalHelp()" translate="DELEG_help">?</button>
               </div>
               </div>
	              
	           <div class="row "> 
               <div class="col-md-12 ">
                  <table width="100%" >
                  
	                <tr  ng-repeat="pa in pendingApproval track by $index" class="tr_trans">
	                  
                         <td  width="100px">
                             <div class="identiconWrapper without_text_tr" ng-class="{'with_text_tr': pa.name!=''}">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{pa.address}}"  watch-var="pendingApproval" ></div>
                             </div>
                             <div style="color:black; max-height:21px; overflow:hidden; text-align:center;">{{pa.name}}</div>
                         </td>
                         
                        <td >
                            <textarea cols="9" rows="5" class="adrtxtSml" readonly="readonly" style="overflow:hidden;">{{pa.address}}</textarea>
                        </td>
                       
                        <td >
                            {{pa.amount}} {{ 'CUR' | translate }}
                        </td>
                       <td >
                              <button type="button" class="btn btn-primary" translate="TRA_pay" style="margin: 4px;" ng-click="payRequest(pa)">Payer </button>
	                          <button type="button" class="btn btn-primary" translate="TRA_reject" style="margin: 4px;" ng-click="rejectRequest(pa)">refuser </button>
                        </td>
                       
                        
	               </tr>
	                 <tr ng-show="noMoreApproval" class="tr_trans">
                     <td colspan="4">
                        <p translate="TRA_NoMoreApproval" >Pas Plus</p>
                     </td>
	               </tr>
                 </table>
               </div>
             </div>
	             
	         <div class="row "> 
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="prevApproval" ng-click="prevApproval()"  translate="TRA_prev" > Ajouter </a>
               </div>
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="nextApproval" ng-click="nextApproval()"  translate="TRA_next" > Ajouter </a>
               </div>
             </div>     
	             
	             
	             
	             
	          </div>
	        </div>
	      </div>       
        </section> 
	      </div>        
       </div>
       
         
      <!-- Approval Help -->
     <div class="modal fade" id="approval_help_pop" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel" data-backdrop="static" data-keyboard="false">
              <div class="modal-dialog" role="document">
                  <div class="modal-content"> 
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                           <p><label translate="TRA_Approval_Help_title">Delegate:</label></p>
                           <p translate="TRA_Approval_Help_text"></p>
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" translate="DELEG_Close">CLose </button>
                      </div>
                  </div>
              </div>
        </div>  
        
         
         
 <!-- Send Modal -->
         <div class="modal fade" id="acceptRequestPay" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          <h4 align="center">
                              <label translate="TRAN_Confirm_text"  >Vous êtes en train d'envoyer</label> <br/>
                              <!-- todo partial pay --> 
                              <strong id="confirmAmount" class="text-primary"> {{transaction_amount| number : 2}} </strong>
                              <strong id="confirmCurrancy" class="text-primary"> {{ 'CUR' | translate }} </strong><br/>
                              <p ><strong ng-hide="typeTrans=='no'" class="text-primary"> {{typeTrans}}</strong></p><br/>
                              <p translate="TRAN_To" >&agrave;</p>
                              
                              <div class="identiconWrapper" >
                                <div id="addressIdenticon" title="Address Indenticon"  
                                     blockie-address="{{transaction_to}}" watch-var="transaction_to" style="opacity:0.9;"></div>
                              </div>
                              <textarea cols="9" rows="5" class="adrtxt" readonly="readonly" ng-model="transaction_to" > </textarea>
                              <div ng-bind-html="selectedName" style="overflow:hidden;text-align:center;max-height:21px" ></div> 
                              <div  ng-hide="typeTrans=='no'">
                                 <p translate="TRAN_Enter_pass" >Entrez votre mot de passe</p>
                                 <input class="form-control" type="password" placeholder="{{ 'DCRY_Placeholder_psw' | translate }}" ng-model="trPass" style="width:50%;margin-left:25%;"/>
                                 <div ng-bind-html="trStatus" ></div>
                              </div>
                          </h4>
                      </div>
                      <p ng-bind-html="tr_err_message"> </p>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="TRAN_Cancel">Annuler la Payement</button>
                          <button type="button" class="btn btn-primary" ng-click="sendTx()" ng-hide="typeTrans=='no'" translate="TRAN_Confirm">Confirmer le Payement</button>
                      </div>
                  </div>
              </div>
        </div>
      
         <div class="modal fade" id="reject_Request" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          <h4 align="center">
                              <label translate="TRAN_reject_text"  >Vous êtes en train de refuser une damande de payement de</label> <br/>
              
                              <strong  class="text-primary"> {{transaction_amount| number : 2}} </strong>
                              <strong  class="text-primary"> {{ 'CUR' | translate }} </strong><br/>
                              <p translate="TRAN_asked_by" >&agrave;</p>
                              
                               <div class="identiconWrapper" >
                                <div id="addressIdenticon" title="Address Indenticon"  
                                     blockie-address="{{transaction_to}}" watch-var="transaction_to" style="opacity:0.9;"></div>
                              </div>
                              <textarea cols="9" rows="5" class="adrtxt" readonly="readonly" ng-model="transaction_to" > </textarea>
                              <div ng-bind-html="selectedName" style="overflow:hidden;text-align:center;max-height:21px" ></div> 
                              <p translate="TRAN_Enter_pass_reject" >Entrez votre mot de passe</p>
                              <input class="form-control" type="password" placeholder="{{ 'DCRY_Placeholder_psw' | translate }}" ng-model="trPass" style="width:50%;margin-left:25%;"/>
                              <div ng-bind-html="trRejectStatus" ></div>
                          </h4>
                      </div>
                      <p ng-bind-html="err_reject_message"> </p>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="TRAN_Keep">Annuler la refus</button>
                          <button type="button" class="btn btn-primary" ng-click="rejectTx()"  translate="TRAN_Reject">Confirmer le refus</button>
                      </div>
                  </div>
              </div>
        </div>  
      
       <div class="modal fade" id="conf_request"  style="z-index:400;" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          <h4 align="center">
                              <div ng-hide="typeTrans=='no'"><img src="images/Coche.png"  height="30" width="30"></div>
                              <label translate="TRAN_executed_text"  ng-hide="typeTrans=='no'">Vous avez envoyé</label>
                              <label translate="TRAN_rejected_request_text" ng-show="typeTrans=='no'"  >Vous avez refusé</label>
                              <strong class="text-primary"> <br/><span> 
                                    {{transaction_amount| number : 2}} 
                                    <span ng-hide="typeTrans=='no'">{{typeTrans}} </span> 
                                    <span ng-show="typeTrans=='no'" translate="CUR"> </span> 
                                   </span> </strong> 
                              <p translate="TRAN_To" >&agrave;</p>
                              <div class="identiconWrapper">
                                 <div id="addressIdenticon" title="Address Indenticon"  blockie-address="{{transaction_to}}" watch-var="transaction_to" style="opacity:0.9;"></div>
                              </div>
                              <textarea cols="9" rows="5" class="adrtxt" readonly="readonly" ng-model="transaction_to" > </textarea>
                              <div ng-bind-html="selectedName" style="overflow:hidden;text-align:center;max-height:21px" ></div> 
                  
                 
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" translate="TRAN_OK">Fermer</button>
                          
                      </div>
                  </div>
              </div>
        </div>     
         
         
         
         
         
         
           
       <div class="over_tab" id="pending_tab"> 
          <div class="col-md-12 ">
         <section class="row" >  
          <div class="col-md-12 ">
	       <div class="row grp"> 
	         <div  class="col-md-12">  
	            <label translate="TRA_Pending_Tab_Title"></label>
	            <button type="button" class="btn btn-primary" ng-click="closePending()" style="float:right;" translate="TRA_CloseTab">Close</button>
	            <!-- <button type="button" class="btn btn-primary" style="float:right; margin-right:10px;"   ng-click="refreshPending()" translate="TRA_Refresh">Refresh </button> -->
	   
	          </div>
	          <div  class="col-md-12">  
	          
	          <br/> 
	           <div class="row "> 
	            <div  class="col-md-12"> 
	              <div ng-bind-html="transPendingStatus" ></div>
	            </div>
               <div class="col-md-5 col-xs-5">
                 &nbsp;
               </div>
                <div class="col-md-7 col-xs-7">
                  <button type="button" class="btn btn-primary bellowmargin" ng-click="pendingHelp()" translate="DELEG_help">?</button>
               </div>
               </div>
	             
	              
	           <div class="row "> 
	           <div class="col-md-12">
	               <button type="button" class="tab_btn"  ng-click="request_tab=0" ng-class="{tab_sel:request_tab===0}  "  ng-show="acceptedRequest.length>0  "  >Accept&eacute;es</button>
	        
	               <button type="button" class="tab_btn"  ng-click="request_tab=1" ng-class="{tab_sel:request_tab===1} " ng-show=" rejectedRequest.length>0 " >Rejet&eacute;es</button>

	               <button type="button" class="tab_btn"  ng-click="request_tab=2" ng-class="{tab_sel:request_tab===2} " ng-show="pendingRequest.length>0  "  >En attente</button>
	           </div>
               <div class="col-md-12 " ng-show="request_tab==2">
                  <table width="100%" >
                 
	                <tr  ng-repeat="pa in pendingRequest track by $index" class="tr_trans">
	                  
                         <td  width="100px">
                             <div class="identiconWrapper without_text_tr" ng-class="{'with_text_tr': pa.name!=''}">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{pa.address}}"  watch-var="pendingRequest" ></div>
                             </div>
                             <div style="color:black; max-height:21px; overflow:hidden; text-align:center;">{{pa.name}}</div>
                         </td>
                         
                        <td >
                            <textarea cols="9" rows="5" class="adrtxtSml" readonly="readonly" style="overflow:hidden;">{{pa.address}}</textarea>
                        </td>
                       
                        <td >
                            {{pa.amount}} {{ 'CUR' | translate }}
                        </td>
                       <td >
                             
                        </td>
                       
                        
	               </tr>
	                 <tr ng-show="noMorePending" class="tr_trans">
                     <td colspan="4">
                        <p translate="TRA_NoMorePending" >Pas Plus</p>
                     </td>
	               </tr>
                 </table>
               </div>
               
                <div class="col-md-12 " ng-show="request_tab==1">
                  <table width="100%" >
                 
	                <tr  ng-repeat="pa in rejectedRequest track by $index" class="tr_trans">
	                  
                         <td  width="100px">
                             <div class="identiconWrapper without_text_tr" ng-class="{'with_text_tr': pa.name!=''}">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{pa.address}}"  watch-var="rejectedRequest" ></div>
                             </div>
                             <div style="color:black; max-height:21px; overflow:hidden; text-align:center;">{{pa.name}}</div>
                         </td>
                         
                        <td >
                            <textarea cols="9" rows="5" class="adrtxtSml" readonly="readonly" style="overflow:hidden;">{{pa.address}}</textarea>
                        </td>
                       
                        <td >
                            {{pa.amount}} {{ 'CUR' | translate }}
                        </td>
                       <td >
                           <button type="button" class="btn btn-primary bellowmargin" ng-click="dissmissRejected(pa.address)" translate="DELEG_delete">x</button>  
                        </td>
                       
                        
	               </tr>
	                 <tr ng-show="noMoreRejected" class="tr_trans">
                     <td colspan="4">
                        <p translate="TRA_NoMoreRejected" >Pas Plus</p>
                     </td>
	               </tr>
                 </table>
               </div>
               
                <div class="col-md-12 " ng-show="request_tab==0">
                  <table width="100%" >
                 
	                <tr  ng-repeat="pa in acceptedRequest track by $index" class="tr_trans">
	                  
                         <td  width="100px">
                             <div class="identiconWrapper without_text_tr" ng-class="{'with_text_tr': pa.name!=''}">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{pa.address}}"  watch-var="acceptedRequest" ></div>
                             </div>
                             <div style="color:black; max-height:21px; overflow:hidden; text-align:center;">{{pa.name}}</div>
                         </td>
                         
                        <td >
                            <textarea cols="9" rows="5" class="adrtxtSml" readonly="readonly" style="overflow:hidden;">{{pa.address}}</textarea>
                        </td>
                       
                        <td >
                            {{pa.amount}} {{ 'CUR' | translate }}
                        </td>
                       <td >
                           <button type="button" class="btn btn-primary bellowmargin" ng-click="dissmissAccepted(pa.address)" translate="DELEG_delete">x</button>  
                        </td>
                       
                        
	               </tr>
	                 <tr ng-show="noMoreAccepted" class="tr_trans">
                     <td colspan="4">
                        <p translate="TRA_NoMoreAccepted" >Pas Plus</p>
                     </td>
	               </tr>
                 </table>
               </div>
               
             </div>
	             
	             
	         <div class="row " ng-show="request_tab==2"> 
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="prevPending" ng-click="prevPending()"  translate="TRA_prev" > Ajouter </a>
               </div>
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="nextPending" ng-click="nextPending()"  translate="TRA_next" > Ajouter </a>
               </div>
             </div>     
             
             <div class="row " ng-show="request_tab==1"> 
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="prevRejected" ng-click="prevRejected()"  translate="TRA_prev" > Ajouter </a>
               </div>
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="nextRejected" ng-click="nextRejected()"  translate="TRA_next" > Ajouter </a>
               </div>
             </div>     
             
             <div class="row " ng-show="request_tab==0"> 
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="prevAccepted" ng-click="prevAccepted()"  translate="TRA_prev" > Ajouter </a>
               </div>
               <div class="col-md-col-md-6 col-xs-6 ">
                  <a class="btn btn-info btn-block" id="nextAccepted" ng-click="nextAccepted()"  translate="TRA_next" > Ajouter </a>
               </div>
             </div>     
	             
	             
	             
	             
	          </div>
	        </div>
	      </div>       
        </section> 
	      </div>        
       </div>
       
       
       
       
        <!-- confirm dismiss -->
        <div class="modal fade" id="conf_diss"  style="z-index:400;" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          <h4 align="center">
                              
                              <label ng-bind-html="transPendingStatus"</label>
                          
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" translate="TRAN_OK">Fermer</button>
                          
                      </div>
                  </div>
              </div>
        </div>     
       
       
       
       
       
         
      <!-- Pending Help -->
     <div class="modal fade" id="pending_help_pop" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel" data-backdrop="static" data-keyboard="false">
              <div class="modal-dialog" role="document">
                  <div class="modal-content"> 
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                           <p><label translate="TRA_Pending_Help_title">Delegate:</label></p>
                           <p translate="TRA_Pending_Help_text"></p>
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" translate="DELEG_Close">CLose </button>
                      </div>
                  </div>
              </div>
        </div>  
        
        <waiting-drtv></waiting-drtv> 
     </div>
 
   </div>
