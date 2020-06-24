'use strict'

const User = use('App/Models/User')

class UserController {
  store ({ request }) {
    return User.create(request.only(['username', 'email', 'password']))
  }
}

module.exports = UserController
