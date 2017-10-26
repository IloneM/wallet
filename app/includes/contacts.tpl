    <!-- Transactions-->
    <div class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.contacts.id">
       @@if (site === 'mew' ) {
        <div>
            <wallet-decrypt-drtv></wallet-decrypt-drtv>
        </div>
        
        <div ng-show="wallet!=null" ng-controller='contactsCtrl'>
     }
     @@if (site === 'readOnly' ) {  
        <div ng-controller='contactsCtrl'>
     }
     
         <div class="row grp"> 
           <div class="col-md-12 ">
             <div class="row "> 
               <div class="col-md-5 col-xs-5">
                 <label translate="CTC_yourContacts" >Vos contacts :</label>
               </div>
                <div class="col-md-7 col-xs-7">
                  <button type="button" id="ajouter" class="btn btn-primary bellowmargin"  ng-click="addNamePop()" translate="CTC_add">Add </button>
                  <a type="button" id="exporter" title="Exporter" class="btn btn-primary bellowmargin" href="{{blobCtc}}" download="eLeman_Contacts.dat"  translate="CTC_export" ng-if="!isApp">Export </a>
                  <button type="button" class="btn btn-primary bellowmargin"  ng-click="exportCtc()" translate="CTC_export" ng-if="isApp">Export </button>
                  
              
                  <button type="button" id="importer" class="btn btn-primary bellowmargin"  ng-click="openImportCtc()" translate="CTC_import">Import </button>
               </div>
             </div>
             
            
             <div class="row "> 
               <div class="col-md-12 ">
                  <table width="100%" >
                    <tr  ng-show="NoCtc" class="tr_trans">
                         <td >
                           <p translate="CTC_noContacts" >no contacts</p>
                         </td>
                    <tr>
	                <tr  ng-repeat="ct in contacts track by $index" class="tr_trans">
	                  
                         <td  width="100px">
                             <div class="identiconWrapper" style="max-width:60px;">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{ct.address }}"  watch-var="contacts" ></div>
                             </div>
                         </td>
                         
                        <td >
                            {{ct.name}}
                        </td>
                       
                        <td width="50px;">
                              <a class="btn btn-primary btn-block"  ng-click="editCtc(ct.address,ct.name)"  translate="CTC_edit" >edit</a>
                        </td>
                        <td width="50px;">
                             <a class="btn btn-info btn-block" ng-click="deleteCtc(ct.address,ct.name)"  translate="CTC_delete"> delete </a>
                        </td>
                        
	               </tr>
                 </table>
               </div>
             </div>
           
           </div>
         </div>
           <!-- delete Modal -->
         <div class="modal fade" id="deleteContact" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                              <p><label translate="CTC_confirmDelete">delete name</label></p>
                               <div class="identiconWrapper" style="max-width:60px;">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{curraddress }}"  watch-var="curraddress" ></div>
                             </div><br/>
                             {{currName}}
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="CTC_deleteCancel">Annuler </button>
                          <button type="button" class="btn btn-primary" ng-click="deleteContact()" translate="CTC_deleteConfirm">Delete</button>
                      </div>
                  </div>
              </div>
        </div>
        
         <!-- add Modal -->
         <div class="modal fade" id="addName" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                           <p><label translate="CTC_Add_ctc">Choose address</label></p>
                           <p translate="CTC_chooseAddress">Choose address</p>
                            <div class="identiconWrapper" style="max-width:100px;">
                                 <div id="addressIdenticon" title="Address Indenticon" ng-click="startScanToAddress()" blockie-address="{{curraddress }}"  watch-var="curraddress" ></div>
                             </div>
                             <textarea cols="9" rows="5" class="adrtxt" placeholder="{{'ID_placeholder' | translate}}" ng-model="curraddress"> </textarea>
                             <p translate="CTC_chooseName">Choose name</p>
                               <input class="form-control" type="text" ng-model="currName" />
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="CTC_addNameCancel">Annuler </button>
                          <button type="button" class="btn btn-primary" ng-click="saveNewName()" translate="CTC_addNameSave">Sauver</button>
                      </div>
                  </div>
              </div>
        </div>
       
           <!-- edit Modal -->
         <div class="modal fade" id="editName" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                              <p><label translate="CTC_editName">Change name</label></p>
                               <div class="identiconWrapper" style="max-width:60px;">
                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="{{curraddress }}"  watch-var="curraddress" ></div>
                             </div>
                               <input class="form-control" type="text" ng-model="currName" />
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="CTC_editNameCancel">Annuler </button>
                          <button type="button" class="btn btn-primary" ng-click="saveName()" translate="CTC_editNameSave">Sauver</button>
                      </div>
                  </div>
              </div>
        </div>
       <!-- / Send Modal -->
       
       
       
           <!-- import Modal -->
         <div class="modal fade" id="importCtcPop" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                              <label translate="CTC_Import_title">Import</label>
                              <input style="display:none;" type="file" on-read-file="openCtcFile($fileContent)" id="fctcselector"/>
                              <p>
                                <button type="button" class="btn btn-primary"  ng-click="selectCtcFile()" translate="CTC_SelectFile">Import </button>
                              </p>
                              <p ng-hide="file_number==-1" ng-bind-html="current_file"> </p>
                              
                              <p  ng-hide="file_number==-1"  >{{file_number}} <span translate="CTC_Import_FileNumber">Local </span></p> 
                              <p>{{loacl_number}} <span translate="CTC_Import_localNumber">Local </span></p> 
                              <span ng-show="conflict_number!=0" >
                                <p>{{conflict_number}} <span translate="CTC_Import_Conflict">Conflict </span></p> 
                            
                                <label translate="CTC_Import_merge">Import</label>
                                <p><input type="radio" ng-model="merge_type" value="0" ng-value="0"> {{"CTC_Merge_their"| translate }}</p>
                                <p> <input type="radio" ng-model="merge_type" value="1" ng-value="1"> {{"CTC_Merge_mine"| translate }}</p> 
                              </span>
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="CTC_editNameCancel">Annuler </button>
                          <button type="button" ng-hide="file_number<1" class="btn btn-primary" ng-click="importCtc()" translate="CTC_Import_save">Sauver</button>
                      </div>
                  </div>
              </div>
        </div>
       <!-- / Send Modal -->
       
       <div class="modal fade" id="pickContactFile" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          <h4 align="center">
                          
                           <label translate="FILE_pickContact">Contact File</label>
                           <div style="height:350px;overflow-y:scroll;"> 
                           <table width="95%">
                             <tr  ng-repeat="entry in dir_entries track by $index" class="tr_trans">
	                          <td  ng-click="pickCtcFile(entry.name,$index)"  > <img src="images/file.png" height="20" width="20"></img> &nbsp;{{entry.name}} </td>
	                         </tr>
                            </table>
                            </div>
                             <label translate="FILE_selectedFile" ng_hide="SelectedFileIndex==-1">Contact File</label>
                           <p> {{SelectedFileName}}</p>
                             
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" ng-click="cancelCtcPickedFile()" translate="CTC_editNameCancel">Annuler </button>
                          <button type="button" class="btn btn-primary" ng-click="openCtcPickedFile()" translate="FILE_open" ng_hide="SelectedFileIndex==-1">open</button>
                      </div>
                  </div>
              </div>
        </div>
         

         <div class="glassPane" ng-hide="ready"> </div>
         <div class="waitingMsg" translate="GP_Wait" ng-hide="ready"> </div>
       </div>
 
   </div>
