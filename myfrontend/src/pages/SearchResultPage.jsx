import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


export default function SearchResultPage({ category, availability, location, budget }) {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
 const queryCategory = searchParams.get('category');

  // Support fallback from query parameters
  const queryState = searchParams.get('state');
  const queryBank = searchParams.get('bank');
  const queryLocation = searchParams.get('location');

  

  useEffect(() => {
    fetch('/propertyData.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  // Convert string price to number (₹ 2.10 Crore -> 21000000)
  const parsePrice = (price) => {
    if (price.includes('Lakh')) {
      return parseFloat(price.replace(/[₹ ,Lakh]/g, '')) * 100000;
    } else if (price.includes('Crore')) {
      return parseFloat(price.replace(/[₹ ,Crore]/g, '')) * 10000000;
    }
    return 0;
  };
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

  const filtered = data.filter((item) => {
   

     const matchCategory = category
  ? item.category === category
  : queryCategory
  ? getCategoryName(item.category) === queryCategory
  : true;

    const matchStatus = availability ? item.propertyStatus === availability : true;
const matchLocation =
  (location || queryLocation)
    ? item.location.toLowerCase().includes((location || queryLocation).toLowerCase())
    : true;

    const matchBudget = budget ? parsePrice(item.bankPrice) <= parseInt(budget) : true;

    const matchQueryState = queryState
      ? item.state.toLowerCase() === queryState.toLowerCase()
      : true;
    const matchQueryBank = queryBank
      ? item.bankName.toLowerCase() === queryBank.toLowerCase()
      : true;

// Category mapping logic



    return (
      matchCategory &&
      matchStatus &&
      matchLocation &&
      matchBudget &&
      matchQueryState &&
      matchQueryBank
    );
  });

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6'>
      {filtered.map((item) => (
        <div key={item.id} className='bg-white rounded-xl shadow-md p-4'>
          <img src={item.image} alt={item.title} className='w-full h-48 object-cover rounded-lg mb-3' />
          <h2 className='text-lg font-semibold mb-2'>{item.title}</h2>

          <p
            className={`text-sm font-semibold px-2 py-1 rounded-full inline-block mb-2 ${
              item.propertyStatus === 'Available'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {item.propertyStatus}
          </p>

          <p><strong>Bank Price :-</strong> <span className='text-red-600'>{item.bankPrice}</span></p>
          <p><strong>Market Price :-</strong> {item.marketPrice}</p>
          <p><strong>Area :-</strong> {item.areaSqFt}</p>
          <p><strong>Auction Date :-</strong> {item.auctionDate}</p>
          <p><strong>Location :-</strong> {item.location}, {item.state}</p>

          <div className='mt-3'>
            <a
              href={`/detailspage?id=${item.id}`}
              className='text-blue-700 font-semibold flex items-center gap-1'
            >
              View More →
            </a>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className='col-span-full text-center text-gray-600 text-lg'>
          No properties match your filters.
        </div>
      )}
    </div>
  );
}
