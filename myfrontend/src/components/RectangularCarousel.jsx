import React, { useRef, useState, useEffect } from "react";
import { Heart, ArrowLeftCircle, ArrowRightCircle, ArrowRight } from "lucide-react";
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

export default function RectangularCarousel() {
  const scrollRef = useRef(null);
  const [liked, setLiked] = useState(Array(images.length).fill(false));
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const STORAGE_KEY = "wishlist_area";

  useEffect(() => {
    fetch("/propertyData.json")
      .then((res) => res.json())
      .then((json) => {
        const uniqueLocations = [...new Set(json.map((item) => item.location))];
        setLocations(uniqueLocations);
      });
  }, []);

  const toggleLike = (index) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);

    const currentWishlist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const imageItem = {
      id: index,
      src: images[index],
      title: `Areawise Auction ${index + 1}`,
      subtitle: "Explore Nearby Projects",
    };

    if (updatedLikes[index]) {
      const exists = currentWishlist.find((item) => item.id === index && item.src === images[index]);
      if (!exists) {
        const updated = [...currentWishlist, imageItem];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } else {
      const updated = currentWishlist.filter((item) => !(item.id === index && item.src === images[index]));
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

  return (
    <div className="w-full bg-white relative">
      <div className="w-full py-8 px-4 sm:px-10">
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800 border-b-4 border-red-600 pb-1 mb-2">
            Areawise Auctions
          </h2>
          <p className="text-xs sm:text-base text-gray-500 mt-1">
            Browse <span className="font-semibold text-gray-700">location-wise</span> properties across regions.
          </p>
        </div>

        <div ref={scrollRef} className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-4 sm:space-x-5">
          {images.map((src, index) => (
            <div
              key={index}
              className="group shrink-0 w-[220px] sm:w-[320px] h-[280px] sm:h-[400px] overflow-hidden relative bg-gray-100 rounded-md"
              onClick={() =>
                navigate(`/search_result_page?location=${encodeURIComponent(locations[index] || "Unknown")}`)
              }
            >
              <img src={src} alt={`img-${index}`} className="w-full h-full object-cover" />

              {/* Location hover text */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <p className="text-white text-lg sm:text-2xl font-bold drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {locations[index] || "Loading..."}
                </p>
              </div>

              {/* Wishlist Heart */}
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

              {/* Hover content */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end text-white px-3 sm:px-4 pb-3 sm:pb-4">
                <p className="text-sm sm:text-lg font-semibold">Areawise Auction</p>
                <p className="text-xs sm:text-sm text-gray-200">Explore Nearby Projects</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/view_auction');
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
          <ArrowLeftCircle className="w-8 h-8 sm:w-10 sm:h-10 text-black hover:text-red-600 transition" />
        </button>
        <button onClick={() => scroll("right")}>
          <ArrowRightCircle className="w-8 h-8 sm:w-10 sm:h-10 text-black hover:text-red-600 transition" />
        </button>
      </div>
    </div>
  );
}
