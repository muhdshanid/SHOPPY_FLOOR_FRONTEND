import React, { useEffect, useState } from 'react'
import { TfiFaceSad } from 'react-icons/tfi'
import { useDispatch } from 'react-redux'
import BreadCrumbs from '../../components/BreadCrumbs'
import ProductSkeleton from '../../components/loading/ProductSkeleton'
import SingleProductDetails from '../../components/product/SingleProductDetails'
import { updateUser } from '../../store/reducers/authReducer'
import { useGetUserWishlistQuery } from '../../store/services/userServices'

const WishList = () => {
  const dispatch = useDispatch()
    const [wishlistProducts, setWishlistProducts] = useState([])
    const {data,isFetching,isSuccess} = useGetUserWishlistQuery()
    useEffect(()=>{
      if(isFetching === false && isSuccess){
        const dataFromLocalStorage = localStorage.getItem("user");
      let  user = JSON.parse(dataFromLocalStorage);
      user = data.user;
      localStorage.setItem("user",JSON.stringify(user))
      dispatch(updateUser(data.user));
      setWishlistProducts(data.wishlistProducts)
      }
    },[data, dispatch, isFetching, isSuccess])
  return (
    <div className=''>
         <BreadCrumbs title={"My Wishlist"} />
        <div
        className="w-12/12  flex  px-4
     lg:px-16 md:px-14 sm:px-8   bg-gray-100">
        
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
       : wishlistProducts?.length > 0 ? wishlistProducts?.map(product => {
        let descriptionForSmallScreen = product.description.slice(0,15).concat("...")
        let descriptionForLargeScreen = product.description.slice(0,30).concat("...")
             return(
           <SingleProductDetails key={product._id}
            product={product} descriptionForLargeScreen={descriptionForLargeScreen}
            descriptionForSmallScreen={descriptionForSmallScreen}/>
        )}) 
    : <div className='h-[50vh] bg-gray-100 w-full flex gap-6 items-center justify-center'>
    <TfiFaceSad className='flex items-center justify-center' size={40}/>
    <h6 className='font-semibold  text-gray-900 text-xl'> WISHLIST IS EMPTY</h6>
  </div>
    }
 
    </div>
     </div>
    </div>
  )
}

export default WishList