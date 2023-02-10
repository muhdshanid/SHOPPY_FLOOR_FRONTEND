import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import ProductCard from '../../components/home/ProductCard'
import { useGetBrandProductsQuery } from '../../store/services/productServices'

const BrandProducts = () => {
  const {name} = useParams()
  const [brandProducts, setBrandProducts] = useState([])
  const {data,isFetching} = useGetBrandProductsQuery(name)
  useEffect(() => {
    if (isFetching === false) {
      setBrandProducts(data);
    }
  }, [data, isFetching]);
  return (
    <div>
        <BreadCrumbs title={name}/>
      { isFetching === false && <div className='w-12/12  flex flex-col px-4
     lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100'>
        <ProductCard products={brandProducts} page={"category"} caption={`${name}  (${brandProducts.length} Products)`}/>
        </div>}
    </div>
  )
}

export default BrandProducts