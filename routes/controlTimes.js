const express = require('express')
const timesRepo = require('../repositories/joggingTimes')
const usersRepo = require('../repositories/users')
const router = express.Router()

router.post('/addtime', async (req, res) => {
  const userId = req.session.userId
  if (userId == null) {
    res.send('you must login first')
  } else {
    const { date, distance, time } = req.body
    const newTime = await timesRepo.create({ date, distance, time, userId })
    res.json(newTime)
  }
})

router.get('/gettimes', async (req, res) => {
  const sessionRole = await usersRepo.checkRole(req.session.userId)
  if (sessionRole == undefined) {
    res.send('must login first')
  } else if (sessionRole.role == 'users manager') {
    res.send('action not allowed')
  } else if (sessionRole.role == 'admin') {
    const alltimes = await timesRepo.getTimes()
    res.json(alltimes)
  } else {
    const alltimes = await timesRepo.getTimes()
    const filteredTimes = alltimes.filter(time => {
      return time.userId == req.session.userId
    })
    console.log(filteredTimes)
    res.send(filteredTimes)
  }
})

router.get('/getTime/:date', async (req, res) => {
  const sessionRole = await usersRepo.checkRole(req.session.userId)
  if (sessionRole == undefined) {
    res.send('must login first')
  } else if (sessionRole.role == 'users manager') {
    res.send('action not allowed')
  } else if (sessionRole.role == 'admin') {
    const requestedTime = await timesRepo.getTimes(req.params.date)
    res.json(requestedTime)
  } else {
    let requestedTime = await timesRepo.getOneTime(
      req.session.userId,
      req.params.date
    )
    if (requestedTime) {
      res.json(requestedTime)
    } else {
      res.send('no records for you in this date')
    }
  }
})

router.patch('/update/:date', async (req, res) => {
  const targetdateParam = req.params.date
  let { date, distance, time } = req.body
  const targetDate = await timesRepo.getOneTime(undefined, req.params.date)
  if (targetDate.length == 0) {
    res.send('date not found')
  } else {
    if (date == null) {
      date = targetDate[0].date
    }
    if (distance == null) {
      distance = targetDate[0].distance
    }
    if (time == null) {
      time = targetDate[0].time
    }
    const sessionRole = await usersRepo.checkRole(req.session.userId)
    if (sessionRole == undefined) {
      res.send('must login first')
    } else if (sessionRole.role == 'users manager') {
      res.send('action not allowed')
    } else if (sessionRole.role == 'admin') {
      const updatedTime = await timesRepo.editTime(
        targetdateParam,
        date,
        distance,
        time
      )
      res.json(updatedTime)
    }
  }
})

router.delete('/deletetime/:date', async (req, res) => {
  const sessionRole = await usersRepo.checkRole(req.session.userId)
  if (sessionRole == undefined) {
    res.send('must login first')
  } else if (sessionRole.role == 'users manager') {
    res.send('action not allowed')
  } else if (sessionRole.role == 'admin') {
    let deleteStatus = await timesRepo.deleteTime(req.params.date)
    if (deleteStatus >= 1) {
      res.send(`${deleteStatus} time deleted`)
    } else {
      res.send('no times found in this date')
    }
  }
})
module.exports = router
