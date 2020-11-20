const { Schema, model } = require('mongoose')

const complaintTypeSchema = new Schema({
    type: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('ComplaintType', complaintTypeSchema)