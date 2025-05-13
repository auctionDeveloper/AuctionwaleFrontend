// fakeApi.js
const generateAuctionData = () => {
  return [
    {
      id: 1,
      title: "Industrial Plot for Sale in Mysore, Mysuru",
      amount: "₹ 2.70 Crore",
      savings: "₹ 20 Lakhs",
      propertyType: "Industrial",
      address: "Navi - Mumbai, Vashi, Vashi-400703",
      startDate: "12-05-2025 11:00",
      endDate: "12-05-2025 11:00",
    },
    {
      id: 2,
      title: "Residential Plot for Sale in Pune",
      amount: "₹ 1.20 Crore",
      savings: "₹ 15 Lakhs",
      propertyType: "Residential",
      address: "Pune, Shivaji Nagar, 411005",
      startDate: "15-06-2025 14:00",
      endDate: "15-06-2025 14:00",
    },
    {
      id: 3,
      title: "Commercial Property in Navi Mumbai",
      amount: "₹ 3.50 Crore",
      savings: "₹ 25 Lakhs",
      propertyType: "Commercial",
      address: "Navi - Mumbai, Vashi, Vashi-400703",
      startDate: "18-07-2025 10:00",
      endDate: "18-07-2025 10:00",
    },
    // More auction data...
  ];
};

export default generateAuctionData;
