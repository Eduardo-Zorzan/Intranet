export default class {
    constructor () {
        this.opacity = document.getElementById('opacity-consultation');
        this.closeButtonClass = 'close-consultation';
        this.screenConsultation = document.getElementById('consultation-screen');
        this.screenDate = document.querySelector('.display-date h1');
        this.arrayMonth = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
                            'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        this.optgroup = document.querySelector('.consultation-form optgroup');
        this.schedule = document.getElementById('consultationsFromServer');
        this.consultationUl = document.querySelector('.container-scheduled ul');
        this.consultationArray = document.getElementById('consultationsFromServer');
        this.inputButtons = document.getElementById('update-and-delete-consultation');
        this.inputName = document.getElementById('patient');
        this.select = document.getElementById('time-consultation');
    }

    addListener () {
        this.fixDate()
        this.putOptions()
        this.getConsultations()
        this.checkFreeSchedules()
        this.checkInputs()
        document.addEventListener('click', (event) => {
            let ev = event.target;
            if (ev.classList.contains(this.closeButtonClass)) this.close();
            if (ev.classList.contains('delete-consultations')) this.passDeleteForServer();
            if (ev.classList.contains('update-consultations')) this.passUpdateForServer();
        });
    }

    putOptions () {
        let i = 8;
        while (i <= 18) {
            if (i !== 12 && i !== 18) {
                let option = document.createElement('option');
                option.label = `${i}:00 - ${i + 1}:00` 
                option.value = option.label
                this.optgroup.appendChild(option)
            }
            i++
        }
    }

    fixDate () {
        this.dateArray = JSON.parse(this.screenDate.innerText);
        this.screenDate.innerText = `${this.dateArray[0]} de ${this.arrayMonth[this.dateArray[1]]} de ${this.dateArray[2]}`;
    }

    close () {
        this.screenConsultation.innerHTML = '';
        this.opacity.style.visibility = 'hidden';
        this.screenConsultation.style.visibility = 'hidden';
    }

    getConsultations () {
        this.arrayScheduleFull = [];
        this.consultationArray = JSON.parse(this.consultationArray.value);
        for (let i of this.consultationArray) {
            this.arrayScheduleFull.push(i.schedule)
            let li = document.createElement('li');
            li.classList.add(i._id);
            li.classList.add(this.fixScheduleNumber(i));
            this.createConsultation(li, i);
            this.consultationUl.appendChild(li);
            if (i.finished) this.finished(li);
            else this.createButtons(li, i);
        };
    }

    fixScheduleNumber (object) {
        let schedule = object.schedule.slice(0, 2);
        if (isNaN(parseInt(schedule[1]))) return schedule[0];
        return schedule
    }

    createConsultation (element, object) {
        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        p.innerHTML = `<b>${object.schedule}</b>` + ' - ' + object.patient;
        h2.appendChild(p);
        element.appendChild(h2)
    }

    createButtons (element, object) {
        let formButtons = document.createElement('form');
        this.csrf = document.querySelector('.csrf')
        let crsf = this.csrf.cloneNode(true);
        let div = document.createElement('div');
        div.classList.add('container-buttons-consultation')
        formButtons.action = `/oldConsultations${JSON.stringify(this.dateArray)}.${object._id}.`;
        formButtons.method = 'post';
        let buttonUpdate = document.createElement('button');
        let hiddenInput = document.createElement('input');
        hiddenInput.id = 'delete-or-update';
        hiddenInput.name = 'deleteOrUpdate';
        hiddenInput.type = 'hidden';
        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('delete-consultations');
        buttonUpdate.classList.add('update-consultations');
        buttonUpdate.innerText = 'Confirmar consulta';
        buttonDelete.innerText = 'Deletar';
        buttonDelete.name = 'delete';
        buttonUpdate.name = 'update';
        formButtons.appendChild(crsf);
        div.appendChild(buttonUpdate);
        div.appendChild(buttonDelete);
        formButtons.appendChild(div);
        formButtons.appendChild(hiddenInput);
        element.appendChild(formButtons);
    }

    finished (element) {
        element.style.opacity = 0.5;
        let p = document.createElement('p');
        p.innerText = 'Consulta já realizada';
        p.style.fontSize = '1em';
        p.style.fontWeight = 'bold';
        element.appendChild(p)
    }

    passDeleteForServer () {
        const allDeletes = document.querySelectorAll('.delete-consultations');
        for (let i of allDeletes) i.value = 'delete';
    }

    passUpdateForServer () {
        const allDeletes = document.querySelectorAll('.update-consultations');
        for (let i of allDeletes) i.value = 'update';
    }

    checkFreeSchedules () {
        let optGroup = document.querySelectorAll('optgroup option');
        for (let i of optGroup) {
            for (let a of this.arrayScheduleFull) {
                if (i.value === a) i.remove();
            }
        }
    }

    checkInputs () {
        let inputError = JSON.parse(document.getElementById('list-error').value);
        for (let i of inputError) {
            if (i === 'patient') this.inputName.style.backgroundColor = 'red';
            if (i === 'timeConsultation') this.select.style.backgroundColor = 'red';
        }
    }

}