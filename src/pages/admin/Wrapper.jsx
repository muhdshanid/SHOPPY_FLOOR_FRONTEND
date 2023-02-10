import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import Sidebar from '../../components/admin/Sidebar'


const Wrapper = ({children}) => {
  return (
    <>
        <Sidebar/>
        <AdminNav/>
        <section className=' ml-64 bg-gray-700 min-h-screen pt-4 px-4'>
      <div className='bg-gray-900 mt-16  rounded-lg h-full  px-4 py-1'>
     {children}
      </div>
    </section>
    </>
  )
}

export default Wrapper