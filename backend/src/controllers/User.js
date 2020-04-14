import db from '../db'
import jwt from 'jsonwebtoken'
const bcryptjs = require('bcryptjs')


class UserController {

    constructor() {
        this.privateKey = "50f5c022494d511575dfe7d810c70dc8"
        this.salt = bcryptjs.genSaltSync(10);
    }

    register(props, res) {
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

        const crypto = {
            hash: undefined
        }

        if (!crypto.hash) {
            db.query("SELECT * FROM bn_users WHERE username=?",
                [props.username], (err, results) => {
                    if (err) return res.status(400).send();
                    if (results.length == 0) return res.status(400).send();
                    bcryptjs.compare(props.password, results[0].password, (err, check) => {
                        if (err) return res.status(400).send();
                        if (!check) return res.status(400).send();
                        if (check) {
                            const { username, picture } = results[0];

                            let token = jwt.sign({ username, picture }, this.privateKey, {
                                expiresIn: 60
                            });

                            return res.json({
                                token
                            });
                        }
                    });
                });
        }
    }



}

export default new UserController;