const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const firebase = require('firebase')

const textDetect = proofOfId => {
  const request = {
    image: {
      source: { imageUri: proofOfId } // POST body > { "proofOfId": "/path/img" }
    }
  }
  

  client
    .textDetection(request)
    .then(response => {
      console.log('running:', response)
      return response
    })
    .catch(err => {
      return err
    })
}

/* exports.textDetection = (req, res) => { // extract text from gov-issued id
  console.log('in here')
    const request = {
      image: {
        source: { imageUri: req.body.proofOfId } // POST body > { "proofOfId": "/path/img" }
      }
    }
  
    client
      .textDetection(request)
      .then(response => {
        const file = {
          img: request.image.source.imageUri,
          name: req.body.userId // hash from user info
        }
        const storageRef = firebase.storage().ref(`users-proofOfId/${file.name}`) // Create storage ref
        const task = storageRef.put(file) // store in firebase
        const url = task.snapshot.ref.getDownloadURL() // get id url for face API
  
        res.status(200).send(response, url) // return id text and url for azure faceAPI detection
      })
      .catch(err => {
        console.error(err);
      })
    
  } */

  module.exports = {
    textDetect
  }