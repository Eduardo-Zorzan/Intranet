const GetConsultationInCalendar = require('../modules/getConsultationInCalendar')

exports.get = async (req, res, next) => {
    let date = new Date();
    try {
        let dateFromPost = JSON.parse(req.query.newDate);
        const getConsultationInCalendar = new GetConsultationInCalendar(dateFromPost[0], dateFromPost[1]);
        await getConsultationInCalendar.getConsultation()
        res.render('calendar', {
            actualPage: 'calendar',
            dateFromServer: JSON.stringify(dateFromPost),
            consultationsFinished: JSON.stringify(getConsultationInCalendar.finishedConsultationsArray),
            consultationsNotFinished: JSON.stringify(getConsultationInCalendar.notFinishedConsultationsArray)
        })
    } catch {
        const getConsultationInCalendar = new GetConsultationInCalendar(date.getMonth() + 1, date.getFullYear());
        await getConsultationInCalendar.getConsultation()
        res.render('calendar', {
            actualPage: 'calendar',
            dateFromServer: JSON.stringify([date.getMonth() + 1, date.getFullYear()]),
            consultationsFinished: JSON.stringify(getConsultationInCalendar.finishedConsultationsArray),
            consultationsNotFinished: JSON.stringify(getConsultationInCalendar.notFinishedConsultationsArray)
        })
    }
}

exports.post = (req, res, next) => {
    let newMonth;
    let newYear = JSON.parse(req.body.actualDate)[1];
    if (req.body.statusButtons === 'next') newMonth = JSON.parse(req.body.actualDate)[0] + 1;
    if (req.body.statusButtons === 'previous') newMonth = JSON.parse(req.body.actualDate)[0] - 1;
    if (newMonth === 0) {
        if (newYear === 2024) {
            newYear = 2024;
            newMonth = 1;
        }
        else {
            newYear = JSON.parse(req.body.actualDate)[1] - 1;
            newMonth = 12;
        }
    };
    res.redirect(`/calendar${req.params.token}?newDate=${JSON.stringify([newMonth, newYear])}`)
}