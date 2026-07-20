const { Planets, Stars} = require("../models")
// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const planets = await Planets.findAll()
  res.json(planets)
}

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const planets = await Planets.findByPk(req.params.id, {include: Stars})
  res.json({planets})
}

// Create a new resource
const create = async (req, res) => {
  const planet = await Planets.create(req.body)

  const star = await Stars.findByPk(req.body.starId)

  await planet.addStar(star)

  const updatedPlanet = await Planets.findByPk(planet.id, {
    include: Stars
  })

  res.json(updatedPlanet)
}

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const planets = await Planets.update(req.body, {where: {... req.params}})
  res.json(planets)
}

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const deleted = await Planets.destroy({where: { ...req.params}})
  res.status(204).json(deleted)
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
