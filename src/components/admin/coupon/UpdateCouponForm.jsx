import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useGetCouponQuery, useUpdateCouponMutation } from '../../../store/services/couponServices';
import Spinner from '../Spinner';
import { CgSpinner } from 'react-icons/cg';
const UpdateCouponForm = ({id}) => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [discount, setDiscount] = useState(0)
  const {data,isFetching} = useGetCouponQuery(id)
  const [updateCoupn,result] = useUpdateCouponMutation()
    useEffect(()=>{
        if(isFetching === false){
            setName(data.name)
            setExpiry(data.expiry)
            setDiscount(data.discount)
        }
    },[data?.discount, data?.expiry, data?.name, isFetching])
  useEffect(()=>{
    if(result.isSuccess){
      navigate("/admin/coupons-list")
    }
  },[navigate, result.isSuccess])
  const updateCoupon = () =>{
    if(name !== "" && expiry !== "" && discount !== ""){
        const data = {name,expiry,discount}
      updateCoupn({data,id})
    }
  }
  const onChangeDate = e => {
    const newDate = moment(new Date(e.target.value)).format("YYYY/MM/DD");
    setExpiry(newDate);
  };
  return (
  isFetching === false ?   <div className='flex flex-col  gap-8'>
  <div className='flex gap-8 items-center'>
        <div className='w-[30%]'>
        <label className="block mb-2 ml-2 text-base capitalize text-gray-400">
            Name
          </label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}
    className='bg-gray-800 text-white hover:border-gray-200 border
    border-gray-800
    outline-none w-full  p-4 rounded-lg' placeholder='Name' />
        </div>      
        <div className='w-[30%]'>
        <label className="block mb-2 ml-2 text-base capitalize text-gray-400">
            Discount
          </label>
        <input type="text" value={discount} onChange={(e)=>setDiscount(e.target.value)}
    className='bg-gray-800 text-white hover:border-gray-200 border
    border-gray-800
    outline-none w-full  p-4 rounded-lg' placeholder='Discount' />
        </div>    
    <div className='w-[30%]'>
    <label className="block mb-2 ml-2 text-base capitalize text-gray-400">
            Expiry Date
          </label>
        <input type="date"  onChange={onChangeDate}
    className='bg-gray-800 text-white hover:border-gray-200 border
    border-gray-800
    outline-none w-full   p-4 rounded-lg' placeholder='Expiry Date' />
        </div> 
    </div>
  <div className='my-4 '>
  <button onClick={updateCoupon}
   disabled={
    name === "" ||
    expiry === "" ||
    discount === 0 
  } 
        className="bg-sidebar-item
        items-center flex gap-2 px-4 py-2 hover:bg-gray-200 hover:text-black
       rounded-full border border-black font-semibold text-black">
        {
                      result?.isLoading ? 
                      <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Updating coupon
                      </>
                      :
                      "Update coupon"}
      </button>
  </div>
</div> :<div className='w-full  h-[50vh] flex items-center justify-center'>
    <Spinner />
</div>
  )
}

export default UpdateCouponForm