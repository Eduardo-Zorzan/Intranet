module.exports = async (req, res, next) => {
    const serverToken = await req.session.token;
    const clientToken = req.params.token;
    if (serverToken === clientToken) {
        next()
    } else {
        res.redirect('/login')
    }
}