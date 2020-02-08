const textDetection = require('./textDetection')


/* 
  NOTE: if auth fails, may need to edit 
  rules for unauthenticated uploads 
  or auth the req 
*/


exports.myFunction = (req, res) => {

    textDetection(req, res)  // extract text from gov-issued id
    // next send info to a verification service
    // next face detect and verify

}