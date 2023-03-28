import React, {useContext} from "react";
import {AuthContext} from "../context/authContext";

function Homepage() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>This is the homepage</h1>
            { user ?
                <div>
                    <p>Вы успешно вошли в систему. Контекст id: {user.id}</p>
                </div>
                :
                <div>
                    <p>Не авторизованы</p>
                </div>
            }
        </div>
    )
}

export default Homepage;