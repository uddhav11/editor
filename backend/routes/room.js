const {
     CreateRoom,
      JoinRoomRequest,
      HandleJoinRequest,
      inviteUser,
      handleInvite,
      LeaveRoom,
      getRoom,
      getInvites,
      searchRoomByName,
      getAllRooms,
      getARoom,
      getJoinRequest,
}= require('../controller/room.js');
const express = require('express');
const router = express.Router();

const ProtectRoute = require('../middleware/authMiddleware')

router.post('/create', ProtectRoute, CreateRoom);
router.post('/request', ProtectRoute, JoinRoomRequest);
router.post('/:roomId/requests/:requestId', ProtectRoute, HandleJoinRequest)
router.post('/:roomId/invite', ProtectRoute, inviteUser)
router.post('/invites/:inviteId', ProtectRoute, handleInvite)
router.post('/:roomId/leave', ProtectRoute, LeaveRoom)
router.get("/getroom", ProtectRoute, getRoom)
router.get("/invites", ProtectRoute, getInvites); // GET /api/invites
router.get("/search", ProtectRoute, searchRoomByName);
router.get("/all",ProtectRoute, getAllRooms);
router.post("/room",ProtectRoute, getARoom);
router.get("/:roomId/requests", ProtectRoute, getJoinRequest);





module.exports= router;