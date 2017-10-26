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
var decryptWalletCtrl = function($scope, $sce, $translate, walletService, contactService) {
    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    
    
    if (document.getElementById('pickWalletFile')){
        $scope.pickWalletFileModal = new Modal(document.getElementById('pickWalletFile'));
    }


	$scope.requireFPass =false;
    $scope.showFDecrypt  = false;
	$scope.hideWalletSelector = false;
    
    $scope.getCurrWallet = function(){
      try{   
          var current = JSON.parse(localStorage.getItem('LemanWallet'));  
          if (current) {
              try{  
                var other_wallets = JSON.parse(localStorage.getItem('LemanWallets')); 
              } catch(e){}
              
              if (!other_wallets){
                  other_wallets=[]; 
              }  
              
              var id_curr=-1;
              for (var id in other_wallets){
                 if (other_wallets[id].address==current.address){
                              $scope.currWallet = other_wallets[id];
                              break;
                  }
               }
            }
        } catch(e){
        }
    }
    
    $scope.getCurrWallet();
  
	$scope.showContent = function($fileContent) {
        if (document.getElementById('fselector').files[0]){
            $scope.fileStatus = $sce.trustAsHtml(globalFuncs.getSuccessText(document.getElementById('fselector').files[0].name)); 
            
        } else if ($scope.SelectedFileName!=''){
             $scope.fileStatus = $sce.trustAsHtml(globalFuncs.getSuccessText($scope.SelectedFileName));
        } else {
            $scope.fileStatus =  $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant('OPEN_Paper_selected'))); 
        }
		try {
            var current = JSON.parse($fileContent);
            if (typeof current === 'undefined' || typeof current.address === 'undefined' || 
                (typeof current.Crypto === 'undefined' && current.crypto === 'undefined') ||  typeof current.id === 'undefined'||  
                typeof current.version === 'undefined'){
                throw 'Missformed file';
            }
			$scope.fileContent = $fileContent;
            $scope.showFDecrypt = true;
            
		} catch (e) {
			$scope.fileStatus = $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant('ERROR_4')));
		}
	};
    
    $scope.openFile = function(){
       localStorage.setItem('LemanWallet',$scope.fileContent );  
       globalFuncs.loadWallets(true);
       try{
            var current = JSON.parse($scope.fileContent);
            contactService.ensureContact('0x'+current.address);
       } catch(e){}
       location.reload();
    }
    
    $scope.pickWallFile = function(name,index){
        $scope.SelectedFileIndex=index;
        $scope.SelectedFileName=name;
        
    }
    
    $scope.openWallFile =function(){
        if ( $scope.SelectedFileIndex>=0){
            var file_entry = $scope.dir_entries[ $scope.SelectedFileIndex];
            file_entry.file(function(file){
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                   if(this.result) {
                       $scope.pickWalletFileModal.close();
                       $scope.showContent(this.result);        
                       $scope.$apply();      
                   } 
                 };
                reader.onerror = function(evt) {};
                reader.readAsText(file);
            },function(){});   
        }
    }
    
    $scope.success = function(entries) {
        var address_regex = /0x[a-z0-9]{40}/i;
        $scope.dir_entries=[];
        if (entries){
            for (var entry_id in entries){
                
                if (entries[entry_id].isFile && entries[entry_id].name.endsWith('.dat') ){
                     entries[entry_id].hasAddress= address_regex.test(entries[entry_id].name);
                     if (entries[entry_id].hasAddress){
                        entries[entry_id].address=address_regex.exec(entries[entry_id].name)[0];
                     }
                    
                    $scope.dir_entries.push(entries[entry_id]);
                }  
            }
        }
        $scope.len= $scope.dir_entries.length;
        $scope.SelectedFileIndex=-1;
        $scope.SelectedFileName='';
        $scope.$apply();
        $scope.pickWalletFileModal.open();
    }
    

    
    
    
	$scope.openFileDialog = function($fileContent) {
        if (!$scope.isApp){
		    document.getElementById('fselector').click();
        } else {
            globalFuncs.readCordovaDir($scope.success); 
       } 
	};
    
	$scope.onFilePassChange = function() {
		$scope.showFDecrypt = $scope.filePassword.length > 7;
	};
	

    $scope.confirmForgetWallet = function(){
        /* clear the local storage and reload the page */
        $scope.password = "";
	    $scope.wallet = null;
	    $scope.showWallet = false;
	    $scope.blob = $scope.blobEnc = "";
        $scope.isDone = true;
        $scope.showPass = true;
        localStorage.removeItem('LemanWallet');
        location.reload();
    }
    
	$scope.decryptWallet = function() {
        
	    $scope.wallet=null;
        $scope.decryptStatus="";
		$scope.showFDecrypt = true;
		try {
            // toujours dans le cas d'un file dans le storage local
			$scope.fileContent = localStorage.getItem('LemanWallet');
		    $scope.wallet = Wallet.getWalletFromPrivKeyFile($scope.fileContent, document.getElementById('passwdField').value);
            walletService.password = $scope.filePassword;
            walletService.wallet = $scope.wallet;
            walletService.setUsed();
            
            $scope.hideWalletSelector = true;
		} catch (e) {
            $scope.decryptStatus = $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant('ERROR_7')));
		}
        if($scope.wallet!=null) $scope.decryptStatus = $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant('SUCCESS_2')));
	};
    
    $scope.loadWallet = function() {
        if ($scope.filePassword ){
            $scope.decryptStatus="";
		    $scope.showFDecrypt = true;
		    try {
                // toujours dans le cas d'un file dans le storage local
			    $scope.fileContent = localStorage.getItem('LemanWallet');
		        $scope.wallet = Wallet.getWalletFromPrivKeyFile($scope.fileContent, $scope.filePassword);
                walletService.password = $scope.filePassword;
			
                walletService.wallet = $scope.wallet;
                $scope.hideWalletSelector = true;
		    } catch (e) {
                $scope.decryptStatus = $sce.trustAsHtml(globalFuncs.getDangerText($translate.instant('ERROR_7')));
		    }
            if($scope.wallet!=null) $scope.decryptStatus = $sce.trustAsHtml(globalFuncs.getSuccessText($translate.instant('SUCCESS_2')));

        }
	};
    
    
    $scope.helloPaperWallet = function(text){
       $scope.showContent(text);
       $scope.$apply();
    }
    
    $scope.startScanPaperWallet = function(){
        cordova.plugins.barcodeScanner.scan(
		function (result) {
			$scope.helloPaperWallet(result.text);
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	    );
    };
    
    
    
    $scope.loadWallet();


};
module.exports = decryptWalletCtrl;
