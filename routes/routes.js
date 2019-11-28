const controller = require('../Controller/controller')

module.exports = app => {
  app.get('/post', controller.fetch)
  app.post('/post', controller.create)
  app.delete('/post/:id', controller.delete)
  app.patch('/post/:id', controller.update)
}
