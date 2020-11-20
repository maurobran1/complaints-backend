const Complaint = require('../models/Complaint')
const ComplaintType = require('../models/ComplaintType')
const ComplaintState = require('../models/ComplaintState')
const complaintsController = {}

complaintsController.getComplaints = async (req, res) => {
    const { minDate, maxDate, typeID, stateID } = req.body
    let query = {};
    if (minDate && maxDate) {
        query.date = { "$gte": new Date(minDate), "$lte": new Date(maxDate) };
    } else if (minDate && !maxDate) {
        query.date = { "$gte": new Date(minDate) };
    } else if (!minDate && maxDate) {
        query.date = { "$lte": new Date(maxDate) };
    }
    if (typeID) {
        query.typeID = typeID;
    }
    if (stateID) {
        query.stateID = stateID;
    }
    const complaints = await Complaint.find(query);

    res.json(complaints)
}

complaintsController.getComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
        res.json(complaint)
    } catch (e) {
        res.status(402).json(e);
    }
}

complaintsController.addComplaint = async (req, res) => {
    if (req.body.data) {
        req.body = JSON.parse(req.body.data)
    }
    console.log(req.body);
    console.log(req.files);
    try {
        const { typeID, plate, notes, date, location } = req.body

        // let imagePath
        // if (req.file) {
        //     imagePath = req.file.path
        //     console.log('ImagePath: ' + imagePath)
        // }

        let imagePaths = [];
        if (req.files) {
            for (const file of req.files) {
                imagePaths.push("http://localhost:5000/" + file.path)
            }
        }

        const complaintType = await ComplaintType.findById(typeID)
        const complaintState = await ComplaintState.findById('5fadb39b0cf94f1d687a5a4e');
        const newComplaint = new Complaint({ imagePaths, typeID: complaintType._id, type: complaintType.type, state: complaintState.state, stateID: complaintState._id, plate, location, notes, date })
        await newComplaint.save()
        res.json(newComplaint)
    } catch (error) {
        console.log(req.body)
        console.log(error)
        res.json(error);
    }
}

complaintsController.updateComplaint = async (req, res) => {
    const { images, image, typeID, stateID, plate, location, notes, date } = req.body
    let imagePath
    if (req.file) {
        imagePath = req.file.path
    }
    console.log(imagePath)
    try {
        const complaintType = await ComplaintType.findById(typeID)
        const complaintState = await ComplaintState.findById(stateID)
        const oldComplaint = await Complaint.findByIdAndUpdate(req.params.id, { images, image, typeID: complaintType._id, type: complaintType.type, stateID: complaintState._id, state: complaintState.state, plate, location, imagePath, notes, date }, { omitUndefined: true })
        res.json(oldComplaint)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

complaintsController.deleteComplaint = async (req, res) => {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id)
    res.json(deletedComplaint)
}

complaintsController.deleteAllComplaints = async (req, res) => {
    const deletedComplaints = await Complaint.deleteMany({})
    res.json(deletedComplaints.deletedCount + " deleted complaints")
}

complaintsController.addComplaintTest = async (req, res) => {
    try {
        const { images } = req.body
        const newComplaint = new Complaint({ images })
        await newComplaint.save()
        res.json(newComplaint)
    } catch (error) {
        console.log(req.body)
        res.json(error);
    }
}

module.exports = complaintsController