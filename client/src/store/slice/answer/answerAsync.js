import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../api/rest'

const url = 'answer'

const fetchAnswer = createAsyncThunk('answer/fetchAnswer', async ({ answered_by } = {}, { dispatch, getState }) => {
  const params = []
  const query = { answered_by }

  return await Api.fetch({ url, params, query })
})

const fetchAnswerByCode = createAsyncThunk(
  'answer/fetchAnswerByCode',
  async ({ code } = {}, { dispatch, getState }) => {
    const params = [ code ]
    const query = {}

    return await Api.fetch({ url, params, query })
  }
)

const createAnswer = createAsyncThunk(
  'answer/createAnswer',
  async (
    { answered_by, created_by, title, code, subject, description, time, date, questions } = {},
    { dispatch, getState }
  ) => {
    const params = []
    const query = {}

    const body = { answered_by, created_by, title, code, subject, description, time, date, questions }

    return await Api.create({ url, params, query, body })
  }
)

export { fetchAnswer, createAnswer, fetchAnswerByCode }
