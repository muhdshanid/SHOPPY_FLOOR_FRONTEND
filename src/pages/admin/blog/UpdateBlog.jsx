import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import UpdateBlogForm from '../../../components/admin/blog/UpdateBlogForm';
import Wrapper from "../Wrapper";
const UpdateBlog = () => {
    const {id} = useParams()
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
          <UpdateBlogForm id={id}/>
      </div> 
    </div>
  </Wrapper>
  )
}

export default UpdateBlog