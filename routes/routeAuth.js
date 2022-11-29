import {Router} from 'express';
import {check} from "express-validator";
import UserController from '../controllers/UserController.js'

const router =Router();

router.post('/',
    [
        check('name', 'Type in your name').isLength({min: 1})
    ],
    UserController.enter)

export default router