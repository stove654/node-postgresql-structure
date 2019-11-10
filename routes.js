/**
 * Main application routes
 */


module.exports = function (app) {
  app.use('/api/auth', require('./auth'))
  app.use('/api/users', require('./api/user'))

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(200).json({
      message: 'Ahaslide hello!!!',
    })
  })

  app.route('/*').get((req, res) => {
    res.status(200).json({
      message: 'stove hello!!!',
    })
  })
}
