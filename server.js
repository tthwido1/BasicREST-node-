
// load env vars
require('dotenv').config()

// imports
const express = require('express')
const mongoose = require('mongoose')

/* --------------------- express app --------------------- */
// express app
const app = express()

// express app config
const PORT = 5000
app.listen(PORT, () => {
	console.log(`### Server listening on port ${PORT} ###`)
})

// except request body as json
app.use(express.json())

// routes
const subscriberRoutes = require('./routes/subscribers')

// add routes to app middleware
app.use('/subscribers', subscriberRoutes)

/* ---------------------  mongodb connection --------------------- */
// mongoose db
// MONGO_DB_URL has name of database
mongoose.connect(
	process.env.MONGO_DB_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true }
)
const db = mongoose.connection

db.on('error', (err) => {
	console.log('### Error while connecting to mongo-db ###')
})
db.once('open', () => {
	console.log('### Successfully connected to mongo-db ###')
})

