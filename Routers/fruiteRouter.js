const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const fruiteSchema = require("../Schemas/fruiteSchema");
const fruiteModel = mongoose.model("fruite", fruiteSchema);


router.get("/fruiteCount", (req, res) => {
    fruiteModel.estimatedDocumentCount((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send({ count: data })
        }
    })
})


router.get("/fruites", async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const totalUser = await fruiteModel.find().skip(page * size).limit(size);
    res.send(totalUser);
})

router.get("/fruites/:id", (req, res) => {
    const userId = req.params.id;
    fruiteModel.findById({ _id: userId }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})


router.post("/fruites", (req, res) => {
    const newUser = new fruiteModel(req.body);
    newUser.save((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
})


router.put("/fruites/:id", (req, res) => {
    const fruiteId = req.params.id;
    const fruiteUpdate = req.body;
    fruiteModel.updateOne({ _id: fruiteId }, { $set: fruiteUpdate }, (err, docs) => {
        if (err) {
            res.send(err)
        } else {
            res.send(docs)
        }
    });
})


router.delete("/fruites/:id", (req, res) => {
    const fruiteId = req.params.id;
    fruiteModel.deleteOne({ _id: fruiteId }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
})


router.delete("/fruites", (req, res) => {
    const email = req.query.email;
    const name = req.query.name;
    fruiteModel.deleteOne({ name, email }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
})


module.exports = router;