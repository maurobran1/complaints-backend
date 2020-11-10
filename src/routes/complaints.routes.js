const { Router } = require('express')
const router = Router()
const complaintsController = require('../controllers/complaints.controller')

const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, `${new Date().toISOString()}${file.originalname}`.replace(':', '-'))
    }
})
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(new Error('Invalid file format'), false)
    }
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: fileFilter
})

router.get('/', complaintsController.getComplaints)
router.post('/', upload.single('complaintImage'), complaintsController.addComplaint)
router.get('/:id', complaintsController.getComplaint)
router.put('/:id', upload.single('complaintImage'), complaintsController.updateComplaint)
router.delete('/:id', complaintsController.deleteComplaint)

module.exports = router