import React from 'react'
import SignupForm from '../../components/auth/SignupForm';

const Signup = () => {
    const logo =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDhYBltma0_qRGcKkgfpZZfne4dtTSTmfwA&usqp=CAU";

  return (
    <div
    className="w-12/12 min-h-screen flex  px-4
  lg:px-16 md:px-14 sm:px-8 bg-gray-100"
  >
    <div className="md:w-8/12 lg:w-6/12 w-12/12 sm:w-10/12   my-10 mx-auto bg-white rounded-lg">
      <div className="p-8 flex-col w-full items-center flex gap-12 justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex  cursor-pointer gap-4 lg:gap-2 items-center ">
            <img
              src={logo}
              className="sm:w-8  md:flex sm:flex lg:flex 
      xl:flex w-10 h-10 sm:h-8  object-cover rounded-full"
              alt="logo"
            />
            <h2 className="text-3xl  font-bold text-green-900 capitalize">
              shoppy floor
            </h2>
          </div>
          <div className="flex items-center justify-center">
          <h6 className='font-bold text-2xl text-gray-900'>Signup</h6>
          </div>
        </div>
        <SignupForm />
      </div>
    </div>
  </div>
  )
}

export default Signup