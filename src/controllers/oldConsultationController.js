const consultations = require('../models/dateModel')

module.exports = async (req, res, next) => {
    if (req.body.delete) {
        await consultations.findByIdAndDelete(req.params.idPatient);
    } else {
        await consultations.findByIdAndUpdate(req.params.idPatient, {
            finished: true,
        });
    };
    res.redirect(`/detailsDay${req.params.date}.${req.params.token}`);
}