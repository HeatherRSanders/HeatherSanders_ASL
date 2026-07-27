// Load in our Express framework
const express = require(`express`)
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const fileUpload = require("express-fileupload")

// Create app
const app = express()

// Load routers
const routers = require('./routers/index.js')

// View engine
app.set("view engine", "ejs")

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(fileUpload())

// Enable PUT/DELETE from HTML forms
app.use(methodOverride("_method"))

// Serve CSS/images/etc
app.use(express.static("public"))

// Home page
app.get("/", (req, res) => {
    res.render("home")
})

// Resource routes
app.use(`/planets`, routers.planet)
app.use(`/stars`, routers.star)
app.use(`/galaxies`, routers.galaxy)

// Start server
app.listen(3000)