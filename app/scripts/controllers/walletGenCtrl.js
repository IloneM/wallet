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
var walletGenCtrl = function($scope,$translate, walletService, contactService) {

    ///////////////////////////////////////////////////////////////////////////
    $scope.condUrl = "https://wallet.monnaie-leman.org/files/tou_LANG.html";
    ///////////////////////////////////////////////////////////////////////////
    
    $scope.showToken=true;
    $scope.showSecret=false;
	$scope.showWallet = false;
    $scope.ready = true;
    $scope.message_creation='';
    
    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    
    
    
    $scope.token="";
    
	$scope.password = "";
	$scope.wallet = null;
	$scope.blob = $scope.blobEnc = "";
    $scope.isDone = true;
    $scope.showPass = true;
    
    $scope.confirmCreateModal = new Modal(document.getElementById('confirmCreate'));
    $scope.cond1=false;
    $scope.cond2=false;
    
    $scope.gelLanguageCode = function(){
        var lang = localStorage.getItem('language');
        if (lang == null) return 'fr';
        lang = JSON.parse(lang);
        return lang.key;
    }
    
    
    $scope.helloToken = function(text){
       $scope.token=text;
       $scope.$apply();
    }
    
    $scope.startScanToken = function(){
        cordova.plugins.barcodeScanner.scan(
		function (result) {
			$scope.helloToken(result.text);
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	    );
    };
    
    $scope.validateToken =function(){
        $scope.message_creation=globalFuncs.getDangerText($translate.instant("GEN_Token_validation_KO"));
        var enr_txt=document.getElementById("enr_tk").value;
        try {
            var enrollmentLetter = JSON.parse(enr_txt);  
            // Validation du token par un appel à l'API
           
            ajaxReq.validateEnrollmentLetter(enrollmentLetter.id, enrollmentLetter.signature,function(data){
                if (data.result=="OK"){
                   $scope.enrollmentLetter=enrollmentLetter; 
                   $scope.enrollmentToken=data.token;
                   $scope.showToken=false;
                   $scope.showSecret=true;
                   $scope.message_creation='';
               } 
            });
        } catch (e) {
            $scope.message_creation=globalFuncs.getDangerText($translate.instant("GEN_Token_validation_error"));
        }  
        
    }
    
    $scope.genNewWallet = function() {
        if (!$scope.isStrongPass()) {
			alert($translate.instant('ERROR_2'));
		} else {
            $scope.cond1=false;
            $scope.cond2=false;
            $scope.confirmCreateModal.open();
        }
    }
    
	$scope.createWallet = function() {
		if (!$scope.isStrongPass()) {
			alert($translate.instant('ERROR_2'));
		} else if($scope.isDone){
            $scope.confirmCreateModal.close();
            $scope.ready = false;
            $scope.isDone = false;
			$scope.wallet = Wallet.generate(false);

			$scope.blob = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toJSON());
			$scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toV3($scope.password, {
				kdf: globalFuncs.kdf,
                n: globalFuncs.scrypt.n
			}));
            
        
            //Send address to API get validation
             $scope.message_creation=globalFuncs.getDangerText($translate.instant("GEN_Enrollment_KO"));
             try {
                 ajaxReq.enrollAddress($scope.enrollmentLetter.id,$scope.wallet.getAddressString() ,$scope.enrollmentToken,function(data){
                   if (data.result=="OK"){
                       localStorage.setItem('LemanWallet',JSON.stringify($scope.wallet.toV3($scope.password, {
                                    kdf: globalFuncs.kdf, n: globalFuncs.scrypt.n })));
                        globalFuncs.loadWallets(true);
                        contactService.ensureContact($scope.wallet.getChecksumAddressString());
                        $scope.showWallet = true;
                        $scope.showSecret = false; 
                        $scope.message_creation=""; 
                        
                    } 
                 });
             } catch (e) {
                $scope.message_creation=globalFuncs.getDangerText($translate.instant("GEN_Enrollment_Error"));  
             }
      
            $scope.isDone =  true;
            $scope.ready = true;
		}
	}
  $scope.dowloadAppFile = function(){
        globalFuncs.dowloadAppFile($scope.wallet, $scope.wallet.toV3($scope.password, {
				kdf: globalFuncs.kdf,
                n: globalFuncs.scrypt.n
		}));
    }
    
	$scope.printQRCode = function() {
      globalFuncs.generateSaveQR();
       setTimeout(function(){
             globalFuncs.generateSavePDF(function(img){img.save('LEM_QR_'+$scope.wallet.getAddressString()+'.pdf');});
          
       },100); 
	}

    $scope.isStrongPass = function(){
        return globalFuncs.isStrongPass($scope.password);
    }
    
    $scope.openGenCondition = function(){
        window.open($scope.condUrl.replace('LANG',$scope.gelLanguageCode()), "_system");
    }
};
module.exports = walletGenCtrl;
