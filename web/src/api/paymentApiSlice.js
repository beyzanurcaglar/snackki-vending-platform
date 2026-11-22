import { apiSlice } from "./apiSlice"
export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPayments: builder.mutation({
            query: () => ({
                url: '/payments',
                method: 'GET',
            }),
        })
    })
})

export const {
    useGetPaymentsMutation,
} = paymentApiSlice 