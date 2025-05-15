import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Just image URLs — no location names
const images = [
  "https://picsum.photos/id/1011/1000/500",
  "https://picsum.photos/id/1012/1000/500",
  "https://picsum.photos/id/1013/1000/500",
  "https://picsum.photos/id/1014/1000/500",
  "https://picsum.photos/id/1016/1000/500",
  "https://picsum.photos/id/1018/1000/500",
  "https://picsum.photos/id/1020/1000/500",
  "https://picsum.photos/id/1022/1000/500",
  "https://picsum.photos/id/1024/1000/500",
  "https://picsum.photos/id/1026/1000/500",
];

export default function TopAuctionCities() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/propertyData.json")
      .then((res) => res.json())
      .then((json) => {
        const uniqueLocations = [...new Set(json.map((item) => item.location?.toLowerCase()))];
        setLocations(uniqueLocations);
      });
  }, []);

  return (
    <div className="w-full bg-white py-10 px-5 sm:px-10">
      <div className="flex flex-col items-center justify-center mb-6 pb-2">
        <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-red-600 pb-1 mb-2">
          Top Auction Cities
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {locations.slice(0, images.length).map((location, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/search_result_page?location=${encodeURIComponent(location)}`)
            }
            className="relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300 group"
          >
            <img
              src={images[index]}
              alt={location}
              className="w-full h-40 object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold capitalize">{location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
