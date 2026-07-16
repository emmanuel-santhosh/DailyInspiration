import {backendUrl, frontendUri, oauthGithubMeEndpoint, oauthGithubUri} from "../types/Redirection.ts";
import axios from "axios";

type userProps = {
    setUser: (user: string | undefined | null) => void;
}

export default function oAuth2Github() {
    const host =
        window.location.host === frontendUri
            ? backendUrl
            : window.location.origin;
    window.open(host + oauthGithubUri, "_self");

}

export const loadUser = (props: Readonly<userProps>) => {
    axios.get(oauthGithubMeEndpoint)
        .then(response =>
            props.setUser(response.data)
        )
}