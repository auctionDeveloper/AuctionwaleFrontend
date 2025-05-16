import React from 'react'
import Features from './Features'
import Photovideopic from '../assets/photovideo.png'
export default function PhotoVideos() {
  return (
    <div className='container flex flex-col justify-center mx-auto'>
      <Features />
      <div className='w-full flex flex-col sm:flex-row justify-center items-center mt-8 px-4 flex-1 gap-6'>

        <div className='w-full sm:w-1/2 flex flex-col items-center justify-center mb-6 sm:flex-1 w-full'>
          <h1 className='text-center text-2xl text-[#0B3448] font-semibold sm:font-extrabold mb-3'>
            Why Photos & Videos Required?
          </h1>
          <p className='text-center mb-2 text-[#0B3448] sm:text-lg'>
            We offer detailed, high-resolution images and video walkthroughs for every property, enabling investors to virtually inspect properties before committing to an investment. This feature ensures transparency and helps you assess the property’s condition, layout, and environment without the need for an on-site visit.
          </p>
        </div>

        <div className='w-full sm:w-1/2 flex items-center justify-center mb-6 sm:flex-1 '>
          <img
            src={Photovideopic}
            alt="Photo and Video"
            className="w-full max-w-md max-h-96 object-contain border rounded"
          />
        </div>


      </div>


    </div>
  )
}
