// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`)

const { uploadImage } = require("../middlewares")

// Create a new Router instance and call it "router"
const router = new express.Router()


// RESTful resource mappings
router.get("/new", planetCtlr.newPlanet)
router.get("/:id/edit", planetCtlr.edit)

router.post("/", uploadImage, planetCtlr.create)

router.put("/:id", uploadImage, planetCtlr.update)


router.get(`/`, planetCtlr.index)

router.get(`/:id`, planetCtlr.show) 

router.delete(`/:id`, planetCtlr.remove) 

// export "router"
module.exports = router
