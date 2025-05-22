import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function HeartWishlistButton() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [, forceUpdate] = useState(0); // Forcing re-render
  const navigate = useNavigate();

  const updateWishlistCount = () => {
    try {
      const budget = JSON.parse(localStorage.getItem("wishlist_budget")) || [];
      const area = JSON.parse(localStorage.getItem("wishlist_area")) || [];
      const results = JSON.parse(localStorage.getItem("wishlist_results")) || [];

      const combined = [...budget, ...area, ...results];

      const seen = new Set();
      const unique = combined.filter(item => {
        if (!item?.id || seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });

      setWishlistCount(unique.length);
    } catch (error) {
      console.error("Failed to update wishlist count", error);
    }
  };

  useEffect(() => {
    const handleWishlistUpdate = () => {
      updateWishlistCount();
      forceUpdate(n => n + 1); // Trigger re-render
    };

    updateWishlistCount(); // Initial count

    // Event listeners
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, []);

  return (
    <div
      className="relative cursor-pointer w-10 h-10 flex items-center justify-center"
      onClick={() => navigate("/heartwishlist")}
    >
      <FavoriteBorderOutlinedIcon className="text-gray-700 text-[28px]" />
      <div className="absolute top-[2px] right-[-3px] transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] px-[5px] flex items-center justify-center rounded-full font-bold shadow-md z-50">
        {wishlistCount > 0 ? wishlistCount : "+"}
      </div>
    </div>
  );
}
