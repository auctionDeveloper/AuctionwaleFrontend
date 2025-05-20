import React from 'react';
import { useNavigate } from 'react-router-dom';
import Residential from '../assets/residential.png';
import Commercial from '../assets/commercial.png';
import Industrial from '../assets/industrial.png';
import Agriculture from '../assets/agriculture.png';
import PhotoMachinery from '../assets/plant&machinery.png';

const propertyTypes = [
  {
    title: 'Industrial',
    image: Industrial,
  },
  {
    title: 'Residential',
    image: Residential,
  },
  {
    title: 'Commercial',
    image: Commercial,
  },
  {
    title: 'Agricultural',
    image: Agriculture,
  },
  {
    title: 'Plant & Machinery',
    image: PhotoMachinery,
  },
];

export default function TypesofProperty() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/view_auction`);
  };

  return (
    <div className="relative bg-[#062c3f] py-10 px-4 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold pb-2">Types of properties</h2>
      <div className="mt-8 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center items-center sm:justify-items-center pb-2">
        {propertyTypes.map((type) => (
          <div
            key={type.title}
            className="container flex flex-col items-center cursor-pointer px-4"
            onClick={() => handleClick(type.title)}
          >
            <img
              src={type.image}
              alt={type.title}
              className="w-40 h-40 sm:w-44 sm:h-44 object-cover rounded-md shadow-md hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-3 text-sm font-medium">{type.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
