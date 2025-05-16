import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EnquiryFormModal from '../components/EnquiryFormModal';
import UnlockMobilePopup from '../components/UnlockMobilePopup';
import UnlockSalesPopup from '../components/UnlockSalesPopup';
import ReserveAmountPopup from '../components/ReserveAmountPopup';


export default function DetailsPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [property, setProperty] = useState(null);

  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [showUnlockSales, setShowUnlockSales] = useState(false);
  const [showReservePopup, setShowReservePopup] = useState(false);



  useEffect(() => {
    fetch('/propertyData.json')
      .then((res) => res.json())
      .then((data) => setProperty(data[id]))
      .catch((err) => console.error("Error loading data:", err));
  }, [id]);

  if (!property) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <EnquiryFormModal isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />

      <div className="max-w-5xl mx-auto p-4">
        {/* Mobile layout */}
        <div className="block sm:hidden space-y-6">
          {/* Image */}
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-60 object-cover rounded-lg shadow-md"
          />

          {/* Description */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{property.title}</h1>
            <p className={`text-sm font-semibold px-2 py-1 rounded-full inline-block mb-2 ${
              property.propertyStatus === 'Available'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {property.propertyStatus}
            </p>
            <p><strong>Bank Price :-</strong> <span className="text-red-600">{property.bankPrice}</span></p>
            <p><strong>Market Price :-</strong> <span className="font-semibold">{property.marketPrice}</span></p>
            <p><strong>Borrower Name :-</strong> {property.borrowerName}</p>
            <p><strong>Bank Name :-</strong> {property.bankName}</p>
            <p><strong>Property Address :-</strong> {property.propertyAddress}</p>
            <p><strong>Area in Sq.ft :-</strong> {property.areaSqFt}</p>
            <p><strong>Auction Date :-</strong> {property.auctionDate}</p>

            <div className="mt-4 bg-gray-100 p-3 rounded space-y-2 text-blue-800 text-sm font-medium">
              <a href="#" className="block" onClick={() => setShowUnlockSales(true)}>📄 Sales / Public Notice</a>
              <a href="#" className="block" onClick={() => setShowEnquiry(true)}>📈 Valuation Report</a>
              <a href="#" className="block" onClick={() => setShowEnquiry(true)}>🧾 Title Search Report</a>
              <a href="#" className="block" onClick={() => setShowEnquiry(true)}>📸 Inspection Photos/Videos</a>
              <a href="#" className="block" onClick={() => setShowEnquiry(true)}>📋 Due Diligence Report</a>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button onClick={() => setShowUnlock(true)} className='bg-[#930000] text-white px-4 py-2 rounded-full w-full text-sm'>
              📞 Banker Mobile No.
            </button>
            <button onClick={() => setShowEnquiry(true)} className='bg-[#930000] text-white px-4 py-2 rounded-full w-full text-sm'>
              🏢 Inspection Booking
            </button>
            <button onClick={() => setShowReservePopup(true)} className='bg-[#930000] text-white px-4 py-2 rounded-full w-full text-sm'>
              💰 Save Amount
            </button>
            <button onClick={() => setShowEnquiry(true)} className='bg-[#930000] text-white px-4 py-2 rounded-full w-full text-sm'>
              📊 Market Comparison
            </button>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden sm:grid grid-cols-2 gap-6">
          {/* Left: Image + Buttons */}
          <div className="flex flex-col">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-60 object-cover rounded-lg shadow-md mb-4"
            />
            <div className="space-y-3">
              <button onClick={() => setShowUnlock(true)} className='bg-[#930000] text-white px-4 py-2 rounded-full w-full text-sm'>
                📞 Banker Mobile No.
              </button>
              <button onClick={() => setShowEnquiry(true)} className='bg-[#930000] text-white px-4 py-2 rounded-full w-full text-sm'>
                🏢 Inspection Booking
              </button>
              <button onClick={() => setShowReservePopup(true)} className='bg-[#930000] text-white px-4 py-2 rounded-full w-full text-sm'>
                💰 Save Amount
              </button>
              <button onClick={() => setShowEnquiry(true)} className='bg-[#930000] text-white px-4 py-2 rounded-full w-full text-sm'>
                📊 Market Comparison
              </button>
            </div>
          </div>

          {/* Right: Description */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{property.title}</h1>
            <p className={`text-sm font-semibold px-2 py-1 rounded-full inline-block mb-2 ${
              property.propertyStatus === 'Available'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {property.propertyStatus}
            </p>
            <p><strong>Bank Price :-</strong> <span className="text-red-600">{property.bankPrice}</span></p>
            <p><strong>Market Price :-</strong> <span className="font-semibold">{property.marketPrice}</span></p>
            <p><strong>Borrower Name :-</strong> {property.borrowerName}</p>
            <p><strong>Bank Name :-</strong> {property.bankName}</p>
            <p><strong>Property Address :-</strong> {property.propertyAddress}</p>
            <p><strong>Area in Sq.ft :-</strong> {property.areaSqFt}</p>
            <p><strong>Auction Date :-</strong> {property.auctionDate}</p>

            <div className="mt-4 bg-gray-100 p-3 rounded space-y-2 text-blue-800 text-sm font-medium">
              <a href="#" className="block" onClick={() => setShowUnlockSales(true)}>📄 Sales / Public Notice</a>
              <a href="#" className="block" onClick={() => setShowEnquiry(true)}>📈 Valuation Report</a>
              <a href="#" className="block" onClick={() => setShowEnquiry(true)}>🧾 Title Search Report</a>
              <a href="#" className="block" onClick={() => setShowEnquiry(true)}>📸 Inspection Photos/Videos</a>
              <a href="#" className="block" onClick={() => setShowEnquiry(true)}>📋 Due Diligence Report</a>
            </div>
          </div>
        </div>
      </div>

      <UnlockMobilePopup
        isOpen={showUnlock}
        onClose={() => setShowUnlock(false)}
        onContinue={() => {
          setShowUnlock(false);
          alert('Banker number unlocked!');
        }}
      />

      <UnlockSalesPopup
  isOpen={showUnlockSales}
  onClose={() => setShowUnlockSales(false)}
  onContinue={() => {
    setShowUnlockSales(false);
    alert("Sales/Public Notice Unlocked!");
  }}
/>

<ReserveAmountPopup
  isOpen={showReservePopup}
  onClose={() => setShowReservePopup(false)}
  reserveAmount={property.bankPrice}
/>

    </>
  );
}
