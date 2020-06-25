'use strict'

const Antl = use('Antl')

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

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgotSession
