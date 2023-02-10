import React from 'react'
import Animate from './Animate'

const ReviewSkeleton = () => {
  return (
    <div className='flex my-4 rounded-lg flex-col gap-4 overflow-hidden'>
    <div className="w-full h-[29pc] bg-indigo-50     rounded-lg overflow-hidden">
       <Animate/>
   </div></div>
  )
}

export default ReviewSkeleton