import { apiSlice } from "./apiSlice"
export const filterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFilters: builder.mutation({
            query: () => ({
                url: '/filters',
                method: 'GET',
            }),
        }),
        addFilter: builder.mutation({
            query: formData => ({
                url: '/filters',
                method: 'POST',
                body:formData
            }),
        }),
        deleteFilter : builder.mutation({
            query: ({id}) => ({
                url: `/filters/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useGetFiltersMutation,
    useAddFilterMutation,
    useDeleteFilterMutation
} = filterApiSlice 