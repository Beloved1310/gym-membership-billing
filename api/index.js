const express = require('express')
require('dotenv').config()
const { PORT } = require('../config')

const app = express()

const membership = require('./routes/membership')
const checkMemberships = require('./cron/ membershipCron')

process.on('unhandledRejection', (err) => {
  console.log(err, 'Unhandled Rejection at Promise')
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  console.log(err, 'Uncaught Exception thrown')
  process.exit(1)
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1', membership)


app.listen(PORT, () => {
  console.log(`Web server is running ${PORT}`)
  checkMemberships()
})