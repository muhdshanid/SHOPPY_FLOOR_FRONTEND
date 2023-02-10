import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const paymentService = createApi({
    reducerPath:"payment",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://attractive-blazer-mite.cyclic.app/api/",
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.userToken;
            headers.set("authorization", token ? `Bearer ${token}` : "");
            headers.set({ 'Access-Control-Allow-Origin': '*'})
            return headers;
          },
    }),
    endpoints:(builder) => {
        return {
            sendPayment: builder.mutation({ 
                query:(cart) => {
                    return {
                        url:"create-checkout-session",
                        method:"POST",
                        body:cart
                    }
                }
            }),
            verifyPayment:builder.query({
                query:id => {
                    return {
                        url:`verify-payment/${id}`,
                        method:'GET'
                    }
                }
            })
        }}
})

export const {useSendPaymentMutation,useVerifyPaymentQuery} = paymentService

export default paymentService