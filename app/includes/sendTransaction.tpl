

    <div class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.leman.id">
        <div>
            <wallet-decrypt-drtv></wallet-decrypt-drtv>
        </div>

        <div  ng-show="wallet!=null" ng-controller='lemanCtrl'>
          <blocked-account-drtv> </blocked-account-drtv>
        

        
        
        
        
         <section class="row" >
          <div class="col-md-12 totBal grp" ng-show="showMyBalance">
                 {{token.balance| number : 2}} {{ 'CUR' | translate }}
                 <!-- <button type="button" class="btn btn-primary" style="padding: 2px 10px;" ng-click="refreshSend()" translate="TRA_Refresh">Refresh </button> -->

          </div>
          <div class="col-md-12 totBal grp" ng-show="showDelegLimit">
                 {{ 'DELEG_LimitAvailable' | translate }} {{display_deleg_limit| number : 2}} {{ 'CUR' | translate }}
                   <!-- <button type="button" class="btn btn-primary" style="padding: 2px 10px;" ng-click="refreshDeleg()" translate="TRA_Refresh">Refresh </button>-->

          </div>
         </section>
         
         <section class="row grp" >
          <div class="col-md-12 ">
             <div class="row "> 
               <div class="col-md-6 col-xs-6 ">
                  <label translate="TRAN_Origine" >Votre adresse :</label>
               </div>
               <div class="col-md-6 col-xs-6 ">
                  <label translate="TRAN_Dest" >Destinataire :</label>
               </div>
               <div class="col-md-6 col-xs-6 ">
                   <button type="button" class="btn btn-primary bellowmargin"  ng-click="originePop()" translate="TRAN_choose_origine_btn">Origine Pop </button>
               </div>
               <div class="col-md-6 col-xs-6 " style="height: 40px;">
                   <button type="button" id="ctc_pop_btn" class="btn btn-primary bellowmargin"  ng-click="contactPop()" translate="CTC_pick">ContactPop </button>
                   
                   
                   <div class="pop_pane" ng-click="closeCttPop()" ng-show="showContactPop" >
            
                   <div class="ctt_pop" ng-show="showContactPop">
                   <div class="ctt_cent">
                     <div ng-show="NoCtc" translate="CTC_noContacts"></div>
                     <div  ng-repeat="ct in contacts track by $index" class="ctt_elm">
                        <div>
                            <div  ng-click="pickCtc(ct.address,ct.name)">
                                <div class="identiconWrapper" style="max-width:60px;" >
                                   <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{ct.address }}"  watch-var="contacts" ></div>
                                </div>
                                <div class="ctt_txt">
                                   {{ct.name}}&nbsp;
                                </div>
                            </div>
                        </div>
                     </div>
                   </div>
                   </div>      
                 </div>
               </div>
                <div  class="col-md-12"></div>
               <div  class="col-md-6 col-xs-6">
                  <div class="identiconWrapper">
                    <div id="addressIdenticon" title="Address Indenticon" blockie-address="{{origine_address}}" watch-var="origine_address"></div>
                  </div>
                  <textarea cols="9" rows="5" class="adrtxt" disabled>{{origine_address}} </textarea>
                  <div ng-bind-html="from_name" style="overflow:hidden;text-align:center;max-height:21px"></div>
               </div>
               <div  class="col-md-6 col-xs-6">
                  <div class="identiconWrapper">
                     <div id="addressIdenticon" title="Address Indenticon" ng-click="startScanToAddress()" blockie-address="{{tokenTx.to}}" watch-var="tokenTx.to" style="opacity:0.9;"></div>
                  </div>
                  <textarea id="toField"  cols="9" rows="5" class="adrtxt" placeholder="{{'ID_placeholder' | translate}}" ng-model="tokenTx.to" ng-change="generateTokenTx()"> </textarea>
                  <div ng-bind-html="selectedName" style="overflow:hidden;text-align:center;max-height:21px"></div>
               </div>
             </div>
             <div class="row "> 
               <div class="col-md-12 ">
                   <label translate="TRAN_Amount" >Montant :<br /></label>  
               </div>
             </div>
             <div class="row "> 
               <div class="col-md-12 ">
                   <input class="form-control" type="text" placeholder="0.00" ng-model="tokenTx.value" ng-change="generateTokenTx()"/>
               </div>
             </div>
             <div class="row "> 
               <div class="col-md-12">
                    <div ng-bind-html="validateTxStatus"></div>
               </div>
             </div>
             <div class="row "> 
               <div class=" col-md-12" ng-show="showRaw && tokenTx.to!=origine_address">
                    <a class="btn btn-primary btn-block" ng-click="confirmPop()" ng-hide="is_request_mode" translate="TRAN_Send" >PAYER</a>
                    <a class="btn btn-primary btn-block" ng-click="confirmPop()" ng-show="is_request_mode" translate="TRAN_Request" >REQUEST</a>
               </div>
             </div>
             <div class="row "> 
               <div class=" col-md-12" ng-bind-html="sendTxStatus"></div>
             </div>
          </div>
         </section>
         
         
         
         
         <div class="modal fade" id="chooseOrigine" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
            <div class="modal-dialog" role="document">
               <div class="modal-content">
                  <div class="modal-body">
                     <h4 align="center">
                        <label translate="TRAN_Choose_Origine" ></label><br/>
                        <p translate="TRAN_MyAccount" >My Account</p>
                        <p> 
                           <div> 
                              <div style="display: inline-block; height: 60px; width: 60px; vertical-align: top;"> 
                                 <div class="identiconWrapper" style="max-width:60px;" >
                                    <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{myAddress}}"  
                                        watch-var="myAddress" ng-click="selectOrigineMy()">
                                    </div>
                                 </div>
                              </div>
                              <div style="display: inline-block;vertical-align: top; padding-top: 12px;">
                                 <button type="button" class="btn btn-primary bellowmargin"  ng-click="selectOrigineMy()" 
                                         translate="TRAN_Choose" >Choisir</button> 
                              </div>
                           </div>
                       </p>
                             
                             
                       <p translate="TRAN_MyDelegations" ng-show="hasDelegations" >My Delegations</p>
                       <div ng-show="hasDelegations"> 
                             <div style="display: inline-block; height: 60px; width: 60px; vertical-align: top;"> 
                                <div class="identiconWrapper"  style="max-width:60px;display:inline-block;">
                                   <div id="addressIdenticon" title="Address Indenticon"  ng-click="delegPop()" blockie-address="{{curent_deleg_add}}" 
                                        watch-var="curent_deleg_add" style="opacity:0.9;">
                                   </div>
                                </div>  
                                <div ng-bind-html="curent_deleg_name" 
                                     style="overflow:hidden;text-align:center;max-height:21px;font-size: 15px;font-weight: normal;">Name
                                </div>
                            </div>
                            <div  style="display:inline-block;">
                               <button type="button" class="btn btn-primary bellowmargin"  ng-click="delegPop()" 
                                       translate="DELEG_pick">DelegPopup</button>
                               <div style="text-align:center;max-height:21px;font-size: 15px;font-weight: normal;">
                                  {{'DELEG_Lim' | translate}}{{curent_deleg_limit}}{{'CUR' | translate}}
                               </div>
                            </div>   
                     </div>
                  
                     <p ng-show="hasDelegations ">
                        <button type="button" class="btn btn-primary bellowmargin"  ng-click="selectOrigineDeleg()" 
                                translate="TRAN_Choose">Choisir </button>
                    </p>
                    
                             
                    <label translate="TRAN_AskFrom" >AskFrom</label><br/>
                    <p>
                       <div> 
                          <div style="display: inline-block; height: 60px; width: 60px; vertical-align: top;"> 
                             <div class="identiconWrapper"  style="max-width:60px;display:inline-block;">
                                <div id="addressIdenticon" title="Address Indenticon" ng-click="startScanToAddressOrigine()" 
                                     blockie-address="{{curr_from_add}}" watch-var="curr_from_add" style="opacity:0.9;"> 
                                </div>
                            </div>  
                            <div ng-bind-html="curr_from_name" style="overflow:hidden;text-align:center;max-height:21px;font-size: 15px;font-weight: normal;">Name
                            </div>
                        </div>
                        <div  style="display:inline-block;">
                           <button type="button" class="btn btn-primary bellowmargin"  ng-click="contactPopOrigine()" 
                                   translate="CTC_pick">ContactPop </button>
                           <textarea style="display:block;" cols="22" rows="2" class="adrtxtSml" ng-change="setNameFrom()"
                                    placeholder="{{'ID_placeholder' | translate}}" ng-model="curr_from_add"  ></textarea>
                      
                      </div>   
                  </p>
                  <p>
                     <button type="button" class="btn btn-primary bellowmargin"  ng-click="selectOrigineFrom()" 
                             translate="TRAN_Choose">Choisir </button>
                  </p>
                </h4>
             </div>
             <div class="modal-footer text-center">
                <button type="button" class="btn btn-default" data-dismiss="modal" translate="TRAN_Cancel">Annuler</button>
             </div>
           </div>
        </div>
     </div>
         
         
         
         
     
       <!-- / Send Modal -->
       <!-- Send Modal -->
         <div class="modal fade" id="sendTransaction" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          <h4 align="center">
                              <label translate="TRAN_Confirm_text" ng-hide="is_request_mode" >Vous êtes en train d'envoyer</label> 
                              <label translate="TRAN_Confirm_text_request" ng-show="is_request_mode" >Vous êtes en train de demander</label><br/>
                              <strong id="confirmAmount" class="text-primary"> {{tokenTx.value| number : 2}} </strong>
                              <strong id="confirmCurrancy" class="text-primary"> {{ 'CUR' | translate }} </strong><br/>
                              <p ng-hide="is_request_mode"><strong ng-hide="typeTrans=='no'" class="text-primary"> {{typeTrans}}</strong></p><br/>

                              
                              <div style="width:44%;display:inline-block;vertical-align:top;">
                                     <div class="identiconWrapper" >
                                         <div id="addressIdenticon" title="Address Indenticon"  blockie-address="{{origine_address}}" 
                                                  watch-var="origine_address" style="opacity:0.9;"></div>
                                      </div>
                                      <textarea cols="9" rows="5" class="adrtxt" readonly="readonly" ng-model="origine_address"> </textarea>
                                      <div ng-bind-html="from_name" style="overflow:hidden;text-align:center;max-height:21px"></div><br/>

                              </div>
                              <div style="width:20px;display:inline-block;vertical-align:top; padding-top:50px;"  > <strong  class="text-primary"  style="font-size: xx-large;font-weight: bolder;" >&rArr;</strong></div>
                              
                              <div style="width:44%;display:inline-block;vertical-align:top;">
                                    <div class="identiconWrapper" >
                                    <div id="addressIdenticon" title="Address Indenticon"  blockie-address="{{tokenTx.to}}" 
                                         watch-var="tokenTx.to" style="opacity:0.9;"></div>
                                    </div>
                                    <textarea cols="9" rows="5" class="adrtxt" readonly="readonly" ng-model="tokenTx.to" > </textarea>
                                    <div ng-bind-html="selectedName" style="overflow:hidden;text-align:center;max-height:21px" ></div> 
                              </div>
                              
                           
                  
                   
                  
                              
                              <div  ng-hide="typeTrans=='no'">
                              <div  ng-hide="tokenTx.value<limitWithoutPass">
                                 <p translate="TRAN_Enter_pass" ng-hide="is_request_mode" >Entrez votre mot de passe</p>
                                 <p translate="TRAN_Enter_pass_request" ng-show="is_request_mode" >Entrez votre mot de passe</p><br/>
                                 <input class="form-control" type="password" placeholder="{{ 'DCRY_Placeholder_psw' | translate }}"   ng-model="trPass" style="width:50%;margin-left:25%;"/>
                                 <div id="trStatus" ></div>
                              </div>
                              </div>
                          </h4>
                      </div>
                      <p ng-bind-html="err_message"> </p>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="cancelTx()" translate="TRAN_Cancel">Annuler la Payement</button>
                          <button type="button" class="btn btn-primary" ng-click="sendTx()" ng-hide="typeTrans=='no'" translate="TRAN_Confirm">Confirmer le Payement</button>
                      </div>
                  </div>
              </div>
        </div>
       <!-- / Send Modal -->
       
           <div class="modal fade"  style="z-index:400;" id="executedTrans" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          <h4 align="center">
                              <div><img src="images/Coche.png"  height="30" width="30"></div>
                              <label translate="TRAN_executed_text" ng-hide="is_request_mode">Vous avez envoyé</label>
                              <label translate="TRAN_executed_request_text" ng-show="is_request_mode" >Vous avez demandé</label>
                              <strong class="text-primary"> <br/><span ng-show="elemanAmmount>0"> {{elemanAmmount/100.| number : 2}} {{ 'CUR_nanti' | translate }}  </span> <span ng-show="lemanexAmmount>0"> <br/> {{lemanexAmmount/100.| number : 2}} {{ 'CUR_credit_mut' | translate }}   </span> </strong> 
                              <p translate="TRAN_To" ng-hide="is_request_mode">&agrave;</p>
                              <p translate="TRAN_From" ng-show="is_request_mode">&agrave;</p>
                              
                           
                     <div class="identiconWrapper" ng-hide="is_request_mode">
                     <div id="addressIdenticon" title="Address Indenticon"  blockie-address="{{tokenTx.to}}" watch-var="tokenTx.to" style="opacity:0.9;"></div>
                  </div>
                  <textarea cols="9" rows="5" class="adrtxt" readonly="readonly" ng-model="tokenTx.to" ng-hide="is_request_mode"> </textarea>
                  <div ng-bind-html="selectedName" style="overflow:hidden;text-align:center;max-height:21px" ng-hide="is_request_mode"></div> 
                  
                  <div class="identiconWrapper" ng-show="is_request_mode">
                     <div id="addressIdenticon" title="Address Indenticon"  blockie-address="{{origine_address}}" watch-var="origine_address" style="opacity:0.9;"></div>
                  </div>
                  <textarea cols="9" rows="5" class="adrtxt" readonly="readonly" ng-model="origine_address" ng-show="is_request_mode"> </textarea>
                  <div ng-bind-html="from_name" style="overflow:hidden;text-align:center;max-height:21px" ng-show="is_request_mode"></div>
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-primary" ng-click="closeConf()" translate="TRAN_OK">Fermer</button>
                          
                      </div>
                  </div>
              </div>
        </div>
        
        
       <div class="pop_pane"  ng-click="closeCttPopO()" style="z-index:12;" ng-show="showContactPopOrigine" >
           <div class="ctt_pop" style="z-index:13;"  ng-show="showContactPopOrigine" >
               <div class="ctt_cent">
                  <div ng-show="NoCtc" translate="CTC_noContacts"></div>
                  <div  ng-repeat="ct in contacts track by $index" class="ctt_elm">
                     <div>
                        <div  ng-click="pickCtcO(ct.address,ct.name)">
                           <div class="identiconWrapper" style="max-width:60px;" >
                              <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{ct.address }}"  watch-var="contacts" ></div>
                           </div>
                           <div class="ctt_txt">{{ct.name}}&nbsp;</div>
                       </div>
                    </div>
                 </div>
              </div>
          </div>      
      </div>
      
       <div class="pop_pane" ng-click="closeDelPop()" style="z-index:12;" ng-show="showDelegationPop">
           <div class="ctt_pop" style="z-index:13;"  ng-show="showDelegationPop">
               <div class="ctt_cent">
                  <div  ng-repeat="dg in delegations track by $index" class="ctt_elm">
                     <div>
                        <div  ng-click="pickDeleg(dg.address,dg.name,dg.amount)">
                           <div class="identiconWrapper" style="max-width:60px;" >
                              <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{dg.address }}"  watch-var="contacts" ></div>
                           </div>
                           <div class="ctt_txt">{{dg.name}}&nbsp;</div>
                       </div>
                    </div>
                 </div>
              </div>
          </div>      
      </div>
      <waiting-drtv></waiting-drtv> 
  </div>
</div>
