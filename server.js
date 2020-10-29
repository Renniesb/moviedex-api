require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIESTORE = require('/.movies-data-small.json')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())

app.use(function validateBearerToken(req, res, next){
    const authToken = req.get('Authorization')
    const apiToken = process.env.API_TOKEN
    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({error: 'Unauthorized Request'})
    }

    next()

})

app.get('/movie', (req, res)=>{
   if(req.query.genre){
    
   }
   if(req.query.country){
    
   }
   if(req.query.avg_note){
    
   } 
})
