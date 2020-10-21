const checkAuthenticated = (req, res, next) => {
    req.session.returnTo = req.originalUrl
    if (req.session.returnTo == undefined || req.session.returnTo == "/login") {
        req.session.returnTo = "/"
    }
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

const checkNotAuthenticated = (req, res, next) => {
    req.session.returnTo = req.originalUrl
    if (req.session.returnTo == undefined || req.session.returnTo == "/login") {
        req.session.returnTo = "/"
    }
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}

// module.exports = checkAuthenticated
// module.exports = checkNotAuthenticated

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
}