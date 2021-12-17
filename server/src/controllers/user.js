import User from '../models/user'

// CODE: Fetch

const fetch = async ({} = {}) => {
  const user = await User.fetch()

  return user
}

const fetchOne = async ({ id }) => {
  const user = await User.fetchOne(id)

  return user
}

//  CODE: Create

const create = async ({ name, username, password, type } = {}) => {
  //  Generate User Code
  const newUser = await User.create({ name, username, password, type })

  return newUser
}

// CODE: Modify

const modify = async ({ id, name, username, password, type } = {}) => {
  await User.modify(id, { name, username, password, type })
  const modifiedUser = await User.fetchOne(id)

  return modifiedUser
}

// CODE: Remove

const remove = async ({ id }) => {
  const removedUser = await User.remove(id)

  return removedUser
}

/* -------------------------------- Utilities ------------------------------- */
// Nothing for now

export default { fetch, fetchOne, create, modify, remove }
