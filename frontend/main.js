import 'regenerator-runtime/runtime';
import 'core-js/stable' ;

import './assets/styles/data.css';
import './assets/styles/home.css';
import './assets/styles/newPatient.css';
import './assets/styles/details.css';
import './assets/styles/calendar.css';
import './assets/styles/detailsDate.css';
import './assets/styles/styles.css';

import NewPatient from './assets/modules/newPatientFront';
import DetailsPatient from './assets/modules/detailsPatientFront';
import PutDataInTable from './assets/modules/putDataIntableFront';
import CheckToken from './assets/modules/checkTokenFront';
import Calendar from './assets/modules/createCalendarFront';
import DetailsDate from './assets/modules/detailsDateFront';

const actualPage = document.getElementById('actualPage').value;
const dataInTable = new PutDataInTable();
const details = new DetailsPatient();
const patient = new NewPatient();
const calendar = new Calendar();
const detailsDate = new DetailsDate();
const checkToken = new CheckToken();



switch (actualPage) {
    case ('data'): dataInTable.putDataInTable(); patient.addListener(); break;
    case ('newPatient'): dataInTable.putDataInTable(); patient.addListener(); break;
    case ('detailsPatient'): dataInTable.putDataInTable(); details.addListener(); patient.addListener(); break;
    case ('calendar'): calendar.createCalendar(); break;
    case ('detailsDay'): calendar.createCalendar(); detailsDate.addListener(); break;
}
checkToken.tokenPromise().then()
