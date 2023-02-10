import React from 'react'
import { AiOutlineProfile } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { TbMessage } from 'react-icons/tb'
import { ImBlog } from 'react-icons/im'
import { SiBrandfolder } from 'react-icons/si'
import { BsFillBagCheckFill } from 'react-icons/bs'
import {Link} from 'react-router-dom'
import { RiCouponLine } from 'react-icons/ri'
const Sidebar = () => {
    const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDhYBltma0_qRGcKkgfpZZfne4dtTSTmfwA&usqp=CAU"

  return (
    <div className='fixed top-0 left-0  sm:left-0 w-64 h-screen bg-sidebar z-10 transition-all'>
        <div className='flex flex-col'>
            <div>
            <div className='flex p-4 bg-white cursor-pointer gap-4 lg:gap-2 items-center '>
        <img src={logo} className="sm:w-8  md:flex sm:flex lg:flex 
        xl:flex w-10 h-10 sm:h-8  object-cover rounded-full" alt="logo" />
        <h2 className='text-2xl hidden sm:flex md:flex font-bold text-green-900 capitalize'>shoppy floor</h2>
    </div>
            </div>
            <div className='flex flex-col p-2 gap-2'>
                <Link to={"/admin/product-list"} className='flex rounded-lg  p-4  bg-sidebar-item gap-4 items-center'>
                    <AiOutlineProfile size={27} color="black"/>
                    <h6 className='font-medium text-lg text-gray-900'>Products</h6>
                </Link>
                <Link to={"/admin/order-list"} className='flex rounded-lg  p-4  bg-sidebar-item gap-4 items-center'>
                    <BsFillBagCheckFill size={27} color="black"/>
                    <h6 className='font-medium text-lg text-gray-900'>Orders</h6>
                </Link>
                <Link to={"/admin/brand-list"} className='flex rounded-lg  p-4  bg-sidebar-item gap-4 items-center'>
                    <SiBrandfolder size={27} color="black"/>
                    <h6 className='font-medium text-lg text-gray-900'>Brands</h6>
                </Link>
                <Link to={"/admin/category-list"} className='flex rounded-lg  p-4  bg-sidebar-item gap-4 items-center'>
                    <BiCategory size={27} color="black"/>
                    <h6 className='font-medium text-lg text-gray-900'>Categories</h6>
                </Link>
                <Link to={"/admin/coupons-list"} className='flex rounded-lg  p-4  bg-sidebar-item gap-4 items-center'>
                    <RiCouponLine size={27} color="black"/>
                    <h6 className='font-medium text-lg text-gray-900'>Coupons</h6>
                </Link>
                <Link to={"/admin/blogs-list"} className='flex rounded-lg  p-4  bg-sidebar-item gap-4 items-center'>
                    <ImBlog size={27} color="black"/>
                    <h6 className='font-medium text-lg text-gray-900'>Blogs</h6>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar