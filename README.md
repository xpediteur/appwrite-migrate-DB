# appwrite-migrate-DB

node.js code (server.js) for migrating data from your API to appwrite DB

This small node.js program shows a basic procedure for data migration from your own API (or data in JSON format) to the appwrite DB

The API returns the following result:

{
"items": [
{
"KY_KEY": "NACE",
"KY_VALUE": "A ",
"KY_TEXT": "Agriculture, forestry and fishing"
},
{
"KY_KEY": "NACE",
"KY_VALUE": "A1 ",
"KY_TEXT": "Crop and animal production, hunting and related service activities"
},
{
"KY_KEY": "NACE",
"KY_VALUE": "A1.1 ",
"KY_TEXT": "Growing of nonperennial crops"
} ...
