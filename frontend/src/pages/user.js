import React, { useContext, useState } from "react";
import {Box} from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../operations/queries/getUser";
import ErrorsHandler from "../components/ErrorsHandler";
import {useParams} from "react-router-dom";
import {UserFullCard} from "../components/user/UserFullCard";
import {UpdateUserForm} from "../components/user/UpdateUserForm";

export function UserPage() {
  const { userData } = useContext(AuthContext);
  const userId = parseInt(useParams().userId);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState();
  const [selectedAction, setSelectedAction] = useState("show");  // ожидается: show, edit

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
      {!!userId && userData.role !== "Admin" && (
        <ErrorsHandler
          errors={[
            {
              code: "228",
              message: "У вас нет прав для просмотра данной страницы",
            },
          ]}
        />
      )}
      <ErrorsHandler errors={errors} apolloError={getUserQueryError} />
      {selectedAction === "show" && <UserFullCard user={user} setSelectedAction={setSelectedAction} />}
      {selectedAction === "edit" && <UpdateUserForm user={user} setSelectedAction={setSelectedAction} />}
    </Box>
  );
}
