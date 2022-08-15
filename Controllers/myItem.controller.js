const myItemModel = require("../Models/myItem.model");


exports.getAllMyItem = (req, res) => {
    myItemModel.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
}

exports.addMyItem = (req, res) => {
    const newFruite = new myItemModel(req.body);
    newFruite.save((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "New user Added" })
        }
    });
}

exports.updateMyItem = (req, res) => {
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
}

exports.deleteMyItemById = (req, res) => {
    const fruiteId = req.params.id;
    myItemModel.deleteOne({ _id: fruiteId }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
}

exports.deleteMyItemByUsernameEmail = (req, res) => {
    const email = req.query.email;
    const name = req.query.name;
    myItemModel.deleteOne({ name, email }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
}