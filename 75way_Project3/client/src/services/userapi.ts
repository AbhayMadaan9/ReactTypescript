import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ['User','List'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/auth/login",
          method: "post",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: { username: string; email: string; password: string }) => {
        return ({
          url: "/auth/register",
          method: "post",
          body,
        });
      },
    }),
    getUser: builder.query({
        query: (body: {token: string; }) => ({
        url: `/user`, //get id 
        method: "get",
        headers: {
          authtoken: `${body.token}`,
        },
      }),
      }),
      getUsers: builder.query({
        query: (body: { token: string; })=> ({
          url: `/users`,
          method: "get",
          headers: {
            authtoken: `${body.token}`,
          },
        }),
        providesTags: () => [{ type: 'User', id: 'List' }],
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
        query: (body: { id: string, token: string;}) => {
          console.log(body.id)
          return {
            url: `/deleteuser/${body.id}`,
            method: "delete",
            headers: {
              authtoken: `${body.token}`,
            },
          };
        },
        invalidatesTags: [{ type: 'User', id: 'List' }],
      }),
  }),
  
});

export const { useLoginUserMutation, useRegisterUserMutation, useGetUserQuery, useGetUsersQuery, useDeleteUserMutation } = userApi;