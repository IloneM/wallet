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
var globalFuncs = function() {}
 ///////////////////////////////////////////////////////////////////////////
 globalFuncs.slockitContract = "0x1234567890abcdef1234567890abcdef12345678"; 
 globalFuncs.slockitPayContract = "0x1234567890abcdef1234567890abcdef12345678"; 
 ///////////////////////////////////////////////////////////////////////////
 
 globalFuncs.eLemTransfert = "0xa5f7c148";
 globalFuncs.lemanexTransfert = "0x60ca9c4c";
 globalFuncs.fondTransfert = "0x00d24387";
 
 globalFuncs.slockitBalance = "0x70a08231";    
 globalFuncs.slockitElBlance = "0xae261aba";
 globalFuncs.slockitCmBlance = "0xbbc72a17";
 
 globalFuncs.slockitCmLimitm = "0xcc885a65";
 globalFuncs.slockitCmLimitp = "0xae7143d6";
 
 globalFuncs.slockitAccType = "0xba99af70";   
 globalFuncs.slockitAccStatus = "0x61242bdd"; 
 
 globalFuncs.slockitIsOwner = "0x2f54bf6e"; 
 globalFuncs.slockitTaxAmount = "0x98a9cfac";
 globalFuncs.slockitTaxLegAmount = "0x48455399"; 
 globalFuncs.slockitTaxAccount = "0x4f2eabe0"; 
 
 
 globalFuncs.slockitSetTax = "0xf6f1897d"; 
 globalFuncs.slockitSetTaxLeg = "0xfafaf4c0"; 
 globalFuncs.slockitSetTaxAccount = "0xd0385b5e"; 
 globalFuncs.slockitSetOwnerAccount = "0xf2fde38b"; 
 
 globalFuncs.slockitSetAccountParam = "0x848b2592";
 globalFuncs.slockitPledge = "0x6c343eef";
 

 globalFuncs.delegationCount = "0x58fb5218";
 globalFuncs.getDelegation = "0xca40edf1";
 globalFuncs.delegation = "0x046d3307";
 globalFuncs.delegate = "0x75741c79";
 
 
 globalFuncs.allowanceCount = "0xaa7adb3d";
 globalFuncs.getAllowance = "0xb545b11f";
 globalFuncs.allowance = "0xdd62ed3e";
 globalFuncs.approve = "0xd4e12f2e";
 

 globalFuncs.myDelegationCount = "0x7737784d";
 globalFuncs.getMyDelegation = "0x49bce08d";
 globalFuncs.myDelegation = "0xf24111d2";
 
 globalFuncs.transfertFrom = "0x58258353";
 globalFuncs.transfertCMFrom = "0x2ef9ade2";
 
 globalFuncs.transfertOnBehalfNant = "0x1b6b1ee5";
 globalFuncs.transfertOnBehalfCM = "0x74c421fe";
 

 globalFuncs.myRequestCount = "0x418d0fd4";
 globalFuncs.myReqMap = "0x0becf93f";
 globalFuncs.myRequest = "0x09a15e43";

 globalFuncs.requestCount = "0xdebb9d28";
 globalFuncs.reqMap = "0x726d0a28";
 globalFuncs.request = "0x3537d3fa";
 
 globalFuncs.acceptedCount = "0x8d768f84";
 globalFuncs.acceptedMap = "0x59a1921a";
 globalFuncs.accepted = "0x958cde37";
 globalFuncs.dissAccepted = "0xccf93c7a";
 
 globalFuncs.rejectedCount = "0x20cde8fa";
 globalFuncs.rejectedMap = "0x9aa9366e";
 globalFuncs.rejected = "0xeac9dd4d";
 globalFuncs.dissRejected = "0x88759215";
 

 globalFuncs.payRequestNant = "0x132019f4";
 globalFuncs.payRequestCM = "0x1415707c";
 globalFuncs.cancelRequest = "0xaf98f757";
 
 ///////////////////////////////////////////////////////////////////////////
 
  globalFuncs.getNumber = function(data, ratio){
        var short_data = '0x'+ data.slice(-12);
        var a = parseInt(short_data, 16);
        
        if (a>(34359738368*4096)){
            a=a-68719476736*4096
        }
        
        return a/ratio;
        
    }
    

    
    globalFuncs.encodeNumber=function(number){
         var valueHex;
         if (number<0){
            valueHex = ethFuncs.padLeft(new BigNumber(16).pow(64).plus(number).toString(16), 64);
         } else{
            valueHex = ethFuncs.padLeft(new BigNumber(number).toString(16), 64);
         }
         
         return valueHex;
    }
 
   
    globalFuncs.generateTx = function(contract, wallet, fuct_address, values, callback){
        var  tx = {
		    gasLimit: 500000,
		    data: '',
		    to: contract,
		    unit: "ether",
		    value: 0,
		    nonce: null,
		    gasPrice: null,
		    donate: false
       }
        
        var concatenated_variable='';
        for (var index = 0; index < values.length; ++index) {
            var valueHex = values[index];
            concatenated_variable=concatenated_variable+valueHex;
        }
        
        tx.data = fuct_address + concatenated_variable;
        tx.from =wallet.getAddressString();
        tx.key = wallet.getPrivateKeyString(); 
        uiFuncs.generateTx(tx, function(rawTx){
            if (!rawTx.isError){
             uiFuncs.sendTx(rawTx.signedTx, function(res){
                 callback(res);    
             });
            } else { 
                callback(rawTx);
            }
		});
    }  
    
     globalFuncs.generateTxDelta = function(contract, wallet, fuct_address, values, callback){
        var  tx = {
		    gasLimit: 500000,
		    data: '',
		    to: contract,
		    unit: "ether",
		    value: 0,
		    nonce: null,
		    gasPrice: null,
		    donate: false
       }
        
        var concatenated_variable='';
        for (var index = 0; index < values.length; ++index) {
            var valueHex = values[index];
            concatenated_variable=concatenated_variable+valueHex;
        }
        
        tx.data = fuct_address + concatenated_variable;
        tx.from =wallet.getAddressString();
        tx.key = wallet.getPrivateKeyString(); 
        uiFuncs.generateTxDelta(tx, function(rawTx){
            if (!rawTx.isError){
             uiFuncs.sendTx(rawTx.signedTx, function(res){
                 callback(res);    
             });
            } else { 
                callback(rawTx);
            }
		});
    }  
    
 

    
    
     
  
 globalFuncs.getAmountForElement = function(contract, function_address, caller_address, element_address, callback){
    var userInfo = ethFuncs.getDataObj(contract, 
                                       function_address, 
                                       [ethFuncs.getNakedAddress(caller_address),ethFuncs.getNakedAddress(element_address)]);
    ajaxReq.getEthCall(userInfo, function(data) {
                if (!data.error) {
			        callback(globalFuncs.getNumber(data.data, 100.).toString());    
		        }
	});        
}

