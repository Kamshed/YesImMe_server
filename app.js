const express = require('express')
const app = express()
const { faceDetect, faceVerify } = require('./faceApi')
const { ocr } = require('./textDetect')



/* ------------for firebase Auth-------------- */
const admin = require("firebase-admin");
const serviceAccount = require("./testkamshed-firebase-adminsdk-qbo7n-87c14b367b.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testkamshed.firebaseio.com"
});




/* ------------for request-------------- */
const { multer } = require('./middleware')




let userInfo = {} // object that holds important response data

const Dynamsoft = require('dynamsoft-node-barcode')
Dynamsoft.BarcodeReader.productKeys = 't0068MgAAACdpEm7LWt4nFOtJAWGi5VkqZQ8iBn0j9tP6RTXKh3NqBb2m7Vkt3ATDjtLhHo+vJA+N4RllCKb2oxFSdxLvTwM='


app.post('/pdf417', multer.any(), async (req, res) => {

  let dlInfo = []
  
  console.log("============== create reader ==============");
  let reader = await Dynamsoft.BarcodeReader.createInstance();
  const [ barcode ] = await req.files
  console.log("============== decode buffer ==============");

  const barcodeInfo = await reader.decode(barcode.buffer)
  let data;
  let identityInfo = {}
  barcodeInfo.map(_ => {
    if (_.barcodeFormatString === 'PDF417') { // find PDF417 barcode
      data = _.barcodeText                    // convert str to arr
        .replace(/\n/g, ',')
        .split(',')
        .slice(2)                             // drop unused vals
    }
  })
  data.map((_, i) => {
    
    switch (_.slice(0,3)) {
      case 'DAC':
        identityInfo.fName = data[i].slice(3)
        break
      case 'DCS':
        identityInfo.lName = data[i].slice(3)
        break
      case 'DAD':
        identityInfo.mInitial = data[i].slice(3)
        break
      case 'DBB':
        identityInfo.dob = data[i].slice(3)
        break
      case 'DAU':
        identityInfo.height = data[i].substr(3,3)
        break
      case 'DBC':
        console.log('gender:', data[i].slice(3))
        switch (data[i].slice(3)) {
          case '1': 
            identityInfo.gender = 'male'
            break
          case '2':
            identityInfo.gender = 'female'
            break
          case '9':
            identityInfo.gender = 'not specified'
            break
        }
        break
      case 'DAG':
        identityInfo.streetAddress = data[i].slice(3)
        break
      case 'DAI':
        identityInfo.city = data[i].slice(3)
        break
      case 'DAJ':
        identityInfo.state = data[i].slice(3)
        break
      case 'DAK':
        identityInfo.zipCode = data[i].substr(3,5)
        break
      case 'DCG':
        identityInfo.county = data[i].slice(3)
        break
      case 'DDB':
        identityInfo.lastModified = data[i].slice(3)
        break
      case 'DBA':
        identityInfo.expireDate = data[i].slice(3)
        break
    }
  })
  res.send(identityInfo)
 
  console.log("============== destroy reader ==============");
  reader.destroy();
  process.exit();

})


/* ------------request start-------------- */
app.post('/upload', multer.any(), async (req, res, next) => {

  if (!req.files || !req.body.userId) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const { userId } = req.body
  userInfo.userId = userId

  const [ idImage, userImage ] = req.files
  const unverifiedImages = [idImage.buffer, userImage.buffer]

  let faceIds = []
  
  const test = Promise.all([
      unverifiedImages.map(image => {
      Promise.all([
        faceDetect(image, faceIds)
        .then(result => {
          if (result) {
            const p = Promise.resolve(faceVerify(result))
            p.then(response => {
              userInfo.faceVerification = response
              res.send(userInfo)
            })
          }
        })
      ])
    }),
    userInfo.idText = await ocr(idImage.buffer)
  ])
  //test.then(() => res.send(userInfo))
}, () => {
  console.log(userInfo)
  return userInfo
})

module.exports = {
  app
}