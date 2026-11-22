import { apiSlice } from "./apiSlice"
export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.mutation({
            query: () => ({
                url: '/orders',
                method: 'GET',
            }),
        }),
        getSingleOrder: builder.mutation({
            query: ({id}) => ({
                url: `/orders/${id}`,
                method: 'GET',
            }),
        }),
        completeOrder : builder.mutation({
            query: ({id}) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useGetOrdersMutation,
    useGetSingleOrderMutation,
    useCompleteOrderMutation
} = orderApiSlice 