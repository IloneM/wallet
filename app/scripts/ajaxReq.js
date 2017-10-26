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

    /* AJAX Request to the backend*/
    'use strict';

    var http;
    var ajaxReq = function() {}
    //////////////////////////////////////////////////
    ajaxReq.baseURL = "https://api.monnaie-leman.org";
    //////////////////////////////////////////////////
    
    ajaxReq.http = null;
    ajaxReq.postSerializer = null;
    ajaxReq.SERVERURL = ajaxReq.baseURL+"/api.php";
    ajaxReq.ENROLLURL = ajaxReq.baseURL+"/enroll.php";
    ajaxReq.TRANLIST = ajaxReq.baseURL+"/trnslist.php";
    ajaxReq.EXPORTTRAN = ajaxReq.baseURL+"/export.php";
    ajaxReq.pendingPosts = [];
    ajaxReq.config = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};


    ajaxReq.getBalance = function(addr, callback) {
	    this.post({balance: addr}, callback);
    }
    ajaxReq.getTransactionData = function(addr, callback) {
	    this.post({txdata: addr}, callback);
    }
    ajaxReq.sendRawTx = function(rawTx, callback) {
	    this.post({rawtx: rawTx}, callback);
    }
    ajaxReq.getEstimatedGas = function(txobj, callback) {
	    this.post({estimatedGas: txobj}, callback);
    }
    ajaxReq.getEthCall = function(txobj, callback) {
	    this.post({ethCall: txobj}, callback);
    }
    ajaxReq.queuePost = function() {
        var data = this.pendingPosts[0].data;
        var callback = this.pendingPosts[0].callback;
      
        try{
	        this.http.post(this.SERVERURL, this.postSerializer(data), this.config).then(function(data) {
		        callback(data.data);
                ajaxReq.pendingPosts.splice(0, 1);
                if(ajaxReq.pendingPosts.length>0)
                    ajaxReq.queuePost();
	        });
        } catch(err) {
            console.log(err);
            ajaxReq.pendingPosts.splice(0, 1);
                if(ajaxReq.pendingPosts.length>0)
                    ajaxReq.queuePost();
        }
    }
    ajaxReq.post = function(data, callback) {
	    this.pendingPosts.push({data: data,callback: callback});

        if(this.pendingPosts.length==1){
            this.queuePost();
        }
    }

    ajaxReq.enrollPost = function(data,callback){
       
         this.http.post(this.ENROLLURL, this.postSerializer(data), this.config).then(function(data) {
		    callback(data.data);
	    });
    }
    
    ajaxReq.validateEnrollmentLetter = function(id, signature, callback){
        var data = {};
        data["id"]=id;
        data["signature"]=signature;
        ajaxReq.enrollPost({data: JSON.stringify(data)},callback);
    }
    
    ajaxReq.enrollAddress = function(id, address, token, callback){
        var data = {};
        data["id"]=id;
        data["adresse"]=address;
        data["token"]=token;
        ajaxReq.enrollPost({data: JSON.stringify(data)},callback);
    }
    
    ajaxReq.getTransList = function(id,count,offset, callback){
        this.http.get(ajaxReq.TRANLIST+"?addr="+id+"&count="+count+"&offset="+offset).then(function(data){
             callback(data.data);
        });
    }
    
    ajaxReq.getExportTransList = function(id,date_start,date_end, callback){
        this.http.get(ajaxReq.EXPORTTRAN+"?addr="+id+"&start="+date_start+"&end="+date_end).then(function(data){
             callback(data.data);
        });
    }
    
    
    
    ajaxReq.currBlock = function(callback){
        this.http.get(ajaxReq.SERVERURL).then(function(data){
             callback(data.data);
        });
    }
    
    ajaxReq.getBlock = function(hash, callback){
         this.http.get(ajaxReq.SERVERURL+"?hash="+hash).then(function(data){
             callback(data.data);
        });

    }
    
    
    
    

    module.exports = ajaxReq;
