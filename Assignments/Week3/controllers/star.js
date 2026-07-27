const { Stars, Galaxy, Planets } = require("../models")
const respond = require("../helpers/respond")


const index = async (req, res) => {

    const stars = await Stars.findAll({
        include: [
            Galaxy,
            Planets
        ]
    })


    respond(
        req,
        res,
        "stars/index",
        { stars }
    )

}


const show = async (req, res) => {

    const star = await Stars.findByPk(req.params.id, {
        include: [
            Galaxy,
            Planets
        ]
    })


    respond(
        req,
        res,
        "stars/show",
        { star }
    )

}


const create = async (req, res) => {

    const star = await Stars.create({
        ...req.body,
        image: req.uploadedImage || null
    })


    if(req.body.GalaxyId){

        const galaxy = await Galaxy.findByPk(req.body.GalaxyId)

        await star.setGalaxy(galaxy)

    }


    if(req.body.planetIds){

        const ids = Array.isArray(req.body.planetIds)
            ? req.body.planetIds
            : [req.body.planetIds]


        const planets = await Planets.findAll({
            where:{
                id: ids
            }
        })


        await star.setPlanets(planets)

    }


    const createdStar = await Stars.findByPk(star.id, {
        include: [
            Galaxy,
            Planets
        ]
    })


    if(req.headers["content-type"]?.includes("application/json")) {

        return res.status(201).json(createdStar)

    }


    res.redirect("/stars/" + createdStar.id)

}


const update = async (req, res) => {

    const star = await Stars.findByPk(req.params.id)


    await star.update({
        ...req.body,
        image: req.uploadedImage || undefined
    })


    if(req.body.GalaxyId){

        const galaxy = await Galaxy.findByPk(req.body.GalaxyId)

        await star.setGalaxy(galaxy)

    }


    if(req.body.planetIds !== undefined){

        const ids = Array.isArray(req.body.planetIds)
            ? req.body.planetIds.filter(id => id !== "")
            : req.body.planetIds === ""
                ? []
                : [req.body.planetIds]


        const planets = await Planets.findAll({
            where:{
                id: ids
            }
        })


        await star.setPlanets(planets)

    }


    const updatedStar = await Stars.findByPk(req.params.id, {
        include: [
            Galaxy,
            Planets
        ]
    })


    if(req.headers["content-type"]?.includes("application/json")) {

        return res.status(200).json(updatedStar)

    }


    res.redirect("/stars/" + updatedStar.id)

}


const remove = async (req,res)=>{

    await Stars.destroy({
        where:{
            id:req.params.id
        }
    })


    if(req.headers["content-type"]?.includes("application/json")) {

        return res.status(204).send()

    }


    res.redirect("/stars")

}


const newStar = async (req, res) => {

    const galaxies = await Galaxy.findAll()
    const planets = await Planets.findAll()


    res.render("stars/new", {
        galaxies,
        planets
    })

}


const edit = async (req, res) => {

    const star = await Stars.findByPk(req.params.id, {
        include: [
            Galaxy,
            Planets
        ]
    })


    const galaxies = await Galaxy.findAll()
    const planets = await Planets.findAll()


    res.render("stars/edit", {
        star,
        galaxies,
        planets
    })

}


module.exports = {
    index,
    show,
    create,
    update,
    remove,
    newStar,
    edit
}