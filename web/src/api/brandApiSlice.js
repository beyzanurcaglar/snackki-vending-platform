import { apiSlice } from "./apiSlice"
export const brandApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBrands: builder.mutation({
            query: () => ({
                url: '/brands',
                method: 'GET',
            }),
        }),
        addBrand: builder.mutation({
            query: formData => ({
                url: '/brands',
                method: 'POST',
                body:formData
            }),
        }),
        deleteBrand : builder.mutation({
            query: ({id}) => ({
                url: `/brands/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useGetBrandsMutation,
    useAddBrandMutation,
    useDeleteBrandMutation
} = brandApiSlice 