const { Post, sequalize } = require('../sequelize')

module.exports = {
  fetch(req, res, next) {
    Post.findAll()
      .then(posts => res.json(posts))
      .catch(next)
    // if there is an error just go on
  },
  create(req, res, next) {
    Post.create(req.body)
      .then(post => res.json(post))
      .catch(next)
  },
  delete(req, res, next) {
    const id = req.params.id
    Post.destroy({ where: { index: id } })
      .then(() => res.send('Done'))
      .catch(next)
  },
  update(req, res, next) {
    const id = req.params.id
    Post.update(req.body, { where: { index: id } })
      .then(() => res.send('Done'))
      .catch(next)
  }
}
