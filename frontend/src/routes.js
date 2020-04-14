import React from 'react'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

import Dashboard from './pages/Main/Dashboard'
import Publish from './pages/Main/Publish'
import Login from './pages/Login'
import Profile from './pages/Main/Profile'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/profile/:username" exact component={Profile} />
                <Route path="/" exact component={Dashboard} />
                <Route path="/publish" exact component={Publish} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;