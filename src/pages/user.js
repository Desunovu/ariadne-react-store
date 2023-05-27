import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../operations/queries/getUser";
import ErrorsHandler from "../components/ErrorsHandler";
import { useParams } from "react-router-dom";

export function UserPage() {
  const { userData } = useContext(AuthContext);
  const userId = parseInt(useParams().userId);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState();

  const { loading: getUserQueryLoading, error: getUserQueryError } = useQuery(
    GET_USER,
    {
      variables: { id: userId ? userId : userData.id },
      onCompleted: (data) => {
        setErrors((prevErrors) => [...prevErrors, ...data.getUser.errors]);
        if (data.getUser.status) {
          setUser(data.getUser.user);
          // if (!userId) - Случай для обновления информации в контексте
        }
      },
    }
  );

  if (getUserQueryLoading) return <Box>Loading</Box>;

  return (
    <Box>
      <Typography variant="h6">Тестовая страница...</Typography>
      {JSON.stringify(user)}
      <ErrorsHandler errors={errors} apolloError={getUserQueryError} />
      {user && (
        <Box>
          <Typography>id: {user.id}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Role: {user.role}</Typography>
          <Typography>Avatar: {user.avatarUrl}</Typography>
          <Typography>Name: {user.firstName}</Typography>
          <Typography>Last Name: {user.lastName}</Typography>
          <Typography>Address: {user.address}</Typography>
          <Typography>Phone number: {user.phoneNumber}</Typography>
        </Box>
      )}
      {!!userId && (
        <Box>
          {userData.role !== "Admin" && (
            <ErrorsHandler
              errors={[
                {
                  code: "228",
                  message: "У вас нет прав для просмотра данной страницы",
                },
              ]}
            />
          )}
          {userData.role === "Admin" && (
            <>TODO Элемент для редактирования пользователя</>
          )}
        </Box>
      )}
    </Box>
  );
}
