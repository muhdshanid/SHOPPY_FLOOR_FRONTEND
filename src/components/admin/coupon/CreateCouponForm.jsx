import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { useCreateCouponMutation } from '../../../store/services/couponServices';
import { CgSpinner } from 'react-icons/cg';
const CreateCouponForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [discount, setDiscount] = useState(0)
  const [createCoupn,result] = useCreateCouponMutation()

  useEffect(()=>{
    if(result.isSuccess){
      navigate("/admin/coupons-list")
    }
  },[navigate, result.isSuccess])
  const createCoupon = () =>{
    if(name !== "" && expiry !== "" && discount !== 0 ){
        createCoupn({name,expiry,discount})
    }
  }
  const onChangeDate = e => {
    const newDate = moment(new Date(e.target.value)).format("YYYY/MM/DD");
    setExpiry(newDate);
  };
  return (
    <div className='flex flex-col  gap-8'>
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
        <input type="date" onChange={onChangeDate}
    className='bg-gray-800 text-white hover:border-gray-200 border
    border-gray-800
    outline-none w-full   p-4 rounded-lg' placeholder='Expiry Date' />
        </div> 
    </div>  
    <div className='my-4 '>
    <button
          disabled={
            name === "" ||
            expiry === "" ||
            discount === 0 
          } 
     onClick={createCoupon}
          className="bg-sidebar-item
          items-center flex gap-2 px-4 py-2 hover:bg-gray-200 hover:text-black
         rounded-full border border-black font-semibold text-black">
        {
                      result?.isLoading ? 
                      <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Creating coupon
                      </>
                      :
                      "Create coupon"}
        </button>
    </div>
</div>
  )
}

export default CreateCouponForm