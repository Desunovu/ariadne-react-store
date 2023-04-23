import {useState} from "react";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        const value =
          event.currentTarget.type === "number"
            ? parseInt(event.currentTarget.value)
            : event.currentTarget.value;
        setValues({...values, [event.currentTarget.name]: value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}