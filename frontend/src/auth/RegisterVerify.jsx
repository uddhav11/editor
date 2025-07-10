

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyRegister } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function RegisterVerify() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError]= useState("")

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

const handleVerify = async (e) => {
  e.preventDefault();
  if (timeLeft === 0) {
    alert("OTP expired. Please register again.");
    return;
  }

  try {
    await dispatch(verifyRegister({ otp })).unwrap(); //  only proceeds if successful
    navigate("/login");
  } catch (err) {
    setError(err?.message || "Register Verification failed")
  }
};


  // Format timer as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          OTP Verification
        </h2>
                <p className="text-center text-gray-700 font-bold mb-5 ">For Register</p>

        <p className="text-center text-gray-600 mb-6">
          OTP will expire in{" "}
          <span className="font-semibold">{formatTime()}</span>
        </p>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && value.length <= 6) {
                setOtp(e.target.value);
              }
            }}
            required
            disabled={timeLeft === 0}
          />
          {error && (
            <p className="text-red-500 text-sm font-medium">
              {error}
            </p>
          )}
          <button
            className={`w-full p-3 rounded-lg text-white transition ${
              timeLeft === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            type="submit"
            disabled={timeLeft === 0}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}



