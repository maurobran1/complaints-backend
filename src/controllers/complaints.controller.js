const Complaint = require('../models/Complaint')
const complaintsController = {}

complaintsController.getComplaints = async (req, res) => {
    // const complaints = await Complaint.find()
    //res.json(complaints)
    const { minDate, maxDate, type, state } = req.body
    let query = {};
    if (minDate && maxDate) {
        query.createdAt = { "$gte": new Date(minDate), "$lte": new Date(maxDate) };
    } else if (minDate && !maxDate) {
        query.createdAt = { "$gte": new Date(minDate) };
    } else if (!minDate && maxDate) {
        query.createdAt = { "$lte": new Date(maxDate) };
    }
    if (type) {
        query.type = type;
    }
    if (state) {
        query.state = state;
    }
    const complaints = await Complaint.find(query);

    res.json(complaints)
}

complaintsController.getComplaint = async (req, res) => {
    const complaint = await Complaint.findById(req.params.id)
    res.json(complaint)
}

complaintsController.addComplaint = async (req, res) => {
    const { type, plate, address, lat, lng } = req.body
    let imagePath
    if (req.file) {
        imagePath = req.file.path
    }
    const newComplaint = new Complaint({ type, state: 'Received', plate, address, lat, lng, imagePath })
    await newComplaint.save()
    res.json(newComplaint)
}

complaintsController.updateComplaint = async (req, res) => {
    const { type, state, plate, address, lat, lng } = req.body
    let imagePath
    if (req.file) {
        imagePath = req.file.path
    }
    console.log(imagePath)
    const oldComplaint = await Complaint.findByIdAndUpdate(req.params.id, { type, state, plate, address, lat, lng, imagePath }, { omitUndefined: true })
    res.json(oldComplaint)
}

complaintsController.deleteComplaint = async (req, res) => {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id)
    res.json(deletedComplaint)
}

module.exports = complaintsController