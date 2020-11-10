const { Schema, model } = require('mongoose')

const complaintSchema = new Schema({
    type: { type: String, required: false },
    state: { type: String, required: false },
    plate: { type: String, required: false },
    address: { type: String, required: false },
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
    imagePath: { type: String, required: false }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Complaint', complaintSchema)