globalFuncs.getElementInList = function(contract, map_function_address, amount_function_address, caller_address, index, list, ind_min, final_call_back){
    if (index>=ind_min){
        var userInfo = ethFuncs.getDataObj(contract, 
                                        map_function_address, 
                                        [ethFuncs.getNakedAddress(caller_address),  
                                         ethFuncs.padLeft(new BigNumber(index).toString(16), 64) ]);
     
        ajaxReq.getEthCall(userInfo, function(data) {
            if (!data.error) {
                globalFuncs.getAmountForElement(contract, amount_function_address, caller_address, data.data, function(amount){
                    var cleaned_add = '0x'+ data.data.substring(data.data.length-40);
                    var element = {address:cleaned_add, amount:amount};
                    list.unshift(element);
                    globalFuncs.getElementInList(contract, map_function_address, amount_function_address, caller_address, index-1, list, ind_min, final_call_back);
                    
                });
		    }
		});    
        
    } else {
       final_call_back(list); 
    }      
}

globalFuncs.getAmmount = function(address,walletAddress,callback){
        var userInfo = ethFuncs.getDataObj(globalFuncs.slockitContract, 
                                           address, 
                                           [ethFuncs.getNakedAddress(walletAddress)]);
		ajaxReq.getEthCall(userInfo, function(data) {
            if (!data.error) {
			    callback(globalFuncs.getNumber(data.data, 100.).toString());
                   
		    }
		});        
  }
  
