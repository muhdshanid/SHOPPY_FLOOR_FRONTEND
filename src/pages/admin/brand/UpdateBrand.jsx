import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import UpdateBrandForm from '../../../components/admin/brand/UpdateBrandForm';
import Wrapper from "../Wrapper";
const UpdateBrand = () => {
    const {id} = useParams()
  return (
    <Wrapper>
    <div className=" flex flex-col gap-8">
      <div className=" my-2">
        <Link
          to={"/admin/brand-list"}
          className="bg-sidebar-item items-center w-[21%] flex gap-2 px-4 py-2 hover:bg-gray-200 hover:text-black
           rounded-lg border border-black font-semibold text-black">
          <BiArrowBack size={24} />
          <p className="font-medium  text-lg text-gray-900">Brand List</p>
        </Link>
      </div>
      <div className="mx-4 w-full">
          <UpdateBrandForm id={id}/>
      </div> 
    </div>
  </Wrapper>
  )
}

export default UpdateBrand