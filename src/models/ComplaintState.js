const { Schema, model } = require('mongoose')

const complaintStateSchema = new Schema({
    state: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('ComplaintStateSchema', complaintStateSchema)