import React, { useEffect, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import propertyData from "../../public/propertyData.json"; // adjust path as needed

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const budgetWishlist = (JSON.parse(localStorage.getItem("wishlist_budget")) || []).map(item => ({ ...item, source: "budget" }));
    const areaWishlist = (JSON.parse(localStorage.getItem("wishlist_area")) || []).map(item => ({ ...item, source: "area" }));

    const rawSearchWishlist = JSON.parse(localStorage.getItem("wishlist_results")) || [];
    const searchWishlist = rawSearchWishlist
      .map(wish => {
        const fullItem = propertyData.find(prop => prop.id === wish.id);
        return fullItem ? { ...fullItem, source: "search" } : null;
      })
      .filter(Boolean);

    setWishlist([...budgetWishlist, ...areaWishlist, ...searchWishlist]);
  };
  const addToSearchWishlist = (property) => {
  const current = JSON.parse(localStorage.getItem("wishlist_results")) || [];
  const exists = current.find((item) => item.id === property.id);

  const updated = exists
    ? current.filter((item) => item.id !== property.id) // remove
    : [...current, property]; // add

  localStorage.setItem("wishlist_results", JSON.stringify(updated));
  window.dispatchEvent(new Event("wishlistUpdated")); // ✅ notify HeartWishlistButton
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

  const filteredWishlist = filter === "all" ? wishlist : wishlist.filter(item => item.source === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2">My Wishlist</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={() => setFilter("area")} className={`px-4 py-2 rounded ${filter === "area" ? "bg-green-600 text-white" : "border border-green-600 text-green-600"}`}>Area Wishlist</button>
        <button onClick={() => setFilter("budget")} className={`px-4 py-2 rounded ${filter === "budget" ? "bg-blue-600 text-white" : "border border-blue-600 text-blue-600"}`}>Budget Wishlist</button>
        <button onClick={() => setFilter("search")} className={`px-4 py-2 rounded ${filter === "search" ? "bg-purple-600 text-white" : "border border-purple-600 text-purple-600"}`}>Search Wishlist</button>
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded ${filter === "all" ? "bg-gray-800 text-white" : "border border-gray-800 text-gray-800"}`}>Show All</button>
      </div>

      {filteredWishlist.length === 0 ? (
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredWishlist.map(item => (
            <div key={`${item.id}-${item.source}`} className="bg-white shadow-md rounded-xl overflow-hidden relative group">
              <img src={item.src || item.image} alt={item.title || `wish-${item.id}`} className="w-full h-60 object-cover" />

              <div className="p-4">
                {item.source === "search" ? (
                  <>
                    <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                    <p className={`text-sm font-semibold px-2 py-1 rounded-full inline-block mb-2 ${
                      item.propertyStatus === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.propertyStatus || "Unknown"}
                    </p>
                    <p><strong>Bank Price :-</strong> <span className="text-red-600">{item.bankPrice}</span></p>
                    <p><strong>Market Price :-</strong> {item.marketPrice}</p>
                    <p><strong>Area :-</strong> {item.areaSqFt}</p>
                    <p><strong>Auction Date :-</strong> {item.auctionDate}</p>
                    <p><strong>Location :-</strong> {item.location}, {item.state}</p>
                    <div className="mt-3">
                      <button onClick={() => navigate(`/detailspage?id=${item.id}`)} className="text-blue-700 font-semibold flex items-center gap-1">View More →</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">Location: {item.location || "N/A"}</p>
                    {item.source === "budget" && (
                      <div>
                        <p className="text-sm sm:text-lg font-semibold">{item.bankPrice || "Loading..."}</p>
                        <p className="text-xs sm:text-sm">Market Price : {item.marketPrice || "Loading..."}</p>
                        <p className="text-xs sm:text-sm text-red-600 cursor-pointer font-semibold underline" onClick={(e) => { e.stopPropagation(); navigate('/view_auction'); }}>Explore Nearby Projects</p>
                        <button
                          onClick={() => {
                            const location = encodeURIComponent(item.location || "Unknown");
                            const bankPrice = encodeURIComponent(item.bankPrice || "0");
                            navigate(`/detailspage?location=${location}&bankPrice=${bankPrice}`);
                          }}
                          className="absolute bottom-3 right-3 text-white bg-red-600 rounded-full p-1.5 sm:p-2 hover:bg-red-700"
                        >
                          <ArrowRight size={16} className="sm:hidden" />
                          <ArrowRight size={20} className="hidden sm:block" />
                        </button>
                      </div>
                    )}
                    {item.source === "area" && (
                      <div className="mt-3">
                        <button onClick={() => navigate(`/search_result_page?location=${encodeURIComponent(item.location?.split(",")[0]?.trim() || "")}`)} className="text-blue-700 font-semibold flex items-center gap-1">Explore in {item.location}</button>
                      </div>
                    )}
                  </>
                )}
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













































