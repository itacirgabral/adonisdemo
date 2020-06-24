'use strict'

class SessionController {
  store ({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password'])
    return auth.attempt(email, password)
  }
}

module.exports = SessionController
