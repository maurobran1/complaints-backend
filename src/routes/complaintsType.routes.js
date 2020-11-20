const { Router } = require('express')
const router = Router()
const complaintsTypeController = require('../controllers/complaintsType.controller')

router.get('/', complaintsTypeController.getComplaintsType)
router.post('/', complaintsTypeController.addComplaintType)
router.get('/:id', complaintsTypeController.getComplaintType)
router.put('/:id', complaintsTypeController.updateComplaintType)
router.delete('/:id', complaintsTypeController.deleteComplaintType)

module.exports = router