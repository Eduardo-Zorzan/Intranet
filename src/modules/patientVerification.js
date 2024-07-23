const CpfValidation = require('./cpfValidation')

module.exports = class {
    constructor (object) {
        this.object = object;
        this.name = object.name;
        this.cpf = object.cpf;
        this.sus = object.sus;
        this.birth = object.birth;
        this.obs = object.obs;
        this.blankArray = [];
    }

    allVerifications () {
        const verification =
        this.blank() &&
        this.cpfVerification() &&
        this.injection()
        return verification
    }

    blank() {
        for (let i in this.object) if (!this.object[i] && 
            i !== 'obs' &&
            i !== 'button-hidden'
        ) this.blankArray.push(i);
        return this.blankArray.length === 0;
    }

    cpfVerification () {
        const cpfValidation = new CpfValidation(this.cpf);
        return cpfValidation.verificaçãoGeral() 
    }

    injection () {
        try {
            eval(this.name);
            eval(this.obs);
        } catch {
            return true
        }
        return false
    }
} 