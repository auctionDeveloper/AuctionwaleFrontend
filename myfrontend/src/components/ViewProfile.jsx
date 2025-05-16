import React, { useState } from 'react';
import { LogOut, User, Shield, Star, Search, Heart, Menu } from 'lucide-react';

export default function ViewProfile() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm border-b">
        <h1 className="text-lg font-semibold">My Profile</h1>
        <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-700">
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-white border-r shadow-sm p-4 flex flex-col justify-between`}
      >
        <div className="space-y-2">
          <button className="w-full flex items-center px-3 py-2 rounded-md bg-gray-100 font-semibold">
            <User className="w-4 h-4 mr-2" />
            Profile
          </button>
          <button className="w-full flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </button>
          <button className="w-full flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
            💰
            <span className="ml-2">Coins</span>
          </button>
          <button className="w-full flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
            <Search className="w-4 h-4 mr-2" />
            Latest Searches
          </button>
          <button className="w-full flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
            <Star className="w-4 h-4 mr-2" />
            Testimonials
          </button>
          <button className="w-full flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
            <Heart className="w-4 h-4 mr-2" />
            Favorites
          </button>
        </div>
        <button className="text-red-600 font-semibold flex items-center mt-4 px-3 py-2 hover:underline">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
        <div className="max-w-xl mx-auto bg-white shadow-sm rounded-md p-4 sm:p-6">
          {/* Profile Picture */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <img
              src="https://via.placeholder.com/64"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded">Change Picture</button>
              <button className="bg-red-200 text-red-600 text-xs px-3 py-1 rounded">Delete Picture</button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-4 text-sm">
            <div>
              <label className="block mb-1">Profile Name</label>
              <input
                type="text"
                defaultValue="Shailesh Pawar"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">Username</label>
              <input
                type="text"
                defaultValue="@shailu676"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                defaultValue="shailesh89@gmail.com"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="text"
                defaultValue="+91 5869471658"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 text-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