globalFuncs.getAccInfo = function(address,walletAddress,callback){
        var userInfo = ethFuncs.getDataObj(globalFuncs.slockitContract, 
                                           address, 
                                           [ethFuncs.getNakedAddress(walletAddress)]);
		ajaxReq.getEthCall(userInfo, function(data) {
            if (!data.error) {
			    callback(globalFuncs.getNumber(data.data, 1.));
                   
		    }
		});        
  }
  
  
  
  
  globalFuncs.getGlobInfo = function(address, callback){
        var userInfo = ethFuncs.getDataObj(globalFuncs.slockitContract, address, []);
		ajaxReq.getEthCall(userInfo, function(data) {
            if (!data.error) {
			    callback(data.data);  
		    }
		});        
  }
  
  
  
  
  
globalFuncs.getInfo = function(contract, address, walletAddress,callback){
        var userInfo = ethFuncs.getDataObj(contract, 
                                           address, 
                                           [ethFuncs.getNakedAddress(walletAddress)]);
		ajaxReq.getEthCall(userInfo, function(data) {
            if (!data.error) {
			    callback(globalFuncs.getNumber(data.data, 1.));
                   
		    }
		});        
  }
    
    
    
    
 /* Action in Contract 1*/ 
 globalFuncs.SetAccountParam = function(wallet, account_address, acc_status, acc_type, limit_minus, limit_plus, callback){
     var accAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(account_address), 64);
     globalFuncs.generateTx(globalFuncs.slockitContract, 
                            wallet, 
                            globalFuncs.slockitSetAccountParam,
                            [accAdd,
                             globalFuncs.encodeNumber(acc_status),
                             globalFuncs.encodeNumber(acc_type),
                             globalFuncs.encodeNumber(parseInt(100*limit_plus,10)),
                             globalFuncs.encodeNumber(parseInt(100*limit_minus,10))], 
                            callback);
 }
 
globalFuncs.PledgeAccount = function(wallet, account_address, amount, callback){
     var amount_cent = globalFuncs.encodeNumber(parseInt(100*amount,10));
     var accAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(account_address), 64);
     globalFuncs.generateTx(globalFuncs.slockitContract,
                            wallet, 
                            globalFuncs.slockitPledge, 
                            [accAdd, amount_cent],
                            callback);       
 }
 
 globalFuncs.setAllowance = function (wallet, spender_address,amount,callback){
      var acc_add = ethFuncs.padLeft(ethFuncs.getNakedAddress(spender_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitContract,
                             wallet, 
                             globalFuncs.approve, 
                             [acc_add, globalFuncs.encodeNumber(parseInt(100*amount,10))], 
                             callback);
}
 
globalFuncs.setDelegation = function (wallet, spender_address,limit,callback){
    
      var acc_add = ethFuncs.padLeft(ethFuncs.getNakedAddress(spender_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitContract,
                             wallet, 
                             globalFuncs.delegate, 
                             [acc_add, globalFuncs.encodeNumber(parseInt(100*limit,10))], 
                             callback);
}

globalFuncs.SetTaxAmount = function(wallet, amount, callback){
     var amount_encoded = globalFuncs.encodeNumber(parseInt(amount,10));
     globalFuncs.generateTx(globalFuncs.slockitContract,
                            wallet, 
                            globalFuncs.slockitSetTax, 
                            [amount_encoded],
                            callback);       
 }
 
 globalFuncs.SetTaxLegAmount = function(wallet, amount, callback){
     var amount_encoded = globalFuncs.encodeNumber(parseInt(amount,10));
     globalFuncs.generateTx(globalFuncs.slockitContract,
                            wallet, 
                            globalFuncs.slockitSetTaxLeg, 
                            [amount_encoded],
                            callback);       
 }
 
 globalFuncs.SetTaxAccount = function(wallet, account_address, callback){
   
     var accAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(account_address), 64);
     globalFuncs.generateTx(globalFuncs.slockitContract,
                            wallet, 
                            globalFuncs.slockitSetTaxAccount, 
                            [accAdd],
                            callback);       
 }
 
 globalFuncs.SetOwnerAccount = function(wallet, account_address, callback){
   
     var accAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(account_address), 64);
     globalFuncs.generateTx(globalFuncs.slockitContract,
                            wallet, 
                            globalFuncs.slockitSetOwnerAccount, 
                            [accAdd],
                            callback);       
 }

 
/* Lists in Contract 2*/  
 
