const Dynamsoft = require('dynamsoft-node-barcode')
const { DYNAMSOFT_KEY } = require('./config')
Dynamsoft.BarcodeReader.productKeys = DYNAMSOFT_KEY


const pdf417Decode = async buffer => {
  console.log("============== create reader ==============");
  let reader = await Dynamsoft.BarcodeReader.createInstance();
  
  console.log("============== decode buffer ==============");
  
  const barcodeInfo = await reader.decode(buffer)

  if (barcodeInfo.length < 1 || barcodeInfo == undefined) {
    return
  }  
  
  let data;
  let identityInfo = {}
  barcodeInfo.map(_ => {
    if (_.barcodeFormatString === 'PDF417') { // find PDF417 barcode
      data = _.barcodeText                    // convert str to arr
        .replace(/\n/g, ',')
        .split(',')
        .slice(2)                             // drop unused vals
    }
  })
  data.map((_, i) => {
    
    switch (_.slice(0,3)) {
      case 'DAC':
        identityInfo.fName = data[i].slice(3)
        break
      case 'DCS':
        identityInfo.lName = data[i].slice(3)
        break
      case 'DAD':
        identityInfo.mInitial = data[i].slice(3)
        break
      case 'DBB':
        identityInfo.dob = data[i].slice(3)
        break
      case 'DAU':
        identityInfo.height = data[i].substr(3,3)
        break
      case 'DBC':
        console.log('gender:', data[i].slice(3))
        switch (data[i].slice(3)) {
          case '1': 
            identityInfo.gender = 'male'
            break
          case '2':
            identityInfo.gender = 'female'
            break
          case '9':
            identityInfo.gender = 'not specified'
            break
        }
        break
      case 'DAG':
        identityInfo.streetAddress = data[i].slice(3)
        break
      case 'DAI':
        identityInfo.city = data[i].slice(3)
        break
      case 'DAJ':
        identityInfo.state = data[i].slice(3)
        break
      case 'DAK':
        identityInfo.zipCode = data[i].substr(3,5)
        break
      case 'DCG':
        identityInfo.county = data[i].slice(3)
        break
      case 'DDB':
        identityInfo.lastModified = data[i].slice(3)
        break
      case 'DBA':
        identityInfo.expireDate = data[i].slice(3)
        break
    }
  })
  
  console.log("============== destroy reader ==============");
  reader.destroy();
  return identityInfo
    
}

module.exports = {
    pdf417Decode
}
