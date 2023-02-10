import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../store/services/blogServices";
import BlogSkeleton from "../../components/loading/BlogSkeleton";
import moment from "moment";
import BreadCrumbs from "../../components/BreadCrumbs";
const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const { data,isFetching} = useGetBlogsQuery();
  useEffect(() => {
    if (isFetching === false) {
      setBlogs(data);
    }
  }, [data, isFetching]);
  return (
    <div >
        <BreadCrumbs title={"Blogs"}/>
   <div className="w-12/12  flex flex-col px-4
    lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100">
   <div className="my-4 fc gap-4">
      <div className="flex-ic-jb">
        <div className="flex">
          <h6 className="font-semibold text-2xl text-gray-900 cap">
            Blogs ({blogs?.length} Blogs)
          </h6>
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
        ) : blogs?.length > 0 ? (
          blogs?.map((blog) => {
            let content = blog?.description?.slice(0, 100).concat("...");
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
                        {blog?.name}
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
   </div>
    </div>
  );
};

export default BlogsPage;
