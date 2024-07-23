module.exports = (req, res, next) => {
    res.render('homePage', {
        token: req.params.token,
        actualPage: 'home'
    })
}