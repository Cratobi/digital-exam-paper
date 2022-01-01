import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../api/rest'

const url = 'posts'

const fetch__Template__ = createAsyncThunk(
  '__template__/fetch__Template__',
  async ({ _limit }, { dispatch, getState }) => {
    const params = []
    const query = { _limit }

    return await Api.fetch({ url, params, query })
  }
)

export { fetch__Template__ }
