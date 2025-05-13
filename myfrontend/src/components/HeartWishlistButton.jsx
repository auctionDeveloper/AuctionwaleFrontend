import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function HeartWishlistButton() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateWishlistCount = () => {
      const budget = JSON.parse(localStorage.getItem("wishlist_budget")) || [];
      const area = JSON.parse(localStorage.getItem("wishlist_area")) || [];

      // Optional: Remove duplicates based on id + src
      const combined = [...budget, ...area];
      const unique = combined.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id && t.src === item.src)
      );

      setWishlistCount(unique.length);
    };

    updateWishlistCount();
    window.addEventListener("wishlistUpdated", updateWishlistCount);
    window.addEventListener("storage", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
      window.removeEventListener("storage", updateWishlistCount);
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
