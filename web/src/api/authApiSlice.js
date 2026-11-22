import { loginStart, loginSuccess } from "../redux/authReducer"
import { apiSlice } from "./apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({ 
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken, user } = data
                    dispatch(loginSuccess({ user: user || arg.userId, token: accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/login/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch }) {
                try {
                    dispatch(loginStart())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/login/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken, user } = data
                    dispatch(loginSuccess({ user: user || null, token: accessToken }))
                } catch (err) {
                    console.log(err)
                }
                }
            }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation,
} = authApiSlice 