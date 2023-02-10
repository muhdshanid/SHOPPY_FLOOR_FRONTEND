import React, { useState } from 'react'
import BreadCrumbs from '../../components/BreadCrumbs'
import Filter from '../../components/ourstore/Filter'
import Sort from '../../components/ourstore/Sort'

const OurStore = () => {
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState(-1)
  const [rating, setRating] = useState(0)
  return (
    <div>
      <BreadCrumbs title={"Our Store"}/>
    <div className='w-12/12 pt-8   px-4
    lg:px-16 md:px-14 sm:px-8 min-h-screen bg-gray-100'>
     <div className='flex gap-8'>
      <div className='hidden  lg:w-3/12 lg:block'>
      <Filter setBrand={setBrand} brand={brand} category={category} setCategory={setCategory}/>
      </div>
      <Sort setPrice={setPrice}
       brand={brand} setBrand={setBrand} setCategory={setCategory}
      rating={rating} setRating={setRating} price={price}  category={category}/>
     </div>
    </div>
    </div>
  )
}

export default OurStore