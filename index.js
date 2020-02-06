const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

/* const request = {
  image: {
    source: {imageUri: 'gs://cloud-samples-data/vision/using_curl/shanghai.jpeg'}
  }
}; */

exports.myFunction = (req, res) => {
  client
    .textDetection('https://assets.fireside.fm/file/fireside-images/podcasts/images/b/bc7f1faf-8aad-4135-bb12-83a8af679756/cover_small.jpg')
    .then(response => {
      
      res.status(200).send(response)
    })
    .catch(err => {
      console.error(err);
    })
  
}