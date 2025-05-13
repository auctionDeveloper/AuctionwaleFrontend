import React, { useState } from "react";

export default function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState("enter");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [sentOtp, setSentOtp] = useState("123456"); // Fixed OTP for mock

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("signupProfile"));

    if (!storedUser || (email !== storedUser.email && email !== storedUser.name)) {
      setError("No matching user found");
      return;
    }

    setUserName(storedUser.name);
    setError("");
    setStep("otp");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp !== sentOtp) {
      setError("Incorrect OTP. Please try again.");
    } else {
      setError("");
      setStep("reset");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
// Inside your reset handler after validating OTP:
localStorage.setItem("signupPassword", newPassword); // Save new password
alert("Password successfully updated. You can now login.");
onClose(); // Close modal

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl p-1"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-[#0B3448] text-center mb-1">Reset Password</h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          {step === "enter" && "Enter your email or username"}
          {step === "otp" && `Enter OTP sent to ${email}`}
          {step === "reset" && `Hi ${userName}, set your new password`}
        </p>

        {error && <p className="text-center text-red-600 text-sm mb-3">{error}</p>}

        {step === "enter" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ED1215]"
            />
            <button
              type="submit"
              className="w-full bg-[#ED1215] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ED1215]"
            />
            <button
              type="submit"
              className="w-full bg-[#ED1215] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ED1215]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ED1215]"
            />
            <button
              type="submit"
              className="w-full bg-[#ED1215] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
