const express = require('express');
const route = express.Router();

const tokenMiddleware = require('./src/middlewares/tokenVerificationMiddleware.js');

const encryptionMiddleware = require('./src/middlewares/encryptionMiddleware.js');

const loginController = require('./src/controllers/loginController');
const longinMiddleware = require('./src/middlewares/loginMiddleware');

const homeController = require('./src/controllers/homeController')

const dataController = require('./src/controllers/dataController');
const newPatientMiddleware = require('./src/middlewares/newPatientMiddleware');

const detailsPatient = require('./src/controllers/detailsPatientController');
const detailsPatientMiddleware = require('./src/middlewares/detailsPatientMiddleware');

const calendarController = require('./src/controllers/calendarController.js');

const detailsDayController = require('./src/controllers/detailsDayController.js');
const detailsDayMiddleware = require('./src/middlewares/consultationMiddleware.js');

const oldConsultation = require('./src/controllers/oldConsultationController.js');

route.get('/login', loginController.loginGet);
route.post('/login', longinMiddleware, loginController.loginVerification);

route.get('/home:token', homeController, tokenMiddleware);

route.get('/data:token', tokenMiddleware, dataController.dataGet);
route.post('/data:token', tokenMiddleware, newPatientMiddleware, encryptionMiddleware, dataController.dataPost);

route.get('/detailsPatient:patientID.:token', tokenMiddleware, detailsPatient.detailsPatientGet);
route.post('/detailsPatient:patientID.:token', tokenMiddleware, detailsPatientMiddleware, encryptionMiddleware, detailsPatient.detailsPatientPost);

route.get('/calendar:token', tokenMiddleware, calendarController.get);
route.post('/calendar:token', tokenMiddleware, calendarController.post);

route.get('/detailsDay:date.:token', tokenMiddleware, detailsDayController.get);
route.post('/detailsDay:date.:token', tokenMiddleware, detailsDayMiddleware, encryptionMiddleware, detailsDayController.post);

route.post('/oldConsultations:date.:idPatient.:token', tokenMiddleware, oldConsultation)

module.exports = route;