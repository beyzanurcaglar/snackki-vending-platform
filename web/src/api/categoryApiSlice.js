import { apiSlice } from "./apiSlice"
export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.mutation({
            query: () => ({
                url: '/categories',
                method: 'GET',
            }),
        }),
        addCategory: builder.mutation({
            query: formData => ({
                url: '/categories',
                method: 'POST',
                body:formData
            }),
        }),
        deleteCategory : builder.mutation({
            query: ({id}) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            })
        })
})
})
export const {
    useGetCategoriesMutation,
    useAddCategoryMutation,
    useDeleteCategoryMutation
} = categoryApiSlice 