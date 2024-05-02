import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// define a service uing base url

const appApi = createApi({
    reducerPath: 'apiApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001'}),

    endpoints: (builder) => ({
        // creating the user
        signup: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user
            }),
        }),

        loginUser: builder.mutation({
            query: (user)=>({
                url: "/users/login",
                method: "POST",
                body: user
            }),
        }),

        logout: builder.mutation({
            query: (payload) => ({
                url: "/users/logout",
                method: "DELETE",
                body: payload
            }),
        }),
    })

})

export const {userSignupUserMutation, userLoginUserMutation, userLogoutMutation} = appApi;
export default appApi;

