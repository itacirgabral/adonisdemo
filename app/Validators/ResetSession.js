'use strict'

const Antl = use('Antl')

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

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetSession
