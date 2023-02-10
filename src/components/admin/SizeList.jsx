import React from 'react'

const SizeList = ({sizes,deleteSize}) => {
  return (
    <div>
         <label htmlFor="sizes" className="block mb-2 ml-2 text-base capitalize text-gray-400 ">
            sizes list
          </label>
         
              
                <div className="flex flex-wrap ">
                  {sizes.map((size) => (
                    <div
                     onClick={() => deleteSize(size.name)}
                      key={size.name}
                      className="border
                       border-gray-400
                        ml-2 text-sm px-3 py-1.5 mt-1 uppercase cursor-pointer rounded text-gray-400 "
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              
    </div>
  )
}

export default SizeList