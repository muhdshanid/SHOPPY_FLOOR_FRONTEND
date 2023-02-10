import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../../store/services/blogServices";
import Spinner from "../../../components/admin/Spinner";
import Modal from "../../../components/modal/Modal";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const { data, isFetching } = useGetBlogsQuery();
  const [deleteBlg, res] = useDeleteBlogMutation();
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteBlogId, setdeleteBlogId] = useState("")
  useEffect(() => {
    if (isFetching === false) {
      setBlogs(data);
    }
  }, [data, isFetching]);
  const deleteBlog = (id) => {
    deleteBlg(id);
  };
  const deleteClick = id => {
    setDeleteModal(true)
    setdeleteBlogId(id)
  }
  return (
    <Wrapper>
      <div className=" flex  flex-col gap-8">
        <div className="my-2">
          <Link
            to={"/admin/create-blog"}
            className="bg-white
          items-center flex w-[16%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
           rounded-lg border border-black font-semibold text-black"
          >
            <p className="font-semibold  text-lg text-gray-900">Create Blog</p>
            <IoMdAdd size={24} />
          </Link>
        </div>
        {isFetching === false ? (
          <table className="rounded-lg overflow-hidden w-[100%] mb-4 mr-4">
            <thead className="w-full rounded-full bg-gray-800">
              <tr>
                <th className="py-4 px-10  uppercase text-xs font-bold text-white text-left">
                  title
                </th>
                <th className="py-4 px-10  uppercase text-xs font-bold text-white text-left">
                  category
                </th>
                <th className="py-4 px-10  uppercase text-xs font-bold text-white text-left">
                  image
                </th>
                <th className="py-4 px-10  uppercase text-xs font-bold text-white text-left">
                  edit
                </th>
                <th className="py-4 px-10  uppercase text-xs font-bold text-white text-left">
                  delete
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 &&
                blogs.map((blog) => (
                  <tr className="bg-gray-900  even:bg-gray-800">
                    <td className="py-4 text-sm text-gray-700">
                      <div className="flex items-center justify-center">
                        <h6 className="font-semibold text-lg text-white">
                          {blog.name}
                        </h6>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-700">
                      <div className="flex -ml-12 items-center justify-center">
                        <h6 className="font-semibold text-lg text-white">
                          {blog.category}
                        </h6>
                      </div>
                    </td>
                    <td className="py-4   text-sm text-gray-700">
                      <div className="flex  -ml-12 items-center justify-center">
                        <img
                          className="w-16  h-16 object-cover rounded-lg"
                          src={blog.image}
                          alt="item"
                        />
                      </div>
                    </td>
                    <td>
                      <Link
                        to={`/admin/update-blog/${blog._id}`}
                        className="flex -ml-10 items-center justify-center"
                      >
                        <BiEdit size={20} color="white" />
                      </Link>
                    </td>
                    <td>
                      <div className="flex -ml-12 items-center justify-center">
                        <AiFillDelete
                          className=" cursor-pointer"
                          onClick={() => deleteClick(blog._id)}
                          size={20}
                          color="red"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : <div className='w-full  h-[50vh] flex items-center justify-center'>
            <Spinner/>
            </div>}
      </div>
      {deleteModal && <Modal name={"Blog"} setState={setDeleteModal} id={deleteBlogId} actionFunction={deleteBlog} state={deleteModal} />}

    </Wrapper>
  );
};

export default BlogList;
