import { useState, useEffect } from "react";
import { MapPin, User, Coins, CalendarDays, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Landmark } from 'lucide-react'; // This looks like a bank building
import { useRef } from "react"; // already present if you're using it




export default function SearchBar() {
  const [propertyData, setPropertyData] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [bankNames, setBankNames] = useState([]);
  const datePickerRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("Residential");
  const [selectedCity, setSelectedCity] = useState("");
  const [auctionType, setAuctionType] = useState("");
  const [budget, setBudget] = useState("");
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [showDatePicker, setShowDatePicker] = useState(false);


  const navigate = useNavigate();

  const getBudgetRange = (label) => {
    switch (label) {
      case "₹10–50 Lakh":
        return { min: 1000000, max: 5000000 };
      case "₹50 Lakh–1 Cr":
        return { min: 5000000, max: 10000000 };
      case "₹1–3 Cr":
        return { min: 10000000, max: 30000000 };
      case "₹5 Cr+":
        return { min: 50000000 };
      default:
        return {};
    }
  };

  const removeFilter = (type) => {
    if (type === "city") setSelectedCity("");
    if (type === "auctionType") setAuctionType("");
    if (type === "budget") setBudget("");
    if (type === "auctionDate") {
      setStartDate("");
      setEndDate("");
      setSelectingStart(true);
    }
  };

  useEffect(() => {
    fetch("/propertyData.json")
      .then((res) => res.json())
      .then((data) => {
        setPropertyData(data);
        const citySet = new Set();
        const categorySet = new Set();
        const budgetNumbers = [];
        const bankNameSet = new Set();

        data.forEach((item) => {
          if (item.location) citySet.add(item.location);
          if (item.category) categorySet.add(item.category);
          if (item.bankName) bankNameSet.add(item.bankName);
          const price = parseInt(item.bankPrice.replace(/[^0-9]/g, ""));
          if (!isNaN(price)) budgetNumbers.push(price);
        });

        setCities(Array.from(citySet));
        setCategories(Array.from(categorySet));
        setBudgets([
          "₹10–50 Lakh",
          "₹50 Lakh–1 Cr",
          "₹1–3 Cr",
          "₹5 Cr+",
        ]);
        setBankNames(Array.from(bankNameSet));
      });
  }, []);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setShowDatePicker(false);
    }
  };

  if (showDatePicker) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showDatePicker]);


  const handleDateChange = (e) => {
    const selected = e.target.value;
    if (selectingStart) {
      setStartDate(selected);
      setEndDate("");
      setSelectingStart(false);
    } else {
      setEndDate(selected);
      setSelectingStart(true);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-IN", options);
  };

  

  const handleSearchClick = () => {
    const query = new URLSearchParams();

    if (selectedCategory) query.set("category", selectedCategory);
    if (selectedCity) query.set("location", selectedCity);
    if (auctionType) query.set("auctionType", auctionType);
    if (startDate) query.set("startDate", startDate);
    if (endDate) query.set("endDate", endDate);

    if (budget) {
      const { min, max } = getBudgetRange(budget);
      if (min) query.set("minBudget", min);
      if (max) query.set("maxBudget", max);
    }

    navigate(`/search_result_page?${query.toString()}`);
  };

  return (
    <div className="relative w-auto px-0.9 sm:px-4 md:px-8 py-10 flex justify-center bg-white pb-2 overflow-visible ">
      <div className="w-full max-w-6xl flex flex-col items-center relative text-xs z-20 overflow-visible">

        {/* Category Tabs */}
        <div className="bg-[#123243] rounded sm:rounded-t-full py-4 px-0 sm:px-6 w-full lg:w-[600px] z-0 mx-0 sm:mx-2">
          <div className="flex justify-center flex-wrap gap-x-0 sm:gap-x-6 gap-y-0 sm:gap-y-2 text-white text-[10px] lg:text-md pb-6">
            {categories.map((cat, index) => (
              <div key={cat} className="flex items-center gap-2 mr-1 sm:gap-2">
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`${
                    selectedCategory === cat ? "font-semibold underline" : ""
                  }`}
                >
                   {cat} 
                </button>
                {index !== categories.length - 1 && (
                  <span className="text-white leading-none pb-1 mx-1 sm:mx-2  sm:block">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full lg:w-[750px] h-[45px] sm:h-[50px] mt-[-24px] bg-white border border-red-700 rounded sm:rounded-full flex items-stretch z-10 shadow-sm text-xs overflow-x-auto no-scrollbar">
          
          {/* City */}
{/* City */}
<div className="w-[130px] sm:w-[160px] flex items-center gap-0 sm:gap-2 px-1 sm:px-3 py-2 border-r border-gray-300">
  <MapPin className="text-gray-500 w-4 h-4 shrink-0" />
  <select
    className="bg-transparent outline-none text-xs sm:text-sm w-full"
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
  >
    <option value="">District</option>
    {cities.map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
</div>

          {/* Auction Date Range */}
          {/* Auction Date Range */}
<div className="w-[200px] sm:w-[265px] flex items-center gap-1 sm:gap-2 px-1 sm:px-3 py-2 border-r border-gray-300">
  <CalendarDays className="text-gray-500 w-4 h-4 shrink-0 cursor-pointer"
  onClick={() => setShowDatePicker(!showDatePicker)} />

  <div
    className="text-[12px] sm:text-xs text-gray-700 leading-snug cursor-pointer truncate"
    onClick={() => setShowDatePicker(!showDatePicker)}
  >
    {startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "From - To"}
  </div>

{showDatePicker && (
  <div
    ref={datePickerRef}
    className="absolute top-14 left-50 bg-white shadow-lg border rounded-md p-2 flex flex-col gap-2 z-50"
  >
    <div className="flex justify-between items-center mb-1">
      <label className="text-xs text-gray-700 font-semibold">Select Dates</label>
      <button
        onClick={() => setShowDatePicker(false)}
        className="text-red-500  font-bold text-sm pb-2"
      >
        ×
      </button>
    </div>

    <label className="text-xs text-gray-500">From:</label>
    <input
      type="date"
      className="text-xs border rounded px-2 py-1"
      value={startDate}
      onChange={(e) => {
        setStartDate(e.target.value);
        if (endDate && new Date(e.target.value) > new Date(endDate)) {
          setEndDate(""); // reset end date if before start
        }
      }}
    />

    <label className="text-xs text-gray-500 mt-2">To:</label>
    <input
      type="date"
      className="text-xs border rounded px-2 py-1"
      value={endDate}
      min={startDate}
      onChange={(e) => {
        setEndDate(e.target.value);
        setShowDatePicker(false); // auto-close after selecting end
      }}
    />
  </div>
)}

</div>


          {/* Bank Name */}
          <div      className="w-[150px] sm:w-[160px] flex items-center gap-0 sm:gap-2 px-1 sm:px-3 py-2 border-r border-gray-300">
         <Landmark className="w-4 h-4 text-gray-500 shrink-0"/>
            <select
              className="bg-transparent outline-none text-[12px] sm:text-xs text-gray-700 truncate w-full"
              value={auctionType}
              onChange={(e) => setAuctionType(e.target.value)}
            >
              <option value="" disabled>Bank Name</option>
              {bankNames.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div      className="w-[150px] sm:w-[160px] flex items-center gap-0 sm:gap-2 px-1 sm:px-3 py-2 border-r border-gray-300">
            <Coins className="text-gray-500 w-4 h-4 " />
            <select
                            className="bg-transparent outline-none text-[12px] sm:text-xs text-gray-700 truncate w-full"
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
            className="bg-red-700 px-4 flex items-center justify-center rounded sm:rounded-r-full"
          >
            <Search className="text-white w-6 h-6 font-semibold" />
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mt-3 text-xs text-black">
          {selectedCity && (
            <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
              📍 {selectedCity}
              <button
                onClick={() => removeFilter("city")}
                className="text-red-600 font-bold text-sm"
              >×</button>
            </div>
          )}
          {startDate && endDate && (
            <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
              📅 {formatDate(startDate)} - {formatDate(endDate)}
              <button
                onClick={() => removeFilter("auctionDate")}
                className="text-red-600 font-bold text-sm"
              >×</button>
            </div>
          )}
          {auctionType && (
            <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
              🏷 {auctionType}
              <button
                onClick={() => removeFilter("auctionType")}
                className="text-red-600 font-bold text-sm"
              >×</button>
            </div>
          )}
          {budget && (
            <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
              💰 {budget}
              <button
                onClick={() => removeFilter("budget")}
                className="text-red-600 font-bold text-sm"
              >×</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
