// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`)
const { uploadImage } = require("../middlewares")


// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get("/new", starCtlr.newStar)
router.get("/:id/edit", starCtlr.edit)

router.post("/", uploadImage, starCtlr.create)

router.put("/:id", uploadImage, starCtlr.update)

router.get(`/`, starCtlr.index)

router.get(`/:id`, starCtlr.show) 

router.delete(`/:id`, starCtlr.remove) 

// export "router"
module.exports = router
