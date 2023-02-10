import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateCouponForm from '../../../components/admin/coupon/CreateCouponForm';
import Wrapper from "../Wrapper";
const CreateCoupon = () => {
  return (
    <Wrapper>
    <div className=" flex flex-col gap-8">
      <div className=" my-2">
        <Link
          to={"/admin/coupons-list"}
          className="bg-white
          items-center flex w-[18%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
           rounded-lg border border-black font-semibold text-black">
          <BiArrowBack size={24} />
          <p className="font-medium  text-lg text-gray-900">Coupons List</p>
        </Link>
      </div>
      <div className="mx-4 w-full">
          <CreateCouponForm/>
      </div> 
    </div>
  </Wrapper>
  )
}

export default CreateCoupon