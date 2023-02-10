import React, { useEffect, useState } from "react";
import './AdminStepper.css'
import { TiTick } from "react-icons/ti";
import { useUpdateOrderMutation } from "../../../store/services/orderServices";
const AdminStepper = ({order}) => {
  const steps = [ "Processed" , "Dispatched", "Delivered"];
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(()=>{
    if(order.orderStatus === "Processed"){
      setCurrentStep(2)
    }else if(order.orderStatus === "Dispatched"){
      setCurrentStep(3)
    }else if(order.orderStatus === "Delivered"){
      setCurrentStep(4)
    }
  },[currentStep, order.orderStatus])
  console.log(currentStep,order.orderStatus);
  const [complete, setComplete] = useState(false);
  const [updateStatus,res] = useUpdateOrderMutation()
  const updateOrderStatus = () => {
    let status = "";
    if(currentStep === 1){
      status = "Processed"
    }
    if(currentStep === 2){
      status = "Dispatched"
    }
    if(currentStep === 3){
      status = "Delivered"
    }
   if(status !== ""){
    updateStatus({status,id:order._id})
   }
  }
  useEffect(()=>{
    if(res.isSuccess){
      if(res?.data === "Processed"){
        setCurrentStep(2)
      }
      if(res?.data === "Dispatched"){
        setCurrentStep(3)
      }
      if(res?.data === "Delivered"){
        setComplete(true)
        setCurrentStep(4)
      }
    }
  },[currentStep, res.isSuccess, steps.length])
  return (
    <>
      <div className="flex my-4 justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {!complete && (
        <button
          className={`btn bg-orange-300 
          items-center flex ${currentStep === 4 ? "hidden" : ""} gap-2 px-2 py-2
           hover:bg-white hover:text-black
           rounded-lg border border-black font-semibold  my-4 mx-auto  text-black`}
          onClick={() => updateOrderStatus()}
        >
          {currentStep ===  1 ? "Processed" :
          currentStep === 2 ? "Dispatched" : 
          currentStep === 3 ? "Delivered" : ""}
        </button>
      )}
    </>
  );
};

export default AdminStepper;