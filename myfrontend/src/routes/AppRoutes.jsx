import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ViewProfile from "../components/ViewProfile";
import Budget_Auction from "../pages/Budget_Auction";
import Area_Auction from "../pages/Area_Auction";
import Expert_Advice from "../pages/Expert_Advice";
import About from "../pages/About";
import FAQs from "../pages/FAQs";
import HeartWishlistButton from "../components/HeartWishlistButton";
import HeartWishlist from "../pages/HeartWishlist";
import BankAuctionPage from "../components/BankAuctionPage";
import View_Auction from "../components/View_Auction";
import DetailsPage from "../pages/DetailsPage";
import SearchResultPage from "../pages/SearchResultPage";
import PhotoVideos from "../pages/PhotoVideos";
import TSR from "../pages/TSR";
import ValuationReport from "../pages/ValuationReport";
import PublicSalesNotice from "../pages/PublicSalesNotice";
import BankDoc from "../pages/BankDoc";
import ComparsionChart from "../pages/ComparsionChart";


export default function AppRoutes() {
  return (
    <Routes> 
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About/>} />
      <Route path="/profile" element={<ViewProfile />} />
      <Route path="/view_auction" element={<View_Auction />} />
      <Route path="/budget_auction" element={<Budget_Auction />} />
      <Route path="/area_auction" element={<Area_Auction/>} />
      <Route path="/bank_auction" element={<BankAuctionPage/>}/>
      <Route path="/expert_advice" element={<Expert_Advice/>} />
      <Route path="/FAQ" element={<FAQs/>} />
      <Route path="/search_result_page" element={<SearchResultPage/>}/>
      <Route path="/heartwishlist" element={<HeartWishlist />} />
      <Route  path='/detailspage' element={<DetailsPage/>} />



      <Route path='/photovideos' element={<PhotoVideos/>}/>
      <Route path='/tsr' element={<TSR/>}/>
      <Route path='/valuation_report' element={<ValuationReport/>}/>
      <Route path='/public_sales_notice' element={<PublicSalesNotice/>}/>
      <Route path='/bank_doc' element={<BankDoc/>}/>
      <Route path='/comparison_chart' element={<ComparsionChart/>}/>

    </Routes>
  );
}
