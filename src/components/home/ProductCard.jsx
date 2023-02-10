import React from 'react'
import { Link } from 'react-router-dom'
import ProductSkeleton from '../loading/ProductSkeleton'
import ProductCardDetails from '../product/ProductCardDetails'
const ProductCard = ({caption,page,products,link,isFetching}) => {
  return (
    <div className='my-4 flex flex-col gap-4'>
    <div className='flex  items-center justify-between'>
        <div className='flex'>
            <h6 className='font-semibold cap text-2xl text-gray-900'>{caption}</h6>
        </div>
        {page !== "category" && <div>
            <Link to={`${link}`} className='button-green !w-[90px]'>See All</Link>
        </div>}
    </div>
    <div className='my-2 w-full
      grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  gap-4'>
    {
      isFetching ? 
      <>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      </>
       :
        products?.length > 0 ? products?.map((product,i) => {
            let descriptionForSmallScreen = product.description.slice(0,15).concat("...")
            let descriptionForLargeScreen = product.description.slice(0,30).concat("...")
             return(
           <ProductCardDetails key={i} product={product} descriptionForLargeScreen={descriptionForLargeScreen}
            descriptionForSmallScreen={descriptionForSmallScreen}/>
        )}) 
      
    : "NO PRODUCTS"
    }
 
    </div>
    </div>
  )
}

export default ProductCard