const { Stars, Galaxy, Planets } = require("../models")
// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const stars = await Stars.findAll()
  res.json(stars)
}

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const star = await Stars.findByPk(req.params.id, { include: [Galaxy, Planets] })

  res.json({star})
}

// Create a new resource
const create = async (req, res) => {
  // Issue a redirect with a success 2xx code
  const stars = await Stars.create(req.body)
  res.json(stars)
}

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const star = await Stars.update(req.body, {where: {... req.params}})
  res.json(star)
}

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const deleted = await Stars.destroy({where: { ...req.params}})
  res.status(204).json(deleted)
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
