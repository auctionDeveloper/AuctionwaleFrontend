import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const StatePropertyTabs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stateFromQuery = queryParams.get("state");

  const [propertyData, setPropertyData] = useState({});
  const [activeState, setActiveState] = useState(stateFromQuery || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const categories = [
    "Bank Auctions",
    "Flats",
    "Plots",
    "Industrial Properties",
    "Commercial Properties",
  ];

  const getCategoryName = (category) => {
    switch (category) {
      case "Residential":
        return "Flats";
      case "Agricultural":
        return "Plots";
      case "Industrial":
        return "Industrial Properties";
      case "Commercial":
        return "Commercial Properties";
      case "Plant & Machinery":
        return "Bank Auctions";
      default:
        return "Bank Auctions";
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/propertyData.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const flatData = await response.json();

        // Transform flat array into nested state > category > locations format
        const structuredData = {};

        flatData.forEach((item) => {
          const state = item.state;
          const category = getCategoryName(item.category);

          if (!structuredData[state]) {
            structuredData[state] = {};
          }
          if (!structuredData[state][category]) {
            structuredData[state][category] = [];
          }

          // Push unique locations only
          if (!structuredData[state][category].includes(item.location)) {
            structuredData[state][category].push(item.location);
          }
        });

        setPropertyData(structuredData);

        const states = Object.keys(structuredData);
        if (stateFromQuery && states.includes(stateFromQuery)) {
          setActiveState(stateFromQuery);
        } else if (states.length > 0) {
          setActiveState(states[0]);
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [stateFromQuery]);

  const states = Object.keys(propertyData);

  const smoothScroll = (direction) => {
    const container = scrollRef.current;
    const distance = window.innerWidth < 768 ? 330 : 550;
    const step = 5;
    let scrolled = 10;

    const scrollStep = () => {
      if (scrolled < distance) {
        container.scrollBy({
          left: direction === "right" ? step : -step,
          behavior: "auto",
        });
        scrolled += step;
        requestAnimationFrame(scrollStep);
      }
    };

    scrollStep();
  };

  if (loading) return <div className="p-4">Loading data...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (states.length === 0) return <div className="p-4">No data found</div>;

  return (
    <div className="w-full px-4 mt-4">
      {/* Scrollable State Tabs */}
      <div className="relative flex items-center border-b pb-2">
        {/* Scroll Left */}
        <button
          onClick={() => smoothScroll("left")}
          className="absolute left-0 z-10 px-3 py-1 bg-white text-xl font-bold text-gray-600"
        >
          &lt;
        </button>

        {/* Scrollable Container */}
        <div className="mx-10 w-full overflow-hidden">
          <div ref={scrollRef} className="flex gap-6 scroll-smooth hide-scroll">
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
                  textAlign: "center",
                }}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Right */}
        <button
          onClick={() => smoothScroll("right")}
          className="absolute right-0 z-10 px-3 py-1 bg-white text-xl font-bold text-gray-600"
        >
          &gt;
        </button>
      </div>

      {/* Property Categories */}
      <div className="mt-6 grid grid-cols-3 sm:grid-cols-5 gap-6 text-sm">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="font-semibold text-gray-800 mb-2">{cat}</h3>
            <ul className="space-y-1 text-gray-700">
              {(propertyData[activeState]?.[cat] || []).map((location, index) => (
                <li key={index}>
                  <Link
                    to={`/search_result_page?state=${encodeURIComponent(activeState)}&location=${encodeURIComponent(location)}&category=${encodeURIComponent(cat)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatePropertyTabs;
