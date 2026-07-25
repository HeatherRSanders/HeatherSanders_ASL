const { Galaxy, Stars } = require("../models")
const stars = require("../models/stars")
// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const galaxy = await Galaxy.findAll()
  res.json(galaxy)
}

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const galaxy = await Galaxy.findByPk(req.params.id, {include: Stars})
  
  res.render("galaxies/show", {galaxy})
}

// Create a new resource
const create = async (req, res) => {
  // Issue a redirect with a success 2xx code
  const galaxy  = await Galaxy.create(req.body)
  res.json(galaxy)
}

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const galaxy = await Galaxy.update(req.body, {where: {... req.params}})
  res.json(galaxy)
}

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const deleted = await Galaxy.destroy({where: { ...req.params}})
  res.status(204).json(deleted)
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
