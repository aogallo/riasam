import React, { useState, useEffect, useMemo } from 'react';

import { auth } from "../util/init-firebase";

const userContext = React.createContext();

export function UserProvider (props) {
    const [user, setUser] = useState(null);

    function authentication({username, password}) {
        auth.signInWithEmailAndPassword(username, password)
            .then( (user) => {
                console.log(user);
                setUser(user);
                return true;
            })
            .catch( (error) => {
                console.error(error);
                return false;
            });
    }

    function signout() {
        auth.signOut()
            .then( () => setUser(null))
    }

    const value = useMemo(() => {
        return({
            user,
            authentication,
            signout
        });
    }, [user]);

    return(
        <userContext.Provider value={value} {...props} />
    )
}

export function UseUser() {
     const context = React.useContext(userContext);

     if(!context){
         throw new Error('Context invalid')
     }

     return context;
}