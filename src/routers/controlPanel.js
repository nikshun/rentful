const express = require('express')
const router = new express.Router()
const sharp = require('sharp')
const User = require('../models/user')
const Property = require('../models/property')
const upload = require('../services/file-upload')
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth')



router.get('/publish',checkAuthenticated, async(req, res) => {
    await res.render('publish')
})



router.post('/publish',checkAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const user = req.session.passport.user

        var pictureUrl = req.file.location
        const property = new Property({
            type: req.body.type,
            description: req.body.description,
            location:req.body.address,
            price: req.body.price,
            photoUrl:pictureUrl,
            owner:user.email
        })
        await property.save()
        console.log("Created a property " + req.body.type)
        await res.redirect('/');
    } catch (e) {
        console.log(e)
        await res.redirect('/publish')
    }
})


  

module.exports = router