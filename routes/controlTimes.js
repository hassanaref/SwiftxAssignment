const express = require('express')
const timesRepo = require('../repositories/joggingTimes')
const router = express.Router()

router.post('/addtime', async (req, res) => {
  const { date, distance, time } = req.body
  const newTime = await timesRepo.create({ date, distance, time })
  res.json(newTime)
})

router.get('/gettimes', async (req, res) => {
  const alltimes = await timesRepo.getTimes()
  res.json(alltimes)
})

router.get('/getTime/:date', async (req, res) => {
  const requestedTime = await timesRepo.getOneTime(req.params.date)
  res.json(requestedTime)
})

router.patch('/update/:date', async (req, res) => {
  const targetdateParam = req.params.date
  let { date, distance, time } = req.body
  const targetDate = await timesRepo.getOneTime(req.params.date)
  if (targetDate == null) {
    res.send('date not found')
  } else {
    if (date == null) {
      date = targetDate.date
    }
    if (distance == null) {
      distance = targetDate.distance
    }
    if (time == null) {
      time = targetDate.time
    }
    const updatedTime = await timesRepo.editTime(
      targetdateParam,
      date,
      distance,
      time
    )
    res.json(updatedTime)
  }
})

router.delete('/deletetime/:date', async (req, res) => {
  let deleteStatus = await timesRepo.deleteTime(req.params.date)
  if (deleteStatus >= 1) {
    res.send(`${deleteStatus} time deleted`)
  } else {
    res.send('no times found in this date')
  }
})
module.exports = router
