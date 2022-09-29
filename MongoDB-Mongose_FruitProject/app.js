/* FruitsProject*/
/* mkdir FruitsProject, cd FruitProject, touch app.js, npm init -y, npm i mongodb, start app.js */

const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017"; //Connection URI
const dbName = "fruitsDB"; //Database name
mongoose.connect("mongodb://localhost:27017/"+dbName) //Connect to MongoDB Database Server /fruitsDB


/*----------------------------I.1 Create&Insert--------------------------------*/
const fruitSchema = new mongoose.Schema({ //Schema of data
 name: { type: String, required: [true, 'Please check your data entry, no name specified!'] }, //Challenge
 rating: { type: Number, min: 1, max: 10 }, //number validation
 review: String
});
const FruitModel = mongoose.model( "CollectionOfFruit", fruitSchema ); //Fruit Model
// const fruitDoc = new FruitModel({ name: "Apple", rating: 34, review: "Pretty solid as a fruit." });
const fruitDoc = new FruitModel({ rating: 9, review: "Peaches are to yummy!" }); // fruit document
// fruitDoc.save(); //Insert into database

/*---------------------------------I.2 Challenge--------------------------------
const personSchema = new mongoose.Schema({  name: String, age: Number }); //person Schema
const PersonModel = mongoose.model( "CollectionOfPerson", personSchema ); //Person Model
const  personDoc = new PersonModel({ name: "John", age:37 });  // person document
personDoc.save(); //Insert into database
*/


/*---------------------------------I.3 InsertMany-------------------------------
const  kiwi   = new FruitModel({ name: "Kiwi",   rating: 10, review: "The best fruit!"});
const  orange = new FruitModel({ name: "Orange", rating: 4,  review: "To sour for me"});
const  banana = new FruitModel({ name: "Banana", rating: 3,  review: "Weird texture"});
const array = [kiwi, orange, banana];
FruitModel.insertMany(array, function(err){
 if(err){ console.log(err) }
 else{ console.log("Successfully saved all the fruits to fruitsDB!") }
});
*/


/*---------------------------------II Read------------------------------------*/
FruitModel.find(function(err, fruits){ //getback an array named fruits that are inside the database
 if (err) {
  console.log(err);
 }
 else {
  // mongoose.connection.close();
  fruits.forEach( function(fruit){ // fruit|element
   console.log(fruit.name); //print each name of fruit
  });
 }
});


/*---------------------------------III Update-----------------------------------
FruitModel.updateOne( { _id: "633456251c2fecf36f9859c0"}, {name: "Peach"}, function(err){ //update the record|document|fruit that have id = "633456251c2fecf36f9859c0", put name: "Peach"
 if (err) {
  console.log(err);
 }
 else {
  console.log("Succesfully updated the document!");
  }
});
*/


/*---------------------------------IV.1 DeleteOne-------------------------------
FruitModel.deleteOne({ _id: "633456251c2fecf36f9859c0"}, function(err){ //delete the record|document|fruit that have id = "633456251c2fecf36f9859c0"
 if (err) {
  console.log(err);
 }
 else {
  mongoose.connection.close();
  console.log("Succesfully deleted the document!");
  }
});
*/

/*---------------------------------IV.2 DeleteMany------------------------------
PersonModel.deleteMany({ name: "John"}, function(err){ //delete all the records|documents|people that have name = John
 if (err) {
  console.log(err);
 }
 else {
  // mongoose.connection.close();
  console.log("Succesfully cleared the people's collection!");
  }
});
*/


/*---------------------------------V.1 Relationships&Embedded-------------------
//1
const personSchema = new mongoose.Schema({  name: String, age: Number, favouriteFruit: fruitSchema }); //Embedding fruitSchema inside favouriteFruit property
const PersonModel = mongoose.model( "CollectionOfPerson", personSchema );
//2
const pineapple = new FruitModel({ name: "Pineapple", score: 9, review: "Great Fruit" }); //Create a new fruit called pinapple
pineapple.save(); //save pinapple into CollectionOfFruit
//3
const  personDoc = new PersonModel({ name: "Ammy", age:37, favouriteFruit: pineapple }); //Embedding  pinapple inside favouriteFruit in personDoc
personDoc.save(); //save personDoc into CollectionOfPerson
*/


/*---------------------------------V.2 Challenge------------------------------*/
//Add pomegranate as favouriteFruit of John
//1
const personSchema = new mongoose.Schema({  name: String, age: Number, favouriteFruit: fruitSchema }); //Embedding fruitSchema inside favouriteFruit property
const PersonModel = mongoose.model( "CollectionOfPerson", personSchema );
//2
const pomegranate = new FruitModel({ name: "Pomegranate", score: 9, review: "The best!" }); //Create a new fruit called pomegranate
pomegranate.save(); //save pomegranate into CollectionOfFruit
//3
/*If John doesn't exist in database we would write code below:
const  personDoc = new PersonModel({ name: "John", age:37, favouriteFruit: pomegranate }); //Embedding  pomegranate inside favouriteFruit in personDoc
personDoc.save(); //save personDoc into CollectionOfPerson
But we just have John in database, so we're going to write code below:*/

PersonModel.updateMany( {name: "John"}, {favouriteFruit: pomegranate}, function(err){ //update the record|document|fruit that have id = "633456251c2fecf36f9859c0", put name: "Peach"
 if (err) {
  console.log(err);
 }
 else {
  console.log("Succesfully updated the document!");
  }
});
