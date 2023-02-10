import React from 'react'
import Animate from './Animate'

const CategoryPopupSkeleton = () => {
  return (
    <div className=' overflow-hidden rounded-lg'>
    <div className="h-[70px] w-[200px] bg-indigo-50     rounded-lg overflow-hidden">
    <Animate/>
   </div>
</div>
  )
}

export default CategoryPopupSkeleton