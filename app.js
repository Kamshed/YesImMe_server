const express = require('express')
const app = express()

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




/* ------------request start-------------- */
app.post('/upload', multer.any(), (req, res, next) => { 

  if (!req.files || !req.body.userId) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const { userId } = req.body
  const [ idImage, userImage ] = req.files

  const  db = admin.database();
  const  ref = db.ref("userInfo");

  const usersRef = ref.child("userId");
  usersRef.update({
    [userId]: {
      idImage: Buffer.from(idImage.buffer).toString('base64'),
      userImage: Buffer.from(userImage.buffer).toString('base64')
    }
  })
  

  usersRef.on('value', snapshot => {
    // kick off the verification process
    
  })
})

module.exports = {
  app
}