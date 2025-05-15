import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react"; // Use any link icon you prefer

export default function MoreCities() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/propertyData.json")
      .then((res) => res.json())
      .then((json) => {
        // Get unique locations, sorted alphabetically
        const uniqueLocations = Array.from(
          new Set(json.map((item) => item.location))
        ).sort((a, b) => a.localeCompare(b));
        setLocations(uniqueLocations);
      });
  }, []);

  // Split locations into 3 roughly equal columns
  const columns = [[], [], []];
  locations.forEach((loc, idx) => {
    columns[idx % 3].push(loc);
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">More Cities</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-3">
            {col.map((location) => (
              <Link
                to={`/search_result_page?location=${encodeURIComponent(location)}`}
                key={location}
                className="flex items-center gap-2 text-blue-700 hover:underline"
              >
                <LinkIcon size={16} />
                <span>{location}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
