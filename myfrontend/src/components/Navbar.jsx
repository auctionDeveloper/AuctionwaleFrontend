import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import OtpModal from "./OtpModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const status = localStorage.getItem("isLoggedIn");
    const readyToLogin = localStorage.getItem("readyToLogin");

    if (status === "true" && user) {
      setLoggedInUser(user);
    }

    if (readyToLogin === "true") {
      setShowLoginModal(true);
      localStorage.removeItem("readyToLogin");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setTimeout(() => setShowSignupModal(true), 100);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setTimeout(() => setShowLoginModal(true), 100);
  };

  const handleSignupComplete = () => {
    setShowSignupModal(false);
    setTimeout(() => setShowOtpModal(true), 100);
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-[#0B3448]" style={{fontFamily:"Poppins"}}>
              AuctionWale
            </Link>

            <div className="hidden md:flex gap-6 items-center">
              <Link to="/" className="text-gray-700 hover:text-[#ED1215]">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-[#ED1215]">About</Link>

              {loggedInUser ? (
                <>
                  <span className="text-[#0B3448] font-medium">Hi, {loggedInUser}</span>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setShowLoginModal(true)} className="text-gray-700 hover:text-[#ED1215]">Login</button>
                  <button onClick={() => setShowSignupModal(true)} className="text-gray-700 hover:text-[#ED1215]">Signup</button>
                </>
              )}
            </div>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-4">
              <Link to="/" className="block text-gray-700 hover:text-[#ED1215]">Home</Link>
              <Link to="/about" className="block text-gray-700 hover:text-[#ED1215]">About</Link>

              {loggedInUser ? (
                <>
                  <span className="block text-[#0B3448]">Hi, {loggedInUser}</span>
                  <button onClick={logout} className="block text-gray-700 hover:text-red-600">Logout</button>
                </>
              ) : (
                <>
                  {/* <button onClick={() => setShowSignupModal(true)} className="block text-gray-700 hover:text-[#ED1215]">Signup</button> */}
                  <button onClick={() => setShowLoginModal(true)} className="block text-gray-700 hover:text-[#ED1215]">Login</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          switchToSignup={handleSwitchToSignup}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          switchToLogin={handleSwitchToLogin}
          openOtpModal={handleSignupComplete}
        />
      )}

      {showOtpModal && <OtpModal onClose={() => setShowOtpModal(false)} />}
    </>
  );
}
