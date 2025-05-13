import { useState, useEffect } from "react";
import { MapPin, User, Coins, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Residential  |",
  " Commercial  |",
  " Industrial  |",
  " Land  |",
  " Plant Machinery  |",
  " Vehicle",
];

const cityLocalities = {
  Mumbai: ["Andheri", "Bandra", "Juhu", "Worli", "Chembur", "Malabar Hill", "Powai", "Versova", "Colaba"],
  Pune: ["Kothrud", "Baner", "Viman Nagar", "Hadapsar", "Kharadi", "Wagholi"],
  Hyderabad: ["Banjara Hills", "Madhapur", "Gachibowli", "Secunderabad"],
  Chennai: ["T Nagar", "Anna Nagar", "Adyar", "Velachery"],
  Delhi: ["Dwarka", "Karol Bagh", "Lajpat Nagar", "Rohini", "Connaught Place"],
};

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState("Residential");
  const [selectedCity, setSelectedCity] = useState("");
  const [localityIndex, setLocalityIndex] = useState(0);
  const [typewriter, setTypewriter] = useState("");
  const [typedSearch, setTypedSearch] = useState("");
  const [typingStarted, setTypingStarted] = useState(false);
  const [auctionType, setAuctionType] = useState("");
  const [budget, setBudget] = useState("");

  const navigate = useNavigate();
  const cities = Object.keys(cityLocalities);

  useEffect(() => {
    if (!selectedCity || typingStarted) return;

    const localities = cityLocalities[selectedCity];
    const interval = setInterval(() => {
      setTypewriter(localities[localityIndex]);
      setLocalityIndex((prev) => (prev + 1 >= localities.length ? 0 : prev + 1));
    }, 1200);

    return () => clearInterval(interval);
  }, [selectedCity, localityIndex, typingStarted]);

  const handleInputChange = (e) => {
    setTypedSearch(e.target.value);
    if (!typingStarted) setTypingStarted(true);
  };

  const handleSearchClick = () => {
    const query = new URLSearchParams({
      category: selectedCategory.replace("|", "").trim(),
      city: selectedCity,
      keyword: typedSearch || typewriter,
      auctionType,
      budget,
    }).toString();
    navigate(`/search?${query}`);
  };

  return (
    <div className="w-auto px-4 md:px-8 py-10 flex justify-center bg-white relative">
      <div className="w-full max-w-6xl flex flex-col items-center relative text-xs">
        {/* 🔵 Blue Tab */}
        <div className="bg-[#123243] rounded-t-full py-4 px-6 w-full sm:w-[750px] z-0 mx-2">
          <div className="flex justify-center flex-wrap gap-x-1 sm:gap-x-6 gap-y-1 sm:gap-y-2 text-white text-xs pb-6">
            {categories.map((cat, index) => (
              <div key={cat} className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`${selectedCategory === cat ? "font-semibold underline" : ""}`}
                >
                  {cat.replace("|", "").trim()}
                </button>
                {index !== categories.length - 1 && (
                  <span className="text-white leading-none pb-1">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ⚪ Search Bar */}
        <div className="w-full h-[45px] sm:h-[55px] mt-[-24px] bg-white border border-red-700 rounded-full flex overflow-hidden items-stretch z-10 relative shadow-sm text-xs">
          {/* 📍 Location */}
          <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300 flex-grow md:flex-grow-0">
            <MapPin className="text-gray-500 w-4 h-4" />
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
              <option value="">Location</option>
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
          </div>

          {/* 👤 Auction Type */}
          <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300 flex-grow md:flex-grow-0">
            <User className="text-gray-500 w-4 h-4" />
            <select
              className="bg-transparent outline-none text-xs w-full"
              value={auctionType}
              onChange={(e) => setAuctionType(e.target.value)}
            >
              <option value="">Auction Type</option>
              <option value="Bank Auction">Bank Auction</option>
              <option value="Govt Auction">Govt Auction</option>
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
              <option value="">Budget</option>
              <option value="0 - 50 L">0 - 50 L</option>
              <option value="50 L - 1 Cr">50 L - 1 Cr</option>
              <option value="1 Cr+">1 Cr+</option>
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
