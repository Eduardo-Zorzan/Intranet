export default class PutDataInTable {
    constructor () {
        this.tbody = document.querySelector('.container-table tbody');
        this.classList = ['name', 'cpf', 'sus', 'birth', 'obs'];
    }
    
    putDataInTable () {
        try {
            this.dataList = JSON.parse(document.querySelector('.data-from-db').value);
            for (let i of this.dataList) {
                this.formatDate(i);
                this.createPerson(i);
            }
        } catch (e) {
            console.log(e)
        }
    }

    formatDate (object) {
        let dateFilter = object.birth.slice(0, 10);
        dateFilter = dateFilter.replaceAll('-', '/');
        dateFilter = this.reverseString(dateFilter);
        object.birth = dateFilter;
    }

    reverseString (string) {
        let stringArray = string.split('/');
        [stringArray[0], stringArray[2]] = [stringArray[2], stringArray[0]];
        return stringArray.join('/')
    }

    createPerson (object) {
        const tr = this.createTr(object._id);
        const td = this.createTd(object);
        for (let i of td) tr.appendChild(i);
        this.tbody.appendChild(tr);
    } 

    createTr (id) {
        const tr = document.createElement('tr')
        tr.classList.add(`person-${id}`)
        return tr
    }

    createTd (object) {
        const listTd = [];
        for (let i in this.classList) {
            let td = document.createElement('td')
            td.classList.add(`${this.classList[i]}`);
            this.putDataInTd(td, i, object)
            listTd.push(td)
        }
        return listTd
    }

    putDataInTd (element, acumulator, object) {
        if (parseInt(acumulator) === 0) element.appendChild(this.createLinkPatient(object));
        else element.innerText = object[this.classList[acumulator]];
    }

    createLinkPatient (object) {
        let a = document.createElement('a');
        a.classList.add(`patient-link`);
        a.classList.add(`${object._id}`);
        a.setAttribute('href', `/detailsPatient${object._id}.`)
        a.innerText = object.name;
        return a
    }
}