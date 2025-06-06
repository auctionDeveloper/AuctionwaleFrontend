import React, { useRef, useState, useEffect } from "react";
import { Heart, ArrowLeftCircle, ArrowRightCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AreaCarousel() {
  const scrollRef = useRef(null);
  const [liked, setLiked] = useState([]);
  const [locations, setLocations] = useState([]);
   const dropdownRef = useRef(null);
    const [propertyData, setPropertyData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
  
  const navigate = useNavigate();

  const STORAGE_KEY = "wishlist_area";

  useEffect(() => {
    fetch("/propertyData.json")
      .then((res) => res.json())
      .then((json) => {
        const uniqueLocations = [...new Set(json.map((item) => item.location))];
        setLocations(uniqueLocations);
        setPropertyData(json);
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const restoredLikes = json.map((item) =>
  saved.some((w) => w.id === item.id && w.src === item.image)
);
setLiked(restoredLikes);

      });
  }, []);

const toggleLike = (index) => {
  const updatedLikes = [...liked];
  updatedLikes[index] = !updatedLikes[index];
  setLiked(updatedLikes);

  const property = propertyData[index]; // ✅ get the actual property item

  const imageItem = {
    id: property.id || index, // fallback to index if no id
    src: property.image,
    title: property.title || "Untitled Property",
    location: property.location || "Unknown",
    subtitle: property.area || "",
  };

  const currentWishlist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (updatedLikes[index]) {
    // Only add if not already present
    const exists = currentWishlist.some((item) => item.id === imageItem.id && item.src === imageItem.src);
    if (!exists) {
      const updatedWishlist = [...currentWishlist, imageItem];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWishlist));
    }
  } else {
    // Remove from wishlist
    const updatedWishlist = currentWishlist.filter(
      (item) => !(item.id === imageItem.id && item.src === imageItem.src)
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWishlist));
  }

  window.dispatchEvent(new Event("wishlistUpdated"));
};


  const scroll = (dir) => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth + 32;
    if (dir === "left") container.scrollLeft -= cardWidth;
    else container.scrollLeft += cardWidth;
  };

  const handleOptionClick = (range) => {
  setShowDropdown(false);
  navigate(`/search_result_page?location=${location}`);
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

  return (
    <div className="w-full bg-white relative mt-[-53px] sm:mt-[-25px]">
      <div className="w-full py-8 px-5">
        <div className="flex flex-col items-center justify-center mb-6">
                    <div
  className="flex items-center gap-2 text-md  sm:text-3xl font-bold text-gray-800 border-b-2 sm:border-b-4 border-red-600 pb-1 mb-2 cursor-pointer"
  onClick={() => setShowDropdown(!showDropdown)}
>
  Areawise Auctions
  <svg
    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${showDropdown ? "rotate-180" : "rotate-0"}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</div>

          <p className="text-[11px] sm:text-base text-gray-500 mt-[-5px] items-center">
            Choose your <span className="font-semibold text-gray-700">Dream Area</span>
          </p>
        </div>

         {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-[50px] left-1/2 transform -translate-x-1/7 bg-white shadow-lg rounded-md z-[10000] w-30 sm:w-48"
          >
           <ul className="text-sm text-gray-700">
  {locations.slice(0, 6).map((location, idx) => (
    <li
      key={idx}
      className="px-4 py-1 sm:py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        setShowDropdown(false);
        navigate(`/search_result_page?location=${encodeURIComponent(location)}`);
      }}
    >
      {location}
    </li>
  ))}
  <li
    className="px-4 py-1 sm:py-2 text-red-600 hover:bg-gray-100 cursor-pointer font-medium border-t"
    onClick={() => {
      setShowDropdown(false);
      navigate("/area_auction");
    }}
  >
    See More
  </li>
</ul>



          </div>
        )}

        <div ref={scrollRef} className="mt-[-10px] flex overflow-x-auto scroll-smooth no-scrollbar space-x-3 sm:space-x-5">
          {propertyData.map((property, index) => (
  <div
    key={index}
    className="group shrink-0 w-[190px] sm:w-[320px] h-[240px] sm:h-[400px] overflow-hidden relative bg-gray-100 rounded-md"
  >
    <img src={property.image} alt={`img-${index}`} className="w-full h-full object-cover" />

    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <p className="text-white text-lg sm:text-2xl font-bold drop-shadow-md  transition-opacity duration-300">
        {property.location || "Loading..."}
      </p>
    </div>

    <div
      onClick={(e) => {
        e.stopPropagation();
        toggleLike(index);
      }}
      className="absolute top-2 right-2 cursor-pointer hover:scale-110 transition-transform z-10"
    >
      <div className="bg-white rounded-full p-1.5 sm:p-2 shadow-md flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
        {liked[index] ? (
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
        ) : (
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        )}
      </div>
    </div>

    <div className="absolute inset-x-0 bottom-0 h-full  bg-black/10 transition-all duration-300 flex flex-col justify-end text-white px-3 sm:px-4 pb-3 sm:pb-4">
      
     
      <button
         onClick={() => {
      const location = encodeURIComponent(property.location || "Unknown");
      const bankPrice = encodeURIComponent(property.bankPrice || "0");
      navigate(`/search_result_page?location=${location}`);
    }}
        className="absolute bottom-3 right-3 text-white bg-red-600 rounded-full p-1.5 sm:p-2 hover:bg-red-700"
      >
        <ArrowRight size={16} className="sm:hidden" />
        <ArrowRight size={20} className="hidden sm:block" />
      </button>
    </div>
  </div>
))}
                     
        </div>
      </div>

      <div className="flex justify-center gap-4 sm:gap-6 mb-6">
        <button onClick={() => scroll("left")}>
          <ArrowLeftCircle className="w-8 h-8 sm:w-10 sm:h-10 text-black hover:text-red-600 transition hidden sm:block" />
        </button>
        <button onClick={() => scroll("right")}>
          <ArrowRightCircle className="w-8 h-8 sm:w-10 sm:h-10 text-black hover:text-red-600 transition hidden sm:block" />
        </button>
      </div>
    </div>
  );
}
