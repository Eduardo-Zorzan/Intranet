const express = require('express')
const app = express();

exports.loginGet = (req, res, next) => {
    req.session.token = '';
    res.render('loginPage', {
        visibility: `visibility:hidden;`,
        actualPage: 'login'
    });
    next();
}

exports.loginVerification = (req, res, next) => {
    res.redirect(`/home${req.session.token}`);
}