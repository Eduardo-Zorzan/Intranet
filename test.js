function ordenateConsultations() {
    let ul = document.querySelector('.container-scheduled ul')
    let listLi = document.querySelectorAll('.container-scheduled li');
    for (let i in listLi) {
        if (i !== 0 && i !== 1 && !isNaN(parseInt(i))) {
            let acumulator = 0;
            while (listLi[i].classList[1] < listLi[acumulator].classList[1]) {
                acumulator++
                continue
            }
            let clone = listLi[acumulator].cloneNode(true);
            console.log(clone)
            ul.appendChild(clone);
            listLi[i].remove();
        }
    }
}