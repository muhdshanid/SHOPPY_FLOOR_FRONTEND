import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  tagTypes: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/pro-category/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createCategory: builder.mutation({
        query: (data) => {
          return {
            url: "create-cat",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["categories"],
      }),
      updateCategory: builder.mutation({
        query: (data) => {
          return {
            url: `update-cat/${data.id}`,
            method: "PUT",
            body: data.data,
          };
        },
        invalidatesTags: ["categories"],
      }),
      deleteCategory: builder.mutation({
        query: (id) => {
          return {
            url: `delete-cat/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["categories"],
      }),
      getCategories: builder.query({
        query: (page) => {
          return {
            url: `get-allcat`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),
      getCategory: builder.query({
        query: (id) => {
          return {
            url: `get-cat/${id}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),
    };
  },
});

export const {
  useCreateCategoryMutation,useDeleteCategoryMutation,useGetCategoriesQuery,useGetCategoryQuery,
  useUpdateCategoryMutation
} = categoryService;

export default categoryService;
