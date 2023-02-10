import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../store/services/categoryServices';
import CategoryPopupSkeleton from '../loading/CategoryPopupSkeleton';

const CategoryListShow = () => {
    const [categories, setCategories] = useState([]);
    const { data, isFetching } = useGetCategoriesQuery();
    useEffect(() => {
      if (isFetching === false) {
        setCategories(data);
      }
    }, [data, isFetching]);

  return (
    <div className='flex  transition-all delay-200  flex-col gap-4 p-4 bg-white rounded-lg'>
        <div className='flex flex-col gap-4'>
        <div className='flex'>
            <h6 className='font-semibold text-xl text-gray-900'> Popular Categories</h6>
        </div>
            <div className='grid grid-cols-2 gap-4'>
                {
                    isFetching ? 
                    <>
                    <CategoryPopupSkeleton/>
                    <CategoryPopupSkeleton/>
                    <CategoryPopupSkeleton/>
                    <CategoryPopupSkeleton/>
                    </>
                    :
                    categories?.length > 0 ? categories.slice(0,4).map(cat => (
                        <div className='bg-gray-200 rounded-lg p-4 flex gap-4'>
                            <div className=''>
                                <img className='w-14 rounded-lg h-14 overflow-hidden' src={cat.image.url} alt="category" />
                            </div>
                            <div className='flex  items-start flex-col '>
                            <h6 className='font-semibold text-lg text-gray-900 capitalize'>{cat.name}</h6>
                            <p className='font-semibold underline text-sm text-gray-400'>
                        <Link to={`/cat-products/${cat.name}`}>explore products</Link> </p>
                            </div>
                        </div>
                    )) : ""
                }
            </div>
        </div>
    </div>
  )
}

export default CategoryListShow