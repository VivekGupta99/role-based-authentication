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
    SetUser:(state, action) =>{
        state.user = action.payload
    }
  },
})

export const {SetUser} = AuthSlice.actions
export default AuthSlice.reducer
