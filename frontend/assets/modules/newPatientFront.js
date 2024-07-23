import CheckToken from "./checkTokenFront";

export default class NewPatient {
    constructor () {
        this.classItem = 'new-patient';
        this.result = document.querySelector('.new-patient-screen');
        this.classClose = 'close';
        this.classAdd = 'submit';
        this.classForm =  'newPatient-form';
        this.opacity = document.getElementById('opacity');
        this.tbody = document.querySelector('.container-table tbody');
        this.acumulator = 0;
        this.classList = ['name', 'cpf', 'sus', 'birth', 'obs'];
    }

    addListener() {
        this.errors()
        document.addEventListener('click', (event) => {
            let ev = event.target
            switch (ev.className) {
                case (this.classItem): event.preventDefault(); this.getUrl(ev); break;
                case (this.classClose): event.preventDefault(); this.close(); break;
            }
        })
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

    async getUrl (event) {
        const url = await fetch(event.getAttribute('href'))
        const urlHtml = await url.text()
        this.putInMain(urlHtml)
        this.moveCsrf();
        this.checkToken = new CheckToken('none', document.querySelector(`.${this.classForm}`));
        this.checkToken.getToken()
    }

    putInMain (text) {
        this.result.innerHTML = text;
        this.opacityOn()
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