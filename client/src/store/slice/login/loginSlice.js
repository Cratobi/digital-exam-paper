import { createSlice, current } from '@reduxjs/toolkit'

import { verifyLogin } from './loginAsync'

const loginSlice = createSlice({
  // Model
  name          : 'login',
  initialState  : {
    loginStatus : 'loggedOut',
    name        : '',
    status      : '',
    error       : '',
  },

  // Controllers
  extraReducers : {
    [verifyLogin.pending]: state => {
      state.status = 'loading'
    },
    [verifyLogin.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [verifyLogin.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.loginStatus = 'loggedIn'
        state.status = 'success'
      } else {
        state.loginStatus = 'loginFailed'
        state.status = 'success'
      }
    },
  },
  reducers      : {
    replace(state, { payload }) {
      if (Object.prototype.toString.call(current(state)[payload.key]) !== '[object Array]') {
        state[payload.key] = payload.value
      } else {
        state[payload.key].push(payload.value)
      }
    },
    add(state, { payload }) {
      if (Object.prototype.toString.call(current(state)[payload.key]) !== '[object Array]') {
        state[payload.key] = payload.value
      } else {
        state[payload.key].push(payload.value)
      }
    },
    modify(state, { payload }) {
      if (Object.prototype.toString.call(current(state)[payload.key]) !== '[object Array]') {
        state[payload.key] = payload.value
      } else {
        state[payload.key].push(payload.value)
      }
    },
    remove(state, { payload }) {
      if (Object.prototype.toString.call(current(state)[payload.key]) !== '[object Array]') {
        state[payload.key] = payload.value
      } else {
        state[payload.key].push(payload.value)
      }
    },
  },
})

export const state = ({ login }) => login
export const { replace, add, modify, remove } = loginSlice.actions
export default loginSlice.reducer
