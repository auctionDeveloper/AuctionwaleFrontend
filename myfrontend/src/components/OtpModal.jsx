import { useState } from "react";

export default function OtpModal({ onClose }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleOtpSubmit = () => {
    if (otp !== "123456") {
      setError("Invalid OTP. Please try again.");
      return;
    }

    const tempData = localStorage.getItem("tempSignup");
    if (tempData) {
      localStorage.setItem("signupProfile", tempData);
      localStorage.removeItem("tempSignup");

      localStorage.setItem("readyToLogin", "true");
      localStorage.setItem("readyForBackendSync", "true");
    }

    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 relative">
        {/* ✅ Close button with browser-default fixes */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl p-1 bg-transparent border-none appearance-none leading-none"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-[#0B3448] text-center mb-1 select-none">
          OTP Verification
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Enter the 6-digit OTP sent to your email or phone
        </p>

        {error && <p className="text-sm text-red-600 text-center mb-3">{error}</p>}

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ED1215]"
        />

        <button
          onClick={handleOtpSubmit}
          className="w-full mt-4 bg-[#ED1215] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