globalFuncs.getAllowanceList = function(walletAddress, ind_min, ind_max, callback){
    globalFuncs.getInfo(globalFuncs.slockitPayContract, globalFuncs.allowanceCount,walletAddress,function(count){
        var list = [];
        var index = Math.min(count-1,ind_max);
        globalFuncs.getElementInList(globalFuncs.slockitPayContract, 
                                     globalFuncs.getAllowance, 
                                     globalFuncs.allowance, 
                                     walletAddress, 
                                     index, 
                                     list, 
                                     ind_min, 
                                     callback);
    });
}


//--myAllowance not needed

globalFuncs.getRequestToApproveList = function(walletAddress, ind_min, ind_max, callback){
    globalFuncs.getInfo(globalFuncs.slockitPayContract, globalFuncs.requestCount,walletAddress,function(count){
        var list = [];
        var index = Math.min(count-1,ind_max);
        globalFuncs.getElementInList(globalFuncs.slockitPayContract,
                                     globalFuncs.reqMap, 
                                     globalFuncs.request, 
                                     walletAddress, 
                                     index, 
                                     list, 
                                     ind_min, 
                                     callback);
    });
}

globalFuncs.getPendingRequestList = function(walletAddress, ind_min, ind_max, callback){
    globalFuncs.getInfo(globalFuncs.slockitPayContract, globalFuncs.myRequestCount,walletAddress,function(count){
        var list = [];
        var index = Math.min(count-1,ind_max);
        globalFuncs.getElementInList(globalFuncs.slockitPayContract, 
                                     globalFuncs.myReqMap, 
                                     globalFuncs.myRequest, 
                                     walletAddress, 
                                     index, 
                                     list, 
                                     ind_min, 
                                     callback);
    });
}

globalFuncs.getDelegationList = function(walletAddress,ind_min,ind_max,callback){
    globalFuncs.getInfo(globalFuncs.slockitPayContract, globalFuncs.delegationCount,walletAddress,function(count){
        var list = [];
        var index = Math.min(count-1,ind_max);
        globalFuncs.getElementInList(globalFuncs.slockitPayContract, 
                                     globalFuncs.getDelegation, 
                                     globalFuncs.delegation, 
                                     walletAddress, 
                                     index, 
                                     list, 
                                     ind_min, 
                                     callback);
    });
}



globalFuncs.getMyDelegationList = function(walletAddress,callback){
    globalFuncs.getInfo(globalFuncs.slockitPayContract,globalFuncs.myDelegationCount,walletAddress,function(count){
        var list = [];
        var index = count-1;
        globalFuncs.getElementInList(globalFuncs.slockitPayContract, 
                                     globalFuncs.getMyDelegation, 
                                     globalFuncs.myDelegation, 
                                     walletAddress, 
                                     index, 
                                     list, 
                                     0, 
                                     callback);
    });
}


globalFuncs.getAcceptedRequestList = function(walletAddress, ind_min, ind_max, callback){
    globalFuncs.getInfo(globalFuncs.slockitPayContract,globalFuncs.acceptedCount,walletAddress,function(count){
        var list = [];
        var index = Math.min(count-1,ind_max);
        globalFuncs.getElementInList(globalFuncs.slockitPayContract,
                                     globalFuncs.acceptedMap, 
                                     globalFuncs.accepted, 
                                     walletAddress, 
                                     index, 
                                     list, 
                                     ind_min, 
                                     callback);
    });
}

globalFuncs.getRejectedRequestList = function(walletAddress, ind_min, ind_max, callback){
    globalFuncs.getInfo(globalFuncs.slockitPayContract, globalFuncs.rejectedCount,walletAddress,function(count){
        var list = [];
        var index = Math.min(count-1,ind_max);
        globalFuncs.getElementInList(globalFuncs.slockitPayContract,
                                     globalFuncs.rejectedMap, 
                                     globalFuncs.rejected, 
                                     walletAddress, 
                                     index, 
                                     list, 
                                     ind_min, 
                                     callback);
    });
}

 /*Action in contract 2*/
 
 
