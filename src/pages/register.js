import React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {useForm} from "../utility/hooks";
import {useMutation, gql} from "@apollo/react-hooks";
import {TextField, Button, Container, Stack, Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

const CREATE_USER = gql`
    mutation CreateUser(
        $email: String!
        $password: String!
    ) {
        createUser(email: $email, password: $password){
            status
            errors{message}
            user{email}
        }
    }
`;

function Register(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(false)
    const [user, setUser] = useState(undefined);


    function createUserCallback() {
        console.log("Callback hit");
        createUser();
    }

    const { onChange, onSubmit, values } = useForm(createUserCallback, {
        email: "",
        password: ""
    })

    const [createUser, {data }] = useMutation(
        CREATE_USER, {
            onError({ graphQLErrors}) {
                setErrors(graphQLErrors);
            },
            onCompleted: (data) => {
              setErrors(data.createUser.errors);
              setStatus(data.createUser.status);
              setUser(data.createUser.user);
            },
            variables: {
                email: values.email,
                password: values.password
            }
        }
    );

    return(
        <Container spacing={2} maxWidth="sm">
            <h3>Register</h3>
            <p>Всем привет</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="E-mail"
                    name="email"
                    onChange={onChange}
                />
                 <TextField
                    label="Пароль"
                    name="password"
                    onChange={onChange}
                />
            </Stack>
            {errors.map(function(error){
                return(
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                )
            })}
            {status &&
                <h2>Успешно создан пользователь {user.email}</h2>
            }
            <Button variant="contained" onClick={onSubmit}>Создать учетную запись</Button>
        </Container>
    )
}

export default Register;