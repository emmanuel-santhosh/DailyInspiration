import './App.css'
import {useEffect, useState} from "react";
import Login from "./components/Login.tsx";
import Journal from "./components/Journal.tsx";

function App() {

    const [user, setUser] = useState<string | undefined | null>(undefined);

    // Set page title
    useEffect(() => {
        document.title =
            typeof user === "string"
                ? `Daily Inspiration - ${user}`
                : "Daily Inspiration - Login"
    }, [user]);

    return (
        <>
            {typeof user != "string" &&
                <Login setUser={setUser}></Login>
            }
            {typeof user === "string" &&
                <Journal user={user}></Journal>
            }
        </>
    )
}

export default App
