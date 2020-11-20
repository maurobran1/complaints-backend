const { Schema, model } = require('mongoose')

const complaintStateSchema = new Schema({
    state: { type: String, required: false },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('ComplaintStateSchema', complaintStateSchema)