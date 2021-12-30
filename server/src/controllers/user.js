import User from '../models/user'

// CODE: Fetch

const fetch = async () => {
  const user = await User.fetch()

  return user
}

const fetchOne = async ({ id }) => {
  const user = await User.fetchOne(id)

  return user
}

const findByCredentials = async ({ email, password } = {}) => {
  try {
    const user = await User.findByCredentials({
      email,
      password,
    })

    return user
  } catch (err) {
    return 'User or password is wrong'
  }
}

//  CODE: Create

const create = async ({ name, email, gender, birthDate, bloodGroup, type, subject, institution, password } = {}) => {
  //  Generate User Code
  const newUser = await User.create({
    name,
    email,
    gender,
    birthDate,
    bloodGroup,
    type,
    subject,
    institution,
    password,
  })

  return newUser
}

// CODE: Modify

const modify = async (
  { id, name, email, gender, birthDate, bloodGroup, type, subject, institution, password } = {}
) => {
  await User.modify(id, { name, email, gender, birthDate, bloodGroup, type, subject, institution, password })
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

export default { fetch, fetchOne, findByCredentials, create, modify, remove }
