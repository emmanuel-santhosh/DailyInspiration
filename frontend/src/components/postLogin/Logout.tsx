import {useEffect} from "react";
import {oAuth2Github_logout} from "../../services/oAuth2Github.ts";

export default function Logout() {
    useEffect(() => {
        oAuth2Github_logout();
    }, []);
    return (
        <header>
            <h2>Logging out...</h2>
        </header>
    )
}