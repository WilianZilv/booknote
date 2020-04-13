import db from '../db'
const bcryptjs = require('bcryptjs')

class UserController {

    constructor() {
        this.salt;
    }

    register(props, res) {
        this.salt = bcryptjs.genSaltSync(10)
        const crypto = {
            hash: bcryptjs.hashSync(props.password, this.salt)
        }

        db.query("INSERT INTO bn_users(username,password) VALUES (?,?)",
            [props.username, crypto.hash],
            (err) => {
                if (err) return res.status(400).send();
                return res.send()
            })
    }

    login(props, res) {

    }



}

export default new UserController;