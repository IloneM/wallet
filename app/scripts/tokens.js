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
var Token = function(contractAddress, userAddress, symbol, decimal) {
	this.contractAddress = contractAddress;
	this.userAddress = userAddress
	this.symbol = symbol;;
	this.decimal = decimal;
	this.setBalance();
    this.balance = "loading";
}
Token.balanceHex = "0x70a08231";
Token.transferHex = "0xa9059cbb";

Token.prototype.getContractAddress = function() {
	return this.contractAddress;
}
Token.prototype.getUserAddress = function() {
	return this.userAddress;
}
Token.prototype.getSymbol = function() {
	return this.symbol;
}
Token.prototype.getDecimal = function() {
	return this.decimal;
}
Token.prototype.getBalance = function() {
	return this.balance;
}
Token.prototype.getBalanceBN = function() {
	return this.balanceBN;
}
Token.prototype.setBalance = function() {
	var balanceCall = ethFuncs.getDataObj(this.contractAddress, Token.balanceHex, [ethFuncs.getNakedAddress(this.userAddress)]);
	var parentObj = this;
	ajaxReq.getEthCall(balanceCall, function(data) {
		if (!data.error) {
			parentObj.balance = new BigNumber(data.data).div(new BigNumber(10).pow(parentObj.getDecimal())).toString();
			parentObj.balanceBN = new BigNumber(data.data).toString();
		}
	});
}
Token.prototype.getData = function(toAdd, value) {
	try {
		if (!ethFuncs.validateEtherAddress(toAdd)) throw 'ERROR_6';
		else if (!globalFuncs.isNumeric(value) || parseFloat(value) < 0) throw 'ERROR_8';
		var value = ethFuncs.padLeft(new BigNumber(value).times(new BigNumber(10).pow(this.getDecimal())).toString(16), 64);
		var toAdd = ethFuncs.padLeft(ethFuncs.getNakedAddress(toAdd), 64);
		var data = Token.transferHex + toAdd + value;
		return {
			isError: false,
			data: data
		};
	} catch (e) {
		return {
			isError: true,
			error: e
		};
	}
}
module.exports = Token;
