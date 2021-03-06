'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => ({ greeting: 'Hello world in JSON' }))

Route.post('users', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('forgotpassword', 'ForgotPasswordController.store').validator('ForgotSession')
Route.put('forgotpassword', 'ForgotPasswordController.update').validator('ResetSession')

Route.post('forgotpassword', 'ForgotPasswordController.store')

Route.group(() => {
  Route.get('files/:id', 'FileController.show')
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController').apiOnly().validator(new Map([[['projects.store'], ['Project']]]))
  Route.resource('projects.tasks', 'TaskController').apiOnly().validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])
