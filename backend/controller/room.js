// const Room = require("../models/Room");
// const User = require("../models/userModel");

// const CreateRoom = async (req, res) => {
//   try {
//     const { name, isPrivate } = req.body;
//     const userId = req.user._id;

//     const room = new Room({
//       name,
//       creator: userId,
//       members: [{ user: userId, isAdmin: true }],
//       settings: { isPrivate },
//     });

//     await room.save();

//     await User.findByIdAndUpdate(userId, {
//       $push: {
//         createdRooms: room._id,
//         joindedRooms: { roomId: room._id, isAdmin: true },
//       },
//     });

//     res.status(201).json(room);
//   } catch (error) {
//     console.log("error in createRoom: ", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const JoinRoomRequest = async (req, res) => {
//   try {
//     const { roomCode } = req.body;
//     const userId = req.user._id;

//     const room = await Room.findOne({ roomCode });

//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }

//     const isMember = room.members.some((m) => m.user.equals(userId));
//     if (isMember) {
//       return res
//         .status(400)
//         .json({ message: "You are already a member of this room" });
//     }

//     const hasPendingrequest = room.joinRequests.some(
//       (r) => r.user.equals(userId) && r.status === "pending"
//     );
//     if (hasPendingrequest) {
//       return res
//         .status(400)
//         .json({ message: "You have already sent a join request" });
//     }

//     room.joinRequests.push({ user: userId, status: "pending" });
//     await room.save();

//     await User.findByIdAndUpdate(userId, {
//       $push: {
//         joinRequests: {
//           roomId: room._id,
//           status: "pending",
//         },
//       },
//     });

//     res.json({ messag: "Joinrequest sent successfully" });
//   } catch (error) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// const HandleJoinRequest = async (req, res) => {
//   try {
//     const { requestId, status } = req.body;
//     const roomId = req.params.roomId;
//     const adminId = req.user._id;

//     const room = await Room.findById(roomId);

//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }

//     const isAdmin = room.memvbers.some(
//       (m) => m.user.equals(adminId) && m.isAdmin
//     );
//     if (!isAdmin) {
//       return res.status(403).json({ message: "not an admin" });
//     }

//     const request = room.joinRequests.id(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Join request not found" });
//     }

//     request.status = acction === "approve" ? "accepted" : "rejected";

//     if (action === "approve") {
//       room.members.push({ user: request.user, isAdmin: false });

//       await User.findByIdAndUpdate(request.user, {
//         $push: {
//           joinedRooms: { roomId: room._id, isAdmin: false },
//         },
//         $pull: {
//           joinRequests: { roomId: room._id, status: "pending" },
//         },
//       });
//     }

//     room.joinRequests.pull(requestId);
//     await room.save();

//     res.json({
//       message: `request ${action}d`,
//       room: room,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// const inviteduser = async (req, res) => {
//   try {
//     const { userCode } = req.docy;

//     const roomId = req.params.roomId;
//     const inviterId = req.user._id;

//     const invitedUser = await User.findOne({ userCode });
//     if (!invitedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const room = await Room.findById(roomId);
//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }

//     const isMember = room.members.some((m) => m.user.equals(inviterId));

//     if (!isMember) {
//       return res
//         .status(403)
//         .json({ message: "You are not a member of this room" });
//     }

//     await User.findByIdAndUpdate(invitedUser._id, {
//       $push: {
//         roomInvites: {
//           roomId: room._id,
//           invitedBy: inviterId,
//           status: "pending",
//         },
//       },
//     });

//     return res.status(200).json({ message: "Invite send successfully" });
//   } catch (error) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// const handleInvite = async (req, res) => {
//   try {
//     const { inviteId, action } = req.body;
//     const userId = req.user._id;

//     const user = await User.findById(userId);

//     const invite = user.roomInvites.id(inviteId);

//     if (!invite) {
//       return res.status(404).json({ message: "Invite not found" });
//     }

//     invite.status = action === "accept" ? "accepted" : "rejected";

//     if (action === "accept") {
//       const room = await Room.findById(invite.roomId);

//       room.members.push({ user: userId, isAdmin: false });
//       await room.save();

//       user.joindedRooms.push({ roomId: invite.roomId, isAdmin: false });
//     }

//     await user.save();

//     return res.status(200).json({ message: "Invite handled successfully" });
//   } catch (error) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// const LeaveRoom = async (req, res) => {
//   try {
//     const { roomId } = req.params;
//     const userId = req.user._id;

//     const room = await Room.findByIdAndUpdate(
//       roomId,
//       {
//         $pull: {
//           members: { uer: userId },
//           joinRequests: { user: userId },
//         },
//       },
//       { new: true }
//     );

//     if (!room) {
//       return res.status(404).json({ message: "room not found" });
//     }

//     await User.findByIdAndUpdate(userId, {
//       $pull: {
//         joinedRooms: { roomId: room._id },
//         joinRequests: { roomid: room._id },
//       },
//     });

//     const hasAdmin = room.members.some((m) => m.isAdmin);
//     if (!hasAdmin && room.members.length > 0) {
//       room.members[0].isAdmin = true;
//       await room.save();
//     }

