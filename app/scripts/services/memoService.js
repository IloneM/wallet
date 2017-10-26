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
var memoService = function() {
    
     function getMemos(memos, force){
      if (force || !memos || memos.length==0){
         try{
           // Load memos stored in the local storage 
           memos = JSON.parse(localStorage.getItem('LemanMemos')); 
         } catch(e){
           memos=[]; 
         }
      }
      if (!memos){
        memos=[]; 
      }
      
      return memos;
     }
      
    function getMemoBlob(memos){
      return globalFuncs.getBlob("text/json;charset=UTF-8", memos );
    }
       
    function getMemo(memos, transHash){
       memos = getMemos(memos, false);
       var curr_memo='';
       for (var memId in memos){
           if (memos[memId].transaction==transHash){
               curr_memo = memos[memId].memo;
               break;
           }
       }
       return curr_memo;
    }
    
    function setMemo(memos,transHash,memo){
        memos = getMemos(memos, false);
        var found=-1;
        for (var memId in memos){
           if (memos[memId].transaction==transHash){
               found=memId;
               break;
           }
       }
       
       if (found>=0){
         memos.splice(found, 1);
       }
       
       if (memo.trim()!=''){
             memos.unshift( {transaction:transHash,memo:memo});
       }
       
       if (memos.length>100){
           memos.pop();
       }
        
       localStorage.setItem('LemanMemos',JSON.stringify( memos));
       return memos;
    }
    
    function checkAddress(address){
        return address && address.startsWith('0x');
    }
    
  
    
    
   
    
    return {getMemos:getMemos,
            getMemoBlob:getMemoBlob,
            getMemo:getMemo,
            setMemo:setMemo
    }
   
};
module.exports = memoService;
