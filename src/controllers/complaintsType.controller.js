const ComplaintType = require('../models/ComplaintType')
const complaintsTypeController = {}

complaintsTypeController.getComplaintsType = async (req, res) => {
    const complaintsType = await ComplaintType.find()
    res.json(complaintsType)
}

complaintsTypeController.getComplaintType = async (req, res) => {
    const complaintType = await ComplaintType.findById(req.params.id)
    res.json(complaintType)
}

complaintsTypeController.addComplaintType = async (req, res) => {
    const { type } = req.body
    const newComplaintType = new ComplaintType({ type })
    // await newComplaintType.save()
    // res.json(newComplaintType)
    await newComplaintType.save((err, product) => {
        if (err) {
            res.json(err)
        }
        if (product) {
            res.json(product)
        }
    })
}

complaintsTypeController.updateComplaintType = async (req, res) => {
    const { type } = req.body
    const oldComplaintType = await ComplaintType.findByIdAndUpdate(req.params.id, { type }, { omitUndefined: true })
    res.json(oldComplaintType)
}

complaintsTypeController.deleteComplaintType = async (req, res) => {
    const deletedComplaint = await ComplaintType.findByIdAndDelete(req.params.id)
    res.json(deletedComplaint)
}

module.exports = complaintsTypeController