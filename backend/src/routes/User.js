import { Router } from 'express'

import ValidatorUser from '../validator/User'

import UserController from '../controllers/User'

const route = {
    user: new Router(),
    prefix: '/user/'
}
const { user, prefix } = route;

user.post(`${prefix}register`, async (req, res) => {
    if (await ValidatorUser.isValid(req.body)) {
        return UserController.register(req.body, res);
    }
    return res.status(400).send()
})

user.post(`${prefix}login`, async (req, res) => {
    if (await ValidatorUser.isValid(req.body)) {
        return UserController.login(req.body, res);
    }
    return res.status(400).send()
})


export default user;