import { useState, useEffect } from "react";
import { MapPin, User, Coins, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [propertyData, setPropertyData] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [localities, setLocalities] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("Residential");
  const [selectedCity, setSelectedCity] = useState("");
  const [localityIndex, setLocalityIndex] = useState(0);
  const [typewriter, setTypewriter] = useState("");
  const [typedSearch, setTypedSearch] = useState("");
  const [typingStarted, setTypingStarted] = useState(false);
  const [auctionType, setAuctionType] = useState("");
  const [budget, setBudget] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/propertyData.json") // Replace with your actual API
      .then((res) => res.json())
      .then((data) => {
        setPropertyData(data);

        const citySet = new Set();
        const categorySet = new Set();
        const budgetSet = new Set();

        const parsedBudgets = [];

        data.forEach((item) => {
          if (item.location) citySet.add(item.location);
          if (item.category) categorySet.add(item.category);

          const price = parseInt(item.bankPrice.replace(/[^0-9]/g, ""));
          if (!isNaN(price)) parsedBudgets.push(price);
        });

        const mappedBudgets = parsedBudgets.map((price) => {
          if (price <= 5000000) return "0 - 50 L";
          if (price <= 10000000) return "50 L - 1 Cr";
          return "1 Cr+";
        });

        setCities(Array.from(citySet));
        setCategories(Array.from(categorySet));
        setBudgets([...new Set(mappedBudgets)]);
      });
  }, []);

  useEffect(() => {
    if (!selectedCity || typingStarted) return;

    const localitiesSet = new Set();
    propertyData.forEach((item) => {
      if (item.location === selectedCity && item.propertyAddress) {
        const parts = item.propertyAddress.split(",");
        const locality = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        if (locality) localitiesSet.add(locality);
      }
    });

    const localitiesArray = Array.from(localitiesSet);
    setLocalities(localitiesArray);

    const interval = setInterval(() => {
      setTypewriter(localitiesArray[localityIndex] || "");
      setLocalityIndex((prev) =>
        prev + 1 >= localitiesArray.length ? 0 : prev + 1
      );
    }, 1200);

    return () => clearInterval(interval);
  }, [selectedCity, localityIndex, typingStarted, propertyData]);

  const handleInputChange = (e) => {
    setTypedSearch(e.target.value);
    if (!typingStarted) setTypingStarted(true);
  };

  const handleSearchClick = () => {
    const query = new URLSearchParams({
      category: selectedCategory,
      city: selectedCity,
      keyword: typedSearch || typewriter,
      auctionType,
      budget,
    }).toString();
    navigate(`/search_result_page?${query}`);
  };

  return (
    <div className="w-auto px-4 md:px-8 py-10 flex justify-center bg-white relative">
      <div className="w-full max-w-6xl flex flex-col items-center relative text-xs">
        {/* 🔵 Blue Tab */}
        <div className="bg-[#123243] rounded-t-full py-4 px-6 w-full lg:w-[600px] z-0 mx-2">
          <div className="flex justify-center flex-wrap gap-x-1 sm:gap-x-6 gap-y-1 sm:gap-y-2 text-white text-xs lg:text-md pb-6">
            {categories.map((cat, index) => (
              <div key={cat} className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setSelectedCategory(cat)}
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

        {/* ⚪ Search Bar */}
        <div className="w-full lg:w-[850px] h-[45px] sm:h-[50px] mt-[-24px] bg-white border border-red-700 rounded-full flex overflow-hidden items-stretch z-10 relative shadow-sm text-xs">
          {/* 📍 Location */}
          <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300 flex-grow md:flex-grow-0">
            <MapPin className="text-gray-500 w-4 h-3 sm:w-4 sm:h-4" />
            <select
              className="bg-transparent outline-none text-xs w-full"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setLocalityIndex(0);
                setTypedSearch("");
                setTypingStarted(false);
              }}
            >
              <option value="" disabled>
                Location
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* 🏘 Search Input */}
          <div className="flex items-center px-3 py-2 border-r border-gray-300 flex-grow">
            <input
              type="text"
              placeholder="Search for Auctions"
              className={`bg-transparent outline-none w-full text-xs ${
                typedSearch ? "text-black" : "text-gray-500"
              }`}
              value={typedSearch || (!typingStarted && typewriter) || ""}
              onChange={handleInputChange}
            />
              {typedSearch && localities.length > 0 && typingStarted && (
    <ul className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-300 shadow-md rounded-md z-20 max-h-48 overflow-y-auto text-black text-xs">
      {localities
        .filter((loc) =>
          loc.toLowerCase().includes(typedSearch.toLowerCase())
        )
        .map((loc) => (
          <li
            key={loc}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onMouseDown={() => {
              setTypedSearch(loc);
              setTypingStarted(false);
            }}
          >
            {loc}
          </li>
        ))}
    </ul>
  )}
          </div>

          {/* 👤 Auction Type */}
          <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300 flex-grow md:flex-grow-0">
            <User className="text-gray-500 w-4 h-4" />
            <select
              className="bg-transparent outline-none text-xs w-full"
              value={auctionType}
              onChange={(e) => setAuctionType(e.target.value)}
            >
              <option value="" disabled>
                Auction Type
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 💰 Budget */}
          <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300 flex-grow md:flex-grow-0">
            <Coins className="text-gray-500 w-4 h-4" />
            <select
              className="bg-transparent outline-none text-xs w-full"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="" disabled>
                Budget
              </option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* 🔍 Search Button */}
          <button
            onClick={handleSearchClick}
            className="bg-red-700 px-4 flex items-center justify-center rounded-r-full shrink-0"
          >
            <Search className="text-white w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
