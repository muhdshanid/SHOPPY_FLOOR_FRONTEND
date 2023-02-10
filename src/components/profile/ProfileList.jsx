import React from 'react'
import {BiPackage} from 'react-icons/bi'
import { AiFillHeart, AiOutlinePoweroff } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { logout } from '../../store/reducers/authReducer'
import { emptyCart } from '../../store/reducers/cartReducer'
const ProfileList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutUser = () => {
        dispatch(logout())
        dispatch(emptyCart())
        navigate("/login")
    }
  return (
    <div className='fc  transition-all   gap-4 p-4 bg-white rl'>
    <div className='fc gap-4'>
    <div onClick={logoutUser} className='bg-g-2  rl p-4'>
        <div className='flex gap-4 items-center '>
            <AiOutlinePoweroff size={30} color="green"/>
            <h6 className='fs-tl-tg9 cap'> Logout</h6>
        </div>
    </div>
    <div className='bg-g-2 rl p-4'>
        <Link to={"/orders"} className='flex gap-4 '>
            <BiPackage size={30} color="green"/>
            <h6 className='fs-tl-tg9 cap'>Orders</h6>
        </Link>
    </div>
    <div className='bg-g-2 rl p-4'>
        <Link to={"/wishlist"} className='flex gap-4 '>
            <AiFillHeart size={30} color="green"/>
            <h6 className='fs-tl-tg9 cap'>Wishlist</h6>
        </Link>
    </div>
    </div>
</div>
  )
}

export default ProfileList