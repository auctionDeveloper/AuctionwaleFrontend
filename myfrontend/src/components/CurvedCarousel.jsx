import React, { useRef, useState, useEffect } from "react";
import { Heart, ArrowLeftCircle, ArrowRightCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CurvedCarousel() {
  const scrollRef = useRef(null);
  const [liked, setLiked] = useState([]);
  const [locations, setLocations] = useState([]);
    const dropdownRef = useRef(null);
  const [propertyData, setPropertyData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const STORAGE_KEY ="wishlist_budget";

useEffect(() => {
  fetch("/propertyData.json")
    .then((res) => res.json())
    .then((json) => {
      setLocations([...new Set(json.map((item) => item.location))]);
      setPropertyData(json);
      setLiked(Array(json.length).fill(false)); // ⬅ set liked array based on loaded data
    });
}, []);



const toggleLike = (index) => {
  const updatedLikes = [...liked];
  updatedLikes[index] = !updatedLikes[index];
  setLiked(updatedLikes);

  const currentWishlist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const imageItem = {
  id: index,
  src: propertyData[index].image,
  title: propertyData[index].title,
  location: propertyData[index].location,
  bankPrice: propertyData[index].bankPrice,
  marketPrice: propertyData[index].marketPrice,
};


  if (updatedLikes[index]) {
    const exists = currentWishlist.find(
      (item) => item.id === index && item.src === propertyData[index].image
    );
    if (!exists) {
      const updated = [...currentWishlist, imageItem];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } else {
    const updated = currentWishlist.filter(
      (item) => !(item.id === index && item.src === propertyData[index].image)
    );
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


  
const handleOptionClick = (range) => {
  setShowDropdown(false);

  let min = 0;
  let max = Infinity;

  switch (range) {
    case "10-50-lakh":
      min = 10 * 1e5;
      max = 50 * 1e5;
      break;
    case "50-lakh-1cr":
      min = 50 * 1e5;
      max = 1 * 1e7;
      break;
    case "1cr-3cr":
      min = 1 * 1e7;
      max = 3 * 1e7;
      break;
    case "5cr+":
      min = 5 * 1e7;
      break;
    default:
      break;
  }

  navigate(`/search_result_page?minBudget=${min}&maxBudget=${max}`);
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
    <div className="w-full bg-white relative mt-[-35px]">
      <div className="w-full py-8 px-5">
        <div className="flex flex-col items-center justify-center mb-6">
          <div
  className="flex items-center gap-2 text-md sm:text-3xl font-bold text-gray-800 border-b-2 sm:border-b-4 border-red-600 pb-1 mb-2 cursor-pointer"
  onClick={() => setShowDropdown(!showDropdown)}
>
  Budgetwise Auctions
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
            Choose property on  <span className="font-semibold text-gray-700">Your Budget</span>
          </p>
        </div>
             {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-[50px] left-1/2 transform -translate-x-1/7 bg-white shadow-lg rounded-md z-[10000] w-30 sm:w-48"
          >
            <ul className="text-sm text-gray-700">
  <li className="px-4 py-1 sm:py-2 text-xs sm:text-base hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick("10-50-lakh")}>10 - 50 Lakh</li>
  <li className="px-4 py-1 sm:py-2 text-xs sm:text-base hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick("50-lakh-1cr")}>50 Lakh - 1 Cr</li>
  <li className="px-4 py-1 sm:py-2 text-xs sm:text-base hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick("1cr-3cr")}>1 Cr - 3 Cr</li>
  <li className="px-4 py-1 sm:py-2 text-xs sm:text-base hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick("5cr+")}>5 Cr+</li>
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
<div className="absolute inset-x-0 bottom-0 h-1/4 bg-[#011b25bd] transition-all duration-300 flex flex-col justify-end text-white px-1 sm:px-4 pb-2 sm:pb-4">
<p className="text-sm sm:text-lg font-semibold break-words whitespace-normal leading-tight w-full">
  {property.bankPrice || "Loading..."}
</p>
<p className="text-xs sm:text-sm text-gray-200 break-words whitespace-normal leading-tight w-full pb-1">
  Market Price : {property.marketPrice || "Loading..."}
</p>
<p
  className="text-xs sm:text-sm text-red-600 cursor-pointer font-semibold underline break-words whitespace-normal leading-tight w-full "
  onClick={(e) => {
    e.stopPropagation();
    navigate('/view_auction');
  }}
>
  Explore Nearby Projects
</p>

  <button
    onClick={() => {
      const location = encodeURIComponent(property.location || "Unknown");
      const bankPrice = encodeURIComponent(property.bankPrice || "0");
      navigate(`/detailspage?location=${location}&bankPrice=${bankPrice}`);
    }}
    className="absolute bottom-3 right-3 text-white bg-red-600 rounded-full p-1.5 sm:p-2 hover:bg-red-700 "
  >
    <ArrowRight size={14} className="sm:hidden" />
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
