const Repository = require('./repository')
const {
  addJoggingToDB,
  getAlltimes,
  editTime,
  getTime,
  deleteTime
} = require('../mongoDB')

class JoggingRepository extends Repository {
  async create (attrs) {
    addJoggingToDB(attrs.date, attrs.distance, attrs.time)
    const record = {
      date: attrs.date,
      distance: attrs.distance,
      time: attrs.time
    }
    return record
  }
  async getTimes () {
    const allTimes = getAlltimes()
    return allTimes
  }
  async editTime (targetDate, date, distance, time) {
    const updatedTime = await editTime(targetDate, date, distance, time)
    return updatedTime
  }
  async getOneTime (date) {
    const selectedDate = getTime(date)
    return selectedDate
  }
  async deleteTime (date) {
    const deleteStatus = deleteTime(date)
    return deleteStatus
  }
}
module.exports = new JoggingRepository('joggingTimes.json')
