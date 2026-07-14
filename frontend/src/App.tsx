import './App.css'
import axios from "axios";
import {useEffect} from "react";

function App() {

    function oauth2Github() {
        const host =
            window.location.host === "localhost:5173"
                ? "http://localhost:8080"
                : window.location.origin;
        window.open(host + "/oauth2/authorization/github", "_self");
    }

    const loadUser = () => {
        axios.get("api/auth/gh/me").then(response => console.log(response.data))
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <button onClick={oauth2Github}>Authenticate via GitHub</button>
        </>
    )
}

export default App
