# appwrite-migrate-DB

node.js code (migrate.js) for migrating data from your API to appwrite DB

This small node.js program shows a basic procedure for data migration from your own API (or data in JSON format) to the appwrite DB.

The API in this example returns the following result. This are keys, stored in an mysql-DB.

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

Getting started

1) Creating the Database, Collection, and Attributes

We will create a database on Appwrite to store our keys. To create a database, navigate to the Database tab on the left side of the dashboard and click on Add Database. Then we have to create 3 attributes like shown in the image below.

<img width="965" alt="image" src="https://user-images.githubusercontent.com/5628117/197227614-957d7204-db7a-43cc-b19c-36daf278855c.png">

2) Creating Indexes

We will create 2 indexes like shown below so that we can search in the fields later.

<img width="965" alt="image" src="https://user-images.githubusercontent.com/5628117/197228456-10f9484a-9edb-45ac-8ef4-ac045753b1f7.png">

3) IDs and API-Key

To populate the database, we will need properties from Appwrite such as the Project ID, Database ID, ApiKey, and Collection ID. We already know how to get the Project ID and Collection ID. The Database ID can be found in the Settings tab of our database. Replace these value in the code migrate.js.

Explanation of functions

- The function "getKeys()" fetches data from an API (via axios)from a mysql database and maps it to an appropriate array that corresponds to our database structure.

- The function migrateDatabase() calls the function getKeys(), fetches the data and loops over the array "migKeys" and makes inserts into our described database with the appwrite function "database.createDocument(...)". The DB will be populated.

Execution of the program:

node migrate.js



