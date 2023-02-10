import React, { useState } from "react";

const AddressForm = ({ handleInput, state, setAddressFormShow }) => {
  const [zipCodeError, setZipCodeError] = useState(false);
  const [saveAddressSelected, setSaveAddressSelected] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.zipCode.length < 6) {
      setZipCodeError(true);
      return;
    }
    setAddressFormShow(false);
  };
  return (
    <div className="flex flex-col gap-4 p-4">
     
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="font-semibold text-lg   capitalize text-gray-900"
          >
            full name
          </label>
          <input
            type="text"
            onChange={handleInput}
            name="fullname"
            value={state.fullname}
            className="bg-gray-50 border
      outline-none  border-green-900 w-full p-2 rounded-lg"
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="font-semibold text-lg   capitalize text-gray-900"
          >
            address line 1
          </label>
          <input
            type="text"
            onChange={handleInput}
            name="addressLineOne"
            value={state.addressLineOne}
            className="bg-gray-50 border
      outline-none  border-green-900 w-full p-2 rounded-lg"
            placeholder="Address line 1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="font-semibold text-lg   capitalize text-gray-900"
          >
            address line 2
          </label>
          <input
            type="text"
            onChange={handleInput}
            name="addressLineTwo"
            value={state.addressLineTwo}
            className="bg-gray-50 border
      outline-none  border-green-900 w-full p-2 rounded-lg"
            placeholder="Address line 2"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="font-semibold text-lg   capitalize text-gray-900"
            >
              country
            </label>
            <input
              type="text"
              onChange={handleInput}
              name="country"
              value={state.country}
              className="bg-gray-50 border
      outline-none  border-green-900 w-full p-2 rounded-lg"
              placeholder="Country"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="font-semibold text-lg capitalize   text-gray-900"
            >
              City
            </label>
            <input
              type="text"
              onChange={handleInput}
              name="city"
              value={state.city}
              className="bg-gray-50 border
      outline-none  border-green-900 w-full p-2 rounded-lg"
              placeholder="City"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="font-semibold text-lg   capitalize text-gray-900"
            >
              state
            </label>
            <input
              type="text"
              onChange={handleInput}
              name="state"
              value={state.state}
              className="bg-gray-50 border
      outline-none  border-green-900 w-full p-2 rounded-lg"
              placeholder="State"
            />
             <p
                className={`font-semibold invisible
                text-rose-600 capitalize text-sm`}
              >
                zipcode must have 6 numbers
              </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-semibold text-lg capitalize   text-gray-900"
              >
                Zip code
              </label>
              <input
                type="number"
                onChange={handleInput}
                name="zipCode"
                value={state.zipCode}
                className="bg-gray-50 border
      outline-none  border-green-900 w-full p-2 rounded-lg"
                placeholder="Zip Code"
              />
              <p
                className={`font-semibold  ${
                  zipCodeError ? "block" : "invisible"
                } text-rose-600 capitalize text-sm`}
              >
                zipcode must have 6 numbers
              </p>
            </div>
          </div>
        </div>
        <div className="py-2 ">
          <button
          onClick={(e)=>handleSubmit(e)}
            disabled={
              state.state === "" ||
              state.city === "" ||
              state.country === "" ||
              state.addressLineOne === "" ||
              state.addressLineTwo === "" ||
              state.fullname === ""
            }
            className="button-green !w-full"
          >
            Submit
          </button>
        </div>
      
    </div>
  );
};

export default AddressForm;
