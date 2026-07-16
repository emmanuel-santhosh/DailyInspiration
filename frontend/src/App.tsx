import './App.css'
import {useEffect, useState} from "react";
import Login from "./components/Login.tsx";
import Journal from "./components/Journal.tsx";
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
                <Login></Login>
            }
            {typeof user === "string" &&
                <Journal user={user}></Journal>
            }
        </>
    )
}

export default App
