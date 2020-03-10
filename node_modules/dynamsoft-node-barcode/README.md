# Dynamsoft JavaScript Barcode SDK for Node

>  This library is the Node.js edition of Dynamsoft Barcode Reader. If you are looking to implement barcode reading feature in a web page, please check out the other library [Dynamsoft JavaScript Barcode SDK for Web](https://github.com/dynamsoft-dbr/javascript-barcode/).

Both 1D and 2D barcode symbiology are supported including the popular `Code 39`, `EAN-13`, `QR`, `PDF417`, etc.+  Find the full list [here](https://www.dynamsoft.com/Products/Dynamic-Barcode-Reader.aspx).

The library is based on `webassembly` which has been an official feature of Node.js since `LTS 8`. If you are using Node.js LTS 8 and have no plan to upgrade it, check out [how to use the library in Node.js LTS 8](#how-to-use-the-library-in-nodejs-lts-8). That said, Node.js version >= LTS 12 is recommended because the library will try to use `worker_threads` when decoding. 

## Get Started

* Check your Node.js version

```shell
> node -v
v12.13.1
```

* Installs the library from npm

```shell
> npm install dynamsoft-node-barcode --save
```
* Create a `js` file and include the library

```js
let Dynamsoft = require("dynamsoft-node-barcode");
```

The following also works
```js
let Dynamsoft = require("path/to/dist/dbr.js");
```

> **Note**
> The library uses `Promise` a lot, so it's recommended to write the related code in a `async` function so that later you can use `await`
>
> ```js
> (async()=>{
> // many work will done here
> })();
> ```

* Create an instance of the reader

```js
let reader = await Dynamsoft.BarcodeReader.createInstance();
```

* Decode a file by its path

```js
let results = await reader.decode('path/to/sample.png');
```

Or just decode a file by its URL

```js
let results = await reader.decode('https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png');
```
> **NOTE**  
> The following image formats are supported by default: `png`, `jpg`, `bmp`, `gif`. 
>
> If you want to decode other files like `pdf`'s, you need to convert them to images first. Contact [Dynamsoft Support](https://www.dynamsoft.com/Company/Contact.aspx) to find out more.
>
> If you want to decode raw image data (`RGBA`) from sources like a camera. You can use the API `deocdeBuffer`. Check out [C++ API decodeBuffer](https://www.dynamsoft.com/help/Barcode-Reader/class_c_barcode_reader.html) for more details.

* Print out the results

```js
for(let result of results){
    console.log(result.barcodeText);
}
```

* Run your code.

```shell
> node your-code.js
```

Last not but least, don't forget to set a `productKey`! If you don't have a key yet, click [here](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx) to get one.

```js
Dynamsoft.BarcodeReader.productKeys = 'PRODUCT-KEYS';
```

**Full code**

```js
let Dynamsoft = require('dynamsoft-node-barcode');
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
Dynamsoft.BarcodeReader.productKeys = 'PRODUCT-KEYS';

(async()=>{
    let reader = await Dynamsoft.BarcodeReader.createInstance();
    for(let result of await reader.decode('https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png')){
        console.log(result.barcodeText);
    }
    reader.destroy();
    process.exit();
})();

```

## Change Decoding Settings

To set up the library for decoding, use the APIs `getRuntimeSettings` & `updateRuntimeSettings`.

```js
let settings = await reader.getRuntimeSettings();
settings.expectedBarcodesCount = 999;
await reader.updateRuntimeSettings();
```

See [Barcode reading settings Guide](https://www.dynamsoft.com/help/Barcode-Reader/devguide/Guide/BarcodeReadingSettings.html#Struct) for basic usage.

See [C++ API RuntimeSettings](https://www.dynamsoft.com/help/Barcode-Reader/structtag_public_runtime_settings.html) for more details.

To find out which settings best suit your usage scenario, visit [DBR Main Online Demo](https://demo.dynamsoft.com/dbr/barcodereaderdemo.aspx).

Any questions, please contact [Dynamsoft support](https://www.dynamsoft.com/Company/Contact.aspx).



## How to use the library in Node.js LTS 8

Node.js LTS 8 doesn't support `worker_threads`, so the decoding will happen in the same main thread which means it's a blocking operation. The following code snippets demonstrate the basic usage.

**Decode**

```js
var dbr = require('path/to/dist/dbr-<version>.node.wasm.js');
dbr.onRuntimeInitialized = ()=>{
    dbr.BarcodeReaderWasm.init('{"productKeys":"PRODUCT-KEYS"}');
    var reader = new dbr.BarcodeReaderWasm(false,-1);
    var fs = require('fs');
    var img = fs.readFileSync('./sample.png');
    var resultsInfo = JSON.parse(reader.decodeFileInMemory(new Uint8Array(img)));
    console.log(resultsInfo);
};
```

**Change settings**

```js
var settings = JSON.parse(reader.getRuntimeSettings());
settings.expectedBarcodesCount = 999;
reader.updateRuntimeSettings(JSON.stringify(settings));
```





