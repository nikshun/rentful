require('./src/db/mongoose')
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const homeRouter = require('./src/routers/home')
const controlPanelRouter = require('./src/routers/controlPanel')
const profileRouter = require('./src/routers/profiles')
const port = process.env.PORT
const publicPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
const User = require('./src/models/user')
const app = express()

// Passport auth
const passport = require('passport')
const initializePassport = require('./src/passport/passport-config')
initializePassport(
    passport,
    async(email) => {
        return await User.findOne({ email })
    },
    async(id) => {
        return await User.findOne({ id })
    }
)

// Sessions
const flash = require('express-flash')
const session = require('express-session')
app.use(flash())
app.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }
}))
app.use(passport.initialize())
app.use(passport.session())



app.set('view engine', 'ejs')
app.set('views', viewsPath)

app.use(express.urlencoded({ extended: false }))
app.use(express.static(publicPath))
app.use(homeRouter)
app.use(controlPanelRouter)
app.use(profileRouter)



app.listen(port, () => {
    console.log("Server is up on port " + port)
})