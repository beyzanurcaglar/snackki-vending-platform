import { apiSlice } from "./apiSlice"
export const periodsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPeriods: builder.mutation({
            query: () => ({
                url: '/periods',
                method: 'GET',
            }),
        })
    })
})

export const {
    useGetPeriodsMutation,
} = periodsApiSlice 