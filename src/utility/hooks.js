import IsEmail from "isemail";
import {useState} from "react";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event, setIsValid, options) => {
        const fieldType = event.currentTarget.type;
        const value =
          fieldType === "number"
            ? parseInt(event.currentTarget.value)
            : event.currentTarget.value;


        if (fieldType === "email") {
            if (IsEmail.validate(value)) {setIsValid(true)}
            else {setIsValid(false)}
        }

        if (fieldType === "password") {
            if (value==="" && options.passwordToCompare==="") {
                setIsValid(false);
                options.setPasswordErrorMessage("Поле пароля не заполнено");
            } else if (value !== options.passwordToCompare) {
                setIsValid(false);
                options.setPasswordErrorMessage("Пароли не совпадают");
            } else {
                setIsValid(true);
                options.setPasswordErrorMessage("");
            }
        }

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