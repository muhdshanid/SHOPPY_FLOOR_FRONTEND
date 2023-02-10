import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbs = ({title}) => {
  return (
    <div className='w-12/12 py-4  flex flex-col px-4
    lg:px-16 md:px-14 sm:px-8  bg-gray-100'>
            <div className="w-12/12">
                <p className='text-base '>
                    <Link to={"/"} 
                    className=''>Home&nbsp;</Link> / <span className='font-semibold cap text-base'>{title}</span>
                </p>
            </div>
        </div>
  )
}

export default BreadCrumbs