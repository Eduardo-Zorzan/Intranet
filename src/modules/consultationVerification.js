const Consultations = require('../modules/getConsultation');

const aes = require('../modules/AEScryptography');

const encryption = new aes ([
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
    constructor (object) {
        this.object = object;
        this.patient = object.patient;
        this.errorArray = [];
    }

    async allVerifications () {
        let patient = (await this.patientExist()) && this.injection();
        let blank = this.blank()
        return patient && blank
    }

    async patientExist () {
        const checkPatient = new Consultations('0');
        const patientFromDB = await checkPatient.getPatient(this.patient);
        if (patientFromDB.length > 0) return true
        this.errorArray.push('patient')
        return false
    }

    blank() {
        if (this.object.timeConsultation) return true
        this.errorArray.push('timeConsultation')
        return false
    }

    injection () {
        try {
            eval(this.patient);
        } catch {
            return true
        }
        return false
    }
} 