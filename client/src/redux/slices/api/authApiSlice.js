import {apiSlice} from "../apiSlice";
import { logout } from "../authSlice";

const AUTH_URL ="/api/user"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/login`,
                method:"POST",
                body:data,
                credentials:"include",
            })
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: `${AUTH_URL}/register`,  // Update this line
                method: "POST",
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: (userData) => ({
                url: `${AUTH_URL}/logout`,  // Update this line
                method: "POST",
                body: userData,
            }),
        }),
    })
})

export const {useLoginMutation , useRegisterMutation , useLogoutMutation} = authApiSlice;