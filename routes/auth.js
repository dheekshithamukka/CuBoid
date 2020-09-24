const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { JWT_SECRET } = require('../config/keys')
const { SENDGRID_API } = require('../config/keys')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')


const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: SENDGRID_API
        }
}))


router.get("/protected", requireLogin, (req,res) => {
    res.send("hello user!!")
})

// Route for signup

router.post('/signup', (req, res) => {
    const { fname, lname, phone, email, country, state, city, username, password, repeatPassword, logo } = req.body
    if (!fname || !lname || !phone || !email || !country || !state || !city || !username || !password || !repeatPassword) {
        console.log(fname)
        console.log(lname)
        console.log(phone)
        console.log(email)
        console.log(country)
        console.log(state)
        console.log(city)
        console.log(username)
        console.log(password)
        console.log(repeatPassword)
        console.log(logo)
        return res.status(422).json({ error: "Please fill all the fields. " })
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        // M.toast({html: "Invalid email address",classes:"#c62828 red darken-3"})
        return res.status(422).json({error: "Guess we have a typo, give it another shot. "})
    }
    if(password != repeatPassword){
        // M.toast({html: "Invalid email address",classes:"#c62828 red darken-3"})
        return res.status(422).json({error: "Passwords do not match! "})
    }
    if(!/[7-9]{1}[0-9]{9}/.test(phone)){
        return res.status(422).json({error: "Guess we have a typo, give it another shot. "})
    }
    var q = {$or:[{email:email},{username:username}]}
    User.findOne(q)
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists" })
            }
            
            bcrypt.hash(password, 12)
            .then(hashedpassword => {
            const user = new User({
                fname,
                lname,
                phone,
                email,
                country,
                state,
                city,
                username, 
                password: hashedpassword,
                logo
            })
            user.save()
                .then(user => {
                    transporter.sendMail({
                        to: user.email,
                        from: "hola@virtubate.com",
                        subject: "Signup success",
                        html: "<h1>Welcome to Cuboid</h1>"
                    })
                    res.json({ message: "Applied successfully" })

                })
                .catch(err => {
                    console.log(err)
                })
            })

        })
        .catch(err => {
            console.log(err)
        })

})



router.post("/signin", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        // console.log(email)
        // console.log(password)
        return res.status(422).json({ error: "Please fill all the details. " })
    }
    // console.log(email)
    // console.log(password)
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        //M.toast({ html: "Invalid email or password", classes: "#c62828 red darken-3" })
        return res.status(422).json({error: "Guess we have a typo, give it another shot. "})
      }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password. " })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log(savedUser.logo)
                        // res.json({ message: "Successfully signed in" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const {_id,fname,lname, email, username, logo, sentRequest, request, friendsList} = savedUser
                        res.json({ token, user:{_id, fname, lname, email, username, logo, sentRequest, request, friendsList} })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid email or password. " })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})


router.post('/reset-password',(req,res) => {
    crypto.randomBytes(32,(err, buffer) => {
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(422).json({error: "User does not exists. "})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then(result => {
                transporter.sendMail({
                    to: user.email,
                    from: "hola@virtubate.com",
                    subject: "password reset",
                    html: 
                    `
                        <p>You requested for password reset</p>
                        <h5>Click <a href="http://localhost:3000/reset/${token}">this</a> link to reset password</h5>        
                    `
                })
                res.json({message: "check your mail"})
            })
        })
    })
})



router.post('/new-password', (req,res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken: sentToken, expireToken: {$gt: Date.now()}})
    .then(user => {
        if(!user){
            return res.status(422).json({error: "Try again. Sesison expired"})
        }
        bcrypt.hash(newPassword, 12).then(hashedpassword => {
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken = undefined
            user.save().then(savedUser => {
                res.json({message: "Password successfully updated. "})
            })
        })
    }).catch(err => {
        console.log(err)
    })
})



module.exports = router








{/* <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password </h5><br /> */}