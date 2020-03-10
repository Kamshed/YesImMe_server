const Dynamsoft = require("dynamsoft-node-barcode")
Dynamsoft.BarcodeReader.productKeys = 't0068MgAAAAHm/BLxlpvtBS6s6pr9dWqDugGIHret74wFrw+eZ7Z3JWD+Azscfy4pAxlKuHpdJ782DRVNgJYMASf9IWD3gK8='

(async()=>{
    console.log("============== create reader ==============");
    let reader = await Dynamsoft.BarcodeReader.createInstance();
    console.log("============== decode buffer ==============");
    /* This is where I need to include the buffer from app.js */
    for(let result of await reader.decode(/* buffer here */)){
        console.log(result.barcodeText);
    }
    console.log("============== decode base64 ==============");
    let strBase64 = buffer.toString('base64');
    for(let result of await reader.decodeBase64String(strBase64)){
        console.log(result.barcodeText);
    }
    console.log("============== decode file ==============");
    for(let result of await reader.decode(__dirname + '/../sample.png')){
        console.log(result.barcodeText);
    }
    console.log("============== decode url ==============");
    for(let result of await reader.decode('https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png')){
        console.log(result.barcodeText);
    }
    console.log("============== destroy reader ==============");
    reader.destroy();
    process.exit();
})()