

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setTempCredentials } from "../redux/authSlice";
import { registerUser } from "../redux/authSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const loading= useSelector((state) => state.auth.loading)
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  



  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(registerUser(formData)).unwrap();

      // Optional: log or toast the backend message
      console.log("register response:", res); // Should log: { message: "OTP sent to your email" }

      navigate("/register/verify");
    } catch (error) {
      setError(error || "register failed. Please try again.");
    }
  };

  const handleToogle = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            required
          />
          <div className="flex border border-gray-400 rounded-lg">
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onChange={handleChange}
              required
            />
            <button
              className="my-5 mx-4 hover:cursor-pointer"
              onClick={handleToogle}
            >
              {visible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* <button
            type="submit"
            className="w-full bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 transition"
          >
            Register
          </button> */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gray-800 text-white p-3 rounded-lg transition flex items-center justify-center ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-700"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-gray-800 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
