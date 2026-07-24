import './App.css'
import {useEffect, useState} from "react";
import BasePreLogin from "./components/preLogin/BasePreLogin.tsx";
import BasePostLogin from "./components/postLogin/BasePostLogin.tsx";
import type {userType} from "./types/User.ts";
import {loadUser} from "./services/loadUser.ts";

function App() {

    const [user, setUser] = useState<userType>(undefined);

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
            {typeof user != "string" &&
                <BasePreLogin></BasePreLogin>
            }
            {typeof user === "string" &&
                <BasePostLogin></BasePostLogin>
            }
            <footer>
                <small>© Emmanuel Santhosh 2026. All rights reserved.</small>
            </footer>
        </>
    )
}

export default App
