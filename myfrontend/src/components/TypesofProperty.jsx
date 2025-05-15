import React from 'react';
import { useNavigate } from 'react-router-dom';

const propertyTypes = [
  {
    title: 'Industrial',
    image: 'https://via.placeholder.com/150?text=Industrial',
  },
  {
    title: 'Residential',
    image: 'https://via.placeholder.com/150?text=Residential',
  },
  {
    title: 'Commercial',
    image: 'https://via.placeholder.com/150?text=Commercial',
  },
  {
    title: 'Agricultural',
    image: 'https://via.placeholder.com/150?text=Agricultural',
  },
  {
    title: 'Plant & Machinery',
    image: 'https://via.placeholder.com/150?text=Others',
  },
];

export default function TypesofProperty() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/view_auction`);
  };

  return (
    <div className="bg-[#062c3f] py-10 px-4 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold pb-2">Types of properties</h2>
      <p className="text-sm mt-1 text-gray-300">
        Save Your pocket by looking <span className="font-semibold text-white">budgetwise</span> projects.
      </p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center pb-2">
        {propertyTypes.map((type) => (
          <div
            key={type.title}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
            onClick={() => handleClick(type.title)}
          >
            <img
              src={type.image}
              alt={type.title}
              className="w-32 h-32 object-cover rounded-md shadow-md"
            />
            <p className="mt-2 text-sm font-medium">{type.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
