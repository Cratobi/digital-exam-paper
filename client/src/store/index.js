import { configureStore } from '@reduxjs/toolkit'
import user from './slice/user/userSlice'
import question from './slice/question/questionSlice'
import answer from './slice/answer/answerSlice'

export default configureStore({
  reducer : {
    user,
    question,
    answer,
  },
})
