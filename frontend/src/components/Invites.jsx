import React from "react";
import { useNavigate } from "react-router-dom";

const Invites = () => {
    const navigate= useNavigate()

    const handleClick=() => {
        navigate('/dashboard/invites')
    }
  return (
    <div>
      <button onClick={handleClick} className="font-bold ">Invites</button>
    </div>
  );
};

export default Invites;
