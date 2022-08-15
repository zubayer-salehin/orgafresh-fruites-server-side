const express = require('express')
const app = express()
require('dotenv').config()
const cors = require("cors")
const port = process.env.PORT || 5000
const mongoose = require("mongoose");
const fruiteRouter = require("./Routers/fruiteRouter");
const myItemRouter = require("./Routers/myItemRouter");

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Orgafresh Fruites Server side')
})

const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mwitl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongodbURL)
    .then((result) => {
        console.log("Mongoess Connected");
    })
    .catch((error) => {
        console.log("Mongoess not connect with MongodbAtlas");
    });


app.use(fruiteRouter);
app.use(myItemRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})