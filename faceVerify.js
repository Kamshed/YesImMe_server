const axios = require('axios')

// forEach loop of image urls

axios({
    method: 'post',
    url: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?',
    params: {
        returnFaceId: true,
        recognitionModel: 'recognition_02',
        detectionModel: 'detection_01'
    },
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '952e99f636c047dab40bbc459f45e2a9'
    },
    data: { // snapshot value for images
        url: 'https://images.pexels.com/photos/3317434/pexels-photo-3317434.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' 
    }
})
  .then(response => {
    console.log(response.data[0].faceId)
  })
  .catch(error => {
    console.log(error);
  })