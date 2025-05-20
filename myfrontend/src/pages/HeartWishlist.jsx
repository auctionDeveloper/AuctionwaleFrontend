import React, { useEffect, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const budgetWishlist = (JSON.parse(localStorage.getItem("wishlist_budget")) || []).map(item => ({ ...item, source: "budget" }));
    const areaWishlist = (JSON.parse(localStorage.getItem("wishlist_area")) || []).map(item => ({ ...item, source: "area" }));
    const searchWishlist = (JSON.parse(localStorage.getItem("wishlist_results")) || []).map(item => ({ ...item, source: "search" }));
    
    setWishlist([...budgetWishlist, ...areaWishlist, ...searchWishlist]);
  }, []);

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
const saveToList = (item, key) => {
  const list = JSON.parse(localStorage.getItem(key)) || [];
  const exists = list.some((saved) => saved.id === item.id);
  if (!exists) {
    const newItem = {
      ...item,
      source: key === "wishlist_budget" ? "budget" : key === "wishlist_area" ? "area" : "search",
    };
    list.push(newItem);
    localStorage.setItem(key, JSON.stringify(list));
    setWishlist((prev) => [...prev, newItem]);
    window.dispatchEvent(new Event("wishlistUpdated"));
  }
};

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
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

                <div className="mt-4 flex flex-wrap gap-2">
  <button
    onClick={() => saveToList(item, "wishlist_budget")}
    className="text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-50"
  >
    Save to Budget
  </button>
  <button
    onClick={() => saveToList(item, "wishlist_area")}
    className="text-sm text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-50"
  >
    Save to Area
  </button>
  <button
    onClick={() => saveToList(item, "wishlist_results")}
    className="text-sm text-purple-600 border border-purple-600 px-2 py-1 rounded hover:bg-purple-50"
  >
    Save to Search
  </button>
</div>

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
