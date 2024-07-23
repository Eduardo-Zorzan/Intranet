const Consultations = require('../models/dateModel')
const GetConsultations = require('../modules/getConsultation')
const GetConsultationInCalendar = require('../modules/getConsultationInCalendar')

exports.get = async (req, res, next) => {
    const getConsultations = new GetConsultations(req.params.date);
    const getConsultationInCalendar = new GetConsultationInCalendar(JSON.parse(req.params.date)[1], JSON.parse(req.params.date)[2])
    await getConsultationInCalendar.getConsultation()
    res.render('detailsDay', {
        actualPage: 'detailsDay',
        dateID: req.params.date,
        dateFromServer: JSON.stringify([JSON.parse(req.params.date)[1], JSON.parse(req.params.date)[2]]),
        actualDay: req.params.date,
        consultationsFromServer: JSON.stringify(await getConsultations.getConsultation()),
        listError: JSON.stringify([]),
        consultationsFinished: JSON.stringify(getConsultationInCalendar.finishedConsultationsArray),
        consultationsNotFinished: JSON.stringify(getConsultationInCalendar.notFinishedConsultationsArray)
    })
}

exports.post = async (req, res, next) => {
    const consultations = new Consultations ({
        patient: req.body.patient,
        date: req.params.date,
        schedule: req.body.timeConsultation,
        finished: false
    });
    await consultations.save();
    res.redirect(`/detailsDay${res.locals.dateBeforeEncrypting}.${req.params.token}`);
}