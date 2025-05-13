import React, { useState } from 'react';

export default function Expert_Advice() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the backend or show an alert)
    alert('Form Submitted!');
  };

  return (
    <div className="container bg-gray-50 py-3 px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-semibold text-[#0B3448] mb-4 pb-2">Calling An Expert?</h2>
          <p className="text-lg text-gray-700 mb-6">
            If you have any questions, concerns, or need help navigating our platform, feel free to reach out. We’re here to ensure your experience on Auctionwale is smooth and hassle-free. Whether you’re a first-time bidder or a seasoned auction participant, we’re happy to assist you at every step.
          </p>
          <p className="text-lg text-gray-700">
            Auctionwale is your trusted destination for online auctions of various plots and vehicles. If you need support or have inquiries about ongoing or upcoming auctions, don’t hesitate to contact us. Your satisfaction is our priority, and we’re committed to providing clear guidance and prompt responses.
          </p>
        </div>

        {/* Right Section: Form */}
        <div className="md:w-1/2 bg-[#0B3448] text-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">We’d love to hear from you! Let’s get in touch</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                required
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              required
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              required
            />

            {/* Reason for Call */}
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              required
            >
              <option value="">Specify your Reason</option>
              <option value="Support">Support</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Other">Other</option>
            </select>

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Leave Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              required
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
