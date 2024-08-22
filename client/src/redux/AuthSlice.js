import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loding: null,
  error: null,
  user: null,
}

const AuthSlice = createSlice({
  name: "authslice",
  initialState: initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload
    },
    Logout: (state) => {
      ;(state.user = null), (state.loding = null), (state.error = null)
    },
  },
})

export const { SetUser,Logout } = AuthSlice.actions
export default AuthSlice.reducer
