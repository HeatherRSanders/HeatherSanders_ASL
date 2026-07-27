const { Galaxy,Planets, Stars } = require("../models")
const respond = require("../helpers/respond")

const index = async (req, res) => {

    const galaxies = await Galaxy.findAll()

    respond(
        req,
        res,
        "galaxies/index",
        { galaxies }
    )

}

const show = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id, {
    include: [
        {
            model: Stars,
            include: Planets
        }
    ]
})
respond(
    req,
    res,
    "galaxies/show",
    { galaxy }
)
}

const create = async (req, res) => {
const galaxy = await Galaxy.create({
    ...req.body,
    image: req.uploadedImage || null
})
const createdGalaxy = await Galaxy.findByPk(galaxy.id, {
    include: [
        {
            model: Stars,
            include: Planets
        }
    ]
})


if(req.headers["content-type"]?.includes("application/json")) {

    return res.status(201).json(createdGalaxy)

}

res.redirect("/galaxies/" + createdGalaxy.id)
}

const update = async (req, res) => {

    await Galaxy.update(
        {
            ...req.body,
            image: req.uploadedImage || undefined
        },
        {
            where: { id: req.params.id }
        }
    )

    const galaxy = await Galaxy.findByPk(req.params.id, {
    include: [
        {
            model: Stars,
            include: Planets
        }
    ]
})

    if(req.headers["content-type"]?.includes("application/json")) {

        return res.status(200).json(galaxy)

    }

    res.redirect("/galaxies/" + galaxy.id)
}

const remove = async (req, res) => {

    await Galaxy.destroy({
        where: { id: req.params.id }
    })


    if(req.headers["content-type"]?.includes("application/json")) {

        return res.status(204).send()

    }

    res.redirect("/galaxies")
}

const newGalaxy = (req, res) => {
  res.render("galaxies/new")
}

const edit = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id)

  res.render("galaxies/edit", { galaxy })
}


module.exports = { index, show, create, update, remove, newGalaxy, edit }