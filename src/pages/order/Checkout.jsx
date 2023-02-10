import React, { useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs";
import DeliveryInfo from "../../components/order/DeliveryInfo";
import OrderDetails from "../../components/order/OrderDetails";
import OrderSummary from "../../components/order/OrderSummary";

const Checkout = () => {
  const { cart, total } = useSelector((state) => state.cartReducer);
  const [stripeSelected, setStripeSelected] = useState(false)
  const [state, setState] = useState({
    fullname:"",
    addressLineOne:"",
    addressLineTwo:"",
    country:"",
    city:"",
    state:"",
    zipCode:""
  })
  return (
    <div>
      <BreadCrumbs title={"Checkout"} />
      <div
        className="w-12/12  flex  px-4
     lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100">
     <div className="grid grid-cols-1 mb-2 sm:grid-cols-2">
     <div className="flex flex-col mr-8">
     <OrderDetails cart={cart}/>
     {
      !stripeSelected &&  <DeliveryInfo setState={setState} state={state}/>
     }
     </div>
      <div className=" ">
        <OrderSummary address={state} setStripeSelected={setStripeSelected} total={total} cart={cart}/>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Checkout;
