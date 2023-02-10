import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import BlogDetailsSkeleton from '../../components/loading/BlogDetailsSkeleton'
import { useGetBlogQuery, useLikeBlogMutation } from '../../store/services/blogServices'

const BlogDetails = () => {
    const {id} = useParams()
    const { user } = useSelector((state) => state.authReducer);
    const [blog, setBlog] = useState({})
    const navigate = useNavigate()
    const {data,isFetching,isSuccess,isLoading,} = useGetBlogQuery(id)
    const [likeBlogMutation, response] = useLikeBlogMutation();
    useEffect(() => {
        if (isFetching === false) {
          setBlog(data);
        }
      }, [data, isFetching]);
      const likeBlog = (id, button) => {
        if(user === null){
          navigate("/login")
        }
        likeBlogMutation({ id, button });
      };
  return (
     <div>
        <BreadCrumbs title={"Blog"} />
        <div className="w-12/12 py-4 flex flex-col px-4
     lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100">
        <div className='flex flex-col gap-8'>
        {isFetching === false ? 
        <>
            <div className=''>
            <h6 className="font-semibold text-2xl text-gray-900 capitalize">
            {blog?.name}
          </h6>
            </div>
            <div className='flex flex-col gap-2'>
                <img className='w-full rounded-lg h-[50vh]' src={blog?.image} alt="blog" />
                <div className='flex items-center justify-between'>
            <p className=" capitalize font-semibold  break-words text-sm text-gray-400">
                    {moment(blog?.createdAt).format("DD MMMM YYYY")}
                  </p>
                  <div className="flex gap-2 ">
                      <div
                        className="rounded-full items-center flex gap-2 
                        cp p-2 "
                      >
                        {blog?.likes?.includes(user?._id) ? (
                          <AiFillLike
                            onClick={() => likeBlog(blog._id, "like")}
                            size={20}
                            color="green"
                          />
                        ) : (
                          <AiOutlineLike
                            onClick={() => likeBlog(blog?._id, "like")}
                            size={20}
                            color="green"
                          />
                        )}
                        <p className="font-semibold text-md text-green-900">
                          {blog?.likes?.length}
                        </p>
                      </div>
                      <div
                        className="rounded-full items-center flex gap-2 cp
                         p-2 "
                      >
                        {blog?.dislikes?.includes(user?._id) ? (
                          <AiFillDislike
                            onClick={() => likeBlog(blog._id, "dislike")}
                            size={20}
                            color="green"
                          />
                        ) : (
                          <AiOutlineDislike
                            onClick={() => likeBlog(blog._id, "dislike")}
                            size={20}
                            color="green"
                          />
                        )}
                        <p className="font-semibold text-md text-green-900">
                          {blog?.dislikes?.length}
                        </p>
                      </div>
                    </div>
                </div>
            </div>          
            <div>
                <p className='font-semibold text-sm text-gray-900'>
                    {blog?.description}
                </p>
            </div>
        </>
            :
    <BlogDetailsSkeleton/>}
        </div>
        </div>
    </div>
    

  )
}

export default BlogDetails