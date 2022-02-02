const express = require('express')
const userAuth = require('./routes/auth')
const users = require('./routes/controlUsers')
const joggingTimes = require('./routes/controlTimes')
const expressSession = require('express-session')
const app = express()
app.use(express.json())

app.use(
  expressSession({
    secret: 'your secret',
    saveUninitialized: true,
    resave: true
  })
)
app.use(userAuth)
app.use(users)
app.use(joggingTimes)
app.listen(3000, () => {
  console.log('swiftx server started')
})

app.get('/', (req, res) => {
  res.send("it's working")
})
