const mongoose = require('mongoose');
const userDB = require('./modules/userDB');
mongoose.connect('mongodb://localhost/swiftx');
mongoose.connection
    .once('open', () => console.log('good to go!'))
    .on('error', (error) => {
        console.warn('warning', error);
    });

const addToDB = async function addUser(nameDB,emailDB,passwordDB,idDB) {
    const user = new userDB({
        name:nameDB,
        email:emailDB,
        password:passwordDB,
        id:idDB
    })
    await user.save()
};

const getUserId = async function getId() {
    
};
module.exports = addToDB;