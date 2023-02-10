import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { useGetSingleOrderQuery } from '../../../store/services/orderServices';
import Wrapper from '../Wrapper';
import OrderDetailsTable from './OrderDetailsTable';
import Spinner from '../../../components/admin/Spinner';

import AdminStepper from './AdminStepper';
const OrderDetails = () => {
  const {id} = useParams()
  const {data,isFetching} = useGetSingleOrderQuery(id)
  const [order, setOrder] = useState([])
  console.log(data);
  useEffect(()=>{
    if(isFetching === false){
      setOrder(data)
    }
  },[data, isFetching])
  return (
    <Wrapper>
       <div className=' flex flex-col gap-8'>
       <div className=" my-2">
          <Link
            to={"/admin/order-list"}
            className="bg-white
            items-center flex w-[16%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
             rounded-lg border border-black font-semibold text-black">
            <BiArrowBack size={24} />
            <p className="font-medium  text-lg text-gray-900">Orders List</p>
          </Link>
        </div>
     {
      isFetching ?   <div className="w-full  h-[50vh] flex items-center justify-center">
      <Spinner />
    </div>
      :
      <>
      <OrderDetailsTable order={order}/>
      <AdminStepper order={order}/>
      </>
    }
    </div>
    </Wrapper>
  )
}

export default OrderDetails