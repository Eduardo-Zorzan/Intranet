const Users = require('../models/usersModel');
const encryption = require('../modules/AEScryptography');
const aes = new encryption ([
    107, 219,  43, 184, 112, 236,  2, 144,
    96,  90,  97,  61,  38, 155, 162,  93,
    55, 157, 184, 198,  77,  68, 159, 148,
    37, 242, 149, 172,   0,   9, 113, 172
    ], [
    232, 246, 52,  28,  50, 25,
    40,   9, 62, 156, 109, 50,
    209, 215,  5,  98
    ]);


module.exports = class {
    constructor (user, password) {
        this.user = user;
        this.password = password;
    }

    async verification () {
        this.user = aes.encrypting(this.user);
        this.password = aes.encrypting(this.password);
        const actualUser = await Users.findOne({user: this.user});
        return (actualUser && (actualUser.password === this.password))     
    }
}