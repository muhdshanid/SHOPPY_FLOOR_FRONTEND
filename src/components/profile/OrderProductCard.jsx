import React from "react";
import Stepper from "../stepper/Stepper";
import { discount } from "../../utils/discount";
const OrderProductCard = ({ order }) => {
  const price = discount(order.productId.price, order.productId.discount);
  const totalPrice = price * order.quantities;
  return (
    <div className="p-4 bg-white h-[50vh] rl border fc gap-4">
      <div className="sm:p-4 fc gap-4">
        <div className="flex gap-4 last:items-start first:items-center">
          <div className="bg-g-2 rl p-2">
            <img
              src={order.productId.images[0].url}
              className="object-cover
           rl w-[8rem] h-[6rem]"
              alt="product"
            />
          </div>
          <div className="flex   h-full grow flex-col gap-2">
            <h6 className="font-semibold  cap text-xl text-gray-900">
              {order.productId.name}
            </h6>
            <div className="flex-ic gap-4">
            <h6 className="font-semibold text-xl text-gray-900">
            ₹{totalPrice}
            </h6>
            </div>
          </div>
          <div className="flex   h-full flex-col gap-6">
            <p className="font-normal text-md text-gray-600">
              Quantity:
              {order.quantities}
            </p>
            <div className="flex-ic justify-end gap-2 ">
            {order.color && (
                <div className="flex gap-4">
                  <div
                    style={{ backgroundColor: order.color }}
                    className=" rf w-6 h-6"
                  ></div>
                </div>
              )}
              {order.size && (
                <div className="flex-ic gap-1">
                  <div
                    className={`border-2
                                  "border-gray-900" 
                                text-md  font-semibold px-1  uppercase cp rounded
                                text-gray-900`}
                  >
                    {order.size}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
      <Stepper order={order}/>
      </div>
    </div>
  );
};

export default OrderProductCard;
