const Consultations = require('../models/dateModel');

const aes = require('../modules/AEScryptography');

const encryption = new aes([
    107, 219,  43, 184, 112, 236,  2, 144,
    96,  90,  97,  61,  38, 155, 162,  93,
    55, 157, 184, 198,  77,  68, 159, 148,
    37, 242, 149, 172,   0,   9, 113, 172
    ], [
    232, 246, 52,  28,  50, 25,
    40,   9, 62, 156, 109, 50,
    209, 215,  5,  98
    ]);

module.exports = class {
    constructor (month, year) {
        this.data;
        this.finishedConsultationsArray = [];
        this.notFinishedConsultationsArray = [];
        this.month = month;
        this.year = year;
    }
    
    async getConsultation () {
        this.data = await Consultations.where();
        this.data = this.decryptData(this.data);
        this.data = this.filterActualDate(this.data);
        this.filterFinished(this.data);
        return this.data
    }
    
    filterActualDate (data) {
        let newData = [];
        for (let i of data) {
            if (JSON.parse(i.date)[1] === this.month && JSON.parse(i.date)[2] === this.year) {
                newData.push(i);
            }
        }
        return newData
    }

    filterFinished(data) {
        for (let i of data) {
            if (i.finished) this.finishedConsultationsArray.push(JSON.parse(i.date));
            else this.notFinishedConsultationsArray.push(JSON.parse(i.date));
        }
    }

    decryptData (data) {
        for (let i of data) {
            for (let a in i) {
                switch (a) {
                    case ('patient'): i[a] = encryption.decrypting(i[a]); break;
                    case ('date'): i[a] = encryption.decrypting(i[a]); break;
                    case ('schedule'): i[a] = encryption.decrypting(i[a]); break;
                }
            }
        }
        return data
    }
}