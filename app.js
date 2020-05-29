const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const { faceDetect, faceVerify } = require('./faceApi')
const { pdf417Decode } = require('./dlDetect')
const { send } = require('./sendMail')


app.use(cors())

/* ------------for request-------------- */
const { multer } = require('./middleware')


let userInfo = {} // object that holds important response data

app.post('/api/upload', multer.any(), async (req, res, next) => {

  if (!req.files || !req.body.userId) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const { userId } = req.body
  userInfo.userId = userId

  const [ idFront, idBack, userImage ] = req.files
  let faceIds = []
  const faceImages = [
    "idFront",
    "userImage"
  ]
  let errorStatus = []
  
  Promise.all([
    
      [idFront.buffer, userImage.buffer].map((image, i) => {
      Promise.all([
        faceDetect(image, faceIds, i) // facial recognition
        .then(result => {
          if (result.length > 0) {
            console.log("result?:", result)
            const p = Promise.resolve(faceVerify(result))
            p.then(response => {
              userInfo.faceVerification = response
            })
          }
          else { 
            const image = faceImages[i]
            status = "No face detected"
            switch (errorStatus.length) {
              case 0: errorStatus[0] = {[image]: status}
                break;
              case 1: errorStatus[1] = {[image]: status}
                break
            }
            userInfo.errors = errorStatus
          }
        })
      ])
    }),
    userInfo.idText = await pdf417Decode(idBack.buffer), // PDF417 info extraction
    (() => {
      if (!userInfo.idText) {
        const status = "No barcode detected"
        switch (errorStatus.length) {
          case 0: errorStatus[0] = {"idBack": status}
            break;
          case 1: errorStatus[1] = {"idBack": status}
            break
          case 2: errorStatus[2] = {"idBack": status}
            break
        }
        userInfo.errors = errorStatus
        return res.send(userInfo)
      }
      return res.send(userInfo)
    })()
  ])
})



app.post("/api/send", bodyParser.urlencoded({ extended: true }), (req, res) => { // Contact Form
  const result = Promise.resolve(send(req.body))
  result.then(result => {
    return res.send(result)
  })
})



module.exports = {
  app
}