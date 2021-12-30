import Mongoose from 'mongoose'
import Question from '../models/question'

// CODE: Fetch

const fetch = async ({ created_by = new Mongoose.Types.ObjectId() }) => {
  const question = await Question.fetch({ created_by })
  return question
}

const fetchOne = async ({ code }) => {
  // const question = await Question.fetchOne(id)
  const question = await Question.fetch({ code })

  return question
}

//  CODE: Create

const create = async ({ created_by, title, subject, description, time, date, questions } = {}) => {
  //  Generate Question Code
  const code = (new Mongoose.Types.ObjectId() + '').slice(3, 11).toUpperCase()
  const newQuestion = await Question.create({ code, created_by, title, subject, description, time, date, questions })

  return newQuestion
}

// CODE: Modify

const modify = async ({ id, title, subject, description, time, date, questions } = {}) => {
  await Question.modify(id, { title, subject, description, time, date, questions })
  const modifiedQuestion = await Question.fetchOne(id)

  return modifiedQuestion
}

// CODE: Remove

const remove = async ({ id }) => {
  const removedQuestion = await Question.remove(id)

  return removedQuestion
}

/* -------------------------------- Utilities ------------------------------- */
// Nothing for now

export default { fetch, fetchOne, create, modify, remove }
