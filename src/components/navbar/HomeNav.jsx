import React from 'react'
import {MdAddShoppingCart} from 'react-icons/md'
import {FiUser} from 'react-icons/fi'
import {IoSearchOutline} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CategoryListShow from '../category/CategoryListShow'
import { useSelector } from 'react-redux' 
import ProfileList from '../profile/ProfileList'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BsShopWindow } from 'react-icons/bs'
const HomeNav = () => {
    const  [search, setSearch] = useState("")
    const {items} = useSelector(state=>state.cartReducer)
    const {user} = useSelector(state=>state.authReducer)
    const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDhYBltma0_qRGcKkgfpZZfne4dtTSTmfwA&usqp=CAU"
    const [catListShow, setCatListShow] = useState(false)
    const [profileListShow, setProfileListShow] = useState(false)
  return (
    <div className='w-full mt-6  border-b shadow-xl fixed z-50
      fc px-4 lg:px-16 md:px-14 sm:px-8  bg-gray-100'>
    <div className=' w-full  flex-ic-jb md:gap-12 relative  gap-6 py-4 '>
    <Link to={"/"} className='flex-ic  cp gap-4 lg:gap-2  '>
        <img src={logo} className="sm:w-8   sm:flex lg:flex 
        xl:flex w-10 h-10 sm:h-8 md:flex object-cover rf" alt="logo" />
        <h2 className='text-2xl hidden sm:flex md:flex font-bold tg9 cap'>shoppy floor</h2>
    </Link>
    <div className='gap-4 lg:flex hidden ic'>
        <div className=' gap-2 flex-ic'>
        <p className='cap fs-tm-tg7 cp '>Categories</p>
        {!catListShow ? <AiFillCaretDown onClick={()=>setCatListShow(prev => !prev)} size={20} className=" mt-1
         cp"/> :
        <AiFillCaretUp onClick={()=>setCatListShow(prev => !prev)} size={20} className="mt-1
         cp"/>}
       {catListShow && <div className='absolute z-50 top-16 left-[16rem]'>
            <CategoryListShow/> 
        </div>} 
        </div> 
        <Link to={"/our-store"} className='cap fs-tm-tg7 cp'>
            Our
         store</Link>
       
        <Link to={"/blogs-filter"} className=' cap fs-tm-tg7 cp '>Blogs</Link>
    </div>
    <div className=' gap-2 flex-ic bg-g-2  rf  px-4'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text"  className='bg-g-2 
         px-2 rf sm:w-[10rem] md:w-[8rem] w-[5rem] outline-none py-2  border-none'
        placeholder='Search Product...'/>
       <div className='bg-g-9  p-2 rf -mr-4 overflow-hidden'>
       <Link to={search !== "" && `/search/${search}`}  className=''>
            <IoSearchOutline color='white' size={20}/>
        </Link>
       </div>
    </div> 
    <div className='flex gap-4 sm:gap-8 items-center relative'>
        <Link to={"/our-store"} className='sm:hidden'>
            <BsShopWindow size={20}/>
        </Link>
        {
            user !== null ? <div className='flex gap-2 cp'> 
                <>
                <FiUser onClick={()=>setProfileListShow(prev => !prev)} className='' size={24}/>
                <p className=' md:flex fs-tm-tg7 cap  hidden '>{user?.name}</p>
                </>
            {!profileListShow ? <AiFillCaretDown onClick={()=>setProfileListShow(prev => !prev)}
             size={20} className="mt-1 hidden sm:flex
         cp"/> :
        <AiFillCaretUp onClick={()=>setProfileListShow(prev => !prev)} size={20} className="mt-1 hidden sm:flex
         cp"/>}
       {profileListShow && <div className='absolute z-50 top-10 right-6 sm:right-16 '>
            <ProfileList/> 
        </div>}
        </div>
        : <Link to={"/login"} className=' fs-tm-tg7'>Login</Link>
        }
        <div className='flex gap-2  cp'>
       <Link to={"/cart"} className='relative'>
       <MdAddShoppingCart size={24} />
        <div className='absolute -top-4 -right-3 sm:-right-4
         rl w-6 h-5 flex-ic justify-center text-white bg-g-9'>
            <p className='text-white -mt-[3px] font-semibold text-sm'>{items}</p>
        </div>
       </Link>
            <Link to={"/cart"} className='md:flex  hidden fs-tm-tg7'>Cart</Link>
        </div>
    </div>
</div>
</div>
  )
}

export default HomeNav