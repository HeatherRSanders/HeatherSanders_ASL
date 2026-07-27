const path = require("path")
const fs = require("fs")

const uploadImage = async (req, res, next) => {

    if(!req.files || !req.files.image){
        return next()
    }


    const image = req.files.image


    const uploadPath = path.join(
        __dirname,
        "../public/uploads",
        image.name
    )

    if (!fs.existsSync(path.join(__dirname, "../public/uploads"))) {
    fs.mkdirSync(path.join(__dirname, "../public/uploads"))
}

    await image.mv(uploadPath)


    req.uploadedImage = image.name


    next()
}


module.exports = {
    uploadImage
}