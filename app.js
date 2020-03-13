const express = require('express')
const app = express()
const { faceDetect, faceVerify } = require('./faceApi')
const { pdf417Decode } = require('./dlDetect')


/* ------------for request-------------- */
const { multer } = require('./middleware')


let userInfo = {} // object that holds important response data

app.post('/upload', multer.any(), async (req, res, next) => {

  if (!req.files || !req.body.userId) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const { userId } = req.body
  userInfo.userId = userId

  const [ idFront, idBack, userImage ] = req.files
  let faceIds = []
  
  
  Promise.all([
    
      [idFront.buffer, userImage.buffer].map(image => {
      Promise.all([
        faceDetect(image, faceIds) // facial recognition
        .then(result => {
          if (result) {
            const p = Promise.resolve(faceVerify(result))
            p.then(response => {
              userInfo.faceVerification = response
            })
          }
        })
      ])
    }),
    userInfo.idText = await pdf417Decode(idBack.buffer), // PDF417 info extraction
    res.send(userInfo)
  ])
})

module.exports = {
  app
}