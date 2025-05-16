import React, { useEffect, useState } from 'react';
import checkmark from '../assets/checkmark.png'

export default function EnquiryFormModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    budget: '',
    type: '',
  });

  // 🟡 Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        city: '',
        budget: '',
        type: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-90 mt-40 sm:mt-5">
      <div className="bg-white rounded-xl p-6 w-80 shadow-xl relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl font-bold text-gray-500">&times;</button>
        {!submitted ? (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">Enquiry Form</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" placeholder="First Name" value={formData.name} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded"  required />
              <input name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded"   required/>
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded"  required/>
              <input name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded"  required/>
              <input name="type" placeholder="Typewise" value={formData.type} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded"  required/>
              <button type="submit" className="w-full bg-[#003B4A] text-white py-2 rounded hover:bg-[#005666]">Submit</button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <img src={checkmark} alt="Submitted" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Form Submitted</h3>
          </div>
        )}
      </div>
    </div>
  );
}
