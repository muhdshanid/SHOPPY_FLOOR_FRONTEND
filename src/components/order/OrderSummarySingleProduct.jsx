import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useApplyCouponQuery } from "../../store/services/couponServices";
import { useCreateOrderMutation } from "../../store/services/orderServices";
import { useSendPaymentMutation } from "../../store/services/paymentServices";
import SuccessModal from "../modal/SuccessModal";
const OrderSummarySingleProduct = ({product,color,size,totalPrice,quantity,setStripeSelected,address}) => {
    const navigate = useNavigate();
    const [qty, setQty] = useState(quantity ? quantity : 1)
    const [coupon, setCoupon] = useState("")
    const [couponError, setCouponError] = useState(false)
    const taxRate = 10
    const total = totalPrice * qty
    const taxPrice = total *  (taxRate / 100)
    const  taxPriceWithoutFloat = taxPrice.toFixed()
    const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
    const [skip, setSkip] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [couponDiscount, setCouponDiscount] = useState(0)
    const [doPayment, res] = useSendPaymentMutation();
    let finalPriceWithFloat = total * (1 + (taxRate / 100))
    let finalPriceWithoutFloat = Number(finalPriceWithFloat).toFixed()
     const [finalPrice, setFinalPrice] = useState()
     useEffect(() => {
      setFinalPrice(finalPriceWithoutFloat);
    }, [finalPriceWithoutFloat, totalPrice]);
    const [doCOD,resp] = useCreateOrderMutation()
    const {data,isFetching,isSuccess,isError} = useApplyCouponQuery(coupon,{skip})

    const applyCouponFn = () => {
      if(selectedPayment === "stripe"){
        setCouponError(true)
      }
      if(coupon !== ""){ 
        setSkip(prev => !prev)
      }
    } 
    const pay = () => { 
        const {
            colors,sizes,
             createdAt,
             updatedAt,
             tags,
             specifications,
             questions,
             reviews,
             description,
            ...newProduct
          } = product;
          newProduct['size'] = size ? size : sizes[0]
        newProduct['color'] = color ? color : colors[0]
        newProduct['quantity'] = qty
        console.log(newProduct);
        const cart = []
        cart.push(newProduct)
        if(selectedPayment === 'stripe'){
          doPayment({cart})
        }else{
          doCOD({cart,address})
        }
    }
    useEffect(() => {
      if (res?.isSuccess) {
        window.location.href = res?.data?.url;
      }
    }, [res]);
    useEffect(() => {
      if (resp.isSuccess) {
        setModalOpen(true)
      }
    }, [navigate, resp.isSuccess]);
    useEffect(()=>{
      if(isSuccess && couponDiscount === 0){
        let couponDiscount = data?.discount
        let amountAfterDiscount = total *  (couponDiscount / 100)
        setFinalPrice(prev => prev - amountAfterDiscount)
        setCouponDiscount(amountAfterDiscount)
      }
    },[ isSuccess])
    const handlePaymentChange = (event) => {
      if(event.target.value === "stripe"){
        setStripeSelected(true)
      }else{
        setStripeSelected(false)
      }
      setSelectedPayment(event.target.value);
    };
  return (
    <div className="w-12/12  p-4 border flex flex-col gap-4">
    <div className="flex px-4 items-center justify-between ">
      <h6 className="font-semibold text-2xl text-gray-900 ">Order Summary</h6>
    </div>
    <div className=" w-full flex flex-col gap-2">
      <div>
      <div className="flex  p-4">
        <div>
          <input
          value={coupon}
          onChange={(e)=>setCoupon(e.target.value)}
            type="text"
            className="bg-gray-200  px-4 py-2 rf sm:w-full w-[8.5rem] outline-none border-none"
            placeholder="Enter Coupon Code"
          />
        </div>
        <div>
          <button disabled={couponDiscount > 0} onClick={applyCouponFn}
            className="button-green !w-full flex items-center justify-center"
          >
            {
              isFetching ? 
              <CgSpinner className="h-6 w-6 animate-spin" />
            
            : "Apply Coupon"
            }
           
          </button>
        </div>
      </div>
      { couponError && <div className="ml-6 -mt-4">
        <p   className={`font-semibold capitalize  text-rose-600  text-sm`}
              >coupon available for COD only </p>
        </div>}
      { isError && <div className="ml-6 -mt-4">
        <p   className={`font-semibold capitalize  text-rose-600  text-sm`}
              >{data} </p>
        </div>}
      </div>
      <div className="flex p-4 flex-col gap-10">
       <div className="flex flex-col gap-6">
       <div>
          <h6 className="font-semibold text-lg text-gray-900 ">
            Payment Details
          </h6>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
          <input className="w-6 h-6
              bg-green-900 text-green-900 rf flex items-center justify-center" 
            checked={selectedPayment === "Cash on Delivery"}
            onChange={handlePaymentChange}
           type="radio" name="payment" value="Cash on Delivery" /> 
          <span className="text-md font-semibold  text-gray-900"> Cash on Delivery</span>
          </div>
          <div className="flex gap-4 items-center">
          <input className="w-6 h-6  
              bg-green-900 text-green-900 rf  flex items-center justify-center"
           checked={selectedPayment === "stripe"}
           onChange={handlePaymentChange}
           type="radio" name="payment" value="stripe" />  
           <span className="text-md font-semibold  capitalize text-gray-900"> Stripe (no tax)</span>
          </div>
        </div>
       </div>
        <div className="flex flex-col gap-4">
          <div className="flex pb-4 flex-col gap-4 border-b border-gray-200">
              <div className="flex items-center justify-between ">
                  <h6 className="font-semibold text-lg text-gray-900">Sub Total</h6>
                  <h6 className="font-semibold text-lg text-gray-900">₹{total}</h6>
              </div>
              <div className="flex items-center justify-between ">
                  <h6 className="font-semibold text-lg text-gray-900">Tax
                  {  
                   selectedPayment === "stripe" ? "(0%)" :"(10%)"
}</h6>
                  <h6 className="font-semibold text-lg text-gray-900">₹{
                      selectedPayment === "stripe" ? 0 :
                    taxPriceWithoutFloat}</h6>
              </div>
              <div className="flex items-center justify-between ">
                  <h6 className="font-semibold text-lg text-gray-900">Coupon Discount </h6>
                  <h6 className="font-semibold text-lg text-gray-900">-₹{
                      selectedPayment === "stripe" ? 0 : couponDiscount
                    }</h6>
              </div>
              <div className="flex items-center justify-between ">
                  <h6 className="font-semibold text-lg text-gray-900">Delivery Charge</h6>
                  <h6 className="font-semibold text-lg text-gray-900">₹0</h6>
              </div>
          </div>
          <div className="flex w-full flex-col gap-6">
          <div className="flex items-center justify-between ">
                  <h6 className="font-bold text-lg text-gray-900"> Total</h6>
                  <h6 className="font-bold text-lg text-gray-900">₹{
                   selectedPayment === "stripe" ? total : finalPrice}</h6>
              </div>
              <div className="w-full">
              <button disabled={address.fullname === "" && selectedPayment !== "stripe"} onClick={pay} 
              className='button-green !w-full'>
                {
                resp?.isLoading ?
                <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                      </>
                :
                `Pay ₹
                   ${selectedPayment === "stripe" ? total : finalPrice}`}
                   </button>
              </div>
          </div>
        </div>
      </div>
    </div>
    {
      modalOpen && <SuccessModal setState={setModalOpen} state={modalOpen} />
    }
  </div>
  )
}

export default OrderSummarySingleProduct