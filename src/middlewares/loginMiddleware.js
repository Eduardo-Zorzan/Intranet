const userVerification = require('../modules/userVerification');
const cookieGenerator = require('../modules/cookieGenerator')


module.exports = async (req, res, next) => {
    const verif = new userVerification(req.body.user, req.body.password);
    const serverToken = async () => {
        req.session.token = cookieGenerator(30);
    }
    if (await verif.verification()) {
        await serverToken()
        next()
    } else {
        res.render('loginPage', {
            visibility: "visibility: visible;"
        })
    }
}