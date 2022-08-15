const express = require('express');
const router = express.Router();
const { getAllFruites, getFruiteByIndividualPaginationClick, getSingleFruite, addFruite, updateFruite, deleteFruiteById, deleteFruiteByUserNameEmail } = require('../Controllers/fruite.controller');


router.get("/fruiteCount", getAllFruites)

router.get("/fruites", getFruiteByIndividualPaginationClick)

router.get("/fruites/:id", getSingleFruite)

router.post("/fruites", addFruite)

router.put("/fruites/:id", updateFruite)

router.delete("/fruites/:id", deleteFruiteById)

router.delete("/fruites", deleteFruiteByUserNameEmail)


module.exports = router;