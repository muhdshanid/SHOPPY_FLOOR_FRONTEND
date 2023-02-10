import React, { useEffect, useState } from 'react'
import StarRating from '../product/StarRating'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart } from '../../store/reducers/cartReducer'
import { useDispatch, useSelector } from 'react-redux'
import { discount } from '../../utils/discount'
import { updateUser } from '../../store/reducers/authReducer'
import { useAddToWishlistMutation } from '../../store/services/userServices'
import WarningModal from '../modal/WarningModal'

const ProductCardDetails = ({product,descriptionForLargeScreen,descriptionForSmallScreen}) => {
  const {user} = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const finalPrice = discount(product?.price,product?.discount)
    const [addToWishlist,res] = useAddToWishlistMutation()
    const addToCartFn = () => {
        const {
            colors,sizes,
             createdAt,
             updatedAt,
             tags,
             specifications,
             questions,
             ratings,
             description,
            ...newProduct
          } = product;
          newProduct['size'] = sizes[0]
        newProduct['color'] = colors[0]
        newProduct['quantity'] = quantity
        const cart =  localStorage.getItem("cart")
        const cartItems = cart ? JSON.parse(cart) : []
        const checkItem = cartItems.find(item => item._id === newProduct._id)
        if(!checkItem){
          dispatch(addToCart(newProduct))
          cartItems.push(newProduct)
          localStorage.setItem("cart",JSON.stringify(cartItems))
          console.log("add to localstorage");
        }else{
          setModalOpen(true)
          return 
        }
      }
      const wishlistFn = (id) => {
        if(user === null){
          navigate("/login")
        }
        addToWishlist({proId:id,userId:user._id})
      }
      useEffect(()=>{
        if(res.isSuccess){
          const dataFromLocalStorage = localStorage.getItem("user");
      let  user = JSON.parse(dataFromLocalStorage);
      user = res?.data;
      localStorage.setItem("user",JSON.stringify(user))
      dispatch(updateUser(res?.data)); 
        }
      },[dispatch, res?.data, res.isSuccess])
  return (
    <div className='fc my-4  gap-2 relative'>
    <Link to={`/product/${product?._id}`} className=' w-full 
     bg-white rl '>
        <img src={product?.images[0]?.url} className="bg-white
        animation
         duration-500 
         object-contain h-[15rem]  md:h-[20rem] w-full rl" alt="product" />
    </Link>
        <div onClick={()=>wishlistFn(product?._id)} 
         className={`absolute
        animation  ${res?.isLoading ? "animate-bounce" : ""}
         duration-300 
          hover:bg-g-2 cp p-2  top-2 right-2 rf bg-gray-100`}>
            { user?.wishList?.includes(product._id) ?
            <AiFillHeart size={20} color="red"/>
            :
              <AiOutlineHeart   size={20}/>
          }
        </div>
    <div className='fc gap-4'>
       <div className='fc'>
       <div className='lg:flex  lg:flex-row lg:items-center lg:justify-between flex flex-col'>
            <h6 className='font-bold cap text-lg text-gray-900'>{product?.name}</h6>
            <h6 className='font-bold text-lg text-gray-900'>₹{finalPrice}</h6>
        </div>
        <div>
            <p className=' font-semibold hidden lg:flex text-sm text-gray-400'>{descriptionForLargeScreen}</p>
            <p className=' font-semibold lg:hidden text-sm text-gray-400'>{descriptionForSmallScreen}</p>
        </div>
        <div className='flex-ic gap-2'>
            <div className='flex'>
                <StarRating rating={product?.totalRatings}/>
            </div>
            <div>
                <p className=' font-semibold text-lg
                 text-gray-400'>{`(${product?.reviews.length})`}</p>
            </div>
        </div>
       </div>
        <div className='lg:flex lg:flex-row lg:items-center gap-4 lg:justify-between flex flex-col'>
        <Link to={user === null ? '/login' : `/checkout/${product?._id}`} className='button-green lg:!w-[50%] !w-full'>Buy Now</Link>
        <button onClick={addToCartFn} className='button-gray lg:!w-[50%] !w-full'>Add To Cart</button>
        </div>
    </div>
    {
      modalOpen && <WarningModal setState={setModalOpen} state={modalOpen}/>
    }
</div> 
  )
}

export default ProductCardDetails