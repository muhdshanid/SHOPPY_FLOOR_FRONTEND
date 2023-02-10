import React, { useEffect, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { useGetBrandsQuery } from '../../store/services/brandServices'
import { useGetCategoriesQuery } from '../../store/services/categoryServices'
const Filter = ({setBrand,setCategory,brand,category}) => {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
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
  return (
    <div className='w-full  p-6 flex flex-col gap-4 bg-white rounded-lg '>
        <div className='flex gap-4 flex-col'>
            <div className=''>
            <h6 className="font-semibold text-2xl capitalize text-gray-900">Filter by</h6>
            </div>
            <div className='w-full  flex flex-col gap-2 '>
        <label htmlFor="description" className="font-semibold text-lg  text-gray-900 capitalize
         ">
            category
            </label>
       <div className='relative w-full'>
       {isFetching === false && categories?.length > 0 && <select id="cats"  name='category'
        onChange={(e)=>setCategory(e.target.value)} value={category}
        className=" appearance-none bg-gray-100 cursor-pointer
        border border-gray-400 w-full hover:border-gray-500 px-4 py-2 
        pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline">
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
        <div className='w-full flex flex-col gap-2'>
        <label htmlFor="description" className="font-semibold text-lg  text-gray-900 capitalize">
            brand
            </label>
        <div className='relative w-full'>
        {gettingData === false && brands?.length > 0 && <select id="brands"  name='brand'
        onChange={(e)=>setBrand(e.target.value)} value={brand}
        className=" appearance-none bg-gray-100 cursor-pointer
        border border-gray-400 w-full hover:border-gray-500 px-4 py-2 
        pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline">
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
  )
}

export default Filter