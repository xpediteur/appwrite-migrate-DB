const sdk = require('node-appwrite');
const express = require('express')
const axios = require('axios')
const app = express()


//Init SDK
const client = new sdk.Client();


client
    .setEndpoint('https://bf2a562.online-server.cloud/v1') // Replace this with your endpoint
    .setProject('63446724a6d27e696227') // Replace this with your projectID
    .setKey('07c14994a2e981137b93ac6d8b8531cded8541f5de329facf52ee8e578b45bfdf1ea644d6c42189d276915e30eae55d000f2d42c46ae970023a4198a9507b3f5c5402eb687577980fa626ab776646b7749305f72b1fc44f3c6dccf0d1960d132f52c21b36d126f66ec577c6b299f731fa30fad0e8512c35e652bfbefb81d2c2e') // Your secret API key
;

const database = new sdk.Databases(client, '63446ca755a041305f7f');

const users = new sdk.Users(client);



app.get("/", async(req, res) => {
    try {
        const response = await axios.get("https://m.myapp2go.de/services/API_get_keys")
        res.json(response.data)
    } catch (err) {
        console.log(err)
    }
})

app.get('/api/account', async(req, res) => {
    let data = await users.list();
    res.send(data);
    console.log('api/account called!:', data)
})


app.get('/api/keys', async(req, res) => {
    let data = await database.listDocuments('63446ca755a041305f7f', '635256b413c28b9de0c8');
    res.send(data.documents);
    console.log('api/customer called!', data)
})


async function getKeys() {
    try {
        const response = await axios.get('https://m.myapp2go.de/services/API_get_keys');
        const data = response.data.items.map(value => ({

            KY_KEY: value.KY_KEY,
            KY_VALUE: value.KY_VALUE,
            KY_TEXT: value.KY_TEXT

        }));
        console.log("mapped in array: ", data);

        return data;
        //res.send(data);
    } catch (e) {
        console.log(e.message);
    }
}

async function migrateDatabase() {
    try {
        const migKeys = await getKeys(); // get a key-array with map from getKeys()
        migKeys.forEach(async(element) => {
            try {
                console.log("key array ID --> : ", element.KY_KEY, element.KY_VALUE, element.KY_TEXT);
                await database.createDocument('63446ca755a041305f7f', '635256b413c28b9de0c8', 'unique()', { 'KY_KEY': element.KY_KEY, 'KY_VALUE': element.KY_VALUE, 'KY_TEXT': element.KY_TEXT })

            } catch (e) {
                console.log(e.message)
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}

(async() => {
    await migrateDatabase();
})();

app.get('*', (req, res) => {
    res.status(500).json({ message: "error" })
})

app.listen(3080)