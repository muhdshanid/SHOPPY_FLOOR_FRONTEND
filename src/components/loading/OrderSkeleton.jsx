import React from 'react'
import Animate from './Animate'

const OrderSkeleton = () => {
  return (
    <div className='overflow-hidden rounded-lg'>
        <div className="w-full h-[300px] bg-indigo-50     rounded-lg overflow-hidden">
            <Animate/>
        </div>
    </div>
  )
}

export default OrderSkeleton