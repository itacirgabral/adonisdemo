'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project')

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  async index ({ request, response, view }) {
    const projetos = await Project.query().with('user').fetch()
    return projetos
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])
    const project = await Project.create({ ...data, user_id: auth.user.id })
    return project
  }

  async show ({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id)
      await project.load('user')
      await project.load('tasks')
      return project
    } catch (err) {
      return response
        .status(err.status)
        .send({
          error: true,
          message: 'projeto não encontrado'
        })
    }
  }

  async update ({ params, request, response, auth }) {
    try {
      const project = await Project.findOrFail(params.id)
      const data = request.only(['title', 'description', 'user_id'])
      project.merge(data)
      await project.save()
      return project
    } catch (err) {
      return response
        .status(err.status)
        .send({
          error: true,
          message: 'projeto não encontrado'
        })
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const project = await Project.findOrFail(params.id)
      await project.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({
          error: true,
          message: 'projeto não encontrado'
        })
    }
  }
}

module.exports = ProjectController
