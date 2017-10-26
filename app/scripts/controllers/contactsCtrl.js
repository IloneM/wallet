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
var contactesCtrl = function($scope, $sce, walletService, contactservice, $translate) {
    
    // Check the environment
    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    
    // Create the modal popups
	$scope.editNameModal = new Modal(document.getElementById('editName'));
	$scope.deleteConatctModal = new Modal(document.getElementById('deleteContact'));
	$scope.addNameModal = new Modal(document.getElementById('addName'));
    $scope.importCtcModal = new Modal(document.getElementById('importCtcPop'));
    $scope.pickContactFileModal = new Modal(document.getElementById('pickContactFile'));
    
    
    // Controler variables 
    $scope.merge_type=0;
    $scope.ready = false;
    $scope.NoCtc=true;
    $scope.contacts=[];      
    document.getElementById("importer").title=$translate.instant("CTC_Tooltip_Import").replace("\n","");
    // document.getElementById("exporter").title=$translate.instant("CTC_Tooltip_Export").replace("\n","");
    document.getElementById("ajouter").title=$translate.instant("CTC_Tooltip_Ajout").replace("\n","");

    // Load the wallet and the contacts in the scope
	$scope.$watch(function() {
		if (walletService.wallet == null) return null;
		return walletService.wallet.getAddressString();
	}, function() {
		if (walletService.wallet == null) return;
		$scope.wallet = walletService.wallet;
	});
    
    
    
    $scope.loadContacts= function(){
      // Load contacts stored in the local storage  
      $scope.contacts = contactservice.loadContacts();
      $scope.NoCtc= $scope.contacts.length==0;
      
      // If in the browser prepare the export of the contacts
      if (! $scope.isApp){
        $scope.blobCtc = contactservice.getContactsBlob($scope.contacts);
      }
       
      $scope.ready = true;
    }
    
    
    $scope.loadContacts();
    
    // Delete handling
    $scope.deleteCtc = function(address,name){
      $scope.currName=name;
      $scope.curraddress=address;
      $scope.deleteConatctModal.open();
    }
    
    $scope.deleteContact= function(){
      $scope.deleteConatctModal.close();
      $scope.ready = false;
      $scope.contacts = contactservice.deleteContact($scope.contacts, $scope.curraddress);
      $scope.loadContacts();
    }
    
    // Add handling    
    $scope.addNamePop = function(){
      $scope.currName='';
      $scope.curraddress='';
      $scope.addNameModal.open();
    }
    
    $scope.helloToAddress = function(text){
      $scope.curraddress=text;
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
    
    $scope.saveNewName = function(){
        if ($scope.curraddress.length==$scope.wallet.getAddressString().length){
          $scope.addNameModal.close();
          $scope.ready = false;
          $scope.contacts = contactservice.addEditContact($scope.contacts, $scope.curraddress, $scope.currName);
          $scope.loadContacts();
        }
    }
    
    // Edit handling
    $scope.editCtc = function(address,name){
      $scope.currName=name;
      $scope.curraddress=address;
      $scope.editNameModal.open();
    }
    
    $scope.saveName = function(){
      $scope.editNameModal.close();
      $scope.ready = false;
      $scope.contacts = contactservice.addEditContact($scope.contacts, $scope.curraddress, $scope.currName);
      $scope.loadContacts();
    }
    
    // Import handling   
    $scope.openImportCtc = function(){
       document.getElementById("fctcselector").value = "";
       $scope.current_file='';
       $scope.loacl_number=$scope.contacts.length;
       $scope.current_file='';
       $scope.file_number=-1;
       $scope.conflict_number=0;
       
       $scope.importCtcModal.open(); 
    }
    
    $scope.selectCtcFile = function(){
       if (!$scope.isApp){
		    document.getElementById('fctcselector').click();
        } else {
            globalFuncs.readCordovaDir($scope.success); 
       } 
    }
    
    $scope.success = function(entries) {
        $scope.dir_entries=[];
        if (entries){
            for (var entry_id in entries){
                
                if (entries[entry_id].isFile && entries[entry_id].name.endsWith('.dat') ){
                    $scope.dir_entries.push(entries[entry_id]);
                }  
            }
        }
        $scope.len= $scope.dir_entries.length;
        $scope.SelectedFileIndex=-1;
        $scope.SelectedFileName='';
        $scope.$apply();
        $scope.pickContactFileModal.open();
    }
    
    $scope.pickCtcFile = function(name,index){
        $scope.SelectedFileIndex=index;
        $scope.SelectedFileName=name;
        
    }
    
    $scope.cancelCtcPickedFile =function(){
        $scope.importCtcModal.open();
    }
      
    $scope.openCtcPickedFile =function(){
        if ( $scope.SelectedFileIndex>=0){
            var file_entry = $scope.dir_entries[ $scope.SelectedFileIndex];
            file_entry.file(function(file){
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                   if(this.result) {
                       $scope.importCtcModal.open();
                       $scope.openCtcFile(this.result); 
                       $scope.$apply(); 
                   } 
                 };
                reader.onerror = function(evt) {};
                reader.readAsText(file);
            },function(){});   
        }
    }
    
    
    $scope.openCtcFile = function($fileContent) {
      if (document.getElementById('fctcselector').files[0] || $scope.SelectedFileIndex>=0){
        try {
          var parsed = contactservice.checkForContact($scope.contacts, $fileContent); 
          if (parsed.error){
            alert($translate.instant("CTC_no_valid_ctc"));
          }  else { 
            $scope.new_file_content = parsed.new_file_content;
            if ($scope.SelectedFileIndex>=0){
                $scope.current_file = $sce.trustAsHtml(globalFuncs.getSuccessText( $scope.SelectedFileName));
            } else {
                $scope.current_file = $sce.trustAsHtml(globalFuncs.getSuccessText(document.getElementById('fctcselector').files[0].name));
            }
            $scope.file_number = parsed.count;
            $scope.conflict_number = parsed.conflict;
          }
        } catch (e) {
          alert($translate.instant("CTC_no_valid_ctc"));    
        }
	  }
	}
    
    $scope.importCtc = function(){
      $scope.importCtcModal.close(); 
      $scope.ready = false;
      
      $scope.contacts = contactservice.mergeContacts($scope.contacts, $scope.new_file_content, $scope.merge_type); 
      $scope.new_file_content=null;
      $scope.loadContacts();
    }
    
    // (App) Export handling  
    $scope.exportCtc = function(){
      globalFuncs.dowloadAppFileWithName($translate.instant('CUR_global')+'_Contacts.dat', $scope.contacts);
    }
	
};
module.exports = contactesCtrl;


