const express = require('express')
const app = express()
require('dotenv').config()
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mwitl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const fruiteCollection = client.db("orgafresh-fruites").collection("fruites");
        const myItemCollection = client.db("add-item").collection("myItem");

        // get multiple fruites
        app.get("/fruites", async (req, res) => {
            const query = {}
            const cursor = fruiteCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // get single fruites
        app.get("/fruites/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await fruiteCollection.findOne(query);
            res.send(result);
        })

        // get Multiple item MyItemCollection
        app.get("/myItem", async (req, res) => {
            const email = req.query.email
            const query = {email}
            const cursor = myItemCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // Insert single Item
        app.post("/fruites", async (req, res) => {
            const newItem = req.body
            const result = await fruiteCollection.insertOne(newItem)
            res.send(result);
        })

        // Insert single Item MyItemCollection
        app.post("/myItem", async (req, res) => {
            const newItem = req.body
            const result = await myItemCollection.insertOne(newItem)
            res.send(result);
        })

        // Update quantity and sold
        app.put("/fruites/:id", async (req, res) => {
            const id = req.params.id
            const updateUser = req.body
            console.log(updateUser);
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: updateUser.quantity,
                    sold: updateUser.sold
                }
            }
            const result = await fruiteCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        // Update quantity
        app.put("/fruites/:id", async (req, res) => {
            const id = req.params.id
            const updateUser = req.body
            console.log(updateUser);
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: updateUser.quantity,
                    sold: updateUser.sold
                }
            }
            const result = await fruiteCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        // Delete Single Item
        app.delete("/fruites/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await fruiteCollection.deleteOne(query);
            res.send(result);
        })

        // Delete Single Item fuiteCollection
        app.delete("/fruites", async (req, res) => {
            const email = req.query.email
            const name = req.query.name
            const query = {name,email};
            const result = await fruiteCollection.deleteOne(query);
            res.send(result);
        })

        // Delete Single Item myItemCollection
        app.delete("/myItem/:id", async (req, res) => {
            const id = req.params.id
            const query = {_id:ObjectId(id)};
            const result = await myItemCollection.deleteOne(query);
            res.send(result);
        })

        // Delete Single Item fruiteCollection
        app.delete("/myItem", async (req, res) => {
            const email = req.query.email
            const name = req.query.name
            const query = {name,email};
            const result = await myItemCollection.deleteOne(query);
            res.send(result);
        })

        // Delete Multiple Item
        app.delete("/fruites", async (req, res) => {
            const query = {};
            const result = await fruiteCollection.deleteMany(query);
            res.send(result);
        })
    }

    finally {
        // await client.close();
    }
}

run().catch(console.dir)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})