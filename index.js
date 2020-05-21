const { app } = require('./app')
const { PORT, SENDGRID_API } = require('./config')


/* -------------middleware-------------- */
const bodyParser = require('body-parser')
app.use(bodyParser.json())



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})