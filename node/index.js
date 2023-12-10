const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const keccak256 = require('keccak256');
const app = express();
const lighthouse = require('@lighthouse-web3/sdk');
const { ethers, hashMessage } = require("ethers");
const { kavach } = require("@lighthouse-web3/kavach");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 8080; // You can use any available port
let filename = "";

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // cb(null, 'file.txt');
    filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const signAuthMessage = async(privateKey) =>{
    const signer = new ethers.Wallet(privateKey)
    const authMessage = await kavach.getAuthMessage(signer.address)
    const signedMessage = await signer.signMessage(authMessage.message)
    const { JWT, error } = await kavach.getJWT(signer.address, signedMessage)
    return(JWT)
}

async function asyncLH (privateKey, publicKey) {
    // console.log("asyncLH")
    filepath = './uploads/' + filename;

    const apiKey = 'efe51041.77131449b309469f98eed12c6f319f0f'
    // const signedMessage = await signAuthMessage(privateKey)
    
    // const response = await lighthouse.uploadEncrypted(filepath, apiKey, publicKey, signedMessage)
    // console.log(response)

    const uploadResponse = await lighthouse.upload(
        filepath,
        'efe51041.77131449b309469f98eed12c6f319f0f'
        );

    // console.log("uploadResponse")
    console.log(uploadResponse);
    // extract out the hash from the response
    hash = uploadResponse.data.Hash;
    console.log("hash", hash);

    const hash256 = keccak256(hash);
    const hstring = hash256.toString('hex');
    console.log("hash256", hash256);
    console.log("hstring", hstring);
    return uploadResponse;
}

// File Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
}
console.log(req.body)
const privateKey = req.body.privateKey;
const publicKey = req.body.publicKey;

// console.log("privateKey", privateKey);
// console.log("publicKey", publicKey);

// call lighthouse.js
try {
    asyncLH(privateKey, publicKey);
} catch(error) {
        console.error(error);
        process.exitCode = 1;
}
res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});