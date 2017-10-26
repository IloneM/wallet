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
var ethFuncs = function() {}
ethFuncs.validateEtherAddress = function(address) {
	if (address.substring(0, 2) != "0x") return false;
	else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
	else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) return true;
	else
	return this.isChecksumAddress(address);
}
ethFuncs.isChecksumAddress = function(address) {
	return address == ethUtil.toChecksumAddress(address);
}
ethFuncs.validateHexString = function(str) {
	if (str == "") return true;
	str = str.substring(0, 2) == '0x' ? str.substring(2).toUpperCase() : str.toUpperCase();
	var re = /^[0-9A-F]+$/g;
	return re.test(str);
}
ethFuncs.sanitizeHex = function(hex) {
	hex = hex.substring(0, 2) == '0x' ? hex.substring(2) : hex;
	if (hex == "") return "";
	return '0x' + this.padLeftEven(hex);
}
ethFuncs.padLeftEven = function(hex) {
	hex = hex.length % 2 != 0 ? '0' + hex : hex;
	return hex;
}
ethFuncs.addTinyMoreToGas = function(hex) {
	hex = this.sanitizeHex(hex);
	return new BigNumber(hex).plus(etherUnits.getValueOfUnit('gwei')).toDigits(2).toString(16);
}
ethFuncs.decimalToHex = function(dec) {
	return new BigNumber(dec).toString(16);
}
ethFuncs.hexToDecimal = function(hex) {
	return new BigNumber(this.sanitizeHex(hex)).toString();
}
ethFuncs.contractOutToArray = function(hex) {
	hex = hex.replace('0x', '').match(/.{64}/g);
    for(var i=0;i<hex.length;i++){
        hex[i] = hex[i].replace(/^0+/, '');
        hex[i] = hex[i] == "" ? "0" : hex[i]; 
    }
    return hex;
}
ethFuncs.getNakedAddress = function(address) {
	return address.toLowerCase().replace('0x', '');
}
ethFuncs.getDeteministicContractAddress = function (address,nonce){
    address = address.substring(0, 2) == '0x' ? address : '0x'+address;
    return '0x'+ethUtil.sha3(ethUtil.rlp.encode([address,nonce])).slice(12).toString('hex');
}
ethFuncs.padLeft = function(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
ethFuncs.getDataObj = function(to, func, arrVals) {
	var val="";
    for(var i=0;i<arrVals.length;i++) val+=this.padLeft(arrVals[i],64);
    return {to: to, data: func+val};
}
module.exports = ethFuncs;
