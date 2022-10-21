const sdk = require('node-appwrite');
const express = require('express');
const { json } = require('express/lib/response');
const cors = require('cors');
const res = require('express/lib/response');
const axios = require('axios');

const app = express(),
    bodyParser = require("body-parser");

app.use(express.static('assets'))
app.use(cors())
app.use(bodyParser.json())

// Init SDK
const client = new sdk.Client();


client
    .setEndpoint('https://bf2a562.online-server.cloud/v1') // Replace this with your endpoint
    .setProject('63446724a6d27e696227') // Replace this with your projectID
    .setKey('07c14994a2e981137b93ac6d8b8531cded8541f5de329facf52ee8e578b45bfdf1ea644d6c42189d276915e30eae55d000f2d42c46ae970023a4198a9507b3f5c5402eb687577980fa626ab776646b7749305f72b1fc44f3c6dccf0d1960d132f52c21b36d126f66ec577c6b299f731fa30fad0e8512c35e652bfbefb81d2c2e') // Your secret API key
;

const database = new sdk.Databases(client, '63446ca755a041305f7f');

const users = new sdk.Users(client);


/* app.get('/', (req, res) => {
    console.log("send to index -----", res);
    //res.json(req);
}); */

app.get('/api/account', async(req, res) => {
    let data = await users.list();
    res.send(data);
    console.log('api/account called!:', data)
})


app.get('/api/customer', async(req, res) => {
    let data = await database.listDocuments('63446ca755a041305f7f', '63446cd877f69df94aca');
    res.send(data.documents);
    console.log('api/customer called!', data)
})

async function getKeys() {
    try {
        const response = await axios.get('https://m.myapp2go.de/services/APIgetblz.php');
        const data = response.items;
        console.log(data);
        //res.send(data);
    } catch (e) {
        console.log(e.message);
    }
}

getKeys();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${ PORT }`);
});