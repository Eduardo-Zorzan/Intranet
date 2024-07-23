export default class {
    constructor (uniqueLink, uniqueForm) {
        this.changed = [];
        this.uniqueForm = uniqueForm;
        this.uniqueLink = uniqueLink;
    }

    tokenPromise () {
        return new Promise ((resolve) => {
            resolve(this.getToken())
        })
    }

    getToken () {
        this.links = document.querySelectorAll('a');
        this.forms = document.querySelectorAll('form');
        try {
            this.token = document.getElementById('token').value;
            this.putParamsInURL(this.token);
            localStorage.setItem('access-token', this.token);
        } catch {
            try {
                this.token = localStorage.getItem('access-token');
                this.putParamsInURL(this.token);
            } catch (e) {
                window.alert(e)
            }
        }
    }

    putParamsInURL (token) {
        if (!this.uniqueForm) this.putTokenInForms(token);
        else if (this.uniqueForm === 'none') console.log();
        else this.uniqueForm.action += token;
        if (!this.uniqueLink) this.putTokenInLinks(token);
        else if (this.uniqueLink === 'none') console.log();
        else this.uniqueLink.href += token;
    }

    putTokenInLinks (token) {
        for (let i of this.links) {
            if(this.verifyChanged(i)) {
                if (!i.classList.contains('new-patient')) i.href += token;
                this.changed.push(i);
            }
        }
    }

    putTokenInForms (token) {
        for (let i of this.forms) {
            if(this.verifyChanged(i)) {
                if (!i.classList.contains('login-form')) i.action += token;
                this.changed.push(i);
            }
        }
    }

    verifyChanged (element) {
        for (let i of this.changed) if (element === i ) return false;
        return true
    }
}