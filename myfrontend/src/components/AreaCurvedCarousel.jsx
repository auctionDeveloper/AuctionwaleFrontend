import React, { useRef, useState, useEffect } from "react";
import { Heart, ArrowLeftCircle, ArrowRightCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://picsum.photos/id/1015/1000/700",
  "https://picsum.photos/id/1016/1000/700",
  "https://picsum.photos/id/1018/1000/700",
  "https://picsum.photos/id/1019/1000/700",
  "https://picsum.photos/id/1020/1000/700",
  "https://picsum.photos/id/1021/1000/700",
  "https://picsum.photos/id/1022/1000/700",
];

export default function AreaCurvedCarousel() {
  const scrollRef = useRef(null);
  const dropdownRef = useRef(null);
  const [liked, setLiked] = useState(Array(images.length).fill(false));
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const STORAGE_KEY = "wishlist_area";

  const toggleLike = (index) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);

    const currentWishlist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const imageItem = {
      id: index,
      src: images[index],
      title: `Image Title ${index + 1}`,
      subtitle: "2-word Text",
    };

    if (updatedLikes[index]) {
      const exists = currentWishlist.find((item) => item.id === index);
      if (!exists) {
        const updated = [...currentWishlist, imageItem];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } else {
      const updated = currentWishlist.filter((item) => item.id !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const scroll = (dir) => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth + 32;
    if (dir === "left") container.scrollLeft -= cardWidth;
    else container.scrollLeft += cardWidth;
  };

  const handleOptionClick = (price) => {
    navigate(`/area_auction?budget=${price}`);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const restoredLikes = images.map((_, index) =>
      storedWishlist.some((item) => item.id === index)
    );
    setLiked(restoredLikes);
  }, []);

  return (
    <div className="w-full bg-white relative overflow-hidden">
      <div className="relative w-full z-10 py-[50px] overflow-visible">
        {/* Top Oval */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-30"
          style={{
            top: "-100px",
            width: "105vw",
            height: "270px",
            backgroundColor: "#ffffff",
            borderBottomLeftRadius: "100%",
            borderBottomRightRadius: "100%",
            userSelect: "none",
          }}
        />

        {/* Dropdown & Title */}
        <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 z-[9999] w-full flex flex-col items-center justify-center">
          <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-red-600 pb-1 mb-2">
              Areawise Auctions
            </h2>
            <ChevronDown className="text-gray-700 hover:text-red-600 mb-2" />
          </div>
          <p className="text-gray-500 text-sm sm:text-base font-medium mt-1">
            Save Your pocket by looking <span className="font-semibold text-gray-700">areawise</span> projects.
          </p>
        </div>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-[110px] left-1/2 transform -translate-x-1/7 bg-white shadow-lg rounded-md z-[10000] w-48"
          >
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick("under-25-lakhs")}>Under 25 Lakhs</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick("25-50-lakhs")}>25 - 50 Lakhs</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick("above-50-lakhs")}>Above 50 Lakhs</li>
            </ul>
          </div>
        )}

        {/* Bottom Oval */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-[150vw] z-30 pointer-events-none pb-1"
          style={{
            bottom: "-390px",
            height: "590px",
            backgroundColor: "#ffffff",
            borderTopLeftRadius: "100%",
            borderTopRightRadius: "100%"
          }}
        >
          <div className="absolute bottom-[490px] left-1/2 -translate-x-1/2 z-40 flex gap-6 pointer-events-auto items-center justify-center">
            <button onClick={() => scroll("left")}>
              <ArrowLeftCircle className="w-10 h-10 text-black hover:text-red-600 transition" />
            </button>
            <button onClick={() => scroll("right")}>
              <ArrowRightCircle className="w-10 h-10 text-black hover:text-red-600 transition" />
            </button>
          </div>
        </div>

        {/* Image Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar px-[5vw] space-x-5"
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="group shrink-0 w-[30vw] sm:w-[22vw] h-[60vh] sm:h-[90vh] rounded-3xl overflow-hidden relative transition-transform duration-300 z-20"
            >
              <img
                src={src}
                alt={`img-${index}`}
                className="w-full h-full object-cover rounded-3xl"
              />
              {/* Heart Icon */}
              <div
                onClick={() => toggleLike(index)}
                className="absolute top-[125px] right-4 z-40 cursor-pointer hover:scale-110 transition-transform"
              >
                <div className="bg-white rounded-full p-2 shadow-md flex items-center justify-center w-8 sm:w-11 h-8 pb-1 sm:h-11">
                  {liked[index] ? (
                    <Heart className="w-4 sm:w-6 h-4 sm:h-6 text-red-500 fill-red-500" />
                  ) : (
                    <Heart className="w-4 sm:w-6 h-4 sm:h-6 text-gray-400" />
                  )}
                </div>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end text-white rounded-3xl">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end items-center text-center sm:text-left px-1 sm:px-14 pb-6 sm:pb-8 py-10 gap-2 sm:gap-0">
                  <div className="absolute bottom-40">
                    <p className="text-base sm:text-lg md:text-xl font-semibold">Image Title</p>
                    <p className="text-xs sm:text-sm opacity-80">2-word Text</p>
                  </div>
                  <button
                    onClick={() => navigate('/area_auction')}
                    className="absolute bottom-40 sm:bottom-44 right-[0] sm:right-10 text-white text-2xl font-bold p-2 hover:scale-110 transition"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
