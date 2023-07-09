import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: ""
}

export type UserSliceT = typeof initialState

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setData: (_, action: PayloadAction<UserSliceT>) => {
      const { username, token } = action.payload

      localStorage.setItem("token", token)
      localStorage.setItem("username", username)

      return action.payload
    },
    logout: () => {
      localStorage.setItem("token", "")
      localStorage.setItem("username", "")

      return { username: "", token: "" }
    }
  }
})

export const userReducer = userSlice.reducer
export const { setUsername, setData, setToken, logout } = userSlice.actions
