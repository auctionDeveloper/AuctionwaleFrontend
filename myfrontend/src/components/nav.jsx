import React, { useEffect, useState, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import logo from '/src/assets/logo.svg';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import OtpModal from './OtpModal';
import ForgotPasswordModal from './ForgetPasswordModal';

import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [mobileFeatures, setMobileFeatures] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [featuresPosition, setFeaturesPosition] = useState({ top: 0, left: 0 });
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);


  const menuRef = useRef(null);
  const featuresMenuRef = useRef(null);
  const featuresButtonRef = useRef(null);
  const mobileSidebarRef = useRef(null);
  const navigate = useNavigate();

useEffect(() => {
  const user = localStorage.getItem('loggedInUser');
  const status = localStorage.getItem('isLoggedIn');
  const readyToLogin = localStorage.getItem('readyToLogin');

  if (status === 'true' && user) setLoggedInUser(user);

const updateWishlistCount = () => {
  const budget = JSON.parse(localStorage.getItem("wishlist_budget")) || [];
  const area = JSON.parse(localStorage.getItem("wishlist_area")) || [];

  // Merge and filter duplicates based on ID + type
  const combined = [...budget, ...area];

  // Optional: Remove duplicates based on id + src
  const unique = combined.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.id === item.id && t.src === item.src)
  );

  setWishlistCount(unique.length);
};


  

  updateWishlistCount(); // run on load

  // ✅ Listen for custom event from other components
  window.addEventListener("wishlistUpdated", updateWishlistCount);

  // ✅ Also listen for tab-sync
  window.addEventListener("storage", updateWishlistCount);

  if (readyToLogin === 'true') {
    setShowLoginModal(true);
    localStorage.removeItem('readyToLogin');
  }

const handleClickOutside = (e) => {
  if (
    !menuRef.current?.contains(e.target) &&
    !featuresMenuRef.current?.contains(e.target) &&
    !featuresButtonRef.current?.contains(e.target)
  ) {
    setShowMenu(false);
    setShowFeatures(false);
  }

  if (
    mobileSidebarRef.current &&
    !mobileSidebarRef.current.contains(e.target) &&
    isOpen
  ) {
    setIsOpen(false);          // ✅ Close the sidebar
    setMobileFeatures(false);  // ✅ Close nested mobile menus
  }
};


  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    window.removeEventListener("storage", updateWishlistCount);
     window.removeEventListener("wishlistUpdated", updateWishlistCount);
    window.removeEventListener("storage", updateWishlistCount);
  };
}, []);

useEffect(() => {
  const handleForgot = () => setShowForgotPassword(true);
  window.addEventListener("showForgotPassword", handleForgot);
  return () => window.removeEventListener("showForgotPassword", handleForgot);
}, []);


  const toggleSidebar = () => setIsOpen(!isOpen);

