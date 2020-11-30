const { Schema, model } = require('mongoose')

const complaintSchema = new Schema({
    typeID: { type: String, required: false },
    type: { type: String, required: false },
    stateID: { type: String, required: false },
    state: { type: String, required: false },
    plate: { type: String, required: false },
    location: {
        coordinates: {
            lat: { type: Number, required: false },
            lng: { type: Number, required: false }
        },
        address: { type: String, required: false },
    },
    date: { type: Date, required: false },
    imagePaths: [{ type: String, required: false }],
    notes: { type: String, required: false },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Complaint', complaintSchema)