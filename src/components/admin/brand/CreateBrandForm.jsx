import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useCreateBrandMutation } from '../../../store/services/brandServices';
import { useUploadImagesMutation } from '../../../store/services/uploadServices';
const CreateBrandForm = () => {
  const navigate = useNavigate()
  const [imageData, setImageData] = useState("")
  const [name, setName] = useState("")
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadImage,res] = useUploadImagesMutation()
  const [createBrand,result] = useCreateBrandMutation()
  const uploadBrandImage = (acceptedFiles) => {
    const formData = new FormData()
    for(let i = 0; i < 1; i++){
      formData.append("images",acceptedFiles[i])
    }
    uploadImage(formData)
    setImageUploading(true)
    }
    useEffect(()=>{
      if(res.isSuccess){
        setImageData(res?.data[0])
        setImageUploading(false)
      }
    },[res?.data, res?.isSuccess])
    useEffect(()=>{
      if(result.isSuccess){
        navigate("/admin/brand-list")
      }
    },[navigate, result.isSuccess])
    const createBrandHandler = () =>{
      if(name !== "" && imageData !== ""){
        createBrand({name,image:imageData})
      }
    }
  return (
    <div className='flex flex-col  gap-8'>
    <div className='flex gap-8 items-center'>
        <div className='w-[30%]'>
        <label className="block mb-2 ml-2 text-base capitalize text-gray-400">
             Name
          </label>
        <input value={name } onChange={(e)=>setName(e.target.value)}
         type="text"
    className='bg-gray-800 text-white hover:border-gray-200 border
    border-gray-800
    outline-none w-full  p-4 rounded-lg' placeholder='Name' />
        </div>    
    </div>
    <div className='flex justify-between gap-8 items-center'>
    <div className='flex flex-col gap-2'>
        <label htmlFor="image1" className="block mb-2 ml-2 text-base capitalize text-gray-400">
           select image 
          </label>
          <Dropzone onDrop={(acceptedFiles) =>uploadBrandImage(acceptedFiles)}>
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
      imageData && <div className='flex items-center  px-8  w-6/12'>
      <img className='rounded-lg' src={imageData.url} alt="product" />
      </div>
    }
    </div>
    <div className="my-4">
        <button onClick={createBrandHandler}
         disabled={
          name === "" ||
          imageData === "" ||
          imageUploading === true
        }
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
                        Creating Brand
                      </>
                      :
                      "Create Brand"}
        </button>
      </div>
</div>
  )
}

export default CreateBrandForm