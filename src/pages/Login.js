import React, { useState } from 'react'
import { Button, Form, Message } from "semantic-ui-react";

import { useForm } from "../util/hooks";
import { UseUser } from "../context/userContext";

function Login(props) {
    const { user, authentication } = UseUser();
    const [errors, setErrors] = useState();

    const { onChange, onSubmit, values } = useForm(loginUserCallback,
        {
            username: '',
            password: ''
        });

    function loginUserCallback () {
        authentication({...values});
        if (user){
            props.history.push('/');
        }else{
            setErrors('Usuario o contraseña invalida');
        }
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
            {
                errors && <Message negative > <p>{errors}</p></Message>
            }
        </div>
    )
}

export default Login;