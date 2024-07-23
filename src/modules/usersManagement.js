require('dotenv').config()

const Users = require('../models/usersModel');
const mongoose = require('mongoose');
const encryption = require('../modules/AEScryptography')
const aes = new encryption()

const newUser = async (user, password) => {
    await mongoose.connect(process.env.CONNECTIONSTRING)
    user = aes.encrypting(user);
    password = aes.encrypting(password);
    if (!(await Users.findOne({user: user}))) {
        const userVar = new Users ({
            user: user,
            password: password
        })
        await userVar.save()
    } else console.log('username already used')
    await mongoose.connection.close()
}

const delUser = async (user, password) => {
    await mongoose.connect(process.env.CONNECTIONSTRING);
    user = aes.encrypting(user);
    password = aes.encrypting(password);
    const actualUser = await Users.findOne({user: user});
    if (actualUser) {
        if (actualUser.password === password) await Users.deleteOne({user: user});
        else console.log('password incorrect')
    }
    else console.log('user not found');
    await mongoose.connection.close()
}

newUser('userOne', '123');


 