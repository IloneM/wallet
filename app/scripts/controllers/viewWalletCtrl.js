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
var viewWalletCtrl = function($scope, walletService, PNG) {
    
    $scope.currentAddress=globalFuncs.getWalletAddress();
    $scope.is_locked=false;
    // Load the wallet in the scope
	$scope.$watch(function() {
		if (walletService.wallet == null) return null;
		return walletService.wallet.getAddressString();
	}, function() {
		if (walletService.wallet == null) return;
		$scope.wallet = walletService.wallet;
        $scope.currentAddressFromWallet=$scope.wallet.getAddressString();
        globalFuncs.getAccInfo(globalFuncs.slockitAccStatus, $scope.wallet.getAddressString(), function(status){
                    $scope.is_locked = status==0;
        });
        globalFuncs.notifyApproval();
	});
    
    $scope.callback = function(pdf_doc){
        pdf_doc.save('Adresse_'+$scope.currentAddress+'.pdf');
    }

    // Generate and save the wallet Address pdf
	$scope.printAdr = function() {
       setTimeout(function(){
             globalFuncs.generateSaveAdrPDF($scope.currentAddress, $scope.callback);
       },100); 
	}
    
  
};

module.exports = viewWalletCtrl;
