const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000
var cors = require('cors')
// const path=require('path')
// const crypto=require('crypto')
// var timeout = require('connect-timeout')

const {MONGOURI} = require('./config/keys')
app.set('view engine','ejs')

app.use(haltOnTimedout)


// app.use(methodOverride('_method'))




const conn = mongoose.createConnection(MONGOURI)
// Connection to MONGODB Atlas
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})

// For successful connection
mongoose.connection.on('connected', () => {
    console.log("Mongo connected")
})
mongoose.connect(MONGOURI)

// Connection Error
mongoose.connection.on('error', (err) => {
    console.log("Mongo error", err)
})



require('./models/user')
require('./models/post')


// To convert input into JSON format
app.use(express.json())
app.use(cors())


// Route for authentication
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))



if(process.env.NODE_ENV === "production"){
  app.use(express.static('virtubate/build'))
  const path = require('path')
  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, 'virtubate', 'build', 'index.html'))
  })
}

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}


// Connecting to server
app.listen(PORT, () => {
    console.log("Server connected")
})




