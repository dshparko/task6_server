const Router = require('express')
const User = require('../models/User')
const router = new Router()

const {validationResult} = require("express-validator")
const Message = require('../models/Message')

router.post('/registration',
    
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        const {name} = req.body
        const candidate = await User.findOne({name})
        if(candidate) {
            return res.status(400).json({message: `User with name ${name} already exist`})
        }
        
    

        const user = new User({name})
        await user.save()
        res.json({message: "User was created"})
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/send',
    
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        const {sender, recipient, title, content} = req.body
        
    

        const message = new Message({sender, recipient, title, content})
        await message.save()
        res.json({message: "Message sent"})
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get('/allusers',
    async (req, res) => {
        try {
            const user = await User.find({})
            return res.json(user)


        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/allmessages',
async (req, res) => {
    try {
        const message = await Message.find({})
        return res.json(message)


    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports = router