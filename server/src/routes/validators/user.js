import Validator from 'validator'

import User from '../../models/user'

// CODE: Fetch

const fetch = async ({}) => {}

const fetchOne = async ({ id }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Create

const create = async ({ name, username, password, type }) => {
  if (!Validator.isAlphanumeric(username)) throw 'Only letters and numbers are allowed for username'
  if (!Validator.isByteLength(password, { min: 8, max: undefined })) throw 'Password must be more than 8 letters'

  if (type !== 'teacher' && type !== 'student' && type !== 'admin')
    throw 'Account type must be teacher, student or admin'
}

// CODE: Modify

const modify = async ({ id, name, username, password, type }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (!Validator.isAlphanumeric(username)) throw 'Only letters and numbers are allowed for username'
  if (!Validator.isByteLength(password, { min: 8, max: undefined })) throw 'Password must be more than 8 letters'

  if (type !== 'teacher' && type !== 'student' && type !== 'admin')
    throw 'Account type must be teacher, student or admin'
}

// CODE: Remove

const remove = async ({ id }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'

  const user = await User.fetchOne(id)

  if (!user) throw 'User does not exist'
}

export default { fetch, fetchOne, create, modify, remove }
