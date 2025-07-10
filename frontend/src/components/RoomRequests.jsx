import React from "react";
import { useNavigate } from "react-router-dom";

const RoomRequests = () => {
  const navigate = useNavigate();

  const roomId = "23DVR5";
  const handleChange = (e) => {
    e.preventDefault();
    // navigate(`/dashboard/${roomId}/request`);
    navigate(`/dashboard/request`);

  };
  return (

      <button
        onClick={handleChange}
        className="border border-green-500 rounded-xl text-green-500 font-bold capitalize px-4 py-2 mr-2"
      >
        Requests
      </button>
  );
};

export default RoomRequests;
