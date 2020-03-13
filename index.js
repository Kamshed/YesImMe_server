const { app } = require('./app')
const cors = require('cors')


/* -------------middleware-------------- */
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})