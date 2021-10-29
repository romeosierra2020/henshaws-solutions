const express= require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const solutions = require('./routes/api/solutions.js');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const db = process.env.SOLUTIONS_DB_URI;

const connectToMongo = async (db) => {
    try {
        await mongoose.connect(db);
        console.log("Connected to Mongo Database")
    } catch (err) {
        console.log(err);
    }
}
connectToMongo(db);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/solutions', solutions);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port: ${port}`));