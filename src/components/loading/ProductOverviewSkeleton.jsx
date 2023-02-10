import React from 'react'
import Animate from './Animate'

const ProductOverviewSkeleton = () => {
  return (
    <div className='flex my-4 rounded-lg flex-col gap-4 overflow-hidden'>
         <div className="w-full h-[29pc] bg-indigo-50     rounded-lg overflow-hidden">
            <Animate/>
        </div>
        <div className='flex items-center gap-4  rounded-lg'>
        <div className="w-[25%] h-[8rem] bg-indigo-50     rounded-lg overflow-hidden">
            <Animate/>
        </div>
        <div className="w-[25%] h-[8rem] bg-indigo-50     rounded-lg overflow-hidden">
            <Animate/>
        </div>
        <div className="w-[25%] h-[8rem] bg-indigo-50     rounded-lg overflow-hidden">
            <Animate/>
        </div>
        <div className="w-[25%] h-[8rem] bg-indigo-50     rounded-lg overflow-hidden">
            <Animate/>
        </div>
        </div>
    </div>
  )
}

export default ProductOverviewSkeleton