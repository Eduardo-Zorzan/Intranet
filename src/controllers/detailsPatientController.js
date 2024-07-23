const Patients = require('../models/patientModel');
const dataDB = require('../modules/getData');


exports.detailsPatientGet =  async (req, res, next) => {
    const getDataFromDB = new dataDB ();
    const data = await getDataFromDB.getData()
    res.render('detailsPatient', { 
        dataFromDB: JSON.stringify(data),
        patientID: req.params.patientID,
        name: req.body.name,
        cpf: req.body.cpf,
        birth: req.body.birth,
        sus: req.body.sus,
        obs: req.body.obs,
        listBlank: '',
        cpfError: '',
        actualPage: 'detailsPatient'
    });
    next()
}

exports.detailsPatientPost = async (req, res, next) => {
    let id = req.params.patientID; 
    switch (req.body.buttonHidden) {
        case ('delete'): await Patients.findByIdAndDelete(id); break;
        case ('update'): await Patients.findByIdAndUpdate(id, {
            name: req.body.name,
            cpf: req.body.cpf,
            birth: req.body.birth,
            sus: req.body.sus,
            obs: req.body.obs,
        }); break;
    }
    res.redirect(`/data${req.params.token}`)
}