require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIESTORE = require('./movies-data-small.json')

console.log(process.env.API_TOKEN)

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
    debugger
   let queryResponse = MOVIESTORE;
   if(req.query.genre){
    queryResponse = queryResponse.filter((movie)=>{
        return movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    })
   }
   if(req.query.country){
    queryResponse = queryResponse.filter((movie)=>{
        return movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    })
   }
   if(req.query.avg_vote){
    queryResponse = queryResponse.filter((movie)=>{
        return Number(movie.avg_vote) >= Number(req.query.avg_vote)
    })
   }
   res.json(queryResponse) 
})

const PORT = 8000


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})
