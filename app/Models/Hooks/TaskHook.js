'use strict'

const TaskHook = exports = module.exports = {}

// const Kue = use('Kue')
// const Job = use('App/jobs/NewTaskMail')

TaskHook.sendNewTaskMail = async (taskInstance) => {
  if (taskInstance.dirty.user_id || taskInstance.user_id) {
    const { email, username } = await taskInstance.user().fetch()

    console.log(`{ email: ${email}, username: ${username} }`)
    // Kue.dispatch(Job.key, { email, username })
  }
}
