const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const myItemSchema = require("../Schemas/myItemSchema");
const myItemModel = mongoose.model("MyItem", myItemSchema);


router.get("/myItem", (req, res) => {
    myItemModel.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})


router.post("/myItem", (req, res) => {
    const newFruite = new myItemModel(req.body);
    newFruite.save((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "New user Added" })
        }
    });
})


router.put("/myItem", (req, res) => {
    const email = req.query.email;
    const name = req.query.name;
    const fruiteUpdate = req.body;
    myItemModel.updateOne({ name, email }, { $set: fruiteUpdate }, (err, docs) => {
        if (err) {
            res.send(err)
        } else {
            res.send(docs)
        }
    });
})


router.delete("/myItem/:id", (req, res) => {
    const fruiteId = req.params.id;
    myItemModel.deleteOne({ _id: fruiteId }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
})


router.delete("/myItem", (req, res) => {
    const email = req.query.email;
    const name = req.query.name;
    myItemModel.deleteOne({ name, email }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
})

module.exports = router;