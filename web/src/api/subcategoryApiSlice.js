import { apiSlice } from "./apiSlice"
export const subcategoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubcategories: builder.mutation({
            query: () => ({
                url: '/subcategories',
                method: 'GET',
            }),
        }),
        addSubcategory: builder.mutation({
            query: formData => ({
                url: '/subcategories',
                method: 'POST',
                body:formData
            }),
        }),
        deleteSubcategory : builder.mutation({
            query: ({id}) => ({
                url: `/subcategories/${id}`,
                method: 'DELETE',
            })
        }),
})
})
export const {
    useGetSubcategoriesMutation,
    useAddSubcategoryMutation,
    useDeleteSubcategoryMutation
} = subcategoryApiSlice 