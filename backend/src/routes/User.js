import { Router } from 'express'

import ValidatorUser from '../validator/User'
import ValidatorResume from '../validator/Resume'

import UserController from '../controllers/User'

import MiddlewareAuth from '../middlewares/auth'

const route = {
    user: new Router(),
    prefix: '/user/'
}
const { user, prefix } = route;

user.get(`${prefix}publish/:username`, async (req, res) => {
    return UserController.publish_fetch(req.params, res, req);
})

user.get(`${prefix}profile/:username`, async (req, res) => {
    return UserController.fetch_user(req.params, res, req);
})

user.post(`${prefix}publish`, MiddlewareAuth, async (req, res) => {
    if (await ValidatorResume.isValid(req.body)) {
        return UserController.publish(req.body, res, req);
    }
    return res.status(400).send()
})


user.delete(`${prefix}publish/:id`, MiddlewareAuth, async (req, res) => {
    return UserController.publish_delete(req.params, res, req);
})


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