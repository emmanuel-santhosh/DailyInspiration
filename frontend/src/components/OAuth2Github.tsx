import axios from "axios";
import {useEffect} from "react";
import {backendUrl, frontendUri, oauthGithubMeEndpoint, oauthGithubUri} from "../Redirection.ts";

type userProps = {
    setUser:(user: string | undefined | null) => void;
}

export default function OAuth2Github(props: Readonly<userProps>) {

    function oauth2Github() {
        const host =
            window.location.host === frontendUri
                ? backendUrl
                : window.location.origin;
        window.open(host + oauthGithubUri, "_self");
    }

    const loadUser = () => {
        axios.get(oauthGithubMeEndpoint)
            .then(response =>
                props.setUser(response.data)
            )
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