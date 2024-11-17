class encryptBarcode {
    constructor(secretKey) {
      this.secretKey = secretKey;
    }
  
    encryptedData(plaintext) {
      return CryptoJS.AES.encrypt(plaintext, this.secretKey).toString();
    }
  
    decryptData(encryptedData) {
      const dataEncrypted = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      return dataEncrypted.toString(CryptoJS.enc.Utf8);
    }
  
    generateBarcode(encryptedData) {
      JsBarcode('#barcode', encryptedData, {
        format: 'code128',
        width: 2,
        height: 40,
        displayValue: true,
      });
    }
  }

  class Product{
    constructor(productName, productPrice){
        this.productName = productName;
        this.productPrice = productPrice;
    }
   productMonitor(){
    return this.productName + "___________" + this.productPrice;
   }
 
  }



  // Products and its price in a Array
  let productName = ["Blue Shirt", "Red Shirt", "White Shirt"];
  let productPrice = [100, 125, 150];
  // this sets the id insite of the html
  for (let i = 0; i < productName.length; i++) {
    document.getElementById(`product-name-${i + 1}`).innerHTML = productName[i];
    document.getElementById(`product-price-${i + 1}`).innerHTML = productPrice[i];
  }
  
  // this is for encryptBarcode
  const secretKey = "caseStudyOOP";
  // object for the encryptBarcode
  const encryptor = new encryptBarcode(secretKey);


  // this is for the button when click to generate the BArcode
  function generateBarcode() {
    const inputData = document.getElementById("plaintext").value;
    
    if (!inputData) {
      alert("Please enter some data to encrypt.");
      return;
    }
    // store the Encrypted data
    // it invoke the .encryptedData method inside of the encryptBarcode Class
    const encrypted = encryptor.encryptedData(inputData);
    // it invoke the .generateBarcode method
    encryptor.generateBarcode(encrypted);
}

// this is for when the Scan Button it decrypt the Data inside of the barcode
// it also indicate the type of the Product
function decryptData() {
    const encryptedData = document.getElementById("scanData").value;
    
    if (!encryptedData) {
        alert("Please scan or enter the encrypted barcode data.");
        return;
    }
    // store the Decrypted Data
    const decrypted = encryptor.decryptData(encryptedData);
    
    if (!decrypted) {
        document.getElementById("decryptedOutput").textContent = "Invalid barcode";
    }
    
    //this is for class Product
    const productCode = decrypted;
    // object of the Product class
    const productCodes = new Product(productName[decrypted],productPrice[productCode]);
    document.getElementById("Monitor-view-product").innerHTML= productCodes.productMonitor();


}


