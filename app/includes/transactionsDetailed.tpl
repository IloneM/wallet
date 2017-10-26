    <!-- Transactions-->
    <div class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.transactions.id">
      
      
       
       <div ng-controller='transactionsCtrl'>
         <div class="row grp"> 
           <div class="col-md-12 ">
             <div class="row "> 
               <div class="col-md-4 col-xs-4">
                 <label translate="TRA_Transactions" >Vos transactions :</label>
               </div>
                <div class="col-md-4 col-xs-4">
                  <span translate="TRA_handle_memo"></span>
       
                  <button type="button" class="btn btn-primary bellowmargin"  ng-click="exportMemos()" translate="CTC_export_mem" >Export </button>
                  

                   
             

                  
                  
                  
               </div>
               <div class="col-md-4 col-xs-4">
                  
                 
                   <span translate="TRA_Number"></span>
                  <input type="number" rstep="1" min="1" max="20" ng-model="requested_tra_number"></input> 
                  <button type="button" class="btn btn-primary bellowmargin"  ng-click="refreshTrans()" translate="TRA_Refresh">Refresh </button>
               
               </div>
             </div>
             <div class="row "> 
               <div class="col-md-12 ">
                  <table width="100%">
                    <tr class="tr_trans">
                     <td>
                        <span translate="TRA_Date"></span>
                     </td>
                     <td>
                        <span translate="TRA_TranId"></span>
                     </td>
                     <td>
                        <span translate="TRA_Memo"></span>
                     </td>
                     <td colspan="2">
                        <span translate="TRA_Part"></span>
                     </td>
                     <td style="text-align: right;">
                        <span  translate="TRA_Got"></span>
                     </td>
                     <td style="text-align: right;">
                        <span  translate="TRA_Paid"></span>
                     </td>
                      <td>
                     </td>
	               </tr>
	               
	               <tr ng-show="showNone" class="tr_trans">
                     <td colspan="8">
                        <p translate="TRA_NoTrans" >Aucunes</p>
                     </td>
	               </tr>
	               
	                <tr  ng-repeat="tran in transactions track by $index" class="tr_trans">
	                    <td>
	                         {{tran.data.TIME*1000 | date : 'yyyy-MM-dd HH:mm' }}
	                    </td>
	                    <td> 
	                       <a ng-click="openDetails(tran.id)" style="color:black;">
                           <textarea cols="15" rows="5" class="adrtxtSml" readonly="readonly">{{tran.data.HASH }} </textarea>
                           </a>
                       </td>
                       
                       <td >
                           <a ng-click="openDetails(tran.id)" style="color:black;">
	                          <div style="max-height:5em; max-width:200px;overflow:hidden;" >{{tran.data.memo }} </div> 
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
                      
                       <td   style="text-align: right;">
                       <span  ng-show="tran.data._TO==currentWalletAddress">{{ tran.data.AMOUNT/100. | number : 2}}</span>
                       </td>
                        <td   style="text-align: right;"> 
                        <span  class="paid" ng-show="tran.data._FROM==currentWalletAddress">{{ tran.data.AMOUNT/100. | number : 2}}</span>
                       </td>
                       <td   > 
                        <span >{{ tran.data.currency}}</span>
                       </td>
	               </tr>
	               <tr class="tr_trans">
                     <td colspan="4">
                       
                     </td>
                     <td >
                       <span translate="TRA_tot_column"></span>
                     </td>
                     <td style="text-align: right;">
                       {{ tot_in/100. | number : 2}}
                     </td>
                     <td class="paid" style="text-align: right;" >
                       {{ tot_out/100. | number : 2}}
                     </td>
                      <td >
                     </td>
	               </tr>
	               <tr ng-show="showNoMore" class="tr_trans">
                     <td colspan="8">
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
                            <p><span translate="TRA_details_amount"></span> {{ selectedTrans.AMOUNT/100. | number : 2}} {{selectedTrans.currency}}</p>
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
        
        
 
         <div class="modal fade" id="approval_help_pop" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel" ></div>  
          <div class="modal fade" id="pending_help_pop" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel" ></div>
          <div class="modal fade" id="acceptRequestPay" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel" ></div>
          <div class="modal fade" id="reject_Request" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel" ></div>
          <div class="modal fade" id="conf_request" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel" ></div>
          <div class="modal fade" id="conf_diss" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel" ></div>
    

         <div class="glassPane" ng-hide="ready"> </div>
         <div class="waitingMsg" ng-hide="ready">{{"GP_Wait" | translate}} <button type="button" class="btn btn-primary bellowmargin"  onclick="location.reload();" translate="TRA_Refresh">Refresh </button></div>
       </div>
 
   </div>
