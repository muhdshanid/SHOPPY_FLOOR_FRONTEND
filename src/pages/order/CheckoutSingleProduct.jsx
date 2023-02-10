import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import DeliveryInfo from "../../components/order/DeliveryInfo";
import OrderDetails from "../../components/order/OrderDetails";
import OrderSummarySingleProduct from "../../components/order/OrderSummarySingleProduct";
import { useGetProductQuery } from "../../store/services/productServices";
import { discount } from "../../utils/discount";
import queryString from 'query-string'
const CheckoutSingleProduct = () => {
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
  const location = useLocation()
  const value=queryString.parse(location.search);
const color=   value.color
const size =value.size;
const quantity = value.qty
    const  {id} = useParams()
  const [product, setProduct] = useState({})
  const {data,isFetching,isSuccess,isLoading} = useGetProductQuery(id)
  useEffect(() => {
    if (isFetching === false) {
      setProduct(data);
    }
  }, [data, isFetching]);
  const total = discount(product.price,product.discount)
  return (
    isFetching === false && isSuccess && !isLoading && data && product !== {} &&   <div>
    <BreadCrumbs title={"Checkout"} />
    <div
      className="w-12/12  flex  px-4
   lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100">
    <div className="grid mx-auto lg:gap-0 gap-6 grid-cols-1 mb-2 lg:grid-cols-2">
    <div className="flex flex-col  lg:mr-8">
    <OrderDetails color={color} quantity={quantity} size={size} product={product}/>
    {
      !stripeSelected && <DeliveryInfo setState={setState}state={state} />
    }
    </div>
    <div className=" ">
      <OrderSummarySingleProduct address={state}
       setStripeSelected={setStripeSelected} color={color}
        quantity={quantity} size={size} totalPrice={total}  product={product}/>
    </div>
    </div>
    </div>
  </div>
  )
}

export default CheckoutSingleProduct