const express = require('express');
const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
const uri = `mongodb+srv://jhughes:Everton1974@cluster0.1i1ftm6.mongodb.net/?retryWrites=true&w=majority`;

// Define a Mongoose schema
const exampleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});
const teamSchema = new mongoose.Schema({
    id: String,
    title: String,
    team: Array,
    time: String
});
const ExampleModel = mongoose.model('Example', exampleSchema);
const TeamModel = mongoose.model('Team', teamSchema);

const getTime = () => {
    let d = new Date();
    console.log(d);
    return d;
}
getTime();
async function connect () {
    console.log('connect');
    try {
        await mongoose.connect(uri);
        console.log(`connected`);
        // Create a new document
        let exampleDoc = new ExampleModel({
            name: 'John',
            age: 30,
            email: 'john@example.com'
        });
        // Save the document to the database
        await exampleDoc.save();
        // Create a new document
        exampleDoc = new TeamModel({
            title: 'Government',
            id: 't02',
            team: ['p02', 'p05', 'p10'],
            time: getTime()
        });
        // Save the document to the database
        await exampleDoc.save();
        console.log('Data added to the database(s)');
    } catch (err) {
        console.log(err);
    }
};
connect();
app.listen(port, () => {
    console.log(`running on port ${port}`);
})
