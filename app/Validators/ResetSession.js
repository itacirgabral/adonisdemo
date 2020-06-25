'use strict'

class ResetSession {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      toke: 'required',
      password: 'required|confirmed'
    }
  }
}

module.exports = ResetSession
