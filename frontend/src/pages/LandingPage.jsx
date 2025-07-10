import React from "react";
import { useNavigate } from "react-router-dom"; // Corrected import: useNavigate hook

const LandingPage = () => {
  const navigate = useNavigate(); // Corrected: Call the useNavigate hook

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1 className="text-red-500 p-5">
        this is the landing page of the code i am writing.
      </h1>
      <button
        className="text-3xl border border-black rounded-full px-4 py-2 font-bold capitalize"
        onClick={handleClick} // Corrected: Pass a reference to the function
      >
        click
      </button>
    </div>
  );
};

export default LandingPage;