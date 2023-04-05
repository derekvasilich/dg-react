import { authService } from '@/services'
import { createSlice } from '@reduxjs/toolkit'
import { useRouter } from "next/router"

const emailRegExp = /^[a-zA-Z0-9_]+[@][a-zA-Z0-9_]+[.][-a-zA-Z0-9._]+$/

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authorization: null,
    exception: null,
    loading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setException: (state, action) => {
      state.exception = action.payload
    },
    setAuthorization: (state, action) => {      
      if (action.payload && action.payload.token) {
        sessionStorage.setItem('jwt:token', action.payload.token)
        sessionStorage.setItem('jwt:type', action.payload.type)
        state.authorization = action.payload
      }                 }
  },
})

// Action creators are generated for each case reducer function
export const { setLoading, setException, setAuthorization } = authSlice.actions

export const login = (filters) => (dispatch) => {
  dispatch(setLoading(true))
  dispatch(setException(null))
  authService.login(filters)
    .then((res) => {
      console.log(res)
      dispatch(setAuthorization(res.data))
    })
    .catch((e) => {
      console.log(e)
      dispatch(setException(e.response.data))
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}

export const selectAuthorization = (state) => state.auth.authorization
export const selectException = (state) => state.auth.exception
export const selectLoading = (state) => state.auth.loading

export default authSlice.reducer