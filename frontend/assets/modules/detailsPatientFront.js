export default class DetailsPatient {
    constructor() {
        this.result = document.querySelector('.details-patient-screen');
        this.classClose = 'close-details';
        this.classUpdate = 'submit-details';
        this.classDelete = 'del-details';
        this.buttonHidden = document.querySelector('.button-hidden')
        this.opacity = document.getElementById('opacity');
        this.tbody = document.querySelector('.container-table tbody');
        this.classList = ['name', 'cpf', 'sus', 'birth', 'obs'];
        this.main = document.querySelector('.main-container-details');
    }

    addListener() {
        this.getPatient();
        this.errors();
        if (this.main) this.opacityOn()
        document.addEventListener('click', (event) => {
            let ev = event.target
            switch (ev.className) {
                case (this.classClose): event.preventDefault(); this.close(); break;
                case (this.classDelete): this.buttonHidden.value = 'delete'; break;
                case (this.classUpdate): this.buttonHidden.value = 'update'; break;
            }
        });
    }

    errors () {
        try {
            this.blank = JSON.parse(document.querySelector('.listBlank').value);
            this.cpf = JSON.parse(document.querySelector('.cpfError').value);
            if (this.cpf) this.cpfError();
            if (this.blank) {
                for (let i of this.blank) document.getElementById(i).style.backgroundColor = 'white'
                this.blankError()
            }
        } catch { 
            return
        }
    }
    
    blankError () {
        for (let i of this.blank) document.getElementById(i).style.backgroundColor = 'red'
    }

    cpfError () {
        if (JSON.parse(document.querySelector('.cpfError').value)) document.getElementById(this.classList[1]).style.backgroundColor = 'red'
        else document.getElementById(this.classList[1]).style.backgroundColor = 'white'
    }

    getPatient () {
        try {
            for (let i of this.classList) {
                if (!document.getElementById(i).value) this.getDataFromActualPatient(i);
            }
        } catch {
            return
        }
    }

    getDataFromActualPatient (acumulator) {
        let patientID = document.querySelector('.patientID').value;
        if (acumulator === 'birth') document.getElementById(acumulator).value = this.formatDate(document.querySelector(`
        .person-${patientID} .${acumulator}`)
        .outerText);
        else document.getElementById(acumulator).value = document.querySelector(`.person-${patientID} .${acumulator}`).outerText;
    }

    formatDate(date) {
        let dateList = date.split('/');
        [dateList[0], dateList[2]] = [dateList[2], dateList[0]];
        return dateList.join('-')
    }

    moveCsrf () {
        const csrfInput = document.querySelector('.csrf')
        document.querySelector(`.${this.classForm}`).appendChild(csrfInput)
    }
     
    opacityOn () {
        this.opacity.style.visibility = 'visible'
    }

    close () {
        this.result.innerHTML = '';
        this.opacityOff()
    }
    
    opacityOff () {
        this.opacity.style.visibility = 'hidden'
    }

    cleanInput (data) {
        let inputClean = []
        for (let i of data) inputClean.push(i.value)
        return inputClean
    }
}