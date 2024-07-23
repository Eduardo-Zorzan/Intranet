const PatientVerification = require('../modules/patientVerification');
const dataDB = require('../modules/getData');


module.exports = async (req, res, next) => {
    const verification = new PatientVerification(req.body);
    const getDataFromDB = new dataDB ();
    const data = await getDataFromDB.getData()
    if (verification.allVerifications() || req.body.buttonHidden === 'delete') {
        next()
    } else {
        res.render(`detailsPatient`, {
            dataFromDB: JSON.stringify(data),
            name: req.body.name,
            cpf: req.body.cpf,
            birth: req.body.birth,
            sus: req.body.sus,
            obs: req.body.obs,
            listBlank: JSON.stringify(verification.blankArray),
            cpfError: JSON.stringify(!verification.cpfVerification()),
            patientID: req.params.patientID,
            actualPage: 'detailsPatient'
        });
    }
}