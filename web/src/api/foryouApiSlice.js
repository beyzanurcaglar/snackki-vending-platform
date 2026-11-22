import { apiSlice } from "./apiSlice"
export const foryouApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getForyou: builder.mutation({
            query: () => ({
                url: '/foryou',
                method: 'GET',
            }),
        }),
        addForyou: builder.mutation({
            query: ({id}) => ({
                url: `/foryou/${id}`,
                method: 'POST',
            }),
        }),
        deleteForyou : builder.mutation({
            query: ({id}) => ({
                url: `/foryou/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useGetForyouMutation,
    useAddForyouMutation,
    useDeleteForyouMutation
} = foryouApiSlice 