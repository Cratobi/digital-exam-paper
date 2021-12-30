import { createSlice, current } from '@reduxjs/toolkit'

import { fetchQuestion, createQuestion, fetchQuestionByCode } from './questionAsync'

const questionSlice = createSlice({
  // Model
  name          : 'question',
  initialState  : {
    question  : { id: '', code: '', title: '', subject: '', description: '', time: 0, date: '', questions: [] },
    questions : [],
    status    : '',
    error     : '',
  },

  // Controllers
  extraReducers : {
    [fetchQuestion.pending]: state => {
      state.status = 'loading'
    },
    [fetchQuestion.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [fetchQuestion.fulfilled]: (state, { payload }) => {
      state.questions = payload
      state.status = 'success'
    },
    [fetchQuestionByCode.pending]: state => {
      state.status = 'loading'
    },
    [fetchQuestionByCode.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [fetchQuestionByCode.fulfilled]: (state, { payload }) => {
      state.question = payload[0]
      state.status = 'success'
    },
    [createQuestion.pending]: state => {
      state.status = 'loading'
    },
    [createQuestion.rejected]: (state, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
    [createQuestion.fulfilled]: (state, { payload }) => {
      state.questions.push(payload)
      state.status = 'success'
    },
  },
  reducers      : {
    replace(state, { payload }) {
      console.log(payload)
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

export const state = ({ question }) => question
export const { replace, add, modify, remove } = questionSlice.actions
export default questionSlice.reducer
