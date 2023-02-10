import React from "react";
import { discount } from "../../utils/discount";

const OrderDetails = ({ product, cart, color, quantity,size }) => {
  
  return (
    <div className="w-12/12 px-2 py-4 sm:px-4 border flex flex-col gap-4">
      <div className="px-4">
        <h6 className="font-semibold capitalize text-2xl text-gray-900 ">
          Selected items
        </h6>
      </div>
      <div className="p-4 flex flex-col gap-4">
        {cart ? (
          cart?.map((item) => (
            <div className="flex gap-4 border-b pb-2 items-start ">
              <div className="bg-gray-200 rounded-lg p-2">
                <img
                  src={item?.images[0]?.url}
                  className="object-cover
                rounded-lg  sm:w-[8rem] w-[6rem]  h-[4rem] sm:h-[6rem]"
                  alt="product"
                />
              </div>
              <div className="md:flex md:flex-row md:gap-6 flex flex-col">
                <div className="flex grow flex-col">
              <div className=" ">
              <h6 className="font-semibold  capitalize text-xl text-gray-900">
                {item?.name}
              </h6>
              </div>
             <div className="flex  gap-2 items-center">
             <h6 className="font-semibold text-xl text-gray-900">
             ₹{discount(item?.price, item?.discount)}
              </h6>
             </div>
                </div>
            </div>
            <div className="flex items-center  gap-2">
           {item?.color?.color && <div className="flex items-end gap-1">
                <div
                  style={{
                    backgroundColor: item?.color?.color
                  }}
                  className=" rounded-full w-6 h-6"
                ></div>
              </div>}
            {item?.size?.name &&  <div className="flex items-center gap-1">
                <div
                  className={`border-2
                                
                                     "border-gray-900"
                                
                                 
                                  ml-2 text-md  font-semibold px-2 py-1 mt-1 uppercase cursor-pointer rounded
                                   text-gray-900`}
                >
                  {item?.size?.name}
                </div>
              </div>}
              <p className="font-normal text-md text-gray-600">
                Quantity:
                {quantity ? quantity : item?.quantity}
              </p>
            </div>
            </div>
          ))
        ) : (
         product ? 
         <div className="flex gap-4 last:items-start first:items-center">
         {product?.images?.length > 0 && (
           <div className="bg-gray-200 rounded-lg p-2">
             <img
               src={product?.images[0]?.url}
               className="object-cover
            rounded-lg sm:w-[8rem] w-[6rem]  h-[4rem] sm:h-[6rem]"
               alt="product"
             />
           </div>
         )}
        <div className="md:flex md:flex-row md:gap-6 flex flex-col">
        <div className="flex grow flex-col">
           <div className=" ">
           <h6 className="font-semibold  capitalize text-xl text-gray-900">
             {product?.name}
           </h6>
           </div>
          <div className="flex  gap-2 items-center">
          <h6 className="font-semibold text-xl text-gray-900">
          ₹{discount(product?.price, product?.discount)}
           </h6>
          </div>
         </div>
         <div className="flex items-center  gap-2">
         <div className="flex items-end gap-1">
             <div
               style={{
                 backgroundColor: color
                   ? `#${color}`
                   : product?.colors ?
                   product?.colors[0]?.color
                   : "",
               }}
               className=" rounded-full w-6 h-6"
             ></div>
           </div>
         <div className={`flex items-center gap-1
         ${size === "undefined" || product?.sizes?.length === 0 ? "hidden" : ""}`}>
             <div
               className={`border-2
                             
                                  "border-gray-900"
                             
                              
                               ml-2 text-md  font-semibold px-2 py-1 mt-1 uppercase cursor-pointer rounded
                                text-gray-900`}
             >
               {size ? size !== "undefined" ? size : "" : product?.sizes ? product?.sizes[0]?.name : ""}
             </div>
           </div>
           <p className="font-normal text-md text-gray-600">
             Quantity:
             {quantity ? quantity : 1}
           </p>
         </div>
        </div>
       </div> 
       : ""
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
