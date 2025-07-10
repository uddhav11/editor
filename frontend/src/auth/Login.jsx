import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(""); //  State for error message
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const res = await dispatch(loginUser(form)).unwrap();
      console.log("Login response:", res);
      navigate("/login/verify");
    } catch (err) {
      setError(err || "Login failed. Please try again.");
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
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="p-4 space-y-4 max-w-md mx-auto mt-10"
        >
          <input
            type="email"
            className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div className="flex border border-gray-500 rounded-lg">
            <input
              type={visible ? "text" : "password"}
              className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              className="my-5 mx-4 hover:cursor-pointer"
              onClick={handleToogle}
            >
              {visible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Error Message Display */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* <button
            type="submit"
            className="w-full bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 transition"
          >
            Login
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
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-gray-800 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
