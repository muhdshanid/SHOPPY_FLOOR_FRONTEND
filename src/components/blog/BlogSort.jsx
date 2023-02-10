import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetFilteredBlogsQuery } from "../../store/services/blogServices";
import { useGetCategoriesQuery } from "../../store/services/categoryServices";
import BlogSkeleton from "../loading/BlogSkeleton";
const BlogSort = () => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const { data: result, isFetching: gettingData } = useGetCategoriesQuery();
  const { data, isFetching, refetch } = useGetFilteredBlogsQuery({ category });
  useEffect(() => {
    refetch();
  }, [category, refetch]);
  useEffect(() => {
    if (gettingData === false) {
      setCategories(result);
    }
  }, [result, gettingData]);
  useEffect(() => {
    if (isFetching === false) {
      setBlogs(data);
    }
  }, [data, isFetching]);
  return (
    <div className="flex w-full flex-col items-center justify-start ">
      <div className="bg-white flex   gap-4  rounded-lg w-full py-4 px-2 md:px-8">
        <div className="relative w-3/12">
          { gettingData === false && categories?.length > 0 && (
            <select
              id="cats"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className=" appearance-none bg-gray-100 cursor-pointer
        border border-gray-400 w-full hover:border-gray-500  py-2 px-4
         rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option selected>Choose a Category</option>
              {categories?.map((cat) => (
                <option
                  className="bg-white capitalize text-black"
                  value={cat?.name}
                >
                  {cat?.name}
                </option>
              ))}
            </select>
          )}
          <div className="pointer-events-none pr-2 flex items-center bottom-2 right-0  cursor-pointer absolute ">
            <AiFillCaretDown size={20} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 w-full  mt-2 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4  ">
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
  );
};

export default BlogSort;
