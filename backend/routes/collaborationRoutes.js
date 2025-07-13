const express = require('express');
const router = express.Router();
const { getRoomForCollaboration } = require('../controller/roomCollaborationController');
const ProtectRoute = require('../middleware/authMiddleware');

router.get('/:roomId', ProtectRoute, getRoomForCollaboration);

module.exports = router;