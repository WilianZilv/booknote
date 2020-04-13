import React from 'react'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ () => <h1>oi</h1>}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;