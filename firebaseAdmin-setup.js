const admin = require("firebase-admin")
const serviceAccount = require("./testkamshed-firebase-adminsdk-qbo7n-87c14b367b.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

module.exports = { db }