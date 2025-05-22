import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'budget', 'area', 'search'
  const navigate = useNavigate();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const budgetWishlist = (JSON.parse(localStorage.getItem("wishlist_budget")) || []).map(item => ({ ...item, source: "budget" }));
    const areaWishlist = (JSON.parse(localStorage.getItem("wishlist_area")) || []).map(item => ({ ...item, source: "area" }));
    const searchWishlist = (JSON.parse(localStorage.getItem("wishlist_results")) || []).map(item => ({ ...item, source: "search" }));

    setWishlist([...budgetWishlist, ...areaWishlist, ...searchWishlist]);
  };

  const removeFromWishlist = (id, source) => {
    const budget = JSON.parse(localStorage.getItem("wishlist_budget")) || [];
    const area = JSON.parse(localStorage.getItem("wishlist_area")) || [];
    const results = JSON.parse(localStorage.getItem("wishlist_results")) || [];

    const updatedBudget = source === "budget" ? budget.filter(item => item.id !== id) : budget;
    const updatedArea = source === "area" ? area.filter(item => item.id !== id) : area;
    const updatedResults = source === "search" ? results.filter(item => item.id !== id) : results;

    localStorage.setItem("wishlist_budget", JSON.stringify(updatedBudget));
    localStorage.setItem("wishlist_area", JSON.stringify(updatedArea));
    localStorage.setItem("wishlist_results", JSON.stringify(updatedResults));

    const updatedCombined = [
      ...updatedBudget.map(item => ({ ...item, source: "budget" })),
      ...updatedArea.map(item => ({ ...item, source: "area" })),
      ...updatedResults.map(item => ({ ...item, source: "search" })),
    ];
    setWishlist(updatedCombined);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const filteredWishlist =
    filter === "all"
      ? wishlist
      : wishlist.filter((item) => item.source === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2">My Wishlist</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("area")}
          className={`px-4 py-2 rounded ${filter === "area" ? "bg-green-600 text-white" : "border border-green-600 text-green-600"}`}
        >
          Area Wishlist
        </button>
        <button
          onClick={() => setFilter("budget")}
          className={`px-4 py-2 rounded ${filter === "budget" ? "bg-blue-600 text-white" : "border border-blue-600 text-blue-600"}`}
        >
          Budget Wishlist
        </button>
        <button
          onClick={() => setFilter("search")}
          className={`px-4 py-2 rounded ${filter === "search" ? "bg-purple-600 text-white" : "border border-purple-600 text-purple-600"}`}
        >
          Search Wishlist
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-gray-800 text-white" : "border border-gray-800 text-gray-800"}`}
        >
          Show All
        </button>
      </div>

      {filteredWishlist.length === 0 ? (
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredWishlist.map((item) => (
            <div key={`${item.id}-${item.source}`} className="bg-white shadow-md rounded-xl overflow-hidden relative group">
              <img
                src={item.src}
                alt={item.title || `wish-${item.id}`}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                {item.marketPrice && (
                  <p className="text-sm text-gray-500">Market Price: {item.marketPrice}</p>
                )}
                <p className="text-sm text-gray-500">Location: {item.location || "N/A"}</p>
                {/* Add View More or other buttons below this comment if needed */}
              </div>
              <div
                onClick={() => removeFromWishlist(item.id, item.source)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
              >
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
