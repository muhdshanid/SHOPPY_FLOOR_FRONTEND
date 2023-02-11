import React, { useEffect, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { useGetBrandsQuery } from '../../store/services/brandServices'
import { useGetCategoriesQuery } from '../../store/services/categoryServices'
import { useGetFilteredProductsQuery } from '../../store/services/productServices'
import {TfiFaceSad} from 'react-icons/tfi'
import ProductSkeleton from '../loading/ProductSkeleton'
import ProductCardDetails from '../product/ProductCardDetails'
const Sort = ({brand,category,setBrand,setCategory,setPrice,price,setRating,rating}) => {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const {data:resp,isFetching:loading} = useGetCategoriesQuery()
  const {data:result,isFetching:gettingData} = useGetBrandsQuery()
  useEffect(()=>{
    if(gettingData === false){
      setBrands(result)
    }
  },[gettingData, result]) 
  useEffect(()=>{
    if(loading === false){
      setCategories(resp)
    }
  },[resp, loading])
  const {data,isFetching,refetch} = useGetFilteredProductsQuery({brand,category,rating,price})
  useEffect(()=>{
    if(isFetching === false){
      setFilteredProducts(data)
    }
  },[data, isFetching])
  useEffect(()=>{
    refetch()
  },[brand, refetch])
  useEffect(()=>{
    refetch()
  },[category, refetch])
  return (
    <div className='flex lg:w-9/12 w-full flex-col items-center justify-start '>
      <div className='bg-white fc   lg:flex-row lg:flex gap-4  rounded-lg w-full py-4 px-2 md:px-8'>
       <div className='flex justify-between  gap-4 '>
       <div className='relative w-6/12  flex items-center '>
       <select
       onChange={(e)=>setPrice(e.target.value)} value={price}
        className="appearance-none bg-gray-100 cursor-pointer
        border border-gray-400 w-full hover:border-gray-500 px-4 py-2 
        pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"
         >
          <option selected  value={-1}>
            <h6 className='text-base text-gray-900 font-semibold'>Price</h6>
          </option>
          <option  className='text-base text-gray-900 font-semibold' value={1}>Low to High</option>
          <option className='text-base text-gray-900 font-semibold' value={-1}>High to Low</option>
        </select>
        <div className='pointer-events-none w-full justify-end pr-2 flex items-center  cursor-pointer absolute '>
          <AiFillCaretDown size={20}/>
        </div>
       </div>
       <div className='relative  flex items-center  w-6/12'>
       <select
       onChange={(e)=>setRating(e.target.value)} value={rating}
        className="appearance-none bg-gray-100 cursor-pointer
        border border-gray-400 w-full hover:border-gray-500 px-4 py-2 
        pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"
         >
          <option selected  value={0}>
            <h6 className='text-base text-gray-900 font-semibold'>Rating</h6>
          </option>
          <option className='text-base text-gray-900 capitalize font-semibold' value={1}>1 star</option>
          <option className='text-base text-gray-900 capitalize font-semibold' value={2}>2 star</option>
          <option className='text-base text-gray-900 capitalize font-semibold' value={3}>3 star</option>
          <option className='text-base text-gray-900 capitalize font-semibold' value={4}>4 star</option>
          <option className='text-base text-gray-900 capitalize font-semibold' value={5}>5 star</option>
        </select>
        <div className='pointer-events-none w-full justify-end pr-2 flex items-center  cursor-pointer absolute '>
          <AiFillCaretDown size={20}/>
        </div>
       </div>
       </div>
       <div className='flex gap-4 lg:hidden'>
       <div className=' lg:hidden flex  gap-2 '>
       <div className='relative w-12/12'>
       {loading === false && categories?.length > 0 && <select id="cats"  name='category'
        onChange={(e)=>setCategory(e.target.value)} value={category}
        className=" appearance-none bg-gray-100 cursor-pointer
        border border-gray-400 w-full hover:border-gray-500  py-2 px-4
         rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline">
  <option selected>Choose a Category</option>
  { categories?.map(cat => (
    <option className='bg-white capitalize text-black' value={cat?.name}>{cat?.name}</option>
  ))
  }
</select>}
<div className='pointer-events-none pr-2 flex items-center bottom-2 right-0  cursor-pointer absolute '>
          <AiFillCaretDown size={20}/>
        </div>
       </div>
        </div>
        <div className=' lg:hidden flex  gap-2'>
        <div className='relative w-12/12'>
        {gettingData === false && brands?.length > 0 && <select id="brands"  name='brand'
        onChange={(e)=>setBrand(e.target.value)} value={brand}
        className=" appearance-none bg-gray-100 cursor-pointer
        border border-gray-400 w-full hover:border-gray-500  py-2 px-4
         rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline">
  <option selected>Choose a Brand</option>
  { brands?.map(brand => (
    <option className='bg-white capitalize text-black' value={brand?.name}>{brand?.name}</option>
  ))
  }
</select>}
<div className='pointer-events-none pr-2 flex items-center bottom-2 right-0  cursor-pointer absolute '>
          <AiFillCaretDown size={20}/>
        </div>
        </div>
          </div>
       </div>
      </div>
        <div className='
         w-full sm:w-full mt-2  gap-4 grid grid-cols-2 sm:grid-cols-2
         md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  '>
        {
          isFetching ? 
          <>
          <ProductSkeleton/>
          <ProductSkeleton/>
          <ProductSkeleton/>
          <ProductSkeleton/>
          </>
          :
          filteredProducts?.length > 0 ? filteredProducts?.map(product => (
            <ProductCardDetails  product={product}/>
          )) :
          <>
          <div className='h-[50vh] bg-gray-100 w-full flex gap-6 items-center justify-center'>
            <TfiFaceSad className='flex items-center justify-center' size={40}/>
          </div>
          <div className='h-[50vh] bg-gray-100 w-full flex gap-6 items-center justify-center'>
            <h6 className='font-semibold  text-gray-900 text-xl'> NO PRODUCTS FOUND</h6>
          </div>
          </>
        }
        </div>
    </div>
  )
}

export default Sort