import { useState, useEffect } from "react";
import { MapPin, User, Coins, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [propertyData, setPropertyData] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("Residential");
  const [selectedCity, setSelectedCity] = useState("");
  const [totalAreas, setTotalAreas] = useState([]);
  const [areaIndex, setAreaIndex] = useState(0);
  const [typewriter, setTypewriter] = useState("");
  const [typedSearch, setTypedSearch] = useState("");
  const [typingStarted, setTypingStarted] = useState(false);
  const [auctionType, setAuctionType] = useState("");
  const [budget, setBudget] = useState("");
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

const removeFilter = (type) => {
  if (type === "city") setSelectedCity("");
  if (type === "keyword") setTypedSearch("");
  if (type === "auctionType") setAuctionType("");
  if (type === "budget") setBudget("");
};


  const navigate = useNavigate();

  useEffect(() => {
    fetch("/propertyData.json")
      .then((res) => res.json())
      .then((data) => {
        setPropertyData(data);

        const citySet = new Set();
        const categorySet = new Set();
        const budgetNumbers = [];

        data.forEach((item) => {
          if (item.location) citySet.add(item.location);
          if (item.category) categorySet.add(item.category);
          const price = parseInt(item.bankPrice.replace(/[^0-9]/g, ""));
          if (!isNaN(price)) budgetNumbers.push(price);
        });

        const budgetRanges = budgetNumbers.map((price) => {
          if (price <= 5000000) return "0 - 50 L";
          if (price <= 10000000) return "50 L - 1 Cr";
          return "1 Cr+";
        });

        setCities(Array.from(citySet));
        setCategories(Array.from(categorySet));
        setBudgets([...new Set(budgetRanges)]);
      });
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    const areaSet = new Set();
    propertyData.forEach((item) => {
      if (item.area && item.location === selectedCity) {
        areaSet.add(item.area.trim());
      }
    });

    const areasArray = Array.from(areaSet);
    setTotalAreas(areasArray);
    setAreaIndex(0);
  }, [selectedCity, propertyData]);

  useEffect(() => {
    if (!selectedCity || typingStarted) return;

    const interval = setInterval(() => {
      setTypewriter(totalAreas[areaIndex] || "");
      setAreaIndex((prev) =>
        prev + 1 >= totalAreas.length ? 0 : prev + 1
      );
    }, 1200);

    return () => clearInterval(interval);
  }, [selectedCity, areaIndex, typingStarted, totalAreas]);

 const handleInputChange = (e) => {
  setTypedSearch(e.target.value);
  if (!typingStarted) setTypingStarted(true);
  setShowAreaDropdown(true);
};


const handleSearchClick = () => {
  const query = new URLSearchParams();

  if (selectedCategory) query.set("category", selectedCategory);
  if (selectedCity) query.set("location", selectedCity);  // Correct key
  if (budget) query.set("budget", budget);

  navigate(`/search_result_page?${query.toString()}`);
};


  const filteredAreas = typedSearch
    ? totalAreas.filter((area) =>
        area.toLowerCase().includes(typedSearch.toLowerCase())
      )
    : totalAreas;

    

  return (
   <div
  className="relative w-auto px-1 sm:px-4 md:px-8 py-10 flex justify-center bg-white pb-2 overflow-visible"
  style={{ overflow: "visible", zIndex: 1000 }}
>

      <div className="w-full max-w-6xl flex flex-col items-center relative text-xs z-20 overflow-visible">

        {/* Category Tabs */}
        <div className="bg-[#123243] rounded-t-full py-4 px-0 sm:px-6 w-full lg:w-[600px] z-0 mx-0 sm:mx-2">
          <div className="flex justify-center flex-wrap gap-x-1 sm:gap-x-6 gap-y-0 sm:gap-y-2 text-white text-xs lg:text-md pb-6">
            {categories.map((cat, index) => (
              <div key={cat} className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  className={`${
                    selectedCategory === cat ? "font-semibold underline" : ""
                  }`}
                >
                  {cat}
                </button>
                {index !== categories.length - 1 && (
                  <span className="text-white leading-none pb-1">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full lg:w-[850px] h-[45px] sm:h-[50px] mt-[-24px] bg-white border border-red-700 rounded-full flex items-stretch z-10 shadow-sm text-xs">

          
          
          {/* City */}
<div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 py-2 border-r border-gray-300">
  <MapPin className="text-gray-500 w-4 h-4 sm:w-4 sm:h-4" />

           <select
  className="bg-transparent outline-none text-xs"
  value={selectedCity}
  onChange={(e) => {
    setSelectedCity(e.target.value);
    setTypedSearch("");
    setTypingStarted(false);
    setShowAreaDropdown(false);
  }}
  onFocus={() => setShowAreaDropdown(false)}
>

              <option value="" disabled>Location</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Area Search */}
          <div className="flex items-center px-3 py-2 border-r border-gray-300 flex-grow relative">
            <input
              type="text"
              placeholder="Search for Area"
              className={`bg-transparent outline-none w-full text-xs ${
                typedSearch ? "text-black" : "text-gray-500"
              }`}
              value={typedSearch || (!typingStarted && typewriter) || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Auction Type */}
          <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300">
            <User className="text-gray-500 w-4 h-4" />
            <select
              className="bg-transparent outline-none text-xs"
              value={auctionType}
              onChange={(e) => setAuctionType(e.target.value)}
            >
              <option value="" disabled>Auction Type</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300">
            <Coins className="text-gray-500 w-4 h-4" />
            <select
              className="bg-transparent outline-none text-xs"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="" disabled>Budget</option>
              {budgets.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="bg-red-700 px-4 flex items-center justify-center rounded-r-full"
          >
            <Search className="text-white w-4 h-4" />
          </button>
        </div>
        {/* Filter Tags with Cancel X */}
<div className="flex flex-wrap gap-2 mt-3 text-xs text-black">
  {selectedCity && (
    <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
      📍 {selectedCity}
      <button
        onClick={() => removeFilter("city")}
        className="text-red-600 font-bold text-sm"
      >
        ×
      </button>
    </div>
  )}
  {typedSearch && (
    <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
      🔍 {typedSearch}
      <button
        onClick={() => removeFilter("keyword")}
        className="text-red-600 font-bold text-sm"
      >
        ×
      </button>
    </div>
  )}
  {auctionType && (
    <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
      🏷 {auctionType}
      <button
        onClick={() => removeFilter("auctionType")}
        className="text-red-600 font-bold text-sm"
      >
        ×
      </button>
    </div>
  )}
  {budget && (
    <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
      💰 {budget}
      <button
        onClick={() => removeFilter("budget")}
        className="text-red-600 font-bold text-sm"
      >
        ×
      </button>
    </div>
  )}
</div>


        {/* Area Dropdown */}
      {selectedCity && showAreaDropdown && (

  <div className="w-1/2 lg:w-[150px] max-w-[150px] bg-white border border-gray-300 shadow-md rounded-md max-h-60 overflow-y-auto text-black text-xs mt-1 z-[999] absolute left-[100px] sm:left-[150px] md:left-[150px] lg:left-[250px] top-[95px] sm:top-[100px] lg:top-[100px] pb-2">
    {filteredAreas.map((area, idx) => (
      <div
        key={`area-${idx}`}
        className="px-3 py-2 hover:bg-gray-100 cursor-pointer pb-2"
       onMouseDown={() => {
  setTypedSearch(area);
  setTypingStarted(false);
  setShowAreaDropdown(false); // <-- Close the dropdown
}}
      >
        📐 {area}
      </div>
    ))}

    {filteredAreas.length === 0 && (
      <div className="px-3 py-2 text-gray-500">No matching areas found.</div>
    )}
  </div>
)}

      </div>

    </div>
  );
}
