import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import ProductCard from '../../components/home/ProductCard'
import { useGetCatProductsQuery } from '../../store/services/productServices'

const CategoryProducts = () => {
  const {name} = useParams()
  const [catProducts, setCatProducts] = useState([])
  const {data,isFetching} = useGetCatProductsQuery(name)
  useEffect(() => {
    if (isFetching === false) {
      setCatProducts(data);
    }
  }, [data, isFetching]);
  return (
    <div>
        <BreadCrumbs title={name}/>
      { isFetching === false && <div className='w-12/12  flex flex-col px-4
     lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100'>
        <ProductCard products={catProducts} page={"category"} caption={`${name}  (${catProducts.length} Products)`}/>
        </div>}
    </div>
  )
}

export default CategoryProducts