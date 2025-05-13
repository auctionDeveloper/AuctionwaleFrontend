import React, { useEffect, useRef, useState } from "react";

const StatePropertyTabs = () => {
  const mockAPIResponse = {
    Maharashtra: {
      "Bank Auctions": ["Kanjurmarg", "Kurla", "Byculla", "Andheri"],
      "Flats": ["Kurla", "Vasai", "Malabar Hill", "Chembur"],
      "Plots": ["Kanjurmarg", "Kurla", "Byculla", "Andheri"],
      "Industrial Properties": ["Kanjurmarg", "Kurla", "Byculla", "Andheri"],
      "Commercial Properties": ["Kanjurmarg", "Kurla", "Byculla", "Andheri"]
    },
    "Madhya Pradesh": {"Bank Auctions": ["Bhopal"], "Flats": ["Indore"], "Plots": ["Jabalpur"], "Industrial Properties": ["Bhopal"], "Commercial Properties": ["Indore"] },
    Punjab: {},
    "Andhra Pradesh": {},
    "Arunachal Pradesh": {},
    Pune: {},
    Tamilnadu: {},
    Bihar: {},
    UttarPardesh: {},
    Kashmir: {},
    Uttarakhand: {},
    Rajasthan: {},
    Karnataka: {},
    Gujarat: {},
    Goa: {},
    Jharkhand: {}
  };

  const [propertyData, setPropertyData] = useState({});
  const [activeState, setActiveState] = useState("Maharashtra");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const categories = [
    "Bank Auctions",
    "Flats",
    "Plots",
    "Industrial Properties",
    "Commercial Properties"
  ];

  useEffect(() => {
    setTimeout(() => {
      setPropertyData(mockAPIResponse);
      setLoading(false);
    }, 300);
  }, []);

  const states = Object.keys(propertyData);

  const smoothScroll = (direction) => {
    const container = scrollRef.current;
    const distance = window.innerWidth < 768 ? 330 : 550;
    const step = 1;
    let scrolled = 0;

    const scrollStep = () => {
      if (scrolled < distance) {
        container.scrollBy({
          left: direction === "right" ? step : -step,
          behavior: "auto"
        });
        scrolled += step;
        requestAnimationFrame(scrollStep);
      }
    };

    scrollStep();
  };

  if (loading) return <div className="p-4">Loading data...</div>;

  return (
    <div className="w-full px-4 mt-4">
      {/* 🔺 Scrollable State Tabs */}
      <div className="relative flex items-center border-b pb-2">
        {/* ⬅ Scroll Left */}
        <button
          onClick={() => smoothScroll("left")}
          className="absolute left-0 z-10 px-3 py-1 bg-white text-xl font-bold text-gray-600"
        >
          &lt;
        </button>

        {/* Scrollable Container */}
        <div className="mx-10 w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 scroll-smooth hide-scroll"
          >
            {states.map((state) => (
              <button
                key={state}
                onClick={() => setActiveState(state)}
                className={`text-base font-medium whitespace-nowrap px-4 py-2 ${
                  activeState === state
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-700"
                }`}
                style={{
                  flex: "0 0 auto",
                  minWidth: window.innerWidth < 768 ? "33.33%" : "14.28%",
                  textAlign: "center"
                }}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* ➡ Scroll Right */}
        <button
          onClick={() => smoothScroll("right")}
          className="absolute right-0 z-10 px-3 py-1 bg-white text-xl font-bold text-gray-600"
        >
          &gt;
        </button>
      </div>

      {/* 🔻 Property Categories */}
      <div className="mt-6 grid grid-cols-3 sm:grid-cols-5 gap-6 text-sm">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="font-semibold text-gray-800 mb-2">{cat}</h3>
            <ul className="space-y-1 text-gray-700">
              {(propertyData[activeState]?.[cat] || []).map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatePropertyTabs;
