const { Router } = require('express')
const router = Router()
const complaintsStateController = require('../controllers/complaintsState.controller')

router.get('/', complaintsStateController.getComplaintsState)
router.post('/', complaintsStateController.addComplaintState)
router.get('/:id', complaintsStateController.getComplaintState)
router.put('/:id', complaintsStateController.updateComplaintState)
router.delete('/:id', complaintsStateController.deleteComplaintState)

module.exports = router