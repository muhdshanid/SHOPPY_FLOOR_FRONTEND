import React, { useEffect, useState } from 'react'
import { useUploadImagesMutation } from '../../../store/services/uploadServices'
import Dropzone from "react-dropzone";
import { useNavigate } from 'react-router-dom';
import { useGetBlogQuery, useUpdateBlogMutation } from '../../../store/services/blogServices';
import { useGetCategoriesQuery } from '../../../store/services/categoryServices';
import Spinner from '../Spinner';
import { CgSpinner } from 'react-icons/cg';
const UpdateBlogForm = ({id}) => {
  const navigate = useNavigate()
  const [imageData, setImageData] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [imageUploading, setImageUploading] = useState(false)
  const [categories, setCategories] = useState([])
  const {data,isFetching} = useGetBlogQuery(id)
  const {data:cats,isFetching:gettingData} = useGetCategoriesQuery()
  const [uploadImage,res] = useUploadImagesMutation()
  const [updateBlg,result] = useUpdateBlogMutation()
  const uploadBlogImage = (acceptedFiles) => {
    const formData = new FormData()
    for(let i = 0; i < 1; i++){
      formData.append("images",acceptedFiles[i])
    }
    uploadImage(formData)
    setImageUploading(true)
    }
    useEffect(()=>{
        if(isFetching === false){
            setName(data.name)
            setImageData(data.image)
            setDescription(data.description)
            setSelectedCategory(data.category)
        }
    },[data?.category, data?.description, data?.image, data?.name, isFetching])
  useEffect(()=>{
    if(res.isSuccess){
      setImageData(res?.data[0]?.url)
      setImageUploading(false)
    }
  },[res?.data, res.isSuccess])
  useEffect(()=>{
    if(result.isSuccess){
      navigate("/admin/blogs-list")
    }
  },[navigate, result.isSuccess])
  useEffect(()=>{
    if(gettingData === false){
      setCategories(cats)
    }
  },[cats, gettingData])
  console.log(data);
  const updateBlog = () =>{
    if(name !== "" && imageData !== "" && description !== "" && selectedCategory !== ""){
        const data = {name,image:imageData,description,category:selectedCategory}
      updateBlg({data,id})
    }
  }
  return (
  isFetching === false   ? 
    <div className='flex flex-col  gap-8'>
  <div className='flex gap-8 items-center'>
      <div className='w-[30%]'>
      <label className="block mb-2 ml-2 text-base capitalize text-gray-400">
            Title
          </label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}
  className='bg-gray-800 text-white hover:border-gray-200 border
  border-gray-800
  outline-none w-full  p-4 rounded-lg' placeholder='Title' />
      </div> 
      <div className='w-[30%]'>
      <label className="block  mb-2 ml-2 text-base capitalize text-gray-400">
            Content
          </label>
        <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)}
    className='bg-gray-800 text-white hover:border-gray-200 border
    border-gray-800
    outline-none w-full  p-4 rounded-lg' placeholder='Content' />
        </div> 
        <div className='w-[30%] '>
        <label className="block mb-2 ml-2 text-base capitalize text-gray-400">
            category
            </label>
        {gettingData === false && categories.length > 0 && <select id="cats"  name='category'
        value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}
        className="bg-gray-800 text-white hover:border-gray-200 border
        border-gray-800
        outline-none  w-full p-4 rounded-lg">
  <option selected>Choose a Category</option>
  { categories.map(cat => (
    <option value={cat.name}>{cat.name}</option>
  ))
  }
</select>}
        </div>    
  </div>
  <div className='flex justify-between gap-8 items-center'>
  <div className='flex flex-col gap-2'>
      <label htmlFor="image1" className="block mb-2 ml-2 text-base capitalize text-gray-400">
         select image 
        </label>
        <Dropzone onDrop={(acceptedFiles) =>uploadBlogImage(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className='rounded-lg p-4 bg-orange-300'>
                  <input {...getInputProps()} />
                  <p className='block mb-2 ml-2 font-semibold text-base text-gray-900'>
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
      </div>
{
  <div className='flex justify-start items-center  px-8 w-6/12'>
  <img className='rounded-lg' src={imageData} alt="product" />
  </div>
}
  </div>
  <div className='my-4 '>
 <button
          disabled={
            name === "" ||
            imageData === "" ||
            selectedCategory === "" ||
            description === "" ||
            imageUploading === true
          } onClick={updateBlog}
        className="bg-sidebar-item
        items-center flex gap-2 px-4 py-2 hover:bg-gray-200 hover:text-black
       rounded-full border border-black font-semibold text-black">
       {imageUploading ? <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Uploading...
                      </> : 
                      result?.isLoading ? 
                      <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Updating Blog
                      </>
                      :
                      "Update Blog"}
      </button>
  </div>
</div> :  <div className='w-full  h-[50vh] flex items-center justify-center'>
    <Spinner />
</div>
  )
}

export default UpdateBlogForm