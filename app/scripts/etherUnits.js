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
var etherUnits = function() {}
etherUnits.unitMap = {
	'wei': '1',
	'kwei': '1000',
	'ada': '1000',
	'femtoether': '1000',
	'mwei': '1000000',
	'babbage': '1000000',
	'picoether': '1000000',
	'gwei': '1000000000',
	'shannon': '1000000000',
	'nanoether': '1000000000',
	'nano': '1000000000',
	'szabo': '1000000000000',
	'microether': '1000000000000',
	'micro': '1000000000000',
	'finney': '1000000000000000',
	'milliether': '1000000000000000',
	'milli': '1000000000000000',
	'ether': '1000000000000000000',
	'kether': '1000000000000000000000',
	'grand': '1000000000000000000000',
	'einstein': '1000000000000000000000',
	'mether': '1000000000000000000000000',
	'gether': '1000000000000000000000000000',
	'tether': '1000000000000000000000000000000'
};
etherUnits.getValueOfUnit = function(unit) {
	unit = unit ? unit.toLowerCase() : 'ether';
	var unitValue = this.unitMap[unit];
	if (unitValue === undefined) {
		throw new Error(globalFuncs.errorMsgs[4] + JSON.stringify(this.unitMap, null, 2));
	}
	return new BigNumber(unitValue, 10);
}
etherUnits.fiatToWei = function(number, pricePerEther) {
	var returnValue = new BigNumber(String(number)).div(pricePerEther).times(this.getValueOfUnit('ether')).round(0);
	return returnValue.toString(10);
}

etherUnits.toFiat = function(number, unit, multi) {
	var returnValue = new BigNumber(this.toEther(number, unit)).times(multi).round(5);
	return returnValue.toString(10);
}

etherUnits.toEther = function(number, unit) {
	var returnValue = new BigNumber(this.toWei(number, unit)).div(this.getValueOfUnit('ether'));
	return returnValue.toString(10);
}

etherUnits.toWei = function(number, unit) {
	var returnValue = new BigNumber(String(number)).times(this.getValueOfUnit(unit));
	return returnValue.toString(10);
}
module.exports = etherUnits;
