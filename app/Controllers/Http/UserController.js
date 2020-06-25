'use strict'

const User = use('App/Models/User')
/*
const Database = use('Database')

const trx = Database.beginTransaction()
const user = User.create({}, trx)
user.addresses().createMany([], trx)

await trx.commit()

*/
class UserController {
  store ({ request }) {
    return User.create(request.only(['username', 'email', 'password']))
    // user.addresses().createMany()
  }
}

module.exports = UserController
