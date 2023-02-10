import React, { useEffect } from 'react'
import { useState } from 'react'
import { TfiFaceSad } from 'react-icons/tfi'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import ProductCard from '../../components/home/ProductCard'
import ProductSkeleton from '../../components/loading/ProductSkeleton'
import { useGetSearchProductsQuery } from '../../store/services/productServices'

const Search = () => {
    const {search} = useParams()
    const [products, setProducts] = useState([])
    const {data,isFetching} = useGetSearchProductsQuery({keyword:search})
    useEffect(() => {
        if (isFetching === false) {
          setProducts(data);
        }
      }, [data, isFetching]);
  return (
    <div>
        <BreadCrumbs title={search}/>
   {isFetching ?
    <div className='w-12/12 pt-8   px-4
    lg:px-16 md:px-14  sm:px-8 min-h-screen bg-gray-100'>
      <div className='my-2 w-full
        grid grid-cols-2 sm:grid-cols-2
         md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  gap-4'>
    <ProductSkeleton/>
    <ProductSkeleton/>
    <ProductSkeleton/>
    <ProductSkeleton/>
      </div>
    </div>
    :
    products?.length > 0 ? 
    <div className='w-12/12 pt-8   px-4
    lg:px-16 md:px-14 sm:px-8 min-h-screen bg-gray-100'>
    <ProductCard products={products} page={"category"} caption={`${search}  (${products.length} Products)`}/>
    </div>
    :
    <div className='h-[50vh] bg-gray-100 w-full flex gap-6 items-center justify-center'>
            <TfiFaceSad className='flex items-center justify-center' size={40}/>
            <h6 className='font-semibold  text-gray-900 text-xl'> NO PRODUCTS FOUND</h6>
          </div>
    }
    </div>
  )
}

export default Search