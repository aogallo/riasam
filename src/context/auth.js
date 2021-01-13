import React, { useState, useMemo, useReducer, createContext, useEffect } from 'react'
import { firestore } from "../util/init-firebase";

const initialState = {
    user: null,
    incomesCatalog: [],
    discountsCatalog: []
}

initialState.user = localStorage.getItem('user') ? localStorage.getItem('user') : null;

const AuthContext = createContext({
    user: null,
    incomesCatalog: [],
    discountsCatalog: [],
    login: (userData) => {},
    logout: () => {}
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
            
            break;
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
            break;
    }
}

export function AuthProvider (props){
    const [state, dispatch ] = useReducer(authReducer, initialState);
    const [discountsCatalog, setDiscountsCatalog] = useState([]);
    const [incomesCatalog, setIncomesCatalog] = useState([]);

    useEffect(() => {
            //incomes
            firestore.collection("incomes")
            .onSnapshot((snapshot)=>{
                snapshot.forEach((doc) => {

                    setIncomesCatalog([
                        ...incomesCatalog,
                        {
                            key: doc.id,
                            text: doc.data().name,
                            value: doc.id
                        }
                    ])                    
                })
            })

            //discounts
            firestore.collection("discounts")
                .onSnapshot((snapshot)=>{
                    snapshot.forEach((doc) => {
                        
                            setDiscountsCatalog([
                                ...discountsCatalog,
                                {
                                    key: doc.id,
                                    text: doc.data().name,
                                    value: doc.id    
                                }
                            ])
                })
            })
    },[])

    function login(userData){
        localStorage.setItem('user', userData);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout(){
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
    }

    const value = useMemo(() => {
        return ({
            user: state.user, 
            login, 
            logout, 
            incomesCatalog: state.incomesCatalog, 
            discountsCatalog: state.discountsCatalog
        })
    }, [incomesCatalog,discountsCatalog])

    return  <AuthContext.Provider value= {value} {...props} />
}

export function useUsuario(){
    const context = React.useContext(AuthContext);
    if (!context){
        throw new Error('useUsuario debe estar dentro del proveedor AuthContext');
    }

    return context;
}