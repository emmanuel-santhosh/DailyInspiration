import {useContext} from "react";
import {UserContext} from "../../context/UserContext.ts";
import type {userType} from "../../types/User.ts";

export default function StartPagePostLogin() {

    const user:userType = useContext(UserContext);

    return(
        <>
            <h1>Welcome, {user}!</h1>
        </>
    )
}