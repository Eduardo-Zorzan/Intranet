require('dotenv').config()

const express = require('express');
const app = express();
const routes = require('./routes.js');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
    app.emit('connected');
})
.catch(e => console.log(e))

const session = require('express-session'); 
const MongoStore = require('connect-mongo');
const flashMessage = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf')



const {checkCsfrError, csrfMiddleware} = require('./src/middlewares/csrfMiddleware.js');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionSettings = session({
    secret:  process.env.SECRET,
    store: MongoStore.create({mongoUrl: (process.env.CONNECTIONSTRING)}),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
    }
});

app.use(flashMessage())
app.use(sessionSettings)

app.use(helmet())
app.use(csrf())
app.use(csrfMiddleware)
app.use(checkCsfrError)

app.use(routes)

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'src', 'views'))

app.on('connected', () => {
    app.listen(3000, () => {
        console.log('acesse a página do servidor em http://localhost:3000/login')
        console.log('servidor executando na porta 3000'); 
    })    
})
