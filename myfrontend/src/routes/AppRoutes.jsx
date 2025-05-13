import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ViewProfile from "../components/ViewProfile";
import View_Acution from "../pages/View_Acution";
import Budget_Auction from "../pages/Budget_Auction";
import Area_Auction from "../pages/Area_Auction";
import Expert_Advice from "../pages/Expert_Advice";
import Features from "../pages/Features";
import About from "../pages/About";
import Contact from "../pages/Contact";
import FAQs from "../pages/FAQs";
import SearchPage from "../pages/SearchPage";
import HeartWishlistButton from "../components/HeartWishlistButton";
import HeartWishlist from "../pages/HeartWishlist";


export default function AppRoutes() {
  return (
    <Routes> 
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About/>} />
      <Route path="/profile" element={<ViewProfile />} />
      <Route path="/view_auction" element={<View_Acution />} />
      <Route path="/budget_auction" element={<Budget_Auction />} />
      <Route path="/area_auction" element={<Area_Auction/>} />
      <Route path="/expert_advice" element={<Expert_Advice/>} />
      <Route path="/features" element={<Features/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/FAQ" element={<FAQs/>} />
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="/heartwishlist" element={<HeartWishlist />} />

    </Routes>
  );
}
