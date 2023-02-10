import React from 'react'
import { services } from '../../utils/services'

const OurServices = () => {
  return (
    <div className='flex my-4 bg-white rounded-lg p-4'>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
       {
                services.map((i,j)=>(
                  <div className='flex px-4 py-2 items-center gap-5' key={j}>
                <img src={i.image} alt="services" />
                <div>
                <h6 className='font-semibold text-lg  text-gray-900'>{i.title}</h6>
                <p className='font-normal text-sm text-gray-400'>{i.tagline}</p>
                </div>
              </div>
                ))
              }
       </div>
    </div>
  )
}

export default OurServices