globalFuncs.TransfertNant = function (wallet, to_address, amount,callback){
      var to_add = ethFuncs.padLeft(ethFuncs.getNakedAddress(to_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitPayContract, 
                             wallet, 
                             globalFuncs.eLemTransfert, 
                             [to_add, globalFuncs.encodeNumber(amount)], 
                             callback);
}

globalFuncs.TransfertCM = function (wallet, to_address,amount,incr,callback){
      var to_add = ethFuncs.padLeft(ethFuncs.getNakedAddress(to_address), 64);
      
      if (incr==0){
                globalFuncs.generateTx(globalFuncs.slockitPayContract, 
                             wallet, 
                             globalFuncs.lemanexTransfert, 
                             [to_add, globalFuncs.encodeNumber(amount)], 
                             callback);
      } else {
                globalFuncs.generateTxDelta(globalFuncs.slockitPayContract, 
                             wallet, 
                             globalFuncs.lemanexTransfert, 
                             [to_add, globalFuncs.encodeNumber(amount)], 
                             callback);
      }

}

globalFuncs.TransfertOnBehalfNant = function (wallet, from_address, to_address, amount, callback){
      var from_add = ethFuncs.padLeft(ethFuncs.getNakedAddress(from_address), 64);
      var to_Add = ethFuncs.padLeft(ethFuncs.getNakedAddress(to_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitPayContract,
                             wallet, 
                             globalFuncs.transfertOnBehalfNant, 
                             [from_add, to_Add, globalFuncs.encodeNumber(amount)], 
                             callback);
}

globalFuncs.TransfertOnBehalfCM = function (wallet, from_address, to_address, amount, callback){
      var from_add = ethFuncs.padLeft(ethFuncs.getNakedAddress(from_address), 64);
      var to_Add = ethFuncs.padLeft(ethFuncs.getNakedAddress(to_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitPayContract,
                             wallet, 
                             globalFuncs.transfertOnBehalfCM, 
                             [from_add, to_Add, globalFuncs.encodeNumber(amount)], 
                             callback);
}


 
globalFuncs.askTransfertFrom = function (wallet,account_address, from_address,amount,callback){
      var from_add = ethFuncs.padLeft(ethFuncs.getNakedAddress(from_address), 64);
      var accAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(account_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitPayContract,
                             wallet, 
                             globalFuncs.transfertFrom, 
                             [from_add, globalFuncs.encodeNumber(amount)], 
                             callback);
}

globalFuncs.askTransfertCMFrom = function (wallet,account_address, from_address,amount,callback){
      var from_add = ethFuncs.padLeft(ethFuncs.getNakedAddress(from_address), 64);
      var accAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(account_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitPayContract,
                             wallet, 
                             globalFuncs.transfertCMFrom, 
                             [from_add, globalFuncs.encodeNumber(amount)], 
                             callback);
}



globalFuncs.PayRequestNant = function (wallet, to_address, amount, callback){
      var to_Add = ethFuncs.padLeft(ethFuncs.getNakedAddress(to_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitPayContract,
                             wallet, 
                             globalFuncs.payRequestNant, 
                             [to_Add, globalFuncs.encodeNumber(amount)], 
                             callback);
}

globalFuncs.PayRequestCM = function (wallet, to_address, amount, callback){
      var to_Add = ethFuncs.padLeft(ethFuncs.getNakedAddress(to_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitPayContract,
                             wallet, 
                             globalFuncs.payRequestCM, 
                             [to_Add, globalFuncs.encodeNumber(amount)],
                             callback);
}

globalFuncs.RejectRequest = function (wallet, to_address, callback){
      var to_Add = ethFuncs.padLeft(ethFuncs.getNakedAddress(to_address), 64);
      globalFuncs.generateTx(globalFuncs.slockitPayContract,
                             wallet, 
                             globalFuncs.cancelRequest, 
                             [to_Add], 
                             callback);
}
 
 



 globalFuncs.DissmissAcceptedInfo = function(wallet, account_address, callback){
     var accAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(account_address), 64);
     globalFuncs.generateTx(globalFuncs.slockitPayContract,
                            wallet, 
                            globalFuncs.dissAccepted, 
                            [accAdd], 
                            callback);       
 }
 
  globalFuncs.DissmissRejectedInfo = function(wallet, account_address, callback){
     var accAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(account_address), 64);
     globalFuncs.generateTx(globalFuncs.slockitPayContract,
                            wallet, 
                            globalFuncs.dissRejected, 
                            [accAdd], 
                            callback);       
 }
 
 

 
 
 
 
  

  
 
  











 




globalFuncs.notifyApproval = function(){
    if (document.getElementsByClassName('trans')[0]){
            if (JSON.parse(localStorage.getItem('LemanWallet'))){
                var addresss = JSON.parse(localStorage.getItem('LemanWallet')).address;
                globalFuncs.getInfo(globalFuncs.slockitContract, globalFuncs.requestCount,addresss,function(count){
                    if (count>0){
                        document.getElementsByClassName('trans')[0].className = "trans alrt";
                    } else {
                        document.getElementsByClassName('trans')[0].className = "trans";
                    }
                });
                
            } else {
                document.getElementsByClassName('trans')[0].className = "trans"; 
            }
        }
}


globalFuncs.getTransCurrency = function(nant_val,cm_val,cm_minus_lim,amount){
    var nant =0;
    var cm=0;
    var res='no';
    
    if (parseFloat(cm_val)>=parseFloat(amount)){
       res='cm'; 
    } else if (parseFloat(nant_val)>=parseFloat(amount)){
       res='nant';  
    } else if(parseFloat(cm_val)-parseFloat(cm_minus_lim)>=parseFloat(amount)){
       res='cm';  
    } 
    return  res;
}


globalFuncs.getSplitting = function(nant_val,cm_val,cm_minus_lim,amount){
    var nant =0;
    var cm=0;
    
    var res=parseFloat(amount);
    if (parseFloat(cm_val)>0){
        if (parseFloat(cm_val)>=res){
            cm = res;
            res=0;
        } else {
            cm = parseFloat(cm_val);
            res=res-parseFloat(cm_val);
            cm_val=0;
        }
    }
    
    if (parseFloat(nant_val)>0){
        if (parseFloat(nant_val)>=res){
            nant=res;
            res=0;
        } else {
            nant=parseFloat(nant_val);
            res=res-parseFloat(nant_val);
            //nant_val=0;
        }
    }
    
    if (res>0 && parseFloat(cm_val)-parseFloat(cm_minus_lim)>=res){
        cm = cm + res;
        res = 0;
    }
    
    var possible = res==0;
    return  {'possible': possible,'nant':nant, 'cm':cm};
}



globalFuncs.getBlockie = function(address) {
	return blockies.create({
		seed: address.toLowerCase(),
		size: 8,
		scale: 16
	}).toDataURL();
}

globalFuncs.getBlob = function(mime, str) {
	var str = (typeof str === 'object') ? JSON.stringify(str) : str;
	if (str == null) return '';
	var blob = new Blob([str], {
		type: mime
	});
	return window.URL.createObjectURL(blob);
}
globalFuncs.getSuccessText = function(str) {
	return '<p class="text-center text-success"><strong> ' + str + '</strong></p>'
}

globalFuncs.getWarningText = function(str) {
	return '<p class="text-center text-warning"><strong> ' + str + '</strong></p>'
}

globalFuncs.getDangerText = function(str) {
	return '<p class="text-center text-danger"><strong> ' + str + '</strong></p>'
}
globalFuncs.errorMsgs = [
	"Please enter valid amount.",
	"Your password must be at least 9 characters. Please ensure it is a strong password. ",
	"Sorry! We don\'t recognize this type of wallet file. ",
	"This is not a valid wallet file. ",
	"This unit doesn\'t exists, please use the one of the following units ",
	"Invalid address. ",
	"Invalid password. ",
	"Invalid amount. ",
	"Invalid gas limit. ",
	"Invalid data value. ",
	"Invalid gas amount. ",
	"Invalid nonce. ",
	"Invalid signed transaction. ",
	"A wallet with this nickname already exists. ",
	"Wallet not found. ",
	"Whoops. It doesnt look like a proposal with this ID exists yet or there is an error reading this proposal. ",
	"A wallet with this address already exists in storage. Please check your wallets page. ",
	"You need to have at least .001 ETH in your account to cover the cost of gas. Please add some ETH and try again. ",
	"All gas would be used on this transaction. This means you have already voted on this proposal or the debate period has ended.",
	"Invalid symbol",
    "The server reject the creation of the wallet."];
globalFuncs.successMsgs = [
	"Valid address",
	"Wallet successfully decrypted",
	"Transaction submitted. TX ID: ",
	"Your wallet was successfully added: ",
	"You have successfully voted. Thank you for being an active participant in The DAO.",
	"File Selected: "];
globalFuncs.gethErrors = {
        "Invalid sender": "GETH_InvalidSender",
        "Nonce too low": "GETH_Nonce",
        "Gas price too low for acceptance": "GETH_Cheap",
        "Insufficient balance": "GETH_Balance",
        "Account does not exist or account balance too low": "GETH_NonExistentAccount",
        "Insufficient funds for gas * price + value": "GETH_InsufficientFunds",
        "Intrinsic gas too low": "GETH_IntrinsicGas",
        "Exceeds block gas limit": "GETH_GasLimit",
        "Negative value": "GETH_NegativeValue"};
globalFuncs.gethErrorMsgs = {};
globalFuncs.getGethMsg = function(str) {
	if (str in this.gethErrors) {
		var key = this.gethErrors[str];
		if (key in this.gethErrorMsgs) {
			return this.gethErrorMsgs[key];
		}
	}
	return str;
}
globalFuncs.scrypt = {
	n: 1024
};
globalFuncs.postDelay = 300;
globalFuncs.kdf = "scrypt";
globalFuncs.defaultTxGasLimit = 21000;
globalFuncs.digixClaimTxGasLimit = 150000;
globalFuncs.donateAddress = "0x1234567890abcdef1234567890abcdef12345678";
globalFuncs.isNumeric = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
globalFuncs.urlGet = function(name) {
	if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) return this.stripTags(decodeURIComponent(name[1]));
}
globalFuncs.stripTags = function(str) {
	var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	while (SCRIPT_REGEX.test(str)) {
		str = str.replace(SCRIPT_REGEX, "");
	}
	return str;
}
globalFuncs.checkAndRedirectHTTPS = function() {
	var host = "myetherwallet.com";
	var githost = "kvhnuke.github.io";
	var githostw = "www.kvhnuke.github.io";
	var hostw = "www.myetherwallet.com";
	if ((host == window.location.host || githost == window.location.host || hostw == window.location.host || githostw == window.location.host) && (window.location.protocol != "https:")) window.location.protocol = "https";
}
globalFuncs.isStrongPass = function(password) {
    
    var regularExpression = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$/;
    return password.length >= 8 && regularExpression.test(password);
}
globalFuncs.hexToAscii = function(hex) {
	return hex.match(/.{1,2}/g).map(function(v) {
		return String.fromCharCode(parseInt(v, 16));
	}).join('');
}
globalFuncs.isAlphaNumeric = function(value){
    return !/[^a-zA-Z0-9]/.test(value);
}

globalFuncs.isIos = function (){
    return device.platform=="iOS";
}

globalFuncs.readCordovaDir = function(success){
        var directory = cordova.file.externalRootDirectory;
            var subdir = "";
            if (device.platform=="iOS"){
                directory = cordova.file.documentsDirectory;
                subdir='';
            }
            window.resolveLocalFileSystemURL(directory, function(dirEntry) {
                var directoryReader = dirEntry.createReader();
                // Get a list of all the entries in the directory
                directoryReader.readEntries(success,function(error) {
                    alert(error);
                    console.log("Failed to list directory contents: ", error);
                    });
            });
    }
 



globalFuncs.generateSaveQR = function(){
       var qrcode = new QRCode(document.getElementById("qrcode_print"),localStorage.getItem('LemanWallet'));
       
       document.getElementById("qrcode_print").style.display = "none";
}

globalFuncs.dowloadAppFile = function(wallet, file_content){
    globalFuncs.dowloadAppFileWithName('LEM_'+wallet.getAddressString()+'.dat',file_content);
 }
    
globalFuncs.dowloadAppFileWithName = function(name, file_content){
      var directory = cordova.file.externalRootDirectory;
       var subdir = "";
       if (device.platform=="iOS"){
           directory = cordova.file.documentsDirectory;
           subdir='';
       }
       
       var pathToFile = directory;
       window.resolveLocalFileSystemURL(directory, function (dir) {
           dir.getFile(subdir+name, {create:true}, function(fileEntry) {
            writeFile(fileEntry, file_content);
           });
       });
    }
    
 globalFuncs.dowloadCsvFileWithName = function(name, file_content){
      var directory = cordova.file.externalRootDirectory;
       var subdir = "";
       if (device.platform=="iOS"){
           directory = cordova.file.documentsDirectory;
           subdir='';
       }
       
       var pathToFile = directory;
       window.resolveLocalFileSystemURL(directory, function (dir) {
           dir.getFile(subdir+name, {create:true}, function(fileEntry) {
            writeFileCSV(fileEntry, file_content);
           });
       });
    }
    
  
    function writeFile(fileEntry, file_content) {
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            alert("Fichier enregistré :\n"+fileEntry.fullPath);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
         //    alert("Failed file write: " + e.toString());
        };
        
        fileWriter.write(JSON.stringify(file_content));
    });
}

  function writeFileCSV(fileEntry, file_content) {
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            alert("Fichier enregistré :\n"+fileEntry.fullPath);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
         //    alert("Failed file write: " + e.toString());
        };
        
        fileWriter.write(file_content);
    });
}

