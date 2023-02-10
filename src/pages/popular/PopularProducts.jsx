import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import ProductCard from '../../components/home/ProductCard'
import { useGetCatProductsQuery, useGetPopularProductsQuery } from '../../store/services/productServices'

const PopularProducts = () => {
    const [popularProducts, setPopularProducts] = useState([])
  const {data,isFetching} = useGetPopularProductsQuery()
  const name = "Popular-Products"
  useEffect(() => {
    if (isFetching === false) {
      setPopularProducts(data);
    }
  }, [data, isFetching]);
  return (
    <div>
        <BreadCrumbs title={name}/>
      { isFetching === false && <div className='w-12/12  flex flex-col px-4
     lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100'>
        <ProductCard products={popularProducts} page={"category"} caption={`${name}  (${popularProducts.length} Products)`}/>
        </div>}
    </div>
  )
}

export default PopularProducts