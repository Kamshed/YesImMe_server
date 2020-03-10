let Dynamsoft = require('dynamsoft-node-barcode');
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
Dynamsoft.BarcodeReader.productKeys = 't0068MgAAACdpEm7LWt4nFOtJAWGi5VkqZQ8iBn0j9tP6RTXKh3NqBb2m7Vkt3ATDjtLhHo+vJA+N4RllCKb2oxFSdxLvTwM=';


const dlDecode = async buffer => {
    console.log("============== create reader ==============");

    let reader = await Dynamsoft.BarcodeReader.createInstance();

    console.log("============== decode buffer ==============");

    //let fs = require('fs');
    //let buffer = fs.readFileSync(__dirname + '/joshId.jpg');
    for(let result of await reader.decode(buffer)){
        /* 
            info we want:  maybe(?)
            - fName
            - lName
            - mInitial
            - DOB
            - DL#
            - Street Address (?)
            - City (?)
            - State (?)
            - Postal [zip] code (?)
            - Gender (?)
        */
        console.log(result.barcodeText);
    }
    // cross-ref data with publicData.com
    console.log("============== destroy reader ==============");
    
    reader.destroy();
    process.exit();
}

module.exports = {
    dlDecode
}
