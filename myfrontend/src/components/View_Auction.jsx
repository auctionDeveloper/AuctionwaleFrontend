import React, { useState } from "react";

export default function View_Auction() {
  // Filters state to manage selected filters
  const [filters, setFilters] = useState({
    budget: "5 Lac",
    propertyType: "",
    location: "",
    availability: "",
  });

  const [isFiltersVisible, setFiltersVisible] = useState(false); // Toggles filter visibility
  const [selectedFilter, setSelectedFilter] = useState(""); // Tracks selected filter for mobile dropdown

  // Handling changes in filter values
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Sample auction data
  const auctionData = [
    {
      title: "Industrial Plot for Sale in Mysore, Mysuru",
      amount: "₹ 2.70 Crore",
      savings: "₹ 20 Lakhs",
      propertyType: "Industrial",
      address: "Navi - Mumbai, Vashi, Vashi-400703",
      startDate: "12-05-2025 11:00",
      endDate: "12-05-2025 11:00",
    },
    {
      title: "Residential Plot for Sale in Pune",
      amount: "₹ 1.20 Crore",
      savings: "₹ 15 Lakhs",
      propertyType: "Residential",
      address: "Pune, Shivaji Nagar, 411005",
      startDate: "15-06-2025 14:00",
      endDate: "15-06-2025 14:00",
    },
    // More auctions can be added here
  ];

  // Filtering auctions based on selected filters
  const filteredAuctions = auctionData.filter((auction) => {
    return (
      (filters.budget ? auction.amount === filters.budget : true) &&
      (filters.propertyType ? auction.propertyType === filters.propertyType : true) &&
      (filters.location ? auction.address.includes(filters.location) : true) &&
      (filters.availability ? auction.availability === filters.availability : true)
    );
  });

  return (
    <div className="p-8 flex flex-col md:flex-row">
      {/* Filter Button on Mobile */}
      <div className="md:hidden flex justify-between mb-4">
        <button
          className="text-2xl text-blue-600"
          onClick={() => setFiltersVisible(!isFiltersVisible)}
        >
          <i className="fas fa-filter"></i> {/* Filter Icon */}
        </button>
      </div>

      {/* Mobile Filters Dropdown Section */}
      {isFiltersVisible && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-md p-4 z-20">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setFiltersVisible(false)}
              className="text-xl text-gray-500"
            >
              Close
            </button>
          </div>

          {/* Filter options as buttons with dropdown */}
          <div className="flex space-x-4 overflow-x-auto py-2">
            {["budget", "propertyType", "location", "availability"].map(
              (filter) => (
                <div key={filter} className="flex flex-col items-center w-24">
                  <button
                    className="rounded-full border py-2 px-4 mb-2"
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter[0].toUpperCase() + filter.slice(1)}
                  </button>

                  {/* Display dropdown when filter button is clicked */}
                  {selectedFilter === filter && (
                    <div className="w-full">
                      {filter === "budget" && (
                        <select
                          name="budget"
                          value={filters.budget}
                          onChange={handleFilterChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="5 Lac">5 Lac</option>
                          <option value="10 Lac">10 Lac</option>
                          <option value="50 Lac">50 Lac</option>
                          <option value="1 Cr">1 Cr</option>
                          <option value="3+ Cr">3+ Cr</option>
                        </select>
                      )}
                      {filter === "propertyType" && (
                        <select
                          name="propertyType"
                          value={filters.propertyType}
                          onChange={handleFilterChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select Type</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Agricultural">Agricultural</option>
                          <option value="Others">Others</option>
                        </select>
                      )}
                      {filter === "availability" && (
                        <select
                          name="availability"
                          value={filters.availability}
                          onChange={handleFilterChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select Availability</option>
                          <option value="Sold">Sold</option>
                          <option value="Unsold">Unsold</option>
                          <option value="Upcoming">Upcoming</option>
                        </select>
                      )}
                      {filter === "location" && (
                        <input
                          type="text"
                          name="location"
                          value={filters.location}
                          onChange={handleFilterChange}
                          placeholder="e.g. Mumbai"
                          className="w-full p-2 border rounded"
                        />
                      )}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Desktop Filters Sidebar */}
      <div className="md:block w-1/4 p-4 bg-white shadow-md rounded-md hidden">
        <h3 className="text-xl font-semibold mb-4">Filters</h3>
        <div className="mb-4">
          <label className="block mb-2">Budget</label>
          <select
            name="budget"
            value={filters.budget}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="5 Lac">5 Lac</option>
            <option value="10 Lac">10 Lac</option>
            <option value="50 Lac">50 Lac</option>
            <option value="1 Cr">1 Cr</option>
            <option value="3+ Cr">3+ Cr</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Property Type</option>
            <option value="Industrial">Industrial</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="e.g. Mumbai"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Availability</label>
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Availability</option>
            <option value="Sold">Sold</option>
            <option value="Unsold">Unsold</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      {/* Auction Listings Table */}
      <div className="w-full md:w-3/4 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Auction Listings</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Auction Title</th>
                <th className="px-4 py-2 text-left border-b">Auction Amount</th>
                <th className="px-4 py-2 text-left border-b">Savings</th>
                <th className="px-4 py-2 text-left border-b">Property Type</th>
                <th className="px-4 py-2 text-left border-b">Address</th>
                <th className="px-4 py-2 text-left border-b">Auction Date</th>
                <th className="px-4 py-2 text-left border-b">More Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuctions.map((auction, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{auction.title}</td>
                  <td className="px-4 py-2 border-b">{auction.amount}</td>
                  <td className="px-4 py-2 border-b">{auction.savings}</td>
                  <td className="px-4 py-2 border-b">{auction.propertyType}</td>
                  <td className="px-4 py-2 border-b">{auction.address}</td>
                  <td className="px-4 py-2 border-b">{auction.startDate}</td>
                  <td className="px-4 py-2 border-b">
                    <button className="text-blue-600 hover:underline">View More</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
