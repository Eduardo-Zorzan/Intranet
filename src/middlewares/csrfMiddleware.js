exports.checkCsfrError = (err, req, res, next) => {
    if(err.code === 'EBADCSRFTOKEN') res.render('errorPage', {
        errorCode: err.code
    })
    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next()
}