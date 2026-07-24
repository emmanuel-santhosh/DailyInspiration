import {useEffect} from "react";
import {oAuth2Github_login} from "../../services/oAuth2Github.ts";

export default function OAuth2LoginGh() {

    useEffect(()=>{
        oAuth2Github_login();
    },[]);

    return(
        <>
            <header>
                <h2>Performing login...</h2>
            </header>
        </>
    )
}