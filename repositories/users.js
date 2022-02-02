const crypto = require('crypto')
const util = require('util')
const {
  checkRole,
  addUserToDB,
  getAllUsers,
  getUser,
  editUser,
  deleteUser
} = require('../mongoDB')

const scrypt = util.promisify(crypto.scrypt)
let passwordDB
let idDB
let emailDB
let nameDB
class UsersRepository {
  async comparePasswords (saved, supplied) {
    // Saved -> password saved in our database. 'hashed.salt'
    // Supplied -> password given to us by a user trying sign in
    const [hashed, salt] = saved.split('.')
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64)

    return hashed === hashedSuppliedBuf.toString('hex')
  }
  randomId () {
    return crypto.randomBytes(4).toString('hex')
  }

  async checkRole (userId) {
    const role = await checkRole(userId)
    if (role) {
      return role
    } else {
      undefined
    }
  }
  async create (attrs) {
    attrs.id = this.randomId()
    const salt = crypto.randomBytes(8).toString('hex')
    const buf = await scrypt(attrs.password, salt, 64)
    nameDB = attrs.name
    emailDB = attrs.email
    idDB = attrs.id
    passwordDB = `${buf.toString('hex')}.${salt}`
    addUserToDB(nameDB, emailDB, passwordDB, idDB)
    const record = {
      name: nameDB,
      email: emailDB,
      id: idDB,
      password: passwordDB
    }
    return record
  }

  async getAll () {
    const users = await getAllUsers()
    return users
  }

  async getOneUser (email) {
    const user = await getUser(email)
    return user
  }

  async editUser (targetEmail, name, email, password) {
    const salt = crypto.randomBytes(8).toString('hex')
    const buf = await scrypt(password[1], salt, 64)
    const cryptedpassword = `${buf.toString('hex')}.${salt}`
    if (password[0]) {
      const updatedUser = await editUser(targetEmail, name, email)
      return updatedUser
    } else {
      const updatedUser = await editUser(
        targetEmail,
        name,
        email,
        cryptedpassword
      )
      return updatedUser
    }
  }

  async deleteUser (email) {
    const deleteStatus = await deleteUser(email)
    return deleteStatus
  }
}
module.exports = new UsersRepository()
