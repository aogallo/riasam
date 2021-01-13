import React, { useState } from 'react'
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../util/hooks";
import { auth } from "../util/init-firebase";

function Login() {

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback,
        {
            username: '',
            password: ''
        });

    function loginUserCallback () {
        authentication({...values});
    }

    function authentication({username, password}) {
        auth.signInWithEmailAndPassword(username, password)
            .then( (user) => {
                console.log(user)
            })
            .catch( (error) => {
                console.error(error);
            });
    }

    
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} 
                noValidate
                >
                    <h1>Iniciar Sesion</h1>
                    <Form.Input 
                    
                        label="Correo"
                        placeholder="Correo..."
                        name="username"
                        type="text"
                        value={values.username}
                        onChange={onChange}
                    />

                    <Form.Input
                        label="Contraseña"
                        placeholder="Contraseña..."
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={onChange}
                    />

                    <Button type="submit" primary>
                        Iniciar Sesion
                    </Button>
            </Form>            
        </div>
    )
}

export default Login;