const axios = require('axios')

const ocr = (image) => {

  const axiosOCR = axios.create({
    method: 'post',
    baseURL: 'https://westus.api.cognitive.microsoft.com/vision/v2.0/ocr?',
    headers: {
      'content-type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': 'cddc485fef374aba8a22764e581f9e95'
    }
  })

  return axiosOCR({ data: image })
    .then(response => {
      const words = response.data.regions[0].lines.map(line => {
        return line.words.map(word=> {
          return word.text
        })
      })
      return [].concat.apply([], words) // condense multiple arrays to one array
    })

}


  module.exports = {
    ocr
  }