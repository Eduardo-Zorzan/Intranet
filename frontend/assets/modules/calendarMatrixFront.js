export default class {
    constructor () {
        this.matrix = [];
        this.actualDay = 31;
        this.actualMonth = 0;
        this.actualYear = 2024;
        this.lastDayOfMonth = this.actualDay;
        this.dayUTC = new Date().getDate();
        this.monthUTC = new Date().getMonth() + 1;
    };

    selectDate(month, year) {
        if (year < 2024) throw new Error('Invalid Date')
        let i = 0;
        while (i < ((year - 2024) * 12) + month) {
            this.createMonth()
            i++
        }
        return this.matrix;
    }

    createMonth() {
        this.matrix = [];
        this.countYears()
        for (let i = 0; i < 6; i++) {
            if (i === 4) {
                this.actualMonth++
                this.lastDayOfMonth = this.checkMonth();
            }
            this.matrix.push(this.createWeeks());
        }
        this.checkLastWeek()
        this.checkFirstWeek()
        this.fixMatrix()
        this.checkAdjacents()
        return this.matrix
    }

    checkAdjacents () {
        this.startAdjacents = [];
        this.finalAdjacents = [];
        for (let i of this.matrix[0]) {
            if (i > 7) this.startAdjacents.push(i)
        }
        for (let i of this.matrix[this.matrix.length - 1]) {
            if (i <= 7) this.finalAdjacents.push(i)
        }
    }

    countYears() {
        if (this.actualMonth + 1 > 12) {
            this.actualYear++;
            this.actualMonth = 0;
        }
    }

    fixMatrix () {
        let remainingDays;
        for (let i in this.matrix[this.matrix.length - 1]) {
            if (this.matrix[this.matrix.length - 1][i] === this.lastDayOfMonth) {
                remainingDays = i;
            }
        };
        this.actualDay = this.lastDayOfMonth - remainingDays;
    } 

    createWeeks () {
        let weekArray = [];
        for (let i = 0; i < 7; i++) {
            weekArray.push(this.actualDay);
            this.actualDay++
            if (this.actualDay > this.lastDayOfMonth) this.actualDay = 1;
        }
        return weekArray
    }

    checkLastWeek () {
        for (let i of this.matrix[5]) if (this.lastDayOfMonth === i) return;
        this.actualDay = this.matrix[4][6]
        this.matrix.pop()
    }

    checkFirstWeek () {
        for (let i of this.matrix[0]) if (i === 1) return;
        console.log(this.matrix)
        this.matrix.shift()
        console.log(this.matrix)
    }

    checkMonth () {
        if (this.actualMonth === 2 && (this.actualYear - 2024) % 4 === 0) return 29;
        if (this.actualMonth === 2 && (this.actualYear - 2024) % 4 !== 0) return 28;
        else if (this.actualMonth % 2 === 0 && this.actualMonth < 8) return 30;
        else if (this.actualMonth % 2 !== 0 && this.actualMonth < 8) return 31; 
        else if (this.actualMonth % 2 === 0 && this.actualMonth >= 8) return 31; 
        else if (this.actualMonth % 2 !== 0 && this.actualMonth >= 8) return 30; 
    }
}




