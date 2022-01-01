import { createSlice } from '@reduxjs/toolkit'

import { fetch__Template__ } from './__template__Async'

const __template__Slice = createSlice({
  // Model
  name          : '__template__',
  initialState  : {
    __template__ : [],
    status       : '',
    error        : '',
  },

  // Controllers
  extraReducers : {
    [fetch__Template__.pending]: state => {
      state.status = 'loading'
    },
    [fetch__Template__.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [fetch__Template__.fulfilled]: (state, { payload }) => {
      state.__template__ = payload
      state.status = 'success'
    },
  },
  reducers      : {
    replace(state, { payload }) {
      state[payload.key].push(payload.data)
    },
    add(state, { payload }) {
      state[payload.key].push(payload.data)
    },
    modify(state, { payload }) {
      state[payload.key].push(payload.data)
    },
    remove(state, { payload }) {
      state[payload.key].push(payload.data)
    },
  },
})

export const state = ({ __template__ }) => __template__
export const { replace, add, modify, remove } = __template__Slice.actions
export default __template__Slice.reducer
