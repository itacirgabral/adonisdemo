'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const File = use('App/Models/File')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      if (request.file('file')) {
        const upload = request.file('file', { size: '2mb' })
        const filename = `${Date.now()}.${upload.subtype}`

        await upload.move(Helpers.tmpPath('uploads'), {
          name: filename
        })

        if (!upload.moved()) {
          throw upload.error()
        }

        const file = await File.create({
          file: filename,
          name: upload.clientName,
          type: upload.type,
          subtype: upload.subtype
        })

        return file
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({
          error: true,
          message: 'erro no upload'
        })
    }
  }

  async show ({ response, params }) {
    try {
      const { file } = await File.findOrFail(params.id)
      return response.download(Helpers.tmpPath(`uploads/${file}`))
    } catch (err) {
      return response
        .status(err.status)
        .send({
          error: true,
          message: 'arquivo não encontrado'
        })
    }
  }
}

module.exports = FileController
