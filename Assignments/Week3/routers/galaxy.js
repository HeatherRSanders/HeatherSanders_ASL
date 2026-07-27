// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`)
const { uploadImage } = require("../middlewares")

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/new`, galaxyCtlr.newGalaxy)
router.get(`/:id/edit`, galaxyCtlr.edit)

router.get(`/`, galaxyCtlr.index)
router.post(`/`, uploadImage, galaxyCtlr.create)

router.get(`/:id`, galaxyCtlr.show)
router.put(`/:id`, uploadImage, galaxyCtlr.update)

router.delete(`/:id`, galaxyCtlr.remove)

// export "router"
module.exports = router