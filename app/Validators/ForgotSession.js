'use strict'

class ForgotSession {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // redirect_url: 'required|url',
      email: 'required|email'
    }
  }
}

module.exports = ForgotSession
