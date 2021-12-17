import Router from 'express'
import Validators from './validators/user'
import Clt from '../controllers/user'

// Express > Router
const app = Router()

// Route
const url = 'api/user'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const {} = req.query

    await Validators.fetch({})

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

// CODE: Create

app.post(`/${url}`, async (req, res, next) => {
  try {
    const { name, username, password, type } = req.body

    await Validators.create({ name, username, password, type })

    const data = await Clt.create({ name, username, password, type })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Modify

app.patch(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    const { name, username, password, type } = req.body

    await Validators.modify({ id, name, username, password, type })

    const data = await Clt.modify({ id, name, username, password, type })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Remove

app.delete(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    await Validators.remove({ id })

    const data = await Clt.remove({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
