import React, { useEffect, useState } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
const Stepper = ({order}) => {
  const steps = [ "Placed" ,"Processed", "Dispatched", "Delivered"];
  const [currentStep, setCurrentStep] = useState(2);
  const [complete, setComplete] = useState(false);
  useEffect(()=>{
      if(order.orderStatus === "Processed"){
        setCurrentStep(3)
      }
      if(order.orderStatus === "Dispatched"){
        setCurrentStep(4)
      }
      if(order.orderStatus === "Delivered"){
        setComplete(true)
        setCurrentStep(5)
      }
  },[currentStep,order.orderStatus])
  return (
    <>
      <div className="flex justify-between ">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item-user  ${currentStep === i + 1 && "active-user"} ${
              (i + 1 < currentStep || complete) && "complete-user"
            } `}
          >
            <div className="step-user">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <h6 className="">{step}</h6>
          </div>
        ))}
      </div>
     
    </>
  );
};

export default Stepper;