import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  // 🔍 Get values from query
  const category = searchParams.get("category") || "All";
  const city = searchParams.get("city") || "Anywhere";
  const keyword = searchParams.get("keyword") || "";
  const auctionType = searchParams.get("auctionType") || "Any";
  const budget = searchParams.get("budget") || "Any";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg border">
        <h1 className="text-2xl font-bold text-center mb-4">🔍 Search Results</h1>
        
        {/* Property Details */}
        <div className="flex space-x-4 mb-6">
          <img
            src="path_to_property_image.jpg"  // Replace with the path to your image
            alt="Property"
            className="w-40 h-40 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-semibold">Industrial Plot for Sale in Mysore, Mysuru</h2>
            <p><strong>Bank Price:</strong> ₹2.70 Crore</p>
            <p><strong>Market Price:</strong> ₹2.90 Crore</p>
            <p><strong>Borrower Name:</strong> M/s. UK Traders</p>
            <p><strong>Bank Name:</strong> SBI</p>
            <p><strong>Address:</strong> 132/1, Upendra Banerjee Road, Police Station Behala</p>
            <p><strong>Area:</strong> 4,400 sqft</p>
            <p><strong>Auction Date:</strong> 14th May 2025</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg">📞 Banker Mobile No.</button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg">🔍 Inspection Booking</button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg">💰 Save Amount</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">📊 Market Comparison</button>
        </div>

        {/* Additional Links */}
        <div className="flex space-x-4">
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">📑 Sales / Public Notice</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">💼 Valuation Report</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">📝 Title Search Report</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">📸 Inspection Photos/Videos</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">🔍 Due Diligence Report</button>
        </div>
      </div>

      {/* Filter Details */}
      <div className="space-y-2 text-gray-700 mt-6">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>Keyword:</strong> {keyword}</p>
        <p><strong>Auction Type:</strong> {auctionType}</p>
        <p><strong>Budget:</strong> {budget}</p>
      </div>
    </div>
  );
}
