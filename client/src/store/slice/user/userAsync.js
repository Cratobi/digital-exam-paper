import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../api/rest'

const url = 'user'

const verify = createAsyncThunk('user/verify', async ({ email, password }, { dispatch, getState }) => {
  const params = []
  const query = {}

  const body = { email, password }

  return await Api.verify({ url, params, query, body })
})
const createUser = createAsyncThunk(
  'user/create',
  async ({ name, email, gender, birthDate, bloodGroup, type, institution, password }, { dispatch, getState }) => {
    const params = []
    const query = {}

    const body = { name, email, gender, birthDate, bloodGroup, type, institution, password }

    return await Api.create({ url, params, query, body })
  }
)

export { verify, createUser }
