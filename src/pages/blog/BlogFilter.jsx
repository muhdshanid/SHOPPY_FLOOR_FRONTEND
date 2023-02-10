import React from 'react'
import BlogSort from '../../components/blog/BlogSort'
import BreadCrumbs from '../../components/BreadCrumbs'

const BlogFilter = () => {
  return (
    <div>
      <BreadCrumbs title={"Blogs"}/>
    <div className='w-12/12 pt-8   px-4
    lg:px-16 md:px-14 sm:px-8 min-h-screen bg-gray-100'>
     <div className='flex gap-8'>
      <BlogSort  />
     </div>
    </div>
    </div>
  )
}

export default BlogFilter