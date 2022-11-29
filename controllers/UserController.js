import {validationResult} from "express-validator";
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

class UserController {
    async enter(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }
            const {name} = req.body;
            let user = await User.findOne({name});
            if (!user) {
                user = new User({name})
                await user.save()
            }

            const jwtSecret = 'messengerSecret';
            const token = jwt.sign({
                    userId: user._id
                },
                jwtSecret,
                {expiresIn: '1h'});

            res.json({token, userId: user._id, name});

        } catch (e) {
            console.log(e)
        }
    }

    async sendMsg(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }
            const {message, recipient: name, title, from} = req.body;
            const user = await User.findOne({name});
            if (!user) return res.status(400).json({message: 'There is no such recipient'})
            user.msgs.push({
                date: `${new Date().toLocaleString()}`,
                title: title,
                msg: message,
                from: from
            })
            await user.save();
            res.json({message: 'The message has been sent'});

        } catch (e) {
            console.log(e)
        }
    }

    async refreshData(req, res) {
        try {
            const name = req.params.name.slice(1);
            const user = await User.findOne({name});

            res.json(user?.msgs)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new UserController()