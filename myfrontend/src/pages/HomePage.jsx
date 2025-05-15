import React from 'react'
import CurvedCarousel from '../components/CurvedCarousel'
import Testimonials from '../components/Testimonials'
import BankAuction from '../components/BankAuction'
import MissionVision from '../components/MissionVision'
import WhyUseAuctionwale from '../components/WhyUseAuctionwale'
import SearchBar from '../components/SearchBar'
import StatePropertyTabs from '../components/StatePropertyTabs'
import AreaCurvedCarousel from '../components/AreaCurvedCarousel'
import TypesofProperty from '../components/TypesofProperty'

export default function HomePage() {
  return (
    <div>
         <SearchBar/>
       <CurvedCarousel/>
       <AreaCurvedCarousel/>
       <TypesofProperty/>
       <WhyUseAuctionwale/>

       <BankAuction/>
       <MissionVision/>
       <Testimonials/>
       <StatePropertyTabs/>
      
  
    </div>
  )
}
