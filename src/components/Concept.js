import React, { useState } from 'react'
import { Form, Button, Message } from "semantic-ui-react";


import { useUsuario } from "../context/auth";
import { useForm } from "../util/hooks";

function Concept({isDiscount, addConcept,data}) {
    const [errorForm, setErrorForm] = useState(false);
    const [errorInput, setErrorInput] = useState({
        content: '',
        header: '',
        error: false
    })
    const { user } = useUsuario();

    const { onChange, onSubmit, values } = useForm(AddConcepts,
        {
            concept: '',
            quantity: 0
        });

    function AddConcepts(){
        const type = isDiscount ? 'DISCOUNT' : 'INCOME';
        let name ;
        name = Array.isArray(data) ? data.find(concept => concept.value === values.concept) : {text:''};

        if (values.concept === '' || values.quantity === 0)
        {
            setErrorInput({
                content: 'Los campos son obligatorios',
                header: 'Errores',
                error: true
            })

            setErrorForm(true);

            return;

        }else{
            setErrorForm(false);
        }

        addConcept({
            id: values.concept,
            name: name ? name.text : '',
            quantity: values.quantity
        }, type)
    }

        return (
            <Form
                onSubmit={onSubmit}
                error={errorForm}
                noValidate>

                <Form.Group widths='equal'>

                <Form.Dropdown
                    name="concept"
                    error={errorForm}
                    placeholder="Seleccionar"
                    onChange={onChange}
                    selection
                    options={ data }
                    value={values.concept}
                />
                <Form.Input
                    type="text"
                    error={errorForm}
                    placeholder="Cantidad"
                    name="quantity"
                    value={values.quantity}
                    onChange={onChange}
                    required
                    />
                <Button type="submit" icon="add" />
                </Form.Group>

                {
                    errorForm && <Message
                                    error={errorForm}
                                    content={errorInput.content}
                                    header={errorInput.header}/>
                }

            </Form>
        )

}

export default Concept;
