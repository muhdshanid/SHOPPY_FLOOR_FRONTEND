import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useCreateBlogMutation } from "../../../store/services/blogServices";
import { useGetCategoriesQuery } from "../../../store/services/categoryServices";
import { useUploadBlogImageMutation } from "../../../store/services/uploadServices";
const CreateBlogForm = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadImage, res] = useUploadBlogImageMutation();
  const [createblg, result] = useCreateBlogMutation();
  const { data, isFetching } = useGetCategoriesQuery();
  useEffect(() => {
    if (isFetching === false) {
      setCategories(data);
    }
  }, [isFetching, data]);
  const uploadCategoryImage = (acceptedFiles) => {
    const formData = new FormData();
    for (let i = 0; i < 1; i++) {
      formData.append("images", acceptedFiles[i]);
    }
    uploadImage(formData);
    setImageUploading(true);
  };
  useEffect(() => {
    if (res.isSuccess) {
      setImageData(res?.data[0]);
      setImageUploading(false);
    }
  }, [res.isSuccess, res?.data]);
  useEffect(() => {
    if (result.isSuccess) {
      navigate("/admin/blogs-list");
    }
  }, [result.isSuccess, navigate]);
  const createBlog = () => {
    if (
      name !== "" &&
      imageData !== "" &&
      selectedCategory !== "" &&
      description !== ""
    ) {
      createblg({
        name,
        image: imageData.url,
        category: selectedCategory,
        description,
      });
    }
  };
  return (
    <div className="flex flex-col  gap-8">
      <div className="flex gap-8 items-center">
        <div className="w-[30%]">
          <label className="block mb-2 ml-2 text-base capitalize text-gray-400">
            Title
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 text-white hover:border-gray-200 border
    border-gray-800
    outline-none w-full  p-4 rounded-lg"
            placeholder="Title"
          />
        </div>
        <div className="w-[30%] ">
          <label className="block  mb-2 ml-2 text-base capitalize text-gray-400">
            Content
          </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-800 text-white hover:border-gray-200 border
    border-gray-800
    outline-none w-full  p-4 rounded-lg"
            placeholder="Content"
          />
        </div>
        <div className="w-[30%] ">
          <label
            htmlFor="description"
            className="block mb-2 ml-2 text-base capitalize text-gray-400"
          >
            category
          </label>
          {isFetching === false && categories.length > 0 && (
            <select
              id="cats"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 text-white hover:border-gray-200 border
        border-gray-800
        outline-none  w-full p-4 rounded-lg"
            >
              <option selected>Choose a Category</option>
              {categories.map((cat) => (
                <option value={cat.name}>{cat.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-8 items-center">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="image1"
            className="block mb-2 ml-2 text-base capitalize text-gray-400"
          >
            select image
          </label>
          <Dropzone
            onDrop={(acceptedFiles) => uploadCategoryImage(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="rounded-lg p-4 bg-orange-300"
                >
                  <input {...getInputProps()} />
                  <p className="block mb-2 ml-2 font-semibold text-base text-gray-900">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {imageData && (
          <div className="flex justify-start items-center  px-8 w-6/12">
            <img className="rounded-lg" src={imageData.url} alt="product" />
          </div>
        )}
      </div>
      <div className="my-4 ">
        <button
          onClick={createBlog}
          disabled={
            name === "" ||
            imageData === "" ||
            selectedCategory === "" ||
            description === "" ||
            imageUploading === true
          }
          className="bg-sidebar-item
            items-center flex gap-2 px-4 py-2 hover:bg-gray-200 hover:text-black
           rounded-full border border-black font-semibold text-black"
        >
          {imageUploading ? <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Uploading...
                      </> : 
                      result?.isLoading ? 
                      <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Creating Blog
                      </>
                      :
                      "Create Blog"}
        </button>
      </div>
    </div>
  );
};

export default CreateBlogForm;
