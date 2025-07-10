const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      default: () => Math.random().toString(36).substring(2, 10).toUpperCase(),
    },
    name: {
      type: String,
      default: Date.now().toString(),
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomPic: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/room-text-on-white-background-260nw-2372797937.jpg",
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        username: {
          type: String,
        },
        profilepic: {
          type: String,
          default:
            "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
        },
        isAdmin: {
          type: Boolean,
          default: false,
        },
        joindesAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    settings: {
      isPrivate: {
        type: Boolean,
        default: false,
      },
      allowInvites: {
        type: Boolean,
        default: true,
      },
    },
    joinRequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        requestedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    code: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
