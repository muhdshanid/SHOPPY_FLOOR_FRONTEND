import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../store/services/blogServices";
import BlogSkeleton from "../loading/BlogSkeleton";
import moment from "moment";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [slicedBlogs, setSlicedBlogs] = useState([])
  const { data,isFetching} = useGetBlogsQuery();
  useEffect(() => {
    if (isFetching === false) {
      setBlogs(data);
      setSlicedBlogs(data.slice(0,4))
    }
  }, [data, isFetching]); 
  return (
    <div className="my-4 fc gap-4">
      <div className="flex-ic-jb">
        <div className="flex">
          <h6 className="font-semibold text-2xl text-gray-900 cap">
            our latest blogs
          </h6>
        </div>
        <div>
          <Link
            to={"/blogs"}
            className="
            animation
             duration-500 
            button-green !w-full"
          >
            See All
          </Link>
        </div>
      </div>
      <div className="my-2 w-full  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {isFetching ? (
          <>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </>
        ) : slicedBlogs?.length > 0 ? (
          slicedBlogs?.map((blog) => {
            let content = blog?.description?.slice(0, 100).concat("...");
            let title = blog?.name?.slice(0,15).concat("...")
            return (
              <div key={blog._id} className="fc my-4 gap-2 relative">
                <div className="w-full  bg-white rounded-lg ">
                  <img
                    src={blog?.image}
                    className="bg-gray-200
             transition ease-in-out delay-150
             hover:-translate-y-1 hover:scale-110
             duration-500
             object-cover h-[10rem] w-full rounded-lg"
                    alt="product"
                  />
                </div>
                <div className="fc gap-2">
                  <div className="fc gap-4">
                    <div className="fc gap-2  justify-between">
                      <h6 className="font-bold cap text-lg text-gray-900">
                        {title}
                      </h6>
                      <div className="flex-ic-jb">
                        <p className=" uppercase font-semibold  break-words text-sm text-gray-400">
                          {moment(blog?.createdAt).format("DD MMMM YYYY")}
                        </p>
                        <div></div>
                      </div>
                    </div>
                    <div className="flex ">
                      <p className=" font-semibold  break-words text-sm text-gray-400">
                        {content}
                      </p>
                    </div>
                    <Link
                      to={`/blog-details/${blog?._id}`}
                      className="button-green !w-full"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          "NO BLOGS"
        )}
      </div>
    </div>
  );
};

export default Blogs;
