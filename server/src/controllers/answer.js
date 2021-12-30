import Mongoose from 'mongoose'
import Answer from '../models/answer'

// CODE: Fetch

const fetch = async ({ answered_by = new Mongoose.Types.ObjectId() }) => {
  const answer = await Answer.fetch({ answered_by })
  return answer
}

const fetchOne = async ({ code }) => {
  // const answer = await Answer.fetchOne(id)
  const answer = await Answer.fetch({ code })

  return answer
}

//  CODE: Create

const create = async ({ answered_by, created_by, title, code, subject, description, time, date, questions } = {}) => {
  //  Generate Answer Code
  const newAnswer = await Answer.create({
    code,
    answered_by,
    created_by,
    title,
    subject,
    description,
    time,
    date,
    questions,
  })

  return newAnswer
}

// CODE: Modify

const modify = async ({ id, answered_by, title, subject, description, time, date, questions } = {}) => {
  await Answer.modify(id, { answered_by, title, subject, description, time, date, questions })
  const modifiedAnswer = await Answer.fetchOne(id)

  return modifiedAnswer
}

// CODE: Remove

const remove = async ({ id }) => {
  const removedAnswer = await Answer.remove(id)

  return removedAnswer
}

/* -------------------------------- Utilities ------------------------------- */
// Nothing for now

export default { fetch, fetchOne, create, modify, remove }
