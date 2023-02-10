import React from 'react'
import Animate from './Animate'

const ProductDetailsSkeleton = () => {
  return (
    <div className='flex my-4 rounded-lg flex-col gap-4 overflow-hidden'>
      {
        [1,2,3,4,5].map(el => (
            <div key={el} className='w-full h-[30px] rounded-lg  bg-indigo-50   overflow-hidden '>
            <Animate/>
          </div>
        ))
      }
      <div  className='w-[50%] h-[30px] rounded-lg  bg-indigo-50   overflow-hidden '>
            <Animate/>
          </div>
       <div className='flex items-center gap-4'>
       {
        [1,2,3].map(el => (
            <div  className='w-[50px] h-[50px] rounded-full  bg-indigo-50   overflow-hidden '>
        <Animate/>
       </div>
        ))
       }
       </div>
    </div>
  )
}

export default ProductDetailsSkeleton