const express = require('express')
const usersRepo = require('../repositories/users')

const router = express.Router()

router.get('/getusers', async (req, res) => {
  const sessionRole = await usersRepo.checkRole(req.session.userId)
  if (sessionRole == undefined) {
    res.send('must login first')
  } else if (sessionRole.role == 'user') {
    res.send('action not allowed')
  } else {
    const allusers = await usersRepo.getAll()
    res.json(allusers)
  }
})

router.get('/getuser/:email', async (req, res) => {
  const sessionRole = await usersRepo.checkRole(req.session.userId)
  if (sessionRole == undefined) {
    res.send('must login first')
  } else if (sessionRole.role == 'user') {
    res.send('action not allowed')
  } else {
    const user = await usersRepo.getOneUser(req.params.email)
    res.json(user)
  }
})

router.patch('/updateuser/:email', async (req, res) => {
  const sessionRole = await usersRepo.checkRole(req.session.userId)
  if (sessionRole == undefined) {
    res.send('must login first')
  } else if (sessionRole.role == 'user') {
    res.send('action not allowed')
  } else {
    const targetedUserParam = req.params.email
    let { name, email, password } = req.body
    const targetedUser = await usersRepo.getOneUser(req.params.email)
    if (targetedUser == null) {
      res.send('user not found')
    } else {
      if (name == null) {
        name = targetedUser.name
      }
      if (email == null) {
        email = targetedUser.email
      }
      if (password == null) {
        password = targetedUser.password
      }
      const passwordcrypted = password.includes('.')
      const updatedUser = await usersRepo.editUser(
        targetedUserParam,
        email,
        name,
        [passwordcrypted, password]
      )
      res.json(updatedUser)
    }
  }
})

router.delete('/deleteuser/:email', async (req, res) => {
  const sessionRole = await usersRepo.checkRole(req.session.userId)
  if (sessionRole == undefined) {
    res.send('must login first')
  } else if (sessionRole.role == 'user') {
    res.send('action not allowed')
  } else {
    const deleteStatus = await usersRepo.deleteUser(req.params.email)
    if (deleteStatus >= 1) {
      res.send('user deleted')
    } else {
      res.send('no user found by this email')
    }
  }
})
module.exports = router
