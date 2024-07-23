const mongoose = require('mongoose');


const patientsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cpf: {type: String, required: true},
    sus: {type: String, required: true},
    birth: {type: String, required: true}, 
    obs: {type: String, required: false},
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      },
});


module.exports = mongoose.model('patients', patientsSchema)