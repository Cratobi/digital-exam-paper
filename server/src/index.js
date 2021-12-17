import './db/mongoose'
import express from 'express'
import bodyparser from 'body-parser'
import { createServer } from 'http'
import cors from 'cors'

import { host, port } from './config'

// Routes
const app = express()
const server = createServer(app)

const corsOptions = {
  origin               : (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus : 200,
}

// Middlewares
app.use(cors(corsOptions))
app.use(bodyparser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${host}`)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accepcact')
  res.header('Access-Control-Allow-Methods', [ 'GET', 'POST', 'PATCH', 'DELETE' ])
  next()
})

const routes = []

routes.map(route => app.use(route))

// Server Config
server.listen(port, () => {
  console.clear()
  console.log(`> Time: ${new Date()}\n> Host: ${host}\n> Post: ${port} \n----------------------------------------`)
})
