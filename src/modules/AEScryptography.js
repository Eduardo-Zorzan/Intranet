const aesjs = require('aes-js');
module.exports = class {
    constructor (key, iv) {
        this.key = key;
        this.iv = iv;
    }

    encrypting (dataString) {
        const aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
        let dividedData = this.divideString(dataString);
        let encryptListHex = [];
        for (let i of dividedData) {
            let dataBytes = aesjs.utils.utf8.toBytes(i);
            let encryptedBytes = aesCbc.encrypt(dataBytes);
            encryptListHex.push(aesjs.utils.hex.fromBytes(encryptedBytes))
        }
        return encryptListHex.join('')
    }

    decrypting (dataHex) {
        const aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
        let joinedData = this.joinString(dataHex);
        let dataList = [];
        for (let i of joinedData) {
            let dataBytes = aesjs.utils.hex.toBytes(i);
            let decryptedBytes = aesCbc.decrypt(dataBytes);
            dataList.push(aesjs.utils.utf8.fromBytes(decryptedBytes))
        }
        return this.cleanData(dataList.join(''))
    }

    cleanData (string) {
        for (let i = string.length; i > 0; i--) {
            if (string[i - 1] !== '#') return string.substring(0, i);
        }
    }

    joinString (string) {
        let dataListHex = [];
        for (let i = 0; i < string.length; i += 32) {
            let subString = string.substring(i, i + 32);
            dataListHex.push(subString)
        }
        return dataListHex
    }

    divideString (string) {
        let stringArray = [];
        for (let i = 0; i < string.length; i += 16) {
            let subString = string.substring(i, i + 16);
            while (subString.length < 16) subString = subString + '#';
            stringArray.push(subString);
        }
        return stringArray
    }

    generateKey () {
        let key = [];
        while (key.length < 32) key.push(this.random(0, 255));
        return key
    }

    generateIv () {
        let iv = [];
        while (iv.length < 16) iv.push(this.random(0, 255));
        return iv
    }

    random (min, max) {
        return Math.floor((Math.random() * (max - min)) + min)
    }
}


