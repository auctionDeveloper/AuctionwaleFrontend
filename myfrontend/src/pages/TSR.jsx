import React from 'react'
import Features from './Features'
import TSRPic from '../assets/tsr.png'

export default function TSR() {
  return (
        <div className='container flex flex-col justify-center mx-auto'>
      <Features />
      <div className='w-full flex flex-col sm:flex-row justify-center items-center mt-8 px-4 flex-1 gap-6'>

        <div className='w-full sm:w-1/2 flex flex-col items-center justify-center mb-6 sm:flex-1 w-full'>
          <h1 className='text-center text-2xl text-[#0B3448] font-semibold sm:font-extrabold mb-3'>
            Why TSR  Required?
          </h1>
          <p className='text-center mb-2 text-[#0B3448] sm:text-lg'>
            A clean and clear title is essential for any investment. At Auctionwale.com, we provide a detailed title search report, confirming that the property is free from any disputes, encumbrances, or legal claims. This guarantees that your investment is legally sound and protected from any future title-related issues.
          </p>
        </div>

        <div className='w-full sm:w-1/2 flex items-center justify-center mb-6 sm:flex-1 '>
          <img
            src={TSRPic}
            alt="TSR"
            className="w-full max-w-md max-h-96 object-contain border rounded"
          />
        </div>


      </div>


    </div>
  )
}
