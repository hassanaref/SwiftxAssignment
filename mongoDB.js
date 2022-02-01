const mongoose = require('mongoose');
const userDB = require('./modules/userDB');
const joggingtimes = require('./modules/joggingTimesDB');
mongoose.connect('mongodb://localhost/swiftx');
mongoose.connection
    .once('open', () => console.log('good to go!'))
    .on('error', (error) => {
        console.warn('warning', error);
    });

const addUserToDB = async function addUser(nameDB,emailDB,passwordDB,idDB) {
    const user = new userDB({
        name:nameDB,
        email:emailDB,
        password:passwordDB,
        id:idDB
    })
    await user.save()
};

const addJoggingToDB = async function addTime(date, distance, time){
    const times = new joggingtimes({
        date:date,
        distance:distance,
        time:time
    })
    await times.save()
}

const getAlltimes = async function getAllTimes(){
    const times = joggingtimes.find()
    return times
}

const editTime = async function editTime(targetDate,date,distance,time){
    const targetTime = await joggingtimes.findOne({date:targetDate})
    targetTime.date=date
    targetTime.distance=distance
    targetTime.time=time
    targetTime.save()
    return targetTime
}

const getTime = async function getTime (date){
    const time = joggingtimes.findOne({date:date})
    return time
}

const deleteTime = async function deleteTime(date){
    const deletedTime = await joggingtimes.deleteOne({date:date})
    if(deletedTime.deletedCount>=1){
        return deletedTime.deletedCount
    } else {
        return 0
    }
}
module.exports = {addUserToDB, addJoggingToDB, getAlltimes,editTime,getTime,deleteTime};