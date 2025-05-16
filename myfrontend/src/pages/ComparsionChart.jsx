import React from 'react'
import Features from './Features'
import comparisonchartpic from '../assets/comparisonchartpic.png'

export default function ComparsionChart() {
  return (
       <div className='container flex flex-col justify-center mx-auto'>
         <Features />
         <div className='w-full flex flex-col sm:flex-row justify-center items-center mt-8 px-4 flex-1 gap-6'>
   
           <div className='w-full sm:w-1/2 flex flex-col items-center justify-center mb-6 sm:flex-1 w-full'>
             <h1 className='text-center text-2xl text-[#0B3448] font-semibold sm:font-extrabold mb-3'>
              Why Comparison Chart
Required?
             </h1>
             <p className='text-center mb-2 text-[#0B3448] sm:text-lg'>
               To make sure you are getting a competitive deal, we provide a comprehensive comparison between the current market rate and the auctioneer's offer rate. This comparison helps you evaluate whether the property is priced fairly, allowing you to assess its potential for growth and profitability.
             </p>
           </div>
   
           <div className='w-full sm:w-1/2 flex items-center justify-center mb-6 sm:flex-1 '>
             <img
               src={comparisonchartpic}
               alt="comparisonchartpic"
               className="w-full max-w-md max-h-96 object-contain border rounded"
             />
           </div>
   
   
         </div>
   
   
       </div>
  )
}
