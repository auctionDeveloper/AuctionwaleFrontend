import React from 'react'
import Features from './Features'
import publicsalespic from '../assets/publicsalespic.png'
export default function PublicSalesNotice() {
  return (
        <div className='container flex flex-col justify-center mx-auto'>
      <Features />
      <div className='w-full flex flex-col sm:flex-row justify-center items-center mt-8 px-4 flex-1 gap-6'>

        <div className='w-full sm:w-1/2 flex flex-col items-center justify-center mb-6 sm:flex-1 w-full'>
          <h1 className='text-center text-2xl text-[#0B3448] font-semibold sm:font-extrabold mb-3'>
            Why Public/sales & Notice
Required?
          </h1>
          <p className='text-center mb-2 text-[#0B3448] sm:text-lg'>
           We provide access to the original sales or public notices issued by auctioneers, banks, or seller parties. This crucial documentation provides full transparency regarding the auction process, terms, and conditions, as well as any important legal notices that could affect the sale.
          </p>
        </div>

        <div className='w-full sm:w-1/2 flex items-center justify-center mb-6 sm:flex-1 '>
          <img
            src={publicsalespic}
            alt="publicsalespic"
            className="w-full max-w-md max-h-96 object-contain border rounded"
          />
        </div>


      </div>


    </div>
  )
}
