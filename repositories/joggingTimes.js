const {
  addJoggingToDB,
  getAlltimes,
  editTime,
  getTime,
  deleteTime
} = require('../mongoDB')

class JoggingRepository {
  async create (attrs) {
    addJoggingToDB(attrs.date, attrs.distance, attrs.time, attrs.userId)
    const record = {
      date: attrs.date,
      distance: attrs.distance,
      time: attrs.time,
      userId: attrs.userId
    }
    return record
  }
  async getTimes (date) {
    if (date) {
      const allTimes = getAlltimes(date)
      return allTimes
    } else {
      const allTimes = getAlltimes()
      return allTimes
    }
  }
  async editTime (targetDate, date, distance, time) {
    const updatedTime = await editTime(targetDate, date, distance, time)
    return updatedTime
  }
  async getOneTime (userId, date) {
    if (userId) {
      const selectedDate = await getAlltimes(date)
      const userSpecDate = selectedDate.filter(date => {
        return date.userId == userId
      })
      return userSpecDate
    } else {
      const selectedDate = await getAlltimes(date)
      return selectedDate
    }
  }

  async deleteTime (date) {
    const deleteStatus = deleteTime(date)
    return deleteStatus
  }
}
module.exports = new JoggingRepository()
