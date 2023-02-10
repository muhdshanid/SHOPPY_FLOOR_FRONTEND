import React from "react";
const WarningModal = ({state,setState,name}) => {
  return (
    <>
      {state ? (
        <>
          <div
            className="justify-center items-center mx-auto
            w-8/12 sm:w-6/12 md:w-6/12 lg:w-3/12 
             flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 
              rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start
                 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg  cap font-semibold">
                    {
                      name ? 
                     ` Only ordered user can  ${name}`
                      : "Item Already in Cart"
                    }
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0
                     text-black opacity-5 float-right text-3xl 
                     leading-none font-semibold outline-none focus:outline-none"
                    onClick={() =>setState(false)}
                  >
                    <span className="bg-transparent text-black
                     opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t 
                border-solid border-slate-200 rounded-b">
                 {name && <button
                    className="text-red-500 background-transparent
                     font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setState(false)}
                  >
                    Close
                  </button>}
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600
                     font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>{
                        setState(false)}}
                  >
                    Ok
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

export default WarningModal