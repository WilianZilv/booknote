import express from 'express'

import UserRoute from './routes/User'

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(UserRoute);
    }
}

export default new App();