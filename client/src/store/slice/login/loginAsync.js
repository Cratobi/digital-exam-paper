import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../api/rest'

const url = 'posts'

const verifyLogin = createAsyncThunk('login/verifyLogin', async ({ username, password }, { dispatch, getState }) => {
  // return await Api.verify({ url, data })
  return true
})

export { verifyLogin }