globalFuncs.wrapImgData=function(img){
    if (img.substring(0, 4) == "url("){
        img=img.substring(4,img.length-5);
        if (img.substring(0, 1) == '"'){
            img=img.substring(1,img.length-2)
        }

    }
    return img;

}


globalFuncs.generateSavePDF = function(callback){
            var newImg = new Image();
            newImg.callback=callback;
            newImg.onload = function() {
                var height = this.naturalHeight;
                var width = this.naturalWidth;
               
                var c = document.createElement('canvas');
                c.height = height;
                c.width = width;
                var ctx = c.getContext("2d");
                ctx.drawImage(newImg, 0, 0);
                var logoData = c.toDataURL('image/png');
          
                var imgData = document.getElementById("qrcode_print").getElementsByTagName('img')[0].src;
                var imgAddData = globalFuncs.wrapImgData(document.getElementById("addressIdenticon").style.backgroundImage);
            
                var doc = new jsPDF();
                doc.setFontSize(32);
                doc.text(62, 25, 'Votre Portefeuille');
                doc.setLineWidth(1.0);
                doc.line(60, 27, 150, 27);
                doc.addImage(imgAddData, 'PNG', 120, 35, 30, 30);
                doc.addImage(logoData, 'PNG', 60, 35, 30, 30);
                doc.setFontSize(24);
                doc.addImage(imgData, 'PNG', 15, 75, 180, 180);
                doc.setFontSize(12);
                var lines = doc.splitTextToSize(localStorage.getItem('LemanWallet'), 180, {});
                doc.text(15, 265, lines);
               
                newImg.callback(doc);
            }

            newImg.src = "images/lem.png";              
}
    
    
globalFuncs.generateSaveAdrPDF = function(walletAddress, callback){
            var newImg = new Image();
            newImg.callback=callback;
            newImg.walletAddress=walletAddress;
            newImg.onload = function() {
                var height = this.naturalHeight;
                var width = this.naturalWidth;
               
                var c = document.createElement('canvas');
                c.height = height;
                c.width = width;
                var ctx = c.getContext("2d");
                ctx.drawImage(newImg, 0, 0);
                var iciData = c.toDataURL('image/png');
          
                var imgData = document.getElementById("qr_qdd").getElementsByTagName('img')[0].src;
            
                var imgAddData = globalFuncs.wrapImgData(document.getElementById("addressIdenticon").style.backgroundImage);
        
                var doc = new jsPDF('landscape');
           
                doc.addImage(iciData, 'PNG', 15, 12, 128, 186);
            
                doc.addImage(imgAddData, 'PNG', 173, 31, 30, 30);
            
                doc.setFontSize(24);
      
                var lines = doc.splitTextToSize(newImg.walletAddress, 65, {});
                doc.text(208, 40, lines);
            
                doc.addImage(imgData, 'PNG', 168, 75, 108, 108);
               
                newImg.callback(doc);
            }

            newImg.src = "images/ici.png";              
}



 
globalFuncs.loadWallets= function(with_check){
    try{
        var wallets = JSON.parse(localStorage.getItem('LemanWallets')); 
      } catch(e){}
      
      if (!wallets){
          wallets=[]; 
      }  
      
      if (with_check){
         try{
          var current = JSON.parse(localStorage.getItem('LemanWallet'));
          if (current){
              var found=false;
              for (var id in wallets){
                  if (wallets[id].address.toUpperCase()==current.address.toUpperCase()){
                      found=true;
                  }
              }
              if (!found){
                  wallets.push({address:current.address, name:'', file:current});
                  localStorage.setItem('LemanWallets',JSON.stringify( wallets));
              }
          }
         } catch(e){}
      }
      
      return wallets
    }
 
globalFuncs.getWalletAddress = function(){
    var address='';
     try{
          var current = JSON.parse(localStorage.getItem('LemanWallet'));
          if (current){
              address='0x'+current.address;
          }
     } catch(e){}
     return address;
}





module.exports = globalFuncs;
