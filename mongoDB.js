const mongoose = require('mongoose')
const userDB = require('./modules/userDB')
const joggingtimes = require('./modules/joggingTimesDB')
mongoose.connect('mongodb://localhost/swiftx')
mongoose.connection
  .once('open', () => console.log('good to go!'))
  .on('error', error => {
    console.warn('warning', error)
  })

const checkRole = async function checkRole (userId) {
  const user = userDB.findOne({ id: userId })
  return user
}

const addUserToDB = async function addUser (nameDB, emailDB, passwordDB, idDB) {
  const user = new userDB({
    name: nameDB,
    email: emailDB,
    password: passwordDB,
    id: idDB
  })
  await user.save()
}

const addJoggingToDB = async function addTime (date, distance, time, userId) {
  const times = new joggingtimes({
    date: date,
    distance: distance,
    time: time,
    userId: userId
  })
  await times.save()
}

const getAllUsers = async function getAllUsers () {
  const users = userDB.find()
  return users
}

const getUser = async function getUser (email) {
  const user = userDB.findOne({ email: email })
  return user
}

const editUser = async function editUser (targetEmail, email, name, password) {
  const targetUser = await userDB.findOne({ email: targetEmail })
  targetUser.email = email
  targetUser.name = name
  if (password != null) {
    targetUser.password = password
  }
  targetUser.save()
  return targetUser
}

const deleteUser = async function deleteUser (email) {
  const deletedTime = await userDB.deleteOne({ email: email })
  return deletedTime.deletedCount
}

const getAlltimes = async function getAllTimes (date) {
  if (date) {
    const times = joggingtimes.find({ date: date })
    return times
  } else {
    const times = joggingtimes.find()
    return times
  }
}

const editTime = async function editTime (targetDate, date, distance, time) {
  const targetTime = await joggingtimes.findOne({ date: targetDate })
  targetTime.date = date
  targetTime.distance = distance
  targetTime.time = time
  targetTime.save()
  return targetTime
}

const getTime = async function getTime (date) {
  const time = joggingtimes.findOne({ date: date })
  return time
}

const deleteTime = async function deleteTime (date) {
  const deletedTime = await joggingtimes.deleteOne({ date: date })
  return deletedTime.deletedCount
}
module.exports = {
  checkRole,
  addUserToDB,
  getAllUsers,
  getUser,
  editUser,
  deleteUser,
  addJoggingToDB,
  getAlltimes,
  editTime,
  getTime,
  deleteTime
}
