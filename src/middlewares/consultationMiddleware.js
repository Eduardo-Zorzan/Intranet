const ConsultationVerification = require('../modules/consultationVerification');
const GetConsultations = require('../modules/getConsultation');
const GetConsultationInCalendar = require('../modules/getConsultationInCalendar');

module.exports = async (req, res, next) => {
    const checkConsultation= new ConsultationVerification(req.body)
    if (await checkConsultation.allVerifications()) {
        res.locals.dateBeforeEncrypting = req.params.date
        next()
    }
    else {
        const getConsultationInCalendar = new GetConsultationInCalendar(JSON.parse(req.params.date)[1], JSON.parse(req.params.date)[2])
        await getConsultationInCalendar.getConsultation()
        const getConsultations = new GetConsultations(req.params.date);
        res.render('detailsDay', {
            actualPage: 'detailsDay',
            dateID: req.params.date,
            dateFromServer: JSON.stringify([JSON.parse(req.params.date)[1], JSON.parse(req.params.date)[2]]),
            actualDay: req.params.date,
            consultationsFromServer: JSON.stringify(await getConsultations.getConsultation()),
            listError: JSON.stringify(checkConsultation.errorArray),
            consultationsFinished: JSON.stringify(getConsultationInCalendar.finishedConsultationsArray),
            consultationsNotFinished: JSON.stringify(getConsultationInCalendar.notFinishedConsultationsArray)
        })
    }

}