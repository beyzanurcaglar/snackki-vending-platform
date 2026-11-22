import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { loginSuccess } from '../redux/authReducer'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        headers.set("x-api-key", process.env.REACT_APP_API_TOKEN || "")
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}
    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/login/refresh', api, extraOptions)
        if (refreshResult?.data) {
            // store the new token 
            api.dispatch(loginSuccess({
                user: refreshResult.data.user || null,
                token: refreshResult.data.accessToken
            }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})