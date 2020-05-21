const axios = require('axios')
const { ACS_FACE_KEY, ACS_FACE_URL } = require('./config')

const faceDetect = (image, faceIds) => {

  const axiosFaceDetect = axios.create({
    method: 'post',
    baseURL: `${ACS_FACE_URL}/detect?`,
    params: {
      returnFaceId: true,
      recognitionModel: 'recognition_02',
      detectionModel: 'detection_01'
    },
    headers: {
      'content-type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': ACS_FACE_KEY
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
    baseURL: `${ACS_FACE_URL}/verify?`,
    headers: {
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': ACS_FACE_KEY
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