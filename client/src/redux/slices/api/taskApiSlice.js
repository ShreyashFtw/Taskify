import { apiSlice } from "../apiSlice";
const TASK_URL = "/api/task"
export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: `${TASK_URL}/dashboard`,  // Update this line
                method: "GET",
                credentials: "include",
            }),
        }),
        getAllTask: builder.query({
            query: ({ strQuery, isTrashed, search }) => ({
                url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,  // Update this line
                method: "GET",
                credentials: "include",
            }),
        }),
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/create`,  // Update this line
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        duplicateTask: builder.mutation({
            query: (id) => ({
                url: `${TASK_URL}/duplicate/${id}`,  // Update this line
                method: "POST",
                body: {},
                credentials: "include",
            }),
        }),
        updateTask: builder.mutation({
            query: ({ _id, ...data }) => {  // Destructure _id
                if (!_id) throw new Error("Task ID is required for updating");
                return {
                    url: `${TASK_URL}/update/${_id}`,
                    method: "PUT",
                    body: data,
                    credentials: "include",
                };
            },
        }),


        trashtask: builder.mutation({
            query: ({ id, isTrashed }) => ({
              url: `${TASK_URL}/${id}`, // Using the task ID directly
              method: "PUT",
              body: { isTrashed }, // Include the body if needed
              credentials: "include",
            }),
          }),
          
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `${TASK_URL}/${id}`, // This should be correct
                method: "DELETE",
                credentials: "include",
            }),
        }),
        
        createSubTask: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASK_URL}/create-subtask/${id}`, // Confirm this URL is correct
                method: 'PUT', // Ensure this matches the intended API method
                body: data,
                credentials: 'include', // Use credentials if needed for cookies, etc.
            }),
        }),
        getSingleTask: builder.query({
            query: (id) => ({
                url: `${TASK_URL}/${id}`,  // Update this line
                method: "GET",
                credentials: "include",
            }),
        }),
        postTaskActivity: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASK_URL}/activity/${id}`,  // Update this line
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        deleteRestoreTask: builder.mutation({
            query: ({ id, actionType }) => ({
                url: `${TASK_URL}/delete-restore/${id}?actionType=${actionType}`,  // Update this line
                method: "DELETE",
                credentials: "include",
            }),

        }),
    }),

});

export const { useGetDashboardStatsQuery, useGetAllTaskQuery
    , useCreateTaskMutation, useDuplicateTaskMutation
    , useUpdateTaskMutation, useTrashtaskMutation,
    useDeleteTaskMutation, useCreateSubTaskMutation,
    useGetSingleTaskQuery, usePostTaskActivityMutation
    , useDeleteRestoreTaskMutation
} = taskApiSlice;
