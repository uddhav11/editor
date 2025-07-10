import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Logout = ({ isSidebarOpen }) => {
    const dispatch= useDispatch()
    const navigate= useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  };
  return (
    <button
      title={!isSidebarOpen ? "Logout" : ""}
      onClick={handleLogout}
              className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg"
    >
      <FaSignOutAlt className="size-6" />
      {isSidebarOpen && (
        <span className=" mx-1 font-bold">
          Logout
        </span>
      )}
    </button>
  );
};

export default Logout;
