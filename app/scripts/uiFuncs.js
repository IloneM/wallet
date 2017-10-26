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
var uiFuncs = function() {}

uiFuncs.isTxDataValid = function(txData) {
	if (txData.to != "0xCONTRACT" && !ethFuncs.validateEtherAddress(txData.to)) throw 'ERROR_6';
	else if (!globalFuncs.isNumeric(txData.value) || parseFloat(txData.value) < 0) throw 'ERROR_8';
	else if (!globalFuncs.isNumeric(txData.gasLimit) || parseFloat(txData.gasLimit) <= 0) throw 'ERROR_9';
	else if (!ethFuncs.validateHexString(txData.data)) throw 'ERROR_10';
	if (txData.to == "0xCONTRACT") txData.to = '';
}

uiFuncs.generateTx = function(txData, callback) {
	try {
		uiFuncs.isTxDataValid(txData);
		ajaxReq.getTransactionData(txData.from, function(data) {
			if (data.error) throw data.msg;
			data = data.data;
			var rawTx = {
				nonce: ethFuncs.sanitizeHex(data.nonce),
				gasPrice: ethFuncs.sanitizeHex(ethFuncs.addTinyMoreToGas(data.gasprice)),
				gasLimit: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(txData.gasLimit)),
				to: ethFuncs.sanitizeHex(txData.to),
				value: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(etherUnits.toWei(txData.value, txData.unit))),
				data: ethFuncs.sanitizeHex(txData.data)
			}
			var eTx = new ethUtil.Tx(rawTx);
            
            
			eTx.sign(new Buffer(txData.key, 'hex'));
			rawTx.rawTx = JSON.stringify(rawTx);
			rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
			rawTx.isError = false;
			if (callback !== undefined) callback(rawTx);
		});
	} catch (e) {
		if (callback !== undefined) callback({
			isError: true,
			error: e
		});
	}
}


uiFuncs.generateTxDelta = function(txData, callback) {
	try {
		uiFuncs.isTxDataValid(txData);
		ajaxReq.getTransactionData(txData.from, function(data) {
			if (data.error) throw data.msg;
			data = data.data;
			var rawTx = {
				nonce: ethFuncs.sanitizeHex('0x'+new BigNumber(parseInt(data.nonce, 16)+1).toString(16)),
				gasPrice: ethFuncs.sanitizeHex(ethFuncs.addTinyMoreToGas(data.gasprice)),
				gasLimit: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(txData.gasLimit)),
				to: ethFuncs.sanitizeHex(txData.to),
				value: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(etherUnits.toWei(txData.value, txData.unit))),
				data: ethFuncs.sanitizeHex(txData.data)
			}
			var eTx = new ethUtil.Tx(rawTx);
            
            
			eTx.sign(new Buffer(txData.key, 'hex'));
			rawTx.rawTx = JSON.stringify(rawTx);
			rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
			rawTx.isError = false;
			if (callback !== undefined) callback(rawTx);
		});
	} catch (e) {
		if (callback !== undefined) callback({
			isError: true,
			error: e
		});
	}
}




uiFuncs.sendTx = function(signedTx, callback) {
	ajaxReq.sendRawTx(signedTx, function(data) {
		var resp = {};
		if (data.error) {
			resp = {
				isError: true,
				error: globalFuncs.getGethMsg(data.msg)
			};
		} else {
			resp = {
				isError: false,
				data: data.data
			};
		}
		if (callback !== undefined) callback(resp);
	});
}

module.exports = uiFuncs;
