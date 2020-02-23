const axios = require('axios')

const faceDetect = (image, faceIds) => {

  const axiosFaceDetect = axios.create({
    method: 'post',
    baseURL: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?',
    params: {
      returnFaceId: true,
      recognitionModel: 'recognition_02',
      detectionModel: 'detection_01'
    },
    headers: {
      'content-type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '952e99f636c047dab40bbc459f45e2a9'
    }
  })

  return axiosFaceDetect({ data: image })
    .then(response => {
      const info = response.data[0].faceId
      faceIds.push(info)
    })
    .then(() => {
      if (faceIds.length === 2) return faceIds
    })

}

const faceVerify = (faceIds) => {

  const [ faceId1, faceId2 ] = faceIds

  const axiosFaceVerify = axios.create({
    method: 'post',
    baseURL: 'https://westus.api.cognitive.microsoft.com/face/v1.0/verify?',
    headers: {
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': '952e99f636c047dab40bbc459f45e2a9'
    }
  })

  return axiosFaceVerify({
    data: { faceId1, faceId2 }
  })
  .then(response => {
    return response.data
  })
}

  module.exports = { faceDetect, faceVerify }