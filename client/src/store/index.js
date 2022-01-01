import { configureStore } from '@reduxjs/toolkit'
import __template__ from './slice/__template__/__template__Slice'
import login from './slice/login/loginSlice'

export default configureStore({
  reducer : {
    __template__,
    login,
  },
})
