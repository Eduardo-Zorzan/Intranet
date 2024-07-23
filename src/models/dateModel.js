const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    date: {type: String, required: true},
    schedule: {type: String, required: true},
    patient: {type: String, required: true},
    finished: {type: Boolean, required: true}
})

module.exports = mongoose.model('consultation', consultationSchema)