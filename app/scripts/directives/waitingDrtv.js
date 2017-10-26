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
var waitingDrtv = function() {
	return {
        restrict : "E",
        template : ' <div class="glassPane" ng-hide="ready"> </div> \n\
                     <div class="waitingMsg" ng-hide="ready "> \n\
                       <span ng-hide="waiting_tran" translate="GP_Wait"></span> \n\
                       <span ng-show="waiting_tran" ng-bind-html="trans_message"></span>\n\
                       <button type="button" ng-hide="waiting_tran"class="btn btn-primary bellowmargin" \n\
                                onclick="location.reload();" translate="TRA_Refresh">Refresh </button> \n\
                       <button type="button" ng-show="waiting_tran" class="btn btn-primary bellowmargin" \n\
                                ng-click="dismissWaiting()" translate="TRA_Refresh">Refresh </button> \n\
                       <div class="waiting_tran" ng-show="waiting_tran"> \n\
                          <svg class="wt_svg"  width="300" height="300"  \n\
                               viewPort="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg"> \n\
                             <circle id="c1" r="75" cx="150" cy="150"/>\n\
                             <circle id="c2" r="65" cx="150" cy="150"/>\n\
                             <circle id="c3" r="40" cx="150" cy="150"/>\n\
                         </svg>\n\
                      </div>\n\
                    </div>'
  };
};
module.exports = waitingDrtv;
