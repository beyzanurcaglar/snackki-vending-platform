import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    loginStart: (state, action) => {
        state.user = null
        state.token = null
    },
    loginSuccess: (state, action) => {
        // The panel is admin-only: non-admin sessions are not stored
        const user = action.payload.user
        if (!user || Number(user.isAdmin) !== 1) {
            state.user = null
            state.token = null
            return
        }
        state.user = user
        state.token = action.payload.token
    },
    logout: (state) => {
        state.user = null
        state.token = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token