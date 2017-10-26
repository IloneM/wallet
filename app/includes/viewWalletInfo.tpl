
   <!-- Ouverture d'un portefeuille -->
    <section class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.openWallet.id" ng-controller='decryptWalletCtrl'>
     <div class="row grp" >
       <div class="col-md-12 ">
         <div class="row "> 
           <div class="col-md-12 ">
              <label translate="OPEN_Choose_bak" >Selectionner une sauvegarde:</label>
           </div>
         </div>
         <div class="row "> 
           <div class="col-md-12 ">
              <input style="display:none;" type="file" on-read-file="showContent($fileContent)" id="fselector"/>
              <a class="file-input btn btn-block btn-default btn-file marg-v-sm btn-primary" ng-click="openFileDialog()" translate="OPEN_Choose_file" >Choisir un fichier... </a>
              <a class="file-input btn btn-block btn-default btn-file marg-v-sm btn-primary" ng-click="startScanPaperWallet()" translate="OPEN_Scan_back" ng-if="isApp">Scan d'une sauvegarde papier... </a>
              <div id="fuploadStatus" ng-bind-html="fileStatus"></div>
           </div>
         </div>
         <div class="row " > 
           <div class="col-md-12 ">
              <label id="uploadbtntxt-wallet" ng-show="showFDecrypt" translate="OPEN_Access"> Acc&eacute;der &agrave; votre portefeuille:</label>
            </div>
         </div>
         <div class="row " > 
           <div class="col-md-12 ">    
              <a class="btn btn-primary btn-block btnAction" ng-show="showFDecrypt" ng-click="openFile();" translate="OPEN_Open">Ouvrir le portefeuille</a>
              <div ng-bind-html="decryptStatus"></div>
           </div>
         </div>
       </div>
     </div>
     
       <div class="modal fade" id="pickWalletFile" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content"> 
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                          
                           <label translate="FILE_pickWallet">Wallet File</label>
                           <div style="height:350px;overflow-y:scroll;"> 
                           <table width="95%">
                             <tr  ng-repeat="entry in dir_entries track by $index" class="tr_trans">
	                          <td  ng-click="pickWallFile(entry.name,$index)"  > 
	                               <div ng-hide="entry.hasAddress"> <img src="images/file.png" height="40" width="40" ng-hide="entry.hasAddress"></img>    &nbsp;{{entry.name}}</div>
	                              <div class="identiconWrapper" style="max-width:60px;" ng-show="entry.hasAddress">
                                    <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{entry.address}}"  watch-var="dir_entries" ></div>
                                  </div>
                             
                                  <textarea cols="15" rows="3" class="adrtxtSml" readonly="readonly" ng-show="entry.hasAddress" ng-model="entry.address" > </textarea>
	                            </td>
	                         </tr>
                            </table>
                            </div>
                             <label translate="FILE_selectedFile" ng_hide="SelectedFileIndex==-1">Wallet File</label>
                           <p> {{SelectedFileName}}</p>
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="CTC_editNameCancel">Annuler </button>
                          <button type="button" class="btn btn-primary" ng-click="openWallFile()" translate="FILE_open" ng_hide="SelectedFileIndex==-1">open</button>
                      </div>
                  </div>
              </div>
        </div>
     
     
  </section>
    <!-- / Ouverture d'un portefeuille -->
    
    

    <!-- view wallet info -->
  
    <div class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.viewWalletInfo.id">
     @@if (site !== 'readOnly' ) {
        <div>
            <wallet-decrypt-drtv></wallet-decrypt-drtv>
        </div>
        
        <div  ng-show="wallet!=null" ng-controller='viewWalletCtrl' ng-controller='lemanCtrl'>
     }
     @@if (site === 'readOnly' ) { 
        <div  ng-controller='viewWalletCtrl' ng-controller='lemanCtrl'>
     }
     
            <blocked-account-drtv> </blocked-account-drtv>
     
            <section class="row" >
              <div class="col-md-12 ">
                  <div class="row grp"> 
                   <div class="col-md-12 ">
                      <label translate="TRAN_Address" >Votre adresse :</label>
                   </div>
                   <div  class="col-md-6 col-xs-6">
                      <div class="identiconWrapper">
                        <div id="addressIdenticon" title="Address Indenticon" blockie-address="{{currentAddress}}" watch-var="currentAddress"></div>
                      </div>
                   </div>
                   <div  class="col-md-6 col-xs-6">
                      <textarea cols="9" rows="5" class="adrtxt" readonly="readonly">{{currentAddress}} </textarea>
                   </div>
                  </div>
              </div>
            </section>
        
            <section class="row" >
              <div class="col-md-12 ">
                <div class="row grp"> 
                   <div class="col-md-12 ">
                      <label translate="VIEW_QR" >QR Code de votre portefeuille :</label>
                   </div>
                   <div class="col-md-12 qr_wrap ">
                    @@if (site === 'readOnly' ) { 
                     <div id="qr_qdd" qr-code="{{currentAddress}}" watch-var="currentAddress" width="100%" style=" max-width: 250px; margin-right:auto; margin-left:auto;" id="adr_div"></div>
                     }
                     @@if (site !== 'readOnly' ) {
                        <div id="qr_qdd" qr-code="{{currentAddressFromWallet}}" watch-var="currentAddressFromWallet" width="100%" style=" max-width: 250px; margin-right:auto; margin-left:auto;" id="adr_div"></div>
             
                     }
                     
                   </div>
                   <div class="col-md-12 ">
                     &nbsp;
                   </div>
                   <div class="col-md-12" ng-if="!isApp" >
                        <a class="btn btn-info btn-block" ng-click="printAdr()"  translate="VIEW_print_adr" > Imprimer votre adressse </a>
                   </div>
              </div>
            </section> 
        </div>
    </div>
    <!-- /view wallet info -->
    
  
