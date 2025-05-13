import { useState } from "react";

export default function LoginModal({ onClose, switchToSignup }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("signupProfile");
    const storedPassword = localStorage.getItem("signupPassword");

    if (!storedUser || !storedPassword) {
      setError("No user found. Please sign up.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (
      (formData.email === parsedUser.email || formData.email === parsedUser.phone) &&
      formData.password === storedPassword
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", parsedUser.name);
      window.location.reload();
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 relative">
        {/* ✅ Close Button FIX */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl p-1 bg-transparent border-none appearance-none leading-none"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-[#0B3448] text-center mb-1 select-none">
          Welcome to AuctionWale
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">Login to your account</p>

        {error && <p className="text-center text-red-600 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email or Phone"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ED1215]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ED1215]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#ED1215] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <button onClick={switchToSignup} className="hover:underline text-[#0B3448]">
            New user? Sign up
          </button>
          <button
  onClick={() => {
    onClose(); // close login modal
    setTimeout(() => {
      window.dispatchEvent(new Event("showForgotPassword"));
    }, 200);
  }}
  className="hover:underline text-[#0B3448]"
>
  Forgot password?
</button>

        </div>
      </div>
    </div>
  );
}
