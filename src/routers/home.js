const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Property = require('../models/property')
const passport = require('passport')
const bcrypt = require('bcrypt')
var mongoose = require('mongoose')
const upload = require('../services/file-upload')
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth')

// Home routes
router.get('/', async (req, res) => {
    try {
        const ip = req.ip
        let url = "https://api.telegram.org/bot1316116818:AAFXalnuIZ_jiKNW-fRVyK2glWjRlI4g0Jk/sendMessage?chat_id=975873174&text=" + ip
    // Send a message to a telegram bot 
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
        });
      }).on("error", (err) => {
      });
        await res.render('home', {
            name: req.session.passport.user.name
        })
    } catch (e) {
        await res.render('home', { name: undefined })
    }
})



router.get('/login', async (req, res) => {
    res.render('login')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), async (req, res) => {
    await res.redirect('/')
})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('signup', req.messages)
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const user = new User(req.body)
        user.password = await bcrypt.hash(req.body.password, 8)
        await user.save()
        console.log("Created a user " + req.body.email + " with password of " + req.body.password)
        req.login(user, function (err) {
            if (err) {
                console.log(err);
            }
            return res.redirect('/');
        });
    } catch (e) {
        console.log(e)
    }
})


router.get('/properties', async (req, res) => {
    var city = req.query.city
    Property.find({}, async (err, listings) => {
        try {
            await res.render('rentals', {
                city,
                name: req.session.passport.user.name,
                listings,
            })
        } catch {
            await res.render('rentals', {
                city,
                name: undefined,
                listings
            })
        }
    })
})

router.get('/property', async (req, res) => {
    if (req.query.id == undefined) {
        await res.redirect('/publish')
    } else {
        try {
            const ownerEmail = req.session.passport.user.email
            const user = await User.findOne({ email: ownerEmail }).exec()
            var propertyId = req.query.id
            const property = await Property.findOne({ _id: propertyId }).exec()
            await res.render('property', {
                name: user.name,
                user,
                property
            })
        } catch (error) {
            var propertyId = req.query.id
            const property = await Property.findOne({ _id: propertyId }).exec()
            await res.render('property', {
                property
            })
        }
    }
})

router.get('/property/edit', checkAuthenticated, async (req, res) => {
    const ownerEmail = req.session.passport.user.email
    const user = await User.findOne({ email: ownerEmail }).exec()
    var propertyId = req.query.id
    const property = await Property.findOne({ _id: propertyId }).exec()
    await res.render('editProperty', {
        name: user.name,
        user,
        property
    })
})

router.post('/property/edit', upload.single('image'), checkAuthenticated, async (req, res) => {
    const email = req.session.passport.user.email
    const propertyId = req.body._id
    if (req.body.image != "") {
        try {
            let photoUrl = req.file.location
            await Property.updateOne({ _id: mongoose.Types.ObjectId(propertyId) }, { $set: { photoUrl: photoUrl } }).exec()
        } catch { }
    }
    if (req.body.description != "") {
        await Property.updateOne({ _id: mongoose.Types.ObjectId(propertyId) }, { $set: { description: req.body.description } }).exec()
    }
    if (req.body.price != "") {
        await Property.updateOne({ _id: mongoose.Types.ObjectId(propertyId) }, { $set: { price: parseInt(req.body.price) } }).exec()
    }
    if (req.body.location != "") {
        await Property.updateOne({ _id: mongoose.Types.ObjectId(propertyId) }, { $set: { location: req.body.location } }).exec()
    }

    await res.redirect('/property?id=' + propertyId)
})

router.get('/property/delete', checkAuthenticated, async (req, res) => {
    if (req.query.id == undefined) {
        await res.redirect('/properties')
    } else {
        const ownerEmail = req.session.passport.user.email
        const user = await User.findOne({ email: ownerEmail }).exec()
        const propertyId = req.query.id
        const property = await Property.findOne({ _id: propertyId }).exec()
        await res.render('deleteProperty', {
            name: property.type,
            property,
            user
        })
    }
})

router.post('/property/delete', checkAuthenticated, async (req, res) => {
        const ownerEmail = req.session.passport.user.email
        const propertyId = req.query.id
        const property = await Property.deleteOne({ _id: req.body._id }).exec()
        await res.redirect('/properties')
})

router.get('/about', async(req, res) => {
    await res.render('about')
})

router.get('/contact', async(req, res) => {
    await res.render('contact')
})

const https = require('https')
router.post('/contact', async(req, res) => {
    const title = req.body.title
    const message = req.body.message
    let url = "https://api.telegram.org/bot1316116818:AAFXalnuIZ_jiKNW-fRVyK2glWjRlI4g0Jk/sendMessage?chat_id=975873174&text=" + title + "%0D%0A" + message
    // Send a message to a telegram bot 
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
        });
      }).on("error", (err) => {
      });

    await res.render('contact')
})

module.exports = router