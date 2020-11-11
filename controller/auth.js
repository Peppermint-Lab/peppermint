const mongoose = require('mongoose')
const User = mongoose.model('InternalUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

exports.Signup = async (req, res) => {
    try {
        const {email, name, password} = req.body
        if (!email || !name, !password ) {
            return res.status(422).json({ error:"Please add all fields"})
        }
        User.findOne({email:email})
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({error:"user already exists with that email"})
            }
            bcrypt.hash(password, 16)
            .then(hashedpassword => {
                const user = new User ({
                    email,
                    password:hashedpassword,
                    name
                })

                user.save()
                .then(user => {
                    res.json({message: 'User saved successfully'})
                }).catch( err => {
                    console.log(err)
                    res.json({err})
                })
            })
        })
    } catch (error) {
        console.log(error)
    }
}

exports.Login = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(422).json({error:"please add email or password"})
         }
        User.findOne({email:email})
        .then(savedUser => {
            if(!savedUser){
                return res.status(422).json({error:"Invalid Email or password"})
             }
            bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if(doMatch) {
                    // res.json({message: "Sign in Sucessful"})
                    const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                    const {_id, name, email} = savedUser
                    res.json({token, user:{_id, name, email}})
                }
                else {
                    return res.status(422).json({error:"Invalid Email or password"})
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

