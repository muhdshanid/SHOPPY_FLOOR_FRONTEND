import React from 'react'
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import UserRoutes from './UserRoutes'
import Home from '../pages/home/Home'
import ProductDetails from '../pages/product/ProductDetails'
import Checkout from '../pages/order/Checkout'
import WishList from '../pages/wishlist/WishList'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import CheckoutSingleProduct from '../pages/order/CheckoutSingleProduct'
import OrderList from '../pages/order/OrderList'
import CreateProduct from '../pages/admin/product/CreateProduct'
import BrandList from '../pages/admin/brand/BrandList'
import CreateBrand from '../pages/admin/brand/CreateBrand'
import UpdateBrand from '../pages/admin/brand/UpdateBrand'
import CategoryList from '../pages/admin/category/CategoryList'
import CreateCategory from '../pages/admin/category/CreateCategory'
import UpdateCategory from '../pages/admin/category/UpdateCategory'
import CouponList from '../pages/admin/coupon/CouponList'
import CreateCoupon from '../pages/admin/coupon/CreateCoupon'
import UpdateCoupon from '../pages/admin/coupon/UpdateCoupon'
import BlogList from '../pages/admin/blog/BlogList'
import CreateBlog from '../pages/admin/blog/CreateBlog'
import UpdateBlog from '../pages/admin/blog/UpdateBlog'
import OrderDetails from '../pages/admin/order/OrderDetails'
import OrdersList from '../pages/admin/order/OrdersList'
import UpdateProduct from '../pages/admin/product/UpdateProduct'
import Search from '../pages/search/Search'
import BlogsPage from '../pages/blogs/BlogsPage'
import BlogDetails from '../pages/blog/BlogDetails'
import OurStore from '../pages/ourStore/OurStore'
import PopularProducts from '../pages/popular/PopularProducts'
import BrandProducts from '../pages/brand/BrandProducts'
import CategoryProducts from '../pages/category/CategoryProducts'
import Cart from '../pages/cart/Cart'
import ProductsList from '../pages/admin/product/ProductsList'
import { useSelector } from 'react-redux'
import BlogFilter from '../pages/blog/BlogFilter'
const Routing = () => {
  const {user} = useSelector(state => state.authReducer)
  return (
    <BrowserRouter>
    <Routes> 
        <Route path='/' element={<UserRoutes/>}>
        <Route index element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/> 
       { user !== null &&
       <>
        <Route path='/checkout' element={<Checkout/>}/> 
        <Route path='/checkout/:id' element={<CheckoutSingleProduct/>}/>
       </>
}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='/orders' element={<OrderList/>}/>
        <Route path='/our-store' element={<OurStore/>}/>
        <Route path='/cat-products/:name' element={<CategoryProducts/>}/>
        <Route path='/search/:search' element={<Search/>}/>
        <Route path='/blog-details/:id' element={<BlogDetails/>}/>
        <Route path='/brand-products/:name' element={<BrandProducts/>}/>
        <Route path='/popular-products' element={<PopularProducts/>}/>
        <Route path='/blogs' element={<BlogsPage/>}/>
        <Route path='/blogs-filter' element={<BlogFilter/>}/>
        </Route>
        {user?.role === "admin" &&
        <>
        <Route path='/admin/create-product' element={<CreateProduct/>}/>
        <Route path='/admin/product-list' element={<ProductsList/>}/>
        <Route path='/admin/update-product/:id' element={<UpdateProduct/>}/>
        <Route path='/admin/order-list' element={<OrdersList/>}/>
        <Route path='/admin/order-details/:id' element={<OrderDetails/>}/>
        <Route path='/admin/category-list' element={<CategoryList/>}/>
        <Route path='/admin/create-category' element={<CreateCategory/>}/>
        <Route path='/admin/update-category/:id' element={<UpdateCategory/>}/>
        <Route path='/admin/coupons-list' element={<CouponList/>}/>
        <Route path='/admin/create-coupon' element={<CreateCoupon/>}/>
        <Route path='/admin/update-coupon/:id' element={<UpdateCoupon/>}/>
        <Route path='/admin/brand-list' element={<BrandList/>}/>
        <Route path='/admin/create-brand' element={<CreateBrand/>}/>
        <Route path='/admin/update-brand/:id' element={<UpdateBrand/>}/>
        <Route path='/admin/blogs-list' element={<BlogList/>}/>
        <Route path='/admin/create-blog' element={<CreateBlog/>}/>
        <Route path='/admin/update-blog/:id' element={<UpdateBlog/>}/>
        </> }
        { user === null&&
        <>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </>
        } 
      </Routes>
    </BrowserRouter>
  )
}

export default Routing