const logout = () => {
  // Remove login/session keys
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loggedInUser');

  // Optional: clear wishlist only if you want it reset on logout
  localStorage.removeItem('heartWishlist');

  // Inform other tabs/components
  window.dispatchEvent(new Event("wishlistUpdated"));

  // Reset user in UI immediately
  setLoggedInUser("");
  setWishlistCount(0);

  // Optional: Redirect or refresh UI
  navigate('/');
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

  const handleViewProfile = () => {
    navigate('/profile');
    setShowMenu(false);
  };

  const handleProfileClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setShowMenu(!showMenu);
    setShowFeatures(false);
  };

  const handleFeaturesClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setFeaturesPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setShowFeatures(!showFeatures);
    setShowMenu(false);
  };

  const toggleFeaturesMenu = (event) => {
  setShowFeatures((prev) => {
    const newState = !prev;

    if (newState) {
      // Calculate and set menu position dynamically relative to the button
      const rect = featuresButtonRef.current.getBoundingClientRect();
      setFeaturesPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    return newState;
  });
};


useEffect(() => {
  const handleScroll = () => {
    setShowFeatures(false);     // Close desktop dropdown
  
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  return (
    <>
      <div className="sticky top-0 z-[999] bg-white shadow-md overflow-hidden">
        {/* Header */}
        <div className="w-full flex justify-between items-center p-4 border-b sm:h-[90px] gap-x-3 overflow-hidden">
                   <div className="flex items-center mx-4 gap-4 overflow-hidden">
            <Link to="/"><img src={logo} alt="Logo" className="h-16 w-16 object-contain" /></Link>
            <div className="flex flex-col font-poppins  whitespace-nowrap">
  <h1 className="text-3xl font-extrabold text-[#1f2937] leading-tight pb-1"><Link to="/">Auctionwale</Link></h1>
  <p className="text-base font-semibold text-[#930000] mt-[-3px]"><Link to="/">Expert for Bank Auctions</Link></p>
</div>
          </div>

          <div className="hidden md:flex items-center gap-4 mx-2 overflow-hidden">
<div className="relative cursor-pointer w-10 h-10 flex items-center justify-center" onClick={() => navigate('/heartwishlist')}>
  <FavoriteBorderOutlinedIcon className="text-gray-700 text-[28px]" />
  <div className="absolute top-[2] right-[-3] transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] px-[5px] flex items-center justify-center rounded-full font-bold shadow-md z-50">
    {wishlistCount > 0 ? wishlistCount : '+'}
  </div>
</div>


            {loggedInUser ? (
              <>
                <span className="text-[#0B3448] text-sm font-medium">Hi, {loggedInUser}</span>
                <img
                  src="/src/assets/profile-icon.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={handleProfileClick}
                />
              </>
            ) : (
              <button
                className="px-5 py-3 border border-gray-300 text-sm rounded-full hover:bg-[#0D364A] hover:text-white"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Red Navbar */}
        <div className="bg-[#930000] text-white z-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="md:hidden order-1">
              <button onClick={toggleSidebar}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>

            <ul className="hidden md:flex gap-8 text-sm font-medium w-full justify-around">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/view_auction">View Auction</Link></li>
              <li><Link to="/bank_auction">Bank Auction</Link></li>
              <li><Link to="/area_auction">Area Auction</Link></li>
              <li><Link to="/FAQ">FAQs</Link></li>
              <li>
                <button ref={featuresButtonRef} onClick={handleFeaturesClick} className="inline-flex items-center gap-1">
                  Features <ChevronDown size={16} />
                </button>
              </li>
              <li><Link to="/expert_advice">Call Expert</Link></li>
              
            </ul>

            <div className="md:hidden flex items-center gap-2 ml-auto order-2">
              <div className="relative cursor-pointer w-8 h-8 flex items-center justify-center" onClick={() => {
  navigate('/heartwishlist');
  setIsOpen(false); // optional: close mobile sidebar
}}>
  <FavoriteBorderOutlinedIcon className="text-white text-[24px]" />
  <div className="absolute top-[-2] right-[-4] transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[9px] min-w-[16px] h-[16px] px-[4px] flex items-center justify-center rounded-full font-semibold shadow z-50">
    {wishlistCount > 0 ? wishlistCount : '+'}
  </div>
</div>


              {loggedInUser ? (
          <>
            <span className="text-white text-sm">Hi, {loggedInUser}</span>
            <img
              src="/src/assets/profile-icon.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={handleProfileClick}
            />
          </>
        ) : (
          <button
            className="px-4 py-2 text-white bg-[#930000] rounded-full hover:bg-[#0D364A]"
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </button>
        )}
            </div>
          </div>
           <div ref={menuRef}>
          {/* Mobile Sidebar */}
<div 
  ref={mobileSidebarRef}
  className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-lg transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } transition duration-300 z-50 md:hidden overflow-y-auto`}
>
  <div className="p-6 flex flex-col gap-4 text-lg font-medium text-[#0B3448]">

              <button onClick={toggleSidebar} className="self-end"><X size={28} /></button>

              <Link to="/" onClick={toggleSidebar}>Home</Link>
              <Link to="/view_auction" onClick={toggleSidebar}>View Auction</Link>
              <Link to="/bank_auction" onClick={toggleSidebar}>Bank Auction</Link>
              <Link to="/area_auction" onClick={toggleSidebar}>Area Auction</Link>
              <Link to="/FAQ" onClick={toggleSidebar}>FAQs</Link>

              {/* Mobile Features Toggle */}
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setMobileFeatures(!mobileFeatures)}>
                <span className="text-[#0B3448] font-semibold">Features</span>
                <ChevronRight size={18} className="text-[#0B3448]" />
              </div>
              {mobileFeatures && (
                <ul className="ml-4 text-sm flex flex-col gap-2 mt-1">
                  <li><Link to='/photovideos' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Photo & Videos</Link></li>
                  <li><Link to='/tsr' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>TSR</Link></li>
                  <li><Link to='/valuation_report' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Valuation Report</Link></li>
                  <li><Link to='/public_sales_notice' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Public & Sales Notice</Link></li>
                  <li><Link to='/bank_doc' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Bank Document</Link></li>
                  <li><Link to='/comparison_chart' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Comparison Chart</Link></li>
                </ul>
              )}
                <Link to="/expert_advice" onClick={toggleSidebar}>Call Expert</Link>
              
    
            </div>
          </div> </div>
        </div>
      </div>

      {/* Features Dropdown (desktop) */}
      {showFeatures && (
        <div
          ref={featuresMenuRef}
          className="fixed w-56 bg-white text-[#0B3448] shadow-lg rounded-md z-[9999] py-2 overflow-hidden"
          style={{ top: `${featuresPosition.top}px`, left: `${featuresPosition.left}px` }}
        >
          <ul className="text-sm">
            <li className="px-4 py-2 hover:bg-gray-100"><Link to='/photovideos' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Photo & Videos</Link></li>
            <li className="px-4 py-2 hover:bg-gray-100"><Link to='/tsr' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>TSR</Link></li>
            <li className="px-4 py-2 hover:bg-gray-100"><Link to='/valuation_report' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Valuation Report</Link></li>
            <li className="px-4 py-2 hover:bg-gray-100"><Link to='/public_sales_notice' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Public & Sales Notice</Link></li>
            <li className="px-4 py-2 hover:bg-gray-100"><Link to='/bank_doc' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }}>Bank Document</Link></li>
            <li className="px-4 py-2 hover:bg-gray-100"><Link to='/comparison_chart' className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => {
    setShowFeatures(false); 
    setMobileFeatures(false); 
    setIsOpen(false); 
  }} >Comparison Chart</Link></li>
          </ul>
        </div>
      )}

      {/* Profile Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="fixed w-48 bg-[#1f1f1f] text-white shadow-lg rounded-md z-[9999] py-2"
          style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left - 150}px` }}
        >
          <button onClick={handleViewProfile} className="w-full text-left px-4 py-2 hover:bg-[#333] text-sm">View Profile</button>
          <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-[#333] text-sm text-red-400">Logout</button>
        </div>
      )}

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} switchToSignup={handleSwitchToSignup} />}
      {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} switchToLogin={handleSwitchToLogin} openOtpModal={handleSignupComplete} />}
      {showOtpModal && <OtpModal onClose={() => setShowOtpModal(false)} />}

{showForgotPassword && (
  <ForgotPasswordModal
    onClose={() => setShowForgotPassword(false)}
  />
)}

    </>
  );
}