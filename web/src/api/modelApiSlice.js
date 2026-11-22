import { apiSlice } from "./apiSlice"
export const modelApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getModels: builder.mutation({
            query: () => ({
                url: '/models',
                method: 'GET',
            }),
        }),
        addModel: builder.mutation({
            query: formData => ({
                url: '/models',
                method: 'POST',
                body:formData
            }),
        }),
        deleteModel : builder.mutation({
            query: ({id}) => ({
                url: `/models/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useGetModelsMutation,
    useAddModelMutation,
    useDeleteModelMutation
} = modelApiSlice 