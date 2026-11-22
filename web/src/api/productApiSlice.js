import { apiSlice } from "./apiSlice"
export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.mutation({
            query: () => ({
                url: '/products',
                method: 'GET',
            }),
        }),
        addProduct: builder.mutation({
            query: formData => ({
                url: '/products',
                method: 'POST',
                body:formData
            }),
        }),
        getSingleProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
        }),
        deleteProduct : builder.mutation({
            query: ({id}) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            })
        }),
        updateProduct : builder.mutation({
            query: (formData) => ({
                url: `/products/${formData.id}`,
                method: 'PUT',
                body:formData
            }),
        }),
    })
})

export const {
    useGetProductsMutation,
    useAddProductMutation,
    useGetSingleProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productApiSlice 