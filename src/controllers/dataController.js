const Patients = require('../models/patientModel');
const dataDB = require('../modules/getData');


exports.dataGet = async (req, res, next) => {
    const getDataFromDB = new dataDB ();
    const data = await getDataFromDB.getData();
    res.render('data', { dataFromDB: JSON.stringify(data), actualPage: 'data' });
    next()
}

exports.dataPost = async (req, res, next) => {
    const patientInformation = new Patients ({
        name: req.body.name,
        cpf: req.body.cpf,
        birth: req.body.birth,
        sus: req.body.sus,
        obs: req.body.obs
    });
    await patientInformation.save();
    res.redirect(`/data${req.params.token}`);
}