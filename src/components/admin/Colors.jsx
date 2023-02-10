import React from 'react'

const Colors = ({deleteColor,colors}) => {
 
 return (

  <div>
         
        <label htmlFor="sizes" className="block mb-2 ml-2 text-base capitalize text-gray-400 ">
                colors list
              </label> 
     
       <div className='flex ml-2 flex-wrap gap-4 items-center '>
        {
            colors?.map(clr => (            
                <div onClick={()=>deleteColor(clr)} key={clr.id} style={{backgroundColor:clr.color}}
                 className=' rounded-full cursor-pointer w-8 h-8'>
                </div>
            ))
        }
        </div>
    </div>


)
 
  
}

export default Colors