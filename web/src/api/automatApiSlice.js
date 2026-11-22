import { apiSlice } from "./apiSlice"
export const automatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAutomats: builder.mutation({
            query: () => ({
                url: '/automats',
                method: 'GET',
            }),
        }),
        
        getSingleAutomat: builder.mutation({
            query: (id) => ({
                url: `/automats/${id}`,
                method: 'GET',
            }),
        }),
        getFreeAutomats: builder.mutation({
            query: () => ({
                url: '/automats/free',
                method: 'GET',
            }),
        }),
        addAutomat: builder.mutation({
            query: formData => ({
                url: '/automats',
                method: 'POST',
                body:formData
            }),
        }),
        deleteAutomat : builder.mutation({
            query: ({id}) => ({
                url: `/automats/${id}`,
                method: 'DELETE',
            })
        }),
        updateAutomat : builder.mutation({
            query: (formData) => ({
                url: `/automats/${formData.id}`,
                method: 'PUT',
                body:formData
            })
        }),
    })
})

export const {
    useGetAutomatsMutation,
    useGetSingleAutomatMutation,
    useGetFreeAutomatsMutation,
    useAddAutomatMutation,
    useDeleteAutomatMutation,
    useUpdateAutomatMutation
} = automatApiSlice 