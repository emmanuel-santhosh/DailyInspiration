import './styles/index.css'
import {useContext, useEffect, useState} from "react";
import BasePreLogin from "./components/preLogin/BasePreLogin.tsx";
import BasePostLogin from "./components/postLogin/BasePostLogin.tsx";
import type {userType} from "./types/User.ts";
import {loadUser} from "./services/loadUser.ts";
import {UserContext} from "./contexts/UserContext.ts";

function App() {

    const userFromContext = useContext<userType>(UserContext);
    const [user, setUser] = useState<userType>(userFromContext);

    // Set page title
    useEffect(() => {
        document.title =
            typeof user === "string"
                ? `Daily Inspiration - ${user}`
                : "Daily Inspiration - Login"
    }, [user]);

    useEffect(() => {
        loadUser({setUser});
    }, []);

    return (
        <>
            <UserContext value={user}>
            {typeof user != "string" &&
                <BasePreLogin></BasePreLogin>
            }
            {typeof user === "string" &&
                <BasePostLogin></BasePostLogin>
            }
            </UserContext>
            <footer>
                <small>© Emmanuel Santhosh 2026. All rights reserved.</small>
            </footer>
        </>
    )
}

export default App
