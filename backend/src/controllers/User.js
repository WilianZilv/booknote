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

        db.query("INSERT INTO bn_users(username,password,followers,following,pubs) VALUES (?,?,0,0,0)",
            [props.username, crypto.hash],
            (err) => {
                if (err) {
                    return res.status(400).send()
                }
            })

        db.query(`CREATE TABLE ${props.username}_posts(id int primary key auto_increment, likes int,subject varchar(100), content varchar(10000))`,
            (err) => {
                if (err) {
                    return res.status(400).send()
                } else {
                    res.send()
                }
            })


    }

    fetch_user(props, res) {
        db.query("SELECT username,picture,followers,following,pubs FROM bn_users WHERE username=?",
            [props.username], (err, results) => {
                if (err) return res.status(400).send(err);
                if (results.length == 0) return res.status(400).send();
                return res.json(results[0])
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
                                expiresIn: 86400
                            });

                            return res.json({
                                username,
                                picture,
                                token
                            });
                        }
                    });
                });
        }
    }

    publish(props, res, req) {

        const token = req.headers.auth;
        const object = jwt.decode(token);

        const { username } = object;

        db.query(`INSERT INTO ${username}_posts(likes,subject,content) VALUES (?,?,?)`, [
            0,
            props.subject,
            props.content
        ], (error) => {
            if (error) return res.status(400).send();
            return res.send()
        })

    }

    publish_delete(props, res, req) {

        const token = req.headers.auth;
        const object = jwt.decode(token);

        const { username } = object;

        db.query(`DELETE FROM ${username}_posts WHERE id=?`, [
            props.id,
        ], (error) => {
            if (error) return res.status(400).send();
            return res.send()
        })

    }

    publish_fetch(props, res, req) {
        db.query(`SELECT * FROM ${props.username}_posts ORDER BY id DESC`, (error, results) => {
            if (error) return res.status(400).send();

            return res.json(results)
        })
    }



}

export default new UserController;