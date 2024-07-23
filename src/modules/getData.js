const Patients = require('../models/patientModel');
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
    constructor () {
        this.data;
    }

    async getData () {
        this.data = await Patients.where('');
        this.data = this.decryptData(this.data)
        return this.data
    }

    decryptData (data) {
        for (let i of data) {
            for (let a in i) {
                switch (a) {
                    case ('name'): i[a] = encryption.decrypting(i[a]); break;
                    case ('cpf'): i[a] = encryption.decrypting(i[a]); break;
                    case ('sus'): i[a] = encryption.decrypting(i[a]); break;
                    case ('birth'): i[a] = encryption.decrypting(i[a]); break;
                    case ('obs'): if (i[a]) i[a] = encryption.decrypting(i[a]); break;
                }
            }
        }
        return data
    }
}