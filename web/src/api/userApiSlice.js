import { apiSlice } from "./apiSlice"
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.mutation({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
        }),
        getSingleUser: builder.mutation({
            query: id => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
        }),
        getAdmins: builder.mutation({
            query: () => ({
                url: '/users/admin',
                method: 'GET',
            }),
        }),
        getUsersWithoutAutomat: builder.mutation({
            query: () => ({
                url: '/users/withoutAutomat',
                method: 'GET',
            }),
        }),
        deactivateUser : builder.mutation({
            query: ({id}) => ({
                url: `/users/deactivate/${id}`,
                method: 'PUT',
            })
        }),
        activateUser : builder.mutation({
            query: ({id}) => ({
                url: `/users/activate/${id}`,
                method: 'PUT',
            })
        }),
        deleteUser : builder.mutation({
            query: id => ({
                url: `/users/${id}`,
                method: 'DELETE'
            })
        }),
        resetPassword : builder.mutation({
            query: ({id}) => ({
                url: `/users/resetPassword/${id}`,
                method: 'GET',
            })
        }),
        updateUser : builder.mutation({
            query: ({id,myUser}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body:{myUser}
            })
        }),
        addUser: builder.mutation({
            query: userData => ({
                url: '/users',
                method: 'POST',
                body:userData
            }),
        }),
})
})
export const {
    useGetUsersMutation,
    useGetSingleUserMutation,
    useGetAdminsMutation,
    useGetUsersWithoutAutomatMutation,
    useDeactivateUserMutation,
    useActivateUserMutation,
    useDeleteUserMutation,
    useResetPasswordMutation,
    useUpdateUserMutation,
    useAddUserMutation
} = userApiSlice 