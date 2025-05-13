import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  { label: "Edit Profile", key: "edit" },
  { label: "Recent Search", key: "recent" },
  { label: "Favourites", key: "favourites" },
  { label: "Testimonials", key: "feedback" },
  { label: "Settings", key: "settings" },
];

const settingsSubSections = [
  { label: "Privacy (Change Password)", key: "privacy" },
  { label: "Delete Account", key: "delete" },
];

export default function ViewProfile() {
  const [activeSection, setActiveSection] = useState("edit");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [wishlist, setWishlist] = useState([]);
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("signupProfile"));
    if (user) {
      setProfile(user);
    }
    const budget = JSON.parse(localStorage.getItem("wishlist_budget")) || [];
    const area = JSON.parse(localStorage.getItem("wishlist_area")) || [];
    setWishlist([...budget, ...area]);
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem("signupProfile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(passwords.newPassword)) {
      alert("Password must be at least 8 characters, include 1 number and 1 special character.");
      return;
    }
    localStorage.setItem("signupPassword", passwords.newPassword);
    alert("Password updated successfully!");
  };

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "edit":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              className="w-full mb-3 p-2 border rounded"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Full Name"
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Email"
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              placeholder="Phone"
            />
            <button onClick={saveProfile} className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        );
      case "recent":
        return <p>Recently searched auctions will appear here.</p>;
      case "favourites":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
            {wishlist.length === 0 ? (
              <p className="text-gray-500">No items in your wishlist.</p>
            ) : (
              <ul className="space-y-2">
                {wishlist.map((item, i) => (
                  <li key={i} className="border p-2 rounded flex justify-between">
                    <span>{item.title || `Item ${item.id}`}</span>
                    <img src={item.src} alt="" className="h-12 w-12 rounded" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "feedback":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Testimonials</h2>
            <p>Feature under construction. Soon you'll be able to manage or leave feedback!</p>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            {settingsSubSections.map((sub) => (
              <button
                key={sub.key}
                onClick={() => setActiveSection(sub.key)}
                className="block text-left text-gray-800 hover:text-red-600 mb-2"
              >
                {sub.label}
              </button>
            ))}
          </div>
        );
      case "privacy":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <input
              className="w-full mb-3 p-2 border rounded"
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              type="password"
              placeholder="Confirm Password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handlePasswordChange}>Update Password</button>
          </div>
        );
      case "delete":
        return (
          <div>
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Account</h2>
            <p className="mb-3 text-sm">Warning: This action is permanent and cannot be undone.</p>
            <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={deleteAccount}>Delete My Account</button>
          </div>
        );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6">
        <div className="flex items-center mb-6">
          <img src="/src/assets/profile-icon.jpg" alt="User" className="w-12 h-12 rounded-full mr-3" />
          <div>
            <h3 className="text-lg font-bold">{profile.name || "User"}</h3>
            <p className="text-sm text-gray-500">Hey there! I am using Auctionwale.</p>
          </div>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`block w-full text-left px-3 py-2 rounded ${
                activeSection === section.key ? "bg-red-100 text-red-700 font-semibold" : "text-gray-700 hover:text-red-600"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-white shadow-sm">{renderSection()}</main>
    </div>
  );
}
