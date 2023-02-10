import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderService = createApi({
  reducerPath: "order",
  tagTypes: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/order/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createOrder: builder.mutation({
        query: (data) => {
          return {
            url: "create-order",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["orders"],
      }),
      updateOrder: builder.mutation({
        query: (data) => {
          return {
            url: `update-order/${data.id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["orders"],
      }),
      getUserOrders: builder.query({
        query: () => {
          return {
            url: `get-user-orders`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      getAllOrders: builder.query({
        query: (id) => {
          return {
            url: `get-all-orders`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      getSingleOrder: builder.query({
        query: (id) => {
          return {
            url: `get-order/${id}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetUserOrdersQuery,
  useGetSingleOrderQuery,
  useGetAllOrdersQuery
} = orderService;

export default orderService;
