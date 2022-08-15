const fruiteModel = require("../Models/fruite.model")


exports.getAllFruites = (req, res) => {
    fruiteModel.estimatedDocumentCount((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send({ count: data })
        }
    })
}

exports.getFruiteByIndividualPaginationClick = async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const totalUser = await fruiteModel.find().skip(page * size).limit(size);
    res.send(totalUser);
}

exports.getSingleFruite = (req, res) => {
    const userId = req.params.id;
    fruiteModel.findById({ _id: userId }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
}

exports.addFruite = (req, res) => {
    const newUser = new fruiteModel(req.body);
    newUser.save((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
}

exports.updateFruite = (req, res) => {
    const fruiteId = req.params.id;
    const fruiteUpdate = req.body;
    fruiteModel.updateOne({ _id: fruiteId }, { $set: fruiteUpdate }, (err, docs) => {
        if (err) {
            res.send(err)
        } else {
            res.send(docs)
        }
    });
}

exports.deleteFruiteById = (req, res) => {
    const fruiteId = req.params.id;
    fruiteModel.deleteOne({ _id: fruiteId }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
}

exports.deleteFruiteByUserNameEmail = (req, res) => {
    const email = req.query.email;
    const name = req.query.name;
    fruiteModel.deleteOne({ name, email }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
}