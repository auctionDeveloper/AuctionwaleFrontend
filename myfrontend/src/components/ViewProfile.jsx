import React, { useState } from "react";

export default function View_Auction() {
  const [filters, setFilters] = useState({
    budget: "5 Lac",
    propertyType: "",
    location: "",
    availability: "",
  });

  const [auctions, setAuctions] = useState([
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
      title: "Industrial Plot for Sale in Mysore, Mysuru",
      amount: "₹ 2.70 Crore",
      savings: "₹ 20 Lakhs",
      propertyType: "Industrial",
      address: "Navi - Mumbai, Vashi, Vashi-400703",
      startDate: "12-05-2025 11:00",
      endDate: "12-05-2025 11:00",
    },
    // Add more auctions here...
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredAuctions = auctions.filter((auction) => {
    return (
      (filters.budget ? auction.amount === filters.budget : true) &&
      (filters.propertyType ? auction.propertyType === filters.propertyType : true) &&
      (filters.location ? auction.address.includes(filters.location) : true) &&
      (filters.availability ? auction.availability === filters.availability : true)
    );
  });

  const [isFiltersVisible, setFiltersVisible] = useState(false);

  return (
    <div className="p-8">
      {/* Mobile View: Filter Button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          className="text-2xl text-blue-600"
          onClick={() => setFiltersVisible(!isFiltersVisible)}
        >
          <i className="fas fa-filter"></i> {/* Use a filter icon */}
        </button>
      </div>

      {/* Mobile Filters (Slide-out) */}
      {isFiltersVisible && (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-10">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setFiltersVisible(false)}
              className="text-xl text-gray-500"
            >
              Close
            </button>
          </div>

          <div className="space-y-4">
            {/* Budget Filter */}
            <div>
              <label className="block text-lg">Budget</label>
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

            {/* Property Type Filter */}
            <div>
              <label className="block text-lg">Property Type</label>
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

            {/* Location Filter */}
            <div>
              <label className="block text-lg">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="e.g. Mumbai"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-lg">Availability</label>
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
        </div>
      )}

      {/* Desktop View: Filters on the side */}
      <div className="md:flex">
        <div className="w-1/4 p-4 bg-white shadow-md rounded-md hidden md:block">
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

        {/* Auction Data Table */}
        <div className="w-3/4 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6">Auction Listings</h2>
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
