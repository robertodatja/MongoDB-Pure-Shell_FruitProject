/* FruitsProject*/
/* mkdir FruitsProject, cd FruitProject, touch app.js, npm init -y, npm i mongodb, start app.js */



/*1.1-----------------Create your Node.js Application-------------*/
/*1.1 https://www.mongodb.com/docs/drivers/node/current/quick-start*/

const {MongoClient} = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string. //Connection URI
const uri = "mongodb://localhost:27017"; //const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";


const dbName = "fruitsDB"; // Database name

const client = new MongoClient(uri); // Create a new MongoClient

/*1.2-----------------------Function to connect to the server----------------------------------*/
/*1.2 https://www.mongodb.com/docs/drivers/node/current/fundamentals/authentication/mechanisms/*/
async function run() {
 try {
  // Establish and verify connection
  await client.db("fruitsDB").command({ ping: 1 });// Use connect method to connect to the server
  console.log("Connected successfully to server");

  const database = client.db("fruitsDB"); //database called fruitsDB
  const fruitsCollection = database.collection("fruitsColl"); //collection called fruitsColl


  // the following code examples can be pasted here...


  /*2.------------------Insert  document----------------------------------------*/
  /*2https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertMany*/
  // create an array of documents to insert
  const docs = [
   {name: "Apple",  score: 8, review: "Great Fruit"},
   {name: "Orange", score: 6, review: "Kinda Sour"},
   {name: "Banana", score: 9, review: "Great Stuff"}
  ];

  // this option prevents additional documents from being inserted if one fails
  const options = {ordered: true};

  // Insert method
  // const result = await fruitsCollection.insertMany(docs, options);
  // console.log(`${result.insertedCount} documents were inserted`);


  /*3.---------------Find All Documents(records)---------------*/
  /*3. https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/*/
  //
  const cursor = fruitsCollection.find({});
  // print a message if no documents were found
  if ((await fruitsCollection.countDocuments()) === 0) {
   console.log("No documents found!");
  }
  /*(node:1952) [MONGODB DRIVER] Warning: cursor.count() is deprecated and will be removed in the next major version,
  please use `collection.estimatedDocumentCount` or `collection.countDocuments` instead*/

  // replace console.log(fruit) with your callback to access individual elements
  // Find method
  const findResult = await cursor.toArray();
  console.log('Found the following records', findResult);

 }

 // Ensures that the client will close when you finish/error
 finally {
  await client.close();
 }

}

run().catch(console.dir);
