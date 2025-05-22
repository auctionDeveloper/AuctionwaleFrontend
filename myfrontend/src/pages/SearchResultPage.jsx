import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export default function SearchResultPage({ category, availability, location, budget }) {
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const STORAGE_KEY = "wishlist_results";

  const queryCategory = searchParams.get("category");
  const queryState = searchParams.get("state");
  const queryBank = searchParams.get("bank");
  const queryLocation = searchParams.get("location");
  const queryBudget = searchParams.get("budget");
  const minBudget = parseInt(searchParams.get("minBudget")) || null;
  const maxBudget = parseInt(searchParams.get("maxBudget")) || null;
  const queryStartDate = searchParams.get("startDate");
  const queryEndDate = searchParams.get("endDate");

  useEffect(() => {
    fetch("/propertyData.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        const savedWishlist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const likedMap = {};
        savedWishlist.forEach((item) => {
          if (item?.id) likedMap[item.id] = true; // ✅ Ensure item has an id
        });
        setLiked(likedMap);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const toggleLike = (itemId) => {
    const updatedLikes = { ...liked, [itemId]: !liked[itemId] };
    setLiked(updatedLikes);

    const item = data.find((d) => d.id === itemId);
    const currentWishlist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (updatedLikes[itemId]) {
      const exists = currentWishlist.find((saved) => saved.id === item.id);
      if (!exists) {
        const newItem = {
          id: item.id,
          src: item.image,
          title: item.title,
          location: item.location,
          subtitle: item.area,
          bankPrice: item.bankPrice,
          source: "search",
        };
        const updatedWishlist = [...currentWishlist, newItem];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWishlist));
      }
    } else {
      const updatedWishlist = currentWishlist.filter((saved) => saved.id !== item.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWishlist));
    }

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const parsePrice = (price) => {
    if (!price) return 0;
    const cleanStr = price.replace(/[₹,]/g, "").trim().toLowerCase();
    if (cleanStr.includes("crore")) return parseFloat(cleanStr.replace("crore", "")) * 1e7;
    if (cleanStr.includes("lakh")) return parseFloat(cleanStr.replace("lakh", "")) * 1e5;
    return parseFloat(cleanStr) || 0;
  };

  const filtered = data.filter((item) => {
    const matchCategory = category
      ? item.category.toLowerCase() === category.toLowerCase()
      : queryCategory
      ? item.category.toLowerCase() === queryCategory.toLowerCase()
      : true;

    const matchStatus = availability ? item.propertyStatus === availability : true;

    const matchLocation = (location || queryLocation)
      ? item.location.toLowerCase().includes((location || queryLocation).toLowerCase())
      : true;

    const matchBudget = budget ? parsePrice(item.bankPrice) <= parseInt(budget) : true;

    const matchQueryState = queryState
      ? item.state.toLowerCase() === queryState.toLowerCase()
      : true;

    const matchQueryBank = queryBank
      ? item.bankName.toLowerCase() === queryBank.toLowerCase()
      : true;

    const auctionDate = new Date(item.auctionDate);
    const matchAuctionDate = (() => {
      if (!queryStartDate && !queryEndDate) return true;
      if (queryStartDate && auctionDate < new Date(queryStartDate)) return false;
      if (queryEndDate && auctionDate > new Date(queryEndDate)) return false;
      return true;
    })();

    const matchBudgetRange =
      (!minBudget || parsePrice(item.bankPrice) >= minBudget) &&
      (!maxBudget || parsePrice(item.bankPrice) <= maxBudget);

    return (
      matchCategory &&
      matchStatus &&
      matchLocation &&
      matchBudget &&
      matchQueryState &&
      matchQueryBank &&
      matchBudgetRange &&
      matchAuctionDate
    );
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
      {filtered.map((item, index) => (
        <div key={item.id} className="bg-white rounded-xl shadow-md p-4 relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
          {/* Wishlist Heart */}
          <div
            onClick={() => toggleLike(item.id)}
            className="absolute top-3 right-3 z-10 bg-white p-1 rounded-full shadow cursor-pointer hover:scale-110 transition"
          >
            {liked[item.id] ? (
              <Heart className="text-red-500 fill-red-500 w-5 h-5" />
            ) : (
              <Heart className="text-gray-400 w-5 h-5" />
            )}
          </div>

          <h2 className="text-lg font-semibold mb-2">{item.title}</h2>

          <p
            className={`text-sm font-semibold px-2 py-1 rounded-full inline-block mb-2 ${
              item.propertyStatus === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.propertyStatus}
          </p>

          <p>
            <strong>Bank Price :-</strong>{" "}
            <span className="text-red-600">{item.bankPrice}</span>
          </p>
          <p>
            <strong>Market Price :-</strong> {item.marketPrice}
          </p>
          <p>
            <strong>Area :-</strong> {item.areaSqFt}
          </p>
          <p>
            <strong>Auction Date :-</strong> {item.auctionDate}
          </p>
          <p>
            <strong>Location :-</strong> {item.location}, {item.state}
          </p>

          <div className="mt-3">
            <button
              onClick={() => navigate(`/detailspage?id=${item.id}`)}
              className="text-blue-700 font-semibold flex items-center gap-1"
            >
              View More →
            </button>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="col-span-full text-center text-gray-600 text-lg">
          No properties match your filters.
        </div>
      )}
    </div>
  );
}
