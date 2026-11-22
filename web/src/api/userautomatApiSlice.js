import { apiSlice } from "./apiSlice"
export const userautomatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserAutomats: builder.mutation({
            query: () => ({
                url: '/userautomats',
                method: 'GET',
            }),
        }),
        completeFilterChange : builder.mutation({
            query: ({id}) => ({
                url: `/userautomats/${id}`,
                method: 'PUT',
            })
        }),
    })
})

export const {
    useGetUserAutomatsMutation,
    useCompleteFilterChangeMutation
} = userautomatApiSlice 