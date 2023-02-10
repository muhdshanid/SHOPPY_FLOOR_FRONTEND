import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userService = createApi({
  reducerPath: "user",
  tagTypes: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      addToWishlist: builder.mutation({
        query: (data) => {
          return {
            url: `add-to-wishlist`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["users"],
      }),
      removeFromWishlist: builder.mutation({
        query: (data) => {
          return {
            url: `remove-from-wishlist`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["users"],
      }),
      deleteCoupon: builder.mutation({
        query: (id) => {
          return {
            url: `delete-coupon/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["coupons"],
      }),
      getUserWishlist: builder.query({
        query: () => {
          return {
            url: `get-wishlist`,
            method: "GET",
          };
        },
        providesTags: ["users"],
      }),
      getCoupon: builder.query({
        query: (id) => {
          return {
            url: `get-coupon/${id}`,
            method: "GET",
          };
        },
        providesTags: ["coupons"],
      }),
      applyCoupon: builder.query({
        query: (name) => {
          return {
            url: `apply-coupon/${name}`,
            method: "GET",
          };
        },
        providesTags: ["coupons"],
      }),
    };
  },
});

export const {
  useAddToWishlistMutation,
  useGetUserWishlistQuery,
  useRemoveFromWishlistMutation
} = userService;

export default userService;
