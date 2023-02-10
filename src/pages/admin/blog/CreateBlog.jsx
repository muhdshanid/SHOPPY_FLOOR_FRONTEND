import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateBlogForm from '../../../components/admin/blog/CreateBlogForm';
import Wrapper from "../Wrapper";
const CreateBlog = () => {
  return (
    <Wrapper>
    <div className=" flex flex-col gap-8">
      <div className=" my-2">
        <Link
          to={"/admin/blogs-list"}
          className="bg-white
          items-center flex w-[15%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
           rounded-lg border border-black font-semibold text-black">
          <BiArrowBack size={24} />
          <p className="font-semibold  text-lg text-gray-900">Blog List</p>
        </Link>
      </div>
      <div className="mx-4 w-full">
          <CreateBlogForm/>
      </div> 
    </div>
  </Wrapper>
  )
}

export default CreateBlog