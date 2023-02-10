import React from 'react'
import Animate from './Animate'

const CategorySkeleton = () => {
  return (
    <div className=' overflow-hidden rounded-lg'>
         <div className="w-full h-[150px] bg-indigo-50     rounded-lg overflow-hidden">
            <Animate/>
        </div>
    </div>
  )
}

export default CategorySkeleton