import { createSlice, current } from '@reduxjs/toolkit'

import { verify, createUser } from './userAsync'

const userSlice = createSlice({
  // Model
  name          : 'user',
  initialState  : {
    login_status : 'logged_out',
    user         : {},
    status       : '',
    error        : '',
  },

  // Controllers
  extraReducers : {
    // verify
    [verify.pending]: state => {
      state.status = 'loading'
    },
    [verify.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [verify.fulfilled]: (state, { payload }) => {
      if (payload && payload !== 'User or password is wrong') {
        state.login_status = 'logged_in'
        state.user = payload
        state.status = 'success'
      } else {
        state.login_status = 'login_failed'
        state.status = 'success'
      }
    },
    // createUser
    [createUser.pending]: state => {
      state.status = 'loading'
    },
    [createUser.rejected]: (state, { error }) => {
      state.status = 'failed'
      console.log(error)
      state.error = error.message
    },
    [createUser.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.status = 'success'
      } else {
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

export const state = ({ user }) => user
export const { replace, add, modify, remove } = userSlice.actions
export default userSlice.reducer
