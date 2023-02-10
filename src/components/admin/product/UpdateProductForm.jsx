import React, { useEffect, useState } from 'react'
import { TwitterPicker } from "react-color";
import Dropzone from 'react-dropzone';
import { CgSpinner } from 'react-icons/cg';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { useGetBrandsQuery } from '../../../store/services/brandServices';
import { useGetCategoriesQuery } from '../../../store/services/categoryServices';
import {  useGetProductQuery, useUpdateProductMutation } from '../../../store/services/productServices';
import {useUploadProductImagesMutation } from '../../../store/services/uploadServices';
import Colors from '../Colors';
import SizeList from '../SizeList';
import Spinner from '../Spinner';
const UpdateProductForm = ({id}) => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [uploadImages,res] = useUploadProductImagesMutation()
  const {data:product,isFetching:Loading} = useGetProductQuery(id)
  const [productImages, setProductImages] = useState([])
  const [updateProd,response] = useUpdateProductMutation()
  const [imageUploading, setImageUploading] = useState(false);
  const [state, setState] = useState({})
  useEffect(()=>{
    if(Loading === false){
      setState(product)
      setProductImages(product.images)
      setSizeList(product.sizes)
    }
  },[Loading, product])
  useEffect(()=>{
    if(res.isSuccess){
      setProductImages(res.data)
      setImageUploading(false)
    }
  },[res.data, res.isSuccess])
  useEffect(()=>{
    if(response.isSuccess){
      navigate("/admin/product-list")
    }
  },[navigate, response.isSuccess])
  const {data,isFetching} = useGetCategoriesQuery()
  const {data:result,isFetching:gettingData} = useGetBrandsQuery()
  useEffect(()=>{
    if(gettingData === false){
      setBrands(result)
    }
  },[gettingData, result])
  useEffect(()=>{
    if(isFetching === false){
      setCategories(data)
    }
  },[data, isFetching])
  const [sizeList, setSizeList] = useState([]);
    const [sizes] = useState([
        { name: "xsm" },
        { name: "sm" },
        { name: "md" },
        { name: "lg" },
        { name: "xl" },
        { name: "1 year" },
        { name: "2 years" },
        { name: "3 years" },
        { name: "4 years" },
        { name: "5 years" },
      ]);
      const handleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
      };
      const saveColors = (color) => {
        const filtered = state.colors.filter((clr) => clr.color !== color.hex);
        setState({
          ...state,
          colors: [...filtered, { color: color.hex, id: uuidv4() }],
        });
      };
      const deleteColor = (color) => {
        const filtered = state.colors.filter((clr) => clr.color !== color.color);
        setState({ ...state, colors: filtered });
      };
      const chooseSize = (sizeObj) => {
        const filtered = sizeList.filter((size) => size.name !== sizeObj.name);
        setSizeList([...filtered, sizeObj]);
      };
      const deleteSize = (name) => {
        const filtered = sizeList.filter((size) => size.name !== name);
        setSizeList(filtered);
      };
      const uploadProductImages = (acceptedFiles) => {
        const formData = new FormData()
    for(let i = 0; i < acceptedFiles.length; i++){
      formData.append("images",acceptedFiles[i])
    }
    uploadImages(formData)
    setImageUploading(true)
      }
      const updateProduct = () => {
        const data = {...state,images:productImages,sizes:sizeList}
        updateProd({data,id})
      }
  return (
  Loading === false  ?  <div className='flex flex-col  gap-8'>
   <div className='flex gap-8 items-center'>
       <div className='w-[30%]'>
       <label htmlFor="description" className="block mb-2 ml-2 text-base capitalize text-gray-400">
       name
       </label>
       <input type="text" name='name' value={state.name} onChange={handleInput}
   className='bg-gray-800 text-white hover:border-gray-200 border
   border-gray-800
   outline-none w-full  p-4 rounded-lg' placeholder='Name' />
       </div>
       <div className='w-[30%]'>
       <label htmlFor="description" className="block mb-2 ml-2 text-base capitalize text-gray-400">
       price
       </label>
       <input type="number"  name='price' value={state.price} onChange={handleInput}
   className='bg-gray-800 text-white hover:border-gray-200 border
   border-gray-800
   outline-none w-full  p-4 rounded-lg' placeholder='Price' />
       </div>
       <div className='w-[30%]'>
       <label htmlFor="description" className="block mb-2 ml-2 text-base capitalize text-gray-400">
       discount
       </label>
       <input type="number"  name='discount' value={state.discount} onChange={handleInput}
   className='bg-gray-800 text-white hover:border-gray-200 border
   border-gray-800
   outline-none  w-full p-4 rounded-lg' placeholder='Discount' />
       </div>
   </div>
   <div className='flex gap-8 items-center'>
       <div className='w-[30%]'>
       <label htmlFor="description" className="block mb-2 ml-2 text-base capitalize text-gray-400">
       stock
       </label>
       <input type="number"  name='stock' value={state.stock} onChange={handleInput}
   className='bg-gray-800 text-white hover:border-gray-200 border
   border-gray-800
   outline-none  w-full p-4 rounded-lg' placeholder='Stock' />
       </div>
   <div className='w-[30%] '>
   <label htmlFor="description" className="block mb-2 ml-2 text-base capitalize text-gray-400">
       category
       </label>
   {isFetching === false && categories.length > 0 && <select id="cats"  name='category'
   value={state.category} onChange={handleInput}
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
   <div className='w-[30%] '>
   <label htmlFor="description" className="block mb-2 ml-2 text-base capitalize text-gray-400">
       brand
       </label>
   {gettingData === false && brands.length > 0 && <select id="brands"  name='brand'
   value={state.brand} onChange={handleInput}
   className="bg-gray-800 text-white hover:border-gray-200 border
   border-gray-800
   outline-none  w-full p-4 rounded-lg">
<option selected>Choose a Brand</option>
{ brands.map(brand => (
<option value={brand.name}>{brand.name}</option>
))
}
</select>}
   </div>
   </div>
   <div className='flex gap-8 items-center'>
       <div className='flex flex-col gap-2 w-[50%]'>
       <label htmlFor="description" className="block mb-2 ml-2 text-base capitalize text-gray-400">
       Description
       </label>
       <textarea type="text"  name='description' value={state.description} onChange={handleInput}
   className='bg-gray-800 text-white hover:border-gray-200 border
   border-gray-800
   outline-none  w-full p-4 rounded-lg' placeholder='Description' />
       </div>
       <div className=' flex flex-col gap-2 w-[30%]'>
       <label htmlFor="description" className="block -mt-4 text-base capitalize text-gray-400">
       tags
       </label>
       <input type="text"  name='tags' value={state.tags} onChange={handleInput}
   className='bg-gray-800 text-white hover:border-gray-200 border
   border-gray-800
   outline-none  w-full p-4 rounded-lg' placeholder='Tags' />
       </div>
   </div>
   <div className='flex gap-8 items-center'>
   <div className='w-[40%]'>
   <label htmlFor="colors" className="block mb-2 ml-2 text-base capitalize text-gray-400">
           choose colors
         </label>
         <TwitterPicker onChangeComplete={saveColors}/>
   </div>
   <div className="w-[60%]">
         <label htmlFor="sizes" className="block mb-2 ml-2 text-base capitalize text-gray-400 ">
           choose sizes
         </label>
         {sizes.length > 0 && (
           <div className="flex flex-wrap ">
             {sizes.map((size) => (
               <div
               onClick={() => chooseSize(size)}
                 key={size.name}
                 className="border
                  border-gray-400 ml-2 text-sm px-3 py-1.5 mt-1 uppercase cursor-pointer rounded text-gray-400 "
               >
                 {size.name}
               </div>
             ))}
           </div>
         )}
   </div>
   </div>
   <div className='flex w-full gap-8 items-center'>
     <div className='flex flex-col gap-2 w-[39%]'>
   <Colors deleteColor={deleteColor} colors={state.colors}/>
   </div>
    <div className="w-[50%]">
       <SizeList sizes={sizeList} deleteSize={deleteSize}/>
   </div> 
   </div>
   <div className='flex flex-col w-[50%] justify-center'>
   <label htmlFor="sizes" className="block mb-2 ml-2 text-base capitalize text-gray-400 ">
           select images
         </label>   
   <Dropzone onDrop={(acceptedFiles) =>uploadProductImages(acceptedFiles)}>
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
   {productImages?.length > 0 &&  <div className='flex  gap-8 items-center'>
   {
     productImages?.length > 0 && productImages?.map(image => (
       <div className='flex  rounded-lg  overflow-hidden items-center flex-wrap   w-2/12'>
    <img className='rounded-lg  w-full bg-gray-800 object-contain h-[10rem] ' src={image?.url} alt="product" />
    </div>
     ))
   }
   </div> }
   <div className=" my-4">
     <button onClick={updateProduct}
     disabled={
      state.name === "" ||
            state.tags === "" ||
            state.category === "" ||
            state.description === "" ||
            state.discount === 0 ||
            state.stock === 0 ||
            productImages === [] ||
      imageUploading === true
    } 
       className="bg-sidebar-item
       items-center flex gap-2 px-4 py-2 hover:bg-gray-200 hover:text-black
      rounded-full border border-black font-semibold text-black">
         {imageUploading ? <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Uploading...
                      </> : 
                      response?.isLoading ? 
                      <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Updating Product
                      </>
                      :
                      "Update Product"}
     </button>
   </div>
</div> : <div className='w-full  h-[50vh] flex items-center justify-center'>
    <Spinner />
</div>
  )
}

export default UpdateProductForm

 