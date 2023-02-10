import React from 'react'
import Lottie from "lottie-react";
import animationData from '../../animation/succesAnimation.json'
import { useNavigate } from 'react-router-dom';
const SuccessModal = ({state,setState,name}) => {
    const navigate = useNavigate()
    return (
        <>
          {state ? (
            <>
              <div
                className="justify-center items-center mx-8 sm:mx-auto
                w-12/12 sm:w-12/12 md:w-8/12 lg:w-6/12
                 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-full my-6 sm:mx-auto max-w-full">
                  {/*content*/}
                  <div className="border-0 w-12/12 sm:w-6/12
                  rounded-lg shadow-lg relative h-full sm:mx-auto
                  flex flex-col  bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className='h-[30vh] sm:h-[50vh] w-12/12'>
                    <Lottie className='h-full' animationData={animationData} loop={true} />
                    </div>
                    <div className="flex items-start
                     justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-lg font-semibold">
                        Order Placed Successfully
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() =>setState(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*footer*/}
                    <div className="flex gap-2 items-center
                     justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="button-gray"
                        type="button"
                        onClick={() => {navigate("/")
                         setState(false)}}
                      >
                        Go to Home
                      </button>
                      <button
                        className="button-green !text-black"
                        type="button"
                        onClick={()=>{
                            navigate("/orders")
                            setState(false)
                           }}
                      >
                        Go to Orders
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>
      );
}

export default SuccessModal