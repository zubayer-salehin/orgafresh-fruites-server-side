const express = require('express');
const router = express.Router();
const { getAllMyItem, addMyItem, updateMyItem, deleteMyItemById, deleteMyItemByUsernameEmail } = require('../Controllers/myItem.controller');


router.get("/myItem", getAllMyItem)

router.post("/myItem", addMyItem)

router.put("/myItem", updateMyItem)

router.delete("/myItem/:id", deleteMyItemById)

router.delete("/myItem", deleteMyItemByUsernameEmail)


module.exports = router;