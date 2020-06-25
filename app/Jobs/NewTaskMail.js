'use strict'

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewTaskMail-job'
  }

  // This is where the work is done.
  async handle ({ email, username }) {
    console.log('NewTaskMail-job started')
    console.log(`{ email: ${email}, username: ${username} }`)
    return true
  }
}

module.exports = NewTaskMail
