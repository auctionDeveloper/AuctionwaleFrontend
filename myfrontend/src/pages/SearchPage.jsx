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
      <h1 className="text-2xl font-bold mb-4">🔍 Search Results</h1>
      
      <div className="space-y-2 text-gray-700">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>Keyword:</strong> {keyword}</p>
        <p><strong>Auction Type:</strong> {auctionType}</p>
        <p><strong>Budget:</strong> {budget}</p>
      </div>

  
    </div>
  );
}