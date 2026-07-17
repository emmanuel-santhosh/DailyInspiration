import {oauthGithubMeEndpoint} from "../types/Redirection.ts";
import axios from "axios";

type userProps = {
    setUser: (user: string | undefined | null) => void,
}

export const loadUser = (props: Readonly<userProps>) => {
    axios.get(oauthGithubMeEndpoint)
        .then(response => {
                props.setUser(response.data);
            }
        );
}