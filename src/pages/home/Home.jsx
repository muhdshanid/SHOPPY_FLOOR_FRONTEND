import React, { useEffect, useState } from 'react'
import Blogs from '../../components/home/Blogs'
import BrandList from '../../components/home/BrandList'
import CategoriesSwiper from '../../components/home/CategoriesSwiper'
import HomeSlider from '../../components/home/HomeSlider'
import OurServices from '../../components/home/OurServices'
import ProductCard from '../../components/home/ProductCard'
import { useGetCatProductsQuery, useGetHeadphoneProductsQuery, useGetPopularProductsQuery } from '../../store/services/productServices'

const Home = () => {
  const [catProducts, setCatProducts] = useState([])
  const [popularProducts, setpopularProducts] = useState([])
  const [headphones, setHeadphones] = useState([])
  const [slicedProducts, setSlicedProducts] = useState([])
  const {data,isFetching} = useGetCatProductsQuery("mobiles")
  const {data:resp,isFetching:loading} = useGetHeadphoneProductsQuery()
  const {data:result,isFetching:gettingData} = useGetPopularProductsQuery()
  useEffect(() => {
    if (isFetching === false) {
      setCatProducts(data);
      setSlicedProducts(data.slice(0,4))
    }
  }, [data, isFetching]);
  useEffect(() => {
    if (gettingData === false) {
      setpopularProducts(result);
    }
  }, [result, gettingData]);
  useEffect(() => {
    if (loading === false) {
      setHeadphones(resp);
    }
  }, [resp, loading]);
  return (
    <div className='w-12/12  fc px-4
     lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100'>
      <HomeSlider/>
      <CategoriesSwiper/>
      <ProductCard isFetching={gettingData} products={popularProducts} link={`/popular-products`} caption={"Popular Deals"}/>
      <BrandList/>
      <ProductCard isFetching={isFetching} products={slicedProducts} link={`/cat-products/mobiles`} caption={"Mobiles For You"}/>
      <ProductCard isFetching={loading} products={headphones} link={`/cat-products/headphones`} caption={"Headphones For You"}/>
      <OurServices/>
      <Blogs/>
    </div>
  )
}

export default Home