//     if (room.members.length === 0) {
//       await Room.findByIdAndDelete(roomId);
//       await User.updateMany(
//         { createdRooms: roomId },
//         { $pull: { createdRooms: roomId } }
//       );
//     }

//     res.status(200).json({ message: "Left the room successfully" });
//   } catch (error) {
//     console.log("Error in the leave room: ", error);
//     return res.status(500).json({ error: "Error in the Leave room" });
//   }
// };

// module.exports = {
//   CreateRoom, //
//   JoinRoomRequest, //
//   HandleJoinRequest,
//   inviteduser,
//   handleInvite,
//   LeaveRoom, //
// };

const Room = require("../models/Room");
const User = require("../models/userModel");

const CreateRoom = async (req, res) => {
  try {
    const { name, isPrivate, language } = req.body;
    const userId = req.user._id;

    const userData = await User.findById(userId);

    const room = new Room({
      name,
      creator: userId,
      members: [
        {
          user: userId,
          isAdmin: true,
          username: userData.username,
          profilepic: userData.profilepic,
        },
      ],
      settings: { isPrivate },
      language,
    });

    await room.save();

    await User.findByIdAndUpdate(userId, {
      $push: {
        createdRooms: room._id,
        joinedRooms: { roomId: room._id, isAdmin: true, name: name },
      },
    });

    res.status(201).json(room);
  } catch (error) {
    console.error("Error in createRoom:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const JoinRoomRequest = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = req.user._id;

    const room = await Room.findOne({ roomCode });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const isMember = room.members.some((m) => m.user.equals(userId));
    if (isMember) return res.status(400).json({ message: "Already a member" });

    const hasPendingRequest = room.joinRequests.some(
      (r) => r.user.equals(userId) && r.status === "pending"
    );
    if (hasPendingRequest)
      return res.status(400).json({ message: "Request already pending" });

    room.joinRequests.push({ user: userId, status: "pending" });
    await room.save();

    await User.findByIdAndUpdate(userId, {
      $push: { joinRequests: { roomId: room._id, status: "pending" } },
    });

    res.status(200).json({ message: "Join request sent successfully" });
  } catch (error) {
    console.error("Error in JoinRoomRequest:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getJoinRequest = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user._id;

    const room = await Room.findById(roomId).populate({
      path: "joinRequests.user",
      select: "username profilepic email userCode", // populate useful fields
    });

    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check if the user is an admin of the room
    const isAdmin = room.members.some(
      (member) => member.user.equals(userId) && member.isAdmin
    );

    if (!isAdmin) return res.status(403).json({ message: "Unauthorized" });

    res.status(200).json({ joinRequests: room.joinRequests });
  } catch (error) {
    console.error("Error in getJoinRequest:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const HandleJoinRequest = async (req, res) => {
  try {
    const { action } = req.body;
    const { roomId, requestId } = req.params;
    const adminId = req.user._id;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const isAdmin = room.members.some(
      (m) => m.user.equals(adminId) && m.isAdmin
    );
    if (!isAdmin) return res.status(403).json({ message: "Not an admin" });

    const request = room.joinRequests.id(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = action === "accept" ? "accepted" : "rejected";

    if (action === "accept") {
      room.members.push({
        user: request.user,
        isAdmin: false,
        username: request.user.username,
        profilepic: request.user.profilepic,
      });
      await User.findByIdAndUpdate(request.user, {
        $push: {
          joinedRooms: { roomId: room._id, isAdmin: false, name: room.name },
        },
        $pull: { joinRequests: { roomId: room._id } },
      });
    }

    room.joinRequests.pull(requestId);
    await room.save();

    res.json({ message: `Request ${action}d, room ` });
  } catch (error) {
    console.error("Error in HandleJoinRequest:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const inviteUser = async (req, res) => {
  try {
    const { userCode } = req.body;
    const { roomId } = req.params;
    const inviterId = req.user._id;

    const invitedUser = await User.findOne({ userCode });
    if (!invitedUser)
      return res.status(404).json({ message: "User not found" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const isMember = room.members.some((m) => m.user.equals(inviterId));
    if (!isMember)
      return res.status(403).json({ message: "Not a room member" });

    await User.findByIdAndUpdate(invitedUser._id, {
      $push: {
        roomInvites: {
          roomId: room._id,
          invitedBy: inviterId,
          status: "pending",
        },
      },
    });

    res.json({ message: "Invite sent successfully" });
  } catch (error) {
    console.error("Error in inviteUser:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getInvites = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate({
        path: "roomInvites.roomId",
        select: "name roomCode language settings roomPic",
      })
      .populate({
        path: "roomInvites.invitedBy",
        select: "username profilepic",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only return pending invites
    const pendingInvites = user.roomInvites.filter(
      (invite) => invite.status === "pending"
    );

    res.status(200).json(pendingInvites);
  } catch (error) {
    console.error("Error in getInvites:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const handleInvite = async (req, res) => {
  try {
    const { inviteId } = req.params;
    const { action } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const invite = user.roomInvites.id(inviteId);

    if (!invite) return res.status(404).json({ message: "Invite not found" });

    invite.status = action === "accept" ? "accepted" : "rejected";

    if (action === "accept") {
      const room = await Room.findById(invite.roomId);
      room.members.push({
        user: userId,
        isAdmin: false,
        username: user.username,
        profilepic: user.profilepic,
      });
      await room.save();

      user.joinedRooms.push({
        roomId: invite.roomId,
        isAdmin: false,
        name: invite.name,
      });
    }

    user.roomInvites.pull(inviteId);
    await user.save();

    res.json({
      message: `Invite ${action}ed`,
      room: action === "accept" ? await Room.findById(invite.roomId) : null,
    });
  } catch (error) {
    console.error("Error in handleInvite:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// const LeaveRoom = async (req, res) => {
//   try {
//     const { roomId } = req.params;
//     const userId = req.user._id;

//     const room = await Room.findByIdAndUpdate(
//       roomId,
//       {
//         $pull: {
//           members: {
//             user: userId,
//             username: req.user.username,
//             profilepic: req.user.profilepic,
//           },
//           joinRequests: { user: userId },
//         },
//       },
//       { new: true }
//     );

//     if (!room) return res.status(404).json({ message: "Room not found" });

//     await User.findByIdAndUpdate(userId, {
//       $pull: {
//         joinedRooms: { roomId: roomId },
//         joinRequests: { roomId },
//       },
//     });

//     // Handle admin reassignment if needed
//     const hasAdmin = room.members.some((m) => m.isAdmin);
//     if (!hasAdmin && room.members.length > 0) {
//       room.members[0].isAdmin = true;
//       await room.save();
//     }

//     // Delete room if empty
//     if (room.members.length === 0) {
//       await Room.findByIdAndDelete(roomId);
//       await User.updateMany(
//         { createdRooms: roomId },
//         { $pull: { createdRooms: roomId } }
//       );
//     }

//     res.json({ message: "Left room successfully", roomId });
//   } catch (error) {
//     console.error("Error in LeaveRoom:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

const LeaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user._id;

    // find the room
    const room = Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    // find the leaving member
    const leavingMember = room.members.find(
      (m) => m.user.toString() === userId.toString()
    );

    if (!leavingMember) {
      return res
        .ststus(404)
        .json({ message: "you are not a member of this room" });
    }
    // removing the member from the room
    room.members = room.members.filter(
      (m) => m.user.toString() !== userId.toString()
    );
    // removing if there is joinRequests
    room.joinRequests = room.joinRequests.filter(
      (m) => m.user.toString() !== userId.toString()
    );
// if leaving member is admin the we need a new admin
    if (leavingMember.isAdmin && room.members.length > 0) {
      let newAdmin = null;
      for (let m of room.members) {
        // Check that this member exists in User collection
        const existingUser = await User.findById(m.user);
        if (existingUser) {
          newAdmin = m;
          break;
        }
    }
    if (newAdmin) {
        newAdmin.isAdmin = true;
      } else {
        console.warn("No valid user found to assign as new admin.");
      }

  }

  // saving the new room config
    await room.save();

    await User.findByIdAndUpdate(userId, {
      $pull: {
        joinedRooms: { roomId: roomId },
        joinRequests: { roomId: roomId },
      },
    });

    if (room.members.length === 0) {
      await Room.findByIdAndDelete(roomId);
      await User.updateMany(
        { createdRooms: roomId },
        { $pull: { createdRooms: roomId } }
      );
    }

    res.status(200).json({ message: "Left room successfully", roomId });
  } catch (error) {
    console.error("Error in LeaveRoom:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getRoom = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate({
        path: "createdRooms",
        select: "name roomCode language settings members roomPic",
      })
      .populate({
        path: "joinedRooms.roomId",
        select: "name roomCode language settings members roomPic creator",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const createdRooms = user.createdRooms;

    const joinedRooms = user.joinedRooms
    .filter(entry => entry.roomId !== null) 
    .map((entry) => {
      
      return {
        _id: entry.roomId._id,
        name: entry.roomId.name,
        roomCode: entry.roomId.roomCode,
        language: entry.roomId.language,
        settings: entry.roomId.settings,
        members: entry.roomId.members,
        roomPic: entry.roomId.roomPic,
        isAdmin: entry.isAdmin,
        creator: entry.roomId.creator,
      };
    });

    return res.status(200).json({
      createdRooms,
      joinedRooms,
    });
  } catch (error) {
    console.error("Error in getRoom:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const searchRoomByName = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Query is required" });
    }

    const rooms = await Room.find({
      name: { $regex: query, $options: "i" }, // case-insensitive partial match
      "settings.visibility": "public", // if rooms have visibility control
    }).select("name roomPic _id roomCode");

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error in searchRoomByName:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 }); // newest first

    res.status(200).json({ rooms });
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getARoom = async (req, res) => {
  try {
    const { roomCode } = req.body;

    const room = await Room.findOne({ roomCode });

    res.status(200).json({ room });
  } catch (error) {
    console.log("error in get a room:- ", error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
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
};
