const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// Initialize express
const app = express()

// Rate Limiting the users requests to 5 requests within 10 minutes
// const limiter  = rateLimit({
//   windowMS: 10 * 60 * 10000, // 10 mins
//   max: 10,
// })
// app.use(limiter)
// app.set('trust proxy', 1) 

// Set static folder
app.use(express.static('public'))

// To use Routes - that's in weather.js
app.use('/api', require('./routes/weather'))

// Enable cors
app.use(cors()) 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app;
