import React, { useEffect, useState } from 'react';

export default function Testimonials() {
  const isLoggedIn = true;

  const [loggedUser, setLoggedUser] = useState({
    name: 'Unknown',
    profilePic: 'https://randomuser.me/api/portraits/lego/1.jpg'
  });

  const [form, setForm] = useState({
    location: '',
    stars: 0,
    review: ''
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('testimonials');
    return saved
      ? JSON.parse(saved)
      : [
          {
            name: 'Rakesh Jain',
            location: 'Pune',
            stars: 5,
            review:
              'Thanks to AuctionWale, I finally found a commercial property in my city that matched my budget. Smooth and transparent process!',
            profilePic: 'https://randomuser.me/api/portraits/men/11.jpg'
          },
          {
            name: 'Snehal Kulkarni',
            location: 'Thane',
            stars: 4,
            review: 'I found a perfect flat in Navi Mumbai. The AuctionWale team made everything so easy!',
            profilePic: 'https://randomuser.me/api/portraits/women/21.jpg'
          }
        ];
  });

  useEffect(() => {
    const stored = localStorage.getItem('signupProfile');
    if (stored) {
      const user = JSON.parse(stored);
      setLoggedUser({
        name: user.name || 'Unknown',
        profilePic:
          user.profilePic ||
          `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStarClick = (val) => {
    setForm((prev) => ({ ...prev, stars: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = {
      name: loggedUser.name || 'Unknown',
      location: form.location || 'Unknown',
      stars: form.stars || 0,
      review: form.review || 'No comments provided.',
      profilePic: loggedUser.profilePic
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setForm({ location: '', stars: 0, review: '' });
  };

  const renderStars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

  return (
    <div className="container flex flex-col md:flex-row w-full mx-auto mt-9 border border-gray-300 shadow rounded overflow-hidden">
      {/* Left Column: Form */}
      <div className="w-full md:w-1/3 p-6 bg-white border-b md:border-b-0 md:border-r border-gray-200 max-h-fit overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#0B3448] mb-2">Testimonials</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          At AuctionWale, our mission is to make property auctions more accessible,
          transparent, and efficient for everyone. But don’t just take our word for it —
          hear what our users have to say about their AuctionWale experience.
        </p>

        {isLoggedIn && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <textarea
              name="review"
              placeholder="Your Review"
              value={form.review}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
            />

            {/* Star Picker */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  onClick={() => handleStarClick(val)}
                  className={`cursor-pointer text-xl ${
                    val <= form.stars ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <button
              type="submit"
              className="bg-[#0B3448] text-white px-3 py-1 rounded text-sm hover:bg-[#092d3f]"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>

      {/* Right Column: Testimonials */}
      <div className="w-full md:w-2/3 overflow-y-auto p-6 bg-white space-y-6 h-64 sm:h-84 md:h-700 min-h-[350px]">
        {testimonials.map((t, i) => (
          <div key={i} className="border-b pb-4">
            <div className="flex items-center gap-3 mb-1">
              <img
                src={t.profilePic}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-black text-base">{t.name}</h3>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  {t.location} ·{' '}
                  <span className="text-yellow-400">{renderStars(t.stars)}</span>
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700">{t.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
