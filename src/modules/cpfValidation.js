module.exports = class {
    constructor(cpf) {
        this.cpf = cpf;
        this.numeroLimpo;
        this.numeroLimpoArray = [];
        this.verdadeiro;
    }

    limparCPF() {
        this.numeroLimpo = this.cpf;
        for (let i = 0; i < this.numeroLimpo.length; i++) {
            if (this.numeroLimpo[i] !== '.' && this.numeroLimpo[i] !== '-'){
                this.numeroLimpoArray.push(this.numeroLimpo[i])
            } else {
                continue
            }
        }
        return this.numeroLimpoArray
    }

    esquecerCPF() {
        this.numeroLimpoArray = [];
    }

    converterCPFEmNumero() {
        this.numeroLimpoArray = this.limparCPF().map((value) => parseInt(value))
        return this.numeroLimpoArray
    }

    somaDigitoUm() {
        let acum = 10;
        const somaPrimeiro = this.converterCPFEmNumero().reduce((acumF, valor, indice, array) => {
            if (indice < array.length - 2) {
                acumF += valor * acum
                acum--
            }
        return acumF
        }, 0)
        let primeiroNumero = 11 - (somaPrimeiro % 11);
        if (primeiroNumero > 9 ) primeiroNumero = 0;
        return primeiroNumero
    }

    somaDigitoDois() {
        let acum = 11;
        const somaSegundo = this.numeroLimpoArray.reduce((acumF, valor, indice, array) => {
        if (indice < array.length - 1) {
            acumF += valor * acum
            acum--
        }
            return acumF
        }, 0)
        let segundoNumero = 11 - (somaSegundo % 11);
        if (segundoNumero > 9 ) segundoNumero = 0;
        return segundoNumero
    }

    verificarSequencia() {
        const possivelSequencia = this.numeroLimpoArray.filter((valor) => valor === this.numeroLimpoArray[0])
        return !(possivelSequencia.length === 11)
    }

    verificacaoUm() {
        return this.somaDigitoUm() === this.numeroLimpoArray[9];
    }
    
    verificacaoDois() {
        return this.somaDigitoDois() === this.numeroLimpoArray[10];
    }

    verificaçãoGeral() {
        return (this.verificacaoUm() && this.verificacaoDois() && this.verificarSequencia())
    } 
}

