import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateBrandForm from '../../../components/admin/brand/CreateBrandForm';
import Wrapper from "../Wrapper";
const CreateBrand = () => {
  return (
    <Wrapper>
    <div className=" flex flex-col gap-8">
      <div className=" my-2">
        <Link
          to={"/admin/brand-list"}
          className="bg-white
          items-center flex w-[17%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
           rounded-lg border border-black font-semibold text-black">
          <BiArrowBack size={24} />
          <p className="font-medium  text-lg text-gray-900">Brand List</p>
        </Link>
      </div>
      <div className="mx-4 w-full">
          <CreateBrandForm/>
      </div> 
    
    </div>
  </Wrapper>
  )
}

export default CreateBrand