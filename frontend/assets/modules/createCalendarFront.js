import calendarMatrixFront from "./calendarMatrixFront";

export default class {
    constructor () {
        this.matrix = new calendarMatrixFront();
        this.grid = document.querySelector('.calendar-grid');
        this.buttonNext = document.getElementById('next');
        this.buttonPrevious = document.getElementById('previous');
        this.statusButtons = document.getElementById('statusButtons');
        this.displayMonth = document.querySelector('.display-month h1');
        this.daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
        this.consultationsFinished = document.getElementById('consultations-finished');
        this.consultationsNotFinished = document.getElementById('consultations-not-finished');
    }

    createCalendar (month, year) {
        this.dateFromServer = JSON.parse(document.getElementById('dateFromServer').value);
        if (!month || !year) {
            this.actualMatrix = this.matrix.selectDate(this.dateFromServer[0], this.dateFromServer[1]);
        } else this.actualMatrix = this.matrix.selectDate(month, year);
        for (let i of this.actualMatrix) this.createWeeks(i);
        this.addListenerButtons();
        this.checkAdjacents();
        this.passActualMonthToServer();
        this.addPreviewConsultations();
        this.displayMonth.innerText = `${this.monthString()} de ${this.matrix.actualYear}`;
    }

    createWeeks (array) {
        let acumulator = 0;
        for (let i of array) {
            this.createDay(i, acumulator)
            acumulator++
        }
    }

    createDay (dayWeek, acumulator) {
        let day = document.createElement('a');
        let h1 = document.createElement('h1');
        let h1Two = document.createElement('h1');
        let containerH1 = document.createElement('div');
        h1Two.innerText = this.daysOfWeek[acumulator];
        h1.innerText = dayWeek;
        day.classList.add(`date-${dayWeek}-${this.matrix.actualMonth}`);
        day.classList.add('day');
        containerH1.appendChild(h1);
        containerH1.appendChild(h1Two);
        day.appendChild(containerH1);
        let data = [dayWeek, this.matrix.actualMonth, this.matrix.actualYear]
        day.href = `/detailsDay${JSON.stringify(data)}.`;
        if (dayWeek === this.matrix.dayUTC && this.matrix.actualMonth === this.matrix.monthUTC) day.classList.add('actualDay');
        this.grid.appendChild(day);
    }

    checkAdjacents () {
        for (let i of this.matrix.startAdjacents) {
            let day = document.querySelectorAll(`.date-${i}-${this.matrix.actualMonth}`);
            if (day[0].classList.contains('actualDay')) day[0].classList.remove('actualDay');
            day[0].classList.add('adjacent');
        }
        for (let i of this.matrix.finalAdjacents) {
            let day = document.querySelectorAll(`.date-${i}-${this.matrix.actualMonth}`);
            if (day[day.length - 1].classList.contains('actualDay')) day[day.length - 1].classList.remove('actualDay');
            day[day.length - 1].classList.add('adjacent');
        }
    }

    passActualMonthToServer () {
        let inputDate = document.getElementById('actualDate')
        inputDate.value = JSON.stringify([this.matrix.actualMonth, this.matrix.actualYear])
    }

    monthString () {
        let monthArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
            'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]
        return monthArray[this.matrix.actualMonth - 1]
    }

    addListenerButtons () {
        this.buttonNext.addEventListener('click', (e) => {
            this.statusButtons.value = 'next';
        })
        this.buttonPrevious.addEventListener('click', (e) => {
            this.statusButtons.value = 'previous';
        })
    }

    addPreviewConsultations () {
        let allDays = document.querySelectorAll('.calendar-grid a');
        for (let i of allDays) {
            if (!i.classList.contains('adjacent')) {
                let container = document.createElement('div');
                container.id = 'preview-consultations';
                this.addNotFinishedConsultations(container, i);
                this.addFinishedConsultations(container, i);
                i.appendChild(container);
            }
        }
    }

    addFinishedConsultations (container, element) {
        let finishedCount = 0;
        let classArrayElement = element.classList[0].split('-');
        for (let i of JSON.parse(this.consultationsFinished.value)) {
            if (i[0] === parseInt(classArrayElement[1]) && i[1] === parseInt(classArrayElement[2])) finishedCount++;
        }
        if (finishedCount === 0) return;
        let div = document.createElement('div');
        let p = document.createElement('p');
        if (finishedCount === 1) p.innerText = `${finishedCount} Consulta Concluída`;
        else p.innerText = `${finishedCount} Consultas Concluídas`;
        div.classList.add('preview-consultations-finished');
        div.appendChild(p);
        container.appendChild(div);
    }

    addNotFinishedConsultations (container, element) {
        let notFinishedCount = 0;
        let classArrayElement = element.classList[0].split('-');
        for (let i of JSON.parse(this.consultationsNotFinished.value)) {
            if (i[0] === parseInt(classArrayElement[1]) && i[1] === parseInt(classArrayElement[2])) notFinishedCount++;
        }
        if (notFinishedCount === 0) return;
        let div = document.createElement('div');
        let p = document.createElement('p');
        if (notFinishedCount === 1) p.innerText = `${notFinishedCount} Consulta Agendada`;
        else p.innerText = `${notFinishedCount} Consultas Agendadas`;
        div.classList.add('preview-consultations-not-finished');
        div.appendChild(p);
        container.appendChild(div);
    }
}