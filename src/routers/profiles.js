const express = require('express')
const router = new express.Router()
const sharp = require('sharp')
const User = require('../models/user')
const Property = require('../models/property')
const upload = require('../services/file-upload')

const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth')

router.get('/profile',checkAuthenticated, async(req, res) => {
    const ownerEmail = req.session.passport.user.email
    const user = await User.findOne({email:ownerEmail}).exec()
    const properties = await Property.find({owner:ownerEmail}).exec()
    await res.render('profile',{
        name: user.name,
        user,
        properties
    })
})

router.post("/profileImage", upload.single('image'), checkAuthenticated, async(req,res) => { 
    let profileImageUrl = req.file.location
    const email = req.session.passport.user.email
    User.updateOne({email : email}, { $set: { profileImageUrl: profileImageUrl } }).exec()
    await res.redirect('/profile')
})

router.get('/profile/edit',checkAuthenticated, async(req, res) => {
    const ownerEmail = req.session.passport.user.email
    const user = await User.findOne({email:ownerEmail}).exec()
    await res.render('editProfile',{
        name: user.name,
        user
    })
})

router.post('/profile/edit',upload.single('image'), checkAuthenticated, async(req, res) => {
    const email = req.session.passport.user.email
    if (req.body.image != "") {
        let profileImageUrl = req.file.location
        User.updateOne({email : email}, { $set: { profileImageUrl: profileImageUrl } }).exec()
    }
    if (req.body.name != "") {
        User.updateOne({email : email}, { $set: { name: req.body.name } }).exec()
        req.session.passport.user.name = req.body.name
    }
    if (req.body.email != "") {
        User.updateOne({email : email}, { $set: { email: req.body.email } }).exec()
        req.session.passport.user.email = req.body.email
    }
    
    await res.redirect('/profile')
})

router.get('/profile/delete', checkAuthenticated, async(req, res) => {
    const ownerEmail = req.session.passport.user.email
    const user = await User.findOne({email:ownerEmail}).exec()
    await res.render('deleteProfile',{
        name: user.name,
        user
    })
})

router.post('/profile/delete', checkAuthenticated, async(req, res) => {
    const ownerEmail = req.session.passport.user.email
    const user = await User.deleteOne({email:ownerEmail}).exec()
    req.logout()
    await res.redirect('/')
})

module.exports = router