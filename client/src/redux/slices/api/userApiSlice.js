import {apiSlice} from "../apiSlice";
const USER_URL ="/api/user"
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        updateUser:builder.mutation({
            query:(data) => ({
                url:`${USER_URL}/profile`,
                method:"PUT",
                body:data,
                credentials:"include",
            })
        }),
        getTeamList: builder.query({
            query: () => ({
                url: `${USER_URL}/get-team`,  // Update this line
                method: "GET",
                credentials: "include",
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,  // Update this line
                method: "DELETE",
                credentials: "include",
            }),
        }),
        userAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,  // Update this line
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        getNotifications: builder.query({
            query: () => ({
                url: `${USER_URL}/notifications`,  // Update this line
                method: "GET",
                credentials: "include",
            }),
        }),

        markNotiasRead: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data.id}`,  // Update this line
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        changePassword : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-password`,  // Update this line
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        
    })
})

export const {useUpdateUserMutation , useGetTeamListQuery , useDeleteUserMutation , useUserActionMutation
    , useGetNotificationsQuery , useMarkNotiasReadMutation , useChangePasswordMutation
} = authApiSlice;