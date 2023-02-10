import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productServices = createApi({
  reducerPath: "products",
  tagTypes: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/product/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation({
        query: (data) => {
          return {
            url: "create-product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      updateProduct: builder.mutation({
        query: (data) => {
          return {
            url: `update-product/${data.id}`,
            method: "PUT",
            body: data.data,
          };
        },
        invalidatesTags: ["products"],
      }),
      reviewProduct: builder.mutation({
        query: (data) => {
          return {
            url: `review`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      askQuestion: builder.mutation({
        query: (data) => {
          console.log(data);
          return {
            url: `question`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      likeReview: builder.mutation({
        query: (data) => {
          return {
            url: `like-review/${data.id}`,
            method: "PUT",
            body:data
          };
        },
        invalidatesTags: ["products"],
      }),
      likeQuestion: builder.mutation({
        query: (data) => {
          return {
            url: `like-question`,
            method: "PUT",
            body:data
          };
        },
        invalidatesTags: ["products"],
      }),
      deleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `delete-product/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["products"],
      }),
      getProducts: builder.query({
        query: (page) => {
          return {
            url: `get-allproducts`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getProduct: builder.query({
        query: (id) => {
          return {
            url: `get-product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getCatProducts: builder.query({
        query: (name) => {
          return {
            url: `get-cat-product/${name}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getBrandProducts: builder.query({
        query: (name) => {
          return {
            url: `get-brand-product/${name}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getPopularProducts: builder.query({
        query: () => {
          return {
            url: `get-popular-product`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getHeadphoneProducts: builder.query({
        query: () => {
          return {
            url: `get-headphone-product`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getSearchProducts: builder.query({
        query: (data) => {
          return {
            url: `get-search-products/${data.keyword}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getFilteredProducts: builder.query({
        query: (data) => {
          return {
            url: `get-filtered-products/${data.category}/${data.brand}/${data.price}/${data.rating}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
    };
  },
});

export const {
  useGetFilteredProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetHeadphoneProductsQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCatProductsQuery,
  useLikeReviewMutation,
  useAskQuestionMutation,
  useLikeQuestionMutation,
  useGetBrandProductsQuery,
  useReviewProductMutation,
  useGetSearchProductsQuery,
  useGetPopularProductsQuery
} = productServices;

export default productServices;
