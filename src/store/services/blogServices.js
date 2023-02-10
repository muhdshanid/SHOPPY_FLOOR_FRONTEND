import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogService = createApi({
  reducerPath: "blogs",
  tagTypes: "blogs",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/blog/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createBlog: builder.mutation({
        query: (data) => {
          return {
            url: "create-blog",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["blogs"],
      }),
      updateBlog: builder.mutation({
        query: (data) => {
          return {
            url: `update-blog/${data.id}`,
            method: "PUT",
            body: data.data,
          };
        },
        invalidatesTags: ["blogs"],
      }),
      likeBlog: builder.mutation({
        query: (data) => {
          return {
            url: `like-blog/${data.id}`,
            method: "PUT",
            body:data
          };
        },
        invalidatesTags: ["blogs"],
      }),
      deleteBlog: builder.mutation({
        query: (id) => {
          return {
            url: `delete-blog/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["blogs"],
      }),
      getBlogs: builder.query({
        query: (page) => {
          return {
            url: `get-allblogs`,
            method: "GET",
          };
        },
        providesTags: ["blogs"],
      }),
      getFilteredBlogs: builder.query({
        query: (data) => {
          return {
            url: `get-filtered-blogs/${data.category}`,
            method: "GET",
          };
        },
        providesTags: ["blogs"],
      }),
      getBlog: builder.query({
        query: (id) => {
          return {
            url: `get-blog/${id}`,
            method: "GET",
          };
        },
        providesTags: ["blogs"],
      }),
    };
  },
});

export const {
  useCreateBlogMutation,
  useGetFilteredBlogsQuery,
  useLikeBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
} = blogService;

export default blogService;
