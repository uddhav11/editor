import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcLeave } from "react-icons/fc";
import { leaveRoom } from "../redux/roomSlice";

const LeaveRoom = ({roomId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLeave = () => {
    dispatch(leaveRoom({roomId}))
    navigate('/dashboard')
  };
  return (
    <button
      onClick={handleLeave}
      className="flex items-center space-x-2 text-red-500 hover:text-red-700 hover:cursor-pointer p-2 font-bold border border-red-500 rounded-xl mx-2 hover:border-red-700"
    >
      <FcLeave className="size-7 mr-2" />
      Leave Room
    </button>
  );
};

export default LeaveRoom;
