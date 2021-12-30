import Router from 'express'
import Clt from '../controllers/question'

// Express > Router
const app = Router()

// Route
const url = 'api/question'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { created_by } = req.query

    const data = await Clt.fetch({ created_by })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.get(`/${url}/:code`, async (req, res, next) => {
  try {
    const { code } = req.params

    const data = await Clt.fetchOne({ code })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Create

app.post(`/${url}`, async (req, res, next) => {
  try {
    const { code, created_by, title, subject, description, time, date, questions } = req.body

    const data = await Clt.create({ code, created_by, title, subject, description, time, date, questions })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Modify

app.patch(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    const { code, created_by, title, subject, description, time, date, questions } = req.body

    const data = await Clt.modify({ id, code, created_by, title, subject, description, time, date, questions })

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
