const ComplaintState = require('../models/ComplaintState')
const complaintsStateController = {}

complaintsStateController.getComplaintsState = async (req, res) => {
    const complaintsState = await ComplaintState.find()
    res.json(complaintsState)
}

complaintsStateController.getComplaintState = async (req, res) => {
    const complaintState = await ComplaintState.findById(req.params.id)
    res.json(complaintState)
}

complaintsStateController.addComplaintState = async (req, res) => {
    const { state } = req.body
    const newComplaintState = new ComplaintState({ state })
    // await newComplaintType.save()
    // res.json(newComplaintType)
    await newComplaintState.save((err, product) => {
        if (err) {
            res.json(err)
        }
        if (product) {
            res.json(product)
        }
    })
}

complaintsStateController.updateComplaintState = async (req, res) => {
    const { type: state } = req.body
    const oldComplaintState = await ComplaintState.findByIdAndUpdate(req.params.id, { state }, { omitUndefined: true })
    res.json(oldComplaintState)
}

complaintsStateController.deleteComplaintState = async (req, res) => {
    const deletedComplaintState = await ComplaintState.findByIdAndDelete(req.params.id)
    res.json(deletedComplaintState)
}

module.exports = complaintsStateController