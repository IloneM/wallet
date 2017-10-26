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
  var de = require('./de');
  var en = require('./en');
  var fr = require('./fr');
  var it = require('./it');

 var translate = function($translateProvider) {
  
  $translateProvider.translations(de.code, translate.marked(de.data));
  $translateProvider.translations(en.code, translate.marked(en.data));
  $translateProvider.translations(fr.code, translate.marked(fr.data));
  $translateProvider.translations(it.code, translate.marked(it.data));
  
  $translateProvider.preferredLanguage('fr');
  $translateProvider.useSanitizeValueStrategy(null);
 }

translate.marked = function(data) {
    var tData = data;
	for (var key in tData) if (tData.hasOwnProperty(key)) tData[key] = marked(tData[key]);
    return tData;
}
module.exports = translate;
