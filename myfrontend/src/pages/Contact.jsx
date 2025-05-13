import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left Text Section */}
      <div>
        <h2 className="text-4xl font-bold text-[#1f1f1f] mb-4 pb-2">Contact Us</h2>

        <h4 className="text-lg font-semibold text-gray-700 mb-1">Need Assistance?</h4>
        <p className="text-gray-600 mb-4">
          If you have any questions, concerns, or need help navigating our platform,
          feel free to reach out. We’re here to ensure your experience on Auctionwale is smooth and hassle-free.
        </p>

        <h4 className="text-lg font-semibold text-gray-700 mb-1">Get in Touch</h4>
        <p className="text-gray-600">
          Auctionwale is your trusted destination for online auctions of various plots and vehicles. 
          If you need support or have inquiries about ongoing or upcoming auctions, don’t hesitate to contact us. 
          Your satisfaction is our priority, and we’re committed to providing clear guidance and prompt responses.
        </p>
      </div>

      {/* Right Form Section */}
      <form onSubmit={handleSubmit} className="bg-[#0B3448] text-white p-8 rounded-xl shadow-lg space-y-5">
        <h3 className="text-2xl font-bold mb-3">We’d love to hear from you!<br />Let’s get in touch</h3>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="First Name"
            className="w-full px-4 py-2 text-black rounded-md"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="Last Name"
            className="w-full px-4 py-2 text-black rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="eg. aarbo@gmail.com"
            className="w-full px-4 py-2 text-black rounded-md"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+91 9876543210"
            className="w-full px-4 py-2 text-black rounded-md"
          />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="5"
          required
          placeholder="Type your message here....."
          className="w-full px-4 py-2 text-black rounded-md"
        ></textarea>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 transition text-white font-semibold px-6 py-2 rounded-md"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
