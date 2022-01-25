const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

// Env Vars

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Creating a route
router.get('/', async (req, res) => {
  try{

    console.log(url.parse(req.url, true).query)

    // URL Search Params
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    })

    const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
  // passing in the actual weather information
  const data = apiRes.body

  // Logging the request to the public API
  if(process.env.NODE_ENV !== 'production'){
    console.log(`REQUEST: ${API_BASE_URL}?${params}`)
  }

  res.status(200).json(data)
  }
  catch(error){
    res.status(500).json({error})
  }
  
})



// to be able to export to other files
module.exports = router