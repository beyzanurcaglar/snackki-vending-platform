import { apiSlice } from "./apiSlice"
export const tokenApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        verifyCaptchaToken: builder.mutation({
            query: credentials => ({
                url: '/verify-token',
                method: 'POST',
                body: { ...credentials }
            }),
        })
    })
})

export const {
    useVerifyCaptchaTokenMutation
} = tokenApiSlice 