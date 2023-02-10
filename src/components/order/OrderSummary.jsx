import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplyCouponQuery } from "../../store/services/couponServices";
import { useSendPaymentMutation } from "../../store/services/paymentServices";
import { useCreateOrderMutation } from "../../store/services/orderServices";
import { CgSpinner } from "react-icons/cg";
import SuccessModal from "../modal/SuccessModal";
import { useDispatch } from "react-redux";
import { emptyCart } from '../../store/reducers/cartReducer'
const OrderSummary = ({total,cart,setStripeSelected,address}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const taxRate = 10
  const taxPrice = total *  (taxRate / 100)
  const  taxPriceWithoutFloat = taxPrice.toFixed()
  const [coupon, setCoupon] = useState("")
  const [couponError, setCouponError] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
  const [skip, setSkip] = useState(true)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [doPayment, res] = useSendPaymentMutation();
  const [doCOD,resp] = useCreateOrderMutation()
  let finalPriceWithFloat = total * (1 + (taxRate / 100)) + couponDiscount
  let finalPriceWithoutFloat = Number(finalPriceWithFloat).toFixed()
  const [finalPrice, setFinalPrice] = useState(finalPriceWithoutFloat) 
  const [modalOpen, setModalOpen] = useState(false)
  const {data,isFetching,isSuccess} = useApplyCouponQuery(coupon,{skip})
  const applyCouponFn = () => {
    if(selectedPayment === "stripe"){
      setCouponError(true)
    }
    if(coupon !== ""){ 
      setCoupon("")
      setSkip(prev => !prev)
    } 
  }
  const pay = () => {
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
     dispatch(emptyCart())
    }
  }, [navigate, resp.isSuccess]);
  useEffect(()=>{
    if(isSuccess && couponDiscount === 0){
      let couponDiscount = data?.discount
      let amountAfterDiscount = total *  (couponDiscount / 100)
      let amountAfterDiscountWithoutFloat = amountAfterDiscount.toFixed()
      setFinalPrice(prev => prev - amountAfterDiscount)
      setCouponDiscount(amountAfterDiscountWithoutFloat)
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
        <div className="flex  flex-col">
        <div className="flex  p-4">
          <div className="w-[50%]">
            <input
            value={coupon}
            onChange={(e)=>setCoupon(e.target.value)}
              type="text"
              className="bg-gray-200 sm:w-full   px-4 py-2 rounded-full outline-none border-none"
              placeholder="Enter Coupon Code"
            />
          </div>
          <div>
            <button disabled={couponDiscount > 0} onClick={applyCouponFn}
              className="button-green !w-full"
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
            <input 
            checked={selectedPayment === "Cash on Delivery"}
            onChange={handlePaymentChange}
             type="radio" name="payment" className="w-6 h-6
              bg-green-900 text-green-900 rounded-full flex items-center justify-center"
               value="Cash on Delivery" /> 
            <span className="text-md font-semibold  text-gray-900"> Cash on Delivery</span>
            </div>
            <div className="flex gap-4 items-center">
            <input 
            checked={selectedPayment === "stripe"}
            onChange={handlePaymentChange}
            className="w-6 h-6
              bg-green-900 text-green-900 rounded-full flex items-center justify-center"
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
}
                    </h6>
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
                <button disabled={address.fullname === ""} onClick={pay} className='button-green !w-full'> {
                resp?.isLoading ?
                <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                      </>
                :
                `Pay ₹
                   ${selectedPayment === "stripe" ? total : finalPrice}`}</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      {
      modalOpen && <SuccessModal setState={setModalOpen} state={modalOpen} />
    }
    </div>
  );
};
 
export default OrderSummary;
