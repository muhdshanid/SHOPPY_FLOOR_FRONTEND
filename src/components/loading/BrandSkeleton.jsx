import React from 'react'
import Animate from './Animate'

const BrandSkeleton = () => {
  return (
    <div className='rounded-lg overflow-clip'>
           <div className="w-full h-[150px] bg-indigo-50     rounded-lg overflow-hidden">
            <Animate/>
        </div>
    </div>
  )
}

export default BrandSkeleton