import React from 'react'
import Animate from './Animate'

const BlogDetailsSkeleton = () => {
  return (
    <div className='flex rounded-lg flex-col gap-4 overflow-hidden'>

    <div className="w-full h-[240px] bg-indigo-50     rounded-lg overflow-hidden">
      <Animate/>
  </div>
 <div  className='w-full h-[30px] rounded-lg  bg-indigo-50   overflow-hidden '>
<Animate/>
</div>
 <div  className='w-full h-[30px] rounded-lg  bg-indigo-50   overflow-hidden '>
<Animate/>
</div>
 <div  className='w-full h-[30px] rounded-lg  bg-indigo-50   overflow-hidden '>
<Animate/>
</div>
</div>)
}

export default BlogDetailsSkeleton