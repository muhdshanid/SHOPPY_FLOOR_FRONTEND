import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateCategoryForm from '../../../components/admin/category/CreateCategoryForm';
import Wrapper from "../Wrapper";
const CreateCategory = () => {
  return (
    <Wrapper>
    <div className=" flex flex-col gap-8">
      <div className="m my-2">
        <Link
          to={"/admin/category-list"}
          className="bg-white
          items-center flex w-[18%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
           rounded-lg border border-black font-semibold text-black">
          <BiArrowBack size={24} />
          <p className="font-medium  text-lg text-gray-900">Category List</p>
        </Link>
      </div>
      <div className="mx-4 w-full">
          <CreateCategoryForm/>
      </div> 
    </div>
  </Wrapper>
  )
}

export default CreateCategory