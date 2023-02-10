import React, { useEffect, useState } from 'react'
import { TfiFaceSad } from 'react-icons/tfi'
import BreadCrumbs from '../../components/BreadCrumbs'
import OrderSkeleton from '../../components/loading/OrderSkeleton'
import OrderProductCard from '../../components/profile/OrderProductCard'
import { useGetUserOrdersQuery } from '../../store/services/orderServices'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const {data,isFetching} = useGetUserOrdersQuery()
  useEffect(()=>{
    setOrders(data)
  },[data, isFetching])
  return (
  <div >
     <BreadCrumbs title={"My Orders"}/>
     <div className='grid grid-cols-1 w-full  min-h-screen md:grid-cols-2  bg-gray-100   gap-8 py-4 px-8'>
   {
    isFetching ? 
    <>
    <OrderSkeleton/>
    <OrderSkeleton/>
    </>
    :
    orders?.length > 0 ? orders.map(order => (
      <OrderProductCard key={order._id} order={order}/>   ))
      :  <div className='h-[50vh] bg-gray-100 w-full flex gap-6 items-center justify-center'>
      <TfiFaceSad className='flex items-center justify-center' size={40}/>
      <h6 className='font-semibold  text-gray-900 text-xl'> NO ORDERS FOUND</h6>
    </div>
   }
</div>
  </div>
  )
}

export default OrderList