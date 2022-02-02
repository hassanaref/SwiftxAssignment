const express = require('express')
const usersRepo = require('../repositories/users')
const userDB = require('../modules/userDB')

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireValidPasswordForUser
} = require('./validators')
const router = express.Router()

router.get('/signup', (req, res) => {
  res.send('signup page')
})

router.post(
  '/signup',
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  async (req, res) => {
    const { name, email, password } = req.body
    if (res.err) {
      res.send(res.err)
    } else {
      const user = await usersRepo.create({ name, email, password })
      req.session.userId = user.id
      res.json(user)
    }
  }
)

router.get('/signout', async (req, res) => {
  console.log(req.session.userId)
  req.session.destroy()
  console.log(req.session)
  res.send('You are logged out')
})

router.get('/signin', (req, res) => {
  res.send('login page')
})

router.post('/signin', requireValidPasswordForUser, async (req, res) => {
  const { email } = req.body
  const user = await userDB.findOne({ email: email })
  if (res.err) {
    res.send(res.err)
  } else {
    console.log(user)
    req.session.userId = user.id
    console.log(req.session.userId)
    res.send('logged in')
  }
})

module.exports = router
