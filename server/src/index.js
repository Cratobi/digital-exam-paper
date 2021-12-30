import './db/mongoose'
import express from 'express'
import bodyparser from 'body-parser'
import { createServer } from 'http'

import { host, port } from './config'

import user from './routes/user'
import question from './routes/question'
import answer from './routes/answer'

// Routes
const app = express()
const server = createServer(app)

app.use(bodyparser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${host}`)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accepcact')
  res.header('Access-Control-Allow-Methods', [ 'GET', 'POST', 'PATCH', 'DELETE' ])
  next()
})

const routes = [ user, question, answer ]

routes.map(route => app.use(route))

// Server Config
server.listen(port, () => {
  console.clear()
  console.log(`> Time: ${new Date()}\n> Host: ${host}\n> Post: ${port} \n----------------------------------------`)
})
