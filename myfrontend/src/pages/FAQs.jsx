import React, { useState } from "react";

const faqData = [
  {
    question: "What is e-Auction? When should Forward and Reverse Auction be used?",
    answer:
      "An e-Auction is an online bidding process to sell or buy goods/property. Forward Auctions are used when sellers offer items and buyers place bids. Reverse Auctions are used when buyers request services/products and sellers compete with lowest prices."
  },
  {
    question: "Who is a Bidder?",
    answer:
      "A bidder is an individual or organization that places a bid in an auction to purchase a listed property or service."
  },
  {
    question: "Are the Auction Events Private or public? How confidential is the Auction data?",
    answer:
      "Auction events can be both private and public. Data confidentiality is maintained through secure login credentials and encrypted platforms."
  },
  {
    question: "Forgotten user name and / or password: How to retrieve the same?",
    answer:
      "Use the 'Forgot Username/Password' link on the login page to retrieve credentials via your registered email or mobile number."
  },
  {
    question: "What format of documents can be uploaded? And up to what size?",
    answer:
      "Common formats like PDF, DOCX, and JPEG are supported. Each document should not exceed 5 MB in size unless specified otherwise."
  },
  {
    question: "Can a Bidder view his Auction data history ?",
    answer:
      "Yes, bidders can view their bidding history, including properties bid on, bid amounts, and status, through their dashboard."
  },
  {
    question: "Are Auction Events Private or Public?",
    answer:
      "Public auctions are open to all registered users, whereas private auctions are limited to invited bidders only."
  },
  {
    question: "What is an Auction Reserve Price?",
    answer:
      "It is the minimum price set by the seller below which the item cannot be sold. Bids must meet or exceed this amount."
  },
  {
    question: "How Can I View Additional Information About a Property?",
    answer:
      "Click on the property listing to view detailed specifications, documents, photos, videos, valuation reports, and contact details."
  },
  {
    question: "Where Are the Properties Located?",
    answer:
      "Property locations are listed within the auction details. You can filter properties by city, region, or locality."
  }
];

export default function AuctionFAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#f4f1f1] p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-8">
      <div className="bg-[#0B3448] text-white font-semibold px-4 py-2 rounded-t-md shadow-sm">
        FAQs for Auctions
      </div>
      <div className="bg-[#f4f1f1] rounded-b-md">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 px-4 py-3 cursor-pointer"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center">
              <span className="text-[#1f1f1f] font-medium">{index + 1}. {item.question}</span>
              <span className="text-gray-400 text-xl">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <p className="text-sm text-gray-600 mt-2">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
