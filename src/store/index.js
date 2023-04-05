import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/authSlice'
import vehicleReducer from '@/store/vehicleSlice'

export default configureStore({
  reducer: {
      auth: authReducer,
      vehicles: vehicleReducer
  },
})