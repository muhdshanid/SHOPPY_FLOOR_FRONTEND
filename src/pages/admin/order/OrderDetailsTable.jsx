import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { discount } from '../../../utils/discount'

const OrderDetailsTable = ({order}) => {
    const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
    useEffect(()=>{
        setPrice(discount(order?.productId?.price,order?.productId?.discount))
      setTotalPrice(price * order?.quantities)
    },[price,totalPrice])
  return (
    <div>
        <table className="rounded-lg mx-4">
        <thead className="w-full rounded-full bg-gray-800">
          <tr>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
            image
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              quantities
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              price
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              size
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              color
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              total
            </th>
          </tr>
        </thead>
        <tbody>
       
           <tr className="bg-gray-900  even:bg-gray-800">
            <td className="p-4  text-sm text-gray-700">
           <div className="flex items-center justify-center">
           <img
               className="w-16  h-16 object-cover rounded-lg"
               src={order?.productId?.images[0]?.url}
               alt="item"
             />
           </div>
           </td>
           <td className="p-4 text-sm text-gray-700">
             <div className='flex   items-center  justify-center'>
               <h6 className="font-semibold text-lg text-white">{order?.quantities}</h6>
             </div>
           </td>
           <td className="p-4 text-sm text-gray-700">
             <div className='flex   items-center  justify-center'>
               <h6 className="font-semibold text-lg text-white">{price}</h6>
             </div>
           </td>
           <td className="p-4 text-sm text-gray-700">
           <div className='flex   items-center  justify-center'>
               <h6 className="font-semibold text-lg text-white">{order?.size ? order?.size : ""}</h6>
             </div>
           </td>
           <td className="p-4 text-sm text-gray-700">
           <div className='flex   items-center  justify-center'>
           <div style={{backgroundColor:order?.color ? order?.color : ""}} className=' rounded-full w-6 h-6'>
                      </div>
             </div>
           </td>
           <td className="p-4 text-sm text-gray-700">
           <div className='flex   items-center  justify-center'>
               <h6 className="font-semibold text-lg text-white">{totalPrice}</h6>
             </div>
           </td>
           </tr>
        </tbody>
          </table>
          <div className='rounded-lg mx-4 bg-gray-800'>
            <div className='flex p-4 w-full gap-4'>
                <div className='flex w-[20%] flex-col gap-1'>
                    <h6 className='block mb-2 ml-2 text-base text-gray-400'>Customer Name</h6>
                    <h6 className='block mb-2 ml-2 font-semibold text-base text-gray-200'>
                        {order?.userId?.name}
                    </h6>
                </div>
                <div className='flex w-[20%] flex-col gap-1'>
                    <h6 className='block mb-2 ml-2 text-base text-gray-400'>Product Name</h6>
                    <h6 className='block capitalize mb-2 ml-2 font-semibold text-base text-gray-200'>
                        {order?.productId?.name}
                    </h6>
                </div>
                <div className='flex w-[20%] flex-col gap-1'>
                    <h6 className='block mb-2 ml-2 text-base text-gray-400'>Shipping Address</h6>
                    <div className='flex items-center gap-2'>
                    <h6 className='block mb-2 ml-2 font-semibold text-base
                     text-gray-200'>{order?.address?.country} ,</h6>
                    <h6 className='block mb-2 ml-2 font-semibold 
                    text-base text-gray-200'>{order?.address?.city}</h6>
                    </div>
                    <div className='flex items-center gap-2'>
                    <h6 className='block mb-2 ml-2 font-semibold
                     text-base text-gray-200'>{order?.address?.line1 ? order?.address?.line1 : 
                     order?.address?.addressLineOne}</h6>
                    <h6 className='block mb-2 ml-2 font-semibold
                     text-base text-gray-200'>{order?.address?.line2 ? order?.address?.line1 : 
                     order?.address?.addressLineTwo}</h6>
                    </div>
                   <div className='flex items-center gap-2'>
                   <h6 className='block mb-2 ml-2 font-semibold
                     text-base text-gray-200'>{order?.address?.state !== null ? order?.address?.state
                     :""}</h6>
                   <h6 className='block mb-2 ml-2 font-semibold
                     text-base text-gray-200'>{order?.address?.zipCode ? order?.address?.zipCode
                     : order?.address?.postal_code}</h6>
                   </div>
                </div>
                <div className='flex w-[20%] flex-col gap-1'>
                    <h6 className='block mb-2 ml-2 text-base text-gray-400'>Ordered Date</h6>
                    <h6 className='block mb-2 ml-2 font-semibold text-base text-gray-200'>
                       {moment(order?.createdAt).format("MMMM Do YYYY")}</h6>
                </div>
                <div className='flex w-[20%] flex-col gap-1'>
                    <h6 className='block mb-2 ml-2 text-base text-gray-400'>Order Status</h6>
                    <h6 className='block mb-2 ml-2 font-semibold text-base text-gray-200'>
                       {order?.orderStatus}</h6>
                </div>
            </div>
          </div>
    </div>
  )
}

export default OrderDetailsTable