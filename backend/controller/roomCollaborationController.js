const Room = require("../models/Room");
const User = require("../models/userModel");

exports.getRoomForCollaboration = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user._id;

    const room = await Room.findById(roomId)
      .populate('members.user', 'username profilepic')
      .populate('creator', 'username profilepic');

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if user is a member of the room
    const isMember = room.members.some(member => member.user._id.equals(userId));
    if (!isMember) {
      return res.status(403).json({ message: "Not a member of this room" });
    }

    res.status(200).json({
      room,
      currentUser: {
        id: req.user._id,
        username: req.user.username,
        profilepic: req.user.profilepic
      }
    });
  } catch (error) {
    console.error("Error in getRoomForCollaboration:", error);
    res.status(500).json({ message: "Server error" });
  }
};