const express = require("express")

const router  = express.Router()

const aiController = require("../controllers/ai.controllers")

router.post("/review", aiController.getResponse)

module.exports = router