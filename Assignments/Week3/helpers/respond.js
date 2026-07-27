const respond = (req, res, view, data) => {

    const contentType = req.headers["content-type"] || ""

    if (contentType.includes("application/json")) {
        return res.status(200).json(data)
    }

    return res.render(view, data)
}


module.exports = respond