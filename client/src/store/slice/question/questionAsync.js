import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../api/rest'

const url = 'question'

const fetchQuestion = createAsyncThunk(
  'question/fetchQuestion',
  async ({ created_by } = {}, { dispatch, getState }) => {
    const params = []
    const query = { created_by }

    return await Api.fetch({ url, params, query })
  }
)

const fetchQuestionByCode = createAsyncThunk(
  'question/fetchQuestionByCode',
  async ({ code } = {}, { dispatch, getState }) => {
    const params = [ code ]
    const query = {}

    return await Api.fetch({ url, params, query })
  }
)

const createQuestion = createAsyncThunk(
  'question/createQuestion',
  async ({ created_by, title, subject, description, time, date, questions } = {}, { dispatch, getState }) => {
    const params = []
    const query = {}

    const body = { created_by, title, subject, description, time, date, questions }

    return await Api.create({ url, params, query, body })
  }
)

export { fetchQuestion, createQuestion, fetchQuestionByCode }
