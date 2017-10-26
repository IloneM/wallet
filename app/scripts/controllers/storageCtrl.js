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
var storageCtrl = function($scope, $sce, walletService,$translate) {
    
    $scope.deleteWalletModal = new Modal(document.getElementById('deleteWallet'));
    $scope.editWallModal = new Modal(document.getElementById('editWall'));

    $scope.isApp =  document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    $scope.ready = true;
    $scope.private_cmp = JSON.parse(localStorage.getItem('PrivateComputer')); 
    if (! $scope.private_cmp){
         $scope.private_cmp=false;
    }
    
    
    $scope.wallets = globalFuncs.loadWallets(false);    
    $scope.NoWallet = $scope.wallets.length==0;
     
    $scope.deleteWall  = function(address){
        $scope.currentAddress = address;
        for (var id in $scope.wallets){
           if ($scope.wallets[id].address==address){
              $scope.blobEnc= globalFuncs.getBlob("text/json;charset=UTF-8",$scope.wallets[id]);
           }
        }
        $scope.deleteWalletModal.open();
    }
    
    $scope.dowloadAppFile = function(){
       for (var id in $scope.wallets){
         if ($scope.wallets[id].address == $scope.currentAddress){
           globalFuncs.dowloadAppFileWithName('LEM_0x'+$scope.currentAddress+'.dat', $scope.wallets[id].file);
         }
       }
    }
    
    $scope.deleteWallet  = function(){
      for (var id in $scope.wallets){
         if ($scope.wallets[id].address==$scope.currentAddress){
             $scope.wallets.splice(id, 1);
             localStorage.setItem('LemanWallets',JSON.stringify( $scope.wallets));  
             $scope.wallets = globalFuncs.loadWallets(false);    
             $scope.NoWallet = $scope.wallets.length==0;
             break;
         }
      }
      $scope.currentAddress='';
      $scope.blobEnc='';
      $scope.deleteWalletModal.close();
    }
    
    $scope.changePrivate = function(){
        localStorage.setItem('PrivateComputer',JSON.stringify( $scope.private_cmp));
    }
    
    $scope.openWallet = function(address){
      
      for (var id in $scope.wallets){
           if ($scope.wallets[id].address==address){
               localStorage.setItem('LemanWallet',JSON.stringify($scope.wallets[id].file) ); 
               location.reload();        
          }
       }         
    }
    
    $scope.editWall = function(address,name){
        $scope.currName=name;
        $scope.curraddress=address;
        $scope.editWallModal.open();
    }
    
     $scope.saveName = function(){
        $scope.editWallModal.close();
        
        $scope.ready = false;
        var index =-1;
        for (var i=0;i<$scope.wallets.length;i++){
                if ($scope.wallets[i].address==$scope.curraddress){
                   index=i;
                }
        } 
        if (index > -1) {
         $scope.wallets[index].name= $scope.currName;
        }
        
        $scope.wallets.sort(function(a,b){return a.name.localeCompare(b.name); });
        
        localStorage.setItem('LemanWallets',JSON.stringify( $scope.wallets)); 
        $scope.wallets = globalFuncs.loadWallets(false);
        $scope.ready = true; 
        
    }
    
    
	
};
module.exports = storageCtrl;


