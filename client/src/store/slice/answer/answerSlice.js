import { createSlice, current } from '@reduxjs/toolkit'

import { fetchAnswer, createAnswer, fetchAnswerByCode } from './answerAsync'

const answerSlice = createSlice({
  // Model
  name          : 'answer',
  initialState  : {
    answer  : {},
    answers : [],
    status  : '',
    error   : '',
  },

  // Controllers
  extraReducers : {
    // fetchAnswer
    [fetchAnswer.pending]: state => {
      state.status = 'loading'
    },
    [fetchAnswer.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [fetchAnswer.fulfilled]: (state, { payload }) => {
      state.answers = payload
      state.status = 'success'
    },
    // fetchAnswerByCode
    [fetchAnswerByCode.pending]: state => {
      state.status = 'loading'
    },
    [fetchAnswerByCode.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [fetchAnswerByCode.fulfilled]: (state, { payload }) => {
      state.answer = payload[0]
      state.status = 'success'
    },
    // createAnswer
    [createAnswer.pending]: state => {
      state.status = 'loading'
    },
    [createAnswer.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [createAnswer.fulfilled]: (state, { payload }) => {
      state.status = 'success'
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

export const state = ({ answer }) => answer
export const { replace, add, modify, remove } = answerSlice.actions
export default answerSlice.reducer
