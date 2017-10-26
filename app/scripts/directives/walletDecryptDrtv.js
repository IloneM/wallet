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
var walletDecryptDrtv = function() {
	return {
        restrict : "E",
        template : '<div ng-controller=\'decryptWalletCtrl\' > <div ng-hide=\'hideWalletSelector\'>\n\
                      <section class="row"  >\n \
                       <div class=" col-md-12">\n \
                        <div class="row grp"> \n \
                         <div class="col-md-12 ">\n \
                          <div class="row "> \n \
                           <div class="col-md-12 " align="center">\n \
                            <div class="identiconWrapper" style="max-width:60px;">\n \
                             <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="0x{{currWallet.address}}"  watch-var="wal" ></div>\n \
                            </div>\n \
                           </div>\n \
                           <div class="col-md-12 " align="center">\n \
                             {{currWallet.name}}\n\
                           </div>\n \
                          </div>\n \
                          <div class="row "> \n \
                           <div class="col-md-12 ">\n \
                             <label translate="DCRY_Enter_psw"> Entrez votre mot de passe: </label>\n \
                           </div>\n \
                          </div>\n \
                          <div class="row "> \n \
                           <div class="col-md-12 ">\n \
                             <input class="form-control" type="password" placeholder="{{ \'DCRY_Placeholder_psw\' | translate }}" id="passwdField" ng-model="$parent.$parent.filePassword" ng-change="onFilePassChange()" onkeypress=" if(event.keyCode == 13){document.getElementById(\'openBtn\').click();}" />\n \
                           </div>\n \
                          </div>\n \
                          <div class="row "> \n \
                           <div class="col-md-12 ">\n \
                             &nbsp;\n \
                           </div>\n \
                          </div>\n \
                          <div class="row "> \n \
                           <div class="col-md-12 ">\n \
                             <a class="btn btn-primary btn-block btnAction" id="openBtn" ng-click="decryptWallet()" translate="DCRY_OK"> OK </a>\n \
                             <div ng-bind-html="decryptStatus"></div>\n \
                           </div>\n \
                          </div>\n \
                         </div>\n \
                        </div>\n \
                        <div class="row grp"> \n \
                         <div class="col-md-12 ">\n \
                          <div class="row "> \n \
                           <div class="col-md-12 ">\n \
                            <label translate="DCRY_Close_title" > Fermer le portefeuille pour en changer:</label>\n \
                           </div>\n \
                          </div>\n \
                          <div class="row "> \n \
                           <div class="col-md-12 ">\n \
                             &nbsp;\n \
                           </div>\n \
                          </div>\n \
                          <div class="row "> \n \
                           <div class="col-md-12 ">\n \
                             <a class="btn btn-primary btn-block btnAction"  id="forgetWalletBtn" ng-click="confirmForgetWallet()" translate="DCRY_Close_btn"> Changer de portefeuille </a>\n \
                           </div>\n \
                          </div>\n \
                         </div>\n \
                        </div>\n \
                       </div>\n \
                      </section>\n\
                   </div>'
  };
};
module.exports = walletDecryptDrtv;

