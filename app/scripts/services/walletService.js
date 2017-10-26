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
var walletService = function() {
 
    function loadDelay(){
      var del=0;
      try{
           del = localStorage.getItem('LemanDelay'); 
      } catch(e){}
      if (!del){
        del=0; 
      }
      return del;
    }
    
	return {
        wallet: null,
        password:'',
        delay:loadDelay(),
        last_usage:new Date(),
        setDelay:function(_delay){
            this.delay=_delay;
            localStorage.setItem('LemanDelay', this.delay);
        },
        setUsed:function(){
                            this.last_usage=new Date();
                          },
        getPass:function getPass(){
                            if( (Date.now()-this.last_usage.getTime())/1000<this.delay){
                                return this.password;
                            } else {
                                return '';
                            }
                        }
        
    }
};
module.exports = walletService;
