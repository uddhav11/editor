const express= require('express')
const router= express.Router()
const ProtectRoute = require('../middleware/authMiddleware')

const executionController = require('../controller/executionController')

router.post('/execute', ProtectRoute, executionController.executeCode)
router.get('/room/:roomId/submissions', ProtectRoute, executionController.getRoomSubmissions)
router.get('/user/submissions', ProtectRoute, executionController.getUserSubmissions)


module.exports= router;