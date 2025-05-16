import React from 'react'
import Features from './Features'
import bankdocpic from '../assets/bankdocpic.png'

export default function BankDoc() {
  return (
        <div className='container flex flex-col justify-center mx-auto'>
      <Features />
      <div className='w-full flex flex-col sm:flex-row justify-center items-center mt-8 px-4 flex-1 gap-6'>

        <div className='w-full sm:w-1/2 flex flex-col items-center justify-center mb-6 sm:flex-1 w-full'>
          <h1 className='text-center text-2xl text-[#0B3448] font-semibold sm:font-extrabold mb-3'>
           Why Bank Document
Required?
          </h1>
          <p className='text-center mb-2 text-[#0B3448] sm:text-lg'>
            To ensure you are fully informed about the financial standing of the property, we offer relevant bank sanction letters and mortgage documents. These documents confirm the financial backing of the property and clarify any outstanding loans or liabilities, giving you peace of mind about the property's financial status.
          </p>
        </div>

        <div className='w-full sm:w-1/2 flex items-center justify-center mb-6 sm:flex-1 '>
          <img
            src={bankdocpic}
            alt="bankdocpic"
            className="w-full max-w-md max-h-96 object-contain border rounded"
          />
        </div>


      </div>


    </div>
  )
}
