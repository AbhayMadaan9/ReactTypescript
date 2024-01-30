import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["User", "List"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/auth/login",
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: { username: string; email: string; password: string }) => {
        return {
          url: "/auth/register",
          credentials: "include",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
    }),
    getUser: builder.query({
      query: (body: { token: string | null }) => ({
        url: `/user`, //get id
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    refreshtoken: builder.mutation<void, void>({
      query: () => ({
        url: `/user/refreshtoken`,
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        credentials: "include",
        method: "get",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }),
      providesTags: () => [{ type: "User", id: "List" }],
    }),
    //   updateUser: builder.mutation({
    //     query: (body: { username: string; email: string; password: string }) => {
    //       return {
    //         url: "/user/id",
    //         method: "post",
    //         body,
    //       };
    //     },
    //   }),
    deleteUser: builder.mutation({
      query: (body: { id: string;}) => {
        console.log(body.id);
        return {
          url: `/deleteuser/${body.id}`,
          method: "delete",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: [{ type: "User", id: "List" }],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useRefreshtokenMutation,
  useLazyGetUsersQuery
} = userApi;
