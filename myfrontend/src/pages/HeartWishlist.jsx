import React, { useEffect, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const budgetWishlist = (JSON.parse(localStorage.getItem("wishlist_budget")) || []).map(item => ({ ...item, source: "budget" }));
    const areaWishlist = (JSON.parse(localStorage.getItem("wishlist_area")) || []).map(item => ({ ...item, source: "area" }));
    const combinedWishlist = [...budgetWishlist, ...areaWishlist];
    setWishlist(combinedWishlist);
  }, []);

  const removeFromWishlist = (id, src) => {
    const filterOut = (list) => list.filter(item => !(item.id === id && item.src === src));

    const budget = JSON.parse(localStorage.getItem("wishlist_budget")) || [];
    const area = JSON.parse(localStorage.getItem("wishlist_area")) || [];

    const updatedBudget = filterOut(budget);
    const updatedArea = filterOut(area);

    localStorage.setItem("wishlist_budget", JSON.stringify(updatedBudget));
    localStorage.setItem("wishlist_area", JSON.stringify(updatedArea));

    const updatedCombined = [...updatedBudget.map(item => ({ ...item, source: "budget" })), ...updatedArea.map(item => ({ ...item, source: "area" }))];
    setWishlist(updatedCombined);

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const handleExplore = (source) => {
    navigate(source === "area" ? "/area_auction" : "/budget_auction");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item, index) => (
            <div key={`${item.id}-${item.source}`} className="bg-white shadow-md rounded-xl overflow-hidden relative group">
              <img src={item.src} alt={`wish-${item.id}`} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title || `Image Title ${item.id + 1}`}</h3>
                <p className="text-sm text-gray-500">{item.subtitle || "2-word Text"}</p>
                <button
                  onClick={() => handleExplore(item.source)}
                  className="mt-3 text-red-600 font-semibold hover:underline flex items-center gap-1"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div
                onClick={() => removeFromWishlist(item.id, item.src)}
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
