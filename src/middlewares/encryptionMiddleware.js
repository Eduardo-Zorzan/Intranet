const aes = require('../modules/AEScryptography')
const encryption = new aes ([
    107, 219,  43, 184, 112, 236,  2, 144,
    96,  90,  97,  61,  38, 155, 162,  93,
    55, 157, 184, 198,  77,  68, 159, 148,
    37, 242, 149, 172,   0,   9, 113, 172
    ], [
    232, 246, 52,  28,  50, 25,
    40,   9, 62, 156, 109, 50,
    209, 215,  5,  98
    ]);

module.exports = (req, res, next) => {
    for (let i in req.body) {
        switch (i) {
            case ('name'): req.body[i] = encryption.encrypting(req.body[i]); break;
            case ('cpf'): req.body[i] = encryption.encrypting(req.body[i]); break;
            case ('sus'): req.body[i] = encryption.encrypting(req.body[i]); break;
            case ('birth'): req.body[i] = encryption.encrypting(req.body[i]); break;
            case ('obs'): if (req.body[i]) req.body[i] = encryption.encrypting(req.body[i]); break;
            case ('patient'): req.body[i] = encryption.encrypting(req.body[i]); break;
            case ('timeConsultation'): req.body[i] = encryption.encrypting(req.body[i]); break;
        }
    }
    for (let i in req.params) {
        switch (i) {
            case ('date'): req.params[i] = encryption.encrypting(req.params[i]); break;
        }
    }
    next()
}