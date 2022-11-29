import {Router} from 'express';
import {check} from 'express-validator';
import UserController from '../controllers/UserController.js'

const router = Router();

router.patch('/send',
    [
        check('message', 'Message can not be blank').isLength({min: 1})
    ],
    UserController.sendMsg)

router.get('/refresh/:name', UserController.refreshData)

export default router;