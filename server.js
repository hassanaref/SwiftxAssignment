const express = require('express')
const userAuth = require('./routes/auth')
const expressSession = require('express-session')
const app = express()
app.use(express.json())

app.use(
  expressSession({
    secret: 'your secret',
    saveUninitialized: false,
    resave: false
  })
)
app.use(userAuth)
app.listen(3000,()=>{console.log('swiftx server started')})

app.get('/',(req,res)=>{
    res.send("it's working")
})
