import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";

import { UseUser } from "../context/userContext";

function AuthRoute({ component: Component, ...rest}) {
    const { user } = UseUser();

    console.log('user', user);

    return (
        <Route
            { ...rest }
            render ={ (props) =>
                user ? <Component {...props}/> : <Redirect to="/login" />
            }
        />
    )
}

export default AuthRoute
