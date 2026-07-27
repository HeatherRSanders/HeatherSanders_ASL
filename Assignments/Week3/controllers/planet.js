const { Stars,Galaxy, Planets } = require("../models")
const respond = require("../helpers/respond")

const index = async (req, res) => {
    const planets = await Planets.findAll()

    respond(
        req,
        res,
        "planets/index",
        { planets }
    )

}


const show = async (req, res) => {

    const planet = await Planets.findByPk(req.params.id, {
    include: [
        {
            model: Stars,
            include: Galaxy
        }
    ]
})

  respond(
    req,
    res,
    "planets/show",
    { planet }
)
}

const create = async (req, res) => {

    const planet = await Planets.create({
        ...req.body,
        image: req.uploadedImage || null
    })


    if(req.body.starIds){

        const ids = Array.isArray(req.body.starIds)
            ? req.body.starIds
            : [req.body.starIds]


        for(const id of ids){

            const star = await Stars.findByPk(id)

            await planet.addStar(star)

        }
    }

const createdPlanet = await Planets.findByPk(planet.id, {
    include: [
        {
            model: Stars,
            include: Galaxy
        }
    ]
})


if(req.headers["content-type"]?.includes("application/json")) {

    return res.status(201).json(createdPlanet)

}

res.redirect("/planets/" + createdPlanet.id)
}


const update = async (req, res) => {

    const planet = await Planets.findByPk(req.params.id)


    await planet.update({
        ...req.body,
        image: req.uploadedImage || undefined
    })


    if(req.body.starIds !== undefined){

        const ids = Array.isArray(req.body.starIds)
            ? req.body.starIds.filter(id => id !== "")
            : req.body.starIds === ""
                ? []
                : [req.body.starIds]


        const stars = await Stars.findAll({
            where: {
                id: ids
            }
        })


        await planet.setStars(stars)

    }
const updatedPlanet = await Planets.findByPk(req.params.id, {
    include: [
        {
            model: Stars,
            include: Galaxy
        }
    ]
})


if(req.headers["content-type"]?.includes("application/json")) {

    return res.status(200).json(updatedPlanet)

}

res.redirect("/planets/" + updatedPlanet.id)
}

const remove = async (req,res)=>{

    await Planets.destroy({
        where:{
            id:req.params.id
        }
    })

    if(req.headers["content-type"]?.includes("application/json")) {

        return res.status(204).send()

    }

    res.redirect("/planets")
}

const newPlanet = async (req, res) => {

    const stars = await Stars.findAll()

    res.render("planets/new", {
        stars
    })
}

const edit = async (req, res) => {

    const planet = await Planets.findByPk(req.params.id, {
        include: Stars
    })

    const stars = await Stars.findAll()

    res.render("planets/edit", {
        planet,
        stars
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    newPlanet,
    edit
}