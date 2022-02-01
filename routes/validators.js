const usersRepo = require('../repositories/users')
const userDB = require('../modules/userDB')

async function requireValidPasswordForUser (req, res, next) {
  const user = await userDB.findOne({ email: req.body.email })
  if (!user) {
    res.err = 'invalid email'
  } else {
    const validPassword = await usersRepo.comparePasswords(
      user.password,
      req.body.password
    )
    if (!validPassword) {
      res.err = 'invalid password'
    }
  }
  next()
}

async function requireEmail (req, res, next) {
  const existingUser = await userDB.findOne({ email: req.body.email })
  if (existingUser) {
    res.err = 'Email in use'
    console.log(res.err)
  }
  next()
}

async function requirePassword (req, res, next) {
  if (req.body.password.length < 8 || req.body.password.length > 20) {
    res.err = 'password Must be between 4 and 20 characters'
  }
  next()
}

async function requirePasswordConfirmation (req, res, next) {
  if (!res.err) {
    if (req.body.passwordConfirmation !== req.body.password) {
      res.err = 'Passwords must match'
    }
  }
  next()
}

module.exports = {
  requireValidPasswordForUser,
  requireEmail,
  requirePassword,
  requirePasswordConfirmation
}
