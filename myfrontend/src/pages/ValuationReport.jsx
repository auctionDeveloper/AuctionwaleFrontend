import React from 'react'
import Features from './Features'
import valuationreportpic from '../assets/valuationreport.png'

export default function ValuationReport() {
  return (
        <div className='container flex flex-col justify-center mx-auto'>
      <Features />
      <div className='w-full flex flex-col sm:flex-row justify-center items-center mt-8 px-4 flex-1 gap-6'>

        <div className='w-full sm:w-1/2 flex flex-col items-center justify-center mb-6 sm:flex-1 w-full'>
          <h1 className='text-center text-2xl text-[#0B3448] font-semibold sm:font-extrabold mb-3'>
            Why Valuation Report
Required?
          </h1>
          <p className='text-center mb-2 text-[#0B3448] sm:text-lg'>
           To help you assess the true value of a property, we provide a professional valuation report from certified valuers. This report considers the property’s location, size, and market trends, offering an accurate and unbiased assessment of its market value. With this information, you can ensure that you are making an informed and fair investment.
          </p>
        </div>

        <div className='w-full sm:w-1/2 flex items-center justify-center mb-6 sm:flex-1 '>
          <img
            src={valuationreportpic}
            alt="valuationreportpic"
            className="w-full max-w-md max-h-96 object-contain border rounded"
          />
        </div>


      </div>


    </div>
  )
}
