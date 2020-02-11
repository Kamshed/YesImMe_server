const { textDetection } = require('./textDetect')


/* 
  NOTE: if auth fails, may need to edit 
  rules for unauthenticated uploads 
  or auth the req 
*/


exports.myFunction = (req, res) => {

    textDetection(req, res)  // extract text from gov-issued id
    .then((response, url) => {
      console.log(url)
    })
    // next send info to a verification service
    // next face detect and verify

}