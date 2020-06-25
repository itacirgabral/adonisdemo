'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use('App/Models/Task')

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  async index ({ request, response, params, view }) {
    const tasks = await Task
      .query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()

    return tasks
  }

  async store ({ request, response, params }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_data',
      'file_id'
    ])

    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async show ({ params, request, response, view }) {
    const task = await Task.findOrFail(params.id)
    return task
  }

  async update ({ params, request, response }) {
    const task = await Task.findOrFail(params.id)
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_data',
      'file_id'
    ])
    task.merge(data)
    await task.save()
    return task
  }

  async destroy ({ params, request, response }) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
  }
}

module.exports = TaskController
