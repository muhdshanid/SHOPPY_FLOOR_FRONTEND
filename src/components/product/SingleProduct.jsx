import React, { useState } from 'react'
import SingleProductDetails from './SingleProductDetails'
import ProductSkeleton from '../loading/ProductSkeleton'
const WishListProducts = ({products,isFetching}) => {
  
  return (
    <div className='my-4'>
          <div className='my-2 w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4'>

    {
      !isFetching ? 
      <>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      </>
       : products.length > 0 ? products.map(product => {
            let description = product.description.slice(0,30).concat("...")
             return(
           <SingleProductDetails product={product} description={description}/>
        )}) 
      
    : ""
    }
 
    </div>
    </div>
  )
}

export default WishListProducts