import Router from 'express'
import Clt from '../controllers/user'

// Express > Router
const app = Router()

// Route
const url = 'api/user'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const {} = req.query

    const data = await Clt.fetch({})

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.get(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await Clt.fetchOne({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Verify

app.post(`/${url}/verify`, async (req, res, next) => {
  try {
    const { email, password } = req.body

    const data = await Clt.findByCredentials({
      email,
      password,
    })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Create

app.post(`/${url}`, async (req, res, next) => {
  try {
    const { name, email, gender, birthDate, bloodGroup, type, subject, institution, password } = req.body

    const data = await Clt.create({
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

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Modify

app.patch(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    const { name, email, gender, birthDate, bloodGroup, type, subject, institution, password } = req.body

    const data = await Clt.modify({
      id,
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

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Remove

app.delete(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await Clt.remove({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
