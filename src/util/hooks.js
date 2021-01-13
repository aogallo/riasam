import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event, data) => {
        const { name, value } = data || event.target;

        setValues({...values,
                    [name]: value
                });

    };

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values
    };
};